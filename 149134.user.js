// ==UserScript==
// @name           C&C Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      http://userscripts.org/scripts/show/145717
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.2b
// @author         Quor | WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue
// @require        http://sizzlemctwizzle.com/updater.php?id=145717
// ==/UserScript==

webfrontend = unsafeWindow["webfrontend"];
qx = unsafeWindow["qx"];
ClientLib = unsafeWindow["ClientLib"];

var buttons = {
	attack: {
		layout: {
			save: null, // buttonLayoutSave
			load: null, // buttonLayoutLoad
			deletef: null, // buttonLayoutDelete
		},
		simulate: null, // buttonSimulateCombat
		unlock: null, // buttonUnlockAttack
		unlockReset: null, // buttonUnlockReset
		tools: null, // buttonTools
	},
	simulate: {
		back: null // buttonReturnSetup
	}
}

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
		overall: null // lastRepairTime
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
		overall: null // simRepairTimeLabel
	},
	time: null, // simTimeLabel
	supportlvl: null // enemySupportLevelLabel
}

// Using EA's API (Limited Support)


////////////////
//Tools window//
var toolsbtn;
var battleResultsBox;
function initializeTools() {
	// The Battle Simulator box
	qx = unsafeWindow["qx"];
	var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	/////////
	//Tools//
	
	toolsbtn = new qx.ui.form.Button("Stats");
    toolsbtn.set({
        width: 64,
        height: 26,
        appearance: "button-text-small",
        toolTipText: "Update Battle Simulation Statistics"
	});
	toolsbtn.addListener("click", function (){toolclick();});
	armyBar.add(toolsbtn, {
        left: 12,
        top: 89
	});
	
	battleResultsBox = (new qx.ui.window.Window("Battle Simulator", "FactionUI/icons/icon_loading_logo.gif")).set({
		contentPaddingTop: 0,
		contentPaddingBottom: 2,
		contentPaddingRight: 2,
		contentPaddingLeft: 6,
		showMaximize: false,
		showMinimize: false
	});
	battleResultsBox.getChildControl("icon").set({
		scale: true,
		width: 25,
		height: 25
	})					
	battleResultsBox.setLayout(new qx.ui.layout.HBox); 
	battleResultsBox.moveTo(125, 125);
	
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
	// The Enemy Troop Strength Label
	t.add(new qx.ui.basic.Label("Enemy Base:"), {
		row: 0,
		column: 0
		}), labels.damage.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.overall, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Defences:"), {
		row: 1,
		column: 0
		}), labels.damage.units.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.units.overall, {
		row: 1,
		column: 1
		}), labels.supportlvl = new qx.ui.basic.Label(""), t.add(labels.supportlvl, {
		row: 4,
		column: 0
		}), labels.damage.structures.support = new qx.ui.basic.Label(""), t.add(labels.damage.structures.support, {
		row: 4,
		column: 1
		}), t.add(new qx.ui.basic.Label("Buildings:"), {
		row: 3,
		column: 0
		}), labels.damage.structures.overall = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.overall, {
		row: 3,
		column: 1
		}), t.add(new qx.ui.basic.Label(""), {
		row: 5,
		column: 0
		}), labels.damage.structures.command = new qx.ui.basic.Label(""), t.add(labels.damage.structures.command, {
		row: 5,
		column: 1
		}), t.add(new qx.ui.basic.Label("Defense Facility:"), {
		row: 6,
		column: 0
		}), labels.damage.structures.defense = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.defense, {
		row: 6,
		column: 1
		}), t.add(new qx.ui.basic.Label("Construction Yard:"), {
		row: 7,
		column: 0,
		width: 120
		}), labels.damage.structures.construction = new qx.ui.basic.Label(" - "), t.add(labels.damage.structures.construction, {
		row: 7,
		column: 1,
		width: 40
	}), t = new qx.ui.container.Composite; n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), statsPage.add(t);
	t.add(new qx.ui.basic.Label("Overall:"), {
		row: 0,
		column: 0
		}), labels.health.overall = new qx.ui.basic.Label(" - "), t.add(labels.health.overall, {
		row: 0,
		column: 1
		}), t.add(new qx.ui.basic.Label("Infantry:"), {
		row: 1,
		column: 0
		}), labels.health.infantry = new qx.ui.basic.Label(" - "), t.add(labels.health.infantry, {
		row: 1,
		column: 1
		}), t.add(new qx.ui.basic.Label("Vehicle:"), {
		row: 2,
		column: 0
		}), labels.health.vehicle = new qx.ui.basic.Label(" - "), t.add(labels.health.vehicle, {
		row: 2,
		column: 1
		}), t.add(new qx.ui.basic.Label("Aircraft:"), {
		row: 3,
		column: 0
		}), labels.health.aircraft = new qx.ui.basic.Label(" - "), t.add(labels.health.aircraft, {
		row: 3,
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
	});
	
	////////////////// Info ////////////////////
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
	// Tiberium
	stats.spoils.tiberium = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
	psVBox.add(stats.spoils.tiberium);
	// Crystal
	stats.spoils.crystal = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
	psVBox.add(stats.spoils.crystal);
	// Credits
	stats.spoils.credit = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
	psVBox.add(stats.spoils.credit);
	// Research
	stats.spoils.research = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
	psVBox.add(stats.spoils.research);
	
	battleResultsBox.add(tabView);
}

