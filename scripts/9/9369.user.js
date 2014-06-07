// ==UserScript==
// @name           rememberMeNot
// @namespace      http://gmscripts.bigsleep.net
// @description    Uncheck a login form checkbox and focus on submit button
// @version        1.1
// @include        http://userscripts.org/login
// ==/UserScript==

// Please make copies of this code, give it to your friends, change it,
//   modify it, steal it, rewrite it, use as you wish.
// But if you make money off it then I want half.
// ---- Notes ----
// For the sake of ultimate redundancy...
// This script can work on any login form with a checkbox,
//  it will find the first login box checkbox and uncheck it
//  it will focus on the submit button
//  if you change the password it will show in a tooltip
// If it does not find the correct box you can define
//  the checkbox name for any domain, see below
// You can also disable it and just use it to focus on the button,
//  just use "none" after the domain name, see below.

// ---- Options ----
// Name of box to uncheck or "none" to skip
//    - use this if there's more than one checkbox
// List format "domain1": "inputname1", "domain2": "inputname2"
// www.userscripts.org redirects so this example actually does nothing
var checkboxName = {"www.userscripts.org": "remember_me", "example.com": "none"};
// -----------------

// find first login form
var passBox, loginForm, submitBtn, rememberBox;
passBox = document.evaluate("//input[@type='password']", document,
    null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(passBox){
  loginForm = document.evaluate("ancestor::form", passBox,
      null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // if you change or enter a pass it will show in tooltip
  passBox.addEventListener("change", showTip, true);
  // Submit button - input or button
  submitBtn = document.evaluate("//*[@type='submit']", loginForm,
      null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var domain = window.location.host;
  if(checkboxName[domain]){
    if(checkboxName[domain] != "none"){
      rememberBox = loginForm.elements.namedItem(checkboxName[domain]);
    }
  }else{
    rememberBox = document.evaluate("//input[@type='checkbox']", loginForm,
        null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  // Uncheck box
  if(rememberBox && rememberBox.checked) rememberBox.checked = false;
  // or uncomment to check box
  //if(rememberBox) rememberBox.checked = true;
  if(submitBtn) submitBtn.focus();
}
function showTip(evt){
  passBox.title = passBox.value;
  return true;
}
