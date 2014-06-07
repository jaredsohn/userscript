// ==UserScript==
// @name           SILO Webmail
// @namespace      http://mail.silo.lib.ia.us/
// @description    Toggles the title attribute when a new message arrives
// @include        http://mail.silo.lib.ia.us/*
// ==/UserScript==

function getElementsByClass(theClass, node) {
    var classElements = [];
    var i;
    if ( node == null ) {
    	node = document
    }
    if (node.getElementsByClassName) {
    	var tempCollection = node.getElementsByClassName(theClass);
        for (i = 0; i < tempCollection.length ; i++) {
    		classElements.push(tempCollection[i])
    	}
    }
    else {
    	var els = node.getElementsByTagName("*");
    	var elsLen = els.length;
    	var pattern = new RegExp("(^|\\s)"+theClass+"(\\s|$)");
    	for (i = 0; i < elsLen; i++) {
    		if ( pattern.test(els[i].className) ) {
    			classElements.push(els[i]);
    		}
    	}
    }
    return classElements;
};

function setTitle() {
    inbox = document.getElementById("_0_");
    unread = getElementsByClass("nbunread", inbox);
    unread_count = unread[0].innerHTML;
    if(!unread_count) unread_count = "";
    
    document.title = "SILO Webmail " + unread_count;
}

function init() {
    setTitle();
    setInterval('setTitle()', 5000);
}

window.onload = init;