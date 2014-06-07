// ==UserScript==
// @name           babelfish eng2eng
// @namespace      noon
// @description    Add english to english to the dropdown and autoselect
// @include        http://babelfish.altavista.com/babelfish/tr
// ==/UserScript==

// Turn autosubmission of form on or off (see bottom)
var autosubmit = false;

// Create new option
var eng2eng = document.createElement('option'); 
eng2eng.text = 'English to English';
eng2eng.value = 'en_en';

// Get the select lists
var ddls = document.getElementsByName('lp');

// Grab the web page translation select list (2nd one)
var ddl = ddls.item(1);

// Remove the default option
ddl.remove(0);

// Add new option to web page translation select list
ddl.add(eng2eng, ddl.options[0]);

// Select the newly added english to english option
ddl.options[0].selected=true;

// Submit the form automatically
//
// This is useful if you set up a keyword for searchboxes (right click a
// searchbox if you don't know about this yet
//
// With a keyword set for searchboxes you can quickly use a site's search by
// doing a CTRL+L (jump to address bar) followed by <keyword> <searchterm>
//
// Example: CTRL+L, bf google.com
if (autosubmit) {
	document.forms[1].submit();
}