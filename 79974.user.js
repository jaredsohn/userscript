// ==UserScript==
// @name           TheCrims Plus
// @namespace      http://userscripts.org/scripts/show/31066
// @description    TheCrims Plus is a calculator, for web based game thecrims.com.. Added compability with Google Chrome. <br>To enable, install script, then go to roberies. You have to go to roberies if to calculate your power with your new gun experience.<br> <br> Languages: EN, LT, EL <br> *Showing new guns avialable after robbery.
// @include        *.thecrims.com/*
// ==/UserScript==


/* ***** BEGIN LICENSE BLOCK *****
 * TheCrims Plus - Your game assistent
 *   Version: 0.5 beta
 *
 *
 * ***** END LICENSE BLOCK ***** */

// Languages

// English
var lang_gb = new Array();

// Drugs	
lang_gb['painkillers']  	= 'Painkillers';
lang_gb['weed'] 		= 'Weed';
lang_gb['booze'] 		= 'Booze';
lang_gb['magic mushrooms']	= 'Magic mushrooms'; 
lang_gb['lsd']			= 'LSD'; 	
lang_gb['hash'] 		= 'Hash';
lang_gb['ghb'] 			= 'GHB';
lang_gb['ecstacy'] 		= 'Ecstacy';
lang_gb['opium']		= 'Opium'; 
lang_gb['amphetamine'] 		= 'Amphetamine';
lang_gb['special k']		= 'Special k'; 
lang_gb['morphine']		= 'Morphine'; 
lang_gb['cocaine']		= 'Cocaine'; 
lang_gb['heroin']		= 'Heroin'; 

// Armor
lang_gb['Diaper']			= 'Diaper';
lang_gb['Leather Jacket']		= 'Leather jacket';	
lang_gb['Shining body armor']		= 'Shining body armor';	
lang_gb['Body armor']			= 'Body armor';	
lang_gb['Nano Fiber Combat Jacket']	= 'Nano fiber combat jacket'; 	
lang_gb['Nomex plated armor']		= 'Nomex plated armor';

// Strings used by the script
lang_gb['SOLO SAFE']	= 'SOLO SAFE';
lang_gb['NORMAL']	= 'NORMAL';
lang_gb['COLORS'] 	= "<br/><br/><a style='color:#AE0600;'>Red: to hard </a> <Br/><a style='color:#B05902;'>(DarkOrage): Enough power for danger</a><Br/><a style='color:#E99400;'>Orange: Enough power for risky</a><Br/><a style='color:yellow;'>Yellow: Enough power for normal</a><br/><a style='color:#53FF47;'>Green: Enough power for safe</a><br/><a style='font-weight:bold;color:#FFFFFF;'>Bold:Enough stamina</a><br/><a style='font-style: italic;color:#6F6F6E;'>Grey: Enough normal power, not enough stamina.</a>";
lang_gb['canbuy']	= "You can buy ";

// Lithuanian
var lang_lt = new Array();

// Drugs	
lang_lt['painkillers']  	= 'Nuskausminamieji';
lang_lt['weed'] 		= 'Žolė';
lang_lt['booze'] 		= 'Gėralas';
lang_lt['magic mushrooms']	= 'Magiški grybai'; 
lang_lt['lsd']			= 'LSD'; 	
lang_lt['hash'] 		= 'Hašas';
lang_lt['ghb'] 			= 'GHB';
lang_lt['ecstacy'] 		= 'Ecstasy';
lang_lt['opium']		= 'Opijus'; 
lang_lt['amphetamine'] 		= 'Amfa';
lang_lt['special k']		= 'Ypatingasis k'; 
lang_lt['morphine']		= 'Morfijus'; 
lang_lt['cocaine']		= 'Kokainas'; 
lang_lt['heroin']		= 'Heroinas'; 

// Armor
lang_lt['Diaper']			= 'Sauskelnės';
lang_lt['Leather Jacket']		= 'Odinis švarkas';	
lang_lt['Shining body armor']		= 'Blizgantys kūno šarvai';	
lang_lt['Body armor']			= 'Kūno šarvai';	
lang_lt['Nano Fiber Combat Jacket']	= 'Kovinis švarkas'; 	
lang_lt['Nomex plated armor']		= 'Farų apranga';

// Strings used by the script
lang_lt['SOLO SAFE']	= 'SOLO SAUGUS';
lang_lt['NORMAL']	= 'NORMAL';
lang_lt['COLORS'] 	= "<br/><br/><a style='color:#AE0600;'>Raudona: per sunku </a> <Br/><a style='color:#B05902;'>(TamsiaiOranžinė): Užtenka galios sudėtingam</a><Br/><a style='color:#E99400;'>Oranžinė: Užtenka galios rizikingai</a><Br/><a style='color:yellow;'>Geltona: Užtenka galios normaliam</a><br/><a style='color:#53FF47;'>Žalia: Užtenka galios saugiai</a><br/><a style='font-weight:bold;color:#FFFFFF;'>Paryškinta: Užtenka jėgų</a><br/><a style='font-style: italic;color:#6F6F6E;'>Pilkas: Užtenka galios normaliai, neužtenka jėgų.</a>";
lang_lt['canbuy']	= "Tu gali pirkti "


// EL

var lang_el = new Array();

lang_el['weed']			= 'Χόρτο';
lang_el['painkillers']		= 'Παυσίπονα';
lang_el['booze']		= 'Οινόπνευμα';
lang_el['magic mushrooms'] 	= 'Μανιτάρια';
lang_el['hash']			= 'Χασίς';
lang_el['lsd']			= 'LSD';
lang_el['ghb']			= 'GHB';
lang_el['ecstacy']		= 'Ecstacy';
lang_el['opium']		= 'Όπιο';
lang_el['amphetamine']		= 'Αμφεταμίνες';
lang_el['cocaine']		= 'Κοκαΐνη';
lang_el['special k']		= 'Σπέσιαλ Κ';
lang_el['morphine']		= 'Μορφίνη';
lang_el['heroin']		= 'Πρέζα';


