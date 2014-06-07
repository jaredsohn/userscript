// ==UserScript==
// @name           Planets.nu - improved Ship List View
// @description    Miscellaneous Improvements to the Ship List View
// @include        http://planets.nu/home
// @include        http://play.planets.nu/*
// @include        http://planets.nu/*
// @include	   http://test.planets.nu/*
// @version 2.2

// ==/UserScript==
// 0.1 - Adds back Ship Name. Color codes HYPing ship names depending on travel distance and fc set.
// 0.2 - Adds destination field. Now can activate/deactivate in the settings screen.
// 0.3 - Checks for local warp well being in first leg of multi-leg journey. Displays what Planet's Warpwell its going to
// 0.4 - Checks for ships moving long distances at warp 1. fixes check for HYP so it looks at first destination, not just final. 
// 0.5 - Trying out ToUpper function to avoid case sensitivity. Add check for NTP and BDM code
// 0.6 - Corrects Fleet view bug. Adds color coded cloaking status to ship name
// 0.7 - Checks for ships that are just outside the Warp Well (3 to 5 LY from planet)
// 0.8 - Looks for ships going warp 7 or warp 8, but think they're going like a warp 9 engine
// 0.9 - Updated for new site. New message for HYP ships with FC set, but no movement
// 1.0 - Updated for v3 API.
// 1.1 - New total ship view
// 1.21 - Adds current location, dynamic filters, can jump to owned ship
// 1.22 - Buttons are now dynamic as well (display Show or Hide depending on current state)
// 1.3 - Added new set fleet destination button in Ship/Fleet view.
// 1.31 - Changed Fleet to Fleet/Command. Added in ability to change FC from F/C view.
// 1.32 - Added in Checkbox control in F/C
// 1.33 - Adds listing in all views of what the current ship mission is
// 1.4 - Can now select ship mission from dropdown in Fleet/Command view. Adds Total Ship View to play.planets.nu (v3 API) client.
// 1.41 - Minor fixes for play.planets.nu client
// 1.42 - Fleet commands now sets all waypoints and updates destination text. Will no longer allow cloak to be set improperly. Can click on left side of Fleet/Commmand view to jump to ship
// 1.5 - Renamed Fleet/Command to Commmand. Command view applies to all ships at location, and will popup how many ships are low on fuel. New fleet view added (v2 only in 1.5.0)
// 1.6 - Fleet view now mirrors all functionality of command view. Will display fleet/flagship only, and can click on a fleet to show members. Clicking on fleet member will jump to that ship.
// 1.7 - Fleet view's set destination command only effect ships in that fleet. Fixed Fleet headers. Fleet lines are now bolded (ship lines regular font)
// 1.8 - Checks pillage and RGA missions for potential problems
// 1.81 - Added fleet view to v3 client
// 1.82 - added new check for warp well dance problems, adjusted distances for Warp 7/8 movement checks
// 1.9 - Adds "Whats interesting view" (only in new client currently)
// 2.0 - Adds "Whats interesting view" to all clients. Checks for gravitonic acceleration for speed/distancec
// 2.1 - Checks now for towing unfueled enemy ships to planets set to NUK
// 2.2 - Checks for ships running out of fuel - engine highlighted in orange (or red - if also too slow for destination)

