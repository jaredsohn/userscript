// ==UserScript==
// @name            TMBW Font Fix
// @namespace       Platypus
// @include         http://tmbw.net/*
function do_platypus_script() {
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-family: arial;font-style: normal;font-weight: normal;",null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
//  Dave Vickery - 21/08/07
//  Altered this Playpus script to change the font-family from Georgia to Arial - easier on the eye.
// 

function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};