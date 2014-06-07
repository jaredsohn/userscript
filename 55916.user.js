// ==UserScript==
// @name           Refresher for Request Coached
// @namespace      Jonathan Mackenzie
// @exclude        *.nyud.net/*
// ==/UserScript==
function main(doc) {
if(document.title=="REQUEST COACHED")location.reload();

if (document.title == "REQUEST BLOCKED") {
window.location.href=window.location.href.replace(/^(.+?\/\/.+?)\//,'$1.nyud.net/');
window.location.reload();
}
}
main(document);