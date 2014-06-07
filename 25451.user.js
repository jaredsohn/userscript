// ==UserScript==
// @author         mungushume
// @version        1.0.1
// @name           Nationwide.co.uk olb annoyances removal
// @namespace      http://www.monkeyr.com
// @description    Nationwide.co.uk Online Banking (olb) quick sign off, skip sign in messages (after a slight delay)
// @include        https://olb2.nationet.com/FrameContent/header_signedOn.asp*
// @include        https://olb2.nationet.com/SignOn/LastSignOnConfirmationPage.asp*
// @scriptsource   http://userscripts.org/scripts/show/25451
// ==/UserScript==
/*

v1.0.1 - 22 Apr 2008
 - Bug fix: One of the includes was incorrect so the quick sign off failed to work. Oooops!

*/


var searchEle = document.evaluate ("//a[contains(@href,'/signon/ActivitySummarysignoff.asp')]", document, null,
									XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(searchEle)
{
	searchEle.setAttribute("target", "_Top");
	searchEle.href = searchEle.href.replace("signon/ActivitySummarysignoff.asp","signoff/signoff.aspx");
}

var searchEle = document.evaluate ("//form[@name='frmFinish']", document, null,
									XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(searchEle)
{
	setTimeout("addContinueBehaviour(); updateHeader('myaccounts',''); document.forms['frmFinish'].submit();", 3000);
}