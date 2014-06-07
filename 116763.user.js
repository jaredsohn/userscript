// ==UserScript==
// @name           Seafight - Add Higher Basar Values
// @namespace      None
// @description    Script for adding higher values on the basar
// @include http://*.seafight.bigpoint.com/indexInternal.es?action=internalBasar*
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

// Add new values for cannonballs
ExpandValues("100.000","1000","howMuch");
ExpandValues("250.000","2500","howMuch");
ExpandValues("500.000","5000","howMuch");

// Add new values for cannons
ExpandValues("50","50","howMuchCannon");
ExpandValues("100","100","howMuchCannon");

// Add new values for harpoons
ExpandValues("1.000","1000","howMuchHarpoon");
ExpandValues("5.000","5000","howMuchHarpoon");
ExpandValues("10.000","10000","howMuchHarpoon");

// Add new values for swords
ExpandValues("500","500","howMuchSword");
ExpandValues("1.000","1000","howMuchSword");

// Add new values for shields
ExpandValues("500","500","howMuchShields");
ExpandValues("1.000","1000","howMuchShields");

// Add new values for pistols
ExpandValues("500","500","howMuchPistol");
ExpandValues("1.000","1000","howMuchPistol");

// Add new values for snowmen
ExpandValues("100","100","howMuchSnowmen");
ExpandValues("500","500","howMuchSnowmen");
ExpandValues("1.000","1000","howMuchSnowmen");

// Add new values for candles
ExpandValues("100","100","howMuchCandles");
ExpandValues("500","500","howMuchCandles");
ExpandValues("1.000","1000","howMuchCandles");

// Add new values for powder
ExpandValues("5.000","5000","howMuchPowder");
ExpandValues("10.000","10000","howMuchPowder");
ExpandValues("25.000","25000","howMuchPowder");

// Add new values for plates
ExpandValues("5.000","5000","howMuchPlate");
ExpandValues("10.000","10000","howMuchPlate");
ExpandValues("25.000","25000","howMuchPlate");


