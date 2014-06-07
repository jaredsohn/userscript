// ==UserScript==
// @name           MySpace Link Original Images
// @namespace      http://userscripts.org/users/28
// @description    Add direct links to the large uploaded photos on top of thumbnails
// @include        http*://*myspace.tld/*
// @version        1.01
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

version 1.01 20090409
	- removed leftover debugging which made it depend on Firebug (and less secure)

Version 1.00 20090409
	- derived from http://userscripts.org/scripts/show/2012
	- as requested by Sam England

*/


var MySpaceImgLinks = {

	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black ! important; width:3em;height:1.2em;line-height:1.1em; background-color: silver ! important; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px ! important; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; }', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black ! important; background-color: yellow ! important; }', 0);
	},
	init: function() {
		this.addStyleRule();
		var doc = window.document;
		var ll = document.evaluate("//img[contains(@src,'myspacecdn.com/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<ll.snapshotLength; i++) {
			var img = ll.snapshotItem(i);
			var src = img.getAttribute('src');
			if ((src.indexOf('/s_') > -1) || (src.indexOf('/m_') > -1) || (src.indexOf('/a_') > -1)) {
				this.addLink(img, src.replace(/\/[asm]_/, '/l_'));
			} else if ((src.indexOf('_s.') > -1) || (src.indexOf('_m.') > -1)) {
				this.addLink(img, src.replace(/_[sm]\./, '_l.'));
			}
        }
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
				evt.stopPropagation();
				evt.preventDefault();
			}, true);
				
		var wrapper = img.parentNode;
		// cropped images on album pages:
		var tmpWrap = wrapper;
		for (var i=0; i<10; i++) {
			tmpWrap = tmpWrap.parentNode;
			var cls = tmpWrap.getAttribute('class');
			if (cls && (cls.indexOf('crop') > -1)) {
				wrapper = tmpWrap;
				break;
			}
		}
		var imgCls = img.getAttribute('class');
		if (!wrapper || 
			(1 !== wrapper.nodeType) || 
			// search result pages:
			(imgCls == 'profileimagelink')) {
			wrapper = document.createElement('span');
			img.parentNode.appendChild(wrapper);
			wrapper.appendChild(img);
		}
		wrapper.style.position = 'relative';
		wrapper.style.display = 'block';
		wrapper.style.textAlign = 'left';
		var cls = wrapper.getAttribute('class');
		if (!cls) cls = 'origLinkWrapper';
		if (cls.indexOf('origLinkWrapper') === -1) cls += ' origLinkWrapper';
		wrapper.setAttribute('class', cls);
		wrapper.appendChild(link);
	}
};

MySpaceImgLinks.init();