// ==UserScript==
// @name           	Tiberium Alliances Combat Simulator 2.2
// @description    	Allows you to simulate combat before actually attacking. Should work with latest December Patches.
// @namespace      	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        	2.1
// @downloadURL    	http://userscripts.org/scripts/source/154546.user.js
// @grant 			none
// @author         	Quor | WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, Peluski17
// ==/UserScript==
//Update 2.0 - Peluski17 - I have updated this one to be more compliant with EA API standards. The only thing I have not gotten to work correctly or at all is the 
//stat information box. I have also added as many useful comments as possible to help others out. I greatly dislike not having comments to understand
//the code. I take no credit in writing most of the code which these developers before me have done. My intent is to update the code to be more compliant
//with EA API standards and to remove the dependency on the wrapper. I have gone ahead and updated the version number to 2.0. Please be aware that the code
//in this script has been written by the other developers, but I have rearranged it to my liking. 

//Update 2.0.1 - Peluski17 - Special thanks to MrHIDEn and the way he calculates loot in his MHTools script. Was of great value! In this version
//Simulation stats are not yet currently implemented. I'm having a difficult time grabbing the simulation data. The new feature here is both the reemergence
//of the tools window and the resource calculation so you know how much loot is in the base.
//stats array that holds other arrays that store values used to show on screen in the tools menu

//Update 2.1 - Peluski17 - Statistics Working. Still haven't figured out how to calculate the battle time, but everything else is a go. Enjoy

//Update 2.1.1 - Peluski17 - Added Battle Duration time to the stats

var stats = {
	spoils: {
		tiberium: null, // tiberiumSpoils
		crystal: null, // crystalSpoils
		credit: null, // creditSpoils
		research: null // researchSpoils
	},
	health: {
		infantry: null, // lastInfantryPercentage
		vehicle: null, // lastVehiclePercentage
		aircraft: null, // lastAirPercentage
		overall: null, // lastPercentage
	},
	repair: {
		infantry: null, // lastInfantryRepairTime
		vehicle: null, // lastVehicleRepairTime
		aircraft: null, // lastAircraftRepairTime
		overall: null, // lastRepairTime
        crystals: null
	},
	damage: {
		units: {
			overall: null // lastEnemyUnitsPercentage
		},
		structures: {
			construction: null, // lastCYPercentage
			defense: null, // lastDFPercentage
			command: null, // lastCCPercentage
			overall: null // lastEnemyBuildingsPercentage
		},
		overall: null // lastEnemyPercentage
	},
	time: null,
    supportlvl: null
}
//Array that holds other arrays. Labels used in displaying information in the tool window.
var labels = {
	health: {
		infantry: null, // infantryTroopStrengthLabel
		vehicle: null, // vehicleTroopStrengthLabel
		aircraft: null, // airTroopStrengthLabel
		overall: null // simTroopDamageLabel
	},
	damage: {
		units: {
			infantry: null, // infantryTroopStrengthLabel
			vehicle: null, // vehicleTroopStrengthLabel
			structure: null, // structureTroopStrengthLabel
			overall: null // enemyUnitsStrengthLabel
		},
		structures: {
			construction: null, // CYTroopStrengthLabel
			defense: null, // DFTroopStrengthLabel
			command: null, // CCTroopStrengthLabel
			support: null, // enemySupportStrengthLabel
			overall: null // enemyBuildingsStrengthLabel
		},
		overall: null, // enemyTroopStrengthLabel
		outcome: null // simVictoryLabel
	},
	repair: {
		overall: null, // simRepairTimeLabel
        crystals: null
	},
	time: null, // simTimeLabel
	supportlvl: null // enemySupportLevelLabel
}
/*
 * Initializes screen for simulation purposes when targeting an enemy base
 * Adds the Simulate, Setup, and 4 directional arrow buttons for shifting unit formations
 * Simulates the battle
 * The simulate button is disabled for 10 seconds after being called.
 * Opens up replay overlay where simulation takes place. Allows 1x, 2x, or 4x replay speed
 */
 var lock = false; //used to deactivate the 'Simulate' button for a period of time before player can sim again.
