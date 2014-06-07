// ==UserScript==
// @name           Right to click-select-drag
// @namespace      http://userscripts.org/
// @description    This script restores your right to Right-Click, select text and drag on any website. Extended version of Right to "Right-Click" http://userscripts.org/scripts/source/33732.user.js
// @include        *
// ==/UserScript==

/* 

=== NOTE ===

Added support for the following properties: onselectstart and ondragstart, oncontextmenu was already implemented

There was no license given, assuming/using GPL now.

==== ORIGINAL NOTE ==== 

The following note came with Right to "Right-Click" of user rahul286:

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
            var proptoremove = ["oncontextmenu", "onselectstart", "ondragstart"];
			for ( var i = 0; i < items.snapshotLength; i++){
                
                for (var j=0; j < proptoremove.length; j++){
					var val = items.snapshotItem(i).getAttribute(proptoremove[j]);
					if ( val.search(/return false/i) != -1 ){
						items.snapshotItem(i).removeAttribute(proptoremove[j]);		
				    }
                }
				//more cases can be added here
		     }		
	    }
//code end	
},
true);
