// ==UserScript==
// @name           block168ID
// @namespace      ts709@trader1688.com
// @description    Block IDs at trader1688 and gutone forum
// @include        http://*.trader1688.com/bb/*
// @include        http://*.gutone.com/phpbb3/*
// @include        http://gutune.com/phpbb3/*
// @exclude        http://*.trader1688.com/bb/flow.php*
// @exclude        http://*.trader1688.com/bb/search.php*
// @exclude        http://*.trader1688.com/bb/sim.php*
// @exclude        http://*.trader1688.com/bb/ucp.php*
// ==/UserScript==

// UPDATES
// V0.03.2 - changed @included http://*.gutone.com/phpbb3/*
// V0.03.1 - added @included http://gutone.com/phpbb3/*
// V0.03   - fixed a problem when when topicauthors for reply and post are the same

//edit your list of IDs to be blocked (separated by "|")
var pattern = /dave_liu|阳*光*灿*烂/;

var allElements, thisElement;
allElements = document.getElementsByTagName('*');
var delQuotes = new Array()
var delLists = new Array()
var delPosts = new Array()

function getParent(el, parentTagName){
	var obj = el;
	while(obj.tagName !== parentTagName){
		//GM_log(obj.nodeName)
		obj = obj.parentNode;
	}
	return obj;
}

for (var i=0; i<allElements.length; i++) {
	thisElement = allElements[i];

	//remove quoted contents
	if (thisElement.className =="quotetitle" ) {		
		if (thisElement.innerHTML.search(pattern) != -1) {
			////hide quote
			//thisElement.style.visibility = "hidden";
			//thisElement.nextSibling.style.visibility = "hidden";
			////or remove quote
			delQuotes.push(thisElement)
			delQuotes.push(thisElement.nextSibling)
		}
	}

	//remove items from the lists on homepage
	if (thisElement.className == "topicauthor" ) {
		if (thisElement.innerHTML.search(pattern) != -1) {
			trp = getParent(thisElement, 'TR');
			delLists.push(trp)
		}
	}

	//remove posts
	if (thisElement.className == "postauthor" ) {
		if (thisElement.innerHTML.search(pattern) != -1) {
			post = getParent(thisElement, "TABLE");
			delPosts.push(post)
		}
	}
}

var delItems = delQuotes.concat(delLists)
delItems = delItems.concat(delPosts)

for (var d=0; d<delItems.length; d++) {
	try { delItems[d].parentNode.removeChild(delItems[d]) }
	catch (err) { /* ignore errors */ }
}
