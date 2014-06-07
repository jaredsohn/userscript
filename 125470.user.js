// ==UserScript==
// @name           netvibes - centered wider close button
// @namespace      mikecupcake
// @description    center the close X and make it wider
// @include        http*://*.netvibes.com/*
// @version        1.8
// ==/UserScript==

GM_addStyle("#feedReaderCloseButtonContainer { width:80px; position:absolute; left: 50%; margin-left: -40px !important; text-align: center; } ");

GM_addStyle("#feedReaderCloseButtonContainer.nv-close-icon { background-repeat: no-repeat  !important; background-position: center top !important; } ");