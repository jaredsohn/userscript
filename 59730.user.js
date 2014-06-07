// ==UserScript==
// @name           douban_simple
// @namespace      douban_simple
// @include        http://www.douban.com/*
// @include        https://www.douban.com/*
// @include        http://*.www.douban.com/
// @include        https://*.www.douban.com/
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var nav = document.getElementById('nav');
nav.className = 'clearfix';



addGlobalStyle('#status a {color:#ccc}');
addGlobalStyle('h2 {color:#ccc}');

addGlobalStyle('h3 {background:#fff}');
addGlobalStyle('#header {position:relative;}');
addGlobalStyle('#searbar {position:absolute;right:5px;top:-1px}');

addGlobalStyle('#header img.logo {float:none;display:none}');


addGlobalStyle('#nav {clear:both;background:#eee;padding-top:0px;}');
addGlobalStyle('#nav .nine_nav:hover, #nav .nine_nav {margin:0;color:#333}');

addGlobalStyle('#nav a.now span{background:none;padding:0}');
addGlobalStyle('#nav a {background:none;color:#333;margin:0;padding:8px 10px 7px 10px}');
addGlobalStyle('#nav a:hover {background:#ffcc00;color:#333;margin:0;padding:8px 10px 7px 10px}');

addGlobalStyle('#nav a.now {background:none;color:#ccc;margin:0;padding:8px 10px 7px 10px}');
addGlobalStyle('#nav a span{background:none;}');
addGlobalStyle('#status {background:#fff;}');
addGlobalStyle('#status a:hover{color:#333;background:#eee}');
addGlobalStyle('#header {background:none;}');
addGlobalStyle('#searbar span.submit  {background:#eee;border:1px solid #ddd;height:16px;}');
addGlobalStyle('#searbar span a  {display:none}');
addGlobalStyle('#searbar span.submit  a{display:block}');
addGlobalStyle('.tablecc,.tablelc,.tablerc,.tablelt,.tablect,.tablert,.tablelb,.tablecb,.tablerb {background:none}');
