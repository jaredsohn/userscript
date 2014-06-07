// Copyright (c) 2010 Foppe Hemminga
// Licence: GNU General Public Licence (GPL)
// Feel free to copy, distribute, sell, modify and enjoy this script
// as long as you obey either the GPL 2 or GPL 3 licence.
//
// This script is for Torn City (http://www.torn.com). It will keep track of
// your hunting stats.
// Usage: Go hunting in South Africa and enjoy a nice graph.

// ==UserScript==
// @name		TornMagicHunt
// @version		20100730.0
// @author		Foppe Hemminga 'Afwas' #1337627
// @namespace		http://www.hemminga.net/greasemonkey
// @include		*.php?page=hunting
// @include		*.php?page=hunting&hunt=1
// @include		*.php?page=hunting&hunt=2
// @include		*.php?page=hunting&hunt=3
// @require		http://code.jquery.com/jquery-1.3.2.js
// @require		http://people.iola.dk/olau/flot/jquery.flot.js
// @require		http://people.iola.dk/olau/flot/jquery.flot.navigate.js
// ==/UserScript==

const DEBUG = true;

/* TODO: implement this
const SAVEDATA = -1; // -1 is unlimited
const SHOWDATA = -1; // -1 is unlimited
const PRUNEDATA = "Prune" // "Oldest" / "Random" / "Prune". Prune tries to make logical assesments
*/

// Usage: console.info("Hello world");
console = {
log :
    function (text) {
	try {
	        if ( DEBUG ) unsafeWindow.console.log( text );
	}
	catch(err) {
	}
    },
info :
    function (text) {
	try {
        	if ( DEBUG ) unsafeWindow.console.info( text );
	}
	catch(err) {
	}
    },
warn :
    function (text) {
	try {
        	if ( DEBUG ) unsafeWindow.console.warn( text );
	}
	catch(err) {
	}
    },
error :
    function (text) {
	try {
	        if ( DEBUG ) unsafeWindow.console.error( text );
	}
	catch(err) {
	}
    }
}

