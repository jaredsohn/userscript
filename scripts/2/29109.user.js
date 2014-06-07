// ==UserScript==
// @name           Runescape Grand Exchange Search Helper
// @namespace      http://www.hellboundhackers.org/profile/Simbanafsi.html
// @description    Makes it easier to search for items in the grand exchange database of the Runescape website
// @include        http://itemdb-rs.runescape.com/*
// ==/UserScript==

var result;

function newsubmit(event) {
result = document.getElementsByName('query')[0].value.search(/"/)
if (result == -1){
document.getElementsByName('query')[0].value = '"' + document.getElementsByName('query')[0].value+'"'
}
}
window.addEventListener('submit', newsubmit, true);