// ==UserScript==
// @name           PTP Checking Quick Open
// @namespace      http://userscripts.org/users/183236
// @description    Tool to open the next 5/10/15 in tabs
//
// @version		0.60
// @include		https://tls.passthepopcorn.me/unchecked.php
// @grant       none
//
// ==/UserScript==
/*---------------------Version History--------------------
0.10	-	Initial script
0.20	-	Buffering links in NodeList -> array
0.30	-	Made table
0.40	-	Shifted table to content div
0.50	-	Matched CSS
0.60	-	Split contest and non-contest
--------------------------------------------------------*/

// Create a new div to put the links in and append it to the content div
links_div1 = document.createElement('div');//makes a div
links_div1.setAttribute('class', 'box generic_datatable dataTable');//makes it look the same as rest of page
links_div1.setAttribute('id', 'normal_wrapper');

//adds div to beginning of content section
var node = document.getElementById('freeleech_wrapper');
var parentDiv = node.parentNode;
parentDiv.insertBefore(links_div1,node);

//another node for space between tables
empty_div = document.createElement('div');
empty_div.innerHTML += '<br>';
parentDiv.insertBefore(empty_div,node);

//makes buttons in new divs
links_div1.innerHTML += '<table class="box generic_datatable dataTable" id="normal"><thead><tr class="colhead"><th>Press button to open several links in new tabs</th></tr></thead><td>Contest: <button type="5" id="5f">5</button><button type="10" id="10f">10</button><button type="15" id="15f">15</button> Non-contest: <button type="5" id="5n">5</button><button type="10" id="10n">10</button><button type="15" id="15n">15</button></td></table>';

//makes them clickable
addButtonListener();

function addButtonListener() {
	//first div
    document.getElementById("5f").addEventListener("click", function(){openLinks(5,linksArray)}, true);
	document.getElementById("10f").addEventListener("click", function(){openLinks(10,linksArray)}, true);
	document.getElementById("15f").addEventListener("click", function(){openLinks(15,linksArray)}, true);
	document.getElementById("5n").addEventListener("click", function(){openLinks(5,linksArray2)}, true);
	document.getElementById("10n").addEventListener("click", function(){openLinks(10,linksArray2)}, true);
	document.getElementById("15n").addEventListener("click", function(){openLinks(15,linksArray2)}, true);
}

//collect all the links in a NodeList
//looks for ahref with a td that has 'torrents' in the link
var linksToOpen = document.querySelectorAll ("#freeleech>tbody>tr>td>a[href*='torrents']");
var linksToOpen2 = document.querySelectorAll ("#normal>tbody>tr>td>a[href*='torrents']");

//--- linksToOpen is a NodeList, we want an array of links...
var linksArray  = [];
for (var J = 0, numLinks = linksToOpen.length;  J < numLinks;  ++J) {
    linksArray.push (linksToOpen[J].href);
}

var linksArray2  = [];
for (var J = 0, numLinks = linksToOpen2.length;  J < numLinks;  ++J) {
    linksArray2.push (linksToOpen2[J].href);
}

function openLinks(howMany, array)
{
	for(var i=0; i<howMany; i++)
	{
		var linkToOpen  = array.shift ();
		if (linkToOpen)
			window.open (linkToOpen, '_blank');
	}
}

