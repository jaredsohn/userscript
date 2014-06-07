// friendfeed RTL
// Copyright, AmitT, 2009
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
// ==UserScript==
// @name           FriendFeed RTL
// @namespace      http://userscripts.org/users/AmitT
// @include        http://friendfeed.com/*
// @include        http://*.friendfeed.com/*
// @include        https://friendfeed.com/*
// @include        https://*friendfeed.com/*
// ==/UserScript==

var friendfeedRTL={
	ffeedsCount:0,
	ffeedSpanClassName:"text",
	
	alignRTLLanguages: function () {
		var isThereRTLChars=/.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
		var ffeeds=document.getElementsByClassName(this.ffeedSpanClassName);
		this.ffeedsCount=ffeeds.length;
		for (i=0;i<this.ffeedsCount;i++) {
			if (isThereRTLChars.test(ffeeds[i].innerHTML)) {
				ffeeds[i].style.direction="rtl";
				ffeeds[i].style.textAlign="right";
				ffeeds[i].style.display="block";
			}
		}
	},
	
	monitorChanges: function() {
		if (document.getElementsByClassName(this.ffeedSpanClassName).length != this.ffeedsCount) {
			friendfeedRTL.alignRTLLanguages();
		}
		setTimeout(friendfeedRTL.monitorChanges, 200);
	}
}

setTimeout(friendfeedRTL.monitorChanges, 200);
