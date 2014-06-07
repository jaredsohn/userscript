// ==UserScript==
// @name           lolweeaboos
// @namespace 
// @description    Replaces alternate terms for weeaboo with weeaboo
// @include        *
// ==/UserScript==

var replacements, regex, textnodes,  key, node, s;

replacements = { 
"otaku":"weeaboo",
"otakus":"weeaboos",
"Otaku":"Weeaboo", 
"Otakus":"Weeaboos", 
"japanophile":"weeaboo",
"japanophiles":"weeaboos",
"Japanophile":"Weeaboo", 
"Japanophiles":"Weeaboos", 
"anime":"animu", 
"Anime":"Animu",
"manga":"mango", 
"Manga":"Mango", 
"wapanese":"weeaboo", 
"Wapanese":"Weeaboo", 
"animes":"animus", 
"Animes":"Animus",
"mangas":"mangos",
"Mangas":"Mangos",
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