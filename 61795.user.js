// ==UserScript==
// @name           Facebook Redirecter
// @namespace      www.facebook.com
// @description    Redirects from facebook to google
// @include        *
// @version		   1.0
// ==/UserScript==

if (document.baseURI.indexOf('facebook.com') > -1) {
	location.replace('http://www.google.com');
}