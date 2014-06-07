// ==UserScript==
// @id             chrome.google.com-be0a3c7e-21fd-4113-b37e-c44ee79f28e3@xf
// @name           CRX file downloader
// @version        1.5
// @namespace      CRX
// @author		Yansky
// @description    Puts a download link on chrome extension installation pages allowing you to download the extension as a CRX file.
// @include        https://chrome.google.com/webstore/category/*
// @include        https://chrome.google.com/webstore/detail/*
// @include        http://chrome.google.com/webstore/category/*
// @include        http://chrome.google.com/webstore/detail/*
// @resource downloadIcon	http://i.imgur.com/QOdB0NQ.png
// @noframes         
// @updateURL		http://userscripts.org/scripts/source/133203.user.js
// @run-at         document-end
// ==/UserScript==

var downIcon = GM_getResourceURL("downloadIcon");

//http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/

GM_addStyle('div[class^="webstore"]:nth-of-type(4)>div[class^="webstore-rb-Xe-fc"] { '+
				'display:none !important; '+
			'} '+
			'@keyframes YoYoYoIDunInsertedSomeShitBro {  '+
			'	from {  '+
			'		clip: rect(1px, auto, auto, auto);  '+
			'	}'+
			'	to {  '+
			'		clip: rect(0px, auto, auto, auto);'+
			'	}  '+
			'}'+
			'@-moz-keyframes YoYoYoIDunInsertedSomeShitBro {  '+
			'	from {  '+
			'		clip: rect(1px, auto, auto, auto); '+ 
			'	}'+
			'	to {  '+
			'		clip: rect(0px, auto, auto, auto);'+
			'	}  '+
			'}'+
			'div[itemtype="http://schema.org/WebApplication"] {'+
			'	animation-duration: 0.001s;'+
			'	-moz-animation-duration: 0.001s;'+
			'	animation-name: YoYoYoIDunInsertedSomeShitBro;'+
			'	-moz-animation-name: YoYoYoIDunInsertedSomeShitBro;'+
			'}'+
			'#CRXDownloadButt {'+
			'	background-image: url("'+downIcon+'"); '+
			'	background-repeat: no-repeat; '+
			'	background-size: 40px auto; '+
			'	float: right; '+
			'	height: 40px; '+
			'	margin: 30px 260px 0 0; '+
			'	position: relative; '+
			'	width: 40px; '+
			'	z-index: 99; '+
			'	opacity: 0.8; '+
			'}'+
			'#CRXDownloadButt:hover{ '+
			'	opacity:1; '+
			'}'
			);

			
function domInsListener(event){

	if (event.animationName !== 'YoYoYoIDunInsertedSomeShitBro') 
		return;

	var docS=document.URL.split('/');
	var extID = docS[docS.length-1].split('?')[0].split('#')[0];

	var crxA = document.createElement('a');
	crxA.setAttribute("id","CRXDownloadButt");
	crxA.setAttribute("title","download CRX");
	crxA.href = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D'+extID+'%26uc ';
	
	var downLinkContainer = document.querySelector('div[itemtype="http://schema.org/WebApplication"]>div:nth-of-type(2)');
	downLinkContainer.appendChild(crxA);

}			
			
document.addEventListener('animationstart', domInsListener, false);



