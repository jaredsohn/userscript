// ==UserScript==
// @name       Szilvásbukta.Com
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Lájkolós oldal képrejtős szkript
// @match      http://*.szilvasbukta.com/*
// @match      http://*.vattacukor.net/*
// @copyright  2013 AdSoft
// ==/UserScript==

function hideit(box)
{
 box.style.display = "none";
 box.style.left = -1000;
 box.style.position = "absolute"; 
}

document.getElementById("LikedPost").style.display = "block";
hideit(document.getElementById("box"));
hideit(document.getElementById("PostLikeBox"));