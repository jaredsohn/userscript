// ==UserScript==
// @name           Google Hebrew/English Search Buttons
// @namespace      http://www.rivlis.net/~eran
// @description    Adds an alternate Hebrew or English search button to Google search page
// @include        http://*.google.com/search?*
// @include        http://*.google.co.il/search?*
// ==/UserScript==

(function(myhl) {
	var baseurl = document.location.href.replace(/lr=lang_[^&]+&?/, '').replace(/hl=([^&]+)&?/, '');
    var current = (RegExp.$1)? RegExp.$1 : myhl;
	
    var sel = new XML('<button type="button" name="hl" OnClick="location.href=\'' + baseurl.replace(/&/g, '&#38;') + '&#38;hl=' + (current=='en' ? 'iw' : 'en') + '\'">' + (current=='en' ? 'חיפוש' : 'Search') + '</button>');
	GM_addStyle("button[name=hl] { margin:2px 2px 2px 2px; display:block; float:" + (current=='iw' ? 'right' : 'left') + "; }");
    with(document.getElementById('ap').parentNode) { innerHTML = sel.toXMLString() + innerHTML };
})('en');