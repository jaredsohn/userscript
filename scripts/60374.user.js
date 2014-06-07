// ==UserScript==
// @name		FlagGroupItems
// @namespace		fenghou
// @description		Flag and unflag group items in the GS and TV. Click once to flag, click twice to unflag.
// @include		http*://*.world-of-dungeons.*/wod/spiel/hero/items.php*
// ==/UserScript==
var bIsFlaged = false;

// This script is only available at GS and TV page, and you must have access to flag group items.
var bIsRightPage = false;
var allInputs = document.getElementsByTagName('input');
for (var i = 0; i < allInputs.length; ++i)
	{
	var thisInput = allInputs[i];
	if (thisInput.name.indexOf('posted_SetGrpItem[') == 0)
		{
		bIsRightPage = true;
		break;
		}
	}
if (bIsRightPage == false)
	return;

for (var j = 0; j < allInputs.length; ++j)
	{
	var thisButton = allInputs[j];
	if (thisButton.getAttribute('name') == 'checknone')
		{
		var newButton = document.createElement('input');
		newButton.setAttribute('class', 'button');
		newButton.setAttribute('type', 'button');
		newButton.setAttribute('value', 'Flag Group Items');
		newButton.setAttribute('id', 'FlagGroupItems' + j);
		newButton.setAttribute('name', 'FlagGroupItems' + j);
		newButton.addEventListener('click', FlagGroupItems, true);
		// [Select None] (newBlank) [NewButton] (nextBlank) [NextButton]
		var newBlank = document.createTextNode("            ");
		var nextBlank = thisButton.nextSibling;
		thisButton.parentNode.insertBefore(newBlank, nextBlank);
		thisButton.parentNode.insertBefore(newButton, nextBlank);
		}
	}


function FlagGroupItems(ev)
	{
	// Check or Uncheck
	var FlagCheck = !bIsFlaged;

	for (var i = 0; i < allInputs.length; ++i)
		{
		thisInput = allInputs[i];
		if (thisInput.type == 'checkbox' && thisInput.name.indexOf('SetGrpItem[') == 0)
			{
			thisInput.checked = FlagCheck;
			}
		}

	bIsFlaged = !bIsFlaged;
	}
