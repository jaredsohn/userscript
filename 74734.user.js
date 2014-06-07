// ==UserScript==
// @name           NorronTheftManager
// @namespace      http://userscripts.org/users/64075
// @include        http://www.mythicwars.com/norron/g_spyMissions*.asp*
// ==/UserScript==


// Change this number if you want the script to display more or less.
var NUMBER_OF_THEFTS = 10;

// Do not change any of these global variables.
var SUCCEEDED = 0;
var FAILED = 1;
var FAVORITES = 2;

// Function used to get previously theft reports
function getSavedValues(type)
{
	if(type == SUCCEEDED)
		return eval(GM_getValue('successfulTheftList', '[]'))
	else if(type == FAILED)
		return eval(GM_getValue('failedTheftList', '[]'))
	else
		return eval(GM_getValue('favoritesTheftList', '[]'))
}

// Function used to save all the theft reports
function saveValues(type, list)
{
	if(type == SUCCEEDED)
		GM_setValue('successfulTheftList', uneval(list)); 
	else if(type == FAILED)
		GM_setValue('failedTheftList', uneval(list)); 
	else
		GM_setValue('favoritesTheftList', uneval(list)); 
}

// Deletes all saved values of the specified type
function deleteSavedValues(type)
{
	var list = getSavedValues(type);
	
	for each(var val in list)
		GM_deleteValue(val);

}
// Deletes all saved values for this script.
function deleteAllSavedValues()
{
	for each(var val in GM_listValues())
		GM_deleteValue(val);
}

// Prints saved equipment. Used for debugging.
function printSavedValues()
{
	var vals = GM_listValues().map(GM_getValue);
	GM_log(vals);
}

function removeFirstElement(theArray)
{
	var newArray = [];
	for(var i=1; i<theArray.length; i++)
		newArray.push(theArray[i]);
	return newArray;
}

function addTheftData(newTable, theftList, type)
{
	var displayText;
	if(type == FAVORITES)
		displayText = 'remove';
	else
		displayText = 'favorite';

	// Create row to hold the theft info
	var newRow = document.createElement('tr');
	var newCol = document.createElement('td');


	// Create a line holding each of the old theft reports retrieved
	var innerTable = document.createElement('table');
	for each(var theft in theftList) {
		var innerRow = document.createElement('tr');
		var innerCol1 = document.createElement('td');
		innerCol1.setAttribute('width','50');
		var fontEl = document.createElement('font');
		fontEl.setAttribute('size', '2');
		var anchorEl = document.createElement('a');

		if(type == FAVORITES)
		{
			anchorEl.addEventListener('click', function(theft) { return function()
									{ 
									  var favoritesList = eval(GM_getValue('favoritesTheftList', '[]'));
									  var newFavoritesList = [];
									  for each(var item in favoritesList) {
										if(item != theft)
											newFavoritesList.push(item);
									  }
									  GM_setValue('favoritesTheftList', uneval(newFavoritesList)); 
									}}(theft), false);
		}
		else
		{
			anchorEl.addEventListener('click', function(theft) { return function()
									{ 
									  var favoritesList = eval(GM_getValue('favoritesTheftList', '[]'));
									  if(favoritesList==""){
									  	favoritesList = new Array();
									  }
									  favoritesList.push(theft);
									  GM_setValue('favoritesTheftList', uneval(favoritesList)); 
									}}(theft), false);
		}
		anchorEl.setAttribute('href', '');
		anchorEl.innerHTML = displayText;
		anchorEl.setAttribute('id', 'fav');
		fontEl.appendChild(anchorEl);
		innerCol1.appendChild(fontEl);
		innerRow.appendChild(innerCol1);
		var innerCol2 = document.createElement('td');
		innerCol2.setAttribute('class','bodytext');
		innerCol2.innerHTML += theft;
		innerRow.appendChild(innerCol2);
		innerTable.appendChild(innerRow);
	}
	newCol.appendChild(innerTable);


	// First and last col's which are blank. Used just for looks.
	colFiller1 = document.createElement('td');
	colFiller1.setAttribute('width', '30');
	colFiller2 = document.createElement('td');
	colFiller2.setAttribute('width', '30');

	// Put everything in place.
	newRow.appendChild(colFiller1);
	newRow.appendChild(newCol);
	newRow.appendChild(colFiller2);
	newTable.appendChild(newRow);
}

