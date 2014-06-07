// coding: utf-8

// ==UserScript==

// @name	Ika-Vista Compacta

// @namespace	thin-views.ikariam

// @description	Vista compacta en cuarteles y astilleros.

// @version	v4.5
// @author	2-D (o Reaper)

// @include	http://m*.ikariam.*/*

// @include	http://m*.*.ikariam.*/*

// @exclude	http://support.ikariam.*/*

// @exclude	http://board.*.ikariam.*/*


// ==/UserScript==

if (!ThinViews) var ThinViews = {};

ThinViews =
	{
	Grab: {},
	View: ''
	};
	
ThinViews.Init = function()
	{
	// Fetch view name
	this.View = this.Grab.View();
	
	switch(this.View)
		{
		case 'academy':
		case 'alchemist':
		case 'architect':
		case 'branchOffice':
		case 'buildingDetail':
		case 'buildingGround':
		case 'carpentering':
		case 'cityMilitary-army':
		case 'cityMilitary-fleet':
		case 'culturalPossessions_assign':
		case 'diplomacyAdvisorTreaty':
		case 'diplomacyAdvisorOutBox':
		case 'diplomacyAdvisor':
		case 'diplomacyAdvisorAlly':
		case 'diplomacyAdvisorArchive':
		case 'diplomacyAdvisorArchiveOutBox':
		case 'embassy':
		case 'fireworker':
		case 'forester':
		case 'glassblowing':
		case 'islandBoard':
		case 'militaryAdvisorReportView':
		case 'militaryAdvisorMilitaryMovements':
		case 'militaryAdvisorCombatReports':
		case 'militaryAdvisorCombatReportsArchive':
		case 'merchantNavy':
		case 'museum':
		case 'options':
		case 'optician':
		case 'palace':
		case 'palaceColony':
		case 'port':
		case 'relatedCities':
		case 'researchOverview':
		case 'resource':
		case 'safehouse':
		case 'safehouseMissions':
		case 'stonemason':
		case 'tavern':
		case 'temple':
		case 'tradegood':
		case 'tradeAdvisor':
		case 'tradeAdvisorTradeRoute':
		case 'vineyard':
		case 'wall':
		case 'winegrower':
		case 'workshop':
			this.Set_buildingDescription_Styles();
			break;
			
		case 'dump':
		case 'warehouse':
			this.Set_buildingDescription_Styles();
			this.Set_Warehouse_Styles();
			break;
			
		case 'researchAdvisor':
			this.Set_buildingDescription_Styles();
			this.Set_researchAdvisor_Styles();
			break;
			
		case 'deployment':
			this.Set_buildingDescription_Styles();
			this.Set_AssignUnits_Styles();
			break;
			
		case 'defendCity':
		case 'defendPort':
		case 'blockade':
		case 'plunder':
		case 'occupy':
			this.Set_buildingDescription_Styles();
			this.Set_AssignUnits_Styles();
			break;
		
		case 'transport':
			this.Set_buildingDescription_Styles();
			this.Set_Transport_Styles();
			this.Set_Transporters_Styles();
			this.Set_JetPropulsion_Styles();
			break;
		
		case 'colonize':
			this.Set_buildingDescription_Styles();
			this.Set_Colony_Styles();
			this.Set_Transporters_Styles();
			this.Set_JetPropulsion_Styles();
			break;
		
		case 'barracks':
		case 'armyGarrisonEdit':
			this.Set_buildingDescription_Styles();
			this.Set_Barracks_Styles();
			break;
			
		case 'shipyard':
		case 'fleetGarrisonEdit':
			this.Set_buildingDescription_Styles();
			this.Set_ShipYard_Styles();
			break;
			
		case 'takeOffer':
			this.Set_TakeOffer_Styles();
			this.Set_Transporters_Styles();
			this.Set_JetPropulsion_Styles();
			break;
			
		case 'finances':
			this.Set_Finances_Styles();
			break;
			
		case 'city':
			this.Set_City_Styles();
			break;
			
		case 'sendSpy':
		case 'spyMissions':
			this.Set_buildingDescription_Styles();
			this.Set_spyMissions_Styles();
			break;
			
		default:
			break;
		}
	};
	
