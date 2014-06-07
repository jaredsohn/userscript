// ==UserScript==
// @name			REREC+TrexmaTL
// @version			1.0
// @description		REREC playerprofile + trexma
// @include			http://trophymanager.com/players/*
// @exclude			http://trophymanager.com/players
// ==/UserScript==


// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:
//				   [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
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
				[80,18, 2],  // F
				[50,42, 8]]; // GK


// REC weights Str				   Sta				  Pac				 Mar				 Tac				 Wor				Pos				   Pas				  Cro				 Tec				Hea				   Fin				  Lon				 Set
var weightR = [[0.653962303361921,  0.330014238020285, 0.562994547223387, 0.891800163983125,  0.871069095865164,  0.454514672470839, 0.555697278549252, 0.42777598627972,  0.338218821750765, 0.134348455965202, 0.796916786677566, 0.048831870932616, 0.116363443378865, 0.282347752982916],	//DC
			   [0.565605120229193,  0.430973382039533, 0.917125432457378, 0.815702528287723,  0.99022325015212,   0.547995876625372, 0.522203232914265, 0.309928898819518, 0.837365352274204, 0.483822472259513, 0.656901420858592, 0.137582588344562, 0.163658117596413, 0.303915447383549],	//DL/R
			   [0.55838825558912,   0.603683502357502, 0.563792314670998, 0.770425088563048,  0.641965853834719,  0.675495235675077, 0.683863478201805, 0.757342915150728, 0.473070797767482, 0.494107823556837, 0.397547163237438, 0.429660916538242, 0.56364174077388,  0.224791093448809],	//DMC
			   [0.582074038075056,  0.420032202680124, 0.7887541874616,   0.726221389774063,  0.722972329840151,  0.737617252827595, 0.62234458453736,  0.466946909655194, 0.814382915598981, 0.561877829393632, 0.367446981999576, 0.360623408340649, 0.390057769678583, 0.249517737311268],	//DML/R
			   [0.578431939417021,  0.778134685048085, 0.574726322388294, 0.71400292078636,   0.635403391007978,  0.822308254446722, 0.877857040588335, 0.864265671245476, 0.433450219618618, 0.697164252367046, 0.412568516841575, 0.586627586272733, 0.617905053049757, 0.308426814834866],	//MC
			   [0.497429376361348,  0.545347364699553, 0.788280917110089, 0.578724574327427,  0.663235306043286,  0.772537143243647, 0.638706135095199, 0.538453108494387, 0.887935381275257, 0.572515970409641, 0.290549550901104, 0.476180499897665, 0.526149424898544, 0.287001645266184],	//ML/R
			   [0.656437768926678,  0.617260722143117, 0.656569986958435, 0.63741054520629,   0.55148452726771,   0.922379789905246, 0.790553566121791, 0.999688557334153, 0.426203575603164, 0.778770912265944, 0.652374065121788, 0.662264393455567, 0.73120100926333,  0.274563618133769],	//OMC
			   [0.483341947292063,  0.494773052635464, 0.799434804259974, 0.628789194186491,  0.633847969631333,  0.681354437033551, 0.671233869875345, 0.536121458625519, 0.849389745477645, 0.684067723274814, 0.389732973354501, 0.499972692291964, 0.577231818355874, 0.272773352088982],	//OML/R
			   [0.493917051093473,  0.370423904816088, 0.532148929996192, 0.0629206658586336, 0.0904950078155216, 0.415494774080483, 0.54106107545574,  0.468181146095801, 0.158106484131194, 0.461125738338018, 0.83399612271067,  0.999828328674183, 0.827171977606305, 0.253225855459207],	//F
//			   For  Rez    Vit  Ind  One  Ref Aer  Sar  Com    Deg    Aru
			   [0.5, 0.333, 0.5, 1,   0.5, 1,  0.5, 0.5, 0.333, 0.333, 0.333]]; //GK

//				DC		   DL/R		  DMC		  DML/R		  MC		  ML/R		  OMC		  OML/R		  F			  GK
var recLast = [[14.866375, 15.980742, 15.8932675, 15.5835325, 17.6955092, 16.6189141, 18.1255351, 15.6304867, 13.2762119, 15],
			   [18.95664,  22.895539, 23.1801296, 23.2813871, 26.8420884, 23.9940623, 27.8974544, 24.54323,   19.5088591, 22.3]];


var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];
//var positionFullNames = ["ãƒ‡ã‚£ãƒ•ã‚§ãƒ³ãƒ€ãƒ¼ ä¸­å¤®", "ãƒ‡ã‚£ãƒ•ã‚§ãƒ³ãƒ€ãƒ¼ å·¦", "ãƒ‡ã‚£ãƒ•ã‚§ãƒ³ãƒ€ãƒ¼ å³", "å®ˆå‚™çš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ ä¸­å¤®", "å®ˆå‚™çš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å·¦", "å®ˆå‚™çš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å³", "ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ ä¸­å¤®", "ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å·¦", "ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å³", "æ”»æ’ƒçš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ ä¸­å¤®", "æ”»æ’ƒçš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å·¦", "æ”»æ’ƒçš„ãƒŸãƒƒãƒ‰ãƒ•ã‚£ãƒ«ãƒ€ãƒ¼ å³", "ãƒ•ã‚©ãƒ¯ãƒ¼ãƒ‰", "ã‚´ãƒ¼ãƒ«ã‚­ãƒ¼ãƒ‘ãƒ¼"];
var positionFullNames = ["Defender Center", "Defender Left", "Defender Right", "Defensive Midfielder Center", "Defensive Midfielder Left", "Defensive Midfielder Right", "Midfielder Center", "Midfielder Left", "Midfielder Right", "Offensive Midfielder Center", "Offensive Midfielder Left", "Offensive Midfielder Right", "Forward", "Goalkeeper"];

if (location.href.indexOf("/players/") != -1){

	// positionIndex is the array of skill priority for this player.
	// skills is an array of skills for each user
	
    // for TrexMa
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
	
    
    // for TrexMa
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
	var REREC = [0, 0];
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
	var gettr = document.getElementsByTagName("tr");
	var trnum;
        
	for (var i = 0; i < gettr.length; i++){
		if (gettr[i].innerHTML.indexOf("Skill Index") > 0){
			trnum = i;
			i = gettr.length; // ãƒ«ãƒ¼ãƒ—çµ‚äº†
		}
	}
        
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
        
			if (positionIndex > -1) {
				SKs[i] = document.calculateSkill(positionIndex, skills);
				REREC[i] = document.createREREC(positionIndex, skills, gettr, trnum);
			}
	}
        
	var recth = document.createElement("div");
	var rectd = document.createElement("div");
	rectd.setAttribute("style", "color: gold;");  
	if (REREC[1] != 0 && REREC[0] != REREC[1]) {
		REREC[0] = REREC[0].toFixed(2);
		REREC[1] = REREC[1].toFixed(2);
		rectd.innerHTML = REREC[0] + "/" +REREC[1];
	}
	else {
		REREC[0] = REREC[0].toFixed(2);
		rectd.innerHTML = REREC[0];
	}
	recth.innerHTML = "<b style=\"color: gold;\">REREC</b>";
	document.getElementsByTagName("tr")[trnum-1].getElementsByTagName("th")[0].appendChild(recth);
	document.getElementsByTagName("tr")[trnum-1].getElementsByTagName("td")[0].appendChild(rectd);
	
	return SKs;
	}
	
	document.createTR = function(table, SKarray) {
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
	};
	
	document.createREREC = function (positionIndex, skills, gettr, num){
        // rec = SI
        
		var rec = gettr[num].getElementsByTagName("td")[0].innerHTML;	// SIå–å¾—
		rec = new String(rec).replace(/,/g, "");						// ã‚«ãƒ³ãƒžé™¤åŽ»
		if (positionIndex ==13) rec = Math.pow(rec, 0.143) / 0.02979;	// GKã®Skillsum
		else rec = Math.pow(rec, 1/6.99194)/0.02336483;					// ãã®ä»–ã®Skillsum
		
        // rec = skill sum from SI
		
        var skillSum = 0;
		for (var j = 0; j < skills.length; j++) {
			skillSum += parseInt(skills[j]);
		}
		rec -= skillSum;		// Remainder
        
        // rec = skill sum from SI - actual skill sum
        
		var skillWeightSum = 0;
		for (i = 0; 2+i <= positionIndex; i += 2) {		// TrExMaã¨RECã®weightè¡¨ã®ãšã‚Œä¿®æ­£
			positionIndex--;
		}
		for (var i = 0; i < weightR[positionIndex].length; i++) {					// Score ã“ã“ã‹ã‚‰
			skillWeightSum += skills[i] * weightR[positionIndex][i];
		}
		var weightSum = 0;
		for (var j = 0; j < weightR[positionIndex].length; j++) {
			weightSum += weightR[positionIndex][j];
		}
        
		rec = skillWeightSum + rec * weightSum / weightR[positionIndex].length;		// Score ã“ã“ã¾ã§
        
		if (positionIndex == 9) rec = (rec * 1.27 - recLast[0][positionIndex]) / recLast[1][positionIndex];	// GK
		else rec = (rec - recLast[0][positionIndex]) / recLast[1][positionIndex];	//ãã®ä»–
		return rec;
	};
	
	(function() {
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var skillArray = document.getSkills(playerTable);
		var SKs = computeSK(skillArray);
		document.createTR(playerTable, SKs);
	})();
}

// ==UserScript==
// @name           TrophyBuddy TrExMa REREC JP
// @version        1.5
// @description    NEW TrophyBuddy TrExMaã«RERECè¡¨ç¤ºæ©Ÿèƒ½ã‚’è¿½åŠ 
// @include        http://trophymanager.com/*
// @include        http://test.trophymanager.com/*
// @exclude        http://trophymanager.com/banners*
// @exclude        http://trophymanager.com/showprofile.php*

