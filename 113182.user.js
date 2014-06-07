// Link Reddit Flair
// Author: Ictinus
// Released and updated: 16 September 2011, turn reddit flair text to links (if they start with http).
// ==UserScript==
// @name            Link Reddit Flair
// @version         1.05
// @namespace       http://ictinus.com/lrf/
// @description     Turn reddit flair text to links if appropriate.
// @match 	http://*.reddit.com/*
// @match 	https://*.reddit.com/*
// ==/UserScript==

// Updated: 21 Oct 2011, v1.02, added https support and removed scary "Requires your data on all websites" permission requirements.
// Updated: 06 Nov 2011, v1.03, change link to display the users name and site name eg. "auser's goodread" (for www.goodread.com). 
//						add support for flair format of "link description:http://www.goodread.com/" which will display as "link descrption".
//						v1.04, bug fix.
// Updated: 17 Nov 2011, v1.05, improved linking

var linkRedditFlair = {
	version : 1.05,
	changeFlairText: function () {
		var theFlairs = document.getElementsByClassName("flair");
		for (var iFlair = 0, iFlairTotal = theFlairs.length; iFlair < iFlairTotal; iFlair++) {
			lnkText = theFlairs[iFlair].innerHTML;
			try {
				if (lnkText.substring(0, 7) == 'http://') {
					var arrLnk = lnkText.split("/");
					var arrSite = arrLnk[2].split('.');
					if (typeof(arrSite[1]) == 'undefined' || arrSite.length < 3) {throw "error";};
					var strUser = theFlairs[iFlair].previousElementSibling.innerHTML;
					theFlairs[iFlair].innerHTML = '<a href="' + lnkText + '">' + strUser + "'s " + arrSite[1] + '</a>';
				} else if (lnkText.split(":http").length > 1) {
					var strLinkDesc = lnkText.split(":http")[0];
					var strLink = lnkText.substring(strLinkDesc.length + 1, lnkText.length);
					theFlairs[iFlair].innerHTML = '<a href="' + strLink + '">' + strLinkDesc + '</a>';
				}
			} catch(e) {
				if (lnkText.substring(0, 7) == 'http://') {
					theFlairs[iFlair].innerHTML = '<a href="' + lnkText + '">' + lnkText.substring(7,lnkText.length) + '</a>';
				}
			}
		}
	},
	init: function() {
		this.changeFlairText();
	}
}
document.addEventListener('load',linkRedditFlair.init(),true);
