// ==UserScript==
// @name          AllOfMp3 Download Helper
// @namespace     http://AkuAku.org/greasemonkey
// @description	  Makes downloading from AllOfMp3 a little easier by providing cut-n-paste wget commands
// @include       http://account.allofmp3.com/downloads_iframe.shtml*
// ==/UserScript==
// author: Dav Yaginuma
// version 1.0

window.addEventListener("load", function(e) {
    var links = document.getElementsByTagName('a');
    var urls = '<pre>\n';

    for (var i=0; i<links.length; i++) {
        if (links[i].getAttribute('title')=='Right-Click to download the track') {
            urls += ('wget '+links[i].getAttribute('href')+'</br>\n');
        }
    }
    urls += '</pre>\n';

    var target = document.getElementById("ac-t");
    var innerHTML = target.innerHTML;
    target.innerHTML = urls + innerHTML;
}, false);
