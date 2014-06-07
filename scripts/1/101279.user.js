// ==UserScript==
// @name           Anon's Deadfrontier
// @namespace      hmage.deadfrontier
// @description    Tools for Deadfrontier
// @include        http://fairview.deadfrontier.com/onlinezombiemmo/*
// @version        0.0.1
// @author         Anon (dcalebel@hotmail.com)
// @source         http://userscripts.org/scripts/admin/101279
// ==/UserScript==
(function() {	// Beginning of script

// Dead Frontier namespace
var DF = new function DF() {
	this.version = "0.0.1";
	
	// Construct
	this.page =
		/page=35/.test(location.href) ? "marketplace" :	// Marketplace
		/page=21/.test(location.href) ? "innerCity" :	// Inner city or arena
		/action=forum/.test(location.href) ? "forum" :	// Forum
		/DF3D_InventoryPage.php/.test(location.href) ? "innerInventory" :	// Inner city inventory
		"";	// Default = Outpost or unknown
		
	this.cookieExpire = new Date();
	this.cookieExpire.setDate(this.cookieExpire.getDate() + 8);
};

// Utilities
DF.Util = new function Util() {
	this.getAbsoluteOffset = function getAbsoluteOffset(element) {
		var offset = {
			"left": 0,
			"top": 0
		};
		
		for (var e = element; e.offsetParent; e = e.parentNode) {
			if (e.tagName == "TR") continue;	// Ignore <tr>
		
			offset.left += e.offsetLeft;
			offset.top += e.offsetTop;
		}
		return offset;
	};
	
	this.setStyle = function setStyle(element, name, value) {
		if (value === undefined) {	// Set to default
			element.style.removeProperty(name);
		} else {
			element.style.setProperty(name, value, "");
		}
	};

	this.getCookie = function getCookie(name) {
		var cookies = document.cookie.split(";");
		for (c in cookies) {
			var cookie = cookies[c].replace(/^\s/, "").split("=");
			if (unescape(cookie[0]) == name) return unescape(cookie[1]);
		}
	};

	this.setCookie = function setCookie(name, value, expires) {
		var cookie = escape(name) + "=" + escape(value);
		if (expires) {
			cookie += "; expires=" + expires.toGMTString();
		}
		document.cookie = cookie;
	};

	this.indicatorColor = function indicatorColor(value, colors, comparer) {
		colors = (colors ? colors : [	// Default = HP colors
			[0, "#800000"],
			[0.25, "#C00000"],
			[0.5, "#C06000"],
			[0.75, "#C0C000"],
			[1, "#00C000"]
		]);
		
		comparer = (comparer ? comparer : function(left, right) {
			return left <= right;
		});
		
		for (var c = 0; c < colors.length; c++) {
			var color = colors[c];
			if (comparer(value, color[0])) {
				return color[1];
			}
		}
		return colors[0][1];
	};

	this.addSeparator = function addSeparator(number, separator) {
		separator = (separator ? separator : ",");	// Default = ","
		
		var n = (number + '').split('.');
		var i = n[0];
		var d = n.length > 1 ? '.' + n[1] : '';
		var regExp = /(\d+)(\d{3})/
		while (regExp.test(i)) {
			i = i.replace(regExp, "$1" + separator + "$2");	// $1 = (\d+), $2 = (\d{3})
		}
		return i + d;
	};

	this.splitItemType = function extractItemType(itemType) {
		var item = {};
		
		var properties = itemType.split("_");
		item.type = properties[0];
		for (var p = 1; p < properties.length; p++) {
			var property = properties[p];
			
			var name = /^[a-z]*/.exec(property)[0];
			var value = property.substring(name.length);
			item[name] = value;
		}
		
		// Master Craft Stats
		if (item.stats) {
			var stats = item.stats;
			item.stats = {}
			if (stats.length == 4) {	// Armours: Agility / Endurance
				item.stats.agility = parseInt(stats.substring(0, 2), 10);
				item.stats.endurance = parseInt(stats.substring(2), 10);
			} else if (stats.length == 3) {	// Weapons: Accuracy / Reloading / Critical Hit
				item.stats.accuracy = parseInt(stats[0], 10);
				item.stats.reloading = parseInt(stats[1], 10);
				item.stats.criticalHit = parseInt(stats[2], 10);
			}
		}
		
		// Cooked
		if (item.cooked !== undefined) {
			item.cooked = true;
		}
		
		return item;
	};
	
	this.splitFlashVars = function extractFlashVars(flashVarsString) {
		var flashVars = {};
		
		var flashVarsSplit = flashVarsString.split("&");
		for (var v = 0; v < flashVarsSplit.length; v++) {
			var flashVar = flashVarsSplit[v].split("=");
			
			flashVars[flashVar[0]] = flashVar[1];
		}
		
		return flashVars;
	};
};

// Tool bar
DF.ToolBar = new function ToolBar() {
	this.createTab = function createTab(title) {
		var innerHTML =
			'<li style="display: inline;"><button style="' + buttonStyle + '">' + title + '</button></li>' +
			'<div style="display: none;"></div>';
		var outerHTML = document.createElement("div");
		outerHTML.innerHTML = innerHTML;
		
		var tab = outerHTML.childNodes[0];
		var body = outerHTML.childNodes[1];
		tabs.appendChild(tab);
		bodies.appendChild(body);
		
		// Change tab
		tab.childNodes[0].addEventListener("click", function() {
			changeTab(body);
		}, false);
		
		// Show default tab
		if (bodies.childNodes.length == 1) {
			DF.Util.setStyle(toolBar, "display");
			changeTab(body);
		}
		
		return body;
	};
	
	function changeTab(body) {
		// Hide all tabs
		var bodyNodes = bodies.childNodes;
		for (var b = 0; b < bodyNodes.length; b++) {
			DF.Util.setStyle(bodyNodes[b], "display", "none");
		}
		
		DF.Util.setStyle(body, "display");	// Show selected tab
	};

	// Construct
	var row3Stlye = "border: 1px solid; border-color: #3E3E3E #000000 #000000 #3E3E3E; padding: 0px; background-color: #171717;";
	var row1Style = row3Stlye + " background-image: url(\'/onlinezombiemmo/Themes/deadfrontier/images/HD/row111.gif\'); " +
		"background-repeat: repeat-x;";
	var buttonStyle = "border: 1px solid; border-color: #232323 #898989 #898989 #232323; " +
		"background: url('/onlinezombiemmo/Themes/deadfrontier/images/HD/input.gif'); font-size: 11px; color: #AF9B6D;";
	var creditAStyle = "text-decoration: none; color: #981313;";
	var innerHTML =
		'<fieldset class="windowbg2" style="' + row1Style + ' position: fixed; right: 0px; top: 0px; padding: 0px; display: none; ' +
				'font-size: 12px; font-family: \'Arial\', sans-serif; color: #FFFFFF;">' +
			'<button style="' + buttonStyle + '">Admin</button>' +	// Show button
			'<div style="display: none;">' +
				'<ul style="display: inline; margin: 0px; padding: 0px; list-style: none;"></ul>' +	// Tabs
				'<button style="' + buttonStyle + ' float: right;">&uarr;</button>' +	// Hide button
				'<fieldset class="windowbg2" style="' + row3Stlye + ' clear: both; padding: 0.5em;"></fieldset>' +	// Bodies
				// Credit
				'<address style="padding: 0.5em; text-align: right; ' +
						'font-size: 10px; font-family: \'Lucida Sans Unicode\', sans-serif; font-style: normal; color: #876745;">' +
					'<a style="' + creditAStyle + '" href="http://userscripts.org/scripts/show/101279" target="_blank" title="Get the latest version">' +
						'Custom Deadfrontier</a> ' +
					'by <a style="' + creditAStyle + '" href="mailto:dcalebel@hotmail.com" target="_blank">Anon</a> 2011' +
				'</address>' +
			'</div>' +
		'</fieldset>';
	var outerHTML = document.createElement("div");
	outerHTML.innerHTML = innerHTML;
	var toolBar = this.toolBar = outerHTML.childNodes[0];
	document.body.appendChild(toolBar);
	var toolBarHide = toolBar.childNodes[1];
	var showButton = toolBar.childNodes[0];
	var hideButton = toolBarHide.childNodes[1];
	var tabs = toolBarHide.childNodes[0];
	var bodies = toolBarHide.childNodes[2];
	
	// Toggle show
	showButton.addEventListener("click", function () {
		DF.Util.setStyle(toolBarHide, "display");	// Show tool bar
		DF.Util.setStyle(this, "display", "none");	// Hide showing button
	}, false);
	
	// Toggle hide
	hideButton.addEventListener("click", function () {
		DF.Util.setStyle(toolBarHide, "display", "none");	// Hide tool bar
		DF.Util.setStyle(showButton, "display");	// Show showing button
	}, false);
};

// Stats detail
DF.Stats = new function Stats() {
	if (DF.page == "innerCity") return;
	
	// Get DOM
	var embed = document.getElementsByTagName("embed")[0];
	// Get FlashVars
	var flashVars = DF.Util.splitFlashVars(embed.getAttribute("FlashVars"));
	
	// Calculate
	var exp = parseInt(flashVars.DFSTATS_df_exp, 10);
	var level = parseInt(flashVars.DFSTATS_df_level, 10);
	var expLevel = parseInt(DF.page == "innerInventory" ? DF.Util.getCookie("EXPTABLE_exp_lvl") : flashVars["EXPTABLE_exp_lvl" + (level + 1)], 10);
	var expPercent = Math.round(exp / expLevel * 100);
	if (expPercent == 100 && exp < expLevel) expPercent = 99; // Do not round up to 100%
	if (expPercent == 0 && exp > 0) expPercent = 1; // Do not round down to 0%
	DF.Util.setCookie("EXPTABLE_exp_lvl", expLevel, DF.cookieExpire);
	
	var cash = parseInt(flashVars.DFSTATS_df_cash, 10);
	var bankCash = parseInt(flashVars.DFSTATS_df_bankcash, 10);
	var cashTotal = cash + bankCash;
	var credits = parseInt(flashVars.DFSTATS_df_credits, 10);
	
	var hpCurrent = parseInt(flashVars.DFSTATS_df_hpcurrent, 10);	// Exclude armor endurance
	var hpMax = parseInt(flashVars.DFSTATS_df_hpmax, 10);	// Exclude armor endurance
	var armourType = DF.Util.splitItemType(flashVars.DFSTATS_df_armourtype);
	var hpPercent = Math.round(hpCurrent / hpMax * 100);
	if (hpPercent == 100 && hpCurrent < hpMax) hpPercent = 99; // Do not round up to 100%
	if (hpPercent == 0 && hpCurrent > 0) hpPercent = 1; // Do not round down to 0%
	var armourEndurance = (armourType.stats && armourType.stats.endurance ? armourType.stats.endurance : 0);
	hpCurrent = Math.ceil(hpCurrent / hpMax * (hpMax + armourEndurance * 2));
	hpMax += armourEndurance * 2;
	if (hpCurrent == hpMax && hpPercent < 100) hpCurrent = hpMax - 1; // Do not round up to max
	if (hpCurrent == 0 && hpPercent > 0) hpCurrent = 1; // Do not round down to 0
	
	var hungerHp = parseInt(flashVars.DFSTATS_df_hungerhp, 10);
	//var hungerTime = parseInt(flashVars.DFSTATS_df_hungertime, 10);
	
	var armourHp = parseInt(flashVars.DFSTATS_df_armourhp, 10);
	var armourHpMax = parseInt(flashVars.DFSTATS_df_armourhpmax, 10);
	var armourPercent = 0;
	if (armourHpMax > 0) {	// Equiped
		armourPercent= Math.round(armourHp / armourHpMax * 100);
		if (armourPercent == 100 && armourHp < armourHpMax) armourPercent = 99; // Do not round up to 100%
		if (armourPercent == 0 && armourHp > 0) armourPercent = 1; // Do not round down to 0%
	}
	
	// Display
	var innerHTML =
		'<table style="border-collapse: collapse; font-size: 1em; font-family: inherit; color: inherit;">' +
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">Exp:</th>' +
				'<td>' + DF.Util.addSeparator(exp) + ' (' + expPercent + '%)</td>' +
			'</tr>' +
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">Cash / Total:</th>' +
				'<td>$ ' + DF.Util.addSeparator(cash) + ' / ' + DF.Util.addSeparator(cashTotal) + '</td>' +
			'</tr>' +
	''; if (credits > 0) { innerHTML +=
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">Credits:</th>' +
				'<td>' + DF.Util.addSeparator(credits) + '</td>' +
			'</tr>' +
	''; } innerHTML +=
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">Hunger:</th>' +
				'<td style="color: ' + DF.Util.indicatorColor(hungerHp / 100) + ';">' + hungerHp + '%</td>' +
			'</tr>' +
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">HP:</th>' +
				'<td style="color: ' + DF.Util.indicatorColor(hpPercent / 100) + ';">' + hpPercent + '% (' + hpCurrent + ' / ' + hpMax + ')</td>' +
			'</tr>' +
	''; if (armourHpMax > 0) { innerHTML +=
			'<tr>' +
				'<th style="height: auto; border: 0px; padding: 0px 0.5em 0px 0px; background: transparent; text-align: left;">Armour:</th>' +
				'<td style="color: ' + DF.Util.indicatorColor(armourPercent / 100) + ';">' + armourPercent + '% (' + armourHp + ' / ' + armourHpMax + ')</td>' +
			'</tr>' +
	''; } innerHTML +=
		'</table>';
	var toolBar = DF.ToolBar.createTab("Stats");
	toolBar.innerHTML = innerHTML;
	
	// Inventory window
	if (DF.page == "innerInventory") {
		DF.Util.setStyle(document.getElementsByTagName("div")[0], "text-align", "left");
		DF.Util.setStyle(DF.ToolBar.toolBar, "z-index", "3");
	}
};

})() // End of script