// ==UserScript==
// @name               Grab Links
// @fullname           Grab Links
// @description        Lists all links on a page for clipboard copy
// @namespace          http://userscripts.org/users/ollily
// @author             ollily2907
// @source             http://userscripts.org/scripts/show/82191
// @installURL         http://userscripts.org/scripts/source/82191.user.js
// @downloadURL        http://userscripts.org/scripts/source/82191.user.js
// @updateURL          http://userscripts.org/scripts/source/82191.meta.js
// @run-at             document-end
// @licence            http://www.gnu.org/licenses/gpl-3.0.txt
// @licence            http://creativecommons.org/licenses/by-nc-sa/3.0/
// @license            (CC) by-nc-sa
// @version            2.00.01
// @date               $LastChangedDate: 2013-03-29 16:12:57 +0100 (Fr, 29 Mrz 2013) $
// @revision           $LastChangedRevision: 57 $
// @grant              unsafeWindow
// @include            http://gmonkey.*.*/test/*
// @include            http://devzone.*.*/test/gm/*
// @include            /http(|s)\://(|.+?\.)youtube\..+?/.*/
// @include            /http(|s)\://(|.+?\.)myvideo\..+?/.*/
// @include            /http(|s)\://(|.+?\.)dailymotion\..+?/.*/
// @include            /http(|s)\://(|.+?\.)metacafe\..+?/.*/
// ==/UserScript==

/*
 Changes:
 2013-03-29
 - the first 2.x release
 - removing JQuery from script
 - new color layout
 - now search through link and link description / caption
 - optional disable new search and search only by url

 2013-02-20
 - Detecting clipboard support (disabling on new browsers)

 2011-12-27
 - Version Number changed
 - Added Copy to Clipboard Support (if enabled)

 2011-12-20
 - Added a 'SELECT ALL' Button
 - Search result can be displayed as plain text or linked text

 2011-02-06
 - Added JSDoc / Code cleaning
 - Code Testing function
 - Layout update

 2011-01-22
 - Layout update

 2010-09-08
 - Don't start search, if it's a known site
 - Layout update

 2010-08-19
 - Layout update
 - Set automatic filter on favorite sites
 - Many Bugfixes

 2010-07-24
 - Initial Release
 */

//
// Global Code - START
//

// ---------------
// base-core.js - START
// ---------------

var knownSite = new Array();
var currHost = document.location.host;
var currPort = document.location.port;

var currSite = currHost;
if (document.location.port) {
	currPort = ":" + document.location.port;
	if (currSite.search(currPort) == -1) {
		currSite += ":" + document.location.port;
	}
}
var currPath = document.location.href.substring(document.location.href
		.indexOf(currSite)
		+ currSite.length);

var bTestMode = false;

var INIT_ONLOAD = true;


// - General DHTML-Lib - Start
// - modified & extended dhtml.js from selfhtml.de

var DHTML = false, DOM = false, MSIE4 = false, NS4 = false, OP = false;

var shortId = "id";

var ATTR_SEP = ";";

if (document.getElementById) {
	DHTML = true;
	DOM = true;
} else {
	if (document.all) {
		DHTML = true;
		MSIE4 = true;
	} else {
		if (document.layers) {
			DHTML = true;
			NS4 = true;
		}
	}
}
if (window.opera) {
	OP = true;
}

/**
 * Shorthand, tries to find one element represented by the identifier in the
 * page.
 *
 * @param identifier -
 *            the key (id) of the element
 * @returns {Object} the found object or null
 */
function gmGetElI(identifier) {
	return gmGetEl(shortId, identifier, null);
}

/**
 * Tries to find one element represented by the identifier in the page.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param elementNumber -
 *            the index (only used for Mode=name, tagname)
 * @returns {Object} the found object or null
 */
function gmGetEl(mode, identifier, elementNumber) {
	var element, elementList;
	if (gmIsObject(identifier)) {
		return identifier;
	}
	if (!elementNumber) {
		elementNumber = 0;
	}
	if (!gmIsInstanceOf(mode, String)) {
		if (mode != null) {
			alert(mode.id + " " + identifier.constructor);
		} else {
			alert(null);
		}
	}
	if (DOM) {
		if (mode.toLowerCase() == "id") {
			element = document.getElementById(identifier);
			return element;
		}
		if (mode.toLowerCase() == "name") {
			elementList = document.getElementsByName(identifier);
			element = elementList[elementNumber];
			if (!element || element == "undefined") {
				element = null;
			}
			return element;
		}
		if (mode.toLowerCase() == "tagname") {
			elementList = document.getElementsByTagName(identifier);
			element = elementList[elementNumber];
			return element;
		}
		return null;
	}
	if (MSIE4) {
		if (mode.toLowerCase() == "id" || mode.toLowerCase() == "name") {
			element = document.all(identifier);
			return element;
		}
		if (mode.toLowerCase() == "tagname") {
			elementList = document.all.tags(identifier);
			element = elementList[elementNumber];
			return element;
		}
		return null;
	}
	if (NS4) {
		if (mode.toLowerCase() == "id" || mode.toLowerCase() == "name") {
			element = document[identifier];
			if (!element) {
				element = document.anchors[identifier];
			}
			return element;
		}
		if (mode.toLowerCase() == "layerindex") {
			element = document.layers[identifier];
			return element;
		}
		return null;
	}
	return null;
}

/**
 * Tries to find all elements represented by the identifier in the page.
 *
 * @param mode
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier
 *            the key (id, name, tagname) of the element
 * @returns {Object} returns the found content as array or null
 */
function gmGetElList(mode, identifier) {
	if (gmIsObject(identifier)) {
		return identifier;
	}
	if (identifier == null) {
		return null;
	}
	if (DOM) {
		if (mode.toLowerCase() == "name") {
			return document.getElementsByName(identifier);
		}
		if (mode.toLowerCase() == "tagname") {
			return document.getElementsByTagName(identifier);
		}
		return null;
	}
	if (MSIE4) {
		if (mode.toLowerCase() == "id" || mode.toLowerCase() == "name") {
			element = document.all(identifier);
			return element;
		}
		if (mode.toLowerCase() == "tagname") {
			return document.all.tags(identifier);
		}
		return null;
	}
	if (NS4) {
		return gmGetEl(mode, identifier);
	}
	return null;
}

/**
 * Shorthand, tries to find an attribute of an element in the page.
 *
 * @param identifier -
 *            the key (id) of the element
 * @param attributeName -
 *            the name of the attribute
 * @returns {Object} returns the found attribute or false
 */
function gmGetAtI(identifier, attributeName) {
	return gmGetAt(shortId, identifier, null, attributeName);
}

/**
 * Tries to find an attribute of an element in the page.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param elementNumber -
 *            the index (only used for Mode=name, tagname)
 * @param attributeName -
 *            the name of the attribute
 * @returns {Object} returns the found attribute or null
 */
function gmGetAt(mode, identifier, elementNumber, attributeName) {
	var attribute = null;
	var element = gmGetEl(mode, identifier, elementNumber);
	if (element) {
		if (DOM || MSIE4) {
			try {
				attribute = element[attributeName];
			} catch (e) {
				try {
					attribute = element.getAttribute(attributeName);
				} catch (e2) {
					// ignored
				}
			}
		}
		if (NS4) {
			attribute = element[attributeName];
			if (!attribute) {
				attribute = null;
			}
		}
	}
	return attribute;
}

/**
 * Shorthand, tries to find the content of an element in the page.
 *
 * @param identifier -
 *            the key (id) of the element
 * @returns {Object} returns the found content or null
 */
function gmGetCoI(identifier) {
	return gmGetCo(shortId, identifier, null);
}

/**
 * Tries to find the content of an element in the page.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param elementNumber -
 *            the index (only used for Mode=name, tagname)
 * @returns {Object} returns the found content or null
 */
function gmGetCo(mode, identifier, elementNumber) {
	var content = null;
	var element = gmGetEl(mode, identifier, elementNumber);
	if (element) {
		if (DOM && element.firstChild) {
			if (element.firstChild.nodeType == 3) {
				content = element.firstChild.nodeValue;
			} else {
				content = "";
			}
			return content;
		}
		if (MSIE4) {
			content = element.innerText;
			return content;
		}
	}
	return content;
}

