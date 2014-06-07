// ==UserScript==
// @name WME: Select Same Type Roads
// @description This script add functionnality to select and modify roads
// @namespace http://http://userscripts.org/users/504231
// @match https://world.waze.com/editor/*
// @match https://www.waze.com/editor/*
// @match https://world.waze.com/map-editor/*
// @match https://www.waze.com/map-editor/*
// @include https://*.waze.com/editor/*
// @include https://*.waze.com/*/editor/*
// @include https://*.waze.com/map-editor/*
// @include https://*.waze.com/beta_editor/*
// @include https://descarte*.waze.com/beta/*
// @include https://editor-beta.waze.com/*
// @updateURL           http://userscripts.org/scripts/source/158050.meta.js
// @downloadURL         http://userscripts.org/scripts/source/158050.user.js
// @grant      none
// @version         4.6.2
// ==/UserScript==

// Based on Street to River ( http://userscripts.org/scripts/show/122049 )
// Thanks to alcolo47 (some functions are based on WME Extented Tools)
// Thanks to gdu1971, bgodette, Timbones for part of code 
// Adapted by buchet37 for "Select Same Type Road"

// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Select 2 segments 
// 3) Click the "Select Roads A<=>B" button
// The script will select all same type road between A and B with a limit of 50 segments


if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
					document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

