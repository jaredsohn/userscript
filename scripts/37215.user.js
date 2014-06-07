// ==UserScript==
// @name           TweetColouriseByAge
// @namespace      maeki.org
// @description    Add different background colour to tweet according to their age
// @include        http://twitter.com/*
// @exclude				 http://twitter.com/home
// @exclude        http://twitter.com/replies
// @exclude        http://twitter.com/favorites
// @exclude        http://twitter.com/direct_messages
// @exclude        http://twitter.com/followers
// @exclude        http://twitter.com/friends
// @exclude        http://twitter.com/invitations
// @exclude        http://twitter.com/devices
// @exclude        http://twitter.com/account/*

// ==/UserScript==

var allSbTds, thisSbTd;
allSbTds = document.evaluate(
    "//a[@class='entry-date']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSbTds.snapshotLength; i++) {
    thisSbTd = allSbTds.snapshotItem(i).parentNode.parentNode;
    var ageString, newBgColour;
    newBgColour = null;
    ageString = thisSbTd.childNodes[5].textContent;
    if (ageString.match('minutes ago')) {
    	newBgColour = '#ffbbbb';
    	}
    else if (ageString.match('1 hour ago')) {
    	newBgColour = '#ffffbb';
    	}
    else if (ageString.match(' \\d hours ago')) {
    	newBgColour = '#bbffbb';
    	}
    else if (ageString.match(' \\d\\d hours ago')) {
    	newBgColour = '#bbffff';
    	}	
    else if (ageString.match('yesterday')) {
    	newBgColour = '#ccccff';
    	}		
    if(newBgColour) { 
    	thisSbTd.parentNode.style.backgroundColor=newBgColour;
    }
}