// ==UserScript==
// @name           Lock your browser
// @namespace      Kyle
// @include        *google.tk*
// @include        */lockyourbrowser
// ==/UserScript==

GM_registerMenuCommand("Lock Browser Options", function() {
GM_setValue("pass", (prompt("Set the password:")||""));
});
while(GM_getValue("pass","default") != prompt("Password:")) {}
