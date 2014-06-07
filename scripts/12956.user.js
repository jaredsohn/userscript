// ==UserScript==
// @name           TrophyManager Show TrExMa For Player
// @namespace      http://twofourone.blogspot.com
// @description    In TrophyManager.com Shows TrExMa Value for Favorite Positions for Player
// @include        http://trophymanager.com/showprofile.php?playerid=*
// ==/UserScript==

// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:
//               [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  1,  3,  1,  1,  1,  3,  3,  2,  2,  2,  1,  3,  3,  3], // DC
                 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DL
                 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DR
                 [  1,  2,  2,  1,  1,  1,  1,  1,  2,  2,  1,  3,  3,  3], // DMC
                 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DML
                 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DMR
                 [  2,  2,  3,  1,  1,  1,  1,  1,  3,  1,  2,  3,  3,  3], // MC 
                 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // ML
                 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // MR
                 [  2,  3,  3,  2,  2,  1,  1,  1,  3,  1,  2,  1,  1,  3], // OMC
                 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OML
                 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OMR
                 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3]];// FC
// Weights need to total 100
var weights = [[85,12, 3],  // DC
               [70,25, 5],  // DL
               [70,25, 5],  // DR
               [90,10, 0],  // DMC
               [50,40,10],  // DML
               [50,40,10],  // DMR
               [85,12, 3],  // MC               
               [90, 7, 3],  // ML
               [90, 7, 3],  // MR
               [90,10, 0],  // OMC
               [60,35, 5],  // OML
               [60,35, 5],  // OMR
               [80,18, 2]]; // FC

var positionNames = ["DC", "DL", "DR", "DMC", "DML", "DMR", "MC", "ML", "MR", "OMC", "OML", "OMR", "FC"];               

// positionIndex is the array of skill priority for this player.
// skills is an array of skills for each user
document.calculateSkill = function(positionIndex, skills) {

  var totSkill = 0;
  for (var i=0; i< positions[positionIndex].length; i++) {

    totSkill += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
  }
  
 totSkill = totSkill / 200; 
 totSkill = Math.round(totSkill*1000)/1000;

 return totSkill;
};

document.calculateSkillWeight  = function(positionWeightLevels, weights, index) {
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

document.getElementsByClassName = function(cl) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) retnode.push(elem[i]);
  }
  return retnode;
};

document.getPlayerTable = function() {
  var playerTable = [];
  var contentDivs = document.getElementsByClassName("content");
  for (var c = 0; c < contentDivs.length; c++) {
  	if (contentDivs[c].parentNode.id.indexOf("column2") > -1) {
      var playerTable = contentDivs[c].getElementsByTagName("TABLE");
  	}
  }
  return playerTable[0];
};

document.findPositionIndex = function(position) {
 var index = -1;
 for (var k=0; k< positionNames.length; k++) {
  if (position.toUpperCase().indexOf(positionNames[k]) == 0) {
    index = k;
    k = positionNames.length;
  }
 }
 return index;
};

document.getSkills = function(skillRows) {
  var skillArray = [];
  for (var l = 0; l < 4; l++) {
    var tableData = skillRows[l].getElementsByTagName("TD");  
    if (tableData.length > 1) {
      for (var m = 0; m < tableData.length; m++) {
        if (tableData[m].innerHTML.indexOf("img") > 0) {
	      skillArray.push(20);
	    } else {
          skillArray.push(tableData[m].innerHTML);
	    }        
      }
    }
  }
  return skillArray;
};

document.showPlayerSkills = function(playerRow, skills) {
  var tableData = playerRow.getElementsByTagName("TD");  
  if (tableData.length > 1) {
  	tableData[2].colSpan = "2";
    tableData[3].colSpan = "3";
    var playersPositions = tableData[0].innerHTML.split("/");
	for (var z = 0; z < playersPositions.length; z++) {
	  if (playersPositions[z].length == 0) {
	  	playersPositions.splice(z, 1);
		z--;
	  }
	}
    for (var j = 0; j < playersPositions.length; j++) {
      var positionIndex = document.findPositionIndex(playersPositions[j]);
	  if (positionIndex > -1) {
        var positionSkill = document.calculateSkill(positionIndex, skills);
        var cell = document.createElement("td");
		cell.className="color";
        cell.innerHTML = positionSkill;
        playerRow.appendChild(cell);
      } 
	}
	if (playersPositions.length < 2) {
      var cell = document.createElement("td");
      cell.className="color";
      cell.innerHTML = "N/A";
      playerRow.appendChild(cell);	
    }
  }
};

document.createTitle = function(titleRow) {
   var cells = titleRow.getElementsByTagName("th");
   if (cells.length > 1) {
     cells[2].colSpan = "2";
     cells[3].colSpan = "3";
     var cell = document.createElement("th");
     cell.innerHTML = "SK1";
     titleRow.appendChild(cell);
     var cell2 = cell.cloneNode(true);
     cell2.innerHTML = "SK2";
     titleRow.appendChild(cell2);
   }
};

(function() {
  var playerTable = document.getPlayerTable();
  var playerRows = playerTable.getElementsByTagName("TR");
  var skillArray = document.getSkills(playerRows);
  document.createTitle(playerRows[4]);
  document.showPlayerSkills(playerRows[5], skillArray);
})();
