// ==UserScript==
// @name           BindF5
// @namespace      http://dan.shearmur.co.uk/bindf5/
// @description    Use F5 to refresh, specifically for Mac OS X
// @include        *
// ==/UserScript==
(function(){
	
	var keyNos = [17,116];
	var ctrl = false;
	
	function capture(event) {
		if(event.keyCode == keyNos[0]) {
			ctrl = true;
		}
	}
	
	function release(event){
		if(event.keyCode == keyNos[1]) {
			if(ctrl == true) {
				top.location.reload(true);
			} else {
				top.location.reload(false);
			}
			ctrl = false;
		}
	}
	
	document.documentElement.addEventListener("keydown", capture, true);
	document.documentElement.addEventListener("keyup", release, true);
})();