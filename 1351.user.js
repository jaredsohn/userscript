// ==UserScript==
// @name          Hotmail Single Window
// @namespace     http://www.arantius.com/article/arantius/hotmail+single+window/
// @description	  Remove javascript from some links, especially those which open a window for links in mail.
// @include       http://*.hotmail.msn.com/*
// @version       1.1
// ==/UserScript==

// 
// Version History:
//  1.1
//   - Incorporated user contributed changes.  Examine comments below.
//

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
// 

(function(){
//dump('=== Apply Hotmail Single Window ===\n');
var results=document.evaluate('//a[starts-with(@href, "javascript:")]', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var m, el=null, i=0; el=results.snapshotItem(i); i++) {
	//I have not seen it, but users have reported a 'dl' function as
	//well as the 'ol' function which the next line catches
	if (m=el.href.match(/^javascript:(ol|dl|G)\(\'([^\']*)\'(,1)?\);?$/)) {
		//another user has reported the need for the call to unescape
		//below but I cannot confirm.  regular links appear to continue
		//to work so it seems ok to me!
		el.href=unescape(m[2]);
	} else if (m=el.href.match(/^javascript:HMFO\(\'([^\']*)\'\);?$/)) {
		el.href='/cgi-bin/HoTMaiL?a='+encodeURIComponent(m[1])+'&curmbox='+encodeURIComponent(m[1]);
	} else {
		//dump(el+'\n');
		//el.style.backgroundColor='red';
	}
}
})();