var wrapperinjected = false;
var timer;
function toolclick()
{
	webfrontend = unsafeWindow["webfrontend"];
	ClientLib = unsafeWindow["ClientLib"];
	CCTAWrapper_IsInstalled = unsafeWindow["CCTAWrapper_IsInstalled"];
	if (!wrapperinjected && (typeof CCTAWrapper_IsInstalled == "undefined" || !CCTAWrapper_IsInstalled)) {
		injectwrapper();
		wrapperinjected = true;
		setTimeout(toolclick,1000);
		return;
	}
	wrapperinjected = true;
	
	
	if (battleResultsBox.isVisible()) {
		//battleResultsBox.close();
		} else {
		battleResultsBox.open();
	}
	
	if (loadBase())
	{
		try
		{
		//webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Battleground(), "OnSimulateBattleFinished()", ClientLib.Vis.Battleground.OnSimulateBattleFinished, this, OnSimulateBattleFinished);
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		var unitqq = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
		unitqq.SimulateBattle();
		//unitqq.GetSimulateBattleEndInfos();
		}
		catch (e) {console.log(e);}
		
		toolsbtn.set({enabled: false});
		timer=10100;
		tooltimer();
		
		console.log(ClientLib.Vis.VisMain.GetInstance().get_Battleground());
		
		setTimeout(function() {
			while (unitqq.get_Simulation().DoStep(false)) {}
			calcTroops(unitqq);
		}, 1000);
		calcResources();
	}
}

function OnSimulateBattleFinished(data)
{
	console.log(data);
	return;
	for (var i = 0; i < data.length; i++)
	{
		var combatId = data[i].Key;
		var unitData = data[i].Value;
		
		var unitMDBID = unitData.t;
		var unitStartHealth = unitData.sh;
		var unitEndHealth = unitData.h;
		
		
	}
}

function tooltimer()
{
	if(timer>1000)
	{
		toolsbtn.setLabel(Math.floor(timer/1000));
		timer-=1000;
		setTimeout(function () {
			tooltimer();
		}, 1000)
	}
	else
	{
		setTimeout(function () {
			toolsbtn.set({enabled: true});
			toolsbtn.setLabel("Update");
		}, timer)
	}
}



////////
//Data//
var Data = null;

