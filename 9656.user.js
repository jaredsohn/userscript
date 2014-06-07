// $Id: priceminister_ad_remover.user.js,v 1.6 2007-06-05 12:06:29 pl Exp $
//
// ==UserScript==
// @name        PriceMinister Ad Remover
// @namespace   http://dummy4242.googlepages.com/greasemonkey
// @description Supprime les animations stupides sur priceminister.com / Cleans priceminister.com
// @include     http://priceminister.com/*
// @include     http://*.priceminister.com/*
// @exclude
// ==/UserScript==
//
// Copyright (C) 2007 Pierre L. a.k.a. dummy4242 (@) gmail.com
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
GM_log("start: $Id: priceminister_ad_remover.user.js,v 1.6 2007-06-05 12:06:29 pl Exp $");
var elt = document.getElementById("header_pub");
if (elt) {
//	elt.style.display = 'none';
	elt.parentNode.removeChild(elt);
	GM_log("Killed item with id=header_pub");
}

function kill_item_with_class(itemtype, classname) {
	var items = document.evaluate(
			"//"+itemtype+"[@class='" + classname + "']",
			document,
    			null,
    			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    			null);
	for (i = 0; i < items.snapshotLength; ++i) {
		elt = items.snapshotItem(i);
		elt.parentNode.removeChild(elt);
		GM_log("searched & destroyed 1 " + itemtype + " with class="+classname);
	}
}

kill_item_with_class('div', 'ad_right');
kill_item_with_class('td', 'ad_topsell');

GM_log("end");
}) ();