function selectSameTypeRoad() {
  
	var defaultWidth = "15 m";  //Default Width is equal to 15m
  
	insertButton()
  function insertButton() {
	 
		if(document.getElementById('WME_SSTR_All') != null) return;
	    
		var chk1 = $('<Label style="font-weight:normal"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_SSTR_enable"	title="Enable or Disable WME SSTR">On-Off   </input></Label>');   
		var chk2 = $('<Label style="font-weight:normal"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_SSTR_SmthRvr" title="Check for smoothing">Smooth</input></Label>');   
		var chk3 = $('<Label style="font-weight:normal"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_SSTR_SmthPlt" title="Check for smoothing">Smooth</input></Label>'); 	
		var url1 = $ ('<div style="font-size:12px;display: inline;"> <u><i><a href="http://userscripts.org/scripts/show/158050" target="_blank">Select Same Type Road V4.6.2</a></i></u>');
		
		var btn1 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Select 1 or more segments and click this button">Select Same Type Roads</button>');
		var btn2 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Select adjacent segment from node A">Side A</button>');
		var btn3 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Select adjacent segment from node B">Side B</button>');
		var btn4 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Start from segment 1 to join Segment 2 (if possible)">1 => 2</button>');
		var btn6 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Create a ParkingLot from railroad geometry">Railroad => PkgLot</button>');
		var btn7 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Create a River from Street Geometry">Street => River</button>');
		var btn8 = $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Select road(s) to make an Overall Landmark">Do Landmark</button>');
		var btn10= $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="Make a new roundabout from 1 segment of an old one or a set of segments">Redo Roundabout</button>');
		var btn12= $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="click this button to suppress road geometry">Clear Road Geometry</button>');
		var btn13= $ ('<button class="btn btn-default" style="padding:0px 10px; height:22px" title="click this button to allow "All drives" and "All Turns" on selected roads)">All drives on Selection</button>');
		
		btn1.click 	(select_same_type_roads);
		btn2.click 	(Side_A);
		btn3.click 	(Side_B);
		btn4.click 	(select_AB);
		btn6.click 	(Railroad_ParkingLot);
		btn7.click 	(Street_River);
		btn8.click 	(Roads_to_Interchange);
		btn10.click (Redo_RoundAbout);
		btn12.click (Clear_Road_Geometry);
		btn13.click (All_drives_on_Selection);
		
		var btnMenu = $ ('<div id="WME_SSTR_All" style="margin-top: 2px;margin-bottom: 22px;padding-bottom:2px;padding-top:4px;padding-left:5px;width:280px; border-width:3px; border-style:double;border-color: rgb(147, 196, 211); border-radius:10px"/>');	
		//$("#segment-edit-general").append(btnMenu);
		$("#sidebar").append(btnMenu);
	
		var cnt0 = $ ('<section id="WME_SSTR_lnk" 		style="padding-top:2px"/>'); cnt0.append(chk1);cnt0.append(" ");cnt0.append(url1);
		var cnt1 = $ ('<section id="WME_SSTR" 				style="padding-top:2px"/>'); cnt1.append(btn1);
		var cnt2 = $ ('<section id="WME_SSTR_Side"		style="padding-top:2px; padding-bottom:5px"/>'); cnt2.append(btn2); cnt2.append(" ");cnt2.append(btn3)
		var cnt3 = $ ('<section id="WME_SSTR_12" 			style="padding-top:2px; padding-bottom:5px"/>'); cnt3.append(btn4);
		var cnt4 = $ ('<section id="WME_SSTR_River"		style="padding-top:2px"/>'); cnt4.append(btn7); cnt4.append(" ");cnt4.append(chk2);
		var cnt5 = $ ('<section id="WME_SSTR_Pklt" 		style="padding-top:2px"/>'); cnt5.append(btn6); cnt5.append(" ");cnt5.append(chk3);
		var cnt6 = $ ('<section id="WME_SSTR_Ldmk" 		style="padding-top:2px"/>'); cnt6.append(btn8);
		var cnt7 = $ ('<section id="WME_SSTR_Rdt" 		style="padding-top:2px; padding-bottom:5px"/>'); cnt7.append(btn10);
		var cnt8 = $ ('<section id="WME_SSTR_CrgAds"	style="padding-top:2px"/>'); cnt8.append(btn12); cnt8.append(" ");cnt8.append(btn13);
		
		btnMenu.append(cnt0);
		btnMenu.append(cnt1);
		btnMenu.append(cnt2);
		btnMenu.append(cnt3);
		btnMenu.append(cnt4);
		btnMenu.append(cnt5);
		btnMenu.append(cnt6);
		btnMenu.append(cnt7);
		btnMenu.append(cnt8);
		
		effaceMenu ();	
		setTimeout(init_WME_SSTR, 2000);
		
	}
	
	function Clear_Road_Geometry(ev) {
		if (Waze.selectionManager.selectedItems.length!=0) {
			if (confirm ("Do you want to clear the geometry for selected segments") ) {
				for (var i = 0; i < Waze.selectionManager.selectedItems.length; i++) {
					var seg = Waze.selectionManager.selectedItems[i];
					if (seg.type == "segment") {
						var newGeo = seg.geometry.clone();
						newGeo.components.splice(1,newGeo.components.length -2)														// on garde le 1er et le dernier point
						newGeo.components[0].calculateBounds();
						newGeo.components[1].calculateBounds(); 
						Waze.model.actionManager.add (new Waze.Action.UpdateSegmentGeometry (seg,seg.geometry,newGeo));
					}
				}
			}
		}
	}
	
	function All_drives_on_Selection(ev) {
		if (Waze.selectionManager.selectedItems.length!=0) {
			var action =new Array();
			var nodeToAllowed = new Array ();
			var selectRoadIDs = new Array ();
			for (var i = 0; i < Waze.selectionManager.selectedItems.length; i++) {
				var seg = Waze.selectionManager.selectedItems[i];
				if (seg != null && seg.type == "segment" && !seg.attributes.locked && seg.attributes.junctionID == null) {
				selectRoadIDs.push (seg.fid);
					action.push (new Waze.Action.UpdateSegmentDetails( seg, {fwdDirection: true, revDirection: true}));		// pass to two ways
					if (Waze.model.nodes.objects[seg.attributes.fromNodeID]!= null) {																			// store node A
						nodeToAllowed.push (seg.attributes.fromNodeID);	}																	
					if (Waze.model.nodes.objects[seg.attributes.toNodeID]!= null) {																				// store node B
						nodeToAllowed.push (seg.attributes.toNodeID);	}			
				}
			}
			nodeToAllowed = areTwice (nodeToAllowed);																						// on ne traite que les segments inttermédiaires
			for (var i = 0; i < nodeToAllowed.length; i++) {
				var node = Waze.model.nodes.objects[nodeToAllowed[i]];
				var roadIDs =	node.attributes.segIDs ;
				for (var j = 0; j < roadIDs.length; j++) {
					for (var k = 0; k < roadIDs.length; k++) {
						if (roadIDs[j]!= roadIDs[k] && isInArray (roadIDs[j],selectRoadIDs) && isInArray (roadIDs[k],selectRoadIDs)) {
							action.push (new Waze.Action.ModifyConnection(roadIDs[j], node, roadIDs[k], true));
						}
					}
				}
			}
			if (action.length !=0) { Waze.model.actionManager.add (new Waze.Action.MultiAction(action));}
//alert ("On va au bout");
		}
	}
	
	function areTwice (myArray) {
		var myNewArray = new Array();
		if (myArray.length > 0) {
			for (var i = 0; i < myArray.length-1; i++) {
				for (var j = i+1; j < myArray.length; j++) {
					if (myArray [i] == myArray[j]) {
						myNewArray.push(myArray [i]);
					}
				}	
			}	
			return delete_multi_Ids(myNewArray);
		}
		else {
			return (myArray);
		}
	}
	
	function Redo_RoundAbout (ev) {
		var selectedGood = (Waze.selectionManager.selectedItems.length!=0);
		if (selectedGood) {
			if (Waze.selectionManager.selectedItems[0].attributes.junctionID !=null) {			
				var sel = Waze.selectionManager.selectedItems[0];
				var junc = Waze.model.junctions.objects[sel.attributes.junctionID];
				var listRoadIds = junc.segIDs;
				var listId 
				}
			else {
				var listRoadIds = new Array();
				for (var i = 0; i < Waze.selectionManager.selectedItems.length; i++) {
					var sel = Waze.selectionManager.selectedItems[i];
					listRoadIds.push (sel.fid);
				}
			}
			
			var oldRdt = extract_rdt (listRoadIds);
			
			if (oldRdt.higherRank == false) {
				var action = [];
				for (var i = 0; i < oldRdt.listRoadIds.length; i++) {
					var seg = Waze.model.segments.objects[oldRdt.listRoadIds[i]]
					action.push(new Waze.Action.DeleteSegment(seg));																// ******* Delete Roundabout
				}
				for (var i = 0; i < oldRdt.listAdjRoadIds.length; i++) {
					var seg = Waze.model.segments.objects[oldRdt.listAdjRoadIds[i].id];
					var newGeo = seg.geometry.clone();
					if (oldRdt.listAdjRoadIds[i].sideConnect == "A") {
						var index1 =0;
						var index2 =1;
						var nodeEnd = Waze.model.nodes.objects [seg.attributes.toNodeID];
					}
					else {
						var index1 = newGeo.components.length-1;
						var index2 = newGeo.components.length-2;
						var nodeEnd = Waze.model.nodes.objects [seg.attributes.fromNodeID];
					}
					if (nodeEnd !=null && nodeEnd.onScreen() && nodeEnd.attributes.segIDs.length <2) {
						action.push (new Waze.Action.UpdateSegmentDetails(seg, {fwdDirection: true, revDirection: true}));} // dead-end is always two ways roads	
					if (!seg.attributes.fwdDirection && !seg.attributes.revDirection) {																	// unknown roads are fixed to two ways roads
						action.push (new Waze.Action.UpdateSegmentDetails(seg, {fwdDirection: true, revDirection: true}));}
					var deltaX = newGeo.components[index1].x - newGeo.components[index2].x ;
					var deltaY = newGeo.components[index1].y - newGeo.components[index2].y ;
					var angle = angleDeg (deltaX,deltaY);
					var meanExt = 0.10 * (oldRdt.rx + oldRdt.ry);
					newGeo.components[index1].x = newGeo.components[index1].x + meanExt* Math.cos(convertDegRad(angle));
					newGeo.components[index1].y = newGeo.components[index1].y + meanExt* Math.sin(convertDegRad(angle));
					newGeo.components[index1].calculateBounds(); 
					action.push(new Waze.Action.UpdateSegmentGeometry (seg,seg.geometry,newGeo));
				}
				Waze.model.actionManager.add (new Waze.Action.MultiAction(action));						// *******  Strech adjacent segments

				var R = {};
				R.center = {x: oldRdt.centerX, y:oldRdt.centerY},
				R.rx  = Math.min (parseInt(144),oldRdt.rx);	
				R.ry  = Math.min (parseInt(144),oldRdt.ry);
				if (Math.abs (R.rx - R.ry) < (0.15 * R.rx)) {																		// if Rx near Ry => Circle with mean value
					R.rx = (R.rx + R.ry) / 2;
					R.ry =  R.rx;
				}
				R.bounds = new OpenLayers.Bounds(R.center.x - R.rx, R.center.y - R.ry, R.center.x+R.rx, R.center.y + R.ry);	
				var action = new Waze.Action.CreateRoundabout(R);
				Waze.model.actionManager.add (action);
				var rbtRoadIds = new Array ();
				for (var i = 0; i < action.roundaboutSegments.length; i++) {																				// store new SegIds
					rbtRoadIds.push (action.roundaboutSegments[i].fid);
				}

				newRdt = searchNewRdt (rbtRoadIds,oldRdt.primaryStreetID);									
				var action = [];
				for (var i = 0; i < rbtRoadIds.length; i++) {
					var road = Waze.model.segments.objects[rbtRoadIds[i]];
					action.push(new Waze.Action.UpdateSegmentDetails(road, {roadType: newRdt.roadtype, level: newRdt.level, locked: false } ));
					if (oldRdt.primaryStreetID != null) {
						action.push(new Waze.Action.UpdateSegmentDetails(road, {primaryStreetID: oldRdt.primaryStreetID}));
					}
				}
				Waze.model.actionManager.add(new Waze.Action.MultiAction(action));
				select (rbtRoadIds);
			}
			else {
				alert ("Your ranking is not higher\nto redo this roundabout")
			}
		}
		else {
			alert ("Incorrect Selection : \n\nOne segment must be selected \nOr It is not Roundabout Segment");
		}
	}
		
	function searchNewRdt (listRdtSegIds,StreetID) {
		var roadpriority = new Array () ;
			roadpriority [1] 	= 0; 	//"Streets"
			roadpriority [2] 	= 1; 	//"Primary Street"
			roadpriority [3] 	= 3;  //"Freeways"
			roadpriority [4] 	= 2;	//"Ramps"
			roadpriority [6]	= 3;	//"Major Highway"
			roadpriority [7]	= 2;	//"Minor Highway"
			roadpriority [8] 	= 0;	//"Dirt roads"
			roadpriority [18]	= 0;  //"Railroad"
			roadpriority [19]	= 0;	//"Runway/Taxiway"
			roadpriority [20]	= 0;  //"Parking Lot Road"
			roadpriority [5] 	= 0; 	//"Walking Trails"
			roadpriority [10] = 0;  //"Pedestrian Bw"
			roadpriority [16] = 0; 	//"Stairway"
			roadpriority [17] = 0;  //"Private Road"
			roadpriority [21] = 0;  //"Service Road"
			
		var priorityToRoadtype = new Array () ;
			priorityToRoadtype [0] 	= 1; 	//"Streets"
			priorityToRoadtype [1] 	= 2; 	//"Primary Street"
			priorityToRoadtype [2] 	= 7;	//"Minor Highway"
			priorityToRoadtype [3]	= 6;	//"Major Highway"
		
		var compteur = [0,0,0,0];																						//array for number of roads by type
		var listRdtNodeIds = new Array ();
		
		for (var i = 0; i < listRdtSegIds.length; i++) {
			var road = Waze.model.segments.objects[listRdtSegIds[i]];
			if (road != null) {
				listRdtNodeIds.push (road.attributes.fromNodeID);
				listRdtNodeIds.push (road.attributes.toNodeID);
			}
		}
		listRdtNodeIds = delete_multi_Ids (listRdtNodeIds);
		
		var usedNodeIDs = new Array ();
		usedNodeIDs.push.apply (usedNodeIDs,listRdtNodeIds);
		
		var rdt = {};
		rdt.level = -5;
		var action = new Array ();
		for (var i = 0; i <listRdtNodeIds.length; i++) {															// Search connected Segments
			var node = Waze.model.nodes.objects[listRdtNodeIds[i]];
			if (node != null) {
				var nbSegs = node.attributes.segIDs.length;
				for (var j=0; j<nbSegs ;j++) {
					var road = Waze.model.segments.objects[node.attributes.segIDs[j]];
					if ((road != null) && (notInArray (road.fid,listRdtSegIds))) {
						rdt.level = Math.max (rdt.level,road.attributes.level);
 							if (road.attributes.roadType == 3 ) {																																						// Freeways are not allowed in roundabout
							action.push (new Waze.Action.UpdateSegmentDetails(road, {roadType: 6}));}
						if (notInArray(road.attributes.roadType,([1,2,3,4,6,7]))) {																												// Road type on roundabout should be at least "Street"
							action.push (new Waze.Action.UpdateSegmentDetails(road, {roadType: 1}));}				
						if (!road.attributes.fwdDirection && !road.attributes.revDirection) {																							// unknown roads are fixed to two ways roads
							action.push (new Waze.Action.UpdateSegmentDetails(road, {fwdDirection: true, revDirection: true}));}
						if (road.attributes.primaryStreetID == null && StreetID != null) {																								// Unnamed Roadsd are named as the rdt
							 action.push(new Waze.Action.UpdateSegmentDetails(road, {primaryStreetID: StreetID}));}
							if (notInArray(road.attributes.fromNodeID,usedNodeIDs) ||  notInArray(road.attributes.toNodeID,usedNodeIDs)) {
							compteur [roadpriority[road.attributes.roadType]] ++;
							usedNodeIDs.push (usedNodeIDs, road.attributes.fromNodeID);
							usedNodeIDs.push (usedNodeIDs, road.attributes.toNodeID);
						}
					}	
				}
			}
		}
		rdt.roadtype = priorityToRoadtype [0] ;
		var foundMax = false;
		for (var i = 3; i > 0; i --) {
			if ((compteur[i] > 1) &&	 (foundMax == false)) {
				rdt.roadtype = priorityToRoadtype [i];
				foundMax = true;
				}
			else {
				compteur [i-1] = compteur[i-1] + compteur[i];
				compteur [i] = 0;
			}
		}
		rdt.level ++ ;																								// up Roundabout level
		
		if (action.length !=0) {Waze.model.actionManager.add ( new Waze.Action.MultiAction(action));}				// do modifications if there are 
		return rdt;
	}
	
	function extractNodes (listRoadIds) {
		var nodeList = new Array ();
		for (var i = 0; i<listRoadIds.length ;i++) {
			var road = Waze.model.segments.objects[listRoadIds[i]];
			if (road != null) {
				nodeList.push (road.attributes.fromNodeID);
				nodeList.push (road.attributes.toNodeID);
			}
		}	
		return delete_multi_Ids (nodeList);
	}
	
	function extract_rdt (listIDs) {
		
		var rdt = {};
		//rdt.listNodeIds = new Array();
		rdt.listAdjRoadIds = new Array();
		rdt.higherRank = false;
		rdt.listRoadIds = listIDs;
		var xmin =  10000000000000; var ymin = xmin;
		var xmax = -10000000000000; var ymax = xmax;
		for (var i = 0; i<rdt.listRoadIds.length ;i++) {
			var road = Waze.model.segments.objects[rdt.listRoadIds[i]];
			if (road != null) {
				rdt.higherRank = rdt.higherRank || road.isLockedByHigherRank();
				for (var j = 0;j < road.geometry.components.length;j++) {
					xmin = Math.min (xmin, road.geometry.components[j].x);
					xmax = Math.max (xmax, road.geometry.components[j].x);
					ymin = Math.min (ymin, road.geometry.components[j].y);
					ymax = Math.max (ymax, road.geometry.components[j].y);
				}
			}
		}

		rdt.listNodeIds = extractNodes (rdt.listRoadIds);
		rdt.rx			= (xmax-xmin)/2;
		rdt.ry 			= (ymax-ymin)/2;
		rdt.centerX = (xmin+xmax) / 2;
		rdt.centerY = (ymin+ymax) / 2;

		for (var i = 0; i <rdt.listNodeIds.length; i++) {													// Search connected Segments
			var node = Waze.model.nodes.objects[rdt.listNodeIds[i]];
			if (node != null) {
				var nbSegs = node.attributes.segIDs.length;
				for (var j=0; j<nbSegs ;j++) {
					var road = Waze.model.segments.objects[node.attributes.segIDs[j]];
					if ((road != null) && (notInArray (road.fid,rdt.listRoadIds))) {
						rdt.higherRank = rdt.higherRank || road.isLockedByHigherRank() ;				// test if locked at higher rank
						if (isInArray (road.attributes.fromNodeID,rdt.listNodeIds)) {
							rdt.listAdjRoadIds.push ({id:road.fid,sideConnect :"A"});
						}				
						if (isInArray (road.attributes.toNodeID,rdt.listNodeIds)) {
							rdt.listAdjRoadIds.push ({id:road.fid,sideConnect :"B"});
						}					
					}	
				}
			}
		} 
		
		var streetID = captureCity (rdt.listRoadIds);																//search for primaryStreetID : first in rdt segment and after in adja cent segemnts
		if (streetID.CityNoStreet != null) {
			rdt.primaryStreetID = streetID.CityNoStreet ; }
		else { if ( streetID.NoCityNoStreet != null) {
			rdt.primaryStreetID = streetID.NoCityNoStreet;}
		}
		if (rdt.primaryStreetID == null) {
			var adjID = new Array ();
			for (var i = 0; i < rdt.listAdjRoadIds.length ;i++) { 
				adjID.push (rdt.listAdjRoadIds[i].id);}
			var streetID1 = captureCity (adjID);
			if (streetID1.CityNoStreet != null) {
				rdt.primaryStreetID = streetID1.CityNoStreet ; }
			else { if ( streetID1.NoCityNoStreet != null) {
				rdt.primaryStreetID = streetID1.NoCityNoStreet;}
			}
		}
		if (rdt.primaryStreetID == null) {
		 	rdt.primaryStreetID = streetID.altStreetID ; }
		if (rdt.primaryStreetID == null) {
		 	rdt.primaryStreetID = streetID1.altStreetID ; }
		return rdt;
	}
	
	function captureCity (roadListID) {
		var road = new Object();
		road.NoCityNoStreet = null;
		road.CityNoStreet 	= null;
		road.altStreetID    = null;
		for (var i = 0; i < roadListID.length ;i++) {
			var road1 = Waze.model.segments.objects[roadListID[i]];
			if (road1 != null && road1.attributes.primaryStreetID!= null) {
				var adress = road1.getAddress();
				road.altStreetID = road1.attributes.primaryStreetID;
				if ((adress.city.isEmpty ) && (adress.street.isEmpty)) {
					road.NoCityNoStreet = road1.attributes.primaryStreetID;}
				if ((adress.city.name != null) && (adress.city.name != "") && (adress.street.isEmpty)) {
					road.CityNoStreet = road1.attributes.primaryStreetID;}
			}
		} 
		return road;
	}
	
	function convertDegRad (angledeg) {
		return (Math.PI * (angledeg) / 180 );
	}

	function 	Roads_to_Interchange(ev) {
		var foundSelectedSegment = false;
		var selectedGood = (Waze.selectionManager.selectedItems.length>0);
		var roadIds = new Array();
		for (var i = 0; i<Waze.selectionManager.selectedItems.length ;i++) { 																					// Test if selection are segment
			var sel = Waze.selectionManager.selectedItems[i];
			selectedGood = ((selectedGood) && (sel.type == "segment"));
			if ((selectedGood)&& (sel.attributes.junctionID!=null)) {										// if it is a roundabout
				var jId = sel.attributes.junctionID;
				var junc = Waze.model.junctions.objects[jId];
				roadIds.push.apply (roadIds,junc.segIDs);																	// we add all segment of the roundabout
			}
			if (selectedGood) {	roadIds.push ( sel.fid);};															// stocke les segments
		}
		if ((selectedGood) &&( roadIds.length != 0)) {
			roadIds = delete_multi_Ids (roadIds)																				// delete double roads
			var totalPoints = [];
			//points.push({x:5, y:3});
			var name;
			var leftEnv = [];
			var rightEnv = [];
			var typeLandmak;
			leftEnv.push ({x: 100000000000000,y:2000000000});
			var yMax = -100000000000;
 			for (var i = 0; i<roadIds.length ;i++) { 
				var sel = Waze.model.segments.objects[roadIds[i]];
				if (name == null) {name = getStreet(sel).name };
				if (typeLandmak == null) {
					switch (sel.attributes.roadType) {
						case 1: //"Streets"
						case 2: //"Primary Street"
						case 3: //"Freeways"
						case 4: //"Ramps"
						case 6: //"Major Highway"
						case 7: //"Minor Highway"
							typeLandmak = "W0003"	; break 		// Jonction/interchange
						case 8: //"Dirt roads"
						case 18: //"Railroad"
						case 19: //"Runway/Taxiway"
						case 20: //"Parking Lot Road"
							typeLandmak = "W0001" ; break 		// ParkingLot
						case 5: //"Walking Trails"
						case 10: //"Pedestrian Bw"
						case 16: //"Stairway"
						case 17: //"Private Road"
						case 21: //"Service Road"
							typeLandmak = "K2190" ; break 		// Park
					}
				}
				
				for (var j = 0; j < sel.geometry.components.length;j++) {
					totalPoints.push (sel.geometry.components[j].clone());
					if (leftEnv[0].y > sel.geometry.components[j].y) {																							// Stocke le Y mini
						leftEnv[0]  = sel.geometry.components[j].clone();
						rightEnv[0] = sel.geometry.components[j].clone();
					}
					if (sel.geometry.components[j].y > yMax) { yMax = sel.geometry.components[j].y; }
				}
			}
			
			while ( rightEnv[rightEnv.length-1].y <yMax) {																		// traitement de la voie droite
				var anglemin = 190;
				for (var i = 0; i<totalPoints.length ;i++) {														
					if (totalPoints[i].y > rightEnv[rightEnv.length-1].y) {
						var deltaX = totalPoints[i].x - rightEnv[rightEnv.length-1].x;
						if (deltaX !=0) {
							var deltaY = totalPoints[i].y - rightEnv[rightEnv.length-1].y;
							var angle = angleDeg( deltaX , deltaY);
							if (angle < anglemin) {
								anglemin = angle;
								var iMin = i;
							}
						}
					}
				} 
				rightEnv.push (totalPoints[iMin]);
			}
			
			while ( leftEnv[leftEnv.length-1].y <yMax) {																		// traitement de la voie droite
				var anglemax = 0;
				for (var i = 0; i<totalPoints.length ;i++) {														
					if (totalPoints[i].y > leftEnv[leftEnv.length-1].y) {
						var deltaX = totalPoints[i].x - leftEnv[leftEnv.length-1].x;
						if (deltaX !=0) {
							var deltaY = totalPoints[i].y - leftEnv[leftEnv.length-1].y;
							var angle = angleDeg( deltaX , deltaY);
							if (angle > anglemax) {
								anglemax = angle;
								var iMax = i;
							}
						}
					}
				} 
				leftEnv.push (totalPoints[iMax]);
			}
			
			leftEnv.shift(); leftEnv.pop();  	                            //On ote le premier et le dernier point( communs avec droite)			
			rightEnv.push.apply (rightEnv,leftEnv.reverse ());						//on ajoute la partie Gauche
			var dummy = doLandmark (rightEnv,name,typeLandmak)						// make the landmark
			alert("Successfully created Landmark");}
		else {
			alert("Incorrect Selection : \n\nOne segment must be selected \nOr It is not RoundAbout Segment");
		}
	}
	
	function doLandmark (geometry,nameLandmak,typeLandmak) {
		var polyPoints = null;
		for (var i = 0; i<geometry.length;i++) {
			var vertex = geometry[i];
			if (polyPoints == null) {
				polyPoints = [geometry[i]]; 
				var ri = new OpenLayers.Geometry.Point(geometry[i].x, geometry[i].y);
				polyPoints.push(ri)
				}
			else {
				var ri = new OpenLayers.Geometry.Point(geometry[i].x, geometry[i].y);
				polyPoints.push(ri);
			}
		}
		var polygon = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(polyPoints));
		var landmark = new Waze.Feature.Vector.Landmark(polygon,{mtfcc:typeLandmak,name: nameLandmak});	
		var what = Waze.model.actionManager.add(new Waze.Action.AddLandmark(landmark));
		activateLayer ("landmarks", true );
		return true; 
	}
	
	function Street_River (ev) {
		var selectedGood = (Waze.selectionManager.selectedItems.length==1);
		var sel = Waze.selectionManager.selectedItems[0];
		selectedGood = selectedGood && (sel.type == "segment") && (sel.attributes.roadType != "18")
		if (selectedGood) {
			var offset = getDisplacement();																						// valeur en mètres
			if (offset == null) {
				return; }
			var name = getStreet(sel).name ;
			var points = StreetToLandmark (sel, offset) ; 
			var dummy = doLandmark (points,name,"H3010")	// river
			alert("Successfully created a River Landmark"); }
		else {
			alert ("Incorrect Selection : \n\nOne segment must be selected \nOr It is not Street Segment");
		}
	}

	function Railroad_ParkingLot (ev) {
		var selectedGood = (Waze.selectionManager.selectedItems.length==1);
		var sel = Waze.selectionManager.selectedItems[0];
		selectedGood = selectedGood && (sel.type == "segment") && (sel.attributes.roadType == "18")
		if (selectedGood) {
			var offset = getDisplacement();																						// valeur en mètres
			if (offset == null) {
				return; }
			var name = getStreet(sel).name ;
			var points = StreetToLandmark (sel, offset) ; 
			var dummy = doLandmark (points,name,"W0001")	// ParkingLot
			alert("Successfully created ParkingLot Landmark"); }
		else {
			alert ("Incorrect Selection : \n\nOne segment must be selected \nOr It is not Railroad Segment");
		}
	}

	function getDisplacement() {
		var scale = 1.44449796;																				// Scale mètres => coordonnées waze			
		var width = prompt ("Enter new Width or leave it to old value ",defaultWidth);
		if (width == null) {
			return null}
		else {
			if (width.match("m","g")) {
				width =parseInt(width);
				if (width < 1) width = 1;			  	//minimum width equal to 1m
				if (width >100) width = 100;		  //maximum width equal to 100m
				defaultWidth=width+" m";
				return width * scale / 2;			
			}
			if (width.match("ft","g")) {
				width =parseInt(width);
				if (width < 3) width =3;			  	//minimum width equal to 3 ft
				if (width > 300) width =300;			//maximum width equal to 300 ft
				defaultWidth=width+" ft";
				return width * 0.3048 * scale /2;
			}
			width=15;
			defaultWidth="15 m";
			return width * scale / 2;
		}
  }
	
	function StreetToLandmark (seg,offset) {
		var decal = decalage (seg.geometry.components, offset);
		if 	(document.getElementById ('WME_SSTR_SmthRvr').checked == 1) {	
			decal.dir = optGeometry (decal.dir);
			decal.sym = optGeometry (decal.sym);
			decal.dir = b_spline (decal.dir); 												// creation des B - splines X & Y
			decal.sym = b_spline (decal.sym);
			decal.dir = sup_unneed (decal.dir); 											// delete aligned points
			decal.sym = sup_unneed (decal.sym); 											// delete aligned points
		}
		decal.dir.push.apply  (decal.dir,decal.sym.reverse());		// on rajoute le trajet retour
		return decal.dir;
	}
	
	function 	sup_unneed (decal) {
		for (var phase = 0; phase < 3; phase ++) {
			var decal1 = new Array();
			decal1 [0] = decal [0];
			for (var i = 1; i< decal.length-2; i++) {
				if ((decal1[decal1.length-1].x != decal[i+1].x) && (decal[i+1].x != decal[i+2].x)) {															// non vertical => can calculate Atan				
				var angle1 = ((decal1[decal1.length-1].y  - decal[i+1].y) / (decal1[decal1.length-1].x - decal[i+1].x));
					var angle2 = ((decal[i+1].y - decal[i+2].y) / (decal[i+1].x - decal[i+2].x));
					var length1 = longueur (decal1[decal1.length-1].x,decal1[decal1.length-1].y,decal[i+1].x,decal[i+1].y) ;
					if (testUnneed (angle1,angle2,length1,phase)) {
						decal1.push (decal[i+1]);
					}
				}
				else {
					decal1.push (decal[i+1]);
				}
			}
			decal1.push (decal[decal.length-1]);
			decal = decal1;
		}
	return decal1 ;
	} 
	
	function testUnneed (angle1,angle2,longueur,phase) {
		var deltaAngle = Math.abs (AtanDeg (angle1) - AtanDeg (angle2));	
		switch (phase) {
			case 0: if ((deltaAngle < 45) && (longueur < 10)) 	{return false;}; break;
			case 1: if ((deltaAngle < 1 ) && (longueur >= 10) && (longueur < 250)) {return false;}; break;
			case 2: if ((deltaAngle < 2 ) && (longueur >= 10) && (longueur < 50 )) {return false;}; break;
		}
		return true;
	}
	
	function optGeometry ( line) {
		var opt = new Array ()
		opt[0] = line[0].clone();
		for (var i = 1; i< line.length; i++) {
			var deltaX = line[i].x-line[i-1].x;
			var deltaY = line[i].y-line[i-1].y;
			opt.push ({x: line[i-1].x + deltaX * 0.33, y: line[i-1].y + deltaY * 0.33}); // add 2 extra control points
			opt.push ({x: line[i-1].x + deltaX * 0.66, y: line[i-1].y + deltaY * 0.66});		
			opt.push ({x: line[i].x, y: line[i].y});
		}
		return opt;
	}
	
	function longueur (x1,y1,x2,y2) {
		return (Math.sqrt (((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))));
	}
	
	function decalage (geom,offset) {	
		var decal = new Object();
		decal.dir = new Array ();																					// décalage d'un coté
		decal.sym = new Array ();																					// décalage de l'autre
		decal.dir[0] = geom[0].clone();
		decal.sym[0] = geom[0].clone();
		if (Math.abs(geom[1].x - geom[0].x) < 0.1) {geom[1].x = geom[0].x+0.1;}															// traitement de la verticalité
		var deltaX = geom[1].x - geom[0].x ;
		var deltaY = geom[1].y - geom[0].y ;
		var angle = Math.atan (deltaY/deltaX) ;	
		decal.dir[0].x = geom[0].x - sign (deltaX) * offset * Math.sin (angle);
		decal.dir[0].y = geom[0].y + sign (deltaX) * offset * Math.cos (angle);
		decal.sym[0].x = geom[0].x + sign (deltaX) * offset * Math.sin (angle);
		decal.sym[0].y = geom[0].y - sign (deltaX) * offset * Math.cos (angle);
		
		var aprev = deltaY / deltaX ;
		var b = geom[0].y - aprev * geom[0].x;										// y = ax+b
		
		var off1 = sign(deltaX) *  offset / Math.cos (angle) ;
		var bprev = b + off1 ; 		var bprev1 = b - off1 ;
		for (var i = 1; i < geom.length-1 ; i++) {
			if (Math.abs(geom[i+1].x - geom[i].x)< 0.1) {geom[i+1].x = geom[i].x+0.1;}															// traitement de la verticalité
			deltaX = geom[i+1].x - geom[i].x; 
			deltaY = geom[i+1].y - geom[i].y ;
			var anext = deltaY / deltaX ;
			b = geom[i].y - anext * geom[i].x;
			angle = Math.atan (deltaY/deltaX) ;
			off1 = sign(deltaX) * offset / Math.cos (angle) ;
			var bnext = b + off1 ; 	var bnext1 = b - off1 ;
			
			var x1 = -(bprev - bnext) / (aprev - anext);
			var x2 = -(bprev1 - bnext1) / (aprev - anext);
			decal.dir.push ({x: x1, y: (aprev * x1 + bprev)});											// décalage d'un coté
			decal.sym.push ({x: x2, y: (aprev * x2 + bprev1)});										  // décalage de l'autre coté
			
			aprev = anext;
			bprev = bnext; 	bprev1 = bnext1;
		}
																																							// derniers point
		decal.dir.push ({x: (geom[i].x - sign(deltaX) * offset * Math.sin (angle)),y: (geom[i].y + sign(deltaX) * offset * Math.cos (angle))});  
		decal.sym.push ({x: (geom[i].x + sign(deltaX) * offset * Math.sin (angle)),y: (geom[i].y - sign(deltaX) * offset * Math.cos (angle))});
		return decal ;
	}
	
	function b_spline (ligne) {	
		var ligne1 = new Array();																															
		ligne1 [0] = ligne [0];
		for (var j = 1; j < ligne.length-2;j++) {
			var t = 4; 																															// nombre de sous-segments
			for (var i = 0; i < 1;i+=1/t) {
				var x1 = ((1-i)*(1-i)*(1-i)*ligne[j-1].x + (3*i*i*i -6*i*i +4)*ligne[j].x + (-3*i*i*i +3*i*i +3*i +1)*ligne[j+1].x + i*i*i*ligne[j+2].x)/6 ;
				var y1 = ((1-i)*(1-i)*(1-i)*ligne[j-1].y + (3*i*i*i -6*i*i +4)*ligne[j].y + (-3*i*i*i +3*i*i +3*i +1)*ligne[j+1].y + i*i*i*ligne[j+2].y)/6 ;
				ligne1.push ({x: (x1), y: (y1)});
			}
		}
		ligne1.push( ligne[ligne.length-1] );
		return ligne1;
	}
	
	function getStreet(segment) {
    // alert("Primary Street ID : "+segment.attributes.primaryStreetID+" !") ; 
		if (! segment.attributes.primaryStreetID)
      return null;
    var street = segment.model.streets.get(segment.attributes.primaryStreetID) ;
    return street;
  }
	
  function select_same_type_roads(ev) {
		var nbRoad = Waze.selectionManager.selectedItems.length;
		var selectedGood = true;																									// selection must have 1 or 2 items
		for (var i = 0; i<nbRoad ;i++) { 																					// Test if selection are segment
			var sel = Waze.selectionManager.selectedItems[i];
			selectedGood = ((selectedGood) && (sel.type == "segment"));
		}
	
		if (selectedGood) {
			var Select_IDs =new Array();                     											  //tableau de stockage des Routes electionnées
			for (var j = 0; j < nbRoad; j++) {
				var sel = Waze.selectionManager.selectedItems[j];
				if (sel.attributes.junctionID!=null) {															  // It's un roundabout
					var jId = sel.attributes.junctionID;
					var junc = Waze.model.junctions.objects[jId];
					Select_IDs.push.apply(Select_IDs,junc.segIDs);}											// Add to pervious selected Ids
				else {
					var roadFrom = sel.attributes.fromNodeID;
					var nodeFrom = Waze.model.nodes.objects[roadFrom];										// recherche à partir du premier noeud
					var segList = searchRoad(nodeFrom,sel,"0");					
					Select_IDs.push.apply(Select_IDs,segList.IDs);											// Add to pervious selected Ids
					var roadTo =  sel.attributes.toNodeID;
					var nodeTo = Waze.model.nodes.objects[roadTo];												// recherche à partir du deuxième noeud					
					var segList = searchRoad(nodeTo,sel,"0");			
					Select_IDs.push.apply(Select_IDs,segList.IDs);											// Add to pervious selected Ids
				}
			}
			select (Select_IDs);
		}
		if (!selectedGood) { alert("You must select road(s)"); }
  }

	function Side_A(ev) {
		var nbRoad = Waze.selectionManager.selectedItems.length;
		var sel = Waze.selectionManager.selectedItems[0];
		if ((nbRoad == 1) && (sel.type = "segment")) {						
			var roadFrom = sel.attributes.fromNodeID;
			var nodeFrom = Waze.model.nodes.objects[roadFrom];												// recherche à partir du noeud A
			var segList = searchRoad(nodeFrom,sel,"0")
			select (segList.IDs) }
		else {
			alert ("One segment (and only one)\nmust be selected");
		}	
	}
	
	function Side_B(ev) {
		var nbRoad = Waze.selectionManager.selectedItems.length;
		var sel = Waze.selectionManager.selectedItems[0];
		if ((nbRoad == 1) && (sel.type = "segment")) {						
			var roadTo =  sel.attributes.toNodeID;
			var nodeTo = Waze.model.nodes.objects[roadTo];															// recherche à partir du noeud	A					
			var segList = searchRoad(nodeTo,sel,"0")
			select (segList.IDs) }
		else {
			alert ("One segment (and only one)\nmust be selected");
		}	
	}
	
	function select_AB(ev)  {
		var nbRoad = Waze.selectionManager.selectedItems.length;																					// **** Validate selection *****
		var selectedGood = (nbRoad == 2);																													// selection must have 2 items
		if (selectedGood) {			 																							
			var sel = Waze.selectionManager.selectedItems[0];
			var sel1 = Waze.selectionManager.selectedItems[1];
			selectedGood = ((sel.type == "segment") && (sel1.type == "segment"));											// Test if selection are segment
			selectedGood = ((selectedGood) && (sel.attributes.roadType == sel1.attributes.roadType));	// Test if selection have same road Type
		}
		if (selectedGood) {
			var lengthMin = 1000000;
			var goodTrip = new Array();
			var select1 = select_12(sel,sel1);
			if (select1[select1.length-1] == sel1.fid) {																								// on a trouvé un chemin dans ce sens
				goodTrip = select1;
				lengthMin = lengthTrip (select1);	
				}
			var select2 = select_12(sel1,sel);
			
			if ((select2[select2.length-1] == sel.fid) && (lengthTrip (select2) < lengthMin)){					// on a trouvé un chemin dans ce sens
					goodTrip = select2;
					lengthMin = lengthTrip (select2);
			}
			var nodeTrip1 = nodeFromTrip (select1);																												// ******* search for Common Nodes
			var nodeTrip2 = nodeFromTrip (select2);
			var CommonNode = new Array();	
			for (var i = 0; i < nodeTrip1.length; i++) {
				if (isInArray (nodeTrip1[i],nodeTrip2)) {
					CommonNode.push (nodeTrip1[i]);
				}
			}
			
			if (CommonNode.length !=0) {																																								
				for (var i = 0; i < CommonNode.length; i++) {
					var select3 = new Array ();
					var road = Waze.model.segments.objects[select1[0]];
					for (var j = 0; ((road.attributes.fromNodeID != CommonNode[i]) && (road.attributes.toNodeID != CommonNode[i])); j++) {
						select3.push (road.fid);
						road = Waze.model.segments.objects[select1[j]];
					}
					select3.push (road.fid);
					road = Waze.model.segments.objects[select2[0]];
					for (var j = 0; ((road.attributes.fromNodeID != CommonNode[i]) && (road.attributes.toNodeID != CommonNode[i])); j++) {
						select3.push (road.fid);
						road = Waze.model.segments.objects[select2[j]];
					}
					select3.push (road.fid);
					select3 = delete_multi_Ids (select3);
					if (lengthTrip (select3) <lengthMin) {
						goodTrip = select3;
						lengthMin = lengthTrip (goodTrip);
					}
				}
			}
			
			if (lengthMin != 1000000) {																								// a path was found
				goodTrip = addRoundabout (goodTrip);																		// Add roundabout segments
				goodTrip = addAlternativePaths (goodTrip);															// add alternative simple way like fork in roundabaout
				select (goodTrip);}		// make the selection		
			else {
				alert("No Path found"); 	
			}
		}
		else { alert("You must select 2 roads \nwith the same type"); 
		}
	}
	
	function addAlternativePaths (trip) {
		var alternativeSegs = new Array();
		var listNodeIDs = nodeFromTrip (trip);																			// list of nodesIds of the trip
		var road = Waze.model.segments.objects[trip[0]];					
		var roadtype	= road.attributes.roadType;
		for (var i = 0; i < listNodeIDs.length;i++) {
			var node = Waze.model.nodes.objects[listNodeIDs[i]];
			var nodeSegIdList = node.attributes.segIDs;
			for (var j = 0; j < nodeSegIdList.length;j++) {
				var road1 = Waze.model.segments.objects[nodeSegIdList[j]];		
				if ((road1 != null) && (road1.attributes.roadType == roadtype) && (isInArray (road1.attributes.fromNodeID,listNodeIDs)) && (isInArray (road1.attributes.toNodeID,listNodeIDs))) {
					alternativeSegs.push (road1.fid);
				}
			}
		}
		if (alternativeSegs.length != 0 ) {
			trip.push.apply(trip,alternativeSegs);
			trip = delete_multi_Ids (trip);
		}
		return trip ;
	}
	
	function addRoundabout (trip) {
		var roundaboutSegs = new Array();
		for (var i = 0; i < trip.length;i++) {
			var road = Waze.model.segments.objects[trip[i]];
			if (road.attributes.junctionID!=null) {															  // It's un roundabout
				var jId = road.attributes.junctionID;
				var junc = Waze.model.junctions.objects[jId];
				roundaboutSegs.push.apply(roundaboutSegs,junc.segIDs);								// prepare to add roundabout to select
			}
		}
		if (roundaboutSegs.length != 0 ) {
			trip.push.apply(trip,roundaboutSegs);
			trip = delete_multi_Ids (trip);
		}
		return trip
	}
	
	function nodeFromTrip (Trip) {
		var node =new Array() ;
		for (var i = 0; i < Trip.length ; i++) {
			var road = Waze.model.segments.objects[Trip[i]];
			node.push (road.attributes.fromNodeID);
			node.push (road.attributes.toNodeID);
		}
		node = delete_multi_Ids (node);
		return node;
	}
	
	function lengthTrip (listRoadID) {
		var length= 0 ;
		for (var i = 0; i < listRoadID.length;i++) {
			var road = Waze.model.segments.objects[listRoadID[i]];
			length = length + road.attributes.length;
		}
		return length;
	}
	
	function select_12(startRoad,endRoad) {
		var Select_IDs =new Array();                     											  			//tableau de stockage des Routes electionnées
		var endRoadFrom;
		var endRoadTo;
		if (endRoad.attributes.fromNodeID != null) {																									// Validate node for End Road 
			endRoadFrom = Waze.model.nodes.objects[endRoad.attributes.fromNodeID];}
		else {endRoadFrom = Waze.model.nodes.objects[endRoad.attributes.toNodeID];}
		if (endRoad.attributes.toNodeID != null) {
			endRoadTo = Waze.model.nodes.objects[endRoad.attributes.toNodeID];}
		else {endRoadTo = Waze.model.nodes.objects[endRoad.attributes.fromNodeID];}	
		var node = choiceStartNode (startRoad,endRoadFrom,endRoadTo);																	// Choix du node de depart
		var segList = searchRoad(node,startRoad,endRoad.fid);		
		Select_IDs.push.apply(Select_IDs,segList.IDs);				
//alert (Select_IDs);
		while ((segList.stop == "multiRoads") &&  (segList.roads.length >"1") && (Select_IDs.length < 50)) {													// Manage jonctions with same type road
			var BestNextNode  = searchBestNextNode (segList.node, segList.roads, endRoad);
			if ( BestNextNode.fid != segList.node.fid ) {																										// search road with best node
				for (var i = 0; i < segList.roads.length;i++) {
					var road = Waze.model.segments.objects[segList.roads[i]];
					if ((BestNextNode.fid == road.attributes.fromNodeID) || (BestNextNode.fid == road.attributes.toNodeID)) {
					var bestRoad = road ;
					}
				}
				var segList = searchRoad (BestNextNode, bestRoad, endRoad.fid);					
				Select_IDs.push.apply(Select_IDs, segList.IDs); }
			else {
				segList.stop = "none" ; 
			}
		}
		return (Select_IDs) ;
	}		
		
	function searchBestNextNode (StartNode,listRoadID,endRoad) {
		var EndNode1 = Waze.model.nodes.objects[endRoad.attributes.fromNodeID];
		var EndNode2 = Waze.model.nodes.objects[endRoad.attributes.toNodeID];
		if (distance(StartNode,EndNode2) > distance(StartNode,EndNode1)) {											// determine de noeud de référence de fin
			var EndNode = EndNode1;}
		else {
			var EndNode = EndNode2;
		}
//alert (StartNode.fid+" "+EndNode.fid);
		var angleEnd = angle(StartNode, EndNode);
//alert (angleEnd);
		var angleMin = 360;
		var BestNode;
		for (var i = 0; i < listRoadID.length;i++) {
			var road = Waze.model.segments.objects[listRoadID[i]];
			if (road.attributes.fromNodeID == StartNode.fid) {																			// determine de noeud à tester pour la fin du segment
				var node = Waze.model.nodes.objects[road.attributes.toNodeID];}
			else {
				var node = Waze.model.nodes.objects[road.attributes.fromNodeID];
			}
			var angle1 = Math.abs(angle (StartNode,node) - angleEnd);
			if (angle1 > 180 ) { angle1= 360 - angle1 ; }																					// angle complémentaire
//alert (angle (StartNode,node)+" angle1 :" + angle1);
			if ( angle1 < angleMin ) {
				angleMin = angle1;
				BestNode = node ;
			}
//alert (BestNode.fid+" "+angleMin);
		}
//alert ("final :"+BestNode.fid);
		return BestNode ;
	}
		
	function angle (node1,node2) {
		var deltaX = (node2.geometry.x - node1.geometry.x);
		var deltaY = (node2.geometry.y - node1.geometry.y);
		return angleDeg (deltaX,deltaY);
	}

	function angleDeg (deltaX,deltaY) {
		if (deltaX == 0) { return ( sign( deltaY ) * 90); }
		if (deltaX > 0 ) { return (AtanDeg( deltaY / deltaX));}
			else { return ((sign( deltaY )* 180) + AtanDeg( deltaY / deltaX)); }
	}
	
	function sign (x) {
		if ( x < 0 ) { return (-1) ;}
			else {return (1) ;}
	}
	
	function AtanDeg ( x) {
		return ( 180 * Math.atan (x) / Math.PI );
	}
	
	function select (Select_IDs)	{
			Select_IDs = delete_multi_Ids (Select_IDs)	;														// suppression des doublons
			var foundSegs =new Array();	
			for (var i = 0; i<Select_IDs.length;i++) {  												
					foundSegs.push(Waze.model.segments.objects[Select_IDs[i]]);					// créer la selection
			}
			Waze.selectionManager.select(foundSegs); 
	}
	
	function delete_multi_Ids (myArray) {
		var myNewArray = new Array();
		if (myArray.length >0) {
			myNewArray[0]= myArray [0];
			for (var i = 0; i < myArray.length; i++) {
				if (notInArray (myArray [i],myNewArray)) {
					myNewArray.push(myArray [i]);
				}
			}
		}
		return myNewArray;
	}
	
  function minInArray (array) {
		if (array.length > 0) {
			var minimum = array [0];
			for (var i = 1; i < array.length; i++) {
				if (array [i] < minimum) {minimum = array [i];}
			}
			return minimum ;
		}
		else return null;
	}
	
	function notInArray (item,array) {
		for (var i = 0; i < array.length; i++) {
			if (item == array [i]) { return false ;}
		}
		return true ;
	}
	
	function isInArray (item,array) {
		for (var i = 0; i < array.length; i++) {
			if (item == array [i]) { return true ;}
		}
		return false ;
	}
	
	function searchRoad(node,roadStart,roadEndID) {
		var roadtype	= roadStart.attributes.roadType;
		var roadStartID = roadStart.fid;
		var roadID = roadStartID;
		var foundSegs  = new Object();																			// object for return parameters
		foundSegs.IDs = new Array();
		foundSegs.roads = new Array();																				//init array 	
		foundSegs.stop = "none";																							//init Stop cause
		foundSegs.IDs.push(roadID);
//alert (foundSegs.IDs);
		var nbSeg = 1;																												//Number of searched segments	
		while ((nbSeg < 50) && (roadID != roadEndID)) {
			var nodeSegIdList = node.attributes.segIDs;													// list of road connected to node
			var sameTypeRoad = new Array();
			for (var i = 0; i < nodeSegIdList.length;i++) { 
				var segID = nodeSegIdList [i];
				var seg1 =Waze.model.segments.objects[segID];
				if (seg1 == null ) return foundSegs;															// le segment n'est pas chargé en mémoire
				else {	
					if ((seg1.attributes.roadType == roadtype) && (seg1.fid != roadID)) {
						sameTypeRoad.push(segID);
					}
				}			
			}

			if (sameTypeRoad.length !=1) {
				if (isInArray (roadEndID,sameTypeRoad)) {	 												// End Road is in the fork
					foundSegs.IDs.push(roadEndID); 																	// We add it and go away
					return foundSegs;
				}	
				sameTypeRoad = validate (sameTypeRoad);														// delete cul-de-sac
			}
			if (sameTypeRoad.length !=1) {																			// not an unique segment (0,2 or more)
				foundSegs.stop = "multiRoads";
				foundSegs.roads = sameTypeRoad ;
				foundSegs.node = node; 
//alert (sameTypeRoad.lengthfoundSegs.IDs);
				return foundSegs; }																								// on retourne le tableau d'Ids s
			else {
				var roadID = sameTypeRoad[0];
				if (isInArray (roadID,foundSegs.IDs)) return foundSegs;						// we are in a lopp : we go away
				foundSegs.IDs.push(roadID);
//alert (sameTypeRoad.length+" "+foundSegs.IDs);
				nbSeg = nbSeg + 1 ;
				var seg2 = Waze.model.segments.objects[roadID];
				if (node.fid == seg2.attributes.fromNodeID) { var nodeID = seg2.attributes.toNodeID; }
					else { var nodeID = seg2.attributes.fromNodeID;}
				var node = Waze.model.nodes.objects[nodeID];

				if (node == null ) return foundSegs;															// It's a cul-de-sac : we go away
			}
		}
		return foundSegs;
	}
	
	function validate (sameTypeRoad) {
		var myNewSameTypeRoad  = new Array();
		for (var i = 0; i < sameTypeRoad.length; i++) {
			var sel = Waze.model.segments.objects[sameTypeRoad[i]];
//alert (sameTypeRoad[i]+" "+sel.attributes.fromNodeID+" "+sel.attributes.toNodeID);
			if ((sel.attributes.fromNodeID !=null) && (sel.attributes.toNodeID!=null)) { //it is not a cul-de-sac
				myNewSameTypeRoad.push (sameTypeRoad[i]);
			}
		}
//alert ( myNewSameTypeRoad.length);
		return myNewSameTypeRoad ;
	}
	
	function choiceStartNode (road1,node3,node4) {
		var node1;
		var node2;

		if (road1.attributes.fromNodeID != null) {																									// test of cul-de-sac & change node if it is
			node1 = Waze.model.nodes.objects[road1.attributes.fromNodeID];}
		else { node1 = Waze.model.nodes.objects[road1.attributes.toNodeID];}
		if (road1.attributes.toNodeID != null) {
			node2 = Waze.model.nodes.objects[road1.attributes.toNodeID];}
		else { node2 = Waze.model.nodes.objects[road1.attributes.fromNodeID];}

		var nodeStart = node1 ;
		var dist_min = distance (node1,node3);
		var dist = distance (node1,node4);
		if (dist < dist_min ) {dist_min=dist;}
		dist = distance (node2,node3);
		if (dist < dist_min ) { dist_min = dist; nodeStart = node2; }
		dist = distance (node2,node4);
		if (dist < dist_min ) { dist_min = dist; nodeStart = node2; }
		return nodeStart;
	}
	
	function distance (node1 , node2) {
		var dist = (node1.geometry.x - node2.geometry.x)*(node1.geometry.x - node2.geometry.x);
		dist = dist + (node1.geometry.y - node2.geometry.y)*(node1.geometry.y - node2.geometry.y);
		return Math.sqrt(dist);
	}
	
	function activateLayer (layerName, flag) {
		if (flag == true || flag == false) {
			switch (layerName.toUpperCase()) {
				case "AERIALS": 				var index = 1 ; break;
				case "CITIES": 					var index = 2 ; break;
				case "ROADS": 					var index = 3 ; break;
				case "GPS POINTS": 			var index = 4 ; break;
				case "AREA MANAGERS":		var index = 6 ; break;
				case "LANDMARKS": 			var index = 7 ; break;
				case "SPEED CAMERAS":		var index = 10; break;
				case "MAP PROBLEMS": 		var index = 12; break;
				case "UPDATE REQUESTS":	var index = 14; break;
				case "EDITABLE AREAS": 	var index = 16; break;
				case "LIVE USERS": 			var index = 25; break;
			}
			if (index != null) {
				var layerID = Waze.map.controls[0].map.layers[index].id;
				Waze.map.controls[33].map.getLayer(layerID).setVisibility(flag);					//affiche le Layer "landmark"  "Waze.Layer.FeatureLayer_60"		
			}
		}
	}

	function afficheObjet (objet) {
		for (var e in objet) {alert("objet["+e+"] ="+ objet[e]+" !");}
	}

	function manage_WME_SSTR(ev) {
		localStorage['WME_SSTR_enable'] = document.getElementById ('WME_SSTR_enable').checked == 1;	
		var road = new Array();
		for (var i = 0; i<Waze.selectionManager.selectedItems.length;i++) {
			var seg = Waze.selectionManager.selectedItems[i];
			if (seg != null && seg.type == "segment") { road.push(seg);}
		}
		if(document.getElementById ('WME_SSTR_enable').checked == 1) {	
			effaceMenu ();
			document.getElementById ('WME_SSTR_All').style.height = "auto";
			if (road.length == 1)  {
				document.getElementById ('WME_SSTR_Side').style.display = "block";
				if (road[0].attributes.roadType == "18") {
					document.getElementById ('WME_SSTR_Pklt').style.display = "block";}
				else {
					document.getElementById ('WME_SSTR_River').style.display = "block";}
			}
			if (road.length >= 1)  {
				document.getElementById ('WME_SSTR').style.display = "block";
				document.getElementById ('WME_SSTR_Ldmk').style.display = "block";
				if (road[0].attributes.junctionID !=null) {
					document.getElementById ('WME_SSTR_Rdt').style.display = "block";
				}
				if (Waze.loginManager.user.normalizedLevel >= 3) {
					document.getElementById ('WME_SSTR_CrgAds').style.display = "block";}
			}
			if (road.length == 2)  {
				document.getElementById ('WME_SSTR_12').style.display = "block";
			}
		}
		else {
			document.getElementById ('WME_SSTR_All').style.height = "40px";
			effaceMenu ();
		}
		return;
	}
	
	function effaceMenu () {
		document.getElementById ('WME_SSTR_All').style.height = "38px";
		document.getElementById ('WME_SSTR').style.display = "none";
		document.getElementById ('WME_SSTR_Side').style.display = "none";
		document.getElementById ('WME_SSTR_12').style.display = "none";
		document.getElementById ('WME_SSTR_River').style.display = "none";
		document.getElementById ('WME_SSTR_Pklt').style.display = "none";
		document.getElementById ('WME_SSTR_Ldmk').style.display = "none";
		document.getElementById ('WME_SSTR_Rdt').style.display = "none";
		document.getElementById ('WME_SSTR_CrgAds').style.display = "none";
	}
	
	function manageSmoothRiver () {	
		if (document.getElementById ('WME_SSTR_SmthRvr').checked == 1) {		// recopie river sur Parling lot
			document.getElementById ('WME_SSTR_SmthPlt').checked = 1 }
		else {
			document.getElementById ('WME_SSTR_SmthPlt').checked = 0 }
		localStorage['WME_SSTR_Smth'] = document.getElementById ('WME_SSTR_SmthRvr').checked == 1;	
		return;
	}
			
	function manageSmoothPklt () {
		if (document.getElementById ('WME_SSTR_SmthPlt').checked == 1) {  	// recopie Parling lot sur river
			document.getElementById ('WME_SSTR_SmthRvr').checked = 1 }
		else {
			document.getElementById ('WME_SSTR_SmthRvr').checked = 0 }
		localStorage['WME_SSTR_Smth'] = document.getElementById ('WME_SSTR_SmthPlt').checked == 1;	
		return;
	}
	
	function init_WME_SSTR() {
		if (localStorage['WME_SSTR_enable']=='true') {																				// restaure old Values (if exist)
			document.getElementById ('WME_SSTR_enable').checked = 1 ;}
		if (localStorage['WME_SSTR_Smth']=='true') {
			document.getElementById ('WME_SSTR_SmthRvr').checked = 1 ;
			document.getElementById ('WME_SSTR_SmthPlt').checked = 1 ;
		}
		
		document.getElementById('WME_SSTR_enable').	onclick = manage_WME_SSTR;
		document.getElementById('WME_SSTR_SmthRvr').onclick = manageSmoothRiver;
		document.getElementById('WME_SSTR_SmthPlt').onclick = manageSmoothPklt;
		manage_WME_SSTR();
		Waze.selectionManager.events.register("selectionchanged", null, manage_WME_SSTR);
		console_log("Select Same Type Roads initialized");
	}

  function console_log(msg) {
    if (console.log) 
      console.log(msg);
  }
	
}

selectSameTypeRoad();