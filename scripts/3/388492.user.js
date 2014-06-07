// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Sector HUD
// @description     Displays a tiny HUD with the Sector you are viewing.
// @author          Eistee
// @version         13.12.18.Sector
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/172683.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/172683/large.png
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 */
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("SectorHUD", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					this.SectorText = new qx.ui.basic.Label("").set({
						textColor : "#FFFFFF",
						font : "font_size_11"
					});
					var HUD = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
						decorator : new qx.ui.decoration.Background().set({
							backgroundRepeat : "no-repeat",
							backgroundImage : "webfrontend/ui/menues/notifications/bgr_ticker_container.png",
							backgroundPositionX : "center"
						}),
						padding : 2,
						opacity: 0.8
					});
					HUD.add(this.SectorText);
					HUD.addListener("click", function (e) {
						if (e.getButton() == "left") this.paste_Coords();
						if (e.getButton() == "right") this.jump_Coords();
					}, this);
					this.__refresh = false;
					qx.core.Init.getApplication().getDesktop().add(HUD, {left: 128, top: 0});
					phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this._update);
				},
				destruct: function () {},
				members: {
					__refresh: null,
					SectorText: null,
					get_SectorText: function (i) {
						var qxApp = qx.core.Init.getApplication();
						switch (i) {
						case 0:
							return qxApp.tr("tnf:south abbr");
						case 1:
							return qxApp.tr("tnf:southwest abbr");
						case 2:
							return qxApp.tr("tnf:west abbr");
						case 3:
							return qxApp.tr("tnf:northwest abbr");
						case 4:
							return qxApp.tr("tnf:north abbr");
						case 5:
							return qxApp.tr("tnf:northeast abbr");
						case 6:
							return qxApp.tr("tnf:east abbr");
						case 7:
							return qxApp.tr("tnf:southeast abbr");
						}
					},
					get_SectorNo: function (x, y) {
						var WorldX2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldWidth() / 2),
							WorldY2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldHeight() / 2),
							SectorCount = ClientLib.Data.MainData.GetInstance().get_Server().get_SectorCount(),
							WorldCX = (WorldX2 - x),
							WorldCY = (y - WorldY2),
							WorldCa = ((Math.atan2(WorldCX, WorldCY) * SectorCount) / 6.2831853071795862) + (SectorCount + 0.5);
						return (Math.floor(WorldCa) % SectorCount);
					},
					get_Coords: function () {
						var Region = ClientLib.Vis.VisMain.GetInstance().get_Region();
							GridWidth = Region.get_GridWidth(),
							GridHeight = Region.get_GridHeight(),
							RegionPosX = Region.get_PosX(),
							RegionPosY = Region.get_PosY(),
							ViewWidth = Region.get_ViewWidth(),
							ViewHeight = Region.get_ViewHeight(),
							ZoomFactor = Region.get_ZoomFactor(),
							ViewCoordX = Math.floor((RegionPosX + ViewWidth / 2 / ZoomFactor) / GridWidth - 0.5),
							ViewCoordY = Math.floor((RegionPosY + ViewHeight / 2 / ZoomFactor) / GridHeight - 0.5);
						return {X: ViewCoordX, Y: ViewCoordY};
					},
					paste_Coords: function(){
						var Coords = this.get_Coords(),
							input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(),
							inputDOM = input.getContentElement().getDomElement(),
							text = [];
						text.push(inputDOM.value.substring(0, inputDOM.selectionStart));
                        //text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]" 
                        
						text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]" + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");	
                        
                        text.push(inputDOM.value.substring(inputDOM.selectionEnd, inputDOM.value.length));
						input.setValue(text.join(' '));
					},
					jump_Coords: function(){
						var coords = prompt("Jump to Coords:");
						if (coords) {
							coords.replace(/(\[coords\])?([#])?(\d{1,4})\D(\d{1,4})(\D\w+)?(\[\/coords\])?/gi, function () {
								if (arguments.length >= 5) {
									ClientLib.Vis.VisMain.GetInstance().get_Region().CenterGridPosition(parseInt(arguments[3], 10), parseInt(arguments[4], 10));
								}
							});
						}
					},
					_update: function () {
						if (this.__refresh === false) {
							this.__refresh = true;
							setTimeout(this.__update.bind(this), 500);
						}
					},
					__update: function () {
						var Coords = this.get_Coords();
						this.SectorText.setValue(Coords.X + ":" + Coords.Y + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");
						this.__refresh = false;
					}
				}
			});
		}
		function waitForGame() {
			try {
				if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
					var app = qx.core.Init.getApplication();
					if (app.initDone === true) {
						try {
							console.time("loaded in");
							createClasses();
							SectorHUD.getInstance();
							console.group("WarChiefs - Sector HUD");
							console.timeEnd("loaded in");
							console.groupEnd();
						} catch (e) {
							console.group("WarChiefs - Sector HUD");
							console.error("Error in waitForGame", e);
							console.groupEnd();
						}
					} else
						window.setTimeout(waitForGame, 1000);
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.group("WarChiefs - Sector HUD");
				console.error("Error in waitForGame", e);
				console.groupEnd();
			}
		}
		window.setTimeout(waitForGame, 1000);
	};
	var script = document.createElement("script");
	var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
})();