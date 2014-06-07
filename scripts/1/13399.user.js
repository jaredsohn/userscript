// ==UserScript==
// @name           OWA MailNotify
// @namespace      http://blog.hacker.dk/category/greasemonkey/
// @description    Keeps your Exchange OWA session alive and checks mail. Also while composing mail, etc.
// @include        https://your-owa-server.tld/exchange/*?Cmd=navbar*
// ==/UserScript==

// Times in seconds
var refreshTime = 60;
var iframeLoadWaitTime = 3;
var iframeFirstLoadWaitTime = 3;


//-------------------------------

var unread_count = -1;

parent.document.title = "(..loading..) Inbox";
var navbody = document.getElementsByTagName('body')[0];


// Inject an IFRAME into the navbar containing the inbox
navbody.innerHTML = navbody.innerHTML.replace(/$/,'<iframe id="iframeinbox" frameborder=no scrolling=no width=0 height=0 src="Inbox/?Cmd=contents&iframeinbox=1"></iframe>');

// Find the iframe and change its code.
function enter_iframe () {
	var iframe = document.getElementById('iframeinbox');
	iframe = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;
	iframe = iframe.documentElement || iframe.body;

     	bolds = iframe.getElementsByTagName("b");
        unread = (bolds.length - 4);
        // each unread message has 8 bold tags associated with it
        if (unread > 0){unread= unread/8;}
        // update the title of the parent frameset
	if (unread < 0) {
		parent.document.title = "(..loading..) Inbox";
	} else {
        	parent.document.title = "("+unread+") Inbox";
	}

	if ((unread > unread_count) && (unread_count != -1)) {
		//	Todo: Do some notification.. Like: 
		//	alert('Youve got mail!');
		//	or
		//	window.open('youvegotmail.html','"noti"','');
		//	or even better. Simply play a sound
	}

	unread_count = unread;

	//Make timer reload iframe
	var tm = setTimeout(reload,refreshTime*1000);
}

function reload() {
	var iframe = document.getElementById('iframeinbox');
	iframe.src = iframe.src;

	//Wait iframeLoadWaitTime seconds to make sure the iframe is completely loaded.
	var tm = setTimeout(enter_iframe, iframeLoadWaitTime*1000);
}

//--- First run
//Wait iframeFirstLoadWaitTime seconds to make sure the iframe is completely loaded.
var tm = setTimeout(enter_iframe, iframeFirstLoadWaitTime*1000);


