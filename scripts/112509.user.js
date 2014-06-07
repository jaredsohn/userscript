// ==UserScript==
// @name           Ikariam Manager Skin
// @namespace      manager.ikariam
// @description    Add graphics to Ikariam Manager 
// @icon           http://s3.amazonaws.com/uso_ss/icon/76873/large.png
// @version        0.1
// @author         bluesman
// @include        http://s*.ikariam.*/*
// @include        http://s*.*.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var skin = {
	'url' 		: 'skin/img/city/',
	'prefix' 	: 'building_',
	'extension' : '.gif',
	'height' 	: '60px'
};

var skin_buildings = {
	'townHall'		: ['townhall', '', ''],
	'temple'		: ['temple', '', ''],
	'academy'		: ['academy', '-50px top', ''],
	'port'			: ['port', '-40px -50px', ''],
	'shipyard'		: ['shipyard', '', ''],
	'warehouse'		: ['warehouse', 'center top', ''],
	'dump'			: ['dump', 'center top', ''],
	'wall'			: ['wall', 'bottom left', ''],
	'tavern'		: ['tavern', '-20px top', ''],
	'museum'		: ['museum', '', ''],
	'palace'		: ['palace', '', ''],
	'palaceColony'	: ['palaceColony', '', ''],
	'embassy'		: ['embassy', '', ''],
	'branchOffice'	: ['branchOffice', '', ''],
	'safehouse'		: ['safehouse', '', ''],
	'barracks'		: ['barracks', '', ''],
	'workshop'		: ['workshop', '-10px center', ''],
	'carpentering'	: ['carpentering', '', ''],
	'forester'		: ['forester', '', ''],
	'stonemason'	: ['stonemason', '', ''],
	'glassblowing'	: ['glassblowing', '-30px -20px', ''],
	'winegrower'	: ['winegrower', '-30px -20px', 'margin-left:-0px;'],
	'alchemist'		: ['alchemist', '', ''],
	'architect'		: ['architect', '', ''],
	'optician'		: ['optician', 'center top', ''],
	'vineyard'		: ['vineyard', '-50px -20px', ''],
	'fireworker'	: ['fireworker', '', '']
};

GM_addStyle (".buildingThumb     { height: " + skin.height + "; max-width:100%; overflow:hidden; text-align: center; display:block; vertical-align: middle; }");
GM_addStyle (".buildingThumb IMG { max-height: " + skin.height + "; }");
GM_addStyle (".buildingName 	{ display: none; ");

for (var key in skin_buildings)
{
	var extras = skin_buildings[key][1];
	if (extras == '')
	{
		extras = 'center center';
	}
	GM_addStyle("#IkariamManagerBuildings #building_header_" + key + " { background:url(" + skin.url + skin.prefix + skin_buildings[key][0] + skin.extension + ") " + extras + " no-repeat; " + skin_buildings[key][2] +"} ");
}

var skin_style = <><![CDATA[
#IkariamManager { width: 980px; margin: 0 auto; font-family: Vedrana, sans-serif; }
#IkariamManager table.Overview th { padding: 0.2em 0; }
]]></>.toXMLString();

GM_addStyle(skin_style);
