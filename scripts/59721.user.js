// ==UserScript==
// @name           IMS
// @namespace      C3
// @description    The Imperial Messaging Service provide by C3.
// @include        http://www.cybernations.net/*
// ==/UserScript==

if (document.location.href.match("www.cybernations.net/search.asp?")) 
{
    GM_log("search page detected");
    searchPage();
}
if (document.location.href.match("www.cybernations.net/send_message?")) {
	GM_log("message page detected");
	messagePage();
}

function searchPage() 
{
	var table2 = document.getElementById("table2");
	
	var grabNamesButton = document.createElement("input");
	grabNamesButton.setAttribute("class", "Buttons");
	grabNamesButton.setAttribute("type", "button");
	grabNamesButton.setAttribute("id", "grabNamesButton");
	grabNamesButton.value = "Grab Names";
	var insertGrabNameButton = table2.parentNode.insertBefore			(grabNamesButton, table2);
	grabNamesButton.addEventListener("click", grabRulers, true);
	
	var clearNamesButton = document.createElement("input");
	clearNamesButton.setAttribute("class", "Buttons");
	clearNamesButton.setAttribute("type", "button");
	clearNamesButton.setAttribute("id", "clearNamesButton");
	clearNamesButton.value = "Clear Names";
	var insertClearNameButton = table2.parentNode.insertBefore			(clearNamesButton, table2);
	clearNamesButton.addEventListener("click", clearStoredNames, 		true);
	GM_log(GM_getValue("storedNames", ""));
}

function messagePage()
{
	var messageForm = document.forms.namedItem("FrontPage_Form1");
	var messageing = messageForm.elements.namedItem					("messaging_message");
	var tr = messageing.parentNode.parentNode.parentNode.firstChild.nextSibling;
	

	
	var sendMessage = document.getElementById("submit2");
	var trSetOne = document.createElement("tr");
	trSetOne.setAttribute("id", "trSetOne");
	tr.appendChild(trSetOne);
	trSetOne.appendChild(document.createElement('br'));
	var trSetTwo = document.createElement("tr");
	trSetTwo.setAttribute("id", "trSetTwo");
	tr.appendChild(trSetTwo);
	var trSetThree = document.createElement("tr");
	trSetThree.setAttribute("id", "trSetThree");
	tr.appendChild(trSetThree);
	var trSetFour = document.createElement("tr");
	trSetFour.setAttribute("id", "trSetFour");
	tr.appendChild(trSetFour);
	var trSetFive = document.createElement("tr");
	trSetFive.setAttribute("id", "trSetFive");
	tr.appendChild(trSetFive);
	var trSetSix = document.createElement("tr");
	trSetSix.setAttribute("id", "trSetSix");
	tr.appendChild(trSetSix);
	var trSetSeven = document.createElement("tr");
	trSetSeven.setAttribute("id", "trSetSeven");
	tr.appendChild(trSetSeven);
	var trSetEight = document.createElement("tr");
	trSetEight.setAttribute("id", "trSetEight");
	tr.appendChild(trSetEight);

	
	var setOneButton = document.createElement("input");
	setOneButton.setAttribute("class", "Buttons");
	setOneButton.setAttribute("type", "button");
	setOneButton.setAttribute("id", "setOneButton");
	setOneButton.setAttribute("style", "width:120px");
	setOneButton.addEventListener("click", setOne, false);
	setOneButton.value = " Paste Set One ";
	trSetOne.appendChild(setOneButton);

	var setTwoButton = document.createElement("input");
	setTwoButton.setAttribute("class", "Buttons");
	setTwoButton.setAttribute("type", "button");
	setTwoButton.setAttribute("id", "setTwoButton");
	setTwoButton.setAttribute("style", "width:120px");
	setTwoButton.addEventListener("click", setTwo, false);
	setTwoButton.value = " Paste Set Two ";
	trSetTwo.appendChild(setTwoButton);

	var setThreeButton = document.createElement("input");
	setThreeButton.setAttribute("class", "Buttons");
	setThreeButton.setAttribute("type", "button");
	setThreeButton.setAttribute("id", "setThreeButton");
	setThreeButton.setAttribute("style", "width:120px");
	setThreeButton.addEventListener("click", setThree, false);
	setThreeButton.value = "Paste Set Three";
	trSetThree.appendChild(setThreeButton);

	var setFourButton = document.createElement("input");
	setFourButton.setAttribute("class", "Buttons");
	setFourButton.setAttribute("type", "button");
	setFourButton.setAttribute("id", "setFourButton");
	setFourButton.setAttribute("style", "width:120px");
	setFourButton.addEventListener("click", setFour, false);
	setFourButton.value = " Paste Set Four ";
	trSetFour.appendChild(setFourButton);

	var setFiveButton = document.createElement("input");
	setFiveButton.setAttribute("class", "Buttons");
	setFiveButton.setAttribute("type", "button");
	setFiveButton.setAttribute("id", "setFiveButton");
	setFiveButton.setAttribute("style", "width:120px");
	setFiveButton.addEventListener("click", setFive, false);
	setFiveButton.value = " Paste Set Five ";
	trSetFive.appendChild(setFiveButton);

	var setSixButton = document.createElement("input");
	setSixButton.setAttribute("class", "Buttons");
	setSixButton.setAttribute("type", "button");
	setSixButton.setAttribute("id", "setSixButton");
	setSixButton.setAttribute("style", "width:120px");
	setSixButton.addEventListener("click", setSix, false);
	setSixButton.value = " Paste Set Six ";
	trSetSix.appendChild(setSixButton);

	var setSevenButton = document.createElement("input");
	setSevenButton.setAttribute("class", "Buttons");
	setSevenButton.setAttribute("type", "button");
	setSevenButton.setAttribute("id", "setSevenButton");
	setSevenButton.setAttribute("style", "width:120px");
	setSevenButton.addEventListener("click", setSeven, false);
	setSevenButton.value = " Paste Set Seven ";
	trSetSeven.appendChild(setSevenButton);

	var setEightButton = document.createElement("input");
	setEightButton.setAttribute("class", "Buttons");
	setEightButton.setAttribute("type", "button");
	setEightButton.setAttribute("id", "setEightButton");
	setEightButton.setAttribute("style", "width:120px");
	setEightButton.addEventListener("click", setEight, false);
	setEightButton.value = " Paste Set Eight ";
	trSetEight.appendChild(setEightButton);
}

