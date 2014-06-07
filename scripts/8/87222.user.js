// ==UserScript==
// @name          Youtube HD
// @namespace     http://userscripts.org/scripts/show/87222
// @description   Force Youtube to HD
// @version       1.10
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/87222.user.js
// @updateURL     https://userscripts.org/scripts/source/87222.meta.js
// @icon          data:image/png;base64,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
// @match         http://youtube.com/*
// @match         https://youtube.com/*
// @match         http://*.youtube.com/*
// @match         https://*.youtube.com/*
// ==/UserScript==

//Settings Start
var bHref = true;   // Redirect Youtube page if not HD
var bLinks = true;  // Make all links point to HD
//Settings End

var reWatch = new RegExp("youtube\\.com\/watch\\?v=([a-zA-Z0-9-_]+)(.*)");    // Regex to match video id
var reHD = new RegExp("&hd=1");                                               // Regex to match hd string

// Redirect Youtube page if not HD
if(bHref) {
    var strHref = window.location.href;
    var reMatch = reWatch.exec(strHref);
    if (reMatch) {
        if (!strHref.match(reHD)) {			
            if(window.content && window.content.location) {
                window.content.location.replace(formatUrl(reMatch[1], reMatch[2]));
            } else {
                window.location.replace(formatUrl(reMatch[1], reMatch[2]));
            }
        }
    }
}

// Make all links point to HD
if(bLinks) {
    var strLinks = document.getElementsByTagName('a');
    for (i = 0; i < strLinks.length; i++) {
        var reMatch = reWatch.exec(strLinks[i].href);
        if (reMatch) {
            if (!strLinks[i].href.match(reHD)) {
                strLinks[i].href = formatUrl(reMatch[1], reMatch[2]);
            }
        }
    }
}

function formatUrl(v,p) {
    var url;
    if (location.protocol === 'https:') {
        url = "https://";
    } else {
        url = "http://";
    }
    url += location.host;
    url += "/watch?v=" + v + "&hd=1" + p;
    return url;
}