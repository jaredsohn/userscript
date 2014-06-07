// ==UserScript==
// @name          Google Tryag-Forums Search
// @author        G0D-F4Th3r
// @namespace     http://www.tryag.com/cc
// @description   Search .::TRYAG-FORUMS::. From Google
// @include       http://www.google.*
// @include       http://google.*
// @exclude      http://*.google.*/advanced*
// ==/UserScript==

(function(){
	function addTheButton(theForm, formName) {
		var target = theForm.elements.namedItem('btnG');
		if (target) {
			var buttonTitle = ".::TRYAG-FORUMS::.";
			var button = document.createElement('input');
			button.setAttribute('type', 'button');
			button.setAttribute('value', buttonTitle);
			button.setAttribute('style', 'margin-left:0.25em');
			button.setAttribute('onclick', "var el=document.forms['" + formName + "'].q; var thisForm=document.forms['" + formName + "']; el.value=el.value+' site:tryag.com'; thisForm.submit()");
			target.parentNode.insertBefore(button, target.nextSibling);
		}
	}
	var formGS = document.forms.namedItem('gs');
	var formF = document.forms.namedItem('f');
	if (formGS || formF) {
		
		
		if (formGS) {
			var formName = 'gs';
			addTheButton(formGS, formName);
		}
		if (formF) {
			var formName = 'f';
			addTheButton(formF, formName);
		}
		
	}



})();