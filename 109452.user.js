// ==UserScript==
// @name Anti-Facebook-Clickjacker
// @namespace Sternschlaeger
// @version 2.0.0
// @description This script removes the block over videos, which want you to share them on facebook!
// @icon http://sse.fantasticstories.eu/data/anti_facebook_clickjacker.png
// @run-at document-end
// @include http://sportfail.org/*
// @include http://www.lachkick-videos.com/*
// @include http://clipfire.net/*
// @include http://fb-tube.net/*
// @include http://vids.fun-pille.de/*
// @include http://www.lustig-online.com/*
// @include http://fb-fail.com/*
// @include http://i-like-videos.de.vu/*
// @include http://dailyvideo.tk/watchvid/*
// @include http://lustige-videos.50spenden.de/*
// @include http://www.thug-clips.com/video/*
// @include http://thug-clips.com/video/*
// @include http://www.fbvids.de/video-*
// @require http://userscripts.org/scripts/source/109913.user.js
// ==/UserScript==
function execute() {
if (window.location.hostname.match('dailyvideo.tk')) {
	document.getElementById('vali').value=1;
	window.location.href = "javascript:load_vid()";
}
if (window.location.hostname.match('www.fbvids.de')) {
//using Anti-FBVids-Like by Kingdread: http://userscripts.org/scripts/show/109913
	run();
}
if (window.location.hostname.match('clipfire.net')) {
	unblock_it(window.document,document.getElementById('video_container'));
	make_it_visible(window.document,document.getElementById('real_container'));
}
if (window.location.hostname.match('fb-tube.net')) {
	make_it_visible(window.document,document.getElementById('videonu1'));
	unblock_it(window.document,document.getElementById('videonu2'));
}
if (window.location.hostname.match('vids.fun-pille.de')) {
	unblock_it(window.document,document.getElementById('video_container'));
	make_it_visible(window.document,document.getElementById('real_container'));
}
if (window.location.hostname.match('www.lustig-online.com')) {
	unblock_it(window.document,document.getElementById('video_container'));
	make_it_visible(window.document,document.getElementById('real_container'));
}
if (window.location.hostname.match('www.lachkick-videos.com')) {
	unblock_it(window.document,document.getElementById('video-overlay'));
	make_it_visible(window.document,document.getElementById('real-video'));
}
if (window.location.hostname.match('sportfail.org')) {
	unblock_it(window.document,document.getElementById('play_block'));
}
if (window.location.hostname.match('fb-fail.com')) {
	unblock_it(window.document,document.getElementById('play_block'));
}
if (window.location.hostname.match('i-like-videos.de.vu')) {
	unblock_it(window.document,document.getElementById('video_container'));
	make_it_visible(window.document,document.getElementById('real_container'));
}
if (window.location.hostname.match('lustige-videos.50spenden.de')) {
	unblock_it(window.document,document.getElementById('over'));
	make_it_visible(window.document,document.getElementById('vid_real'));
}
if (window.location.hostname.match('thug-clips.com'||'www.thug-clips.com')) {
	unblock_it(window.document,document.getElementById('video_container'));
	make_it_visible(window.document,document.getElementById('real_container'));
} else {
};};
// End execute and run it
execute();
// Removal function
function unblock_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
//Make content visible that is usually invisible
function make_it_visible(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "block";
  doc.last_removed_node = node;
};