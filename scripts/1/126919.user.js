// ==UserScript==
// @name           SoundCloud Embedded HTML5 Player Comment Hider
// @namespace      r3lay
// @description    Hides all comments on the Soundcloud embeddable player
// @include        http://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('iframe').each(function(index) {
    var baseurl = $(this).attr("src");
	var regExp = /soundcloud.com/g;
 
    if(regExp.test(baseurl))            
     {                      
     $(this).attr('src',baseurl+"&show_comments=false");                
     }
});