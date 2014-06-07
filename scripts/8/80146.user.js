// ==UserScript==
// @name			SnP helper Reloaded
// @namespace		SnP-helper-Reloaded
// @description		Add caculate ship amout to pillage all resource
// @include			http://*.ikariam.*/*
// @exclude			http://board.ikariam.*/*
// @require 		http://userscripts.org/scripts/source/57756.user.js
// @version			1.2.6
// @author			kabji
// @author			salomone
// @author			El Nino
// @history	1.2.6	Release date: 2011.02.22
// @history	1.2.6	Fixed lootable amount when more than one successfull warehouse inspects available from different cities 
// @history	1.2.5	Release date: 2011.02.17
// @history	1.2.5	Compatible with v0.4.2 and v0.4.1
// @history	1.2.5	Due to new spy system, lost warehouse level detecting and saving functionality under v0.4.2, you have to enter warehouse levels manually
// @history	1.2.5	Due to new spy system, lost additional direct pillage and blockade buttons from spy reports
// @history	1.2.4	Release date: 2010.12.15
// @history	1.2.4	Really fixed warehouse level sorting method
// @history	1.2.3	Release date: 2010.11.28
// @history	1.2.3	Added homepage link to credits info box.
// @history	1.2.3	Fixed warehouse level sorting
// @history	1.2.2	Release date: 2010.11.28
// @history	1.2.2	Fixed getSafeAmountFromPlayer() function, it manages base amount (given by town hall) well if warehouse levels added in a comma separeted list
// @history	1.2.2	Added Brazil translation, made by Jeanipoo
// @history	1.2.2	Added partial Polish translation, made by szuwix
// @history	1.2.2	Fixed automatic warehouse level handling (data collected from city view)
// @history	1.2.2	Original "back to hideout" link works as a normal (it is linking to the reports tab)
// @history	1.2.2	Removed espionage report based warehouse level saving. Warehouse level only saved through city view.
// @history	1.2.1	Release date: 2010.10.03
// @history	1.2.1	Fixed horizontal bar width
// @history	1.2.1	The back to hideout picture link (on the lower side of the page) redirects you to the spy actions page  (coded by El Nino)
// @history	1.2.1	Direct pillage and blockade buttons on the screen  (coded by El Nino)
// @history	1.2.1	Added info box on horizontal bars over resource amounts 
// @history	1.2.1	Added new language content for info box and direct pillage / blockade buttons
// @history	1.2.1	Removed old credits info and added new credits box with info
// @history	1.2.0	Release date: 2010.09.22 
// @history	1.2.0	Completed German translate
// @history	1.2.0	Added French translate, made by Ewoline
// @history	1.2.0	Added horizontal bars to visualize lootable resources and safe amounts 
// @history	1.1.9	Release date: 2010.09.14 
// @history	1.1.9	Fixed missing German translate :)
// @history	1.1.8	Release date: 2010.09.13 
// @history	1.1.8	Added German translate, made by El Nino 
// @history	1.1.8	Added safe amounts for active and inactive player, next to the original values. Idea from El Nino :)
// @history	1.1.7	Release date: 2010.09.12 
// @history	1.1.7	Fixed missing 't' in Danish translation
// @history	1.1.6	Release date: 2010.09.11 
// @history	1.1.6	Added Serbian translate made by Broj Jedan, posted by Miloš Grujić
// @history	1.1.6	Added Danish translate made by Kilden af Liv
// @history	1.1.6	Replenished "improvements" field
// @history	1.1.6	Added auto updater (thx to PhasmaExMachina at userscripts.org)
// @history	1.1.5	Release date: 2010.08.13 
// @history	1.1.5	Added Ukranian and Russian translate, made by feelimon
// @history	1.1.4	Release date: 2010.08.01
// @history	1.1.4	Made some gui improvements for better visibility
// @history	1.1.3	Release date: 2010.07.31
// @history	1.1.3	Amount reader changed to trim everything, except numbers from cell data (needed for german servers)
// @history	1.1.2	Release date: 2010.06.30
// @history	1.1.2	Added a new number field for number of ships, it will calculates the amount of loot for the armada
// @history	1.1.1	Release date: 2010.06.26 
// @history	1.1.1	Added detailed table for resources
// @history	1.1.0	Release date: 2010.06.26
// @history	1.1.0	Dropped warehouse "database" and added a new function, to count safe amounts for active / passive players
// @history	1.1.0	Changed max allowed warehouse level to 160, if you prefer count them manually instead of writing a list
// @history	1.1.0	Added multi langugage capability (now only english and hungarian)
// @history	1.1.0	Transformed pillage helper table to met with the new details displaying requirements 
// ==/UserScript==

// Credits (some function is copy or modify from other srcipt): Town Enhancer, Ikariam Inline Score
// Based on this: http://userscripts.org/scripts/show/45185 with version 1.04 (06/06/2009)

var amounts = new Object();
var totalAmounts = new Object();
var NAME_WOOD = 'wood';
var NAME_WINE = 'wine';
var NAME_MARBLE = 'marble';
var NAME_GLASS = 'glass';
var NAME_SULFUR = 'sulfur';

var langList = { en: 'English', hu: 'Magyar', 'ua': 'Ukrainian', 'ru': 'Russian', 'rs': 'Serbian', 'dk': 'Danish', 'de': 'German', 'fr': 'French', 'br' : 'Portuguese', 'pl' : 'Polish'};
var trimmerRegexpForNotNumbers = new RegExp('[\\D]', 'g');
var currentVersion = '1.2.6';
var scriptId = 80146;

var basePathForResources = '/skin/resources/';
var resourceImages = { NAME_WOOD: 'icon_wood.gif', NAME_WINE: 'icon_wine.gif', NAME_MARBLE: 'icon_marble.gif', NAME_GLASS: 'icon_glass.gif', NAME_SULFUR: 'icon_sulfur.gif'};
var maxWidthForGraph = 550;

var snp_active_sum = 0;	
var snp_inactive_sum = 0;
var amtPerPixel = 1;
var inactiveSafePixelCount = 1;
var activeSafePixelCount = 1;	// only without the inactive the inactive part

var langData =	new Object();

var slider_build_bg_6px = "data:image/gif,GIF89a%06%00%1E%00%84%11%00%97%7CT%93%80a%CD%8EA%B8%9Bh%BB%9Cj%C2%A5n%DE%BF%96%DD%C1%8D%E3%C5%83%F0%D6%A6%F3%D6%A1%EC%D8%A8%F5%DF%A7%FE%E8%B8%F6%EB%BA%F9%EA%C0%FF%F2%C9%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%06%00%1E%00%00%05D%E0'%8Ed96h%F3%A9I%FB%25%EF%08%B7%B4i%DC8%A3%EFN%EF%07%C0%A0%60HT%18%8F%90%A4%F2%C1l.%16%89%E7%E2%40%AD%12%AE%D8%81v%8B%E8z%0B%E00%60L6%A5T%2C%D7L%F6%A2%C1L%A5%10%00%3B";
var slider_build_bg_leftend_10px = "data:image/gif,GIF89a%0A%00%1E%00%C6U%00%3E1%1FSE%2FYM7%5BO8%5EQ%3B%60Q8dWA%84pO%86sR%A3%89a%B4%97n%B6%9Bs%B8%9Fy%B9%A2%7D%CB%A6t%C1%A8%85%CA%AA%7C%C4%AC%8C%C5%AF%91%D5%ADw%CE%AE%83%C8%B0%85%C6%B1%94%D5%B2%7F%DD%B3%7B%D6%B4%87%D2%B5%8C%D5%B9%96%DF%B8%84%DB%BB%88%DC%BC%92%D9%BE%9C%E3%BF%8C%E5%C1%8C%E5%C1%94%E0%C2%9B%D6%C6%9E%DF%C5%A3%E7%C6%97%E0%C7%AA%E9%C7%90%E4%C8%A5%E2%CB%AD%EA%CB%9C%EC%CD%97%E9%CD%AC%ED%CD%A5%F1%D0%9A%ED%D1%A6%EC%D2%B4%F5%D2%A4%F1%D4%B0%F0%D6%A6%EC%D8%A8%EF%D6%B8%EA%D9%AE%F1%D7%B3%F1%DA%B3%FC%DA%AF%EE%DD%BB%F5%DD%BA%F6%DF%AE%FC%DD%B4%F6%E1%B2%F1%E2%B9%FA%E1%C2%FD%E1%BA%F5%E3%C1%F7%E4%B8%F3%E4%C8%FE%E5%C1%FF%E5%C6%FA%E7%C9%F7%E9%C3%F8%EA%C2%F8%EA%CF%F8%EB%D4%FF%EA%CA%FF%EA%CE%FD%EB%D1%F9%EE%C9%FF%EC%CE%FF%EE%D1%FF%EE%D5%FA%F1%D2%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%7F%00%2C%00%00%00%00%0A%00%1E%00%00%07%CD%80%7F%82%83%84%85%85%2F(%1D%8A%8A%10%06%7F%09TPJ%93I%40%00%06%07%40D%3F%3D%3D4%15%00%01%0854%2C(!%17%0B%00%02%A3%2B%A8%13%0E%0A%AB%AD%20%B0%B1%B35%2B%20%18%B0%B2%AC70%26%1C%17%10%AA%AC%A4%26%20%19%14%0C%B3%3B9%C1%1E%1A%0D%B3C%3C8.%23%1B%0F%B3E%D63)%1F%DC%ACEHA%3C-%25%11%DDO%E61'%12%B3LSNG6*%16%F2%F4%F6%F8%FA%F5%F7%F9X1%91%D2%C4%08%8E~%AC%96D9%22%04%5C%3CVC%0A%FA%08%B6%0Eb%13!%3A%B2UD%10Q%88%0CW%E386%14A2%E4%10%18%CB(h%18W%80%C4%02%050%17P%13%20%00%80%CD%9B6%03%FC10%80%80%CF%9F%8E%0C%0D%0A%04%00%3B";
var slider_build_bg_rightend_10px = "data:image/gif,GIF89a%0A%00%1E%00%C6U%00%3E1%1FSE%2FYM7%5BO8%5EQ%3B%60Q8dWA%83oN%84pO%86sR%A3%89a%B4%97n%B6%9Bs%B8%9Fy%B9%A2%7D%CB%A6t%C1%A8%85%CA%AA%7C%C4%AC%8C%C5%AF%91%D5%ADw%CE%AE%83%C8%B0%85%C6%B1%94%D5%B2%7F%DD%B3%7B%D6%B4%87%D2%B5%8C%D5%B9%96%DF%B8%84%DB%BB%88%DC%BC%92%D9%BE%9C%E3%BF%8C%E5%C1%8C%E5%C1%94%E0%C2%9B%D6%C6%9E%DF%C5%A3%E7%C6%97%E0%C7%AA%E9%C7%90%E4%C8%A5%E2%CB%AD%EA%CB%9C%EC%CD%97%E9%CD%AC%ED%CD%A5%F1%D0%9A%ED%D1%A6%EA%D3%A7%EC%D2%B4%F1%D4%B0%F0%D6%A6%EC%D8%A8%EF%D6%B8%F1%D7%B3%F0%D7%B9%F1%DA%B3%FC%DA%AF%EE%DD%BB%F5%DD%BA%F6%DF%AE%FC%DD%B4%F6%E1%B2%F1%E2%B9%FA%E1%C2%FD%E1%BA%F5%E3%C1%F7%E4%B8%F3%E4%C8%FE%E5%C1%FF%E5%C6%FA%E7%C9%F7%E9%C3%F8%EA%C2%F8%EB%D2%F8%EB%D4%FF%EA%CA%FF%EA%CE%F8%EC%D5%F9%EE%C9%FF%EE%D1%FF%EE%D5%FA%F1%D2%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%7F%00%2C%00%00%00%00%0A%00%1E%00%00%07%D5%80%7F%82%83%84%85%850)%1E%8A%8A%11%06%7F%0ATQK%93JA%00%06%08AE%40%3E%3E5%16%00%01%0965-)%22%18%0C%00%02%082%2C%22%19%14%0F%0B%AB%A3%2C!%B2%B3%AB%AD%AF%B1%BA%02%A35'%1D%18%11%AA%C0%A4'!%1A%15%0D%AB%07%3C%3A1'%1F%1B%0E%BB%9A8%2F%24%1C%10%B5FD%3D8*%20%DE%C0FIB%3D.%26%12%DF%E9B3(%13%B5MSOH7%2B%17%BBP%F7H9%F6%F5%FB%17%90%1F%2B%26R%9C%1C%C1!%90%95%3F%24Ch%A8%A0%E7p%0A%92%1F1%DA%3DK7d%C76w%E7%92%60%7Ce.%81%91%88%23R%964%12CC%84%0A%1B%CC%15(%C1%60%81M%06%D7%04%04%00%C0%B3'%CF%00%7F%0C%0C%20%40%D4%00Q%02%86%08%05%02%00%3B";
var widthOfSliderLeftEnd = 10;

