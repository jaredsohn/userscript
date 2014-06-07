// ==UserScript==
// @name                WME Aerial Shifter (WAS)
// @version             1.4.5
// @description         This script helps you adjust the position and opacity of underlying satellite imagery
// @match               https://editor-beta.waze.com/editor/*
// @match               https://editor-beta.waze.com/*/editor/*
// @match               https://www.waze.com/editor/*
// @match               https://www.waze.com/*/editor/*
// @grant               none
// @updateURL           https://userscripts.org/scripts/source/176646.meta.js
// @downloadURL         https://userscripts.org/scripts/source/176646.user.js
// @icon                http://s3.amazonaws.com/uso_ss/icon/176646/large.png?1391605696
// @namespace           a
// ==/UserScript==
//
// Author: byo
// License: GPLv3+
//
// Patches by berestovskyy and iainhouse
//
(function()
{
	var WM;

	var prefix = 'WAS_';
	var settings = prefix + 'settings';

	var sx, sy, so;

	function init()
	{
		// init shortcuts
		if(!(WM = window.wazeMap || window.Waze.map))
		{
			setTimeout(init, 500);
			return;
		}

		var suffix = ' of satellite imagery';
		var psx = prefix + 'sx', psy = prefix + 'sy', pso = prefix + 'so',
			psr = prefix + 'reset';

		var nav = $('<div style="direction:ltr;text-align:right;width:420px;line-height:20px;position:absolute;right:10px;top:52px">'
			+ '<label  title="Horizontal shift' + suffix + ' (meters)" style="font-weight:normal" for="' + psx + '"><i class="icon-resize-horizontal"></i>'
				+ ' <input type="number" max="100" min="-100" step="10" style="text-align:right;width:60px;height:25px;padding:0 5px" id="' + psx + '" value="0"/> m</label>'
			+ ' &nbsp; <label  title="Vertical shift' + suffix + ' (meters)" style="font-weight:normal" for="' + psy + '"><i class="icon-resize-vertical"></i>'
				+ ' <input type="number" max="100" min="-100" step="10" style="text-align:right;width:60px;height:25px;padding:0 5px" id="' + psy + '" value="0"/> m</label>'
			+ ' &nbsp; <label  title="Opacity' + suffix + ' (pecent)" style="font-weight:normal" for="' + pso + '"><i class="icon-adjust"></i>'
				+ ' <input type="number" max="100" min="0" step="25" style="text-align:right;width:55px;height:25px;padding:0 5px" id="' + pso + '" value="100"/> %</label>'
			+ ' | <a id="' + psr + '" style="color:white;text-decoration:none" href="#"'
				+ ' title="Reset defaults"><i class="icon-undo"></i></a>'
			+ ' <a target="_blank" style="color:white;text-decoration:none" href="https://www.waze.com/forum/viewtopic.php?t=53022"'
				+ ' title="WME Aerial Shifter (WAS) v1.4.5"><i class="icon-question-sign"></i></a>'
			+ '</div>'
			);
		sx = nav.find('#' + psx);
		sy = nav.find('#' + psy);
		so = nav.find('#' + pso);
		$('#header-actions').append(nav);

		loadFromStorage();
		update();

		WM.events.on({
			zoomend : update,
			moveend : update
		});
		WM.baseLayer.events.on({
			loadend : update,
		});
		sx.change(update);
		sy.change(update);
		so.change(update);
		nav.find('#' + psr).click(resetDefaults);
	}

	function resetDefaults()
	{
		sx.val(0);
		sy.val(0);
		so.val(100);

		update();
	}

	function loadFromStorage()
	{
		var obj = Waze.Util.localStorage.get(settings);
		if(obj)
		{
			sx.val(obj.sx);
			sy.val(obj.sy);
			so.val(obj.so);
		}
	}

	function saveToStorage()
	{
		Waze.Util.localStorage.set(settings, {
			sx: sx.val(),
			sy: sy.val(),
			so: so.val(),
		});
	}

	function update()
	{
		// calculate meters per pixel factor of current map
		var ipu = OpenLayers.INCHES_PER_UNIT;
		var metersPerPixel = WM.getResolution() * ipu['m']
			/ ipu[WM.getUnits()];
		var shiftX = parseInt(sx.val(), 10);
		var shiftY = parseInt(sy.val(), 10);
		var opacity = parseInt(so.val(), 10);

		// Apply the shift and opacity
		WM.baseLayer.div.style.left =
			Math.round(shiftX / metersPerPixel) + 'px';
		WM.baseLayer.div.style.top =
			Math.round(shiftY / metersPerPixel) + 'px';
		WM.baseLayer.div.style.opacity = opacity/100;

		saveToStorage();
	}

	init();
})();
