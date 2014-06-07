// ==UserScript==
// @name        Tumblr widescreen fix
// @namespace   http://www.tumblr.com
// @version     1.0.4
// @description enhance the tumblr dashboard with widescreen and highres images
// @author      Nickel
// @copyright   2014, Nickel
// @grant	GM_addStyle
// @include     *://www.tumblr.com/dashboard*
// @include     *://www.tumblr.com/tagged/*
// @include     *://www.tumblr.com/likes*
// @include     *://www.tumblr.com/liked/by/*
// @include     *://www.tumblr.com/inbox*
// @include     *://www.tumblr.com/blog/*
// @include     *://www.tumblr.com/send*
// @include     *://www.tumblr.com/following*
// @downloadURL https://userscripts.org/scripts/source/160799.user.js
// @updateURL   https://userscripts.org/scripts/source/160799.meta.js
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

// FIXME: scrolling up tends to "jump"
// FIXME: opening/closing the image viewer sometimes makes the site scroll randomly
// TODO: widen fanmail submission on inbox
// TODO: somehow make multiple columns for activity page, blog members page

(function(){

// don't run in frames
if (frameElement){ return; }

// fallback (Chrome lacks GM functions)
if( typeof GM_addStyle != 'function' ) {
	function GM_addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if( !head ){ return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

// do some replacement work on the page
function work() {
	var elm, i;

   	// highres images for non-photoset photos
	elm = document.getElementsByClassName("high_res_link");
	for (i=0; i<elm.length; i++) {
		if( elm[i].workedOn == true ) { continue; }
		elm[i].workedOn = true;

		if( elm[i].firstChild.src.indexOf(".gif") > -1 ) {
			continue;	//gif animations often break on the 1280 version
		}			//also see http://www.tumblr.com/docs/en/photo_troubleshooting

		elm[i].firstChild.onerror = function() {	//undo replacement
			console.log("unreplacing %s", this.src);
			this.src = this.src.replace(/_1280./,"_500.");
		}
		elm[i].firstChild.src = elm[i].firstChild.src.replace(/_500./,"_1280.");
		elm[i].parentNode.setAttribute('style', 'width:0px;');	//fix link area
	}

	// highres images for panorama photos
	elm = document.getElementsByClassName("panorama");
	for (i=0; i<elm.length; i++) {
		if( elm[i].workedOn == true ) { continue; }
		elm[i].workedOn = true;

		elm[i].firstChild.onerror = function() {	//undo replacement
			console.log("unreplacing %s", this.src);
			this.src = this.src.replace(/_1280./,"_500.");
		}
		elm[i].firstChild.src = elm[i].firstChild.src.replace(/_500./,"_1280.");
	}

	// highres blog avatars
	elm = document.getElementsByClassName("post_avatar_link");
	for (i=0; i<elm.length; i++) {
		if( elm[i].workedOn == true ) { continue; }
		elm[i].workedOn = true;

		elm[i].style.backgroundImage = elm[i].style.backgroundImage.replace(/_64.png/,"_128.png");
		for (var j=0; j<elm[i].attributes.length; j++ ) {	//needed so highres avatar is put back after posting
			if( elm[i].attributes[j].name == "data-avatar-url" ) {
				elm[i].attributes[j].value = elm[i].attributes[j].value.replace(/_64.png/,"_128.png");
				break;
			}
		}
	}

	// highres blog sub avatars (if present)
	elm = document.getElementsByClassName("post_sub_avatar");
	for (i=0; i<elm.length; i++) {
		if( elm[i].workedOn == true ) { continue; }
		elm[i].workedOn = true;

		elm[i].style.backgroundImage = elm[i].style.backgroundImage.replace(/_30.png/,"_64.png");
	}

	// expand inline images
	elm = document.getElementsByClassName('constrained_image');
	for (i=0; i<elm.length; i++) {
		if( elm[i].workedOn == true ) { continue; }
		elm[i].workedOn = true;

		elm[i].classList.remove("inline_image");
	}
}


// fan mail submission page
if ( window.location.href.indexOf("/send") > -1 ) {
	GM_addStyle("#container {width:1230px !important; left:-615px !important;}");
	GM_addStyle("#fan_mail {width:1048px !important; background-size:1048px 385px !important;}");
	GM_addStyle("#message {width:985px !important;}");
	GM_addStyle("#submit_controls {left:1077px !important;}");
}
// followers page
else if ( window.location.href.indexOf("/followers") > -1 ) {
	// main stretching
	GM_addStyle("#container {width:1480px !important; padding:0px !important;}");
	GM_addStyle("#left_column {width:1145px !important; margin-left:64px !important;}");

	// 4 columns for followers
	GM_addStyle(".follower {clear:none !important; width:22.98% !important; float:left !important; height:128px !important; border:1px solid rgba(0, 0, 0, 0.06) !important;}");
	GM_addStyle(".controls {margin:-120px 30px !important;}");
	GM_addStyle(".name {width:250px !important; height:20px !important; overflow:hidden !important; text-overflow:ellipsis !important;}");

	GM_addStyle(".follower .avatar {min-height:96px !important;}")
	GM_addStyle(".avatar .avatar_img {width:96px !important; height:96px !important;}")
}
// following page
else if ( window.location.href.indexOf("/following") > -1 ) {
	// main stretching
	GM_addStyle("#container {width:1480px !important; padding:0px !important;}");
	GM_addStyle("#content {background-size:1480px !important;}");
	GM_addStyle("#content_bottom {width:1480px !important;}");
	GM_addStyle("#tabs {background-size:1480px !important;}");
	GM_addStyle(".tab:not(.iconic) {width:492px !important;}");

	// 5 columns for followees
	GM_addStyle("#left_column {width:1070px !important;}");
	GM_addStyle(".follower:not(#invite_someone) {clear:none !important; width:17.94% !important; float:left !important; height:128px !important; border:1px solid rgba(0, 0, 0, 0.06) !important;}");
	GM_addStyle(".controls {margin:-120px 0px !important;}");
	GM_addStyle(".name {width:200px !important; overflow:hidden !important; text-overflow:ellipsis !important;}");
	GM_addStyle(".next {margin-top:25px !important;}");
	GM_addStyle(".previous {margin-top:25px !important;}");

	GM_addStyle(".follower .avatar {min-height:96px !important;}")
	GM_addStyle(".avatar .avatar_img {width:96px !important; height:96px !important;}")

	// right column
	GM_addStyle("#right_column {width:320px !important;}");
	GM_addStyle("#crushes {width:320px !important; height:320px !important}");
	GM_addStyle(".crush {width:96px !important; height:96px !important}");
}
// activity page
else if ( window.location.href.indexOf("/activity") > -1 ) {
	// main stretching
	GM_addStyle("#container {width:1480px !important; padding:0px !important;}");
	GM_addStyle("#left_column {width:1145px !important; margin-left:64px !important;}");
	GM_addStyle("#sidebar_footer_nav {width:1200px !important;}");
	GM_addStyle(".divider {background-size:1145px 17px !important;}");

	// biggest fans box
	GM_addStyle(".tops_fans {width:570px !important;}");
	GM_addStyle(".ui_jumbo_avatar {width:128px !important;}");
	GM_addStyle(".avatar_image {width:128px !important; height:128px !important;}");

	// top post box
	GM_addStyle(".tops_post {width:504px !important; min-height:171px !important;}");
	GM_addStyle(".post.is_mine {width:250px !important; height:150px !important; margin-left:auto !important; margin-right:auto !important;}");

	// don't scroll right column (but breaks blog popover in chrome)
	if( ! window.chrome ) {
		GM_addStyle("#right_column {position:fixed !important; margin-left:1225px !important;}");
	}
}
// settings page
else if ( window.location.href.indexOf("/settings") > -1 ) {
	// main stretching
	GM_addStyle("#container {width:1480px !important; padding:0px !important;}");
	GM_addStyle("#left_column {width:1145px !important; margin-left:64px !important;}");
}
// normal pages (i.e. the rest)
else {
	// main stretching
	GM_addStyle("#container {width:1480px !important; padding:0px !important;}");
	GM_addStyle("#left_column {width:1145px !important; margin-left:64px !important;}");
	GM_addStyle("#sidebar_footer_nav {width:1200px !important;}");

	// center and increase margin of new post buttons
	GM_addStyle("#new_post {margin-left:auto !important; margin-right:auto !important; width:545px !important; margin-bottom:48px !important;}");

	// stretch post boxes
	GM_addStyle(".post_full:not(.new_post_buttons) {width:1060px !important; min-height:128px !important;");

	// widen texts
	GM_addStyle(".post_info {max-width:525px !important;}");
	GM_addStyle(".post_info_fence {max-width:500px !important;}");
	GM_addStyle(".post_source_link {max-width:250px !important;}");

	// stretch ask questions and lower nipple
	GM_addStyle(".note_item {width:910px !important; min-height:96px !important;}");
	GM_addStyle(".nipple {top:40px !important;}");

	// stretch ask answers
	GM_addStyle(".answer {max-width:1000px !important;}");	//rule must come after post_info

	// unwiden embedded videos
	GM_addStyle(".video_embed {width:500px !important;}");

	// increase size of album art
	GM_addStyle(".audio_player_container {height:250px !important;}");

	// double columns for some photosets
	GM_addStyle(".photoset_row {width:50% !important; float:left !important; margin-top:0px !important; margin-bottom:10px !important;");
	GM_addStyle(".post_body {width:100% !important; float:left !important;}");	//keep captions separated

	// support highres images
	GM_addStyle(".high_res_link img {width:auto !important; height:auto !important; max-width:1024px !important; max-height:1024px !important; margin-left:-2px !important}");
	GM_addStyle(".panorama img {width:auto !important; height:auto !important; max-width:1024px !important; max-height:1024px !important; margin-left:-2px !important}");

	// support highres avatars
	GM_addStyle(".post_avatar {width:128px !important; height:128px !important; margin-left:-64px !important}");
	GM_addStyle(".post_sub_avatar {width:64px !important; height:64px !important; top:70px !important}");
	GM_addStyle(".avatar img {width:96px !important; height:96px !important;}")

	// center notifications, indent toasts
	GM_addStyle(".notification {margin-left:auto !important; margin-right:auto !important;}");
	GM_addStyle("#toast_container {left:280px !important;}");

	// fix repeat pattern on fanmail
	GM_addStyle(".message {background-repeat:repeat !important;}");

	// don't scroll right column (but breaks blog popover in chrome)
	if( !window.chrome ) {
		GM_addStyle("#right_column {position:fixed !important; margin-left:1225px !important;}");
	}


	// first iteration
	work();

	// repeat whenever page changes
	var counter = document.getElementsByTagName('div').length;

	function trigger() {
		if (document.getElementsByTagName('div').length != counter) {
			counter = document.getElementsByTagName('div').length;
			work();
		}
	}

	setInterval(trigger,1000);
}

})();