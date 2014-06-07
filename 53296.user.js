// Siter
// version 0.1
// Copyright (c) 2009, darkhero
//---------------------------------------------
// ==UserScript==
// @name          Siter button for Оpera
// @description   Добавляет к сайтам в интернете кнопочку для сайтера.
// @include       http://*/*
// @include       http://*
// ==/UserScript==


with (document.body.appendChild(document.createElement('div')))
	
	style.cssText = 'position:fixed;z-index:99;top:0px;left:0px;color:#fff;padding:0px 0px 0px 0px;display:visible;width:100%;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);-moz-opacity: 0.5;-khtml-opacity: 0.5;opacity: 0.5;',
	
	innerHTML = '<a href="#" onClick="return do_it()"> <img src=\"http://saiter.ru/images/saiter_logo.png\" width=63px height=20px style=\"align:left\
	"></a>',
	
	id = 'cfg';
	
	
function do_it(){
					 
					 
					 var jssrc='http://saiter.ru/js/ui-init.js';
					 var js=document.createElement('script');
					 js.setAttribute('language','javascript');
					 js.setAttribute('type','text/javascript');
					 js.setAttribute('src',jssrc);
					 document.getElementsByTagName('head').item(0).appendChild(js);
					 void(0);
					 
}






 