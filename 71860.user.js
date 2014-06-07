// ==UserScript==
// @name           Earth Empires Add-on v1.4
// @namespace      www.earthempires.com
// @description    One click market input.
// @include	   	   http://*.www.earthempires.com/*
// @exclude		   http://www.earthempires.com/loggedin
// ==/UserScript==

var allTH;
var allTD;												// holds collection of all TD elements
var td_index;											// var used to index
allTD = document.getElementsByTagName('td');			// get all TD elements
allTH = document.getElementsByTagName('th');			// get all TH elements
var path = window.location.toString();					// get the URL of the current page
var page = path.substring(path.lastIndexOf('/'));		// extract page name from URL

var pageSRC = document.body.innerHTML;
var turns = 0;
var countryNum = -1;
var chems = 0;
var nukes = 0;
var cruise = 0;
var readiness = 0;
var turns = 0;
var stored = 0;

pageSRC = pageSRC.replace(/<.*?>/g,'');

countryNum = parseInt(pageSRC.split("(#")[1]);
chems = parseInt(pageSRC.split("Chemical Missiles")[1]);
nukes = parseInt(pageSRC.split("Nuclear Missiles")[1]);
cruise = parseInt(pageSRC.split("Cruise Missiles")[1]);
readiness = parseInt(pageSRC.split("Readiness:")[1]);
turns = parseInt(pageSRC.split("Turns:")[1]);
stored = parseInt(pageSRC.split("Turns Stored")[1]);

if(countryNum >=0){
	createCookie("current", countryNum);
	if(readCookie(countryNum) == null){
		createCookie(countryNum,"0,0,0,0,0,100",2);
	}
}
var toModify = readCookie("current");

if(turns >=0){
	modifyCookie(toModify, 0, turns);
}
if(stored >=0){
	modifyCookie(toModify, 1, stored);
}
if(chems >=0){
	modifyCookie(toModify, 2, chems);
}
if(nukes >=0){
	modifyCookie(toModify, 3, nukes);
}
if(cruise >=0){
	modifyCookie(toModify, 4, cruise);
}
if(readiness >=0){
	modifyCookie(toModify, 5, readiness);
}

