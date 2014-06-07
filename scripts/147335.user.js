// ==UserScript==
// @name        C&C - Tiberium Alliances Combat Simulator
// @namespace   http://userscripts.org/users/481406
// @description C&C Tiberium Alliances Combat Simulator
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     0.4
// @author      Deyhak | Contains code by Duarte, PythEch & KRS_L.
// @require     http://sizzlemctwizzle.com/updater.php?id=147335
// @grant       unsafeWindow
// @grant       GM_log
// ==/UserScript==
//Global Variables//
    var labels = {
        spoils: {
            tiberium: null,
            crystal: null,
            credits: null,
            research: null,
        },
        stats: {
            cTotal: null,
            cBuildings: null,
            cDefense: null,
            cCY: null,
            cDF: null,
            pTotal: null,
            pBuildings: null,
            pDefense: null,
            pCY: null,
            pDF: null,
            pBattleDuration: null,
            pOutcome: null,
        },
        repairs: {
            cTotal: null,
            cInfantry: null,
            cVehicles: null,
            cAir: null,
            pTotal: null,
            pInfantry: null,
            pVehicles: null,
            pAir: null,
        }
    }
    var buttons = {
        interface: {
            tools: null,
            simulate: null,
            formation: null,
        },
        options: {
            side: null,
            combatLock: null,
        },
    }
    
    var boxes = {
            options: null,
            tools: null,
            formation: null,
    }
        
        
//End Of Global Variables//
        
        
        
