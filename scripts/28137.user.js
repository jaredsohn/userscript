// ==UserScript==
// @name           MyNEU proper login
// @namespace      tag:brainonfire.net,2008-06-09:myneu-proper-login
// @description    Recreates the MyNEU login form in a sane manner, one that will allow your browser to remember your password.
// @include        https://myneu.neu.edu/cp/home/displaylogin
// @include        http://myneu.neu.edu/cp/home/displaylogin
// @version        0.6
// @changelog      Since 0.5: Added http: version.
// ==/UserScript==

/* From http://wiki.greasespot.net/Code_snippets */
function $x(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

var uuid = /document\.cplogin\.uuid\.value="([0-9a-f-]{36})";/.exec(document.getElementsByTagName('head')[0].innerHTML)[1];

var submitTo = document.getElementsByName('cplogin')[0].action;
var submitTo_safe = submitTo.replace(/"/g, '&quot;');

var properForm =
'<form action="%FormAction%" method="post"> \
	<label>Username: <input type="text" name="user" value="" /></label><br> \
	<label>Password: <input type="password" name="pass" /></label><br> \
	<input type="hidden" name="uuid" value="%UUID%" /> \
	<button>Login</button> \
</form>'.replace('%FormAction%', submitTo_safe).replace('%UUID%', uuid);

$x('//table[.//input[@type="password"][@name="pass"]]').pop().parentNode.innerHTML = properForm;

