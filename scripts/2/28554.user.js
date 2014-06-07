// ==UserScript==
// @name           youtube.com - confirm
// @namespace      http://userscripts.org/users/33073/scripts
// @description    confirms your birthdate automatically for you
// @include        http://youtube.com/verify_age*
// @include        http://www.youtube.com/verify_age*
// ==/UserScript==

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

var button = $x("//input[@type='submit' and @name='action_confirm' and @value='Confirm Birth Date']");
if (button.length) button[0].click();