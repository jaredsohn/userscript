// ==UserScript==
// @name	Social Locker Disabler
// @namespace	frs_antislockr
// @description	Disables SocialLocker for WordPress showing the hidden content
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include	*
// @version	1.0
// ==/UserScript==
jQuery().ready(function(){
	jQuery('.onp-sociallocker-content').show();
	jQuery('.onp-sociallocker').hide();
});