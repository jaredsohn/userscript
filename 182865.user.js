// ==UserScript==
// @name Doge Theme
// @author Z61
// @homepage http://z61.org
// @namespace blarg
// @match http://www.se7ensins.com/*
// @version 1.0
// ==/UserScript==
var s = document.getElementById("logo");
var t = s.getElementsByTagName("img");
t[0].src = "http://i.imgur.com/S5sO9db.png";