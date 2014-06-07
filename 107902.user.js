// ==UserScript==
// @name           GLB Player Builder v4_1
// @namespace      AirMcMVP
// @description    simulate a player's build
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==
// Original script written my monsterkill.  Accelerated Player Development changes made by AirMcMVP

var autoTrain = true;

var offseasonLength = 8;
var preseasonLength = 8;
var automaticSeasonChange = true;
var sitout_first_season = false;
var game_xp_factor = 1.0;
var daily_xp_factor = 1.0;
var va_xp_factor = 1.0;
var training_points_per_day = 2;
var sp_increase = 0 ;
var boost_count = 0 ;
var max_boosts_per_season = 3;
var plateau_age = 280;
var extended_plateau_age = 281;
var desiredBT = 0;
var disableSerialization = false;
var enableDesiredBTCheck = true;//enable to set a desired BT amount for age 280 and training will check for when you need to start light training
var logTrainingCalcs = false;// send text to the console log to trace the bonuses applied during training
var commonHeaders = {
	"User-agent": "Mozilla/5.0 (compatible) Greasemonkey",
	"Accept": "text/html,application/xml,text/xml"
};

/*  start constants  */
var TRAININGTYPE = {
	LIGHT: 0,
	NORMAL: 1,
	INTENSE: 2,
	MULTI: 3
}
var trainingTypes = {
	'light' : TRAININGTYPE.LIGHT,
	'normal' : TRAININGTYPE.NORMAL,
	'intense' : TRAININGTYPE.INTENSE,
	'multi' : TRAININGTYPE.MULTI 
};
var attributeTrainingOptions = [
    'strength',
    'speed',
    'agility',
    'jumping',
    'stamina',
    'vision',
    'confidence',
    'blocking',
    'throwing',
    'catching',
    'carrying',
    'tackling',
    'kicking',
    'punting'
];
/*  end constants  */



var containerDiv = document.createElement('div');
// change this if you want the controls somewhere else
document.getElementById("special_abilities").appendChild(containerDiv);

var startBuilderButton = addElement('input', 'startBuilderButton', containerDiv, {
	type: "button",
	value: "Start Builder"
});
startBuilderButton.addEventListener("click", startBuilder, true);


var topTableRow = addElement('tr', 'topTableRow', addElement('table', 'topTable', containerDiv));
GM_addStyle("#topTable {width: 100%}");
var previousDayTD = addElement('td', 'previousDayTD', topTableRow);
var previousDayButton = addElement('input', 'previousDayButton', previousDayTD, {
	type: "button",
	value: "Previous Day"
});
previousDayButton.addEventListener("click", restoreBuild, true);
GM_addStyle("#previousDayButton {display: none}");
GM_addStyle("#previousDayTD {width: 50%}");

var nextDayTD = addElement('td', 'nextDayTD', topTableRow);
var nextDayButton = addElement('input', 'nextDayButton', addElement('td', null, nextDayTD), {
	type: "button",
	value: "Next Day"
});
nextDayButton.addEventListener("click", incrementDay, true);
GM_addStyle("#nextDayButton {display: none}");
GM_addStyle("#nextDayTD {width: 50%}");

var loadSavedBuildButton = document.createElement('input');
loadSavedBuildButton.id = "loadSavedBuildButton";
loadSavedBuildButton.type = "button";
loadSavedBuildButton.value = "Load a Saved Build";
loadSavedBuildButton.addEventListener("click", loadSavedBuild, true);
containerDiv.appendChild(loadSavedBuildButton);
if (disableSerialization) {
	GM_addStyle("#loadSavedBuildButton {display: none}");
}

/*
var convertBuildButton = document.createElement('input');
convertBuildButton.id = "convertBuildButton";
convertBuildButton.type = "button";
convertBuildButton.value = "Convert a Saved Build";
convertBuildButton.addEventListener("click", convertSavedBuild, true);
containerDiv.appendChild(convertBuildButton);
if (disableSerialization) {
	GM_addStyle("#convertBuildButton {display: none}");
}
*/

var startSeasonButton = document.createElement('input');
startSeasonButton.id = "startSeasonButton";
startSeasonButton.type = "button";
startSeasonButton.value = "Start Season";
startSeasonButton.addEventListener("click", startSeason, true);
containerDiv.appendChild(startSeasonButton);
GM_addStyle("#startSeasonButton {display: none}");

var boostButton = document.createElement('input');
boostButton.id = "boostButton";
boostButton.type = "button";
boostButton.value = "Boost";
boostButton.addEventListener("click", boost, true);
containerDiv.appendChild(boostButton);
GM_addStyle("#boostButton {display: none}");

var currentSeasonDiv = document.createElement('div');
currentSeasonDiv.id = "currentSeasonDiv";
containerDiv.appendChild(currentSeasonDiv);
var currentDayDiv = document.createElement('div');
currentDayDiv.id = "currentDayDiv";
containerDiv.appendChild(currentDayDiv);
var currentAgeDiv = document.createElement('div');
currentAgeDiv.id = "currentAgeDiv";
containerDiv.appendChild(currentAgeDiv);

var availableBoostsDiv = document.createElement('div');
availableBoostsDiv.id = "availableBoostsDiv";
containerDiv.appendChild(availableBoostsDiv);

var boostCountDiv = document.createElement('div');
boostCountDiv.id = "boostCountDiv";
containerDiv.appendChild(boostCountDiv);

// level and experience
var currentLevelDiv = document.createElement('div');
currentLevelDiv.id = "currentLevelDiv";
containerDiv.appendChild(currentLevelDiv);
var currentXPDiv = document.createElement('div');
currentXPDiv.id = "currentXPDiv";
containerDiv.appendChild(currentXPDiv);

// stop game xp button
var stopGameXPButton = addElement('input','stopGameXPButton', containerDiv, {
	type: "button",
	value: "Turn Off Game XP"
});
stopGameXPButton.addEventListener("click", turnOffGameXP, true);
GM_addStyle("#stopGameXPButton {display: none}");
// start game xp button
var startGameXPButton = document.createElement('input');
startGameXPButton.id = "startGameXPButton";
startGameXPButton.type = "button";
startGameXPButton.value = "Turn On Game XP";
startGameXPButton.addEventListener("click", turnOnGameXP, true);
containerDiv.appendChild(startGameXPButton);
GM_addStyle("#startGameXPButton {display: none}");

// even game day button
var gameDayEvenButton = addElement('input','gameDayEvenButton', containerDiv, {
	type: "button",
	value: "Run games on even days"
});
gameDayEvenButton.addEventListener("click", enableEvenDayGames, true);
GM_addStyle("#gameDayEvenButton {display: none}");

// odd game day button
var gameDayOddButton = addElement('input','gameDayOddButton', containerDiv, {
	type: "button",
	value: "Run games on odd days"
});
gameDayOddButton.addEventListener("click", enableOddDayGames, true);
GM_addStyle("#gameDayOddButton {display: none}");

// veteran xp and points
var currentVAXPDiv = document.createElement('div');
currentVAXPDiv.id = "currentVAXPDiv";
containerDiv.appendChild(currentVAXPDiv);
var currentVADiv = document.createElement('div');
currentVADiv.id = "currentVADiv";
containerDiv.appendChild(currentVADiv);

// bonus tokens
var currentBTDiv = document.createElement('span');
currentBTDiv.id = "currentBTDiv";
containerDiv.appendChild(currentBTDiv);
var spendBTButton = document.createElement('input');
spendBTButton.id = "spendBTButton";
spendBTButton.type = "button";
spendBTButton.value = "Spend 15 BT for 1 SP";
spendBTButton.addEventListener("click", spendBT, true);
containerDiv.appendChild(spendBTButton);
GM_addStyle("#spendBTButton {display: none}");

if (enableDesiredBTCheck) {
	var btWarningDiv = addElement('div', 'btWarningDiv', containerDiv);
	var btWarningButton = addElement('input', "btWarningButton", btWarningDiv, {
		type: "button",
		value: "Set Desired BT for Day 280"
	});
	btWarningButton.addEventListener("click", promptForDesiredBT, true);
}
GM_addStyle("#btWarningDiv {display: none}");
addElement('hr', null, containerDiv);

// training
var currentTPDiv = addElement('div', 'currentTPDiv', containerDiv);

var trainingDiv = addElement('div', 'trainingDiv', containerDiv, {innerHTML : '<select id="trainingSelect"></select>'});
GM_addStyle("#trainingDiv {display: none}");

// populate training options
var trainingSelect = document.getElementById('trainingSelect');
for (k in trainingTypes) {
	addElement('option', 'trainingTypeOption'+trainingTypes[k], trainingSelect, {
		value: trainingTypes[k],
		innerHTML: k
	});
}
trainingSelect.addEventListener("change", trainingTypeChanged, true);
function trainingTypeChanged(val) {
    var trainingType = document.getElementById('trainingSelect').selectedIndex;
    if (trainingType==TRAININGTYPE.LIGHT) {
		GM_addStyle("#singleTrainDiv {display: block}");
		GM_addStyle("#multiTrainDiv {display: none}");
    } else if (trainingType==TRAININGTYPE.NORMAL) {
		GM_addStyle("#singleTrainDiv {display: block}");
		GM_addStyle("#multiTrainDiv {display: none}");
    } else if (trainingType==TRAININGTYPE.INTENSE) {
		GM_addStyle("#singleTrainDiv {display: block}");
		GM_addStyle("#multiTrainDiv {display: none}");
    } else if (trainingType==TRAININGTYPE.MULTI) {
		GM_addStyle("#singleTrainDiv {display: none}");
		GM_addStyle("#multiTrainDiv {display: block}");
    }
    updateTrainingPrediction();
}
// container for the single training drop down
var singleTrainDiv = addElement('div', 'singleTrainDiv', trainingDiv);
var singleTrainSelect = addElement('select', 'singleTrainSelect', singleTrainDiv);
fillAttributeDropdown(singleTrainSelect);
singleTrainSelect.addEventListener("change", updateTrainingPrediction, true);

// container for the multi training drop downs
var multiTrainDiv = addElement('div', 'multiTrainDiv', trainingDiv);
GM_addStyle("#multiTrainDiv {display: none}");

var multiTrainSelect1 = addElement('select', 'multiTrainSelect1', multiTrainDiv);
addElement('option', null, multiTrainSelect1, {value: null, innerHTML: 'None'});
fillAttributeDropdown(multiTrainSelect1, 'mt1');
multiTrainSelect1.value = "";
multiTrainSelect1.addEventListener("change", multiTrainSelectChanged, true);

var multiTrainSelect2 = addElement('select', 'multiTrainSelect2', multiTrainDiv);
addElement('option', null, multiTrainSelect2, {value: null, innerHTML: 'None'});
multiTrainSelect2.addEventListener("change", multiTrainSelectChanged, true);

var multiTrainSelect3 = addElement('select', 'multiTrainSelect3', multiTrainDiv);
addElement('option', null, multiTrainSelect3, {value: null, innerHTML: 'None'});
multiTrainSelect3.addEventListener("change", multiTrainSelectChanged, true);

var multiTrainSelect4 = addElement('select', 'multiTrainSelect4', multiTrainDiv);
addElement('option', null, multiTrainSelect4, {value: null, innerHTML: 'None'});
multiTrainSelect4.addEventListener("change", multiTrainSelectChanged, true);
var trainButton = addElement('input', 'trainButton', trainingDiv, {
	type : "button",
	value : "Train"
});
trainButton.addEventListener("click", train, true);
GM_addStyle("#trainButton {display: block}");

// training prediction text
var trainPredictionSpan = addElement('span', 'trainPredictionSpan', trainingDiv);
trainPredictionSpan.innerHTML="Training Prediction";

var enhanceTrainingButton = addElement('input', 'enhanceTrainingButton', trainingDiv, {
	type : "button",
	value : "Buy Training Enhancements"
});
enhanceTrainingButton.addEventListener("click", enhanceTraining, true);
GM_addStyle("#enhanceTrainingButton {display: block}");
var multiTrainingButton = addElement('input', 'multiTrainingButton', trainingDiv, {
	type : "button",
	value : "Buy Multi Training"
});
multiTrainingButton.addEventListener("click", multiTraining, true);
GM_addStyle("#multiTrainingButton {display: block}");

