// ==UserScript==
// @name		Full Articles
// @namespace	rmenessec.uso
// @description	Takes you to the full version of articles for multiple sites.
// @copyright	Copyright © 2012 Rebecca Menessec
// @include		/^https?://www\.infoworld\.com/[d,t]/.*$/
// @include		/^https?://www\.networkworld\.com/news/.*$/
// @include		/^https?://www\.nytimes\.com/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/.*$/
// @include		/^https?://.*\.washingtonpost\.com/.*_story[_]*[0-9]*\.html.*$/
// @include		/^https?://www\.wired\.com/.*/$/
// @license		Creative Commons; https://creativecommons.org/licenses/by-sa/3.0/
// @grant		none
// @run-at		document-start
// @version		1.2.2
// ==/UserScript==

// This script licensed under the Creative Commons Attribution-ShareAlike 3.0
// Unported License. Full text can be found at:
// https://creativecommons.org/licenses/by-sa/3.0/legalcode

function addtoURL(myRegEx0,mySubstr,myURL) {
		// Mogrify the current URL
		var myRegEx1 = /\?/g;
		if (!myRegEx0.test(myURL)) {
			// There might already be some parameters in the URL
			if (myRegEx1.test(myURL)) {
				window.location.href = myURL +  "&" + mySubstr;
			}
			else {
				window.location.href = myURL +  "?" + mySubstr;
			}
		}
}

window.addEventListener("load", function () {
		// Let's figure out the current page
		var myDomain = window.location.hostname;
		var myDomainElements = myDomain.split(".");
		// Yes, I know it's ugly
		var mySLD = myDomainElements[myDomainElements.length - 2]  + "." + myDomainElements[myDomainElements.length - 1];
		var myURL = window.location.href;
		switch (mySLD) {
			case "infoworld.com":
				addtoURL(/(\?|\&)page=full/g,"page=full",myURL);
				break;
			case "networkworld.com":
				addtoURL(/(\?|\&)page=full/g,"page=full",myURL);
				break;
			case "nytimes.com":
				addtoURL(/(\?|\&)pagewanted=all/g,"pagewanted=all",myURL);
				break;
			case "washingtonpost.com":
				// This case might become a function later
				var myRegEx0 = /_story\.html/g;
				var mySubstr = "_singlePage.html";
				if (myRegEx0.test(myURL)) {
						window.location.href = myURL.replace(/_story[_]*[0-9]*\.html/,"_singlePage.html");
				}
				break;
			case "wired.com":
				// This case might become a function later
				var myRegEx0 = /\/all\/$/g;
				var mySubstr = "/all/";
				if (!myRegEx0.test(myURL)) {
						window.location.href = myURL.replace(/\/$/,"/all/");
				}
				break;
		}
	},
	false
);