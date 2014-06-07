// coding: utf-8
// ==UserScript==
// @name        Ikariam Medieval Theme
// @version 	0.4.1
// @icon		http://img121.imageshack.us/img121/4765/iconrr.png
// @author		bluesman ( http://userscripts.org/users/165018 )
// @homepage	http://userscripts.org/scripts/show/77049
// @description	Ikariam skin to replace original Ikariam artwork with medieval ambience
// @namespace	medieval.ikariam
// @include		http://s*.ikariam.*
// @exclude		http://support.ikariam.*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// @resource	mayor				http://www.speedbadminton.rs/ikariam/mayor.png
// @resource	mayor_active 		http://www.speedbadminton.rs/ikariam/mayor_active.png
// @resource	general				http://www.speedbadminton.rs/ikariam/general.png
// @resource	general_active		http://www.speedbadminton.rs/ikariam/general_active.png
// @resource	general_alert		http://www.speedbadminton.rs/ikariam/general_alert.png
// @resource	scientist			http://www.speedbadminton.rs/ikariam/scientist.png
// @resource	scientist_active 	http://www.speedbadminton.rs/ikariam/scientist_active.png
// @resource	diplomat 			http://www.speedbadminton.rs/ikariam/diplomat.png
// @resource	diplomat_active		http://www.speedbadminton.rs/ikariam/diplomat_active.png
// @resource	unit_swordsman		http://www.speedbadminton.rs/ikariam/units/swordsman_r_120x100.png
// @resource	unit_spearman		http://www.speedbadminton.rs/ikariam/units/spearman_r_120x100.png
// @resource	unit_phalanx		http://www.speedbadminton.rs/ikariam/units/phalanx_r_120x100.png
// @resource	unit_archer			http://www.speedbadminton.rs/ikariam/units/archer_r_120x100.png
// @resource	unit_ram			http://www.speedbadminton.rs/ikariam/units/ram_r_120x100.png
// @resource	unit_catapult		http://www.speedbadminton.rs/ikariam/units/catapult_r_120x100.png
// @resource	unit_steamgiant		http://www.speedbadminton.rs/ikariam/units/steamgiant_r_120x100.png
// @resource	unit_cook			http://www.speedbadminton.rs/ikariam/units/cook_r_120x100.png
// @resource	unit_medic			http://www.speedbadminton.rs/ikariam/units/medic_r_120x100.png
// @resource	building_townhall		http://www.speedbadminton.rs/ikariam/building_townhall.png
// @resource	building_palace			http://www.speedbadminton.rs/ikariam/building_palace.png
// @resource	building_palaceColony	http://www.speedbadminton.rs/ikariam/building_palaceColony.png
// @resource	building_embassy		http://www.speedbadminton.rs/ikariam/building_embassy.png
// @resource	building_academy		http://www.speedbadminton.rs/ikariam/building_academy.png
// @resource	building_tavern			http://www.speedbadminton.rs/ikariam/building_tavern.png
// @resource	building_wall			http://www.speedbadminton.rs/ikariam/building_wall.png
// @resource	building_museum			http://www.speedbadminton.rs/ikariam/building_museum.png
// @resource	building_safehouse		http://www.speedbadminton.rs/ikariam/building_safehouse.png
// @resource	building_barracks		http://www.speedbadminton.rs/ikariam/building_barracks.png
// @resource	building_warehouse		http://www.speedbadminton.rs/ikariam/building_warehouse.png
// @resource	building_glassblowing	http://www.speedbadminton.rs/ikariam/building_glassblowing.png
// @resource	building_alchemist		http://www.speedbadminton.rs/ikariam/building_alchemist.png
// @resource	building_architect		http://www.speedbadminton.rs/ikariam/building_architect.png
// @resource	building_winegrower		http://www.speedbadminton.rs/ikariam/building_winegrower.png
// @resource	building_vineyard		http://www.speedbadminton.rs/ikariam/building_vineyard.png
// @resource	building_fireworker		http://www.speedbadminton.rs/ikariam/building_fireworker.png
// @resource	building_optician		http://www.speedbadminton.rs/ikariam/building_optician.png
// @resource	building_port			http://www.speedbadminton.rs/ikariam/building_port.png
// @resource	building_shipyard		http://www.speedbadminton.rs/ikariam/building_shipyard.png
// @resource	building_temple			http://www.speedbadminton.rs/ikariam/building_temple.png
// @resource	building_workshop		http://www.speedbadminton.rs/ikariam/building_workshop.png
// @resource	building_forester		http://www.speedbadminton.rs/ikariam/building_forester.png
// @resource	building_branchOffice	http://www.speedbadminton.rs/ikariam/building_branchOffice.png
// @resource	building_stonemason		http://www.speedbadminton.rs/ikariam/building_stonemason.png
// @resource	building_carpentering	http://www.speedbadminton.rs/ikariam/building_carpentering.png
// @resource	bg_body 				http://www.speedbadminton.rs/ikariam/bg/bg_stone.jpg
// @resource	bg_container2			http://www.speedbadminton.rs/ikariam//bg/bg_content.png
// @resource	bg_footer				http://www.speedbadminton.rs/ikariam/bg/bg_footer.png
// @resource	bg_extraDiv2			http://www.speedbadminton.rs/ikariam/bg/bg_ocean.jpg
// @resource	bg_extraDiv1			http://www.speedbadminton.rs/ikariam/bg/bg_sky.jpg
// @resource	bg_header				http://www.speedbadminton.rs/ikariam/bg/bg_header.jpg
// @resource	bg_day_city_level1		http://www.speedbadminton.rs/ikariam/bg/day/city_level1.jpg
// @resource	bg_day_city_level2		http://www.speedbadminton.rs/ikariam/bg/day/city_level2.jpg
// @resource	bg_day_city_level3		http://www.speedbadminton.rs/ikariam/bg/day/city_level3.jpg
// @resource	bg_day_city_level4		http://www.speedbadminton.rs/ikariam/bg/day/city_level4.jpg
// @resource	bg_day_city_level5		http://www.speedbadminton.rs/ikariam/bg/day/city_level5.jpg
// @resource	bg_day_city_level6		http://www.speedbadminton.rs/ikariam/bg/day/city_level6.jpg
// @resource	bg_day_city_level7		http://www.speedbadminton.rs/ikariam/bg/day/city_level7.jpg
// @resource	bg_day_city_level8 		http://www.speedbadminton.rs/ikariam/bg/day/city_level8.jpg
// @resource	bg_day_city_level9		http://www.speedbadminton.rs/ikariam/bg/day/city_level9.jpg
// @resource	bg_day_city_level10		http://www.speedbadminton.rs/ikariam/bg/day/city_level10.jpg
// @resource	bg_day_city_level11		http://www.speedbadminton.rs/ikariam/bg/day/city_level11.jpg
// @resource	bg_day_city_level12		http://www.speedbadminton.rs/ikariam/bg/day/city_level12.jpg
// @resource	bg_day_city_level13		http://www.speedbadminton.rs/ikariam/bg/day/city_level13.jpg
// @resource	bg_day_city_level14		http://www.speedbadminton.rs/ikariam/bg/day/city_level14.jpg
// @resource	bg_day_city_level15		http://www.speedbadminton.rs/ikariam/bg/day/city_level15.jpg
// @resource	bg_day_city_level16		http://www.speedbadminton.rs/ikariam/bg/day/city_level16.jpg
// @resource	bg_day_city_level17		http://www.speedbadminton.rs/ikariam/bg/day/city_level17.jpg
// @resource	bg_day_city_level18		http://www.speedbadminton.rs/ikariam/bg/day/city_level18.jpg
// @resource	bg_day_city_level19		http://www.speedbadminton.rs/ikariam/bg/day/city_level19.jpg
// @resource	bg_day_city_level20		http://www.speedbadminton.rs/ikariam/bg/day/city_level20.jpg
// @resource	bg_day_city_level21		http://www.speedbadminton.rs/ikariam/bg/day/city_level21.jpg
// @resource	bg_day_city_level22		http://www.speedbadminton.rs/ikariam/bg/day/city_level22.jpg
// @resource	bg_day_city_level23		http://www.speedbadminton.rs/ikariam/bg/day/city_level23.jpg
// @resource	bg_day_city_level24		http://www.speedbadminton.rs/ikariam/bg/day/city_level24.jpg
//
//-----------------------------
// CHANGELOG
//
// @history 0.3.3 removed annoying images for ambrosia and facebook in v0.4.0
// @history 0.3.2 two more buildings and new feature: different building for different city level
// @history 0.3.1 active advisor bug fix
// @history 0.3.0 units and more buildings
// @history 0.2.3 couple more graphics and some cosmetics
// @history 0.2.2 added jqeury as required, added building replacement in buildingGround view
// @history 0.2.1 new graphics
// @history 0.2.0 changed some interface images
// @history 0.1.0 initial version
//
// ==/UserScript==