var span = document.createElement('span');
span.id="autoTrainSpan";
span.innerHTML = "Auto Train when points are available : ";
trainingDiv.appendChild(span);
var autoTrainBox = document.createElement('input');
autoTrainBox.id = "autoTrainBox";
autoTrainBox.type = "checkbox";
autoTrainBox.addEventListener("click", function() {
    autoTrain = document.getElementById("autoTrainBox").checked;
}, true);
trainingDiv.appendChild(autoTrainBox);
autoTrainBox.checked = autoTrain;
GM_addStyle("#trainingDiv {display: none}");

addElement('hr', null, containerDiv);

var serializeButton = addElement('input', "serializeButton", containerDiv, {
	type: "button",
	value: "Generate a key for this build"
});
serializeButton.addEventListener("click", getSerializedBuild, true);
GM_addStyle("#serializeButton {display: none}");

var printFriendlyButton = addElement('input', "printFriendlyButton", containerDiv, {
	type: "button",
	value: "Create Print Friendly text"
});
printFriendlyButton.addEventListener("click", getPrintFriendlyText, true);
GM_addStyle("#printFriendlyButton {display: none}");


var position;
var season = 0;
var level = -1;
var xp = 0;
var day = 1;
var tp = 0;
var availableBoosts = 0;
var buildFromScratch = true;
var vaxp = 0;
var va = 0;
var age = 0;
var playerId = parsePlayerId();

