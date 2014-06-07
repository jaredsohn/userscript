// ==UserScript==
// @name           Remove ING DIRECT Security Through Obscurity
// @description    Simplifies needlessly complex ING login form, allowing one to, gasp, actually type their pin into a secure form.
// @include https://*ingdirect*displayLogin*
// @include https://*ingdirect*displayCustomerAuthenticate*

// ==/UserScript==

/*  Copyright (C) 2008 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    The GPL is also available from my site, at http://www.prism.gatech.edu/~mflaschen3/gpl.txt
*/

letrs = new Array();

function processKeyPress(e)
{
  var oldVal=e.target.value;
  var charCode=e.which;
  if(charCode == 8)
  {
      window.location = "javascript:emptyText()";
      myBox.value = "";
  }
  if(charCode == 13)
  {
      window.location = "javascript:custAuthSubmit()";
  }
  if(charCode == 0)
    return true;
  else
  {
    var entChar=String.fromCharCode(charCode);
    if(!isNaN(entChar) && !entChar.match(/\s/))
    {
	window.location = "javascript:addClick(\"" + letrs[entChar] + "\")";
    }
  }
}
var myBox;

function setupInterface()
{
    document.getElementById("nimbus_dlgBoxBottom").removeChild(document.getElementById("clickOnlyText"));
    keypad.style.display = "none";

    document.getElementById("clickOnlyHeader").childNodes[1].innerHTML = "Enter the numbers of your Login PIN."

    var leftUIControls = document.getElementById("nimbus_dlgBoxUIControls");
    var rightUIControls = leftUIControls.nextSibling.nextSibling;

    var contBtn = document.getElementById("continueBtn");
    contBtn.parentNode.removeChild(contBtn);
    document.getElementById("nimbus_dlgBoxTop").insertBefore(contBtn, document.getElementById("nimbus_dlgBoxSeperator"));
    
    leftUIControls.style.display = "none";
    rightUIControls.style.display = "none";

    myBox = document.createElement("input");
    myBox.setAttribute("id", "myPinBox");
    myBox.setAttribute("type", "password");
    myBox.setAttribute("maxlength", "4");
    myBox.style.width = "100px";

    myBox.addEventListener("keypress", processKeyPress, false);
    document.getElementById("nimbus_dlgBoxTop").insertBefore(myBox, document.getElementById("nimbus_dlgBoxUIControls"));
    myBox.focus();
}

function setupKey(curKey, digit)
{
    var myUp = curKey.getAttribute("onmouseup");
    var onmouseupInd = myUp.indexOf("addClick");

    codeText = myUp.substring(onmouseupInd + 10, onmouseupInd + 15); 
    letrs[digit] = codeText;
}

keypad = document.getElementById("nimbus_keypad");

if(keypad && keypad != null)
{
    window.addEventListener("load", setupInterface, false);
    
    var keypadImgChildren = keypad.getElementsByTagName("img");
    
    setupKey(keypadImgChildren[10], 0);

    for(var i = 1; i <= 9; i++)
    {
	setupKey(keypadImgChildren[i - 1], i);
    }
}