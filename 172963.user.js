// ==UserScript==
// @name       bots4 Energy display
// @version    1.2
// @require http://userscripts.org/scripts/source/107941.user.js
// @description  Displays the energy remaining of your opponent while battling.
// @match      http://bots4.net/fight*
// @copyright  2013+, Clay_Banger
// ==/UserScript==

//change to true if you wish to use GreaseMonkey/TamperMonkey to store info
var greaseMonkey = false;

var i,j = 0,found;

//define where each of the bot stats are stored. As Bot names are unique, we only need these two pieces of info.
var BOT_NAME = 0;
var BOT_ENERGY = 1;

//decide which of the fighting pages we are on
if(document.title == "fight list - bots4") {
    //on the fight list, need to get a list of all bots with energy
    var botRows = document.getElementsByClassName("botrow");
    
    var bots = new Array();
    
    //cycle through all of the bots listed on the page
    for(i=0;i<botRows.length;i++) {
        //check to see if the bot has energy, we dont care about it if it doesn't.
        var elements = botRows[i].getElementsByTagName("td");
        if(elements[6].innerHTML != "") {
            //the bot has energy, so add him to an array of them all.
            var botStats = new Array();
            botStats[BOT_NAME] = elements[2].innerHTML;
            botStats[BOT_ENERGY] = elements[6].innerHTML.replace(",","");//removes the comma from energy values. The comma messes with the save/load of the bots
            bots[j] = botStats;
            j++;
        }
    }
    
    //we have now grabbed all the info we need. Store it in the browser.
    if(greaseMonkey) {
        //use grease monkey storage
    	GM_SuperValue.set("botList", bots); //the default GM_setValue doesnt support arrays, so utalising a tripped up version imported above.
    } else {
        //use HTML5 storage
    	localStorage['botslist'] = bots.join("_");
    }
} else if(document.title == "fight - bots4") {
    //we are fighting.
    
    if(greaseMonkey) {
        //pull from GreaseMonkey storage
    	var bots = GM_SuperValue.get("botList", "");
        if (navigator.userAgent.indexOf("Chrome") != -1) {
    		bots = JSON.parse(bots); //Chrome doesn't correctly pull the values back, so some extra parsing needs to be done.
    	}
    } else {
        //pull from HTML5 storage
    	var bots = localStorage['botslist'].split("_");
    	for(var i=0;i<bots.length;i++) {
        	bots[i] = bots[i].split(',');
    	}
    }
    

    //check to see if there is an array stored
    if(bots == "") {
        console.log("No botList stored in this browser.");
        return false; //exit
    }
    
    //get the current bot we are fighting.
    var opponentName = document.getElementById('battle-header');
    
    //this name isn't stored as neatly as the bots in the fight list, we need to extract it from some HTML.
    var start = opponentName.innerHTML.indexOf("vs. ")+4;
    var end = opponentName.innerHTML.indexOf("</div>");
    
    opponentName = opponentName.innerHTML.substring(start,end);
    
    //check to see if the bot we are fighting is in the list of stored bots/energy
    for(i=0;i<bots.length;i++) {
        if(bots[i][BOT_NAME] == opponentName) {
            //so we are fighting an energy bot, we now need to wait until the fight has finished to update the report.
            found = i;
            findFinish();
        }
    }
}
    
    
function findFinish() {
    var battleSummary = document.getElementById("battle-summary");
	
    if(battleSummary != null) {
        //the fight is over, we now need to calculate the energy left, display this, and update botList
        
        //pull the energy obtained from the battle log.
        var battleLog = document.getElementById("battle-log");
        var subsubtext = battleLog.getElementsByClassName("subsubtext");
        var energy = subsubtext[0].innerHTML;
        
        //we now know how much energy we have. Now figure out who won.
        var tds = battleSummary.getElementsByTagName("td");
        var spans = tds[tds.length-1].getElementsByTagName("span");
        var winner = spans[0].innerHTML;
        
        //make the changes to the amount of energy
        if(winner == opponentName) {
            //challenger lost, opponents energy will increase.
            bots[found][BOT_ENERGY] = parseInt(bots[found][BOT_ENERGY]) + parseInt(energy);
        } else {
            //challenger won
            bots[found][BOT_ENERGY] = bots[found][BOT_ENERGY] - energy;
        }
        
        //get the colour of the opponent
        var opponentDisplay = tds[5].innerHTML;
        
        //display the energy remaining
        battleLog.innerHTML = battleLog.innerHTML.replace("energy.", "energy. " + opponentDisplay + " has <span class=\"subsubtext\">" + numberWithCommas(parseInt(bots[found][BOT_ENERGY])) + "</span> energy remaining.");
        
        //if the user is using Emanuel's remove frames script (http://userscripts.org/scripts/show/88060), the energy remaining may not correctly display. He uses another frame and copies the battle-log over to it.
        if(localStorage['hideFrames'] == "true") {
			//also update the "no frames" battle-log
            var fakeBattleLog = document.body.getElementsByTagName("div")[document.body.getElementsByTagName("div").length-1];
            fakeBattleLog.innerHTML = fakeBattleLog.innerHTML.replace("energy.", "energy. " + opponentDisplay + " has <span class=\"subsubtext\">" + numberWithCommas(parseInt(bots[found][BOT_ENERGY])) + "</span> energy remaining.");
        }
        
        //update the botList with the changes we have made
        if(greaseMonkey) {
            //use grease monkey storage
            GM_SuperValue.set("botList", bots); //the default GM_setValue doesnt support arrays, so utalising a tripped up version imported above.
        } else {
            //use HTML5 storage
            localStorage['botslist'] = bots.join("_");
        }
    } else {
    	//fight has not ended yet, wait another 0.1 second for the fight to end.
		setTimeout(function(){findFinish();}, 100); 
    }
}

//number format function. Only used to format the energy display. Credit for this function goes to mikez302 from StackOverflow.
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}