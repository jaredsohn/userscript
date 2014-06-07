// ==UserScript==
// @name           TJ's GLB Reroller v1
// @namespace      SHHHHH
// @description    SHHHHH
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

"TJ's - Passing QB" : {
"Strength" : "10",
"Blocking" : "8",
"Speed" : "10",
"Tackling" : "8",
"Agility" : "10",
"Throwing" : ">13",
"Jumping" : "10",
"Catching" : "10",
"Stamina" : "10",
"Carrying" : "10",
"Vision" : ">13",
"Kicking" : "8",
"Confidence" : "13",
"Punting" : "8",
"Height" : ">74",
"Weight" : "*"
},
"TJ's - Rushing QB" : {
"Strength" : ">12",
"Blocking" : "8",
"Speed" : "10",
"Tackling" : "8",
"Agility" : "10",
"Throwing" : "<15",
"Jumping" : "10",
"Catching" : "10",
"Stamina" : "10",
"Carrying" : "10",
"Vision" : ">12",
"Kicking" : "8",
"Confidence" : ">12",
"Punting" : "8",
"Height" : "<74",
"Weight" : ">209"
},
"TJ's - Speed HB" : {
"Strength" : "*",
"Blocking" : "10",
"Speed" : ">13",
"Tackling" : "8",
"Agility" : ">13",
"Throwing" : "*",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : ">13",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : ">195"
},
"TJ's - Power HB" : {
"Strength" : ">14",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "8",
"Agility" : "*",
"Throwing" : "*",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : ">14",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : ">209"
},
"TJ's - Blocking FB" : {
"Strength" : ">16",
"Blocking" : "*",
"Speed" : "10",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : ">239"
},
"TJ's - Rushing/Receiving FB" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : "10",
"Tackling" : "*",
"Agility" : ">16",
"Throwing" : "*",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : ">14",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : "*"
},
"TJ's - Blocking TE" : {
"Strength" : ">16",
"Blocking" : ">16",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : ">245"
},
"TJ's - Receiving TE" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "8",
"Agility" : "*",
"Throwing" : "*",
"Jumping" : "10",
"Catching" : ">17",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : "<235"
},
"TJ's- Strength C" : {
"Strength" : ">21",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : ">320"
},
"20 Strength/ 20Blocking LG" : {
"Strength" : ">19",
"Blocking" : ">19",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : ">320"
},
"TJ's - Regular Tackle" : {
"Strength" : ">18",
"Blocking" : ">18",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : ">300"
},
"Big Strength Tackle (Strength & Size)" : {
"Strength" : ">21",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : ">309"
},
"TJ's - Speed WR" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : ">18",
"Tackling" : "8",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : "<191"
},
"TJ's - Agile DT" : {
"Strength" : ">16",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : ">19",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : "<73",
"Weight" : "*"
},
"TJ's - Strength NT" : {
"Strength" : ">19",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "8",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : "<73",
"Weight" : ">329"
},
"TJ's - Strength/Agility DE" : {
"Strength" : ">17",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : ">15",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : "<75",
"Weight" : ">264"
},
"TJ's - Speed/Agility DE" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : ">17",
"Tackling" : "*",
"Agility" : ">16",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "8",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : "<75",
"Weight" : "<265"
},
"TJ's - Speed/Vision LB" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : ">14",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : ">14",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : "*"
},
"TJ's - Speed/Power LB" : {
"Strength" : ">14",
"Blocking" : "*",
"Speed" : "*",
"Tackling" : "*",
"Agility" : ">14",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : "*"
},
"TJ's - CB" : {
"Strength" : "*",
"Blocking" : "8",
"Speed" : ">15",
"Tackling" : "*",
"Agility" : ">15",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : "<196"
},

"TJ's - FS" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : ">15",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : ">15",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">73",
"Weight" : ">195"
},

"TJ's - SS" : {
"Strength" : "*",
"Blocking" : "*",
"Speed" : ">15",
"Tackling" : "*",
"Agility" : "*",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "*",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : ">15",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">74",
"Weight" : ">214"
},

"TJ's - K" : {
"Strength" : "*",
"Blocking" : "8",
"Speed" : "*",
"Tackling" : "8",
"Agility" : "*",
"Throwing" : "*",
"Jumping" : "*",
"Catching" : "8",
"Stamina" : "8",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : ">23",
"Confidence" : "*",
"Punting" : "8",
"Height" : ">72",
"Weight" : "*"
},
"TJ's - P" : {
"Strength" : "*",
"Blocking" : "8",
"Speed" : "*",
"Tackling" : "8",
"Agility" : "*",
"Throwing" : "*",
"Jumping" : "*",
"Catching" : "8",
"Stamina" : "8",
"Carrying" : "8",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : ">23",
"Height" : ">72",
"Weight" : "*"
},
"TJ's(CB) - KR/PR" : {
"Strength" : "*",
"Blocking" : "8",
"Speed" : ">15",
"Tackling" : "8",
"Agility" : ">15",
"Throwing" : "8",
"Jumping" : "*",
"Catching" : "10",
"Stamina" : "*",
"Carrying" : "*",
"Vision" : "*",
"Kicking" : "8",
"Confidence" : "*",
"Punting" : "8",
"Height" : "<73",
"Weight" : "<191"
},
};

/*************************************************************************/
/*                 Dont need to change anything below this               */
/*************************************************************************/

var statusDiv = document.createElement("div");
statusDiv.id = "statusDiv";
var statusDiv2 = document.createElement("div");
statusDiv2.id = "statusDiv2";

