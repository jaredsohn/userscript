// coding: utf-8
// ==UserScript==
// @name		Empire Board Shortcuts AddOn
// @namespace	empire-board.ikariam
// @version	2
// @author		oliezekat
// @description	Add-on for Ikariam v3 Empire Board script (require v168 or higher). Display buttons near advisors and provide keyboard shortcuts.
// @require	http://userscripts.org/scripts/source/60774.user.js
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************
Require "Ikariam Empire Board" script version 168 (or higher)
with higher priority than this add-on (see GreaseMonkey options)
http://userscripts.org/scripts/show/41051
**************************************************************************************************/

/* Add-on designed as EmpireBoard child object registered with ARexx */

// Remember EmpireBoard and EmpireBoard.ARexx objects
// still exists. And you may not choose child name which
// already used into Ikariam Empire Board.

EmpireBoard.ShortcutsAddon =
	{
	/* Require for ARexx */
	_Parent:						 null,
	EmpireBoardRequiredVersion:		 168,
	AddOnName:						 'Empire Board Shortcuts AddOn',
	
	/* Addon optional metas for ARexx */
	Version:						 2,
	HomePage:						 '',
	ScriptURL:						 '',
	UserScriptsID:					 60840
	};

// Constructor method require for ARexx
// May return true  or false (if failed)
EmpireBoard.ShortcutsAddon.Init = function()
	{
	this.Apply_Styles();
	
	var advCities = document.getElementById("advCities");
	advCities.innerHTML += '<a accesskey="x" title="Empire Board - resources - overview [Alt+Shift+X]" href="#EmpireBoardResources" class="EmpireBoardShortcut"></a>';
	
	var advMilitary = document.getElementById("advMilitary");
	advMilitary.innerHTML += '<a accesskey="c" title="Empire Board - army - overview [Alt+Shift+C]" href="#EmpireBoardArmy" class="EmpireBoardShortcut"></a>';
	
	var advResearch = document.getElementById("advResearch");
	advResearch.innerHTML += '<a accesskey="v" title="Empire Board - buildings - overview [Alt+Shift+V]" href="#EmpireBoardBuildings" class="EmpireBoardShortcut"></a>';
	
	// Add "BACK TO TOP"
	var Captions = this._Parent.ARexx.DOM_Get_Nodes('//div[@id="EmpireBoard"]/div[contains(@class, "Table")]/p[contains(@class, "Caption")]');
	if (Captions.snapshotLength > 0)
		{
		for (var i=0; i < Captions.snapshotLength; i++)
			{
			Captions.snapshotItem(i).innerHTML = '<a href="#GF_toolbar" style="display: block;float: right;">BACK TO TOP</a>'+Captions.snapshotItem(i).innerHTML;
			}
		}
	
	return true;
	};
	
EmpireBoard.ShortcutsAddon.Apply_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#advisors a.EmpireBoardShortcut {
		position: absolute;
		width: 20px;
		height: 20px;
		left: 0px;
		top: 80px;
		}
	
	#advisors a.EmpireBoardShortcut,
	#advisors a.EmpireBoardShortcut:hover {
		background-image: url(skin/layout/icon-world.gif);
		}
	
	]]></>.toXMLString();

	GM_addStyle(default_style);
	};
	
EmpireBoard.ARexx.RegisterAddOn(EmpireBoard.ShortcutsAddon);