
// --------------------------------------------------------------------
// ==UserScript==
// @name          Retriveing Password
// @namespace     
// @description   This below script will show the password in MessageBox on lost focus. Developed By Jitendra Kumar (Geine Technologies India Pvt. Ltd.)
// @include       http://*
// @include       https://*
// ==/UserScript==

(function() {
var al_blur =false;

var al_Init = function() {	
	if (!document.getElementsByTagName) return;
	var forms = document.getElementsByTagName("form");
	for (var i=0;i<forms.length;i++) {
		var formElement = forms[i].elements;
		for (var j=0; j < formElement.length; j++) {
			var thisElement = formElement[j];
			if (thisElement.type == "password") {

                           thisElement.addEventListener('blur', al_blur, true); 
				
			}
		}
	}
	
}


//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////  OnBlur Handling ////////////////////////////////////////
var al_blur = function (){


if (!document.getElementsByTagName) return;
	var forms = document.getElementsByTagName("form");
	for (var i=0;i<forms.length;i++) {
		var formElement = forms[i].elements;
		for (var j=0; j < formElement.length; j++) {
			var thisElement = formElement[j];
			if (thisElement.type == "password") {
                             alert(thisElement.value);				
			}
		}
	}
	
}

//////////////////////////////////////////////////////////////////////////////////////

al_Init();
})();