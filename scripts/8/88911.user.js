// ==UserScript==
// @name           Ikariam War Manager
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/88911)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Manager to combine and consolidate properly formatted combat reports on the official forums.
// @include        http://board.*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js
// @version        0.02
//
// @history        0.01 Working Version
//
// ==/UserScript==

ScriptUpdater.check(88911, "0.02");

Config.prefix = document.domain;
Config.reloadOnSave = true;
Config.scriptName = "Ikariam War Manager";
Config.tabs = {
	"Settings":{
		html:'<p>Ikariam War Manager configuration settings.</p>',
		fields:{
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">' +
				Config.scriptName + ' v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>' +
				'<p>This script combines and consolidates properly formatted combat reports on the official forums.</p>',
	}
};

