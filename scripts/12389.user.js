// ==UserScript==
// @name			Travian UnitCounter v0.8
// @author		  mikrop
// @include 		http://s*.travian.*/a2b.php
// @include 		http://s*.travian.*/a2b.php?z=*
// @include 		http://s*.travian.*/a2b.php?newdid=*
// @version 		Latest version 0.8
// @description     Souhrnne info o jednotkach ve vesnici	
// ==/UserScript==

//--- Settings ---

	// If true so exists the extension Inf. tab 
	// Scope: true, false
	// example -> var showInfTab = true;	
	var showInfTab = true;

//--- Script optpions ---

	var naRef = { "romans" : [ "legionnaire", "equites-legati", "battering-ram",
							   "senator", "praetorian", 
							   "equites-imperatoris", "fire-catapult", "romans-settler",
							   "imperian", "equites-caesaris", "hero" ],
						   
				  "teutons" : [ "maceman", "scout", "teutons-ram", "teutons-chieftain",
				  			    "spearman", "paladin", "catapult", "teutons-settler",
				  			    "axeman", "teutonic-knight", "hero" ],
							  			   
				  "gauls" : [ "phalanx", "theutates-thunder", "gauls-ram", 
				  			  "chief", "swordsman", "druidrider", 
				  			  "trebuchet", "gauls-settler", "pathfinder", 
				  			  "haeduan", "hero" ]
				};
			
	/**
	 * 0 - Attack
	 * 1 - Infantry defence
	 * 2 - Horse defence
	 * 3 - Nutrition
	 * 4 - Capacity
	 * 5 - Speed // TODO zatim se nevyuziva 
	 */
	var unitValues = { //--- romans ---
					   "legionnaire"         : [40,35,50,1,40,6], 
			           "equites-legati"      : [0,20,10,2,0,16],
			           "battering-ram"       : [60,30,75,3,0,4],
			           "senator"             : [50,40,30,5,0,4],
			           "praetorian"          : [30,65,35,1,20,5],
			           "equites-imperatoris" : [120,65,50,3,100,14],
			           "fire-catapult"       : [75,60,10,6,0,3],
			           "romans-settler"      : [0,80,80,1,3000,5],
			           "imperian"            : [70,40,25,1,50,7],
			           "equites-caesaris"    : [180,80,105,4,70,10],
			           //--- teutons ---
			           "maceman"           : [40,20,5,1,60,7],
			           "scout"             : [0,10,5,1,0,9],
			           "teutons-ram"       : [65,30,80,3,0,4],
			           "teutons-chieftain" : [40,60,40,4,0,4],
			           "spearman"          : [10,35,60,1,40,7],
			           "paladin"           : [55,100,40,2,110,10],
			           "catapult"          : [50,60,10,6,0,3],
			           "teutons-settler"   : [10,80,80,1,3000,5],
			           "axeman"            : [60,30,30,1,50,6],
			           "teutonic-knight"   : [150,50,75,3,80,9],
			           //--- gauls ---
			           "phalanx"           : [15,40,50,1,30,7],
			           "theutates-thunder" : [90,25,40,2,75,19],
			           "gauls-ram"         : [50,30,105,75,3,0,4],
			           "chief"             : [40,50,50,4,0,5],
			           "swordsman"         : [65,35,20,1,45,6],
			           "druidrider"        : [45,115,55,2,35,16],
			           "trebuchet"         : [70,45,10,6,0,3],
			           "gauls-settler"     : [0,80,80,1,3000,5],
			           "pathfinder"        : [0,20,10,2,0,17],
			           "haeduan"           : [140,50,165,3,65,13],
			           //--- all heros ---
			           "hero" : [0,0,0,6,0,0]
			         }; 