lang_el['Diaper']			= 'Πάνα';
lang_el['Leather Jacket']		= 'Πέτσινο μπουφάν';
lang_el['Shining body armor']		= 'Πανοπλία αρχαίου Έλληνα';
lang_el['Body armor']			= 'Αλεξίσφαιρο γιλέκο';
lang_el['Nano Fiber Combat Jacket']	= 'Μπουφάν μάχης με νανο-ίνες';
lang_el['Nomex plated armor']		= 'Θωράκιση Nomex';
lang_el['COLORS'] 	= "<br/><br/><a style='color:#AE0600;'>Red: to hard </a> <Br/><a style='color:#B05902;'>(DarkOrage): Enough power for danger</a><Br/><a style='color:#E99400;'>Orange: Enough power for risky</a><Br/><a style='color:yellow;'>Yellow: Enough power for normal</a><br/><a style='color:#53FF47;'>Green: Enough power for safe</a><br/><a style='font-weight:bold;color:#FFFFFF;'>Bold:Enough stamina</a><br/><a style='font-style: italic;color:#6F6F6E;'>Grey: Enough normal power, not enough stamina.</a>";
lang_el['canbuy']	= "You can buy ";






// The only way I could find the language was in the cookie
//var tc_lang = document.cookie//.split('tc_lang=')[1].split(';')[0];
var tc_lang = 'LT';

// Set Language
switch(tc_lang){
	
	case 'GB':
		language = lang_gb;
	break;

	case 'EL':
		language = lang_el;
	break;
	
	case 'LT':
		language = lang_lt;
	break;

	default: alert("Your language is'nt supported yet");
}

//Ad for my nightclub
var BomberAd = '<table width="100%" border="0" cellpadding="0"><tbody><tr><td width="50%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="black_table"><tbody><tr class="black_table_top"><td valign="top">LTU Baras</td><td valign="middle" align="right" style="padding-right: 6px"><a href="/nightlife.php?action=add_favourite&amp;business_id=nGRpm2xrk5mXlseXaWhsk2uSa5mSm5ZpbGzClsmZbGrGaJmalQ&amp;type=business"><img src="http://thecrims.cachefly.net/images/icons/add_small.gif" border="0" title="Įtraukti į mylimiausių sąrašą"></a></td></tr><tr><td colspan="2">Price: $10<br></td></tr></tbody></table><br></td><td width="50%" valign="top" style="padding-left: 10px"></td></tr></tbody></table>';
// Guns
var guns_prices = new Array();
guns_prices[0]=0;
// Guns names
var guns_names = new Array();
guns_names[0] = 'Byta';
guns_names[1] = 'Štyra';
guns_names[2] = 'Kardas';
guns_names[3] = 'Drūžba';
guns_names[4] = 'Pistoletas';
guns_names[5] = 'Pompa';
guns_names[6] = 'MP5';
guns_names[7] = 'AK 47';
guns_names[8] = 'Uzikas';
guns_names[9] = 'Koltas M4A1';
guns_names[10] = 'Desert Eagle';
guns_names[11] = 'Optinis šautuvas';
guns_names[12] = 'Spindulinis šautuvas';
guns_names[13] = 'Mašinganas';
guns_names[14] = 'Bazuka';
guns_names[15] = 'Automatas Galil';
guns_names[16] = 'BFG 9000';
guns_names[17] = 'Pikta Mašina';

findGun = function(name) {
	var nr = 0;
	for (i=0; i<18; i++){
		if (guns_names[i].match(name)) nr = i;
		if (name.match(guns_names[i])) nr = i;
	}
	return nr;
}
//CODE FOR CHROME
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
//if (typeof GM_deleteValue == 'undefined') {
GM_addStyle = function(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

GM_deleteValue = function(name) {
	localStorage.removeItem(name);
}

GM_getValue = function(name, defaultValue) {
	var value = localStorage.getItem(name);
	if (!value)
		return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type) {
		case 'b':
			return value == 'true';
		case 'n':
			return Number(value);
		default:
			return value;
	}
}

GM_log = function(message) {
	console.log(message);
}

 GM_registerMenuCommand = function(name, funk) {
//todo
}

GM_setValue = function(name, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(name, value);
}

var Profile = new Profile();

var PageEngine = new PageEngine();

PageEngine.extractStats(language, Profile);



