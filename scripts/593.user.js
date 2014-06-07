// IdentifyPasswordFields
// version 0.1
// 2005-05-04
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Identify Password Fields", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// You can't tell which fields are password fields, that will obfuscate
//  your password as ****** instead of displaying it in plain view.
// This script helps you identify password fields with a certain background.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Identify Password Fields
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Shows which fields are password fields with a different background
// @include         http://*
// @include         https://*
// ==/UserScript==

var addGlobalStyle = function(css) {
    style = document.createElement("style");
	style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
};


// add a CSS rule (simpler way, using smarter CSS selector)
var rule = "input[type='password'] { background-image: url(data:image/gif,GIF89a%04%00%04%00%B3%00%00%FF%FF%FF%FF%FF%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%00%00%FF%00%00%00%CC%CC%CC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%09%00%2C%00%00%00%00%04%00%04%00%00%04%070I4k%A22%02%00%3B) }";
addGlobalStyle(rule);

/*
// add a CSS rule
var rule = "input.GM_PasswordField { background-image: url(data:image/gif,GIF89a%04%00%04%00%B3%00%00%FF%FF%FF%FF%FF%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%00%00%FF%00%00%00%CC%CC%CC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%09%00%2C%00%00%00%00%04%00%04%00%00%04%070I4k%A22%02%00%3B) }";
addGlobalStyle(rule);


// find all password fields
var xpath = "//input[translate(@type, 'PASSWORD', 'password') = 'password']";
var res = document.evaluate(xpath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
for (var inputIndex = 0; inputIndex < res.snapshotLength; inputIndex++) 
{ 
    passwordInput = res.snapshotItem(inputIndex);
    // mark them with that class
    passwordInput.className += " GM_PasswordField";
}
*/
