// ==UserScript==
// @name           Form-Elements
// @namespace      pm
// @description    Displays the names and values of form items on a page in such a way they can be copied and pasted elsewhere.  Useful for developers.
// ==/UserScript==



function getSelectOptions() {



	var selectsOnPage = document.getElementsByTagName("select");
	var resultString = "<div><strong>Select Info:</strong>";
	var additionalString = "";


		
	for (var j = 0; j < selectsOnPage.length; j++) {
					
		var optionsInSelect = selectsOnPage[j].getElementsByTagName("option");
		additionalString = "";
		
				resultString = resultString + "<br/><strong>" + selectsOnPage[j].name + "</strong><br />";
				
				for (i=0; i < optionsInSelect.length; i++) {
		
					additionalString = additionalString + optionsInSelect[i].value + " - " + optionsInSelect[i].text + "<br />";

				}

				resultString = resultString + additionalString;
	}
		


	return resultString + "</div>";

	
}


function getInputOptions() {

	var inputsOnPage = document.getElementsByTagName("input");
	var resultString = "<div><strong>Input Info:</strong><table>";
	var additionalString = "";

	for (var j = 0; j < inputsOnPage.length; j++) {
		
		resultString = resultString + "<tr><td>" + inputsOnPage[j].id + "</td><td>" + inputsOnPage[j].name + "</td><td>" +  inputsOnPage[j].type + "</td>";

	}

	return resultString + "</table></div>";

}


function getLabels() {

	var labelsOnPage = document.getElementsByTagName("label");
	var inputsOnPage = document.getElementsByTagName("input");
	var resultString = "<div><strong>Labelled Elements:</strong><table>";
	var labelContent = "";
	var relatedItemID = 0;
	var relatedItem = "";
	
	for (var i = 0; i < labelsOnPage.length; i++) {

		labelContent = labelsOnPage[i].innerHTML;
		relatedItemID = labelsOnPage[i].getAttribute('for');
		//var relatedItem = document.getElementById(labelsOnPage[i].getAttribute('for'));
		relatedItem = document.getElementById(relatedItemID);
		//var itemValue = relatedItem.text;

		resultString = resultString + "<tr><td>" + labelContent + " - " + relatedItem.value + "<td></tr>";

	}
	
	return resultString + "</table></div>"

}

function injectHTML(theString) {

	var newElement;
	/*var theBody = document.getElementsByTagName('body');

	if (theBody) {
		
		newElement = document.createElement('div');
		newElement.style.color = 'red';
		theBody[0].parentNode.insertAfter(newElement, theBody.nextChild);
	}*/

	var newContent = document.createElement("div");
	newContent.innerHTML = '<div style="text-align:left; position: absolute; top: 0; right:0; width:400px; margin: 5px; z-index:100; ' +
				'padding: 5px; background-color: #FFFFFF; border: 1px solid #000000;' +
    				'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
   				'font-size: 11px; font-family:arial; ' +
   				'color: #555555;" id="metainspector" ><p style="margin: 2px 0 1px 0;"> ' + theString +
				'</p></div>';

	document.body.insertBefore(newContent, document.body.firstChild);

}


injectHTML(getSelectOptions());

