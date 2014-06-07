// ==UserScript==
// @name           GLB Reroller v2
// @namespace      Reroller
// @description    Automatic Rerolling for GLB version 2
// @include        http://goallineblitz.com/game/reroll_player.pl?player_id=*
// ==/UserScript==

// to create a new set of attributes, copy this:
/*
    "Name of this build" : {
        "Strength" : "*",
        "Blocking" : "*",
        "Speed" : "*",
        "Tackling" : "*",
        "Agility" : "*",
        "Throwing" : "*",
        "Jumping" : "*",
        "Catching" : "*",
        "Stamina" : "*",
        "Carrying" : "*",
        "Vision" : "*",
        "Kicking" : "*",
        "Confidence" : "*",
        "Punting" : "*",
        "Height" : "71",
        "Weight" : "180"
    },
*/
// paste it in between the lines labeled CHANGE SECTION below
// for your desired attributes, 
// *   - the reroller will accept any value for this attribute
// #   - the reroller will keep rolling if the rolled attribute is not exactly equal to the number given
// <#  - Example: "Jumping" : "<12" would keep rolling until jumping is less than 12
// >#  - Example: "Jumping" : ">12" would keep rolling until jumping is greater than 12
var buildMap = {
    //START CHANGE SECTION
    //END CHANGE SECTION
    "Strength DT" : {
        "Strength" : ">21",       // 10-23
        "Blocking" : "*",      // 10
        "Speed" : "*",         // 10
        "Tackling" : "*",     // 10-25
        "Agility" : "*",        // 10-24
        "Throwing" : "8",       // 8-10
        "Jumping" : "8",        // 8-10
        "Catching" : "8",       // 8-10
        "Stamina" : "*",       // 10
        "Carrying" : "8",       // 8-10
        "Vision" : "*",        // 10
        "Kicking" : "8",        // 8-10
        "Confidence" : "*",    // 10
        "Punting" : "8",        // 8-10
        "Height" : "78",        // 72-78
        "Weight" : "340"        // 270-340
    }
};

/*************************************************************************/
/*                 Dont need to change anything below this               */
/*************************************************************************/

var statusDiv = document.createElement("div");
statusDiv.id = "statusDiv";
document.getElementById("player_stats").parentNode.insertBefore(statusDiv, document.getElementById("player_stats"));

GM_addStyle("#statusDiv { float:left; };");

var playerId=0;

var rerollcount = 0;

/*
set this to true to get log output for trackign how low an attribute goes. 
good for scouting a new position to see just how good it can get in a certain attribute 
*/
var logMinimums = true;
var logMaximums = true;

var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.3.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

var buildId = "";
function parsePlayerId() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
    playerId = pid;
}

var dojo;
var c;
window.addEventListener('load', function(event) {
    dojo = unsafeWindow.dojo;
    c = console;
    dojo.addOnLoad(function() {
        buildId = "";
        for (var key in buildMap) {
            if (confirm("Reroll for "+key+"?")) {
                buildId = key;
                break;
            }
        }
        c.log(buildId);
        if (buildId != "") {
            parsePlayerId();
            reroll();
        }
    });
}, 'false');


function reroll() {
   	dojo.xhrPost({
        url: "/game/reroll_player.pl?player_id="+playerId, 
        content : {action: "Re-Roll", player_id: playerId},
        load: parseReloadedPage,
        error : function() {
                  window.setTimeout(reroll,4000);
        },
        handleAs: "text"
    });
}



var parsedValues;
var time1 = 0;
var lastDuration = 0;
function parseReloadedPage(response, ioArgs) {
    var s = response;
    parsedValues = {};
    var noErrors = true;
    for (var attName in buildMap[buildId]) {
        var desiredAttribute = buildMap[buildId][attName];
        var result = checkAttribute(s, attName, desiredAttribute);
        if (desiredAttribute != "*") {
            if (noErrors) {
                noErrors = result;
            }
        }
    }
    if (noErrors &&
        confirm("Found a match, keep this?\n"+printAtts(parsedValues)+"Hit cancel to keep rerolling\n\nTotal number of rerolls:"+rerollcount)) {
        window.location = 'http://goallineblitz.com/game/skill_points.pl?player_id='+playerId;
    } else {
        rerollcount++;
        if (time1==0) {
            var d = new Date();
            time1 = parseInt(d.getTime()/1000);
        }
        if (rerollcount % 25 == 0) {            
            var d = new Date();
            time2 = parseInt(d.getTime()/1000);
            lastDuration = time2-time1;
            displayMinMax();
            time1=time2;
            time2=0;
        }
        reroll();
    }
}