function getData(city) {
	var b = Data.Bypass;
	if(typeof(b.rdy) == 'undefined') {
		b = getBypass(city, b);//b must be obj to pass via reference
	}
	l = {};
	try {
		var o;
		
		l.Buildings = [];
		l.Defences = [];
		l.Offences = [];
		
		if(b.keys.Buildings!==undefined) {
			o = city.get_CityBuildingsData()[b.keys.Buildings];
			if(o!==null) l.Buildings = o.l;
		}
		
		if(b.keys.Defences!==undefined) {
			o = city.get_CityUnitsData()[b.keys.Defences];
			if(o!==null) l.Defences = o.l;
		}
		
		if(b.keys.Offences!==undefined) {
			o = city.get_CityUnitsData()[b.keys.Offences];
			if(o!==null) l.Offences = o.l;
		}
		
		l.rdy = true;              
		} catch (e) {
		console.warn('getData: ', e);
	}            
	return l;
}
function getBypass(city, b) {
	if(b.rdy === undefined) {
		// get keys
		b.keys = {};
		//b.dnucKeys = {};
		try {
			b = getKeys(city.get_CityUnitsData(), b);
			b = getKeys(city.get_CityBuildingsData(), b);
			var o;  
			o = city.get_CityBuildingsData()[b.keys.Buildings].l;
			b.keys.Hitpoints = getKeyHitpoints(o);//Buildings   
			b.rdy = true;
			} catch (e) {
			console.warn('getBypass: ', e);
		}
	}
	//console.dir(b.keys);
	return b;
}
function getKeys(list, b) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (typeof(o.l) == 'undefined') continue;
		if (o.l.length === 0) continue;
		var m = getKey(o.l[0],'mt');//dnuc & mt=MoveType
		if(typeof(m) == 'undefined') continue;
		if(typeof(b.keys.Type) == 'undefined') {
			b.keys.Type = m;//MoveType & dnucKeys aviable in this branch
			//alert(m);
		}
		if(typeof(o.l[0].GetUnitGroupType) ==  'undefined') {
			if(typeof(b.keys.Resources) == 'undefined') {
				b.keys.Resources = getResKey(o.l[0],'Count');//Resouces
			}
			// buildings
			b.keys.Buildings = k;
			} else {
			// units
			if(o.l[0].GetUnitGroupType()) {
				//1-attack
				b.keys.Offences = k;
				} else {
				//0-defend
				b.keys.Defences = k;
			}
		}
	}
	return b;
}
function getKey(list, find) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (o[find] === undefined) continue;
		if (find != 'l') {
			//console.info('getKey',k); 
			return k; 
		}
		if (o.l.length === 0) continue;
		//console.info('getKey',k);
		return k;
	}
	return undefined;
}
function getResKey(list,find) {
	for (var k in list) {
		var o = list[k];
		if (o === null) continue;
		if (!Array.isArray(o)) continue;
		if (o.length===0) continue;
		if (typeof(o[0][find]) == 'undefined') continue;
		return k;
	}
}
function getKeyHitpoints(l) {
	var unit = l[0];
	s = unit.get_IsAlive.toString();//get_HitpointsPercent
	var sa = 'this.';
	var sb = '()';
	var a = s.indexOf(sa) + sa.length;
	var t = s.substr(a);
	var b = t.indexOf(sb);    
	var k = t.substr(0, b);      
	//console.info('a',a,'b',b,'k',k);
	return k;
}

////////
//Info//

function loadBase() {
	try {
		if (Data === null) Data = {lastSelectedBaseId: -1, Bypass: {}};
		
		var r = Data;         
		
		r.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
		r.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
		
		if (r.lastSelectedBaseId !== r.selectedBaseId) r.loaded = false;
		r.lastSelectedBaseId = r.selectedBaseId;  
		
		r.IsOwnBase = r.selectedBaseId === r.selectedOwnBaseId;
		
		r.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
		
		r.ec = r.cc.GetCity(r.selectedBaseId);// it is very nice function          
		if(r.ec === null) return false;
		if(r.ec.get_CityBuildingsData() === null) return false;          
		
		r.oc = r.cc.get_CurrentOwnCity();            
		if(r.oc === null) return false;
		if(r.oc.get_CityBuildingsData() === null) return false;
		
		r.ol = getData(r.oc);
		r.el = getData(r.ec);// Buildings Defence Offence               
		if(typeof(r.ol)=='undefined') return false;
		if(typeof(r.el)=='undefined') return false;
		
		if(typeof(Data.Bypass.rdy)=='undefined') return false;
		
		if(r.el.Buildings.length === 0) return false;
		
		// for testing
		//MHTools();
		
		r.loaded = true;
		//flagBaseLoaded = true;
		return true;
		} catch (e) {
		console.warn("loadBase: ", e);
		console.dir("Data:",Data);
		return false;
	}
}