var simulatebtn;
function initSimulateBattle() {
	//I believe this shows your units attack setup.
    var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	////////////
	//SIMULATE//
	////////////
	
	//This creates the 'Simulate' button that appears on the lower right side of the window
    simulatebtn = new qx.ui.form.Button("Simulate");
	
	//creates the simulate buttons dimensions, appearance, and tool-tip which is displayed when hovering over button
    simulatebtn.set({
						width: 64,
						height: 26,
						appearance: "button-text-small",
						toolTipText: "Start Combat Simulation"
					});
	
	//An Event Listened that waits for player to click the simulate button before executing the statements in its block
    simulatebtn.addListener("click", function () 
	{		
		//If the simulate button is still locked then nothing will happen.
		//if (lock) return;
		
		//EA API's - grabs the current city being viewed, the city you are attacking with, and then not exactly sure what the app actually does
        phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, OnSimulateBattleFinished);
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();
        
		//Does not allow player to sim PVP's
		//if (city.get_OwnerAllianceId() != 0) 
		//{
		//	alert("Not allowed for PvP!");
		//	return;
		//}
		
		//Stores the information of the last city player visited that could be attacked?
		localStorage.ta_sim_last_city = city.get_Id();
		
		//EA API - I believe this code grabs the formation you have setup for battle and then uses it in the simulation
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.API.Battleground.GetInstance().SimulateBattle();
        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
        
		//This is the replay view 
		app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
        //This disables both sim buttons for 10 seconds - API can only be called every 10s
        toolsSimBtn.setEnabled(false);
    	simulatebtn.setEnabled(false);
    	timer = 1000;
    	simTimer();

        setTimeout(function() {
            	var battleDuration = battleground.get_BattleDuration();
            	battleDuration = formatTime(battleDuration);
            	labels.time.setValue(battleDuration);
		}, 1000);
       
    });
	//Places the simulate button within the window
    armyBar.add(simulatebtn, {
		left: 12,
		top: 126
	});
	
	//////////
	//UNLOCK//
	//////////
	
	//Unlock button is stationed over the attack button. Keeps player from accidently attacking when wanting to sim.
	//Creates unlock button and sets its attributes
	var unlockbtn = new qx.ui.form.Button("Unlock");
	unlockbtn.set({
					width: 55,
					height: 46,
					appearance: "button-text-small",
					toolTipText: "Unlock Attack Button"
				});
	unlockbtn.setOpacity(0.5); //Sets button transparency
	
	//Event Listener - waits for player to click on button
	unlockbtn.addListener("click", function () {
		//Removes the unlock button for approx. 2 seconds before turning it back on.
		var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
		armyBar.remove(unlockbtn);
		setTimeout(function () {
				armyBar.add(unlockbtn, {
				top: 107,
				right: 4
			});
		}, 2000);
	}, this);
	
	armyBar.add(unlockbtn, {
		top: 107,
		right: 4
	});
	
	
	////////
	//Back//
	////////
	
	//Brings player back to enemy bases defense screen after simulation
	//Creates back button and gives it attributes
	var backbtn = new qx.ui.form.Button("Back");
    backbtn.set({
		width: 50,
		height: 24,
		appearance: "button-text-small",
		toolTipText: "Return to Combat Setup"
	});
	
	//Event Listener - waits for player to click button
    backbtn.addListener("click", function () {
		var app = qx.core.Init.getApplication();
		var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
		var current_city = player_cities.get_CurrentCity();
		try {
			//This brings the player back to viewing the enemies defense setup PlayArea
			app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
			} catch (e) {
		}	
	}, this);
	
	//This is the replay bar that shows up when simulation window is open.
	var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
	
	//Places the back button on the screen
    replayBar.add(backbtn, {
		top: 37,
		left: 255
	});
	
	/////////
	//Shift//
	/////////
	
	//Creates buttons that can be used to shift all units one space in selected direction
	var arrows = {};
	//Creates the Button and gives it a name (the parameter)
	arrows.ShiftFormationLeft = new qx.ui.form.Button("←");
	//Gives the button attributes
	arrows.ShiftFormationLeft.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units Left"
	});
	//Gives the button its own event listener - waits for player to click on it before calling the shiftFormation function
	arrows.ShiftFormationLeft.addListener("click", function(){shiftFormation('l');}, this);
	
	//same as the first shift button
	arrows.ShiftFormationRight = new qx.ui.form.Button("→");
	arrows.ShiftFormationRight.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units RIGHT"
	});
	arrows.ShiftFormationRight.addListener("click", function(){shiftFormation('r');}, this);
	
	//same as the first shift button
	arrows.ShiftFormationUp = new qx.ui.form.Button("↑");
	arrows.ShiftFormationUp.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units UP"
	});
	arrows.ShiftFormationUp.addListener("click", function(){shiftFormation('u');}, this);
	
	//same as the first shift button
	arrows.ShiftFormationDown = new qx.ui.form.Button("↓");
	arrows.ShiftFormationDown.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units DOWN"
	});
	arrows.ShiftFormationDown.addListener("click", function(){shiftFormation('d');}, this);
	
	//Next four blocks place the shift arrow buttons on the screen
	armyBar.add(arrows.ShiftFormationUp,
	{
		top: 17,
		left: 29
	});
	armyBar.add(arrows.ShiftFormationLeft,
	{
		top: 34,
		left: 12
	});
	armyBar.add(arrows.ShiftFormationRight,
	{
		top: 34,
		left: 46
	});
	armyBar.add(arrows.ShiftFormationDown,
	{
		top: 51,
		left: 29
	});
}
/*
 * Function shifts all units one space in the direction specified
 */