/**
 * Shorthand, tries to set the new content to an element in the page.
 *
 * @param identifier -
 *            the key (id) of the element
 * @param text -
 *            the new text to set to the element
 * @returns {Boolean} TRUE=if set was successfull, else FALSE
 */
function gmSetCoI(identifier, text) {
	return gmSetCo(shortId, identifier, null, text);
}

/**
 * Tries to set the new content to an element in the page.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param elementNumber -
 *            the index (only used for Mode=name, tagname)
 * @param text -
 *            the new text to set to the element
 * @returns {Boolean} TRUE=if set was successfull, else FALSE
 */
function gmSetCo(mode, identifier, elementNumber, text) {
	var element = gmGetEl(mode, identifier, elementNumber);
	if (element) {
		if (DOM) {
			if (!element.firstChild) {
				element.appendChild(document.createTextNode(""));
			}
			element.firstChild.nodeValue = text;
			return true;
		}
		if (MSIE4) {
			element.innerText = text;
			return true;
		}
		if (NS4) {
			element.document.open();
			element.document.write(text);
			element.document.close();
			return true;
		}
	}
	return false;
}
// - General DHTML-Lib - End

/**
 * Shorthand: Sets a new value for an attribute to an element, any existing
 * attribute value is replaced.
 *
 * @param identifier -
 *            the key (id) of the element
 * @param attributeName -
 *            the unique name of the attribute
 * @param attributeValue -
 *            the new value for that attribute
 * @returns {Boolean} TRUE = the value could be set, else FALSE
 */
function gmSetAtI(identifier, attributeName, attributeValue) {
	return gmSetAt(shortId, identifier, null, attributeName, attributeValue);
}

/**
 * Sets a new value for an attribute to an element, any existing attribute value
 * is replaced.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param attributeName -
 *            the unique name of the attribute
 * @param attributeValue -
 *            the new value for that attribute
 * @returns {Boolean} TRUE = the value could be set, else FALSE
 */
function gmSetAt(mode, identifier, elementNumber, attributeName, attributeValue) {
	//var attribute;
	var element = gmGetEl(mode, identifier, elementNumber);
	if (element) {
		if (DOM || MSIE4) {
			try {
				element[attributeName] = attributeValue;
			} catch (e) {
				try {
					element.setAttribute(attributeName, attributeValue);
				} catch (e2) {
					// ignored
				}
			}
			return true;
			// return gmGetAt(mode, identifier, elementNumber, attributeName);
		}
		if (NS4) {
			element[attributeName] = attributeValue;
			return true;
			// return gmGetAt(mode, identifier, elementNumber, attributeName);
		}
	}
	return false;
}

/**
 * Adds an additional value for an attribute to an element, the new value is
 * appended at the end.
 *
 * @param mode -
 *            how the Identifier is interpreted (id, name, tagname)
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param attributeName -
 *            the unique name of the attribute
 * @param attributeValue -
 *            the new value for that attribute
 * @returns {Boolean} TRUE = the value could be set, else FALSE
 */
function gmAppAt(mode, identifier, attributeName, attributeValue) {
	var oldValue = gmGetAt(mode, identifier, attributeName);
	var newValue = oldValue + ATTR_SEP + attributeValue;
	return gmSetAt(mode, identifier, attributeName, newValue);
}

/**
 * Shorthand: Adds an additional value for an attribute to an element, the new
 * value is appended at the end.
 *
 * @param identifier -
 *            the key (id, name, tagname) of the element
 * @param attributeName -
 *            the unique name of the attribute
 * @param attributeValue -
 *            the new value for that attribute
 * @returns {Boolean} TRUE = the value could be set, else FALSE
 */
function gmAppAtI(identifier, attributeName, attributeValue) {
	return gmAppAt(shortId, identifier, attributeName, attributeValue);
}

/**
 * Verifies if an instance is an array.
 *
 * @param obj -
 *            the instance to test
 * @returns {Boolean} TRUE=if instance is an array, else FALSE
 */
function gmIsArray(obj) {
	return gmIsInstanceOf(obj, Array);
}

function gmIsFunction(obj) {
	return gmIsInstanceOf(obj, Function);
}

/**
 * Verifies if an instance is an object.
 *
 * @param obj -
 *            the instance to test
 * @returns {Boolean} TRUE=if instance is an object, else FALSE
 */
function gmIsObject(obj) {
	return (obj == null ? false : (typeof obj == "object"));
}

/**
 * Tests, if an instanced object is from the requested type.
 *
 * @param obj -
 *            an instance of an object (must not be null)
 * @param objType -
 *            a name of a type, if null it will be replaced by "Object"
 * @returns {Boolean} TRUE = if the object is from the tested type, else FALSE
 */
function gmIsInstanceOf(obj, objType) {
	var isType = false;
	if (obj != null) {
		if (objType == null) {
			objType = "Object";
		}
		try {
			tObjType = eval(objType);
			isType = (obj.constructor == tObjType);
		} catch (e) {
			// ignore
		}
		// isType = (typeof obj) == objType;
	}
	return isType;
}

/**
 * Removes all spaces from the left.
 *
 * @param a -
 *            the string to trim
 * @returns {String} the trimmed string
 */
function ltrim(a) {
	var ret = null;
	if (a != null) {
		ret = new String(a);
		var pos = 0;
		while (a.charAt(pos) == " ") {
			pos++;
		}
		ret = a.substring(pos);
	}
	return ret;
}

/**
 * Removes all spaces from the right.
 *
 * @param a -
 *            the string to trim
 * @returns {String} the trimmed string
 */
function rtrim(a) {
	var ret = null;
	if (a != null) {
		ret = new String(a);
		var pos = a.length - 1;
		while (a.charAt(pos) == " ") {
			pos--;
		}
		ret = a.substring(0, pos + 1);
	}
	return ret;
}

/**
 * Removes all space from the left and right.
 *
 * @param a -
 *            the string to trim
 * @returns {String} the trimmed string
 */
function trim(a) {
	return ltrim(rtrim(a));
}

/**
 * Extracts a numeric value from a text. Supports only "full" numbers;
 *
 * @param a
 *            the text to parse
 * @returns {Number} the found numeric value or 0;
 */
function gmToNo(a) {
	var numFound = "";
	if (a && a.length > 0) {
		for ( var int = 0; int < a.length; int++) {
			var a_ele = a[int];
			if (!isNaN(a_ele)) {
				numFound += a_ele;
			} else {
			}
		}
	}
	return eval(numFound);
}
/**
 * Sorts an array by a specific sort order (alphanumeric).
 *
 * @param unsortedArray -
 *            the aray which should be sorted
 * @param sortmode -
 *            the sort order or leave null to ignore sorting
 * @returns {Array} the sorted array
 */
function gmSortArray(unsortedArray, sortmode) {
	var sortedArray = unsortedArray;
	if (sortmode == null) {
		sortmode = false;
	}
	if (sortmode) {
		sortedArray.sort();
	}
	return sortedArray;
}

/**
 * The start point for all gmonkey scripts.
 *
 * @param e -
 *            the occuring event
 * @returns {Boolean} TRUE = if all handler are succesfull done, else FALSE
 */
function gmAddHandler(e) {
	var isDone = false;
	lgm_addKnownSites();
	lgm_addStyles();
	lgm_addControls();
	lgm_addInitAction();
	isDone = true;
	return isDone;
}


/**
* Now add the event handler.
*/
function gmInitEventHandler() {
	if (INIT_ONLOAD)
	window.addEventListener("load",  function(e) {
		gmAddHandler(e);
	});
}

// ---------------
// base-core.js - END
// ---------------
// ---------------
// base-object.js - START
// ---------------

/**
 * Creates an DOM-Object.
 *
 * @param par -
 *            the parent object to create the new object as child
 * @param objtyp -
 *            the type of the new object (HTML-Tagname)
 * @param id -
 *            the id and name of the new object
 * @returns {Object} the created object or null
 */
function gmCreateObj(par, objtyp, id) {
	// var obj = $("<" + objtyp + ">");
	var obj = null;
	if (objtyp != null && objtyp != "") {
		obj = document.createElement(objtyp);
		if (obj) {
			if (id != null) {
				// obj.attr("id", id);
				// obj.attr("name", id);
				gmSetAtI(obj, "id", id);
				gmSetAtI(obj, "name", id);
			}
			if (gmIsObject(par)) {
				// $(par).append(obj);
				par.appendChild(obj);
			}
		}
	}
	return obj;
}

