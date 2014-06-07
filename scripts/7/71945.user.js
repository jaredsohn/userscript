// ==UserScript==
// @name           fbzw pet script
// @description    pet trainer script for lazy clicker
// @include        http://www.zedwars.com/fb/pets.php*
// ==/UserScript==

var allHTMLTags = new Array();

//Create Array of All HTML Tags
var allHTMLTags=document.getElementsByTagName("*");

//Loop through all tags using a for loop
for (i=0; i<allHTMLTags.length; i++) {

//Get all tags with the specified class name.
	if (allHTMLTags[i].className=="success_messages") {
	
		var hint = allHTMLTags[i].textContent;
		
		var contents = document.getElementById("content");
		var links = contents.getElementsByTagName("a");
		var link = links[0].href;
		var idPos = link.indexOf('id');
		var id = link.substring(idPos,link.length);
		var doPos = link.indexOf('do');
		link = link.substring(0,doPos+3);
		
		if(hint.match('.*Speed')){
				location.href = link + 'train_spe&' + id;
				return;
			}else if(hint.match('.*Power')){
				location.href = link + 'train_pwr&' + id;
				return;
			}else if(hint.match('.*Strength')){
				location.href = link + 'train_str&' + id;
				return;
			}else if(hint.match('.*Intelligence')){
				location.href = link + 'train_int&' + id;
				return;
			}
	
	
	}
}