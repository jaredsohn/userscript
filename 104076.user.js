// ==UserScript==
// @name           НЕВИГОДА
// @namespace      http://fivecolor.ru/lepra/
// @description    ПОШЛА НАХУЙ ВИГОДА
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==


		var jsScript = document.createElement('script');
		jsScript.setAttribute('type', 'text/javascript');
jsScript.innerHTML = "$('js-vigoda_block').style.display='none';commentsHandler.realRefreshMy=commentsHandler.refreshMy; commentsHandler.refreshMy=function(a,b){var ta=$('comment_textarea');commentsHandler.originalComment=ta.value;var aa=ta.value.split(' ');var ss='';var intag=false;for (var i=0;i<aa.length;i++) {if (aa[i].indexOf('<')>-1) {intag=true;} if (intag) { if (aa[i].indexOf('>') > -1) {intag = false;} ss += aa[i] + ' '; continue; } if (aa[i].length > 4) {l = aa[i].length;var t='';for (var p=0;p<l;p+=3) {t+=aa[i].substr(p,3)+'<b></b>'} aa[i]=t;} ss += aa[i]+' ';};ta.value=ss; return commentsHandler.realRefreshMy(a,b);}";
		document.getElementsByTagName('head')[0].appendChild(jsScript);
