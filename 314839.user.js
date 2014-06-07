// ==UserScript==
// @name          GetTable
// @namespace     

// ==/UserScript==

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F"];
var positionFullNames = ["Defender Center", "Defender Left", "Defender Right", "Defensive Midfielder Center", "Defensive Midfielder Left", "Defensive Midfielder Right", "Midfielder Center", "Midfielder Left", "Midfielder Right", "Offensive Midfielder Center", "Offensive Midfielder Left", "Offensive Midfielder Right", "Forward",];
var weight1=[14.866375, 15.980742, 15.980742, 15.8932675, 15.5835325, 15.5835325, 17.6955092, 16.6189141, 16.6189141, 18.1255351, 15.6304867, 15.6304867, 13.2762119];
var weight2=[18.95664, 22.895539, 22.895539, 23.1801296, 23.2813871, 23.2813871, 26.8420884, 23.9940623, 23.9940623, 27.8974544, 24.54323, 24.54323, 19.5088591];

var positions = [[0.6539623034,0.330014238,0.5629945472,0.891800164,0.8710690959,0.4545146725,0.5556972785,0.4277759863,0.3382188218,0.134348456,0.7969167867,0.0488318709,0.1163634434,0.282347753
], // D C
		 [ 0.5656051202,0.430973382,0.9171254325,0.8157025283,0.9902232502,0.5479958766,0.5222032329,0.3099288988,0.8373653523,0.4838224723,0.6569014209,0.1375825883,0.1636581176,0.3039154474
], // D L
		 [ 0.5656051202,0.430973382,0.9171254325,0.8157025283,0.9902232502,0.5479958766,0.5222032329,0.3099288988,0.8373653523,0.4838224723,0.6569014209,0.1375825883,0.1636581176,0.3039154474
], // D R
		 [  0.5583882556,0.6036835024,0.5637923147,0.7704250886,0.6419658538,0.6754952357,0.6838634782,0.7573429152,0.4730707978,0.4941078236,0.3975471632,0.4296609165,0.5636417408,0.2247910934
], // DM C
		 [0.5820740381,0.4200322027,0.7887541875,0.7262213898,0.7229723298,0.7376172528,0.6223445845,0.4669469097,0.8143829156,0.5618778294,0.367446982,0.3606234083,0.3900577697,0.2495177373
], // DM L
		 [0.5820740381,0.4200322027,0.7887541875,0.7262213898,0.7229723298,0.7376172528,0.6223445845,0.4669469097,0.8143829156,0.5618778294,0.367446982,0.3606234083,0.3900577697,0.2495177373
], // DM R
		 [ 0.5784319394,0.778134685,0.5747263224,0.7140029208,0.635403391,0.8223082544,0.8778570406,0.8642656712,0.4334502196,0.6971642524,0.4125685168,0.5866275863,0.617905053,0.3084268148
], // M C 
		 [ 0.4974293764,0.5453473647,0.7882809171,0.5787245743,0.663235306,0.7725371432,0.6387061351,0.5384531085,0.8879353813,0.5725159704,0.2905495509,0.4761804999,0.5261494249,0.2870016453
], // M L
		 [0.4974293764,0.5453473647,0.7882809171,0.5787245743,0.663235306,0.7725371432,0.6387061351,0.5384531085,0.8879353813,0.5725159704,0.2905495509,0.4761804999,0.5261494249,0.2870016453
], // M R
		 [ 0.6564377689,0.6172607221,0.656569987,0.6374105452,0.5514845273,0.9223797899,0.7905535661,0.9996885573,0.4262035756,0.7787709123,0.6523740651,0.6622643935,0.7312010093,0.2745636181
], // OM C
		 [  0.4833419473,0.4947730526,0.7994348043,0.6287891942,0.6338479696,0.681354437,0.6712338699,0.5361214586,0.8493897455,0.6840677233,0.3897329734,0.4999726923,0.5772318184,0.2727733521
], // OM L
		 [0.4833419473,0.4947730526,0.7994348043,0.6287891942,0.6338479696,0.681354437,0.6712338699,0.5361214586,0.8493897455,0.6840677233,0.3897329734,0.4999726923,0.5772318184,0.2727733521
], // OM R
		 [ 0.4939170511,0.3704239048,0.53214893,0.0629206659,0.0904950078,0.4154947741,0.5410610755,0.4681811461,0.1581064841,0.4611257383,0.8339961227,0.9998283287,0.8271719776,0.2532258555
], ];// F
 
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
 

var hasPlayerStats = function() {
	var trophy_player_table = document.getElementsByClassName("skill_table zebra");
	if (trophy_player_table != null) {
		return true;
	}
	return false;
};




document.getSkills = function(table) {
	var skillArray = [];
	var tableData = table.getElementsByTagName("td");
	if (tableData.length > 1) {
		for (var i = 0; i < 2; i++) {
			for (var j = i; j < tableData.length; j += 2) {
				if(j>=14){
					break;
				}
				
				if (tableData[j].innerHTML.indexOf("star.png") > 0) {
					skillArray.push(20);
				} else if (tableData[j].innerHTML.indexOf("star_silver.png") > 0) {
					skillArray.push(19);
				} else if (tableData[j].textContent.length != 0) {
					skillArray.push(tableData[j].textContent);
				}
				
			}
		}
	}
	return skillArray;
};

document.getSI = function() {
	var skillIndex ;
	var inforTable=document.getElementsByClassName("float_left info_table zebra")[0];
    var tableTH = inforTable.getElementsByTagName("th");

	for (var i = 0, row; row = inforTable.rows[i]; i++) {
   		for (var j = 0, col; col = row.cells[j]; j++) {
   			if(col.textContent=="Skill Index"){
   				
   				return parseInt((row.cells[j+1].textContent).replace(",",""));
   			}    
   }  
}
};

document.createTR = function(table, SKarray) {
		var th = document.createElement("th");
		var tr=table.insertRow(0);
		th.innerHTML = "Rec1";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		td.innerHTML = SKarray[0];
		td.style.color="#ffbb00";
		tr.appendChild(td);
		var th = document.createElement("th");
		th.innerHTML = "Rec2";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		if (SKarray[1] == 0){
			td.innerHTML = "N/A";
		} else {
			td.innerHTML = SKarray[1];
		}
		td.style.color="#ffbb00";

		tr.appendChild(td);
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



document.calculateSkillWeight = function(positionWeightLevels, index) {
		var weight = 0;
		
		weight = positionWeightLevels[index];
		return weight;
	};
	
function calculateSkillsum (){
	var SI=document.getSI();
	return Math.pow(SI,(1/6.99194))/0.0233648;
	
}

document.calculateSkill = function(positionIndex, skills) {
		var skillSum=calculateSkillsum();
		var rec=0;
		var sumOfSkills = 0;
		var totSkill=0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				sumOfSkills+=parseInt(skills[i]);
			}
		}
		var remainder=skillSum-sumOfSkills;
		var totSkillweight=0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				var skillWeight=document.calculateSkillWeight(positions[positionIndex], i);
				totSkill += skills[i]*skillWeight;
				totSkillweight+=skillWeight;
			}
		}
		rec=(totSkill)+(remainder*totSkillweight/14);

		finalRec=(rec-weight1[positionIndex])/weight2[positionIndex];
		return  Math.round( finalRec * 100 ) / 100;
	};

(function() {
	if (hasPlayerStats()) {
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var infoTable = document.getElementById("hidden_skill_table");

		var skillArray = document.getSkills(playerTable);
		var SKs = computeSK(skillArray);
		document.createTR(infoTable, SKs);
	}
})();
