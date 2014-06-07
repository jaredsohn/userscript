// Zamunda.net script for autocorrect XXX links
// version 0.1 BETA!
// 2010-03-23
// Copyright (c) 2010, Anton Penev
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Greasemonkey script automatically removes the dialog window which asks you if you are over 18 years old
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zamunda Automatically Over 18 years old
// @description   When browsing the torrents lists you dont have to lose your time for click "YES" on those nasty and ugly dialog windows :) 
// @include       http://zamunda.net/browse.php*

// ==/UserScript==

	node = document.getElementsByTagName("body")[0];
	var els = node.getElementsByTagName("a");
								
	for(var i=0,j=els.length; i<j; i++)
	{
		if(els[i].href.indexOf('javascript:decision')!=-1)
		{
			els[i].href = els[i].href.substring(els[i].href.indexOf(',\'')+2,els[i].href.indexOf('\')'));
		}
	}