function PageEngine() {
	// Set to true if something doesnt work
	this.debug = false;


	//I love this one
	getElementsByClass = function(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
		tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		if(classElements[0]==null)
		return false;

		return classElements;
	} 
	getElementsByAttribute = function(attr, searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
		tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].getAttribute(attr)) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		if(classElements[0]==null)
		return false;

		return classElements;
	} 

	/**
	* Remove a element, by string or element
	* @input element or id/class
	* @input index of element if class name
	*/
	this.DeleteElement = function(element, index){
		if(typeof element == "string")
			element = document.getElementById(element)? document.getElementById(element) : getElementsByClass(element)[index];
	
		if(element)
			return element.parentNode.removeChild(element);
	}
	
	
	// Used to place new info in content_right
	this.InsertBefore = function(newElement, referenceElement){

		referenceElement.parentNode.insertBefore(newElement, referenceElement);

	}

	this.InsertAfter = function(newElement, referenceElement){

		referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);

	}

	this.extractStats = function(language, profile){
	
		// the box that contains almost all player info
		var content_right = document.getElementById('content_right');
		
		var player_info = getElementsByClass('menuyellowtext', content_right);
		if(player_info){
			var arms_info = document.getElementById("content_right").getElementsByTagName("li");
		
			//Used to not screw up player info while using gm_setValue
			profile.playerName = player_info[0].innerHTML;		

			// Stats
			profile.stamina = parseInt(content_right.getElementsByTagName('td')[3].innerHTML.split('<')[0].split(':')[1]);
			profile.respect = parseInt(player_info[2].innerHTML);
			profile.cash = parseInt(player_info[7].innerHTML.substring(1).replace(/,/g, ''));		
	
		
			// you have to go to armsdealer to get min weapon_damage

			if (document.location.pathname=="/armsdealer.php" && document.location.toString().indexOf('section') == -1){
				GM_setValue(profile.playerName + "minDamage", 0);
				var info = getElementsByClass('nicktext');
				var min_Damage = parseInt(info[0].parentNode.parentNode.getElementsByTagName('td')[2].innerHTML);
				var wpn_name = info[0].parentNode.parentNode.getElementsByTagName('td')[0];
				//guns_prices = GM_getValue(profile.playerName + "guns_prices", [0]).split(',');
				guns_prices[0] = wpn_name.innerHTML;
				GM_setValue(profile.playerName + "guns_prices", guns_prices.toString());
				if(!min_Damage)
				min_Damage=0;
				GM_setValue(profile.playerName + "minDamage", min_Damage);
			}

			// Get the information above
			profile.weaponDamage = GM_getValue(profile.playerName + "minDamage");
			profile.armorNumber = GetArmor(arms_info[3].innerHTML.split('>')[1], language);
		
			// Set error message if < 100
			profile.durability = parseInt(arms_info[2].innerHTML.split(':')[1]);
			profile.gun_name = arms_info[1].innerHTML.split('>')[1];
		
			// Power
			profile.intelligence = parseInt(player_info[3].innerHTML);
			profile.charisma = parseInt(player_info[4].innerHTML);
			profile.strength = parseInt(player_info[5].innerHTML);
			profile.tolerance = parseInt(player_info[6].innerHTML);
		
			if(this.debug){
				alert("Player name: " + profile.playerName + 
					"\nStamina: " + profile.stamina + 
			 		"\nRespect:" + profile.respect + 
			  		"\nCash: " + profile.cash +
			   		"\n\nWeapon information" +
			    		"\nWeapon Damage: " + profile.weaponDamage + 
			    		"\nWeapon Name: " + profile.gun_name + 
			     		"\nArmor Number: " + profile.armorNumber + 
			      		"\nDurability: " + profile.durability +
			       		"\n\nPlayerPower" +
					"\nIntelligence: " + profile.intelligence +
				 	"\nCharisma: " + profile.charisma +
				  	"\nStrength: " + profile.strength +
				   	"\nTolerance: " + profile.tolerance);
			}
		}
	}



	// Armor
	GetArmor = function(armor, language){
		switch(armor.toLowerCase()){
	
			case language['Diaper'].toLowerCase():
				return 1;
	
			case language['Leather Jacket'].toLowerCase():
				return 2;

			case language['Shining body armor'].toLowerCase():
				return 3;

			case language['Body armor'].toLowerCase():
				return 4;

			case language['Nano Fiber Combat Jacket'].toLowerCase():
				return 5;

			case language['Nomex plated armor'].toLowerCase():
				return 6;
		default: return 0;
		}
	}


   	/**
    	* Inserts the NORMAL Power scores into the page.
    	* @input profile The CrimProfile for current id.
    	* Made By tochihut Updated by Pundare
	*/
   	this.insertPowerIntoPage = function(profile) {
		
		var crimsMenuTable=document.getElementById("content_right");
      		

      		// Retreives the tables
      		var menuTableEntries = crimsMenuTable.getElementsByTagName('table');

      		// Calculate Power.
      		profile.calculatePower();


      		// Generate the new row
		if (! menuTableEntries[4]) return null;
      		var trSolo = menuTableEntries[4].insertRow(-1);

      		var tdSolo = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		
		trSolo.appendChild(tdSolo);
      		var divSolo = document.createElement("div");
      		divSolo.textContent = "SoloGalia" + ":";
      		tdSolo.appendChild(divSolo);
      		var spanSolo = document.createElement("span");
      		spanSolo.setAttribute("class","menuyellowtext");
      		spanSolo.textContent=profile.normalSoloPower;
 
   		tdSolo.appendChild(spanSolo);
     
      		trSolo.parentNode.appendChild(tdSolo);
      		return true;
   	}

	this.ChallengeAnyOne = function() {
		
		var oldButton = document.getElementById('content_middle').getElementsByTagName('table')[10].rows[0];
	 
		var newButton = oldButton.cloneNode(true);

		var id = document.location.toString().split('id=')[1];

		newButton.cells[1].innerHTML = "<a href='fightchat.php?action=challenge&victim_id=" + id +"'><img border='0' src='http://thecrims.cachefly.net/images/icons/warning_16x16.png'/></a>";
		newButton.cells[2].innerHTML = "<a href='fightchat.php?action=challenge&victim_id=" + id +"'>Challenge</a>";
			
		this.InsertBefore(newButton ,oldButton);

	}

