// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts.
//
// ==UserScript==
// @name            ThesePollsSuck
// @description     Blah
// @include         http://www.bodymod.org/forum/*
// ==/UserScript==


// some Logging
//debug = GM_log
debug = function(x){}

function removeRow(row) {
    row.parentNode.removeChild(row)
}

//A Handler that matches a document's url against a given regular expression.
//If that match is successfull it uses a given XPath-Expression to extract set 
//of child Nodes. To these a given action is applied.

function XPathHandler(matcher,path,action) {

    function withAllInSnapShot (snap,action) {
		debug ("Found " + snap.snapshotLength + " nodes.");
		for (i=0; i < snap.snapshotLength; i++){
			action(snap.snapshotItem(i));
		}
    }


    this.applicable = function (url) {
	return matcher.test(url)
    }

    this.execute = function (doc) {
	if (this.applicable(doc.URL)) {
		debug("Handler fits document " + doc.URL + " : " + path);
     		var snap = doc.evaluate(path,doc,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		withAllInSnapShot(snap, action);
	}
	else {
					
		debug("Handler doesn't fit document " + doc.URL + " : " + matcher);
	}
    }
}



function main() {

//handlers for the individual urls.
handlers = new Array (	

	new XPathHandler (/.*/ ,
			  "/html/body/table/tbody/tr/td[3]/self::*[starts-with(text(),'Poll:')]/ancestor::tr/td[4]/a[text()='hellboy69']/ancestor::tr" ,
			  removeRow));

	
	for (i in handlers) {
		var handler = handlers[i];
		handler.execute(document);
	}
	
}

window.addEventListener("load", main, false); 
