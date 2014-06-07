// ==UserScript==
// @name          Google Plus Header Hider
// @namespace     http://com.gmail.shintok/greasemonkey
// @description   Hides google plus header
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://*.google.co.jp/*
// @include       https://*.google.co.jp/*
// ==/UserScript==

(function() {
    GM_log("init");
    var initHeight = 30;
    var hide = 23;

    var gb = document.getElementById("gb");

    var showbar =   function(){ 
        GM_log("mouseout");
        gb.style.position = "static";
        gb.style.height = "0px";
        gb.style.top ="0px";
    };

    var hidebar = function() { 
        GM_log("mouseover");
        gb.style.position = "relative";
        gb.style.height = "0px";
        gb.style.top = -hide + "px";
    };

    hidebar();

    gb.addEventListener(
      "mouseover",
      showbar,
      false);

    gb.addEventListener(
      "mouseout",
      hidebar,
      false);
}) ();

