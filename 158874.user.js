// ==UserScript==
// @name           R.L. Sourceror
// @namespace      http://beeswax.noneofyours.inc
// @description    Removes AdFly linkification of URLs and click restrictions on nfo.rlssource.net
// @version        0.1
// @match          *://*.rlssource.net/*
// ==/UserScript==


// RlsSource has buried a function deep in its jQuery file that
// attempts to rewrite outgoing hyperlinks to maintain the 
// http://adf.ly/http://www.some.url format. Here we overwrite
// that function.

onmousemove=function adfly(){return false;}

var RlsLink = function(){
var allLinks = document.getElementsByTagName('a');
 

// For links with the form http://adf.ly/http://www.some.url,
// check if there exists an 'http:' at some offset greater 
// than 0, if so, remove the part of the string before that 
// substring.

for(var i=0; i < allLinks.length; i++) {
        var off = allLinks[i].href.substr(5).indexOf('http:');
        if (off >= 0) {
                var fragment;
                fragment = allLinks[i].href.substr(5).substr(off);
               	allLinks[i].href = fragment;
                allLinks[i].rel='noreferrer'}
        }

// 'onmousedown','onselectstart', and 'oncontextmenu' are disabled
// via a most trivial trick ('onmousedown'=function(){return false;})
// in the top-level <html> object. Since I don't know a more direct
// way to address it, I'm searching in all of the top-level objects
// for those attributes and removing them.

for(var i=0; i<document.childNodes.length;i++) {
        if (document.childNodes[i].hasAttributes('onmousedown')){
            document.childNodes[i].removeAttribute('onmousedown')}
        if (document.childNodes[i].hasAttributes('onselectstart')){
            document.childNodes[i].removeAttribute('onselectstart')}
        if (document.childNodes[i].hasAttributes('oncontextmenu')){
            document.childNodes[i].removeAttribute('oncontextmenu')}
    }
}

document.body.appendChild(document.createElement("script")).innerHTML = "("+RlsLink+")()";

document.addEventListener("DOMNodeInserted", RlsLink, false);