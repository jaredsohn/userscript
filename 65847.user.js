// ==UserScript==
// @name            BvS Spar Hotkeys
// @namespace       erispope
// @description     Allows you to use hotkeys (A, F or S) to Spar in Billy Vs. SNAKEMAN.
// @version         1.0.2
// @history         1.0.2 Changed name of User Script Command to make it clearer that it toggles stopping before stamina spar, fixed script checker
// @history         1.0.2 Added hotkey F (for Fight), added description metadata.
// @history         1.0.0 Fixed the script updater issue.
// @history         0.9.4 Changed the status text to show above the Spar paragraph, added ScriptUpdater support
// @history         0.9.3 Fixed the issue with Stop Before Stamina Spar
// @include         http://*animecubed.com/billy/bvs/spar.html
// @require         http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==
if (ScriptUpdater)
	ScriptUpdater.check(65847, "1.0.2");
/*
Copyright (c) 2010 erispope

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
/*global document,window,GM_getValue,GM_setValue,GM_registerMenuCommand*/

function QuickSpar() {

	this.KEY_CODES = [ 65, 70, 83 ]; // use 'A', 'F' or 'S' to spar
	
	this.hasPerformed = false;
	
	this.getStopBeforeStaminaSpar = function () {
		if ( GM_getValue ) {
			return GM_getValue("quickspar_stop_before_stamina_spar", false);
		} else {
			return false;
		}
	};
	
	this.setStopBeforeStaminaSpar = function (value) {
		if ( GM_setValue ) {
			if ( value ) { value = true; } else { value = false; }
			GM_setValue("quickspar_stop_before_stamina_spar", value);
			this.setStatus("Configuration - Stopping before Stamina Spar: " + value);
		}
	};
	

	this.createStatusElement = function () {
		var element, elements, i, newElement;
		elements = document.getElementsByTagName("B");
		if ( elements && elements.length > 0 ) {
			for(i = 0; i < elements.length > 0; i++) {
				if ( elements[i].nodeValue && elements[i].nodeValue == "Spar" ) {
					element = elements[i];
					break;
				}
				if ( elements[i].childNodes && elements[i].childNodes.length > 0 && elements[i].childNodes[0].nodeValue && elements[i].childNodes[0].nodeValue == "Spar" ) {
					element = elements[i].childNodes[0];
					break;
				}
			}
		}
		if ( element ) {
			newElement = document.createElement("P");
			element.parentNode.insertBefore(newElement, element);
			
			element = newElement;
			newElement = document.createTextNode("");
			element.appendChild(newElement);
			return newElement;
		}
	};

	this.setStatus = function (msg) {
		if ( !msg ) {
			return;
		}
		if ( !this.statusElement ) {
			this.statusElement = this.createStatusElement();
		}
		if ( this.statusElement ) {
			this.statusElement.nodeValue = "Spar HotKey Status: " + msg;
		}
	};
	
	this.toggleStopBeforeStaminaSpar = function () {
		if ( GM_setValue && GM_getValue ) {
			this.setStopBeforeStaminaSpar(!this.getStopBeforeStaminaSpar());
		}
	};
	
	this.findSparInput = function () {
		var elements,i;
		elements = document.getElementsByName("rival");
		if ( !elements || !elements.length) 
		{
			return;
		}
		for (i = 0; i < elements.length; i++)
		{
			if ( elements[i].type == "hidden" )
			{
				return elements[i];
			}
		}
	};

	this.findParentTagName = function (startingElement, tagName) {
		var element;
		if ( ! startingElement || ! tagName ) {
			return;
		}
		element = startingElement;
		while ( element && element.tagName != tagName && element.parentNode ) {
			element = element.parentNode;
		}
		if ( element && element.tagName === tagName ) {
			return element;
		} else {
			return;
		}
	};
	
	this.SPAR_REG_EXP = new RegExp("Number of Spars: <b>\\d+</b>", "igm");
	this.NUMBER_REG_EXP = new RegExp("\\d+", "igm");

	this.extractNumberFromString = function (str) {
		var value, matches;
		if ( str ) {
			this.NUMBER_REG_EXP.compile(this.NUMBER_REG_EXP);
			matches = this.NUMBER_REG_EXP.exec(str);
			if ( matches && matches.length ) {
				return matches[0];
			}
		}
		return value;
	};

	this.recursiveFind = function (element, str) {
		var i, value;
		if ( !element || !str ) {
			return;
		}
		if ( element.nodeValue && element.nodeValue.indexOf(str) > -1 ) {
			return element;
		}
		if ( element.childNodes && element.childNodes.length > 0 ) {
			for(i = 0; i < element.childNodes.length; i++) {
				value = this.recursiveFind(element.childNodes[i], str);
				if ( value ) {
					return value;
				}
			}
		}
	};

	this.extractNumberOfSpars = function () {
		var fontSparString = "Number of Spars:";
		
		var fontElement;
		var nodeWithValue;
		
		var elements = document.getElementsByTagName("font");
		for(var i = 0; i < elements.length ; i++)
		{
			nodeWithValue = this.recursiveFind(elements[i], fontSparString);
			if ( nodeWithValue ) {
				fontElement = elements[i];
				break;
			}
		}
		if ( fontElement && nodeWithValue ) {
			if ( nodeWithValue.nextSibling && nodeWithValue.nextSibling.childNodes && nodeWithValue.nextSibling.childNodes.length > 0 ) {
				return this.extractNumberFromString(nodeWithValue.nextSibling.childNodes[0].nodeValue);
			}
		}
		return;
	};
	
	this.getNumberOfSpars = function () {
		if ( !this.numberOfSpars ) {
			this.numberOfSpars = this.extractNumberOfSpars();
			if ( !this.numberOfSpars ) {
				return -1;
			}
		}
		return this.numberOfSpars;
	};

	
	this.performSpar = function () {
		var sparInput, form;
		sparInput = this.findSparInput();
		if ( sparInput ) {
			form = this.findParentTagName(sparInput, "FORM");
		}
		if ( form ) {
			form.submit();
			return true;
		} else {
			this.setStatus("can't find anyone to spar with");
		}
		return false;
	};

	this.attemptSpar = function () {
		if ( ! this.hasPerformed ) {
			if ( ( this.getStopBeforeStaminaSpar() ) && ( this.getNumberOfSpars() % 50 == 49 ) ) {
				this.setStatus("Next Spar is a Stamina Spar, stopping.");
			} else {
				if ( this.performSpar() ) {
					this.hasPerformed = true;
					this.setStatus("sparring...");
					return true;
				}
			}
		}
		return false;
	};

	this.handleKeyPress = function (event) {
		if ( event.keyCode ) {
			for(var i = 0; i < this.KEY_CODES.length; i++) {
				if ( event.keyCode == this.KEY_CODES[i] ) {
					this.attemptSpar();
				}
			}
		}
	};

}


var quickSpar = new QuickSpar();

window.addEventListener("keydown", function (event) { quickSpar.handleKeyPress(event); }, false);

if ( GM_getValue && GM_setValue ) {
	GM_registerMenuCommand("QuickSpar Toggle Stop Before Stamina", function() { quickSpar.toggleStopBeforeStaminaSpar(); }, "s", "", "s");
}
