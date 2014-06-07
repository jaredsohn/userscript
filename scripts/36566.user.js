// ==UserScript==
// @name Last Fm Event/Artist Filter
// @namespace tag:URI
// @Description	Remove certain bands/artists from the event list that appear over and over and over again
// @include http://www.last.fm/events*
// @include www.last.fm/events*
// @include last.fm/events*
// @include http://www.last.*/events*
// @include www.last.*/events*
// @include last.*/events*
// @exclude http://www.last.*/events*/+*
// @exclude www.last.*/events*/+*
// @exclude last.*/events*/+*
// @exclude http://www.last.fm/events*/+*
// @exclude www.last.fm/events*/+*
// @exclude last.fm/events*/+*
// ==/UserScript==

//FOR DEBUGGING
if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

var deleteButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0E%08%06%00%00%00%1FH-%D1%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%1CtEXtSoftware%00Adobe%20Fireworks%20CS3%98%D6F%03%00%00%00%15tEXtCreation%20Time%0017%2F5%2F08%8B(%D1%5B%00%00%02%11IDAT(%91%5D%92%BFkSQ%14%C7%3F%F7%BDwmBSkJ%878%D4%1F%85%D2%DAE%A7%0E%0D.%FE%01%1Dj%A7%12p%D0%C5%FF%40%5C%1E%99%5D%04%05qtp%E9b%E68%0A%192%086E%8A%94J!%60K%03%11C%1B%93w%CE%3D.y%A1x%E0L%E7%7C%0E%9F%7B%F9%3A%FE%AB4Mg%00%0F%C4%80%03%04%C8%EA%F5%FAh2%87%C9%20%07%AE%01%05%EF%FDS%E0a%08%E1A%08!R%D5o%AA%FA%25I%92%0F%CE%B9%3F%C0h%0A%A6iZ%88%A2%E8%5E%1C%C7o%CC%AC%1AB%40U%09!%60f%A8*%AA%FA%D59%F7%BCX%2Cv%80%A1K%D34v%CE%DD%89%E3%F8s%08%E1%AE%AA%22%22%A8*f6%ED%C9%B1_%DE%FBG%B3%B3%B3G%110%03%BCP%D5%BBY%96%B1%BA%BA%CA%CA%CA%0A%E3%F1%98%2C%CBXXX%A0Z%AD%E6%E0%CD%E1pX%07f%123%BB%11B%A8%85%10%10%11%CA%E52%1B%1B%1B%0C%87C%CE%CF%CF%A9%D5j%1C%1F%1FO-T%F5%F1%600x%99%88%C8%3AP%C8%15%9B%CD%26Q%14%B1%B3%B3%C3%E5%E5%25ggg4%1A%8D%AB%BA%F1%C5%C5%C5%FDHU%AF%E7%D7%F2%CF888%20%8Ec%E6%E6%E6%D8%DF%DFGD%AE%82%88H91%B3%AE%88L%A1J%A5%C2%EE%EE.%9DN%87%C3%C3C%B6%B7%B7%01h%B7%DBS%DD%24IN%92b%B1%F8%A3%DF%EF%9F%98%D9m3css%93n%B7K%A3%D1%40U%F1%DE%B3%B6%B6F%AB%D5%CA%C1%DE%FC%FC%FC%F7%04%F8kfoE%E4%95%99%B1%B7%B7G%1C%C7S%BDv%BBM%AB%D5%22%CB2D%84(%8A%DE%95J%A5~%1E%80%D2%E9%E9%E9GU%DD2%B3i%FC%F2w%89%08%22%02%D0%5C%5E%5E%AEy%EF%7B%D1dg%B4%B8%B8%F8%CC%CC%5EgY6%1E%8F%C7%8CF%A3i%8B%88%3A%E7%DE%2F--%3D%F1%DE%FF%06%ECjV%23%A0%D0%EB%F5n%0D%06%83-U%5D73%9CsG%A5R%E9S%A5R%F99%C9%A9%02%FC%036%98t%0D%0F%8C%5E%C6%00%00%00%00IEND%AEB%60%82";

//Set the filter and the matching method (only during first time use)
if(GM_getValue('event_filter', null) == null)
	GM_setValue('event_filter', "");
if(GM_getValue('event_filter_matching', null) == null)
	GM_setValue('event_filter_matching', "FULL");
	


//Get event elements
var events=document.evaluate("//td[@class='summary']",document,null,6,null);

//div element containing the Filter and Options tables, and the View/hide filtered link/button
var filterDiv, viewFiltered, filteredList;
createViewFilteredLink();

//Remove artists that are in the filter
filterEventList(true);

//
//Called to filter artist from the Last Fm Events list
//
function filterEventList(add_button){
	for(var x = 0; x < events.snapshotLength; x++){
		var event_element = events.snapshotItem(x);
		var elementHTML = event_element.innerHTML;
		if(elementHTML.search('/event/') != -1){ //this truly is an event element
			var artist;
			if(elementHTML.indexOf('width="34">') != -1)
				artist = elementHTML.substring(elementHTML.indexOf('width="34">')+'width="34">'.length , elementHTML.indexOf("</strong>"));//Parse artist with picture
			else
				artist = elementHTML.substring(elementHTML.indexOf('<strong>')+'<strong>'.length , elementHTML.indexOf("</strong>"));//Parse artist without picture
			if(checkArtist(artist))
				filterArtist(null,event_element);
			else if (add_button)
				addXButton(artist, event_element);
		}
	}
}

//Add X button to events
function addXButton(artist, event_element){
	var elementHTML = event_element.innerHTML;
	var newElement = document.createElement('img');
	newElement.title="Add "+artist+" to the filter";
	newElement.style.cursor = "pointer";
	//newElement.style.width = "3%";
	newElement.src= deleteButton;
	newElement.addEventListener("click", 
	(function(element, artist){ //REMOVE THE Artist/Event and save it in the filter
		return function (e) {
			e.preventDefault();
			var userInput = prompt("Are you sure you want to filter the following artist:",artist);
			if (userInput != '' && userInput != null) {
			 if(typeof filterDiv == 'undefined'){
					createFilteredTable();
					createOptionsTable();
				}
				filterArtist(userInput);
				addToFilterTable(userInput);
				filterEventList(false);
			}
		};
	}) (event_element, artist)
	, false);
	//newElement.innerHTML = '<img title="Add '+artist+' to the filter" style="cursor:pointer;" src="'+deleteButton+'">';
	//newElement.style.width = '3%';
	event_element.insertBefore(newElement, event_element.firstChild);		
}

//
//Check whether the given artist is already in the filter (artist_array)
//
function checkArtist(artist){
	var artists = GM_getValue('event_filter');
	var matching = GM_getValue('event_filter_matching');
	var artist_array = artists.split(",");
	artist = artist.toLowerCase();
	for(var i=0; i < artist_array.length; i++){
		if(matching == 'FULL' && artist_array[i] == artist)
			return true;
		else if (matching == 'PARTIAL' && artist.search(artist_array[i]) != -1)
			return true;
	}
	return false;
}

//artist -  adds the artist to the filter list
//event_element - removes the the entry from the even list. 
//Both are optional
function filterArtist(artist, event_element){
	if(typeof artist != "undefined" && artist != null) {
		var current_artists = GM_getValue('event_filter', "");
		artist = (artist+"").toLowerCase();
		current_artists = (current_artists == "") ? current_artists+artist : current_artists + ","+artist;
		GM_setValue('event_filter', current_artists);
	}
	if (typeof event_element != "undefined" && event_element != null) {
		var parent = event_element.parentNode;
		if(parent != null) 
			if(parent.parentNode != null)
				parent.parentNode.removeChild(parent);
    }
}

//
//Link/Button to display/hide the Filter and Options table
//
function createViewFilteredLink(){
	var eventResults = document.getElementById('eventResults');
	//alert(eventResults.parentNode.className);
	viewFiltered = document.createElement('a');
	viewFiltered.addEventListener("click",toggleFilterDivVis , false);
    viewFiltered.id = 'viewFiltered';
	viewFiltered.className = 'lfmButton lfmBigButton';
	viewFiltered.innerHTML = '<strong>View Filtered Artists</strong>';
	viewFiltered.style.cursor = 'pointer';
	var breakLine = document.createElement('br');
	breakLine.id = 'breakLine';
	eventResults.parentNode.insertBefore(viewFiltered, eventResults);
	document.getElementById('viewFiltered').parentNode.insertBefore(breakLine, document.getElementById('viewFiltered').nextSibling);
}

//
//Filter table showing artist that are already in the filter list
//
function createFilteredTable(){
	filterDiv = document.createElement('div');
	filterDiv.id = 'filterDiv';
	filterDiv.style.display = 'none'; // HIDE
	
	var filterTable = document.createElement('table');
	filterTable.className = 'eventsMedium';
	filterTable.id = "filterTable";
	filterTable.style.width = '40%';
	filterTable.align = 'left';
	filterTable.style.margin = '20px';
	
	var element = document.getElementById('eventResults'); 
	filterDiv.appendChild(filterTable);
	element.parentNode.insertBefore(filterDiv, element); //insert table before the event results
	
    var artists = GM_getValue('event_filter');
	var artist_array = artists.split(",");
	
	artist_array.sort();
	for(var x = 0; x < artist_array.length && artist_array[0] != ""; x++)
		addToFilterTable(artist_array[x]);
}

//
//method to toggle visibility of the div element in which the Filter and the Options Table are.
//
function toggleFilterDivVis()
{	
	if(typeof filterDiv == 'undefined'){
		createFilteredTable();
		createOptionsTable();
	}

	var view = document.getElementById('viewFiltered');
	
	if ( filterDiv.style.display != 'none' )
	{
		view.innerHTML = '<strong>View Filtered Artists</strong>';
		filterDiv.style.display = 'none';
	}
	else
	{
		view.innerHTML = '<strong>Hide Filtered Artists</strong>';
		filterDiv.style.display = '';
	}
}

//
//Adds given artist to the Filter Table
//
function addToFilterTable(artist){
	var filterTable =  document.getElementById('filterTable');
		
	var tr = document.createElement('tr');
	var button_td = document.createElement('td');
	button_td.addEventListener("click", 
	(function(element, artist){ //REMOVE the Artist/Event from the filter table
		return function (e) {
			e.preventDefault();
			if(confirm("Are you sure you want to remove "+artist+" from the filter?"))
				removeArtistFromFilterTable(artist,element);
		};
	}) (tr, artist)
	, false);
	button_td.innerHTML = '<img title="Remove '+artist+' from the filter" style = "cursor:pointer;" src="'+deleteButton+'">';
				
	var artist_td = document.createElement('td');
	//artist.replace(artist.charAt(0),artist.charAt(0).toUpperCase());
	artist_td.innerHTML = artist;
	
	tr.appendChild(artist_td);
	tr.appendChild(button_td);
	filterTable.appendChild(tr);
	
}

//
//Remove the given artist from the filter list and the filter table
//
function removeArtistFromFilterTable(artist, element){
	var artists = GM_getValue('event_filter', null);
	var artist_array = artists.split(",");
	artists = "";
	for(var x = 0; x<artist_array.length ; x++)
		if(artist.toLowerCase() != artist_array[x])
			artists = (artists == "") ? artists+artist_array[x] : artists + ","+artist_array[x];
	element.parentNode.removeChild(element);
	GM_setValue('event_filter', artists); 
}

//
//Create the options table
//
function createOptionsTable(){
	var optionsTable = document.createElement('table');
	optionsTable.className = 'eventsMedium';
	optionsTable.id = "optionsTable";
	optionsTable.align = 'right';
	optionsTable.style.width = '40%';
	optionsTable.style.margin = '20px';
	
	var addCustom_tr = document.createElement('tr');
	var fullMatch_tr = document.createElement('tr');
	var partialMatch_tr = document.createElement('tr');
	
	var fullMatch_radio = document.createElement('input');
	fullMatch_radio.id = 'fullMatch_radio';
	fullMatch_radio.type = 'radio';
	fullMatch_radio.value = 'matching';
	fullMatch_radio.style.cursor = 'pointer';
	fullMatch_radio.addEventListener("click", changeFilterMatching , false);
	
	var partialMatch_radio = document.createElement('input');
	partialMatch_radio.id = 'partialMatch_radio';
	partialMatch_radio.style.cursor = 'pointer';
	partialMatch_radio.type = 'radio';
	partialMatch_radio.value = 'matching';
	partialMatch_radio.addEventListener("click", changeFilterMatching , false);
	
	var matching = GM_getValue('event_filter_matching');
	if(matching == 'FULL')
		fullMatch_radio.checked = true;
	else
		partialMatch_radio.checked = true;
	
	var addCustomFilter = document.createElement('a');
	addCustomFilter.className = 'lfmButton lfmBigButton';
	addCustomFilter.innerHTML = '<strong>Add custom artist filter</strong>';
	addCustomFilter.addEventListener("click",
	function(){ //REMOVE THE Artist/Event and save it in the filter
			var customArtist = prompt("Enter artist name:");
			if(customArtist != null && customArtist != ""){
				filterArtist(customArtist);
				addToFilterTable(customArtist);
			}
	},false);
	
	fullMatch_tr.appendChild(fullMatch_radio);
	fullMatch_tr.appendChild(document.createTextNode('Match full artist name'));
	partialMatch_tr.appendChild(partialMatch_radio);
	partialMatch_tr.appendChild(document.createTextNode('Match partial artist name'));
	addCustom_tr.appendChild(addCustomFilter);	
	optionsTable.appendChild(addCustom_tr);
	optionsTable.appendChild(document.createElement('br'));
	optionsTable.appendChild(document.createElement('br'));
	optionsTable.appendChild(fullMatch_tr);
	optionsTable.appendChild(document.createElement('br'));
	optionsTable.appendChild(partialMatch_tr);
	filterDiv.appendChild(optionsTable);
}

function changeFilterMatching(){
	var matching = GM_getValue('event_filter_matching');
	if(document.getElementById('partialMatch_radio').checked && matching == 'FULL'){
		GM_setValue('event_filter_matching', "PARTIAL");
		document.getElementById('fullMatch_radio').checked = false;
	}
	else{
		GM_setValue('event_filter_matching', "FULL");
		document.getElementById('partialMatch_radio').checked = false;		
	}
	matching = GM_getValue('event_filter_matching');
	GM_log(matching);
}