// @exclude        http://trophymanager.com/userguide.php*
// @exclude        http://trophymanager.com/livematch.php*manual_show.php
// @exclude        http://trophymanager.com/manual_show.php*
// @exclude        http://trophymanager.com/live*
// @exclude        http://trophymanager.com/transform.php
// @exclude        http://trophymanager.com/translate
// @exclude        http://trophymanager.com/translate?*
// ==/UserScript==



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Customize Section: Customize TrophyBuddy to suit your personal preferences																		///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																														///
// åˆæœŸè¨­å®šï¼ˆè‡ªåˆ†ç”¨ã«æ›¸ãæ›ãˆã¦ä¸‹ã•ã„ï¼‰
var myclubid = "1452677";				// ã‚ãªãŸã®ã‚¯ãƒ©ãƒ–IDã‚’""å†…ã«è¨˜å…¥ã—ã¦ä¸‹ã•ã„
var secondaryteamid = "";	// ã‚ãªãŸã®ã‚»ã‚«ãƒ³ãƒ€ãƒªãƒ¼ãƒãƒ¼ãƒ IDã‚’""å†…ã«è¨˜å…¥ã—ã¦ä¸‹ã•ã„
var menubar = "no";				// ç”»é¢å³ä¸‹ã«ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã‚’è¡¨ç¤ºã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
var sidebar = "no";				// ã‚µã‚¤ãƒ‰ãƒãƒ¼ã‚’è¡¨ç¤ºã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
var PlayerDataPlus = "no";			// ãƒ—ãƒ¬ã‚¤ãƒ¤ãƒ¼ãƒ‡ãƒ¼ã‚¿ã‚’è¿½åŠ ã—ã¦è¡¨ç¤ºã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
var PlayerDataPlusPosition = "inside"; // è¿½åŠ ãƒ‡ãƒ¼ã‚¿ã®è¡¨ç¤ºå ´æ‰€ã‚’"topleft"ã¾ãŸã¯"bottomleft"ã¾ãŸã¯"inside"ã‹ã‚‰é¸æŠžã—ã¦ãã ã•ã„
var hovermenu = "no";	// ãƒ¡ãƒ‹ãƒ¥ãƒ¼è¡¨ç¤ºã®ãƒ›ãƒãƒ¼ã‚¹ã‚¿ã‚¤ãƒ«ã®é©ç”¨ã‚’ã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
var alt_training = "no";	// ãƒˆãƒ¬ãƒ¼ãƒ‹ãƒ³ã‚°æ¦‚è¦ã‚’æ—§ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§è¡¨ç¤ºã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
var old_skills = "no";		// é¸æ‰‹ãƒšãƒ¼ã‚¸ã‚’æ—§ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§è¡¨ç¤ºã™ã‚‹å ´åˆã¯"yes"ã€‚ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
// æ—§ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§ã¯èƒ½åŠ›å€¤18ã‚’ãƒ–ãƒ­ãƒ³ã‚ºã‚¹ã‚¿ãƒ¼ï¼ˆéŠ…è‰²ã®â˜†ï¼‰ã§è¡¨ç¾ã—ã¦ã„ãŸã‚ˆã†ã§ã™ã€‚
var bronze_stars = "no";	// ãƒ–ãƒ­ãƒ³ã‚ºã‚¹ã‚¿ãƒ¼ã‚’è¿½åŠ ã™ã‚‹å ´åˆã¯"yes"ã€ã—ãªã„å ´åˆã¯"no"ã‚’é¸æŠžã—ã¦ä¸‹ã•ã„
//																														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var language = "po";     // choose your language, check supported languages below:

var rou_factor = 0.00405;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//												SUPPORTED LANGUAGES														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																														///
//The following languages are supported right now: 																						///
//																														///
//	ar = Arabic																												///
//	da = Danish																												///																																					///
//	de = German																											///
//	en = English																												///
//	fr = French																												///
//	he = Hebrew																											///
//	hu = Hungarian																											///
//	pl = Polish																												///
//	po = Portuguese																												///
//	ro = Romanian																											///
//	sl = Slovakian																											///
//																														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Squad2 = "(2ndãƒãƒ¼ãƒ )";
var YourRecentPosts = "ã‚ãªãŸã®æœ€è¿‘ã®æŠ•ç¨¿";
var GoYourRecentPosts = "ã‚ãªãŸã®æœ€è¿‘ã®æŠ•ç¨¿";

switch (language) {

// ENGLISH
case "en":
		var Home = "Home";
		var CheckYourMails = "Check your mails";
		var League = "League";
		var Cup = "Cup";
		var Exit = "Exit TrophyManager";
			
		var GoCurrentBids = "See Current Bids";
		var GoTactics = "Go to Tactics";
 		var GoYouthAcademy = "Go to Youth Academy";		
		var GoHireCoaches = "Hire new coaches";
		var GoHireScouts = "Hire new scouts";
		var GoMyCoaches = "Take a look at your coaches";
		var GoMyScouts = "Take a look at your scouts";
		var	GoScoutReports = "Check what you have scouted";
		var GoPlayerNotes = "See your player notes";		
		var GoTrainingOverview = "Check the training results";
		var GoTrainingTeams = "Change your training teams";
		var GoForum = "Browse forums";
		var GoTMUserGuide = "Read the User-Guide";
		var GoTBConference = "Enter the TrophyBuddy-Conference";
		
		var GoTransferForum = "Go to Transfer forum";
		var GoGeneralForum = "Go to General forum";
		var GoAnnouncementForum = "Go to Announcement forum";
		//var GoFederations = "Go to Federations";
		
	var Team = "Team";	
		var CurrentBids = "Current Bids";
		var Squad = "Squad";
		var Tactics = "Tactics";
		var YouthAcademy = "Youth Academy";
	var Staff = "Staff";
		var HireCoaches = "Hire Coaches";
		var HireScouts = "Scouts";
		var ScoutReports = "Scout Reports";
		var MyCoaches = "MyCoaches";				
		var MyScouts = "MyScouts";
	var Training = "Training";	
		var PlayerNotes = "Player Notes";
		var TrainingOverview = "Training Overview"; 
		var TrainingTeams = "Training Teams";
	var Community = "Community-Links";	
		var Forum = "Forum";
		var TMUserGuide = "TM-UserGuide";
		var TBConference = "TrophyBuddy-Conference";
	break;
}
// ==/UserScript==

var myurl=document.URL;

if (myurl.match(/scouts/)) {

	if (document.URL == "http://trophymanager.com/scouts/hire/") {

		if (bronze_stars == "yes") {
	
			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td.align_center:contains("18")').html('<img src="http://www.patrick-meurer.de/tm/bronze_star.png">');
				$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
				$('td.align_center').css('font-weight', 'bold');
			});
		}
		else {

			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
				$('td.align_center').css('font-weight', 'bold');
			});		
		
		}

	}
	else {

	}
}

if (myurl.match(/coaches/)) {

	if (document.URL == "http://trophymanager.com/coaches/hire/") {
	
		if (bronze_stars == "yes") {
	
			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td.align_center:contains("18")').html('<img src="http://www.patrick-meurer.de/tm/bronze_star.png">');
				$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
				$('td.align_center').css('font-weight', 'bold');
			});
		}
		else {

			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
				$('td.align_center').css('font-weight', 'bold');
			});		
		
		}
	}
	else {
		
		if (bronze_stars == "yes") {	
			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td:contains("18")').html('<img src="http://www.patrick-meurer.de/tm/bronze_star.png">');
				$('td:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td:contains("20")').html('<img src="/pics/star.png">');
				$('td').css('font-weight', 'bold');	
			});	
		}
		else {
			var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
			loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

				// Show the stars!
				$('td:contains("19")').html('<img src="/pics/star_silver.png">');
				$('td:contains("20")').html('<img src="/pics/star.png">');
				$('td').css('font-weight', 'bold');	
			});	
		
		}
	}
}

	
//Jugendspieler: Position auslesen
/*	pos_y = aux[n].cells[4].innerHTML;
	}

	var skillsumspan_HL = document.createElement("span");
	skillsumspan_HL.innerHTML="<div style=\"color: gold;\"><b>TB-Rating</b></div>";
	document.getElementsByTagName("table")[0].getElementsByTagName('tr')[7].getElementsByTagName('th')[0].appendChild(skillsumspan_HL);

}
}
*/

if (myurl.match(/training-overview/)) {
	
	if (document.URL == "http://trophymanager.com/training-overview/advanced/") {
	if (alt_training = "yes") {
		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {
		    	
			// Black/gray alternating table background
			$('table.zebra tr').css('background-color', '#222222');
			$('table.zebra tr.odd').css('background-color', 'rgb(48, 48, 48)');

			// Small training increases
			$('span.training_small').css('border', '1px rgb(141, 182, 82) solid');
			$('span.training_small').css('background-color', '#45521E');

			// Small training decreases
			$('span.training_part_down').css('border', '1px #D7220E solid');
			$('span.training_part_down').css('background-color', '#502927');

			// Big training increases
			$('span.training_big').css('font-size', '15px');
			$('span.training_big').css('font-weight', 'normal');
			//$('span.training_big').css('text-decoration', 'blink');
			$('span.training_big').css('background-color', '#93B751');
			$('span.training_big').css('color', '#000000');

			// Big training decreases
			$('span.training_down').css('font-size', '13px');
			$('span.training_down').css('font-weight', 'normal');
			$('span.training_down').css('background-color', '#D7220E');
			$('span.training_down').css('color', '#000000');

			// Increase all skill space sizes
			$('span.training_big, span.training_small, span.training_part_down, span.training_down, span.subtle').css('width', '15px');

			// No changes
			$('span.subtle').css('color', '#FFFFFF');

			// Remove position background
			$('table.zebra tr .favposition').css('background-color', '#222222');
			$('table.zebra tr.odd .favposition').css('background-color', 'rgb(48, 48, 48)');

			// Add borders to sides of tables
			$('table.zebra').css('border-left', '3px #222222 solid');
			$('table.zebra').css('border-right', '3px #222222 solid');

			// Intensity & +/- alignment
			$('table.zebra tr td:nth-child(18)').css('padding-right', '12px');
			$('table.zebra tr th:nth-child(19)').css('width', '34px');
			$('table.zebra tr td:nth-child(19) span').css('width', '32px');

			// Intensity & +/- alignment for goalie coach
			$('table.zebra:eq(5) tr td:nth-child(15)').css('padding-right', '12px');
			$('table.zebra:eq(5) tr th:nth-child(15)').css('width', '34px');
			$('table.zebra:eq(5) tr td:nth-child(16) span').css('width', '32px');

			// Coach headers
			$('h3').css('background-color', '#222222');

			// Show the stars!
			//$('span:contains("19")').html('<img src="/pics/star_silver.png">');
			//$('span:contains("20")').html('<img src="/pics/star.png">');
			
			//19 to SilverStar
			$('span.training_part_down:contains("19")').html('<img src="/pics/star_silver.png">');
			$('span.training_down:contains("19")').html('<img src="/pics/star_silver.png">');
			$('span.subtle:contains("19")').html('<img src="/pics/star_silver.png">');
			$('span.training_big:contains("19")').html('<img src="/pics/star_silver.png">');
			$('span.training_big:contains("19")').html('<img src="/pics/star_silver.png">');
			
			//20 to GoldStar
			$('span.training_part_down:contains("20")').html('<img src="/pics/star.png">');
			$('span.training_down:contains("20")').html('<img src="/pics/star.png">');
			$('span.subtle:contains("20")').html('<img src="/pics/star.png">');
			$('span.training_small:contains("20")').html('<img src="/pics/star.png">');
			$('span.training_big:contains("20")').html('<img src="/pics/star.png">');
			
		});
	}
	else {
	
	}
	}
	else {

	}

}


	
if (myurl.match(/club/)) {
	//alert(document.URL)
	var clubstaturl = 'http://trophymanager.com/statistics/club/' + myclubid + '/';
/*
	alert(clubstaturl)
	if (document.URL == clubstaturl) {
	
	}
*/	
	var counttablesfixtures = document.getElementsByTagName("table").length;
	//alert(counttablesfixtures)
	if (counttablesfixtures == 0) {
	
	}
	else {
	
	var checktable = document.getElementsByTagName("table")[0];
	checktable = checktable.getAttribute("class");
	
	if (checktable == "zebra padding") {
	
	var checksquad = document.getElementsByTagName("a")[8];
	checksquad = checksquad.getAttribute("href");
	checksquad = checksquad.replace(/[^a-zA-Z 0-9]+/g,'');
	checksquad = checksquad.replace("club", "");
	/*
		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

			//$('div.std p').css('font-weight', 'bold');
			//$('div.std').css('background-color', '#502927'); // Change Background Color
			//$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
			//$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
			//$('td.align_center').css('font-weight', 'bold');
		});
	*/
	
	
	}
	else {
	
		if (document.URL == "http://trophymanager.com/account/club-info/"){
		
		}
		else {
		
			pro_check = document.getElementsByTagName("a")[17].getAttribute("href");
			pro_check = pro_check.search("pro");
			if (pro_check != -1) {
	
			//league_try = document.getElementsByTagName("a")[19].getAttribute("href");
			//league_try = league_try.search("league");
			//if (league_try != -1) {
				n=0
							}
			else {
				n=-1;
				
			}
			var leaguecheck = document.getElementsByTagName("a")[n+19];
			leaguecheck = leaguecheck.getAttribute("href");
			leaguecheck = leaguecheck.replace("/league/", "");
			//leaguecheck = leaguecheck.replace("/league/", "");
			leaguecheck = leaguecheck.substr(3,leaguecheck.length);
			leaguecheck = leaguecheck.replace(/[^a-zA-Z 0-9]+/g,'');
			leaguecheck = leaguecheck.substr(0,1) + '.' + leaguecheck.substr(1,leaguecheck.length);
			//alert(leaguecheck)
			
			if ((myurl.match(myclubid)) || (myurl.match("clubs"))) {
			
			}
			else {
				var oldleague = document.createElement("span");
				oldleague.innerHTML="<span style=\"color: gold;\"><b> (" + leaguecheck + ")</b></span>";
				document.getElementsByTagName("a")[n+19].appendChild(oldleague);
			}

		}
	}
}}


