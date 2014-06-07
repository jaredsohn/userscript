// ==UserScript==
// @name        Keyboard Navigator for crayonpop.com
// @description J: next K: previous
// @namespace   http://userscripts.org/users/526949
// @include     http://crayonpop.com/*
// @grant       none
// @version     1.02
// ==/UserScript==

var prevUrl;
var nextUrl;
var prevPageUrl;
var nextPageUrl;
var c = document.getElementsByClassName("pagination")[0].getElementsByTagName("strong")[0];
var p = c; do {p = p.previousSibling;} while (p && p.nodeType != 1);
if (p.tagName == "A" && p.className == "") {
    prevPageUrl = p.href;
}
var p = c; do {p = p.nextSibling;} while (p && p.nodeType != 1);
if (p.tagName == "A" && p.className == "") {
    nextPageUrl = p.href;
}

var elements = document.getElementById("board_list").getElementsByTagName("tr");
//console.log("elements.length: %d", elements.length);
var firstNo = -1;
var markerFound = false;
for (var i = 0; i < elements.length; i++) {
    //console.log("i: %d", i);
    var td = elements[i].getElementsByClassName("no");
    //console.log("td: " + td);
    //console.log("td.length: %d", td.length);
    if (td.length > 0) {
        //console.log("td[0].textContent: %s", td[0].textContent);
        //console.log("td[0].textContent.indexOf(»): %d", td[0].textContent.indexOf("»"));
        if (firstNo == -1) firstNo = i;
        if (td[0].textContent.indexOf("»") != -1) {
            markerFound = true;
            var prev = i - 1;
            var next = i + 1;            
            //console.log("prev: %d", prev);
            //console.log("next: %d", next);
            
            if (i > firstNo) {
                prevUrl = elements[prev].getElementsByClassName("title")[0].getElementsByTagName("a")[0].href;
            } else {
                prevUrl = prevPageUrl;
            } 
            if (i < elements.length - 1) {
                nextUrl = elements[next].getElementsByClassName("title")[0].getElementsByTagName("a")[0].href;
            } else {
                nextUrl = nextPageUrl;
            }
            break;
        }
    }
}
if (!markerFound) {
    nextUrl = elements[firstNo].getElementsByClassName("title")[0].getElementsByTagName("a")[0].href;
    prevUrl = elements[elements.length - 1].getElementsByClassName("title")[0].getElementsByTagName("a")[0].href;
}
//console.log("prevUrl: %s", prevUrl);
//console.log("nextUrl: %s", nextUrl);

function goNext() {
    if (typeof nextUrl != "undefined") {
        window.location = nextUrl;
    }
}

function goPrev() {
    if (typeof prevUrl != "undefined") {
        window.location = prevUrl;
    }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 74: // j
            goNext();
            break;
        case 75: // k
            goPrev();
            break;
    }
}
;