function shiftFormation(direction) { //left right up down
	
	//probably will never be called but never say never!
	if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");
	
	//Determines shift direction 
	if (direction == "up" || direction == "u") var v_shift = -1;
	if (direction == "down" || direction == "d") var v_shift = 1;
	if (direction == "left" || direction == "l") var h_shift = -1;
	if (direction == "right" || direction == "r") var h_shift = 1;
	
	//If shift cannot be determined correctly, then no shift shall occur!
	if (!v_shift) var v_shift = 0;
	if (!h_shift) var h_shift = 0;
	
	//Grabs all of the units and their positions I assume
	units = getCityPreArmyUnits().get_ArmyUnits().l;
	
	var Army = [];
	//for all the units shift them one unit over in desired direction
	//the switch statement is for special cases like if the unit is on the far right, left or  very top, bottom.
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
}
/*
 * I believe it updates the units position and saves it for future use? Not entirely sure.
 */
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
/*
 * Used in grabbing the players army for shifting purposes.
 */
function getCityPreArmyUnits() {
	var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
	var formationManager = ownCity.get_CityArmyFormationsManager();
	return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
}
////////////////
//Tools window//
////////////////
//This is the window that pops up on the left-hand side and currently only displays resource information for the base
var toolsbtn;
var battleResultsBox;
var toolsSimBtn;
//called from the waitForClientLib function. Sets up all the information for the tools window
function initializeTools() {
	// The Battle Simulator box
	var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	/////////
	//Tools//
    /////////
	
	//Creates the tools button - later will probably be renamed to Update
	toolsbtn = new qx.ui.form.Button("Info");
    toolsbtn.set({
        width: 64,
        height: 26,
        appearance: "button-text-small",
        toolTipText: "Update Battle Simulation Statistics"
	});
	//Event Listener that waits until player clicks the Tools button
	toolsbtn.addListener("click", function (){toolclick();});
	armyBar.add(toolsbtn, {
        left: 12,
        top: 89
	});
    
    //The update button under the simulation stats
    toolsSimBtn = new qx.ui.form.Button("Update");
    toolsSimBtn.set({
        width: 30,
        height: 14,
        appearance: "button-text-small",
        toolTipText: "Update Battle Simulation Statistics"
	});
	//Event Listener that waits until player clicks the Tools button
	toolsSimBtn.addListener("click", function (){calcSimulation();});
	
	//Creates the Tools window
	battleResultsBox = (new qx.ui.window.Window("Battle Simulator", "FactionUI/icons/icon_loading_logo.gif")).set({
		contentPaddingTop: 0,
		contentPaddingBottom: 2,
		contentPaddingRight: 2,
		contentPaddingLeft: 6,
		showMaximize: false,
		showMinimize: false
	});
	
	//Sets the attributes for the logo that shows in the header. I believe the logo is of your faction
	battleResultsBox.getChildControl("icon").set({
		scale: true,
		width: 25,
		height: 25
	});					
	battleResultsBox.setLayout(new qx.ui.layout.HBox); 
	battleResultsBox.moveTo(125, 125);
	
	//Creates a tab object --- There will be two currently, Stats and Loot
	var tabView = (new qx.ui.tabview.TabView).set({
		contentPaddingTop: 3,
		contentPaddingBottom: 6,
		contentPaddingRight: 7,
		contentPaddingLeft: 3
	});
	battleResultsBox.add(tabView);
	
	var statsPage = new qx.ui.tabview.Page("Stats"); 
	statsPage.setLayout(new qx.ui.layout.VBox(1)), tabView.add(statsPage);
	var t = new qx.ui.container.Composite,n = new qx.ui.layout.Grid;
	n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"); 
	statsPage.add(t);
	t.add(new qx.ui.basic.Label("Enemy Base:"), {
		row: 1,
		column: 0
		}), labels.damage.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.overall, {
		row: 1,
		column: 1
		}), t.add(new qx.ui.basic.Label("Defences:"), {
		row: 2,
		column: 0
		}), labels.damage.units.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.units.overall, {
		row: 2,
		column: 1
		}), t.add(new qx.ui.basic.Label("Buildings:"), {
		row: 3,
		column: 0
		}), labels.damage.structures.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.overall, {
		row: 3,
		column: 1
		}), t.add(new qx.ui.basic.Label("DF:"), {
		row: 4,
		column: 0
		}), labels.damage.structures.defense = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.defense, {
		row: 4,
		column: 1
		}), t.add(new qx.ui.basic.Label("CY:"), {
		row: 5,
		column: 0,
		}), labels.damage.structures.construction = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.construction, {
		row: 5,
		column: 1,
	}), t = new qx.ui.container.Composite; n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
		t.add(new qx.ui.basic.Label("Crystals:"), {
        row: 0,
        column: 0
    	}), labels.repair.crystals = new qx.ui.basic.Label(" - "), t.add(labels.repair.crystals, {
        row: 0,
        column: 1
    	}), t.add(new qx.ui.basic.Label("Overall:"), {
		row: 1,
		column: 0
		}), labels.health.overall = new qx.ui.basic.Label(" - "), t.add(labels.health.overall, {
		row: 1,
		column: 1
		}), t.add(new qx.ui.basic.Label("Infantry:"), {
		row: 2,
		column: 0
		}), labels.health.infantry = new qx.ui.basic.Label(" - "), t.add(labels.health.infantry, {
		row: 2,
		column: 1
		}), t.add(new qx.ui.basic.Label("Vehicle:"), {
		row: 3,
		column: 0
		}), labels.health.vehicle = new qx.ui.basic.Label(" - "), t.add(labels.health.vehicle, {
		row: 3,
		column: 1
		}), t.add(new qx.ui.basic.Label("Aircraft:"), {
		row: 4,
		column: 0
		}), labels.health.aircraft = new qx.ui.basic.Label(" - "), t.add(labels.health.aircraft, {
		row: 4,
		column: 1
	}), t = new qx.ui.container.Composite, n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
	t.add(new qx.ui.basic.Label("Outcome:"), {
		row: 0,
		column: 0
		}), labels.damage.outcome = new qx.ui.basic.Label("Unknown"), t.add(labels.damage.outcome, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Battle Time:"), {
		row: 1,
		column: 0
		}), labels.time = new qx.ui.basic.Label(" - "), t.add(labels.time, {
		row: 1,
		column: 1
    }), t = new qx.ui.container.Composite, n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
    t.add(toolsSimBtn, {
		row: 0,
		column: 0,
        colspan: 2
		});
	
	////////
	//LOOT//
	////////
	var infoPage = new qx.ui.tabview.Page("Loot");
	infoPage.setLayout(new qx.ui.layout.VBox(5));
	tabView.add(infoPage);
	
	// The Help Vertical Box
	var pVBox = new qx.ui.container.Composite();
	pVBox.setLayout(new qx.ui.layout.VBox(5));
	pVBox.setThemedFont("bold");
	pVBox.setThemedPadding(2);
	pVBox.setThemedBackgroundColor("#eef");
	infoPage.add(pVBox);
	var proHelpBar = new qx.ui.basic.Label().set({
		value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/145717'>Forums</a>",
		rich: true
	});
	pVBox.add(proHelpBar);
	// The Spoils
	var psVBox = new qx.ui.container.Composite();
	psVBox.setLayout(new qx.ui.layout.VBox(5));
	psVBox.setThemedFont("bold");
	psVBox.setThemedPadding(2);
	psVBox.setThemedBackgroundColor("#eef");
	infoPage.add(psVBox);
	psVBox.add(new qx.ui.basic.Label("Spoils"));
	// Tiberium image
	stats.spoils.tiberium = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
	psVBox.add(stats.spoils.tiberium);
	// Crystal image
	stats.spoils.crystal = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
	psVBox.add(stats.spoils.crystal);
	// Credits image
	stats.spoils.credit = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
	psVBox.add(stats.spoils.credit);
	// Research image
	stats.spoils.research = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
	psVBox.add(stats.spoils.research);
	
	battleResultsBox.add(tabView);
}
/*
 * Opens up the info box and updates the loot from the base.
 * Does not calculate simulation statistics
 */
