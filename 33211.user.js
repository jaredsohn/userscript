// ==UserScript==
// @name           Ikariam - Palace Summary
// @namespace      ej.t35.com
// @autor          EJ
// @description    This script adds a resource summary to the palace view. V2.9
// @include        http://*ikariam.*/index.php*
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

For a copy of the Licence:
http://www.gnu.org/licenses/gpl.txt
*/

// 16/05/2008 ( EJ )
// Combined Bits from various places
// Started with script:
// RecourcesShortcuts
// [namespace = Yramesora]
// Author A.Rosemary
// released under GPL

// Used function makePanelInfo() from script:
// Ikairam - Utilitaires
// [namespace = Neuromancien]
// 'http://userscripts.org/scripts/show/23778';

// Most of the above scripts have been completely changed with only a few bit similar
// but were v usedful for getting started & development

// ####################################################################################################################
//	INIT		INIT		INIT		INIT		INIT		INIT		INIT
// ####################################################################################################################

// CONSTANTS

var DEBUG = 0;
var TRADEDATA = 1;
var PALACEVIEW = 1;
var WEBSAFEWARNINGS = 0;
var GameServer = top.location.host;

var _imggold 		= '<img src="skin/resources/icon_gold.gif" alt="gold" />';
var _imgwood 		= '<img src="skin/resources/icon_wood.gif" alt="wood" />';
var _imgwine 		= '<img src="skin/resources/icon_wine.gif" alt="wine" />';
var _imgmarble 		= '<img src="skin/resources/icon_marble.gif" alt="marble" />';
var _imgcrystal 	= '<img src="skin/resources/icon_glass.gif" alt="crystal" />';
var _imgsulphur 	= '<img src="skin/resources/icon_sulfur.gif" alt="sulphur" />';
var _imgresearch 	= '<img src="skin/resources/icon_research.gif" alt="research" />'
var _imggrowth 		= '<img src="skin/icons/growth_positive.gif" alt="growth" />'
var _imgactionpoints 	= '<img src="skin/resources/icon_actionpoints.gif" alt="actionpoints" />'
var _imgcorruption	= '<img src="skin/icons/corruption_24x24.gif" alt="corruption" />';
var _imgmuseum 		= '<img src="skin/buildings/museum_30x30.gif" alt="museum" />';
var _imgcapital		= '<img src="skin/layout/crown.gif" alt="capital" />';
var _imglivingspace	= '<img src="skin/icons/livingspace_24x24.gif" alt="livingspace" />';
var _imgcitizen 	= '<img src="skin/resources/icon_citizen.gif" alt="citizen" />';
var _imgtown		= '<img src="skin/layout/icon-city2.gif" alt="town" />';
var _imgisland		= '<img src="skin/layout/icon-island.gif" alt="island" />';
var _imgislandsmall	= '<img src="' +
				"data:image/gif,GIF89a%16%00%0B%00%A5%20%00%2C6'7PYER%2F%14e%984%5EpUX%3AdSD%24h%8C%00s%B6%1Ds%A"+
				"3Tl75t%94hiD%22%7D%AF%1D%80%B9%14%86%C4_rqLy%8B%7BsT%A5vF%99%82d%8A%8D%7F%7B%94%95%AC%87b%A8%8F"+
				"o%A0%9A%8A%C7%93%5C%B4%9B%7D%B8%9Bt%C9%AA%80%DB%ADx%E6%C0%8E%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%F"+
				"F%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%"+
				"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF"+
				"%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%20%00%2C%00%00%"+
				"00%00%16%00%0B%00%00%06%9B%40%90pH%A4t0%C4%A4R%18%C0t8%1E%C9R%19%80D8%9D%CD%E6%23!%1C%A6%A0%03%"+
				"A2%E2%E9d1%9C%0DC%E1%40%7C%89%87%86%23%80%E5%60%D0%0AEAP%A8%2C%16%09%01%20m%10%1A%1A%1E%1F%14%0"+
				"2z%02%8D%02%12%17%17%13%15%03%07%09%07%12%19%19h%06%00%05%0C%14%14%12%14%91%1F%1B%14%01%07%0F%0"+
				"E%09%03%AE%06f%7B%02%0C%17%18%15%16%11%07%03%09s%BC%AB%09%0B%16%19%15X%1F%1C%04%AE%08%0E%0D%04D"+
				"%04%0D%0F%0F%08%08%09%97%96%0E%D8oS%07%0E%AB%D8%D1%09KA%00%3B"+
				'" alt="island" />';

function city()		// city constructor
{
	this.id = 0;
	this.islandid = 0;
	this.name = "name";
	this.palace = 0;

	this.maxwood = 0;
	this.maxluxury = 0;

	this.wood = 0;
	this.wine = 0;
	this.marble = 0;
	this.crystal = 0;
	this.sulphur = 0;

	this.dwood = 0;
	this.dwine = 0;
	this.dmarble = 0;
	this.dcrystal = 0;
	this.dsulphur = 0;

	this.iwood = 0;
	this.iwine = 0;
	this.imarble = 0;
	this.icrystal = 0;
	this.isulphur = 0;

	this.dresearch = 0;

	this.townlevel = 0;

	this.citizens = 0;
	this.citizenmax = 0;
	this.actionpoints = "0";
	this.growth = 0;
	this.netgold = 0;
	this.corruption = 0;

	this.iscapital = 0;
	this.culturalhappiness = 0;
	this.culturalgoods = 0;
	this.winehappiness = 0;
	this.wineserving = 0;
}

