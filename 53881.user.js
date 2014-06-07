// ==UserScript==
// @name           Dotaparser - THR AutoBan
// @namespace      funklab.dev
// @description    Opens THR Ban Requests/New Post window with subject field pre-populated with leaver names from dotaparser report
// @include        *dotaparser.com/index.php/replay/view/*
// @include        *throneit.com/forums/posting.php*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
    	window.setTimeout(GM_wait,100); 
    }
	else { 
		$ = unsafeWindow.jQuery; 
		
		setTimeout(main, 1000);
	}
}

function main() {	
	if(window.location.hostname.indexOf("dotaparser.com") != -1) {
		var banDiv = $('<div style="width:175px;padding:7px;margin:7px;background-color:#FFFFFF;text-align:center;"></div>');
		var banLink = $('<a href="">Create THR Ban</a>');
		$(banLink).click(createBan);
		$(banDiv).append(banLink);
		$("body").prepend(banDiv);
	}
	else if(window.location.href.indexOf("throneit.com/forums/posting.php?mode=post") != -1) {
		var subject = unescape(getQsVariable("subject"));
		var parseUrl = unescape(getQsVariable("parseUrl"));
		
		var leaverStr = subject.replace(/^\s+|\s+$/g, ''); // trim whitespace
		
		var postBody = parseUrl + "\n\n";
		
		if(leaverStr.length > 0) {
			var leaverAr = leaverStr.split(',');
			for(var i = 0; i < leaverAr.length; i++) {
				
				leaverStr = leaverAr[i].split('(');
				var reason = leaverStr[1];
				reason = reason.substring(0, reason.length - 1); // trim trailing ')'
				
				postBody += "User: " + leaverStr[0] + "\n";
				postBody += "Reason: " + reason + "\n\n";
			}
		}
		
		$("input[name='subject']").val(subject);
		$("textarea[name='message']").val(postBody);
	}
}

function createBan(obj) {
	var teamOneLeavers = new Array();
	var teamOneTimes = new Array();	
	var teamTwoLeavers = new Array();
	var teamTwoTimes = new Array();
	var disconnects = new Array();
	var numLeavers;
	var tempTime;
	var tempName;
	
	// Calculate game time in seconds
	var gameTimeAr = $("#rowtime_length > td");
	var gameTime = gameTimeAr[1].textContent;
	gameTime = calculateTimeSecs(gameTime);
	
	// Detect which tier the game was
	var gameTierAr = $("#rowname > td");
	var gameTier = gameTierAr[1].textContent;
	gameTier = (gameTier.indexOf("thr2") != -1) ? 2 : 1;
	
	// Loop through player rows looking for leavers
	var playerRows = $('#player_stats tbody tr').each(function () {
		var cellAr = $(this).children();
		var reason = cellAr[4].innerHTML;
		var addLeaver = false;
		if(reason.indexOf("<b> Left the game</b>") != -1) {
			reason = "Leaving";	
			addLeaver = true;
		}
		else if(reason.indexOf("<b> Disconnected</b>") != -1) {
			reason = "Disconnecting";
			addLeaver = true;	
		}
		if(addLeaver) {
			var playerName = cellAr[2].textContent + " (" + reason + ")";
			var leaveTime = cellAr[5].textContent;
			leaveTime = calculateTimeSecs(leaveTime);
			
			if(((gameTime * 0.90) > parseInt(leaveTime)) || (gameTier > 1)) {
				if(parseInt(cellAr[0].textContent) < 7) { // < 7 means team1, > 7 means team2
					numLeavers = teamOneLeavers.length;				
					if(numLeavers < 2) {
						teamOneLeavers[numLeavers] = playerName;
						teamOneTimes[numLeavers] = leaveTime;	
					}			
					else {
						if(leaveTime < teamOneTimes[0]) {
							tempTime = teamOneTimes[0];
							tempName = teamOneLeavers[0];
							teamOneTimes[0] = leaveTime;	
							teamOneLeavers[0] = playerName;		
						}	
						else {
							tempTime = leaveTime;	
							tempName = playerName;
						}
						
						if(tempTime < teamOneTimes[1]) {
							teamOneTimes[1] = tempTime;	
							teamOneLeavers[1] = tempName;	
						}
					}
				}
				else {		
					numLeavers = teamTwoLeavers.length;		
					if(numLeavers < 2) {
						teamTwoLeavers[numLeavers] = playerName;
						teamTwoTimes[numLeavers] = leaveTime;	
					}			
					else {
						if(leaveTime < teamTwoTimes[0]) {
							tempTime = teamTwoTimes[0];
							tempName = teamTwoLeavers[0];
							teamTwoTimes[0] = leaveTime;	
							teamTwoLeavers[0] = playerName;		
						}	
						else {
							tempTime = leaveTime;	
							tempName = playerName;
						}
						
						if(tempTime < teamTwoTimes[1]) {
							teamTwoTimes[1] = tempTime;	
							teamTwoLeavers[1] = tempName;	
						}
					}
				}
				if(reason == "Disconnecting") {
					disconnects.push(playerName);
				}
			}
		}
	});
	
	// Filter out disconnects for tier 1 (not bannable)
	if(gameTier < 2) {
		for(var i = 0; i < disconnects.length; i++) {
			for(var j = 0; j < teamOneLeavers.length; j++) {
				if(teamOneLeavers[j] == disconnects[i]) {
					teamOneLeavers.splice(j, 1);	
				}	
			}
			for(var j = 0; j < teamTwoLeavers.length; j++) {
				if(teamTwoLeavers[j] == disconnects[i]) {
					teamTwoLeavers.splice(j, 1);	
				}	
			}		
		}
	}
	
	var subject = teamOneLeavers.toString(); 
	if(teamTwoLeavers.length > 0) {
		if(subject != "") {
			subject += ",";	
		}
		subject += teamTwoLeavers.toString();
	}

	subject = encodeURI(subject);
	var parseUrl = window.location.href;
	
	var forumId = -1;
	switch(gameTier) {
		case 1:
			forumId = 13;
		break;
		case 2:
			forumId = 76;
		break;	
	}
	window.open("http://www.throneit.com/forums/posting.php?mode=post&f=" + forumId + "&subject=" + subject + "&parseUrl=" + parseUrl);
	
	return false;	
}

function calculateTimeSecs(timeStr) {
	var gameTimeAr = timeStr.split(":");
	gameTimeAr.reverse();
	var gameSecs = 0;
	for(var i = 0; i < gameTimeAr.length; i++) {
		gameSecs += parseInt(gameTimeAr[i]) * Math.pow(60,i);
	}
	return gameSecs;
}

function getQsVariable(varName) {
	varName = varName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]" + varName + "=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	}
	else {
		return results[1];
	}
}

GM_wait();