// ==UserScript==
// @description Enable autocomplete on password form input that disable it.
// @grant       none
// @name        Autocomplete
// @namespace   http://userscripts.org/users/nescafe
// @version     2
// ==/UserScript==

function gProcessNode(a_oNode)
{
	var l_a_oElementList = a_oNode.getElementsByTagName('a');
	for (var l_iIndex = 0; l_a_oElementList.length !== l_iIndex; ++l_iIndex)
	{
		if ('auth_box(\'login\'); return false;' === l_a_oElementList[l_iIndex].getAttribute('onclick'))
		{
			l_a_oElementList[l_iIndex].removeAttribute('onclick');
		}
	}

	gProcessTag(a_oNode, 'form');
	gProcessTag(a_oNode, 'input');
}

function gProcessTag(a_oNode, a_sTag)
{
	var l_a_oElementList = g_oBody.getElementsByTagName(a_sTag);
	for (var l_iIndex = 0; l_a_oElementList.length !== l_iIndex; ++l_iIndex)
	{
		l_a_oElementList[l_iIndex].setAttribute('autocomplete', 'on');
	}
}

var
g_oBody = document.body,
g_oObserver = new MutationObserver(function (a_oList)
{
	a_oList.forEach(function (a_oMutation)
	{
		var
		l_oList = a_oMutation.addedNodes,
		l_iCount = l_oList.length,
		l_iIndex = 0;
		while (l_iIndex !== l_iCount)
		{
			gProcessNode(l_oList[l_iIndex++]);
		}
	});
}),
g_oWindow = unsafeWindow;

if (undefined === g_oWindow.setTimeout)
{
	g_oWindow = window;
}

gProcessNode(g_oBody);

g_oObserver.observe(g_oBody,
{
	childList: true,
	subtree: true,
});
