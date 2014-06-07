// ==UserScript==
// @name           تسجيل الدخول الآلي
// @namespace      SANJoOob
// @include        *.travian*.*
// ==/UserScript==

function loginCheck()
{
if (document.getElementsByName('login'))
{
var ex = ".//input[@value='login']";
tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

var ex = ".//input[@type='password' and contains(@value, '*')]";
tag2 = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    if(tag.snapshotLength && tag2.snapshotLength)
    {
    loginButton = tag.snapshotItem(0);
    loginButton.click();
    }
}
}
loginCheck();