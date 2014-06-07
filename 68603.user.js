// ==UserScript==
// @name           GLB Player Builder v2
// @namespace      monsterkill
// @description    simulate a player's build
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

var autoTrain = true;

// set to true if the you want the first season
// of the build to skip game xp for a super slow
// build type of thing
var sitout_first_season = false;
var game_xp_factor = 1.0;
var daily_xp_factor = 1.0;
var va_xp_factor = 1.0;
var training_points_per_day = 2;
var max_boosts_per_season = 3;
var plateau_age = 400;


////////////////////////////

var containerDiv = document.createElement('div');
// change this if you want the controls somewhere else
document.getElementById("special_abilities").appendChild(containerDiv);

var startBuilderButton = document.createElement('input');
startBuilderButton.id = "startBuilderButton";
startBuilderButton.type = "button";
startBuilderButton.value = "Start Builder";
startBuilderButton.addEventListener("click", startBuilder, true);
containerDiv.appendChild(startBuilderButton);

var nextDayButton = document.createElement('input');
nextDayButton.id = "nextDayButton";
nextDayButton.type = "button";
nextDayButton.value = "Next Day";
nextDayButton.addEventListener("click", incrementDay, true);
containerDiv.appendChild(nextDayButton);
GM_addStyle("#nextDayButton {display: none}");

var loadSavedBuildButton = document.createElement('input');
loadSavedBuildButton.id = "loadSavedBuildButton";
loadSavedBuildButton.type = "button";
loadSavedBuildButton.value = "Load a Saved Build";
loadSavedBuildButton.addEventListener("click", loadSavedBuild, true);
containerDiv.appendChild(loadSavedBuildButton);

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

// level and experience
var currentLevelDiv = document.createElement('div');
currentLevelDiv.id = "currentLevelDiv";
containerDiv.appendChild(currentLevelDiv);
var currentXPDiv = document.createElement('div');
currentXPDiv.id = "currentXPDiv";
containerDiv.appendChild(currentXPDiv);
// stop game xp button
var stopGameXPButton = document.createElement('input');
stopGameXPButton.id = "stopGameXPButton";
stopGameXPButton.type = "button";
stopGameXPButton.value = "Turn Off Game XP";
stopGameXPButton.addEventListener("click", turnOffGameXP, true);
containerDiv.appendChild(stopGameXPButton);
GM_addStyle("#stopGameXPButton {display: none}");
// start game xp button
var startGameXPButton = document.createElement('input');
startGameXPButton.id = "startGameXPButton";
startGameXPButton.type = "button";
startGameXPButton.value = "Turn On Game XP";
startGameXPButton.addEventListener("click", turnOnGameXP, true);
containerDiv.appendChild(startGameXPButton);
GM_addStyle("#startGameXPButton {display: none}");

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
spendBTButton.value = "Spend 4 BT for 1 SP";
spendBTButton.addEventListener("click", spendBT, true);
containerDiv.appendChild(spendBTButton);
GM_addStyle("#spendBTButton {display: none}");

// shopping tokens
var currentSTDiv = document.createElement('div');
currentSTDiv.id = "currentSTDiv";
containerDiv.appendChild(currentSTDiv);

// training
var currentTPDiv = document.createElement('div');
currentTPDiv.id = "currentTPDiv";
containerDiv.appendChild(currentTPDiv);
var trainingDiv = document.createElement('div');
trainingDiv.id = 'trainingDiv';
trainingDiv.innerHTML = '<select id="trainingSelect"></select>';
containerDiv.appendChild(trainingDiv);

var trainButton = document.createElement('input');
trainButton.id = "trainButton";
trainButton.type = "button";
trainButton.value = "Train";
trainButton.addEventListener("click", train, true);
trainingDiv.appendChild(trainButton);
GM_addStyle("#trainButton {display: block}");

var span = document.createElement('span');
span.id="autoTrainSpan";
span.innerHTML = "Auto Train when points are available : ";
trainingDiv.appendChild(span);
var autoTrainBox = document.createElement('input');
autoTrainBox.id = "autoTrainBox";
autoTrainBox.type = "checkbox";
autoTrainBox.innerHTML = "Auto Train";
autoTrainBox.checked = autoTrain;
autoTrainBox.addEventListener("click", function() {
    autoTrain = document.getElementById("autoTrainBox").checked;
}, true);
trainingDiv.appendChild(autoTrainBox);
GM_addStyle("#trainingDiv {display: none}");

