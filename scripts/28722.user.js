// ==UserScript==
// @name           music
// @namespace      douban_music
// @description    douban_music
// @include        http://www.douban.com/subject/*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery 
}

function createBar(name){
    return $("<div id='barrrr'><span><a href='http://www.yobo.com/so/all?x=14&y=9&q="+ name +"'>  yobo </a></span></div>");
}

$(document).ready(function(){
    name = $('h1:first').text();
    var bar = createBar(name);
    bar.insertAfter($('h1:first')).show();
})