function trade()		// tradedata constructor
{
	this.start = 0;
	this.target = 0;
	this.wood = 0;
	this.wine = 0;
	this.marble = 0;
	this.crystal = 0;
	this.sulphur = 0;
	this.Mission = 0;
	this.MissionID = 0;
	this.ETA = 0;
	this.MissionEnd = 0;
}

var _city = new Array();	// uses 'struct' above & stores all cityinfo, including id, name, resources etc.
var _trade = new Array();	// array of 'struct's for tradedata

// ####################################################################################################################
//	START		START		START		START		START		START		START
// ####################################################################################################################

main();

// FIRST & ONLY METHOD TO BE CALLED
function main()
{
	switch ( findValue("view") )
	{
		case "palaceColony":
		case "palace":
				PalaceView();
				break;

		default:	break;
	}
}

function PalaceView()
{
	getCities();
	makeTableHeader();

	if( TRADEDATA )	{ getTradeData(); }
	else		{ getData(0);     }
}

// ####################################################################################################################
//	GET DATA	GET DATA	GET DATA	GET DATA	GET DATA	GET DATA	GET DATA
// ####################################################################################################################

function xpath( query ){ return( document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) ); }

// extract value from current URL
function findValue( value )
{
	var szURL = window.location.href;
	if( szURL.indexOf(value) == -1 ) return("NULL");

	var szTemp = szURL.substring( szURL.indexOf(value)+1 );

	if( szTemp.indexOf('&') == -1 )		// incase view is at the end of the URL
		var value = szTemp.substring( szTemp.indexOf('=')+1 );
	else	var value = szTemp.substring( szTemp.indexOf('=')+1 , szTemp.indexOf('&') );

	return( value );
}

function getCities()
{
	var avatarCities = xpath("//option[@class='avatarCities coords']");

	for (var i = 0; i < avatarCities.snapshotLength; i++)
	{
		thisCity = avatarCities.snapshotItem(i);
		_city[i] = new city();		// invokes constructor to create & initialise all properties
		_city[i].id = thisCity.value;
		_city[i].name = thisCity.text.substring( thisCity.text.indexOf(']')+2 );
	}

// Get Palace Level from current page
	if( PALACEVIEW )
	{
		var palacelevels = xpath( "//table[@class='table01']/tbody/tr/td[4]" );
		for (var i = 0; i < avatarCities.snapshotLength; i++ )
		{	_city[i].palace = trim( (palacelevels.snapshotItem(i).firstChild).nodeValue );	}
	}
}

function getData( i )
{
	if( i > _city.length-1 )
	{
		addBottomRows();
		return;
	}

	getCityData( _city[i], i );
}

function getCityData( city, i )
{
	GM_xmlhttpRequest
	({
		method:"GET",
		url:"http://" + GameServer + "/index.php?view=townHall&id=" + city.id + "&position=0",
		headers: { 'Cookie': document.cookie },
		onload:function(responseDetails)
		{
			ParseTownHallData( responseDetails.responseText, city );
			getWarehouseData( city , i );
		}
	})
}

function getWarehouseData( city, i )
{
	GM_xmlhttpRequest
	({
		method:"GET",
		url:"http://" + GameServer + "/index.php?view=warehouse&id=" + city.id,
		headers: { 'Cookie': document.cookie },
		onload:function(responseDetails)
		{
			ParseWarehouseData( responseDetails.responseText, city );
			makeTableRow( i );
			getData( i+1 );
		}
	})
}

function getTradeData()
{
	GM_xmlhttpRequest
	({
		method:"GET",
		url:"http://" + GameServer + "/index.php?view=merchantNavy",
		headers: { 'Cookie': document.cookie },
		onload:function(responseDetails)
		{
			ParseTradeData( responseDetails.responseText );
			getData(0);
		}
	})
}