function toolclick()
{	
	if (battleResultsBox.isVisible()) {
		battleResultsBox.close();
		} else {
		battleResultsBox.open();
	}
    calcResources(); //calculates the resources of the base clicked on
}
/*
 * Calculates the simulation data upon clicking the 'Update' button in the info box
 */
var timer = 0;
function calcSimulation(){  
    phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, OnSimulateBattleFinished);
    var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
   	var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
   	ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
   	//ClientLib.API.Battleground.GetInstance().GetSimulateBattleEndInfos();
    ClientLib.API.Battleground.GetInstance().SimulateBattle();
    var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();

    //Disables both simulation buttons for 10 seconds
    toolsSimBtn.setEnabled(false); 
    simulatebtn.setEnabled(false);
    timer = 1000;
    simTimer();
    
    //Can't get battle duration until a little time after sim is done.
    setTimeout(function() {
        		var battleDuration = battleground.get_BattleDuration();
            	battleDuration = formatTime(battleDuration);
            	labels.time.setValue(battleDuration);
		}, 1000);
}

/*
* Formats the time to mm:ss
 */
function formatTime(time)
{
    var seconds = time / 1000;
    //console.log("First Seconds: " + seconds);
    var minutes = seconds / 60;
    //console.log("Minutes: " + minutes);
    minutes = Math.round(minutes - 0.5);
    seconds = Math.round((seconds - 0.5) - (minutes * 60));
    //console.log("Second seconds: " + seconds);
    if ( minutes < 10) 
    {
        minutes = "0" + minutes;
    }
    if( seconds < 10)
    {
        seconds = "0" + seconds;
    }
    //console.log(minutes + ":" + seconds);
    return minutes + ":" + seconds;
}
/*
 * Does a countdown on the button to let player know how much longer they must wait until they can sim again
 */