/**
 * Create common attributes for an DOM-Object. Leave null if not used.
 *
 * @param obj -
 *            the object to create the attributes in it
 * @param caption -
 *            a text which will be displayed for this object
 * @param tit -
 *            a W3C-conform title for that DOM
 * @param ro -
 *            if set != null, the DOM will be readonly
 * @param ev_click -
 *            a javascript-call for the click-event
 * @param ev_focus -
 *            a javascript-call for the focus-event
 * @returns {Object} the object with added attributes FIXME: Check
 */
function gmCreateObjCommon(obj, caption, tit, ro, ev_click, ev_focus) {
	if (obj) {
		// obj.attr("title", tit);
		gmSetAtI(obj, "title", tit);
		if (ro) {
			// obj.attr("readonly", "readonly");
			gmSetAtI(obj, "readonly", "readonly");
		}
		if (caption) {
			// obj.append(caption);
			gmSetCoI(obj, caption);
		}
		if (ev_click) {
			// obj.click(ev_click);
			obj.onclick = ev_click;
		};
		if (ev_focus) {
			// obj.focus(ev_focus);
			obj.onfocus = ev_focus;
		};
	}
	return obj;
}

/**
 * Creates a DOM-Button.
 *
 * @param par -
 *            the parent object to create the new object as child
 * @param typ -
 *            the type of the new object (HTML-Tagname)
 * @param id -
 *            the id and name of the new object
 * @param caption -
 *            a text which will be displayed for this object
 * @param tit -
 *            a W3C-conform title for that DOM
 * @param initval -
 *            an initial value is set in this input
 * @param ev_click -
 *            a javascript-call for the click-event
 * @returns {Object} the created DOM-Button
 */
function gmCreateButton(par, typ, id, caption, tit, initval, ev_click) {
	var obj = gmCreateObj(par, "button", id);
	obj = gmCreateObjCommon(obj, caption, tit, null, ev_click, null);
	if (!typ) {
		typ = "button";
	}
	gmSetAtI(obj, "type", typ);
	if (initval) {
		gmSetAtI(obj, "value", initval);
	}
	return obj;
}

/**
 * Creates a DOM-Link.
 *
 * @param par -
 *            the parent object to create the new object as child
 * @param id -
 *            the id and name of the new object
 * @param caption -
 *            a text which will be displayed for this object
 * @param tit -
 *            a W3C-conform title for that DOM
 * @param ev_click -
 *            a javascript-call for the click-event
 * @returns {Object} the created DOM-Link
 */
function gmCreateLink(par, id, href, caption, tit, target, ev_click) {
	var obj = gmCreateObj(par, "a", id);
	obj = gmCreateObjCommon(obj, caption, tit, null, ev_click, null);
	if (href) {
		gmSetAtI(obj, "href", href);
	}
	if (target) {
		gmSetAtI(obj, "target", target);
	}

	return obj;
}

/**
 * Creates a DOM-Input-Element.
 *
 * @param par -
 *            the parent object to create the new object as child
 * @param typ -
 *            the type of the new input (Type-Attribute)
 * @param id -
 *            the id and name of the new object
 * @param initval -
 *            an initial value is set in this input
 * @param tit -
 *            a W3C-conform title for that DOM
 * @param ro -
 *            if set != null, the DOM will be readonly
 * @param ev_click -
 *            a javascript-call for the click-event
 * @param ev_focus -
 *            a javascript-call for the focus-event
 * @returns {Object} the new DOM-Input
 */
function gmCreateInput(par, typ, id, initval, tit, ro, ev_click, ev_focus) {
	var obj = gmCreateObj(par, "input", id);
	if (obj) {
		obj = gmCreateObjCommon(obj, null, tit, ro, ev_click, ev_focus);
		if (!typ) {
			typ = "text";
		}
		gmSetAtI(obj, "type", typ);
		if (initval) {
			// obj.val(initval);
			gmSetAtI(obj, "value", initval);
		} else {
			// obj.val("");
			gmSetAtI(obj, "value", "");
		}
	}
	return obj;
}

/**
 * Adds an object as a child node to a parent object or the document body.
 *
 * @param obj -
 *            the object to append at the end of the child list
 * @param parent -
 *            the parent object to append to, leave null to put it to the
 *            document-body
 * @returns {Boolean} TRUE = the object could be added, else FALSE
 */
function gmAddObj(obj, parent) {
	var isSet = false;
	if (gmIsObject(obj)) {
		if (!parent) {
			parent = gmGetEl("tagname", "body");
		}
		parent.appendChild(obj);
		isSet = true;
	}
	return isSet;
}

/**
 * Sets a new value into an object.
 *
 * @param id -
 *            the id of the object
 * @param initval -
 *            the new value for that element or empty
 * @returns {Boolean} TRUE = if the value could be set, else FALSE
 */
function gmSetInput(id, initval) {
	var isSet = false;
	// var obj = document.getElementById(id);
	var obj = gmGetElI(id);
	if (obj) {
		if (initval) {
			// obj.setAttribute("value", initval);
			gmSetAtI(obj, "value", initval);
			isSet = true;
		} else {
			// obj.setAttribute("value", "");
			gmSetAtI(obj, "value", "");
			isSet = true;
		}
	}
	return isSet;
}

/**
 * Selects the text in a input element.
 *
 * @param inputElem -
 *            the element containing the text
 * @returns {Boolean} TRUE = if the input element could be selected, else FALSE
 */
function gmSelectInput(inputElem) {
	var isSet = false;
	if (gmIsObject(inputElem)) {
		try {
			inputElem.select();
			isSet = true;
		} catch (e) {
		}
	}
	return isSet;
}

/**
 * Constants for Selection of Text using IE.
 */
var SELECT_IE = 0;
/**
 * Constants for Selection of Text using Gecko Engine.
 */
var SELECT_G = 1;

/**
 * @returns {Number} which Selection of Text Modus is used
 */
function gmGetTextSelectMode() {
	if (document.selection && document.selection.createRange) {
		return SELECT_IE;
	} else if (document.createRange && window.getSelection) {
		return SELECT_G;
	}
	return SELECT_IE;
}
/**
 * Constants Mode which is currently used for Selection of Text.
 *
 * @see {@link #gmGetTextSelectMode()}
 */
var SELECT_CURR = gmGetTextSelectMode();

/**
 * Returns the selected Text or an empty String.
 *
 * @returns {String} the text which is currently selected.
 */
function gmGetSelectedText() {
	var selectedText = "";
	if (SELECT_IE == SELECT_CURR) {
		selectedText = document.selection.createRange().text;
	} else if (SELECT_G == SELECT_CURR) {
		selectedText = window.getSelection();
	}
	if (typeof selectedText == "object") {
		selectedText = selectedText.toString();
	}
	return selectedText;
}

/**
 * Creates a new Range-Object for an element.
 *
 * @param elem -
 *            an element for the Range-Object or null;
 * @returns {Range} a new Range-Object or null
 */
function gmGetNewRange(elem) {
	var textRange = null;
	if (SELECT_IE == SELECT_CURR) {
		textRange = document.selection.createRange();
	} else if (SELECT_G == SELECT_CURR) {
		if (gmIsObject(elem)) {
			textRange = document.createRange();
			try {
				textRange.selectNode(elem);
			} catch (e) {
				// alert(e);
			}
		}
	}
	return textRange;
}

/**
 * Selects or Unselects the content inside an element (not only for input
 * elements.
 *
 * @param elem -
 *            the element to select the text in it
 * @param bForceSelect -
 *            TRUE=always select, FALSE=switch between select and unselect
 * @returns {String} the selected text or an empty string
 */
function gmSelectText(elem, bForceSelect) {
	var currSel = gmGetSelectedText();
	if (bForceSelect == null) {
		bForceSelect = false;
	}
	if (!bForceSelect && (currSel && currSel != "")) {
		if (SELECT_IE == SELECT_CURR) {
			document.selection.empty;
		} else if (SELECT_G == SELECT_CURR) {
			var selection = window.getSelection();
			selection.removeAllRanges();
		}
	} else {
		if (gmIsObject(elem)) {
			var tRange = gmGetNewRange(elem);
			if (SELECT_IE == SELECT_CURR) {
				tRange.select();
			} else if (SELECT_G == SELECT_CURR) {
				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(tRange);
			}
			currSel = gmGetSelectedText();
		}
	}
	return currSel;
}

