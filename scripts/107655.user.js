// ==UserScript==
// @name           DOTHACK
// @namespace      http://fivecolor.ru/lepra/
// @description    DOTHACK
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==


		var jsScript = document.createElement('script');
		jsScript.setAttribute('type', 'text/javascript');
jsScript.innerHTML = "function dotHack(){var ta=$('comment_textarea');ta.value;ta.value=ta.value.replace(/\\./g,'&#46;');}; commentsHandler.realRefreshMy=commentsHandler.refreshMy; commentsHandler.refreshMy=function(a,b){dotHack(); return commentsHandler.realRefreshMy(a,b);};var frm=document.forms.wrt;if (!frm) frm=document.forms.pf; oldonsubmit=frm.onsubmit;frm.onsubmit=function(){dotHack();oldonsubmit();}";
		document.getElementsByTagName('head')[0].appendChild(jsScript);