// ==UserScript==
// @name           GLB Player Builder
// @namespace      monsterkill
// @description    simulate a player's build
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

var autoTrain = true;

// set to true if the you want the first season
// of the build to skip game xp for a super slow
// build type of thing
var sitout_first_season = false;

// set to 1.0 for max game xp
// 
// less than 1.0 for a percentage of max game xp if you arent expecting a
// ton of playing time.
// 
// ex: 0.9 would mean you get 90% of max game xp from games
var game_xp_factor = 1.0;

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

var nextSeasonButton = document.createElement('input');
nextSeasonButton.id = "nextSeasonButton";
nextSeasonButton.type = "button";
nextSeasonButton.value = "Skip 40 Days";
nextSeasonButton.addEventListener("click", incrementSeason, true);
containerDiv.appendChild(nextSeasonButton);
GM_addStyle("#nextSeasonButton {display: none}");

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
serializeButton.addEventListener("click", serializeBuild, true);
containerDiv.appendChild(serializeButton);
GM_addStyle("#serializeButton {display: none}");

var $ = unsafeWindow.$;
var position;
var age = 0;
var season = 0;
var level = 0;
var xp = 0;
var day = 1;
var tp = 0;
var availableBoosts = 0;
var buildFromScratch = true;
var vaxp = 0;
var va = 0;
var playerId = parsePlayerId();

var levelGains = {
    "DE": {
        majors: ["strength","tackling","agility","speed"],
        minors: ["blocking","jumping","stamina","vision","confidence"]
    },
    "DT": {
        majors: ["strength","tackling","agility"],
        minors: ["blocking", "speed", "vision", "stamina", "confidence"]
    },
    "C": {
        majors: ["strength","blocking"],
        minors: ["tackling", "agility", "stamina", "vision", "confidence"]
    },
    "G": {
        majors: ["strength","blocking","confidence"],
        minors: ["tackling","agility","stamina","vision"]
    },
    "OT": {
        majors: ["strength","blocking","confidence","vision","agility"],
        minors: ["tackling","stamina"]
    },
    "HB": {
        majors: ["strength","speed","agility","carrying","vision","confidence"],
        minors: ["jumping","stamina","blocking","throwing","catching"]
    },
    "WR": {
        majors: ["speed","agility","jumping","vision","stamina","catching"],
        minors: ["confidence","carrying"]
    },
    "QB": {
        majors: ["strength","throwing","stamina","vision","confidence"],
        minors: ["speed","agility","jumping","catching","carrying"]
    },
    "TE": {
        majors: ["strength","blocking","catching","vision"],
        minors: ["speed","tackling","agility","stamina","carrying","confidence"]
    },
    "FB": {
        majors: ["strength","blocking","agility","carrying"],
        minors: ["confidence","vision","stamina","catching","tackling"]
    },
    "LB": {
        majors: ["strength","tackling","agility","stamina","vision","confidence"],
        minors: ["blocking","speed","jumping","catching"]
    },
    "CB": {
        majors: ["speed","agility","jumping","stamina","vision","catching"],
        minors: ["strength","tackling","carrying","confidence"]
    },
    "SS": {
        majors: ["strength","speed","tackling","stamina","vision"],
        minors: ["blocking","agility","jumping","catching","carrying","confidence"]
    },
    "FS": {
        majors: ["speed","tackling","catching","stamina","vision"],
        minors: ["strength","blocking","agility","jumping","confidence","carrying"]
    },
    "K": {
        majors: ["kicking","confidence"],
        minors: ["strength","speed","agility","throwing","jumping","vision"]
    },
    "P": {
        majors: ["punting","confidence"],
        minors: ["strength","speed","agility","throwing","jumping","vision"]
    }
};

