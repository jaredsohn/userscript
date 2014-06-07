// twitter RTL support
// Copyright, benleevolk, 2009
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           Twitter RTL
// @namespace      http://userscripts.org/scripts/show/35593
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

var twitterRTL={
	tweetsCount:0,
	tweetSpanClassName:"entry-content",
	
	alignRTLLanguages: function () {
		var isThereRTLChars=/.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
		var tweets=document.getElementsByClassName(this.tweetSpanClassName);
		this.tweetsCount=tweets.length;
		for (i=0;i<this.tweetsCount;i++) {
			if (isThereRTLChars.test(tweets[i].innerHTML)) {
				tweets[i].style.direction="rtl";
				tweets[i].style.textAlign="right";
				tweets[i].style.display="block";
			}
		}
	},
	
	monitorChanges: function() {
		if (document.getElementsByClassName(this.tweetSpanClassName).length != this.tweetsCount) {
			twitterRTL.alignRTLLanguages();
		}
		setTimeout(twitterRTL.monitorChanges, 200);
	}
}

setTimeout(twitterRTL.monitorChanges, 200);


