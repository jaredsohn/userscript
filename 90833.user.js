// ==UserScript==
// @name         ESEA.net RV1a-firefox1
// @namespace    http://esea.hlve.me
// @description  ESEA.net Site Mods including new sidebar, and lightbox features.
// @include      http://*esea.net/*
// @include      http://*.esea.net/*
// @include      http://*esportsea.com/*
// @include      http://*.esportsea.com/*
// @exclude      http://*staff.esea.net/
// @exclude      http://*esea.net/welcome.php*
// @exclude      http://*esportsea.com/welcome.php*
// @require		 http://www.rockdown.net/ESEAMonkey/ESEA-jquery.js
// @require      http://www.rockdown.net/ESEAMonkey/ESEA-func.js
// @require      http://www.rockdown.net/ESEAMonkey/ESEA-useroptions.js
// @require      http://www.rockdown.net/ESEAMonkey/Updater.php?id=90833
// ==/UserScript==

modwhosplaying.parentNode.insertBefore(customsrch, modwhosplaying);
document.getElementById('myOptionsButton').addEventListener('click', Config.show, false);

Config.settings = {
	"General":{
		html:'<p>We want your ESEA page to be setup exactly the way you want it, so we have added this neat tool to allow you to customize a good portion of it</p><br /><br />this is coming soon',
		fields:{

		},
	},
	"About":{
		html:'<p>ESEA.net Site Mods including new sidebar, jQuery Fixes, Lightbox features, and more!<br /><br />http://userscripts.org/scripts/show/89177</p>',
	}
};


