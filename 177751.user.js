// ==UserScript==
// @name           Passive Scouter
// @namespace      tag:rex.brooks@gmail.com,2011-04-17:Scouter
// @description    Passively injects scouting data to the wiki
// @include        http://*.chosenspace.com/index.php*
// ==/UserScript==
//
// Copyright (C) 2011 Rozz
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var inGame = null;
var newGrid = null;
var moveView = null;
var outpostPresent = null;
var roidPresent = null;
var scanPresent = null;
var mapView = null;

// This function requets a modification token from the wiki, then runs the modification on the wiki
function runRequest(request, data) {
	GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.allianceofavalon.freeiz.com/wiki/api.php?",
			data: request,
			headers: {
				"User-Agent": "Greasemonkey",
				"Accept": "xml",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				GM_log("http://www.allianceofavalon.freeiz.com/wiki/api.php?" + request);
				GM_log(response.responseText);
				haveToken = false;
				index = response.responseText.search("error code");
				if(index != -1) {
					error = response.responseText.slice(index);
					error = error.split('"')[1];
					if(error == "editconflict") {
						// This error throws during multiple uploads to the same page in quick succession
						// and while undesireable, the best option is to abort the upload
						return;
					}
					else {
						error = "Wiki error code = " + error; 
						//alert(error);
						return;
					}
				}
				
				// Extract deleted pages if need be
				if (request.search("templates")) {
					parseArray = response.responseText.split("<page ");
					parseData = "";
					i = 0;
					for (i = 0; i < parseArray.length; i++) {
						if (!(parseArray[i].match("Template:Delete"))) {
							parseData += parseArray[i];
						}
					}
					response.responseText = parseData;
				}
				
				// See if this is an asteroid to delete
				if (request.search("Category:")) {
					index = response.responseText.search(" timestamp");
					if (index != -1) {
						time = response.responseText.slice(index);
						time = time.split('"')[1];
						currentTime = new Date().getTime();
						currentTime = new Date(currentTime);
						roidLife = new Date(time);
						roidLife = currentTime - roidLife;
						//GM_log(roidLife);
						if (roidLife < 172723456) {
							//GM_log("Dont delete the roid");
							return;
						}
						//GM_log("Delete the roid");
					}
				}
				
				// Extract the token and build the command
				index = response.responseText.search("token");
				if (index != -1) {
					token = response.responseText.slice(index);
					token = token.split('"')[1];
					index = response.responseText.search("title");
					title = response.responseText.slice(index);
					title = title.split('"')[1];
					data += "&token=" + encodeURIComponent(token) + "&title=" + encodeURIComponent(title);
					haveToken = true;
				}
				
				if (haveToken) {
					modifySection(data);
				}
				
				function modifySection(mod) {
					GM_xmlhttpRequest({
						method: "POST",
						url: "http://www.allianceofavalon.freeiz.com/wiki/api.php?",
						data: mod,
						headers: {
							"User-Agent": "Greasemonkey",
							"Accept": "xml",
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload: function(response) {
							GM_log("http://www.allianceofavalon.freeiz.com/wiki/api.php?" + mod);
							GM_log(response.responseText);
							index = response.responseText.search("error code")
							if(index != -1) {
								error = response.responseText.slice(index);
								error = error.split('"')[1];
								if(error == "editconflict") {
									// This error throws during multiple uploads to the same page in quick succession
									// and while undesireable, the best option is to abort the upload
									return;
								}
								else {
									error = "Wiki error code = " + error; 
									//alert(error);
									return;
								}
							}
							
							// Wiki Page has now been updated
						}
					});
				}
			}
	});		
}

// Deletes a page that is part of the delete template (success only for wiki admins)
function deletePage () {
	queryURL = "action=query&bot=true&format=xml&generator=embeddedin&geititle=Template:Delete&geilimit=1&prop=info&intoken=delete";
	futureData = "action=delete&";
	futureData += "format=xml&";
	futureData += "bot=true";
	runRequest(queryURL, futureData);
}

// Adds the delete template to the passed page (non-admin wiki users don't have delete permission)
function markPage (page) {
	page = encodeURIComponent(page);
	queryURL = "action=query&bot=true&prop=info|templates&intoken=edit&format=xml&generator=search&gsrlimit=500&gsrsearch=" + page;
	roidData = "{{Delete}}";
	roidData = encodeURIComponent(roidData);
	futureData = "action=edit&";
	futureData += "format=xml&";
	futureData += "bot=true&";
	futureData += "recreate=true&";
	futureData += "text=" + roidData;
	runRequest(queryURL, futureData);
}

