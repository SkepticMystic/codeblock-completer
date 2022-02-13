import { MarkdownPostProcessorContext } from "obsidian";

interface CodeblockTemplate {
	type: string;
	template: string;
}
export interface Settings {
	customTypes: string[];
	codeblockTemplates: CodeblockTemplate[];
}

type CodeblockCallback = (
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext
) => void | Promise<any>;

declare module "obsidian" {
	interface MarkdownPreviewRenderer {
		codeBlockPostProcessors: {
			[codeblockType: string]: CodeblockCallback;
		};
	}
}
