// ==UserScript==
// @name        java map v2 explore addons
// @namespace   http://www.war-facts.com/message.php?player=12152
// @include     http://www.war-facts.com/extras/view_universe.php?fleet=*
// @version     1
// ==/UserScript==

var tempArray = new Array();
var starArray = new Array();
var fleetSelected = 0;
var fleetSelectedId = 0;
window.loadJavaMapAddon = function(){


var to = document.getElementsByClassName("quickLinks")[0];
to.style.height = "200px";
to.style.overflow = "auto";

var butonnode= document.createElement('input');
butonnode.setAttribute('type','button');
butonnode.setAttribute('name','explore next');
butonnode.setAttribute('value','explore next');
butonnode.onclick=exploreNext;
to.insertBefore(butonnode,to.firstChild);

function exploreNext () {

//console.log ("starting exploreNext");
var strng = document.location.toString();
//console.log ("x:"+strng.split('&')[1].split('=')[1]);
//console.log ("y:"+strng.split('&')[2].split('=')[1]);
//console.log ("z:"+strng.split('&')[3].split('=')[1].split('#')[0]);
var mapCenterX = strng.split('&')[1].split('=')[1];
var mapCenterY = strng.split('&')[2].split('=')[1];
var mapCenterZ = strng.split('&')[3].split('=')[1].split('#')[0];
var mapSize = 25000;
fleetSelected = parseInt(strng.split('&')[0].split('=')[1]);
fleetSelectedId = fleetSelected;
//console.log("fleet:"+fleetSelected);

loadContent("/ajax/jsmap_postload_v2.php?centerX="+mapCenterX+"&centerY="+mapCenterY+"&centerZ="+mapCenterZ+"&displayRange="+mapSize, exploreNextLoaded);

}
function exploreNextLoaded(starList)
				{

					//console.log("responded: "+starList);
					var posTemp;
					var missTemp;
					var mColor;

					starArray.length = 0;
					

					var fleetSelectedI = 0;

					var stars = starList.split("\n");
					for ( var i in stars )
					{
						var starData = stars[i].split("\t");
						if (starData[2])
						{
							// Yes, I know this sucks. The format was meant for a lot less data, so I had to fill the gaps to keep it lean without rewriting everything. :(
							// 0: ID (stars positive, everything else negative)
							// 1: Star type (>0) or char defining type
							// 2: Icon size (star magnitude)
							// 3: X (for world and fleets: transmitted as xyz combined with \f)
							// 4: Y (for fleets transmitted: position, for worlds transmitted: real local coords)
							// 5: Z (for fleets transmitted: mission local coords)
							// 6: Item Name
							// 7: # planets / habitability / mission x (transmitted x/y/z/objective with \f) / wormhole position
							// 8: owned colonies in system / world: colony IDs seperated by \f / mission y (transmitted: fleet mission target) / bookmark system ID if on top of system
							// 9: sun_age / world: colony names seperated by \f / mission z (for local fleets and wormholes transmitted: real local coords \f)
							// 10: is named / fleet scanner range (positive) / foreign fleets relation (negative)
							// 11: fleet travel range (positive) / foreign fleet numbers (negative) / world system ID ! STAR,BOOKMARK UNUSED
							// 12: World: ID of owned colony / fleet max travel range / foreign fleet tonnate (negative) / Empire bookmark type / ! STAR UNUSED
							// 13: mark for buffered display element
							// 14: mark for label set on display element
							// 15 (transmitted as 13): world class / fleet owner name / Empire rally relation / Star raw temp (transmitted as 1)
							// 16 (transmitted as 14): world image link / fleet owner ID / Empire rally comments / Star raw size (transmitted as 2)
							// 17: mark for "in range" when a fleet is selected.
							// 18: Fleets: position (transmitted as 4) / Worlds and wormholes: real local coords (transmitted as 4 and 9)
							// 19: Fleets: mission target (transmitted as 8)
							// 20: Fleets: local coords separated by \f (transmitted as 9)
							// 21: Controlled Fleets: mission local coords  separated by \f (transmitted as 5)
							// 22: Controlled Fleets: Mission color
							// 23: Controlled Fleets: Mission Objective
							// 24: Controlled Fleets: Speed (transmitted as 15)
							// 25: Fleet world/colony ID if applicable: Speed (transmitted as 16)

							if (parseInt(starData[0]) > 0)
							// Modify sizes for stars
								tempArray.push([parseInt(starData[0]), Math.floor(parseInt(starData[1])/1000), Math.round(Math.pow(parseInt(starData[2]), 0.1)*50),
									parseInt(starData[3]),parseInt(starData[4]),parseInt(starData[5]),starData[6],parseInt(starData[7]),parseInt(starData[8]),parseInt(starData[9]),
									parseInt(starData[10]),0, 0, 0, 0, starData[1], starData[2], 0]);

							else if (starData[1] == "p") {
								// Planets (seperate sizes, too)
								posTemp = starData[3].split("\f");
								tempArray.push([parseInt(starData[0]),starData[1],Math.round(Math.pow(parseInt(starData[2]), 0.1)*15),
									parseInt(posTemp[0]),parseInt(posTemp[1]),parseInt(posTemp[2]),starData[6],parseInt(starData[7]),starData[8].split('\f'),starData[9].split('\f'),
									parseInt(starData[10]),parseInt(starData[11]),parseInt(starData[12]), 0, 0, starData[13], starData[14], 0, starData[4]]);

							} else if (starData[1] == "f") {
								// Fleet marked?
								if (fleetSelected && fleetSelected == (-1 * starData[0])) fleetSelectedI = tempArray.length;

								// Fleets just need way more data, so some fields are subsplit with /f
								posTemp = starData[3].split("\f");
								missTemp = starData[7].split("\f");

								// Get mission color index for controlled fleet
								if (missTemp[3]) {
									// 'transfer','explore','assault','conquer','transport','reinforce','colonize','support','jump'
									if (missTemp[3] == 'transfer' || missTemp[3] == 'jump') mColor = "#999999";
									else if (missTemp[3] == 'transport' || missTemp[3] == 'colonize' || missTemp[3] == 'explore') mColor = "#00cc00";
									else if (missTemp[3] == 'reinforce') mColor = "#ff8800";
									else if (missTemp[3] == 'assault' || missTemp[3] == 'conquer' || missTemp[3] == 'support') mColor = "#990000";
								} else if (missTemp[0] || missTemp[1] || missTemp[2]) {
									// Mission color (by relation) for other fleets
										if (starData[10] <= -10)
											mColor = "#000066";
										else if (starData[10] <= -6)
											mColor = "#666666";
										else
											mColor = "#ff2200";
								}
								tempArray.push([parseInt(starData[0]),starData[1],parseInt(starData[2]),parseInt(posTemp[0]),parseInt(posTemp[1]),parseInt(posTemp[2]),
									starData[6],parseInt(missTemp[0]),parseInt(missTemp[1]),parseInt(missTemp[2]),parseInt(starData[10]),parseInt(starData[11]),parseFloat(starData[12]),
									0, 0, starData[13], starData[14], 0, starData[4], starData[8], starData[9], starData[5], mColor, missTemp[3], parseFloat(starData[15]), parseFloat(starData[16])]);


							} else if (starData[1] == "qc" || starData[1] == "qf") {
								// Quicklinks
								/*
								qlItem = document.createElement('div');
								qlItem.innerHTML = starData[2];
								if (parseInt(starData[6]) == 2) qlItem.className = 'inCombat';
								else if (parseInt(starData[6]) == 1) qlItem.className = 'onMission';
								else qlItem.className = 'normal';
								qlItem.oncontextmenu = function(e) { if (!e) var e = window.event; return cancelEvent(e);};
								qlItem.onselectstart = function(e) { if (!e) var e = window.event; return cancelEvent(e);};
								(function() {
									var x = parseInt(starData[3]);
									var y = parseInt(starData[4]);
									var z = parseInt(starData[5]);
									qlItem.onclick = function() {
										goTo(x, y, z);
									}
								})();
								if (starData[1] == "qc") quickLinksCol.appendChild(qlItem);
								else quickLinksFleet.appendChild(qlItem);
								*/
							}
							else
								tempArray.push([parseInt(starData[0]),starData[1],parseInt(starData[2]),parseInt(starData[3]),parseInt(starData[4]),parseInt(starData[5]),starData[6],
									starData[7],parseInt(starData[8]), 0, 0, 0, starData[12], 0, 0, starData[13], starData[14], 0, starData[9]]);
						}
					}
					
					// Fleet was selected, select it "again".
                    //find correct ID
					fleetSelectedI = 0;
					for (var i=0; i<tempArray.length; i++)
					{
					if (fleetSelected && fleetSelected == (-1 * tempArray[i][0])) fleetSelectedI = i;
					}
					
				    if (fleetSelectedI) {
						fleetSelected = fleetSelectedI;
						//entityClicked(fleetSelectedI, "0");
					}
					
					//console.log (tempArray[fleetSelected]);
					//eliminate already incoming fleets
					for (var j=0; j<tempArray.length;j++)
					{
					
					    var dist = getDistanceTemp(fleetSelected,j);    
    					var add = true;
    					
    					if (tempArray[j][0]>0)
    					{
    					//console.log (tempArray[j][0]+" "+dist+" "+(tempArray[fleetSelected][11] -250)+" "+fleetSelected);
    					
    					if (dist > tempArray[fleetSelected][11] - 250)
    					   continue;
    				    
    					}
    					for (var i=0; i<tempArray.length;i++)
    					{
        					if (tempArray[i][1] != "f")
        					   continue;
    
          					if (tempArray[i][19] != "g")
          					   continue;
            					
            				if (tempArray[7] || tempArray[8] || tempArray[9])
            					{
                                var cordX = tempArray[i][7];
                                var cordY = tempArray[i][8];
                                var cordZ = tempArray[i][9];
                                
                                //console.log("exclude: "+cordX+ " "+cordY+" "+cordZ);
                				
                				if (cordX == tempArray[j][3])
                				if (cordY == tempArray[j][4])
                				if (cordZ == tempArray[j][5])
                				{
                				    
                				    if (tempArray[j][0] > 0)
                				    {
                				    //console.log("excluded: "+tempArray[j][0]);
                				    add = false;
                				    
                				    }
                				}	
            				}
      					}
    					if (add)
    					{
    					   starArray.push(tempArray[j]);
    					}
					
					}
					tempArray.length = 0;
					tempArray = [];
					
					var strng = document.location.toString();
					fleetSelected = parseInt(strng.split('&')[0].split('=')[1]);
					//find correct ID
					fleetSelectedI = 0;
					for (var i=0; i<starArray.length; i++)
					{
					if (fleetSelected && fleetSelected == (-1 * starArray[i][0])) fleetSelectedI = i;
					}
					
				    if (fleetSelectedI) {
						fleetSelected = fleetSelectedI;
						//entityClicked(fleetSelectedI, "0");
					}
					// Fleet was selected, select it "again".
					//console.log(starArray[0]);
					//console.log(starArray.length);
					
					var min = 200000000;
					var idmin = 0;
					for (var j=0; j<starArray.length; j++)
    					{
    					if (starArray[j][0] > 0)
    					   {
    					   if (starArray[j][8])
    					       continue;
    					   
    					   if (starArray[j][9])
    					       continue;
    					   
    					   var thisDist = getDistance(fleetSelected,j);
    					   if (thisDist < min)
    					   {
    					   min = thisDist;
    					   idmin = j;
    					   //console.log(thisDist);
    					   }
    					   }
    					}
    			//     console.log(starArray[idmin][3]+ " " +starArray[idmin][4]+ " "+starArray[idmin][5]);
    			     //document.location = "http://www.war-facts.com/fleet_navigation.php??tpos=global&fleet="+fleetSelectedId+"&x="+starArray[idmin][3]+"&y="+starArray[idmin][4]+"&z="+starArray[idmin][5]+"&launch=1";
				
				//if (min > )
				//{
				//}
				//else
				//{
				
				if (min > (starArray[fleetSelected][11] - 250))
				{
				starArray.length = 0;
				tempArray.length = 0;
				starData.length = 0;
				stars.length = 0;
				
					starArray = [];
					
				butonnode.onclick = null;
				butonnode.setAttribute('name','no can do');
                butonnode.setAttribute('value','no can do');	
                butonnode.style.backgroundColor = '#ff0000';
				}
				else
				{
				fleetLinkGlobal("launch=1&mtype=explore&fleet="+fleetSelectedId+"&tpos=global&x="+starArray[idmin][3]+"&y="+starArray[idmin][4]+"&z="+starArray[idmin][5]);
				
				starArray.length = 0;
				tempArray.length = 0;
				starData.length = 0;
				stars.length = 0;
								
					starArray = [];
					
				butonnode.onclick = null;
				butonnode.setAttribute('name','sent');
                butonnode.setAttribute('value','sent');
                butonnode.style.backgroundColor = '#00ff00';
				}
				
				}
				
				// Distance between two objects. i must be fleet or planet, z may be anything.
				function getDistance(i, z) {
					// $duration = ceil($distance / (1 + $fleetstats['speed'] * 3600 / 1000) + 1);
					var distance = 0;
					var lCoords2;
					var gCoords2;
					var exitAdd2;

					if (!starArray[z][0]) return 0;
					
					// Coord extraction
					if (starArray[i][1] == 'p' || starArray[i][18] != 'g') {
						if (starArray[i][1] == 'p') var lCoords = starArray[i][18].split('\f');
						else var lCoords = starArray[i][20].split('\f');
						// Distance to system exit
						var exitAdd = (Math.sqrt(Math.pow(lCoords[0]-100, 2) + Math.pow(lCoords[1]-100, 2) + Math.pow(lCoords[2]-100, 2)));
						// Backtrack system global coords from local and map coords
						var gCoords = [(starArray[i][3] - lCoords[0] * 10), (starArray[i][4] - lCoords[1] * 10), (starArray[i][5] - lCoords[2] * 10)];
					}
					else {
						var exitAdd = 0;
						var gCoords = [starArray[i][3], starArray[i][4], starArray[i][5]];
					}

					// Global position
					if (starArray[z][0] > 0 || starArray[z][1] == 'e' || starArray[z][1] == 'r' ||
						(starArray[z][1] == 'f' && starArray[z][18] == 'g') || (starArray[z][1] == 'w' && starArray[z][7] == 'g') )
						distance = exitAdd + (Math.sqrt(Math.pow(gCoords[0]-starArray[z][3], 2) + Math.pow(gCoords[1]-starArray[z][4], 2) + Math.pow(gCoords[2]-starArray[z][5], 2)));
					else if (starArray[z][1] != 'qc' && starArray[z][1] != 'qf') {
						// local position
						if (starArray[z][1] == 'f') {
							lCoords2 = starArray[z][20].split('\f');
							gCoords2 = [(starArray[z][3] - lCoords2[0] * 10), (starArray[z][4] - lCoords2[1] * 10), (starArray[z][5] - lCoords2[2] * 10)];
						}
						else if (starArray[z][1] == 'p' || starArray[z][1] == 'w') {
							lCoords2 = starArray[z][18].split('\f');
							gCoords2 = [(starArray[z][3] - lCoords2[0] * 10), (starArray[z][4] - lCoords2[1] * 10), (starArray[z][5] - lCoords2[2] * 10)];
						}
						// Rally points cannot be local!
						//
						// Both local with same global coords = same system
						if (gCoords[0] == gCoords2[0] && gCoords[1] == gCoords2[1] && gCoords[2] == gCoords2[2] && (starArray[i][1] == 'p' || starArray[i][18] != 'g'))
							distance = (Math.sqrt(Math.pow(lCoords[0]-lCoords2[0], 2) + Math.pow(lCoords[1]-lCoords2[1], 2) + Math.pow(lCoords2[2]-lCoords[2], 2)));
						else {
							exitAdd2 = Math.sqrt(Math.pow(lCoords2[0]-100, 2) + Math.pow(lCoords2[1]-100, 2) + Math.pow(lCoords2[2]-100, 2));
							distance = exitAdd2 + exitAdd + (Math.sqrt(Math.pow(gCoords[0]-gCoords2[0], 2) + Math.pow(gCoords[1]-gCoords2[1], 2) + Math.pow(gCoords[2]-gCoords2[2], 2)));
						}
					}
					return distance;
				}
				
				
				function getDistanceTemp(i, z) {
					// $duration = ceil($distance / (1 + $fleetstats['speed'] * 3600 / 1000) + 1);
					var distance = 0;
					var lCoords2;
					var gCoords2;
					var exitAdd2;

					if (!tempArray[z][0]) return 0;
					
					// Coord extraction
					if (tempArray[i][1] == 'p' || tempArray[i][18] != 'g') {
						if (tempArray[i][1] == 'p') var lCoords = tempArray[i][18].split('\f');
						else var lCoords = tempArray[i][20].split('\f');
						// Distance to system exit
						var exitAdd = (Math.sqrt(Math.pow(lCoords[0]-100, 2) + Math.pow(lCoords[1]-100, 2) + Math.pow(lCoords[2]-100, 2)));
						// Backtrack system global coords from local and map coords
						var gCoords = [(tempArray[i][3] - lCoords[0] * 10), (tempArray[i][4] - lCoords[1] * 10), (tempArray[i][5] - lCoords[2] * 10)];
					}
					else {
						var exitAdd = 0;
						var gCoords = [tempArray[i][3], tempArray[i][4], tempArray[i][5]];
					}

					// Global position
					if (tempArray[z][0] > 0 || tempArray[z][1] == 'e' || tempArray[z][1] == 'r' ||
						(tempArray[z][1] == 'f' && tempArray[z][18] == 'g') || (tempArray[z][1] == 'w' && tempArray[z][7] == 'g') )
						distance = exitAdd + (Math.sqrt(Math.pow(gCoords[0]-tempArray[z][3], 2) + Math.pow(gCoords[1]-tempArray[z][4], 2) + Math.pow(gCoords[2]-tempArray[z][5], 2)));
					else if (tempArray[z][1] != 'qc' && tempArray[z][1] != 'qf') {
						// local position
						if (tempArray[z][1] == 'f') {
							lCoords2 = tempArray[z][20].split('\f');
							gCoords2 = [(tempArray[z][3] - lCoords2[0] * 10), (tempArray[z][4] - lCoords2[1] * 10), (tempArray[z][5] - lCoords2[2] * 10)];
						}
						else if (tempArray[z][1] == 'p' || tempArray[z][1] == 'w') {
							lCoords2 = tempArray[z][18].split('\f');
							gCoords2 = [(tempArray[z][3] - lCoords2[0] * 10), (tempArray[z][4] - lCoords2[1] * 10), (tempArray[z][5] - lCoords2[2] * 10)];
						}
						// Rally points cannot be local!
						//
						// Both local with same global coords = same system
						if (gCoords[0] == gCoords2[0] && gCoords[1] == gCoords2[1] && gCoords[2] == gCoords2[2] && (tempArray[i][1] == 'p' || tempArray[i][18] != 'g'))
							distance = (Math.sqrt(Math.pow(lCoords[0]-lCoords2[0], 2) + Math.pow(lCoords[1]-lCoords2[1], 2) + Math.pow(lCoords2[2]-lCoords[2], 2)));
						else {
							exitAdd2 = Math.sqrt(Math.pow(lCoords2[0]-100, 2) + Math.pow(lCoords2[1]-100, 2) + Math.pow(lCoords2[2]-100, 2));
							distance = exitAdd2 + exitAdd + (Math.sqrt(Math.pow(gCoords[0]-gCoords2[0], 2) + Math.pow(gCoords[1]-gCoords2[1], 2) + Math.pow(gCoords[2]-gCoords2[2], 2)));
						}
					}
					return distance;
				}			
				
				function fleetConfigure(string) {
						loadContent('/ajax/fleet.php', function(result) {
							if (!result)
								alert("Communication error. Please try again later.");
							else if (result != "OK")
								alert(result);
							else {
								//loadMapView();
								console.log("success");
							}
						}
						,string, "POST");
					}
					fleetLinkGlobal = fleetConfigure;
}

window.addEventListener('load',window.loadJavaMapAddon,false);