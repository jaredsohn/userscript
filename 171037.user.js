// ==UserScript==
// @id						qlping@name.space
// @name					QLPing
// @version				1.11
// @description		Shows ping of servers on www.quakelive.com website
// @namespace			name.space
// @homepage			http://esreality.com/post/2445224/userscript-qlping-ql-ping-utility/
// @author				simonov
// @contributor		wn
// @include				http://*.quakelive.com/*
// @exclude				http://*.quakelive.com/forum*
// @grant					GM_addStyle
// @grant					GM_getValue
// @grant					GM_setValue
// @grant					GM_registerMenuCommand
// @grant					GM_xmlhttpRequest
// @grant					GM_log
// @run-at				document-end
// @updateURL			https://userscripts.org/scripts/source/171037.meta.js
// ==/UserScript==
// tabsize: 2 spaces

// Set up some stuff for user script updating
var SCRIPT_NAME = "QLPing"
	, SCRIPT_VER	= "1.11"
	, GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false
	;

// Set up some utility things
var DEBUG = false
	, DOLITTLE = function() {}
	, logMsg = DEBUG ? function(aMsg) {GM_log(aMsg)} : DOLITTLE
	, logError = function(aMsg) {GM_log("ERROR: " + aMsg)}
	, isChrome = /chrome/i.test(navigator.userAgent)
	;

// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
	// Check for function input.
	if ("function" == typeof(source)) {
		source = "(" + source + ")();";
	}

	// Create a script node holding this source code.
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}

// Don't bother if we're missing critical GM_ functions
if ("undefined" == typeof(GM_xmlhttpRequest)) {
	alert("Your browser/add-on doesn't support GM_xmlhttpRequest, which is "
			+ "required for " + SCRIPT_NAME + " to operate.");
}

