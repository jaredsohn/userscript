// ==UserScript==
// @name       kingsmanga ads removal
// @version    0.1
// @description  remove some ads from kingsmanga.net
// @match      *kingsmanga*
// ==/UserScript==
function kmg_ad_r_jquery(callback){
var script = document.createElement("script");
script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
script.addEventListener('load', function(){
var script = document.createElement("script");
script.textContent = "window.kmg_ad_r_jq=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.getElementsByTagName("head")[0].appendChild(script);
  }, false);
  document.getElementsByTagName("head")[0].appendChild(script);
}
function kmg_ad_r_main(){
  kmg_ad_r_jq("#advbar, #adsbar").css("display", "none");
  kmg_ad_r_jq("[src*=\"nipa.co\"]").css("display", "none");
  kmg_ad_r_jq("table:has([href*=\"yengo\"]):not(:has(table))").css("display", "none");
  kmg_ad_r_jq("div:has(script[src*=\"yengo\"]):not(:has(div:not(:has(script[src*=\"yengo\"])) ))").css("display", "none");
  kmg_ad_r_jq("[class*=\"facebook\"]").css("display", "none");
  kmg_ad_r_jq("div:has([value*=\"chatango\"], [src*=\"chatango\"]):not(:has(div))").css("display", "none");
}
if(/\/\/(?:[0-9a-z]+\.)?kingsmanga\.[0-9a-z]+\//i.test(document.location.href))
kmg_ad_r_jquery(kmg_ad_r_main);
