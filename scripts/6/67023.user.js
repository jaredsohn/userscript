// ==UserScript==
// @id             b77e78bb-5ab5-403b-ae45-7540077fbc64
// @name           HTML5 Zing
// @namespace      kien
// @author         kien
// @copyright      2010+, kien (http://userscripts.org/users/82358)
// @licence        Summary: Free for personal non-commercial use; http://userscripts.org/scripts/show/101753
// @description    Makes Youtube's "Watch" page (video page) better, by putting the video description to the right of the video, and a couple other things.
// @icon           http://i.imgur.com/VQ8pr.png http://i.imgur.com/hfj8l.png
// @icon64         http://i.imgur.com/hfj8l.png
// @version        1.0.0
// @include        http://mp3.zing.vn/bai-hat/*
// ==/UserScript==
version = "1.0.0";

$(document).ready(function(){
alert('test');
});

// All your GM code must be inside this function
function letsJQuery() {
alert('test');
	var url = $('#player param[name=flashvars]').attr('value');
	var regx = /song-data\/([a-z]+)/i;
	var id = url.match(regx);
	$('.bplayer2').html('<audio controls="controls"><source src="http://kkvn.net/get.php?id='+id[1]+'" type="audio/mp3" />Your browser does not support the audio element.</audio>');
}