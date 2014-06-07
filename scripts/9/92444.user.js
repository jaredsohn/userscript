// ==UserScript==
// @name		Grepolis Big Map
// @namespace	bigmap.grepolis
// @description	Use the whole browser canvas to display a bigger sea map.
// @author		Peter Mauritius
// @include     http://*.grepolis.com/game/map?*
//
// @require 	http://userscripts.org/scripts/source/57756.user.js
//
// @version		0.0.6
//
// @history		0.0.6 Code volume reduced. Options removed.
// @history		0.0.5 Moved map info to its old position.
// @history		0.0.4 Reenabled map info, added config options dialog.
// @history		0.0.3 Added automatic updates.
// @history		0.0.2 Map size now depends on window size.
// @history		0.0.1 Initial version.
// ==/UserScript==
//

var uW;
if (typeof unsafeWindow==='object')
  {uW=unsafeWindow;}
else
  {uW=window;}

  var $=uW.jQuery;

ScriptUpdater.check(92444, "0.0.6");

$(window).resize(function() {
		AdjustSeaMap();
});
AdjustSeaMap();

function AdjustSeaMap()
{
	var width=$(window).width() - $("#menu").width() - 18	;
	var height=$(window).height() - 20;
	$(document.body).css("background-image", "none");
	
	var box = $("#box");
	box.width('100%');
	box.height('100%'); 
	
	var main_area = $("#main_area");
	main_area.width(width);
	main_area.height(height);
	
	var content_box = $("#content_box");
	content_box.width(width);
	content_box.height(height);
	
	var content = $("#content");
	content.width(width);
	content.height(height);
	
	var map_info_left = $("#map_info_left");
	map_info_left.css("left", "2px");
	map_info_left.css("bottom", "110px");
};
