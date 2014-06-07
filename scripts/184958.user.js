// ==UserScript==
// @name        TheJonyMyster
// @namespace   jony.js
// @match      http://thejonymyster.tumblr.com/
// @version     2
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;

replacements = {

"A" : "a",
"B" : "b",
"C" : "c",
"D " : "d",
"E" : "e",
"F" : "f", 
"G" : "g",
"H" : "h",
"I" : "i",
"J" : "j",
"K" : "k",
"L" : "l",
"M" : "m",
"N" : "n",
"O" : "o",
"P" : "p",
"Q" : "q",
"R" : "r",
"S" : "s",
"T" : "t",
"U" : "u",
"V" : "v",
"W" : "w",
"X" : "x",
"Y" : "y",
"Z" : "z",
"awesome" : "cool",
"hello" : "yo yo yo its jony im awesome",
"canada" : "Canada",
"expensive" : "$$$",
"ok" : "k",
"pony" : "jony",
"earth" : "brainia",
"turretbot" : "turret",
"poines" : "joines"
"brain" : "brainia",
"graphic novel" : "scott pilgrim",
"great" : "grape",
"cow" : "cowabunga",
"haha" : "pff",
"hahaha" : "pffff"
"turret opera" : "TO",
"wonderful" : "nice",
"the store" : "publix"
"saso" : "the guy who is going to kill me someday",
"okay" : "fine",
"sure" : "whatever",
":)" : ":>",
"mama luigi" : "those we dont speak of",
";" : ", a semicolon should go here but i put this instead,"
"yo" : "heyu",
"!!" : "!!!1!!! !! !!!! 11!! one",
"!?" : "!?!?!?!????!?!?!?!??!?!?!111!?!1?1?!/1",
"??" : " cmon please",
"come on" : "cmon",
"mario" : "mari0",
"thejonymyster" : "jony",
"bye" : "gtg",
"yeah" : "ya",
"you" : "ya",
"'" : "",
"*" : "",
"." : "",
//"" : "", //use this to make your own
};

regex = {};
for (key in replacements) {
regex[key] = new RegExp(key, 'ig');
}

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
s = node.data;
//s = s.toLowerCase();
for (key in replacements) {
s = s.replace(regex[key], replacements[key]);
}
node.data = s;
}

})();


// 
// 
// Considered it too tasteless to add these into the list
// but too good to leave out for all users. :V Works pretty well in most cases.