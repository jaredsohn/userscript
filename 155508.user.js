// ==UserScript==
// @name          C&C: Tiberium Alliances CNCOpt DB
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base. And Save the data In a local database
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version    	1.3a
// @date       	2013-02-05
// @author     	Elda1990
// @copyright  	2013+, Elda1990
// ==/UserScript==
/* 

Based on:
http://userscripts.org/scripts/source/152799.user.js

Version 1.3
Fix error (from Update)

Version 1.2:
Add Config menu for Auto Save

Version 1.1.1:
Auto get links of GDI + NOD Bases

Version 1.1:
Better Database layout. (Old Database is ported to new DB)
make a history of links for a base. (Working on GUI)

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
    (function () {
        var cncopt_main = function () {      
            
            var cncopt_db_version = "1.1";
            
            var defense_unit_map = {
                // GDI Defense Units 
                "GDI_Wall": "w",
                "GDI_Cannon": "c",
                "GDI_Antitank Barrier": "t",
                "GDI_Barbwire": "b",
                "GDI_Turret": "m",
                "GDI_Flak": "f",
                "GDI_Art Inf": "r",
                "GDI_Art Air": "e",
                "GDI_Art Tank": "a",
                "GDI_Def_APC Guardian": "g",
                "GDI_Def_Missile Squad": "q",
                "GDI_Def_Pitbull": "p",
                "GDI_Def_Predator": "d",
                "GDI_Def_Sniper": "s",
                "GDI_Def_Zone Trooper": "z",
                // Nod Defense Units 
                "NOD_Def_Antitank Barrier": "t",
                "NOD_Def_Art Air": "e",
                "NOD_Def_Art Inf": "r",
                "NOD_Def_Art Tank": "a",
                "NOD_Def_Attack Bike": "p",
                "NOD_Def_Barbwire": "b",
                "NOD_Def_Black Hand": "z",
                "NOD_Def_Cannon": "c",
                "NOD_Def_Confessor": "s",
                "NOD_Def_Flak": "f",
                "NOD_Def_MG Nest": "m",
                "NOD_Def_Militant Rocket Soldiers": "q",
                "NOD_Def_Reckoner": "g",
                "NOD_Def_Scorpion Tank": "d",
                "NOD_Def_Wall": "w",
                
                // Forgotten Defense Units 
                "FOR_Wall": "w",
                "FOR_Barbwire_VS_Inf": "b",
                "FOR_Barrier_VS_Veh": "t",
                "FOR_Inf_VS_Inf": "g",
                "FOR_Inf_VS_Veh": "r",
                "FOR_Inf_VS_Air": "q",
                "FOR_Sniper": "n",
                "FOR_Mammoth": "y",
                "FOR_Veh_VS_Inf": "o",
                "FOR_Veh_VS_Veh": "s",
                "FOR_Veh_VS_Air": "u",
                "FOR_Turret_VS_Inf": "m",
                "FOR_Turret_VS_Inf_ranged": "a",
                "FOR_Turret_VS_Veh": "v",
                "FOR_Turret_VS_Veh_ranged": "d",
                "FOR_Turret_VS_Air": "f",
                "FOR_Turret_VS_Air_ranged": "e",
                "": ""
            };
            
            var offense_unit_map = {
                // GDI Offense Units 
                "GDI_APC Guardian": "g",
                "GDI_Commando": "c",
                "GDI_Firehawk": "f",
                "GDI_Juggernaut": "j",
                "GDI_Kodiak": "k",
                "GDI_Mammoth": "m",
                "GDI_Missile Squad": "q",
                "GDI_Orca": "o",
                "GDI_Paladin": "a",
                "GDI_Pitbull": "p",
                "GDI_Predator": "d",
                "GDI_Riflemen": "r",
                "GDI_Sniper Team": "s",
                "GDI_Zone Trooper": "z",
                
                // Nod Offense Units 
                "NOD_Attack Bike": "b",
                "NOD_Avatar": "a",
                "NOD_Black Hand": "z",
                "NOD_Cobra": "r",
                "NOD_Commando": "c",
                "NOD_Confessor": "s",
                "NOD_Militant Rocket Soldiers": "q",
                "NOD_Militants": "m",
                "NOD_Reckoner": "k",
                "NOD_Salamander": "l",
                "NOD_Scorpion Tank": "o",
                "NOD_Specter Artilery": "p",
                "NOD_Venom": "v",
                "NOD_Vertigo": "t",
                "": ""
            };
            
            
            function findTechLayout(city) {
                for (var k in city) {
                    //log_it(typeof(city[k]), "1.city[", k, "]", city[k])
                    if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
                        if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
                            if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                                return city[k];
                            }
                        }
                    }
                }
                return null;
            }
            
            function countProperties(obj) {
  				  var count = 0;
    
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        ++count;
                }
            
                return count;
            }
            
            function findBuildings(city) {
                var cityBuildings = city.get_CityBuildingsData();
				
                
                //console.log("[cityBuildings]", cityBuildings);
                for (var k in cityBuildings) {                            
                    
                    if (PerforceChangelist >= 376877) {
                        if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k]) {
                            console.log("[(ityBuildings[k].d]", countProperties(cityBuildings[k].d) ,cityBuildings[k].d);
                            if(countProperties(cityBuildings[k].d) > 0) {
                                return cityBuildings[k].d;
                            }
                        }
                    } else {
                        if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
                            return cityBuildings[k].l;
                        }
                    }
                }
            }
            
            function isOffenseUnit(unit) {
                return (unit.get_UnitGameData_Obj().n in offense_unit_map);
            }
            
            function isDefenseUnit(unit) {
                return (unit.get_UnitGameData_Obj().n in defense_unit_map);
            }
            
            function getUnitArrays(city) {
                var ret = [];
                for (var k in city) {
                    if ((typeof (city[k]) == "object") && city[k]) {
                        for (var k2 in city[k]) {
                            if (PerforceChangelist >= 376877) {
                                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                                    
                                  console.log("getUnitArrays",city[k][k2]);
                                    
                                    var lst = city[k][k2].d;
                                    if ((typeof (lst) == "object") && lst) {
                                        for (var i in lst) {
                                            if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                                                ret.push(lst);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                                    var lst = city[k][k2].l;
                                    if ((typeof (lst) == "object") && lst) {
                                        for (var i in lst) {
                                            if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                                                ret.push(lst);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return ret;
            }
            
            function getDefenseUnits(city) {
                var arr = getUnitArrays(city);
                for (var i = 0; i < arr.length; ++i) {
                    for (var j in arr[i]) {
                        if (isDefenseUnit(arr[i][j])) {
                            return arr[i];
                        }
                    }
                }
                return [];
            }
            
            function getOffenseUnits(city) {
                var arr = getUnitArrays(city);
                for(var i = 0; i < arr.length; ++i) {
                    for(var j in arr[i]) {
                        if (isOffenseUnit(arr[i][j])) {
                            return arr[i];
                        }
                    }
                }
                return [];
            }
            
            
            
            function cncopt_create() {
                log_it("CNCOpt DB v" + cncopt_db_version + " loaded");		
                var cncopt = {
                    selected_base: null,
                    keymap: {
                        // GDI Buildings 
                        "GDI_Accumulator": "a",
                        "GDI_Refinery": "r",
                        "GDI_Trade Center": "u",
                        "GDI_Silo": "s",
                        "GDI_Power Plant": "p",
                        "GDI_Construction Yard": "y",
                        "GDI_Airport": "d",
                        "GDI_Barracks": "b",
                        "GDI_Factory": "f",
                        "GDI_Defense HQ": "q",
                        "GDI_Defense Facility": "w",
                        "GDI_Command Center": "e",
                        "GDI_Support_Art": "z",
                        "GDI_Support_Air": "x",
                        "GDI_Support_Ion": "i",
                        // Forgotten Buildings 
                        "FOR_Silo": "s",
                        "FOR_Refinery": "r",
                        "FOR_Tiberium Booster": "b",
                        "FOR_Crystal Booster": "v",
                        "FOR_Trade Center": "u",
                        "FOR_Defense Facility": "w",
                        "FOR_Construction Yard": "y",
                        "FOR_Harvester_Tiberium": "h",
                        "FOR_Defense HQ": "q",
                        "FOR_Harvester_Crystal": "n",
                        // Nod Buildings 
                        "NOD_Refinery": "r",
                        "NOD_Power Plant": "p",
                        "NOD_Harvester": "h",
                        "NOD_Construction Yard": "y",
                        "NOD_Airport": "d",
                        "NOD_Trade Center": "u",
                        "NOD_Defense HQ": "q",
                        "NOD_Barracks": "b",
                        "NOD_Silo": "s",
                        "NOD_Factory": "f",
                        "NOD_Harvester_Crystal": "n",
                        "NOD_Command Post": "e",
                        "NOD_Support_Art": "z",
                        "NOD_Support_Ion": "i",
                        "NOD_Accumulator": "a",
                        "NOD_Support_Air": "x",
                        "NOD_Defense Facility": "w",
                        //"NOD_Tech Lab": "",
                        //"NOD_Recruitment Hub": "X",
                        //"NOD_Temple of Nod": "X",
                        
                        // GDI Defense Units 
                        "GDI_Wall": "w",
                        "GDI_Cannon": "c",
                        "GDI_Antitank Barrier": "t",
                        "GDI_Barbwire": "b",
                        "GDI_Turret": "m",
                        "GDI_Flak": "f",
                        "GDI_Art Inf": "r",
                        "GDI_Art Air": "e",
                        "GDI_Art Tank": "a",
                        "GDI_Def_APC Guardian": "g",
                        "GDI_Def_Missile Squad": "q",
                        "GDI_Def_Pitbull": "p",
                        "GDI_Def_Predator": "d",
                        "GDI_Def_Sniper": "s",
                        "GDI_Def_Zone Trooper": "z",
                        // Nod Defense Units 
                        "NOD_Def_Antitank Barrier": "t",
                        "NOD_Def_Art Air": "e",
                        "NOD_Def_Art Inf": "r",
                        "NOD_Def_Art Tank": "a",
                        "NOD_Def_Attack Bike": "p",
                        "NOD_Def_Barbwire": "b",
                        "NOD_Def_Black Hand": "z",
                        "NOD_Def_Cannon": "c",
                        "NOD_Def_Confessor": "s",
                        "NOD_Def_Flak": "f",
                        "NOD_Def_MG Nest": "m",
                        "NOD_Def_Militant Rocket Soldiers": "q",
                        "NOD_Def_Reckoner": "g",
                        "NOD_Def_Scorpion Tank": "d",
                        "NOD_Def_Wall": "w",
                        
                        // Forgotten Defense Units 
                        "FOR_Wall": "w",
                        "FOR_Barbwire_VS_Inf": "b",
                        "FOR_Barrier_VS_Veh": "t",
                        "FOR_Inf_VS_Inf": "g",
                        "FOR_Inf_VS_Veh": "r",
                        "FOR_Inf_VS_Air": "q",
                        "FOR_Sniper": "n",
                        "FOR_Mammoth": "y",
                        "FOR_Veh_VS_Inf": "o",
                        "FOR_Veh_VS_Veh": "s",
                        "FOR_Veh_VS_Air": "u",
                        "FOR_Turret_VS_Inf": "m",
                        "FOR_Turret_VS_Inf_ranged": "a",
                        "FOR_Turret_VS_Veh": "v",
                        "FOR_Turret_VS_Veh_ranged": "d",
                        "FOR_Turret_VS_Air": "f",
                        "FOR_Turret_VS_Air_ranged": "e",
                        
                        // GDI Offense Units 
                        "GDI_APC Guardian": "g",
                        "GDI_Commando": "c",
                        "GDI_Firehawk": "f",
                        "GDI_Juggernaut": "j",
                        "GDI_Kodiak": "k",
                        "GDI_Mammoth": "m",
                        "GDI_Missile Squad": "q",
                        "GDI_Orca": "o",
                        "GDI_Paladin": "a",
                        "GDI_Pitbull": "p",
                        "GDI_Predator": "d",
                        "GDI_Riflemen": "r",
                        "GDI_Sniper Team": "s",
                        "GDI_Zone Trooper": "z",
                        
                        // Nod Offense Units 
                        "NOD_Attack Bike": "b",
                        "NOD_Avatar": "a",
                        "NOD_Black Hand": "z",
                        "NOD_Cobra": "r",
                        "NOD_Commando": "c",
                        "NOD_Confessor": "s",
                        "NOD_Militant Rocket Soldiers": "q",
                        "NOD_Militants": "m",
                        "NOD_Reckoner": "k",
                        "NOD_Salamander": "l",
                        "NOD_Scorpion Tank": "o",
                        "NOD_Specter Artilery": "p",
                        "NOD_Venom": "v",
                        "NOD_Vertigo": "t",
                        
                        "<last>": "."
                    },
                    make_sharelink: function (openlink) {
                         try {
                            var selected_base = cncopt.selected_base;
                            var city_id = selected_base.get_Id();
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            tbase = selected_base;
                            tcity = city;
                            scity = own_city;
                            //log_it("Target City: ", city);
                            //log_it("Own City: ", own_city);
                            console.log("cncopt [city]: ",  city);
                			                             
                            var link = "http://cncopt.com/?map=";
                            
                            link += "3|"; /* link version */
                            switch (city.get_CityFaction()) {
                                case 1:
                                    /* GDI */
                                    link += "G|";
                                    break;
                                case 2:
                                    /* NOD */
                                    link += "N|";
                                    break;
                                case 3:
                                    /* FOR faction - unseen, but in GAMEDATA */
                                case 4:
                                    /* Forgotten Bases */
                                case 5:
                                    /* Forgotten Camps */
                                case 6:
                                    /* Forgotten Outposts */
                                    link += "F|";
                                    break;
                                default:
                                    log_it("cncopt: Unknown faction: " + city.get_CityFaction());
                                    link += "E|";
                                    break;
                            }
                            switch (own_city.get_CityFaction()) {
                                case 1:
                                    /* GDI */
                                    link += "G|";
                                    break;
                                case 2:
                                    /* NOD */
                                    link += "N|";
                                    break;
                                case 3:
                                    /* FOR faction - unseen, but in GAMEDATA */
                                case 4:
                                    /* Forgotten Bases */
                                case 5:
                                    /* Forgotten Camps */
                                case 6:
                                    /* Forgotten Outposts */
                                    link += "F|";
                                    break;
                                default:
                                    log_it("cncopt: Unknown faction: " + own_city.get_CityFaction());
                                    link += "E|";
                                    break;
                            }
                            link += city.get_Name() + "|";
                            //link += "|";
                            defense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                defense_units.push(col);
                            }
                            var defense_unit_list = getDefenseUnits(city);
                            if (PerforceChangelist >= 376877) {
                                for (var i in defense_unit_list) {
                                    var unit = defense_unit_list[i];
                                    defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                                }
                            } else {
                                for (var i = 0; i < defense_unit_list.length; ++i) {
                                    var unit = defense_unit_list[i];
                                    defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                                }
                            }
                            
                            offense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                offense_units.push(col);
                            }
                            
                            var offense_unit_list = getOffenseUnits(own_city);
                            if (PerforceChangelist >= 376877) {
                                for (var i in offense_unit_list) {
                                    var unit = offense_unit_list[i];
                                    offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                                }
                            } else {
                                for (var i = 0; i < offense_unit_list.length; ++i) {
                                    var unit = offense_unit_list[i];
                                    offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                                }
                            }
                            
                            var techLayout = findTechLayout(city);
                            var buildings = findBuildings(city);
                            for (var i = 0; i < 20; ++i) {
                                row = [];
                                for (var j = 0; j < 9; ++j) {
                                    var spot = i > 16 ? null : techLayout[j][i];
                                    var level = 0;
                                    var building = null;
                                    try {
                                        
                                    if (spot && spot.BuildingIndex >= 0) {
                                        building = buildings[spot.BuildingIndex];
                                        console.log("building..",building);
                                        if(building != null){
                                            level = building.get_CurrentLevel();
                                        } 
                                    }
                                    var defense_unit = defense_units[j][i];
                                    if (defense_unit) {
                                        level = defense_unit.get_CurrentLevel();
                                    }
                                    var offense_unit = offense_units[j][i];
                                    if (offense_unit) {
                                        level = offense_unit.get_CurrentLevel();
                                    }
                                    if (level > 1) {
                                        link += level;
                                    }
                                    
                                      } catch (e) {
                                            console.log("cncopt [8]: ", e.message);
                                       }
                                    
                                    switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                                        case 0:
                                            if (building) {
                                                var techId = building.get_MdbBuildingId();
                                                if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                                                    link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled building: " + techId, building);
                                                    link += ".";
                                                }
                                            } else if (defense_unit) {
                                                if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                                                    link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                                                    link += ".";
                                                }
                                            } else if (offense_unit) {
                                                if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                                                    link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                                                    link += ".";
                                                }
                                            } else {
                                                link += ".";
                                            }
                                            break;
                                        case 1:
                                            /* Crystal */
                                            if (spot.BuildingIndex < 0) link += "c";
                                            else link += "n";
                                            break;
                                        case 2:
                                            /* Tiberium */
                                            if (spot.BuildingIndex < 0) link += "t";
                                            else link += "h";
                                            break;
                                        case 4:
                                            /* Woods */
                                            link += "j";
                                            break;
                                        case 5:
                                            /* Scrub */
                                            link += "h";
                                            break;
                                        case 6:
                                            /* Oil */
                                            link += "l";
                                            break;
                                        case 7:
                                            /* Swamp */
                                            link += "k";
                                            break;
                                        default:
                                            log_it("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                                            link += ".";
                                            break;
                                                                                   }
                                }
                            }
                            /* Tack on our alliance bonuses */
                            if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                                link += "|" + alliance.get_POITiberiumBonus();
                                link += "|" + alliance.get_POICrystalBonus();
                                link += "|" + alliance.get_POIPowerBonus();
                                link += "|" + alliance.get_POIInfantryBonus();
                                link += "|" + alliance.get_POIVehicleBonus();
                                link += "|" + alliance.get_POIAirBonus();
                                link += "|" + alliance.get_POIDefenseBonus();
                            }
                            
                            //link += "#city_id=" + city_id;
                            //log_it(link);
                            if(openlink) {
                                window.open(link, "_blank");
                            }
                            
                            /*
                            Storage_bases[city_id] = {
                            city_id: city_id,
                            city_name: city.get_Name()
                            city_faction: city.get_CityFaction(),
                            scan_date: new Date().getTime(),
                            link: link
                            };*/
                            
                            var link_db = {scan_date: new Date().getTime(), link: link};
                            
                            if(typeof Storage_bases['base'][city_id] == 'undefined') {
                                Storage_bases['base'][city_id] = {
                                    city_id: city_id,
                                    city_name: city.get_Name(),
                                    city_faction: city.get_CityFaction(),
                                    city_userid: 0,
                                    scans: [link_db],
                                    names: [city.get_Name()]
                                };
                                
                            } else {
                                Storage_bases['base'][city_id]['city_name'] = city.get_Name();
                                Storage_bases['base'][city_id]['city_faction'] = city.get_CityFaction();
                                Storage_bases['base'][city_id]['city_userid'] = 0;
                                
                                var last_scan = get_last_scan(city_id);
                                
                                if(last_scan['link'] == link) {
                                    Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length-1]['scan_date'] = new Date().getTime();
                                } else {
                                    Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length] = link_db;
                                }
                                
                                
                                var tmp_name = false;
                                for (var i in Storage_bases['base'][city_id]['names']) {
                                    if(i == city.get_Name()) {
                                        tmp_name = true;
                                        break;
                                    }
                                    
                                }
                                if(!tmp_name) {
                                    Storage_bases['base'][city_id]['names'][Storage_bases['base'][city_id]['names'].length] = city.get_Name();
                                }								
                            }
                           
                            saveDB();
                            
                            return link;
                       
                        } catch (e) {
                            console.log("cncopt [1]: ", e.message);
                        }
                    }
                };
                if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
                    webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
                }
                
                var check_ct = 0;
                var check_timer = null;
                var button_enabled = 123456;
                /* Wrap showMenu so we can inject our Sharelink at the end of menus and
                * sync Base object to our cncopt.selected_base variable  */
                webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
                    try {
                        var self = this;
                        cncopt.selected_base = selected_base;
                        
                        if (this.__cncopt_db_initialized != 1) {
                            this.__cncopt_db_initialized = 1;
                            this.__cncopt_db_links = [];
                            for (var i in this) {
                                try {
                                    if (this[i] && this[i].basename == "Composite") {
                                        var link = new qx.ui.form.Button("CNCOpt DB", "http://cncopt.com/favicon.ico");
                                        link.addListener("execute", function () {
                                            var bt = qx.core.Init.getApplication();
                                            bt.getBackgroundArea().closeCityInfo();	
                                            var city_id = cncopt.selected_base.get_Id();
                                            if(typeof Storage_bases['base'][city_id] != 'undefined') {
                                                var last_scan = get_last_scan(city_id);
                                                window.open(last_scan['link'], "_blank");
                                            }
                                        });
                                        link.setBlockToolTip(true);
                                        link.setEnabled(false);
                                        this[i].add(link);
                                        this.__cncopt_db_links.push(link);
                                    }
                                } catch (e) {
                                    console.log("cncopt [2]: ", e.message);
                                }
                            }
                        }                      
                        
                        if (this.__cncopt_initialized != 1) {
                            this.__cncopt_initialized = 1;
                            this.__cncopt_links = [];
                            for (var i in this) {
                                try {
                                    if (this[i] && this[i].basename == "Composite") {
                                        var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                                        link.addListener("execute", function () {
                                            var bt = qx.core.Init.getApplication();
                                            bt.getBackgroundArea().closeCityInfo();
                                            cncopt.make_sharelink(true);
                                        });
                                        link.setEnabled(false);
                                        this[i].add(link);
                                        this.__cncopt_links.push(link)
                                    }
                                } catch (e) {
                                    console.log("cncopt [2]: ", e.message);
                                }
                            }
                        }
                        var tf = false;
                        switch (selected_base.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                                switch (selected_base.get_Type()) {
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                                        tf = true;
                                        break;
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                                        tf = true;
                                        break;
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                                tf = false;
                                log_it("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                                tf = true;
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                                tf = true;
                                break;
                        }
                        
                        var orig_tf = tf;
                        var base_scanned = false;
						 
                        function check_if_button_should_be_enabled() {
                            try {
                                tf = orig_tf;
                                var selected_base = cncopt.selected_base;
                                var still_loading = false;
                                if (check_timer != null) {
                                    clearTimeout(check_timer);
                                }
                                
                                /* When a city is selected, the data for the city is loaded in the background.. once the 
                                * data arrives, this method is called again with these fields set, but until it does
                                * we can't actually generate the link.. so this section of the code grays out the button
                                * until the data is ready, then it'll light up. */
                                if (selected_base && selected_base.get_Id) {
                                    var city_id = selected_base.get_Id();
                                    var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                                    //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                                    //log_it("City", city);
                                    //log_it("get_OwnerId", city.get_OwnerId());
                                    if (!city || city.get_OwnerId() == 0) {
                                        still_loading = true;
                                        tf = false;
                                    }
                                } else {
                                    tf = false;
                                }
                                if (tf != button_enabled) {
                                    button_enabled = tf;
                                    for (var i = 0; i < self.__cncopt_links.length; ++i) {
                                        self.__cncopt_links[i].setEnabled(tf);
                                    }
                                }
                                
                                for (var i = 0; i < self.__cncopt_db_links.length; ++i) {
                                    var city_id = cncopt.selected_base.get_Id();
                                    //log_it('city_id: '+city_id);
                                    //console.log();
                                    var isdb = false;
                                    if(typeof Storage_bases['base'][city_id] != 'undefined') {
                                        isdb = true;
                                    }
                                    
                                    
                                    if(isdb != self.__cncopt_db_links[i].getEnabled()) {
                                        if(isdb) {
                                            self.__cncopt_db_links[i].setEnabled(true);
                                            self.__cncopt_db_links[i].setBlockToolTip(false);
                                        } else {
                                            //var tooltip = new qx.ui.tooltip.ToolTip("No Data");
                                            //self.__cncopt_db_links[i].setToolTip(tooltip);
                                            self.__cncopt_db_links[i].setBlockToolTip(true);
                                            self.__cncopt_db_links[i].setEnabled(false);       
                                        }
                                    }
                                    if(isdb) {
                                        try {
                                            var last_scan = get_last_scan(city_id);
                                            var scan_date = new Date();
                                            scan_date.setTime(last_scan['scan_date']);
                                            
                                            
                                            var hours = scan_date.getHours();
                                            var minutes = scan_date.getMinutes();
                                            var seconds = scan_date.getSeconds();
                                            
                                            var day = scan_date.getDate();
                                            var mon = scan_date.getMonth()+1;
                                            
                                            var thetime = (hours < 10) ? "0" + hours + ":" : hours + ":";
                                            thetime += (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
                                            thetime += (seconds < 10) ? "0" + seconds : seconds;
                                            thetime += ' '
                                            thetime += (day < 10) ? "0" + day + "." : day + ".";
                                            thetime += (mon < 10) ? "0" + mon + "." : mon + ".";
                                            thetime +=  scan_date.getFullYear();
                                            
                                            var tooltip = new qx.ui.tooltip.ToolTip("Save Datum: " + thetime);
                                            self.__cncopt_db_links[i].setToolTip(tooltip);
                                            
                                        } catch (e) {
                                            console.log("cncopt [4]: ", e.message);
                                        }
                                    }      
                                }
                                
                                if (!still_loading) {
                                         try {
                                    check_ct = 0;
                                 
                                        if(button_enabled && !base_scanned && Storage_cfg['auto_save_player']) {
                                            var city_id = cncopt.selected_base.get_Id();
                                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                                            var Faction = city.get_CityFaction();
                                            if(Faction == 1 || Faction == 2) {
                                                // 1: GDI  2: NOD
												log_it('Auto Scan Base...');
                                                cncopt.make_sharelink(false);
                                            }
											base_scanned = true;
                                        }
                                  
                                           
                                    } catch (e) {
                                        console.log("cncopt [5]: ", e.message);
                                    }
                                } else {
                                    if (check_ct > 0) {
                                        check_ct--;
                                        check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                                    } else {
                                        check_timer = null;
                                    }
                                }
                            } catch (e) {
                                console.log("cncopt [4]: ", e.message);
                                tf = false;
                            }
                        }
                        
                        check_ct = 50;
                        check_if_button_should_be_enabled();
                    } catch (e) {
                        console.log("cncopt [3]: ", e.message);
                    }
                    this.__cncopt_real_showMenu(selected_base);
                }
            }
            
            
			

			var cfgBox = {
			
				window: null,
				window_is_open: false,
				
				auto_save_player: null,
				save_button: null,
				
				init: function() {
					try {
						var addonmenu = Addons.AddonMainMenu.getInstance();	
						addonmenu.AddMainMenu("CNCOpt DB Config",function(){ cfgBox.menu_click(); },""); 
						
						cfgBox.window = new qx.ui.window.Window("CNCOpt DB Config");
						cfgBox.window.setPadding(1);
						cfgBox.window.setLayout(new qx.ui.layout.Grow());
						// this.navBox.setLayout(new qx.ui.layout.VBox());
						var layout = new qx.ui.layout.Grid();
						layout.setSpacing(5);
						layout.setColumnAlign(1,"left", "center");
						layout.setColumnAlign(0,"left", "bottom");
						cfgBox.window.setLayout(layout);
						cfgBox.window.setShowMaximize(false);
						cfgBox.window.setShowMinimize(false);
						cfgBox.window.moveTo(400, 200);
						cfgBox.window.setHeight(200);
						cfgBox.window.setWidth(180);
						cfgBox.window.setMinHeight(200);
						cfgBox.window.setMinWidth(180);
						
						cfgBox.window.addListener("close",function() {
							cfgBox.save();
							cfgBox.window_is_open = false;
						}, this);						
						
						var makeLbl = function(name) {
							var lbl =  new qx.ui.basic.Label(name);
							lbl.setTextColor("white");
							return lbl;
						}
						
						cfgBox.auto_save_player = new qx.ui.form.CheckBox();
						
						cfgBox.window.add(makeLbl("Auto Save Player:"), {row:0, column:0});
						cfgBox.window.add(cfgBox.auto_save_player, {row:0, column:1});
						
						
						cfgBox.auto_save_player.setValue(Storage_cfg['auto_save_player']);
						
						cfgBox.save_button = new qx.ui.form.Button("Save");
						cfgBox.save_button.set({
							appearance : "button-text-small",
							toolTipText : "Navigate to"
						});
							
						cfgBox.save_button.addListener("click", function() { cfgBox.window.close(); }, this);
						cfgBox.window.add(cfgBox.save_button,{row:1,column:0});
						
					} catch (e) {
						console.log("[CNCOpt-DB] cfgBox.init: ", e);
                    }
				},
				
				menu_click: function() {
					if(cfgBox.window_is_open) {
						cfgBox.window.close();	
						cfgBox.window_is_open = false;
					} else {
						cfgBox.window.open();	
						cfgBox.window_is_open = true;
					}
				},
				
				save: function() {
					log_it("SAVE CFG");
					Storage_cfg['auto_save_player'] = cfgBox.auto_save_player.getValue();
					saveDB();
				}

			};
			
			
			
            function get_last_scan(city_id){
                var data = Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length-1];
                return data;
            }
            
            
            var Storage_bases = {user:{},base:{}};
            var Storage_cfg = { auto_save_player: true };
			
            
            function saveDB() {
                log_it('save DB');
                if (localStorage) {
                    localStorage["CNCOpt_DB.bases"] = JSON.stringify(Storage_bases);
                    localStorage["CNCOpt_DB.cfg"]   = JSON.stringify(Storage_cfg);
                } else {
                    log_it("NO HTML5 localStorage can not save!");
                }
                log_it(Storage_bases);
				log_it(Storage_cfg);
            }
            
            function loadDB() {
                log_it('load DB');
                if (localStorage) {
                    var cfg = localStorage["CNCOpt_DB.cfg"];
                    if (cfg != null) {
                        Storage_cfg = JSON.parse(cfg);
                    }
                    
                    var vo = localStorage["CNCOpt_DB.bases"];
                    if (vo != null) {
                        Storage_bases = JSON.parse(vo);
                    }
                    
                    if(Storage_cfg['db_version'] == null) {
                        var Storage_bases_old = Storage_bases;
                        
                        log_it(JSON.stringify(Storage_bases_old));
                        
                        Storage_bases = {user:{},base:{}};
                        
                        for (var i in Storage_bases_old) {
                            
                            /*
                            Storage_bases[city_id] = {
                            city_id: city_id,
                            scan_date: new Date().getTime(),
                            link: link
                            };
                            */
                            
                            
                            Storage_bases['base'][i] = {
                                city_id: Storage_bases_old[i]['city_id'],
                                city_name: "",
                                city_faction: "",
                                city_userid: 0,
                                scans: {scan_date: Storage_bases_old[i]['scan_date'], link: Storage_bases_old[i]['link']},
                                names: {}
                            };
                        }
                        
                        Storage_cfg['db_version'] = 2;
                        saveDB();
                    } 
					
                    if(Storage_cfg['db_version'] == 2) {
                        Storage_cfg['db_version'] = 3;
                        for (var i in Storage_bases['base']) {
                            Storage_bases['base'][i]['scans'] = [Storage_bases['base'][i]['scans']];
                        }
                        saveDB();
                    }
					
					  if(Storage_cfg['db_version'] == 3) {
                        Storage_cfg['db_version'] = 4;
						Storage_cfg['auto_save_player'] = true;
                        saveDB();
                    }
					
                } else {
                    log_it("NO HTML5 localStorage can not load!");
                }
                log_it(Storage_bases);
            }
            
            
            
            function log_it(e){
                if (typeof console != 'undefined') console.log('[CNCOpt-DB] ', e);
                else if (window.opera) opera.postError('[CNCOpt-DB] '+e);
                else GM_log('[CNCOpt-DB] '+e);   
            }
            
            
            function cnc_check_if_loaded() {
                try {
                    if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                        a = qx.core.Init.getApplication(); // application
                        mb = qx.core.Init.getApplication().getMenuBar();
                        addonmenu = Addons.AddonMainMenu.getInstance();
                        if (a && mb && addonmenu) {
                            loadDB();
							cfgBox.init();
                            cncopt_create();
                        } else
                            window.setTimeout(cnc_check_if_loaded, 1000);
                    } else {
                        window.setTimeout(cnc_check_if_loaded, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') log_it(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
        }
        
        // injecting because we can't seem to hook into the game interface via unsafeWindow 
        //   (Ripped from AmpliDude's LoU Tweak script)
        var script_block = document.createElement("script");
        txt = cncopt_main.toString();
        script_block.innerHTML = "(" + txt + ")();";
        script_block.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
    })();
} catch (e) {
    GM_log(e);
}