function simTimer()
{
    if(timer>=1000)
	{
		toolsSimBtn.setLabel(Math.floor(timer/1000));
        simulatebtn.setLabel(Math.floor(timer/1000));
        
		timer-=10000;
		setTimeout(function () {
			simTimer();
		}, 10000)
	}
	else
	{
		setTimeout(function () {
			toolsSimBtn.setEnabled(true);
            simulatebtn.setEnabled(true);
			toolsSimBtn.setLabel("Update");
            simulatebtn.setLabel("Simulate");
		}, timer)
	}
}
/*
 * Function called after simulation has taken place.
 * Both the infoBox simulation and the visual simulation call this
 */
function OnSimulateBattleFinished(data){   
    //Grab the GetUnitMaxHealth function (it's obfuscated)
    var maxHealthFunc = getMaxHealthFunction(); //it's a function!
    if (maxHealthFunc == 0) return;
    getBaseHealth(data, maxHealthFunc);   
    getPlayerUnitDamage(data, maxHealthFunc);    
}
/*
 * Grabs information on the damage to the offensive units for displaying
 */
function getPlayerUnitDamage(data, maxHealthFunc)
{
    var crystals = 0;
    var infRT = 0;
    var vehiRT = 0;
    var airRT = 0;
    var infMH = 0;
    var vehiMH = 0;
    var airMH = 0;
    var infEH = 0;
    var vehiEH = 0;
    var airEH = 0;
    
    for (var i = 0; i < data.length; i++)
    {
        var unitData = data[i].Value;
        var unitMDBID = unitData.t;
        var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
        var oUnit = false;
        switch(unit.pt)
        {
                case ClientLib.Base.EPlacementType.Defense: 
                	oUnit = false;
                	break;
                case ClientLib.Base.EPlacementType.Structure: 
                	oUnit = false;
                	break;
                case ClientLib.Base.EPlacementType.Offense: 
                	oUnit = true;
                	break;     
        }
        if ( oUnit == false ) {continue;}
        var endHealth = unitData.h;
        var level = unitData.l;
        var maxHealth = maxHealthFunc(level, unit);
       
        var damageRatio = 1;
		if (endHealth >= 0)
		{
    		if (maxHealth != -1)
    		{
       	 		damageRatio = (maxHealth - (endHealth/16)) / maxHealth;
                var repairCosts = ClientLib.API.Util.GetUnitRepairCosts(level, unitMDBID, damageRatio);
                if (repairCosts == null){continue;}
                for (var j = 0; j < repairCosts.length; j++)
                {
                    
                    var c = repairCosts[j];
                    var type = parseInt(c.Type);
                    switch (type)
                    {
                        case ClientLib.Base.EResourceType.Crystal:
                            crystals += c.Count;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeBase:
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeInf:
                            infMH += maxHealth;
                            infEH += endHealth;
                            infRT += c.Count;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeVeh:
                            vehiRT += c.Count;
                            vehiMH += maxHealth;
                            vehiEH += endHealth;
                            break;
                        case ClientLib.Base.EResourceType.RepairChargeAir:
                            airRT += c.Count;
                            airMH += maxHealth;
                            airEH += endHealth;
                            break;
                    }
                }                                 
            }
		}
    }
    var overallDmg = (1 - (((infEH + vehiEH + airEH) / 16) / (infMH + vehiMH + airMH))) * 100;
    //if (isNaN(overallDmg)) {overallDmg = 0;}
    
    var infDmg = (1 - ((infEH/16) / infMH)) * 100;
    //if (isNaN(infDmg)) {infDmg = 0;}
    
    var vehiDmg = (1 - ((vehiEH/16) / vehiMH)) * 100;
    //if (isNaN(vehiDmg)) {vehiDmg = 0;}
    
     var airDmg = (1 - ((airEH/16) / airMH)) * 100;
    //if (isNaN(airDmg)) {airDmg = 0;}
   
    labels.repair.crystals.setValue(formatNumberWithCommas(crystals));
    labels.repair.crystals.setTextColor("blue");
    labels.health.overall.setValue( overallDmg.toFixed(2) + "% @ " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT,vehiRT,airRT))));
    labels.health.overall.setTextColor("blue");
    labels.health.infantry.setValue( infDmg.toFixed(2) + "% @ " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT)) );
    labels.health.vehicle.setValue( vehiDmg.toFixed(2) + "% @ " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT)));
    labels.health.aircraft.setValue( airDmg.toFixed(2) + "% @ " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT)));
}
/*
 * Calculates the damage done to the base, buildings, defense, and the CY and DF
 */
