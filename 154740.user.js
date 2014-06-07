// ==UserScript==
// @name           fancy youtube
// @namespace      fancy.youtube
// @description    makes youtube fancy as hell souce by mod player original script Cooler Youtube http://userscripts.org/scripts/show/153758
// @author         lokke 
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @version        0.83.01
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @include        http://*.youtube.de/*
// @include        https://*.youtube.de/*

// ==/UserScript==
var all_button = null;
var bar = null;
var guide = null;
var right_side = null;
var guide_subs = null;
var manage = null;
var page = null;
var content = null;
var div_subs = null;
var menu = null;
(function () {
    "use strict";
    if (window.location.pathname === "/" && window.location.search.length === 0) {
        window.location.pathname = "/feed/subscriptions/u";
        return;
    }
    if (window.location.pathname === "/feed/subscriptions" && window.location.search.length === 0) {
        window.location.pathname = "/feed/subscriptions/u";
        return;
    }
    if (/^\/feed\/[^\/]+\/?$/.test(window.location.pathname) && window.location.search.length === 0) {
        window.location.pathname = window.location.pathname + "/u";
        return;
    }
    $('a.guide-item[href="/"]').attr("href", "/?default");
    $('a[href="/"]').attr("href", "/feed/subscriptions/u");
    all_button = $("#channel-navigation-menu a").attr("href");
    if (all_button.size() > 0) {
        if (!/\/u$/.test(all_button)) {
            all_button.attr("href", all_button + "?default");
        }
    }
    $('a[href="/feed/subscriptions"]').attr("href", "/feed/subscriptions/u");
});
$(document).ready(function () {
    "use strict";
    $("body").removeClass("site-left-aligned");
    $("body").removeClass("site-center-aligned");
    if ($("#yt-masthead-signin").length === 0) {
        if (location.pathname === "/") {
            window.location = "/feed/subscriptions/u";
        } else {
            $("#logo-container").attr("href", "/feed/subscriptions/u");
        }
    }
});
$("#footer-hh-container").remove();
content = document.getElementById("body-container");
content.style.marginTop = "50px";
bar = document.getElementById("yt-masthead-container");
bar.style.position = "fixed";
bar.style.zIndex = "999";
bar.style.width = "100%";
bar.style.boxShadow = "3px 0px 3px rgba(30, 30, 30, 0.3)";
bar.style.top = "0px";
menu = document.getElementById("masthead-expanded");
menu.style.position = "fixed";
menu.style.zIndex = "999";
menu.style.width = "100%";
menu.style.boxShadow = "6px 0px 6px rgba(30, 30, 100, 0.6)";
menu.style.top = "50px";
if (location.pathname === "/watch") {
    GM_addStyle('body{background: url("http://www.desktopwallpaperhd.net/wallpapers/7/0/wallpaper-woode-texture-beautifull-desktop-simple-apple-defruwallpaper-wooden-72816.jpg")#222222 fixed repeat left top!important; color:#ffffff !important; } #watch7-sidebar{background-color: white;}.watch-medium #watch7-player{height:559px !important; width:945px !important;}#watch7-main{background-color: white;}#watch7-user-header{margin-top:20px;}#watch7-sidebar .watch-sidebar-section{margin-top:12px;}');
    GM_addStyle("#guide-container{background-color:#272727;} .sidebar-collapsed #watch7-video, .sidebar-collapsed #watch7-main, .sidebar-collapsed .watch7-playlist{left: 29px; width: 945px;}");
    $("yt-uix-clickcard-card1").remove();
    guide = document.getElementById("guide-container");
    guide.style.position = "fixed";
    guide.style.boxShadow = "3px 0px 3px rgba(30, 30, 30, 0.3)";
    guide.style.top = "50px";
    guide.style.left = "52px";
    content.style.marginTop = "35px";
    GM_addStyle(".video-extras-sparkbar-dislikes {background: #ca2d24 !important }");
} else {
    $('#feed-marker').remove();
    GM_addStyle('body{background: url("http://www.desktopwallpaperhd.net/wallpapers/7/0/wallpaper-woode-texture-beautifull-desktop-simple-apple-defruwallpaper-wooden-72816.jpg")#222222 fixed repeat left top!important; color:#ffffff !important; } #watch7-user-header{margin-top:20px;}');
    right_side = $(".branded-page-related-channels");
    guide_subs = $("#guide-subscriptions-section");
    manage = $("#gh-management").detach();
    right_side.filter(":gt(0)").remove();
    right_side.empty();
    guide_subs.before(manage);
    guide_subs.children("h3").remove();
    div_subs = $("<div></div>");
    div_subs.attr("id", guide_subs.attr("id"));
    div_subs.attr("class", guide_subs.attr("class"));
    div_subs.append(guide_subs.children().detach());
    div_subs.find("#guide-channels").removeClass("yt-uix-scroller").css("max-height", "none");
    div_subs.find("a.guide-item > .guide-count").css("color", "#000000");
    div_subs.find("a.guide-item").each(function () {
        "use strict";
        this.href += "/u";
    });
    div_subs.find("hr").remove();
    div_subs.css("margin-top", "15px");
    right_side.append(div_subs);
    GM_addStyle("#guide{background-color:#272727;} ");
    guide = document.getElementById("guide");
    guide.style.position = "fixed";
    guide.style.boxShadow = "3px 0px 3px rgba(30, 30, 30, 0.3)";
    guide.style.top = "50px";
    guide.style.left = "183px";
    content.style.marginTop = "50px";
    document.getElementById("page") ? document.getElementById("page").style.width = "1003px" : "";
    $('#feed-marker').remove();
}