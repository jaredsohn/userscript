// ==UserScript==
// @name           TrophyManager Show TrExMa on Squad
// @namespace      http://twofourone.blogspot.com
// @description    Show the TrExMa ratings for Favorite Positions on the Squad page
// @include        http://trophymanager.com/squad.php*
// ==/UserScript==

// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:

//               [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
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
                 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3]];// F

//               [Str,Sta,Pac,Han,One,Ref,Ari,Jum,Com,Kic,Thr] 
var gkSkills =   [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3];             // GK                
				 
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
               [60,35, 5],  // OM L
               [60,35, 5],  // OM R
               [80,18, 2]]; // F
// At this point, distribution is unimportant.
var gkWeights =[50, 42, 8]; // GK

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F"];               

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
  	if (contentDivs[c].parentNode.id.indexOf("column") > -1) {
      var playerTable = contentDivs[c].getElementsByTagName("TABLE");
      c = contentDivs.length;
  	}
  }
  return playerTable[0];
};

document.getGKTable = function() {
  var gkTable = [];
  var contentDivs = document.getElementsByClassName("content");
  for (var c = 0; c < contentDivs.length; c++) {
  	if (contentDivs[c].parentNode.id.indexOf("column") > -1) {
      var gkTable = contentDivs[c].getElementsByTagName("TABLE");
      c = contentDivs.length;
  	}
  }
  return gkTable[1];
}

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

document.getSkills = function(tableData) {
  var skillArray = [];
  for (var l = 5; l < tableData.length - 1; l++) {
  	if (tableData[l].innerHTML.indexOf("star.gif") > 0) {
	  skillArray.push(20);
	} 
	else if (tableData[l].innerHTML.indexOf("star_silver.gif") > 0) {
	  skillArray.push(19);
	} 
	else if (tableData[l].innerHTML.indexOf("strong") > 0) {
	  skillArray.push(tableData[l].innerHTML.slice(8, 10));
	} 
	else if (tableData[l].innerHTML.indexOf("rgb") > 0) {
	  skillArray.push(tableData[l].innerHTML.slice(41, 42));
	} 
		else {
			skillArray.push(tableData[l].innerHTML);
			}
  }
  return skillArray;
};

document.showPlayerSkills = function(playerRow) {
  var tableData = playerRow.getElementsByTagName("TD");  
  if (tableData.length > 1) {
  	var skills = document.getSkills(tableData);
    var playersPositions = tableData[4].innerHTML.split("/");
	var pomocny=tableData[4].innerHTML.replace("&nbsp;","");
	var docasne=pomocny.indexOf("&");
	pomocny=pomocny.slice(0,docasne);
	var dlzka = pomocny.length;
	var lom = pomocny.slice(pomocny.indexOf(" ")+1,dlzka);
	if (pomocny.indexOf("/") > 0) {
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
        playersPositions[z] = playersPositions[z].replace("&nbsp;", "", "g");	
	  if (playersPositions[z].length == 0) {
	  	playersPositions.splice(z, 1);
		z--;
	  }
	}
	tableData[tableData.length - 1].style.paddingRight = "3px";
    for (var j = 0; j < playersPositions.length; j++) {
      var positionIndex = document.findPositionIndex(playersPositions[j]);
	  if (positionIndex > -1) {
		var positionSkill = document.calculateSkill(skills, positions[positionIndex], weights[positionIndex]);
		var cell = tableData[tableData.length - 1].cloneNode(true);
        cell.innerHTML = positionSkill;
        playerRow.appendChild(cell);
      } 
    }
	if (playersPositions.length < 2) {
	  var cell = tableData[tableData.length - 1].cloneNode(true);
      cell.innerHTML = "N/A";
      playerRow.appendChild(cell);	
    }
  }
};

document.showGKSkills = function(gkRow) {
  var tableData = gkRow.getElementsByTagName("TD");  
  if (tableData.length > 1) {
  	var skills = document.getSkills(tableData);
	tableData[tableData.length - 1].style.paddingRight = "3px";
    var gkSkill = document.calculateSkill(skills, gkSkills, gkWeights);
    var cell = tableData[tableData.length - 1].cloneNode(true);
    cell.innerHTML = gkSkill;
    gkRow.appendChild(cell);
  }
};

document.createTitle = function(titleRow) {
   var cells = titleRow.getElementsByTagName("th");
   if (cells.length > 1) {
     var cell = document.createElement("th");
     cell.innerHTML = "SK1";
     titleRow.appendChild(cell);
     var cell2 = cell.cloneNode(true);
     cell2.innerHTML = "SK2";
     titleRow.appendChild(cell2);
   }
};

document.createGKTitle = function(titleRow) {
   var cells = titleRow.getElementsByTagName("th");
   if (cells.length > 1) {
     var cell = document.createElement("th");
     cell.innerHTML = "SK";
     titleRow.appendChild(cell);
   }
};


(function() {
  var playerTable = document.getPlayerTable();
  var playerRows = playerTable.getElementsByTagName("TR");
  document.createTitle(playerRows[0]);
  for (var i = 1; i < playerRows.length; i++) {
    document.showPlayerSkills(playerRows[i]);
  }
  var gkTable = document.getGKTable();
  var gkRows = gkTable.getElementsByTagName("TR");
  document.createGKTitle(gkRows[0]);
  for (var i = 1; i < gkRows.length; i++) {
    document.showGKSkills(gkRows[i]);
  }
})();