jQuery(document).ready(function() {

	function getHuntingSkill() {
		var allHuntingSkills = GM_getValue("huntingSkill", '');
		if(allHuntingSkills.match(/,/)) {
		//	console.warn("allHuntingSkills.match(/,/): " + allHuntingSkills.match(/,/));
			var arrAllHuntingSkills = allHuntingSkills.split(",");
			for(skill in arrAllHuntingSkills) {
				arrAllHuntingSkills[skill] = arrAllHuntingSkills[skill].split("-");
			}
		}
		else {
			var arrAllHuntingSkills = allHuntingSkills.split("-");
		}
		return arrAllHuntingSkills;
	}

	function getStatGain() {
		var statGain = GM_getValue("statGain", 0);
		if(statGain != 0) {
			var aStatGain = statGain.split(",");
			return aStatGain;
		}
	}

	function getConjunction() {
		var getComp = GM_getValue("conjunction", '');
		var bComp = new Array(0);
		if(getComp.match(/,/)) {
			var aComp = getComp.split(",");
			for(i in aComp) {
				bComp[i] = new Array();
			//	console.warn("100: aComp[i]: " + aComp[i]);
				bComp[i] = aComp[i].split("-");
			//	console.warn("100: bComp[i][0]: " + bComp[i][0]);
			//	console.warn("100: bComp[i][1]: " + bComp[i][1]);
			}
		}
		else if(getComp.match(/-/)) {
			// var bComp[0] = new Array();
			bComp[0] = getComp.split("-");
		}
		return bComp;
	}
	
	function getMoney() {
		var money = GM_getValue("money", 0);
		var bMoney = new Array();
		if(money != 0) {
			var aMoney = money.split(",");
		}
		for(m in aMoney) {
			bMoney[m] = new Array();
			if(aMoney[m].match(/B/)) {
				bMoney[m][0] = aMoney[m].match(/\d+/);
				bMoney[m][1] = "B";
			}
			else if (aMoney[m].match(/S/)) {
				bMoney[m][0] = aMoney[m].match(/\d+/);
				bMoney[m][1] = "S";
			}
			else if (aMoney[m].match(/A/)) {
				bMoney[m][0] = aMoney[m].match(/\d+/);
				bMoney[m][1] = "A";
			}
			else if (aMoney[m].match(/U/)) {
				bMoney[m][0] = aMoney[m].match(/\d+/);
				bMoney[m][1] = "U";
			}
			else {
				bMoney[m][0] = aMoney[m].match(/\d+/);
				bMoney[m][1] = "U";
			}
		}
		return bMoney;			
	}

	function formatDate(theTime) {
	//	console.warn("theTime: " + theTime);
		var time = new Date(theTime.match(/\d+/));
		var d = time.getDate();
		var mo = time.getMonth() + 1;
		var Y = time.getFullYear();
		var h = time.getHours();
		var m = time.getMinutes();
		if(m < 10) { m = String(0) + m; }
		if(h < 10) { h = String(0) + h; }
		var timeStringD = Y + "-" + String(mo) + "-" + String(d);
		var timeStringT = String(h) + ":" + m;
		var timeString = new Array();
		timeString[0] = timeStringD;
		timeString[1] = timeStringT;
		return timeString;
	}

	function energyClock() {
		var obj = jQuery("tr td:contains('Standard')");
		var html = jQuery(obj).html();
//		console.warn("119: html: " + html);
		var pattern = /and <b>\d+<\/b> energy\./
		var energyArr = html.match(pattern);
		var energy = energyArr[0].match(/\d+/);
		// If a donator once -> always a donator ;)
		if(energy > 100) {
			GM_setValue("donator", "1");
		}
	//	console.warn("127: Energy: " + energy);

		var myDate = new Date();
		var rEnergy = 150 - energy;
	//	console.warn("131: rEnergy: " + rEnergy);
		// rTime is time needed from next 5/10 min change interval
		if(rEnergy > 0) {
			var rTime = (rEnergy) * 10 * 60 * 1000 / 5;
			var myTime = Number(myDate.getTime())
			var remainder = myTime % (10 * 60 * 1000);
		//	console.warn("137: remainder: " + remainder);
			myTime = myTime - remainder;
			myTime = myTime + Number(10 * 60 * 1000);
		//	console.warn("140: formatDate(myTime); " + formatDate(String(myTime)));
		//	console.warn("141: rTime; "+ rTime);
			myTime = Number(myTime) + Number(rTime);
		//	console.warn("143: formatDate(myTime); " + formatDate(String(myTime)));

		//	console.warn("145: myTime: " + myTime);
			var tString = formatDate(String(myTime));
		//	console.warn("147: tString: " + tString); 
			var mtml = html.replace("energy.", 'energy.<br />Next full Energy bar at <span style="font-weight: bold">' + tString[1] + "</span>");
			jQuery(obj).html(mtml);
		}
	}

	function getTotalAnimals() {
		var animals = new Array();
		animals[0] = new Array();
		animals[0][0] = "Buffalo";
		animals[0][1] = GM_getValue("Buffalo", 0);
		animals[1] = new Array();
		animals[1][0] = "Zebra";
		animals[1][1] = GM_getValue("Zebra", 0);
		animals[2] = new Array();
		animals[2][0] = "Baboon";
		animals[2][1] = GM_getValue("Baboon", 0);
		animals[3] = new Array();
		animals[3][0] = "Warthog";
		animals[3][1] = GM_getValue("Warthog", 0);
		animals[4] = new Array();
		animals[4][0] = "Giraffe";
		animals[4][1] = GM_getValue("Giraffe", 0);
		animals[5] = new Array();
		animals[5][0] = "Cheeta";
		animals[5][1] = GM_getValue("Cheeta", 0);
		animals[6] = new Array();
		animals[6][0] = "Hippo";
		animals[6][1] = GM_getValue("Hippo", 0);
		animals[7] = new Array();
		animals[7][0] = "Leopard";
		animals[7][1] = GM_getValue("Leopard", 0);
		animals[8] = new Array();
		animals[8][0] = "Lion";
		animals[8][1] = GM_getValue("Lion", 0);
		animals[9] = new Array();
		animals[9][0] = "Rhino";
		animals[9][1] = GM_getValue("Rhino", 0);
		animals[10] = new Array();
		animals[10][0] = "Elephant";
		animals[10][1] = GM_getValue("Elephant", 0);
		animals[11] = new Array();
		animals[11][0] = "Hyena";
		animals[11][1] = GM_getValue("Hyena", 0);
		animals[12] = new Array();
		animals[12][0] = "Gorilla";
		animals[12][1] = GM_getValue("Gorilla", 0);

		return animals;
	}

	function getAnimals() {
		var getAnimals = GM_getValue("animals", "");
		// console.warn("getAnimals.match(/|/): " + getAnimals.match(/|/));
		if(getAnimals.match(/,/)) {
			// We have a mature list saved 
			// 1.2.1.0.0.0.0.0.0.0.0.0.0,2.0.3.1.0.0.0.0.0.0.0.0.0[,...]
		//	console.warn("In getAnimals.match(/,/)");
			var aAnimals = getAnimals.split(",");
			var bAnimals = new Array();
			for(i in aAnimals) {
				bAnimals[i] = aAnimals[i].split(".");
			}
		} 
		else if(getAnimals.match(/\./)) {
			// We hava a single list entry 
			// 0.3.0.1.0.0.0.0.0.0.0.0.0.0
			console.warn("in getAnimals.match(/\./)");
			var bAnimals = new Array();
			bAnimals[0] = getAnimals.split(".");
		}
		else {
			// GM_getValue returns nothing at all
			var bAnimals = new Array();
		}
		return bAnimals;
	}
		
	function getTotalHuntingSkill() {

		var huntingSkill;
		var text;
		text = jQuery("tr td:contains('Standard')");
		huntingSkill = jQuery(text).find("b:eq(4)").text()

		// Add dates to arrays
		var huntingDate = new Date();
		// convert to milliseconds from 1970/1/1
		var huntingTime = huntingDate.getTime();
		
		var pattern = /\d+\.?\d+ \/ 100/;
		var huntingSkill2 = huntingSkill.match(pattern);
		if(huntingSkill2) {
			// Intermezzo: While at this page I'll calculate
			// energy gain.
			energyClock();
		//	console.warn("huntingSkill2: " + huntingSkill2); // 19.6017
			var huntingSkill3 = huntingSkill2[0].match(/\d+/g);
		//	console.warn("huntingSkill3[0]: " + huntingSkill3[0]); // 19.6017
		//	console.warn("huntingSkill3[1]: " + huntingSkill3[1]); // 19.6017
			if(huntingSkill3[2] == 100) {
				var huntingSkill4 = huntingSkill3[0] + "." + huntingSkill3[1];
				console.warn("276: huntingSkill: " + huntingSkill4); // 19.6017
			}
			else {
				var huntingSkill4 = huntingSkill3[0];
			}
			if(huntingSkill4) {
				var allHuntingSkills = GM_getValue("huntingSkill", '');
				if(allHuntingSkills.match(/,/)) {
				// 	console.warn("allHuntingSkills.match(/,/): " + allHuntingSkills.match(/,/));
					var arrAllHuntingSkills = allHuntingSkills.split(",");
					// if(allHuntingSkills.match(/-/)) {
						for(skill in arrAllHuntingSkills) {
							arrAllHuntingSkills[skill] = arrAllHuntingSkills[skill].split("-");
						}
					// }
				}
				else if(allHuntingSkills == '') {
				//	console.warn("allHuntingSkills == ''");
					GM_setValue("huntingSkill", huntingTime + "-" + huntingSkill);
				}
				else {
				//	console.warn("else");
					console.warn("298: allHuntingSkills: " + allHuntingSkills + " // Should be '' here.");
					var arrAllHuntingSkills = new Array();
					arrAllHuntingSkills[0] = allHuntingSkills.split("-");
				}

	/*			for(skill in arrAllHuntingSkills) {
					console.warn("arrAllHuntingSkills["+skill+"][0]: " + arrAllHuntingSkills[skill][0]);
					console.warn("arrAllHuntingSkills["+skill+"][1]: " + arrAllHuntingSkills[skill][1]);
				} */
				if(arrAllHuntingSkills.length != 0) {
				//	console.warn("arrAllHuntingSkills.length: " + arrAllHuntingSkills.length);
					if(arrAllHuntingSkills[arrAllHuntingSkills.length - 1][1] < huntingSkill4) {
						// We need this variable later, this is the place to get it
						var huntingSkill5 = arrAllHuntingSkills[arrAllHuntingSkills.length - 1][1];
					//	console.warn("arrAllHuntingSkills[arrAllHuntingSkills.length - 1][0]: " 
					//		+ arrAllHuntingSkills[arrAllHuntingSkills.length - 1][0]);
						var newIndex = arrAllHuntingSkills.length;
					//	console.warn("newIndex: " + newIndex);
						arrAllHuntingSkills[newIndex] = new Array(huntingTime, huntingSkill4);
					//	console.warn("arrAllHuntingSkills["+newIndex+"][0]: " + arrAllHuntingSkills[newIndex][0]);
					//	console.warn("arrAllHuntingSkills["+newIndex+"][1]: " + arrAllHuntingSkills[newIndex][1]);
					//	arrAllHuntingSkills[newIndex][1] = huntingTime;
						var setString = '';
						var tempArr = new Array();
						for(key in arrAllHuntingSkills) {
							tempArr[key] = arrAllHuntingSkills[key].join("-");
						//	console.warn("F-arrAllHuntingSkills["+key+"][0]: " + arrAllHuntingSkills[key][0]);
						//	console.warn("F-arrAllHuntingSkills["+key+"][1]: " + arrAllHuntingSkills[key][1]);
						//	console.warn("F-tempArr["+key+"]: " + tempArr[key]);
						//	setString += arrAllHuntingSkills[key][0];
							setString = String(setString) + String(tempArr[key]);
							if(key < arrAllHuntingSkills.length - 1) {
								setString = setString + ",";
							}
						//	console.warn(key+" - setString" + setString);						
						}
					//	console.warn("setString" + setString);
						GM_setValue("huntingSkill", setString);
					}
				}
				if(huntingSkill5) {
					var huntingGain5 = getStatGain();
					var huntingGain6 = huntingGain5[huntingGain5.length - 1];
					var huntingGain7 = Math.round(huntingGain6 * 10000) / 10000;
				//	console.warn("359: huntingGain7: " + huntingGain7 + " // 4 decimals");
					// huntingSkill5 calculated in line 310
				//	console.warn("361: huntingSkill5: " + huntingSkill5);
					var newHuntingSkill = huntingSkill4;
				//	console.warn("363: newHuntingSkill: " + newHuntingSkill);
					// Do the Math
				//		console.warn("366: " + newHuntingSkill + " - " + huntingSkill5 + " = "
				//			+ huntingGain7 + " // should be: " + Math.round((newHuntingSkill - huntingSkill5)*10000)/10000);
					// Checks for positive hunting skill delta == most recent stat gain
					// Which translates to: this computer did _one_ hunt and then checked hunting skill
				//	console.warn("351: "  + Number(newHuntingSkill - huntingSkill5) + " == " + Number(huntingGain6));
					if((Math.round((newHuntingSkill - huntingSkill5)*10000)/10000) == Number(huntingGain7)) {
					//	console.warn("371: We're in `if`");
						var getComp = GM_getValue("conjunction", '');
						var bComp = new Array();
						if(getComp.match(/,/)) {
							var aComp = getComp.split(",");
							for(i in aComp) {
						//		console.warn("377: aComp[i]: " + aComp[i]);
								bComp[i] = aComp[i].split("-");
							}
						}
						else if(getComp.match(/-/)) {
							bComp[0] = getComp.split("-");
						}
						var bCompLength = bComp.length;
						if(bComp.length > 0) {
							bComp[bCompLength] = new Array();
							bComp[bCompLength][0] = huntingGain6;
							bComp[bCompLength][1] = newHuntingSkill;
							var cComp = new Array();
							for(j in bComp) {
								cComp[j] = bComp[j][0] + "-" + bComp[j][1];
							}
							var dComp = cComp.join();
						//	console.warn("394: dComp: " + dComp);
							GM_setValue("conjunction", dComp);
						}
						else {
						//	console.warn("398: cComp: " + huntingGain6 + "-" + newHuntingSkill);
							GM_setValue("conjunction", huntingGain6 + "-" + newHuntingSkill);
						}

					}
				}
			}
		}
	}
	getTotalHuntingSkill();

	function getHuntingStats() {
		var huntingStats;
		var animals = new Array();

		var jQObject = jQuery("tr td:contains('wildlife')");
		text = jQuery(jQObject).html();
		// console.warn("text: " + text);

		if(text) {

			var pattern = /<b>\$\d*,?\d+<\/b>/
			// var testText = "<b>$1,100</b>";
			var moneyString = text.match(pattern);
			if(moneyString) {
				// console.warn("moneyString[0]: " + moneyString[0]);
				pattern = /\d+/g
				var arrMoney = moneyString[0].match(pattern);
				if(arrMoney.length == 2) {
					var money = arrMoney[0] * 1000 + arrMoney[1] * 1;
				}
				else {
					var money = arrMoney[0];
				}
				// money.replace(/\./i, "");
				// money.replace(/,/, ".");
				console.warn("money: " + money);
			}
			else {
				console.error("moneyString is null");
			}

			pattern = /<b>[01]\.\d*<\/b>/
			var statGainString = text.match(pattern);
		//	console.warn("statGainString[0]; " + statGainString[0]); // statGainString; <b>0.04681</b>
			if(statGainString) {
				// var testStatGainString = "<b>0.04889</b>";
				var arrStatGain = statGainString[0].match(/\d+/g);
				if(arrStatGain.length == 2) {
					var statGain = arrStatGain[0] + "." + arrStatGain[1];
				}
				else {
					var statGain = arrStatGain[0];
				}
				console.warn("statGain: " + statGain);
			}
			else {
				console.error("statGainString is null");
			}
			var huntingSession = "Beginners";
			pattern = /Buffalo killed: <b>\d+<\/b>/
			var text2 = text.match(pattern);
			animals[0] = text2[0].match(/\d+/);
			console.warn("Buffalo: " + animals[0]);		
		
			pattern = /Zebra killed: <b>\d+<\/b>/
			text2 = text.match(pattern);
			pattern = /\d+/
			animals[1] = text2[0].match(pattern);
			console.warn("Zebra: " + animals[1]);
	
			pattern = /Baboon killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			pattern = /\d+/
			animals[2] = text2[0].match(pattern);
			console.warn("Baboon: " + animals[2]);		

			pattern = /Warthog killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			pattern = /\d+/
			animals[3] = text2[0].match(pattern);
			console.warn("Warthog: " + animals[3]);		

			//
			pattern = /Giraffe killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				huntingSession = "Standard";
				pattern = /\d+/
				animals[4] = text2[0].match(pattern);
				console.warn("Giraffe: " + animals[4]);
			}
			else {
				animals[4] = 0;
			}
		
			pattern = /Cheeta killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[5] = text2[0].match(pattern);
				console.warn("Cheeta: " + animals[5]);		
			}
			else {
				animals[5] = 0;
			}
							
			pattern = /Hippo killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[6] = text2[0].match(pattern);
				console.warn("Hippo: " + animals[6]);
			}
			else {
				animals[6] = 0;
			}
		
			pattern = /Leopard killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[7] = text2[0].match(pattern);
				console.warn("leopard: " + animals[7]);		
			}
			else {
				animals[7] = 0;
			}
				
			//
			pattern = /Lion killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[8] = text2[0].match(pattern);
				console.warn("lion: " + animals[8]);		
			}
			else {
				animals[8] = 0;
			}
				
			pattern = /Rhino killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[9] = text2[0].match(pattern);
				console.warn("Rhino: " + animals[9]);		
			}
			else {
				animals[9] = 0;
			}
				
			pattern = /Elephant killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[10] = text2[0].match(pattern);
				console.warn("Elephant: " + animals[10]);		
			}
			else {
				animals[10] = 0;
			}
			
			pattern = /Hyena killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				pattern = /\d+/
				animals[11] = text2[0].match(pattern);
				console.warn("Hyena: " + animals[11]);		
			}
			else {
				animals[11] = 0;
			}
				
			pattern = /Gorilla killed: <b>(\d+)<\/b>/
			text2 = text.match(pattern);
			if(text2) {
				huntingSession = "Advanced";
				pattern = /\d+/
				animals[12] = text2[0].match(pattern);
				console.warn("Gorilla: " + animals[12]);		
			}
			else {
				animals[12] = 0;
			}
					
			var iBuffalo = GM_getValue("Buffalo", 0);
			iBuffalo = Number(iBuffalo) + Number(animals[0]);
			GM_setValue("Buffalo", iBuffalo);
			
			var iZebra = GM_getValue("Zebra", 0);
			iZebra = Number(iZebra) + Number(animals[1]);
			GM_setValue("Zebra", iZebra);			

			var iBaboon = GM_getValue("Baboon", 0);
			iBaboon = Number(iBaboon) + Number(animals[2]);
			GM_setValue("Baboon", iBaboon);			

			var iWarthog = GM_getValue("Warthog", 0);
			iWarthog = Number(iWarthog) + Number(animals[3]);
			GM_setValue("Warthog", iWarthog);			

			var iGiraffe = GM_getValue("Giraffe", 0);
			iGiraffe = Number(iGiraffe) + Number(animals[4]);
			GM_setValue("Giraffe", iGiraffe);			

			var iCheeta = GM_getValue("Cheeta", 0);
			iCheeta = Number(iCheeta) + Number(animals[5]);
			GM_setValue("Cheeta", iCheeta);			

			var iHippo = GM_getValue("Hippo", 0);
			iHippo = Number(iHippo) + Number(animals[6]);
			GM_setValue("Hippo", iHippo);			

			var iLeopard = GM_getValue("Leopard", 0);
			iLeopard = Number(iLeopard) + Number(animals[7]);
			GM_setValue("Leopard", iLeopard);			

			var iLion = GM_getValue("Lion", 0);
			iLion = Number(iLion) + Number(animals[8]);
			GM_setValue("Lion", iLion);	

			var iRhino = GM_getValue("Rhino", 0);
			iRhino = Number(iRhino) + Number(animals[9]);
			GM_setValue("Rhino", iRhino);			

			var iElephant = GM_getValue("Elephant", 0);
			iElephant = Number(iElephant) + Number(animals[10]);
			GM_setValue("Elephant", iElephant);			

			var iHyena = GM_getValue("Hyena", 0);
			iHyena = Number(iHyena) + Number(animals[11]);
			GM_setValue("Hyena", iHyena);			

			var iGorilla = GM_getValue("Gorilla", 0);
			iGorilla = Number(iGorilla) + Number(animals[12]);
			GM_setValue("Gorilla", iGorilla);			

			// console.warn("VSstatGain: " + statGain);	
			if(statGain) {
				// console.warn("statGain: " + statGain);
				var allStatGains = GM_getValue("statGain", '');
				if(allStatGains.match(/,/)) {
					var arrAllStatGains = allStatGains.split(",");
				}
				else if(allStatGains != '') {
					var arrAllStatGains = new Array(allStatGains);
				}
				else {
					var arrAllStatGains = new Array();
				}
				// console.warn("arrAllStatGains.length: " + arrAllStatGains.length);
				if(arrAllStatGains.length == 0) {
					GM_setValue("statGain", statGain);
				}
				else if(arrAllStatGains[arrAllStatGains.length - 1] > statGain) {
					arrAllStatGains[arrAllStatGains.length] = statGain;
					GM_setValue("statGain", arrAllStatGains.join(","));
				}  
			}

			if(money) {
				var getMoney = GM_getValue("money", '');
				if(getMoney.match(/,/)) {
					var arrMoney = getMoney.split(",");
				}
				else if(getMoney.match(/\d+/)) {
					var arrMoney = new Array(getMoney);
				}
				else {
					var arrMoney = new Array();
				}
				// if(arrMoney.length == 0) {
				//	GM_setValue("money", money);
				// }
				// else {
					switch(huntingSession) {
						case "Beginners":
							arrMoney[arrMoney.length] = money + "B";
							break;
						case "Standard":
							arrMoney[arrMoney.length] = money + "S";
							break;
						case "Advanced":
							arrMoney[arrMoney.length] = money + "A";
							break;
						default:
							arrMoney[arrMoney.length] = money + "U";
					}
					GM_setValue("money", arrMoney.join(","));
				// }
			}

			if(animals) {
			//	for(aa in animals) {
			//		console.warn("animals["+aa+";: " + animals[aa]);
			//	}
				var getAnimals = GM_getValue("animals", "");
				// console.warn("getAnimals.match(/|/): " + getAnimals.match(/|/));
				if(getAnimals.match(/,/)) {
					// We have a mature list saved 
					// 1.2.1.0.0.0.0.0.0.0.0.0.0,2.0.3.1.0.0.0.0.0.0.0.0.0[,...]
				//	console.warn("In getAnimals.match(/,/)");
					var aAnimals = getAnimals.split(",");
					var bAnimals = new Array();
					for(i in aAnimals) {
						bAnimals[i] = aAnimals[i].split(".");
					}
					bAnimals[bAnimals.length] = new Array();
					for(j in animals) {
						bAnimals[bAnimals.length - 1][j] = animals[j];
					}
				} 
				else if(getAnimals.match(/\./)) {
					// We hava a single list entry 
					// 0.3.0.1.0.0.0.0.0.0.0.0.0.0
					console.warn("in getAnimals.match(/\./)");
					var bAnimals = new Array();
					bAnimals[0] = getAnimals.split(".");
					bAnimals[1] = new Array();
					for(k in animals) {
						bAnimals[1][k] = animals[k];
					}
				}
				else {
					// GM_getValue returns nothing at all
					var bAnimals = new Array();
					bAnimals[0] = new Array();
					for(l in animals) {
						bAnimals[0][l] = animals[l];
					}
					console.warn("else bAnimals[0]: " + bAnimals[0]);
				}
				// bAnimals is now a two dimensional array containing 
				// up to the latest recorded data.
				var cAnimals = new Array();
				for(m in bAnimals) {
					// cAnimals will be a one dimensional array
					cAnimals[m] = bAnimals[m].join(".");
				}
				console.log("Latest animals entry: " + cAnimals[cAnimals.length - 1]);
				// dAnimals is a string
				var dAnimals = cAnimals.join(); 
			//	console.warn("dAnimals: " + dAnimals);
				GM_setValue("animals", dAnimals);
			}
		}
	}
	getHuntingStats();		
	
	// jQuery flot
	jQuery("hr:eq(2)").after('<div style="width:600px">'
		+ '<img src="http://www.hemminga.net/greasemonkey/128px-Human-gnome-session-switch.svg.png" height="50px" id="switch" />'
		+ '<h1>Nice Graph</h1></div><div id="flot" style="width:600px;height:300px"></div><div>'
		+ '<img src="http://www.hemminga.net/greasemonkey/128px-Human-gnome-session-switch.svg.png" height="50px" id="graph" />'
		+ '</div><div id="graphDiv"><table id="huntingSkill"></table></div><div>'
		+ '<img src="http://www.hemminga.net/greasemonkey/128px-Human-gnome-session-switch.svg.png" height="50px" id="data" />'
		+ '</div><div id="rawData"></div>');
	function showHuntingSkill() {
		var stat = getHuntingSkill();
		$.plot($("#flot"),
			[ { data: stat, label: "Hunting skill", lines: { show: true }, points: { show: false }, color: 0 }],
	
			{ 
			xaxis: { mode: 'time' },
			legend: { position: 'nw' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "animals";
	}
	// showHuntingSkill();

	function showStatGain() {
		var gain = getStatGain();
		var statGain = new Array();
		for(stat in gain) {
			statGain[stat] = new Array();
			statGain[stat][0] = stat * 1 + 1;
			statGain[stat][1] = gain[stat];
			// console.error("statGain["+stat+"][0]: " + statGain[stat][0]);
		}
		$.plot($("#flot"),
			[ { data: statGain, label: "Hunting skill gain", lines: { show: true }, points: { show: true }, color: 1 }],
	
			{ 
		//	xaxis: { mode: 'time' },
			legend: { position: 'ne' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "money";
	}
	// showStatGain();

	function showMoney() {
		var aMoney = getMoney();
		var counter = 0;
		var money = new Array();
		for(i = (aMoney.length - 100); i < aMoney.length; i++) {
			money[counter] = aMoney[i];
			counter++;
		}
		var bMoney = new Array();
		var cMoney = new Array();
		var begMoney = new Array();
		var staMoney = new Array();
		var advMoney = new Array();
		var unkMoney = new Array();
		for(cash in money) {
			bMoney[cash] = new Array();
			bMoney[cash][0] = cash * 1 + 1.5;
			switch(money[cash][1]) {
				case "B":
				begMoney[cash] = new Array();
				begMoney[cash][0] = cash * 1 + 1;
				begMoney[cash][1] = money[cash][0];
				break;
				case "S":
				staMoney[cash] = new Array();
				staMoney[cash][0] = cash * 1 + 1;
				staMoney[cash][1] = money[cash][0];
				break;
				case "A":
				advMoney[cash] = new Array();
				advMoney[cash][0] = cash * 1 + 1;
				advMoney[cash][1] = money[cash][0];
				break;
				case "U":
				unkMoney[cash] = new Array();
				unkMoney[cash][0] = cash * 1 + 1;
				unkMoney[cash][1] = money[cash][0];
				break;
			}
			var cumCash = 0;
			for(var i = 0; i <= cash; i++) {
				cumCash += Number(money[i][0]);
			}
			bMoney[cash][1] = cumCash / i;
		}
		var j = 0;
		for(j = 5; j < (money.length - 4); j++) {
			var dMoney = 0;
			var k = 0;
			for(k = j - 5; k < j + 5; k++) {
				dMoney += Number(money[k][0]);
			}
			cMoney[j] = new Array();
			cMoney[j][0] = Number(j) + 1.5;
			// console.warn("715: dMoney: " + dMoney + " / k: " + k);
			cMoney[j][1] = dMoney / 10;
		}
		$.plot($("#flot"),
			[ { data: begMoney, label: "Cash per hunt Beginner", bars: { show: true }, points: { show: false }, color: 2 },
			  { data: staMoney, label: "Cash per hunt Standard", bars: { show: true }, points: { show: false }, color: 6 },
			  { data: advMoney, label: "Cash per hunt Advanced", bars: { show: true }, points: { show: false }, color: 3 },
			  { data: unkMoney, bars: { show: true }, points: { show: false }, color: 0 },
			  { data: bMoney, label: "Average cash", lines: { show: true }, points: { show: false }, color: 10 },
			  { data: cMoney, label: "Average cash -5 / +4", lines: { show: true }, points: { show: false }, color: 14 } ],
	
			{ 
		//	xaxis: { mode: 'time' },
			legend: { position: 'nw' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "huntingSkill";
	}

	function generateAnimalData(offset) {
		// var arr1 = getTotalAnimals();
		var arr2 = getAnimals();
		var arr3 = new Array();
		for(i in arr2) {
			arr3[i] = new Array();
			arr3[i][0] = i * 1 + 1;
			if(i > 0) {
				arr3[i][1] = Number(arr3[i - 1][1]) + Number(arr2[i][offset]);
			}
			else {
				arr3[i][1] = arr2[i][offset];
			}
		}
	//	console.warn("668: arr3[0]: " + arr3[0]);
	//	console.warn("669: arr3[1]: " + arr3[1]);
		return arr3;
	}

	function showAnimalGraph() {
		var arr0 = getTotalAnimals();
		var arr1 = generateAnimalData(0);
		var arr2 = generateAnimalData(1);
		var arr3 = generateAnimalData(2);
		var arr4 = generateAnimalData(3);
		var arr5 = generateAnimalData(4);
		var arr6 = generateAnimalData(5);
		var arr7 = generateAnimalData(6);
		var arr8 = generateAnimalData(7);
		var arr9 = generateAnimalData(8);
		var arr10 = generateAnimalData(9);
		var arr11 = generateAnimalData(10);
		var arr12 = generateAnimalData(11);
		var arr13 = generateAnimalData(12);
	//	var arr14 = generateAnimalData(13);

//		console.warn("677: arr2[0]: " + arr2[0]);

		$.plot($("#flot"),
			[ { data: arr1, label: arr0[0][0], lines: { show: true }, points: { show: false }, color: 3 },
			  { data: arr2, label: arr0[1][0], lines: { show: true }, points: { show: false }, color: 4 },
			  { data: arr3, label: arr0[2][0], lines: { show: true }, points: { show: false }, color: 5 },
			  { data: arr4, label: arr0[3][0], lines: { show: true }, points: { show: false }, color: 6 },
			  { data: arr5, label: arr0[4][0], lines: { show: true }, points: { show: false }, color: 7 },
			  { data: arr6, label: arr0[5][0], lines: { show: true }, points: { show: false }, color: 8 },
			  { data: arr7, label: arr0[6][0], lines: { show: true }, points: { show: false }, color: 9 },
			  { data: arr8, label: arr0[7][0], lines: { show: true }, points: { show: false }, color: 10 },
			  { data: arr9, label: arr0[8][0], lines: { show: true }, points: { show: false }, color: 11 },
			  { data: arr10, label: arr0[9][0], lines: { show: true }, points: { show: false }, color: 12 },
			  { data: arr11, label: arr0[10][0], lines: { show: true }, points: { show: false }, color: 13 },
			  { data: arr12, label: arr0[11][0], lines: { show: true }, points: { show: false }, color: 14 },
			  { data: arr13, label: arr0[12][0], lines: { show: true }, points: { show: false }, color: 15 } ],
	
			{ 
		//	xaxis: { mode: 'time' },
			legend: { position: 'nw' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "statGain";
	}
		
	// jQuery toggle() doesn't work, but this does ;)
	var TS_show = "huntingSkill";
	$("#switch").click(function(){
		if(TS_show == "huntingSkill") {
			showHuntingSkill();
		}
		else if(TS_show == "statGain") {
			showStatGain();
		}
		else if(TS_show == "money") {
			showMoney();
		}
		else if(TS_show == "animals") {
			showAnimalGraph();
		}
	});

	// Initiate on load
	showHuntingSkill();

	var hStats = getHuntingSkill();
	hStats.reverse();
	var graphData = "\n<thead>\n";
	graphData += "\t<caption>Hunting stats</caption>\n";
	graphData += "\t<tr>\n\t\t\t<th>Date</th><th>Hunting skill</th><th>Difference</th>\n\t</tr>\n";
	graphData += "</thead>\n<tbody>\n";
	for(skill in hStats) {
		var thisDate = formatDate(hStats[skill][0]);
	//	console.warn("hStats["+skill+"][0]: "+ hStats[skill][0]);
		graphData += "\t<tr><td>";
		graphData += thisDate[0] + " " + thisDate[1];
		graphData += "</td><td>";
		graphData += hStats[skill][1];
		graphData += "</td><td>";
		if(skill < hStats.length - 1) {
			graphData += (hStats[skill][1] - hStats[skill * 1 + 1][1]).toFixed(4);
		}
		graphData += "</td></tr>\n";
	}
	graphData += "</tbody>\n"; 

	// Helper function
	function splitString(str) {
		var l = str.length;
		var i = 0;
		var s = new String();
		while(i < l) {
			s += str.slice(i, i + 1);
			if(i < l - 1) {
				s += "<br />";
			}
			i++;
		}
		return s;
	}
	var sGain = getStatGain();
	sGain.reverse();
	var sMoney = getMoney();
	sMoney.reverse();
	var sAnimals = getAnimals();
	sAnimals.reverse();
	var sData = new Array();
	var sMax = Math.max(sGain.length, sMoney.length, sAnimals.length);
//	console.log("sMax: " + sMax);
//	console.log("sGain.length: " + sGain.length);
//	console.log("sMoney.length: " + sMoney.length);
//	console.log("sAnimals.length: " + sAnimals.length);
	// Clumsy but it will do with only three arrays
	if(sMax == sGain.length) {
		for(sg in sGain) {
		//	console.warn("sg: " + sg);
			sData[sg] = new Array();
			sData[sg][0] = sGain[sg];
			for(var i = 1; i < 15; i++) {
				sData[sg][i] = "";
			}
		//	console.warn("sData["+sg+"][0]: " + sData[sg][0]);
		}
		for(sm in sMoney) {
			sData[sm][1] = sMoney[sm][0];
			switch(sMoney[sm][1]) {
				case "B":
					sData[sm][15] = "Beginner";
					break;
				case "S":
					sData[sm][15] = "Standard";
					break;
				case "A":
					sData[sm][15] = "Advanced";
					break;
				case "U":
				default:
					sData[sm][15] = "Unknown";
			}
		}
		for(sa in sAnimals) {
		//	console.warn("sAnimals["+sa+"]: " + sAnimals[sa]);
			for(sk in sAnimals[sa]) {
				var st = Number(sk) + 2; // Stupid javaScript
			//	console.warn("st: " + st);
			//	console.warn("sAnimals["+sa+"]["+sk+"]: " + sAnimals[sa][sk]);
				sData[sa][st] = sAnimals[sa][sk];
			//	console.warn("sData["+sa+"]["+st+"]: " + sData[sa][st]);
			}
		} 
	}
	else if(sMoney.length >= sAnimals.length) {
		for(sm in sMoney) {
			sData[sm] = new Array();
			sData[sm][0] = "";
			sData[sm][1] = sMoney[sm][0];
			for(var i = 2; i < 15; i++) {
				sData[sm][i] = "";
			}
		}			
		for(sg in sGain) {
			sData[sg][0] = sGain[sg];
		}
		for(sa in sAnimals) {
			for(sk in sAnimals[sa]) {
				var st = Number(sk) + 2;
				sData[sa][st] = sAnimals[sa][sk];
			}
		}
	}
	else if(sMax == sMoney.length) {
		for(sa in sAnimals) {
			sData[sa] = new Array();
			sData[sa][0] = "";
			sData[sa][1] = "";
			for(sk in sAnimals[sa]) {
				var st = Number(sk) + 2;
				sData[sa][st] = sAnimals[sa][sk];
			}
		}		
		for(sm in sMoney) {
			sData[sm][1] = sMoney[sm][0];
		}			
		for(sg in sGain) {
			sData[sg][0] = sGain[sg];
		}
	}

	function generateImageHeader() {
		var arr = getTotalAnimals();
		var arr2 = new Array();
		var arr3 = new Array();
		for(i in arr) {
			arr2[i] = arr[i][0].toLowerCase() + ".jpg";
		}
		for(i in arr2) {
			arr3[i] = '<img src="http://www.hemminga.net/greasemonkey/' + arr2[i] + '" alt="'
				+ arr[i][0] + '" width="50px" />';
		}
		return arr3;
	}
	images = generateImageHeader();
	var hData = "\t<caption>Hunting results</caption>\n";
	hData += "<thead>\n";
	hData += "\t<tr>\n\t\t\t<th>Skill Gain</th><th>Session</th><th>Money</th><th>" + images[0] + "</th>";
	hData += "<th>" + images[1] + "</th><th>" + images[2] + "</th>";
	hData += "<th>" + images[3] + "</th><th>" + images[4] + "</th>";
	hData += "<th>" + images[5] + "</th><th>" + images[6] + "</th>";
	hData += "<th>" + images[7] + "</th><th>" + images[8] + "</ht>";
	hData += "<th>" + images[9] + "</th><th>" + images[10] + "</th>";
	hData += "<th>" + images[11] + "</th><th>" + images[12] + "</th>";
	hData += "\n\t</tr>\n";
	hData += "</thead>\n<tbody>\n"; 
	for(an in sData) {
		hData += "\t<tr>\n\t\t<td>" + sData[an][0] + "</td><td>" + sData[an][15] + "</td><td>";
		hData += sData[an][1] + "</td>";
		hData += "<td>" + sData[an][2] + "</td><td>" + sData[an][3] + "</td><td>";
		hData += sData[an][4] + "</td><td>" + sData[an][5] + "</td><td>" + sData[an][6];
		hData += "</td><td>" + sData[an][7] + "</td><td>" + sData[an][8] + "</td><td>";
		hData += sData[an][9] + "</td><td>" + sData[an][10] + "</td><td>" + sData[an][11];
		hData += "</td><td>" + sData[an][12] + "</td><td>" + sData[an][13] + "</td><td>";
		hData += sData[an][14] + "</td>\n</tr>\n";
	}
	hData += "</tbody>\n";

	function showHunts() {
		$("#graphDiv").css({"display": "block"});
		$("th").css({"vertical-align": "bottom"});
		$("#huntingSkill tbody td").css({"border": "1px solid"});
		$("#huntingSkill").html(hData).css({"text-align": "center"});
		showGraph = "Yes";
	}
//	var hData = "<p>Goodbye cruel world!</p>";
	function viewGraph() {
		$("#graphDiv").css({"display": "block"});
		$("#huntingSkill").html(graphData).css({"text-align": "center"});
		showGraph = "Animal";
	} 
	function showAnimals() {
		var animals = getTotalAnimals();
		var data = "\n<caption>Hunting stats</caption>\n<theader>\n\t<tr><th>Animal</th>";
		data += "<th></th><th>Number</th></tr>\n</theader>\n<tbody>\n";
		for(animal in animals) {
			data += "\t\t<tr><td>" + animals[animal][0] + "</td><td>" + images[animal];
			data += "</td><td>" + animals[animal][1] + "</td></tr>\n";
		}
		data += "</tbody>\n";
		$("#graphDiv").css({"display": "block"});
		$("#huntingSkill").html(data).css({"text-align": "center"});
		showGraph = "No";
	} 
	function hideGraph() {
		$("#graphDiv").css({"display": "none"});
		showGraph = "Hunts";
	} 
	var showGraph = 'No';
	$("#graph").click(function(){
		if(showGraph == "Yes") {
			viewGraph();
		}
		else if(showGraph == "No") {
			hideGraph();
		}
		else if(showGraph == "Animal") {
			showAnimals();
		}
		else if(showGraph == "Hunts") {
			showHunts();
		}
	}); 
	hideGraph(); 

	function showRawData() {
		var aData = getStatGain();
		var junction = getConjunction();
		var jTable = new Array();
//		console.warn("1158: aData: " + aData);
		for(i in aData) {
		//	console.warn("1160: aData[0] = " + aData[0]);
			jTable[i] = new Array();
			jTable[i][0] = aData[i];
			jTable[i][1] = '';
			for(j in junction) {
				if(aData[i] == junction[j][0]) {
					jTable[i][1] = junction[j][1];
				//	console.warn("1168: junction["+j+"][0]: " + junction[j][0]);
				//	console.warn("1168: junction["+j+"][1]: " + junction[j][1]);
				}
			}
		}
		var tData = "";
		for(k in jTable) {
			tData += "\t<tr>\n\t<td>" + jTable[k][0] + "</td><td>" + jTable[k][1] + "</td></tr>\n";
		}
		$("#rawData").css({"display": "block"}).html("<table>\n<tdata>\n" + tData + "</tdata>\n</table>\n");
			
		rawData = "No";
	}
	function hideRawData() {
		$("#rawData").css({"display": "none"});
		rawData = "Yes";
	}
	var rawData = "No";
	$("#data").click(function(){
		if(rawData == "Yes") {
			showRawData();
		}
		else if(rawData == "No") {
			hideRawData();
		}
	});
	hideRawData();

})