/* getElementByClass
/**********************/
/*function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}*/
   	/**
    	* Colour the robberies dropdown menu based on stamina and power.
    	*    Red:  	to hard
	*   (DarkOrage) Enough danger, but not enough risky
	*    Orange     Enough risky, but not enough normal
    	*    Yellow:  	Enough normal, but not enough safe power
    	*    Bold:  	Enough stamina
    	*    Italics:  	Enough normal power, not enough stamina.
    	* @input profile The CrimProfile for current id.
    	* Made By tochihut Updated by Pundare
	*/
	this.CheckNewGuns = function(guns_prices, guns_names, Profile, language) {
		if (this.debug) alert("Gun: " + guns_prices[0]);
		if (this.debug) alert("Have money: " + Profile.cash);
		var nr = findGun(guns_prices[0]);
		//var nr = 1;
		if (this.debug) alert("Next gun (" + guns_names[nr+1] + ") costs: " + guns_prices[nr+2]);
		if (guns_prices[nr+2] < Profile.cash) {
			nr++;
			if (this.debug) alert(language['canbuy'] + guns_names[nr]);
			var place = getElementsByClass("infotext")[0].firstChild.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
			place.innerHTML = "<a style='color:#53FF47'>" + language['canbuy'] + guns_names[nr] + "</a><br>" + place.innerHTML;
			guns_prices[0] = guns_names[nr];
		}
	}
	var place = getElementsByClass("infotext")[0].firstChild.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
   	/**
    	* Colour the robberies dropdown menu based on stamina and power.
    	*    Red:  	to hard
	*   (DarkOrage) Enough danger, but not enough risky
	*    Orange     Enough risky, but not enough normal
    	*    Yellow:  	Enough normal, but not enough safe power
    	*    Bold:  	Enough stamina
    	*    Italics:  	Enough normal power, not enough stamina.
    	* @input profile The CrimProfile for current id.
    	* Made By tochihut Updated by Pundare
	*/
	this.colourRobberies = function(language, profile) {
			var place = getElementsByClass("infotext")[0].firstChild.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
			place.innerHTML = place.innerHTML + language['COLORS'];
      		// Locate the select dropdown lists.
      		var selectEntries=document.getElementsByTagName('select');

      		// String prefix for self robs.
      		var idString="id";

      		for (i=0; i < selectEntries.length; i++) {
        		var optionEntries=selectEntries[i].getElementsByTagName('option');
         		var lastDoableOption = null;  // Maximum doable option given difficulty and stamina
         		var lastDoableOptionDifficulty = 0;
         		var maxCapableOption = null;  // Maximum option capable with current difficulty.
         		var maxCapableOptionDifficulty = 0;
         		var safePower = profile.safeSoloPower;
         		var normalPower = profile.normalSoloPower;
			var riskyPower = profile.riskySoloPower;
			var dangerPower = profile.dangerSoloPower;
	
         		// Go through the options
         		for (j=0; j < optionEntries.length; j++) {
            			if (optionEntries[j].getAttribute("value") != "-") {
               				var optionValue = idString + optionEntries[j].getAttribute("value");
               				var optionNodeString = document.getElementById(optionValue).textContent;

               				// Extract Difficulty
               				var optionDifficulty = parseInt(optionNodeString.split(':')[2].split('<')[0]);

               				// Extract Stamina
               				var optionStamina = (idString=="idgang")?30:parseInt(optionNodeString.split(':')[1].split('<')[0]);
               				var style="";
               					if (safePower > optionDifficulty) {
									style+="color:#53FF47;";//green
								}
               					// Colour NORMAL robberies yellow, and UNSAFE robberies red
               					if (safePower < optionDifficulty) {
                  					if (normalPower >= optionDifficulty)
								style+="color:yellow;";
							else
				                  	if (riskyPower >= optionDifficulty)
                     						style+="color:#E99400;";//orange
							
							else
							if (dangerPower >= optionDifficulty)
                     						style+="color:#B05902;";//dark orange

							else
								style+="color:#AE0600;";//red
               					}
               
					// Italicize the jobs for which you do not have enough stamina.
               				if (! style.match("color:AE0600")) {
                  				// Do not bother with unsafe robberies
                  				if (profile.stamina < optionStamina) {
                     					style+="font-style:italic;color:#6F6F6E;";
                  				} else {
                     					style+="font-weight:bold;text-decoration:underline;";
                     					// Check to make sure we have enough safe power.
                     					// Check to see if this is the hardest doable option.
                     					if (normalPower >= optionDifficulty && optionDifficulty > lastDoableOptionDifficulty) {
                       						lastDoableOption = optionEntries[j];
                       						lastDoableOptionDifficulty = optionDifficulty;
                     					}
                  				}
               				}

        	       			// Save maximum option
	               			if (optionDifficulty > maxCapableOptionDifficulty && normalPower >= optionDifficulty) {
                	 			maxCapableOption = optionEntries[j];
               					maxCapableOptionDifficulty = optionDifficulty;
               				}

	               			optionEntries[j].setAttribute("style",style);
        	    		}
         		}
         		// Set the default option for self rob to best rob possible.
         		if (idString == "id" && lastDoableOption) {
            			lastDoableOption.selected = true;
				document.getElementById(idString+lastDoableOption.value).style.display = "block";
         		}
         	
		// Add * to denote most difficult option
         	maxCapableOption.textContent = "*" + maxCapableOption.textContent;
         	idString="idgang"
      		}
	}

	/**
    	* Insert buildings limit to building page.
    	* @input profile The CrimProfile for current id.
	* Made By tochihut Updated by Pundare
    	*/
   	this.insertBuildInfoIntoBuildingPage = function(profile) {

      		// Find the last "black" table on the page.
		var blackTable = getElementsByClass('black_table')[1];

		// Sum up total buildings - found in 2nd table
      		var numBuildings = 0;
      		var myBuildings = blackTable.rows;
      		
		for (i=1; i < myBuildings.length; i++) {
         		// Get the 2nd td entry, which gives current number of buildings
         		var tdInfo = myBuildings[i].cells[1];
         		numBuildings += parseInt(tdInfo.textContent);
      		}

      		// Generate output string
      		var extraBuildings = Math.max(profile.getMaxBuildings() - numBuildings, 0);

      		var outputString1 = "You can support " + extraBuildings + " extra building(s)."
      		var outputString2 = "Need " +
                	profile.getIntTolNecessaryToNextBuilding(numBuildings) +
                	" more intelligence/tolerance to support another building.";

      		// Insert into the page
      		var div = document.createElement("div");
      		div.setAttribute("align","center");

      		var span1 = document.createElement("span");
      		span1.setAttribute("class","menuyellowtext");
      		span1.textContent=outputString1;
      		div.appendChild(span1);
	
      		var br1 = document.createElement("br");
      		div.appendChild(br1);

      		var span2 = document.importNode(span1,false);
      		span2.textContent=outputString2;
      		div.appendChild(span2);

      		blackTable.parentNode.insertBefore(div,blackTable.previousSibling.previousSibling);
		return true;
   	}

   	this.insertEarningsIntoBuildingPage = function(profile) {
		var drugPrices = new Array('weed', 'booze', 'hash', 'booze', 'painkillers', 'magic mushrooms', 'weed', 'morphine', 'lsd', 'ecstacy', 'opium', 'ghb', 'special k', 'cocaine', 'amphetamine', 'heroin');
	      	// Find the first "black" table on the page.
		var blackTable = getElementsByClass('black_table')[0];

		// Sum up total buildings - found in 2nd table
      		var myBuildings = blackTable.rows;
		var earningTop = document.createElement('td');
		earningTop.innerHTML = "Earn/day";
		this.InsertBefore(earningTop, myBuildings[0].cells[4]);
      		
		for (i=1; i < myBuildings.length; i++) {

			//Fix the style
			for(var x=0; x < myBuildings[i].cells.length -1; x++){
				myBuildings[i].cells[x].noWrap = false;
			}
         		// Get the 2nd td entry, which gives current number of buildings
         		var unitsDay = parseInt(myBuildings[i].cells[1].textContent);
			var costDay = parseInt(myBuildings[i].cells[3].textContent.substring(1).replace(/\s/g,''));
         		
			var earningDay = (GM_getValue(drugPrices[i-1]) * unitsDay) - costDay;
			
			var newCell = document.createElement('td');
			newCell.innerHTML = '$' + earningDay.toString();

			this.InsertBefore(newCell, myBuildings[i].cells[4]);
      		}
	}
	
	/**
	* Populate the "Buy" textbox with maximum number of drugs you need and can afford
    	* with current cash - max 99, min 0.
    	* @input profile The CrimProfile for current id.
    	*/
	//// amounts of drugs gaining 100% stamina - http://guide.thecrims.com/wiki/index.php/Rave_Party
	//						% stamina per unit = 100 / units
	// Weed 		= 	99 Units 	1	
	// Painkillers 		= 	99 Units 	1
	// Booze 		= 	50 Units 	2
	// Magic Mushrooms 	= 	50 Units 	2
	// Hash			=			3
	// LSD 			= 	35 Units	3 - rounded	
	// Ecstacy 		= 	25 Units 	4
	// GHB			=			4
	// Opium 		= 	20 Units 	5	
	// Amphetamine 		= 	20 Units 	5
	// special k		=			7
	// Cocaine 		= 	15 Units 	7 - rounded
	// Heroin 		= 	13 Units	8 - rounded
	// Morphine		=			8
	
	GetDrug = function(drug, language, translate){
	
		switch(drug.toLowerCase()){
	
			case language['weed'].toLowerCase():
				if(translate)
					return 'weed';
				return 1;
	
			case language['painkillers'].toLowerCase():
				if(translate)
					return 'painkillers';
				return 1;

			case language['booze'].toLowerCase():
				if(translate)
					return 'booze';
				return 2;

			case language['magic mushrooms'].toLowerCase():
				if(translate)
					return 'magic mushrooms';
				return 2;

			case language['hash'].toLowerCase():
				if(translate)
					return 'hash';
				return 3;

			case language['lsd'].toLowerCase():
				if(translate)
					return 'lsd';
				return 3;

			case language['ecstacy'].toLowerCase():
				if(translate)
					return 'ecstacy';
				return 4;

			case language['ghb'].toLowerCase():
				if(translate)
					return 'ghb';
				return 4;

			case language['opium'].toLowerCase():
				if(translate)
					return 'opium';
				return 5;

			case language['amphetamine'].toLowerCase():
				if(translate)
					return 'amphetamine';
				return 5;

			case language['special k'].toLowerCase():
				if(translate)
					return 'special k';
				return 7;

			case language['cocaine'].toLowerCase():
				if(translate)
					return 'cocaine';					
				return 7;

			case language['heroin'].toLowerCase():
				if(translate)
					return 'heroin';
				return 8;

			case language['morphine'].toLowerCase():
				if(translate)
					return 'morphine';
				return 8;
		}
	}
	this.InsertAd = function(){
		if (getElementsByAttribute("src", "http://thecrims.cachefly.net/images/sections/raveparty/raveparty.jpg"))
		{
			//var place = getElementsByClass("infotext")[1];
			var place = getElementsByClass("infotext")[0].firstChild.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
			//var newnode = document.createElement('a');
			//newnode.innerHTML = BomberAd;
			//place.parentNode.insertBefore(newnode, place);
			place.innerHTML = place.innerHTML + "<br>" + BomberAd;
		}
	}
 
	/***Panic button contains two functions, 
	 * InsertPanicButton and CheckIfPanic
	 *************************************/

	this.InsertPanicButton = function (profile){
		var table = document.getElementById('content_middle').getElementsByTagName('table')[0];
		var imageHtml = '<img src="http://thecrims.cachefly.net/images/sections/raveparty/raveparty.jpg" class="imageborder" border="0">';
		if(table.rows[0].cells[0].innerHTML == imageHtml)
			table.rows[0].cells[0].innerHTML ="<a href='/surgery.php'>"+ table.rows[0].cells[0].innerHTML+"</a>";
	}

	this.CheckIfPanic = function(){
		if(document.referrer.match('/nightlife.php')!=null){
			document.getElementById('avatar').value="2";
			document.getElementsByTagName('form')[0].submit();
			document.location.pathname="/robbery.php";
		}
			
	}
 
	

   	this.populateDrugsValuesAtDealer = function (profile, language) {
		// Find the first "black" table on the page.		
      		var blackTable = getElementsByClass('black_table')[0];

      		var btRows = blackTable.rows;
      		// Go through each stat and calculate how much you can buy.
      		for (i = 1;i < btRows.length; i++) {
         		// Get the td entrys
         		var tdInfo = btRows[i].cells;
						
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
         		var drugsLeft = parseInt(tdInfo[2].textContent);
         		// Number of units you can buy.
			var effort = profile.cash/cost;
			var units;
			if(drugsLeft>effort)
         			units = Math.min(Math.floor( effort ) ,9999999);
			else
				units = Math.min(Math.floor( drugsLeft ) ,9999999);

         		// Get the 3nd input entry is the textbox
         		var inputInfo = tdInfo[3].getElementsByTagName("input");
			
         		inputInfo[4].setAttribute("value",units);

      		}
      		return true;
   	}


   	this.populateBuyDrugsValues = function (profile, language) {
      	
		// Find the first "black" table on the page.		
      		var blackTable = getElementsByClass('black_table')[0];

      		var btRows = blackTable.getElementsByTagName("tr");
      		// Go through each stat and calculate how much you can buy.
      		for (i = 1;i < btRows.length; i++) {
         		// Get the td entrys
         		var tdInfo = btRows[i].getElementsByTagName("td");
			
			var drug = GetDrug(tdInfo[0].textContent.toLowerCase(), language);
			
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
         		// Number of units you can/need to buy.
         		var units = Math.min(Math.floor( (100 - profile.stamina)/drug) ,99);

         		// Get the 3nd input entry is the textbox
         		var inputInfo = tdInfo[2].getElementsByTagName("input");
         		if (inputInfo.length == 5 && inputInfo[3].getAttribute("type") != "text")
            			return false;
			
         		inputInfo[4].setAttribute("value",units);

      		}
      		return true;
   	}

		
	/**
	* Populate the "Buy" textbox with maximum number of stats you can afford
    	* with current cash - max 99, min 0.
    	* @input profile The CrimProfile for current id.
	* Made By tochihut Updated by Pundare
    	*/
   	this.populateBuyStatValues = function (profile) {
      		// Find the last "black" table on the page.
				
      		var blackTable = getElementsByClass('black_table')[0];

      		var btRows = blackTable.getElementsByTagName("tr");
      		// Go through each stat and calculate how much you can buy.
      		for (i = 1;i < btRows.length; i++) {
         		// Get the 3nd td entry, which gives cost of the medicine
         		var tdInfo = btRows[i].getElementsByTagName("td");
         		var cost = parseInt(tdInfo[2].textContent.substring(1).replace(/\s/g,''));
         		// Number of units you can buy.
         		var units = Math.min(Math.floor(profile.cash / cost),99);

         		// Get the 3nd input entry is the textbox
         		var inputInfo = tdInfo[3].getElementsByTagName("input");
         		if (inputInfo.length == 5 && inputInfo[3].getAttribute("type") != "text")
            			return false;
			
			if(i !== 5)
         			inputInfo[4].setAttribute("value",units);
			else
				inputInfo[4].setAttribute("value",1);
      		}
      		return true;
	}

	/**
    	* Insert buildings limit to the hospital page.
    	* @input doc     The current webpage to update.
    	* @input profile The CrimProfile for current id.
	* Made By tochihut Updated by Pundare
    	*/
   	this.insertBuildInfoIntoHospitalPage = function(profile) {
      		// Find the last "black" table on the page.
      		var tables=document.getElementsByTagName("table");
      		for(i=tables.length-1; i >= 0; i--)
        		if (tables[i].getAttribute("class") == "black_table")
	          	 	break;

      		if (i == -1)
         		return false; // did not find the table.

      		var blackTable = tables[i];

      		// Generate output string
      		var outputString = "Need " +
                    profile.getIntTolNecessaryToNextBuilding(0) +
                      " more intelligence/tolerance to increase building limit.";

      		// Insert into the page
      		var div = document.createElement("div");
      		div.setAttribute("align","center");
      		var br = document.createElement("br");
      		var span = document.createElement("span");
      		span.setAttribute("class","menuyellowtext");
      		span.textContent=outputString;
      		div.appendChild(span);
      		blackTable.parentNode.insertBefore(div,blackTable.nextSibling.nextSibling);
      		blackTable.parentNode.insertBefore(br,div);
      		return true;
	}

	
	/**
    	* Insert custom error to the page.
    	* @input text The error text.
    	*/
	this.insertErrorBox = function (text){
		var table = document.createElement("table");
      		table.setAttribute("class","statusbox_error");
		table.setAttribute("width", "100%");
		
		var tr = table.insertRow(0);
		var tdImg = document.createElement('td');
		tr.appendChild(tdImg);

		tdImg.innerHTML = "<img style='margin: 2px 10px 2px 2px;' src='http://static.beta.thecrims.com/images/icons/forbidden.gif'/>";

		var tdMessage = document.createElement('td');
		tdMessage.textContent = text;
		
		tr.appendChild(tdMessage);


		this.InsertBefore(table, document.getElementsByTagName("form")[0]);
	}
	
	this.CheckDurability = function (profile){
		if(profile.durability < 100)
			this.insertErrorBox("Warning your weapon is broken!");

	}
	this.getGunsPrices = function (guns_prices, guns_names){
		var place = getElementsByClass('content_style')[1].lastChild.previousSibling.childNodes[1].childNodes[4];
		innerplace = place.childNodes[11];
		var h = 1;
		guns_prices[h] = innerplace.innerHTML.substring(1);
		guns_names[0]= place.childNodes[1].innerHTML;
      	for(i=1; i < 18; i++)
		{
			place = place.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
			innerplace = place.childNodes[11];
			h=i+1;
			guns_prices[h] = innerplace.innerHTML.substring(1);
			guns_names[i]= place.childNodes[1].innerHTML;
		}
	}
	this.insertCalculator = function (profile, language){
		this.profile = profile;
		// Find the first "black" table on the page. used as a refferens		
      		var blackTable = getElementsByClass('black_table')[0];
		
		
		var table = document.createElement("table");
		
		table.setAttribute("class", "black_table");

      		var trTop = table.insertRow(0);
		trTop.setAttribute("class","black_table_top");
			
		var tdArmorTop = document.createElement("td");
		tdArmorTop.textContent ="Armor";

		trTop.appendChild(tdArmorTop);

		var weaponDamageTop = document.createElement("td");
		weaponDamageTop.textContent = "Weapon Damage";		

		trTop.appendChild(weaponDamageTop);



      		var trContent = table.insertRow(1);

		var tdArmor = document.createElement("td");
		trContent.appendChild(tdArmor);		

      		var select = document.createElement("select");
		select.setAttribute("id", "armor");

		select.options[0]=new Option('[Choose...]',				0, false, false);
		select.options[1]=new Option(language['Diaper'], 			1, false, false);
		select.options[2]=new Option(language['Leather Jacket'], 		2, false, false);
		select.options[3]=new Option(language['Shining body armor'], 		3, false, false);
		select.options[4]=new Option(language['Body armor'], 			4, false, false);
		select.options[5]=new Option(language['Nano Fiber Combat Jacket'], 	5, false, false);
		select.options[6]=new Option(language['Nomex plated armor'], 		6, false, false);
		select.options[profile.armorNumber].selected = true;

   		tdArmor.appendChild(select);
     
      		var tdWeapon = document.createElement("td");

		trContent.appendChild(tdWeapon);

		var Weapon = document.createElement("input");
		Weapon.setAttribute("type", "text");
		Weapon.setAttribute("id", "weapon");
		Weapon.setAttribute("value", profile.weaponDamage);

		tdWeapon.appendChild(Weapon);

		var tdCalc = document.createElement("td");
		trContent.appendChild(tdCalc);

		var calcButton = document.createElement("input");

		calcButton.setAttribute("type", "submit");
		calcButton.setAttribute("value", "Calc");
		calcButton.setAttribute("id", "Calc");

		tdCalc.appendChild(calcButton);

		this.InsertBefore(table, blackTable);
		
	}

	this.getDrugPrices = function (language){

      		// Find the last "black" table on the page.				
      		var blackTable = getElementsByClass('black_table')[0];

      		var btRows = blackTable.getElementsByTagName("tr");
      		// Go through each stat and calculate how much you can buy.
      		for (i = 1;i < btRows.length; i++) {
         		// Get the 3nd td entry, which gives cost of the medicine
         		var tdInfo = btRows[i].cells;
			var drugName = tdInfo[0].textContent.toLowerCase();
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
			GM_setValue(GetDrug(drugName, language, true) ,cost);
			

      		}
      		return true;
		
	}

	/**
    	* Insert Bribe Amount next to the Bribe button on the prison page
    	* @input doc     The current document to update
    	* @input profile The CrimProfile for current id.
    	*/
   	this.insertBribeIntoPrisonPage = function(profile) {
      		// Locate the bribe textbox and set the bribe amount as its value
      		var bribeTextbox = document.getElementById('bribe');
      		if (bribeTextbox != null)
         		bribeTextbox.setAttribute("value",profile.getBribe());

      		return;
   	}


	this.SetUnlimitedOffset = function () {
	
		var currentOffset = parseInt(document.location.toString().split('offset=')[1]);
		var temp = 0;
		var count = 0;
		for( i=0; l=document.links[i]; i++ ){

			if( l.href.match( "offset" ) ){
				offsetLink = parseInt(l.href.split('offset=')[1]);
				if(currentOffset == 180)
					this.DeleteElement(l.parentNode.getElementsByTagName('b')[1]);
				if(currentOffset > 160){	
					if(temp > 0){	// currentOffset / (page number - 1)
						newoffsetText = (currentOffset / 20) + count -1;//+ parseInt(l.innerHTML);
						newoffset = newoffsetText * 20;
						l.href = l.href.replace( offsetLink, newoffset );
						if(newoffset == currentOffset)
							l.innerHTML = "<b style='color: #FFFFFF'>" + newoffsetText + "</b>";
						else
							l.innerHTML = newoffsetText;
						count++;
					}
					temp++;
				}
			}
		}
	}

}

