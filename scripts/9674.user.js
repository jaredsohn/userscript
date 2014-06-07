// $Id: webmail_laposte_net_ad_remover.user.js,v 1.2 2007-06-05 14:14:57 pl Exp $
// ==UserScript==
// @name Webmail.LaPoste.net Ad Remover
// @namespace 
// @description Remove the ads on Webmail.LaPoste.net (retire les pubs sur Webmail.LaPoste.net)
// @include http://webmail.laposte.net/*
// @exclude
// ==/UserScript==
//
// Copyright (C) 2007 Pierre L a.k.a. dummy4242 (@) gmail.com
//
// ***********************************************************************************
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 2
// as published by the Free Software Foundation.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
// ***********************************************************************************
//
// Please read the license text at: http://www.gnu.org/copyleft/gpl.html
//

(function() {

var scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; ++i) {
	var script = scripts[i];

	if (script.getAttribute("src") == "/xam_rc.fr/LaPostePub.js") {
		script.parentNode.removeChild(script);
	}

	const TEXT_NODE = 3;
	if (script.hasChildNodes && script.firstChild && script.firstChild.nodeType == TEXT_NODE) {
		if (script.firstChild.data.match(/.*writePub.* /g)) {
			GM_log(script.firstChild.data + ' killed');
			script.parentNode.removeChild(script);
			continue;
		}
	}
}

var iframes, regexes, i, j;

iframes = document.getElementsByTagName("iframe");
RE = new Array();
RE[0] = new RegExp('/shopping/cartouche_shopping', "i");
for (i = 0; i < iframes.length; ++i) {
	var elt = iframes[i];
	for (j = 0; j < RE.length; ++j) {
		if (elt.src.match(RE[j])) {
			elt.parentNode.removeChild(elt);
			GM_log('Killed iframe src=' + elt.src);
		}
	}
}

// A rescan is necessary as some may have disappeared in the previous stage
iframes = document.getElementsByTagName("iframe");
RE = new Array();
RE[0] = new RegExp('http://adserver\.adtech\.de/', "i");
RE[1] = new RegExp('http://cre\.chunnel\.de/'    , "i");
RE[2] = new RegExp('http://.*\.comclick\.com/'   , "i");
for (i = 0; i < iframes.length; ++i) {
	var elt = iframes[i];
	for (j = 0; j < RE.length; ++j) {
		if (elt.src.match(RE[j])) {
			elt.parentNode.parentNode.removeChild(elt.parentNode);
			GM_log('Killed parent of iframe src=' + elt.src);
		}
	}
}

})();
