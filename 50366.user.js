// coding: utf-8
// ==UserScript==
// @name          	Ikariam v3 Empire Board
// @namespace     empire-board.ikariam
// @version		156
// @author		oliezekat, edit by fleske
// @description    Display population, resources, trading, transports, incomes, buildings, and army or fleet units overviews for each cities. Require Ikariam v.0.3.x server game. Support any countries/languages.
// @include     http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/*?view=premium
// @exclude    http://*.ikariam.*/*?view=premiumPayment
// @exclude    http://*.ikariam.*/pillory.php
// @exclude    http://ikariam.ogame-world.com/*
// @exclude    http://www.ika-world.com/*
// @exclude    http://ikariamap.com/*
// @exclude    http://support.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************

LAST CHANGES:

Version 1.5.6:
- Fix to detect payload while merchant navy view report missing transports
- Fixed a bug while military movement icon is a JPEG image
- Fix while deployed troops into friendly city (to support v.0.3.1)
- Swap resources and buildings tables

PREV IOUS CHANGES:
http://userscripts.org/topics/20976

Based on "Ikariam Alarm And Overview Table" script (for Ikariam v0.2.8)
http://userscripts.org/scripts/show/35995

**************************************************************************************************/

if (!EmpireBoard) var EmpireBoard = {};

// Old global vars
var server;
//var body_id;
var actioncode;
var config;
var PROGRESS_BAR_MODE; //have to be a global variable

EmpireBoard =
	{
	DB:			 {},
	Ikariam:	 {},
	DOM:		 {},
	Str:		 {},
	Tooltip:	 {},
	HomePage:	 'http://userscripts.org/scripts/show/50366',
	Version:	 156,
	StartTime:	 0,
	EndTime:	 0
	};

EmpireBoard.Init = function()
	{
	GM_log('Start...');
	this.StartTime = new Date().getTime();
	
	this.DOM.Init(this);
	this.Str.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	
	GM_log('Ikariam '+this.Ikariam.Version());
	//this.Ikariam.Is_Version_031x();
	
	// Always create main div for add-ons  which need to check version
	var body = getNode("//body");
	var span = document.createElement('div');
	span.id = "EmpireBoard";
	span.setAttribute("version", this.Version);
	body.appendChild(span);
	
	server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
	server = RegExp.$1;

	//body_id = this.Ikariam.View();
	actioncode = getActionCode();
	};
	
EmpireBoard.DB =
	{
	_Parent: null,
	Prefix: '',
	Cities: {}
	};

EmpireBoard.DB.Init = function(parent, host)
	{
	this._Parent = parent;
	
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};
	
EmpireBoard.DB.Load = function()
	{
	
	};

EmpireBoard.DB.Save = function()
	{
	
	};

EmpireBoard.Ikariam =
	{
	_Parent:		 null,
	_View:			 null,
	_Host:			 null,
	_Server:		 null,
	_Language:		 null,
	_Version:		 null,
	_IsV031x:		 null,
	_ActionRequest:	 null
	};
	
EmpireBoard.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};

EmpireBoard.Ikariam.View = function()
	{
	if (this._View == null)
		{
		this._View = '';
		
		// Fetch view name
		try
			{
			this._View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) this._View = RegExp.$1;
			}
		}
		
	return this._View;
	};
	
EmpireBoard.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
EmpireBoard.Ikariam.Server = function(host)
	{
	if (this._Server == null)
		{
		if (host == undefined) host = this.Host();
		this._Server = '';
		
		var parts = host.split(".");
		var idx = 0;
		if (parts[0] == 'www') idx++;
		this._Server = parts[idx];
		}
	
	return this._Server;
	};

EmpireBoard.Ikariam.Language = function()
	{
	if (this._Language == null)
		{
		this._Language = '';
		
		var sCode = '';
		var scripts = document.getElementsByTagName("script");
		for (var j = 0; j < scripts.length; j++)
			{
			var nScript = scripts[j];
			sCode = nScript.innerHTML;
			if (sCode.indexOf('LocalizationStrings') >= 0)
				{
				break;
				}
			}
		
		if (sCode != '')
			{
			var reg = /LocalizationStrings\['language'\]\s+=\s+'(.+)';/;
			var res = reg.exec(sCode);
			if (res != null) this._Language = res[1];
			}
		}
	
	return this._Language;
	};
	
EmpireBoard.Ikariam.Version = function()
	{
	if (this._Version == null)
		{
		this._Version = '';
		
		this._Version = this._Parent.DOM.Get_First_Node_TextContent("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'');
		}
	
	return this._Version;
	};

// NB: return true if higher than 0.3.1
EmpireBoard.Ikariam.Is_Version_031x = function()
	{
	if (this._IsV031x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.1', this.Version()) >= 0)
			{
			this._IsV031x = true;
			GM_log("Ikariam server is v.0.3.1 or higher");
			}
		else
			{
			this._IsV031x = false;
			}
		}
	
	return this._IsV031x;
	};
	
EmpireBoard.Ikariam.Trim_Coords = function(str)
	{
	return this._Parent.Str.Trim_Accodances(str);
	};
	
EmpireBoard.Ikariam.City_Object = function()
	{
	var City = new Object;
	
	City.id			 = 0;
	City.name		 = '';
	
	//this.own			 = undefined;
	
	return City;
	};
			
EmpireBoard.Ikariam.Fetch_CurrentPlayerCities = function(database)
	{
	if (database == undefined) database = {};
	
	var Options = this._Parent.DOM.Get_Nodes("//select[@id='citySelect']/option");
	if (Options != null)
		{
		for (var i=0; i < Options.snapshotLength; i++)
			{
			var Option = Options.snapshotItem(i);
			
			// Occupied city ?
			if (this._Parent.DOM.Has_ClassName(Option,'occupiedCities')) continue;
			// Deployed troops into allied city
			if (this._Parent.DOM.Has_ClassName(Option,'deployedCities')) continue;
			
			var CityId = parseInt(Option.value);
			
			if (database[CityId] == undefined)
				{
				database[CityId] = new this.City_Object();
				}
			
			database[CityId].id = CityId;
			database[CityId].name = this._Parent.Str.Trim(this.Trim_Coords(Option.textContent));
			database[CityId].own = true;
			}
		}
	
	return database;
	};

EmpireBoard.Ikariam.ActionRequest = function()
	{
	if (this._ActionRequest == null)
		{
		
		}
		
	return this._ActionRequest;
	};
	
EmpireBoard.Ikariam.Get_Happiness_ImgSrc = function(growth)
	{
	if (growth == undefined) growth = 0;
	var imagen = '';
	var tag = '';
	
	if (growth < -6 )
		{
		imagen = 'outraged';
		}
	else if (growth < 0)
		{
		imagen = 'sad';
		}
	else if (growth < 1)
		{
		imagen = 'neutral';
		}
	else if (growth < 6)
		{
		imagen = 'happy';
		}
	else
		{
		imagen = 'ecstatic';
		}
	//tag = 'skin/smilies/' + imagen + '.gif';
	tag = 'skin/smilies/' + imagen + '_x32.gif';
	
	return tag;
	};
	
EmpireBoard.Ikariam.Resource_Capacity = function(ResType, WarehouseLevel)
	{
	if (ResType == undefined) ResType = 'wine';
	if (WarehouseLevel == undefined) WarehouseLevel = 0;
	
	var result = 0;
	
	if (this.Is_Version_031x() == true)
		{
		result = 1500;
		}
	else
		{
		if (ResType == 'wood')
			{
			result = 3000;
			}
		else
			{
			result = 1500;
			}
		}
	result = result + (WarehouseLevel * 8000);
	return result;
	};

EmpireBoard.Ikariam.Resource_SafeCapacity = function(ResType, WarehouseLevel)
	{
	if (ResType == undefined) ResType = 'wine';
	if (WarehouseLevel == undefined) WarehouseLevel = 0;
	
	var result = 0;
	
	if (this.Is_Version_031x() == true)
		{
		result = 100;
		result = result + (WarehouseLevel * 80);
		}
	else
		{
		if (ResType == 'wood')
			{
			result = 100;
			result = result + (WarehouseLevel * 160);
			}
		else
			{
			result = 50;
			result = result + (WarehouseLevel * 80);
			}
		}
	return result;
	};

EmpireBoard.DOM =
	{
	_Parent: null,
	};

EmpireBoard.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

EmpireBoard.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
EmpireBoard.DOM.Get_First_Node = function(path)
	{
	var value = this.Get_Nodes(path);
	if (value.snapshotLength == 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
	
EmpireBoard.DOM.Get_First_Node_Value = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.value;
		}
	else return defaultValue;
	};
	
EmpireBoard.DOM.Get_First_Node_TextContent = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.textContent;
		}
	else return defaultValue;
	};
	
EmpireBoard.DOM.Has_ClassName = function(oElm, strClassName)
	{
	var arrayClassNames = oElm.className.split(' ');
	var Found = false;
	var arrayClassNamesLength = arrayClassNames.length;
	for (var k=0; k<arrayClassNamesLength; k++)
		{
		if (arrayClassNames[k] == strClassName)
			{
			Found = true;
			break;
			}
		}
	return Found;
	};
	
/* Lib for strings processes */
EmpireBoard.Str =
	{
	_Parent: null
	};
	
EmpireBoard.Str.Init = function(parent)
	{
	this._Parent = parent;
	};
	
EmpireBoard.Str.Trim = function(str)
	{ 
	str = str.replace(/&nbsp;/gi, " ");
	str = str.replace(/\t/gi, " ");
	str = str.replace(/\v/gi, "");
	str = str.replace(/\f/gi, "");
	str = str.replace(/\n/gi, "");
	str = str.replace(/\r/gi, "");
	//str = str.replace(/\e/gi, "");
	str = str.replace(/\s/gi, " ");
	
	while(str.charAt(0) == (" "))
		{ 
		str = str.substring(1);
		}
	while(str.charAt(str.length-1) == " " )
		{ 
		str = str.substring(0,str.length-1);
		}
	return str;
	};
	
EmpireBoard.Str.Trim_Brackets = function(str)
	{
	str = str.replace(/\(.+\)/gi, "");
	
	return str;
	};
	
EmpireBoard.Str.Trim_Accodances = function(str)
	{
	str = str.replace(/\[.+\]/gi, "");
	
	return str;
	};
	
EmpireBoard.Str.TwoDigit = function(val)
	{
	val = parseInt(val);
	if (val == 0)
		{
		val = "00";
		}
	else if (val < 10)
		{
		return "0"+val;
		}
	return val;
	};

/*
v1 & v2 as "v.00.00.00 0000"

return 0 if v2 = v1
	 1 if v2 > v1
	-1 if v2 < v1
*/
EmpireBoard.Str.Compare_Versions = function(v1, v2)
	{
	var result = 0;
	
	// remove "v."
	v1 = v1.replace(/v\./gi, "");
	v2 = v2.replace(/v\./gi, "");
	
	// build number use space separator
	v1 = v1.replace(/ /gi, ".");
	v2 = v2.replace(/ /gi, ".");

	// Parse numbers
	var vn1 = v1.split('.');
	var vn2 = v2.split('.');
	
	// Convert as integer
	for (var i = 0; i < vn1.length; i++)
		{
		vn1[i] = parseInt(vn1[i]);
		}
	for (var j = 0; j < vn2.length; j++)
		{
		vn2[j] = parseInt(vn2[j]);
		}
		
	for (var k = 0; k < vn1.length; k++)
		{
		if (vn2[k] == undefined)
			{
			if (vn1[k] > 0) result = -1;
			break;
			}
		else if (vn2[k] > vn1[k])
			{
			result = 1;
			break;
			}
		else if (vn2[k] < vn1[k])
			{
			result = -1;
			break;
			}
		}
	if ((result == 0) && (vn2.length > vn1.length))
		{
		if (vn2[vn1.length] > 0)
			{
			result = 1;
			}
		else if (vn2[vn2.length-1] > 0)
			{
			result = 1;
			}
		}
		
	//GM_log(v1+" vs "+v2+" = "+result);
	
	return result;
	};
	
EmpireBoard.Str.To_Integer = function(str, defaultValue)
	{
	// Support signed integers
	var temp = ""+str;
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
		{
		return defaultValue;
		}
	return temp;
	};
	
EmpireBoard.Str.FormatBigNumber = function(num, alwaysShowSign)
	{
	var s = ""+num;
	if (num == undefined || s == "NaN" || s == "-")
		{
		return "-";
		}
	else if (num == "?")
		{
		return num;
		}
		
	var negative = "";
	if (s.substring(0, 1) == "-")
		{
		negative = "-";
		s = s.substring(1);
		}
	else if (alwaysShowSign == true)
		{
		negative = "+";
		}
		
	var i = s.length-3;
	while (i > 0)
		{
		s = s.substring(0, i) + "." + s.substring(i);
		i -= 3;
		}
	return negative + s;
	};

EmpireBoard.Init();

config = unserialize(getVar("config", ""));
if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
  config = new Object();
}
if (config.cfg == undefined) {
  config.cfg = new Object();
}

/************************* DEFAULT STYLE **************************/
var default_style = <><![CDATA[
#EmpireBoard table.Overview {
  text-align: center;
  background-color: #FDF7DD;
  width: 980px !important;
  border-collapse: collapse;
  border-style: double; border-width: 3px; border-color: #CB9B6A;
}
#EmpireBoard table.Overview thead {  background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #E7C680;}

#EmpireBoard table.Overview th.city_name,
#EmpireBoard table.Overview td.city_name { overflow: hidden;  }

#EmpireBoard table.Overview th {
  height: 22px;
  padding: 1px;
  padding-bottom: 2px;
  padding-left: 3px;
  color: #542C0F; 
  text-align: center !important;
  font-weight: bold;
}
#EmpireBoard table.Overview th.city_name {width: 110px !important; max-width: 110px;}
#EmpireBoard.RtoL table.Overview th.city_name {}
#EmpireBoard table.Overview th.actions { border-left-color: #ECCF8E;border-left-width: 1px; border-left-style: solid;width: 45px; max-width: 45px; padding-left: 2px; padding-bottom: 3px; text-align: right !important;vertical-align: bottom;}
#EmpireBoard.RtoL table.Overview th.actions {border-right-color: #ECCF8E; border-right-width: 1px; border-right-style: solid;}
#EmpireBoard table.Buildings th.build_name0,
#EmpireBoard table.Buildings th.build_name1,
#EmpireBoard table.Buildings th.build_name2,
#EmpireBoard table.Buildings th.build_name3,
#EmpireBoard table.Buildings th.build_name4,
#EmpireBoard table.Buildings th.build_name5,
#EmpireBoard table.Buildings th.build_name6 { max-width: 30px; overflow: hidden; cursor: default;}
#EmpireBoard table.Buildings th.build_name2 { max-width: 50px;}
#EmpireBoard table.Buildings th.build_name3 { max-width: 65px;}
#EmpireBoard table.Buildings th.build_name4 { max-width: 80px;}
#EmpireBoard table.Buildings th.build_name5 { max-width: 95px;}
#EmpireBoard table.Buildings th.build_name6 { max-width: 110px;}
#EmpireBoard table.Buildings th.build_name7 { max-width: 125px;}
#EmpireBoard table.Army th.unit_name {  max-width: 35px; overflow: hidden; cursor: default;}

#EmpireBoard table.Overview td {border-color: #ECCF8E; border-width: 1px; border-style: solid;}
#EmpireBoard table.Overview td {  height: auto; color: #542C0F; line-height: 12px; min-width: 10px; vertical-align: top; text-align: right; padding: 1px;}
#EmpireBoard table.Buildings td {vertical-align: middle;}
#EmpireBoard table.Overview td.city_name { width: 110px; max-width: 110px;padding-left: 3px;text-align: left; }
#EmpireBoard.RtoL table.Overview td.city_name { text-align: right; }
#EmpireBoard table.Overview td.actions {  text-align: right; }
#EmpireBoard.RtoL table.Overview td.actions { }

#EmpireBoard table.Overview th.actions img,
#EmpireBoard table.Overview td.actions img { margin-left: 1px; border: none; max-height: 15px;}

#EmpireBoard table.Overview tr.current {
  background-color: #FEE8C8;
}

#EmpireBoard table.Overview .More {
font-size: 10px;
line-height: 10px !important;
height: 10px !important;
margin-top:-1px;
clear: both;
display: block;
cursor: default;
}
#EmpireBoard table.Overview tbody .More { color: #CB9B6A;}

/****************** progress bar styles *******************/
#EmpireBoard table.Overview table.myPercent {
  height: 4px !important;
  width: 92%;
  background-color: !transparent !important;
  margin-top: 1px;
  margin-left: 3px;
  margin-right: 2px;
}
#EmpireBoard table.Overview table.myPercent td {height: 4px !important;border-color: #FDF7DD; min-width: 0px !important; padding: 0px !important; background-color: #CB9B6A;}
#EmpireBoard table.Overview table.myPercent td.myPercentNormal { /* normal state. you have plenty of rooms */
  background-color: #73443E;
}
#EmpireBoard table.Overview table.myPercent td.myPercentWarning { /* warehose is getting full */
  background-color: #B42521;
}
#EmpireBoard table.Overview table.myPercent td.myPercentAlmostFull { /* warehouse is almost full */
  background-color: #C91A17;
}
#EmpireBoard table.Overview table.myPercent td.myPercentFull { /* warehouse is full */
  background-color: #ff0000;
}

#EmpireBoard table.Overview tfoot { 
  background-color: #FAEAC6;
}
#EmpireBoard table.Overview tfoot td { 
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: #CB9B6A;
  font-weight: bold;
}
#EmpireBoard table.Overview th.lf,
#EmpireBoard table.Overview td.lf {
  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: #CB9B6A;
}
#EmpireBoard.RtoL table.Overview th.lf,
#EmpireBoard.RtoL table.Overview td.lf {
  border-left-style: none;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #CB9B6A;
}

/****************** alerts *******************/
#EmpireBoard sup {
vertical-align: top !important;
font-size: 10px;
line-height: 10px;
height: 10px;
}
#EmpireBoard .Bold,
#EmpireBoard .Red {
font-weight: bold;
}
#EmpireBoard .Green {
  color: green !important;
}
#EmpireBoard .Red {
  color: red !important;
}
#EmpireBoard img.Safe { height: 11px; }
#EmpireBoard table.Overview td img.Safe {float: left; margin-left: 3px;}

/****************** footer *******************/
#EmpireBoard p {text-align: left; margin-bottom: 5px; display: block; width: 980px !important; }
#EmpireBoard.RtoL p {text-align: right;}
#EmpireBoard p.Caption { font-size: 11px}
#EmpireBoard p.Footer {text-align: right}
#EmpireBoard.RtoL p.Footer {text-align: left;}
#EmpireBoard p.Footer .button {margin-top: 0px; margin-bottom: 15px}

#EmpireBoard #EmpireBoardSettings {width: 980px !important;}
#EmpireBoard #EmpireBoardSettings td {border: none !important;}
#EmpireBoard #EmpireBoardSettings input.button {margin-right: 5px;}

/****************** tooltip *******************/
div#EmpireBoardTooltip { position:absolute; z-index: 2000;}

