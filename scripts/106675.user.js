// ==UserScript==
// @name			Facepunch Fixer
// @namespace		fixfp
// @description		Fix Facepunch's new double-column layout
// @include			http://*.facepunch*.com/*
// ==/UserScript==

// Get rid of the double columns
var tdlist = document.getElementsByTagName("td");
for (var i = 0; i < tdlist.length; i++) {
	var td = tdlist[i];

	if (td.getAttribute("valign") == "top") {
		var div = document.createElement("div");
		div.id = "unfuck";
		div.innerHTML = td.innerHTML;
		div.style.float = "none";
		td.parentNode.insertBefore(div, td);
		
		td.parentNode.removeChild(td);
	}
}

// Reorder things more or less like they were before
var last;
function recreateAfterLast( old )
{	
	var table = document.createElement("table");
	table.setAttribute("class", old.getAttribute("class"));
	table.setAttribute("cellpadding", old.getAttribute("cellpadding"));
	table.id = old.id;
	table.innerHTML = old.innerHTML;
	
	if (last == null)
		last = old;
	
	last.parentNode.insertBefore(table, last.nextSibling);
	
	old.parentNode.removeChild(old);
	last = table;
}

// Define things in the current forum list order
var cat3 = document.getElementById("cat3"); //facepunch
var cat398 = document.getElementById("cat398"); //creation corner
var cat11 = document.getElementById("cat11"); //garry's mod
var cat386 = document.getElementById("cat386"); //bullshit
var cat197 = document.getElementById("cat197"); //bottom of the forums

var cat348 = document.getElementById("cat348"); //games
var cat228 = document.getElementById("cat228"); //hardware and software
var cat392 = document.getElementById("cat392"); //hobbies

// Recreate everything in our new forum list order
recreateAfterLast( cat3 ); //facepunch
recreateAfterLast( cat228 ); //hardware and software
recreateAfterLast( cat398 ); //creationism corner
recreateAfterLast( cat348 ); //games
recreateAfterLast( cat386 ); //bullshit
recreateAfterLast( cat392 ); //hobbies
recreateAfterLast( cat11 ); //garry's mod
recreateAfterLast( cat197 ); //bottom of the forums