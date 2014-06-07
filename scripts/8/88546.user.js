// ==UserScript==
// @name           Remember password
// @revision       0.2
// @author         Argaen
// @description    Offer a remember password option for sites that use autocomplete=off.
// @namespace      http://userscripts.org/users/214754
// @include        http://*
// ==/UserScript==

void(function() {
	var documentForms, formElements, i, j, form, element;

	documentForms = document.forms;
	for(i=0; i<documentForms.length; ++i){
		form = documentForms[i];

		if(form.onsubmit)
			form.onsubmit = "";
		if(form.attributes["autocomplete"])
			form.attributes["autocomplete"].value = "on";

		formElements = form.elements;
		for(j=0; j<formElements.length; ++j){
			element = formElements[j];
			if(element.attributes["autocomplete"])
				element.attributes["autocomplete"].value = "on";
		}
	}
})();
