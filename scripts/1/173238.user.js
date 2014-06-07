// ==UserScript==
// @name           Last.fm Musical Compatibility in Percents
// @namespace      lfmpercents
// @description    Shows the percentage of your musical compatibility with any user next to the visual bar.
// @include        http://www.last.fm/user/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$(document).ready(function() {
    function getElementsByClass(searchClass, domNode, tagName) { 
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " "+searchClass+" ";
    for(i=0,j=0; i<tags.length; i++) { 
    var test = " " + tags[i].className + " ";
    if (test.indexOf(tcl) != -1) 
    el[j++] = tags[i];
    } 
    return el;
    }
    
    var c = getElementsByClass("bar");
    c = c[0].innerHTML.replace(/(\n|\s|\t)*/g, "").split("width:");
    c = c[1].split("%");
    c = c[0];
    
    var o = getElementsByClass("reading");
    o[0].innerHTML = o[0].innerHTML + " (" + c + "%)";
});
