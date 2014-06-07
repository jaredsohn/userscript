// ==UserScript==
// @name            Youtube Thumbs FoxySpeed
// @description     mouseover to animate thumbs
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399679.meta.js
// @updateURL      http://userscripts.org/scripts/source/399679.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399679.user.js
// @author         Ismail Iddakuo
// @Original-s-    Dec 13, 2013 http://userscripts.org/scripts/show/58931
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// @exclude        http*://img.youtube.com/vi/*
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
const LOOP_INTERVAL = 1000; // 1000 = 1 second
var loopHandler, img, imgs;

document.addEventListener('mouseover', mo, false);

GM_registerMenuCommand('Youtube Thumbs: toogle buttons', function(){GM_setValue('noButtons',!GM_getValue('noButtons'))});

function mo(evt)
{
	if( evt.target.nodeName=='IMG' && evt.target.getAttribute('src') && evt.target.getAttribute('src').search(/default\.jpg$/)>-1 )
	{
		start(evt);
		evt.target.addEventListener('mouseout', end, false);		
	}
}


function start(evt)
{
	img = evt.target;
	imgZIndex(evt);
	img.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/1.jpg'));
	loopHandler = setInterval(loop, LOOP_INTERVAL);
}


function loop()
{
	if(!img){
		clearInterval(loopHandler)
		return;
	}
	var num = parseInt( img.getAttribute('src').match(/(\d)\.jpg$/)[1] );
	if(num==3) 
		num = 1;
	else 
		num++;
	img.setAttribute('src', img.getAttribute('src').replace(/\d\.jpg$/, +num+'.jpg')); 
}


function end(evt)
{
	var node;
	clearInterval(loopHandler);
	evt.target.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/default.jpg'));
	img.style.zIndex = null;
	img = null;
}


function imgZIndex(evt){
	if(GM_getValue('noButtons') || evt.ctrlKey){
		img.style.zIndex = '999999999';
	}else{
		img.style.zIndex = null;
	}	
}