function initOptions(){
    console.log("Initiating Options");
    buttons.options.side = localStorage.getItem('btnSide'); //true - Right, false - Left
    buttons.options.combatLock = localStorage.getItem('isCombatLocked'); //true - Yes, false - No
    if (buttons.options.side == null) {
        buttons.options.side=true;
        localStorage.setItem('btnSide', true);
    }
    if (buttons.options.combatLock == null) {
        buttons.options.combatLock=true;
        localStorage.setItem('isCombatLocked', true);
    }
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
    var bs = stob(localStorage.getItem('btnSide'));
    var opBtn = new qx.ui.form.Button("O");
    if (bs) opBtn.set({ width: 30, 
               height: 30,
               toolTipText: "Addons Options"
              });
    else opBtn.set({ width: 76, 
               height: 30,
               toolTipText: "Addons Options"
              });
    boxes.options = new qx.ui.window.Window("Optons");
    opBtn.addListener("click", function(){
                     boxes.options.setPadding(1);
                     boxes.options.setLayout(new qx.ui.layout.VBox(1));
                     boxes.options.setShowMaximize(false);
                     boxes.options.setShowMinimize(false);
                     boxes.options.moveTo(125, 525);
                     boxes.options.setHeight(100);
                     boxes.options.setWidth(200);
                     if (boxes.options.isVisible()) {
                        boxes.options.close();
                        return;
                     }
                     else boxes.options.open();
    },this);
    if (bs) bas.add(opBtn, { left: null, right: 66, bottom: 80 });
    else bas.add(opBtn, { right: null, left: 6, bottom: 80 });
    
     var tabView = new qx.ui.tabview.TabView();
     tabView.setPadding(5);
     boxes.options.add(tabView);
     ////////////////// Buttons ////////////////////
     var btnTab = new qx.ui.tabview.Page("Buttons");
     btnTab.setLayout(new qx.ui.layout.VBox(5));
     btnTab.setPadding(1);
     ////////////////// Buttons Side ////////////////////
     var eHBox = new qx.ui.container.Composite()
     eHBox.setLayout(new qx.ui.layout.HBox(5));
     eHBox.setThemedFont("bold");
     eHBox.setThemedPadding(2);
     eHBox.setThemedBackgroundColor("#eef");
     eHBox.add(new qx.ui.basic.Label("Side: "));
     var leftBtn = new qx.ui.form.Button("L");
     var rightBtn = new qx.ui.form.Button("R");                                  
     leftBtn.set({ width: 20, 
                   appearance: "button-text-small",
                   toolTipText: "Moves Buttons To The Left"
              
                  });
     rightBtn.set({ width: 20, 
                    appearance: "button-text-small",
                    toolTipText: "Moves Buttons To The Right"
              
                  });
     leftBtn.addListener("click",function(){
                                    /////Options Button//////
                                    bas.remove(opBtn);
                                    opBtn.set({width:76});
                                    bas.add(opBtn, { right: null, left: 6, bottom: 80 });
                                    /////Tools Button//////
                                    bas.remove(buttons.interface.tools);
                                    buttons.interface.tools.set({width:76});
                                    bas.add(buttons.interface.tools, { right: null, left: 6, bottom: 42 });
                                    /////Simulate Button//////
                                    bas.remove(buttons.interface.simulate);
                                    buttons.interface.simulate.set({width:76});
                                    bas.add(buttons.interface.simulate, { right: null, left: 6, bottom: 4 });
                                    /////Shift Button//////
                                    bas.remove(buttons.interface.formation);
                                    buttons.interface.formation.set({width:76});
                                    bas.add(buttons.interface.formation, { right: null, left: 6, bottom: 118 });
                                    
         
                                    leftBtn.setOpacity(1);
                                    rightBtn.setOpacity(0.5);
                                    localStorage.setItem('btnSide', false);
                                },this);
     
     rightBtn.addListener("click",function(){
                                    /////Options Button//////
                                    bas.remove(opBtn);
                                    opBtn.set({width:30});
                                    bas.add(opBtn, { right: 66, left: null, bottom: 80 });
                                    /////Tools Button//////
                                    bas.remove(buttons.interface.tools);
                                    buttons.interface.tools.set({width:30});
                                    bas.add(buttons.interface.tools, { right: 66, left: null, bottom: 42 });
                                    /////Simulate Button//////
                                    bas.remove(buttons.interface.simulate);
                                    buttons.interface.simulate.set({width:30});
                                    bas.add(buttons.interface.simulate, { right: 66, left: null, bottom: 4 });
                                    /////Shift Button//////
                                    bas.remove(buttons.interface.formation);
                                    buttons.interface.formation.set({width:30});
                                    bas.add(buttons.interface.formation, { right: 66, left: null, bottom: 118 }); 
                                    
                                    rightBtn.setOpacity(1);         
                                    leftBtn.setOpacity(0.5);
                                    localStorage.setItem('btnSide', true);
                                },this);
    
     eHBox.add(leftBtn);
     eHBox.add(rightBtn);    
     btnTab.add(eHBox);
    if (bs) {
        leftBtn.setOpacity(0.5);
    }
    else {
        rightBtn.setOpacity(0.5);
    }
    
    
      ////////////////// Unlock Combat //////////////////// 
     var clHBox = new qx.ui.container.Composite()
     clHBox.setLayout(new qx.ui.layout.HBox(5));
     clHBox.setThemedFont("bold");
     clHBox.setThemedPadding(2);
     clHBox.setThemedBackgroundColor("#eef");
     clHBox.add(new qx.ui.basic.Label("Unlock: "));
     var cl = stob(localStorage.getItem('isCombatLocked'));
     var onBtn = new qx.ui.form.Button("On");
     var offBtn = new qx.ui.form.Button("Off");                                  
     onBtn.set({ width: 35, 
                   appearance: "button-text-small",
                   toolTipText: "Enables Combat Unlock Button"
                  });
     offBtn.set({ width: 35, 
                    appearance: "button-text-small",
                    toolTipText: "Disables Combat Unlock Button"
                    
                  });
    onBtn.addListener("click",function(){
        localStorage.setItem('isCombatLocked', true);
        onBtn.setOpacity(1);
        offBtn.setOpacity(0.5);
        alert("This action will only take place after restarting the game");        
    },this);
     
     offBtn.addListener("click",function(){
        localStorage.setItem('isCombatLocked', false);
        onBtn.setOpacity(0.5);
        offBtn.setOpacity(1);
        alert("This action will only take place after restarting the game");
     },this);
    
     clHBox.add(onBtn);
     clHBox.add(offBtn);    
     btnTab.add(clHBox);
     tabView.add(btnTab);
    if (cl) {
        offBtn.setOpacity(0.5);
    }
    else {
        onBtn.setOpacity(0.5);
    }  
    console.log("Options Initiation Completed");
}
                                        
