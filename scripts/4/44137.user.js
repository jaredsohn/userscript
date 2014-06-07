// ==UserScript==
// @name           Form Details
// @namespace      Sean Robitaille
// @description    Shows the values of form elements. Very similar to the firefox extension "Web Developer"
// @include        http*://*
// @last update    5/21/09
// ==/UserScript==

// --------- Customize Colors ---------- //

var elementColor = "black";				// Text color of labels 			(default: #000000)
var elementBackground = "#FFFFA3";		// Background color of labels 		(default: #FFFFA3)
var elementBorder = "#F9CB6F";			// Border color of labels 			(default: #F9CB6F)
var elementNameColor = "#991100";		// Color of name type	 			(default: #991100)
var elementIDColor = "#3333FF";			// Color of ID type					(default: #3333FF)
										//
var formElementColor = "black";			// Text color of form labels 		(default: #000000)
var formActionColor = "#009900";			// Text color of form action 	(default: #009900)
var formMethodColor = "red";			// Text color of form method 		(default: red)
var formElementBG = "#FFD175";			// Background color of form labels 	(default: #FFD175)
var formBorder = "#FF0000";				// Border color of form 			(default: #FF0000)
var formFontSize = "10px";				// Font size of form 				(default: 10px)
var formFontFam = "verdana";			// Font family of form 				(default: verdana)

// ------------------------------------ //

var allInputs, allFormTextareas, allFormSelects, thisElement, thisElementType, thisElementTag, thisElement_id, thisElement_name, thisElement_value, new_element, newElementInner, showVal, showSize;
var allForms, new_formElement, new_formDIV;
allForms = document.getElementsByTagName("form");
allFormInputs = document.getElementsByTagName("input");
allFormTextareas = document.getElementsByTagName("textarea");
allFormSelects = document.getElementsByTagName("select");
function show_forms() {
	for (var i = 0; i < allForms.length; i++) {
		thisForm = allForms[i];
		thisForm_action = thisForm.action;
		thisForm_method = thisForm.method;
		thisForm_name = thisForm.name;
		thisForm_id = thisForm.id;
		
		newFormElementInner = "&lt;form" + (thisForm_action != '' ? ' action=&quot;<span style=\'color:'+formActionColor+'\'>'+thisForm_action+'</span>&quot;' : '') + (thisForm_method != '' ? ' method=&quot;<span style=\'color:'+formMethodColor+'\'>'+thisForm_method+'</span>&quot;' : '') + (thisForm_name != '' ? ' name=&quot;'+thisForm_name+'&quot;' : '') + (thisForm_id != '' ? ' id=&quot;'+thisForm_id+'&quot;' : '') + "&gt;";
		new_formElement = document.createElement('span');
		new_formElement.setAttribute("style", "font-family:"+formFontFam+";font-size:"+formFontSize+";color:"+formElementColor+";background-color:"+formElementBG+";border-top:"+formBorder+" thin solid;border-right:"+formBorder+" thin solid;border-left:"+formBorder+" thin solid;padding:1px;");
		new_formElement.innerHTML = newFormElementInner;
		thisForm.parentNode.insertBefore(new_formElement, thisForm);
		new_formDIV = new_formElement = document.createElement('div');
		new_formDIV.setAttribute("style", "border:"+formBorder+" 1px solid;");
		thisForm.parentNode.insertBefore(new_formDIV, thisForm);
		new_formDIV.appendChild(thisForm);
	}
}
function show_formElements(formElements) {
	for (var i = 0; i < formElements.length; i++) {
		thisElement = formElements[i];
		thisElementType = thisElement.type;
		thisElementTag = thisElement.tagName.toLowerCase();
		showVal = 'yes';
		showSize = 'yes';
		if(thisElement.type == "hidden") {
			thisElement.setAttribute("type", "text");
			thisElement.style.color = "#000000";
			thisElement.style.background = "#C0C0C0";
			thisElement.style.border = "#00FF00 1px solid";
			showSize = 'no';
			showVal = 'no';
		}
		if(thisElementType == "text") {
			showVal = 'no';
		} else if(thisElementType == "radio" || thisElementType == "checkbox") {
			showSize = 'no';
		} else if(thisElementType == "button" || thisElementType == "submit" || thisElementType == "reset" || thisElementTag == "textarea" || thisElementTag == "select") {
			showVal = 'no';
			showSize = 'no';
		}
		thisElement_id = thisElement.id;
		thisElement_name = thisElement.name;
		thisElement_size = thisElement.size;
		thisElement_maxlength = thisElement.maxLength;
		thisElement_value = thisElement.value;
		newElementInner = "&lt;" + thisElementTag + (thisElement_name != '' ? ' name=&quot;<span style=\'color:'+elementNameColor+'\'>'+thisElement_name+'</span>&quot;' : '') + (thisElement_id != '' ? ' id=&quot;<span style=\'color:'+elementIDColor+'\'>'+thisElement_id+'</span>&quot;' : '') + (thisElement_value != '' && showVal == 'yes' ? ' value=&quot;'+thisElement_value+'&quot;' : '') + (thisElement_size != null && showSize == 'yes' ? ' size=&quot;'+thisElement_size+'&quot;' : '') + (thisElement_maxlength < 524288 ? ' maxlength=&quot;'+thisElement_maxlength+'&quot;' : '') + "&gt;";
		new_element = document.createElement('span');
		new_element.setAttribute("style", "font-family:"+formFontFam+";font-size:"+formFontSize+";color:"+elementColor+";background-color:"+elementBackground+";border:"+elementBorder+" thin solid;padding:1px;");
		new_element.innerHTML = newElementInner;
		thisElement.parentNode.insertBefore(new_element, thisElement);
	}
}
show_forms();
show_formElements(allFormInputs);
show_formElements(allFormTextareas);
show_formElements(allFormSelects);