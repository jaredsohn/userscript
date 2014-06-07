// ==UserScript==
// @name       Youtube center layout
// @namespace  http://facebook.com/matteprl
// @version    0.1
// @description  Centers Youtube layout, so it fits my habits :)
// @match      http://www.youtube.com/*
// @copyright  2012+, Matte
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
jQuery('document').ready(function(){
    jQuery('#page').attr('style', 'margin: 0px auto !important');
});
