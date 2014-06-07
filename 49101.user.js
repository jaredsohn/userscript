// ==UserScript==
// @name           Darwin's Scoreinfo
// @namespace      Darwin's Scoreinfo
// @description    Puntuacion de Darwin's.
// @author         Monkey
// ==/UserScript==

var scoreTypes = ["Score", "Military", "Gold"];
var post       = { 
	"Score"     : "view=highscore&highscoreType=score&searchUser=",
	"Gold"      : "view=highscore&highscoreType=trader_score_secondary&searchUser=",
	"Military"  : "view=highscore&highscoreType=army_score_main&searchUser=",
};

function updateScore(type, score) {
    $X("//div[@id='scoreinfo']//*[@id='"+type+"']").innerHTML = score;
}
function showScore(type, enable) {
	$X("//div[@id='scoreinfo']//*[@id='"+type+"']").style.display = (enable) ? "block" : "none";
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
		<table style="margin-left:10px; margin-right:10px; font-size:12px;" width="200">
		 <tr>
		  <td align="left" id="total_score" class="ally"><b>{texts["Score"]}:</b></td>
		  <td align="left" id="Score">{texts["unknown"]}</td>
		 </tr>
		 <tr>
		  <td align="left" id="army_score_main" class="ally"><b>{texts["Military"]}:</b></td>
		  <td align="left" id="Military">{texts["unknown"]}</td>
		 </tr>
		 <tr>
		  <td align="left" id="trader_score_secondary" class="ally"><b>{texts["GoldScore"]}:</b></td>
		  <td align="left" id="Gold">{texts["unknown"]}</td>
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
function updateDetails(type, playerName, townLevel, responseText) {
	var root = getDocument(responseText);
	var score = $x("//td[@class='score']", root);
	var name = $x("//td[@class='name']", root);
	var place = $x("//td[@class='place']", root);
	var totalScore = "";
	var totalRank = "";
	for(var i=0; i< name.length; i++) {
		var pname = name[i].innerHTML.replace(/\s+/,"");
		if (pname == playerName.replace(/\s+/,"")) {
			totalScore = score[i].innerHTML;
			totalRank = place[i].innerHTML;
		}
	}
	switch (type) {
		case "Gold":
			if (totalScore) { 
				totalScore += " (#"+totalRank+")";
			} else {
				totalScore = "0";
			}
			break;
		case "Score": 
			totalScore += " (#"+totalRank+")";
			break;
		case "Military":
			totalScore += " (#"+totalRank+")";
			break
	}

	updateScore(type, totalScore);
	config.scoreinfo[type] = totalScore;
	saveConfig();
}

function ScoreInformation(e) {
	config["scoreinfo"] = {};
	var inline = $("scoreinfo");
	if (inline == undefined) {
		createScoreInfo();
	} 
	updateScore("Score", texts["fetch"]);
	updateScore("Military", texts["fetch"]);
	updateScore("Gold", texts["fetch"]);
	var playerName = $X("//div[@id='information']/ul[@class='cityinfo']/li[@class='owner']");
	if (playerName == undefined) {
		playerName = $X("//div[@id='information']//ul[@class='cityinfo']/li[@class='owner']");
		playerName = playerName.childNodes[2].textContent.Trim();
	} else {
		playerName = playerName.childNodes[1].textContent.Trim();
	}
	var townLevel = $x("//div[@id='information']//li[@class='citylevel']//text()")[1].textContent.Trim();
	var playerScore = -1;
    var infoContainer = $("infocontainer");
    if (infoContainer) {
    	var scorenode = $x("//div[@id='infocontainer']//li[@class='name']/text()")[1];
    	if (scorenode != undefined) {
    		scorenode.parentNode.style.display = "none";
    		playerScore = scorenode.textContent.replace(/,/g, "");
    	}
    	
    }
	
    	config.scoreinfo["lastCheckedTimestamp"] = _startTime;
   		config.scoreinfo["lastPlayerCheck"] = playerName;
       	config.scoreinfo["lastServerCheck"] = server;

		requestScore(playerName, 'Score', function(responseDetails) {
				updateDetails('Score', playerName, townLevel, responseDetails.responseText);
			});
        requestScore(playerName, 'Military', function(responseDetails) {
			updateDetails('Military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'Gold', function(responseDetails) {
			updateDetails('Gold', playerName, townLevel, responseDetails.responseText);
        });
}