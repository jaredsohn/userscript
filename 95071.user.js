// ==UserScript==
// @name           SM3G OFF V3VO (webdizajneri.net)
// @namespace      www.webdizajneri.net
// @description    Hide V3VO branded page elements on Youtube
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @include        http://youtube.com/*
// @include        https://youtube.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle("#google_companion_ad_div {display: none; }");
AddStyle("#ticker {display: none; }");
AddStyle("#watch-branded-actions {display: none; }");
AddStyle("#watch-branded-w5 {height: 0px;}");
AddStyle("#eow-title {color: #333333;}");
AddStyle("#watch-headline-title {padding-top: 5px; padding-bottom: 5px; color: #333333;}");
AddStyle("#inline-block {color: #666666;}");
AddStyle("username.style.color {color: #ffffff;}");
AddStyle("#watch-username {padding: 5px; color: #ffffff; background-color: #333333;}");
AddStyle("#watch-sidebar {position: relative-x; position: relative-y;");
AddStyle("#watch-sidebar h4.first {padding-left: 5px; font-weight: bold; color: #ffffff; background-color: #333333;}");
AddStyle(".comments-section h4 {padding-left: 5px; font-weight: bold; color: #ffffff; background-color: #333333;}");
AddStyle(".comments-section-see-all {padding-right: 5px; font-weight: bold; color: #ffffff;}");
AddStyle("a:focus {outline-width: 0px; padding-left: 0px; padding-right: 0px; font-weight: bold; color: #333333; background-color: #efefef;}");
AddStyle(".comment a {outline-width: 0px; padding-left: 0px; padding-right: 0px; padding-top: 2px; padding-bottom: 2px; font-weight: bold; color: #d72424;}");
AddStyle(".video-list-item .title {outline-width: 0px; padding-left: 0px; padding-right: 0px; padding-top: 2px; padding-bottom: 2px; font-weight: bold; color: 

#d72424;}");
AddStyle("a.video-list-item-link:hover, .hover a.video-list-item-link {background-color: #efefef;}");
AddStyle("#watch-info .watch-expander-head:hover {background-color: #333333;}");
AddStyle("#watch-info .yt-uix-expander-collapsed .watch-expander-head:hover {background-color: #333333; border-top-color: #efefef; border-right-color: #efefef; 

border-bottom-color: #efefef; border-left-color: #efefef; }");
AddStyle(".yt-uix-pager .yt-uix-button {color: #d72424;}");
AddStyle("a {color: #d72424;}");

if (location.href.indexOf("watch") != -1) {
		AddStyle("#content {height: 0px;}");
    };
