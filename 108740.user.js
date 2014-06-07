// ==UserScript==
// @name           Youtube Thumbs Preview on hover
// @namespace      vfede
// @description    mouseover to animate thumbs
// @updateURL      https://userscripts.org/scripts/source/108740.meta.js
// @downloadURL    https://userscripts.org/scripts/source/108740.user.js
// @version        1.1
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// ==/UserScript==

const LOOP_INTERVAL = 1000; // 1000 = 1 second
var loopHandler, img, imgs;

document.addEventListener('mouseover', mo, false);

GM_registerMenuCommand('Youtube Thumbs: toogle buttons', function(){GM_setValue('noButtons',!GM_getValue('noButtons'))});

function mo(evt)
{
	if( evt.target.nodeName=='IMG' && evt.target.getAttribute('src') && (evt.target.getAttribute('src').search(/default\.jpg$/)>-1 || 
	evt.target.getAttribute('src').search(/0\.jpg$/)>-1) )     // vfede's fix
	{
		start(evt);
		evt.target.addEventListener('mouseout', end, false);		
	}
}

function start(evt) {
	img = evt.target;
	imgZIndex(evt);
	img.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/1.jpg'));
	loopHandler = setInterval(loop, LOOP_INTERVAL);
}

function loop() {
	var num = parseInt( img.getAttribute('src').match(/(\d)\.jpg$/)[1] );
        if(num==1) 
		num++; // vfede's fix
	if(num==3) 
		num = 0;	
	else 
		num++;
	img.setAttribute('src', img.getAttribute('src').replace(/\d\.jpg$/, +num+'.jpg')); 
}

function end(evt) {
	var node;
	clearInterval(loopHandler);
	evt.target.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/0.jpg'));            // vfede's fix
	img.style.zIndex = null;
	img = null;
}

function imgZIndex(evt) {
	if(GM_getValue('noButtons') || evt.ctrlKey){
		img.style.zIndex = '999999999';
	}else{
		img.style.zIndex = null;
	}	
}