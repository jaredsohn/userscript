// ==UserScript==
// @name        Clear text input field with mouse gesture
// @version     1.0
// @date        2008-06-21
// @author      Artemy Tregubenko <me@arty.name>
// @description Press left mouse button outside of text input, move pointer over it and release mouse button: this simple gesture will clear text input, allowing for middle-click clipboard insertion. Tested in Opera only. 
// ==/UserScript==

(function(){
var pressed;
document.addEventListener('mousedown', function(event){
	if (pressed || event.button != 0 || event.target instanceof HTMLInputElement) return;
	pressed = true;
	setTimeout(function(){ pressed = false }, 200);
}, false);
document.addEventListener('mouseup', function(event){
	if (!pressed || event.button != 0 || !(event.target instanceof HTMLInputElement && event.target.type == 'text')) return;
	event.target.value = '';
	event.target.focus();
	pressed = false;
}, false);
})()
