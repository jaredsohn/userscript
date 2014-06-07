// ==UserScript==
// @name       RedditBar
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://*reddit.com/r/*/comments/*
// @copyright  2011+, azenet
// ==/UserScript==

var up = parseInt(document.getElementsByClassName('upvotes')[0].getElementsByClassName('number')[0].innerHTML.replace(',',''));
var down = parseInt(document.getElementsByClassName('downvotes')[0].getElementsByClassName('number')[0].innerHTML.replace(',',''));

var total = up+down;
var upP = (up/total)*100;
var downP = (down/total)*100;
var bar = document.createElement('div');
bar.setAttribute('style','width:223px;height:15px;border:1px black solid;background-color:#a00;position:relative;');
bar.innerHTML = '<div style="background-color:#0a0;border-right:1px black solid;width:'+upP+'%">&nbsp;</div>';
document.getElementsByClassName('linkinfo')[0].appendChild(bar);