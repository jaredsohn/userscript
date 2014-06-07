// ==UserScript==
// @name           Starfleet Commander Auto-Mission
// @namespace      dlm.net/sc
// @description    Allow configuring automatic starts of Starfleet Commander missions.
// @include        http://starfleet-fb-vip1.bluefrogsrv.com/*
// ==/UserScript==
//
//
// Daren M.
//
//	Facebook Starfleet Commander Script
//	Started 12/4/09
//	Do not modify or reproduce without permission from the author.
// 
// more features comming soon
// Less detectable script
// 
//
// TBD:
//	- More configuration options.
//	- Prettier links.
//

var running=true;
var mpMissions = [];
var OptionBatch = [];
var MissionBatch=[];
var csTryAgain = "try again later";
var csUpdating = "updating";
var csReturningFrom = "Returning from";
var ciTryAgain_MaxCount = 5;
var miNoActiveMissionsCount = 0;
var ciScanDelay_msecs = 10000;
var ciStartScan_WaitCount = 0;

// These constants define a range of times that the MainLoop must be called before the StartScan routine is fired.
// This is an attempt to randomize activity to avoid angering the game-gods.
var ciStartScan_MinLoopDelay = 3;	
var ciStartScan_MaxLoopDelay = 30;

function MissionProp(mission_planet, mission_key, mission_title, auto_start_limit, click_text, status_ready, batch) {
	this.mission_planet = mission_planet;  // used when saving/loading array
	this.mission_key = mission_key;
	this.mission_title = mission_title;
	this.auto_start_limit = auto_start_limit;
	this.running_count = 0;
	this.status_ready = status_ready;
	this.batch = batch;  // Batch size
	this.onclick_text = click_text;
	this.try_again_count = 0;				// used for counting times "try again later" message is shown.
	//this.start_order = start_order; // (future?) Higher numbers get started first.
}

// Not needed at this time.
/* function SaveAllMissions() {
	for(var i=0; i<mpMissions[i].length; i++) {
		var thisMission = mpMissions[i];
		var id = 'P'+thisMission.mission_planet+'.K'+thisMission.mission_key;
		
		// Only property we need to save is the Start Limit for each mission.
		GM_setValue(id+'.SL', thisMission.auto_start_limit);
	}
}
*/

//==============================================
//	Persist the Auto-Start Limit for a given Mission
//==============================================
function SaveMission(thisMission) {
	if (thisMission) {
		// A mission is identified by both the source Planet and the Mission Key.
		var id = 'P'+thisMission.mission_planet+'.K'+thisMission.mission_key;
		
		// Only property we need to save is the Start Limit for each mission.
		GM_setValue(id+'.SL', thisMission.auto_start_limit);
	}
}

//==============================================
//	Restore the Auto-Start Limit for a given Mission
//==============================================
function LoadMissionStartLimit(mission_planet, mission_key) {
	// A mission is identified by both the source Planet and the Mission Key.
	var id = 'P'+mission_planet+'.K'+mission_key;
	
	return GM_getValue(id+'.SL', 0);
}

//==============================================
//	Execute text as if it were clicked in hyper-link
//	Author: sizzlemctwizzle at userscripts.org
//==============================================
function addScript(js) {
// Inject a script into the page
// 	Usage: Execute the onclick javascript of someNode: addScript(someNode.getAttribute(‘onclick’));
//==============================================
	var body = document.body, script = document.createElement('script');
	if (!body) {return}
	script.type = 'text/javascript';
	try {script.innerHTML = js}
	catch(x) {script.innerText = js}
	body.appendChild(script);
}

//==============================================
//	Perform a click on an element in a document
// 	Author: JoeSimmons (userscripts.org)
//==============================================
function click(e, type) {
// Syntax: click(element); 
// String argument will grab it by id, or you can supply an element
//==============================================
	if(!e && typeof e=='string') e=document.getElementById(e);
	if(!e) {return;}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
}

