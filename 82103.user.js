// ==UserScript==
// @name           Xooit - Suprimer pub
// @namespace      http://blog.djlechuck.fr
// @description    Supprime le cadre de pub en haut du forum Xooit LPCM
// @include        http://lpcm-cergy.xooit.fr*
// @exclude        http://lpcm-cergy.xooit.fr/admin*
// ==/UserScript==

function removeElement(ElementXpath)
{
var alltags = document.evaluate(ElementXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < alltags.snapshotLength; i++)
	{
		element = alltags.snapshotItem(i);
		element.parentNode.removeChild(element);  // Remove this element from its parent.
	}
}

removeElement('/html/body/div[@style="margin: 0; padding: 0; visibilite: visible; display: block; height: 109px; width: 100%; background: url(/images/topbg.gif)"]');