function ParseTownHallData( FT, city )
{
// ## Town Related Stuff
	city.islandid	= extractstring2( FT, 'view=island', '&', 1, '=', '"' );
	city.townlevel	= extractstring2( FT, '<div class="buildingLevel"', '</span', 1, '>', '<' );			

// ## stats

	city.citizens	= extractvalue( FT, "value occupied" );
	city.citizenmax	= extractvalue( FT, "value total" );
	city.actionpoints=extractstring2( FT, '<li class="actions">', '</span', 1, '>', '<' );
	city.growth 	= extractstring2( FT, '<li class="growth', 'value', 1, '>', '<' );
	city.netgold 	= extractstring2( FT, '<li class="incomegold', 'value', 1, '>', '<' );
	city.corruption	= extractvalue( FT, "Current corruption" );

// ## PopulationGraph
// RESOURCE PRODUCTION
	// Isolate the production bar to cut out happiness wine icon
	var production = FT.substring(FT.indexOf('<span class="production"')+1, FT.indexOf('SatisfactionOverview') );

	if( production.indexOf( 'skin/resources/icon_wood.gif' ) != -1 )
		city.dwood	= extractdelta( FT, 'skin/resources/icon_wood.gif' );

	if( production.indexOf( 'skin/resources/icon_wine.gif' ) != -1 )	
		city.dwine	= extractdelta( FT, 'skin/resources/icon_wine.gif' );

	if( production.indexOf( 'skin/resources/icon_marble.gif' ) != -1 )
		city.dmarble	= extractdelta( FT, 'skin/resources/icon_marble.gif' );

	if( production.indexOf( 'skin/resources/icon_glass.gif' ) != -1 )
		city.dcrystal	= extractdelta( FT, 'skin/resources/icon_glass.gif' );

	city.dresearch	= extractdelta( FT, 'skin/resources/icon_research.gif' );

// UNCHECKED AS NO SULPHUR ISLAND YET!
	if( production.indexOf( 'skin/resources/icon_sulfur.gif' ) != -1 )
		city.dsulphur	= extractdelta( FT, 'skin/resources/icon_sulfur.gif' );

// ## SatisfactionOverview
// WINE SERVING
	city.winehappiness = extractstring2( FT, 'class="serving"', 'value', 1, '+', '<' );
	city.wineserving = winehappinesstoserving( city.winehappiness );
	city.dwine = parseInt(city.dwine) - city.wineserving;

	city.culturalhappiness = extractstring2( FT, '<div class="treaties"', 'value', 1, '+', '<' );
	city.culturalgoods = culturalhappinesstogoods( city.culturalhappiness );

	if( FT.indexOf( 'skin/layout/crown.gif' ) != -1 ) city.iscapital = 1;
}

function ParseWarehouseData( FT, city )
{
	var szTemp = FT.substring( FT.indexOf('gesamt')+1 );
	var szRT = szTemp.substring( 0, szTemp.indexOf('</tbody>') );
	var szCT = szRT.substring( szRT.indexOf('capacity') );

// ## cityResources
// RESOURCE QUANTITIES
	city.wood 	= extractresource( szRT, 'skin/resources/icon_wood.gif' );
	city.wine 	= extractresource( szRT, 'skin/resources/icon_wine.gif' );
	city.marble 	= extractresource( szRT, 'skin/resources/icon_marble.gif' );
	city.crystal 	= extractresource( szRT, 'skin/resources/icon_glass.gif' );
	city.sulphur 	= extractresource( szRT, 'skin/resources/icon_sulfur.gif' );

	city.maxwood 	= extractresource( szCT, 'skin/resources/icon_wood.gif' );
	city.maxluxury 	= extractresource( szCT, 'skin/resources/icon_wine.gif' );
}

function ParseTradeData( FT )
{
var szTD = FT.substring( FT.indexOf( 'class="actions">Actions</th>' ), FT.indexOf( 'div id="cityNav"' ) );
var szEntry = szTD.split('<td class="transports">');

var szE;
var source;
var target;
var mission;
var cstype;
var csval;

    for( var i = 1; i < szEntry.length; i++ )
    {	szE = szEntry[i];

	var qwood = 0;
	var qwine = 0;
	var qmarble = 0;
	var qcrystal = 0;
	var qsulphur = 0;

	source = extractstring2( szE, '"source"', '&cityId', 1, '=', '"' );
	target = extractstring2( szE, '"target"', '&cityId', 1, '=', '"' );
	mission = extractvalue( szE, '<td class="mission' );

	szCargo = szE.substring( szE.indexOf('Cargo:</span>'), szE.indexOf('<div class="space">') );
	szCargoS = szCargo.split( "skin/resources/icon_" );

	for( var ci = 1; ci < szCargoS.length; ci++ )
	{	szCS = szCargoS[ci];
		cstype = szCS.substring( 0, szCS.indexOf('.') );
		csval = extractstring1( szCS, 'tit', 1, '"', ' ' );

		switch( cstype )
		{
			case "wood":	qwood    = csval;	break;
			case "wine":	qwine    = csval;	break;
			case "marble":	qmarble  = csval;	break;
			case "glass":	qcrystal = csval;	break;
			case "sulfur":	qsuplhur = csval;	break;
			default:				break;
		}
	}

//	GM_log( "Source/Dest "+ source +" "+ target +"  Cargo "+ qwood +" "+ qwine +" "+ qmarble +" "+ qcrystal +" "+ qsulphur );

	if( mission != "Trade(Sell)" )
	{
	    var found = 0;
		for( var c = 0; c < _city.length; c++ )
		{
			if( target == _city[c].id )
			{
				_city[c].iwood = qwood;
				_city[c].iwine = qwine;
				_city[c].imarble = qmarble;
				_city[c].icrystal = qcrystal;
				_city[c].isulphur = qsulphur;
				found = 1;
			}
		}
	
	    if( found == 0 )
	    {
		for( var c = 0; c < _city.length; c++ )
		{
			if( source == _city[c].id )
			{
				_city[c].iwood = qwood;
				_city[c].iwine = qwine;
				_city[c].imarble = qmarble;
				_city[c].icrystal = qcrystal;
				_city[c].isulphur = qsulphur;
				found = 1;
			}
		}
	    }
	}
    }
}

