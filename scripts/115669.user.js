// ==UserScript==
// @name           Spy_Interpreter with AE
// @author         D.O.A. aka Planet_Jeroen
// @version        0.9.20
// @description    Enhances your TW scout report with additional info
// @namespace      TW Scout Enhancer
// @include        http://*.tribalwars.*/game.php?*screen=report*view=*
// @require 	   http://sizzlemctwizzle.com/updater.php?id=89112&days=1
// ==/UserScript==

/*
Adapted to tribalwars.ae by Samuel Essig (http://c1b1.de)
Arabic translation by Mohammed Abusinena

Original Script by Planet_Jeroen:
http://userscripts.org/scripts/show/89112

*/


/**
		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program.  If not, see <http://www.gnu.org/licenses/>
		
		
		Features:

		= free farm places after substracting places used by buildings
		= (Storage space - hide space) = max robable amount
		= resource times to fill max robable amount
		= resource times to fill hide
		= resource hour production
		= auto language select or notification with 'fill-in-the-blanks' list
		= time since last activity based on storage levels / 'unknown' when
		  full / 'active' when empty / just farmed when all 0
		= time it would take to produce enough resource to create a full load
		  for current troops
		= time it took to produce current loot
		= partial graphical layout
		= checks for updates
		= should work on English worlds now too (not yet tested)
		

		Future features:

		+ defender OD attack score will be shown
		+ amount of each unit needed to carry max robabale amount
		+ unit types defender could have researched based on building levels
		+ total building points during scout

		
		Drop suggestions here: http://userscripts.org/scripts/discuss/89112
		Report issues here: http://userscripts.org/scripts/issues/89112

		Both can be done using the TWnl Forum as well:
		http://forum.tribalwars.nl/showthread.php?t=93317


		If you have a translation to offer, please use the same methods ;)


	Changelog:
	
	
	25-05-'11	v0.9.20	+ scouted troops substracted from free farm places
	10-05-'11	v0.9.10	+ complete rewrite
				+ us support added
				- few calculation bugs
	06-11-'10	v0.0.54	+ function wrapper to not mess up Opera user experience
				+ English translation added
	04-11-'10	v0.0.53	+ correct English building names in template
				  script will default to english if it cant work out the language code
				- bug when no hiding place is present
				- bug in processing if the troops can carry loot
				- bug in activity time calculation
	03-11-'10	v0.0.52	+ changed layout to graphical (translation var changed due to this)
				+ auto version check
	02-11-'10	v0.0.5	- bug in max load calculation
				+ time it took to produce current loot
				- bug in activity calculation
	31-10-'10	v0.0.4	+ activity based on resources
				+ next full load for current capacity
				+ capacity overkill notice
	30-10-'10	v0.0.3	+ language autoselect or prompt for translation
	30-10-'10	v0.0.2	+ translatable
				+ cleaned output a little
	29-10-'10	v0.0.1	initial release
*/

