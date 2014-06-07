// ==UserScript==
// @name        Gixen - Bypass Nag Screen
// @namespace   http://userscripts.org/scripts/show/167883
// @author      Lozzy - http://userscripts.org/users/176320
// @description Automatically clicks past the nag screen shown every time you log into the Gixen.com bid sniper service.
// @include     http://www.gixen.com/home_2.php?username=*
// @version     1.0
// ==/UserScript==

var continueElement = document.evaluate("//form[input[@id='username'] and input[@type='submit']]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (continueElement) {

    var continueButton = document.evaluate("input[@type='submit']", continueElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    continueButton.click();
    
}