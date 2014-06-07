// ==UserScript==
// @name          Custom options for new google alerts form
// @namespace     http://www.wuonm.com/blog/wiki/GreaseMonkeyUserScripts
// @description	  Change select options to "News & Web" and "as it happens" plus focus on input box
// @include     http://www.google.com/alerts/*
// ==/UserScript==
//
// $Id: googlealerts.user.js,v 1.1 2005/03/30 14:06:32 wuonm Exp $
//

(function(){
	document.f1.t.selectedIndex=2;
	document.f1.f.selectedIndex=1;
	document.f1.q.focus();
}
)();
