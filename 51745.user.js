// ==UserScript==
// @name           Facebook Link Original Image
// @namespace      http://userscripts.org/users/28
// @description    Add a link to original image on top of Facebook Album thumbnails
// @include        http://*facebook.com/*
// @version        1.00
// @author         (c) 2009 Johannes la Poutre
// ==/UserScript==

/*
LICENSE
=======

(C) 2009 Johannes la Poutre

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License version 2 as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.00 20090616
	- derived from http://userscripts.org/scripts/show/2012

*/

var FacebookImgLinks = {

	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		GM_addStyle('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black;  background-color: silver; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; z-index: 9999; }', 0);
		GM_addStyle('a.origLinkIcon:hover { color: black ! important; background-color: yellow ! important; }', 0);
	},
	init: function() {
		this.addStyleRule();
		var ll = document.evaluate("//img[contains(@src,'fbcdn.net/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		// http://photos-a.ak.fbcdn.net/hphotos-ak-snc1/hs096.snc1/4972_85502349660_750649660_1234696_3123096_s.jpg
		// http://photos-a.ak.fbcdn.net/hphotos-ak-snc1/hs096.snc1/4972_85502349660_750649660_1234696_3123096_n.jpg
		// http://photos-g.ak.fbcdn.net/photos-ak-snc1/v2074/245/1/507579329/s522329319_1123422_1366.jpg
		// http://photos-g.ak.fbcdn.net/photos-ak-snc1/v2074/245/1/507579329/n522329319_1123422_1366.jpg
		for (var i=0; i<ll.snapshotLength; i++) {
			var img = ll.snapshotItem(i);
			var src = img.getAttribute('src');
			var newSrc = src.replace(/_[ast]\.jpg/, "_n.jpg").replace(/\/[ast]([\d_]+)\.jpg/, '/n$1.jpg');
			if ((src !== newSrc) && 
				(src.indexOf('app_full_proxy.php') == -1)) {
					this.addLink(img, newSrc);
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
		link.appendChild(document.createTextNode("ORIG"));
		link.addEventListener("click", function(evt) {
				GM_openInTab(evt.target.href);
				// FIXME: this seems not to work on facebook, why?
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
			var newSrc = src.replace(/_[ast]\.jpg/, "_n.jpg").replace(/\/[ast]([\d_]+)\.jpg/, '/n$1.jpg');
			if ((src !== newSrc) && 
				(src.indexOf('app_full_proxy.php') == -1)) {
					this.addLink(img, newSrc);
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

FacebookImgLinks.init();