// ==UserScript==
// @name           targetpermanent
// @namespace      targetpermanent
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function targetPermanent(permanent) {

	var messageTarget = document.getElementById('message_' + permanent);
	messageTarget.innerHTML = messageTarget.innerHTML.replace(/<ul>/, '<div style="background-color: #D6D8D8">\n<ul>');
	messageTarget.innerHTML = messageTarget.innerHTML.replace(/<\/ul>/, '</ul>\n</div>');
}

function init() {

	var urlInfos = window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm#message_(.*)/);
	
	if (urlInfos[9] != undefined) {targetPermanent(urlInfos[9]);}
}

init();