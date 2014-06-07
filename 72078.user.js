// ==UserScript==
// @name           player close fix
// @namespace      ex.ua
// @description    deletes player from page when close button lunched (удаляет плеер при его закрытии)
// @namespace      http://www.ex.ua
// @include        http://www.ex.ua/*
// @include        http://ex.ua/*
// @author		   fatalfury aka .bs
// @version		   0.1
// ==/UserScript==

debug = false;
if(typeof unsafeWindow.console != 'undefined' && debug)
{
console = unsafeWindow.console;
}else{
var console = new Object();
console.log = function(){};
}


player = document.getElementById('player');
button = player.getElementsByTagName('button')[0];

toggle_old = unsafeWindow.toggle;

console.log('toggle');
unsafeWindow.toggle = function (){	
try{
	console.log('loaded: %s',unsafeWindow.player_loaded);
	if(unsafeWindow.player_loaded && unsafeWindow.player_visible){
		
		pw = document.getElementById('player_window');
		pw.innerHTML = '';
		unsafeWindow.player_loaded = false;
		console.log('deleting player');
		
		shirm = document.getElementById('shirm');
		console.log(shirm);
		if(shirm){
			evObj = document.createEvent('MouseEvents');
			evObj.initEvent( 'click', true, false );
			shirm.dispatchEvent(evObj);
		}
		
	}
	}catch(e){console.log('undef')}
	try{
	console.log('visible: %s',unsafeWindow.player_visible);
	}catch(e){console.log('undef');}
	return toggle_old();
}