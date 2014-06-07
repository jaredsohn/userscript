// ==UserScript==
// @name           Seafight - Add Higher Cannonball Values
// @namespace      None
// @description    Script for adding higher values of cannonballs
// @include http://*.seafight.bigpoint.com/indexInternal.es?action=internalWeapon&tpl=internalWeaponAmmunition*
// ==/UserScript==

function ExpandValues(NewText,NewValue,BoxName)
{
	var BuyBoxes = document.getElementsByName(BoxName);
	for (i=0;i<=BuyBoxes.length-1;i++)
	{
		var CreateValue = document.createElement("OPTION");
		CreateValue.text = NewText;
		CreateValue.value = NewValue;
		BuyBoxes.item(i).options.add(CreateValue);
	}
}

// Add new values for regular cannonballs
ExpandValues("100.000","100000","howmuch");
ExpandValues("250.000","250000","howmuch");
ExpandValues("500.000","500000","howmuch");

// Add new values for elite cannonballs
ExpandValues("100.000","1000","howMuch");
ExpandValues("250.000","2500","howMuch");
ExpandValues("500.000","5000","howMuch");


