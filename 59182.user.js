// ==UserScript==
// @name         	Nasza-Klasa
// @namespace    	Tomasz Mieczkowski
// @description  	Bez reklam
// @date         	2009-10-05
// @version     	0.1
// @include			http://nasza-klasa.*/*
// @include     	http://www.nasza-klasa.*/*
// ==/UserScript==

var leftSide = document.getElementById('content_boxes');
var setLeftS = leftSide.getElementsByTagName('center');
for (var i = 0; i < setLeftS.length; i++)
{
	var reklama = setLeftS.item(i);
	if (reklama != undefined){
		reklama.style.display = 'none';
	}
}

GM_addStyle(
'#content_banner { display: none !important; }' 	+
'#promo_entry_content { display: none !important; }' 	+
'#last_photos_box_ajax { display: none !important; }' 	+
'#page_menu_aukcje { display: none !important; }' 	+
'#contest_box { display: none !important; }' 		+
'#main_gifts { display: none !important; }' 		+
'#allegro_box { display: none !important; }' 		+
'#ad_pgr { display: none !important; }' 			+ 
'#sledzik_box { display: none !important; }' 		+ 
'.top_ad { display: none !important; }' 			+
'.invite_box { display: none !important; }' 		+
'.partners_box { display: none !important; }' 		+ 
'.main_column_left { width: 100% !important; }' 	+ 
'.main_column_right { display: none !important; }' 
);