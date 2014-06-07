// Citibank Demouse

// Version $Id: citibank-demouse.user.js,v 1.3 2010/03/20 03:24:29 az Exp $
// updated march 2010 to work with the new citibank layout

// Copyright 2007-2010 Alexander Zangerl
// Released under the GPL Version 1, http://www.gnu.org/copyleft/gpl.html

// What does this thing do? 
// It gets rid of the annoying virtual keyboard that citibank online forces 
// on you.
// This particular setup sucks especially badly, as there's no security gain 
// whatsoever: Your password is simply copied character-by-character into 
// the password input field.
// All the virtual keyboard does is waste your time hunting the characters 
// and worse, it also makes shoulder-surfing trivial.
// Well, no more. This script restores normal input (until the Citibankers 
// change their setup, of course.).

// This seems to work for other Citibanks as well, if the user adds 
// an appropriate @include. Thanks to Federico Schwindt for pointing
// out the UK location.

// ==UserScript==
// @namespace     http://snafu.priv.at/mystuff/citibank-demouse
// @name          Citibank Demouse
// @description   Restores keyboard entry for your Citibank-AU password. 
// @include       https://www.citibank.com.au/AUGCB/JSO/signon/DisplayUsernameSignon.do
// @include       https://cukehb*.cd.citibank.co.uk/CappWebAppUK/productone/capp/action/selectusersignon.do
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) 
{ 
	if (inputs[i].getAttribute('type') == 'password') 
	{

// the original mess, until march 2010:
//<input type="password" id="password" name="password" 
// size="18" maxlength="50" value="" class="soInput" readonly="true"
// onfocus='randomizeKeys(); alertFieldId=this; showVkb(this); 
// focusKey="password"; focusId="1";'
// onclick='alertFieldId=this; showVkb(this); focusKey="password"; focusId="1";'>

// march 2010 onwards:
// <input type="password" id="password" name="password" 
// size="18" maxlength="50" value="" class="soInput"  readonly="true"
// onKeyUp='alertFieldId=this; showVkb(this); focusKey="password"; focusId="1";'
// onKeyDown='alertFieldId=this; showVkb(this); focusKey="password"; focusId="1";'
// onclick='alertFieldId=this; showVkb(this); focusKey="password"; focusId="1";'>

		inputs[i].removeAttribute('readonly');
		inputs[i].removeAttribute('onfocus');
		inputs[i].removeAttribute('onclick');
		inputs[i].removeAttribute('onkeyup');
		inputs[i].removeAttribute('onkeydown');
		
		// citibank passwords care case-insensitive and I'm lazy
		inputs[i].setAttribute("onblur",'this.value=this.value.toUpperCase();');
	}
}



