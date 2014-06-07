// ==UserScript==
// @name           Estiah - New charms
// @namespace      SwataScripts
// @description    Shows 'N' for charms that were recently made available and 'O' for too old charms
// @include        http://www.estiah.com/character/deck*
// @author         swata
// @version        0.2.1
// ==/UserScript==

const deltaAttNew = 10;
const deltaLevNew = 2;
const quotAttOld = 0.5;
const quotLevOld = 0.5;

var newCharm, oldCharm;

var temp = document.getElementsByClassName('right c2 PT_update_level');
var myLev = 1;
for (var ml = 0; ml < temp.length; ml++)
	myLev = parseInt(temp[ml].innerHTML);
temp = document.getElementsByClassName('right pow PT_update_pow');
var myPow = 1;
for (var mp = 0; mp < temp.length; mp++)
	myPow = parseInt(temp[mp].innerHTML);
temp = document.getElementsByClassName('right int PT_update_int');
var myInt = 1;
for (var mi = 0; mi < temp.length; mi++)
	myInt = parseInt(temp[mi].innerHTML);
temp = document.getElementsByClassName('right dex PT_update_dex');
var myDex = 1;
for (var md = 0; md < temp.length; md++)
	myDex = parseInt(temp[md].innerHTML);
temp = document.getElementsByClassName('right con PT_update_con');
var myCon = 1;
for (var mc = 0; mc < temp.length; mc++)
	myCon = parseInt(temp[mc].innerHTML);
/*
GM_log('MyLev ' + myLev);
GM_log('MyPow ' + myPow);
GM_log('MyInt ' + myInt);
GM_log('MyDex ' + myDex);
GM_log('MyCon ' + myCon);
*/

var cardFWs = document.getElementsByClassName('common_file floating opacity bd1');	// floating windows
for (var i = 0; i < cardFWs.length; i++) {
	var cardFW = cardFWs[i];
	// 								id="SystemInfoCardXXX"
	var card = document.getElementById('CollectionCard' + cardFW.id.substring(14))
	//GM_log(cardFW.id + ' ' + cardFW.id.substring(14));
	if (card != null)
		{
		//GM_log('card ' + card.id + ' found.');
		newCharm = false;
		oldCharm = true;
		var level = cardFW.getElementsByClassName('lhp');
		for (var l = 0; l < level.length; l++)
			{
			TestLevel(level[l]);
			}
		var prereq = cardFW.getElementsByClassName('data lhp');
		for (var p = 0; p < prereq.length; p++)
			{
			TestAttrib(prereq[p],'Pow',myPow);
			TestAttrib(prereq[p],'Int',myInt);
			TestAttrib(prereq[p],'Dex',myDex);
			TestAttrib(prereq[p],'Con',myCon);
			}
		if (newCharm || oldCharm)
			{
			var newElement = document.createElement('div');
			var text;
			if (newCharm)
				text = 'N';
			else
				text = 'O';
			newElement.appendChild(document.createTextNode(text));
			newElement.style.color = 'white';
			newElement.style.marginTop = '6px';
			newElement.style.marginLeft = '-12px';
			newElement.style.fontSize = '7pt';
			newElement.style.style = 'bold';
			
			var runes = card.getElementsByClassName('runes');
			if (runes.length == 1)
				{
				//GM_log('altering charm ' + cardFW.id.substring(14));
				runes[0].parentNode.insertBefore(newElement, runes[0]);
				}
			}
		}
  	}

//Functions
function TestAttrib(findIn,attrib,myValue)
{
var end = findIn.innerHTML.indexOf('</strong> ' + attrib);
if (end > -1)
	{
	var findStart = end - 12;
	if (findStart < 0)
		findStart = 0;
	var start = findIn.innerHTML.indexOf('<strong>', findStart);
	if (start > -1)
		{
		var value = parseInt(findIn.innerHTML.substring(start + 8, end));
		//GM_log(attrib + ' ' + value);
		Test(value, myValue, deltaAttNew, quotAttOld);
		}
	}
}

function TestLevel(findIn)
{
if (findIn.innerHTML.indexOf('Requires Level ')>=0)
	{
	var value = parseInt(findIn.innerHTML.substring(15));
	//GM_log('level ' + value);
	Test(value, myLev, deltaLevNew, quotLevOld);
	}
}

function Test(value, myValue, deltaNew, quotOld)
{
if (value/myValue > quotOld)
	oldCharm = false;
if (myValue - value < deltaNew)
	{
	newCharm = true;
	oldCharm = false;
	}
}
