// ==UserScript==
// @name        vBulletin4 - Push Notifications
// @namespace   your forum
// @description Alerts you to new notifications on one vB4 forum
// @include     *
// @version     1.1
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

if (GM_getValue("site") == null || GM_getValue("notifs") == null) {
	GM_setValue("site",prompt("Forum homepage?"));
	GM_setValue("notifs", 0);
}

//Get the base domain. Primative, but it gets the job done.
var pageStripped = GM_getValue("site").replace("http://","").replace("https://","").replace("index","").replace(".php","").replace(".htm","").replace(".html","");
//Get latest tab
GM_setValue("tab",window.location.href); //This value will apply to all open tabs, and there will only be one

if (window.location.href.indexOf(pageStripped) == -1) { //Not on forum now
	var intervalId = setInterval(function(){
		GM_xmlhttpRequest({
		  method: "POST",
		  url: GM_getValue("site"),
		  data: "",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
			console.debug("Polling " + GM_getValue("site") + "... Last notif count: " + GM_getValue("notifs") + ".");
			//parse for new notifications
			var numNotifs = 0;

			var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
			html.innerHTML = response.responseText;
			doc.appendChild(html);
			
			//Get notification number
			if (doc.getElementById("notifications") && doc.getElementById("notifications").getElementsByTagName("span").length > 0) {
				notifInner = doc.getElementById("notifications").getElementsByTagName("span")[0];
				if (notifInner.getElementsByTagName("strong").length > 0) {
					numNotifs = parseInt(notifInner.getElementsByTagName("strong")[0].innerHTML);
				}
			}
			
			//Check if it's updated
			if (GM_getValue("tab") == window.location.href) {
				if (GM_getValue("notifs") < numNotifs) {
					GM_setValue("notifs", numNotifs); //Must be after if. Blech, repetition
					alert("New vB4 notification. Total: " + numNotifs);
				}
				else {
					GM_setValue("notifs", numNotifs);
					//console.debug("Not enough notifs to alert user.");
				}
				//console.debug("Polled " + GM_getValue("site") + ". Notifs: " + numNotifs);
			}
			else {
				//console.debug("New tab opened. Stopping.  New tab is " + GM_getValue("tab"));
				clearInterval(intervalId);
			}
		  }
		});
	},5000);
}
else { //On the forum, check for new notifications so we know if user saw them
		var numNotifs = 0;
		
		if (document.getElementById("notifications") && document.getElementById("notifications").getElementsByTagName("span").length > 0) {
			var notifInner = document.getElementById("notifications").getElementsByTagName("span")[0];
			if (notifInner.getElementsByTagName("strong").length > 0) {
				numNotifs = parseInt(notifInner.getElementsByTagName("strong")[0].innerHTML);
				if (GM_getValue("tab") == window.location.href) GM_setValue("notifs", numNotifs);
			}
		}
		//console.debug("Checked for notifs on this page. Found " + numNotifs);
}