// ==UserScript==
// @name           Darwin's Scoreinfo2
// @namespace      Darwin's Scoreinfo2
// @description    Puntuacion de Darwin's.
// @author         Monkey
// @include                     http://*.ikariam.*/index.php*
// ==/UserScript==

var scoreTypes = ["Score", "Military", "Gold", "AllyScore", "AllyMembers"];
var post       = { 
	"Score"     : "view=highscore&highscoreType=score&searchUser=",
	"Gold"      : "view=highscore&highscoreType=trader_score_secondary&searchUser=",
	"Military"  : "view=highscore&highscoreType=army_score_main&searchUser=",
	"AllyScore" : "view=allyPage&allyId=",
};

function updateScore(type, score) {
    $X("//div[@id='scoreinfo']//*[@id='"+type+"']").innerHTML = score;
}
function showScore(type, enable) {
	$X("//div[@id='scoreinfo']//*[@id='"+type+"']").style.display = (enable) ? "" : "none";
}
function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createScoreInfo() {
	var div = document.createElement("div");
	div.setAttribute("id", "scoreinfo");
	div.setAttribute("class", "dynamic");
	var divhtml = <>
		<h3 class="header">{texts["ScoreInfo"]}</h3>
		<table style="margin-left:10px; margin-right:10px;" width="200">
		 <tr id="total_score">
		  <td align="left" class="ally"><b>{texts["MyScore"]}:</b></td>
		  <td align="left" id="Score">{texts["unknown"]}</td>
		 </tr>
		 <tr id="army_score_main">
		  <td align="left" class="ally"><b>{texts["Military"]}:</b></td>
		  <td align="left" id="Military">{texts["unknown"]}</td>
		 </tr>
		 <tr id="trader_score_secondary">
		  <td align="left" class="ally"><b>{texts["GoldScore"]}:</b></td>
		  <td align="left" id="Gold">{texts["unknown"]}</td>
		 </tr>
		 <tr id="ally_score">
		  <td align="left" class="ally"><b>{texts["AllyScore"]}:</b></td>
		  <td align="left" id="AllyScore">{texts["unknown"]}</td>
		 </tr>
		 <tr id="ally_members">
		  <td align="left" class="ally"><b>{texts["AllyMembers"]}:</b></td>
		  <td align="left" id="AllyMembers">{texts["unknown"]}</td>
		 </tr>
		</table>
		<div class="footer"></div>
	</>;
	div.innerHTML = divhtml;
	var n = $("infocontainer");
	if (!n) { 
		n = $("information"); 
	}
	insertNodeAfter(div, n)
}
function requestScore(key, type, onload) {
    GM_xmlhttpRequest({
        method: 'POST',
           url: 'http://' + server + '/index.php',
	      data: post[type] + key,
       headers: {
       'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
     'Content-type' : 'application/x-www-form-urlencoded',
           'Accept' : 'application/atom+xml,application/xml,text/xml',
           'Referer': 'http://' + server + '/index.php', 
            'Cookie': document.cookie
		},
		onload:onload
	});
}
function updateDetails(type, playerName, responseText) {
	var root = getDocument(responseText);
	var score = $x("//td[@class='score']", root);
	var name = $x("//td[@class='name']", root);
	var place = $x("//td[@class='place']", root);
	var totalScore = "";
	var totalRank = "";
	for(var i=0; i< name.length; i++) {
		var pname = name[i].innerHTML.replace(/\s+/g,"");
		if (pname == playerName.replace(/\s+/g,"")) {
			totalScore = score[i].innerHTML;
			totalRank = place[i].innerHTML;
		}
	}
	totalScore += " (#"+totalRank+")";
	updateScore(type, totalScore);
	config.scoreinfo[type] = totalScore;
	saveConfig();
}
function updateAllyDetails(divId, responseText) {
	var root = getDocument(responseText);
	var posScore = $X("//table[@id='allyinfo']//tr[position()=last()-1]//td[position()=last()]", root).textContent;
	var members = $X("//table[@id='allyinfo']//tr[position()=2]//td[position()=last()]", root).textContent;
    if (/([0-9]+)\s\((.+)\)/.exec(posScore)!=null) {
    	allRank = RegExp.$1;
    	posScore = RegExp.$2;
    }
    
    var strScore = posScore;
    members = members +" (#" + allRank +")";
    updateScore("AllyScore", strScore);
    updateScore("AllyMembers", members);
    config.scoreinfo["AllyScore"] = strScore;
    config.scoreinfo["AllyMembers"] = members;
	saveConfig();
}
function ScoreInformation(e) {
	config = getConfig();
	if (config["scoreinfo"] == undefined) {
		config["scoreinfo"] = {};
	}
	var inline = $("scoreinfo");
	if (inline == undefined) {
		createScoreInfo();
	} else {
   		showScore("ally_score", true);
   		showScore("ally_members", true);
	}
	updateScore("Score", texts["fetch"]);
	updateScore("Military", texts["fetch"]);
	updateScore("Gold", texts["fetch"]);
	updateScore("AllyScore", texts["fetch"]); 
	updateScore("AllyMembers", texts["fetch"]);
	var playerName = $X("//div[@id='information']/ul[@class='cityinfo']/li[@class='owner']");
	if (playerName == undefined) {
		playerName = $X("//div[@id='information']//ul[@class='cityinfo']/li[@class='owner']");
		playerName = playerName.childNodes[2].textContent.Trim();
	} else {
		playerName = playerName.childNodes[1].textContent.Trim();
	}
	var allyname = $x("//div[@id='information']//li[@class='ally']//text()")[1].textContent.Trim();
	var playerScore = -1;
    var infoContainer = $("infocontainer");
    if (infoContainer) {
    	var scorenode = $x("//div[@id='infocontainer']//li[@class='name']/text()")[1];
    	if (scorenode != undefined) {
    		scorenode.parentNode.style.display = "none";
    		playerScore = scorenode.textContent.replace(/,/g, "");
    	}
    }
	var allyId;
	if (allyname != "-") {
		allyId = /allyId=([0-9]+)/.exec($X("//li[@class='ally']//a").href)[1];
	}
	else {
		allyId = -1;
       	config.scoreinfo["AllyScore"] = "-";
       	config.scoreinfo["AllyMembers"] = "-";
       	saveConfig();
	}
	var checkedTime = (_startTime - (10 * 60 *1000));
	if (playerName != config.scoreinfo["lastPlayerCheck"] || config.scoreinfo["lastCheckedTimestamp"] < checkedTime || config.scoreinfo["lastServerCheck"] != server) {
    	config.scoreinfo["lastCheckedTimestamp"] = _startTime;
   		config.scoreinfo["lastPlayerCheck"] = playerName;
       	config.scoreinfo["lastServerCheck"] = server;
       	// 更新資料
		requestScore(playerName, 'Score', function(responseDetails) {
			updateDetails('Score', playerName, responseDetails.responseText);
		});
        requestScore(playerName, 'Military', function(responseDetails) {
			updateDetails('Military', playerName, responseDetails.responseText);
        });
        requestScore(playerName, 'Gold', function(responseDetails) {
			updateDetails('Gold', playerName, responseDetails.responseText);
        });
        
		if (allyId != -1) {
			requestScore(allyId, 'AllyScore', function(responseDetails) {
				updateAllyDetails('AllyScore', responseDetails.responseText);
			});
		} else {
			updateScore("AllyScore", "-")
			updateScore("AllyMembers", "-")
			showScore("ally_score", false);
			showScore("ally_members", false);
			saveConfig();
		}
	} else {
       	for(key in scoreTypes) {
           	var type = scoreTypes[key];
           	if (type == "AllyScore" && config.scoreinfo[type] == "-") {
				showScore("ally_score", false);
           	}
           	if (type == "AllyMembers" && config.scoreinfo[type] == "-") {
				showScore("ally_members", false);
           	}
           	updateScore(type, config.scoreinfo[type]);
       	}
	}
}
