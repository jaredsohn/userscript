/*
** Author: Nathan Youngblood
** Position: Bethel University Undergraduate Student
** All rights reserved
**
** Greasemonkey Script: Save Form Data
** Version: 0.15
** Description: Allows the user to save the data in a form
**              into a JSON string. The JSON string can be
**              used to fill out the form if the form data
**              gets erased.
** Known Issues: Does not save radio button information. --Fixed
** 				 Does not save checkbox information. --Fixed
*/

// ==UserScript==
// @name           Save Form Data
// @namespace      www.mathcs.bethel.edu/~younat
// @description    Save the data in a form for future use.
// @include        http://www.colorado.edu/physics/Web/reu/reu_app2010.html
// ==/UserScript==

///////////////////////////////////////////////////////////////
// Function used with permission from www.quirksmode.org:
// http://www.quirksmode.org/dom/getElementsByTagNames.html
///////////////////////////////////////////////////////////////
function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

///////////////////////////////////////////////////////////////
// The getFormData function puts the form data into name-value
// pairs in a JSON-formatted string.
///////////////////////////////////////////////////////////////
function getFormData() {
	var inputs = getElementsByTagNames('input,textarea,select');
	var outputString = "";
	for(var i=0; i<inputs.length; i++) {
		if(inputs[i].type != "radio" && inputs[i].type != "checkbox") {
			if(inputs[i].name != "" && inputs[i].value != "") {
			    outputString += '"' + inputs[i].name + '":"' 
			    					+ inputs[i].value + '",';
			}
		}
		else {
			if(inputs[i].checked) {
				outputString += '"' + inputs[i].name + '":"' 
			    					+ inputs[i].value + '",';
			}
		}
	}
	alert("Copy the following to save the form data:\n\n" 
		+ '{'+outputString+'"finished":"true"}');
	return;
}

///////////////////////////////////////////////////////////////
// The insertFormData function receives form data in a JSON
// string variable. The string is in the form:
//          {"var1":"value1", "var2":"value2",...}
// Radio and checkbox inputs have to be dealt with uniquely
// and have special cases.
///////////////////////////////////////////////////////////////
function insertFormData(JSONData) {
	var dataObj = JSON.parse(JSONData);
	var inputs = getElementsByTagNames('input,textarea,select');
	var elemName = "";
	for(var i=0; i<inputs.length; i++) {
		elemName = inputs[i].name;
		if(typeof(dataObj[elemName]) != "undefined") {
			if((inputs[i].type == "radio" || inputs[i].type == "checkbox")
			   && inputs[i].value == dataObj[elemName])
				inputs[i].checked = true;
			else
				inputs[i].value = dataObj[elemName];
		}
	}
}

///////////////////////////////////////////////////////////////
// The getUserInput function prompts the user for a string. If
// the user enters "save", they will be given a JSON-encoded
// string that can be used to recover the data at a later time.
// If the user enters a JSON-encoded string, the string is
// parsed and entered into the form.
///////////////////////////////////////////////////////////////
function getUserInput() {
	var userPrompt = prompt("Type \"save\" to save the form data to a JSON string or paste "
					  + "a JSON string into the prompt to recover old form data","");
					  
	var jsonRegex = /^\{.*\}$/;
	
	if(userPrompt == "save")
		getFormData();
	else if(jsonRegex.test(userPrompt))
		insertFormData(userPrompt);
	else
		alert("That is not a valid entry.");
}

// Add a link to the page so the user can save the form...
var linkElem = document.createElement("span");
	linkElem.setAttribute("style", "float:right;margin:25px;text-decoration:underline;cursor:pointer;");
var txt = document.createTextNode("Click here to save form data.");
	linkElem.appendChild(txt);
	
document.body.appendChild(linkElem);

linkElem.addEventListener("click", getUserInput, true);