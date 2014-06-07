// ==UserScript==
// @name           Monde 13 FR - GD AutoUpdate
// @author         Seb (Based on Doki BaseInfo script)
// @description    Script pour la mise à jour automatique des informations joueurs vers le google drive Illuminati
// @include        http*://prodgame*.alliances.commandandconquer.com/250/index.aspx*
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @version        1.0
// ==/UserScript==

function Ini() {
	console.log("GDAutoUpdate init...");
};
Ini();
(function () {
	var GDAutoUpdate = function () {
		function GDAutoUpdateCreate()
			{
				try
					{
						qx.Class.define("GDAutoUpdate", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								VERSION = '1.0';
								AUTHOR = 'Seb';
								CLASS = 'GDAutoUpdate';
							},
							members: {
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								app: null,
								initialize: function () {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var actualDate = new Date();
									var supports = 0;
									var firstBaseName ="";
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = null;
									var firstRepairInfantry = null;
									var firstRepairVehicle = null;
									var firstRepairAir;
									var defs = new Array();
									var PowerMainPerHour = 0;
									var creditsPerHour = 0;
									var TiberiumsPerHour = 0;
									var CrystalsPerHour = 0;
									var PowersPerHour = 0;
									
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianceName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianceID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									
									var playerInfos = { };
									
									for (var key in apcl)
										{
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
													{
														supports++;
															
													}
													var powerBase = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
													PowersPerHour = PowersPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
													creditsPerHour = creditsPerHour + ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													TiberiumsPerHour = TiberiumsPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
													CrystalsPerHour = CrystalsPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
													
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	PowerMainPerHour = powerBase;
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
												}
											catch (e)
												{
													console.warn("GDAutoUpdate : ", e); 
												}
										}
									playerInfos["playerName"] = PlayerName;
									playerInfos["supports"] = supports;
									playerInfos["powersPerHour"] = PowersPerHour;
									playerInfos["creditsPerHour"] = creditsPerHour;
									playerInfos["tiberiumsPerHour"] = TiberiumsPerHour;
									playerInfos["crystalsPerHour"] = CrystalsPerHour;
									playerInfos["powerMainPerHour"] = PowerMainPerHour;
									playerInfos["firstOfflvl"] = firstOfflvl;
									playerInfos["firstDeflvl"] = firstDeflvl;
									
									
									var out = new Array();

									for (key in playerInfos) {
										out.push(key + '=' + playerInfos[key]);
									}

									var _data = out.join('&');
									console.log(_data);
									var xhr = new XMLHttpRequest();
									xhr.open('POST', 'https://ssl6.ovh.net/~simutran/ccta/postPlayerInfos250.php', true);
									xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
									xhr.onload = function () {
										// do something to response
										console.log(this.responseText);
									};
									xhr.send(_data);
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(GDAutoUpdate: ", e);      
					}
				GDAutoUpdate.getInstance();
			}
			
		//Chargement de l'extension
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										GDAutoUpdateCreate();
										GDAutoUpdate.getInstance().initialize();
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
	
	//Injection du script dans le code jeu
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + GDAutoUpdate.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
				
		}
	Inject();
})();