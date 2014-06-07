// ==UserScript==
// @name Facebook TEST
// @namespace http://userstyles.org
// @description ???
// @author Topper
// @homepage
// @include http://facebook.com/*
// @include https://facebook.com/*
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = " body {background:#000000 url(http://www.wallcoo.com/film/2006_Silent_Hill_Wallpaper/wallpapers/1600x1200/Silent_Hill_Wallpaper_5.jpg) 50% 0% scroll!important;} /* 1 */ label { color:#33FF00 !important; }";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
})();