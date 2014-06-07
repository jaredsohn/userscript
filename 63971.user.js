// coding: utf-8
// ==UserScript==
// @name		Empire Board OverTheTop AddOn
// @namespace	empire-board.ikariam
// @version	3
// @author		oliezekat
// @description	Add-on for Ikariam v3 Empire Board script (require v172 or higher) to display overviews while mouse-over advisors.
// @require	http://userscripts.org/scripts/source/60774.user.js
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************
Require "Ikariam Empire Board" script version 172 (or higher)
with higher priority than this add-on (see GreaseMonkey options)
http://userscripts.org/scripts/show/41051
**************************************************************************************************/

/* Add-on designed as EmpireBoard child object registered with ARexx */

// Remember EmpireBoard and EmpireBoard.ARexx objects
// still exists. And you may not choose child name which
// already used into Ikariam Empire Board.

EmpireBoard.OverTheTopAddon =
	{
	/* Require for ARexx */
	_Parent:						 null,
	EmpireBoardRequiredVersion:		 172,
	AddOnName:						 'Empire Board OverTheTop AddOn',
	
	/* Addon optional metas for ARexx */
	Version:						 3,
	HomePage:						 '',
	ScriptURL:						 '',
	UserScriptsID:					 63971
	};

// Constructor method require for ARexx
// May return true  or false (if failed)
EmpireBoard.OverTheTopAddon.Init = function()
	{
	this.Apply_Styles();
	this.Attach_Events();
	
	return true;
	};
	
EmpireBoard.OverTheTopAddon.Attach_Events = function()
	{
	var self = this;
	
	var advCities = document.getElementById('advCities');
	advCities.addEventListener('mouseover', function(e) { self.advCities_MouseOver_Event(e); }, false);
	advCities.addEventListener('mouseout', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
	advCities.addEventListener('click', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
	
	var advMilitary = document.getElementById('advMilitary');
	advMilitary.addEventListener('mouseover', function(e) { self.advMilitary_MouseOver_Event(e); }, false);
	advMilitary.addEventListener('mouseout', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
	advMilitary.addEventListener('click', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
	
	var advResearch = document.getElementById('advResearch');
	advResearch.addEventListener('mouseover', function(e) { self.advResearch_MouseOver_Event(e); }, false);
	advResearch.addEventListener('mouseout', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
	advResearch.addEventListener('click', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);

	var viewCity = this._Parent.ARexx.DOM_Get_Nodes('//form[@id="changeCityForm"]//li[contains(@class, "viewCity")]/a');
	if (viewCity.snapshotLength > 0)
		{
		viewCity.snapshotItem(0).addEventListener('mouseover', function(e) { self.viewCity_MouseOver_Event(e); }, false);
		viewCity.snapshotItem(0).addEventListener('mouseout', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
		viewCity.snapshotItem(0).addEventListener('click', function(e) { self.EmpireBoard_MouseOut_Event(e); }, false);
		}
	};
	
EmpireBoard.OverTheTopAddon.viewCity_MouseOver_Event = function(e)
	{
	var EmpireBoardDIV = document.getElementById('EmpireBoard');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocus');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocusViewCity');
	};
	
EmpireBoard.OverTheTopAddon.advCities_MouseOver_Event = function(e)
	{
	var EmpireBoardDIV = document.getElementById('EmpireBoard');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocus');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocusAdvCities');
	};
	
EmpireBoard.OverTheTopAddon.advMilitary_MouseOver_Event = function(e)
	{
	var EmpireBoardDIV = document.getElementById('EmpireBoard');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocus');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocusAdvMilitary');
	};
	
EmpireBoard.OverTheTopAddon.advResearch_MouseOver_Event = function(e)
	{
	var EmpireBoardDIV = document.getElementById('EmpireBoard');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocus');
	this.DOM_Add_ClassName(EmpireBoardDIV, 'ottFocusAdvResearch');
	};
	
EmpireBoard.OverTheTopAddon.EmpireBoard_MouseOut_Event = function(e)
	{
	var EmpireBoardDIV = document.getElementById('EmpireBoard');
	this.DOM_Remove_ClassName(EmpireBoardDIV, 'ottFocus');
	this.DOM_Remove_ClassName(EmpireBoardDIV, 'ottFocusAdvCities');
	this.DOM_Remove_ClassName(EmpireBoardDIV, 'ottFocusAdvMilitary');
	this.DOM_Remove_ClassName(EmpireBoardDIV, 'ottFocusAdvResearch');
	this.DOM_Remove_ClassName(EmpireBoardDIV, 'ottFocusViewCity');
	};
	
EmpireBoard.OverTheTopAddon.DOM_Add_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var strCurrentClass = oElm.className;
	if (!new RegExp(strClassName, "i").test(strCurrentClass))
		{
		oElm.className = strCurrentClass + ((strCurrentClass.length > 0)? " " : "") + strClassName;
		}
	};
	
EmpireBoard.OverTheTopAddon.DOM_Remove_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var oClassToRemove = new RegExp((strClassName + "\s?"), "i");
	oElm.className = oElm.className.replace(oClassToRemove, "").replace(/^\s?|\s?$/g, "");
	};
	
EmpireBoard.OverTheTopAddon.Apply_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	.ottFocus { position: absolute; top: 166px; width: 960px !important; left: 50%; margin-left: -480px !important; z-index: 1000; }

	.ottFocus .Table,
	.ottFocus #EmpireBoardSettings,
	.ottFocus #EmpireBoardAddons, 
	.ottFocus .Table p.Caption,
	.ottFocus p.Footer { display: none !important; }
	
	.ottFocus .Table table.Overview {  border-style: solid !important; border-width: 3px !important; }
	
	.ottFocusAdvCities #EmpireBoardResources { display: block !important; }
	.ottFocusAdvMilitary #EmpireBoardArmy { display: block !important; }
	.ottFocusAdvResearch #EmpireBoardBuildings { display: block !important; }
	
	.ottFocusViewCity #EmpireBoardResources { display: block !important; }
	.ottFocusViewCity #EmpireBoardArmy { display: block !important; }
	.ottFocusViewCity #EmpireBoardBuildings { display: block !important; }
	.ottFocusViewCity table.Overview tfoot { display: none !important;}
	.ottFocusViewCity table.Overview tbody tr { display: none !important;}
	.ottFocusViewCity table.Overview tbody tr.current { display: table-row !important;}
	
	]]></>.toXMLString();

	GM_addStyle(default_style);
	};

EmpireBoard.ARexx.RegisterAddOn(EmpireBoard.OverTheTopAddon);