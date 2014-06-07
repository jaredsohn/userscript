// ==UserScript==
// @name          Anti-doppelganger ver 1.3
// @namespace     http://internet-israel.com
// @description   Remove doppelganger week from my fucking feed
// @grant			none
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @require       http://code.jquery.com/jquery.js
// ==/UserScript==
 
 
function main(){
	var change_my_profile =  $("span:contains('profile picture')");
	if(change_my_profile.length > 0) {
		change_my_profile.closest('.userContentWrapper').remove();
	}
	$('.userContentWrapper').children('a').hide();
	$('.UFIActorImage').hide();
}
 
window.addEventListener('scroll', function() {
        main();
});
 
main();