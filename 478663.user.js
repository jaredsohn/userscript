// ==UserScript==
// @name           forumrealism
// @namespace      http://localhost
// @include        http://wawgame.eu/forums*
// ==/UserScript==
var whichreplace;
var replace;

textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /[a-z]/gi;
for (var i=0;i<textNodes.snapshotLength;i++) {
var whichreplace = Math.floor(Math.random()*10+1);
if (whichreplace === 1) {
replace = 'oy vey ';
}
else if (whichreplace === 2) {
var replace = 'IT. IS. HAPPENING. ';
}
else if (whichreplace === 3) {
var replace = "It's like another shoah. ";
}
else if (whichreplace === 4) {
var replace = 'THE GOYIM KNOW. ';
}
else if (whichreplace === 5) {
var replace = 'shill ';
}
else if (whichreplace === 6) {
var replace = 'SHUT IT DOWN ';
}
else if (whichreplace === 7) {
var replace = 'exploit ';
}
else if (whichreplace === 8) {
var replace = 'heidi pls. ';
}
else if (whichreplace === 9) {
var replace = 'GAS THE KIKES RACE WAR NOW. ';
}
else if (whichreplace === 10) {
var replace = 'space africa ';
}
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
