// ==UserScript==
// @name       EU Cookie Warning Remover
// @version    1.1.0
// @description  removes cookie warnings from websites
// @include    http*://*
// @copyright  2013, Karol Karwat
// ==/UserScript==

window.addEventListener('load', function() {
	var elems = Array.prototype.slice.call(document.getElementsByTagName("span"));
	elems = elems.concat(Array.prototype.slice.call(document.getElementsByTagName("div")));

	var iframes = document.getElementsByTagName('iframe');
	for(var i=0; i < iframes.length; ++i) {
		if(iframes[i].contentDocument != null) {
			elems = elems.concat(Array.prototype.slice.call(iframes[i].contentDocument.getElementsByTagName("span")));
			elems = elems.concat(Array.prototype.slice.call(iframes[i].contentDocument.getElementsByTagName("div")));
		}
	}

	for(var i = 0; i < elems.length; i++){
		var elem = elems[i];
		var id = elem.id;
		if(typeof id != "undefined"){
			id = id.toLowerCase();
			if(id.indexOf("cookie") >= 0) {
				elem.style.display = 'none';
			}
		}
		
		var className = elem.className;
		if(typeof className != "undefined"){
			className = className.toLowerCase();
			if(className.indexOf("cookie") >= 0){
				elem.style.display = 'none';
			}
		}
	}
}, false);