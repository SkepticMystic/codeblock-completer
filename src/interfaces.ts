import { MarkdownPostProcessorContext } from "obsidian";

export interface Settings {
	customTypes: string[];
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
