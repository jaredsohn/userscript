// ==UserScript==
// @name          Annoying Overlay Remover and Dragger
// @version       0.0.1
// @author        George
// @description   Fix annoying website overlays
// @grant         none
// @include       *
// ==/UserScript==

// this script should be used with the bookmarklet "javascript:removeAllOverlays()" or "javascript:dragAllOverlays()"

(function () {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.innerHTML = "(function(){\
	Function.prototype.extend = function(other){var first = this; return function () { other.apply(this, arguments); first.apply(this, arguments); }};\
	function makeDraggable(el) {\
		var mousex, mousey, elx, ely, dragging = false;\
		el.style.position='absolute';\
		el.onmousedown = (el.mousedown || function(){}).extend(function (e) {\
			mousex = e.clientX;\
			mousey = e.clientY;\
			elx = this.offsetLeft;\
			ely = this.offsetTop;\
			dragging = true;\
		});\
		el.onmousemove = (el.onmousemove || function(){}).extend(function (e) {\
			if (!dragging) return;\
			this.style.left = (e.clientX-mousex+elx)+'px';\
			this.style.top = (e.clientY-mousey+ely)+'px';\
			return false;\
		});\
		document.body.onmouseup = (document.body.onmouseup || function(){}).extend(function (e) {\
			dragging = false;\
			return false;\
		});\
	}\
	window.addEventListener('message', function (e) {\
		var t = document.getElementsByTagName('*');\
		if (e.data == 'removeOverlays') {\
			for (el in t)\
				if (window.getComputedStyle(t[el],null) && window.getComputedStyle(t[el],null).getPropertyValue('z-index') >= 5) {\
					t[el].style.zIndex = '-5';\
				}\
		} else if (e.data == 'dragOverlays') {\
			for (el in t) if (window.getComputedStyle(t[el],null) && window.getComputedStyle(t[el],null).getPropertyValue('z-index') >= 5) makeDraggable(t[el]);\
		} else return;\
		document.body.style.zIndex = -4;\
		document.body.style.overflow = 'scroll';\
	});\
	window.removeAllOverlays = function () {\
		var i;\
		var a = document.getElementsByTagName('iframe');\
		for (i = 0; i < a.length; i++) a[i].contentWindow.postMessage('removeOverlays', '*');\
		a = document.getElementsByTagName('frame');\
		for (i = 0; i < a.length; i++) a[i].contentWindow.postMessage('removeOverlays', '*');\
		window.postMessage('removeOverlays', '*');\
	};\
	window.dragAllOverlays = function () {\
		var i;\
		var a = document.getElementsByTagName('iframe');\
		for (i = 0; i < a.length; i++) a[i].contentWindow.postMessage('dragOverlays', '*');\
		a = document.getElementsByTagName('frame');\
		for (i = 0; i < a.length; i++) a[i].contentWindow.postMessage('dragOverlays', '*');\
		window.postMessage('dragOverlays', '*');\
	};})();";
 	document.head.appendChild(s);

})();

