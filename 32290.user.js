// ==UserScript==
// @name   Search YouTube From Google
// @author   Jake Kasprzak
// @namespace     http://jake.kasprzak.ca
// @description   Adds a button to Google to allow searching within www.festzeit.ch. 
// @include       http://www.google.*
// @include       http://google.*
// @exclude      http://*.google.*/advanced*
// ==/UserScript==


//This can actually be used to search within any site specified. See the addTheButton section for details
(function(){

	//addTheButton: Takes the web form for Google searches and the name of the form, to do the actual work in adding the button
	function addTheButton(theForm, formName) {
		
		
		var target = theForm.elements.namedItem('btnG');
		if (target) {
			
			//change what is stored in this variable to name website of choice (this is what gets displayed in button for searching specific sites)
			var nameOfSite = "festzeit.ch";
			
			var buttonTitle = "Suche auf " + nameOfSite;
			var button = document.createElement('input');
			button.setAttribute('type', 'button');
			button.setAttribute('value', buttonTitle);
			button.setAttribute('style', 'margin-left:0.25em');
			
			//the website address also needs to be modified in this next line to search different website
			button.setAttribute('onclick', "var el=document.forms['" + formName + "'].q; var thisForm=document.forms['" + formName + "']; el.value=el.value+' site:www.festzeit.ch'; thisForm.submit()"); 
				
			
			target.parentNode.insertBefore(button, target.nextSibling);
			
		}
	
	
	} //addTheButton


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