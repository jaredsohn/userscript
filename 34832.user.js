// Based on a script found on userscripts.org, renamer: http://userscripts.org/scripts/show/1496"

// ==UserScript== 
// @name          accessible-twitterkeys
// @namespace    icaaq.com
// @description   Though most screen-readers don't read utf-8 keys this script replaces twitter-keys with plain text
// @include      http://thenextweb.org/2008/09/16/twitterkeys-enhance-your-twitter-conversations/
// @include      *twitter.com/* 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
	"♥" : "love",
	"✈" : "plane",
	"☺" : ":-)",
	"♬" : "music",
	"☑" : "boxtick",
	"♠" : "spade",
	"☎" : "phone", 
	"☻" : "darksmile", 
	"♫" : "song", 
	"☒" : "box", 
	"♤" : "whitespade", 
	"☤" : "carrot",
	"☹" : ":-(", 
	"♪" : "note", 
	"♀" : "female", 
	"✩" : "star", 
	"✉" : "letter",
	"☠" : "pirate", 
	"✔" : "tick", 
	"♂" : "male", 
	"★" : "darkstar", 
	"✖" : "cross", 
	"♨" : "cook",	
	"❦" : "random1",	
	"☁" : "cloud",
	"✌" : "peaceout", 
	"♛" : "king",
	"❁" : "rose",
	"☪" : "islam",
	"☂" : "umbrella",
	"✏" : "pen",
	"♝" : "bishop",
	"❀" : "flower",
	"☭" : "tools",
	"☃" : "snowman",
	"☛" : "->",
	"♞" : "darkknight",
	"✿" : "darkflower",
	"☮" : "peace",
	"☼" : "sun",
	"☚" : "<-",
	"♘" : "knight",
	"✾" : "random",
	"☯" : "ying",
	"✝" : "christ",
	"☾" : "moon",
	"☝" : "up",
	"♖" : "rook",
	"✽" : "snow",
	"☄" : "comet",
	"☟" : "down",
	"♟" : "pawn",
	"✺" : "random3",
	"☥" : "prince",
	"✂" : "cut",
	"✍" : "write",
	"♕" : "queen",
	"✵" : "darkstar2",
	"©" : "&copy;",
	"™" : "tm",
	"€" : "euro",
	"«" : "<<", 
	"»" : ">>",
	"¥" : "yen",
	"✇" : "wheel",
	"♺" : "recycle/retweet/rt",
	"☢" : "radioactive" 
	}

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