/**
 * Removes an object from the DOM.
 *
 * @param obj the object to delete
 * @returns {Boolean} TRUE=the obj was deleted
 */
function gmDelObj(obj) {
	var isDel = false;
	oObj = gmGetElI(obj);
	if (gmIsObject(oObj)) {
		var parent = oObj.parentNode;
		if (gmIsObject(parent)) {
			try {
				parent.removeChild(oObj);
				isDel = true;
			} catch (e) {
				alert("ERR: " + e);
			}
		}
	}
	return isDel;
}

/**
 * Removes (clears) the object from it's children.
 *
 * @param obj - the object to clear
 * @returns {Boolean} TRUE = always, if obj is an object, FALSE = obj is null or not an object
 */
function gmEmptyObj(obj) {
	var isEmpty = false;
	oObj = gmGetElI(obj);
	if (gmIsObject(oObj)) {
		while (oObj.firstChild) {
			oObj.removeChild(oObj.firstChild);
		};
		isEmpty = true;
	}
	return isEmpty;
}

// ---------------
// base-object.js - END
// ---------------
// ---------------
// base-web.js - START
// ---------------

/**
 * Minimum width of the preview.
 */
var minWidth = 240;
/**
 * Maximum width of the preview.
 */
var maxWidth = 640;

/**
 * Adds an url which should be known for the search.
 *
 * @param filter -
 *            a predefined searchtext for that url
 * @param site -
 *            the hostname as regular expression
 * @param path -
 *            a path as regular expression (optional)
 */
function gmAddSite(filter, site, path) {
	if (knownSite) {
		if (site && (site != "")) {
			var len = knownSite.length;
			knownSite[len] = new Object();
			knownSite[len].site = site;
			knownSite[len].filter = (filter != null ? filter : ".+");
			knownSite[len].path = (path != null ? path : "");
		}
	}
}

/**
 * Adds a config for a known site.
 *
 * @param site -
 *            a site pattern
 * @param urlElem -
 *            a pattern for the html-element to search in the page
 * @param urlSearch -
 *            a pattern to search inside the url of the html-element
 * @param urlReplace -
 *            a literal which will used for replacing the urlSearch
 * @param urlReplaceLarge -
 *            a literal which will used for replacing the urlSearch with a url
 *            for large images
 * @param withDownload -
 *            1=will add a download-link beneath the picture, else 0
 */
function gmAddSite2(site, urlElem, urlSearch, urlReplace, urlReplaceLarge, withDownload) {
	if (knownSite) {
		if (site && site.length > 0) {
			var len = knownSite.length;
			knownSite[len] = new Object();
			knownSite[len].site = site;
			knownSite[len].url = (urlElem != null ? urlElem : ".+");
			knownSite[len].search = (urlSearch != null ? urlSearch : "");
			knownSite[len].replace = (urlReplace != null ? urlReplace : "");
			knownSite[len].replace_large = (urlReplaceLarge != null ? urlReplaceLarge : "");
			knownSite[len].withDownload = (withDownload != null ? withDownload : 0);
		}
	}
}

/**
 * Searchs in the list of known sites, if this site is found and returns the
 * predefined searchtext. If multiple sites will match, the LAST matching
 * filter will be returned.
 *
 * @param site -
 *            the hostname of the site to search for
 * @param path -
 *            the path of the site to search for (optional)
 * @returns {String} the predefined searchtext
 */
function gmFoundFilter(site, path) {
	var retFilter = "";
	var init = 0;
	if (knownSite && site) {
		if (!path) {
			path = "";
		}
		// alert("site: " + site + "| path: " + path);
		for ( var i = 0; i < knownSite.length; i++) {
			// alert("u:" + knownSite[i].site+" p:" + knownSite[i].path);
			if (site.search(knownSite[i].site) >= 0) {
				if (init == 0 && knownSite[i].path == "") {
					retFilter = knownSite[i].filter;
					init = 1;
				}
				var fIdx = path.search(knownSite[i].path);
				//alert(fIdx + " u:>" + knownSite[i].site + "< p:>" + path + "< k:>"+knownSite[i].path + "<");
				if (path != "" && (fIdx >= 0)) {
					retFilter = knownSite[i].filter;
					break;
				} else if (path == "" && knownSite[i].path == "") {
					retFilter = knownSite[i].filter;
					break;
				}
			}
		}
	}
	return retFilter;
}

/**
 * Searchs in the list of known sites, if this site is found and returns the
 * predefined searchtext. If multiple sites will match, the LAST matching site
 * will be returned.
 *
 * @param site -
 *            the hostname of the site to search for
 * @return a pattern for the html-element to search in the page
 */
function gmFoundFilter2(site) {
	var retFilter = null;
	if (knownSite != null && site != null) {
		for (var i=0; i < knownSite.length; i++) {
			if (site.search(knownSite[i].site) >= 0 ) {
				retFilter = knownSite[i];
			}
		}
	}
	return retFilter;
}

var FL_TAG = "fltag";
var FL_ID = "_FL";

/**
 * Search for all matching links in the page.
 *
 * @param sea -
 *            the search pattern or leave "" to get all
 * @param withDesc -
 *            0 = search only in links, 1 = search also in link description
 * @returns {Array} an array with all found links
 */
function gmFindLinksInPage(sea, withDesc) {
	//
	if (withDesc == null) {
		withDesc = 0;
	}
	var pagelinks = new Array();

	if (!sea || sea.length <= 0) {
		sea = ".*";
	} else if (sea.charAt(0) == "/" && sea.charAt(sea.length - 1) == "/") {
		sea = sea.substring(1, sea.length);
		sea = sea.substring(0, sea.length -1);
	} else {
		sea = sea.replace(/\?/g, ".").replace(/\./g, "\.").replace(/\*/g, ".*");
	}
	//alert(sea);
	sea = new RegExp(sea, "i");
	for (var i=0; i < document.links.length; i++) {
		var curlink = document.links[i];
		var ne = 1;

		//var searchText = curlink.href;
		var searchText = new Array();
		searchText.push(gmGetAtI(curlink, "href"));
		if (withDesc != 0) {
			searchText.push(gmGetAtI(curlink, "alt"));
			searchText.push(gmGetAtI(curlink, "title"));
			searchText.push(gmGetAtI(curlink, "onmouseover"));
			searchText.push(gmGetAtI(curlink, "onclick"));
			searchText.push(curlink.innerHTML.replace("\\n", "").replace("#", ""));
		}
		var found = gmFindLinksInPage0(searchText, sea);

		if (found) {
			if (gmGetAtI(curlink.id, FL_TAG) != FL_ID) {
				var htmllink = gmGetAtI(curlink, "href");

				for (var j=0; j < pagelinks.length; j++) {
					if (htmllink == pagelinks[j][0]) {
						// link allready added, avoiding duplicates
						ne = 0; break;
					}
				}
				if (ne == 1) {

					var searchText = new Array();
					searchText.push(curlink.text);
					if (withDesc != 0) {
						searchText.push(gmGetAtI(curlink, "alt"));
						searchText.push(gmGetAtI(curlink, "title"));
						searchText.push(gmGetAtI(curlink, "onmouseover"));
						searchText.push(gmGetAtI(curlink, "onclick"));
						searchText.push(curlink.innerHTML);
					}
					var htmltext = gmFindLinksInPage1(searchText);

					//alert("L: "+htmllink + " T: " + htmltext);
					var curlink = new Array(htmllink, htmltext);
					pagelinks.push(curlink);
				}
			}
		}
	}
	return pagelinks;
}

/**
 * <b>DON'T USE DIRECTLY</b>
 *
 * @param arrText - an array texts to search in
 * @param sea - a search text (might be a regular expression)
 * @returns {Boolean} TRUE= the search text is found in the array, or FALSE
 */
function gmFindLinksInPage0(arrText, sea) {
	var found = false;
	if (gmIsArray(arrText)) {
		//alert(arrText.join("\n"));
		for (var i=0; i < arrText.length; i++) {
			var searchText = arrText[i];
			try {
				found = searchText.search(sea) != -1;
			} catch (e) {
				// ignored
			}
			//alert("i:" + i + " S:" + sea + " F:" + found + " T:" + searchText);
			if (found) {
				break;
			}
		}
	}
	return found;
}

