// ==UserScript==
// @name           BvS Quicksell
// @namespace      Ren Po Ken
// @description    Hot keys that sells all your non-(L)ooping goods in Billy vs. SNAKEMAN.  Press (H) for Help Menu
// @include        http://*animecubed.com/billy/bvs/shop*
// @version        2.5.2
// @history        2.5.2 Correctly added Red, Blue, Green, and White Filaments
// @history        2.5.1 Added Red, Blue, Green, and White Filaments
// @history        2.5 Compatible with Google Chrome
// @history        2.0.2 Made compatible with BvS Thousand Separator 
// @history        2.0.1 Added Counterfit Permit, mostly to test 'Sell Last Perm' functionality
// @history        2.0 One hotkey (L) to sell all your items.  (H)elp Menu added.
// @history        1.0 A different hotkey needed to sell each item.  We don't talk about this version.
// ==/UserScript==

//	Special thanks to WingedCat for asking an impertinent question that had a very pertinent answer.

var itemCodes = new Array(305, 113, 107, 102, 103, 167, 96, 112, 591, 588, 109, 589, 590, 587, 586, 619, 620, 618, 24, 584, 25, 26, 111, 104, 593, 464, 583, 592, 19, 630, 110, 799, 798, 810, 800);
var itemNames = new Array("Counterfeit Permit", "Hot Picture of Emosuke", "Emo Rock CDs", "Razor Blades", "Dog Treats", "Hairpin Piece", "Note Page", "Hot Picture of Terri", "9mm Bullets", "BEEF", "Bag of Chips", "Blue Peppers", "Brockoli", "Can of Sauce", "Delicious Pepperoni", "Frost-Covered Box", "Frost-Covered Bundle", "Frost-Covered Package", "Greassy Burger", "Greassy Cheese", "Greassy Fries", "Greassy Nuggets", "Hot Picture of Robogirl", "Juicy Apple", "Kaiju Flakes", "Ninpo Mask", "Pizza Dough", "Red Onions", "ShinyShiny", "Yummy Pizza", "Poorly-Drawn Alien", "Blue Filament", "Red Filament", "White Filament", "Green Filament");
/*To Do:
	Add a next sellable item message w/ a skip Key (Dave)
	Get Add/Delete items working right.
	*/

function process_event(event) {
	if (event.keyCode == 72)
		{var helpMenu = "H: This Help Menu\
\nL or Enter: Sells Non-Loopable items one item at a time\
\
\n\nItems currently sold: ";
		for (var LCV=0; LCV<itemNames.length; LCV++)
			{helpMenu=helpMenu+"\n\t"+itemNames[LCV];
			}
		helpMenu+= "\n\nThis Grease Monkey script was written by Ren Po Ken\
\nUpdated: 27/Aug/11";
		alert(helpMenu);
	}
	else if ((event.keyCode == 76)||(event.keyCode == 13))
		{var found=0;												//Not found yet
		var sale=document.forms.namedItem("sellitem").elements;			//Finds the Sellitem form
		for (var LCV=0; LCV<itemCodes.length; LCV++)				//Increments through the itemCodes array
			{for(var i=0; i<sale.length; i++)				//Increments through the Sellable items
				if(sale[i].value==itemCodes[LCV])			//Looks for a match
					{sale[i].setAttribute("checked", "checked");	//Click the radio button
					found=1;										//Lets the program know something's been found
					}
			if (found==1) break;}
		if (found==1) {
			var xpathString = "//span [contains (.,'" + itemNames[LCV] + "')]/parent::td";
		
			allItems = document.evaluate(xpathString, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
			item = allItems.snapshotItem(allItems.snapshotLength-1);
		
			var beginning=item.innerHTML.indexOf('>: ')+3; 			//Appropriates the appropriate appropriation
			var ending=item.innerHTML.indexOf('(Sells', beginning);
		
			quantity=item.innerHTML.slice(beginning,ending); 		//Gets the quantity
		
			if (quantity.indexOf(',')==-1)					//Checks quantity for commas and removes them
				quantity*=1;						//To be compatable with BvS Thousand Separator
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
		
			location.assign('javascript:document.forms.namedItem("sellitem").submit()');	//sell items
		}
		else if (found==0)
			{alert("You don't seem to have any more non-looping items to sell.  It's safe to loop.");}
	}
/*	else if (event.keyCode == 65)										//A - Add an Items to the sell list.
		{var sale=document.forms.namedItem("sellitem").elements;		//Finds the Sellitem form
		for(var i=0; i<sale.length; i++)								//Increments through the Sellable items
			{if (sale[i].checked)										//Finds Selected item
				{var xpathString = "//span [contains (.,'" + sale[i].value + "')]/parent::td";
				allItems = document.evaluate(xpathString, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				item = allItems.snapshotItem(allItems.snapshotLength-1);
		
			var beginning=0; 			//Appropriates the appropriate appropriation
			var ending=item.innerHTML.indexOf(':', beginning);
		
			name=item.innerHTML.slice(beginning,ending); 		//Gets the quantity
				alert(name);									
			}
		}
	}
	else if (event.keyCode == 82)
		{
	}*/
}

/*itemNames=localStorage.getItem("itemNames").split("||");
itemCodes=localStorage.getItem("itemCodes").split("||");*/

if (itemNames.length != itemCodes.length) //Error Checking
	alert("WARNING!! You have forgotten to finish adding a Non-Loopable.  Disabling script. Names="+itemNames.length+" Codes="+itemCodes.length);
else
	{window.addEventListener("keyup", process_event, false);
	/*localStorage.itemNames=itemNames.join("||");
	localStorage.itemCodes=itemCodes.join("||");*/}
	
/* localStorage.clear()
>>> localStorage.setItem('foo', 'bar')
>>> localStorage.getItem('foo') = "bar"
>>> localStorage.key(0) = "foo"
>>> localStorage.removeItem('foo')
>>> localStorage.length = 0*/