// ==UserScript==
// @id             www.kickstarter.com-eb4a0dcd-6388-4489-9df8-5fdedc79f9e1@rm
// @name           Kickstarter.com video download link
// @version        1.4
// @namespace      k
// @author         Yansky
// @description    Kickstarter.com video download link
// @include        http://www.kickstarter.com/projects/*
// @include        https://www.kickstarter.com/projects/*
// @updateURL		http://userscripts.org/scripts/source/153518.user.js
// @run-at         document-end
// ==/UserScript==


if(window.location.href.indexOf('/posts/')>-1){

	[].forEach.call(document.querySelectorAll('.video-player'), function(item, index, arr){
	
		var downButtA = document.createElement('a');
		downButtA.innerHTML = 'Download Video';
		downButtA.href = item.getAttribute('data-video-url');
		
		var iPP = item.parentNode.parentNode;
		iPP.parentNode.insertBefore(downButtA, iPP.nextElementSibling);
	
	});
	

}
else{

	var getVidDetails = document.querySelector('#video-section>.video-player');

	if(getVidDetails){

		var getShareUl = document.querySelector('#about ul');

		var downButtLi = document.createElement('li');
		downButtLi.setAttribute('style','margin:6px -9px !important;width: 80px;');
		
		var downButtA = document.createElement('a');
		downButtA.innerHTML = 'Download';
		downButtA.href = JSON.parse(getVidDetails.getAttribute('data-video')).high;
		//downButtA.setAttribute('class','button-action');
		
		downButtLi.appendChild(downButtA);
		
		getShareUl.appendChild(downButtLi);

	}

}