/**
 * <b>DON'T USE DIRECTLY</b>
 *
 * @param arrText - an array with the possible link descriptions
 * @returns {String} the final link description
 */
function gmFindLinksInPage1(arrText) {
	var searchTextClean = new Array("", "", "");
	if (gmIsArray(arrText)) {
		//alert(arrText.join("\n"));
		for (var idxST = 0; idxST < arrText.length; idxST++) {
			var aEle = arrText[idxST];
			if (aEle != null) {
				try {
					aEle = ("" + aEle).replace("\\n", "").replace("#", "").trim();
					if (aEle != "") {
						var tarIdx = -1;
						switch (idxST) {
						case 0:
						case 1:
						case 2:
							tarIdx = 0;
							break;
						case 3:
						case 4:
							tarIdx = 1;
							break;
						case 5:
							tarIdx = 2;
							break;
						default:
							break;
						}
						if (tarIdx > -1) {
							if (searchTextClean[tarIdx].search(aEle) == -1) {
								if (searchTextClean[tarIdx] != "") {
									searchTextClean[tarIdx] += "\n";
								}
								searchTextClean[tarIdx] += aEle;
							}
						}
					}
				} catch (e) {
					// ignored
				}
			}
		}
	}

	var htmltext = "";

	if (searchTextClean.length > 0) {
		//alert(searchTextClean.join("\n"));
		if (searchTextClean[0] != "") {
			htmltext = searchTextClean[0];
		} else if (searchTextClean[1] != "") {
			htmltext = searchTextClean[1];
		} else if (searchTextClean[2] != "") {
			htmltext = searchTextClean[2];
		}
	}
	if (htmltext == null || htmltext == "") {
		htmltext = "n/a";
	}
	return htmltext;
}

/**
 * Adds a javascript block into the page.
 *
 * @param scc -
 *            a string, a function or an array with the javascript code or a
 *            function-list
 * @returns {Boolean} TRUE = if the script block could be set, else FALSE
 */
function gmAddScriptGlobal(scc) {
	var isSet = false;
	if (gmIsObject(scc) || gmIsFunction(scc) || (scc && scc.length > 0)) {
		var head = gmGetHead();
		if (head) {
			var script = gmCreateObj(head, "script");
			script.type = 'text/javascript';

			var allscc = "";
			if (gmIsArray(scc)) {
				for ( var i = 0; i < scc.length; i++) {
					allscc += scc[i] + " \n";
				}
			} else {
				allscc = scc;
			}
			gmSetCoI(script, "\n" + allscc + "\n");
			isSet = true;
		}
	}
	return isSet;
}

/**
 * Adds a link to a javascript file into the page.
 *
 * @param scLink -
 *            a string or an array with the url of the javascript-file FIXME:
 *            Check
 */
function gmAddScriptLinkGlobal(scLink) {
	var isSet = false;
	var head = gmGetHead();
	if (head && scLink && scLink.length > 0) {
		var allScLink = new Array();
		if (gmIsArray(scLink)) {
			allScLink = scLink;
		} else {
			allScLink = new Array(scLink);
		}

		for ( var i = 0; i < allScLink.length; i++) {
			var newScript = gmCreateObj(head, "script");
			newScript.type = 'text/javascript';
			newScript.src = allScLink[i];
		}
		isSet = true;
	}
	return isSet;
}

/**
 * Adds a style block into the page.
 *
 * @param scc -
 *            a string or an array with the css code
 * @returns {Boolean} TRUE = if the style block could be set, else FALSE
 */
function gmAddStyleGlobal(scc) {
	var isSet = false;
	if (gmIsObject(scc) || (scc && scc.length > 0)) {
		var head = gmGetHead();
		if (head) {
			var style = gmCreateObj(head, "style");
			style.type = 'text/css';

			var allscc = "";
			if (gmIsArray(scc)) {
				for ( var i = 0; i < scc.length; i++) {
					allscc += scc[i] + " \n";
				}
			} else {
				allscc = scc;
			}
			gmSetCoI(style, "\n" + allscc + "\n");
			isSet = true;
		}
	}
	return isSet;
}

/**
 * Generates some sample entries for testing.
 *
 * @param maxEntries -
 *            number of entries to generate
 * @returns {Array} array of entries
 */
function gmGenTestEntries(maxEntries) {
	if (isNaN(maxEntries) || maxEntries == "") {
		maxEntries = 1;
	}
	if (maxEntries < 0) {
		maxEntries = 0;
	} else if (maxEntries > 100) {
		maxEntries = 100;
	}
	testArray = new Array();
	for ( var i = 1; i <= maxEntries; i++) {
		var curlink = "http://" + currSite + currPath + "/link-" + i;
		var htmllink = curlink;
		var htmltext = "linktext-" + i;
		var curlink = new Array(htmllink, htmltext);
		testArray.push(curlink);
	}
	return testArray;
}

/**
 * Calculate the offset of an element relating to the elemnt at the most top.
 *
 * @param element
 *            the element to check the offeset
 * @returns {Array[leftOffset, topOffset]} an array with the leftOffset,
 *          topOffset FIXME:TEST
 */
function gmCumulativeOffset(element) {
	var valueT = 0;
	var valueL = 0;
	if (element) {
		valueL = element.width || 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
	}
	return [ valueL, valueT ];
}

/**
 * Calculates the horizontal offset to the right in relation to it's parent
 * element.
 *
 * @param parentElem -
 *            the element to calculate the offset from
 * @param iPoint -
 *            a screen point, to add an additional offset
 * @param iZoom -
 *            the zoom factor 1= Originalsize
 * @returns {Number} the horizontal offset or 0 FIXME:Test
 */
function gmCalcOffsetH(parentElem, iPoint, iZoom) {
	if (isNaN(iZoom)) {
		iZoom = 1;
	}
	var offsetH = 0;
	if (parentElem) {
		offsetH = gmCumulativeOffset(parentElem)[1];
		if (!isNaN(offsetH) && gmIsArray(iPoint)) {
			if (!isNaN(iPoint[1])) {
				offsetH = offsetH - (iPoint[1] * iZoom) + (parentElem.height || 0);
			}
		}
	}
	return offsetH;
}

/**
 * Searches the url for a pattern and replace the text.
 *
 * @param searchForPattern -
 *            the pattern to search for
 * @param replaceWithText -
 *            the text what will be inserted instead
 * @param oldUrl -
 *            the URL to search in
 * @returns {String} the url with replaced text
 */
function gmGetReplaceUrl(searchForPattern, replaceWithText, oldUrl) {
	var newUrl = oldUrl;
	if (oldUrl != null) {
		if (searchForPattern != "") {
			// there is something to replace
			if (replaceWithText == null) {
				replaceWithText = "";
			}
			var patternReplace = new RegExp(searchForPattern);
			newUrl = oldUrl.replace(patternReplace, replaceWithText);
		}
	}
	return newUrl;
}

/**
 * Returns the actual server of the running page.
 *
 * @returns a server name
 */
function gmGetCurrentSite() {
	currSite = document.location.host;
	if (document.location.port) {
		currSite += ":" + document.location.port;
	}
	return currSite;
}

/**
 * Determine the metrics of that image.
 *
 * @param newImage -
 *            the image to inspect
 * @returns {Array[width, height]} the image metrics [width, height] in px
 */
function gmGetImageSize(newImage) {
	var imageObjectWidth = 0;
	var imageObjectHeight = 0;

	if (newImage && newImage.width && newImage.width > 0) {
		imageObjectWidth = newImage.width;
		imageObjectHeight = newImage.height;
	}
	if (imageObjectWidth <= 0) {
		imageObjectWidth = minWidth;
	} else if (imageObjectWidth > maxWidth) {
		imageObjectWidth = maxWidth;
		imageObjectHeight = 0;
	}
	if (imageObjectHeight <= 0) {
		imageObjectHeight = "auto";
	}
	return [ imageObjectWidth, imageObjectHeight ];
}

/**
 * Add a default style to a div-element.
 *
 * @param hDiv -
 *            the div-element
 * @param iPoint -
 *            metrics of the image [width, height] in px
 * @param offsetW -
 *            an offset (number) for the width (optional), default is 5px
 * @param offsetH -
 *            an offset (number) for the height (optional), default is 5px
 * @param ratio -
 *            the aspect ratio of the image, only is used, if we have no image height
 * @returns {Boolean} TRUE = the layout could be added, else FALSE
 */
