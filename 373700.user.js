// ==UserScript==
// @name			Tiberium Alliances Autopilot - German [de-DE] 
// @namespace		FlunikTools
// @include			http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description		Autoupgrade deiner Basen, script based on FlunikTools
// @version			1.0
// @authors			many others and Chillchef 
// @grant			none
// @icon			http://eaassets-a.akamaihd.net/cncalliancesweb/static/2.1/theme/cca-home-redux-theme/images/global/logo.png

// @updateURL		https://userscripts.org/scripts/source/373700.meta.js
// @downloadURL		https://userscripts.org/scripts/source/373700.user.js
// ==/UserScript==

(function (){
	var FlunikTools_main =  function() {
		try {
			/*function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}*/
			
			function createFlunikTools() {
				console.log('FLUNIKTOOLS createFlunikTools');
				
				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						button : null,
						popup : null,
						AutoUpdateButton : null,
						BuildingsButton : null,
						DefenseButton : null,
						OffenseButton : null,
						autoUpdateHandleBuilding : null,
						autoUpdateHandleDefense : null,
						autoUpdateHandleOffense : null,
						sperre : false,
						ugZeit : 2000, //zeitintervall f. upgrades
						AautoUpdateHandle : null,
						autoUpgradePopup : null,
						FehlerWindow : null,
						tabview : null,
						liste : null,
						listbox : null,
						timer : false,
						startzeit : null,
						upgradeAuswahl : null,
						meldungArr : null,
						meldungText : "",
						p : 0, /*kraftwerk*/
						f : 0,
						g : 0, /*welt*/
						h : 0, /*Tiberium*/
						h1 : 0,/*Kristall*/
						r : 0, /*Raffinerie*/
						s : 0, /*Silo*/
						a : 0, /*Akku*/
						x : 0, /*ressi*/
						y : 1, /*welt*/
						z : 0.293, /*welt*/
						geb: 0,
						def : 0,
						off : 0,
						einaus : 0,
						//letzteAUGs : 0,
						upgradeCount : 0,
						realUpgradeCount : 0,
						listboxstring : "",
						rangstart : 0,
						rangAllyStart : 0,
						objektcount : 0,
						

						
						initialize: function() {
							var _this = window.FlunikTools.Main.getInstance();
						
							console.log('FLUNIKTOOLS initialize start');
							_this.startzeit = new Date();
							console.log('startzeit: ' + _this.startzeit.toLocaleTimeString() + ' Uhr');
							
							_this.listbox = new qx.ui.form.TextArea().set({readOnly: true, height: 200, width: 470});
							
							_this.upgradeAuswahl = new Array();
							_this.meldungArr = new Array();
							
							BuildingsButton = new qx.ui.form.Button("Gebäude AUS", null).set({
								toolTipText: "nur Gebäude upgraden",
								width: 110,
								height: 30,
								maxWidth: 110,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,
								
							});
							
							DefenseButton = new qx.ui.form.Button("Verteidigung AUS", null).set({
								toolTipText: "nur Verteidigung upgraden",
								width: 110,
								height: 30,
								maxWidth: 110,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,
								
							});
							
							OffenseButton = new qx.ui.form.Button("Angriff AUS", null).set({
								toolTipText: "nur Offensive upgraden",
								width: 110,
								height: 30,
								maxWidth: 110,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,
								
							});
							CommandBuildingChoice = new qx.ui.form.Button("Nur Ressis AUS", null).set({
								toolTipText: "Ermöglicht, nur Resourcen upzugraden,Hauptgebäude wie Bauhof, Vz, Ve usw werden ausgelassen",
								width: 110,
								height: 30,
								maxWidth: 110,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,
								
							});
							worldResBuildingChoice = new qx.ui.form.Button("Welt: NEU", null).set({
								toolTipText: "Neu = Sammler-lastig, Alt = Kraftwerks-lastig",
								width: 110,
								height: 30,
								maxWidth: 110,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,
								
							});
							//PowerBuildingChoice = new qx.ui.form.Button("Kraftw AUS", null).set({
							//	toolTipText: "P = 0 stoppt Kraftwerks-upgrading, P = 1 erlaubt Kraftwers-upgrading",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							PowerBuildingChoice = new qx.ui.form.CheckBox("Kraftw AUS");
							
							//HarvBuildingChoice = new qx.ui.form.Button("Tiberium AUS", null).set({
							//	toolTipText: "P = 0 stoppt Tib-Sammler-upgrading, P = 1 erlaubt Tib-Sammler-upgrading",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							HarvBuildingChoice = new qx.ui.form.CheckBox("Tiberium AUS");
							
							//Harv1BuildingChoice = new qx.ui.form.Button("Kristall AUS", null).set({
							//	toolTipText: "P = 0 stoppt Kristallsammler-upgrading, P = 1 erlaubt Kristallsammler-upgrading",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							Harv1BuildingChoice = new qx.ui.form.CheckBox("Kristall AUS");
							
							//RefBuildingChoice = new qx.ui.form.Button("Raffis AUS", null).set({
							//	toolTipText: "P = 0 stoppt Raffinerie-upgrades, P = 1 erlaubt Raffinerie-upgrades",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							RefBuildingChoice = new qx.ui.form.CheckBox("Raffis AUS");
							
							//SiloBuildingChoice = new qx.ui.form.Button("Silos AUS", null).set({
							//	toolTipText: "P = 0 stoppt Silo-upgrades, P = 1 erlaubt Silo-upgrades",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							SiloBuildingChoice = new qx.ui.form.CheckBox("Silos AUS");
							
							//AccBuildingChoice = new qx.ui.form.Button("Akkus AUS", null).set({
							//	toolTipText: "P = 0 stoppt Akku-upgrading, P = 1 erlaubt Akku-upgrading",
							//	width: 90,
							//	height: 30,
							//	maxWidth: 90,
							//	maxHeight: 30,
							//	appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
							//	center: true,
							//});
							
							AccBuildingChoice = new qx.ui.form.CheckBox("Akkus AUS");
							
							
							
							_this.autoUpgradePopup = new qx.ui.window.Window("Autopilot").set({
								contentPadding : 5,
								appearance : "window",
								showMinimize : false,
								showMaximize : false,
								showClose : true,
								resizable : false,
								showStatusbar : false
							});
							
							_this.FehlerWindow = new qx.ui.window.Window("Scriptfehler :(").set({
								contentPadding : 5,
								appearance : "window",
								showMinimize : false,
								showMaximize : false,
								showClose : true,
								resizable : false,
								showStatusbar : false
							});
							
							
							button = new qx.ui.form.Button("Auto-Upgrade: AUS", "http://goo.gl/Tsst0o").set({
								width: 40,
								height: 40,
								toolTipText: "Kein automatisches Upgraden aktiv",
								appearance: "button-playarea-mode-frame",
								center: true,
							});
							
							button1 = new qx.ui.form.Button("Optionen").set({
								toolTipText: "Optionen",
								width: 90,
								height: 30,
								maxWidth: 90,
								maxHeight: 30,
								appearance: ("button-standard-nod"), 
								//button-standard-nod, button-playarea-mode-red-frame, button-notif-cat, button-detailview-small, button-playarea-mode-frame, 
								center: true,
							});
							
							popup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
								  width: 120,
								  height: 30,
							      allowGrowY: false,
							      allowGrowX: false,
							      padding: 5,
							      position: "top-right"
							});
							
							popup1 = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
								  width: 120,
								  height: 30,
							      allowGrowY: false,
							      allowGrowX: false,
							      padding: 5,
							      position: "top-right"
							});

								
                            
							
							
							_this.autoUpgradePopup.addListener("beforeClose", function(e) {
								var _this = window.FlunikTools.Main.getInstance();
								_this.timer = false;
								button.setEnabled(true);
							}, this);
							
							_this.FehlerWindow.addListener("close", function(e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleBuilding != null) {
									_this.geb = 0;
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									BuildingsButton.setLabel("Gebäude AUS");
									BuildingsButton.setAppearance("button-text-small");
								} 
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleDefense != null) {
									_this.def = 0;
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									DefenseButton.setLabel("Verteidigung AUS");
									DefenseButton.setAppearance("button-text-small");
								} 
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleOffense != null) {
									_this.off = 0;
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									OffenseButton.setLabel("Angriff AUS");
									OffenseButton.setAppearance("button-text-small");
								} 
								
							}, this);
							
							BuildingsButton.addListener("click", function (e) {
							    var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleBuilding != null) {
									_this.geb = 0;
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									BuildingsButton.setLabel("Gebäude AUS");
									BuildingsButton.setAppearance("button-text-small");
								} else {
									_this.geb = 1;
									window.FlunikTools.Main.getInstance().BuildingstartAutoUpdate();
									BuildingsButton.setLabel("Gebäude AN");
									BuildingsButton.setAppearance("button-detailview-small");
								}
							}, this);
							
							DefenseButton.addListener("click", function (e) {
							    var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleDefense != null) {
									_this.def = 0;
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									DefenseButton.setLabel("Verteidigung AUS");
									DefenseButton.setAppearance("button-text-small");
								} else {
									_this.def = 1;
									window.FlunikTools.Main.getInstance().DefensestartAutoUpdate();
									DefenseButton.setLabel("Verteidigung AN");
									DefenseButton.setAppearance("button-detailview-small");
								}
							}, this);
							
							OffenseButton.addListener("click", function (e) {
							    var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().autoUpdateHandleOffense != null) {
									_this.off = 0;
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									OffenseButton.setLabel("Angriff AUS");
									OffenseButton.setAppearance("button-text-small");
								} else {
									_this.off = 1;
									window.FlunikTools.Main.getInstance().OffensestartAutoUpdate();
									OffenseButton.setLabel("Angriff AN");
									OffenseButton.setAppearance("button-detailview-small");
								}
							}, this);
							
							CommandBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.x != 0) {
									_this.x = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									CommandBuildingChoice.setLabel("Nur Ressis AUS");
									CommandBuildingChoice.setAppearance("button-text-small");
									console.log(_this.x + " normal mode");
									
								} else {
									_this.x = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									CommandBuildingChoice.setLabel("Nur Ressis AN");
									CommandBuildingChoice.setAppearance("button-detailview-small");
									console.log(_this.x + " ResOnly mode");
								}
							}, this);
							
							worldResBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									worldResBuildingChoice.setLabel("Welt: NEU");
									worldResBuildingChoice.setAppearance("button-text-small");
									_this.y = 1;
									_this.z = 0.293;
									_this.g = 0;
									console.log("_this.y "+_this.y + " _this.z " +_this.z +" new world mode" + "_this.g" + _this.g + "tibcost");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									worldResBuildingChoice.setLabel("Welt: ALT");
									worldResBuildingChoice.setAppearance("button-detailview-small");
									_this.y = 0.293;
									_this.z = 1;
									_this.g = 1;
									console.log("_this.y "+_this.y + " _this.z " +_this.z +  " old world mode"+ "_this.g" + _this.g + "powcost");
								}
							}, this);
							
							PowerBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.p != 0) {
									_this.p = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									PowerBuildingChoice.setLabel("Kraftw AUS");
									PowerBuildingChoice.setValue(false);
									
									console.log(_this.p + " Power off mode");
									
									
								} else {
									_this.p = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									PowerBuildingChoice.setLabel("Kraftw AN");
									PowerBuildingChoice.setValue(true);
									
									console.log(_this.p + " Power On mode");
									
								}
							}, this);
							
							HarvBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.h != 0) {
									_this.h = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									HarvBuildingChoice.setLabel("Tiberium AUS");
									HarvBuildingChoice.setValue(false);
									
									console.log(_this.h + " Green Harvester off mode");
									
									
								} else {
									_this.h = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									HarvBuildingChoice.setLabel("Tiberium AN");
									HarvBuildingChoice.setValue(true);
									
									console.log(_this.h + " Green Harvester On mode");
									
								}
							}, this);
							
							
							
							Harv1BuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.h1 != 0) {
									_this.h1 = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									Harv1BuildingChoice.setLabel("Kristall AUS");
									Harv1BuildingChoice.setValue(false);
									
									console.log(_this.h1 + " Blue Harvester off mode");
									
									
								} else {
									_this.h1 = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									Harv1BuildingChoice.setLabel("Kristall AN");
									Harv1BuildingChoice.setValue(true);
									
									console.log(_this.h1 + " Blue Harvester On mode");
									
								}
							}, this);
							
							RefBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.r != 0) {
									_this.r = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									RefBuildingChoice.setLabel("Raffis AUS");
									RefBuildingChoice.setValue(false);
									
									console.log(_this.r + " Refinery off mode");
									
									
								} else {
									_this.r = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									RefBuildingChoice.setLabel("Raffis AN");
									RefBuildingChoice.setValue(true);
									
									console.log(_this.r + " Refinery On mode");
									
								}
							}, this);
							
							SiloBuildingChoice.addListener("click", function (e) {
									var _this = window.FlunikTools.Main.getInstance();
									if (_this.s != 0) {
									_this.s = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									SiloBuildingChoice.setLabel("Silos AUS");
									SiloBuildingChoice.setValue(false);
									
									console.log(_this.s + " Silo off mode");
									
									
								} else {
								    _this.s = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									SiloBuildingChoice.setLabel("Silos AN");
									SiloBuildingChoice.setValue(true);
									
									console.log(_this.s + " Silo On mode");
									
								}
							}, this);
							
							AccBuildingChoice.addListener("click", function (e) {
								  var _this = window.FlunikTools.Main.getInstance();
								if (_this.a != 0) {
								    _this.a = 0;
									window.FlunikTools.Main.getInstance().OffFunction();
									AccBuildingChoice.setLabel("Akkus AUS");
									AccBuildingChoice.setValue(false);
									
									console.log(_this.a + " Accumulator off mode");
									
									
								} else {
								    _this.a = 1;
									window.FlunikTools.Main.getInstance().OnFunction();
									AccBuildingChoice.setLabel("Akkus AN");
									AccBuildingChoice.setValue(true);
									
									console.log(_this.a + " Accumulator On mode");
									
								}
							}, this);
							
							
							
							//popup.add(AutoUpdateButton, {row: 0, column: 0});
							popup.add(button1, {row: 1, column: 3});
							popup.add(worldResBuildingChoice, {row: 1, column: 1});
							popup.add(CommandBuildingChoice, {row: 1, column: 2});
							popup.add(BuildingsButton, {row: 0, column: 1});
							popup.add(DefenseButton, {row: 0, column: 2});
							popup.add(OffenseButton, {row: 0, column: 3});
							popup1.add(PowerBuildingChoice, {row: 0, column: 0});
							popup1.add(RefBuildingChoice, {row: 0, column: 1});
							popup1.add(HarvBuildingChoice, {row: 0, column: 2});
							popup1.add(Harv1BuildingChoice, {row: 0, column: 3});
							popup1.add(SiloBuildingChoice, {row: 0, column: 4});
							popup1.add(AccBuildingChoice, {row: 0, column: 5});
							
							button.addListener("click", function(e)
								{
									var _this = window.FlunikTools.Main.getInstance();
									popup.placeToMouse(e);
									//popup.show();
									_this.autoUpgradePopupOeffnen();
								}, this);
								
							button1.addListener("click", function(e)
								{
									popup1.placeToMouse(e);
									popup1.show();
								}, this);
						
							
							var app = qx.core.Init.getApplication();

													
							app.getDesktop().add(button, {
								right: 123, //right: 128,
								bottom: -3     //top: 3
							});		
							
							var counter = 0;
							var intervall = window.setInterval(RangAbrufen, 1000);
							
							function RangAbrufen() {
								
								_this.rangAllyStart = _this.AllianzRang('meinRang');
								_this.rangstart = ClientLib.Data.MainData.GetInstance().get_Player().get_OverallRank();
								counter++;
								console.info("init GLOBAL RANG: " + _this.rangstart + ", bool: " + (_this.rangstart != 0) + ", Versuche: " + counter);
								console.info("init MYALLY RANG: " + _this.rangAllyStart + ", bool: " + (_this.rangAllyStart != 0) + ", Versuche: " + counter);
								if( _this.rangstart != 0 && _this.rangAllyStart != 0){
									window.clearInterval(intervall); 
									console.log("Intervall nach " + counter + " Versuchen gestoppt");
								}
							}
							
							
						},
						
						//initialize() ENDE
						
						
						autoUpgradePopupOeffnen : function(){
							var _this = window.FlunikTools.Main.getInstance();
							_this.timer = true;
							button.setEnabled(false);
							_this.objektcount = 0;
							_this.autoUpgradePopup.setLayout(new qx.ui.layout.VBox());
							var allebasen = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							_this.tabview = null;
							_this.autoUpgradePopup.removeAll();
							var tabviewHaupt = new qx.ui.tabview.TabView().set({
								contentPadding: 0,
								appearance: "tabview",
								margin: 5,
								barPosition: "top",
							});
							
							var tabPageAUG = new qx.ui.tabview.Page("Autoupgrade", null).set({padding: 10, decorator: "pane-light-opaque"});
							tabPageAUG.setLayout(new qx.ui.layout.VBox());
							tabPageAUG.setWidth(300);
							tabPageAUG.setMaxWidth(800);
							tabviewHaupt.add(tabPageAUG);
							var tabviewZWEI = new qx.ui.tabview.Page("new stuff later", null);
							tabviewHaupt.add(tabviewZWEI);
							_this.tabview = new qx.ui.tabview.TabView().set({
								contentPadding: 0,
								maxWidth: 800,
								maxHeight: 500,
								appearance: "tabview",
								margin: 10,
								barPosition: "left"
							});
							
							//new qx.ui.layout.Flow()
							//new qx.ui.layout.Grid(5)
							//new qx.ui.container.Composite(new qx.ui.layout.VBox(6)).set({ width: 100, padding: 5, decorator: "pane-light-opaque"});
							var boxTitelA = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({margin:0, padding:2, decorator: "pane-light-opaque"});
							var lblTitelA = new qx.ui.basic.Label("Grundeinstellungen für ALLE Basen").set({ alignX: "center", alignY: "center", font: "font_size_14_bold"});
							boxTitelA.add(lblTitelA);
							
							
							var boxA = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({margin: 0, padding: 10, decorator: "pane-light-opaque"});
							var boxB = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({margin: 0, padding: 10, decorator: "pane-light-opaque"});
							var boxC = new qx.ui.container.Composite(new qx.ui.layout.HBox(20)).set({margin: 0, padding: 10, decorator: "pane-light-opaque"});
							var boxD = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({margin: 0, padding: 0});
							
							boxA.add(BuildingsButton);
							boxA.add(DefenseButton);
							boxA.add(OffenseButton);
							boxB.add(worldResBuildingChoice);
							boxB.add(CommandBuildingChoice);
							boxC.add(PowerBuildingChoice);
							boxC.add(RefBuildingChoice);
							boxC.add(HarvBuildingChoice);
							boxC.add(Harv1BuildingChoice);
							boxC.add(SiloBuildingChoice);
							boxC.add(AccBuildingChoice);
							boxD.add(boxA);
							boxD.add(boxB, { flex: 1 });
							
							
							
							
							
							for (basis in allebasen){
								var name = allebasen[basis].get_Name();
								var page =  new qx.ui.tabview.Page(name, null).set({maxWidth: 600});
								var reihe = 3;
								var spalte = 0;
								var tabpageLayout = new qx.ui.layout.Grid(5);
								var basisEinheiten = new Object();
								basisEinheiten['geb'] = new Object();
								basisEinheiten['def'] = new Object();
								basisEinheiten['off'] = new Object();
								
								page.setLayout(tabpageLayout);
								page.setPadding(10);
								page.setMargin(10);
								
								//page.setBackgroundColor("#BEC8CF");
								var allegebäude = allebasen[basis].get_Buildings().d;
								var einheiten = allebasen[basis].get_CityUnitsData();
								var offEinheiten = einheiten.get_OffenseUnits().d;
								var defEinheiten = einheiten.get_DefenseUnits().d;
								
								
								var gebäudeliste = null;
								var offEinheitenliste = null;
								var defEinheitenliste = null;
								gebäudeliste = new Array();
								offEinheitenliste = new Array();
								defEinheitenliste = new Array();
								var eintrag = 'BasisUpgrAktiv';
								var wert = true;
								for(item in _this.upgradeAuswahl[name]){
									if(item == eintrag){
										wert = _this.upgradeAuswahl[name][item][0].getValue();
									}
								}
								basisEinheiten['BasisUpgrAktiv'] = (new Array(new qx.ui.form.CheckBox("Basisupgrade Aktiv").set({value: wert, font: "font_size_14_bold"}), 99));
								page.add(basisEinheiten['BasisUpgrAktiv'][0],{row: 0, column: 0});
								basisEinheiten['BasisUpgrAktiv'][0].addListener("click", function (e) {
									for(basis in _this.upgradeAuswahl){
										var name = basis;
										for(elem in _this.upgradeAuswahl[name]){
											if(elem == 'DefAktiv'){
												_this.upgradeAuswahl[name][elem][0].setEnabled(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
												for(element in _this.upgradeAuswahl[name]['def']){
													var bool = (_this.upgradeAuswahl[name]['DefAktiv'][0].getValue() && _this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
													_this.upgradeAuswahl[name]['def'][element][0].setEnabled(bool);
												}
											}
											
											if(elem == 'OffAktiv'){
												_this.upgradeAuswahl[name][elem][0].setEnabled(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
												for(element in _this.upgradeAuswahl[name]['off']){
													var bool = (_this.upgradeAuswahl[name]['OffAktiv'][0].getValue() && _this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
													_this.upgradeAuswahl[name]['off'][element][0].setEnabled(bool);
												}
											}
											
											if(elem == 'GebAktiv'){
												_this.upgradeAuswahl[name][elem][0].setEnabled(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
												for(element in _this.upgradeAuswahl[name]['geb']){
													var bool = (_this.upgradeAuswahl[name]['GebAktiv'][0].getValue() && _this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue());
													_this.upgradeAuswahl[name]['geb'][element][0].setEnabled(bool);
												}
											}
										}
									}
								}, this);
								page.add(new qx.ui.basic.Label('&nbsp;').set({rich: true}),{row: 1, column: 0});
								
								var eintrag = 'GebAktiv';
								var wert = true;
								var status = true;
								for(item in _this.upgradeAuswahl[name]){
									if(item == eintrag){
										wert = _this.upgradeAuswahl[name][item][0].getValue();
										status = _this.upgradeAuswahl[name][item][0].isEnabled();
									}
								}
								basisEinheiten['GebAktiv'] = (new Array(new qx.ui.form.CheckBox("<b><u>Gebäude Aktiv</b></u>").set({value: wert, enabled: status, rich: true}), 99));
								page.add(basisEinheiten['GebAktiv'][0],{row: 2, column: 0});
								basisEinheiten['GebAktiv'][0].addListener("click", function (e) {
									for(basis in _this.upgradeAuswahl){
											var name = basis;
											for(elem in _this.upgradeAuswahl[name]){
												if(elem == 'GebAktiv'){
													for(element in _this.upgradeAuswahl[name]['geb']){
														if(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue() == true){
															_this.upgradeAuswahl[name]['geb'][element][0].setEnabled( _this.upgradeAuswahl[name]['GebAktiv'][0].getValue());
														}else{
															_this.upgradeAuswahl[name]['geb'][element][0].setEnabled(false);
														}
													}
												}
											}
										}
								}, this);
								//page.add(new qx.ui.basic.Label('<b><u>Gebäude:</b></u>').set({rich: true}),{row: 2, column: 0});
								
								for(gebäude in allegebäude){
									var schondrin = false;
									var gebäudename = allegebäude[gebäude].get_TechGameData_Obj().dn;
									var techname = allegebäude[gebäude].get_TechName();
									var gebäudeId = allegebäude[gebäude].get_Id();
									var istSammler = techname == ClientLib.Base.ETechName.Harvester ? true : false;
									var ressityp = allegebäude[gebäude].get_CollectResourceType();
									var objekttyp = 'geb';
									_this.objektcount++;
									
									if(gebäudeliste.length == 0){
										//gebäudeliste.push(gebäudename + ' (' + ressityp + ':' + techname + ')');
										gebäudeliste.push(new Array(gebäudename, ressityp, techname, objekttyp));
									}
									
									for(var i = 0; i < gebäudeliste.length; i++){
										//if(gebäudeliste[i] == (gebäudename + ' (' + ressityp + ':' + techname + ')')){
										if((gebäudeliste[i][0] == gebäudename) && (gebäudeliste[i][1] == ressityp) && (gebäudeliste[i][2] == techname)){
											schondrin = true;
											break;
										}
									}
									
									if(schondrin == false){
										//gebäudeliste.push(gebäudename + ' (' + ressityp + ':' + techname + ')');
										gebäudeliste.push(new Array(gebäudename, ressityp, techname, objekttyp));
									}
								}
								
								for(defeinh in defEinheiten){
									var schondrin = false;
									var defName = defEinheiten[defeinh].get_UnitGameData_Obj().dn;
									var objekttyp = 'def';
									_this.objektcount++;
									if(defEinheitenliste.length == 0){
										defEinheitenliste.push(new Array(defName, null, null, objekttyp));
									}
									
									for(var i = 0; i < defEinheitenliste.length; i++){
										if(defEinheitenliste[i][0] == defName){
											schondrin = true;
											break;
										}
									}
									
									if(schondrin == false){
										defEinheitenliste.push(new Array(defName, null ,null, objekttyp));
									}
								}
								
								for(offeinh in offEinheiten){
									var schondrin = false;
									var offName = offEinheiten[offeinh].get_UnitGameData_Obj().dn;
									var objekttyp = 'off';
									_this.objektcount++;
									if(offEinheitenliste.length == 0){
										offEinheitenliste.push(new Array(offName, null, null, objekttyp));
									}
									
									for(var i = 0; i < offEinheitenliste.length; i++){
										if(offEinheitenliste[i][0] == offName){
											schondrin = true;
											break;
										}
									}
									
									if(schondrin == false){
										offEinheitenliste.push(new Array(offName, null, null, objekttyp));
									}
								}
								
								for(elem in gebäudeliste){
										var eintrag = gebäudeliste[elem][0];
										var wert = true;
										var status = true;
										var sammler = ClientLib.Base.Tech.GetTechDisplayNameFromTechId(ClientLib.Base.ETech.FOR_Harvester);
										if ((gebäudeliste[elem][2] == ClientLib.Base.ETechName.Harvester) && (gebäudeliste[elem][1] == ClientLib.Base.EResourceType.Crystal)){
											eintrag = sammler + ' Kristall';
										}
										if((gebäudeliste[elem][2] == ClientLib.Base.ETechName.Harvester) && (gebäudeliste[elem][1] == ClientLib.Base.EResourceType.Tiberium)){
											eintrag = sammler + ' Tiberium';
										}
										if(_this.upgradeAuswahl[name]){
										for(item in _this.upgradeAuswahl[name]['geb']){
											if(item == eintrag){
												wert = _this.upgradeAuswahl[name]['geb'][item][0].getValue();
												status = _this.upgradeAuswahl[name]['geb'][item][0].isEnabled();
											}
										}}
										basisEinheiten['geb'][eintrag] = (new Array(new qx.ui.form.CheckBox(eintrag).set({value: wert, enabled: status}), gebäudeliste[elem][1], gebäudeliste[elem][2]));
										//basisEinheiten['geb'][eintrag][0].setEnabled(status);
										page.add(basisEinheiten['geb'][eintrag][0],{row: reihe, column: spalte});
										basisEinheiten['geb'][eintrag][0].addListener("click", function (e) {
											
										}, this);
										spalte++;
										if (spalte == 4){
											reihe++;
											spalte = 0;
										}
								}
								
								if(defEinheitenliste.length > 0){
									reihe++;
									page.add(new qx.ui.basic.Label('&nbsp;').set({rich: true}),{row: reihe, column: 0});
									reihe++;
									var eintrag = 'DefAktiv';
									var wert = true;
									var status = true;
									for(item in _this.upgradeAuswahl[name]){
										if(item == eintrag){
											wert = _this.upgradeAuswahl[name][item][0].getValue();
											status = _this.upgradeAuswahl[name][item][0].isEnabled();
										}
									}
									basisEinheiten['DefAktiv'] = (new Array(new qx.ui.form.CheckBox("<b><u>Defensive Aktiv</b></u>").set({value: wert, enabled: status, rich: true}), 99));
									page.add(basisEinheiten['DefAktiv'][0],{row: reihe, column: 0});
									basisEinheiten['DefAktiv'][0].addListener("click", function (e) {
										for(basis in _this.upgradeAuswahl){
											var name = basis;
											for(elem in _this.upgradeAuswahl[name]){
												if(elem == 'DefAktiv'){
													for(element in _this.upgradeAuswahl[name]['def']){
														if(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue() == true){
															_this.upgradeAuswahl[name]['def'][element][0].setEnabled( _this.upgradeAuswahl[name]['DefAktiv'][0].getValue());
														} else{
																_this.upgradeAuswahl[name]['def'][element][0].setEnabled(false);
															}
													}
												}
											}
										}
									}, this);
									
									//page.add(new qx.ui.basic.Label('<b><u>Def-Einheiten:</b></u>').set({rich: true}),{row: reihe, column: 0});
									reihe++;
									spalte = 0;
									for(elem in defEinheitenliste){
										var eintrag = defEinheitenliste[elem][0];
										var wert = true;
										var status = true;
										if(_this.upgradeAuswahl[name]){
										for(item in _this.upgradeAuswahl[name]['def']){
											if(item == eintrag){
												wert = _this.upgradeAuswahl[name]['def'][item][0].getValue();
												status = _this.upgradeAuswahl[name]['def'][item][0].isEnabled();
											}
										}}
										basisEinheiten['def'][eintrag] =(new Array(new qx.ui.form.CheckBox(eintrag).set({value: wert, enabled: status,}), 99, 99, defEinheitenliste[elem][3]));
										//basisEinheiten['def'][eintrag][0].setEnabled(status);
										page.add(basisEinheiten['def'][eintrag][0], {row: reihe, column: spalte});
										basisEinheiten['def'][eintrag][0].addListener("click", function (e) {
											
										}, this);
										spalte++;
										if (spalte == 4){
											reihe++;
											spalte = 0;
										}
									}
								}
								
								if(offEinheitenliste.length > 0){
									reihe++;
									page.add(new qx.ui.basic.Label('&nbsp;').set({rich: true}),{row: reihe, column: 0});
									reihe++;
									
									var eintrag = 'OffAktiv';
									var wert = true;
									var status = true;
									for(item in _this.upgradeAuswahl[name]){
										if(item == eintrag){
											wert = _this.upgradeAuswahl[name][item][0].getValue();
											status = _this.upgradeAuswahl[name][item][0].isEnabled();
										}
									}
									basisEinheiten['OffAktiv'] = (new Array(new qx.ui.form.CheckBox("<b><u>Offensive Aktiv</b></u>").set({value: wert, enabled: status, rich: true}), 99));
									page.add(basisEinheiten['OffAktiv'][0],{row: reihe, column: 0});
									basisEinheiten['OffAktiv'][0].addListener("click", function (e) {
										for(basis in _this.upgradeAuswahl){
											var name = basis;
											for(elem in _this.upgradeAuswahl[name]){
												if(elem == 'OffAktiv'){
													for(element in _this.upgradeAuswahl[name]['off']){
														if(_this.upgradeAuswahl[name]['BasisUpgrAktiv'][0].getValue() == true){
															_this.upgradeAuswahl[name]['off'][element][0].setEnabled( _this.upgradeAuswahl[name]['OffAktiv'][0].getValue());
														}else{
															_this.upgradeAuswahl[name]['off'][element][0].setEnabled(false);
														}
													}
												}
											}
										}
									}, this);
									
									//page.add(new qx.ui.basic.Label('<b><u>Off-Einheiten:</b></u> ').set({rich: true}),{row: reihe, column: 0});
									reihe++;
									spalte = 0;
									for(elem in offEinheitenliste){
										var eintrag = offEinheitenliste[elem][0];
										var wert = true;
										var status = true;
										if(_this.upgradeAuswahl[name]){
										for(item in _this.upgradeAuswahl[name]['off']){
											if(item == eintrag){
												wert = _this.upgradeAuswahl[name]['off'][item][0].getValue();
												status = _this.upgradeAuswahl[name]['off'][item][0].isEnabled();
											}
										}}
										basisEinheiten['off'][eintrag] = (new Array(new qx.ui.form.CheckBox(eintrag).set({value: wert, enabled: status}), 99, 99, offEinheitenliste[elem][3]));
										//basisEinheiten['off'][eintrag][0].setEnabled(status);
										page.add(basisEinheiten['off'][eintrag][0], {row: reihe, column: spalte});
										basisEinheiten['off'][eintrag][0].addListener("click", function (e) {
											
										}, this);
										spalte++;
										if (spalte == 4){
											reihe++;
											spalte = 0;
										}
									}
								}
								
								_this.tabview.add(page);
								_this.upgradeAuswahl[name] = basisEinheiten;
								
								
							}
							
							for(var i in _this.upgradeAuswahl){
									for(var j in _this.upgradeAuswahl[i]){
											//console.log('upgradeAuswahl['+ i +']: ' + _this.upgradeAuswahl[i][j][0].getLabel() + ' value: ' + _this.upgradeAuswahl[i][j][0].getValue() + ' Ressityp: ' + _this.upgradeAuswahl[i][j][1] + ' Techname: ' + _this.upgradeAuswahl[i][j][2]);
										}
								}
							
							var boxF = new qx.ui.container.Composite(new qx.ui.layout.VBox(1)).set({padding: 0, decorator: "pane-light-opaque"});//enhält Tabview
							boxF.add(_this.tabview);
							
							var boxE = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({margin: 0, padding: 10, decorator: "pane-light-opaque"});//enhält liste + statusbox
							var boxH = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({margin: 0});
							var lblHa = new qx.ui.basic.Label("Upgrade-Fehler: " + (_this.upgradeCount - _this.realUpgradeCount)).set({ alignX: "left", alignY: "top"});
							var lblHb = new qx.ui.basic.Label("Upgrade-OK    : " + (_this.realUpgradeCount)).set({ alignX: "left", alignY: "top"});
							var ckboxH = new qx.ui.form.CheckBox("Stop Log").set({value: false})
							var textH = new qx.ui.form.TextArea().set({readOnly: true, height: 160, maxHeight: 160, width: 250, maxWidth: 300 });
							boxH.add(lblHb);
							boxH.add(lblHa);
							boxH.add(ckboxH);
							boxH.add(textH);
							boxE.add(_this.listbox, {left: 0, right: 0});
							boxE.add(boxH);
							var rangAktuell = 0;
							var boxG = new qx.ui.container.Composite(new qx.ui.layout.HBox(15, "center"));//.set({margin:0, padding:3, decorator: "pane-light-opaque"});
							var lblGa = new qx.ui.basic.Label("Rangänderung seit Start: " + rangAktuell);//.set({ alignX: "center", alignY: "center"});
							var lblGb = new qx.ui.basic.Label("0:00:00:00");//.set({ alignX: "center", alignY: "center"});
							var lblGc = new qx.ui.basic.Label("Ally:");
							boxG.add(lblGa);
							boxG.add(lblGb);
							boxG.add(lblGc);
							
							
							var timer = qx.util.TimerManager.getInstance();
							if(_this.timer == true){
								timer.start(function(userData, timerId)
								{
									var rangJetzt = ClientLib.Data.MainData.GetInstance().get_Player().get_OverallRank();
									rangAktuell =  (_this.rangstart - rangJetzt) > 0 ? "+" + (_this.rangstart - rangJetzt) : (_this.rangstart - rangJetzt);
									var rangdiff = _this.rangAllyStart - _this.AllianzRang('meinRang');
									rangAktuell = rangAktuell == 0 ? "±0" : rangAktuell;
									rangdiff = rangdiff > 0 ? "+" + rangdiff : rangdiff;
									rangdiff = rangdiff == 0 ? "±0" : rangdiff;
									lblGc.setValue(' Ally Rang ' + _this.AllianzRang('meinRang') + ' von ' + _this.AllianzRang('memberAnz') + ' (' + rangdiff + ')' );
									lblGb.setValue(' [' + _this.Diffzeit() + ']');
									lblGa.setValue("Rangänderung seit Start: " + rangAktuell);
									lblHa.setValue("Upgrade-Fehler: " + (_this.upgradeCount - _this.realUpgradeCount));
									lblHb.setValue("Upgrade-OK    : " + (_this.realUpgradeCount));
									_this.listbox.setValue(_this.listboxstring);
									if(!ckboxH.getValue())textH.setValue(_this.meldungText);
								},1000,this,null,1000);
							}
							
							
							
							
							tabPageAUG.add(boxTitelA);
							tabPageAUG.add(boxD);
							tabPageAUG.add(boxC, { flex: 1 });
							tabPageAUG.add(boxF);
							tabPageAUG.add(boxE);
							tabPageAUG.add(boxG);
							_this.autoUpgradePopup.add(tabviewHaupt);
							_this.autoUpgradePopup.moveTo(100, 100);
							_this.autoUpgradePopup.open();
							_this.autoUpgradePopup.focus();
						},
						
						Meldung : function(dazu){
							this.meldungArr.push(dazu);
							var anz = this.objektcount;
							if(this.meldungArr.length > (anz)) this.meldungArr = this.meldungArr.slice(-(anz));
							var text = "";
							for(var i=0; i< this.meldungArr.length; i++){
								text += (i+1) + '/' + anz + ' Objekten\n' + this.meldungArr[i];
							}
							this.meldungText = text;
						},
						
						AllianzRang : function (wahl) {
							var allyDaten = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d;
							var ich = ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
							var rangAlly = new Array();
							var meinRangInAlly = 0;
							var rangJetzt = ClientLib.Data.MainData.GetInstance().get_Player().get_OverallRank();
							for(spieler in allyDaten){
								var spRang = allyDaten[spieler]['Rank'];
								if(allyDaten[spieler]['Name'] == ich){
									spRang = rangJetzt;
								}
								rangAlly.push(spRang);
							}
							function Sortieren (a, b) {
								return a - b;
							}
							rangAlly.sort(Sortieren);
							for(var i = 0; i < rangAlly.length; i++){
								if(rangAlly[i] == rangJetzt){
									meinRangInAlly = i+1;
									break;
								}
							}
							
							if(wahl == 'meinRang') return meinRangInAlly;
							if(wahl == 'memberAnz') return rangAlly.length;
						},
						
						Diffzeit : function(){
							var zeitJetzt = new Date().getTime();
							var diffzeit = new Date(zeitJetzt - this.startzeit.getTime());
							var diff1 = ClientLib.Vis.VisMain.FormatTimespan(diffzeit/1000);
							return diff1;
						},
						
						Auswertung : function(upgradeObject,sender) {
							var _this = window.FlunikTools.Main.getInstance();
							var eigenschaften = new Array(	upgradeObject.basename,
															upgradeObject.posX,
															upgradeObject.posY,
															upgradeObject.building,
															upgradeObject.unitname,
															upgradeObject.type,
															upgradeObject.buildinglevel,
															upgradeObject.level);
							var zeit = this.Zeitstempel();
							var tempstring = "";
							
							for (var i = 0; i < 8; i++){
								if (eigenschaften[i] != undefined)
									{
										if (i == 1) 
											{
												tempstring += "(" + eigenschaften[i] + ":";
											} else
												{
													if (i == 2)
														{
															tempstring += eigenschaften[i] + ")  ";
														} else 
															{
																if (i == 6 || i == 7)
																	{
																		tempstring += eigenschaften[i] + " → " + (eigenschaften[i] + 1);
																	}else
																		{
																			tempstring += eigenschaften[i] + " ";
																		}
															}
												}
									}
							}
							
							var listearr = new Array();
							if (_this.liste != null) {
									listearr = _this.liste;
									var anz = listearr.length;
									if(anz > 22){ 
										listearr = listearr.slice(-20);
										anz = listearr.length;
									}
									var string = listearr[anz-1];
									var string2 = string.slice(4,-23);
									console.log('string2   : "' + string2 +'" ');
									console.log('tempstring: "' + tempstring +'" ');
									console.log("Stringvergleich (tempstring != string2): " + (tempstring != string2));
									
									if (tempstring !== string2){
											listearr[anz] = "<br>" + tempstring + zeit;
											_this.realUpgradeCount++;
											_this.liste = listearr;
											_this.listboxstring = tempstring + zeit + "\n" + _this.listboxstring;
											_this.listbox.setValue(_this.listboxstring);
										}
								} else	{ 
											listearr[0] = "<br>" + tempstring + zeit; 
											_this.realUpgradeCount++;
											_this.liste = listearr;
											_this.listboxstring = tempstring + zeit + "\n" + _this.listboxstring;
											_this.listbox.setValue(_this.listboxstring)
										}
							
							
							
							_this.upgradeCount++;
							//if (_this.letzteAUGs == 0){
							//_this.letzteAUGs = "<br>" + tempstring + zeit;
							//}else{
							//_this.letzteAUGs +=  "<br>" + tempstring + zeit;
							//}
							//console.log("ausgeführte Upgrades(angefordert): " + _this.letzteAUGs);
							//console.log("Array listearr(real): " + listearr);
							_this.EinAusLabel("Auswertung(" + sender + ")");
						},
						
                        Zeitstempel : function() {
							var datum = new Date();
							var tag = datum.getDate() < 10 ? "0" + datum.getDate() : datum.getDate();
							var monat = (datum.getMonth() + 1) < 10 ? "0" + (datum.getMonth() + 1) : (datum.getMonth() + 1);
							var jahr = datum.getYear() - 100;
							var stunde = datum.getHours() < 10 ? "0" + datum.getHours() : datum.getHours();
							var minute = datum.getMinutes() < 10 ? "0" + datum.getMinutes() : datum.getMinutes();
							var sekunde = datum.getSeconds() < 10 ? "0" + datum.getSeconds() : datum.getSeconds();
							var datumzeit = " [" + stunde + ":" + minute + ":" + sekunde + " - " + tag + "." + monat + "." + jahr +"] ";
							return datumzeit;
						},
						
                        EinAusLabel : function (sender) {
						    var _this = window.FlunikTools.Main.getInstance();
							var kat = _this.geb + _this.def + _this.off;
							var option =  _this.p + _this.f + _this.h + _this.h1 + _this.r + _this.s + _this.a;
							var summe = option + _this.x;
							var status = _this.geb == 0 && _this.def == 0 && _this.off == 0 ? " AUS" : " EIN";
							var ttt = "<html><font size=+0.1><font color=red><b><u>Auto-Upgrade-Status:</u></b></font><b>"+ status +"</b><br>";
							var uglist = "";
							
							if (_this.liste != null){
								for (var i = 0; i < _this.liste.length; i++){
										uglist += _this.liste[i];
								}
							}
							
							ttt = _this.geb > 0 ? ttt + "<br>Gebäude <b>EIN</b>" : ttt;
							ttt = _this.def > 0 ? ttt + "<br>Verteidigung <b>EIN</b>" : ttt;
							ttt = _this.off > 0 ? ttt + "<br>Angriff <b>EIN</b>" : ttt;
							ttt = _this.x > 0 ? ttt + "<br>Nur-Ressi-Upgrade <b>EIN</b>" : ttt;
							ttt = option > 0 ? ttt + "<br><font color=red>Optionen:</font>" : ttt;
							ttt = _this.p > 0 ? ttt + "<br>Kraftwerke <b>EIN</b>" : ttt;
							ttt = _this.r > 0 ? ttt + "<br>Raffinerien <b>EIN</b>" : ttt;
							ttt = _this.h > 0 ? ttt + "<br>Tiberiumsammler <b>EIN</b>" : ttt;
							ttt = _this.h1 > 0 ? ttt + "<br>Kristallsammler <b>EIN</b>" : ttt;
							ttt = _this.s > 0 ? ttt + "<br>Silos <b>EIN</b>" : ttt;
							ttt = _this.a > 0 ? ttt + "<br>Akkumulatoren <b>EIN</b>" : ttt;
							ttt = uglist != "" ? ttt + "<br>&nbsp;<br><font color=red>Letzte Auto-Upgrades:</font>" + uglist : ttt;
							ttt = ttt + "<br>&nbsp;</font></html>";
							
							if (kat > 0){
					    	_this.einaus = 1;
							button.setAppearance("button-playarea-mode-frame");//button-detailview-mode-frame
							button.setIcon("http://goo.gl/7eO9gD");
							button.set({toolTipText:ttt});
							button.setUserData("isNotification", true);
							}
							else{_this.einaus = 0;
							button.setLabel("Auto-Upgrade: AUS");
							button.setAppearance("button-playarea-mode-frame");
							button.setIcon("http://goo.gl/Tsst0o");
							button.set({toolTipText:ttt});
							button.setUserData("isNotification", false);
							}
							console.log("einaus-Status: " + _this.einaus + " (Summe: " + summe + ")"  + this.Zeitstempel() + " (Sender: " + sender + ")");
							//console.log("uglist : " + uglist);
							},
							
						DarfUpgraden : function(kat, basis, gebäude, ressityp, einheit){
							try{
								var _this = window.FlunikTools.Main.getInstance();
								var basisAktiv = _this.upgradeAuswahl[basis]['BasisUpgrAktiv'][0].getValue();
								var katAktiv;
								if(kat == 'geb'){
									katAktiv = _this.upgradeAuswahl[basis]['GebAktiv'][0].getValue();
								}else{
										if(kat == 'def'){
											katAktiv = _this.upgradeAuswahl[basis]['DefAktiv'][0].getValue();
										}else{
												if(kat == 'off'){
													katAktiv = _this.upgradeAuswahl[basis]['OffAktiv'][0].getValue();
												}else{
														console.log('Funktion \'DarfUpgraden\' kat ungültig!');
														katAktiv = false;
													}
											}
									}
								var ugo = einheit == null ? gebäude : einheit;
								var sammler = ClientLib.Base.Tech.GetTechDisplayNameFromTechId(ClientLib.Base.ETech.FOR_Harvester);
								if((ugo == sammler) && (ressityp == ClientLib.Base.EResourceType.Tiberium)){ugo = sammler + ' Tiberium';}
								if((ugo == sammler) && (ressityp == ClientLib.Base.EResourceType.Crystal)){ugo = sammler + ' Kristall';}
								var ugoAktiv = _this.upgradeAuswahl[basis][kat][ugo][0].getValue();
								//_this.Meldung('DarfUpgraden: '+ basis + '\nbasisAktiv: ' + basisAktiv + '\nkatAktiv: ' + kat + ' ' + katAktiv + '\nObjekt: ' + ugo + ' ' + ugoAktiv + '\n********************************\n');
								if(!basisAktiv || !katAktiv ){return false;}
								else{return ugoAktiv;}
							}catch(e){
								console.log('FEHLER IN Funktion \'DarfUpgraden\':\nbasis:' + basis + '\nkat:' + kat + '\ngebäude:' + gebäude +'\neinheit:' + einheit + '\nressityp:' + ressityp + '\nbasisAktiv:'
											+ basisAktiv + '\nugo:' + ugo + '\nugoAktiv:' + ugoAktiv); 
								console.log(e.toString());
								console.info('BASISLAYOUT GEÄNDERT! LADE BASISDATEN ERNEUT...');
								_this.autoUpgradePopup.close();
								_this.autoUpgradePopup.open();
							}
						},	
						
						canUpgradeBuilding: function (building, city) {
							var _this = FlunikTools.Main.getInstance();
							var nextLevel = (building.get_CurrentLevel() + 1);
							var gameDataTech = building.get_TechGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							var ressityp = building.get_CollectResourceType();
							var gebäudename = building.get_TechGameData_Obj().dn;
							var basisname = city.get_Name();
							
							if(!_this.DarfUpgraden('geb', basisname, gebäudename, ressityp, null)) {
								_this.Meldung('canUpgradeBuilding:\n ' + basisname + '\n' + 'Geb.: ' + gebäudename + '\n' + 'DarfUpgraden: ' + 'false' 
											+ '\nhasEnoughResources: ' + hasEnoughResources + '\n' +
											'city.get_IsLocked(): ' + city.get_IsLocked() + '\nbuilding.get_IsDamaged(): ' + building.get_IsDamaged() + '\n' + 
											'\ncanUpgradeBuilding: ' + 'false' + '\n');
								return false;
							}
							_this.Meldung('canUpgradeBuilding:\n ' + basisname + '\n' + 'Geb.: ' + gebäudename + '\n' + 'DarfUpgraden: ' + 'true' 
											+ '\nhasEnoughResources: ' + hasEnoughResources + '\n' +
											'city.get_IsLocked(): ' + city.get_IsLocked() + '\nbuilding.get_IsDamaged(): ' + building.get_IsDamaged() + '\n' + 
											'\ncanUpgradeBuilding: ' + (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources) + '\n' );
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},
						
						canUpgradeUnit: function (unit, city, kat) {
							var _this = FlunikTools.Main.getInstance();
							var nextLevel = unit.get_CurrentLevel() + 1;
							var gameDataTech = unit.get_UnitGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							var einheitname = unit.get_UnitGameData_Obj().dn;
							var basisname = city.get_Name();
							var id = _this.getMainProductionBuildingMdbId(gameDataTech.pt, gameDataTech.f);
						    var building = city.get_CityBuildingsData().GetBuildingByMDBId(id);	
							var levelReq = ClientLib.Base.Util.GetUnitLevelRequirements_Obj(nextLevel, gameDataTech);
							var reqTechIndexes = _this.getMissingTechIndexesFromTechLevelRequirement(levelReq, true, city);
							
							
							if(!_this.DarfUpgraden(kat, basisname, null, null, einheitname)) {
								_this.Meldung('canUpgradeUnit:\n' + basisname + '\n' + 'Unit: ' + einheitname + '\n' + 'Geb.: ' + building.get_TechGameData_Obj().dn + 
											'\nDarfUpgraden: ' + 'false' +
											'\ngameDataTech == null: ' + (gameDataTech == null) +
											'\nunit.get_IsDamaged(): ' + (unit.get_IsDamaged()) +
											'\ncity.get_IsLocked(): ' +(city.get_IsLocked()) + 
											'\nhasEnoughResources: '+ hasEnoughResources + 
											'\nbuilding == null: ' + (building == null) + 
											'\nbuilding.get_CurrentDamage() > 0: ' + (building.get_CurrentDamage() > 0) +
											'\nreqTechIndexes != null: ' + (reqTechIndexes != null) +
											'\nreqTechIndexes.length > 0: ' + (reqTechIndexes.length > 0) +
											'\ncanUpgradeUnit: ' + 'false' + '\n');
								return false;
							}
						    if (gameDataTech == null || unit.get_IsDamaged() || city.get_IsLocked() || !hasEnoughResources) {
								_this.Meldung('canUpgradeUnit:\n' + basisname + '\n' + 'Unit: ' + einheitname + '\n' + 'Geb.: ' + building.get_TechGameData_Obj().dn + 
											'\nDarfUpgraden: ' + 'true' +
											'\ngameDataTech == null: ' + (gameDataTech == null) +
											'\nunit.get_IsDamaged(): ' + (unit.get_IsDamaged()) +
											'\ncity.get_IsLocked(): ' +(city.get_IsLocked()) + 
											'\nhasEnoughResources: '+ hasEnoughResources + 
											'\nbuilding == null: ' + (building == null) + 
											'\nbuilding.get_CurrentDamage() > 0: ' + (building.get_CurrentDamage() > 0) +
											'\nreqTechIndexes != null: ' + (reqTechIndexes != null) +
											'\nreqTechIndexes.length > 0: ' + (reqTechIndexes.length > 0) +
											'\ncanUpgradeUnit: ' + 'false' + '\n');
						        return false;
						    }
						    //var id = _this.getMainProductionBuildingMdbId(gameDataTech.pt, gameDataTech.f);
						    //var building = city.get_CityBuildingsData().GetBuildingByMDBId(id);
						    if ((building == null) || (building.get_CurrentDamage() > 0)) {
								_this.Meldung('canUpgradeUnit:\n' + basisname + '\n' + 'Unit: ' + einheitname + '\n' + 'Geb.: ' + building.get_TechGameData_Obj().dn + 
											'\nDarfUpgraden: ' + 'true' +
											'\ngameDataTech == null: ' + (gameDataTech == null) +
											'\nunit.get_IsDamaged(): ' + (unit.get_IsDamaged()) +
											'\ncity.get_IsLocked(): ' +(city.get_IsLocked()) + 
											'\nhasEnoughResources: '+ hasEnoughResources + 
											'\nbuilding == null: ' + (building == null) + 
											'\nbuilding.get_CurrentDamage() > 0: ' + (building.get_CurrentDamage() > 0) +
											'\nreqTechIndexes != null: ' + (reqTechIndexes != null) +
											'\nreqTechIndexes.length > 0: ' + (reqTechIndexes.length > 0) +
											'\ncanUpgradeUnit: ' + 'false' + '\n');
						        return false;
						    }
						    //var levelReq = ClientLib.Base.Util.GetUnitLevelRequirements_Obj(nextLevel, gameDataTech);
							//var reqTechIndexes = _this.getMissingTechIndexesFromTechLevelRequirement(levelReq, true, city);
						    if ((reqTechIndexes != null) && (reqTechIndexes.length > 0)) {
								_this.Meldung('canUpgradeUnit:\n' + basisname + '\n' + 'Unit: ' + einheitname + '\n' + 'Geb.: ' + building.get_TechGameData_Obj().dn + 
											'\nDarfUpgraden: ' + 'true' +
											'\ngameDataTech == null: ' + (gameDataTech == null) +
											'\nunit.get_IsDamaged(): ' + (unit.get_IsDamaged()) +
											'\ncity.get_IsLocked(): ' +(city.get_IsLocked()) + 
											'\nhasEnoughResources: '+ hasEnoughResources + 
											'\nbuilding == null: ' + (building == null) + 
											'\nbuilding.get_CurrentDamage() > 0: ' + (building.get_CurrentDamage() > 0) +
											'\nreqTechIndexes != null: ' + (reqTechIndexes != null) +
											'\nreqTechIndexes.length > 0: ' + (reqTechIndexes.length > 0) +
											'\ncanUpgradeUnit: ' + 'false' + '\n');
						        return false;
						    }
							_this.Meldung('canUpgradeUnit:\n' + basisname + '\n' + 'Unit: ' + einheitname + '\n' + 'Geb.: ' + building.get_TechGameData_Obj().dn + 
											'\nDarfUpgraden: ' + 'true' +
											'\ngameDataTech == null: ' + (gameDataTech == null) +
											'\nunit.get_IsDamaged(): ' + (unit.get_IsDamaged()) +
											'\ncity.get_IsLocked(): ' +(city.get_IsLocked()) + 
											'\nhasEnoughResources: '+ hasEnoughResources + 
											'\nbuilding == null: ' + (building == null) + 
											'\nbuilding.get_CurrentDamage() > 0: ' + (building.get_CurrentDamage() > 0) +
											'\nreqTechIndexes != null: ' + (reqTechIndexes != null) +
											'\nreqTechIndexes.length > 0: ' + (reqTechIndexes.length > 0) +
											'\ncanUpgradeUnit: ' + 'true' + '\n');
						    return true;
						},

						getMainProductionBuildingMdbId: function (placementType, faction) {
							var mdbId = -1;
							var techNameId = -1;
							if (placementType == 2) {
								techNameId = 3;
							} else {
								techNameId = 4;
							}
							if (techNameId > 0) {
								mdbId = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(techNameId, faction);
							}
							return mdbId;
						},

						getMissingTechIndexesFromTechLevelRequirement: function (levelRequirements, breakAtFirst, city) {
							var reqTechIndexes = [];
							if (levelRequirements != null && levelRequirements.length > 0) {
								for (var lvlIndex=0; (lvlIndex < levelRequirements.length); lvlIndex++) {
									var lvlReq = levelRequirements[lvlIndex];
									var requirementsMet = false;
									var amountCounter = lvlReq.Amount;
									for (var buildingIndex in city.get_Buildings().d) {
										if (city.get_Buildings().d[buildingIndex].get_MdbBuildingId() == lvlReq.RequiredTechId && city.get_Buildings().d[buildingIndex].get_CurrentLevel() >= lvlReq.Level) {
											amountCounter--;
											if (amountCounter <= 0) {
												requirementsMet=true;
												break;
											}
										}
									}
									if (!requirementsMet) {
										requirementsMet = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch().IsResearchMinLevelAvailable(lvlReq.RequiredTechId, lvlReq.Level);
									}
									if (!requirementsMet) {
										reqTechIndexes.push(lvlIndex);
										if (breakAtFirst) {
											return reqTechIndexes;
										}
									}
								}
							}
							return reqTechIndexes;
						},
						
						
						OnFunction: function() {
						this.AautoUpdateHandle = 0;
						this.EinAusLabel("OnFunction()");
						},
						OffFunction: function() {
						this.AautoUpdateHandle = null;
						this.EinAusLabel("OffFunction()");
						},
						
						
						
						
						
						BuildingstartAutoUpdate: function () {
							
							this.autoUpdateHandleBuilding = window.setInterval(this.BuildingautoUpgrade, (this.ugZeit+100));
							this.EinAusLabel("BuildingstartAutoUpdate()");
						},
						
						OffensestartAutoUpdate: function () {
							
							this.autoUpdateHandleOffense = window.setInterval(this.OffenseautoUpgrade, (this.ugZeit+300));
							this.EinAusLabel("OffensestartAutoUpdate()");
						},
						
						DefensestartAutoUpdate: function () {
							
							this.autoUpdateHandleDefense = window.setInterval(this.DefenseautoUpgrade, (this.ugZeit+500));
							this.EinAusLabel("DefensestartAutoUpdate()");
						},
						
						BstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandleBuilding);
							this.autoUpdateHandleBuilding = null;
							this.EinAusLabel("BstopAutoUpdate()");
						},
						
						DstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandleDefense);
							this.autoUpdateHandleDefense = null;
							this.EinAusLabel("DstopAutoUpdate()");
						},
						
						OstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandleOffense);
							this.autoUpdateHandleOffense = null;
							this.EinAusLabel("OstopAutoUpdate()");
						},
                        
						
						totalRepairTime: function ( airRT, vehRT, infRT) {
						
						
							if ((airRT > 0) && (vehRT > 0) && (infRT > 0)){
								if((airRT > vehRT) && (airRT > infRT) ){
									var maxRT = airRT;
									
									return (maxRT);
									}
								if((vehRT > airRT) && (vehRT > infRT) ){
									var maxRT = vehRT;
									
									return (maxRT);
									}
								if((infRT > vehRT) && (infRT > airRT) ){
									var maxRT = infRT;
									
									return (maxRT);
									}
							
							
							}
							
							if ((airRT < 1 )&& (vehRT > 0) && (infRT > 0)){
							
								if((vehRT > infRT) ){
									var maxRT = vehRT;
									
									return (maxRT);
									}
								if((infRT > vehRT)){
									var maxRT = infRT;
									
									return (maxRT);
									}
							}
							
							if ((airRT > 0) && (vehRT < 1 )&& (infRT > 0)){
								if((airRT > infRT) ){
									var maxRT = airRT;
									
									return (maxRT);
									}
								
								if((infRT > airRT) ){
									var maxRT = infRT;
									
									return (maxRT);
									}
							}
							
							if ((airRT > 0) && (vehRT > 0 )&& (infRT < 1)){
								if((airRT > vehRT)){
										var maxRT = airRT;
										
										return (maxRT);
										}
									if((vehRT > airRT)){
										var maxRT = vehRT;
										
										return (maxRT);
										}
								
							}
							
						
							if (((airRT < 1) && (vehRT < 1 ))&& (infRT > 0)){
								var oneWithRT = infRT;
								return (oneWithRT);
							}
							
							if ((vehRT > 0 )&& ((airRT < 1) && (infRT < 1))){
								var oneWithRT = vehRT;
								return (oneWithRT);
							}
							
							if ((airRT >0) && ((vehRT < 1 )&& (infRT < 1))){
								var oneWithRT = airRT;
								return (oneWithRT);
							}
							
							else{
								var totalNoRT = 0;
								return (totalNoRT);
							}
						
						},
						
						Production_Math: function(city, building_Id, Production, Package_Size, Time_To_Get_Package, LinkType0, LinkType1, LinkType2){
													
							if(city != null){
								var Production_Value = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].TotalValue;
								var Package = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Package_Size].TotalValue;
								var Package_Per_Hour = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Time_To_Get_Package].TotalValue;
								
								if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0] != undefined){
									var type0 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0].Value;
								}else{
									var type0 = 0;
								}
								if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1] != undefined){
									var type1 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1].Value;
								}else{
									var type1 = 0;
								}
								if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2] != undefined){
									var type2 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2].Value;
								}else{
									var type2 = 0;
								}
								var Total_Production = Production_Value + (Package/(Package_Per_Hour/3600)) + type0 + type1 + type2;
								
								return Total_Production;
							
							}
						},
						
						Building_Object: function(city, building, type){
								if(city != null && building != null){
									if(type != null){
										var building_obj = {
												base_name: city.m_SupportDedicatedBaseName,
												building_name: building.get_UnitGameData_Obj().dn,
												Ratio: type,
												cityid: city.get_Id(),
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
											}
										} else {
											var building_obj = {
													base_name: city.m_SupportDedicatedBaseName,
													building_name: building.get_UnitGameData_Obj().dn,
													cityid: city.get_Id(),
													posX: building.get_CoordX(),
													posY: building.get_CoordY(),
													isPaid: true
												}
										}
									return building_obj;
								
								}
						},					


						
