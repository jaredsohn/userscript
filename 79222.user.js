// coding: utf-8
// ==UserScript==
// @name        	Ikariam Medieval Theme Arabic
// @version 		1.0
// @author		yazmat
// @description		Ikariam skin to replace original Ikariam artwork with medieval ambience for arabic servers only
// @namespace		medieval.ikariam
// @include		http://s*.ikariam.*/index.php*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


/*
	This is an adaptation of the Ikariam Medieval Theme made by bluesman ( http://userscripts.org/users/165018 ) for arabic servers.
*/

Skin = {
	view : '',		// current view
	position : '',		// current building position
	cityLevel : 0,		// currentu city level
	timeOfDay : 'day',	// time of day
	hour : 12,		// default hour

	// time of day settings (hours)
	todSettings : {
		// night is from 0:00
		morning: 7,		// from 7 am to "day"
		day : 8,		// from 8 am to "evening"
		evening: 19,		// from 7 pm to "night"
		night: 20		// from 8 pm (until midnigt, and then from 0 to morning)
	},

	// where all images are
	url : 'http://i752.photobucket.com/albums/xx165/firstcauchemar/medieval/',

	// parent container
	parentElement : '#city #container #mainview #locations ',

	// list of buildings to replace
	buildings : [
		{ 'name' : 'townHall',		'bg' : 'building_townhall.png' },
		{ 'name' : 'palace',		'bg' : 'building_palace.png' },
		{ 'name' : 'palaceColony',	'bg' : 'building_palaceColony.png' },
		{ 'name' : 'embassy',		'bg' : 'building_embassy.png' },
		{ 'name' : 'academy',		'bg' : 'building_academy.png' },
		{ 'name' : 'tavern',		'bg' : 'building_tavern.png' },
		{ 'name' : 'wall',		'bg' : 'building_wall.png' },
		{ 'name' : 'museum',		'bg' : 'building_museum.png' },
		{ 'name' : 'safehouse',		'bg' : 'building_safehouse.png' },
		{ 'name' : 'barracks',		'bg' : 'building_barracks.png' },
		{ 'name' : 'warehouse',		'bg' : 'building_warehouse.png' },
		{ 'name' : 'glassblowing',	'bg' : 'building_glassblowing.png' },
		{ 'name' : 'alchemist',		'bg' : 'building_alchemist.png' },
		{ 'name' : 'architect',		'bg' : 'building_architect.png' },
		{ 'name' : 'winegrower',	'bg' : 'building_winegrower.png' },
		{ 'name' : 'fireworker',	'bg' : 'building_fireworker.png' },
		{ 'name' : 'port',		'bg' : 'building_port.png' },
		{ 'name' : 'shipyard',		'bg' : 'building_shipyard.png' },
		{ 'name' : 'workshop',		'bg' : 'building_workshop.png' },
		{ 'name' : 'forester',		'bg' : 'building_forester.png' },
		{ 'name' : 'branchOffice',	'bg' : 'building_branchOffice.png' },
		{ 'name' : 'stonemason',	'bg' : 'building_stonemason.png' },
		{ 'name' : 'carpentering',	'bg' : 'building_carpentering.png' }
	],

	// list of buildings to replace when city level < 10
	buildings10 : [
		{ 'name' : 'townHall',		'bg' : 'building_townhall10.png' },
		{ 'name' : 'palace',		'bg' : 'building_palace.png' },
		{ 'name' : 'palaceColony',	'bg' : 'building_palaceColony.png' },
		{ 'name' : 'embassy',		'bg' : 'building_embassy.png' },
		{ 'name' : 'academy',		'bg' : 'building_academy.png' },
		{ 'name' : 'tavern',		'bg' : 'building_tavern.png' },
		{ 'name' : 'wall',		'bg' : 'building_wall.png' },
		{ 'name' : 'museum',		'bg' : 'building_museum.png' },
		{ 'name' : 'safehouse',		'bg' : 'building_safehouse.png' },
		{ 'name' : 'barracks',		'bg' : 'building_barracks.png' },
		{ 'name' : 'warehouse',		'bg' : 'building_warehouse.png' },
		{ 'name' : 'glassblowing',	'bg' : 'building_glassblowing.png' },
		{ 'name' : 'alchemist',		'bg' : 'building_alchemist.png' },
		{ 'name' : 'architect',		'bg' : 'building_architect.png' },
		{ 'name' : 'winegrower',	'bg' : 'building_winegrower.png' },
		{ 'name' : 'fireworker',	'bg' : 'building_fireworker.png' },
		{ 'name' : 'port',		'bg' : 'building_port.png' },
		{ 'name' : 'shipyard',		'bg' : 'building_shipyard.png' },
		{ 'name' : 'workshop',		'bg' : 'building_workshop.png' },
		{ 'name' : 'forester',		'bg' : 'building_forester.png' },
		{ 'name' : 'branchOffice',	'bg' : 'building_branchOffice.png' },
		{ 'name' : 'stonemason',	'bg' : 'building_stonemason.png' },
		{ 'name' : 'carpentering',	'bg' : 'building_carpentering.png' }
	],

	units : [
		{ 'name' : 'swordsman',		'img' : 'swordsman_r_120x100.png' },
		{ 'name' : 'spearman',		'img' : 'spearman_r_120x100.png' },
		{ 'name' : 'phalanx',		'img' : 'phalanx_r_120x100.png' },
		{ 'name' : 'archer',		'img' : 'archer_r_120x100.png' },
		{ 'name' : 'ram',		'img' : 'ram_r_120x100.png' },
		{ 'name' : 'catapult',		'img' : 'catapult_r_120x100.png' },
		{ 'name' : 'steamgiant',	'img' : 'steamgiant_r_120x100.png' },
		{ 'name' : 'cook',		'img' : 'cook_r_120x100.png' },
		{ 'name' : 'medic',		'img' : 'medic_r_120x100.png' }
	],

	advisors : [
		{ 'name' : 'advCities',		'normal' : 'mayor.png',		'active' : 'mayor_active.png' },
		{ 'name' : 'advMilitary',	'normal' : 'general.png',	'active' : 'general_active.png' },
		{ 'name' : 'advResearch',	'normal' : 'scientist.png',	'active' : 'scientist_active.png' },
		{ 'name' : 'advDiplomacy',	'normal' : 'diplomat.png',	'active' : 'diplomat_active.png' }
	],

	// add custom css styles
	addStyles : function ()
	{
		GM_addStyle("body { background:#202020 url(" + this.url + "bg_stone.jpg) repeat top center; }");
		GM_addStyle("#container2 {background-image:url(" + this.url + "bg_content.png); } ");
		GM_addStyle("#footer { background-image:url(" + this.url + "bg_footer.png); } ");
		GM_addStyle("#extraDiv2 { background:url(" + this.url + "bg_ocean.jpg) repeat top center; } ");
		GM_addStyle("#extraDiv1 { background:url(" + this.url + "bg_sky.jpg) repeat top center; } ");
		GM_addStyle("#header { background:#f3dcb6 url(" + this.url + "bg_header.jpg) no-repeat; }");

		// replace building images
		if ( this.cityLevel < 10 )
		{
			for (i = 0; i < this.buildings10.length; i++)
			{
				GM_addStyle (this.parentElement + " ."+this.buildings10[i]['name'] + " .buildingimg { background-image:url(" + this.url + this.buildings10[i]['bg'] +"); }");
			}
		}
		else
		{
			for (i = 0; i < this.buildings.length; i++)
			{
				GM_addStyle (this.parentElement + " ."+this.buildings[i]['name'] + " .buildingimg { background-image:url(" + this.url + this.buildings[i]['bg'] +"); }");
			}
		}

		// replace advisors
		for (i = 0; i < this.advisors.length; i++)
		{
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normal { background-image:url(" + this.url + this.advisors[i]['normal'] +"); }");
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normalactive { background-image:url(" + this.url + this.advisors[i]['active'] +"); }");
		}

		/*  replace background for current city only */
		var level = this.cityLevel > 24 ? 24 : this.cityLevel;
		GM_addStyle("#city #container .phase" + level + " { background-image:url(" + this.url + "city_level" +level +".jpg); }");

		// for buidling view replace all building images
		if (this.view == 'buildingGround')
		{
			if (this.position == 14) // for city wall
			{
				$(".wall .buildinginfo IMG").attr('src', this.url + 'wall.png');
			}
			else
			{
				$(".buildinginfo IMG").css('margin-left','10px');
				for (i = 0; i < this.buildings.length; i++)
				{
					$("." + this.buildings[i]['name']+" .buildinginfo IMG").attr('src', this.url + this.buildings[i]['bg']);
				}
			}
		}

		// replace units
		for (i = 0; i < this.units.length; i++)
		{
			$("."+this.units[i]['name'] + " div.unitinfo a IMG").attr('src', this.url + this.units[i]['img']);
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
