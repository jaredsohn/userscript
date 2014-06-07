// coding: utf-8
// ==UserScript==
// @name        Ikariam Medieval+Sexy V10.0
// @version 	0.3.2
// @author		bluesman ( http://userscripts.org/users/165018 )
// @homepage	http://userscripts.org/scripts/show/77049
// @description	Ikariam skin to replace original Ikariam artwork with medieval ambience
// @namespace	medieval.ikariam
// @include		http://s*.ikariam.*/*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
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
	//url : 'http://127.0.0.1/krm/medieval/',
	url : 'http://aristaxobware.net46.net/medieval/',

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
		{ 'name' : 'wall',			'bg' : 'building_wall.png' },
		{ 'name' : 'museum',		'bg' : 'building_museum.png' },
		{ 'name' : 'safehouse',		'bg' : 'building_safehouse.png' },
		{ 'name' : 'barracks',		'bg' : 'building_barracks.png' },
		{ 'name' : 'warehouse',		'bg' : 'building_warehouse.png' },
		{ 'name' : 'glassblowing',	'bg' : 'building_glassblowing.png' },
		{ 'name' : 'alchemist',		'bg' : 'building_alchemist.png' },
		{ 'name' : 'architect',		'bg' : 'building_architect.png' },
		{ 'name' : 'winegrower',	'bg' : 'building_winegrower.png' },
		{ 'name' : 'fireworker',	'bg' : 'building_fireworker.png' },
		{ 'name' : 'port',			'bg' : 'building_port.png' },
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
		{ 'name' : 'wall',			'bg' : 'building_wall.png' },
		{ 'name' : 'museum',		'bg' : 'building_museum.png' },
		{ 'name' : 'safehouse',		'bg' : 'building_safehouse.png' },
		{ 'name' : 'barracks',		'bg' : 'building_barracks.png' },
		{ 'name' : 'warehouse',		'bg' : 'building_warehouse.png' },
		{ 'name' : 'glassblowing',	'bg' : 'building_glassblowing.png' },
		{ 'name' : 'alchemist',		'bg' : 'building_alchemist.png' },
		{ 'name' : 'architect',		'bg' : 'building_architect.png' },
		{ 'name' : 'winegrower',	'bg' : 'building_winegrower.png' },
		{ 'name' : 'fireworker',	'bg' : 'building_fireworker.png' },
		{ 'name' : 'port',			'bg' : 'building_port.png' },
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
		{ 'name' : 'ram',			'img' : 'ram_r_120x100.png' },
		{ 'name' : 'catapult',		'img' : 'catapult_r_120x100.png' },
		{ 'name' : 'steamgiant',	'img' : 'steamgiant_r_120x100.png' },
		{ 'name' : 'cook',			'img' : 'cook_r_120x100.png' },
		{ 'name' : 'medic',			'img' : 'medic_r_120x100.png' }
	],

	advisors : [
		{ 'name' : 'advCities',		'normal' : 'advisors/mayor.png',     'active' : 'advisors/mayor_active.png' },
		{ 'name' : 'advMilitary',	'normal' : 'advisors/general.png',   'active' : 'advisors/general_active.png',	'alert' : 'advisors/general_alert.png' },
		{ 'name' : 'advResearch',	'normal' : 'advisors/scientist.png', 'active' : 'advisors/scientist_active.png' },
		{ 'name' : 'advDiplomacy',	'normal' : 'advisors/diplomat.png',  'active' : 'advisors/diplomat_active.png' }
	],

	addStyles : function (){// add custom css styles
		GM_addStyle("#container2 { background-image:url("   + this.url + "bg/bg_content.png); } ");
		GM_addStyle("#extraDiv2  { background:url("         + this.url + "bg/bg_ocean.jpg) repeat top center; } ");
		GM_addStyle("#extraDiv1  { background:url("         + this.url + "bg/bg_sky.jpg) repeat top center; } ");
		GM_addStyle("#footer     { background-image:url("   + this.url + "bg/bg_footer.png); } ");
		GM_addStyle("#header     { background:#f3dcb6 url(" + this.url + "bg/bg_header.jpg) no-repeat; }");
		GM_addStyle("body        { background:#202020 url(" + this.url + "bg/bg_stone.jpg) repeat top center; }");
		GM_addStyle("#container #facebook_button a:hover { background:#202020 url(" + this.url + "bg/facebook_hover.gif) repeat top center; }");
		GM_addStyle("#container #facebook_button a       { background:#202020 url(" + this.url + "bg/facebook_normal.gif) repeat top center; }");
		

		if ( this.cityLevel < 10 ){// replace building images
			for (i = 0; i < this.buildings10.length; i++){
				GM_addStyle (this.parentElement + " ."+this.buildings10[i]['name'] + " .buildingimg { background-image:url(" + this.url + this.buildings10[i]['bg'] +"); }");
			}
		}
		else
		{
			for (i = 0; i < this.buildings.length; i++){
				GM_addStyle (this.parentElement + " ."+this.buildings[i]['name'] + " .buildingimg { background-image:url(" + this.url + this.buildings[i]['bg'] +"); }");
			}
		}

		for (i = 0; i < this.advisors.length; i++){// replace advisors
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normal { background-image:url(" + this.url + this.advisors[i]['normal'] +"); }");
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normalactive { background-image:url(" + this.url + this.advisors[i]['active'] +"); }");
			GM_addStyle ("#advisors UL LI#"+this.advisors[i]['name'] + " .normalalert { background-image:url(" + this.url + this.advisors[i]['alert'] +"); }");
			GM_addStyle ("#advisors a { margin-top: 0px }");
		}

		// replace background for current city only
		var level = this.cityLevel > 24 ? 24 : this.cityLevel;
		GM_addStyle("#city #container .phase" + level + " { background-image:url(" + this.url + "bg/" + this.timeOfDay + "/city_level" + level +".jpg); }");

		if (this.view == 'buildingGround'){// for buidling view replace all building images
			if (this.position == 14){ // for city wall
				$(".wall .buildinginfo IMG").attr('src', this.url + 'wall.png');
			}
			else
			{
				$(".buildinginfo IMG").css('margin-left','10px');
				for (i = 0; i < this.buildings.length; i++){
					$("." + this.buildings[i]['name']+" .buildinginfo IMG").attr('src', this.url + this.buildings[i]['bg']);
				}
			}
		}

		// replace units
		for (i = 0; i < this.units.length; i++){
			$("."+this.units[i]['name'] + " div.unitinfo a IMG").attr('src', this.url + 'units/' + this.units[i]['img']);
		}
	},
	getCityLevel : function (){// Find current city level
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
	getTimeOfDay : function (){// get current time of day
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
	getView : function (){
		this.view = $('BODY').attr('id');

		if (this.view == 'buildingGround')
		{
			var regExp = new RegExp("position\=([a-zA-Z0-9]+)", "ig");
			var RegExpRes = regExp.exec(document.location.href);
			this.position = (RegExpRes == null) ? '' : RegExpRes[1];
		}
	},
	init : function(){// initialize
		this.getView();
		this.getTimeOfDay();
		this.getCityLevel();
	}

};

// execute
Skin.init();
Skin.addStyles();
