// -*- coding: utf-8 -*-
//
// $Id: serpnumbers.user.js,v 3563a0b9459a 2010/12/16 13:20:30 vsevolod $
//
// ==UserScript==
// @name          Enumerate Google SERP Results
// @namespace     serpnumbers.user.js
// @include       http*://*.google.*/search?*
// @datecreated   2010-11-20
// @lastupdated   2010-12-16
// @version       0.2.1
// @author        Vsevolod Balashov
// @copyright     2010, Vsevolod Balashov (http://vsevolod.balashov.name/)
// @license       GPL v.3; http://www.gnu.org/copyleft/gpl.html
// @description   Just add numbers to Google SERP
// ==/UserScript==
//
// changelog
//
// 0.2.1
// + really support chromium
//
// 0.2 deadly simplicity inspired by http://userscripts.org/scripts/show/67511
// - remove jquery
// * fix with JS
// + support chromium
//
// 0.1 initial release
// * support firefox with and without JS


function enumerate() {
    var uri = window.location.hash;
     if ('' == uri) uri = window.location.href;

     var start = uri.match(/start=(\d+)/);
     start = null == start ? 0 : Number(start[1]);

     var results = document.evaluate("//span[contains(@class,'tl')]/h3[contains(@class,'r')]/..",document,null,6,null);

     for (var i = 0; i < results.snapshotLength; i++){
	 var r = results.snapshotItem(i);
	 if ('serpnumbers' == r.firstChild.className) return;
	 var n = document.createElement('span');
	 n.className = 'serpnumbers';
	 n.innerHTML = (start * 1 + i + 1) + '. ';
	 r.insertBefore(n, r.firstChild);
	 r.parentNode.replaceChild(r.cloneNode(true),r);
     }
}

document.addEventListener('DOMNodeInserted',
    function(e) {
	if ('knavm' == e.target.id) enumerate();
    }, true);

enumerate();
