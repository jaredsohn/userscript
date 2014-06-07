// ==UserScript==
// @name           Google Calendar Task Resize
// @namespace      http://albertyw.mit.edu/
// @description    Make the Google Calendar Tasks Larger
// @include        https://www.google.com/calendar/*
// @include        http://www.google.com/calendar/*
// ==/UserScript==

window.setTimeout(function() {
    var taskWidthPixels = 300;
    document.getElementById("maincell").setAttribute("style", "margin-right: "+taskWidthPixels+"px;");
    document.getElementById("gadgetcell").setAttribute("style", "width: "+(taskWidthPixels-10)+"px;");
    document.getElementById("rhstogglecell").setAttribute("style", "display:none");
}, 1500);