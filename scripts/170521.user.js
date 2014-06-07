// ==UserScript==
// @name           BB Cap & Salary Calculator
// @namespace      http://www.buzzerbeater.com/add_player_cap_values
// @version        1.1.0
// @include        http://www.buzzerbeater.com/team/*/players.aspx
// @include        http://www.buzzerbeater.com/country/*/*/players.aspx
// @include        http://www.buzzerbeater.com/manage/transferlist.aspx
// @include        http://www.buzzerbeater.com/player/*/overview.aspx
// ==/UserScript==

waitForLoading();

function waitForLoading() {
	var loading = document.getElementById("loading");
	if (loading != null && loading.getAttribute("value") == "true") {
		setTimeout(waitForLoading, 500);
	} else {
		doCalcs();
	}
	patata
}

function doCalcs() {
	var PGcap = [0.18, 0.26, 0.30, 0.24, 0.12, 0.52, 0.03, 0.04, 0.20, 0.03];
	var SGcap = [0.45, 0.50, 0.42, 0.05, 0.04, 0.08, 0.03, 0.05, 0.25, 0.03];
	var SFcap = [0.58, 0.34, 0.26, 0.05, 0.03, 0.03, 0.05, 0.25, 0.33, 0.03];
	var PFcap = [0.32, 0.06, 0.07, 0.05, 0.03, 0.02, 0.40, 0.40, 0.40, 0.20];
	var Ccap  = [0.06, 0.08, 0.01, 0.04, 0.03, 0.01, 0.46, 0.46, 0.46, 0.25];

	var CAPmin = [10, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
	var CAPmax = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, '??'];
	
	var PGsal = [1.028, 1.041, 1.078, 1.079, 1.039, 1.152, 1.002, 1.000, 1.037, 1.000];
	var SGsal = [1.116, 1.149, 1.115, 1.006, 1.013, 1.000, 1.000, 1.004, 1.061, 1.005];
	var SFsal = [1.179, 1.077, 1.066, 1.000, 1.000, 1.000, 1.000, 1.059, 1.090, 1.002];
	var PFsal = [1.071, 1.005, 1.006, 1.001, 1.007, 1.006, 1.11, 1.117, 1.11, 1.065];
	var Csal  = [1.000, 1.000, 1.008, 1.004, 1.000, 1.000, 1.13, 1.137, 1.129, 1.063];

	// Transfer List and Roster Pages
	var players = document.getElementsByClassName("widebox");
	if (players.length == 0)
		players = document.getElementsByClassName("oldbox");

	if (players.length > 0) {
		for (var i = 0; i < players.length; i++) {
			if (players[i].innerHTML.indexOf("Tiro") !=-1) {
				var player = handlePlayerBox(document, players[i]);
				
				var ratings = [player.Jump_Shot, player.Jump_Range, player.Outside_Defense, player.Handling, player.Driving, player.Passing, player.Inside_Shot, player.Inside_Defense, player.Rebounding, player.Shot_Blocking];
				var caps = [getCapValue(ratings, PGcap), getCapValue(ratings, SGcap),  getCapValue(ratings, SFcap), getCapValue(ratings, PFcap), getCapValue(ratings, Ccap)];
				var cap = Math.round(Math.max.apply(null, caps) * 100) / 100;
				
				var salarys = [getSalaryValue(ratings, PGsal)*310, getSalaryValue(ratings, SGsal)*307,  getSalaryValue(ratings, SFsal)*322, getSalaryValue(ratings, PFsal)*295, getSalaryValue(ratings, Csal)*275];
				salary = Math.max.apply(null, salarys);
				salary = salary*Math.min(0.9855-0.018071*Math.log(salary),2.3868-0.128366*Math.log(salary));
				var salary = Math.round(salary * 100) / 100;
				
				var skillSum = 0;
				for (j = 0; j < ratings.length; j++)
					skillSum += ratings[j];
				
				
				var littleSkillSum = 0;
				for (j = 0; j < 6; j++)
					littleSkillSum += ratings[j];
					
				
				var bigSkillSum = 0;
				for (j = 6; j < ratings.length; j++)
					bigSkillSum += ratings[j];

				
				var out = document.evaluate(".//*[starts-with(normalize-space(text()),'Experiencia')]/../td[2]", players[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				out.innerHTML += ((out.innerHTML.length > 0) ? "<br/>" : "");
				out.innerHTML += "<b>Cap:</b> " + cap + " (" + CAPmin[player.Potential] + " to " + CAPmax[player.Potential] + ")<br/><b>Skill Points: </b>" + skillSum + " (" + littleSkillSum + "/" + bigSkillSum + ")<br/>";
				out.innerHTML += "<b>Salary:</b> " + salary + " $";
			}
		}
	}
}


function getCapValue(ratings, coefs) {
  var r = 0.0;
  for (j = 0; j < 10; j++) {
	r = r + ratings[j] * coefs[j];
  }
  return r;
}

function getSalaryValue(ratings, coefs) {
	  var r = 1.0;
	  for (j = 0; j < 10; j++) {
		r = r * Math.pow(coefs[j],ratings[j]);
	  }
	  return r;
	}

function extractSkill(document, node, skill) {
	var text = document.evaluate(".//*[starts-with(normalize-space(text()),'" + skill + "')]/a", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	text.innerHTML += ((text.innerHTML.length > 0) ? "/"+text.title : "");
	return parseInt(text.title);
}

function handlePlayerBox(document, node) {
	var player = new Object;
	
	var potential = document.evaluate(".//*[contains(@href,'#Potential')]", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	potential.innerHTML += ((potential.innerHTML.length > 0) ? " ("+potential.title+")" : "");
	player.Potential = potential.title;
	player.Jump_Shot = extractSkill(document, node, "Tiro"); 
	player.Jump_Range = extractSkill(document, node, "Alcance de tiro"); 
	player.Outside_Defense = extractSkill(document, node, "Def. exterior"); 
	player.Handling = extractSkill(document, node, "Manejo"); 
	player.Driving = extractSkill(document, node, "Penetración"); 
	player.Passing = extractSkill(document, node, "Pases"); 
	player.Inside_Shot = extractSkill(document, node, "Tiro interior"); 
	player.Inside_Defense = extractSkill(document, node, "Def. interior"); 
	player.Rebounding = extractSkill(document, node, "Rebotes"); 
	player.Shot_Blocking = extractSkill(document, node, "Tapones"); 
	player.Stamina = extractSkill(document, node, "Resistencia"); 
	player.Free_Throw = extractSkill(document, node, "Tiros libres"); 
	player.Experience = extractSkill(document, node, "Experiencia"); 
	return player;
}