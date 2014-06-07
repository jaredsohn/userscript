// ==UserScript==
// @name           AM clean up
// @namespace      userscripts.org
// @include        http://www.ashleymadison.com/*
// ==/UserScript==

GM_addStyle("#logo, #clientContainer, #flashbanner, .content-banner-row, .disclaimer, #footerLogo, .paid-search-banner, #navLeft, #navRight, div.JQFEShadow {display:none !important} div#menu {background-color:#cccccc;} div#menu > ul, div#menu > ul > li.menuItem, div#menu > ul > li.menuItem > a {height:16px !important} a.JQFE {background-color:transparent !important} div.JQFEText {color:#333 !important} #search a {color:#748EC1 !important; padding-left:4px;} div#caption {color:#333333 !important} div#search {position:relative; top:-1px; padding-top:0 !important} div#panic{top:36px !important} img[src='http://static-cdn.ashleymadison.com/site/images/lang/en_US/private/member/profile/search/swomannopic.jpg']{visibility:hidden !important}");
document.getElementById('masterframe').rows = "0,62,*,0";
var favicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhklEQVR42qVTTatBURR9f5aREQMjUv6CoZTMSBID5OsmoSSJEAYUmUgyUL7Wa606uu/eWwZv1e509tl77X32xw8Al4xGIyQSCQSDQfj9fp66U++0/XM5n8+IxWIIh8NoNpsYDAawLAv7/Z536vVOOxcBlYFAAMlkErlcDu12G7vdDsfjEc/nE8Tr9UImk5GdSOwE8Xgc+Xwe4/EY2WwW5XJZkTebDezo9/tIp9Og/YdgNpshFAopQrfbFUGxWBRho9GQ3oBfqVQqsp9OpxBBKpVCtVoFwZMEFP7/drvBgETL5RK9Xk8Z0k8E0WgU2+3WpCjH9XqNw+EAJy6Xi5zn8zkikQhEwDaxKMT1ekW9Xsf9focHTI1UYPo5MhBENhwOSaa0bRDxZDLBarViBu4aGDweD7RaLUUrlUo4nU6wQYWkn6sLNhgCimZjsViYYn664JwDr/8aUWEJ2tHecxILhQLe7zcMOp0OnVlYRta7mcRvu6A21mo1ps/Tcxe+bqPP5/u6jf+SX7bfQNLqjPuTAAAAAElFTkSuQmCC";
var x = document.createElement('link');
x.setAttribute('type', 'image/x-icon');
x.setAttribute('rel', 'shortcut icon');
x.setAttribute('href', favicon);
document.getElementsByTagName('head')[0].appendChild(x);