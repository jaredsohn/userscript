// ==UserScript==
// @name        tumblr_no2numbernames
// @namespace   no2numbernames
// @description removes all posts from members with at least two following numbers in their names from tumblr
// @include     http://www.tumblr.com/tagged/*
// @version     1
// @author      Dediggefedde
// ==/UserScript==

setInterval(function(){
var list=document.getElementsByTagName("a");
for(var i=0;i<list.length;i++)
    if(list[i].href.search(/\d\d.*?\.tumblr\.com/)>-1){
        list[i].parentNode.parentNode.parentNode.parentNode.removeChild(list[i].parentNode.parentNode.parentNode);
        console.log(list[i].href);
    }
},5000);