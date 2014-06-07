// ==UserScript==
// @name   Search YouTube From Google
// @author   Jake Kasprzak
// @namespace     http://jake.kasprzak.ca
// @version	0.1.3
// @description   Adds a button to Google to allow searching within www.youtube.com. 
// @include       http://www.google.tld/
// @include       https://www.google.tld/
// @include      http://www.google.tld/firefox*
// @include      https://encrypted.google.com/webhp*
// ==/UserScript==

//This can actually be used to search within any site specified. See the addTheButton section for details
(function(){

	//addTheButton: Takes the web form for Google searches and the name of the form, to do the actual work in adding the button
	//this is a separate function, so that it can be adjusted to work with different forms at a later time, and to simplify the main function that calls this one
	function addTheButton(theForm, formName) {
		
		var target = theForm.elements.namedItem('btnG');
		if (target) {
			
			//change what is stored in this variable to name of website of choice (this is what gets displayed in button for searching specific sites)
			var nameOfSite = "YouTube";
			
			var buttonTitle = "Search " + nameOfSite;
			var button = document.createElement('input');
			button.setAttribute('type', 'button');
			button.setAttribute('value', buttonTitle);
			button.setAttribute('style', 'margin-left:0.25em');
			
			//the website address also needs to be modified in this next line to search different websites
			button.setAttribute('onclick', "var el=document.forms['" + formName + "'].q; var thisForm=document.forms['" + formName + "']; el.value=el.value+' site:www.youtube.com'; thisForm.submit()"); 
				
			button.setAttribute('class', 'lsb');
	
			target.parentNode.insertBefore(button, target.nextSibling);
			
		}
	
	} //addTheButton

	//determine whether or not the user is on the main Google search page
	//if so, call the addButton function
	var formF = document.forms.namedItem('f');
	if (formF) {
		
		var formName = 'f';
		addTheButton(formF, formName);
	
	}

})();