// Also attempts to delete the oldest asteroid if it is too old
function purgeRoid () {
	queryURL = "action=query&prop=info|categories&intoken=edit&clprop=timestamp&cllimit=1&format=xml&generator=categorymembers&gcmsort=timestamp&gcmtitle=Category:Asteroid&gcmlimit=1";
	roidData = "{{Delete}}";
	roidData = encodeURIComponent(roidData);
	futureData = "action=edit&";
	futureData += "format=xml&";
	futureData += "bot=true&";
	futureData += "recreate=true&";
	futureData += "text=" + roidData;
	runRequest(queryURL, futureData);
}

// Cleans out pages using old names
// This is an admin function used only when needed
function purgePage () {
	page = "\"Starbase (Trade) (?????)\"";
	queryURL = "action=query&bot=true&prop=info|templates&intoken=edit&format=xml&generator=search&gsrlimit=500&gsrsearch=" + page;
	roidData = "{{Delete}}";
	roidData = encodeURIComponent(roidData);
	futureData = "action=edit&";
	futureData += "format=xml&";
	futureData += "bot=true&";
	futureData += "recreate=true&";
	futureData += "text=" + roidData;
	runRequest(queryURL, futureData);
}

/*
This code builds the current location based off of the sector view button.
If it fails, we havn't even gotten to the game screen yet.
*/
try {
	roidID = document.getElementsByTagName("INPUT")[16].getAttribute("ONCLICK");
	roidGd = roidID.split("&")[3];
	roidGd = roidGd.split("=")[1];
	roidGd = roidGd.split("'")[0];
	roidSc = roidID.split("&")[2];
	roidSc = roidSc.split("=")[1];
	roidSy = roidID.split("&")[1];
	roidSy = roidSy.split("=")[1];
	roidID = "S" + roidSy + "-S" + roidSc + "-G" + roidGd;
	//GM_log(roidID);
	inGame = true;
	
	try {
		checkGrid = GM_getValue("currentGrid");
		if (checkGrid == roidID) {
			newGrid = false;
			//GM_log("Did not move");
		}
		else {
			newGrid = true;
		}
	}
	catch(err) {
		newGrid = true;
	}
	
	GM_setValue("currentGrid", roidID);
}
catch(err) { 
	// Fail gracefully
	inGame = false;
}

/* 
Since the location is displayed on both the sector view and the proposed move screen
this try block looks to see if the Light Speed button is on the page.  If the button
is there we know it is a movement screen and shouldn't look for an outpost/asteroid.
*/ 
if (inGame) {
	try {
		moveView = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[3].lastChild.firstChild.firstChild.firstChild.textContent;
		//GM_log("View of Proposed Jump");
		moveView = true;
	}
	catch(err){
		moveView = false;
	}
}

/*
Just beneath the map screen is a string displaying either our current location or a proposed 
movement location.  The above code ensures that we aren't looking at a movement screen.  This code
attempts to parse the location string to see if we are actually looking at a sector view.  If it
fails, we are looking at some other screen.  If it succeeds, we are in sector view looking at our
current location.
*/
if (!(moveView)) {
	try {
		sectorView = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.firstChild.firstChild.firstChild.nodeValue;
		grid = sectorView.split("-")[2];
		grid = grid.slice(1);
		sector = sectorView.split("-")[1];
		sector = sector.slice(1, sector.length-1);
		system = sectorView.split("-")[0];
		system = system.slice(0, system.length-1);
		GM_setValue("roidSys" + roidID, system);
		GM_setValue("roidSec" + roidID, sector);
		GM_setValue("roidView" + roidID, sectorView);
		mapView = true;
	}
	catch(err) {
		mapView = false;
		//GM_log("Not a Map View");
	}
}

/*
This secton of code checks to see if extraction of our current location was successful and that we are
actually looking at our current sector view.  If we are, it tries to extract details for any outpost
in the current grid.  If that fails, we know there is no outpost there.
*/
if (mapView) {
	try {
		opName = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[3].firstChild.firstChild.nodeValue;
		//GM_log(opName);
		opType = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[5].nodeValue;
		opType = opType.slice(3, opType.length-13); // parse out outpost type
		//GM_log(opType); 
		opOwner = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[11].firstChild.nodeValue;
		//GM_log(opOwner);
		opID = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[3].firstChild.getAttribute("href");
		opID = opID.split("=")[2];
		//GM_log(opID);
		outpostPresent = true;
		//GM_log("Outpost Found");
	}
	catch(err) {
		outpostPresent = false;
	}
	try {
		opFaction = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[14].firstChild.nodeValue;
	}
	catch(err) {
		opFaction = "No Faction";
	}
}

