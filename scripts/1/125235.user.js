// ==UserScript==
// @name           UserScripts.org  CSS Menu
// @namespace      http://userscripts.org/users/62850
// @description    Adds a CSS menu to your user name on userscritps.org *This scripts usues specal css code that only works on mozilla browsers
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// ==/UserScript==

var ele=document.evaluate("//ul[@class='login_status']/li/a[@href='/home']/..",document,null,9,null).singleNodeValue;
if(!ele)
	return;
ele.id="user-menu";
GM_addStyle("\
#top .container{\
	overflow: visible;\
}\
#user-menu{\
	position: relative;\
}\
#user-menu a:hover{\
	text-decoration: none !important;\
}\
#user-menu > a{\
	position: relative;\
	z-index: 3;\
	background-color: #FF8800;\
	display: block;\
    height: 100%;\
}\
#user-menu ul{\
	display: none;\
	position: absolute;\
	z-index: 2;\
	background-color: #FF8800;\
	border-radius: 0 0 8px 8px;\
	width:-moz-calc(100% - 2px);\
	min-width: 120px;\
	left: 0;\
	margin: 0;\
	padding: 0;\
	top: 24px;\
	list-style: none;\
	border: 1px solid gray;\
	border-top: none;\
	-moz-animation-duration: 0.5s;\
}\
#user-menu:hover ul{\
	display: block;\
	-moz-animation-name: slidein;\
}\
#user-menu ul li{\
	position: static;\
	height:auto;\
	margin: 0 !important;\
	padding-left: 8px;\
	width: -moz-calc(100% - 8px);\
	text-transform: capitalize;\
	border-top: 1px solid white;\
}\
#user-menu ul li a{\
	width: 100%;\
	display: block;\
}\
@-moz-keyframes slidein {\
	from {\
		margin-top: -moz-calc(-100% - 32px);\
	}\
	to {\
		margin-top: 0;\
	}\
} \
");
var ul=document.createElement('ul');
ul.innerHTML='<li><a href="/home/comments">comments</a></li><li><a href="/home/favorites">favorite scripts</a></li><li><a href="/home/posts">monitored topics</a></li><li><a href="/home/scripts">script management</a></li><li><a href="/scripts/new">upload new script</a></li><li><a href="/home/settings">settings</a></li><li><a href="/home/widgets">widgets</a></li>';
ele.appendChild(ul);