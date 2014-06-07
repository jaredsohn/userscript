// ==UserScript==
// @name           IIchan.ru tripfags block
// @namespace      http://iichan.ru/*
// @include        http://iichan.ru/*
// ==/UserScript==

//To configure press ctrl+alt+HOME and enter tripfag codes (e.g. "!edgdyUxa/o; !LhJkDxohyo");
//Compatible with Wakaba Extension, but only after click on page ^_^"

var DEFAULT_TRIPFAGS = "!edgdyUxa/o;";
var TRIPFAGS_KEY = "tripfagCodes";

function findParentNode(parentTagName, childObj) 
{
	var parentObj = childObj.parentNode;

	if (parentObj == null)
		return null;
	if (parentObj.tagName == parentTagName)
		return parentObj;
	
	return findParentNode(parentTagName, parentObj);
}

function xpathEval(query)
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function hideTripfag()
{

	var xpathResult = xpathEval("//span[@class='postertrip']");
	var data = loadData();

	for (var iter = 0; iter < xpathResult.snapshotLength; iter++)
	{
		var span = xpathResult.snapshotItem(iter);
		if (contains(data, span.textContent))
		{	
			var table = findParentNode("TABLE", span);
			if (table != null)
				table.style.display = "none";
		}
	}
}

function loadData()
{	
	var data = GM_getValue(TRIPFAGS_KEY, DEFAULT_TRIPFAGS);	
	return data.split(";");	
}

function persistData(data)
{	
	data = data.trim();
	GM_setValue(TRIPFAGS_KEY, data);
}

function editSettingsDialog(event)
{
	if (event.altKey && event.ctrlKey && event.keyCode == 36) // ctrl+alt+HOME
	{
		var data = GM_getValue(TRIPFAGS_KEY, DEFAULT_TRIPFAGS);
		data = prompt("Enter tripfags codes (separator: ';')", data);
		if (data != null)
			persistData(data);
	}
}

function contains(a, obj) 
{
	var i = a.length;
	while (i--) 
	{
		if (a[i].trim() === obj.trim()) 
		{
			return true;
		}
 	}
	return false;
}

window.addEventListener('load', hideTripfag, false);
//TODO: криво. для совместимости с wakaba ext.
window.addEventListener('click', hideTripfag, false);

window.addEventListener('keypress', editSettingsDialog, false);

