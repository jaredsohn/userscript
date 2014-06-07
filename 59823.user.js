// ==UserScript==
// @name           MCS ExtInfo
// @namespace      http://userscripts.org 
// @description    Extended Street Info
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.39
// ==/UserScript==

// @author         deraider@yandex.ru
// 
// CCCP clan
// visit us at http://groups.google.ru/group/monopolycitystreetsru/

function addInlineJavascriptEI(content)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	head.appendChild(script);
}

function addJavascriptEI(src)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

function initExtInfo()
{
    var day = Math.floor((new Date()).getTime()/86400000);
    addJavascriptEI('http://deraider.info/userjs/mcs_cccp_extinfo.js?d=' + day);
}

addInlineJavascriptEI(addJavascriptEI);
addInlineJavascriptEI(initExtInfo);
initExtInfo();