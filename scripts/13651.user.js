// ==UserScript==
// @name           Weblancer Current Bids in Menu
// @namespace      
// @description    add a query string to side menu to show current bids only
// @include        http://weblancer.*/user/*
// ==/UserScript==



function bidsinit(){
	var menu  = document.getElementById('acc_left_box');
	var links = menu.getElementsByTagName('a');
	for(var i =0; i < links.length; i++){
		if (links.item(i).href.indexOf('user/bids.html') > 0){
				links.item(i).href = links.item(i).href + '?tab=active';
		}
	}

}

bidsinit();