// ==UserScript==
// @name           facebook shifter
// @description	   installing this was your first mistake today
// @namespace      http://userscripts.org/users/yairraz
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*

function rotateIt()
{
var myRandDegs = (Math.floor(Math.random()*21) - 10) / 10;
var maindiv = document.getElementById("content");
maindiv.style["MozTransform"] = "rotate(" + myRandDegs + "deg)";
maindiv.style["WebkitTransform"] = "rotate(" + myRandDegs + "deg)";
}
//the fun never ends
setInterval(rotateIt,10000);
// ==/UserScript==