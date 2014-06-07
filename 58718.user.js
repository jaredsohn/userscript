// ==UserScript==
// @name           Google Image Direct
// @namespace      http://code-poet.net/
// @description    Makes images in Google search results link directly to the full-size image, or to the page originally containing the image (for both image searches and web searches). Works in Firefox, Chrome, Safari, Opera, IE and more.
// @include        http://images.google.*q=*
// @include        http://www.google.*q=*
// @author         Vaughan Chandler
// @version        1.3
// ==/UserScript==

// Released 2010-09-18 under a Simplified BSD license.

/*
Copyright 2010 Vaughan Chandler. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Vaughan Chandler ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Vaughan Chandler OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Vaughan Chandler.
*/

(function() {

function GID_addListener(type, f, elm) {
	if (document.addEventListener) { (elm||document).addEventListener(type, f, false); }
	else if (document.attachEvent) { (elm||document).attachEvent('on'+type, f); }
}

function GID_modifyLink(e) {
	var m = null;
	if ((e||(e=window.event)) && (t=e.target||e.srcElement) && (t.tagName=='A' || (t.tagName=='IMG' && (p=t.parentNode) && p.tagName=='A' && (t=p))) && ((m=GID_regex1.exec(t.href)) || (m=GID_regex2.exec(t.href)) || t.getAttribute('data-gid-google'))) {
		if (GID_regex1.exec(t.href)) t.setAttribute('data-gid-google', t.href);
		if (n=GID_regex3.exec(t.href)) t.setAttribute('data-gid-referer', n[1]);
		if (m) t.setAttribute('data-gid-image', m[1]);
		switch(GID_linkType) {
			case 'image':   t.href=decodeURIComponent(t.getAttribute('data-gid-image')); break;
			case 'referer':	t.href=decodeURIComponent(t.getAttribute('data-gid-referer')); break;
			case 'google':  t.href=t.getAttribute('data-gid-google'); break;
		}
	}
}

function GID_changeLinkType(e) {
	if ((e||(e=window.event)) && (t=e.target||e.srcElement) && t.tagName=='A') {
		var previous = document.getElementById('gid-link-type-' + GID_linkType);
		previous.innerHTML = '<a href="#" onclick="return false;">' + previous.innerHTML + '</a>';
		previous.className = 'tbou';
		var current = t.parentNode;
		current.innerHTML = t.innerHTML;
		current.className = 'tbos';
		GID_linkType = current.id.match(/([^-]+)$/)[1];
	}
}

GID_regex1 = new RegExp('imgurl=([^&]+)');
GID_regex2 = new RegExp('(.*)\\?iact=.*');
GID_regex3 = new RegExp('imgrefurl=([^&]+)');

GID_linkType = 'image';

GID_addListener('mouseover', function(e) { GID_modifyLink(e); });
GID_addListener('mousedown', function(e) { GID_modifyLink(e); });
GID_addListener('mouseup', function(e) { GID_modifyLink(e); });
GID_addListener('click', function(e) { GID_modifyLink(e); });

if (location.pathname.indexOf('/images')==0 && (position=document.getElementById('tbrt'))) {
	var GID_controls = document.createElement('ul');
	GID_controls.innerHTML = '<li id="gid-link-type-image" class="tbos">Link to Image</li><li id="gid-link-type-referer" class="tbou"><a href="#" onclick="return false;">Referring URL</a></li><li id="gid-link-type-google" class="tbou"><a href="#" onclick="return false;">Google Frame</a></li>';
	GID_controls.className = 'tbt';
	GID_controls.id = 'gid-controls';
	position.parentNode.insertBefore(GID_controls, position);
	GID_addListener('click', function(e) { GID_changeLinkType(e); }, document.getElementById('gid-controls'));
}

}) ();
