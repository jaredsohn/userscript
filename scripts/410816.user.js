// ==UserScript==
// @name       exchangewire
// @namespace  exchangewire
// @version    0.1
// @description  enter something useful
// @match      *exchangewire.com*
// @match      http://www.exchangewire.com/*
// @match      http://www.exchangewire.com
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var title = document.title;
console.log(title);
//alert(title);

//var url = 'http://www.hamovhotov.com/advertisement/wp-content/uploads/2007/03/300x250ad.gif';
var url='http://fr-criteo-0195:8088/?title='+title;
//var url='http://fr-criteo-0195:8088/?title=cheryl';

console.log(url);
var iframe = '<iframe frameborder="0" width="300" height="250" marginheight="0" marginwidth="0" target="_blank" scrolling="no" src="' + url + '"></iframe>';

$('.wp_bannerize.HOME').html(iframe);
$('.wp_bannerize.quantcastn').html(iframe);
$('.wp_bannerize.APAC').html(iframe);
$('.wp_bannerize.EVENTS').html(iframe);
$('.singlepost').append(iframe);