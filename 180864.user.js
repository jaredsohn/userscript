// ==UserScript==
// @name        De-Upworthy Videos
// @namespace   http://inspiracy.eu
// @description Automatically forwards you to YouTube from an Upworthy embedded video
// @include     *://*.upworthy.com/*
// @version     0.2
// @grant       none
// ==/UserScript==

DeUpworthyVideo = function (){
    re = /(youtube|vimeo)/;
    a  = document.querySelectorAll('iframe');
    for (ii=0; ii<a.length; ii++) {
        url = a[ii].getAttribute('src');
        console.log('found: '+url);
        if (match = url.match(re)) {
            site = match[0];
            console.log('Found '+site+' "'+url+'" link in Upworthy page, forwarding ...');
            window.location = url;
        }
    }
}

window.addEventListener('load',DeUpworthyVideo, false);
document.addEventListener("DOMNodeInserted", DeUpworthyVideo, false);