// (c) Copyright 2007 Rod Knowlton. All Rights Reserved. 
// ==UserScript==
// @name           Tumblr Persistent Dashboard Filter
// @namespace      com.toldorknown.tumblr
// @description    Saves and automatically reapplies any Dashboard filter you set
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/show/*/by/me
// @include        http://www.tumblr.com/show/*/by/everyone
// ==/UserScript==


var dashRegex = /http:\/\/www.tumblr.com\/(dashboard(?!\/iframe\?)|show)/;

var savedFilter = GM_getValue('saved_filter','http://www.tumblr.com/dashboard');

if(document.location.href != savedFilter){
	if (document.referrer.match(dashRegex)){
		GM_setValue('saved_filter',document.location.href);
	}
	else {
		document.location = savedFilter;
	}
}