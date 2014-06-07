// ==UserScript==
// @name           EmoBucket Image Fix
// @namespaces     Cake
// @include        *emobucket.com/displayimage*
// @include        *emobucket.com/thumbnails.php?album=lastupby*
// @version        0.8
// ==/UserScript==
var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace('normal_','');
	image_element.src = image_element.src.replace('thumb_','');
}