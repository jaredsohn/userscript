// ==UserScript==
// @name       Bleep.com - no annoying pause
// @match      https://*.bleep.com/*
// @version    1.1
// ==/UserScript==
unsafeWindow.bleep.webPlayer.settings.timeout=0;
setInterval('$("#previewStart,#previewEnd").css("visibility","hidden")',1000)