// ==UserScript==
// @name            amonotod's Craigslist Spam Buttons v1
// @namespace       http://www.geocities.com/amonotod/
// @description     Displays buttons on the item list so you can flag items as spam without having to click on the item and view it.
// amonotod - I don't use JS, so original version didn't work for me; this version is JS-free
// Derived from     Craigslist Spam Buttons v1.3.9
// Originally by    http://www.stillnetstudios.com
// Usually spam is pretty obvious and doesn't require viewing the item.
// I see a new "FREE 4gb Ipod Nano!!" item every day for example.
// Special thanks to Steve Sweet for his work on this latest version, the script
// is more user friendly now and works much better.
// @include         http://*.craigslist.*/*
// ==/UserScript==

// example link to an item
// http://sfbay.craigslist.org/eby/cto/870997207.html

// example link to flag the item
// http://sfbay.craigslist.org/flag/?flagCode=15&postingID=870997207


var tables = document.getElementsByTagName("blockquote");
if (document.body.className == 'toc' && tables[1]) {

	var domain = window.location.hostname;

	// get city out of domain name
	var regex = new RegExp(/^([^\.]*)\./);
	var retval = regex.exec(domain);
	var city = retval[1];

	// expression for getting posting ID
	regex = new RegExp(/\/(\d+)\.html/);

	var paras = tables[1].getElementsByTagName("p");

	for (i=0;i<paras.length;i++) {
		var atags = paras[i].getElementsByTagName("a");
		if (atags.length > 0) {
			href = atags[0].getAttribute("href");
			if (retval = regex.exec(href)) {
				var postingID = retval[1];
				newlink = document.createElement("a");

				// our flagging link actually goes to the post but since the onclick returns false, it won't go anywhere
				// we do this so that when the iframe visits the post, the link will show up as visited and we can
				// know that we've already flagged an item
				newlink.setAttribute("href","/flag/?flagCode=15&postingID="+postingID);

				newlink.setAttribute("style","font-size: 9px; padding-right: 6px;");
				newlink.setAttribute("title","Click to mark this item as spam.");
				newlink.setAttribute("target","_blank");
				//newlink.setAttribute("onclick","return markAsSpam('"+postingID+"','"+href+"')");
				newlink.setAttribute("id","sl_"+postingID);
				newlink.setAttribute("class","spamlink");
				newlink.innerHTML = '[spam]';
				paras[i].insertBefore(newlink,paras[i].firstChild);
			}
		}
	}
}

var retry = 0;

