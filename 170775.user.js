// ==UserScript==
// @name         Add Anchor Links
// @namespace    http://userscripts.org/users/137033
// @version      1.0
// @description  Adds anchor targets to all empty a tags and divs with and id 
// @match        *://*/*
// @copyright    2013+, André de Jager
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$(function(){
   'use strict';
    var locationHash = function(target){
        location.hash = '#' + target;
    }, css = {
        'cursor':'pointer'
    };
    $('a[id]:not(a[href])').click(function(){
        locationHash(this.id);
    }).css(css);
    $('a[name]:not(a[href])').click(function(){
        locationHash(this.name);
    }).css(css);
});