(function(){
	
	//translations go here
	var langDB={
		"nl" : { 
			"main":"Hoofdgebouw",
			"barracks":"Kazerne",
			"stable":"Stal",
			"garage":"Werkplaats",
			"church":"Kerk",
			"church_f":"Eerste kerk",
			"snob":"Adelshoeve",
			"smith":"Smederij",
			"place":"Verzamelplaats",
			"statue":"Standbeeld",
			"market":"Marktplaats",
			"wood":"Houthakkers",
			"clay":"Leemgroeve",
			"iron":"IJzermijn",
			"farm":"Boerderij",
			"storage":"Opslagplaats",
			"hide":"Schuilplaats",
			"wall":"Muur",
			"spy":"Spionage",
			"popinfo":"Bevolkings gegevens",
			"farmhas":"Max. plaatsen",
			"bldinfo":"In gebruik voor gebouwen",
			"trpinfo":"Benodigd voor gescoute troepen",
			"farmfree":"Kunnen max voor troepen in gebruik zijn nu",
			"resinfo":"Grondstof gegevens",
			"hidefull":"Productie tijd:",
			"storagefull":"Totale opslag (xxx) - schuilplaats (yyy) productie tijd:",
			"lastactive":"Laatste activiteit: ",
			"now":"Actief",
			"justleft":"Seconden geleden gefarmed",
			"unknown":"Onbekend; opslag vol",
			"time":" uur geleden/niet helemaal leeg gehaald",
			"nextrun":"Deze troepen, max capaciteit over: ~ xxx uur",
			"overkill":" capaciteit overkill",
			"lootprtime":"Huidige buit is ~ xxx uur productie waard",
			"perhour":"per uur",
			"hour":"uur",
			"loot":"Buit:",
			"speed":"Speelsnelheid"
		},
		
		"en" : {
			"main":"Village Headquarters",
			"barracks":"Barracks",
			"stable":"Stable",
			"garage":"Workshop",
			"church":"Church",
			"church_f":"First church",
			"snob":"Academy",
			"smith":"Smithy",
			"place":"Rally point",
			"statue":"Statue",
			"market":"Market",
			"wood":"Timber camp",
			"clay":"Clay pit",
			"iron":"Iron mine",
			"farm":"Farm",
			"storage":"Warehouse",
			"hide":"Hiding place",
			"wall":"Wall",
			"spy":"Espionage",
			"popinfo":"Population info",
			"farmhas":"Max. places",
			"bldinfo":"Used for buildings",
			"trpinfo":"Needed for scouted troops",
			"farmfree":"Could max be used for troops atm",
			"resinfo":"Resource info",
			"hidefull":"Production time:",
			"storagefull":"Total storage (xxx) - hide (yyy) production time:",
			"lastactive":"Last active: ",
			"now":"Active",
			"justleft":"Farmed seconds ago",
			"unknown":"Unknown; storage full",
			"time":" hour(s) ago/not fully farmed",
			"nextrun":"Same troops, max capacity in: ~ xxx hour(s)",
			"overkill":" capacity overkill",
			"lootprtime":"Current loot is worth ~ xxx hour(s) production",
			"perhour":"per hour",
			"hour":"hour(s)",
			"loot":"Haul:",
			"speed":"Game speed"
		},

		
		"ae" : {

			"main":"المبنى الرئيسي",
			"barracks":"الثكنات",
			"stable":"الاسطبل",
			"garage":"الورشه",
			"church":"Church",
			"church_f":"First church",
			"snob":"الاكاديميه",
			"smith":"الحداد",
			"place":"نقطة التجمع",
			"statue":"النصب التذكاري",
			"market":"السوق",
			"wood":"الخشاب",
			"clay":"حفرة الطمي",
			"iron":"منجم الحديد",
			"farm":"المزارع",
			"storage":"المخازن",
			"hide":"المخابئ",
			"wall":"الحائط",
			"spy":"التجسس",
			"popinfo":"معلومات التعداد السكاني",
			"farmhas":"اقصي تعداد سكاني",
			"bldinfo":"المستعمل للمباني",
			"trpinfo":"محتاجة للكشافة",
			"farmfree":"عدد المزارع المتبقية",
			"resinfo":"معلومات الموارد",
			"hidefull":"وقت الإنتاج:",
			"storagefull":"المخزون الكلي (xxx) - المخفي (yyy) وقت الإنتاج:",
			"lastactive":"آخر نشاط: ",
			"now":"فعال",
			"justleft":"لقد نهب منذ لحظات",
			"unknown":"غير معروف: المخازن ممتلئة",
			"time":" ساعة مضت/ لم ينهب بالكامل",
			"nextrun":"نفس الجيوش, أكبر سعة: ~ xxx ساعة",
			"overkill":" السعة ممتلئة",
			"lootprtime":"الكمية المنهوبة تساوي ~ xxx ساعة إنتاج",
			"perhour":"لكل ساعة",
			"hour":"ساعة",
			"loot":"الغنيمة:",
			"speed":"سرعة اللعبة"		
		},
		"us" : {
			"main":"Village Headquarters",
			"barracks":"Barracks",
			"stable":"Stable",
			"garage":"Workshop",
			"church":"Church",
			"church_f":"First church",
			"snob":"Academy",
			"smith":"Smithy",
			"place":"Rally point",
			"statue":"Statue",
			"market":"Market",
			"wood":"Timber camp",
			"clay":"Clay pit",
			"iron":"Iron mine",
			"farm":"Farm",
			"storage":"Warehouse",
			"hide":"Hiding place",
			"wall":"Wall",
			"spy":"Espionage",
			"popinfo":"Population info",
			"farmhas":"Max. places",
			"bldinfo":"Used for buildings",
			"trpinfo":"Needed for scouted troops",
			"farmfree":"Could max be used for troops atm",
			"resinfo":"Resource info",
			"hidefull":"Production time:",
			"storagefull":"Total storage (xxx) - hide (yyy) production time:",
			"lastactive":"Last active: ",
			"now":"Active",
			"justleft":"Farmed seconds ago",
			"unknown":"Unknown; storage full",
			"time":" hour(s) ago/not fully farmed",
			"nextrun":"Same troops, max capacity in: ~ xxx hour(s)",
			"overkill":" capacity overkill",
			"lootprtime":"Current loot is worth ~ xxx hour(s) production",
			"perhour":"per hour",
			"hour":"hour(s)",
			"loot":"Haul:",
			"speed":"Game speed"
		},
		"templ" : {
			"main":"Village Headquarters",
			"barracks":"Barracks",
			"stable":"Stable",
			"garage":"Workshop",
			"church":"Church",
			"church_f":"First church",
			"snob":"Academy",
			"smith":"Smithy",
			"place":"Rally point",
			"statue":"Statue",
			"market":"Market",
			"wood":"Timber camp",
			"clay":"Clay pit",
			"iron":"Iron mine",
			"farm":"Farm",
			"storage":"Warehouse",
			"hide":"Hiding place",
			"wall":"Wall",
			"spy":"Espionage (must be set to header above Spy part of report)",
			"popinfo":"Population info",
			"farmhas":"Max. places",
			"bldinfo":"Used for buildings",
			"trpinfo":"Needed for scouted troops",
			"farmfree":"Could max be used for troops atm",
			"resinfo":"Resource info",
			"hidefull":"Production time:",
			"storagefull":"Total storage (xxx) - hide (yyy) production time:",
			"lastactive":"Last active: ",
			"now":"Active",
			"justleft":"Farmed seconds ago",
			"unknown":"Unknown; storage full",
			"time":" hour(s) ago/not fully farmed",
			"nextrun":"Same troops, max capacity in: ~ xxx hour(s)",
			"overkill":" capacity overkill",
			"lootprtime":"Current loot is worth ~ xxx hour(s) production",
			"perhour":"per hour",
			"hour":"hour(s)",
			"loot":"Haul: (must be set to how it appears on report)",
			"speed":"Game speed (must be the textlabel on the settings page next to the world speed)"
		}
	};
	
	var loadXMLDoc = function (myUrl) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {processSettings(req)};
		req.open("GET", myUrl, true);
		req.send(null);
	};
	
 	var findByInner = function (obj,value) {
		var len = obj.getElementsByTagName('*').length;
		var list = new Object();
		var  a = 0;
		for(var i = 0; i < len; i++) {
			if(obj.getElementsByTagName('*')[i].firstChild) {
				if(obj.getElementsByTagName('*')[i].firstChild.data) {
					if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
						list[a] = obj.getElementsByTagName('*')[i];
						a++; 
					} 
				}
			} 
		}
		list['length'] = a;
		return list; 
	};

	var getNextElement = function (obj,tname) {
		var tname = tname.toLowerCase();
		var obj = obj.nextSibling;
		while(true) {
			if(!obj)
				return false;
			if(!obj.tagName)
				obj = obj.nextSibling;
			else if(obj.tagName.toLowerCase() == tname)
				return obj;
			else
				obj = obj.nextSibling;
		}
		return list; 
	};

	var grabText = function (node , maxDepth) {
		if ( 3 == node . nodeType ){
			return node . nodeValue ;
		}
		else if( ( 1 == node . nodeType ) && ( 0 < maxDepth )){
			var result = '' ;
			for(var i = 0 ;i < node . childNodes . length ;i ++){
				result += grabText(node . childNodes [ i ] , maxDepth - 1) ;
			}
			return result ;
		}
		return '';
	};

	var trim = function (value) {
		value = value.replace(/^\s+/,'');
		value = value.replace(/\s+$/,'');
		return value;
	}
	
	var processSettings = function(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
			
				var reqTxt = req.responseText;
				var searchVal, startPos, tempStr;
				
				searchVal = "<td width=\"50%\">" + langDB[lang]["speed"] + "<\/td>";
				startPos = reqTxt.search(searchVal);
				tempStr = reqTxt.slice(startPos);
				tempStr = tempStr.substring(0,tempStr.search(/<\/tr>/i));
				tempStr = tempStr.split("<td width=\"50%\">");
				tempStr = tempStr[2].split("<\/td>");
				speed = tempStr[0];				
				
				// call function to process and print data
				processOutput();
				
			} else {
				myInfo("There was a problem retrieving the XML data:\n" + req.statusText);
			}
		}
	};
	
	var processOutput = function() {
	

		//alert(JSON.stringify(buildingArr).split(',').join(',\n').split('}').join(',\n'));
		
		
		for(var i = 11 ; i < 14 ; i++){
			buildingArr[i][4] = parseFloat(speed) * prodVal[buildingArr[i][2]]
		}
		
		
		var freePlaces, maxRob, storageFullIron, storageFullWood, storageFullRock, storageFullIron2;
		var storageFullWood2, storageFullRock2, lastActive, LastActiveTime, nextRun, overKill, lootPrTime;
		var tempVal;
		
		// calculate the values ... doh ...
		freePlaces = buildingArr[14][4];
		
		maxRob = buildingArr[15][4] - buildingArr[16][4];
		
		storageFullWood2 = Math.round(buildingArr[16][4] / buildingArr[11][4] * 10)/10;
		storageFullRock2 = Math.round(buildingArr[16][4] / buildingArr[12][4] * 10)/10;
		storageFullIron2 = Math.round(buildingArr[16][4] / buildingArr[13][4] * 10)/10;
		storageFullWood = Math.round(maxRob / buildingArr[11][4] * 10)/10;
		storageFullRock = Math.round(maxRob / buildingArr[12][4] * 10)/10;
		storageFullIron = Math.round(maxRob / buildingArr[13][4] * 10)/10;
		
		if(canCarry != null){
			tempVal = (parseInt(buildingArr[11][4],10) + parseInt(buildingArr[12][4],10) + parseInt(buildingArr[13][4],10));
			if(canCarry[1] > maxRob * 3) { 
				overKill = parseInt(canCarry[1],10) - parseInt(maxRob * 3,10);
				canCarry[1] = maxRob; 
			}
			nextRun = Math.round(canCarry[1] / tempVal * 10)/10;
			lootPrTime = Math.round(canCarry[0] / tempVal *10)/10;
		}
		
		// activity
		lastActiveTime = new Array(3);
		lastActive = langDB[lang]["lastactive"];
		tempVal = "0";
		// fetch the times for each resource 
		// will break or create bugs if the order and/or place in building list changes
		for(var i = 0; i <= lastActiveTime.length - 1; i++) {
			lastActiveTime[i] = Math.round((resRobable[i] / buildingArr[11+i][4]) * 10)/10;
			if(isNaN(lastActiveTime[i])) {
				lastActiveTime[i] = 0;
				resRobable[i] = "e";
			}
		}
		for(i = 0; i <= lastActiveTime.length - 1; i++) {
			// if one resource is empty, he's either farmed, build a hide or is active, so exclude
			if(resRobable[i] == 0 && tempVal != langDB[lang]["now"] + "<br>") {
				tempVal = langDB[lang]["justleft"] + "<br>";
			} else {
				if(resRobable[i] == "e") { tempVal = langDB[lang]["now"] + "<br>"; }
				if(resRobable[i] == maxRob && tempVal != langDB[lang]["now"] + "<br>"){
					tempVal = langDB[lang]["unknown"] + "<br>";
				} else if(tempVal != langDB[lang]["now"] + "<br>" && tempVal != langDB[lang]["unknown"] + "<br>") {
					if(i==0){
						tempVal = lastActiveTime[i] + langDB[lang]["time"] + "<br>";
					} else {
						if(lastActiveTime[i] < lastActiveTime[i-1]){
							tempVal = lastActiveTime[i] + langDB[lang]["time"] + "<br>";
						}
					}
				}
			}
		}
		lastActive += tempVal + "<br>";
		
		// farm places free
		for(i = 0; i <= buildingArr.length - 1; i++) {
			if(buildingArr[i][2] != null) {
				freePlaces = freePlaces - buildingArr[i][3];
			}
		}
		freePlaces = freePlaces - totalTroopCost;
		
		// print the information
		myInfo("<table><tr><td colspan=4>" + langDB[lang]["popinfo"] + "</td></tr><tr><td width=75><img src=\"/graphic/buildings/farm.png?1\" title=\"" + langDB[lang]["farmhas"] + "\" alt=\"\" /> " + buildingArr[14][4] + " </td><td width=75><img src=\"/graphic/buildings/main.png?1\" title=\"" + langDB[lang]["bldinfo"] + "\" alt=\"\" /> " + (buildingArr[14][4] - freePlaces) + "</td><td width=75><img src=\"/graphic/unit/att.png?1\" title=\"" + langDB[lang]["trpinfo"] + "\" alt=\"\" /> " + totalTroopCost + " </td><td width=75><span class=\"icon header population\" title=\"" + langDB[lang]["farmfree"] + "\"> </span> " + freePlaces + " </td></tr></table>");
		myInfo("<br>");
		myInfo("<table><tr><td colspan=3>" + langDB[lang]["resinfo"] + "</td></tr><tr><th width=100></th><th width=100><img src=\"/graphic/buildings/hide.png?1\" title=\"" + langDB[lang]["hidefull"] + "\" alt=\"\" /> " + buildingArr[16][4] + "</th><th width=100><img src=\"/graphic/buildings/storage.png?1\" title=\"" + langDB[lang]["storagefull"].replace("xxx", buildingArr[15][4]).replace("yyy", buildingArr[16][4]) + "\" alt=\"\" /> " + maxRob + "</th></tr><tr><td><img src=\"/graphic/buildings/wood.png?1\" title=\"" + langDB[lang]["perhour"] + "\" alt=\"\" />  " + buildingArr[11][4] + "</td><td>" + storageFullWood2 + " " + langDB[lang]["hour"] + "</td><td>" + storageFullWood + " " + langDB[lang]["hour"] + "</td></tr><tr><td><img src=\"/graphic/buildings/stone.png?1\" title=\"" + langDB[lang]["perhour"] + "\" alt=\"\" /> " + buildingArr[12][4] + "</td><td>" + storageFullRock2 + " " + langDB[lang]["hour"] + "</td><td>" + storageFullRock + " " + langDB[lang]["hour"] + "</td></tr><tr><td><img src=\"/graphic/buildings/iron.png?1\" title=\"" + langDB[lang]["perhour"] + "\" alt=\"\" /> " + buildingArr[13][4] + "</td><td>" + storageFullIron2 + " " + langDB[lang]["hour"] + "</td><td>" + storageFullIron + " " + langDB[lang]["hour"] + "</td></tr></table>");
		
		if(canCarry != null){
			myInfo("<br>" + langDB[lang]["nextrun"].replace("xxx",nextRun) + "<br>");
			if(canCarry[1] == maxRob){
				myInfo(overKill.toString() + langDB[lang]["overkill"] + "<br>");
			}
			myInfo("<br>" + langDB[lang]["lootprtime"].replace("xxx",lootPrTime) + "<br>");
		}
		myInfo("<br>" + lastActive + "<br>");
		
		//end of script
		//end of script
		//end of script
		//end of script
		//end of script
		//end of script
		//end of script
	}
		
	// crapload of building definitions and how much population they cost, unless specified otherwise
	var buildingList = {
		"main" : {
			1:5,
			2:6,
			3:7,
			4:8,
			5:9,
			6:11,
			7:13,
			8:15,
			9:18,
			10:21,
			11:24,
			12:28,
			13:33,
			14:38,
			15:45,
			16:53,
			17:62,
			18:72,
			19:84,
			20:99,
			21:116,
			22:135,
			23:158,
			24:185,
			25:216,
			26:253,
			27:296,
			28:347,
			29:406,
			30:475
		},
		"barracks" : {
			1:7,
			2:8,
			3:10,
			4:11,
			5:13,
			6:15,
			7:18,
			8:21,
			9:25,
			10:29,
			11:34,
			12:39,
			13:46,
			14:54,
			15:63,
			16:74,
			17:86,
			18:101,
			19:118,
			20:138,
			21:162,
			22:189,
			23:221,
			24:259,
			25:303
		},
		"stable" : {
			1:8,
			2:9,
			3:11,
			4:13,
			5:15,
			6:18,
			7:21,
			8:24,
			9:28,
			10:33,
			11:38,
			12:45,
			13:53,
			14:62,
			15:72,
			16:84,
			17:99,
			18:115,
			19:135,
			20:158
		},
		"garage" : {
			1:8,
			2:9,
			3:11,
			4:13,
			5:15,
			6:18,
			7:21,
			8:24,
			9:28,
			10:33,
			11:38,
			12:45,
			13:53,
			14:62,
			15:72
		},
		"church" : {
			1:5000,
			2:7750,
			3:12013
		},
		"church_f" : {
			1:5
		},
		"snob" : {
			1:80,
			2:94,
			3:110
		},
		"smith": {
			1:20,
			2:23,
			3:27,
			4:32,
			5:37,
			6:44,
			7:51,
			8:60,
			9:70,
			10:82,
			11:96,
			12:112,
			13:132,
			14:154,
			15:180,
			16:211,
			17:247,
			18:289,
			19:338,
			20:395
		},
		"place" : {
			1:0
		},
		"statue": {
			1:10
		},
		"market" : {
			1:20,
			2:23,
			3:27,
			4:32,
			5:37,
			6:44,
			7:51,
			8:60,
			9:70,
			10:82,
			11:96,
			12:112,
			13:132,
			14:154,
			15:180,
			16:211,
			17:247,
			18:289,
			19:338,
			20:395,
			21:462,
			22:541,
			23:633,
			24:740,
			25:866
		},
		"wood" : {
			1:5,
			2:6,
			3:7,
			4:8,
			5:9,
			6:10,
			7:12,
			8:14,
			9:16,
			10:18,
			11:21,
			12:24,
			13:28,
			14:33,
			15:38,
			16:43,
			17:50,
			18:58,
			19:67,
			20:77,
			21:89,
			22:103,
			23:119,
			24:138,
			25:159,
			26:183,
			27:212,
			28:245,
			29:283,
			30:326
		},
		"clay" : {
			1:10,
			2:11,
			3:13,
			4:15,
			5:17,
			6:19,
			7:22,
			8:25,
			9:29,
			10:33,
			11:37,
			12:42,
			13:48,
			14:55,
			15:63,
			16:71,
			17:81,
			18:93,
			19:106,
			20:121,
			21:137,
			22:157,
			23:179,
			24:204,
			25:232,
			26:265,
			27:302,
			28:344,
			29:392,
			30:447
		},
		"iron" : {
			1:10,
			2:12,
			3:14,
			4:16,
			5:19,
			6:22,
			7:26,
			8:30,
			9:35,
			10:41,
			11:48,
			12:56,
			13:66,
			14:77,
			15:90,
			16:105,
			17:123,
			18:144,
			19:169,
			20:197,
			21:231,
			22:270,
			23:316,
			24:370,
			25:433,
			26:507,
			27:593,
			28:693,
			29:811,
			30:949
		},
		"farm" : {	//population slots
			1:240,
			2:281,
			3:329,
			4:386,
			5:452,
			6:530,
			7:622,
			8:729,
			9:854,
			10:1002,
			11:1174,
			12:1376,
			13:1613,
			14:1891,
			15:2216,
			16:2598,
			17:3045,
			18:3569,
			19:4183,
			20:4909,
			21:5748,
			22:6737,
			23:7896,
			24:9255,
			25:10848,
			26:12715,
			27:14904,
			28:17469,
			29:20476,
			30:24000
		},
		"storage" : {	//capacity
			1:1000,
			2:1229,
			3:1512,
			4:1859,
			5:2285,
			6:2810,
			7:3454,
			8:4247,
			9:5222,
			10:6420,
			11:7893,
			12:9705,
			13:11932,
			14:14670,
			15:18037,
			16:22177,
			17:27266,
			18:33523,
			19:41217,
			20:50675,
			21:62305,
			22:76604,
			23:94184,
			24:115798,
			25:142373,
			26:175047,
			27:215219,
			28:264611,
			29:325337,
			30:400000
		},
		"hide" : {
			1:2,
			2:2,
			3:3,
			4:3,
			5:4,
			6:4,
			7:5,
			8:6,
			9:7,
			10:8
		},
		"wall" : {
			1:5,
			2:6,
			3:7,
			4:8,
			5:9,
			6:11,
			7:13,
			8:15,
			9:18,
			10:21,
			11:24,
			12:28,
			13:33,
			14:38,
			15:45,
			16:53,
			17:62,
			18:72,
			19:84,
			20:99
		},
		"hidecap" : {
			1:150,
			2:200,
			3:267,
			4:356,
			5:474,
			6:632,
			7:843,
			8:1125,
			9:1500,
			10:2000
		}
	};
	
	// troop population cost/haul capacity
	var troopCostCarry ={
		"spear" : {
			"cost" : 1,
			"carry" : 25
		},
		"sword" : {
			"cost" : 1,
			"carry" : 10
		},
		"axe" : {
			"cost" : 1,
			"carry" : 10
		},
		"archer" : {
			"cost" : 1,
			"carry" : 10
		},
		"spy" : {
			"cost" : 2,
			"carry" : 0
		},
		"light" : {
			"cost" : 4,
			"carry" : 80
		},
		"marcher" : {
			"cost" : 5,
			"carry" : 50
		},
		"heavy" : {
			"cost" : 6,
			"carry" : 50
		},
		"ram" : {
			"cost" : 5,
			"carry" : 0
		},
		"catapult" : {
			"cost" : 5,
			"carry" : 0
		},
		"knight" : {
			"cost" : 10,
			"carry" : 100
		},
		"snob" : {
			"cost" : 100,
			"carry" : 0
		}
	}
	
	// resource production amount/hour @ speed 1
	var prodVal = {
		1:30,
		2:35,
		3:41,
		4:47,
		5:55,
		6:64,
		7:74,
		8:86,
		9:100,
		10:117,
		11:136,
		12:158,
		13:184,
		14:214,
		15:249,
		16:289,
		17:337,
		18:391,
		19:455,
		20:530,
		21:616,
		22:717,
		23:833,
		24:969,
		25:1127,
		26:1311,
		27:1525,
		28:1774,
		29:2063,
		30:2400
	};
	
	// create a DIV to paste our text in
	var infoDiv;
	var addInfoDiv = function (){
		infoDiv = document.createElement('div');
		infoDiv.style.margin = "2em 0em 0em";
		var sExpr = "//table[@id=\"attack_results\"]";
		var xpath = document.evaluate(sExpr, document, null, XPathResult.ANY_TYPE, null);
		var item = xpath.iterateNext();
		item = item.parentNode;
		item.appendChild(infoDiv);
	};
	
	// used to add information to our info DIV
	var myInfo = function (textInfo){
		infoDiv.innerHTML += textInfo;
	};
	
	var isInt = function (x) {
		var y=parseInt(x,10);
		if (isNaN(y)) return false;
		return true;
	};
	
	// actualy add the div to the page
	addInfoDiv();
	
	// determine the used language and if it's supported or not
	var lang="templ";
	var tempLang = document.URL.slice(7,document.URL.search(/tribalwars/i)-1);

	for(var i = 0 ; i < tempLang.length ; i++) {
		if(isInt(tempLang.slice(i, i + 1))) {
			tempLang = tempLang.slice(0, i);
			break;
		}
	}
	if(langDB[tempLang]) {
		lang = tempLang;
	}

	if(lang == "templ"){
		myInfo("Translate the following list to your game versions language<br>");
		myInfo("Send it to me through the options mentioned at the following url:<br>");
		myInfo("<a href=http://userscripts.org/scripts/show/89112>http://userscripts.org/scripts/show/89112</a><br><br><br>");
		myInfo("ONLY TRANSLATE THE STUFF TO THE RIGHT OF THE \':\' !!!<br><br><br>");
		for(var i in langDB[lang]){
			myInfo("\"" + i + "\:\"" + langDB[lang][i] + "\"<br>");
		}
		myInfo("<br><br>Thank you!<br>");
	}
	
	// extract needed scout info
	// opnieuw doen, zonder wazige dom functies
	
	// buildings & level
	var spying = findByInner(document,langDB[lang]["spy"]);
	var table = document.getElementById('attack_spy');
	var buildingStr = trim(grabText(table.getElementsByTagName('tr')[1].firstChild.nextSibling,2));
	var buildingArr = new Array(18);
	for(var i = 0 ; i < buildingArr.length ; i++) {
		buildingArr[i] = new Array(5);
	}

	var counter = 0;
	var end = false;
	for(var i in langDB[lang]) {
		if(end == false){
			if(i=="wall"){
				buildingArr[counter][0] = i;
				buildingArr[counter][1] = langDB[lang][i];
				end = true
			} else {
				buildingArr[counter][0] = i;
				buildingArr[counter][1] = langDB[lang][i];
				counter ++;
			}
		}
	}
	
	for(var i=0; i < buildingArr.length; i++){
		if(buildingStr.search(buildingArr[i][1]) != -1){
			buildingArr[i][2]=buildingStr.slice(buildingStr.search(buildingArr[i][1]));
			buildingArr[i][2]=buildingArr[i][2].substring(buildingArr[i][2].search(/level/i)+6,buildingArr[i][2].search(/\)/i));
			buildingArr[i][2] = parseInt(buildingArr[i][2].match(/(\d+)/)[1]);
		} else {
			buildingArr[i][2]=0;
		}
		
		buildingArr[i][3] = 0;
		buildingArr[i][4] = 0;
		
		switch(i) {
			case 11: case 12: case 13: // wood  rock  iron
				
				if(buildingArr[i][2] != 0) {
					buildingArr[i][3] = buildingList[buildingArr[i][0]][buildingArr[i][2]];
					buildingArr[i][4] = 0; // na XHTML uitrekenen
				}
				break;
				
			case 14: // farm
				
				if(buildingArr[i][2] != 0) {
					buildingArr[i][3] = 0
					buildingArr[i][4] = buildingList[buildingArr[i][0]][buildingArr[i][2]];
				}
				break;
			
			case 15: // storage  
				
				if(buildingArr[i][2] != 0) {
					buildingArr[i][3] = 0;
					buildingArr[i][4] = buildingList[buildingArr[i][0]][buildingArr[i][2]];
				}
				break;
				
			case 16: // hide
			
				if(buildingArr[i][2] != 0) {
					buildingArr[i][3] = buildingList[buildingArr[i][0]][buildingArr[i][2]];
					buildingArr[i][4] = buildingList["hidecap"][buildingArr[i][2]];
				}
				break;
						
			default: // other
				
				if(buildingArr[i][2] != 0) {
					buildingArr[i][3] = buildingList[buildingArr[i][0]][buildingArr[i][2]];
				}
				break;
		}
	}

	// Extract resource amounts and work that stupid decimal dot out
	var resRobable = grabText(table.getElementsByTagName('tr')[0].firstChild.nextSibling,2).split(" ");
	for(var i = 0 ; i < resRobable.length ; i++) {
		if(resRobable[i].indexOf(".") > 0) {
			resRobable[i] = resRobable[i] * 1000;
		}
		if(resRobable[i] == "" || resRobable[i] === null) {
			resRobable[i] = "e";
		}
	}
	

	
	// how much can these troops take ?
	var canCarry;
	table = document.getElementById('attack_spy');
	if(table.innerHTML.indexOf(langDB[lang]["loot"]) !== -1 ){
	  canCarry = grabText(table.getElementsByTagName('td')[0],2).split(" ",3);
	    for(var i = 0 ; i < 3 ; i++) {	
		  if(canCarry[i] && canCarry[i].indexOf(".") !== -1) {
		    canCarry[i] = canCarry[i] * 1000;
			}
		  }
	  }
	
	// troop cost outside village, if scouted
	var troopCostOut = document.getElementById('attack_spy');
	if(troopCostOut.getElementsByTagName('table').length > 0) {
		troopCostOut = troopCostOut.getElementsByTagName('table')[0] //.rows[1]
	} else {
		troopCostOut = null;
	}
	

	
	
	// troop cost in village, if any
	var troopCost = document.getElementById('attack_info_def_units');
	
	var unit, totalTroopCost;
	totalTroopCost = 0;
	for (unit in troopCostCarry){
		for (i=1 ; i < troopCost.rows[0].cells.length ; i++){
			if (troopCost.rows[0].cells[i].innerHTML.search(unit) > 0) {
				totalTroopCost = totalTroopCost + (parseInt(troopCost.rows[1].cells[i].innerHTML) - parseInt(troopCost.rows[2].cells[i].innerHTML)) * parseInt(troopCostCarry[unit]["cost"]);
				//alert(parseInt(troopCostCarry[unit]["cost"]));
			}
		}
		if (troopCostOut != null) {
			for (i=0 ; i < troopCostOut.rows[0].cells.length ; i++){
				if (troopCostOut.rows[0].cells[i].innerHTML.search(unit) > 0) {
					totalTroopCost = totalTroopCost + (parseInt(troopCostOut.rows[1].cells[i].innerHTML) * parseInt(troopCostCarry[unit]["cost"]));
				}
			}
		}
	}

	
	
	// get world speed for resource production calculation and start processing stuff from there
	var speed;
	var url = "/stat.php?mode=settings";
	loadXMLDoc(url);
	// no more code after this point, as it will execute too soon
	// no more code after this point, as it will execute too soon
	// no more code after this point, as it will execute too soon
	// no more code after this point, as it will execute too soon
}());