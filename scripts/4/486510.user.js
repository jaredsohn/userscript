// ==UserScript==
// @name        zShowPass
// @namespace   zLiquidMethod
// @version     0.2
// @description Shows password on mouseOver and focus, hides on mouseOut and blur
// @match       http://*/*
// @copyright   Dustin Zappa 2014
// @updateURL   http://userscripts.org/scripts/source/486510.meta.js
// @downloadURL http://userscripts.org/scripts/source/486510.user.js
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////
// functions
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Name: clearText
// Abstract:
//////////////////////////////////////////////////////////////////////////////
function clearText() {
    this.type = "text";
}



//////////////////////////////////////////////////////////////////////////////
// Name: obscureText
// Abstract:
//////////////////////////////////////////////////////////////////////////////
function obscureText() {
    this.type = "password";
}



//////////////////////////////////////////////////////////////////////////////
// Name: addEvents
// Abstract:
//////////////////////////////////////////////////////////////////////////////
function addEvents() {
    var passFields = document.querySelectorAll("input[type='password']");

    if (!passFields.length) {
            return;
        }

    for (var i = 0; i < passFields.length; i++) {
            passFields[i].addEventListener("mouseover", clearText, false);
            passFields[i].addEventListener("focus", clearText, false);
            passFields[i].addEventListener("mouseout", obscureText, false);
            passFields[i].addEventListener("blur", obscureText, false);
        }
}


//////////////////////////////////////////////////////////////////////////////
// events
//////////////////////////////////////////////////////////////////////////////

// execute after load, just in case they generate password fields via javascript
window.addEventListener("load", addEvents, false);