/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                               The Defense Function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
						DefenseautoUpgrade : function() {
                           var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d){
								basenum++;
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								
                                var baseName = city.m_SupportDedicatedBaseName;
								var Type = ClientLib.Base.EPlacementType.Defense;
                           
                             
								var baselvl = city.get_LvlBase();
								var blvlLow = baselvl + 3;
                                
                             	
                             	
                                var defarr = new Array();
							    var defnum = 0;
                               
								var units = city.get_CityUnitsData();
								var gey;

								var defenceUnits = units.get_DefenseUnits();
								for (var nUnit in defenceUnits.d){ 
									defnum++
									var unit = defenceUnits.d[nUnit];
									
									var HQ = city.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ);
									var uname = unit.get_UnitGameData_Obj().dn;
									if(!_this.canUpgradeUnit(unit, city, 'def'))continue;
                                    var unitlvlup1 = unit.get_CurrentLevel() + 1;
                                    var name  = unit.get_UnitGameData_Obj().dn;
									var canUpgrade = city.GetUnitRecruitedInfoByCoord(ClientLib.Base.EPlacementType.Defense ,unit.get_CoordX() ,unit.get_CoordY()).CanUpgrade;
									//console.log(city.GetUnitRecruitedInfoByCoord(ClientLib.Base.EPlacementType.Defense ,unit.get_CoordX() ,unit.get_CoordY()).CanUpgrade);
									//console.log(!_this.canUpgradeUnit(unit, city));
									if(unit.get_CurrentLevel() > 3){
										var unitHealthperCost = _this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
									}
									if(unit.get_CurrentLevel() <= 3){
										var unitHealthperCost = Math.pow( (_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
									}
									defarr[defnum] =  unitHealthperCost;
								    defarr.sort(function(a,b){return b-a});
									//console.log(defarr[0], defarr[1]);
									
									if((defarr[0] >= defarr[1]) && ((unit.get_CurrentLevel() > 3)&&( unit.get_CurrentLevel() <= 4) ) && (defarr[1] != undefined)  ){
										//console.log(defarr[0], defarr[1]);
										defarr.shift();
									}
									if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() > 4) && (defarr[1] != undefined)  ){
										defarr.sort(function(a,b){return a-b});
									//console.log(defarr[0], defarr[1]);
										defarr.shift();
									}
									
									if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() <= 3) && (defarr[1] != undefined)){
										defarr.shift();
									}
									
									
									if(unitHealthperCost == defarr[0] ){
										var defunit_obj = {
											cityid: city.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											Ratio: unitHealthperCost,
											unitname: unit.get_UnitGameData_Obj().dn,
											level: unit.get_CurrentLevel(),
											type: "Defense",
											posX: unit.get_CoordX(),
											posY: unit.get_CoordY(),
											upgradepossiblity: canUpgrade,
											unitId: unit.get_Id()
										}
									}
									/*if(_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false).toString() !== "NaN"){
									console.log(_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false));
									}*/
								}
								
								//var checkbox = _this.upgradeAuswahl[defunit_obj.basename][defunit_obj.unitname][0].getValue();
								if ( (_this.sperre == false) && (defunit_obj != undefined)&&(defunit_obj.Ratio == defarr[0]) && (defunit_obj.level <= (HQ-1) ) && (canUpgrade == defunit_obj.upgradepossiblity)) {
										_this.sperre = true;
										//console.log(units);
										console.log(defunit_obj, defarr);
										_this.Auswertung(defunit_obj,"defunit_obj");
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", defunit_obj, null, null, true);
										defarr = [];
										HQ = [];
										defunit_obj = {}; //hinzu, - Test wegen upgradefehler!!!
										_this.sperre = false;
										break;
								}
                               
							}
                             
						},
						
						
