// ==UserScript==
// @name            auto select the TEXTBOX
// @description     Clicks randomcreature for leveling up on Avadopts
// @include         https://portal2.passportindia.gov.in/AppOnlineProject/secure/showSlotsByLocation
// @include         https://portal1.passportindia.gov.in/AppOnlineProject/secure/showSlotsByLocation
// @require         http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js
// ==/UserScript==

//--- Note that the contains() text is case-sensitive.


var box = document.evaluate("//input[@type='text']",document,null,9,null).singleNodeValue;

if(box!=null && box) {
box.focus();
}