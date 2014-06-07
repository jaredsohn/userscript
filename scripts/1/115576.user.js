// ==UserScript==
// @name		Check Reddit Modqueue
// @version 		1.03
// @namespace		http://ictinus.com/crmq/
// @description		Checks your modqueue.
// @match		http://*.reddit.com/*
// @match		https://*.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: 14 October 2011
// Update: 21 Oct 2011, v1.02, fixed execution in Firefox. Thanks to TedFromTheFuture.
// Update: 11 Jan 2011, v1.03, fixed icon display after reddit style changes.

var redditModqChecker = {
	version : 1.03,
	init: function() {
		var aMail = document.getElementById("modmail");
	        var spanCheckmq = document.createElement('span');
        	spanCheckmq.id = "modqChecker";
        	spanCheckmq.innerHTML = "";
        	spanCheckmq.style.cursor = "pointer";
		spanCheckmq.href = "#";
 		aMail.parentNode.insertBefore(spanCheckmq, aMail.nextSibling);
		redditModqChecker.update();
	},
	addGlobalStyle : function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	update: function() {
		xhr = new XMLHttpRequest;
		xhr.open("GET","/r/mod/about/modqueue.json", true);
		xhr.onreadystatechange = function () { 
        		redditModqChecker.display();
        	};
        	xhr.send();
	},
	display: function() {
		var modqChecker = document.getElementById("modqChecker");
		if(xhr.readyState == 4) {
        	if(xhr.status == 200) {
        		var response=xhr.responseText;
        		var unreadJSON = JSON.parse(response);
        		if (unreadJSON.data.children.length == 0) {
       	            modqChecker.innerHTML = "";
        		} else {
					modqChecker.innerHTML = "<span class='separator'>|</span><a class='rmc-spam' href='/r/mod/about/modqueue'>&nbsp;</a><span>" + unreadJSON.data.children.length + "</span>";
				}
			} else {
               	modqChecker.innerHTML = "<span class='separator'>|</span><a class='rmc-spam' href='/r/mod/about/modqueue'>¿</a>";
			}
		}
    }
}

if (document.body) {
	redditModqChecker.addGlobalStyle('a.rmc-spam {background-image:url(/static/sprite-main.png); background-position:-50px -1023px; width: 18px;  height: 14px; overflow:hidden; top:-1px; margin-bottom: -6px; margin-right:2px; display: inline-block; position:relative; } span#modqChecker {font-weight:bold; color: #369;}');
	redditModqChecker.init();
}

