// ==UserScript==
// @name           Zippytune auto-download
// @description    Automaticaly downloads, when clicking on "Get Track"
// @include        *zippytune.com/play/*
// @version        1.0
// ==/UserScript==


setTimeout(function() {
    var str = document.getElementById("displayText").getAttribute("onclick");
    var res = str.match(/h[^\s]*[0-9]/g);
    window.location.href = res;
},2000);