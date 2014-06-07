// ==UserScript==
// @name           Show TrExMa Skill on Transfer List
// @namespace      http://twofourone.blogspot.com
// @description    Shows the Value as computed by TrExMa on the Transfer List
// @include        http://trophymanager.com/transform.php?*
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
                 
//               [Str,Sta,Pac,Han,One,Ref,Ari,Jum,Com,Kic,Thr] 
var gkSkills =   [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3];             // GK                
				 
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
// At this point, distribution is unimportant.
var gkWeights =[50, 42, 8]; // GK

var positionNames = ["DC", "DL", "DR", "DMC", "DML", "DMR", "MC", "ML", "MR", "OMC", "OML", "OMR", "FC"];               

// positionIndex is the array of skill priority for this player.
// skills is an array of skills for each user
document.calculateSkill = function(skills, skillRankings, skillWeights) {

  var totSkill = 0;
  for (var i=0; i< skillRankings.length; i++) {

    totSkill += skills[i]*document.calculateSkillWeight(skillRankings, skillWeights, i);
  }
  
 totSkill = totSkill / 200; 
 totSkill = Math.round(totSkill*100)/100;

 return totSkill;
};

document.calculateSkillWeight  = function(positionWeightLevels, weights, index) {
  var weight = 0;
  weight = weights[positionWeightLevels[index] - 1] / document.numberAtWeight(positionWeightLevels, positionWeightLevels[index]) * 10;
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
  var contentDivs = document.getElementsByClassName("content");
  var playerTable = contentDivs[0].getElementsByTagName("TABLE");
  return playerTable[0];
};

document.findPositionIndex = function(position) {
 var index = -1;
 if (position.toUpperCase().indexOf("GK") == 0) {
 	index = 99;
 } else {
   for (var k=0; k< positionNames.length; k++) {
     if (position.toUpperCase().indexOf(positionNames[k]) == 0) {
       index = k;
       k = positionNames.length;
     }
   }
 }
 return index;
};

document.getSkills = function(tableData) {
  var skillArray = [];
  for (var l = 2; l < tableData.length - 2; l++) {
  	if (tableData[l].innerHTML.indexOf("img") > 0) {
	  skillArray.push(20);
	} else {
      skillArray.push(tableData[l].innerHTML);
	}
  }
  return skillArray;
};

document.presentPlayerSkill = function(playerRow) {
  var tableData = playerRow.getElementsByTagName("TD");  
  if (tableData.length > 1) {
    var skills = document.getSkills(tableData);
    var playersPositions = tableData[1].innerHTML.split(" ");
	for (var z = 0; z < playersPositions.length; z++) {
	  if (playersPositions[z].length == 0) {
	  	playersPositions.splice(z, 1);
		z--;
	  }
	}
    for (var j = 0; j < playersPositions.length; j++) {
      var positionIndex = document.findPositionIndex(playersPositions[j]);
	  var positionSkill = 0;
	  if (positionIndex > -1) {
	    if (positionIndex == 99) {
	  	  // GK
		  positionSkill = document.calculateSkill(skills, gkSkills, gkWeights);
	    } else {
		  positionSkill = document.calculateSkill(skills, positions[positionIndex], weights[positionIndex]);
		}
        var cell = document.createElement("td");
		cell.style.borderLeft = "1px solid white";
		cell.style.paddingRight = "4px";
		cell.style.paddingLeft = "4px";
        cell.innerHTML = positionSkill;
        playerRow.appendChild(cell); 
	  }
	}
	if (playersPositions.length < 2) {
      var cell = document.createElement("td");
      cell.style.borderLeft = "1px solid white";
      cell.innerHTML = "N/A";
      playerRow.appendChild(cell);	
    }
  }
};

document.createTitle = function(titleRow) {
   var cell = document.createElement("th");
   cell.innerHTML = "SK1";
   cell.className = "headingtransform";
   cell.rowSpan = 2;
   cell.style.border = "1px solid white";
   titleRow.appendChild(cell);
   var cell2 = cell.cloneNode(true);
   cell2.innerHTML = "SK2";
   titleRow.appendChild(cell2);
};

(function() {
  var playerTable = document.getPlayerTable();
  var playerRows = playerTable.getElementsByTagName("TR");
  document.createTitle(playerRows[0]);
  for (var i = 2; i < playerRows.length; i++) {
    document.presentPlayerSkill(playerRows[i]);
  }
})();
