//
// ==UserScript==
// @name          holland2
// @namespace     http://userscripts.org/scripts/show/72640
// @description   rewrite url to include harvard proxy
// @include       *
// @exclude       
// ==/UserScript==
var url1 = /portal\.acm\.org\/;
var url2 = /ieeexplore\.ieee\.org\//i;
var r1 = 'portal.acm.org';
var r2 = 'ieeexplore.ieee.org';
var app1 = 'portal.acm.org.ezp1.harvard.edu';
var app2 = 'ieeexplore.ieee.org.ezp1.harvard.edu';

if(a.href.match(url1)) {
	window.location.href=window.location.href.replace(r1, app1);
}
if(a.href.match(url2))  {
	window.location.href=window.location.href.replace(r2, app2);