// ==UserScript==
// @name       asanusta Youtube izleme sayfası
// @namespace  asanusta
// @version    02.9.2012
// @description  mükemmel bir izleme sayfası. iç ekran görüntülerini görmek için-perfect watch page. see screenshots inside..
// @include        http://*youtube.com/watch*
// @include        https://*youtube.com/watch*
// ==/UserScript==

// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

GM_addStyle(" \
#watch-panel {float: right; clear: right; width: 300px; padding-top: 0px; padding-right: 6px; z-index: 1; position: relative;} \
#watch-actions {width: 300px; position: relative;} \
#watch-sidebar {margin-left: 0px; width: 310px; clear: right; margin: 0px; padding:0px;} \
.watch-headline, #watch-headline, #watch-video, #watch-main {width: auto;} \
#watch-video {position: static; padding-right: 310px; height: 100%; } \
#watch-player {width: 100%; height: 100%;} \
#watch-headline-container {width: 307px; float:right; clear:right; font-size: 70%; position: relative; z-index: 1;} \
#masthead {width: 300px; float: right; padding: 0 0 0 0; } \
#masthead-user-bar-container, #masthead-nav, #footer-container {display:none;} \
#masthead-search-bar-container {padding-right:5px; padding-left:5px;} \
.comment .content {width: 300px;} \
.comment-list .comment .content {width: 300px;}\
#page.watch-branded #watch-headline-container {width: 307px; float:right; clear:right; font-size: 70%; position: relative; z-index: 1;} \
.yt-uix-button, .yt-subscription-button.subscribed {font-size: 10px; height: 2.44em; padding: 0 0.6em;} \
#watch-description-clip {width: 300px;} \
.yt-uix-expander-collapsed #watch-description-clip {position: static;} \
#watch-description-extra-info li {float:left;} \
#watch-description-extra-info { margin-left: 2px;} \
#page.watch-branded #watch-sidebar {margin-top: 0px;} \
#playlist-bar {height: 122px; zoom:0.95;}\
#playlist-bar-mask {height: 135px;}\
.comment.child .content {width: 280px;} \
.comment .comments-post, .comment.child {margin-left: 0px;} \
#watch-headline h1, #eow-title-input {height: auto; max-height: none;}\
#watch-like-share .share-panel-url {width: 265px; margin-left: 0em;}\
.share-panel-url {font-size: 0.9em;}\
#watch-channel-discoverbox .yt-uix-slider-body { width: 310px; }\
#watch-channel-discoverbox .yt-uix-slider-slide {width: 300px;}\
#watch-video.wide #watch-player {width: auto; height: 100%; margin: 0 0; margin-right: -310px; }\
#watch-video-annotation-textarea {width: 260px; }\
.watch-autohide #watch-player {height: 100%;}\
.comment-actions {bottom: 5px; top: auto;}\
select [font-size: 55%;]\
#watch-owner, #watch-owner-inline-edit, #watch-owner-inline-enhance {width: 300px;}\
#watch-owner-inline-edit {width: 300px;}\
#watch-owner {width: 300px;}\
#eow-title-input {width: 300px;}\
#watch-action-confirmation #watch-action-response-message {width: 290px;}\
#watch-video.medium #watch-player {width: auto; height: 100%; margin: 0 0; margin-right: -310px; }\
#alerts, #content, #promos, #footer, #copyright {width: 600px;}\
.watch-autohide #watch-video.medium #watch-player {height: 100%; }\
.cpline {height: 45px; }\
.cptext {height: auto; width: 220px; overflow: auto;} \
.comment-list .comment .content {width: 288px; }\
#ppv-container {display: block;}\
.watch-playlists-drawer .playlist-public-private {width: auto;}\
.watch-playlists-drawer ul { max-height: none; border: none; padding: 0px; margin-botton: 0px; }\
.watch-playlists-drawer .new-playlist-title {width: 250px;}\
.comment-actions {bottom: auto;}\
.comments-section .video-list {display: none;}\
.comments-section h4 {zoom: 0.9}\
.comments-section {margin-bottom: 8px;}\
#watch-description-extra-info {min-height: 15px;}\
#page.watch.watch-playlist-collapsed #watch-video-container {position: fixed; width: 100%; height: auto; top:0px; bottom: 116px; } \
#page.watch #watch-video-container {position: fixed; width: 100%; height: 100%; } \
#page.watch.watch-playlist-collapsed #playlist-bar.max {right: 0;width: 100%;bottom: 0;}\
#page.watch.watch-playlist-collapsed #playlist-bar.min {right: 0;width: 100%;bottom: 0;}\
#page.watch #playlist-bar.max {bottom: -78px;right: -110px;width: 436px;height: 122px;}\
#page.watch #playlist-bar.min {bottom: -78px;right: -110px;width: 436px;height: 122px;}\
#page.watch #playlist-bar-controls .playlist-bar-group {float: left;}\
#page.watch #playlist-bar-controls {float: left; overflow: hidden;}\
#page.watch #playlist-bar-title {display:none;}\
#page.watch #playlist-bar-controls .yt-uix-button-text {width:83px; margin:auto;}\
#page.watch.watch-playlist-collapsed #playlist-bar-controls .playlist-bar-group {float: right;}\
#page.watch.watch-playlist-collapsed #playlist-bar-controls {float: right;}\
#page.watch.watch-playlist-collapsed #playlist-bar-title {display:inline-block;}\
#page.watch.watch-playlist-collapsed #playlist-bar.max .yt-uix-button-icon-playlist-bar-toggle {background: no-repeat url(//s.ytimg.com/yt/imgbin/www-refresh-vflXkUAsM.png) -97px -276px;}\
#page.watch.watch-playlist-collapsed #playlist-bar.min .yt-uix-button-icon-playlist-bar-toggle {background: no-repeat url(//s.ytimg.com/yt/imgbin/www-refresh-vflXkUAsM.png) -97px -276px;}\
#page.watch #playlist-bar.max .yt-uix-button-icon-playlist-bar-toggle {background: no-repeat url(//s.ytimg.com/yt/imgbin/www-refresh-vflXkUAsM.png) -8px -209px;}\
#page.watch #playlist-bar.min .yt-uix-button-icon-playlist-bar-toggle {background: no-repeat url(//s.ytimg.com/yt/imgbin/www-refresh-vflXkUAsM.png) -8px -209px;}\
\ ");

