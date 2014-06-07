// ==UserScript==
// @name        Tiberium Alliances C&C - simple Combat simulation
// @description Allows you to simulate combat before actually attacking. For details see http://forum.alliances.commandandconquer.com/archive/index.php/thread-16694.html
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @copyright  2012+, s1812
// @version     0.2
// @author      s1812
// @license        GNU GPL v3
// ==/UserScript==
var lock = false;
function OnSimulateBattleFinished(data)
{
    for (var i = 0; i < data.length; i++)
    {
       var combatId = data[i].Key;
       var unitData = data[i].Value;
       
       var unitMDBID = unitData.t;
       var unitLevel = unitData.l;
       var unitStartHealth = unitData.sh;
       var unitEndHealth = unitData.h;
       
       var repairCosts = ClientLib.API.Util.GetUnitRepairCosts(unitLevel, unitMDBID, unitStartHealth / unitEndHealth);
    }
}
function initCombatSimulation()
{
	qx = unsafeWindow["qx"];
	ClientLib = unsafeWindow["ClientLib"];
	
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	var btn = new qx.ui.form.Button("Simul");
	
	btn.set({ width: 64, height: 26});
	btn.addListener("click", function(){
		if (lock) return;
		
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];
		//phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(),"OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished,this, this.OnSimulateBattleFinished);
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		var app = qx.core.Init.getApplication();
		app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,city.get_Id(), 0, 0);
		lock = true;
		setTimeout(function(){
			lock = false;
		}, 11000)
	}, this)
	bas.add(btn, { left: 12, top: 12 });
}
function initReturnSetup(){
    
        qx = unsafeWindow["qx"];
        var buttonReturnSetup = new qx.ui.form.Button("Setup");
                     buttonReturnSetup.set({
                        width: 80,
                        appearance: "button-text-small",
                        toolTipText: "Return to Combat Setup"
                     });
                     buttonReturnSetup.addListener("click", function() {
                     // Set the scene again, just in case it didn't work the first time
                     var app = qx.core.Init.getApplication();
                     var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                     var current_city = player_cities.get_CurrentCity();
                     try {
                        app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, current_city.get_Id(), 0, 0);
                     } catch (e) {
                        app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, current_city.get_Id(), 0, 0);
                     }
                  } , this);
    
        var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(buttonReturnSetup, {
                        top: 10,
                        left: 0
                     });
}
function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
    
        if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
        {
            setTimeout(waitForClientLib, 1000);
            return;
        }
    initCombatSimulation();
    initReturnSetup();
}
function startup(){
    
    setTimeout(waitForClientLib, 1000);
};
startup();