function modifyCookie( cName, pIndex, value ){
	var cVal = readCookie(cName);
	
	var valSplit = cVal.split(",");
	valSplit[pIndex] = value;
	cVal = "";
	for(var g=0; g<valSplit.length; ++g){
		cVal += valSplit[g];
		if(g != valSplit.length-1){
			cVal += ",";
		}
	}
	createCookie(cName, cVal, 2);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else{
		var expires = "";
		
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


/*
*  FFA Control Page
*/
var pagesub = page.substr(0,8);						// used to match first 10 letters of page name
if(pagesub == "/mainffa"){
	var tTurn = createTextNode("T", "660000");
	var tChem = createTextNode("C", "660000");
	var tNuke = createTextNode("N", "660000");
	var tCruise = createTextNode("E", "660000");
	var tReady = createTextNode("Rdy", "660000");
	var tStored = createTextNode("St", "660000");
	
	var totTurn = 0;
	var totStored = 0;
	var totChem = 0;
	var totNuke = 0;
	var totCruise = 0;
	
	for(var q=0; q<allTD.length; ++q){
		if(allTD[q].innerHTML == "Clan"){
			allTD[q].parentNode.appendChild(tTurn);
			allTD[q].parentNode.appendChild(tStored);
			allTD[q].parentNode.appendChild(tChem);
			allTD[q].parentNode.appendChild(tNuke);
			allTD[q].parentNode.appendChild(tCruise);
			allTD[q].parentNode.appendChild(tReady);			
		}
		var isCountry = parseInt(allTD[q].innerHTML.split("(#")[1]);
		if(isCountry >=0){
			var cookieStr = readCookie(isCountry);
			if(cookieStr != null){
				cookieStr = cookieStr.split(",");			
				var cTurn = createTextNode(cookieStr[0], "000000");			
				var cStored = createTextNode(cookieStr[1], "000000");			
				var cChem = createTextNode(cookieStr[2], "000000");
				var cNuke = createTextNode(cookieStr[3], "000000");
				var cCruise = createTextNode(cookieStr[4], "000000");
				var cReady = createTextNode(cookieStr[5], "000000");
				allTD[q+6].parentNode.removeChild(allTD[q+6].parentNode.lastChild);
				allTD[q+6].parentNode.appendChild(cTurn);	//insert after +6
				allTD[q+6].parentNode.appendChild(cStored);
				allTD[q+6].parentNode.appendChild(cChem);
				allTD[q+6].parentNode.appendChild(cNuke);
				allTD[q+6].parentNode.appendChild(cCruise);
				allTD[q+6].parentNode.appendChild(cReady);			
				allTD[q+6].parentNode.appendChild(cReady);			
				totTurn += parseInt(cookieStr[0]);
				totStored += parseInt(cookieStr[1]);
				totChem += parseInt(cookieStr[2]);
				totNuke += parseInt(cookieStr[3]);
				totCruise += parseInt(cookieStr[4]);
			}
		}
	}	
	var ctTurn = createTextNode("Total Turns: " + totTurn, "0000ff");			
	var ctStored = createTextNode("Stored: " + totStored, "0000ff");			
	var ctChem = createTextNode("Chems: " + totChem, "0000ff");
	var ctNuke = createTextNode("Nukes: " + totNuke, "0000ff");
	var ctCruise = createTextNode("Cruise: " + totCruise, "0000ff");
	allTD[0].parentNode.parentNode.appendChild(ctTurn);
	allTD[0].parentNode.parentNode.appendChild(ctStored);
	allTD[0].parentNode.parentNode.appendChild(ctChem);
	allTD[0].parentNode.parentNode.appendChild(ctNuke);
	allTD[0].parentNode.parentNode.appendChild(ctCruise);
}


/*
*  Private Market Buy Goods Page
*/
var pagesub = page.substr(0,10);						// used to match first 10 letters of page name
if(pagesub == "/purchases"){

	for(var i=0; i<allTD.length; ++i){
	
		if(allTD[i].innerHTML.indexOf("Troops") > -1){	// find td object with keyword in it
			td_index = i+4;								// offset is 4 td elements after that object
			var troop_idx = td_index;					// store current index
			addListener(troop_idx, 1, 1);				// add a listener ot the object 
		}

		else if(allTD[i].innerHTML.indexOf("Jets") > -1){
			td_index = i+4;
			var jet_idx = td_index;
			addListener(jet_idx, 1, 2);		
		}

		else if(allTD[i].innerHTML.indexOf("Turrets") > -1){
			td_index = i+4;
			var turret_idx = td_index;
			addListener(turret_idx, 1, 3);
		}

		else if(allTD[i].innerHTML.indexOf("Tanks") > -1){
			td_index = i+4;
			var tank_idx = td_index;
			addListener(tank_idx, 1, 4);
		}

		else if(allTD[i].innerHTML.indexOf("Bushels<") > -1){
			td_index = i+4;
			var bushel_idx = td_index;
			addListener(bushel_idx, 1, 5);
		}

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	}
}

/*
*  Warprep page
*/
var form = document.getElementsByTagName('form');
var newSubmit = document.createElement("input");
newSubmit.setAttribute("type", "submit");
newSubmit.setAttribute("value", "Attack to Tab");
newSubmit.addEventListener("click", function(){this.form.target='_blank';return true;}, false);
var nBR = document.createElement("br");
pagesub = page.substr(0,8);
if(pagesub == "/warprep"){
	
	form[0].appendChild(nBR);
	form[0].appendChild(newSubmit);	
}

/*
*  Foreign Aid Page
*/
var pagesub = page.substr(0,4);
if(pagesub == "/fa?"){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML == "Troops"){
			td_index = i+2;
			var spy_idx = td_index;
			addListener(spy_idx, 7, 1);		
		}

		else if(allTD[i].innerHTML == "Jets"){
			td_index = i+2;
			var troop_idx = td_index;
			addListener(troop_idx, 7, 2);
		}

		else if(allTD[i].innerHTML == "Turrets"){
			td_index = i+2;
			var jet_idx = td_index;
			addListener(jet_idx, 7, 3);
		}

		else if(allTD[i].innerHTML == "Tanks"){
			td_index = i+2;
			var turret_idx = td_index;
			addListener(turret_idx, 7, 4);
		}

		else if(allTD[i].innerHTML == "Bushels"){
			td_index = i+2;
			var tank_idx = td_index;
			addListener(tank_idx, 7, 5);
		}

		else if(allTD[i].innerHTML == "Cash"){
			td_index = i+2;
			var bushel_idx = td_index;
			addListener(bushel_idx, 7, 6);
		}	

		if(td_index){
			allTD[td_index].style.backgroundColor = "33cc33";
		}
	
	}
}

