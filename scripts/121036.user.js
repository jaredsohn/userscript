// ==UserScript==
// @id             eten.suco.greasemonkey.AlezzaCleaner
// @name           Alezza Invisible Span Cleaner
// @description    Xóa các span ẩn trong source của alezza.com
// @version        2011.12.21
// @author         Nguyen Hoa
// @homepage       http://tienganhvn.com
// @include        http://alezaa.com/me/library.php*
// @include        http://www.alezaa.com/me/library.php*
// ==/UserScript==

(function(){
	function getStyle(elem,styleProp) {
		if (elem.currentStyle) return elem.currentStyle[styleProp];
		if (window.getComputedStyle) return document.defaultView.getComputedStyle(elem,null).getPropertyValue(styleProp);
		if (elem.getStyle) return elem.getStyle(styleProp);
		return elem.style[styleProp];
	}

	function clean(){
		var reader = document.querySelector("#book-reader");
		if(!reader) return;
		
		var spans = reader.querySelectorAll("span");
		if(!spans) return;
		
		var count=0;
		for(var i=0;i<spans.length;i++) {
			if (getStyle(spans[i], "display") == "none") {
				spans[i].innerHTML = "";
				count++;
			}
		}
	}
	
	function onLoad(){
		var controls = document.querySelector("#controls");
		if(!controls){
			setTimeout(onLoad, 1000);
			return;
		}
		controls.innerHTML = '<div id="suco_btnClean" class="mbutton" title="Xóa">Xóa</div>' + controls.innerHTML;
		controls.querySelector('#suco_btnClean').onclick = function(){ clean(); return false; };
	}
	document.addEventListener("DOMContentLoaded", onLoad, false);
})();