if (myurl.match(/league/)) {

	var check_statpage = document.URL;
	check_statpage = check_statpage.search("statistics");
	
	if (check_statpage != -1) {
	
		
	}
	else {
/*	//alert(check_statpage)
	var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

			$('div.add_comment a').css('font-weight', 'bold');
			$('div.add_comment a').css('font-size', '1.5em');
			//$('div.std').css('background-color', '#502927'); // Change Background Color
			//$('td.align_center:contains("19")').html('<img src="/pics/star_silver.png">');
			//$('td.align_center:contains("20")').html('<img src="/pics/star.png">');
			//$('td.align_center').css('font-weight', 'bold');
		});
*/	
	}
}

if (myurl.match(/youth-development/)) {

	var div_recvspot = document.createElement('div');
	div_recvspot.innerHTML="<div id=\"recvspot\" style=\"position: fixed; z-index: 1000; width: 175px; margin-top: 25px; color: #ff9900; -moz-opacity: .8; text-align: middle; color: gold; display:inline;\"><table style=\"margin-bottom: -1em; background: #5F8D2D; border: 2px #333333 outset;\"><tr><th style=\"padding-left: 5px;\">Youth-Stars</th><th title=\"The potential values from old TM\">~Old Potential</th></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"></td><td title=\"+ Best 19*\">20</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/half_star.png\"></td><td title=\"+ Worst 20*\">17-18-19</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"></td><td>15-16</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/half_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"></td><td>13-14</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"></td><td>11-12</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/half_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"></td><td>9-10</td></tr><tr><td><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"><img src=\"http://trophymanager.com/pics/dark_star.png\"></td><td>7-8</td></tr></table></div>";
	document.getElementsByTagName("div")[18].appendChild(div_recvspot);
	

}


//alert ("Skript ist aktiv")

if (myurl.match(/players/))  { // hier wird geprueft, ob das die richtige Seite ist

	var check_statpage = document.URL;
	check_statpage = check_statpage.search("statistics");


		if (document.URL == "http://trophymanager.com/players/"){
		
		function embed() {
		var oldFunc = makeTable;

		makeTable = function() {

        ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","asi","rec","bteam"];
        gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"asi","rec","bteam"];
        
		myTable = document.createElement('table');
		myTable.className = "hover zebra";

		construct_th();
		var z=0;
		for (i=0; i<players_ar.length; i++) {
			if (players_ar[i]["fp"] != "GK" && add_me(players_ar[i]) && filter_squads()) {
				construct_tr(players_ar[i], z);
				z++;
			}
		}
		if (z == 0) {
			var myRow = myTable.insertRow(-1);
			var myCell = myRow.insertCell(-1);
			myCell.colSpan = 24;
			myCell.innerHTML = other_header;
		}
	    if (filters_ar[1] == 1) {
	        var myRow = myTable.insertRow(-1);
	        var myCell = myRow.insertCell(-1);
	        myCell.className = "splitter";
	        myCell.colSpan = "50";
	        myCell.innerHTML = gk_header;
	        construct_th(true);
	        z=0;
	        for (i=0; i<players_ar.length; i++) {
	            if (players_ar[i]["fp"] == "GK" && filter_squads()) {
	                if (!(players_ar[i]["age"] < age_min || players_ar[i]["age"] > age_max)) {
	                    construct_tr(players_ar[i], z, true);
	                    z++;
	                }
	            }
	        }
	    }
	    $e("sq").innerHTML = "";
	    $e("sq").appendChild(myTable);
	    activate_player_links($(myTable).find("[player_link]"));
	    init_tooltip_by_elems($(myTable).find("[tooltip]"))
	    zebra();

	    };
		}

		var inject = document.createElement("script");

		inject.setAttribute("type", "text/javascript");
		inject.appendChild(document.createTextNode("(" + embed + ")()"));

		document.body.appendChild(inject);


		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

		    $.noConflict();
		    jQuery(document).ready(function($) {
		       // $('table.zebra th:eq(0)').click();
		  });
		});
		
		}
		else if (check_statpage != -1) {
		}
		
		else {
		
		counttables = document.getElementsByTagName("table").length;
		//alert (counttables)
		var c = 0;
		
		if (counttables == 3) {
			aux = document.getElementsByTagName("table")[1]; // holt die gesamte Tabelle
		}
		else {
			aux = document.getElementsByTagName("table")[2]; // holt die gesamte Tabelle
		}
		auxx = document.getElementsByTagName("table")[0]; // holt die gesamte Tabelle		
		pos_td = document.getElementsByTagName("strong")[1]; // holt die gesamte Tabelle
		auxspan = document.getElementsByTagName("span")[28]; // holt die gesamte Tabelle
		aux2 = document.getElementsByTagName("p")[0]; // holt die gesamte Tabelle
		aux3 = document.getElementsByTagName("p")[1]; // holt die gesamte Tabelle
		aux4 = document.getElementsByTagName("p")[2]; // holt die gesamte Tabelle
		
		if (old_skills == "yes") {
		
		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function () {

		$.noConflict();
		jQuery(document).ready(function ($) {

    // Destination table
    var newskills =
      '<table id="new_skill_table">' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '</table>';

    // Hide current skills, insert new skills
    $('table.skill_table').toggle();
    $('table.skill_table').after(newskills);

    // Arrays for skill data
    var attributeNames = new Array();
    var attributeValues = new Array();

    // Load skill data
    $('table.skill_table tr th:nth-child(1)').each(function (index) {
      storeData($(this));
    });

    $('table.skill_table tr th:nth-child(3)').each(function (index) {
      storeData($(this));
    });

    // Inject first row of attributes
    $.each(attributeNames, function (index) {
      $('table#new_skill_table tr:eq(0) td:eq(' + index + ')').html(attributeNames[index].substr(0, 3));
      $('table#new_skill_table tr:eq(1) td:eq(' + index + ')').html(attributeValues[index]);
    });

    // Inject second row of attributes (14 attributes for non-goalies)
    if (attributeNames.length == 14) {
      $.each(attributeNames.slice(7), function (index) {
        $('table#new_skill_table tr:eq(2) td:eq(' + index + ')').html(attributeNames[index + 7].substr(0, 3));
        $('table#new_skill_table tr:eq(3) td:eq(' + index + ')').html(attributeValues[index + 7]);
      });
    }
    else {
      $.each(attributeNames.slice(7), function (index) {
        $('table#new_skill_table tr:eq(2) td:eq(' + (index + 3) + ')').html(attributeNames[index + 7].substr(0, 3));
        $('table#new_skill_table tr:eq(3) td:eq(' + (index + 3) + ')').html(attributeValues[index + 7]);
      });
    }

    // Format new skills
    $('table#new_skill_table tr td').css('text-align', 'center');
    $('table#new_skill_table tr td').css('width', '14.2%');
    $('table#new_skill_table tr:nth-child(even)').css('background-color', '#649024');
    $('table#new_skill_table tr td img').css('margin-bottom', '4px');
	$('table#new_skill_table tr:eq(0) td').css('font-weight', 'bold');
	$('table#new_skill_table tr:eq(2) td').css('font-weight', 'bold');
	$('table#new_skill_table tr td:contains("18")').html('<img src="http://www.patrick-meurer.de/tm/bronze_star.png">');
	
	$('span.gk:contains("Goalkeeper")').html('<span class="gk" style="font-size: 1em;">GK </span>');
	$('span.gk:contains("Torhuter")').html('<span class="gk" style="font-size: 1em;">GK </span>');
	$('span.d:contains("Defender")').html('<span class="def" style="font-size: 1em;">D </span>');
	$('span.dm:contains("Defensive Midfielder")').html('<span class="dmid" style="font-size: 1em;">DM </span>');
	$('span.m:contains("Midfielder")').html('<span class="mid" style="font-size: 1em;">M </span>');
	$('span.om:contains("Offensive Midfielder")').html('<span class="omid" style="font-size: 1em;">OM </span>');
	$('span.f:contains("Forward")').html('<span class="fc" style="font-size: 1em;">F </span>');
	$('span.side:contains("Left")').html('<span class="left" style="font-size: 1em;">L</span>');
	$('span.side:contains("Center")').html('<span class="center" style="font-size: 1em;">C</span>');
	$('span.side:contains("Right")').html('<span class="right" style="font-size: 1em;">R</span>');
	
	// Format recommendation stars
    $('table.info_table tr td img').css('margin-bottom', '3px');
    $('table.info_table tr td img.flag').css('margin-bottom', '1px');

    // Show player details by default
    if (!$("#player_info").is(":visible")) {
      $("#player_info_arrow").click();
    }
    setClubList();

    // Store attributes to arrays
    function storeData(attribute) {

      // Only store attributes with values
      if (attribute.html() != '') {
        attributeNames.push(attribute.html());
        attributeValues.push(attribute.next().html());
      }
    }

    function sleep(ms) {
      var dt = new Date();
      dt.setTime(dt.getTime() + ms);
      while (new Date().getTime() < dt.getTime());
    }

    function setClubList() {
      // Show clubs for every line of history
      var lastClub;
      $('table.history_table div.club_name').each(function (index) {
        var currentClub = $(this).html();

        // Replace club name on dash, store club name otherwise
        if (currentClub == '-') {
          $(this).html(lastClub);
        }
        else {
          lastClub = currentClub;
        }
      });
    }
  });
});
			
	}
	else {
	
	}

	asi_check = auxx.getElementsByTagName("tr")[6].getElementsByTagName("td")[0].innerHTML;
	//alert(asi_check.search("pics"))
	if (asi_check.search("pics") != -1) {
		var zeile = 0
		var skillindex_yes = 0
	}
	else {
	
	if ( !isNaN( parseFloat(asi_check) ) ) { // ist eine Zahl
	//asi_check = asi_check.search(",") 
	//if (asi_check != -1) {
		var zeile = 0
		var skillindex_yes = 1
	}
	else {
		var zeile = 0
		var skillindex_yes = 0
	}
	}
	//	var asi = asi_check.getElementsByTagName("span")[0].innerHTML;
		
		
