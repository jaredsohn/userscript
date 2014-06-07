// ==UserScript==
// @name       Tumview link adder
// @namespace  *.tumblr.com*
// @description  Adds a Tumview link on the top of every Tumblr. 
// @include      *.tumblr.com*
// @exclude    *assets.tumblr.com/iframe.html?*
// @exclude    *iframe*
// @exclude    *assets.tumblr.com*
// @exclude    *www.tumblr.com/*
// @version    0.3
// @copyright  2013+, Joseph
// @run-at     document-end
// ==/UserScript==

function getTumlink(){
	return "http://tumview.com/" + window.location.href.split('.')[0].split('//')[1];
}

function animate(current, end, increase){
	function move(){
		if (increase) { current += 0.5; }
		else { current -= 0.5; }
		tum.style.top = current + '%';
		if(increase) { if(current >= end) { clearInterval(anim);} }
		else { if(current <= end) { clearInterval(anim);} }
		
	}
	var anim = setInterval(move, 10);
}

var body = document.getElementsByTagName('body')[0];

var tum = document.createElement('div');
var tumhtml = '<a id="tum" href=' + getTumlink() + '>Tum</a>';
tum.innerHTML = tumhtml;
tum.style.position = 'fixed';
tum.style.background = 'rgba(255, 255, 255, 0.84)';
tum.style.border = '2px solid';
tum.style.top = '-7.5%';
tum.style.right = '88%';
tum.style.padding = '10px';
tum.style.paddingTop = '25px';

tum.onmouseover = function(){ if (tum.style.top === '-7.5%') { animate(-7.5, -2, true);}};
tum.onclick = function(){ if (tum.style.top === '-2%') { animate(-2, -7.5, false);}};

body.appendChild(tum);