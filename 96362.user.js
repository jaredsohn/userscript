// ==UserScript==
// @name           איקרים העיר העברית פרתית
// @namespace      איקרים העיר העברית - הגרסא חדשה - מחליפה את העיר בעיר יפה יותר
// @version        2.0.0
// @source         http://userscripts.org/scripts/show/51406
// @identifier     http://userscripts.org/scripts/source/51406.user.js
// @mail           Soon@Soon.Soon
// @description    איקרים העיר העברית - מחליפה את העיר בעיר יפה יותר 
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.co.il/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ***************** Start *****************

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ***************** Background ************* !
addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://img14.imageshack.us/img14/9783/xxx5105.jpg);}');

// ***************** Space ******************* !
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url(http://img352.imageshack.us/img352/8684/spacervf7.gif);}');

// ***************** Transporter ************* !
addNewStyle('#city #container #mainview #locations .transporter {right: 100px;}');

// ***************** Granison Outpost ******** !
addNewStyle('#city #container #mainview #locations .garnisonOutpost {background-image:url(http://img352.imageshack.us/img352/8684/spacervf7.gif);}');

// ***************** Granison Center ********* !
addNewStyle('#city #container #mainview #locations .garnisonCenter {background-position: 5px 0;}');

// ***************** Embassy ***************** !
GM_addStyle("#city #container #mainview #locations .embassy .buildingimg        {background-image:url(http://img93.imageshack.us/img93/9144/buildingembassy.gif)}");

// ***************** Museun ****************** !
GM_addStyle("#city #container #mainview #locations .museum .buildingimg        {background-image:url(http://www.siz.co.il/my.php?i=yzonijwmrfx2.jpg)}");

// ---------------------------------------------

// ***************** Town Hall ***************
GM_addStyle("#city #container #mainview #locations .townHall .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_townhall.gif)}");

// ***************** Port *********************
GM_addStyle("#city #container #mainview #locations .port .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_port.gif)}");

// ***************** Ship Yard ****************
GM_addStyle("#city #container #mainview #locations .shipyard .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_shipyard.gif)}");

// ***************** Barracks *****************
GM_addStyle("#city #container #mainview #locations .barracks .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_barracks.gif)}");


// ***************** Tavern *******************
GM_addStyle("#city #container #mainview #locations .tavern .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_tavern.gif)}");

// ***************** Branch Office ************
GM_addStyle("#city #container #mainview #locations .branchOffice .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_branchOffice.gif)}");

// ***************** Safe House ***************
GM_addStyle("#city #container #mainview #locations .safehouse .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_safehouse.gif)}");

// ***************** Palace *******************
GM_addStyle("#city #container #mainview #locations .palace .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_palace.gif)}");

// ***************** Palace Colony ************
GM_addStyle("#city #container #mainview #locations .palaceColony .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_palaceColony.gif)}");

// ***************** WareHouse ****************
GM_addStyle("#city #container #mainview #locations .warehouse .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_warehouse.gif)}");

// ***************** WorkShop ****************
GM_addStyle("#city #container #mainview #locations .workshop .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_workshop.gif)}");

// ***************** StoneMason **************
GM_addStyle("#city #container #mainview #locations .stonemason .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_stonemason.gif)}");

// ***************** FireWorker **************
GM_addStyle("#city #container #mainview #locations .fireworker .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_fireworker.gif)}");

// ***************** GlassBlowing ************
GM_addStyle("#city #container #mainview #locations .glassblowing .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_glassblowing.gif)}");

// ***************** Alchemist ***************
GM_addStyle("#city #container #mainview #locations .alchemist .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_alchemist.gif)}");

// ***************** Architect ***************
GM_addStyle("#city #container #mainview #locations .architect .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_architect.gif)}");

// ***************** Optician ****************
GM_addStyle("#city #container #mainview #locations .optician .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_optician.gif)}");

// ***************** Vineyard ****************
GM_addStyle("#city #container #mainview #locations .vineyard .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_vineyard.gif)}");

// ***************** Winegrower **************
GM_addStyle("#city #container #mainview #locations .winegrower .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_winegrower.gif)}");

// ********************* PL ******************


   var URL= "http://s188.photobucket.com/albums/z250/Hagnuf/cutthroat_ikariam/";
// 
GM_addStyle("#city #container #mainview #locations .barracks .buildingimg       {background-image:url("+URL+"building_barracks2.gif)}");
GM_addStyle("#city #container #mainview #locations .alchemist .buildingimg      {background-image:url("+URL+"building_alchemist.gif)}");
GM_addStyle("#city #container #mainview #locations .academy .buildingimg        {background-image:url("+URL+"building_academy.gif)}");
GM_addStyle("#city #container #mainview #locations .branchOffice .buildingimg   {background-image:url("+URL+"building_branchOffice.gif)}");
GM_addStyle("#city #container #mainview #locations .architect .buildingimg      {background-image:url("+URL+"building_architect.gif)}");
GM_addStyle("#city #container #mainview #locations .carpentering .buildingimg   {background-image:url("+URL+"building_carpentering.gif)}");
GM_addStyle("#city #container #mainview #locations .embassy .buildingimg        {background-image:url("+URL+"building_embassy.gif)}");
GM_addStyle("#city #container #mainview #locations .fireworker .buildingimg     {background-image:url("+URL+"building_fireworker.gif)}");
GM_addStyle("#city #container #mainview #locations .glassblowing .buildingimg   {background-image:url("+URL+"building_glassblowing.gif)}");
GM_addStyle("#city #container #mainview #locations .museum .buildingimg         {background-image:url("+URL+"building_museum.gif)}");
GM_addStyle("#city #container #mainview #locations .optician .buildingimg       {background-image:url("+URL+"building_optician.gif)}");
GM_addStyle("#city #container #mainview #locations .palace .buildingimg         {background-image:url("+URL+"building_palace.gif)}");
GM_addStyle("#city #container #mainview #locations .palaceColony .buildingimg   {background-image:url("+URL+"building_palaceColony.gif)}");
GM_addStyle("#city #container #mainview #locations .tavern .buildingimg         {background-image:url("+URL+"building_tavern.gif)}");
GM_addStyle("#city #container #mainview #locations .stonemason .buildingimg     {background-image:url("+URL+"building_stonemason.gif)}");
GM_addStyle("#city #container #mainview #locations .vineyard .buildingimg       {background-image:url("+URL+"building_vineyard.gif)}");
GM_addStyle("#city #container #mainview #locations .townHall .buildingimg       {background-image:url("+URL+"building_townhall.gif)}");
GM_addStyle("#city #container #mainview #locations .port .buildingimg           {background-image:url("+URL+"building_port.gif)}");
GM_addStyle("#city #container #mainview #locations .safehouse .buildingimg      {background-image:url("+URL+"building_safehouse.gif)}");
GM_addStyle("#city #container #mainview #locations .shipyard .buildingimg       {background-image:url("+URL+"building_shipyard.gif)}");
GM_addStyle("#city #container #mainview #locations .warehouse .buildingimg      {background-image:url("+URL+"building_warehouse.gif)}");
GM_addStyle("#city #container #mainview #locations .workshop .buildingimg       {background-image:url("+URL+"building_workshop.gif)}");
GM_addStyle("#city #container #mainview #locations .winegrower .buildingimg     {background-image:url("+URL+"building_winegrower.gif)}");

//************ G *************

  var URL= "http://i752.photobucket.com/albums/xx165/firstcauchemar/cutthroat/";

GM_addStyle("#globalResources .gold a                                          {background-image:url("+URL+"btn_treasure.jpg)}");
GM_addStyle("#globalResources .gold a.hover                                    {background-image:url("+URL+"btn_treasure.jpg) background-position: 0px -34px}"); 
GM_addStyle("#globalResources .gold a.down                                     {background-image:url("+URL+"btn_treasure.jpg) background-position: 0px -68px}"); 
GM_addStyle("#city #container #mainview #locations .wall .buildingimg           {background-image:url("+URL+"building_wall-1.gif)}");

//******************* LM ******************

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

// ***************** End *******************