// ==UserScript==
// @name            digg-me-later-helper Perry-mod
// @namespace       DiggMeLaterHelper
// @include         http://digg.com/tools/diggthis.php*
function do_helper_script() {
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/FORM[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: #fff199;",null,null);
}; // Ends do_helper_script


window.addEventListener("load", function() { do_helper_script() }, false);


function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};

//.user.js
