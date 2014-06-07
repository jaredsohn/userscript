// ==UserScript==
// @name           Utility Functions
// @namespace      http://www.arthaey.com
// @description    Utility functions that are useful for multiple Greasemonkey scripts
// @version        1.0
// ==/UserScript==

/* HOW TO USE:
 *
 *    This "script" is not meant to do anything on its own. It is a collection
 *    of utility functions that other Greasemonkey script writers may find
 *    useful in their own scripts.
 *
 * FUNCTIONS:
 *  - debug(msg)
 *  - getElementsByIdRegExp(regex)
 *  - getElementsByClassName(class, tag, element)
 *  - String.trim()
 *
 * CHANGELOG:
 *  v1.0 - initial release (debug, getElementsByClassName, getElementsByIdRegExp)
 */

/* DEBUGGING FUNCTIONS ********************************************************/

var DEBUG = true;

function debug(msg) {
    if (DEBUG) console.log("DEBUG: " + msg);
}

/******************************************************************************/

/* Finds elements whose id matches the given regexp. */
function getElementsByIdRegExp(regex) {
    var matchingElements = [];
    if (!regex) return matchingElements;

    var elements = document.getElementsByTagName("*");
    var element;

    for (var i = 0; i < elements.length; i++) {
	element = elements[i];
	if (element.id.match(regex)) {
	    matchingElements.push(element);
	}
    }

    return matchingElements;
}

/*
 * Written by Jonathan Snook, http://www.snook.ca/jonathan
 * Add-ons by Robert Nyman, http://www.robertnyman.com
 */
function getElementsByClassName(className, tag, elm){
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for(var i=0; i<length; i++){
	current = elements[i];
	if(testClass.test(current.className)){
	    returnElements.push(current);
	}
    }
    return returnElements;
}

/* STRING FUNCTIONS ***********************************************************/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

/******************************************************************************/
