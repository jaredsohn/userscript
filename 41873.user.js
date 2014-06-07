// ==UserScript==
// @name           Reddit Uppers and Downers
// @namespace      mistercow
// @description    Show up-votes and down-votes next to the total score on reddit comments.
// @include        http://*.reddit.com/*/comments/*
// @include        http://reddit.com/*/comments/*
// ==/UserScript==

/*
This code is provided as is, with no warranty of any kind.

I hacked it together in one night for my own use, and have not tested it extensively.

The script can slow down comment page load time; if the lag is noticeable, you may want
to change your preferences to load fewer comments per page.

Note that this runs once and does not install any persistent code on the page. So any votes
you cast will not affect the numbers displayed until you reload.

Also note that the ups and downs will not always add up to the score displayed on reddit.
I think this is because of caching on reddit's part. It's usually within one or two points though.

*/



//Get the URL for the JSON details of this comments page
var loc = ""+location;
var jsonURL = loc + "/.json";
if(loc.indexOf("?") != -1) {
	jsonURL = loc.replace("?","/.json?");
}


var voteTable = new Object();

//load the JSON
GM_xmlhttpRequest({
	method:	"GET",
	url:	jsonURL,
	onload:	onloadJSON
});

function onloadJSON(response) {
	var jsonText = response.responseText;
	//Parse the json text
	var data = eval("("+jsonText+")");
	//Load the vote table by processing the tree
	
	processTree(data);
	//Display the loaded votes
	displayVotes();
}


//Recursively process the comment tree
function processTree(obj) {
	if(obj instanceof Array) {
		for each (var tree in obj) { 
			processTree(tree);
		}
	}
	var data = obj.data;
	if(data) { //Data found
		if(isComment(obj)) {
			var name = data.name;
			if(name) { //Store the votes in the vote table
				var ups = 0, downs = 0;
				if(data.ups) ups = data.ups;
				if(data.downs) downs = data.downs;
				voteTable[name] = {downs:downs, ups:ups};
			}
		}
		
		//Process any subtrees
		processChildren(data);
		processReplies(data);
		
	}
}

//Display the votes from the vote table
function displayVotes() {
//	GM_log("Displaying votes: " + voteTable.toSource())
	//Add the style sheets for up and down ratings
	GM_addStyle(".moo_ups { color:rgb(255, 139, 36); font-weight:bold; }");
	GM_addStyle(".moo_downs { color:rgb(148,148,255); font-weight:bold; }");
	//Get all div tags
	var allDivs = document.getElementsByTagName("div");
	for each (var d in allDivs) {
		if(!d.className) continue;
		//For each entry in the table
		for (var name in voteTable) {
			if(d.className.indexOf(name) != -1) {
				//Found the div, find the first span with class "score likes"
				var spans = d.getElementsByTagName("span");
				var count = 0;
				for each (var s in spans) {
					//This must be done twice; for collapsed and expanded,
					//but if done *more* than twice, replies end up with multiple up/down appendages
					if(s.className && (s.className.indexOf("score likes") != -1)) {
//						GM_log("Found a 'score *' span");
						scoreSpan = s;
						var votes = voteTable[name];
						//Append ups and downs
						scoreSpan.parentNode.innerHTML += " (<span class=moo_ups>" + votes.ups + "</span>|<span class=moo_downs>"+votes.downs+"</span>)";
						count++;
						if(count > 1) {
							delete voteTable[name]; //our work here is done
							break;
						}
					}
				}
			}
		}
	}
	
}

function isComment(obj) {
	return obj.kind == "t1";
}

function processChildren(data) {
	var children = data["children"];
	if(children) {
		//Process the children
		for each (var child in children) {
			processTree(child);
		}
	}
}

function processReplies(data) {
	//Process the replies tree
	var replies = data["replies"];
	if(replies) {
		processTree(replies);
	}
}

