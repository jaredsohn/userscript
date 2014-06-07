// ==UserScript==
// @description Change "like" links to "swag" links.
// @grant       none
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://apps.facebook.com/*
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @name        Swag this!
// @namespace   http://userscripts.org/users/nescafe
// @version     25
// ==/UserScript==

function gDebug()
{
	console.log(g_iInsert + ' inserted, ' + g_iMutate + ' mutated, ' + g_iProcess + ' processed, ' + g_iSearch + ' searched, ' + g_iReplace + ' replaced in ' + g_iDuration + ' ms = ' + (Math.round(g_iDuration * 1000000 / g_iProcess) / 1000) + ' µs per processed');
}

function gObserve()
{
	g_oMutate.observe(g_oBody,
	{
		attributes: true,
		characterData: true,
		subtree: true,
	});
}

function gProcess(a_oNode)
{
	++g_iProcess;
	if (a_oNode instanceof HTMLElement)
	{
		var
		l_oList = a_oNode.childNodes,
		l_iCount = l_oList.length,
		l_iIndex = 0;
		a_oNode.title = gReplace(a_oNode.title);
		if (0 === l_iCount)
		{
			a_oNode.innerHTML = gReplace(a_oNode.innerHTML);
		}
		else
		{
			while (l_iIndex !== l_iCount)
			{
				gProcess(l_oList[l_iIndex++]);
			}
		}
	}
	else
	{
		a_oNode.data = gReplace(a_oNode.data);
	}
}

function gReplace(a_sText)
{
	++g_iSearch;
	if ('' !== a_sText)
	{
		var l_h_sMap =
		{
			'Unlike this' : 'Unswag this',
			'Unlike' : 'Unswag',
			'Likes this' : 'Swags this',
			'Like this' : 'Swag this',
			'Likes' : 'Swags',
			'Like' : 'Swag',
			'likes this' : 'swags this',
			'like this' : 'swag this',
			'likes' : 'swags',
			'like' : 'swag',
		};
		for (l_sSearch in l_h_sMap)
		{
			var l_iPosition = a_sText.search(l_sSearch);
			if (-1 !== l_iPosition)
			{
				++g_iReplace;
				return a_sText.substr(0, l_iPosition) + l_h_sMap[l_sSearch] + a_sText.substr(l_iPosition + l_sSearch.length);
			}
		}
	}
	return a_sText;
}

var
g_oBody = document.body,
g_iDuration = 0,
g_iInsert = 0,
g_oInsert = new MutationObserver(function (a_oList)
{
	var l_oTime = new Date();
	++g_iInsert;
	a_oList.forEach(function (a_oMutation)
	{
		var
		l_oList = a_oMutation.addedNodes,
		l_iCount = l_oList.length,
		l_iIndex = 0;
		while (l_iIndex !== l_iCount)
		{
			gProcess(l_oList[l_iIndex++]);
		}
	});
	g_iDuration += new Date() - l_oTime;
	gDebug();
}),
g_iMutate = 0,
g_oMutate = new MutationObserver(function (a_oList)
{
	var l_oTime = new Date();
	++g_iMutate;
	g_oMutate.disconnect();
	a_oList.forEach(function (a_oMutation)
	{
		++g_iProcess;
		var l_oNode = a_oMutation.target;
		if (l_oNode instanceof HTMLElement)
		{
			l_oNode.title = gReplace(l_oNode.title);
			if (0 === l_oNode.childNodes.length)
			{
				l_oNode.innerHTML = gReplace(l_oNode.innerHTML);
			}
		}
		else
		{
			l_oNode.data = gReplace(l_oNode.data);
		}
	});
	gObserve();
	g_iDuration += new Date() - l_oTime;
	gDebug();
}),
g_iProcess = 0,
g_iReplace = 0,
g_iSearch = 0;

gProcess(g_oBody);

g_oInsert.observe(g_oBody,
{
	childList: true,
	subtree: true,
});

gObserve();