function calcResources() {
	try {          
		if (!Data.loaded) return;
		
		var el = Data.el;
		
		var loots = [0, 0, 0, 0, 0, 0, 0, 0];
		
		// enemy buildings
		for (var j in el.Buildings) {
			var building = el.Buildings[j];
			var mod = building.get_HitpointsPercent(); // 0-1 , 1 means 100%
			var resourcesList = building[Data.Bypass.keys.Resources]; 
			for (var i in resourcesList) {
				loots[resourcesList[i].Type] += mod * resourcesList[i].Count;// resourcesList[i].Type resourcesList[i].Count
			}
		}
		
		// enemy defences
		for (var j in el.Defences) {
			var unit = el.Defences[j];
			var mod = unit.get_HitpointsPercent(); // 0-1 , 1 means 100%
			var resourcesList = unit[Data.Bypass.keys.Resources];
			for (var i in resourcesList) {
				loots[resourcesList[i].Type] += mod * resourcesList[i].Count;
			}
		}
		
		stats.spoils.tiberium.setLabel(formatNumberWithCommas(loots[1]));
		stats.spoils.crystal.setLabel(formatNumberWithCommas(loots[2]));
		stats.spoils.credit.setLabel(formatNumberWithCommas(loots[3]));
		stats.spoils.research.setLabel(formatNumberWithCommas(loots[6]));
		
		} catch (e) {
		console.warn("calcResources: ", e);
		console.dir("Bypass:",MHLoot.Data.Bypass);
	}
}
function calcTroops(battleground) {
	try {
		//console.log(battleground);
		
		var b,w,E,S,x,T,N=0,C=0,k=0,t=0,n=0,r=0,i=0,s=0,o=0,u=0,a=0,f=0,l=0,c=0,h=0,p=0,d=0;var g=ClientLib.Res.ResMain.GetInstance().GetGamedata().units;var entities=battleground.get_Entities().d;var m=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityRepairData();for(var i in entities){w=entities[i].get_Entity();E=g[w.get_MDCTypeId()];if(E.r.length<=1){continue}S=w.get_iHitpointsCurrent(),x=w.get_iHitpoints(),T=ClientLib.Base.Util.GetUnitLevelData(w.get_iLevel(),E);console.log(E);if(w.get_eAlignment()==1){n+=S,t+=x;switch(E.at){case ClientLib.Base.EUnitType.Air:c+=S,p+=x,k+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeAir,S/x,m);break;case ClientLib.Base.EUnitType.Infantry:f+=S,d+=x,N+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeInf,S/x,m);break;case ClientLib.Base.EUnitType.Tank:l+=S,h+=x,C+=calculateRepairCost(T,ClientLib.Base.EResourceType.RepairChargeVeh,S/x,m);break;default:}}else{r+=x,i+=S;if(w.get_MDCTypeId()>=200&&w.get_MDCTypeId()<=205){stats.supportlvl=w.get_iLevel(),stats.damage.structures.support=S/x*100}else{switch(w.get_MDCTypeId()){case 112:case 151:case 177:stats.damage.structures.construction=S/x*100;break;case 158:case 131:case 195:stats.damage.structures.defense=S/x*100;break;case 111:case 159:stats.damage.structures.command=S/x*100;break;default:}}switch(E.pt){case ClientLib.Base.EPlacementType.Structure:s+=x,o+=S;break;default:u+=x,a+=S}}}
		
		stats.health.overall = n ? n / t * 100 : 0;
		stats.health.infantry = d ? f / d * 100 : 100;
		stats.health.vehicle = h ? l / h * 100 : 100;
		stats.health.aircraft = p ? c / p * 100 : 100;
		
		stats.damage.units.overall = a / u * 100;
		stats.damage.structures.overall = o / s * 100;
		stats.damage.overall = i / r * 100;
		
		stats.repair.overall = Math.max(N,k,C);
		stats.repair.infantry = N;
		stats.repair.aircraft = k;
		stats.repair.vehicle = C;
		
		stats.time=(battleground.get_BattleDuration()/1000);
		
		
		updateStatsWindow();
		
		} catch (e) {
		console.warn("calcTroops: ", e);
		//console.dir("Bypass:",MHLoot.Data.Bypass);
	}
}

function calculateRepairCost(e, t, n, r) {
	if (n >= 1) {
		return 0;
	}
	var ii = e.length,s;
	while (ii--) {
		s = e[ii];
		if (s.Type == t) {
			return r.ConvertRepairCost(s.Type, s.Count, 1 - n);
		}
	}
	return 0;
}