// dont rearrange these as this order is used for de-serializing saved builds
var minimums = {
    "DE": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 8,
         "stamina" : 10,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "DT": {
        "strength": 10,
        "blocking": 10,
        "speed": 10,
        "tackling": 10,
        "agility": 10,
        "throwing": 8,
        "jumping": 8,
        "catching": 8,
        "stamina": 10,
        "carrying": 8,
        "vision": 10,
        "kicking": 8,
        "confidence": 10,
        "punting": 8
    },
    "C": {
        "strength": 11,
        "blocking": 11,
        "speed": 8,
        "tackling": 10,
        "agility": 10,
        "throwing": 8,
        "jumping": 8,
        "catching": 8,
        "stamina": 10,
        "carrying": 8,
        "vision": 10,
        "kicking": 8,
        "confidence": 10,
        "punting": 8
    },
    "G": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 8,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 8,
         "catching" : 8,
         "stamina" : 10,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "OT": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 8,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 8,
         "catching" : 8,
         "stamina" : 10,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "HB": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 8,
         "agility" : 10,
         "throwing" : 10,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "WR": {
         "strength" : 8,
         "blocking" : 8,
         "speed" : 10,
         "tackling" : 8,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "TE": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 8,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "FB": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 8,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 8,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "QB": {
         "strength" : 10,
         "blocking" : 8,
         "speed" : 10,
         "tackling" : 8,
         "agility" : 10,
         "throwing" : 10,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "LB": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "CB": {
         "strength" : 10,
         "blocking" : 8,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "SS": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "FS": {
         "strength" : 10,
         "blocking" : 10,
         "speed" : 10,
         "tackling" : 10,
         "agility" : 10,
         "throwing" : 8,
         "jumping" : 10,
         "catching" : 10,
         "stamina" : 10,
         "carrying" : 10,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 10,
         "punting" : 8
    },
    "P": {
         "strength" : 10,
         "blocking" : 8,
         "speed" : 10,
         "tackling" : 8,
         "agility" : 10,
         "throwing" : 10,
         "jumping" : 10,
         "catching" : 8,
         "stamina" : 8,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 8,
         "confidence" : 11,
         "punting" : 11
    },
    "K": {
         "strength" : 10,
         "blocking" : 8,
         "speed" : 10,
         "tackling" : 8,
         "agility" : 10,
         "throwing" : 10,
         "jumping" : 10,
         "catching" : 8,
         "stamina" : 8,
         "carrying" : 8,
         "vision" : 10,
         "kicking" : 11,
         "confidence" : 11,
         "punting" : 8
    }
}

var trainingStatus = {};


function reset() {
    // remove the submit button to prevent any real SP spending
    var s = document.getElementById('submit');
    s.innerHTML = "Submit button removed by the GLB Player Builder Script. Refresh the page to get it back.";

    //remove the current player's name to be less confusing
    document.getElementById("player_vitals").childNodes[1].innerHTML = "Simulated Player | Position: "+getPosition();

    if (getIsBuildFromScratch()) {
        var sp = 149;
        setTP(7);
        setXP(0);
        setDay(1);
        setLevel(0);
        setVA(0);
		setAge(0);
        setVAXP(0);
        for (k in minimums[getPosition()]) {
            setAtt(k, minimums[getPosition()][k]);
            sp -= minimums[getPosition()][k];
    
            //reset the training status to 0%
            setTrainingStatus(k, 0);
        }
        setSP(sp);
        setBoosts(0);
        setBonusTokens(0);
        setShoppingTokens(0);
        resetSAs();
    } else {
        setBoosts(3);
    }
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
        }
    } else {
        //this request's response should call reset(position);
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
             // get player position from the page
             var txt = responseDetails.responseText;
             if (txt.indexOf('<span>Vet Pts:</span>') >-1) {
                 var vasplit = txt.split('<span>Vet Pts:</span>');
                 va = vasplit[1].substring(vasplit[1].indexOf('>')+1,vasplit[1].indexOf('</a>'));
             } else {
                 va=0;
             }

             txt = txt.slice(txt.indexOf('<div class="position ')+'<div class="position '.length);
             var pos = txt.substr(0,txt.indexOf('"'));
             pos = pos.split(' ').join('');
             if (levelGains[pos] == null || minimums[pos] == null) {
                 alert('Sorry, this position ('+pos+') is not yet implemented');
             } else {
                 setPosition(pos);
                 GM_addStyle(".playerhead {color: white}");
                 GM_addStyle("#startBuilderButton {display: none}");
                 GM_addStyle("#nextDayButton {display: block}");
				 GM_addStyle("#nextSeasonButton {display: block}");
                 GM_addStyle("#startSeasonButton {display: none}");
                 GM_addStyle("#trainingDiv {display: block}");
                 GM_addStyle("#serializeButton {display: block}");
                 // get level from the page
                 txt = txt.slice(txt.indexOf('<td class="current_stats_value">')+'<td class="current_stats_value">'.length);
                 var lvl = txt.slice(0,txt.indexOf("<"));
                 setLevel(parseInt(lvl));
                 setVA(parseInt(va));

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

                 // get current training points
                 txt = txt.slice(txt.indexOf('player_points_value">')+'player_points_value">'.length);
                 txt = txt.slice(txt.indexOf('<td>')+4);
                 txt = txt.slice(txt.indexOf('<td>')+4);
                 txt = txt.slice(txt.indexOf('<td>')+4);
                 var t = txt.substr(0,txt.indexOf('<'));
                 setTP(parseInt(t));

                 txt = txt.slice(txt.indexOf('<td>')+4);
                 t = txt.substr(0,txt.indexOf('<'));
                 setBonusTokens(parseInt(t));

                 txt = txt.slice(txt.indexOf('<td>')+4);
                 t = txt.substr(0,txt.indexOf('<'));
                 setShoppingTokens(parseInt(t));

                 // get current xp
                 txt = txt.slice(txt.indexOf('<span>Next Level:</span>')+32);
                 var exp = txt.slice(0, txt.indexOf("/1000"));
                 setXP(parseInt(exp));
                 
                 // get the current day and reset the rest
                 requestCurrentDay();
             }
        }
    });
}

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

             var playersplit = txt.split('<div class="content_container');
             for (var jo=1;jo<playersplit.length;jo++) {
                 if (playersplit[jo].indexOf('player_id='+playerId)!= -1) {
                     vasplit = playersplit[jo].split('<div class="player_xp">');
                     vaxp = vasplit[2].substring(0,vasplit[2].indexOf('/'));
                 }
             }

             txt = txt.slice(txt.indexOf(', Day ')+5);
             var d = txt.substring(0,txt.indexOf('</div>'));
             setDay(parseInt(d));
             setVAXP(parseInt(vaxp))

             reset();
        }
    });

}