/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                             The Offense Function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

						OffenseautoUpgrade : function() {
							var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d){
								basenum++;
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_Buildings();
                                var baseName = city.m_SupportDedicatedBaseName;
                             
								var Type = ClientLib.Base.EPlacementType.Offense;
                             
								var baselvl = city.get_LvlBase();
								var blvlLow = baselvl + 3;
                                
                             	
                             	
								var offarr = new Array();
								var offnum = 0;
                               
								var units = city.get_CityUnitsData();
								

								var offenceUnits = units.get_OffenseUnits();
								for (var nUnit in offenceUnits.d){
									offnum++
									var unit = offenceUnits.d[nUnit];
                                    var uname = unit.get_UnitGameData_Obj().dn;
									//_this.Meldung('Off: ' + uname + ' in ' + '\n' + baseName + '\ncanUpgrade: ' + (_this.canUpgradeUnit(unit, city, 'off')) + '\n');
									if(!_this.canUpgradeUnit(unit, city, 'off'))continue;
                                    var unitlvlup1 = unit.get_CurrentLevel() + 1;
                                    var name  = unit.get_UnitGameData_Obj().dn;
									if(unit.get_CurrentLevel() > 2){
										var unitHealthperCost = _this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
									}
									if(unit.get_CurrentLevel() <= 2){
										var unitHealthperCost = Math.pow( (_this.GetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
									}
									offarr[offnum] =  unitHealthperCost;
									//What this does is sort the array from highest to lowest, then it dumps the first ratio with the .shift(), and upgrades the next best thing. 
									
									offarr.sort(function(a,b){return b-a});
								   //console.log(offarr[0], offarr[1]);
									
									if(offarr[0] >= offarr[1] && ((unit.get_CurrentLevel() > 2)&&( unit.get_CurrentLevel() <= 3) ) && (offarr[1] != undefined)  ){
									
										offarr.shift();
									
									}
									if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() > 3)  && (offarr[1] != undefined)  ){
										offarr.sort(function(a,b){return a-b});
										offarr.shift();
									
									}
									if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() <= 2)  && (offarr[1] != undefined)  ){
									
										offarr.shift();
									
									}
									if(unitHealthperCost == offarr[0]){
										var offunit_obj = {
											cityid: city.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											unitname: unit.get_UnitGameData_Obj().dn,
											Ratio: unitHealthperCost,
											level: unit.get_CurrentLevel(),
											type: "Offense",
											posX: unit.get_CoordX(),
											posY: unit.get_CoordY(),
											unitId: unit.get_Id()
										}
									}
									
									}
									
									//console.log(offarr[1].toString());
									
									if ((_this.sperre == false) && (offunit_obj != undefined)&&(offunit_obj.Ratio == offarr[0]) && (offunit_obj.level <= (city.get_CommandCenterLevel() - 1)) ) {
										//console.log(units);
										_this.sperre = true;
										console.log(offunit_obj, offarr);
										_this.Auswertung(offunit_obj,"offunit_obj");
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", offunit_obj, null, null, true);
										offarr = [];
										offunit_obj = {}; //hinzu, - Test wegen upgradefehler!!!
										_this.sperre = false;
										break;
								}
                               
							}
                             
						},
						
						