// fuer jeden Skill muss so geprueft werden, ob ein img-Tag oder ein span-Tag innerhalb der tabellenzelle vorliegt
	
//Strength
stae_td = aux.getElementsByTagName("tr")[zeile].getElementsByTagName("td")[0];

if(stae_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var stae = stae_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + stae)
}
else if(stae_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var stae = stae_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + stae)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var stae = aux.rows[zeile].cells[1].innerHTML;
//alert ("normal " + stae)
}
//Stamina
kon_td = aux.getElementsByTagName("tr")[zeile+1].getElementsByTagName("td")[0];

if(kon_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kon = kon_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kon)
}
else if(kon_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kon = kon_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kon)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kon = aux.rows[zeile+1].cells[1].innerHTML;
//alert ("normal " + kon)
}

//Pace
ges_td = aux.getElementsByTagName("tr")[zeile+2].getElementsByTagName("td")[0];

if(ges_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ges = ges_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ges)
}
else if(ges_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ges = ges_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ges)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ges = aux.rows[zeile+2].cells[1].innerHTML;
//alert ("normal " + ges)
}

//Marking
man_td = aux.getElementsByTagName("tr")[zeile+3].getElementsByTagName("td")[0];

if(man_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var man = man_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + man)
}
else if(man_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var man = man_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + man)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var man = aux.rows[zeile+3].cells[1].innerHTML;
//alert ("normal " + man)
}

//Tackling
zwe_td = aux.getElementsByTagName("tr")[zeile+4].getElementsByTagName("td")[0];

if(zwe_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var zwe = zwe_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + zwe)
}
else if(zwe_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var zwe = zwe_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + zwe)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var zwe = aux.rows[zeile+4].cells[1].innerHTML;
//alert ("normal " + zwe)
}

//Workrate
lau_td = aux.getElementsByTagName("tr")[zeile+5].getElementsByTagName("td")[0];

if(lau_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var lau = lau_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + lau)
}
else if(lau_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var lau = lau_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + lau)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var lau = aux.rows[zeile+5].cells[1].innerHTML;
//alert ("normal " + lau)
}

//Positioning
ste_td = aux.getElementsByTagName("tr")[zeile+6].getElementsByTagName("td")[0];

if(ste_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ste = ste_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ste)
}
else if(ste_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ste = ste_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ste)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ste = aux.rows[zeile+6].cells[1].innerHTML;
//alert ("normal " + ste)
}

//Passing
pass_td = aux.getElementsByTagName("tr")[zeile].getElementsByTagName("td")[1];

if(pass_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var pass = pass_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + pass)
}
else if(pass_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var pass = pass_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + pass)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var pass = aux.rows[zeile].cells[3].innerHTML;
//alert ("normal " + pass)
}

//Crossing
fla_td = aux.getElementsByTagName("tr")[zeile+1].getElementsByTagName("td")[1];

if(fla_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var fla = fla_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + fla)
}
else if(fla_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var fla = fla_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + fla)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var fla = aux.rows[zeile+1].cells[3].innerHTML;
//alert ("normal " + fla)
}

//Technique
tec_td = aux.getElementsByTagName("tr")[zeile+2].getElementsByTagName("td")[1];

if(tec_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tec = tec_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tec)
}
else if(tec_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tec = tec_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tec)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tec = aux.rows[zeile+2].cells[3].innerHTML;
//alert ("normal " + tec)
}

//Heading
kop_td = aux.getElementsByTagName("tr")[zeile+3].getElementsByTagName("td")[1];

if(kop_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kop = kop_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kop)
}
else if(kop_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kop = kop_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kop)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kop = aux.rows[zeile+3].cells[3].innerHTML;
//alert ("normal " + kop)
}

//Shooting
tor_td = aux.getElementsByTagName("tr")[zeile+4].getElementsByTagName("td")[1];

if(tor_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tor = tor_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tor)
}
else if(tor_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tor = tor_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tor)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tor = aux.rows[zeile+4].cells[3].innerHTML;
//alert ("normal " + tor)
}

//Longshots
wei_td = aux.getElementsByTagName("tr")[zeile+5].getElementsByTagName("td")[1];

if(wei_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var wei = wei_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + wei)
}
else if(wei_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var wei = wei_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + wei)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var wei = aux.rows[zeile+5].cells[3].innerHTML;
//alert ("normal " + wei)
}

//Setpieces
sta_td = aux.getElementsByTagName("tr")[zeile+6].getElementsByTagName("td")[1];

if(sta_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var sta = sta_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + sta)
}
else if(sta_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var sta = sta_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + sta)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var sta = aux.rows[zeile+6].cells[3].innerHTML;
//alert ("normal " + sta)
}



//LP, XP, ASI und Gehalt auslesen
		
		//Playername
		var name = document.title; // holt den Titel-Tag
		name = name.substring(0,name.length-20);
		//alert(name)
		
		var name_url = name.replace(" ","-");
		//alert(name_url)
		
		//PlayerID
		var id = document.URL;
		//http://trophymanager.com/players/22479427
		//http://trophymanager.com/players/22479427/Apsel-%27Gold%27-Gronan/
		id = id.replace("http://trophymanager.com/players/","");
		//alert(id.length)
		
		if (id.length > 10) {
			id = id.substring(0,id.length-1);
			id = id.replace(name_url,"");
			id = id.replace("/","");
			//alert(id)
		}
		else {
			id = id.replace("/","");
			//alert(id)
		}
		
		
		//alert(id)
		
	//	id_td = auxspan.getAttribute("onclick");
	
/*
	var id_count = document.getElementsByTagName("span").length;
	alert(id_count)
	
	if (id_count == 20) {
		//var id = document.getElementsByTagName("span")[9].getAttribute("onclick");
		//id = id.substring(27,id.length-2);
	}
	else if (id_count == 21) {
		var id = document.getElementsByTagName("span")[10].getAttribute("onclick");
		id = id.substring(27,id.length-2);
	}
	else if (id_count == 22) {
		var id = document.getElementsByTagName("span")[11].getAttribute("onclick");
		id = id.substring(27,id.length-2);
	}
	else if (id_count == 24) {
		var id = document.getElementsByTagName("span")[13].getAttribute("onclick");
		id = id.substring(27,id.length-2);
	}
		else if (id_count == 25) {
		var id = document.getElementsByTagName("span")[13].getAttribute("onclick");
		id = id.substring(27,id.length-2);
	}
		else if (id_count == 29) {
		var id = document.getElementsByTagName("span")[17].getAttribute("onclick");
		id = id.substring(27,id.length-2);
	}
	else {
		var id = document.getElementsByTagName("span")[14].getAttribute("onclick");
		id = id.substring(27,id.length-2);	
	}
	alert(id)		
*/
		//Country
		var country = document.getElementsByTagName("img")[1].getAttribute("src");
		
		country = country.replace("/pics/flags/gradient/","");
		country = country.substring(0,2);
		//alert(country)
		
/*			switch (country) {
		
				case ("/pics/flags/gradient/de.png"):
					country = "Germany";
					alert(country)
				break;

				default:
					country = "Country not included yet";
					alert(country)
			}
*/		
		verein_td = auxx.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
		var verein = verein_td.getElementsByTagName("a")[0].innerHTML;
		
		var clubid = verein_td.getElementsByTagName("a")[0].getAttribute("href");
		clubid = clubid.substring(6,clubid.length-1);
		//alert(verein)
		//alert(clubid)

		//Routine
		var rou = auxx.rows[zeile+skillindex_yes+7].cells[1].innerHTML;
		//alert(rou)

		//Wage
		gehalt_td = auxx.getElementsByTagName("tr")[4].getElementsByTagName("td")[0];
		var gehalt = gehalt_td.getElementsByTagName("span")[0].innerHTML;
		gehalt = gehalt.replace(",", "");
		gehalt = gehalt.replace(",", "");
		//alert(gehalt)		
		
		asi = auxx.getElementsByTagName("tr")[6].getElementsByTagName("td")[0];
		var asi = asi.innerHTML;
		asi = asi.replace(",", ".");
		asi = asi.replace(".", "");
		//alert(asi)
		
		var status = auxx.rows[zeile+skillindex_yes+6].cells[1].innerHTML;
		//alert(status)
		if (status == '<img src="/pics/mini_green_check.png"> ') {
		status = "Gesund";
		//alert(status)
		}
		//Verletzungen
		else if(status == '1 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '2 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '3 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '4 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '5 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '6 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '7 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '8 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '9 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Verletzung: ' + status;
		}
		else if(status == '10 <img src="/pics/icons/injury.gif"> '){
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,2);
				status = 'Verletzung: ' + status;
		}
		//Sperren
		else if(status == '1 <img src="/pics/icons/red_card.gif"> ') {
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Sperre: ' + status;
		}
		else if(status == '2 <img src="/pics/icons/red_card.gif"> ') {
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Sperre: ' + status;
		}
		else if(status == '3 <img src="/pics/icons/red_card.gif"> ') {
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'Sperre: ' + status;
		}
		else if(status == ' <img src="/pics/icons/yellow_card.gif" tooltip="Gefahr einer Sperre"> ') {
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				status = status.substring(0,1);
				status = 'GelbeKarte';
				//alert(status)
		}
		else if(status == '<img src="/pics/mini_green_check.png"> <img src="/pics/icons/retire.gif">') {
				status = 'Gesund - Karriereende';
		}

