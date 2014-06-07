// Wykop.pl - embedded video resizer
// version 2
// 2009-04-27
// Copyright (c) 2009, Michal Drozdziewicz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Wykop.pl embedded video resizer
// @namespace     http://k.uaznia.net/wykop.pl/tunePlayer
// @description   script enables user to resize embedded player on wykop.pl site
// @include       http://*wykop.pl/*
// ==/UserScript==

function tunePlayer(action, options) {

	var divs = document.getElementsByTagName('div');
	var playerDiv;
	var wykopDiv;

	for(lp=0; lp < divs.length; lp++) {
		if (divs[lp].className == 'link-player') {
			playerDiv = divs[lp];
		}
		if (divs[lp].id.match(/.*linkid.*/)) {
			wykopDiv = divs[lp];
		}
	};
	
	// if it is not a page with embeded YT player, exit
	if (!playerDiv) return false;
		
	switch (action) {

		case 'initialize':
			initialWidth = ((window.innerWidth))
			tunePlayer('resize');
			playerDiv.style.marginLeft = '0px';
			unsafeWindow.onresize = function() { tunePlayer('resize'); };
			break;
	
		case 'resize':
			playerWidth = parseInt(wykopDiv.offsetWidth);
			playerHeight = playerWidth / 1.4;
			
			playerDiv.getElementsByTagName('object')[0].width = playerWidth;
			playerDiv.getElementsByTagName('object')[0].height = playerHeight;
			playerDiv.getElementsByTagName('embed')[0].width = playerWidth;
			playerDiv.getElementsByTagName('embed')[0].height = playerHeight;
			break;

		}
};

tunePlayer('initialize');

document.body.appendChild(document.createElement("script")).innerHTML=tunePlayer;