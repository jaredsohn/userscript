// ==UserScript==
// @name           Furaffinity Slideshow
// @namespace      FA_DOT_NET
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// ==/UserScript==

function getElementsByClassName(classname, node) {
if(!node) node = document.getElementsByTagName("body")[0];
var a = [];
var re = new RegExp('\\b' + classname + '\\b');
var els = node.getElementsByTagName("*");
for(var i=0,j=els.length; i<j; i++)
if(re.test(els[i].className))a.push(els[i]);
return a;
}

link = getElementsByClassName('prev');
//link = getElementsByClassName('next');
setTimeout(function(){
	window.location = link;
}, 5000);