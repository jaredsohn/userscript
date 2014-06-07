//
// Written by Brad Curfman
// Script Version: 1.2
//
//
// ==UserScript==
// @name          ETrade Bill Pay
// @namespace     http://userscripts.org/scripts/show/xxxx
// @description   Ensures that the correct account is selected for bill pay whenever you load the bill pay page.
// @include       https://*.etrade.com/*billpay*
// ==/UserScript==

// **************************************************************************
// If you want to use another account for bill pay for any reason, 
// then you must temporarily disable this script.
//
// If you run this script without acctOptionValue variable, then
// you will get an alert box that shows the available accounts to 
// choose from.
// **************************************************************************


// This is the value of the option element that matches the value of the account you want to use for bill pay
// The account that I use for bill pay is 'MU:1', so yours will probably be similar.
var acctOptionValue = '';


// These are the variables used to reference the form and the select box that will be used
// There is only one form on the page with this name
var theForm = document.getElementsByName('fundAcctForm')[0];
// There are two HTML fields on the page with this name. The first is the select box, the second is a hidden field
// in the form for submitting payments. We want to use the first one in this script.
var fundAcct = document.getElementsByName('fundAcct')[0];

var errmsg = (theForm) ? "" : "Could not find 'fundAcctForm' form in DOM\n";
errmsg += (fundAcct) ? "" : "Could not find the 'fundAcct' field in DOM";
if ( errmsg ) {
  return;
}

// Loops thru the accounts on the page if you haven't specified one to let you know what value to use
// for the acctOptionValue variable.
if ( acctOptionValue == '' ) {
  var msg = 'Choose the value to the left of the equals sign that corresponds to the desired account to use for bill pay.' 
    + ' Then, set the "acctOptionValue" variable in this script to that value and reload the page.\n\nAvailable accounts:\n';
  
  for (var i=0; i<fundAcct.options.length; i++) {
    var value = fundAcct.options[i].value;
    if ( value ) {
      msg += '    ' + fundAcct.options[i].value + '  =  ' + fundAcct.options[i].text + '\n';
    }
  }
  alert(msg);
  return;
}


// Returns the dimensions of the given field element
function getDim(el){
  for (var lx=0,ly=0;el!=null;lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
  return {x:lx,y:ly}
}

var divDimensions = getDim(fundAcct);

var divMsgNotReady = '<div style="padding: 0px 5px 0px 5px; color: #ffffff; background-color: #aa0000; font-size: 1.2em; font-weight: bold; left: ' 
  + (divDimensions.x+fundAcct.clientWidth) + 'px; top: ' + (divDimensions.y+2) + 'px; position: absolute;">Changing to correct Account...</div>';

var divMsgReady = '<div style="padding: 0px 5px 0px 5px; color: #ffffff; background-color: #00aa00; font-size: 1.2em; font-weight: bold; left: ' 
  + (divDimensions.x+fundAcct.clientWidth) + 'px; top: ' + (divDimensions.y+2) + 'px; position: absolute;">Correct Account is selected</div>';

// loop thru each option in the SELECT element to find the one with the value matching our desired account
for (var i=0; i<fundAcct.options.length; i++) {
  if (fundAcct.options[i].value == acctOptionValue) {
    // if the desired option isn't selected, select it and submit the form
    if ( fundAcct.options[i].selected == false ) {
      fundAcct.selectedIndex = i;
      theForm.submit();
      document.body.innerHTML += divMsgNotReady;
    }
    // otherwise, create our DIV tag with the ready message
    else {
      document.body.innerHTML += divMsgReady;
    }
    break;
  }

}
