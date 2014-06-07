// ==UserScript==
// @name        Flunik Tools
// @namespace   FlunikTools
// @description Mirror Army, Auto Level
// @version     0.5.0
// @author      Flunik
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

(function (){
	var FlunikTools_main =  function() {
		try {
			function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}
			
			function createFlunikTools() {
				console.log('FLUNIKTOLS createFlunikTools');
				
				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						AutoUpdateButton : null,
						
						
						autoUpdateHandle : null,

						
						initialize: function() {
						
							console.log('FLUNIKTOLS initialize');
							AutoUpdateButton = new qx.ui.form.Button("Toggle Autoupdate", null).set({
								toolTipText: "Autoupdate",
								width: 100,
								height: 40,
								maxWidth: 100,
								maxHeight: 40,
								appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							
							
							
							AutoUpdateButton.addListener("click", function(e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().stopAutoUpdate();
									AutoUpdateButton.setLabel("B.OFF");
								} else {
									window.FlunikTools.Main.getInstance().startAutoUpdate();
									AutoUpdateButton.setLabel("B.ON");
								}
							}, this);
						
							
						
						
							var app = qx.core.Init.getApplication();

							app.getDesktop().add(AutoUpdateButton, {
								right: 120,
								bottom: 100
							});					
									
						},
						
						
						
						
						
						startAutoUpdate : function() {
							//var _this = window.FlunikTools.Main.getInstance();
							this.autoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.autoUpgrade(), 60000);
						},
						stopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},


						autoUpgrade : function() {
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								//var buildings = city.get_Buildings();
								console.log(city);

								for (var nBuildings in buildings.d) {
									var building = buildings.d[nBuildings];
									
								}//building loop
							  
								var units = city.get_CityUnitsData();
								var offenceUnits = units.get_OffenseUnits();
								for (var nUnit in offenceUnits.d) 
								{
									var unit = offenceUnits.d[nUnit];
									
								}//off loop

								var defenceUnits = units.get_DefenseUnits();
								for (var nUnit in defenceUnits.d) 
								{
									var unit = defenceUnits.d[nUnit];
									
								}//def loop
							}//city loop
						}
					}
				});
			}
		} catch (e) {
			console.log("createFlunikTools: ", e);
		}
		
		function FlunikTools_checkIfLoaded() {
			try {
			if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					createFlunikTools();
					window.FlunikTools.Main.getInstance().initialize();
				} else {
					window.setTimeout(FlunikTools_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("FlunikTools_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(FlunikTools_checkIfLoaded, 1000);
		}
	}
		
	try
	{
		var FlunikScript = document.createElement("script");
		FlunikScript.innerHTML = "(" + FlunikTools_main.toString() + ")();";
		FlunikScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(FlunikScript);
		}
	} catch (e) {
		console.log("FlunikTools: init error: ", e);
	}
})();