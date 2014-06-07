/**
* @package: Facebook My Zoo Animal Buyer
* @authors: Justin Bowers (aquaphase)
* @created: February 17, 2010
*/
// ==UserScript==
// @name           My Zoo Animal Buyer
// @namespace      http://www.flamingkitty.com/
// @description    This script buys all possible animals in one swoop for "myownzoo"
// @include        http://apps.facebook.com/myownzoo/exhibits.php*
// @include        http://apps.facebook.com/myownzoo/*
// @include	   http://apps.facebook.com/myownzoo/exhibits.php?refresh*
// ==/UserScript==
window.addEventListener("load", function() {
	idparts = document.getElementsByTagName("form")
	animalforms = new Array();
	for(i=0;i<idparts.length;i++){
		if(idparts[i].elements.namedItem("myzoo_submit")){
			animalforms.push(idparts[i]);	
		}
	}
	
			if(animalforms[0].elements.namedItem("myzoo_qid")){
				animalforms[0].elements.namedItem("myzoo_qid").selectedIndex=4;
			}
			animal = animalforms[0].elements.namedItem("myzoo_oid").value;
			//alert(animal);
			var newP = document.createElement("p");
			var txt = " " + animal;
			var newT = document.createTextNode(txt);
			document.getElementById("app49572793475_main_msgbox").appendChild(newT);
			//document.all.app49572793475_main_msgbox.innerHTML += animal;
			animalforms[0].submit();
			//stop;
		
}, true);