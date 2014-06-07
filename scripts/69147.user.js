// ==UserScript==
// @name           Second Life Forums: PM Alerts
// @namespace      https://blogs.secondlife.com/
// @include        https://blogs.secondlife.com/*
// ==/UserScript==

    var pmText = document.getElementsByClassName("jive-link-inboxnew");

    if (pmText[0]) {
	    var msg = pmText[0].innerHTML;
	    msg = msg.replace(/^.*<strong>/,'<p class=\"jive-link-privatemsg\">You have <b><a href=\"https://blogs.secondlife.com/pm.jspa\">');
	    msg = msg.replace(/new/, 'unread');
	    msg = msg.replace(/<.strong>.*$/,'</a></b> private message(s).</font></p>');

	    var id = document.getElementById("jive-breadcrumb");
	    var tempStr = id.innerHTML;
	    tempStr += msg;
	    id.innerHTML = tempStr;

    }
   


