// ==UserScript==
// @name	LoU Purple Rain
// @description	Purple Rain tweaks for LoU
// @namespace	technomyth
// @include	http://prodgame*.lordofultima.com/*/index.aspx*
// @version	0.0.1.8
// ==/UserScript==

(function(){

var PR_mainFunction = function() {
	function PR_StartRain() {
		var PR = {};
		var LT = PR; // For LT borrowed functions

		PR_strings = {
			"en" : {
				"options_btn_tt": "LoU Purple Rain Options",
				"scan_btn_text": "Scan",
				"scan_btn_tt": "Scan World",
				"one": "one",
			}
		}
		
		qx.Class.define("louPR.main", {
			type: "singleton",
			extend: qx.core.Object,
			members: {
				app : null,
				srvBar: null,
				worldView: null,
				language: null,
				miniMap: null,
				options: null,
				initialize : function() {
					this.app = qx.core.Init.getApplication();
					this.srvBar = this.app.serverBar;
					this.worldView = this.app.worldView;
					this.language = qx.locale.Manager.getInstance().getLocale();
					if (!/en/.test(this.language)) this.language = "en";
					this.rain();
				},
				rain : function() {
					this.loadOptions();
					PR.options = this.options;
					PR.a = this.app;
					PR.main = this;
					
					this.miniMap = new window.louPR.miniMap();
					if (!this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
						this.app.desktop.add(this.miniMap.clientArea, {right: 0, top: 133});
					} else {
						this.app.desktop.add(this.miniMap.clientArea, {right: 0, top: 62});
					}
					
					this.app.visMain.addListener("changeMapLoaded", this.miniMap.updateCameraPos, this.miniMap);
					webfrontend.data.City.getInstance().addListener("changeVersion", this.miniMap.updateCameraPos, this.miniMap); // hack to redraw map in region view while switching cities
					qx.bom.Element.addListener(this.app.worldView, "mouseup", PR.main.miniMap.updateCameraPos, this.miniMap);
					// Create Option Button
					//btn = new qx.ui.form.Button("O");
					//btn.set({width: 30, appearance: "button-text-small", toolTipText: L("options_btn_tt")});

					//btn.addListener("click", this.showOptionsPage, this);
					//this.srvBar.add(btn, {top: 2, left: 390});
					// Create Scan Button
					btn2 = new qx.ui.form.Button(L("scan_btn_text"));
					btn2.set({width: 60, appearance: "button-text-small", toolTipText: L("scan_btn_tt")});
					btn2.addListener("click", this.showScanPage, this);
					this.srvBar.add(btn2, {top: 2, left: 440});
					//qx.bom.Element.addListener(this.worldView, "mouseover", PR.main.worldHover, this);
					//this.app.worldViewToolTip.addListener("appear", PR.main.worldToolTip, this);
				},
				loadOptions: function() {
					forceSave = false;
					// Try to load PR options string 
					_str = localStorage.getItem("PR_options");
					// if we have an options string 
					if (_str) {
						// interpret it as JSON
						this.options = qx.util.Json.parse(_str);
					} else {
						// Generate default options
						this.options = {
							"showMiniMap": true,
							"miniMapColors": [ "#00C0FF", "#0000FF", "#00FF80", "#468246", "#E0E060", "#969640", "#FF8080", "#FF0000", "#00C8C8", "#008080", "#8C4600", "#643200", "#C0C0C0", "#737373", "#FFFFFF", "#000000", "#FFFFFF", "#000000" ],
							"miniMapMark": [ 3, 3, 3, 3, 3, 3, 3, 1, 1 ]
						};
					}
				},
					worldToolTip : function() {
					console.log("worldToolTip");
					pl = webfrontend.data.Player.getInstance();
					console.log(pl);
					var tip = this.app.worldViewToolTip;
					var mode = tip.getMode();
					console.log(tip);
					console.log("Mode=" + mode);
				},
				worldHover : function() {
					alert("WorldHover");
				},
				getLanguage : function() {
					return this.language;
				},
				showScanPage : function () {
					
				}
			}
		});
		//qx.Class.define("louPR.scanWorld", {
		//	
		//}
		// LoU PR Mini Map
		// Parts borrowed from LoU Tweak
		qx.Class.define("louPR.miniMap", {
			extend: qx.core.Object,
			construct: function () {
				this.clientArea = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.clientArea.setWidth(200);
			
				// ----- MiniMap container
				this.miniMapCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.miniMapCont.setHeight(228);
				this.miniMapCont.setWidth(200);
				this.miniMapCont.setAllowGrowY(false);
				this.miniMapCont.setAllowGrowX(false);
				
				// ----- Background
				var background = new qx.ui.core.Widget();
				background.setBackgroundColor("black");
				//background.setOpacity(0.70);
				this.miniMapCont.add(background, {top: 14, left: 0, bottom: 0, right: 0});
				
				// ----- Title bar
				this.titleBar = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.titleBar.setHeight(28);
				this.titleBar.setWidth(200);
				
				var titleBarLeft = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAiCAYAAABmzUjmAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAGYktHRAD%2FAP8A%2F6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfaCQQTFBTXF37OAAACIklEQVQ4y3WUvW4TURCFvzN3f5wEEE0CdDQQCdFFSCiPEIQUhERLS0PavAIPkjqiSB7BCLcokUhDESMSFAkJWUqMY%2B9Q3LubdWy72ea7Z%2BacGY%2BY%2FS0Bz4EtYAO4C6AF0Fvg9d7u5jMWKL0APgHHe7ub%2FuHVE39wb8kf3V92LVLqHl1w8PWMIs%2FIQ0DzoC9HFxz0zlkuC8oiJwQjmwcd9s5Z6RR0yoIiC5iJLLmL0PEFh73frHRKOmVOkWWYCSmCG3VPh71z7nRKljo5RZYjEybhgNU5fe7%2BpFPklEVOmRcEE8GEBCbI6myCGXkWKPKMYIZMgDfZNaCZEYJhJizUqWkWFCAUQWJfSpx7CwQwKWqYkLc0ra2Ynkc9kNWYI58qHfOSiSDD8VRb0HZNisEkkLCoheTTPYpYTwKz2pqn71SPN84l0dh2R1Olqadg1D5cmlVEJDPEqXjdjkBOlvaRm7dqokqGceI%2BXjXxGJglZUXXMSW%2FbSaqWW2mHmPaR27PW3UE9WzaOVbuVO64e%2BtRVBMekwCoJhXX4zHXk4rJxJslMUApsgHA1suHXA5HXA2HjK5HTKp6hHFaAXi63%2B2v7bxZXy1yOOkP0hKLIDV%2FrgBcAqP9bn9tZ3t9tcjg5HSQNt0IFjCLir%2Fa8Mft9dUic076g5QAVB5B5sF5cL6f%2FqWaOONx1YALYPj24w%2FD0b%2BZs0e6aFvAu%2FbZmwcCvAcetw%2Fpf3gLrPIAPHPVAAAAAElFTkSuQmCC");
				titleBarLeft.setScale(true);
				titleBarLeft.setHeight(28);
				var titleBarSpan = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAiCAYAAACeLbMRAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJBBMSEx8pTOsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAGpJREFUCNdFzLEJwlAAhOH%2F%2FiAhSaGtI2QFd3GONI7jHhnIJiSgSIpnER42x8F3HMDMc7oVrpe%2BeB467LsW21ODRiRBAyapQTAGBYxiAD3GwUSM1Jaq8P%2BrkAMKfr47rtsbX8uCj%2FsIwPwDxxsQYxM1b7kAAAAASUVORK5CYII%3D");
				titleBarSpan.setScale(true);
				titleBarSpan.setAllowGrowX(true);
				titleBarSpan.setHeight(28);

				var titleBarOrnmt = new qx.ui.basic.Image("webfrontend/ui/win_mainoverlay_ornament.png");
				titleBarOrnmt.setHeight(22);
				titleBarOrnmt.setWidth(148);

				this.contLabel = new qx.ui.basic.Label().set({font: "bold"});
				this.contLabel.setTextColor("text-gold");

				this.coordLabel = new qx.ui.basic.Label().set({font: "bold"});
				this.coordLabel.setTextColor("text-gold");
				
				btn = new qx.ui.form.Button(null,"webfrontend/ui/icons/icon_chat_resize_minimize.png").set({appearance: "button-text-small", padding: [0,0,0,0]});
				btn.addListener("execute", this.minimizeMap, this);

				this.titleBar.add(titleBarLeft,{top: 0, bottom: 0, left: 0});
				this.titleBar.add(titleBarSpan,{top: 0, bottom: 0, left: 10, right: 0});
				this.titleBar.add(titleBarOrnmt,{top: 2, right: 5});
				this.titleBar.add(this.contLabel,{bottom: 7, left: 8});
				this.titleBar.add(this.coordLabel,{bottom: 7, left: 33});
				this.titleBar.add(btn, {top: 4, right: 2});
				
				// ----- Drawing area
				this.da = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.da.setHeight(200);
				this.da.setWidth(200);
				this.da.setZIndex(1000);
				
				this.camera = new qx.ui.core.Widget().set({width: 12, height: 10, zIndex: 1001, decorator: new qx.ui.decoration.Single(1, "solid", "#c3a67f")});
				this.da.addListener("mouseup", this.onMapClick, this);
				this.da.add(this.camera);
				
				this.worldGrid = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.worldGrid.setHeight(196);
				this.worldGrid.setWidth(196);
				this.worldGrid.setZIndex(1005);
				this.worldGrid.setVisibility("hidden");
				this.worldCamera = new qx.ui.core.Widget().set({width: 8, height: 8, zIndex: 1006, decorator: new qx.ui.decoration.Single(2, "solid", "#c3a67f")});
				this.worldGrid.add(this.worldCamera);
				this.da.add(this.worldGrid, {left: 2, top: 2});
				
				this.statsBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.statsBox.setHeight(28*5);
				this.statsBox.setWidth(200);
				
				labels = ["Own Cities", "Own Castles", "Alliance Cities", "Alliance Castles", "Allied Cites", "Allied Castles",
							"NAP Cities", "NAP Castles", "Enemy Cities", "Enemy Castles", "Other Cities", "Other Castles", "Lawless Cities", "Lawless Castles", 
							"Free Spaces", "Bosses", "Dungeons"];
				
							
				var layout = new qx.ui.layout.Grid();
				layout.setColumnAlign(0, "right", "top");
				layout.setColumnAlign(1, "left", "top");
				layout.setColumnWidth(0, 150);
				layout.setColumnWidth(1, 50);
				
				this.statsBox.setLayout(layout);	
				
				this.countersLabels = new Array(labels.length);
				
				for (var i=0; i < labels.length; i++) {
 					this.statsBox.add(new qx.ui.basic.Label(labels[i]).set({
    					allowShrinkX: true,
    					paddingTop: 3,
    					paddingRight: 5,
    					textColor: "text-gold"
 					}), {row: i, column : 0});
 					this.countersLabels[i] = new qx.ui.basic.Label("").set({
    					allowShrinkX: true,
    					paddingTop: 3,
    					paddingLeft: 5,
    					textColor: "text-gold"});
    				this.statsBox.add(this.countersLabels[i], {row: i, column:1});
    			}
					// 0, 1 self
					// 2, 3 alliance 0
					// 4, 5 allied 1
					// 6, 7 enemy 2
					// 8, 9 nap 3
					// 10, 11 other 4
					// 12, 13 lawless
					// 14 moongate
					// 16 shrine
					// 17 freeslot
					// 19 bosses
					// 20 dungeons
				//this.allianceCitiesLabel = new qx.ui.basic.Label().set
				//this.statsBox.set
				this.miniMapCont.add(this.da, {top: 28, left: 0});
				this.miniMapCont.add(this.titleBar, {top: 0, left: 0});
				this.miniMapCont.add(this.statsBox, {top: 228, left: 0});
				// ----- -----

				// ----- Show MiniMap button
				this.restoreBtn = new qx.ui.form.Button("Map","webfrontend/ui/icons/icon_chat_resize_maximize.gif").set({appearance: "button-text-small", width: 60, height: 25});
				this.restoreBtn.addListener("execute", this.restoreMap, this);
				
				this.miniMapCont.setVisibility("excluded");
				this.clientArea.add(this.miniMapCont);
				this.clientArea.add(this.restoreBtn, {right: 0, top: 0});
				// ----- -----
				
				// ----- Map array
				this.map = new Array(700);
				for (i=0; i<700; i++) {
					this.map[i] = new Array(700);
				}
				p = webfrontend.data.Player.getInstance();
				this.playerCont = new Array();
				for (var ci in p.cities) {
					this.map[p.cities[ci].xPos][p.cities[ci].yPos] = 0;
					this.playerCont.push(Math.floor(p.cities[ci].xPos/100) + Math.floor(p.cities[ci].yPos/100)*10);
				}
				this.drawWorldGrid();
				this.cityPoints = new Array();
				this.prevCont = -1;
				// ----- -----
			},
			members: {
				clientArea: null,
				miniMapCont: null,
				titleBar: null,
				contLabel: null,
				coordLabel: null,
				da: null,
				map: null,
				worldGrid: null,
				worldCamera: null,
				camera: null,
				playerCont: null,
				cityPoints: null,
				restoreBtn: null,
				prevCont: null,
				countersLabels: null,
				getContinentPrefix: function() {
					x = y = 0;
					if (LT.a.visMain.mapmode == "r") {
						x = Math.floor(LT.a.cameraPos.x / LT.a.visMain.getTileWidth());
						y = Math.floor(LT.a.cameraPos.y / LT.a.visMain.getTileHeight());
					} else if (LT.a.visMain.mapmode == "c") {
						c = webfrontend.data.City.getInstance();
						x = c.getId() & 0xFFFF;
						y = c.getId() >> 16;
					}
					if (x < 0) x = 0;
					if (x > 699) x = 699;
					if (y < 0) y = 0;
					if (y > 699) y = 699;
					return {
						px:Math.floor(x/100), // prefix x
						py:Math.floor(y/100), // prefix y
						csx:Math.floor(x/100)*100, // cont start x
						csy:Math.floor(y/100)*100, // xont start y
						cx:x, // x
						cy:y // y
					};
				},
				createPoint: function (x, y, clr) {
					var point = new qx.ui.core.Widget();
					point.setBackgroundColor(LT.options.miniMapColors[clr]);
					point.setHeight(2);
					point.setWidth(2);
					this.da.add(point, {
						top: y*2,
						left: x*2
					});
					return point;
				},
				clearMap: function (b) {
					if (b != "c") {
						for (var i=0; i<this.cityPoints.length; i++) {
							x = this.cityPoints[i].x;
							y = this.cityPoints[i].y;
							if (x > b[0] && x < b[1] && y > b[2] && y < b[3]) {
								this.cityPoints[i].p.destroy();
								this.cityPoints.splice(i, 1);
								i--;
							}
						}
					} else {
						for (var i=0; i<this.cityPoints.length; i++)
							this.cityPoints[i].p.destroy();
					}
				},
				drawMap: function(type) {
					//start = new Date().getTime();
					counters = new Array(21);
					for(var i=0; i < counters.length; i++) {
						counters[i] = 0;
					}
					bounds = [ cp.csx, cp.csx+100, cp.csy, cp.csy+100 ];
					for (i=bounds[0]; i<bounds[1]; i++) {
						for (j=bounds[2]; j<bounds[3]; j++) {
							if (this.map[i][j] != undefined) {
								if (this.map[i][j] == -1) {
									continue;
									}
								v = this.map[i][j];
								counters[v]++;
							}
						}
					}
					cp = this.getContinentPrefix();
					if (type != "c") {
						bounds = [ cp.cx-15, cp.cx+15, cp.cy-15, cp.cy+15 ];
						this.clearMap(bounds);
					} else {
						bounds = [ cp.csx, cp.csx+100, cp.csy, cp.csy+100 ];
						this.clearMap("c");
						this.cityPoints = new Array();
					}
					this.updateLabels(cp);
					bounds = [
						(bounds[0]<cp.csx?cp.csx:bounds[0]),
						(bounds[1]>cp.csx+100?cp.csx+100:bounds[1]),
						(bounds[2]<cp.csy?cp.csy:bounds[2]),
						(bounds[3]>cp.csy+100?cp.csy+100:bounds[3])
					];
					for (i=bounds[0]; i<bounds[1]; i++) {
						for (j=bounds[2]; j<bounds[3]; j++) {
							if (this.map[i][j] != undefined) {
								if (this.map[i][j] == -1) {
									LT.debug("Undefined at: " + i + ":" + j);
									continue;
								}
								v = this.map[i][j];
								t = Math.floor(v/2);
								if ( ((t == 7 || t == 8) && LT.options.miniMapMark[t] == 1) || (t != 7 && t != 8 && ((LT.options.miniMapMark[t] == (v%2)+1) || LT.options.miniMapMark[t] == 3))) {
									this.cityPoints.push({p:this.createPoint(i%100, j%100, v), x:i, y:j});
								}
							}
						}
					}
					this.updateCounters(counters);
					//LT.debug("D: " + (new Date().getTime()-start));
				},
				onMapClick: function(e) {
					if (e.getButton() == "left") {
						try {
							mx = this.da.getContainerLocation()["left"];
							my = this.da.getContainerLocation()["top"];

							mx = e.getViewportLeft() - mx;
							my = e.getViewportTop() - my;
							
							cp = this.getContinentPrefix();
							if (this.worldGrid.getVisibility() == "visible")
								LT.a.setMainView('r', 0, Math.floor(mx/2)*7 * LT.a.visMain.getTileWidth(), Math.floor(my/2)*7 * LT.a.visMain.getTileHeight());
							else
								LT.a.setMainView('r', 0, (cp.csx + mx/2) * LT.a.visMain.getTileWidth(), (cp.csy + my/2) * LT.a.visMain.getTileHeight());
							this.updateCameraPos();
						} catch(e) { LT.debug(e); }
					} else if (e.getButton() == "right") {
						if (this.worldGrid.getVisibility() == "hidden")
							this.worldGrid.setVisibility("visible");
						else
							this.worldGrid.setVisibility("hidden");
					}
				},
				updateContinent: function() {
					//non-castle/castle
					// 0, 1 self
					// 2, 3 alliance 0
					// 4, 5 allied 1
					// 6, 7 enemy 2
					// 8, 9 nap 3
					// 10, 11 other 4
					// 12, 13 lawless
					// 14 moongate
					// 16 shrine
					// 17 freeslot
					// 19 bosses
					// 20 dungeons
					if (LT.a.visMain.mapmode == "r") {
						p = webfrontend.data.Player.getInstance().getName();
						v = LT.a.visMain.cells;
						//
						// if 'cells' object is empty (new version)
						//
						if (qx.lang.Object.isEmpty(v)) {
							clib = ClientLib.Vis.VisMain.GetInstance();
							region_object = clib.get_Region();
							if (region_object == null || region_object == undefined) return;
							for (var o in region_object) {
								if (region_object[o] != null && region_object[o].hasOwnProperty("d"))
									data_object = region_object[o];
							}
							if (data_object == null || data_object == undefined) return;
							d_object = data_object.d;
							if (d_object == null || d_object == undefined) return;

							for (var n in d_object) {
								data_table = null;
								// this is just way too much, but couldn't find better solution to get obfuscated and version changing variables
								try {
									for (var dob in d_object[n]) {
										if (d_object[n][dob] instanceof Array && d_object[n][dob].length == 32) {
											for (e=0; e<d_object[n][dob].length; e++) {
												r = d_object[n][dob][e];
												if (r == null && typeof r == "object") {
													data_table = d_object[n][dob];
													break;
												} else {
													for (f=0; f<r.length; f++) {
														if (r[f] == null && typeof r[f] == "object") {
															data_table = d_object[n][dob];
															break;
														}
													}
												}
											}
										}
										if (data_table != null) break;
									}
								} catch (e) {
									
								}
								//data_table = d_object[n].SIB;
								if (data_table == null || data_table == undefined) continue;
								for (q=0; q<data_table.length; q++) {
									row = data_table[q];
									for (w=0; w<row.length; w++) {
										if (row[w] != null) {
											aid = 0;
											pln = "";
											if (typeof row[w].get_AllianceId != 'undefined')
												aid = row[w].get_AllianceId();
											if (typeof row[w].get_PlayerName != 'undefined')
												pln = row[w].get_PlayerName();
											crd = row[w].get_Coordinates();
											posX = crd & 0xFFFF;
											posY = crd >> 16;
											uit = row[w].get_UIType();
											// uit - City / LawlessCity / Shrine / Dungeon / Boss / FreeSlot / null (moongate)
											if (/City/.test(uit)) {
												if (/military|palace/i.test(row[w].get_ImagePath())) uit = uit.replace(/City/, "Castle");
											}
											//console.log(aid + ", (" + posX + ":" + posY +"), " + uit);
											if (/Lawless/.test(uit))
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), -1);
											else if (pln == p)
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), -2);
											else if (pln != p && pln != "")
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), aid);
											else if (uit == "Shrine")
												this.map[posX][posY] = 16;
											else if (uit == "FreeSlot") {
												this.map[posX][posY] = 17;
												}
											else if (uit == "Boss")
												this.map[posX][posY] = 19;
											else if (uit == "Dungeon")
												this.map[posX][posY] = 20;
											else if (uit == null)
												this.map[posX][posY] = 14; // moongate
										}
									}
								}
							} // for d_object
						} else {
							for (var id in v) {
								if (v != null) {
									for (var e in v[id].entities) {
										if (!(v[id].entities[e] instanceof webfrontend.vis.WorldTerrain)) {
											if (v[id].entities[e] instanceof webfrontend.vis.WorldCity) {
												if (v[id].entities[e].playerName == "") this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, -1);
												else {
													if (v[id].entities[e].playerName != p)
														this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, v[id].entities[e].allianceId);
													else if (v[id].entities[e].playerName == p)
														this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, -2);
												}
											} else if (v[id].entities[e] instanceof webfrontend.vis.WorldShrine) {
												this.map[(v[id].entities[e].shrineId & 0xFFFF)][(v[id].entities[e].shrineId >> 16)] = 16;
											} else if (v[id].entities[e] instanceof webfrontend.vis.WorldObject) {
												if (v[id].entities[e].image != undefined) {
													if (v[id].entities[e].image.url.indexOf("moongate") != -1)
														this.map[Math.floor(v[id].entities[e].posX/LT.a.visMain.getTileWidth())][Math.ceil(v[id].entities[e].posY/LT.a.visMain.getTileHeight())] = 14;
												}
											}
										}
									}
								}
							}
						} // end else
					}
				},
				updateCameraPos: function() {
					if (LT.options.showMiniMap) {
						cp = this.getContinentPrefix();
						if (LT.a.visMain.mapmode == "r") {
							this.updateLabels(cp);
							this.updateContinent();
							if ((cp.py*10+cp.px) != this.prevCont) {
								this.drawMap("c");
								this.prevCont = cp.py*10+cp.px;
							} else {
								this.drawMap("p");
							}
							camX = ((cp.cx%100)*2)-5;
							camY = ((cp.cy%100)*2)-4;
							if (camX < 0) camX = 0;
							if (camX > 188) camX = 188;
							if (camY < 0) camY = 0;
							if (camY > 188) camY = 188;
							this.camera.set({marginLeft: camX, marginTop: camY});
							this.worldCamera.set({marginLeft: (Math.floor(cp.csx+camX/2)/7)*2-4, marginTop: (Math.floor(cp.csy+camY/2)/7)*2-4});
						} else if (LT.a.visMain.mapmode == "c") {
							this.updateLabels(cp);
							if ((cp.py*10+cp.px) != this.prevCont) {
								this.drawMap("c");
								this.prevCont = cp.py*10+cp.px;
							}
						}
					}
				},
				
				updateLabels: function(o) {
					this.contLabel.setValue("c" + (o.py*10+o.px));
					this.coordLabel.setValue(o.cx + ":" + o.cy);
				},
				updateCounters: function(counters) {
					// Fix up alliance 
					for(var i = 0; i < 14; i++) {
						this.countersLabels[i].setValue("" + counters[i]);
					}
					this.countersLabels[14].setValue("" + counters[17]);
					this.countersLabels[15].setValue("" + counters[19]);
					this.countersLabels[16].setValue("" + counters[20]);
				},
				drawWorldGrid: function() {
					cont = new qx.ui.container.Composite(new qx.ui.layout.Grid());
					contStr = "|" + this.playerCont.join("|") + "|";
					for (i=0; i<7; i++) {
						for (j=0; j<7; j++) {
							cell = new qx.ui.basic.Atom(""+j+""+i).set({ textColor: "#ccffcc", backgroundColor: (contStr.indexOf("|"+j+""+i+"|") != -1 ? "#007700":"#005500"), height: 28, width: 28, center: true, font: "bold", decorator: new qx.ui.decoration.Single(1, "solid", "#003300") });
							cont.add(cell, {column: i, row: j});
						}
					}
					this.worldGrid.add(cont);
				},
				minimizeMap: function() {
					this.miniMapCont.setVisibility("excluded");
					this.restoreBtn.setVisibility("visible");
				},
				restoreMap: function() {
					this.miniMapCont.setVisibility("visible");
					this.restoreBtn.setVisibility("excluded");
				},
				getAllyRelation: function(id) {
					if (id == -1) return -1;
					agi = webfrontend.data.Alliance.getInstance();
					if (id > 0 && id == agi.getId()) return 0;
					rd = agi.getRelationData();
					for (r=0; r<rd.length; r++) {
						if (rd[r].a == id) {
							return rd[r].r;
						}
					}
					return 4;
				},
				getCityType: function(cid, aid) {
					ct = -1;
					if ((cid >= 0 && cid <= 7) || (cid >= 30 && cid <= 37)) ct = 2; // non castle city
					else if ((cid >= 10 && cid <= 15) || (cid >= 40 && cid <= 45)) ct = 3; // castle
					else if ((cid >= 20 && cid <= 24) || (cid >= 50 && cid <= 54)) ct = 3; // palace
					if (aid == -1) return ct+10;
					if (aid == -2) return ct-2;
					rt = this.getAllyRelation(aid);
					return (ct == -1) ? -1 : rt*2 + ct;
				}
			}
			// .id in webfrontend.vis.WorldCity
			// noncas nonlaw 0-7
			// cas nonlaw 10-15
			// pal nonlaw 20-24
			
			// noncas law 30-37
			// cas law 40-45
			// pal law 50-54
			
			// noncas ruins 60
			// cas ruins 70
			// pal ruins 80
		});
	}

	function L(str) {
		return PR_strings[window.louPR.main.getInstance().getLanguage()][str];
	}

	function PR_checkIfLoaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication();
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					PR_StartRain();
					window.louPR.main.getInstance().initialize();
				} else {
					window.setTimeout(PR_checkIfLoaded, 1000);
				}
			} else {
				window.setTimeout(PR_checkIfLoaded, 1000);
			}
		} catch(e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}

	if (/lordofultima\.com/i.test(document.domain)) {
		window.setTimeout(PR_checkIfLoaded, 1000);
	}
}

	// injecting Script into LoU
	var louPurpleRainScript = document.createElement("script");
		txt = PR_mainFunction.toString();
		louPurpleRainScript.innerHTML = "(" + txt + ")();";
		louPurpleRainScript.type = "text/javascript";
	if(/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louPurpleRainScript);
})();
