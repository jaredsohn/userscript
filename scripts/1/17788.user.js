// ==UserScript==
//
// @name          deviantART - Friends List improvements
// @author        Philippe Lhoste aka. PhiLho
// @namespace     http://Phi.Lho.free.fr/
// @description   Eases the Manage Friends / Deviants / Friends List page on deviantART
// @version       1.05.000
// @include       http://my.deviantart.com/deviants/
//
// ==/UserScript==
/*
Following suggestions of the Suggestion Forum...

Try to improve the Manage Friends page of dA, by putting the list of friends
in a combo box, so upon selection of a friend, its name goes to the Username field.

Also added a counter of the watched deviants, replacing the "Friends List" title by "99 Friends"
(number varies...).

Also allow to sort a column with checkboxes when clicking on the title of a column - no sort by Username!
To undo these actions, just reload the page...

TODO: Collapse (and restore) groups. (un)check by group.

// by Philippe Lhoste <PhiLho(a)GMX.net> http://Phi.Lho.free.fr & http://PhiLho.deviantART.com
// File/Project history:
 1.05.000 -- 2008/04/18 (PL) -- As suggested, moves up the Update button
 1.04.000 -- 2008/01/19 (PL) -- OK, so (un)check all is outdated, remove it!
 1.03.000 -- 2008/01/16 (PL) -- Changes to cope with the new look of the list.
 1.02.000 -- 2007/12/11 (PL) -- Actions on columns: sort, check all, uncheck all.
 1.01.000 -- 2007/11/05 (PL) -- Added counter.
 1.00.000 -- 2007/07/04 (PL) -- Creation.
*/
/* Copyright notice: For details, see the following file:
http://Phi.Lho.free.fr/softwares/PhiLhoSoft/PhiLhoSoftLicence.txt
This program is distributed under the zlib/libpng license.
Copyright (c) 2007-2008 Philippe Lhoste / PhiLhoSoft
*/
(function(){

const XPATH_FRIENDLINK = "//a[@class='u']";
const XPATH_USERNAME = "//input[@id='username']";
const XPATH_TITLE = "//div[@class='catbar']/h1";
const XPATH_TABLEHEADER = "//table[@id='deviantlist']/thead/tr/th";
const XPATH_TABLECOLUMNS = "//table[@id='deviantlist']/tbody/tr";
const XPATH_CHECKBOXES = "//table[@id='deviantlist']/tbody/tr[@class='odd' or @class='even']/td[";
const XPATH_UPDATE = "//form/div[@class='altaltview pp']/div[@class='c']";

var username = GetXpathElement(XPATH_USERNAME);
var title = GetXpathElement(XPATH_TITLE);
var updateArea = GetXpathElement(XPATH_UPDATE);

var comboBox = document.createElement("select");
comboBox.setAttribute("name", "PL-FriendList");
comboBox.addEventListener('change', SetUsername, false);

// Put all the deviant names in a combo box (and count them)
var friendCount = 0;
var xpathResult = GetXpathResult(XPATH_FRIENDLINK);
var node = xpathResult.iterateNext();
while (node)
{
	var friend = node.textContent;
	friendCount++;
	AddCBItem(comboBox, friend, friend);
	node = xpathResult.iterateNext();
}
username.parentNode.appendChild(document.createElement("br"));
username.parentNode.appendChild(comboBox);

// Make the headers clickable to sort the columns or set/reset the check boxes
var idx = 1;
xpathResult = GetXpathResult(XPATH_TABLEHEADER);
node = xpathResult.iterateNext();
while (node)
{
	node.wrappedJSObject.hid = idx++;
	node.addEventListener('click', ChangeColumn, false);
	node = xpathResult.iterateNext();
}

// Cosmetic changes

if (title != null)
{
	// Provide more info in the page title
	title.innerHTML = friendCount + " Friend" + (friendCount == 1 ? "" : "s");
}

if (updateArea != null)
{
	// Move up the update area (button)
	var parent = updateArea.parentNode;
	parent.insertBefore(updateArea, parent.firstChild);
	updateArea.setAttribute(style, "margin: 4px 0 8px 0;");
}

function SetUsername(evt)	// For event callback
{
	username.value = evt.target.value;
}

function ChangeColumn(evt)	// For event callback
{
	var header = evt.target.wrappedJSObject;

	var top = GetXpathElement(XPATH_TABLECOLUMNS);
	// I don't sort the Username column...
	var xpathResult = GetXpathElements(XPATH_CHECKBOXES + header.hid + "]/input");
	for (var i = xpathResult.snapshotLength - 1; i >= 0; i--)
	{
		var chb = xpathResult.snapshotItem(i);
		if (!chb.checked)
		{
			top.parentNode.insertBefore(chb.parentNode.parentNode, top.nextSibling);
		}
	}
}


function AddCBItem(cb, name, value)
{
	var option = document.createElement("option");
	option.setAttribute("value", value);
	option.text = name;
	cb.appendChild(option);
}

function GetXpathResult(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

function GetXpathElement(xpath)
{
	var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	if (xpathResult != null)
		return xpathResult.iterateNext();
	return null;
}

function GetXpathElements(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function GetXpathSubElement(xpath, parent)
{
	return document.evaluate(xpath, parent, null, XPathResult.ANY_TYPE, null);
}

})();
