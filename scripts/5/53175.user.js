// ==UserScript==
// @name Open in background with long press
// @author Lex1
// @version 1.3.8
// @description Open links in background window on long press.
// @ujs:documentation http://lexi.ucoz.ru/index/0-5
// @ujs:download http://lexi.ucoz.ru/open-in-background-with-long-press.js
// ==/UserScript==



(function(){

var delay = 500;
var timerId = 0;

opera.addEventListener('BeforeEvent.mousedown', function(e){
  var l = window.location;var evt = e.event;var t = evt.target;
  if(evt.button==0 && !evt.ctrlKey && !evt.shiftKey && !evt.altKey){
	timerId = setTimeout(function(){
		while(t.nodeName.toLowerCase() != 'a' && t.parentNode){t = t.parentNode};
		if(t.href && t.protocol.toLowerCase() != 'javascript:'){
			evt.stopPropagation();evt.preventDefault();
			if(t.hash && t.href.replace(t.hash, '')==l.href.replace(l.hash, ''))l.hash=t.hash;else window.open(t.href).blur();
		}
	}, delay);
  }
}, false);

document.addEventListener('mouseup', function(){if(timerId!=0){clearTimeout(timerId);timerId=0}}, false);
document.addEventListener('mousemove', function(){if(timerId!=0){clearTimeout(timerId);timerId=0}}, false);

})();