var infoBox = null;
var infoBoxData = new Object();
var CITY_IDS_AND_WH_LEVELS = '-CityIdsAndWhLevels.' + top.location.host;
var CITY_AND_SPY_IDS = '-CityAndSpyIds.' + top.location.host;

// v.0.4.2 .....
var isMessageLikeReportFormats = false;
var idSuffix = 'dft';

var sliders = 
{
	'red' : "data:image/gif,GIF89a%01%00%08%00%E3%08%00%DC*.%B39B%E626%D0DQ%EC%3EF%A0YR%F3GK%AA%5CV%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D!%F9%04%01%0A%00%08%00%2C%00%00%00%00%01%00%08%00%00%04%07%B0%0CC%04%08'%02%00%3B",
	'yellow' : "data:image/gif,GIF89a%01%00%08%00%E3%08%00%BC%8D2%E1%8B%25%E9%98%2F%A9%B0B%EF%A1%3B%D7%AA%3D%B0%B9C%F5%A8E%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D!%F9%04%01%0A%00%08%00%2C%00%00%00%00%01%00%08%00%00%04%07p%94CD%00%26%02%00%3B",
	'green' : "data:image/gif,GIF89a%01%00%08%00%E3%08%00J%A2P4%BE%5B%5E%B6b%80%B0V%3A%C6e%93%B5c%A4%B8r%B5%BF%7B%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D%D5%1D%1D!%F9%04%01%0A%00%08%00%2C%00%00%00%00%01%00%08%00%00%04%070%88c%CA%00%24%02%00%3B"
};

function addGmStyle( newStyle )	{
	GM_addStyle( newStyle );
}

function setGmValue( variableName, variableValue )	{
	GM_setValue(variableName, variableValue);
}

function getGmValue( variableName )	{
	return getGmValue( variableName, null );
}

function getGmValue( variableName, defaultValue )	{
	if ( defaultValue == null )	{
		GM_getValue( variableName );
	}
	else	{
		GM_getValue(variableName, defaultValue);
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE:
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
				result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

Array.prototype.contains = function (elem) {
	var i;
	for (i = 0; i < this.length; i++) {
		if (this[i].spyId == elem) {
			return true;
		}
	}
	return false;
};

Array.prototype.containsAtIndex = function (elem) {
	var i;
	for (i = 0; i < this.length; i++) {
		if (this[i].spyId == elem) {
			return i;
		}
	}
};

Array.prototype.array_value_delete = function(position) {
	var x = position;
	while ( x != this.length ) {
		this[x] = this[x + 1];
		x++;
	}
	this.pop();
};

function sortDescending(a, b)	{
	return b - a;
};

function convertStringToMap(inputString)	{
	if ( inputString == 'undefined' || inputString == null || inputString.length == 0 )	{
		return null;
	}		
	// inputString should be like : {key1=val1||key2=val2}
	var res = new Object();
	var onePair = null;
	var idx = 0;
	var keyValuePairs = inputString.replace(/[{}]/g, '').split('||');
	for ( idx = 0; idx != keyValuePairs.length; idx++ )	{
		onePair = keyValuePairs[idx].split('=');		
		res[onePair[0]] = onePair[1];
	}
	return res;
}

function convertMapToString( inputMap )	{
	if ( inputMap == 'undefined' || inputMap == null )	{
		return null;
	}
	var res = '';
	var key = null;
	for ( key in inputMap ) {
		res += '||' + key + '=' + inputMap[key];
	}	
	res = res.replace(/\|*/, '{' );
	res += '}';
	return res;
}

function appendAndSave(variableName, key, value)	{
	var savedData = convertStringToMap( GM_getValue(variableName, null) );
	if ( savedData == null )	{
		savedData = new Object();
		savedData[key] = value;
	}
	else	{
		savedData[key] = value;
	}
	GM_setValue(variableName, convertMapToString( savedData ));
}

function getAvailableCargoShips()	{
	var availableCargoShips = 0;	
	try	{
		var cargoShipsText = $X("//*[@id='globalResources']/ul/li[@class='transporters']/a/span/following-sibling::*");
		cargoShipsText = cargoShipsText.innerHTML;
		cargoShipsText = cargoShipsText.split('(');
		cargoShipsText = cargoShipsText[0];
		availableCargoShips =  parseInt( cargoShipsText.replace(trimmerRegexpForNotNumbers,'') );
	}
	catch(err)	{
		availableCargoShips = 0;
	}
	return availableCargoShips;
}

function getSafeAmountFromPlayer(whLevel, inactive)	{
	var safeAmountPerLevel = inactive ? 80 : 480;
	// Because of more then one warehouse in the city and user writes a list
	// return ( whLevel * safeAmountPerLevel ) + 100;
	return ( whLevel * safeAmountPerLevel );
}

function addEvent(obj, evType, fn)	{
	return addEvent(obj, evType, fn, false);
}

function addEvent(obj, evType, fn, bubble)	{
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, bubble);
		return true;
	} else if (obj.attachEvent){
		var r = obj.attachEvent('on'+evType, fn);
		return r;
	} else {
		return false;
	}
}

function needToSetCheckInterval()	{
	var scriptIntervalVariableName = 'interval_80146';
	var interval = GM_getValue(scriptIntervalVariableName);
	if ( !(typeof(interval) == 'undefined' || !interval.toString().match(/^\d+$/)) )	{
		GM_setValue(scriptIntervalVariableName, '21600');
	}
}

function getAmountNumberFromCellText(cellText)	{
	return parseInt( cellText.replace(trimmerRegexpForNotNumbers,'') );
}

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1'); 
};
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};

// get all attributes in object (for debug)
function objToString(obj, description){
	var str = '';
	if( typeof(description) != 'undefined' && description != '' ){
		str = '+++ [ ' + description + ' ] +++\n';
	}
	str += 'typeof - ' + typeof(obj) + '\n';
	if(typeof(obj) != 'undefined'){
		for(key in obj){
			str += key + ' - ' + obj[key] + '\n';
		}
	}
	return str;
}

// alert all attribute in object (for debug)
function describe(obj, description){
	alert(objToString(obj, description));
}

function getRequestParam( name )	{
	name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
	var regexS = '[\\?&]'+name+'=([^&#]*)';
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )	{
		return '';
	}
	else	{
		return results[1];
	}
}

function getUnFormatNumberBy3(num) {
	var z = num.replace(/(\,)/g, '');
	return z;
}

function getFormatNumberBy3(num, decpoint, sep, isFillFraction, fraction_len, zeroAllow) {
    // check for missing parameters and use defaults if so
    if (arguments.length < 2) {
        sep = ',';
        decpoint = '.';
    }
    if (arguments.length < 3) {
        sep = ',';
    }
    if (arguments.length < 4) {
        isFillFraction = false;
    }
    if (arguments.length < 5) {
        fraction_len = 0;
    }
    if (arguments.length < 6) {
        zeroAllow = false;
    }

    // need a string for operations
    num = num.toString();
    if (num.indexOf('.') < 0) {
        num = num + decpoint;
    }
    else	{
    	num = num + '';
    }

    // separate the whole number and the fraction if possible
    var a = num.split(decpoint);    
    // decimal
    var x = a[0];
    // fraction
    var y = a[1];
    if (isFillFraction) {
        var padLen = 0;
        if (y != null) {
            padLen = fraction_len - y.length;
        }
        for (var j = 0; j < padLen; j++) {
            y = y + '0';
        }
    }
    
    if ( fraction_len != 0 )	{
    	y = y.substring(0, fraction_len);
    }

    var rexNumeric = /[0-9]/i;
    var strSign = '';
    if (x.length > 0) {
        strSign = x.substring(0, 1);
        if (!rexNumeric.test(strSign)) {
            x = x.substring(1, x.length);
        } else {
            strSign = '';
        }
    }

    var z = '';
    var result = '';

    if (typeof(x) != 'undefined') {
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i) != sep?x.charAt(i):'';

        z = z.replace(/(\d{3})/g, '$1' + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        result = '';
        for (i = z.length - 1; i >= 0; i--)
            result += z.charAt(i);
        if (typeof(y) != 'undefined' && y.length > 0) {
            result = result + decpoint + y;
        }
    }
    if (result.charAt(0) == '.') {
        result = '0' + result;
    }
    if ((getUnFormatNumberBy3(result) * 1) == 0) {
        if (!zeroAllow) {
            result = '';
        }
    }
    result = strSign + result;
    return result;
}

function getAmtFromNextSibling(e)	{
	var res = $X("./../td[@class='count']", e);
	return getAmountNumberFromCellText( res.innerHTML );
}

function setElementId(elem, preferredId)	{
	var idStr = preferredId;
	if ( isMessageLikeReportFormats )	{
		idStr += '-';
		idStr += idSuffix; 
	}
	elem.setAttribute('id', idStr);
}

function getInfoBoxDataKey(preferredKey)	{
	var key = preferredKey;
	if ( isMessageLikeReportFormats )	{
		key += '-';
		key += idSuffix; 
	}
	return key;
}

function logNamedAmounts(actionName, amountsName)	{
	var actualAmounts = amountsName == null ? amounts[idSuffix] : amounts[amountsName];
	console.log( '-------------------' + actionName + '-------------------' );
	console.log( 'wood: ' + actualAmounts[NAME_WOOD] );
	console.log( 'wine: ' + actualAmounts[NAME_WINE] );
	console.log( 'marble: ' + actualAmounts[NAME_MARBLE] );
	console.log( 'glass: ' + actualAmounts[NAME_GLASS] );
	console.log( 'sulfur: ' + actualAmounts[NAME_SULFUR] );
	console.log( 'total: ' + totalAmounts[idSuffix] );
}

function logAmounts(actionName)	{
	logNamedAmounts(actionName, null)
}

function fullLogAmounts()	{	
	for ( akey in amounts )	{
		console.log ( 'Actual msg is: ' + akey );
		var actAmts = amounts[akey];
		for ( aakey in actAmts )	{
			console.log( aakey + ': ' + actAmts[aakey] );
		}
	}
}