Skin = {
	view : '',			// current view
	position : '',		// current building position
	cityLevel : 0,		// currentu city level
	timeOfDay : 'day',	// time of day
	hour : 12,			// default hour

	// time of day settings (hours)
	todSettings : {
		// night is from 0:00
		morning: 7,		// from 7 am to "day"
		day : 8,		// from 8 am to "evening"
		evening: 19,	// from 7 pm to "night"
		night: 20		// from 8 pm (until midnigt, and then from 0 to morning)
	},

	// where all images are
	url : 'http://www.speedbadminton.rs/ikariam/',

	// parent container
	parentElement : '#city #container #mainview #locations ',

	// list of buildings to replace
	buildings : [
		{ 'name' : 'townHall',		'res' : 'building_townhall' },
		{ 'name' : 'palace',		'res' : 'building_palace' },
		{ 'name' : 'palaceColony',	'res' : 'building_palaceColony' },
		{ 'name' : 'embassy',		'res' : 'building_embassy' },
		{ 'name' : 'academy',		'res' : 'building_academy' },
		{ 'name' : 'tavern',		'res' : 'building_tavern' },
		{ 'name' : 'wall',			'res' : 'building_wall' },
		{ 'name' : 'museum',		'res' : 'building_museum' },
		{ 'name' : 'safehouse',		'res' : 'building_safehouse' },
		{ 'name' : 'barracks',		'res' : 'building_barracks' },
		{ 'name' : 'warehouse',		'res' : 'building_warehouse' },
		{ 'name' : 'glassblowing',	'res' : 'building_glassblowing' },
		{ 'name' : 'alchemist',		'res' : 'building_alchemist' },
		{ 'name' : 'architect',		'res' : 'building_architect' },
		{ 'name' : 'winegrower',	'res' : 'building_winegrower' },
		{ 'name' : 'vineyard',		'res' : 'building_vineyard' },
		{ 'name' : 'fireworker',	'res' : 'building_fireworker' },
		{ 'name' : 'optician',		'res' : 'building_optician' },
		{ 'name' : 'port',			'res' : 'building_port' },
		{ 'name' : 'shipyard',		'res' : 'building_shipyard' },
		{ 'name' : 'temple',		'res' : 'building_temple',		'css' : 'width:100px; height:100px; margin-top:-29px; margin-left:-10px;' },
		{ 'name' : 'workshop',		'res' : 'building_workshop' },
		{ 'name' : 'forester',		'res' : 'building_forester' },
		{ 'name' : 'branchOffice',	'res' : 'building_branchOffice' },
		{ 'name' : 'stonemason',	'res' : 'building_stonemason' },
		{ 'name' : 'carpentering',	'res' : 'building_carpentering' }
	],

	units : [
		{ 'name' : 'swordsman',		'res' : 'unit_swordsman' },
		{ 'name' : 'spearman',		'res' : 'unit_spearman' },
		{ 'name' : 'phalanx',		'res' : 'unit_phalanx' },
		{ 'name' : 'archer',		'res' : 'unit_archer' },
		{ 'name' : 'ram',			'res' : 'unit_ram' },
		{ 'name' : 'catapult',		'res' : 'unit_catapult' },
		{ 'name' : 'steamgiant',	'res' : 'unit_steamgiant' },
		{ 'name' : 'cook',			'res' : 'unit_cook' },
		{ 'name' : 'medic',			'res' : 'unit_medic' }
	],

	advisors : [
		{ 'name' : 'advCities',		'normal' : 'mayor',		'active' : 'mayor_active' },
		{ 'name' : 'advMilitary',	'normal' : 'general',	'active' : 'general_active' },
		{ 'name' : 'advResearch',	'normal' : 'scientist',	'active' : 'scientist_active' },
		{ 'name' : 'advDiplomacy',	'normal' : 'diplomat',	'active' : 'diplomat_active' }
	],

	// add custom css styles
	addStyles : function ()
	{
		GM_addStyle("body { background:#202020 url(" 	 + GM_getResourceURL('bg_body')      + ") repeat top center; }");
		GM_addStyle("#container2 {background-image:url(" + GM_getResourceURL('bg_container2')+ "); } ");
		GM_addStyle("#footer { background-image:url(" 	 + GM_getResourceURL('bg_footer')    + "); } ");
		GM_addStyle("#extraDiv2 { background:url(" 		 + GM_getResourceURL('bg_extraDiv2') + ") repeat top center; } ");
		GM_addStyle("#extraDiv1 { background:url(" 		 + GM_getResourceURL('bg_extraDiv1') + ") repeat top center; } ");
		GM_addStyle("#header { background:#f3dcb6 url("  + GM_getResourceURL('bg_header')    + ") no-repeat; }");

		// replace advisors
		for (i = 0; i < this.advisors.length; i++)
		{
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normal { background-image:url(" + GM_getResourceURL(this.advisors[i]['normal']) +"); }");
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normalactive { background-image:url(" + GM_getResourceURL(this.advisors[i]['active']) +"); }");
		}
//		GM_addStyle ("#advisors UL LI#advMilitary .normalalert { background-image:url(" + GM_getResourceURL('mayor') + "); }");
		GM_addStyle ("#advisors UL LI#advMilitary .normalalert { background-image:url(" + GM_getResourceURL('general_alert') +"); }");

		/*  replace background for current city only */
		var level = this.cityLevel > 24 ? 24 : this.cityLevel;
		level = level < 1 ? 1 : level;

		GM_addStyle("#city #container .phase" + level + " { background-image:url(" + GM_getResourceURL("bg_" + this.timeOfDay + "_city_level" + level) +"); }");

		// for buidling view replace all building images
		if (this.view == 'buildingGround')		{ this.replaceBuildingGrounds() }
		else if (this.view == 'barracks')		{ this.replaceUnits(); }
		else if (this.view == 'city')			{ this.replaceBuildings(); }

	},

	// replace building images
	replaceBuildings: function ()
	{
		for (i = 0; i < this.buildings.length; i++)
		{
			GM_addStyle (this.parentElement + " ."+this.buildings[i]['name'] + " .buildingimg { background-image:url(" + GM_getResourceURL(this.buildings[i]['res']) +"); }");
		}

		for (i = 0; i < this.buildings.length; i++)
		{
			if (this.buildings[i]['css'])
			{
				GM_addStyle (this.parentElement + " ."+this.buildings[i]['name'] + " .buildingimg { " + this.buildings[i]['css'] +" }");
			}
		}

	},

	// replace all units images
	replaceUnits : function ()
	{
		for (i = 0; i < this.units.length; i++)
		{
			$("."+this.units[i]['name'] + " div.unitinfo a IMG").attr('src', GM_getResourceURL(this.units[i]['res']));
		}
	},

	replaceBuildingGrounds : function ()
	{
		if (this.position == 14) // for city wall
		{
			$(".wall .buildinginfo IMG").attr('src', GM_getResourceURL('building_wall'));
		}
		else
		{
			$(".buildinginfo IMG").css('margin-left','10px');
			for (i = 0; i < this.buildings.length; i++)
			{
				$("." + this.buildings[i]['name']+" .buildinginfo IMG").attr('src', GM_getResourceURL(this.buildings[i]['res']));
			}
		}
	},

	// Find current city level
	getCityLevel : function ()
	{
		if (document.getElementById('position0'))
		{
			this.cityLevel = document.getElementById('position0').getElementsByTagName('a')[0].title;
			this.cityLevel = parseInt (this.cityLevel.substr(this.cityLevel.length - 2));

			if ( this.cityLevel > 26 )
			{
				this.cityLevel = 26;
			}
		}
	},

	// get current time of day
	getTimeOfDay : function ()
	{
		d = new Date();
		this.hour = d.getHours();

		if 		(this.hour > this.todSettings.night)	{ this.timeOfDay = 'night'; }
		else if (this.hour > this.todSettings.evening)	{ this.timeOfDay = 'evening'; }
		else if (this.hour > this.todSettings.day)		{ this.timeOfDay = 'day'; }
		else if (this.hour > this.todSettings.morning)	{ this.timeOfDay = 'morning'; }
		else 											{ this.timeOfDay = 'night'; }

		// temporary set to day because I'm not done with all backgrounds
		this.timeOfDay = 'day';
	},

	getView : function ()
	{
		this.view = $('BODY').attr('id');

		if (this.view == 'buildingGround')
		{
			var regExp = new RegExp("position\=([a-zA-Z0-9]+)", "ig");
			var RegExpRes = regExp.exec(document.location.href);
			this.position = (RegExpRes == null) ? '' : RegExpRes[1];
		}
	},

	// initialize
	init : function()
	{
		this.getView();
		this.getTimeOfDay();
		this.getCityLevel();
	}

};

// execute
Skin.init();
Skin.addStyles();
