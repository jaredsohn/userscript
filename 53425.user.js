// ==UserScript==

// @name          CNBeta AdMover
// @version       1.0
// @description Move cnbeta.com Ad
// @author        liyang
// @namespace liyangdal[=_AT_=]hotmail.com
// @include       http://cnbeta.com/*

// @include       http://www.cnbeta.com/*
// @include       http://*.cnbeta.com/*

// ==/UserScript==



(
function(){
    var names = ["userInfo","fm_r","votes","votes","votes","votes","votes","votes","votes","votes","google_ads_frame2","google_ads_frame1"];
    var divk;
    for(var i in names){
        divk = document.getElementById(names[i]);
        if(divk){
            divk.parentNode.removeChild(divk);
        }
    }
    var doms;
    divk = document.getElementById("logo");
    doms = divk.getElementsByTagName("iframe");
    doms[0].parentNode.removeChild(doms[0]);

    divk = document.getElementById("newsBox");
    doms = divk.getElementsByTagName("div");
    doms=doms[0].getElementsByTagName("a");
    doms[doms.length-1].parentNode.removeChild(doms[doms.length-1]);

    divk = document.getElementById("feedback");
    doms = divk.getElementsByTagName("center"); 
    doms[2].parentNode.removeChild(doms[2]);
    doms[1].parentNode.removeChild(doms[1]);

 
}
)();