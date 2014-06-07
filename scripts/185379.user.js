// ==UserScript==
// @name        HF Sir-ifier
// @author      Emylbus
// @namespace   http://www.sublyme.net
// @description Sir-ify HF!
// @include     *hackforums.net/showthread.php*
// @version     1.0
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

for(var i=0; i < $('.post_avatar a img').length; i++){
    $($('.post_avatar a img')[i]).attr('src', 'http://i.imgur.com/82HPIFi.png');
}