// ==UserScript==
// @name          Facebook Slim Chat
// @description   By Daniel Desira, inspired by Jeremy Borg
// @version       1.0
// @match http://*.facebook.com/*
// ==/UserScript==

var sidebar = document.getElementsByClassName("fbChatSidebar")[0];
var dock = document.getElementsByClassName("fbDock")[0];
var stylesheet = document.createElement("link");

sidebar.addEventListener("mouseenter", function() {
    dock.classList.add("sidebar-activated");
});

sidebar.addEventListener("mouseleave", function() {
    dock.classList.remove("sidebar-activated");
});

stylesheet.rel = "stylesheet";
stylesheet.href = "http://dand.netne.net/libs/css/fb_chat_mods/mods.css";
document.head.appendChild(stylesheet);