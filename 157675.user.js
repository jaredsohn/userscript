// ==UserScript==
// @name        Multiline Tumblr Tags
// @description Annoyed by having to drag to see all the tags of a post on your dash? Yeah, me too. This script removes the "roller" thing and lets the tags to wrap into multiple lines. 
// @namespace   Corvidism
// @include     http://www.tumblr.com/dashboard
// @include     http://www.tumblr.com/blog*
// @include     http://www.tumblr.com/tagged/*
// @version     1.1.2
// @grant       none
// ==/UserScript==

window.onload = function() {
var $ = jQuery;
var jlist = document.getElementsByTagName('li');
var counter = jlist.length;

function tagformat(){
  $("span.tags").removeClass("draggable");
  $(".post_footer_links").css({whiteSpace:"normal"});
  $("#posts .post_footer_links .tags").css({whiteSpace:"normal"});
}

function trigger(){
if (jlist.length != counter) {
counter = jlist.length;
tagformat();
} 
}

tagformat();
setInterval(trigger,1000);
}