//----------------

 var imgpack = document.createElement("img");
	 imgpack.title = " img pack ... ";
	 imgpack.style.verticalAlign = "bottom";
	 imgpack.src = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/"+
 			   	   "Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6"+
 			   	   "RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPT"+
 			   	   "qzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfO"+
 			          "zOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGT"+
 			   	   "Oy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq"+
 			   	   "1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOS"+
 			   	   "qPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLN"+
 			   	   "yeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKp"+
 			   	   "NSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAA"+
 			   	   "ACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgt"+
 			   	   "tjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUk"+
 			   	   "JfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgI"+
 			   	   "DRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGE"+
 			   	   "FStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR"+
 			   	   "5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSoj"+
 			   	   "Bo5KxRtCgQADs=";
 			   	   
 var imgatt = document.createElement("img");
	 imgatt.title = " img attack ... ";
	 imgatt.style.verticalAlign = "bottom";
	 imgatt.src = "img/un/a/att_all.gif";

 var imgdefi = document.createElement("img");
	 imgdefi.title = " imgn defence ifantry ... ";
	 imgdefi.style.verticalAlign = "bottom";
	 imgdefi.src = "img/un/a/def_i.gif";

 var imgdefh = document.createElement("img");
	 imgdefh.title = " imgn defence horse ... ";
	 imgdefh.style.verticalAlign = "bottom";
	 imgdefh.src = "img/un/a/def_c.gif";
	 		   		
 var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
 var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
 
 // TODO schazi obrazek vyzivy (obr4.)
 var refImages = new Array(imgatt, imgdefi, imgdefh, imgpack, imgpack); 

/**
 * find
 * @param {type} xpath, {type} xpres
 */
 function find(xpath, xpres) {

  	var ret = document.evaluate(xpath, document, null, xpres, null);
	return (xpres) == XPFirst ? ret.singleNodeValue : ret;
  
 }

/**
 * getNation
 */
 function getNation() {

	var img = find("//*[@id='21']", XPFirst);
	var imgSrc = img.src;
	var imgNumber = parseInt(imgSrc.substr(imgSrc.indexOf('0.gif') - 1, 2));

	switch (imgNumber) {
		case 10: return 'romans';
		case 20: return 'teutons';
		case 30: return 'gauls';
		/*
		case 40: return;
		case 50: return;
		case 60: return;
		*/
		default: alert('New nation?!'); return;
	}

 }

/**
 * createInfTab
 */
 function createInfTab() {
 	
 	if (showInfTab) {

	 	var sampleXp = "//div[@id='lmid2']/table[1]";
		var sibTab = find(sampleXp, XPFirst);
		
			if (sibTab) {
			
				var elTab = window.document.createElement("table");
					elTab.setAttribute("class", "tbg");
					elTab.setAttribute("cellspacing", "1");
					elTab.setAttribute("cellpadding", "1");
					elTab.style.width = "100%";
									
				var elTdTit = window.document.createElement("td");
					elTdTit.setAttribute("colspan", "5");
					elTdTit.setAttribute("class", "rbg");
					elTdTit.textContent = "Inf. tab";
	
				var elTr1 = window.document.createElement("tr");
					elTr1.appendChild(elTdTit);
					
				var elTdAtt = window.document.createElement("td");
					elTdAtt.setAttribute("colspan", "3");
					elTdAtt.style.width = "60%";	
					elTdAtt.textContent = "Attack ";
					elTdAtt.appendChild(imgatt);
					elTdAtt.appendChild(imgdefi);
					elTdAtt.appendChild(imgdefh);	
					
				var elTdNut = window.document.createElement("td");
					elTdNut.style.width = "20%";
					elTdNut.textContent = "Nutrition";	
	
				var elTdCap = window.document.createElement("td");
					elTdCap.style.width = "60%";
					elTdCap.textContent = "Capacity ";
					elTdCap.appendChild(imgpack);
	
				var elTr2 = window.document.createElement("tr");
					elTr2.appendChild(elTdAtt);					
					elTr2.appendChild(elTdNut);				
					elTr2.appendChild(elTdCap);
					
					elTab.appendChild(elTr1);
					elTab.appendChild(elTr2);
	
				var elTr = window.document.createElement("tr");
				var elTd = new Array();
				
					for(var i=0; i<=4; i++) {
					
						elTd[i] = window.document.createElement("td");
						elTd[i].style.textAlign = "right";
						elTd[i].textContent = "0 ";
						elTd[i].appendChild(refImages[i]);
						
						elTr.appendChild(elTd[i]);
							
					}
				
				elTab.appendChild(elTr);
		
			}
	
		var elP = window.document.createElement("p");
		
		sibTab.parentNode.insertBefore(elP, sibTab.nextSibling);
		elP.parentNode.insertBefore(elTab, elP.nextSibling);
	 	
 	}
	 	
 }

/**
 * getAccessibleUnits
 * @param {type} acId 
 */
 function getAccessibleUnits(acId) {

	var ac = document.getElementById(acId);
	var acUnits = ac.textContent.match(/\((\d+)\)/);
	return (acUnits[1]);
 	
 }