// STRING EXTRACTION FUNCTIONS
function extractvalue( FT, string ){ return( extractstring1( FT, string, 1, '>', '<' ) ); }
function extractdelta( FT, string ){ return( extractstring1( FT, string, 1, '+', '<' ) ); }
function extractstring2( FT, s1, s2, na, pc, ac ){ return( extractstring1( FT.substring(FT.indexOf(s1)+1), s2, na, pc, ac ) ); }
function extractstring1( FT, string, numberafter, prevchar, afterchar )
{	var szTemp = FT.substring( FT.indexOf(string)+1 , FT.indexOf(string)+500 );
	var szWantedPlus = szTemp.substring( szTemp.indexOf(prevchar)+numberafter );
	var szWanted = szWantedPlus.substring( 0, szWantedPlus.indexOf(afterchar) );
	return( szWanted );
}
function extractresource( FT, string )
{
	var szTemp = FT.substring( FT.indexOf(string) );
	return( extractvalue( szTemp, '<td>' ) );
}

function ltrim(str) { 
	for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
	return str.substring(k, str.length);
}
function rtrim(str) {
	for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
	return str.substring(0,j+1);
}
function trim(str) {
	return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}

// REVERSE HAPPINESS CONVERSION
function culturalhappinesstogoods( happiness )
{	return(parseInt(happiness)/50);		}

function winehappinesstoserving( happiness )
{
	switch( parseInt(happiness) )
	{
	case 80:	return(3);
	case 160:	return(5);
	case 240:	return(8);
	case 320:	return(11);
	case 400:	return(14);
	case 480:	return(17);
	case 560:	return(21);
	case 640:	return(25);
	case 720:	return(29);
	case 800:	return(33);
	case 880:	return(38);
	case 960:	return(42);
	case 1040:	return(47);
	case 1120:	return(52);
	case 1200:	return(57);
	case 1280:	return(63);
	case 1360:	return(68);
	case 1440:	return(73);
	case 1520:	return(79);
	case 1600:	return(85);
	case 1680:	return(91);
	case 1760:	return(97);
	case 1840:	return(103);
	case 1920:	return(109);
	default:	return(0);
	}
}

function makeTotals()
{
	_cityTotals = new city();

	_cityTotals.name = "Totals";
	_cityTotals.corruption = " ";
	_cityTotals.actionpoints = 0;

	for (var i = 0; i < _city.length; i++)
	{
	_cityTotals.wood 	+= parseFloatComma(_city[i].wood);
	_cityTotals.wine 	+= parseFloatComma(_city[i].wine);
	_cityTotals.marble 	+= parseFloatComma(_city[i].marble);
	_cityTotals.crystal 	+= parseFloatComma(_city[i].crystal);
	_cityTotals.sulphur 	+= parseFloatComma(_city[i].sulphur);
	_cityTotals.dwood 	+= parseFloatComma(_city[i].dwood);
	_cityTotals.dwine 	+= parseFloatComma(_city[i].dwine);
	_cityTotals.dmarble 	+= parseFloatComma(_city[i].dmarble);
	_cityTotals.dcrystal 	+= parseFloatComma(_city[i].dcrystal);
	_cityTotals.dsulphur 	+= parseFloatComma(_city[i].dsulphur);
	_cityTotals.dresearch 	+= parseFloatComma(_city[i].dresearch);
	_cityTotals.iwood 	+= parseFloatComma(_city[i].iwood);
	_cityTotals.iwine 	+= parseFloatComma(_city[i].iwine);
	_cityTotals.imarble 	+= parseFloatComma(_city[i].imarble);
	_cityTotals.icrystal 	+= parseFloatComma(_city[i].icrystal);
	_cityTotals.isulphur 	+= parseFloatComma(_city[i].isulphur);
	_cityTotals.maxwood 	+= parseFloatComma(_city[i].maxwood);
	_cityTotals.maxluxury 	+= parseFloatComma(_city[i].maxluxury);

	_cityTotals.townlevel 	+= parseInt(_city[i].townlevel);
	_cityTotals.palace 	+= parseInt(_city[i].palace);

	_cityTotals.citizens 	+= parseFloatComma(_city[i].citizens);
	_cityTotals.citizenmax 	 += parseFloatComma(_city[i].citizenmax);
	_cityTotals.actionpoints += parseFloatComma(_city[i].actionpoints);
	_cityTotals.growth 	 += parseFloatComma(_city[i].growth);
	_cityTotals.netgold 	+= parseFloatComma(_city[i].netgold);

	_cityTotals.culturalgoods += parseFloat(_city[i].culturalgoods);
	_cityTotals.wineserving   += parseFloat(_city[i].wineserving);
	}

// put back any required commas

	_cityTotals.wood 	= CommaFormatted(_cityTotals.wood);
	_cityTotals.wine 	= CommaFormatted(_cityTotals.wine);
	_cityTotals.marble 	= CommaFormatted(_cityTotals.marble);
	_cityTotals.crystal 	= CommaFormatted(_cityTotals.crystal);
	_cityTotals.sulphur 	= CommaFormatted(_cityTotals.sulphur);
	_cityTotals.dwood 	= CommaFormatted(_cityTotals.dwood);
	_cityTotals.dwine 	= CommaFormatted(_cityTotals.dwine);
	_cityTotals.dmarble 	= CommaFormatted(_cityTotals.dmarble);
	_cityTotals.dcrystal 	= CommaFormatted(_cityTotals.dcrystal);
	_cityTotals.dsulphur 	= CommaFormatted(_cityTotals.dsulphur);
	_cityTotals.dresearch 	= CommaFormatted(_cityTotals.dresearch);
	_cityTotals.iwood 	= CommaFormatted(_cityTotals.iwood);
	_cityTotals.iwine 	= CommaFormatted(_cityTotals.iwine);
	_cityTotals.imarble 	= CommaFormatted(_cityTotals.imarble);
	_cityTotals.icrystal 	= CommaFormatted(_cityTotals.icrystal);
	_cityTotals.isulphur 	= CommaFormatted(_cityTotals.isulphur);
	_cityTotals.maxwood 	= CommaFormatted(_cityTotals.maxwood);
	_cityTotals.maxluxury 	= CommaFormatted(_cityTotals.maxluxury);
	_cityTotals.citizens 	= CommaFormatted(_cityTotals.citizens);
	_cityTotals.citizenmax 	= CommaFormatted(_cityTotals.citizenmax);
	_cityTotals.netgold 	= CommaFormatted(_cityTotals.netgold);
	_cityTotals.growth 	= CommaFormatted(_cityTotals.growth);

	return( _cityTotals );
}