function calculateTotalAmt(resourcesTable)	{

	if(resourcesTable)	{
		//var listElements = resourcesTable.getElementsByTagName('tr');
		var listElements = $x("./tbody/tr/td[@class='unitname']", resourcesTable);
		
		var actualAmounts = amounts[idSuffix];
		
//		console.log( idSuffix );
		
		if ( actualAmounts == null )	{
			actualAmounts = new Object();
		}		
		totalAmounts[idSuffix] = 0;
		for (var i = 0; i < listElements.length; i++)	{
			//alert(listElements[i].innerHTML);
			if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0)	{
				//alert(NAME_WOOD);
				actualAmounts[NAME_WOOD] = getAmtFromNextSibling(listElements[i]);
				totalAmounts[idSuffix] += actualAmounts[NAME_WOOD];				
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_WOOD, false, false, 0) );
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_WOOD, false, true, 0) );
			}
			else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0)	{
				//alert(NAME_WINE);
				actualAmounts[NAME_WINE] = getAmtFromNextSibling(listElements[i]);
				totalAmounts[idSuffix] += actualAmounts[NAME_WINE];
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_WINE, false, false, 0) );
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_WINE, false, true, 0) );
			}
			else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0)	{
				//alert(NAME_MARBLE);
				actualAmounts[NAME_MARBLE] = getAmtFromNextSibling(listElements[i]);
				totalAmounts[idSuffix] += actualAmounts[NAME_MARBLE];
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_MARBLE, false, false, 0) );
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_MARBLE, false, true, 0) );
			}
			else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0)	{
				//alert('Crystal Glass');
				actualAmounts[NAME_GLASS] = getAmtFromNextSibling(listElements[i]);
				totalAmounts[idSuffix] += actualAmounts[NAME_GLASS];
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_GLASS, false, false, 0) );
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_GLASS, false, true, 0) );
			}
			else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0)	{
				//alert('Sulphur');
				actualAmounts[NAME_SULFUR] = getAmtFromNextSibling(listElements[i]);
				totalAmounts[idSuffix] += actualAmounts[NAME_SULFUR];
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_SULFUR, false, false, 0) );
				listElements[i].parentNode.appendChild( addSafeAmountToReportTable(NAME_SULFUR, false, true, 0) );
			}
		}
		var headerElement = $X("./tbody/tr/th/..", resourcesTable);
		if ( headerElement )	{
			headerElement.appendChild( addSafeAmountToReportTable('header', true, false, 0) );
			headerElement.appendChild( addSafeAmountToReportTable('header', true, true, 0) );
		}
		amounts[idSuffix] = actualAmounts;
//		logAmounts( 'calcTotalAmt' );
	}
}

function addSafeAmountToReportTable	(amountType, isHeader, isActive, amountToShow)	{
	var cellType = isHeader ? 'th' : 'td' ;
	var myCell = document.createElement( cellType );
	var myCellId = amountType + 'SafeAmount' + ( isActive ? '1' : '0');
	//myCell.setAttribute('id', myCellId );
	setElementId(myCell, myCellId);
	myCell.setAttribute('class', 'count');
	var cellText = '';
	if ( isHeader )	{
		cellText = isActive ? langData['tSafeAmountForActive'] : langData['tSafeAmountForInactive'];		
	}
	else	{
		cellText =  '(' + amountToShow + ')';
	}
	myCell.appendChild( document.createTextNode( cellText ) ) ;
	return myCell;
}

function isTargetPage()	{
	if(document.body.id == 'safehouseReports')		{
		var resourcesTable = document.getElementById('resources');
		if(resourcesTable)	{
			return true;
		}
		else	{
			return false;
		}
	}
	else	{
		return false;
	}
}

function showTotal(currentRootNode)	{

	// currentRootNode = td class="report"
	
	var referenceTr = currentRootNode.parentNode;
	var containerRowForMyTables = document.createElement('tr');
	var containerCellForMyTables = document.createElement('td');
	containerCellForMyTables.setAttribute('colspan', 2);	
	
	var myTable = document.createElement('table');
	myTable.setAttribute('class', 'record');
	
	myTable.setAttribute('cellpadding', '0');
	myTable.setAttribute('cellspacing', '0');
	myTable.setAttribute('width', '100%');		
	
	var myTableBody = document.createElement('tbody');

	// Total
	totalElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','job');
	td1.innerHTML = langData['tAmount'];

	td2 = document.createElement('td');
	td2.setAttribute('class','job');
	td2.innerHTML = getFormatNumberBy3(totalAmounts[idSuffix], '.', ',', false, 0, true);
	td2.setAttribute('colspan','2');

	totalElement.appendChild(td1);
	totalElement.appendChild(td2);

	//Warehouse Level
	levelElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','job');
	td1.innerHTML = langData['whLevel'];

	td2 = document.createElement('td');
	
	var exText = langData['tExt'];
	var wareHouseInput = document.createElement('input');
	wareHouseInput.setAttribute('type', 'text');
	wareHouseInput.setAttribute('style', 'text-align: right;');
	wareHouseInput.setAttribute('size', 8);
	//wareHouseInput.setAttribute('id', 'warehouseLevelId');
	setElementId(wareHouseInput, 'warehouseLevelId');
	wareHouseInput.setAttribute('value', 0);
	
	wareHouseInput.appendChild( document.createTextNode( '&#160;' + exText ) );		
	
	td2.appendChild( wareHouseInput );

	td2.setAttribute('colspan','2');
	//addEvent( td2, 'change', function(){calculateShipByElementEvent(this);}, false );
	addEvent( wareHouseInput, 'change', function(){calculateShipByElementEvent(this);}, false );

	levelElement.appendChild(td1);
	levelElement.appendChild(td2);
	
	// Ship counter inputbox
	shipCounterElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','job');
	td1.innerHTML = langData['tAvailableCargoShips'];

	td2 = document.createElement('td');
	
	var countOfShipsInput = document.createElement('input');
	countOfShipsInput.setAttribute('type', 'text');
	countOfShipsInput.setAttribute('style', 'text-align: right;');
	countOfShipsInput.setAttribute('size', 8);
	//countOfShipsInput.setAttribute('id', 'countOfShips');
	setElementId(countOfShipsInput, 'countOfShips');
	// TODO get count of ships from screen as deft value
	
	var countOfShips = getAvailableCargoShips();
	
	countOfShipsInput.setAttribute('value', countOfShips);
	
	countOfShipsInput.appendChild( document.createTextNode( '&#160;' ) );
	
	td2.appendChild( countOfShipsInput );
	
	td2.setAttribute('colspan','2');
	//addEvent( td2, 'change', function(){calculateShipByElementEvent(this);}, false );
	addEvent( countOfShipsInput, 'change', function(){calculateShipByElementEvent(this);}, false );

	shipCounterElement.appendChild(td1);
	shipCounterElement.appendChild(td2);
	
	// Lootable Amount		
	lootElementHead = document.createElement('tr');		
	
	td1 = document.createElement('td');
	td1.setAttribute('class','job');
	td1.innerHTML = '&nbsp';
	
	td2 = document.createElement('td');
	td2.setAttribute('class','job');		
	td2.innerHTML = langData['iPlayer'];
	
	td3 = document.createElement('td');
	td3.setAttribute('class','job');
	td3.innerHTML = langData['aPlayer'];
	
	lootElementHead.appendChild(td1);
	lootElementHead.appendChild(td2);
	lootElementHead.appendChild(td3);
	
	lootElement = document.createElement('tr');
	td1 = document.createElement('th');
	td1.setAttribute('class','unitname');
	td1.setAttribute('style','text-align:left');
	td1.innerHTML = langData['lAmount'];

	td2 = document.createElement('th');
	//td2.setAttribute('id','lootableId');
	setElementId(td2, 'lootableId');
	td2.setAttribute('class','count');
	td2.setAttribute('style','text-align:right');
	td2.innerHTML = '0';
	
	td3 = document.createElement('th');
	//td3.setAttribute('id','lootableIdFromActive');
	setElementId(td3, 'lootableIdFromActive');
	td3.setAttribute('class','count');
	td3.setAttribute('style','text-align:right');
	td3.innerHTML = '0';
	
	lootElement.appendChild(td1);		 
	lootElement.appendChild(td2);
	lootElement.appendChild(td3);		
	
	// detailed wood
	detailedWoodElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.innerHTML = '&nbsp;<img src="/skin/resources/icon_wood.gif"></img>';		
	td2 = document.createElement('td');
	//td2.setAttribute('id','woodFromInactive');
	setElementId(td2, 'woodFromInactive');
	td2.setAttribute('class','count');
	td2.setAttribute('class','count');
	td2.innerHTML = '0';		
	td3 = document.createElement('td');
	//td3.setAttribute('id','woodFromActive');
	setElementId(td3, 'woodFromActive');
	td3.setAttribute('class','count');
	td3.setAttribute('class','count');
	td3.innerHTML = '0%';
	detailedWoodElement.appendChild(td1);
	detailedWoodElement.appendChild(td2);
	detailedWoodElement.appendChild(td3);
	
	// detailed wine
	detailedWineElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.setAttribute('style', 'background-color:#FAEAC6');
	td1.innerHTML = '&nbsp;<img src="/skin/resources/icon_wine.gif"></img>';		
	td2 = document.createElement('td');
	//td2.setAttribute('id','wineFromInactive');
	setElementId(td2, 'wineFromInactive');
	td2.setAttribute('class','count');
	td2.setAttribute('style', 'background-color:#FAEAC6');
	td2.innerHTML = '0';
	td3 = document.createElement('td');
	//td3.setAttribute('id','wineFromActive');
	setElementId(td3, 'wineFromActive');
	td3.setAttribute('class','count');
	td3.setAttribute('style', 'background-color:#FAEAC6');
	td3.innerHTML = '0';
	detailedWineElement.appendChild(td1);
	detailedWineElement.appendChild(td2);
	detailedWineElement.appendChild(td3);
	
	// detailed marble
	detailedMarbleElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.innerHTML = '&nbsp;<img src="/skin/resources/icon_marble.gif"></img>';		
	td2 = document.createElement('td');
	//td2.setAttribute('id','marbleFromInactive');
	setElementId(td2, 'marbleFromInactive');
	td2.setAttribute('class','count');
	td2.innerHTML = '0';		
	td3 = document.createElement('td');
	//td3.setAttribute('id','marbleFromActive');
	setElementId(td3, 'marbleFromActive');
	td3.setAttribute('class','count');
	td3.innerHTML = '0';
	detailedMarbleElement.appendChild(td1);
	detailedMarbleElement.appendChild(td2);
	detailedMarbleElement.appendChild(td3);
	
	// detailed crystal
	detailedCrystalElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.setAttribute('style', 'background-color:#FAEAC6');
	td1.innerHTML = '&nbsp;<img src="/skin/resources/icon_glass.gif"></img>';		
	td2 = document.createElement('td');
	//td2.setAttribute('id','crystalFromInactive');
	setElementId(td2, 'crystalFromInactive');
	td2.setAttribute('class','count');
	td2.setAttribute('style', 'background-color:#FAEAC6');
	td2.innerHTML = '0';		
	td3 = document.createElement('td');
	//td3.setAttribute('id','crystalFromActive');
	setElementId(td3, 'crystalFromActive');
	td3.setAttribute('class','count');
	td3.setAttribute('style', 'background-color:#FAEAC6');
	td3.innerHTML = '0';
	detailedCrystalElement.appendChild(td1);
	detailedCrystalElement.appendChild(td2);
	detailedCrystalElement.appendChild(td3);
	
	// detailed sulphur
	detailedSulphurElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.innerHTML = '&nbsp;<img src="/skin/resources/icon_sulfur.gif"></img>';		
	td2 = document.createElement('td');
	//td2.setAttribute('id','sulphurFromInactive');
	setElementId(td2, 'sulphurFromInactive');
	td2.setAttribute('class','count');
	td2.innerHTML = '0';		
	td3 = document.createElement('td');
	//td3.setAttribute('id','sulphurFromActive');
	setElementId(td3, 'sulphurFromActive');
	td3.setAttribute('class','count');
	td3.innerHTML = '0';
	detailedSulphurElement.appendChild(td1);
	detailedSulphurElement.appendChild(td2);
	detailedSulphurElement.appendChild(td3);
	
	lineElement2 = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','job');
	td1.setAttribute('colspan', 3);
	td1.innerHTML = '<hr/>';
	lineElement2.appendChild(td1);

	// Ship Amount
	shipElement = document.createElement('tr');
	td1 = document.createElement('th');
	td1.setAttribute('class','job');
	td1.setAttribute('style','text-align:left');
	td1.innerHTML = langData['sAmount'];

	td2 = document.createElement('th');
	td2.setAttribute('class','count');
	td2.setAttribute('style','text-align:left');
	//td2.setAttribute('id','shipId');
	setElementId(td2, 'shipId');
	td2.innerHTML = '0';
	
	td3 = document.createElement('th');
	td3.setAttribute('class','count');
	td3.setAttribute('style','text-align:left');
	//td3.setAttribute('td3','shipIdFromActive');
	setElementId(td3, 'shipIdFromActive');
	td3.innerHTML = '0';

	shipElement.appendChild(td1);
	shipElement.appendChild(td2);
	shipElement.appendChild(td3);		

	var backURL;
	if ( !isMessageLikeReportFormats )	{
		//Back to hideout
		backURL = document.getElementById('backTo').getElementsByTagName('a')[0].href;
		var backURLParts = backURL.split('&');
		backURL = backURLParts[0] + '&' + backURLParts[1] + '&' + backURLParts[3];		
		
		var backLintText = langData['tBack'];
		backElement = document.createElement('tr');
		td1 = document.createElement('td');
		td1.setAttribute('class','unitname');
		td1.innerHTML = '';
	
		td2 = document.createElement('td');
		td2.setAttribute('colspan','3');
		
		var td2Image = document.createElement('img');
		td2Image.setAttribute('src', 'skin/buildings/y100/safehouse.gif');
		td2Image.setAttribute('width', '160');
		td2Image.setAttribute('height', '100');
		td2Image.setAttribute('width', '160');
		td2Image.setAttribute('width', '160');
		
		var td2Ref = document.createElement('a');
		td2Ref.setAttribute('href', backURL);
		td2Ref.setAttribute('title', backLintText);
		
		td2Ref.appendChild( td2Image );
		
		td2.appendChild( td2Ref );
		backElement.appendChild(td2);
	}

	// Enjoy!!
	enjoyElement = document.createElement('tr');
	td1 = document.createElement('td');
	td1.setAttribute('class','unitname');
	td1.innerHTML = '';

	td2 = document.createElement('td');
	td2.setAttribute('class','unitname');
	td2.innerHTML = langData['tEnjoy'];
	
	td3 = document.createElement('td');
	td3.setAttribute('class','unitname');
	td3.innerHTML = langData['tImp']; 
	
	var creditsTd = document.createElement('td');
	creditsTd.setAttribute('colspan', 3);
	creditsTd.appendChild( document.createTextNode( langData['tCredits'] ) );	
	creditsTd.setAttribute( 'style', 'text-align:center; font-weight:bold; cursor:pointer;' );
	
	addEvent( creditsTd, 'click', function(event){ showHideObject(event, 'creditsInfoBox') ;}, true );
	
	document.body.appendChild(createCreditsInfoBox());;
	enjoyElement.appendChild(creditsTd);
	
	myTableBody.appendChild(totalElement);
	myTableBody.appendChild(levelElement);
	myTableBody.appendChild(shipCounterElement);
	myTableBody.appendChild(lootElementHead);
	myTableBody.appendChild(lootElement);
	
	myTableBody.appendChild(detailedWoodElement);
	myTableBody.appendChild(detailedWineElement);
	myTableBody.appendChild(detailedMarbleElement);
	myTableBody.appendChild(detailedCrystalElement);
	myTableBody.appendChild(detailedSulphurElement);
	
	myTableBody.appendChild(shipElement);
	
	myTable.appendChild( myTableBody );		
	//currentRootNode.appendChild(myTable);
	containerCellForMyTables.appendChild(myTable);
	
	
	var myGraphicalTable = document.createElement('table');
	//myGraphicalTable.setAttribute('id', 'myGraphicalTable');
	setElementId(myGraphicalTable, 'myGraphicalTable');
	myGraphicalTable.style['borderStyle'] = 'none';
	myGraphicalTable.style['padding'] = '0px';
	myGraphicalTable.style['borderSpacing'] = '0px';
	
	var myGraphicalTableBody = document.createElement('tbody');		
	//myGraphicalTableBody.setAttribute('id', 'myGraphicalTableBody');
	setElementId(myGraphicalTableBody, 'myGraphicalTableBody');
	
	myGraphicalTable.appendChild(myGraphicalTableBody);
	//currentRootNode.appendChild( myGraphicalTable );
	containerCellForMyTables.appendChild( myGraphicalTable );
	
	var myAuthorDataTable = document.createElement('table');
	
	myAuthorDataTable.setAttribute('cellpadding', '0');
	myAuthorDataTable.setAttribute('cellspacing', '0');
	myAuthorDataTable.setAttribute('width', '100%');		
	
	var myAuthorDataTableBody = document.createElement('tbody');
	myAuthorDataTableBody.appendChild(enjoyElement);
	if ( !isMessageLikeReportFormats )	{
		myAuthorDataTableBody.appendChild(backElement);
	}
	myAuthorDataTable.appendChild(myAuthorDataTableBody);
	
	infoBox = document.createElement('div');
	infoBox.setAttribute('id','infoBox');
	//setElementId(infoBox, 'infoBox');
	
	infoBox.setAttribute('style','background-color:#FDF7DD; background-image:none; border-color:#BE8D53; border-right:1px solid #BE8D53; border-style:solid; border-width:4px 1px 1px; color:#612D04; display:none; margin:-36px 0 0 36px; padding:0; position:absolute; text-align:left; z-index:10000; font: 12px Arial,Helvetica,sans-serif; width: auto;');
	
	document.body.appendChild(infoBox);

	//currentRootNode.appendChild(myAuthorDataTable);
	containerCellForMyTables.appendChild(myAuthorDataTable);
	
	containerRowForMyTables .appendChild(containerCellForMyTables);
	referenceTr.parentNode.insertBefore(containerRowForMyTables, referenceTr.nextSibling);
	
}

