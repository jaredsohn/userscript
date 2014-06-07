// ==UserScript==
// @name           Save In Archive Disable
// @namespace      http://userscripts.org/users/83443
// @description    Removes the buttons to save things in the archive from spy reports so you don't accidentally click on them
// @include        *.ikariam.*safehouseReports*
// @include        *.ikariam.*Espionage*
// ==/UserScript==

GM_addStyle("body .next { display: none; }");
