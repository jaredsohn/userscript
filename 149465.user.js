// ==UserScript==
// @name           Online Image Map Editor Exchanger
// @namespace      http://userscripts.org/scripts/show/149465
// @include        *.maschek.hu/imagemap/imgmap*
// @grant          GM_addStyle
// ==/UserScript==

document.getElementById("maindivcontainer").style.width = "1850px";
document.getElementById("maindiv").style.width = "1843px";
document.getElementById("div_content").style.width = "1603px";
document.getElementById("pic_container").style.height = "450px";
GM_addStyle("												\
	.img_coords {											\
		width:			1000px;								\
	}														\
	.fieldset_off {											\
		border-bottom: 	2px groove #F0F0F0 !important;		\
		border-right:	2px groove #F0F0F0 !important;		\
	}														\
");



//*** STATISTICS ***//
// Chars (exclude spaces): 680
// Chars (include spaces): 848
// Chars (Chinese): 0
// Words: 83
// Lines: 29