function wrapper () { // wrapper for injection
    
    var modShipList = true;
    var showShip = [true,true,true,true,true,true,true,true,true,true,true,true];
    
    oldShowShips =  vgapDashboard.prototype.showShips;
 
	var fleetNames2=new Array();
	var fleetFlagships2=new Array();
	var fleetSizes2=new Array();
	var showFleet=new Array();
	
    vgapDashboard.prototype.showShips = function (view) {
        
        if (modShipList==false)
            oldShowShips.apply(this,arguments);
        //alert("working");
        else if (vgaPlanets.prototype.version>=3)
        {
            vgap.playSound("button");
            vgap.closeSecond();
            
            this.content.empty();
            
            //filter messages
            var html = "";
            
            if (!view)
                view = 0;
            
            var filterMenu = $("<ul class='FilterMenu'></ul>").appendTo(this.content);
            $("<li " + (view == 0 ? "class='SelectedFilter'" : "") + ">Status</li>").tclick(function() { vgap.dash.showShips(0); }).appendTo(filterMenu);
            $("<li " + (view == 1 ? "class='SelectedFilter'" : "") + ">Cargo View</li>").tclick(function() { vgap.dash.showShips(1); }).appendTo(filterMenu);
            $("<li " + (view == 2 ? "class='SelectedFilter'" : "") + ">Command View</li>").tclick(function() { vgap.dash.showShips(2); }).appendTo(filterMenu);
            $("<li " + (view == 3 ? "class='SelectedFilter'" : "") + ">Notes View</li>").tclick(function() { vgap.dash.showShips(3); }).appendTo(filterMenu);
            //---------------START NEW CODE-----------------------
            $("<li " + (view == 4 ? "class='SelectedFilter'" : "") + ">Complete Ship List</li>").tclick(function() { vgap.dash.showShips(4); }).appendTo(filterMenu);
			$("<li " + (view == 5 ? "class='SelectedFilter'" : "") + ">Fleet View (experimental)</li>").tclick(function() { vgap.dash.showShips(5); }).appendTo(filterMenu);
			$("<li " + (view == 6 ? "class='SelectedFilter'" : "") + ">What's Interesting (experimental)</li>").tclick(function() { vgap.dash.showShips(6); }).appendTo(filterMenu);
            //---------------END NEW CODE-----------------------
            
            
            //loop through all ships and show the ones owned by this player
            html += "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 30) + "px;'>";
            //---------------START NEW CODE-----------------------
            if (view==4)
            {
                //html += "<button type='button' class='TestButton' onClick='changeOne();'> Display 1 </button>";
                html += "<table rules='all' border='1' width='100%'>";	
                if(showShip[0]==true)
                    html += "<tr><td><button type='button' class='TestButton' onClick='changeShow(0);'> Hide Unknown </button></td>"
                    else
                        html += "<tr><td><button type='button' class='TestButton' onClick='changeShow(0);'> Display Unknown </button></td>"
                        for (var i=1;i<12;i++)
                        {
                            if(showShip[i]==true)
                                html += "<td><button type='button' class='TestButton' onClick='changeShow("+i+");'> Hide " + i + " </button></td>"
                                else
                                    html += "<td><button type='button' class='TestButton' onClick='changeShow("+i+");'> Display " + i + " </button></td>"
                        }
            }
            html += "</tr></table>";
            //---------------END NEW CODE-----------------------
            html += "<table id='ShipTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
            
            //---------------START NEW CODE-----------------------
			if (view==5)
			{
				//html += "<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'> Flagship Hull</th><th align='left'> Flagship Id</th><th align='left'>Flagship Hull</th><th align='left'>Flagship Name</th><th title='Destination' align='left'>Destination</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th>";
				 html+="<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'>FS Destination</th><th align='left'>Hull</th><th align='left'>ID</th><th align='left'>Shipname</th><th align='left'>Mission</th>";
				  html += "<th title='Battle value' align='left'>Battle Value</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th><th title='Neutronium Fuel' align='left'>N</th>";
                //---------------START NEW CODE-----------------------
                html += "<th title='Friendly Code' align='left'>FC</th>";
                html += "<th title='Set Fleets Destination to This Ships Destination' align='left'>Set Fleet Dest</th>";
                html += "<th title='Ready Checkbox Status' align='left'>R</th>";	
			}
			else if (view==4)
                html += "<th align='left'>Race ID</th><th align='left'>Race Name</th><th align='left'>Id</th><th align='left'>Hull</th><th title='Ship Name' align='left'>Ship Name</th><th title='Destination' align='left'>Destination</th>";
            else if (modShipList)
                html += "<th align='left'>Hull</th><th align='left'>Id</th><th title='Ship Name' align='left'>Ship Name</th><th title='Destination' align='left'>Destination</th><th title='Ship Mission' align='left'>Mission</th>";
            else	//original code
                //---------------END NEW CODE-----------------------
                html += "<th align='left'>Hull</th><th align=left>Id</th>";	
            
            if (view == 1)
                html += "<th title='Megacredits' align='left'>MC</th><th title='Supplies' align='left'>S</th><th title='Neutronium' align='left'>N</th><th title='Duranium' align='left'>D</th><th title='Tritanium' align='left'>T</th><th title='Molybdenum' align='left'>M</th><th title='Torpedos or Fighters' align='left'>Ammo</th>";
            if ((view == 0)||(view==6)) {
                
                html += "<th title='Hull' align='left'>Hull</th><th title='Engine' align='left'>Engine</th><th title='Beams' align='left'>Beams</th><th align='left'>Torps/Bays [Ammo]</th><th title='Damage' align='left'>Dam</th><th title='Crew' align='left'>Crew</th><th title='Friendly Code' align='left'>FC</th><th title='Ready Checkbox Status' align='left'>R</th>";
                
            }
            
            if (view == 2)
            {
                html += "<th title='Battle value' align='left'>Battle Value</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Target Coordinates' align='left'>Tx-Ty</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th><th title='Neutronium Fuel' align='left'>N</th>";
                //---------------START NEW CODE-----------------------
                html += "<th title='Friendly Code' align='left'>FC</th>";
                html += "<th title='Set Fleets Destination to This Ships Destination' align='left'>Set Fleet Dest</th>";
                html += "<th title='Ready Checkbox Status' align='left'>R</th>";
                //---------------END NEW CODE------------------
            }
            if (view == 3)
                html += "<th title='Notes' align='left'>Notes</th><th title='Ready Checkbox Status' align='left'>R</th>";
            //---------------START NEW CODE-----------------------
            if (view==4)
                html += "<th title='Current Location' align='left'>Location</th><th title='Hull' align='left'>Hull</th><th title='Speed'  align='left'>Speed</th><th title='Friendly Code' align='left'>FC</th>";
            //html += "<th title='Damage' align='left'>Dam</th><th title='Crew' align='left'>Crew</th><th title='Loaded Torps or Fighters' align='left'>Ammo</th";
            //---------------END NEW CODE-----------------------
            
                     
            
            html += "</thead><tbody id='ShipRows' align=left  >";
            html += "</tbody></table>";
            html += "</div>";
            
            this.pane = $(html).appendTo(this.content);
            
            for (var i = 0; i < vgap.myships.length; i++) 
            {
                var ship = vgap.myships[i];
                var hull = vgap.getHull(ship.hullid);
                var dam = (ship.damage > 0 ? "<span class='WarnText'>" + ship.damage + "%</span>" : ship.damage + "%");
                var crew = (ship.crew < hull.crew ? "<span class='WarnText'>" + ship.crew + "</span>" : ship.crew);
                
				var show=0;
				var temphtml = "";
                var html = "";
                //-----------------START NEW CODE------------------
                if ((view!=4)&&(view!=5))
                { 
                    if (modShipList)
                    {
                        var hyp=0;//0=none, 1=yellow, 2=red, 3=green, 4=blue
                        var cloak=0;//0=none, 1=yellow, 2=red, 3=green, 4=blue
                        var destination="Deep Space";
                        var dest = vgap.getDest(ship);
                        var distance = Math.dist(ship.x, ship.y, ship.targetx,ship.targety);
                        
						if (view==2)
							temphtml += '<tr><td onclick="vgap.map.selectShip(' + ship.id + ');"><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td><td onclick="vgap.map.selectShip(' + ship.id + ');">' + ship.id + '</td>';
						else
							temphtml += '<tr><td><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td><td>' + ship.id + '</td>';
                        
                        
                        if (hull.cancloak)
                        {
                            if (ship.iscloaked)
                            {
                                if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
                                cloak=3 //cloaked now, will be cloaked.
                                else 
                                    cloak=1 //cloaked now, but won't be cloaked.
                            }
                            else if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
                            cloak=4; //not cloaked now, but will be cloaked
                            else
                                cloak=2; //not cloaked now, won't be cloaking
                        }
                        
                        
                        
                        if ((ship.hullid==87)||(ship.hullid==77)||(ship.hullid==51))
                        {
                            if ((ship.friendlycode=="HYP")||(ship.friendlycode=="hyp")||(ship.friendlycode.toUpperCase()=="HYP"))
                            {
                                if (distance==0) hyp=5;
                                else if (distance<20) hyp=1;
                                else if ((distance<340) || (distance>360)) hyp=2;
                                else hyp=3;
                            }
                            else
                            {
                                if ((distance>=340)&&(distance<=360))
                                hyp=2;
                                else 
                                    hyp=4;			
                            }	
                        }
                        
                        if (hyp>0) switch (hyp)
                        {
                            case 1: temphtml+="<td style='color:yellow' title='FC is HYP and destination less than 20 LY'>";
							show=1;
                                break;
                            case 2: temphtml+="<td style='color:red' title='Warning: Check Friendly Code and Destination Distance'>";
							show=1;
                                break;
                            case 3: temphtml+="<td style='color:green' title='No HYP problems seen'>";
                                break;
                            case 4: temphtml+="<td style='color:lightblue' title='Ship not set to HYP'>";
                                break
                                case 5: temphtml+="<td style='color:aqua' title='Ship set to HYP, no destination set'>";
                                break
                                default: temphtml+="<td>";
                        }
                        else if (cloak>0) switch (cloak)
                        {
                            case 1: temphtml+="<td style='color:yellow' title='Ship is cloaked now. No cloak mission set for next turn'>";
                                break;
                            case 2: temphtml+="<td style='color:red' title='Ship is uncloaked now. No cloak mission set for next turn'>";
                                break;
                            case 3: temphtml+="<td style='color:green' title='Ship is cloaked now. Cloak mission is set for next turn'>";
                                break;
                            case 4: temphtml+="<td style='color:lightblue' title='Ship is uncloaked now. Cloak mission set for next turn'>";
                                break
                                default: temphtml+="<td>";        
                        }
                        else temphtml+="<td>";  
                        
                        
                        temphtml += ship.name+"</td>";
                        
                        
                        var output=betterWarpWell(dest.x,dest.y);
						                        
                        if (output!="0")
                            destination = output;
                        
                        if (ship.target != null)
                            destination = ship.target.name.substr(0, 20);	        
                        
                        if (output.search("Outside ")!=-1)
							{
                            temphtml+="<td style='color:orange' title='Destination is outside the Warp Well'>" + destination + "</td>";
							show=1;
							}
                        else if (ship.waypoints.length>0)
                        {
                            if ((vgap.warpWell(ship.targetx,ship.targety))&&(distance<=3))
								{
								temphtml+="<td style='color:red' title='First waypoint of multi-leg journey is local warpwell'>" + destination + "</td>";
								show=1;
								}
							else if ((distance>3)&&(ship.warp==1))
								{
								temphtml+="<td style='color:yellow' title='Ship is trying to go more than 3 LY at warp 1 '>" + destination + "</td>";
								show=1;
								}
							else if ((output.search("Warpwell")!=-1)&&(ship.warp>1)&&(distance<2))
								{
								temphtml+="<td style='color:orange' title='Ship is trying to move 1 LY in a warpwell at greater than warp 1 '>" + destination + "</td>";
								show=1;
								}
							else
                                temphtml+= "<td>" + destination + "</td>";
                        }
                        else if ((distance>3)&&(ship.warp==1))
							{
							temphtml+="<td style='color:yellow' title='Ship is trying to go more than 3 LY at warp 1 '>" + destination + "</td>";
							show=1;
							}
						else	
                            temphtml+= "<td>" + destination + "</td>";
                        
						var SelfAssault=0;
						if ((vgap.player.raceid==4) || (vgap.player.raceid==10))
							if (ship.mission == 8) 
								{
									var AssaultTarget=idWarpWell(dest.x,dest.y);
									var targetPlanet;
									if (AssaultTarget!=-1)
										targetPlanet = vgap.getPlanet(AssaultTarget);
									
									if ((targetPlanet != null) && (targetPlanet.ownerid == ship.ownerid))
											SelfAssault=1;
									else if ((targetPlanet != null) && vgap.allied(targetPlanet.ownerid))
											SelfAssault=2;
									else if (targetPlanet != null)
											SelfAssault=3;
								}

						var towproblem=0;

						if (ship.mission == 6 && ship.mission1target != 0)
							{
							var towship = vgap.getShip(ship.mission1target);
							var AssaultTarget=idWarpWell(dest.x,dest.y);
							if ((towship.neutronium==0)&& (AssaultTarget!=-1))
								{
								var targetPlanet= vgap.getPlanet(AssaultTarget);
								var friendlycode=targetPlanet.friendlycode;
								if (friendlycode.toUpperCase()=="NUK")
									towproblem=1;
								}
							}
								
                        if (view!=2)
                        {              
                            var mission_list=returnMissionArray(ship);
							if  (SelfAssault==1) 
								{
								temphtml+="<td style='color:red' title='Your ship is set to RGA/Pillage your own planet'>";
								show=1;
								}
							else if  (SelfAssault==2) 
								{
								temphtml+="<td style='color:yellow' title='Your ship is set to RGA/Pillage an ally. Is that the best way to treat a friend?'>";
								show=1;
								}
							else if  (SelfAssault==3) temphtml+="<td style='color:green' title='Your ship is set to RGA/Pillage an enemy planet.'>";
							else if (towproblem==1) 
							{
							temphtml+="<td style='color:red' title='You are about to tow an unfueled ship to a planet set to NUK'>";
							show=1;
							}
							else temphtml +="<td>";
                            temphtml += mission_list[ship.mission] + "</td>";
                        }
                        
                    }	
                    //---------------END NEW CODE-----------------------
                    else	//original code
                        temphtml += '<tr class="RowSelect" title="' + ship.name + '"><td><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td><td>' + ship.id + '</td>';
                }
                
                if (view == 1)
                    temphtml += "<td>" + ship.megacredits + "</td><td>" + ship.supplies + "</td><td>" + ship.neutronium + "</td><td>" + ship.duranium + "</td><td>" + ship.tritanium + "</td><td>" + ship.molybdenum + "</td><td>" + ship.ammo + "</td></tr>";
                if ((view == 0)||(view == 6)) {
                    var hull = vgap.getHull(ship.hullid);
                    
                    //---------------START NEW CODE-----------------------
                    if (modShipList)
                    {
                        var distance = Math.dist(ship.x, ship.y, ship.targetx,ship.targety);
                        var speed=vgap.getSpeed(ship.warp, ship.hullid);
						
						var warp7=49;
						var warp8=64;
						var warp9=84
						if (ship.hullid == 44 || ship.hullid == 45 || ship.hullid == 46)
						{
							warp7=98;warp8=128;warp9=165;
						}
						var fuelCheck=0;
						var speedCheck=0;
						if (ship.neutronium<checkFuel(ship)) fuelCheck=1;
						if (((speed==warp8)&&((distance>warp8)&&(distance<warp9)))||((speed==warp7)&&((distance>warp7)&&(distance<warp9))))	 speedCheck=1;
						if (fuelCheck==1 && speedCheck==1)
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:red' title='Ship does not have enough fuel to reach destination AND is moving too slow to reach destination in one turn. Check Speed/Destination and fuel'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else if (fuelCheck==1)
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:orange' title='Ship does not have enough fuel to reach destination'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else
                        if 	(speedCheck==1)				
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:yellow' title='Ship moving too slow to reach destination in one turn, check speed/destination'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else
                            temphtml += "<td>" + hull.name + "</td><td>" + vgap.getEngine(ship.engineid).name + "</td>";
                        
                        if ((ship.friendlycode.toUpperCase()=="NTP") || (ship.friendlycode.toUpperCase()=="BDM"))
							temphtml += "<td>" +(ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td style='color:orange' title='Potentially Dangerous Friendly Code'>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                        else
                            temphtml += "<td>" +(ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                        
                    }
                    else
                        //---------------END NEW CODE-----------------------
                        temphtml += "<td>" + hull.name + "</td><td>" + vgap.getEngine(ship.engineid).name + "</td><td>" + (ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                }
                if (view == 2) {
                    var dest = vgap.getDest(ship);
                    var mission_list=returnMissionArray(ship);
						temphtml += "<td><select id='Dropdown" + i + "' onChange='setMission(this)'>";//<option value='" + ship.mission + "'>" + mission_list[ship.mission]  + "</option>";
                    for (var k=0;k<17;k++)
                    {
                        if (ship.mission==k)
                            temphtml+= "<option value='" + k + "' selected=>" + mission_list[k] + "</option>"
                            else
                                temphtml+= "<option value='" + k + "'>" + mission_list[k] + "</option>"
                    }
                    temphtml += "</select></td>";
                    //html += "<td>" + mission_list[ship.mission] + "</td>";
                    
                    temphtml += "<td>" + vgap.getBattleValue(ship) + "</td><td>" + ship.x + "-" + ship.y + "</td><td>" + dest.x + "-" + dest.y + "</td><td>" + vgap.getTravelDist(ship).toFixed(1) + "</td><td>" + ship.warp + "</td><td>" + ship.neutronium + "</td>";
                    temphtml += "<td><input type='text' id='Input"+i+"' onchange='setFC(this);' value='" + ship.friendlycode +"'/></td>";
                    temphtml += "<td><button type='button' id='Button"+i +"' onClick='setFleetDest(this);'>Set Flt Dest</button></td>";
                    if (ship.readystatus>0)	
                        temphtml += "<td><input type='checkbox' id='Check"+i+"' checked='checked' onchange='setCB(this);'/></td>";
                    else
                        temphtml += "<td><input type='checkbox' id='Check"+i+"' onchange='setCB(this);'/></td>";
                    
                    
                }
                if (view == 3) {
                    var note = vgap.getNote(ship.id, 2);
                    if (note != null) {
                        temphtml += '<td>' + note.body.replace(/\n/g, "<br/>") + '</td>';
                    }
                    else {
                        temphtml += '<td></td>';
                    }
					temphtml+="<td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                }
                    temphtml += "</tr>";
			if ((view!=6) || (show==1))
				html+=temphtml;
            var select;
            if (view==2||view==4||view==5)
                select = function(id) { return function() {};};
            else
                select = function(id) { return function() { vgap.map.selectShip(id); }; };
            $(html).click(select(ship.id)).appendTo("#ShipRows");
            }
            //---------------START NEW CODE-----------------------
            if (view==4)
            {
                var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
                var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
                var checkColor=null;
                for (var m=0;m<30;m++)
                {
                    var String="Race"+(m+1);
                    checkColor=get_cookie(String);
                    if (checkColor) 
                        colorsA[m]=checkColor;
                    checkColor=null;
                    checkColor=get_cookie(String+"A");
                    if (checkColor) 
                        colorsA2[m]=checkColor;
                    checkColor=null;
                }
                
                for (var j = 0; j < vgap.ships.length; j++) 
                {
                    //vgap.inspace
                    var ship = vgap.ships[j];
                    var hull = vgap.getHull(ship.hullid);	
                    var player = vgap.getPlayer(ship.ownerid);
                    var race = vgap.getRace(player.raceid);
                    var color=colorsA[player.raceid-1];
                    var speed=vgap.getSpeed(ship.warp, ship.hullid);
                    var destination="Deep Space";
                    var location="Deep Space";
                    var dest = vgap.getDest(ship);
                    var damage="?";		
                    var crew="?";
                    var ammo="?";
                    
                    var locOutput=betterWarpWell(ship.x,ship.y);
                    var output=betterWarpWell(dest.x,dest.y);
                    if (output!="0")
                        destination = output;
                    if (ship.target != null)
                        destination = ship.target.name.substr(0, 20);	
                    
                    if (locOutput!="0")
                        location = locOutput;
                    
                    if (ship.damage!=-1)
                        damage=ship.damage;
                    if (ship.crew!=-1)
                        crew=ship.crew;	
                    if (ship.ammo!=-1)
                        ammo=ship.ammo;
                    
                    if (showShip[player.raceid]==true)
                    {		
                        if (player.raceid==vgap.player.id)
                            html += '<tr onclick="vgap.map.selectShip(' + ship.id + ');">';
                        else 
                            html += "<tr>";
                        html += "<td style='color:"+ color +"'>" + player.raceid + "</td>";
                        html += "<td style='color:"+ color +"'>" + race.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + ship.id + "</td>";
                        html += '<td><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td>'
                        html += "<td style='color:"+ color +"'>" + ship.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + destination + "</td>";
                        html += "<td style='color:"+ color +"'>" + location + "(" + ship.x + "," + ship.y + ")" +  "</td>";
                        html += "<td style='color:"+ color +"'>" + hull.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + speed + "</td>";
                        //html += "<td style='color:"+ color +"'>" + damage + "</td>";
                        //html += "<td style='color:"+ color +"'>" + crew + "</td>";
                        //html += "<td style='color:"+ color +"'>" + ammo + "</td>";
                        //html += "<td style='color:"+ color +"'>" +ship.beams + "</td>";
                        html += "<td style='color:"+ color +"'>" +ship.friendlycode + "</td>";
                        html += "</tr>";
                    }
                }
            var select;
            if (view==2||view==4)
                select = function(id) { return function() {};};
            else
                select = function(id) { return function() { vgap.map.selectShip(id); }; };
            $(html).click(select(ship.id)).appendTo("#ShipRows");
            }
			if (view==5)
			{
				for (var i = 0; i < fleetNames2.length; i++) 
				{
				//	html += "<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'> Flagship Hull</th><th align='left'> Flagship Id</th><th align='left'>Flagship Hull</th><th align='left'>Flagship Name</th><th title='Destination' align='left'>Destination</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th>";

			    var ship = vgap.getShip(fleetFlagships2[i]);
				//alert(ship.name);
                var hull = vgap.getHull(ship.hullid);
				var destination="Deep Space";
				var dest = vgap.getDest(ship);
				var output=betterWarpWell(dest.x,dest.y);
				if (output!="0")
                     destination = output;
                if (ship.target != null)
                    destination = ship.target.name.substr(0, 20);	
                var distance = Math.dist(ship.x, ship.y, ship.targetx,ship.targety);
                var speed=vgap.getSpeed(ship.warp, ship.hullid);
                var location="Deep Space";
				var fleetName=returnFleetName2(ship);
				html+='<tr title="' + ship.name + '" onClick="changeShowFleet('+i+');" style="vertical-align:top; font-weight:bold;">';
				html += "<td style='width:10%'>" +  fleetNames2[i] + "</td><td style='width:5%'>" +  fleetSizes2[i] + "</td><td style='width:10%'>"+destination+"</td>";
				if (showFleet[i]==true)
				{
					html+="</tr>";
					for (var j=0;j<vgap.myships.length;j++)
					{
						var ship2 = vgap.myships[j];
						var fleetName2=returnFleetName2(ship2);
						if (fleetName!=-1)
							if (fleetName2==fleetName)
							{
							var destination2="Deep Space";
							var dest2 = vgap.getDest(ship2);
							var output2=betterWarpWell(dest2.x,dest2.y);
							if (output2!="0")
								destination2 = output2;
							if (ship2.target != null)
								destination2 = ship2.target.name.substr(0, 20);	
							var mission_list=returnMissionArray(ship2);
							html+='<tr class="RowSelect" title="' + ship2.name + '" style="vertical-align:top;">';
							html += "<td style='width:10%'>" +  fleetNames2[i] + "</td><td style='width:5%'>" +  fleetSizes2[i] + "</td><td style='width:10%'>"+destination2+"</td>";
							html+="<td style='width:5%' onclick='vgap.map.selectShip(" + ship2.id + ");'><img class='TinyIcon' src='" + hullImg(ship2.hullid)+ "'/></td><td onclick='vgap.map.selectShip(" + ship2.id + ");' style='width:5%'>"+ship2.id+"</td><td onclick='vgap.map.selectShip(" + ship2.id + ");'>"+ship2.name+"</td>";
							html += "<td><select id='DropdownA" + j + "' onChange='setMission(this)'>";
							for (var k=0;k<17;k++)
								{
								if (ship2.mission==k)
									html+= "<option value='" + k + "' selected=>" + mission_list[k] + "</option>"
								else
									html+= "<option value='" + k + "'>" + mission_list[k] + "</option>"
								}
							html += "</select></td>";
							
							html += "<td>" + vgap.getBattleValue(ship2) + "</td><td>" + ship2.x + "-" + ship2.y + "</td><td>" + vgap.getTravelDist(ship2).toFixed(1) + "</td><td>" + ship2.warp + "</td><td>" + ship2.neutronium + "</td>";
                    
                    //---------------START NEW CODE-----------------------
                    html += "<td><input type='text' id='InputA"+j+"' onchange='setFC(this);' value='" + ship2.friendlycode +"'/></td>";
                    html += "<td><button type='button' id='ButtonA"+j +"' onClick='setFleetDest(this);'>Set Flt Dest</button></td>";
                    if (ship2.readystatus>0)	
                        html += "<td><input type='checkbox' id='CheckA"+j+"' checked='checked' onchange='setCB(this);'/></td>";
                    else
                        html += "<td><input type='checkbox' id='CheckA"+j+"' onchange='setCB(this);'/></td>";
                    
                    //---------------END NEW CODE-----------------------

 
							html+="</tr>";
							}
					}
				}
				 else
				html+="<td style='width:5%'><img class='TinyIcon' src='" + hullImg(ship.hullid)+ "'/></td><td style='width:5%'>"+ship.id+"</td><td>"+ship.name+"</td>";
				 //html+="<td><img class='TinyIcon' src='" + hullImg(ship.hullid)+ "'/></td><td>"+ship.id+"</td><td>"+hull.name+"</td><td>"+ship.name+"</td><td>" + ship.x + "-" + ship.y + "</td><td>" + vgap.getTravelDist(ship).toFixed(1) + "</td><td>" + ship.warp + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";

				 html+="</tr>";
				//alert(i+" "+ fleetNames2.length);
				}
				//html+="</tbody></table>";
				var select;
            if (view==2||view==4||view==5)
                select = function(id) { return function() {};};
            else
                select = function(id) { return function() { vgap.map.selectShip(id); }; };
            $(html).click(select(ship.id)).appendTo("#ShipRows");
			}
            //---------------END NEW CODE-----------------------

                   

            
            
            $("#ShipTable").tablesorter();
            this.pane.jScrollPane();
            
            
            // vgap.action added for the assistant (Alex):
            vgap.showShipsViewed = 1;
            vgap.action(); 
            
        }
        //-------------------------------------V1 API--------------------------------------
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        else if (vgaPlanets.prototype.version<3)
        {
            vgap.playSound("button");
            vgap.closeSecond();
            this.pane.remove();
            //filter messages
            var html = "";
            
            if (!view)
                view = 0;
            
            html += "<ul class='FilterMenu'><li ";
            html += (view == 0 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(0);'>Status</li><li ";
            html += (view == 1 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(1);'>Cargo View</li><li ";
            html += (view == 2 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(2);'>Command View</li><li ";
            html += (view == 3 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(3);'>Notes View</li>";
            //---------------START NEW CODE-----------------------
            html += "<li " 
            html += (view == 4 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(4);'>Complete Ship List</li>";
			
			html += "<li " 
            html += (view == 5 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(5);'>Fleet View (experimental)</li>";

			html += "<li " 
            html += (view == 6 ? "class='SelectedFilter'" : "");
            html += " onclick='vgap.dash.showShips(6);'>What's Interesting (experimental)</li>";

            //---------------END NEW CODE-----------------------
            
            html += "</ul>";
            
            //loop through all ships and show the ones owned by this player
            html += "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 30) + "px;'>";
            
            //---------------START NEW CODE-----------------------
            if (view==4)
            {
                //html += "<button type='button' class='TestButton' onClick='changeOne();'> Display 1 </button>";
                html += "<table rules='all' border='1' width='100%'>";	
                if(showShip[0]==true)
                    html += "<tr><td><button type='button' class='TestButton' onClick='changeShow(0);'> Hide Unknown </button></td>"
                    else
                        html += "<tr><td><button type='button' class='TestButton' onClick='changeShow(0);'> Display Unknown </button></td>"
                        for (var i=1;i<12;i++)
                        {
                            if(showShip[i]==true)
                                html += "<td><button type='button' class='TestButton' onClick='changeShow("+i+");'> Hide " + i + " </button></td>"
                                else
                                    html += "<td><button type='button' class='TestButton' onClick='changeShow("+i+");'> Display " + i + " </button></td>"
                        }
            }
            html += "</tr></table>";
            //---------------END NEW CODE-----------------------
            
            
            html += "<table id='ShipTable' align='left' rules='rows' frame='void' border='1' width='100%' style='cursor:pointer;'><thead>";
            //---------------START NEW CODE-----------------------
			if (view==5)
			{
				//html += "<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'> Flagship Hull</th><th align='left'> Flagship Id</th><th align='left'>Flagship Hull</th><th align='left'>Flagship Name</th><th title='Destination' align='left'>Destination</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th>";
				 html+="<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'>FS Destination</th><th align='left'>Hull</th><th align='left'>ID</th><th align='left'>Shipname</th><th align='left'>Mission</th>";
				  html += "<th title='Battle value' align='left'>Battle Value</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th><th title='Neutronium Fuel' align='left'>N</th>";
                //---------------START NEW CODE-----------------------
                html += "<th title='Friendly Code' align='left'>FC</th>";
                html += "<th title='Set Fleets Destination to This Ships Destination' align='left'>Set Fleet Dest</th>";
                html += "<th title='Ready Checkbox Status' align='left'>R</th>";	
			}
			else if (view==4)
                html += "<th align='left'>Race ID</th><th align='left'>Race Name</th><th align='left'>Id</th><th align='left'>Hull</th><th title='Ship Name' align='left'>Ship Name</th><th title='Destination' align='left'>Destination</th>";
			else
				if (modShipList)
					html += "<th align='left'>Hull</th><th align='left'>Id</th><th title='Ship Name' align='left'>Ship Name</th><th title='Destination' align='left'>Destination</th><th title='Ship Mission' align='left'>Mission</th>";
            
            else	//original code
                //---------------END NEW CODE-----------------------
                html += "<th align='left'>Hull</th><th align=left>Id</th>";	
            
            if (view == 1)
                html += "<th title='Megacredits' align='left'>MC</th><th title='Supplies' align='left'>S</th><th title='Neutronium' align='left'>N</th><th title='Duranium' align='left'>D</th><th title='Tritanium' align='left'>T</th><th title='Molybdenum' align='left'>M</th><th title='Torpedos or Fighters' align='left'>Ammo</th>";
            if ((view == 0)||(view==6)) {
                
                html += "<th title='Hull' align='left'>Hull</th><th title='Engine' align='left'>Engine</th><th title='Beams' align='left'>Beams</th><th align='left'>Torps/Bays [Ammo]</th><th title='Damage' align='left'>Dam</th><th title='Crew' align='left'>Crew</th><th title='Friendly Code' align='left'>FC</th><th title='Ready Checkbox Status' align='left'>R</th>";
                
            }
            
            if (view == 2)
            {
                html += "<th title='Battle value' align='left'>Battle Value</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Target Coordinates' align='left'>Tx-Ty</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th><th title='Neutronium Fuel' align='left'>N</th>";
                //---------------START NEW CODE-----------------------
                html += "<th title='Friendly Code' align='left'>FC</th>";
                html += "<th title='Set Fleets Destination to This Ships Destination' align='left'>Set Fleet Dest</th>";
                html += "<th title='Ready Checkbox Status' align='left'>R</th>";
            }
            //---------------END NEW CODE-----------------------
            
            if (view == 3)
                html += "<th title='Notes' align='left'>Notes</th><th title='Ready Checkbox Status' align='left'>R</th>";
            //---------------START NEW CODE-----------------------
            if (view==4)
                html += "<th title='Current Location' align='left'>Location</th><th title='Hull' align='left'>Hull</th><th title='Speed'  align='left'>Speed</th><th title='Friendly Code' align='left'>FC</th>";
            //html += "<th title='Damage' align='left'>Dam</th><th title='Crew' align='left'>Crew</th><th title='Loaded Torps or Fighters' align='left'>Ammo</th";
            //---------------END NEW CODE-----------------------
            
            
            
            html += "</thead><tbody align=left  >";
            for (var i = 0; i < vgap.myships.length; i++) {
                var ship = vgap.myships[i];
                var hull = vgap.getHull(ship.hullid);
                var dam = (ship.damage > 0 ? "<span class='WarnText'>" + ship.damage + "%</span>" : ship.damage + "%");
                var crew = (ship.crew < hull.crew ? "<span class='WarnText'>" + ship.crew + "</span>" : ship.crew);
                
				var show=0; //for what's interesting view
				var temphtml = "";
				
                if ((view!=4)&&(view!=5))
                { 
                    if (modShipList)
                    {
                        var hyp=0;//0=none, 1=yellow, 2=red, 3=green, 4=blue
                        var cloak=0;//0=none, 1=yellow, 2=red, 3=green, 4=blue
                        var destination="Deep Space";
                        var dest = vgap.getDest(ship);
                        var distance = vgap.map.getDist(ship.x, ship.y, ship.targetx,ship.targety);
                        
                        if (view==2)
                            temphtml += '<tr><td onclick="vgap.map.selectShip(' + ship.id + ');"><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td><td onclick="vgap.map.selectShip(' + ship.id + ');">' + ship.id + '</td>';
                        else
                            temphtml += '<tr class="RowSelect" title="' + ship.name + '" onclick="vgap.map.selectShip(' + ship.id + ');"><td><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td><td>' + ship.id + '</td>';
                        
                        if (hull.cancloak)
                        {
                            if (ship.iscloaked)
                            {
                                if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
                                cloak=3 //cloaked now, will be cloaked.
                                else 
                                    cloak=1 //cloaked now, but won't be cloaked.
                            }
                            else if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
                            cloak=4; //not cloaked now, but will be cloaked
                            else
                                cloak=2; //not cloaked now, won't be cloaking
                        }
                        
                        
                        
                        if ((ship.hullid==87)||(ship.hullid==77)||(ship.hullid==51))
                        {
                            if ((ship.friendlycode=="HYP")||(ship.friendlycode=="hyp")||(ship.friendlycode.toUpperCase()=="HYP"))
                            {
                                if (distance==0) hyp=5;
                                else if (distance<20) hyp=1;
                                else if ((distance<340) || (distance>360)) hyp=2;
                                else hyp=3;
                            }
                            else
                            {
                                if ((distance>=340)&&(distance<=360))
                                hyp=2;
                                else 
                                    hyp=4;			
                            }	
                        }
                        
                        if (hyp>0) switch (hyp)
                        {
                            case 1: temphtml+="<td style='color:yellow' title='FC is HYP and destination less than 20 LY'";
                                show=1;
								break;
                            case 2: temphtml+="<td style='color:red' title='Warning: Check Friendly Code and Destination Distance'";
                                show=1;
								break;
                            case 3: temphtml+="<td style='color:green' title='No HYP problems seen'";
                                break;
                            case 4: temphtml+="<td style='color:lightblue' title='Ship not set to HYP'";
                                break
                                case 5: temphtml+="<td style='color:aqua' title='Ship set to HYP, no destination set'";
                                break
                                default: temphtml+="<td";
                        }
                        else if (cloak>0) switch (cloak)
                        {
                            case 1: temphtml+="<td style='color:yellow' title='Ship is cloaked now. No cloak mission set for next turn'";
                                break;
                            case 2: temphtml+="<td style='color:red' title='Ship is uncloaked now. No cloak mission set for next turn'";
                                break;
                            case 3: temphtml+="<td style='color:green' title='Ship is cloaked now. Cloak mission is set for next turn'";
                                break;
                            case 4: temphtml+="<td style='color:lightblue' title='Ship is uncloaked now. Cloak mission set for next turn'";
                                break
                                default: temphtml+="<td";        
                        }
                        else temphtml+="<td";  
						
						if (view==2)
							temphtml+= " onclick='vgap.map.selectShip(" + ship.id + ");'>";
						else
							temphtml+=">";
                        
                        
                        temphtml += ship.name+"</td>";
                        
                        
                        var output=betterWarpWell(dest.x,dest.y);
                        if (output!="0")
                            destination = output;
                        
                        if (ship.target != null)
                            destination = ship.target.name.substr(0, 20);	        
                        
                        if (output.search("Outside ")!=-1){
                            temphtml+="<td style='color:orange' title='Destination is outside the Warp Well'>" + destination + "</td>";
							show=1;
							}
						else if (ship.waypoints.length>0)
                        {
                            if ((vgap.warpWell(ship.targetx,ship.targety))&&(distance<=3)){
                            temphtml+="<td style='color:red' title='First waypoint of multi-leg journey is local warpwell'>" + destination + "</td>";
							show=1;
							}
                            else if ((distance>3)&&(ship.warp==1)){
                            temphtml+="<td style='color:yellow' title='Ship is trying to go more than 3 LY at warp 1 '>" + destination + "</td>";
							show=1;
							}
							else if ((output.search("Warpwell")!=-1)&&(ship.warp>1)&&(distance<2)){
								temphtml+="<td style='color:orange' title='Ship is trying to move 1 LY in a warpwell at greater than warp 1 '>" + destination + "</td>";
							show=1;
							}
                            else
                                temphtml+= "<td>" + destination + "</td>";
                        }
                        else if ((distance>3)&&(ship.warp==1)){
							temphtml+="<td style='color:yellow' title='Ship is trying to go more than 3 LY at warp 1 '>" + destination + "</td>";
							show=1;
							}
						else if ((output.search("Warpwell")!=-1)&&(ship.warp>1)&&(distance<2)){
								temphtml+="<td style='color:orange' title='Ship is trying to move 1 LY in a warpwell at greater than warp 1 '>" + destination + "</td>";
							show=1;
							}
						else	
                            temphtml+= "<td>" + destination + "</td>";
                        
						var SelfAssault=0;
						if ((vgap.player.raceid==4) || (vgap.player.raceid==10))
							if (ship.mission == 8) 
								{
									var AssaultTarget=idWarpWell(dest.x,dest.y);
									var targetPlanet;
									if (AssaultTarget!=-1)
										targetPlanet = vgap.getPlanet(AssaultTarget);
									
									if ((targetPlanet != null) && (targetPlanet.ownerid == ship.ownerid))
											SelfAssault=1;
									else if ((targetPlanet != null) && vgap.allied(targetPlanet.ownerid))
											SelfAssault=2;
									else if (targetPlanet != null)
											SelfAssault=3;
								}
						
						var towproblem=0;

						if (ship.mission == 6 && ship.mission1target != 0)
							{
							var towship = vgap.getShip(ship.mission1target);
							var AssaultTarget=idWarpWell(dest.x,dest.y);
							if ((towship.neutronium==0)&& (AssaultTarget!=-1))
								{
								var targetPlanet= vgap.getPlanet(AssaultTarget);
								var friendlycode=targetPlanet.friendlycode;
								if (friendlycode.toUpperCase()=="NUK")
									towproblem=1;
								}
							}
												
                        if (view!=2)
                        {              
                            var mission_list=returnMissionArray(ship);
							if  (SelfAssault==1) 
							{
							temphtml+="<td style='color:red' title='Your ship is set to RGA/Pillage your own planet'>";
							show=1;
							}
							else if  (SelfAssault==2) 
							{
							temphtml+="<td style='color:yellow' title='Your ship is set to RGA/Pillage an ally. Is that the best way to treat a friend?'>";
							show=1;
							}
							else if  (SelfAssault==3) temphtml+="<td style='color:green' title='Your ship is set to RGA/Pillage an enemy planet.'>";
							else if (towproblem==1) 
							{
							temphtml+="<td style='color:red' title='You are about to tow an unfueled ship to a planet set to NUK'>";
							show=1;
							}
							else temphtml +="<td>";
                            temphtml += mission_list[ship.mission] + "</td>";
                        }
                        
                    }
                    else //original code	    
                        temphtml += '<tr class="RowSelect" title="' + ship.name + '" onclick="vgap.map.selectShip(' + ship.id + ');"><td><img class="TinyIcon" src="' + hullImg(ship.hullid) +'"/></td><td>' + ship.id + '</td>';
                    
                }
                
                
                if (view == 1)
                    temphtml += "<td>" + ship.megacredits + "</td><td>" + ship.supplies + "</td><td>" + ship.neutronium + "</td><td>" + ship.duranium + "</td><td>" + ship.tritanium + "</td><td>" + ship.molybdenum + "</td><td>" + ship.ammo + "</td></tr>";
                if ((view == 0)||(view==6)) {
                    var hull = vgap.getHull(ship.hullid);
                    
                    if (modShipList)
                    {
                        var distance = vgap.map.getDist(ship.x, ship.y, ship.targetx,ship.targety);
                        var speed=vgap.getSpeed(ship.warp, ship.hullid);
                        var warp7=49;
						var warp8=64;
						var warp9=84
						if (ship.hullid == 44 || ship.hullid == 45 || ship.hullid == 46)
						{
							warp7=98;warp8=128;warp9=165;
						}
						var fuelCheck=0;
						var speedCheck=0;
						if (ship.neutronium<checkFuel(ship)) fuelCheck=1;
						if (((speed==warp8)&&((distance>warp8)&&(distance<warp9)))||((speed==warp7)&&((distance>warp7)&&(distance<warp9))))	 speedCheck=1;
						if (fuelCheck==1 && speedCheck==1)
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:red' title='Ship does not have enough fuel to reach destination AND is moving too slow to reach destination in one turn. Check Speed/Destination and fuel'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else if (fuelCheck==1)
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:orange' title='Ship does not have enough fuel to reach destination'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else
                        if 	(speedCheck==1)				
							{
							temphtml += "<td>" + hull.name + "</td><td style='color:yellow' title='Ship moving too slow to reach destination in one turn, check speed/destination'>" + vgap.getEngine(ship.engineid).name + "</td>"    ;   
							show=1;
							}
						else
                            temphtml += "<td>" + hull.name + "</td><td>" + vgap.getEngine(ship.engineid).name + "</td>";
                        
                        if ((ship.friendlycode.toUpperCase()=="NTP") || (ship.friendlycode.toUpperCase()=="BDM"))
							temphtml += "<td>" +(ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td style='color:orange' title='Potentially Dangerous Friendly Code'>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                        else
                            temphtml += "<td>" +(ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                        
                    }
                    else
                        temphtml += "<td>" + hull.name + "</td><td>" + vgap.getEngine(ship.engineid).name + "</td><td>" + (ship.beams > 0 ? vgap.getBeam(ship.beamid).name + " x" + ship.beams : "") + "</td><td>" + (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).name + " x" + ship.torps : "") + (ship.bays > 0 ? " Bays x" + ship.bays : "") + (ship.bays > 0 || ship.torps > 0 ? " [" + ship.ammo + "]" : "") + "</td><td>" + dam + "</td><td>" + crew + "</td><td>" + ship.friendlycode + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                }
                
                if (view == 2) {
                    var dest = vgap.getDest(ship);
                    var mission_list=returnMissionArray(ship);
                    temphtml += "<td><select id='Dropdown" + i + "' onChange='setMission(this)'>";//<option value='" + ship.mission + "'>" + mission_list[ship.mission]  + "</option>";
                    for (var k=0;k<17;k++)
                    {
                        if (ship.mission==k)
                            temphtml+= "<option value='" + k + "' selected=>" + mission_list[k] + "</option>"
                            else
                                temphtml+= "<option value='" + k + "'>" + mission_list[k] + "</option>"
                    }
                    temphtml += "</select></td>";
                    //temphtml += "<td>" + mission_list[ship.mission] + "</td>";
                    temphtml += "<td>" + vgap.getBattleValue(ship) + "</td><td>" + ship.x + "-" + ship.y + "</td><td>" + dest.x + "-" + dest.y + "</td><td>" + vgap.getTravelDist(ship).toFixed(1) + "</td><td>" + ship.warp + "</td><td>" + ship.neutronium + "</td>";
                    
                    //---------------START NEW CODE-----------------------
                    temphtml += "<td><input type='text' id='Input"+i+"' onchange='setFC(this);' value='" + ship.friendlycode +"'/></td>";
                    temphtml += "<td><button type='button' id='Button"+i +"' onClick='setFleetDest(this);'>Set Flt Dest</button></td>";
                    if (ship.readystatus>0)	
                        temphtml += "<td><input type='checkbox' id='Check"+i+"' checked='checked' onchange='setCB(this);'/></td>";
                    else
                        temphtml += "<td><input type='checkbox' id='Check"+i+"' onchange='setCB(this);'/></td>";
                    
                    //---------------END NEW CODE-----------------------
                    
                }
                if (view == 3) {
                    var note = vgap.getNote(ship.id, 2);
                    if (note != null) {
                        temphtml += '<td>' + note.body.replace(/\n/g, "<br/>") + '</td>';
                    }
                    else {
                        temphtml += '<td></td>';
                    }
					temphtml+="<td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";
                }
            if ((view!=6) || (show==1))
				html+=temphtml;    
                
            }
            //---------------START NEW CODE-----------------------
            if (view==4)
            {
                var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
                var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
                var checkColor=null;
                for (var i=0;i<30;i++)
                {
                    var String="Race"+(i+1);
                    checkColor=get_cookie(String);
                    if (checkColor) 
                        colorsA[i]=checkColor;
                    checkColor=null;
                    checkColor=get_cookie(String+"A");
                    if (checkColor) colorsA2[i]=checkColor;
                    checkColor=null;
                }
                
                for (var j = 0; j < vgap.ships.length; j++) 
                {
                    //vgap.inspace
                    var ship = vgap.ships[j];
                    var hull = vgap.getHull(ship.hullid);	
                    var player = vgap.getPlayer(ship.ownerid);
                    var race = vgap.getRace(player.raceid);
                    var color=colorsA[player.raceid-1];
                    var speed=vgap.getSpeed(ship.warp, ship.hullid);
                    var destination="Deep Space";
                    var location="Deep Space";
                    var dest = vgap.getDest(ship);
                    var damage="?";		
                    var crew="?";
                    var ammo="?";
                    
                    var locOutput=betterWarpWell(ship.x,ship.y);
                    var output=betterWarpWell(dest.x,dest.y);
                    if (output!="0")
                        destination = output;
                    if (ship.target != null)
                        destination = ship.target.name.substr(0, 20);	
                    
                    if (locOutput!="0")
                        location = locOutput;
                    
                    if (ship.damage!=-1)
                        damage=ship.damage;
                    if (ship.crew!=-1)
                        crew=ship.crew;	
                    if (ship.ammo!=-1)
                        ammo=ship.ammo;
                    
                    if (showShip[player.raceid]==true)
                    {		
                        if (player.raceid==vgap.player.id)
                            html += '<tr onclick="vgap.map.selectShip(' + ship.id + ');">';
                        else 
                            html += "<tr>";
                        html += "<td style='color:"+ color +"'>" + player.raceid + "</td>";
                        html += "<td style='color:"+ color +"'>" + race.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + ship.id + "</td>";
                        html += '<td><img class="TinyIcon" src="' + hullImg(ship.hullid) + '"/></td>'
                        html += "<td style='color:"+ color +"'>" + ship.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + destination + "</td>";
                        html += "<td style='color:"+ color +"'>" + location + "(" + ship.x + "," + ship.y + ")" +  "</td>";
                        html += "<td style='color:"+ color +"'>" + hull.name + "</td>";
                        html += "<td style='color:"+ color +"'>" + speed + "</td>";
                        //html += "<td style='color:"+ color +"'>" + damage + "</td>";
                        //html += "<td style='color:"+ color +"'>" + crew + "</td>";
                        //html += "<td style='color:"+ color +"'>" + ammo + "</td>";
                        //html += "<td style='color:"+ color +"'>" +ship.beams + "</td>";
                        html += "<td style='color:"+ color +"'>" +ship.friendlycode + "</td>";
                        html += "</tr>";	
                    }
                }
                //---------------END NEW CODE-----------------------
                /*for (var i=0;i<12;i++)
                if (showShip[i]==false)
                {
                if (i==0)
                html+="<tr><td>Hiding Ships with No/Unknown Owner - Click button above to display</td></tr>";				
                else
                html+="<tr><td>Hiding Ships from Race " + i +  " - Click button above to display</td></tr>";
                }*/
                
            }
            if (view==5)
			{
				for (var i = 0; i < fleetNames2.length; i++) 
				{
				//	html += "<th align='left'>Fleet Name</th><th align='left'>Fleet Size</th><th align='left'> Flagship Hull</th><th align='left'> Flagship Id</th><th align='left'>Flagship Hull</th><th align='left'>Flagship Name</th><th title='Destination' align='left'>Destination</th><th title='Current Coordinates' align='left'>X-Y</th><th title='Distance to Target' align='left'>D</th><th title='Warp Speed'  align='left'>W</th>";

			    var ship = vgap.getShip(fleetFlagships2[i]);
                var hull = vgap.getHull(ship.hullid);
				var destination="Deep Space";
				var dest = vgap.getDest(ship);
				var output=betterWarpWell(dest.x,dest.y);
				if (output!="0")
                     destination = output;
                if (ship.target != null)
                    destination = ship.target.name.substr(0, 20);	 
                var distance = vgap.map.getDist(ship.x, ship.y, ship.targetx,ship.targety);
                var speed=vgap.getSpeed(ship.warp, ship.hullid);
                var location="Deep Space";
				var fleetName=returnFleetName2(ship);
				html+='<tr class="RowSelect" title="' + ship.name + '" onClick="changeShowFleet('+i+');" style="vertical-align:top; font-weight:bold;">';
				html += "<td style='width:10%'>" +  fleetNames2[i] + "</td><td style='width:5%'>" +  fleetSizes2[i] + "</td><td style='width:10%'>"+destination+"</td>";
				if (showFleet[i]==true)
				{
					html+="</tr>";
					for (var j=0;j<vgap.myships.length;j++)
					{
						var ship2 = vgap.myships[j];
						var fleetName2=returnFleetName2(ship2);
						if (fleetName!=-1)
							if (fleetName2==fleetName)
							{
							var destination2="Deep Space";
							var dest2 = vgap.getDest(ship2);
							var output2=betterWarpWell(dest2.x,dest2.y);
							if (output2!="0")
								destination2 = output2;
							if (ship2.target != null)
								destination2 = ship2.target.name.substr(0, 20);	
							var mission_list=returnMissionArray(ship2);
							html+='<tr class="RowSelect" title="' + ship2.name + '" style="vertical-align:top;">';
							html += "<td style='width:10%'>" +  fleetNames2[i] + "</td><td style='width:5%'>" +  fleetSizes2[i] + "</td><td style='width:10%'>"+destination2+"</td>";
							html+="<td style='width:5%' onclick='vgap.map.selectShip(" + ship2.id + ");'><img class='TinyIcon' src='" + hullImg(ship2.hullid)+ "'/></td><td onclick='vgap.map.selectShip(" + ship2.id + ");' style='width:5%'>"+ship2.id+"</td><td onclick='vgap.map.selectShip(" + ship2.id + ");'>"+ship2.name+"</td>";
							html += "<td><select id='DropdownA" + j + "' onChange='setMission(this)'>";
							for (var k=0;k<17;k++)
								{
								if (ship2.mission==k)
									html+= "<option value='" + k + "' selected=>" + mission_list[k] + "</option>"
								else
									html+= "<option value='" + k + "'>" + mission_list[k] + "</option>"
								}
							html += "</select></td>";
							
							html += "<td>" + vgap.getBattleValue(ship2) + "</td><td>" + ship2.x + "-" + ship2.y + "</td><td>" + vgap.getTravelDist(ship2).toFixed(1) + "</td><td>" + ship2.warp + "</td><td>" + ship2.neutronium + "</td>";
                    
                    //---------------START NEW CODE-----------------------
                    html += "<td><input type='text' id='InputA"+j+"' onchange='setFC(this);' value='" + ship2.friendlycode +"'/></td>";
                    html += "<td><button type='button' id='ButtonA"+j +"' onClick='setFleetDest(this);'>Set Flt Dest</button></td>";
                    if (ship2.readystatus>0)	
                        html += "<td><input type='checkbox' id='CheckA"+j+"' checked='checked' onchange='setCB(this);'/></td>";
                    else
                        html += "<td><input type='checkbox' id='CheckA"+j+"' onchange='setCB(this);'/></td>";
                    
                    //---------------END NEW CODE-----------------------

 
							html+="</tr>";
							}
					}
				}
				 else
					html+="<td style='width:5%'><img class='TinyIcon' src='" + hullImg(ship.hullid)+ "'/></td><td style='width:5%'>"+ship.id+"</td><td>"+ship.name+"</td>";
				 //html+="<td><img class='TinyIcon' src='" + hullImg(ship.hullid)+ "'/></td><td>"+ship.id+"</td><td>"+hull.name+"</td><td>"+ship.name+"</td><td>" + ship.x + "-" + ship.y + "</td><td>" + vgap.getTravelDist(ship).toFixed(1) + "</td><td>" + ship.warp + "</td><td>" + (ship.readystatus > 0 ? (ship.readystatus == 1 ? "-" : "+") : "") + "</td>";

				 html+="</tr>";
				}
				html+="</tbody></table>";
			}
			
			
			if (view!=5) html +="</tbody></table>";
            html += "</div>";
            this.pane = $(html).appendTo(this.content);
            $("#ShipTable").tablesorter();
            this.pane.jScrollPane();
            
            
            // vgap.action added for the assistant (Alex):
            vgap.showShipsViewed = 1;
            vgap.action();
        }
    };
	
//==========================================Utility Functions==========================================	
    betterWarpWell = function (x, y) {
        var output="0";
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var dist;
            if (vgaPlanets.prototype.version>=3)
                dist=Math.dist(x, y, planet.x, planet.y);
            else //if (vgaPlanets.prototype.version<3)
                dist=vgap.map.getDist(x, y, planet.x, planet.y);
            
            if (dist==0)
            {
                output=planet.name;
                return(output);            
            }
            else if (dist <= 3 && dist > 0)
            {
                output=planet.name;
                return(output+" Warpwell");
            }
            else if (dist>3 && dist<6)
            {
                output="Outside "+planet.name;
                return(output+" Warpwell");
            }
        }
        return(output);
    };
	
	idWarpWell = function (x, y) {
	var output=-1;
	for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var dist;
            if (vgaPlanets.prototype.version>=3)
                dist=Math.dist(x, y, planet.x, planet.y);
            else //if (vgaPlanets.prototype.version<3)
                dist=vgap.map.getDist(x, y, planet.x, planet.y);
            if (dist==0)
            {
                return(planet.id);            
            }
            else if (dist <= 3 && dist > 0)
            {
                return(planet.id);
            }
        }
        return(output);
    };
	
    
    var oldShowSettings = vgapDashboard.prototype.showSettings;
    
    vgapDashboard.prototype.showSettings = function () {
        
        //oldShowSettings.apply(this,arguments);
        var new_html="";
        new_html += "<br><h3>Custom Settings for Improved Ship List Mod</h3>";
        new_html += "<div style='width:250px;'></div>";
        new_html += "<div id='ShipListModTable'><table>";
        new_html += "<td><div id='LaunchSim' onclick='changeShipListMod();' title='Default is: Active.'>Activate or Deactivate Mod</div></td></tr></table>";
        
        if (vgaPlanets.prototype.version>=3)
        {
            this.customSettingsContent.push(new_html);
        }
        oldShowSettings.apply(this,arguments);
        
        if (vgaPlanets.prototype.version<3)
        {
            $('[onclick="vgap.resetTurn();"]').after(new_html);
            this.pane.jScrollPane();
        }
        if (vgaPlanets.prototype.version>=3)
        {
            this.customSettingsContent.pop();
        }
        
    };
    
    changeShipListMod = function()
    {
        if (modShipList==true) 
        {
            modShipList=false;
            alert("The Improved Ship List Mod is now Deactived.");
        }
        else 
        {
            modShipList=true;
            alert("The Improved Ship List Mod is now Active.");
        }
    };
    
    setFleetDest= function(ship__ship)
    {
        var ship_length=ship__ship.id.length;
        var ship_output=ship__ship.id.substring(6,ship_length);
		var command=0;
		var fleetName;


        if (ship_output.charAt(0)=='A')
			{
			ship_output=ship_output.substring(1,ship_length);
			command=1;
			}
        else
			{
			command=2;
			}
		var ship_num=Number(ship_output);
        var ship=vgap.myships[ship_num];
		if (command==1) fleetName=returnFleetName(ship);
        var count=0;
		var lowFuel=0;
		if (command==1) //in a labeled fleet
			for (var i = 0; i < vgap.myships.length; i++)
			{
				if (returnFleetName(vgap.myships[i])==fleetName)
					{
					count++;
					if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) lowFuel++;
					vgap.myships[i].targetx = ship.targetx;
						vgap.myships[i].targety = ship.targety;
						vgap.myships[i].waypoints = ship.waypoints;
						var dest = vgap.getDest(vgap.myships[i]);
						vgap.myships[i].target = vgap.getTarget(dest.x, dest.y);
						}
			}
		else //unlabeled group at location
			for (var i = 0; i < vgap.myships.length; i++) 
			{
				//alert("its "+ i);
				if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
				{
					//alert("hi!");
					count++;
					vgap.myships[i].targetx = ship.targetx;
					vgap.myships[i].targety = ship.targety;
					vgap.myships[i].waypoints = ship.waypoints;
					var dest = vgap.getDest(vgap.myships[i]);
					vgap.myships[i].target = vgap.getTarget(dest.x, dest.y);
					if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) lowFuel++;
				} 
			}
		if (lowFuel>0) alert ("Updated destination for " + count + " ships. " + lowFuel + " ships have insufficient fuel!");
			else
		alert("Updated destination for " + count + " ships");

		if (command==2)
			vgap.dash.showShips(2);
		else 
			vgap.dash.showShips(5);
        if (vgaPlanets.prototype.version<3)
            vgap.map.updateZoom();
        else
        {	
            vgap.loadWaypoints();
            vgap.shipScreen.screen.refresh();
        }
        vgap.map.draw();
        
    };
    
    setFC= function(fc__fc)
    {
        var fc_length=fc__fc.id.length;
        var fc_ID=fc__fc.id.substring(5,fc_length);
		var command=0;
		//alert(fc_ID);
        if (fc_ID.charAt(0)=='A')
			{
			fc_ID=fc_ID.substring(1,fc_length);
			command=1;
			//alert(fc_ID+" "+fc__fc.value);
			}
        vgap.myships[fc_ID].friendlycode=fc__fc.value;
		if (command==0)
			vgap.dash.showShips(2);
		else 
			vgap.dash.showShips(5);
        if (vgaPlanets.prototype.version<3)
            vgap.map.updateZoom();
        vgap.map.draw();
    };
    
    setMission=function(ms__ms)
    {
        var ms_length=ms__ms.id.length;
        var ms_ID=ms__ms.id.substring(8,ms_length);
		var command=0;
        if (ms_ID.charAt(0)=='A')
			{
			ms_ID=ms_ID.substring(1,ms_length);
			command=1;
			}
        var ship=vgap.myships[ms_ID];
        var dest = vgap.getDest(ship);
        var mission_list=returnMissionArray(ship);
        if (mission_list[ms__ms.value]=="Invalid") 
            alert ("Invalid Mission Selected");
        else
            vgap.myships[ms_ID].mission=ms__ms.value;
		if (command==0)
			vgap.dash.showShips(2);
		else 
			vgap.dash.showShips(5);
        if (vgaPlanets.prototype.version<3)
            vgap.map.updateZoom();
        vgap.map.draw();
    };
    
    setCB=function(cb__cb)
    {
        var cb_length=cb__cb.id.length;
        var cb_ID=cb__cb.id.substring(5,cb_length);
		var command=0;
        if (cb_ID.charAt(0)=='A')
			{
			cb_ID=cb_ID.substring(1,cb_length);
			command=1;
			}
        if (vgap.myships[cb_ID].readystatus>0) vgap.myships[cb_ID].readystatus=0;
        else vgap.myships[cb_ID].readystatus=1;
		if (command==0)
			vgap.dash.showShips(2);
		else 
			vgap.dash.showShips(5);
        if (vgaPlanets.prototype.version<3)
            vgap.map.updateZoom();
        vgap.map.draw();
    };
    
    changeShow = function(race)
    {	
        if (showShip[race]==false)
            showShip[race]=true;
        else
            showShip[race]=false;
        vgap.dash.showShips(4);
    };	
    
	
    changeShowFleet = function(index)
    {	
		//alert("hi");
        if (showFleet[index]==false)
            showFleet[index]=true;
        else
            showFleet[index]=false;
        vgap.dash.showShips(5);
    };	
	
    returnMissionArray = function (ship) 
    {
        var missions = new Array();
        
        missions.push("Exploration");
        missions.push("Mine Sweep");
        if (ship.torps > 0)
            missions.push("Lay Mines");
        else
            missions.push("Invalid");
        
        missions.push("Kill!!");
        if (ship.hullid == 84 || ship.hullid == 96 || ship.hullid == 9)
            missions.push("Bio Scan");
        else
            missions.push("Sensor Sweep");
        missions.push("Land and Disassemble");
        missions.push("Try to Tow");
        missions.push("Try to Intercept");
        
        //special race missions
        if (vgap.player.raceid == 1)
            missions.push("Super Refit");
        else if (vgap.player.raceid == 2 && ship.beams > 0)
            missions.push("Hisssss!");
        else if (vgap.player.raceid == 2)
            missions.push("Invalid");
        else if (vgap.player.raceid == 3)
            missions.push("Super Spy");
        else if (vgap.player.raceid == 4 && ship.beams > 0)
            missions.push("Pillage Planet");
        else if (vgap.player.raceid == 4)
            missions.push("Invalid");		
        else if (vgap.player.raceid == 5)
            missions.push("Rob Ship");
        else if (vgap.player.raceid == 6)
            missions.push("Self Repair");
        else if (vgap.player.raceid == 7 && ship.torps > 0)
            missions.push("Lay Web Mines");
        else if (vgap.player.raceid == 7)
            missions.push("Invalid");
        else if (vgap.player.raceid == 8)
            missions.push("Dark Sense");
        else if ((vgap.player.raceid == 9 || vgap.player.raceid == 11) && ship.bays > 0)
            missions.push("Build Fighters");
        else if ((vgap.player.raceid == 9 || vgap.player.raceid == 11))
            missions.push("Invalid");
        else if (vgap.player.raceid == 10)
            missions.push("Rebel Ground Attack");
         
		var hull = vgap.getHull(ship.hullid);	
		if (hull.cancloak)
			missions.push("Cloak");
		else
			missions.push("Invalid");
        
        missions.push("Beam up Fuel");
        missions.push("Beam up Duranium");
        missions.push("Beam up Tritanium");
        missions.push("Beam up Molybdenum");
        missions.push("Beam up Supplies");
        
        if (ship.hullid == 1090)
            missions.push("Repair Ship");
        else
            missions.push("Invalid");
        
        if (ship.hullid == 70 && vgap.advActive(44))
        missions.push("Destroy Planet");
        else
            missions.push("Invalid");
        
        return missions;
        
    };
    
    get_cookie =function( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    };
 //====================FLEET FUNCTIONS=================================
buildFleetList2=function()
{
fleetNames2.length=0;
fleetFlagships2.length=0;
fleetSizes2.length=0;
showFleet.length=0;

for (var i = 0; i < vgap.myships.length; i++) 
	{
	if (vgap.myships[i].name.charAt(0)=='[')
		if 	(vgap.myships[i].name.indexOf(']')!=-1)
		{
			var name=vgap.myships[i].name.substring(1,vgap.myships[i].name.indexOf(']'));
			var position=fleetNames2.indexOf(name);
			if (position==-1) //fleet is new
				{
				fleetNames2.push(name);
				fleetFlagships2.push(vgap.myships[i].id);
				fleetSizes2.push(1);
				showFleet.push(false);
//				position=(fleetNames2.length)-1;//for testing only
				}
			else
				fleetSizes2[position]++;
			
			//alert(name+' '+fleetSizes2[position]);
		}
		//alert(vgap.myships[i].name.charAt(1));
	}
};

returnFleetName2 = function(ship)
{
if (ship.name.charAt(0)=='[')
	if 	(ship.name.indexOf(']')!=-1)
		return(ship.name.substring(1,ship.name.indexOf(']')));
return(-1)
};

returnFlagshipID2 = function(fleet_name)
{
var index=fleetNames2.indexOf(fleet_name);
return(fleetFlagships2[index]);
};

returnFleetSize2 = function(fleet_name)
{
var index=fleetNames2.indexOf(fleet_name);
return (fleetSizes2[index]);
};

var oldchangeShipName=vgapShipScreen.prototype.changeShipName;

vgapShipScreen.prototype.changeShipName =  function () {
oldchangeShipName.apply(this, arguments); 
buildFleetList2();
};

var oldprocessLoad=vgaPlanets.prototype.processLoad;

vgaPlanets.prototype.processLoad = function (result){
oldprocessLoad.apply(this,arguments);
buildFleetList2();
};


//================END FLEET FUNCTIONS=================================
    //====================FUEL FUNCTIONS==================================
checkFuel = function(ship)
{
var fuel=0;
var path = vgap.getPath(ship);
for (var i = 0; i < path.length; i++) {
	if (vgaPlanets.prototype.version<3)
            fuel += getFuelUsage2(ship,path[i].x1, path[i].y1, path[i].x2, path[i].y2);
	else 	
			fuel += getFuelUsage3(ship,path[i].x1, path[i].y1, path[i].x2, path[i].y2);
       }
        if (fuel == 0)
            fuel += cloakedFuel(ship);
return(fuel);
};

cloakedFuel = function (ship) {
        var hull = vgap.getHull(ship.hullid);
        if ((ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8 && hull.cancloak)) && ship.hullid != 29 && ship.hullid != 31)
            return Math.max(5, Math.floor((hull.mass / 100) * 5));
        else
            return 0;
    };

turnFuel2 = function (distance, mass, xv, turndistance,ship) {
        return Math.floor(xv * Math.floor(mass / 10) * ((Math.floor(distance) / turndistance) / 10000)) + cloakedFuel(ship);
    },
	
	
getFuelUsage2 =  function (ship, x1, y1, x2, y2) {
        var engine = vgap.getEngine(ship.engineid);
        var distance = vgap.map.getDist(x1, y1, x2, y2);

        if (ship.warp == 0)
            return 0;

        var xv = 0;
        switch (ship.warp) {
            case 1:
                xv = engine.warp1;
                break;
            case 2:
                xv = engine.warp2;
                break;
            case 3:
                xv = engine.warp3;
                break;
            case 4:
                xv = engine.warp4;
                break;
            case 5:
                xv = engine.warp5;
                break;
            case 6:
                xv = engine.warp6;
                break;
            case 7:
                xv = engine.warp7;
                break;
            case 8:
                xv = engine.warp8;
                break;
            case 9:
                xv = engine.warp9;
                break;
        }
        //Save fuel value to update during the calculation
        var currentfuel = ship.neutronium;

        var fuel = 0;
        var turndistance = vgap.getSpeed(ship.warp, ship.hullid);

        var distanceremaining = distance;
        var mass = vgapShipScreen.prototype.getMass(ship, true);

        //tow
        if (ship.mission == 6 && ship.mission1target != 0) {
            var towship = vgap.getShip(ship.mission1target);
            if (towship != null)
                mass += vgapShipScreen.prototype.getMass(towship, true);
        }

        var warp = ship.warp;
        while (distanceremaining > turndistance) {
            distanceremaining -= turndistance;
            var turnfuel = turnFuel2(turndistance, mass, xv, turndistance,ship);
            fuel += turnfuel;
            ship.neutronium -= turnfuel;
            if (ship.neutronium < 0) {
                turnfuel = ship.neutronium;
                ship.neutronium = 0;
            }
            mass -= turnfuel;
            var pa = vgap.planetAt(x2, y2);
            if (distanceremaining < 3 && pa != null) {
                distanceremaining = 0;
            }
        }
        if (distanceremaining > 0)
            fuel += turnFuel2(distanceremaining, mass, xv, turndistance,ship);

        //Return fuel back to correct value
        ship.neutronium = currentfuel;

        return fuel;
    }
	
	getFuelUsage3 =  function (ship, x1, y1, x2, y2) {
        var engine = vgap.getEngine(ship.engineid);
        var distance = Math.dist(x1, y1, x2, y2);

        if (ship.warp == 0)
            return 0;

        if (vgap.isHyping(ship))
            return 50;

        var xv = vgap.getXV(engine, ship.warp);

        //Save fuel value to update during the calculation
        var currentfuel = ship.neutronium;

        var fuel = 0;
        var turndistance = vgap.getSpeed(ship.warp, ship.hullid);

        var distanceremaining = distance;
        var mass = vgap.getMass(ship, true);

        //tow
        if (ship.mission == 6 && ship.mission1target != 0) {
            var towship = vgap.getShip(ship.mission1target);
            if (towship != null)
                mass += vgap.getMass(towship, true);
        }

        var warp = ship.warp;
        while (distanceremaining > turndistance) {
            distanceremaining -= turndistance;
            var turnfuel = vgap.turnFuel(turndistance, mass, xv, turndistance, vgap.cloakFuel(ship));
            fuel += turnfuel;
            ship.neutronium -= turnfuel;
            if (ship.neutronium < 0) {
                turnfuel = ship.neutronium;
                ship.neutronium = 0;
            }
            mass -= turnfuel;
            var pa = vgap.planetAt(x2, y2);
            if (distanceremaining < 3 && pa != null) {
                distanceremaining = 0;
            }
        }
        if (distanceremaining > 0)
            fuel += vgap.turnFuel(distanceremaining, mass, xv, turndistance, vgap.cloakFuel(ship));

        //Return fuel back to correct value
        ship.neutronium = currentfuel;

        return fuel;
    }
//==========================END FUEL FUNCTIONS=======================================
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
