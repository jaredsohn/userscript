// ==UserScript==
// @name        Inventory Extra Links
// @namespace   http://www.azrane.com
// @description Adds links to your inventory
// @include     http://www.kingdomofloathing.com/inventory.php*
// @include     http://www.kingdomofloathing.com/storage.php*
// @include     http://www.kingdomofloathing.com/closet.php*
// @include     http://127.0.0.1:60080/inventory.php*
// @include     http://127.0.0.1:60080/storage.php*
// @include     http://127.0.0.1:60080/closet.php*
// @version     1
// ==/UserScript==


//First, find the current page.
var currentPage = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);

//Now, reference the string that contains the links at the top of the page with variable x
var x = document.getElementsByTagName("center")[2];

//Fill which (page of inventory) with a default value of 1 (consumables);
var which = 1;

//Now, find which page it's on based on the selected page (without a hyperlink) in x.
//This has to be done, because the which get variable sometimes isn't set.
if(x.innerHTML.indexOf("[consumables]")		!= -1){ which = 1; }
if(x.innerHTML.indexOf("[equipment]")		!= -1){ which = 2; }
if(x.innerHTML.indexOf("[miscellaneous]")	!= -1){ which = 3; }
if(x.innerHTML.indexOf("[favorites]")		!= -1){ which = 4; }
if(x.innerHTML.indexOf("[Hagnk]")			!= -1){ which = 5; }

//Fill link variables with HTML, using the value of which found above to switch between spaces, but keep the same page.
var storageLink = '[<a href="storage.php?which='+which+'">Hagnk\'s</a>]';
var inventoryLink = '[<a href="inventory.php?which='+which+'">Inventory</a>]';
var closetLink = '[<a href="closet.php?which='+which+'">Closet</a>]';

//Based on the current page, turn the hyperlink into plain text for the space we're in
switch(currentPage){
	case "inventory.php":	inventoryLink = '[Inventory]';	break;
	case "storage.php":		storageLink = '[Hagnk\'s]';		break;
	case "closet.php":		closetLink = '[Closet]';		break;
}

//If in Hagnk's, have to do extra processing for extra text.
if(currentPage == "storage.php"){
	y = x.innerHTML.split("<p>");
	//alert(y.length);
	if(which == 5) { which = 1; }
	y[0] = y[0] + '<p>[<a href="inventory.php?which='+which+'">Inventory</a>]&nbsp;&nbsp;[<a href="closet.php?which='+which+'">Closet</a>]&nbsp;&nbsp;[Hagnk\'s]</p>';
	x.innerHTML = y.join("<p>");
}else{
	//If not in Hagnk's, output generated text just after the page links.
	x.innerHTML = x.innerHTML + "<p>" + inventoryLink + "&nbsp;&nbsp;" + closetLink + "&nbsp;&nbsp;" + storageLink + "</p>";
}
