// ==UserScript==
// @name           Kwick-Style
// @namespace      Pitchshifter
// @include        http://www.kwick.de/*
// ==/UserScript==
var imgs = document.getElementsByTagName('img');
for(var i=0; i<imgs.length; ++i) {
// Add more here for more images
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/invisible_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/16i7rib1/invisible.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/online_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/f4e2lu9/available.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/invisible_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/16i7rib1/invisible.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/online_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/f4e2lu9/available.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/inactive_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/ah03duec/extendedaway.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/inactive_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/ah03duec/extendedaway.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/offline_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/q2oe3t52/offline.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/online/offline_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/q2oe3t52/offline.png";

if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/invisible_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/16i7rib1/invisible.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/online_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/f4e2lu9/available.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/invisible_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/16i7rib1/invisible.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/online_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/f4e2lu9/available.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/inactive_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/ah03duec/extendedaway.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/inactive_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/ah03duec/extendedaway.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/offline_m.gif") imgs[i].src = "http://img3.imagebanana.com/img/q2oe3t52/offline.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/ic/status/offline_f.gif") imgs[i].src = "http://img3.imagebanana.com/img/q2oe3t52/offline.png";
if(imgs[i].src == "http://85.236.204.66/i/set1/gfx/profile/profile_slider_02.jpg") imgs[i].src = "";
}