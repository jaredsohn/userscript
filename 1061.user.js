// ==UserScript==
// @name		ExpandArea
// @version		1.1
// @namespace	http://stilleye.com/greasemonkey
// @author		David Schontzler
// @description	Adds button to make textareas expandable
// @include		*
// @exclude		*gmail.google.com*
// @exclude		*.jot.com/*
// ==/UserScript==

(function() {
	function expandArea(elms) {
		var elms2 = [];
		for(var i = 0; i < elms.length; i++) { 
			elms2.push(elms[i]);
		}
		for(var i = 0; i < elms2.length; i++) { 
			applyArea(elms2[i]);
		}

		function applyArea(elm) {
			var w = elm.offsetWidth,
				h = elm.offsetHeight;
			var pos = getAbsolutePosition(elm);

			var overlay = document.createElement("div");
			overlay.style.width = w + "px";
			overlay.style.height = h + "px";
			overlay.style.position = "absolute";
			overlay.style.left = pos.x + "px";
			overlay.style.top = pos.y + "px";
			overlay.style.padding = "4px";
			overlay.style.zIndex = "999";
			overlay.className = "ExpandArea";

			var size = document.createElement("div");
			size.style.width = size.style.height = "8px";
			size.style.background = "#33f";
			size.style.position = "absolute";
			size.style.right = "-8px";
			size.style.bottom = "-8px";
			size.style.cursor = "nw-resize";
			size.style.MozBorderRadius = "4px";
			size.setAttribute("title", "Drag blue box to size the text area");
			var offX, offY;
			size.addEventListener("mousedown", function(e) {
				offX = e.layerX + 8; offY = e.layerY + 8;
				document.body.addEventListener("mousemove", doSize, false);
				document.body.addEventListener("mouseup", endSize, false);
			}, false);
			overlay.appendChild(size);

			var reset = size.cloneNode(false);
			reset.style.background = "#c00";
			reset.style.right = "1px";
			reset.style.cursor = "pointer";
			reset.setAttribute("title", "Click the red box to reset the size of the text area");
			reset.addEventListener("click", function(e) {
				overlay.style.width = w + "px";
				overlay.style.height = h + "px";
			}, false);
			overlay.appendChild(reset);

			var txt = document.createElement("textarea");
			txt.value = elm.value;
			txt.style.width = "100%";
			txt.style.height = "100%";
			txt.onkeyup = function(e) {
				elm.value = this.value;
			}
			overlay.appendChild(txt);

			document.body.appendChild(overlay);
			elm.style.visibility = "hidden";

			function doSize(e) {
				var x = e.pageX - pos.x - offX;
				var y = e.pageY - pos.y - offY;
				if( x > 40 ) overlay.style.width = x + "px";
				if( y > 40 ) overlay.style.height = y + "px";
			}

			function endSize(e) {
				document.body.removeEventListener("mousemove", doSize, false);
				document.body.removeEventListener("mouseup", endSize, false);
			}
		}

		function getAbsolutePosition(elm) {
			var x = 0, y = 0;
			while( elm && elm != document.body ) {
				x += elm.offsetLeft;
				y += elm.offsetTop;
				elm = elm.offsetParent;
			}
			return { x: x, y: y };
		}
	}

	function setup() {
		if( !document.getElementsByTagName("textarea").length ) return;

		var on = document.createTextNode("Expand Textarea");
		var off = document.createTextNode(String.fromCharCode(160) + String.fromCharCode(171) + String.fromCharCode(160));

		var html = "&nbsp;&laquo;&nbsp;";
		var trigger = document.createElement("div");
		trigger.appendChild( off );
		with(trigger.style) {
			position = "fixed";
			right = bottom = "0px";
			color = "black";
			background = "white";
			border = "1px solid";
			padding = "3px";
			font = "10px sans-serif";
			cursor = "pointer";
			MozOpacity = ".4";
		}
		document.body.appendChild(trigger);
		trigger.onmouseover = function() {
			this.replaceChild(on, off);
		}
		trigger.onmouseout = function() {
			this.replaceChild(off, on);
		}
		trigger.onclick = function() {
			expandArea(document.getElementsByTagName("textarea"));
			this.parentNode.removeChild(this);
		}
	}

	window.addEventListener("load", setup, false);
})();

