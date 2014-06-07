// ==UserScript==
// @name Open in background with long press
// @author Lex1
// @version 1.3.11
// @description Open links in background window on long press.
// @ujs:documentation http://ruzanow.ru/index/0-5
// @ujs:download http://ruzanow.ru/userjs/open-in-background-with-long-press.js
// ==/UserScript==


(function(){
var delay = 500;
var timerId = 0;
var clear = function(){if(timerId){clearTimeout(timerId); timerId = 0}};

opera.addEventListener('BeforeEvent.mousedown', function(e){
  var loc = window.location, evt = e.event, target = evt.target;
  if(evt.button == 0 && !evt.ctrlKey && !evt.shiftKey && !evt.altKey){
	timerId = setTimeout(function(){
		var link = target.selectSingleNode('ancestor-or-self::*[(local-name()="a" or local-name()="area") and @href]');
		if(link && link.protocol.toLowerCase() != 'javascript:'){
			evt.stopPropagation();
			evt.preventDefault();
			if(link.hash && link.href.replace(link.hash, '') == loc.href.replace(loc.hash, '')){
				loc.hash = link.hash;
			}
			else{
				if(window.atob){
					window.open(link.href).blur();
					document.addEventListener('click', function(ev){
						if(ev.target == target){
							ev.stopPropagation();
							ev.preventDefault();
						};
						document.removeEventListener(ev.type, arguments.callee, false);
					}, false);
				}
				else{
					var ev = document.createEvent('MouseEvents');
					ev.initMouseEvent('mousedown', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
					link.dispatchEvent(ev);
					ev.initMouseEvent('mouseup', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					link.dispatchEvent(ev);
				}
			}
		}
	}, delay);
  }
}, false);

document.addEventListener('mouseup', clear, false);
document.addEventListener('mousemove', clear, false);
})();
