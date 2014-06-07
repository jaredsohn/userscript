// ==UserScript==
// @name           Twitter Link Large Image
// @namespace      http://userscripts.org/users/28
// @description    Add a link to the large user image on top of avatars on Twitter
// @version        1.02
// @include        http*://twitter.com/*
// @include        http://search.twitter.com/*
// @include        http://wefollow.com/*
// @include        http://twitlinks.com/*
// @include        http://twitter.grader.com/*
// @include        http://twitterholic.com/*
// @include        http://twittercounter.com/*
// @include        http://twittermail.com/*
// @include        http://retweetist.com/*
// @include        http://tweetscan.com/*
// @include        http://tweetvisor.com/*
// @include        http://*tweepler.com/*
// @include        http://*twibs.com/*
// @include        http://*friendorfollow.com/*
// @include        http://*twitoria.com/*
// @include        http://*nearbytweets.com/*
// @include        http://*retweetrank.com/*
// @include        http://*twitter-friends.com/*
// @include        http://*splitweet.com/*
// @include        http://*peoplebrowsr.com/*
// @include        http://*twitr.org/*
// ==/UserScript==


/*
LICENSE
=======

(C) 2009 Johannes la Poutre

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

Version 1.02 20090416
	- included new sites using twitter avatars

Version 1.01 20090416
	- added ajax update capability
	- included new sites using twitter avatars

Version 1.00 20090411
	- derived from http://userscripts.org/scripts/show/2012

*/


var TwitterImgLinks = {

	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		GM_addStyle('a.origLinkIcon { position: absolute; top: 1px; left: 1px; color: black ! important; width:.8em;height:.8em;line-height:1em; background-color: silver ! important; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 10px ! important; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; z-index: 99999}', 0);
		GM_addStyle('a.origLinkIcon:hover { color: black ! important; background-color: yellow ! important; }', 0);
	},
	init: function() {
		this.addStyleRule();
		var ll = document.evaluate("//img[contains(@src,'s3.amazonaws.com/twitter_production/profile_images')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<ll.snapshotLength; i++) {
			var img = ll.snapshotItem(i);
			var src = img.getAttribute('src');
			if ((src.indexOf('_bigger') > -1) || (src.indexOf('_normal') > -1) || (src.indexOf('_mini') > -1)) {
				this.addLink(img, src.replace(/(_bigger|_normal|_mini)/, ''));
				GM_log('adding img: ' + src);
			}
         }
         this.addEvtListeners();
	},
	addLink: function ImgLink(img, linkHref) {
		// try to find surrounding link element around image
		if (img.parentNode && ('origLinkWrapper' === img.parentNode.getAttribute('class'))) {
			GM_log('already wrapped, skipping...');
			return;
		}
		var link = document.createElement("a");
		link.setAttribute("class", "origLinkIcon");
		link.setAttribute("href", linkHref);
		link.setAttribute("title", "Link to large image");
		link.appendChild(document.createTextNode("+"));
		link.addEventListener("click", function(evt) {
				GM_openInTab(evt.target.href);
				evt.stopPropagation();
				evt.preventDefault();
			}, true);
				
		var wrapper = img.parentNode;
		var imgCls = img.getAttribute('class');
		if (!wrapper || (1 !== wrapper.nodeType)) {
			wrapper = document.createElement('span');
			img.parentNode.appendChild(wrapper);
			wrapper.appendChild(img);
		}
		img.style.padding = '0';
		wrapper.style.position = 'relative';
		wrapper.style.padding = '0';
		wrapper.style.display = 'block';
		wrapper.style.textAlign = 'left';
		var cls = wrapper.getAttribute('class');
		if (!cls) cls = 'origLinkWrapper';
		if (cls.indexOf('origLinkWrapper') === -1) cls += ' origLinkWrapper';
		wrapper.setAttribute('class', cls);
		wrapper.appendChild(link);
	},
	
	// inspect a dom fragment (ajax event)
	insertLinks: function(doc) {
		var list = doc.getElementsByTagName("img");
		if ((0 === list.length) && (1 === doc.nodeType) && ("IMG" === doc.nodeName)) {
			list = [ doc ];
		}
		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var src = img.getAttribute('src');
			if ((src.indexOf('_bigger') > -1) || (src.indexOf('_normal') > -1) || (src.indexOf('_mini') > -1)) {
				this.addLink(img, src.replace(/(_bigger|_normal|_mini)/, ''));
				GM_log('adding img: ' + src);
			}
		}
	},
	
	addEvtListeners: function() {
		// Ajax: new image
		var _this = this;
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// myLog(evt);
				try {
					// will fail if new node is not ElementNode
					_this.insertLinks(evt.target);
					// myLog(evt.target);
				} catch (e) {}
			}, true);

	},
};

TwitterImgLinks.init();