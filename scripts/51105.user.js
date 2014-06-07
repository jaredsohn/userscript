// ==UserScript==
// @name           Kongregate Ad Shifter
// @namespace      http://www.kongregate.com
// @description    Moves the ad that appears after the first post on a forum topic to the area below the site navigation. A script by MrSpontaneous
// @include        http://www.kongregate.com/forums/*/topics/*
// @author         MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous)
// ==/UserScript==

d = document.createElement("div");
ad = document.getElementsByClassName("horizontal_ad")[0];
feat = document.getElementById("feature");
ad.parentNode.parentNode.previousSibling.previousSibling.parentNode.removeChild(ad.parentNode.parentNode.previousSibling.previousSibling);
ad.parentNode.parentNode.nextSibling.nextSibling.parentNode.removeChild(ad.parentNode.parentNode.nextSibling.nextSibling);
ad.style.margin = "0 auto";
d.appendChild(ad);
feat.parentNode.insertBefore(d,feat);