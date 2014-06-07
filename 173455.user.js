// ==UserScript==
// @name           Firestorm Alliance Part 2
// @author         Dooki
// @description    Basis Informationen zur wöchentlichen Auswertung und Übergabe an die Allianz Befehlshaber. Diese Version bietet einen Button oberhalb des Spielfensters an. Welcher ein Fenster mittels eines Klicks hervorruft. Darüber können die Werte übermittelt werden.
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://www.php-gfx.net/Wrapper/update/144825
// @updateURL      http://www.php-gfx.net/Wrapper/update/144825
// @downloadURL    http://www.php-gfx.net/Wrapper/144825.user.js
// @version        1.0
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
								VERSION = '2.5.5';
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
									this.BasenwertePage = new qx.ui.tabview.Page("Basenwerte");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Mitglieder");
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
									var credit_b = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var credit_def = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
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
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom;
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
													creditsPerHour = creditsPerHour + creditPerHour;
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
													if(parseInt(creditPerHour) > 50000)
														{
															credit_b++;
															credit_def = credit_def + c.get_LvlDefense();
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													// All Bases v2.5
													// Basename,BaseLvl,OffLvl,DefLvl,VE,VZ,KZ,SupportLvl,Credits,Strom,
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + '';
													
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									credit_durchschnitt = credit_def / credit_b;
									newAusgabe["credit_basen"] = credit_b;
									if(credit_b>0)
										{
											newAusgabe["credit_def"] = "" + credit_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["credit_def"] = 0;
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
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
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
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();

									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									
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

									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}
									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Allgemeine Informationen</u></b></big><br><b>Allianz Rolle:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Spielername:</b> " + newAusgabe["Spieler"] + "<br><b>Spielerklasse:</b> " + newAusgabe["Klasse"] + "<br><b>Aktuelle Uhrzeit:</b> " + newAusgabe["Uhrzeit"] + "Uhr - " + newAusgabe["Datum"] + "<br><b>Rang:</b> " + newAusgabe["Rang"] + "<br><b>Maximale KP:</b> " + newAusgabe["maxKP"] + "<br><b>Maximale Repzeit:</b> " + newAusgabe["repZeit"] + "<br><b>Basenanzahl:</b> " + newAusgabe["Basen"] + "<br><b>Credit Basen Anzahl:</b> " + newAusgabe["credit_basen"] + "<br><b>Creditproduktion:</b> " + newAusgabe["Creditproduktion"] + "<br><b>Creditbasen Defensive Ø:</b> " + newAusgabe["credit_def"] + "<br><b>Supportgebäude Anzahl:</b> " + newAusgabe["support_basen"] + "<br><b>Supportgebäude Level Ø:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ø aller Basen:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + firstBaseName + "<br><b>Basis Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offensive:</b> " + newAusgabe["1st_Off"] + "<br><b>Defensive:</b> " + newAusgabe["1st_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + secondBaseName + "<br><b>Basis Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offensive:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defensive:</b> " + newAusgabe["2nd_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. Fußtruppen:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&allBases=" + escape(allBases) + "' target='_blank'><button><b>     Werte übertragen     </b></button></a></td></tr></table>").set({rich: true}));
									
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
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Auflistung (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(newAusgabe["AllianzRolle"] == 'Oberbefehlshaber' || newAusgabe["AllianzRolle"] == 'Leader')
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Nur für OBH's sichtbar:</u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Anpassung</u></b></big><br>Mit diesem Button kannste du deine Mitglieder auf<br>der BaseInfo Seite anpassen, sollten ehemalige Mitglieder,<br>die z.Z. einer anderen Allianz angehören,<br>noch in der Auflistung angezeigt werden.</td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>     Mitglieder abgleichen     </b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Ersteller:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Es gibt ein paar Hauptgründe warum dieses Script entstand. Zum einen wollten Befehlshaber einen Überblick haben, über die einzelnen Werte ihrer Mitglieder, zum anderen sollten die Mitglieder selber sehen, wie ihre Werte sind.<br><br><big><b><u>Was bewirkt \"Werte übertragen\"?</u></b></big><br>Mit dem Button \"Werte übertragen\" können eure Basenwerte an eine Homepage übermittelt werden, wo sich OBH's anmelden können und ihre Allianz auswerten können. Die OBH's bekommen mit dem erstmaligen Übertragen ihrer eigenen Werte einen \"Befehlshaber Login\" angezeigt, welcher nur EINMAL sichtbar ist. Danach können sich Zugriffsberechtigte (diese Zugangsdaten sollten von diesem OBH an berechtigte Personen weitergegeben werden) ihre Allianz einsehen und diverse Einstellungen tätigen. Mitglieder bekommen mit dem übertragen ihrer Werte einen permanenten Link angezeigt welchen sie für ihre eigenen Werte nutzen können. Sie sehen dann ihre letzten 5 Einträge wo sie selbst auswerten können wo sie sich verbessert haben.</td></tr></table>").set({rich: true, width: 350}));
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










// ==UserScript==
// @name        C&C:TA Compass
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Creates compass poiting to the currently selected base (compass points from itself).
// @version     1.0.1
// @author      Caine
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

(function () {
var CompassMain = function () {
try {
function createCompass() {
console.log('Compass loaded');qx.Class.define('Compass', {
type: 'singleton',
extend: qx.core.Object,
members: {
needle: null,
ctx: null,
background: null,
size: 50,
initialize: function () {
try {
this.background = new Image();this.background.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABaCAYAAAAFOiBkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACnNJREFUeNrsXV1sHFcVPnf+9sdrp3Ucp60QogHRSFFbVdCkrSKhSCBICVASGqdVSVIKUop45Y1H3pEQDzwArdKfUNM2pGkShERDgdQlrQQEKSUgNwgJUWo7tde7O7vzdznnzL27d9drtyDh2Os7yXh25s7cmfvdc77zMzN3xCN7dwBNjYV3wJjcg1/7dvLpLx2GLE0gyyQkSb4EELjMACT+FgL/43qaQSYzcF0X1x0sklQEvDeuUx2AS9riOA7XQfVxWZbwOtXDSyyXWZpXz/sCr9O+tI9Dx+A/R7i4T8Ln9nyPzwW0n+PyMWkS4zYB+VUAnteHQjHg48+cfBLOnXvO0YUfu/U2s+2C9wc79Z08/ePwt76DPe5AHKeIvEx2fuoBqC9W815BAYnjGHsZexKlxg8CiFotxpZ6K8scSLBcotT4fsCSlaUtcP0iS1aK27GvscwDV2TQaCUsEQ4en6QSuw1PgP89T0tTzF1JdZGUkHSRpHm+DzJNIaELQungc6cpS5aH0kqSnOH2JEEp8jw8Fs+d5hLpuR40Qx/8Qgn2fOYAhJH8bdJo7B7fWsFrrMKlS9MaCpYiQap04JFvcCUKGPmJ+/Zhw5sQRS1uLF1co9HAk2RQKATcqDAMoVQq4XqB1aYVxQyelsZWK8Yyn4HEpvGFOk6GdQDUGnjhWI+LDXI9F/dtIUgCz48qIYBBTKIQG4wreM5UqQk1ClhBPAQnBg/LCVZEC+vx8RwBNOp1blmAINKUxC0gBggCl8Fz3AIrSmV4CF7+2VMXEJjdBIxTvAn+ePFCR59OT34PDxYaGHnnzr0QIghXfvIj+Pf58wOpJlvvvx8+OjGBHVuG11/9+Q8RmMcJGBlL+NMfXutWJeqKO+7ei1LShL8efxKiM2dh+8Iio58tM+uytvz1Wf4/J6GZ0vitZ6dnFspQUNnM8y/AP1Citj14EO7dc+DY1CtPUBWP058/v9kNjLxj5+egVqvC1RPPQHTqJdiyWIOmENzAdAVg+gEiV6nne4HR1kT0LPXsytxOba414NqJn8I0rn94/364Z89jxy5OnWmDo4F5++7dX4BqdR7ePvEshJOTUJl9F2ZRMUOZNzKRHXDaS9mRGLmGJEYD4goFBnSWnsjLSvinWHeh9tRxmI4i2H7kMdh1795jr//mLFX1Ta7vX//8u1ysVuFvKCn1Z56G4bkZaCDh1Ylge4BJTel5P2BWARkh/ndghnAuI/Evjo7B8JFH4SMH9iPnDMMvz76Y13d1+i1JTP7a0SNw27vXoIUmr4EFIc4t1VATkBS6Acl6LvZ6SQz0UaUuNVIzlZFdIvtWpt9oGa+Mj8Lu409AUBiG8tBIrkrkfwhVe4K2lADRwIR9gPmg5AuryDPLccxywOjOZclKU3XhLvtEURzlwLDrnuWF1eosLGBLF3Guoa40ZIdPElYfuYRj5BoDRvRTJSGYTD21jVSpgj5QhCsZbbh5C8ToRLp+Af2sVEkMbqCZG+WX8obJbn2VGm3ZfRHyOgKyEkCih1scYZhtMw4SneumjiYHNtBWSWAw5qjAq1wZyV1xnIsGxyznx8AaBQb6qJIJjOYYzTOg/BxqlVQt8SgGiZXE1HG5iMua4pmmanCyAsdcb0CWI+R+HOOpMt3pSZeFEzlVKCy8FANDDlAIkIU5qGKLq8gvZK47HCMVxyw112sWGNGtSh7zjuBtZVyPBPGLyLMht4xjnBdxoCmEo4BB4k2zXDEKlRsYzdTQ034SI9eJxIhlJEarUFGpFUlPyjkl9IxdBQwllSjZQ9MNpSLvWFFqFPXxWZYz02sJmH5m2wQrUKBonqkqVSKnVCrP1KNUg+Pm5Pte2GxzTH0FjlnvEkOgDCkBGFbHxTFapEByzknFSkIliFCkavMQYovrSCA1FRK0OUb2kO864Rg9kw+jOSZRO7m4U8BNv5lVidUpM6ySUAJY3rS5zS++ErN+nu96lRjXkJiykpqyogxtmYiAFTCIWiHPdm3GAm3jBzkk0Nyi1Wke5y2jw+Ch56uxsCGBDQlsSGBDAhsS2JDAhgQ2JLAhgQ0JNkhIQJ4ePdtC05DvaTFirokMYN7vDuRa45h+ZtvtwzFDKiTQB7b9GH0/l831YpWJiEx13XDw2hwjl95XWusSo821yTEFBUikPd8tozkGiEWpkPOtRyYqU+YaopBbLBWBZLLDJ713H7WPKNcYMp27kzmfZAotvp+keIdDAZOI1IHCkBxPZp2WbfYdKOJqRRFvywBiCcfINW6uxVKOaYcEIg8ky+pW7QLkPSyN1rAfo3t9JhjZsOZa97KrXBePfjjqHu1GNtcG+yqJgY4IbWhzLXJznarclEfS4ujHRpuNtjSkRuPTdW6VVIzcLmt3spGPyTnGlBjZoZzK8Ejbzpc2kB+zoNuBWISt1OSYXGLqcZ6PqffkYwZVlZIe4s2PF8qPyTpZq8bCHNRUPmaQyZdMdUxqhDu5Kh+TCwy2M0209y/5gWGdjykp6dChwSCb65IR+lCWgTMNjtCxUsZPEtF0Y6nIB220fAzRh+/noHie24mVHJW1mg+beawEncfNBjmDR1Iz0jZK+YshQvl0nuu4/Oi6dvCaysEb5JxvqmIlcvAKysFjNaIsnspmevQsv75hVEEHTyqEA8PBG8S7BGVFGRWVRaAXOji4VCkYtkq+l+dhhrzufMxGuK9E6jSnVIlf9NAYSJnyqyxsrmt5Pqam8jHhMvkY83nf9XIn0pSYsvZjdIpifFQlwTvZTI9el0kVSiIOQShxoHSEmYfJgVk/967N269S5VoyxTuZQULKt+V73cQzWSftAO3X5UZGxtr8UoaN87TDDHEMvfgFRtohwjCg2Qh5ZXZhlu9E6icdQuNph9TM5K2DDJ6jMniOoUqu8bRDWT3x0FRPO8zO16CCSI2Vi0ujawhKeeWyG/22yij1cQzpWBd+jOgOIsFQN7DRtY2ubXRto2sbXdvo2kbXNrq20bWNrm10baNrG13b6NpG1za6ttG1ja5tdG2jaxtd2+jaRtc2urbRtY2ubXRto+vVi65pxNMoinR8ACX2hLtfFh3U4d5KHEUrkREpvwIZ+Pkr6V6xWII4iuGWffvgHR4gcA7d4gwibFlzQAcIpON8GjIXLfJ7o2PwoQe+jBs9Hh329ItP58C8eeFkcteuL3q3PngQpuMYFief4yElqeVOH3O9nOQsAUasrsT810NKqlETCxOHYNvEwxDg+tSrL18+9ez3b9eW2X/jd6flnbs+C9seehiuYtPCk6dgbLHGUjNQg5CqbaQ+1yplqBya4EFIfc+H30+duYxFO8CIE7neSxd/Ie+65/Ow/eij8BZKy8ypl2DroA5bi6AMPXSIh60NkEqmXvnxZad40w6zbnM8X3HpjXM80PHHDx+FK0kCfxnggY5ZUoIAps6/0CUpt3/yvhyMDT40dnV8a2VT36Gx9fD7X/nq183B1CUNpp6m8UANpk7HE7gOXs/ZM89Xk0ZjU5/B1LtV6fgPvmtuL0RR3FrpuwQF6j3zuwTFD/5dgkL5+n+X4Ne/mrxRN7bnuwQOgP0uwbLTfwQYAIY7xh+Wjkp8AAAAAElFTkSuQmCC'
this.needle = new Image();this.needle.src = 'data:image/png;base64,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';var ec = document.createElement('canvas');document.body.appendChild(ec);ec.width = 70;ec.height = 90;ec.style.position = 'absolute';ec.style.top = '35px';ec.style.left = '140px';ec.style.zIndex = 999999;this.ctx = ec.getContext('2d');phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);} catch (e) {
console.log("Compass.initialize: ", e);}
},
displayCompass: function () {
try {
var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();var	cityCoordX = currentCity.get_PosX();var	cityCoordY = currentCity.get_PosY();var region = ClientLib.Vis.VisMain.GetInstance().get_Region();var zoom = region.get_ZoomFactor();var targetCoordX = 175;var targetCoordY = 80;var gridW = region.get_GridWidth();var gridH = region.get_GridHeight();var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;var dx = viewCoordX - cityCoordX;var dy = cityCoordY - viewCoordY;var distance = Math.sqrt(dx * dx + dy * dy);var ctx = this.ctx;ctx.clearRect(0, 0, 70, 90);ctx.save();ctx.font = '18px Tahoma';ctx.fillStyle = '#FCDE7E';ctx.translate(35, 35);ctx.drawImage(this.background, -35, -35);var dtext = Math.round(10 * distance) / 10;ctx.fillText(dtext, -dtext.toString().length * 9 / 2, 40);ctx.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));ctx.drawImage(this.needle, - this.size / 2, - this.size / 2);ctx.restore();} catch (e) {
console.log("displayCompass", e);}
}
}
});}
} catch (e) {
console.log('createCompass: ', e);}
function CompassCheckLoaded() {
try {
if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
createCompass();window.Compass.getInstance().initialize();} else {
window.setTimeout(CompassCheckLoaded, 1000);}
} catch (e) {
console.log('CompassCheckLoaded: ', e);}
}
if (/commandandconquer\.com/i.test(document.domain)) {
window.setTimeout(CompassCheckLoaded, 1000);}
}
try {
var CompassScript = document.createElement('script');CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';CompassScript.type = 'text/javascript';if (/commandandconquer\.com/i.test(document.domain)) {
document.getElementsByTagName('head')[0].appendChild(CompassScript);}
} catch (e) {
console.log('Compass: init error: ', e);}
})();   


// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.4
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @updateURL   https://userscripts.org/scripts/source/145168.meta.js
// @downloadURL https://userscripts.org/scripts/source/145168.user.js
// ==/UserScript==
(function(){var b=function(){var e=["__msbs_version","1.8.4","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","http://goo.gl/DrJ2x","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localização","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Lager","Vorposten","posto avançado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Gebäudezustand","construção do Estado","construction de l\x27État","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nível mínimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Único centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place à la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","Veículos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","Tibério","Kristalle","Cristal","Power","Strom","Potência","Energie","Credits","Créditos","Crédit","Forschung","Investigação","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}})();

// ==UserScript==
// @name          CnC: Tiberium Alliances Available Loot Summary + Info Ver 2.0
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @version       2.04
// @author        MrHIDEn (in game: PEEU) based on Yaeger & Panavia code.
// @namespace     MHTools.Loot
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/160800.user.js
// @updateURL     https://userscripts.org/scripts/source/160800.meta.js
// ==/UserScript==
(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            //console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/IDap9';//2.0.x
            var version = MHTools.Loot.VERSION.toString();
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            // reload bases stored in browser
            //this.lootList.reloadList();
            function Types(o) {
              var a = [];
              for(var k in o) a[o[k]] = k;
              return a;
            }             
            this.LObjectType = Types(ClientLib.Vis.VisObject.EObjectType);
            this.LViewMode = Types(ClientLib.Vis.Mode);
            
            // window
            this.Self = this;
            var backColor = '#eef';
            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var viewW = region.get_ViewWidth();
            this.win = (new qx.ui.window.Window("Loot "+version));
            this.win.set({
              width:350,
              showMinimize:false,
              showMaximize:false,
              showClose:true,
              contentPadding: 6,
              allowClose:true,
              resizable:false,                  
              toolTipText: "MrHIDEn tool - Loot "+version
            });
            //http://demo.qooxdoo.org/2.0.2/apiviewer/#qx.ui.mobile.core.Widget~dblclick!event
            //mouseover
            //qx.event.Timer.once(fun,obj,time)
            /*NOTE
            MHTools.Loot.getInstance().win.toggleActive();
            MHTools.Loot.getInstance().win.setUseMoveFrame(1)
            MHTools.Loot.getInstance().win.moveTo(100,100);
            MHTools.Loot.getInstance().win.setLayoutProperties({left:200,top:100});
            lp=MHTools.Loot.getInstance().win.getLayoutProperties();
            //Object { left=586, top=112}
            */
            this.win.addListener("mouseover",function(e) {
                //this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("move", function(e) {
              console.log('win MOVE');
              var pos = {left:e.getData().left, top:e.getData().top};
              if(pos!==null) {
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) S.SetItem(this.classname+".winpos", pos);
              }
            }, this);
            this.win.addListener("click",function(e) {
                //webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.Data.Selected.X,this.Data.Selected.Y);
            },this);
            this.win.addListener("dblclick",function(e) {
                this.extTimer.stop();
                this.win.close(); 
            },this);
            this.win.addListener("close",function(e) {
                this.extTimer.stop();
                //this.win.close(); 
            },this);
            this.win.addListener("minimize",function(e) {
              if(this.extMinimized) {
                this.extMinimized = false;
                this.extPrint();
              }
              else {
                this.extMinimized = true;                
                this.win.removeAll();
              }
              this.win.restore();//trick
            },this);
            var pos = {left:(viewW-10-this.win.getWidth()), top:35};
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var posSaved = S.GetItem(this.classname+".winpos");
              if(posSaved!==null) {
                pos = posSaved;
              }
            }
            this.win.moveTo(pos.left, pos.top);
            var winLayout = new qx.ui.layout.Grid(5,5);
            this.win.setLayout(winLayout);
            this.win.setTextColor('yellow');   
            
            //this.extTimer = new qx.event.Timer.once(this.extOnTimer,this,500);
            this.extTimer = new qx.event.Timer(1000);
            this.extTimer.addListener("interval",this.extOnTimer,this);
            
            this.extendSelectionChange();
            this.extendViewModeChange();
            //options
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info '+version+' loaded.');
          },
          statics : {
            VERSION: 2.04,
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data,
            LOOTLIST: this.lootList
          },
          members : {
            Self: null,
            win: null,
            extStoreName: this.classname,
            extItems: [],
            extMinimized: false,
            extTimer: null,
            extAdd: function(l,p) {
              this.extItems.push(l,p);
            },
            extPrint: function(type) {            
              this.win.removeAll();
              if(!this.extMinimized) {
                for(var i=0;i<this.extItems.length;i+=2) {
                  this.win.add(this.extItems[i],this.extItems[i+1]);
                }
              }
              this.win.open();
            },
            extOnTimer: function() {
              //console.log('extOnTimer');
              this.onSelectionChange('Timer');
              this.extPrint();
            },
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
              //,showMeasure:             {v:true,  d:true,  l:'Shows distance from locked object to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            // store v3
            lootList: {
              storeName: 'MHToolsLootList3',
              list: {
                d: {},
                c: 0
              },
              exist: function(xy) {
                return typeof(this.list.d[xy])=="object";
              },
              save: function(xy,d) {//in use
                //console.info("lootList.save");
                try {
                  if(xy<0) return;
                  //id could be not actual after some patch
                  var fprint = false;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(!this.exist(xy)) {//new item
                    this.list.c++;
                    fprint = true;
                  }
                  this.list.d[xy] = {id:id, Data:d, xy:xy};
                  //if(fprint) console.dir(this.list.d);
                  // JSON - disabled
                  //var S = ClientLib.Base.LocalStorage;
                  //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);  
                } catch (e) {
                  console.warn("lootList.save: ", e);
                }
              },
              load: function(xy) {//in use
                //console.info("lootList.load");
                try {
                  if(xy<0) return {id:id,Data:{}};
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  if(this.exist(xy)) return this.list.d[xy];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("lootList.load: ", e);
                }
              },
              store: function(xy, k, d) {//in use
                //console.info("lootList.store key:",k);
                try {
                  var mem = this.load(xy).Data;
                  mem[k] = d;
                  this.save(xy,mem);        
                } catch (e) {
                  console.warn("lootList.store: ", e);
                }
              },
              restore: function(xy,k) {//?? NOT in use
                //console.info("lootList.restore");
                try {
                  var mem = this.load(xy).Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("lootList.restore: ", e);
                }
              }              
            },            
            // bases
            Data: {
              lastSelectedBaseId: -1,
              selectedBaseId: -1
            },
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,          
            waiting: [1,'0','_','1','_','2','_','3','_','4','_','5','_','6','_','7','_','8','_','9','_'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            LObjectType: [],
            LViewMode: [],
            viewMode: 0,//"None"
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() { 
              try {
                //if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                
                var d = this.Data;    
                //console.info("loot.loadBase.lastID:",d.lastSelectedBaseId);      
                            
                d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                
                if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                
                d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                            
                d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                
                //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                d.ec = d.cc.get_CurrentCity();
                if(d.ec === null) return false;
                if(d.ec.get_CityBuildingsData() === null) return false;         
                if(d.ec.get_CityUnitsData() === null) return false;         
                
                d.oc = d.cc.get_CurrentOwnCity();            
                if(d.oc === null) return false;
                if(d.oc.get_CityBuildingsData() === null) return false;
                if(d.oc.get_CityUnitsData() === null) return false;
                
                d.ol = this.getData(d.oc);
                d.el = this.getData(d.ec);// Buildings Defence Offence               
                if(typeof(d.ol)=='undefined') return false;
                if(typeof(d.el)=='undefined') return false;

                if(d.el.Buildings.c === 0) return false;
                if(d.ol.Buildings.c === 0) return false;                 
                 
                //console.info("loot.loadBase.ID:",d.selectedBaseId); 
                d.lastSelectedBaseId = d.selectedBaseId; 
                d.loaded = true;
                return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            //NEW API for LOOTS
            getLoots2: function (r) {
              r = r || {};
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
              var l=ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();     
              for (var i in l) {
                var c = l[i];//Requirement/Cost
                if(typeof(c)!='object') continue;                
                var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                r[k] += c.Count;                 
              }
              return r;
            },
            calcResources: function (xy) {
              //console.info("loot.calcResources"); 
              try {          
                if (!this.settings.showLoot.v) return;

                //console.log('Test getLoots2',this.getLoots2());
                if (!this.Data.loaded) return;
                //console.log('this.Data.loaded');
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                // NEW
                // ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity()
                var loots2 = this.getLoots2();              
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots                
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store(xy,'lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function (xy) {
              //console.info("loot.calcTroops"); 
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var h = unit.get_Health();//EA API
                  troops[0] += h;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += h;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store(xy,'troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function (xy) { 
              //console.info("loot.calcInfo"); 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function(xy) {
              //console.info("loot.calcFriendlyInfo"); 
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                var hp;
                var t;
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
            calcDistance: function () {
              //console.info("loot.calcDistance"); 
              this.Display.distanceArray = [];
              
              var hp;
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject!==null) {
                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  var t = visObject.get_VisObjectType();
                  switch (t) {                   
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin: 
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var selX = visObject.get_RawX();
                      var selY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                        
                      //target is locked by button
                      // if(typeof(this.Data.Lock)=='undefined') {
                        // this.Data.Lock={X:ocX,Y:ocY};//{X:0,Y:0};
                      // }
                      //var locX = this.Data.Lock.X;                    
                      //var locY = this.Data.Lock.Y;
                      if(typeof(this.Data.Selected)=='undefined') {
                        this.Data.Selected={};
                      }
                      this.Data.Selected={X:selX,Y:selY};
                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, selX, selY).toString();
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, selX, selY);
                      //var loc = ClientLib.Base.Util.CalculateDistance(locX, locY, selX, selY);
                      var cdt = oc.GetCityMoveCooldownTime(selX,selY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //this.Data.MeasureDistance = loc;                      
                      var hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      var t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
                      break;
                    default:
                      break;
                  }//switch (t) 
                }//if (visObject               
                //DISABLED this.lootList.store(xy,'distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            
            onSelectionChange: function(oldObject,newObject) {
              try { 
               if(qx.core.Init.getApplication().getChat().getFocused() || (qx.core.Init.getApplication().getPlayArea().getViewMode()!=ClientLib.Data.PlayerAreaViewMode.pavmNone)) {
                    //TODO something is wrong
                    //this.extTimer.stop();
                    //this.win.close();
                    //return;
                }            
                this.extItems = [];
                this.win.removeAll();
                this.win.close(); 
                
                if(oldObject=="Timer") {
                  //console.log("@Timer");
                }
                else {
                  //console.log("@Select");
                  this.Data.lastSelectedBaseId = -2;
                  this.waiting[0] = 1;
                }
                //ClientLib.Vis.SelectionChange
                //console.clear();
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if(visObject!==null) {
                  var vt = visObject.get_VisObjectType();
                  //console.log('onSelectionChange.Object: ',this.LObjectType[vt]);
                }
                else {
                  //console.log('onSelectionChange.Object: ','null');
                  this.Data.lastSelectedBaseId = -3;
                }
                
                if (visObject!==null) {
                  var t = visObject.get_VisObjectType();
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  //console.log('!=null: Object type: ',this.LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  //window.visObject = visObject;
                  this.Data.visObject = visObject;
                  this.extTimer.start();
                  var xy = -1;
                  if(typeof(visObject.get_RawX)!='undefined') {
                    var xy = 10000 * visObject.get_RawX() + visObject.get_RawY();
                  }
                  switch (t) {                    
                    // Own bases, ally base
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                      //this.extTimer.setEnabled(true);
                      //this.extTimer.start();// does not work
                      var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      var aid = oc.get_AllianceId();
                      var sid = visObject.get_AllianceId();
                      
                      this.calcDistance();                      
                      if(aid == sid) {
                        // Own, Ally
                        //clear                  
                        //self.Display.distanceArray = [];
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcFriendlyInfo(xy);
                          this.addFriendlyLabel();
                        } else {
                          this.addLoadingLabel();
                        }
                      }
                      else {
                        // Enemy
                        if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();
                          this.calcResources(xy);
                          this.calcTroops(xy);
                          this.calcInfo(xy);
                          this.addResourcesLabel();
                        } else {           
                          if(this.restoreDisplay(xy)) {
                            this.addResourcesLabel("r");
                          } else {          
                            this.addLoadingLabel();
                          }      
                        }
                      }
                      break;
                    // CAMP OUTPOST BASE
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                      this.calcDistance();
                      if (this.loadBase() && oldObject=="Timer") {
                  this.extTimer.stop();                       
                        this.calcResources(xy);
                        this.calcTroops(xy);
                        this.calcInfo(xy);
                        this.addResourcesLabel();
                      } else {          
                        if(this.restoreDisplay(xy)) {
                          this.addResourcesLabel("r");
                        } else {        
                          this.addLoadingLabel();
                        }
                      }
                      break;
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      this.extTimer.stop();
                      //clear
                      this.Display.lootArray = [];
                      this.Display.troopsArray = [];
                      this.Display.infoArrays = [];
                      this.Display.twoLineInfoArrays = [];
                      this.calcDistance();
                      this.addResourcesLabel();
                      break;
                    default:
                      this.extTimer.stop();
                      this.win.close();
                      break;
                  }                  
                  // console.log('focusable: false');
                  // this.win.set({focusable: false});
                }
                else {                
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            onViewChanged: function(oldMode, newMode) {
              //console.log('onViewChanged: ');
              // var p = qx.core.Init.getApplication().getPlayArea();
              // console.log('getViewMode',p.getViewMode());//0-map,1-base,2-def,3-off
              // qx.core.Init.getApplication().getPlayArea().getViewMode();
              // case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:
              // console.log('getViewCity',p.getViewCity());//id
              // var fH = ClientLib.Data.MainData.GetInstance().get_Combat();
              // qx.core.Init.getApplication().getPlayArea().getCurrentViewMode()
              // var c = qx.core.Init.getApplication().getChat();
              // c.getFocused();//good
              // c.getFocusedOrMoused();//good
              // qx.core.Init.getApplication().getChat().getFocusedOrMoused();
              try {
                //console.log('newMode: ',newMode);
                console.log('onViewChanged: ',this.LViewMode[newMode]);
                this.viewMode = newMode;
                if(newMode != ClientLib.Vis.Mode.Region) {
                  this.extTimer.stop();
                  this.win.close();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onViewChanged: ', e);
              }
            },
            extendSelectionChange: function() {
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            extendViewModeChange: function() {
              //disabled
              //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , this.onViewChanged);
              
            },
            restoreDisplay: function(xy) {
              //console.info("loot.restoreDisplay");              
              var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              if(this.lootList.exist(xy)) {
                var d = this.lootList.list.d[xy].Data;            
                var da = this.Display.distanceArray;
                this.Display = {};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                c=0;
                var w = this.waiting[this.waiting[0]];
                if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>SCANNING... " + w + "</b>").set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                
                this.extPrint();
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(type) {
              //console.log('addResourcesLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j], {row: r, column: c++}); 
                      this.extAdd(hp.img[j], {row: r, column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j-1], {row: r,column: c++}); 
                      this.extAdd(hp.img[j-1], {row: r,column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                // WARNING
                c=0;
                if(type == "r") {
                  //this.extAdd(new qx.ui.basic.Label("<span style='color:blue'><b>Stored data. Wait...</b></span>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                  this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>[*STORED DATA. WAIT...]</b>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
                }
                
                this.extPrint();
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                this.extItems = [];
                //widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                this.extPrint();

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  };
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();