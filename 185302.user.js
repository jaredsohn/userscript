// ==UserScript==
// @name        The Old Reader
// @namespace   http://www.pfohlnet.de/
// @include     http://theoldreader.com/*
// @include     https://theoldreader.com/*
// @version     0.4
// @grant       none
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

addGlobalStyle('.nav-list { margin-left: 20px; }');
addGlobalStyle('.nav-list li.sort-item { margin-left: 20px; }');
addGlobalStyle('.label.label-feed,.badge.badge-info {color: gray; background-color:transparent !important; }');
addGlobalStyle('.container-fluid .row-fluid .span3 {width: 260px;}');
addGlobalStyle('.container-fluid .row-fluid .sidebar-fixed-top {position: relative;}');
addGlobalStyle('.container-fluid .row-fluid .span9 {float: none; position: static; width: auto;	padding-left: 10px;}');
addGlobalStyle('.container-fluid .row-fluid .span9 .slide {margin-left: 260px; padding-left: 0px; padding-right: 10px;}');
addGlobalStyle('.sidebar-nav {border:0; background-color: transparent; width: 228px}');
addGlobalStyle('.well {background: none repeat scroll 0% 0% transparent;}');
addGlobalStyle('.nav-list li a {color: #c2c0b8;}');
addGlobalStyle('.reader .sidebar-fixed-top .slide {position: fixed; margin-top: 55px; overflow-y: hidden; padding: -10px 10px 0px 0px; background-color: #342c12; width: 240px;}');
addGlobalStyle('.nav-list li.active a {color: rgb(255, 255, 255);}');
addGlobalStyle('.list-post {padding-left: 10%; padding-right: 10%; font-size: 14px; font-family: sans-serif;}');
addGlobalStyle('.list-post a {font-weight: bold; color: rgb(41,41,41); text-decoration: none; border-bottom:1px dotted}');
addGlobalStyle('#sidebar {left: 0px; }');
addGlobalStyle('.subscribe .btn-primary {box-shadow: none; border: 0; background: transparent; color: white}');
addGlobalStyle('.reader .subscribe-fixed-top .bg {display: none;}');
addGlobalStyle('.row-fluid .span8 { width: 80%; min-height: 30px;}');
addGlobalStyle('.unread:hover { background-color: #ebebeb;}');
addGlobalStyle('.span8 span { color: #bbbbbb;}');