/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                   The Building Function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/					BuildingautoUpgrade : function() {
							var _this = window.FlunikTools.Main.getInstance();
                            var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d){
									basenum++;
									var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
									var buildings = city.get_Buildings();
									var baseName = city.m_SupportDedicatedBaseName;
								    //console.log("Basis Nr. " + basenum + ", buildings ARRAY: " + buildings);
									//console.log(baseName,  _this.x, _this.y, _this.z);
									var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
									var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
									var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
									// var maxRT = math.Max(airRT, vehRT, infRT);
                              
									var baselvl = city.get_LvlBase();
									var blvlLow = baselvl + 3;
									var defLvl = city.get_LvlDefense();
									var offLvl = city.get_LvlOffense();
									//var offensehealth = city.get_CityUnitsData().GetTotalOffenseUnitHealth();
									//console.log(_this.totalRepairTime(airRT, vehRT, infRT), infRT);
                                    var cryMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
									var tibMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
									var powMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
									
									var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
									var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
									var tiberiumCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
									var tiberiumPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
									
									//console.log(baseName + " tibContGain " +  tibContGain + " tibPacGain " +  tibPacGain + " tibContGain * _this.y " +  tibContGain * _this.y +" tibPacGain * _this.y " + tibPacGain * _this.y );
									var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
									var powerCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
									var powerPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
									
									//console.log(baseName + " powContGain " +  powContGain + " powPacGain " +  powPacGain +" powContGain * _this.z "+ powContGain * _this.z +" powPacGain * _this.z "+ powPacGain * _this.z);
									var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
									var crystalCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
									var crystalPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
									
                             	//console.log(baseName + " cryContGain " +  cryContGain + " cryPacGain " +  cryPacGain + " cryContGain * _this.y " +  cryContGain * _this.y +" cryPacGain * _this.y " + cryPacGain * _this.y );
									var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(city.get_CityCreditsProduction(), false);
									var creditPac = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(city.get_CityCreditsProduction(), false);
                               
							   //console.log(ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(offLvl+1)[0].Count,  ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(defLvl+1)[0].Count, ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(blvlLow)[0].Count);
								
								//console.log(baseName + " creditContGain " +  creditContGain + " creditPacGain " +  creditPacGain +" creditContGain * _this.z "+ creditContGain * _this.z +" creditPacGain * _this.z "+ creditPacGain * _this.z);
								//console.log(baseName, airRT, vehRT, infRT, _this.totalRepairTime(airRT, vehRT, infRT));
                                
                                var refarr = new Array();
								var refnum = 0;
                             	var powarr = new Array();
                             	var pownum = 0;
                             	var hararr = new Array();
                             	var hararr1 = new Array();
                             	var harnum = 0;
                             	var harnum1 = 0;
                             	var accarr = new Array();
                             	var accnum = 0;
                             	var silarr = new Array();
                             	var silnum = 0;
								var maxarr = [];
                             	
								try
								{
									for (var nBuildings in buildings.d) {
                                   
									var building = buildings.d[nBuildings];
									var name = building.get_UnitGameData_Obj().dn;
									//_this.Meldung('Geb: ' + name + ' in ' + '\n' + baseName + '\ncanUpgrade: ' + (_this.canUpgradeBuilding(building, city)) + '\n');
									if(!_this.canUpgradeBuilding(building, city))continue;
									var buildinglvlup1 = building.get_CurrentLevel() + 1;
                                    var bulid = building.get_Id();
									var tech = building.get_TechName();
                                 //console.log(ClientLib.Res.ResMain.GetInstance().GetTech_Obj(building.get_MdbBuildingId()));
								 //var buildTibCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count;
								  //var buildPowCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
									//if (name == "Silo" || name == "Accumulator" || name == "Command Center" || name == "Defence HQ" ) {
									//console.log(city.GetUnitRecruitedInfoByCoord(ClientLib.Base.EPlacementType.Structure ,building.get_CoordX(), building.get_CoordY()));
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade RT CC CY DHQ DFac and low level resource building Defining
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/                             
	
	 
								 
						//	/*	 
								 if(	(tech == ClientLib.Base.ETechName.Factory)	&& ((_this.totalRepairTime(airRT, vehRT, infRT) == vehRT) && (_this.x == 0))){
											var offRT = building;
											var offRT_obj = {
												cityid: city.get_Id(),
												buildingid: building.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												buildinglevel: building.get_CurrentLevel(),//test hinzu!
												building: building.get_UnitGameData_Obj().dn,
												buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
												buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
												specal: vehRT,
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
											};
                                 
										 
                                 }
                                 
                                 if(	(tech == ClientLib.Base.ETechName.Barracks) &&	((_this.totalRepairTime(airRT, vehRT, infRT) == infRT)&& (_this.x == 0))){
											var offRT = building;
											var offRT_obj = {
												cityid: city.get_Id(),
												buildingid: building.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												buildinglevel: building.get_CurrentLevel(),//test hinzu!
												building: building.get_UnitGameData_Obj().dn,
												buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
												buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
												specal:  infRT,
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
											};
										 
                                 }
                                 
                                 if(	(tech == ClientLib.Base.ETechName.Airport) && ((_this.totalRepairTime(airRT, vehRT, infRT) == airRT)&& (_this.x == 0)))	{
										 var offRT = building;
										 var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),//test hinzu!
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal:  airRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
											
                                 }
                             //    */
							 //      /*
                                 
                                 if (	(tech == ClientLib.Base.ETechName.Construction_Yard ) && ((building.get_CurrentLevel() < baselvl) && (_this.totalRepairTime(airRT, vehRT, infRT) < 14400)&& (_this.x == 0))	){
										  var cbuilding = building;
										  //console.log(name);
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										 
                                 }
                                 
                                 if (	(tech ==ClientLib.Base.ETechName.Command_Center ) && ((building.get_CurrentLevel() <= offLvl) && (_this.totalRepairTime(airRT, vehRT, infRT) < 14400)&& (_this.x == 0))	){
										  var cbuilding = building;
										  //console.log(name);
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										 
                                 }
                                 
                                 if (	(tech ==ClientLib.Base.ETechName.Defense_HQ ) && ((building.get_CurrentLevel() <= defLvl) && (_this.x == 0))	){
										  var cbuilding = building;
										  //console.log(name);
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										 
                                 }
                                 
								  if (	(tech == ClientLib.Base.ETechName.Defense_Facility) &&  ((building.get_CurrentLevel() <= defLvl + 3) && (_this.x == 0))	){
										  var cbuilding = building;
										  //console.log(name);
										  var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										   
                                 }
							
							//	*/ 
							//	/*
                                 if (((tech ==ClientLib.Base.ETechName.Support_Air)||(tech == ClientLib.Base.ETechName.Support_Ion)||(tech == ClientLib.Base.ETechName.Support_Art)) && (( _this.totalRepairTime(airRT, vehRT, infRT) < 14400) &&  (building.get_CurrentLevel() <= defLvl + 3)&& (_this.x == 0))	){
										  var support = building;
										  var support_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
										  
										  
                                 } 
							//	 */
								
                                 if (
								 ((tech == ClientLib.Base.ETechName.Harvester && building.get_CurrentLevel() <= 2) || 
								 (tech == ClientLib.Base.ETechName.Refinery && building.get_CurrentLevel() <= 2) ||
								 (tech == ClientLib.Base.ETechName.PowerPlant && building.get_CurrentLevel() <= 2) ||
								 ( (tech == ClientLib.Base.ETechName.Accumulator && building.get_CurrentLevel() <= 2)) ||
								 ((tech == ClientLib.Base.ETechName.Silo && building.get_CurrentLevel() <= 2) ))
									){
										var lowres = building;
										var LowResbuilding_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											type: "LowResbuilding",
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
											};
								 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
								 
								 }
                             /*if (name == "Refinery"  || name == "Power Plant" || name == "Harvester" || name == "Accumulator" || name == "Silo") {
									//if (name == "Silo") {
										var building_obj = {
											cityid: city.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}*/
                                        
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade Resource Defining 
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/                                        
                                        
                                        if ((tech == ClientLib.Base.ETechName.Refinery    &&  building.get_CurrentLevel() > 2) && (_this.r == 1)){
												var ref = building;
												refnum++;
                                               
                                            
												var refPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].TotalValue;
											
												var refPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsPackageSize].TotalValue;
												var refPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsBonusTimeToComplete].TotalValue;
												var refCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
												var refLinkTypes0 = 0;
												var refLinkTypes1 = 0;
											
												if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[36] != undefined){
													refLinkTypes0 = (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerplantCreditBonus].Value);
													//var refTotalPro = refPro + (refPac/(refPacperH/3600)) +  refLinkTypes0 ;
												}else {refLinkTypes0 = 0;}
											
												if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[37] != undefined){
													refLinkTypes1 = (city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.TiberiumCreditProduction].Value);
											//var refTotalPro = refPro + (refPac/(refPacperH/3600)) +  refLinkTypes0 +  refLinkTypes1  ;
												}else {refLinkTypes1 = 0;}
										   
												var refTotalPro = refPro + (refPac/(refPacperH/3600)) +  refLinkTypes0 +  refLinkTypes1  ;

												var refTotalProOfLevel12 = 605 + (7260/6) + 484 + 605; 
												var refProRatio = Math.pow( ((refTotalProOfLevel12/31608)*100)/((refTotalPro/refCost)*100), -1);
												refarr[refnum] = refProRatio;
												if ((refProRatio > 0) ){
													refarr.sort(function(a,b){return b-a});
												}
											
												if((Math.max(refProRatio) == refarr[0])){
														var Ref_obj = {
															cityid: city.get_Id(),
															basename: city.m_SupportDedicatedBaseName,
															building: building.get_UnitGameData_Obj().dn,
															buildinglevel: building.get_CurrentLevel(),
															posX: building.get_CoordX(),
															posY: building.get_CoordY(),
															isPaid: true
														}
												}
                                            }
											
                                        if ((tech == ClientLib.Base.ETechName.PowerPlant) && (building.get_CurrentLevel() > 2) &&(_this.p == 1)){
                                            var pow = building;
											pownum++;
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            //OwnProdModifiers.d[6].ConnectedLinkTypes.d[29].Value - OwnProdModifiers.d[6].ConnectedLinkTypes.d[38].Value - OwnProdModifiers.d[30].ConnectedLinkTypes.d[42].Value
                                            
                                            var powPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].TotalValue;
											var powPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerPackageSize].TotalValue;
                                            var powPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerBonusTimeToComplete].TotalValue;
                                            var powCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
                                            var powLinkTypes0 = 0;
											var powLinkTypes1 = 0;
											var powLinkTypes2 = 0;
											var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
                                            
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[29] != undefined ){
											 powLinkTypes0 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.AccumulatorPowerBonus].Value ;											
											 var powLinkTypes1 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.CrystalCreditProduction].Value ;
                                            //var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											//var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484;
											//console.log(powLinkTypes0);
											}else{var powLinkTypes0 = 0;}
											
											if( city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[38] != undefined ){
											 powLinkTypes1 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.CrystalCreditProduction].Value ;
                                            //var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											//var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											//console.log(powLinkTypes1);
											}else{var powLinkTypes1 = 0;}
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[42] != undefined){
											 powLinkTypes2 = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.RefineryPowerBonus].Value;
											//var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											//var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											//console.log(powLinkTypes2);
											}else{var powLinkTypes2 = 0;}
											
											
											var powTotalPro = powPro + (powPac/(powPacperH/3600)) + powLinkTypes0 +  powLinkTypes1 + powLinkTypes2 ;
											
                                            //var powTotalProOfLevel12 = 605 + (7260/6) + 570 + 456 + 484; 
											var powProRatio = Math.pow( ((powTotalProOfLevel12/164736)*100)/((powTotalPro/powCost)*100), -1);
                                           	powarr[pownum] = powProRatio;
                                            
                                            if ((powProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                           // console.log(((powTotalProOfLevel12/96000)*100)/((powTotalPro/refCost)*100) );
                                            powarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(powProRatio) == powarr[0])){
											var Pow_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
                           
                             }
                                            
                                        }
                                        if ((tech == ClientLib.Base.ETechName.Harvester   &&  building.get_CurrentLevel() > 2)){
                                            var harv = building;
											harnum++;   
											harnum1++;
                                            
                                             var hartibLinkTypes = 0;
											 var harcryLinkTypes = 0;
											 //OwnProdModifiers.d[1].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value - 
                              				
                                            if((city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[1,25,33]) && (_this.h == 1)){
											console.log("Sammler Tib (OwnProdModifiers.d[1,25,33]) : " + city.GetBuildingCache(bulid).DetailViewInfo)
                                            
                                            var hartibPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].TotalValue;
											//var hartibLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value;
                                            var hartibPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumPackageSize].TotalValue;
                                            var hartibPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete].TotalValue;
                                            
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction] != undefined){
											hartibLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction].Value;
											//var harTibTotalPro = hartibPro + (hartibPac/(hartibPacperH/3600)) + hartibLinkTypes;
											}else{hartibLinkTypes = 0;}
                                            
                                           var harTibTotalPro = hartibPro + (hartibPac/(hartibPacperH/3600)) + hartibLinkTypes;
                                            var harCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
                                            
                                            //var harTibTotalPro = hartibPro + (hartibPac/(hartibPacperH/3600)) ;
                                            var harTibTotalProOfLevel12 = 570 + (7260/6) + 380; 
                                            var harTibProRatio = Math.pow( ((harTibTotalProOfLevel12/95040)*100)/((harTibTotalPro/harCost)*100), -1);
                                            
                                            
                                           	
                                            hararr[harnum] = harTibProRatio;
                                            
                                            
                                            if ((harTibProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                           // console.log(((harTibTotalProOfLevel12/72000)*100)/((harTibTotalPro/refCost)*100) );
                                            hararr.sort(function(a,b){return b-a});
                                            }
                                                
                                            
                                            
                                            if((Math.max(harTibProRatio) == hararr[0])){
											var Har_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											type: "Tiberium",
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
                           
                             }
                                            }
                                            if((city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[4,26,34]) && (_this.h1 == 1)){
                                            //console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[4,26,34]);
                                          
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            //Production_Value = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].TotalValue;
											//Package = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalPackageSize].TotalValue;
											//Package_Per_Hour = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalBonusTimeToComplete].TotalValue;
											//Production = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction];
											//LinkType0 = Prodution.ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction].Value;
											//LinkType1 = ;
											//LinkType2 = ;
                                            
                                           
                                            
                                            var harcryPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].TotalValue;
											//var harcryLinkTypes =  city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction].Value;
                                            var harcryPac = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalPackageSize].TotalValue;
                                            var harcryPacperH = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalBonusTimeToComplete].TotalValue;
                                           
                                            var harCryCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
                                            
                                            if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction] != undefined){
											harcryLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction].Value;
											//var harCryTotalPro = harcryPro + (harcryPac/(harcryPacperH/3600)) + harcryLinkTypes;
											}else{var harcryLinkTypes = 0;}
                                            
                                            var harCryTotalPro = harcryPro + (harcryPac/(harcryPacperH/3600)) + harcryLinkTypes;
                                            var harCryTotalProOfLevel12 = 570 + (7260/6) + 380; 
                                            var harCryProRatio = Math.pow( ((harCryTotalProOfLevel12/95040)*100)/((harCryTotalPro/harCryCost)*100), -1);
                                           	
                                           
                                            hararr1[harnum1] = harCryProRatio;
                                            
                                            if ( harCryProRatio > 0 ){// Math.floor((Math.random()*10)+1)){
                                            //console.log(((harCryTotalProOfLevel12/96000)*100)/((harCryTotalPro/harCryCost)*100) );
                                          
                                            hararr1.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(harCryProRatio) == hararr1[0])){
											var Har1_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											type: "Crystal",
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
                          
                             }
                                            
                                            }
                                            
                                        }
                                        if((tech == ClientLib.Base.ETechName.Accumulator) && (building.get_CurrentLevel() > 2) && (_this.a == 1)){
											var acc = building;
											accnum++;
                                             //var refObj = Object();CreditsBonusTimeToComplete
                              				
                                            var accLinkTypes = 0;
											//OwnProdModifiers.d[6].ConnectedLinkTypes.d[41].Value
                                            
                                            var accPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].TotalValue;
											//var accLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus].Value;
                                            var accSto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerStorage].TotalValue;
                                            var accCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
                                            //var accTotalPro = accPro ;
                                             
                                            if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus] != undefined){
											var accLinkTypes = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus].Value;
											//var accTotalPro = accLinkTypes;
											}else{accLinkTypes = 0;}
											var accTotalPro = accLinkTypes;
											var accTotalProOfLevel12 = 456 ;
											var accProRatio = Math.pow( ((accTotalProOfLevel12/63360)*100)/((accTotalPro/accCost)*100), -1);
                                           	accarr[accnum] = accProRatio;
                                          
                                            if ((accProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
                                            //console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
                                            accarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(accProRatio) == accarr[0])){
											var Acc_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
                           
                             				} 
                                        }
                                        if((tech == ClientLib.Base.ETechName.Silo)        && (building.get_CurrentLevel() > 2)  && (_this.s == 1) ){
											var silo = building;
											silnum++;
                                            console.log("Silo Nr. " + silnum + "city.GetBuildingCache(bulid(" + bulid + ")).DetailViewInfo" +city.GetBuildingCache(bulid).DetailViewInfo);
											 //OwnProdModifiers.d[1].ConnectedLinkTypes.d[39].Value - OwnProdModifiers.d[4].ConnectedLinkTypes.d[40].Value
                              				//console.log(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d);
                                            var silCryLinkType = 0;
                                            var silTibLinkType = 0;
											var silTotalPro = 0;
                                            var silCryPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].TotalValue;
											//var silCryLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction].Value;
                                            var silTibPro = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].TotalValue;
											//var silTibLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction].Value;
                                            var silCrySto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalStorage].TotalValue;
                                            var silTibSto = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumStorage].TotalValue;
                                            var silCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[_this.g].Count;
                                            
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction] == undefined ){
											
											 silCryLinkType =  0 ;
											}else{silCryLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction].Value;
											//silTotalPro = silCryLinkType + silTibLinkType;
											}
											
											if(city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction] == undefined ){
											
											silTibLinkType = 0;
											}else{silTibLinkType = city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction].Value;
											//silTotalPro = silCryLinkType + silTibLinkType;
											}
											
											
                                           silTotalPro = silCryLinkType + silTibLinkType;
                                            var silTotalProOfLevel12 = 380 + 380 ; 
                                            var silProRatio = Math.pow( ((silTotalProOfLevel12/63360)*100)/((silTotalPro/silCost)*100), -1);
                                            
                                            
                                            silarr[silnum] = silProRatio;
                                            
                                            if ((silProRatio >= 0) ){// Math.floor((Math.random()*10)+1)){
                                            //console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
                                            silarr.sort(function(a,b){return b-a});
                                                
                                            
                                            }
                                            if((Math.max(silProRatio) == silarr[0])){
											var Sil_obj = {
											cityid: city.get_Id(),
                                     		basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
                                 //ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
                           
                             				}
											 //silCryLinkType = 0;
                                            //silTibLinkType = 0;
											//silTotalPro = 0;
                                        }
                                 //if((Ref_obj.toString() != "undefined" || Pow_obj.toString() != "undefined" || Har_obj.toString() != "undefined" || Har1_obj.toString() != "undefined" || Acc_obj.toString() != "undefined" || Sil_obj.toString() != "undefined")&&
                                  // (refarr.toString() != "[]" || powarr.toString() != "[]" || hararr.toString() != "[]" || hararr1.toString() != "[]" || accarr.toString() != "[]" || silarr.toString() != "[]")){
                                       
                                    
                                // }   
                                 //}
                                      
                                   
								}
								}catch(e)
									{
										console.log("1.: Fehler in \"The Building Function(Flunik-Script)\" ('for (var nBuildings in buildings.d){...}')  " + _this.Zeitstempel() );
										console.log("2.: Fehler: " + e.toString());
										_this.FehlerWindow.setLayout(new qx.ui.layout.VBox());
										_this.FehlerWindow.setWidth(500);
										if (!_this.FehlerWindow.isVisible()){
											var text = null;
											text = new qx.ui.basic.Label("<b>Ein dummer Fehler ist aufgetreten, frag mich nicht warum :( <br>Beim schließen dieses Fensters wird das Upgradetool gestoppt!<br> Warte dann ein paar Sekunden, klick dich mal durch deine Basen <br>und versuche den Autopiloten zu starten. Klappt manchmal ^^<br>ODER mach einfach nen reload ;) <br>MELDUNG:<br>"+ e.toString() +"</b>"); 
											text.setRich(true);
											text.setTextColor('darkorange');
											_this.FehlerWindow.removeAll();
											_this.FehlerWindow.add(text);
											_this.autoUpgradePopup.moveTo(50, 50);
											_this.FehlerWindow.open();
										}
									}
								
								
								
								
								
                     
					 /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					 if( (Ref_obj != undefined) || (Pow_obj != undefined) || (Har_obj != undefined) || (Har1_obj != undefined) || (Acc_obj != undefined) || (Sil_obj != undefined)){
                       console.log(Ref_obj, refarr);console.log(Pow_obj, powarr);console.log(Har_obj, hararr); console.log(Har1_obj, hararr1);console.log(Acc_obj, accarr);console.log(Sil_obj, silarr);
                           
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
							  }
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  
							  */
	/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/						  // console.log(baseName,refnum,pownum);
							  maxarr = [refarr[0], powarr[0], hararr[0], hararr1[0], accarr[0], silarr[0]];
							  maxarr.sort(function(a,b){return b-a});
						//	  /* 
						  if((_this.sperre == false) &&(offRT_obj != undefined)&& (_this.x == 0)){
								_this.sperre = true;
							  console.log(offRT_obj, _this.x);
							  _this.Auswertung(offRT_obj,"offRT_obj");
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", offRT_obj, null, null, true);
							  offRT_obj = {};
							  _this.sperre = false;
							  break;
							 }
							 
						//	  */
						//	  /* 	  
							  if((_this.sperre == false) &&(building_obj != undefined) && (_this.x == 0) ){
							  _this.sperre = true;
							  console.log(building_obj, _this.x);
							  _this.Auswertung(building_obj,"building_obj");
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
							  building_obj = {};
							  _this.sperre = false;
							  break;
							  
							 
							  }
							 //	  */ 
							  
							  if((_this.sperre == false)&&(LowResbuilding_obj != undefined)){
							  _this.sperre = true;
							  console.log(LowResbuilding_obj, _this.x );
							  _this.Auswertung(LowResbuilding_obj,"LowResbuilding_obj");
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", LowResbuilding_obj, null, null, true);
							  LowResbuilding_obj = {};
							  _this.sperre = false;
							 break;
							  }
						//	  /*
							 if((_this.sperre == false)&&(support_obj != undefined) && (_this.x == 0)){
								_this.sperre = true;
							  console.log(support_obj, _this.x);
							  _this.Auswertung(support_obj,"support_obj");
							  ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", support_obj, null, null, true);
							  support_obj = {};
							  _this.sperre = false;
							  break;
							  
							
							  
							  }
						//	  */
							  
							  if((_this.sperre == false)&&(Ref_obj != undefined) && (refarr.toString() != "") && (maxarr[0] == refarr[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||( building.get_CurrentLevel() > 2)*/
								_this.sperre = true;
								console.log(Ref_obj, refarr, _this.x);
								_this.Auswertung(Ref_obj,"Ref_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
								Ref_obj = {};
								refarr = [];
								maxarr = [];
								_this.sperre = false;
							 break; }
							  
							  if((_this.sperre == false)&&(Pow_obj != undefined)&& (powarr.toString() != "") && (maxarr[0] == powarr[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||*/
								_this.sperre = true;
								console.log(Pow_obj, powarr, _this.x);
								_this.Auswertung(Pow_obj,"Pow_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
								Pow_obj = {};
								powarr = [];
								maxarr = [];
								_this.sperre = false;
								break;
							  }
							  
							  if((_this.sperre == false)&&(Har_obj != undefined)&& (hararr.toString()!= "") && (maxarr[0] == hararr[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||*/
								_this.sperre = true;
								console.log(Har_obj, hararr, _this.x);
								_this.Auswertung(Har_obj,"Har_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
								Har_obj = {};
								hararr = [];
								maxarr = [];
								_this.sperre = false;
                             break;
							  }
							  
							  if((_this.sperre == false)&&(Har1_obj != undefined)&& (hararr1.toString() != "") && (maxarr[0] == hararr1[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||*/
							  _this.sperre = true;
								console.log(Har1_obj, hararr1, _this.x);
								_this.Auswertung(Har1_obj,"Har1_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
								Har1_obj = {};
								hararr1 = [];
								maxarr = [];
								_this.sperre = false;
                             break;
							  }
							  
							  if((_this.sperre == false)&&(Acc_obj != undefined)&& (accarr.toString() != "") && (maxarr[0] == accarr[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||*/
								_this.sperre = true;
								console.log(Acc_obj, accarr, _this.x);
								_this.Auswertung(Acc_obj,"Acc_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
								Acc_obj = {};
								accarr = [];
								maxarr = [];
								_this.sperre = false;
                            break;
							  }
							  
							  if((_this.sperre == false)&&(Sil_obj != undefined)&& (silarr.toString() != "") && (maxarr[0] == silarr[0]) && (((_this.totalRepairTime(airRT, vehRT, infRT) < 14400) && (_this.x == 0))||(_this.x == 1))){/*(_this.totalRepairTime(airRT, vehRT, infRT) < 14400)||*/
								_this.sperre = true;
								console.log(Sil_obj, silarr, _this.x);
								_this.Auswertung(Sil_obj,"Sil_obj");
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
								Sil_obj = {};
								silarr = [];
								maxarr = [];
								_this.sperre = false;
                              break;
							  }
/*						  
**************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions end
**************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
	*/								
                               
							}
                             
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
					if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined'){
							for (var key in ClientLib.Base.Util)
							{
								var strFunction = ClientLib.Base.Util[key].toString();
								if ((strFunction.indexOf("function (a,b,c)") == 0 || strFunction.indexOf("function (a,b)") == 0) &&
									 strFunction.indexOf("*=1.1") > -1)
								{
										FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
										console.log("FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util["+key+"]");
										break;
								}
							}
						}else{
							FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;	
							

						
					}
					                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");


					FlunikTools.Main.getInstance();
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