function startSeason() {
    if (level == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
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
        setBoosts(3);
        setDay(startDay);
		setAge(age);
        setSeason(season+1);
        startSeasonButton.value = "Next Season";
        if (level == 0) {
            setSP(getSP() + 15);
            setLevel(1);
            setXP(0);
        }
        GM_addStyle("#nextDayButton {display: block}");
		GM_addStyle("#nextSeasonButton {display: block}");
        GM_addStyle("#startSeasonButton {display: none}");
    }
}

/*
    prompts for a valid position 
    returns null if cancel is hit 
*/
function requestPosition() {
    var msg = "Valid positions: \n";
    for (k in levelGains) {
        msg += k+" ";
    }
    var p = prompt("Enter a Position\n\n"+msg);
    if (p == null || (levelGains[p] != null && minimums[p] != null)) {
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

function incrementSeason() {

for (i=0;i<=40;i++)
{

    if (level == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    setDay(day+1);    
    setTP(getTP()+2);

    // daily xp if not in offseason
    if (day > 0 && day < 41) {
        if (level>39) {
            increaseVAXP(200);
        } else if (level>24 && level < 40){
            increaseVAXP(dailyvaxp[level]);
        }

        if (level<29) {
            increaseXP(dailyXP[level][0]);
        } else {
            increaseXP(25);
        }
    }
	// aging
	if (day > 0 && day <= 40) {
      	age = age+1;
    }
	
	setAge(age);
	
    // game xp, every other day for days 1-31 games
    if (!(sitout_first_season && season == 0)) {
        if (day > 0 && day%2 == 1 && day <= 32) {
            if (level<29) {
                increaseXP(game_xp_factor * dailyXP[level][1]);
            } else {
                increaseXP(100);
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
	
}

function incrementDay() {
    if (level == 0 && getSP() > 0) {
        showIntialPointsPrompt();
        return;
    }
    setDay(day+1);    
    setTP(getTP()+2);

    // daily xp if not in offseason
    if (day > 0 && day < 41) {
        if (level>39) {
            increaseVAXP(200);
        } else if (level>24 && level < 40){
            increaseVAXP(dailyvaxp[level]);
        }

        if (level<29) {
            increaseXP(dailyXP[level][0]);
        } else {
            increaseXP(25);
        }
    }
	// aging
	if (day > 0 && day <= 40) {
      	age = age+1;
    }
	
	setAge(age);
	
    // game xp, every other day for days 1-31 games
    if (!(sitout_first_season && season == 0)) {
        if (day > 0 && day%2 == 1 && day <= 32) {
            if (level<29) {
                increaseXP(game_xp_factor * dailyXP[level][1]);
            } else {
                increaseXP(100);
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
    for (k in minimums["DT"]) {
        $('modifier_' + k).innerHTML = 0;
        $('hidden_' + k).value = 0;
    }
    // update the next cap tooltips
    installCapTips();
}

var trainingChart = {
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
        var perMajorAtt = major / levelGains[position].majors.length;
        var perMinorAtt = minor / levelGains[position].minors.length;
        for (k in levelGains[position].majors) {
            var new_value = parseFloat($(levelGains[position].majors[k]).innerHTML); 
            new_value += perMajorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            $(levelGains[position].majors[k]).innerHTML = new_value;
        }
        for (k in levelGains[position].minors) {
            var new_value = parseFloat($(levelGains[position].minors[k]).innerHTML); 
            new_value += perMinorAtt;
            try {new_value = new_value.toFixed(2);} catch(err) {}
            $(levelGains[position].minors[k]).innerHTML = new_value;
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

function serializeBuild() {
    var b = "";
    b += format(getPosition(), 2);
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
    prompt('Save this key and when you want to return to this build, click the \'Load a Saved Build\' button and copy in this key', b);
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

function loadBuild(b) {
    var index=0;
    setPosition(getString(b, index, 2));
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
}

function loadSavedBuild() {
    var b = prompt('Enter the build here');
    if (b) {
        if (b.length==163) {
            loadBuild(b);
        } else {
            alert('Invalid build\nIt\'s missing '+(163-b.length)+' characters');
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

function setAge(newAge) {
    age = newAge;
    currentAgeDiv.innerHTML = "Age: "+age;
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
