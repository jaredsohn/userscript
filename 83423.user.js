// ==UserScript==
// @name           Gangwars Gebiete BullenRPC
// @namespace      http://www.gangwars.de
// @include        http://www.gangwars.de/gangwars/gebiete.php
// @include        http://www.gangwars.de/gangwars/gebiete.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         X.
// @version	       Version 1.1
// 
// Latest updates
// - Fix DomStorage (Firefox 3.5)
// ==/UserScript==

DataStorage = {
	hostname: 'de.gangwars.www',
	
	setHostname: function(hostname) {
		DataStorage.hostname = hostname;
	},
	
	getHostname: function() {
		return DataStorage.hostname;
	},
	
	init: function() {
		if (DataStorage.hasLocalSQLiteStorage()) {
			try {
				DataStorage.database = openDatabase("gangwars_storage_endless", "1.0", "Gangwars Endless Storages");
				if (!DataStorage.database) {
					alert("Failed to open the database on disk. This is probably because the version was bad or there is not enough space left in this domain's quota");
				} else {
					DataStorage.database.transaction(function(tx) {
						tx.executeSql("SELECT COUNT(*) FROM gangwars_storage_endless", [], function(result) {}, function(tx, error) {
							tx.executeSql("CREATE TABLE gangwars_storage_endless (id TEXT UNIQUE, value TEXT, unixtime REAL)", [], function(result) {});
						});
					});
				}
			} catch (err) {}
		}
	},

	hasLocalSQLiteStorage: function() {
		return unsafeWindow.openDatabase && typeof(unsafeWindow.openDatabase) == 'function';
	},

	set: function(key, value) {
		if (DataStorage.hasLocalSQLiteStorage()) {
			DataStorage.remove(key);
			DataStorage.database.transaction(function(tx){
				tx.executeSql('INSERT INTO gangwars_storage_endless (id, value, unixtime) VALUES (?, ?, ?)', [key, value.toSource(), 0]);
			});
		} else {
			unsafeWindow.sessionStorage.setItem(DataStorage.getHostname() + '::' + key, value.toSource());
		}
	},
	get: function(key) {
		if (DataStorage.hasLocalSQLiteStorage()) {
			var value = null;
			DataStorage.database.transaction(function(tx){
				tx.executeSql('SELECT * FROM gangwars_storage_endless WHERE id = ?', [key], function(result){
					if (result.rows.length == 1) {
						value = eval(result.rows.item(0).value);
					}
				}, function(tx, error) {
					alert("Failed to retrive data - " + error.message);
					return;
				});
			});
			return validKey;
		} else {
			return eval(unsafeWindow.sessionStorage.getItem(DataStorage.getHostname() + '::' + key));
		}
	},
	
	setCache: function(key, value, unixtime) {
		if (DataStorage.hasLocalSQLiteStorage()) {
			DataStorage.remove(key);
			DataStorage.database.transaction(function(tx){
				tx.executeSql('INSERT INTO gangwars_storage_endless (id, value, unixtime) VALUES (?, ?, ?)', [key, value.toSource(), parseInt(unixtime)]);
			});
		} else {
			unsafeWindow.sessionStorage.setItem(DataStorage.getHostname() + '::' + key, value.toSource());
			unsafeWindow.sessionStorage.setItem(DataStorage.getHostname() + '::' + key + '::unixtime', parseInt(unixtime));
		}
	},
	
	exist: function(key) {
		if (DataStorage.hasLocalSQLiteStorage()) {
			var validKey = false;
			DataStorage.database.transaction(function(tx){
				tx.executeSql('SELECT * FROM gangwars_storage_endless WHERE id = ?', [key], function(result){
					if (result.rows.length == 1) {
						validKey = true;
					}
				}, function(tx, error) {
					alert("Failed to retrive data - " + error.message);
					return;
				});
			});
			return validKey;
		} else {
			return (typeof(unsafeWindow.sessionStorage.getItem(DataStorage.getHostname() + '::' + key) != null));
		}
	},
	
	validCache: function(key) {
		var now = parseInt(new Date().getTime() / 1000);
		
		if (DataStorage.hasLocalSQLiteStorage()) {
			var validKey = false;
			DataStorage.database.transaction(function(tx){
				tx.executeSql('SELECT * FROM gangwars_storage_endless WHERE id = ?', [key], function(result){
					if (result.rows.length == 1) {
						if (parseInt(result.rows.item(0).unixtime) > now) {
							validKey = true;
						}
					}
				}, function(tx, error) {
					alert("Failed to retrive data - " + error.message);
					return;
				});
			});
			return validKey;
		} else {
			var result = (DataStorage.exist(key) && unsafeWindow.sessionStorage.getItem(DataStorage.getHostname() + '::' + key + '::unixtime') > now);
			return result;
		}
	},
	
	remove: function(key) {
		if (DataStorage.hasLocalSQLiteStorage()) {
			DataStorage.database.transaction(function(tx){
				tx.executeSql('DELETE FROM gangwars_storage_endless WHERE id = ?', [key]);
			});
		} else {
			unsafeWindow.sessionStorage.removeItem(DataStorage.getHostname() + '::' + key);
			unsafeWindow.sessionStorage.removeItem(DataStorage.getHostname() + '::' + key + '::unixtime');
		}
	}
};