/*
If there's no outpost at the grid, then this section checks to see if there is an asteroid present.
If there is, then it extracts all the roid details that it can.
*/
if (mapView && !(outpostPresent)) {
	try {
		isAsteroid = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[2].nodeValue;
		if (isAsteroid == "\nAsteroid") {
			roidType = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[5].firstChild.nodeValue;
			roidSize = document.body.firstChild.lastChild.childNodes[6].firstChild.childNodes[1].lastChild.childNodes[4].firstChild.childNodes[7].nodeValue;			
			roidSize = roidSize.slice(1, roidSize.length); //remove new line
			GM_setValue("roidType" + roidID, roidType);
			GM_setValue("roidSize" + roidID, roidSize);
			//GM_log(roidType + " " + roidSize);
			roidPresent = true;
			// Take this opportunity to purge an old asteroid
			purgeRoid();
			// Take this opportunity to delete a page if you are a wiki admin
			deletePage();
		}
		else {
			throw 1;
		}
	}
	catch(err) {
		// There is no oupost or roid at the current grid, so its safe to delete any page with this location
		roidPresent = false;
		//GM_log("No Asteroid or Outpost at Current Grid");
		
	}
}

/*
Similar to the above code, but this code check to see if we have actually scanned an asteroid.  It
will only execute if there is no outpost, and will pull out the entire scan for upload.  Again,
since asteroids don't have IDs like ships do, we extract the grid for ident.
*/
if (!(mapView)) {
	try {
		roidScan = document.body.firstChild.lastChild.childNodes[4].firstChild.childNodes[1].lastChild.firstChild.firstChild.firstChild.nodeValue;
		if(roidScan == "\nScan Asteroid") {
			roidScan = document.body.firstChild.lastChild.childNodes[4].firstChild.childNodes[1].lastChild.firstChild.firstChild.innerHTML;
			//GM_log(roidScan);
			a = 1; b = 0;
			while (b != -1) {
				roidScan = roidScan.substring(0, a-1) + roidScan.substring(b+1, roidScan.length);
				a = roidScan.indexOf("<") + 1;
				b = roidScan.indexOf(">");
			}
			roidScan = roidScan.substring(0, roidScan.search("Asteroid Core") + 13);
			roidScan = "\n" + roidScan.replace(/\n/g, "\n\n");
			scanPresent = true;
			//GM_log(roidScan);
		}
		else {
			// String was captured, but it didn't say "Scan Asteroid"
			throw 1;
		}
	}
	catch(err) {
		// String that normally displays "Scan Asteroid" was not present
		scanPresent = false;
		//GM_log("Not a Roid Scan");
	}
}

/*
If there is no outpost or asteroid at the current grid, then it is safe to
delete any page for the current location.  This code deletes the page.
*/
if (mapView && !(outpostPresent) && !(roidPresent) && newGrid) {

	// Delete the page for the current grid since it is empty
	markPage("\"*(" + roidID + ")\"");
}
	
