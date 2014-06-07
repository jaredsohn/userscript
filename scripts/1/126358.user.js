// ==UserScript==
// @name           Add Ghost Trapper Profile Links to Facebook Timeline (Beta)
// @description    Easy access GT profile link from facebook timeline
// @author         Your Name
// @include        http://*.facebook.com/*
// @include        http://*.facebook.com/*#*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/*viewas*
// @version        2.0
// ==/UserScript==


	var _FB_name = document.getElementsByClassName( '_8_2' )[0];



	var _FB_profile_pic = document.getElementsByClassName( 'profilePicThumb' )[0].href;

	var _userId_raw = _FB_profile_pic.split(".")[6];
	var _userId_FB = _userId_raw.split("=")[0];
	
	_FB_name.href="http://www.ghost-trappers.com/fb/profiletab/index_intern.php?fbid="+_userId_FB;
