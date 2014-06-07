 // ==UserScript==
 // @name       PA Comic Inline
 // @namespace  http://use.i.E.your.homepage/
 // @version    0.2
 // @description  Loads 
 // @include    http://penny-arcade.com/*
 // @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
 // @copyright  2011+, You
 // ==/UserScript==
// Updated for new Penny Arcade page
 jQuery('#body').before('<div id="comic"></div>');
 jQuery('#comic').load(window.location.origin + "/comic" + window.location.pathname + ' .post.comic', function(){
     jQuery('.post.comic').width('100%');
 }); 