var minimums = {
    "Strength" : 100,
    "Blocking" : 100,
    "Speed" : 100,
    "Tackling" : 100,
    "Agility" : 100,
    "Throwing" : 100,
    "Jumping" : 100,
    "Catching" : 100,
    "Stamina" : 100,
    "Carrying" : 100,
    "Vision" : 100,
    "Kicking" : 100,
    "Confidence" : 100,
    "Punting" : 100,
    "Height" : 1000,
    "Weight" : 1000
};
var maximums = {
    "Strength" : 1,
    "Blocking" : 1,
    "Speed" : 1,
    "Tackling" : 1,
    "Agility" : 1,
    "Throwing" : 1,
    "Jumping" : 1,
    "Catching" : 1,
    "Stamina" : 1,
    "Carrying" : 1,
    "Vision" : 1,
    "Kicking" : 1,
    "Confidence" : 1,
    "Punting" : 1,
    "Height" : 1,
    "Weight" : 1
};
function checkAttribute(text, attributeName, desiredValue) {
    var attValue = "";
    // find the attribute name
    if (attributeName == "Height") {
        text = text.slice(text.indexOf('Height:</b>')+"Height:</b>".length+1);
        attValue = text.slice(0,2);
    } else if (attributeName == "Weight") {
        text = text.slice(text.indexOf('Weight:</b>')+"Weight:</b>".length+1);
        attValue = text.slice(0,3);
    } else {
        text = text.slice(text.indexOf(attributeName)+attributeName.length+1);
        // trim off the stuff leading up to the attribute
        text = text.slice(text.indexOf('stat_value_tall')+"stat_value_tall".length+2);
        if (text.slice(1,2) == "<") {
            attValue = text.slice(0,1);
        } else {
            attValue = text.slice(0,2);
        }
    }
    if (minimums[attributeName] > parseInt(attValue)) {
        minimums[attributeName] = parseInt(attValue);
    }
    if (maximums[attributeName] < parseInt(attValue)) {
        maximums[attributeName] = parseInt(attValue);
    }
    parsedValues[attributeName] = parseInt(attValue);
    if (desiredValue[0] == "<") {
        desiredValue = desiredValue.slice(1);
        if (attValue < parseInt(desiredValue)) {
            addSuccess(attributeName);
            return true;
        }
    } else if (desiredValue[0] == ">") {
        desiredValue = desiredValue.slice(1);
        if (attValue > parseInt(desiredValue)) {
            addSuccess(attributeName);
            return true;
        }
    } else if (attValue == desiredValue) {
        addSuccess(attributeName);
        return true;
    }
    if (desiredValue != "*") {
        addFail(attributeName);
    }
    return false;
}

var failCounter = {};
var successCounter = {};
function addSuccess(att) {
    if (successCounter[att] == null) {        
        successCounter[att] = 0;
    }
    successCounter[att]++;
}
function addFail(att) {
    if (failCounter[att] == null) {
        failCounter[att] = 0;
    }
    failCounter[att]++;
}
function displayMinMax() {
    var div = document.getElementById("statusDiv");
    var html = "";
    for (key in minimums) {
        html += "<b>"+key;
        if (buildMap[buildId][key]!= "*") {
            html += " [ "+buildMap[buildId][key]+" ] ";
        }
        html += ":</b> "+minimums[key];
        if (minimums[key] != maximums[key]) {
            html += "-"+ maximums[key];
        }
        html+="<br/>";
    }
    html+="<hr/><b>Success Rates:</b><br/>";
    var totalSuccessRate = 1.0;
    for (att in failCounter) {
        var success_count = (successCounter[att] != null) ? successCounter[att] : 0;
        var success_rate = 100-parseInt((failCounter[att] / (failCounter[att] + success_count))*100);
        if (!isNaN(success_rate)) {
            totalSuccessRate = totalSuccessRate * success_rate / 100;
            html+= att + " : "+success_rate + "%<br />";
        }
    }

    html+="Estimated Total Success Chance: "+(totalSuccessRate*100)+"%<br/>";
    html+="Estimated # of rolls: "+parseInt(1 / totalSuccessRate)+"<br/>";
    html+="Seconds per 50 rerolls: "+lastDuration+" seconds<br/>";    
    html+="Estimated time left to success: "+(parseInt(1 / totalSuccessRate)-rerollcount)/50*lastDuration/60/60+" hours<br/>";
    html+="<hr/><b>rerolls:</b>"+rerollcount;
    div.innerHTML = html;
}

function printAtts(data) {
    var str = "";
    for (key in data) {
        str += "         \""+key.toLowerCase()+"\" : "+data[key]+",\n";
    }
    return str;
}