.TTContent {padding: 3px; background-color: #FDF7DD; border-color: #BE8D53; border-width: 1px; border-top-width: 4px; border-style: solid; color: #542C0F;}
.TTTitle { font-weight: bold; background-color: #FAE0AE;padding: 3px; margin: -3px; margin-bottom:4px;}
.TTContent table tbody {background-color: #FAEAC6; border-bottom-width: 3px; border-bottom-color: #FDF7DD;border-bottom-style: solid;}
.TTContent table tfoot {background-color: #FAE0AE;}
.TTContent table td {padding: 2px;}
.TTContent table .Small td {
padding-top: 0px;
font-size: 10px !important;
line-height: 10px !important;
}
]]></>.toXMLString();

function xpath(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getCfgValue(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}
function getCfgValueNonEmpty(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
}

var language;
function setLanguage() {
  var arr = server.split("\.");
  language = arr[arr.length - 1];
  if (language == "com" && arr.length == 4) { //for example: http://s1.ba.ikariam.com
    language = arr[1];
  }
  var l = getCfgValueNonEmpty("LANGUAGE", language);
  if (l != undefined) {
    language = l;
  }
}
setLanguage();

var tavernWineUsage = [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136,150,165,180,197,216,235,255,277,300,325,351,378,408,439,472];
var townHallSpaces = [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2690, 2845, 3003, 3163, 3326, 3492, 3660];
// fix for v3
/*
var unitsAndShipsIndexes = {
  "unit slinger" : 0,
  "unit swordsman" : 1,
  "unit phalanx": 2,
  "unit archer" : 3,
  "unit marksman" : 4,
  "unit gyrocopter" : 5,
  "unit steamgiant" : 6,
  "unit bombardier" : 7,
  "unit ram" : 8,
  "unit catapult" : 9,
  "unit mortar" : 10,
  "unit medic" : 11,
  "unit cook" : 12,

  "unit ship_ram" : 13,
  "unit ship_ballista" : 14,
  "unit ship_flamethrower" : 15,
  "unit ship_catapult" : 16,
  "unit ship_steamboat" : 17,
  "unit ship_mortar" : 18,
  "unit ship_submarine" : 19,
};
var unitsAndShipsIndexesR = [];
for(key in unitsAndShipsIndexes) {
  unitsAndShipsIndexesR[unitsAndShipsIndexes[key]] = key;
}
*/

// Fix for v3
/*
function warehouseCapacities(level)
	{
	if (level == 0) 
		{ return 0; }
	else
		{ return level*8000; }
	}
*/

var buildings;
var texts;
var langtype;
function getLocalizedTexts() {
if (language == "de") { //german translation, thanks to Schneppi & xkaaay
langtype = "";
  buildings = {
    "townHall"      : ["Rathaus", "Rathaus"],
    "academy"       : ["Academie", "Academie"],
    "port"          : ["Handelshafen", "Handelshafen"],
    "shipyard"      : ["Schiffswerft", "Schiffswerft"],
    "warehouse"     : ["Lagerhaus", "Lagerhaus"],
    "wall"          : ["Stadtmauer", "Stadtmauer"],
    "tavern"        : ["Taverne", "Taverne"],
    "museum"        : ["Museum", "Museum"],
    "palace"        : ["Palast", "Palast"],
    "palaceColony"  : ["Statthaltersitz", "Statthaltersitz"],
    "embassy"       : ["Botschaft", "Botschaft"],
    "branchOffice"  : ["Kontor", "Kontor"],
    "safehouse"     : ["Versteck", "Versteck"],
    "barracks"      : ["Kaserne", "Kaserne"],
    "workshop"      : ["Erfinderwerkstatt", "Erfinderwerkstatt"],
    "carpentering"  : ["Zimmerei", "Zimmerei"],
    "forester"      : ["Forsthaus", "Forsthaus"],
    "stonemason"    : ["Steinmetz", "Steinmetz"],
    "glassblowing"  : ["Glasbläserei", "Glasbläserei"],
    "winegrower"    : ["Winzerei", "Winzerei"],
    "alchemist"     : ["Alchimistenturm", "Alchimistenturm"],
    "architect"     : ["Architekturbüro", "Architekturbüro"],
    "optician"      : ["Optiker", "Optiker"],
    "vineyard"      : ["Kelterei", "Kelterei"],
    "fireworker"    : ["Feuerwerksplatz", "Feuerwerksplatz"]
  };
  texts = {
    "cityName"          : "Stadtname",
    "currentlyBuilding" : "Zur Zeit im Bau",
    "summary"           : "Gesamt:",
    "hide_settings"     : "Verstecke Optionen",
    "show_settings"     : "Zeige Optionen",
    "Population"        : "Bevölkerung",
    "finishedBuilding"  : "Bau abgeschlossen",
    "Incomes"           : "Einkommen",
    "Trading"           : "Handel",
    "Wood"              : "Baumaterial",
    "Wine"              : "Wein",
    "Marble"            : "Marmor",
    "Crystal"           : "Kristallglas",
    "Sulfur"            : "Schwefel"
  };
    
} else if (language == "se") { // thank Dinfur
	langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
	buildings = {
	"townHall" : ["Rådhus", "Rådhus"],
	"academy" : ["Akademi", "Akademi"],
	"port" : ["Handelshamn", "Hamn"],
	"shipyard" : ["Skeppsvarv", "Varv"],
	"warehouse" : ["Lagerlokal", "Lager"],
	"wall" : ["Stadsmur", "Mur"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Museum", "Museum"],
	"palace" : ["Palats", "Palats"],
	"palaceColony" : ["Guvernörsresidens", "Guvernör"],
	"embassy" : ["Ambassad", "Ambassad"],
	"branchOffice" : ["Handelsstation", "Handel"],
	"safehouse" : ["Gömställe", "Gömställe"],
	"barracks" : ["Kasern", "Kasern"],
	"workshop" : ["Verkstad", "Verkstad"],
	"carpentering" : ["Snickare", "Snickare"],
	"forester" : ["Skogsvaktare", "Skog"],
	"stonemason" : ["Stenhuggare", "Sten"],
	"glassblowing" : ["Glasblåsare", "Glas"],
	"winegrower" : ["Vinodlare", "Vin"],
	"alchemist" : ["Alkemist", "Alkemist"],
	"architect" : ["Arkitekt", "Arkitekt"],
	"optician" : ["Optiker", "Optiker"],
	"vineyard" : ["Vinpress", "Vin"],
	"fireworker" : ["Fyrverkerifabrik", "Fyrverk."]
	};
	texts = {
	"cityName": "Stadsnamn", "currentlyBuilding": "Bygger nu", "summary": "Summering:",
	"hide_settings": "Göm inställningar", "show_settings": "Visa inställningar",
	"Population": "Befolkning",
	"finishedBuilding": "Byggt klart","Incomes":"Inkomster","Trading":"Handlar",
	"Wood": "Trä", "Wine": "Vin", "Marble": "Marmor", "Crystal": "Kristall", "Sulfur": "Svavel"
	};
} else if (language == "fi") { //Finnish translation by DeFe
	langtype = "";
	buildings = {
	"townHall" : ["Kaupungintalo", "K. Talo"],
	"academy" : ["Akatemia", "Akatemia"],
	"port" : ["Kauppasatama", "Satama"],
	"shipyard" : ["Telakka", "Telakka"],
	"warehouse" : ["Varasto", "Varasto"],
	"wall" : ["Muuri", "Muuri"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Museo", "Museo"],
	"palace" : ["Palatsi", "Palatsi"],
	"palaceColony" : ["Kuvernöörin asunto", "Kuvernööri"],
	"embassy" : ["Lähetystö", "Lähetystö"],
	"branchOffice" : ["Kauppapaikka", "Kauppapaikka"],
	"safehouse" : ["Piilopaikka", "Piilopaikka"],
	"barracks" : ["Kasarmi", "Kasarmi"],
	"workshop" : ["Paja", "Paja"],
	"carpentering" : ["Puusepän Paja", "Puuseppä"],
	"forester" : ["Metsänhoitaja", "Metsänhoitaja"],
	"stonemason" : ["Kivenhakkaaja", "Kivenhakkaaja"],
	"glassblowing" : ["Lasinpuhaltaja", "Lasinpuhaltaja"],
	"winegrower" : ["Viinitarhuri", "Viinitarhuri"],
	"alchemist" : ["Alkemistin Torni", "Alkemisti"],
	"architect" : ["Arkkitehdin Toimisto", "Arkkitehti"],
	"optician" : ["Optikko", "Optikko"],
	"vineyard" : ["Viinipaino", "Viinipaino"],
	"fireworker" : ["Ilotulite Testialue", "Testialue"]
	};
	texts = {
	"cityName": "Kaupungin nimi", "currentlyBuilding": "Rakentumassa", "summary": "Yhteenveto:",
	"hide_settings": "Piilota asetukset", "show_settings": "Näytä asetukset",
	"Population": "Populaatio",
	"finishedBuilding": "Rakennus valmis","Incomes":"Tulot","Trading":"kaupankäynti",
	"Wood": "Puu", "Wine": "Viini", "Marble": "Marmori", "Crystal": "Kristalli", "Sulfur": "Rikki"
	}; 
} else if (language == "tw") { //traditional chinese translation by Whiskers
	langtype = "";
	buildings = {
	"townHall" : ["市政府", "市府"],
	"academy" : ["學院", "學院"],
	"port" : ["港口", "港口"],
	"shipyard" : ["船塢", "船塢"],
	"warehouse" : ["倉庫", "倉庫"],
	"wall" : ["城牆", "城牆"],
	"tavern" : ["酒館", "酒館"],
	"museum" : ["博物館", "博物"],
	"palace" : ["皇宫", "皇宫"],
	"palaceColony" : ["總督府", "總督"],
	"embassy" : ["大使館", "使館"],
	"branchOffice" : ["市場", "市場"],
	"safehouse" : ["間諜小屋", "間諜"],
	"barracks" : ["兵營", "兵營"],
	"workshop" : ["兵工廠", "兵廠"],
	"carpentering" : ["木匠屋", "木－"],
	"forester" : ["林務官宅", "木＋"],
	"stonemason" : ["石匠屋", "石＋"],
	"glassblowing" : ["玻璃吹制廠", "晶＋"],
	"winegrower" : ["葡萄樹園", "葡＋"],
	"alchemist" : ["煉金塔", "硫＋"],
	"architect" : ["建築公署", "石－"],
	"optician" : ["配鏡商館", "晶－"],
	"vineyard" : ["藏酒窖", "葡－"],
	"fireworker" : ["煙火測試區域", "硫－"]
	};
	texts = {
	"cityName": "城鎮", "currentlyBuilding": "正在建造", "summary": "總計:",
	"hide_settings": "隐藏設定", "show_settings": "顯示設定",
	"Population": "人口",
	"finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易",
	"Wood": "木材", "Wine": "葡萄", "Marble": "大理石", "Crystal": "水晶", "Sulfur": "硫磺"
	}; 
} else if (language == "cn") { //chinese translation, thank Alphasong
		langtype = "";
		buildings = {
		"townHall" : ["市政厅", "市政厅"],
		"academy" : ["学院", "学院"],
		"port" : ["港口", "港口"],
		"shipyard" : ["船坞", "船坞"],
		"warehouse" : ["仓库", "仓库"],
		"wall" : ["城墙", "城墙"],
		"tavern" : ["酒馆", "酒馆"],
		"museum" : ["博物馆", "博物馆"],
		"palace" : ["皇宫", "皇宫"],
		"palaceColony" : ["总督府", "总督府"],
		"embassy" : ["使馆", "使馆"],
		"branchOffice" : ["市场", "市场"],
		"safehouse" : ["藏身处", "藏身处"],
		"barracks" : ["兵营", "兵营"],
		"workshop" : ["兵工厂", "兵工厂"],
		"carpentering" : ["木匠所", "木匠所r"],
		"forester" : ["林务官宅", "林务官宅"],
		"stonemason" : ["石匠屋", "石匠屋"],
		"glassblowing" : ["玻璃吹制厂", "玻璃吹制厂"],
		"winegrower" : ["葡萄种植园", "葡萄种植园"],
		"alchemist" : ["炼金塔", "炼金塔"],
		"architect" : ["建筑公署", "建筑公署"],
		"optician" : ["配镜商馆", "配镜商馆"],
		"vineyard" : ["藏酒窖", "藏酒窖"],
		"fireworker" : ["烟火实验场", "烟火实验场"]
		};
		texts = {
		"cityName": "城市", "currentlyBuilding": "正在建造", "summary": "总计:",
		"hide_settings": "隐藏设置", "show_settings": "显示设置",
		"Population": "人口",
		"finishedBuilding": "建造完成","Incomes":"收入","Trading":"交易",
		"Wood": "木材", "Wine": "葡萄", "Marble": "大理石", "Crystal": "水晶", "Sulfur": "硫磺"
		};
	} else if (language == "tr") { //Turkish translation, thanks to NailBey
		langtype = "";
		buildings = {
		"townHall" : ["Belediye Binasi", "Belediye Binasi"],
		"academy" : ["Akademi", "Akademi"],
		"port" : ["Ticaret Limani", "Ticaret Limani"],
		"shipyard" : ["Donanma Tershanesi", "Donanma Tershanesi"],
		"warehouse" : ["Depo", "Depo"],
		"wall" : ["Sur", "Sur"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Muze", "Muze"],
		"palace" : ["Saray", "Saray"],
		"palaceColony" : ["Vali Konagi", "Vali Konagi"],
		"embassy" : ["Buyukelcilik", "Buyukelcilik"],
		"branchOffice" : ["Ticaret Merkezi", "Ticaret Merkezi"],
		"safehouse" : ["Istihbarat Merkezi", "Istihbarat Merkezi"],
		"barracks" : ["Kisla", "Kisla"],
		"workshop" : ["Mucit Atolyesi", "Mucit Atolyesi"],
		"carpentering" : ["Marangoz Atolyesi", "Marangoz Atolyesi"],
		"forester" : ["Ormanci Kulubesi", "Ormanci Kulubesi"],
		"stonemason" : ["Mermer Atolyesi", "Mermer Atolyesi"],
		"glassblowing" : ["Cam Esya Atolyesi", "Cam Esya Atolyesi"],
		"winegrower" : ["Bag Evi", "Bag Evi"],
		"alchemist" : ["Simya Kulesi", "Simya Kulesi"],
		"architect" : ["Mimarlik Burosu", "Mimarlik Burosu"],
		"optician" : ["Optik", "Optik"],
		"vineyard" : ["Sarap Mahzeni", "Sarap Mahzeni"],
		"fireworker" : ["Fisekci", "Fisekci"]
		};
		texts = {
		"cityName": "Sehir Adi", "currentlyBuilding": "Insaa Ediliyor", "summary": "Toplam:",
		"hide_settings": "Ayarlari Gizle", "show_settings": "Ayarlari Goster",
		"Population": "Nufus","finishedBuilding": "İnsaa Bitti","Incomes":"Gelir","Trading":"Ticaret",
		"Wood": "Odun", "Wine": "Sarap", "Marble": "Mermer", "Crystal": "Kristal", "Sulfur": "Sulfur"  
		};
 } else if (language == "vn") { // Vietnamese translations, thank Gafs
	langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
       "townHall"      : ["Tòa thị chính", "Tòa T.Chính"],
      "academy"       : ["Học viện", "Học viện"],
      "port"          : ["Cảng giao dịch", "Cảng GD"],
      "shipyard"      : ["Xưởng đóng tàu", "Xưởng tàu"],
      "warehouse"     : ["Kho hàng", "Kho"],
      "wall"          : ["Tường thành", "Tường"],
      "tavern"        : ["Quán rượu", "Quán rượu"],
      "museum"        : ["Viện bảo tàng", "V.B.Tàng"],
      "palace"        : ["Cung điện", "Cung điện"],
      "palaceColony"  : ["Phủ thủ hiến", "Phủ"],
      "embassy"       : ["Tòa đại sứ", "Tòa Đ.Sứ"],
      "branchOffice"  : ["Trạm giao dịch", "Trạm GD"],
      "safehouse"     : ["Nơi ẩn náu", "Nơi ẩn náu"],
      "barracks"      : ["Trại lính", "Trại lính"],
      "workshop" 	  : ["Xưởng", "Xưởng"],
		"carpentering" : ["Thợ mộc", "Thợ mộc"],
			"forester" : ["Nhà kiểm lâm", "Kiểm lâm"],
		  "stonemason" : ["Thợ xây đá", "Thợ đá"],
		"glassblowing" : ["Người thổi thủy tinh", "Thổi TT"],
		  "winegrower" : ["Máy ép nho", "Ép nho"],
		   "alchemist" : ["Giả kim", "Giả kim"],
		   "architect" : ["Tòa kiến trúc", "Kiến trúc"],
			"optician" : ["Thợ kính", "Thợ kính"],
			"vineyard" : ["Vườn nho", "V.Nho"],
		  "fireworker" : ["Thử thuốc súng", "Thuốc súng"]
    };
	texts = {
      "cityName": "Thành phố", "currentlyBuilding": "Đang xây dựng", "summary": "Tổng:",
      "hide_settings": "Ẩn thiết lập", "show_settings": "Hiển thị thiết lập",
 	  "Population": "Dân số",
	  "finishedBuilding": "Công trình hoàn tất","Incomes":"Thu nhập","Trading":"Trao đổi",
 	  "Wood": "Gỗ", "Wine": "Rượu", "Marble": "Cẩm thạch", "Crystal": "Pha lê", "Sulfur": "Lưu huỳnh"
	};
} else if (language == "es") { //Spanish translation, thanks to dragondeluz, graff86, Crom
		langtype = "";
		buildings = {
		"townHall" : ["Intendencia", "Intendencia"],
		"academy" : ["Academia", "Academia"],
		"port" : ["Puerto comercial", "Puerto"],
		"shipyard" : ["Astillero", "Astillero"],
		"warehouse" : ["Depósito", "Depósito"],
		"wall" : ["Muralla", "Muralla"],
		"tavern" : ["Taberna", "Taberna"],
		"museum" : ["Museo", "Museo"],
		"palace" : ["Palacio", "Palacio"],
		"palaceColony" : ["Residencia del Gobernador", "Residencia"],
		"embassy" : ["Embajada", "Embajada"],
		"branchOffice" : ["Tienda", "Tienda"],
		"safehouse" : ["Escondite", "Escondite"],
		"barracks" : ["Cuarteles", "Cuarteles"],
		"workshop" : ["Taller de invenciones", "Taller"],
		"carpentering" : ["Carpintería", "Carpintería"],
		"forester" : ["Cabaña del guardabosques", "Cabaña"],
		"stonemason" : ["Cantero", "Cantero"],
		"glassblowing" : ["Soplador de vidrio", "Soplador"],
		"winegrower" : ["Vinicultor", "Vinicultor"],
		"alchemist" : ["Torre del Alquimista", "Alquimista"],
		"architect" : ["Oficina del Arquitecto", "Arquitecto"],
		"optician" : ["Óptico", "Óptico"],
		"vineyard" : ["Prensa de Vino", "Prensa"],
		"fireworker" : ["Área de Pruebas Pirotécnicas", "Pirotécnica"]
		};
		texts = {
		"cityName": "Nombre de la ciudad", "currentlyBuilding": "Construyendo", "summary": "Totales",
		"hide_settings": "Ocultar opciones", "show_settings": "Mostrar opciones",
		"Population": "Población",
		"finishedBuilding": "Edificios terminados","Incomes":"Ingresos","Trading":"Comercio",
		"Wood": "Madera", "Wine": "Vino", "Marble": "Mármol", "Crystal": "Cristal", "Sulfur": "Azufre"
		}; 
   } else if (language == "pl") { // thanks to Syjamek
		langtype = "";
		buildings = {
		"townHall" : ["Ratusz", "Ratusz"],
		"academy" : ["Akademia", "Akademia"],
		"port" : ["Port", "Port"],
		"shipyard" : ["Stocznia", "Stocznia"],
		"warehouse" : ["Magazyn", "Magazyn"],
		"wall" : ["Mur", "Mur"],
		"tavern" : ["Taverne", "Taverne"],
		"museum" : ["Muzeum", "Muzeum"],
		"palace" : ["Pałac", "Pałac"],
		"palaceColony" : ["Rezydencja", "Rezydencja"],
		"embassy" : ["Ambasada", "Ambasada"],
		"branchOffice" : ["Bazar", "Bazar"],
		"safehouse" : ["Kryjówka", "Kryjówka"],
		"barracks" : ["Koszary", "Koszary"],
		"workshop" : ["Warsztat", "Warsztat"],
		"carpentering" : ["Warsztat Cieśli", "Warsztat Cieśli"],
		"forester" : ["Leśniczówka", "Leśniczówka"],
		"stonemason" : ["Kamieniarz", "Kamieniarz"],
		"glassblowing" : ["Huta Szkła", "Huta Szkła"],
		"winegrower" : ["Winnica", "Winnica"],
		"alchemist" : ["Wieża Alchemika", "Wieża Alchemika"],
		"architect" : ["Biuro Architekta", "Biuro Architekta"],
		"optician" : ["Optyk", "Optyk"],
		"vineyard" : ["Winiarz", "Winiarz"],
		"fireworker" : ["Zakład Pirotechnika", "Zakład Pirotechnika"]
		};
		texts = {
		"cityName": "Nazwa", "currentlyBuilding": "W budowie", "summary": "Suma:",
		"hide_settings": "Ukryj ustawieni", "show_settings": "Pokaż ustawienia",
		"Population": "Populacja",
		"finishedBuilding": "Budowa zakończona","Incomes":"Bilans złota","Trading":"Handel",
		"Wood": "Drewno", "Wine": "Wino", "Marble": "Marmur", "Crystal": "Kryształ", "Sulfur": "Siarka"
		}; 
	} else if (language == "it") { //Italian translation, thanks to Brucee and matteo466
	langtype = "";
	buildings = {
	"townHall" : ["Municipio", "Municipio"],
	"academy" : ["Accademia", "Accademia"],
	"port" : ["Porto", "Porto"],
	"shipyard" : ["Cantiere navale", "Cantiere navale"],
	"warehouse" : ["Magazzino", "Magazzino"],
	"wall" : ["Muro", "Muro"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Museo", "Museo"],
	"palace" : ["Palazzo", "Palazzo"],
	"palaceColony" : ["Governatore", "Governatore"],
	"embassy" : ["Ambasciata", "Ambasciata"],
	"branchOffice" : ["Mercato", "Mercato"],
	"safehouse" : ["Nascondiglio", "Nascondiglio"],
	"barracks" : ["Caserma", "Caserma"],
	"workshop" : ["Officina", "Officina"],
	"carpentering" : ["Carpentiere", "Carpentiere"],
	"forester" : ["Guardaboschi", "Guardaboschi"],
	"stonemason" : ["Tagliapietre", "Tagliapietre"],
	"glassblowing" : ["Vetraio", "Vetraio"],
	"winegrower" : ["Viticoltore", "Viticoltore"],
	"alchemist" : ["Alchimista", "Alchimista"],
	"architect" : ["Architetto", "Architetto"],
	"optician" : ["Ottico", "Ottico"],
	"vineyard" : ["Cantina", "Cantina"],
	"fireworker" : ["Pirotecnico", "Pirotecnico"]
	};
	texts = {
	"cityName": "Città", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:",
	"hide_settings": "Nascondi opzioni", "show_settings": "Mostra opzioni",
	"Population": "Popolazione",
	  "finishedBuilding": "Costruzione completata","Incomes":"Saldo oro","Trading":"Trading",
	"Wood": "Legno", "Wine": "Vino", "Marble": "Marmo", "Crystal": "Cristallo", "Sulfur": "Zolfo"
	};
  } else if (language == "pt") { //Portuguese translation, thanks to alpha tester & Mr. Burns
   langtype = "";
   buildings = {
      "townHall"      : ["Câmara Municipal", "Câmara Municipal"],
      "academy"       : ["Academia", "Academia"],
      "port"          : ["Porto Mercantil", "Porto"],
      "shipyard"      : ["Estaleiro", "Estaleiro"],
      "warehouse"     : ["Armazém", "Armazém"],
      "wall"          : ["Muralha", "Muralha"],
      "tavern"        : ["Taberna", "Taberna"],
      "museum"        : ["Museu", "Museu"],
      "palace"        : ["Palácio", "Palácio"],
      "palaceColony"  : ["Residencia do Governador", "Governador"],
      "embassy"       : ["Embaixada", "Embaixada"],
      "branchOffice"  : ["Mercado", "Mercado"],
      "safehouse"     : ["Espionagem", "Espionagem"],
      "barracks"      : ["Quartel", "Quartel"],
      "workshop" : ["Oficina", "Oficina"],
 		"carpentering" : ["Carpintaria", "Carpintaria"],
			"forester" : ["Guarda Florestal", "Florestal"],
		  "stonemason" : ["Pedreiro", "Pedreiro"],
		"glassblowing" : ["Fábrica de Vidro", "Vidro"],
		  "winegrower" : ["Viticultor", "Viticultor"],
		   "alchemist" : ["Torre do Alquimista", "Alquimista"],
		   "architect" : ["Atelier de Arquitectura", "Arquitectura"],
			"optician" : ["Oculista", "Oculista"],
			"vineyard" : ["Caves de Vinho", "Caves"],
		  "fireworker" : ["Fábrica de Pirotecnia", "Pirotecnia"]
   };
    texts = {
      "cityName": "Cidades", "currentlyBuilding": "Em Construçao", "summary": "Sumário:",
      "hide_settings": "Ocultar Configuraçoes", "show_settings": "Ver Configuraçoes",
  	  "Population": "População",
	  "finishedBuilding": "Finished building","Incomes":"Rendimento","Trading":"Trading",
 	  "Wood": "Madeira", "Wine": "Vinho", "Marble": "Mármore", "Crystal": "Cristal", "Sulfur": "Enxofre"
  };
  } else if (language == "fr") { //French translation, thanks to Chirel
  langtype = "";
    buildings = {
      "townHall"      : ["Hôtel de ville", "HdV"],
      "academy"       : ["Académie", "Ac."],
      "port"          : ["Port commercial", "Port"],
      "shipyard"      : ["Chantier naval", "Chtr"],
      "warehouse"     : ["Entrepôt", "Entp"],
      "wall"          : ["Mur d'enceinte", "Mur"],
      "tavern"        : ["Taverne", "Tvrn"],
      "museum"        : ["Musée", "Msé"],
      "palace"        : ["Palais", "Plais"],
      "palaceColony"  : ["Résidence du Gouverneur", "RdG"],
      "embassy"       : ["Ambassade", "Amb."],
      "branchOffice"  : ["Comptoir", "Cptr"],
      "safehouse"     : ["Cachette", "Ccht"],
      "barracks"      : ["Caserne", "Csrn"],
      "workshop" 	  : ["Atelier", "Atlr"],
	   "carpentering" : ["Menuisier","Men."],
		   "forester" : ["Maison forestière","Frst"],
		 "stonemason" : ["Tailleur de pierres","Tail."],
	   "glassblowing" : ["Verrier","Vrr"],
			"winegrower" : ["Pressoir à vin","Prsr"],
		   "alchemist" : ["Tour des alchimistes","Alch."],
		   "architect" : ["Bureau de l`architecte","Arch."],
			"optician" : ["Opticien","Opt."],
		  "vineyard" : ["Cave à vin","Cave"],
		  "fireworker" : ["Zone de test des artificiers","Artf"]
    };
    texts = {
      "cityName": "Villes", "currentlyBuilding": "Construction en cours", "summary": "Total:",
      "hide_settings": "Cacher les options", "show_settings": "Voir les options",
	  "Population": "Population",
	  "finishedBuilding": "Construction terminée","Incomes":"Revenus","Trading":"Commerce",
	  "Wood": "Bois", "Wine": "Vin", "Marble": "Marbre", "Crystal": "Cristal", "Sulfur": "Soufre"
    };
} else if (language == "il") { //hebrew translation, thank Refael Ackermann
	langtype = "rf";
	buildings = {
		"townHall"      : ["עיריה", "עיריה"],
		"academy"       : ["אקדמיה", "אקדמיה"],
		"port"          : ["נמל מסחר", "נמל"],
		"shipyard"      : ["מספנה", "מספנה"],
		"warehouse"     : ["מחסן", "מחסן"],
		"wall"          : ["חומה", "חומה"],
		"tavern"        : ["פונדק", "פונדק"],
		"museum"        : ["מוזאון", "מוזאון"],
		"palace"        : ["ארמון", "ארמון"],
		"palaceColony"  : ["מגורי המושל", "מושל"],
		"embassy"       : ["שגרירות", "שגרירות"],
		"branchOffice"  : ["תחנת סחר", "סחר"],
		"safehouse"     : ["מחבוא", "מחבוא"],
		"barracks"      : ["מגורי חיילים", "חיילים"],
		"workshop"      : ["סדנא", "סדנא"],
		"carpentering"  : ["נגר", "נגר"],
		"forester"      : ["יערן", "יערן"],
		"stonemason"    : ["חרש אבן", "אבן"],
		"glassblowing"  : ["נפח זכוכית", "זכוכית"],
		"winegrower"    : ["יינן", "יינן"],
		"alchemist"     : ["אלכימאי", "אלכימאי"],
		"architect"     : ["ארכיטקט", "ארכיטקט"],
		"optician"      : ["אופטיקאי", "אופטיקאי"],
		"vineyard"      : ["יקב", "יקב"],
		"fireworker"    : ["זיקוקים", "זיקוקים"]
	};
	texts = {
		"cityName": "שם עיר", "currentlyBuilding": "בבניה", "summary": "סיכום:",
		"hide_settings": "הסתר אפשרויות", "show_settings": "הצג אפשרויות",
		"Population": "אוכלוסיה",
		"finishedBuilding": "הסתימה בניה","Incomes":"הכנסה","Trading":"סוחר",
		"Wood": "עץ", "Wine": "יין", "Marble": "שיש", "Crystal": "קריסטל", "Sulfur": "גופרית"
	};
} else if ((language == "ae") || (language == "eg") || (language == "sa")) { //by wa7d beta server - kuwaitv@gmail.com
		langtype = "rf";
		buildings = {
		"townHall" : ["البلدية", "البلدية"],
		"academy" : ["الاكاديمية", "الاكاديمية"],
		"port" : ["المرفأ", "المرفأ"],
		"shipyard" : ["حوض السفن", "حوض السفن"],
		"warehouse" : ["المخزن", "المخزن"],
		"wall" : ["السور", "السور"],
		"tavern" : ["الاستراحة", "الاستراحة"],
		"museum" : ["المتحف", "المتحف"],
		"palace" : ["القصر", "القصر"],
		"palaceColony" : ["قائم مقام", "قائم مقام"],
		"embassy" : ["السفارة", "السفارة"],
		"branchOffice" : ["السوق", "السوق"],
		"safehouse" : ["المخبأ", "المخبأ"],
		"barracks" : ["الثكنة", "الثكنة"],
		"workshop" : ["المختبر", "المختبر"],
		"carpentering" : ["الحطاب", "الحطاب"],
		"forester" : ["حارس الغابات", "حارس الغابات"],
		"stonemason" : ["الحجار", "الحجار"],
		"glassblowing" : ["نافخ الزجاج", "نافخ الزجاج"],
		"winegrower" : ["مزارع العنب", "مزارع العنب"],
		"alchemist" : ["الكيمائي", "الكيمائي"],
		"architect" : ["المعماري", "المعماري"],
		"optician" : ["صانع العدسات", "صانع العدسات"],
		"vineyard" : ["مزرعة العنب", "مزرعة العنب"],
		"fireworker" : ["عامل النار", "عامل النار"]
		};
		texts = {
		"cityName": "المدينة", "currentlyBuilding": "أعمال بناء", "summary": "الإجمالي:",
		"hide_settings": "إخفاء الخيارات", "show_settings": "إظهار الخيارات",
		"Population": "السكان",
	    "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
		"Wood": "الخشب", "Wine": "العنب", "Marble": "الرخام", "Crystal": "البلور", "Sulfur": "الكبريت"
		};
  } else if (language == 'hu') { // Thank Luzer
    langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
      "townHall"      : ["Városháza", "Városháza"],
      "academy"       : ["Akadémia", "Akadémia"],
      "port"          : ["Kikötő", "Kikötő"],
      "shipyard"      : ["Hajógyár", "Hajógyár"],
      "warehouse"     : ["Raktár", "Raktár"],
      "wall"          : ["Városfal", "Fal"],
      "tavern"        : ["Fogadó", "Fogadó"],
      "museum"        : ["Múzeum", "Múzeum"],
      "palace"        : ["Palota", "Palota"],
      "palaceColony"  : ["Helytartó", "Helytartó"],
      "embassy"       : ["Nagykövetség", "Nagykövetség"],
      "branchOffice"  : ["Kereskedő", "Kereskedő"],
      "safehouse"     : ["Rejtekhely", "Rejtekhely"],
      "barracks"      : ["Barakk", "Barakk"],
      "workshop"		  : ["Műhely", "Műhely"],
		"carpentering" : ["Ácsmester", "Ácsmester"],
			"forester" : ["Erdész", "Erdész"],
		  "stonemason" : ["Kőműves", "Kőműves"],
		"glassblowing" : ["Üvegfúvó", "Üvegfúvó"],
		  "winegrower" : ["Bortermelő", "Bortermelő"],
		   "alchemist" : ["Alkimista", "Alkimista"],
		   "architect" : ["Építész", "Építész"],
			"optician" : ["Optikus", "Optikus"],
			"vineyard" : ["Szőlőprés", "Szőlőprés"],
		  "fireworker" : ["Tűzszerész", "Tűzszerész"]
    };
    texts = {
      "cityName": "Város neve", "currentlyBuilding": "Építés alatt", "summary": "Összesen:",
      "hide_settings": "Beállítások elrejtése", "show_settings": "Beállítások megtekintése",
 	  "Population": "Lakosság",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Építőanyag", "Wine": "Bor", "Marble": "Márvány", "Crystal": "Kristály", "Sulfur": "Kénpor"
	};
} else if (language == "ro") { //Romanian translation, thanks to Peta
	langtype = "";
	buildings = {
	"townHall" : ["Primarie", "Primarie"],
	"academy" : ["Academie", "Academie"],
	"port" : ["Port", "Port"],
	"shipyard" : ["Santier Naval", "S.Naval"],
	"warehouse" : ["Depozit", "Depozit"],
	"wall" : ["Zid", "Zid"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Muzeu", "Muzeu"],
	"palace" : ["Palat", "Palat"],
	"palaceColony" : ["Resedinta Guvernatorului", "R.Guv."],
	"embassy" : ["Ambasada", "Ambasada"],
	"branchOffice" : ["Punct de negot", "Piata"],
	"safehouse" : ["Ascunzatoare", "Ascunzatoare"],
	"barracks" : ["Baraca", "Baraca"],
	"workshop" : ["Atelier", "Atelier"],
	"carpentering" : ["Dulgher", "Dulgher"],
	"forester" : ["Casa Padurarului", "Padurar"],
	"stonemason" : ["Cariera", "Cariera"],
	"glassblowing" : ["Sticlarie", "Sticlarie"],
	"winegrower" : ["Vinificator", "Vinificator"],
	"alchemist" : ["Turnul Alchimistului", "Alchimist"],
	"architect" : ["Biroul Arhitectului", "Architect"],
	"optician" : ["Optician", "Optician"],
	"vineyard" : ["Presa de Vin", "Presa Vin"],
	"fireworker" : ["Zona Pirotehnica de Test", "Poligon"]
	};
	texts = {
	"cityName": "Nume Oras", "currentlyBuilding": "In constructie", "summary": "Total:",
	"hide_settings": "Ascunde Setari", "show_settings": "Arata Setari",
	"Population": "Populatie",
	"finishedBuilding": "Constructie Finalizata","Incomes":"Economii","Trading":"Comert",
	"Wood": "Lemn", "Wine": "Vin", "Marble": "Marmura", "Crystal": "Cristal", "Sulfur": "Sulf"
	};
} else if (language == "cz") { //Czech translation , thank Tetraedron, Assassin
  langtype = "";
  buildings = {
    "townHall"     : ["Městská radnice", "Radnice"],
    "academy"      : ["Akademie", "Akademie"],
    "port"         : ["Obchodní přístav", "Přístav"],
    "shipyard"     : ["Loděnice", "Loděnice"],
    "warehouse"    : ["Sklad", "Sklad"],
    "wall"         : ["Městská zeď", "Zeď"],
    "tavern"       : ["Hostinec", "Hostinec"],
    "museum"       : ["Muzeum", "Muzeum"],
    "palace"       : ["Palác", "Palác"],
    "palaceColony" : ["Guvernérova rezidence", "Guvernér"],
    "embassy"      : ["Ambasáda", "Ambasáda"],
    "branchOffice" : ["Tržiště", "Tržiště"],
    "safehouse"    : ["Úkryt", "Úkryt"],
    "barracks"     : ["Kasárna", "Kasárna"],
    "workshop"     : ["Dílna", "Dílna"],
    "carpentering" : ["Truhlárna", "Truhlárna"],
    "forester"     : ["Hájovna", "Hájovna"],
    "stonemason"   : ["Kameník", "Kameník"],
    "glassblowing" : ["Sklárna", "Sklárna"],
    "winegrower"   : ["Vinařství", "Vinařství"],
    "alchemist"    : ["Věž alchymisty", "Věž alchymisty"],
    "architect"    : ["Pracovna architekta", "Architekt"],
    "optician"     : ["Optik", "Optik"],
    "vineyard"     : ["Vinný sklep", "Vinný sklep"],
    "fireworker"   : ["Zkušebna ohňostroje", "Zkušebna ohňostroje"]
  };
  texts = {
    "cityName"          : "Město",
    "currentlyBuilding" : "Staví se",
    "summary"           : "Celkem:",
    "hide_settings"     : "Skrýt nastavení",
    "show_settings"     : "Ukázat nastavení",
    "Population"        : "Populace",
    "finishedBuilding"  : "Dokončené stavby",
    "Incomes"           : "Příjmy",
    "Trading"           : "Obchod",
    "Wood"              : "Dřevo",
    "Wine"              : "Víno",
    "Marble"            : "Mramor",
    "Crystal"           : "Sklo",
    "Sulfur"            : "Síra"
  };
} else if (language == "ru") { //russian translation by Mugivara
	langtype = "";
	buildings = {
	"townHall" : ["Ратуша", "Ратуша"],
	"academy" : ["Академия", "Академия"],
	"port" : ["Торговый порт", "Порт"],
	"shipyard" : ["Верфь", "Верфь"],
	"warehouse" : ["Склад", "Склад"],
	"wall" : ["Стена", "Стена"],
	"tavern" : ["Таверна", "Таверна"],
	"museum" : ["Музей", "Музей"],
	"palace" : ["Дворец", "Дворец"],
	"palaceColony" : ["Резиденция губернатора", "Резиденция"],
	"embassy" : ["Посольство", "Посольство"],
	"branchOffice" : ["Торговый пост", "Пост"],
	"safehouse" : ["Укрытие", "Укрытие"],
	"barracks" : ["Казарма", "Казарма"],
	"workshop" : ["Мастерская", "Мастерская"],
	"carpentering" : ["Плотницкая мастерская", "Плотник"],
	"forester" : ["Хижина леничего", "Лесничий"],
	"stonemason" : ["Каменоломня", "Каменоломня"],
	"glassblowing" : ["Стеклодувная мастерская", "Стеклодув"],
	"winegrower" : ["Винодельня", "Винодельня"],
	"alchemist" : ["Башня алхимика", "Алхимик"],
	"architect" : ["Бюро архитектора", "Архитектор"],
	"optician" : ["Оптика", "Оптика"],
	"vineyard" : ["Винный погреб", "Погреб"],
	"fireworker" : ["Полигон пиротехника", "Полигон"]
	};
	texts = {
	"cityName": "Название города", "currentlyBuilding": "Текущее строительство", "summary": "Итого:",
	"hide_settings": "Скрыть настройки", "show_settings": "Показать	настройки",
	"Population": "Население",
	"finishedBuilding": "Строительство закончено","Incomes":"Баланс","Trading":"Торговля",
	"Wood": "Стройматериалы", "Wine": "Виноград", "Marble": "Мрамор",
	"Crystal": "Хрусталь", "Sulfur": "Сера"
	};
} else if (language == "nl") { //Dutch translation, thanks to cremers
	langtype = "";
	buildings = {
	"townHall" : ["Stadhuis", "Stadhuis"],
	"academy" : ["Academie", "Academie"],
	"port" : ["Handelshaven", "Haven"],
	"shipyard" : ["Scheepswerf", "Werf"],
	"warehouse" : ["Opslagplaats", "Opslagplaats"],
	"wall" : ["Stadsmuur", "Muur"],
	"tavern" : ["Taverne", "Taverne"],
	"museum" : ["Museum", "Museum"],
	"palace" : ["Paleis", "Paleis"],
	"palaceColony" : ["Gouverneurswoning", "Gouverneurswoning"],
	"embassy" : ["Ambassade", "Ambassade"],
	"branchOffice" : ["Handelspost", "Handelspost"],
	"safehouse" : ["Schuilplaats", "Schuilplaats"],
	"barracks" : ["Barakken", "Barakken"],
	"workshop" : ["Werkplaats", "Werkplaats"],
	"carpentering" : ["Timmerman", "Timmerman"],
	"forester" : ["Houthakkers Loge", "Houthakkers Loge"],
	"stonemason" : ["Steenhouwer", "Steenhouwer"],
	"glassblowing" : ["Glasblazer", "Glasblazer"],
	"winegrower" : ["Wijnboer", "Wijnboer"],
	"alchemist" : ["De Alchemie Toren", "De Alchemie Toren"],
	"architect" : ["Architectenbureau", "Architectenburea"],
	"optician" : ["Opticien", "Opticien"],
	"vineyard" : ["Wijnpers", "Wijnpers"],
	"fireworker" : ["Vuurwerk Opslag", "Vuurwerk Opslag"]
	};
	texts = {
	"cityName": "Stadsnaam", "currentlyBuilding": "Huidige constructie", "summary": "Opgeteld:",
	"hide_settings": "Verberg instellingen", "show_settings": "Instellingen",
	"Population": "Inwoners", "finishedBuilding": "Klaar","Incomes":"Inkomsten","Trading":"Handel",
	"Wood": "Hout", "Wine": "Wijn", "Marble": "Marmer", "Crystal": "Glas", "Sulfur": "Zwavel"
	}; 
} else if (language == "gr") { //greek translation, thanks to panospap
	langtype = "";
	buildings = {
	"townHall" : ["Δημαρχείο", "Δημαρχείο"],
	"academy" : ["Ακαδημία", "Ακαδημία"],
	"port" : ["Εμπορικός λιμένας", "Εμπορικός λιμένας"],
	"shipyard" : ["Ναυπηγείο", "Ναυπηγείο"],
	"warehouse" : ["Αποθήκη εμπορευμάτων", "Αποθήκη"],
	"wall" : ["Τείχη της πόλης", "Τείχος"],
	"tavern" : ["Ταβέρνα", "Ταβέρνα"],
	"museum" : ["Μουσείο", "Μουσείο"],
	"palace" : ["Παλάτι", "Παλάτι"],
	"palaceColony" : ["Η Κατοικία του Κυβερνήτη", "Κυβερνήτης"],
	"embassy" : ["Πρεσβεία", "Πρεσβεία"],
	"branchOffice" : ["Θέση εμπορικών συναλλαγών", "Εμπορικές συναλλαγές"],
	"safehouse" : ["Κρησφύγετο", "Κρησφύγετο"],
	"barracks" : ["Στρατώνες", "Στρατώνες"],
	"workshop" : ["Εργαστήριο", "Εργαστήριο"],
	"carpentering" : ["Ξυλουργός", "Ξυλουργός"],
	"forester" : ["Σπίτι Ξυλοκόπου", "Ξυλοκόπος"],
	"stonemason" : ["Κτίριο Λατομείου", "Κτίριο Λατομείου"],
	"glassblowing" : ["Υαλουργείο", "Υαλουργείο"],
	"winegrower" : ["Αποστακτήριο", "Αποστακτήριο"],
	"alchemist" : ["Πύργος Αλχημιστή", "Πύργος Αλχημιστή"],
	"architect" : ["Αρχιτεκτονικό Γραφείο", "Αρχιτέκτονας"],
	"optician" : ["Οπτικός", "Οπτικός"],
	"vineyard" : ["Πιεστήριο Σταφυλιού", "Πιεστήριο Σταφυλιού"],
	"fireworker" : ["Περιοχή Δοκιμών Πυροτεχνημάτων", "Δοκιμή Πυροτεχνημάτων"]
	};
	texts = {
	"cityName": "Όνομα πόλης", "currentlyBuilding": "Αυτήν την περίοδο χτίζετε", "summary": "Σύνολο:",
	"hide_settings": "Κρύψε ρυθμίσεις", "show_settings": "Εμφάνισε ρυθμίσεις",
	"Population": "Πληθυσμός",
	"finishedBuilding": "Τελειωμένο κτίριο","Incomes":"Εισοδήματα","Trading":"Εμπόριο",
	"Wood": "Ξύλα", "Wine": "Κρασί", "Marble": "Μάρμαρο", "Crystal": "Κρύσταλλο", "Sulfur": "Θείο"
	};
  } else {
    langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
      "townHall"      : ["Градска кућа", "Градска кућа"],
    "academy"       : ["Академија", "Академија"],
    "port"          : ["Трговачка лука", "Трговачка лука"],
    "shipyard"      : ["Бродоградилиште", "Бродоградилиште"],
    "warehouse"     : ["Складиште", "Складиште"],
    "wall"          : ["Градски зид", "Градски зид"],
    "tavern"        : ["Крчма", "Крчма"],
    "museum"        : ["Музеј", "Музеј"],
    "palace"        : ["Палата", "Палата"],
    "palaceColony"  : ["Гувернерова резиденција", "Гувернерова резиденција"],
    "embassy"       : ["Амбасада", "Амбасада"],
    "branchOffice"  : ["Трговина", "Трговина"],
    "safehouse"     : ["Скровиште", "Скровиште"],
    "barracks"      : ["Бараке", "Бараке"],
    "workshop"      : ["Радионица", "Радионица"],
    "carpentering"  : ["Тесар", "Тесар"],
    "forester"      : ["Шумарова кућа", "Шумарова кућа"],
    "stonemason"    : ["Зидар", "Зидар"],
    "glassblowing"  : ["Стаклара", "Стаклара"],
    "winegrower"    : ["Виноградар", "Виноградар"],
    "alchemist"     : ["Алхемичарев торањ", "Алхемичарев торањ"],
    "architect"     : ["Архитектонска канцеларија", "Архитектонска канцеларија"],
    "optician"      : ["Оптичар", "Оптичар"],
    "vineyard"      : ["Винска преса", "Винска преса"],
    "fireworker"    : ["Ватромет", "Ватромет"]
  };
  texts = {
	"cityName": "Име града", "currentlyBuilding": "Тренутно се гради", "summary": "Сума:",
	"hide_settings": "Скривене опције", "show_settings": "Покажи опције",
	"Population": "Становништво",
	"finishedBuilding": "Граднја завршена","Incomes":"Приход","Trading":"Трговина",
	"Wood": "Дрва", "Wine": "Вино", "Marble": "Мермер", "Crystal": "Кристал", "Sulfur": "Сумпор"
	};
  }
}
getLocalizedTexts();

//lots of code to get the city id. The code trys to find the city id no matter which "city dropdown view" the user has chosen.
// Fix for v3.1
var city_id = getIntValue(getNode_value("//select[@id='citySelect']/option[@selected='selected']"), 0);

var current_city_id = city_id;
GM_log('current_city_id = '+current_city_id);

var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");
GM_log('city_name = "'+city_name+'"');
if (city_name != undefined)
	{
	var island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");
	if ( island_id == undefined || island_id == 0 )
	    island_id = /\[[0-9:]+\]/.exec(getNode("id('breadcrumbs')//a[contains(@href,'view=island')]").innerHTML)[0];
	// Fix for v3.1
	var city_idmainView = getNode_value("//select[@id='citySelect']/option[text()='"+TrimIsland100(island_id)+" "+city_name+"']", 0);
	if (city_idmainView == 0)
		{
		city_idmainView = getNode_value("//select[@id='citySelect']/option[text()='"+city_name+"']", 0);
		}
	GM_log('city_idmainView = '+city_idmainView);
	var city_positionmainView = -1;

	var a = getNode("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", "");
	if (a == null) {
	  a = getNode("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", "");
	  if (a != null) {
	    a = a.parentNode;
	  }
	}
	var city_coord = "";
	var island_id = "";
	if (a != null) {
	  if (/(\[[0-9:]+\])/.exec(a.innerHTML)) {
	    city_coord = RegExp.$1;
	    if (/[?&]id=([0-9]+)/.exec(a.href) != null) {
	      island_id = RegExp.$1;
	    }
	  }
	}
	if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) { 
	  island_id = RegExp.$1;
	}
	}
else
	{
	city_idmainView = 0;
	city_name = '';
	city_coord = '';
	island_id = '';
	}

function getVar(varname, vardefault) {
  var res = GM_getValue(server+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}
function setVar(varname, varvalue) {
  GM_setValue(server+varname, varvalue);
}
function getCity(city_id) {
  city_id = "city_"+city_id;
  if (config[city_id] == undefined) {
    config[city_id] = new Resource();
  }
  return config[city_id];
}

function getCityTime(city_id)
	{
	var city = getCity(city_id);
	
	if (city.prodtime == undefined)
		{
		return 0;
		}
	else
		{
		return city.prodtime;
		}
	}

function getPath(node) {
  if (node == null || node == undefined) {
    return "/";
  }
  return getPath(node.parentNode) + "/" + node.nodeName + "["+node.id+"]";
}
function getNode(path) {
  var value = xpath(path);
  if (value.snapshotLength == 1) {
    return value.snapshotItem(0);
  }
  return null;
}
//get node's textContent
function getNodeValue(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.textContent;
  }
  return defaultValue;
}
//get node's value attribute
function getNode_value(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.value;
  }
  return defaultValue;
}
//get node's title attribute
function getNodeTitle(path, defaultValue) {
  var value = getNode(path);
  // Fix for v3
  if ((value != null) && (value.title != '')) {
    return value.title;
  } else return defaultValue;
}
//support negative value
function getIntValue(str, defaultValue) {
  var temp = ""+str;
  temp = temp.replace(/[^-0-9]+/g, "");
  temp = parseInt(temp);
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
    return defaultValue;
  }
  return temp;
}

function mynumberformat(num, alwaysShowSign) {
  var s = ""+num;
  if (num == undefined || s == "NaN") {
    return "-";
  }
  if (num == "?") {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-") {
    negative = "-";
    s = s.substring(1);
  } else if (alwaysShowSign == true) {
    negative = "+";
  }
  var i = s.length-3;
  while (i > 0) {
    s = s.substring(0, i) + "." + s.substring(i);
    i -= 3;
  }
  return negative + s;
}

var _cachedDecimalPoint = undefined;
function getDecimalPoint() { //hack
  if (_cachedDecimalPoint == undefined) {
    _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
    if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "") {
      _cachedDecimalPoint = ",";
    }
  }
  return _cachedDecimalPoint;
}

function floatFormat(num, fracdigits, alwaysShowSign) {
  var s = ""+num;
  if (num == "?") {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-") {
    negative = "-";
    s = s.substring(1);
  } else if (alwaysShowSign == true) {
    negative = "+";
  }
  var p = s.indexOf(".");
  if (p >= 0) {
    var i = s.substring(0, p);
    var frac = s.substring(p + 1, p + 1 + fracdigits);
    while (frac.length < fracdigits) {
      frac += "0";
    }
    s = i + getDecimalPoint() + frac;
  }
  return negative + s;
}

function digProducedResources(res) {
        var scripts = document.getElementsByTagName("script");
		var found = false;
		for (var j = scripts.length-1; j >= 0; j--)
			{
			var nScript = scripts[j];
			var sCode = nScript.innerHTML;
			if (sCode.indexOf('getResourceCounter') > 0)
				{
				found = true;
				break;
				}
			}
        if (found == false)
			{
			return;
			}
      
        var aCodeLines = sCode.split(';');
        if (aCodeLines.length < 24)
			{
			return;
			}
			
        var sWood = aCodeLines[24].substring(aCodeLines[24].indexOf('(')+2,aCodeLines[24].indexOf(')')-1);
        var startResourcesDelta = /production: *([0-9.]+)/.exec(sWood);
        if (startResourcesDelta != null) {
          startResourcesDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startResourcesDelta = 0;
        }
        var sTradeGood = aCodeLines[27].substring(aCodeLines[27].indexOf('(')+2,aCodeLines[27].indexOf(')')-1);
        var startTradegoodDelta = /production: *([0-9.]+)/.exec(sTradeGood);
        if (startTradegoodDelta != null) {
          startTradegoodDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startTradegoodDelta = 0;
        }
      
        var sName = /valueElem: *\"(.*)\"/.exec(sTradeGood);
        var sTradeGoodName = sName[1];
      
        res.prodwood = startResourcesDelta;
        res.prodwine = 0;
        res.prodmarble = 0;
        res.prodglass = 0;
        res.prodsulfur = 0;
        res.prodtime = EmpireBoard.StartTime; 
        if (sTradeGoodName == "value_wine") {
          res.prodwine = startTradegoodDelta;
		  res.prodgood = 'wine';
        } else if (sTradeGoodName == "value_marble") {
          res.prodmarble = startTradegoodDelta;
		  res.prodgood = 'marble';
        } else if (sTradeGoodName == "value_crystal") {
          res.prodglass = startTradegoodDelta;
		  res.prodgood = 'glass';
        } else if (sTradeGoodName == "value_sulfur") {
          res.prodsulfur = startTradegoodDelta;
		  res.prodgood = 'sulfur';
        }
      }

function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) {
  var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;
  return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));
}