function Profile() {	

	this.playerName = null;
	// Accuracy	-	http://forum.thecrims.com/showthread.php?t=667
	// var accuracy = new Array(8, 4, 6, 4, 5, 4, 6, 6, 3, 5, 8, 10, 6, 5, 7, 7, 4, 6);
	//this.weaponNumber = null;
	this.weaponDamage = 0;
	armorTolerance = new Array(0, 8, 32, 120, 400, 1200, 2000);
	this.armorNumber = 0;
	this.durability = null;
	
	this.gun_nam = "";

	// Stats
	this.respect = 0;
	this.cash = 0;
	this.stamina = 0;
	
	// Power
	this.intelligence = 0;
	this.charisma = 0;
	this.strength = 0;
	this.tolerance = 0;
	
	this.safeSoloPower = -1;
	this.normalSoloPower = -1;
	this.riskySoloPower = -1;
	this.dangerSoloPower = -1;
		

	
	this.calculatePower = function(newWeaponDamage, newArmor) {

		///// your_points	-	http://guide.thecrims.com/wiki/index.php/Arms_Dealer
		//
		// PlayerPower 		=	(intelligence + strength + tolerance/2)/3 
		// WeaponPower		=	(weapon damage * accuracy/10) +- some random parts + armor 
		//
		// Grades by http://www.thecrims.name/index.php?c=calc
		// Safe 		=	85%
		// Normal		=	90%
		// Risky		=	100%
		// Danger		=	102%
		
		var weaponDamage;
		var armor;
		if(newWeaponDamage)
			weaponDamage = newWeaponDamage;
		else
		weaponDamage = this.weaponDamage;
		

		if(newArmor)
		armor = newArmor;
		
		else
		armor = this.armorNumber;

		var playerPower = ( (this.intelligence + this.strength + this.tolerance / 2) / 3);
      		
		var weaponPower = ((10 * weaponDamage) / 10 + armorTolerance[armor]);

		if(newWeaponDamage || newArmor)
			return  Math.round((playerPower + weaponPower) * 0.9 );
   		
		this.safeSoloPower = Math.round((playerPower + weaponPower) * 0.85 );

		this.normalSoloPower = Math.round((playerPower + weaponPower) * 0.9 );
      	
		this.riskySoloPower = Math.round((playerPower + weaponPower) * 1 );

		this.dangerSoloPower = Math.round((playerPower + weaponPower) * 1.02);
		
		//alert("Safe: "+ this.safeSoloPower + "\nnormal: "+ this.normalSoloPower + "\nrisky: " + this.riskySoloPower +"\ndanger: "+ this.dangerSoloPower );
	}


   // Calculate the bribe needed to get out of prison
   this.getBribe = function() {
      		// Formula:   Bribe = Respect * 505.5  - rounded to nearest 1000.
      		return Math.round(this.respect * 0.5055) * 1000;
   	}

   	// Calculate maximum number of buildings current profile can support
	//	Made By tochihut
	this.getMaxBuildings = function() {
      		// Formula:   maxBuildings = floor ( (sqrt (2 * sumIntTol - 1) + 1 ) / 2)
		//    Quadratic solution to threshold = 2 * sumIntTol * (sumIntTol - 1) + 1
		return Math.floor((Math.sqrt(2 * (this.tolerance + this.intelligence) - 1) + 1) / 2);
	}

	/**
	 * Calculate int/tol required to acquire one additional builidng.
    	 * @input myStats The Stats object containing the extracted statistics.
    	 * Made By tochihut
	 */
   	this.getIntTolNecessaryToNextBuilding = function(numCurrentBuildings) {
      		var nextBuilding = Math.max(this.getMaxBuildings(), numCurrentBuildings) + 1;

      		// Formula:   NextThreshold = 2 * sumIntTol * (sumIntTol - 1) + 1
      		return 2 * nextBuilding * ( nextBuilding - 1) + 1 - this.intelligence - this.tolerance;
   	}
	



}
// for the listener
function calcutateNewStats(){
	var weapon = document.getElementById('weapon').value;
	var armor = document.getElementById('armor').value;	
	alert(Profile.calculatePower(weapon, armor));
}

