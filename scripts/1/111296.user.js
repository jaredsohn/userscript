// ==UserScript==
// @name           PRspy player locator
// @namespace      http://www.realitymod.com/
// @description    Adds flag representing player's homeland next to his or her nick name.
// @require        http://www.realitymod.com/prspy/js/jquery-1.3.1.min.js
// @require        http://www.realitymod.com/prspy/js/tablesorter/jquery.tablesorter.min.js
// @include        http://www.realitymod.com/prspy/*
// ==/UserScript==


if ( location.hash == "#/players/viewall/" ) {
    window.setTimeout( wrapper, 500)
}

var sorters = document.getElementsByTagName('table')[1];
var playerList = sorters.getElementsByTagName('tbody')[0];
var sorters = sorters.getElementsByTagName('thead')[0];
var sorters = sorters.getElementsByTagName('tr')[0];

//Create country column  
var countryColumn = document.createElement("th");
countryColumn.setAttribute("title", "Country");
countryColumn.setAttribute("class", "header country headerSortUp");
countryColumn.setAttribute("l10ntitle", "country");
countryColumn.setAttribute("l10n", "countryShort");
countryColumn.innerHTML = "C";

//Hash change listener
window.addEventListener(
'hashchange', 
function(){ window.setTimeout( hashChanged, 500 ); },
true);

//CGIinputCountries
function wrapper() {
    CGIinputCountries(0);
}

function hashChanged() {
    if ( location.hash == "#/players/viewall/" && countriesAdded() ) {
		CGIinputCountries(0);
		return;
	}
	if ( location.hash.match("#/players/server/") != null 
        && countriesAdded() ) {
   	 	
   	 	CGIinputCountries(0);
   	 	return;
   }
   cleanup();
}

function playersButtonClicked() {
    if ( location.hash == "#/players/viewall/" && countriesAdded() ) {
		CGIinputCountries(0);
	}
}

function serversButtonsClicked() {
   if ( location.hash.match("#/players/server/") != null 
        && countriesAdded() ) {
   	 	
   	 	CGIinputCountries(0);
   }
}

//http://www.realitymod.com/prspy/images/factionflags/unknown.gif"
function playerListReady() {
	if ( playerList.getElementsByTagName('td')[0].getAttribute('l10n') == "loading" ) {
		return false;
	} else { 
		return true;
	}
}

