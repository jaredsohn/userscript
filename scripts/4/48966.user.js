// ==UserScript==

// @name           GFTrackPlus

// @namespace      tag:gf_t0mp

// @description    Improves GameFAQs topic tracking feature

// @include        http://www.gamefaqs.com/boards/*
// @exclude        http://www.gamefaqs.com/boards/post.php?*
// @exclude        http://www.gamefaqs.com/boards/user.php?*
// @exclude        http://www.gamefaqs.com/boards/karma.php?*
// @exclude        http://www.gamefaqs.com/boards/modhist.php?*
// @exclude        http://www.gamefaqs.com/boards/tracked.php
// @exclude        http://www.gamefaqs.com/boards/settings.php?*
// @exclude        http://www.gamefaqs.com/boards/contact.php?*
// ==/UserScript==

var feedURL = "http://www.gamefaqs.com/boards/tracked.php";
var notif = "";

var req;
req = new XMLHttpRequest();
req.onreadystatechange = function() {
	if(req.readyState == 4) {
		if(req.status == 200) {
			checkFeed(req.responseText);
		}
	}
}
req.open("GET", feedURL, true);
req.send("");

function checkFeed(feed) {
var allURLs = feed.match(/<a href="\/boards\/genmessage\.php\?board=[0-9]+\&amp;topic=[0-9]+">/g);
var allLPs = feed.match(/<td class="lastpost">.*?<\/td>/g);
for (var i = 0; i < allURLs.length; i++) {
	thisURL = allURLs[i];
	thisURL = thisURL.replace(/<a href="/,"http://www.gamefaqs.com");
	thisURL = thisURL.replace(/">/,"");
	thisURL = thisURL.replace("amp;","");
	thisID = thisURL.replace(/<a href="\/boards\/genmessage\.php\?board=[0-9]+\&amp;topic=/,"")
	thisLP = allLPs[i];
	thisLP = thisLP.replace(/<td class="lastpost">/,"");
	thisLP = thisLP.replace("</td>", "");
	if(GM_getValue(thisID)) {
		oldLP = GM_getValue(thisID);
		if (oldLP != thisLP) {
			notif = notif + "<li>Topic updated! Click <a href='" + thisURL + "' target='_blank'>here</a> to open it in a new tab.</li>";
		}
	}
	GM_setValue(thisID, thisLP);
}
if (notif) {
	notif = "<div id='trackBox' style='width:872px;padding:12px;color:#4140DB;line-height:16px;'><ul style='list-style-type:none;padding:0px;margin:0px;'>" + notif + "</ul></div>";
	target = document.getElementById("content");
	target.innerHTML = notif + target.innerHTML;
}
}