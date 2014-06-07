// ==UserScript==
// @author 		Vasil Martinov
// @name        MW WooGoo Link
// @namespace   MW2
// @version     19
// @include         http*://*.facebook.com/*
// @grant      none
// ==/UserScript==
if(window.location.href.indexOf('apps.facebook.com') > -1) {

	var reqs = new Array();
	var found = false;
	var txt = null;

	function inArray(needle, haystack) {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	}

	function fillList(txtarea, links_array, add_num) {
		txt.value = "";
		for(i = 0; i < reqs.length; i++)  {
			if(add_num) {
			txt.value += (i+1)+". " + reqs[i] + "\n";
			} else {
				txt.value +=  reqs[i] + "\n";
			}
		}
	}
	
	window.addEventListener('DOMSubtreeModified', function(){
		var container = document.getElementById('preview_container');
		if(container && !document.getElementById('accept_link')) {
			txt = document.createElement('TEXTAREA');
			txt.id = "accept_link";
			txt.cols = 210;
			txt.rows = 12;
			txt.setAttribute('wrap', 'off');
			container.insertBefore(txt, container.firstChild);
			
			var b = document.createElement('INPUT');
			b.type = 'BUTTON';
			b.value = 'Clear Numbers';
			b.addEventListener('click', function(e){
				fillList(txt, reqs, false);
			}); 
			container.insertBefore(b, container.firstChild);
			var b2 = document.createElement('INPUT');
			b2.type = 'BUTTON';
			b2.value = 'Add Numbers';
			b2.addEventListener('click', function(e){
				fillList(txt, reqs, true);
			}); 
			container.insertBefore(b2, container.firstChild);

		}
			var a_arr = document.getElementsByTagName('A');
			for(var i = 0; i < a_arr.length; i++) {
				if(a_arr[i].parentNode.parentNode.className == 'uiAttachmentTitle') {
					 if(!inArray(a_arr[i].href, reqs)) {
						reqs.push(a_arr[i].href);
					 }
				}
			}
			
			fillList(txt, reqs, true);
	});
	
	
	
}