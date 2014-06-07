// ==UserScript==
// @name           Metafilter Fixed-Width Layout
// @include        http://*.metafilter.com*
// ==/UserScript==
var pagebody = document.getElementsByTagName('body');
if (pagebody.length) {
    	//found body element
    	//get body contents and wrap in a new div
	bodyContent = pagebody[0].innerHTML;
	bodyContent = '<div id="bodywrapper">' + bodyContent + '</div>';
    	//replace body contents
	pagebody[0].innerHTML = bodyContent;
}

//center new div in body
GM_addStyle("body { text-align: center;}");
//make new div fixed-width with auto margins (CSS centered)
GM_addStyle("#bodywrapper { width: 900px; margin: 0 auto; text-align: left;}");