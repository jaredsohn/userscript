// ==UserScript==
// @name           LoU Raid Calc
// @description    Raid calculation for Lord Of Ultima
// @namespace      raidcalc.lou.erdos.kz
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.0.7
// @require http://sizzlemctwizzle.com/updater.php?id=114375&days=1
// ==/UserScript==

(function(){

var AP_mainFunction = function() {

	function createAutoPilot() {
		var AutoPilot = {};
		var AP = {};
		
		qx.Class.define("AutoPilot.main", {
			type: "singleton",
			extend: qx.core.Object,
			members: {
				app: null,
				cBar: null,
				cInfoView: null,
				bQc: null,
				bQh: null,

				city: null,
				cityId: null,
				
				timeOfChangeTarget: null,
				timer: null,
				
				initialize: function() {
					this.app = qx.core.Init.getApplication();

					this.cInfoView = this.app.cityInfoView;
					this.bQc = this.cInfoView.buildingQueue;
					this.bQh = this.bQc.header;
					this.cBar = this.app.cityBar;
					
					this.tweakLoU();
				},
				tweakLoU: function() {
					_AP = AP;
					AP.debug = this.debug;
					AP.a = this.app;
					AP.main = this;
					
					AP.debug("RaidCalc: initialization");
					
					AP.main.timer = setInterval(function () {
						if (AP.main.timeOfChangeTarget != null) {
							var currentTime = new Date();
							var delta = currentTime - AP.main.timeOfChangeTarget;
							if (delta > 1000) {
								var cgi = webfrontend.data.City.getInstance();
								if (cgi != null) {
									var sendArmyWidget = AP.a.sendArmyWidget;
									if (sendArmyWidget != null) {
										var targetCity = sendArmyWidget.targetCity;
										if (targetCity != null) {
											var targetCityValue = targetCity.getValue();
											if (targetCityValue != null) {
												var __Pg = targetCity.getValue().__Pg;
												if (__Pg != null) {
													 
													var level = __Pg[1];
													
													needUnit = {
														1: 50,
														2: 100,
														3: 350,
														4: 1500,
														5: 3000,
														6: 6500,
														7: 14000,
														8: 19000,
														9: 35000,
														10: 60000
													}
													
													raidable = ["3", "4", "5", "6", "7", "9", "10", "11", "12", "16", "17"];
													//Ranger, Guardian, Templar, Berserker, Mage, Crossbowman, Paladin, Knight, Warlock, Sloop, War Galleon
													var unitsInCity = cgi.getUnits();
													var unitsToOrder = sendArmyWidget.units;
													for (var i in unitsInCity) {
														if (raidable.indexOf(i) != -1 && unitsInCity[i] != null && unitsToOrder[i] != null) {
															var countUnit = Math.min(needUnit[level], unitsInCity[i].count);
															//AP.debug("unit type " + i + " need " + countUnit + " on level " + level);
															unitsToOrder[i].sendCount.setValue(countUnit);
														} else {
															AP.debug("not sended unit type " + i + " unitsInCity[i]=" + unitsInCity[i] + " unitsToOrder[i]=" + unitsToOrder[i]);
														}
														
													}
												}
											}
										}
									}
								}
								AP.main.timeOfChangeTarget = null;
							}
						}
					}, 1000); 
					
					if (this.app.showSendArmy()) {
						
						sendArmyWidget = this.app.sendArmyWidget;
						targetCityXInput = sendArmyWidget.targetCityXInput;
						//sendArmyWidget.addListener("appear",  function() {AP.main.timeOfChangeTarget = (new Date() + 1000)}, this);
						targetCityXInput.addListener("changeValue",  function () {AP.main.timeOfChangeTarget = new Date()}, this);
						sendButton = sendArmyWidget.sendButton;
						sendButton.addListener("execute",  function () {AP.main.timeOfChangeTarget = new Date()}, this);
						
						sendArmyWidget.hide();
					}
					AP.debug("RaidCalc: end of initialization");
				},
				
				
				debug: function(s) {
					if (typeof console != 'undefined') console.log(s);
					else if (window.opera) opera.postError(s);
					else GM_log(s);
				}
			}
		});
		
	}
	
	
	function AP_checkIfLoaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					createAutoPilot();
					window.AutoPilot.main.getInstance().initialize();
				} else
					window.setTimeout(AP_checkIfLoaded, 1000);
			} else {
				window.setTimeout(AP_checkIfLoaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(AP_checkIfLoaded, 1000);
			
}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var AutoPilotScript = document.createElement("script");
		txt = AP_mainFunction.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g,"&lt;"); // rofl Opera
		AutoPilotScript.innerHTML = "(" + txt + ")();";
		AutoPilotScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(AutoPilotScript);


})();