function getCountryCode(playerName) {
	for ( var i = 0; i < playersXML.length; i = i + 1 ) {
	     var name1 = playersXML[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		 if ( playerName == name1 ) {
		     return playersXML[i].getElementsByTagName("country")[0].childNodes[0].nodeValue;
		 }
	}
	//Return unknown
    return "unknown"
} 

//Returns html element representing player's country.
function getCountry(name) {
    var countryCode = getCountryCode(name);
    var countryElement = createCountryElement(countryCode);
    return countryElement;
}

var cleanupListener =  function (event) {
    window.setTimeout( cleanup, 500);
}

function dontRunClean() {
	if ( location.hash == "#/players/viewall/" ) {
		return true;
	}
	if ( location.hash.match("#/players/server/") ) {
		return true;
	}
	return false;
}

function cleanup() {
	//Only run cleanup if we have exited view all
	if ( dontRunClean() ) { //Crappy coding is crappy coding.
		return;
	}
	$("#players-list table").trigger("update");
	console.log("removed sorting")
	//alert("Running cleanup! " + location.hash);
	keepGoing = false; //Stop adding flags
	sorters.removeChild(countryColumn);
	document.removeEventListener( 'click', cleanupListener, true);
}

function underlayCountries() {
	sorters.insertBefore(countryColumn, sorters.getElementsByTagName("th")[0]);
    var playerNames = playerList.getElementsByTagName('tr');  
    for ( var i = 0; i < playerNames.length; i = i + 1 ) {
        var playerRow = playerList.getElementsByTagName('tr')[i];  
        //Only underlay if there is nothing.
        if ( playerRow.firstChild.getAttribute("id") != "countryElement" && 
             playerRow.firstChild.getAttribute("id") != "updatingElement" ) {
             
            var updatingElement = document.createElement("td");
            updatingElement.setAttribute("id", "updatingElement");
            updatingElement.innerHTML = "U";
		    playerRow.insertBefore(updatingElement, playerRow.firstChild);
		}
    }
    //Keep adding flags
    keepGoing = true;
  //  document.addEventListener( 'click', cleanupListener, true);
  	window.addEventListener('hashchange', cleanupListener, true);
}  

//Returns true if countries have already been added
function countriesAdded() {
    var added = playerList.getElementsByTagName("img").length;
    if ( added > 0 ) {
        return true;
    }
    return false; 
}

function addToCache(name,countryCode) {
	localStorage.setItem(name, countryCode);
}

function getFromCache(name) {
	return localStorage.getItem(name);
}

function addSorter() {
	console.log("Adding sorting")
    $("#players-list table").trigger("update"); //rebuilds the tablesorter data cache 
	//Reapply sorters when finished
	$("#players-list table").tablesorter({
		headers: {
			5: {
    			sorter: 'digit'
			}
		}
	})
}

function createCountryElement(countryCode) {
    countryCode = countryCode.toLowerCase();
    //Yugoslavia is now Serbia and Montenegro
    if ( countryCode == "yu" ){
    	countryCode = "cs";
    } 
    var countryImage = document.createElement("img");
    if ( countryCode == "unknown" ) {
        countryImage.setAttribute("src", "images/factionflags/unknown.gif");
    } else {
        countryImage.setAttribute("src", "images/countryflags/" + countryCode.toLowerCase() + ".gif");
    }
    countryImage.setAttribute("alt", countryCode.toUpperCase());
    countryImage.setAttribute("title", countryCode.toUpperCase());
    countryElement = document.createElement("td");
    countryElement.setAttribute("id", "countryElement" );
    countryElement.appendChild(countryImage);
    return countryElement;
}

var countryCache = new Array();
var keepGoing = false;
function CGIinputCountries(playersAdded) {
    if ( playersAdded == 0 ) { //At first add the column
        underlayCountries();
    }
    //Parse Playernames
    var playerNames = playerList.getElementsByTagName('tr');
	var name = playerNames[playersAdded].getAttribute('playerid');
    var playerRow = playerList.getElementsByTagName('tr')[playersAdded];
    //Recursive add
    if ( getFromCache(name) == null ) {
    	//Not found in the cache!
    	GM_xmlhttpRequest({
        	method: "GET",
        	url: "http://www.students.tut.fi/cgi-bin/run/haikion/searchPlayer.py?name=" + name,
        	onload: function(response) {
            	//Get country from the response
            	var responseText = response.responseText;
	        	var parser = new DOMParser();
		        var playerXML = parser.parseFromString(responseText,"text/xml");
	            var playerDom = playerXML.getElementsByTagName("player")[0];
	            var countryCode = playerDom.getElementsByTagName("country")[0].childNodes[0].nodeValue;
	            //Add to cache
			    addToCache(name,countryCode);
			    console.log("added %s to cache",name); //FireBug debugging
	            countryElement = createCountryElement(countryCode);
	            //Input country 
	            //Remove overlay and replace it with countryElement
			    playerRow.replaceChild(countryElement,playerRow.firstChild);
			    //increase counter 
			    playersAdded = playersAdded + 1;
			    //Are they all added ?
			    if ( playersAdded < playerNames.length && keepGoing ) {
			        //No, add more!
			        CGIinputCountries(playersAdded);
			    }
			    else {
					addSorter();
			    }	
	        }
	    });
	}
	else {
		countryCode = getFromCache(name);
		console.log("fetched %s from cache", name); //FireBug debugging
		countryElement = createCountryElement(countryCode);
		playerRow.replaceChild(countryElement,playerRow.firstChild);
		playersAdded = playersAdded + 1;
		//Are they all added ?
		if ( playersAdded < playerNames.length && keepGoing ) {
			//No, add more!
			CGIinputCountries(playersAdded);
		}
		else  {
			addSorter();
		}
	}
}




    