var serializeButton = document.createElement('input');
serializeButton.id = "serializeButton";
serializeButton.type = "button";
serializeButton.value = "Generate a key for this build";
serializeButton.addEventListener("click", getSerializedBuild, true);
containerDiv.appendChild(serializeButton);
GM_addStyle("#serializeButton {display: none}");

var printFriendlyButton = document.createElement('input');
printFriendlyButton.id = "printFriendlyButton";
printFriendlyButton.type = "button";
printFriendlyButton.value = "Create Print Friendly text";
printFriendlyButton.addEventListener("click", getPrintFriendlyText, true);
containerDiv.appendChild(printFriendlyButton);
GM_addStyle("#printFriendlyButton {display: none}");

var $ = unsafeWindow.$;
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
    "Pocket QB": {
        majors: ["confidence","throwing","vision"],
        minors: ["agility","stamina","strength", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Deep QB": {
        majors: ["strength","throwing","vision"],
        minors: ["agility","stamina","confidence", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Scrambling QB": {
        majors: ["agility","throwing","vision"],
        minors: ["confidence","speed","strength", "carrying"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Power HB": {
        majors: ["agility","carrying","confidence", "strength"],
        minors: ["jumping","speed","stamina","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Elusive HB": {
        majors: ["agility","carrying","speed", "vision"],
        minors: ["catching","confidence","stamina","strength"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Scat HB": {
        majors: ["agility","catching","speed", "carrying"],
        minors: ["vision","confidence","stamina","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Combo HB": {
        majors: ["carrying","confidence","speed", "strength", "vision"],
        minors: ["agility","catching","stamina","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Running FB": {
        majors: ["agility","carrying","confidence", "strength"],
        minors: ["blocking","speed","stamina","vision"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Blocking FB": {
        majors: ["agility","blocking","strength", "vision"],
        minors: ["carrying","confidence","stamina","speed"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Combo FB": {
        majors: ["agility","carrying","blocking", "strength", "vision"],
        minors: ["carrying","confidence","speed","stamina"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Scat FB": {
        majors: ["agility","catching","speed", "vision"],
        minors: ["blocking","confidence","carrying","jumping"],
        weightOptions: 22,
        heightOptions: 2
    },
    "Speed WR": {
        majors: ["agility","catching","speed", "vision", "confidence"],
        minors: ["carrying","jumping","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Possession WR": {
        majors: ["agility","catching","jumping", "vision", "carrying"],
        minors: ["confidence","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Power WR": {
        majors: ["agility","catching","carrying", "strength", "vision"],
        minors: ["confidence","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Blocking TE": {
        majors: ["agility","blocking","vision", "strength","confidence"],
        minors: ["catching","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Power TE": {
        majors: ["agility","carrying","catching", "strength","confidence"],
        minors: ["vision","speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Speed TE": {
        majors: ["agility","catching","vision", "speed", "carrying"],
        minors: ["blocking","strength","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Combo TE": {
        majors: ["agility","blocking","catching", "strength", "vision"],
        minors: ["jumping","confidence","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Pass OL": {
        majors: ["agility","blocking","confidence", "vision"],
        minors: ["strength", "speed","stamina"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Run OL": {
        majors: ["strength","blocking","confidence", "vision"],
        minors: ["agility", "stamina","speed"],
        weightOptions: 9,
        heightOptions: 3
    },
    "Strength DL": {
        majors: ["agility","strength","tackling", "vision"],
        minors: ["confidence","stamina","speed"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Speed DL": {
        majors: ["agility","speed","vision", "tackling"],
        minors: ["confidence","stamina","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Combo DL": {
        majors: ["speed","strength","vision", "tackling"],
        minors: ["agility","stamina","confidence"],
        weightOptions: 18,
        heightOptions: 3
    },
     "Man Secondary": {
        majors: ["agility","jumping","speed","vision"],
        minors: ["catching","confidence","stamina","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Zone Secondary": {
        majors: ["agility","speed","tackling","vision"],
        minors: ["catching","confidence","jumping","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Hard Hitter Secondary": {
        majors: ["speed","strength","tackling","vision"],
        minors: ["confidence","jumping","agility","stamina"], 
        weightOptions: 18,
        heightOptions: 3
    },
    "Combo Secondary": {
        majors: ["agility","speed","strength","tackling"],
        minors: ["confidence","jumping","stamina","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Coverage LB": {
        majors: ["agility","jumping","speed","vision"],
        minors: ["catching","stamina","strength","tackling"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Blitzing LB": {
        majors: ["agility","jumping","speed","tackling"],
        minors: ["confidence","stamina","strength","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Hard Hitter LB": {
        majors: ["agility","strength","tackling","vision"],
        minors: ["confidence","jumping","speed","stamina"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Combo LB": {
        majors: ["agility","speed","tackling","vision", "confidence"],
        minors: ["jumping","stamina","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Boomer K": {
        majors: ["confidence","kicking","strength"],
        minors: ["jumping","agility","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Finesse K": {
        majors: ["confidence","kicking","vision"],
        minors: ["jumping","agility","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Boomer P": {
        majors: ["confidence","punting","strength"],
        minors: ["jumping","agility","vision"],
        weightOptions: 18,
        heightOptions: 3
    },
    "Finesse P": {
        majors: ["confidence","punting","vision"],
        minors: ["jumping","agility","strength"],
        weightOptions: 18,
        heightOptions: 3
    },
};

// dont rearrange these as this order is used for de-serializing saved builds
var minimums = {
    "Pocket QB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Deep QB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Scrambling QB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Power HB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Elusive HB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Scat HB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo HB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Running FB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Blocking FB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo FB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Scat FB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Speed WR": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Possession WR": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Power WR": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Blocking TE": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Power TE": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Speed TE": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo TE": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Pass OL": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Run OL": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Strength DL": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Speed DL": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo DL": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Man Secondary": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Zone Secondary": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Hard Hitter Secondary": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo Secondary": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Coverage LB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Blitzing LB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Hard Hitter LB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Combo LB": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Boomer K": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Finesse K": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Boomer P": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
    "Finesse P": {"strength" : 10,"blocking" : 10, "speed" : 10,"tackling" : 10, "agility" : 10, "throwing" : 10,"jumping" : 10, "catching" : 10, "stamina" : 10, "carrying" : 10,"vision" : 10,"kicking" : 10,"confidence" : 10,"punting" : 10},
}

var trainingStatus = {};


function reset() {
    // remove the submit button to prevent any real SP spending
    var s = document.getElementById('submit');
    s.innerHTML = "Submit button removed by the GLB Player Builder Script. Refresh the page to get it back.";

    //remove the current player's name to be less confusing
    document.getElementById("player_vitals").childNodes[1].innerHTML = "Simulated Player | Position: "+getPosition();

    if (getIsBuildFromScratch()) {
        var sp = 157;
        for (k in minimums[getPosition()]) {
            setAtt(k, minimums[getPosition()][k]);
            sp -= minimums[getPosition()][k];
    
            //reset the training status to 0%
            setTrainingStatus(k, 0);
        }
        setTP(7);
        setXP(0);
        setDay(1);
        setAge(0);
        setLevel(-1);
        setVA(0);
        setVAXP(0);
        setSP(sp);
        setBoosts(0);
        setBonusTokens(0);
        setShoppingTokens(0);
        resetSAs();
    } else {
        setBoosts(max_boosts_per_season);
    }
    turnOnGameXP();
    setSeason(0);

    // populate training options
    var sel = document.getElementById('trainingSelect');
    sel.innerHTML = "";
    for (k in trainingOptions) {
        var op = document.createElement('option');
        op.value = k;
        var txt = "";
        for (o in trainingOptions[k]) {
            txt += trainingOptions[k][o]+" ";
        }
        op.innerHTML = txt;
        sel.appendChild(op);
    }
    GM_addStyle("#startSeasonButton {display: block}");
}


function startBuilder() {
    var resetBuild = confirm("Do you want to start the build from scratch or start with this player's level, position, and attributes?\n\nHit OK to reset everything\nHit Cancel to use this player's existing build.");
    setIsBuildFromScratch(resetBuild);
    if (getIsBuildFromScratch()) {
        p = requestPosition();
        if (p) {
            GM_addStyle(".playerhead {color: white}");
            GM_addStyle("#startBuilderButton {display: none}");
            GM_addStyle("#trainingDiv {display: block}");
            GM_addStyle("#serializeButton {display: block}");
            setPosition(p);
            reset();
            showIntialPointsPrompt();
            startSeasonButton.value = "Pick Height and Weight";
        }
    } else {
        p = requestPosition();
        if (p) {
            setPosition(p);
            //this request's response should call reset(position);
            parsePlayerPage();
        } else {
            alert('Need a correct archetype to be selected');
        }
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
// request player profile to get their position, level, current xp
function parsePlayerPage() {
    var playerId = parsePlayerId();
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://goallineblitz.com/game/player.pl?player_id="+playerId,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/html,application/xml,text/xml',
        },
        onload: function(responseDetails) {
             var txt = responseDetails.responseText;
             if (txt.indexOf('<span>Vet Pts:</span>') >-1) {
                 var vasplit = txt.split('<span>Vet Pts:</span>');
                 va = vasplit[1].substring(vasplit[1].indexOf('>')+1,vasplit[1].indexOf('</a>'));
             } else {
                 va=0;
             }

             // get player position from the page             
             //TODO reimplement this when archetypes go live
             txt = txt.slice(txt.indexOf('<div class="position ')+'<div class="position '.length);
             var pos = txt.substr(0,txt.indexOf('"'));
             pos = pos.split(' ').join('');

             /*if (positionData[pos] == null || minimums[pos] == null) {
                 alert('Sorry, this position ('+pos+') is not yet implemented');
             } else {
                 setPosition(pos);*/
                 GM_addStyle(".playerhead {color: white}");
                 GM_addStyle("#startBuilderButton {display: none}");
                 GM_addStyle("#nextDayButton {display: block}");
                 GM_addStyle("#startSeasonButton {display: none}");
                 GM_addStyle("#trainingDiv {display: block}");
                 GM_addStyle("#serializeButton {display: block}");
                 GM_addStyle("#printFriendlyButton {display: block}");
                 
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
                         alert('Failed to parse the training status of '+k);
                     }
                 }
                 var ageRegExResult = /(\d+)d old/gi.exec(txt);
                 setAge(parseInt(ageRegExResult[1]));

                 var regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)(?:.|\n)*?Next Level.*?(\d+)\/1000\D+Vet Pts\D+\d+\D+(\d+)/gi.exec(txt);
                 if (regexResult == null) {
                     // player is too low level to have VAs
                     regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)(?:.|\n)*?Next Level.*?(\d+)\/1000\D+/gi.exec(txt);
                 }
                 setLevel(parseInt(regexResult[1]));
                 setSP(parseInt(regexResult[2]));
                 setTP(parseInt(regexResult[3]));
                 setBonusTokens(parseInt(regexResult[4]));
                 setShoppingTokens(parseInt(regexResult[5]));
                 setXP(parseInt(regexResult[6]));
                 if (regexResult[7] != null) {
                     setVA(parseInt(regexResult[7]));                 
                 } else {
                     setVA(0);
                 }

                 // get the current day and reset the rest
                 requestCurrentDay();
             //}
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
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/html,application/xml,text/xml',
        },
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

function startSeason() {
    if (level < 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    if (level < 0 && getSP()==0) {
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
        setAtt("tackling", getAtt("tackling") + weight);
        setAtt("speed", getAtt("speed") - weight);
        setAtt("stamina", getAtt("stamina") - weight);
        startSeasonButton.value = "Start Season";
        // using level as a 'state' until the intializing is done and it goes above 0
        // -1 means it still needs to assign the starting SP and then pick Height/Weight
        // 0 means the height and weight have been picked, and they need to pick a start day for the season
        commitSPSpending();
        setLevel(0);
    }
    if (level > 0 && day < 41) {
        alert('You havent finished this season yet.\n\nWait until day 41 to start a new season');
        return;
    }
    // find out how many days of training before games start
    var startDay = prompt("Enter a day to start on.\n\nDay 0 will ensure you get the first daily experience of the season and the first game xp.\nAll games are run on odd days.\n\nDay 31 would start you after the last game of the season has been run.\nThe transition from day 39 to 40 is the last daily experience of the season.\n\nEnter negative days to accrue training points before games start.");
    startDay = parseInt(startDay);
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
        if (level == 0) {
            setSP(getSP() + 15);
            setLevel(1);
            setXP(0);
        }
        GM_addStyle("#nextDayButton {display: block}");
        GM_addStyle("#printFriendlyButton {display: block}");
        GM_addStyle("#startSeasonButton {display: none}");
    }
}

/*
    prompts for a valid position 
    returns null if cancel is hit 
*/
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
    1 : [100,568],
    2 : [96,540],
    3 : [91,514],
    4 : [87,489],
    5 : [82,464],
    6 : [77,439],
    7 : [73,413],
    8 : [69,388],
    9 : [65,364],
    10 : [61,343],
    11 : [57,339],
    12 : [54,304],
    13 : [51,282],
    14 : [47,270],
    15 : [45,253],
    16 : [42,235],
    17 : [39,216],
    18 : [37,205],
    19 : [34,191],
    20 : [32,184],
    21 : [30,179],
    22 : [28,160],
    23 : [26,147],
    24 : [25,139],
    25 : [25,130],
    26 : [25,119],
    27 : [25,113],
    28 : [25,106]
}
var dailyvaxp = {
    25 : 125,
    26 : 125,
    27 : 125,
    28 : 125,
    29 : 125,
    30 : 150,
    31 : 150,
    32 : 150,
    33 : 150,
    34 : 150,
    35 : 175,
    36 : 175,
    37 : 175,
    38 : 175,
    39 : 175  
}

function incrementDay() {
    if (level == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    setDay(day+1);
    setTP(getTP()+training_points_per_day);

    // daily xp if not in offseason
    if (day > 0 && day < 41) {
        if (level>39) {
            increaseVAXP(va_xp_factor * 200);
        } else if (level>24 && level < 40){
            increaseVAXP(va_xp_factor * dailyvaxp[level]);
        }
        if (getAge()<plateau_age) {
            if (level<29) {
                increaseXP(daily_xp_factor * dailyXP[level][0]);
            } else {
                increaseXP(daily_xp_factor * 25);
            }
        }

        // in season, the day counts towards the player's age
        setAge(getAge()+1);
    }

    // game xp, every other day for days 1-31 games
    if (day > 0 && day%2 == 1 && day <= 32) {
        if (getAge()<plateau_age) {
            if (level<29) {
                increaseXP(game_xp_factor * dailyXP[level][1]);
            } else {
                increaseXP(game_xp_factor * 100);
            }
        }
    }
    if (autoTrain) {
        train();
    }

    if (day > 39) {
        GM_addStyle("#startSeasonButton {display: block}");
    }

    commitSPSpending();    
}

/*
    prevents accidentally lowering the SP spent too much
*/
function commitSPSpending() {
    for (k in minimums["Pocket QB"]) {
        $('modifier_' + k).innerHTML = 0;
        $('hidden_' + k).value = 0;
    }
    // update the next cap tooltips
    installCapTips();
}

var trainingChart = {
    4: 67,
    5: 64,
    6: 62,
    7: 59,
    8: 57,
    9: 55,
    10: 53,
    11: 51,
    12: 49,
    13: 48,
    14: 46,
    15: 44,
    16: 42,
    17: 41,
    18: 39,
    19: 38,
    20: 36,
    21: 35,
    22: 34,
    23: 33,
    24: 31,
    25: 30,
    26: 29,
    27: 28,
    28: 27,
    29: 26,
    30: 25,
    31: 24,
    32: 23,
    33: 22,
    34: 21,
    35: 20,
    36: 19,
    37: 19,
    38: 18,
    39: 17,
    40: 17,
    41: 16,
    42: 15,
    43: 15,
    44: 14,
    45: 14,
    46: 13,
    47: 13,
    48: 12,
    49: 12,
    50: 11,
    51: 11,
    52: 11,
    53: 10,
    54: 9,
    55: 9,
    56: 9,
    57: 8,
    58: 8,
    59: 8,
    60: 8,
    61: 8,
    62: 7,
    63: 7,
    64: 7,
    65: 7,
    66: 6,
    67: 6,
    68: 6,
    69: 5,
    70: 5,
    71: 5,
    72: 5,
    73: 5,
    74: 5,
    75: 4,
    76: 4,
    77: 4,
    78: 4,
    79: 4,
    80: 4,
    81: 3,
    82: 3,
    83: 3,
    84: 4,
    85: 2,
    86: 2,
    87: 2,
    88: 2,
    89: 2,
    90: 2
};
function train() {
    if (level == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    var trainIndex = document.getElementById('trainingSelect').selectedIndex;
    var intense = (trainIndex > 13);
    var cost = intense ? 5 : 2;
    
    if (cost > getTP()) {
        if (!autoTrain) {
            alert('Not enough training points');
        }
    } else {
        var result = true;
        if (intense) {
            var att = trainingOptions[trainIndex][0];
            var increase = Math.round((trainingChart[Math.floor(getAtt(att))])*1.25);
            var result = true;
            result = trainAttribute(att, increase);
            if (result) {
                att = trainingOptions[trainIndex][1];
                increase = Math.round((trainingChart[Math.floor(getAtt(att))])*1.25);
                result = trainAttribute(att, increase);
                if (result) {
                    setBonusTokens(getBonusTokens()+1);
                }
            }
        } else {
            var att = trainingOptions[trainIndex][0];
            var increase = trainingChart[Math.floor(getAtt(att))];
            result = trainAttribute(att, increase);
            if (result) {
                setShoppingTokens(getShoppingTokens()+1);
            }
        }
        if (result) {
            setTP(getTP()-cost);
            if (autoTrain) {
                train();
            }
        }
    }
}
function trainAttribute(attribute, increase) {
   if (isNaN(increase)) {
       alert('Pick a different attribute to train.\n\nThis script hasnt defined a training percentage for an attribute that high');
       return false;
   }
    var new_status = increase + getTrainingStatus(attribute);
    if (new_status >= 100) {
        new_status -= 100;
        setAtt(attribute, getAtt(attribute)+1);
    }
    setTrainingStatus(attribute, new_status);
    return true;
}
var trainingOptions = [
    ['strength'],
    ['speed'],
    ['agility'],
    ['jumping'],
    ['stamina'],
    ['vision'],
    ['confidence'],
    ['blocking'],
    ['throwing'],
    ['catching'],
    ['carrying'],
    ['tackling'],
    ['kicking'],
    ['punting'],
    ['strength','blocking'],
    ['agility','blocking'],
    ['strength','jumping'],
    ['agility','stamina'],
    ['jumping','stamina'],
    ['speed','stamina'],
    ['confidence','stamina'],
    ['vision','confidence'],
    ['speed','agility'],
    ['strength','carrying'],
    ['carrying','confidence'],
    ['agility','vision'],
    ['throwing','vision'],
    ['throwing','strength'],
    ['throwing','agility'],
    ['catching','carrying'],
    ['catching','jumping'],
    ['catching','vision'],
    ['kicking','strength'],
    ['punting','vision'],
    ['punting','strength'],
    ['kicking','vision'],
    ['tackling','speed'],
    ['tackling','agility'],
    ['tackling','strength'],
    ['tackling','jumping'],
    ['jumping','vision']
]

function increaseXP(addedXP) {
    setXP(xp+addedXP);
    
    // level up
    if (xp >= 1000) {
        setXP(xp-1000);
        setLevel(level+1);
        // add 5 SP
        setSP(getSP() + 5);
        // add auto gains
        var major;
        var minor;
        if (level<22) {
            major=2;
            minor=1;
        } else if (level<30) {
            major = 1.5;
            minor = 0.75;
        } else if (level<38) {
            major = 1.125;
            minor = 0.5625;
        } else {
            major = 0.84375;
            minor = 0.421875;
        }
        var perMajorAtt = major / positionData[position].majors.length;
        var perMinorAtt = minor / positionData[position].minors.length;
        for (k in positionData[position].majors) {
            var new_value = parseFloat($(positionData[position].majors[k]).innerHTML); 
            new_value += perMajorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            $(positionData[position].majors[k]).innerHTML = new_value;
        }
        for (k in positionData[position].minors) {
            var new_value = parseFloat($(positionData[position].minors[k]).innerHTML); 
            new_value += perMinorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            $(positionData[position].minors[k]).innerHTML = new_value;
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
        setBoosts(getBoosts()-1);
        increaseXP(1000);
    }
}

function spendBT() {
    if (getBonusTokens() > 3) {
        setBonusTokens(getBonusTokens()-4);
        setSP(getSP()+1);
    } else {
        alert('You need 4 Bonus tokens to exchange for 1 SP');
    }
}

function resetSAs() {
    var skilltree = unsafeWindow.skills;
    for (s in skilltree) {
        $('skill_level_' + s).innerHTML = 0;
    }
}
function getSerializedBuild() {
    var b = serializeBuild();
    prompt('Save this key and when you want to return to this build, click the \'Load a Saved Build\' button and copy in this key', b); 
}
function serializeBuild() {
    var b = "";
    //TODO this will need to be changed if archetype names go longer than 21
    b += format(getPosition(), 21);
    b += format(season, 2);
    b += format(day, 3);
    b += format(availableBoosts, 1);
    b += format(level, 2);
    b += format(xp, 3);
    b += format(vaxp, 3);
    b += format(va, 3);
    b += format(getBonusTokens(), 3);
    b += format(getShoppingTokens(), 3);
    b += format(getTP(), 3);
    b += format(getSP(), 3);
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
        b += format($('skill_level_' + s).innerHTML, 2);
    }
    return b;
}

//pad with leading zeros to get the correct length
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
    return b.substring(start, start+length).replace(/^0/g,"");
}
function getInt(b, start, length) {
    return parseInt( b.substring(start, start+length).replace(/^0/g,""));
}
function getFloat(b, start, length) {
    return parseFloat( b.substring(start, start+length).replace(/^0/g,""));
}

function getPrintFriendlyText() {
    var b = serializeBuild();
    var pf = "Player Build";
    var index=0;
    pf += "\nPosition: "+ getPosition();
    index += 21;
    pf += "\nSeason: "+getInt(b, index, 2);
    index += 2;
    pf += "\nDay: "+getInt(b, index, 3);
    index += 3;
    index += 1;
    pf += "\nLevel: "+getInt(b, index, 2);
    index += 2;
    pf += "\nXP: "+getInt(b, index, 3);
    index += 3;
    pf += "\nVA XP: "+getInt(b, index, 3);
    index += 3;
    pf += "\nVA: "+getInt(b, index, 3);
    index += 3;
    pf += "\nBonus Tokens: "+getInt(b, index, 3);
    index += 3;
    pf += "\nShopping Tokens: "+getInt(b, index, 3);
    index += 3;
    pf += "\nTraining Points: "+getInt(b, index, 3);
    index += 3;
    pf += "\nSP: "+getInt(b, index, 3);
    index += 3;
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
    pf += "\n\nTop SA Tree: | ";
    for (var i=0; i<5; i++) {
        pf += getInt(b, index, 2) + ' | ';
        index += 2;
    }
    pf += "\nBottom SA Tree: | ";
    for (var i=0; i<5; i++) {
        pf += getInt(b, index, 2) + ' | ';
        index += 2;
    }
    alert(pf);
}

function loadV1Build(b) {
    var index=0;
    var p = requestPosition();
    if (p) {
        setPosition(p);
    } else {
        alert('You need to select an archetype to load a build into v2 of this script');
        return;
    }
    getString(b, index, 2);
    index += 2;
    reset();
    setSeason(getInt(b, index, 2));
    index += 2;
    setDay(getInt(b, index, 3));
    index += 3;
    setBoosts(getInt(b, index, 1));
    index += 1;
    setLevel(getInt(b, index, 2));
    index += 2;
    setXP(getInt(b, index, 3));
    index += 3;
    setVAXP(getInt(b, index, 3));
    index += 3;
    setVA(getInt(b, index, 3));
    index += 3;
    setBonusTokens(getInt(b, index, 3));
    index += 3;
    setShoppingTokens(getInt(b, index, 3));
    index += 3;
    setTP(getInt(b, index, 3));
    index += 3;
    setSP(getInt(b, index, 3));
    index += 3;
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
        $('skill_level_' + s).innerHTML = getInt(b, index, 2);
        index += 2;
    }
    GM_addStyle("#nextDayButton {display: block}");
    GM_addStyle(".playerhead {color: white}");
    GM_addStyle("#startBuilderButton {display: none}");
    GM_addStyle("#trainingDiv {display: block}");
    GM_addStyle("#serializeButton {display: block}");
    GM_addStyle("#printFriendlyButton {display: block}");
}

function loadV2Build(b) {
    var index=0;
    //TODO this will need to be changed if archetype names go longer than 21
    setPosition(getString(b, index, 21));
    index += 21;
    reset();
    setSeason(getInt(b, index, 2));
    index += 2;
    setDay(getInt(b, index, 3));
    index += 3;
    setBoosts(getInt(b, index, 1));
    index += 1;
    setLevel(getInt(b, index, 2));
    index += 2;
    setXP(getInt(b, index, 3));
    index += 3;
    setVAXP(getInt(b, index, 3));
    index += 3;
    setVA(getInt(b, index, 3));
    index += 3;
    setBonusTokens(getInt(b, index, 3));
    index += 3;
    setShoppingTokens(getInt(b, index, 3));
    index += 3;
    setTP(getInt(b, index, 3));
    index += 3;
    setSP(getInt(b, index, 3));
    index += 3;
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
        $('skill_level_' + s).innerHTML = getInt(b, index, 2);
        index += 2;
    }
    GM_addStyle("#nextDayButton {display: block}");
    GM_addStyle(".playerhead {color: white}");
    GM_addStyle("#startBuilderButton {display: none}");
    GM_addStyle("#trainingDiv {display: block}");
    GM_addStyle("#serializeButton {display: block}");
    GM_addStyle("#printFriendlyButton {display: block}");
}

function loadSavedBuild() {
    var b = prompt('Enter the build here');
    if (b) {
        if (b.length==163) {
            loadV1Build(b);
        } else if (b.length==182) {
            loadV2Build(b);
        } else {
            alert('Invalid build\nIt\'s missing '+(163-b.length)+' or '+(182-b.length)+' characters');
        }
    }
}

/*
    getters and setters
*/
function getPosition() {
    return position;
}
function setPosition(newValue) {
    position = newValue;
}
function getBoosts() {
    return availableBoosts;
}
function setBoosts(newValue) {
    availableBoosts = newValue;
    availableBoostsDiv.innerHTML = "Available Boosts: "+availableBoosts;
    if (getBoosts() == 0) {
        GM_addStyle("#boostButton {display: none}");
    } else {
        GM_addStyle("#boostButton {display: block}");
    }
}
function getSP() {
    return unsafeWindow.skillPoints;
}
function setSP(newSP) {
    unsafeWindow.skillPoints = newSP;
    unsafeWindow.updateSkillPointDisplay();
}
function getTP() {
    return tp;
}
function setTP(newTP) {
    tp = newTP;
    currentTPDiv.innerHTML = "TP: "+getTP();
}
function setDay(newDay) {
    day = newDay;
    currentDayDiv.innerHTML = "Day: "+day;
}
function setLevel(newLevel) {
    level = newLevel;
    currentLevelDiv.innerHTML = "Level: "+level;
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
    $(attribute).innerHTML = newValue;
    installCapTips();
}
function getAtt(attribute) {
    return parseFloat($(attribute).innerHTML);
}
function getTrainingStatus(attribute) {
    return trainingStatus[attribute];
}
function setTrainingStatus(attribute, newValue) {
    trainingStatus[attribute] = newValue;

    // display the new value
    var txt = attribute.substring(0,1).toUpperCase() + attribute.substring(1, attribute.length);
    txt = txt + " ("+newValue+"%)";
    $(attribute).parentNode.childNodes[1].innerHTML = txt;
}
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
    if (bonusTokens>3) {
        GM_addStyle("#spendBTButton {display: inline}");
    } else {
        GM_addStyle("#spendBTButton {display: none}");
    }
}
function getBonusTokens() {
    return parseInt(bonusTokens);
}
var shoppingTokens = 0;
function setShoppingTokens(newValue) {
    shoppingTokens = newValue;
    currentSTDiv.innerHTML = "Shopping Tokens: "+getShoppingTokens();
}
function getShoppingTokens() {
    return shoppingTokens;
}
function setAge(newValue) {
    age = newValue;
    currentAgeDiv.innerHTML = "Player Age (Days): "+age;
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
	for each (var div in divs) {
		if (div.className == 'attribute_value') {
			var tip = figureNextCaps(parseFloat(div.innerHTML));
			div.setAttribute('onmouseover', "set_tip('" + tip + "', 0, 1, 1, 1)");
			div.setAttribute('onmouseout', "unset_tip()");
		}
	}
}
//////////////////////////////////////
