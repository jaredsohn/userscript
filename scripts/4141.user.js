// ==UserScript==

// @name           Shartak Inventory Counter
// @namespace      http://www.philosoph.us/
// @description    Counts used inventory spaces and tells you how many free ones you have.
// @include        http://*shartak.com/game.cgi*

// ==/UserScript==

// Shartak Inventory Counter
// Version: 1.0 (2006-05-26)

// Every item takes 1 inventory space except for gold (which takes 0) and rifles and blowguns (which take 2 each, loaded or not). Strange results should be reported on the Shartak wiki at http://wiki.shartak.com/index.php/Talk:Items


showUsedSpaces=0; // 0: display free spaces only; 1: display used and free spaces.


var total=71, used=0, quantity=0, output='', inv=document.getElementsByTagName("li"), invLen=inv.length;
if (invLen>0) { // If the user has any items (i.e., isn't dead or resting from a resurrection)
	for (i=0; i<invLen; i++) { // For each <li></li> element
		if (inv[i].innerHTML.search(/value="gold\scoin/)==-1) { // If the item isn't gold
			quantity=parseInt(inv[i].innerHTML.substr(0,2)); // Get the quantity of this item
			if (inv[i].innerHTML.search(/value="(rifle.[^b]|blowpipe)/)==-1) { // If the item isn't a rifle or blowgun
				used+=quantity; // Add the quantity to 'used'
			} else used+=2*quantity; // Otherwise, add twice the quantity to 'used'
		}
	}
	if (showUsedSpaces==1) {
		output += "You have <span class=\"used\">" + used + "</span> used inventory space";
		if (used!=1) output += "s";
		output += " and <span class=\"free\">" + (total-used) + "</span> free one";
		if (total-used!=1) output += "s";
	} else {
		output += "You have <span class=\"free\">" + (total-used) + "</span> free inventory space";
		if (total-used!=1) output += "s";
	}
	document.body.innerHTML=document.body.innerHTML.replace(/(Inv.+<\/h3>)/, "$1\n<p class=\"inventory-counter\">" + output + ".</p>"); // Add a results paragraph below the "Inventory" header.
}
