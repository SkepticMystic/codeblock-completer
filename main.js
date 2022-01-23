/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/main.ts
__export(exports, {
  default: () => MyPlugin
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/const.ts
var DEFAULT_SETTINGS = {
  customTypes: []
};

// src/SettingTab.ts
var import_obsidian = __toModule(require("obsidian"));

// src/utils.ts
var splitAndTrim = (fields) => {
  if (!fields || fields === "")
    return [];
  else
    return fields.split(",").map((str) => str.trim());
};

// src/SettingTab.ts
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    let { containerEl, plugin } = this;
    const { settings } = plugin;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Custom Codeblocks").setDesc("A comma-separated list of codeblocks types to suggest (aside from those added by your plugins).").addText((text) => {
      text.setValue(settings.customTypes.join(", "));
      text.inputEl.onblur = async () => {
        const value = text.getValue();
        settings.customTypes = splitAndTrim(value);
        await plugin.saveSettings();
      };
    });
  }
};

// src/Suggester.ts
var import_obsidian2 = __toModule(require("obsidian"));
var CodeblockSuggester = class extends import_obsidian2.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.getSuggestions = (context) => {
      const { query } = context;
      const fromPlugins = Object.keys(import_obsidian2.MarkdownPreviewRenderer.codeBlockPostProcessors);
      return [...this.plugin.settings.customTypes, ...fromPlugins].filter((sug) => sug.includes(query));
    };
    this.plugin = plugin;
  }
  onTrigger(cursor, editor, _) {
    const sub = editor.getLine(cursor.line).substring(0, cursor.ch);
    const match = sub.match(/^```(.*)$/)?.[1];
    if (match !== void 0) {
      return {
        start: {
          ch: sub.lastIndexOf(match),
          line: cursor.line
        },
        end: cursor,
        query: match
      };
    }
    return null;
  }
  renderSuggestion(suggestion, el) {
    el.createDiv({
      text: suggestion,
      cls: "codeblock-suggestion"
    });
  }
  selectSuggestion(suggestion) {
    const { context } = this;
    if (context) {
      const { start, end, editor } = context;
      editor.replaceRange("```" + suggestion + "\n\n", { ch: 0, line: start.line }, end);
      editor.setCursor({ ch: 0, line: end.line + 1 });
    }
  }
};

