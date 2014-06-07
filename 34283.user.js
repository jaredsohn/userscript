// ==UserScript==
// @name          cccc
// @namespace     cccc
// @description    ccc
// @include        *
// ==/UserScript==

/* 

==== IMPORTANT NOTE ==== 

More anti right-clicks hacks will be added soon.
As of now this script takes care of most famous and safe way so it should work on all sites.

We can not blindly set "oncontextmenu" to null or "return true" as some sites provides useful functions by overriding browser context-menu.
 
If you find a site where right-click is disabled and this script is failing to work, 
please leave a comment at this scripts homepage.

I will try to update this script ASAP.
*/


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