//unsafeWindow.document.onmousedown = null;
//unsafeWindow.window.onmousedown = null;

//unsafeWindow.document.onclick=null;

unsafeWindow.document.oncontextmenu=null;

PageEngine.DeleteElement('topbox');

PageEngine.DeleteElement('banner_bottom');

var table = document.getElementsByTagName('table')[0];

//if(table);
	//table.rows[0].deleteCell(2);

PageEngine.insertPowerIntoPage(Profile);

// Login page
if(document.location.pathname == '/'){
	check_version();

	

}

if (document.location.pathname=="/profile.php"){
	PageEngine.ChallengeAnyOne();
}

if (document.location.pathname=="/assault.php"){
	//TODO: count If you have a chanse to win
	PageEngine.CheckDurability(Profile);
}

if (document.location.pathname=="/robbery.php"){
	//TODO: make it work with gang
	if (getElementsByClass('statusbox_ok') != false) {
		guns_prices = GM_getValue(Profile.playerName + "guns_prices", []).split(',');
		guns_names = GM_getValue(Profile.playerName + "guns_names", []).split(',');
		PageEngine.CheckNewGuns(guns_prices, guns_names, Profile, language);
		var string = guns_prices.toString();
		GM_setValue(Profile.playerName + "guns_prices", string);
	}
	PageEngine.colourRobberies(language, Profile);
	PageEngine.CheckDurability(Profile);
}

