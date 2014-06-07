// ==UserScript==
// @name          NATF2 Custom Style
// @author        Horatio "tehroflmaoer" Mao
// @namespace     hrt
// @description   A custom skin for natf2.com
// @include       http://natf2.com/*
// @version       0.1
// ==/UserScript==

// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

GM_addStyle(
	"body{background:url(http://i.imgur.com/DwKws.gif);color:#333;font-family:verdana, sans-serif;font-size:11px;} \
	.topics-index tr{background: url(http://i.imgur.com/OHxZJ.gif); height: 39px;} \
	.topics-index thead tr, thead tr, .home-right thead tr, #reply{background:url(http://i.imgur.com/co9lQ.gif); height:20px;} \
	.inew { border-color: #0079CF #006CB8 #0064AB #006AB5; } \
	tbody .tcm {background:transparent;} \
	#reply {color:#000;} \
	.box {border: 1px solid #474747;} \
	.box .top {background:url(http://i.imgur.com/co9lQ.gif); color:#000;} \
	a:link,a:visited{color:#004A7E;text-decoration:none;} \
	a:active,a:hover{text-decoration:none;color:#004A7E;} \
	.nav{height:20px;border:1px solid #ccc;background:url(http://i.imgur.com/a7jwy.gif);margin:10px 0;color: #FFF;font-size:11px; overflow:auto;} \
	.nav-footer{color:#FFF;} \
	.nav a{color: #CEEFFF;} \
	.nav-left{float:left;margin:3px 0 0 5px;} \
	.nav-right{float:right;margin:3px 5px 0 0;} \
	table{width:100%;border:1px solid #474747;margin-bottom:10px;} \
	table a:link, table a:visited, table a:hover{text-decoration:none;color:#004A7E;font-weight:bold;} \
	thead th{color:#000;text-align:left;padding:0px 5px;height:5px} \
	.thread thead th{color:#000;text-align:left;padding:0px 9px;height:5px} \
	.thread thead{font-weight:bold;} \
	thead th{font-weight:bold;} \
	.topics-index thead th:first-child{color:#000;text-align:left;font-weight:400;padding:0px 27px;height:5px}; \
	tbody td{vertical-align:top;border-top:1px solid #cedeb9;border-right:1px solid #cedeb9;padding:3px 9px;} \
	.topics-index tbody tr td {padding:5px;} \
	tbody .tcm{text-align:center;} \
	.thread tr:first-child{background:url(http://i.imgur.com/5EoVp.gif);} \
	.thread .profile{width:24%; background:#F1F1F1;} \
	.thread thead{background:url(http://i.imgur.com/a7jwy.gif);height:20px;} \
	.thread .links a{font-weight:normal;} \
	.post-content a:link, .post-content a:visited, .post-content a:hover{font-weight:normal;} \
	tr .headf .topics-index .tcm{width:7%; background url(http://i.imgur.com/co9lQ.gif); font-weight:bold;} \
	.icon{/*border-color:#E6E6E6 #DEDEDE #DADADA #E2E2E2;border-style:solid;border-width:6px;margin:0 -3px 0 2px;*/} \
	thead th a:link,thead th a:visited,.reminders a{color:#000; font-weight: bold;} \
	thead th{background:transparent;} \
	"); //.topics-index thead tr, thead tr, .home-right thead tr {background:url(http://i.imgur.com/co9lQ.gif); height:20px;} \