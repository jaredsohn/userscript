// ==UserScript==
// @name Tiberium Alliances - DefensePlusPlus
// @description upgrade defense units for all bases
// @namespace DefensePlusPlus
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL       http://userscripts.org/scripts/source/172774.meta.js
// @downloadURL     http://userscripts.org/scripts/source/172774.user.js
// @version 1.0.3
// @author Andrey R
// ==/UserScript==

(function () {

    var DefensePlusPlus_main = function () {

        function DefensePlusPlus_Create(){

            function canUpgradeDefenceUnit(city, unit){
                if (unit.get_IsDamaged() || city.get_IsLocked()) return false;

                var nextLevel = unit.get_CurrentLevel() + 1;

                var gameDataTech = unit.get_UnitGameData_Obj();
                var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
                if (gameDataTech == null || !hasEnoughResources) return false;

                var techName = ClientLib.Base.ETechName.Defense_HQ;

                var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                if (building == null || building.get_CurrentDamage() > 0 || nextLevel > building.get_CurrentLevel()) return false;

                return true;
            }

            function doUpgradeDefenceUnits(){
                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                for (var nCity in cities){
                    var city = cities[nCity];

                    var units = city.get_CityUnitsData();
                    var defenceUnits = units.get_DefenseUnits();

                    var index;
                    var aUnits = [];

                    for (index in defenceUnits.d) {
                        aUnits.push(defenceUnits.d[index]);
                    }

                    aUnits.sort(function(unitA, unitB){
                        return unitA.get_CurrentLevel() - unitB.get_CurrentLevel()
                    });

                    for (index in aUnits) {
                        var unit = aUnits[index];

                        if (canUpgradeDefenceUnit(city, unit)){
                            var unit_obj = {
                                cityid: city.get_Id(),
                                unitId: unit.get_Id()
                            };
                            ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
                        }
                    }

                }
            }

            (function createInterface(){

                var button1 = new qx.ui.form.Button("defense++", null).set({
                    toolTipText: "DefensePlusPlus",
                    appearance: ("button-text-small"),
                    center: true,
                    height:50
                });

                button1.addListener("click", function (e) {
                    doUpgradeDefenceUnits();
                });


                var app = qx.core.Init.getApplication();
                app.getDesktop().add(button1, {
                    right: 200,
                    bottom: 100
                });

            })();

        }

        function DefensePlusPlus_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    DefensePlusPlus_Create();
                } else {
                    window.setTimeout(DefensePlusPlus_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("DefensePlusPlus_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(DefensePlusPlus_checkIfLoaded, 1000);
        }

    }


    try {
        var DefensePlusPlus = document.createElement("script");
        DefensePlusPlus.innerHTML = "(" + DefensePlusPlus_main.toString() + ")();";
        DefensePlusPlus.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(DefensePlusPlus);
        }
    } catch (e) {
        console.log("DefensePlusPlus: init error: ", e);
    }

})();