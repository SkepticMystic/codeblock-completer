import {
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	MarkdownPreviewRenderer,
	TFile,
} from "obsidian";
import type BCPlugin from "./main";
import { removeDups } from "./utils";

interface Suggestion {
	label: string;
	type: 'plugin' | 'custom'
}

export class CodeblockSuggester extends EditorSuggest<Suggestion> {
	plugin: BCPlugin;

	constructor(plugin: BCPlugin) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onTrigger(
		cursor: EditorPosition,
		editor: Editor,
		_: TFile
	): EditorSuggestTriggerInfo | null {
		const sub = editor.getLine(cursor.line).substring(0, cursor.ch);
		const match = sub.match(/^```(.*)$/)?.[1];

		if (match !== undefined) {
			return {
				start: {
					ch: sub.lastIndexOf(match),
					line: cursor.line,
				},
				end: cursor,
				query: match,
			};
		}

		return null;
	}


	getSuggestions = (context: EditorSuggestContext): Suggestion[] => {
		const { ignoreTypes } = this.plugin.settings
		const { query } = context;

		const fromPlugins = Object.keys(
			//@ts-ignore
			MarkdownPreviewRenderer.codeBlockPostProcessors
		);
		const { customTypes } = this.plugin.settings;

		const all = <Suggestion[]>[
			...fromPlugins
				.filter(t => !ignoreTypes.contains(t))
				.map((t) => ({ type: 'plugin', label: t })),
			...customTypes.map((t) => ({ type: 'custom', label: t }))
		];

		return removeDups(all.filter(sug => sug.label.toLowerCase().includes(query.toLowerCase())));
	};

	renderSuggestion(sug: Suggestion, el: HTMLElement): void {
		el.createDiv({
			text: sug.label,
			cls: "codeblock-suggestion",
		});
	}

	getCodeblockTemplate = (type: string): string | undefined =>
		this.plugin.settings.codeblockTemplates.find(
			(cbTemp) => cbTemp.type === type
		)?.template;

	addLineBreak(nextLine: string, template: string | undefined) {
		return nextLine === "```" || nextLine === "" || nextLine === "\n"
			? `\n${template ?? ""}`
			: template
				? "\n" + template
				: "";
	}

	addClosingBackticks(currLine: string, nextLine: string) {
		return (
			// No suggestion, just backticks "```"
			(currLine === "```" ||
				// Partial suggestion
				(currLine.length > 3 && !currLine.endsWith("```"))) &&
				// Make sure there is no content being wrapped
				(nextLine === "" || nextLine === "\n")
				? "```"
				: ""
		);
	}

	selectSuggestion(sug: Suggestion): void {
		const {
			context,
			addLineBreak,
			addClosingBackticks,
			plugin: {
				settings: { addCBLabel },
			},
		} = this;
		if (context) {
			const { start, end, editor } = context;
			const currLine = editor.getLine(end.line);
			const nextLine = editor.getLine(end.line + 1);
			const template = this.getCodeblockTemplate(sug.label);

			let repl = `\`\`\`${sug.label}`
			repl += (sug.type === 'custom' && addCBLabel) ? " {}" : ""
			repl += addLineBreak(nextLine, template)
			repl += addClosingBackticks(
				currLine,
				nextLine
			);

			editor.replaceRange(repl, { ch: 0, line: start.line }, end);
			const currValue = editor.getValue();

			if (template) {
				const cbTemplateOff = currValue.indexOf('$|$', editor.posToOffset(start))
				if (cbTemplateOff !== -1) {
					const pos = editor.offsetToPos(cbTemplateOff)
					editor.setLine(pos.line, editor.getLine(pos.line).replace('$|$', ''))
					editor.setCursor(pos)
					return
				}
			}

			if (addCBLabel) {
				const cbLabelOff = currValue.indexOf(' {}', editor.posToOffset(start))
				if (cbLabelOff !== -1) {
					editor.setCursor(editor.offsetToPos(cbLabelOff + 2))
					return
				}
			}

			editor.setCursor({ ch: 0, line: end.line + 1 });

		}
	}
}