if (document.location.pathname=="/bounty.php"){

}

if (document.location.pathname=="/sabotage.php"){

}

if (document.location.pathname=="/hookers.php"){
	//TODO count how much you'll earn by whore
	PageEngine.innersertHookersInfo(Profile, language);
}

if (document.location.pathname=="/armsdealer.php"){
	//guns_prices = GM_getValue(Profile.playerName + "guns_prices", []).split(",");
	//guns_names = GM_getValue(Profile.playerName + "guns_names", []).split(',');;
	PageEngine.getGunsPrices(guns_prices, guns_names);
	GM_setValue(Profile.playerName + "guns_prices", guns_prices.toString());
	GM_setValue(Profile.playerName + "guns_names", guns_names.toString());
	//TODO count how much you power increase if you'll buy a new weapon
	PageEngine.insertCalculator(Profile, language);

	// Add a listener to detect then the calc button is "clicked"
	document.getElementById('Calc').addEventListener("click",calcutateNewStats , false);

}

if (document.location.pathname=="/drugdealer.php"){
	PageEngine.getDrugPrices(language);
	PageEngine.populateDrugsValuesAtDealer(Profile, language);
	//TODO insert maximum drugs you can by and how much it cost by 1 stamina
}

if (document.location.pathname=="/buildings.php"){
	//TODO count how much you earn by building
	PageEngine.insertBuildInfoIntoBuildingPage(Profile);
	PageEngine.insertEarningsIntoBuildingPage(Profile);
}

