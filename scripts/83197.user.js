// coding: utf-8

// ==UserScript==

// @name                Ikariam Açıklamalar V.1.2

// @namespace      	thin-views.ikariam

// @description    	İkariam asker ve gemi basımındaki açıklamalardan kurtulun (www.ikariam.forumm.biz)

// @version		6

// @author			oliezekat

// @include     http://*.ikariam.*/*

// @exclude    http://board.ikariam.*/*

// @exclude    http://ikariam.ogame-world.com/*

// @exclude    http://www.ika-world.com/*

// @exclude    http://ikariamap.com/*

// @exclude    http://support.ikariam.*/*

// ==/UserScript==

if (!ThinViews) var ThinViews = {};

ThinViews =
	
{
	View: ''
	};
	
ThinViews.Init = function()
	{
	
// Fetch view name
	
ThinViews.View = ThinViews.Grab.View();
	
	
switch(ThinViews.View)
		{
		
case 'academy':
		
case 'blockade':
		
case 'branchOffice':
		
case 'buildingGround':
		
case 'carpentering':
		
case 'cityMilitary-army':
		
case 'cityMilitary-fleet':
		
case 'colonize':
		
case 'culturalPossessions_assign':
		
case 'defendCity':
		
case 'deployment':
		
case 'diplomacyAdvisorTreaty':
		
case 'diplomacyAdvisorOutBox':
		
case 'diplomacyAdvisor':
		
case 'embassy':
		
case 'militaryAdvisorReportView':
		
case 'militaryAdvisorMilitaryMovements':
		
case 'militaryAdvisorCombatReports':
		
case 'merchantNavy':
		
case 'museum':
		
case 'plunder':
		
case 'researchAdvisor':
		
case 'resource':
		
case 'safehouse':
		
case 'takeOffer':
		
case 'tavern':
		
case 'tradeAdvisor':
	
		
ThinViews.Set_buildingDescription_Styles();
			
break;
			
		

case 'transport':
			
ThinViews.Set_buildingDescription_Styles();
			
ThinViews.Set_Transport_Styles();
			
break;
		
		
case 'barracks':
			
ThinViews.Set_buildingDescription_Styles();
			
ThinViews.Set_Barracks_Styles();
			
break;
			
		
case 'shipyard':
			
ThinViews.Set_buildingDescription_Styles();
			
ThinViews.Set_ShipYard_Styles();
			
break;
			
		
default:
			
break;
		
}
	
};
	

ThinViews.Set_buildingDescription_Styles = function()
	
{
	
// define CSS 
	var default_style = <><![CDATA[
	
body .buildingDescription 
{ background-image: none !important; height: auto !important; }
	
body .buildingDescription h1 { font-size: 15px !important; }
	
body .buildingDescription p { display: none; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	}
	

ThinViews.Set_Barracks_Styles = function()
	{
	
// define CSS 
	var default_style = <><![CDATA[
	
body#barracks ul#units .unit {min-height: 95px !important; padding: 0px !important; overflow: hidden;}
	
body#barracks ul#units .unitinfo p {display: none;}
	
body#barracks ul#units .unitinfo a img {max-height: 55px; margin-left: 15px;}
	
body#barracks ul#units .unitinfo .unitcount {top: 68px !important; left: 20px !important;}

	
]]></>.toXMLString();
	GM_addStyle(default_style);
	};


ThinViews.Set_ShipYard_Styles = function()
	{
	
// define CSS 
	var default_style = <><![CDATA[
	
body#shipyard ul#units .unit {min-height: 95px !important; padding: 0px !important; overflow: hidden;}
	
body#shipyard ul#units .unitinfo p {display: none;}
	
body#shipyard ul#units .unitinfo a img {max-height: 55px; margin-left: 15px;}
	
body#shipyard ul#units .unitinfo .unitcount {top: 68px !important; left: 20px !important;}
	]]></>.toXMLString();
	
GM_addStyle(default_style);
	};
	

ThinViews.Set_Transport_Styles = function()
	{
	

// define CSS 
	var default_style = <><![CDATA[
	
body#transport #setPremiumTransports div.content p { display: none; }
	
body#transport #setPremiumTransports div.content p.costs { display: block; }
	
body#transport #transportGoods div.content p { display: none; }
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