// ==UserScript==
// @name           Blogger Edit Resize
// @namespace      http://namespaces.ziesemer.com/Greasemonkey
// @description    http://blogger.ziesemer.com/2008/12/resizing-blogger-edit-box.html
// @include        http://www.blogger.com/post-create.g?*
// @include        http://www.blogger.com/post-edit.g?*
// @author         Mark A. Ziesemer, www.ziesemer.com
// @version        2009-09-07
// @homepage       http://blogger.ziesemer.com
// ==/UserScript==

(function(){
	// http://www.quirksmode.org./js/events_advanced.html
	var attachEvent = function(obj, evType, handler){
		if(obj.addEventListener){
			obj.addEventListener(evType, handler, true);
			return true;
		}else if(obj.attachEvent){
			return obj.attachEvent("on" + evType, handler);
		}else{
			return false;
		}
	},
	getDim = function(dim){
		// http://www.howtocreate.co.uk./tutorials/javascript/browserwindow
		return window["inner" + dim] || document.documentElement["client" + dim] || document.body["client" + dim];
	},
	getH = function(){
		return getDim("Height");
	},
	getW = function(){
		return getDim("Width");
	},
	editSize = function(dim, size){
		document.getElementById("textarea").style[dim]
			= document.getElementById("richeditorframe").style[dim]
			= size + "px";
	},
	lastH, lastW,
	resize = function(){
		var newH = getH(), newW = getW();
		// http://webbugtrack.blogspot.com./2007/10/bug-104-resize-event-firing-errors-in.html
		if(newH != lastH || newW != lastW){
			editSize("height", newH - 450);
			editSize("width", newW - 100);
			lastH = getH();
			lastW = getW();
		}
	};
	attachEvent(window, "load", function(){
		resize();
		attachEvent(window, "resize", resize);
	});	
})();
