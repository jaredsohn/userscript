// Conquer Club - Card Counter, Card Redemption Value, Status Indicator
var versionString = "4.10.3";

// This monkey is now called:


/////    ////   /////
//  //  //  //  //  //
/////   //  //  /////
//  //  //  //  //  //
/////    ////   /////



// PLEASE READ ALL THE COMMENTS AT THE START OF THIS FILE BEFORE EDITING

//-----------------------------------------------------------------------------
// Installation
//-----------------------------------------------------------------------------
// This is a Greasemonkey user script.

// To use, first install Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.

// To uninstall, go to Tools/Manage User Scripts, select "Conquer Club - BOB", and click Uninstall.

//-----------------------------------------------------------------------------
// Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name          Conquer Club - BOB
// @namespace     http://yeti_c.co.uk/conquerClub
// @description   Adds Stats, card counter, redemption value, text based map, map inspection tools
// @include       http*://*conquerclub.com*
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
// 
//-----------------------------------------------------------------------------
// DO NOT EDIT BELOW THIS ( unless you know what you are doing )
//-----------------------------------------------------------------------------
// NO REALLY, THERE IS NO NEED TO EDIT THIS FILE ALL OPTIONS ARE CONTROLLED BY THE GAME MENU


// If you are still reading then on your own head be it, however please post your modification to this thread
// http://www.conquerclub.com/forum/viewtopic.php?t=91386 so that I can look at improving the script.
var shouldCacheXml = true;
var hoverInfo;
var lights = false;

var test = window.location.toString();
test = test.substring(0,test.lastIndexOf('/'));
// global vars so refresh function still has scope on them.
var armiesArr;
var playersArray = [];
var countriesArray = [];
var continentsArray = [];
var objectivesArray = [];
var reinforcementsArray = [];
var logFixed;

var images = {
	attackonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00SIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%08%14%04I%90%8B!.%94%94%94%84%BB%90%02%C3h%E8B%E40%1Cu!%A9%B1%8D%99%0EG%C3p%10%86!%25%05%05%7DJ%1Bj%B8%10%00%F6%99%89%EE%AE%84%9A%9C%00%00%00%00IEND%AEB%60%82",
	bombarded:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5BIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86%E1h%B2%19%99Y%0F9%E5%93%CA%C6Z%DA%90j%08%C1%AC%C7%C2%C2%F2%9F%9D%9D%1D%5E%9C%91b%01%CC%85%00%16%23rE%C7(%B7)%00%00%00%00IEND%AEB%60%82",
	bombard:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%A3%C9%06%9Cl%00x%E0%90%9C%EB%B7%F2%06%00%00%00%00IEND%AEB%60%82",
	defendonly:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8O%ED%94%C1%0A%000%08B%ED%FF%FF%B5_p%C9%D8%D8%B9%DA-%C1c%8F%10%D1%000%5C%16I%3B%10%01%CB%0E%20d%A9%0C%13%E3%02%DD%9DY%BF%CF%0C0%97%E3d%B8%8B%9D%ED%A0%EE%26%C3O%E3%D0%BE6%DD%C0%05%90%82%90%9C%E5%9D%92.%00%00%00%00IEND%AEB%60%82",
	mutualbomb:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86!E%C9%E6%3D(%CD%8E%86%E1h%18%0E%D6%E2%0B%00%3C%03%D6l4%B8H%5D%00%00%00%00IEND%AEB%60%82",
	normal:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%8Aa%E7%A1%EA%EF%A3%EB%83%1B%08d%FC%A7%12%86%B8%90J%86%81%1C5j%20%E5%913%1A%86%23'%0CI%2C%1Cp%16%24%E4%966%F47%10%00%AB%88%ED%BB%03%F0'%AC%00%00%00%00IEND%AEB%60%82",
	safe:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00PIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%04%93%0D%25%05%05%7DJ%1Bj%B8%10%00%0A%D1%2C4%3D%FCt%15%00%00%00%00IEND%AEB%60%82"
};

//---- Prototyping ----
String.prototype.has = function(key) {
	return this.indexOf(key) > -1;
};
String.prototype.makeID = function() {
	// escaped characters: '"#:;,&~!=>?.()/+*^[]~!$|
	return this.replace(/[ '"#:;,&~!=>\?\.\(\)\/\+\*\^\[\]\n\]\$\|]/g,"_");
};
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.normalizeSpaces = function() {
	return this.replace(/\s+/g," ").trim();
};
String.prototype.startsWith = function(str){
	return (this.match("^"+str)==str);
};
String.prototype.endsWith = function(str){
	return (this.match(str+"$")==str);
};

function removeFromArray(elem, array) {
	var index = $.inArray(elem, array);
	array.splice(index, 1);
}

$.fn.exists = function(){
	return $(this).length>0;
};
//-----------------------------------------------------------------------------
// Please Wait coding - creates a Div that gets in the way of people doing things!
//-----------------------------------------------------------------------------

// Start/stop please wait
function startWaiting(){
	showPleaseWait(true);
}
function stopWaiting(){
	showPleaseWait(false);
}

// Start please wait with custom message
function customStartWaiting(msg){
	startWaiting();
	$('#pleaseWaitMessage').html(msg);
}

// Functions for showing/hiding please wait message
function showPleaseWait(show){
	var pleaseWait = $('#pleaseWait');
	if (!pleaseWait[0]) {
		createPleaseWait();
		pleaseWait = $('#pleaseWait');
	}
	pleaseWait.toggle(show);
}

function createPleaseWait(){
	var opacity = "0.5", backColour = "#000000", frontColour = "#FFFFFF";

	var pleaseWait = $('<div id="pleaseWait"></div>');
	pleaseWait.css({
		position:'absolute',
		height:'100%',
		width:'100%',
		display:'none',
		zIndex:99,
		top:0,
		left:0
	});

	// Show please wait over central column only.
	$('#middleColumn').append(pleaseWait);

	var pwTable = $('<table></table>').css({
		height:'100%',
		width:'100%'
	}).attr('cellPadding',0).attr('cellSpacing', 0);
	pleaseWait.append(pwTable);

	var pwRow1 = $('<tr></tr>').css({
		height: '300px',
		verticalAlign:'top'
	});
	pwRow1.append($('<td></td>').css({
		backgroundColor:backColour,
		opacity:opacity
	}).attr('colSpan',3));
	pwTable.append(pwRow1);

	var pwRow2 = $('<tr></tr>').css({
		height:'1px',
		padding:'0px'
	});
	pwRow2.append($('<td></td>').css({
		width:'25%',
		backgroundColor:backColour,
		opacity:opacity
	}));

	var pwTdRow2 = $('<td></td>').css({
		backgroundColor:frontColour,
		color:backColour,
		padding:'10px',
		border:'1px solid',
		opacity:1
	});
	pwTdRow2.append($('<img id="pleaseWaitImage" src="http://static.conquerclub.com/loading.gif"/>').css('paddingRight','2px'));
	pwTdRow2.append($('<span id="pleaseWaitMessage"></span>').css('padding', 0));

	pwRow2.append(pwTdRow2);
	pwRow2.append($('<td></td>').css({
		width:'25%',
		backgroundColor:backColour,
		opacity:opacity
	}));
	pwTable.append(pwRow2);

	var pwRow3 = $('<tr></tr>').css({
		height: '100%',
		verticalAlign:'top'
	});
	pwRow3.append($('<td></td>').css({
		backgroundColor:backColour,
		opacity:opacity
	}).attr('colSpan',3));
	pwTable.append(pwRow3);
}

var startLogTime = (new Date()).getTime();

//Game Enumerations
var eGameType = {
	TERMINATOR:0,
	STANDARD:1,
	DOUBLES:2,
	TRIPLES:3,
	QUADRUPLES:4,
	ASSASSIN:5
};
var ePlayOrder = {
	FREESTYLE:0,
	SEQUENTIAL:1
};
var eBonusCards = {
	NOCARDS:0,
	FLATRATE:1,
	ESCALATING:2,
	NUCLEAR:3
};
var eFortifications = {
	ADJACENT:0,
	CHAINED:1,
	UNLIMITED:2
};

function GameSettings(){
	this.gamenr = $("#game2").val();
	// ---- determine fog ----
	if (dashboard.exists()) {
		var dash = dashboard.html();
		this.fog = dash.indexOf("Fog of War: <b>Yes")!=-1;

		//determine speed
		this.speed = unsafeWindow.speed;

		// ---- Get Game Modes ----
		if(dash.has("Sequential")) {
			this.playOrder = ePlayOrder.SEQUENTIAL;
		} else {
			this.playOrder = ePlayOrder.FREESTYLE;
		}
		// ---- Get Game Type ----
		if (dash.has("Doubles")) {
			this.type = eGameType.DOUBLES;
		} else if (dash.has("Triples")) {
			this.type = eGameType.TRIPLES;
		} else if (dash.has("Quadruples")) {
			this.type = eGameType.QUADRUPLES;
		} else if (dash.has("Terminator")) {
			this.type = eGameType.TERMINATOR;
		} else if (dash.has("Assassin")) {
			this.type = eGameType.ASSASSIN;
		} else {
			this.type = eGameType.STANDARD;
		}
		// ---- get game fortification type
		if (dash.has("Adjacent")) {
			this.fortifications = eFortifications.ADJACENT;
		} else if (dash.has("Chained")) {
			this.fortifications = eFortifications.CHAINED;
		} else {
			this.fortifications = eFortifications.UNLIMITED;
		}

		// ---- determine spoils type ----
		if(dash.indexOf("Nuclear") > -1 ) {
			this.spoils = eBonusCards.NUCLEAR;
		} else if( dash.indexOf("Escalating") > -1 ) {
			this.spoils = eBonusCards.ESCALATING;
		} else if( dash.indexOf("Flat Rate") > -1 ) {
			this.spoils = eBonusCards.FLATRATE;
		} else {
			this.spoils = eBonusCards.NOCARDS;
		}
	}
}

//-------------------------------------------------------------------------
// OBJECTS
//-------------------------------------------------------------------------

//Reinforcements Object
function Reinforcement(lower, upper, divisor){
	this._lower = lower;
	this._upper = upper;
	this._divisor = divisor;
}

//Player Class
function Player(name, pid){
	this._name = name;
	this._pid = pid;
	this._cards = 0;
	this._armies = 0;
	this._countries = 0;
	this._calculatedCountries = 0;
	this._continentBonus = 0;
	this._territoryBonus = 0;
	this._handingInCards = false;
	this._armiesLastTurn = 0;
	this._lastTerritoryBonus = 0;
	this._lastContinentBonus = 0;
	this._isHandingInCards = false;
	this._lastBonusFixed = false;
	this._points = 0;
	this._deferred = 0;
	this._skipped = 0;
	this._total_skipped = 0;
	this._continents = [];

	this.toString = function(){
		return this._name;
	};
	this.getTurninP = function(){
		if( this._cards < 3 ) {
			return 0;
		}
		if( this._cards > 4 ) {
			return 1;
		}
		if( this._cards == 3 ) {
			return 0.3341;
		}
		return 0.778;
	};
	this.alert = function() {
		alert("Name:\t" + this._name+
			"\nPID:\t" + this._pid +
			"\nCards:\t" + this._cards +
			"\nArmies:\t" + this._armies +
			"\nCountries:\t" + this._countries);
	};
	this.killToReduce = function() {
		var countries = this._countries;
		if (gameSettings.fog) {
			countries = this._calculatedCountries;
		}
		if (countries < 12 ) {
			return "-";
		}
		var rem = countries%3;
		return (rem===0)?"*": ( rem == 1 ? "**" : "***") ;
	};
	this.ContinentsDisplay = function() {
		var ret = "";
		var contSum = [];
		var flashList = [];
		for (var index in this._continents) {
			var continent = continentsArray[this._continents[index]];
			if (typeof(contSum[continent._name])=="undefined") {
				contSum[continent._name] = continent._bonus;
				flashList[continent._name] = continent._realName;
			} else {
				contSum[continent._name] += continent._bonus;
				flashList[continent._name] += "|" + continent._realName;
			}
		}
		for (var continentName in contSum ) {
			ret += '<span class="JumpClick" title="' + flashList[continentName] + '">' + continentName.replace(" ","&nbsp;") + "&nbsp(" + contSum[continentName] + ") </span>";
		}
		contSum = [];
		flashList = [];
		for (var countryIndex in countriesArray) {
			var country = countriesArray[countryIndex];
			if ((country._bonus!==0) && (country._pid == this._pid)) {
				contSum[country._name] = country._bonus;
				flashList[country._name] = country._name;
			}
		}
		for (var countryName in contSum ) {
			ret += '<span class="clickJump" title="' + flashList[countryName] + '">' + countryName.replace(" ","&nbsp;") + "&nbsp[" + contSum[countryName] + "] </span>";
		}
		return ret;
	};
}

// Country Class
function Country (name,pid,armies) {
	this._name = name;
	this._pid = pid;
	this._armies = armies;
	this.toString = function() {
		return this._name;
	};
	this._attacks = [];
	this._borders = [];
	this._DefendBorders = [];
	this._bombards = [];
	this._mutualBombard = [];
	this._bombardedBy = [];
	this._inContinent = false;
	this._bonus = 0;
	this._killer = false;
	this._neutral = 0;
	this._smallxPos = 0;
	this._smallyPos = 0;
	this._largexPos = 0;
	this._largeyPos = 0;
	this._light = null;

	this.checkBorders = function(howSafe, countries) {
		if (this._armies == '?') {
			return 0;
		}
		for (var k=0; k < countries.length; k++){
			var bb = countriesArray[countries[k]];
			if (bb._pid == NID) {
				if (bb._armies == '?') {
					return 0;
				} else {
					continue;
				}
			}
			if (bb._pid != this._pid) {
				// it's not mine
				howSafe = 1;
				// Or team?
				if (teamNumber(bb._pid) != teamNumber(this._pid)) {
					return 0;
				}
			}
		}
		return howSafe;
	};
		
	this.isSafe = function () {
		var howSafe = 2;
		howSafe = this.checkBorders(howSafe, this._DefendBorders);
		howSafe = this.checkBorders(howSafe, this._borders);
		howSafe = this.checkBorders(howSafe, this._bombardedBy);
		howSafe = this.checkBorders(howSafe, this._mutualBombard);
		return howSafe;
	};
	this.getInspectText = function () {
		var result = this.displayString();
		result += getInspectRepresentation(this._attacks, images.attackonly, "Attacks");
		result += getInspectRepresentation(this._borders, images.normal, "Borders");
		result += getInspectRepresentation(this._DefendBorders, images.defendonly, "Attacked By");
		result += getInspectRepresentation(this._bombards, images.bombard, "Bombards");
		result += getInspectRepresentation(this._bombardedBy, images.bombarded, "Bombarded by");
		result += getInspectRepresentation(this._mutualBombard, images.mutualbomb, "Mutual Bombardment");
		return result;
	};
	function getInspectRepresentation(countries, image, text) {
		var result = "";
		if (countries.length > 0) {
			result +='<br><img class="attackhovers" src='+image+'>';
			result += '<span> ' + text + ' </span>';
			result += '[ ';
			for (var index in countries) {
				result += countriesArray[countries[index]].displayString();
			}
			result += ' ]';
		}
		return result;
	}
	this.displayString = function () {
		var pid = this._pid;
		if (pid == UID) {
			pid = NID;
		}
		var result = '<span class="playerBG' + pid + '"><span class="clickJump" title="' + this._name + '">' + replaceSpace(this._name) + '&nbsp;(' + this._armies + ')';
		if (this._bonus !== 0) {
			result += '&nbsp;['+this._bonus+']';
		}
		result += '</span></span>';
		return result;
	};

	this.createDiv = function () {
		if (this._light == null) {
			var toAdd = $("<div id=" + this._name.makeID() + " class='off'></div>");
			this._light = toAdd;
		}
		this.updateDiv();
		return this._light;
	};
	this.updateDiv = function() {
		this._light.css({
			width: (12 + (("" + this._armies).length)*8),
			left: this.xPos() - 11,
			top: this.yPos() - 37
		});
	}
	this.xPos = function() {
		if (mapSize=='S') {
			return this._smallxPos;
		}
		return this._largexPos;
	};
	this.yPos = function() {
		if (mapSize=='S') {
			return this._smallyPos;
		}
		return this._largeyPos;
	};

	this.lightUp = function(type) {
		var pid = this._pid;
		if (pid == UID) {
			pid = NID;
		}
		this._light.attr('class', 'player' + pid);
		if (type) { // show attack type
			if (type=="BORDER") {
				this._light.addClass("typeborder");
			} else if (type=="ATTACK") {
				this._light.addClass("typeattack");
			} else if (type=="DEFEND") {
				this._light.addClass("typedefend");
			} else if (type=="BOMBARDS") {
				this._light.addClass("typebombards");
			} else if (type=="BOMBARDED") {
				this._light.addClass("typebombarded");
			} else if (type=="MUTUAL") {
				this._light.addClass("typemutualbombard");
			}
		} else {
			var safe = this.isSafe();
			if (safe === 0) {
				this._light.addClass("h");
			} else if (safe == 1) {
				this._light.addClass("i");
			} else {
				this._light.addClass("j");
			}
		}
	};

	this.lightDown = function() {
		this._light.attr('class', 'off');
	};

	this.lightUpNeighbours = function() {
		lightupCountries(this._borders, "BORDER");
		lightupCountries(this._DefendBorders, "DEFEND");
		lightupCountries(this._attacks, "ATTACK");
		lightupCountries(this._bombards, "BOMBARDS");
		lightupCountries(this._bombardedBy, "BOMBARDED");
		lightupCountries(this._mutualBombard, "MUTUAL");
	};
}
function lightupCountries(countries, type) {
	for (var index = 0; index < countries.length; index++) {
		countriesArray[countries[index]].lightUp(type);
	}
}

//Continent Class - Note all Continents now have required elements
// If a Traditional continent - then required matches the size of the countrys array.
function Continent (name,bonus,realname) {
	this._name = name;
	this._realName = realname;
	this._bonus = bonus;
	this._required = 0;
	this.toString = function() {
		return this._name;
	};
	this._countrys = [];
	this._continents = [];
	this._owners = []; // hold the owners of this continent (note could be many more than one)
	this._overrides = []; // Hold overriders for this continent.
	this._overriden = []; // hold an array to match the owners to say if this is overriden or not.
	this.clearOwners = function() { // clean out owners array - called before processing.
		this._owners = [];
		this._overriden = [];
	};
	this.alert = function() {
		alert("Name:\t" + this._name +
			"\nrealName:\t" + this._realName +
			"\nBonus:\t" + this._bonus +
			"\nRequired:\t" + this._required +
			"\nCountries:\t" + this._countrys +
			"\nOverrides:\t" + this._overrides +
			"\nOwners:\t" + this._owners +
			"\nOverriden:\t" + this._overriden);
	};
	this.displayString = function () {
		var pid, result = "";
		for (var i in this._owners) {
			pid = this._owners[i];
			for (var name in playersArray) {
				if (playersArray[name]._pid == pid) {
					if (!this._overriden[i]) {
						result += '<span class="playerBG' + pid + '"><span class="hovermap" title="' + this._realName + '">' + replaceSpace(this._name) + '&nbsp;';
						if (this._bonus !== 0) {
							result += '['+this._bonus+']';
						}
						result += '</span></span>';
					}
				}
			}
		}
		if (this._owners.length<1) {
			pid = NID;
			result += '<span class="playerBG' + pid + '"><span class="hovermap" title="' + this._realName + '">' + replaceSpace(this._name) + '&nbsp;';
			if (this._bonus !== 0) {
				result += '['+this._bonus+']';
			}
			result += '</span></span>';
		}
		return result;
	};
	this.flash = function() {
		var continent = this;
		cntryClickHandler(function() {
			continent.lightUp();
		});
	};
	this.lightUp = function() {
		var i;
		for (i in this._countrys) {
			countriesArray[this._countrys[i]].lightUp();
		}
		for (i in this._continents) {
			continentsArray[this._continents[i]].lightUp();
		}
	};
}

function Objective (name, realname) {
	this._name = name;
	this._realname = realname;
	this._countrys = [];
	this._continents = [];
	this._required = 0;
	this._owners = []; // hold the owners of this objective (note could be many more than one)
	this.clearOwners = function() { // clean out owners array - called before processing.
		this._owners = [];
	};
}


//-------------------------------------------------------------------------
// FUNCTIONS
//-------------------------------------------------------------------------


function getElementText(elem){
	if(elem.innerText) {
		return elem.innerText;
	} else {
		return elem.textContent;
	}
}

// Add in "Start BOB" button
function addStartBOB(){
	if ($('#startBobLink').exists()) {
		return; //already there
	}
	var bobLink = $('<a id="startBobLink">Start Bob</a>');
	bobLink.click(startBOB);
	var bobSpan = $('<span id="startbob"></span>');
	bobSpan.append('[').append(bobLink).append(']');
	$('#colourblind').parent().append(bobSpan);
}

function startBOB(){
	$('#startbob').hide();
	forceInit = true;
	gm_ConquerClubGame();
}

function addConfirmDropGameClickHandlers(){
	var dropGameLinks = $('#middleColumn table.listing a').filter(function() {
		return this.innerHTML == 'Drop Game';
	});
	if (myOptions.confirm_drop == "On") {
		dropGameLinks.click(function() {
			var gameNr = this.href.split('=')[2];
			if (confirm('Drop Game #' + gameNr + '?')) {
				return true;
			}
			return false;
		});
	} else {
		dropGameLinks.unbind('click');
	}
}

function createGamesTogether(){
	if (location.href.indexOf("mode=viewprofile")==-1 || myOptions.games_together=="Off" || $('#gamesTogether').exists()) {
		return;
	}
	var currentLink = $('dl.details.left-box').find('a:first');
	var link = currentLink[0].href + "&p2=" + $("#leftColumn .vnav").find("p:first a b").html();
	$(currentLink).after(' </strong>|<strong> <a id="gamesTogether" href="' + link + '">Show all games together</a>');
}

function showMoreTextMap() {
	var sml = $('#showMoreLink');
	if (sml.html()=="fixed text map") {
		$('#textMap').css({
			height:"",
			overflowY:"hidden"
		});
		sml.html("scrollable text map");
	} else {
		if ($('#textMap').height()>=200) {
			$('#textMap').css({
				height:"200px",
				overflowY:"auto"
			});
			sml.html("fixed text map");
		} else {
			sml.parent().hide();
		}
	}
	updateMenuHiderHeight();
}

function showMoreStats() {
	var sml = $('#showMoreStatsLink');
	if (sml.html()=="fixed statistics") {
		$("#statsbody").css({
			height:"",
			overflowY:"hidden"
		});
		sml.html("scrollable statistics");
	} else {
		if ($('#statsTable').height()>=200) {
			$("#statsbody").css({
				height:"200px",
				overflowY:"auto"
			});
			sml.html("fixed statistics");
		}
	}
	updateMenuHiderHeight();
}

function replaceSpace(text) {
	return text.trim().replace(/( +)/g, "&nbsp;");
}

function deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
	GM_setValue(name,uneval(val));
}

//-----------------------------------------------------------------------------
// DEFAULT OPTIONS SETTINGS
//-----------------------------------------------------------------------------
// THERE IS NO POINT IN EDITING THESE: CHANGES HERE WILL HAVE NO EFFECT

DEFAULT_OPTIONS = {
	jumptomap:false,
	textMapType:'Off',
	fadeMap:1,
	'24hourClockFormat':'am/pm',
	mapInspect:true,
	confirmEnds:true,
	confirmAutoAttack:false,
	confirmDeploy:false,
	statsMode:'Extended',
	floatActions:'Off',
	hideMenu:'Off',
	MinimumFormWidth:600,
	ccdd:'On',
	fulllog:'Off',
	swapavas:'Off',
	smallavas:'Off',
	hidesigs:'Off',
	confirm_drop:'Off',
	continent_overview:'Off',
	autobob:'On',
	games_together: 'On',
	chatOnTop: 'Off',
	sideStats: true
};

// Load Options
var myOptions = (deserialize("OPTIONS", DEFAULT_OPTIONS));
if (typeof(myOptions) == "undefined") {
	// poor editing in the about:config page
	myOptions = {};
}
// This part will handle options MISSING from the config section
for (var name in DEFAULT_OPTIONS) {
	if (typeof(myOptions[name]) == "undefined") {
		myOptions[name] = DEFAULT_OPTIONS[name];
	}
}
serialize("OPTIONS", myOptions);

function parseTerritory(entry, i) {
	var name = getElementText(entry.getElementsByTagName('name')[0]).normalizeSpaces();
	var title = name.makeID();
	var pid = parseInt(armiesArr[(i*2)], 10);
	var amrs = armiesArr[(i*2)+1];
	countriesArray[title] = new Country (name,pid,amrs);

	countriesArray[title]._smallxPos = parseInt(entry.getElementsByTagName('smallx')[0].textContent, 10);
	countriesArray[title]._smallyPos = parseInt(entry.getElementsByTagName('smally')[0].textContent, 10);
	countriesArray[title]._largexPos = parseInt(entry.getElementsByTagName('largex')[0].textContent, 10);
	countriesArray[title]._largeyPos = parseInt(entry.getElementsByTagName('largey')[0].textContent, 10);

	var borders = entry.getElementsByTagName('border');
	var j, bb;

	for (j = 0; j <borders.length; j++) {
		bb = borders[j].textContent.normalizeSpaces().makeID();
		if (countriesArray[bb] && $.inArray(title, countriesArray[bb]._attacks) != -1) {
			removeFromArray(title, countriesArray[bb]._attacks);
			countriesArray[bb]._borders.push(title);
			countriesArray[title]._borders.push(bb);
		} else {
			countriesArray[title]._attacks.push(bb);
		}
	}

	var bombardments = entry.getElementsByTagName('bombardment');

	for (j = 0; j <bombardments.length; j++) {
		bb = bombardments[j].textContent.normalizeSpaces().makeID();
		if (countriesArray[bb] && $.inArray(title, countriesArray[bb]._bombards) != -1) {
			removeFromArray(title, countriesArray[bb]._bombards);
			countriesArray[bb]._mutualBombard.push(title);
			countriesArray[title]._mutualBombard.push(bb);
		} else {
			countriesArray[title]._bombards.push(bb);
		}
	}

	var bonusElements = entry.getElementsByTagName('bonus');
	if (bonusElements.length>0) {
		var bonus = bonusElements[0].textContent;
		countriesArray[title]._bonus = parseInt(bonus, 10);
	}
	var neutral = entry.getElementsByTagName('neutral');
	if (neutral.length===0) {
		totalStartCountries++;
	} else {
		countriesArray[title]._neutral=neutral[0].textContent;
		var killer = neutral[0].getAttribute("killer");
		if (killer=="yes") {
			countriesArray[title]._killer=true;
		}
	}
}

function parseContinent(entry){
	var title = entry.getElementsByTagName('name')[0].textContent.normalizeSpaces();
	var dedupename = 1;
	var titleRoot = title;
	while (continentsArray[title]) {
		title = titleRoot + "_" + dedupename++ ;
	}
	var bonus = parseInt(entry.getElementsByTagName('bonus')[0].textContent, 10);
	var partial = false;
	var required = 0;
	var requiredEl = entry.getElementsByTagName('required');
	if (requiredEl.length>0) { // Partial continent - hold required value from XML
		required = parseInt(requiredEl[0].textContent, 10);
		partial = true;
	}

	continentsArray[title] = new Continent(titleRoot,bonus,title);
	var countries = entry.getElementsByTagName('territory');
	var j,bb;
	for (j = 0; j <countries.length; j++) {
		bb = countries[j].textContent.normalizeSpaces().makeID();
		continentsArray[title]._countrys.push(bb);
		if (!partial) {// Traditional continent we will need to capture how many components there are.
			required++;
		}
	}
	var continents = entry.getElementsByTagName('continent');
	for (j = 0; j <continents.length; j++) {
		bb = continents[j].textContent.normalizeSpaces();
		continentsArray[title]._continents.push(bb);
		if (!partial) { // Traditional continent we will need to capture how many components there are.
			required++;
		}
	}
	continentsArray[title]._required = required;
	var overrides = entry.getElementsByTagName('override');
	for (j = 0; j <overrides.length; j++) {
		bb = overrides[j].textContent.normalizeSpaces();
		continentsArray[title]._overrides.push(bb);
	}
}

function parseObjective(entry) {
	var title = entry.getElementsByTagName('name')[0].textContent.normalizeSpaces();
	var dedupename = 1;
	var titleRoot = title;
	while (objectivesArray[title]) {
		title = titleRoot + "_" + dedupename++ ;
	}
	objectivesArray[title] = new Objective(titleRoot,title);
	var countries = entry.getElementsByTagName('territory');
	var j,bb;
	for (j = 0; j <countries.length; j++) {
		bb = countries[j].textContent.normalizeSpaces().makeID();
		objectivesArray[title]._countrys.push(bb);
		objectivesArray[title]._required++;
	}
	var continents = entry.getElementsByTagName('continent');
	for (j = 0; j <continents.length; j++) {
		bb = continents[j].textContent.normalizeSpaces();
		objectivesArray[title]._continents.push(bb);
		objectivesArray[title]._required++;
	}
}

function showKillers() {
	var ret="";

	var contSum = [];
	var flashList = [];
	for (var index in countriesArray) {
		var country = countriesArray[index];

		if (country._killer) {
			if (typeof(contSum[country._name])=="undefined") {
				contSum[country._name] = country._neutral;
				flashList[country._name] = country._name;
			} else {
				contSum[country._name] += country._neutral;
				flashList[country._name] += "," + country._name;
			}
		}
	}
	for (var cntnn in contSum) {
		ret += '<span class="clickJump" title="' + flashList[cntnn] + '">' + cntnn.replace(" ","&nbsp;") + "&nbsp[" + contSum[cntnn] + "] </span>";
	}
	return ret;
}

function reinitClock() {
	var response = unsafeWindow.request.responseText;
	if (response && $("#clock").exists()) {
		response = response.split("&");
		var secondsLeft = parseInt(response[3]);
		var targetDate = new Date();
		targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
		countDown(targetDate);
	}
}

function updatePlayerCards(){
	// --- Get Player Card Counts ---
	if (gameSettings.spoils != eBonusCards.NOCARDS) {
		var players = $('#players span[class*=player]');
		players.each(function() {
			var cards = $(this).closest('li').find('span[id*=player_cards]').html();
			playersArray[this.innerHTML]._cards=parseInt(cards,10);
		});
	}
}

function getLoadFullLog() {
	var result = myOptions["loadFullLog" + gameSettings.gamenr];
	if ((typeof(result)) == 'undefined') {
		result = true;
	}
	return result;
}

function getMinFormWidth() {
	var width = myOptions.MinimumFormWidth;
	if (!width) {
		width = 600;
	}
	return width;
}

function getMinFormWidthMap() {
	var width = getMinFormWidth();
	if (typeof(myOptions["MinimumFormWidth:"+mapName])!="undefined") {
		width = myOptions["MinimumFormWidth:" + mapName];
	}
	return width;
}

function checkFloatDice(){
	if (myOptions.floatActions == "On") {
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:4
		});
		if ($('#action-form').exists()) {
			if ($('#from_country').exists()) {
				$('#actionWrapper').css('paddingTop',"24px");
			} else {
				$('#actionWrapper').css('paddingTop',"0px");
			}
		}
	}
}

