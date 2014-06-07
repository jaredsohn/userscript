// ==UserScript==
// @name        daha iyi hürriyet yorum
// @namespace   http://userscripts.org/users/297509
// @description hürriyet gazetesi web sitesinde haber yorumlarındaki arkaplan resmini kaldırır.
// @include     http://www.hurriyet.com.tr/*
// @version     3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    $('#flickr').removeAttr('style');
});
