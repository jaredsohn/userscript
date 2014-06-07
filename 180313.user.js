// ==UserScript==
// @name        Baidu Go
// @namespace   http://userstyles.org
// @description 在百度搜索结果页添加谷歌搜索 Add Google search for Baidu
// @include     http://www.baidu.com/s*
// @include     http://www.baidu.com/baidu*
// @version     1.1
// @author      skyline75489(skyline75489@outlook.com)
// @grant       none
// ==/UserScript==
/*

*/
var bkw = document.getElementById('kw');
var bsc = bkw.getAttribute("value");
var bsearch=document.getElementById('su');
var form = bsearch.parentNode.parentNode; 
if(bsearch) {

    var gs = document.createElement('span');
    var searchLink = '<a href="https://www.google.com.hk/#newwindow=1&q=' + bsc + '&safe=strict" target="_blank" rel="nofollow">'
    +'<img width="100px" height="40px" src="http://www.iniciomendoza.com.ar/web_images/744px-google_logo.svg.png"/></a>';


    gs.innerHTML= searchLink;
    form.insertBefore(gs,bsearch.parentNode.nextSibling);
}