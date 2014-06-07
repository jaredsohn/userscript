// ==UserScript==
// @name           facebook_block_app
// @namespace      fba
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// @exclude        https://apps.facebook.com/ai.php
// @exclude        http://apps.facebook.com/ai.php
// @version        1.0
// ==/UserScript==
function ById(id){return document.getElementById(id);}
var urlElement = ById('report_link')
if( urlElement !== null){
	getLink(urlElement, urlElement.getAttribute('href') )
}
var aLinkElement = document.getElementsByTagName('a')
var len = aLinkElement.length;
for(x=0;x<len;x++){
	var url = aLinkElement[x].getAttribute('href');
	if(url !== null && url.indexOf('report.application') != -1 ){
		getLink(aLinkElement[x], url )
		break;
	}
}
function getLink(Element, url){
	var tmp = url.match(/app_id\=(\d+)/);
	var app_id = tmp[1];
	var aElement=document.createElement('a');
		aElement.innerHTML = "Block";
		aElement.setAttribute('rel','dialog');
		aElement.setAttribute('ajaxify','/ajax/apps/block_app.php?app_id='+app_id);
	Element.parentNode.insertBefore(aElement,Element);
	var spanElement=document.createElement('span');
	spanElement.innerHTML = " \u00B7 ";
	Element.parentNode.insertBefore(spanElement, Element );
}