/* 
    
    weightOptions: the number of increments on each side of the weight slider not including 0.
        EX: weightOptions = 4 means there's 9 possible weights for the position.
*/
var positionData = {
    qb_pocket_passer: {
        majors: ["confidence","throwing","vision"],
        minors: ["agility","stamina","strength", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    qb_deep_passer: {
        majors: ["strength","throwing","vision"],
        minors: ["agility","stamina","confidence", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    qb_scrambler: {
        majors: ["agility","throwing","vision"],
        minors: ["confidence","speed","strength", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    hb_power_back: {
        majors: ["agility","carrying","confidence", "strength"],
        minors: ["jumping","speed","stamina","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    hb_elusive_back: {
        majors: ["agility","carrying","speed", "vision"],
        minors: ["catching","confidence","stamina","strength"],
        weightOptions: 22,
        heightOptions: 2
    },
    hb_scat_back: {
        majors: ["agility","catching","speed", "carrying"],
        minors: ["vision","confidence","stamina","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    hb_combo_back: {
        majors: ["carrying","confidence","speed", "strength", "vision"],
        minors: ["agility","catching","stamina","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    hb_returner: {
        majors: ["carrying","stamina","speed", "agility", "vision"],
        minors: ["confidence","strength","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    hb_special_teamer: {
        majors: ["blocking","stamina","speed", "agility", "tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    fb_rusher: {
        majors: ["agility","carrying","confidence", "strength"],
        minors: ["blocking","speed","stamina","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    fb_blocker: {
        majors: ["agility","blocking","strength", "vision"],
        minors: ["carrying","confidence","stamina","speed"],
        weightOptions: 22,
        heightOptions: 2
    },
    fb_combo_back: {
        majors: ["agility","carrying","blocking", "strength", "vision"],
        minors: ["catching","confidence","speed","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    fb_scat_back: {
        majors: ["agility","catching","speed", "vision"],
        minors: ["blocking","confidence","carrying","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    fb_special_teamer: {
        majors: ["agility","stamina","speed", "blocking", "tackling"],
        minors: ["strength","confidence","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    wr_speedster: {
        majors: ["agility","catching","speed", "vision", "confidence"],
        minors: ["carrying","jumping","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    wr_possession_receiver: {
        majors: ["agility","catching","jumping", "vision", "carrying"],
        minors: ["confidence","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    wr_power_receiver: {
        majors: ["agility","catching","carrying", "strength", "vision"],
        minors: ["confidence","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    wr_returner: {
        majors: ["agility","carrying","speed", "stamina", "vision"],
        minors: ["confidence","jumping","strength"],
        weightOptions: 9,
        heightOptions: 3
    },
    wr_special_teamer: {
        majors: ["agility","blocking","speed", "stamina", "tackling"],
        minors: ["strength","confidence","vision"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_blocker: {
        majors: ["agility","blocking","vision", "strength","confidence"],
        minors: ["catching","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_receiver: {
        majors: ["agility","speed","catching","vision","carrying"],
        minors: ["strength","blocking","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_power_receiver : {
        majors: ["agility","strength","catching","confidence","carrying"],
        minors: ["speed","blocking","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_dual_threat: {
        majors: ["agility","blocking","catching", "strength", "vision"],
        minors: ["jumping","confidence","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_special_teamer: {
        majors: ["agility","blocking","speed", "stamina", "tackling"],
        minors: ["strength","confidence","vision"],
        weightOptions: 9,
        heightOptions: 3
    },
    c_run_blocker: {
        majors: ["strength","blocking","confidence", "vision"],
        minors: ["agility", "stamina","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    c_pass_blocker: {
        majors: ["agility","blocking","confidence", "vision"],
        minors: ["strength", "speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    c_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 9,
        heightOptions: 3
    },
    g_run_blocker: {
        majors: ["strength","blocking","confidence", "vision"],
        minors: ["agility", "stamina","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    g_pass_blocker: {
        majors: ["agility","blocking","confidence", "vision"],
        minors: ["strength", "speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    g_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 9,
        heightOptions: 3
    },
    ot_run_blocker: {
        majors: ["strength","blocking","confidence", "vision"],
        minors: ["agility", "stamina","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    ot_pass_blocker: {
        majors: ["agility","blocking","confidence", "vision"],
        minors: ["strength", "speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    ot_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 9,
        heightOptions: 3
    },
    dt_run_stuffer: {
        majors: ["agility","strength","tackling", "vision"],
        minors: ["confidence","stamina","speed"],
        weightOptions: 18,
        heightOptions: 3
    },
    dt_pass_rusher: {
        majors: ["agility","speed","vision", "tackling"],
        minors: ["confidence","stamina","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    dt_combo_tackle: {
        majors: ["speed","strength","vision", "tackling"],
        minors: ["agility","stamina","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
    dt_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["strength","vision","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
    de_run_stuffer: {
        majors: ["agility","strength","tackling","vision"],
        minors: ["confidence","stamina","speed"],
        weightOptions: 18,
        heightOptions: 3
    },
    de_pass_rusher: {
        majors: ["agility","speed","vision","tackling"],
        minors: ["confidence","stamina","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    de_combo_end: {
        majors: ["speed","strength","vision","tackling"],
        minors: ["agility","stamina","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
    de_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["strength","vision","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
    cb_man_specialist: {
        majors: ["agility","jumping","speed","vision"],
        minors: ["catching","confidence","stamina","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    cb_zone_specialist: {
        majors: ["agility","speed","tackling","vision"],
        minors: ["catching","confidence","jumping","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    cb_hard_hitter: {
        majors: ["speed","strength","tackling","vision"],
        minors: ["confidence","jumping","agility","stamina"], 
        weightOptions: 18,
        heightOptions: 3
    },
    cb_combo_corner: {
        majors: ["agility","speed","strength","tackling"],
        minors: ["confidence","jumping","stamina","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    cb_returner: {
        majors: ["agility","carrying","speed","stamina","vision"],
        minors: ["confidence","jumping","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    cb_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    ss_man_specialist: {
        majors: ["agility","jumping","speed","vision"],
        minors: ["catching","confidence","stamina","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    ss_zone_specialist: {
        majors: ["agility","speed","tackling","vision"],
        minors: ["catching","confidence","jumping","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    ss_hard_hitter: {
        majors: ["speed","strength","tackling","vision"],
        minors: ["confidence","jumping","agility","stamina"], 
        weightOptions: 18,
        heightOptions: 3
    },
    ss_combo_safety: {
        majors: ["agility","speed","strength","tackling"],
        minors: ["confidence","jumping","stamina","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    ss_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    fs_man_specialist: {
        majors: ["agility","jumping","speed","vision"],
        minors: ["catching","confidence","stamina","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    fs_zone_specialist: {
        majors: ["agility","speed","tackling","vision"],
        minors: ["catching","confidence","jumping","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    fs_hard_hitter: {
        majors: ["speed","strength","tackling","vision"],
        minors: ["confidence","jumping","agility","stamina"], 
        weightOptions: 18,
        heightOptions: 3
    },
    fs_combo_safety: {
        majors: ["agility","speed","strength","tackling"],
        minors: ["confidence","jumping","stamina","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    fs_special_teamer: {
        majors: ["agility","blocking","speed","stamina","tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    lb_coverage_linebacker: {
        majors: ["agility","jumping","speed","vision"],
        minors: ["confidence","stamina","strength","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    lb_blitzer: {
        majors: ["agility","jumping","speed","tackling"],
        minors: ["confidence","stamina","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    lb_hard_hitter: {
        majors: ["agility","strength","tackling","vision"],
        minors: ["confidence","jumping","speed","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    lb_combo_linebacker: {
        majors: ["agility","speed","tackling","vision", "confidence"],
        minors: ["jumping","stamina","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    lb_special_teamer: {
        majors: ["agility","blocking","speed","stamina", "tackling"],
        minors: ["confidence","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    k_boomer: {
        majors: ["confidence","kicking","strength"],
        minors: ["jumping","agility","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    k_technician: {
        majors: ["confidence","kicking","vision"],
        minors: ["jumping","agility","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    p_boomer: {
        majors: ["confidence","punting","strength"],
        minors: ["jumping","agility","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    p_technician: {
        majors: ["confidence","punting","vision"],
        minors: ["jumping","agility","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    de_none: {
        majors: ["strength","tackling","agility","speed"],
        minors: ["blocking","jumping","stamina","vision","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
    dt_none: {
        majors: ["strength","tackling","agility"],
        minors: ["blocking", "speed", "vision", "stamina", "confidence"],
        weightOptions: 33,
        heightOptions: 3
    },
    c_none: {
        majors: ["strength","blocking"],
        minors: ["tackling", "agility", "stamina", "vision", "confidence"],
        weightOptions: 22,
        heightOptions: 2
    },
    g_none: {
        majors: ["strength","blocking","confidence"],
        minors: ["tackling","agility","stamina","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    ot_none: {
        majors: ["strength","blocking","confidence","vision","agility"],
        minors: ["tackling","stamina"],
        weightOptions: 25,
        heightOptions: 3
    },
    hb_none: {
        majors: ["strength","speed","agility","carrying","vision","confidence"],
        minors: ["jumping","stamina","blocking","throwing","catching"],
        weightOptions: 20,
        heightOptions: 2
    },
    wr_none: {
        majors: ["speed","agility","jumping","vision","stamina","catching"],
        minors: ["confidence","carrying"],
        weightOptions: 11,
        heightOptions: 2
    },
    qb_none: {
        majors: ["strength","throwing","stamina","vision","confidence"],
        minors: ["speed","agility","jumping","catching","carrying"],
        weightOptions: 9,
        heightOptions: 3
    },
    te_none: {
        majors: ["strength","blocking","catching","vision"],
        minors: ["speed","tackling","agility","stamina","carrying","confidence"],
        weightOptions: 22,
        heightOptions: 3
    },
    fb_none: {
        majors: ["strength","blocking","agility","carrying"],
        minors: ["confidence","vision","stamina","catching","tackling"],
        weightOptions: 15,
        heightOptions: 3
    },
    lb_none: {
        majors: ["strength","tackling","agility","stamina","vision","confidence"],
        minors: ["blocking","speed","jumping","catching"],
        weightOptions: 9,
        heightOptions: 3
    },
    cb_none: {
        majors: ["speed","agility","jumping","stamina","vision","catching"],
        minors: ["strength","tackling","carrying","confidence"],
        weightOptions: 11,
        heightOptions: 3
    },
    ss_none: {
        majors: ["strength","speed","tackling","stamina","vision"],
        minors: ["blocking","agility","jumping","catching","carrying","confidence"],
        weightOptions: 13,
        heightOptions: 2
    },
    fs_none: {
        majors: ["speed","tackling","catching","stamina","vision"],
        minors: ["strength","blocking","agility","jumping","confidence","carrying"],
        weightOptions: 13,
        heightOptions: 2
    },
    k_none: {
        majors: ["kicking","confidence"],
        minors: ["strength","speed","agility","throwing","jumping","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    p_none: {
        majors: ["punting","confidence"],
        minors: ["strength","speed","agility","throwing","jumping","vision"],
        weightOptions: 22,
        heightOptions: 2
    }
    
};
// dont rearrange these as this order is used for de-serializing saved builds
var minimums = {
	qb_pocket_passer:{strength:"10", speed:"8", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"10", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	qb_scrambler:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"8", vision:"10", confidence:"10", blocking:"8", throwing:"10", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	qb_deep_passer:{strength:"10", speed:"8", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"10", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	hb_power_back:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	hb_scat_back:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	hb_combo_back:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	hb_returner:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	hb_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fb_rusher:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	fb_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	fb_combo_back:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	fb_scat_back:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	fb_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	te_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"10", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	te_receiver:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"8", blocking:"10", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	te_power_receiver:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"8", confidence:"10", blocking:"10", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	te_dual_threat:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"10", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	te_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	wr_speedster:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	wr_possession_receiver:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	wr_power_receiver:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	wr_returner:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	wr_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	hb_elusive_back:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	dt_run_stuffer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	dt_pass_rusher:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	dt_combo_tackle:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	dt_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	de_run_stuffer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	de_pass_rusher:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	de_combo_end:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	de_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	cb_man_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	cb_zone_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	cb_hard_hitter:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	cb_combo_corner:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	cb_returner:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"10", tackling:"8", kicking:"8", punting:"8"},
	cb_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ss_man_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ss_zone_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ss_hard_hitter:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ss_combo_safety:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ss_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fs_man_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fs_zone_specialist:{strength:"8", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"10", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fs_hard_hitter:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fs_combo_safety:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	fs_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	lb_coverage_linebacker:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	lb_blitzer:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	lb_hard_hitter:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	lb_combo_linebacker:{strength:"10", speed:"10", agility:"10", jumping:"10", stamina:"10", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	lb_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	k_boomer:{strength:"10", speed:"8", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"10", punting:"8"},
	k_technician:{strength:"10", speed:"8", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"10", punting:"8"},
	p_boomer:{strength:"10", speed:"8", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"10"},
	p_technician:{strength:"10", speed:"8", agility:"10", jumping:"10", stamina:"8", vision:"10", confidence:"10", blocking:"8", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"10"},
	c_pass_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	c_run_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	c_special_teamerr:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	c_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	g_pass_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	g_run_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	g_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	ot_run_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	ot_pass_blocker:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"8", kicking:"8", punting:"8"},
	ot_special_teamer:{strength:"10", speed:"10", agility:"10", jumping:"8", stamina:"10", vision:"10", confidence:"10", blocking:"10", throwing:"8", catching:"8", carrying:"8", tackling:"10", kicking:"8", punting:"8"},
	de_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 8, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    dt_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 8, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting": 8},
    c_none:{strength : 10, blocking : 10, speed : 8, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 8, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting": 8},
    g_none:{strength : 10, blocking : 10, speed : 8, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 8, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    ot_none:{strength : 10, blocking : 10, speed : 8, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 8, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    hb_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    wr_none:{strength : 8, blocking : 8, speed : 10, tackling : 8, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    te_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    fb_none:{strength : 10, blocking : 10, speed : 8, tackling : 10, agility : 10, throwing : 8, jumping : 8, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    qb_none:{strength : 10, blocking : 8, speed : 10, tackling : 8, agility : 10, throwing : 10, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    lb_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    cb_none:{strength : 10, blocking : 8, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    ss_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    fs_none:{strength : 10, blocking : 10, speed : 10, tackling : 10, agility : 10, throwing : 8, jumping : 10, catching : 10, stamina : 10, carrying : 10, vision : 10, kicking : 8, confidence : 10, "punting" : 8},
    p_none:{strength : 10, blocking : 8, speed : 10, tackling : 8, agility : 10, throwing : 10, jumping : 10, catching : 8, stamina : 8, carrying : 8, vision : 10, kicking : 8, confidence : 10, "punting" : 10},
    k_none:{strength : 10, blocking : 8, speed : 10, tackling : 8, agility : 10, throwing : 10, jumping : 10, catching : 8, stamina : 8, carrying : 8, vision : 10, kicking : 10, confidence : 10, "punting" : 8}
		
}

var trainingStatus = {};
var trainingUpgrades = {};


function reset() {
    // remove the submit button to prevent any real SP spending
    var s = document.getElementById('submit');
    s.innerHTML = "Submit button removed by the GLB Player Builder Script. Refresh the page to get it back.";

    //remove the current player's name to be less confusing
    document.getElementById("player_vitals").childNodes[1].innerHTML = "Simulated Player | Position: "+getPosition();

    if (getIsBuildFromScratch()) {
        //var tmpSP = 157;
        var tmpSP = 157-8;
        for (k in minimums[getPosition()]) {
            setAtt(k, minimums[getPosition()][k]);
            tmpSP -= minimums[getPosition()][k];
    
            //reset the training status to 0%
            setTrainingStatus(k, 0);
        }
        setTP(8);
        setXP(0);
        setDay(1);
        setAge(0);
        setLevel(-1);
        setVA(0);
        setVAXP(0);
        setSP(tmpSP);
        setBoosts(0);
        setBonusTokens(12);
        resetSAs();
    	resetTrainingUpgrades();
		setBoostCount(0);
    }
    if (getAge() < plateau_age) {
    	// no need to show button for plateau players
    	turnOnGameXP();
    }
    enableOddDayGames();
    setDesiredBT(0);
    setSeason(0);
	//loadBoostCount(); // Need a routine to pull number of boosts from build
	if (getLevel() == -1 || !automaticSeasonChange) {
    	GM_addStyle("#startSeasonButton {display: block}");
	}
}

function resetTrainingUpgrades() {
    trainingUpgrades = {};
    for (var t=0; t<attributeTrainingOptions.length; t++) { 
    	trainingUpgrades[attributeTrainingOptions[t]] = {enhance: 0, multi: false};
    }
    disableMultiTraining();
}

function startBuilder() {
    var resetBuild = confirm("Do you want to start the build from scratch or start with this player's level, position, and attributes?\n\nHit OK to reset everything\nHit Cancel to use this player's existing build.");
    setIsBuildFromScratch(resetBuild);
    if (getIsBuildFromScratch()) {
    	//log("Creating a player from scratch is not implemented yet.", true);
    	//return;
        p = requestPosition();
        if (p) {
            GM_addStyle(".playerhead {color: white}");
            GM_addStyle("#startBuilderButton {display: none}");
            GM_addStyle("#trainingDiv {display: block}");
            if (!disableSerialization) {
            	GM_addStyle("#serializeButton {display: block}");
            }
            setPosition(p);
            reset();
            showIntialPointsPrompt();
            startSeasonButton.value = "Pick Height and Weight";
        }
    } else {
		parsePlayerPage();
    }
}

function showIntialPointsPrompt() {
    alert('Spend your initial skill points first.\n\nThis represents your player\'s initial roll.\n\nAll attributes are already set to '+getPosition()+' minimums.');
}
function parsePlayerId() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
    return pid;
}
function dump(txt) {
	if (console.clear) { console.clear(); }
	log(txt);
}

/*
 *  request player profile to get their position, level, current xp
 */
function parsePlayerPage() {
    var playerId = parsePlayerId();
    GM_xmlhttpRequest({
        method: 'GET',
        url: "/game/player.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;
			if (txt.indexOf('<span>Vet Pts:</span>') >-1) {
				var vasplit = txt.split('<span>Vet Pts:</span>');
				va = vasplit[1].substring(vasplit[1].indexOf('>')+1,vasplit[1].indexOf('</a>'));
			} else {
				va=0;
			}
			
			// get player position from the page             
			var positionRegex = /\/archetypes\/(\w+).png/gi;
			var result = positionRegex.exec(txt);
			if (result != null && result.length > 1) {
				var p = result[1];
				if (positionData[p]!=null && minimums[p]) {
					setPosition(p);
					log('Archetype='+p);
				} else {
					log("This player's archetype ["+p+"] is not implemented.", true);
					return;
				}
			} else {
				log("Unable to load the player's archetype", true);
				dump(txt);
				return;
			}
            GM_addStyle(".playerhead {color: white}");
            GM_addStyle("#startBuilderButton {display: none}");
            GM_addStyle("#nextDayButton {display: inline}");
            GM_addStyle("#startSeasonButton {display: none}");
            GM_addStyle("#trainingDiv {display: block}");
        	if (!disableSerialization) {
        		GM_addStyle("#serializeButton {display: block}");
        	}
            GM_addStyle("#printFriendlyButton {display: block}");
            GM_addStyle("#btWarningDiv {display: block}");
             
            // get the training statii (sp?)
            for (k in minimums[getPosition()]) {
                //fix from Bogleg
                var re = new RegExp(k + ' training progress: (\\d+)%', 'i');
                var results = re.exec(txt);
                if (results != null &&
                    results.length > 0 &&
                    !isNaN(parseInt(results[1]))) {
                    setTrainingStatus(k, parseInt(results[1]));
                } else {
                    log('Failed to parse the training status of '+k, true);
                    return;
                }
            }
                 
			// get player creation day
            var creationDayResult = /Season\s+\d+,\s+day\s+(\d+)/gi.exec(txt);
			setCreatedDay(creationDayResult[1]);
		
             var ageRegExResult = /(\d+)d old/gi.exec(txt);
             setAge(parseInt(ageRegExResult[1]));

             var regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Next Level.*?(\d+)\/1000\D+Vet Pts\D+\d+\D+(\d+)/gi.exec(txt);
             if (regexResult == null) {
                 // player is too low level to have VAs
                 regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Next Level.*?(\d+)\/1000\D+/gi.exec(txt);
             }
             if (regexResult == null) {
                 // player is too old, that last regex fails for plateau players that don't have 'Next Level'
                 regexResult = /player_points_value\D*(\d+)\D*(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Remaining XP/gi.exec(txt);
             }
             setLevel(parseInt(regexResult[1]));
             setSP(parseInt(regexResult[2]));
             setTP(parseInt(regexResult[3]));
             setBonusTokens(parseInt(regexResult[4]));
             if (regexResult[5] != null) {
             	setXP(parseInt(regexResult[5]));               
             } else {
                 setXP(0);
             }
             if (regexResult[6] != null) {
                 setVA(parseInt(regexResult[6]));                 
             } else {
                 setVA(0);
             }

             // get the current day and reset the rest
             requestCurrentDay();
        }
    });
}

/*
    parses the day and player xp from the agent's homepage
*/
function requestCurrentDay() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://goallineblitz.com/game/home.pl",
        headers: commonHeaders,
        onload: function(responseDetails) {
             var txt = responseDetails.responseText;

             // first just get to the player section
             var playersplit = txt.split('<div id="players">')[1];
             // now look for players, assuming the grid style
             var stopTryingGridStyle = false;
             vasplit = playersplit.split('\/game\/player\.pl\?player\_id\='+playerId+'"')[1];
             vasplit = vasplit.split('<div class="player_xp">')[2];
             if (vasplit != null) {
                 vasplit = vasplit.substring(0, vasplit.indexOf('</div>'));
                 vaxp = vasplit.substring(0,vasplit.indexOf('/'));
             } else {
                 // the homepage must be using the list style, try parsing like that
                 // split off anything before the player's row in the list
                 vasplit = playersplit.split('\/game\/player\.pl\?player\_id\='+playerId+'"')[1];
                 vasplit = vasplit.split('\<td class\=\"list_vxp"\>')[1];
                 vasplit = vasplit.substring(0, vasplit.indexOf('</td>'));
                 if (vasplit != null) {
                     vaxp = vasplit;
                 } else {
                     alert('failed to retrieve VA XP from the agent\'s homepage');
                 }
             }
             setVAXP(parseInt(vaxp));

             txt = txt.slice(txt.indexOf(', Day ')+5);
             var d = txt.substring(0,txt.indexOf('</div>'));
             setDay(parseInt(d));
			loadTrainingUpgrades();
        }
    });
}

function loadTrainingUpgrades() {
	resetTrainingUpgrades();
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://goallineblitz.com/game/bonus_tokens.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;
			var enhanceRegex = /<img.*stars_level_(\d+).*enhanced_(\w+)_level.*>/gi;
			var done = false;
			while (!done) {
				result = enhanceRegex.exec(txt);
				if (result==null) {
					done = true;
				} else {
					trainingUpgrades[result[2]].enhance = parseInt(result[1])*10;
				}	
			}
			// get attributes available for multi training
			var multiRegex = /<img.*secondary_(\w+)_level.*star_full.*>/gi;
			done = false;
			while (!done) {
				result = multiRegex.exec(txt);
				if (result==null) {
					done = true;
				} else {
					// add the new attribute option to the 3 drop downs and 
					// enable the multi training type if this is the first one enabled
					enableMultiTrainAttribute(result[1]);
				}	
			}
			// attributes not available for training
			var notMultiRegex = /<img.*secondary_(\w+)_level.*star_empty.*>/gi;
			done = false;
			while (!done) {
				result = notMultiRegex.exec(txt);
				if (result==null) {
					done = true;
				} else {
					trainingUpgrades[result[1]].multi = false;
				}	
			}
			loadAvailableBoosts();
			loadBoostCount() ;
        }
    });
}
/*
 * 
 */
function loadAvailableBoosts() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://goallineblitz.com/game/boost_player.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;
			var availableBoostsRegex = /Available Level Ups\D+(\d+)/gi;
			var result = availableBoostsRegex.exec(txt);
			if (result!=null && result.length>1) {
				log('available boosts = '+result[1]);
				setBoosts(result[1]);
			} else {
				log("Failed to load the player's remaining boosts for this season. Defaulting to use the maximum.", true);
				setBoosts(max_boosts_per_season);
			}
			reset();
        }
    });
}
	
function loadBoostCount() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://goallineblitz.com/game/xp_history.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt2 = responseDetails.responseText;
			var boostCountRegex = /[0-9] Boosts x 1000 =\D+(\d+)/gi;
			var result2 = boostCountRegex.exec(txt2);
			if (result2!=null && result2.length>1) {
				log('boost count = '+(result2[1]/1000));
				setBoostCount(parseInt((result2[1]/1000)));
			} else {
				log(result2 + " Failed to load the player's current boost count. Defaulting to 0.", true);
				setBoostCount(0);
			}
			reset();
        }
    });
}
function promptForHeight() {
    var h = 100;
    var max = positionData[getPosition()].heightOptions;
    // keep trying until they hit cancel or get in range
    while (h!=null && (h > max || h < (-1 * max))) {
        h = prompt("Enter the player's relative height.\n\nMust be a number ranging from -"+max+" to "+max+".\n\n-"+max+" = shortest possible height for your position\n"+max+" = tallest possible height for your position.");
    }
    h = Math.round(h / max * 2 * 100) / 100;
    return h;
}
function promptForWeight() {
    var w = 100;
    var max = positionData[getPosition()].weightOptions;
    // keep trying until they hit cancel or get in range
    while (w != null && (w > max || w < (-1 * max))) {
        w = prompt("Enter the player's relative weight.\n\nMust be a number ranging from -"+max+" to "+max+".\n\n-"+max+" = lightest possible weight for your position\n"+max+" = heaviest possible weight for your position.");
    }
    w = Math.round(w / max * 2 * 100)/100;
    return w;
}

/*
    return true if all the attributes are below 26. duh.
*/
function allAttributesUnder26() {
    for (k in minimums[getPosition()]) {
        if (getAtt(k) > 25) {
            alert("Can't start with an attribute above 25. \n\nLower your "+k+" to continue.");
            return false;
        }
    }
    return true;
}
function isDefender() {
    var result = /(\w+)\_/gi.exec(getPosition());
    if (result != null && result.length>0 && result[1]!=null) {
        var defenders = ['wr','qb','fb','hb','te','c','g','ot','p'];
        for (var i=0;i < defenders.length; i++) {
            if (result[i]==defenders[i]) {
                return true;
            }
        }
    } else {
        log('bug: can\'t tell if this position is a defender: '+getPosition()+' assuming not a defender so blocking will be effected by weight, not tackling.', true);
    }
    return false;
}
function startSeason() {
    if (getLevel() < 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    if (getLevel() < 0 && getSP()==0) {
        if (!allAttributesUnder26()) {
            return;
        }
        var height = promptForHeight();
        if (height == null) { return; }
        var weight = promptForWeight();
        if (weight == null) { return; }
        // height adjustments        
        setAtt("jumping", getAtt("jumping") + height);
        setAtt("vision", getAtt("vision") + height);
        setAtt("agility", getAtt("agility") - height);
        setAtt("stamina", getAtt("stamina") - height);
        // weight adjustments
        setAtt("strength", getAtt("strength") + weight);
        if (isDefender()) {
            setAtt("tackling", getAtt("tackling") + weight);
        } else {
            setAtt("blocking", getAtt("blocking") + weight);
        }
        setAtt("speed", getAtt("speed") - weight);
        setAtt("stamina", getAtt("stamina") - weight);
        startSeasonButton.value = "Start Season";
        // using level as a 'state' until the intializing is done and it goes above 0
        // -1 means it still needs to assign the starting SP and then pick Height/Weight
        // 0 means the height and weight have been picked, and they need to pick a start day for the season
        commitSPSpending();
        setLevel(0);
    }
    if (getLevel() > 0 && getDay() < 41) {
        alert('You havent finished this season yet.\n\nWait until day 41 to start a new season');
        return;
    }
    // find out how many days of training before games start
    // skip this if using automatic season change and it's not a new player
    // for automatic season change, it will default to the preseason length
    var startDay = (0-preseasonLength);
    if (getLevel()==0 || !automaticSeasonChange) {
    	startDay = prompt("Enter a day to start on.\n\nDay 0 will ensure you get the first daily experience of the season and the first game xp.\nAll games are run on odd days.\n\nDay 31 would start you after the last game of the season has been run.\nThe transition from day 39 to 40 is the last daily experience of the season.\n\nEnter negative days to accrue training points before games start.");
    	startDay = parseInt(startDay);
    }
    if (isNaN(startDay)) {
        alert('Invalid start day');
    } else if (startDay == null) {
        return;
    } else {
        commitSPSpending();
        setBoosts(max_boosts_per_season);
        setDay(startDay);
        setSeason(season+1);
        startSeasonButton.value = "Next Season";
        if (getLevel() == 0) {
            setSP(getSP() + 15);
            setLevel(1);
            setXP(0);
        }
        GM_addStyle("#nextDayButton {display: inline}");
        GM_addStyle("#printFriendlyButton {display: block}");
        GM_addStyle("#btWarningDiv {display: block}");
        GM_addStyle("#startSeasonButton {display: none}");
    }
}

function requestPosition() {
    var msg = "Valid positions: \n";
    for (k in positionData) {
        msg += k+" | ";
    }
    var p = prompt("Enter a Position\n\n"+msg);
    if (p == null || (positionData[p] != null && minimums[p] != null)) {
        return p;
    }
    alert('Invalid position entered: '+p+'\n\n'+msg);
    return requestPosition();
}

var dailyXP = {
    1 : [50,625],
    2 : [50,625],
    3 : [50,625],
    4 : [50,625],
    5 : [50,625],
    6 : [50,625],
    7 : [50,625],
    8 : [50,625],
    9 : [50,625],
    10 : [50,625],
    11 : [50,625],
    12 : [50,625],
    13 : [50,625],
    14 : [50,625],
    15 : [50,625],
    16 : [50,500],
    17 : [50,500],
    18 : [50,500],
    19 : [50,500],
    20 : [50,500],
    21 : [50,500],
    22 : [50,500],
    23 : [50,500],
    24 : [50,500],
    25 : [50,500],
    26 : [50,500],
    27 : [50,500],
    28 : [50,500],
	29 : [50,500],
	30 : [50,500],
	31 : [50,500],
	32 : [50,375],
	33 : [50,375],
	34 : [50,375],
	35 : [50,375],
	36 : [50,375],
	37 : [50,375],
	38 : [50,375],
	39 : [50,375],
	40 : [50,375],
	41 : [25,375],
	42 : [25,375],
	43 : [25,375],
	44 : [25,375],
	45 : [25,375],
	46 : [25,375],
	47 : [25,375],
	48 : [25,375],
	49 : [25,375],
	50 : [25,375],
	51 : [25,375],
	52 : [25,375],
	53 : [25,250],
	54 : [25,250],
	55 : [25,250],
	56 : [25,250],
	57 : [25,250],
	58 : [25,250],
	59 : [25,250],
	60 : [25,250],
	61 : [25,250],
	62 : [25,250],
	63 : [25,250],
	64 : [25,250],
	65 : [25,250],
	66 : [25,250],
	67 : [25,250],
	68 : [25,250],
	69 : [25,125]
}
var dailyvaxp = {
    25 : 150,
    26 : 150,
    27 : 150,
    28 : 150,
    29 : 150,
    30 : 250,
    31 : 250,
    32 : 250,
    33 : 250,
    34 : 250,
    35 : 300,
    36 : 300,
    37 : 300,
    38 : 300,
    39 : 300,
    40 : 325	
}

var maxLevelPerBoost = {
	79 : 30,
	78 : 29,
	77 : 28,
	76 : 27,
	75 : 26,
	74 : 25,
	73 : 24,
	72 : 23,
	71 : 22,
	70 : 21,
	69 : 20,
	68 : 19,
	67 : 18,
	66 : 17,
	65 : 16,
	64 : 15,
	63 : 14,
	62 : 13,
	61 : 12,
	60 : 11
}

function incrementDay() {
	var requiredBoosts = maxLevelPerBoost[getLevel()]

	nextDayButton.disabled=true;
    if (getLevel() == 0 && getSP() > 0) {
        showIntialPointsPrompt();
		nextDayButton.disabled=false;
        return;
    }
    if (getAge() >= extended_plateau_age) {
	    if ((getLevel()+getBoosts()) < 79) {
	    	// plateau players can boost to 79
	    	var addedBoosts = Math.min(79-getBoosts()-getLevel(), 3);
	    	setBoosts(getBoosts()+ addedBoosts);
	    }
    	log("You've hit the extended plateau, no point in incrementing the days any further.", true);
		nextDayButton.disabled=false;
    	return;
    }
    // save this build incase it needs to be restored
    backupBuild();
    if (automaticSeasonChange && (getDay() >= (offseasonLength+40))) {
    	startSeason();
    } else {
    	setDay(getDay()+1);
    }
    setTP(getTP()+training_points_per_day);

    // daily xp if not in offseason
    if (getDay() > 0 && getDay() < 41) {
        if (getLevel()>39) {
            increaseVAXP(va_xp_factor * 325);
        } 
		else if (getLevel()>24 && getLevel() < 40){
            increaseVAXP(va_xp_factor * dailyvaxp[getLevel()]);
        }
        if (getAge()<plateau_age) {
			if (boost_count <= maxLevelPerBoost[getLevel()]) {
				increaseXP(0)
			} else if (getLevel()<41) {
                increaseXP(daily_xp_factor * dailyXP[getLevel()][0]);
            } else {
                increaseXP(daily_xp_factor * 25);
            }
        }

        // in season, the day counts towards the player's age
        // small oddity, for new players(before their first season)
        // if they were created before day 41 and after day 0, the rollover from day0->1 will age them one day
        // if they were created after day 40, in the offseason, they will not age on that rollover from day 0->1
        if (getAge()!=0 || getDay()!=1 || getCreatedDay()>=41 || getCreatedDay()<=0) {
        	setAge(getAge()+1);
        }
    }

    // game xp, every other day for days 1-31 games
    if (boost_count <= maxLevelPerBoost[getLevel()]) {
		increaseXP(0) } else if (getDay() > 0 && getDay() <= 32) {
			if ((getDay()%2 == 1 && getGamesOnOddDays()) || (getDay()%2 == 0 && !getGamesOnOddDays())) {
				if (getAge()<plateau_age) {
					if (getLevel()<70) {
						increaseXP(game_xp_factor * dailyXP[getLevel()][1]);
					} else {
						increaseXP(game_xp_factor * 125);
					}
				}
			}
		}

    if (autoTrain) {
        train();
    }

    if (getDay() > 39 && !automaticSeasonChange) {    	
        GM_addStyle("#startSeasonButton {display: block}");
    }

    commitSPSpending();
    
	nextDayButton.disabled=false;    
}

var backupBuildStack = new Array();
function clearBackups() {
    while (backupBuildStack.length>0) {
        backupBuildStack.pop();
    }
    GM_addStyle("#previousDayButton {display: none}");
}
function backupBuild() {
    var b = serializeBuild();
    backupBuildStack.push(b);
    GM_addStyle("#previousDayButton {display: inline}");
}
function restoreBuild() {
    GM_addStyle("#previousDayButton {display: none}");
    var tmp = backupBuildStack.pop();
    if (tmp != null) {
        loadBuild(tmp);
    } else {
        log('Can\'t back up anymore', true);
    }
    if (backupBuildStack.length > 0) {
        GM_addStyle("#previousDayButton {display: inline}");
    }
}

/*
 * click handler for the button to buy training enhancements
 */
 
function enhanceTraining() {
	var promptMsg = 'Enter an attribute to enhance.';
		for (var a=0; a<attributeTrainingOptions.length; a++) {
		var att = attributeTrainingOptions[a];
		var current = trainingUpgrades[att].enhance;
		var btcost = 0;
		if (current == 0) btcost = 6;
		else if (current == 10) btcost = 12;
		else if (current == 20) btcost = 18;
		else if (current == 30) btcost = 24;
		else if (current == 40) btcost = 30;
		if (current<50) {
			//promptMsg += '\n'+att+"\t"+(att!="confidence"?"\t":"")+current+"% > "+(current+10)+"%\tCost:"+ (current+10)/2 +" BT";
			promptMsg += '\n'+att+"\t"+(att!="confidence"?"\t":"")+current+"% > "+(current+10)+"%\tCost:"+ btcost +" BT";
		} else {
			promptMsg += '\n'+att+"\t\tMAXED OUT at "+current+"%";
		}
	}
	var found = false;
	var chosenAttribute = null;
	while (!found) {	
		var chosenAttribute = prompt(promptMsg);
		if (chosenAttribute == null) {
			// they hit cancel
			return;
		}
		chosenAttribute = chosenAttribute.toLowerCase();
		var found = false;
		for (var a=0; a<attributeTrainingOptions.length; a++) {
			if (attributeTrainingOptions[a]==chosenAttribute) {
				found = true;
			}
		}
		if (!found) {
			log('['+chosenAttribute+'] is not a valid attribute option', true);
		} else if (trainingUpgrades[att].enhance >= 50) {
			// that attribute is already maxed out
			found = false;
			log('Can not enhance ['+chosenAttribute+'] past 50%', true);
		}
	}
	// CHECK THIS SECTION TO ENSURE BTs ARE REMOVED CORRECTLY!
	//var cost = (trainingUpgrades[chosenAttribute].enhance+10)/2;
	//var b=0; a<attributeTrainingOptions.length;
	//var att1 = attributeTrainingOptions[b];
		var current1 = trainingUpgrades[chosenAttribute].enhance;
	var cost = 0;
		if (current1 == 0) cost = 6;
		else if (current1 == 10) cost = 12;
		else if (current1 == 20) cost = 18;
		else if (current1 == 30) cost = 24;
		else if (current1 == 40) cost = 30;
	if (cost <= getBonusTokens()) {
		setBonusTokens(getBonusTokens()-cost);
		trainingUpgrades[chosenAttribute].enhance = trainingUpgrades[chosenAttribute].enhance+10;
		log("Enhanced "+chosenAttribute+" to "+trainingUpgrades[chosenAttribute].enhance+"%");
	} else {
		log("You don't have enough bonus tokens to enhance "+chosenAttribute+" further. You need "+cost+".", true);
	}
}

/**
 * click handler for the button to add buy multi train attributes
 */
function multiTraining() {
	var promptMsg = 'Enter an attribute to allow in multi-training.';
	var nonMultis = getListOfNonMultiTrainAttributes();
	if (nonMultis.length == 0) {
		log('No attributes left to allow for multi training', true);
		return;
	}
	for (var a=0; a<nonMultis.length; a++) {
		var att = nonMultis[a];
		promptMsg += '\n'+att;
	}
	
	//var cost = 5 + getListOfMultiTrainAttributes().length*5;
	var cost = (getListOfMultiTrainAttributes().length + 1) * 6;
	promptMsg += '\n\n Cost: '+cost+' Bonus Tokens';
	
	var chosenAttribute = prompt(promptMsg);
	if (chosenAttribute == null) {
		// they hit cancel
		return;
	}
	chosenAttribute = chosenAttribute.toLowerCase();
	var found = false;
	for (var a=0; a<nonMultis.length; a++) {
		if (nonMultis[a]==chosenAttribute) {
			found = true;
		}
	}
	if (!found) {
		log('['+chosenAttribute+'] is not a valid attribute option', true);
	} else if (cost>getBonusTokens()) {
		log('You don\'t have enough bonus tokens. Need '+cost, true);
	} else {
		setBonusTokens(getBonusTokens()-cost);
		enableMultiTrainAttribute(chosenAttribute);
	}
}
/*
    prevents accidentally lowering the SP spent too much
*/
function commitSPSpending() {
    for (k in minimums["qb_pocket_passer"]) {
        document.getElementById('modifier_' + k).innerHTML = 0;
        document.getElementById('hidden_' + k).value = 0;
    }
    // update the next cap tooltips
    installCapTips();
}
/*
 * return map of valid training types
 * 
 */
 
 // TODO - Figure out the calculations in the multi-train section
function getValidTrainingTypes() {
	// calc max gain not including the next training
	var maxPossible = calcMaxPossibleBTGain();
	
	var validTrainingTypes = {
		intense : false,
		normal : false,
		light : false,
		multi4 : false,
		multi3 : false,
		multi2 : false
	}; 
	var neededFromNextTrain = getDesiredBT() - (maxPossible+getBonusTokens());
	if (neededFromNextTrain > 6) {
		// can't make the goal
		return validTrainingTypes;
	} else if (neededFromNextTrain == 6) {
		validTrainingTypes.light = true;
	} else if (neededFromNextTrain == 4) {
		validTrainingTypes.light = true;
		validTrainingTypes.normal = true;
	} else if (neededFromNextTrain == 2) {
		validTrainingTypes.light = true;
		validTrainingTypes.normal = true;
		validTrainingTypes.intense = true;
	} else if (neededFromNextTrain <= 0) {
		validTrainingTypes.light = true;
		validTrainingTypes.normal = true;
		validTrainingTypes.intense = true;
	}
	// see if any multi training can be done
	var maxBTGain_multi4 = maxPossible - 12;
	var neededFromNext4Trains = getDesiredBT() - (maxBTGain_multi4+getBonusTokens());
	if (neededFromNext4Trains <= 12) {
		validTrainingTypes.multi4 = true;
	}
	var maxBTGain_multi3 = maxPossible - 9;
	var neededFromNext3Trains = getDesiredBT() - (maxBTGain_multi3+getBonusTokens());
	if (neededFromNext3Trains <= 8) {
		validTrainingTypes.multi3 = true;
	}
	var maxBTGain_multi2 = maxPossible - 6;
	var neededFromNext2Trains = getDesiredBT() - (maxBTGain_multi2+getBonusTokens());
	if (neededFromNext2Trains <= 4) {
		validTrainingTypes.multi2 = true;
	}
	return validTrainingTypes;
}

/*
 * find out how many BTs you can gain if you train on light for the rest of your career
 */
function calcMaxPossibleBTGain() {	
	var a = getAge();
	var d = getDay();
	var trainingDaysLeft = getTP()/2;
	while (a < plateau_age) {
		// use constants for the length of the offseason and preseason
		d++;
		if (d>(40+offseasonLength)) {
			d = (0-preseasonLength);
		}
		if (d>0 && d<41) {
			a++;//seasonal day, add age
		}
		trainingDaysLeft++;
	}
	return trainingDaysLeft*6;
}
 
/*
 * start here for doing training, it decides if it needs to do multi or single training,
 * and also checks to see if the BT goal can be reached with the current training selections
 */
function train() {
	// don't allow training for new player yet
    if (getLevel() == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    var trainingType = document.getElementById('trainingSelect').value;
    var validTrainings = getValidTrainingTypes();
    if (trainingType==TRAININGTYPE.MULTI) {
    	if (!enableDesiredBTCheck || ((getMultiTrainCount()==2 && validTrainings.multi2) || 
    		(getMultiTrainCount()==3 && validTrainings.multi3) ||
    		(getMultiTrainCount()==4 && validTrainings.multi4))) {
    		multiTrain();
    	} else {
    		log("Training skipped. You can not multi train "+getMultiTrainCount()+" attributes and still reach your BT goal", true);
    		return;
    	}
    } else {
    	if (singleTrainSelect.value == "") {
    		log("Need to select an attribute to train", !autoTrain);
    		return;
	    }
	    if (!enableDesiredBTCheck || (trainingType==TRAININGTYPE.INTENSE && validTrainings.intense ||
	    	trainingType==TRAININGTYPE.NORMAL && validTrainings.normal ||
	    	trainingType==TRAININGTYPE.LIGHT && validTrainings.light)) {
            singleTrain();
	    } else {
	    	log("Training skipped. You can not do the selected training and still reach your BT goal.", true);
	    	return;	
	    }
    }
    updateTrainingPrediction();
}
/**
 * Gives an alert with the training gains that would occur in the next training
 */
function updateTrainingPrediction() {
    var trainingType = document.getElementById('trainingSelect').value;
    if (trainingType==TRAININGTYPE.MULTI) {
        var attsToTrain = []
        if (multiTrainSelect1.value != "") attsToTrain.push(multiTrainSelect1.value);
        if (multiTrainSelect2.value != "") attsToTrain.push(multiTrainSelect2.value);
        if (multiTrainSelect3.value != "") attsToTrain.push(multiTrainSelect3.value);
        if (multiTrainSelect4.value != "") attsToTrain.push(multiTrainSelect4.value);
        if (attsToTrain.length < 2) {
            trainPredictionSpan.innerHTML = "Need to choose at least 2 attributes to multi train";
            return;
        }
        var multiplier = 0;
    	if (attsToTrain.length==2) multiplier = 1.05;
        else if (attsToTrain.length==3) multiplier = 1.2;
        else multiplier = 1.3;
        var logMsg = '<b>Multi Train Prediction</b><br/>';
    	for (var a=0; a<attsToTrain.length; a++) {
            var gain = calculateTrainingGain(attsToTrain[a], TRAININGTYPE.MULTI, multiplier);
            logMsg += attsToTrain[a]+' : '+gain+'%';
            logMsg += getTrainingWarningMsg(attsToTrain[a], gain);
        }
        trainPredictionSpan.innerHTML = logMsg;
    } else {
        var light = calculateTrainingGain(singleTrainSelect.value, TRAININGTYPE.LIGHT);
        var normal = calculateTrainingGain(singleTrainSelect.value, TRAININGTYPE.NORMAL);
        var intense = calculateTrainingGain(singleTrainSelect.value, TRAININGTYPE.INTENSE);
        var logMsg = '<b>Single Training Prediction</b><br/>'+singleTrainSelect.value+'<br/>';
        logMsg += 'Intense\t: '+intense+'% ';
        logMsg += getTrainingWarningMsg(singleTrainSelect.value, intense);
        logMsg += 'Normal\t: '+normal+'% ';
        logMsg += getTrainingWarningMsg(singleTrainSelect.value, normal);
        logMsg += 'Light\t\t: '+light+'% ';
        logMsg += getTrainingWarningMsg(singleTrainSelect.value, light);
        trainPredictionSpan.innerHTML = logMsg;
    }
}
/**
 * returns text to append to training predictions
 */
function getTrainingWarningMsg(attName, gain) {
    var ret = '';
    if (getTrainingStatus(attName)+gain < 100) {
        if (getTrainingStatus(attName)+(Math.round(gain*1.1)) >= 100) {
            //ret += ' *** Warning : A training breakthrough could cause rollover.<br/>';
            ret += '<br/>';
        } else {
            ret += '<br/>';
        }
    } else {
        ret += ' *** Training will cause rollover.<br/>';
    }
    return ret;
}

/**
 * Handles all the rounding involved
 * 
 * attName : attribute name
 * 
 * trainingType : TRAININGTYPE.LIGHT, TRAININGTYPE.NORMAL, TRAININGTYPE.INTENSE, TRAININGTYPE.MULTI
 * 
 * multiTrainingMultiplier : 1.05, 1.2, 1.3
 */
/* 
function calculateTrainingGain(attName, trainingType, multiTrainingMultiplier) {
    var attVal = Math.round(getAtt(attName));
    var oldNormalGain = Math.round(75 * Math.exp(-0.038 * (attVal - 1)));
	
	//oldNormalGain = oldNormalGain * 1.6;
	
	oldNormalGain = oldNormalGain * getEnhancement(attName);

    var trainingTypeMultiplier = null;
    if (trainingType==TRAININGTYPE.LIGHT) {            
        trainingTypeMultiplier = 0.4;
    } else if (trainingType==TRAININGTYPE.NORMAL) {
        trainingTypeMultiplier = 0.85;
    } else if (trainingType==TRAININGTYPE.INTENSE || trainingType==TRAININGTYPE.MULTI) {
        trainingTypeMultiplier = 1.2;
    } else {
        alert('something went wrong, calculateTrainingGain() had an invalid training type: ['+trainingType+']');
        return 0;
    };
 
    var ret = Math.round(oldNormalGain * trainingTypeMultiplier * 1.6); 
	
	if (ret == 0) ret = 1;
	
    if (trainingType==TRAININGTYPE.MULTI) {
        ret = Math.round(ret * multiTrainingMultiplier); // multiTrainingMultiplier : 1.05, 1.2, 1.3
		//ret = Math.round(ret * 10) / 10; // This will display the training percent to one decimal place like Bort does
    }
	
    return ret;
}
*/
/*
function calculateTrainingGain(attName, trainingType, multiTrainingMultiplier) {
    var attVal = Math.round(getAtt(attName));
    var oldNormalGain = Math.round(75 * Math.exp(-0.038 * (attVal - 1)))

    var trainingTypeMultiplier = null;
    if (trainingType==TRAININGTYPE.LIGHT) {            
        trainingTypeMultiplier = 0.4;
    } else if (trainingType==TRAININGTYPE.NORMAL) {
        trainingTypeMultiplier = 0.85;
    } else if (trainingType==TRAININGTYPE.INTENSE || trainingType==TRAININGTYPE.MULTI) {
        trainingTypeMultiplier = 1.2;
    } else {
        alert('something went wrong, calculateTrainingGain() had an invalid training type: ['+trainingType+']');
        return 0;
    };
    var ret = Math.ceil(oldNormalGain * trainingTypeMultiplier * 1.6);

    ret = Math.round(ret * getEnhancement(attName));
	
	if (ret == 0) ret = 1;
	
    if (trainingType==TRAININGTYPE.MULTI) {
        ret = Math.round(ret * multiTrainingMultiplier);
    }
    return ret;
}
*/

function calculateTrainingGain(attName, trainingType, multiTrainingMultiplier) {
    var attVal = Math.round(getAtt(attName));
    var oldNormalGain = Math.round(1.6 * 75 * Math.exp(-0.038 * (attVal - 1)))

    var trainingTypeMultiplier = null;
    if (trainingType==TRAININGTYPE.LIGHT) {            
        trainingTypeMultiplier = 0.4;
    } else if (trainingType==TRAININGTYPE.NORMAL) {
        trainingTypeMultiplier = 0.85;
    } else if (trainingType==TRAININGTYPE.INTENSE || trainingType==TRAININGTYPE.MULTI) {
        trainingTypeMultiplier = 1.2;
    } else {
        alert('something went wrong, calculateTrainingGain() had an invalid training type: ['+trainingType+']');
        return 0;
    };
    var ret = Math.round(oldNormalGain * trainingTypeMultiplier);

    ret = Math.round(ret * getEnhancement(attName));
	
	if (ret == 0) ret = 1;
	
    if (trainingType==TRAININGTYPE.MULTI) {
        ret = Math.round(ret * multiTrainingMultiplier);
    }
    return ret;
}
/*
 * get number of attributes being multi trained
 */
function getMultiTrainCount() {
	var count = 0;
	if (multiTrainSelect1.value != "") { count ++; }
	if (multiTrainSelect2.value != "") { count ++; }
	if (multiTrainSelect3.value != "") { count ++; }
	if (multiTrainSelect4.value != "") { count ++; }
	return count;
}
/**
 * applies training gain to the selected attribute
 * 
 * subtracts the TP cost
 * 
 * adds BT gain
 * 
 * attempts to train again if TP remains
 */
function singleTrain() {
	var tpCost = 2;
	if (tpCost > getTP()) {
        if (!autoTrain) {
            log('Not enough training points. Need '+tpCost, true);
        }
    } else {
        var trainingType = document.getElementById('trainingSelect').value;
        var btGain = 0;
        if (trainingType==TRAININGTYPE.LIGHT) btGain = 6;
        else if (trainingType==TRAININGTYPE.NORMAL) btGain = 4;
        else if (trainingType==TRAININGTYPE.INTENSE) btGain = 2;
        var increase = calculateTrainingGain(singleTrainSelect.value, trainingType);

        if (trainAttribute(singleTrainSelect.value, increase)) {
	        setTP(getTP()-tpCost);
	        setBonusTokens(getBonusTokens()+btGain);        
	        // keep training if there's left over TP
	        if (autoTrain) {
	        	train();
	        }
        }
    }
}
/**
 * returns the current enhancement bonus for a given attribute name
 * 
 * ranges from 1.0-1.5
 */
function getEnhancement(attributeName) {
	return (1+(trainingUpgrades[attributeName].enhance / 100 )).toFixed(2);
}
/**
 * applies training gains to the multi trained atributes
 * 
 * subtracts TP cost
 * 
 * adds bonus tokens
 * 
 * loops back to train more if training points remain
 */
function multiTrain() {
	var attsToTrain = [];
    if (multiTrainSelect1.value != "") attsToTrain.push(multiTrainSelect1.value);
    if (multiTrainSelect2.value != "") attsToTrain.push(multiTrainSelect2.value);
    if (multiTrainSelect3.value != "") attsToTrain.push(multiTrainSelect3.value);
    if (multiTrainSelect4.value != "") attsToTrain.push(multiTrainSelect4.value);
	if (attsToTrain.length < 2) {
		log("Need to choose at least 2 attributes to multi train", true);
		return;
	}
	var cost = 2*attsToTrain.length;
	
	if (cost > getTP()) {
        if (!autoTrain) {
            log('Not enough training points. Need '+cost, true);
        }
    } else {
        var multiplier = 0;
    	if (attsToTrain.length==2) multiplier = 1.05;
        else if (attsToTrain.length==3) multiplier = 1.2;
        else multiplier = 1.3;
    	
    	// single train each one with the increased multiplier
    	for (var a=0; a<attsToTrain.length; a++) {
            var increase = calculateTrainingGain(attsToTrain[a], TRAININGTYPE.MULTI, multiplier);
			increase = Math.round(increase * 10) / 10;
	        trainAttribute(attsToTrain[a], increase);
    	}
    	// subtract tp
    	setTP(getTP() - cost);
    	// add bonus tokens
    	//setBonusTokens(getBonusTokens()+((attsToTrain.length-1)*2));
		setBonusTokens(getBonusTokens()+((attsToTrain.length-1)*4));
    	        
        // keep training if there's left over TP
        if (autoTrain) {
        	train();
        }
    }
}

/**
 * increases the attribute's trained amount
 */
function trainAttribute(attribute, increase) {
   if (isNaN(increase)) {
       alert('Pick a different attribute to train.\n\nThis script hasnt defined a training percentage for an attribute that high');
       return false;
   }
    var new_status = increase + getTrainingStatus(attribute);
	new_status = Math.round(new_status * 10) / 10;
    if (new_status >= 200) {
        new_status -= 200;
		new_status = Math.round(new_status * 10) / 10; // this should round the training percent to one decimal place...I am unsure of how formatting will work
        setAtt(attribute, getAtt(attribute)+2);
		} else if (new_status >= 100) {
			new_status -= 100;
			new_status = Math.round(new_status * 10) / 10; // this should round the training percent to one decimal place...I am unsure of how formatting will work
			setAtt(attribute, getAtt(attribute)+1);
    }
    if (logTrainingCalcs) {log("increased "+attribute+" by "+increase+"%");}
    setTrainingStatus(attribute, new_status);
    return true;
}

function increaseXP(addedXP) {
    setXP(xp+addedXP);
	
	if (addedXP == 1000 && boost_count == 25) sp_increase = 26
		else if (addedXP == 1000) sp_increase = 6
		else sp_increase = 5 ;
    
    // level up
    if (xp >= 1000) {
        setXP(xp-1000);
        setLevel(getLevel()+1);
        // add 5 SP
        setSP(getSP() + sp_increase);        
        // add VA points if hitting level 25
        if (getLevel()==25) {
        	setVA(2);
        }
        // add auto gains
        var major;
        var minor;
        if (getLevel()<22) {
            major=2;
            minor=1;
        } else if (getLevel()<30) {
            major = 1.5;
            minor = 0.75;
        } else if (getLevel()<38) {
            major = 1.125;
            minor = 0.5625;
        } else {
            major = 0.84375;
            minor = 0.421875;
        }
        var perMajorAtt = major / positionData[position].majors.length;
        var perMinorAtt = minor / positionData[position].minors.length;
        for (k in positionData[position].majors) {
            var new_value = parseFloat(document.getElementById(positionData[position].majors[k]).innerHTML); 
            new_value += perMajorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            document.getElementById(positionData[position].majors[k]).innerHTML = new_value;
        }
        for (k in positionData[position].minors) {
            var new_value = parseFloat(document.getElementById(positionData[position].minors[k]).innerHTML); 
            new_value += perMinorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            document.getElementById(positionData[position].minors[k]).innerHTML = new_value;
        }
        commitSPSpending();
    }
}

function increaseVAXP(addedXP) {
    setVAXP(vaxp+addedXP);
    
    // level up
    if (vaxp >= 1000) {
        setVAXP(vaxp-1000);
        setVA(va+1);
    }
}

function boost() {
    if (getBoosts() > 0) {
		setBoostCount(boost_count + 1) ;
        setBoosts(getBoosts()-1);
        increaseXP(1000);
		
    }
    updateTrainingPrediction();
}

function spendBT() {
    if (getBonusTokens() > 14) {
        setBonusTokens(getBonusTokens()-15);
        setSP(getSP()+1);
    } else {
        alert('You need 15 Bonus tokens to exchange for 1 SP');
    }
}

function resetSAs() {
    var skilltree = unsafeWindow.skills;
    for (s in skilltree) {
        document.getElementById('skill_level_' + s).innerHTML = 0;
    }
}
function getSerializedBuild() {
    var b = serializeBuild();
    prompt('Save this key and when you want to return to this build, click the \'Load a Saved Build\' button and copy in this key', b); 
}
// COMPLETE TO HERE
function serializeBuild() {
    var b = "";
    //TODO this will need to be changed if archetype names go longer than 22
    b += format(getPosition(), 22);
    b += format(season, 2);
    b += format(getDay(), 3);
    b += format(availableBoosts, 1);
	b += format(boost_count, 2);
    b += format(getLevel(), 2);
    b += format(xp, 3);
    b += format(vaxp, 3);
    b += format(va, 3);
    b += format(getBonusTokens(), 4);
    b += format(getTP(), 3);
    b += format(getSP(), 3);
	b += format(getDesiredBT(), 5);
    // training status for all 14 atts
    for (att in minimums[getPosition()]) {
        b += format(getTrainingStatus(att), 2);
    }
    // all attributes
    for (att in minimums[getPosition()]) {
        b += format(getAtt(att), 6);
    }
    // SA levels for all 10 SAs
    var skilltree = unsafeWindow.skills;
    for (s in skilltree) {
        b += format(document.getElementById('skill_level_' + s).innerHTML, 2);
    }
    b += format(getAge(), 3);
    // save enhanced training
    for (att in minimums[getPosition()]) {
        b += format(trainingUpgrades[att].enhance, 2);
    }
    // save multi training
    for (att in minimums[getPosition()]) {
        b += format(trainingUpgrades[att].multi, 1);
    }
    // save current training type
    b += format(trainingSelect.selectedIndex, 1);

    // save current training attribute(s)
    b += format(singleTrainSelect.selectedIndex, 2);
    b += format(multiTrainSelect1.selectedIndex, 2);
    b += format(multiTrainSelect2.selectedIndex, 2);
    b += format(multiTrainSelect3.selectedIndex, 2);
    b += format(multiTrainSelect4.selectedIndex, 2);

    return b;
}

function getPrintFriendlyText() {
    var b = serializeBuild();
    var pf = "Player Build";
    var index=0;
    pf += "\nPosition:\t"+ getString(b, index, 22);
    index += 22;
    pf += "\nSeason:\t"+getInt(b, index, 2);
    index += 2;
    pf += "\nDay:\t\t"+getInt(b, index, 3);
    index += 3;
    index += 1; 
	pf += "\nBoosts:\t"+getInt(b, index, 2);
    index += 2; 
    pf += "\nLevel:\t"+getInt(b, index, 2);
    index += 2; 
    pf += "\nXP:\t\t"+getInt(b, index, 3);
    index += 3; 
    pf += "\nVA XP:\t"+getInt(b, index, 3);
    index += 3;
    pf += "\nVA:\t\t"+getInt(b, index, 3);
    index += 3;
    pf += "\nBonus Tokens:\t"+getInt(b, index, 4);
    index += 4;
    pf += "\nTraining Points:\t"+getInt(b, index, 3);
    index += 3;
    pf += "\nSP:\t\t"+getInt(b, index, 3);
    index += 3;
	index += 5;  // correct???
    pf += "\n\nTraining Status:";
    // training status for all 14 atts
    for (att in minimums[getPosition()]) {
        pf += "\n"+att+" : "+getInt(b, index, 2)+"%";
        index += 2;
    }
    // all attributes
    pf += "\n\nAttributes:";
    for (att in minimums[getPosition()]) {
        pf += "\n"+att+" : "+getFloat(b, index, 6);
        index += 6;
    }
    // SA levels for all 10 SAs
    pf += "\n\nTop SA Tree:\t\t| ";
    for (var i=0; i<5; i++) {
        pf += getInt(b, index, 2) + ' | ';
        index += 2;
    }
    pf += "\nBottom SA Tree:\t| ";
    for (var i=0; i<5; i++) {
        pf += getInt(b, index, 2) + ' | ';
        index += 2;
    }
    pf += "\nAdditional SA Tree:\t| ";
    for (var i=0; i<5; i++) {
    	if (index<b.length) {
        	pf += getInt(b, index, 2) + ' | ';
        	index += 2;
    	}
    }
    log(pf, true);
}

// pad with leading zeros to get the correct length
function format(value, length) {
    var ret = "";
    // pad with zeros if it's too short
    while ((ret+value).length < length) {
        ret += "0";
    }
    // chop off trailing characters if it's too long
    while ((ret+value).length > length) {
        value = (""+value).substr(0,(""+value).length-1);
    }
    return ret+value;
}

function getString(b, start, length) {
    return b.substring(start, start+length).replace(/^0*/g,"");
}
function getInt(b, start, length) {
	var stripped = b.substring(start, start+length).replace(/^0*/g,"");
	return (stripped == "") ? 0 : parseInt(stripped);
}
function getFloat(b, start, length) {
	var stripped = b.substring(start, start+length).replace(/^0*/g,"")
	return (stripped == "") ? 0.0 : parseFloat(stripped);
}

function loadBuild(b) {
    var index=0;
    //TODO this will need to be changed if archetype names go longer than 22
    setPosition(getString(b, index, 22));
    index += 22;
    reset();
    setSeason(getInt(b, index, 2));
    index += 2;
    setDay(getInt(b, index, 3));
    if (automaticSeasonChange || getDay() < 41) {
        GM_addStyle("#startSeasonButton {display: none}");
    }
    index += 3;
    setBoosts(getInt(b, index, 1));
    index += 1;
	setBoostCount(getInt(b, index, 2));
	index += 2;
    setLevel(getInt(b, index, 2));
    index += 2;
    setXP(getInt(b, index, 3));
    index += 3;
    setVAXP(getInt(b, index, 3));
    index += 3;
    setVA(getInt(b, index, 3));
    index += 3;
    setBonusTokens(getInt(b, index, 4));
    index += 4;
    setTP(getInt(b, index, 3));
    index += 3;
    setSP(getInt(b, index, 3));
    index += 3;
	setDesiredBT(getInt(b, index, 5));
	index +=5;
    // training status for all 14 atts
    for (att in minimums[getPosition()]) {
        setTrainingStatus(att, getInt(b, index, 2));
        index += 2;
    }
    // all attributes
    for (att in minimums[getPosition()]) {
        setAtt(att, getFloat(b, index, 6));
        index += 6;
    }
    // SA levels for all 10 SAs
    var skilltree = unsafeWindow.skills;
    for (s in skilltree) {
        document.getElementById('skill_level_' + s).innerHTML = getInt(b, index, 2);
        index += 2;
    }
    setAge(getInt(b, index, 3));
    index += 3;

    resetTrainingUpgrades();
    // load enhanced training
    for (att in minimums[getPosition()]) {
        trainingUpgrades[att].enhance = getInt(b, index, 2);
        index += 2;
    }
    // load multi training attributes
    for (att in minimums[getPosition()]) {
        if (getString(b, index, 1) == 't') {
            enableMultiTrainAttribute(att);
        }
        index += 1;
    }
    // load current training type
    trainingSelect.selectedIndex = getString(b, index, 1);
    trainingTypeChanged(trainingSelect.selectedIndex);
    index += 1;

    // load current training attribute(s)
    singleTrainSelect.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect1.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect2.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect3.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect4.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelectChanged();
    updateTrainingPrediction();

    // TODO something needs to be done to load additional SAs
    GM_addStyle("#nextDayButton {display: inline}");
    GM_addStyle(".playerhead {color: white}");
    GM_addStyle("#startBuilderButton {display: none}");
    GM_addStyle("#trainingDiv {display: block}");
	if (!disableSerialization) {
		GM_addStyle("#serializeButton {display: block}");
	}
    GM_addStyle("#printFriendlyButton {display: block}");
    GM_addStyle("#btWarningDiv {display: block}");
}

function convertBuild(b) {
    var index=183;
	
	var boostsMsg = 'Enter number of boosts from XP History Page';
	
	var boostsEntered = prompt(boostsMsg);
	if (boostsEntered == null) {
		// they hit cancel
		return;
	}
	boostsEntered = boostsEntered
	
	var newAge = getInt(b, index, 3);
	
	var ageConversionFactor = 0 
	
	if (newAge < 19) ageConversionFactor = .9 ;
		else if (newAge < 29) ageConversionFactor = .8 ;
		else if (newAge < 39) ageConversionFactor = .7 ;
		else if (newAge < 79) ageConversionFactor = .65 ;
		else if (newAge < 119) ageConversionFactor = .6 ;
		else if (newAge < 159) ageConversionFactor = .54 ;
		else if (newAge < 199) ageConversionFactor = .56 ;
		else if (newAge < 239) ageConversionFactor = .56 ;
		else if (newAge < 399) ageConversionFactor = .57 ;
		else if (newAge < 400) ageConversionFactor = .6 ;
	
	if (newAge > 440) 
		newAge = newAge - 160;
	else newAge = Math.ceil(newAge * ageConversionFactor);
		
	index = 39 ;
	
	var newBT = Math.round(getInt(b, index, 4) * 1.25) ;
	
	index = 43 ;
	
	var newTP = Math.ceil(getInt(b, index, 3) / 1.6) ;
	
	if (newTP % 2 != 0)
		newTP = newTP + 1;
		
	index = 46 ;
	
	var newSP = getInt(b, index, 3)
	
	if (boostsEntered > 25)
		newSP += 20
	
	newSP += parseInt(boostsEntered)

	index = 0
	
    //TODO this will need to be changed if archetype names go longer than 22
    setPosition(getString(b, index, 22));
    index += 22;
    reset();
    setSeason(getInt(b, index, 2));
    index += 2;
    setDay(getInt(b, index, 3));
    if (automaticSeasonChange || getDay() < 41) {
        GM_addStyle("#startSeasonButton {display: none}");
    }
    index += 3;
    setBoosts(getInt(b, index, 1));
    setBoostCount(boostsEntered);
	index += 1;
    setLevel(getInt(b, index, 2));
    index += 2;
    setXP(getInt(b, index, 3));
    index += 3;
    setVAXP(getInt(b, index, 3));
    index += 3;
    setVA(getInt(b, index, 3));
    index += 3;
    setBonusTokens(newBT);
    index += 4;
    setTP(newTP);
    index += 3;
    setSP(newSP);
    index += 3;
	//setDesiredBT(getInt(b, 0, 5));
    // training status for all 14 atts
    for (att in minimums[getPosition()]) {
        setTrainingStatus(att, getInt(b, index, 2));
        index += 2;
    }
    // all attributes
    for (att in minimums[getPosition()]) {
        setAtt(att, getFloat(b, index, 6));
        index += 6;
    }
    // SA levels for all 10 SAs
    var skilltree = unsafeWindow.skills;
    for (s in skilltree) {
        document.getElementById('skill_level_' + s).innerHTML = getInt(b, index, 2);
        index += 2;
    }
    setAge(newAge);
    index += 3;

    resetTrainingUpgrades();
    // load enhanced training
    for (att in minimums[getPosition()]) {
        trainingUpgrades[att].enhance = getInt(b, index, 2);
        index += 2;
    }
    // load multi training attributes
    for (att in minimums[getPosition()]) {
        if (getString(b, index, 1) == 't') {
            enableMultiTrainAttribute(att);
        }
        index += 1;
    }
    // load current training type
    trainingSelect.selectedIndex = getString(b, index, 1);
    trainingTypeChanged(trainingSelect.selectedIndex);
    index += 1;

    // load current training attribute(s)
    singleTrainSelect.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect1.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect2.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect3.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelect4.selectedIndex = getInt(b, index, 2);
    index += 2;
    multiTrainSelectChanged();
    updateTrainingPrediction();

    // TODO something needs to be done to load additional SAs
    GM_addStyle("#nextDayButton {display: inline}");
    GM_addStyle(".playerhead {color: white}");
    GM_addStyle("#startBuilderButton {display: none}");
    GM_addStyle("#trainingDiv {display: block}");
	if (!disableSerialization) {
		GM_addStyle("#serializeButton {display: block}");
	}
    GM_addStyle("#printFriendlyButton {display: block}");
    GM_addStyle("#btWarningDiv {display: block}");
}

function loadSavedBuild() {
    var b = prompt('Enter the build here');
    if (b) {
        var expectedLength = 246;
        if (b.length==expectedLength) {
            loadBuild(b);
            clearBackups();
        } else {
            alert('Invalid build\nIt\'s missing '+(expectedLength-b.length)+' characters.\n\nMake sure the key was generated using the same version of the script.');
        }
    }
}

function convertSavedBuild() {
    var b = prompt('Enter the build here');
    if (b) {
        var expectedLength = 239;
        if (b.length==expectedLength) {
            convertBuild(b);
            clearBackups();
        } else {
            alert('Invalid build\nIt\'s missing '+(expectedLength-b.length)+' characters.\n\nMake sure the key was generated using the same version of the script.');
        }
    }
}

function promptForDesiredBT() {
	var maxPossible = calcMaxPossibleBTGain()+getBonusTokens();
	var val = prompt('Enter the number of BT you want available on day 280 of your build.\n\nThis will allow you to do multi/normal/intense training up until the point where you absolutely have to switch to light training in order to reach your BT goal.\n\nNote: this calculation tries to figure out how many training days you have left by assuming a '+offseasonLength+' day offseason and '+preseasonLength+' day preseason. So if you\'re going to stick to this calculation, I\'d recommend setting the BT goal slightly higher than you really need so you have some buffer in place in case the offseason length changes.\nCurrently, if you spend the rest of your career and all of your current TP in light training, you\'ll end up with: '+(maxPossible)+' BT\n\nEnter zero if you don\'t want this to block your training.\n\nHit cancel to leave the number unchanged.', getDesiredBT()); 
	if (val == null || val =='' || isNaN(val)) {
		return;
	}
	setDesiredBT(val);
	if (val > maxPossible) {
		log("You can not reach that BT goal even if you only do light training for the rest of your career.\nSet a value lower than "+(maxPossible+1), true);
		setDesiredBT(maxPossible);
		promptForDesiredBT();
	}
}
function enableOddDayGames() {
	setGamesOnOddDays(true);
	GM_addStyle("#gameDayOddButton {display: none}");
	GM_addStyle("#gameDayEvenButton {display: block}");
}
function enableEvenDayGames() {
	setGamesOnOddDays(false);
	GM_addStyle("#gameDayOddButton {display: block}");
	GM_addStyle("#gameDayEvenButton {display: none}");	
}
/* start multi training stuff */
function enableMultiTrainAttribute(attribute) {
	if (getListOfMultiTrainAttributes().length==0) {
		enableMultiTraining();
	}
	trainingUpgrades[attribute].multi = true;
	addElement('option', 'mt2'+attribute, multiTrainSelect2, {
		value: attribute,
		innerHTML: attribute,
		disabled: (multiTrainSelect1.value == attribute) ? true : null
	});
	addElement('option', 'mt3'+attribute, multiTrainSelect3, {
		value: attribute,
		innerHTML: attribute,
		disabled: (multiTrainSelect1.value == attribute) ? true : null
	});
	addElement('option', 'mt4'+attribute, multiTrainSelect4, {
		value: attribute,
		innerHTML: attribute,
		disabled: (multiTrainSelect1.value == attribute) ? true : null
	});
}
function enableMultiTraining() {
	var opt = document.getElementById('trainingTypeOption'+TRAININGTYPE.MULTI);
	opt.disabled = false;
}

/*
 cleanup involved with disabling multitraining
*/
function disableMultiTraining() {
	var opt = document.getElementById('trainingTypeOption'+TRAININGTYPE.MULTI);
	opt.disabled = true;
	opt.selected=0;

	// remove the attribute options from the dropdowns but re-add the 'None' options
	multiTrainSelect2.innerHTML='';
	addElement('option', null, multiTrainSelect2, {value: null, innerHTML: 'None'});
	multiTrainSelect2.selectedIndex=0;

	multiTrainSelect3.innerHTML='';
	addElement('option', null, multiTrainSelect3, {value: null, innerHTML: 'None'});
	multiTrainSelect3.selectedIndex=0;

	multiTrainSelect4.innerHTML='';
	addElement('option', null, multiTrainSelect4, {value: null, innerHTML: 'None'});
	multiTrainSelect4.selectedIndex=0;

	// if any of the multi trains were selected, the first multi train dropdown might still have some options disabled
        //TODO enable them here
	for (var i=0; i<multiTrainSelect1.options.length; i++) {
		multiTrainSelect1.options[i].disabled = false;
	}

	trainingTypeChanged(0);
}

function multiTrainSelectChanged() {
	var one = multiTrainSelect1.value;
	var two = multiTrainSelect2.value;
	var three = multiTrainSelect3.value;
	var four = multiTrainSelect4.value;
	// disable the newly selected attribute in the other drop downs
	var multiAtts = getListOfMultiTrainAttributes();
	for (var a=0; a<multiAtts.length; a++) {
		if (multiAtts[a]==one) {
			document.getElementById('mt1'+multiAtts[a]).disabled = null;
			document.getElementById('mt2'+multiAtts[a]).disabled = true;
			document.getElementById('mt3'+multiAtts[a]).disabled = true;
			document.getElementById('mt4'+multiAtts[a]).disabled = true;
		} else if (multiAtts[a]==two) {
			document.getElementById('mt1'+two).disabled = true;
			document.getElementById('mt2'+two).disabled = null;
			document.getElementById('mt3'+two).disabled = true;
			document.getElementById('mt4'+two).disabled = true;
		} else if (multiAtts[a]==three) {
			document.getElementById('mt1'+three).disabled = true;
			document.getElementById('mt2'+three).disabled = true;
			document.getElementById('mt3'+three).disabled = null;
			document.getElementById('mt4'+three).disabled = true;
		} else if (multiAtts[a]==four) {
			document.getElementById('mt1'+four).disabled = true;
			document.getElementById('mt2'+four).disabled = true;
			document.getElementById('mt3'+four).disabled = true;
			document.getElementById('mt4'+four).disabled = null;
		} else {
			document.getElementById('mt1'+multiAtts[a]).disabled = null;
			document.getElementById('mt2'+multiAtts[a]).disabled = null;
			document.getElementById('mt3'+multiAtts[a]).disabled = null;
			document.getElementById('mt4'+multiAtts[a]).disabled = null;
		}
	}
    updateTrainingPrediction();
}
function getListOfMultiTrainAttributes() {
	var result = [];
	for (var att in trainingUpgrades) {
		if (trainingUpgrades[att].multi) {
			result.push(att);
		}
	}
	return result;
}
function getListOfNonMultiTrainAttributes() {
	var result = [];
	for (var att in trainingUpgrades) {
		if (trainingUpgrades[att].multi==null || trainingUpgrades[att].multi != true) {
			result.push(att);
		}
	}
	return result;
}
/* end multi training stuff */

/* getters and setters */
var gameXpOnOddDays = true;
function getGamesOnOddDays() {
	return gameXpOnOddDays;
}
function setGamesOnOddDays(newVal) {
	gameXpOnOddDays = newVal;
}
var createdDay = 0;
function getCreatedDay() {
	return createdDay;
}
function setCreatedDay(newVal) {
	createdDay = parseInt(newVal);
}
//var desiredBT = 0;
function setDesiredBT(newVal) {
	desiredBT = parseInt(newVal);
}
function getDesiredBT() {
	return parseInt(desiredBT);
}
function getPosition() {
    return position;
}
function setPosition(newValue) {
    position = newValue;
}
function getBoosts() {
    return parseInt(availableBoosts);
}
function setBoosts(newValue) {
    availableBoosts = newValue;
    availableBoostsDiv.innerHTML = "Available Boosts: "+availableBoosts
    if (getBoosts() == 0) {
        GM_addStyle("#boostButton {display: none}");
    } else {
        GM_addStyle("#boostButton {display: block}");
        GM_addStyle("#boostButton {display: block}");
    }
}
function setBoostCount(newValue) {
    boost_count = newValue;
    boostCountDiv.innerHTML = "Boost Count: "+boost_count ;
}
function getSP() {
	return parseInt(document.getElementById('skill_points').innerHTML);
}
function setSP(newSP) {
	contentEval("skillPoints="+newSP);
    document.getElementById('skill_points').innerHTML = newSP;    
}
function getTP() {
    return parseInt(tp);
}
function setTP(newTP) {	
    tp = parseInt(newTP);
    currentTPDiv.innerHTML = "TP: "+getTP();
}
function getDay() {
	return parseInt(day);
}
function setDay(newDay) {
    day = parseInt(newDay);
    currentDayDiv.innerHTML = "Day: "+day;
}
function setLevel(newLevel) {
    level = newLevel;
    currentLevelDiv.innerHTML = "Level: "+level;
}
function getLevel() {
	return parseInt(level);
}
function setVAXP(newVAXP) {
    vaxp = newVAXP;
    currentVAXPDiv.innerHTML = "VA XP: "+vaxp+" / 1000";
}
function setVA(newVA) {
    va = newVA;
    currentVADiv.innerHTML = "Vet Points: "+va;
}
function setXP(newXP) {
    xp = newXP;
    currentXPDiv.innerHTML = "XP: "+xp+" / 1000";
}
function setAtt(attribute, newValue) {
    document.getElementById(attribute).innerHTML = newValue;
    installCapTips();
}
function getAtt(attribute) {
    return parseFloat(document.getElementById(attribute).innerHTML);
}
function getTrainingStatus(attribute) {
    return trainingStatus[attribute];
}
function setTrainingStatus(attribute, newValue) {
	//TODO this needs to change for creating players from scratch as the current player's
	// major/minor 'stars' probably need to be dropped
    trainingStatus[attribute] = newValue;

    // display the new value
    var txt = attribute.substring(0,1).toUpperCase() + attribute.substring(1, attribute.length);
    var txt = txt + " "+newValue+"%";
    //document.getElementById(attribute).parentNode.childNodes[1].innerHTML = txt;  
    
    var attributeContainer = document.getElementById(attribute).parentNode;
    for (var i=0; i<attributeContainer.childNodes.length; i++) {
    	var current = attributeContainer.childNodes[i];
    	
    	if (current.className == 'attribute_name') {
    		var indexToEdit = (current.childNodes.length>1) ? 1 : 0;
    		current.childNodes[indexToEdit].childNodes[0].innerHTML = txt;
    	}
    } 
}
// need these style changes so the training percentages will fit inside
// the attribute lines without pushing buttons around
GM_addStyle("div.attribute_name { width: 112px; }");// +12 width
GM_addStyle("div.attribute_value { width: 40px; }");// -6 width
GM_addStyle("div.attribute_name div a { font-size: 11px; }");
GM_addStyle("div.attribute_modifier { width: 28px; }"); // -6 width

function setSeason(newValue) {
    season = newValue;
    currentSeasonDiv.innerHTML = "Season: "+season;
}
function getIsBuildFromScratch() {
    return buildFromScratch;
}
function setIsBuildFromScratch(newValue) {
    buildFromScratch = newValue;
}
var bonusTokens = 0;
function setBonusTokens(newValue) {
    bonusTokens = newValue;
    currentBTDiv.innerHTML = "Bonus Tokens: "+getBonusTokens();
    if (bonusTokens>14) {
        GM_addStyle("#spendBTButton {display: inline}");
    } else {
        GM_addStyle("#spendBTButton {display: none}");
    }
}
function getBonusTokens() {
    return parseInt(bonusTokens);
}
function setAge(newValue) {
    age = newValue;
    currentAgeDiv.innerHTML = "Player Age (Days): "+age;    
    if (age >= plateau_age) {    	
		GM_addStyle("#startGameXPButton {display: none}");
		GM_addStyle("#stopGameXPButton {display: none}");
    }
}
function getAge() {
    return age;
}
function turnOffGameXP() {
    game_xp_factor = 0.0;
    GM_addStyle("#startGameXPButton {display: block}");
    GM_addStyle("#stopGameXPButton {display: none}");
}
function turnOnGameXP() {
    game_xp_factor = 1.0;
    GM_addStyle("#startGameXPButton {display: none}");
    GM_addStyle("#stopGameXPButton {display: block}");
}
//
// next 2 functions were copied from GLB skill points enhancements
// http://userscripts.org/scripts/show/47648
//
function figureNextCaps(curVal) {
	var out = '';
	var cur = curVal;
	var origCost = 0;
	var caps = 4;
	var needed = 0;
	while (caps > 0) {
		cost = parseInt(Math.exp(0.0003 * Math.pow(cur, 2)));
		if (cost > origCost) {
			if (origCost > 0) {
				if (out.length) out += '<br />';
				out += '<b>' + cur + '</b>&nbsp;(' + origCost + '-cap)&nbsp;cost:&nbsp;' + needed + '&nbsp;Skill&nbsp;Point' + ((needed == 1) ? '' : 's');
				--caps;
			}
			origCost = cost;
		}
		needed += cost;
		cur = Math.round((cur + 1) * 100) / 100;
	}
	return out;
}

function installCapTips() {
	var divs = document.getElementById('attribute_list').getElementsByTagName('div');
	for (var div=0; div<divs.length; div++) {
		if (divs[div].className == 'attribute_value') {
			var tip = figureNextCaps(parseFloat(divs[div].innerHTML));
			divs[div].setAttribute('onmouseover', "set_tip('" + tip + "', 0, 1, 1, 1)");
			divs[div].setAttribute('onmouseout', "unset_tip()");
		}
	}
}
//////////////////////////////////////
function log(msg, doAlert) {
	if (doAlert) {
		alert(msg);
	}
	console.log(msg);
}
/*
 * type, id, parentNode, attributes, innerHTML
 */
function addElement(type, id, parentNode, attributes, innerHTML) {
	var e = document.createElement(type);
	e.id = id;
	parentNode.appendChild(e);
	if (attributes!=null) {
		for (var attName in attributes) {
			e[attName] = attributes[attName];
		}
	}
	if (innerHTML!=null) {
		e.innerHTML = innerHTML;
	}
	return e;
}
/*
 * populate the given dropdown with an option for each attribute
 * 
 * use idPrefix to add a prefix to the id, followed by the attribute name. Ex: idPrefixstrength
 */
function fillAttributeDropdown(selectElement, idPrefix) {
	for (var a=0; a<attributeTrainingOptions.length; a++) {
		var id = null;
		if (idPrefix!=null) {
			id = idPrefix+attributeTrainingOptions[a];
		}
		addElement('option', id, selectElement, {
			value : attributeTrainingOptions[a],
			innerHTML: attributeTrainingOptions[a]
		});	
	}
}

/*
 * needed this to access the skillPoints variable on the page
 * firefox would have been ok but this is needed for chrome
 *  
 * from http://wiki.greasespot.net/Content_Script_Injection
 */
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}
