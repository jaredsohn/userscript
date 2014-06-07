// ==UserScript==
// @name           Reddit Karma Hider
// @namespace      Daniel2910
// @description    Hides karma scores until you vote on them.
// @include        http://reddit.com/*
// @include        https://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// ==/UserScript==

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var elements = new Array();
elements = getElementsByClassName('score unvoted');
for(i in elements ){
     elements[i].style.display = "none";
}