function createCreditsInfoBox()	{
	var creditsInfoBox = document.createElement('div');
	
	//creditsInfoBox.setAttribute('id','creditsInfoBox');
	setElementId(creditsInfoBox, 'creditsInfoBox');
	creditsInfoBox.setAttribute('style','background-color:#FDF7DD; background-image:none; border-color:#BE8D53; border-right:1px solid #BE8D53; border-style:solid; border-width:4px 1px 1px; color:#612D04; margin:-36px 0 0 36px; padding:0; position:absolute; text-align:left; z-index:10000; font: 12px Arial,Helvetica,sans-serif; width: auto; visibility: hidden;');
	
	var creditsSpan = document.createElement('span');
	
	creditsSpan.setAttribute('style', 'display:block;');
	creditsSpan.appendChild( document.createTextNode('SnP Helper Reloaded v.' + currentVersion ) );
	creditsInfoBox.appendChild( creditsSpan );
	
	creditsSpan = document.createElement('span');
	creditsSpan.setAttribute('style', 'display:block;');
	creditsSpan.appendChild( document.createTextNode(langData['tEnjoy']) );
	creditsInfoBox.appendChild( creditsSpan );
	
	creditsSpan = document.createElement('span');
	creditsSpan.setAttribute('style', 'display:block;');
	creditsSpan.appendChild( document.createTextNode(langData['tImp']) );
	creditsInfoBox.appendChild( creditsSpan );
	
	creditsSpan = document.createElement('span');
	creditsSpan.setAttribute('style', 'display:block;');
	creditsSpan.appendChild( document.createTextNode(langData['tImp2']) );
	creditsInfoBox.appendChild( creditsSpan );
	
	
	creditsSpan = document.createElement('span');
	creditsSpan.setAttribute('style', 'display:block;');
	
	var homePageLink = document.createElement('a');
	homePageLink.setAttribute('href', 'http://userscripts.org/scripts/show/80146');
	homePageLink.setAttribute('target', '_blank');	
	homePageLink.appendChild( document.createTextNode(langData['tHomePage']) );		
	creditsInfoBox.appendChild( homePageLink );	
	
	return creditsInfoBox;
}

function validateInput(idSuffixStr)	{
	//validate input
	var elemId = 'warehouseLevelId';
	if ( idSuffixStr != null )	{
		elemId += idSuffixStr;
	}
	var level = document.getElementById(elemId);	
	var snp_LevelSplit = level.value.split(',');

	for (var i = 0; i < snp_LevelSplit.length; i++)	{
		if(isNaN(snp_LevelSplit[i]))	{
			alert(langData['tOnlyNum']);
			level.value='0';
			level.focus();
			return false;
		}
		else	{
			if(parseInt(snp_LevelSplit[i]) > 160 || parseInt(snp_LevelSplit[i]) < 0)	{
				alert(langData['tInterval']);
				level.value='0';
				level.focus();
				return false;
			}
		}
	}
		
	elemId = 'countOfShips';
	if ( idSuffixStr != null )	{
		elemId += idSuffixStr;
	}
	var countOfShipsEdit = document.getElementById(elemId);
		
	if ( isNaN( countOfShipsEdit.value ) )	{
		alert(langData['tOnlyNum']);
		countOfShipsEdit.value='0';
		countOfShipsEdit.focus();
		return false;
	}
	return true;
}

function calculateShipByElementEvent(elem)	{
	var origId = elem.getAttribute('id');
	var idParts = origId.split('-');
	if ( idParts.length > 0 )	{
		//console.log('**********************');
		//console.log('calculateShip ID: ' + idParts[1]);
		//logNamedAmounts('CALCSHIP', idParts[1]);
		//console.log('**********************');
		idSuffix = idParts[1];
		calculateShip(idParts[1]);				
	}
	else	{
		calculateShip(null);
	}
}

