// ==UserScript==
// @name          Planets.nu - Enemy Ship List Plugin
// @namespace     Planets.nu
// @version       1.17
// @date          2014-04-26
// @author        kedalion
// @description   NU dashboard plugin which tracks and lists all ships ever seen. The plugin automatically updates the list and let's you gather information on the enemy fleet.
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/173252.meta.js
// @updateURL     https://userscripts.org/scripts/source/173252.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173252.user.js
// @homepage      http://planets.nu/discussion/utility-script-enemy-ship-list-plugin

// ==/UserScript==

/*
Change log:
1.17   Colored map tools entry. [2014-04-26]
1.16   Fixed game names not showing up in 'storage stats' [2014-03-19]
1.15   Storage stats now include more game details. [2014-02-20]
1.13   In case of insufficient memory, a popup will alert the user, but play will not be interrupted [2014-02-20]
1.12   Added a storage tab which allows to clear plugin data for all or individual games from browser storage [2014-02-20] 
1.11   Plugin is disabled by default to prevent all games from creating entries in browser storage [2014-02-19]
1.10   Fixed bug such that capitalships without weapons are recognized as freigthers [2014-02-03]
1.09   Added screen clearing on 'x' [2014-02-03]
1.08   Added display functionality for enemey ship locations on the starmap [2014-02-03]
1.07   Fixed a bug which blocked 'Other players' tab. Tab selection persistent after exit. [2014-01-26]
1.06   Added VCR (no ALLY VCRs) and combat message support [2014-01-25] 
1.05   Added 'intel summary' panel [2014-01-12]
1.04   Fixed minor things. [2013-08-05]
1.03   Added damage and crew to ship properties. Added code to prevent list reset when rebuild fails on time machine load error. [2013-08-04]
1.02   Fixed a bug which carrier data over into other games [2013-07-15]
1.01   Fixed the include paths [2013-07-14]
1.0    Release first full version [2013-07-14]
0.9    Initial beta release [2013-07-10]
*/
function wrapper () { // wrapper for injection
    
	if (vgap.version < 3.0) {
		console.log("EnemyShipList plugin requires at least NU version 3.0. Plugin disabled." );
		return;	
	}
	
	var plugin_version = 1.17;
   
    console.log("EnemyShipList plugin version: v" + plugin_version );
    
    function ShipMin() {
    	//selected fields from NU ship objects
		this.id = 0;
		this.name = "";
		this.ownerid = 0;
		this.hullid = 0;
		this.mass = 0;
		this.x = 0;
		this.y = 0;
		this.engineid = 0;
		this.warp = 0;
		this.beamid = 0;
		this.beams = 0;
		this.torpedoid = 0; 
		this.torps = 0;
		this.ammo = 0;
		this.damage = 0;
		this.crew = 0;
		this.neutronium = 0;
		
		//extra value
		this.infoturn = 1;
    };
	
	
	/**
	 *  Specify your plugin
	 *  You need to have all those methods defined or errors will be thrown. 
	 *  I inserted the print-outs in order to demonstrate when each method is 
	 *  being called. Just comment them out once you know your way around.
	 *  
	 *  For any access to plugin class variables and methods, 
	 *  "vgap.plugins["enemyShipListPlugin"].my_variable" has to be used 
	 *  instead of "this.my_variable".
	 */
	var enemyShipListPlugin = 
	{
			
			/**
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
				//console.log("ProcessLoad: plugin called.");
					
				//use game id and player slot to construct correct path to local storage
				vgap.plugins["enemyShipListPlugin"].storage_path = vgap.plugins["enemyShipListPlugin"].plugin_name +"." + vgap.gameId + "." + vgap.player.id + ".";

				//handle reset requests
				if (vgap.plugins["enemyShipListPlugin"].resetRequest) {
					vgap.plugins["enemyShipListPlugin"].resetRequest = false;
					
					vgap.plugins["enemyShipListPlugin"].enemyShipList = [];				

					//set turn variable to allow list read in
					vgap.plugins["enemyShipListPlugin"].firstListTurn = vgap.game.turn;
					vgap.plugins["enemyShipListPlugin"].currentListTurn = vgap.game.turn - 1;
	
				//save the emptied list to local storage or it will just be reloaded
//					this.saveEnemyShipList();
					
					
				} else {
				
					//try to load data from local storage
					vgap.plugins["enemyShipListPlugin"].loadEnemyShipList();
				
				}
				
				
				//update enemy ship list from loaded data
				vgap.plugins["enemyShipListPlugin"].updateEnemyShipList();									
							
			},	
			
			/**
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
				//console.log("LoadDashboard: plugin called.");
				
				//add Link to Enemy Ship List to left Dashboard menu
				var menu = document.getElementById("DashboardMenu").childNodes[2]; //insert after starships
				//var menu = $("<ul></ul>").appendTo("#DashboardMenu");	//append to end in new section	
				//" + vgap.plugins["enemyShipListPlugin"].enemyShipList.length + "
				$("<li style=\"color:#FF0000\">Alien Ships »</li>").tclick(function () { vgap.plugins["enemyShipListPlugin"].showEnemyShips(); }).appendTo(menu);
								
			},

			/**
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
				//console.log("ShowDashboard: plugin called.");			
			},
			
			/**
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
				//console.log("ShowSummary: plugin called.");
				
				//insert Icon for Enemy Starship List on Home Screen
				var summary_list = document.getElementById("TurnSummary").childNodes[0];
				var starbase_entry = summary_list.children[4];
				
				vgap.plugins["enemyShipListPlugin"].view = 6;
				
				var node = document.createElement("li");
				node.setAttribute("style", "color:#FF0000"); //#FF8000 //#DF0101");
				node.innerHTML = "<div class=\"iconholder\"><img src=\"http://planets.nu/_library/2013/7/enemy_ships.png\"/></div>" + 
								( vgap.plugins["enemyShipListPlugin"].numEnemyShips + vgap.plugins["enemyShipListPlugin"].numAlliedShips ) + 
								" Alien Starships";
				node.onclick = function() {vgap.plugins["enemyShipListPlugin"].showEnemyShips();};
				summary_list.insertBefore(node, starbase_entry);
				//summary_list.appendChild(node);
			},
			
			/**
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				//console.log("LoadMap: plugin called.");
				vgap.map.addMapTool("<span style=\"color:#FF0000\">Enemy Ships</span>", "ShowMinerals", vgap.plugins["enemyShipListPlugin"].showOverlayFilter);                
                
			},
			
			/**
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
				//console.log("ShowMap: plugin called.");
			},
			
			/**
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
				//console.log("Draw: plugin called.");
				vgap.plugins["enemyShipListPlugin"].drawEnemyShips();
			},		
			
			/**
			 * loadplanet: executed a planet is selected on dashboard or starmap
			 */
			loadplanet: function() {
				//console.log("LoadPlanet: plugin called.");
			},
			
			/**
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 */
			loadstarbase: function() {
				//console.log("LoadStarbase: plugin called.");
			},
			
			/**
			 * loadship: executed a planet is selected on dashboard or starmap
			 */
			loadship: function() {
				//console.log("LoadShip: plugin called.");
			},
			
			/***************************************************************************************
			 * Custom plugin variables
			 ***************************************************************************************/
			
			//things that get saved to disk
			enemyShipList: [],
			currentListTurn: 0,
			firstListTurn: 0,
			version: plugin_version,
			player_name: "",
			game_name: "",
			race_name: "",
			storage_path: "EnemyShipListPlugin.",
			
			
			//other variables
			plugin_name: "EnemyShipListPlugin",
			enabled: false,
			processAllTurns: false,
			resetRequest: false,
			playerFilterId: 1,
			includeUnknown: false,
			enableEdit: false,
			numEnemyShips: 0,
			numAlliedShips: 0,
			view: 6,
			drawSelection: [],

			colorsA : ["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"],
//			
			
			
			//original processLoad method
			oldProcessLoadHistory: null,
		    
			/***************************************************************************************
			 * Custom plugin methods
			 ***************************************************************************************/
			
			enablePlugin: function() {

				try {
					localStorage.setItem(this.storage_path + "version"	 , this.version);			
				} catch (err) {
					var msg = "The available localStorage space of your browser is too small to save the plugin data. Please use the 'Storage Stats' tab in the EnemyShipListPlugin to free some space.";
					alert(msg);					
				}

				this.enabled = true;
			},
			
			initializeDefaults: function() {
				this.enemyShipList = [];
				this.firstListTurn = vgap.game.turn;
				this.currentListTurn = vgap.game.turn - 1;
				this.player_name = vgap.player.username;
				this.game_name = vgap.game.name;
				this.race_name = (vgap.getRace(vgap.player.raceid)).shortname;
								
				this.numAlliedShips = 0;
				this.numEnemyShips = 0;
				this.playerFilterId = 1;
				this.includeUnknown = false;
				this.enableEdit = false;
				this.view = 6;
				
				for (var p = 0; p <= vgap.players.length; p++) {
					this.drawSelection[p] = false;
				}
			},
			
			
			/**
			 * Load current list of enemy ships from local data on browser cache or initialize empty list
			 */			
			loadEnemyShipList: function() {
							
					
							
				var stored_version 		= localStorage.getItem(this.storage_path + "version");
				var stored_list    		= localStorage.getItem(this.storage_path + "shiplist");
				var stored_turn    		= localStorage.getItem(this.storage_path + "turn");
				var first_turn     		= localStorage.getItem(this.storage_path + "firstturn");
//				var stored_game_name   	= localStorage.getItem(this.storage_path + "game_name");
//				var stored_player_name 	= localStorage.getItem(this.storage_path + "player");
//				var stored_race_name   	= localStorage.getItem(this.storage_path + "race");
				
				this.player_name = vgap.player.username;
				this.game_name = vgap.game.name;
				this.race_name = (vgap.getRace(vgap.player.raceid)).shortname;
				
				
				for (var p = 0; p <= vgap.players.length; p++) {
					this.drawSelection[p] = false;
				}
				
				//if plugin is not enabled for this game/player then exit
                if (stored_version != null) {	
                    this.enabled = true;
                    			
					if (stored_version != null && stored_list != null && stored_turn != null && first_turn != null) {
									
						//parse the data loaded from localstorage
						this.enemyShipList   = JSON.parse(stored_list);
						this.currentListTurn = parseInt(stored_turn);
						this.firstListTurn   = parseInt(first_turn);
						
						if (stored_version != this.version) {
							console.log("EnemyShipListPlugin: Warning: version mismatch addon (" + this.version + ") and local data (" + stored_version + ")!");
													
							if (stored_version < 1.03) {
								//upgrade missing properties with default values						
								for (var i = 0; i < this.enemyShipList.length; i++) {
									this.enemyShipList[i].neutronium = 0;
									this.enemyShipList[i].damage = -1;								
									this.enemyShipList[i].crew = -1;								
								}							
							}
							if (stored_version < 1.15) {								
								this.player_name = vgap.player.username;
								this.game_name = vgap.game.name;
								this.race_name = (vgap.getRace(vgap.player.raceid)).shortname;
							}
							
							this.saveEnemyShipList();
							
							//put possible version upgrade here
						}
						this.updateShipCounts();
						
						//this.enabled = true;
						
						return true;	
					}
                } else {
                    this.enabled = false;                    
                }
                
				
//				console.log("EnemyShipListPlugin: No previous data found for enemy ship list. User needs to enable plugin for current game/player combination.");
				console.log("EnemyShipListPlugin: No previous data found for enemy ship list. Creating data structures.");
								
				this.initializeDefaults();
											
				return false;		
			},
			
			/**
			 * Save current list of enemy ships to local data on browser cache
			 */	
			saveEnemyShipList: function() {

				if (!this.enabled) {
					return;
				}

				this.updateShipCounts();

				var stored_version = localStorage.getItem(this.storage_path + "version");
				var stored_list    = localStorage.getItem(this.storage_path + "shiplist");
				var stored_turn    = localStorage.getItem(this.storage_path + "turn");
				var first_turn     = localStorage.getItem(this.storage_path + "firstturn");
				var stored_player  = localStorage.getItem(this.storage_path + "player");
								
				try {
					localStorage.setItem(this.storage_path + "version"	 , this.version);			
					localStorage.setItem(this.storage_path + "shiplist"	, JSON.stringify(this.enemyShipList));
					localStorage.setItem(this.storage_path + "turn"		, this.currentListTurn);
					localStorage.setItem(this.storage_path + "firstturn"   , this.firstListTurn);
					
					localStorage.setItem(this.storage_path + "game_name"   , this.game_name);
					localStorage.setItem(this.storage_path + "player"   , this.player_name);
					localStorage.setItem(this.storage_path + "race"   , this.race_name);
					
				} catch (err) {
					
					//restore original values
					if (stored_version != null){
						localStorage.setItem(this.storage_path + "version"	 , stored_version);
					}
					if (stored_list != null) {
						localStorage.setItem(this.storage_path + "shiplist"	 , stored_list);
						this.enemyShipList = stored_list;
					}
					if (stored_turn != null) {
						localStorage.setItem(this.storage_path + "turn"	     , stored_turn);
						this.currentListTurn = stored_turn;
					}
					if (first_turn != null) {
						localStorage.setItem(this.storage_path + "firstturn", first_turn);
						this.firstListTurn = first_turn;
					}
					if (stored_player != null) {
						localStorage.setItem(this.storage_path + "player", stored_player);
						this.player_name = stored_player;
					}
					
					//show error message
					var msg = "The available space in the localStorage of your browser is too small to save the plugin data! \n\nPlease use the 'Storage Stats' tab in the EnemyShipListPlugin to free some space.";
					
					//abort potential rebuild in progress
					if (vgap.plugins["enemyShipListPlugin"].processAllTurns) {
						vgap.plugins["enemyShipListPlugin"].processAllTurns = false;
						msg += "\n \nDB rebuild aborted.";						
					} 
					
					alert(msg);					
				}

			},
			/**
			 * Removes all data from local storage (in browser) for a given game id and player slot
             * @param   game_id         id of the game to be removed
             * @param   player_slot     slot of the player to be removed 
			 */
			removeStorageEntry: function(game_id, player_slot) {
                var key_prefix = vgap.plugins["enemyShipListPlugin"].plugin_name +"." + game_id + "." + player_slot + ".";
                localStorage.removeItem(key_prefix + "version");
                localStorage.removeItem(key_prefix + "shiplist");
                localStorage.removeItem(key_prefix + "turn");
                localStorage.removeItem(key_prefix + "firstturn");
                localStorage.removeItem(key_prefix + "player");
                localStorage.removeItem(key_prefix + "race");
                localStorage.removeItem(key_prefix + "game_name");
			
                if (game_id == vgap.gameId && player_slot == vgap.player.id) {
                	vgap.plugins["enemyShipListPlugin"].initializeDefaults();
                	vgap.plugins["enemyShipListPlugin"].enabled = false;
                }
			
			},
			
			/**
			 * Remove all plugin data for all games and players from the local storage of the browser
			 */
			removeAllStorageEntries: function() {
			
                //setup regex filters:
                var pattern_plugin_entry = /EnemyShipListPlugin.[0-9]+.[0-9]+.version/;
                var pattern_no_version = /.[0-9]+.[0-9]+/;
                var pattern1 = /[0-9]+/;
                var pattern2 = /[0-9]+$/;    
			
                //go through local storage and find all entries for this plugin
				for (var key in localStorage) {
							
                    var tmp = pattern_no_version.exec(pattern_plugin_entry.exec(key));
                        
                    var match1 = pattern1.exec(tmp);
                    var match2 = pattern2.exec(tmp);
                        
                    if (match1 != "" && match2 != "" && match1 != null && match2 != null)
                    {
                        var game_id = parseInt(match1, 10);
                        var player_slot = parseInt(match2, 10);
                        this.removeStorageEntry(game_id, player_slot);
                    }
                }
			
			},
			
			/**
			 * Updates the status variables with number of allied and non allied ships
			 */
			updateShipCounts: function() {
				
				this.numEnemyShips = 0;
				this.numAlliedShips = 0;
				
				for (var es=0; es<this.enemyShipList.length; es++) {
					
					//ignore own ships
					if (this.enemyShipList[es].ownerid == vgap.player.id)
						continue;
					
					if (vgap.alliedTo(this.enemyShipList[es].ownerid)) {
						this.numAlliedShips++;
					} else {
						this.numEnemyShips++;
					}					
				}					
			},
						
			/**
			 * Update the ship list with data from current turn if appropriate
			 */				
			updateEnemyShipList: function() {
				
				console.log("Update called...");
				
				if (!this.enabled) {
				    return;
				}
				
				if (vgap.game.turn <= this.currentListTurn) {
					console.log("EnemyShipListPlugin: Turn before latest integrated data: ignored.");
					return;
				}				
				
				if (vgap.game.turn != (this.currentListTurn + 1)) {
					console.log("EnemyShipListPlugin: Current turn is " + vgap.game.turn + ".");
					console.log("EnemyShipListPlugin: Next turn for correct update required: " + (this.currentListTurn + 1) + ".");
					return;
				}
		
                console.log("Update going.");
        		
				//first process all VCRs
				for (var i = 0; i < vgap.vcrs.length; i++)
                {                   
                    var ship = null;
                                     
                    if (vgap.vcrs[i].leftownerid != vgap.player.id && vgap.vcrs[i].rightownerid != vgap.player.id) 
                    {
                        continue;   
                    }
                    
                    for (side = 0; side < 2; side++)
                    {
                        if (side == 0)
                        {
                            ship = vgap.vcrs[i].left;
                            ship.ownerid = vgap.vcrs[i].leftownerid;
                            ship.x = vgap.vcrs[i].x;
                            ship.y = vgap.vcrs[i].y;   
                        } 
                        else 
                        {
                            if (vgap.vcrs[i].battletype == 1)
                            {
                                //skip right ship for planet fights
                                continue;
                            }
                            ship = vgap.vcrs[i].right;   
                            ship.ownerid = vgap.vcrs[i].rightownerid;
                            ship.x = vgap.vcrs[i].x;
                            ship.y = vgap.vcrs[i].y;   
                        }
                        
                        //loop through list of enemy ships and delete ship with same id
    					for (var es=0; es<this.enemyShipList.length; es++) {
    						if (this.enemyShipList[es].id == ship.objectid) {
    							//remove ship
    							this.enemyShipList.splice(es,1);
    							break;
    						}					
    					}	
                         
                    	//add new enemy ship to list
    					var n = new ShipMin();
    					n.id = ship.objectid;
    					n.name = ship.name;
    					n.ownerid = ship.ownerid;
    					n.hullid = ship.hullid;
    					n.mass = ship.mass;
    					n.x = ship.x;
    					n.y = ship.y;	
    					n.warp = 0;
    					n.engineid = 0;
    					n.beamid = ship.beamid;
    					n.beams = ship.beamcount;
    					n.torpedoid = ship.torpedoid;
    					n.torps = ship.launchercount;
    					if (ship.baycount > 0) {
    					   n.ammo = ship.fighters;
    					} else {
    					   n.ammo = ship.torpedos;
    					}
    					n.infoturn = vgap.game.turn; 
    					n.damage = ship.damage;
    					n.crew = ship.crew;
    					n.neutronium = 0;
    					
    					//this.enemyShipList.push(vgap.ships[i]);
    					this.enemyShipList.push(n);
                    
                    }                
                }				
    				
				
				//process all combat messages
								
                for (var i = 0; i < vgap.messages.length; i++)
                {
                    
                    //check if a ship was destroyed
                    if (vgap.messages[i].messagetype == 6)
                    {
                        //check if own ship has destroyed another
                        pattern = /destroyed the .* ship .* ID#[0-9]*/;
                        pattern2 = /[0-9]*$/;
                        match = pattern2.exec(pattern.exec(vgap.messages[i].body));
                        
                        if (match != "")
                        {
                            shipID = parseInt(match, 10);                          
                            // loop through list of enemy ships and delete ship with same id
                            for (var es = 0; es < this.enemyShipList.length; es++)
                            {
                                if (this.enemyShipList[es].id == shipID)
                                {
                                    // remove ship
                                    this.enemyShipList.splice(es, 1);
                                    break;
                                }
                            }
                            continue;
                        } 
                        
                        //check if own ship has been destroyed 
                        pattern = /ID#[0-9]* has been destroyed/;
                        pattern2 = /[0-9]+/g;
                        match = pattern2.exec(pattern.exec(vgap.messages[i].body));
                        
                        if (match != "")
                        {
                            shipID = parseInt(match, 10);                          
                            // loop through list of enemy ships and delete ship with same id
                            for (var es = 0; es < this.enemyShipList.length; es++)
                            {
                                if (this.enemyShipList[es].id == shipID)
                                {
                                    // remove ship
                                    this.enemyShipList.splice(es, 1);
                                    break;
                                }
                            }
                        }   
                    }                
                }
				
				//remove all own and allied ships (they will get readded up to date)
//				console.log("Num ships: " + this.enemyShipList.length);
				for (var es = this.enemyShipList.length - 1; es >= 0 ; es--)
                {
                    
                    var ownerid = this.enemyShipList[es].ownerid;
                    
//                    console.log(es + ": owner: " + ownerid);
                     
                    if (ownerid == vgap.player.id || vgap.fullallied(ownerid) )
                    {
//                        console.log("delete");
                        // remove ship
                        this.enemyShipList.splice(es, 1);
                        
                    }
                }
				
				
				
				//process all ships
				for (var i=0; i<vgap.ships.length; i++) {
					
					//loop through list of enemy ships and delete ship with same id
					for (var es=0; es<this.enemyShipList.length; es++) {
						if (this.enemyShipList[es].id == vgap.ships[i].id) {
							//remove ship
							this.enemyShipList.splice(es,1);
							break;
						}					
					}	
					//if the current ship is one of your own, don't do anything
//					if (vgap.ships[i].ownerid == vgap.player.id) {
//						continue;				
//					}
				
					//add new enemy ship to list
					var n = new ShipMin();
					n.id = vgap.ships[i].id;
					n.name = vgap.ships[i].name;
					n.ownerid = vgap.ships[i].ownerid;
					n.hullid = vgap.ships[i].hullid;
					n.mass = vgap.ships[i].mass;
					n.x = vgap.ships[i].x;
					n.y = vgap.ships[i].y;	
					n.warp = vgap.ships[i].warp;
					n.engineid = vgap.ships[i].engineid;
					n.beamid = vgap.ships[i].beamid;
					n.beams = vgap.ships[i].beams;
					n.torpedoid = vgap.ships[i].torpedoid;
					n.torps = vgap.ships[i].torps;
					n.ammo = vgap.ships[i].ammo;
					n.infoturn = vgap.ships[i].infoturn; //vgap.game.turn; 
					n.damage = vgap.ships[i].damage;
					n.crew = vgap.ships[i].crew;
					n.neutronium = vgap.ships[i].neutronium;
					
					//this.enemyShipList.push(vgap.ships[i]);
					this.enemyShipList.push(n);
					//console.log(i + ": add id: " + vgap.ships[i].id + " length: " + this.enemyShipList.length);
				}
				
				this.enemyShipList.sort(function(a,b) {return (a.id - b.id);});
						
				this.currentListTurn = vgap.game.turn;
				
				this.saveEnemyShipList();
				
			},
			
			/**
			 * Reset enemy ship list and restart recording from current turn
			 */				
			resetEnemyShipList: function() {
							
				//delete current list content
				this.enemyShipList = [];				
				
				//set turn variable to allow list read in
				this.firstListTurn = vgap.game.turn;
				this.currentListTurn = vgap.game.turn - 1;
				
				this.updateEnemyShipList();
				
				//refresh the dashboard
				vgap.showDashboard();
				
			},
						
			/**
			 * Reset enemy ship list and restart recording from current turn
			 * It will automatically load all turn till 'NOW'.
			 */	
			rebuildListFromTurn: function(turn) {
				
				console.log("EnemyShipListPlugin: Rebuilding enemy ship list starting from turn " + turn);
				
				if (turn == null) {
					turn = vgap.game.turn;					
				}
								
				if (turn > vgap.nowTurn || turn < 1)
					return;	
				
				this.resetRequest = true;
			
				
//				this.enemyShipList = [];				
//				
//				
//				//set turn variable to allow list read in
//				this.firstListTurn = turn;
//				this.currentListTurn = turn - 1;
//
//				//save the emptied list to local storage or it will just be reloaded
//				this.saveEnemyShipList();
//				
				this.startUpdate(turn);	
				
			},
			
			/**
			 *
			 */
			startUpdate: function(turn) {
				this.processAllTurns = true;
				
				//console.log("startUpdate with turn: " + turn);
				
				if (turn == null) {
					turn = this.currentListTurn + 1;
				}
				
				
				if (turn < 1 || turn > vgap.nowTurn) {
					return;	
				}
				
				if (turn != vgap.nowTurn) {
					vgap.loadHistory(turn);
				} else {
					vgap.loadNow();
				}				
							
			},
			
			/**
			 * Delete a ship from the ship list.
			 * @param id	id of ship to remove
			 */
			removeShip: function(id) {
				for (var es=0; es<this.enemyShipList.length; es++) {
					if (this.enemyShipList[es].id == id) {
						//remove ship
						this.enemyShipList.splice(es,1);
						break;
					}					
				}
				//save the result
				this.saveEnemyShipList();				
			},
							
			/**
			 * Add a ship to the ship list
			 * @param ship  		object of type MinShip
			 * @param overwrite		boolean if existing entries should be overwritten
			 * @return 				success (false if ID exists already)
			 */
			addShip: function(ship, overwrite) {
				
				//check if ship with id already exists
				for (var es=0; es<this.enemyShipList.length; es++) {
					if (this.enemyShipList[es].id == ship.id) {
						if (overwrite) {
							//remove ship
							this.enemyShipList.splice(es,1);
							break;
						} else {
							return false;
						}
					}					
				}			
				
				//add ship to list
				this.enemyShipList.push(ship);
							
				//sort list
				this.enemyShipList.sort(function(a,b) {return (a.id - b.id);});
				
				//save the result
				this.saveEnemyShipList();	
				
				return true;
			},

			/**
			 * Generate the content for the enemy ship dashboard tab
			 * @param view
			 */
			showEnemyShipsView: function(view) {
                vgap.plugins["enemyShipListPlugin"].view = view;
                vgap.plugins["enemyShipListPlugin"].showEnemyShips();

            },
            
			/**
			 * Generate the content for the enemy ship dashboard tab
			 * 
			 */
			showEnemyShips: function() {

				vgap.playSound("button");
				vgap.closeSecond();

				vgap.dash.content.empty();
	       
	            view = vgap.plugins["enemyShipListPlugin"].view;
	
				//make sure edit is disabled except in single player view
				if (view != 3)
					vgap.plugins["enemyShipListPlugin"].enableEdit = false;


				if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
					vgap.hotkeysOn = false;
				}
					
				
				var capitalships_total = 0;
				var capitalships_in_list = 0;
				var freighters_total = 0;
				var freighters_in_list = 0;

				if (view == 3) {
					//for single player view: determine number of warships and freighters for this player
					var player = vgap.getPlayer(vgap.plugins["enemyShipListPlugin"].playerFilterId);
					capitalships_total = getNumForPlayer(player.id, "capitalships");
					freighters_total = getNumForPlayer(player.id, "freighters");
								
					for (var i=0; i<vgap.plugins["enemyShipListPlugin"].enemyShipList.length; i++) {
						var ship = vgap.plugins["enemyShipListPlugin"].enemyShipList[i];
						
						if (ship.ownerid != player.id)
							continue;
							
						var hull = vgap.getHull(ship.hullid);	
						if (hull.beams == 0 && hull.launchers == 0 && hull.fighterbays == 0) {
							freighters_in_list++;
						} else {
							capitalships_in_list++;	
						}							
					}	
				}

				
				//filter messages
				var html = "";
				
				$("<style type='text/css'>#PlanetTable td,#FreighterTable td{border-bottom:solid 1px #666} </style>").appendTo(vgap.dash.content);  
    
				//console.log("Test me!!");
				
				
				//if (view == null)
				//	view = 6;

				var filterMenu = $("<ul class='FilterMenu'></ul>").appendTo(vgap.dash.content);
				$("<li " + (view == 6 ? "class='SelectedFilter'" : "") + ">Intel Overview</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(6); }).appendTo(filterMenu);
				$("<li " + (view == 4 ? "class='SelectedFilter'" : "") + ">Complete</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(4); }).appendTo(filterMenu);
				$("<li " + (view == 0 ? "class='SelectedFilter'" : "") + ">Other Players</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(0); }).appendTo(filterMenu);
				$("<li " + (view == 1 ? "class='SelectedFilter'" : "") + ">Allies</li>").tclick(function() 		{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(1); }).appendTo(filterMenu);
				$("<li " + (view == 2 ? "class='SelectedFilter'" : "") + ">Non-Allies</li>").tclick(function() 		{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(2); }).appendTo(filterMenu);				
				$("<li " + (view == 3 ? "class='SelectedFilter'" : "") + ">Single Players</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(3); }).appendTo(filterMenu);
				$("<li " + (view == 5 ? "class='SelectedFilter'" : "") + ">Configuration</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(5); }).appendTo(filterMenu);
				$("<li " + (view == 7 ? "class='SelectedFilter'" : "") + ">Storage Stats</li>").tclick(function() 	{ vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(7); }).appendTo(filterMenu);

				
				html += "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 30) + "px;'>";
				
				html += "<br><table border='0' width='100%'>";
				
				
				if (view == 7) {
					
					html += "<table id='ConfigTable' align='left' border='0' width='100%' style='cursor:pointer;'>";
					
					html += "<tr><td><h2>Plugin Memory</h2></td></tr>";
					html += "<tr><td>This plugin keeps track of all ships not owned by you and stores this data in the local storage of your browser. Naturally, the capacity of this storage is limited varying from browser to browser and depends on individual settings. This page will show ALL game/player combinations that have plugin data in the local storage. You can choose to clear <strong style='color:#FF0000'>all plugin data</strong> or <strong style='color:#FF0000'> data for individual game/player combinations</strong>. <br></td></tr>";

					html += "<tr><td><br /> </td></tr>";
					html += "<tr><td><br /> </td></tr>";
					
					
					// Header row
					html += "<tr><td><table id='ShipTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
					
					html += "<th align='right'>Game Id</th>";
					html += "<th align='right'>Name</th>";
					html += "<th align='right'>Slot</th>";
					html += "<th align='right'>Player</th>";
					html += "<th align='right'>Race</th>";
					html += "<th align='right'>#1 Turn</th>";
					html += "<th align='right'>Last Turn</th>";
					html += "<th align='right'>Memory</th>";					
					html += "<th align='right'>Version</th>";
					html += "<th align='right'>Delete?</th>";
					
					
					html += "</thead><tbody id='ShipRows' align=left  >";
					html += "</tbody></table></td></tr></table><p>&nbsp;</p></div>";
					
					this.pane = $(html).appendTo(vgap.dash.content);
					
	
			
					var total_size = 0;
					
					//go through local storage and find all entries for this plugin
					for (var key in localStorage) {
							
						html = "";
						
                        var pattern_plugin_entry = /EnemyShipListPlugin.[0-9]+.[0-9]+.version/;
                        var pattern_no_version = /.[0-9]+.[0-9]+/;
                        var tmp = pattern_no_version.exec(pattern_plugin_entry.exec(key));
                        var pattern1 = /[0-9]+/;
                        var pattern2 = /[0-9]+$/;
                        var match1 = pattern1.exec(tmp);
                        var match2 = pattern2.exec(tmp);
                        
                        if (match1 != "" && match2 != "" && match1 != null && match2 != null)
                        {
                        	var game_id = parseInt(match1, 10);
                        	var player_slot = parseInt(match2, 10);
                        	
                        	var data_size = 0;

                        	var version = "?";                            
                        	var last_turn = "?";
                        	var first_turn = "?";
                        	var game_name = "?";
                        	var player_name = "?";
                        	var race_name = "?";

                        	var item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".version");
                        	if (item != null) {
                        		version = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                         		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".shiplist");
                        	if (item != null) {
                        		//	last_turn = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                       		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".turn");
                        	if (item != null) {
                        		last_turn = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                          		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".firstturn");
                        	if (item != null) {
                        		first_turn = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                            		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".game_name");
                        	if (item != null) {
                        		game_name = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                           		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".player");
                        	if (item != null) {
                        		player_name = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                          		
                        	}
                        	item = localStorage.getItem("EnemyShipListPlugin." +game_id+ "." +player_slot+ ".race");
                        	if (item != null) {
                        		race_name = item;
                        		data_size += item.length * 2; //each symbol is 2 bytes on disk                        		                            		
                        	}
                        	
                        	total_size += data_size;

                        	html += "<tr>";

                        	var bold_start = "";
                        	var bold_stop = "";
                        	var color = "#FFFFFF";

                        	if (game_id == vgap.gameId && player_slot == vgap.player.id) {
                        		bold_start = "<strong>";
                        		bold_stop = "</strong>";
                        		color = "#33CC33";
                        	}	

                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + game_id + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + game_name + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + player_slot + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + player_name + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + race_name + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + first_turn + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + last_turn + bold_stop + "</td>";
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + (data_size/1024.0).toFixed(2) + bold_stop + " kb</td>"; 
                        	html += "<td style='color:"+ color +"' align='right'>" + bold_start + version + bold_stop + "</td>";


                        	html += "<td align='right'><button type='button' class='TestButton' onClick='vgap.plugins[\"enemyShipListPlugin\"].removeStorageEntry("+game_id+","+player_slot+"); " +
                        	"vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView("+view+");'> Delete </button></td>";	        					
                        	html += "</tr>";

                        	$(html).appendTo("#ShipRows");		                            
                        }  	
					}
					
					html = "<tr>";
   					
        			html += "<td style='color:#FF0000' align='right'><strong>All games</strong></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'><strong>All players</strong></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'><strong>" + (total_size/1024.0).toFixed(2) + " kb</strong></td>";
        			html += "<td style='color:#FF0000' align='right'></td>";
        			html += "<td style='color:#FF0000' align='right'><button type='button' class='TestButton' onClick='vgap.plugins[\"enemyShipListPlugin\"].removeAllStorageEntries(); " +
									"vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView("+view+");'><strong> Delete All</strong> </button></td>";	
        			
        			html += "</tr>";
                            
			        $(html).appendTo("#ShipRows");
					
					//make ship table sortable
					$("#ShipTable").tablesorter();
					
					this.pane.jScrollPane();


					// vgap.action added for the assistant (Alex):
					vgap.action(); 
					
					
					return;
				}
 				
				
				
				if (this.enabled) {
                    html += "<tr><td><h3><strong>This enemy ship list is based on information from turn " + vgap.plugins["enemyShipListPlugin"].firstListTurn + " up to turn " + vgap.plugins["enemyShipListPlugin"].currentListTurn + ". </strong></h3></td></tr>";
				
				    if (vgap.plugins["enemyShipListPlugin"].currentListTurn != vgap.nowTurn) {
					   html += "<tr><td><h3 style='color:#FF0000'>Warning: this list does not include the latest turns yet.<br> " + 
							"You will need to either incrementally go through all turns starting at turn " + ((vgap.plugins["enemyShipListPlugin"].currentListTurn) + 1) + " or use the auto update: <button type='button' class='TestButton' onClick='vgap.plugins[\"enemyShipListPlugin\"].startUpdate();'> Auto update</button> <br>" + 
							"You can find more info on the configuration tab!</h3></td></tr>";
				    }
				    if (vgap.plugins["enemyShipListPlugin"].currentListTurn > vgap.game.turn) {
					   html += "<tr><td><h3 style='color:#FF0000'><strong>Information in this list is newer than the currently viewed turn! Most recent processed turn: " + vgap.plugins["enemyShipListPlugin"].currentListTurn + ". </strong></h3></td></tr>";
				    }
                } else {
                    html += "<tr><td><h3 style='color:#FF0000'><strong>Plugin is not enabled for this game/player combination on this machine.</strong><br> ";
                    
                    if (view != 5) { 
					    //html += "To enable the plugin, go to the <strong><label style='text-decoration:underline; color: #FFFFFF; ' onClick='vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(5);'>Configuration tab</label></strong>.";              } else {
					    html += "To enable the plugin, select one of the options below: <br>";
                       
                        html += "<button type='button' class='TestButton' onClick=' " + 
		 			         "vgap.plugins[\"enemyShipListPlugin\"].enablePlugin();" +
							 "vgap.plugins[\"enemyShipListPlugin\"].resetEnemyShipList();" + 
                             "vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView("+view+");'>" + 
							 "Initialize list from the current turn only! </button>&nbsp;&nbsp;&nbsp;";
                       
                       //html += "Initialize just from current turn: <br>";
                        html += "<button type='button' class='TestButton' onClick=' " +
							 "vgap.plugins[\"enemyShipListPlugin\"].enablePlugin();" +
							 "vgap.plugins[\"enemyShipListPlugin\"].rebuildListFromTurn(1);'> " + 
							 "Build list starting from turn 1 (may take a while)! </button><br>";
							
                        html += "You can find more options and detailed information on the <strong><label style='text-decoration:underline; color: #FFFFFF; ' onClick='vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(5);'>Configuration tab</label></strong>.";
							
							
                                
				    } else { 
				        html += "See options below to enable the plugin.";
				    }
				    html += "<br></h3></td></tr>";
                }				
				
				html += "</table><br>";
				
				//Configuration page
				if (view == 5) {
					html += "<table id='ConfigTable' align='left' border='0' width='60%' style='cursor:pointer;'>";
												
					html += "<tr><td><h2>Plugin Description</h2></td></tr>";
					html += "<tr><td>This plugin keeps track of all ships not owned by you (alien). Though your own ships are also listed in some views, the normal 'Starships' view should give you a much better overview. Several list views are available as well as menu item 'EnemyShips' in the map tools that allow to show the last known locations for all know enemy ships on the starmap. When a game is opened the first time after plugin installation, the plugin will be disabled. It needs to be activated for each game/player combination. Additionally, as the plugin stores its data locally on the computer, it also needs to be enabled on each computer on which you wish to use it. <br> The most basic option is to initialize the plugin starting from just the current turn (option 'Import only current turn'). Depending on the progress of the game you should rebuild the list starting at turn 1 using the options below ('Erase list and rebuild from selected turn!' with turn 1 selected). This will go through all turns from 1 to now integrating all the data into one list. Be aware that this might take some time depending on the current turn number and your internet connection. You will see the different turn numbers come by on the dashboard. You must not interrupt the script! (Depending on the length, your browser will issue a warning and offer to cancel the script. Don't do it... It's a trap! ;) ) <br></td></tr>";
					html += "<tr><td><strong>What it does:</strong> <br> The plugin list contains all sightings of enemy ships and keeps track of them. Ships will get updated whenever newer information is available. They stay in the list until a new ship with the same ID is sighted. This does NOT mean that the ship in the list actually still exists! But at least there was no evidence against it yet.<br> " + 
                            "The script parses sightings, own VCRs (ship states before the combat), and combat messages. <br></td></tr>";
					html += "<tr><td><strong>What it does NOT do:</strong> <br> The plugin does not take information from allied VCRs. Unfortunately, the info taken from own VCRs consist of the state of the ship before the fight as the state afterwards is not available directly. If you see a ship being destroyed in an allied VCR, you can delete it manually from the list on the 'Single Player' list using the 'Edit' feature. Likewise, you can add ships that you saw in a VCR but not on the map. Ships destroyed by mine hits or just listed in 'Explosion' reports are also not removed as the respective messages only contain the ship name. If you feel confident enough on which ship it was, go ahead and delete it manually. <br> Also be advised that NU stores the information on beam weapons such that no equipped beam weapons despite of beam weapon slots in the hull in the same way as an unknown number of beams. Therefore, capitalships that are built without beam weapons that should be counted as freighters will be counted as capital ships... <br><br> " + 
							"The plugin stores its data inside the local storage of the browser. This allows the data of all game turns to be instantly available. BUT it is not shared between different browsers, different computers, and not between subdomains of NU: planets.nu, play.planets.nu, test.planets.nu. So while you can read in and keep the list up to date on multiple computers (e.g. home computer and laptop), any custom entries you are making will ONLY be available on that machine-browser-domains combination. (There might be an import/export functionality in the future if there is much interest.)<br><br>" +
                            "Plugin data can be easily deleted for the current game as well as any other game/player combination from the 'Storage Stats' tab." 
							"</td></tr>";
					html += "<tr><td><br /> </td></tr>";
					html += "<tr><td><strong>Feedback:</strong><br> If you have any feedback on the performance or missing features of the plugin, please send me a private message on NU: <a href='http://planets.nu/#/account/kedalion' target='_blank'>http://planets.nu/#/account/kedalion</a>. </td></tr>"; 
						
					html += "<tr><td><br /> </td></tr>";
					html += "<tr><td>Best used together with <strong>lord helmet's</strong> script '<a href='http://planets.nu/discussion/utility-script-load-your-own-ships-into-vcrsimulator' target='_blank'>Planets.nu - load your owned ships in simulator'</a> found at <a href='http://userscripts.org/scripts/show/134293' target='_blank'>http://userscripts.org/scripts/show/134293</a>. </td></tr>"; 
																							
					html += "<tr><td><br /> </td></tr>";
					
					if (vgap.plugins["enemyShipListPlugin"].enabled) {
					   html += "<tr><td><h2>Update all missing recent turns:</h2></td></tr>";
					   html += "<tr><td>The command will use a time machine command to go to the earliest missing turn. " + 
							"(Your list currently contain data up to turn " + vgap.plugins["enemyShipListPlugin"].currentListTurn + ".) " +
							"Then all more recent turns will be automatically loaded and processed. Use this option if you played some turns on a different machine and need to get the list back in sync. (You can also manually go throught the missing turns from the lowest turn till now. This is easiest on the starmap using the hotkeys.)</td></tr>";
                        html += "<tr><td><button type='button' class='TestButton' onClick='vgap.plugins[\"enemyShipListPlugin\"].startUpdate();'> " + 
							"Update list with missing recent turns! </button></td></tr>";
					
					   html += "<tr><td><br /> </td></tr>";
					}
					
					html += "<tr><td><h2>Reset and rebuild list from specific turn:</h2></td></tr>";
					html += "<tr><td>This will empty the ship list! The command will delete all enemy ship data and rebuild it starting from the " + 
							"selected turn. All more recent turns will be automatically loaded and processed. When first loading the plugin in running " + 
							"games, this allows to initialize the plugin with all past information. <br> " + 
							"<strong><font style='color:red'>Be aware that all previous custom entries will be lost!</font></strong> </td></tr>";
					html += "<tr>" + 
							"<td><strong>Turn:</strong> <select id='rebuildStartTurn' >" +
							"<option value='1' selected='selected'>1</option>";
							
							for (var t=2; t<=vgap.nowTurn; t++) {
								html += "<option value='" + t + "'>" + t + "</option>";
							}
							
					html += "</select></td></tr>";
					html += "<tr><td><button type='button' class='TestButton' onClick=' " +
							"var turn = document.getElementById(\"rebuildStartTurn\").options[document.getElementById(\"rebuildStartTurn\").selectedIndex].value; " +
							"vgap.plugins[\"enemyShipListPlugin\"].enablePlugin();" +
							"vgap.plugins[\"enemyShipListPlugin\"].rebuildListFromTurn(turn);'> " + 
							"Erase list and rebuild from selected turn! </button></td>" + 
							"</tr>";					
							
					html += "<tr><td><br /> </td></tr>";
					
					html += "<tr><td><h2>Import only current turn:</h2></td></tr>";
					html += "<tr><td>This will empty the ship list! It will reset the enemy ship list and initialize ONLY from the current turn. " +  
							"All more recent turns will NOT be automatically loaded and processed. You will need to manually iterate through all " + 
							"more recent turns in order to update. This is mostly only used for testing to see how much data is visbile in just one " + 
							"turn. <br> " + 
							"<strong><font style='color:red'>Be aware that all previous custom entries will be lost!</font></strong></td></tr>";
					html += "<tr><td><button type='button' class='TestButton' onClick=' " + 
		 			        "vgap.plugins[\"enemyShipListPlugin\"].enablePlugin();" +
							"vgap.plugins[\"enemyShipListPlugin\"].resetEnemyShipList(); vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(5);'>" + 
							"Reset list to just current turn! </button></td></tr>";
					html += "<tr><td><br /> </td></tr>";
					html += "<tr><td><br /> </td></tr>";	
					html += "<tr><td><br /> </td></tr>";	
					html += "<tr><td><br /> </td></tr>";							
					html += "</table>";
					html += "</div>";
					
					this.pane = $(html).appendTo(vgap.dash.content);
					
					this.pane.jScrollPane();


					// vgap.action added for the assistant (Alex):
					vgap.action(); 
					return;
					
				} else if (view == 6) { //Intel Summary
				
					html += "<p><h2 title='Shows the number of capital ships and freighters known (in list but not guaranteed) to number of ships shown in scoreboard. These values are ALWAYS for the most current turn in the DB and not the current game turn.'>Intel Summary</h2></p>";
					
					if (vgap.plugins["enemyShipListPlugin"].currentListTurn > vgap.game.turn) {
						html += "<p style='color:#FF8000'>The total number of ships belongs to the current turn (" + vgap.game.turn + ") while the number of 'known' ships belongs to the latest DB turn (" + vgap.plugins["enemyShipListPlugin"].currentListTurn + ")! Therefore more ships can be 'known' than a race actually has...</p> <br>";
					}
					
					// Header row
					html += "<table id='ShipTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
					
					html += "<th align='left'>Id</th>";
					html += "<th align='left'>Player</th>";
					html += "<th align='left'>Race</th>";
					
					html += "<th align='left' title='Click here to sort by percentage of capital ships known.'>Capital Ships</th>";
					html += "<th align='left' title='Click here to sort by percentage of freighters known.'>Freigthers</th>";
					html += "<th align='left'>Total Ships</th>";
					
					html += "</thead><tbody id='ShipRows' align=left  >";
					html += "</tbody></table><p>&nbsp;</p></div>";
					
					this.pane = $(html).appendTo(vgap.dash.content);
					
					//iterate over all player
					
					for (var p=0; p<vgap.players.length; p++) {
					
						html = "";
						
						capitalships_in_list = 0;
						freighters_in_list = 0;
						
						//for single player view: determine number of warships and freighters for this player
						var player = vgap.players[p]; //getPlayer(vgap.plugins["enemyShipListPlugin"].playerFilterId);
						capitalships_total = getNumForPlayer(player.id, "capitalships");
						freighters_total = getNumForPlayer(player.id, "freighters");
									
						for (var i=0; i<vgap.plugins["enemyShipListPlugin"].enemyShipList.length; i++) {
							var ship = vgap.plugins["enemyShipListPlugin"].enemyShipList[i];
							
							if (ship.ownerid != player.id)
								continue;
								
							var hull = vgap.getHull(ship.hullid);	
							if ((hull.beams == 0 || (ship.beamid == 0 && ship.ownerid == vgap.player.id)) && (hull.launchers == 0 || (ship.torpedoid == 0 && ship.ownerid == vgap.player.id)) && hull.fighterbays == 0) {
								freighters_in_list++;
							} else {
								capitalships_in_list++;	
							}							
						}	
						var race = vgap.getRace(player.raceid);
						
						//console.log("Player: " + player.id + " playing race: " + race.shortname + " and name: " + player.username);
						
						var color= this.colorsA[player.id];;
						html += "<tr>";
						
						html += "<td style='color:"+ color +"'>" + player.id + "</td>";
						html += "<td style='color:"+ color +"'>" + player.username + "</td>";
						html += "<td style='color:"+ color +"'>" + race.shortname + "</td>";
						html += "<td style='color:"+ color +"'> <div style='display: none;'>"+ (capitalships_in_list/capitalships_total) + "</div>" + capitalships_in_list + " / " + capitalships_total + "</td>";
						html += "<td style='color:"+ color +"'> <div style='display: none;'>"+ (freighters_in_list/freighters_total) + "</div>" + freighters_in_list + " / " + freighters_total + "</td>";
						html += "<td style='color:"+ color +"'>" + (freighters_total + capitalships_total) + "</td>";
						html += "</tr>";
												
                       	var select = function(playerid) { return function() { vgap.plugins["enemyShipListPlugin"].playerFilterId = playerid; vgap.plugins["enemyShipListPlugin"].showEnemyShipsView(3); }};
                        $(html).click(select(player.id)).appendTo("#ShipRows");			
						
					
					}
					
					
					
					//this.pane = $(html).appendTo(vgap.dash.content);
					
					//make ship table sortable
					$("#ShipTable").tablesorter();
					
					this.pane.jScrollPane();


					// vgap.action added for the assistant (Alex):
					vgap.action(); 
					return;
					
				}
				
			
				
				//Single player: player selection box and 
				if (view == 3 || view == 4) {
					html += "<table id='PlayerSelectionTable' align='left' border='0' width='60%' style='cursor:pointer;'>";
					html += "<tr>";
					
					if (view == 3) {
						html += "<td><strong>Select Player:</strong> <select id='shipListPlayer' "+ 
							"onChange='vgap.plugins[\"enemyShipListPlugin\"].playerFilterId = this.options[this.selectedIndex].value; " +
							"vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(3);'>";

						for (var p=0; p<vgap.players.length; p++) {
							html += "<option ";
							if (vgap.players[p].id == vgap.plugins["enemyShipListPlugin"].playerFilterId) {
								html += "selected='selected' ";
							}
							html += "value='" + vgap.players[p].id + "'>" + vgap.players[p].id + " - " + vgap.players[p].fullname + "</option>";
						}
						html += "</select> <br></td>";
					}							
						
					html += "<td>Show unknown ship slots: <input type='checkbox' " + (vgap.plugins["enemyShipListPlugin"].includeUnknown ? "checked='yes' " : "") + "id='includeUnknownBox' onclick='vgap.plugins[\"enemyShipListPlugin\"].includeUnknown = this.checked; vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(" + view + ");' /></td</tr>";
					
					if (view == 3) {
						html += "<td>Enable edit: <input type='checkbox' " + (vgap.plugins["enemyShipListPlugin"].enableEdit ? "checked='yes' " : "") + "id='enableEditBox' onclick='vgap.plugins[\"enemyShipListPlugin\"].enableEdit = this.checked; vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(" + view + ");' /></td</tr>";
					}
					html += "</table>";					
				}				
			
				//section heading only needed if in single player view
				if (view == 3) {

					if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
						
						html += "<p>&nbsp;</p>";
						html += "<div id='ShipEditArea'><table id='ShipEditTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
						
						html += "<th align='left'>Id</th>";
						html += "<th align='left'>Hull</th>";
						html += "<th align='left'>Ship Name</th>";
						html += "<th align='left'>Turn</th>";
						html += "<th align='left'>X</th>";
						html += "<th align='left'>Y</th>";
						html += "<th align='left'>Engine(s)</th>";
						html += "<th align='left'>#Beams</th>";
						html += "<th align='left'>Beamtype</th>";
						html += "<th align='left'>#Tubes</th>";
						html += "<th align='left'>Tubestype</th>";
						html += "<th align='left'>Ammo</th>";
						html += "<th align='left'>Mass</th>";
						html += "<th align='left'>Crew</th>";
						html += "<th align='left'>Damage</th>";
						html += "<th align='left'>Save</th>";
						html += "</thead><tbody id='ShipEditRows' align=left  >";
	
						html += "<td><select id='shipIdCombo'>";
						
								var id = 1;
								for (var s=0; s<vgap.plugins["enemyShipListPlugin"].enemyShipList.length; s++) {
									var ship = vgap.plugins["enemyShipListPlugin"].enemyShipList[s];									
									while (id < parseInt(ship.id)) {
										html += "<option value='" + id + "'>" + id + "</option>";										
										id++;
									}									
									id = parseInt(ship.id) + 1;									
								}								
								while (id <= 500) {
									html += "<option value='" + id + "'>" + id + "</option>";
									id++;
								}									
						html += "</select> <br></td>";
											
						html += "<td><select id='shipHullCombo' onChange=' " + 
								"var val = this.options[this.selectedIndex].value; " +
								"if (val != 0) { " +
								"  var hull = vgap.getHull(val); " + 
								"  document.getElementById(\"shipNameTextbox\").value = hull.name; " +
								"  document.getElementById(\"shipNumBeamsTextbox\").value = hull.beams; " + 
								"  document.getElementById(\"shipNumTubesTextbox\").value = hull.launchers; " +
  								"  document.getElementById(\"shipCrewTextbox\").value = hull.crew; " +
								"}'>";

						//add only the race specific hulls first
						var player = vgap.getPlayer(vgap.plugins["enemyShipListPlugin"].playerFilterId);
						var race = vgap.getRace(player.raceid);
												
						for (var h=0; h<race.hulls.split(",").length; h++) {
							html += "<option ";
							html += "value='" + race.hulls.split(",")[h] + "'>" + vgap.getHull(race.hulls.split(",")[h]).name + "</option>";
						}
						html += "<option value='0'>-----------</option>";
						
						//now all others (duplicate with the race hulls, but not important
						for (var h=0; h<vgap.hulls.length; h++) {
							html += "<option ";
							html += "value='" + vgap.hulls[h].id + "'>" + vgap.hulls[h].name + "</option>";
						}						
						
						html += "</select> <br></td>";
						html += "<td><input type='text' id='shipNameTextbox' size='40'></td>";
						html += "<td><input type='text' id='shipTurnTextbox' size='2' value='" + vgap.game.turn + "'></td>";
						html += "<td><input type='text' id='shipXTextbox' size='3' value='2000'></td>";
						html += "<td><input type='text' id='shipYTextbox' size='3' value='2000'></td>";
						
						//engines
						html += "<td><select id='shipEngineCombo' onChange='function() {}'>";
						html += "<option value='0'>Unknown</option>";
						for (var h=0; h<vgap.engines.length; h++) {
							html += "<option ";
							html += "value='" + vgap.engines[h].id + "'>" + vgap.engines[h].name + "</option>";
						}												
						html += "</select> <br></td>";
						
						//beam weapons
						html += "<td><input type='text' id='shipNumBeamsTextbox' size='2' value='0'></td>";
						html += "<td><select id='shipBeamCombo' onChange='function() {}'>";
						html += "<option value='0'>Unknown</option>";
						for (var h=0; h<vgap.beams.length; h++) {
							html += "<option ";
							html += "value='" + vgap.beams[h].id + "'>" + vgap.beams[h].name + "</option>";
						}												
						html += "</select> <br></td>";
						
						//torpedo tubes
						html += "<td><input type='text' id='shipNumTubesTextbox' size='2' value='0'></td>";
						html += "<td><select id='shipTubeCombo' onChange='function() {}'>";
						html += "<option value='0'>Unknown</option>";
						for (var h=0; h<vgap.torpedos.length; h++) {
							html += "<option ";
							html += "value='" + vgap.torpedos[h].id + "'>" + vgap.torpedos[h].name + "</option>";
						}												
						html += "</select> <br></td>";						
						
						html += "<td><input type='text' id='shipAmmoTextbox' size='4' value='0'></td>";
						html += "<td><input type='text' id='shipMassTextbox' size='4' value='0'></td>";
						html += "<td><input type='text' id='shipCrewTextbox' size='4' value='1'></td>";
						html += "<td><input type='text' id='shipDamageTextbox' size='3' value='0'></td>";
												
						html += "<td><button type='button' class='TestButton' onClick='" +
								"var n = {}; " + 
								"n.id = document.getElementById(\"shipIdCombo\").options[document.getElementById(\"shipIdCombo\").selectedIndex].value; " + 
								"n.name = document.getElementById(\"shipNameTextbox\").value; " +
								"n.ownerid = vgap.plugins[\"enemyShipListPlugin\"].playerFilterId; " + 
								"n.hullid = document.getElementById(\"shipHullCombo\").options[document.getElementById(\"shipHullCombo\").selectedIndex].value; " +
								"n.mass = document.getElementById(\"shipMassTextbox\").value; " + 
								"n.x = document.getElementById(\"shipXTextbox\").value; " + 
								"n.y = document.getElementById(\"shipYTextbox\").value; " +
								"n.engineid = document.getElementById(\"shipEngineCombo\").options[document.getElementById(\"shipEngineCombo\").selectedIndex].value; " +
								"n.beamid = document.getElementById(\"shipBeamCombo\").options[document.getElementById(\"shipBeamCombo\").selectedIndex].value; " +
								"n.beams = document.getElementById(\"shipNumBeamsTextbox\").value; " +
								"n.torpedoid = document.getElementById(\"shipTubeCombo\").options[document.getElementById(\"shipTubeCombo\").selectedIndex].value; " +
								"n.torps = document.getElementById(\"shipNumTubesTextbox\").value; " + 
								"n.ammo = document.getElementById(\"shipAmmoTextbox\").value; " + 
								"n.crew = document.getElementById(\"shipCrewTextbox\").value; " + 
								"n.damage = document.getElementById(\"shipDamageTextbox\").value; " + 
								"n.infoturn = document.getElementById(\"shipTurnTextbox\").value; " + //console.log('right here');" + 
								"vgap.plugins[\"enemyShipListPlugin\"].addShip(n, false); vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView(" + view + ");" + 		
								"'> Save </button></td>";
						
						html += "</tr>";
						
						html += "</tbody></table></div><p>&nbsp;</p>";
						
						
						
						
					}
					
					
					
					
					html += "<br><br><p><h2 title='You have "+ capitalships_in_list + " warships in the list while the player has " + capitalships_total + " according to the scoreboard.'>Warships (" + capitalships_in_list + " / " + capitalships_total + ")</h2></p>";
				}
				
				// Header row
				html += "<table id='ShipTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
				
				html += "<th align='left'>Player</th>";
				html += "<th align='left'>Race</th>";
				html += "<th align='left'>Id</th>";
				html += "<th align='left'>Hull</th>";
				html += "<th align='left'>Ship Name</th>";
				if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
					html += "<th align='left'>Delete</th>";
				}
				html += "<th align='left'>Turn</th>";
				html += "<th align='left'>Location</th>";
				html += "<th align='left'>Engine</th>";
				html += "<th align='left'>Beams</th>";
				html += "<th align='left'>Launcher/Bays</th>";
				html += "<th align='left'>Ammo</th>";
				html += "<th align='left'>Mass</th>";
				html += "<th align='left'>Crew</th>";
				html += "<th align='left'>Damage</th>";
				
				html += "</thead><tbody id='ShipRows' align=left  >";
				html += "</tbody></table><p>&nbsp;</p>";
								
				
				//table for freighter section in single player view
				if (view == 3) {
										
					html += "<p><h2 title='You have "+ freighters_in_list + " freighters in the list while the player has " + freighters_total + " according to the scoreboard.'>Freighters (" + freighters_in_list + " / " + freighters_total + ")</h2></p>";
					
					// Header row
					html += "<table id='FreighterTable' align='left' border='0' width='100%' style='cursor:pointer;'><thead>";
				
					html += "<th align='left'>Player</th>";
					html += "<th align='left'>Race</th>";
					html += "<th align='left'>Id</th>";
					html += "<th align='left'>Hull</th>";
					html += "<th align='left'>Ship Name</th>";
					if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
						html += "<th align='left'>Delete</th>";
					}
					html += "<th align='left'>Turn</th>";
					html += "<th align='left'>Location</th>";
					html += "<th align='left'>Engine</th>";
					html += "<th align='left'>Beams</th>";
					html += "<th align='left'>Launcher/Bays</th>";
					html += "<th align='left'>Ammo</th>";
					html += "<th align='left'>Mass</th>";
					html += "<th align='left'>Crew</th>";
					html += "<th align='left'>Damage</th>";
					
					html += "</thead><tbody id='FreighterRows' align=left  >";
					html += "</tbody></table><p>&nbsp;</p>";				
				}
				
				html += "</div>";
				this.pane = $(html).appendTo(vgap.dash.content);
								
				
				//this.pane = $(html).appendTo(vgap.dash.content);	
				// Ship List
				
//				var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
//				var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
			
				
				var war_count = 0;
				var freighter_count = 0;
				
				//go through all IDs 
				for (var id = 1; id <= 500; id++) {
					
					var html = "";
					
					var ship_in_list = false;
					var ship = "";
					//see if the ship exist in the list
					for (var j = 0; j < vgap.plugins["enemyShipListPlugin"].enemyShipList.length; j++) 
					{
						ship = vgap.plugins["enemyShipListPlugin"].enemyShipList[j];
						if (ship.id == id) {
							ship_in_list = true;
							break;
						} 							
					}					
					
					if (!ship_in_list) {
						
						//not in list: if setting -> include unknown entry
						if (vgap.plugins["enemyShipListPlugin"].includeUnknown && view == 4) {
							
							var color=this.colorsA[0];
							html += "<tr>";
							
							html += "<td title='Player slot: ?' style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'>" + id + "</td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
								html += "<td></td>";								
							}
							//html += "<td style='color:"+ color +"'>" + vgap.game.turn - ship.infoturn + "</td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							//html += "<td style='color:"+ color +"'>" + hull.name + "</td>";
							//html += "<td style='color:"+ color +"' align='center'>" + ship.warp + "</td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							//html += "<td style='color:"+ color +"'>" + damage + "</td>";
							//html += "<td style='color:"+ color +"'>" + crew + "</td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";
							html += "<td style='color:"+ color +"'> ? </td>";

							html += "</tr>";
							
							$(html).appendTo("#ShipRows");							
						}
					} else {
						
						//ships of other players
						if (view == 0) {
							if (ship.ownerid == vgap.player.id)
								continue;						
						}						
						
						//allies (safe passage already counts
						if (view == 1) {
							if (!vgap.alliedTo(ship.ownerid))	
								continue;
							if (ship.ownerid == vgap.player.id)
								continue;
						}
						
						//non-allies
						if (view == 2) {
							if (vgap.alliedTo(ship.ownerid))	
								continue;
							if (ship.ownerid == vgap.player.id)
								continue;
						}
						
						//single player
						if (view == 3) {
							if (ship.ownerid != vgap.plugins["enemyShipListPlugin"].playerFilterId)	
								continue;							
						}
																	
						
						//extract and prepare data
						var hull = vgap.getHull(ship.hullid);					
						var player = vgap.getPlayer(ship.ownerid);
						var race = vgap.getRace(player.raceid);
						var color=this.colorsA[ship.ownerid];
						var location= "(" + ship.x + "," + ship.y + ")"; //"Deep Space";
						var engine = "?";
						var ammo = (ship.ammo == -1) ? "?" : ship.ammo;
						var beam_weapons="?";
						var crew =  (ship.crew == -1) ? "?" : ship.crew;
						var damage = (ship.damage == -1) ? "?" : ship.damage;

						if (ship.engineid > 0) {
							engine = vgap.getEngine(ship.engineid).name;
						}
						
						//if (ship.ammo!=-1)
						//	ammo=ship.ammo;
						
						//get beam weapons
						if (hull.beams == 0)// || ship.beamid == 0 || ship.beams == 0)
							beam_weapons = "---";
						else if (ship.beams != 0 && ship.beamid != 0) {
							beam_weapons = ship.beams + " " + vgap.getBeam(ship.beamid).name;						
						}
						
						//get secondary weapons
						if (hull.fighterbays > 0) {
							secondary_weapons = hull.fighterbays + " Fighter " + (hull.fighterbays==1? "Bay":"Bays");						
						} else if (hull.launchers > 0) {
							if (ship.torps == -1 || ship.torpedoid == -1)
								secondary_weapons = "?"; 
							else if (ship.torps == 0 || ship.torpedoid == 0) 
								secondary_weapons = "---";
							else
								secondary_weapons = ship.torps + " " + vgap.getTorpedo(ship.torpedoid).name + (ship.torps==1? " Tube":" Tubes");						
						} else {
							secondary_weapons = "---";
						}
											
						html += "<tr>";
						
						html += "<td title='Player slot " + ship.ownerid + "' style='color:"+ color +"'>" + player.username + "</td>";
						html += "<td style='color:"+ color +"'>" + race.shortname + "</td>";
						html += "<td style='color:"+ color +"'>" + ship.id + "</td>";
						html += "<td title='"+ hull.name + "'><img class='TinyIcon' src='" + hullImg(ship.hullid) + "'/><div style='display: none;'>"+hull.name+"</div></td>";
						html += "<td style='color:"+ color +"'>" + ship.name + "</td>";
						if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
							html += "<td><button type='button' class='TestButton' onClick='vgap.plugins[\"enemyShipListPlugin\"].removeShip("+ship.id+"); " +
									"vgap.plugins[\"enemyShipListPlugin\"].showEnemyShipsView("+view+");'> Delete </button></td>";	
						}
						html += "<td style='color:"+ color +"'>" + ship.infoturn +  "</td>";
						html += "<td style='color:"+ color +"'>" + location +  "</td>";
						//html += "<td style='color:"+ color +"' align='center'>" + ship.warp + "</td>";
						html += "<td style='color:"+ color +"'>" + engine + "</td>";
						html += "<td style='color:"+ color +"'>" + beam_weapons + "</td>";
						html += "<td style='color:"+ color +"'>" + secondary_weapons + "</td>";
						html += "<td style='color:"+ color +"'>" + ammo + "</td>";
						html += "<td style='color:"+ color +"'>" + ship.mass + "</td>";
						html += "<td style='color:"+ color +"'>" + crew + "</td>";
						html += "<td style='color:"+ color +"'>" + damage + "</td>";

						html += "</tr>";
						
						//add ship to correct table and register methods to show map on click
						if (view != 3) {							
							
							var select = function(x,y) { return function() { vgap.showMap(); vgap.map.centerMap(x, y); /*console.log("Come here: " + x + "," + y);*/}; };
							$(html).click(select(ship.x, ship.y)).appendTo("#ShipRows");
							
						} else {
							//determine if freighter or not
							if (hull.beams == 0 && hull.launchers == 0 && hull.fighterbays == 0) {
								
								if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
									$(html).appendTo("#FreighterRows");
								} else {
									var select = function(x,y) { return function() { vgap.showMap(); vgap.map.centerMap(x, y); /*console.log("Come here: " + x + "," + y);*/}; };
									$(html).click(select(ship.x, ship.y)).appendTo("#FreighterRows");
								}
								
								//increase freighter count
								freighter_count++;
							} else {							
								
								if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
									$(html).appendTo("#ShipRows");
								} else {
									var select = function(x,y) { return function() { vgap.showMap(); vgap.map.centerMap(x, y); /*console.log("Come here: " + x + "," + y);*/}; };
									$(html).click(select(ship.x, ship.y)).appendTo("#ShipRows");
								}
								//increase warship count
								war_count++;
							}
						}
					}					
				}
				
				if (view == 3 && vgap.plugins["enemyShipListPlugin"].includeUnknown) {
					
					var player = vgap.getPlayer(vgap.plugins["enemyShipListPlugin"].playerFilterId);
					var race = vgap.getRace(player.raceid);
					
					//add freighters and warships to end of list
					
					for (var i=war_count+1; i<=getNumForPlayer(player.id, "capitalships"); i++) {
					
						var html = "";
						var color=this.colorsA[player.id];
						html += "<tr>";
												
						html += "<td title='Player slot " + player.id + "' style='color:"+ color +"'>" + player.username + "</td>";
						html += "<td style='color:"+ color +"'>" + race.shortname + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
							html += "<td></td>";	
						}
						//html += "<td style='color:"+ color +"'>" + vgap.game.turn - ship.infoturn + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						//html += "<td style='color:"+ color +"'>" + hull.name + "</td>";
						//html += "<td style='color:"+ color +"' align='center'>" + ship.warp + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						//html += "<td style='color:"+ color +"'>" + damage + "</td>";
						//html += "<td style='color:"+ color +"'>" + crew + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
	
						html += "</tr>";
						
						$(html).appendTo("#ShipRows");	
					}
					
					for (var i=freighter_count+1; i<=getNumForPlayer(player.id, "freighters"); i++) {
						
						var html = "";
						var color=this.colorsA[player.id];
						html += "<tr>";
						
						html += "<td title='Player slot " + player.id + "' style='color:"+ color +"'>" + player.username + "</td>";
						html += "<td style='color:"+ color +"'>" + race.shortname + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						if (vgap.plugins["enemyShipListPlugin"].enableEdit) {
							html += "<td></td>";	
						}
						//html += "<td style='color:"+ color +"'>" + vgap.game.turn - ship.infoturn + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						//html += "<td style='color:"+ color +"'>" + hull.name + "</td>";
						//html += "<td style='color:"+ color +"' align='center'>" + ship.warp + "</td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						//html += "<td style='color:"+ color +"'>" + damage + "</td>";
						//html += "<td style='color:"+ color +"'>" + crew + "</td>";
						html += "<td style='color:"+ color +"'> --- </td>";
						html += "<td style='color:"+ color +"'> --- </td>";
						html += "<td style='color:"+ color +"'> --- </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
						html += "<td style='color:"+ color +"'> ? </td>";
	
						html += "</tr>";
						
						$(html).appendTo("#FreighterRows");	
					}
				}
				
				
				//make ship table sortable
				$("#ShipTable").tablesorter();
				
				//make freighter table sortable
				if (view == 3) {
					$("#FreighterTable").tablesorter();
				}
				
				this.pane.jScrollPane();

				// vgap.action added for the assistant (Alex):
				vgap.showShipsViewed = 1;
				vgap.action(); 
			},
			
			/**
			 * Draw last location of enemy ships on the map 
			 */
			drawEnemyShips : function () {
	            
	            var drawShips = false;
	            
	            for (var p = 0; p <= vgap.players.length; p++) {
					if (this.drawSelection[p] == true) {
						drawShips = true;
						break;
					}
				}
	            
	            if (drawShips == false)
	            	return;
	            
	            for (var s = 0; s < vgap.plugins["enemyShipListPlugin"].enemyShipList.length; s++) {
	            	var ship = vgap.plugins["enemyShipListPlugin"].enemyShipList[s];
	            	
	            	//console.log("Ship: " + ship.id + " " + ship.ownerid + " " + vgap.plugins["enemyShipListPlugin"].drawSelection[ship.ownerid]);
	            	
	            	if (vgap.plugins["enemyShipListPlugin"].drawSelection[0] || vgap.plugins["enemyShipListPlugin"].drawSelection[ship.ownerid]) {
	            		
	            		var markup = {attr: {stroke: this.colorsA[ship.ownerid]}};
	            		
	            		this.drawScaledCircle(ship.x, ship.y, 20, markup.attr, null);
	            	}            	
	            }
			}, 
			
			/**
			 * Generate the content for the enemy ship dashboard tab
			 * @param x			x coordinate of ship
			 * @param y			y coordinate of ship			
			 * @param radius	radius of circle
			 * @param attr		color of the drawing
			 * @param paperset	where to draw
			 */
		    drawScaledCircle : function (x, y, radius, attr, paperset) {
	            if (!vgap.map.isVisible(x, y, radius)) return;
	            radius *= vgap.map.zoom;
	            if (radius <= 1)
	                radius = 1;
	            if (paperset == null)
	                paperset = vgap.map.ctx;
	            paperset.strokeStyle = attr.stroke;
	            paperset.beginPath();
	            paperset.arc(vgap.map.screenX(x), vgap.map.screenY(y), radius, 0, Math.PI*2, false);
	            paperset.stroke();
	        }, 
	        
	        /**
			 * Toggle the checkbox deciding which player's ships are being displayed
			 * @param id		id of player to toggle
			 */
	        toggleSelection : function (id) {
	        	
	        	if (id < 0 || id > vgap.players.length) {
	        		return;
	        	}
	        	//console.log("Toggling: " + id);
	        	
	        	vgap.plugins["enemyShipListPlugin"].drawSelection[id] =! vgap.plugins["enemyShipListPlugin"].drawSelection[id];
	        	
	        	if (id == 0) {
	        		//toggle or untoggle all
	        		for (var i=1; i<vgap.plugins["enemyShipListPlugin"].drawSelection.length; i++) {
	        			vgap.plugins["enemyShipListPlugin"].drawSelection[i] = vgap.plugins["enemyShipListPlugin"].drawSelection[id];
	        		}
	        	} else {
	        		//toggle the 'All' checkbox
	        		vgap.plugins["enemyShipListPlugin"].drawSelection[0] = true;
	        		for (var i=1; i<vgap.plugins["enemyShipListPlugin"].drawSelection.length; i++) {
	        			if (!vgap.plugins["enemyShipListPlugin"].drawSelection[i]) {
	        				vgap.plugins["enemyShipListPlugin"].drawSelection[0] = false;
	        			}
	        		}
	        	}
	        	this.showOverlayFilter();
	        	
	        },
	        
	        /**
			 * Show the panel for selecting which player to show the ship locations for
			 */
	        showOverlayFilter : function () {	        		        	
	        	
                var html = "<div id='OverlayFilter'><table>";
                
                for (var p=0; p<vgap.plugins["enemyShipListPlugin"].drawSelection.length; p++) {
                    
                	var name = "All";
                	            	
                	if (p > 0) {
                		for (var i=0; i<vgap.players.length; i++) {
                			if (vgap.players[i].id == p) {            			
                				name = vgap.players[i].fullname;
                			}
                		}
                	}
                    var check_text = "";
                    if (vgap.plugins["enemyShipListPlugin"].drawSelection[p]) {
                    	check_text = " checked";
                    }
                    html += "<tr><td><input type='checkbox' " + check_text + " onchange='vgap.plugins[\"enemyShipListPlugin\"].toggleSelection(" + p + "); vgap.map.draw(); '></input></td><td>" + name + "</td></tr>";                
                }
                html += "</table></div>";
                //$("#PlanetsMenu").append(html);
                
                var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
                if (inMore) {
                    html = "<h1>Show ship locations for:</h1>" + html;
                    html += "<a class='MoreBack' onclick='vgap.closeMore();vgap.more.empty();return false;'>OK</a>";
                    vgap.more.empty();
                    $(html).appendTo(vgap.more);
        
                    $("#OverlayFilter").height($(window).height() - 100);
                    vgap.showMore(300);
                }
                else {
                    html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();vgap.lc.empty();'></div><div class='TopTitle'>Show ship locations for:</div></div>" + html;
                    vgap.lc.empty();
                    $(html).appendTo(vgap.lc);
                    vgap.openLeft();
                    $("#OverlayFilter").height($(window).height() - 40);
                    $("#OverlayFilter").width(380);
                }
                $("#OverlayFilter").jScrollPane();        
            }
            
			
	}; //end enemyShipListPlugin
		
	// register your plugin with NU
	vgap.registerPlugin(enemyShipListPlugin, "enemyShipListPlugin");
		
	
	vgap.plugins["enemyShipListPlugin"].oldClearTools = vgapMap.prototype.clearTools;
	
	vgapMap.prototype.clearTools = function(result) {
		
		for (var p=0; p<vgap.plugins["enemyShipListPlugin"].drawSelection.length; p++) {
			vgap.plugins["enemyShipListPlugin"].drawSelection[p] = false;			
		}
		
		//execute the normal clearTools function
		vgap.plugins["enemyShipListPlugin"].oldClearTools.apply(this,arguments);
				
	};
	
	
	
	/**
	 * Overload the processLoadHistory function in order to be able to
	 * automatically iterate through many turns. 
	 */	
	//var oldProcessLoadHistory = vgaPlanets.prototype.processLoadHistory;
	vgap.plugins["enemyShipListPlugin"].oldProcessLoadHistory = vgaPlanets.prototype.processLoadHistory;
	
	vgaPlanets.prototype.processLoadHistory = function(result) {
		
		
		//execute the normal processLoadHistory function
		vgap.plugins["enemyShipListPlugin"].oldProcessLoadHistory.apply(this,arguments);
				
		//check if we are in the process of reading in all past turns
		
		if (vgap.plugins["enemyShipListPlugin"].processAllTurns) {
			
			if (!result.success) {
				console.log("EnemyShipListPlugin: The desired turn could not be loaded. Aborting ship list read in.");
				
				//after failed load resetRequest should always be false.
				vgap.plugins["enemyShipListPlugin"].resetRequest = false;
				vgap.plugins["enemyShipListPlugin"].processAllTurns = false;
				return;
			}			
			
			if (vgap.plugins["enemyShipListPlugin"].currentListTurn < vgap.nowTurn) {
				// not done processing: load next turn
				console.log("EnemyShipListPlugin: Processing... Loading next turn: " + (vgap.plugins["enemyShipListPlugin"].currentListTurn + 1) + " / " + vgap.nowTurn + ".");
				
				if (vgap.plugins["enemyShipListPlugin"].currentListTurn + 1 == vgap.nowTurn) {
					vgap.loadNow();
				} else {
					vgap.loadHistory(vgap.plugins["enemyShipListPlugin"].currentListTurn + 1);
				}
			} else {
				// done processing: clear flag
				vgap.plugins["enemyShipListPlugin"].processAllTurns = false;	
				
				console.log("EnemyShipListPlugin: Done processing.");
			}
		} 							
			
	};
	
	/**
	 * Helper functions: get the number of capitalships, freighters, bases, or planets for a 
	 * specific player.
	 * @param: id   player id
	 * @param: type string for requested number ("capitalships", "freighters", "planets", "starbases")
	 * @return: number from scoreboard
	 */
	getNumForPlayer = function(id, type) {
				
		for (var i=0; i<vgap.scores.length; i++) {
			if (vgap.scores[i].ownerid == id) {
				if (type == "capitalships") {
					return vgap.scores[i].capitalships;					
				} else if (type == "freighters") {
					return vgap.scores[i].freighters;
				} else if (type == "starbases") {
					return vgap.scores[i].starbases;
				} else if (type == "planets") {
					return vgap.scores[i].planets;
				} 
				console.log("Type incorrect!");
				return 0;
			}			
		}
		console.log("Player not found in scores!");
		return 0;		
	};
	

    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);
