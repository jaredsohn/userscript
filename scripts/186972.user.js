// ==UserScript==
// @description Calculate total transaction amount on your Steam account.
// @grant       none
// @include     https://store.steampowered.com/account/
// @name        Steam account value
// @namespace   http://userscripts.org/users/nescafe
// @version     2
// ==/UserScript==

var
g_oChild,
g_iIndex = 0,
g_sKey,
g_oMap = new Array(),
g_oRegex = /(.??)([0-9]+)[,.]([0-9-]+)(.?)/,
g_oList = document.getElementsByClassName('transactionRowPrice'),
g_iCount = g_oList.length,
g_oNode = document.getElementById('main_content').getElementsByClassName('rightcol')[0].getElementsByClassName('block accountInfoBlock')[0].getElementsByClassName('block_content block_content_inner')[0],
g_oAnchor = g_oNode.getElementsByClassName('inner_rule')[0];

while (g_iIndex !== g_iCount)
{
	var g_oLine = g_oList[g_iIndex++].innerHTML.match(g_oRegex);
	if (null !== g_oLine)
	{
		var
		g_sCurrency = g_oLine[1] + g_oLine[4],
		g_fValue = parseFloat(g_oLine[2]);
		if ('--' !== g_oLine[3])
		{
			g_fValue += parseFloat('0.' + g_oLine[3]);
		}
		if (g_sCurrency in g_oMap)
		{
			g_oMap[g_sCurrency] += g_fValue;
		}
		else
		{
			g_oMap[g_sCurrency] = g_fValue;
		}
	}
}

g_oList = new Array();
for (g_sKey in g_oMap)
{
	if (g_oMap.hasOwnProperty(g_sKey))
	{
		g_oList.push(g_sKey);
	}
}
g_oList.sort();
g_iCount = g_oList.length;

if (0 < g_iCount)
{
	g_oChild = document.createElement('div');
	g_oChild.className = 'inner_rule';
	g_oNode.insertBefore(g_oChild, g_oAnchor);

	for (g_iIndex = 0; g_iCount !== g_iIndex; ++g_iIndex)
	{
		g_sKey = g_oList[g_iIndex];
		g_oChild = document.createElement('div');
		g_oChild.className = 'accountRow accountBalance';
		g_oChild.innerHTML = '<div class="accountData price">' + g_oMap[g_sKey].toFixed(2) + ' ' + g_sKey + '</div>';
		if (0 === g_iIndex)
		{
			g_oChild.innerHTML += '<div class="accountLabel">Total Value:</div>';
		}
		g_oNode.insertBefore(g_oChild, g_oAnchor);
	}
}