function createSubHeader(newTable, headerText, type)
{
	var rowMainSubHeader = document.createElement('tr');
	var colMainSubHeader = document.createElement('td');

	var colFiller1 = document.createElement('td');
	colFiller1.setAttribute('width', '30');
	var colFiller2 = document.createElement('td');
	colFiller2.setAttribute('width', '30');

	var colForAnchorEl = document.createElement('td');
	var anchorEl = document.createElement('a');

	anchorEl.addEventListener('click', function(type) { return function()
							{ 
							  	if(type == SUCCEEDED)
									GM_deleteValue('successfulTheftList');
								else if(type == FAILED)
									GM_deleteValue('failedTheftList');
								else
									GM_deleteValue('favoritesTheftList');
							}}(type), false);

	colMainSubHeader.setAttribute('class', 'mainsubsubheader');
	colMainSubHeader.innerHTML = headerText;

	anchorEl.setAttribute('href', '');
	anchorEl.innerHTML = ' (reset)';
	anchorEl.setAttribute('class', 'helpheaderlink');
	anchorEl.setAttribute('style', 'font-size:10px;');
	colMainSubHeader.appendChild(anchorEl);

	rowMainSubHeader.appendChild(colFiller1);
	rowMainSubHeader.appendChild(colMainSubHeader);
	rowMainSubHeader.appendChild(colFiller2);

	newTable.appendChild(rowMainSubHeader);
}


//printSavedValues();
//deleteSavedValues();


if(document.URL.search("g_spyMissions.asp") != -1)
{
	// Table where the new HTML will be placed
	var table = document.getElementsByTagName('table')[19];

	// New table to put all the new data into
	var newTable = document.createElement('table');
	newTable.setAttribute('cellpadding', '4');
	//newTable.setAttribute('border', '1');

	// Create the nice headers
	var rowMainHeader = document.createElement('tr');
	var colMainHeader = document.createElement('td');
	colMainHeader.setAttribute('class', 'mainsubsubheader3');
	colMainHeader.setAttribute('height', '45');
	colMainHeader.setAttribute('width', '725');
	colMainHeader.setAttribute('colspan', '3');
	colMainHeader.innerHTML = 'Previous Thefts';
	rowMainHeader.appendChild(colMainHeader);
	newTable.appendChild(rowMainHeader);
	newTable.innerHTML += '<br />';

	// Call function to create sub header for favorite thefts, get saved theft info, and call
	// function to add table elements for theft data.
	createSubHeader(newTable, "Favorite Thefts", FAVORITES);
	var theftList = getSavedValues(FAVORITES);
	addTheftData(newTable, theftList, FAVORITES);

	// Call function to create sub header for successful thefts, get saved theft info, and call
	// function to add table elements for theft data.
	createSubHeader(newTable, "Successful Thefts", SUCCEEDED);
	theftList = getSavedValues(SUCCEEDED);
	addTheftData(newTable, theftList, SUCCEEDED);

	// Call function to create sub header for failed thefts, get saved theft info, and call
	// function to add table elements for theft data.
	createSubHeader(newTable, "Failed Thefts", FAILED);
	theftList = getSavedValues(FAILED);
	addTheftData(newTable, theftList, FAILED);

	// Put new table into place
	table.appendChild(newTable);
}
else
{
	// Since going straight to the table element was different for premium and non-premium accounts
	// trying to use the <i> tag to get to the spy info.
	var iTags = document.getElementsByTagName('i');
	var theft;
	for(var i=0, l=iTags.length; i<l; i++)
	{
		if(iTags[i].innerHTML[0] == "#")
			theft = iTags[i].innerHTML;
	}

	// Default type to failed test if it has <br> tag if it does (because of xp line) then
	// the theft was a success.
	var theftType = FAILED;
	if(theft.indexOf('<br') != -1)
	{
		theft = theft.substring(0,theft.indexOf('<br'));
		theftType = SUCCEEDED;
	}

	// Get old theft data to see how many we have.
	var theftList = getSavedValues(theftType);

	// If there are none then create a new array.
	if(theftList==""){
		theftList = [];
	}

	// If the list is past the number of thefts we want displayed (default is 5)
	// then remove the first element from the list.
	if(theftList.length >= NUMBER_OF_THEFTS)
	{
		theftList = removeFirstElement(theftList);
	}

	// Add latest theft to the list.
	theftList.push(theft);

	// Save the list.
	saveValues(theftType, theftList);
}