function setOne()
{
	pasteNames(1);
}

function setTwo()
{
	pasteNames(2);
}

function setThree()
{
	pasteNames(3);
}

function setFour()
{
	pasteNames(4);
}

function setFive()
{
	pasteNames(5);
}

function setSix()
{
	pasteNames(6);
}

function setSeven()
{
	pasteNames(7);
}

function setEight()
{
	pasteNames(8);
}

function clearStoredNames()
{
	GM_setValue("storedNames", "");
	alert("Names Cleared");
}

function pasteNames(setNumber)
{
	var storedNames = GM_getValue("storedNames", "");
	var pasteToCarbon = "";
	var namesArray = storedNames.split(",");
	var messageForm = document.forms.namedItem("FrontPage_Form1");
	var messageTo = messageForm.elements.namedItem("messaging_toid");
	var carbonCopy = document.getElementById("carboncopy");
	var lowerBound = (setNumber - 1) * 25;
	var upperBound = setNumber * 25;

	if (namesArray[lowerBound] != undefined)
	{
		if (storedNames == "")
		{
			alert("Set 1 is empty!");
		}
		else
		{
		messageTo.value = namesArray[lowerBound];
		for ( x in namesArray )
		{
			if ( x > lowerBound && x < upperBound )
			{
				pasteToCarbon += namesArray[x] + "\n";
			}
		}
		pasteToCarbon = pasteToCarbon.replace(/\s*$/, "");
		carbonCopy.value = pasteToCarbon;
		}
	}
	else
	{
		alert("Set " + setNumber + " is empty!");
	}
}

function grabRulers()
{

	var storedNames = GM_getValue("storedNames", "");
	var addList="";
	var storedNamesArray = storedNames.split(",");
	var slotsLeft = 201 - storedNamesArray.length
	if (slotsLeft <= 0)
	{
		alert("Name slots full!");
	}
	else
	{
	var rulerNames, rulersOnPage="";
	rulerNodes = document.evaluate(
		"//a[contains(@href, 'send_message.asp?Nation_ID=')]",         		document,     null, 7, null);
	for (var i = 0; i < rulerNodes.snapshotLength; i++)
	{
	thisRuler = rulerNodes.snapshotItem(i);
		rulersOnPage += thisRuler.firstChild.nodeValue.replace
		(/^\s*/, "").replace(/\s*$/, "");
		rulersOnPage += ",";
	}
	GM_log("List Created: " + rulersOnPage);
	var rulerArray = rulersOnPage.split(","); 
	for(x in rulerArray) {
		if ( slotsLeft > 0 )
		{
			if ( storedNames.match(rulerArray[x]) == null)
			{
				addList += rulerArray[x] + ",";
				slotsLeft -= 1
			}
		}
	}
	GM_log("New Names: " + addList);
	var addListArray = addList.split(",");
	if (addList != undefined)
	{
		storedNames += addList;
	}
	GM_setValue("storedNames", storedNames);
	alert(addListArray.length-1 + " Names Stored! " + slotsLeft + 
		" slots left.");
	}
}