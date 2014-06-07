// ==UserScript==
// @name           skg
// @namespace      skg
// @description    State Bank Of India Gateway.
// @include        https://www.onlinesbi.com/merchant/merchantprelogin.htm*
// ==/UserScript==
function sk()
{
var form = document.forms.namedItem('quickLookForm');
if(form.elements.namedItem('userName')){
form.elements.namedItem('userName').value='ENTER USER NAME HERE';
form.elements.namedItem('password').value='ENTER PASSWORD HERE';
var e1 = form.elements.namedItem('Button2');
e1.click();
	}
	else{
	var e2 = form.elements.namedItem('confirm');
	e2.click();
	}
}
sk();