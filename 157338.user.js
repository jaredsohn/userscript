// ==UserScript==
// @name       Madyangyi's zhihu
// @namespace  myZhihu
// @version    0.1
// @description  for Madyangyi only
// @match      http://*.zhihu.com/*
// @copyright  Madyangyi
// ==/UserScript==

(function (){
    function gStyle(id){
        return document.getElementById(id).style;
    }
    gStyle("zg-top-nav").position="absolute";
    gStyle("zg-top-nav").right="120px";
    gStyle("zh-top-search-form").width="480px";
    
    
    
})()