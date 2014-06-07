// ==UserScript==
// @name        FluentU video length
// @namespace   

// @description Displays the length of each videos like on Youtube
// @include     http://chinese.fluentu.com/videos.php*
// @version     0.1

// @grant	none
// ==/UserScript==

var s_composite_link = document.getElementsByClassName('imaging-link-list composite-filter'); for ( var i = 0; i < s_composite_link.length; i += 1) { s_composite_link[i].onclick= function() {
setTimeout( function() {

var block = document.getElementsByClassName('title main');

for (i = 0; i < block.length; i += 1) {
  var data = VideoCardUtils.getVideoData(Number(block[i].parentNode.parentNode.getAttribute('data-id')));
  var length = data.excerptLengthHMS || data.durationHMS;
  block[i].parentNode.innerHTML += length + ' ' + data.difficulty_name;
};

}, 500 );


} };

