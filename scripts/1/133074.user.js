// ==UserScript==
// @name        ThePinUpFiles Thumbnail Remover
// @namespace   TTR
// @description Replaces thumbnails with full pictures 
// @include     http://www.thepinupfiles.com/*
// @include     http://thepinupfiles.com/*
// @include     http://www.thepinupfiles.com
// @include     http://thepinupfiles.com
// @version     1
// ==/UserScript==

function do_platypus_script() {
do_modify_html_it(window.document,document.getElementById('gallery'),/_sm/g,'',null);
do_modify_html_it(window.document,document.getElementById('gallery'),/_SM/g,'',null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");
//
//
//
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};


//.user.js