/**
 * We can work around other missing GM_ functions using a modified version of...
 *
 * GM_ API emulation for Chrome; 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (isChrome || "undefined" == typeof GM_getValue) {
	GM_getValue = function(aName, aDefaultValue) {
		var value = localStorage.getItem(aName);
		if (!value) return aDefaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case "b":
				return value == "true";
			case "n":
				return Number(value);
			default:
				return value;
		}
	}

	GM_setValue = function(aName, aValue) {
		aValue = (typeof aValue)[0] + aValue;
		localStorage.setItem(aName, aValue);
	}
}

if (isChrome || "undefined" == typeof GM_registerMenuCommand) {
	GM_registerMenuCommand = DOLITTLE;
}

/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
	var AutoUpdater_171037 = {
		id: 171037,
		days: 1,
		name: SCRIPT_NAME,
		version: SCRIPT_VER,
		time: new Date().getTime(),
		call: function (response, secure) {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http" + (secure ? "s" : "") + "://userscripts.org/scripts/source/" + this.id + ".meta.js",
				onload: function (xpr) {
					AutoUpdater_171037.compare(xpr, response)
				},
				onerror: function (xpr) {
					if (secure) {
						AutoUpdater_171037.call(response, false)
					}
				}
			})
		},
		enable: function () {
			GM_registerMenuCommand(this.name + ": Enable updates", function () {
				GM_setValue("updated_171037", new Date().getTime() + "");
				AutoUpdater_171037.call(true, true)
			})
		},
		compareVersion: function (r_version, l_version) {
			var r_parts = r_version.split("."),
				l_parts = l_version.split("."),
				r_len = r_parts.length,
				l_len = l_parts.length,
				r = l = 0;
			for (var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
				r = +(r_parts[i] || "0");
				l = +(l_parts[i] || "0")
			}
			return (r !== l) ? r > l : false
		},
		compare: function (xpr, response) {
			this.xversion = /\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
			this.xname = /\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
			if ((this.xversion) && (this.xname[1] == this.name)) {
				this.xversion = this.xversion[1];
				this.xname = this.xname[1]
			} else {
				if ((xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name)) {
					GM_setValue("updated_171037", "off")
				}
				return false
			}
			var updated = this.compareVersion(this.xversion, this.version);
			if (updated && confirm("A new version of " + this.xname + " is available.\nDo you wish to install the latest version (" + this.xversion + ")?")) {
				var path = "http://userscripts.org/scripts/source/" + this.id + ".user.js";
				if (window.chrome) {
					prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.", path)
				} else {
					try {
						window.parent.location.href = path
					} catch (e) {}
				}
			} else {
				if (this.xversion && updated) {
					if (confirm("Do you want to turn off auto updating for this script?")) {
						GM_setValue("updated_171037", "off");
						this.enable();
						if (window.chrome) {
							alert("You will need to reinstall this script to enable auto-updating.")
						} else {
							alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")
						}
					}
				} else {
					if (response) {
						alert("No updates available for " + this.name)
					}
				}
			}
		},
		check: function () {
			if (GM_getValue("updated_171037", 0) == "off") {
				this.enable()
			} else {
				if (+this.time > (+GM_getValue("updated_171037", 0) + 1000 * 60 * 60 * 24 * this.days)) {
					GM_setValue("updated_171037", this.time + "");
					this.call(false, true)
				}
				GM_registerMenuCommand(this.name + ": Check for updates", function () {
					GM_setValue("updated_171037", new Date().getTime() + "");
					AutoUpdater_171037.call(true, true)
				})
			}
		}
	};
	AutoUpdater_171037.check();
}

// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
	return;
}

// Make sure we're on top
if (window.self != window.top) {
	return;
}

contentEval(function() {
	// load the qlping plugin, if it's not already loaded
	function qlping_loadPlugin() {
		var mimeType = "application/x-qlping";
		if (window['qlping'] === undefined) {
			var pluginAvailable = false;
			for (var i = 0, total = navigator.mimeTypes.length; i < total; i++) {
				if (navigator.mimeTypes[i].type == mimeType) {
					pluginAvailable = true;
					break;
				}
			}
			if (!pluginAvailable) {
				var redirect = confirm("QLPing plugin is not currently installed, would you like to be redirected to the plugin download page?");
				if(redirect) {
					window.location = "http://userscripts.org/scripts/show/171037";
				}
			}
			var plugin = document.createElement('object');
			plugin.setAttribute('type', mimeType);
			plugin.setAttribute('style', 'width: 0; height: 0;');
			document.documentElement.appendChild(plugin);
			window.qlping = plugin;
		}
		return window.qlping;
	}

	// calculate average ping for servers array
	function qlping_pingavg(servers) {
		var pings = [];
		var svs = servers;
		for (var prop in svs) { // make ping array
			if (svs.hasOwnProperty(prop)) {
				var serv = svs[prop];
				if(serv.hasOwnProperty('ping')) {
					pings.push(serv.ping);
				}
			}
		}
		if(pings.length < 1) {
			return 0;
		}
		//var max = Math.max.apply(Math, pings);
		//var min = Math.min.apply(Math, pings);
		var sum = pings.reduce(function(a, b) { return a + b });
		var avg = Math.round(sum / pings.length);
		return avg;
	}

	// get server ping by measuring response time to udp request
	function qlping_getHostPing(hostname, port, location_id) {
		//load plugin if it is not loaded
		var qlping = qlping_loadPlugin();
		var client = qlping.createUdpClient(hostname, port);
		client.addEventListener('data', function(event) {
			var server = client.getHost() + ":" + client.getPort();
			var rtt = client.getRoundTripTime();
			var message = event.readBytes();
			var loc = locdb.locations[location_id];
			if (rtt != -1) {
				var loc_server = loc.qlping_servers[client.getHost()];
				loc_server.ping_arr.push(parseInt(rtt));
				var pings = loc_server.ping_arr;
				var sum = pings.reduce(function(a, b) { return a + b });
				var avg = Math.round(sum / pings.length);
				loc_server.ping = avg;
				loc.qlping_avg = qlping_pingavg(loc.qlping_servers);
			}
			client.close();
		});
		var challenge = "getchallenge";
		var bytes = [];
		for (var i = 0, len = challenge.length; i < len; ++i)
			bytes.push(challenge.charCodeAt(i));
		client.sendBytes([0xFF, 0xFF, 0xFF, 0xFF].concat(bytes));
	}

	// get location servers, to find ip addresses and opened ports, then do a ping measure
	function qlping_getLocation(location_id) {
		var filter = {
			"filters":{
				"group":"any",
				"game_type":"any",
				"arena":"any",
				"state":"any",
				"difficulty":"any",
				"location":location_id,
				"private":0,
				"premium_only":0,
				"invitation_only":0,
				"ranked":"any"
			},
			"arena_type":"",
			"players":[],
			"game_types":[5,4,3,0,1,9,10,11,8,6],
			"ig":0
		};
		$.ajax({
			type: 'get', 
			//port: 'qlping',
			data: {'filter': Base64.encode(JSON.stringify(filter))}, 
			url: '/browser/list', 
			success: function (data) {
				var json = quakelive.Eval(data);
				if (!json || !json.servers 
				|| json.servers.length < 1) {
					return;
				}
				// make requests to each server in given location
				$.each(json.servers, function() {
					var server = this;
					var hostport = server.host_address.split(':');
					if (!hostport.length > 1 
						|| typeof server.location_id === 'undefined' ) {
						return;
					}
					var host = hostport[0];
					var port = hostport[1];
					var loc = locdb.locations[location_id];
					if(loc.hasOwnProperty('qlping_servers') && loc.qlping_servers.hasOwnProperty(host)) {
						return; // we already pinging this server
					}
					loc.qlping_servers[host] = {};
					loc.qlping_servers[host].ping_arr = [];

					//pause for 500ms between requests to the same servers
					var mul = 500;
					for(var n = 0; n < 4; n++) {
						(function (host, port, location_id) {
							window.setTimeout(function() {
								qlping_getHostPing(host, port, location_id)
							}, mul*n);})
						(host, port, server.location_id);
					}
				});
		}, error: function () {
		}});
	}

  // sort servers by their ping from lowest to highest
	function qlping_sortServersByPing(locations) {
		var arr = [];
		for (var prop in locations) {
			if (locations.hasOwnProperty(prop)) {
				var loc = locations[prop];
				if(loc.hasOwnProperty('qlping_servers')) {
					for (var srv in loc.qlping_servers) {
						var server = loc.qlping_servers[srv];
						arr.push({
							'locid': loc.id,
							'host': srv,
							'ping': server.ping,
						});
					}
				}
			}
		}

		arr.sort(function(a, b) {
			// ugly, yeah. but easier to understand
			if ((typeof a.ping === 'undefined' || !parseInt(a.ping)) 
				&& (typeof b.ping === 'undefined' || !parseInt(b.ping))
			) {
				return 0;
			} else if ((typeof a.ping === 'undefined' || !parseInt(a.ping)) 
				&& (typeof b.ping !== 'undefined' && parseInt(b.ping))
			) {
				return 1;
			} else if ((typeof a.ping !== 'undefined' && parseInt(a.ping))
				&& (typeof b.ping === 'undefined' || !parseInt(b.ping))
			) {
				return -1;
			}
			else
				return a.ping - b.ping; 
		});
		
		return arr;
	}

	// redo pinging
	function qlping_update() {
		$.map(locdb.locations, function(location) {
			var location_id = location.id;
			locdb.locations[location_id].qlping_servers = {};
			qlping_getLocation(location_id);
		});
	}

	// override ShowContent to create qlping locations tab
	var qlping_oldqlShowContent = quakelive.ShowContent;
	quakelive.ShowContent = function(v) {
		if (quakelive.IsLoggedIn() && quakelive.userstatus != "ACTIVE") {
			quakelive.Goto("welcome");
		}
		else {
			qlping_oldqlShowContent(v);
			if (quakelive.IsLoggedIn()) {
				if(quakelive.activeModule != quakelive.mod_startamatch
					&& quakelive.activeModule != quakelive.mod_home) {
					return;
				}
				//check if we have ping information
				for (var prop in locdb.locations) {
					if (locdb.locations.hasOwnProperty(prop)) {
						if (typeof locdb.locations[prop].qlping_servers === 'undefined') {
							// we have no ping data, should update
							setTimeout(function() {
								qlping_update();
							}, 50);
							// no need to look further
							break;
						}
					}
				}
				
				// create locations tab in "play online" section
				$("<li id='qlping_locations'>Locations</li>")
					.insertAfter(".postlogin_nav ul li:last");
				// context menu on locations tab
				if (quakelive.siteConfig.showContextMenus) {
					$("body").append(["<ul id='qlping_menu' class='contextMenu'>", 
						"<li class='qlping_refresh'>",
						"<a href='#qlping_refresh'>Refresh Locations</a>",
						"</li>", "</ul>"].join(""));
					$("#qlping_locations").contextMenu({
						menu: 'qlping_menu'
					},
						function(action, el, pos) {
							if(action == 'qlping_refresh') {
								// async update servers
								setTimeout(function() {
									qlping_update();
								}, 50);
							}
					});
				}
				
				// clicked
				$("#qlping_locations").click(function() {
					if(quakelive.activeModule != quakelive.mod_startamatch
						&& quakelive.activeModule != quakelive.mod_home) {
						return;
					}
					if(quakelive.activeModule == quakelive.mod_home) {
						quakelive.mod_home.StopMatchRefresh();
					}
					if($('#mod_sam').length > 0) { // start a match
						$('#mod_sam').remove();
						$("#qlv_contentBody").append("<div id='qlv_postlogin_matches' class='cl'><table id='listViewBrowser' /></div>")
					} else if($('#matchlist_header').length > 0) { // match browser
						$('.filterbar').remove();
						$('#matchlist_header').remove();
						//$('#ql_alt_browser').remove(); // alt browser
						//$('#listViewBrowser').remove();
						$('#btn_customize').remove();
						$('#qlv_postlogin_matches').empty();
						$('#qlv_postlogin_matches').css('margin-top', 0);
						$('#qlv_postlogin_matches').append("<table id='listViewBrowser' /></div>");
					} else if($('.postlogin_nav li#qlping_locations.selected').length > 0) { // already in locations tab
						$('#listViewBrowser').remove();
						$('#qlping_controls').remove();
						$('#qlping_delete_other').remove();
						$('#qlv_postlogin_matches').append("<table id='listViewBrowser'/></div>");
					}
					$('.postlogin_nav li.selected').removeClass('selected');
					$('.postlogin_nav li#qlping_locations').addClass('selected');
					if($("li#qlping_locations").length > 1) { // we have two "locations" tabs
						var user_agent = navigator.userAgent.toString().toLowerCase();
						var delete_instructions = ['To delete older version,',
							' find userscript named "<b>QLPing, quakelive.com udp ping utility</b>"',
							' and uninstall it. Userscript named simply "<b>QLPing</b>" should not be uninstalled'].join("");
						if(user_agent.indexOf('safari') > -1) {
							delete_instructions = ['To delete older version,',
								' open <b>Ninjakit</b>, go to "<b>Scripts</b>" tab,',
								' find userscript named "<b>QLPing, quakelive.com udp ping utility</b>"',
								' select it and uninstall by pressing "<b>delete this script</b>" button.',
								' Userscript named simply "<b>QLPing</b>" should not be uninstalled'].join("");
						} else if(user_agent.indexOf(' rv:1.9') > -1) { // qlprism
							delete_instructions = ['To delete older version,',
							' open <b>Tools -&gt; Manage Scripts</b>,',
								' find userscript named "<b>QLPing, quakelive.com udp ping utility</b>"',
								' select it and press "<b>Uninstall</b>" button at the bottom of dialog.',
								' Userscript named simply "<b>QLPing</b>" should not be uninstalled'].join("");
						} else if(user_agent.indexOf('firefox') > -1) {
							delete_instructions = ['To delete older version,',
								' open <b>Scripts -&gt; Scriptish -&gt; Manage Scripts</b>,',
								' find userscript named "<b>QLPing, quakelive.com udp ping utility</b>"',
								' select it and press "<b>Delete</b>" button.',
								' Userscript named simply "<b>QLPing</b>" should not be uninstalled'].join("");
						}
						var delete_other = $('<div />', {
							id: 'qlping_delete_other',
							style: 'text-align: left; color: black; font: font-size: 16px; margin-bottom: 16px',
							html: ['<b>Please delete older version of QLPing</b>!<br/><br/>',
								'I am terribly sorry for my mistake with autoupdater, ',
								'and now you have to uninstall older verions of QLPing ',
								'to get rid of a double "<b>Locations</b>" tab.<br/><br/>',
								delete_instructions].join("")
						});
						$('#qlv_postlogin_matches').prepend(delete_other);
					}
					var controls = $('<div />', {
						id: 'qlping_controls',
						style: 'text-align: left; margin-bottom: 16px'
					});
					$('#qlv_postlogin_matches').prepend(controls);
					var refresh_button = $('<button>Refresh Locations</button>');
					refresh_button.attr('id', 'qlping_refresh_button');
					refresh_button.attr('title', 'Redo ping to all locations');
					refresh_button.attr('style', 'float: left; margin-bottom: 16px');
					refresh_button.click(function (){
						setTimeout(function() {
							qlping_update();
						}, 50);
					});
					$('#qlping_controls').append(refresh_button);
					var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
					var scoreboard_ping = $('<input />', {
						type: 'checkbox', 
						id: 'qlping_scoreboard_ping', 
						style: 'margin-left: 24px',
						checked: quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1,
						title: ['Your actual ping + ',
							 Math.round(500/maxpackets),
							 ' ms'].join('')
					});
					scoreboard_ping.click(function() {
						if ($(this).prop('checked')) {
							var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
							var confirmation = ['Do you really want to enable scoreboard ping?',
								'<br/><br/>',
								'Scoreboard ping may be closer to what you will see at the scoreboard in game',
								'<br/>',
								'and is calculated by formula', 
								'<br/>',
								'(<i>actual_ping + 1000/cl_maxpackets/2</i>) ms,',
								'<br/>',
								'which in your case is',
								'<br/>',
								'(<i>actual_ping + ', Math.round(500/maxpackets), '</i>) ms'
							].join('');
							qlConfirm('Display scoreboard ping', confirmation, function() {
								// onsuccess
								quakelive.cvars.Set('_qlping_scoreboard_ping', 1);
								quakelive.cfgUpdater.Commit(1)
								setTimeout(function() {
									$('#qlping_locations').click();
								}, 50);
							}, function () {
								// onfail
								$('#qlping_scoreboard_ping').prop('checked', false);
							});
						} else {
							quakelive.cvars.Set('_qlping_scoreboard_ping', 0);
							quakelive.cfgUpdater.Commit(1);
							setTimeout(function() {
								$('#qlping_locations').click();
							}, 50);
						}
					});
					$('#qlping_controls').append(scoreboard_ping);
					var splabel = $('<label />', {
						id: 'qlping_splabel',
						for: 'qlping_scoreboard_ping',
						text: 'Display scoreboard ping',
						style: 'color: black; display: inline-block; margin: 4px 4px',
						title: ['Your actual ping + ',
							 Math.round(500/maxpackets),
							 ' ms'].join('')
					});
					$('#qlping_controls').append(splabel);
					$('table#listViewBrowser').append(
						["<thead>",
							"<tr>",
							"<th>Location</th>",
							"<th>Server IP</th>",
							"<th>Ping, ms</th>",
							"</tr>",
						"</thead>"].join(''));
					// show all locations, not only ones with the ping info
					var locs_hasping = [];
					var servers = qlping_sortServersByPing(locdb.locations);
					$.map(servers, function(server) { // make array of locs with ping info
						if($.inArray(server.locid, locs_hasping) < 0) {
							locs_hasping.push(server.locid);
						}
					});
					$.map(locdb.locations, function(loc) { // add locs without ping info to display array
						if(typeof loc === 'undefined' 
							|| !loc.hasOwnProperty('id')
							|| $.inArray(loc.id, locs_hasping) >= 0) {
							return;
						}
						servers.push({
							'locid': loc.id,
							'host': "N/A",
							'ping': "N/A",
						});
					});
					$.map(servers, function(server) {
						if(server.host != "N/A" && (isNaN(parseFloat(server.ping)) || !isFinite(server.ping)) ) {
							return; // ping is not numeric
						}
						var tRow = $("<tr>");
						var location_img = $("<img class='location_flag' src='' alt='' title='' width='16' height='11' />");
						var loc = locdb.locations[server.locid];
						location_img.attr('src', quakelive.resource(loc.GetFlagIcon()));
						location_img.attr('alt', loc.countryAbbr);
						location_img.attr('title', loc.country);
						var location_text = $("<a style='font-weight:bold; color:black; text-decoration:none' href='#'></a>");
						location_text.html(loc.location);
						location_text.click(function() { // change server filter on location click
							quakelive.mod_home.filter.filters.location = loc.id;
							quakelive.Goto('home');
						});
						var tCell = $("<td class='table_location' style='white-space:nowrap'>");
						tCell.append(location_img);
						tCell.append("&nbsp;");
						tCell.append(location_text);
						tRow.append(tCell);
						tCell = $("<td>").html(server.host);
						tRow.append(tCell);
						var ping = server.ping;
						if(ping != 'N/A' && quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1) {
							var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
							ping += Math.round(500/maxpackets);
						}
						tCell = $("<td>").html(ping);
						if(server.host != "N/A" 
							&& loc.hasOwnProperty("qlping_servers")
							&& typeof loc.qlping_servers[server.host] !== 'undefined'
							&& loc.qlping_servers[server.host].hasOwnProperty("ping_arr")
							&& typeof tCell.attr === 'function'
						) {
							tCell.attr("title", "Last ping requests in ms: " 
								+ loc.qlping_servers[server.host].ping_arr.join(', '));
						}
						tRow.append(tCell);
						$('table#listViewBrowser').append(tRow);
					});
				}).attr("title", "Right click to refresh");
			}
		}
	}

	/**
	 * Override BuildServerContent to show your ping
	 */
	var qlping_oldBuildServerContent = quakelive.matchtip.BuildServerContent;
	quakelive.matchtip.BuildServerContent = function($tip, server) {
		var isNewTip = 0 == $tip.find("#lgi_host_name").length
			, $ret = qlping_oldBuildServerContent.call(quakelive.matchtip, $tip, server)
			;

		// Only modify for the first call
		if (!isNewTip) {
			return $ret;
		}

		var loc = locdb.locations[server.location_id];
		var host = server.host_address.split(':')[0];
		if(typeof loc === 'undefined'
			|| !loc.hasOwnProperty("qlping_servers")
			|| !loc.qlping_servers.hasOwnProperty(host)
		) {
			//we have no data
			return $ret;
		}
		var tipDetails = $ret.find("#lgi_map_details");
		var tipAfter = $ret.find("#lgi_match_players");
		var InsertTipDetail = function (id, txt, circlecolor) {
			var dline = tipDetails.find("#" + id);
			if (dline.length == 0) {
				dline = $(["<div class='cl'></div>", "</p>", "<p id='", id, "' class='lgi_row'>", "<span id='", id, "_circle'></span>", "<span id='", id, "_span'></span>"].join(""));
				dline.insertAfter(tipAfter);
			}
			var span_circle_class = {
				display: "block",
				padding: "0",
				margin: "0",
				width: "15px",
				height: "15px",
				"border-radius": "8px",
				"-moz-border-radius": "8px",
				"background-color": circlecolor,
				border: "1px solid #555"
			};
			dline.find("#" + id + "_circle").css(span_circle_class);
			dline.find("#" + id + "_span").html(txt);
		};
		var ping = loc.qlping_servers[host].ping;
		if(ping != 'N/A' && quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1) {
			var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
			ping += Math.round(500/maxpackets);
		}
		var color = "#eee";
		if(ping < 45) {
			color = "limegreen";
		} else if(ping < 75) {
			color = "gold";
		} else if(ping >= 75) { // to be sure that ping is numeric
			color = "red";
		}
		InsertTipDetail("lgi_qlping", "Your ping: " + ping + " ms", color);
		return $ret;
	}

	if (!Object.keys) { // for older browser compatibility
		Object.keys = (function () {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;
			return function (obj) {
				if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
				var result = [];
				for (var prop in obj) {
					if (hasOwnProperty.call(obj, prop)) result.push(prop);
				}
				if (hasDontEnumBug) {
					for (var i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
					}
				}
				return result;
			};
		})();
	}

	window.qlping_goLocation = function(id) { // change server filter on location click
		quakelive.mod_home.filter.filters.location = id;
		quakelive.Goto('home');
	}

	var qlping_oldAddContact = quakelive.mod_friends.roster.AddContact;
	quakelive.mod_friends.roster.AddContact = function (item) {
		qlping_oldAddContact.call(quakelive.mod_friends.roster, item);
		var qlping_oldAppendToHistory = item.AppendToHistory;
		item.AppendToHistory = function (hist) { // make tables from ping info
			qlping_oldAppendToHistory.call(this, hist);
			var messages = this.prevChatNode.children('div');
			if(messages.length > 0) {
				var msg = messages[messages.length - 1];
				var html = $(msg).html().replace(/&nbsp;/g, ' ');
				
				// make a locations table
				var re_locs = /(([\w\-]+)\s?([\w\-]+)?\s(\d+)\sms\s?){1,}/ig;
				while (item = re_locs.exec(html)) {
					var str = item[0];
					var re_loc = /([\w\-]+)\s?([\w\-]+)?\s(\d+)\sms/ig; // COUNTRY City 99 ms || COUNTRY 99 ms || COUNTRY-servlastoctet 99 ms || COUNTRY City-servlastoctet 99 ms
					var item = null;
					var newhtml = ["<table style='width: 100%'>",
						"<tr>",
						"<th style='font-weight:bold;'>Location</th>",
						"<th style='font-weight:bold;'>Ping, ms</th>",
						"</tr>"
					].join("");
					while (item = re_loc.exec(str)) {
						var loc_ping = parseInt(item[3]);
						var loc_country = item[1];
						var loc_city = item[2];
						var loc_lastoctet = null;
						var re_octet = /([a-z]+)\-(\d+)/i;
						var octet = loc_country.match(re_octet);
						if(octet != null) { // COU-23
							loc_country = octet[1];
							loc_lastoctet = octet[2];
						} else if(loc_city != null) {
							octet = loc_city.match(re_octet);
							if(octet != null) { // COU City-23
								loc_city = octet[1];
								loc_lastoctet = octet[2];
							}
						}
						var loc_search = locdb.locsByCountry[loc_country];
						if(typeof loc_search === 'undefined') {
							continue;
						}
						var loc_found = null;
						if(typeof loc_city !== 'undefined') {
							// country has more than one location, continue search by city
							$.each(loc_search, function() {
								if(this.hasOwnProperty('city')
								&& this.city == loc_city) {
									loc_found = this;
									return false; //break
								}
							});
						} else {
							loc_found = loc_search[0];
						}
						if(loc_found == null) {
							continue;
						}
						var location_img = ["<img class='location_flag' src='", quakelive.resource(loc_found.GetFlagIcon()),
							"' alt='", loc_found.countryAbbr,
							"' title='", loc_found.country,
							"' style='border:0; float:left' width='16' height='11' />"
							].join("");
						newhtml += ["<tr>",
						"<td style='text-align: left; white-space: nowrap'>", 
							"<a href='#' style='text-decoration: none' onclick='qlping_goLocation(",loc_found.id,")'>",
							location_img, 
							"<span style='white-space:nowrap; display:inline-block; margin-top:5px;'>", 
							loc_found.location, "</span></a></td>",
						"<td style='margin-top:5px; text-align:center'>", loc_ping, "</td>",
						"</tr>"].join("");
					}
					newhtml += "</table>";
					html = html.replace(str, newhtml);
				}

				// make a locations recomendation table
				var re_locs = /((\w+)\s?(\w+)?\s(\d+)[^\d](\d+)\sms\s?){1,}/ig;
				while (item = re_locs.exec(html)) {
					var str = item[0];
					var re_loc = /([\w\-]+)\s?([\w\-]+)?\s(\d+)[^\d](\d+)\sms/ig;
					var item = null;
					var newhtml = ["<table style='width: 100%;'>",
						"<tr>",
						"<th style='font-weight:bold;'>Location</th>",
						"<th style='font-weight:bold; margin-left: 4px'>My Ping, ms</th>",
						"<th style='font-weight:bold; margin-left: 4px'>Your Ping, ms</th>",
						"</tr>"
					].join("");
					while (item = re_loc.exec(str)) {
						var loc_ping = parseInt(item[3]);
						var your_ping = parseInt(item[4]);
						var loc_country = item[1];
						var loc_city = item[2];
						var loc_search = locdb.locsByCountry[loc_country];
						if(typeof loc_search === 'undefined') {
							continue;
						}
						var loc_found = null;
						if(typeof loc_city !== 'undefined') {
							// country has more than one location, continue search by city
							$.each(loc_search, function() {
								if(this.hasOwnProperty('city')
								&& this.city == loc_city) {
									loc_found = this;
									return false; //break
								}
							});
						} else {
							loc_found = loc_search[0];
						}
						if(loc_found == null) {
							continue;
						}
						var location_img = ["<img class='location_flag' src='", quakelive.resource(loc_found.GetFlagIcon()),
							"' alt='", loc_found.countryAbbr,
							"' title='", loc_found.country,
							"' style='border:0; float:left' width='16' height='11' />"
							].join("");
						var loctext = loc_found.countryAbbr;
						if(typeof locdb.locsByCountry[loc_found.countryAbbr] !== 'undefined' 
							&& locdb.locsByCountry[loc_found.countryAbbr].length > 1) {
							loctext += " " + loc_found.city.substr(0,3);
						}
						newhtml += ["<tr>",
						"<td style='text-align: left; white-space: nowrap'>", 
							"<a href='#' style='text-decoration: none' onclick='qlping_goLocation(",loc_found.id,")'>",
							location_img, 
							"<span style='display:inline-block; margin-top:5px;'>", 
							loctext, "</span></a>","</td>",
						"<td style='margin-top:5px; text-align:center;'>", loc_ping, "</td>",
						"<td style='margin-top:5px; text-align:center;'>", your_ping, "</td>",
						"</tr>"].join("");
					}
					newhtml += "</table>";
					html = html.replace(str, newhtml);
				}
				$(msg).html(html);
			}
		}
		
		var qlping_oldFriendsContextMenuHandler = item.FriendsContextMenuHandler;
		item.FriendsContextMenuHandler = function (action, el, pos) {
			qlping_oldFriendsContextMenuHandler(action, el, pos);
			if(action != "qlping_send") {
				return;
			}
			var contact = el.data('contact');
			var servers = qlping_sortServersByPing(locdb.locations);
			var output = "";
			var locsdone = [];
			var fix = 0;
			if(quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1) {
				var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
				fix = Math.round(500/maxpackets);
			}
			var n = 0;
			for(var i = 0, len = servers.length; i < len; i++) {
				if(n == 10) { //limit to first ten locations
					break;
				}
				var server = servers[i];
				if(!server.hasOwnProperty("locid") 
					|| ($.inArray(server.locid, locsdone) > -1)
				) {
					continue; // already shown that location
				}
				locsdone.push(server.locid);
	
				var loc = locdb.locations[server.locid];
				var loctext = loc.countryAbbr;
				if(typeof locdb.locsByCountry[loc.countryAbbr] !== 'undefined' 
					&& locdb.locsByCountry[loc.countryAbbr].length > 1) {
					loctext += " " + loc.city; // more than one city in this country
				}
				if(Object.keys(loc.qlping_servers).length > 1) { // more than one server in location
					if(typeof loc.qlping_avg === 'undefined') {
						continue;
					}
					loctext += " " + parseInt((+loc.qlping_avg) + (+fix)) + " ms "; // \n doesn't work and <br/> gets escaped
				} else {
					if(typeof server.ping === 'undefined') {
						continue;
					}
					loctext += " " + parseInt((+server.ping) + (+fix)) + " ms "; // \n doesn't work and <br/> gets escaped
				}
				output += loctext;
				n++;
			}
			if(output.length > 0) {
				var loc_header = (fix > 0)?
					"My nearest locations (as displayed on scoreboard, fixed by +" + fix + " ms):"
					:"My nearest locations:";
				contact.SendMessage(loc_header);
				contact.SendMessage(output);
			} else {
				qlPrompt({
					title: 'No location info', 
					body: 'qlping does not have a location info to send!', 
					alert: true
				});
				return;
			}
			if(contact.hasOwnProperty("qlping_servers") && contact.qlping_servers.length > 0) {
				var arr = contact.qlping_servers;
				// sort by ping difference
				arr.sort(function(a, b) {
					// ARGH FIX IT SOMEBODY PLEASE
					if(!a.hasOwnProperty('locid') && !b.hasOwnProperty('locid')) {
						return 0;
					} else if(!a.hasOwnProperty('locid') && b.hasOwnProperty('locid')) {
						return 1;
					} else if(a.hasOwnProperty('locid') && !b.hasOwnProperty('locid')) {
						return -1;
					} else if(!a.hasOwnProperty('ping') && !b.hasOwnProperty('ping')) {
						return 0;
					} else if(!a.hasOwnProperty('ping') && b.hasOwnProperty('ping')) {
						return 1;
					} else if(a.hasOwnProperty('ping') && !b.hasOwnProperty('ping')) {
						return -1;
					} else if(!locdb.locations[a.locid].hasOwnProperty('qlping_avg') && !locdb.locations[b.locid].hasOwnProperty('qlping_avg')) {
						return 0;
					} else if(!locdb.locations[a.locid].hasOwnProperty('qlping_avg') && locdb.locations[b.locid].hasOwnProperty('qlping_avg')) {
						return 1;
					} else if(locdb.locations[a.locid].hasOwnProperty('qlping_avg') && !locdb.locations[b.locid].hasOwnProperty('qlping_avg')) {
						return -1;
					} else {
						var fix = 0;
						if(quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1) {
							var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
							fix = Math.round(500/maxpackets);
						}
						a.diff = Math.abs(locdb.locations[a.locid].qlping_avg + fix - a.ping);
						//a.diff = Math.round(a.diff/10)*10; //round by 10
						b.diff = Math.abs(locdb.locations[b.locid].qlping_avg + fix - b.ping);
						//b.diff = Math.round(b.diff/10)*10; //round by 10
						return a.diff - b.diff;
					}
				});

				var output = "";
				for(var i = 0, len = arr.length; i < len; i++) {
					var loc = locdb.locations[arr[i].locid];
					if(!loc.hasOwnProperty("qlping_avg")){
						continue;
					}
					if(loc.qlping_avg + fix > 100 || arr[i].ping > 100) {
						continue; // ping 100+ is mostly unplayable
					}
					var loctext = loc.countryAbbr;
					if(typeof locdb.locsByCountry[loc.countryAbbr] !== 'undefined' 
						&& locdb.locsByCountry[loc.countryAbbr].length > 1) {
						loctext += " " + loc.city;
					}
					loctext += " " + parseInt((+loc.qlping_avg) + (+fix)) + "‑" + arr[i].ping + " ms ";
					output += loctext;
				}
				if(output.length > 0) {
					contact.SendMessage("‑‑‑");
					contact.SendMessage("qlping recommended locations");
					contact.SendMessage("(Location MyPing-YourPing ms):");
					contact.SendMessage(output);
				}
			}
		}
	}

	var qlping_oldIM_OnMessage = window.IM_OnMessage;
	window.IM_OnMessage = function (message_json) {
		qlping_oldIM_OnMessage(message_json);
		var msg = quakelive.Eval(message_json);
		var jid = new JID(msg.who);
		var contact = quakelive.mod_friends.roster.GetContactByJID(jid);
		if(!contact) {
			return;
		}
		// store this contact ping information, if we find any
		var ping_arr = [];
		//var s = "RUS 48 ms UKR 58 ms SWE 82 ms NOR 85 ms NLD Amsterdam 92 ms GBR 92 ms ITA 92 ms DEU-29 97 ms POL 98 ms NLD Rotterdam 105 ms";
		var str = msg.what;
		var re_loc = /([\w\-]+)\s?([\w\-]+)?\s(\d+)\sms/ig; // COUNTRY City 99 ms || COUNTRY 99 ms || COUNTRY-servlastoctet 99 ms || COUNTRY City-servlastoctet 99 ms
		var item = null;
		while (item = re_loc.exec(str)) {
			var loc_ping = parseInt(item[3]);
			var loc_country = item[1];
			var loc_city = item[2];
			var loc_lastoctet = null;
			var re_octet = /([a-z]+)\-(\d+)/i;
			var octet = loc_country.match(re_octet);
			if(octet != null) { // COU-23
				loc_country = octet[1];
				loc_lastoctet = octet[2];
			} else if(loc_city != null) {
				octet = loc_city.match(re_octet);
				if(octet != null) { // COU City-23
					loc_city = octet[1];
					loc_lastoctet = octet[2];
				}
			}
			var loc_search = locdb.locsByCountry[loc_country];
			if(typeof loc_search === 'undefined') {
				continue;
			}
			var loc_found = null;
			if(typeof loc_city !== 'undefined') {
				// country has more than one location, continue search by city
				$.each(loc_search, function() {
					if(this.hasOwnProperty('city')
					&& this.city == loc_city) {
						loc_found = this;
						return false; //break
					}
				});
			} else {
				loc_found = loc_search[0];
			}
			if(loc_found == null) {
				continue;
			}
			ping_arr.push({
				locid: loc_found.id,
				host: loc_lastoctet,
				ping: loc_ping
			});
		}
		if(ping_arr.length > 0) {
			// save to use later
			contact.qlping_servers = ping_arr;
		}
	}

	qlping_OUTPUT = ["print", "echo", "say", "say_team"];

	qlping_igAnnounce = function(aMsg, aIsError) { // hello wn, you made it better!
		if (!(aMsg && quakelive.IsGameRunning())) {
			return;
		}
		var msg = (aIsError ? "^2[^1qlping^2]" : "^2[qlping]") + " ^7" + aMsg + ";";
		qz_instance.SendGameCommand("echo " + msg);

		if (aIsError) {
			qz_instance.SendGameCommand("print " + msg);
		}
		else {
		}
	}

	var qlping_oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function(name, val, replicate) { // hello wn, you made it better!
		switch (name) {
		case "_qlping_announce":
			// Ignore if not 1 or QL is not running
			if (1 !== parseInt(val) || !quakelive.IsGameRunning()) {
				break;
			}

			var servers = qlping_sortServersByPing(locdb.locations);
			var output = [];
			var locsdone = [];
			var fix = 0;
			if(quakelive.cvars.GetIntegerValue('_qlping_scoreboard_ping', 0) == 1) {
				var maxpackets = quakelive.cvars.GetIntegerValue('cl_maxpackets', 63);
				fix = Math.round(500/maxpackets);
			}
			var n = 0;
			for(var i = 0, len = servers.length; i < len; i++) {
				if(n == 10) { //limit to first ten locations
					break;
				}
				var server = servers[i];
				if(!server.hasOwnProperty("locid") || ($.inArray(server.locid, locsdone) > -1)){
					continue;
				}
				n++;
				locsdone.push(server.locid);
				var loc = locdb.locations[server.locid];
				var loctext = "^7" + loc.countryAbbr;
				if(typeof locdb.locsByCountry[loc.countryAbbr] !== 'undefined' 
					&& locdb.locsByCountry[loc.countryAbbr].length > 1) {
					loctext += " " + loc.city.substr(0,4); // more than one city in this country
				}
				var color = "^4";
				if(loc.qlping_avg + fix < 45) {
					color = "^2";
				} else if(loc.qlping_avg + fix < 75) {
					color = "^3";
				} else if(loc.qlping_avg + fix >= 75) { // to be sure that ping is numeric
					color = "^1";
				}
				loctext += " " + color + parseInt((+loc.qlping_avg) + (+fix)) + " ms";
				output.push(loctext);
			}

			if(output.length < 1) {
				qlping_igAnnounce("No ping info for locations found! Please try later or check if qlping plugin is installed.", true);
				break;
			}

			var mul = 1
			, currentOut = quakelive.cvars.Get("_qlping_outputMethod", qlping_OUTPUT[0]).value
			, step = $.inArray(currentOut, ["echo","print"]) > -1 ? 100 : 700;
			
			// Show the chat pane for 10 seconds if output method is 'print',
			// otherwise it will be difficult to notice.
			if ("print" == currentOut) {
				qz_instance.SendGameCommand("+chat;");
				setTimeout(function() {
					qz_instance.SendGameCommand("-chat;");
				}, 10000);
			}
			
			var loc_header = (fix > 0)?
				" ^2[qlping] My nearest locations (as displayed on scoreboard, fixed by +" + fix + " ms):"
				:" ^2[qlping] My nearest locations:";
			qz_instance.SendGameCommand(currentOut + loc_header);
			for (var i = 0, out = [], len = output.length; i < len; ++i) {
				out.push(output[i]);

				// Group by 3, delaying commands as needed
				if ((i+1) % 4 == 0 || (i+1) == len) {
					setTimeout(function(txt, isLast) {
						qz_instance.SendGameCommand(currentOut + " ^2[qlping] " + txt + ";");
						if (isLast) {
							setTimeout(function() {
								qlping_igAnnounce("Done.", false);
							}, step);
						}
					}.bind(null, out.join(", "), (i+1) == len), mul++ * step);
					out = [];
				}
			}
			break;
		case "_qlping_refresh":
			// Ignore if not 1 or QL is not running
			if (1 !== parseInt(val) || !quakelive.IsGameRunning()) {
				break;
			}
			// redo servers ping polling
			qlping_igAnnounce("Updating servers ping info, you can check results after several seconds...", true);
			qlping_update();
			break;
		case "_qlping_outputMethod":
			// See if the value is valid.  If not, set it to a good one.
			var oi = 0;
			val = $.trim((val + "")).toLowerCase();
			for (var i = 0, e = qlping_OUTPUT.length; i < e; ++i) {
				if (val == qlping_OUTPUT[i]) {
					oi = i;
					break;
				}
			}
			val = qlping_OUTPUT[oi];
			replicate = 1;
			break;
		}
		qlping_oldOnCvarChanged.call(null, name, val, replicate);
	}

	qlping_loadPlugin();
	$("#friendsContext li.qlping_send").remove(); // remove context menu from old version
	// add a contact context menu item
	$("#friendsContext").append("<li class='qlping_send'><a href='#qlping_send' title='Send my nearest location info to this player'>Send&nbsp;my&nbsp;locations</a></li>");
}); // end of call to contentEval
