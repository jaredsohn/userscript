// ==UserScript==
// @name           LoU Notifier
// @description    notifies about attack on alliance using HTML5 notification technology
// @author         Yurii Korotia <y.korotia[o_0]hotmail.com>
// @namespace      yk_notifier
// @include        http://*.lordofultima.com/*/index.aspx
// @version        0.1.4
// @license        GPL v3
// @run-at         document-end
// ==/UserScript==

(function(){

	var yk_notifier = function() {

		// workaround for new notification standard - we use only 1 window
		var current_notification = null;
		var html5 = { notification: window.webkitNotifications };

		var langs = {
			en: {
				notifier : 'Notifier', on : 'On', off: 'Off', not_supported: 'Not Supported',
				attack: 'attack', attacks: 'attacks', on_your_alliance: 'on your alliance'
			}
		};
		
		var example_raw_attacks =
			[{"C":"ALL_AT",
				"D":{"v":1,"a":[
					{"i":0,"t":0,"ss":0,"es":0,"s":0,"c":0,"cn":"","p":0,"pn":"","a":0,"an":"","ta":0,
						"td":0,"tc":0,"tcn":"","tp":1180,"tpn":"SilenusMert","cp":0,"ds":964094,
						"b":false,"m":false,"ms":0,"thc":true},
					{"i":0,"t":0,"ss":0,"es":0,"s":0,"c":0,"cn":"","p":0,"pn":"","a":0,"an":"","ta":0,
						"td":0,"tc":0,"tcn":"","tp":1180,"tpn":"SilenusMert 2222","cp":0,"ds":964094,
						"b":false,"m":false,"ms":0,"thc":true}]}
			}]; // example TODO: demo

		var config = {
			language: 'en',
			run_mode: 'release', // release | debug (debug will use test data but still send requests)
			error_level_log: 2, // max error lvl to log
			qx_check_delay: 400, // delay between QX check, in ms
			qx_request_timeout: 5000, // wait time before timeout, in ms

			notify_icon: 'http://prodcdngame.lordofultima.com/cdn/382540/resource/webfrontend/townlayer/building_townhall.png',
			notify_status: 'On',// On | Off | Not Supported
			//
			// inits configuration from local storage
			//
			init: function () {
				var n = localStorage.getItem('yk_notifier:notify_status');
				if (n == null || (n != 'On' && n != 'Off')) {
					this.setNotifyStatus(this.notify_status); // set default
				} else {
					this.setNotifyStatus(n);
				}
				//TODO add other config
			},
			getNotifyStatus: function () {
				return this.notify_status;
			},
			setNotifyStatus: function (status) {
				localStorage.setItem('yk_notifier:notify_status', status);
				this.notify_status = status;
				debug._log('setNotifyStatus(): ' + status, debug.levels.debug);
			}
		};

		var debug = {
			levels: { fatal_error: 0, error: 1,	warning: 2,	notice: 3, info: 4,	debug: 5 },
			_log: function (message, debug_level) {// writes to console
				if (debug_level > config.error_level_log) {
					return;
				}
				if (message instanceof Object || message instanceof Array) {
					console.log('LOU_NOTIFIER: ');
					console.log(message);
				} else {
					console.log('LOU_NOTIFIER: ' + message);
				}
			}
		};


		// array of attack object
		function showNotification (attacks)
		{
			try {
				debug._log(attacks, debug.levels.debug);

				var title = 'LoU: ' + attacks.length + ' ' +
					(attacks.length > 1 ? langs[config.language].attacks : langs[config.language].attack) +
					' ' + langs[config.language].on_your_alliance;
					
				var first = true;
				var msg = '';
				for (var i = 0; i < attacks.length; i++) {
					if (first) {
						first = !first;
					} else {
						msg += ', ';
					}
					//def_city_name		tcn,
					//def_city_coord	cn
					//def_pl_name		tpn
					//atk_city_name		cn,
					//atk_pl_name		pn
					//atk_type			t
					//atk_ts			ta
					//def_ts			td
					var def_pl_name = attacks[i].tpn;
					var atk_pl_name = (attacks[i].pn == '' ? '?' : attacks[i].pn);
					var def_TS = attacks[i].td - attacks[i].ta;
					
					if (def_TS == 0) {
						def_TS = '?';
					} else if (attacks[i].td > 0 && attacks[i].ta == 0) {
						def_TS = attacks[i].td + '- ?';
					} else if (attacks[i].td == 0 && attacks[i].ta > 0) {
						def_TS = '?-' + attacks[i].ta;
					}
					
					// def_pl_name(atk_pl_name|atk_ts - def_ts), ...
					msg += def_pl_name + ' [' + atk_pl_name + ',' + def_TS + ']';
				}

				if (current_notification != null) {
					current_notification.close();
				}

				current_notification =
					html5.notification.createNotification(config.notify_icon, title, msg);
				current_notification.show();

				debug._log(current_notification, debug.levels.debug);
				debug._log('Notification was created', debug.levels.info);
			} catch (e) {
				debug._log(e, debug.levels.error);
			}
		}

		//
		//
		//
		function toggleNotifyStatus (e)
		{
			var notify_status = config.getNotifyStatus();
			var notify_status_new = (notify_status == 'On' ? 'Off' : 'On');
			config.setNotifyStatus(notify_status_new);
			this.setValue(btn_getValue());
			debug._log('toggleNotifyStatus(): ' + notify_status + ' --> ' + notify_status_new, debug.levels.debug);
		}

		//
		//
		function btn_getValue()
		{
			var tpl = '<span style="color:#fff; font-weight:700; line-height:20px">' +
				langs[config.language].notifier + '&nbsp;&nbsp;&nbsp;{STATUS}</span>';
			var v = '';
			switch (config.getNotifyStatus()) {
				case 'On':
					v = tpl.replace('{STATUS}', '<span style="color:green">'+langs[config.language].on+'</span>');
					break;
				case 'Off':
					v = tpl.replace('{STATUS}', '<span style="color:red">'+langs[config.language].off+'</span>');
					break;
				case 'Not Supported':
					v = tpl.replace('{STATUS}', '<span style="color:yellow">'+langs[config.language].not_supported+'</span>');
					break;
			}
			return v;
		}

		// copied from LoU BoS (http://userscripts.org/scripts/review/84343)
		// with some modifications
		function pollIncomingAttacks ()
		{
			try {
				debug._log('pollIncomingAttacks()', debug.levels.info);

				var updateManager = webfrontend.net.UpdateManager.getInstance();

				if (config.getNotifyStatus() != 'On') {
					debug._log('Skipped. Notifications are disabled', debug.levels.info);
					return;
				}

				var data = {
					sender: 'yk_notifier',
					session: updateManager.getInstanceGuid(),
					requestid: updateManager.requestCounter++,
					requests: 'ALL_AT:b\f'
				};
				var url = updateManager.getUpdateService() + '/Service.svc/ajaxEndpoint/Poll';
				var req = new qx.io.remote.Request(url, 'POST', 'application/json');
				req.setProhibitCaching(false);
				req.setRequestHeader("Content-Type", "application/json");
				req.setData(qx.lang.Json.stringify(data));
				req.setTimeout(config.qx_request_timeout);
				req.addListener("completed", function(e) {
					try {
						debug._log('Completed', debug.levels.debug);
						var raw = e.getContent();

						if (config.run_mode == 'debug') {
							raw = example_raw_attacks;
						}

						if (raw == null) {
							return;
						}

						debug._log(raw, debug.levels.debug);

						for (var i = 0; i < raw.length; i++) {
							if (raw[i].C == "ALL_AT" && raw[i].D != null) {
								showNotification(raw[i].D.a);
								break;// exit loop
							}
						}
					} catch (e) {
						debug._log(e, debug.levels.error);
					}
				});
				req.addListener("failed", function (e) {
					debug._log('Request failed', debug.levels.error);
					debug._log(e, debug.levels.error);
				});
				req.addListener("timeout", function (e) {
					debug._log('Request timeout', debug.levels.error);
					debug._log(e, debug.levels.error);
				});
				req.send();

			} catch (e) {
				debug._log(e, debug.levels.error);
			}
		}

		//
		// main entry point for our plugin
		//
		function init()
		{
			debug._log('Init() has started', debug.levels.info);

			try {
				config.init();

				if (!html5.notification) {
					config.setNotifyStatus('Not Supported');
					debug._log("Notifications are NOT supported by the browser", debug.levels.warning);
				} else {
					debug._log("Notifications are supported by the browser", debug.levels.info);
					if (html5.notification.checkPermission() != 0) {
						html5.notification.requestPermission();
						debug._log('Notification permission request was sent', debug.levels.notice);
					} else {
						debug._log('Notification permission was granted', debug.levels.info);
					}
				}

				var btn_on_off = new qx.ui.basic.Label(btn_getValue());
				btn_on_off.setRich(true);
				btn_on_off.setCursor('pointer');
				qx.core.Init.getApplication().getRoot()
					.add(btn_on_off, {left: 960, top: 38}); // under shop

				debug._log('Navigation link was added', debug.levels.info);

				if (config.getNotifyStatus() != 'Not Supported') {
					btn_on_off.addListener.call(btn_on_off, 'click', toggleNotifyStatus);
				}

				// listen on attack amount change and poll attack list then
				qx.core.Init.getApplication().title.allianceAttackLabel
					.addListener('changeValue', pollIncomingAttacks);
			} catch (e) {
				debug._log(e, debug.levels.fatal_error);
			}
		}

		//
		// checks if qx initialised
		//
		function checkQX () {
			try {
				debug._log('CheckQX()', debug.levels.debug);
				if (typeof qx != 'undefined') {
					debug._log('QX is loaded', debug.levels.debug);
					if (qx.core.Init.getApplication() && qx.core.Init.getApplication().title) {
						debug._log('Application is loaded', debug.levels.info);
						init();
					} else {
						debug._log('Application is not loaded', debug.levels.debug);
						window.setTimeout(checkQX, config.qx_check_delay);
					}
				} else {
					debug._log('QX is not loaded', debug.levels.debug);
					window.setTimeout(checkQX, config.qx_check_delay);
				}
			} catch (e) {
				debug._log(e, debug.levels.fatal_error);
			}
		}//checkQX

		checkQX();

	}; // yk_notifier

		
	if (/lordofultima\.com/i.test(document.domain))
	{
		console.log('injection of Lou Notifier');
		var s = document.createElement('script');
		s.innerHTML = "(" + yk_notifier.toString() + ")();";
		s.type = "text/javascript";
		s.id = "yk_notifier";
		document.getElementsByTagName("head")[0].appendChild(s);
	}

})(); // end wrapper