function realtimeFactDisplayF() {
  var currenttime = new Date().getTime();
  var counters = xpath("//font[contains(@id, 'myresourcecounter')]");
  for(var i=0; i < counters.snapshotLength; i++) {
    var c = counters.snapshotItem(i);
    if (c.color != "#ff0000") {
      var arr = c.getAttribute('counter').split(",");
      var startTime = arr[0];
      var startAmount = parseFloat(arr[1]);
      var factPerHour = parseFloat(arr[2]);
	  var maxAmount = arr[3];
	  
	  var currAmount = getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour);
	  
	  if ((maxAmount != '-') && (currAmount >= maxAmount))
		{
		c.innerHTML = mynumberformat(maxAmount);
		c.color = "#ff0000";
		}
	  else
		{
		c.innerHTML = mynumberformat(currAmount);
		}
    }
  }
  return (counters.snapshotLength > 0);
}

function createTooltipAttribute(tooltip, title, isFct) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  if (isFct == true)
	{
	html = tooltip;
	}
  else
	{
	  if (title == undefined || title == "") {
	  	  title = "";
	  }
	  else title = "<div class=TTTitle>"+title+"</div>";
	  if (langtype == "rf")
		{
		var html = "<div dir=rtl class='TTContent RtoL'>"+title+tooltip+"</div>";
		}
	  else
		{
		var html = "<div class=TTContent>"+title+tooltip+"</div>";
		}
	  html = "'"+html.replace(/'/g, "\\'")+"'";
	}
  return "onmouseover=\"Tip("+html+", ABOVE, true, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '');\"";
}

