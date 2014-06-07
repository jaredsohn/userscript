// ==UserScript==
// @name        QR This!
// @namespace   http://0-oo.net/
// @description Show a 2D bar code of the url of the page that you see.
// @homepage    http://0-oo.net/sbox/greasemonkey/qr-this-greasemonkey
// @version     0.2.2
// @include     http://*
// @include     https://*
// ==/UserScript==
//
// ( The MIT License )
//
(function(){
    var api = "http://chart.apis.google.com/chart?cht=qr&chs=120x120&chl=";
    
    var caption = "";
    var url = document.URL;
    
    //Search "Mobile Link Discovery"
    var links = document.getElementsByTagName("link");
    for (var i = 0, len = links.length; i < len; i++) {
        var link = links[i];
        if (link.rel == "alternate" && link.media == "handheld") {
            caption = "Mobile Link<br />"
            url = link.href;
            break;
        }
    }
    
    var qr = document.createElement("img");
    qr.src = api + encodeURIComponent(url);
    
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.right = 0;
    div.style.bottom = 0;
    div.style.MozOpacity = 0.75;
    div.style.zIndex = 100;
    
    if (caption) {
        div.innerHTML = caption;
    }
    div.appendChild(qr);
    document.body.appendChild(div);
})();