function showMapInspectDiv(){
	var mapInspectHTML = myOptions.mapInspect ? "Map Inspect: <b><span id=hoverInfo /></b>":"";
	$('#mapinspect').html(mapInspectHTML);
	hoverInfo = $('#mapinspect').find("#hoverInfo");
}

var newfilterTo = unsafeWindow.filterTo;

unsafeWindow.filterTo =
	function(selected) {
		newfilterTo(selected);
		colourCodeDD();
	};

// code to find the country in the drop down.
function findCountry(title){
	var country = countriesArray[title.makeID()];
	if (!country) { // if we can't find the country - then we need to remove the brackets.
		var bracket = title.lastIndexOf("(");
		if (bracket != -1) {
			title = title.substring(0,bracket); // remove stuff after the bracket so that we can find the country OK.
		}
		country = countriesArray[title.trim().makeID()];
	}
	return country;
}

// Colour codes & Adds army counts to the Dropdown. (Note if Colour Codes is off - then sets class name back to default)
function colourCodeDD(){
	cc_log("Color Coding the dropdowns");
	// --- Color Code the TO drop down ---
	$('#to_country option').add('#from_country option').each(function() {
		var cntry = findCountry(this.text);
		if (cntry) {
			var owner = cntry._pid;
			this.innerHTML = cntry._name + " (" + cntry._armies + ")";
			if (myOptions.ccdd=="On") {
				this.className = "playerBGDD"+owner;
			} else {
				this.className = "";
			}
		}
	});
}

function prepareMenuHider(){
	// hide the menu to start with
	hideMenu();
	// add div to show the menu.
	var showDiv = $('<div id="showDiv"></div>').css({
		position:'absolute',
		width:'2.1%',
		left:0,
		top:0,
		height:document.height
	});
	document.body.appendChild(showDiv[0]);
	showDiv.hover(showMenu, hideMenu);
	$('#leftColumn').hover(showMenu, hideMenu);
}

function updateMenuHiderHeight(){
	$("#showDiv").css('height',document.height + 'px');
}

function hideMenu(){
	if(menuIsHidden()) {
		hideSideBar();
	}
}

function showMenu() {
	if(menuIsHidden()) {
		showSideBar();
	}
}

function menuIsHidden() {
	if (myOptions.hideMenu=="On") {
		return true;
	}
	if (myOptions.hideMenu=="Game" && $("#inner-map").exists()) {
		return true;
	}
	if (myOptions.hideMenu=="Site" && !$("#inner-map").exists()) {
		return true;
	}
	return false;
}

function hideSideBar() {
	var leftMenu = $("#leftColumn");
	if (!leftMenu.find('span.inbox').exists()) {
		// Don't hide the menu if you have a PM!
		leftMenu.hide();
		$("#outerColumnContainer").css('borderLeft',"0em solid #DDEEDD");
	}
}

function showSideBar(){
	$("#outerColumnContainer").css("borderLeft", "14em solid #DDEEDD");
	$("#leftColumn").show();
}

function setFormWidth(){
	$('#action-form').width(Math.max(getMinFormWidthMap(), $('#outer-map').width()));
}

