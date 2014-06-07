/*	BugMeNot Clean-Up GreaseMonkey Script
*/

// ==UserScript==
// @name          BugMeNot Cleaner Layout
// @namespace     http://joeanderson.co.uk/blog/
// @description	  Make BugMeNot faster and nicer looking!
// @include       http://www.bugmenot.com/
// @include       http://bugmenot.com/
// ==/UserScript==

function do_platypus_script() {
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[11]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/H2[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/UL[1]/LI[8]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);//.user.js