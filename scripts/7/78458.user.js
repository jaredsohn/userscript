// ==UserScript==
// @name           idccolors
// @namespace      Forumwarz - Flamebate fix IDC button
// @description    The colors, man
// @include        http://*.forumwarz.com/idc
// @include        http://forumwarz.com/idc
// @exclude        http://*.forumwarz.com/idc/word_filters

// @exclude        http://forumwarz.com/idc/word_filters
// ==/UserScript==

//Edit only these two lines.
var bbcodeHeader = "[color=red][b]";
var bbcodeFooter = "[/b][/color]";
//Do not edit below this line.

var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = 'function idc_autocolour() { var idcMessage = document.getElementsByTagName("input")[1].value; document.getElementsByTagName("input")[1].value = "' + bbcodeHeader + '" + idcMessage + "' + bbcodeFooter + '";  focus_element("boring_stuff"); } ';
document.getElementsByTagName("form")[0].appendChild(scriptElement);

window.addButton = function () {
	// Get the location on the page where you want to create the button
	var targetDiv = document.getElementById('talk');

	// Create a div to surround the button
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'The_colors_man');
	newDiv.innerHTML = '<br \>';
	
	// Create the button and set its attributes
	var inputButton = document.createElement('input');
	inputButton.type = 'button';
	inputButton.value = 'Fix Shit';
	inputButton.name = "Fix_Shit";
	inputButton.setAttribute("onclick", "idc_autocolour();");
	
	// Append the button to the div
	newDiv.appendChild(inputButton); 
	targetDiv.appendChild(newDiv);
}
addButton();