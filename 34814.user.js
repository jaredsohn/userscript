// ==UserScript==
// @name          Correct Title
// @namespace     http://maltekraus.ma.funpic.de/Firefox/
// @description   Korrigiert den Titel von PHPBB-Foren ohne Thread im Titel
// @version       2.0
// @include       http://www.firefox-browser.de/forum/*
// @include       http://www.heise.de/newsticker/*
// @include       http://www.iphpbb.com/board/*
// @include       http://www.mybbq.net/forum/*
// ==/UserScript==
// Made by Malte Kraus, firefox [ad] maltekraus [dot] de

var dividers = [" :: ", " - "]; // you may want to change this to fit your needs

var title = document.title;
var parts = [];

var i = dividers.length;
while(i--) {
  if(title.indexOf(dividers[i]) != - 1) {
    parts.push(title.substr(0, title.indexOf(dividers[i])));
    title = title.substr(title.indexOf(dividers[i]) + dividers[i].length);
  }
}

parts.push(title);

var threadTitle = document.getElementsByClassName("maintitle");
if(threadTitle.length) {
  threadTitle = threadTitle[threadTitle.length - 1].textContent;
  if(document.title.indexOf(threadTitle) == -1)
    parts.push(threadTitle);
}

parts.reverse();
for(var i = 1, title = parts[0]; i < parts.length; i++) {
  title = title + dividers[i - 1] + parts[i];
}

document.title = title;

// include topic title on phpbb reply pages
if(location.href.indexOf("posting.php?mode=topicreview") != -1) {
  parent.document.title = parts[0] + dividers[1] + parent.document.title;
}