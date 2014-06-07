// ==UserScript==
// @name           FurAffinity Page Resizer
// @namespace      http://userscripts.org/users/208586
// @description    Shinks the page for larger displays
// @include        http://*furaffinity.net/*
// ==/UserScript==

// Version 1.0

var head=document.getElementsByTagName("head")[0],css;
var code="body{"+
            "max-width:1280px !important;"+
            "margin-left:auto;"+
            "margin-right:auto;"+
         "}";         

css=document.createElement('link');
css.type='text/css';
css.rel='stylesheet';
css.href='data:text/css,'+code;
css.media='screen';
head.appendChild(css);
  
//css=document.createElement('style');
//css.type='text/css';
//css.innerHTML=code;
//head.appendChild(css);