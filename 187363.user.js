// ==UserScript==
// @name           BaseInfo
// @author         Dooki
// @description    Basic information sent to the Alliance commander for weekly evaluation. This version has a button on top of the game window at the top right that creates new window with your current base values in one click. Furthermore, the values ​​can be transmitted to a central database for evaluation.
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://www.php-gfx.net/Wrapper/update/144825
// @updateURL      http://www.php-gfx.net/Wrapper/update/144825
// @downloadURL    http://www.php-gfx.net/Wrapper/144825.user.js
// @version        2.6.0
// @icon           data:image/png;base64,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
// ==/UserScript==

function Ini() {
	console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
	var BaseInfoMain = function () {
		function BaseInfoCreate()
			{
				try
					{
						qx.Class.define("BaseInfo", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								console.log("BaseInfo geladen...");
								VERSION = '2.6.0';
								AUTHOR = 'Dooki';
								CLASS = 'BaseInfo';
							},
							members: {
								BasenwerteFenster: null,
								BasenwerteTab: null,
								BasenwertePage: null,
								BasenwerteVBox: null,
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								BasenwerteButton: null,
								app: null,
								initialize: function () {
									this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION,"http://ccta.php-gfx.net/images/info.png").set({
										padding: 5,
										paddingRight: 0,
										showMaximize:false,
										showMinimize:false,
										showClose:true,
										allowClose:true,
										resizable:false
									});
									this.BasenwerteFenster.setTextColor('black');
									this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
									this.BasenwerteFenster.moveTo(280, 60);
									
									// Tab Reihe
									this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
										contentPaddingTop: 3,
										contentPaddingBottom: 6,
										contentPaddingRight: 7,
										contentPaddingLeft: 3
									});
									this.BasenwerteFenster.add(this.BasenwerteTab);
									
									// Tab 1
									this.BasenwertePage = new qx.ui.tabview.Page("Base Values");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Members");
									this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.MembersPage);
									this.MembersVBox = new qx.ui.container.Composite();
									this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
									this.MembersVBox.setThemedPadding(2);
									this.MembersVBox.setThemedBackgroundColor("#eef");
									this.MembersPage.add(this.MembersVBox);

									// Tab 3
									this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
									this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.AboutPage);
									this.AboutVBox = new qx.ui.container.Composite();
									this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
									this.AboutVBox.setThemedPadding(2);
									this.AboutVBox.setThemedBackgroundColor("#eef");
									this.AboutPage.add(this.AboutVBox);

									this.BasenwerteButton = new qx.ui.form.Button(null, "http://ccta.php-gfx.net/images/info_small.png").set({
										toolTipText: CLASS + " " + VERSION + " anzeigen",
										width: 32,
										height: 32,
										maxWidth: 32,
										maxHeight: 32,
										appearance: ("button-playarea-mode-frame"),
										center: true
									});
									this.BasenwerteButton.addListener("click", function (e) {
										this.BasenwerteVBox.removeAll();
										this.AboutVBox.removeAll();
										this.MembersVBox.removeAll();
										this.showBasenwerte();
										this.BasenwerteFenster.show();
									}, this);
									this.app = qx.core.Init.getApplication();
									this.app.getDesktop().add(this.BasenwerteButton, {
										right: 125,
										top: 0
									});
								},
								showBasenwerte: function (ev) {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction1 = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var aktuellesDatum = new Date();
									var Stunde = aktuellesDatum.getHours();
									var Minute = aktuellesDatum.getMinutes();
									var Monat = aktuellesDatum.getMonth()+1 ;
									var Tag = aktuellesDatum.getDate();
									var Jahr = aktuellesDatum.getFullYear();
									if(Stunde<10) Stunde = "0" + Stunde;
									if(Minute<10) Minute = "0" + Minute;
									if(Tag<10) Tag = "0" + Tag;
									if(Monat<10) Monat = "0" + Monat;
									var Datum = Tag + "." + Monat + "." + Jahr;
									var Uhrzeit = Stunde + ":" + Minute;
									var player_basen = 0;
									var support_gebaeude = 0;
									var v = 0;
									var offbasen = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var def_durchschnitt = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
									var TiberiumPerHour = 0;
									var TiberiumsPerHour = 0;
									var TiberiumProduction = 0;
									var TiberiumsProduction = 0;
									var CrystalPerHour = 0;
									var CrystalsPerHour = 0;
									var CrystalProduction = 0;
									var CrystalsProduction = 0;
									var credit_basen = '';
									var first_rep_flug = 0;
									var first_rep_fahr = 0;
									var first_rep_fuss = 0;
									var second_rep_flug = 0;
									var second_rep_fahr = 0;
									var second_rep_fuss = 0;
									var firstBaseName = '';
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = 0;
									var firstRepairAir = null;
									var firstRepairVehicle = null;
									var firstRepairInfantry = null;
									var secondBaseName = '';
									var secondBaselvl = 0;
									var secondOfflvl = 0;
									var secondDeflvl = 0;
									var secondPowerProduction = 0;
									var secondRepairAir = null;
									var secondRepairVehicle = null;
									var secondRepairInfantry = null;
									var factionArt = new Array();
									factionArt[0] = "";
									factionArt[1] = "GDI";
									factionArt[2] = "NOD";
									var newAusgabe = new Array();
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									var members = alliance.get_MemberData().d, member;
									var leaders = alliance.get_FirstLeaders();
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									var baseidforWorldmap = null;
									var coordsforWorldmap = '';
									var worldidforWorldmap = document.URL.split("/");
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom,aB_tiberium,aB_crystal;
									for (var key in apcl)
										{
											player_basen++;
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
														{
															support_gebaeude++;
															support = sd.get_Level();
															supportlvl = supportlvl+support;
															
														}
													else
														{
															support = 0;
														}
													unitData = c.get_CityBuildingsData();
													ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
													vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
													creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
													commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
													TiberiumPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
													TiberiumProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
													CrystalPerHour = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
													CrystalProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
													creditsPerHour = creditsPerHour + creditPerHour;
													TiberiumsPerHour = TiberiumsPerHour + TiberiumPerHour;
													CrystalsPerHour = CrystalsPerHour + CrystalPerHour;
													TiberiumsProduction = TiberiumsProduction + TiberiumProduction;
													CrystalsProduction = CrystalsProduction + CrystalProduction;
													
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	secondBaseName = firstBaseName;
																	secondBaselvl = firstBaselvl;
																	secondOfflvl = firstOfflvl;
																	secondDeflvl = firstDeflvl;
																	secondPowerProduction = firstPowerProduction;
																	secondRepairInfantry = firstRepairInfantry;
																	secondRepairVehicle = firstRepairVehicle;
																	secondRepairAir = firstRepairAir;
																	
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
															else if(c.get_LvlOffense() > secondOfflvl)
																{
																	secondBaseName = c.get_Name();
																	secondBaselvl = c.get_LvlBase();
																	secondOfflvl = c.get_LvlOffense();
																	secondDeflvl = c.get_LvlDefense();
																	secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
													if(c.get_CommandCenterLevel() > 0 && c.get_LvlOffense() > 0)
														{
															offbasen++;
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													if(c.get_LvlDefense())
														{
															def_durchschnitt = def_durchschnitt + c.get_LvlDefense();
														}
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium)) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal)) + ' | ' + key + '';
													if(baseidforWorldmap == null)
														{
															baseidforWorldmap = key;
															coordsforWorldmap = c.get_PosX() + ':' + c.get_PosY();
														}
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									def_durchschnitt = def_durchschnitt / player_basen;
									newAusgabe["off_basen"] = offbasen;
									if(player_basen>0)
										{
											newAusgabe["def_durchschnitt"] = "" + def_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["def_durchschnitt"] = 0;
										}
									newAusgabe["support_basen"] = support_gebaeude;
									if(support_gebaeude>0)
										{
											supportlvl = supportlvl / support_gebaeude;
											newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["support_lvl"] = 0;
										}
									VE_durchschnitt = VE_lvl / v;
									if(v>0)
										{
											newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["ve"] = 0;
										}
									first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
									first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
									first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
									if(first_rep_flug.split(":").length < 3)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_flug.split(":").length < 4)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fahr.split(":").length < 4)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									if(first_rep_fuss.split(":").length < 4)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
									second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
									second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
									if(second_rep_flug.split(":").length < 3)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_flug.split(":").length < 4)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fahr.split(":").length < 4)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									if(second_rep_fuss.split(":").length < 4)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();
									newAusgabe["SpielerID"] = PlayerID;
									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									newAusgabe["Tiberiumproduktion"] = parseInt(TiberiumsPerHour);
									newAusgabe["Kristallproduktion"] = parseInt(CrystalsPerHour);
									newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
									newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
									newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
									newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
									newAusgabe["1st_Flugzeuge"] = first_rep_flug;
									newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
									newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
									newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
									newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
									newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
									newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
									newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
									newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
									newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;
									newAusgabe["Leaders"] = leaders.l[leaders.l.indexOf(PlayerID)];
									newAusgabe["WorldID"] = worldidforWorldmap[3];
									newAusgabe["CoordsforWorldmap"] = coordsforWorldmap;
									newAusgabe["ShowonWorldmap"] = baseidforWorldmap;
									newAusgabe["Version"] = VERSION;

									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}

									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>General Information</u></b></big><br><b>Alliance Roll:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Player Name:</b> " + newAusgabe["Spieler"] + "<br><b>Player Class:</b> " + newAusgabe["Klasse"] + "<br><b>Report Time:</b> " + newAusgabe["Uhrzeit"] + "Hr - " + newAusgabe["Datum"] + "<br><b>Overall Rank:</b> " + newAusgabe["Rang"] + "<br><b>Max CP:</b> " + newAusgabe["maxKP"] + "<br><b>Max Repair Time:</b> " + newAusgabe["repZeit"] + " Hrs<br><b>Number of Bases:</b> " + newAusgabe["Basen"] + "<br><b>Number of Attack Bases:</b> " + newAusgabe["off_basen"] + "<br><b>Current Credit Production:</b> " + newAusgabe["Creditproduktion"] + "<b>/h</b><br><b>Current Tiberium Production:</b> " + newAusgabe["Tiberiumproduktion"] + "<b>/h</b> (without Bonus: " + parseInt(TiberiumsProduction) + "/h)<br><b>Current Cristal Prodution:</b> " + newAusgabe["Kristallproduktion"] + "<b>/h</b> (without Bonus: " + parseInt(CrystalsProduction) + "/h)<br><b>Credit Base Defense Level Ø:</b> " + newAusgabe["def_durchschnitt"] + "<br><b>Bases with Support:</b> " + newAusgabe["support_basen"] + "<br><b>Support Building Level Ø:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ø All Bases:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
									// 1. und 2. Offensive
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensive Base #1</u></b></big><br><b>Base Level:</b> " + firstBaseName + "<br><b>Base Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offense Level:</b> " + newAusgabe["1st_Off"] + "<br><b>Defense Level:</b> " + newAusgabe["1st_Def"] + "<br><b>Power Production:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Air Rep. Time:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Veh Rep. Time:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Infantry Rep. Time:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offense Base #2</u></b></big><br><b>Base Name:</b> " + secondBaseName + "<br><b>Base Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offense Level:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defense Level:</b> " + newAusgabe["2nd_Def"] + "<br><b>Power Production:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Air Rep. Time:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Veh Rep. Time:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Infantry Rep. Time:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
									// Werte übertragen + Worldmap Link
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><button><b>&nbsp;&nbsp;Submit Data&nbsp;&nbsp;</b></button></a></td><td><a href='http://map.tiberium-alliances.com/map/"+worldidforWorldmap[3]+"#"+coordsforWorldmap+"|3|"+baseidforWorldmap+"|~' target='_blank'><button><b>&nbsp;&nbsp;Worldmap&nbsp;&nbsp;</b></button></a></td></tr></table>").set({rich: true}));
									
									// Tab 2 Mitglieder
									var keys = Object.keys(AllianzSpieler);
									var anzahl = keys.length;
									var len = keys.length;
									var member='',userreplace='',i=0;
									userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
									while (len--)
										{
											i++;
											if(member != '')
												{
													if(i == 5)
														{
															member += ',<br>';
															i = 0;
														}
													else
														{
															member += ', ';
														}
													userreplace += ',';
												}
											member += AllianzSpieler[keys[len]];
											userreplace += AllianzSpieler[keys[len]];
										}
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Member List (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(leaders.l.indexOf(PlayerID) != "-1")
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Visible only to CIC:</u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Members Adjustment</u></b></big><br>With this button you can write to your members<br>adjust the base info page should former members,<br>who belong to another alliance,<br>still appear in the collection.</td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Script Information&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Author:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Why make script?</u></b></big><br>There are a few reasons why this script was made. One, a commander could have an overview of all the different values of their members. Two, members can see for themselves how their values are.<br><br><big><b><u>What Happens when I Submit Data</u></b></big><br>When you click Submit Data, your base values will be sent to a central database. There a CIC can log in and evaluate their alliance. When the CIC first transmits their own data a Commander Login message will show, it is visible only ONCE. After that they can give access rights (these credentials should be passed by this CIC to authorized persons), see their alliance and change various settings. Members get a permanent link which appears with the transfer of their values that they can use to display their own values. It will display their last 5 entries, then they can evaluate themselves to see where they have improved.</td></tr></table>").set({rich: true, width: 350}));
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(BaseInfo: ", e);      
					}
				BaseInfo.getInstance();
			}
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										BaseInfoCreate();
										BaseInfo.getInstance().initialize();
										return;
									}
							}
					}
				catch (e)
					{
						if (console !== undefined) console.log(e);
						else if (window.opera) opera.postError(e);
						else GM_log(e);
					}
				window.setTimeout(LoadExtension, 1000);
			}
		LoadExtension();
	}
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
		}
	Inject();
})();