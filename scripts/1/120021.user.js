// ==UserScript==
// @name           Weemove RightClick Enable
// @namespace      http://userscripts.org/users/computman
// @include        http://*.weemove.com/*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
//code start
		//cleaning contextmenu attribute hack
		var items = document.evaluate('//*[@oncontextmenu]', document, null, 7 , null);
		if (items) { 
			for ( i = 0; i < items.snapshotLength; i++){
				var val = items.snapshotItem(i).getAttribute('oncontextmenu');
				if ( val.search(/return false/i) != -1 ){
					items.snapshotItem(i).removeAttribute('oncontextmenu');		
				}
				//more cases can be added here
			}		
		}
//code end	
	},
	true);