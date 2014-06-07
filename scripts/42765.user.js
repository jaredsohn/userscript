// ==UserScript==
// @name           Google Code Search Button on google.com
// @namespace      http://userscripts.org/users/60414
// @description    Adds a "Code Search" button to google to allow you to use googles "Code Search" from the standard google page.
// @include        http://www.google.com/*
// @include        http://google.com/*
// ==/UserScript==
(function(){

	function addTheButton(theForm, formName) {
		
		var target = theForm.elements.namedItem('btnG');
		if (target) {
						
			var buttonTitle = "Code Search";
			var button = document.createElement('input');
			button.setAttribute('type', 'button');
			button.setAttribute('value', buttonTitle);
			button.setAttribute('style', 'margin-left:0.25em');
			
      button.setAttribute('onclick', "document.forms['" + formName + "'].action = '/codesearch'; document.forms['" + formName + "'].submit()"); 
			target.parentNode.insertBefore(button, target.nextSibling);
		}
	} 

	//determine whether or not the user is on the main Google page or one that lists search results
	//then pass this information to the function that adds the button, as it needs this information
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