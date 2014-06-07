// coding: utf-8
// ==UserScript==
// @name          BYBS Empire Board Graphic
// @namespace     domz
// @version	  1.0
// @author	  domz
// @description   Graphic add-on for Ikariam v3 Empire Board script (require v145 or higher).
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
// ==/UserScript==

/**************************************************************************************************
Require Ikariam v3 Empire Board version 145 or higher with higher priority
http://userscripts.org/scripts/show/41051
**************************************************************************************************/

if (!EmpireBoard) var EmpireBoard = {};
if (!EmpireBoard.GraphicAddon) EmpireBoard.GraphicAddon = {};

EmpireBoard.GraphicAddon =
	{
	Init: function()
		{
		if (document.getElementById("EmpireBoard") != null)
			{
			EmpireBoard.GraphicAddon.Apply_Styles();
			}
		},
	
	Apply_Styles: function()
		{
		// define CSS 
		var default_style = <><![CDATA[
		/** Resources table **/
		#EmpireBoard .Resources th { height: 26px; }
		#EmpireBoard .Resources th.population,
		#EmpireBoard .Resources th.wood,
		#EmpireBoard .Resources th.wine,
		#EmpireBoard .Resources th.marble,
		#EmpireBoard .Resources th.crystal,
		#EmpireBoard .Resources th.sulfur,
		#EmpireBoard .Resources th.incomes { height: 26px; color: transparent;}

		#EmpireBoard .Resources th.population {background: url(skin/resources/icon_population.gif) no-repeat center center;}
		#EmpireBoard .Resources th.wood {background: url(skin/resources/icon_wood.gif) no-repeat center center;}
		#EmpireBoard .Resources th.wine {background: url(skin/resources/icon_wine.gif) no-repeat center center;}
		#EmpireBoard .Resources th.marble {background: url(skin/resources/icon_marble.gif) no-repeat center center;}
		#EmpireBoard .Resources th.crystal {background: url(skin/resources/icon_glass.gif) no-repeat center center;}
		#EmpireBoard .Resources th.sulfur {background: url(skin/resources/icon_sulfur.gif) no-repeat center center;}
		#EmpireBoard .Resources th.incomes {background: url(skin/resources/icon_gold.gif) no-repeat center center;}

		/** Buildings table **/
		#EmpireBoard .Buildings th { height: 36px; }
		#EmpireBoard .Buildings th.build_name0,
		#EmpireBoard .Buildings th.build_name1,
		#EmpireBoard .Buildings th.build_name2,
		#EmpireBoard .Buildings th.build_name3,
		#EmpireBoard .Buildings th.build_name4,
		#EmpireBoard .Buildings th.build_name5,
		#EmpireBoard .Buildings th.build_name6 { color: transparent; }

		#EmpireBoard .Buildings th.townHall {background: url(skin/img/city/building_townhall.gif) no-repeat -20px -52px;}
		#EmpireBoard .Buildings th.academy {background: url(skin/img/city/building_academy.gif) no-repeat -57px -1px;}
		#EmpireBoard .Buildings th.port {background: url(skin/img/city/building_port.gif) no-repeat -21px -52px;}
		#EmpireBoard .Buildings th.shipyard {background: url(skin/img/city/building_shipyard.gif) no-repeat -58px -32px;}
		#EmpireBoard .Buildings th.warehouse {background: url(skin/img/city/building_warehouse.gif) no-repeat -10px -23px;}
		#EmpireBoard .Buildings th.wall {background: url(skin/img/city/building_wall.gif) no-repeat -99px -39px;}
		#EmpireBoard .Buildings th.tavern {background: url(skin/img/city/building_tavern.gif) no-repeat -25px -6px;}
		#EmpireBoard .Buildings th.museum {background: url(skin/img/city/building_museum.gif) no-repeat -44px -21px;}
		#EmpireBoard .Buildings th.palace {background: url(skin/img/city/building_palace.gif) no-repeat -25px -40px;}
		#EmpireBoard .Buildings th.palaceColony {background: url(skin/img/city/building_palaceColony.gif) no-repeat -45px -35px;}
		#EmpireBoard .Buildings th.embassy {background: url(skin/img/city/building_embassy.gif) no-repeat -14px -33px;}
		#EmpireBoard .Buildings th.branchOffice {background: url(skin/img/city/building_branchOffice.gif) no-repeat -15px -35px;}
		#EmpireBoard .Buildings th.safehouse {background: url(skin/img/city/building_safehouse.gif) no-repeat 1px -11px;}
		#EmpireBoard .Buildings th.barracks {background: url(skin/img/city/building_barracks.gif) no-repeat -45px -22px;}
		#EmpireBoard .Buildings th.workshop {background: url(skin/img/city/building_workshop.gif) no-repeat -9px -24px;}
		#EmpireBoard .Buildings th.carpentering {background: url(skin/img/city/building_carpentering.gif) no-repeat -13px -25px;}
		#EmpireBoard .Buildings th.forester {background: url(skin/img/city/building_forester.gif) no-repeat -19px -25px;}
		#EmpireBoard .Buildings th.stonemason {background: url(skin/img/city/building_stonemason.gif) no-repeat -77px -31px;}
		#EmpireBoard .Buildings th.glassblowing {background: url(skin/img/city/building_glassblowing.gif) no-repeat -36px -25px;}
		#EmpireBoard .Buildings th.winegrower {background: url(skin/img/city/building_winegrower.gif) no-repeat -37px -33px;}
		#EmpireBoard .Buildings th.alchemist {background: url(skin/img/city/building_alchemist.gif) no-repeat -26px -30px;}
		#EmpireBoard .Buildings th.architect {background: url(skin/img/city/building_architect.gif) no-repeat -20px -12px;}
		#EmpireBoard .Buildings th.optician {background: url(skin/img/city/building_optician.gif) no-repeat -28px -17px;}
		#EmpireBoard .Buildings th.vineyard {background: url(skin/img/city/building_vineyard.gif) no-repeat -56px -31px;}
		#EmpireBoard .Buildings th.fireworker {background: url(skin/img/city/building_fireworker.gif) no-repeat -58px -11px;}

		/** Army table **/
		#EmpireBoard .Army th { height: 32px; }
		#EmpireBoard .Army th.unit_name {color: transparent;}

		#EmpireBoard .Army th.ship_ram {background: url(skin/characters/fleet/40x40/ship_ram_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_ballista {background: url(skin/characters/fleet/40x40/ship_ballista_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_flamethrower {background: url(skin/characters/fleet/40x40/ship_flamethrower_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_catapult {background: url(skin/characters/fleet/40x40/ship_catapult_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_steamboat {background: url(skin/characters/fleet/40x40/ship_steamboat_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_mortar {background: url(skin/characters/fleet/40x40/ship_mortar_r_40x40.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ship_submarine {background: url(skin/characters/fleet/40x40/ship_submarine_r_40x40.gif) no-repeat center -3px;}

		#EmpireBoard .Army th.slinger {background: url(skin/characters/military/x40_y40/y40_slinger_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.swordsman {background: url(skin/characters/military/x40_y40/y40_swordsman_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.phalanx {background: url(skin/characters/military/x40_y40/y40_phalanx_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.archer {background: url(skin/characters/military/x40_y40/y40_archer_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.marksman {background: url(skin/characters/military/x40_y40/y40_marksman_faceright.gif) no-repeat center -2px;}
		#EmpireBoard .Army th.gyrocopter {background: url(skin/characters/military/x40_y40/y40_gyrocopter_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.steamgiant {background: url(skin/characters/military/x40_y40/y40_steamgiant_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.bombardier {background: url(skin/characters/military/x40_y40/y40_bombardier_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.ram {background: url(skin/characters/military/x40_y40/y40_ram_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.catapult {background: url(skin/characters/military/x40_y40/y40_catapult_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.mortar {background: url(skin/characters/military/x40_y40/y40_mortar_faceright.gif) no-repeat center -3px;}
		#EmpireBoard .Army th.medic {background: url(skin/characters/military/x40_y40/y40_medic_faceright.gif) no-repeat center -2px;}
		#EmpireBoard .Army th.cook {background: url(skin/characters/military/x40_y40/y40_cook_faceright.gif) no-repeat center -3px;}
		]]></>.toXMLString();

		GM_addStyle(default_style);
		}
	}

EmpireBoard.GraphicAddon.Init();