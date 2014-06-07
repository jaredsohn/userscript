// ==UserScript==
// @version       1.0.3
// @name          C&C:Tiberium Alliances Available Loot Summary
// @namespace     cncloot
// @description   Ever wanted to know how many resources you get for destroying forgotten camps, outposts, bases or even other player bases?
// @author        Yaeger
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require       http://sizzlemctwizzle.com/updater.php?id=132151
// ==/UserScript==



(function (){
    var cncloot_main = function() {
        function cncloot_create() {
            console.log("cncloot Loaded");

            var imgTiberium = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png");
            //var imgTiberium = new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/532e9a3a847f03c265fdb70b7e775275.png");
            imgTiberium.setScale(true);
            imgTiberium.setWidth(16);
            imgTiberium.setHeight(16);

            var imgCrystal = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png")
            //var imgCrystal = new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/e7b5ffc01b9f7257722a14b10d8fe057.png")
            imgCrystal.setScale(true);
            imgCrystal.setWidth(16);
            imgCrystal.setHeight(16);

            var imgCredits = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_dollar.png")
            //var imgCredits = new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/55a42c6b8ea8237d22c694b0acfa03de.png")
            imgCredits.setScale(true);
            imgCredits.setWidth(16);
            imgCredits.setHeight(16);

            var imgResearch = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_research_mission.png")
            //var imgResearch = new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/1bd86444adb562111d6628fcefe96357.png")
            imgResearch.setScale(true);
            imgResearch.setWidth(16);
            imgResearch.setHeight(16);

            var lootLabel = new qx.ui.basic.Label("Lootable resources");
            lootLabel.set({width: 200});

            var cncloot = {
                selected_type: -1,
                selectedBase: null,
                lastSelectedBase: null,

                // the widgets for the different screens
                lootWindowPlayer: null,
                lootWindowBase: null,
                lootWindowCamp: null,
                
                lootable: [0,0,0,0,0,0,0,0],
                
                calcResources: function() {
                    try {
                        var selectedBase = cncloot.selectedBase;
                        
                        var lootable      = [0,0,0,0,0,0,0,0];

                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedBase);

                        var num             = city.m_CityBuildings.m_BuildSlotsCurrent;

                        // every building
                        for (var j=num; --j >= 0; ) {
                            var building = city.m_CityBuildings.m_Buildings.l[j];

                            //TODO: check for destroyed building
                            var mod = building.m_CurrentHealth / building.m_MaxHealth;

                            for(var i=building.m_UnitLevelRequirements.rer.length; --i >= 0;) {
                                lootable[building.m_UnitLevelRequirements.rer[i].t] += mod * building.m_UnitLevelRequirements.rer[i].c;
                            }
                        }

                        // every unit
                        if(city.m_CityUnits.m_DefenseUnits != null)  {
                            num             = city.m_CityUnits.m_DefenseUnits.l.length;
                            for (j=num; --j >= 0; ) {
                                var unit = city.m_CityUnits.m_DefenseUnits.l[j];

                                mod = unit.m_CurrentHealth / unit.m_MaxHealth;

                                for(i=unit.m_UnitLevelRequirements.rer.length; --i >= 0;) {
                                    lootable[unit.m_UnitLevelRequirements.rer[i].t] += mod * unit.m_UnitLevelRequirements.rer[i].c;
                                }
                                
                            }
                        }


                        cncloot.lootable = lootable;


                    } catch (e) {
                        console.log("cncloot [1]: ", e);
                    }
                },
                getTiberium: function() {
                    return cncloot.lootable[1];
                },
                getCrystal: function() {
                    return cncloot.lootable[2];
                },
                getCredits: function() {
                    return cncloot.lootable[3];
                },
                getResearch: function() {
                    return cncloot.lootable[6];
                },
                baseLoaded: function() {
                    if(
                            cncloot.lootable[1] > 0
                        ||  cncloot.lootable[2] > 0
                        ||  cncloot.lootable[3] > 0
                        ||  cncloot.lootable[6] > 0
                    ) {
                        return true;
                    }
                    return false;
                }
            };

            if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__cncloot_showLootNPCCamp) {
                webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__cncloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
            }
            if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__cncloot_showLootNPCBase) {
                webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__cncloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
            }
            if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__cncloot_showLootPlayerBase) {
                webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__cncloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
            }




            /* Wrap onCitiesChange for RegionNPCCampStatusInfo so we can inject our resource widget */
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function() {
                try {
                    cncloot.selectedBase = ClientLib.Data.MainData.s_MainData.m_Cities.m_CurrentCityId;

                    if(!cncloot.lootWindowCamp) {
                        cncloot.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5,5));
                        cncloot.lootWindowCamp.setTextColor("white");

                        var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
                        widget.add(cncloot.lootWindowCamp);
                    }

                    if(cncloot.baseLoaded()) {
                        cncloot.lastSelectedBase = cncloot.selectedBase;
                        cncloot.calcResources();
                        addResourcesLabel(cncloot.lootWindowCamp);
                    }
                    else {
                        cncloot.lastSelectedBase = -1;
                        cncloot.calcResources();
                        addLoadingLabel(cncloot.lootWindowCamp);
                    }

                } catch (e) {
                    console.log("cncloot.webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange(): ", e);
                }

                this.__cncloot_showLootNPCCamp();
            }

            /* Wrap onCitiesChange for RegionNPCBaseStatusInfo so we can inject our resource widget */
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function() {
                try {
                    cncloot.selectedBase = ClientLib.Data.MainData.s_MainData.m_Cities.m_CurrentCityId;

                    if(!cncloot.lootWindowBase) {
                        cncloot.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5,5));
                        cncloot.lootWindowBase.setTextColor("white");

                        var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
                        widget.add(cncloot.lootWindowBase);
                    }

                    if(cncloot.baseLoaded()) {
                        cncloot.lastSelectedBase = cncloot.selectedBase;
                        cncloot.calcResources();
                        addResourcesLabel(cncloot.lootWindowBase);
                    }
                    else {
                        cncloot.lastSelectedBase = -1;
                        cncloot.calcResources();
                        addLoadingLabel(cncloot.lootWindowBase);
                    }

                } catch (e) {
                    console.log("cncloot.webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange(): ", e);
                }

                this.__cncloot_showLootNPCBase();
            }

            /* Wrap onCitiesChange for RegionCityStatusInfoEnemy so we can inject our resource widget */
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function() {
                try {
                    cncloot.selectedBase = ClientLib.Data.MainData.s_MainData.m_Cities.m_CurrentCityId;

                    if(!cncloot.lootWindowPlayer) {
                        cncloot.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5,5));
                        cncloot.lootWindowPlayer.setTextColor("white");

                        var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
                        widget.add(cncloot.lootWindowPlayer);
                    }

                    if(cncloot.baseLoaded()) {
                        cncloot.lastSelectedBase = cncloot.selectedBase;
                        cncloot.calcResources();
                        addResourcesLabel(cncloot.lootWindowPlayer);
                    }
                    else {
                        cncloot.lastSelectedBase = -1;
                        cncloot.calcResources();
                        addLoadingLabel(cncloot.lootWindowPlayer);
                    }

                } catch (e) {
                    console.log("cncloot.webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange(): ", e);
                }

                this.__cncloot_showLootPlayerBase();
            }

            /** add the calculated resources to the info box */
            function addResourcesLabel(widget) {
                try {
                    widget.removeAll();
                    widget.add(lootLabel, {row: 0, column: 0, colSpan: 4});
                    widget.add(imgResearch, {row: 1, column: 0});
                    widget.add(new qx.ui.basic.Label(ClientLib.Base.Util.formatNumbersCompact$0(cncloot.getResearch())), {row: 1, column: 1});
                    widget.add(imgTiberium, {row: 1, column: 2});
                    widget.add(new qx.ui.basic.Label(ClientLib.Base.Util.formatNumbersCompact$0(cncloot.getTiberium())), {row: 1, column: 3});
                    widget.add(imgCrystal, {row: 1, column: 4});
                    widget.add(new qx.ui.basic.Label(ClientLib.Base.Util.formatNumbersCompact$0(cncloot.getCrystal())) , {row: 1, column: 5});
                    widget.add(imgCredits, {row: 1, column: 6});
                    widget.add(new qx.ui.basic.Label(ClientLib.Base.Util.formatNumbersCompact$0(cncloot.getCredits())) , {row: 1, column: 7});

                } catch (e) {
                    console.log("cncloot.addResourcesLabel(): ", e);
                }
            }

            /** add the loading labels to the info box */
            function addLoadingLabel(widget) {
                try {
                    widget.removeAll();
                    widget.add(lootLabel, {row: 0, column: 0});
                    widget.add(new qx.ui.basic.Label("Waiting for the game ..."), {row: 1, column: 0});
                } catch (e) {
                    console.log("cncloot.addLoadingLabel(): ", e);
                }
            }
        }


    


    /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
	function cnc_check_if_loaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				if (a) {
					cncloot_create();
				} else {
					window.setTimeout(cnc_check_if_loaded, 1000);
                                }
			} else {
				window.setTimeout(cnc_check_if_loaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}

	if (/commandandconquer\.com/i.test(document.domain))
		window.setTimeout(cnc_check_if_loaded, 1000);

    }

    // injecting because I can't seem to hook into the game interface via unsafeWindow
    var script_block = document.createElement("script");
    txt = cncloot_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(script_block);

}
)();
