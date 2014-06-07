// ==UserScript==
// @name      Download BBC iplayer videos
// @namespace rambl3xiplayer
// @description Download BBC iplayer videos using iplayer-dl
// @version 0.1
// @date 2009-03-30
// @creater rambl3x
// @include http://*.bbc.co.uk/iplayer/episode/*
// ==/UserScript==
var IPHONE_URL = "http://www.bbc.co.uk/mobile/iplayer/index.html";
var SELECTOR_URL   = 'http://www.bbc.co.uk/mediaselector/3/auth/iplayer_streaming_http_mp4/'
var QT_UA      = 'Apple iPhone v1.1.4 CoreMedia v1.0.0.4A102'

function real_stream_location()
{
    //request_iphone_page();
    var r = Math.floor(Math.random()* 10000000);
    var selector = "http://www.bbc.co.uk/mediaselector/3/auth/"
                    + "iplayer_streaming_http_mp4/b00jmdg0?" + r;
    GM_xmlhttpRequest({
        method: 'GET',
        url: selector,
        headers:{
            'User-Agent': QT_UA,
            'Pragma': 'no-cache',
            'Accept': '*/*',
            'Range': 'bytes=0-1',
            'Accept-Language': 'en',
            'Connection': 'keep-alive'
        },
        onreadystatechange:function(details) { 
            if (details.status == 302)
                alert("Found!");
            alert(details.status + details.statusText);
            alert(details.responseHeaders);
        }
    });
//    var req = new XMLHttpRequest();
//    if (!req) {
//        alert("Could not create XMLHttpRequest()");
//        return;
//    }
//    req.onreadystatechange = function (evt) {
//        dump(req.status + req.statusText + req.responseText + "\n");
//        dump("Location: " + req.getAllResponseHeaders());
//        return req.getResponseHeader('location');
//    };
//    req.open("GET", selector, true);
//    req.setRequestHeader('User-Agent', QT_UA);
//    req.setRequestHeader('Pragma', 'no-cache');
//    req.setRequestHeader('Accept', '*/*');
//    req.setRequestHeader('Range', 'bytes=0-1');
//    req.setRequestHeader('Accept-Language', 'en');
//    req.setRequestHeader('Connection', 'keep-alive');
//    req.send(null);
}

function download()
{
    real_stream_location();
}

var downloadLink = document.createElement('a');
downloadLink.setAttribute('href', '#');
downloadLink.addEventListener("click", download, true);
downloadLink.innerHTML = "Download";

var downloadBtn = document.createElement('p');
downloadBtn.setAttribute('class', 'video-quality');
downloadBtn.appendChild(downloadLink);

var playerDiv = document.getElementById('bip-play-head');
playerDiv.appendChild(downloadBtn);
