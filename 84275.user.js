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
                 [  2,  3,  2,  1,  2,  1,  2,  4,  4,  4,  2,  3,  3,  3], // GK
                 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3]];// F
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
*/

//Navigationsbereich
var div = document.createElement('div');
appdiv = document.body.appendChild(div);
appdiv.innerHTML = '<div id="TrexTM" style="position: fixed; top: 10px;right: 5px; height: 500px; width: 150px; -moz-opacity: .10; text-align: left; border: 3px #000000 outset; display:inline;"><img src="http://img816.imageshack.us/img816/8829/semttulo1te.jpg"><p style="text-decoration: underline;">Geral</p><li><a href="http://trophymanager.com/klubhus.php" target="_self" style="font-size: 10px;" title="Sede">- Sede </a></li><li><a href="http://trophymanager.com/oecon.php" target="_self" style="font-size: 10px;" title="Economia">- Economia </a><li><a href="http://trophymanager.com/showstadium.php" target="_self" style="font-size: 10px;" title="Sede">- Estádio </a></li><li><a href="http://trophymanager.com/klubhus.php" target="_self" style="font-size: 10px;" title="Sede">- Sede </a></li><li><a href="http://trophymanager.com/oecon.php" target="_self" style="font-size: 10px;" title="Economia">- Economia </a><li><a href="http://trophymanager.com/stadion1.php" target="_self" style="font-size: 10px;" title="Sede">- Instalações </a></li></li><li><a href="http://trophymanager.com/squad.php" target="_self" style="font-size: 10px;" title="Ir para Escalações">- Escalação</a></li><li><a href="http://trophymanager.com/tactics.php" target="_self" style="font-size: 10px;" title="Go to Tactics">- Taticas</a></li><li><a href="http://trophymanager.com/staff.php" target="_self" style="font-size: 10px;" title="Search for new staff members">- Comissão Técnica</a></li><li><a href="http://trophymanager.com/staff_reports.php" target="_self" style="font-size: 10px;" title="See what you´ve scouted">- Relatório dos Olheiros</a></li><li><a href="http://trophymanager.com/plystat.php" target="_self" style="font-size: 10px;" title="Estatisticas">- Estatisticas </a></li><li><a href="http://trophymanager.com/training.php" target="_self" style="font-size: 10px;" title="Check the training results">- Evolução </a><img src= "http://static.trophymanager.com/pics/pro_req_mini2.gif"></li><li><a href="http://trophymanager.com/trainers.php" target="_self" style="font-size: 10px;" title="Change your training teams">- Treino</a></li><p style="text-decoration: underline;">Forum</p><li><a href="http://trophymanager.com/forum.php" target="_self" style="font-size: 10px;" title="Browse Forum">- Forum</a> ( <a href="http://trophymanager.com/forum.php?cache=meh&show=115" title="Transfer-Forum">T</a> | <a href="http://trophymanager.com/forum.php?cache=meh&show=32" title="General Forum">G</a> | <a href="http://trophymanager.com/forum.php?cache=meh&show=federations" title="Federations (PRO only)">F</a> )</li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1386163" target="_self" style="font-size: 10px;" title="Guia">- Guia ELM </a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1668925" target="_self" style="font-size: 10px;" title="Guia">- Guia:Treinamento </a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1673851" target="_self" style="font-size: 10px;" title="Tópico">- Tópico de Bugs(Brasil) </a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1651963" target="_self" style="font-size: 10px;" title="Tópico">- Juniores Season21 </a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1676687" target="_self" style="font-size: 10px;" title="Tópico">- Tutorial Trexma</a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=1214828" target="_self" style="font-size: 10px;" title="Tópico">- Amistosos [ Oficial ] </a></li><li><a href="http://trophymanager.com/forum.php?topic=show&show=589079" target="_self" style="font-size: 10px;" title="Tópico">- Curiosidades do TM </a></li><li><a href="http://trophymanager.com/manual_show.php?page=help_index" target="_self" style="font-size: 10px;" title="User-Guide">- Manual TM</a></li><li><a href="http://trophymanager.com/klubhus.php" target="_self" style="font-size: 10px;" title="Sede">- Sede </a></li><li><a href="http://trophymanager.com/oecon.php" target="_self" style="font-size: 10px;" title="Economia">- Economia </a><li><a href="http://trophymanager.com/forum.php?topic=show&show=1513077" target="_self" style="font-size: 10px;" title="Forum">- Ferramentas Uteis </a></li><li><a href="http://trophymanager.com/forum.php?show=c1202" target="_self" style="font-size: 10px;" title="Forum">- TEC </a></li></div>';
}
//Transferseite
if (myurl.match(/transform.php?m*/))  { // hier wird geprueft, ob das die richtige Seite ist

skillsumspan_value = document.createElement("th");
skillsumspan_value.innerHTML="<th><strong></strong></th>";
skillsumspan2_value = document.createElement("th");
skillsumspan2_value.innerHTML="<th><strong>TrexTM</strong></th>";
document.getElementsByTagName("table")[0].getElementsByTagName('tr')[0].insertBefore(skillsumspan_value, document.getElementsByTagName("table")[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[16]);
document.getElementsByTagName("table")[0].getElementsByTagName('tr')[1].insertBefore(skillsumspan2_value, document.getElementsByTagName("table")[0].getElementsByTagName('tr')[1].getElementsByTagName('th')[16]);

aux = document.getElementsByTagName("table")[0].getElementsByTagName("tr"); // holt alle Tabellenzeilen
for (var n = 0; n < aux.length; n++) {
	
	zeile=aux[n];
	skillsumme="";
	skillsumme_str="";

	
//	Position auslesen
/*	pos_n = aux[n+2].getElementsByTagName("td")[1];
	if(pos_n.getElementsByTagName("span").length==1) {
		var pos_n = pos_n.getElementsByTagName("span")[0].innerHTML;
	}
	else {*/
	pos_n = aux[n+2].cells[1].innerHTML;
//	}
//	alert(pos_n)
})();