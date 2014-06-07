// ==UserScript==
// @name           Tranquillity - GD AutoUpdate
// @author         Vosr (Based on Seb (Based on Doki BaseInfo script))
// @description    Automatic player information for Tranquillity alliance
// @include        http*://prodgame*.alliances.commandandconquer.com/261/index.aspx*
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @version        1.6
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
                        VERSION = '1.6';
                        AUTHOR = 'Vosr';
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
                            var playerInfos = { };
                            
                            // For Research 
                            var TechId = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, faction);
                            var PlayerResearch = player.get_PlayerResearch();
                            var ResearchItem = PlayerResearch.GetResearchItemFomMdbId(TechId);
                            
                            if(ResearchItem != null)
                            {
                                var NextLevelInfo = ResearchItem.get_NextLevelInfo_Obj();
                                
                                var resourcesNeeded = new Array();
                                for (var i in NextLevelInfo.rr) {
                                    if(NextLevelInfo.rr[i].t > 0) {
                                        resourcesNeeded[NextLevelInfo.rr[i].t] = NextLevelInfo.rr[i].c;
                                    }
                                } 
                                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                var creditsResourceData = player.get_Credits();
                                var creditsGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                var creditsTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditsGrowthPerHour;
                                if (creditsTimeLeftInHours < 0) { creditsTimeLeftInHours = 0; }
                                playerInfos["TimeLeftNextMCV"] = ClientLib.Vis.VisMain.FormatTimespan(creditsTimeLeftInHours * 60 * 60); 
                                
                            }
                            else {
                                playerInfos["TimeLeftNextMCV"] = "Unknown";
                            }
                            // End For Research
                            
                            var apc = instance.get_Cities();
                            playerInfos["playerName"] = apc.get_CurrentOwnCity().get_PlayerName();
                            playerInfos["allianceName"] = apc.get_CurrentOwnCity().get_AllianceName();
                            var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
                            var AllianceID = apc.get_CurrentOwnCity().get_AllianceId();
                            switch (faction) {
                                case 1:
                                    /* GDI */
                                    playerInfos["faction"] = "GDI" ;
                                    break;
                                case 2:
                                    /* NOD */
                                    playerInfos["faction"] = "NOD" ;
                                    break;
                                default:
                                    console.log("GD Autoupdate: Unknown faction: " + faction);
                                    playerInfos["faction"] = "Unknown" ;
                                    break;
                            }
                            
                            var apcl = apc.get_AllCities().d;
                            
                            var increment = 0;
                            
                            for (var key in apcl)
                            {
                                var c = apcl[key];
                                try
                                {
                                    increment++;
                                    /*sd = c.get_SupportData();
													if(sd !== null)
													{
														supports++;
															
													}*/
                                    /*var powerBase = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
													PowersPerHour = PowersPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
													creditsPerHour = creditsPerHour + ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													TiberiumsPerHour = TiberiumsPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
													CrystalsPerHour = CrystalsPerHour + c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
													*/
                                    
                                    playerInfos["defence" + increment] = c.get_LvlDefense();
                                    playerInfos["offence" + increment] = c.get_LvlOffense();
                                    playerInfos["power" + increment] = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    playerInfos["tiberium" + increment] = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                                    playerInfos["crystal" + increment] = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                                    playerInfos["credits" + increment] = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
                                    
                                    /*if(c.get_CommandCenterLevel() > 0)
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
														}*/
                                }
                                catch (e)
                                {
                                    console.warn("GDAutoUpdate : ", e); 
                                }
                            }
                            /*playerInfos["playerName"] = PlayerName;
									playerInfos["allianceName"] = AllianceName;
									playerInfos["supports"] = supports;
									playerInfos["powersPerHour"] = PowersPerHour;
									playerInfos["creditsPerHour"] = creditsPerHour;
									playerInfos["tiberiumsPerHour"] = TiberiumsPerHour;
									playerInfos["crystalsPerHour"] = CrystalsPerHour;
									playerInfos["powerMainPerHour"] = PowerMainPerHour;
									playerInfos["firstOfflvl"] = firstOfflvl;
									playerInfos["firstDeflvl"] = firstDeflvl;*/
                            
                            /*var out = new Array();

									for (key in playerInfos) {
										out.push(key + '=' + playerInfos[key]);
									}

									var _data = out.join('&');
									console.log(_data);
                                    
									GM_xmlhttpRequest({
										method: "POST",
										url: "https://empha.nl/ccta/postPlayerInfos.php",
										headers: { "Content-type" : "multipart/form-data" },
										data: _data,
										onload: function() {
											console.log(this.responseText);
										}
									});*/
                            
                            
                            
                            ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {name:playerInfos["playerName"]}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(a,b) {
                                playerInfos["PveKills"] = b.bde;
                                playerInfos["PvpKills"] = b.d;
                                
                                var out = new Array();
                                
                                for (key in playerInfos) {
                                    out.push(key + '=' + playerInfos[key]);
                                }
                                
                                var _data = out.join('&');
                                console.log(_data);
                                var xhr = new XMLHttpRequest();
                                xhr.open('POST', 'http://empha.nl/ccta/postPlayerInfos.php', true);
                                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                xhr.onload = function () {
                                    // do something to response
                                    console.log(this.responseText);
                                };
                                xhr.send(_data);
                            }), null);
                            
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