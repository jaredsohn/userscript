// ==UserScript==
// @name      Convert 1-26 to A-Z
// @version    1.0
// ==/UserScript==
(function() {
var replacements, regex, key, textnodes, node, s;

replacements = { 

"10": "J",
"11": "K",
"12": "L",
"13": "M",
"14": "N",
"15": "O",
"16": "P",
"17": "Q",
"18": "R",
"19": "S",
"20": "T",
"21": "U",
"22": "V",
"23": "W",
"24": "X",
"25": "Y",
"26": "Z", 
"1": "A",
"2": "B",
"3": "C",
"4": "D",
"5": "E",
"6": "F",
"7": "G",
"8": "H",
"9": "I", };

regex = {};
for (key in replacements) {
regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
s = node.data;
for (key in replacements) {
s = s.replace(regex[key], replacements[key]);
}
node.data = s;
}
})();