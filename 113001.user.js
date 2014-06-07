// ==UserScript==
// @name           Earth Empires - Private Market purchase all
// @namespace      idontneedadomainname.com
// @description    Adds a "All" link to the private market
// @include        http://ffa.www.earthempires.com/purchases*
// ==/UserScript==


var buyallFunction = function(evt) {
	// evt.target == span -> parent td -> parent tr
	// fifth td contains max to buy, sixth contains the input elem
	var tr = evt.target.parentNode.parentNode;
	//alert(tr.innerHTML);
	var tdList = tr.getElementsByTagName("td");
	var v = tdList[4].innerHTML;
	//alert("Found value: " + v);
	tdList[5].getElementsByTagName("input")[0].value = v;
}


var uri = "" + document.location;
if( !uri.match("purchases") ) {
	return;
}

var table = document.getElementsByClassName("contenttable")[0];
var rows = table.getElementsByTagName("tr");

var i = 1;  // first row is the table heading
for( ; i < 6; ++i) {
	var linkElem = document.createElement("span");
	linkElem.innerHTML = "All";
	linkElem.addEventListener("click", buyallFunction);
	linkElem.style.cursor = "pointer";
	
	var buyallElem = document.createElement("td");
	buyallElem.appendChild(linkElem);
	
	var rowElem = rows[i];
	rowElem.appendChild(buyallElem);
}