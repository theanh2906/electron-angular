export * from "./variables";
export * from "./launcher";

require("electron").webFrame.setVisualZoomLevelLimits(1, 1);

console.log("Loaded Renderer!");
