// ==UserScript==
// @name          SMS Flick GM tool
// @description   group message with ease
// @include       http://www.smsflick.com/index.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	  1.0.2
// ==/UserScript==

var userform = document.getElementById("userfrm");
var myElement = document.createElement("<input type='button' onclick='changeText()' value='Change Text'/>");

if (userform) {
    userform.parentNode.insertBefore(myElement, userform);
}

function changeText()
{
	document.getElementByName("f_phone").value = "+639274034064";
}