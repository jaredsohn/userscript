// ==UserScript==
// @name           ynet shifter
// @description	   installing this was your first mistake today
// @namespace      http://userscripts.org/users/yairraz
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// @include        http://*.mynet.co.il/*
// @include        http://mynet.co.il/* 
function rotateIt()
{
var myRandDegs=Math.floor(Math.random()*11) - 5;
var maindiv = document.getElementById("mainSpacer")
maindiv.style["WebkitTransform"] = "rotate(" + myRandDegs + "deg)";
}
//the fun never ends
setInterval(rotateIt,10000);
// ==/UserScript==