// ==UserScript==
// @name           Remove Facebook Questions
// @description    Removes Questions from the side panel of Facebook
// ==/UserScript==

document.getElementById('rightCol').childNodes[0].removeChild(document.getElementById('pagelet_netego_questions'))