// ==UserScript==
// @name           BOA Confirm Sitekey
// @namespace      http://userscripts.org/users/309240
// @description    Enter the sitekey confirmation data on BOA's site
// @include        https://sitekey.bankofamerica.com/sas/*
// ==/UserScript==

// Enter your BOA password here
var myPass = "mypassword";

// No need to edit anything below here
window.addEventListener ("load", GSFunc, false);

function GSFunc()
{
  if (myPass == "mypassword") {
  alert("For GreaseMonkey to automatically log you in to BOA, you MUST edit the userscript you've installed!\n\nChange the 'mypassword' value to your actual BOA signin password, then reload this page.");
  } else {  
  var passcodeTextbox = document.getElementById("passcode");
  passcodeTextbox.value = myPass;
  var signinButton = document.getElementById("signon");
  window.location = signinButton.href;
  }
}

