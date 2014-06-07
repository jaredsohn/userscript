// ==UserScript==
// @name           ronikral digger
// @namespace      std
// @description    Larkinori ásóknak, jelzi ha szörny jön, és ha elfogyott az ásód. Ez éppen úgy működik, hogy meg kell hozzá tanulni a gyógyvarázst:D Ez azért van így mert azt figyeli, hogy mikor "jön" a "Koncentrálsz, majd elmondod a gyógyvarázst" felirat, sry:(
// @include        http://larkinor.index.hu/*
// ==/UserScript==


//EGY SZÖRNY FELÉD INDUL
	var y=document.getElementsByTagName("font");
	var sd=-1;
	for(var i=2; i<y.length; i++){
		if (y[i].innerHTML.indexOf("feléd indul")>0){
			sd=i;
		}
	}
	if (sd>-1) {
		alert("Egy szörny feléd indult!");
	}

//ELFOGYOTT AZ ÁSÓD
	var y=document.getElementsByTagName("font");

	var sdz=-1;
	for(var i=2; i<y.length; i++){
		if (y[i].innerHTML.indexOf("Koncentrálsz, majd elmondod a gyógyvarázst")>0){ 
			sdz=i;  
		}
	}
	if (sdz>-1) {
		alert("Elfogyott az ásód!");
	}