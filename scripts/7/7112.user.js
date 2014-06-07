/* vim: ts=4 noet ai :
$Id: $

Hide my Veritate subscription - (c) 2007 - 2009 J.Q. la Poutre

This script strips all but the link identifier off links in 
Veritate mailings. So clicks are not (easy) trackable as coming
from your mailing subscription.


LICENSE
=======

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

Version 1.02 20090310
	- add event listener to handle Ajax updates (gmail)

Version 1.01 20070510
	- make cleaned links visually stand out
	- keep original link title

Version 1.00
	- initial release

*/
// ==UserScript==
// @name           Hide my Veritate subscription
// @namespace      http://userscripts.org/users/28
// @description    Anonymizes links embedded in Veritate mailings
// @include        *mail.google.com/*
// @include        *mail.yahoo.tld/*
// @include        *webmail\.*
// @version	       1.02
// ==/UserScript==


var VEDM = {
	apply: function() {
		// http://vedm.net/click2?l=Pm9X3%26m=DJLg%26s=6ra2s
		var rows = document.evaluate("//a[starts-with(@href,'http://vedm.net/')]", 
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var r = rows.snapshotItem(i);
			this.cleanup(r);
		}
		this.addEvtListeners();
	},
	cleanup: function(r) {
		var href = Array.join(r.getAttribute('href')
			.match(/^(.+)\?.*(l=\w+)/)
			.splice(1,2), '?');
		r.setAttribute("href", href);
		var t = r.getAttribute('title') || '';
		r.setAttribute("title", "Depersonalized VEDM link " + t);
		r.style.color = "teal";
	},
	checkNode: function(node) {
		var list = node.getElementsByTagName('a');
		for (var i=0; i<list.length; i++) {
			var res = list[i];
			var href = res.getAttribute('href');
			if (!href || (href.indexOf('http://vedm.net/') === -1)) continue;
			this.cleanup(res);
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
}


// apply
VEDM.apply();

// end user script
