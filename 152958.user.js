// ==UserScript== 

// Forged by the evil overlord Maddieman
// ..Based on THIS IS MY PIG by jessamyn
// ....Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey",
// ......based off another script based off that

// @name          Minions!
// @namespace     http://userscripts.org/userscripts
// @description   Simple things please nefarious minds.
// @include        http://www.last.fm/*
// @include        http://www.youtube.com/*
// @include        http://www.facebook.com/*
// @include        http://www.thisismyjam.com/*
// @include        https://twitter.com/*
// @include        https://alpha.app.net/*
// @include        https://app.net/*


// ==/UserScript== 

(function() {
    var replacements, regex, key, textnodes, node, s; 

    replacements = { 

        "Moderator": "Minion",

        "be your friend": "do your bidding",

        "Subscribers": "Minions",
        "subscribers": "minions",

        "Followers": "Minions",
        "followers": "minions",
        "Follower": "Minion",
        "follower": "minion",

	"Find friends": "Recruit minions",
	"find more friends": "recruit more minions",
	"Add as friend": "Recruit Minion!",
	"Add Friend": "Recruit Minion!",
	"make friends": "recruit minions",

	"Send a message": "Command Minion!",
	"Leave a shout": "Shout at Minion!",

	"Friends": "Minions",
	"friends": "minions",
	"Friend": "Minion",
	"friend": "Minion",

	"poke": "slap"
    }; 

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