function makeTotalsRow( _cityTotals )	// simply adds incoming (trade) resources to resources
{
	_cityTotalsRow = new city();
	_cityTotalsRow = _cityTotals;

	_cityTotalsRow.name = "Totals";

	_cityTotalsRow.wood 	= parseFloatComma(_cityTotals.wood)	+ parseFloatComma(_cityTotals.iwood);
	_cityTotalsRow.wine 	= parseFloatComma(_cityTotals.wine)	+ parseFloatComma(_cityTotals.iwine);
	_cityTotalsRow.marble 	= parseFloatComma(_cityTotals.marble)	+ parseFloatComma(_cityTotals.imarble);
	_cityTotalsRow.crystal 	= parseFloatComma(_cityTotals.crystal)	+ parseFloatComma(_cityTotals.icrystal);
	_cityTotalsRow.sulphur 	= parseFloatComma(_cityTotals.sulphur)	+ parseFloatComma(_cityTotals.isulphur);

// put back any required commas

	_cityTotalsRow.wood 	= CommaFormatted(_cityTotals.wood);
	_cityTotalsRow.wine 	= CommaFormatted(_cityTotals.wine);
	_cityTotalsRow.marble 	= CommaFormatted(_cityTotals.marble);
	_cityTotalsRow.crystal 	= CommaFormatted(_cityTotals.crystal);
	_cityTotalsRow.sulphur 	= CommaFormatted(_cityTotals.sulphur);
	return( _cityTotalsRow );
}

// ####################################################################################################################
//	OUTPUT		OUTPUT		OUTPUT		OUTPUT		OUTPUT		OUTPUT		OUTPUT
// ####################################################################################################################

function makeTableHeader()
{
	var table = document.createElement("TABLE");
	table.setAttribute("style", "width:100% !important; margin: 0px ! important;");
	table.setAttribute("class", "table01");

// TABLE HEADER

    var thead = document.createElement("THEAD");
	var htr = makeElem("tr",0,0);

			var htd1 = document.createElement("TH");
			htd1.setAttribute("style", "width:120px ;");
			htd1.innerHTML = _imgtown;
		htr.appendChild(htd1);
		htr.appendChild( makeElem( "th",0,_imgwood ) );
		htr.appendChild( makeElem( "th",0,_imgwine ) );
		htr.appendChild( makeElem( "th",0,_imgmarble ) );
		htr.appendChild( makeElem( "th",0,_imgcrystal ) );
		htr.appendChild( makeElem( "th",0,_imgsulphur ) );
		htr.appendChild( makeElem( "th",0,_imggold + "<br/>" + _imgcorruption ) );
		htr.appendChild( makeElem( "th",0,_imgcitizen + "<br/>" + _imggrowth ) );
		htr.appendChild( makeElem( "th",0,_imgresearch + "<br/>" + _imgmuseum ) );
	thead.appendChild(htr);
	table.appendChild(thead);


// TABLE BODY
    var tbody = document.createElement("TBODY");
	tbody.setAttribute("class", "tableh01");
	table.appendChild(tbody);

// REPLACE OLD TABLE WITH NEW TABLE
	var oldtable = xpath("//table[@class='table01']").snapshotItem(0);	// find old table
	oldtable.parentNode.replaceChild( table , oldtable );			// & replace

// OTHER TWEAKS TO MOVE TABLE UP - CHANGE TOP DIV CLASS TO REMOVE PLACE PIC
// ALSO REMOVE DESCRIPTION

	var oldtopdiv = xpath("//div[@class='buildingDescription']").snapshotItem(0);	// find old top div
	var oldtoptxt = xpath("//div[@class='buildingDescription']/p").snapshotItem(0);	// find old top div text
	oldtopdiv.removeChild(oldtoptxt);
	oldtopdiv.className = oldtopdiv.className + "old";
}

