// ==UserScript==
// @name           KatzBabes hack
// @namespace      all
// @description    Enables context menu (right clicking), dragging, and seelecting of images
// @include        http://www.katzbabes.com/*
// @include        http://katzbabes.com/*
// ==/UserScript==
GM_addStyle("img#photo2 { display: none; }");
window.addEventListener(
	'load',
	function() {
		//Allow Context Menu
		var items = document.evaluate('//*[@oncontextmenu]', document, null, 7 , null);
		if (items) { 
			for ( i = 0; i < items.snapshotLength; i++){
				var val = items.snapshotItem(i).getAttribute('oncontextmenu');
				if ( val.search(/return false/i) != -1 ){
					items.snapshotItem(i).removeAttribute('oncontextmenu');		
				}
			}
		}
		//Allow drag
		var drag = document.evaluate('//*[@ondragstart]', document, null, 7 , null);
		if (drag) { 
			for ( i = 0; i < drag.snapshotLength; i++){
				var val = drag.snapshotItem(i).getAttribute('ondragstart');
				if ( val.search(/return false/i) != -1 ){
					drag.snapshotItem(i).removeAttribute('ondragstart');		
				}
			}		
		}
		//Allow select
		var selec = document.evaluate('//*[@onselectstart]', document, null, 7 , null);
		if (selec) { 
			for ( i = 0; i < selec.snapshotLength; i++){
				var val = selec.snapshotItem(i).getAttribute('onselectstart');
				if ( val.search(/return false/i) != -1 ){
					selec.snapshotItem(i).removeAttribute('onselectstart');		
				}
			}		
		}
	},
	true);