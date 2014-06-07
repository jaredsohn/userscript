// ==UserScript==
// @name           Quita banner - VFinal
// @namespace      Mcat
// @description    Quita los anuncios de seguimeteo. Version con tablas
// @include        http://seguimeteo.forumcommunity.net/
// ==/UserScript==
var a = document.getElementsByTagName("div");
for(var i=0;i<a.length;i++){
	
	if(a[i].className == "footer"){
		
		a[i].innerHTML = "";
	}
}