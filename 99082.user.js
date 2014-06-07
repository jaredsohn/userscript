// ==UserScript==
// @name          Bucknuts Script
// @namespace     http://www.ryanas.com/scripts
// @description   Remove banner ad from bucknuts forum.
// @include       http://ohiostate.247sports.com/*
// @include       http://www.bucknuts.com/*
// @version       1.0
// ==/UserScript==

var div = getElementsByClassName("ad728_blk")[0];
div.style.display = 'none';

var div = getElementsByClassName("sidebar")[0];
div.style.display = 'none';

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}