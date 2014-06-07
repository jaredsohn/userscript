// ==UserScript==
// @name         Kayako Filter Refresh For V4
// @copyright    WayneE
// @description  Reloads Kayako Filter Results
// @include 	 https://mymanagedsupport.com/*/Filter/*
// @exclude      about:*
// @exclude      chrome:*
// ==/UserScript==


function filterReload() {
	if(getCurrentUrl()==getUrl()){
		window.location.reload()
	}
}

function getCurrentUrl() {
	return window.location.href
}

function getUrl() {
	return GM_getValue('addressValue', null)
}

function setUrl(value){
	return GM_setValue('addressValue', value)
}

function init(){	
	setUrl(window.location.href)
}
init()


window.setTimeout(filterReload,10000);