/*
*  Private Market Sell Goods Page
*/
pagesub = page.substr(0,5);
var pagesub2 = page.substr(0,6);
if(pagesub == "/sell" || pagesub2 == "/sell?"){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML == "Spies"){
			td_index = i+2;
			var spy_idx = td_index;
			addListener(spy_idx, 2, 1);		
		}

		else if(allTD[i].innerHTML == "Troops"){
			td_index = i+2;
			var troop_idx = td_index;
			addListener(troop_idx, 2, 2);
		}

		else if(allTD[i].innerHTML == "Jets"){
			td_index = i+2;
			var jet_idx = td_index;
			addListener(jet_idx, 2, 3);
		}

		else if(allTD[i].innerHTML == "Turrets"){
			td_index = i+2;
			var turret_idx = td_index;
			addListener(turret_idx, 2, 4);
		}

		else if(allTD[i].innerHTML == "Tanks"){
			td_index = i+2;
			var tank_idx = td_index;
			addListener(tank_idx, 2, 5);
		}

		else if(allTD[i].innerHTML == "Bushels"){
			td_index = i+2;
			var bushel_idx = td_index;
			addListener(bushel_idx, 2, 6);
		}	

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	
	}
}

/*
*  Public Market Buy Goods Page
*/
pagesub = page.substr(0,7);
var pagesub3 = page.substr(0,8);
if((pagesub == "/market") && (pagesub3 == "/market" || pagesub3 == "/market?")){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML == "Troops"){
			td_index = i+5;
			var troop_idx = td_index;
			addListener(troop_idx, 3, 1);
		}

		else if(allTD[i].innerHTML == "Jets"){
			td_index = i+5;
			var jet_idx = td_index;
			addListener(jet_idx, 3, 2);
		}

		else if(allTD[i].innerHTML == "Turrets"){
			td_index = i+5;
			var turret_idx = td_index;
			addListener(turret_idx, 3, 3);
		}

		else if(allTD[i].innerHTML == "Tanks"){
			td_index = i+5;
			var tank_idx = td_index;
			addListener(tank_idx, 3, 4);
		}

		else if(allTD[i].innerHTML == "Bushels"){
			td_index = i+5;
			var bushel_idx = td_index;
			addListener(bushel_idx, 3, 5);
		}

		else if(allTD[i].innerHTML == "Oil Barrels"){
			td_index = i+5;
			var oil_idx = td_index;
			addListener(oil_idx, 3, 6);		
		}

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	
	}
}

/*
*  Public Market Sell Goods Page
*/
pagesub = page.substr(0,16);
if(pagesub == "/marketgoodssell"){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML == "Troops"){
			td_index = i+2;
			var troop_idx = td_index;
			addListener(troop_idx, 4, 1);
		}

		else if(allTD[i].innerHTML == "Jets"){
			td_index = i+2;
			var jet_idx = td_index;
			addListener(jet_idx, 4, 2);
		}

		else if(allTD[i].innerHTML == "Turrets"){
			td_index = i+2;
			var turret_idx = td_index;
			addListener(turret_idx, 4, 3);
		}

		else if(allTD[i].innerHTML == "Tanks"){
			td_index = i+2;
			var tank_idx = td_index;
			addListener(tank_idx, 4, 4);
		}

		else if(allTD[i].innerHTML == "Bushels"){
			td_index = i+2;
			var bushel_idx = td_index;
			addListener(bushel_idx, 4, 5);
		}

		else if(allTD[i].innerHTML == "Oil Barrels"){
			td_index = i+2;
			var oil_idx = td_index;
			addListener(oil_idx, 4, 6);		
		}	

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	
	}
}