function setLabelColor(e, t, n) {
	var r = ["green", "blue", "black", "red"],
	i = r[0],
	s = t;
	n >= 0 && (s = 100 - s), s > 99.99 ? (i = r[3]) : s > 50 ? (i = r[2]) : s > 0 && (i = r[1]), e.setTextColor(i);
}
function updateLabel100(e, t, n) {
	setLabelColor(e, t, n), e.setValue(t.toFixed(2).toString());
}
function updateLabel100time(e, t, n, r) {
	var i = t.toFixed(2).toString() + " @ ";
	i += formatSecondsAsTime(r), setLabelColor(e, t, n), e.setValue(i);
}
function updateStatsWindow() {
	var e = ["black", "blue", "green", "red"],
	t = "",
	n = 0;
	stats.damage.structures.construction === 0 ? (t = "Total Victory", n = 0) : stats.damage.structures.overall < 100 ? (t = "Victory", n = 1) : (t = "Total Defeat", n = 3);
	labels.damage.outcome.setValue(t), labels.damage.outcome.setTextColor(e[n]);
	updateLabel100(labels.damage.overall, stats.damage.overall, - 1);
	updateLabel100(labels.damage.units.overall, stats.damage.units.overall, - 1);
	updateLabel100(labels.damage.structures.overall, stats.damage.structures.overall, - 1);
	updateLabel100(labels.damage.structures.construction, stats.damage.structures.construction, - 1);
	updateLabel100(labels.damage.structures.defense, stats.damage.structures.defense, - 1);
	//mnm.nnnmm ? updateLabel100(labels.damage.structures.command, stats.damage.structures.command, - 1) : (labels.damage.structures.command.setValue("--"),labels.damage.structures.command.setTextColor("green"));
	//var r = stats.supportlvl > 0 ? stats.supportlvl.toString() : "--";
	//labels.supportlvl.setValue("Suport lvl " + r + ": ");
	//updateLabel100(labels.damage.structures.support,stats.damage.structures.support, - 1);
	updateLabel100time(labels.health.overall, stats.health.overall, 1, stats.repair.overall);
	updateLabel100time(labels.health.infantry, stats.health.infantry, 1, stats.repair.infantry);
	updateLabel100time(labels.health.vehicle, stats.health.vehicle, 1, stats.repair.vehicle);
	updateLabel100time(labels.health.aircraft, stats.health.aircraft, 1, stats.repair.aircraft);
	setLabelColor(labels.time, stats.time / 120, - 1);
	labels.time.setValue(stats.time.toFixed(2).toString());
}
function formatNumberWithCommas(e) {
	return Math.floor(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatSecondsAsTime(e, t) {
	var n = Math.floor(e / 3600),
	r = Math.floor((e - n * 3600) / 60),
	i = Math.floor(e - n * 3600 - r * 60);
	r < 10 && (r = "0" + r), i < 10 && (i = "0" + i);
	return n + ":" + r + ":" + i;
}

//////////////
//Formations//
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
		for (var i = 0; (i < units_list.length); i++) {
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
}

//Basic simulate functions
var lock = false;
function initSimulateBattle() {
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	
	////////////
    //Simulate//
	
    var simulatebtn = new qx.ui.form.Button("Simulate");
    simulatebtn.set({
		width: 64,
		height: 26,
		appearance: "button-text-small",
		toolTipText: "Start Combat Simulation"
	});
    simulatebtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];
		
		if (lock) return;
		
		qx = unsafeWindow["qx"];
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();

		var mainData = ClientLib.Data.MainData.GetInstance();
		var player_cities = mainData.get_Cities();
		var current_city = player_cities.get_CurrentCity();
		localStorage.ta_sim_last_city = current_city.get_Id();
		
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
		lock = true;
		simulatebtn.setOpacity(0.2);
		setTimeout(function () {
			simulatebtn.setOpacity(1.0);
			lock = false;
		}, 10100)
	}, this)
    armyBar.add(simulatebtn, {
		left: 12,
		top: 126
	});
	
	//////////
	//Unlock//
	
	var unlockbtn = new qx.ui.form.Button("Unlock");
	unlockbtn.set({
		width: 55,
		height: 46,
		appearance: "button-text-small",
		toolTipText: "Unlock Attack Button"
	});
	unlockbtn.setOpacity(0.5);
	unlockbtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
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
	
	var backbtn = new qx.ui.form.Button("Setup");
    backbtn.set({
		width: 50,
		height: 24,
		appearance: "button-text-small",
		toolTipText: "Return to Combat Setup"
	});
    backbtn.addListener("click", function () {
		qx = unsafeWindow["qx"];
		var app = qx.core.Init.getApplication();
		var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
		var current_city = player_cities.get_CurrentCity();
		try {
			app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
			} catch (e) {
			app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
		}	
	}, this);
	
	var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
    replayBar.add(backbtn, {
		top: 37,
		left: 255
	});
	
	
	/////////
	//Shift//
	
	var arrows = {};
	arrows.ShiftFormationLeft = new qx.ui.form.Button("?");
	arrows.ShiftFormationLeft.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units Left"
	});
	arrows.ShiftFormationLeft.addListener("click", function(){shiftFormation('l');}, this);
	
	arrows.ShiftFormationRight = new qx.ui.form.Button("?");
	arrows.ShiftFormationRight.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units RIGHT"
	});
	arrows.ShiftFormationRight.addListener("click", function(){shiftFormation('r');}, this);
	
	arrows.ShiftFormationUp = new qx.ui.form.Button("?");
	arrows.ShiftFormationUp.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units UP"
	});
	arrows.ShiftFormationUp.addListener("click", function(){shiftFormation('u');}, this);
	
	arrows.ShiftFormationDown = new qx.ui.form.Button("?");
	arrows.ShiftFormationDown.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Shift units DOWN"
	});
	arrows.ShiftFormationDown.addListener("click", function(){shiftFormation('d');}, this);
	
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

