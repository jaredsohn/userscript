// ==UserScript==
// @name         ATV videótár helper
// @namespace    http://w3.enternet.hu/gerlits/scripts/
// @description  Adds a direct link to the video on the page
// @include      http://atv.hu/*
// @include      http://www.atv.hu/*
// ==/UserScript==

// version 0.2

var scripts = document.getElementsByTagName("script");

for (var i = 0; i < scripts.length; ++i) {
    var script = scripts[i];
    var m = script.innerHTML.match(/swfobject.embedSWF\("([^"]*)"/);
    if (m != null) {
        var link = m[1];
        var element = document.createElement("a");
        element.setAttribute("href", link);
        element.innerHTML = "Lejátszás egész ablakban";
        script.parentNode.appendChild(element);
    }
}

