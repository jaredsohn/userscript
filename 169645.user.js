// ==UserScript==
// @name       OCZ AD Removal
// @namespace  http://www.overclockzone.com/forums/
// @version    1.02
// @description  remove ads
// @match      http://www.overclockzone.com/forums/*
// @run-at document-start
// @copyright  2012+, You
// ==/UserScript==
var intervalCode = setInterval(clrAds, 500);
function clrAds(){
    var e1 = document.getElementById("sidebar_container");    
    var e2 = document.getElementById("ad_global_below_navbar");
    if(e1 && e2){
        clearInterval(intervalCode);
        e1.parentNode.removeChild(e1);   
        e2.parentNode.removeChild(e2);  
    }
    document.getElementById("content").style.marginRight = "0";
}
