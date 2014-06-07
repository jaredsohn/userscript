// ==UserScript==
// @name           Replace Google Experimental Logo
// @namespace      jms
// @description    Replace Google Experimental logo with current logo on Google's homepage.  Especially useful if there is a special design for today.
// @include        http://*.google.com
// @include        http://google.com
// ==/UserScript==


// Replace Google Experimental logo with current logo on Google's homepage
// version 0.1
// 2008-01-01
// Copyright (c) 2008, John Sillcox
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Replace Google Experimental Logo", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Replace Google Experimental Logo
// @namespace     jms
// @description   Replace Google Experimental logo with current logo on Google's homepage.  Especially useful if there is a special design for today.
// @include       http://*.google.com
// @include       http://google.com
// ==/UserScript==

var s, loc1, loc2, newlogo, expimg, replacelogo;
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.google.ca',
    onload: function(response) {
		s = response.responseText;
		loc1 = s.search('logos/');
		if (loc1 != -1) {
			while(true) {
				if(s.substring(loc1, loc1+7) == '<a href') break;
				loc1--
			}
			loc2 = loc1 + s.substring(loc1).search('</a>') + 4;//4='</a>'.length
			newlogo = s.substring(loc1, loc2)
			expimg = document.evaluate(
				"//img[@src='/images/experimental.gif']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null).snapshotItem(0);//will only be one
			replacelogo = document.createElement("div");
			replacelogo.innerHTML = '<div>' + newlogo + '</div>';
			if (expimg) {
				expimg.parentNode.insertBefore(replacelogo, expimg);
			}
			
			if (expimg) {
				expimg.parentNode.removeChild(expimg);
			}
		}
	}
});