function calculateShip(idSuffixStr)	{
	
	//console.log ( 'IN CALCSHIP');
	
	if ( idSuffixStr != null && idSuffixStr.length > 0 )	{
		idSuffixStr = '-' + idSuffixStr;
	}
	else	{
		idSuffixStr = 'dft';
	}
	if(!validateInput(idSuffixStr))	{
		document.getElementById('warehouseLevelId' + idSuffixStr).value = '0';
	}

	//find safe amt
	var level = document.getElementById('warehouseLevelId' + idSuffixStr);
	//console.log( 'idSuffixStr: ' + idSuffixStr );
	var snp_LevelSplit = level.value.split(',');	
			
	// Because of more then one warehouse in the city and user writes a list
	snp_active_sum = 100;
	snp_inactive_sum = 17;
			
	for (var i = 0; i < snp_LevelSplit.length; i++)	{
		snp_active_sum = snp_active_sum + getSafeAmountFromPlayer(snp_LevelSplit[i], false);
		snp_inactive_sum = snp_inactive_sum + getSafeAmountFromPlayer(snp_LevelSplit[i], true);
	}
	//console.log( 'snp_active_sum: ' + snp_active_sum + ' snp_inactive_sum: ' + snp_inactive_sum );
	var actualAmounts = amounts[idSuffix];
	
//	logAmounts('calcShip');
			
	var maxResourceToDisplay = actualAmounts[NAME_WOOD];
	if ( maxResourceToDisplay < actualAmounts[NAME_WINE] )	{
		maxResourceToDisplay = actualAmounts[NAME_WINE];
	}
	if ( maxResourceToDisplay < actualAmounts[NAME_MARBLE] )	{
		maxResourceToDisplay = actualAmounts[NAME_MARBLE];
	}
	if ( maxResourceToDisplay < actualAmounts[NAME_GLASS] )	{
		maxResourceToDisplay = actualAmounts[NAME_GLASS];
	}
	if ( maxResourceToDisplay < actualAmounts[NAME_SULFUR] )	{
		maxResourceToDisplay = actualAmounts[NAME_SULFUR];
	}
	if ( maxResourceToDisplay < snp_active_sum )	{
		maxResourceToDisplay = Math.floor(snp_active_sum * 1.1);
	} 
	
	amtPerPixel = maxResourceToDisplay / maxWidthForGraph;
	inactiveSafePixelCount = Math.floor(snp_inactive_sum * maxWidthForGraph / maxResourceToDisplay);
	activeSafePixelCount = Math.floor( (snp_active_sum - snp_inactive_sum ) * maxWidthForGraph / maxResourceToDisplay);	// only without the inactive the active part
	
	var safeAmountFromInactive = getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true);			
	var safeAmountFromActive = getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true);			

	b = actualAmounts[NAME_WOOD] - snp_inactive_sum < 0 ? 0 : actualAmounts[NAME_WOOD] - snp_inactive_sum;
	w = actualAmounts[NAME_WINE] - snp_inactive_sum < 0 ? 0 : actualAmounts[NAME_WINE] - snp_inactive_sum;
	m = actualAmounts[NAME_MARBLE] - snp_inactive_sum < 0 ? 0 : actualAmounts[NAME_MARBLE] - snp_inactive_sum;
	c = actualAmounts[NAME_GLASS] - snp_inactive_sum < 0 ? 0 : actualAmounts[NAME_GLASS] - snp_inactive_sum;
	s = actualAmounts[NAME_SULFUR] - snp_inactive_sum < 0 ? 0 : actualAmounts[NAME_SULFUR] - snp_inactive_sum;
	
	b_active = actualAmounts[NAME_WOOD] - snp_active_sum < 0 ? 0 : actualAmounts[NAME_WOOD] - snp_active_sum;
	w_active = actualAmounts[NAME_WINE] - snp_active_sum < 0 ? 0 : actualAmounts[NAME_WINE] - snp_active_sum;
	m_active = actualAmounts[NAME_MARBLE] - snp_active_sum < 0 ? 0 : actualAmounts[NAME_MARBLE] - snp_active_sum;
	c_active = actualAmounts[NAME_GLASS] - snp_active_sum < 0 ? 0 : actualAmounts[NAME_GLASS] - snp_active_sum;
	s_active = actualAmounts[NAME_SULFUR] - snp_active_sum < 0 ? 0 : actualAmounts[NAME_SULFUR] - snp_active_sum;
	
	//console.log ( 'INACTIVE wood: ' + b + ' wine: ' + w + ' marble: ' + m + ' glass: ' + c + ' sulf: ' + s);
	//console.log ( '**ACTIVE wood: ' + b_active + ' wine: ' + w_active + ' marble: ' + m_active + ' glass: ' + c_active + ' sulf: ' + s_active);

	var lootableAmt = b + w + m + c + s;
	var lootableAmtFromActive = b_active + w_active + m_active + c_active + s_active;
	
	var countOfShipsNonZero = ( document.getElementById('countOfShips' + idSuffixStr) && document.getElementById('countOfShips' + idSuffixStr).value != '0' );
	var countOfShips = document.getElementById('countOfShips' + idSuffixStr).value * 500;
	var amountToLootWithShip = 0;
	
	amountOfLootTxt = getFormatNumberBy3(lootableAmt, '.', ',', false, 0, true);			
	if (countOfShipsNonZero)	{
		amountToLootWithShip = countOfShips;
		if ( amountToLootWithShip > lootableAmt )	{
			amountToLootWithShip = lootableAmt;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('lootableId' + idSuffixStr).innerHTML = amountOfLootTxt;			
	
	amountOfLootTxt = getFormatNumberBy3(lootableAmtFromActive, '.', ',', false, 0, true);			
	if (countOfShipsNonZero)	{
		amountToLootWithShip = countOfShips;
		if ( amountToLootWithShip > lootableAmtFromActive )	{
			amountToLootWithShip = lootableAmtFromActive;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('lootableIdFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;			
	
	amountOfLootTxt = getFormatNumberBy3(b, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = b * countOfShips / lootableAmt;
		if ( amountToLootWithShip > b )	{
			amountToLootWithShip = b;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('woodFromInactive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('woodSafeAmount0' + idSuffixStr).innerHTML = safeAmountFromInactive;			
	
	amountOfLootTxt = getFormatNumberBy3(b_active, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = b_active * countOfShips / lootableAmt;
		if ( amountToLootWithShip > b_active )	{
			amountToLootWithShip = b_active;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('woodFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;	
	document.getElementById('woodSafeAmount1' + idSuffixStr).innerHTML = safeAmountFromActive;		
	
	amountOfLootTxt = getFormatNumberBy3(w, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = w * countOfShips / lootableAmt;
		if ( amountToLootWithShip > w )	{
			amountToLootWithShip = w;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('wineFromInactive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('wineSafeAmount0' + idSuffixStr).innerHTML = safeAmountFromInactive;
	
	amountOfLootTxt = getFormatNumberBy3(w_active, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = w_active * countOfShips / lootableAmt;
		if ( amountToLootWithShip > w_active )	{
			amountToLootWithShip = w_active;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('wineFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('wineSafeAmount1' + idSuffixStr).innerHTML = safeAmountFromActive;
	
	amountOfLootTxt = getFormatNumberBy3(m, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = m * countOfShips / lootableAmt;
		if ( amountToLootWithShip > m )	{
			amountToLootWithShip = m;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('marbleFromInactive' + idSuffixStr).innerHTML = amountOfLootTxt;				
	document.getElementById('marbleSafeAmount0' + idSuffixStr).innerHTML = safeAmountFromInactive;
	
	amountOfLootTxt = getFormatNumberBy3(m_active, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = m_active * countOfShips / lootableAmt;
		if ( amountToLootWithShip > m_active )	{
			amountToLootWithShip = m_active;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('marbleFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('marbleSafeAmount1' + idSuffixStr).innerHTML = safeAmountFromActive;
	
	amountOfLootTxt = getFormatNumberBy3(c, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = c * countOfShips / lootableAmt;
		if ( amountToLootWithShip > c )	{
			amountToLootWithShip = c;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('crystalFromInactive' + idSuffixStr).innerHTML = amountOfLootTxt;					
	document.getElementById('glassSafeAmount0' + idSuffixStr).innerHTML = safeAmountFromInactive;
	
	amountOfLootTxt = getFormatNumberBy3(c_active, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = c_active * countOfShips / lootableAmt;
		if ( amountToLootWithShip > c_active )	{
			amountToLootWithShip = c_active;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('crystalFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('glassSafeAmount1' + idSuffixStr).innerHTML = safeAmountFromActive;			
	
	amountOfLootTxt = getFormatNumberBy3(s, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = s * countOfShips / lootableAmt;
		if ( amountToLootWithShip > s )	{
			amountToLootWithShip = s;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('sulphurFromInactive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('sulfurSafeAmount0' + idSuffixStr).innerHTML = safeAmountFromInactive;
	
	amountOfLootTxt = getFormatNumberBy3(s_active, '.', ',', false, 0, true);			
	if (countOfShipsNonZero && lootableAmt != 0)	{
		amountToLootWithShip = s_active * countOfShips / lootableAmt;
		if ( amountToLootWithShip > s_active )	{
			amountToLootWithShip = s_active;
		}
		amountOfLootTxt = amountOfLootTxt + ' (' + getFormatNumberBy3( amountToLootWithShip, '.', ',', true, 2, true) + ')';
	}
	document.getElementById('sulphurFromActive' + idSuffixStr).innerHTML = amountOfLootTxt;
	document.getElementById('sulfurSafeAmount1' + idSuffixStr).innerHTML = safeAmountFromActive;			

	// cal ship
	document.getElementById('shipId' + idSuffixStr).innerHTML = Math.ceil(lootableAmt / 500);
	document.getElementById('shipIdFromActive' + idSuffixStr).innerHTML = Math.ceil(lootableAmtFromActive / 500);
	
	fillGraphicalTable(idSuffixStr);
}

function checkCurrentViewEqual(name)	{
	if(getRequestParam('view') == name)	{
		return true;
	}
	else	{
		return false;
	}
}

function checkCurrentActionEqual(name)	{
	if(getRequestParam('action') == name)	{
		return true;
	}
	else	{
		return false;
	}
}

function checkCurrentTabEqual(name)	{
	if(getRequestParam('tab') == name)	{
		return true;
	}
	else	{
		return false;
	}
}

function findAndSaveWarehouseLevel()	{
	var snp_ware = $x(".//div[@id='mainview']/ul[@id='locations']/li[@class='warehouse']");
	var snp_wLevel = new Array();
	var i = 0;
	
	for (i = 0; i < snp_ware.length; i++)	{
		var wLevel = parseInt(snp_ware[i].getElementsByTagName('a')[0].title.split(' ')[snp_ware[i].getElementsByTagName('a')[0].title.split(' ').length-1].trim());
		snp_wLevel.push(wLevel);
	}
	
	snp_wLevel.sort(sortDescending);
	
	var snp_wLevelStr = '';
	i = snp_wLevel.length > 4 ? 4 : snp_wLevel.length;
	while ( i-- != 0 )	{
		snp_wLevelStr += ',' + snp_wLevel[i];
	}
	
	snp_wLevelStr = snp_wLevelStr.replace(',', '');
	var snp_cityId = getRequestParam('id');

	appendAndSave(CITY_IDS_AND_WH_LEVELS, snp_cityId, snp_wLevelStr);	
}

function findDumpLevels()	{
	var dumps = $x(".//div[@id='mainview']/ul[@id='locations']/li[@class='warehouse']");
	var sumOfDumpLevels = 0;
	var i = 0;
	
	for (i = 0; i < dumps.length; i++)	{
		var wLevel = parseInt( dumps[i].getElementsByTagName('a')[0].title.replace(trimmerRegexpForNotNumbers,'') );
		sumOfDumpLevels += wLevel;
	}
	return sumOfDumpLevels;
}

function snpInit()	{		
	setLangData();
	
	/*	 
	
	innen indulunk:
	$x(".//div[@id='mainview']/div[@class='contentBox01']/div[@class='content']/form/table/tbody/tr[@class='report']")	
	&& style.display != none
	 
	*/
	
	if(checkCurrentViewEqual('safehouse') && checkCurrentTabEqual('reports'))	{
		var versionTag = $X(".//li[@class='version']/a/span");
		var verisonStr = versionTag.innerHTML;
		if ( verisonStr != 'v0.4.1' )	{
			isMessageLikeReportFormats = true;
			//maxWidthForGraph = 400;
			maxWidthForGraph = 400;
			var resourceTables = $x(".//table[@id='resources']");
			var i = 0;
			for ( i = 0; i != resourceTables.length; i++ )	{
				
				//							 td.       nyitható tr.tbody.     table.     div.      td cl=rptxt.tr (ami kell)
				idSuffix = resourceTables[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id');				
				
				calculateTotalAmt(resourceTables[i]);
				showTotal(resourceTables[i].parentNode);
				calculateShip(idSuffix);
			}
		}
	}	
	
	if(checkCurrentViewEqual('city'))	{
		findAndSaveWarehouseLevel();
		findDumpLevels();
	}	
	
	if(checkCurrentViewEqual('safehouse') && (getRequestParam('tab') != 'reports'))	{
		// Save city id-s from available spy reports to enable direct pillage / blockade buttons
		saveSpyCityRelations();
	}
	
	// Warehouse Report	
	if (checkCurrentViewEqual('safehouseReports') || checkCurrentActionEqual('Espionage'))	{
		var currentSpyId = getRequestParam('spy');
		var currentCityId = getCityIdBySpyId(currentSpyId);
		var snp_saveLevel = '0';
		
		
		var resourcesTable = document.getElementById('resources');
		calculateTotalAmt(resourcesTable);
		
		var savedWhLevels = convertStringToMap( GM_getValue(CITY_IDS_AND_WH_LEVELS, null) );
		if ( savedWhLevels != null && savedWhLevels[currentCityId] != null )	{
			snp_saveLevel = savedWhLevels[currentCityId];
		}
		
		if ( isTargetPage() )	{
			showTotal(document.getElementsByTagName('tbody')[0].parentNode.parentNode);
			document.getElementById('warehouseLevelId').value = snp_saveLevel;
			calculateShip(null);
		}				
		
		/*
		// Removed because users asked for the original working
		// Back to hideout URL handing
		var backURL = document.getElementById('backTo').getElementsByTagName('a')[0].href;
		var backURLParts = backURL.split('&');
		document.getElementById('backTo').getElementsByTagName('a')[0].href = backURLParts[0] + '&' + backURLParts[1] + '&' + backURLParts[3];
		*/
		
		// Add Action Buttons
		var i = 0;
		var j = 0; 
		addGmStyle('#actions li { float: left; margin: 6px 0; position: relative; width: 109px; }');
		addGmStyle('#actions li img { height: 40px; }');
		
		var newLeftSideBox = document.createElement('div');
		newLeftSideBox.id = 'island';										// id=island, so that we can use the already existing CSS-Styles (*)
		newLeftSideBox.className = 'dynamic';
		
		var h3Child = document.createElement('h3');
		h3Child.className = 'header';
		h3Child.innerHTML = langData['tActions'];
		newLeftSideBox.appendChild(h3Child);
		
		var divChild = document.createElement('div');
		divChild.id = 'actions';
		divChild.className = 'content';
		newLeftSideBox.appendChild(divChild);
		
		var ulChild = document.createElement('ul');
		ulChild.className = 'cityactions';
		divChild.appendChild(ulChild);
		
		var li1 = document.createElement('li');
		li1.className = 'plunder';
		ulChild.appendChild(li1);
		var li2 = document.createElement('li');
		li2.className = 'blockade';
		ulChild.appendChild(li2);
		
		var a1 = document.createElement('a');
		var a2 = document.createElement('a');
		
		var img1 = document.createElement('img');
		img1.src = 'skin/actions/plunder_disabled.gif';
		var img2 = document.createElement('img');
		img2.src = 'skin/actions/blockade_disabled.gif';
		
		if ( currentCityId != null )	{				 
			a1.href = '?view=plunder&destinationCityId=' + currentCityId;
			a2.href = '?view=blockade&destinationCityId=' + currentCityId;
			img1.src = 'skin/actions/plunder.gif';
			img2.src = 'skin/actions/blockade.gif';
		}		
		
		li1.appendChild(a1);
		li2.appendChild(a2);
		a1.appendChild(img1);
		a2.appendChild(img2);
		
		var divChild2 = document.createElement('div');
		divChild2.className = 'footer';
		newLeftSideBox.appendChild(divChild2);
							
		document.getElementById('container2').insertBefore(newLeftSideBox, document.getElementById('mainview'));
	}	
	//fullLogAmounts();
}

function getCityIdBySpyId(currentSpyId)	{
	try	{
		var found = false;
		spiesOnMission = eval(GM_getValue(CITY_AND_SPY_IDS));			
//		console.log( 'currentSpyId: ' + currentSpyId );
		
		i = -1;
		while ( !found && ++i != spiesOnMission.length )	{
			j = -1;
			while ( !found && ++j != spiesOnMission[i].spies.length )	{
//				console.log( 'spiesOnMission[' + i + '].spies[' + j + '].spyId: ' + spiesOnMission[i].spies[j].spyId );
				found = (spiesOnMission[i].spies[j].spyId == currentSpyId);					
			}				
		}
		
//		console.log(found);
		
//		console.log(spiesOnMission[i].spies[j]);
//		console.log(spiesOnMission[i].spies[j].cityId);
		
		if ( found )	{
			return spiesOnMission[i].spies[j].cityId;
		}
		else	{
			return null;
		}
	}
	catch(err)	{
		GM_log('Error in SnP Helper Reloaded when getting target city id through spy id: ' + err);
	}
}

function saveSpyCityRelations()	{
	var cityId = new Array();
	var spyId = new Array();
	var currentCityId = getRequestParam('id');
	var spiesOnMission = new Array();
	var i = 0;
	var j = 0;
	var numberOfSavedSpies = 0; 

	for each(div in document.getElementsByClassName('spyinfo')) {
		try {
			cityId.push((div.getElementsByClassName('city')[0].getElementsByTagName('a')[0].href).split('=')[2]);
			spyId.push((div.getElementsByClassName('missionButton')[0].getElementsByTagName('a')[0].href).split('=')[4]);
		} catch (err) {
			// alert(err);
		}
	}
	
	var cityAndSpyIds = GM_getValue(CITY_AND_SPY_IDS);
	
	if( cityAndSpyIds == null || cityAndSpyIds.length == 0 ) {	// any safehouse of any city hasn't been visited yet
		spiesOnMission = new Array();
		spiesOnMission[0] = new Object();
		spiesOnMission[0]['cityId'] = currentCityId;
		spiesOnMission[0]['spies'] = new Array();
		for(i = 0; i < spyId.length; ++i) {
			spiesOnMission[0]['spies'][i] = new Object();
			spiesOnMission[0]['spies'][i]['cityId'] = cityId[i];
			spiesOnMission[0]['spies'][i]['spyId'] = spyId[i];
		}
	} 
	else {
		spiesOnMission = eval( cityAndSpyIds );
		var arrayNumberToBeWorkedOn = -1;
		for( i = 0; i < spiesOnMission.length; ++i) {
			if(spiesOnMission[i].cityId == currentCityId) {
				arrayNumberToBeWorkedOn = i;
			}
		}
		
		if(arrayNumberToBeWorkedOn == -1) {			// then the safehouse of the current city hasn't been visited yet
			spiesOnMission[i] = new Object();
			spiesOnMission[i]['cityId'] = currentCityId;
			spiesOnMission[i]['spies'] = new Array();
			for(j = 0; j < spyId.length; ++j) {
				spiesOnMission[i]['spies'][j] = new Object();
				spiesOnMission[i]['spies'][j]['cityId'] = cityId[j];
				spiesOnMission[i]['spies'][j]['spyId'] = spyId[j];
			}
		} 
		else {										// then the safehouse of the current city has already been visited
			var newElement = new Object();
			for(j = 0; j < spyId.length; ++j) {
				if(!(spiesOnMission[arrayNumberToBeWorkedOn].spies.contains(spyId[j]))) {	// spy is not in the array yet
					numberOfSavedSpies = spiesOnMission[arrayNumberToBeWorkedOn].spies.length;
					if(numberOfSavedSpies >= 32) {				// for that savehouse 32 spyIDs are already saved
						spiesOnMission[arrayNumberToBeWorkedOn].spies.shift();
					} 
					newElement = new Object();
					newElement['cityId'] = cityId[j];
					newElement['spyId'] = spyId[j];
					spiesOnMission[arrayNumberToBeWorkedOn]['spies'][numberOfSavedSpies] = newElement;
				} else {																	// spy is already in the array
					var position = spiesOnMission[arrayNumberToBeWorkedOn].spies.containsAtIndex(spyId[j]);
					numberOfSavedSpies = spiesOnMission[arrayNumberToBeWorkedOn].spies.length;
					spiesOnMission[arrayNumberToBeWorkedOn].spies.array_value_delete(position);
					newElement = new Object();
					newElement['cityId'] = cityId[j];
					newElement['spyId'] = spyId[j];
					spiesOnMission[arrayNumberToBeWorkedOn]['spies'][numberOfSavedSpies - 1] = newElement;
				}
			}
		}
	}
	GM_setValue(CITY_AND_SPY_IDS, uneval(spiesOnMission));
}

// Graphical section

function findPos(obj) {
	var curleft = curtop = 0;
	
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}	while (obj = obj.offsetParent);		
	}	
	return [curleft,curtop];
}

function showInfoBox(event)	{
	try	{		
		var trg = event.currentTarget;
		var position = findPos(trg);		
		var infoBox = document.getElementById('infoBox');
		
		infoBox.style.left = position[0]+'px';
		infoBox.style.top = (position[1]+75)+'px';	
				
		infoBox.innerHTML = infoBoxData[trg.getAttribute('id')];
		infoBox.style.display = 'block';									
	}
	catch ( err )	{
		//	myGM_Log( err );
	}
}

function showHideObject(event, objId)	{	
	var obj = document.getElementById(objId);
	if ( null != obj ) 	{
		if ( 'hidden' == obj.style.visibility  )	{
			obj.style.visibility = 'visible';
		}
		else	{
			obj.style.visibility = 'hidden';
		}
	}	
	if ( null != event )	{
		var trg = event.currentTarget;
		var position = findPos(trg);	
		obj.style.left = (position[0]+125)+'px';
		obj.style.top = (position[1]+75)+'px';
	}
}

function addResourceImageTd(resourceType)	{
	var imageTd = document.createElement('td');
	imageTd.style['border'] = '0px';
	imageTd.style['padding'] = '0px';
	imageTd.style['verticalAlign'] = 'middle';
	
	var imageDiv = document.createElement('div');	
	var myImg = document.createElement('img');	 
	
	imageDiv.setAttribute('width', '30px');
	imageDiv.setAttribute('height', '30px');
	imageDiv.setAttribute('font-size', '1px');
	imageDiv.setAttribute('line-height', '1px');	
	
	myImg.setAttribute('src', basePathForResources + resourceImages[resourceType]);
	imageDiv.appendChild( myImg );
	imageTd.appendChild( imageDiv );
	
	return imageTd;
}

function addDivBaseStyle(myDiv, isHorizontalBar)	{
	myDiv.style['height'] = isHorizontalBar ? '30px' : '5px';
	myDiv.style['line-height'] = '1px';
	myDiv.style['font-size'] = '1px';
	myDiv.style['cssFloat'] = 'left';
}

function addLimiterDiv(isHorizontalBar)	{
	var limiterDiv = document.createElement('div');
	addDivBaseStyle(limiterDiv, isHorizontalBar);	
	limiterDiv.style['background'] = '#8C6846';
	limiterDiv.style['width'] = '2px';
	return limiterDiv;
}

function addResourceDiv(divWidth, isHorizontalBar, isFilled, color, divId)	{
	var resourceDiv = document.createElement('div');
	addDivBaseStyle(resourceDiv, isHorizontalBar);
	if ( isFilled && null != color )	{
		resourceDiv.appendChild( addClipDiv(divWidth, isHorizontalBar, color) );
	}
	resourceDiv.style['width'] = ( divWidth + 'px' );
	
	if ( null != divId )	{
		//resourceDiv.setAttribute('id', divId);
		setElementId(resourceDiv, divId);
		addEvent( resourceDiv, 'mouseover', function(event){showInfoBox(event, false);}, true );
		addEvent( resourceDiv, 'mouseout', function(){document.getElementById('infoBox').style.display = 'none';}, true );
	}
	
	return resourceDiv;
}

function addSliderEndDiv(isLeft)	{
	var sliderEndDiv = document.createElement('div');
	addDivBaseStyle(sliderEndDiv, true);
	sliderEndDiv.style['width'] = '10px';
	if ( isLeft )	{
		sliderEndDiv.style['background'] = 'url("' + slider_build_bg_leftend_10px + '")';
	}
	else	{
		sliderEndDiv.style['background'] = 'url("' + slider_build_bg_rightend_10px + '")';
		sliderEndDiv.style['cssFloat'] = 'right';	
	}
		
	return sliderEndDiv;	
}

function addClipDiv(divWidth, isHorizontalBar, color)	{
	var clipDiv = document.createElement('div');
	clipDiv.style['clip'] = 'rect(0px, ' + divWidth + 'px, 25px, 0px)';	
	clipDiv.style['background'] = 'url("' + sliders[color] + '") transparent';		
	clipDiv.style['width'] = ( divWidth + 'px' );
	clipDiv.style['font-size'] = '1px';
	clipDiv.style['cssFloat'] = 'left';
	clipDiv.style['height'] = '8px';
	clipDiv.style['position'] = 'relative';
	clipDiv.style['top'] = '11px';
	return clipDiv;
}

function addPadderTr()	{
	var actualTr = document.createElement('tr');
	actualTr.setAttribute('height', '2px');
	actualTr.style['border'] = '0px';
	actualTr.style['padding'] = '0px';
	var underPictureTd = document.createElement('td');
	underPictureTd.style['border'] = '0px';
	underPictureTd.style['padding'] = '0px';
	underPictureTd.appendChild( addResourceDiv(20, false, false, null, null) );
	
	var underBarTd = document.createElement('td');
	underBarTd.style['border'] = '0px';
	underBarTd.style['padding'] = '0px';
	underBarTd.appendChild( addResourceDiv(inactiveSafePixelCount + widthOfSliderLeftEnd, false, false, null, null) );
	underBarTd.appendChild( addLimiterDiv(false) );
	underBarTd.appendChild( addResourceDiv(activeSafePixelCount, false, false, null, null) );
	underBarTd.appendChild( addLimiterDiv(false) );
	underBarTd.appendChild( addResourceDiv(maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, false, false, null, null) );
	
	var underAmountTd = document.createElement('td');
	underAmountTd.appendChild(addResourceDiv(1, false, false, null, null));
	underAmountTd.style['border'] = '0px';
	underAmountTd.style['padding'] = '0px';
	
	actualTr.appendChild( underPictureTd );
	actualTr.appendChild( underBarTd );
	actualTr.appendChild( underAmountTd );
	
	return actualTr;
}

function addResourceValueTd(actAmt)	{
	var myTd = document.createElement('td');
	
	myTd.setAttribute('color', 'black');
	myTd.setAttribute('class', 'count');
	myTd.setAttribute('font-family', 'Arial, Helvetica');
	myTd.setAttribute('font-size', '12px');
	myTd.setAttribute('nowrap', 'nowrap');
	myTd.setAttribute('align', 'left');
	myTd.style['border'] = '0px';
	myTd.style['padding'] = '0px';
	myTd.style['verticalAlign'] = 'middle';
	
	myTdText = document.createTextNode( getFormatNumberBy3(actAmt, '.', ',', false, 0, true) ) ;
	myTd.appendChild( myTdText );
	return myTd;
}

function addResourceTr(resourceType, actAmt)	{
	var actualTr = document.createElement('tr');
	//actualTr.setAttribute('id', resourceType + 'HorizontalBar');
	setElementId(actualTr, resourceType + 'HorizontalBar');
	actualTr.style['border'] = '0px';
	actualTr.style['padding'] = '0px';
	
	var actualTd = document.createElement('td');	
	actualTd.style['border'] = '0px';
	actualTd.style['padding'] = '0px';
	actualTd.style['background'] = 'url("' + slider_build_bg_6px + '")';
	var divWidth = 1;
	
	actualTd.appendChild( addSliderEndDiv(true) );
	
	var inactiveSafeAmountResourceId = resourceType + '-' + 'inactiveSafeAmount';
	var activeSafeAmountResourceId = resourceType + '-' + 'activeSafeAmount';
	var unSafeAmountResourceId = resourceType + '-' + 'unSafeAmount';
	
	/*
	if ( isMessageLikeReportFormats )	{
		inactiveSafeAmountResourceId += '-' + idSuffix;
		activeSafeAmountResourceId += '-' + idSuffix;
		unSafeAmountResourceId += '-' + idSuffix;
	}
	*/
	
	if ( actAmt == snp_inactive_sum )	{
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount, true, false, null, null ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount, true, false, null, null ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );
	}	
	else if ( actAmt < snp_inactive_sum )	{	
		infoBoxData[getInfoBoxDataKey(inactiveSafeAmountResourceId)] = 
			langData['tInfoBoxInactiveSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveActSafeAmount'] + getFormatNumberBy3(actAmt, '.', ',', false, 0, true) + '<br/>' + 
			langData['tInfoBoxInactiveNeedToLimitAmount'] + getFormatNumberBy3(snp_inactive_sum - actAmt, '.', ',', false, 0, true);
		
		divWidth = Math.floor(actAmt / amtPerPixel); 
		actualTd.appendChild( addResourceDiv( divWidth, true, true, 'red', inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount - divWidth, true, false, null, inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount, true, false, null, null ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );		
	}
	else if ( actAmt == snp_inactive_sum ){		
		infoBoxData[getInfoBoxDataKey(inactiveSafeAmountResourceId)] = 
			langData['tInfoBoxInactiveSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveActSafeAmount'] + getFormatNumberBy3(actAmt, '.', ',', false, 0, true) + '<br/>' + 
			langData['tInfoBoxInactiveNeedToLimitAmount'] + '0';
		
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount, true, true, 'red', inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount, true, false, null, null ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );
	}
	else if ( actAmt < snp_active_sum )	{		
		infoBoxData[getInfoBoxDataKey(inactiveSafeAmountResourceId)] = 
			langData['tInfoBoxInactiveSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveActSafeAmount'] + '0';
		
		infoBoxData[getInfoBoxDataKey(activeSafeAmountResourceId)] = 
			langData['tInfoBoxActiveSafeAmount'] + getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveActSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveLootableAmount'] + getFormatNumberBy3(actAmt - snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveNeedToLimitAmount'] + getFormatNumberBy3(snp_active_sum - actAmt, '.', ',', false, 0, true);
		
		divWidth = Math.floor( ( actAmt - snp_inactive_sum ) / amtPerPixel ); 
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount, true, true, 'red', inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( divWidth, true, true, 'yellow', activeSafeAmountResourceId ) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount - divWidth, true, false, null, activeSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );
	}
	else if ( actAmt == snp_active_sum ){
		infoBoxData[getInfoBoxDataKey(inactiveSafeAmountResourceId)] = 
			langData['tInfoBoxInactiveSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveActSafeAmount'] + '0';
		
		infoBoxData[getInfoBoxDataKey(activeSafeAmountResourceId)] = 
			langData['tInfoBoxActiveSafeAmount'] + getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveActSafeAmount'] + getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveLootableAmount'] + getFormatNumberBy3(actAmt - snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveNeedToLimitAmount'] + '0';
		
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount, true, true, 'red', inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount, true, true, 'yellow', activeSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );
	}
	else	{
		infoBoxData[getInfoBoxDataKey(inactiveSafeAmountResourceId)] = 
			langData['tInfoBoxInactiveSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveActSafeAmount'] + '0';
		
		infoBoxData[getInfoBoxDataKey(activeSafeAmountResourceId)] = 
			langData['tInfoBoxActiveSafeAmount'] + getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveActSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveLootableAmount'] + getFormatNumberBy3(actAmt - snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveNeedToLimitAmount'] + '0';
		
		infoBoxData[getInfoBoxDataKey(unSafeAmountResourceId)] = 
			langData['tInfoBoxActiveSafeAmount'] + getFormatNumberBy3(snp_active_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveActSafeAmount'] + getFormatNumberBy3(snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxInactiveLootableAmount'] + getFormatNumberBy3(actAmt - snp_inactive_sum, '.', ',', false, 0, true) + '<br/>' +
			langData['tInfoBoxActiveLootableAmount'] + getFormatNumberBy3(actAmt - snp_active_sum, '.', ',', false, 0, true) + '<br/>';
		
		divWidth = Math.floor( ( actAmt - snp_active_sum ) / amtPerPixel );
		actualTd.appendChild( addResourceDiv( inactiveSafePixelCount, true, true, 'red', inactiveSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( activeSafePixelCount, true, true, 'yellow', activeSafeAmountResourceId ) );
		actualTd.appendChild( addLimiterDiv(true) );
		actualTd.appendChild( addResourceDiv( divWidth, true, true, 'green', unSafeAmountResourceId ) );
		//actualTd.appendChild( addResourceDiv( maxWidthForGraph - divWidth - activeSafePixelCount - inactiveSafePixelCount, true, false, null, unSafeAmountResourceId ) );
		actualTd.appendChild( addResourceDiv( maxWidthForGraph - divWidth - activeSafePixelCount - inactiveSafePixelCount, true, false, null, null ) );		
	}	
	
	actualTd.appendChild( addSliderEndDiv(false) );
	
	actualTr.appendChild( addResourceImageTd(resourceType) );
	actualTr.appendChild( actualTd );
	actualTr.appendChild( addResourceValueTd(actAmt) );
	return actualTr;
}

function fillGraphicalTable(idSuffixStr)	{
	var resourceTableBody = document.getElementById('myGraphicalTableBody'+idSuffixStr);	
	var resourceTableRows = resourceTableBody.getElementsByTagName('tr');
	var i = 0;
	var c = resourceTableRows.length;

	if ( c != 0 )	{
		for ( i = c-1; i != -1; i-- )	{
			resourceTableBody.removeChild( resourceTableRows[i] );
		}
	}
	
	var actualAmounts = amounts[idSuffix];
	
//	logAmounts('fillGraphixTable');
	
	resourceTableBody.appendChild(addResourceTr(NAME_WOOD, actualAmounts[NAME_WOOD]) );
	resourceTableBody.appendChild(addPadderTr());	
	resourceTableBody.appendChild(addResourceTr(NAME_WINE, actualAmounts[NAME_WINE]) );
	resourceTableBody.appendChild(addPadderTr());	
	resourceTableBody.appendChild(addResourceTr(NAME_MARBLE, actualAmounts[NAME_MARBLE]) );
	resourceTableBody.appendChild(addPadderTr());	
	resourceTableBody.appendChild(addResourceTr(NAME_GLASS, actualAmounts[NAME_GLASS]) );
	resourceTableBody.appendChild(addPadderTr());	
	resourceTableBody.appendChild(addResourceTr(NAME_SULFUR, actualAmounts[NAME_SULFUR]) );
}

/*
maxWidthForGraph = 300;
snp_active_sum = 0;	
snp_inactive_sum = 0;

maxAmt : egy maximum mennyiség, amit ki akarunk rajzolni.
maxWidth : a maximális pixel szélessége a mennyiségnek.
actAmt : a mennyiség, amivel most dolgozunk
maxInactiveSafe : a maximum, amit inaktív véd
maxActiveSafe : a maximum, amit aktív véd

amtPerPixel : a mennyiség, amit egy pixelt jelent, értéke: maxAmt / maxWidth 
maxInactiveSafePixel : az inaktív védettségig a sáv szélessége, értéke maxInactiveSafe * maxWidth / maxAmt 
maxActiveSafePixel : az aktív védettségig a sáv szélessége, értéke ( maxActiveSafe * maxWidth / maxAmt ) - maxInactiveSafe 
*/

// Language specific section

function setLangData()	{
	var urlString = self.location.href;	
	var urlPartsByDivChar = urlString.split('\/');
	var urlParts = urlPartsByDivChar[2].split('\.');
	var lang = urlParts[urlParts.length - 1];	
	if (lang == 'com' && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
		lang = urlParts[1];
	}
	if (lang == 'net' && urlParts.length == 3) { //for example: http://s1.ikariam.net/
		lang = 'tr';
	}
	var langVal = langList[lang];
	if ( langVal == 'undefined' )	{
		lang = 'en';
	}
	
	switch (lang) {
	case 'hu' : 
		langData = {tAmount : 'Teljes mennyiség:', whLevel : 'Raktárak szintje:', aPlayer : 'Aktív játékos', iPlayer : 'Inaktív játékos', lAmount : 'Fosztható mennyiség:', sAmount : 'Szükséges hajók:', tEnjoy : 'Élvezd!! :) (Kabji Lambda Ikariam.org)', tImp : 'Kibővítette salomone (Ikariam.hu/delta)', tImp2: 'Fejlesztéssel és ötletekkel hozzájárult El Nino', tBack : ' Vissza ehhez: Rejtekhely', tExt : '', tOnlyNum : 'Kérlek csak számot írj be!', tInterval : 'Kérlek 0-160 közötti számot írj be', tAvailableCargoShips : 'Szabad kereskedőhajók:', tSafeAmountForActive : 'Védett (aktív)', tSafeAmountForInactive : 'Védett (inaktív)', tInfoBoxInactiveSafeAmount : 'Védett (inaktív): ', tInfoBoxActiveSafeAmount : 'Védett (aktív): ', tInfoBoxInactiveActSafeAmount : 'Jelenleg védett (inaktív): ', tInfoBoxActiveActSafeAmount : 'Jelenleg védett (aktív): ', tInfoBoxInactiveNeedToLimitAmount : 'Szükséges hogy fosztható legyen (inaktív): ', tInfoBoxActiveNeedToLimitAmount : 'Szükséges hogy fosztható legyen (aktív): ', tInfoBoxInactiveLootableAmount : 'Szabadon fosztható (inaktív): ', tInfoBoxActiveLootableAmount : 'Szabadon fosztható (aktív): ', tActions : 'Műveletek', tCredits : 'Szerzők', tHomePage : 'Weboldal' };  
		break;
		//Ukrainian translate by feelimon
	case 'ua' :
		langData = {tAmount : 'Загальна сума:', whLevel : 'Рівень складу:', aPlayer : 'Активний гравець', iPlayer : 'Неактивний гравець', lAmount : 'Всього доступно:', sAmount : 'Всього кораблів:', tEnjoy : '(Kabji Lambda Ikariam.org)', tImp : 'salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : 'Назад у Схованку ', tExt : 'Напр.: 3 або 1,2,3 для кількох складів', tOnlyNum : 'Тільки цифри', tInterval : 'Тільки цифри (0-160)', tAvailableCargoShips : 'Доступно вантажних кораблів:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
		//Russian translate by feelimon
	case 'ru' :
		langData = {tAmount : 'Общая сумма:', whLevel : 'Уровень склада:', aPlayer : 'Активный игрок', iPlayer : 'Неактивный игрок', lAmount : 'Всего доступно:', sAmount : 'Всего сухогрузов:', tEnjoy : '(Kabji Lambda Ikariam.org)', tImp : 'salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : 'Назад в Укрытие ', tExt : 'Напр.: 3 или 1,2,3 для нескольких складов', tOnlyNum : 'Только цифры', tInterval : 'Только цифры (0-160)', tAvailableCargoShips : 'Доступно сухогрузов:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
		//Serbian translate by Broj Jedan, posted by Miloš Grujić
	case 'rs' :
		langData = {tAmount : 'Ukupno:', whLevel : 'Veličina skladišta:', aPlayer : 'Aktivan Igrač', iPlayer : 'Neaktivan igrač', lAmount : 'Dostupna količina:', sAmount : 'Potrebno Brodova:', tEnjoy : 'Uživajte!! :) (Kabji Lambda Ikariam.org)', tImp : 'salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' Povratak u skrovište', tExt : 'Prim. 3 ili 1,2,3 za više skladišta.', tOnlyNum : 'unesi samo cifru !', tInterval : 'Unesi samo cifru izmedju (0-160)', tAvailableCargoShips : 'Dostupan broj brodova:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
		//Dannish translate by Kilden af Liv
	case 'dk' :
		langData = {tAmount : 'Total Mængde:', whLevel : 'Lager Level:', aPlayer : 'Aktiv spiller', iPlayer : 'Inaktiv spiller', lAmount : 'Muligt at plyndre:', sAmount : 'Antal Skibe:', tEnjoy : 'Nyd!! (Kabji Lambda Ikariam.org)', tImp : 'Forbedringer af salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' Tilbage til Skjulestedet(Skjulested Fanen)', tExt : 'F.eks. 3 eller 1,2,3 for flere lagre.', tOnlyNum : 'Intast kun nummer, tak.', tInterval : 'Indtast kun nummer(0-160), tak.', tAvailableCargoShips : 'Tilgængelige fragt skibe:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
		//German translate by El Nino
	case 'de' :
		langData = {tAmount : 'Gesamtmenge:', whLevel : 'Lagerhaus Stufe:', aPlayer : 'Aktiver Spieler', iPlayer : 'Inaktiver Spieler', lAmount : 'plünderbare Menge:', sAmount : 'benötigte Schiffe:', tEnjoy : 'Viel Spass!! (Kabji Lambda Ikariam.org)', tImp : 'Verbesserungen von salomone (Ikariam.hu)', tImp2: 'El Nino helped with coding and ideas', tBack : ' Zurück zum Versteck (Versteck Tab)', tExt : 'z.B. 3 oder 1,2,3 für mehrere Lagerhäuser.', tOnlyNum : 'Bitte nur Ziffern eingeben', tInterval : 'Bitte nur Zahlen zwischen 0 bis 160 eingeben',tAvailableCargoShips : 'verfügbare Handelsschiffe:', tSafeAmountForActive : 'Geschützt (Aktiv)', tSafeAmountForInactive : 'Geschützt (Inaktiv)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
		//French translate by Ewoline
	case 'fr'	:
		langData = {tAmount : 'Quantité Totale:', whLevel : 'Level Entrepôt:', aPlayer : 'Joueur Actif', iPlayer : 'Joueur Inactif', lAmount : 'Quantité Pillable:', sAmount : 'Nombre Bateaux:', tEnjoy : 'Enjoy!! (Kabji Lambda Ikariam.org)', tImp : 'Improvements by salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' retour à la cachette', tExt : 'Ex. 3 ou 1,2,3 pour plusieurs entrepôts.', tOnlyNum : 'Merci de n\'entrer que des chiffres', tInterval : 'Merci de n\'entrer que des chiffres(0-160)', tAvailableCargoShips : 'Bateaux disponibles :', tSafeAmountForActive : 'Sécurisé (Actif)', tSafeAmountForInactive : 'Sécurisé (Inactif)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break;
	case 'br' :
		langData = {tAmount : 'Quantidade Total:', whLevel : 'Nível do Armazém:', aPlayer : 'Jogador Ativo', iPlayer : 'Jogador Inativo', lAmount : 'Quantidade passível de Roubo:', sAmount : 'Quantidade de Bargos de Carga:', tEnjoy : 'Divirtam-se!! (Kabji Lambda Ikariam.org)', tImp : 'Melhorias por salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas',  tBack : 'Voltar à Espionagem (Guia da Espionagem)', tExt : 'Ex. 3 ou 1,2,3 para múltiplos armazéns.', tOnlyNum : 'Favor colocar somente números', tInterval : 'Favor colocar somente números entre (0-160)', tAvailableCargoShips : 'Barcos de Carga disponíveis:', tSafeAmountForActive : 'Seguro (Ativo)', tSafeAmountForInactive : 'Seguro (Inativo)', tInfoBoxInactiveSafeAmount : 'Quantidade Segura de Inativo: ', tInfoBoxActiveSafeAmount : 'Quantidade Segura de Ativo: ', tInfoBoxInactiveActSafeAmount : 'Real Quantidade Segura (Inativo): ', tInfoBoxActiveActSafeAmount : 'Real Quantidade Segura (Ativo): ', tInfoBoxInactiveNeedToLimitAmount : 'Quantidade para o Limite (Inativo): ', tInfoBoxActiveNeedToLimitAmount : 'Quantidade para o Limite (Ativo): ', tInfoBoxInactiveLootableAmount : 'Quantidade Passível de Roubo (Inativo): ', tInfoBoxActiveLootableAmount : 'Quantidade Passível de Roubo (Ativo): ', tActions : 'Ações', tCredits : 'Créditos', tHomePage : 'Homepage' }; 
		break;
	case 'pl' :
		langData = {tAmount : 'Razem surowców:', whLevel : 'Poziom magazynów:', aPlayer : 'Gracz aktywny', iPlayer : 'Gracz nieaktywny', lAmount : 'Do zrabowania:', sAmount : 'Liczba statków:', tEnjoy : 'Enjoy!! (Kabji Lambda Ikariam.org)', tImp : 'Improvements by salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' Powrót do kryjówki(Zakładka kryjówka)', tExt : 'Np. 3 albo 1,2,3 dla kilku magazynów.', tOnlyNum : 'Proszę wprowadzić tylko liczby', tInterval : 'Proszę wprowadzić liczby z przedziału (0-160)', tAvailableCargoShips : 'Dostępne statki:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
		break; 
	/*
	case 'xx' :
		langData = {tAmount : ':', whLevel : ':', aPlayer : '', iPlayer : '', lAmount : ':', sAmount : ':', tEnjoy : 'Enjoy!! (Kabji Lambda Ikariam.org)', tImp : 'Improvements by salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' ', tExt : '', tOnlyNum : '', tInterval : '', tAvailableCargoShips : ':', tSafeAmountForActive : '', tSafeAmountForInactive : '', tInfoBoxInactiveSafeAmount : '', tInfoBoxActiveSafeAmount : '', tInfoBoxInactiveActSafeAmount : '', tInfoBoxActiveActSafeAmount : '', tInfoBoxInactiveNeedToLimitAmount : '', tInfoBoxActiveNeedToLimitAmount : '', tInfoBoxInactiveLootableAmount : '', tInfoBoxActiveLootableAmount : '', tActions : '', tCredits : '', tHomePage : '' }; 
		break;
	*/
	default :
		langData = {tAmount : 'Total Amount:', whLevel : 'Warehouse Level:', aPlayer : 'Active player', iPlayer : 'Inactive player', lAmount : 'Lootable Amount:', sAmount : 'Ship Amount:', tEnjoy : 'Enjoy!! (Kabji Lambda Ikariam.org)', tImp : 'Improvements by salomone (Ikariam.hu/delta)', tImp2: 'El Nino helped with coding and ideas', tBack : ' Back to the Hideout (Hideout Tab)', tExt : 'Ex. 3 or 1,2,3 for multi warehouse.', tOnlyNum : 'Please input only number', tInterval : 'Please input only number(0-160)', tAvailableCargoShips : 'Available cargo ships:', tSafeAmountForActive : 'Safe (Active)', tSafeAmountForInactive : 'Safe (Inactive)', tInfoBoxInactiveSafeAmount : 'Inactive safe amount: ', tInfoBoxActiveSafeAmount : 'Active safe amount: ', tInfoBoxInactiveActSafeAmount : 'Actually safe amount (inactive): ', tInfoBoxActiveActSafeAmount : 'Actually safe amount (active): ', tInfoBoxInactiveNeedToLimitAmount : 'Amount to limit (inactive): ', tInfoBoxActiveNeedToLimitAmount : 'Amount to limit (active): ', tInfoBoxInactiveLootableAmount : 'Lootable amount (inactive): ', tInfoBoxActiveLootableAmount : 'Lootable amount (active): ', tActions : 'Actions', tCredits : 'Credits', tHomePage : 'Homepage' }; 
	}	
	return;
}

snpInit();
needToSetCheckInterval();
ScriptUpdater.check(scriptId, currentVersion);