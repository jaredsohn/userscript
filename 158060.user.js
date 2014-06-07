// ==UserScript==
// @name        drag-to-scroll
// @namespace   localhost
// @description drag image to scroll
// @include     http://*
// @include     https://*
// @version     2013.01.30
// ==/UserScript==


var nodes = document.body.childNodes;
if(nodes.length == 1 && nodes[0].tagName == "IMG") {
  
	var v_x, v_y;
	var is_hold = false;
	var is_release = false;
	var is_drag = false;

	unsafeWindow.addEventListener('mousedown', function (ev) {

		ev.preventDefault();
		is_hold = true;
		v_x = ev.screenX;
		v_y = ev.screenY;
	  
	}, false);

	unsafeWindow.addEventListener('mousemove', function (ev) {

		if(is_drag) {
			ev.preventDefault();
			var d_x = v_x - ev.screenX;
			var d_y = v_y - ev.screenY;
			window.scrollBy(d_x, d_y);
			
			v_x = ev.screenX;
			v_y = ev.screenY;
		}
		else if(is_hold) {
			is_drag = true;
			is_hold = false;
		}
	}, true);

	unsafeWindow.addEventListener('click', function (ev) {
	  
		if(is_release) {
			ev.preventDefault();
			ev.cancel = true;
			ev.stopPropagation();
			ev.cancelBubble = true;
			ev.returnValue = false;

			is_release = false;
			is_drag = false;

			return false;
		}
	}, true);

	unsafeWindow.addEventListener('mouseup', function (ev) {
	  
		ev.preventDefault();
		ev.stopPropagation();
		ev.cancel = true;
		ev.cancelBubble = true;
	  
		if(is_drag) {
			is_release = true;
		}
		is_hold = false;

		return false;
	}, true);
}