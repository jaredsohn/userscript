// ==UserScript==
// @name           YYG Ranks
// @namespace      T-Dub
// @description    Adds ranks to the YYG forums.
// @include        http://forums.yoyogames.com/forums/*/topics/*
// @include        http://www.forums.yoyogames.com/forums/*/topics/*
// @include        http://forums.yoyogames.com/topics/*
// @include        http://www.forums.yoyogames.com/topics/*
// ==/UserScript==

var i = 0;
var y = 0;
var newDivs=new Array();
var newSpans=new Array();
var divs = document.getElementsByTagName("div");
var divNumber = divs.length;
var spans = document.getElementsByTagName("span");
var spanNumber = spans.length;

function getRank(posts) {
  if (posts >= 5000) {
    return "Forum Ninja";
  }
  if (posts >= 2500) {
    return "Grand Master";
  }
  if (posts >= 1500) {
    return "Master";
  }
  if (posts >= 1000) {
    return "Pro Member";
  }
  if (posts >= 500) {
    return "Good Member";
  }
  if (posts >= 250) {
    return "Getting There";
  }
  if (posts >= 100) {
    return "Amateur";
  }
  if (posts >= 50) {
    return "Novice";
  }
  if (posts >= 0) {
    return "Newbie";
  }
}

while (i < spanNumber) {
  if (spans[i].className == "posts") {
    newSpans[y] = spans[i];
    y++;
  }
  i++;
}


i = 0;
y = 0;

while (i < divNumber) {
  if (divs[i].className == "post-author") {
    divs[i].innerHTML = divs[i].innerHTML + "<span class=\"posts\">" + getRank(parseInt(newSpans[y].innerHTML)) + "</span>";
    y++;
  }
  i++;
}