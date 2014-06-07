// ==UserScript==
// @name          auto login
// @include       http://*
// @include       https://*
// ==/UserScript==

(function() {
var al_KeyPressed = false;

var al_Init = function() {
	var passfield = false;
	if (!document.getElementsByTagName) return;
	var forms = document.getElementsByTagName("form");
	for (var i=0;i<forms.length;i++) {
		var formElement = forms[i].elements;
		for (var j=0; j < formElement.length; j++) {
			var thisElement = formElement[j];
			if (thisElement.type == "password") {
				//to prevent submit to stupid site which put fake login / pass value
				if (thisElement.value != thisElement.defaultValue) {
				    passfield = true;
					thisElement.addEventListener('keypress', al_KeyPress, true); 
				}
			}
		}
	}
	if (passfield)
		setTimeout(al_CheckPass, 10);
}

var al_KeyPress = function (){
	al_KeyPressed = true;
}

var al_CheckPass = function () {
	if (!al_KeyPressed) {
		if (!document.getElementsByTagName) return;
		var forms = document.getElementsByTagName("form");
		for (var i=0;i<forms.length;i++) {
			var formElement = forms[i].elements;
			for (var j=0; j < formElement.length; j++) {
				var thisElement = formElement[j];
				if (thisElement.type == "password") {
					if(thisElement.value.length>1){
						submit = false;
						for (var input, k=0; input=formElement[k]; k++)
							if (input.type == "submit")
								submit = input;
					
						if (submit) {
							submit.click();
						} else {
							forms[i].submit();
						}
			
						return;
					}
				}
			}
		}
		setTimeout(al_CheckPass, 100);
	}
}
	
al_Init();
})();