/*
*  Public Market Buy Tech Page
*/
pagesub = page.substr(0,14);
if(pagesub == "/markettechbuy"){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML.substr(0,10) == "Military ("){
			td_index = i+5;
			var mil_idx = td_index;
			addListener(mil_idx, 5, 1);		
		}

		else if(allTD[i].innerHTML.substr(0,7) == "Medical"){
			td_index = i+5;
			var med_idx = td_index;
			addListener(med_idx, 5, 2);
		}

		else if(allTD[i].innerHTML.substr(0,8) == "Business"){
			td_index = i+5;
			var bus_idx = td_index;
			addListener(bus_idx, 5, 3);
		}

		else if(allTD[i].innerHTML.substr(0,11) == "Residential"){
			td_index = i+5;
			var res_idx = td_index;
			addListener(res_idx, 5, 4);
		}

		else if(allTD[i].innerHTML.substr(0,12) == "Agricultural"){
			td_index = i+5;
			var ag_idx = td_index;
			addListener(ag_idx, 5, 5);
		}

		else if(allTD[i].innerHTML.substr(0,7) == "Warfare"){
			td_index = i+5;
			var war_idx = td_index;
			addListener(war_idx, 5, 6);
		}

		else if(allTD[i].innerHTML.substr(0,14) == "Military Strat"){
			td_index = i+5;
			var mils_idx = td_index;
			addListener(mils_idx, 5, 7);
		}
		
		else if(allTD[i].innerHTML.substr(0,7) == "Weapons"){
			td_index = i+5;
			var weap_idx = td_index;
			addListener(weap_idx, 5, 8);
		}

		else if(allTD[i].innerHTML.substr(0,10) == "Industrial"){
			td_index = i+5;
			var indy_idx = td_index;
			addListener(indy_idx, 5, 9);
		}
		
		else if(allTD[i].innerHTML.substr(0,3) == "Spy"){
			td_index = i+5;
			var spy_idx = td_index;
			addListener(spy_idx, 5, 10);
		}
		else if(allTD[i].innerHTML.substr(0,3) == "SDI"){
			td_index = i+5;
			var SDI_idx = td_index;
			addListener(SDI_idx, 5, 11);
		}

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	
	}
}

/*
*  Public Market Sell Tech Page
*/
pagesub = page.substr(0,15);
if(pagesub == "/markettechsell"){

	for(var i=0; i<allTD.length; ++i){

		if(allTD[i].innerHTML == "Military"){
			td_index = i+2;
			var mil_idx = td_index;
			addListener(mil_idx, 6, 1);		
		}

		else if(allTD[i].innerHTML == "Medical"){
			td_index = i+2;
			var med_idx = td_index;
			addListener(med_idx, 6, 2);
		}

		else if(allTD[i].innerHTML == "Business"){
			td_index = i+2;
			var bus_idx = td_index;
			addListener(bus_idx, 6, 3);
		}

		else if(allTD[i].innerHTML == "Residential"){
			td_index = i+2;
			var res_idx = td_index;
			addListener(res_idx, 6, 4);
		}

		else if(allTD[i].innerHTML == "Agricultural"){
			td_index = i+2;
			var ag_idx = td_index;
			addListener(ag_idx, 6, 5);
		}

		else if(allTD[i].innerHTML == "Warfare"){
			td_index = i+2;
			var war_idx = td_index;
			addListener(war_idx, 6, 6);
		}
	
		else if(allTD[i].innerHTML == "Military Strategy"){
			td_index = i+2;
			var mils_idx = td_index;
			addListener(mils_idx, 6, 7);
		}

		else if(allTD[i].innerHTML == "Weapons"){
			td_index = i+2;
			var weap_idx = td_index;
			addListener(weap_idx, 6, 8);
		}

		else if(allTD[i].innerHTML == "Industrial"){
			td_index = i+2;
			var indy_idx = td_index;
			addListener(indy_idx, 6, 9);
		}

		else if(allTD[i].innerHTML == "Spy"){
			td_index = i+2;
			var spy_idx = td_index;
			addListener(spy_idx, 6, 10);
		}

		else if(allTD[i].innerHTML == "SDI"){
			td_index = i+2;
			var SDI_idx = td_index;
			addListener(SDI_idx, 6, 11);
		}

		if(td_index){
			allTD[td_index].style.backgroundColor = "0000ff";
		}
	}
}