function getBaseHealth(data, maxHealthFunc) {
    var overallMH = 0;
    var overallEH = 0;
    var defenseMH = 0;
    var defenseEH = 0;
    var buildingMH = 0;
    var buildingEH = 0;
    var offenseMH = 0;
    var offenseEH = 0;
    var cyMH = 0;
    var cyEH = 0;
    var dfMH = 0;
    var dfEH = 0;
    
    for (var i = 0; i < data.length; i++)
    {
       	var combatId = data[i].Key;
       	var unitData = data[i].Value;
       	
       	var unitMDBID = unitData.t;
        var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
       	var unitLevel = unitData.l;
       	//var unitStartHealth = unitData.sh;
        var unitMaxHealth = maxHealthFunc(unitLevel, unit);
       	var unitEndHealth = unitData.h;
        
        switch(unit.pt) 
        {
            case ClientLib.Base.EPlacementType.Defense: 
                overallMH += unitMaxHealth;
                overallEH += unitEndHealth;
                defenseMH += unitMaxHealth;
                defenseEH += unitEndHealth;
                break;
            case ClientLib.Base.EPlacementType.Structure:
                overallMH += unitMaxHealth;
                overallEH += unitEndHealth;
                buildingMH += unitMaxHealth;
                buildingEH += unitEndHealth;
                switch(unitMDBID)
                {
                    case 177: //Construction Yard
                        cyMH = unitMaxHealth;
                        cyEH = unitEndHealth;
                        break;
                    case 195: //Defense Facility
                        dfMH = unitMaxHealth;
                        dfEH = unitEndHealth;
                        break;
                }
                break;
            case ClientLib.Base.EPlacementType.Offense:
                offenseMH += unitMaxHealth;
                offenseEH += unitEndHealth;
                break;
        }
        
        var overallHP = ((overallEH/16) / overallMH) * 100;
        var defenseHP = ((defenseEH/16) / defenseMH) * 100;
        var buildingHP = ((buildingEH/16) / buildingMH) * 100;
        var cyHP = ((cyEH/16) / cyMH) * 100;
        var dfHP = ((dfEH/16) / dfMH)  * 100;
       	
        if (offenseEH == 0)
        {
             labels.damage.outcome.setValue("Total Defeat");
             labels.damage.outcome.setTextColor("red"); 
        }
        else
        {
            labels.damage.outcome.setValue("Victory");
            labels.damage.outcome.setTextColor("green");
        }
    }
    labels.damage.overall.setValue(overallHP.toFixed(2));
    setLabelColor(labels.damage.overall, overallHP.toFixed(2));
    
    labels.damage.units.overall.setValue(defenseHP.toFixed(2));
    setLabelColor(labels.damage.units.overall, defenseHP.toFixed(2));
    
    labels.damage.structures.overall.setValue(buildingHP.toFixed(2));
    setLabelColor(labels.damage.structures.overall, buildingHP.toFixed(2));
    
    labels.damage.structures.construction.setValue(cyHP.toFixed(2));
    setLabelColor(labels.damage.structures.construction, cyHP.toFixed(2));
    
    labels.damage.structures.defense.setValue(dfHP.toFixed(2));
    setLabelColor(labels.damage.structures.defense, dfHP.toFixed(2));
}
/*
 * Changes the color of a label based on the number
 * Used as a visual aid for health percentages left for enemy bases
 */
