// ==UserScript==
// @version        1.24
// @name           Twitter Remove Non-Followers
// @namespace      http://userscripts.org/users/28
// @description    Remove Twitter friends who don't follow you back. Click the "Remove marked users" button at the bottom of the list to activate.
// @include        http*://*twitter.com/following*
// @include        http*://*twitter.com/*/following*
// ==/UserScript==

/*
ABOUT
=====

This script highlights the "remove" buttons for "friends" who don't follow you 
back on your Twitter Friends pages. A new action button is added at the bottom
of the page. When you click this button, all marked friends will be removed.

The scrip marks only users who:
- don't follow you ("don't return the love")
- have their updates unprotected (you can always remove these manually if you want).

By default, no action is taken, so you have the chance to inspect which users will
be removed before clicking the "Remove Marked" button.

Auto-mode: set property TwitterRemoveNonFollowers.autoMode to true and open
the "following" page, http://twitter.com/following
The script will auto-advance one page at a time.


NOTE: make sure you also allow scripts included from twimg.com if you're using the NoScript add-on!!!

LICENSE
=======

(c) 2009 Johannes la Poutre


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

Version 1.23 - 20091005
	- Fix for auto mode: just follow "next" link

Version 1.23 - 20090915
	- Fix for changed Twitter CSS
	- Thanks Coree Silvera for letting me know!

Version 1.22 - 20090820
	- Minor fix when running in auto-mode
	- Added note about NoScript

Version 1.21 - 20090702
	- Extra @include rule for /username/following pages

Version 1.20 - 20090702
	- complete rewrite for new Twitter user interface

Version 1.01 - 20090403
	- updated color scheme, removed debugging code

Version 1.00 - 20090403
	- initial release
	- does NOT remove users whose timeline is protected

*/

var TwitterRemoveNonFollowers = {
	hitlist: [], // the list of 'friends' to remove
	autoMode: false,
	authenticity_token: '',
	
	init: function() {
		// select users w/o DM command link and no Lock icon image
//		var rows = document.evaluate("//button[contains(@class, 'remove-button')][not(following-sibling::span/a[contains(@href, '/direct_messages/create/')])]", 
//					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//		<tr id="user_15356378" class="user following direct-message-able odd">
		var rows = document.evaluate("//tr[contains(@class, 'following')][not(contains(@class, 'direct-messageable'))]", 
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var btn = rows.snapshotItem(i);
			btn.style.backgroundColor = '#bbb';
			btn.setAttribute('class', 'user following');
			// id="user_20707860"
			var id = rows.snapshotItem(i).getAttribute('id').substring(5);
			this.hitlist.push(id);
		}
		if (this.hitlist.length) {		
			this.authenticity_token = unsafeWindow.twttr.form_authenticity_token;
			var rmBtn = document.createElement('input');
			rmBtn.setAttribute('type', 'button');
			rmBtn.setAttribute('id', 'TwitterRemoveNonFollowersBtn');
			rmBtn.setAttribute('value', 'Remove marked (' + this.hitlist.length + ')');
			rmBtn.setAttribute('style', 'float:right;border: 1px solid lime');
			document.getElementById("pagination").appendChild(rmBtn);
			rmBtn.addEventListener('click', function() {
					rmBtn.setAttribute('disabled', 'disabled');
					rmBtn.style.border = '1px solid silver';
					TwitterRemoveNonFollowers.remove(); 
				}, true);
			if (this.autoMode) {
				rmBtn.click();
			}
		} else {
			if (this.autoMode) {
				this.nextPage();
			}
		}
		// FIX...
		unsafeWindow.alert = function(msg) {
			GM_log("" + msg);
		}
	},
	
	nextPage: function() {
		var rows = document.evaluate("//a[contains(@rel, 'next')]", 
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (rows.snapshotLength) {
			var next = rows.snapshotItem(0);
			var link = next.getAttribute('href');
//			var page = link.match(/page=(\d+)/)[1];
//			if (parseInt(page, 10) > this.keepPages) {
				if (0 === link.indexOf('/')) {
					link = window.location.protocol + '//' + window.location.host + link;
				}
				GM_log(link);
				window.location.href = link;
//			}
		}
	},
	

	remove: function() {
		if (this.hitlist.length) {
			document.getElementById("TwitterRemoveNonFollowersBtn").setAttribute('value', 'Removing: ' + this.hitlist.length + ' to go...');
			
			// use native XMLHttpRequest otherwise the referrer gets not set correctly
			var data = 'authenticity_token='+this.authenticity_token+'&twttr=true';
			var uid = this.hitlist.shift();
			var url = window.location.protocol + '//' + window.location.host +'/friendships/destroy/' + uid;
			var req = new XMLHttpRequest();
			req.onreadystatechange =  function() {
					TwitterRemoveNonFollowers.remove_callback(req, uid);
				};
			req.open("POST", url, true);
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			req.setRequestHeader("Accept", "application/json, text/javascript, */*");
			req.setRequestHeader("Referer", window.location.href);
			req.setRequestHeader("Content-Length", data.length);
			req.send(data);
			// id="user_20707860"
			document.getElementById('user_'+uid).style.backgroundColor = 'orange';
			
			setTimeout(function() { TwitterRemoveNonFollowers.remove(); }, 1000);
		} else {
			document.getElementById("TwitterRemoveNonFollowersBtn").setAttribute('value', 'All done.');
			if (this.autoMode) {
				this.nextPage();
			}
		}
	},
	
	remove_callback: function(req, uid) {
	    if (req.readyState == 4) {
	        // only if "OK"
	        if (req.status == 200) {
			// {"result":"unfollowed","success":true}
			// GM_log(req.responseText);
			document.getElementById('user_'+uid).style.display = 'none';
	        } else {
			GM_log("There was a problem retrieving the XML data:\n" + req.statusText);
				document.getElementById('user_'+uid).style.backgroundColor = 'red';
	        }
	    }
//		GM_log(req.responseText);
	}
};

TwitterRemoveNonFollowers.init();
