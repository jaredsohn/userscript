// ==UserScript==
// @name           Bigger TextArea for Google Voice text messages
// @description    Bigger TextArea for Google Voice text messages
// @include        https://www.google.com/voice/*
// @include        http://www.google.com/voice/*
// ==/UserScript==

window.setTimeout(function() {
    var taskWidthPixels = 300;
    document.getElementById("textarea").setAttribute("style", "margin-right: "+taskWidthPixels+"px;");
    document.getElementById("textarea").setAttribute("style", "width: "+(taskWidthPixels-10)+"px;");
    document.getElementById("textarea").setAttribute("style", display:none");
}, 1500);