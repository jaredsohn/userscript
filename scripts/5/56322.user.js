// ==UserScript==
// @name           Yahoo/Cot's MLB Service Time
// @namespace      http://kevinpaulconnor.com
// @description    Pulls MLB Service Time from Cot's blog and displays in player title tag on Yahoo!
// 					Fantasy baseball page; changes text color depending on service time length
// 					service time < 5 years: green
// 					5 years <= service time < 6 years: dark goldenrod
// 					service time > 6 years: red
// @include        http://baseball.fantasysports.yahoo.com/*
// @version			1.2
// ==/UserScript==

const COTSYEAR = 2011;

// strip_accents
//input player name, return player name stripped of any accent marks
function strip_accents(input) {
    input = input.replace(/\u00C1/g, "A");
    input = input.replace(/\u00E1/g, 'a');
    input = input.replace(/\u00C9/g, "E");
    input = input.replace(/\u00E9/g, "e");
    input = input.replace(/\u00CD/g, "I");
    input = input.replace(/\u00ED/g, "i");
    input = input.replace(/\u00D3/g, "O");
    input = input.replace(/\u00F3/g, "o");
    input = input.replace(/\u00DA/g, "U");
    input = input.replace(/\u00FA/g, "u");
    input = input.replace(/\u00F1/g, "n"); 
    return input;

}

// get_cot_url
// input team, return team url on Cot's blog data spreadsheets
function get_cot_url(team) {
	var url;

	if (team == 'LAA') {url = 'http://spreadsheets.google.com/pub?key=tWBCtH8eoSECZxhX-dRCHIw';}
	if (team == 'Hou') {url = 'http://spreadsheets.google.com/pub?key=tmxTtDiWidNuZUZLxaZIu5Q';}
	if (team == 'Oak') {url = 'http://spreadsheets.google.com/pub?key=tfsGfyq6KIc3zP01PEsy-Kw';}
	if (team == 'Tor') {url = 'http://spreadsheets.google.com/pub?key=tlGuOwsSqqOBS4H6hAg-Q_Q';}
	if (team == 'Atl') {url = 'http://spreadsheets.google.com/pub?key=tujElf32-2d237jk3IzWLsg';}
	if (team == 'Mil') {url = 'http://spreadsheets.google.com/pub?key=tz1FL3X6KldYXIoGOHXpv6A';}
	if (team == 'StL') {url = 'http://spreadsheets.google.com/pub?key=t_WBl5PYQPvrO7eNWGf0Vqg';}
	if (team == 'ChC') {url = 'http://spreadsheets.google.com/pub?key=tt7HjIernphaSrv4wMWdUYg';}
	if (team == 'Ari') {url = 'http://spreadsheets.google.com/pub?key=tnUURWBOawaGbKXOD6W_Psg';}
	if (team == 'LAD') {url = 'http://spreadsheets.google.com/pub?key=tBbMgiEHXYczpjt0I7dajQQ';}
	if (team == 'SF ') {url = 'http://spreadsheets.google.com/pub?key=t4r9nky1EouVJsFXQlv3FKQ';}

	if (team == 'Cle') {url = 'http://spreadsheets.google.com/pub?key=tKIJtE0J83GL-6XiTzecEBw';}
	if (team == 'Sea') {url = 'http://spreadsheets.google.com/pub?key=tWj271vM8jP83pjeMtNrKog';}
	if (team == 'Fla') {url = 'http://spreadsheets.google.com/pub?key=tQJ2iJ0-ErOo_z9G3xKSQ9g';}
	if (team == 'NYM') {url = 'http://spreadsheets.google.com/pub?key=tfJWfaPG4VXbDyBscIZf1MQ';}
	if (team == 'Was') {url = 'http://spreadsheets.google.com/pub?key=tsCEGKNVcxttZHoBc2O6q0w';}
	if (team == 'Bal') {url = 'http://spreadsheets.google.com/pub?key=t50_b9iaARDxOK6TPjab3gQ';}
	if (team == 'SD ') {url = 'http://spreadsheets.google.com/pub?key=tErIWJtdBrirYvCnYijwbtA';}
	if (team == 'Phi') {url = 'http://spreadsheets.google.com/pub?key=tSSu2Qy8G9pTSsguHAbeu-A';}
	if (team == 'Pit') {url = 'http://spreadsheets.google.com/pub?key=ts_eLRKhnc6eR8rr3fVKHow';}
	if (team == 'Tex') {url = 'http://spreadsheets.google.com/pub?key=tnXR4qeDSfeXu_Y-nA8ZPWA';}
	if (team == 'TB ') {url = 'http://spreadsheets.google.com/pub?key=tgIp3wMqRUbYKz17SoXACQg';}
	if (team == 'Cin') {url = 'http://spreadsheets.google.com/pub?key=tj1FG9GPVGFzrJykhM94ogw';}
	if (team == 'Bos') {url = 'http://spreadsheets.google.com/pub?key=tz8qHiYrIzlFtVnly7gibjw';}
	if (team == 'Col') {url = 'http://spreadsheets.google.com/pub?key=trAgmH4kcIXFrWINNSx2cAg';}
	if (team == 'KC ') {url = 'http://spreadsheets.google.com/pub?key=tUTE2VVPkfB9ARpW5-5U-TQ';}
	if (team == 'Det') {url = 'http://spreadsheets.google.com/pub?key=tEZvMIXrj8vgGMsajr8pR0g';}
	if (team == 'Min') {url = 'http://spreadsheets.google.com/pub?key=tIn6UNnQQrmryUesyK0wSwg';}
	if (team == 'CWS') {url = 'http://spreadsheets.google.com/pub?key=tK7uKP_MP8Unu0Mx46heFcg';}

	if (team == 'NYY') {url = 'http://spreadsheets.google.com/pub?key=tpQLwiiQL4kzEzLhsUqVjLQ';}
	return url;
}

