// ==UserScript==
// @name         Chatbox Remover
// @namespace    http://userscripts.org/users/92143
// @version      2.0
// @description  Removes noise-making/distracting group chat boxes (chatango.com and cbox.ws) for those who want to focus on anime watching. 
// @match        http://*.watchhentaionline.net/*
// @match        http://*.hentaicrunch.com/*
// @match        http://*.hent-tv.com/*
// @match        http://*.hentai-online.fr/*
// @match        http://*.hentainya.com/*
// @match        http://*.watchhentainow.net/*
// @match        http://*.hentailicio.us/*
// @match        http://*.watchhentaionline.tv/*
// @match        http://*.myhentaistream.net/*
// @match        http://cravinghentai.com/*
// @match        http://*.tubehentai.me/*
// @match        http://myhentai.tv/*
// @match        http://*.animecrave.com/*
// @match        http://*.animeratio.com/*
// @match        http://hentaiseries.net/*
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// grant         none
// @run-at       document-start
// ==/UserScript==

var chatangoScripts = 0;
var cboxScripts = 0;

function removeChatScript(e) {
	//for chatango
	if (-1 != e.target.innerHTML.search(/st\.chatango\.com\/js\/gz\/emb\.js/i))
	{
		chatangoScripts++;
		e.preventDefault();
		e.stopPropagation();
	}
	
	//for cbox
	if (-1 != e.target.innerHTML.search(/cbox\.ws\//i))
	{
		cboxScripts++;
		e.preventDefault();
		e.stopPropagation();
	}
	
	if (e.target.hasAttribute("src"))
	{
		//for chatango
		if (-1 != e.target.src.search(/st\.chatango\.com\/js\/gz\/emb\.js/i))
		{
			chatangoScripts++;
			e.preventDefault();
			e.stopPropagation();
		}
		
		//for cbox
		if (-1 != e.target.src.search(/cbox\.ws\//i))
		{
			cboxScripts++;
			e.preventDefault();
			e.stopPropagation();
		}
	}
	
	//for optimization; be advised that max occurrances may change over time
	if (2 <= chatangoScripts || 3 <= cboxScripts)
	{
		window.removeEventListener(e.type, arguments.callee, true);
	}
}

function removeChatObject(e) {
	var embeds = document.getElementsByTagName("embed");
	
	for (var i = 0; i < embeds.length; i++) {
		if (embeds[i].hasAttribute("src"))
		{
			//for chatango
			if (-1 != embeds[i].src.search(/chatango\.com\/group/i))
			{
				embeds[i].parentNode.parentNode.removeChild(embeds[i].parentNode);
			}
		}
	}

	var objects = document.getElementsByTagName("object");
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].hasAttribute("data"))
		{
			//for chatango
			if (-1 != objects[i].data.search(/chatango\.com\/flash/i))
			{
				objects[i].parentNode.removeChild(objects[i]);
			}
		}
	}
	
	//for cbox
	var iframes = document.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; i++) {
		if (iframes[i].hasAttribute("src"))
		{
			if (-1 != iframes[i].src.search(/cbox\.ws\//i))
			{
				iframes[i].parentNode.removeChild(iframes[i]);
			}
		}
	}
	
	if (e) {
		window.removeEventListener(e.type, arguments.callee, true);
		//in case chat object is yet to be loaded
		setTimeout(function() {
			removeChatObject();
		}, 1000);
	}
}

//remove chat script
if ('onbeforescriptexecute' in document) {
	//for firefox
	document.addEventListener('beforescriptexecute', removeChatScript, true);
}
else {
	//for chrome and opera
	document.addEventListener('beforeload', removeChatScript, true);
}

//remove chat object; in case no chat script is used
document.addEventListener('load', removeChatObject, true);
document.addEventListener('error', removeChatObject, true);
document.addEventListener('abort', removeChatObject, true);