// ==UserScript==
// @name           Use Ogg Theora on Linux Foundation video site
// @namespace      the
// @description    Replaces the Flash-based video player with a HTML5 video tag referring to the Ogg Theora version of the video. Works great if you have Firefox^WShiretoko 3.1 and are a free software maniac.
// @include        http://video.linuxfoundation.org/video/*
// ==/UserScript==

function getElementsByClassName(classname) {
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = document.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var video = document.createElement("video");
var div = getElementsByClassName("filefield\\-file clear-block")[1];
var url = div.childNodes[2].getAttribute("href");
var embed=document.getElementsByTagName("embed")[0];
video.setAttribute("src", url);
alert(video);
alert(embed);
embed.parentNode.replaceChild(video, embed);
