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

export class CodeblockSuggester extends EditorSuggest<string> {
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

	getSuggestions = (context: EditorSuggestContext) => {
		const { query } = context;
		const fromPlugins = Object.keys(
			//@ts-ignore
			MarkdownPreviewRenderer.codeBlockPostProcessors
		);
		return removeDups(
			[...this.plugin.settings.customTypes, ...fromPlugins].filter(
				(sug) => sug.includes(query)
			)
		);
	};

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		el.createDiv({
			text: suggestion,
			cls: "codeblock-suggestion",
		});
	}

	getCodeblockTemplate = (type: string) =>
		this.plugin.settings.codeblockTemplates.find(
			(cbTemp) => cbTemp.type === type
		)?.template;

	addLineBreak(nextLine: string, template: string | undefined) {
		return nextLine === "```" || nextLine === "" || nextLine === "\n"
			? `\n${template ?? ""}\n`
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

	selectSuggestion(suggestion: string): void {
		const { context, addLineBreak, addClosingBackticks } = this;
		if (context) {
			const { start, end, editor } = context;
			const currLine = editor.getLine(end.line);
			const nextLine = editor.getLine(end.line + 1);
			const template = this.getCodeblockTemplate(suggestion);

			const replacement = `\`\`\`${suggestion}${addLineBreak(
				nextLine,
				template
			)}${addClosingBackticks(currLine, nextLine)}`;

			editor.replaceRange(replacement, { ch: 0, line: start.line }, end);

			const cursorOff = editor.getValue().indexOf("$|$");
			if (cursorOff !== -1) {
				const cursorPos = editor.offsetToPos(cursorOff);
				editor.setLine(
					cursorPos.line,
					editor.getLine(cursorPos.line).replace("$|$", "")
				);
				editor.setCursor(cursorPos);
			} else {
				editor.setCursor({ ch: 0, line: end.line + 1 });
			}
		}
	}
}
