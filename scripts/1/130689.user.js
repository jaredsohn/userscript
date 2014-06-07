// ==UserScript==
// @name           TabIconChanger
// @namespace      http://nhnb.de/greasemonkey/
// @description    Displays a user specified text in a tab icon (useful to distingish multiple app tabs). To define a text, use the user script menu on the Greasemonkey toolbar icon.
// @version        1.0
// @include        *
// @copyright      Hendrik Brummermann
// @license        GPL 2.0 or later at your choice
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @uso:script     130689
// @updateURL      https://userscripts.org/scripts/source/130689.meta.js
// ==/UserScript==


"use strict";
(function() {

	/**
	 * checks whether the provided text has a character that goes below the baseline
	 */
	function hasCharacterWhichGoBelowBaseline(text) {
		var chars = ["g", "j", "p", "q"];
		for (i in chars) {
			if (text.indexOf(chars[i]) > -1) {
				return true;
			}
		}
		return false;
	}

	/**
	 * creates an icon based on the configured text and color
	 */
	function createIcon(text, font, color) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");  
		canvas.width = 32;
		canvas.height = 32;

		// find optimal font size (with a minimum)
		var i;
		for (i = 20; i < 32; i++) {
			ctx.font = i + "px " + font;
			if (ctx.measureText(text).width >= 32) {
				break;
			}
		}
		ctx.font = (i-1) + "px " + font;

		// vertically center short texts, but ensure that the beginning is visible on long text
		var x = (canvas.width - ctx.measureText(text).width) / 2;
		if (x < 0) {
			x = 0;
		}

		// horizontal allignment
		var y = 29;
		if (hasCharacterWhichGoBelowBaseline(text)) {
			console.log("X");
			y = 25;
		}

		// draw text and create image data
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
		return canvas.toDataURL("image/png");
	}

	/**
	 * replaces the fav icon in the html code
	 */
	function adjustHtmlCodeToReplaceIcon(iconData) {
		var x = document.head.getElementsByTagName('link');
		for (var i = 0; i < x.length; i++) {
			if (x[i].rel == 'shortcut icon' || x[i].rel == 'icon') {
				document.head.removeChild(x[i]);
			}
		}
		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = iconData;
		document.head.appendChild(newIcon);
	}

	/**
	 * changes the icons if a special one is defined for this page
	 */
	function init() {
		var prefix = window.location.href;
		var text = GM_getValue(prefix + ' Text');
		if ((typeof(text) != "undefined") && (text != "")) {
			var color = GM_getValue(prefix + ' Color');
			adjustHtmlCodeToReplaceIcon(createIcon(text, "Helvetica", color));
		}
	}

	/**
	 * opens the configuration dialog
	 */
	function config() {
		var prefix = window.location.href;
		GM_config.init('Icon Changer',
		{
			'Text': {'label': 'Text', 'type': 'text', 'default': GM_getValue(prefix + ' Text') },
			'Color': { 
				'label': 'Color', 'type': 'select',
				'options': {'Black': 'Black', 'Blue': 'Blue', 'Cyan': 'Cyan', 'DarkBlue': 'DarkBlue', 'DarkGreen': 'DarkGreen', 'DarkRed':'DarkRed',
					'Fuchsia': 'Fuchsia', 'Gold': 'Gold', 'Grey': 'Grey', 'Green': 'Green', 'Magenta': 'Magenta', 'Navy': 'Navy', 'Orange': 'Orange', 
					'Purple': 'Purple', 'Red': 'Red', 'White': 'White', 'Yellow': 'Yellow'},
				'default': GM_getValue(prefix + ' Color')
			}
		},
		GM_config.eCSS
		+ " #GM_config_field_Color option[value='Black'] { color: Black}"
		+ " #GM_config_field_Color option[value='Blue'] { color: Blue}"
		+ " #GM_config_field_Color option[value='Cyan'] { color: Cyan}"
		+ " #GM_config_field_Color option[value='DarkBlue'] { color: DarkBlue}"
		+ " #GM_config_field_Color option[value='DarkGreen'] { color: DarkGreen}"
		+ " #GM_config_field_Color option[value='DarkRed'] { color: DarkRed}"
		+ " #GM_config_field_Color option[value='Fuchsia'] { color: Fuchsia}"
		+ " #GM_config_field_Color option[value='Gold'] { color: Gold}"
		+ " #GM_config_field_Color option[value='Grey'] { color: Grey}"
		+ " #GM_config_field_Color option[value='Green'] { color: Green}"
		+ " #GM_config_field_Color option[value='Magenta'] { color: Magenta}"
		+ " #GM_config_field_Color option[value='Navy'] { color: Navy}"
		+ " #GM_config_field_Color option[value='Orange'] { color: Orange}"
		+ " #GM_config_field_Color option[value='Purple'] { color: Purple}"
		+ " #GM_config_field_Color option[value='Red'] { color: Red}"
		+ " #GM_config_field_Color option[value='White'] { color: White}"
		+ " #GM_config_field_Color option[value='Yellow'] { color: Yellow}",
		{
			open: function() {
				GM_config.addBorder(); // add a fancy border
				GM_config.resizeFrame('250px','150px'); // resize the config window
			}
		});
		GM_config.onSave = function() {
			if (GM_config.get("Text") != "") {
				var prefix = window.location.href;
				GM_setValue(prefix + ' Text', GM_config.get("Text"));
				GM_setValue(prefix + ' Color', GM_config.get("Color"));
				init();
			} else {
				deleteConfig();
			}
			GM_config.close();
		}
		GM_config.open();
	}

	/**
	 * delete the configuration for the current page
	 */
	function deleteConfig() {
		var prefix = window.location.href;
		GM_deleteValue(prefix + ' Text');
		GM_deleteValue(prefix + ' Color');
		window.location.reload();
	}

	// Register menu commands
	GM_registerMenuCommand("Set Icon", function() {config()}, "");
	GM_registerMenuCommand("Forget Icon", function() {deleteConfig()}, "");

	init(); 
}());
