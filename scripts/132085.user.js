// ==UserScript==
// @name           Footyroom "Whatch on Dailymotion"
// @description    Footyroom uses a showckwave player to show videos that doen't work for linux users (with out using some wine based solution). This script adds a link to the original video on dailymotion, sow you can watch it on a html5 player.
// @author         dami
// @include        http://footyroom.*
// @include        http://*.footyroom.*
// @include        https://*.footyroom.*
// @version        0.2
// ==/UserScript==

function main () {
  $(function(){
  	$('#videos').after('<a href="' + _videos[VideoSelector.activeVid].url.replace('swf', 'video') + '">Watch on Dailymotion<a/>');
	VideoSelector.selectVid(0);
  });
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);