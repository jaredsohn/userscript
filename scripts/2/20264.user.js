// ==UserScript==
// @name Last.fm - Get last reply date - July 2008
// @namespace 
// @description Gets the date of the last post to the Greasemonkeys News and Script Updates forum thread and displays it in your profile sidebar. By snyde1
// @include http://www.last.fm/user/*
// ==/UserScript==

/* SCRIPT */
var msgTitle = new RegExp(/>Greasemonkeys News and Script Updates<\/a>/);

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

(function() {
	var usernameLink = xpath("//div[@id='idBadger']/a");
	if (usernameLink.snapshotLength > 0) {
		username = usernameLink.snapshotItem(0).href;
		username = username.match(/user\/(.*)$/)[1];
	} else {
		return; // Not logged in?
	}
	if (location.href != "http://www.last.fm/user/"+username) {
		return; // Not my home page
	}
	var latestText; var latestPost;
	var theURL="http://www.last.fm/group/Greasemonkeys/forum";
	GM_xmlhttpRequest({
		method: "GET",
		url: theURL,
		onload: function(responseDetails) {
			var xmlText = responseDetails["responseText"];
			xmlText = xmlText.replace(/\&nbsp;/ig, '');
			var regexp = /(<td[^>]*class="subject")[^>]*>/g;
			xmlText = xmlText.replace(regexp, "$1>");
			if (!xmlText) {
				return;
			}
			if (xmlText.match(/forumtable/i)){
				xmlText = xmlText.split(/<table cellpadding="0" cellspacing="0" class="forumtable" width="100%">/)[1];
				xmlText = xmlText.split(/<\/table>/i)[0];
				theURLmod = theURL.replace(/\//g,".");
				theURLmod = theURL.replace(/http:..www.last.fm/i,"");
				theURLmod = theURLmod.replace(/\+/g,".");
				var dateRegex = new RegExp('<small><a href="'+theURLmod+'([^"]*)">([^<]*)<',"i");
				var timeEx = new RegExp('>(.+)<');
				var msgsTimes = xmlText.split(/<\/tr>/i);
				var textText; var myAText;
				for (var k=0; k<msgsTimes.length; k++) {
					msgsTimes[k] = msgsTimes[k] + "";
					textText = msgsTimes[k].match(msgTitle);
					if (textText != null) {
						textText = msgsTimes[k].match(dateRegex)[1];
						textText = textText + "";
						myAText = msgsTimes[k].match(dateRegex)[2];
						currDate = Date.parse( myAText);
						var panel = document.getElementById("hcard-"+username);
						panel.innerHTML += "<br>Last Greasemonkey update: <A HREF="+theURL+textText+">"+myAText+"</A><br>";
						break;
					}
				}
			}
		}
		});
})();
