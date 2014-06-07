// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.

// Determine whether this is Trophymanager or FMU
var bIsUltra = location.href.indexOf("ultra") != -1;

// Determine whether the player is a goalkeeper
var bIsGoalie = false;

// Array maps to these skills:
//			   [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  1,  3,  1,  1,  1,  3,  3,  2,  2,  2,  1,  3,  3,  3], // D C
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D L
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D R
		 [  1,  2,  2,  1,  1,  1,  1,  1,  2,  2,  1,  3,  3,  3], // DM C
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM L
		 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM R
		 [  2,  2,  3,  1,  1,  1,  1,  1,  3,  1,  2,  3,  3,  3], // M C 
		 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M L
		 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M R
		 [  2,  3,  3,  2,  2,  1,  1,  1,  3,  1,  2,  1,  1,  3], // OM C
		 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM L
		 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM R
		 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3], // F
		 [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]]; // GK


// [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]
// Weights need to total 100
var weights = [ [85,12, 3],  // D C
		[70,25, 5],  // D L
		[70,25, 5],  // D R
		[90,10, 0],  // DM C
		[50,40,10],  // DM L
		[50,40,10],  // DM R
		[85,12, 3],  // M C			   
		[90, 7, 3],  // M L
		[90, 7, 3],  // M R
		[90,10, 0],  // OM C
		[60,35, 5],  // OM  L
		[60,35, 5],  // OMR
		[80,18, 2], // F
		[50,42, 8]]; // GK

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];
var positionFullNames = ["Defender Center", "Defender Left", "Defender Right", "Defensive Midfielder Center", "Defensive Midfielder Left", "Defensive Midfielder Right", "Midfielder Center", "Midfielder Left", "Midfielder Right", "Offensive Midfielder Center", "Offensive Midfielder Left", "Offensive Midfielder Right", "Forward", "Goalkeeper"];

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
		
		totSkill = totSkill / 1000; 
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
						if (bIsUltra)
							tableData[j].innerHTML = "<img src=\"/pics/star.png\" tooltip=\"100\">";							
						skillArray.push("100");
					}
					else if (tableData[j].innerHTML.indexOf("star_silver.png") > 0) {
						if (bIsUltra)
							tableData[j].innerHTML = "<img src=\"/pics/star_silver.png\" tooltip=\"90\">";						
						skillArray.push("90");
					}
					else if (tableData[j].textContent.length != 0) {
						if (bIsUltra) {
							var sTmp = tableData[j].textContent;
							sTmp = sTmp.substring(0,sTmp.indexOf(" "));
							var iNum = Number(sTmp);
							var iNumDiv5 = Math.round(iNum / 5)
							tableData[j].textContent = iNumDiv5.toString();
							skillArray.push(iNum.toString());
						}
						else {
							var sTmp = tableData[j].textContent;
							var iNum = Number(sTmp);
							iNum = iNum * 5;
							skillArray.push(iNum.toString());
						}
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
					if (positionIndex == 13)
						bIsGoalie = true;
				}
		}
		return SKs;
	}
	
	document.createTR = function(table, SKarray, skillArray) {
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.innerHTML = "SK1";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		td.innerHTML = SKarray[0];
		tr.appendChild(td);
		var th = document.createElement("th");
		th.innerHTML = "SK2";
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
		
		// Supersecret (A)SI formula
		if (bIsUltra) 
		{
			var playerInfoTable = document.getElementsByClassName("float_left info_table zebra")[0];
			playerInfoTable = playerInfoTable.getElementsByTagName("tbody")[0]; 
			var sum = 0;
			for (var i = 0; i < skillArray.length; i++) {
				sum += Number(skillArray[i]);
			}	
			sum = sum / 5.0;
			sum = 
			(3.3425964981757407) * Math.pow(10,5) * Math.pow(sum,0)
		 +  (-9.7675889011048748) * Math.pow(10,3) * Math.pow(sum,1)
		 +  (1.0660075345324698) * Math.pow(10,2) * Math.pow(sum,2)
		 +  (-5.2178387353065647) * Math.pow(10,-1) * Math.pow(sum,3)
		 +  (9.9362659731437207) * Math.pow(10,-4) * Math.pow(sum,4);	 
			if (bIsGoalie)
				sum = sum * 5;
			sum = Math.round(sum);
			sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");		
			var tr = document.createElement("tr");
			var th = document.createElement("th");
			th.innerHTML = "Skill Index";
			tr.appendChild(th);
			var td = document.createElement("td");
			td.innerHTML = sum.toString();
			tr.appendChild(td);
			rows = playerInfoTable.getElementsByTagName("tr"); 
			playerInfoTable.insertBefore(tr,rows[6]);
		}			
	};
	
	(function() {
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var skillArray = document.getSkills(playerTable);
		var SKs = computeSK(skillArray);
		document.createTR(playerTable, SKs, skillArray);
	})();
}

// ==UserScript==
// @name		TrophyManager & FMU Skill calculator
// @description	Calculates TrExMa and (A)SI values for players. Fork from TrophyBuddy: http://userscripts.org/scripts/show/151128
// @version		1.0
// @include		http://ultra.trophymanager.com/players/*
// @exclude		http://ultra.trophymanager.com/players
// @include		http://trophymanager.com/players/*
// @exclude		http://trophymanager.com/players
// @include		https://ultra.trophymanager.com/players/*
// @exclude		https://ultra.trophymanager.com/players
// @include		https://trophymanager.com/players/*
// @exclude		https://trophymanager.com/players
// ==/UserScript==