/*		alter_td = auxx.getElementsByTagName("tr")[2].getElementsByTagName("td")[0];		
		var alter = auxx.rows[2].cells[1].innerHTML;
			alter = alter.substring(24,alter.length-70);
			alter_year = alter.substring(0,2);
			alter_month = alter.substring(3,alter.length);
			alter_month = alter_month.replace("Jahre","");
			alter_month = alter_month.replace("Monate","");
			alter_month = alter_month.replace(/ /i,"");
			alter = alter_year + "-" + alter_month;
*/			
		var alter = auxx.getElementsByTagName("tr")[2].getElementsByTagName("td")[0].innerHTML;
		alter = alter.substring(0,2);
		//alert(alter)
		
		//Position
		var pos_zweinull = document.getElementsByTagName("strong")[1].getElementsByTagName("span"); // holt alle Spanelemente
		var poslength = pos_zweinull.length;
		//alert (poslength)
		if (poslength == 2) {
			var pos = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			//alert(pos)
		}
		else if (poslength == 3) {
			var pos1 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			var pos2 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[2].innerHTML;
			pos = pos1 + pos2;
			//alert(pos)
		}
		else if (poslength == 5) {
			var pos1 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			var pos2 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[2].innerHTML;
			var pos3 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[3].innerHTML;
			var pos4 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[4].innerHTML;
			pos = pos1 + pos2 + pos3 + pos4;
			//alert(pos)
		}

		switch (pos) {
		
		//EN
		case "Goalkeeper":	pos = "GK"; break;
		
		case "Defender Left": pos = "D L"; break;
		case "Defender Center": pos = "D C"; break;
		case "Defender Right": pos = "D R"; break;
		case "Defender Center/Right": pos = "D CR"; break;
		case "Defender Right/Center": pos = "D RC"; break;
		case "Defender Left/Right": pos = "D LR"; break;
		case "Defender Right/Left": pos = "D RL"; break;
		case "Defender Left/Center": pos = "D LC"; break;
		case "Defender Center/Left": pos = "D CL"; break;
		
		case "Defender/Defensive Midfielder Left": pos = "D/DM L"; break;
		case "Defensive Midfielder/Defender Left": pos = "DM/D L"; break;
		case "Defender/Defensive Midfielder Right": pos = "D/DM R"; break;
		case "Defensive Midfielder/Defender Right": pos = "DM/D R"; break;
		case "Defender/Defensive Midfielder Center": pos = "D/DM C"; break;
		case "Defensive Midfielder/Defender Center": pos = "DM/D C"; break;
		
		case "Defender/Midfielder Left": pos = "D/M L"; break;
		case "Midfielder/Defender Left": pos = "M/D L"; break;
		case "Defender/Midfielder Right": pos = "D/M R"; break;
		case "Midfielder/Defender Right": pos = "M/D R"; break;
		case "Defender/Midfielder Center": pos = "D/M C"; break;
		case "Midfielder/Defender Center": pos = "M/D C"; break;
		
		case "Defensive Midfielder Left": pos = "DM L"; break;
		case "Defensive Midfielder Center": pos = "DM C"; break;
		case "Defensive Midfielder Right": pos = "DM R"; break;
		case "Defensive Midfielder Left/Center": pos = "DM LC"; break;
		case "Defensive Midfielder Center/Left": pos = "DM CL"; break;
		case "Defensive Midfielder Center/Right": pos = "DM CR"; break;
		case "Defensive Midfielder Right/Center": pos = "DM RC"; break;
		case "Defensive Midfielder Left/Right": pos = "DM LR"; break;
		case "Defensive Midfielder Right/Left": pos = "DM RL"; break;
		
		case "Defensive Midfielder/Midfielder Left": pos = "DM/M L"; break;
		case "Midfielder/Defensive Midfielder Left": pos = "M/DM L"; break;
		case "Defensive Midfielder/Midfielder Center": pos = "DM/M C"; break;
		case "Midfielder/Defensive Midfielder Center": pos = "M/DM C"; break;
		case "Defensive Midfielder/Midfielder Right": pos = "DM/M R"; break;
		case "Midfielder/Defensive Midfielder Right": pos = "M/DM R"; break;
		
		case "Defensive Midfielder Left/Forward": pos = "DM L, F "; break;
		case "Forward/Defensive Midfielder Left": pos = "F, DM L"; break;
		case "Defensive Midfielder Center/Forward": pos = "DM C, F"; break;
		case "Forward/Defensive Midfielder Center": pos = "F, DM C"; break;
		case "Defensive Midfielder Right/Forward": pos = "DM R, F "; break;
		case "Forward/Defensive Midfielder Right": pos = "F, DM R"; break;
		
		case "Midfielder Left": pos = "M L"; break;
		case "Midfielder Center": pos = "M C"; break;
		case "Midfielder Right": pos = "M R"; break;
		case "Midfielder Left/Center": pos = "M LC"; break;
		case "Midfielder Center/Left": pos = "M CL"; break;
		case "Midfielder Left/Right": pos = "M LR"; break;
		case "Midfielder Right/Left": pos = "M RL"; break;
		case "Midfielder Center/Right": pos = "M CR"; break;
		case "Midfielder Right/Center": pos = "M RC"; break;
		
		case "Midfielder/Offensive Midfielder Left": pos = "M/OM L"; break;
		case "Offensive Midfielder/Midfielder Left": pos = "OM/M L"; break;
		case "Midfielder/Offensive Midfielder Center": pos = "M/OM C"; break;
		case "Offensive Midfielder/Midfielder Center": pos = "OM/M C"; break;
		case "Midfielder/Offensive Midfielder Right": pos = "M/OM R"; break;
		case "Offensive Midfielder/Midfielder Right": pos = "OM/M R"; break;
		
		case "Midfielder Left/Forward": pos = "M L, F"; break;
		case "Forward/Midfielder Left": pos = "F, M L"; break;
		case "Midfielder Center/Forward": pos = "M C, F"; break;
		case "Forward/Midfielder Center": pos = "F, M C"; break;
		case "Midfielder Right/Forward": pos = "M R, F"; break;
		case "Forward/Midfielder Right": pos = "F, M R"; break;
		
		case "Offensive Midfielder Left": pos = "OM L"; break;
		case "Offensive Midfielder Center": pos = "OM C"; break;
		case "Offensive Midfielder Right": pos = "OM R"; break;
		case "Offensive Midfielder Left/Center": pos = "OM LC"; break;
		case "Offensive Midfielder Center/Left": pos = "OM CL"; break;
		case "Offensive Midfielder Center/Right": pos = "OM CR"; break;
		case "Offensive Midfielder Right/Center": pos = "OM RC"; break;
		case "Offensive Midfielder Left/Right": pos = "OM LR"; break
		case "Offensive Midfielder Right/Left": pos = "OM RL"; break
		
                case "Offensive Midfielder/Defender Center": pos = "OM/D C"; break;
		case "Offensive Midfielder Left/Forward": pos = "OM L, F"; break;
		case "Forward/Offensive Midfielder Left": pos = "F, OM L"; break;
		case "Offensive Midfielder Center/Forward": pos = "OM C, F"; break;
		case "Forward/Offensive Midfielder Center": pos = "F, OM C"; break;
		case "Offensive Midfielder Right/Forward": pos = "OM R, F"; break;
		case "Forward/Offensive Midfielder Right": pos = "F, OM R"; break;
		
		case "Forward": pos = "F"; break;
		
		default: alert("æ—¥æœ¬èªžç‰ˆã®ä¸å‚™ã«ã¤ã„ã¦ã¯ã‚¯ãƒ©ãƒ–IDã€Œ2925434ã€ã«å•ã„åˆã‚ã›ã¦ä¸‹ã•ã„ã€‚æ±ºã—ã¦æœ¬å®¶é…å¸ƒå…ƒã«å•ã„åˆã‚ã›ãªã„ã‚ˆã†ã«ãŠé¡˜ã„ã—ã¾ã™ã€‚<br><br>This version is Japanese ver.<br>Please contact the team ID : 2925434")
		}

		//alert ("pos: " + pos)
		stae=parseInt(stae);
		kon=parseInt(kon);
		ges=parseInt(ges);
		man=parseInt(man);
		zwe=parseInt(zwe);
		lau=parseInt(lau);
		ste=parseInt(ste);
		pass=parseInt(pass);
		fla=parseInt(fla);
		tec=parseInt(tec);
		kop=parseInt(kop);
		tor=parseInt(tor);
		wei=parseInt(wei);
		sta=parseInt(sta);
		//abw=parseInt(abw);
		
		// Skillsummen berechnen je nachdem wie deinen Positionen heissen
				
	switch (pos) {

		case "GK":
//		alert ("case gk")

				//Abwurf
				abw_td = aux.getElementsByTagName("tr")[zeile+7].getElementsByTagName("td")[1];

				if(abw_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
				{
				var abw = abw_td.getElementsByTagName("span")[0].innerHTML;
				//alert ("span " + abw)
				}
				else if(abw_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
				var abw = abw_td.getElementsByTagName("img")[0].getAttribute("alt");
				//alert ("img " + abw)
				}
				else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
				var abw = aux.rows[zeile+7].cells[3].innerHTML;
				//alert ("normal " + abw)
				}
			abw=parseInt(abw);
			//GK-Skills
			//pass = Handling .:. tec = Reflexes .:. stae = Strength .:. kon = Stamina .:. ges = Pace .:. wei = Communication .:. sta = Kicking .:. abw = Throwing .:. tor = Jumping .:. kop = Arial .:. fla = One //
			//var skillsumme = (((10.83333*pass) + (9.999982*tec) + 5.833338*(stae+ges+tor+fla+kop))/10)*(1+rou_factor*rou);
			//var skillsumme = (((10.83333*pass) + (9.999982*tec) + 5.833338*(stae+ges+zwe+ste+kop)+0.00*(kon+tor+wei+sta))/10)*(1+rou_factor*rou);
			var skillsumme = ((7.46268654*(pass + tec) + 5.223881*(fla + kop + tor) + 3.73134327*(stae + kon + ges + wei) + 2.238806*(sta + abw))/10)*(1+rou_factor*rou);
		break;

		case "Defender ":
		case "D C": 
//		alert ("case dc")		
			var skillsumme = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
		break;

		case "D L":
//		alert ("case dl")
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
		break;

		case "D R":
//		alert ("case dr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
		break;

		case "D LR":
//		alert ("case dlr")
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
		break;
		
		case "D RL":
//		alert ("case dlr")
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
		break;

		case "D CR":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D RC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D LC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);			
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		
		
		case "D CL":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);			
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "D/DM C":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM/D C":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D/DM R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM/D R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D/DM L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM/D L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D/M C":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/D C":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D/M R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/D R":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D/M L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/D L":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D/OM C":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/D C":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D/OM R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/D R":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D/OM L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/D L":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D C, F":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, D C":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D R, F":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, D R":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D L, F":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, D L":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + ste) + 0.6601167*(kon + lau + pass + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 5.769231*ges + 5.769231*man + 6.41025639*zwe + 3.84615374*lau + 3.20512819*ste + 1.92307687*pass + 5.1282053*fla + 3.20512819*tec + 4.48717928*kop + 0.641025662*tor + 1.28205132*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM C":
//		alert ("case dmc")		
			var skillsumme = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
		break;

		case "DM L":
//		alert ("case dml")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
		break;

		case "DM R":
//		alert ("case dmr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
		break;

		case "DM LR":
//		alert ("case dmlr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
		break;
		
		case "DM RL":
