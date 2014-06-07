// ==UserScript==
// @name           Microsoft Club Live Search Assistant. (For Flexicon, Clink, Crosswire, Dingbats and Chicktionary)
// @namespace      thehuey.com
// @description    Remove the Search frame so games are faster.  Adds a solution helper instead.
// @include        http://club.live.com/GamePlay.aspx?page=*
// ==/UserScript==

setTimeout(function() {

this.GameShowAPI.Search = function (term, a, b) {
}

var sel = document.getElementById('ifSearchResult');
//sel.parentNode.removeChild(sel);
sel.height = '340px';
var mydoc = document.location + '';
if (mydoc.match(/page=chick/)) {
  sel.src = 'http://www.anagramssolved.com/index.html';
} else if (mydoc.match(/page=flexicon/)) {
  sel.src = 'http://www.anagramssolved.com/flexicon-solutions.html';
} else if (mydoc.match(/page=clink/)) {
  sel.src = 'http://www.anagramssolved.com/clink-solutions.html';
} else if (mydoc.match(/page=dingbats/)) {
  sel.src = 'http://www.anagramssolved.com/dingbats-solutions.html';
} else if (mydoc.match(/page=crosswire/)) {
  sel.src = 'http://www.anagramssolved.com/crosswire-solutions.html';
} else if (mydoc.match(/page=seekadoo/)) {
  sel.src = 'http://www.anagramssolved.com/seekado-solutions.html';
}

}, 500);

