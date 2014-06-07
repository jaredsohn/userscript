// ==UserScript==
// @name        Facebook Photo Feed
// @namespace   FPF
// @description Adds a link to your Facebook sidebar to display only photos from News Feed
// @include     http://*.facebook.com/*
// @include     http://facebook.com/*
// @include     https://*.facebook.com/*
// @include     https://facebook.com/*
// @version     1.2
// @grant       GM_addStyle
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
    $ = unsafeWindow['jQuery'];
    $.noConflict();    
    $('#pinnedNav > div > ul.uiSideNav').append('<li id="navItem_app_2305272732" class="sideNavItem stat_elem"><a title="" href="/?sk=app_2305272732_2392950137" class="item clearfix sortableItem"><div><span class="imgWrap"><i class="img sp_6x3roz sx_08191d"></i></span><div class="linkWrap noCount">Photo Feed</div></div></a></li>');
}, false);