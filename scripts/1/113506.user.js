// ==UserScript==
// @name           MLP makes me rage - Blue bomber edition
// @namespace 
// @description    It does
// @include        http://3dsforums.com/*
// ==/UserScript==

var replacements, regex, textnodes,  key, node, s;

replacements = { 
"My Little Pony":"Megaman",
"my little pony":"Megaman",
"MLP":"MML", 
"Ponies":"Megaman", 
"ponies":"Megaman",
"ponys":"Megaman",
"Fluttershy":"Woodman", 
"Pinkie Pie":"Dr. Wily", 
"Friendship is Magic":"Robot Masters", 
"friendship is magic":"Robot Masters",
"Twilight Sparkle":"Starman", 
"Applejack":"Napalmman", 
"Rainbow Dash":"Splashwoman", 
"Rarity":"Roll", 
"Pony":"Zero", 
"PONY":"Zero",
"pony":"Zero",
"Lyra":"Shadowman",
"Spike":"Dr. Light" 
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