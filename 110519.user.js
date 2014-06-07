// ==UserScript==
// @name           ViewState Size
// @namespace      http://www.aaubry.net/
// @description    Displays a bar that visually indicates the size of the ASP.NET ViewState
// @include        *
// ==/UserScript==

var viewState = document.getElementById("__VIEWSTATE");
if(viewState != null) {
	var viewStateSize = viewState.value.length;

	var pageLength = document.documentElement.innerHTML.length;
	var viewStatePercentage = Math.round(viewStateSize / pageLength * 100);

	var barLength = Math.round(10 * Math.log(viewStateSize) / Math.LN10);

	var units = ["B", "KB", "MB"];

	var displaySize = viewStateSize;
	var displayUnit;
	for (var i = 0; i < units.length; ++i) {
		displayUnit = units[i];
		if (displaySize >= 1024) {
			displaySize /= 1024;
		} else {
			break;
		}
	}

	// http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	var hslToRgb = function(h, s, l) {
		var r, g, b;

		if (s == 0) {
			r = g = b = l; // achromatic
		} else {
			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		return [r * 255, g * 255, b * 255];
	}

	var hex = function(value) {
		var res = Math.round(value).toString(16);
		return res.length == 2 ? res : "0" + res;
	}

	// 0 = red
	// 120 = green
	var hue = Math.max(0, Math.min(120, -2.4 * barLength + 120));
	var color = hslToRgb(hue / 360, 0.7, 0.5);
	var rgb = hex(color[0]) + hex(color[1]) + hex(color[2]);

	var viewStateBarContainer = document.createElement("div");
	viewStateBarContainer.innerHTML =
		"<div style='position: fixed; bottom: 5px; right: 10px' title='ViewState size = " + viewStateSize + " bytes (" + viewStatePercentage + " % of page)'>" +
		"  <div style='font-size: 10px; color: black; display: inline-block; position: relative; top: -3px'>" +
		"    " + Math.round(displaySize) + " " + displayUnit +
		"  </div>" +
		"  <div style='border: solid black 1px; padding: 1px; background-color: white; display: inline-block'>" +
		"    <div style='background-color: #" + rgb + "; width: " + barLength + "px; height: 10px'></div>" +
		"  </div>" +
		"</div>";

	document.body.appendChild(viewStateBarContainer.firstChild);
}