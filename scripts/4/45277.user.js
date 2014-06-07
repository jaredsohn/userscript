// ==UserScript==
// @name           Text Field Taggize
// @namespace      http://userscripts.org/users/23652
// @description    Turns text fields into a nice, tag appropriate field separated by commas using ctrl+alt+c
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

if(boxes=document.evaluate("//input[@type='text'] | //textarea",document,null,6,null))
for(var i=boxes.snapshotLength-1; (item=boxes.snapshotItem(i)); i--) {
	item.addEventListener('keydown', function(e){
		if(e.ctrlKey&&e.altKey&&e.keyCode==67) e.target.value=e.target.value.toLowerCase().replace(/-/g,'').replace(/\s\s/g,' ').replace(/\s/g, ',');
	}, false);
}