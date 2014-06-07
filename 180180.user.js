// ==UserScript==
// @name afn_clicker
// @version 2.1.3
// @description autoclicks "like-buttons" in every post.
// @include https://www.autoflower.net/*
// ==/UserScript==

function addGlobalStyle() {
	var body, divForButton, kopf, button, styleForDiv;
	body = document.getElementsByTagName('body')[0];
	if (!body) { 
		return; 
	}

	// divForButton = document.createElement('div');
	// divForButton.setAttribute('id', 'aboveKopfgrafik');
	// divForButton.setAttribute('width','100%');
	// divForButton.setAttribute('z-index','1');

	// span = document.createElement('span');
	spanA = document.createElement('input');
	
	// button = document.createElement('input');
	spanA.setAttribute('id', 'aboveKopfgrafik');
	spanA.setAttribute('type','button');
	spanA.setAttribute('name','click all');
	spanA.setAttribute('value','click all');
	// button.setAttribute('z-index','100000');

	// span.appendChild(spanA);
	
	var formDiv = document.getElementById('pagination_top');
	
	formDiv.appendChild(spanA);

	//body.insertBefore(button, body.firstChild);

	styleForDiv = document.createElement('style');
    styleForDiv.type = 'text/css';
    styleForDiv.innerHTML = '#aboveKopfgrafik {z-index:100000; float:right; clear:right; color:#417394}';
    body.appendChild(styleForDiv);

	// kopf = document.getElementById('aboveKopfgrafik');
	// if (!kopf){
	// 	return;
	// }

	// kopf.appendChild(button);

	spanA.onclick = like;

}

function like(){
	var likes = document.getElementsByClassName('vbseo_like');
	for (var i = likes.length - 1; i >= 0; i--) {
		likeA = likes[i].firstChild;
		if (likeA.innerText=='Like') {
			likeA.click();
			warten(Math.random()/2);
		};
	};
}

function warten(prmSec) { prmSec *= 1000; var eDate = null; var eMsec = 0; var sDate = new Date(); var sMsec = sDate.getTime(); do { eDate = new Date(); eMsec = eDate.getTime(); } while ((eMsec-sMsec)<prmSec); }

addGlobalStyle();