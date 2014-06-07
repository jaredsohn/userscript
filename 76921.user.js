// ==UserScript==
// @name           ShareBase.to Auto downloader
// @namespace      de.tscherno.sharebase
// @include        http://sharebase.to/*
// ==/UserScript==

unsafeWindow.countdown = 0;
window.setTimeout(doit, 1200);

function doit(){
form = document.forms.namedItem("downloading");
form.submit();
}