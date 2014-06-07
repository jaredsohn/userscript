// ==UserScript==
// @name           去掉新浪微博的“测试版”字样
// @namespace      http://sayson.blogbus.com/
// @description    remove the word beta in weibo.com
// @include        http://weibo.com/*
// @include        http://*.weibo.com/*
// @match          http://weibo.com/*
// @match          http://*.weibo.com/*
// @author         Sayson Peng
// @thankto        Zheng Gong
// ==/UserScript==
if (top.location.href.indexOf("weibo.com/") != -1)
{
	var eC=document.createElement('link');
	eC.setAttribute('href','http://k.min.us/ileBnc.css');
	eC.setAttribute('type','text/css');
	eC.setAttribute('rel','stylesheet');
	document.body.appendChild(eC);
}