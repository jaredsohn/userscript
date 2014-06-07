// ==UserScript==
// @name           remove Youtube adds
// @namespace      youtubetads
// @version        1.1
// @author         FDisk
// @description    Remove youtube ads from the right side of the screen and from the embeded video
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery.lukelutman.com/plugins/flash/jquery.flash.js
// @require        http://usocheckup.redirectme.net/74961.js
// ==/UserScript==

//Check for updates

$('#homepage-sidebar-ads').remove();

$('#google_companion_ad_div, #watch-channel-brand-div, #watch-channel-brand-div').remove();
var video = 'https://www.youtube-nocookie.com/v/'+$('#watch-mfu-button').attr('data-video-id');
$('#watch-player').empty().flash(
	{ 
		height: 1280, 
		width: 720,
		src : video+'?version=1&amp;autoplay=0&amp;fs=1&amp;hd=1'			
	}
);