function createTooltip(content, tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
}

function createResCounter(startTime, startAmount, factPerHour, showTooltip, maxAmount, tradeAmount, secureAmount)
	{
	if (tradeAmount == undefined) tradeAmount = 0;
	if ((maxAmount == undefined) || (maxAmount == '-'))
		{
		maxAmount = '-';
		}
	else
		{
		maxAmount = maxAmount - tradeAmount;
		}
	var currAmount = startAmount;
	var tooltip = "";
	var res;
	
	if ((startAmount == undefined) || (startAmount+"" == "NaN"))
		{
		res = '?';
		}
	else if ((factPerHour != undefined) && (factPerHour+"" != "NaN") && (factPerHour != 0))
		{
		var counterClass = '';
		var intfactPerHour = Math.round(factPerHour);
		var dailyFact = Math.round(24 * factPerHour);
		if (startTime != undefined)
			{
			currAmount = getCurrentResourceAmount(EmpireBoard.StartTime, startTime, startAmount, intfactPerHour);

		    if (intfactPerHour > 0) counterClass = 'Bold';
			if ((intfactPerHour < 0) && (currAmount+(24*intfactPerHour) <= 0)) counterClass = 'Red';
		    res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+intfactPerHour+","+maxAmount+"' class='"+counterClass+"'>"+mynumberformat(currAmount)+"</font>";
			}
		
		if (showTooltip == true) 
			{
		    tooltip = mynumberformat(intfactPerHour, true)+"/h<br> "+mynumberformat(dailyFact, true)+"/d";
			if (intfactPerHour < 0) tooltip += "<br>&nbsp;" + floatFormat(-1 * currAmount / intfactPerHour, 1) + "h";
			}
		}
	else
		{
		res = mynumberformat(currAmount);
		}
		
	// Safety goods ?
	if ((secureAmount > 0) && (secureAmount >= currAmount))
		{
		res = '<img src="skin/layout/icon-wall.gif" class="Safe" title="Safety resources"/> '+res;
		}
		
	if (tooltip != '') res = createTooltip(res, tooltip);
	return res + "&nbsp;";
	}
	
function createResProgressBar(startTime, startAmount, factPerHour, maxCapacity, secureCapacity)
	{
	  var res = '';
	  if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0) && (startTime != undefined))
		{
	    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
	    var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
	    var remaining = "";
	    var remhour = 100000000;
		if (curres >= maxCapacity)
			{
			// no more
			}
	    else if (factPerHour > 0) {
	      remhour = (maxCapacity - curres) / factPerHour;
	      remaining = "<br>"+floatFormat(remhour, 1) + "h to full";
	    } else if (factPerHour < 0) {
	      remaining = "<br>"+floatFormat(curres / -factPerHour, 1) + "h to empty";
	    }
	    var cl = "myPercentNormal";
		var vperc = perc;
		if ((curres > 0) && (vperc < 4)) vperc = 4;
	    if (PROGRESS_BAR_MODE == "percent") {
	      if (perc >= 99) {
	        cl = "myPercentFull";
	      } else if (perc >= 85) {
	        cl = "myPercentAlmostFull";
	      } else if (perc >= 80) {
	        cl = "myPercentWarning";
	      }
	    } else if (PROGRESS_BAR_MODE == "time") {
	      if (remhour == 0) {
	        cl = "myPercentFull";
	      } else if (remhour < 12) {
	        cl = "myPercentAlmostFull";
	      } else if (remhour < 24) {
	        cl = "myPercentWarning";
	      }
	    }
	    res +=  "<table class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity) + " total capacity<br>"+mynumberformat(secureCapacity)+" safety capacity<br>" + perc+"% full" + remaining)+">"+
	            "<tr>"+
	            "<td width='"+vperc+"%' class='"+cl+"'></td>"+
	            "<td width='"+(100-vperc)+"%'></td>"+
	            "</tr>"+
	            "</table>";
		}
	else if (PROGRESS_BAR_MODE != "off")
		{
	    res +=  "<table class='myPercent'>"+
	            "<tr>"+
	            "<td></td>"+
	            "</tr>"+
	            "</table>";
		}
	  return res;
	}
	
function createCounter(startTime, startAmount, factPerHour, showTooltip, maxCapacity, plusText) {
  intfactPerHour = Math.round(factPerHour);
  var dailyFact = Math.round(24 * factPerHour);
  var tooltip = "";
  if ((showTooltip == true) && (dailyFact != 0)) {
    tooltip = mynumberformat(intfactPerHour, true)+" / h, "+mynumberformat(dailyFact, true)+" / d";
  }
  var res;
  if (factPerHour != 0) {
    res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";
    if (intfactPerHour > 0) {
      res = "<b>"+res+"</b>";
    }
  } else {
    res = mynumberformat(startAmount);
  }
  if (plusText != undefined) {
    res += '<br>' + plusText;
  }
  res = createTooltip(res, tooltip);
  //progress bar :)
  if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0)) {
    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
    var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
    var remaining = "";
    var remhour = 100000000;
    if (factPerHour > 0) {
      remhour = (maxCapacity - curres) / factPerHour;
      remaining = "<br>"+floatFormat(remhour, 1) + " h to full";
    } else if (factPerHour < 0) {
      remaining = "<br>"+floatFormat(curres / -factPerHour, 1) + " h to empty";
    }
    var cl = "myPercentNormal";
    if (PROGRESS_BAR_MODE == "percent") {
      if (perc == 100) {
        cl = "myPercentFull";
      } else if (perc > 95) {

        cl = "myPercentAlmostFull";
      } else if (perc > 80) {
        cl = "myPercentWarning";
      }
    } else if (PROGRESS_BAR_MODE == "time") {
      if (remhour == 0) {
        cl = "myPercentFull";
      } else if (remhour < 8) {
        cl = "myPercentAlmostFull";
      } else if (remhour < 16) {
        cl = "myPercentWarning";
      }
    } 
    res +=  "<table class='myPercent'>"+
            "<tr class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity) + " total capacity<br>" + perc+"% full" + remaining)+">"+
            "<td width='"+perc+"%' class='"+cl+"'></td>"+
            "<td width='"+(100-perc)+"%' class='myPercentRemaining'></td>"+
            "</tr>"+
            "</table>";
  }
  return res;
}

function twodigit(val) {
  val = parseInt(val);
  if (val == 0)
	{
	val = "00";
	}
  else if (val < 10)
	{
    return "0"+val;
	}
  return val;
}

function myTimeCounterF() {
  var currenttime = new Date().getTime();
  var cs = xpath("//font[contains(@id, 'mytimecounter')]");
  for (var i = 0; i < cs.snapshotLength; i++) {
    var c = cs.snapshotItem(i);
    var abstime = Math.round(c.getAttribute('counter'));
    hdata = (abstime - currenttime) / 1000;
    if (hdata > 0) {
      var hday = Math.floor(hdata / 86400);
      var hhor = Math.floor((hdata - (hday * 86400)) / 3600);
      var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);
      var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));
      var s = "";
      var b = false;
      if (b || hday > 0) { s += hday+"d "; b = true; }
      b = true; 
      if (b || hhor > 0) { s += hhor+":"; b = true; }
      if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
      if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
      c.innerHTML = s;
    } else {
      c.innerHTML = "-";
    }
  }
  //var found = realtimeFactDisplayF();
}

function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='mytimecounter' counter='"+enddate+"'></font>", s);
  }
  return "";
}

function createProd(prodPerHour, extraTooltip) {
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+"/d";
  if (extraTooltip != undefined) {
    tooltip += ", "+extraTooltip;
  }
  return createTooltip(mynumberformat(Math.round(prodPerHour), true), tooltip);
}

function createSimpleProd(prodPerHour) {
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  return mynumberformat(Math.round(prodPerHour), true);
}

function createIncome(prodPerHour, extraTooltip, classname)
	{
	if (classname == undefined) classname = '';
	if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "?" || prodPerHour == undefined || ""+prodPerHour == "???")
		{
		return "?";
		}
	else if (""+prodPerHour == "0")
		{
		return "0";
		}
	else
		{
		var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+"/d";
		if ((extraTooltip != undefined) && (extraTooltip != ''))
			{
			tooltip += "<br>&nbsp;"+extraTooltip;
			}
		return createTooltip('<span class="'+classname+'">'+mynumberformat(Math.round(prodPerHour), true)+'</span>', tooltip);
		}
	}

function createMoreGoods(sum)
	{
	var output = '';
	if (sum > 0) 
		{
		output = '<font class="More">'+mynumberformat(sum, true)+'&nbsp;</font>';
		}
 	return output;
	}
	
function createReservedGold(sum)
	{
	var output = '';
	if (sum == '?')
		{
		output = '<font class="More">?</font>';
		}
	else if (sum === 0)
		{
		output = '<font class="More">-</font>';
		}
	else if ((sum != undefined) && (sum != ''))
		{
		output = '<font class="More" title="Reserved gold">'+mynumberformat(sum, false)+'</font>';
		}
 	return output;
	}
	
function serialize(txt) {
  return uneval(txt); //new version
}

function unserialize(txt){
  if (txt.substr(0,1) == "(") { //new version
    return eval(txt);
  }
  var level=0,arrlen=new Array(),del=0,final=new Array(),key=new Array(),save=txt;
  while(1){
    switch(txt.substr(0,1)){
    case 'N':
      del = 2;
      ret = null;
    break;
    case 'b':
      del = txt.indexOf(';')+1;
      ret = (txt.substring(2,del-1) == '1')?true:false;
    break;
    case 'i':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 'd':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 's':
      del = txt.substr(2,txt.substr(2).indexOf(':'));
      ret = txt.substr( 1+txt.indexOf('"'),del);
      del = txt.indexOf('"')+ 1 + ret.length + 2;
    break;
    case 'a':
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(txt.indexOf(':')+1, del-2))*2;
    break;
    case 'O':
      txt = txt.substr(2);
      var tmp = txt.indexOf(':"')+2;
      var nlen = Number(txt.substring(0, txt.indexOf(':')));
      name = txt.substring(tmp, tmp+nlen );
      txt = txt.substring(tmp+nlen+2);
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(0, del-2))*2;
    break;
    case '}':
      txt = txt.substr(1);
      if(arrlen[level] != 0){ return undefined;};
      level--;
    continue;
    default:
      if(level==0) return final;
      return undefined;
    }
    if(arrlen[level]%2 == 0){
      if(typeof(ret) == 'object'){return undefined;}
      if(ret == undefined){return undefined;}
      key[level] = ret;
    } else {
      var ev = '';
      for(var i=1;i<=level;i++){
        if(typeof(key[i]) == 'number'){
          ev += '['+key[i]+']';
        }else{
          ev += '["'+key[i]+'"]';
        }
      }
      eval('final'+ev+'= ret;');
    }
    arrlen[level]--;
    if(typeof(ret) == 'object') level++;
    txt = txt.substr(del);
    continue;
  }
}

function getArrValue(arr, key, defaultValue) {
  if (arr == undefined || arr[key] == undefined) {
    return defaultValue;
  }
  return arr[key];
}

function createLink(text, href, attrs) {
  return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
}

// From kChen script with some fixes
function changeCity(city_id) {
	var postdata = getFormInput("//form[@id='changeCityForm']//input");
    postdata = postdata + "&cityId="+city_id+"&view=city";
	var xmlhttp;
	if(window.XMLHttpRequest){
    	xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.open('POST','http://' + location.host + '/index.php',false);
	xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
	xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
	xmlhttp.setRequestHeader('Cookie',document.cookie);
	xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
	xmlhttp.send(postdata);
	var node = getDocument(xmlhttp.responseText);
	return node.getElementsByTagName("input")[2].value;
}

function getActionCode(root) {
  return $X("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,root).value;
}

function getDocument(responseText) {
   var html = document.createElement("html");
   html.innerHTML = responseText;
   var response = document.implementation.createDocument("", "", null);
   response.appendChild(html);
   return response;
}

function getFormInput(path, root, isaction) {
	isaction = (isaction == undefined) ? false : true;
	var nodes = $x(path, root);
	if (nodes.length<=0) return null;
	var postdata = nodes[0].name+"="+nodes[0].value;
    for(var i = 1; i < nodes.length; i++) {
    	if (nodes[i].name == "actionRequest" && !isaction) nodes[i].value = actioncode;
    	postdata = postdata +"&" + nodes[i].name+"="+nodes[i].value;
    }
    return postdata;
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
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

function applyChangeCityEvents()
	{
	var nodes = $x("//table//a[contains(@class,'changeCity')]");
	for(var i=0; i<nodes.length; i++)
		{
		if (current_city_id != nodes[i].getAttribute("cityid"))
			nodes[i].addEventListener('click', changeCityEvent, false);
		}
	}
	
function changeCityEvent(e)
	{
	var obj = e.srcElement ? e.srcElement:e.target;
	obj.style.cursor="wait";
	document.getElementsByTagName("body")[0].style.cursor="wait";
	while (obj.tagName != 'A')
		{
		obj = obj.parentNode;
		}
	var city_id = obj.getAttribute("cityid");
	actioncode = changeCity(city_id);
	}

function createLinkToMap(city_id) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_coord != undefined)
		{
		cCoord =  res.city_coord.split(":");
		rHTML += '<a href="?view=worldmap_iso&islandX='+getIntValue(cCoord[0],'')+'&islandY='+getIntValue(cCoord[1],'')+'" title="' + res.city_coord + ' Прикажи свет"><img align="absmiddle" src="skin/layout/icon-world.gif" /></a>'; 
		}
		
	if ((res.island_id != undefined) && (res.city_coord != undefined))
		{
		rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="' + res.city_coord + ' Прикажи острво"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
		}
	else if (res.island_id != undefined)
		{
		rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
		}
		
	return rHTML;
}

function createLinkToChangeCity(text, city_id, city_index, sup_text, sup_class, sup_title) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_name != undefined)
		{
		cName = res.city_name;
		}
	else
		{
		cName = Trim(text); 
		}
	if (current_city_id == city_id)
		{
		rHTML += '<b>'+cName+'</b>';
		}
	else
		{
		rHTML += createLink(cName, "?cityId="+city_id, "title=\"Change current city\" onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\"");
		}
	
	if ((sup_text != undefined) && (sup_text != '') && (sup_text != 0))
		{
		if (sup_class == undefined) sup_class = '';
		if (sup_title == undefined) sup_title = '';
		rHTML += '<sup class="'+sup_class+'" title="'+sup_title+'">'+sup_text+'</sup>';
		}
	
	return rHTML;
}

function setViewRqTime(view, city_id, newTime, force)
	{
	if (view == undefined) view = '';
	if (newTime == undefined) newTime = EmpireBoard.StartTime;
	if (force == undefined) force = false;
	
	if ((city_id == undefined) || (city_id <= 0))
		{
		if (view == 'merchantNavy')
			{
			if (config.merchantNavyrqtime == undefined)
				{
				config.merchantNavyrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.merchantNavyrqtime)
				{
				config.merchantNavyrqtime = newTime;
				}
			else if (newTime < config.merchantNavyrqtime)
				{
				config.merchantNavyrqtime = newTime;
				}
			}
		else if (view == 'finances')
			{
			if (config.financesrqtime == undefined)
				{
				config.financesrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.financesrqtime)
				{
				config.financesrqtime = newTime;
				}
			else if (newTime < config.financesrqtime)
				{
				config.financesrqtime = newTime;
				}
			}
		else if (view == 'militaryAdvisorMilitaryMovements')
			{
			if (config.mAMMrqtime == undefined)
				{
				config.mAMMrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > config.mAMMrqtime)
				{
				config.mAMMrqtime = newTime;
				}
			else if (newTime < config.mAMMrqtime)
				{
				config.mAMMrqtime = newTime;
				}
			}
		}
	else
		{
		var city = getCity(city_id);
		if (view == '')
			{
			if (city.rqtime == undefined)
				{
				city.rqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.rqtime)
				{
				city.rqtime = newTime;
				}
			else if (newTime < city.rqtime)
				{
				city.rqtime = newTime;
				}
			}
		else if (view == 'cityMilitary-army')
			{
			if (city.cityMilitaryarmyrqtime == undefined)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.cityMilitaryarmyrqtime)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			else if (newTime < city.cityMilitaryarmyrqtime)
				{
				city.cityMilitaryarmyrqtime = newTime;
				}
			}
		else if (view == 'cityMilitary-fleet')
			{
			if (city.cityMilitaryfleetrqtime == undefined)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.cityMilitaryfleetrqtime)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			else if (newTime < city.cityMilitaryfleetrqtime)
				{
				city.cityMilitaryfleetrqtime = newTime;
				}
			}
		else if (city.buildings[view] != undefined)
			{
			if (city.buildings[view].rqtime == undefined)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (EmpireBoard.StartTime > city.buildings[view].rqtime)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (newTime < city.buildings[view].rqtime)
				{
				city.buildings[view].rqtime = newTime;
				}
			else if (force == true)
				{
				city.buildings[view].rqtime = newTime;
				}
			}
		}
	}

function reportViewToSurvey(view, city_id)
	{
	if (view == undefined) view = '';
	var report = false;
	
	if ((city_id == undefined) || (city_id <= 0))
		{
		if (view == 'finances')
			{
			if (config.financestime == undefined)
				{
				report = true;
				}
			else if (config.financestime == 0)
				{
				report = true;
				}
			else if ((config.financesrqtime != undefined) && (config.financesrqtime <= EmpireBoard.StartTime) && (config.financesrqtime > config.financestime))
				{
				report = true;
				}
			else if (config.financestime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if (view == 'merchantNavy')
			{
			if (config.merchantNavytime == undefined)
				{
				report = true;
				}
			else if (config.merchantNavytime == 0)
				{
				report = true;
				}
			else if ((config.merchantNavyrqtime != undefined) && (config.merchantNavyrqtime <= EmpireBoard.StartTime) && (config.merchantNavyrqtime > config.merchantNavytime))
				{
				report = true;
				}
			else if (config.merchantNavytime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if (view == 'militaryAdvisorMilitaryMovements')
			{
			if (config.mAMMtime == undefined)
				{
				report = true;
				}
			else if (config.mAMMtime == 0)
				{
				report = true;
				}
			else if ((config.mAMMrqtime != undefined) && (config.mAMMrqtime <= EmpireBoard.StartTime) && (config.mAMMrqtime > config.mAMMtime))
				{
				report = true;
				}
			else if (config.mAMMtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		}
	else
		{
		var city = getCity(city_id);
		if (view == '')
			{
			if (city.prodtime == undefined)
				{
				report = true;
				}
			else if (city.prodtime == 0)
				{
				report = true;
				}
			else if ((city.rqtime != undefined) && (city.rqtime <= EmpireBoard.StartTime) && (city.rqtime > city.prodtime))
				{
				report = true;
				}
			else if (city.prodtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if (view == 'city')
			{
			if (city.citytime == undefined)
				{
				report = true;
				}
			else if (city.citytime == 0)
				{
				report = true;
				}
			/*
			else if ((city.underConstructionName != '') && (city.underConstructionTime <= EmpireBoard.StartTime))
				{
				report = true;
				}
			else if (city.citytime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			*/
			}
		else if ((view == 'cityMilitary-army') || (view == 'barracks'))
			{
			var recentTime = 0;
			if (city.cityMilitaryarmytime != undefined) recentTime = city.cityMilitaryarmytime;
			if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].uptime > recentTime)) recentTime = city.buildings['barracks'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].rqtime != undefined) && (city.buildings['barracks'].rqtime <= EmpireBoard.StartTime) && (city.buildings['barracks'].rqtime > city.buildings['barracks'].uptime))
				{
				report = false;
				}
			else if ((city.cityMilitaryarmyrqtime != undefined) && (city.cityMilitaryarmyrqtime <= EmpireBoard.StartTime) && (city.cityMilitaryarmyrqtime > recentTime))
				{
				report = true;
				}
			else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
		else if ((view == 'cityMilitary-fleet') || (view == 'shipyard'))
			{
			var recentTime = 0;
			if (city.cityMilitaryfleettime != undefined) recentTime = city.cityMilitaryfleettime;
			if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].uptime > recentTime)) recentTime = city.buildings['shipyard'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].rqtime != undefined) && (city.buildings['shipyard'].rqtime <= EmpireBoard.StartTime) && (city.buildings['shipyard'].rqtime > city.buildings['shipyard'].uptime))
				{
				report = false;
				}
			else if ((city.cityMilitaryfleetrqtime != undefined) && (city.cityMilitaryfleetrqtime <= EmpireBoard.StartTime) && (city.cityMilitaryfleetrqtime > recentTime))
				{
				report = true;
				}
			else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
				{
				report = true;
				}
			}
			
		// Any buildings
		if (buildings[view] != undefined)
			{
			if (city.buildings[view] != undefined)
				{
				if (view == 'townHall')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= EmpireBoard.StartTime) && (city.buildings[view].rqtime > city.buildings[view].uptime))
						{
						report = true;
						}
					else if (city.buildings[view].uptime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
						{
						report = true;
						}
					}
				else if (view == 'tavern')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					}
				else if (view == 'branchOffice')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					}
				else
					{
					if (city.buildings[view].uptime == undefined)
						{
						
						}
					else if (city.buildings[view].uptime == 0)
						{
						
						}
					else if ((city.buildings[view].rqtime != undefined) && (city.buildings[view].rqtime <= EmpireBoard.StartTime) && (city.buildings[view].rqtime > city.buildings[view].uptime))
						{
						report = true;
						}
					}
				}
			}
		}
	
	return (report == true ? '!' : '');
	}