//		alert ("case dmlr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
		break;

		case "DM CR":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM RC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM LC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM CL":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M C":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/DM C":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/DM R":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);			
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M/DM L":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM/OM C":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/DM C":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/OM R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/DM R":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/OM L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/DM L":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM C, F":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, DM C":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.88654542*stae + 4.12940073*kon + 3.42679548*ges + 4.31633234*man + 4.174524*zwe + 4.978852*lau + 4.488497*ste + 4.69665146*pass + 3.00994468*fla + 3.15018058*tec + 2.76461983*kop + 2.23897719*tor + 3.171397*wei + 1.94508481*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM R, F":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, DM R":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "DM L, F":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, DM L":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.1392417*stae + 3.07755566*kon + 5.25320959*ges + 4.238464*man + 4.91002226*zwe + 4.84742928*lau + 3.75742078*ste + 3.173591*pass + 5.093115*fla + 3.4703362*tec + 2.83058333*kop + 2.089457*tor + 2.735374*wei + 1.704412*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M C":
//		alert ("case mc")		
			var skillsumme = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
		break;

		case "M L":
//		alert ("case ml")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
		break;

		case "M R":
//		alert ("case mr")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
		break;

		case "M LR":
//		alert ("case mlr")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
		break;
		
		case "M RL":
//		alert ("case mlr")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
		break;
		
		case "M CR":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M RC":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M LC":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "M CL":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			

		case "M/OM C":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/M C":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M/OM R":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/M R":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M/OM L":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);			
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM/M L":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M C, F":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, M C":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.57142854*stae + 4.16666651*kon + 3.57142854*ges + 4.16666651*man + 3.57142854*zwe + 4.76190472*lau + 4.76190472*ste + 4.76190472*pass + 2.38095236*fla + 3.57142854*tec + 2.38095236*kop + 2.97619057*tor + 3.57142854*wei + 1.78571427*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M L, F":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, M L":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M R, F":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, M R":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.22580647*stae + 3.22580647*kon + 4.83871*ges + 3.76344085*man + 4.30107546*zwe + 4.83871*lau + 4.30107546*ste + 3.22580647*pass + 5.376344*fla + 3.76344085*tec + 1.61290324*kop + 2.688172*tor + 3.22580647*wei + 1.61290324*sta)/10)*(1+rou_factor*rou);	
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C":
//		alert ("case omc")
			var skillsumme = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
		break;

		case "OM L":
//		alert ("case oml")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
		break;

		case "OM R":
//		alert ("case omr")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
		break;

		case "OM LR":
//		alert ("case omlr")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
		break;
		
		case "OM RL":
//		alert ("case omlr")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
		break;

		case "OM CR":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM RC":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM LC":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);			
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "OM CL":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C, F":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		

		case "OM/D C":
			var skillsumme1 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((5.263158*stae + 2.631579*kon + 3.94736838*ges + 7.236842*man + 6.57894754*zwe + 3.28947377*lau + 3.94736838*ste + 3.28947377*pass + 2.631579*fla + 1.31578946*tec + 5.92105246*kop + 0.657894731*tor + 1.31578946*wei + 1.97368419*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, OM C":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((5.824724*(lau + kop + pass + tec + tor + wei) + 3.402209*(ste + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.036602*stae + 3.82313943*kon + 3.86811256*ges + 2.16804*man + 2.716975*zwe + 4.52750063*lau + 4.27351856*ste + 6.163243*pass + 1.71992743*fla + 4.530125*tec + 3.28732085*kop + 4.00246334*tor + 4.26543236*wei + 1.59337246*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM R, F":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, OM R":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM L, F":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);			
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "F, OM L":
			var skillsumme1 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme1 = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
			//var skillsumme2 = ((3.26353669*stae + 2.770136*kon + 4.873922*ges + 3.52015066*man + 3.48778987*zwe + 4.4060216*lau + 4.425333*ste + 3.69829655*pass + 5.533843*fla + 3.884195*tec + 1.62157047*kop + 3.26996684*tor + 3.769781*wei + 1.73895681*sta)/10)*(1+rou_factor*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "F":
		//alert ("case f")
			var skillsumme = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+rou_factor*rou);
			//var skillsumme = ((3.84615374*stae + 2.56410265*kon + 3.84615374*ges + 0.641025662*man + 0.641025662*zwe + 3.20512819*lau + 3.84615374*ste + 3.84615374*pass + 1.28205132*fla + 3.84615374*tec + 6.41025639*kop + 7.69230747*tor + 6.41025639*wei + 1.92307687*sta)/10)*(1+rou_factor*rou);
		break;


	default:
		var skillsumme = "Unknown Position";

}

		if(typeof skillsumme_str == 'undefined')
		{
			skillsumme=parseFloat(skillsumme.toFixed(2));
		}
		else{
			skillsumme=skillsumme_str;
		}
	
	//Einfuegen eines span-elements hinter FP
	var skillsumspan_HL = document.createElement("span");
	skillsumspan_HL.innerHTML="<div style=\"color: gold;\"><b>TB-Rating</b></div>";
	document.getElementsByTagName("table")[0].getElementsByTagName('tr')[zeile+skillindex_yes+7].getElementsByTagName('th')[0].appendChild(skillsumspan_HL);

	//Einfuegen eines span-elements hinter F
	var skillsumspan_value = document.createElement("span");
	skillsumspan_value.innerHTML="<div style=\"color: gold;\"><b>" + skillsumme + "</b></div>";
	document.getElementsByTagName("table")[0].getElementsByTagName('tr')[zeile+skillindex_yes+7].getElementsByTagName('td')[0].appendChild(skillsumspan_value); 

//	Bereich zum Kopieren der Skills

	var div2 = document.createElement('div');
	//div2.innerHTML="<div id=\"DB\" style=\"position: fixed; background-color: white; color: black; bottom: 2px; right: 5px; height: 35px; width: 350px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;\">" + name + "; (" + id + "); " + pos + "; " + stae + "; " + kon + "; " + ges + "; " + man + "; " + zwe + "; " + lau + "; " + ste + "; " + pass + "; " + fla + "; " + tec + "; " + kop + "; " + tor + "; " + wei + "; " + sta + "; " + skillsumme + "; " + rou + "; " + gehalt + "; " + asi + "</div>";
	document.body.appendChild(div2);