function gmSetDivLayout(hDiv, iPoint, offsetW, offsetH, ratio, iZoom) {
	var w = "auto";
	var h = "auto";
	var oH = "5px";
	var oW = "5px";

	var isSet = false;
	if (gmIsObject(hDiv)) {
		if (isNaN(iZoom)) {
			iZoom = 1;
		}
		if (gmIsArray(iPoint)) {
			if (!isNaN(iPoint[0])) {
				w = iPoint[0] + 2;
			}
			if (isNaN(iPoint[1])) {
				h = (gmToNo(hDiv.style.width) / ratio) + 2;// + picTextHeight;
			} else {
				h = (iPoint[1] + 2); // + picTextHeight;
			}
		}
		if (!isNaN(offsetH)) {
			oH = offsetH + "px";
		}
		if (!isNaN(offsetW)) {
			oW = offsetW + "px";
		}
		if (!isNaN(w)) {
			w *= iZoom;
			w = w + "px";
		}
		if (!isNaN(h)) {
			h *= iZoom;
			h = h + "px";
		}
		var css = gmGetAtI(hDiv, "style");
		if (css == false) {
			css = "";
		}
		css += ";width:" + w + ";height:" + h + ";top:" + oH + ";left:" + oW ;
		gmSetAtI(hDiv, "style", css);
		isSet = true;
	}

	return isSet;
}

/**
 * Add a default style to an img-element.
 *
 * @param hDiv -
 *            the div-element
 * @param hImg -
 *            the img-element
 * @param iPoint -
 *            metrics of the image [width, height] in px
 * @param iZoom -
 *            the zoom factor (1 = Originalsize)
 * @returns {Boolean} TRUE = the layout could be added, else FALSE
 */
function gmSetImgLayout(hDiv, hImg, iPoint, iZoom) {
	var h = "auto";
	var w = "auto";

	var isSet = false;
	if (gmIsObject(hDiv)) {
		if (isNaN(iZoom)) {
			iZoom = 1;
		}
		if (gmIsArray(iPoint)) {
			if (!isNaN(iPoint[0])) {
				w = iPoint[0];
			}
			if (isNaN(iPoint[1])) {
				if (gmIsObject(hImg)) {
					ratio = gmToNo(hImg.style.width) / gmToNo(hImg.style.height);
					h = (gmToNo(hDiv.style.width) / ratio);// + picTextHeight;
				}
			} else {
				h = iPoint[1]; // + picTextHeight;
			}
		}
		if (!isNaN(w)) {
			w *= iZoom;
			w = w + "px";
		}
		if (!isNaN(h)) {
			h *= iZoom;
			h = h + "px";
		}
		var css = gmGetAtI(hDiv, "style");
		if (css == false) {
			css = "";
		}
		css += ";width:" + w + ";height:" + h;
		gmSetAtI(hDiv, "style", css);
		isSet = true;
	}

	return isSet;
}

/**
 *
 * @returns {Object} the object for the head in the page, or null
 */
function gmGetHead() {
	return gmGetEl("tagname", "head");
}

/**
 *
 * @returns {Object} the object for the body in the page, or null
 */
function gmGetBody() {
	return gmGetEl("tagname", "body");
}

/**
 * @param obj - the object from which to get the css-style
 * @returns {Object} the css-style-object from that object
 */
function gmGetStyle(obj) {
	var res = null;
	var oObj = gmGetElI(obj);
	if (oObj) {
		try {
			res = oObj.style;
		} catch (e) {
			// ignored
		}
	}
	return res;
}

/**
 * @returns {Integer} height of the document body
 */
function gmGetBodyHeight() {
    var D = gmGetBody();
    var Dh = 0;
    var Eh = 0;
    if (D) {
        Dh = Math.max(isNaN(D.style.height) ? 0 : D.style.height, D.scrollHeight, D.offsetHeight, D.clientHeight);
    }
    if (D.documentElement) {
    	D = D.documentElement;
    	Eh = Math.max(isNaN(D.style.height) ? 0 : D.style.height, D.scrollHeight, D.offsetHeight, D.clientHeight);
    }
    return Math.max(Dh, Eh);
}

// ---------------
// base-web.js - END
// ---------------
// ---------------
// base-clipboard.js - START
// ---------------

/**
 * @returns {Object} the reference to the base window, might be the greasemonkey
 *          unsafeWindow
 */
function gmClipRef() {
	var refWindow = window;
	if (!refWindow && unsafeWindow != null) {
		refWindow = unsafeWindow;
	}
	return refWindow;
}

/**
 * @returns {Object} the reference to the the Security Manager or null
 * @depricated since FF 16
 */
function gmPrivsManager() {
	var privsMan = null;
	var wdw = gmClipRef();
	if (gmIsObject(wdw)) {
		try {
			if (gmIsObject(wdw.netscape.security.PrivilegeManager)) {
				privsMan = wdw.netscape.security.PrivilegeManager;
			}
		} catch (e) {
			// ignored
		}
	}
	return privsMan;
}

/**
 * Copies a text to clipboard.
 *
 * @param text -
 *            the text to copy to the clipboard
 * @param bQuite -
 *            don't schow any alerts
 * @param refWindow -
 *            a reference on the page (optional)
 * @returns {Boolean} text = if set to clipboard, else null
 */
function gmCopy2clipboard(text, bQuite, refWindow) {

	var resultText = text;
	wdw = gmClipRef();
	if (wdw.clipboardData) {
		wdw.clipboardData.setData('text', text);
		return resultText;
	} else {
		try {
			wdw.netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
		} catch (ex) {
			if (!bQuite) {
				alert("Internet Security settings do not allow copying to clipboard!");
			}
			return null;
		}

		try {
			e = wdw.Components.classes['@mozilla.org/widget/clipboard;1']
					.createInstance(wdw.Components.interfaces.nsIClipboard);
			if (!e)
				return null;
		} catch (ex) {
			if (!bQuite) {
				alert("1:" + ex);
			}
			return null;
		}

		try {
			b = wdw.Components.classes['@mozilla.org/widget/transferable;1']
					.createInstance(wdw.Components.interfaces.nsITransferable);
			if (!b)
				return null;
		} catch (ex) {
			if (!bQuite) {
				alert("2:" + ex);
			}
			return null;
		}

		b.addDataFlavor("text/unicode");
		try {
			o = wdw.Components.classes['@mozilla.org/supports-string;1']
					.createInstance(wdw.Components.interfaces.nsISupportsString);
			if (!o)
				return null;
			o.data = text;
		} catch (ex) {
			if (!bQuite) {
				alert("3:" + ex);
			}
			return null;
		}

		b.setTransferData("text/unicode", o, (text == null ? 0
				: text.length * 2));

		try {
			t = wdw.Components.interfaces.nsIClipboard;
		} catch (ex) {
			if (!bQuite) {
				alert("4:" + ex);
			}
			return null;
		}
		e.setData(b, null, t.kGlobalClipboard);
		return text;
	}
	if (!bQuite) {
		alert('Copy doesn\'t work!');
	}
	return null;
}

/**
 * <p) Same as {@link #gmCopy2clipboard(text, bQuite, refWindow)}, but
 * customized only for use in a webpage.
 * </p>
 * <p>
 * Not usable for a greasemonkey script
 * </p>
 *
 * @param text -
 *            the text to copy to the clipboard
 */
function copyPostToClipboard(text) {
	var clipboard, transferable, clipboardID, str;
	try {
		netscape.security.PrivilegeManager
				.enablePrivilege("UniversalXPConnect");
	} catch (e) {
		alert(e);
	}
	try {
		clipboard = Components.classes["@mozilla.org/widget/clipboard;1"]
				.createInstance(Components.interfaces.nsIClipboard);
	} catch (e) {
		alert(e);
	}
	try {
		transferable = Components.classes["@mozilla.org/widget/transferable;1"]
				.createInstance(Components.interfaces.nsITransferable);
	} catch (e) {
		alert(e);
	}
	transferable.addDataFlavor("text/unicode");
	str = Components.classes["@mozilla.org/supports-string;1"]
			.createInstance(Components.interfaces.nsISupportsString);
	str.data = text;
	transferable.setTransferData("text/unicode", str, str.data.length * 2);
	try {
		clipboardID = Components.interfaces.nsIClipboard;
	} catch (e) {
		alert(e);
	}
	clipboard.setData(transferable, null, clipboardID.kGlobalClipboard);
}

