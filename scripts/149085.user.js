// ==UserScript==
// @name           CSDN Popup Window Cleaner
// @namespace      http://twitter.com/minjun
// @include        http://*.csdn.net/*
// ==/UserScript==
var popup_window = document.getElementById("_popup_msg_container")
popup_window.style.visibility = "hidden"