function set_title_and_color(player, playerName, playerServiceTime)
{    
   var titleColor;
   if (playerServiceTime != null) {
	 player.setAttribute("title", playerServiceTime);

	 if (playerServiceTime < 5) {
		  titleColor = "color:green";
	  } else if ( (5 <= playerServiceTime) && (playerServiceTime < 6) ) {
		  titleColor = "color:darkgoldenrod";
	  } else if (playerServiceTime >= 6) { 
		  titleColor = "color:red"; 
	  }			
	  player.childNodes[0].childNodes[0].setAttribute("style", titleColor);
   }
} //set_title_and_color

function get_service_time(mashPage, expression) {
	// Search mash DOM object with Xpath to get the MLB service time
	var mashNodeList = document.evaluate(
    	expression,
    	mashPage,
    	null,
    	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);           
    var playerNode;
 
   playerNode = mashNodeList.snapshotItem(0);
   return playerNode.parentNode.childNodes[3].childNodes[0].nodeValue;
}

//main
(function () {

	var contexts = ["//td[@class='player']","//td[@class='player first']","//td[@class='player first sorted']"];
	var players;
	for (k=0;k<contexts.length;k++) {
		players = document.evaluate(contexts[k], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		
		if (players.snapshotLength > 0) { break; }
	}

	for (var x=0;x<players.snapshotLength;x++) {
		var player = players.snapshotItem(x);
	  		
		//Yahoo includes some empty player classes; don't want to operate on those
		if (!(player.childNodes[0].getAttribute("class"))) {
			var team = player.childNodes[2].childNodes[0].childNodes[0].nodeValue;
	  		//Chop out leading paren and trailing positional information
	  		team = team.substring(1,4);
	  		var cot_url = get_cot_url(team);
						
    		var playerName = player.childNodes[0].childNodes[0].childNodes[0].nodeValue;

	  		// Change name from "John Smith" format to  "Smith, John"
	  		var first = playerName.substring(0, playerName.indexOf(" "));
	  		var last = playerName.substring(playerName.indexOf(" "));
	  		playerName = last + ', ' + first;
	  		//extra whitespace on the end
	  		playerName = playerName.slice(1);
	  		//strip accent marks from name
	  		playerName = strip_accents(playerName);
	  		
	  		valueString = playerName+COTSYEAR;
	  		GM_log(valueString);
	  		cachedValue = GM_getValue(playerName+COTSYEAR);
	  		GM_log('playername= '+playerName);
			
			if (cachedValue != null) {
				GM_log('cachedValue= '+cachedValue);
				set_title_and_color(player, playerName, cachedValue);
			} else {
				// HTTPRequest to the appropriate page. Pass in cot_url and player name
				(function(insideUrl, insidePlayerName, insidePlayer) {
	
					GM_xmlhttpRequest({
						method: 'GET',
						url: insideUrl,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'text/html',
						},
						onload: function(responseDetails) {
							var stuff = responseDetails.responseText;
							var mashPage = document.createElement('div');
							mashPage.innerHTML = stuff;
					
							playerNameNode = ["//td[text()=\""+insidePlayerName+"\"]"];
							playerServiceTime = get_service_time(mashPage, playerNameNode);
							set_title_and_color(insidePlayer, insidePlayerName, playerServiceTime);
							GM_setValue(insidePlayerName+COTSYEAR,playerServiceTime);
	  						GM_log('setValue='+insidePlayerName+COTSYEAR+','+playerServiceTime);
						} //onload
					}); //GM_xmlhttprequest 
				})(cot_url, playerName, player);//GM_xmlhttprequest function wrapper 
			}//else
		} //if
	} //for
}) (); // main