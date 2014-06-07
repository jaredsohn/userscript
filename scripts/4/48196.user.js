// ==UserScript==
// @name           Google - Provide Date Range
// @namespace      http://userscripts.org/users/filius
// @include        http://www.google.co.*
// @include        http://www.google.com.*
// @include        http://www.google.com/*
// @description	Provides a selector on Google search pages that allows you to specify the age of your results
// @descriptions  v 1.1 - decided to remove the default Google date range selector as mine has more options
// @descriptions  v 1.2 - made it so that only one space ever occurs on either side of the selector
// ==/UserScript==

// var searchForm = document.getElementById("tsf");
var searchForms = document.getElementsByTagName('form');

if (searchForms.length > 0) {

	// loop through all search forms 
	for (var k = 0; k < searchForms.length; k++)	{

		// ensure we have the search form
		if (searchForms[k].action.search(/search/) !== -1) {
			var searchForm = searchForms[k];
			
			// check no selector exists
			for (var i = 0; i < searchForm.length; i++)	{
				var formElement = searchForm.elements[i];
				if (formElement.name === 'as_qdr') {
					// date selector already exists; remove it because mine has more options
				    // return false; //uncomment this to just use the google version
				    var discardedElement = formElement.parentNode.removeChild(formElement);
				    i--; // so we don't miss out on the button
				} else if (formElement.name === 'btnG') {
					var searchButton = formElement;
				}
			}	

			// create our own selector
			var newSelector = document.createElement("select");
			newSelector.name = "as_qdr";

			// options for date range selector
			var optionsLabels = ['anytime', 'past 24 hours', 'past week', 'past month', 'past year', 'past 2 years', 'past 3 years', 'past 15 years'];
			var optionsValues = ['all', 'd', 'w', 'm', 'y', 'y2', 'y3', 'y15'];
			
			for (var j = 0; j < optionsLabels.length; j++) {
				var newOption = document.createElement("option");
				var newText = document.createTextNode(optionsLabels[j]);
				newOption.appendChild(newText);
				newOption.value = optionsValues[j];
				newSelector.appendChild(newOption);		
			}

			// insert our own selector
			var parentDiv = searchButton.parentNode;
			parentDiv.insertBefore(newSelector, searchButton);
			
			// fix up spacing
			var innerHTML = parentDiv.innerHTML;
			innerHTML = innerHTML.replace(/[&nbsp;| ]*<select/, '&nbsp;<select');
			innerHTML = innerHTML.replace(/select>[&nbsp;| ]*/, 'select>&nbsp;');
			parentDiv.innerHTML = innerHTML;
		}
	}		
}
