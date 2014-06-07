// ==UserScript==
// @name        Youtube Center
// @namespace   Youtube Center
// @description Youtube Center
// @grant       none
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.0.2
// ==/UserScript==
if(document.getElementById("yt-masthead")){
    var header = document.getElementById("yt-masthead");
    if (header != null)
    {
        header.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
    }
}

if(document.getElementById("page")){
    var className=document.getElementById("page").getAttribute("class");
     if (className=="  watch   clearfix"){
        var watch = document.getElementById("page");
        watch.setAttribute("style","max-width: 1300px; margin: 0 auto !important;");
     }
     else{
        var home = document.getElementById("page");
        home.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
     }
}
if(document.getElementById("baseDiv")){
    var baseDiv = document.getElementById("baseDiv");
    baseDiv.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
}
if(document.getElementById("masthead-subnav")){
    var masthead_subnav = document.getElementById("masthead-subnav");
    masthead_subnav.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
}
if(document.getElementById("footer-hh")){
    var footer = document.getElementById("footer-hh");
    footer.setAttribute("style","max-width: 650px; margin: 0 auto !important;");
}
if(document.getElementById("footer")){
    var footer = document.getElementById("footer");
    footer.setAttribute("style","max-width: 650px; margin: 0 auto !important;");
}