var gw_urls = {
	police: 'http://www.gangwars.de/gangwars/police.php'
};

var cache = {
	police: {
		officers: {},
		updateInMinutes: 0,
		updateText: ''
	}
};

function log(message) {
	return;
	if (unsafeWindow.console) {
		unsafeWindow.console.info(message);
	} else {
		alert("Info: " + message);
	}
}
function error(message) {
	return;
	if (unsafeWindow.console) {
		unsafeWindow.console.error(message);
	} else {
		alert("Error: " + message);
	}
}
$(document).ready(function(){	
	DataStorage.init();
	
	jQuery("<div id='gwgmhint02'><strong>GW GM: </strong>Bullen eingef&uuml;gt!</div>")
		.css({padding: '10px', background: '#ffc', position: 'fixed',top: '0', left: '0', 'z-index': '66', width: '99%'})
		.appendTo('body')
		.fadeIn('fast')
		.animate({opacity: 1.0}, 1000)
		.fadeOut(1000, function(){jQuery('#gwgmhint02').remove();});

	function colorizeInitRow(jDomElem, color) {
		jDomElem.css({
			'color': color,
			'background-color': 'white',
			'font-weight': 'normal'
		});
	}

	function colorizeRow(jDomElem, color) {
		jDomElem.css({
			'color': color,
			'background-color': 'white',
			'font-weight': 'bold'
		});
	}
	
	function hasAPolicePatrol(street, address) {
		var result = false;
		//log('hasAPolicePatrol('+street+', '+address+')');
		if (cache.police.officers[street]) {
			$(cache.police.officers[street]).each(function(){
				if (this.start <= address && this.end >= address) {
					result = result || true;
				}
			});
		}
		return result;
	}
	
	function highlightBuildings() {
		var streetHasAtLeastOneOfficer = false;
		$('#divMainContainer .tableSubContainer tbody tr').each(function(){
			var jDomElem = $(this).find('td').eq(0);
			
			var entry = jDomElem.text().match(/(.*)\-Str\. ([\d]*)/);
			if (entry && entry.length == 3) {
				colorizeInitRow(jDomElem, 'black');
				var street = entry[1] + '-Str.';
				var address = parseInt(entry[2]);
			
				// check, if a police patrol is there
				if (hasAPolicePatrol(street, address)) {
					colorizeRow(jDomElem, 'red');
					streetHasAtLeastOneOfficer = true;
				}
			}
		});
		
		// Show summary of officers
		var deltaUpdate = parseInt((cache.police.nextUpdateAt - parseInt(new Date().getTime() / 1000)) / 60);
		var nextUpdateHour = parseInt(deltaUpdate / 60);
		var nextUpdateMinute = deltaUpdate % 60;
		var updateText = '';
		if (nextUpdateHour > 0) {
			updateText += nextUpdateHour + " Stunden ";
		}
		if (nextUpdateMinute > 0) {
			updateText += nextUpdateMinute + " Minuten";
		}
		$('#divMainContainer .tableSubContainer tbody').eq(0).prepend(
			$('<tr><th colspan="2" style="font-weight: bold;">N&auml;chster Schichtwechsel</th><td colspan="4" style="font-weight: bold;">'+updateText+'</td></tr>'+
			'<tr><th colspan="2"> </th><td colspan="4" style="background-color: white; color: ' + (streetHasAtLeastOneOfficer ? 'red' : 'green') + '">' + (streetHasAtLeastOneOfficer ? 'Bullen sind HIER!' : 'Alles sauber.') + '</td></tr>')
		);
		
		// Markup/Highlight the "Attacking" row, if the target in an area controlled by police
		$('#divMainContainer .tableSubContainer tbody tr th').each(function(){
			// Find the row..
			if ($(this).text() == 'Ziel:') {
				// Parse the next sibling (the address)
				var params = $(this).parent().find('td').text().replace(/^\s+/, '').match(/(.*)\-Str\. ([\d]*) \((.*)\)/);
				
				if (hasAPolicePatrol(params[1] + '-Str.', parseInt(params[2]))) {
					colorizeRow($(this).parent(), 'red');
					colorizeRow($(this), 'red');
					colorizeRow($(this).parent().find('td'), 'red');
					$(this).parent().find('td').text(
						$(this).parent().find('td').text() + ' -- Achtung, bestechen nicht vergessen!'
					);
				}
			}
		});
	}
	
	if (!DataStorage.validCache('policeofficers')) {
		DataStorage.remove('policeofficers');
		log('Reload data from "'+gw_urls.police+'"...');
		// Download the current "police"
		GM_xmlhttpRequest({
			method: "GET",
			url: gw_urls.police,
			onload: function(details) {
				var jXmlResult = $(details.responseText);
				jXmlResult.find('form .innertbl1 .innertbl2 tr').each(function(){
					var street = $(this).find('td').eq(2).text().replace(/^\s+/g, '').replace(/\s+$/g, '');
					if (street.search(/(.*)\-Str\.$/) >= 0) {
						var addresses = $(this).find('td').eq(3).text().match(/Nr\. (\d*) bis (\d*)/);
						var address1 = parseInt(addresses[1]);
						var address2 = parseInt(addresses[2]);
						if (typeof(cache.police.officers[street]) == 'undefined') {
							cache.police.officers[street] = [];
						}
						cache.police.officers[street].push({start: address1, end: address2});
					}
				});
			
				var nextUpdateInMinutes = 0;
				var nextUpdateHour = 0;
				var nextUpdateMinute = 0;
				var nextUpdate = jXmlResult.find('.outertbl').eq(0).find('.innertbl1').eq(0).find('.innertbl2').eq(0).find('td.cell').eq(0).text().replace(/^\s+/, '');
				// 2 Stunde[n] 35 Minute[n]
				if (nextUpdate.search(/(\d)[ ]*Stunde[n]?[ ]*([\d]*)[ ]*Minute[n]?/) == 0) {
					var nextUpdateArgs = nextUpdate.match(/(\d)[ ]*Stunde[n]?[ ]*([\d]*)[ ]*Minute[n]?/);
					nextUpdateHour = parseInt(nextUpdateArgs[1]);
					nextUpdateMinute = parseInt(nextUpdateArgs[2]);
					nextUpdateInMinutes += (60 * nextUpdateHour);
					nextUpdateInMinutes += nextUpdateMinute;
				} else if (nextUpdate.search(/(\d)[ ]*Stunde[n]?/) == 0) {
					var nextUpdateArgs = nextUpdate.match(/(\d)[ ]*Stunde[n]?/);
					nextUpdateHour = parseInt(nextUpdateArgs[1]);
					nextUpdateInMinutes += (60 * nextUpdateHour);
				} else if (nextUpdate.search(/([\d]*)[ ]*Minute[n]?/) == 0) {
					var nextUpdateArgs = nextUpdate.match(/([\d]*)[ ]*Minute[n]?/);
					nextUpdateMinute = parseInt(nextUpdateArgs[1]);
					nextUpdateInMinutes += nextUpdateMinute;
				}
				// generic
				//cache.police.updateInMinutes = nextUpdateInMinutes;
				//cache.police.updateText = nextUpdateHour + " Stunden " + nextUpdateMinute + " Minuten";
				cache.police.nextUpdateAt = parseInt(new Date().getTime() / 1000) + (60 * nextUpdateInMinutes);
				
				highlightBuildings();
				
				// save this to internal firefox storage
				if (nextUpdateInMinutes > 0) {
					DataStorage.setCache('policeofficers', cache.police, parseInt(new Date().getTime() / 1000) + (60 * nextUpdateInMinutes));
				} else {
					error('Could not save cached version.');
				}
			} // onload
		}); // GM_xmlhttpRequest
	} else {
		cache.police = DataStorage.get('policeofficers');
		highlightBuildings();
	}
});

