// coding: utf-8
// ==UserScript==
// @name        Ikariam UI Cleanup
// @version 	1.0
// @author		bluesman ( http://userscripts.org/users/165018 )
// @homepage	http://userscripts.org/scripts/show/77049
// @description	Simple script to improve UI and remove some annoying extras
// @namespace	ikariam.cleanup
// @include		http://s*.*.ikariam.*/*
// @exclude		http://support.ikariam.*/*
// @exclude		http://*.ikariam.*/pillory.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
//-----------------------------
// CHANGELOG
//
// @history 1.0 first complete release
// @history 0.3 Filter fleet movements by type
// @history 0.0.3 changed fleet movement display, added research svisor time to finish
// @history 0.0.2 transparent background instead of removing links
// @history 0.0.1 initial version
//
// ==/UserScript==

var languages =
{
	rs:
	{
		'movements' 	: 'Покрети трупа',
		'refresh' 		: 'Освежавање',
		'units' 		: 'јединица',
		'show' 			: 'Прикажи',
		'hide' 			: 'Склони',
		'show_all' 		: 'Све',
		'show_own' 		: 'Моје',
		'show_hostile'	: 'Непријатељ',
		'show_other'	: 'Туђе',
		'transport' 	: 'Ресурси',
		'army' 			: 'Војска',
		'my_army' 		: 'Моја војска',
		'other_army' 	: 'Туђа војска',
		'fleet' 		: 'Флота',
		'my_fleet' 		: 'Моја флота',
		'other_fleet' 	: 'Туђа флоте',
		'for' 			: ' за ',
		'near' 			: ' поред ',

		'Move' 			: 'Размештај',
		'Deploy' 		: 'Премести',
		'Plunder' 		: 'Пљачка',
		'Battle' 		: 'Битка',
		'NavalBattle'	: 'Поморска',
		'Other' 		: 'Остало',
	},
	en:
	{
		'movements' 	: 'Troop Movements',
		'refresh' 		: 'Refresh',
		'units' 		: 'units',
		'show' 			: 'Show',
		'hide' 			: 'Hide',
		'show_all' 		: 'All',
		'show_own' 		: 'My',
		'show_hostile'	: 'Hostile',
		'show_other'	: 'Other',
		'transport' 	: 'Resources',
		'army' 			: 'Army',
		'my_army' 		: 'My Army',
		'other_army' 	: 'Other Army',
		'fleet' 		: 'Fleet',
		'my_fleet' 		: 'My Fleet',
		'other_fleet' 	: 'Other Fleet',
		'for' 			: ' for ',
		'near' 			: ' near ',

		'Move' 			: 'Move',
		'Deploy' 		: 'Deploy',
		'Plunder' 		: 'Plunder',
		'Battle' 		: 'Battle',
		'NavalBattle'	: 'Naval Battle',
		'Other' 		: 'Other',
	}
}

