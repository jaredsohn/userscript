// ==UserScript==
// @name           HuskyMail proper login
// @namespace      tag:brainonfire.net,2009-09-16:huskymail-proper-login
// @description    Recreates the HuskyMail login form in a sane manner, one that will allow your browser to remember your password.
// @include        https://neuidm.neu.edu/opensso/UI/Login?*
// @license        GPL
// @version        0.2
// @changelog      Since 0.1: Also replace IDButton field.
// ==/UserScript==

/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

/** Remove each node from its parent. */
function removeFromParent(el, i, all) {
	el.parentNode.removeChild(el);
}

// grab real form
var realForm = $xpath('//form[contains(@action, "AMAuthCookie")]')[0];
realForm.parentNode.removeChild(realForm);

// replace visible UI with real form
var enclosingUITables = $xpath('//table[.//input[@id="IDToken1"]]');
var UIZone = enclosingUITables[enclosingUITables.length - 1];
var uipar = UIZone.parentNode;
uipar.insertBefore(realForm, UIZone);
uipar.removeChild(UIZone);
//var tbody = $xpath('./tbody', UIZone)[0];
//Array.slice(tbody.childNodes).forEach(removeFromParent);

// Create better UI
var markup = '\
	<input type="hidden" name="IDToken0" /> \
	<label>Username: <input type="text" name="IDToken1" value="" /></label><br> \
	<label>Password: <input type="password" name="IDToken2" /></label><br> \
	<button name="IDButton" value="Log In">Login</button> \
';
var newUI = document.createElement('div');
newUI.innerHTML = markup;

// Replace hidden fields with visible ones
var toKill = [];
toKill = toKill.concat($xpath('.//input[@type="hidden"][starts-with(@name, "IDToken")]', realForm));
toKill = toKill.concat($xpath('.//input[@type="hidden"][@name="IDButton"]', realForm));
toKill.forEach(removeFromParent);
realForm.insertBefore(newUI, realForm.firstChild);

