// ==UserScript==
// @name           bonjourMadame
// @namespace      http://www.userscript.org
// @description    Navigation amelioree
// @include        http://www.bonjour*
// ==/UserScript==


var i = (document.location.href).substring( (document.location.href).lastIndexOf( "/" )+1,100 );


function KeyCheck(e){
	if(i==0){
		i++;
	}
	if(e.keyCode == 37){
		
		i++;
		url = "/page/"+(i);
		window.location = url;
		
	}else if(e.keyCode == 39){
		// alert("droite");
		i--;
		url = "/page/"+(i);
		window.location = url;
		
	 }
}
function KeyChecked(e){
	alert(e.keyCode);
}
window.addEventListener('keydown', KeyCheck, true);