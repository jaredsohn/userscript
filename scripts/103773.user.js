// ==UserScript==
// @name			Erase Untaint cookies
// @namespace		http://hawaiifive-0.wetpaint.com/
// @description   	Erase previous Untaint settings
// @version			1.0.001
// @include			http://*.wetpaint.com/*
// @include			http://www.sarahconnorfans.com/*
// @include			http://www.vampirediariesfanwiki.com/*
// @include			http://www.thegreysanatomywiki.com/*
// @include			http://dexterwiki.sho.com/*
// @include			http://www.wetpaintcentral.com/*
// ==/UserScript==
// =============================================================================
// Erases certain Untaint cookies left over from a previous versions of another script.
// *** Only use if you used a prior version of the Untaint script before 1.5.ffc.004 for Firefox 4 and Chrome 11, and you're currently using the latest version of the Untaint script. Otherwise, this script does nothing useful.
// It only needs to be run once per Wetpaint wiki. Once that's complete, the script can be disabled and removed.
function getCookie(name, defVal) {
	try
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return defVal;
	}
	catch (e) 
	{
		// alert(e.source + '\n' + e.message);
		return defVal;
	}
}

function setCookie(name,value,days) {
	try
	{
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	catch (e) 
	{
		// alert(e.source + '\n' + e.message);
	}
}

function eraseCookie(name) {
	setCookie(name,"",-1);
}

// clean up left over settings from previous versions
eraseCookie ('ui_avatar_w');
eraseCookie ('ui_hide_rater');
eraseCookie ('ui_user_filter');
eraseCookie ('refresh_threadlist');
eraseCookie ('ui_show_leftcolumn');
eraseCookie ('ui_auto_tinyeditor');
eraseCookie ('ui_uncheck_watch_this_thread');
eraseCookie ('ui_default_post_font');

if (localStorage) localStorage.removeItem('added_post');
