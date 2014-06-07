// ==UserScript==
// @name			What's My Reddit Id?
// @version 		1.01
// @namespace		http://ictinus.com/wmri/
// @description		Displays your unique Reddit id next to you Reddit Name.
// @include			http://www.reddit.com/*
// Author: Ictinus
// Released: 30 November 2010, display your Reddit id next to your Reddit name.
// Updated: 22 January 2011, rewritten to not conflict with 'Reddit - Display your comment karma' http://userscripts.org/users/115800
// ==/UserScript==

var WhatsMyRedditID = {
	version : 1.01,
	className: "wmri",
	init: function() {
	    var hbr = document.getElementById("header-bottom-right");
	    var theUserSpan = hbr.getElementsByClassName("user");
	    if (theUserSpan && theUserSpan[0]) {
	        var idSpan = document.createElement('span');
	        idSpan.id = WhatsMyRedditID.className;
	        idSpan.inneHTML = "-";
	        theUserSpan[0].parentNode.insertBefore(idSpan, theUserSpan[0].nextSibling);
	        var sepSpan = document.createElement('span');
	        sepSpan.className = "separator";
	        sepSpan.innerHTML = "|";
	        theUserSpan[0].parentNode.insertBefore(sepSpan, theUserSpan[0].nextSibling);
	        WhatsMyRedditID.update(theUserSpan[0].firstChild.innerHTML);
	    }
	},
	update: function(userName) {
		xhr = new XMLHttpRequest;
		xhr.open("GET","http://www.reddit.com/user/" + userName + "/about.json", true);
		xhr.onreadystatechange = function () { 
        	WhatsMyRedditID.display();
        };
        xhr.send();
	},
	display: function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var response=xhr.responseText;
                var unreadJSON = JSON.parse(response);
                var idSpan = document.getElementById(WhatsMyRedditID.className);
				idSpan.title = "your reddit id";
				idSpan.alt = "your reddit id";
				idSpan.innerHTML = "id-" + unreadJSON.kind + "_" + unreadJSON.data.id;
            }
    	}
    }
}

if (document.body) { 
    WhatsMyRedditID.init();
}