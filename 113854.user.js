// ==UserScript==
// @name       Waze Editor Full Screen
// @version    0.1.3
// @description  Script to make Waze use maximum screen space when editing in the Cartouche (This may have undesired side effects)
// @include    *waze.com/*
// ==/UserScript==

GM_addStyle("#editor-container { max-width: none !important; } #WazeMap { max-height: none !important; height: 82% !important; }");