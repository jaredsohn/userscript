// ==UserScript==
// @name           BvS Quicksell Treasure
// @namespace      Fax Celestis
// @description    Hot keys that sells all your (T)reasure in Billy vs. SNAKEMAN. Press I for Help, since I don't want to conflict with Ren Po Ken's "H for help".
// @include        http://*animecubed.com/billy/bvs/shop*
// @history        1.0 A modification from Ren Po Ken's BvS Quicksell that sells all treasure items by pushing T.
// ==/UserScript==

var itemCodes = new Array(309, 310, 311, 312, 299, 301, 292, 302, 295, 296, 297, 318, 319, 320, 504, 298, 279);
var itemName = new Array("Copper Ring", "Gold Ring", "Platinum Ring", "Cobalt Ring", "Small Pearl", "Small Ruby", "Small Emerald", "Small Diamond", "Copper Coin", "Silver Coin", "Gold Coin", "Copper Shaft", "Silver Shaft", "Cobalt Shaft", "Threadbare Robes", "Crystal Lens", "Sham Rock");

function process_event(event) {
	if (event.keyCode == 73)
		{var helpMenu = "" + (<r><![CDATA[I: This Help Menu
T: Sells Treasure items one item at a time

Items currently sold: ]]></r>);
		for (var LCV=0; LCV<itemName.length; LCV++)
			{if (LCV == itemName.length-1)
				helpMenu+="and ";
			helpMenu+=itemName[LCV];
			if (LCV != itemName.length-1)
			helpMenu+=", ";
			}
		helpMenu+= (<r><![CDATA[
	
This Greasemonkey script was modified by Fax Celestis from a script written by Ren Po Ken
Updated: 2/12/11
]]></r>);
		alert(helpMenu);
	}
	else if (event.keyCode == 84)
		{var found=0;												//Not found yet
		var sale=document.forms.namedItem("sellitem").elements;		//Finds the Sellitem form
		for (var LCV=0; LCV<itemCodes.length; LCV++)				//Increments through the itemCodes array
			{for(var i=0; i<sale.length; i++)						//Increments through the Sellable items
				if(sale[i].value==itemCodes[LCV])					//Looks for a match
					{sale[i].wrappedJSObject.click();				//Click the radio button
					found=1;										//Lets the program know something's been found
					}
			if (found==1) break;}
		if (found==1) {
			var xpathString = "//span [contains (.,'" + itemName[LCV] + "')]/parent::td";
		
			allItems = document.evaluate(xpathString, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
			item = allItems.snapshotItem(allItems.snapshotLength-1);
		
			var beginning=item.innerHTML.indexOf('>: ')+3; 			//Appropriates the appropriate appropriation
			var ending=item.innerHTML.indexOf('(Currently', beginning);
		
			quantity=item.innerHTML.slice(beginning,ending); 		//Gets the quantity
		
			if (quantity.indexOf(',')==-1)							//Checks quantity for commas and removes them
				quantity*=1;										//To be compatable with BvS Thousand Separator
			else
				{temp=quantity.split(',');
				quantity=temp.join("")*1;}
		
			sell = document.evaluate("//input [@name='numbertosell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
			tosell = sell.snapshotItem(0);					//Puts the full amount in the text field.
			tosell.value = quantity;
		
			confirm = document.evaluate("//input [@name='sellconfirm']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			confirmp = document.evaluate("//input [@name='sellconfirmp']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			toConfirm = confirm.snapshotItem(0);
			toConfirm.setAttribute("checked", "checked"); //check the confirm checkbox
			
			toConfirmp = confirmp.snapshotItem(0);
			toConfirmp.setAttribute("checked", "checked"); //check the 'sell last perm' checkbox
		
			document.forms.namedItem("sellitem").wrappedJSObject.submit();	//sell items
		}
		else if (found==0)
			{alert("You're out of treasure!");}
	}
}

if (itemName.length != itemCodes.length) //Error Checking
	alert("You shouldn't ever see this message, but if you do, blame Ren Po Ken. >_>");
else
	window.addEventListener("keyup", process_event, false);