function initSimulateBattle(){
    console.log("Initiating Simulator");
	qx = unsafeWindow["qx"];
	ClientLib = unsafeWindow["ClientLib"];
	
    var lock = false;
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	buttons.interface.simulate = new qx.ui.form.Button("S");
    var bs = stob(localStorage.getItem('btnSide'));
    
	if (bs) buttons.interface.simulate.set({ width: 30, 
                 height: 30,
                 toolTipText: "Simulates Combat"   
               });
    else buttons.interface.simulate.set({ width: 76, 
                 height: 30,
                 toolTipText: "Simulates Combat"   
               });
    
	buttons.interface.simulate.addListener("click", function(){
		if (lock)                 
            return;
		
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];
        var bs = stob(localStorage.getItem('btnSide'));
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();		
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
		lock = true;
        var cooldown = new qx.ui.form.Button("X");
        if (bs) {
            cooldown.set({ width: 30, height: 30});
            bas.add(cooldown, { left: null, right: 66, bottom: 4 });
        }
        else{
            
            cooldown.set({ width: 76, height: 30});
            bas.add(cooldown, { right: null, left: 6, bottom: 4 });
        }
            setTimeout(function(){
                lock = false;
                bas.remove(cooldown);
		}, 10000)
	}, this)
        if (bs) bas.add(buttons.interface.simulate, { left:null, right: 66, bottom: 4 });
        else bas.add(buttons.interface.simulate, { right: null, left: 6, bottom: 4 });
    console.log("Simulator Initiation Completed");
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
function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
        
    
function initTools(){
    console.log("Tools Initiating");
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
    var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
    var bs = stob(localStorage.getItem('btnSide'));
    buttons.interface.tools = new qx.ui.form.Button("T");
    if (bs) buttons.interface.tools.set({
                width: 30, height: 30,
                appearance: "button-text-small",
                toolTipText: "Open Simulator Tools"
             });
    else buttons.interface.tools.set({
                width: 76, height: 30,
                appearance: "button-text-small",
                toolTipText: "Open Simulator Tools"
             });
     boxes.tools = new qx.ui.window.Window("Tools");
     buttons.interface.tools.addListener("click", function() {
                     try{
                         boxes.tools.setPadding(1);
                         boxes.tools.setLayout(new qx.ui.layout.VBox(1));
                         boxes.tools.setShowMaximize(false);
                         boxes.tools.setShowMinimize(false);
                         boxes.tools.moveTo(125, 125);
                         boxes.tools.setHeight(300);
                         boxes.tools.setWidth(200);
                         if (boxes.tools.isVisible()) {
                            boxes.tools.close();
                            return;
                         }
                         else boxes.tools.open();
                         if (!unitMovedFlag) initUnitMoved();
                         var curCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();         
                         var targetHP = curCity.GetFullConditionInPercent(); 
                         var targetBuilding = curCity.GetBuildingsConditionInPercent();
                         var targetDefense = curCity.GetDefenseConditionInPercent();
                         var CYHP = (curCity.get_CityBuildingsData().GetBuildingByMDBId(58).get_HitpointsPercent()) * 100;
                         var DFHP = (curCity.get_CityBuildingsData().GetBuildingByMDBId(74).get_HitpointsPercent()) * 100;
                         var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                         battleground.SimulateBattle(); 
                         setTimeout(function() {
                             var battleDuration = battleground.get_BattleDuration ()/1000;
                             labels.stats.pBattleDuration.setValue(""+ battleDuration); 
                             
                         }, 1000);
                         labels.stats.cTotal.setValue(""+targetHP);
                         labels.stats.cDefense.setValue(""+targetDefense);
                         labels.stats.cBuildings.setValue(""+targetBuilding);
                         labels.stats.cCY.setValue(""+CYHP.toFixed(2));
                         labels.stats.cDF.setValue(""+DFHP.toFixed(2));
                     }
                     catch(e){
                         console.warn(e);
                     }
    }, this);
    
    if (bs) armyBar.add(buttons.interface.tools, {bottom: 42, right: 66, left: null});
    else armyBar.add(buttons.interface.tools, {bottom: 42, right: null, left: 6});
     var tabView = new qx.ui.tabview.TabView();
     tabView.setPadding(5);
     boxes.tools.add(tabView);
     ////////////////// Stats ////////////////////
     var statsPage = new qx.ui.tabview.Page("Stats");
     statsPage.setLayout(new qx.ui.layout.VBox(5));
     statsPage.setPadding(1);
     tabView.add(statsPage);
        // The Enemy Vertical Box
     var eVBox = new qx.ui.container.Composite()
     eVBox.setLayout(new qx.ui.layout.VBox(5));
     eVBox.setThemedFont("bold");
     eVBox.setThemedPadding(2);
     eVBox.setThemedBackgroundColor("#eef");
     statsPage.add(eVBox);
    // Description Label
     var eHBox0 = new qx.ui.container.Composite();
     eHBox0.setLayout(new qx.ui.layout.HBox(5));
     eHBox0.add(new qx.ui.basic.Label("Current Stats"));
     eHBox0.setMarginLeft(40);
     eVBox.add(eHBox0)
    // The Enemy Troop Strength Label
     var eHBox1 = new qx.ui.container.Composite();
     eHBox1.setLayout(new qx.ui.layout.HBox(5));
     eHBox1.add(new qx.ui.basic.Label("Base: "));
     labels.stats.cTotal = new qx.ui.basic.Label("Undefined");
     eHBox1.add(labels.stats.cTotal);
     labels.stats.cTotal.setTextColor("black");
     eVBox.add(eHBox1);
     // Units
     var eHBox4 = new qx.ui.container.Composite();
     eHBox4.setLayout(new qx.ui.layout.HBox(5));
     eHBox4.add(new qx.ui.basic.Label("Defences: "));
     labels.stats.cDefense = new qx.ui.basic.Label("Undefined");
     eHBox4.add(labels.stats.cDefense);
     labels.stats.cDefense.setTextColor("black");
     eVBox.add(eHBox4);
     // Buildings
     var eHBox5 = new qx.ui.container.Composite();
     eHBox5.setLayout(new qx.ui.layout.HBox(5));
     eHBox5.add(new qx.ui.basic.Label("Buildings: "));
     labels.stats.cBuildings = new qx.ui.basic.Label("Undefined");
     eHBox5.add(labels.stats.cBuildings);
     labels.stats.cBuildings.setTextColor("black");
     eVBox.add(eHBox5);
     // Command Center
     var eHBox2 = new qx.ui.container.Composite();
     eHBox2.setLayout(new qx.ui.layout.HBox(5));
     eHBox2.add(new qx.ui.basic.Label("Construction Yard: "));
     labels.stats.cCY = new qx.ui.basic.Label("Undefined");
     eHBox2.add(labels.stats.cCY);
     labels.stats.cCY.setTextColor("black");
     eVBox.add(eHBox2);
     // Defense Facility
     var eHBox3 = new qx.ui.container.Composite();
     eHBox3.setLayout(new qx.ui.layout.HBox(5));
     eHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
     labels.stats.cDF = new qx.ui.basic.Label("Undefined");
     eHBox3.add(labels.stats.cDF);
     labels.stats.cDF.setTextColor("black");
     eVBox.add(eHBox3);
    
        // The Enemy Vertical Box
     var pVBox = new qx.ui.container.Composite()
     pVBox.setLayout(new qx.ui.layout.VBox(5));
     pVBox.setThemedFont("bold");
     pVBox.setThemedPadding(2);
     pVBox.setThemedBackgroundColor("#eef");
     statsPage.add(pVBox);
    // Description Label
     var pHBox0 = new qx.ui.container.Composite();
     pHBox0.setLayout(new qx.ui.layout.HBox(5));
     pHBox0.add(new qx.ui.basic.Label("Predicted Stats"));
     pHBox0.setMarginLeft(40);
     pVBox.add(pHBox0)
    // The Enemy Troop Strength Label
     var pHBox1 = new qx.ui.container.Composite();
     pHBox1.setLayout(new qx.ui.layout.HBox(5));
     pHBox1.add(new qx.ui.basic.Label("Base: "));
     labels.stats.pTotal = new qx.ui.basic.Label("Undefined");
     pHBox1.add(labels.stats.pTotal);
     labels.stats.pTotal.setTextColor("black");
     pVBox.add(pHBox1);
     // Units
     var pHBox4 = new qx.ui.container.Composite();
     pHBox4.setLayout(new qx.ui.layout.HBox(5));
     pHBox4.add(new qx.ui.basic.Label("Defences: "));
     labels.stats.pDefense = new qx.ui.basic.Label("Undefined");
     pHBox4.add(labels.stats.pDefense);
     labels.stats.pDefense.setTextColor("black");
     pVBox.add(pHBox4);
     // Buildings
     var pHBox5 = new qx.ui.container.Composite();
     pHBox5.setLayout(new qx.ui.layout.HBox(5));
     pHBox5.add(new qx.ui.basic.Label("Buildings: "));
     labels.stats.pBuildings = new qx.ui.basic.Label("Undefined");
     pHBox5.add(labels.stats.pBuildings);
     labels.stats.pBuildings.setTextColor("black");
     pVBox.add(pHBox5);
     // Command Center
     var pHBox2 = new qx.ui.container.Composite();
     pHBox2.setLayout(new qx.ui.layout.HBox(5));
     pHBox2.add(new qx.ui.basic.Label("Construction Yard: "));
     labels.stats.pCY = new qx.ui.basic.Label("Undefined");
     pHBox2.add(labels.stats.pCY);
     labels.stats.pCY.setTextColor("black");
     pVBox.add(pHBox2);
     // Defense Facility
     var pHBox3 = new qx.ui.container.Composite();
     pHBox3.setLayout(new qx.ui.layout.HBox(5));
     pHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
     labels.stats.pDF = new qx.ui.basic.Label("Undefined");
     pHBox3.add(labels.stats.pDF);
     labels.stats.pDF.setTextColor("black");
     pVBox.add(pHBox3);
    
    
    
    
     // The Troops Vertical Box
     var tVBox = new qx.ui.container.Composite()
     tVBox.setLayout(new qx.ui.layout.VBox(5));
     tVBox.setThemedFont("bold");
     tVBox.setThemedPadding(2);
     tVBox.setThemedBackgroundColor("#eef");
     statsPage.add(tVBox);
     // The Repair Time Label
     var tHBox1 = new qx.ui.container.Composite();
     tHBox1.setLayout(new qx.ui.layout.HBox(5));
     tHBox1.add(new qx.ui.basic.Label("Repair Time: "));
     var simRepairTimeLabel = new qx.ui.basic.Label("Undefined");
     tHBox1.add(simRepairTimeLabel);
     simRepairTimeLabel.setTextColor("black");
     tVBox.add(tHBox1);
     // The Troop Strength Label
     var tHBox5 = new qx.ui.container.Composite();
     tHBox5.setLayout(new qx.ui.layout.HBox(5));
     tHBox5.add(new qx.ui.basic.Label("Overall: "));
     labels.repairs.pTotal = new qx.ui.basic.Label("Undefined");
     tHBox5.add(labels.repairs.pTotal);
     labels.repairs.pTotal.setTextColor("black");
     tVBox.add(tHBox5);
     // The Infantry Troop Strength Label
     var tHBox2 = new qx.ui.container.Composite();
     tHBox2.setLayout(new qx.ui.layout.HBox(5));
     tHBox2.add(new qx.ui.basic.Label("Infantry: "));
     labels.repairs.pInfantry = new qx.ui.basic.Label("Undefined");
     tHBox2.add(labels.repairs.pInfantry);
     labels.repairs.pInfantry.setTextColor("black");
     tVBox.add(tHBox2);
     // The Vehicle Troop Strength Label
     var tHBox3 = new qx.ui.container.Composite();
     tHBox3.setLayout(new qx.ui.layout.HBox(5));
     tHBox3.add(new qx.ui.basic.Label("Vehicle: "));
     labels.repairs.pVehicles = new qx.ui.basic.Label("Undefined");
     tHBox3.add(labels.repairs.pVehicles);
     labels.repairs.pVehicles.setTextColor("black");
     tVBox.add(tHBox3);
     // The Air Troop Strength Label
     var tHBox4 = new qx.ui.container.Composite();
     tHBox4.setLayout(new qx.ui.layout.HBox(5));
     tHBox4.add(new qx.ui.basic.Label("Aircraft: "));
     labels.repairs.pAir = new qx.ui.basic.Label("Undefined");
     tHBox4.add(labels.repairs.pAir);
     labels.repairs.pAir.setTextColor("black");
     tVBox.add(tHBox4);
     // The inner Vertical Box
     var vBox = new qx.ui.container.Composite()
     vBox.setLayout(new qx.ui.layout.VBox(5));
     vBox.setThemedFont("bold");
     vBox.setThemedPadding(2);
     vBox.setThemedBackgroundColor("#eef");
     // The Victory Label
     var hBox2 = new qx.ui.container.Composite()
     hBox2.setLayout(new qx.ui.layout.HBox(5));
     hBox2.add(new qx.ui.basic.Label("Outcome: "));
     labels.stats.pOutcome = new qx.ui.basic.Label("Unknown");
     hBox2.add(labels.stats.pOutcome);
     labels.stats.pOutcome.setTextColor("black");
     vBox.add(hBox2);
     // The Battle Time Label
     var hBox1 = new qx.ui.container.Composite()
     hBox1.setLayout(new qx.ui.layout.HBox(5));
     hBox1.add(new qx.ui.basic.Label("Predicted Battle Time: "));
     labels.stats.pBattleDuration = new qx.ui.basic.Label("Undefined");
     hBox1.add(labels.stats.pBattleDuration);
     labels.stats.pBattleDuration.setTextColor("black");
     vBox.add(hBox1);
     statsPage.add(vBox);
  
     ////////////////// Info ////////////////////
     var infoPage = new qx.ui.tabview.Page("Info");
     infoPage.setLayout(new qx.ui.layout.VBox(5));
     tabView.add(infoPage);
     // The Help Vertical Box
     var pVBox = new qx.ui.container.Composite()
     pVBox.setLayout(new qx.ui.layout.VBox(5));
     pVBox.setThemedFont("bold");
     pVBox.setThemedPadding(2);
     pVBox.setThemedBackgroundColor("#eef");
     infoPage.add(pVBox);
     var proHelpBar = new qx.ui.basic.Label().set({
        value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/147335'>Forums</a>",
        rich: true
     });
     pVBox.add(proHelpBar);
     // The Spoils
     var psVBox = new qx.ui.container.Composite()
     psVBox.setLayout(new qx.ui.layout.VBox(5));
     psVBox.setThemedFont("bold");
     psVBox.setThemedPadding(2);
     psVBox.setThemedBackgroundColor("#eef");
     infoPage.add(psVBox);
     psVBox.add(new qx.ui.basic.Label("Spoils"));
     // Tiberium
     labels.spoils.tiberium = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
     psVBox.add(labels.spoils.tiberium);
     // Crystal
     labels.spoils.crystal = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
     psVBox.add(labels.spoils.crystal);
     // Credits
     labels.spoils.credits = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
     psVBox.add(labels.spoils.credits);
     // Research
     labels.spoils.research = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
     psVBox.add(labels.spoils.research);
     boxes.tools.add(tabView);
    console.log("Tools Initiation Completed");
}
function initFormationShiftKeys(){
    console.log("Formation Manager Initiating");  
    var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
    var bs = stob(localStorage.getItem('btnSide'));
    buttons.interface.formation = new qx.ui.form.Button("F");
    if (bs) buttons.interface.formation.set({ width: 30, 
               height: 30,
               toolTipText: "Shift Formation"
                });
    else buttons.interface.formation.set({ width: 76, 
               height: 30,
               toolTipText: "Shift Formation"
                });
    boxes.formation = new qx.ui.window.Window("Shift Formation");
    buttons.interface.formation.addListener("click", function(){
                     boxes.formation.setPadding(1);
                     boxes.formation.setLayout(new qx.ui.layout.VBox(1));
                     boxes.formation.setShowMaximize(false);
                     boxes.formation.setShowMinimize(false);
                     boxes.formation.moveTo(325, 525);
                     boxes.formation.setHeight(100);
                     boxes.formation.setWidth(200);
                     if (boxes.formation.isVisible()) {
                        boxes.formation.close();
                        return;
                     }
                     else boxes.formation.open();
    },this);
    if (bs) bas.add(buttons.interface.formation, { left: null, right: 66, bottom: 118 }); 
    else bas.add(buttons.interface.formation, { right: null, left: 6, bottom: 118 }); 
    
	 var shiftTab = new qx.ui.tabview.Page("Shift");
     shiftTab.setLayout(new qx.ui.layout.VBox(5));
    
	var arrows = {};
	arrows.ShiftFormationLeft = new qx.ui.form.Button("←");
	arrows.ShiftFormationLeft.set(
	{
		width: 85,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Left"
	});
	arrows.ShiftFormationLeft.addListener("click", function(){shiftFormation('l');}, this);
	
	arrows.ShiftFormationRight = new qx.ui.form.Button("→");
	arrows.ShiftFormationRight.set(
	{
		width: 85,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Right"
	});
	arrows.ShiftFormationRight.addListener("click", function(){shiftFormation('r');}, this);    
    
	
	arrows.ShiftFormationUp = new qx.ui.form.Button("↑");
	arrows.ShiftFormationUp.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Up"
	});
	arrows.ShiftFormationUp.addListener("click", function(){shiftFormation('u');}, this);
    
	
	arrows.ShiftFormationDown = new qx.ui.form.Button("↓");
	arrows.ShiftFormationDown.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Down"
	});
	arrows.ShiftFormationDown.addListener("click", function(){shiftFormation('d');}, this);
    
	var shiftHBox = new qx.ui.container.Composite()
    shiftHBox.setLayout(new qx.ui.layout.HBox(5));         
	shiftTab.add(arrows.ShiftFormationUp);
	shiftHBox.add(arrows.ShiftFormationLeft);
	shiftHBox.add(arrows.ShiftFormationRight);
    shiftTab.add(shiftHBox);
	shiftTab.add(arrows.ShiftFormationDown);
    
    boxes.formation.add(shiftTab);
    //End of Shift Keys
    
    console.log("Formation Manager Initiation Completed");
}
function getBuildingsList(){
    var curCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
    for (var k in curCity.get_CityBuildingsData()){
        o = curCity.get_CityBuildingsData()[k];
        if (o === null) continue;
        if (typeof(o.l) == 'undefined') continue;
        if (o.l.length === 0) continue;
        var buildings = o;
    }
    return buildings.l;
}
function getEntities(){
    var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
    for (var k in battleground){
        o = battleground[k];
        if (o === null) continue;
        if (typeof(o.d) == 'undefined') continue;
        if (o.c == 0) continue;
        var entities = o;
        break;
    }
    return entities.d;
}
function getCityPreArmyUnits() {
	ClientLib = unsafeWindow["ClientLib"];
	var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
	var formationManager = ownCity.get_CityArmyFormationsManager();
	return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
}
function restoreFormation(saved_units) {
	var sUnits = saved_units;
	var units = getCityPreArmyUnits();
	var units_list = units.get_ArmyUnits().l;
	for (var idx = 0; idx < sUnits.length; idx++) {
		var saved_unit = sUnits[idx];
		var uid = saved_unit.id;
		for (var i = 0;
		(i < units_list.length); i++) {
			if (units_list[i].get_Id() === uid) {
				units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
				if (saved_unit.enabled === undefined) units_list[i].set_Enabled(true);
				else units_list[i].set_Enabled(saved_unit.enabled);
			}
		}
	}
	units.UpdateFormation(true); //this works and USES the API so works for both servers
}
function shiftFormation(direction) { //left right up down
	
	if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");
	
	if (direction == "up" || direction == "u") var v_shift = -1;
	if (direction == "down" || direction == "d") var v_shift = 1;
	if (direction == "left" || direction == "l") var h_shift = -1;
	if (direction == "right" || direction == "r") var h_shift = 1;
	
	if (!v_shift) var v_shift = 0;
	if (!h_shift) var h_shift = 0;
	
	units = getCityPreArmyUnits().get_ArmyUnits().l;
	var Army = [];
	//read army, consider use saveFormation(?)
	for (var i = 0;	(i < this.units.length); i++) {
		var unit = this.units[i];
		var armyUnit = {};
		var x = unit.get_CoordX() + h_shift;
		switch (x) {
			case 9:
			x = 0;
			break;
			case -1:
			x = 8;
			break;
		}
		var y = unit.get_CoordY() + v_shift;
		switch (y) {
			case 4:
			y = 0;
			break;
			case -1:
			y = 3;
			break;
		}
		armyUnit.x = x;
		armyUnit.y = y;
		armyUnit.id = unit.get_Id();
		armyUnit.enabled = unit.get_Enabled();
		Army.push(armyUnit);
	}
	restoreFormation(Army);
    onUnitMoved();
}
function onViewChange(oldMode, newMode) {
     if (boxes.tools.isVisible()) boxes.tools.close();
     if (boxes.options.isVisible()) boxes.options.close();
     if (boxes.formation.isVisible()) boxes.formation.close();
     if (unitMovedFlag){
     unitMovedFlag = false;
     CityPreArmyUnits.remove_ArmyChanged(add_UnitMoved);
    }
}
function onUnitMoved(sender, e) {
        console.log("Moved Unit");
}
    
    
function initViewChange(){
    try{
    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this ,onViewChange);
    }
    catch(e){
        console.warn(e);
    }
}
var unitMovedFlag = false;
var add_UnitMoved = null;
var CityPreArmyUnits = null;
function initUnitMoved(){
    try{
     _this = this;
     CityPreArmyUnits = getCityPreArmyUnits();
     add_UnitMoved = new ClientLib.Data.CityPreArmyUnitsChanged();
     add_UnitMoved.i=[{o:_this,f:onUnitMoved}];
     CityPreArmyUnits.add_ArmyChanged(add_UnitMoved);  
     unitMovedFlag = true;
    }
    catch(e){
        console.warn(e);
    }
    
}
function initOnSimulateFinished(){
    try{        
        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Battleground(), "OnSimulateBattleFinished", ClientLib.Vis.Battleground.OnSimulateBattleFinished, this, OnSimulateBattleFinished);
    }
    catch(e){
        console.warn(e);
    }
}
function OnSimulateBattleFinished(data){
    var total_h=0, end_h=0, healthPercent=0; //Total defender's health
    var buildingsTotal_h=0, buildingsEnd_h=0, buildingsPercent=0; //Buildings health
    var defenseTotal_h=0, defenseEnd_h=0, defensePercent=0; //Defense health
    var cyTotal_h=0, cyEnd_h=0, cyPercent=0; // Counstruction Yard health
    var dfTotal_h=0, dfEnd_h=0, dfPercent=0; // Defense Facility health
    var offenseTotal_h=0, offenseEnd_h=0; // Offense health
    var infTotal_h=0, infEnd_h=0, infRepair=0; // Infantry health
    var vehiTotal_h=0, vehiEnd_h=0, vehiRepair=0; // Vehicles health
    var airTotal_h=0, airEnd_h=0, airRepair=0; // Air health
    var unit;
    var uniqueName;
    var placementType;
    try {
        for (var i = 0; i < data.length; i++){ 
            var unitData = data[i].Value;
            var unitMDBID = unitData.t;
            var unitLevel = unitData.l;
            unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
            uniqueName = unit.dn;
            placementType = unit.pt;
            var unitStartHealth = unitData.sh / 16;
            var UnitEndHealth = unitData.h / 16;
            if (unitStartHealth != UnitEndHealth) {
                var damageRatio = 1;
                if (UnitEndHealth > 0)
                {
                    damageRatio =  (unitStartHealth - (UnitEndHealth/16)) / unitStartHealth;
                }
                    
                var repairCosts = ClientLib.API.Util.GetUnitRepairCosts(unitLevel, unitMDBID, damageRatio);
                var crystal = 0;
                for (var j = 0; j < repairCosts.length; j++)
                {
                    var c = repairCosts[j];
                    var type = parseInt(c.Type);
                    switch (type)
                    {
                        case ClientLib.Base.EResourceType.Crystal:
                            crystal += c.Count;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeBase:
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeInf:
                            infRepair += c.Count;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeVeh:
                            vehiRepair += c.Count;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeAir:
                            airRepair += c.Count;
                            break;
                    }
                }
            var maxRepair = Math.max(infRepair,vehiRepair,airRepair);
            }                                
                        
            switch (uniqueName) {
                case ("Defense Facility"):
                    dfTotal_h += unitData.sh;
                    dfEnd_h += unitData.h;  
                    break;
                case ("Construction Yard"):
                    cyTotal_h += unitData.sh;
                    cyEnd_h += unitData.h;  
                    break;  
            }
                
            switch (placementType) {
                case ClientLib.Base.EPlacementType.Defense:
                total_h += unitData.sh;
                end_h += unitData.h;
                defenseTotal_h += unitData.sh;
                defenseEnd_h += unitData.h;  
                break;
                        
                case ClientLib.Base.EPlacementType.Offense:
                    offenseTotal_h += unitData.sh;
                    offenseEnd_h += unitData.h;
                    var movementType = unit.mt;
                    switch (movementType) {
                        case ClientLib.Base.EUnitMovementType.Feet:
                            infTotal_h += unitData.sh;
                            infEnd_h += unitData.h;
                        break;
                            
                        case ClientLib.Base.EUnitMovementType.Wheel:
                        case ClientLib.Base.EUnitMovementType.Track:
                            vehiTotal_h += unitData.sh;
                            vehiEnd_h += unitData.h;
                        break;
                            
                        case ClientLib.Base.EUnitMovementType.Air:
                        case ClientLib.Base.EUnitMovementType.Air2:
                            airTotal_h += unitData.sh;
                            airEnd_h += unitData.h;
                        break;
                    }
                break;
                        
                case ClientLib.Base.EPlacementType.Structure:
                total_h += unitData.sh;
                end_h += unitData.h;  
                buildingsTotal_h += unitData.sh;
                buildingsEnd_h += unitData.h;      
                break;
            }
            
            //logObject(unit);
            
        }
        healthPercent = (end_h / total_h) * 100;
        defensePercent = (defenseEnd_h / defenseTotal_h) *100;
        buildingsPercent = (buildingsEnd_h / buildingsTotal_h) *100;
        cyPercent = (cyEnd_h / cyTotal_h) *100;
        dfPercent = (dfEnd_h / dfTotal_h) * 100;
         
        labels.stats.pTotal.setValue("" + healthPercent.toFixed(2));
        labels.stats.pDefense.setValue("" + defensePercent.toFixed(2));
        labels.stats.pBuildings.setValue("" + buildingsPercent.toFixed(2));
        labels.stats.pCY.setValue("" + cyPercent.toFixed(2));
        labels.stats.pDF.setValue("" + dfPercent.toFixed(2));
        labels.repairs.pTotal.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(maxRepair)));
        labels.repairs.pInfantry.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRepair)));
        labels.repairs.pVehicles.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRepair)));
        labels.repairs.pAir.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRepair)));
        
        if (cyEnd_h < 0.01) {
            labels.stats.pOutcome.setValue("Total Victory");
            labels.stats.pOutcome.setTextColor("blue");
        }
        else if (offenseEnd_h < 0.01) {
            labels.stats.pOutcome.setValue("Total Defeat");
            labels.stats.pOutcome.setTextColor("red");
        }
        else {
            labels.stats.pOutcome.setValue("Unknown");
            labels.stats.pOutcome.setTextColor("black");
        }
    }
    catch(e){
        console.warn(e);
    }
}
function stob(string){
        switch(string.toLowerCase()){
                case "true": case "yes": case "1": return true;
                case "false": case "no": case "0": case null: return false;
                default: return Boolean(string);
        }
}
function logObject(obj){
    var output = '';
    for (property in obj) {
      output += property + ': ' + obj[property]+';\n\n ';
    }
    console.log(obj + "\n" + output);   
}
//Main//
function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    phe = unsafeWindow["phe"];
	
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(waitForClientLib, 1000);
			return;
		}
        initOptions();
		initSimulateBattle();
        initReturnSetup();
        initTools();
        initViewChange();
        initFormationShiftKeys();
        initOnSimulateFinished();
        if (stob(localStorage.getItem('isCombatLocked'))) initUnlockCombat();
}
function startup(){
    
	setTimeout(waitForClientLib, 1000);
};
startup();
//End Of Main//