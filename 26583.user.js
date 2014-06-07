// ==UserScript==
// @name           Tykinruoka's Display Case Script
// @namespace      http://trashf.taistelumarsu.org
// @description    Compares between your inventory and your display case
// @include        http://*.kingdomofloathing.com/managecollection.php
// ==/UserScript==
/*
Version history:
v0.01 Alpha version
- slow, looped through the display case every time
- browser stopped responding

v0.01 Beta version
- works pretty nice I think :)
- some ideas not yet implemented

v0.01 Initial release
- no longer pops up the question, just prints all kind of stuff without asking any questions
- added checkbox for hiding the information

v0.02
- fixed a bug occuring when case was empty
- fixed a calculations bug
- changed visibility -> display, which is much wiser when the list is long
- automatically inserts next 10 items to boxes

TODO: 
- Check for script updates.
- Color every box with orange after user adds them (Started to do this, but...).

Feel free to develop further.

Questions? Feedback? Want to develop this PoS further? Please, contact Tykinruoka (#875019) a.k.a. TrashF @ QuakeNET, IRCnet & netgamers.

*/

function addOrange(num) {
	oranged = document.getElementById("oranged").value.split(';');
	oranged[oranged.length] = num;
	document.getElementById("oranged").value = oranged.join(';');
}

//get all selects with name "whichitem1"
var selects = document.getElementsByName("whichitem1");

//first one of them is user inventory
var invselect = selects[0];

//append hidden input to it
var hiddenorange = document.createElement("input");
hiddenorange.id = "oranged";
hiddenorange.type = "hidden";
hiddenorange.value = "";
invselect.appendChild(hiddenorange);

//and the second one is user's display case (if there is no 2nd select, case is empty)
dispselect = false;
var dispitems = [];
if (selects.length > 1) {
	var dispselect = selects[1];
}

if (dispselect != false) {
	//collect all display case item's item-id's here
	for (i = 0; i < dispselect.options.length; i++) {
		dispitems[dispitems.length] = dispselect.options[i].value;
	}

	//and sort them
	dispitems.sort(function(a,b){return a - b});
}

//then write something to output
var msg = "";
msg += "Unique items in inventory: " + parseInt(invselect.options.length-1) + "<br>";
if (dispselect != false) {
	msg += "Unique items in display case: " + dispselect.options.length + "<br><br>";
} else {
	msg += "Unique items in display case: 0<br><br>";
}
var notfound = 0;

function handleMissing(num) {
	addboxes = 1;
	if (num > 10) { 
		num = 10;
	}
	while (addboxes < num) {
		for (i = 0; i < document.links.length; i++) {
			if (document.links[i].className == "nounder") {
				location.href = document.links[i].href;
				break;
			}
		}
		addboxes++;
	}
	location.href = "javascript:addMissingItems(" + num + ")";
}

for (i = 0; i < invselect.options.length; i++) {
	if (invselect.options[i].value != "") {
		//looping through user inventory
		var found_in_disp = false;
		if (invselect.options[i].value > 0 && invselect.options[i].value != "") {
			var compare = parseInt(invselect.options[i].value);
			for (h = 0; h < dispitems.length; h++) {
				if (compare == dispitems[h]) {
					//this inventory item is already in display case
					found_in_disp = true;
					break;
				}
				if (compare < dispitems[h]) {
					//search has gone too far
					break;
				}
			}
			if (!found_in_disp) {
				if (notfound == 0) {
					msg += "Items in inventory that aren't in display case (TOTALNUM):<br><ul>";
				}
				notfound++;
				addOrange(compare);
				msg += "<li id='notfound" + notfound + "' title='" + invselect.options[i].value + "'>" + invselect.options[i].text.substring(0,invselect.options[i].text.length-4) + "</li>";
				invselect.options[i].style.background = "orange";
			}
		}
	}
}
if (notfound == 0) {
	msg += "No matches.";
} else {
	msg += "</ul>";
	itemword = " items";
	if (notfound == 1) {
		itemword = " item";
	}
	msg = msg.replace("TOTALNUM", notfound+itemword);
}

//create new div, search a nice spot to add it to and append the created message to the newly made div
var div11 = document.getElementById("inv_item11");
var newdiv = document.createElement("div");
newdiv.style.marginTop = "10px";
newdiv.style.marginBottom = "10px";
newdiv.innerHTML = msg;
newdiv.id = "dispdiff";
checkboxdiv = document.createElement("div");
checkboxdiv.marginTop = "10px";
checkboxdiv.innerHTML = "<script type='text/javascript'>function addMissingItems(notfound){for (i = 1; i <= notfound; i++) {document.getElementsByName('howmany'+i)[0].value = 1;selectbox = document.getElementsByName('whichitem' + i)[0];for (j = 0; j < selectbox.options.length; j++) {if (selectbox.options[j].value == document.getElementById('notfound' + i).title) {selectbox.selectedIndex = j;break;}}}}</script><input type='checkbox' onchange='if (document.getElementById(\"dispdiff\").style.display == \"none\") { document.getElementById(\"dispdiff\").style.display=\"block\"; } else { document.getElementById(\"dispdiff\").style.display=\"none\";}'>Hide comparison between inventory and display case";
div11.appendChild(checkboxdiv);
checkboxdiv.appendChild(newdiv);

if (notfound > 0) {
	handleMissing(notfound);
}

/*
 * This is a start for making all added selects to have the same orange backgrounds for matching items
 * Basic idea is/was to search for the plus sign and add a function to it
//search for the first plus sign (it's the first link with className 'nounder')
for (i = 0; i < document.links.length; i++) {
	if (document.links[i].className == "nounder") {
		document.links[i].href += ' boxes = []; for (i = 2; i <= 11; i++) { if (typeof(document.getElementById("whichitem" + i)) != undefined) { boxes[boxes.length] = document.getElementById("whichitem"+i); alert("add");}} alert(boxes);';
		break;
	}
}
*/
