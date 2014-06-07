// ==UserScript==
// @name           Grepolis Transportomer RU
// @namespace      
// @author         Athene (Руссифицировал Evgenatrix он же Jestex)
// @version        1.2
// @description    Автоподсчет вместимости транспортов
// @include        http://*.grepolis.com/game/*
// @icon           http://cdn.grepolis.com/images/game/units/small_transporter_90x90.jpg
// ==/UserScript==
//http://userscripts.org/scripts/show/122217 - german original script
//

if (true)
{
	var scriptEl = document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.appendChild(document.createTextNode("\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	 global constants and data 																							/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	var POPULATION_FOR_SMALL_TRANSPORTER = 5;\
	var POPULATION_FOR_BIG_TRANSPORTER = 7;\
	var CAPACITY_OF_SMALL_TRANSPORTER = 10;\
	var CAPACITY_OF_BIG_TRANSPORTER = 20;\
	var CAPACITY_BERTH_OFFSET = 6;\
	var g_hintWndId;\
	var description_msg;\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	The Handler of the ajaxComplete event. Creates the hint window initiator button and overwrites the MenuBubbleOrders.renderHtml to ensure the availibility of all neccessary data																				*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function tb_ajaxComplete(e, xhr, settings)\
	{\
		var url=settings.url.split(/&/)[0];\
		if(url == '/game/data?action=get')\
		{\
			\
			$('<div id=\\\'menuCapacityContainer\\\' style=\\\'z-index:1000;position:relative;width:132px;font-size:85%;margin:0px 0px 0px 2px;\\\'></div>').appendTo('#units_sidebar');\
			$('<div id=\\\'menuCapacity\\\'></div>').prependTo('#menuCapacityContainer');\
			$('#menuCapacity').css('width','25%').css('background','url(\\\'http://cdn.grepolis.com/images/game/layout/interface_sprite.jpg\\\') no-repeat scroll -322px -159px transparent').css('width','120px').css('padding','5px 5px 10px 5px').css('text-align','left');\
			$('<a id=\\\'CapacityTool\\\' style=\\\'color:#FC6;padding:2px;text-align:left;\\\' href=\\\' \\\' >Транспортомер</a><br/>').appendTo('#menuCapacity');\
			$('#CapacityTool').click(OnClick);\
			\
			var f = MenuBubbleOrders.renderHtml;\
			MenuBubbleOrders.renderHtml = function (data) {\
				var r = f(data);\
				updateHintWindow();\
				return r;\
			}\
			\
		}\
	};\
	\
	$('body').ajaxComplete(tb_ajaxComplete);\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	The Handler of the Capacity Calculator click event 																	*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function OnClick()\
	{\
		createHintWnd();\
		updateHintWindow();\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	obtains all necessary values, creates the hint string and shows it in the hint window								*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function updateHintWindow()\
	{\
		var hintWnd = GPWindowMgr.GetByID(g_hintWndId);\
		if(!hintWnd)\
			return;\
		\
		var freePopulation = getBHP();\
		var existingCapacity = getTransportCapacity();\
		var existingGroundUnits = getGroundUnits();\
		\
		var out = createHint(freePopulation, existingCapacity, existingGroundUnits);\
		\
		setHintWndContent(hintWnd, out);\
		\
	};\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/* Creates the hint string																								*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function createHint(freePopulation, existingCapacity, existingGroundUnits)\
	{\
	var DescriptionMsg1 = 'Скрипт может немного округлять значения!';\
		var DescriptionMsg2 = '=======================';\
		var textCapacity = 'Вместимость: ' + existingCapacity;\
		var textUnits = 'Юнитов:   ' + existingGroundUnits;\
		var textHintSmall = getSmallTransporterHint(freePopulation, existingCapacity, existingGroundUnits);\
		var textHintBig = getBigTransporterHint(freePopulation, existingCapacity, existingGroundUnits);\
		\
		if(textHintSmall != textHintBig)\
			return '<br>' + DescriptionMsg1 + '<br>' + DescriptionMsg2 + '<br>' + '<br>' + textCapacity + '<br>' + textUnits  + '<br><br>' + textHintSmall + '<br><br>ИЛИ:<br><br>' + textHintBig +'<br>';\
		else\
			return '<br>' + textCapacity + '<br>' + textUnits  + '<br><br>' + textHintSmall + '<br>';\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/* Sets the content, position and z-order of the hint window															*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function setHintWndContent(hintWnd, hint)\
	{\
		var buttonClose = '<br><a id=\\\'closeButton\\\' href=\\\'#\\\' class=\\\'button\\\'><span class=\\\'left\\\'><span class=\\\'right\\\'><span class=\\\'middle\\\'>Закрыть</span></span></span></span></a>';\
		\
		hintWnd.setContent(hint + buttonClose);\
		hintWnd.toTop();\
		$('#closeButton').click(function() {\
				hintWnd.close();\
			});\
		\
		var pos = hintWnd.getPosition();\
		hintWnd.setTitle(Game.townName);\
		pos.position[0] = 16;\
		pos.position[1] = innerHeight - pos.height - 16;\
		hintWnd.setPosition(pos.position);\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/* 	Creates the hint window.																							*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function createHintWnd()\
	{\
		var hintWind = GPWindowMgr.GetByID(g_hintWndId);\
		if(!hintWind)\
		{\
			hintWind=GPWindowMgr.Create(GPWindowMgr.TYPE_NOTIFICATION_POPUP, 'ÖÖÖ', null);\
			hintWind.setWidth(280);\
			g_hintWndId = hintWind.getID();\
		}\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/* Reads the amount of free population from the related span															*/\
	/* of the res_wrapper division and returns its value.																	*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getBHP()\
	{\
		var freePopulation = $('span[id=\\\'pop_current\\\']').html();\
		return  freePopulation == null ? 0 : parseInt(freePopulation);\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Reads the amount of total transport capacity of small and big transporter from the MenuBubbleOrders					*/\
	/* 	and returns its value.																								*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getTransportCapacity()\
	{\
		var transporterSmall = MenuBubbleOrders.units.small_transporter.total;\
		var transporterBig = MenuBubbleOrders.units.big_transporter.total;\
		\
		transporterSmall =  transporterSmall == null ? 0 : parseInt(transporterSmall) * getCapacity(CAPACITY_OF_SMALL_TRANSPORTER);\
		transporterBig =  transporterBig == null ? 0 : parseInt(transporterBig) * getCapacity(CAPACITY_OF_BIG_TRANSPORTER);\
		\
		return transporterSmall + transporterBig + getTransportCapacityInRecruitQueue();\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Reads the amount of total population of all ground units to be transported from the 								*/\
	/* 	from the MenuBubbleOrders and returns its value.																	*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getGroundUnits()\
	{\
		var sword = getUnitCount(MenuBubbleOrders.units.sword, 1);\
		var slinger = getUnitCount(MenuBubbleOrders.units.slinger, 1);\
		var hoplite = getUnitCount(MenuBubbleOrders.units.hoplite, 1);\
		var archer = getUnitCount(MenuBubbleOrders.units.archer, 1);\
		var rider = getUnitCount(MenuBubbleOrders.units.rider, 3);\
		var chariot = getUnitCount(MenuBubbleOrders.units.chariot, 4);\
		var catapult = getUnitCount(MenuBubbleOrders.units.catapult, 15);\
		var minotaur = getUnitCount(MenuBubbleOrders.units.minotaur, 30);\
		var zyklop = getUnitCount(MenuBubbleOrders.units.zyklop, 40);\
		var medusa = getUnitCount(MenuBubbleOrders.units.medusa, 18);\
		var centaur = getUnitCount(MenuBubbleOrders.units.centaur, 12);\
		var cerberus = getUnitCount(MenuBubbleOrders.units.cerberus, 30);\
		var fury = getUnitCount(MenuBubbleOrders.units.fury, 55);\
		\
		var recruits = getGroundUnitsInRecruitQueue();\
		\
		return sword + slinger + hoplite + archer + rider + chariot + catapult + \
				zyklop + minotaur + centaur + medusa + cerberus + fury + recruits;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Obtains the amount of unita certain unit													.						*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getUnitCount(unit, needsPopulation)\
	{\
		if(unit)\
			return unit.total * needsPopulation;\
		else\
			return 0;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Obtains the amount of units and small transporter to build and creates a string containing the hint.						*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getSmallTransporterHint(freePopulation, existingCapacity, existingGroundUnits)\
	{\
		var transporterToBuild = calculateSmallTransportsToBuild(freePopulation, existingCapacity, existingGroundUnits);\
		var groundUnitsToBuild = calculateUnitsToBuild(freePopulation, transporterToBuild);\
		\
		var transporterAction = transporterToBuild > 0 ? 'Строить ' : 'Разбить ';\
		var groundUnitsAction = groundUnitsToBuild > 0 ? 'строить ' : 'Разбить ';\
		\
		var transporterHint = transporterToBuild != 0 ? transporterAction + Math.abs(transporterToBuild) + ' - Быстрых транспортов и' : 'Вместимости хватает';\
		var groundUnitsHint = groundUnitsToBuild != 0 ? groundUnitsAction + Math.abs(groundUnitsToBuild) + ' единиц(-у, -ы) !' : 'Всех юнитов можно перевезти';\
		\
		return  transporterHint + '<br>' + groundUnitsHint;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Obtains the amount of units and big transporter to build and creates a string containing the hint.						*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getBigTransporterHint(freePopulation, existingCapacity, existingGroundUnits)\
	{\
		var transporterToBuild = calculateBigTransportsToBuild(freePopulation, existingCapacity, existingGroundUnits);\
		var groundUnitsToBuild = calculateUnitsToBuild(freePopulation, transporterToBuild);\
		\
		var transporterAction = transporterToBuild > 0 ? 'Строить ' : 'Разбить ';\
		var groundUnitsAction = groundUnitsToBuild > 0 ? 'строить ' : 'Разбить ';\
		\
		var transporterHint = transporterToBuild != 0 ? transporterAction + Math.abs(transporterToBuild) + ' - Медленных транспортов и' : 'Вместимости хватает';\
		var groundUnitsHint = groundUnitsToBuild != 0 ? groundUnitsAction + Math.abs(groundUnitsToBuild) + ' единиц(-у, -ы) !' : 'Всех юнитов можно перевезти';\
		\
		return  transporterHint + '<br>' + groundUnitsHint;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Calculating the amount of transporter to be build to achieve a balance of transporter 								*/\
	/*	and ground units in relation of the available population.															*/\
	/*	The following formulas are used:																					*/\
	/*																														*/\
	/*	I: describes the balance of transport capacity and amount of ground units:											*/\
	/*																														*/\
	/*		CAPACITY_OF_SMALL_TRANSPORTER*TransportsToBuild + existingCapacity = existingGroundUnits+ groundUnitsToBuild	*/\
	/*																														*/\
	/*	II: describes the influence of the free population to the amount of transporter and units to be build				*/\
	/*																														*/\
	/*		freePopulation = POPULATION_FOR_SMALL_TRANSPORTER*TransportsToBuild + groundUnitsToBuild						*/\
	/*																														*/\
	/*	remark: the function may return a negative value. In this case the absolute value indicates							*/\
	/*			the amount of transporter to be bricked.																	*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function calculateSmallTransportsToBuild(freePopulation, existingCapacity, existingGroundUnits)\
	{\
		return Math.ceil((existingGroundUnits - existingCapacity + freePopulation) / (getCapacity(CAPACITY_OF_SMALL_TRANSPORTER) + POPULATION_FOR_SMALL_TRANSPORTER));\
	}\
	\
	function calculateBigTransportsToBuild(freePopulation, existingCapacity, existingGroundUnits)\
	{\
		return Math.ceil((existingGroundUnits - existingCapacity + freePopulation) / (getCapacity(CAPACITY_OF_BIG_TRANSPORTER) + POPULATION_FOR_BIG_TRANSPORTER));\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Calculates the amount of Ground Units to be build to achieve a balance of transporter.								*/\
	/*	refer to the comment of calculateXXXTransportsToBuild for detailed information.										*/\
	/*																														*/\
	/*	remark: the function may return a negative value. In this case the absolute value indicates							*/\
	/*			the amount of units to be bricked.																			*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function calculateUnitsToBuild(freePopulation, transporterToBuild)\
	{\
		return parseInt(freePopulation - (POPULATION_FOR_SMALL_TRANSPORTER * transporterToBuild));\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Gets Transport capacity depending on the reserches 																	*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getCapacity(baseCapacity)\
	{\
		var offset = ITowns.getTown(Game.townId).researches().berth ? CAPACITY_BERTH_OFFSET : 0;\
		return baseCapacity + offset;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Iterates the recruitQueue and returns the amount of ground units in it												*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getGroundUnitsInRecruitQueue()\
	{\
		var count = 0;\
		for(i = 0; i<MenuBubbleOrders.orders_count; i++)\
		{\
			var unitId = MenuBubbleOrders.orders[i].unit_id;\
			var toBuild = MenuBubbleOrders.orders[i].units_left;\
			\
			if(unitId == 'sword' || unitId == 'slinger' || unitId == 'archer' || unitId == 'hoplite')\
			{\
				count += toBuild;\
			}\
			else if(unitId == 'rider')\
			{\
				count += toBuild * 3;\
			}\
			else if(unitId == 'chariot')\
			{\
				count += toBuild * 4;\
			}\
			else if(unitId == 'catapult')\
			{\
				count += toBuild * 15;\
			}\
			else if(unitId == 'zyklop')\
			{\
				count += toBuild * 40;\
			}\
			else if(unitId == 'minotaur')\
			{\
				count += toBuild * 30;\
			}\
			else if(unitId == 'centaur')\
			{\
				count += toBuild * 12;\
			}\
			else if(unitId == 'medusa')\
			{\
				count += toBuild * 18;\
			}\
			else if(unitId == 'cerberus')\
			{\
				count += toBuild * 30;\
			}\
			else if(unitId == 'fury')\
			{\
				count += toBuild * 55;\
			}\
		}\
		return count;\
	}\
	\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	/*	Iterates the recruitQueue and returns the amount of transport capacity in it										*/\
	/*----------------------------------------------------------------------------------------------------------------------*/\
	\
	function getTransportCapacityInRecruitQueue()\
	{\
		var count = 0;\
		for(i = 0; i < MenuBubbleOrders.orders_count; i++)\
		{\
			var unitId = MenuBubbleOrders.orders[i].unit_id;\
			var toBuild = MenuBubbleOrders.orders[i].units_left;\
			\
			if(unitId == 'small_transporter')\
			{\
				count += toBuild * getCapacity(CAPACITY_OF_SMALL_TRANSPORTER);\
			}\
			else if(unitId == 'big_transporter')\
			{\
				count += toBuild * getCapacity(CAPACITY_OF_BIG_TRANSPORTER);\
			}\
		}\
		return count;\
	}\
"));
document.body.appendChild(scriptEl);
}