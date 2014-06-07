// ==UserScript==
// @namespace	http://userscripts.org/users/293336
// @name	Citibank Demouse (HU)
// @description	Restores keyboard entry for your Citibank-hu password. 
// @license	Creative Commons Attribution License
// @version	0.2
// @compatible	Greasemonkey
// @include	https://www.citibank.hu/HUGCB/JPS/portal/*
// @include	https://www.citibank.hu/HUGCB/JSO/chpw/*

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



