// ==UserScript==
// @name           AEG AutoUpdater
// @namespace      http://armeagle.nl
// @describe       Automatic userscript update checker.
// @version        1.1
// ==/UserScript==

/*
 * To use AEG AutoUpdater for your script all you need to do is setting the following lines in the ==UserScript== parameters:
 *
 * // @require        http://userscripts.org/scripts/source/75442.user.js
 * // @resource  meta http://userscripts.org/scripts/source/YOUR_SCRIPT_ID.meta.js
 *
 *   The first to include this updater script, and
 *   the second to link to the meta file of your own userscript, used to grab the automatic version number userscript.org creates for every update.
 *
 * Several settings can be added to the @resource meta  URL ( http://userscripts.org/scripts/source/YOUR_SCRIPT_ID.meta.js?interval=1&show ):
 *  - interval (integer, default: 5, minimum: 1) : Change the interval (days) how often will be checked for a new version.
 *  - show (no parameter) :                        By default the script will just give an installation popup. Add this parameter
 *                                                  to link to the script page instead.
 *
 * With every update of your own script the latest version of this updater script will be downloaded again.
 *
 * Adds an entry to the GreaseMonkey tray icon that resets the update check timestamps.
 *
 * Released according to Creative Commons Attribution-Noncommercial-Share Alike : http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
var AEG_Updater = {
	currentMeta: {},
	checkInterval: 2, /* check every X (integer, minimum 1) days */
	directInstall: true, /* default to directly installing/updating the script. Option to just open the script page itself */
	
	check: function() {
		// main function
		this.getCurrentMeta();
		this.addUpdateCheckReset();
		if ( this.checkUpdateNeeded() ) {
			var that = this;
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://userscripts.org/scripts/source/'+ that.currentMeta['uso:script'] +'.meta.js',
				onload: function(response) {
					var newVersion = that.parseMeta(response.responseText)['uso:version'];
					if ( newVersion !== undefined &&
						 that.currentMeta !== undefined &&
						 that.currentMeta['uso:version'] !== undefined &&
						 Number(newVersion) > Number(that.currentMeta['uso:version']) ) {
						that.doUpdate();
					}
				}
			});
		}
	},
	checkUpdateNeeded: function() {
		// returns whether enough time has passed since the last update check
		var now = Math.round(new Date().getTime()/1000); // was milliseconds
		var lastCheck = GM_getValue('lastCheck', 0);
		GM_setValue('lastCheck', now); // update
		this.checkInterval = Math.max(1,Math.round(this.checkInterval));		
		return now > lastCheck + this.checkInterval*86400;
	},
	doUpdate: function() {
	
		// execute the actual update, opening the userscript source or the script page
		if ( this.directInstall ) {
			if ( confirm("Your version of '"+ this.currentMeta['name'] +"' is outdated, do you want to update the script?") ) {
				window.open('http://userscripts.org/scripts/source/'+ this.currentMeta['uso:script'] +'.user.js');
			}
		} else {
			if ( confirm("Your version of '"+ this.currentMeta['name'] +"' is outdated, do you want to visit the script page?") ) {
				window.open('http://userscripts.org/scripts/show/'+ this.currentMeta['uso:script']);
			}
		}
	},
	getCurrentMeta: function() {
		// get userscript parameters, including uso:script and uso:version from the @resource-d meta data
		this.currentMeta = this.parseMeta(GM_getResourceText('meta'), true);
	},
	parseMeta: function(raw_metadata, extended) {
		// Parse the metadata of the local or remote copy of the main script
		var lines = raw_metadata.split('\n');
		var metadata = {};
		var that = this;
		for ( lineNr = 0; lineNr < lines.length; lineNr++ ) {
			lines[lineNr].replace(/\s*\/\/\s*@([^ ]+)\s+(.+)/, function(all, key, value) {
				metadata[key] = value;
				if ( extended !== undefined && extended == true ) {
					if ( key == 'resource' && value.substr(0, 4) == 'meta' ) {
						// allow for settings to be set in the script meta link
						var settings = value.split('?')[1];
						if ( settings !== undefined ) {
							settings = settings.split('&');
							for ( ind = 0; ind < settings.length; ind++ ) {
								var keyval = settings[ind].split('=');
								switch( keyval[0] ) {
									case 'interval':
										that.checkInterval = Number(keyval[1]);
										break;
									case 'show':
										that.directInstall = false;
										break;
								}
							}
						}
					}
				}
			});
		}
		return metadata;
	},
	addUpdateCheckReset: function() {
		// add a menu command to GreaseMonkey to clear the lastCheck timestamp
		GM_registerMenuCommand("Reset update check timestamp for '"+ this.currentMeta['name'] +"'", function() {				
			GM_setValue('lastCheck', 0); GM_deleteValue('lastCheck');
		});
	}
}
AEG_Updater.check();