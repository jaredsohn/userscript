// ==UserScript==
// @name        OpenSubtitles Direct download link
// @namespace   OpenSubtitles.org
// @description OpenSubtitles skip the download button and the ad-server page to download through the search results
// @include     http://www.opensubtitles.org/*
// @icon		
// @author		dmachop
// @version     0.2
// @grant       none
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
var URL = document.URL;
var patt = /\b(sublanguageid-)([a-z]{3})\b/i;
var captGroup = patt.exec(URL);
if(captGroup[2] != "eng")
{
    var result = URL.replace(patt,"$1"+"eng");
    window.location.href = result;
}
for (var i = 0, dl; dl = anchors[i]; i++) {
    var href = dl.href;
    if(href.indexOf("/subtitles/") != -1)
    {
        res = href.split("/");
        final = "http://dl.opensubtitles.org/" + res[3] + "/download/sub/" + res[5];
        dl.href = final;
    }
}