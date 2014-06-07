// ==UserScript==
// @name           MLP makes me rage
// @namespace 
// @description    It does
// @include        http://3dsforums.com/*
// ==/UserScript==

var replacements, regex, textnodes,  key, node, s;

replacements = { 
"My Little Pony":"The Legend of Zelda",
"my little pony":"The Legend of Zelda",
"MLP":"LoZ", 
"Ponies":"Octoroks", 
"ponies":"Octoroks",
"ponys":"Octoroks",
"Fluttershy":"Zelda", 
"Pinkie Pie":"Ganon", 
"Friendship is Magic":"The Triforce of Courage", 
"friendship is magic":"The Triforce of Courage",
"Twilight Sparkle":"The Wind Fish", 
"Applejack":"Moblin", 
"Rainbow Dash":"Ganondorf", 
"Rarity":"Skull Kid", 
"Pony":"Link", 
"PONY":"Link",
"pony":"Link",
"Lyra":"Veran",
"Spike":"The Happy Mask Salesman" 
};

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
	s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}