// ==UserScript==
// @name           UniversFreeboxRemoveAdBlockWarningAndCarrousel
// @namespace      universfreebox
// @include        http://www.universfreebox.com/*
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle("#pub-haut-adblock { display: none !important; }");
GM_addStyle("#carousel_view { display: none !important; }");
