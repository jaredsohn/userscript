// ==UserScript==
// @name        Larger Youtube Player
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Increases the size of the Youtube Player
// @include     https://www.youtube.com/watch?*
// @include     http://www.youtube.com/watch?*
// @version     1
// @grant       none
// ==/UserScript==

if(!~document.cookie.indexOf("VISITOR_INFO1_LIVE=E_OLzg3yeLw;") && !localStorage['yt_resize_cookie']){
    localStorage['yt_resize_cookie'] = 'true';
    document.cookie="VISITOR_INFO1_LIVE=E_OLzg3yeLw; path=/; domain=.youtube.com";
    window.location.reload()
} else {
    var s,d;
    (s=(d=document).createElement('style')).innerHTML='#masthead-positioner{position:absolute;}.site-center-aligned #player.watch-medium{width:1280px;}.watch-medium .player-height{height:650px;}.watch-medium .player-width{width:1280px;}';
    d.head.appendChild(s);
}