ThinViews.Set_researchAdvisor_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	#container #mainview .researchType { padding: 3px 0; }
	#container #mainview .researchType p { font-size: 10px; }
	#container #mainview .researchType .researchInfo { min-height: 95px !important; }
	#container #mainview .researchType ul.resources li { margin:0; height:auto;line-height:14px;}
	#container #mainview .researchType ul.resources li.researchPointsDiff { font-size:11px; }
	.researchInfo .leftBranch { top: 8px; }
	.researchInfo .leftBranch img { display: none; }
	.researchButton { top: -25px; }
	.researchButton2 { top: 18px; }
	.researchType .costs { top: 55px; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_Finances_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	table#tickTable, table#upkeepTable {display: none;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_City_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	#popupMessage_winter {display: none;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_buildingDescription_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	body .buildingDescription { background-image: none !important; height: auto !important; }
	body .buildingDescription {min-height: 40px !important;}
	body .buildingDescription h1 { font-size: 15px !important; }
	body .buildingDescription p { display: none; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_spyMissions_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#mainview .missionWrapper p { display:none;}
	.missionWrapper .missionImg { display:none; }
	.missionWrapper .spyImg-big { display:none; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_AssignUnits_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	#mainview .assignUnits li {padding: 8px 0px 0px 0px !important}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_Warehouse_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	.premiumFeature { display: none; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_TakeOffer_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	body #mainview p { display: none; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_JetPropulsion_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	#mainview #setPremiumJetPropulsion .sliderBox { padding-top:0px; min-height:52px;}
	#mainview #setPremiumJetPropulsion .costs { display:block !important; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
// Fix bad margin
ThinViews.Set_Transporters_Styles = function()
	{
	// define CSS
	var default_style = <><![CDATA[
	#missionSummary .transporters { width: 180px !important; margin-left: 20px !important; }
	#setPremiumTransports .content { overflow: hidden; }
	#setPremiumTransports .content p { display: none; }
	#setPremiumTransports .costs { display:block !important; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_Barracks_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#mainview #button_purchase { margin-right: 20px; }
	
	body ul#units .unit {min-height: 95px !important; padding: 0px !important; overflow: hidden;}
	body ul#units .unitinfo p {display: none;}
	body ul#units .unitinfo img {max-height: 55px; margin-left: 25px;}
	body ul#units .unitinfo .unitcount {top: 68px !important;}
	
	#mainview .unit .forminput { bottom: 44px; }
	#armyGarrisonEdit #mainview .unit .forminput { bottom: -14px; }
	#armyGarrisonEdit #mainview .unit .forminput .centerButton { margin-top: 0px; margin-bottom: 10px; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};

ThinViews.Set_ShipYard_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#mainview #button_purchase { margin-right: 20px; }
	
	body ul#units .unit {min-height: 95px !important; padding: 0px !important; overflow: hidden;}
	body ul#units .unitinfo p {display: none;}
	body ul#units .unitinfo img {max-height: 55px; margin-left: 25px;}
	body ul#units .unitinfo .unitcount {top: 68px !important;}
	
	#mainview .unit .forminput { bottom: 44px; }
	#fleetGarrisonEdit #mainview .unit .forminput { bottom: -4px; }
	#fleetGarrisonEdit #mainview .unit .forminput .centerButton { margin-top: 0px; margin-bottom: 10px; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	
ThinViews.Set_Transport_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#transportGoods .content p { display: none; }
	#container #mainview hr { margin:5px 20px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Set_Colony_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#container #mainview hr { margin:5px 20px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	
ThinViews.Grab = {};

ThinViews.Grab.View = function()
	{
	var sView = '';
	
	// Fetch view name
	try
		{
		sView = document.getElementsByTagName("body")[0].id;
		}
	catch (e)
		{
		var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
		if (url_view != null) sView = RegExp.$1;
		}
		
	return sView;
	};

ThinViews.Init();
