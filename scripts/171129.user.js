// Last Updated: 04-09-2011
// By SiNiquity (-Bane)
//
// CHANGE LOG
// Version 1.2
// Added vote tally

// Version 1.1
// Added rank next to name

// Version 1.0
// Reordered poll results so highest votes are at the top.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Tribalwar Ordered Polls
// @namespace     SiNiquity
// @description   Orders poll results and counts total number of voters.
// @version       1.2
// @include       http://www.tribalwar.com/forums/poll.php?do=showresults*
// @include       http://www.tribalwar.com/forums/showthread.php*
// ==/UserScript==

var voteIter = document.evaluate("//td[@title = 'Votes']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var iterNode = voteIter.iterateNext();

if(!iterNode) return;

var voteArray = new Array();
var lastNonVoteSibling = getPrevNode(iterNode.parentNode);
var parent = iterNode.parentNode.parentNode;

while(iterNode) {
    var val = iterNode.firstChild.firstChild;
    if(val.nodeType == 3) {
	val = val.nodeValue;
    } else {
	val = val.firstChild.nodeValue;
    }
    
    voteArray.push({votes: parseInt(val),
		    node: iterNode.parentNode});
    iterNode = voteIter.iterateNext();
}


voteArray.sort(function(a,b) {
    return b.votes - a.votes;
});

while(lastNonVoteSibling.nextSibling) {
    parent.removeChild(lastNonVoteSibling.nextSibling);
}

var voteCount = new Array();
var numVoters = 0;

for(var i = 0; i < voteArray.length; i++) {
    parent.appendChild(voteArray[i].node);
    var nameNode = voteArray[i].node.firstChild;
    while(nameNode.nodeType == 3) {
	nameNode = nameNode.nextSibling;
    }

    // Add ranking
    nameNode.insertBefore(document.createTextNode((i+1) + ". "), nameNode.firstChild);

    var voteList = nameNode.firstChild;
    while(voteList && voteList.nodeName.toLowerCase() != "div") {
	voteList = voteList.nextSibling;
    }

    if(voteList) {
	var voters = voteList.firstChild;
	while(voters) {
	    if(voters.nodeName.toLowerCase() == "a") {
		var voter = voters.firstChild.nodeValue;
		if(voteCount[voter]) {
		    voteCount[voter]++;
		} else {
		    voteCount[voter] = 1;
		    numVoters++;
		}
	    }
	    voters = voters.nextSibling;
	}
    }
}

if(numVoters > 0) {
    var voteCountNode = document.createElement("td");
    voteCountNode.setAttribute("class", "thead");
    voteCountNode.setAttribute("align", "center");
    voteCountNode.style.fontWeight = "normal";
    voteCountNode.setAttribute("colspan", "4");
    voteCountNode.appendChild(document.createTextNode("Number of voters: "));
    var boldNode = document.createElement("strong");
    boldNode.appendChild(document.createTextNode(numVoters));
    voteCountNode.appendChild(boldNode);
    if(lastNonVoteSibling) {
	parent.insertBefore(voteCountNode, lastNonVoteSibling.nextSibling)
    }
			   
}

function getPrevNode(node) {
    var prevNode = node.previousSibling;
    while(prevNode && prevNode.nodeType == 3 && prevNode.nodeValue.trim().length == 0) {
	prevNode = prevNode.previousSibling;
    }
    return prevNode;
}