// ==UserScript==
// @name           Zooomr login with OpenID
// @namespace      tag:brainonfire.net,2007-06-25:zooomrautoopenid
// @description    Automatically move to OpenID login screen from regular login screen
// @include        http://beta.zooomr.com/*
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




var TrimPath;
if (TrimPath == null)
	TrimPath = new Object();
var breakpoint = TrimPath.breakpoint = function(evalFunc, msg, initialExprStr)
{
	if (msg == null)
		msg = "";
	var result = initialExprStr || "1+2";
	while (true)
	{
		var expr = prompt("BREAKPOINT: " + msg + "\nEnter an expression to evaluate, or Cancel to continue.", result);
		if (expr == null || expr == "")
			return;
		try
		{
			result = evalFunc(expr);
		}
		catch (e)
		{
			result = e;
		}
	}
}








if(location.pathname === '/login/')
{
	location.href = 'http://beta.zooomr.com/login/openid/';
}
else if(location.pathname === '/login/openid/')
{
	var idField = $x("//input[@type='text'][@name='openid_identifier']")[0];
	var loginForm = $x("//form[@action='http://api.zooomr.com/auth/openid/verify/']")[0];

	idField.value = GM_getValue('lastOpenID', idField.value);

	loginForm.addEventListener('submit', function(ev){//BEGIN pseudo-continuation

	GM_setValue('lastOpenID', idField.value);

	}, true);//END pseudo-continuation
}