// ==UserScript==
// @name		   TM new showprofile
// @description	In TrophyManager.com Shows TrExMa Value for Favorite Positions for Player
// @include		http://trophymanager.com/players/*
// @exclude		http://trophymanager.com/players
// ==/UserScript==


// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:
//	 [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  2,  4,  2,  1,  1,  4,  2,  3,  3,  4,  2,  4,  4,  4], // D C
		 [  2,  3,  1,  1,  1,  3,  2,  2,  2,  2,  2,  3,  3,  3], // D L
		 [  2,  3,  1,  1,  1,  3,  2,  2,  2,  2,  2,  3,  3,  3], // D R
		 [  1,  2,  2,  1,  1,  1,  1,  1,  2,  2,  3,  3,  3,  3], // DM C
		 [  2,  3,  1,  1,  1,  3,  2,  1,  1,  1,  2,  3,  3,  3], // DM L
		 [  2,  3,  1,  1,  1,  3,  2,  1,  1,  1,  2,  3,  3,  3], // DM R
		 [  2,  3,  3,  3,  3,  1,  2,  1,  2,  2,  2,  2,  2,  3], // M C 
		 [  5,  5,  1,  3,  3,  2,  5,  2,  1,  2,  4,  4,  4,  3], // M L
		 [  5,  5,  1,  3,  3,  2,  5,  2,  1,  2,  4,  4,  4,  3], // M R
		 [  2,  2,  2,  3,  3,  1,  2,  1,  2,  1,  1,  1,  1,  3], // OM C
		 [  5,  5,  1,  3,  3,  5,  5,  2,  1,  2,  4,  4,  4,  3], // OM L
		 [  5,  5,  1,  3,  3,  5,  5,  2,  1,  2,  4,  4,  4,  3], // OM R
		 [  2,  4,  2,  3,  3,  4,  2,  2,  4,  2,  1,  1,  1,  3], // F
		 [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]]; // GK


// [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]
// Weights need to total 100
var weights = [ [55,40, 5, 0],  // D C
		[45,50, 5],  // D L
		[45,50, 5],  // D R
		[80,15, 5],  // DM C
		[60,20,20],  // DM L
		[60,20,20],  // DM R
		[30,55,15],  // M C			   
		[30,26, 6, 26, 12],  // M L
		[30,26, 6, 26, 12],  // M R
		[70,27, 3],  // OM C
		[29,17, 3, 35, 16],  // OM  L
		[29,17, 3, 35, 16],  // OMR
		[60,34, 0, 6], // F
		[50,42, 8]]; // GK

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];
var positionFullNames = ["Obránce Střední", "Obránce Levý", "Obránce Pravý", "Defenzivní Záložník Střední", "Defenzivní Záložník Levý", "Defenzivní Záložník Pravý", "Záložník Střední", "Záložník Levý", "Záložník Pravý", "Ofenzivní záložník Střední", "Ofenzivní záložník Levý", "Ofenzivní záložník Pravý", "Útočník", "Gólman"];

if (location.href.indexOf("/players/") != -1){

	// positionIndex is the array of skill priority for this player.
	// skills is an array of skills for each user
	
	document.calculateSkill = function(positionIndex, skills) {
		
		var totSkill = 0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				totSkill += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
			}
		}
		
		totSkill = totSkill / 200; 
		totSkill = Math.round(totSkill*1000)/1000;
		
		return totSkill;
	};
	
	document.calculateSkillWeight = function(positionWeightLevels, weights, index) {
		var weight = 0;
		weight = weights[positionWeightLevels[index]-1] / document.numberAtWeight(positionWeightLevels, positionWeightLevels[index]) * 10;
		return weight;
	};
	
	document.numberAtWeight = function(positionWeightLevels, value) {
		var count = 0;
		for (var i=0; i< positionWeightLevels.length; i++) {
			if (positionWeightLevels[i] == value) {
				count++;
			}
		}
		return count;
	};

	document.findPositionIndex = function(position) {
		var index = -1;
		for (var k=0; k< positionFullNames.length; k++) {
			if (position.indexOf(positionFullNames[k]) == 0) {
				index = k;
				k = positionFullNames.length;
			}
		}
		return index;
	};
	
	document.getSkills = function(table) {
		var skillArray = [];
		var tableData = table.getElementsByTagName("td");
		if (tableData.length > 1) {
			for (var i = 0; i < 2; i++) {
				for (var j = i; j < tableData.length; j += 2) {
					if (tableData[j].innerHTML.indexOf("star.png") > 0) {
						skillArray.push(20);
					}
					else if (tableData[j].innerHTML.indexOf("star_silver.png") > 0) {
						skillArray.push(19);
					}
					else if (tableData[j].textContent.length != 0) {
						skillArray.push(tableData[j].textContent);
					}
				}
			}
		}
		return skillArray;
	};

	function computeSK(skills){
	var SKs = [0, 0];
	var positionCell = document.getElementsByClassName("favposition long")[0].childNodes;
	var positionArray = [];
	if (positionCell.length == 1){
			positionArray[0] = positionCell[0].textContent;
	} else if (positionCell.length == 2){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
	} else if (positionCell[1].className == "split"){
			positionArray[0] = positionCell[0].textContent + positionCell[3].textContent;
			positionArray[1] = positionCell[2].textContent + positionCell[3].textContent;
	} else if (positionCell[3].className == "f"){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[3].textContent;
	} else {
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[0].textContent + positionCell[3].textContent;
	}
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
			if (positionIndex > -1) {
				SKs[i] = document.calculateSkill(positionIndex, skills);
			}
	}
	return SKs;
	}
	
	document.createTR = function(table, SKarray) {
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.innerHTML = "SKm1";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		td.innerHTML = SKarray[0];
		tr.appendChild(td);
		var th = document.createElement("th");
		th.innerHTML = "SKm2";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		if (SKarray[1] == 0){
			td.innerHTML = "N/A";
		} else {
			td.innerHTML = SKarray[1];
		}
		tr.appendChild(td);
		table.appendChild(tr);
	};
	
	(function() {
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var skillArray = document.getSkills(playerTable);
		var SKs = computeSK(skillArray);
		document.createTR(playerTable, SKs);
	})();
}