Ika = {
	script_name	: 'UI Cleanup',
	script_url	: 'http://userscripts.org/scripts/show/85713',
	server		: '',			// current server
	view 		: '',			// current view
	position 	: '',		// current building position
	cityLevel 	: 0,		// currentu city level
	language 	: 'en',	// selected language
	lang		: '',			// language
	allyId 		: 0,
	
	icons : {
		'skin/interface/mission_transport.gif' 		: 'transport',
		'skin/interface/mission_plunder.gif' 		: 'plunder',
		'skin/interface/mission_occupy.jpg' 		: 'occupy',
		'skin/interface/mission_deployarmy.gif' 	: 'deploy',
		'skin/actions/defend.gif' 					: 'defend',
		'skin/actions/defend_port.gif' 				: 'defend_port',
		'skin/actions/blockade.gif' 				: 'blockade',
		'skin/interface/mission_blockade.gif' 		: 'blockade',
		'skin/interface/mission_deployfleet.gif' 	: 'deploy_fleet'
	},

	actions : {
		'transport'		: 'transport',
		'plunder' 		: 'army',
		'occupy' 		: 'army',
		'deploy' 		: 'army',
		'defend' 		: 'army',
		'defend_port' 	: 'fleet',
		'blockade' 		: 'fleet',
		'deploy_fleet' 	: 'fleet'
	},

	icon_time 			: 'skin/resources/icon_time.gif',
	icon_battle 		: 'skin/advisors/military/bang_soldier.gif',
	icon_naval_battle 	: 'skin/advisors/military/bang_ship.gif',

	icon_transport 		: '/skin/interface/mission_transport.gif',
	icon_plunder 		: '/skin/interface/mission_plunder.gif',
	icon_occupy 		: '/skin/interface/mission_occupy.jpg',
	icon_deploy 		: '/skin/interface/mission_deployarmy.gif',
	icon_defend 		: '/skin/actions/defend.gif',
	icon_defend_port	: '/skin/actions/defend_port.gif',
	icon_occupy_port	: '/skin/actions/blockade.gif',
	icon_deploy_fleet	: '/skin/interface/mission_deployfleet.gif',

	counts : {
		'ownarmy' : 0,
		'ownfleet' : 0,
		'owntransport' : 0,
		'hostilearmy' : 0,
		'hostilefleet' : 0,
		'hostiletransport' : 0,
		'otherarmy' : 0,
		'otherfleet' : 0,
		'othertransport' : 0,
		'own' : 0,
		'other' : 0,
		'hostile' : 0,
		'total' : 0,
	},

	types : {
		'Move' 			: ['Movement', 0],
		'Deploy' 		: ['Deploy', 0],
		'Plunder' 		: ['Plunder', 0],
		'Battle' 		: ['Battle', 0],
		'NavalBattle'	: ['Naval Battle', 0],
		'Other' 		: ['Other', 0],
		'Cities'		: [],
	},
	
	target_cities : {},
	
	tabs : {
		'resources' : 'skin/wonder2/multi_marble.gif',
		'army' 		: 'skin/ikipedia/helm.gif',
		'my_army' 	: 'skin/actions/move_army.gif',
		'fleet' 	: 'skin/actions/move_fleet.gif',
		'my_fleet' 	: 'skin/actions/move_fleet.gif',
		'general' 	: 'skin/relatedCities/general.gif',
	},

	// parent container
	parentElement : '#city #container #mainview #locations ',

	getServer : function ()
	{
		this.server = window.location.host;
		var temp = this.server.split('.');
		temp = temp[1];

		this.language = temp in languages ? temp : 'en';
		this.lang = languages[this.language];
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

	getInt : function (str)						{ return parseInt (str.replace(/,/g, '')); },
	cfgRead : function (key, default_value)		{ return GM_getValue (this.server + key, default_value); },
	cfgWrite : function (key, value)			{ GM_setValue (this.server + key, value); },

	getAllyId : function ()
	{
		this.allyId = this.cfgRead ('allyId', 0);

		if (Ika.view == 'diplomacyAdvisorAlly')
		{
			// ?view=sendIKMessage&msgType=51&allyId=340
			var allyId = $("#allyinfo tbody TR:eq(7) TD:eq(1) A").attr('href');
			var regExp = new RegExp("allyId\=([0-9]+)", "ig");
			var RegExpRes = regExp.exec(allyId);
			this.allyId = (RegExpRes == null) ? '' : RegExpRes[1];

			// save
			this.cfgWrite ('allyId', this.allyId);
		}
	},

	toggleMovementType : function (className, notClass)
	{
		if (typeof notClass == 'undefined')
		{
			notClass == '';
		}

		$("#MovementFilter LI").removeClass('selected');
		$('#fleetMovements TABLE.locationEvents TR').hide();
		$('#fleetMovements TABLE.locationEvents TR').eq(0).show();
		if (notClass == '')
		{
			$('#fleetMovements TABLE.locationEvents TR.' + className).show();
			$('#fleetMovements TABLE.locationEvents TR.' + className).next().show();
		}
		else
		{
			$('#fleetMovements TABLE.locationEvents TR.' + className).not('.' + notClass).show();
			$('#fleetMovements TABLE.locationEvents TR.' + className).not('.' + notClass).next().show();
		}

	},

	// initialize
	init : function()
	{
		this.getServer();
		this.getView();
		// this.getAllyId ();
	}

};

// execute
Ika.init();

var refresh_interval = 180;

$(document).ready ( function()
{
	if (Ika.view == 'merchantNavy')
	{
		$('.pulldown .content').css('height', 'auto');
	}

	else if (Ika.view == 'barracks' || Ika.view == 'shipyard')
	{
		$('UL#units .unit').css('border-top', '1px solid #E4B873');
		$('UL#units .unit .unitinfo P').hide();
	}

	else if (Ika.view == 'warehouse')
	{
		$('.premiumOffer').hide();
	}

	else if (Ika.view == 'port')
	{
		$('.buyTransporter P').hide();
	}

	else if (Ika.view == 'island')
	{
		GM_addStyle("UL#cities LI.cityLocation .UICallyInfo { opacity:1; font-size:9px; line-height:100%; margin-top:-34px; margin-left:-8px; z-index:99; position:absolute; border:1px solid #9E580E; }");
		GM_addStyle("UL#cities LI.cityLocation .UICallyInfo .allyName { padding:2px 5px; background:#000; color:#fff; }");
		GM_addStyle("UL#cities LI.cityLocation .UICallyInfo .playerName { padding:2px 5px; background:#fff; color:#000; }");
		GM_addStyle("UL#cities LI.cityLocation .UICcityInfo { padding:0 5px; margin-left:-20px; background:#FCF4DE; z-index:99; opacity:0.9; position:absolute; }");
		GM_addStyle("UL#cities LI.cityLocation .citySize { padding:2px 0; padding-left: 5px; background:#FCF4DE; border-left:1px solid #D6AD75; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.p_fight .UICallyInfo .allyName { background:#f00; color:#ff0; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.p_fight .UICallyInfo .playerName { border-left:1px solid #fff; background:#f00; color:#ff0; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.vacation .allyName { background:#cccc00; color:#000; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.vacation .playerName { background:#ffff00; color:#909090; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.vacation .fullName { color:#c0c000; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.inactive .allyName { background:#909090; color:#ccc; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.inactive .playerName { background:#a0a0a0; color:#ccc; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.c_ownCityImg .allyName { background:#016BA7; color:#fff; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.c_allyCityImg .allyName { background:#0f0; color:#000; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_ownOccupier .allyName { background:#00c; color:#fff; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_ownOccupier .fullName { color:#00c; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_allyOccupier .allyName { background:#090; color:#fff; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_allyOccupier .fullName { color:#0c0; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_foreignOccupier .allyName { background:#900; color:#fff; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.o_foreignOccupier .fullName { color:#f00; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.p_ownBlocker .citySize { background:#035699; color:#fff; padding:2px 5px; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.p_allyBlocker .citySize { background:#0c0; color:#fff; padding:2px 5px; }");
		GM_addStyle("UL#cities LI.cityLocation .textLabel.p_foreignBlocker .citySize { background:#c00; color:#fff; padding:2px 5px; }");
		GM_addStyle("UL#cities LI.cityLocation:hover .UICallyInfo { opacity:1; }");
		GM_addStyle("#breadcrumbs i { font-style:normal: cursor:pointer; display:inline-block; margin-left:5px; } ");
		if (!Ika.cfgRead ('showAllyInfo', true))
		{
			GM_addStyle("UL#cities LI.cityLocation .UICallyInfo { display:none; }");
		}

		$('UL#cities LI.cityLocation').each( function(k, v) {
			var t = $('TABLE.cityinfo', this);
			var cityAndSize = $('TD', $('TR', t).eq(1)).eq(1).text().trim();
			var citySize = cityAndSize.split(' (');
			var cityName = citySize[0];
			citySize = (typeof citySize[1] == 'undefined') ? '' : citySize[1].replace(')','');
			var playerName = $('TD', $('TR', t).eq(2)).eq(1).text().trim();
			var allyName = $('TD', $('TR', t).eq(3)).eq(1).text().trim();
			
			var cityImg 		= $('div', this).eq(0).attr('class');
			var occupied 		= $('div.occupied', this).hasClass('occupied') ? $('div.occupied', this).attr('class') : false;
			var port_occupied 	= $('div.fleetAction', this).hasClass('fleetAction') ? $('div.fleetAction', this).attr('class') : false;
			var inactive		= $('span.inactivity', this).hasClass('inactivity');
			var vacation		= $('span.vacation', this).hasClass('vacation');

			if (occupied)		{ occupied = 'o_' + occupied.replace('occupied ', ''); }
			if (port_occupied)	{ port_occupied = 'p_' + port_occupied.replace('fleetAction ', ''); }

			var html = $('SPAN.textLabel', this).html();
			html = html.replace('<span class="before"></span>', '');
			html = html.replace('<span class="after"></span>', '');
			html = '<span class="fullName " title="' + cityName + '">' + html + '</span><span class="citySize">' + citySize + '</span>';
			
			var allyClass = 'ally_' + allyName.toLowerCase().replace(' ','_');

			if (cityImg == 'ownCityImg' || cityImg == 'allyCityImg' || cityImg == 'cityimg')
			{
				$('SPAN.textLabel', this).addClass('c_' + cityImg);
			}

			$('SPAN.textLabel', this).addClass(allyClass);
			if (inactive)		{ $('SPAN.textLabel', this).addClass('inactive'); }
			if (vacation)		{ $('SPAN.textLabel', this).addClass('vacation'); }
			if (occupied) 		{ $('SPAN.textLabel', this).addClass(occupied); }
			if (port_occupied)	{ $('SPAN.textLabel', this).addClass(port_occupied); }
			$('SPAN.textLabel', this).html('<span class="before"></span>' + html + '<span class="after"></span>');
			$('SPAN.textLabel', this).append('<div class="UICallyInfo"><span class="allyName">' + allyName + '</span><span class="playerName">' + playerName + '</span></div>');
		});


		var s = '<div class="dynamic">'
			+ '<h3 class="header"><a href="javascript:;" id="IMToggle">' + Ika.script_name + '</a></h3>'
			+ '<div class="content">'
			+ '<ul id="UICSettingsDynamic" style="margin:0 10px;">'
			+ '<li><a href="javascript:;" id="toggleUICallyInfo">' + (Ika.cfgRead('showAllyInfo') ? 'Hide additional info' : 'Show additional info') + '</a></li>'
			+ '<li><a href="javascript:;" id="markAlliance">Filter Alliance Members</a></li>'
			+ '</ul></div><div class="footer"></div></div>';

		$(s).insertBefore('#mainview');
		
		$('#toggleUICallyInfo').click ( function (evt) {
			$('.UICallyInfo').toggle();
			Ika.cfgWrite('showAllyInfo', $('.UICallyInfo').is(':visible'));
			
			$(this).text( $('.UICallyInfo').is(':visible') ? 'Hide additional info' : 'Show additional info' );
		});
		$('#markAlliance').click ( function (evt) {
			var a = prompt('Enter alliance name: ');
			if (a != '' && a != null)
			{
				a = 'ally_' + a.toLowerCase().replace(' ','_');
				$(".textLabel > .UICallyInfo").hide();
				$(".textLabel." + a+ " > .UICallyInfo").show();
			}
			else
			{
				$(".textLabel > .UICallyInfo").show();
			}
		});
	}

	else if (Ika.view == 'militaryAdvisorMilitaryMovements')
	{
		GM_addStyle("#fleetMovements .tooltip2 { display:block; position:relative; left:auto; margin:0; border:0; }");
		GM_addStyle("#fleetMovements .tooltip2 h5 { display:none;}");
		GM_addStyle("#fleetMovements .tooltip2 .unitBox { display:inline; width:auto; margin:0; padding:0; }");
		GM_addStyle("#fleetMovements .tooltip2 .unitBox div.icon, .tooltip2 .unitBox div.iconSmall { padding:0; background-color:transparent; }");
		GM_addStyle("#fleetMovements .tooltip2 .unitBox div.icon IMG, .tooltip2 .unitBox div.iconSmall IMG { }");
		GM_addStyle("#fleetMovements .tooltip2 .unitBox div.count { margin:0 padding:0;background-color: transparent; }");

		GM_addStyle("#fleetMovements { position:relative; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR TD { vertical-align: middle; border-bottom:1px solid #F3DDB2; padding:5px 2px; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR TD A { display:block; font-size:18px; color:#000060; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.showAllUnits TD { background:#fff; padding:0; }");

		GM_addStyle("#combatsInProgress {}");

		GM_addStyle("#reloadCounter { z-index:999; position: fixed; top:0; right:0; padding:10px; font-size:11px; color:#000; }");
		GM_addStyle("#UI-cleanup P { text-align:center !important; margin:1em 0  !important;  }");
		GM_addStyle("#UI-cleanup blockquote { font-size: smaller; margin:0; padding:0.2em 1em; text-align:center; border-top:1px solid #D0A674;}");

		GM_addStyle("#fleetMovements TABLE.locationEvents TR TD { border:0; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.hostile.movement_fleet { background:#ffdddd; border-bottom:2px solid red; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.own.movement_fleet { background:#dfefff; border-bottom:2px solid #c0d0e0; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.movement_army { background:#DADBAC; border-bottom:2px solid #BCBD8E; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.own.movement_army { background:#EAEBBC; border-bottom:2px solid #CCCD9E; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.hostile.movement_army { background:#FFe0e0; border-bottom:2px solid #FF9999; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.hostile.movement_fleet { background:#D9C0FF; border-bottom:2px solid #FF9999; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.movement_army.direction_static { background:#ffffcc; border-bottom:2px solid #FFFF00; }");
		GM_addStyle("#fleetMovements TABLE.locationEvents TR.movement_transport.direction_static { background:#f0f0f0; border-bottom:2px solid #d0d0d0; }");

		var movements = [];

		$('#fleetMovements .locationEvents TR TD').attr('onMouseOut', '');
		$('#fleetMovements .locationEvents TR TD').attr('onMouseOver', '');

		var thead = '';
		$('#fleetMovements TABLE.locationEvents TR').each ( function (key, row)
		{
			if (key == 0)
			{
				thead = $(row).html();
			}
			else
			{
				var mv = {
					'id'		: 0,
					'city'		: '',
					'city_id'	: 0,
					'type' 		: 'Move',
					'moving'	: 0,
					'cargo'		: 'army',
					'direction' : 1,
					'hostile'	: 0,
					'mission'	: '',
					'class'		: 'other',
				};

				
				if ($(this).hasClass('hostile')) 	{ mv.class = 'hostile'; }
				else if ($(this).hasClass('own')) 	{ mv.class = 'own'; }

				var tmp = $('TD', this).eq(0);
				var img = $('img', tmp).attr('src');
				if (img != '')
				{
					if (img == 	Ika.icon_time)				{ mv.moving = 1; }
					if (img == Ika.icon_battle)				{ mv.type = 'Battle'; }
					else if (img == Ika.icon_naval_battle)	{ mv.type = 'NavalBattle'; }
	//				else									{ mv.type = 'Deploy'; }
				}

				Ika.types[mv.type][1]++;
				var className = ' type' + mv.type;
				
				// check direction
				if (!$(this).hasClass('showAllUnits'))
				{
					var img = $('img', $('TD', this).eq(7));
					if (typeof img == 'object')
					{
						img = $(img).attr('src');
						if (img != '' && img != null)
						{
							var regExp = new RegExp("arrow_(left|right)_", "ig");
							var RegExpRes = regExp.exec(img);
							mv.direction = (RegExpRes == null) ? 'static' : RegExpRes[1];
						}
						else
						{
							mv.direction = 'static';
						}
						className += ' direction_' + mv.direction;
					}

					// target city
					mv.city = $('A', $('TD', this).eq(8)).text().trim();
					if (mv.city == '')
					{
						mv.city = 'Unknown';
					}

					// target city id
					mv.city_id = $('A', $('TD', this).eq(8)).attr('href');
					var regExp = new RegExp("cityId=([0-9]+)", "ig");
					var RegExpRes = regExp.exec(mv.city_id);
					mv.city_id = (RegExpRes == null) ? 0 : RegExpRes[1];

					// type
					var img = $('img', $('TD', this).eq(6));
					if (img)
					{
						img = $(img).attr('src');

						if (typeof Ika.icons[img] != 'undefined')
						{
							mv.cargo = Ika.actions[Ika.icons[img]];
							mv.mission = Ika.icons[img];
							className += ' mission_' + mv.mission;
							className += ' movement_' + mv.cargo;

							if (typeof Ika.counts[mv.class + mv.cargo] != 'undefined')
							{
								Ika.counts[mv.class + mv.cargo]++;
							}

						}
	/*
					var regExp = new RegExp("mission_([a-zA-Z0-9]+)\.(gif|png|jpg)", "ig");
					var RegExpRes = regExp.exec(img);
					alert ((RegExpRes == null) ? 'nije' : RegExpRes[1]);
	*/
					}
					
					mv.class += ' b_' + mv.city_id;
					if (typeof Ika.target_cities[mv.city_id] == 'undefined')
					{
						Ika.target_cities[mv.city_id] = { 'name' : mv.city, 'count' : 1 };
					}
					else
					{
						Ika.target_cities[mv.city_id].count++;
					}

					$(this).addClass (className + ' ' + mv.class);
					var s = $('.tooltip2', this).html();
					if (s != null)
					{
						$('.tooltip2', this).remove();
						$('<tr class="showAllUnits"><td colspan="2"></td><td colspan="20"><div class="tooltip2">' + s + '</div><div style="clear:both;"></div></td></tr>').insertAfter(this);
					}
				}
			}

		});

		var s = '<div class="dynamic" id="UI-cleanup"><h3 class="header">' + Ika.lang.movements + '</h3><div class="content">'
			+ '<p>'
			+ '<a class="button" id="reloadButton" onclick="self.location.reload()">' + Ika.lang.refresh + ' (' + refresh_interval + ' s)</a>'
			+ '</p><p>'
			+ 'Toggle: <a href="javascript:;" id="toggleUnits">Cargo</a>'
			+ ' | <a href="javascript:;" id="toggleMovementCount">Count</a>'
			+ ' | <a href="javascript:;" id="toggleTabsText">Images</a>'
			+ '</p><blockquote>Powered by <a href="' + Ika.script_url + '">' + Ika.script_name + '</a></blockquote>'
			+ '</div><div class="footer"></div></div>';

		$(s).insertBefore('#mainview');

		Ika.counts.hostile 	= Ika.counts.hostilearmy + Ika.counts.hostilefleet;
		Ika.counts.own 		= Ika.counts.owntransport + Ika.counts.ownarmy + Ika.counts.ownfleet;
		Ika.counts.other 	= Ika.counts.othertransport + Ika.counts.otherarmy + Ika.counts.otherfleet;
		Ika.counts.total 	= Ika.counts.hostile + Ika.counts.own + Ika.counts.other;
		Ika.counts.owntransport = Ika.counts.othertransport + Ika.counts.owntransport;

		if (Ika.counts.total > 0 )
		{
			var t = '<div class="yui-navset"><ul class="UIcleanup-nav" id="MovementFilter">';

			t += '<li class="selected"><a id="toggleShowAll" href="javascript:;">' + Ika.lang.show_all + '<em>' + Ika.counts.total + '</em></a></li> ';
			if (Ika.counts.owntransport > 0)	{ t += '<li><a id="toggleShowTransport" href="javascript:;"><img src="' + Ika.tabs.resources + '"> <span>' + Ika.lang.transport + '</span><em>' + Ika.counts.owntransport + '</em></a></li>'; }
			if (Ika.counts.own > 0)				{ t += '<li><a id="toggleShowOwn" href="javascript:;">' + Ika.lang.show_own + '<em>' + Ika.counts.own  + '</em></a></li>'; }
			if (Ika.counts.hostile > 0)			{ t += '<li><a id="toggleShowHostile" href="javascript:;">' + Ika.lang.show_hostile + '<em>' + Ika.counts.hostile + '</em></a></li>'; }
			if (Ika.counts.other > 0)			{ t += '<li><a id="toggleShowOther" href="javascript:;">' + Ika.lang.show_other + '<em>' + Ika.counts.other + '</em></a></li>'; }
			if (Ika.counts.ownarmy > 0)			{ t += '<li><a id="toggleShowMyArmy" href="javascript:;"><img src="' + Ika.tabs.my_army + '"> <span>' + Ika.lang.my_army + '</span><em>' + Ika.counts.ownarmy + '</em></a></li>'; }
			if (Ika.counts.hostilearmy > 0)		{ t += '<li><a id="toggleShowOtherArmy" href="javascript:;"><img src="' + Ika.tabs.army + '"> <span>' + Ika.lang.other_army  + '</span><em>' + Ika.counts.hostilearmy + '</em></a></li>'; }
			if (Ika.counts.ownfleet > 0)		{ t += '<li><a id="toggleShowMyFleet" href="javascript:;"><img src="' + Ika.tabs.my_fleet + '"> <span>' + Ika.lang.my_fleet +  '</span><em>' + Ika.counts.ownfleet + '</em></a></li>'; }
			if (Ika.counts.hostilefleet > 0)	{ t += '<li><a id="toggleShowOtherFleet" href="javascript:;"><img src="' + Ika.tabs.fleet + '"> <span>' + Ika.lang.other_fleet  + '</span><em>' + Ika.counts.hostilefleet + '</em></a></li>'; }
			
			for (i in Ika.types)
			{
				if (Ika.types[i][1] > 0 && i != 'Move')
				{
					t += '<li><a id="toggleType' + i + '" href="javascript:;">' + Ika.lang[i] + '<em>' + Ika.types[i][1] + '</em></a></li> ';
				}
			}

			t += '<br /><br />Cities:';
			
			for (i in Ika.target_cities)
			{
				t += '<li class="targetCity"><a class="toggleBattle" name="' + i + '" href="javascript:;">' + Ika.target_cities[i].name + ' <em>' + Ika.target_cities[i].count + '</em></a></li> ';
			}
	
			t += '</ul></div>';

			$(t).insertBefore('#fleetMovements.contentBox .content');
		}

		$(document).ready( function()
		{
			$('#toggleShowAll').click ( function (evt) {
				$("#MovementFilter LI").removeClass('selected');
				$(this).parent().addClass('selected');
				$('#fleetMovements TABLE.locationEvents TR').show();
			});

			$('#toggleUnits').click ( function (evt)			{ $('#fleetMovements TABLE.locationEvents TR.showAllUnits').toggle(); });
			$('#toggleMovementCount').click ( function (evt)	{ $('#MovementFilter LI EM').toggle(); });
			$('#toggleTabsText').click ( function (evt) {
				$('#MovementFilter LI A IMG').toggle();
				$('#MovementFilter LI A SPAN').toggle();
			});
			
			$('#toggleShowTransport').click ( function (evt)	{ Ika.toggleMovementType ('movement_transport');	$(this).parent().addClass('selected'); });
			$('#toggleShowOwn').click ( function (evt)			{ Ika.toggleMovementType ('own'); 					$(this).parent().addClass('selected'); });
			$('#toggleShowOther').click ( function (evt)		{ Ika.toggleMovementType ('other'); 				$(this).parent().addClass('selected'); });
			$('#toggleShowHostile').click ( function (evt)		{ Ika.toggleMovementType ('hostile'); 				$(this).parent().addClass('selected'); });
			$('#toggleShowArmy').click ( function (evt)			{ Ika.toggleMovementType ('movement_army'); 		$(this).parent().addClass('selected'); });
			$('#toggleShowMyArmy').click ( function (evt)		{ Ika.toggleMovementType ('own.movement_army'); 	$(this).parent().addClass('selected'); });
			$('#toggleShowOtherArmy').click ( function (evt)	{ Ika.toggleMovementType ('movement_army', 'own');	$(this).parent().addClass('selected'); });
			$('#toggleShowFleet').click ( function (evt) 		{ Ika.toggleMovementType ('movement_fleet'); 		$(this).parent().addClass('selected'); });
			$('#toggleShowMyFleet').click ( function (evt) 		{ Ika.toggleMovementType ('own.movement_fleet'); 	$(this).parent().addClass('selected'); });
			$('#toggleShowOtherFleet').click ( function (evt)	{ Ika.toggleMovementType ('movement_fleet', 'own');	$(this).parent().addClass('selected'); });

			$('#toggleTypeMove').click ( function (evt)			{ Ika.toggleMovementType('typeMove');	$(this).parent().addClass('selected'); });
			$('#toggleTypeBattle').click ( function (evt)		{ Ika.toggleMovementType('typeBattle');	$(this).parent().addClass('selected'); });
			$('#toggleTypeNavalBattle').click ( function (evt)	{ Ika.toggleMovementType('typeNavalBattle');	$(this).parent().addClass('selected'); });

			$('.toggleBattle').click ( function (evt)
			{
				Ika.toggleMovementType('b_' + $(this).attr('name'));
				$(this).parent().addClass('selected');
			});
			$('.toggleNavalBattle').click ( function (evt)
			{
				Ika.toggleMovementType('nb_' + $(this).attr('name'));
				$(this).parent().addClass('selected');
			});
		});

//		$('BODY').append ('<div id="reloadCounter" title="reload countdown">' + refresh_interval + '</div>');
		setInterval (function rcd() { --refresh_interval; $('#reloadButton').text(Ika.lang.refresh + ' (' + refresh_interval + ' s)'); }, 1000);
		setTimeout ("self.location.reload()", refresh_interval * 1000);

	}

});

/* Remove ambrosia background image */
GM_addStyle("#container #container2 #globalResources .ambrosia A { background:transparent; }");
GM_addStyle("#container #container2 #globalResources .ambrosiaNoSpin A { background:transparent; }");

/* Remove facebook link */
GM_addStyle("#container #facebook_button a {background: transparent;}");

/* Remove other stupid things */
GM_addStyle("#viewCityImperium P {display: none;}");
GM_addStyle("#viewDiplomacyImperium P {display: none;}");
GM_addStyle("#viewMilitaryImperium P {display: none;}");
GM_addStyle("#viewResearchImperium P {display: none;}");
GM_addStyle("#researchLibrary P {display: none;}");
GM_addStyle("#reportInboxLeft P {display: none;}");

//GM_addStyle("#UI-cleanup-navset { display: block; }");
GM_addStyle("UL.UIcleanup-nav { list-style-type: none; padding-top:10px; padding-left:10px; margin-bottom:0; background:#EFD6AE url(/skin/layout/bg_tabs.jpg) no-repeat; }");
GM_addStyle("UL.UIcleanup-nav LI { display:inline-block; padding:0.3em 0.5em; border-bottom:0; }");
GM_addStyle("UL.UIcleanup-nav LI.selected { border:1px solid #C2725B; border-bottom:0; background:#FAEAC6; position:relative; }");
GM_addStyle("UL.UIcleanup-nav LI A { color:#000; }");
GM_addStyle("UL.UIcleanup-nav LI.selected A { color:#000; font-weight: bold !important; }");
GM_addStyle("UL.UIcleanup-nav LI A img { max-width:30px; max-height:20px; display:none; }");
GM_addStyle("UL.UIcleanup-nav LI A SPAN { }");
GM_addStyle("UL.UIcleanup-nav LI A EM { color:#666; font-family:consolas,monospace; border-left:1px solid #DEB065; margin-left:3px; padding-left:2px; }");
GM_addStyle("UL.UIcleanup-nav LI.targetCity { }");
GM_addStyle("UL.UIcleanup-nav LI.targetCity A { color:#00f; }");


// end of script