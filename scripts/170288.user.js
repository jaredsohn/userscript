// ==UserScript==
// @name           Zippyshare Auto Download
// @namespace      Zippyshare Auto Download
// @description    Automatically starts downloads hosted by Zippyshare
// @include        http://www*.zippyshare.com/*
// ==/UserScript==
document.getElementById('dlbutton').click();
setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 2000);