/**
 * setIMaxUnits
 * @param {type} iId, {type} accessibleUnits 
 */
 function setIMaxUnits(iId, accessibleUnits) {

 	var iMaxUnits = document.getElementById(iId);

		/** 
		 * Kontrola zda attribut jiz existuje
		 * Neexistuje pokud nebylo vlozeno maximum jednotek odkazem
		 */ 
		if (iMaxUnits.getAttribute("acunits") == null) { 
			iMaxUnits.setAttribute("acunits", accessibleUnits)
		} 
		
 }

/**
 * outcome
 * @param {type} maxUnits, {type} sUnits 
 */
 function outcome(sUnits, maxUnits) {
 	
	var check = (sUnits != "") ? (maxUnits - parseInt(sUnits)) : maxUnits;
 	var out = (check < 1) ? 0 : check;
 	return (out);	
 	
 }

/**
 * totalInf
 * @param {type} inputs, {type} detail 
 */
 function createTotalInf(inputs, detail) {
 	
 	var out = 0;
 	var val;
 	var nation = getNation();
 	var unit;

	for(var i=0; i<inputs.snapshotLength; i++) {

		val = inputs.snapshotItem(i).value;
		unit = naRef[nation][i];
		out += (val != "") ? ((parseInt(val) * unitValues[unit][detail])) : 0;
				
	}

	return (out);
 	
 }

/**
 * setTotalInf
 */
 function setTotalInf() {

	if (showInfTab) {
 	 	var sampleDiv = "//div[@id='lmid2']";
		var inputs = find(sampleDiv + "/table[1]/tbody/tr/td/table/tbody//input", XPList);
		var sampleTr = sampleDiv + "/table[2]/tr[3]";
		var pow;
							
			for(var j=0; j<5; j++) {
								
				pow = find(sampleTr + "/td[" +(j+1)+ "]", XPFirst);
				pow.textContent = createTotalInf(inputs, j) + " ";
				pow.appendChild(refImages[j]);
								
			}
 	}
 	
 }

 (function() {

	// Vytvoreni info table
	createInfTab();

	var sampleXp = "/html/body/div[2]/div/div[2]/div/table/tbody/tr/td/table/tbody/tr/td";
	var parTd = find(sampleXp, XPList); 
	 
	for (var i=0; i<parTd.snapshotLength; i++) {
		
		var fChild = parTd.snapshotItem(i).firstChild;
		
		if (fChild) {
			
			fChild.setAttribute("id", i);
			
			if (fChild.nodeName.toLowerCase() == "input") {
	 
				fChild.addEventListener("focus", function(event) {

					var el = event.target;
					var accessibleUnits = getAccessibleUnits(parseInt(el.id) + 1);

						setIMaxUnits(el.id, accessibleUnits);

				}, false);
				
				fChild.addEventListener("keyup", function(event) {
					
					var el = event.target;
					var units = document.getElementById(el.id);
					var acUnits = units.getAttribute("acunits");

						var out = outcome(units.value, acUnits);		
							
						// Nemohu poslat vic nez mam
						if (out < 1) {
							units.value = acUnits;	
						}

						// Naplneni inf. table
						setTotalInf();

						var newAccessibleUnits = document.getElementById(parseInt(el.id) + 1);
							newAccessibleUnits.textContent = "(" +out+ ")";
	
				}, false);				
				
			}
		
			// Udalost kliknuti na odkaz, odeslani maxima jednotek
			if (fChild.nodeName.toLowerCase() == "a") {
				
				fChild.addEventListener("click", function(event) {

					var el = event.target;
					var accessibleUnits = getAccessibleUnits(el.id);
					
						setIMaxUnits(parseInt(el.id) - 1, accessibleUnits);
					
						// Naplneni inf. table
						setTotalInf();
					
					var aMaxUnits = document.getElementById(el.id);
						aMaxUnits.textContent = "(0)";
				
				}, false);
				
			}					
			
			// Disabluje elementy input, pro ktere nejsou dostupne zadne jednotky			
			if (fChild.nodeName.toLowerCase() == "b") {
			
				var diInp = document.getElementById(i - 1);
					diInp.setAttribute("disabled", "disabled");
			
			}
			 
		} 
	}

 })();
 

 /** History roudmap **
  * 0.8 - Automaticky zjistovana narodnost
  * 0.7 - Moznost volby zobrazit Inf. tab
  * 0.6 - Odstranen bug v naRef, mapovani jednotek na unitValues
  * 0.5 - Info o utocne sile, obranne, potrebne vyzive, nosnosti odesilanych jednotek
  * 0.4 - Info kolik zustane ve vesnici
  */