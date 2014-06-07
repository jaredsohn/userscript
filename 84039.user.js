// ==UserScript==
// @name           eBuddy Messenger Cleaner
// @author         ziqiang li
// @namespace      messengerCleaner
// @description    Remove ads and set chat window fullscreen for ebuddy messenger
// @include        http://web.ebuddy.com/*
// ==/UserScript==

// remove footer
var container_home_notifications = document.getElementById("container-home-notifications");
if (container_home_notifications) {
    container_home_notifications.parentNode.removeChild(container_home_notifications);
}

// set chat window fullscreen
var container_app = document.getElementById("container-app");
if (container_app) {
    container_app.style.right = 0;
    container_app.style.border = "none";
}
document.body.className = "darksnowleopard";

// hide right banner
var iframe_banner = document.getElementById("banner");
if (iframe_banner) {
    iframe_banner.style.visibility = "hidden";
    iframe_banner.style.display = "none";
}
var container_banner = document.getElementById("container-banner");
if (container_banner) {
    container_banner.style.visibility = "hidden";
    container_banner.style.display = "none";
    container_banner.style.width = 0;
}