/*
*  War Room page
*/
pagesub = page.substr(0,4);
var pagesub4 = page.substr(0,5);
var num_troops;
var num_jets;
var num_tanks;
if((pagesub == "/war" || pagesub4 == "/war?") && pagesub4 != "/warp"){
	var hasTroops = false;
	for(var i=0; i<allTH.length; ++i){
	
		if(allTH[i].innerHTML == "Troops"){				// find td object with keyword in it
			hasTroops = true;
			var troop_input = allTH[i].nextSibling;
			num_troops = parseInt(troop_input.innerHTML);
			troop_input.style.backgroundColor = "0000ff";
			troop_input.style.border = '3px solid Black';
			troop_input.addEventListener("click", function(){fillIn(troop_input, "ARMYTroop");},false);
		}
	}
	var hasJets = false;
	for(var j=0; j<allTH.length; ++j){
		if(allTH[j].innerHTML == "Jets"){
			hasJets = true;
			var jet_input = allTH[j].nextSibling;
			num_jets = parseInt(jet_input.innerHTML);
			jet_input.style.backgroundColor = "0000ff";
			jet_input.style.border = '3px solid Black';
			jet_input.addEventListener("click", function(){fillIn(jet_input, "ARMYJet");},false);	
		}
	}
	var hasTanks = false;
	for(var k=0; k<allTH.length; ++k){
		if(allTH[k].innerHTML == "Tanks"){
			hasTanks = true;
			var tank_input = allTH[k].nextSibling;
			num_tanks = parseInt(tank_input.innerHTML);
			tank_input.style.backgroundColor = "0000ff";
			tank_input.style.border = '3px solid Black';
			tank_input.addEventListener("click", function(){fillIn(tank_input, "ARMYTank");},false);
		}
	}
	
	if(hasTroops){
		addClickables("ARMYTroop", 0);
	}
	if(hasJets){
		addClickables("ARMYJet", 0);
	}
	if(hasTanks){
		addClickables("ARMYTank", 0);
	}
}

/*
*  Build page
*/
var toBuild = parseInt(form[0].innerHTML.split("can build")[1]);
pagesub = page.substr(0,6);
if(pagesub == "/build"){
	addClickables("BuildEnterprise", 1);
	addClickables("BuildResidential", 1);
	addClickables("BuildIndustrial", 1);
	addClickables("BuildMilitary", 1);
	addClickables("BuildResearch", 1);
	addClickables("BuildFarm", 1);
	addClickables("BuildOilRig", 1);	
	addClickables("BuildConstruction", 1);
}

/*
*  Research page
*/
var toRes = parseInt(form[0].innerHTML.split("can research")[1].replace(/\,/g,''));
pagesub = page.substr(0,9);
if(pagesub == "/research"){
	addClickables("ResMilTech", 2);
	addClickables("ResMedTech", 2);
	addClickables("ResBusTech", 2);
	addClickables("ResResTech", 2);
	addClickables("ResAgrTech", 2);
	addClickables("ResWarTech", 2);
	addClickables("ResMSTech", 2);	
	addClickables("ResWeapTech", 2);
	addClickables("ResIndTech", 2);
	addClickables("ResSpyTech", 2);
	addClickables("ResSDITech", 2);
}

/********************************
*  Market Functions
********************************/

