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
// @name            Wildcat Sanitizer
// @description     Enables "open in new tab" for Profiles and images on www.wildcat.de. Not tested too well.
// @include         http://www.wildcat.de/*
// ==/UserScript==


// some Logging
//debug = GM_log
debug = function(x){}






//How to repair a given <a href ... >

function repairAnchor(node) {
	debug("Repairing:" + node.nodeName);
	var oldAttr;
	with (node) {
		oldAttr = hasAttribute("onClick") ? getAttribute("onClick") : getAttribute("href");
	}
	var urlRegExp = ( /.*\bwindow\.open\('([^']*)'.*/ );
	var newAttr = urlRegExp.exec(oldAttr);
	if (newAttr){
	var myLink = newAttr[1];
	node.removeAttribute("onClick");
	node.setAttribute("href",myLink);
	} else {
		debug(oldAttr);
	}
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

	new XPathHandler (/http:\/\/www\.wildcat\.de\/index\.php\?view=0c-communitystart#?/ ,
			  '/html/body/table[2]/tbody/tr[1]/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[1]/a' ,
			  repairAnchor),

	new XPathHandler (/http:\/\/www\.wildcat\.de\/index\.php\?view=0c-communitystart#?/ ,
			  '/html/body/table[2]/tbody/tr[1]/td/table[3]/tbody/tr/td/table[1]/tbody/tr[2]/td[2]/div/table/tbody/tr[2]/td/table/tbody/tr/td/a'
			  , repairAnchor),

        new XPathHandler (/http:\/\/www\.wildcat\.de\/index\.php\?view=0[p|t]-gallerystart#?/ ,
			  '/html/body/table[2]/tbody/tr[1]/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td/a' ,
			   repairAnchor),

	new XPathHandler (/http:\/\/www\.wildcat\.de\/index\.php\?view=0[p|t]-galleryshow&gallery=\d+(&offset=\d+)?#?/ ,
			  '/html/body/table[2]/tbody/tr[1]/td/table[3]/tbody/tr/td/table/tbody/tr[position() < 5]/td/a' ,
			  repairAnchor),

	new XPathHandler (/http:\/\/www\.wildcat\.de\/index\.php\?view=user_search_exe&layout=o#?/ ,
			  '/html/body/div[@id=\'content\']/table/tbody/tr/td[7]/a' ,
			  repairAnchor)
	);

	
	for (i in handlers) {
		var handler = handlers[i];
		handler.execute(document);
	}
	
}


window.addEventListener("load", main, false); 