/**
 * Adds the functions for using a "copy to clipboard" in a web-page.
 */
function gmAddClipboardSupport() {
	gmAddScriptGlobal(new Array(gmClipRef, gmCopy2clipboard,
			gmIsClipboardSupported));
}

/**
 * @returns {Boolean} TRUE=using clipboard is supported, else FALSE
 */
function gmIsClipboardSupported() {
	var isOK = false;
	try {
		privsMan = gmPrivsManager();
		if (gmIsObject(privsMan)) {
			privsMan.enablePrivilege("UniversalXPConnect");
			isOK = true;
		}
	} catch (ex) {
		alert("ERR: " + ex);
	}
	return isOK;
}

// ---------------
// base-clipboard.js - END
// ---------------

//
// Global Code - END
//


//
//GM-Script specific code - START
//

/**
 * Define the global variables used for this script.
 */
var scriptID = "GM-GL";

var contlinks;
var odiv;
var ores;
var o1;
var oform;
var initFilter;

var bshow = '\\/';
var bhide = '/\\';
var hmin = '25px';
var hmax = '99.5%';
var hmaxauto = 'auto';
var hmaxlh = 14;
var h_on = -1;
var h_off = -2;
var bDescA = "D";
var tDescA = "search in link & description";
var vDescA = "1";
var bDescD = "L";
var tDescD = "search in link ONLY";
var vDescD = "0";

/**
 * Add the DOM-Objects used in this script.
 */
function lgmAddControlsGrabLinks() {

	gmAddClipboardSupport();
	contlinks = gmCreateObj(null, "div", "gl-container");
	odiv = gmCreateObj(contlinks, "div", "gl-searchbox");
	oact = gmCreateObj(contlinks, "div", "gl-actionbox");
	ores = gmCreateObj(contlinks, "div", "gl-resultbox");
	oform = gmCreateObj(odiv, "form", "gl-searchform");

	initFilter = gmFoundFilter(currSite, currPath);
	var searchText_Desc = "enter your search\n" +
	 "Simple Wildcards = (?, *)\n" +
	 "Regular Expression = /searchtext/";
	gmCreateInput(oform, "text", "gl-searchtext", initFilter, searchText_Desc, null, null,
			function() {
				return gmSelectInput(this);
			});

	gmCreateButton(oform, "submit", "gl-sstart", "S", "start search", null, function() {
		return lgmFilterURL('gl-searchtext');
	});
	gmCreateButton(oform, "button", "gl-sreset", "R", "clear search", null, function() {
		return lgmRemall('gl-searchtext');
	});
	gmCreateButton(oform, "button", "gl-sshow", bshow, "show/hide result", null, function() {
		return lgmShowhide();
	});
	//var odiv = gmCreateObj(oform, "label", "gl-ldesc");
	gmCreateButton(oform, "button", "gl-sdesc", bDescA, tDescA, vDescA, function() {
		return lgmToggleSearchDesc('gl-sdesc');
	});
	gmCreateInput(oform, "text", "gl-scount", "", "number of hits", 1, null, null, null);

	var selCap = "SA";
	var selTit = "De-/Select All";
	if (gmIsClipboardSupported()) {
		selCap = "CA";
		selTit = "Select & Copy All";
	}
	gmCreateButton(oact, "button", "gl-aselect", selCap, selTit, null, function() {
		return lgmSelectall('gl-resultplain', 'gl-resultlink');
	});
	gmCreateButton(oact, "button", "gl-ashowplain", "PR", "Show Plain Results", null, function() {
		lgmShow('gl-resultplain', 'gl-resultlink');
	});
	gmCreateButton(oact, "button", "gl-ashowlink", "RL", "Show Results as Link", null, function() {
		lgmShow('gl-resultlink', 'gl-resultplain');
	});

	gmCreateObj(ores, "div", "gl-resultplain");
	gmCreateObj(ores, "div", "gl-resultlink");

	gmAddObj(contlinks, gmGetBody());
	lgmShowhide(h_off);
}

/**
 * Shows the layer in param f and hides the layer in param b.
 *
 * @param f -
 *            the layer to put in front
 * @param b -
 *            the layer to put in the bakc
 */
function lgmShow(f, b) {
	var obf = gmGetStyle(f);
	var obb = gmGetStyle(b);

	if (obf && obb) {

		var idxF = gmGetAtI(obf, "index");
		//var idxF = obf.zIndex;

		var idxB = gmGetAtI(obb, "index");
		//var idxB = obb.zIndex;
		if (!idxF || isNaN(idxF) || idxF == '') {
			idxF = 910;
		}
		if (!idxB || isNaN(idxB) || idxB == '') {
			idxB = idxF - 1;
		}
		if (idxF < idxB) {
			var i = idxF;
			idxF = idxB;
			idxB = i;
		}
		gmSetAtI(obf, "index", idxF);
		gmSetAtI(obf, "visibility", "visible");
		gmSetAtI(obf, "left", 0);
		gmSetAtI(obb, "index", idxB);
		gmSetAtI(obb, "visibility", "hidden");
		gmSetAtI(obf, "left", 2000);
	}
}

/**
 * Switch the search mode.
 *
 * @param button - the button to read the current state from
 */
function lgmToggleSearchDesc(button) {
	var oBut = gmGetElI(button);
	if (oBut){
		var curValue = gmGetAtI(oBut, "value");
		if (curValue == vDescD) {
			gmSetCoI(oBut, bDescA);
			gmSetAtI(oBut, "value", vDescA);
			gmSetAtI(oBut, "title", tDescA);
		} else {
			gmSetCoI(oBut, bDescD);
			gmSetAtI(oBut, "value", vDescD);
			gmSetAtI(oBut, "title", tDescD);
		}
	}
}

/**
 * Shows the complete layer with a default size or special size.
 *
 * @param onoff -
 *            a numeric height, on, off or null
 * @returns {Boolean} always false
 * @see #h_on
 * @see #h_off
 * @see #hmin
 * @see #hmax
 * @see #hmaxauto
 */
function lgmShowhide(onoff) {
	var c = gmGetElI('gl-container');
	var styleC = gmGetStyle(c);

	var c1 = gmGetElI('gl-resultbox');
	var styleC1 = gmGetStyle(c1);

	var bts = gmGetElI('gl-sshow');
	var ocountt = gmGetElI("gl-scount");

	var h;

	if (onoff) {
		h = onoff;
	} else {
		h = parseFloat(gmGetAtI(styleC, "height"));
		//h = c.css("height");
	}

	if (h == h_on || h == parseFloat(hmin)) {
		// if container should be shown or currently is at min size
		//alert("will be maximize " + h);
		h = hmax;
		var cnt = gmGetAtI(ocountt, "value");
		if (!isNaN(cnt)) {
			h = hmaxauto;
		} else {
			h = hmin;
		}
	} else {
		//alert("will be mini" + h);
		h = hmin;
	}

	var btntext = bshow;
	if (h == hmin) {
		btntext = bshow;
	} else {
		btntext = bhide;
	}

	gmSetAtI(styleC, "height", h);
	gmSetAtI(styleC1, "height", h);
	//alert(h);

	gmSetCoI(bts, btntext);

	return false;
}

/**
 * Clears any filter text and searchs again.
 *
 * @param a -
 *            the search input containing the text-filter
 * @returns {Boolean} always false
 */
function lgmRemall(a) {

	var oa = gmGetElI(a);

	if (oa) {
		gmSetAtI(oa, "value", "");
		lgmFilterURL(oa);
		oa.focus();
	}
	return false;
}

/**
 * @param selElementA
 * @param selElementB
 * @returns {Boolean} always false
 */
function lgmSelectall(selElementA, selElementB) {
	var osel = null;

	var oa = gmGetElI(selElementA);
	var styleOA = gmGetStyle(oa);

	if (oa != null && gmGetAtI(styleOA, "visibility") == "visible") {
		osel = oa;
	} else {
		var ob = gmGetElI(selElementB);
		var styleOB = gmGetStyle(ob);

		if (ob != null && gmGetAtI(styleOB, "visibility") == "visible") {
			osel = ob;
		}
	}

	if (osel != null) {
		var bForce = false;
		if (gmIsClipboardSupported()) {
			bForce = true;
		}
		var selText = gmSelectText(osel, bForce);
		if (selText) {
			try {
				if (unsafeWindow) {
					unsafeWindow.copyPostToClipboard(selText);
				}
			} catch (ignored) {
				// ignored
			}
		}
	}
	return false;
}