function createLinkToCityView(city_id) {
	var rHTML = '';
		
	rHTML += '<a href="?view=city&cityId='+city_id+'" class="changeCity" cityid="'+city_id+'" title="Преглед града"><img align="absmiddle" src="skin/layout/icon-city2.gif" /></a>';
	if (reportViewToSurvey('city', city_id) == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
		
	return rHTML;
	}

function createLinkToMilitaryView(city_id) {
	var rHTML = '';
		
	rHTML += '<a href="?view=cityMilitary-army&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="Преглед трупа"><img align="absmiddle" src="skin/img/city/building_barracks.gif" /></a>';
	if (reportViewToSurvey('cityMilitary-army', city_id) == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	rHTML += '<a href="?view=cityMilitary-fleet&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="Преглед флоте"><img align="absmiddle" src="skin/img/city/building_shipyard.gif" /></a>';
	if (reportViewToSurvey('cityMilitary-fleet', city_id) == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	return rHTML;
	}
	
function createLinkToFinanceNavyViews() {
	var rHTML = '';
		
	rHTML += '<a href="?view=merchantNavy" title="Преглед трговачке луке"><img align="absmiddle" src="skin/img/city/building_port.gif" /></a>';
	if (reportViewToSurvey('merchantNavy') == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	rHTML += '<a href="?view=finances" title="Преглед финансија"><img align="absmiddle" src="skin/img/city/building_townhall.gif" /></a>';
	if (reportViewToSurvey('finances') == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	return rHTML;
	}

function createLinkToMilitaryAdvisorView() {
	var rHTML = '';
		
	rHTML += '<a href="?view=militaryAdvisorMilitaryMovements" title="Војни преглед"><img align="absmiddle" src="skin/relatedCities/general.gif" hspace="2"/></a>';
	// skin/layout/icon-helmet.gif
	if (reportViewToSurvey('militaryAdvisorMilitaryMovements') == '!')
		{
		rHTML += '<sup class=Red title="Захтева пажњу">!</sup>';
		}
	else
		{
		rHTML += '&nbsp;';
		}
	
	return rHTML;
	}

// késako ?
function createLinkToForeignCity(text, city_id) {
  return createLink(text, "?view=island&id="+city_id);
}

function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");
  }
  return text;
}
function createLinkToResourceCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?view=resource&type=resource&id="+island_id, "class=changeCity cityid="+city_id);
  }
  return text;
}
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?view=tradegood&type=tradegood&id="+island_id, "class=changeCity cityid="+city_id);
  }
  return text;
}
function strToDatetime(str) {
  var d;
  if (/([0-9][0-9][0-9][0-9])\.([0-9][0-9])\.([0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
    d = new Date(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
  } else if (/([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
    d = new Date(RegExp.$3, RegExp.$2, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
  }
  if (d != undefined) {
    return d.getTime();
  }
  return undefined;
}

function dropUndeliveredLoadingGoods()
	{
	var arrivinggoods = getArrValue(config, 'arrivinggoods', []);
	var city_id;
	var i = 0;
	for (city_id in arrivinggoods)
		{
		var rows = getArrValue(arrivinggoods, city_id, []);
		var city = getCity(city_id);
		var key;
		for (key in rows)
			{
		    var row = rows[key];
			var quest = getArrValue(row, "quest", "");
			if (quest == 'loading')
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
		    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
			if (EmpireBoard.StartTime < arrivetime)
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
			}
		}
	//if (i > 0) window.status = 'Removed '+i+' undelivered/loading transports';
	}
	
function dropDeliveredGoods(city_id)
	{
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var city = getCity(city_id);
	var key;
	var i = 0;
	for (key in rows)
		{
	    var row = rows[key];
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
		if (arrivetime <= city.prodtime)
			{
			if (delete config.arrivinggoods[city_id][key]) i++;
			}
		}
	//if (i > 0) window.status = 'Removed '+i+' delivered transports';
	}

function getArrivingGoodsEvent(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	//var targetObj = obj;
	while (obj.hasAttribute('resource') == false)
		{
		obj = obj.parentNode;
		}
	var resName = obj.getAttribute('resource');
	while (obj.hasAttribute('cityid') == false)
		{
		obj = obj.parentNode;
		}
	var city_id = parseInt(obj.getAttribute('cityid'));
	//window.status = 'Resource: '+resName+' City ID: '+city_id;
	var tooltipHTML = EmpireBoard.Tooltip.innerHTML(getArrivingGoodsTTC(city_id, resName));
	
	EmpireBoard.Tooltip.show(tooltipHTML);
	}

function applyArrivingGoodEvents()
	{
	var nodes = $x("//div[@id='EmpireBoard']//*[contains(@class,'MoreGoods')]");
	for(var i=0; i<nodes.length; i++)
		{
		nodes[i].addEventListener('mouseover', getArrivingGoodsEvent, false);
		nodes[i].addEventListener('mousemove', EmpireBoard.Tooltip.mouseMove, false);
		nodes[i].addEventListener('mouseout', EmpireBoard.Tooltip.hide, false);
		}
	}
	
function getArrivingGoodsTTC(city_id, resName)
	{
	var _nowTime = new Date().getTime();
	
	var tooltip = "<table>";
	
	var sum = 0;
	
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	var higherTime = 0;
	for (key in rows)
		{
		var row = rows[key];
		var res = row["res"];
		var a = parseInt(getArrValue(res, resName, 0));
		var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime))
			{
			sum += a;
			var startcity = getArrValue(row, "startcity", "");
			var quest = getArrValue(row, "quest", "");
			if (_nowTime >= arrivetime)
				{
				var counter = "(delivered)";
				var smartDate = '';
				}
			else if (quest == 'loading')
				{
				var counter = "(loading)";
				var smartDate = '';
				}
			else
				{
				if (arrivetime > higherTime) higherTime = arrivetime;
				var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
				var smartDate = smartDateFormat(arrivetime,false);
				}
			var fromLocation = "&laquo;&nbsp;<i>" + startcity + "</i>";
				
			tooltip += "<tbody><tr>"+
					 "<td valign=top>+</td>"+
					 "<td align=right valign=top><b>"+mynumberformat(a, false) + "</b>&nbsp;</td>"+
					 "<td align=left>"+fromLocation+"</td>"+
					 "</tr><tr class=Small>"+
					 "<td align=right colspan=3>&nbsp;&nbsp;" + smartDate + "&nbsp;"+counter+"</td>"+
					 "</tr></tbody>";
			}
		}
	
	var tradinggoods = 0;
	var hourlyprod = 0;
	var resAmount = parseInt(getArrValue(city, resName, 0));
	if (resName == 'wood')
		{
		tradinggoods = city.tradewood;
		hourlyprod = city.prodwood;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.wood, city.prodwood);
		}
	else if (resName == 'wine')
		{
		tradinggoods = city.tradewine;
		var wineUsage = 0;
		var cellarLevel = getBuildingLevel(city_id, "vineyard", "-");
		if (city.wineUsageId != undefined)
			{
			wineUsage = tavernWineUsage[city.wineUsageId];
			if (cellarLevel != '-')
				{
				wineSave = wineUsage * cellarLevel;
				wineSave = Math.round(wineSave / 100);
				wineUsage = wineUsage - wineSave;
				}
			}
		hourlyprod = city.prodwine - wineUsage;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.wine, city.prodwine - wineUsage);
		}
	else if (resName == 'marble')
		{
		tradinggoods = city.trademarble;
		hourlyprod = city.prodmarble;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.marble, city.prodmarble);
		}
	else if (resName == 'glass')
		{
		tradinggoods = city.tradeglass;
		hourlyprod = city.prodglass;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.glass, city.prodglass);
		}
	else if (resName == 'sulfur')
		{
		tradinggoods = city.tradesulfur;
		hourlyprod = city.prodsulfur;
		resAmount = getCurrentResourceAmount(_nowTime, city.prodtime, city.sulfur, city.prodsulfur);
		}
		
	if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
		{
		sum += parseInt(tradinggoods);
		tooltip += "<tbody><tr>"+
						"<td>+</td>"+
						"<td align=right><b>"+mynumberformat(parseInt(tradinggoods), false) + "</b>&nbsp;</td>"+
						"<td align=left>&laquo;&nbsp;<i>" + buildings['branchOffice'][0] + "</i></td>"+
					"</tr></tbody>";
		}
		
	if (resAmount > 0)
		{
		tooltip += "<tbody><tr>"+
				 "<td>+</td>"+
				 "<td align=right><b>"+mynumberformat(resAmount, false) + "</b>&nbsp;</td>"+
				 "<td align=left>&laquo;&nbsp;<i>" + buildings['warehouse'][0] + "</i></td>"+
				 "</tr></tbody>";
		}
			 
	if (sum > 0)
		{
		tooltip += "<tfoot><tr>"+
				 "<td>=</td>"+
				 "<td align=right><b>"+mynumberformat(sum+resAmount, false) + "</b>&nbsp;</td>"+
				 "<td></td>"+
				 "</tr>";
		if ((hourlyprod != 0) && (higherTime > _nowTime + (1000 * 60 * 20)))
			{
			var restHours = (higherTime - _nowTime) / (1000 * 60 * 60);
			var prodSign = '+';
			if (hourlyprod < 0) prodSign = '-';
			tooltip += "<tr class=Small>"+
						"<td>"+prodSign+"</td>"+
						"<td align=right>"+mynumberformat(Math.abs(hourlyprod), false) + "&nbsp;</td>"+
						"<td align=left>x&nbsp;" + floatFormat(restHours, 1) + "h</td>"+
						"</tr>";
			tooltip += "<tr class=Small>"+
						"<td>=</td>"+
						"<td align=right>"+mynumberformat(sum+resAmount+Math.floor(restHours*hourlyprod), false) + "&nbsp;</td>"+
						"<td align=left>&raquo;&nbsp;" + smartDateFormat(higherTime,false)+"</td>"+
						"</tr>";
			}
		tooltip += "</tfoot>";
		}

	tooltip += "</table>";
	return tooltip;
	}
	
function getArrivingGoodsSum(city_id, resName)
	{
	var sum = 0;
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	for (key in rows)
		{
	    var row = rows[key];
	    var res = row["res"];
	    var a = getArrValue(res, resName, 0);
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime)) sum += a;
		}
	return sum;
	}
	
function getDeliveredGoodsTransports(city_id, resName)
	{
	var sum = 0;
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	for (key in rows)
		{
	    var row = rows[key];
	    var res = row["res"];
	    var a = getArrValue(res, resName, 0);
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime) && (EmpireBoard.StartTime >= arrivetime)) sum++;
		}
	return sum;
	}
	
function getArrivingGoods(city_id, resName, tradinggoods, resAmount, ArrivingGoodsSum) {
  var sum = 0;
  var found = false;
  if (ArrivingGoodsSum == undefined) ArrivingGoodsSum = getArrivingGoodsSum(city_id, resName);
  if (ArrivingGoodsSum > 0)
	{
	sum += ArrivingGoodsSum;
    found = true;
	}
  
  if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
	{
	sum += parseInt(tradinggoods);
	}
	
  var s = "<font class='More'>-&nbsp;</font>";
  if (found == true) {
	//s = "<font class='More Green' "+createTooltipAttribute(tooltip)+">"+mynumberformat(sum, true)+"</font>";
	s = "<font class='More MoreGoods Green'>"+mynumberformat(sum, true);
	if (getDeliveredGoodsTransports(city_id, resName) > 0)
		{
		s += "<sup>*</sup>";
		}
	else s += "&nbsp;";
	s += "</font>";
  }
  else if (sum > 0) {
	//s = "<font class='More' "+createTooltipAttribute(tooltip)+">"+mynumberformat(sum, true)+"</font>";
	s = "<font class='More MoreGoods'>"+mynumberformat(sum, true)+"&nbsp;</font>";
  }
  return s;
}

function createTransports(cityID)
	{
	var res = "<font class='More'></font>";
	var numTransports = 0;
	if (config["transports"] == undefined)
		{
		
		}
	else if (config["transports"][cityID] != undefined)
		{
		for (key in config["transports"][cityID])
			{
			if (config["transports"][cityID][key].endTime >= EmpireBoard.StartTime) numTransports++;
			}
			
		if (numTransports > 0) res = "<font class='More'>"+numTransports+" transport(s) on way</font>";
		}
		
	return res;
	}

function createMovements(cityID)
	{
	var res = "<font class='More'></font>";
	var numMovements = 0;
	if (config["movements"] == undefined)
		{
		
		}
	else if (config["movements"][cityID] != undefined)
		{
		for (key in config["movements"][cityID])
			{
			if (config["movements"][cityID][key].endTime >= EmpireBoard.StartTime) numMovements++;
			}
			
		if (numMovements > 0) res = "<font class='More'>"+numMovements+" movement(s) on way</font>";
		}
		
	return res;
	}

function getNextNode(node) {
  var n = node.nextSibling;
  while (n != undefined && n != null && n.nodeName == "#text") {
    n = n.nextSibling;
  }
  return n;
}
function getPreviousNode(node) {
  var n = node.previousSibling;
  while (n != undefined && n != null && n.nodeName == "#text") {
    n = n.previousSibling;
  }
  return n;
}

function getBuildingLink(city_id, name, defaultValue, position)
	{
	if (defaultValue == undefined) defaultValue = '';
	if (position == undefined)
		{
		position = -1;
		if (name == 'townHall') position = 0;
		}
	var link = '';
	
	if (position == -1)
		{
		// will deprecated
		var city = getCity(city_id);
		link = getArrValue(city.buildings[name], "link", defaultValue);
		}
	else
		{
		link = '?view='+name+'&id='+city_id+'&position='+position;
		}
	
	if (link == '') link = defaultValue;
	return link;
	}

// deprecated
function getBuildingPosition(city_id, name, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = -1;
	var position = -1;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (name == 'townHall') position = 0;
		}
	else if ((city.buildings[name].link != undefined) && (city.buildings[name].link != ''))
		{
		// will deprecated
		var link = city.buildings[name].link;
		position = parseInt(/position=([0-9]+)/.exec(link)[1]);
		}
	else if (city.buildings[name].position != undefined)
		{
		position = city.buildings[name].position;
		}
	else if (name == 'townHall') position = 0;
	
	if (position == -1) position = defaultValue;
	return position;
	}
	
function getCityBuildingsCount(city_id, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = 0;
	var count = 0;
	var city = getCity(city_id);

	if (city.citytime != undefined)
		{
		for (name in city.buildings)
			{
			if (city.buildings[name].levels != undefined)
				{
				var p;
				for (p in city.buildings[name].levels)
					{
					count++;
					}
				}
			else if (city.buildings[name].level != undefined)
				{
				count++;
				}
			}
		}

	if (count == 0) count = defaultValue;
	return count;
	}
	
function getBuildingCount(city_id, name, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = 0;
	var count = 0;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (name == 'townHall') count = 1;
		}
	else if (city.buildings[name].levels != undefined)
		{
		var p;
		for (p in city.buildings[name].levels)
			{
			count++;
			}
		}
	else if (city.underConstructionName == name)
		{
		count = 1;
		}
	
	if (count == 0) count = defaultValue;
	return count;
	}
	
// Get level instead building upgrading is finished
function getBuildingLevel(city_id, name, defaultValue, position)
	{
	if (defaultValue == undefined) defaultValue = 0;
	if (position == undefined) position = -1;
	var level = 0;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (name == 'townHall') level = 1;
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
	else if (position == -1)
		{
		if (city.buildings[name].levels != undefined)
			{
			var p;
			for (p in city.buildings[name].levels)
				{
				level += city.buildings[name].levels[p];
				}
			}
		else
			{
			// deprecated
			level = getArrValue(city.buildings[name], "level", 0);
			}
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
	else if (city.buildings[name].levels != undefined)
		{
		level = city.buildings[name].levels[position];
		// deprecated 
		if (level == undefined) level = getArrValue(city.buildings[name], "level", 0);
		if ((city.underConstructionName == name) && (city.underConstructionPosition == position))
			{
			if (city.underConstructionTime <= EmpireBoard.StartTime) level++;
			}
		}
		
	if (level == 0) level = defaultValue;
	return level;
	}

function getOnePeopleGrowthTime(happiness) {
  if (happiness != 0) {
    return Math.abs(3600/0.02/happiness*1000);
  }
  return "NaN";
}

function getEstimatedPopulationOld(population, startTime, currenttime, startHappiness) {
  var thappiness = startHappiness;
  startTime = Number(startTime);
  while (thappiness > 0) {
    var t = getOnePeopleGrowthTime(thappiness);
    if (t == "NaN" || startTime + t > currenttime) {
      break;
    }
    population++;
    thappiness--;
    startTime += t;
  }
  return population;
}

function getEstimatedPopulation(population, startTime, currenttime, startHappiness) {
  var thappiness = startHappiness;
  startTime = Number(startTime);
  if (thappiness != 0)
	{
	var t = getOnePeopleGrowthTime(thappiness);
	while (startTime + t < currenttime)
		{
		if (thappiness == 0)
			{
			break;
			}
		else if (thappiness > 0)
			{
		    population++;
		    thappiness--;
			startTime += t;
			}
		else
			{
		    population--;
		    thappiness++;
			startTime += t;
			}
		
		t = getOnePeopleGrowthTime(thappiness);
		}
	}
  
  return population;
}

function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) {
  if (maxPopulation - population > happiness) {
    return "&#8734;h";
  }
  var time = Number(startTime);
  while (population < maxPopulation) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN") {
      return "&#8734;h";
    }
    time += t;
    population++;
    happiness--;
  }
  return floatFormat((time - Number(startTime)) / 1000 / 3600, 1) + "h";
}

function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) {
  if (showElapsedTime != true) {
    showElapsedTime = false;
  }
  if (elapsedTimeSeparator == undefined) {
    elapsedTimeSeparator = ",";
  }
  var s = new Date();
  s.setTime(time);
  var now = new Date();
  var t = "";
  if ((1+now.getDate()) == s.getDate() && now.getYear() == s.getYear() && now.getMonth() == s.getMonth()) {
    t = 'tomorrow ' + twodigit(s.getHours())+":"+twodigit(s.getMinutes());
  } else if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.toLocaleString();
  } else {
    t = twodigit(s.getHours())+":"+twodigit(s.getMinutes());
  }
  if (showElapsedTime) {
    t += elapsedTimeSeparator;
    var d = (now.getTime() - s.getTime()) / 1000;
    if (d < 3600) {
      t += " " + Math.floor(d / 60) + "m";
    } else {
      if (d >= 86400) {
        t += " " + Math.floor(d / 86400) + "d";
      }
      t += " " + floatFormat((d % 86400) / 3600, 1) + "h";
    }
  }
  return t;
}

function createLastUpdateAsTooltip(content, time)
	{
	if (time == undefined)
		{
		return content;
		}
	else
		{
		return createTooltip(content, "Last update: "+smartDateFormat(time, true));
		}
	}

function Resource() {
  this.wood = 0;
  this.wine = 0;
  this.marble = 0;
  this.glass = 0;
  this.sulfur = 0;
  this.underConstruction = "-";
  this.population = 0;
  this.buildings = {};
  this.units = {};
}

// Fetch gold
var GoldTitle = getNodeTitle("//div[@id='globalResources']//li[@class='gold']",'?');
if (GoldTitle != '?') config.gold = getIntValue(GoldTitle, undefined);