function makeTableRow( c )
{

// FIRST ROW
	var tr1 = makeElem("tr","top",0);

// TD1	Town 'Header' Cell
		var td1 = makeElem("td","tb",0);
		td1.setAttribute("align", "left");
		td1.setAttribute("ROWSPAN", 2);
			var aIsland = makeElem("a","newwindow", _imgislandsmall );
			aIsland.setAttribute("href", "http://" + GameServer + "/index.php?view=island&id=" + _city[c].islandid );
		td1.appendChild(aIsland);

			var aCity =  makeElem("a",0,0);
				var szfnPostChange =	"var s=document.getElementById('citySelect');" +
							"s.value=" + _city[c].id + ";" +
							"var f=document.getElementById('changeCityForm');" +
							"f.setAttribute('target','_blank');" +
							"s.form.submit();" +
							"f.setAttribute('target','');";
			aCity.setAttribute("href", "javascript:{" + szfnPostChange + "}" );
				var name = document.createElement("span");
				name.innerHTML = _city[c].name;	 // add .substr(0,4) on end to append name
				if( _city[c].iscapital ) name.setAttribute("style","color:#850CFD;");
				else			 name.setAttribute("style","color:#612D04;");
			aCity.appendChild(name);
		td1.appendChild(aCity);

		td1.innerHTML += "<br/>" + _city[c].actionpoints + "  Level " + _city[c].townlevel;
		if( PALACEVIEW ) td1.innerHTML += " P" + _city[c].palace;

		tr1.appendChild(td1);
		makeFirstRow(tr1,_city[c],0);

	var tr2 = makeElem("tr","bottom",0);
	makeSecondRow(tr2,_city[c],0);


// ADD NEW ROWS TO TABLE AS CHILDREN
	var tbody = xpath("//tbody[@class='tableh01']").snapshotItem(0);	// find table
	tbody.appendChild( tr1 );			// & addChild
	tbody.appendChild( tr2 );			// & addChild
}


function addBottomRows()
{
// CALC TOTALS & GET TRADEDATA

	var _cityTotals = makeTotals();
	var _cityTotalsRow = makeTotalsRow( _cityTotals );

	if( TRADEDATA ) addTradeRow();
	addTotalsRow();
}

function addTradeRow()
{
	var tr1 = makeElem("tr","top",0);

// TD1	'Header' Cell
		td1 = makeElem("td","tb",0);
		td1.setAttribute("align", "left");

		tr1.setAttribute("style", "border:solid 3px #E4B873 ! important; border-style:solid none none none ! important;");
		td1.innerHTML = "Trade Incoming";
		tr1.appendChild(td1);

// Value Cells:
	tr1.appendChild(makeElem("td",0, _cityTotals.iwood ));
	tr1.appendChild(makeElem("td",0, _cityTotals.iwine ));
	tr1.appendChild(makeElem("td",0, _cityTotals.imarble ));
	tr1.appendChild(makeElem("td",0, _cityTotals.icrystal ));
	tr1.appendChild(makeElem("td","tb", _cityTotals.isulphur ));

// ADD NEW ROWS TO TABLE AS CHILDREN
	var tbody = xpath("//tbody[@class='tableh01']").snapshotItem(0);	// find table
	tbody.appendChild( tr1 );			// & addChild
}

function addTotalsRow()
{
	var tr1 = makeElem("tr","top",0);

// TD1	'Header' Cell
		td1 = makeElem("td","tb",0);
		td1.setAttribute("align", "left");
		td1.setAttribute("ROWSPAN", 2);

		tr1.setAttribute("style", "border:solid 3px #E4B873 ! important; border-style:solid none none none ! important;");
		td1.innerHTML = "Totals Row";
		tr1.appendChild(td1);
// Value Cells:
		makeFirstRow(tr1,_cityTotalsRow,"total");


	var tr2 = makeElem("tr","bottom",0);
		makeSecondRow(tr2,_cityTotalsRow,"total");


// ADD NEW ROWS TO TABLE AS CHILDREN
	var tbody = xpath("//tbody[@class='tableh01']").snapshotItem(0);	// find table
	tbody.appendChild( tr1 );			// & addChild
	tbody.appendChild( tr2 );			// & addChild
}


