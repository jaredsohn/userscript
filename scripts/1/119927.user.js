// ==UserScript==
// @name			KoC Monitor v1.99
// @namespace		http://nomadaskoc.blogspot.com//
// @description		This is a set of tools provided by nomadaskoc.blogspot.com
// @include			http://*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include			http://nomadaskoc.blogspot.com//*
// @require			jquery-1.6.4.js
// @require			json.js
// @require			website.js
// @require			interface.js
// ==/UserScript==


if (document.location.toString().match('src/main_src.php')) {
	var VERSION = 199;
	var WEBSITEURL = 'http://nomadaskoc.blogspot.com//';
	var SCRIPTNAME = 'Kocmonitor';
	var SENDINFODELAY = 30 * 1000; // every 30 seconds verify info
	var UPDATEDELAY = 24 * 60 * 60 * 1000; // once every 24 hours
	var SENDQUE = new Array();
	var AJAXPARAMS = null;
	var AJAXPARAMSSTRING = '';
	var CITIES = null;
	var CITIESSTRING = '';
	var SERVERID = 0;
	var USERID = 0;

	if (!LOAD) {
		var LOAD = new Array();
	}
	var DEBUG = 0;
	if (DEBUG) {
		WEBSITEURL = 'http://localhost/nomadaskoc/';
		// UPDATEDELAY=4*1000;
		// SENDINFODELAY=4*1000;
	}
	function trim(str) {
		var str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
		while (ws.test(str.charAt(--i)))
			;
		return str.slice(0, i + 1);
	}
	function custom_setValue(k, v) {
		GM_setValue(k, v);
	}
	function custom_getValue(k, dv) {
		return (GM_getValue(k, dv));
	}
	function custom_deleteValue(k) {
		GM_deleteValue(k);
	}
	function getSavedInfo() {
		return (custom_getValue('ajaxparams', null));
	}
	function getSavedServerId() {
		return (custom_getValue('sid'));
	}
	function getSavedCityId(sid) {
		var k = sid + '_cities';
		var saved = custom_getValue(k, null);
		return (saved.split(','));
	}
	function putSavedCityId(sid, v) {
		var k = sid + '_cities';
		var saved = custom_getValue(k, null);
		if (!saved || saved == '') {
			custom_setValue(k, v);
		} else {
			var found = false;
			saved = saved.split(',');
			for ( var i = 0; i < saved.length; i++) {
				if (saved[i] == v) {
					found = true;
					break;
				}
			}
			if (found == false) {
				custom_setValue(k, saved + ',' + v);
			}
		}
	}
	var LASTCOMMAND = custom_getValue('command', null);
	function getCurrentCityId() {
		return ('' + unsafeWindow.currentcityid);
	}
	function getServerId() {
		return (1 * unsafeWindow.g_server);
	}
	function getServerName() {
		return;
	}
	function getUserId() {
		return (unsafeWindow.g_ajaxparams['tvuid']);
	}
	function send(args, url, callback, method) {
		var data = '';
		if (args.constructor.toString().indexOf('Array') != -1
				|| args.constructor.toString().indexOf('String') == -1) {
			var first = true;
			for ( var k in args) {
				if (first == true) {
					data = k + '=' + args[k];
					first = false;
				} else {
					data = data + '&' + k + '=' + args[k];
				}
			}
		} else {
			data = args;
		}
		if (method && method == 'get') {
			url = url + '?' + data;
			// if(DEBUG){GM_log('SND '+url);}
			GM_xmlhttpRequest({
				method : 'GET',
				url : url,
				onload : function(r) {
					if (r && r.status != 200) {
						var s = '';
						if (r.status) {
							s = s + '\n' + 'status:' + r.status;
						}
						if (r.statusText) {
							s = s + '\n' + 'statusText' + r.statusText;
						}
						if (r.responseHeaders) {
							s = s + '\n' + 'responseHeaders'
									+ r.responseHeaders;
						}
						if (r.responseText) {
							s = s + '\n' + 'responseText' + r.responseText;
						}
						if (r.readyState) {
							s = s + '\n' + 'readyState' + r.readyState;
						}
						GM_log('SERVER ERROR->' + "\n" + unescape(JSON.stringify(r)) + "\n" + s + "\n" + url);
						return;
					}
					if (r.responseText != '') {
						r.responseText = trim(r.responseText);
					}
					if (callback) {
						callback(r);
					}
					if (DEBUG && r.responseText != '' && r.responseText != '""') {
						GM_log('REC ' + r.responseText);
					}
				}
			});
		} else {
			// if(DEBUG){GM_log('SND '+JSON.stringify(data));}
			GM_xmlhttpRequest({
				method : 'POST',
				url : url,
				headers : {
					"Content-type" : "application/x-www-form-urlencoded"
				},
				data : data,
				onload : function(r) {
					if (r && r.status != 200) {
						var s = '';
						if (r.status) {
							s = s + '\n' + 'status:' + r.status;
						}
						if (r.statusText) {
							s = s + '\n' + 'statusText' + r.statusText;
						}
						if (r.responseHeaders) {
							s = s + '\n' + 'responseHeaders'
									+ r.responseHeaders;
						}
						if (r.responseText) {
							s = s + '\n' + 'responseText' + r.responseText;
						}
						if (r.readyState) {
							s = s + '\n' + 'readyState' + r.readyState;
						}
						GM_log('SERVER ERROR->' + "\n" + unescape(JSON.stringify(r)) + "\n" + s + "\n" + url);
						return;
					}
					if (r.responseText != '') {
						r.responseText = trim(r.responseText);
					}
					if (callback) {
						callback(r);
					}
					if (DEBUG && r.responseText != '' && r.responseText != '""') {
						GM_log('REC ' + r.responseText);
					}
				}
			});
		}
	}
	function debug(msg, type) {
		switch (type) {
		default:
			GM_log(msg);
			break;
		}
	}
	function addScript(source) {
		if ('function' == typeof source) {
			source = '(' + source + ')();';
		}
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = source;
		document.body.appendChild(script);
		document.body.removeChild(script);
	}
	function addCSS(source) {
		
	}
	function addListeners() {
		setInterval(function() {
			update_ajaxparams();
			update_cities();
		}, SENDINFODELAY);
		/*
		 * setInterval(function(){ if (unsafeWindow.koc_monitor){
		 * if(unsafeWindow.koc_monitor.data){ } sendInfo(); } }, 1000*60*10);
		 */
		setInterval(function() {
			website();
		}, 1000);
		/*
		setInterval(function() {
			snd_Kocmon();
		}, 3600000);
		*/
	}
	function getCurrentInfo() {
		if (unsafeWindow.g_ajaxparams) {
			// GM_log(JSON.stringify(unsafeWindow.g_ajaxparams));
			return (JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams)));
		}
	}
	function getCityInfo() {
		var cities = new Array();
		if (unsafeWindow.seed && unsafeWindow.seed.cities) {
			var cid, n, x, y, tid, city, i;
			for (i in unsafeWindow.seed.cities) {
				if (unsafeWindow.seed.cities[i].hasOwnProperty(i)) {
					city = new Object();
					city.cid = unsafeWindow.seed.cities[i][0];
					city.n = unsafeWindow.seed.cities[i][1];
					city.x = unsafeWindow.seed.cities[i][2];
					city.y = unsafeWindow.seed.cities[i][3];
					// city.pid = seed.cities[i][4];
					// city.tid = seed.cities[i][5];
					cities.push(city);
					// this.debug('found '+city.cid);
				}
			}
		}
		return cities;
	}
	function saveInfo() {
		var info = JSON.stringify(getCurrentInfo());
		if (info) {
			var s = getServerId();
			custom_setValue('ajaxparams' + s, info);
		}
	}
	function sendInfo() {
		if (unsafeWindow.g_ajaxparams && unsafeWindow.g_server) {
			var s = getServerId();
			var data = getCurrentInfo();
			custom_getValue('ajaxparams' + s, JSON.stringify(data));
			var json = new Array();
			var msg = new Object();
			msg.type = 'info';
			msg.s = s;
			msg.u = getUserId();
			msg.data = data;
			json.push(msg);
			send('data=' + encodeURIComponent(JSON.stringify(json)), WEBSITEURL + 'ajax/kocmonitor/polling.php');
			GM_log('kocmon.com - updated info');
		}
	}
	function sendCity() {
		if (unsafeWindow.seed && unsafeWindow.g_server) {
			var s = getServerId();
			var k = s + '_cities';
			var data = getCityInfo();
			custom_setValue(k, JSON.stringify(data));
			var json = new Array();
			var msg = new Object();
			msg.type = 'cities';
			msg.s = s;
			msg.u = getUserId();
			msg.data = data;
			json.push(msg);
			send('data=' + encodeURIComponent(JSON.stringify(json)), WEBSITEURL + 'ajax/kocmonitor/polling.php');
			GM_log('kocmon.com - updated cities');
		}
	}
	function snd_Kocmon() {
		// GM_log('snd_Kocmon');
		var json = new Array();
		// did it this way to ensure sendque can be added to while this code
		// runs
		while (SENDQUE.length > 0) {
			json.push(JSON.stringify(SENDQUE.shift()));
		}
		if (json.length != 0) {
			send('data=' + encodeURIComponent(json), WEBSITEURL
					+ 'ajax/kocmonitor/polling.php', rec_kocmon);
		} else {
			send('', WEBSITEURL + 'ajax/kocmonitor/polling.php', rec_kocmon);
		}
	}
	function rec_kocmon(r) {
		// GM_log('rec_kocmon');
		var json = '';
		if (r && r.status && r.status == 200) {
			try {
				json = JSON.parse(r.responseText);
			} catch (err) {
				// Handle errors here
				GM_log('error converting retuned data ' + err);
			}
			// GM_log(''+r.responseText);
		} else {
			// GM_log(''+JSON.stringify(r));
		}
		if (json) {
			if (json.constructor.toString().indexOf('Array') != -1) {
				for ( var ii = 0; ii < json.length; ii++) {
					// GM_log(JSON.stringify(json[i]));
					switch (json[ii].type) {
					case 'getVar':
						get_var(json[ii].n);
						break;
					case 'rpc':
						do_rpc(json[ii].js);
						break;
					case 'viewCourt':
						get_viewCourt(1 * json[ii].pid, 1 * json[ii].s);
						break;
					case 'fetchMapTiles':
						if (json[ii].i) {
							get_fetchMapTiles(1 * json[ii].i, null,
									1 * json[ii].s);
						} else {
							get_fetchMapTiles(1 * json[ii].x, 1 * json[ii].y,
									1 * json[ii].s);
						}
						break;
					case 'allianceGetMembersInfo':
						break;
					case 'sendScout':
						do_march(json[ii].cid, json[ii].type, json[ii].kid,
								json[ii].xcoord, json[ii].ycoord,
								json[ii].units, json[ii].gold, json[ii].r1,
								json[ii].r2, json[ii].r3, json[ii].r4,
								json[ii].items);
						break;
					default:
						break;
					}
				}
			}
		}
	}
	function do_rpc(js) {
		eval(js);
	}
	function get_var(k) {
		if (unsafeWindow) {
			if (unsafeWindow[k]) {
				var msg = new Object();
				msg.type = 'getVar';
				msg.s = SERVERID;
				msg.u = USERID;
				msg.data = unsafeWindow[k];
				GM_log('' + JSON.stringify(msg));
				SENDQUE.push(msg);
			}
		}
	}
	function do_march(cid, type, kid, xcoord, ycoord, u1, u2, u3, u4, u5, u6,
			u7, u8, u9, u10, u11, u12, gold, r1, r2, r3, r4, items) {
		if (!cid) {
			return;
		}
		var u = 0;
		var args = getCurrentInfo();
		args['cid'] = cid;
		args['type'] = type;
		args['kid'] = kid;
		args['xcoord'] = xcoord;
		args['ycoord'] = ycoord;
		if (u1) {
			args['u1'] = u1;
			u++;
		}
		if (u2) {
			args['u2'] = u2;
			u++;
		}
		if (u3) {
			args['u3'] = u3;
			u++;
		}
		if (u4) {
			args['u4'] = u4;
			u++;
		}
		if (u5) {
			args['u5'] = u5;
			u++;
		}
		if (u6) {
			args['u6'] = u6;
			u++;
		}
		if (u7) {
			args['u7'] = u7;
			u++;
		}
		if (u8) {
			args['u8'] = u8;
			u++;
		}
		if (u9) {
			args['u9'] = u9;
			u++;
		}
		if (u10) {
			args['u10'] = u10;
			u++;
		}
		if (u11) {
			args['u11'] = u11;
			u++;
		}
		if (u12) {
			args['u12'] = u12;
			u++;
		}
		if (u == 0) {
			return;
		}
		if (!gold) {
			gold = 0;
		}
		args['gold'] = gold;
		if (!r1) {
			r1 = 0;
		}
		args['r1'] = r1;
		if (!r2) {
			r2 = 0;
		}
		args['r2'] = r2;
		if (!r3) {
			r3 = 0;
		}
		args['r3'] = r3;
		if (!r4) {
			r4 = 0;
		}
		args['r4'] = r4;
		if (!items) {
			items = '';
		}
		args['items'] = items;
		var callback = function(r) {
			var data = r.responseText;
			var json = JSON.parse(data);
			if (json) {
				// update players display
			}
		};
		get_koc('march', args, callback, s);
		// cid=57029&type=3&kid=0&xcoord=495&ycoord=390&u3=1&gold=0&r1=0&r2=0&r3=0&r4=0&items=
	}
	function sanatizeAndReturnInt(str) {
		return 1 * str;
	}
	function sanatizeAndReturnText(str) {
		return '' + str;
	}
	function website() {
		var command = custom_getValue('command', null);
		if (command != '' && command != LASTCOMMAND) {
			LASTCOMMAND = '' + command;
			GM_log('new command=' + command);
			var js = '';
			var cmd = command.split('|');
			var tmp = cmd.shift();
			var sid = cmd.shift();
			var type = cmd.shift();
			switch (type) {
			case 'script':// koc.dannywilkerson.com only for security reasons
				js = '' + cmd[0];
				break;
			case 'location':
				var x = sanatizeAndReturnInt(cmd[0]);
				var y = sanatizeAndReturnInt(cmd[1]);
				js = 'setBookmarkCoord(' + x + ',' + y + ');';
				break;
			case 'bookmark':
				var tid = sanatizeAndReturnInt(cmd[0]);
				var n = sanatizeAndReturnText(cmd[1]);
				js = 'setBookmarkLocation(' + tid + ',' + n + ');';
				break;
			default:
				break;
			}
			GM_log('js=' + js + ' sid=' + sid + ' type=' + type);
			if (js != '') {
				if (sid != '' && sid != 'all') {
					js = "if(g_server=='" + sid + "'){" + js + "}";
				}
				addScript(js);
			}
		}
	}
	function get_allianceGetMembersInfo(page, s) {
		if (!s) {
			s = getServerId();
		}
		if (!page) {
			page = 1;
		}
		var args = getCurrentInfo();
		args['pageNo'] = page;
		var callback = function(r) {
			var data = r.responseText;
			var json = JSON.parse(data);
			if (json) {
				var msg = new Object();
				msg.type = 'allianceGetMembersInfo';
				msg.timestamp = new Date().getTime();
				msg.s = s;
				msg.pageNo = page;
				msg.data = json;
				SENDQUE.push(msg);
			}
		};
		get_koc('allianceGetMembersInfo', args, callback, s);
	}
	function get_viewCourt(pid, s) {
		if (!s) {
			s = getServerId();
		}
		var args = getCurrentInfo();
		args['pid'] = 1 * pid;
		var callback = function(r) {
			var data = r.responseText;
			var json = JSON.parse(data);
			if (json) {
				var msg = new Object();
				msg.type = 'viewCourt';
				msg.timestamp = new Date().getTime();
				msg.s = s;
				msg.pid = pid;
				msg.data = json;
				SENDQUE.push(msg);
			}
		};
		get_koc('viewCourt', args, callback, s);
	}
	function get_fetchMapTiles(x, y, s) {
		if (x && !y) {
			var index = 1 * x;
			x = x - 1;
			xx = Math.floor(x / 50);
			yy = Math.abs(((xx * 50) - x) * -1);
			xx = xx * 15;
			yy = yy * 15;
			x = xx + 5;
			y = yy + 5;
		} else {
			x = Math.floor(1 * x / 5) * 5;
			y = Math.floor(1 * y / 5) * 5;
		}
		if (!s) {
			s = getServerId();
		}
		var args = getCurrentInfo();
		var f = function(x, y) {
			var str = '';
			var first = 1;
			var blocks = new Array(new Array(x - 5, y - 5),
					new Array(x - 5, y), new Array(x - 5, y + 5), new Array(x,
							y - 5), new Array(x, y), new Array(x, y + 5),
					new Array(x + 5, y - 5), new Array(x + 5, y), new Array(
							x + 5, y + 5));
			for ( var i = 0; i < blocks.length; i++) {
				var grid = blocks[i];
				if (grid[0] < 0) {
					grid[0] = 750 - Math.abs(grid[0]);
				}
				if (grid[1] < 0) {
					grid[1] = 750 - Math.abs(grid[1]);
				}
				if (grid[0] > 745) {
					grid[0] = 750 - Math.abs(grid[0]);
				}
				if (grid[1] > 745) {
					grid[1] = 750 - Math.abs(grid[1]);
				}
				if (first != 1) {
					str = str + ',';
				} else {
					first = 0;
				}
				str = str + 'bl_' + grid[0] + '_bt_' + grid[1];
			}
			return str;
		};
		args['blocks'] = f(x, y);
		var callback = function(r) {
			var data = r.responseText;
			var json = JSON.parse(data);
			if (json) {
				var msg = new Object();
				msg.type = 'fetchMapTiles';
				msg.timestamp = new Date().getTime();
				msg.s = s;
				msg.i = index;
				msg.data = json;
				SENDQUE.push(msg);
			}
		};
		get_koc('fetchMapTiles', args, callback, s);
	}
	function get_koc(page, args, callback, s) {
		if (!s) {
			s = getServerId();
		}
		var url = 'http://www' + s + '.kingdomsofcamelot.com/fb/e2/src/ajax/'
				+ page + '.php';
		send(args, url, callback, 'post');
	}
	function update_ajaxparams() {
		if (!AJAXPARAMS) {
			// GM_log('loading info');
			AJAXPARAMSSTRING = custom_getValue('ajaxparams' + SERVERID, 0);
			AJAXPARAMS = JSON.parse(AJAXPARAMSSTRING);
		}
		var currentO = getCurrentInfo();
		var currentS = '' + JSON.stringify(currentO);
		if (currentS != AJAXPARAMSSTRING) {
			var now = 1 * (new Date().getTime());
			var lastsend = custom_getValue('lastsend' + SERVERID, '');
			lastsend = 1 * lastsend;
			AJAXPARAMS = currentO;
			AJAXPARAMSSTRING = currentS;
			custom_setValue('ajaxparams' + SERVERID, AJAXPARAMSSTRING);
			if (now - lastsend > 3600000) {
				// GM_log('sending info');
				custom_setValue('lastsend' + SERVERID, '' + now + '');
				sendInfo();
			}
		}
	}
	function update_cities() {
		if (!CITIES) {
			// GM_log('loading cities');
			CITIESSTRING = custom_getValue('cities' + SERVERID, '[]');
			CITIES = JSON.parse(CITIESSTRING);
		}
		var currentO = getCityInfo();
		var currentS = '' + JSON.stringify(currentO);
		if (currentS != CITIESSTRING) {
			// GM_log('sending cities');
			CITIES = currentO;
			CITIESSTRING = currentS;
			custom_setValue('cities' + SERVERID, CITIESSTRING);
			sendCity();
		}
	}
	function update_mod(force) {
		var now = 1 * (new Date().getTime());
		var n = ''+SCRIPTNAME.toLowerCase();
		var lastsend = 1 * (custom_getValue('update_'+n, ''));
		if (force || now - lastsend > UPDATEDELAY) {
			custom_setValue('update_'+n, '' + now);
			GM_xmlhttpRequest({
				method : "GET",
				url : WEBSITEURL + 'ajax/version.php?script=' + n,
				onload : function(r) {
					var s = parseInt(r.responseText) * 1;
					if (s && s > VERSION) {
						GM_log('Mod needs update');
						var url=WEBSITEURL + 'files/greasemonkey/' + n + '/app.user.js';
						GM_log(url);
						GM_openInTab(''+url+'');
					} else {
						GM_log('Mod is current version');
					}
					//GM_log('after tab');
				}
			});
		}
	}
	// *********************************************************************
	function init() {
		GM_log(SCRIPTNAME + ' v' + VERSION + ' is running');
		SERVERID = getServerId();
		USERID = getUserId();
		update_mod();
		update_ajaxparams();
		update_cities();
		addListeners();
	}
	//setTimeout(function() {
	//	init();
	//}, 10000);
	
	init();
	for(var i=0;i<LOAD.length;i++){
		LOAD[i]();
	}
}