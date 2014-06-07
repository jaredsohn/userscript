// ==UserScript==
// @name           TrophyManager Player Ratings v1
// @include        http://trophymanager.com/showprofile.php*
// ==/UserScript==

// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:
//               [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  2,  3,  2,  1,  1,  2,  2,  3,  3,  3,  2,  3,  3,  3], // D C
                 [  2,  3,  1,  1,  1,  2,  2,  2,  2,  2,  3,  3,  3,  3], // D L
                 [  2,  3,  1,  1,  1,  2,  2,  2,  2,  2,  3,  3,  3,  3], // D R
                 [  2,  2,  2,  1,  1,  1,  1,  1,  3,  2,  2,  3,  3,  3], // DM C
                 [  2,  3,  2,  1,  1,  1,  1,  2,  2,  2,  3,  3,  3,  3], // DM L
                 [  2,  3,  2,  1,  1,  1,  1,  2,  2,  2,  3,  3,  3,  3], // DM R
                 [  3,  2,  2,  2,  2,  1,  1,  1,  3,  1,  3,  2,  2,  3], // M C 
                 [  3,  2,  1,  2,  2,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M L
                 [  3,  2,  1,  2,  2,  1,  1,  1,  1,  1,  3,  2,  2,  3], // M R
                 [  3,  3,  2,  3,  3,  2,  2,  1,  3,  1,  3,  2,  2,  3], // OM C
                 [  3,  2,  1,  3,  3,  2,  2,  1,  1,  1,  3,  2,  2,  3], // OM L
                 [  3,  2,  1,  3,  3,  2,  2,  1,  1,  1,  3,  2,  2,  3], // OM R
                 [  2,  3,  2,  1,  2,  1,  2,  4,  4,  4,  2,  3,  3,  3], // GK
                 [  2,  3,  2,  3,  3,  3,  3,  2,  3,  2,  1,  1,  1,  3]];// F
// [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]
// Weights need to total 100
var weights = [[85,12, 3],  // D C
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
               [50,42, 8,0], // GK
               [80,18, 2]]; // F

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "GK", "F"];               

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
  	if (tableData[m].innerHTML.indexOf("star.gif") > 0) {
	  skillArray.push(20);
	} 
	else if (tableData[m].innerHTML.indexOf("star_silver.gif") > 0) {
	  skillArray.push(19);
	} 
	else if (tableData[m].innerHTML.indexOf("strong") > 0) {
	  skillArray.push(tableData[m].innerHTML.slice(8, 10));
	} 
	else if (tableData[m].innerHTML.indexOf("rgb") > 0) {
	  skillArray.push(tableData[m].innerHTML.slice(41, 42));
	} 
		else {
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
	var pomocny=tableData[0].innerHTML;
	var dlzka = pomocny.length;
	var lom = pomocny.slice(pomocny.indexOf(" ")+1,dlzka);
	if (tableData[0].innerHTML == "GK") {
	  playersPositions[0]="GK"
	}
	else if (pomocny.indexOf("/") > 0) {
	  playersPositions[0]=pomocny.slice(0,pomocny.indexOf("/"))+pomocny.slice(dlzka-2,dlzka);
	  playersPositions[1]=pomocny.slice(pomocny.indexOf("/")+1,pomocny.indexOf(" "))+pomocny.slice(dlzka-2,dlzka);
	}
	else if (pomocny.indexOf(",")>0) {
	  playersPositions[0]=pomocny.slice(0,pomocny.indexOf(","));
	  playersPositions[1]=pomocny.slice(pomocny.indexOf(",")+2,dlzka);
	}
	else if (lom.length > 1) { 
	  playersPositions[0]=pomocny.slice(0,dlzka-1);
	  playersPositions[1]=pomocny.slice(0,pomocny.indexOf(" ")+1)+pomocny.slice(dlzka-1,dlzka);
	}


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