// ==UserScript==
// @name          Safari Code Un-Scroller
// @description   Full-height, no vertical scrollbars Safary books code examples
// @include       http://safari.oreilly.com/*
// @include       http://safari.informit.com/*
// ==/UserScript==


//alert("Safari Code Un-Scroller");


function safariBooksUnScroll()
{
    var els = document.getElementsByTagName("pre");
    
    //alert("Safari Code Un-Scroller: els.length: [" + els.length + "]");
    
    for (i = 0; i < els.length; i ++) {
        els[i].className = "";
    }
}


//window.addEventListener(
//    'load', 
//    safariBooksUnScroll,
//    false);

document.addEventListener(
    'DOMNodeInserted', 
    safariBooksUnScroll,
    false);
