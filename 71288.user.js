// ==UserScript==
// @name           asp.net_remove_footer
// @namespace      http://minhajuddin.com/
// @description    this script removes the overlapping footer from http://asp.net
// @include        http://www.asp.net/
// ==/UserScript==
var divs = document.getElementsByTagName("div");
for(var key in divs){
	var div = divs[key];
	if(typeof(div.getAttribute) !== "function") continue;
	var class_name = div.getAttribute('class');
	if(class_name == null) continue;
	if(class_name == 'footer_container'){
		div.setAttribute('class', 'hidden');
	}
}