// Current selected city
if (current_city_id > 0)
	{
	var res = getCity(current_city_id);
	
	res.wood   = getIntValue(getNodeValue("id('value_wood')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='wood']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradewood = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradewood = 0;
		}
	res.wine   = getIntValue(getNodeValue("id('value_wine')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='wine']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradewine = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradewine = 0;
		}
	res.marble = getIntValue(getNodeValue("id('value_marble')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='marble']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.trademarble = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.trademarble = 0;
		}
	res.glass  = getIntValue(getNodeValue("id('value_crystal')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='glass']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradeglass = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradeglass = 0;
		}
	res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='sulfur']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradesulfur = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradesulfur = 0;
		}
	
	digProducedResources(res);
	
	var inhabitantsNode = getNodeValue("//span[@id='value_inhabitants']");
	if (/([0-9,.]+) \(([0-9,.]+)\)/.exec(inhabitantsNode) != null) {
		cizReg = RegExp.$1;
		popReg = RegExp.$2;
		res.population = getIntValue(popReg);
		res.citizens = getIntValue(cizReg);
		} else { 
		res.population = 0;
		res.citizens = 0;
		}
		
	res.actions = getNodeValue("//span[@id='value_maxActionPoints']");
	
	dropDeliveredGoods(current_city_id);
	
	if (EmpireBoard.Ikariam.View() == "plunder")
		{
		function reportPlunder()
			{
			setViewRqTime('merchantNavy');
			setViewRqTime('finances');
			setViewRqTime('militaryAdvisorMilitaryMovements');
			setVar("config", serialize(config));
			}
		
		var n = document.getElementById("plunderbutton");
		n.addEventListener("click", reportPlunder, false);
		}
		
	if (EmpireBoard.Ikariam.View() == "transport")
		{
		function reportTransport()
			{
			setViewRqTime('merchantNavy');
			setVar("config", serialize(config));
			}
		
		var n = document.getElementById("submit");
		n.addEventListener("click", reportTransport, false);
		}
		
	if (EmpireBoard.Ikariam.View() == 'deployment')
		{
		function reportDeployment()
			{
			var dType = getNode_value("//form[@id='deploymentForm']/input[@name='function']", '');
			if (dType == 'deployFleet')
				{
				dType = 'cityMilitary-fleet';
				}
			else
				{
				dType = 'cityMilitary-army';
				}
			setViewRqTime(dType, current_city_id);
			setViewRqTime('finances');
			setViewRqTime('militaryAdvisorMilitaryMovements');
			setVar("config", serialize(config));
			}
			
		var dSubmit = getNode("//form[@id='deploymentForm']//input[@type='submit']");
		dSubmit.addEventListener("click", reportDeployment, false);
		}

	if (EmpireBoard.Ikariam.View() == 'resource')
		{
		function reportResource()
			{
			setViewRqTime('finances');
			setVar("config", serialize(config));
			}
		
		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener("click", reportResource, false);
		}

	if (EmpireBoard.Ikariam.View() == 'tradegood')
		{
		function reportTradegood()
			{
			setViewRqTime('finances');
			setVar("config", serialize(config));
			}
		
		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener("click", reportTradegood, false);
		}
	}

// If main view is a city
if (city_idmainView > 0) {
  var res = getCity(city_idmainView);
  if (city_name != "") {
    res.city_name = city_name;
  }
  if (city_coord != "") {
    res.city_coord = city_coord;
  }
  if (island_id != "") {
    res.island_id = island_id;
  }
  
  // Vue ville
  if (EmpireBoard.Ikariam.View() == 'city')
	{
	// Add new buildings
	var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for(var i = 0; i < nodes.snapshotLength; i++) {
	    var node = nodes.snapshotItem(i);
	    var li = node.parentNode;
	    
	    var name = li.getAttribute("class");
	    if (buildings[name] != undefined)
			{
			if (res.buildings[name] == undefined) {
				res.buildings[name] = {};
				}
			}
		else
			{
			if (res.buildings[name] != undefined) {
				// fix if demolish
				try
					{
					delete config[city_idmainView].buildings[name];
					}
				catch (e)
					{
					
					}
				}
			}
		}
	var res = getCity(city_idmainView);

	// Reset levels, links, and positions
	for (name in res.buildings)
		{
		try
			{
			delete config[city_idmainView].buildings[name].levels;
			}
		catch (e)
			{
			
			}
		}
	var res = getCity(city_idmainView);
	for (name in res.buildings)
		{
		res.buildings[name].position = -1;
		res.buildings[name].level = 0;
		res.buildings[name].levels = {};
		res.buildings[name].link = '';
		}
	  
	// Fetch levels & positions
	var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for(var i = 0; i < nodes.snapshotLength; i++) {
	    var node = nodes.snapshotItem(i);
	    var li = node.parentNode;
	    
		// name
	    var name = li.getAttribute("class");
	  	if (buildings[name] != undefined)
			{
			var position = parseInt(/position=([0-9]+)/.exec(node.href)[1]);
			// deprecated
			res.buildings[name].position = position;
			
			// level
		    var level = "-";
		    if (/([0-9]+)/.exec(node.title) != null) {
				level = RegExp.$1;
				}
			// deprecated
			res.buildings[name].level = res.buildings[name].level + parseInt(level);
			res.buildings[name].levels[position] = parseInt(level);
					
			// link, will deprecated
			res.buildings[name].link = node.href;
			}
		}
	  
	// Nouvelle construction
	  var node = xpath("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]");
	  if (node.snapshotLength >= 1) {
	    res.underConstruction = node.snapshotItem(0).title;
	    res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");
		res.underConstructionPosition = /position=([0-9]+)/.exec(node.snapshotItem(0).href)[1];
		
		// Search cityCountdown
		var scripts = document.getElementsByTagName("script");
		var found = false;
		var sCode = '';
		for (var j = 0; j < scripts.length; j++)
			{
			var nScript = scripts[j];
			sCode = nScript.innerHTML;
			if (sCode.indexOf('cityCountdown') >= 0)
				{
				found = true;
				break;
				}
			}
		if (found == true)
			{
		      var enddate = 0;
		      var currentdate = 0;
		      if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null) {
		        enddate = parseFloat(RegExp.$1) * 1000; 
		      }
		      if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
		        currentdate = parseFloat(RegExp.$1) * 1000; 
		      }
		      if (enddate != 0 && currentdate != 0) {
				res.underConstructionTime = enddate - currentdate + new Date().getTime();
		      }
		    }
	  } else {
	      res.underConstruction = "-";
	      res.underConstructionName = "";
	      res.underConstructionPosition = -1;
	      res.underConstructionTime = 0;
	  }
	  
	res.citytime = EmpireBoard.StartTime;
	}
  
  //military-army and fleet unit counts
  if ((EmpireBoard.Ikariam.View() == "cityMilitary-army") || (EmpireBoard.Ikariam.View() == "cityMilitary-fleet"))
	{
	/*
	if (EmpireBoard.Ikariam.View() == "cityMilitary-fleet")
		{
		var idx = 13;
		}
	else
		{
		var idx = 0;
		}
	*/
    
    if (config["unitnames"] == undefined) { config["unitnames"] = {}; }
    if (res.units == undefined) { res.units = {}; }
	
    var names = xpath("//table/tbody/tr/th");
    var counts = xpath("//table/tbody/tr[@class='count']/td");
    if (names.snapshotLength >= counts.snapshotLength)
		{
		for(var i = 0; i < counts.snapshotLength; i++)
			{
			var n = names.snapshotItem(i).title;
			
			var unit_id = '';
			//unit_id = unitsAndShipsIndexesR[i + idx];
			if (EmpireBoard.Ikariam.View() == "cityMilitary-fleet")
				{
				var url_unit = /([a-z]+_[a-z]+)_faceright/.exec(names.snapshotItem(i).firstChild.src);
				if (url_unit != null)
					{
					unit_id = 'unit ' + RegExp.$1;
					}
				}
			else
				{
				var url_unit = /y60_([a-z]+)_/.exec(names.snapshotItem(i).firstChild.src);
				if (url_unit != null)
					{
					unit_id = 'unit ' + RegExp.$1;
					}
				}

			config["unitnames"][unit_id] = n;
			
			var c = counts.snapshotItem(i);
			var cnt = getIntValue(c.innerHTML, 0);
			if (res.units[unit_id] == undefined)
				{
				res.units[unit_id] = {};
				}
			res.units[unit_id].count = cnt;
			}
		}
	
	if (EmpireBoard.Ikariam.View() == "cityMilitary-army")
		{
		res.cityMilitaryarmytime = EmpireBoard.StartTime;
		}
	else if (EmpireBoard.Ikariam.View() == "cityMilitary-fleet")
		{
		res.cityMilitaryfleettime = EmpireBoard.StartTime;
		}
	}
	
	// view is building
	if (buildings[EmpireBoard.Ikariam.View()] != undefined)
		{
		
		if (res.buildings[EmpireBoard.Ikariam.View()] == undefined) {
			res.buildings[EmpireBoard.Ikariam.View()] = {};
			}
		
		// Fetch position
		var position = -1;
		var node = xpath("//*[@id='buildingUpgrade']//ul[@class='actions']//a[contains(@href, 'position=')]");
		if (node.snapshotLength == 0)
			{
			node = xpath("//*[@id='buildingUpgrade']//a[@class='cancelUpgrade']");
			}
		if (node.snapshotLength >= 1)
			{
			var url_position = /position=([0-9]+)/.exec(node.snapshotItem(0).href);
			if (url_position != null) position = parseInt(RegExp.$1);
			}
		else if ((res.buildings[EmpireBoard.Ikariam.View()].position != undefined) && (res.buildings[EmpireBoard.Ikariam.View()].position != -1))
			{
			position = res.buildings[EmpireBoard.Ikariam.View()].position;
			}
		else
			{
			var url_position = /[\?&]position=([0-9]+)/.exec(document.URL);
			if (url_position != null) position = parseInt(RegExp.$1);
			}
		city_positionmainView = position;
		// deprecated
		res.buildings[EmpireBoard.Ikariam.View()].position = position;
		
		// Fetch level & detect upgrading
		var n = getNode("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");
		if (n != null)
			{
			if (position != -1)
				{
				// Fetch level
				if (res.buildings[EmpireBoard.Ikariam.View()].levels == undefined) res.buildings[EmpireBoard.Ikariam.View()].levels = {};
				res.buildings[EmpireBoard.Ikariam.View()].levels[position] = getIntValue(n.innerHTML,0);
				}
			
			GM_log('View '+EmpireBoard.Ikariam.View()+' building level '+getIntValue(n.innerHTML,0)+' at position '+position);
			
			// Ignorer ancien upgrade du batiment
			if (res.underConstructionPosition == undefined) res.underConstructionPosition = -1; // Deprecated
			if ((res.underConstructionName == EmpireBoard.Ikariam.View()) && (res.underConstructionPosition == position))
				{
				res.underConstruction = '';
				res.underConstructionName = '';
				res.underConstructionTime = 0;
				res.underConstructionPosition = -1;
				}
			
			// Search getCountdown()
			var scripts = document.getElementsByTagName("script");
			var found = false;
			var sCode = '';
			for (var j = 0; j < scripts.length; j++)
				{
				// search upgradeCountDown
				var nScript = scripts[j];
				sCode = nScript.innerHTML;
				if (sCode.indexOf('upgradeCountDown') >= 0)
					{
					found = true;
					break;
					}
				}
			if (found == true)
				{
				// buildings under upgrading
				var enddate = 0;
				var currentdate = 0;
				if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)
					{
					enddate = parseFloat(RegExp.$1) * 1000; 
					}
				if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)
					{
					currentdate = parseFloat(RegExp.$1) * 1000; 
					}
				if (enddate != 0 && currentdate != 0) {
					// First, apply previous upgrading of other building
					if (res.underConstructionName != '')
						{
						if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.buildings[res.underConstructionName].uptime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.citytime != undefined) && (res.citytime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.citytime != undefined))
							{
							if ((res.underConstructionPosition != undefined) && (res.underConstructionPosition != -1))
								{
								if (res.buildings[res.underConstructionName].levels == undefined) res.buildings[res.underConstructionName].levels = {};
								res.buildings[res.underConstructionName].levels[res.underConstructionPosition] = parseInt(res.buildings[res.underConstructionName].levels[res.underConstructionPosition])+1;
								}
							else
								{
								// deprecated
								res.buildings[res.underConstructionName].level = parseInt(res.buildings[res.underConstructionName].level)+1;
								}
							}
						}
					
					// Define new upgrading
					res.underConstruction = buildings[EmpireBoard.Ikariam.View()][0] + " level " + getIntValue(n.innerHTML,0);
					//res.underConstruction += ","+(enddate - currentdate + new Date().getTime());
					res.underConstructionName = EmpireBoard.Ikariam.View();
					res.underConstructionPosition = position;
					res.underConstructionTime = enddate - currentdate + new Date().getTime();
					}
				}
			else
				{
				// Not upgrading
				}
			}
		res.buildings[EmpireBoard.Ikariam.View()].uptime = EmpireBoard.StartTime;
		}
  
  //townhall population total and growth
  if (EmpireBoard.Ikariam.View() == 'townHall') {
	res.buildings["townHall"].population = Number(getNodeValue("//span[@class='value occupied']", "0"));
    res.population = res.buildings["townHall"].population;
	res.buildings["townHall"].growth = Number(getNodeValue("//li[contains(@class, 'growth ')]/span[@class='value']", "0"));
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getBuildingLevel(city_idmainView, 'townHall', 1, 0)];
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.buildings["townHall"].population;
    res.buildings["townHall"].incomegold  = Number(getNodeValue("//li[contains(@class, 'incomegold ')]/span[@class='value']", "0"));
	//var raw_income = getIntValue(getNodeValue("//div[@class='citizens']/span[@class='production']", "0"),0);
  }
  
  if (EmpireBoard.Ikariam.View() == 'branchOffice')
	{
	var reservedGold =  document.getElementById("reservedGold");
	if (reservedGold != null)
		{
		res.buildings["branchOffice"].reservedGold = getIntValue(reservedGold.innerHTML, 0);
		}
	else
		{
		res.buildings["branchOffice"].reservedGold = 0;
		}
	//window.status = 'reservedGold = '+res.buildings["branchOffice"].reservedGold;
	}
  
  //military-army unit counts
  if ((EmpireBoard.Ikariam.View() == "barracks") || (EmpireBoard.Ikariam.View() == "shipyard"))
	{
	var idx = 0;
	if (EmpireBoard.Ikariam.View() == "shipyard") { idx = 13; }
	if (config["unitnames"] == undefined) { config["unitnames"] = {}; }
	if (res.units == undefined) { res.units = {}; }
	
	// Fetch units counters
	var names = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4");
	var counts = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']");
	if (names.snapshotLength == counts.snapshotLength)
		{
		for (var i = 0; i < names.snapshotLength; i++)
			{
			var node = names.snapshotItem(i);
			var n = node.innerHTML;
			var unit_id;
			try
				{ unit_id = node.parentNode.parentNode.getAttribute("class"); }
			catch(e) { }
			config["unitnames"][unit_id] = n;
			var c = counts.snapshotItem(i);
			var cnt = getIntValue(c.innerHTML.replace(/<.+>/g, ""), 0);
			if (res.units[unit_id] == undefined)
				{
				res.units[unit_id] = {};
				}
			res.units[unit_id].count = cnt;
			// Init units under construction
			res.units[unit_id].construction = 0;
			}
		}
		
		
	// Search units under construction
	var currentUnit = getNode("//div[@id='unitConstructionList']//div[contains(@class, 'currentUnit')]");
	if (currentUnit != null)
		{
		var currentUnit_id = 'unit '+TrimUnitID(currentUnit.className);
		res.units[currentUnit_id].construction = 1;
			
		// Fetch queue
		var simUnits = 0;
		var Amounts = xpath("//div[@id='unitConstructionList']//li/div[@class='amount']");
		if (Amounts.snapshotLength >= 1)
			{
			for (var i = 0; i < Amounts.snapshotLength; i++)
				{
				var Amount = Amounts.snapshotItem(i);
				var AmountInt = getIntValue(Amount.textContent, 1);
				var unit_id = 'unit '+TrimUnitID(Amount.parentNode.className);

				res.units[unit_id].construction = res.units[unit_id].construction + AmountInt;
				if (unit_id == currentUnit_id)
					{
					simUnits = simUnits + AmountInt;
					}
				}
			}	
		
		var scripts = document.getElementsByTagName("script");
		var found = false;
		for (var j = scripts.length-1; j >= 0; j--)
			{
			// search getCountdown
			var nScript = scripts[j];
			var sCode = nScript.innerHTML;
			if (sCode.indexOf('buildProgress') > 0)
				{
				found = true;
				break;
				}
			}
		if (found == true)
			{
			var enddate = 0;
			if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null) {
				enddate = parseFloat(RegExp.$1) * 1000; 
				}
			var currentdate = 0;
			if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
				currentdate = parseFloat(RegExp.$1) * 1000; 
				}
			var startdate = 0;
			if (/startdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
				startdate = parseFloat(RegExp.$1) * 1000; 
				}

			setViewRqTime(EmpireBoard.Ikariam.View(), city_idmainView, EmpireBoard.StartTime + (enddate - currentdate) + simUnits * (enddate - startdate), true);
			//window.status = 'Will require attention in '+((res.buildings[EmpireBoard.Ikariam.View()].rqtime-EmpireBoard.StartTime)/1000/60)+'mn';
			}
		}
	}

  if (EmpireBoard.Ikariam.View() == "tavern") {
    function storeWineUsage() {
      try {
        var city_id = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
        var city = getCity(city_id);
        var n = document.getElementById("wineAmount");
		if (city.wineUsageId != n.selectedIndex)
			{
			setViewRqTime('townHall', city_id);
			}
        city.wineUsageId = n.selectedIndex;
        city.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
        setVar("config", serialize(config));
      } catch (e) {
      }
    }
	// Fix for v3
    function getSavedWine() {
      try {
        var n = document.getElementById("savedWine");
		if ((n.innerHTML != '&nbsp;') && (Trim(n.innerHTML) != ''))
			{
			return Math.round(parseFloat(n.innerHTML));
			}
		else return 0;
       } catch (e) {
		return 0;
      }
   }
    var n = getNode("//form[@id='wineAssignForm']//*[@type='submit']");
    n.addEventListener("click", storeWineUsage, false);
	
    var n = document.getElementById("wineAmount");
	res.wineUsageId = n.selectedIndex;
    res.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
  }
    
	if (EmpireBoard.Ikariam.View() == 'academy')
		{
		function reportAcademy()
			{
			setViewRqTime('finances');
			setVar("config", serialize(config));
			}
		
		var n = document.getElementById("inputWorkersSubmit");
		n.addEventListener("click", reportAcademy, false);
		}
  
} else {
	if (EmpireBoard.Ikariam.View() == "finances")
		{
		var citiesIDs = {};
		var res = xpath("//select[@id='citySelect']/option");
		for(var i = 0; i < res.snapshotLength; i++)
		  {
		  var n = res.snapshotItem(i);
		  var cName = Trim(n.innerHTML);
		  citiesIDs[cName] = parseInt(n.value);
		  }
		  
		var nodes = xpath("//table[@id='balance']//td[@class='city']");
		for (var i = 0; i < nodes.snapshotLength; i++)
			{
			var node = nodes.snapshotItem(i);
			var cName = Trim(node.innerHTML);
			var cID = citiesIDs[cName];
			
			var tr = node.parentNode;
			var tds = tr.getElementsByTagName("td");
			var incomegold = getIntValue(tds[3].innerHTML);
			
			var city = getCity(cID); 
			if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
			city.buildings["townHall"].incomegold  = incomegold;
			}
		
		config.financestime = EmpireBoard.StartTime;
		}
		
	if (EmpireBoard.Ikariam.View() == "militaryAdvisorMilitaryMovements")
		{
		config["movements"] = {};
		function addMovement(cityID, movementID, endTime, subject, tCityName)
			{
			if (config["movements"][cityID] == undefined) config["movements"][cityID] = {};
			if (config["movements"][cityID][movementID] == undefined) config["movements"][cityID][movementID] = {};
			config["movements"][cityID][movementID].endTime = endTime;
			}
			
		var resMi = xpath("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
		if (resMi.snapshotLength > 0)
			{
			//window.status = "Missions: " + resMi.snapshotLength;
			
			// Villes du joueur
			var citiesIDs = {};
			var citiesNames = {};
			var res = xpath("//select[@id='citySelect']/option");
			for(var i = 0; i < res.snapshotLength; i++)
			  {
			  var n = res.snapshotItem(i);
			  var cName = Trim(n.textContent, true);
			  var cID = parseInt(n.value);
			  citiesIDs[cName] = cID;
			  citiesNames[cID] = cName;
			  }
			
			// heures
			var mTimers = {};
			var scripts = document.getElementsByTagName("script");
			for (var j = 0; j < scripts.length; j++)
				{
				// search getCountdown
				var nScript = scripts[j];
				var sCode = nScript.innerHTML;
				if (sCode.indexOf('getCountdown') >= 0)
					{
					var aCodeLines = sCode.split(';');
					for (var i=0; i < aCodeLines.length-1; i++)
						{
						if (aCodeLines[i].indexOf('getCountdown') >= 0)
							{
							var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
							var sParts = sValues.split(',');
							
							var sPart0 = sParts[0].split(':');
							var enddate = 1000*parseInt(Trim(sPart0[1]));
							
							var sPart1 = sParts[1].split(':');
							var currentdate = 1000*parseInt(Trim(sPart1[1]));
							
							var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
							
							mTimers[sID] = EmpireBoard.StartTime + (enddate - currentdate);
							}
						}
					}
				}
			
			function grabCityID(rootElt)
				{
				var resID = 0;
				var alinks = rootElt.getElementsByTagName("a");
				for (var k=0; k < alinks.length; k++)
					{
					var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(alinks[k].href);
					if (resReg != null)
						{
						resID = resReg[1];
						break;
						}
					}
				
				return resID;
				}
				
			for (var i=0; i < resMi.snapshotLength; i++)
				{
				var tr = resMi.snapshotItem(i).parentNode.parentNode;
				var tds = tr.getElementsByTagName("td");
				//window.status = 'tds.length='+tds.length;
				
				var isOwn = EmpireBoard.DOM.Has_ClassName(tr,'own');
				//var isAlt = EmpireBoard.DOM.Has_ClassName(tr,'alt');
				var isHostile = EmpireBoard.DOM.Has_ClassName(tr,'hostile');
				var fleetRowID = tds[1].id;
				var payload = tds[2].innerHTML;
				var hasArmy = false;
				var hasFleet = false;
				var origCityID = 0;
				var origName = '';
				var toLeft = (tds[4].innerHTML != '') ? true : false;
				var mission = /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
				// deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
				var toRight = (tds[6].innerHTML != '') ? true : false;
				var destCityID = 0;
				var destName = '';
				//var hasAction = false;
				
				if (payload.indexOf('ship_ram') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_ballista') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_flamethrower') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_catapult') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_steamboat') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_mortar') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_submarine') > 0)
					{
					hasFleet = true;
					}

				if (isOwn == true)
					{
					origCityID = grabCityID(tds[3]);
					if (citiesNames[origCityID] == undefined)
						{
						origCityID = grabCityID(tds[7]);
						}
					
					if (mission == 'trade')
						{
						// Not military movement
						}
					else if (mission == 'transport')
						{
						// Not military movement
						}
					else if (mission == 'deployfleet')
						{
						// Perhaps not military movement
						if (hasFleet == true)
							{
							addMovement(origCityID, fleetRowID, mTimers[fleetRowID]);
							}
						}
					else
						{
						addMovement(origCityID, fleetRowID, mTimers[fleetRowID]);
						}
					}
				}
			}
		config.mAMMtime = EmpireBoard.StartTime;
		}

	if (EmpireBoard.Ikariam.View() == "merchantNavy")
		{
		if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = {};
		dropUndeliveredLoadingGoods();
		
		config["transports"] = {};
		function addTransport(cityID, transportID, endTime, subject, tCityName)
			{
			if (config["transports"][cityID] == undefined) config["transports"][cityID] = {};
			if (config["transports"][cityID][transportID] == undefined) config["transports"][cityID][transportID] = {};
			config["transports"][cityID][transportID].endTime = endTime;
			}

		var foundLoading = false;
		var takeSomething = false;
		var resMi = xpath("//div[@id='mainview']//td[contains(@class, 'mission')]");
		if (resMi.snapshotLength > 0)
			{
			// Villes du joueur
			var citiesIDs = {};
			var citiesNames = {};
			var res = xpath("//select[@id='citySelect']/option");
			for(var i = 0; i < res.snapshotLength; i++)
			  {
			  var n = res.snapshotItem(i);
			  var cName = Trim(n.textContent, true);
			  var cID = parseInt(n.value);
			  citiesIDs[cName] = cID;
			  citiesNames[cID] = cName;
			  }
			
			// heures
			var mTimers = {};
			var scripts = document.getElementsByTagName("script");
			for (var j = 0; j < scripts.length; j++)
				{
				// search getCountdown
				var nScript = scripts[j];
				var sCode = nScript.innerHTML;
				if (sCode.indexOf('getCountdown') > 0)
					{
					var aCodeLines = sCode.split(';');
					for (var i=0; i < aCodeLines.length-1; i++)
						{
						var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
						var sParts = sValues.split(',');
						
						var sPart0 = sParts[0].split(':');
						var enddate = 1000*parseInt(Trim(sPart0[1]));
						
						var sPart1 = sParts[1].split(':');
						var currentdate = 1000*parseInt(Trim(sPart1[1]));
						
						var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
						
						mTimers[sID] = EmpireBoard.StartTime + (enddate - currentdate);
						GM_log("mTimers["+sID+"] = "+(enddate - currentdate));
						}
					}
				}
				
			// infos
			for (var i = 0; i < resMi.snapshotLength; i++)
				{
				var nMi = resMi.snapshotItem(i);
				var tr = nMi.parentNode;
				var tds = tr.getElementsByTagName("td");
				var nSource = tds[1];
				var nTarget = tds[3];
				var nETA = tds[4];
				var nRET = tds[5];
				var nAc = tds[6];
				
				if (nETA.id == '') continue;
				if (nRET.id == '') continue;
				GM_log('nRET.id = '+nETA.id);
				
				var trPayload = tr.nextSibling;
				var payload = trPayload.getElementsByTagName("img");
				var foundGoods = false;
				var foundArmy = false;
				var PayloadGoods = {};
				if (payload.length > 0)
					{
					var rKey = ''; 
					for (var j = 0; j < payload.length; j++)
						{
						if (payload[j].src.indexOf('wood') > 0)
							{
							if (rKey == 'wood') continue;
							rKey = 'wood';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('wine') > 0)
							{
							if (rKey == 'wine') continue;
							rKey = 'wine';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('marble') > 0)
							{
							if (rKey == 'marble') continue;
							rKey = 'marble';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('glass') > 0)
							{
							if (rKey == 'glass') continue;
							rKey = 'glass';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('sulfur') > 0)
							{
							if (rKey == 'sulfur') continue;
							rKey = 'sulfur';
							foundGoods = true;
							}
						else if (payload[j].src.indexOf('slinger') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('swordsman') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('phalanx') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('archer') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('marksman') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('gyrocopter') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('steamgiant') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('bombardier') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('ram') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('catapult') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('mortar') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('medic') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else if (payload[j].src.indexOf('cook') > 0)
							{
							rKey = '';
							foundArmy = true;
							continue;
							}
						else
							{
							rKey = '';
							continue;
							}
							
						if ((PayloadGoods[rKey] == undefined) && ((rKey == 'wood') || (rKey == 'wine') || (rKey == 'marble') || (rKey == 'glass') || (rKey == 'sulfur')))
							{
							var rAmnt = getIntValue(payload[j].title);
							PayloadGoods[rKey] = rAmnt;
							}
						}
					}
				
				var citySource;
				var cityTarget;
				var quest;
				if (nMi.className.indexOf('gotoown') > 0)
					{
					if (foundArmy == true)
						{
						continue;
						}
					else 
						{
						citySource = Trim(nSource.textContent, true);
						cityTarget = citiesIDs[Trim(nTarget.textContent, true)];
						quest = 'gotoown';
						if (mTimers[nETA.id] == undefined)
							{
							mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
							quest = 'loading';
							}
						else if (nAc.innerHTML == '')
							{
							citySource = Trim(nTarget.textContent, true);
							cityTarget = citiesIDs[Trim(nSource.textContent, true)];
							quest = 'halfturn';
							}
						addTransport(citiesIDs[Trim(nSource.textContent, true)], nETA.id, mTimers[nETA.id]);
						if (foundGoods == false) continue;
						}
					}
				else if (nMi.className.indexOf('returning') > 0)
					{
					quest = 'returning';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
						{
						if (foundGoods == true)
							{
							citySource = Trim(nTarget.textContent, false);
							cityTarget = citiesIDs[Trim(nSource.textContent, true)];
							if (cityTarget == undefined)
								{
								citySource = Trim(nSource.textContent, true);
								cityTarget = citiesIDs[Trim(nTarget.textContent, true)];
								}
							}
						else continue;
						}
					else if ((foundArmy == true) && (foundGoods == false))
						{
						continue;
						}
					else
						{
						if (mTimers[nETA.id] == undefined)
							{
							mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
							quest = 'loading';
							}
						citySource = Trim(nTarget.textContent, false);
						cityTarget = citiesIDs[Trim(nSource.textContent, true)];
						if (foundArmy == false) addTransport(citiesIDs[Trim(nSource.textContent, true)], nETA.id, mTimers[nETA.id]);
						if (foundGoods == false) continue;
						}
					}
				else if (nMi.className.indexOf('gotoforeign') > 0)
					{
					quest = 'gotoforeign';
					if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
						{
						quest = 'plundering';
						if ((mTimers[nETA.id] != undefined) && (mTimers[nETA.id] > EmpireBoard.StartTime))
							{
							takeSomething = true;
							setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]) + (1000*60*15));
							}
						else if ((mTimers[nRET.id] != undefined) && (mTimers[nRET.id] > EmpireBoard.StartTime))
							{
							takeSomething = true;
							setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*15));
							}
						continue;
						}
					else if (foundArmy == true)
						{
						continue;
						}
					else
						{
						if (mTimers[nRET.id] != undefined)
							{
							addTransport(citiesIDs[Trim(nSource.textContent, true)], nETA.id, mTimers[nRET.id]);
							}
						else if (mTimers[nETA.id] != undefined)
							{
							addTransport(citiesIDs[Trim(nSource.textContent, true)], nETA.id, mTimers[nETA.id]);
							}
						else
							{
							addTransport(citiesIDs[Trim(nSource.textContent, true)], nETA.id, EmpireBoard.StartTime + (1000*60*15));
							}
						
						if ((foundGoods == true) && (nAc.innerHTML != ''))
							{
							continue;
							}
						else if ((foundGoods == true) && (nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
							{
							citySource = Trim(nTarget.textContent, false);
							cityTarget = citiesIDs[Trim(nSource.textContent, true)];
							if (mTimers[nRET.id] != undefined)
								{
								mTimers[nETA.id] = mTimers[nRET.id] + (1 * 20 * 60 * 1000);
								}
							else 
								{
								mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
								}
							quest = 'loading';
							}
						else if ((foundGoods == false) && (nAc.innerHTML != ''))
							{
							if (mTimers[nETA.id] != undefined)
								{
								takeSomething = true;
								setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]));
								}
							}
							
						if (foundGoods == false) continue;
						}
					}
				else continue;
				
				if ((foundGoods == true) && (cityTarget != undefined) && (mTimers[nETA.id] != undefined))
					{
					if (config["arrivinggoods"][cityTarget] == undefined) config["arrivinggoods"][cityTarget] = {};
					var idx = nETA.id;
					if (config["arrivinggoods"][cityTarget][idx] == undefined) config["arrivinggoods"][cityTarget][idx] = {};
					config["arrivinggoods"][cityTarget][idx]["startcity"] = citySource;
					if (config["arrivinggoods"][cityTarget][idx]["res"] == undefined) config["arrivinggoods"][cityTarget][idx]["res"] = PayloadGoods;
					config["arrivinggoods"][cityTarget][idx]["quest"] = quest;
					config["arrivinggoods"][cityTarget][idx]["arrivetime"] = parseInt(mTimers[nETA.id]);
					
					if (quest != 'loading')
						{
						setViewRqTime('', cityTarget, parseInt(mTimers[nETA.id]));
						}
					else
						{
						foundLoading = true;
						setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*10));
						}
					}
				}
			}
		
		// disable attention
		if ((foundLoading != true) && (takeSomething != true))
			{
			setViewRqTime('merchantNavy', 0);
			}
			
		config.merchantNavytime = EmpireBoard.StartTime;
		GM_log("Registered merchant transports");
		}
		
  }