function makeFirstRow( tr1, city, flag )
{
// TD2
		var td2 = makeElem("td",0, city.wood );
		td2.setStorageWarning( city.wood, city.iwood, city.maxwood );
	tr1.appendChild(td2);
// TD3
		var td3 = makeElem("td",0, city.wine );
		td3.setStorageWarning( city.wine, city.iwine, city.maxluxury );
	tr1.appendChild(td3);
// TD4
		var td4 = makeElem("td",0, city.marble );
		td4.setStorageWarning( city.marble, city.imarble, city.maxluxury );
	tr1.appendChild(td4);
// TD5
		var td5 = makeElem("td",0, city.crystal );
		td5.setStorageWarning( city.crystal, city.icrystal, city.maxluxury );
	tr1.appendChild(td5);
// TD6
		var td6 = makeElem("td","tb", city.sulphur );
		td6.setStorageWarning( city.sulphur, city.isulphur, city.maxluxury );
	tr1.appendChild(td6);
// TD7	
		var td7 = makeElem("td",0,"");
		td7.innerHTML += szprependplus( city.netgold );
	tr1.appendChild(td7);
// TD8
		var td8 = makeElem("td",0, 0 );
		td8.innerHTML =  city.citizens + "/" + city.citizenmax;
		td8.setStorageWarning( city.citizens, 0, city.citizenmax, 0.3 );
	tr1.appendChild(td8);
// TD9
	tr1.appendChild( makeElem("td",0, city.dresearch ) );
}

function makeSecondRow( tr2, city, flag )
{
// td22
		var td22 = makeElem("td",0, "&nbsp " + szifnonzero( city.dwood ) );
		td22.setUsageWarning( city.wood, city.dwood, city.iwood, city.maxwood );
	tr2.appendChild(td22);
// td23
		var td23 = makeElem("td",0, "&nbsp " + szifnonzero( city.dwine ) );
		td23.setUsageWarning( city.wine, city.dwine, city.iwine, city.maxluxury );
	tr2.appendChild(td23);
// td24
		var td24 = makeElem("td",0, "&nbsp " + szifnonzero( city.dmarble ) );
		td24.setUsageWarning( city.marble, city.dmarble, city.imarble, city.maxluxury );
	tr2.appendChild(td24);
// td25
		var td25 = makeElem("td",0, "&nbsp " + szifnonzero( city.dcrystal ) );
		td25.setUsageWarning( city.crystal, city.dcrystal, city.icrystal, city.maxluxury );
	tr2.appendChild(td25);
// td26
		var td26 = makeElem("td","tb", "&nbsp " + szifnonzero( city.dsulphur ) );
		td26.setUsageWarning( city.sulphur, city.dsulphur, city.isulphur, city.maxluxury );
	tr2.appendChild(td26);
// td27	
		var td27 = makeElem("td",0, city.corruption );
	tr2.appendChild(td27);
// td28
		var td28 = makeElem("td",0, "("+CommaFormatted(parseFloatComma(city.citizenmax)-parseFloatComma(city.citizens))+")" );
		td28.innerHTML += szprependplus( city.growth )
		td28.setUsageWarning( city.citizens, city.growth, 0, city.citizenmax );
	tr2.appendChild(td28);
// td29
	tr2.appendChild( makeElem("td",0, city.culturalgoods ) );
}

function setStorageWarning( amount, incoming, storage, modifier )
{	if( !modifier )	modifier = 1;	// if no modifier specified

	var p = ( parseFloatComma(amount) + parseFloatComma(incoming) ) / parseFloatComma(storage);
	this.setWarning = setWarning;
	this.setWarning( Math.pow( p , 1/modifier ) );
}

function setUsageWarning( amount, usage, incoming, storage, modifier )	// calculates hours till full or hours till empty if usage -ve (wine)
{	if( !modifier )	modifier = 1;	// if no modifier specified
	if( usage == 0 ) return;	// will never reach limit or run out!

	var hours = 0;
	var remaining = 0;
	if( usage < 0 )	// usage -ve (wine)
	{	// doesn't include incoming [have 1hrs resource left with incoming in 2 hrs (would stop wine serving)
		remaining = parseFloatComma(amount);
		hours = (-1) * ( remaining / parseFloatComma(usage) );
	}
	else
	{	// adds incoming goods for extra paranoia
		remaining = parseFloatComma(storage) - ( parseFloatComma(amount) + parseFloatComma(incoming) );
		hours = remaining / parseFloatComma(usage);
	}

//	FOR MODIFIER = 1:
//	Converts to p = 1 (100% warning = bright red) at MinHours Hour remaining
// 	starts showing a warning at MaxHours remaining (starts to show warning at p = 0.6
	var MinHours = 0;
	var MaxHours = 48;
	var MaxWarning = 1;
	var MinWarning = 0.6;

	var gradient = ( MinWarning - MaxWarning ) / ( MaxHours - MinHours );
	var constant = MaxWarning - gradient*MinHours;

	var p = gradient * hours + constant;

	this.setWarning = setWarning;
	this.setWarning( Math.pow( p , 1/modifier ) );
}

