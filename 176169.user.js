// ==UserScript==
// @name           Scrape ports info
// @namespace      http://userscripts.org/users/183236
// @description    Tool to scrape
//
// @version		0.10
// @include		http://www.worldportsource.com/ports/*
// @grant       none
//
// ==/UserScript==
/*---------------------Version History--------------------
0.10	-	Initial script
--------------------------------------------------------*/

// Create a new div to put the links in and append it to the content div
links_div1 = document.createElement('div');//makes a div
links_div1.setAttribute('class', 'box generic_datatable dataTable');//makes it look the same as rest of page
links_div1.setAttribute('id', 'normal_wrapper');

//makes buttons in new divs
links_div1.innerHTML += '<table class="box generic_datatable dataTable" id="normal"><thead><tr class="colhead"><th>Button: </th></tr></thead><td>Contest: <button type="5" id="btn_id">scrape</button></td></table>';

//makes them clickable
addButtonListener();

function addButtonListener() {
	//first div
    document.getElementById("btn_id").addEventListener("click", function(){openLinks(5,linksArray)}, true);
	
}

//collect all the links in a NodeList
//looks for ahref with a td that has 'torrents' in the link
var linksToOpen = document.querySelectorAll ("#freeleech>tbody>tr>td>a[href*='torrents']");

//--- linksToOpen is a NodeList, we want an array of links...
var linksArray  = [];
for (var J = 0, numLinks = linksToOpen.length;  J < numLinks;  ++J) {
    linksArray.push (linksToOpen[J].href);
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
