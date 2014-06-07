// ==UserScript==
// @name        Apina.biz proper click to zoom
// @namespace   Rennex
// @description Click pictures to view ONLY the original-sized image
// @include     http://apina.biz/*
// @version     1
// @grant       none
// ==/UserScript==

// if we are in the image browsing mode, viewing a medium-sized image,
// this will find an element
var m, a = document.querySelector("#big_image a")
if (a) {
    if (m = a.href.match(/\/\d+[^\/]+$/)) {
        // fix the link to point directly to the image
        a.href = "http://termite.apcdn.com/full" + m[0]
        // and remove that annoying title popup while we're at it
        a.removeAttribute("title")
    }
    // also remove that ?ref=randoms bullshit from the address bar
    if (m = location.href.match(/apina\.biz\/(.+)\?ref=randoms/)) {
        history.replaceState(null, "", m[1])
    }
}
else if (m = location.href.match(/apina\.biz\/(\d+\.(jpg|gif|png))/)) {
    // we've somehow landed on the zoom-in page (from an external link?)
    // -> redirect to the picture
    location.replace("http://termite.apcdn.com/full/" + m[1])
}