if (document.location.pathname=="/nightlife.php"){
	//TODO count drug usages to prevent overdose
	//	PageEngine.InsertAd();
	PageEngine.InsertPanicButton(Profile);
	PageEngine.populateBuyDrugsValues(Profile, language);

}

if (document.location.pathname=="/businesses.php"){

}

if (document.location.pathname=="/hospital.php"){
	PageEngine.populateBuyStatValues(Profile);
	PageEngine.insertBuildInfoIntoHospitalPage(Profile);
}

if (document.location.pathname=="/surgery.php"){
	PageEngine.CheckIfPanic();
}

if (document.location.pathname=="/rip.php"){
	//Todo input real time left
}

if (document.location.pathname=="/prison.php"){
	//insert bribe to bribe box
	PageEngine.insertBribeIntoPrisonPage(Profile);
}

if (document.location.pathname=="/msgcenter.php"){
	//Todo send message to anyone

}

if (document.location.pathname=="/stats.php"){
	//TODO: complete the list offset=200++
	PageEngine.SetUnlimitedOffset();
}




version = "20080807";
function check_version() {
		var download_url = "http://userscripts.org/scripts/source/31066.user.js";
		GM_xmlhttpRequest({ method:"GET",url:download_url,
			onload:function(result) {

				if(result.responseText.indexOf(version) == -1 &&
					 confirm('A new version of "TheCrims Plus" is available.\nDo you want to update now?')) top.location.href = download_url;
			}
		});
}



//TODO fix a config box