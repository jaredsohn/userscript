// ==UserScript==
// @name		Salesforce Case Topic Relocator
// @namespace	http://www.cornburgers.com
// @description	Places a Case's Topic and Status next to the Case number in Salesforce Cases
// @author		B. DeLancey
// @include		https://*.salesforce.com/*
// ==/UserScript==

function getElementByClass(theClass) {
	
	// Read the contents of the Topic and Status DIVs into two variables
	var topicTextString = document.getElementById('cas14_ileinner').innerHTML;
	var statusTextString = document.getElementById('cas7_ileinner').innerHTML;
	
	//Create Array of All DIV Tags
	var allDIVs=document.getElementsByTagName('div');

	//Loop through all DIVs using a for loop
	for (i=0; i<allDIVs.length; i++) {

		//Run the following code on all DIVs with the specified class name
		if (allDIVs[i].className==theClass) {

			// Create a div with the Satus and Topic text just before the 'ptBreadcrumb' div at the top of the page				
			var mainContent = allDIVs[i];
			var topicTextDiv = document.createElement('div');
			mainContent.parentNode.insertBefore(topicTextDiv, mainContent);	
			topicTextDiv.innerHTML='- ' + statusTextString + ' - ' + topicTextString;
			
			// Style inserted DIV to align it with the Case number
			topicTextDiv.style.position='relative';
			topicTextDiv.style.margin='-27px 0px 0px 157px';
			topicTextDiv.style.fontSize='23px';
			topicTextDiv.style.fontWeight='500';
			break;
		}
	}
}

getElementByClass('ptBreadcrumb');