//	var area_phy = stae + kon + ges + kop;
//	var area_tac = man + zwe + lau + ste;
	if ((pos == "D LC") || (pos == "D CR") || (pos == "D CL") || (pos == "D RC") || (pos == "D/DM L") || (pos == "D/DM C") || (pos == "D/DM R") || (pos == "DM/D L") || (pos == "DM/D C") || (pos == "DM/D R") || (pos == "D/M L") || (pos == "D/M C") || (pos == "D/M R") || (pos == "M/D L") || (pos == "M/D C") || (pos == "M/D R") || (pos == "D/OM L") || (pos == "D/OM C") || (pos == "D/OM R") || (pos == "OM/D L") || (pos == "OM/D C") || (pos == "OM/D R") || (pos == "D L, F") || (pos == "D C, F") || (pos == "D R, F") || (pos == "DM LC") || (pos == "DM CR") || (pos == "DM CL") || (pos == "DM RC") || (pos == "DM/M L") || (pos == "DM/M C") || (pos == "DM/M R") || (pos == "M/DM L") || (pos == "M/DM C") || (pos == "M/DM R") || (pos == "DM/OM L") || (pos == "DM/OM C") || (pos == "DM/OM R") || (pos == "OM/DM L") || (pos == "OM/DM C") || (pos == "OM/DM R") || (pos == "DM L, F") || (pos == "DM C, F") || (pos == "DM R, F") || (pos == "M LC") || (pos == "M CR") || (pos == "M CL") || (pos == "M RC") || (pos == "M/OM L") || (pos == "M/OM C") || (pos == "M/OM R") || (pos == "OM/M L") || (pos == "OM/M C") || (pos == "OM/M R") || (pos == "M L, F") || (pos == "M C, F") || (pos == "M R, F") || (pos == "OM LC") || (pos == "OM CR") || (pos == "OM CL") || (pos == "OM RC") || (pos == "OM L, F") || (pos == "OM C, F") || (pos == "OM R, F"))  {
		var skillworou1 = (skillsumme1)/(1+rou_factor*rou);
		var skillworou2 = (skillsumme2)/(1+rou_factor*rou);
		skillworou1 = new String(skillworou1.toFixed(2));
		skillworou2 = new String(skillworou2.toFixed(2));
		var skillworou = skillworou1 + "/" + skillworou2;
		
		var effect_rou1 = skillsumme1-skillworou1;
		var effect_rou2 = skillsumme2-skillworou2;
		effect_rou1 = new String(effect_rou1.toFixed(2));
		effect_rou2 = new String(effect_rou2.toFixed(2));
		effect_rou = effect_rou1 + "/" + effect_rou2;		
	}
	else {
		var skillworou = (skillsumme)/(1+rou_factor*rou);
		skillworou=parseFloat(skillworou.toFixed(2));
		var effect_rou = skillsumme-skillworou;
		effect_rou=parseFloat(effect_rou.toFixed(2));
	}

	switch(pos) {
		case("GK"): 
		//var area_tec = "tba";
		//var area_tac = "tba";
		//var area_phy = "tba";
		var area_tec = tec + pass + sta + abw;
		var area_phy = stae + kon + ges + tor;
		var area_tac = fla + wei + kop;
		break;
		
		default:
		var area_phy = stae + kon + ges + kop;
		var area_tac = man + zwe + lau + ste;		
		var area_tec = pass + fla + tec + tor + wei + sta;
	}
	var skillsum = area_phy + area_tec + area_tac;

	//alert(asi)
	var calc_skillsum = (Math.pow(asi, 0.152207002)/0.0268);
	calc_skillsum=parseFloat(calc_skillsum.toFixed(2));
	
	if (PlayerDataPlus == "yes") {
	
		if (PlayerDataPlusPosition == "topleft")  {
	
			var div_area = document.createElement('div');
			div_area.innerHTML="<div id=\"area\" style=\"position: fixed; z-index: 1000; background: #5F8D2D; color: #ff9900; top: 10px; left: 25px; width: 250px; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #333333 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-left: 1em; margin-bottom: 1em;\"><tr><td>PhySum: " + area_phy + " </td><td>TB-Rating: " + skillsumme + " </td></tr><tr><td>TacSum: " + area_tac + " </td><td>RouEffect: " + effect_rou + " </td></tr><tr><td>TecSum: " + area_tec + " </td><td>TB-Pure: " + skillworou + "</td></tr><tr><td>AllSum: " + skillsum + "</td></tr></table></b></div>";
			document.body.appendChild(div_area);
			
		}
		else if (PlayerDataPlusPosition == "bottomleft")  {
		
			var div_area = document.createElement('div');
			div_area.innerHTML="<div id=\"area\" style=\"position: fixed; z-index: 1000; background: #000203; color: #ff9900; bottom: 1px; left: 1px; width: 212px; padding-left: 2px; -moz-opacity: .1; text-align: left; color: gold; border: 3px #b6225a outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-left: 0em; margin-bottom: 1em;\"><tr><td>PhySum: " + area_phy + " </td><td>TB-Rating: " + skillsumme + " </td></tr><tr><td>TacSum: " + area_tac + " </td><td>RouEffect: " + effect_rou + " </td></tr><tr><td>TecSum: " + area_tec + " </td><td>TB-Pure: " + skillworou + "</td></tr><tr><td>AllSum: " + skillsum + "</td></tr></table></b></div>";
			document.body.appendChild(div_area);
		}
		else {
		
			if (country == "de") {
			
				/****************************************************************************************/
				/* Inject form                                        */
				/****************************************************************************************/

				var TMDB = document.createElement("span"); // erzeugt ein html-span-tag
				
				var Tform="<form action='http://patrick-meurer.de/tmdb/trophydb.php' target='_new' accept-charset='UTF-8' method='post' style='display:inline;'>";	

				Tform=Tform+"<input name='id' type='hidden' value='"+id+"' />";
				Tform=Tform+"<input name='name' type='hidden' value='"+name+"' />";
				Tform=Tform+"<input name='alter' type='hidden' value='"+alter+"' />";
				Tform=Tform+"<input name='clubid' type='hidden' value='"+clubid+"' />";
				Tform=Tform+"<input name='country' type='hidden' value='"+country+"' />";
				Tform=Tform+"<input name='pos' type='hidden' value='"+pos+"' />";
				Tform=Tform+"<input name='skillsumme' type='hidden' value='"+skillsumme+"' />";
				Tform=Tform+"<input name='effect_rou' type='hidden' value='"+effect_rou+"' />";
				Tform=Tform+"<input name='skillworou' type='hidden' value='"+skillworou+"' />";
				Tform=Tform+"<input name='area_phy' type='hidden' value='"+area_phy+"' />";
				Tform=Tform+"<input name='area_tac' type='hidden' value='"+area_tac+"' />";
				Tform=Tform+"<input name='area_tec' type='hidden' value='"+area_tec+"' />";
				Tform=Tform+"<input name='skillsum' type='hidden' value='"+skillsum+"' />";
				Tform=Tform+"<input name='stae' type='hidden' value='"+stae+"' />";
				Tform=Tform+"<input name='kon' type='hidden' value='"+kon+"' />";
				Tform=Tform+"<input name='ges' type='hidden' value='"+ges+"' />";
				Tform=Tform+"<input name='man' type='hidden' value='"+man+"' />";
				Tform=Tform+"<input name='zwe' type='hidden' value='"+zwe+"' />";
				Tform=Tform+"<input name='lau' type='hidden' value='"+lau+"' />";
				Tform=Tform+"<input name='ste' type='hidden' value='"+ste+"' />";
				Tform=Tform+"<input name='pass' type='hidden' value='"+pass+"' />";
				Tform=Tform+"<input name='fla' type='hidden' value='"+fla+"' />";
				Tform=Tform+"<input name='tec' type='hidden' value='"+tec+"' />";
				Tform=Tform+"<input name='kop' type='hidden' value='"+kop+"' />";
				Tform=Tform+"<input name='tor' type='hidden' value='"+tor+"' />";
				Tform=Tform+"<input name='wei' type='hidden' value='"+wei+"' />";
				Tform=Tform+"<input name='sta' type='hidden' value='"+sta+"' />";
				Tform=Tform+"<input name='rou' type='hidden' value='"+rou+"' />";
				Tform=Tform+"<input name='gehalt' type='hidden' value='"+gehalt+"' />";
				Tform=Tform+"<input name='asi' type='hidden' value='"+asi+"' />";
				Tform=Tform+"<input name='status' type='hidden' value='"+status+"' />";
				Tform=Tform+"<input type='submit' name='button' value='Submit'></form><br />";
		
				var div_area = document.createElement('div');
				div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; width: 175px; margin-top: 25px; background: #5F8D2D; color: #ff9900; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #333333 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-bottom: 1em;\"><tr><td>PhySum: </td><td>" + area_phy + " </td></tr><tr><td>TacSum: </td><td>" + area_tac + " </td></tr><tr><td>TecSum: </td><td>" + area_tec + " </td></tr><tr><td>AllSum: </td><td>" + skillsum + "</td></tr><tr><td>&nbsp;</td></tr><tr><td>TB-Rating: </td><td>" + skillsumme + " </td></tr><tr><td>RouEffect: </td><td>" + effect_rou + " </td></tr><tr><td>TB-Pure: </td><td>" + skillworou + "</td></tr></table></b></div>";
				document.getElementsByTagName("div")[18].appendChild(div_area);
			
				var TMDB = document.createElement("span"); // erzeugt ein html-span-tag
				TMDB.innerHTML=Tform;
				document.getElementById("area").appendChild(TMDB);
			}
			else {
				var div_area = document.createElement('div');
				div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; width: 175px; margin-top: 25px; background: #5F8D2D; color: #ff9900; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #333333 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-bottom: 1em;\"><tr><td>PhySum: </td><td>" + area_phy + " </td></tr><tr><td>TacSum: </td><td>" + area_tac + " </td></tr><tr><td>TecSum: </td><td>" + area_tec + " </td></tr><tr><td>AllSum: </td><td>" + skillsum + "</td></tr><tr><td>&nbsp;</td></tr><tr><td>TB-Rating: </td><td>" + skillsumme + " </td></tr><tr><td>RouEffect: </td><td>" + effect_rou + " </td></tr><tr><td>TB-Pure: </td><td>" + skillworou + "</td></tr></table></b></div>";
				document.getElementsByTagName("div")[39].appendChild(div_area);			
			}
		}
	}	
	else {
	
	}

	
//	alert ("Summe: " + skillsumme)
} // if showprofile
}
if (myurl.match(/.*/))
{
/*	
function hide (member) {
        if (document.getElementById) {
            if (document.getElementById(member).style.display = "inline") {
                document.getElementById(member).style.display = "none";
            } else {
                document.getElementById(member).style.display = "inline";
            }
        }
}
*/
/*var divswitch = document.createElement('div');
appdivswitch = document.body.appendChild(divswitch);
appdivswitch.innerHTML = '<div><a href="javascript:ToggleMenu();">Menu</a></div>';
*/

if (hovermenu == "yes") {

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

    $.noConflict();
    jQuery(document).ready(function($) {
    $('#top_menu ul li a').bind('mouseover', function() { 
		top_menu["change"]($(this).attr('top_menu'), false);
	});
  });
});

}
else  {

}


//Menu bottom right
if (menubar == "yes") {
	var div1 = document.createElement('div');
	appdiv1 = document.body.appendChild(div1);
	appdiv1.innerHTML = '<div id="menu" style="position: fixed; z-index: 1000; bottom: 30px; right: 25px; height: 30px; width: 160px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; background: url(http://www.patrick-meurer.de/tm/TrophyBuddy_menu2.png);">&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/club/"><img src="http://patrick-meurer.de/tm/trophybuddy/home.png" title="' + Home + '" style="height: 20px;"></a></span>&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/home/box"><img src="http://patrick-meurer.de/tm/trophybuddy/mail.png" title="' + CheckYourMails + '" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/league/"><img src="http://patrick-meurer.de/tm/trophybuddy/league.png" title="' + League + '" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/cup/"><img src="http://patrick-meurer.de/tm/trophybuddy/trophy.png" title="' + Cup + '" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="lastspan" style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/?logout"><img src="http://patrick-meurer.de/tm/trophybuddy/logout.png" title="' + Exit + '" style="height: 20px;"></a></span></div>';
}
	else {
}

if (sidebar == "yes") {
	if (myclubid == "") {
		//Navigationsbereich
		var div = document.createElement('div');
		appdiv = document.body.appendChild(div);
		appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy23.png"><p style="text-decoration: underline;">' + Team + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyScouts + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/player_notes/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '">' + PlayerNotes + '</a></li><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/int/transfer/" title="' + GoTransferForum + '">T</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> )</li><li><a href="http://trophymanager.com/forum/int/recent-posts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYourRecentPosts + '">' + YourRecentPosts + '</a></li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';
		//appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy21.png"><p style="text-decoration: underline;">' + Team + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyScouts + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/player_notes/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '>' + PlayerNotes + '</a></li><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/int/transfer/" title="' + GoTransferForum + '">T</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> | <a href="http://trophymanager.com/forum/federations" title="' + GoFederations + '">F</a> )</li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';	
	}
	else {
		if (secondaryteamid == "") {
			//Navigationsbereich
			var div = document.createElement('div');
			appdiv = document.body.appendChild(div);
			appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy23.png"><p style="text-decoration: underline;">' + Team + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/club/' + myclubid + '/squad/" target="_self" style="font-size: 10px; color: gold;" title="Go to Squad">' + Squad + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/player_notes/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '">' + PlayerNotes + '</a></li><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/int/transfer/" title="' + GoTransferForum + '">T</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> )</li><li><a href="http://trophymanager.com/forum/int/recent-posts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYourRecentPosts + '">' + YourRecentPosts + '</a></li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';
		}
		else {
			//Navigationsbereich
			var div = document.createElement('div');
			appdiv = document.body.appendChild(div);
			appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy23.png"><p style="text-decoration: underline;">' + Team + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/club/' + myclubid + '/squad/" target="_self" style="font-size: 10px; color: gold;" title="Go to Squad">' + Squad + '</a> | <a href="http://trophymanager.com/club/' + secondaryteamid + '/squad/" target="_self" style="font-size: 10px; color: gold;" title="Go to Squad">' + Squad2 + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/player_notes/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '">' + PlayerNotes + '</a></li><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/int/transfer/" title="' + GoTransferForum + '">T</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> )</li><li><a href="http://trophymanager.com/forum/int/recent-posts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYourRecentPosts + '">' + YourRecentPosts + '</a></li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';
		}
	}
}
else {
}
}
//Transferseite

//Forum
if (myurl.match(/forum/)) {
	
	var forumcolor = "test";

	if (forumcolor == "tm") {

		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

			$.noConflict();
			jQuery(document).ready(function($) {
	 
			//$('div.text').css('font-family', 'arial');
			
			$('div.box_body').css('background-color', '#303030');
			
			
			
			$('a').css('color', 'gold');
			$('div.content_menu a').css('color', 'white');
			$('div.quote').css('background-color', '#444444');
			$('div.quote_text').css('color', '#C0C0C0');
			$('div.subtle').css('color', '#707070');
			$('div.text_fade_overlay').css('background', 'url("http://www.patrick-meurer.de/trophybuddy/background_fade.png")');
			$('div.text_fade_overlay hover').css('background', 'url("http://www.patrick-meurer.de/trophybuddy/hover_background_fade.png")');
			
			$('a.page_navigation').css('background-color', '#666666');
			$('div.page_navigation').css('background-color', '#888888');
			$('div.main_center').css('background-color', '#303C26');
			$('div.main_center').css('background', 'none');
			//$('div.background_gradient forum_topics').css('background', 'url("/pics/forum/background.png") repeat-x scroll 0 0 #578229');
			//$('div.background_gradient forum_topics').css('background-color', '#303C26');
			//$('div.background_gradient forum_topics.hover').css('background-color', 'orange');
			//$('div.background_gradient').css('background-color', '#303C26');
			//$('div.background_gradient').css('background', 'url("http://www.patrick-meurer.de/trophybuddy/background.png") repeat-x scroll 0 0 #303C26');
			$('div.background_gradient').css('background', 'repeat-x scroll 0 0 #222222');
			$('div.background_gradient').css('border-width', '3px 0 0 0');
			$('div.background_gradient').css('border-color', '#303030');
			$('div.forum_topics').css('border-style', 'outset');
			$('div.background_gradient').css('border-style', 'groove');
			$('div.actions').css('background-color', '#555555');
			$('div.user').css('background-color', '#555555');
			$('div.hidden_buttons').css('background-color', '#555555');
			$('div.background_gradient_hover').css('background-color', '#303C26');
			$('div.topic_post.hidden_buttons_wrap').css('background-color', '#666666');

		
			//.background_gradient, .background_gradient_hover
			//$('div.topic_likes').css('background-color', '#303C26');
			$('span.positive').css('background-color', 'darkgreen');
			//$('span.negative').css('background-color', 'red');
			
			});
		});

	}
	else {
	
	}
	/////////////////////////////////////// TRANSFER LIST /////////////////////////////////////////////////////////