//////////////////////////////////////////////////
//infernal wrapper by infernal me
//149068
//Version: 0.373715
//////////////////////////////////////////////////
function injectwrapper() {
	var CCTAWrapper_main = function () {
    try {
    gni = function(o, idx){
        var i = 0;
        for (k in o){
            if (i == idx){
                return k;
            }
            i++;
        }
        return '';
    }
    gbi = function(n, o, idx){_log(n);_logp(o);var i=0;for(k in o){i++;if(i==idx) return o[k];}}
    sbi = function(n, o, idx, v){_log(n);_logp(o);var i=0;for(k in o){i++;if(i==idx) o[k]=v;}}
    _log = function(){
        if(typeof console != 'undefined') console.log(arguments);
	    else if(window.opera) opera.postError(arguments);
	    else GM_log(arguments);
	}
	hmm = []
	_show = function(o){var ks=[];var i=0; for (k in o)ks[i++]=k;return ks;}
	_logp = function(o){_log(_show(o));}
    _log('have fun :)')
    wrapper = {
       _val_or_def: function(val, def) {
            if(typeof val != 'undefined') return val;
            return def;
        },
        _prop_name: function(prop_map) {return prop_map[this.versions[this.version]];},
        _prop_index: function(prop_map) {return prop_map[this.versions[this.version]+1];},
        versions: {'368132': 0, '373715': 2},
        version: null,//'368132',
        init_wrap: function(wrap) {
            try {
                var fn = wrap[0]
                var to_name = wrap[1]
                var tp_name = wrap[2]
                var sp_map = wrap[3]
                if(wrap.length == 5) var opt_so_name = wrap[4];
                var so_name = this._val_or_def(opt_so_name, to_name)
                var sp_index = sp_map[this._index]
                //_log('testing'+to_name+'.'+tp_name+'='+sp_name+':'+sp_index+':'+sp_map[this._name])
                switch (fn){
                    case 0:
                        var sp_name = gni(eval(so_name), sp_index)
                        var eval_str = to_name+"."+tp_name+" = "+so_name+"."+sp_name;
                        break;
                    case 1: 
                        var sp_name = gni(eval(so_name+'.prototype'), sp_index)
                        var eval_str = to_name+".prototype."+tp_name+" = "+so_name+".prototype."+sp_name;
                        break;
                    case 2:
                        var sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        var eval_str = to_name+".prototype."+tp_name+" = function(){return this."+sp_name+";}"
                        break;
                    case 3:
                        var sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        var eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
                        break;
                }
                //hmm.push([sp_map[this._name], sp_name])
                //_log(eval_str)
                eval(eval_str)
            } catch(e) {
                _log(e)
            }
        },
        wraps: [
            [0, 'System', 'EventHandler', ['UXDRTN', 515, 'YELZVJ', 529]],
            [1, 'System.EventHandler', '$ctor', ['NKAYQG', 1, 'KGCLWX', 1]],
            [1, 'ClientLib.Vis.ViewModeChange', '$ctor', ['NKAYQG', 1, 'KGCLWX', 1]],
            [0, 'SharedLib', 'Combat', ['ABMZCA', 479, 'LGZURN', 489]],
            [0, 'SharedLib.Combat', 'CbtSetup', ['PIZEIS', 511, 'INGSTT', 523], 'SharedLib'],
            [0, 'SharedLib.Combat', 'CbtSimulation', ['MTNICQ', 514, 'SFPLFI', 526], 'SharedLib'],
            [2, 'ClientLib.Vis.Battleground.Battleground', 'get_Entities', ['VMKWMN', 47, 'CXUBQM', 32]],
            [1, 'SharedLib.Combat.CbtSimulation', 'DoStep', ['RVQKEM', 24, 'YJNCZX', 26]],
            [2, 'SharedLib.Combat.CbtSimulation', 'get_iCombatStep', ['XPJFXB', 12, 'NBBKBC', 13]],
            [0, 'SharedLib.Combat', 'CbtEntity', ['RMODUK', 517, 'GWRHCR', 531], 'SharedLib'],
            [2, 'SharedLib.Combat.CbtEntity', 'get_eAlignment', ['VTZLJN', 12, 'NQPRNJ', 16]],
            [2, 'SharedLib.Combat.CbtEntity', 'get_iHitpoints', ['FOYNHE', 20, 'FMKVXZ', 24]],
            [2, 'SharedLib.Combat.CbtEntity', 'get_iHitpointsCurrent', ['BVCBXJ', 21, 'GPIIGP', 25]],
            [2, 'SharedLib.Combat.CbtEntity', 'get_MDCTypeId', ['ADPYGJ', 9, 'OLNIQY', 13]],
            [2, 'SharedLib.Combat.CbtEntity', 'get_iLevel', ['XAWKEE', 33, 'XOVYVU', 40]],
            [0, 'ClientLib.Base.Util', 'GetUnitLevelData', ['MYJUVV', 35, 'EOMZOE', 36]],
            [0, 'ClientLib.Data', 'World', ['DHZVSV', 225, 'MTTZKK', 222], 'SharedLib'],
            [2, 'ClientLib.Data.World', 'getSectors', ['EBJZUK', 2, 'RSYPLG', 8]],
            [2, 'ClientLib.Data.CityUnits', 'get_FullRawRepairTimeForUnitGroupTypes', ['IKDTVE', 6, 'AOHLSX', 6]],
            [1, 'ClientLib.Data.CityUnits', 'get_OffenseUnits', ['VPNCHY', 68, 'CYDCJP', 68]],
            [1, 'ClientLib.Data.CityUnits', 'get_DefenseUnits', ['BFENHD', 69, 'KYXUCT', 69]],
            [0, 'ClientLib.Data', 'CityRepair', ['KBVZQX', 295, 'MCFMIY', 302], 'SharedLib'],
            [1, 'ClientLib.Data.CityRepair', 'CanRepair', ['JPPHSL', 51, 'ZBNDBT', 51]],
            [1, 'ClientLib.Data.CityRepair', 'UpdateCachedFullRepairAllCost', ['IMVKOC', 63, 'OCDZTU', 63]],
            [1, 'ClientLib.Data.CityRepair', 'ConvertRepairCost', ['SPZDZS', 54, 'HOBUZP', 54]],
            [1, 'ClientLib.Data.CityPreArmyUnits', 'RefreshData', ['UPLGQX', 20, 'XSFQFN', 20]],
            [2, 'ClientLib.Data.City', 'getResourceLayout', ['TTZXUV', 50, 'OOQLLJ', 51]],
            [2, 'ClientLib.Data.CityBuildings', 'get_Buildings', ['QQXUFW', 2, 'THQKBX', 2]],
            [2, 'ClientLib.Data.CityEntity', 'get_UnitLevelRequirements', ['JSPNOJ', 2, 'DGBWEJ', 2]],
            [1, 'ClientLib.Data.CityEntity', 'get_UnitLevelRepairCost', ['get_UnitLevelRequirements', 67, 'get_UnitLevelRequirements', 69]],
            [3, 'ClientLib.Data.Combat', 'set_Version', ['QVVMKN', 2, 'HTAWRR', 1]],
            [3, 'ClientLib.Data.Combat', 'set_StartStep', ['ILFZUG', 3, 'CJOWTS', 3]],
            [3, 'ClientLib.Data.Combat', 'set_Attacker', ['OYABQD', 4, 'GVNKDR', 4]],
            [3, 'ClientLib.Data.Combat', 'set_Defender', ['UQJQSW', 5, 'OXLHSE', 5]],
            [3, 'ClientLib.Data.Combat', 'set_Blocker', ['ZBVZOD', 6, 'FGYDLJ', 6]],
            [3, 'ClientLib.Data.Combat', 'set_Buildings', ['DFGGIB', 7, 'MHRFXC', 7]],
            [3, 'ClientLib.Data.Combat', 'set_Supports', ['DZOZGI', 8, 'PLAIXC', 8]],
            [3, 'ClientLib.Data.Combat', 'set_Debug', ['GNSESK', 36, 'YWQIHU', 38]],
            [1, 'ClientLib.Data.Combat', 'setNPCNames', ['DUVWXR', 44, 'NMUKFE', 46]],
            [0, 'ClientLib.Vis.Battleground', 'BattlegroundEntity', ['BLEBFL', 516, 'VKYHCS', 530], 'System'],
            [2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_Entity', ['ILLYJL', 25, 'NQXMOU', 25]],
            [2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_UnitType', ['KPWXBD', 1, 'DYWAMD', 1]],
            [2, 'ClientLib.Vis.Battleground.Battleground', 'get_Simulation', ['YPYRGP', 44, 'SSSEUG', 29]],
            [3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['YMADLI', 79, 'RBNBEY', 54]],
            [1, 'ClientLib.Vis.Battleground.Battleground', 'setCombatData', ['ZMQRGW', 182, 'VQUGNU', 159]],
            [2, 'ClientLib.Res.ResMain', 'get_Gamedata', ['YMIGZX', 1, 'WGRXYC', 1]]
            //[2, 'SharedLib.Combat.CbtSetup', 'get_Entities', ['VMKWMN', 48, 'XSWELH', 0]],//??
            //[1, 'ClientLib.Data.CityPreArmyUnits', 'UpdateArmyLayout', ['CIVNTG', 0, 'JKGIUG', 0]],// Should not be needed
        ],
        init: function() {
            try{
                this._name = this.versions[this.version]
                this._index = this._name + 1
                
                
                System = $I
                SharedLib = $I

                for (var i in this.wraps) this.init_wrap(this.wraps[i]);
            }catch(e){
                _log(e)
            }
        }
    }  
      function createCCTAWrapper() {
        console.log('CCTAWrapper loaded');
        _log('wrapper loading'+PerforceChangelist);
        wrapper.version = '' + PerforceChangelist
        wrapper.init()
        _log('wrapper loaded')
        _log(hmm)
      }
    } catch (e) {
      console.log("createCCTAWrapper: ", e);
    }

    function CCTAWrapper_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCCTAWrapper();
        } else {
          window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
      } catch (e) {
        CCTAWrapper_IsInstalled = false;
        console.log("CCTAWrapper_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
    }
  }

  try {
    var CCTAWrapper = document.createElement("script");
    CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
    CCTAWrapper.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
    }
  } catch (e) {
    console.log("CCTAWrapper: init error: ", e);
  }
}

function waitForClientLib() {
    ClientLib = unsafeWindow["ClientLib"];
    qx = unsafeWindow["qx"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false)) {
		setTimeout(waitForClientLib, 1000);
		return;
	}
    initSimulateBattle();
	initializeTools();
	
	webfrontend = unsafeWindow["webfrontend"];
	qx = unsafeWindow["qx"];
	ClientLib = unsafeWindow["ClientLib"];
	
};

function startup() {
    setTimeout(waitForClientLib, 1000);
};

startup();