// ==UserScript==
// @name           Ikariam Nearest City
// @namespace      NearestCity
// @autor          Salmonela - Ikariam.co.il world Beta.
// @description    This Ikariam script calculates and displays the distance between the currently selected Island to the Islands owned by the player. 
// @include        http://*ikariam.*/index.php*
// @require		   http://userscripts.org/scripts/source/57756.user.js
// 
// @version        1.03
// @history        1.03 Changed display of distance to show travel time instead. 
// @history        1.02 Fixed script to work with Ikariam version 0.3.2
// @history        1.01 Added a script updater
// @history        1.00 Initial release
// @date           07/10/09
// ==/UserScript==

ScriptUpdater.check(59305, "1.03");

var currCityXcoord;
var currCityYcoord;

// check to see that we are on world view
if (document.body.id == 'worldmap_iso')
{
	// Fetching Current island coords
	getCurrIslandCoords();

	// Fetching all player's cities
	var coordsLists
	coordsLists = document.evaluate("//option[@class='coords']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var thisLink
	var citiesData = new Array(coordsLists.snapshotLength);

	//Loops through each city to get its name and coords
	for (var i=0;i<coordsLists.snapshotLength;i++)
	{ 
		thisLink = coordsLists.snapshotItem(i).childNodes[0].textContent;

		//Get x and y coords of the town
		var str=thisLink;
		var split = str.split(":");

		var str = split[0]; 
		var patt1 = /\d/g;
		var result = str.match(patt1);
		var xcoord = result[0].concat(result[1])

		var str = split[1]; 
		var patt1 = /\d/g;
		var result = str.match(patt1);
		var ycoord = result[0].concat(result[1]);
		
		var str = thisLink.split("]");
		var cityName = str[1];

		citiesData[i] = new Array(4);
		citiesData[i][1]  = cityName;
		citiesData[i][2]  = xcoord;
		citiesData[i][3]  = ycoord;
	}
	
	// Calculating the distance of each city
	calculateDistance();

	// Sort the array according to the distances
	citiesData.sort(sortNum);

	// Creating the new dynamic Div
	var infoDiv = document.evaluate('//div[@id="information"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	sidebarDiv = infoDiv.snapshotItem(0)

	newList=document.createElement('tbody')

	newdyDiv=document.createElement('div')
	newdyDiv.setAttribute("class","dynamic")
	newdyDiv.setAttribute("id","actioncontainer")

	newh3=document.createElement('h3')
	newh3.setAttribute("class","header")
	newh3.innerHTML="Nearest City"

	newcontDiv=document.createElement('div')
	newcontDiv.setAttribute("class","content")

	newTable=document.createElement('table')
	
	for (x in citiesData)
	{
		newRow = newTable.insertRow(x);
		cityCell = newRow.insertCell(0);
		distCell = newRow.insertCell(1);
		
		distCell.innerHTML  = citiesData[x][0];
		cityCell.innerHTML  = citiesData[x][1];
		
		distCell.align="center";
		cityCell.style.padding="0px 5px";
		distCell.style.minWidth="20%";
	}

	newTable.frame="border";
	newTable.setAttribute("style", "border-style:dotted; border-width:1px; width:100%;");

	newfooterdiv=document.createElement('div')
	newfooterdiv.setAttribute("class","footer")

	newcontDiv.appendChild(newTable)

	newdyDiv.appendChild(newh3)
	newdyDiv.appendChild(newcontDiv)
	newdyDiv.appendChild(newfooterdiv)

	sidebarDiv.parentNode.insertBefore(newdyDiv, sidebarDiv)

	// Adding a listener to island clicks
	divList.snapshotItem(0).addEventListener('DOMSubtreeModified', changeIsland, true);
}

//-------------------------------------------------------------------------------------------------------//

// Clicking on an island will recalculate and redraw the new data
function changeIsland()
{
	getCurrIslandCoords();
	calculateDistance();
	citiesData.sort(sortNum);
	refreshTableDiv();
}

// Refresh city table div
function refreshTableDiv()
{
	for (x in citiesData)
	{
		newTable.rows[x].cells[0].innerHTML  = citiesData[x][1];
		newTable.rows[x].cells[1].innerHTML  = citiesData[x][0];
	}
}

// Helper function for sorting the matrix
function sortNum(a,b)
{
	var stra = new String(a);
	var split = stra.split(",");
	a = split[0];
	
	var strb = new String(b);
	var split = strb.split(",");
	b = split[0];

	return a>b;
}

// Fetching the Island coords from the Island Breadcrumbs
function getCurrIslandCoords()
{
	divList = document.evaluate("//div[@id='islandBread']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (divList.snapshotItem(0) != null)
	{
		var str = divList.snapshotItem(0).childNodes[0].textContent
		var split = str.split(":");

		var str = split[0]; 
		var patt1 = /\d/g;
		var result = str.match(patt1);
		currCityXcoord = result[0].concat(result[1])

		var str = split[1]; 
		var patt1 = /\d/g;
		var result = str.match(patt1);
		currCityYcoord = result[0].concat(result[1])
	}
}

// Calculates the distance between the current island and the player's cities
function calculateDistance()
{
	for (city in citiesData)
	{
		var deltaX = parseInt(currCityXcoord) - parseInt(citiesData[city][2]);
		var deltaY = parseInt(currCityYcoord) - parseInt(citiesData[city][3]);
		var hops = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		
		var distanceInMinutes = 0;
		var hours	 = "00";
		var minutes  = "00";
		
		if (hops > 0) 
		{
			distanceInMinutes = Math.round(20 * hops)
			hours = Math.floor(distanceInMinutes / 60);
			if (hours < 10)
			{
				hours = "0" + hours;
			}
			
			minutes = distanceInMinutes % 60;
			if (minutes < 10)
			{
				minutes = "0" + minutes;
			}
		}
		
		citiesData[city][0] = hours + ":" + minutes;
	}
}


