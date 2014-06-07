// ==UserScript==
// @name           BvS Quicksell Hot Keys (old version)
// @namespace      Ren Po Ken
// @description    Hot keys that sell all your (E)mo CDs, Razor (B)lades, and (H)ot Pictures of Emosuke.  Very easy to create your own Hot keys even for non-programmers.
// @include        http://*animecubed.com/billy/bvs/shop*
// ==/UserScript==

/*	Special thanks to WingedCat for asking an impertinent question that had a very pertinent answer.
	To create your own custom hot keys:
	1) Set KeyCodeFetch equal to 1 on line 18 to enable the event alert feature.  Save your change, but do not close this window.  Go to the shop page in BvS (reloading it if you were already there) and hit the key you wish to assign a quick sell to.  An alert box will show up.  Follow the directions in it.  If an alertbox does not appear, then it is likely that the key does not have a keyCode assigned to it and you can not use it for a hot key (the function keys are examples of this).  It is not recommended to assign hot keys to the number (0-9) keys.
	2) On line 19 (starts with 'var keyCodes') insert a comma and a space after the last number on the line (if you haven't added any custom hot keys, the number should be 66, otherwise it will be the last number you added) but before the right parenthesis and type in the number that appeared in the alert box in step one.
	3) Go back to the shop page and hit Ctrl-U (or go to View -> Page Source) and do a search in the source code for the item you wish to assign a quicksell to.  Right before it should be some text that includes "?item=", a number, and then "%",  Write that number down, you'll be needing it very very soon.  Close the view source window.
	4) On line 20 (starts with 'var itemCodes') add the number from step three to the line in the same way you did in step 2.
	5) Similar to steps 2 and 4, on line 21 (starts with "var itemName") add the name of the item you are searching for.  Remember that the entire name must be in quotes and spelled correctly (or at least BvS correctly) the way that the other names on the line are.
	6) Set KeyCodeFetch back to 0 on line 18.  Save your changes.  Go back to BvS and hit Shop in the minimenu to load the newest version of your script.  Hit the key you defined.  Steeple your fingers beneath your chin and state that all is proceeding as you have foreseen.  Dominate the galaxy.  A malevolent chuckle is optional, but appropriate.
*/

var keyCodeFetch = 0;	//line 18
var keyCodes = new Array(72, 69, 66);	//line 19
var itemCodes = new Array(113, 107, 102);	//line 20
var itemName = new Array("Hot Picture of Emosuke", "Emo Rock CDs", "Razor Blades");	//line 21
var arrayIndex = -1;
var xpathString;

function process_event(event) {
	if (keyCodeFetch==1)
		alert("The Key Code is: "+event.keyCode+".  Write this number down, you'll be needing it in a moment.  Then go on to step 2.");
		
	for (var LCV=0; LCV<keyCodes.length; LCV++) //Finds the appropriate index in the array
		{if (event.keyCode == keyCodes[LCV])
			arrayIndex = LCV;
		}
		//This line for rent. Cheap.
	if (arrayIndex!= -1)
		{var sale=document.forms.namedItem("sellitem").elements; //Clicks the appropriate radio button
		for(var i=0; i<sale.length; i++)
			if(sale[i].value==itemCodes[arrayIndex])
				sale[i].wrappedJSObject.click();

		xpathString = "//span [contains (.,'" + itemName[arrayIndex] + "')]/parent::td";
		
		allItems = document.evaluate(xpathString, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		item = allItems.snapshotItem(allItems.snapshotLength-1);
		
		var beginning=item.innerHTML.indexOf('>: ')+3; //Appropriates the appropriate appropriation
		var ending=item.innerHTML.indexOf('(Sells', beginning);
		
		quantity=item.innerHTML.slice(beginning,ending)*1; //Puts the amount in the text field.
		sell = document.evaluate("//input [@name='numbertosell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		tosell = sell.snapshotItem(0);
		tosell.value = quantity;
		
		confirm = document.evaluate("//input [@name='sellconfirm']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		toConfirm = confirm.snapshotItem(0);
		toConfirm.setAttribute("checked", "checked"); //check the confirm checkbox
		
		document.forms.namedItem("sellitem").wrappedJSObject.submit();	//sell items
		}
}

if ((keyCodes.length != itemCodes.length)||(keyCodes.length != itemName.length)) //Error Checking
	alert("WARNING!! You have forgotten to finish adding a hot key.  Disabling script.");
else
	window.addEventListener("keyup", process_event, false);