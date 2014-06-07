// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html



// ==UserScript==

// @name          Force Facebook Notifications 2

// @namespace     http://userscripts.org/scripts/show/106432

// @description	  Force the update of facebook notifications.

// @version       0.3

// @date          2011-07-09

// @creator       Shane Thompson

// @include       htt*://*facebook.com*

// @exclude       htt*://*.facebook.com/plugins/*

// ==/UserScript==



// This script was originally created by userscripts.org user,

// 'SphaX'. Upon downloading and using his script, I noticed

// it was out-dated. So I modified it and re-uploaded it under

// the same license, GPL. All ideas are SphaX's, I simply

// modified the script to work on the current facebook

// environment. I hope you find this script as useful as I

// have.



// ORIGINAL SCRIPT LOCATION:

//	http://userscripts.org/scripts/show/78669



unsafeWindow.onload=function init(){

	if (unsafeWindow.location.protocol === 'https:') {

		document.getElementById('pageLogo').childNodes[0].setAttribute('href','https://www.facebook.com');

		document.getElementById('pageNav').childNodes[1].childNodes[0].setAttribute('href','https://www.facebook.com');

	} else {

		document.getElementById('pageLogo').childNodes[0].setAttribute('href','http://www.facebook.com');

		document.getElementById('pageNav').childNodes[1].childNodes[0].setAttribute('href','http://www.facebook.com');

	}

}

