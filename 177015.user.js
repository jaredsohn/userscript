// ==UserScript==
// @version       1.1
// @name          C&C:TA Map Scanner
// @namespace     http://fruix.fr
// @icon          http://scanbase.com/favicon.ico
// @description   Création d'un bouton permettant d'envoyer les infos d'une base proche sur un serveur de données
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.fruix.fr/*
// @include       http*://fruix.fr/*
// @grant         console.log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// ==/UserScript==

var scity = null;
var tcity = null;
var tbase = null;
try {
  window.__scanbase_version = "1.1";
  (function () {
    var scanbase_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */
		"GDI_Wall": ":Mur;",
        "GDI_Cannon": ":Canon;",
        "GDI_Antitank Barrier": ":Barriere_Antitank;",
        "GDI_Barbwire": ":Barbeles;",
        "GDI_Turret": ":Nid;",
        "GDI_Flak": ":Flak;",
        "GDI_Art Inf": ":Tour_Def;",
        "GDI_Art Air": ":Batterie_Anti_air;",
        "GDI_Art Tank": ":Titan;",
        "GDI_Def_APC Guardian": ":Gardien;",
        "GDI_Def_Missile Squad": ":Escadron_Lance_Miss;",
        "GDI_Def_Pitbull": ":Pitbull;",
        "GDI_Def_Predator": ":Predator;",
        "GDI_Def_Sniper": ":Sniper;",
        "GDI_Def_Zone Trooper": ":Exosoldats;",
		
        /* Nod Defense Units */
		"NOD_Def_Antitank Barrier": ":Barriere_Antitank;",
        "NOD_Def_Art Air": ":Bat_Anti_Air;",
        "NOD_Def_Art Inf": ":Canon_Galt;",
        "NOD_Def_Art Tank": ":Obelisque;",
        "NOD_Def_Attack Bike": ":Moto;",
        "NOD_Def_Barbwire": ":Barbeles;",
        "NOD_Def_Black Hand": ":Main_Noir;",
        "NOD_Def_Cannon": ":Canon_Laser;",
        "NOD_Def_Confessor": ":Confesseur;",
        "NOD_Def_Flak": ":Flak;",
        "NOD_Def_MG Nest": ":Mitraill_Dec;",
        "NOD_Def_Militant Rocket Soldiers": ":Militant;",
        "NOD_Def_Reckoner": ":Juge;",
        "NOD_Def_Scorpion Tank": ":Scorpion;",
        "NOD_Def_Wall": ":Mur;",

        /* AVP/BO Defense Units */
		"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": ":Sniper;",
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
        /* GDI Offense Units */"GDI_APC Guardian": ":Gardien;",
        "GDI_Commando": ":Commando;",
        "GDI_Firehawk": ":Firehawk;",
        "GDI_Juggernaut": ":Juggernaut;",
        "GDI_Kodiak": ":Kodiak;",
        "GDI_Mammoth": ":Mammouth;",
        "GDI_Missile Squad": ":Escadron_Anti_Miss;",
        "GDI_Orca": ":Orca;",
        "GDI_Paladin": ":Paladin;",
        "GDI_Pitbull": ":Pitbull;",
        "GDI_Predator": ":Predator;",
        "GDI_Riflemen": ":Exosoldats;",
        "GDI_Sniper Team": ":Sniper;",
        "GDI_Zone Trooper": ":Tireurs;",

        /* Nod Offense Units */
		"NOD_Attack Bike": ":Moto;",
        "NOD_Avatar": ":Avatar;",
        "NOD_Black Hand": ":Main_Noire;",
        "NOD_Cobra": ":Cobra;",
        "NOD_Commando": ":Commando;",
        "NOD_Confessor": ":Confesseur;",
        "NOD_Militant Rocket Soldiers": ":Militant_Lance_roqu;",
        "NOD_Militants": ":Militant;",
        "NOD_Reckoner": ":Juge;",
        "NOD_Salamander": ":Salamandre;",
        "NOD_Scorpion Tank": ":Scorpion;",
        "NOD_Specter Artilery": ":Spectre;",
        "NOD_Venom": ":Venom;",
        "NOD_Vertigo": ":Vertigo;",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
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

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
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
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function scanbase_create() {
        console.log("BaseScan Link Button v" + window.__scanbase_version + " loaded");
        var scanbase = {
          selected_base: null,
          keymap: {
		  
		  
            /* GDI Buildings */"GDI_Accumulator": ":Accu;",
            "GDI_Refinery": ":Rafinerie;",
            "GDI_Trade Center": "u;",
            "GDI_Silo": ":Silo;",
            "GDI_Power Plant": ":Centrale;",
            "GDI_Construction Yard": ":Chantier_Con;",
            "GDI_Airport": ":Aeroport;",
            "GDI_Barracks": ":Caserne;",
            "GDI_Factory": ":Usine;",
            "GDI_Defense HQ": ":QG_Def;",
            "GDI_Defense Facility": ":Complexe_Def;",
            "GDI_Command Center": ":Centre_Com;",
            "GDI_Support_Art": ":Soutien_Art;",
            "GDI_Support_Air": ":Soutien_Air;",
            "GDI_Support_Ion": ":Soutien_Veh;",
            /* Forgotten Buildings */"FOR_Silo": ":Silo;",
            "FOR_Refinery": ":Rafinerie;",
            "FOR_Tiberium Booster": "b;",
            "FOR_Crystal Booster": "v;",
            "FOR_Trade Center": "u;",
            "FOR_Defense Facility": ":Complexe_Def;",
            "FOR_Construction Yard": ":Chantier_Con;",
            "FOR_Harvester_Tiberium": "Tiberium;",
            "FOR_Defense HQ": ":QG_Def;",
            "FOR_Harvester_Crystal": "Cristal;",
            /* Nod Buildings */"NOD_Refinery": ":Rafinerie;",
            "NOD_Power Plant": ":Centrale;",
            "NOD_Harvester": ":Tiberium;",
            "NOD_Construction Yard": ":Chantier_Con;",
            "NOD_Airport": ":Aeroport;",
            "NOD_Trade Center": "u;",
            "NOD_Defense HQ": ":QG_Def;",
            "NOD_Barracks": ":Caserne;",
            "NOD_Silo": ":Silo;",
            "NOD_Factory": ":Usine;",
            "NOD_Harvester_Crystal": "Cristal;",
            "NOD_Command Post": ":Centre_Com;",
            "NOD_Support_Art": ":Soutien_Art;",
            "NOD_Support_Ion": ":Soutien_Veh;",
            "NOD_Accumulator": ":Accu;",
            "NOD_Support_Air": ":Soutien_Air;",
            "NOD_Defense Facility": ":Complexe_Def;",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

			
		"GDI_Wall": ":Mur;",
        "GDI_Cannon": ":Canon;",
        "GDI_Antitank Barrier": ":Barriere_Antitank;",
        "GDI_Barbwire": ":Barbeles;",
        "GDI_Turret": ":Tourelle;",
        "GDI_Flak": ":Flak;",
        "GDI_Art Inf": ":Tour_Def;",
        "GDI_Art Air": ":Batterie_Anti_air;",
        "GDI_Art Tank": ":Titan;",
        "GDI_Def_APC Guardian": ":Gardien;",
        "GDI_Def_Missile Squad": ":Escadron_Lance_Miss;",
        "GDI_Def_Pitbull": ":Pitbull;",
        "GDI_Def_Predator": ":Predator;",
        "GDI_Def_Sniper": ":Sniper;",
        "GDI_Def_Zone Trooper": ":Exosoldats;",
		
        /* Nod Defense Units */
		"NOD_Def_Antitank Barrier": ":Barriere_Antitank;",
        "NOD_Def_Art Air": ":Bat_Anti_Air;",
        "NOD_Def_Art Inf": ":Canon_Galt;",
        "NOD_Def_Art Tank": ":Obelisque;",
        "NOD_Def_Attack Bike": ":Moto;",
        "NOD_Def_Barbwire": ":Barbeles;",
        "NOD_Def_Black Hand": ":Main_Noir;",
        "NOD_Def_Cannon": ":Canon_Laser;",
        "NOD_Def_Confessor": ":Confesseur;",
        "NOD_Def_Flak": ":Flak;",
        "NOD_Def_MG Nest": ":Mitraill_Dec;",
        "NOD_Def_Militant Rocket Soldiers": ":Militant;",
        "NOD_Def_Reckoner": ":Juge;",
        "NOD_Def_Scorpion Tank": ":Scorpion;",
        "NOD_Def_Wall": ":Mur;",

        /* AVP/BO Defense Units */
		"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": ":Sniper;",
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
			
             /* GDI Offense Units */"GDI_APC Guardian": ":Gardien;",
        "GDI_Commando": ":Commando;",
        "GDI_Firehawk": ":Firehawk;",
        "GDI_Juggernaut": ":Juggernaut;",
        "GDI_Kodiak": ":Kodiak;",
        "GDI_Mammoth": ":Mammouth;",
        "GDI_Missile Squad": ":Escadron_Anti_Miss;",
        "GDI_Orca": ":Orca;",
        "GDI_Paladin": ":Paladin;",
        "GDI_Pitbull": ":Pitbull;",
        "GDI_Predator": ":Predator;",
        "GDI_Riflemen": ":Exosoldats;",
        "GDI_Sniper Team": ":Sniper;",
        "GDI_Zone Trooper": ":Tireurs;",

        /* Nod Offense Units */
		"NOD_Attack Bike": ":Moto;",
        "NOD_Avatar": ":Avatar;",
        "NOD_Black Hand": ":Main_Noire;",
        "NOD_Cobra": ":Cobra;",
        "NOD_Commando": ":Commando;",
        "NOD_Confessor": ":Confesseur;",
        "NOD_Militant Rocket Soldiers": ":Militant_Lance_roqu;",
        "NOD_Militants": ":Militant;",
        "NOD_Reckoner": ":Juge;",
        "NOD_Salamander": ":Salamandre;",
        "NOD_Scorpion Tank": ":Scorpion;",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": ":Venom;",
        "NOD_Vertigo": ":Vertigo;",
		
            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = scanbase.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              var server = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			  tbase = selected_base;
              tcity = city;
              scity = own_city;
			  console.log("city id: ",city_id);
			  console.log("city support:",city.get_SupportWeapon());
			  //console.log("Server: ", server);
              console.log("Target City: ", city);
              console.log("Own City: ", own_city);
              var link = "http://fruix.fr/map/"; /*Lien du site qui héberge le ScanBase*/
			  link += "?monde=" + server; /*Numero du monde à modifier selon le monde sur lequel on joue*/
              link += "&user=" + selected_base.get_PlayerName(); /*Username*/
			  link += "&ally=" + selected_base.get_AllianceName(); /*Alliance*/
			  link += "&base_name="+ city.get_Name();/*Base Name*/
			  link += "&base_id="+ city_id;/*Base Id*/
			  link += "&base_lvl=" + selected_base.get_BaseLevel(); /*Base Lvl*/
			  link += "&lvl_off=" + city.get_LvlOffense(); /*Base Off*/
			  link += "&lvl_def=" + city.get_LvlDefense(); /*Base Def*/
			  link += "&pos_X-Y=" + city.get_PosX() + ":" + city.get_PosY(); /*Base Position*/

              switch (city.get_CityFaction()) { /*User Faction*/
                case 1:
                  /* GDI */
                  link += "&faction=GDI";
                  break;
                case 2:
                  /* NOD */
                  link += "&faction=NOD";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
				  link += "&faction=B-O";
                case 5:
                  /* Forgotten Camps */
				  link += "&faction=CPS";
                case 6:
                  /* Forgotten Outposts */
                  link += "&faction=AVP";
                  break;
                default:
                  link += "&faction=NaN";
                  break;
              }
			   /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "&Tib=" + alliance.get_POITiberiumBonus();
                link += "&Cri=" + alliance.get_POICrystalBonus();
                link += "&Ene=" + alliance.get_POIPowerBonus();
                link += "&Inf=" + alliance.get_POIInfantryBonus();
                link += "&Veh=" + alliance.get_POIVehicleBonus();
                link += "&Air=" + alliance.get_POIAirBonus();
                link += "&Def=" + alliance.get_POIDefenseBonus();
              }
			  
			  link += "&infobase=";
			  
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
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

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
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
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
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

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in scanbase.keymap) {
                          link += scanbase.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("scanbase [5]: Unhandled building: " + techId, building);
                          link += "0:Vide;";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in scanbase.keymap) {
                          link += scanbase.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("scanbase [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += "0:Vide;";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in scanbase.keymap) {
                          link += scanbase.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("scanbase [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += "0:Vide;";
                        }
                      } else {
                        link += "0:Vide;";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "Cristal;";
                      else link += ":Collecteur_Cri;";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "Tiberium;";
                      else link += ":Collecteur_Tib;";
                      break;
                    case 4:
                      /* Woods */
                      link += "Bois;";
                      break;
                    case 5:
                      /* Scrub */
                      link += "Broussailles;";
                      break;
                    case 6:
                      /* Oil */
                      link += "Nappe_Petrole;";
                      break;
                    case 7:
                      /* Swamp */
                      link += "Marais;";
                      break;
                    default:
                      console.log("scanbase [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += "Vide;";
                      break;
                  }
                }
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("scanbase [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__scanbase_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__scanbase_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 999999;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our scanbase.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            scanbase.selected_base = selected_base;
            if (this.__scanbase_initialized != 1) {
              this.__scanbase_initialized = 1;
              this.__scanbase_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("ScanBase", "http://static.ihostinghq.com/images/favicon.png?100");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      scanbase.make_sharelink();
                    });
                    this[i].add(link);
                    this.__scanbase_links.push(link)
                  }
                } catch (e) {
                  console.log("scanbase [2]: ", e);
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
                console.log("scanbase: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = scanbase.selected_base;
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
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__scanbase_links.length; ++i) {
                    self.__scanbase_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("scanbase [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("scanbase [3]: ", e);
          }
          this.__scanbase_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              scanbase_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else console.log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = scanbase_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  console.log(e);
}