/**
*  Selects proper name of input box using nested switch statements.
*  Adds eventlistener (click) to appropriate <td> elements. 
*
* @params int td_idx index of textnode in <td> element collection which will be clickable
* @params int pagenum private/public market page index (numbered pages for expandability)
* @params int unit subindex of input elements on given page with pagenum
*/
function addListener(td_idx, pagenum, unit){
	var name;
	switch(pagenum){
		case 1:
			switch(unit){
				case 1:
					name = "BUYTroop";
					break;
				case 2:
					name = "BUYJet";
					break;
				case 3:
					name = "BUYTurret";
					break;
				case 4:
					name = "BUYTank";
					break;
				case 5:
					name = "BUYBushel";
					break;
			}
			break;
			
		case 2:
			switch(unit){
				case 1:
					name = "sellSpy";
					break;
				case 2:
					name = "sellTroop";
					break;
				case 3:
					name = "sellJet";
					break;
				case 4:
					name = "sellTurret";
					break;
				case 5:
					name = "sellTank";
					break;
				case 6:
					name = "sellBushel";
					break;
			}
			break;

		case 3:
			switch(unit){
				case 1:
					name = "b1";
					break;
				case 2:
					name = "b2";
					break;
				case 3:
					name = "b3";
					break;
				case 4:
					name = "b4";
					break;
				case 5:
					name = "b5";
					break;
				case 6:
					name = "b6";
					break;
			}
			break;

		case 4:
			switch(unit){
				case 1:
					name = "s1";
					break;
				case 2:
					name = "s2";
					break;
				case 3:
					name = "s3";
					break;
				case 4:
					name = "s4";
					break;
				case 5:
					name = "s5";
					break;
				case 6:
					name = "s6";
					break;
			}
			break;

		case 5:
			switch(unit){
				case 1:
					name = "b7";
					break;
				case 2:
					name = "b8";
					break;
				case 3:
					name = "b9";
					break;
				case 4:
					name = "b10";
					break;
				case 5:
					name = "b11";
					break;
				case 6:
					name = "b12";
					break;
				case 7:
					name = "b13";
					break;
				case 8:
					name = "b14";
					break;
				case 9:
					name = "b15";
					break;
				case 10:
					name = "b16";
					break;
				case 11:
					name = "b17";
					break;
			}
			break;

		case 6:
			switch(unit){
				case 1:
					name = "s7";
					break;
				case 2:
					name = "s8";
					break;
				case 3:
					name = "s9";
					break;
				case 4:
					name = "s10";
					break;
				case 5:
					name = "s11";
					break;
				case 6:
					name = "s12";
					break;
				case 7:
					name = "s13";
					break;
				case 8:
					name = "s14";
					break;
				case 9:
					name = "s15";
					break;
				case 10:
					name = "s16";
					break;
				case 11:
					name = "s17";
					break;
			}
			break;
		
		case 7:
			switch(unit){
				case 1:
					name = "tradeTroop";
					break;
				case 2:
					name = "tradeJet";
					break;
				case 3:
					name = "tradeTurret";
					break;
				case 4:
					name = "tradeTank";
					break;
				case 5:
					name = "tradeBushel";
					break;
				case 6:
					name = "trademoney";
					break;
			}
			break;
	}
	allTD[td_idx].addEventListener("click", function(){addFill(allTD[td_idx], document.getElementsByName(name));}, false);

}

/**
*  Copies value from selected <td> element to appropriate input box.
*  (after removing commas)
*
* @params elem index <td> element which holds number to be copied
* @params elem target collection containing one input box element
*/
function addFill(index, target){
	var unitstr = index.innerHTML.replace(/\,/g,'');
	target[0].value = unitstr;	
	
}

/********************************
*  War Room Functions
********************************/

/**
*  Fills input textfield with total number of units
*  (removes commas)
*
* @params elem source <td> element which contains value to copy.
* @params String tname name of input textfield to be filled
*/
function fillIn(source, tname){
	var tar_in = document.getElementsByName(tname)[0];
	var unitstr = source.innerHTML.replace(/\,/g,'');
	tar_in.value = unitstr;	
}