/**************************************************************************************************
 * Render tables
 *************************************************************************************************/
function renderTables() {
  setLanguage();
  getLocalizedTexts();
  var TABLE_RESOURCES = getCfgValue("TABLE_RESOURCES", true); //overview table for resources
  var TABLE_BUILDINGS = getCfgValue("TABLE_BUILDINGS", true); //overview table for buildings
  var TABLE_ARMYFLEET = getCfgValue("TABLE_ARMYFLEET", true); //overview table for army and fleet
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters
  GM_addStyle(default_style);
  
  //var nodes = xpath("//select[@id='citySelect']/option"); //cities
	// Fix for v3.1
	var Cities = {};
	EmpireBoard.Ikariam.Fetch_CurrentPlayerCities(Cities);

  var s = "";

  if (TABLE_BUILDINGS) 
	{
	var buildingsCount = [];
	var CityId;
	var i = 0;
	//for (var i = 0; i < nodes.snapshotLength; i++)
	for (CityId in Cities)
		{
		//var city = nodes.snapshotItem(i);
		for (key in buildings)
			{
			var count = getBuildingCount(CityId, key, 0);
			if (buildingsCount[key] == undefined || buildingsCount[key] < count)
				{
				buildingsCount[key] = count;
				}
			}
		i++;
		}

	s += "<div id='EmpireBoardBuildings'><table class='Overview Buildings'>";

	s += "<thead><tr><th class='city_name' nowrap>"+texts["cityName"]+"</th>";
	s += "<th class='actions' nowrap></th>";
	var firstStyle = "lf";
	var buildsNum = 0;
	for (key in buildings) 
		{
		if (buildingsCount[key] > 0)
			{
			// Fix for v3
			var colspan = (buildingsCount[key] > 1) ? ' colspan='+buildingsCount[key] : '';
			s += "<th"+colspan+" class='"+firstStyle+" build_name"+buildingsCount[key]+" "+key+"' nowrap "+createTooltipAttribute(buildings[key][0])+">"+buildings[key][1]+"</th>";
			firstStyle = "";
			buildsNum++;
			}
		}
	if (buildsNum <= 1) s += "<th class='"+firstStyle+"'></th><th></th><th></th><th></th><th></th><th></th>";
	s += "</tr></thead>";

    s += "<tbody>";

	var CityId;
	//for (var i = 0; i < nodes.snapshotLength; i++)
	var i = 0;
	for (CityId in Cities)
		{
		//var city = nodes.snapshotItem(i);
		var res = getCity(CityId);

		var trclass = (parseInt(current_city_id) == parseInt(CityId)) ? "current" : "";
		s += "<tr class='"+trclass+"'>";
		var usedspaces = getCityBuildingsCount(CityId, 0);
		s += "<td class='city_name' nowrap>"+createLinkToChangeCity(Cities[CityId].name, CityId, i, (usedspaces > 0) ? 15-usedspaces : '', 'Green', 'Available free spaces')+"</td>";
		s += "<td class='actions' nowrap>"+createLinkToCityView(CityId)+"</td>";
		var firstStyle = "lf";
		for (key in buildings)
			{
			if (buildingsCount[key] > 0)
				{
				var buildingCount = 0;
				if (res.buildings[key] != undefined)
					{
					if (res.buildings[key].levels == undefined)
						{
						res.buildings[key].levels = {};
						// deprecated
						var position = getBuildingPosition(parseInt(CityId), key, -1);
						var level = getBuildingLevel(parseInt(CityId), key, 0, position);
						res.buildings[key].levels[position] = level;
						}

					var position;
					for (position in res.buildings[key].levels)
						{
						//var position = getArrValue(res.buildings[key], "position", -1);
						//var position = getBuildingPosition(parseInt(CityId), key, -1);

						var currentBuildingStyle = "";
						if ((key == EmpireBoard.Ikariam.View()) && (parseInt(CityId) == city_idmainView) && (position == city_positionmainView))
							{
							currentBuildingStyle = " Bold";
							}

						//var level = getArrValue(res.buildings[key], "level", "-");
						var level = getBuildingLevel(parseInt(CityId), key, '-', position);
						if (level == undefined || level == "" || level == 0)
							{
							level = "-";
							}

						var link = getBuildingLink(parseInt(CityId), key, '-', position);

						if ((res.underConstructionName == key) && (res.underConstructionPosition == position))
							{
							if (level == "-") { level = 0; }
							var underConstructionTime = res.underConstructionTime;
							// deprecated
							if (underConstructionTime == undefined)
								underConstructionTime = res.underConstruction.split(",")[1];
							var sdate = smartDateFormat(underConstructionTime);
							if (underConstructionTime <= EmpireBoard.StartTime)
								{
								var levellink = level;
								if (link != "-")
									levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" cityid="+CityId+">"+level+"</a>";
								levellink += '<sup class=Red title="Require attention">!</sup>';
								levelUpgrading = createTooltip(levellink, sdate, texts["finishedBuilding"]+':' );
								}
							else
								{
								var counter = "<font id='mytimecounter' counter='"+Math.round(underConstructionTime)+"' class='time_counter'>__:__:__</font>";
								var levellink =level+"&raquo;"+(level+1);
								if (link != "-")
									levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" cityid="+CityId+">"+level+"&raquo;"+(level+1)+"</a>";
								if ((level > 0) && (reportViewToSurvey(key, CityId) == '!'))
									{
									levellink += '<sup class=Red title="Require attention">!</sup>';
									}
								else
									{
									levellink += '&nbsp;';
									}
								levelUpgrading = createTooltip(levellink, sdate +' ('+ counter+')', texts["currentlyBuilding"]+':');
								}
							s += "<td class='"+firstStyle+currentBuildingStyle+"'>"+levelUpgrading+"</td>";
							}
						else
							{
							var levellink =level;
							if (level != "-")
								{
								levellink = "<a href='" + link + "' class=changeCity cityid="+CityId+">"+level+"</a>";
								
								if (reportViewToSurvey(key, CityId) == '!')
									{
									levellink += '<sup class=Red title="Require attention">!</sup>';
									}
								else
									{
									levellink += '&nbsp;';
									}
								}
							else
								{
								levellink += '&nbsp;';
								}
							s += "<td class='"+firstStyle+currentBuildingStyle+"'>"+levellink+"</td>";
							}
						buildingCount++;
						firstStyle = "lfd";
						}
					}
				else
					{
					s += "<td class='"+firstStyle+"'>-&nbsp;</td>";
					buildingCount++;
					firstStyle = "lfd";
					}

				if (buildingCount < buildingsCount[key])
					{
					for (var j = buildingCount; j < buildingsCount[key]; j++)
						{
						s += "<td class='"+firstStyle+"'>-&nbsp;</td>";
						firstStyle = "lfd";
						}
					}

				firstStyle = "";
				}
			}
		if (buildsNum <= 1) s += "<td class='"+firstStyle+"'></td><td></td><td></td><td></td><td></td><td></td>";
		s += "</tr>";
		i++;
		}
		
    s += "</tbody>";
	
	s += "<tfoot></tfoot></table>";
    s += "<p class='Caption'>(<span class=Green>1-14</span>) слободна места за нове зграде. (<span class=Red>!</span>) захтевају Вашу пажњу да би освежили преглед.</p>";
	s += "</div>";
	}

  if (TABLE_RESOURCES) {
    s += "<div id='EmpireBoardResources'><table class='Overview Resources'>";
    s += "<thead><tr>";
    s += "<th class='city_name' nowrap>"+texts["cityName"]+"</th>"+
		 "<th class='actions' nowrap>"+createLinkToFinanceNavyViews()+"</th>"+
         "<th colspan=3 class='lf population'>"+texts["Population"]+"</th>"+
         "<th colspan=2 class='lf wood'>"+texts["Wood"]+"</th>"+
         "<th colspan=3 class='lf wine'>"+texts["Wine"]+"</th>"+
         "<th colspan=2 class='lf marble'>"+texts["Marble"]+"</th>"+
         "<th colspan=2 class='lf crystal'>"+texts["Crystal"]+"</th>"+
         "<th colspan=2 class='lf sulfur'>"+texts["Sulfur"]+"</th>"+
         "<th colspan=1 class='lf incomes'>"+texts["Incomes"]+"</th>";
    s += "</tr></thead>";
	
    s += "<tbody>";

    var sumres = new Resource("");
	sumres.spacetotal = 0;
	sumres.growth = 0;
	sumres.Income = 0;
	sumres.reservedGold = '';
    var sumProd = new Resource("");
    sumProd.wineUsage = 0;
    var sumArTr = new Resource("");

    //for (var i = 0; i < nodes.snapshotLength; i++)
	var CityId;
	var i = 0;
	for (CityId in Cities)
	{
      //var city = nodes.snapshotItem(i);
      var res = getCity(CityId);
	  var curres = new Resource("");
	  var arrres = new Resource('');
	  
      var wineUsage;
	  var cellarLevel = getBuildingLevel(CityId, "vineyard", "-");
	  if (res.wineUsageId != undefined)
		{
		wineUsage = tavernWineUsage[res.wineUsageId];
		if (cellarLevel != '-') {
			wineSave = wineUsage * cellarLevel;
			wineSave = Math.round(wineSave / 100);
			wineUsage = wineUsage - wineSave;
			//res.wineUsage = wineUsage ;
			}
		}
      else if (res.wineUsage != undefined) {
        wineUsage = res.wineUsage;
      } else {
	    // on devrait laisser vide, à verifier...
        var tavernLevel = getBuildingLevel(CityId, "tavern", "-");
        wineUsage = (tavernLevel != '-' ? tavernWineUsage[tavernLevel] : 0);
		if (cellarLevel != '-') {
			wineSave = wineUsage * cellarLevel;
			wineSave = Math.round(wineSave / 100);
			wineUsage = wineUsage - wineSave;
			//res.wineUsage = wineUsage ;
			}
      }
	  
      curres.wood = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.wood, res.prodwood);
      curres.wine = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.wine, res.prodwine - wineUsage);
      curres.marble = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.marble, res.prodmarble);
      curres.glass = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.glass, res.prodglass);
      curres.sulfur = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.sulfur, res.prodsulfur);
	  
	  if (res.tradewood == undefined) res.tradewood = 0;
	  if (res.tradewine == undefined) res.tradewine = 0;
	  if (res.trademarble == undefined) res.trademarble = 0;
	  if (res.tradeglass == undefined) res.tradeglass = 0;
	  if (res.tradesulfur == undefined) res.tradesulfur = 0;
	  
	  arrres.wood = getArrivingGoodsSum(CityId, 'wood');
	  arrres.wine = getArrivingGoodsSum(CityId, 'wine');
	  arrres.marble = getArrivingGoodsSum(CityId, 'marble');
	  arrres.glass = getArrivingGoodsSum(CityId, 'glass');
	  arrres.sulfur = getArrivingGoodsSum(CityId, 'sulfur');
	  
      sumres.wood += curres.wood;
      sumres.wine += curres.wine;
      sumres.marble += curres.marble;
      sumres.glass += curres.glass;
      sumres.sulfur += curres.sulfur;
      
      sumProd.wood += res.prodwood;
      sumProd.wine += res.prodwine;
      sumProd.wineUsage += wineUsage;
      sumProd.marble += res.prodmarble;
      sumProd.glass += res.prodglass;
      sumProd.sulfur += res.prodsulfur;
	  
	  sumArTr.wood += res.tradewood + arrres.wood;
	  sumArTr.wine += res.tradewine + arrres.wine;
	  sumArTr.marble += res.trademarble + arrres.marble;
	  sumArTr.glass += res.tradeglass + arrres.glass;
	  sumArTr.sulfur += res.tradesulfur + arrres.sulfur;

	  var Income = getArrValue(res.buildings["townHall"],"incomegold","?");
	  if (Income != "?")
		{
		sumres.Income += Income;
		}
	  var reservedGold = '';
	  if (res.buildings["branchOffice"] != undefined)
		{
		if (res.buildings["branchOffice"].reservedGold == undefined)
			{
			reservedGold = '?';
			}
		else
			{
			reservedGold = res.buildings["branchOffice"].reservedGold;
			if (reservedGold > 0)
				{
				if (sumres.reservedGold == '')
					{
					sumres.reservedGold = reservedGold;
					}
				else
					{
					sumres.reservedGold += reservedGold;
					}
				}
			}
		}

      //var wineRemainingHours = undefined;
	  var wineUsageHtml = ''+wineUsage;
      if (wineUsage > 0)
		{
        //wineRemainingHours = floatFormat(curres.wine / wineUsage, 1) + " h";
        wineUsageHtml = createSimpleProd(-1 * wineUsage);
		}
	  
      var townHallLevel = getBuildingLevel(CityId, "townHall", "?", 0);
      var happiness = getArrValue(res.buildings["townHall"], "happiness", "?");
      var population = res.population;
      var bonusspace = getArrValue(res.buildings["townHall"], "bonusspace", "?");
      var spacetotal = townHallSpaces[townHallLevel];
	  var growth = 0;
      if (happiness != "?")
		{
        population = getEstimatedPopulation(population, res.prodtime, EmpireBoard.StartTime, happiness - population);
        if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace))
			{
			population = parseInt(spacetotal) + parseInt(bonusspace);
			}
        happiness -= population;
		if (happiness != 0) growth = (0.02 * happiness) + 0.01;
		}
	  else
		{
		growth = getArrValue(res.buildings["townHall"], "growth", "?");
		}
      sumres.population += population;
      
      var growthRemainingHours = undefined;
      if (happiness != "?" && happiness > 0 && bonusspace != "?" && growth >= 0.20) {
        growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), EmpireBoard.StartTime, happiness);
      }
	  if ((growth != '?') && (sumres.growth != '?'))
		{
		if (parseInt(population) < parseInt(spacetotal) + parseInt(bonusspace)) sumres.growth += growth;
		}
	  else
		{
		sumres.growth = '?';
		}
		
	  var trclass = "";
      if (parseInt(current_city_id) == parseInt(CityId)) {
		trclass = "current";
      }
	  
      var townHallStyle = "";
      var growthStyle = "";
      if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace))
		{
        if (growth >= 0.20) 
			{
			townHallStyle = " Red";
			}
		else
			{
			townHallStyle = " Bold";
			}
		}
	else if (growth >= 0.20)
		{
		growthStyle = " Green";
		}
		
	  if (growth <= -0.20)
		{
		growthStyle = " Red";
		}
	  
      if (bonusspace != "?") {
		if (sumres.spacetotal != '?') sumres.spacetotal += parseInt(spacetotal) + parseInt(bonusspace);
        //spacetotal = createTooltip(mynumberformat(parseInt(spacetotal) + parseInt(bonusspace)), mynumberformat(spacetotal) + " + " + mynumberformat(bonusspace));
        spacetotal = mynumberformat(parseInt(spacetotal) + parseInt(bonusspace));
      } else {
		sumres.spacetotal = '?';
        spacetotal = mynumberformat(spacetotal) + " + ?";
      }
	  
      var warehouseLevel = getBuildingLevel(CityId,"warehouse", 0, -1);
      var maxcwood = EmpireBoard.Ikariam.Resource_Capacity('wood',warehouseLevel);
      var maxcother = EmpireBoard.Ikariam.Resource_Capacity('wine',warehouseLevel);
	  var maxsafewood = EmpireBoard.Ikariam.Resource_SafeCapacity('wood',warehouseLevel);
	  var maxsafeother = EmpireBoard.Ikariam.Resource_SafeCapacity('wine',warehouseLevel);
	  
	  var cityLink = '';
	  if (reportViewToSurvey('',CityId) == '!')
		{
		cityLink = createLinkToChangeCity(Cities[CityId].name, CityId, i, reportViewToSurvey('',CityId),'Red', 'Require attention');
		}
	  else
		{
		cityLink = createLinkToChangeCity(Cities[CityId].name, CityId, i , res.actions, 'Green', 'Доступни акциони поени');
		}
	  
      s += "<tr class='"+trclass+"' cityid='"+CityId+"'>";
      s += "<td class='city_name' nowrap>"+cityLink+createTransports(CityId)+"</td>"+
		   "<td class='actions' nowrap>"+createLinkToMap(CityId)+"</td>"+
           "<td class='lf"+townHallStyle+"'>"+
			   (population > 0 ? mynumberformat(population) : '?')+
			   "</td>"+
               "<td>"+spacetotal+"</td>"+
               "<td class='"+growthStyle+"'>"+(growth != '?' ? '<img src="'+EmpireBoard.Ikariam.Get_Happiness_ImgSrc(growth)+'" align=left height=18 hspace=2 vspace=0>' : '')+createTooltip(floatFormat(growth,2,true), growthRemainingHours)+"</td>"+
           "<td class='lf' resource='wood'>"+
							  createLinkToResourceCond(true, createResCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, res.tradewood, maxsafewood), res.island_id, CityId, i)+
							  getArrivingGoods(CityId, "wood", res.tradewood, curres.wood, arrres.wood)+
							  createResProgressBar(res.prodtime, res.wood + arrres.wood, res.prodwood, maxcwood - res.tradewood, maxsafewood)+
							  "</td>"+
               "<td>"+createProd(res.prodwood)+"</td>"+
           "<td class='lf' resource='wine'>"+
							  createLinkToTradegoodCond((res.prodwine > 0) || (res.prodgood == 'wine'), createResCounter(res.prodtime, res.wine, res.prodwine - wineUsage, true, maxcother, res.tradewine, maxsafeother), res.island_id, CityId, i)+
							  getArrivingGoods(CityId, "wine", res.tradewine, curres.wine, arrres.wine)+
							  createResProgressBar(res.prodtime, res.wine + arrres.wine, res.prodwine - wineUsage, maxcother - res.tradewine, maxsafeother)+
							  "</td>"+
               "<td>"+createSimpleProd(res.prodwine)+"</td>"+
               "<td>"+wineUsageHtml+"</td>"+
           "<td class='lf' resource='marble'>"+
							  createLinkToTradegoodCond((res.prodmarble > 0) || (res.prodgood == 'marble'), createResCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, res.trademarble, maxsafeother), res.island_id, CityId, i)+
							  getArrivingGoods(CityId, "marble", res.trademarble, curres.marble, arrres.marble)+
							  createResProgressBar(res.prodtime, res.marble + arrres.marble, res.prodmarble, maxcother - res.trademarble, maxsafeother)+
							  "</td>"+
               "<td>"+createProd(res.prodmarble)+"</td>"+
           "<td class='lf' resource='glass'>"+
							  createLinkToTradegoodCond((res.prodglass > 0) || (res.prodgood == 'glass'), createResCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, res.tradeglass, maxsafeother), res.island_id, CityId, i)+
							  getArrivingGoods(CityId, "glass", res.tradeglass, curres.glass, arrres.glass)+
							  createResProgressBar(res.prodtime, res.glass + arrres.glass, res.prodglass, maxcother - res.tradeglass, maxsafeother)+
							  "</td>"+
               "<td>"+createProd(res.prodglass)+"</td>"+
           "<td class='lf' resource='sulfur'>"+
							  createLinkToTradegoodCond((res.prodsulfur > 0) || (res.prodgood == 'sulfur'), createResCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, res.tradesulfur, maxsafeother), res.island_id, CityId, i)+
							  getArrivingGoods(CityId, "sulfur", res.tradesulfur, curres.sulfur, arrres.sulfur)+
							  createResProgressBar(res.prodtime, res.sulfur + arrres.sulfur, res.prodsulfur, maxcother - res.tradesulfur, maxsafeother)+
							  "</td>"+
               "<td>"+createProd(res.prodsulfur)+"</td>"+
           "<td class='lf'>"+
							createIncome(Income)+
							createReservedGold(reservedGold)+
							"</td>";
      s += "</tr>";
	 i++;
    }
	
    s += "</tbody>";
	
	var goldRemainingHours = '';
	var goldStyle = '';
	if (sumres.Income < 0) 
		{
		var RemainingHours = -1 * config.gold / sumres.Income;
		if (RemainingHours <= 72) goldStyle = 'Red';
		goldRemainingHours = floatFormat(RemainingHours, 1) + " h";
		}
	
    s += "<tfoot><tr>";
    s += "<td nowrap colspan=2>"+texts["summary"]+"</td>"+
         "<td class='lf'>"+mynumberformat(sumres.population)+"</td>"+
         "<td>"+mynumberformat(sumres.spacetotal)+"</td>"+
         "<td>"+floatFormat(sumres.growth,2,true)+"</td>"+
         "<td class='lf'>"+
							createResCounter(EmpireBoard.StartTime, sumres.wood, sumProd.wood)+
							createMoreGoods(sumArTr.wood)+
							"</td>"+
         "<td>"+createProd(sumProd.wood)+"</td>"+
         "<td class='lf'>"+
							createResCounter(EmpireBoard.StartTime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+
							createMoreGoods(sumArTr.wine)+
							"</td>"+
         "<td>"+createSimpleProd(sumProd.wine)+"</td>"+
         "<td>"+createSimpleProd(-1 * sumProd.wineUsage)+"</td>"+
         "<td class='lf'>"+
							createResCounter(EmpireBoard.StartTime, sumres.marble, sumProd.marble)+
							createMoreGoods(sumArTr.marble)+
							"</td>"+
         "<td>"+createProd(sumProd.marble)+"</td>"+
         "<td class='lf'>"+
							createResCounter(EmpireBoard.StartTime, sumres.glass, sumProd.glass)+
							createMoreGoods(sumArTr.glass)+
							"</td>"+
         "<td>"+createProd(sumProd.glass)+"</td>"+
         "<td class='lf'>"+
							createResCounter(EmpireBoard.StartTime, sumres.sulfur, sumProd.sulfur)+
							createMoreGoods(sumArTr.sulfur)+
							"</td>"+
         "<td>"+createProd(sumProd.sulfur)+"</td>"+
         "<td class='lf'>"+
			createIncome(sumres.Income, goldRemainingHours, goldStyle)+
			createReservedGold(sumres.reservedGold)+
			"</td>";
    s += "</tr></tfoot>";
    s += "</table>";
    s += "<p class='Caption'>(<span class=Green>1-9</span>) доступни акциони поени. (<span class=Red>!</span>) захтебају Важу пажњу да би освежите преглед. (<img src='skin/layout/icon-wall.gif' class='Safe' />) ресурси сигурни од пљачке. (<span class=Green>*</span>) достављени ресурси.</p>";
	s += "</div>";
  }

  if (TABLE_ARMYFLEET)
	{
	var usedIndexes = [];
	var usedIndexesCount = 0;
	if (config["unitnames"] != undefined)
		{
		var names = config["unitnames"];
		var CityId;
		//for(var i = 0; i < nodes.snapshotLength; i++)
		var i = 0;
		for (CityId in Cities)
			{
			//var city = nodes.snapshotItem(i);
			var res = getCity(CityId);

			for(key in names)
				{
				if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0)
					{
					usedIndexes[key] = 1;
					usedIndexesCount++;
					}
				else if (parseInt(getArrValue(getArrValue(res.units, key), "construction", 0)) > 0)
					{
					usedIndexes[key] = 1;
					usedIndexesCount++;
					}
				}
			i++;
			}
		}

	s += "<div id='EmpireBoardArmy'><table class='Overview Army'>";
	s += "<thead><tr><th class='city_name' nowrap>"+texts["cityName"]+"</th>";
	s += "<th class='actions' nowrap>"+createLinkToMilitaryAdvisorView()+"</th>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "lf";
		for(key in names)
			{
			var name = names[key];
			if (usedIndexes[key] == 1) 
				{
				s += "<th class='"+firstStyle+" unit_name "+TrimUnitID(key)+"' nowrap "+createTooltipAttribute(name)+">"+Trim(name)+"</th>";
				firstStyle = "";
				}
			}
		}
	else s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th><th></th>";
	s += "</tr></thead>";

    s += "<tbody>";
	
	var sum = [];
	var sumConstruction = [];
	var CityId;
	var i = 0;
	//for(var i = 0; i < nodes.snapshotLength; i++)
	for (CityId in Cities)
		{
		//var city = nodes.snapshotItem(i);
		var res = getCity(CityId);

		var trclass = (parseInt(current_city_id) == parseInt(CityId)) ? "current" : "";
		s += "<tr class='"+trclass+"'>";
		s += "<td class='city_name' nowrap>"+
										createLinkToChangeCity(Cities[CityId].name, CityId, i, res.actions, 'Green', 'Доступни акциони поени')+
										createMovements(CityId)+
										"</td>";
		s += "<td class='actions' nowrap>"+createLinkToMilitaryView(CityId)+"</td>";
		if (usedIndexesCount > 0)
			{
			var firstStyle = "lf";
			for(key in names)
				{
				if (usedIndexes[key] == 1) {
					var unitCount = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);
					if (unitCount == 0)
						{
						unitCount = "-";
						}
					else
						{
						sum[key] = (sum[key] == undefined) ? unitCount : sum[key] + unitCount;
						}
					var unitConstructionHTML = '<font class="More">-</font>';
					var unitConstruction = getIntValue(getArrValue(getArrValue(res.units, key), "construction", "0"), 0);
					if (unitConstruction > 0)
						{
						unitConstructionHTML = '<font class="More" title="'+texts["currentlyBuilding"]+'">'+mynumberformat(unitConstruction, true)+'</font>';
						sumConstruction[key] = (sumConstruction[key] == undefined) ? unitConstruction : sumConstruction[key] + unitConstruction;
						}
					
					s += "<td class='"+firstStyle+"'>"+
										mynumberformat(unitCount)+
										unitConstructionHTML+
										"</td>";
					firstStyle = "";
					}
				}
			}
		else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td>";
		s += "</tr>";
		i++;
		}
		
    s += "</tbody>";
	
	s += "<tfoot><tr>";
	s += "<td colspan=2>"+texts["summary"]+"</td>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "lf";
		for(key in names)
			{
			if (usedIndexes[key] == 1)
				{
				var unitConstructionHTML = '<font class="More">-</font>';
				if (sumConstruction[key] > 0)
					{
					unitConstructionHTML = '<font class="More">'+mynumberformat(sumConstruction[key], true)+'</font>';
					}
				s += "<td class='"+firstStyle+"'>"+
								mynumberformat(sum[key])+
								unitConstructionHTML+
								"</td>";
				firstStyle = "";
				}
			}
		}
	else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td>";
	s += "</tr></tfoot>";
	s += "</table>";
    s += "<p class='Caption'>(<span class=Green>1-9</span>) доступни акциони поени. (<span class=Red>!</span>) захтевају Вашу пажњу да би освежили преглед.</p>";
	s + "</div>";
	}

  var body = getNode("//body");
  var table_mode = "new_table";
  var span = document.getElementById("EmpireBoard");
  if (span == null) {
    span = document.createElement('div');
    span.id = "EmpireBoard";
	span.setAttribute("version", EmpireBoard.Version);
	span.align = "center";
	if (langtype == "rf")
		{
		span.setAttribute("dir", "rtl");
		span.setAttribute("class", "RtoL");
		}
    span.innerHTML = s;
    body.appendChild(span);
  } else {
	span.align = "center";
	if (langtype == "rf")
		{
		span.setAttribute("dir", "rtl");
		span.setAttribute("class", "RtoL");
		}
    span.innerHTML = s;
    table_mode = "new_table";
  }

  //settings table
    function reset_all_data() {
      var answer = confirm("Are you sure you want to delete ALL stored data?");
      if (answer) {
        setVar("config", "");
        window.location.href = window.location.href;
      }
    }
    function myChkEventHandler() {
      this.value = (this.value == '1' ? '0' : '1');
      config.cfg[this.lang] = (this.value == '1');
      setVar("config", serialize(config));
    }
    function myChgEventHandler() {
      config.cfg[this.lang] = this.value;
      setVar("config", serialize(config));
    }
    function createChk(propertyName, propertyValue) {
      var btn = document.createElement('input');
      btn.type = "checkbox";
      btn.lang = propertyName;
      btn.value = (propertyValue == true ? '1' : '0');
      if (propertyValue == true) {
        btn.checked = "checked";
      }
      btn.addEventListener('click', myChkEventHandler, false);
      return btn;
    }
    function createInp(propertyName, propertyValue) {
      var btn = document.createElement('input');
      btn.type = "text";
      btn.lang = propertyName;
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createTxtr(propertyName, propertyValue, rows, cols) {
      var btn = document.createElement('textarea');
      btn.cols = (cols != undefined) ? cols : 50;
      btn.rows = (rows != undefined) ? rows : 15;
      btn.lang = propertyName;
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createSlct(propertyName, propertyValue, items) {
      var btn = document.createElement('select');
      btn.lang = propertyName;
      for(key in items) {
        var o = document.createElement("option");
        o.value = key;
        o.text = items[key];
        btn.add(o, null);
      }
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createRow(title, input) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute("align", "right");
      td.setAttribute("style", "border-style: dotted; border-width: 1px;");
      td.innerHTML = title;
      tr.appendChild(td);
      var td = document.createElement('td');
      td.setAttribute("align", "left");
      td.setAttribute("style", "border-style: dotted; border-width: 1px;");
      td.appendChild(input);
      tr.appendChild(td);
      return tr;
    }
    function createRowChk(title, propertyName, propertyValue) {
      return createRow(title, createChk(propertyName, propertyValue));
    }
    function createRowInput(title, propertyName, propertyValue) {
      return createRow(title, createInp(propertyName, propertyValue));
    }
    function createRowTxtr(title, propertyName, propertyValue, rows, cols) {
      return createRow(title, createTxtr(propertyName, propertyValue, rows, cols));
    }
    function createRowSlct(title, propertyName, propertyValue, items) {
      return createRow(title, createSlct(propertyName, propertyValue, items));
    }

    var t = document.createElement('table');
    t.id = "EmpireBoardSettings";
    t.setAttribute("style", "display: none;");
    t.appendChild(createRowChk("Прикажи табелу са ресурсима:", "TABLE_RESOURCES", TABLE_RESOURCES));
    t.appendChild(createRowChk("Прикажи тебелу са зградама:", "TABLE_BUILDINGS", TABLE_BUILDINGS));
    t.appendChild(createRowChk("Прикажи табелу са трупама и флотом:", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
    t.appendChild(createRowSlct("Resource progress bar mode:", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: "off", time: "based on remaining time", percent: "based on fullness percentage"}));
    t.appendChild(createRowSlct("Language:", "LANGUAGE", language, {"": "Automatic from server name",ae: "العربية", en: "English", hu: "Magyar", de: "Deutsch", cz: "Czech", tr: "Turkish", es: "Espanol", ba: "Bosnian", it: "Italiano", pt: "Portuguese", fr: "Français", pl: "Polish", ro: "Romanian", gr: "Greek", cn: "Chinese", nl: "Dutch", cz: "Czech", vn: "Vietnamese", tw: "Chinese (traditional)", fi: "Finnish", se: "Swedish", il: "Hebrew"}));
    
    var tr = document.createElement('tr');
    t.appendChild(tr);
    var td = document.createElement('td');
    tr.appendChild(td);
    td.setAttribute("colspan", "2");
    var buttonsPanel = document.createElement('div');
    td.appendChild(buttonsPanel);
    
    //save button, bugged
	/*
var n = document.createElement('input');
n.type = "button";
n.value = "Refresh table";
n.setAttribute("class", "button");
n.setAttribute("style", "display: inline !important;");
n.addEventListener("click", renderTables, false);
buttonsPanel.appendChild(n);
	*/

    //reset button
    var n = document.createElement('input');
    n.type = "button";
    n.value = "Reset all data";
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", reset_all_data, false);
    buttonsPanel.appendChild(n);

    if (table_mode == "new_table") {
      //show / hide button
	  function show_hide_table() {
        var n = document.getElementById("EmpireBoardSettings");
        if (n.style.display == 'none') {
          n.style.display = 'table';
          this.value = texts["hide_settings"];
        } else {
          n.style.display = 'none';
          this.value = texts["show_settings"];
        }
      }
	  
      //now adds table
      span.appendChild(t);
	  
	  var p = document.createElement('p');
      p.setAttribute("class", "Footer");
	  
	  var n = document.createElement('span');
	  n.innerHTML = 'Powered by <a href="http://userscripts.org/scripts/show/50366" target="_blank"><b>Ikariam Empire Board</b></a> (<i>v. ' + EmpireBoard.Version + '</i>) ';
      p.appendChild(n);
	  
      var n = document.createElement('input');
      n.type = "button";
      n.value = texts["show_settings"];
      n.setAttribute("class", "button");
      n.addEventListener("click", show_hide_table, false);
      p.appendChild(n);
	  
	  // footer
	  span.appendChild(p);
    }
	
  //myTimeCounterF(200, true); 
}

function Trim(str, strict)
	{ 
	str = str.replace(/&nbsp;/gi, " ");
	str = str.replace(/\t/gi, " ");
	str = str.replace(/\v/gi, "");
	str = str.replace(/\f/gi, "");
	str = str.replace(/\n/gi, "");
	str = str.replace(/\r/gi, "");
	//str = str.replace(/\e/gi, "");
	str = str.replace(/\s/gi, " ");
	if ((strict == undefined) || (strict == true))
		{
		str = str.replace(/\[.+\]/gi, "");
		str = str.replace(/\(.+\)/gi, "");
		}
	while(str.charAt(0) == (" ") ){ 
		str = str.substring(1);
		}
	while(str.charAt(str.length-1) == " " ){ 
		str = str.substring(0,str.length-1);
		}
	return str;
	}
	
function TrimUnitID(str)
	{
	str = str.replace("unit", "");
	str = str.replace("currentUnit", "");
	 
	return Trim(str, false);
	}

function TrimIsland100(str){
	var a = str.indexOf('[');
	var b = str.indexOf(']');
	str = str.substring(a+1,b);
	var coords = str.split(':');
	res = '[';
	res += twodigit(coords[0].substr(-2,2));
	res += ':';
	res += twodigit(coords[1].substr(-2,2));
	res += ']';
	return res;
}

// the tooltip object
EmpireBoard.Tooltip =
	{
	_Parent: null,
    // setup properties of tooltip object
    id:"EmpireBoardTooltip",
    offsetx : 10,
    offsety : 10,
    _x : 0,
    _y : 0,
    _tooltipElement:null,
    _saveonmouseover:null
	};
	
EmpireBoard.Tooltip.Init = function(parent)
	{
	if (parent != undefined) this._Parent = parent;
	
	// tooltip for GreaseMonkey
	var body = document.getElementById("EmpireBoard");
	var tooltipdiv = document.createElement('div');
	tooltipdiv.id = "EmpireBoardTooltip";
	tooltipdiv.innerHTML = "";
	tooltipdiv.style.visibility = 'hidden';
	body.appendChild(tooltipdiv);
	};

EmpireBoard.Tooltip.innerHTML = function (Content, Title)
	{
	if (Content == undefined || Content == "")
		{
		return "";
		}
	else
		{
		var innerHTML = '';
		if (Title == undefined || Title == "")
			{
			Title = "";
			}
		else Title = "<div class=TTTitle>"+Title+"</div>";
		
		if (langtype == "rf")
			{
			innerHTML = "<div dir=rtl class='TTContent RtoL'>"+Title+Content+"</div>";
			}
		else
			{
			innerHTML = "<div class=TTContent>"+Title+Content+"</div>";
			}
		
		return innerHTML;
		}
	};

EmpireBoard.Tooltip.show = function (htmlelement)
	{
	if(document.getElementById)
		{
        EmpireBoard.Tooltip._tooltipElement = document.getElementById(EmpireBoard.Tooltip.id);
		}
	else if ( document.all )
		{
        EmpireBoard.Tooltip._tooltipElement = document.all[EmpireBoard.Tooltip.id].style;
		}
	
    EmpireBoard.Tooltip._tooltipElement.innerHTML = htmlelement;

    EmpireBoard.Tooltip.moveTo(EmpireBoard.Tooltip._x + EmpireBoard.Tooltip.offsetx , EmpireBoard.Tooltip._y + EmpireBoard.Tooltip.offsety);

    if (EmpireBoard.Tooltip._tooltipElement.style)
		{
        EmpireBoard.Tooltip._tooltipElement.style.visibility ="visible";
		}
	else
		{
        EmpireBoard.Tooltip._tooltipElement.visibility = "visible";
		}
	return false;
	};

EmpireBoard.Tooltip.hide = function(e)
	{
    if(EmpireBoard.Tooltip._tooltipElement.style){
        EmpireBoard.Tooltip._tooltipElement.style.visibility ="hidden";
    }else{
        EmpireBoard.Tooltip._tooltipElement.visibility = "hidden";
    }
	};

// Moves the tooltip element
EmpireBoard.Tooltip.mouseMove = function(e)
	{
   // we don't use "this" because this method is assign to an event of document
   // and so is dereferenced
    if(e == undefined)
        e = event;

    if( e.pageX != undefined){ // gecko, konqueror,
        EmpireBoard.Tooltip._x = e.pageX;
        EmpireBoard.Tooltip._y = e.pageY;
    }else if(event != undefined && event.x != undefined && event.clientX == undefined){ // ie4 ?
        EmpireBoard.Tooltip._x = event.x;
        EmpireBoard.Tooltip._y = event.y;
    }else if(e.clientX != undefined ){ // IE6,  IE7, IE5.5
        if(document.documentElement){
            EmpireBoard.Tooltip._x = e.clientX + ( document.documentElement.scrollLeft || document.body.scrollLeft);
            EmpireBoard.Tooltip._y = e.clientY + ( document.documentElement.scrollTop || document.body.scrollTop);
        }else{
            EmpireBoard.Tooltip._x = e.clientX + document.body.scrollLeft;
            EmpireBoard.Tooltip._y = e.clientY + document.body.scrollTop;
        }
    /*}else if(event != undefined && event.x != undefined){ // IE6,  IE7, IE5.5
        tooltip.x = event.x + ( document.documentElement.scrollLeft || document.body.scrollLeft);
        tooltip.y = event.y + ( document.documentElement.scrollTop || document.body.scrollTop);
    */
    }else{
        EmpireBoard.Tooltip._x = 0;
        EmpireBoard.Tooltip._y = 0;
    }
	
	var MovX = EmpireBoard.Tooltip._x + EmpireBoard.Tooltip.offsetx;
	var MovY = EmpireBoard.Tooltip._y - EmpireBoard.Tooltip.offsety - EmpireBoard.Tooltip.GetDivH(EmpireBoard.Tooltip._tooltipElement);
	
    EmpireBoard.Tooltip.moveTo( MovX , MovY);
	};
	
EmpireBoard.Tooltip.GetDivH = function(el)
	{
	return (el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
	};

// Move the tooltip element
EmpireBoard.Tooltip.moveTo = function(xL,yL)
	{
    if (EmpireBoard.Tooltip._tooltipElement.style)
		{
        EmpireBoard.Tooltip._tooltipElement.style.left = xL +"px";
        EmpireBoard.Tooltip._tooltipElement.style.top = yL +"px";
		}
	else
		{
        EmpireBoard.Tooltip._tooltipElement.left = xL;
        EmpireBoard.Tooltip._tooltipElement.top = yL;
		}
	};

if ((EmpireBoard.Ikariam.View() != '') && (EmpireBoard.Ikariam.View() != 'errorLoggedOut') && (EmpireBoard.Ikariam.View() != 'options') && (EmpireBoard.Ikariam.View() != 'highscore'))
	{
	// Fix for v3
	var body = getNode("//body");
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "/js/wz_tooltip.js";
	body.appendChild(script);

	renderTables();
	
	EmpireBoard.Tooltip.Init();

	setVar("config", serialize(config));
	
	applyChangeCityEvents();
	applyArrivingGoodEvents();

	window.setInterval(myTimeCounterF, 1000);
	window.setInterval(realtimeFactDisplayF, 5000);

	}
EmpireBoard.EndTime = new Date().getTime();
GM_log('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime)/1000)+'s');
