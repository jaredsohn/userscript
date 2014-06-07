// ==UserScript==
// @name           Microsoft Club Live Search Assistant. (For Flexicon, Clink, Crosswire, Dingbats and Chicktionary)
// @namespace      thehuey.com
// @description    Remove the Search frame so games are faster.  Adds a solution helper instead.
// @include        http://club.live.com/Pages/Games/GamePlay.aspx?game=*
// Updated: 5/31/2008  Support for new URL scheme at club.live.com
// ==/UserScript==

setTimeout(function() {

this.GameShowAPI.Search = function (term, a, b) {
}

var sel = document.getElementById('ifSearchResult');
//sel.parentNode.removeChild(sel);
sel.height = '1150px';
var mydoc = document.location + '';
if (mydoc.match(/game=chick/i) || mydoc.match(/game=spelling/i) || mydoc.match(/game=Word_Slugger/i)) {
  sel.src = 'http://www.anagramssolved.com/index.html';
} else if (mydoc.match(/game=flexicon/i)) {
  sel.src = 'http://www.anagramssolved.com/flexicon-solutions.html';
} else if (mydoc.match(/game=clink/i)) {
  sel.src = 'http://www.anagramssolved.com/clink-solutions.html';
} else if (mydoc.match(/game=dingbats/i)) {
  sel.src = 'http://www.anagramssolved.com/dingbats-solutions.html';
} else if (mydoc.match(/game=crosswire/i)) {
  sel.src = 'http://www.anagramssolved.com/crosswire-solutions.html';
} else if (mydoc.match(/game=seekadoo/i)) {
  sel.src = 'http://www.anagramssolved.com/seekado-solutions.html';
} else if (mydoc.match(/game=EnLIVEnment/i)) {
  sel.src = 'http://www.anagramssolved.com/index.html';
} else {
  sel.src = 'http://www.anagramssolved.com/index.html';
}

}, 500);