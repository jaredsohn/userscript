// ==UserScript==
// @name           Twitter Hash Tools
// @namespace      http://userscripts.org/users/28
// @description    Turn #hashtags into links to twitter search and link to hashTweeps to see who else used this tag
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.00
// ==/UserScript==

/*

ABOUT Twitter Hash Tools
========================

This user script enhances the Twitter pages in the following ways:

- Hashtags in the form of #hashtag are linked to twitter search

- Hashtags are followed by a link to hashtweeps.com, which finds
all users who have been using that particular hashtag.

The script is compatible with other user scripts, which dynamically
insert content into the page.

Tested with Endless Tweets: http://userscripts.org/scripts/show/24398

LICENSE
=======

Twitter Hash Tools - (c) 2009 Johannes la Poutre

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.00 - 20090305
	- Initial revision


*/

var TwitterHashTools = {
	searchBase: "http://search.twitter.com/search?q=",
	tweepBase: "http://www.hashtweeps.com/search/index?term=",
	
	replace: function(str) {
		return str.replace(/#([\w]+)/g, 
			'#<a href="' + this.searchBase + encodeURI("$1") + '" title="tag: $1" target="_blank" class="hash-tag">$1</a>&#160;' + 
			'[<a href="' + this.tweepBase + encodeURI("$1") + '" title="who else used this tag: $1" target="_blank" class="hash-tweep">+</a>]' 
		);
	},
	
	processTweets: function() {
		var res = document.evaluate("//span[contains(@class, 'entry-content')]", 
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<res.snapshotLength; i++) {
			var text = res.snapshotItem(i).innerHTML;
			// check if we've been there:
			if (text.indexOf('class="hash-tag"') > -1) continue;
			res.snapshotItem(i).innerHTML = this.replace(text);
		}
		this.addEvtListeners();
	},
	
	checkNode: function(node) {
		var list = node.getElementsByTagName('span');
		for (var i=0; i<list.length; i++) {
			var res = list[i];
			var cls = res.getAttribute('class');
			if (!cls || (cls.indexOf('entry-content') !== -1)) continue;
			var text = res.innerHTML;
			// check if we've been there:
			if (text.indexOf('class="hash-tag"') !== -1) continue;
			res.innerHTML = this.replace(text);
		}
	},
	
	addEvtListeners: function() {
		// Ajax: load new bunch of tweets
		var _this = this;
		_this.log = GM_log;
		// _this.log('Adding evt. listener');
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// 
				try {
					// will fail if new node is not ElementNode
					if (1 != evt.target.nodeType) return;
					_this.checkNode(evt.target);
				} catch (e) {
					// ignore
					// _this.log(e);
				}
			}, true);
	}
};

TwitterHashTools.processTweets();
