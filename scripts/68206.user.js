	// ==UserScript==
	// @name  Facebook Status Update Homepage
	// @namespace  http://2crazypirates.com
	// @description  Jump directly to the Status Update page by clicking the facebook logo. This overrides the February 2010 updates that force that link to News Feed.
	// @include  http*://*facebook.com*
	// @author Danny Dorsey
	// @version 1.0
	// ==/UserScript==

/*

Facebook Status Update Homepage is Copyright (c) 2010, Danny Dorsey
Facebook Status Update Homepage is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/
This full copyright section must be included in modifications or redistributions of this script

*/

var logoDIV = document.getElementById('pageLogo');
logoDIV.innerHTML = '<a href="http://www.facebook.com/home.php?sk=app_2915120374" title="Home" accesskey="1">';