function setWarning( p )
{
	var MinWarning = 0.6;
	if( p < MinWarning ) return;	// low end warning cutoff can be made higher to give less warning if reqd

	var szColour;
	var whitetext = 0;

    if( WEBSAFEWARNINGS )
    {
	var colour = new Array( "#6666ff","#cc3399","#ff0000","#ff3333","#ff6666","#cc6666","#ff9999","#ffcc99","#ffcccc","#ffffcc" );
		// colours:	trade warn   100%	95% etc...

	     if( p > 1 ){	szColour = colour[0];	whitetext = 1;}	// INCOMING WARNING (when amount > 100% when trade ships arrive [would lose the extra])
	else if( p == 1 ){	szColour = colour[1];	whitetext = 1;}
	else if( p >= 0.95 ){ 	szColour = colour[2];	whitetext = 1;}
	else if( p >= 0.90 ){ 	szColour = colour[3];	whitetext = 1;}
	else if( p >= 0.85 ){ 	szColour = colour[4];	whitetext = 1;}
	else if( p >= 0.80 ){ 	szColour = colour[5];	whitetext = 0;}
	else if( p >= 0.75 ){ 	szColour = colour[6];	whitetext = 0;}
	else if( p >= 0.70 ){ 	szColour = colour[7];	whitetext = 0;}
	else if( p >= 0.65 ){ 	szColour = colour[8];	whitetext = 0;}
	else if( p >= 0.60 ){	szColour = colour[9];	whitetext = 0;}
	else	return;

    }
    else	// constant gradient
    {
	if( p > 1 ){		szColour = "#0040ff";	whitetext = 1;}
	else if ( p == 1 ){	szColour = "#ff00ff";	whitetext = 1;}
	else
	{
		// 253 247 221 ORIG table

		var normalisedp = (parseFloat(p - MinWarning)/parseFloat(1-MinWarning));	// between 0 and 1

		Red = szPad( (parseInt( 253 + 2*normalisedp )).toString(16) , 2, "0" );
		Blue = szPad( (parseInt( 247 - 247*normalisedp )).toString(16) , 2, "0" );
		Green = szPad( (parseInt( 221 - 221*normalisedp )).toString(16) , 2, "0" );

		if( normalisedp > 0.5 )	whitetext = 1;

		szColour = "#" + Red + Blue + Green;
	}
    }

this.setAttribute("bgcolor",szColour);
if( whitetext ) this.innerHTML = '<SPAN style="color:white;">' + this.innerHTML + "</SPAN>";

}

function szPad( szString, length, char )
{	szString += "";
	while( szString.length < length ){	szString = "" + char + szString; }
	return( szString );
}

function szprependplus( value )
{
	var szString = "";
	var fvalue = parseFloatComma( value );
	if( fvalue > 0 )	szString = "+";
				szString += value;
	return( szString );
}
function szifnonzero( value )
{
	var szString = "";
	var fvalue = parseFloatComma( value );
	if( fvalue > 0 )	szString = "+";
	if( fvalue != 0 )	szString += value;
	return( szString );
}

function makeElem( sztype, szattrib, szinnerHTML )
{
	switch( sztype )
	{
	case "th":	// TH element
		{
			var elem = document.createElement("TH");
		} break;

	case "tr":	// TR element
		{
			var elem = document.createElement("TR");

			switch( szattrib )
			{
			case "top":	elem.setAttribute("style", "border:none 2px #E4B873 ! important;");		break;
			case "bottom":	elem.setAttribute("style", "border-bottom:solid 2px #E4B873 ! important;");	break;
			default:	break;
			}
		} break;

	case "td":	// default td element with default border
		{
			var elem = document.createElement("TD");
			elem.setAttribute("align", "right");
			elem.setStorageWarning = setStorageWarning;
			elem.setUsageWarning   = setUsageWarning;

			switch( szattrib )
			{
			case "thickb":	elem.setAttribute("style", "border-right:solid 3px #F3DDB5; padding:4px; width: 60px;");	break;
			default:	elem.setAttribute("style", "border-right:solid 1px #F3DDB5; padding:4px; width: 60px;");	break;
			}
		} break;

	case "span":
		{
			var elem = document.createElement("span");
		} break;

	case "a":
		{
			var elem = document.createElement("a");
			switch( szattrib )
			{
				case "newwindow":	elem.setAttribute("target", "_blank" );	break;
				default:		break;
			}
		} break;

	default:	return;
	}
	
	if( szinnerHTML ) elem.innerHTML = szinnerHTML;
	return( elem );
}

function roundNumber(num, dec)
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function parseFloatComma( INPUT )
{
	INPUT += '';
	var szString = INPUT.replace(/,/g,'');
	return parseFloat( szString );
}

function CommaFormatted(amount)
{
	amount = parseFloat(amount);
	amount = roundNumber( amount, 2 );		// cut to 2DP max

	if( amount < 1000 ) return( amount );

	amount += '';	// TO STRING
	var szend	= '';				// initalise to empty string
	var length 	= amount.length;
	var end 	= amount.indexOf('.')
	if( amount.indexOf('.') == -1 )	end = length;	// IF NO DECIMAL POINT

	for( end -= 3 ; end > 0 ; end -= 3 )
	{	szend = ',' + amount.substring( end ) + szend;
		amount = amount.substring( 0, end );		}

	return( amount.substring( end ) + szend );
}
// END ;(
