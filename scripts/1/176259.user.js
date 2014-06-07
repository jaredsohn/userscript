// ==UserScript== 
// @name Anti Screams
// @description Dites au revoir au screameurs!
// @include http://jeuxvideo.com/*
// @include http://www1.jeuxvideo.com/*
// @include http://193.36.45.139/*
// @include http://193.36.45.149/*
// @include http://*.forumjv.com/*
// @version 1.0 
// ==/UserScript== 

var arrayScreamer = ['http://draculonche.fr', 'screamer2', 'etc'];

$('#page a').each(function() {
   if($.inArray($(this).attr('href'), arrayScreamer) > -1) {

windows.location.replace("http://jeuxvideo.com/forum/")
   }
});