function setLabelColor(label, number)
{
    if (number < 25)
        label.setTextColor("green");
    else if (number < 75)
        label.setTextColor("orange");
    else
        label.setTextColor("red");
}
/*
 * Thanks to Topper for this one. Grabs the obfuscated GetUnitMaxHealth function.
 */
function getMaxHealthFunction()
{
    var theFunc = 0;
    if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
        {
    		for (var key in ClientLib.Base.Util)
    		{
        		var strFunction = ClientLib.Base.Util[key].toString();
               
        		if (strFunction.indexOf("function (a,b)") == 0 && strFunction.indexOf("*=1.1") > -1)
        		{
                    theFunc = ClientLib.Base.Util[key];
                	break;
        		}
    		}
        }
		else
        {
            theFunc = ClientLib.API.Util.GetUnitMaxHealth;
        }
    return theFunc;
}
  
/*
* Formats the RepairTime output into hh:mm:ss (I believe)
 */
function formatRT(repairTime)
{
    phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(repairTime));
    return repairTime;
}
/*
 * Calculates the resources of the base the player is planning to attack. Based upon MHTools with some modifications.
 */
function calcResources() { 
    var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
    var data = [];
    data[0] = city.get_CityUnitsData();
    data[1] = city.get_CityBuildingsData();
    var buildings = [], offenses = [], defenses =[];
   
    //MrHIDEn Obfuscation Resist Code - simply amazing
    for (var d in data)
    {
    	for (var k in data[d]) {
                    var o = data[d][k];
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
                      buildings.push(k);
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        offenses.push(k);
                      } else {
                        // units 0-defend
                        defenses.push(k);
                      }
                    }
                  }
    }
    ClientLib.Data.City.prototype.get_DefenseUnits = 0;
    if(typeof(defenses)!='undefined') {
                    ClientLib.Data.City.prototype.kDefenseUnits = defenses;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
    ClientLib.Data.City.prototype.get_Buildings = 0;
     if(typeof(buildings)!='undefined') {
                    ClientLib.Data.City.prototype.kBuildings = buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
    
    		
    		
     	var loots = {RP:0, T:0, C:0, G:0};
    	
    if (ClientLib.Data.City.prototype.get_DefenseUnits != 0) {
        
    		var dUnits = city.get_DefenseUnits();
        	getSpoils(dUnits, loots);
    }
    
    if (ClientLib.Data.City.prototype.get_Buildings != 0) {
    	var bUnits = city.get_Buildings();
    	getSpoils(bUnits, loots);
    }
    
	//Displays the loot numbers in the Tool Window
	stats.spoils.tiberium.setLabel(formatNumberWithCommas(loots['T']));
	stats.spoils.crystal.setLabel(formatNumberWithCommas(loots['C']));
	stats.spoils.credit.setLabel(formatNumberWithCommas(loots['G']));
	stats.spoils.research.setLabel(formatNumberWithCommas(loots['RP']));
}
/*
 * Grabs the resources from the entity that the player can obtain if doing damage to that entity during combat.
 * The amount of resources available from an entity is determined by the amount of health it has multiplied by the repair costs for it
 * at its current level. 
 */
function getSpoils(entities, lootArray)
{
    //More MrHIDEn goodies - thank you Sir
    var rType ={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
    try{
    for (i in entities.d)
    {  
        var entity = entities.d[i];// unit/building
        var hp = entity.get_HitpointsPercent();// 0-1 , 1 means 100%               
        var repairReqs = entity.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
        for (var j in repairReqs) {
            var costs = repairReqs[j];//Requirement/Cost
            if(typeof(costs)!='object') continue;                
            var lootType = (typeof(rType[costs.Type])=='undefined')?costs.Type:rType[costs.Type];//translate if possible
            if(typeof(lootArray[lootType])=='undefined') lootArray[lootType] = 0;//add branch
            lootArray[lootType] += hp * costs.Count;
        } 
    }
    
    return lootArray;
    }
    catch(e) { console.log(e); }
}
/*
 * Parses the number and adds commas every three places
 */
function formatNumberWithCommas(e) {
	return Math.floor(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/*
 * Checks if view has changed and closes the info box if it is visible.
 * Don't want it visible when done viewing a base!
 */
function viewChanged()
{
    if (battleResultsBox.isVisible()) {
		battleResultsBox.close();
    }
}
/*
 * Sets up an event that waits for player to change views.
 * Got from Dayhek's code - thank you Sir!
 */
function waitForViewChange()
{
    try {
		phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , viewChanged);
    }
    catch(e) { console.log("Wait for view change error: " + e); }
}
/*
 * From what I can tell, this function checks to make sure the ClientLib and other resources 
 * are loaded before allowing functions that rely on those resources to be called
 */
function waitForClientLib() {
	//Initializes some variables - not exactly sure what they do at this point
    ClientLib = unsafeWindow["ClientLib"];
    qx = unsafeWindow["qx"];
	webfrontend = unsafeWindow["webfrontend"];
	phe = unsafeWindow["phe"];
	//Determines if client lib, qx, and application initialization is complete. 
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false)) {
		setTimeout(waitForClientLib, 1000);
		return;
	}
	
	//Function that initializes all of the components needed to simulate the battle
    initSimulateBattle();
	
	//Creates a popup tools window that lists the defending bases
	//loot and battle simulation damage with projected outcome.
	initializeTools();
    
    //Sets up viewChange event
    waitForViewChange();
};
/*
 * This function is called when the game is first loaded or opened. 
 */
function startup() {
    setTimeout(waitForClientLib, 1000);
};
//called when game is first launched
startup();