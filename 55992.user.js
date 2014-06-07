// ==UserScript==
// @author			Nevam
// @email			userscripts@yahoo.com
// @description		Relogs you in and if you get network timeout it'll keep trying to srnd you back to the rally point.
// @name			Auto login New
// @namespace		http://userscripts.org/
// @include			*.travian*.*
// @version			0.0.5
// ==/UserScript==

var server = location.hostname;
var rootPath = "http://" + server + "/";

function loginCheck()
{
	if (GM_getValue('wearein') == 1) {
		location.href = rootPath+"dorf1.php";
		GM_setValue('wearein', 0);
	}
	if (document.getElementsByName('login'))
	{
		var ex = ".//input[@value='login']";
		tag = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var ex = ".//input[@type='password' and contains(@value, '*')]";
		tag2 = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	if(tag.snapshotLength && tag2.snapshotLength)
    	{
    		loginButton = tag.snapshotItem(0);
    		loginButton.click();
			GM_setValue('wearein', 1);
    	}
	}
}

var ex = "id('errorTitleText')";
tag = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ex2 = "id('content')/p[2]/a[contains(@href, 'del_cookie')]";
tag2 = document.evaluate( ex2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (tag.snapshotLength > 0) {
	setTimeout("window.location.replace('" + rootPath + "dorf1.php')", 3000);
} else if (tag2.snapshotLength > 0) {
	setTimeout("window.location.replace('" + rootPath + "login.php')", 3000);
} else {
	loginCheck();
}