// src/main.ts
var MyPlugin = class extends import_obsidian3.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));
    this.registerEditorSuggest(new CodeblockSuggester(this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2NvbnN0LnRzIiwgInNyYy9TZXR0aW5nVGFiLnRzIiwgInNyYy91dGlscy50cyIsICJzcmMvU3VnZ2VzdGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBQbHVnaW4gfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHsgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gXCIuL2NvbnN0XCI7XHJcbmltcG9ydCB7IE15UGx1Z2luU2V0dGluZ3MgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdUYWIgfSBmcm9tIFwiLi9TZXR0aW5nVGFiXCI7XHJcbmltcG9ydCB7IENvZGVibG9ja1N1Z2dlc3RlciB9IGZyb20gXCIuL1N1Z2dlc3RlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5yZWdpc3RlckVkaXRvclN1Z2dlc3QobmV3IENvZGVibG9ja1N1Z2dlc3Rlcih0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRvbnVubG9hZCgpIHt9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHR7fSxcclxuXHRcdFx0REVGQVVMVF9TRVRUSU5HUyxcclxuXHRcdFx0YXdhaXQgdGhpcy5sb2FkRGF0YSgpXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcbn1cclxuIiwgImltcG9ydCB7IE15UGx1Z2luU2V0dGluZ3MgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcclxuXHRjdXN0b21UeXBlczogW10sXHJcbn07XHJcbiIsICJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE15UGx1Z2luIGZyb20gXCIuL21haW5cIjtcclxuaW1wb3J0IHsgc3BsaXRBbmRUcmltIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblx0cGx1Z2luOiBNeVBsdWdpbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlQbHVnaW4pIHtcclxuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGxldCB7IGNvbnRhaW5lckVsLCBwbHVnaW4gfSA9IHRoaXM7XHJcblx0XHRjb25zdCB7IHNldHRpbmdzIH0gPSBwbHVnaW47XHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZShcIkN1c3RvbSBDb2RlYmxvY2tzXCIpXHJcblx0XHRcdC5zZXREZXNjKFxyXG5cdFx0XHRcdFwiQSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBjb2RlYmxvY2tzIHR5cGVzIHRvIHN1Z2dlc3QgKGFzaWRlIGZyb20gdGhvc2UgYWRkZWQgYnkgeW91ciBwbHVnaW5zKS5cIlxyXG5cdFx0XHQpXHJcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PiB7XHJcblx0XHRcdFx0dGV4dC5zZXRWYWx1ZShzZXR0aW5ncy5jdXN0b21UeXBlcy5qb2luKFwiLCBcIikpO1xyXG5cdFx0XHRcdHRleHQuaW5wdXRFbC5vbmJsdXIgPSBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHRleHQuZ2V0VmFsdWUoKTtcclxuXHRcdFx0XHRcdHNldHRpbmdzLmN1c3RvbVR5cGVzID0gc3BsaXRBbmRUcmltKHZhbHVlKTtcclxuXHRcdFx0XHRcdGF3YWl0IHBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBzcGxpdEFuZFRyaW0gPSAoZmllbGRzOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XHJcblx0aWYgKCFmaWVsZHMgfHwgZmllbGRzID09PSBcIlwiKSByZXR1cm4gW107XHJcblx0ZWxzZSByZXR1cm4gZmllbGRzLnNwbGl0KFwiLFwiKS5tYXAoKHN0cikgPT4gc3RyLnRyaW0oKSk7XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG5cdEVkaXRvcixcclxuXHRFZGl0b3JQb3NpdGlvbixcclxuXHRFZGl0b3JTdWdnZXN0LFxyXG5cdEVkaXRvclN1Z2dlc3RDb250ZXh0LFxyXG5cdEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyxcclxuXHRNYXJrZG93blByZXZpZXdSZW5kZXJlcixcclxuXHRURmlsZSxcclxufSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHR5cGUgQkNQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvZGVibG9ja1N1Z2dlc3RlciBleHRlbmRzIEVkaXRvclN1Z2dlc3Q8c3RyaW5nPiB7XHJcblx0cGx1Z2luOiBCQ1BsdWdpbjtcclxuXHJcblx0Y29uc3RydWN0b3IocGx1Z2luOiBCQ1BsdWdpbikge1xyXG5cdFx0c3VwZXIocGx1Z2luLmFwcCk7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdG9uVHJpZ2dlcihcclxuXHRcdGN1cnNvcjogRWRpdG9yUG9zaXRpb24sXHJcblx0XHRlZGl0b3I6IEVkaXRvcixcclxuXHRcdF86IFRGaWxlXHJcblx0KTogRWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvIHwgbnVsbCB7XHJcblx0XHRjb25zdCBzdWIgPSBlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSkuc3Vic3RyaW5nKDAsIGN1cnNvci5jaCk7XHJcblx0XHRjb25zdCBtYXRjaCA9IHN1Yi5tYXRjaCgvXmBgYCguKikkLyk/LlsxXTtcclxuXHJcblx0XHRpZiAobWF0Y2ggIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHN0YXJ0OiB7XHJcblx0XHRcdFx0XHRjaDogc3ViLmxhc3RJbmRleE9mKG1hdGNoKSxcclxuXHRcdFx0XHRcdGxpbmU6IGN1cnNvci5saW5lLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZW5kOiBjdXJzb3IsXHJcblx0XHRcdFx0cXVlcnk6IG1hdGNoLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0U3VnZ2VzdGlvbnMgPSAoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQpID0+IHtcclxuXHRcdGNvbnN0IHsgcXVlcnkgfSA9IGNvbnRleHQ7XHJcblx0XHRjb25zdCBmcm9tUGx1Z2lucyA9IE9iamVjdC5rZXlzKFxyXG5cdFx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdFx0TWFya2Rvd25QcmV2aWV3UmVuZGVyZXIuY29kZUJsb2NrUG9zdFByb2Nlc3NvcnNcclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gWy4uLnRoaXMucGx1Z2luLnNldHRpbmdzLmN1c3RvbVR5cGVzLCAuLi5mcm9tUGx1Z2luc10uZmlsdGVyKFxyXG5cdFx0XHQoc3VnKSA9PiBzdWcuaW5jbHVkZXMocXVlcnkpXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdHJlbmRlclN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRcdGVsLmNyZWF0ZURpdih7XHJcblx0XHRcdHRleHQ6IHN1Z2dlc3Rpb24sXHJcblx0XHRcdGNsczogXCJjb2RlYmxvY2stc3VnZ2VzdGlvblwiLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzZWxlY3RTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyBjb250ZXh0IH0gPSB0aGlzO1xyXG5cdFx0aWYgKGNvbnRleHQpIHtcclxuXHRcdFx0Y29uc3QgeyBzdGFydCwgZW5kLCBlZGl0b3IgfSA9IGNvbnRleHQ7XHJcblx0XHRcdGVkaXRvci5yZXBsYWNlUmFuZ2UoXHJcblx0XHRcdFx0XCJgYGBcIiArIHN1Z2dlc3Rpb24gKyBcIlxcblxcblwiLFxyXG5cdFx0XHRcdHsgY2g6IDAsIGxpbmU6IHN0YXJ0LmxpbmUgfSxcclxuXHRcdFx0XHRlbmRcclxuXHRcdFx0KTtcclxuXHRcdFx0ZWRpdG9yLnNldEN1cnNvcih7IGNoOiAwLCBsaW5lOiBlbmQubGluZSArIDEgfSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1Qjs7O0FDRWhCLElBQU0sbUJBQXFDO0FBQUEsRUFDakQsYUFBYTtBQUFBOzs7QUNIZCxzQkFBK0M7OztBQ0F4QyxJQUFNLGVBQWUsQ0FBQyxXQUE2QjtBQUN6RCxNQUFJLENBQUMsVUFBVSxXQUFXO0FBQUksV0FBTztBQUFBO0FBQ2hDLFdBQU8sT0FBTyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsSUFBSTtBQUFBOzs7QURFekMsK0JBQXlCLGlDQUFpQjtBQUFBLEVBR2hELFlBQVksS0FBVSxRQUFrQjtBQUN2QyxVQUFNLEtBQUs7QUFDWCxTQUFLLFNBQVM7QUFBQTtBQUFBLEVBR2YsVUFBZ0I7QUFDZixRQUFJLEVBQUUsYUFBYSxXQUFXO0FBQzlCLFVBQU0sRUFBRSxhQUFhO0FBQ3JCLGdCQUFZO0FBRVosUUFBSSx3QkFBUSxhQUNWLFFBQVEscUJBQ1IsUUFDQSxtR0FFQSxRQUFRLENBQUMsU0FBUztBQUNsQixXQUFLLFNBQVMsU0FBUyxZQUFZLEtBQUs7QUFDeEMsV0FBSyxRQUFRLFNBQVMsWUFBWTtBQUNqQyxjQUFNLFFBQVEsS0FBSztBQUNuQixpQkFBUyxjQUFjLGFBQWE7QUFDcEMsY0FBTSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBRTNCbEIsdUJBUU87QUFHQSx1Q0FBaUMsK0JBQXNCO0FBQUEsRUFHN0QsWUFBWSxRQUFrQjtBQUM3QixVQUFNLE9BQU87QUEwQmQsMEJBQWlCLENBQUMsWUFBa0M7QUFDbkQsWUFBTSxFQUFFLFVBQVU7QUFDbEIsWUFBTSxjQUFjLE9BQU8sS0FFMUIseUNBQXdCO0FBRXpCLGFBQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxTQUFTLGFBQWEsR0FBRyxhQUFhLE9BQzVELENBQUMsUUFBUSxJQUFJLFNBQVM7QUFBQTtBQWhDdkIsU0FBSyxTQUFTO0FBQUE7QUFBQSxFQUdmLFVBQ0MsUUFDQSxRQUNBLEdBQ2tDO0FBQ2xDLFVBQU0sTUFBTSxPQUFPLFFBQVEsT0FBTyxNQUFNLFVBQVUsR0FBRyxPQUFPO0FBQzVELFVBQU0sUUFBUSxJQUFJLE1BQU0sZUFBZTtBQUV2QyxRQUFJLFVBQVUsUUFBVztBQUN4QixhQUFPO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTixJQUFJLElBQUksWUFBWTtBQUFBLFVBQ3BCLE1BQU0sT0FBTztBQUFBO0FBQUEsUUFFZCxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUE7QUFBQTtBQUlULFdBQU87QUFBQTtBQUFBLEVBY1IsaUJBQWlCLFlBQW9CLElBQXVCO0FBQzNELE9BQUcsVUFBVTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBO0FBQUE7QUFBQSxFQUlQLGlCQUFpQixZQUEwQjtBQUMxQyxVQUFNLEVBQUUsWUFBWTtBQUNwQixRQUFJLFNBQVM7QUFDWixZQUFNLEVBQUUsT0FBTyxLQUFLLFdBQVc7QUFDL0IsYUFBTyxhQUNOLFFBQVEsYUFBYSxRQUNyQixFQUFFLElBQUksR0FBRyxNQUFNLE1BQU0sUUFDckI7QUFFRCxhQUFPLFVBQVUsRUFBRSxJQUFJLEdBQUcsTUFBTSxJQUFJLE9BQU87QUFBQTtBQUFBO0FBQUE7OztBSjlEOUMsNkJBQXNDLHdCQUFPO0FBQUEsUUFHdEMsU0FBUztBQUNkLFVBQU0sS0FBSztBQUNYLFNBQUssY0FBYyxJQUFJLFdBQVcsS0FBSyxLQUFLO0FBRTVDLFNBQUssc0JBQXNCLElBQUksbUJBQW1CO0FBQUE7QUFBQSxFQUduRCxXQUFXO0FBQUE7QUFBQSxRQUVMLGVBQWU7QUFDcEIsU0FBSyxXQUFXLE9BQU8sT0FDdEIsSUFDQSxrQkFDQSxNQUFNLEtBQUs7QUFBQTtBQUFBLFFBSVAsZUFBZTtBQUNwQixVQUFNLEtBQUssU0FBUyxLQUFLO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
