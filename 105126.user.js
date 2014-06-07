// ==UserScript==
// @name           Legion GM Tweaks
// @description    Legion tools for LOU
// @namespace      Lego
// @author         Kkobold
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.1a 
// ==/UserScript==
// from BoS - http://userscripts.org/scripts/show/84343
(function () {

	var main = function () {
			var DEBUG_VERSION = true;			
			qx.Class.define("lego.Const", {
				statics: {
					MIN_SEND_COMMAND_INTERVAL: 500,
					DEBUG: true
				}
			});
			qx.Class.define("lego.net.CommandManager", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					this._sendTimer = new qx.event.Timer(lego.Const.MIN_SEND_COMMAND_INTERVAL);
					this._sendTimer.addListener("interval", this.sendPendingCommand, this);
					this._sendTimer.start();
				},
				properties: {
					lastSendCommand: {
						init: 0
					}
				},
				members: {
					_toSend: [],
					_sendTimer: null,
					sendCommand: function (endPoint, request, context, onSendDone, extraValue) {
						var now = (new Date()).getTime();
						if (now - this.getLastSendCommand() >= lego.Const.MIN_SEND_COMMAND_INTERVAL) {
							this.forcedSendCommand(endPoint, request, context, onSendDone, extraValue);
						} else {
							this._toSend.push({
								endPoint: endPoint,
								request: request,
								context: context,
								onSendDone: onSendDone,
								extraValue: extraValue
							});
						}
					},
					forcedSendCommand: function (endPoint, request, context, onSendDone, extraValue) {
						var now = (new Date()).getTime();
						webfrontend.net.CommandManager.getInstance().sendCommand(endPoint, request, context, onSendDone, extraValue);
						this.setLastSendCommand(now);
					},
					sendPendingCommand: function () {
						if (this._toSend.length > 0) {
							var o = this._toSend[0];
							this._toSend.splice(0, 1);
							this.forcedSendCommand(o.endPoint, o.request, o.context, o.onSendDone, o.extraValue);
						}
					},
					poll: function (requests, callbackArg) {
						this.requestCounter = 0;

						var updateManager = webfrontend.net.UpdateManager.getInstance();

						var data = new qx.util.StringBuilder(2048);
						data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', qx.util.Json.stringify(requests), "}");
						updateManager.requestCounter++;

						var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
						req.setProhibitCaching(false);
						req.setRequestHeader("Content-Type", "application/json");
						req.setData(data.get());
						req.setTimeout(10000);
						req.addListener("completed", function (e) {
							this.completeRequest(e, callbackArg);
						}, this);
						req.addListener("failed", this.failRequest, this);
						req.addListener("timeout", this.timeoutRequest, this);
						req.send();
					},
					completeRequest: function (e, cityId) {

						if (e.getContent() == null) return;

						for (var i = 0; i < e.getContent().length; i++) {
							var item = e.getContent()[i];
							var type = item.C;
						}
					},
					failRequest: function (e) {

					},
					timeoutRequest: function (e) {

					}
				}
			});
			window.setTimeout(legoCheckIfLoaded, 1000);

			function legoCheckIfLoaded() {
				if ( /*qx.$$domReady == */ true) {
					a = qx.core.Init.getApplication();
					if (a && a.chat && a.cityInfoView && a.title.reportButton) {
						lego.tools.getInstance().startup();
					} else window.setTimeout(legoCheckIfLoaded, 1000);
				} else {
					window.setTimeout(legoCheckIfLoaded, 1000);
				}
			}
			// /from BoS
			
			qx.Class.define("lego.tools", {
				type: "singleton",
				extend: qx.core.Object,
				members: {
					_playerAlliance: null ,
					_playerName: null,
					_playerId: null,
					_server: 'http://adust.dlinkddns.com:8182/jsonp/',
					_checkAlliance: null, // should i update my alliance?
					_recheckAlliance: null, // should i send the updated version?
					startup: function () {						
						lego.net.CommandManager.getInstance().sendCommand("GetPlayerInfo", {}, this, this.definePlayerInfo);
						this.checkAllianceTimer = new qx.event.Timer(360000);
						this.checkAllianceTimer.addListener("interval", this.checkAlliance, this);	
						this.checkAllianceTimer.start();
					},
					checkAlliance: function (){
						console.log("LoU Lego: contacting the external server...");
						murl = this._server + "check.php";
							$.ajax({
							  url: murl,
							  data: {'alliance': this._playerAlliance},
							  dataType: 'jsonp'							  
						});		
						console.log("LoU Lego: done!");						
					},
					definePlayerInfo: function (isOk, result) {
						if (isOk == false || result == null) {
							GM_log("LoU Lego: ops, can't get player info!");
							return;
						}
						console.log("LoU Lego: I'm game!");
						this._playerAlliance = result.AllianceName;	
						this._playerName = result.Name;
						this._playerId = result.Id;
							
						lego.Const.playerId = result.Id;
						lego.Const.playerName = result.Name;
						console.log("LoU Lego: I'm "+ this._playerName + "("+this._playerId+") from " + this._playerAlliance +".");
					}
				}
			});
		}

	window.setTimeout(checkIfShouldInjectLegoScript, 1000);

	function checkIfShouldInjectLegoScript() {
		var loadingScreen = document.getElementById("loadingscreen");
		if (loadingScreen) {
			if (loadingScreen.style.display == "block") {
				GM_log("LoU Lego: waiting");
				window.setTimeout(checkIfShouldInjectLegoScript, 1000);
			} else {
				GM_log("LoU Lego: end of waiting");
				injectLegoScript();
			}
		} else {
			injectLegoScript();
		}
	}

	function injectLegoScript() {
		GM_log("Injecting LoU Lego script");
		var script = document.createElement("script");
		script.innerHTML = "(" + main.toString() + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
		var script = document.createElement("script");
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);		
		GM_log("LoU Lego: dude, im up!");
	}

})();