if (location.href.indexOf("/transfer/") != -1) {

var target1 = document.getElementById('transfer_list');
//console.log(target1.innerHTML)
//target1.style.border = "1px solid red";
//var tabletransf = target1.getElementsByTagName('table')[0];
var recvalues = [];


var btskills = document.getElementById('skills');
var btmain = document.getElementById('breakdown');
//btskills.style.border = "1px solid red";
//btmain.style.border = "1px solid red";


	


function showtable() { 
//alert('function');

function putRec(tbl2)
{
var tblBodyObj2 = tbl2.tBodies[0];
	for (var f=0; f<tblBodyObj2.rows.length; f++) {
			if(f==0){
				var newTH2 = document.createElement('th');
				//newTH.innerHTML = '[th] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length +1)
				newTH2.innerHTML = '&nbsp;&nbsp;MTX&nbsp;&nbsp;';
				tblBodyObj2.rows[f].insertBefore(newTH2, tblBodyObj2.rows[f].childNodes[4]);
				}
			else{
				var newCell2 = tblBodyObj2.rows[f].insertCell(+4);
				var cellstar = tblBodyObj2.rows[f].cells[5];
				cellstar.style.background = "red";
				var cellstarvalue = cellstar.childNodes[0].getAttribute('sort');
				//alert(cellstarvalue/2);
				newCell2.innerHTML = recvalues[f-1];				
				newCell2.style.textAlign = "center";
				newCell2.className = "rec_normal";
				if(recvalues[f-1]>=((cellstarvalue/2)+0.5)||recvalues[f-1]>((cellstarvalue/2)+0.405)){newCell2.className = "rec_high";}
				if(recvalues[f-1]<=((cellstarvalue/2)-0.051)){newCell2.className = "rec_low";}
				}
		}
}

function getRec(tbl)
{

recvalues = [];


	// positionIndex is the array of skill priority for this player.
	// skills is an array of skills for each user		

	
	(function() {
		

	var tblBodyObj = tbl.tBodies[0];
	for (var i=0; i<tblBodyObj.rows.length; i++) {
			if(i==0){
				var newTH = document.createElement('th');
				newTH.innerHTML = '&nbsp;&nbsp;MTX&nbsp;&nbsp;';
				tblBodyObj.rows[i].appendChild(newTH);}
			else{
				abort = 0;
				var playerTable = tblBodyObj.rows[i];
				var soma = 0;
				var newCell = tblBodyObj.rows[i].insertCell(-1);

				var skillArray = [];
				for(var h=4; h<(playerTable.cells.length-1); h++){
					
					document.getSkills = function(table) {
						
						var tableData = table.cells;
						if (tableData.length > 1) 
						{
							for (var i = 4; i <(tableData.length -1); i++) 
							{
								//alert(tableData[i].innerHTML);
								if (tableData[i].innerHTML.length != 0) 
								{
									
									if (tableData[i].innerHTML.indexOf("star.png") > 0) 
									{
										skillArray.push(100);
										//alert('100');
									}
									else if (tableData[i].innerHTML.indexOf("star_silver.png") > 0) 
									{
										skillArray.push(99);
										//alert('99');
									}
									else if (tableData[i].textContent.length != 0) 
									{
										if ((tableData[i].textContent == '0') || (tableData[i].textContent == '-'))
										{
											//alert(tableData[i].textContent);
											abort = 1;
										}
										var pushvalue = ((tableData[i].getElementsByTagName('span')[0].textContent)*1);
										skillArray.push(pushvalue);
									}
									
									//alert(pushvalue);
								}
								
							
							}
						}
						return skillArray;						
					};
					
				}
				var skillArray = document.getSkills(playerTable);	
				var SKs = computeSK(skillArray,remainpct);
				//console.log('skillarray ' + skillArray);
				//console.log('SKs ' + SKs);
				if(playerTable.getElementsByClassName("favposition short nowrap")[0].textContent){
					var SKposiSpan = playerTable.getElementsByClassName("favposition short nowrap")[0].textContent;
				}
				
				SKposiSpan = SKposiSpan.replace('E','L').replace(' D',' L').replace(' CD',' CL').replace(' LD',' L').replace('LL','L');
				//var SKposi = SKposi.replace(' ','').replace(' ','');
				SKposiSpan = SKposiSpan.replace('/',',').toLowerCase();
				//var SKposi = SKposi.replace('dcl','dc,dl').replace('mdcl','mdc,mdl').replace('mcl','mc,ml').replace('mocl','moc,mol');
				SKposiSpan = SKposiSpan.replace('d cl','dc,dl').replace('d lc','dc,dl').replace('d,md l','dl,mdl').replace('md,d l','mdl,dl').replace('d,md c','dc,mdc').replace('md,d c','dc,mdc');
				SKposiSpan = SKposiSpan.replace('d,m l','dl,ml').replace('m,d l','dl,ml').replace('d,m c','dc,mc').replace('m,d c','dc,mc');
				SKposiSpan = SKposiSpan.replace('m cl','mc,ml').replace('m lc','mc,ml').replace('m,md c','mdc,mc').replace('md,m c','mdc,mc').replace('md,m l','mdl,ml').replace('m,md l','mdl,ml').replace('m,mo l','ml,mol').replace('mo,m l','ml,mol').replace('m,mo c','mc,moc').replace('mo,m c','mc,moc');
				SKposiSpan = SKposiSpan.replace('mo cl','moc,mol').replace('mo lc','moc,mol');
				SKposiSpan = SKposiSpan.replace(' ','').replace(' ','');
				
				var smallnames = ['dc','dl','mdc','mdl','mc','ml','moc','mol','a','gr'];		
 	
				var plposi = SKposiSpan;
				plposi = plposi.split(",");
				console.log(plposi);
				
				if(plposi[1]){
				
					   var numb0 = "";
					   var numb1 = "";
					for(var z = 0; z < smallnames.length; z++) {					    
						
						if(smallnames[z] == plposi[0]) {				 
						 var dpos0 = z;
						 numb0 = SKs[dpos0];
						 if(dpos0 == 0){numb0 = numb0-0.5;}
						 numb0 = Math.round((numb0/5)*1000)/1000;
						 console.log('pos0= ' + plposi[0] + ' SK= ' + numb0);						 
						}
						if(smallnames[z] == plposi[1]) {
						 var dpos1 = z;
						 numb1 = SKs[dpos1];
						 if(dpos1 == 0){numb1 = numb1-0.5;}
						 numb1 = Math.round((numb1/5)*1000)/1000;
						 console.log('pos1= ' + plposi[1] + ' SK= ' + numb1);
						}				
					   var SKposi = Math.max(numb0,numb1);
					}
					if(!(numb0)||!(numb1)){alert('erro!');}
					
				}else{
					var numb0 = "";
					for(var z = 0; z < smallnames.length; z++) {
					   if(smallnames[z] == plposi) {
						 
						 var numb0 = SKs[z];
						 if(z == 0){numb0 = numb0-0.5}
						 SKposi = Math.round((numb0/5)*1000)/1000;
						 console.log('pos= ' + plposi + ' SK= ' + SKposi);
					   }
					}
					if(!(numb0)){alert('erro!');}
				}
			
			
			//alert(SKposi);
			if(abort == 1){SKposi="---"};
			//console.log(SKposi); 
				//newCell.innerHTML = SKposi;
				//alert(SKposi);
				
				newCell.innerHTML = SKposi;
				newCell.style.textAlign = "center";
				recvalues.push(SKposi);
		}
		
		
	}
	//alert(recvalues);
})();
btmain.click();
btputrec.click();
}
	

var tabletransf = target1.getElementsByTagName('table')[0];
//tabletransf.style.border = "1px solid green";
var target2 = document.getElementById('filters');
//target2.style.border = "1px solid yellow";
var btgetasi = document.createElement("input");
var btgetrec = document.createElement("input");
var btputrec = document.createElement("input");

//Assign different attributes to the element. 
btgetasi.setAttribute('type','button');
btgetasi.setAttribute('name','getasi');
btgetasi.setAttribute('value','Get ASI');

btgetrec.setAttribute('type','button');
btgetrec.setAttribute('name','getrec');
btgetrec.setAttribute('value','Get REC');

btputrec.setAttribute('type','button');
btputrec.setAttribute('name','putrec');
btputrec.setAttribute('value','Put REC');

btgetasi.onclick = function() { // Note this is a function
		var tabletransf2 = target1.getElementsByTagName('table')[0];
        //tabletransf2.style.border = "1px solid red";
		//tabletransf2.style.fontSize = "12px";
		btskills.click();
		btgetrec.click();		
};

btgetrec.onclick = function() { // Note this is a function			
        var tabletransf3 = target1.getElementsByTagName('table')[0];
		//tabletransf3.style.border = "1px solid yellow";
		//tabletransf3.style.fontSize = "12px";
		getRec(tabletransf3);	
};

btputrec.onclick = function() { // Note this is a function			
        var tabletransf4 = target1.getElementsByTagName('table')[0];
		//tabletransf4.style.border = "1px solid yellow";
		//tabletransf4.style.fontSize = "12px";
		putRec(tabletransf4);	
};

target2.appendChild(btgetasi);
target2.appendChild(btgetrec);
target2.appendChild(btputrec);

btgetasi.click();
var pages = document.getElementById('pages');
//alert(pages.childNodes.length);



target1.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].onclick = function() {	
	btgetasi.click();
	target1.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].onclick = function() {	
		btgetasi.click();
		target1.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].onclick = function() {	
			btgetasi.click();			 
			};				 
		};			 
	};

btgetasi.style.visibility = 'hidden';
btgetrec.style.visibility = 'hidden';
btputrec.style.visibility = 'hidden';

var btreload = document.getElementById('search_btn');
var btreloadtrigger = btreload.getElementsByTagName('span')[0];

btreloadtrigger.onclick = function() {	
	window.location.reload();	
	};
pages.onclick = function() {	
	btgetasi.click();		 
	};


}
window.onload = setTimeout(showtable, 3500);


}

}