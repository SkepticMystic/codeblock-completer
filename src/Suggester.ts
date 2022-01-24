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
		return [...this.plugin.settings.customTypes, ...fromPlugins].filter(
			(sug) => sug.includes(query)
		);
	};

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		el.createDiv({
			text: suggestion,
			cls: "codeblock-suggestion",
		});
	}

	addLineBreak(nextLine: string) {
		return nextLine === "```" || nextLine === "" || nextLine === "\n"
			? "\n\n"
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

			const replacement = `\`\`\`${suggestion}${addLineBreak(
				nextLine
			)}${addClosingBackticks(currLine, nextLine)}`;

			editor.replaceRange(replacement, { ch: 0, line: start.line }, end);
			editor.setCursor({ ch: 0, line: end.line + 1 });
		}
	}
}
