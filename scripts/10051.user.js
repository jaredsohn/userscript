// ==UserScript==
// @name           Microsoft Club Live Search removal (Chicktionary)
// @namespace      thehuey.com
// @description    Remove the Search frame so games are faster
// @include        http://club.live.com/GamePlay.aspx?page=*
// ==/UserScript==

setTimeout(function() {

this.GameShowAPI.Search = function (term, a, b) {
}

var sel = document.getElementById('ifSearchResult');
//sel.parentNode.removeChild(sel);

sel.src = 'http://www.anagramssolved.com/index.html';
}, 500);

