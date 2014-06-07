/*	Ping-o-Matic Alternative Style
*/

// ==UserScript==
// @name          Ping-o-Matic Alternative Style
// @namespace     http://joeanderson.co.uk/blog/
// @description	  Another style for Pingomatic.
// @include       http://www.pingomatic.com/
// @include       http://pingomatic.com/
// ==/UserScript==

function do_platypus_script() {
platypus_do_function(window, 'remove',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/H1[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'remove',document.getElementById('sent'),'null');
platypus_do_function(window, 'remove',document.getElementById('menu'),'null');
platypus_do_function(window, 'set_style_script',document.getElementById('rap'),'color: white;background-color: silver;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/H2[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: black;background-color: silver;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/FIELDSET[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: gray;background-color: silver;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/FIELDSET[2]/LEGEND[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: gray;background-color: silver;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/FIELDSET[2]/H3[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: gray;background-color: silver;font-style: normal;font-weight: lighter;font-size: medium;border-width: thin;');
platypus_do_function(window, 'set_style_script',document.getElementById('blogurl'),'color: black;background-color: silver;font-style: normal;font-weight: lighter;font-size: medium;border-style: solid;border-width: medium;');
platypus_do_function(window, 'set_style_script',document.getElementById('title'),'color: black;background-color: silver;font-style: normal;font-weight: lighter;font-size: medium;border-style: solid;border-width: medium;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/P[1]/INPUT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: white;background-color: silver;font-style: normal;font-weight: lighter;font-size: small;border-style: solid;border-width: thin;border-color: gray;');
platypus_do_function(window, 'do_insert_html',document.getElementById('footer'),'Modification licensed under the <a href="http://www.mozilla.org/MPL/MPL-1.1-annotated.html">Mozilla Public License</a> by <a href="http://joeanderson.co.uk/blog/">Joe Anderson</a>',false,false);
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: gray;background-color: silver;text-align: center;font-style: normal;font-weight: normal;font-size: medium;border-style: none;border-width: none;border-color: gray;');
platypus_do_function(window, 'center',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'do_insert_html',document.getElementById('footer'),'<p align="center">Licensed under the <a href="http://www.mozilla.org/MPL/MPL-1.1-annotated.html">Mozilla Public License</a> by <a href="http://joeanderson.co.uk/blog/">Joe Anderson</a>.',false,false);
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/SPAN[1]/P[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: gray;background-color: silver;text-align: center;font-style: normal;font-weight: normal;font-size: medium;border-style: none;border-width: none;border-color: gray;');
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);//.user.js