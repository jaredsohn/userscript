// ==UserScript==
// @name        Game Feed Link
// @namespace   GFL
// @version     1
// ==/UserScript==

if(window.location.href.indexOf('https://www.facebook.com/dialog/feed') > -1) {
	
	
	function addLink() {
		var a_arr = document.getElementsByTagName('A');
		var found = false;
		for(var i = 0; i < a_arr.length; i++) {
			if(a_arr[i].href.indexOf("apps.facebook.com") > -1) {
				var lnk = a_arr[i].href;
				if(!found) {
					txt.value = txt.value + a_arr[i].href + "\n";
					found = true;
				}
			}
		}
		
	}
	
	var container = document.getElementById('preview_medium');
	
	var txt = document.createElement('TEXTAREA');
	txt.cols = 80;
	container.insertBefore(txt, container.firstChild);
	addLink();
	
	
}