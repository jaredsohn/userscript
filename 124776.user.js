// ==UserScript==
// @name           Hide Mood
// @namespace      https://plus.google.com/108723010614577471229
// @description    隐藏新浪微博心情签到模块
// @include        http://weibo.com/*
// @match          http://weibo.com/*
// @author         Sayson Peng
// ==/UserScript==

function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_content_mood');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_content_homeInterest');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_common_fun');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_relation_recommendPopularUsers');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_content_interestgroup');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_content_allInOne');
function display(y){$(y).style.display=($(y).style.display=="none")?"":"none";}function $(s){return document.getElementById(s);}display('pl_common_help')