// ==UserScript==
// @name       wikia ads removal
// @version    0.1
// @description  remove ads from wikia.com
// @match      *wikia*
// ==/UserScript==
function wik_ad_r_jquery(callback){
var script = document.createElement("script");
script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
script.addEventListener('load', function(){
var script = document.createElement("script");
script.textContent = "window.wik_ad_r_jq=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.getElementsByTagName("head")[0].appendChild(script);
  }, false);
  document.getElementsByTagName("head")[0].appendChild(script);
}
function wik_ad_r_main(){
    wik_ad_r_jq("a:has(img[src*=\"ads/\"])").css("display", "none");
    wik_ad_r_jq("div:has(script:contains(\"AdEngine\")):not(:has("+
                "div:has(script:contains(\"AdEngine\")) ))").css("display", "none");
    wik_ad_r_jq("div:has(script:contains(\"BOXAD\")):not(:has("+
                "div:has(script:contains(\"BOXAD\")) ))").css("display", "none");
    wik_ad_r_jq(".wikia-ad").css("display", "none");
    wik_ad_r_jq("div:has(a:contains(\"our ad here\")):not(:has(div))").css("display", "none");
}
if(/\/\/(?:[\-0-9a-z]+\.)?wikia\.com\//i.test(document.location.href))
wik_ad_r_jquery(wik_ad_r_main);
