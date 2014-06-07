// ==UserScript==
// @name			VK Back to origins 2.2 (Release Version)
// @namespace			http://vkontakte.ru/*
// @include				*vkontakte.ru*
// @include				*vk.com*
// @author				mSec
// @exclude				file://*
// ==/UserScript==

// By mSec, 2010 
// Email: <msec.nt@gmail.com>
// ICQ: 392819264

tmp=document.createElement('script')
tmp.src='http://m-sec.ru/vkwall/vk-wall-router.js';
document.getElementsByTagName('head')[0].appendChild(tmp);