var statusDiv3 = document.createElement("div");
statusDiv3.id = "statusDiv3";

document.getElementById("player_stats").parentNode.insertBefore(statusDiv, document.getElementById("player_stats"));
document.getElementById("player_stats").parentNode.insertBefore(statusDiv2, document.getElementById("player_stats"));
document.getElementById("statusDiv").parentNode.insertBefore(statusDiv3, document.getElementById("statusDiv"));

GM_addStyle("#statusDiv { float:left; width:45%; padding:10px; margin:10px; background-color:#d0d0d0;};");
GM_addStyle("#statusDiv2 { float:right; width:45%; padding:10px; margin:10px; background-color:#ffffcc;};");
GM_addStyle("#statusDiv3 { text-align:center; align:center; font-size:20px; width:100%;};");

var playerId=0;
var btype = "";
var rerollcount = 0;
var totalDuration = 0;

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
				btype = key;
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
        confirm("A New Crime Boss has been detected!\n\n"+"He's a "+btype+"!\n\nDoes he have what it takes?\n\n"+printAtts(parsedValues)+"\nHit CANCEL to continue rerolling!\n\nTotal number of rerolls:"+rerollcount)) {
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
    var div = document.getElementById("statusDiv3");
	html ="<font size=+2><b>Crime Bosses Reroller Templated Script</b></font><br/><br/>Currently Searching For: <font size=+1>"+btype+"</font>";
	div.innerHTML = html;
	
    var div = document.getElementById("statusDiv");
    var html = "<div><b>Build Target Variables:</b><br/><br/>";
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
	div.innerHTML = html;
	
	var div2 = document.getElementById("statusDiv2");
	html="";
	html+="<b>Current Number of Rolls:</b> "+rerollcount;
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
	totalDuration =  totalDuration + lastDuration;
	
    html+="<hr/><b>Rerolling Estimates:</b><br/>";
	html+="Total Duration of Search: "+ formatTime(totalDuration)+"<br/>";
	html+="Estimated Chance of Success: "+(totalSuccessRate*100)+"%<br/>";
    html+="Estimated # of rolls to Target: "+parseInt(1 / totalSuccessRate)+"<br/>";
    html+="Speed of last 50 Rerolls: "+lastDuration+" seconds<br/>";    
    html+="Estimated time left to Target: "+(parseInt(1 / totalSuccessRate)-rerollcount)/50*lastDuration/60/60+" hours<br/>";
    
	html+="<hr/><b>Last Roll Attributes</b><br/><br/>"+printAttsWeb(parsedValues)+"</div>";
    div2.innerHTML = html;
}

function formatTime(secs){
   var times = new Array(3600, 60, 1);
   var time = '';
   var tmp;
   for(var i = 0; i < times.length; i++){
      tmp = Math.floor(secs / times[i]);
      if(tmp < 1){
         tmp = '00';
      }
      else if(tmp < 10){
         tmp = '0' + tmp;
      }
      time += tmp;
      if(i < 2){
         time += ':';
      }
      secs = secs % times[i];
   }
   return time;
}

function printAttsWeb(data) {
    var str = "";
	var top = "";
	var hatts = "";
	var rests = "";
	var eatts = "";
	
    for (key in data) {
		test = key.toUpperCase();
		if(test == "HEIGHT"){
			top += "            "+key.toUpperCase()+" - "+data[key]+",<br/>";
		} else if(test == "WEIGHT"){
			top += "            "+key.toUpperCase()+" - "+data[key]+",<br/>";
		} else {
			if(data[key]>12){
				hatts += "            "+key.toUpperCase()+" - "+data[key]+",<br/>";
			} else if(data[key]==8){
				eatts += "            "+key.toUpperCase()+" - "+data[key]+",<br/>";
			} else {
        		rests += "            "+key.toUpperCase()+" - "+data[key]+",<br/>";
			}
		}
    }
	
	var output = "<b>Measureables:</b><br/>" + top;
	var highatts = "<br/><b>High Attributes:</b><br/>" + hatts;
	var theeights = "<br/><b>The Eights:</b><br/>" + eatts;
	var rest = "<br/><b>The Rest:</b><br/>" + rests;
	
	str = output + highatts + theeights + rest;
    return str;
}

function printAtts(data) {
    var str = "";
	var top = "";
	var hatts = "";
	var rests = "";
	var eatts = "";
	
    for (key in data) {
		test = key.toUpperCase();
		if(test == "HEIGHT"){
			top += "            "+key.toUpperCase()+" - "+data[key]+"  (" + minimums["Height"] + " - " + maximums["Height"]+")\n";
		} else if(test == "WEIGHT"){
			top += "            "+key.toUpperCase()+" - "+data[key]+"  (" + minimums["Weight"] + " - " + maximums["Weight"]+")\n";
		} else {
			if(data[key]>12){
				hatts += "            "+key.toUpperCase()+" - "+data[key]+"  (" + minimums[key] + " - " + maximums[key]+")\n";
			} else if(data[key]==8){
				eatts += "            "+key.toUpperCase()+" - "+data[key]+"  (" + minimums[key] + " - " + maximums[key]+")\n";
			} else {
        		rests += "            "+key.toUpperCase()+" - "+data[key]+"  (" + minimums[key] + " - " + maximums[key]+")\n";
			}
		}
    }
	
	var output = "Measureables:\n" + top;
	var highatts = "\nHigh Attributes:\n" + hatts;
	var theeights = "\nThe Eights:\n" + eatts;
	var rest = "\nThe Rest:\n" + rests;
	
	str = output + highatts + theeights + rest;
    return str;
}