/**
*  Increments and/or sets value of input textfield element.
*
* @params elem elem textfield to be filled
* @params int num index of clickable textnode (0=0, 1=5k, etc.)
*/
function addUnits(elem, num){
	var inval = parseInt(elem.value);
	switch(num){
		case 0:
			elem.value = 0;
			break;
		case 1:
			elem.value = inval + 5000;
			break;
		case 2:
			elem.value = inval + 10000;
			break;
		case 3:
			elem.value = inval + 50000;
			break;
		case 4:
			elem.value = inval + 100000;
			break;
		case 5:
			elem.value = inval + 250000;
			break;
		case 6:
			elem.value = inval + 500000;
			break;
		case 7:
			elem.value = inval + 1000000;
			break;
		case 8:
			if(elem.name == "ARMYTroop"){
				elem.value = Math.floor(num_troops/3);
			}
			if(elem.name == "ARMYJet"){
				elem.value = Math.floor(num_jets/3);
			}
			if(elem.name == "ARMYTank"){
				elem.value = Math.floor(num_tanks/3);
			}
			break;
		case 9:
			if(elem.name == "ARMYTroop"){
				elem.value = Math.floor(num_troops/4);
			}
			if(elem.name == "ARMYJet"){
				elem.value = Math.floor(num_jets/4);
			}
			if(elem.name == "ARMYTank"){
				elem.value = Math.floor(num_tanks/4);
			}
			break;
		case 10:
			if(elem.name == "BuildConstruction"){
				elem.value = inval + 4;
			}
			else{
				elem.value = inval + toBuild;
			}
			break;
		case 11:
			elem.value = inval + toRes;
			break;
	}

}

/**
* Adds clickable textnodes to war room page.
*
* @param string p_name name of input textfield to add textnodes after
*/
function addClickables(p_name, whatpage){
	var input_field = document.getElementsByName(p_name)[0];
	input_field.value = 0;
	var td_elem;
	switch(whatpage){
	case 0:									//if war room
		for(var index = 0; index<10; ++index){	
			switch(index){
				case 0:
					td_elem = createTextNode("0", "ff0000");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						0);}, false);
					break;
				case 1:
					td_elem = createTextNode("5k", "555555");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						1);}, false);
					break;
				case 2:
					td_elem = createTextNode("10k", "0000ff");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						2);}, false);
					break;
				case 3:
					td_elem = createTextNode("50k", "555555");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						3);}, false);
					break;
				case 4:
					td_elem = createTextNode("100k", "0000ff");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						4);}, false);
					break;
				case 5:
					td_elem = createTextNode("250k", "555555");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						5);}, false);
					break;
				case 6:
					td_elem = createTextNode("500k", "0000ff");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						6);}, false);
					break;
				case 7:
					td_elem = createTextNode("1m", "555555");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						7);}, false);
					break;
				case 8:
					td_elem = createTextNode("1/3", "0000ff");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						8);}, false);
					break;
				case 9:
					td_elem = createTextNode("1/4", "555555");
					td_elem.addEventListener("click", function(){addUnits(input_field,
						9);}, false);
					break;
			}
			appendTextNode(p_name, td_elem);
		}
		break;
	case 1:		// build
		td_elem = createTextNode("+", "0000ff");
		td_elem.addEventListener("click", function(){addUnits(input_field,
			10);}, false);
		appendTextNode(p_name, td_elem);
		td_elem = createTextNode("0", "c0c0c0");
		td_elem.addEventListener("click", function(){addUnits(input_field,
			0);}, false);
		appendTextNode(p_name, td_elem);
		break;
	case 2:		// research
		td_elem = createTextNode("+", "0000ff");
		td_elem.addEventListener("click", function(){addUnits(input_field,
			11);}, false);
		appendTextNode(p_name, td_elem);
		td_elem = createTextNode("0", "c0c0c0");
		td_elem.addEventListener("click", function(){addUnits(input_field,
			0);}, false);
		appendTextNode(p_name, td_elem);
		break;
	}
}

/**
*  Creates new text nodes, adds color, border, sets height.
*
* @params String text text to be displayed inside textnode
* @params String color hex value of desired color of textnode.
*/
function createTextNode(text, color){
	var td_ret = document.createElement('td');
	td_ret.innerHTML = text;
	td_ret.style.backgroundColor = color;
	//td_ret.style.border = '2px solid Black';
	td_ret.style.height = '2em';
	td_ret.style.width = '2em';
	return td_ret;
}

/**
*  Appends text node after desired input textfield.
*
* @params String par_name name of desired textfield to add after
* @params elem new_node textnode to be appended after input textfield
*/
function appendTextNode(par_name, new_node){
	var input = document.getElementsByName(par_name);		//"ARMYTroop"
	var insert_idx = input[0].parentNode.parentNode;
	insert_idx.appendChild(new_node);
}