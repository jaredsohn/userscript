// ==UserScript==
// @name		Check Reddit Mail
// @version 		1.06
// @namespace		http://ictinus.com/crm/
// @description		Checks your unread messages when you click the '?' next to your mail icon.
// @match		http://*.reddit.com/*
// @match		https://*.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: 04 December 2010
// Updated: 21 October 2011, v1.05 fixed execution in Firefox.
// Updated: 26 October 2011, v1.06 fixed the setting of className of mail element. Removed orangered when no new mail. Fixed lowered mail icon in Chrome.

var redditMailChecker = {
	version : 1.06,
	init: function() {
		var aMail = document.getElementById("mail");
		var spanCheck = document.createElement('span');
		spanCheck.id = "mailChecker";
		spanCheck.innerHTML = "<b>?</b>";
		spanCheck.style.cursor = "pointer";
		spanCheck.style.marginLeft = "4px";
		spanCheck.style.fontWeight = "bold";
		spanCheck.addEventListener("click", function() { redditMailChecker.update(); }, false);
 		aMail.parentNode.insertBefore(spanCheck, aMail.nextSibling);
	},
	update: function() {
		var mailChecker = document.getElementById("mailChecker");
		mailChecker.innerHTML =  "-";
		xhr = new XMLHttpRequest;
		xhr.open("GET","http://www.reddit.com/message/unread.json", true);
		xhr.onreadystatechange = function () {
			redditMailChecker.display();
		};
		xhr.send();
	},
	display: function() {
		var mailChecker = document.getElementById("mailChecker");
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					var response=xhr.responseText;
					var unreadJSON = JSON.parse(response);
					if (unreadJSON.data.children.length == 0) {		
						var aMail = document.getElementById("mail");
						aMail.className = "nohavemail";
						aMail.title = "no new mail";
						aMail.alt = "no new mail";
						aMail.innerHTML = "messages";
						mailChecker.innerHTML = "?";
					} else {
						var aMail = document.getElementById("mail");
						aMail.className = "havemail";
						aMail.title = "new mail!";
						aMail.alt = "new mail!";
						aMail.innerHTML = "<img src=\"/static/mail.png\" alt=\"messages\">"
						mailChecker.innerHTML = unreadJSON.data.children.length;
					}
				} else {
						mailChecker.innerHTML = "¿";
				}
			}
		}
}

if (document.body) { 
	redditMailChecker.init();
}