/**
 * Search for all matching URLs and shows them the result.
 *
 * @param a -
 *            the search input containing the text-filter
 * @returns {Boolean} always false
 */
function lgmFilterURL(a) {
	var oa = gmGetElI(a);
	//var oa = $(a);

	if (oa) {
		var sea = gmGetAtI(oa, "value");
		lgmShowLinks(sea);
		lgmShow('gl-resultplain', 'gl-resultlink');
		lgmShowhide(h_on);
	}
	return false;
}

/**
 * Searchs for all URL in the page and optional filters by a regular expression.
 *
 * @returns {Boolean} always false
 */
function lgmShowLinks(sea) {
	var oresplaind = gmGetElI("gl-resultplain");
	var oreslinkd = gmGetElI("gl-resultlink");
	var ocountt = gmGetElI("gl-scount");

	// search for all matching links in the page
	var pagelinks = new Array();
	if (bTestMode) {
		pagelinks = gmGenTestEntries(sea);
	} else {
		var sMode = gmGetAtI("gl-sdesc", "value");
		pagelinks = gmFindLinksInPage(sea, sMode);
	}

	var linkstbl = new Array();
	var alllinks = new Array();

	//alert(pagelinks.length);
	pagelinks = gmSortArray(pagelinks, null);
	var tblrow = null;

	// now build the output
	for ( var i = 0; i < pagelinks.length; i++) {
		if (i % 50 == 0) {
			gmSetAtI(ocountt, i);
		}
		var curlink = pagelinks[i][0];
		var curcap = trim(pagelinks[i][1]);

		if (curcap != null) {
			curcap = curcap.replace(/[\n\r]/g, '');
			if (curcap.indexOf("<") >= 0) {
				curcap = curcap.replace(/<(?:.|\n)*?>/gm, '').replace(/\s{2,}/gm, ' ');
			}
		}
		if (curcap == null || curcap == "" || curcap == "#") {
			curcap = "n/a";
		}

		// row for plain text
		tblrow = gmCreateObj(null, "tr", null);
		var plainlink = gmCreateObj(tblrow, "td", null);

		gmSetAtI(plainlink, "title", curcap + "\n[" + curlink + "]");
		gmSetCoI(plainlink, curlink);

		linkstbl.push(tblrow);

		// row for htmllink
		var alink = gmCreateLink(null, scriptID + i, curlink, curcap, curcap, "_blank", null);
		gmSetAtI(alink, FL_TAG, FL_ID);

		alllinks.push(alink);
	}

	if (oresplaind) {
		gmEmptyObj(oresplaind);

		var tblPlain = gmCreateObj(oresplaind, "table", null);
		for ( var idxLinks = 0; idxLinks < linkstbl.length; idxLinks++) {
			gmAddObj(linkstbl[idxLinks], tblPlain);
		}
		gmCreateObj(oresplaind, "br", null);
	}

	if (oreslinkd) {
		gmEmptyObj(oreslinkd);
		alllinks.sort();

		for ( var idxLinks = 0; idxLinks < alllinks.length; idxLinks++) {
			gmAddObj(alllinks[idxLinks], oreslinkd);
			gmCreateObj(oreslinkd, "br", null);
		}

		gmCreateObj(oreslinkd, "br", null);
	}

	if (ocountt) {
		gmSetAtI(ocountt, "value", pagelinks.length);
	}

	return false;
}

//
//GM-Script specific code - END
//

/**
 * Adds site which should be known by this script.
 * Can be left empty.
 */
function lgm_addKnownSites() {
	gmAddSite("watch?", "(|.+?\.)youtube\..+?", ".*");
	gmAddSite("watch", "(|.+?\.)myvideo\..+?", ".*");
	gmAddSite("video", "(|.+?\.)dailymotion\..+?", ".*");
	gmAddSite("watch", "(|.+?\.)metacafe\..+?", ".*");
	gmAddSite("10", "devzone\\..+?\\.(net|eu)", "/test/gmonkey/.*");
};

/**
 * Adds CSS-Styles for this script.
 * Can be left empty.
 */
function lgm_addStyles() {
	// the main container
	var style = new Array();
	style.push('#gl-container {position:fixed; top:0px; right:1px; margin:0px; padding:0px; text-align:left; vertical-align:top; width:225px; max-height:99.5% !important; overflow:hidden !important; z-index:9998 !important;}');
	style.push('#gl-container {color: #000000; background-color: #CED8F6; font-family:Courier New,Arial; font-size:11px;}');
	// General Styles
	style.push('#gl-container, #gl-container input, #gl-container button, #gl-resultplain, #gl-resultlink { -moz-border-radius: 5px; border-radius: 5px; }');
	style.push('#gl-container input {margin-right:3px; width:auto; border:2px solid #819FF7; color:#000000; background-color:#ffffff; font-family:Arial, Courier New; font-size:11px; font-weight: bold;}');
	style.push('#gl-container input:hover, #gl-container input:focus {background-color:#FFFFCC; }');
	style.push('#gl-container button {border:2px solid #819FF7; color:#000000; background-color:#ffffff; margin:0px; padding:0px; font-family:Arial, Courier New; font-size:11px; font-weight: bold; }');
	style.push('#gl-container button:hover {border:2px solid #ffffff; color:#ffffff; background-color:#819FF7; }');
	// Search Box
	style.push('#gl-container #gl-searchbox {position:relative; top:0px; left:0px; padding;0px; margin:0px; white-space:nowrap;}');
	style.push('#gl-container #gl-searchform {margin:3px; padding;0px;}');
	style.push('#gl-container #gl-searchform #gl-searchtext {min-width:50px; max-width:115px;}');

	style.push('#gl-container #gl-searchbox #gl-scount {min-width:5px; max-width:25px; margin-left:3px; text-align:right; background-color:#EFF2FB; }');

	style.push('#gl-container #gl-actionbox {position:relative; top:0px; right:0px; padding: 0px 3px; margin: 0px; white-space:nowrap;}');
	style.push('#gl-container #gl-actionbox div {color: #000000; background-color: #ffffff; white-space:nowrap;}');

	// Result Box
	style.push('#gl-container #gl-resultbox div {color: #000000; background-color: #ffffff; white-space:nowrap;}');
	style.push('#gl-container #gl-resultbox {position:relative; top:0px; right:0px; padding: 0px 3px; margin: 0px; max-width:100%; max-height: 99.5%; height:99.5%; overflow:hidden;}');
	style.push('#gl-container #gl-resultbox tr, #gl-container #gl-resultbox table {padding:0pt; margin:0pt;}');
	style.push('#gl-container #gl-resultbox td, #gl-container #gl-resultbox a {font-family:Courier New, Arial; font-size:9pt !important; white-space:nowrap; padding: 0pt; margin 0pt; line-height:10pt !important}');
	style.push('#gl-container #gl-resultbox #gl-resultplain {position:relative; top:0px; left:0px; padding: 0px; margin: 0px; min-width:100%; min-height: 97%; max-width:100%; max-height: 97%; height: auto; overflow: auto; visibility:visible; z-index: 910;}');
	style.push('#gl-container #gl-resultbox #gl-resultlink	{position:absolute; top:0px; left:0px; padding: 0px; margin: 0px; min-width:100%; min-height: 97%; max-width:100%; max-height: 97%; height: auto; overflow: auto; visibility:hidden; z-index: 909; color:red;}');
	style.push('#gl-container #gl-resultbox #gl-resultlink a { color:#000066; font-family:Arial,Courier New; line-height:120%;}');
	style.push('#gl-container #gl-resultbox #gl-resultlink a:hover { color: #990000;}');
	gmAddStyleGlobal(style);
	return;
};

/**
 * Adds HTML-Objects for this script.
 * Can be left empty.
 */
function lgm_addControls() {
	lgmAddControlsGrabLinks();
};

/**
 * The first action which should be excecuted in this script.
 * Can be left empty.
 */
function lgm_addInitAction() {
	return true;
};

gmInitEventHandler();
