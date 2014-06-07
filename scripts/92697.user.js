// ==UserScript==
// @name           bvs_darts
// @namespace      SirDuck36
// @description    throw darts
// @include        http://*animecubed.com/billy/bvs/partyhouse*
// ==/UserScript==





function KeyCheckDarts(event)
{
    var KeyID = event.keyCode;

    if (KeyID == 192 && document.body.innerHTML.indexOf("Play darts against your fellow villagers!") >= 0)
    {
	document.evaluate("//input[@name='megadart' and @type='checkbox']", document, null, 
			  XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.checked = true;
	unsafeWindow.document.dgame.submit();
    }
}


document.documentElement.addEventListener("keyup", KeyCheckDarts, true);