function toggleConfDrop() {
	if (myOptions.confirm_drop == "Off") {
		myOptions.confirm_drop = "On";
	} else {
		myOptions.confirm_drop = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_confirm_drop b').html(myOptions.confirm_drop);
	addConfirmDropGameClickHandlers();
}

function toggleGamesTogether() {
	if (myOptions.games_together == 'Off') {
		myOptions.games_together = 'On';
	} else {
		myOptions.games_together = 'Off';
	}
	serialize("OPTIONS", myOptions);
	$('#menu_games_together b').html(myOptions.games_together);
	createGamesTogether();
}

function toggleColourCodeDD() {
	if (myOptions.ccdd == "Off") {
		myOptions.ccdd = "On";
	} else {
		myOptions.ccdd = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_colourcode_dd b').html(myOptions.ccdd);
	colourCodeDD();
}

function toggleFullLog() {
	if (myOptions.fulllog == "Off") {
		myOptions.fulllog = "On";
	} else {
		myOptions.fulllog = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_fulllog b').html(myOptions.fulllog);
}

function toggleSwapAvas() {
	if (myOptions.swapavas == "Off") {
		myOptions.swapavas = "On";
	} else {
		myOptions.swapavas = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_swapavas b').html(myOptions.swapavas);
	swapAvatars();
}

function toggleSmallAvas(){
	if (myOptions.smallavas == "Off") {
		myOptions.smallavas = "On";
	} else {
		myOptions.smallavas = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_smallavas b').html(myOptions.smallavas);
	smallAvatars();
}

function toggleHideSigs(){
	if (myOptions.hidesigs == "Off") {
		myOptions.hidesigs = "On";
	} else {
		myOptions.hidesigs = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hidesigs b').html(myOptions.hidesigs);
	hideSigs();
}


function showContOver() {
	if (myOptions.continent_overview == "On") {
		$("#contOverviewWrapper").show();
		if (num_players<=8) { // only need to do this if players less than or equal to 8.
			rightside.height($('#outer-map').height());
			rightside.css({
				overflow:"auto"
			});
		}
	} else {
		$("#contOverviewWrapper").hide();
		if (num_players<=8) { // only need to do this if players less than or equal to 8.
			rightside.css({
				height:"",
				overflow:"none"
			});
		}
	}
}

function toggleContOver() {
	if (myOptions.continent_overview == "Off") {
		myOptions.continent_overview = "On";
	} else {
		myOptions.continent_overview = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_contoverview b').html(myOptions.continent_overview);
	showContOver();
}
	
function moveChatToTop() {
	var chat = $('#chat');
	if (myOptions.chatOnTop == "On") {
		dashboard.before(chat.prev()).before(chat).before($('form.ccform').not('#action-form'));
	} else {
		$('#middleColumn .insidegame').append(chat.prev()).append(chat).append($('form.ccform').not('#action-form'));
	}
	chat[0].scrollTop = chat[0].scrollHeight;
}

function toggleChatOnTop() {
	if (myOptions.chatOnTop == "On") {
		myOptions.chatOnTop = "Off";
	} else {
		myOptions.chatOnTop = "On";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_chatOnTop b').html(myOptions.chatOnTop);
	moveChatToTop();
}


function toggleFloatingActionForm(){
	// Code below stolen from edthemaster
	var actionForm = $('#action-form');
	var outerRolls = $('#rolls');
	var cards = $('#cards');
	var mapInspect = $('#mapinspect');
	if (myOptions.floatActions == "Off") {
		myOptions.floatActions = "On";
		showMenuOption("menu_hudWidth");
		showMenuOption("menu_hudWidthMap");
		actionForm.css({
			position:'fixed',
			bottom:0,
			zIndex:4
		});
		if (actionForm.exists()) {
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"24px");
			} else {
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append(mapInspect).append(cards.parent().parent().css("backgroundColor","#EEEEEE"));
			actionForm.find('fieldset').append(wrapperDiv);
			setFormWidth();
		}
		outerRolls.css({
			position: 'fixed',
			backgroundColor: "#EEEEEE",
			top: 0,
			zIndex:4
		});
	} else {
		myOptions.floatActions = "Off";
		hideMenuOption("menu_hudWidth");
		hideMenuOption("menu_hudWidthMap");
		if (actionForm.exists()) {
			$('#outer-rolls').parent().before(cards.parent().parent());
			dashboard.after(mapInspect);
			actionForm.css({
				position:'relative',
				bottom:0,
				width:"100%"
			});
		}
		outerRolls.css({
			position: 'relative',
			backgroundColor: "#EEEEEE",
			top: 0
		});
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hud b').html(myOptions.floatActions);
	updateMenuHiderHeight();
}
function toggleTextMapMap() {
	var current = myOptions["textMapType:" + mapName];
	if (!current) {
		myOptions["textMapType:" + mapName] = "Off";
	} else if (current == "Off") {
		myOptions["textMapType:" + mapName] = "Standard";
	} else if (current == "Standard") {
		myOptions["textMapType:" + mapName] = "Extended";
	} else {
		delete myOptions["textMapType:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	var option = $('#menu_textMap_map b');
	if (myOptions["textMapType:" + mapName]) {
		option.html(myOptions["textMapType:" + mapName]);
	} else {
		option.html("Default</b>");
	}
	setTimeout(doTextMap,100);
}

function toggleTextMap() {
	var current = myOptions.textMapType;
	if (current == "Off") {
		myOptions.textMapType = "Standard";
	} else if (current == "Standard") {
		myOptions.textMapType = "Extended";
	} else {
		myOptions.textMapType = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_textMap b').html(myOptions.textMapType);
	setTimeout(doTextMap,100);
}

function doTextMap() {
	updateTextMap();
	updateMagicMap(true);
	updateMenuHiderHeight();
	stopWaiting();
}


function toggleJumpToMap() {
	myOptions.jumptomap = ! myOptions.jumptomap;
	serialize("OPTIONS", myOptions);
	$('#menu_jtm b').html(myOptions.jumptomap ? " On" : " Off");
	if (!myOptions.jumptomap) {
		window.location.hash="top";
	} else {
		window.location.hash="map";
	}
}

function toggleStatsMode() {
	if (myOptions.statsMode == "Off") {
		myOptions.statsMode = "Standard";
	} else if (myOptions.statsMode == "Standard") {
		myOptions.statsMode = "Extended";
	} else {
		myOptions.statsMode = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_stats b').html(myOptions.statsMode);
	$('#showMoreStatsLink').html("scrollable statistics");
	updateStats();
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleSideStats() {
	myOptions.sideStats = !myOptions.sideStats;
	serialize("OPTIONS", myOptions);
	$('#menu_sideStats b').html(myOptions.sideStats?"On":"Off");
	updateSideStats();
}

function updateSideStats() {
	var on = myOptions.sideStats;
	$('#stats').toggle(on).prev().toggle(on);
}

function toggleMagicMap() {
	myOptions.mapInspect = ! myOptions.mapInspect;
	serialize("OPTIONS", myOptions);
	$('#menu_mapInspect b').html(myOptions.mapInspect ? " On" : " Off");
	showMapInspectDiv();
	updateMagicMap(false);
	updateMenuHiderHeight();
	stopWaiting();
}
function toggleLoadFullLog() {
	if (getLoadFullLog()) {
		myOptions["loadFullLog"  + gameSettings.gamenr] = false ;
	} else {
		delete myOptions["loadFullLog"  + gameSettings.gamenr];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_load_full_log b').html(getLoadFullLog()? " Yes" : " No");
}

function toggleConfirmActionsAA() {
	myOptions.confirmAutoAttack = ! myOptions.confirmAutoAttack;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_attack b').html(myOptions.confirmAutoAttack ? " On" : " Off");
}
function toggleConfirmActionsDeploy() {
	myOptions.confirmDeploy = ! myOptions.confirmDeploy;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_deploy b').html(myOptions.confirmDeploy ? " On" : " Off");
}

function toggleConfirmEnds() {
	myOptions.confirmEnds = ! myOptions.confirmEnds;
	serialize("OPTIONS", myOptions);
	$('#menu_conf_phase b').html(myOptions.confirmEnds ? " On" : " Off");
}

function toggleFadeMap() {
	var cur = getMapfade();
	cur = Math.round((cur*10) - 1);
	if (cur >= 11) {
		cur = 1;
	}
	if (cur <= 0) {
		cur = 10;
	}
	myOptions["fadeMap:" + mapName] = cur/10;
	if (myOptions["fadeMap:" + mapName] == myOptions.fadeMap) {
		delete myOptions["fadeMap:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFadeCircles() {
	var cur = getCirclesfade();
	cur += 1;
	if (cur >= 11) {
		cur = 0;
	}
	if (cur < 0) {
		cur = 10;
	}
	myOptions["fadeCircles:" + mapName] = cur;
	if (myOptions["fadeCircles:" + mapName] === 0) {
		delete myOptions["fadeCircles:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_circles_fade b').html(Math.round(cur*10) + '%');
	applyFades();
}

function toggleFormWidth() {
	var cur = getMinFormWidth();
	cur = cur-50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions.MinimumFormWidth = cur;
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidth b').html(cur);
	$('#menu_hudWidthMap b').html(getMinFormWidthMap());
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function toggleFormWidthMap() {
	var cur = getMinFormWidthMap();
	cur = cur-50;
	if (cur >= 1000) {
		cur = 1000;
	}
	if (cur >= 1200 || cur <= 599) {
		cur = 1200;
	}
	myOptions["MinimumFormWidth:" + mapName] = cur;
	if (myOptions["MinimumFormWidth:" + mapName] == myOptions.MinimumFormWidth) {
		delete myOptions["MinimumFormWidth:" + mapName];
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hudWidthMap b').html(cur);
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
}

function resetMap() {
	delete myOptions["fadeMap:" + mapName];
	delete myOptions["fadeCircles:" + mapName];
	$('#menu_fade b').html('100%');
	$('#menu_circles_fade b').html('0%');
	applyFades();
	serialize("OPTIONS", myOptions);
}

function createOption(id, text, func, bgcolour) {
	var option = $('<li></li>');
	var anchor = $('<a href="#"></a>').html(text).attr("id", id).click(function() {
		func();
		return false;
	});
	if (bgcolour) {
		anchor.css("backgroundColor", bgcolour);
	}
	option.append(anchor);
	return option;
}

function hideMenuOption(id) {
	$("#" + id).parent().hide();
}

function showMenuOption(id) {
	$("#" + id).parent().show();
}

function removeMenuOption(id) {
	$("#" + id).parent().remove();
}

function createGameMenu() {
	var ul = setupMenu();
	ul.append(createMapMenu('menu_sub_map', 'Map Options'));
	ul.append(createViewMenu('menu_sub_view', 'View Options'));
	ul.append(createSnapshotMenu('menu_sub_snapshots', 'Snapshots'));
	ul.append(createConfMenu('menu_sub_conf', 'Confirmations'));
	addSiteWideMenuOptions(ul);
}
function createSubmenu(id, text, ul) {
	var sub = $('<li></li>');
	var subAnchor = $('<a href="#"></a>').html(text).attr("id",id);
	sub.append(subAnchor);
	sub.append(ul);
	subAnchor.click(function() {
		var ulToShow = $(this).parent().find('ul');
		ulToShow.slideToggle("slow");
		ulToShow.parent().parent().find('li ul').each(function() {
			if (this != ulToShow[0]) {
				$(this).toggle(false);
			}
		});
		return false;
	});
	return sub;
}

function createSubOption(id, text, func) {
	return createOption(id, text, func, "#77AA77");
}

function createMapMenu(id, text) {
	var ul = $('<ul></ul>');
	ul.append(createSubOption("menu_fade", "Map Opacity: <b>" + Math.round(getMapfade()*100) + '%</b>', toggleFadeMap));
	ul.append(createSubOption("menu_circles_fade", "Circle Whiteness: <b>" + getCirclesfade()*10 + "%</b>", toggleFadeCircles));
	ul.append(createSubOption("menu_textMap_map", "Text Map: <b>" + getTextMapText() + '</b>', toggleTextMapMap));
	ul.append(createSubOption("menu_load_full_log", "Load full log: <b>" + (getLoadFullLog()? " Yes" : " No") + '</b>', toggleLoadFullLog));
	ul.append(createSubOption("menu_map_reset", "Reset Map Options", resetMap));

	ul.hide();
	return createSubmenu(id, text, ul);
}

function createViewMenu(id, text) {
	var ul = $('<ul></ul>');
	ul.append(createSubOption("menu_stats", "Stats: <b>" + myOptions.statsMode + '</b>', toggleStatsMode));
	ul.append(createSubOption("menu_sideStats", "Default stats: <b>" + (myOptions.sideStats? "On":"Off") + '</b>', toggleSideStats));
	ul.append(createSubOption("menu_mapInspect", "Map Inspect: <b>" + (myOptions.mapInspect? " On" : " Off")+ '</b>', toggleMagicMap));
	ul.append(createSubOption("menu_textMap", "Text Map: <b>" + myOptions.textMapType + '</b>', toggleTextMap));
	ul.append(createSubOption("menu_contoverview", "Continent Overview: <b>" + (myOptions.continent_overview )+ '</b>', toggleContOver));
	ul.append(createSubOption("menu_chatOnTop", "Chat on top: <b>" + myOptions.chatOnTop + '</b>', toggleChatOnTop));
	ul.append(createSubOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.append(createSubOption("menu_jtm", "Jump to Map: <b>" + (myOptions.jumptomap ? " On" : " Off")+ '</b>', toggleJumpToMap));
	ul.append(createSubOption("menu_hud", "HUD: <b>" + myOptions.floatActions + '</b>', toggleFloatingActionForm));
	ul.append(createSubOption("menu_hudWidth", "Min HUD Width: <b>"+getMinFormWidth()+'</b>', toggleFormWidth));
	ul.append(createSubOption("menu_hudWidthMap", "Min HUD Width(map): <b>"+getMinFormWidthMap()+'</b>', toggleFormWidthMap));
	ul.append(createSubOption("menu_colourcode_dd", "Colour DropDown: <b>" + myOptions.ccdd + '</b>', toggleColourCodeDD));
	if (myOptions.floatActions == "Off") {
		ul.find("#menu_hudWidth").parent().hide();
		ul.find("#menu_hudWidthMap").parent().hide();
	}
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createConfMenu(id, text){
	var ul = $('<ul></ul>');
	ul.append(createSubOption("menu_conf_phase", "Confirm Phase End: <b>" + (myOptions.confirmEnds ? " On" : " Off")+ '</b>', toggleConfirmEnds));
	ul.append(createSubOption("menu_conf_attack", "Confirm AutoAssault: <b>" + (myOptions.confirmAutoAttack ? " On" : " Off")+ '</b>', toggleConfirmActionsAA));
	ul.append(createSubOption("menu_conf_deploy", "Confirm Deploy: <b>" + (myOptions.confirmDeploy ? " On" : " Off")+ '</b>', toggleConfirmActionsDeploy));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function createSnapshotMenu(id, text){
	var ul = $('<ul></ul>');
	ul.append(createSubOption("menu_takesnap", "Take Snapshot", takeSnapshot));
	ul.append(createSubOption("menu_analyse", "Analyse Snapshot", analyse));
	var refresh = createSubOption("menu_refresh", "Revert To Live", reloadToLive);
	ul.append(refresh);
	ul.append(createSubOption("menu_delete_snaps_game", "Delete game snapshots", deleteGameSnaps));
	ul.append(createSubOption("menu_delete_snaps_finished", "Delete snapshots of finished games", removeFinishedGames));
	ul.append(createSubOption("menu_delete_snaps_all", "Delete all snapshots",deleteAllSnapshots));
	loadSnapshots(refresh);
	ul.hide();
	return createSubmenu(id, text, ul);
}
function createSideSettingsMenu(id, text) {
	var ul = $('<ul></ul>');
	ul.append(createSubOption("menu_fulllog", "Full Log: <b>" + myOptions.fulllog + '</b>', toggleFullLog));
	ul.append(createSubOption("menu_swapavas", "Swap Avatars: <b>" + myOptions.swapavas + '</b>', toggleSwapAvas));
	ul.append(createSubOption("menu_smallavas", "Small Avatars: <b>" + myOptions.smallavas + '</b>', toggleSmallAvas));
	ul.append(createSubOption("menu_hidesigs", "Hide Signatures: <b>" + myOptions.hidesigs + '</b>', toggleHideSigs));
	ul.append(createSubOption("menu_confirm_drop", "Confirm Drop: <b>" + myOptions.confirm_drop + '</b>', toggleConfDrop));
	ul.append(createSubOption("menu_games_together", "Show games together: <b>" + myOptions.games_together + '</b>', toggleGamesTogether));
	ul.append(createSubOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock));
	ul.hide();
	return createSubmenu(id, text, ul);
}

function toggleAutoBob() {
	if (myOptions.autobob == "Off") {
		myOptions.autobob = "On";
	} else {
		myOptions.autobob = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_auto b').html(myOptions.autobob);
}

function toggleHideMenu() {
	if (myOptions.hideMenu == "Off") {
		myOptions.hideMenu = "Game";
	} else if (myOptions.hideMenu == "Game") {
		myOptions.hideMenu = "Site";
	} else if (myOptions.hideMenu == "Site") {
		myOptions.hideMenu = "On";
	} else {
		myOptions.hideMenu = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_hider').html("Hide Menu: <b>" + myOptions.hideMenu + '</b>');
}

function toggleUpdateAvailable(newVersionAvailable) {
	$('#menu_upgrader').html(newVersionAvailable?"<span class='attention'>Update Available</span>":"Latest Version Installed");
}

function toggle24HourClock() {
	if (myOptions["24hourClockFormat"] == "Off") {
		myOptions["24hourClockFormat"] = "am/pm";
	} else if (myOptions["24hourClockFormat"] == "am/pm") {
		myOptions["24hourClockFormat"] = "24h";
	} else {
		myOptions["24hourClockFormat"] = "Off";
	}
	serialize("OPTIONS", myOptions);
	$('#menu_clockformat b').html(myOptions["24hourClockFormat"]);
	updateMyGamesClocks();
	adjustClock();
}

function checkForUpdate() {
	var scriptURL = 'http://www.fileden.com/files/2009/6/24/2488169/conquerclubbobsupport.txt?nocache=' + Math.random();
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptURL,
		onload: checkUpdateNumber
	});
}

function checkUpdateNumber(response) {
	var responseArray = response.responseText.split('\n');
	var serverVersion = "1.1.1";
	for (var line in responseArray ) {
		if ( responseArray[line].match('var versionString = ') ) {
			serverVersion = responseArray[line].split('"')[1];
			break;
		}
	}
	var newVersion = $(serverVersion.split('.')).map(function() {
		return parseInt(this,10);
	});
	var thisVersion = $(versionString.split('.')).map(function() {
		return parseInt(this,10);
	});
	if (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1] || (newVersion[1]==thisVersion[1] && newVersion[2]>thisVersion[2])))) {
		toggleUpdateAvailable(true);
	} else {
		toggleUpdateAvailable(false);
	}
}

function setupMenu() {
	// setup menu headings.
	var gmMenu = $('<div id="bobmenu"></div>');
	var t = $("<h3>BOB Menu <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=91386'> " + versionString + "</a></span></h3>");
	gmMenu.append(t);
	var ul = $('<ul id="bobmenuUl"></ul>');
	gmMenu.append(ul);
	$('#leftColumn').find('ul:first').parent().append(gmMenu);
	return ul;
}

function addSiteMenuOptions(ul) {
	ul.append(createSideSettingsMenu('menu_sub_sitemenu','Site Options'));
}

function addSiteWideMenuOptions(ul) {
	ul.append(createOption("menu_hider", "Hide Menu: <b>" + myOptions.hideMenu + '</b>', toggleHideMenu));
	ul.append(createOption("menu_auto", "Auto BOB: <b>" + myOptions.autobob + '</b>', toggleAutoBob));
	ul.append(createOption("menu_help", "Help/Info", function() {
		showHelp();
	}));
	ul.append(createOption("menu_upgrader", "Latest Version Installed", function(){
		showUpgrade();
	}));
}

function hideSigs() {
	if (location.href.indexOf("mode=viewprofile")==-1) {
		$("#page-body div[class*=signature]").toggle(myOptions.hidesigs!="On");
	}
}

function smallAvatars() {
	var body = $("#page-body");
	if (location.href.indexOf("mode=viewprofile")!=-1 || !body.exists()) {
		return;
	}
	var avas = body.find('dl.postprofile');
	var expand;
	var smallavas = myOptions.smallavas=="On";
	for (var i=0;i<avas.length;i++) {
		var dds = $(avas[i]).find("dd");
		for (var j=0;j<dds.length;j++) {
			var profIcons = $(dds[j]).find('ul[class*=profile]');
			if (!profIcons.exists()) {
				if (dds[j].id) {
					$(dds[j]).find('#expander' + i).val(smallavas?"Expand":"Collapse");
				} else {
					$(dds[j]).toggle(!smallavas);
				}
			}
		}
		if (!dds.find('[id*=expander]').exists()) { // only add if we don't already have a button
			expand = createButtonDD(smallavas?"Expand":"Collapse", i);
			$(avas[i]).append(expand);
		}
	}
}

function expander() {
	var expand = $(this);
	var dds = expand.parent().parent().find('dd');
	dds.each(function() {
		if ($(this).find('.profile-icons').exists() || this.id) {
			return;
		}
		$(this).toggle(expand.val()=="Expand");
	});
	if (expand.val()=="Expand") {
		expand.val("Collapse");
	} else {
		expand.val("Expand");
	}
	return false;
}

function createButtonDD(text, which) {
	var expand = $('<dd></dd>').attr('id', "expanderdd"+which);
	var expandButton = $('<input type="Button" class="button1"></input>').attr('id',"expander"+which);
	expandButton.val(text);
	expandButton.click(expander);
	expand.append(expandButton);
	return expand;
}

function swapAvatars() {
	if (location.href.indexOf("mode=viewprofile")==-1) {
		var body = $("#page-body");
		if (body.exists()) {
			var avas = body.find('dl.postprofile');
			if (myOptions.swapavas=="On") {
				avas.css({
					"float":"left",
					"border-right":"1px solid #FFFFFF",
					"border-left":"0px solid #FFFFFF"
				});
				if (avas.exists()) {
					body.find('div.postbody').css("float", "right");
					body.find('div.online').css('background-position','100% 17pt');
				}
			} else {
				avas.css({
					"float":"left",
					"border-right":"0px solid #FFFFFF",
					"border-left":"1px solid #FFFFFF"
				});
				if (avas.exists()>0) {
					body.find('div.postbody').css("float", "left");
					body.find('div.online').css('background-position','100% 0pt');
				}
			}
		}
	}
}

// function to change game links to load full log.
function updateGameLinks() {
	if (myOptions.fulllog=="On") {
		var hrefs = $('#middleColumn a');
		for (var i=0;i<hrefs.length;i++) {
			var link = hrefs.get(i);
			if (link.href.has("game.php")) {
				link.href += "&full_log=Y";
			}
		}
	}
}

function updateMyGamesClocks() {
	if (location.href.indexOf("mygames")>=0 || location.href.indexOf("mode=next")>=0) { // if in mygames
		if (location.href.indexOf("mygames2")>=0 || location.href.indexOf("mygames3")>=0 || location.href.indexOf("mygames4")>=0) { // but if not in active
			return;
		}
		var elements = $('#middleColumn tr.even,tr.odd').find('td:eq(4)');
		updateMyGamesClock(elements);
	}
}

function updateMyGamesClock(elements) {
	$(elements).each(function (){
		var currentHTML = this.innerHTML;
		var time = currentHTML.split('<br>')[1].split(':');
		var targetDate = new Date();
		var hoursLeft = parseInt(time[0],10);
		var minutesLeft = parseInt(time[1],10) + hoursLeft * 60;
		var secondsLeft = parseInt(time[2],10) + minutesLeft * 60;
		targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
		var additionalClock = $(this).find('.additionalClock');
		if (!additionalClock.exists()) {
			additionalClock = $('<span class="additionalClock"></span>');
			$(this).append('<br />').append(additionalClock);
		}
		additionalClock.html(getAdditionalClockInfo(targetDate));
	});
}

function showHelp() {
	var win = window.open("http://www.hometag.net/downloads/CC/BOB/help_4.6.1.htm","bobHelp","height=600, width=600px, toolbar=no, scrollbars=yes, menubar=no");
	win.focus();
}

function showUpgrade() {
	var win = window.open("http://userscripts.org/scripts/source/52341.user.js","bobUpgrade","height=1, width=1px, toolbar=no, scrollbars=no, menubar=no, resizable=no");
	win.focus();
	win.close();
}

function cc_log (m) {
	console.debug((new Date()).getTime()-startLogTime + " ms:" + m);
}

function padDigits(n, totalDigits){
	n = n.toString();
	var pd = '';
	if (totalDigits > n.length){
		for (i=0; i < (totalDigits-n.length); i++){
			pd += '0';
		}
	}
	return pd + n.toString();
}

function countDown(targetDate) {
	if (myOptions['24hourClockFormat'] !="Off") {
		var additionalClock = $('#additionalClock')
		if (!additionalClock.exists()) {
			additionalClock = $('<span id="additionalClock"></span>');
			$("#clock").after(additionalClock);
		}
		additionalClock.html(' [' + getAdditionalClockInfo(targetDate)+ ']');
	}
}

function getAdditionalClockInfo(targetDate) {
	if (myOptions['24hourClockFormat']=="Off") {
		return "";
	}
	var day = ' @ ';
	var ampm = '';

	var currentDate = new Date();
	if (currentDate.getDate() != targetDate.getDate()) {
		day = "Tomorrow @ ";
	} else {
		day = "Today @ ";
	}
	var hours = targetDate.getHours();
	var minutes = targetDate.getMinutes();
	if (myOptions['24hourClockFormat'] == "am/pm") {
		ampm = " am";
		if (hours >= 12) {
			ampm = " pm";
			hours = hours - 12;
		}
		if (hours === 0) {
			hours = 12;
		}
	}
	var timeDisplay = day + "<b>" + padDigits(hours, 2) + ":" + padDigits(minutes, 2) + ampm + "</b>";
	return timeDisplay;
}

function calcRedemption() {
	if( gameSettings.spoils == eBonusCards.ESCALATING ) {
		if( num_turnins < 5 ) {
			return num_turnins * 2 + 4;
		} else {
			return num_turnins * 5 - 10;
		}
	} else if( gameSettings.spoils == eBonusCards.FLATRATE) {
		return 7;
	}
	return 0; //no cards or nuclear
}

function calcArmiesNextTurn(countries) {
	var ret = 0;
	if (reinforcementsArray.length===0) { // old school.
		if(countries < 12 ) {
			return 3;
		}
		ret = Math.floor(countries/3);
	} else { // new territory array stuff.
		var armiesAwarded = 0;
		for (var i=0;i<reinforcementsArray.length;i++) {
			var lower = reinforcementsArray[i]._lower;
			var upper = reinforcementsArray[i]._upper;
			var divisor = reinforcementsArray[i]._divisor;
			if (countries>=lower) {
				armiesAwarded += Math.floor((Math.min(countries, upper)-(lower-1))/divisor);
			}
		}
		ret = Math.max(armiesAwarded,minimumReinforcements);
	}
	return ret;
}

//---- Returns probability of a turnin - http://www.kent.ac.uk/IMS/personal/odl/riskfaq.htm#3.5 ----
function getTurnInP(num_cards) {
	if( num_cards < 3 ) {
		return 0;
	}
	if( num_cards > 4 ) {
		return 1;
	}
	if( num_cards == 3 ){
		return 0.333333;
	}
	return 0.777778; // has 4 cards
}

// START TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS
// Source: http://www.conquerclub.com/forum/viewtopic.php?t=15620

// Returns the probability of having a set
// when holding the given number of cards.
function getSetProbability(cards) {
	if (cards < 3) {
		return 0;
	}
	if (cards == 3){
		return 0.333333;
	}
	if (cards == 4){
		return 0.777778;
	}
	if (cards >= 5){
		return 1;
	}
	return -1;
}

// Returns the number of armies expected from cashing in
// a set when holding the given number of cards.
function getArmiesFromCardSet(cards) {
	if (gameSettings.spoils != eBonusCards.FLATRATE) {
		return getSetProbability(cards) * calcRedemption();
	} else {
		if (cards < 3) {
			return 0;
		}
		if (cards == 3){
			return 2.888889;
		}
		if (cards == 4){
			return 5.333333;
		}
		if (cards >= 5){
			return 7.333333;
		}
		return -1;
	}
}

// Returns the number of armies received from owning countries.
function getArmiesFromCountries(countries, continentBonus, missedTurns) {
	return (calcArmiesNextTurn(countries) + continentBonus) * (missedTurns + 1);
}

// Returns the estimated number of armies due for cashing in a set
// of cards.
function getEstimatedArmiesFromCards(cards, countries, totalCountries) {
	return getArmiesFromCardSet(cards) + (gameSettings.spoils != eBonusCards.NUCLEAR?(6 * getSetProbability(cards) * (countries / totalCountries)):0);
}

// Returns the calculated strength of a players position rounded to the nearest hundreth.
function getStrength(currentArmies, expectedArmies, countries) {
	return Math.round ((currentArmies + expectedArmies - ((2 / 3) * countries)) * 100) / 100;
}
// END TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS

function getMapfade() {
	var fade = 1;
	if (typeof(myOptions["fadeMap:"+mapName])=="undefined") {
		fade = myOptions.fadeMap;
	} else {
		fade = myOptions["fadeMap:" + mapName];
	}
	// force Opacity to not be 0.
	if (fade===0) {
		return 1;
	} else {
		return fade;
	}
}
function getCirclesfade() {
	var fade = myOptions["fadeCircles:" + mapName];
	if (typeof(fade)=="undefined") {
		fade = 0;
	}
	return fade;
}

function getTextMapText() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return "Default";
	}
	return myOptions["textMapType:" + mapName];
}
	
function getTextMap() {
	if (typeof(myOptions["textMapType:"+mapName])=="undefined") {
		return myOptions.textMapType;
	}
	return myOptions["textMapType:" + mapName];
}

function applyFades() {
	var fade = getCirclesfade()/10;
	var i, country, x, y;
	// no canvas and no fade->no need to create a canvas
	if (fade === 0 && getMapfade() == 1) {
		$('#myCanvas').remove();
		return;
	}
	var canvas = getCanvas();
	canvas.css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	if (fade !== 0) {
		if (canvas[0].getContext) {
			var context = canvas[0].getContext('2d');
			context.clearRect(0,0,canvas.width(),canvas.height());
			context.strokeStyle = "rgba(0,0,0,1)";
			context.fillStyle = "rgba(255,255,255," + fade + ")";
			context.beginPath();
			for (i in countriesArray) {
				country = countriesArray[i];
				x = country.xPos() + 4;
				y = country.yPos() - 22;
				context.moveTo(x, y);
				context.arc(x, y, (mapSize=='L'?12:10), 0, 2 * Math.PI, false);
			}
			context.fill();
		}
	}
}
function getCanvas() {
	var canvas = $('#myCanvas');
	var outerMap = $('#outer-map');
	if (canvas[0]) {
		if (canvas.height() != outerMap.height()) {
			canvas.remove();
		} else {
			return canvas;
		}
	}
	canvas = $('<canvas id="myCanvas"></canvas>').css('background-color', 'rgba(255,255,255,' + (1 - getMapfade()) + ')');
	canvas.attr('height', outerMap.height());
	canvas.attr('width',  outerMap.width());
	canvas.css({
		top:'0px',
		left:'0px',
		zIndex: 1,
		position:'absolute'
	});
	magicmap.prepend(canvas);
	return canvas;
}

function updateTextMap() {
	var wrapper = $('#textMapWrapper');
	if (getTextMap()!="Off") {
		if (getTextMap()=="Standard") {
			$('#textMap').children().remove();
			$('#textMap').html(createTextMap(false));
		} else {
			$('#textMap').children().remove();
			$('#textMap').html(createTextMap(true));
		}
		$('#showMoreLink').click(showMoreTextMap).parent().show();
		wrapper.show();
	} else {
		$('#textMap').children().remove();
		$('#textMap').html("");
		wrapper.hide();
	}
}

function teamNumber(pid) {
	// pid=0->neutrals, otherwise just split them up.
	if (pid==UID || pid === 0) {
		return 0;
	}
	if (gameSettings.type == eGameType.DOUBLES) {
		return Math.ceil(pid/2);
	} else if (gameSettings.type == eGameType.TRIPLES) {
		return Math.ceil(pid/3);
	} else if (gameSettings.type == eGameType.QUADRUPLES) {
		return Math.ceil(pid/4);
	}
	return pid;
}

function isTeamGame() {
	return gameSettings.type == eGameType.DOUBLES || gameSettings.type == eGameType.TRIPLES || gameSettings.type == eGameType.QUADRUPLES;
}

function updateStats() {
	var wrapper = $('#statsWrapper');
	if (myOptions.statsMode == "Off") {
		$('#statsTable').html("");
		wrapper.hide();
	} else {
		if (myOptions.statsMode == "Standard") {
			$('#statsTable').html(createStats(false));
		} else { // Extended
			$('#statsTable').html(createStats(true));
		}
		$('#showMoreStatsLink').click(showMoreStats).parent().show();
		$('#hideEliminated').click(function() {
			$('#statsTable').find('tr.eliminated').toggle();
			if ($(this).html().has("Hide")) {
				$(this).html('Show eliminated players');
			} else {
				$(this).html('Hide eliminated players');
			}
		});
		wrapper.show();
		$("span.popup").hover(function() {
			var div = $('<div id="tempPopup"></div>');
			div.html($(this).attr('data'));
			var pos = $(this).position();
			pos.top = pos.top - 15;
			pos.left = pos.left - 2.5 * $(this).attr('data').length;
			div.css({
				position:'absolute',
				backgroundColor:'white',
				opacity:1,
				top:pos.top,
				left:pos.left
			});
			div.position(pos);
			wrapper.append(div);
		}, function() {
			$('#tempPopup').remove();
		});
		$('#hideConts').click(hideContinents);
	}
}

function getFullLog() {
	var thisLog = $('#log').html().split('<br>'); //Get logs on screen
	//if we aren't at a game-page any more, don't try to get the log
	if (!window.location.toString().has("conquerclub.com/") || !window.location.toString().has("game.php")) {
		return "";
	}
	thisLog.pop();// remove last element, not relevant
	if (currentLog=="" && thisLog[0].has("Game has been initialized") || !getLoadFullLog()) {
		currentLog = thisLog;
	} else if (currentLog=="") {
		var lastSend = new Date();
		var url = test + "/game.php?game=" + unsafeWindow.game.value + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
		cc_log("requesting full log");
		var response;
		$.ajax({
			url: url,
			success: function(result) {
				response = result.split("&");
			},
			error: function() {
				turnOffFullLog();
			},
			async: false
		});
		if (typeof(response)=="undefined") {
			currentLog = thisLog;//best guess we have.
		} else {
			currentLog = unescape(response[15]).split('<br />');
		}
	} else {
		for (var i=logLength;i<thisLog.length;i++) {
			currentLog.push(thisLog[i]);
		}
	}
	logLength = thisLog.length;
	return currentLog;
}

function turnOffFullLog() {
	var failureMsg = "Log Downloading Failed - Would you like to retry?";
	if (confirm(failureMsg)) {
		location.href = location.href + "&full_log=Y";
	}
}

// the following are the major functions for this script.

function processLog(start, init, showProgress, end) {
	if (showProgress) {
		customStartWaiting("Processing Log");
	}
	var log = getFullLog();
	cc_log("Starting Log Processing");
	var name, player;
	if (end) {
		start=0;
		init=true;
	}
	if (!init) {
		rounds = stored_rounds;
		num_turnins = stored_num_turnins;
		for (name in playersArray) {
			player = playersArray[name];
			player._skipped = stored_skipped[player._pid];
			player._total_skipped = stored_total_skipped[player._pid];
			player._total_skipped = stored_total_skipped[player._pid];
			player._lastTerritoryBonus = stored_lastTerritoryBonus[player._pid];
			player._lastContinentBonus = stored_lastContinentBonus[player._pid];
			player._points = stored_terminator_counter[player._pid];
			if (gameSettings.fog) {
				player._calculatedCountries = stored_countries[player._pid];
			}
		}
		TerminatorSummary = stored_terminator_summary;
	} else {
		rounds = stored_rounds = 0;
		num_turnins = stored_num_turnins = 0;
		for (name in playersArray) {
			player = playersArray[name];
			player._skipped = stored_skipped[player._pid] = 0;
			player._total_skipped = stored_total_skipped[player._pid] = 0;
			player._lastTerritoryBonus = stored_lastTerritoryBonus[player._pid] = 0;
			player._lastContinentBonus = stored_lastContinentBonus[player._pid] = 0;
			player._armiesLastTurn = stored_armiesLastTurn[player._pid] = 0;
			player._points = stored_terminator_counter[player._pid] = 0;
			if (gameSettings.fog) {
				player._calculatedCountries = stored_countries[player._pid] = 0;
			}
		}
		TerminatorSummary = stored_terminator_summary = "";

		if (gameSettings.fog) {
			var np = num_players;
			if (np==2) {
				np=3;
			}
			var startingTerrs = 0;
			var extra = 0;
			if (totalPositions > 0) {
				if ( totalPositions >= num_players) {
					startingTerrs = ((totalPositionCountries / totalPositions) * Math.floor(totalPositions/num_players));
				}
				var unusedPositions = totalPositions%num_players;
				extra = (unusedPositions * startCountriesInPosition)/totalPositions;
			}

			startingTerrs += Math.floor((totalStartCountries + extra) / np);
			for (name in playersArray) {
				if (name!="Neutral") {
					playersArray[name]._calculatedCountries = startingTerrs;
				}
			}
		}
	}

	//-------------------------------------------------------------------------
	// LOGGING PATTERNS
	//-------------------------------------------------------------------------
	var str_receiveCard = " got spoils";
	var str_outOfTime = " ran out of time";
	var str_fortified = " reinforced ";
	var str_deployed = " deployed ";
	var str_attacked = " assaulted ";
	var str_conquered = "conquered";
	var str_neutralPlayer = "neutral player";
	var str_bombarded = " bombarded ";
	var str_missedTurn = " missed a turn";
	var str_cashed = " cashed";
	var str_eliminated = " eliminated ";
	var str_holding = " holding ";
	var str_deferred = " deferred ";
	var str_armiesFor = "troops for";
	var str_territories = "regions";
	var str_annihilated = "annihilated";
	var str_receives = "received";
	var str_armies = "troops";
	var str_lost = " lost ";
	var str_gained = " gained ";
	var str_points = "points";
	var str_kickedOut = " was kicked out ";
	var str_incrementedRound = "Incrementing game to round";
	var str_initGame = "Game has been initialized";
	var str_autoDeploy = " got bonus of ";
	var str_wonGame = "won the game";

	var lossname, armies ;
	/*---- Process Log ----*/
	for(var i = start; i < log.length; i++ ) {
		var line = log[i];
		if (end) {
			var dateParts = line.split(" - ")[0].split(" ");
			if (dateParts[0]) {
				var dArray = dateParts[0].split("-");//holds the date, dd-mm-yy
				if (dateParts[1]) {
					var tArray = dateParts[1].split(":");//holds the time, hh:mm:ss
					var dateStr2 = Date.UTC(dArray[0], dArray[1] - 1/* months start with 0*/, dArray[2], tArray[0], tArray[1], tArray[2]);
					if (dateStr2 >= end.getTime()) {
						break;
					}
				}
			}
		}
		// ID the player
		name = line.split(/<[^>]*>/)[1];
		player = playersArray[name];
		var neutral = false;

		if (!player && line.has('<span class="player')) {
			// Player Rename mid game?
			var num = parseInt(line.split(/"/)[1].split(/player/)[1], 10);
			if (num!==0) {
				name = pIndxs[num-1].innerHTML;
				player = playersArray[name];
			}
			else {
				neutral = true;
			}
		}
		if (neutral) {
			continue;
		}
		// Process the log
		if( line.has(str_receiveCard)|| line.has(str_outOfTime) || line.has(str_fortified)){
			player._skipped = 0;
			player._deferred = 0;
		} else if(line.has(str_deployed) ) {
			player._skipped = 0;
		} else if(line.has(str_attacked)) {
			player._skipped = 0;
			if (gameSettings.fog) { //add 1 to player who conquered
				player._calculatedCountries++;
				// then minus 1 from player who lost, if not neutral
				var conquered = line.substring(line.indexOf(str_conquered));
				lossname = conquered.split(/<[^>]*>/)[1];
				if (!playersArray[lossname] && conquered.has('<span class="player')) {
					// Player Rename mid game?
					var numb = parseInt(conquered.split(/"/)[1].split(/player/)[1], 10);
					if (numb!==0) {
						lossname = pIndxs[numb-1].innerHTML;
					}
				}
				if (lossname!=str_neutralPlayer) {
					playersArray[lossname]._calculatedCountries--;
				}
			}
		} else if(line.has(str_bombarded)) {
			player._skipped = 0;
			if (gameSettings.fog) {
				var bombarded = line.substring(line.indexOf(str_annihilated));
				lossname = bombarded.split(/<[^>]*>/)[1];
				if (!playersArray[lossname] && bombarded.has('<span class="player')) {
					// Player Rename mid game?
					var numbr = parseInt(bombarded.split(/"/)[1].split(/player/)[1], 10);
					if (numbr!==0) {
						lossname = pIndxs[numbr-1].innerHTML;
					}
				}
				if (lossname!=str_neutralPlayer) { // don't minus from neutral player.
					playersArray[lossname]._calculatedCountries--;
				}
			}
		} else if( line.has(str_missedTurn) ){
			player._skipped += 1;
			player._total_skipped += 1;
		} else if( line.has(str_cashed) ){
			player._skipped = 0;
			num_turnins++;
			player._isHandingInCards = true;
		} else if( line.has(str_eliminated) ) {
			player._skipped = 0;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
		} else if (line.has(str_autoDeploy)) {
			if (!player._isHandingInCards) {
				if (player._lastBonusFixed) {
					player._lastTerritoryBonus = 0;
					player._armiesLastTurn = 0;
					player._lastContinentBonus = 0;
					player._lastBonusFixed = false;
				}
				armies = parseInt(/got\sbonus\sof\s(-?\d+)\stroops/.exec(line)[1],10);
				if (armies > 0) {
					player._lastTerritoryBonus += armies;
				}
			}
		} else if( line.has(str_receives) ) {
			if(gameSettings.fog && !line.has(str_holding) && !line.has(str_deferred)) { // territory count calculation we know this is correct thus force correction.
				var terrCount = line.substring(line.indexOf(str_armiesFor)+11,line.indexOf(str_territories)-1);
				terrCount = parseInt(terrCount,10);
				player._calculatedCountries = terrCount;
				player._isHandingInCards = false;
			}
			player._skipped = 0; // Copied from above as receives was previously checked for and did this.
			//calculate how many armies received, and add to last bonus.
			if (player._lastBonusFixed) {
				player._lastTerritoryBonus = 0;
				player._armiesLastTurn = 0;
				player._lastContinentBonus = 0;
				player._lastBonusFixed = false;
			}
			armies = line.substring(line.indexOf(str_receives)+8,line.indexOf(str_armies)-1);
			armies = parseInt(armies,10);
			if (line.has(str_deferred)) {
				player._deferred = armies;
			} else {
				if (line.has(str_holding)) {
					player._lastContinentBonus += armies;
				} else {
					player._armiesLastTurn += armies;
				}
			}
		} else if(line.has(str_lost)) {
			if (!line.has(str_points)) {
				if (gameSettings.fog) {
					player._calculatedCountries--;
				}
			} else {
				player._deferred = 0;
				TerminatorSummary += line + " in round - "+rounds+"<br/>";
				var pointsLost = line.substring(line.indexOf(str_lost)+str_lost.length,line.indexOf(str_points)-1);
				pointsLost = parseInt(pointsLost,10);
				player._points -= pointsLost;
			}
		} else if( line.has(str_gained) ){
			player._skipped = 0;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			var points = line.substring(line.indexOf(str_gained)+str_gained.length,line.indexOf(str_points)-1);
			points = parseInt(points,10);
			player._points += points;
		} else if(line.has(str_kickedOut)) {
			player._skipped = -1;
			TerminatorSummary += line + " in round - "+rounds+"<br/>";
			if (gameSettings.fog && isTeamGame()) {
				//work out where the armies go to after DB gives territories to team mate.
				var togo = calculateBenficiary(name);
				if (togo!="-1") {
					playersArray[togo]._calculatedCountries+=player._calculatedCountries;
				}
				player._calculatedCountries = 0;
			} else if (gameSettings.type != eGameType.TERMINATOR) { // if player kicked out and not terminator then blat this to 0.
				player._calculatedCountries = 0;
			}
		} else if( line.has(str_incrementedRound) || line.has(str_initGame) ) {
			stored_rounds = rounds++;
			// update starter place - and stored vars.
			logFixed=i;
			stored_num_turnins = num_turnins;
			stored_skipped = [];
			stored_total_skipped = [];
			stored_lastTerritoryBonus = [];
			stored_lastContinentBonus = [];
			stored_armiesLastTurn = [];
			stored_terminator_counter = [];
			if (gameSettings.fog) {
				stored_countries = [];
			}
			for (name in playersArray) {
				player = playersArray[name];
				stored_skipped.push(player._skipped);
				stored_total_skipped.push(player._total_skipped);
				stored_lastTerritoryBonus.push(player._lastTerritoryBonus);
				stored_lastContinentBonus.push(player._lastContinentBonus);
				stored_armiesLastTurn.push(player._armiesLastTurn);
				player._lastBonusFixed = true;
				player._deferred = 0;
				stored_terminator_counter.push(player._points);
				if (gameSettings.fog) {
					stored_countries.push(player._calculatedCountries);
				}
			}
			stored_terminator_summary = TerminatorSummary;
		} else if (line.has(str_wonGame)) {
			showDeleteAll = true;
			if (!end && !start) {
				logFixed=i+1; // Only show this on initial load.
			}
		}
	} // end of processing loops
	cc_log("Log Processing Info - Length :" + log.length);
	var termDiv = $('#summary');
	if (!termDiv.exists()) {
		termDiv = $('<div id="summary"></div>');
		$('#termWrapper').append(termDiv);
	}
	termDiv.html(TerminatorSummary + extraTerminatorInfo());
}

function extraTerminatorInfo() {
	var termCounter = "<b>Points Totals</b><br/>";
	var found = false;
	for (var name in playersArray) {
		var player = playersArray[name];
		if (player._pid!==0 && player._pid!=UID) {
			var nameStr = "<span class='playerBG"+ player._pid +"'>"+name+"</span>";
			termCounter += nameStr+" scored <b>"+player._points+"</b> points in this game<br/>";
			if (player._points!==0) {
				found = true;
			}
		}
	}
	return found?termCounter:"";
}

function calculateBenficiary(name) {
	var curPlayer = playersArray[name];
	var curTeam = teamNumber(curPlayer._pid);
	for (var otherName in playersArray) { // loop through from top to bottom.
		var possPlayer = playersArray[otherName];
		if (possPlayer._pid != curPlayer._pid) { // ensure not the same player.
			if (teamNumber(possPlayer._pid)==curTeam) { // ensure on the same team.
				if (possPlayer._skipped!=-1) { // ensure teammate not a DB already!
					return otherName;
				}
			}
		}
	}
	return "-1";
}

function hideContinents() {
	var button = $("#hideConts");
	var title = $("#conts");
	if (button.val() == "Hide") {
		button.val("Show");
		title.css('color',"#999999");
	} else {
		button.val("Hide");
		title.css('color',"#000000");
	}
	$(".continents").toggle();
}

function createStats(extended) {
	var tmp = "";
	var unk = "";

	var toReturn = "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' class='listing' rules=rows><thead><tr style='font-weight:normal;' ><th><b>P</b>layer&nbsp;</th>" + (gameSettings.spoils?"<th><b>S</b>poils&nbsp;</th>":"" )+"<th><b>M</b>issed<br><b>T</b>urns&nbsp;";
	toReturn += (extended? "(Total)":"") + "</th><th><b>T</b>roops&nbsp;</th><th><b>R</b>egions&nbsp;" + (gameSettings.fog?"[Calc]":"") + "</th>";
	if (extended) {
		toReturn += "<th><b>S</b>trength&nbsp;</th><th><b>L</b>ast<br><b>B</b>onus&nbsp;</th><th><b>T</b>roops due<br>(<b>R</b> + <b>Z</b> + <b>RB</b>)&nbsp;</th><th><b>D</b>eferred<br><b>T</b>roops&nbsp;</th>" + ((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR)?"<th><b>S</b>poils <br><b>E</b>stimate&nbsp;</th>":"" );
	} else {
		toReturn += "<th><b>L</b>ast<br><b>B</b>onus&nbsp;</th><th><b>T</b>roops<br><b>D</b>ue&nbsp;</th><th><b>D</b>eferred<br><b>T</b>roops&nbsp;</th>";
	}
	toReturn += "<th><span id='conts'><b>Z</b>ones&nbsp;</span><input type='button' value='Hide' id='hideConts'></th></tr></thead><tbody id=statsbody>";

	var LastTeamID = -1;
	var teamArmies = 0;
	var teamTerritories = 0;
	var teamCalcedTerrs = 0;
	var teamStrength =0;
	var teamID = 0;
	var pid, pctCalcCountries, pctArmies, pctCountries, curpid,nameStr,isEliminated;

	for(var name in playersArray ) {
		var player = playersArray[name];
		var tid = teamNumber(player._pid);
		if (tid!==0) {
			teamID = tid;
		}
		if (isTeamGame() && LastTeamID != -1 && LastTeamID != teamID && name!="Unknown") {
			pctArmies = Math.round(teamArmies*100/totalArmies);
			pctCountries = Math.round(teamTerritories*100/totalCountries);
			pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);

			curpid = 0;
			nameStr = "Team " + LastTeamID;
			isEliminated = false;
			if (LastTeamID !== 0 ) {
				toReturn += "<tr class='playerBG" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" + (gameSettings.spoils? "<td></td>" :"") + "<td></td>";
				if (extended) {
					toReturn += "<td>" + teamArmies +" ( " + pctArmies +"% )</td>";
					toReturn += "<td>" + teamTerritories + " ( " + pctCountries +"% )" + (gameSettings.fog?" ["+teamCalcedTerrs+" (" + pctCalcCountries +"%) ]":"") + "</td>" ;
					toReturn += "<td>" + roundNumber(teamStrength, 2) + "</td><td></td><td></td><td></td></tr>\n";
				} else {
					toReturn += "<td>" + teamArmies + "</td><td>" + teamTerritories + (gameSettings.fog?" ["+teamCalcedTerrs+"]":"") + "</td><td></td><td></td></tr>\n";
				}
			}
			teamArmies = 0;
			teamTerritories = 0;
			teamStrength =0;
			teamCalcedTerrs = 0;
		}

		curpid = player._pid;
		nameStr = '<span class="ClickPlayerJumper">'+name+'</span>';

		var cardStr = gameSettings.spoils ? '<img width="18px" height="16px" title="' + player._cards +
		' Bonus Cards" alt="' + player._cards + ' Bonus Cards" class="icon3" src="http://static.conquerclub.com/cards.gif"/>' + player._cards + ' '
		: '';

		pctArmies = (totalArmies!==0)?Math.round(player._armies*100/totalArmies):0;
		pctCountries = Math.round(player._countries*100/totalCountries);
		pctCalcCountries = Math.round(player._calculatedCountries*100/totalCountries);
		var numArmiesNextTurn = ( player._pid )?calcArmiesNextTurn(player._countries):0;
		if (gameSettings.fog) {
			numArmiesNextTurn = ( player._pid )?calcArmiesNextTurn(player._calculatedCountries):0;
		}
		isEliminated = (player._skipped == -1) || (player._countries === 0 && player._calculatedCountries === 0);
		// strength = Armies + PotentialArmies - 2*Countries/3
		var pl_Strength = Math.round( ( player._armies + (((numArmiesNextTurn + player._continentBonus + player._territoryBonus)*(player._skipped+1))) + (getTurnInP(player._cards) * RedemptionValue) - (2*player._countries/3) ) * 100 )/100;

		var currentArmies = player._armies;
		var cards = player._cards;
		var countries = player._countries;
		var calced_countries = player._calculatedCountries;

		if (curpid!=UID) {
			teamArmies += currentArmies;
			teamTerritories += countries;
			teamCalcedTerrs += calced_countries;
			teamStrength += pl_Strength;
		}

		var estimatedArmiesFromCards = Math.round(getEstimatedArmiesFromCards(cards, countries, totalCountries) * 100) / 100;
		if(curpid) { // if not neutral
			if (curpid!=UID) { // if not UNKNOWN
				toReturn += "<tr class='playerBG" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" + (gameSettings.spoils? "<td>" + cardStr + "</td>" :"" );
				if (extended) {
					toReturn += "<td>" + player._skipped+"&nbsp;("+player._total_skipped+")</td><td>" + player._armies +" ( " + pctArmies +"% )" + "</td>";
					toReturn += "<td>" + player._countries + " ( " + pctCountries +"% )" + (gameSettings.fog? " [ "+player._calculatedCountries+" (" + pctCalcCountries +"%) ]":"")+ player.killToReduce() + "</td>";
					toReturn += "<td>" + pl_Strength + "</td><td><span class='popup' data='("+ player._armiesLastTurn +" + " + player._lastContinentBonus + " + " + player._lastTerritoryBonus + ")'>" + (player._armiesLastTurn + player._lastContinentBonus) + "</span></td><td>" + "("+ numArmiesNextTurn +" + " + player._continentBonus + " + " + player._territoryBonus + ") = ";
				} else {
					toReturn += "<td>" + player._skipped + "</td><td>" + player._armies + "</td>";
					toReturn += "<td>" + player._countries + (gameSettings.fog? " [ "+player._calculatedCountries+" ]":"") + "</td>";
					toReturn += "<td>" + (player._armiesLastTurn + player._lastContinentBonus) + "</td><td>";
				}
				toReturn += (numArmiesNextTurn + player._continentBonus + player._territoryBonus) + "</td>";
				if (player._skipped===0) {
					toReturn += "<td>" + player._deferred + "</td>";
				} else {
					toReturn += "<td>" + ((numArmiesNextTurn + player._continentBonus)*(player._skipped)) + "</td>";
				}
				if (extended) {
					toReturn += ((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR)? "<td>" + estimatedArmiesFromCards + "</td>" : "");
				}
				toReturn += "<td class='continents'>" + player.ContinentsDisplay() + "</td></tr>\n";
			} else {
				pid = playersArray.Neutral._pid;
				unk += "<tr class='playerBG"+ pid +"'><td>"+ nameStr + "</td>" +
				( gameSettings.spoils?"<td></td>":"" ) + "<td></td><td>";
				if (extended) {
					unk += player._armies +" ( " + pctArmies +"% )</td><td>"+ player._countries + " ( " + pctCountries +"% )</td><td></td>" + (gameSettings.spoils ?"<td></td>":"");
				} else {
					unk += player._armies +" </td><td>"+ player._countries + "</td>";
				}
				unk += "<td></td><td></td><td></td></tr>\n";
			}
		} else { //neutral
			tmp = "<tr class='playerBG"+ player._pid +"'><td>"+ nameStr + "</td>" +
			( gameSettings.spoils?"<td></td>":"" )+ "<td></td><td>" + player._armies;
			if (extended) {
				tmp += " ( " + pctArmies +"% )</td><td>"+ player._countries + " ( " + pctCountries +"% )</td>" +
				"<td>"+ pl_Strength +"</td>" +
				((gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR) ?"<td></td>":"" );
			} else {
				tmp += "</td><td>"+ player._countries + "</td>";
			}
			tmp += "<td></td><td></td><td></td><td>"+showKillers()+"</td></tr>\n";
		}
		LastTeamID = teamID;
	}
	if (isTeamGame()) {
		pctArmies = (totalArmies!==0)?Math.round(teamArmies*100/totalArmies):0;
		pctCountries = Math.round(teamTerritories*100/totalCountries);
		pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);

		curpid = 0;
		nameStr = "Team " + teamID;
		isEliminated = false;

		toReturn += "<tr class='playerBG" + curpid + (isEliminated?" eliminated":"") + "'><td>" + nameStr + "</td>" +
		(gameSettings.spoils? "<td></td>" :"" ) + "<td></td><td>" + teamArmies + (extended?" ( " + pctArmies +"% )":"") + "</td>";
		if (extended) {
			toReturn += "<td>" + teamTerritories + " ( " + pctCountries +"% )" + (gameSettings.fog?" ["+teamCalcedTerrs+" (" + pctCalcCountries +"%) ]":"");
			toReturn += "</td><td>" + roundNumber(teamStrength, 2) + "</td><td>";
		} else {
			toReturn += "<td>" + teamTerritories + (gameSettings.fog?" ["+teamCalcedTerrs+"]":"" );
		}
		toReturn+= "</td><td></td><td></td></tr>\n";
	}
	toReturn += unk + tmp; //neutral & Unknowns

	toReturn+="</tbody>";
	if (extended) {
		toReturn += "<tfoot><tr style='font-weight:bold;color:#000;'><td>Totals</td>" + ( gameSettings.spoils?"<td></td>":"" )+"<td></td><td>" + totalArmies + " ( 100% )</td><td>" + totalCountries + " ( 100% )</td><td> - </td>" + ( (gameSettings.spoils && gameSettings.spoils != eBonusCards.NUCLEAR) ?"<td> - </td>":"" )+"<td> - </td></tr></tfoot>\n";
	}
	toReturn+= "</table>";
	return toReturn;
}

function roundNumber(num, dec) {
	return Math.round( Math.round( num * Math.pow( 10, dec + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10,dec);
}

function whatever() {
	var log = getFullLog();
	var i;
	var territoriesPerPlayer = [];
	for (i in playersArray) {
		territoriesPerPlayer.push([]);
	}
	for (i in countriesArray) {
		var country = countriesArray[i];
		territoriesPerPlayer[country._pid].push(i);
	}
	for (i = log.length - 1;  i > -1; i--) {
		var line = log[i];
		line = line.replace(/\&uuml\;/g,'ü');
		line = line.replace(/\&auml\;/g,'ä');
		var data = /<span\sclass="player(.)">.+<\/span>\sassaulted\s(.+)\sfrom\s(.+)\sand\sconquered\sit\sfrom\s<span\sclass="player(.)">.+<\/span>/.exec(line);
		if (data) {
			removeFromArray(data[2].makeID(), territoriesPerPlayer[data[1]]);
			territoriesPerPlayer[data[4]].push(data[2].makeID());
		}
		data = /<span\sclass="player(.)">.+<\/span>\sbombarded\s(.+)\sfrom\s(.+)\sand\sannihilated\s<span\sclass="player(.)">.+<\/span>/.exec(line);
		if (data) {
			removeFromArray(data[2].makeID(), territoriesPerPlayer[0]);
			territoriesPerPlayer[data[4]].push(data[2].makeID());
		}

	}
	startColoringCountries(territoriesPerPlayer);
}
function startColoringCountries(territoriesPerPlayer) {
	var canvas = getCanvas();
	if (canvas[0].getContext) {
		var context = canvas[0].getContext('2d');
		colorCountries(context, territoriesPerPlayer);
		startMovement(context, territoriesPerPlayer, 0);
	}
}
function colorCountries(context, territoriesPerPlayer) {
	var i,j, x,y,country;
	var canvas = getCanvas();
	context.clearRect(0,0,canvas.width(),canvas.height());
	context.strokeStyle = "rgba(0,0,0,1)";
	for (i = 0; i < territoriesPerPlayer.length; i++) {
		context.beginPath();
		context.fillStyle = col0[i];
		for (j = 0; j < territoriesPerPlayer[i].length; j++) {
			country = countriesArray[territoriesPerPlayer[i][j].makeID()];
			x = country.xPos() + 4;
			y = country.yPos() - 22;
			context.moveTo(x + (mapSize=='L'?12:10), y);
			context.arc(x, y, (mapSize=='L'?12:10), 0, 2 * Math.PI, false);

		}
		context.fill();
		context.stroke();
	}
}
function startMovement(context, territoriesPerPlayer, start) {
	var log = getFullLog();
	var i;
	for (i = start;  i < log.length; i++) {
		var line = log[i];
		line = line.replace(/\&uuml\;/g,'Ã¼');
		line = line.replace(/\&auml\;/g,'Ã¤');
		var data = /<span\sclass="player(.)">.+<\/span>\sassaulted\s(.+)\sfrom\s(.+)\sand\sconquered\sit\sfrom\s<span\sclass="player(.)">.+<\/span>/.exec(line);
		if (data) {
			removeFromArray(data[2].makeID(), territoriesPerPlayer[data[4]]);
			territoriesPerPlayer[data[1]].push(data[2].makeID());
			context.beginPath();
			var countryFrom = countriesArray[data[3].makeID()];
			var countryAttacked = countriesArray[data[2].makeID()];
			var x = countryAttacked.xPos() + 4;
			var y = countryAttacked.yPos() - 22;
			var drawPoints = getPointsToDrawFrom(countryFrom.xPos() + 4,countryFrom.yPos() - 22, x, y);
			context.save();
			context.strokeStyle = col0[data[1]];
			context.lineWidth = 7;
			context.moveTo(drawPoints[0], drawPoints[1]);
			context.lineTo(drawPoints[2], drawPoints[3]);
			context.stroke();
			context.restore();
			window.setTimeout(continueMovement, 800, i, context, territoriesPerPlayer);
			break;
		}
		data = /<span\sclass="player(.)">.+<\/span>\sbombarded\s(.+)\sfrom\s(.+)\sand\sannihilated\s<span\sclass="player(.)">.+<\/span>/.exec(line);
		if (data) {
			removeFromArray(data[2].makeID(), territoriesPerPlayer[0]);
			territoriesPerPlayer[data[4]].push(data[2].makeID());
		}
	}
}

function continueMovement(i, context, territoriesPerPlayer) {
	colorCountries(context, territoriesPerPlayer);
	startMovement(context, territoriesPerPlayer, i + 1);
}

function getPointsToDrawFrom(x,y,x2,y2){
	var dX = x2 - x;
	var dY = y2 - y;
	var length = Math.sqrt(dX*dX + dY*dY);
	var toReturn = [];
	toReturn[0] = x + (mapSize=='L'?12:9) * (dX/length);
	toReturn[1] = y + (mapSize=='L'?12:9) * (dY/length);
	toReturn[2] = x2 - (mapSize=='L'?12:9) * (dX/length);
	toReturn[3] = y2 - (mapSize=='L'?12:9) * (dY/length);
	return toReturn;
}

function analyseMap(override) {
	var aa = override;
	if (!aa) {
		aa = unsafeWindow.gameArmies.innerHTML;
	}
	// store live version in here always.
	liveSnapshotArray = unsafeWindow.gameArmies.innerHTML.replace(/-/g,"~").split(/armies=|,|~|" alt="/);
	// replace all occurences of - with ~ -> this means we can split the array easily.
	armiesArr = aa.replace(/-/g,"~").split(/armies=|,|~|" alt="/);
	var tmpArmies = []; //temp holding for armies
	var tmpCountries = []; //temp holding for countries
	var i, pid;
	for(i in playersArray ){
		tmpArmies.push(0);
		tmpCountries.push(0);
	}
	totalCountries = 0;
	totalArmies = 0;

	//Get individual scores
	for(i = 0; i < armiesArr.length-1;i+=2 ) {
		if (armiesArr[i]=="?") {
			pid = UID;
			tmpCountries[pid]++;
		} else {
			pid = parseInt(armiesArr[i], 10);
			tmpArmies[pid]+= parseInt(armiesArr[i+1], 10);
			tmpCountries[pid]++;
		}
	}

	i = 0;
	for (var name in playersArray ) {
		var player = playersArray[name];
		totalArmies += tmpArmies[i];
		player._armies = tmpArmies[i];
		totalCountries = totalCountries+tmpCountries[i];
		player._countries = tmpCountries[i++];
		// init ownership and bonuses out for all players.
		player._continents = [];
		player._continentBonus = 0;
		player._territoryBonus = 0;
	}

}

function updateCountries() {
	var i=0;
	for (var countryIndex in countriesArray) {
		var country = countriesArray[countryIndex];
		var pid;
		if (armiesArr[i*2]=="?") {
			pid = UID;
		} else {
			pid = parseInt(armiesArr[i*2], 10);
		}
		var amrs = armiesArr[(i*2)+1];
		country._pid = pid;
		country._armies = amrs;
		if (country._bonus!==0 && pid>=0 && pid != UID) {
			for (var name in playersArray ) {
				var player = playersArray[name];
				if (pid == player._pid) {
					if (country._bonus<0) {
						if ((parseInt(country._armies,10)+country._bonus)>1) { // if decay leaves more than 1 then bonus stands.
							player._territoryBonus = player._territoryBonus + country._bonus;
						} else { // if decay goes beyond 1 then the bonus is negative the rest plus 1.
							player._territoryBonus = (player._territoryBonus - country._armies)+1;
						}
					} else { // if positive always happens.
						player._territoryBonus = player._territoryBonus + country._bonus;
					}
				}
			}
		}
		i++;
	}
}

function updateObjectives() {
	var owner, objSummary = "";
	for (var obj in objectivesArray) {
		var objective = objectivesArray[obj];
		objective._owner=-1;
		var obSummary = "", i, name;

		objective.clearOwners(); // empty continent of owners before processing

		var pids = [];
		for (name in playersArray) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < objective._countrys.length; i++ ) {
			var country = countriesArray[objective._countrys[i]];
			pids[country._pid]++;
			obSummary += country.displayString();
		}
		for (i = 0; i < objective._continents.length; i++ ) {
			var continent = continentsArray[objective._continents[i]];
			for (owner in continent._owners) {
				pids[continent._owners[owner]]++;
				var obOwnerSumm = '<span ' + txtMapSmallOwner + '><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span>&nbsp;';
				obSummary += obOwnerSumm;
			}
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=objective._required) {
				for(name in playersArray) {
					if (playersArray[name]._pid == i) {
						objective._owners.push(i);
					}
				}
			}
		}

		if (objective._owners.length>0) {
			for (owner in objective._owners) {
				for (name in playersArray) {
					if (playersArray[name]._pid == objective._owners[owner]) {
						objSummary += '<br><span class="playerBG' + objective._owners[owner] + '">'+objective._name+" ==> </span>";
						objSummary += obSummary + '<span class="playerBG' + objective._owners[owner] + '">'+" - Held by "+name+"</span><br/>";
					}
				}
			}
		} else {
			objSummary += "<br><span>"+objective._name+" ==> </span>";
			objSummary += obSummary;
		}
	}
	if (objSummary.length === 0) {
		return;
	}
	var objWrapperDiv = $('#objectives');
	if (!objWrapperDiv[0]) {
		objWrapperDiv = $('<div id="objectives"><h3>Objective Summary</h3></div>')
		.css("margin",'10px 0 0 0').css("display",'inline');
		var objDiv =$('<div id="objectivessummary"></div>').css({
			margin:'10px 0 0 0',
			backgroundColor: "#EEEEEE"
		});
		objWrapperDiv.append(objDiv);
		$('#full-log').after(objWrapperDiv);
	}
	var objectiveDiv = objWrapperDiv.find('#objectivessummary');
	objectiveDiv.html(objSummary);
}

// a three phase function.
// First loop through all the continents to see if who they are owned by.
// Next loop through all the continents to see if any should be overriden.
// Once we've decided whether or not a continent is overriden - then we can assign it to the player.
function updateContinents() {
	// roll through all the continents and assign ownership to each continent.
	var i, index, continent, name, owner;
	for (index in continentsArray) {
		continent = continentsArray[index];
		continent.clearOwners(); // empty continent of owners before processing

		var pids = [];
		for (name in playersArray) { // set up empty array for holding player counts of countries.
			pids.push(0);
		}
		for (i = 0; i < continent._countrys.length; i++ ) {
			var country = countriesArray[continent._countrys[i]];
			country._inContinent = true;
			pids[country._pid]++;

		}
		for (i = 0; i < continent._continents.length; i++ ) {
			var subContinent = continentsArray[continent._continents[i]];
			for (owner in subContinent._owners) {
				pids[subContinent._owners[owner]]++;
			}
		}
		var leng = pids.length;
		if (gameSettings.fog) {
			leng--;
		}
		for (i=1;i<leng;i++) { // 1 to start to avoid Neutral player
			if (pids[i]>=continent._required) {
				for(name in playersArray) {
					if (playersArray[name]._pid == i) {
						continent._owners.push(i);
						continent._overriden.push(false);
					}
				}
			}
		}
	}

	// now we have all the owners we need to loop back through and work out if any continents need to override.
	for (index in continentsArray) {
		continent = continentsArray[index];
		// if this continent is owned by anyone then we need to see if it's overriden.
		if (continent._owners.length > 0) {
			for (i in continentsArray) {
				var continent2 = continentsArray[i];
				// don't compare the same continents.
				if (continent!=continent2) {
					// loop through overrides for this continent.
					for (var over in continent2._overrides) {
						// found a match.
						if (continent2._overrides[over]==continent._name) {
							for (owner in continent._owners) {
								for (var owner2 in continent2._owners) {
									if (continent._owners[owner]==continent2._owners[owner2]) {
										continent._overriden[owner]=true;
									}
								}
							}
						}
					}
				}
			}
		}
		// now we've established ownership and overriden ness we then need to assign the bonuses and owner ship to the players.
		for (owner in continent._owners) {
			for(name in playersArray) {
				var player = playersArray[name];
				if (player._pid == continent._owners[owner]) {
					if (!continent._overriden[owner]) {
						player._continents.push(index);
						player._continentBonus += continent._bonus;
					}
				}
			}
		}
	}
	var contOutput = "";
	for (var cont in continentsArray) {
		var cnt = continentsArray[cont];
		contOutput += cnt.displayString();
		contOutput += " ";
	}
	var total=0;
	$("#right_hand_side").children().each(function () {
		total += $(this).outerHeight();
	});
	$("#contOverview").html(contOutput);
	showContOver();
	var h = $('#outer-map').height();
	var currentHeight = $("#contOverviewWrapper").height();
	$("#contOverviewWrapper").height(Math.min(Math.max((h-total),100), currentHeight));

}

function createTextMap(extended) {
	var toReturn = "";
	// init for Text Based Map
	if (!extended) {
		toReturn += "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows >";
	}
	var txtMapSmallHtml2 = "";
	var txtMapSmallOwner = "";
	var bDone = false;
	var country, targetName, index, name, continentName, i;

	for (continentName in continentsArray) {
		txtMapSmallOwner = "";
		var continent = continentsArray[continentName];
		bDone = true;
		if (extended) {
			toReturn += '<h4 ><span class="JumpClick" title="' + continentName + '">' + continent._name + ' (' + continent._bonus + ')</span></h4>';
		}
		txtMapSmallHtml2 = "";

		for (index = 0; index < continent._countrys.length; index++ ) {
			country = countriesArray[continent._countrys[index]];
			country._inContinent = true;
			if (extended) {
				toReturn += country.displayString() + ' ==> [';
				for (i =0; i < country._borders.length; i++) {
					targetName = countriesArray[country._borders[i]];
					toReturn += targetName.displayString();
				}
				for (i = 0; i < country._attacks.length; i++) {
					targetName = countriesArray[country._attacks[i]];
					toReturn += targetName.displayString();
				}
				toReturn += ']';
				if ((country._bombards.length + country._mutualBombard.length)>0) {
					toReturn += ' __> [';
					for (i =0; i < country._bombards.length; i++) {
						targetName = countriesArray[country._bombards[i]];
						toReturn += targetName.displayString();
					}
					toReturn += ']';
				}
				toReturn += '<br>';
			} else {
				txtMapSmallHtml2 += country.displayString();
			}
		}
		for (i = 0; i < continent._continents.length; i++ ) {
			country = continentsArray[continent._continents[i]];
			for (index in country._owners) {
				for (name in playersArray) {
					if (playersArray[name]._pid == country._owners[index]) {
						if (extended) {
							toReturn += '<span class="playerBG' + country._owners[index] + '"><span class="JumpClick" title="' + country._name + '">' + country._name +' ('+country._bonus+')</span></span>';
						} else {
							var txtMapSmallContOwner = 'class="playerBG' + country._owners[index] +'"';
							txtMapSmallHtml2 += '<span ' + txtMapSmallContOwner + '><span class="JumpClick" title="' + country._name + '">' + country._name + ' ('+country._bonus+')</span></span>&nbsp;';
						}
					}
				}
			}
			if (country._owners.length<1) {
				if (extended) {
					toReturn += '<span class="playerBG0"><span class="JumpClick" title="' + country._name + '">' + country._name + ' ('+country._bonus+')</span></span>';
				} else {
					txtMapSmallHtml2 += '<span class="playerBG0"><span class="JumpClick" title="' + country._name + '">' + country._name + ' ('+country._bonus+')</span></span>&nbsp;';
				}
			}
			if (extended) {
				toReturn += '<br>';
			}
		}
		for (index in continent._owners) {
			for (name in playersArray) {
				if (playersArray[name]._pid == continent._owners[index]) {
					if (!continent._overriden[index]) {
						if (extended) {
							toReturn += '<br><span class="playerBG' + index + '"> BONUS for ' + name + ' : ' + continent._bonus + ' </span>';
						} else {
							txtMapSmallOwner = 'class="playerBG' + continent._owners[index] +'"';
							toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="JumpClick" title="' + continent._name + '">' + continent._name + ' (' + continent._bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
						}
					}
				}
			}
		}
		if (continent._owners.length<1 && !extended) {
			toReturn += '<tr><td><span ' + txtMapSmallOwner + '><b><span class="JumpClick" title="' + continent._name + '">' + continent._name + ' (' + continent._bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	//Add Text Map
	cc_log("Adding Text Map");

	if (bDone) {
		var txtMapHtml2 = "";
		var hasCountriesWithoutContinent = false;
		txtMapHtml2 += '<h4>No Continent</h4>';
		txtMapSmallHtml2 = "";

		for (index in countriesArray) {
			country = countriesArray[index];
			if (!country._inContinent) {
				if (!extended) {
					txtMapSmallHtml2 += country.displayString();
				} else {
					txtMapHtml2 += country.displayString() + '==> [';
					for (i =0; i < country._borders.length; i++) {
						targetName = countriesArray[country._borders[i]];
						txtMapHtml2 += targetName.displayString();
					}
					txtMapHtml2 += ']';
					if (country._bombards.length>1) {
						txtMapHtml2 += ' __> [';
						for (i =0; i < country._bombards.length; i++) {
							targetName = countriesArray[country._bombards[i]];
							txtMapHtml2 += targetName.displayString();
						}
					}
					txtMapHtml2 += '<br>';
				}
				hasCountriesWithoutContinent = true;
			}
		}
		if (hasCountriesWithoutContinent) {
			if (extended) {
				toReturn += txtMapHtml2;
			} else {
				toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
			}
		}
	} else {
		if (extended) {
			toReturn += '<h2>No Continents</h2>';
		}
		for (index in countriesArray) {
			country = countriesArray[index];
			if (!extended) {
				txtMapSmallHtml2 += country.displayString();
			} else {
				toReturn += country.displayString() + ' ==> [';

				for (i =0; i < country._borders.length; i++) {
					targetName = countriesArray[cc._borders[i]];
					toReturn += targetName.displayString();
				}
				toReturn += ' ]<br>';
			}
		}
		if (!extended) {
			toReturn += '<tr><td><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
		}
	}
	if (!extended) {
		toReturn += "</table>";
	}
	return toReturn;
}

function updateMagicMap(showProgress) {
	if (showProgress) {
		customStartWaiting("Updating Magic Map");
	}
	var cou, outerMap, toAdd, playerNumber;
	applyFades();
	outerMap = $('#outer-map');
	magicmap.width(outerMap.width());
	magicmap.height(outerMap.height());
	if (!myOptions.mapInspect) { 
		if (magicmap.find("div").length != 0){ // if map inspect is turned off, remove some stuff.
			magicmap.find("div").remove();
			for (cou in countriesArray) {
				countriesArray[cou]._light = null;
			}
			$('#players span[class*=player]').add($('#stats span[class*=player]')).unbind();
			$("#stats tr td:first-child").not('[class*=status]').unbind();
			$("#players li").not('[class*=status]').unbind();
			$('#cards, #contOverview, #magicmap, #textMap, #statsTable').unbind();
		}
		return;
	}
	if (magicmap.find("div").length == 0){ //happens once if all goes well
		for (cou in countriesArray) {
			magicmap.append(countriesArray[cou].createDiv());
		}
		cc_log("Attaching the hover handlers (COUNTRIES)");
		magicmap.mouseover(function(e) {
			if (e.target.nodeName === 'DIV' && e.target.id != 'magicmap') {
				var country = countriesArray[e.target.id];
				country.lightUpNeighbours();
				lights = true;
				hoverInfo.html(country.getInspectText());
			} else if (lights){
				onMouseOutHover();
			}
		});
		cc_log("Attaching the hover handlers (PLAYERS)");
		// Add Hovers to player names
		toAdd = $('#players span[class*=player]').add($('#stats span[class*=player]'));
		toAdd.hover(onMouseOverPlayername, onMouseOutHover);
		if (isTeamGame()) {
			// Add Hovers to Team.
			cc_log("Attaching the hover handlers (TEAMS)");

			var handler = function(start, amount){
				return function() {
					for (var pid = 0; pid < amount; pid++) {
						onMouseOverPlayer(pid + start);
					}
				};
			};
			// once for the stats
			toAdd = $("#stats tr td:first-child").not('[class*=status]');
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
			});
			// and once for the player list
			toAdd = $("#players li").not('[class*=status]');
			playerNumber = 1;
			toAdd.each(function() {
				$(this).hover(handler(playerNumber, gameSettings.type), onMouseOutHover);
				playerNumber+=gameSettings.type;
			});
		}
		cc_log("Attaching the hover handlers (CARDS)");
		$('#cards').mouseover(function(e) {
			if (e.target.nodeName === 'SPAN' && e.target.className.has('card')) {
				var countryName = e.target.innerHTML;
				if (colourblind) {
					countryName = countryName.substring(2);
				}
				if (countryName.indexOf('&')>-1) {
					countryName = countryName.replace("&amp;","&");
					countryName = countryName.replace("&lt;",/</);
					countryName = countryName.replace("&gt;",/>/);
				}
				var country = countriesArray[countryName.makeID()];
				if (country) {
					country.lightUp();
					hoverInfo.html(country.getInspectText());
				}
			}
		});
		$('#contOverview').mouseover(function(e) {
			onMouseOutHover();
			if (e.target.nodeName === 'SPAN' && e.target.className.has('hovermap')) {
				var continent = continentsArray[e.target.title];
				continent.lightUp();
			}
		});
		$('#cards, #contOverview, #magicmap').mouseout(onMouseOutHover);
		cc_log("Attaching the click handlers");
		$('#textMap, #statsTable').click(function(e) {
			if (e.target.nodeName === 'SPAN') {
				if (e.target.className.has('JumpClick')) {
					var continents = e.target.title.split('|');
					for (var index in continents) {
						continentsArray[continents[index]].flash();
					}
				} else if (e.target.className.has('clickJump')) {
					var country = countriesArray[e.target.title];
					cntryClickHandler(function() {
						country.lightUp()
					});
				} else if (e.target.className.has('ClickPlayerJumper')) {
					var player = playersArray[e.target.innerHTML];
					cntryClickHandler(function() {
						onMouseOverPlayer(player._pid);
					});
				}
			}
		});
	} else {
		for (cou in countriesArray) {
			countriesArray[cou].updateDiv();
		}
	}
}

// various Magicmap functions (now outside magicmap)
var onMouseOverPlayername = function () {
	var pattern = /(\d+)$/;
	var result = pattern.exec(this.className);
	onMouseOverPlayer(result ? result[1] : 0);
};
var onMouseOverPlayer = function (pid) {
	for (var i in countriesArray) {
		var country = countriesArray[i];
		if (country._pid == pid)
			country.lightUp();
	}
};

var onMouseOutHover = function () {
	for (var index in countriesArray) {
		countriesArray[index].lightDown();
	}
	lights = false;
	hoverInfo.html("");
};

var cntryClickHandler = function cntryClickHandler(handler) {
	if (! myOptions.mapInspect) { // only do stuff if map inspect is on!!
		return;
	}
	window.setTimeout(jtm,100);
	window.setTimeout(handler,500);
	window.setTimeout(onMouseOutHover,1000);
	window.setTimeout(handler,1500);
	window.setTimeout(onMouseOutHover,2000);
	window.setTimeout(handler,2500);
	window.setTimeout(onMouseOutHover,3000);
	window.setTimeout(handler,3500);
	window.setTimeout(onMouseOutHover,4000);
	window.setTimeout(handler,4500);
	window.setTimeout(onMouseOutHover,5000);
	window.setTimeout(handler,5500);
	window.setTimeout(onMouseOutHover,6000);
	window.setTimeout(handler,6500);
	window.setTimeout(onMouseOutHover,7000);
	window.setTimeout(handler,7500);
	window.setTimeout(onMouseOutHover,8000);
	window.setTimeout(handler,8500);
	window.setTimeout(onMouseOutHover,9000);
	window.setTimeout(handler,9500);
	window.setTimeout(onMouseOutHover,10000);
};

function checkElimSummary() {
	$('#termWrapper').toggle(TerminatorSummary!="");
}

function takeSnapshot() {
	reloadToLive();
	// get date
	var date = new Date();
	// get armies array
	var arms = unsafeWindow.gameArmies.innerHTML;
	// get the image.
	var innerMapSrc = "http://www.conquerclub.com/map.php?key="+unsafeWindow.mapKey+'&nocache=' + Math.random();
	var image = "";
	var retry = 0;
	while (image.length<40 && retry<=10) {
		image = getImgAsDataScheme(innerMapSrc);
		retry++;
	}
	if (retry>10) {
		alert("Snapshot failed - Please Refresh your browser and retry.");
	} else { // save this data
		var savename = gameSettings.gamenr+"~"+date.getTime()+"~"+rounds;
		cc_log('taking snapshot');
		saveSnapshot(savename, arms, image);
		addSnapshot(savename, $('#menu_refresh').parent());
	}
}

function saveSnapshot(savename, arms, image) {
	var snapshots = getSnapshots();
	snapshots.push(savename);
	GM_setValue("SNAPSHOTS", snapshots.toString());
	var data = arms+"~~~~~~~~~~"+image;
	GM_setValue(savename, data);
}

function onSnapShot(loadName,date,id) {
	removePointer();
	var data = GM_getValue(loadName);
	var dataarray = data.split("~~~~~~~~~~");
	var armies = dataarray[0];
	var image = dataarray[1];
	$("#inner-map").attr("src", image);
	unsafeWindow.refreshGMScript(armies, date);
	$("#menu_snapshot_"+id).html('<b>' + $("#menu_snapshot_"+id).html() + '</b>');
	currentSnapshot = id;
	currentSnapshotArray = armies;
}

function reloadToLive() {
	$('#inner-map').attr("src","map.php?key=" + unsafeWindow.mapKey);
	unsafeWindow.refreshGMScript();
}

function analyse() {
	if (currentSnapshot==-1) {
		return;
	}
	// liveSnapshotArray is the global variable containing an the live array of armies data.
	var currentArmiesArr = currentSnapshotArray.replace(/-/g,"~").split(/armies=|,|~|" alt="/);

	// loop through arrays
	if (currentArmiesArr.length==liveSnapshotArray.length){
		var i=0; // to keep track of where we are in the armies array.
		var changedCountries = [];
		for (var country in countriesArray) {
			var currentOwner = currentArmiesArr[i*2];
			var liveOwner = liveSnapshotArray[i*2];
			var currentArmy = currentArmiesArr[i*2+1];
			var liveArmy = liveSnapshotArray[i*2+1];
			if (currentOwner!=liveOwner || currentArmy!=liveArmy) {
				changedCountries.push(countriesArray[country]);
			}
			i++;
		}
		cntryClickHandler(function() {
			for (var country in changedCountries) {
				changedCountries[country].lightUp();
			}
		});
	} else {
		alert("error army arrays are different lengths - This Snapshot is invalid");
	}
}

function removePointer() {
	if (currentSnapshot!=-1) {
		var id = "menu_snapshot_"+currentSnapshot;
		var option = $('#' + id);
		option.html(option.find('b').html());
		currentSnapshot=-1;
	}
}

var makeOSS = function (n,d,i) {
	return function () {
		onSnapShot(n,d,i);
	};
};

function deleteGameSnaps() {
	if (confirm("Are you sure you wish to delete this games Snapshots?")) {
		delGameSnaps();
	}
}
function getSnapshots() {
	var allValues = GM_listValues();
	return $.grep(allValues, function(val) {
		return (/^\d{1,9}~/).test(val);
	});
}

function removeSnapshots(gamenrs, keep) {
	var newSnapshotsArray = [];
	var snapshots = getSnapshots();
	var amountDeleted = 0;
	for (var i=0;i<snapshots.length;i++) {
		var snapshot = snapshots[i].split("~");
		var game = snapshot[0];
		var loadname = snapshots[i];
		if ($.inArray(game, gamenrs) < 0 == keep) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
			amountDeleted++;
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	if (amountDeleted > 0) {
		alert('Deleted ' + amountDeleted + ' snapshots. Amount left: ' + newSnapshotsArray.length);
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
}

function delGameSnaps() {
	var newSnapshotsArray = [];
	var snapshots = getSnapshots();
	for (var i=0;i<snapshots.length;i++) {
		var snapshot = snapshots[i].split("~");
		var game = snapshot[0];
		var loadname = snapshots[i];
		if (game==gameSettings.gamenr) {
			GM_deleteValue(loadname);// Remove image and data for the snapshot.
		} else {
			newSnapshotsArray.push(loadname);
		}
	}
	GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
	currentSnapshot=-1;
	removeSnapshotsFromMenu();
}

function removeFinishedGames() {
	var username = $("#leftColumn .vnav").find("p:first a b").html();
	$.get('http://www.conquerclub.com/api.php', {
		mode: "gamelist",
		un: username,
		gs: "A"
	}, removeFinishedGamesInXml , 'xml');
}

// gets the current user, and removes snapshots based on the active games of that user
function removeFinishedGamesInXml(xml) {
	var x = $(xml).find('page').text().split(' of ');
	var gameNrTags = $(xml).find('game_number');
	var gameNrs = $.map(gameNrTags, function(tag) {
		return $(tag).text();
	});
	// if someone has more than 1 page (=200) of active games.. add those.)
	if (x[1] > 1 && x[0] == 1) {
		for (var i = 2; i <= x[1]; i++) {
			var username = $("#leftColumn .vnav").find("p:first a b").html();
			$.ajax({
				url: 'http://www.conquerclub.com/api.php',
				data: ({
					mode: "gamelist",
					un: username,
					gs: "A",
					page: i
				}),
				success: function (xml) {
					var gameNrTags = $(xml).find('game_number');
					var gamesToAdd = $.map(gameNrTags, function(tag) {
						return $(tag).text();
					});
					gameNrs = $.merge(gameNrs, gamesToAdd);
				},
				async: false,
				dataType: 'xml'
			});
		}
	}
	removeSnapshots(gameNrs,true);
}

function removeSnapshotsFromMenu() {
	for (var i=0;i<snapshotsMenuLength;i++) {
		removeMenuOption("menu_snapshot_"+i);
	}
	snapshotsMenuLength=0;
}

function deleteAllSnapshots() {
	var snapshots = getSnapshots();
	if (snapshots.length > 0) {
		if (confirm("Are you sure you wish to delete all your Snapshots?")) {
			for (var i=snapshots.length-1;i>=0;i--) {
				var loadname = snapshots[i];
				GM_deleteValue(loadname);// Remove image and data for the snapshot.
			}
			GM_setValue("SNAPSHOTS","");
			currentSnapshot=-1;
		}
	}
	removeSnapshotsFromMenu();
}

function loadSnapshots(refresh) {
	var snapshots = getSnapshots().sort(function(a,b) {
		a = a.split("~");
		b = b.split("~");
		if (a.length < 2 || b.length < 2) {
			return 0;
		}
		return a[1] - b[1];
	});
	for (var i=0;i<snapshots.length;i++) {
		addSnapshot(snapshots[i], refresh);
	}
}
function addSnapshot(snapshotString, before) {
	var snapshot = snapshotString.split("~");
	if (snapshot[0]==gameSettings.gamenr) {// 1st element of snapshot -> game nr.
		var date2 = new Date();
		date2.setTime(snapshot[1]);// 2nd element of snapshot is the time in ms
		var display = date2.getHours()+":"+padDigits(date2.getMinutes(), 2)+" - "+date2.getDate()+"/"+(date2.getMonth()+1)+"/"+date2.getFullYear();
		if (snapshot.length > 2) { // round number is present, add to display
			display = snapshot[2]+" - "+display;
		}
		if (currentSnapshot == snapshotsMenuLength) { // if selected
			display = '<b>' + display + '</b>';
		}
		$(before).after(createOption("menu_snapshot_" + snapshotsMenuLength, display, makeOSS(snapshotString, date2, snapshotsMenuLength), "#77AA77"));
		snapshotsMenuLength++;
	}
}

function showDeleteSnapshots() {
	var snapshots = getSnapshots();
	for (var i=snapshots.length-1;i>=0;i--) {
		var snapshot = snapshots[i].split("~");
		var game = snapshot[0];
		if (game==gameSettings.gamenr) {
			if (confirm("Would you like to delete Snapshots from this game?")) {
				delGameSnaps();
			}
			break; // once we found one - drop out of the loop.
		}
	}
}

function getImgAsDataScheme(url) {
	var response = "";
	var req;
	$.ajax({
		url: url,
		processData: false,
		success: function(result) {
			response = result;
		},
		beforeSend: function (reqst) {
			req = reqst;
			req.overrideMimeType('text/plain; charset=x-user-defined');
		},
		async: false
	});
	if (response == "") {
		return "";
	}
	var binaryString = translateToBinaryString(response);
	var content = window.btoa(binaryString);
	return 'data:'+req.getResponseHeader('content-type')+';base64,' + content;
}

function translateToBinaryString(text) {
	var out;
	out='';
	for(var i=0;i<text.length;i++) {
		//*bugfix* by Marcus Granado 2006 [http://mgran.blogspot.com] adapted by Thomas Belot
		out+=String.fromCharCode(text.charCodeAt(i) & 0xff);
	}
	return out;
}

var jtm = function jtm() {
	window.location.hash="map-cell";
};

//-------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//-------------------------------------------------------------------------
var rightside = $('#right_hand_side');
var dashboard = $('#dashboard');
var magicmap;
var minimumReinforcements = 3;
var gameSettings = new GameSettings();

//---- Log Processing ----
var currentLog = "";
var logLength = 0;
var rounds = 0;
var stored_rounds = 0;
var num_turnins = 0;
var stored_num_turnins = 0;
var stored_skipped = [];
var stored_total_skipped = [];
var stored_countries = [];
var stored_terminator_summary;
var stored_terminator_counter = [];
var stored_lastContinentBonus = [];
var stored_lastTerritoryBonus = [];
var stored_armiesLastTurn = [];

//---- Gameplay ----
var TerminatorSummary = "";
var num_players = 0;
var pIndxs;

//---- Player ----
var NID = 0; // Neutral ID
var UID = 0; // Unknown ID <-- set to 0 here to ensure a value always set

// -- Various
var mapName;
var mapSize;

var RedemptionValue=0;

var totalArmies = 0;
var totalCountries = 0;
var totalStartCountries = 0;
var startCountriesInPosition = 0;
var totalPositions = 0;
var totalPositionCountries = 0;

var colourblind = unsafeWindow.colourblind == "Y"?true:false;
var snapshotsMenuLength = 0;
var currentSnapshot = -1;
var forceInit = false;

var currentSnapshotArray = [];
var liveSnapshotArray = [];
var showDeleteAll = false;

function createSiteWideMenu() {
	prepareMenuHider();
	var ul = setupMenu();
	addSiteMenuOptions(ul);
	addSiteWideMenuOptions(ul);
	hideMenu();
	updateMenuHiderHeight();
}
function performSiteWideAlterations() {
	updateMyGamesClocks();
	updateGameLinks();
	addConfirmDropGameClickHandlers();
	swapAvatars();
	smallAvatars();
	hideSigs();
	createGamesTogether();
	checkForUpdate();
}

function adjustClock() {
	var timeStr = $("#clock").html();
	if (!timeStr) {
		return;
	}
	var time = timeStr.split(':');
	var targetDate = new Date();
	var hoursLeft = parseInt(time[0],10);
	var minutesLeft = parseInt(time[1],10) + hoursLeft * 60;
	var secondsLeft = parseInt(time[2],10) + minutesLeft * 60;
	targetDate.setTime(targetDate.getTime() + (secondsLeft * 1000));
	countDown(targetDate);
}

// --- Add Styles ---
// Colour Defs
var col0 = [];
col0[0] = "#FFFFFF"; // Neutral
col0[1] = "#FF0000"; // Red
col0[2] = "#009A04"; // Blue
col0[3] = "#0000FF"; // Green
col0[4] = "#FFFF00"; // Yellow
col0[5] = "#FF00FF"; // Magenta/Pink
col0[6] = "#00FFFF"; // Cyan (bright)
col0[7] = "#FF9922"; // Gray
col0[8] = "#7F7F7F"; // Orange
col0[9] = "#000000"; // BR colour
//Log
var col1 = [];
col1[0] = "#000000"; // Neutral has always been black in the logs
col1[1] = "#FF0000";
col1[2] = "#009A04";
col1[3] = "#0000FF";
col1[4] = "#CCCC00";
col1[5] = "#FF00FF";
col1[6] = "#00CCCC"; // Cyan (Muted)
col1[7] = "#FF9922";
col1[8] = "#7F7F7F";
col1[9] = "#BBBBBB"; // BR colour

// this function is run ONCE on initial INIT of the script.
function gm_ConquerClubGame() {
	cc_log("Starting");
	// ---- Check for Required Components ----
	//If we cannot find any of the following then we're not in a game.
	if(!($('#log').exists() && rightside.exists() && dashboard.exists() && $('#armies').exists())) {
		if ($('#middleColumn').exists()) { // check center exists - this may be a page within a page.
			if ($('#leftColumn ul').exists()) { // check ul exists - user may not be logged in.
				createSiteWideMenu();
				performSiteWideAlterations();
			}
		}
		stopWaiting();
		return;
	}
	// GAME BOB
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return;
	}
	customStartWaiting("Initializing BOB");
	//-------------------------------------------------------------------------
	// INIT
	//-------------------------------------------------------------------------

	cc_log("Building the Settings Menu");
	// ID THE MAP
	mapName = unsafeWindow.mapFile;
	mapSize = unsafeWindow.mapResolution;
		
	createGameMenu();
	prepareMenuHider();
	adjustClock();

	// ---- Create Divisions ----
	var statsWrapper = $("<div id='statsWrapper'><span style='float:right;margin-right:20px'>[<a id='hideEliminated'>Hide eliminated players</a>][<a id='showMoreStatsLink'>scrollable statistics</a>]</span><H3>Statistics</H3></div>");
	statsWrapper.hide();

	statsWrapper.append($('<div id="statsTable"></div>').css("margin",'10px 0 0 0'));
	$('#log').prev().before(statsWrapper);

	// Create text map
	var textMapWrapper = $('<div id="textMapWrapper"><span style="float:right;margin-right:20px">[<a id="showMoreLink">scrollable text map</a>]</span><H3>Text Map</H3></div').hide();

	var textMap = $('<div id="textMap"></div>').css("backgroundColor","#EEEEEE").css('margin','10px 0 0 0');

	textMapWrapper.append(textMap);
	$('#log').prev().before(textMapWrapper);

	dashboard.after($('<div id="mapinspect"></div>').css("backgroundColor","#EEEEEE").css("clear","right"));

	if (gameSettings.spoils == eBonusCards.FLATRATE) {
		var redemption = $('<div id="redemption"></div>')
		.css("backgroundColor","#EEEEEE")
		.html("<table><tr><td colspan=2><font color=red><b>Red:</b></font> 4&nbsp;<font color=green><b>Green:</b></font> 6&nbsp;<font color=blue><b>Blue:</b></font> 8&nbsp;<b>Mixed:</b> 10</td></tr></table>");
		dashboard.after(redemption);
	}

	var termWrapper = $('<div id="termWrapper"></div>').css("margin",'10px 0 0 0');
	if (gameSettings.type == eGameType.TERMINATOR) {
		termWrapper.html("<h3>Terminator Points Summary</h3>");
	} else {
		termWrapper.html("<h3>Elimination Summary</h3>");
	}
	$('#full-log').after(termWrapper);


	var contOverviewWrapper = $('<div id="contOverviewWrapper"><H4>Continents Overview</H4></div>').css({
		display:"none",
		overflowY:"auto",
		overflowX:"hidden"
	});

	contOverviewWrapper.append('<div id="contOverview"></div>');
	rightside.append(contOverviewWrapper);

	if (myOptions.floatActions == "On") {
		var actionForm = $('#action-form');
		if (actionForm.exists()) {
			actionForm.css({
				position:'fixed',
				bottom:0,
				zIndex:4
			});
			var wrapperDiv = $('<div id="actionWrapper"></div>');
			if ($('#from_country').exists()) {
				wrapperDiv.css('paddingTop',"22px");
			} else {
				wrapperDiv.css('paddingTop',"0px");
			}
			wrapperDiv.append($('#mapinspect'));
			wrapperDiv.append($('#cards').parent().parent().css('backgroundColor',"#EEEEEE"));
			actionForm.find('fieldset').append(wrapperDiv);
			setFormWidth();
		}
		$('#rolls').css({
			position:'fixed',
			backgroundColor:"#EEEEEE",
			top:0,
			zIndex:4
		});
	}

	var styles = ' #outer-map {position:relative;} ' +
	' #inner-map img {position:absolute;} ' +
	' .attackhovers {vertical-align:middle;padding-top:1px;padding-bottom:1px;} ' +
	' #summary {height:150px;overflow:auto;background-color:#eee;margin:10px 0 0 0;} ' +
	' #magicmap div {height:18px;position:absolute;z-index:3;} ' +
	' div.h {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid ;border-bottom:thick solid;} ' +
	' div.i {opacity:0.7;border:thick solid;} ' +
	' div.j {opacity:1.0;border:thick solid;} ' +
	' div.off {opacity:0.0;border:medium dotted #FFFFFF;} ' +
	' div.typeborder {opacity:1.0;padding-left:4px;padding-right:4px;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typeattack {opacity:1.0;padding-right:4px;border-left:thick solid;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typedefend {opacity:1.0;padding-left:4px;border-right:thick solid;border-top:thick solid;border-bottom:thick solid;} ' +
	' div.typebombards {opacity:1.0;padding-bottom:4px;border-left:thick solid;border-top:thick solid;border-right:thick solid;} ' +
	' div.typebombarded {opacity:1.0;padding-top:4px;border-left:thick solid;border-right:thick solid;border-bottom:thick solid;} ' +
	' div.typemutualbombard {opacity:1.0;padding-top:4px;padding-bottom:4px;border-left:thick solid;border-right:thick solid;} ' +
	' #statsbody td {white-space: nowrap;}' +
	' #statsbody td.continents {white-space: normal}' +
	' tr.eliminated td {text-decoration: line-through}' +
	' table.listing th {vertical-align:middle; font-weight:normal}';
	for (var i = 0; i < 9; i++) {
		styles += ' #magicmap .player'+i+' {border-color:' + col0[i] + ';} ' +
		' .playerBG'+i+' {color:' + col1[i] + (i===0?'':'; font-weight: bold') +'} ' +
		' .playerBGDD'+i+' {background-color:' + (i===0?col0[i]:col1[i]) + ';} ';
	}

	// ---- Get Player Names ----
	cc_log("Player IDs");
	playersArray.Neutral = new Player("Neutral",NID);

	pIndxs = $('#players span[class*=player]');
	for(i in pIndxs) {
		if( pIndxs[i].innerHTML ) {
			playersArray[pIndxs[i].innerHTML] = new Player(pIndxs[i],++num_players);
		}
		if (i>7) { // create styles for this player. (BR Coding!)
			var num = parseInt(i,10)+1;
			styles += ' #magicmap .player'+num+' { border-color:' + col0[9] + ';} ' +
			' .playerBG'+num+' { color: ' + col0[9] + ';font-weight: bold} ' +
			' .playerBGDD'+num+' { background-color: ' + col1[9] + '; } ';
		}
	}
	GM_addStyle(styles);
	updatePlayerCards();
	updateSideStats();
	moveChatToTop();
	$('#inner-map').wrap('<div id="magicmap"></div>').css('zIndex', '2').css('position','absolute');
	magicmap = $('#magicmap');
	showMapInspectDiv();

	if (gameSettings.fog) { // create extra player for Unknown territories.
		for (i in playersArray) {
			UID += 1;
		}
		playersArray.Unknown = new Player("Unknown",UID);
	}
	// ---- Map Analysis ----
	cc_log("Map Analysis");
	analyseMap();

	cc_log("Starting Request XML for "+ mapName);
	// getting the map XML from the server
	var url = test + '/maps/'+mapName+'.xml';
	$.ajax({
		url: url,
		success: parseXML,
		async: true,
		dataType: 'xml',
		cache: shouldCacheXml
	});

	/* Ishiro's Confirm Commands code */
	var newsendRequest = unsafeWindow.sendRequest;
	unsafeWindow.sendRequest = function(command) {
		/* --- Confirmation Popups --- */
		if (((command == 'End Assaults' || command == 'End Reinforcement' || (command == 'Reinforce' && gameSettings.fortifications != eFortifications.UNLIMITED)) && myOptions.confirmEnds) || (command == 'Auto-Assault' && myOptions.confirmAutoAttack) || (command == 'Deploy' && myOptions.confirmDeploy)) {
			var message = command;
			if (command == "Reinforce") { // if the command is fortify - then we are actually doing an "end fort" so modify the message.
				message = "End Reinforcement";
			}
			if (confirm("Are you sure you wish to "+message+"?")) {
				return newsendRequest(command);
			} else {
				return false;
			}
		} else {
			return newsendRequest(command);
		}
	};
	updateMenuHiderHeight();
	checkForUpdate();
}

function parseXML(dom) {
	var i, index;
	cc_log("Received XML response");
	customStartWaiting("Parsing XML");

	var names = dom.getElementsByTagName('name');
	for (i = 0; i < names.length; i++) {
		var parent = names[i].parentNode;
		var comp = parent.getElementsByTagName('components');
		if (comp.length==1) {
			var bonus = parent.getElementsByTagName('bonus');
			if (bonus.length==1) {
				parseContinent(parent);
			} else {
				parseObjective(parent);
			}
		} else {
			parseTerritory(parent, i);
		}
	}
	for (i in countriesArray) {
		var country = countriesArray[i];
		for (index = 0; index < country._attacks.length; index++){
			countriesArray[country._attacks[index]]._DefendBorders.push(i);
		}
		for (index = 0; index < country._bombards.length; index++){
			countriesArray[country._bombards[index]]._bombardedBy.push(i);
		}
	}

	// get amount of starting positions.
	var positions = dom.getElementsByTagName('position');
	if (positions.length>0) {
		totalPositions+=positions.length;
		for (i = 0; i < positions.length; i++) {
			var territories = positions[i].getElementsByTagName('territory');
			totalPositionCountries+=territories.length;
			for (var j = 0; j < territories.length; j++) {
				var name = territories[j].textContent.normalizeSpaces().makeID();
				if (countriesArray[name]._neutral===0) {// both a starting position and non-neutral, so don't count as a starting country
					totalStartCountries--;
					startCountriesInPosition++;
				}
			}
		}
	}

	// get minimum reinforcements - defaulted to 3.
	var minreinforcements = dom.getElementsByTagName('minreinforcement');
	if (minreinforcements.length>0) {
		minimumReinforcements = minreinforcements[0].textContent.normalizeSpaces();
	}

	// read out the reinforcements matrix.
	var reinforcements = dom.getElementsByTagName('reinforcement');

	for (i = 0; i < reinforcements.length; i++) {
		var lower = reinforcements[i].getElementsByTagName('lower')[0].textContent.normalizeSpaces();
		var upper = reinforcements[i].getElementsByTagName('upper')[0].textContent.normalizeSpaces();
		var divisor = reinforcements[i].getElementsByTagName('divisor')[0].textContent.normalizeSpaces();
		reinforcementsArray.push(new Reinforcement(lower, upper, divisor));
	}

	cc_log("Parsed XML");

	if (num_players>8) { // make the right hand side scrollable for BR's
		rightside.height($('#outer-map').height());
		rightside.css({
			overflow:"auto"
		});
	}

	//Auto Scroll to Game
	if( myOptions.jumptomap ) {
		window.setTimeout(jtm,1000);
	}

	processLog(0, true, true);

	checkElimSummary();
	updateCountries();
	updateContinents();
	updateObjectives();
	updateTextMap();
	updateStats();
	updateMagicMap(false);
	colourCodeDD();
	updateMenuHiderHeight();
	if (myOptions.floatActions == "On") {
		setFormWidth();
	}
	if (showDeleteAll) {
		showDeleteSnapshots();
	}
	stopWaiting();
	//whatever();
	cc_log("Done after request");
}

// upgrade refreshGMScript with new version.
unsafeWindow.refreshGMScript = function(armiesArray, date) {
	if (myOptions.autobob=="Off" && !forceInit) {
		addStartBOB();
		return true;
	}
	updatePlayerCards();
	var response = unsafeWindow.request.responseText.split("&");
	if (response.length > 2) {
		if (response[16]=='Y') {
			currentLog = $('#log').html().split('<br>'); // if full log clicked - blat downloaded log
			currentLog.pop();
			logLength=currentLog.length;
		}
	}
	if (!date) {
		removePointer();
		var innerMap = $('#inner-map');
		innerMap.attr('scr', "map.php?key="+unsafeWindow.mapKey);
	}
	colourblind = unsafeWindow.colourblind == "Y"?true:false;
	;
	mapSize = unsafeWindow.mapResolution;
	processLog(logFixed, false, false, date);
	if (myOptions.floatActions == "On") { // only change the form width if HUD is on.
		setFormWidth();
	}
	checkFloatDice();
	checkElimSummary();
	reinitClock(); // call to ensure clock is correct.

	analyseMap(armiesArray); // reread the armies array back into the players array
	updateCountries();
	updateContinents();
	updateObjectives();

	updateTextMap();
	updateStats();
	updateMagicMap(false);
	colourCodeDD();
	updateMenuHiderHeight();
	stopWaiting();
	return true;
};

// Run init on first load.
gm_ConquerClubGame();
