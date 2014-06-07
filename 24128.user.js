// ==UserScript==
// @name           Greasemungo No Kiss My Ass Calls
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Remove the option to make a "kiss my ass call" (2008-04-24)
// @include        http://www*.popmundo.com/Common/Interact.asp?*action=PhoneInteract*
// @include        http://www*.popmundo.com/Common/Interact.asp
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo No Kiss My Ass Calls
//    Copyright (C) 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

const DUMMY_OPTION_CLASS_NAME = "greasemungoDummyOption";
const SHOW_HIDDEN_OPTIONS_BUTTON_NAME = "greasemungoShowHiddenOptions";
const SHOW_HIDDEN_OPTIONS_BUTTON_TEXT = "Show hidden options";

LoopForms();


function LoopForms() {
	var selectNodes = document.getElementsByName("InteractionTypeID");

	for (var i = 0; i < selectNodes.length; i++) {
		var selectNode = selectNodes.item(i);
	
		GM_log("form("+ i +") = "+ selectNode.name);
		
		LoopOptions(selectNode);
	}
}


function LoopOptions(selectNode) {
	optionNodes = selectNode.getElementsByTagName("option");
		
	var hiddenOptions = 0;
	lastVisible = optionNodes.length - 1;
	
	for (var j = 0; j < optionNodes.length; j++) {
		var optionNode = optionNodes.item(j);

		GM_log("option("+ j +") = "+ optionNode.text +"("+ optionNode.value +")");

		switch (parseInt(optionNode.value)) {
			//case 25: // Lover call
			//case 26: // Prank call
			case 46: // Kiss my ass call
				GM_log("hide option "+ j);
				optionNode.style.display = "none";
				optionNode.selected = false;
				hiddenOptions++;
				break;
			default:
				lastVisible = Math.min(j, lastVisible);
		}
	}
	
	if (hiddenOptions) {
		if (hiddenOptions == optionNodes.length) {
			selectNode.form.elements.namedItem("submit").disabled = true;
			AddEmptyItem(selectNode);
		}
		else {
			GM_log("select option "+ lastVisible);
			selectNode.selectedIndex = lastVisible;
		}
		
		AddShowHiddenOptionsButton(selectNode);	
	}
}


function AddEmptyItem(selectNode) {
	var opt1 = document.createElement('option');
	opt1.value = '';
	opt1.appendChild(document.createTextNode('------------'));
	opt1.className = DUMMY_OPTION_CLASS_NAME;
	
	selectNode.appendChild(opt1);
	selectNode.selectedIndex = selectNode.length - 1;
}


function AddShowHiddenOptionsButton(selectNode) {
	var button1 = document.createElement('input');
	button1.type = "button";
	button1.name = SHOW_HIDDEN_OPTIONS_BUTTON_NAME;
	button1.value = SHOW_HIDDEN_OPTIONS_BUTTON_TEXT;
	button1.addEventListener('click', ShowHiddenInteractionOptionsButtonClicked, true);

	var pn = selectNode.parentNode;
	pn.appendChild(document.createElement('br'));
	pn.appendChild(button1);
}


function ShowHiddenInteractionOptionsButtonClicked(aEvent) {
	var buttonNodes = document.getElementsByName(SHOW_HIDDEN_OPTIONS_BUTTON_NAME);
	
	for (var i = 0; i < buttonNodes.length; i++) {
		buttonNodes.item(i).disabled = true;
	}

	var selectNodes = document.getElementsByName("InteractionTypeID");

	for (var j = 0; j < selectNodes.length; j++) {
		var selectNode = selectNodes.item(j);
	
		var optionNodes = document.getElementsByTagName("option");
	
		for (var k = 0; k < optionNodes.length; k++) {
			var optionNode = optionNodes.item(k);
			
			if (optionNode.className == DUMMY_OPTION_CLASS_NAME) {
				optionNode.style.display = "none";
			}
			else {
				optionNode.style.display = "block";
			}
		}
	
		selectNode.selectedIndex = 0;		
		selectNode.form.elements.namedItem("submit").disabled = false;
	}
}

// EOF