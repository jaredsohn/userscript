// ==UserScript==
// @name        Aptoide Download APK
// @namespace   http://localhost
// @include     http://*.store.aptoide.com/*
// @version     1.3
// @grant       none
// ==/UserScript==

var src = document.documentElement.innerHTML;
var loc = window.location.toString().slice(7);

if(!window.location.toString().match(/http:\/\/m\./)){
    window.location = "http://m." + loc;
}

var button = document.getElementsByClassName("app_install_button")[0];
var hrefs = button.href.toString().split('/');

var md5 = "-" + src.match(/md5sum = "[A-Za-z0-9]*/).toString().slice(10);
var file = "/" + hrefs[hrefs.length - 1].toString().slice(0, -6);
var folder = "/" + hrefs[hrefs.length - 2];
var domain = "http://pool.apk.aptoide.com";
var download = domain + folder + file + md5 + ".apk";

button.textContent = "Download";
button.href = download;