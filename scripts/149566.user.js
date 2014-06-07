// ==UserScript==
// @name        Restore tumblr tags to sidebar
// @namespace   http://kimira.dreamwidth.org
// @description Quick fix to put tracked tags back in sidebar where they belong
// @include     http://www.tumblr.com/dashboard
// @include     http://www.tumblr.com/dashboard/*
// @include     http://www.tumblr.com/tagged/*
// @include     http://www.tumblr.com/blog/*
// @grant		none
// @version     1.11
// ==/UserScript==

var tagCode = document.getElementById("search_results_container").innerHTML;
var rightCol = document.getElementById("right_column").innerHTML;

tagCode = tagCode.slice(tagCode.indexOf("<div class=\"popover_menu"),tagCode.indexOf("<div class=\"popover_menu_item ender")-75);

tagCode = tagCode.replace(/div class="popover_menu_item tracked_tag /g,"li class=\"");
tagCode = tagCode.replace(/<a /g,"<a class=\"tag\" ");
tagCode = tagCode.replace(/<div class="thumb.*?div>/g,"");
tagCode = tagCode.replace(/<small.*?>/g,"<span class=\"count\">");
tagCode = tagCode.replace(/10 new posts/g,"10+");
tagCode = tagCode.replace(/ new p\w*/g,"");
tagCode = tagCode.replace(/small>/g,"span>");
tagCode = tagCode.replace(/#/g,"");
tagCode = tagCode.replace(/<div class="result">/g,"");
tagCode = tagCode.replace(/<\/div>/g,"");
tagCode = "<ul class=\"controls_section\">" + tagCode + "</li></ul>\n\n<div id=\"tumblr_radar";

rightCol = rightCol.replace("<div id=\"tumblr_radar",tagCode);

document.getElementById("right_column").innerHTML = rightCol;

var bullshit = document.getElementById("search_query").innerHTML;
bullshit = bullshit.replace(/placeholder="Search tags & blogs" /g,"placeholder=\"\" ");
document.getElementById("search_query").innerHTML = bullshit;