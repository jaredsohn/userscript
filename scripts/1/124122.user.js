// ==UserScript==
// @name           OWA mail checker, keepalive
// @namespace      http://tekao.net
// @description    refresh owa and show new email in title
// @include        https://your-owa-server.tld/owa/?ae=Folder*
// ==/UserScript==

// Times in seconds
var refreshTime = 60;
var firstLoadWaitTime = 3;


parent.document.title = "(..loading..) Inbox";
var navbody = document.getElementsByTagName('body')[0];


function check_unread () {
 	bolds = document.getElementsByClassName("bld").length;
 	var unread;
 	if (bolds > 0) {
        unread = bolds - 1;
    } else {
        unread = 0;
    }

	if (unread < 0) {
		parent.document.title = "(..loading..) Inbox";
	} else {
    	parent.document.title = "("+unread+") Inbox";
	}

	unread_count = unread;

	//Make timer reload iframe
	var tm = setTimeout(reload, refreshTime*1000);
}

function reload() {
    window.location = window.location
}

var tm = setTimeout(check_unread, firstLoadWaitTime*1000);



