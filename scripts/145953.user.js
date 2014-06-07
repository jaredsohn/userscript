// ==UserScript==
// @name        Google Search Fix Links
// @namespace   matthewn4444
// @description Does not allow Google to track or redirect your search links.
// @include     http://www.google.*
// @include     https://www.google.*
// @version     1.1
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/145953.user.js
// ==/UserScript==

if(!window||!document||!document.body||self!==top||document.body.id!=="gsr")return;
//if(!console||!console.log){console={};console.log=function(){}}

function byId(el){return document.getElementById(el)};
function css(el, property) {
    if(!el)return null;
    return window.getComputedStyle(el,null).getPropertyValue(property);
}

function fixLinks(e) {
    // Opacity is for clicking the next/previous/number on the bottom
    var opacity = css(byId("flyr"), "opacity") || "1";
    if (opacity === "1") {
        var rso = byId('rso');
        if (rso) {
            var els = rso.getElementsByTagName("a");
            for (var i = 0; i < els.length; i++) {
                els[i].removeAttribute("onmousedown");            
            }
            rso.id = "applied";
        } else if (byId('applied')) {
            detach();
        }
    }
}
function attach() {   
    var main = byId('main');
    if (!main.mouseoverEvent) {
        byId('main').addEventListener('mouseover', fixLinks, false);
        main.mouseoverEvent = true;
    }
}
function detach() { 
    var main = byId('main');
    if (main.mouseoverEvent) {
        byId('main').removeEventListener('mouseover', fixLinks, false);
        delete main.mouseoverEvent;
    }
}

// Load for back history to google search
window.addEventListener("load", function(){
    window.removeEventListener('load', arguments.callee, false);
    window.onhashchange = attach;
}, false);
// This is for hitting the search page directly
if (window.location.hash || window.location.href.indexOf("?")>=0) {
    attach();
}