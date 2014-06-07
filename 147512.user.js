// ==UserScript==
// @name        PvPTASript
// @namespace   cnca
// @description Information see: http://forum.alliances.commandandconquer.com/showthread.php?tid=11359&pid=75107#pid75107
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     1.1
// @grant MetaData
// ==/UserScript==

var lock = false;

function initSimulateBattle()
{
	qx = unsafeWindow["qx"];
	ClientLib = unsafeWindow["ClientLib"];
	
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	var btn = new qx.ui.form.Button("Sim");
	
	btn.set({ width: 64, height: 26});
	btn.addListener("click", function(){
		if (lock) return;
		
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];

		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();
		
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		
		app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);

		lock = true;

		setTimeout(function(){
			lock = false;
		}, 11000)
	}, this)
	bas.add(btn, { left: 12, top: 12 });
}

function waitForClientLib()
{
		ClientLib = unsafeWindow["ClientLib"];
		qx = unsafeWindow["qx"];
	
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(waitForClientLib, 1000);
			return;
		}
		initSimulateBattle();
};

function initReturnSetup()
{
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
                        app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, current_city.get_Id(), 0, 0);
                     } catch (e) {
                        app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, current_city.get_Id(), 0, 0);
                     }
                  } , this);
    
        var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(buttonReturnSetup, {
                        top: 10,
                        left: 0
                     });
}

function initUnlockCombat()
{
             var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);

                     var buttonUnlockAttack = new qx.ui.form.Button("X");
                     buttonUnlockAttack.set({
                        width: 44,
                        height: 45,
                        appearance: "button-text-small",
                        toolTipText: "Unlocks Combat"
                     });
                     buttonUnlockAttack.setThemedFont("bold");
                     buttonUnlockAttack.addListener("click",function() {
                     var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                     armyBar.remove(buttonUnlockAttack);
                     setTimeout(function() {
                        armyBar.add(buttonUnlockAttack);}, 2000);
                  } , this);
                     armyBar.add(buttonUnlockAttack, {
                        bottom: 7,
                        right: 10
                     });
      
}

function startup()
{
	setTimeout(waitForClientLib, 1000);
};

startup();
