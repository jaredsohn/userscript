// ==UserScript==
// @name       demotyvacija.lt enhancer
// @namespace  http://rndbit.net/
// @version    0.1
// @description  demotyvacija.lt enhancer
// @match      http://demotyvacija.lt/*
// @match      http://www.demotyvacija.lt/*
// @copyright  2012+, rndbit
// @require    http://www.demotyvacija.lt/jscripts/jquery-1.4.4.min.js
// ==/UserScript==

jQuery(function(){
    src = jQuery('#demo_image').attr('src');
    alt = jQuery('#demo_image').attr('alt');
    
    jQuery('#demo_image').replaceWith('<img id="#demo_image" src="'+src+'" alt="'+alt+'" />');
});