/*
If there is an outpost at our current grid, then we attempt to inject the details of the outpost
into our wiki.
*/
if (outpostPresent && newGrid) {
	try{
		// First we build the contents of the page
		if (roidSy == 150 || roidSy == 153 || roidSy == 168 || roidSy == 172 || roidSy == 189 || roidSy == 190 || roidSy == 192 || roidSy == 208 || roidSy == 211 || roidSy == 213 || roidSy == 228 || roidSy == 230 || roidSy == 232 || roidSy == 249 || roidSy == 251 || roidSy == 253) {
			sysName = system.split(" ")[0];
			sysName = "System " + roidSy + " (" + sysName + ")";
		}
		else {
			sysName = "System " + roidSy;
		}
		opData = "==<span style=\"color:green;\">Outpost Details</span>==\n";
		opData += "[[Category:Outpost]]\n";
		opData += ";Type:\n";
		opData += ":"+ opType +"\n";
		opData += "[[Category:" + opType + "]]\n";
		opData += ";Name:\n";
		opData += ":"+ opName +"\n";
		opData += ";Owner:\n";
		opData += ":"+ opOwner +"\n";
		opData += "[[Category:" + opOwner + "]]\n";
		opData += ";Faction:\n";
		opData += ":"+ opFaction +"\n";
		opData += "[[Category:" + opFaction + "]]\n";
		opData += ";Location:\n";
		opData += ":"+ sectorView +"\n";
		opData += "[[Category:" + sysName + "]]\n";
		opData += "[[Category:" + sysName + " - " + sector + "]]\n\n";
		opData += "<span style=\"color:green;\"><small><i>Powered by Passive Scouter\n</i></small></span>";
		opData = encodeURIComponent(opData);
		
		// Next we build the page name for the outpost
		opType = encodeURIComponent(opType);
		roidID = " (" + roidID + ")";
		roidID = encodeURIComponent(roidID);
		opPage = opType + roidID;
		
		// Next we build the wiki query that will return an edit token
		queryURL = "action=query&prop=info&intoken=edit&format=xml&titles=" + opPage;
		
		// Finally we build the data that will be submitted with our wiki edit
		futureData = "action=edit&";
		futureData += "format=xml&";
		futureData += "bot=true&";
		futureData += "recreate=true&";
		futureData += "text=" + opData;
	
		// The data is pased to the wiki upload function
		runRequest(queryURL, futureData);
	}
	catch(err){
		//GM_log("Error Uploading Outpost");
		// Error handling is covered in the wiki request function
	}
}

/*
If there is an asteroid at our current grid, then we attempt to inject the details of the asteroid
into our wiki.
*/
if (scanPresent) {
	try{
		// First we build the contents of the page
		//GM_log("Preparing to fetch grid info");
		
		system = GM_getValue("roidSys" + roidID);
		sector = GM_getValue("roidSec" + roidID);
		sectorView = GM_getValue("roidView" + roidID);
		GM_deleteValue("roidSys" + roidID);
		GM_deleteValue("roidSec" + roidID);
		GM_deleteValue("roidView" + roidID);
		//GM_log(roidSy);
		
		if (roidSy == 150 || roidSy == 153 || roidSy == 168 || roidSy == 172 || roidSy == 189 || roidSy == 190 || roidSy == 192 || roidSy == 208 || roidSy == 211 || roidSy == 213 || roidSy == 228 || roidSy == 230 || roidSy == 232 || roidSy == 249 || roidSy == 251 || roidSy == 253) {
			sysName = system.split(" ")[0];
			sysName = "System " + roidSy + " (" + sysName + ")";
		}
		else {
			sysName = "System " + roidSy;
		}
		
		//GM_log("Preparing to fetch asteroid info");
		roidType = GM_getValue("roidType" + roidID);
		roidSize = GM_getValue("roidSize" + roidID);
		GM_deleteValue("roidType" + roidID);
		GM_deleteValue("roidSize" + roidID);
		//GM_log(roidType + roidSize);
		
		roidData = "==<span style=\"color:green;\">Asteroid Details</span>==\n";
		roidData += "[[Category:Asteroid]]\n";
		roidData += ";Type:\n";
		roidData += ":"+ roidType +"\n";
		roidData += "[[Category:" + roidType + "]]\n";
		roidData += ";Size:\n";
		roidData += ":"+ roidSize +"\n";
		roidData += ";Location:\n";
		roidData += ":"+ sectorView +"\n";
		roidData += "[[Category:" + sysName + "]]\n";
		roidData += "[[Category:" + sysName + " - " + sector + "]]\n";
		roidData += ";Scan:\n";
		roidData += ":"+ roidScan +"\n\n";
		roidData += "<span style=\"color:green;\"><small><i>Powered by Passive Scouter\n</i></small></span>";
		roidData = encodeURIComponent(roidData);
		//GM_log(roidData);
		
		// Next we build the page name for the asteroid
		roidType = encodeURIComponent(roidType);
		roidID = " (" + roidID + ")";
		roidID = encodeURIComponent(roidID);
		roidPage = roidType + roidID;
		
		// Next we build the wiki query that will return an edit token
		queryURL = "action=query&prop=info&intoken=edit&format=xml&titles=" + roidPage;
		
		// Finally we build the data that will be submitted with our wiki edit
		futureData = "action=edit&";
		futureData += "format=xml&";
		futureData += "bot=true&";
		futureData += "recreate=true&";
		futureData += "text=" + roidData;
		
		// The data is pased to the wiki upload function
		runRequest(queryURL, futureData);
	}
	catch(err){
		//GM_log("Error Uploading Asteroid");
	}
}


