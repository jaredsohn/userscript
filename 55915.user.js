// ==UserScript==
// @name           Refresher
// @namespace      Jonathan Mackenzie
// ==/UserScript==
function main(doc) {
if (document.title == "REQUEST COACHED") {
window.location.reload();}

if (document.title == "REQUEST BLOCKED") {
window.location = window.location.replace(/(.+)\/(.*)/, '$1.nyud.net/$2');
window.location.reload();
}
}
main(document);