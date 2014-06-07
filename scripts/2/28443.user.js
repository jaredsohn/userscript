// ==UserScript==
// @name           garminFix
// @namespace      maps
// @include        http://www.geocaching.com/garmin/freetrial.aspx
// ==/UserScript==

scripts = document.getElementsByTagName('script');
for (x=0;x < scripts.length;x++) {
	if (scripts[x].src != undefined && scripts[x].src.indexOf('garmin') != -1) {
		scripts[x].src=scripts[x].src.replace('http://developer.garmin.com/web/communicator-api-1.3/','http://developer.garmin.com/web/communicator-api/')
	}
}