//========================================================
function makeElement(type, appendto, attributes, checked, chkdefault) {
//=================================================================
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

//========================================================
// Remove whitespace from start and end of string.
//========================================================
function trim(s){
//============================
	if((s==null)||(typeof(s)!='string')||!s.length)
		return '';
	return s.replace(/^\s+/,'').replace(/\s+$/,'')
}

//===================================================
//	Return the Planet ID from the onclick string
//===================================================
function ExtractPlanetID(string1) {
//===================================================
	// Find and return the number in the given string bracketed by search
	// strings 1 and 3.
	var search1 ="current_planet=";
	var search2 ="&";
	var search3 ="=";

	var string2 =string1.substr( string1.indexOf(search1));
	var string3 =string2.substr( 0, string2.indexOf(search2));
	var string4 =string3.substr( string3.indexOf(search3)+1);
	
	return string4;
}

//========================================================
// Search for element in Missions array by the Mission Key.
//========================================================
function FindMissionByKey(searchKey) {
//==============================================================
	for (var i=0; i< mpMissions.length; i++) {
		//GM_log("    -> " + mpMissions[i].mission_key);
		
		if(mpMissions[i].mission_key == searchKey) {
			//GM_log("Found key "+searchKey + " in array.");
			return mpMissions[i];
		}
	}
	return ;
}

//========================================================
// Search for element in Missions array by the Mission Key.
//========================================================
function FindMissionByMaxKey(searchKey) {
//==============================================================
	for (var i=0; i< mpMissions.length; i++) {
		//GM_log("    -> " + mpMissions[i].batch);
		
		if(mpMissions[i].batch == searchKey) {
			//GM_log("Found key "+searchKey + " in array.");
			return mpMissions[i];
		}
	}
	return ;
}

//========================================================
// Search for element in Missions array by the Mission Title.
//========================================================
function FindMissionByTitle(searchKey) {
//==============================================================
	for (var i=0; i< mpMissions.length; i++) {
		if(mpMissions[i].mission_title == searchKey) {
			return mpMissions[i];
		}
	}
	return ;
}
//==================================================
// Function Added Compiled to the real script
// Batch select
//==================================================
// Function Added Tomorrow Page Change
//========================================================
//
//	Main Routine Logic called periodically by SetTimeout()
//
//========================================================
function MainLoop() {
//============================================
//	If on the Missions Page,
//		Clear status_ready properties for all missions in Array.
// 		Loop through all missions found on page.
//			Set Mission.status_ready property if an enabled Start mission button found.
//			If no corresponding object in the Missions Array is found, create a new one.
// 			Create Links for Inc/Dec Limits and Auto-Start 
// 		Update running_count properties based on currently running missions.
//		Start the first mission that meets auto-start conditions.
//============================================

	//
	// Are we on the Missions page?
	//
	var bOnMissionsPage = false;
	var missionshdr=document.evaluate("//div[@id='content' and @class='missions index']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(missionshdr.snapshotLength > 0) {
		// On missions page.
		bOnMissionsPage = true;
	}
	
	if (bOnMissionsPage) {
		//
		// Clear all status_ready properties for all missions.
		//
		for (var x=0; x < mpMissions.length; x++) {
			mpMissions[x].status_ready = false;
		}
		
		//
		// Loop through all missions found on page.
		//
		var missions=document.evaluate("//tr[@class='mission item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		//GM_log("Missions="+missions.snapshotLength);
		
		for (var m=0; m<missions.snapshotLength; m++) {
			var elmMission = missions.snapshotItem(m);
			var newID = 'btnAutoStart_'+ elmMission.id;
			var isReady = false;
				
			// Only parse children of Mission Node to find the enabled button.
			// Look for Actions / Select_Fleet / Enabled object that does not contain a "style" attribute.
			var elmAction=document.evaluate(".//td[@class='actions']/div[contains(@id,'select_fleet')]//span[@class='enabled' and not(@style)]", elmMission, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
			if (elmAction.snapshotLength > 0) {
				//
				// Found an Enabled Start button for a mission.
				//
				isReady = true;
			}

			// Is mission in array already?
			var pMission = FindMissionByKey(newID);
			if (pMission) { //	Mission is in Array. Update isReady property.

				//
				pMission.status_ready = isReady;
			}
			else { //	Mission is not in Array. Add it.
				//
				// Get name of mission.
				var elmMissionName=document.evaluate(".//div[@class='name']", elmMission, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var newName = trim(elmMissionName.snapshotItem(0).textContent);
				// Get onclick attribute from link that will be used to start mission.
				//[contains(@onclick, 'select_mission')]
				var ssMissionLinks=document.evaluate(".//a", elmMission, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for(var i=0; i<ssMissionLinks.snapshotLength; i++) {
					var elmMissionLink = ssMissionLinks.snapshotItem(i);
					var click_text = trim(elmMissionLink.getAttribute("onclick"));
					if (click_text.indexOf("missions/start_mission")>0) {
						break;
					}
					else {
						click_text = "";
					}
				}
				//GM_log("onclick): "+click_text);

				// The planet ID is contained in the onclick text.
				var newPlanet = ExtractPlanetID(click_text);

				// Now that the Planet and Mission ID's are known, load the last stored Start Limit.
				var newStartLimit = LoadMissionStartLimit(newPlanet, newID);

				//
				// Create new Mission element and add to array
				//
				pMission = new MissionProp(newPlanet, newID, newName, newStartLimit, click_text, isReady);
				mpMissions.push(pMission);
			}

			//
			// Create Links for Inc/Dec Auto-Start Limits
			//
			// Regardless of whether Mission is in Array already or not, need 
			// to create an Auto-Start link if it does not exist.
			//
			if (document.getElementById(newID)) {
				// Already added. Do nothing.
			}
			else { 
				// 
				//	Need to add button(s) according to the following logic:
				//
				//	1) If auto_start_limit == 0, add "Auto-Start" link.
				//	2) If auto_start_limit > 0, add a label for current limit and 
				//		a link for Increment and a link for Decrement.
				//
				var selectFleet=document.evaluate(".//div[contains(@id,'select_fleet')]", elmMission, null, 9, null).singleNodeValue;
				if (selectFleet) {
					// Show an Inc button.
					var elt = makeElement('a', null, {'id':newID, 'href':'#'});
					if (pMission.auto_start_limit > 0) {
						elt.appendChild(document.createTextNode('<+ to '+(pMission.auto_start_limit+1)+'>'));
					} else {
						elt.appendChild(document.createTextNode('Start'));
					}
					elt.addEventListener("click", IncAutoStart, false);
					selectFleet.insertBefore(elt, selectFleet.firstChild);

					if (pMission.auto_start_limit > 0) {
						// Show a Dec button.
						var elt = makeElement('a', null, {'id':newID, 'href':'#'});
						if (pMission.auto_start_limit > 1) {
							elt.appendChild(document.createTextNode('<- to '+(pMission.auto_start_limit-1)+'>'));
						} else {
							elt.appendChild(document.createTextNode('<C>'));
						}
						elt.addEventListener("click", DecAutoStart, false);
						selectFleet.insertBefore(elt, selectFleet.firstChild);
					}

/*					// Test button.
					var elt = makeElement('a', null, {'id':'test link', 'href':'#'});
					elt.appendChild(document.createTextNode('<Test Click>'));
					elt.addEventListener("click", TestAutoClick, false);
					selectFleet.insertBefore(elt, selectFleet.firstChild);
*/
				}
			}
		} // end loop through mission items
		
		//
		// Determine what missions are currently running.
		//
		UpdateRunningCounts();

		//
		//	Attempted Obfuscation: Do not Start Missions every time
		//
		if (--ciStartScan_WaitCount <= 0) {
			//GM_log("Starting Next Mission...");
			
			// 
			//	Launch the first mission that qualifies.
			//
			StartFirstQualifyingMission();
		
			// This number is used as the number of times to skip calling the Start...Mission routine above.
			// The result is hopefully less detectible as a script clicking the links.
			ciStartScan_WaitCount = Math.floor(Math.random() * (ciStartScan_MaxLoopDelay - ciStartScan_MinLoopDelay) + (Math.floor(Math.random()ciStartScan_MinLoopDelay));
			//GM_log("Wait " + ciStartScan_WaitCount + "x before starting Missions");
		}
		else {
			//GM_log("waiting " + ciStartScan_WaitCount + " more times before starting Missions...");
		}
	} // end on missions page

	window.setTimeout(MainLoop, Math.floor(Math.random() *ciScanDelay_msecs));
}

//========================================================
// Increase the auto_start_limit property for a mission.
//========================================================
function IncAutoStart() {
//========================================================
// Increase the auto_start_limit property of the Mission object identified in the
//	Missions Array by the calling object's ID. Then, remove the given element from
//	the document as well as the <Dec by x> link that shares the same ID. This is 
//  to ensure that the MainLoop() routine will force those links to be properly
//  updated by recreating them.
//
// Called by: <Inc by x> html link added to page by MainLoop().
//========================================================
	var pMission = FindMissionByKey(this.id);
	
	if (pMission) {
		pMission.auto_start_limit++;

		GM_log("Incrementing auto_start flag for: "+this.id + " (" + pMission.mission_title + ") New limit = " + pMission.auto_start_limit);
		
		// Since a change to auto_start_limit property has been made, persist the new value.
		SaveMission(pMission);
		
		//Remove link, so that it will definitely be recreated during the next call to "MainLoop"
		this.parentNode.removeChild(this);
		
		var elm = (document.getElementById(this.id));
		if (elm) elm.parentNode.removeChild(elm);
	}
}

//========================================================
// Decrease the auto_start_limit property for a mission.
//========================================================
function DecAutoStart() {
//========================================================
// Decrease the auto_start_limit property of the Mission object identified in the
//	Missions Array by the calling object's ID. Then, remove the given element from
//	the document as well as the <Inc by x> link that shares the same ID. This is 
//  to ensure that the MainLoop() routine will force those links to be properly
//  updated by recreating them.
//
// Called by: <Dec by x> html link added to page by MainLoop().
//========================================================
	var pMission = FindMissionByKey(this.id);
	
	if (pMission) {
		pMission.auto_start_limit = (pMission.auto_start_limit > 0) ? (pMission.auto_start_limit-1) : 0;
		
		GM_log("Incrementing auto_start flag for: "+this.id + " (" + pMission.mission_title + ") New limit = " + pMission.auto_start_limit);
		
		// Since a change to auto_start_limit property has been made, persist the new value.
		SaveMission(pMission);
		
		//Remove link, so that it will definitely be recreated during the next call to "MainLoop"
		this.parentNode.removeChild(this);
		
		var elm = (document.getElementById(this.id));
		if (elm) elm.parentNode.removeChild(elm);
	}
}

//=======================================================
// Determine what missions are currently running.
//=======================================================
function UpdateRunningCounts() {
//=======================================================
//	The Table identified by the ID "tasks" contains a row for each Mission that
//	is currently in progress. Update the running_count property of each 
//	mission in the Missions Array that matches the Mission caption.
//
//	Special consideration is given for missions that have a quantity multiplier assigned.
//
//	The text located in the progress bar will be examined. If it contains "try again later",
//	or "updating" then it will NOT be included in the count. If one of these messages is 
//	found on 2 consecutive calls to this routine, then the Missions link on this page will 
//	be clicked in order to refresh the page.
//
//	If no missions are in the list of active missions, but there is at least one mission in 
//	the array, then the page will need to periodically need to be refreshed. Otherwise, the
//	mission Start buttons will never be re-enabled. This can happen if all fleets are being
//  used on another browser window or another planet.
//
//=======================================================
	//
	// Clear all running counts for all missions.
	//
	for (var x=0; x < mpMissions.length; x++) {
		mpMissions[x].running_count = 0;
	}
	
	var pMission;
	var iQty;
	
	// Find the Tasks Table
	var ssTaskTable=document.evaluate("//table[@id='tasks']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(ssTaskTable) {
		// Get the Rows in the table. Each row will represent a mission.
		var ssMissionRows=document.evaluate(".//tr", ssTaskTable.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i=0; i<ssMissionRows.snapshotLength; i++) {
			// For each row, get the Mission name and the quantity it is being executed.
			var elmMissionRow = ssMissionRows.snapshotItem(i);
			
			// Get the Span with the class "name".
			var spanName = document.evaluate(".//span[@class='name']", elmMissionRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (spanName) {
				pMission = FindMissionByTitle(trim(spanName.snapshotItem(0).textContent));
				iQty = 1;
				
				if (pMission) {
					// Find the Quantity for this row.
					var td_item = document.evaluate(".//td[@class='quantity']", elmMissionRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (td_item) {
						var qty_string = trim(td_item.snapshotItem(0).textContent);
						iQty =parseInt( qty_string.substring(1), 10);
						if (!(iQty>0)) {iQty=1;}
					}
					
					// Make sure that the text of the progress bar is valid. If not, do not count this row.
					
					// Typically, a "try again later" message only appears when the mission line shows "Returning from", but
					//	it can happen when the mission line only shows "Mission:", so do not bother with this check for "Returning from".
					//var return_item = document.evaluate(".//span[@class='text']", elmMissionRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					//if (return_item) {
					//	if (return_item.snapshotItem(0).textContent.indexOf(csReturningFrom)>=0) {
							var timer_item = document.evaluate(".//div[@class='timer_text']", elmMissionRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (timer_item) {
								var msg_text = timer_item.snapshotItem(0).textContent;
								if (msg_text.indexOf(csTryAgain)>=0 || msg_text.indexOf(csUpdating)>=0) {
									pMission.try_again_count++;
									//GM_log("'Try again later' message detected " + pMission.try_again_count + " time(s) for mission '" + pMission.mission_title + "'; Planet " + pMission.mission_planet);
									iQty=0;
									
									// If "Try again later" message shows up for 2 successive iterations for this same mission,
									//	go ahead and refresh the screen by clicking the Mission button.
									if (pMission.try_again_count > ciTryAgain_MaxCount) {
										GM_log("Clicking Missions button to refresh.");
										var ssLink=document.evaluate("//a[@class='selected']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
										var ssItem = ssLink.snapshotItem(0);
										if (ssItem) {
											location.href = ssItem.href;
											pMission.try_again_count=0;
										}
									}
								}
								else pMission.try_again_count=0;
							}
					//	}
					//	else pMission.try_again_count=0;
					//}
					
					pMission.running_count += iQty;
					
					//GM_log("Mission '" + pMission.mission_title + "' running " + iQty + " times.");
				}
				else {
					//GM_log("Mission not found. " + trim(spanName.snapshotItem(0).textContent));
				}
			}
		}
		
		// If no current missions, but there are missions in the Array, then refresh the page periodically.
		if (ssMissionRows.snapshotLength == 0) {
			if (mpMissions.length > 0) {
				miNoActiveMissionsCount++;
				
				if (miNoActiveMissionsCount > 5) {
					GM_log("No active Missions. Clicking Missions button to refresh.");
					var ssLink=document.evaluate("//a[@class='selected']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					var ssItem = ssLink.snapshotItem(0);
					if (ssItem) {
						location.href = ssItem.href;
						miNoActiveMissionsCount = 0;
					}
				
				}
			}
		}
	}
}

//=======================================================
//	Start Mission where running_count < auto_start_limit
//=======================================================
function StartFirstQualifyingMission() {
//=======================================================
// 	Loop through all Missions in Array. If one is found that should be started,
//	start it, then EXIT routine. 
//
//	The next loop through the MainLoop will start the next mission.
//	Only one mission is started at a time, because when a mission is started,
//  elements such as the Start buttons can change status. This process adds a
//	little delay before starting the next mission, but  it is best to have
//	the latest information before starting another.
//
//=======================================================
	for (var m=0; m < mpMissions.length; m++) {
		var pMission = mpMissions[m];
		if (pMission.status_ready) {
			if (pMission.running_count < pMission.auto_start_limit) {
				//
				//	Start Mission
				//
				//GM_log("Execute text: "+pMission.onclick_text);
				
				pMission.running_count++;
				
				// Execute the onclick javascript of someNode
				addScript('(function(){'+pMission.onclick_text+'})();');
				break;
			}
		}
	}
}

//===========================
//===========================
// 		Start it Running
//===========================
//===========================
MainLoop();

//===============================================================
//===============================================================