// ==UserScript==
// @name           FLASH KEY
// @namespace      http://userscripts.org/users/7010
// @include        *
// ==/UserScript==

GM_addStyle(<><![CDATA[
	#FLASH_KEY{
		position : fixed;
		font-size : 600%;
		z-index : 10000;
		
		padding : 50px;
		left : 50%;
		top : 50%;
		margin : -1em;
		
		background-color : #444;
		color : #FFF;
		-moz-border-radius: 0.3em;
		min-width : 1em;
		text-align : center;
	}
]]></>)


var flash = document.createElement('div');
flash.id = 'FLASH_KEY';
hide(flash);
document.body.appendChild(flash);

var canceler;
window.addEventListener('keydown', function(e){
	canceler && canceler();
	flash.innerHTML = keyString(e);
	flash.style.MozOpacity = 1;
	show(flash);
	flash.style.marginLeft = (-(flash.offsetWidth/2))+'px';
	
	canceler = callLater(function(){
		canceler = tween(function(value){
			flash.style.MozOpacity = (1-value);
		}, 100, 5);
	}, 400);
}, false);


// ----[Utility]-------------------------------------------------
function callLater(callback, interval){
	var timeoutId = setTimeout(callback, interval);
	return function(){
		clearTimeout(timeoutId)
	}
}
function tween(callback, span, count){
	count = (count || 20);
	var interval = span / count;
	var value = 0;
	var calls = 0;
	var intervalId = setInterval(function(){
		callback(calls / count);
		
		if(count == calls){
			canceler();
			return;
		}
		calls++;
	}, interval);
	var canceler = function(){
		clearInterval(intervalId)
	}
	
	return canceler;
}

function hide(target){
	target.style.display='none';
}

function show(target, style){
	target.style.display=(style || '');
}

function log() {
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments))
}

function keyString(e){
	var specialKeys = {
		8  : 'BACK',
		9  : 'TAB',
		13 : 'ENTER',
		19 : 'PAUSE',
		20 : 'CAPS_LOCK',
		27 : 'ESCAPE',
		32 : 'SPACE',
		33 : 'PAGE_UP',
		34 : 'PAGE_DOWN',
		35 : 'END',
		36 : 'HOME',
		37 : 'LEFT',
		38 : 'UP',
		39 : 'RIGHT',
		40 : 'DOWN',
		45 : 'INSERT',
		46 : 'DELETE',
	};
	
	var code = e.keyCode;
	var res = [];
	e.shiftKey && res.push('SHIFT');
	e.ctrlKey  && res.push('CTRL');
	e.altKey   && res.push('ALT');
	if(code < 16 || 18 < code)
		res.push(specialKeys[code] || String.fromCharCode(code));
	return res.join('+');
}