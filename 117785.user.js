// ==UserScript==
// @name           Pandora Ad Remover
// @namespace      http://www.stealthmonkey.com
// @description    Removes the ads from Pandora and centers player
// @include        http*://www.pandora.com/*
// @Version        1.1
// ==/UserScript==

GM_addStyle("#mainContainer { background: none !important; }");
GM_addStyle("#adLayout { width: inherit !important; }");
GM_addStyle("#mainContentContainer { width: 750px !important; float: center !important; }");
GM_addStyle("#footer { width: 750px !important; float: center !important; }");
document.getElementById('ad_container').innerHTML = "";