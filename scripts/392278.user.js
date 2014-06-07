// ==UserScript==
// @name        C&C Tiberium Alliances Ultimate Pack WWR
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
/* @description Pack of Scripts for C&C
                Liste der Scripte:
					- infernal wrapper: 0.390737.5												140988
					- Tiberium Alliances Info Sticker: 1.11.06									176992
					- C&C:TA CNCOpt Link Button: 1.7.6											131289
					- TACS 3 (Tiberium Alliances Combat Simulator): 3.01b						138212
					- Tiberium Alliances PvP/PvE Player Info Mod 1.2							159150
					- Command & Conquer TA POIs Analyser - Version: 2.0.1						171353
					- Command & Conquer TA World Map - Version: 1.0.0							173330
					- C&C:Tiberium Alliances Maelstrom Tools - Version: 0.1.3.2					140991
					- C&C:Tiberium Alliances Maelstrom ADDON Basescanner: 1.8.4					145168
					- Tiberium Alliances Zoom - Version: 1.0.1									138436
					- C&C: Tiberium Alliances Chat Helper Enhanced - Version: 3.1.6				152177
					- Tiberium Alliances - New Resource Trade Window - Version: 1.4.7			168297
					- Tiberium Alliances BaseNavBar Reorderer - Version: 1.0					165625
					- CnC: MH Tiberium Alliances Available Loot Summary : 1.8.3					137978
					- PluginsLib - mhShortcuts - Tiberium Alliances: 1.8.3						135806
					- PluginsLib - mhNavigator - Tiberium Alliances - Version: 1.34				159496
					- C&C:Tiberium Alliances Coords Button - All - Version: 2.0.1				167957
					- WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: 13.10.30		167564
					- WarChiefs - Tiberium Alliances Sector HUD 13.12.18						172683
					- C&C:AllianceMemberOnline: 0.1.3.0
		
*/
// @version     1.0.0
// ==/UserScript==


/***************************************************************************************************
***************************************************************************************************/

/***********************************************************************************
C&C:Tiberium Alliances API Wrapper - Version: 0.390737.5 
***********************************************************************************/

/***********************************************************************************
infernal wrapper: 0.390737.5												140988
***********************************************************************************/
// ==UserScript==
// @name infernal wrapper
// @description Supplies some wrapper functions for public use 
// @namespace infernal_wrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.390737.5
// @author infernal_me, KRS_L, krisan
// ==/UserScript==
(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
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

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();


/***********************************************************************************
Tiberium Alliances Info Sticker: 1.11.06									176992
***********************************************************************************/
// ==UserScript==
// @name       Tiberium Alliances Info Sticker
// @namespace  TAInfoSticker
// @version    1.11.06
// @description  Based on Maelstrom Dev Tools. Modified MCV timer, repair time label, resource labels.
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author unicode *edited by dbendure*
// ==/UserScript==
(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
						contProductionHide: false,
						costHide: false,
						DEFcostHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("db.Produce");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								this.productionLabelTiberium = new qx.ui.basic.Label().set(productionStyle);
								this.productionLabelCrystal = new qx.ui.basic.Label().set(productionStyle);
                                
								this.productionLabelPower1 = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.tibIcon), this.productionLabelTiberium));
                                pane4.add(this.createHBox(this.createImage(this.cryIcon), this.productionLabelCrystal));
								
								pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower1));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
	
								this.contProductionTitleLabel = new qx.ui.basic.Label();
                                this.contProductionTitleLabel.setValue("Cont'+Ally");
                                
                                var contProductionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								this.contProductionLabelTiberium = new qx.ui.basic.Label().set(contProductionStyle);
								this.contProductionLabelCrystal = new qx.ui.basic.Label().set(contProductionStyle);
                                this.contProductionLabelPower = new qx.ui.basic.Label().set(contProductionStyle);
								
                                this.contProductionLabelCredit = new qx.ui.basic.Label().set(contProductionStyle);
                                
                                var pane5 = this.createSection(this.mcvPopup, this.contProductionTitleLabel, !this.contProductionHide, "contProductionHide");
                                pane5.add(this.createHBox(this.createImage(this.tibIcon), this.contProductionLabelTiberium));
                                pane5.add(this.createHBox(this.createImage(this.cryIcon), this.contProductionLabelCrystal));
								pane5.add(this.createHBox(this.createImage(this.powIcon), this.contProductionLabelPower));
                                pane5.add(this.createHBox(this.createImage(this.creditIcon), this.contProductionLabelCredit));
////////////////////////////----------------------------------------------------------								
								 this.repairTimeTitleLabel = new qx.ui.basic.Label();
                                 this.repairTimeTitleLabel.setValue("RepairTimes");
                                
                                this.repairTimeStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								
								this.repairTimeLabel0 = new qx.ui.basic.Label().set(this.repairTimeStyle);
								this.repairTimeLabel1 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                this.repairTimeLabel2 = new qx.ui.basic.Label().set(this.repairTimeStyle);
                                
                                var pane6 = this.createSection(this.mcvPopup, this.repairTimeTitleLabel.set(this.repairTimeStyle), !this.rtHide, "repairHide");
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel0));
                                pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel1));
								pane6.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimeLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
								 
								this.UnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.UnitCostTitleLabel.setValue("OffUnitCost");
                                this.UnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                               
								
								this.UnitCostLabel0 = new qx.ui.basic.Label().set(this.UnitCostStyle);
								this.UnitCostLabel1 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                //this.UnitCostLabel2 = new qx.ui.basic.Label().set(this.UnitCostStyle);
                                
                                var pane7 = this.createSection(this.mcvPopup, this.UnitCostTitleLabel.set(this.UnitCostStyle), !this.costHide, "costHide");
                                pane7.add(this.createHBox(this.createImage(this.cryIcon), this.UnitCostLabel0));
                                pane7.add(this.createHBox(this.createImage(this.powIcon), this.UnitCostLabel1));
								//pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
								this.DEFUnitCostTitleLabel = new qx.ui.basic.Label();
                                 this.DEFUnitCostTitleLabel.setValue("DefUnitCost");
                                
                                this.DEFUnitCostStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    textAlign: 'center',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								
								this.DEFUnitCostLabel0 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
								this.DEFUnitCostLabel1 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                this.DEFUnitCostLabel2 = new qx.ui.basic.Label().set(this.DEFUnitCostStyle);
                                
                                var pane8 = this.createSection(this.mcvPopup, this.DEFUnitCostTitleLabel.set(this.DEFUnitCostStyle), !this.DEFcostHide, "DEFcostHide");
                                pane8.add(this.createHBox(this.createImage(this.tibIcon), this.DEFUnitCostLabel0));
                                pane8.add(this.createHBox(this.createImage(this.cryIcon), this.DEFUnitCostLabel1));
								pane8.add(this.createHBox(this.createImage(this.powIcon), this.DEFUnitCostLabel2));
								//pane7.add(this.createHBox(this.createImage(this.repairIcon), this.UnitCostLabel2));
                                //pane6.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------



							} catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
										this.rtHide = localStorage["infoSticker-repairHide"] == "true";
										this.costHide = localStorage["infoSticker-costHide"] == "true";
										this.DEFcostHide = localStorage["infoSticker-DEFcostHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
										this.contProductionHide = localStorage["infoSticker-contProductionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour*24) + "/1d");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base"); 
										this.repairTimeLabel0.setValue("Select a base");
                                        this.repairTimeLabel1.setValue("Select a base");
										this.repairTimeLabel2.setValue("Select a base");
										this.resourceLabel1.setValue("N/A");
										this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
										this.UnitCostLabel0.setValue("N/A");
										this.UnitCostLabel1.setValue("N/A");
                                        //this.UnitCostLabel2.setValue("N/A");
                                    }
                                } else {
								//console.log(ncity.get_CommandCenterLevel());
									
									//var HQ = ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ);
									//console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
									var DEFtibCost = 0;
									var DEFcryCost = 0;
									var DEFpowCost = 0;
									var cryCost = 0;
									var powCost = 0;
									var cost = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ));
									if(cost != null ){
									//console.log(ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ))[0].Type, ClientLib.Base.EResourceType.Tiberium, ClientLib.Base.EResourceType.Crystal, ClientLib.Base.EResourceType.Power );
										
										
										if(cost[0].Type == ClientLib.Base.EResourceType.Crystal){
										DEFcryCost = cost[0].Count;
										//DEFpowCost = cost[1].Count;
										}else if(cost[0].Type == ClientLib.Base.EResourceType.Tiberium){
										DEFtibCost = cost[0].Count;
										DEFcryCost = cost[1].Count;
										
										}
										
										if(cost[1].Type == ClientLib.Base.EResourceType.Power){
										DEFpowCost = cost[1].Count;
										}
										else if(cost[2] !== undefined && cost[2].Type == ClientLib.Base.EResourceType.Power){
										DEFpowCost = cost[2].Count;
										}
									//console.log(HQ, ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.GetBuildingTypeMaxLvlByTechName(ClientLib.Base.ETechName.Defense_HQ)), DEFpowCost);
									this.DEFUnitCostLabel0.setValue(this.formatNumbersCompact(DEFtibCost));
									this.DEFUnitCostLabel1.setValue(this.formatNumbersCompact(DEFcryCost));
									this.DEFUnitCostLabel2.setValue(this.formatNumbersCompact(DEFpowCost));
									}else{
									this.DEFUnitCostLabel0.setValue("Upgrade");
									this.DEFUnitCostLabel1.setValue("DEF");
									this.DEFUnitCostLabel2.setValue("HQ");
									}
									if(ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel()) != null){
									cryCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[0].Count;
									powCost = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(ncity.get_CommandCenterLevel())[1].Count;
									this.UnitCostLabel0.setValue(this.formatNumbersCompact(cryCost));
									this.UnitCostLabel1.setValue(this.formatNumbersCompact(powCost));
									}else{
									this.UnitCostLabel0.setValue("Upgrade");
									this.UnitCostLabel1.setValue("CC");
									}
									
									
									
                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }
									
									var airRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) == 0) {
										this.repairTimeLabel0.setValue("No birds");
                                    } else {
                                        this.repairTimeLabel0.setValue(this.FormatTimespan(airRT) + " AIR");
                                    }
									
									var vehRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) == 0) {
										this.repairTimeLabel1.setValue("No cars");
                                    } else {
                                        this.repairTimeLabel1.setValue(this.FormatTimespan(vehRT) + " VEH");
                                    }
									var infRT = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
									if (ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) == 0) {
										this.repairTimeLabel2.setValue("No dudes");
                                    } else {
                                        this.repairTimeLabel2.setValue(this.FormatTimespan(infRT) + " INF");
                                    }
									//this.repairTimerLabel0.setValue(this.FormatTimespan(airRT));
									//this.repairTimerLabel1.setValue(this.FormatTimespan(vehRT));
									//this.repairTimerLabel2.setValue(this.FormatTimespan(infRT));

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    
									var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = (powerCont + powerAlly);
									var powerPac = (powerCont + powerAlly + powerBonus)*6;
									if(powerRatio >= 1){
									powerProd = 0;
									powerPac = (powerBonus)*6;
									
									}
									
									
									var tiberiumCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
                                    var tiberiumBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
									var tiberiumPac = (tiberiumCont + tiberiumAlly + tiberiumBonus)*6;
									var tiberiumProd = (tiberiumCont + tiberiumAlly);
									if(tibRatio >= 1){
									tiberiumProd = 0;
									tiberiumPac = (tiberiumBonus)*6;
									
									}
									
									var crystalCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
                                    var crystalBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
									var crystalPac = (crystalCont + crystalAlly + crystalBonus)*6;
									var crystalProd = (crystalCont + crystalAlly);
									
									if(cryRatio >= 1){
									crystalProd = 0;
									crystalPac = (crystalBonus)*6;
									
									}
									

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = (creditCont + creditBonus)*6;
									
									if( ncity.get_hasCooldown() == true){
									
									powerPac = (powerCont + powerAlly)*6 ;
									creditProd = (creditCont)*6;
									crystalPac = (crystalCont + crystalAlly )*6;
									tiberiumPac = (tiberiumCont + tiberiumAlly)*6;
									}

									this.productionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumPac) + "/6h");
									this.productionLabelCrystal.setValue(this.formatNumbersCompact(crystalPac) + "/6h");
                                    this.productionLabelPower1.setValue(this.formatNumbersCompact(powerPac) + "/6h");
									this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/6h");
									
									this.contProductionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumProd) + "/h");
									this.contProductionLabelCrystal.setValue(this.formatNumbersCompact(crystalProd) + "/h");
                                    this.contProductionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
									this.contProductionLabelCredit.setValue(this.formatNumbersCompact(creditCont) + "/h");
									
									
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();


/***********************************************************************************
C&C:TA CNCOpt Link Button: 1.7.6b											131289
***********************************************************************************/
// ==UserScript==
// @version       1.7.6b
// @updateURL     https://userscripts.org/scripts/source/131289.meta.js
// @downloadURL   https://userscripts.org/scripts/source/131289.user.js
// @name          C&C:TA CNCOpt Link Button for SC
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// @contributor   jerbri (http://userscripts.org/users/507954)
// @contributor   Der_Flake
// ==/UserScript==
/* 

2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
2012-11-25: Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.6";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var doLinkCity = (city.get_CityFaction() > 2 ? own_city.get_CityFaction() : city.get_CityFaction());
              var doCity = (city.get_CityFaction() > 2 ? own_city : city);
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              //switch (own_city.get_CityFaction()) {
              switch (doLinkCity) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              //var offense_unit_list = getOffenseUnits(own_city);
              var offense_unit_list = getOffenseUnits(doCity);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }
              if (server.get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
                  link += "|newEconomy";
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
}


/***********************************************************************************
TACS 3 (Tiberium Alliances Combat Simulator): 3.01b							138212
***********************************************************************************/
// ==UserScript==
// @name           TACS (Tiberium Alliances Combat Simulator)
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        3.01b
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, MrHIDEn, TheStriker, JDuarteDJ, null
// @updateURL      https://userscripts.org/scripts/source/138212.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138212.user.js
// @translator     TR: PythEch | DE: Matthias Fuchs & Leafy | PT: JDuarteDJ & Contosbarbudos | IT: Hellcco | NL: SkeeterPan | HU: Mancika | FR: Pyroa & NgXAlex | FI: jipx
// @grant none
// ==/UserScript==
(function(){var t=document.createElement("script");t.innerHTML="("+function(){function d(b){try{if(-1<C.indexOf(v)){var a=G[b][C.indexOf(v)];return""!==a?a:b}return b}catch(c){return console.log(c),b}}function t(){qx.Class.define("TACS",{type:"singleton",extend:qx.core.Object,members:{saveObj:{section:{option:"foo"},bounds:{battleResultsBoxLeft:125,battleResultsBoxTop:125},checkbox:{showStatsDuringAttack:!0,showStatsDuringSimulation:!0,skipVictoryPopup:!1,disableArmyFormationManagerTooltips:!1,disableAttackPreparationTooltips:!1},
audio:{playRepairSound:!0},slider:{statsOpacity:100}},buttons:{attack:{layout:{save:null,load:null},simulate:null,unlock:null,repair:null,unlockReset:null,tools:null,formationReset:null,flipVertical:null,flipHorizontal:null,activateInfantry:null,activateVehicles:null,activateAir:null,activateAll:null,repairMode:null,toolbarRefreshStats:null,toolbarShowStats:null,toolbarUndo:null,toolbarRedo:null,options:null},simulate:{back:null,skip:null},shiftFormationUp:null,shiftFormationDown:null,shiftFormationLeft:null,
shiftFormationRight:null,optionStats:null},stats:{spoils:{tiberium:null,crystal:null,credit:null,research:null},health:{infantry:null,vehicle:null,aircraft:null,overall:null},repair:{infantry:null,vehicle:null,aircraft:null,overall:null,available:null,max:null},attacks:{availableCP:null,attackCost:null,availableAttacksCP:null,availableAttacksAtFullStrength:null,availableAttacksWithCurrentRepairCharges:null},damage:{units:{overall:null},structures:{construction:null,defense:null,command:null,support:null,
overall:null},overall:null},time:null,supportLevel:null},labels:{health:{infantry:null,vehicle:null,aircraft:null,overall:null},repair:{available:null},repairinfos:{infantry:null,vehicle:null,aircraft:null,available:null},attacks:{available:null},damage:{units:{overall:null},structures:{construction:null,defense:null,command:null,support:null,overall:null},overall:null,outcome:null},time:null,supportLevel:null,countDown:null},view:{playerCity:null,playerCityDefenseBonus:null,ownCity:null,ownCityId:null,
targetCityId:null,lastUnits:null,lastUnitList:null},layouts:{label:null,list:null,all:null,current:null,restore:null},options:{autoDisplayStats:null,showShift:null,sideLabel:null,locksLabel:null,leftSide:null,rightSide:null,attackLock:null,repairLock:null,markSavedTargets:null,dblClick2DeActivate:null,showStatsDuringAttack:null,showStatsDuringSimulation:null,skipVictoryPopup:null,statsOpacityLabel:null,statsOpacity:null,statsOpacityOutput:null,disableArmyFormationManagerTooltips:null,disableAttackPreparationTooltips:null},
audio:{soundRepairImpact:null,soundRepairReload:null},_Application:null,_MainData:null,_Cities:null,_VisMain:null,_ActiveView:null,_PlayArea:null,_armyBarContainer:null,_armyBar:null,attacker_modules:null,defender_modules:null,battleResultsBox:null,optionsWindow:null,statsPage:null,lastSimulation:null,count:null,counter:null,statsOnly:null,simulationWarning:null,warningIcon:null,userInterface:null,infantryActivated:null,vehiclesActivated:null,airActivated:null,allActivated:null,toolBar:null,TOOL_BAR_LOW:113,
TOOL_BAR_HIGH:155,TOOL_BAR_WIDTH:740,repairInfo:null,repairButtons:[],repairButtonsRedrawTimer:null,armybarClickCount:null,armybarClearnClickCounter:null,repairModeTimer:null,curPAVM:null,curViewMode:null,DEFAULTS:null,undoCache:[],ts1:null,ts2:null,attackUnitsLoaded:null,loadData:function(){var b=localStorage.getItem("TACS");if(null!=b){var b=JSON.parse(b),a;for(a in this.saveObj)if("object"==typeof b[a])for(var c in this.saveObj[a])"object"!=typeof b[a][c]&&"undefined"==typeof b[a][c]&&(console.log("Creating missing save option: "+
a+"."+c),b[a][c]=this.saveObj[a][c]);else"undefined"==typeof b[a]&&(console.log("Creating missing option section: "+a),b[a]=this.saveObj[a]);this.saveObj=b;this.saveData()}},saveData:function(){var b=this.saveObj||window.TACS.getInstance().saveObj,b=JSON.stringify(b);localStorage.setItem("TACS",b)},initialize:function(){try{this.loadData();v=qx.locale.Manager.getInstance().getLocale();this.targetCityId="0";this._Application=qx.core.Init.getApplication();this._MainData=ClientLib.Data.MainData.GetInstance();
this._VisMain=ClientLib.Vis.VisMain.GetInstance();this._ActiveView=this._VisMain.GetActiveView();this._PlayArea=this._Application.getPlayArea();this._armyBarContainer=this._Application.getArmySetupAttackBar();this._armyBar=this._Application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(),"OnSimulateBattleFinished",ClientLib.API.OnSimulateBattleFinished,this,this.onSimulateBattleFinishedEvent);phe.cnc.Util.attachNetEvent(this._VisMain,
"ViewModeChange",ClientLib.Vis.ViewModeChange,this,this.viewChangeHandler);phe.cnc.Util.attachNetEvent(this._MainData.get_Cities(),"CurrentOwnChange",ClientLib.Data.CurrentOwnCityChange,this,this.ownCityChangeHandler);this.buttons.simulate.back=new qx.ui.form.Button(d("Setup"));this.buttons.simulate.back.set({width:80,appearance:"button-text-small",toolTipText:d("Return to Combat Setup")});this.buttons.simulate.back.addListener("click",this.returnSetup,this);this.buttons.simulate.skip=new qx.ui.form.Button(d("SKIP"));
this.buttons.simulate.skip.set({width:50,height:21,appearance:"button-text-small",toolTipText:d("Skip to end")});this.buttons.simulate.skip.addListener("click",this.skipSimulation,this);var b=this._Application.getReportReplayOverlay();b.add(this.buttons.simulate.back,{top:12,left:150});"undefined"!=typeof CCTAWrapper_IsInstalled&&CCTAWrapper_IsInstalled&&b.add(this.buttons.simulate.skip,{top:38,left:460});this.buttons.attack.unlock=new qx.ui.form.Button(d("Unlock"));this.buttons.attack.unlock.set({width:45,
height:45,padding:0,appearance:"button-text-small",toolTipText:d("Unlock Attack Button")});this.buttons.attack.unlock.addListener("click",this.unlockAttacks,this);this.buttons.attack.unlock.setOpacity(0.5);var a=localStorage.ta_sim_attackLock;(a=a?JSON.parse(localStorage.ta_sim_attackLock):!0)&&this._armyBar.add(this.buttons.attack.unlock,{top:108,right:9});this.buttons.attack.repair=new qx.ui.form.Button(d("Unlock"));this.buttons.attack.repair.set({width:45,height:45,padding:0,appearance:"button-text-small",
toolTipText:d("Unlock Repair Button")});this.buttons.attack.repair.addListener("click",this.unlockRepairs,this);this.buttons.attack.repair.setOpacity(0.5);(a=(a=localStorage.ta_sim_repairLock)?JSON.parse(localStorage.ta_sim_repairLock):!0)&&this._armyBar.add(this.buttons.attack.repair,{top:16,right:9});var c=ClientLib.Data.CityPreArmyUnit.prototype;c.set_Enabled_Original||(c.set_Enabled_Original=c.set_Enabled);c.set_Enabled=function(a){this.set_Enabled_Original(a);window.TACS.getInstance().formationChangeHandler()};
c.MoveBattleUnit_Original||(c.MoveBattleUnit_Original=c.MoveBattleUnit);c.MoveBattleUnit=function(a,b){var c=window.TACS.getInstance();if(c.options.dblClick2DeActivate.getValue()&&2<=c.armybarClickCount&&this.get_CoordX()===a&&this.get_CoordY()===b){var e=this.get_Enabled();this.set_Enabled_Original(e^1)}this.MoveBattleUnit_Original(a,b);c.formationChangeHandler();c.armybarClickCount=0;clearInterval(c.armybarClearnClickCounter)};this.loadLayouts();this.optionsWindow=(new qx.ui.window.Window(d("Options"),
"FactionUI/icons/icon_forum_properties.png")).set({contentPaddingTop:1,contentPaddingBottom:8,contentPaddingRight:8,contentPaddingLeft:8,width:400,height:400,showMaximize:!1,showMinimize:!1,allowMaximize:!1,allowMinimize:!1,resizable:!1});this.optionsWindow.getChildControl("icon").set({scale:!0,width:25,height:25});this.optionsWindow.setLayout(new qx.ui.layout.VBox);var e=localStorage.ta_sim_options_top;if(e){var e=JSON.parse(localStorage.ta_sim_options_top),l=JSON.parse(localStorage.ta_sim_options_left);
this.optionsWindow.moveTo(l,e)}else this.optionsWindow.center();this.optionsWindow.addListener("close",function(){localStorage.ta_sim_options_top=JSON.stringify(this.optionsWindow.getLayoutProperties().top);localStorage.ta_sim_options_left=JSON.stringify(this.optionsWindow.getLayoutProperties().left);this.saveData()},this);this.battleResultsBox=(new qx.ui.window.Window("TACS","FactionUI/icons/icon_res_plinfo_command_points.png")).set({contentPaddingTop:0,contentPaddingBottom:2,contentPaddingRight:2,
contentPaddingLeft:6,showMaximize:!1,showMinimize:!1,allowMaximize:!1,allowMinimize:!1,resizable:!1});this.battleResultsBox.getChildControl("icon").set({scale:!0,width:20,height:20,alignY:"middle"});this.battleResultsBox.setLayout(new qx.ui.layout.HBox);this.battleResultsBox.moveTo(this.saveObj.bounds.battleResultsBoxLeft,this.saveObj.bounds.battleResultsBoxTop);this.battleResultsBox.addListener("move",function(){this.saveObj.bounds.battleResultsBoxLeft=this.battleResultsBox.getBounds().left;this.saveObj.bounds.battleResultsBoxTop=
this.battleResultsBox.getBounds().top;this.saveData()},this);this.battleResultsBox.addListener("appear",function(){this.battleResultsBox.setOpacity(this.saveObj.slider.statsOpacity/100)},this);var f=(new qx.ui.tabview.TabView).set({contentPaddingTop:3,contentPaddingBottom:6,contentPaddingRight:7,contentPaddingLeft:3});this.battleResultsBox.add(f);this.initializeStats(f);this.initializeLayout(f);this.initializeInfo(f);this.initializeOptions();this.setupInterface();this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCCamp);
this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCBase);this.createBasePlateFunction(ClientLib.Vis.Region.RegionCity);this.gameOverlaysToFront()}catch(g){console.log(g)}},initializeStats:function(b){try{this.statsPage=new qx.ui.tabview.Page(d("Stats"));this.statsPage.setLayout(new qx.ui.layout.VBox(1));b.add(this.statsPage);var a=new qx.ui.container.Composite,c=new qx.ui.layout.Grid;c.setColumnAlign(0,"left","middle");c.setColumnAlign(1,"right","middle");c.setColumnFlex(0,1);c.setRowHeight(0,
15);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");this.statsPage.add(a);this.labels.countDown=new qx.ui.basic.Label("");this.labels.countDown.set({width:0,height:10,marginLeft:5,backgroundColor:"#B40404"});a.add(this.labels.countDown,{row:0,column:0});a=new qx.ui.container.Composite;c=new qx.ui.layout.Grid;c.setColumnAlign(1,"right","middle");c.setColumnFlex(0,1);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");this.statsPage.add(a);a.add(new qx.ui.basic.Label(d("Enemy Base:")),
{row:0,column:0});this.labels.damage.overall=new qx.ui.basic.Label("100");a.add(this.labels.damage.overall,{row:0,column:1});a.add(new qx.ui.basic.Label(d("Defences:")),{row:1,column:0});this.labels.damage.units.overall=new qx.ui.basic.Label("100");a.add(this.labels.damage.units.overall,{row:1,column:1});a.add(new qx.ui.basic.Label(d("Buildings:")),{row:2,column:0});this.labels.damage.structures.overall=new qx.ui.basic.Label("100");a.add(this.labels.damage.structures.overall,{row:2,column:1});a.add(new qx.ui.basic.Label(d("Construction Yard:")),
{row:3,column:0});this.labels.damage.structures.construction=new qx.ui.basic.Label("100");a.add(this.labels.damage.structures.construction,{row:3,column:1});a.add(new qx.ui.basic.Label(d("Defense Facility:")),{row:4,column:0});this.labels.damage.structures.defense=new qx.ui.basic.Label("100");a.add(this.labels.damage.structures.defense,{row:4,column:1});a.add(new qx.ui.basic.Label(d("Command Center:")),{row:5,column:0});this.labels.damage.structures.command=new qx.ui.basic.Label("100");a.add(this.labels.damage.structures.command,
{row:5,column:1});this.labels.supportLevel=new qx.ui.basic.Label("");a.add(this.labels.supportLevel,{row:6,column:0});this.labels.damage.structures.support=new qx.ui.basic.Label("");a.add(this.labels.damage.structures.support,{row:6,column:1});a=new qx.ui.container.Composite;c=new qx.ui.layout.Grid;c.setColumnAlign(1,"right","middle");c.setColumnFlex(0,1);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");this.statsPage.add(a);a.add(new qx.ui.basic.Label(d("Overall:")),{row:0,
column:0});this.labels.health.overall=new qx.ui.basic.Label("100");a.add(this.labels.health.overall,{row:0,column:1});a.add(new qx.ui.basic.Label(d("Infantry:")),{row:1,column:0});this.labels.health.infantry=new qx.ui.basic.Label("100");a.add(this.labels.health.infantry,{row:1,column:1});a.add(new qx.ui.basic.Label(d("Vehicle:")),{row:2,column:0});this.labels.health.vehicle=new qx.ui.basic.Label("100");a.add(this.labels.health.vehicle,{row:2,column:1});a.add(new qx.ui.basic.Label(d("Aircraft:")),
{row:3,column:0});this.labels.health.aircraft=new qx.ui.basic.Label("100");a.add(this.labels.health.aircraft,{row:3,column:1});a=new qx.ui.container.Composite;c=new qx.ui.layout.Grid;c.setColumnAlign(1,"right","middle");c.setColumnFlex(0,1);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");this.statsPage.add(a);a.add(new qx.ui.basic.Label(d("Outcome:")),{row:0,column:0});this.labels.damage.outcome=new qx.ui.basic.Label(d("Unknown"));a.add(this.labels.damage.outcome,{row:0,
column:1});a.add(new qx.ui.basic.Label(d("Battle Time:")),{row:1,column:0});this.labels.time=new qx.ui.basic.Label("120");a.add(this.labels.time,{row:1,column:1});a=new qx.ui.container.Composite;c=new qx.ui.layout.Grid;c.setColumnAlign(1,"right","middle");c.setColumnFlex(0,1);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");this.statsPage.add(a);a.add(new qx.ui.basic.Label(d("Available Repair:")),{row:0,column:0});this.labels.repair.available=new qx.ui.basic.Label("00:00:00");
a.add(this.labels.repair.available,{row:0,column:1});a.add(new qx.ui.basic.Label(d("Available Attacks:")),{row:1,column:0});this.labels.attacks.available=new qx.ui.basic.Label("CP:- / FR:- / CFR:-");a.add(this.labels.attacks.available,{row:1,column:1})}catch(e){console.log(e)}},initializeLayout:function(b){try{var a=new qx.ui.tabview.Page(d("Layouts"));a.setLayout(new qx.ui.layout.VBox);b.add(a);this.layouts.list=new qx.ui.form.List;this.layouts.list.set({height:174,selectionMode:"one"});a.add(this.layouts.list);
var c=new qx.ui.container.Composite;c.setLayout(new qx.ui.layout.HBox(5));this.buttons.attack.layout.load=new qx.ui.form.Button(d("Load"));this.buttons.attack.layout.load.set({width:80,appearance:"button-text-small",toolTipText:d("Load this saved layout.")});this.buttons.attack.layout.load.addListener("click",this.loadCityLayout,this);c.add(this.buttons.attack.layout.load);this.buttonLayoutDelete=new qx.ui.form.Button(d("Delete"));this.buttonLayoutDelete.set({width:80,appearance:"button-text-small",
toolTipText:d("Delete this saved layout.")});this.buttonLayoutDelete.addListener("click",this.deleteCityLayout,this);c.add(this.buttonLayoutDelete);a.add(c);var e=new qx.ui.container.Composite;e.setLayout(new qx.ui.layout.VBox(1));e.setThemedFont("bold");e.setThemedPadding(2);e.setThemedBackgroundColor("#eef");var l=new qx.ui.container.Composite;l.setLayout(new qx.ui.layout.HBox(5));l.add(new qx.ui.basic.Label(d("Name: ")));this.layouts.label=new qx.ui.form.TextField;this.layouts.label.setValue("");
l.add(this.layouts.label);e.add(l);this.buttons.attack.layout.save=new qx.ui.form.Button(d("Save"));this.buttons.attack.layout.save.set({width:80,appearance:"button-text-small",toolTipText:d("Save this layout.")});this.buttons.attack.layout.save.addListener("click",this.saveCityLayout,this);e.add(this.buttons.attack.layout.save);a.add(e)}catch(f){console.log(f)}},initializeInfo:function(b){try{var a=new qx.ui.tabview.Page(d("Info"));a.setLayout(new qx.ui.layout.VBox(1));b.add(a);var c=new qx.ui.container.Composite;
c.setLayout(new qx.ui.layout.VBox(1));c.setThemedFont("bold");c.setThemedPadding(2);c.setThemedBackgroundColor("#eef");a.add(c);var e=(new qx.ui.basic.Label).set({value:"<a target='_blank' href='http://userscripts.org/scripts/discuss/138212'>"+d("Forums")+"</a>",rich:!0});c.add(e);var l=new qx.ui.container.Composite;l.setLayout(new qx.ui.layout.VBox(1));l.setThemedFont("bold");l.setThemedPadding(2);l.setThemedBackgroundColor("#eef");a.add(l);l.add(new qx.ui.basic.Label(d("Spoils")));this.stats.spoils.tiberium=
new qx.ui.basic.Atom("0","webfrontend/ui/common/icn_res_tiberium.png");l.add(this.stats.spoils.tiberium);this.stats.spoils.crystal=new qx.ui.basic.Atom("0","webfrontend/ui/common/icn_res_chrystal.png");l.add(this.stats.spoils.crystal);this.stats.spoils.credit=new qx.ui.basic.Atom("0","webfrontend/ui/common/icn_res_dollar.png");l.add(this.stats.spoils.credit);this.stats.spoils.research=new qx.ui.basic.Atom("0","webfrontend/ui/common/icn_res_research_mission.png");l.add(this.stats.spoils.research);
var f=new qx.ui.container.Composite,g=new qx.ui.layout.Grid;f.setLayout(g);f.setThemedFont("bold");f.setThemedBackgroundColor("#eef");a.add(f);this.buttons.optionStats=(new qx.ui.form.Button).set({height:25,width:160,margin:15,alignX:"center",label:d("Options"),appearance:"button-text-small",icon:"FactionUI/icons/icon_forum_properties.png",toolTipText:d("TACS Options")});this.buttons.optionStats.addListener("click",this.toggleOptionsWindow,this);f.add(this.buttons.optionStats,{row:0,column:0});this.battleResultsBox.add(b)}catch(k){console.log(k)}},
initializeOptions:function(){try{var b=new qx.ui.container.Composite;b.setLayout(new qx.ui.layout.VBox(1));b.setThemedPadding(10);b.setThemedBackgroundColor("#eef");this.optionsWindow.add(b);var a=new qx.ui.container.Composite,c=new qx.ui.layout.Grid(5,5);c.setColumnFlex(2,1);a.setLayout(c);a.setThemedFont("bold");a.setThemedBackgroundColor("#eef");b.add(a);a.add(new qx.ui.basic.Label(d("Version: ")+"3.01b"),{row:0,column:0,colSpan:3});this.options.autoDisplayStats=new qx.ui.form.CheckBox(d("Auto display stats"));
var e=localStorage.ta_sim_popup;e?(e=JSON.parse(localStorage.ta_sim_popup),this.options.autoDisplayStats.setValue(e)):this.options.autoDisplayStats.setValue(!0);this.options.autoDisplayStats.addListener("click",this.optionPopup,this);a.add(this.options.autoDisplayStats,{row:1,column:0,colSpan:3});this.options.markSavedTargets=new qx.ui.form.CheckBox(d("Mark saved targets on region map"));(e=localStorage.ta_sim_marksavedtargets)?(e=JSON.parse(localStorage.ta_sim_marksavedtargets),this.options.markSavedTargets.setValue(e)):
this.options.markSavedTargets.setValue(!0);this.options.markSavedTargets.addListener("click",function(){localStorage.ta_sim_marksavedtargets=JSON.stringify(this.options.markSavedTargets.getValue())},this);a.add(this.options.markSavedTargets,{row:2,column:0,colSpan:3});this.options.dblClick2DeActivate=new qx.ui.form.CheckBox(d("Enable 'Double-click to (De)activate units'"));(e=localStorage.ta_sim_dblClick2DeActivate)?(e=JSON.parse(localStorage.ta_sim_dblClick2DeActivate),this.options.dblClick2DeActivate.setValue(e)):
this.options.dblClick2DeActivate.setValue(!0);this.options.dblClick2DeActivate.addListener("click",function(){localStorage.ta_sim_dblClick2DeActivate=JSON.stringify(this.options.dblClick2DeActivate.getValue())},this);a.add(this.options.dblClick2DeActivate,{row:3,column:0,colSpan:3});this.options.showShift=new qx.ui.form.CheckBox(d("Show shift buttons"));(e=localStorage.ta_sim_showShift)?(e=JSON.parse(localStorage.ta_sim_showShift),this.options.showShift.setValue(e)):this.options.showShift.setValue(!0);
this.options.showShift.addListener("click",this.optionShowShift,this);a.add(this.options.showShift,{row:4,column:0,colSpan:3});this.options.sideLabel=new qx.ui.basic.Label(d("Side:"));this.options.leftSide=new qx.ui.form.RadioButton(d("Left"));this.options.rightSide=new qx.ui.form.RadioButton(d("Right"));var l=new qx.ui.form.RadioGroup;l.add(this.options.leftSide,this.options.rightSide);(e=localStorage.ta_sim_side)?(e=JSON.parse(localStorage.ta_sim_side),this.options.rightSide.setValue(e)):this.options.rightSide.setValue(!0);
l.addListener("changeSelection",this.setupInterface,this);a.add(this.options.sideLabel,{row:5,column:0});a.add(this.options.leftSide,{row:5,column:1});a.add(this.options.rightSide,{row:5,column:2});this.options.locksLabel=new qx.ui.basic.Label(d("Locks:"));this.options.attackLock=new qx.ui.form.CheckBox(d("Attack"));(e=localStorage.ta_sim_attackLock)?(e=JSON.parse(localStorage.ta_sim_attackLock),this.options.attackLock.setValue(e)):this.options.attackLock.setValue(!0);this.options.repairLock=new qx.ui.form.CheckBox(d("Repair"));
(e=localStorage.ta_sim_repairLock)?(e=JSON.parse(localStorage.ta_sim_repairLock),this.options.repairLock.setValue(e)):this.options.repairLock.setValue(!0);this.options.attackLock.addListener("click",this.optionAttackLock,this);this.options.repairLock.addListener("click",this.optionRepairLock,this);a.add(this.options.locksLabel,{row:6,column:0});a.add(this.options.attackLock,{row:6,column:1});a.add(this.options.repairLock,{row:6,column:2});this.options.showStatsDuringAttack=new qx.ui.form.CheckBox(d("Show Stats During Attack"));
this.options.showStatsDuringAttack.saveLocation="showStatsDuringAttack";this.options.showStatsDuringAttack.setValue(this.saveObj.checkbox.showStatsDuringAttack);this.options.showStatsDuringAttack.addListener("click",this.toggleCheckboxOption,this);a.add(this.options.showStatsDuringAttack,{row:7,column:0,colSpan:3});this.options.showStatsDuringSimulation=new qx.ui.form.CheckBox(d("Show Stats During Simulation"));this.options.showStatsDuringSimulation.saveLocation="showStatsDuringSimulation";this.options.showStatsDuringSimulation.setValue(this.saveObj.checkbox.showStatsDuringSimulation);
this.options.showStatsDuringSimulation.addListener("click",this.toggleCheckboxOption,this);a.add(this.options.showStatsDuringSimulation,{row:8,column:0,colSpan:3});this.options.skipVictoryPopup=new qx.ui.form.CheckBox(d("Skip Victory-Popup After Battle"));this.options.skipVictoryPopup.saveLocation="skipVictoryPopup";this.options.skipVictoryPopup.setValue(this.saveObj.checkbox.skipVictoryPopup);this.options.skipVictoryPopup.addListener("click",this.toggleCheckboxOption,this);a.add(this.options.skipVictoryPopup,
{row:9,column:0,colSpan:3});webfrontend.gui.reports.CombatVictoryPopup.getInstance().addListener("appear",function(){this.saveObj.checkbox.skipVictoryPopup&&webfrontend.gui.reports.CombatVictoryPopup.getInstance()._onBtnClose()},this);this.options.disableAttackPreparationTooltips=new qx.ui.form.CheckBox(d("Disable Tooltips In Attack Preparation View"));this.options.disableAttackPreparationTooltips.saveLocation="disableAttackPreparationTooltips";this.options.disableAttackPreparationTooltips.setValue(this.saveObj.checkbox.disableAttackPreparationTooltips);
this.options.disableAttackPreparationTooltips.addListener("click",this.toggleCheckboxOption,this);a.add(this.options.disableAttackPreparationTooltips,{row:10,column:0,colSpan:3});this.options.disableArmyFormationManagerTooltips=new qx.ui.form.CheckBox(d("Disable Unit Tooltips In Army Formation Manager"));this.options.disableArmyFormationManagerTooltips.saveLocation="disableArmyFormationManagerTooltips";this.options.disableArmyFormationManagerTooltips.setValue(this.saveObj.checkbox.disableArmyFormationManagerTooltips);
this.options.disableArmyFormationManagerTooltips.addListener("click",this.toggleCheckboxOption,this);a.add(this.options.disableArmyFormationManagerTooltips,{row:11,column:0,colSpan:3});this.options.statsOpacityLabel=new qx.ui.basic.Label(d("Stats Window Opacity"));this.options.statsOpacityLabel.setMarginTop(10);a.add(this.options.statsOpacityLabel,{row:12,column:0,colSpan:3});this.options.statsOpacity=new qx.ui.form.Slider;a.add(this.options.statsOpacity,{row:13,column:1,colSpan:2});this.options.statsOpacity.setValue(this.saveObj.slider.statsOpacity);
this.options.statsOpacityOutput=new qx.ui.basic.Label(String(this.saveObj.slider.statsOpacity));a.add(this.options.statsOpacityOutput,{row:13,column:0});this.options.statsOpacity.addListener("changeValue",function(){var a=this.options.statsOpacity.getValue();this.battleResultsBox.setOpacity(a/100);this.options.statsOpacityOutput.setValue(String(a)+"%");this.saveObj.slider.statsOpacity=a},this);var f=new qx.ui.container.Composite;f.setLayout(new qx.ui.layout.VBox(1));f.setThemedFont("bold");f.setThemedPadding(10);
f.setThemedBackgroundColor("#eef");b.add(f);var g=(new qx.ui.basic.Label).set({value:"<a target='_blank' href='http://userscripts.org/scripts/discuss/138212'>"+d("Forums")+"</a>",rich:!0});f.add(g)}catch(k){console.log(k)}},toggleCheckboxOption:function(b){b=b.getTarget();var a=b.getValue();this.saveObj.checkbox[b.saveLocation]=a;this.saveData()},createBasePlateFunction:function(b){try{var a=b.prototype,c;for(c in a)if("function"===typeof a[c]&&(e=a[c].toString(),-1<e.indexOf("region_city_owner"))){c=
/[A-Z]{6}\=\(new \$I.[A-Z]{6}\).[A-Z]{6}\(\$I.[A-Z]{6}.Black/;var e=e.match(c).toString(),d=e.slice(0,6);if(b===ClientLib.Vis.Region.RegionNPCCamp){var f="return "+e.slice(12,21)+".prototype."+e.slice(23,29)+".toString();",g=Function("",f),e=g();c=/.I.[A-Z]{6}.prototype.[A-Z]{6}/;var k=e.match(/.I.[A-Z]{6}.prototype/).toString(),e=e.match(c).toString(),f="return "+e+".toString();",g=Function("",f),e=g(),h=e.match(/this.[A-Z]{6}=a/).toString(),h="this."+h.slice(5,11)+"=a;",n=e.match(/this.[A-Z]{6}\(\)/).toString(),
n="this."+n.slice(5,13)+";",m=k+".setPlateColor = function(a){"+h+n+"};regionObject.get_BasePlate = function(){return this."+d+";}"}else m="regionObject.get_BasePlate = function(){return this."+d+";}";g=Function("regionObject",m);g(a);break}}catch(q){console.log(q)}},initToolBarListeners:function(){try{var b=this._PlayArea.getLayoutParent().getBounds(),a=this._PlayArea.getLayoutParent().getBounds().width;this._PlayArea.addListener("mouseover",function(){this.toolBar.isVisible()&&(this.toolBarMouse.show(),
this.toolBar.setLayoutProperties({bottom:this.TOOL_BAR_LOW}),this.toolBar.setZIndex(1))},this);this._armyBarContainer.addListener("appear",function(){this._armyBarContainer.setZIndex(3);this.toolBar.show();this.toolBarMouse.show()},this);this._armyBarContainer.addListener("changeVisibility",function(){this._armyBarContainer.isVisible()?(this.toolBar.show(),this.toolBarMouse.show()):(this.toolBar.hide(),this.toolBarMouse.hide())},this);this.toolBarMouse.addListener("mouseover",function(){var c=b.width;
a!==c&&(a=c,c=this._armyBarContainer.getBounds())&&(this.toolBar.setDomLeft(c.left+(c.width-this.TOOL_BAR_WIDTH)/2),this.toolBarMouse.setDomLeft(c.left+(c.width-this.TOOL_BAR_WIDTH)/2));this.toolBarMouse.hide();this.toolBar.setZIndex(11);this.toolBar.setLayoutProperties({bottom:this.TOOL_BAR_HIGH})},this);this.toolBar.addListener("appear",function(){this.toolBar.setZIndex(1)},this);this._armyBar.addListener("mouseover",function(){this.toolBarMouse.show();this.toolBar.setZIndex(1);this.toolBar.setLayoutProperties({bottom:this.TOOL_BAR_LOW})},
this);this._armyBar.addListener("click",function(){this.armybarClickCount+=1;1==this.armybarClickCount&&(this.armybarClearnClickCounter=setInterval(this.resetDblClick,500))},this)}catch(c){console.log(c)}},setupInterface:function(){try{localStorage.ta_sim_side=JSON.stringify(this.options.rightSide.getValue());var b=this._Application.getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA),a=this._Application.getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA).getLayoutParent().getLayoutParent().getBounds().width;
this.armybarClickCount=0;switch(this._MainData.get_Player().get_Faction()){case ClientLib.Base.EFactionType.GDIFaction:var c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFTElEQVR4XtWVW28bRRTHz5nZ9Xrt2IlzKUlanJReiEhLpUpFPAQJBIUH4K1IXEQf+AZIfIE+9oXPgAChPlb0DVGFXlBBlFJoaakobVVCkxbiJI7ttdfeOfwnySo18UXIlRBnd+X1zP/8/mfO7tj0v4lvStKDtseYfVAiGxeCBt8Q8a5Hkj67JGkRYVyEe/2LwSWioNnMeZRx4so1vhLK0Km7xbdO3Fw6fnYpOvr+ye9e/uDzi4NnlqIdGJvC3PjVUNzPfrr66IzP/ylk47pI4tTc6psnbi3/cPmvslxalZPvfjz74dFPZnfj/hDGXsPcc9CMQ8txbrdQ3QQzI0xn7ghXyjRKrJ59aiA5dWAoRa6mEWau4zKOogTGGHN90OTKZUoix+b2XoCNTJ7U/EppplKrHx7w9BpViEwsEHsiMEfQDC+slHLZCbK63gs4VxGqBpR3tDs9PZDMu0p7QSTEQg34xhCxY5jT0PjQZoMK+cjtvQAlolbLwcFSJTjiOUosUta5EW2GyEYboCFox5CTVdJDAefLGy5GdpLwwcmsNzzqu5mFqgi3aK4ds3PQuNC6yBlAbipm/esCZtJMXwfiSGSmqtXakX7PcSuRkOKmZysPf7Nz0Ai0jJwx5PaBwWC1L6DT6o0x+XK5drg/6aZ3pt3MPaxQNbOEpKkAshpoE8jRyB0Bw+/UBdVu9ecC8VzhPVFkXnoy6w0CTA63fLObyFYDrezFY0DuMBhpsFS7Lqh2q1ck4w8Kq28orf3RpPYLoV09dzS3YTVWO5bUWuEEY1yxeO26oNqs3nci3stKP/3CY37+Rqnl6hmXMG2tymptDnJTYGScBveBqVt1QbVavato273F4juseMDX7IRGhLllC0Vo616zWpuDXAbDAWs7mIlWXVAPm9sKz1clFVWjfVrrna+O+buvFI1YDrWLNjM2x+aCkQbLMjNg2y5Yr60FxO3xFA09WCkf6XPV9lq0JmhvTiw4AGj7hrNlgJUEcxRsN/ZqKiCu6EJd/GKx9oyQmnx+JDnxa5m4w+LbGDc/CssAywczBXYOHk2eKq5oVoQSQsOlIHwxn3KmCnWK93wnfxZEpyZZBlgEZh/YQ/BIfIWUuAsqriRDlLi/WJlBy/ZP9bu5Qkga7G5L7NYiEgRYDGaiZigLj0F4cdwFZSs5EwhTSKPG0MHpfndfsaHcxrp15/6LqG41ItiywOTprJuBR7/UKAlPst6KEP1JUvOLpZnVavhKznPcSEgZibdepxCbz93eA8sCk8FmeIzMF0o5eK7Blf3PrlQo7ypnen8u+YSjdHqlLtQdvEZXpKxF12DLBNuBRwpeGXj61lu5ZHi5WDqwVCy/5zqarLVsPr8tV/xzO7e6QMaIE0WRvbdjHXNiLjwYXnl4ZuBNjkTAsdufz8jg4/gXu1sWSur2azIb7/z2vlGl+LpmxHhm1Nqzp7jjzlkKiSbSrrOYSVCRXRfeKEAMaUUVY/Q1T1FmV4al1QYXEaqbBtrowFL05T/uBJGIz4T7udvRrt0TtR0+SWjqktAuKVbUIthhotW6UZETrRXrOKwkCMKb399d+PTcbxpANoKTpPnXFmAuBMs84GVVKHWZm1vZI0LfGkO10xfnwt+Xq/MeJ6hQXZbh1CAldOIf6+D1A67LK8X05LahYHIkRSygHPvicvbSrfn9IiYkhDAsTfMLp5hZ44hMxICwh4epFF+AYAgML6xHYsDSrMTeIVr8d8oGT6m940P3j79+qM7UY7z90WlX4i2LE9a0vrvtZ1wEPuNvwsQs9OPte42fjx3t2bzH/C/pP4+/ARzr/zZI4lPKAAAAAElFTkSuQmCC",
e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEz0lEQVR4XsWX3W8U5RfHz3lmd2Z2drftdinQjRhKE02MV7SIhZYLSUyIMcZ45wVeatQ/4BfwlxiF+A8Yb8WXC68QiBFjIEYwigQiYFEoFVBCX3ZL931nd555zvFkQnphu11Td/VMJvMkm8l8crLn+/0ehDXqXIkxbhECKgBFPOFZDD2qNQHOl2hbzff3C4BWSHOZAe8axqG4SyH9OwBF8xo16h8YpsZik34eSLnHLQsvZwfcKy2G6h4bdW8Blun/kxl850HAXPB1I+8HQSHg722Fl/tT7lkvFZtuGqhNuRj0qAN0eKIfjtyoAmx1EUKikNno6VKwXCe4CGRubR3sO6kcmBGQ8j4XdVcBzhXDQ3v71dHpKgMCsKsQXQsgabG2kfmbRf8uI94Ephu5bPp4GIM7oYLCVAypSx3Qh/f0W0euC4CFCMwMDMC2gCAAbEtAyMz01YJ/ywKetxRcHMqkvtAIdycTON8FgFAA1ArAw4pApFg4UMnh8TTwckD++ULzLhhT8pz4l17K/pZR3Z5KqrnuAayula4kY4gjHsLtmi7PVIOlZissD6QTn7IFP9m2fXMyifPdAmgLEjLwsIu42UG4WgqWykHYKjSCxcE+7xNN5peBVOJqTEFhzEH6WwBf52uH929KCgCtAHQqYgbNwKOewoQFcL3SetDShv+o6dk+zzkFQFeGB7xLTR2UdqcdvS7Ah7dnDx3cPnp0NUDnMsxADDySVMhyXvB1pdQM+Z5vrsYVXEi59ulMyrk05mGtLcDpxcpbzw6l371WEQCEDZVhAAWRjsgZmMjo36pBuFAPvsumvbf7U/aFXR7ymgCn8oX/PT+06T3fMKBcLNdGixkgrkBuBJLzmXvlkOLuwcG089nudBuA1z+/8NFLUzseybpZKDZLvNkbjF6W6tQPbjNpFiPEhAPqmu+0CD4GwDP7Mm0AXj529jlLwQEEDAkgVIgEzAaiJ0YDiIgMUa10EVfuiAPVWgNHRM7EEzvef2PX9lmQagfwmGUBICtiBFaoonlDRGCIvg+IEXvEg5FiI0a/yTGCih6re0GG1eSTo3Ov7ny00RbgzZM/7nxx74iddbKw3CzBluQgELfrdscpiXjlRkvOtZD9gODevoxaagtwYiE//sKWoZxvmHvwJzQUd64cyCXm1hvDcRnDYRlD7uIYsowhyRgWN6W9mf2bneJ6QjT2yshobloAuiBEWoQIRIgq0oViyo3nRYjKIkRmPSkeFykeFiXkDUoxihS3RIpBpLguUrwIQGWR4rJIsRYp5k5mNC55YDVAZzNCMaOWmBGJGbXEjO5rMhUxo+ruBLZWUW8IoL0da7HjQOw4FDu+zxaUxI7rYscrH94YQOdAQhJIGmBMKIEkL4FkiVH5Ekia/ySSCUAsAmgTyYiZQSJZ3QJuWgpKEsnyGqExKa3uRigdk1Cak1DKfwmlZCODhNIGI9aBqSahdCGMQX3CxqCbsVw6AMO/VoEfxnJiNiyxPKgTlIFMTWL5onKhLhOmJZZzV2P5D2Uee7oPcrKYUMHXRhYTKgRcikurJV4tJdOxqh+CmXKRerKYHLs+/8xoJulqIpLVrCqr2bxlYVlWs0qLIZTVjHu6mp34vbLFcWLxyA+RmrKcVp5yUPdmO/6P609VRf8/TUkZ4wAAAABJRU5ErkJggg%3D%3D",
l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFfUlEQVR4Xu2Va2wUVRTHz9zZme6zpbQVSgxU21r64hUSUIkPFFPhCx/kFTEkkhYwNYX4ICFRoTFEKomhIajBICRNSgSifrBWHpaAChUhPFtqIVKUAm63y86+ZmfmzvXcnWWxBaoy+9Gb/DJ7956Z//+ee8+9AmSw1XZpIj5kxIm4EAcSRFTE2F4hs+ECjgwJ84lISDZSgIxF8lJGTiA3EQW5ywDJkLicEizLl4QXnxvt2Lx4rNTycqG0c4pPrAEALyIWVMyuwHiSQshUBkQkBymp9pJl1V5xGRHufJdZ5kh77ZIlotNZ2/F2/SfPNm39hi8LmkjYN2AJjBnvJLMn+8TlfCCo0f7j3b8NXLr4q6fwmTlHTzY3VRBJXpUzplAun1T93sU9LdkTFyzlJvwE7LcCpBRn/yrv9EfUa1t27o1917qbXDi0Xzm+bYt7sLdn/ahHSzwL65ZPWNNQV/rEtOrGKwfalgLAQ5kwMAGpzJWE8bzT0nZE0CJhoKp6XvL41gd6uqpyi0u7Zy94Kf78jCl5PGburOn5MyZXLASAYttl+OWf5kH+odGSUGSYptnddz2e7XGrntxR7e0DxjoeU+Uli3Ezbhou0BszP7Zt4LNrdFupm6waPnA6TNeej5i7eacm37ExGrxVo0RjzvIJhS4HIWRQZ1cA4LLtJegM0b0HzvSe+fvAV8fP/rzz/Y3lh9asmN/Z1Dhlw1vviJ+27At+e+JCiIvzmLYBYwfSSMB+u9x5puuLth9+GeCdg52nA9/v2esKXu4tzyurOK9Hw+ux/Kpkrw+Wzn2KJatEZ1fxcQHpu28ZzmrY+kokFn/XZOye40QQwOdxr8bOsaI5c1t+2tMS7Dl5ak332XNhdTCg5U2s3DDztYbY9cMHsksmPhadWf6IO1cWx3GBcxFzB98CiP++e+Dx+uZmg9LXix8eCyIR0meogBjUhJ6+a+B2OddVrlyx6fb5j4fMvEj/Hysll2t7zfbWw3guLMLybIJUMxkY5yJ0FxrYhd0eZHCkJUgwlG2smw9b3lgEH622aH5zEaxdNg9ww3MzGl4wJo9FFDzhWrH8VqB4K9fj4wyAGgwS1xPs1P6AsRbFPweAS0gIof94EiaoCQkDI00rBxRldWoOibFuuXSSuhCCRLAS2pFA6jbkzxuIH1EQnb83ogHG0DoKq5RBSh+owE0xPjbiq0gU6UeOIAYSTxnhWaP/5jpGFbRpchOQTDlLvkBAH1E8nRE9RXikWMcIsxe4gzhlIFGTG0hffSr2UxmwTdrA1NoPO4NKeOrtfr/fL1aWFMPur4+C5CDgcTuhZs4McDqz0kuAZM5AQtcLqkqKpKenlQH/bpYkgRdFCZjQdzOEBCGiUaAiTe4Jg1IQBCGYMQOMMeoQCZ5W0yGVbS4AWRjRceoqXOoPWKlH+LMwPw8CIaVhWt3mGr5chAhElqTOY1sbmh7UQHKd/RFrvbk4b7JMIKzqIACDmGECReI6hXEFeZCb7ZoUjcUn8YyFonEIhpTpAPBgBtBB8oQLaUa65DhZKK1Syk2lDagYQCmD+oUvQFlRLuBrUP9BKyjRuGZnCcBAkcEEHRIgA4GYbmUlblAwdAoqAgxjUe9GGE2Z1p5gGGPLAEWRIDcgDDUQRWF2x0A6IyGNgj9h/Tas0rRngM8ipNMhH5KYgBmwRPixTBENAezfQgMyN8D/t8rSfgYUfehMHGCCapjJDKi6AQ4igpYyxPcLiRupDFD7BpjJQIkl+O90GRIUi6MwRQxNTwKSAxivCkaAmAIwhJo2M2AyJuuJBBxp3Tc8xtpcKPB7ekxIbpOb+ztAlCQMADSm8UzID2wgx+vtCITCT95rFoKVjruNKeEhMTk+34//Uf9/4C/OeihXxgLfsQAAAABJRU5ErkJggg%3D%3D",
f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABklBMVEUAAAD///8bfqbc3Nyhop/T09PZ2dnY2Njx8fHy8vLz8/Oen5t2d3XW1tZyc3C5ubnJycnLy8ugoZ6hoZ7X19bX19eKioiXmJTa2tqXmJXg4ODh4eHi4uLr6+ucnZmcnZqdnpr09PTR0dHS0tLV1dV0dXPj4+Pq6uqen52LjIrK09eMjIvOzs3Q0NC3t7e4uLiRko9qa2iWl5NtbmsbfqZ0dHK9vr3b29t2dnTf39/IyMifoJygoZ3CwsLo6Ojp6enDw8Pu7u7w8PCGh4OIiYewsLC0tLR1dnRnoblsbWqpqairq6irrKmsrKutrq2ur6xub22zs7OHiISHiIW4uLZub26Jioi5uri6urq7vLtvb22Ki4dvb27FxcVra2nIz9KNjoqOjouQkY5zc3HOzs7O1djPz8+Sk4+TlJCVlpNpamd0dXJubmyYmJaZmpeam5ibm5l1dnNqpbxubm2enptub2x4eXd6enh8fXuCgoGEhYKEhYOioqHt7e2io6Hv7++jo6OkpaKlpaOlpqOmp6Wnp6Um7BAdAAAAA3RSTlMAAH5Ny5jlAAACu0lEQVR4Xu3b1Y/bQBDA4Wtm1+wgM8MhMzOUmZmZmfH/rtc5K6kq9SGbac/qjnSv38NPymmccbr2oM3vtKC7nPGMdXRaaM/THuAZSZLYX9kBmrRnqwekDkyZQpyacUmyaEe+5MjcNFj0xEdGN2rcAO5p0ABxaz6/ZLQj80+DZjYcfsdoVoPJS+sDg+2Pz+cHp7VJ4X6O0awzkzf8k8npdieZTEERbDoepxRO6Ixu1Fg6EqiuaGq7o2kFJV0CgDLLYR7wzlr0jrwRSH9SeEbVlORNRgPI3a+Ozln0mP1JWfdXmcxlFzIli6YgR18cexRiNLAZmFxReEfLSIw2T05dHso36cGkxk/XGA2bUwkSDJEmPa1y0+qiTY8HCQkRDJoO6yR2W/9LtMI/Ng0VwsY9NGKQ/6a1aC1ai9Z3rSC3cFpfzJPYUB4lSOQQWmuQfxAdJwhA//MYFk37TtVxgrBZw6O9WEEoJl1BC/JHWrQWrfv2YtH9b58gfdDlXiNRR6EjUSOB9P96+14Caw8ZDZJYzG3LAnh1QnS3LWZ0lLirNT8t9mvRWrQWrQ281uH9aK1B/obVmj3dfSFINIQn6nhL8Coe7XXlfl35N0FEa9E6fBCrtdz7eg0niBw9ey6LQoejxhWkPcQwEijLgnMDQ6HFHiJ2PtFatBatRettJBr/BkaIG29gx7O75QYm9mvxLCNau/EGdm3VdTewbvac5LYb2HB+F+0hYucTrUVrzHeC3UNjBnF/a4x33cfJr1/G+TpAqws2vWm5wVALnSpwF1lO2UHMfaGR1pf/Z0DROO0P6YhNg/x15GquSUOxqhQ0jt9wqMtpU4KdG9h3Mhts0lBKZTK1xXantpCKSODQcCY710LDdSrxjMxkOwgUKbzRbbqT4+zXz3IItA0Ezj/GomcePMQKcuH9HSx6fv70T0KzcLgY6GqkAAAAAElFTkSuQmCC",
g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAn1BMVEX////c3Nzr6+vw8PDT09PFxcXp6enV1dWdnpro6Ojt7e2en5v29vb39/fq6uqhop+kpaOdnpvs7OyhoZ7g4ODOzs7Q0NDX19eam5ecnZq9vb3CwsK6urrGxsbv7+/Hx8fy8vKPkIyTlJC2tLGSk5DLy8ubnJiWl5TR0dGdnpwbfqafoJzZ2dna2trIyMj19fXd3d3e3t74+Pj5+fn6+voyWnv7AAAAAXRSTlMAQObYZgAAAR9JREFUeF7tmkduxTAMREnJvf/ea3qv9z9bYuQE0XyAXswDuJ3FA2XPgkJEHkFEQSRSjZDBAxQED7hCHTzgARhyqz3++7MOQ1a9A18d/T4MyVSj8ZsvnGv+cM2/kImqr7xL8kCk1enXsUjyUKTUae1dDgVU+wYIaM0DyssE0AEd0EGGO+Aqj9CAMxpwQgOuzQNOeAAdnM1XuVUFn7N5QKtKB8MLSFAHiYlELpJ9wajZE9mVl9YtjSWLDnrkzqCl8XswZAd0QAd0QAd0MLrIz5UdiQ7M6/6S/YD9YEAO6IAO6GDy8oGdUGTP79gRx2qxcNAZyVOapgVyyFJGv4yBU5puPj8c7l34MU83m+12wMgNiLyCSBzH6zUwst1stsj8AK74lmQgdGoWAAAAAElFTkSuQmCC";
break;case ClientLib.Base.EFactionType.NODFaction:c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFrklEQVR4XtVW3W8UZRd/zjPPzO7Mdks/toW2ZrGIpXyIpkFNGtQLJUbfGBODgjHhwuitt8a/wAuMMYG8SSVw440avVAQQzABLBRiAiWEQIyQki3U7ee2u9vdnZ2dOf5myu72g13QNjGe7cw0z/P7OiezsyP+M8XjP6wCu8rikW+Da3buO+L8ryHODUW4eNliZsIh2LkisaZhT87Pfl/hrGnlhg8Tp8+2zgwPvDv52+ef3jv/2cdnjh54/fxXH7TePX/wCaz1Yq+T0+f0+SuH1rD7xMI4eW7QmL16ZP/EpYPD2cSge+/S/6+fPPTWl6cH9m/B/y9h7X/YewEYhBikMndNyrnzI/H4qXjm2sAX86ODeUalbnxz7fTAvsNnjx3oSd34+kUsvZEbHXwNmO2cPGWC80ja8lFAqsmU6fHEbjuf3WNE2he6YxcnCgDMXnDVI+0CmFh6ItGsmi1akwBeAp1k8nFDqe1mV39chUIh4eYEPDkA4Bz4Yw17GjCmoatGkc6Z4K4+AJEnC9lUXzab2auMMAeOCwcLwplIcHVNACOymUwHOI3g/uMA1ZvP9bpx7rPat8aM5u4oz9+BMWiLteHjr/l7wOjA6uA0gWuVtf52AIq/KbzRnxQS9M7nC3v1SKsunLQg0mgBcB+3mIM9YNiItBI4HeA2eIkTBK3aAep1T2zHs9n0HrOhJaLHdkY5O8LLKBwcVJXzMSq20wBHA7cNicx6U5C1ui8lToSEVE+6rvtKaMOuFpG5LUjqJOpXgAGWQ+t36eDGhNQi0JK1piBrda9pbmdqcuxtQ0lTi3abXEiyoJVwQRxcKgWMj9UauzVwJTQ6oRWqNQX5oO7dxHETWz1K0k6zZ19cpC5D16CV5nAP5o9rtRaw4Jg9+y1oRKHVAE0N2vUCVBNKQ7RPJ0ff0xQ1kd6g2C3AbLk/geB/yiEWFbA+h/QIQUNBqwuZjAdNQS429xPy6HFL2M6OsKJuc9uHm3nqApNUtCI63R8/PSAbyuf4XGhEoAXNYhTawRTgtTJAZTyG1pqaTu6lcFOXKOUhLqn2Q4qCo1YFXGhAK5yaSm6Atl71qgaoJOLkSdOem31OJ+dxc/M7G2nuKhxkTQPm4CxqFri+BrRMXToWtJv5z5NLPGU50eTIEOJoscL87Mta87ZeYY+zIE3UKUIC/69+QQNaApoN0G4VmmbM3jlXmYIsJ4k1Zo3MxNhu4eafMtY/20z2uMbscf32iYKD68E8hhZB04B2Izxa1jUWqTwFiSTB771wvA3Sc/qMjv4d0p3RhVcUQFHdCQRfAXzq4AINaEGToB2V7KwTRTcMz2AKcuH33pLpidHd+dzcq8pq14lLMuie6vkHppIYV66HomAK0CRoEzza4IX3hUggLj2MQWRycUNp262u/k16yIgIe+ph3fueOWaGv+cj3YckJV8T2srq7LfgFRXpedP3liQNyqamn56ZmX5fGeGldzXz8qOyTpr2p0Bjgb+UNjBUm1ONDQ+CVxyeUXgLJcghTed1VtuWZiPWGxJzN4VQkdpfL0azUkHXa0NfU0J4xMwG1sAzg7u+5vAKE8KIbVXW7JjQvEkd3ggAMDPZjp2ZcJ2SweFNHi+RILf8aoRWHcGeIR2H2S0NOSUHIbDhOSnXzkc8YyMB4wEjF01L+hZlTbILVCykWFfC10OAkMV4hRoZuX39l+StoRKLpbe1x15BcCBRcr1SjqSKeiV7ruBSuFgoXHSKxfyt64Om9cfFManpOnuuo0mlyo9ISVKrvDwSBcL5fFE9Fu/JRzo2IUDrRh4/c/xmcuzuMT0ULgU8qj7hCKyAiw+TkB4HabSiU1AXLv58blvvrhbbzgkJH8BYErFY1AWj7utUnpyu48h8JpNd//xHgKyyjnz8jG4X8oxJLbvhyk1Uhl8xI00Tw1d/Lx09u0rzo5/0rZr/r9df/mQbNYn9dLkAAAAASUVORK5CYII%3D",
e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFMElEQVR4XsWXXWwUZRfHz5nZ7213u91u2W26RRFfaoCgiSDbxpiYKIitcueFGKM3mhhD64WJ0Qgx75WxkBATjRdcCBdyIYlEJNF4gdrlI6AUiNBCtFK3Le2W3S3dnZl9nnnOe7ZbQJp2obDre+bZZDMXk9+cc+Z//gdhgaCxIwhKIAAf0glbtxDUKBYEyJ3bu8Kpw5MAKIkco75w01nQtQxGNql/BWDohx37w/FHXyJZtOT0lXOBYONB1N2nPeHIGRDyOrY8L2oKMHZi9/7ohp6XwRwnMztSsHIjRciPJEH3nK4LhH/U6+vPkyFmtLbuYk0ARo/t2hfbuH0bTJ0A8D8AyhbSlkoYqeQ1XWROWkq71Ngc/wZc+pA0VM65vEtUFSCV7PuyJdH7CqT7gVAj1H0IDh8oLSBI81Bh6MAwgj0oleNiQzR+EED9WRSuSXfbs6o6GejnDHT0bIN0EkBzABABXwzimQUm/ypJpFThwt5LipxjpLlOBiPRb0HZw9j64tj990By975oYvstgHLMgQAh6giIQKHHSRXGDfPy18NFW8t6vHXfef11R5n6D2zbOno/JfisJdHzJqSP3Q4AMA9GETqDCIHVIKfO5qzxX9OmVcgFg+H9iPCb7vQOYhtnZMklSO76PJbY/sY8gMVBVJHQ/yCCLw7F0aNpkU9bRjZ1NRSK7BO2/N0TCA+A1zWJoWfUXfZA3x7ugbfnAVQOshlEEAbXIDjrwEr1TwnLIuva4GV/XcMhBXjG1xw/BcLIYqxL3KEEn+xs2di7A6bKAEsKJculCaxGJgIrOzxdnEmTnb04AJr7uM/fcMTV1HgKw5tnFgfo7/u0paPnLZj8GQArAVTOCKAG4F/OfyVJYQtzckAamSu/1DdGdnqDDcdxWTct1gPvxxK9/wW7UCZChHsOUgCaCwCdAKBg6vxXps8pX/OGIgdw2ZaFAQa///DdSHztKiVFOyJeI6ViCFB+AmDpENwKJJq9hYu1Oc4FoE65iWGtMRx5rz4SO4zRzQsDHNrV1e30eLodqBEBSNRKnKjKPyBAPogAxIeonCKkOQbCf/bXPFSwTNO9sn3dx+2bPrq0aA8c3rN1ldvrAx21Ej6V4G++eYkZae4eAdGNGtHshbcSgTRHgEQ3y2gaBj78yLqRh57+YLa+i5VgZaR1jV/Zog5QK4Kt3ICkISAt1BM0R1F+XYTb3lwr39G0ErgO2YlhDIcjFwJrX5+oIER9a2OJd1ZwE6oaNKHkJhzwtb86WukzXN/S0RuFyZ+oap+htMmcGFBG5q9MoHHZkPc/2zKVhGgdj+M2VkKqghAJFiJgIZpmIcqwEE2wEOVYiOxKUrw+VspAOkn3KMVopZKWsExgKc6zFF9VgDmW4hwIQ7AU052G0ROxRE+EAZY6jLCYOmqJQlrxMLJCjZGUkHKah1HJR1pLGccbuATNDLCEcXxOWOOnizyOJY/jFCJkeRzneRxb92JIOtmQhO7SkCg2JAU2JJINyYS3rj4NhAYbEvN+LFknj+NQBUumiBSwJcsrcpqku7LBpugEKFXA1hesapjSTi5BaAFTqkjzAJvSAoKdl8ox0xBtHQegPDdWsZq2vDO2kTMwdfyGLVe2VMS2vKiLbM5SOMO2/Cq49LxtKOFY3kXVXkw6eDEJgzmmzOzfNi8miheTLOieLC8maV5MrpMhbF5MVK1Ws6ea4o/5lbQUr2bXA8HwGOquHK9m0yCk5E+KarqaZc580ex2O1ygkAgcJi+n0xh9TtRmO/4/x/8AHKjlP9O9djoAAAAASUVORK5CYII%3D",
l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFmklEQVR4Xu2VfWxT5QLGn3P6tbasU9nGAO+GczjQOUaAuyioSPxjSC6BmAiEixjMEEz4UiJxfs2PoJL9gyFeVDJGgID4gd443R8oRByyTRBwiDg23YAxVrvSru1pT895j4+n/WMyGHHtnz7Lr+3es/M+z/u8Z28lpFFG/WwLADvJIE5iJX4SJZo050sDV8maJmMJgI14SA7JIyOTQVrIZRIkgwLIaTK3Jw2L4c6ZjcI5NSip3IW7V9Qhb1oFgBHEMuku550MKyeR0tWAhWSRIuSULUVe+VJI8oB5DYaDPLO6cZHDKlU+UtO09eP15fUAogwRk5G67GQUssbNwuh7njDNI5e7zx7dd+rDujfa4W09/MzOH++026SVhaNcrvKyopc3159bBCCXZKQjQA4Zj9ypy0DF/R0Xt71XE3n3o4PyZ43nglW7j7nOXAhVj89zu9cu+U/Bs0+/MH7KtH+/uvtw53/BEOkIUEDugjMnH9QXn9ZJgYgGJS5aPW5rdWtXsKR4jPvMsrnTlfKZ80eCmvHQgmyGeBTA7RJSlPHLtgPgRHDmjoMWE+c7TigjMrOiN3tuakD7/qpER5MWYvS9b+Fq9bX+L/UAJze+g1tKVuJqXTqyAd6TewEw3vyN/uCVilB/IONfhWVOWB0ylN7fALSnvgUXDn/0c/MnJzFAx77a2byuZufEuZu+m/dU7YmylVUvW2q3v+s/3lgfMM0ptH1cS16Vkbraj7U07/v2wAe/g2o6tN9X+/9G59nu8MSSfE9rMKxVO21ySZbLiofnPW6AguLtAnCadFpxHb22pmhJNBx5SRgC15IsyXCOcK8F8PXi+wp2ba5v9h851bbuh9Md/b5QXL07P/OVjYunRD5s6fGUTrg9XFz6gAuuUWNAoff7WrAD4pVwHb2y6ra3dU1fNTa/AJJkAYxEeP4CITSc7+iAw5lR9WJF8ZsAHCSDh8ycC33RFU679f1D1dMPIW/qAuRO24SkYPDGnqYd8J7YAeAs6RtqC2KGMLBk+WZUrt6DyrW7Eqzei4WPvQ5dCDCMmvyCiZEgT7g9Mc14kuZ7AAhAUhlch9BiCHUdR8cnG2i+HcA5EiC6FTeQoUUBKICIJxuw01zFQCVDEFM/EZmE0NPSQHwAosRHeoiXBEmc4Y0hAxis3YjTXAsDEEhIMFSE14bOTcKkm3xDNKIkg6g01pGUdchJJEDoMUAoMHSdIxyS4wylYiglG4kn6ccQsg6xeskQoFkYRtSe2HPKIlkg2AqvIwUNDvBc5dimULB/MpLq7fFZ7phQiIYDdZBlG1wZbsyaMQ9Wp5ttRM0AJH0BNFXNKRxfZCuZNNNs3+50wOn0QBcy/L52+Ho7occC0CXNfAZ0XYckSf60BWCjuixbcf+DqwBJgAINOO7Eubb98F5qg87qhcSVqwqyc7MR8AfWPL/81grB7ZIhyTaHral6y6+bhhnAgBACQrtovtM8EcJwQIsFYQiZxmEwJ7R4BDl5eXC5biqNRCKlgEAkFELwSv9UAMMNANaqIR72AQOOX5stgwEU8yHU1RDt4wwSMc+X+QvXI3vkZAAatm5ZDKUrrIIafgOaBhHpveogcrD6UKIdGgvEE1thANFQLwxPJz/rHOO9HEwhAEwTXfEBA+YRNgdElAEYUGMADTY2EmUjBsf7oPd3m+0IoZlzpNSAxga0SB+MASuRbHYah01DXaUxNPNwoif0iB96iAENwXsIE6S2BToniV4ZOBHDWCHiUZoaiHPlNlgZVDXbiocZwCVB530Mn3oA/kBRgubn5L8h65aJAk3oUGlCGAJmS1Y9DEmRIJmHUuoN2KOqhtqGo7haggZCAmrPdyeCyeYrPvd5YbPKHABUVQe3yT7sAO5M98FQIDD9Wi3SHBYMVsj4699ketyNQAB/R//oD9nHCW2twSEjAAAAAElFTkSuQmCC",
f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABj1BMVEX///+hop/p6el0dXOXmJSTlJBqa2jY2NihoZ6XmJV2d3XX19egoZ6dnprOzs3X19aIiYeKiojQ0NDr6+vq6uqen51sbWqnp6WRko+cnZl0dHKMjIuur6yLjIro6Oh2dnTIyMh1dnRtbmupqajCwsLu7u6enpuWl5OGh4OgoZ2EhYJ0dXKHiIWHiIR6eniSk49ub2yam5hpameJioiNjoqlpqOkpaK9vr25uritrq18fXtvb22Ki4d1dnOOjou4uLZzc3Fra2mrq6irrKnPz8/t7e2lpaOQkY6mp6W7vLvOzs6CgoFubm1vb26bm5mYmJaZmpfFxcWVlpO6urrc3NzZ2dnT09PV1dXa2trg4ODz8/PW1tbJycnLy8u0tLTi4uLSvbq5ubnDw8OwsLC3t7fb29vw8PDR0dHv7+/f39+uRDqvRTzj4+Px8fGcnZrh4eGsrKv09PSioqHTwL2mGxvW19by8vJyc3Czs7Ojo6KfoJxubmyEhYPOuri4uLjS0tK9vb2en5tub254eXdub21rpm98AAAAAXRSTlMAQObYZgAAAr9JREFUeF7s0MUOwzAURNF+5DxTEIrMzPDhjRtZztqx1E2vNNuzmNZv+rf2Wl0epWgSEelxA9TkYQryEGcQLBBENfkC8kSjpO9L+8YKjatoQJQdXj5loKK1jffZvKHlvGhf3cuyEObrgOE0NT9rOQ47cuCalDP08KWFYAzPh30j30fjrtq6ptRiktwAcH3HZr47WjmOkv6nffPsbRoKozBva+oRO6NJS5OSpIWWTubee+/xxqgOqCBGQaobpUKOxIdW/udwrUgOX/jA7UGxeM8PeBQ90rWOc65DnURBuHZHoZnN+rGjS+oMJifl49tNRdZid8u7v9A+m6UTqycthWaVT5+/hLoJyi2Fbp9unpnyUvTOWqCPrig0zzZtci1K0d8ibXQ0kqBrLpFFCLQ/FpOxP/5H6FA/CZpHSSU7aKCQ/8a1uBbX4vpUTMZxjOubHhlTHkRI7iDMNZsHKMYIYR4/YqDQfv7CBEaIShGH7qGE+Ej0KEzIH9HiWlznD6PQ48tXQQfdnHZszOMpV3Js0PN6csVG9ZBDLhlG1soC92KiGFbMYK4J63r40NKvxbW4FtcOznXhNsw1m2dRrtXb3TkCoblwfgJXghfh1R3fr/FovBBxLa4LF1GuzelLRYwQs3T5ShWCLpSca6Ae4jg2oCykGxgELT1EOp+4FtfiWlxPgtD4DYwoixvY9eqwbGDSr+VdRlxncQO7sZi5Dazu2ERZ28DGvCHqIdL5xLW4Rt4Jzg4aKST7rhF33Wv0+4X0D3uAjhoJetYicq0BdKerbWS+kwhp37IWBi//z3AYaLLvruf6G9i9hftbKZo3NsNuoPENRzS/3m5xfwN7QD/cFM27nXK5MvK3qTQ66jf30fywujSA5kd+SyemIidCeMPnx3GC3tP0+/WTLQCaVd49fYZCzzx/gRLycvsVCj039/onvUF9K+HA7eQAAAAASUVORK5CYII%3D",
g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAolBMVEX////o6Ojg4ODLy8vIyMien5uhop/FxcXCwsLOzs66urrGxsa9vb2Sk5CPkIyTlJCdnpvV1dXHx8eWl5T5+fmkpaPQ0NCam5fX19fR0dHa2trZ2dnd3d3e3t6foJzc3Nzr6+vw8PDT09P29vbq6ur19fWmGxvp6ent7e339/ehoZ7y8vKdnpqlGxu2tLHv7++bnJj4+PicnZrs7Oydnpz6+voBl3AiAAAAAXRSTlMAQObYZgAAAS9JREFUeNrtmttuwjAQRDe0JNxDuPcCayehSSCUFtr//7US8QX1IBmhGcmvR+zBseZhhRE5fGARBSOpaoocHKBgcMAnOsIPDsAiX9rE/n5XbpFT81NstrdHt0h9AZy3tjQmv8bk/4rsVG1mTRE4RkJtzfZlETgD2tqqrAkgQHbMAUDoHXAdgQ7ogA7gEWr+jfgIYxQQo4ARChh6B4zoAB8h9n6VQ1X0c8YB8Ah0cH+AAnVQ8CJ5uUj+C0bFnsiuvEQBMQsGS9YtAFO4pfE94JtIB3RAB3TwWA7GKGDKjsSe2AC81/0l3wO+iXRAB3RwRw52r2tshaJ+e8eWOE6rlYHWSDZJkpTIIks7veQMrNLMF4vJ5MW4L/PMu91+HzjyBEaewUgURYMBcKTX6fSQ8wfrkQWdCN/EzwAAAABJRU5ErkJggg%3D%3D"}this.toolBar&&
this._armyBar.getLayoutParent().getLayoutParent().remove(this.toolBar);this.repairInfo&&b.remove(this.repairInfo);this.repairInfo=new qx.ui.container.Composite;var k=new qx.ui.layout.Grid;k.setColumnAlign(0,"right","middle");this.repairInfo.setLayout(k);this.repairInfo.setThemedFont("bold");this.repairInfo.set({visibility:!1});this.repairInfo.add(new qx.ui.basic.Image("webfrontend/ui/icons/icn_repair_off_points.png"),{row:0,column:1});this.labels.repairinfos.available=(new qx.ui.basic.Label("100")).set({textColor:"white"});
this.repairInfo.add(this.labels.repairinfos.available,{row:0,column:0});this.repairInfo.add(new qx.ui.basic.Image("webfrontend/ui/icons/icon_res_repair_inf.png"),{row:1,column:1});this.labels.repairinfos.infantry=(new qx.ui.basic.Label("100")).set({textColor:"white"});this.repairInfo.add(this.labels.repairinfos.infantry,{row:1,column:0});this.repairInfo.add(new qx.ui.basic.Image("webfrontend/ui/icons/icon_res_repair_tnk.png"),{row:2,column:1});this.labels.repairinfos.vehicle=(new qx.ui.basic.Label("100")).set({textColor:"white"});
this.repairInfo.add(this.labels.repairinfos.vehicle,{row:2,column:0});this.repairInfo.add(new qx.ui.basic.Image("webfrontend/ui/icons/icon_res_repair_air.png"),{row:3,column:1});this.labels.repairinfos.aircraft=(new qx.ui.basic.Label("100")).set({textColor:"white"});this.repairInfo.add(this.labels.repairinfos.aircraft,{row:3,column:0});b.add(this.repairInfo,{bottom:130,right:3});this.toolBar=new qx.ui.container.Composite;this.toolBar.setLayout(new qx.ui.layout.Canvas);this.toolBar.setHeight(53);this.toolBar.setWidth(this.TOOL_BAR_WIDTH);
this.toolBar.set({decorator:(new qx.ui.decoration.Background).set({backgroundImage:"FactionUI/menues/victory_screen/bgr_victscr_header.png"}),visibility:!1});this._armyBar.getLayoutParent().getLayoutParent().add(this.toolBar,{bottom:this.TOOL_BAR_HIGH,left:(a-this.TOOL_BAR_WIDTH)/2,visibility:!1});this.toolBarMouse=new qx.ui.container.Composite;this.toolBarMouse.setLayout(new qx.ui.layout.Canvas);this.toolBarMouse.setHeight(25);this.toolBarMouse.setWidth(740);this._armyBar.getLayoutParent().getLayoutParent().add(this.toolBarMouse,
{bottom:155,left:(a-this.TOOL_BAR_WIDTH)/2});this.toolBarMouse.hide();this.toolBarMouse.setBackgroundColor("#FF0000");this.toolBarMouse.setOpacity(0);this.toolBarMouse.setZIndex(10);this.initToolBarListeners();this.buttons.attack.activateAll=new qx.ui.form.ToggleButton("","FactionUI/icons/icon_disable_unit_active.png");this.buttons.attack.activateAll.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Deactivate All")+"</strong>"});this.buttons.attack.activateAll.addListener("changeValue",
function(){var a=this.buttons.attack.activateAll;a.getValue()?(a.setOpacity(0.75),a.setToolTipText("<strong>"+d("Activate All")+"</strong>")):(a.setOpacity(1),a.setToolTipText("<strong>"+d("Deactivate All")+"</strong>"))},this);this.buttons.attack.activateAll.addListener("execute",function(){var a=this.buttons.attack.activateAll;this.buttons.attack.activateInfantry.getValue()!==a.getValue()&&this.buttons.attack.activateInfantry.setValue(a.getValue());this.buttons.attack.activateVehicles.getValue()!==
a.getValue()&&this.buttons.attack.activateVehicles.setValue(a.getValue());this.buttons.attack.activateAir.getValue()!==a.getValue()&&this.buttons.attack.activateAir.setValue(a.getValue())},this);this.buttons.attack.activateInfantry=new qx.ui.form.ToggleButton("","FactionUI/icons/icon_alliance_bonus_inf.png");this.buttons.attack.activateInfantry.set({width:44,height:40,appearance:"button-text-small",toolTipText:"<strong>"+d("Deactivate Infantry")+"</strong>"});this.buttons.attack.activateInfantry.addListener("changeValue",
function(){var a=this.buttons.attack.activateInfantry;a.getValue()===this.buttons.attack.activateVehicles.getValue()&&a.getValue()===this.buttons.attack.activateAir.getValue()&&this.buttons.attack.activateAll.setValue(a.getValue());this.activateUnits("infantry",!a.getValue());a.getValue()?(a.setOpacity(0.75),a.setToolTipText("<strong>"+d("Activate Infantry")+"</strong>")):(a.setOpacity(1),a.setToolTipText("<strong>"+d("Deactivate Infantry")+"</strong>"))},this);this.buttons.attack.activateVehicles=
new qx.ui.form.ToggleButton("","FactionUI/icons/icon_alliance_bonus_tnk.png");this.buttons.attack.activateVehicles.set({width:44,height:40,appearance:"button-text-small",toolTipText:"<strong>"+d("Deactivate Vehicles")+"</strong>"});this.buttons.attack.activateVehicles.addListener("changeValue",function(){var a=this.buttons.attack.activateVehicles;a.getValue()===this.buttons.attack.activateInfantry.getValue()&&a.getValue()===this.buttons.attack.activateAir.getValue()&&this.buttons.attack.activateAll.setValue(a.getValue());
this.activateUnits("vehicles",!a.getValue());a.getValue()?(a.setOpacity(0.75),a.setToolTipText("<strong>"+d("Activate Vehicles")+"</strong>")):(a.setOpacity(1),a.setToolTipText("<strong>"+d("Deactivate Vehicles")+"</strong>"))},this);this.buttons.attack.activateAir=new qx.ui.form.ToggleButton("","FactionUI/icons/icon_alliance_bonus_air.png");this.buttons.attack.activateAir.set({width:44,height:40,appearance:"button-text-small",toolTipText:"<strong>"+d("Deactivate Air")+"</strong>"});this.buttons.attack.activateAir.addListener("changeValue",
function(){var a=this.buttons.attack.activateAir;a.getValue()===this.buttons.attack.activateInfantry.getValue()&&a.getValue()===this.buttons.attack.activateVehicles.getValue()&&this.buttons.attack.activateAll.setValue(a.getValue());this.activateUnits("air",!a.getValue());a.getValue()?(a.setOpacity(0.75),a.setToolTipText("<strong>"+d("Activate Air")+"</strong>")):(a.setOpacity(1),a.setToolTipText("<strong>"+d("Deactivate Air")+"</strong>"))},this);this.buttons.attack.formationReset=new qx.ui.form.Button("",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACF9JREFUeNqEV2tMXGUannPmxjADTGGGYZlpyx2hpZbey1ba9LLAguhWE29N6yU2aaLxhz/7Q/rDGKMxxsSoGK1Lq7GkabW2W7CpKZVLbVpBoVwKwi7Qcr8zM8zlnNnnPfse9nQW3ZM8c+Y7t/f53svzfp+g0xyRSETASQ8Y+JLE0PE1I2AGTAx6NgKEgSAQ4HOYEREEQfdHhxBlnAwkAIl8bx7wsiH1uh2IB2KZhMyGF/n5GWAWmAP8/4+IEGV8FfAQkAOIwD1gCogB3EAqPTPR0eGc6euz6wRBFJTXI5J7585xq8s1zc+PAP/k92eYoLQSCSHKOBn+83Bz886Omhp36ccfN2FMHzXdPX8+p7O2Nutec7MruLAgyJIksfuVOYhGo96WkhJYXVw8vuWVVzod+fnduN4J/MaEyJNhkIhEEzCwW2nmO2B894Xnntu6NDMj5z7xhLfw6NHBa8ePrx29fdsakWVZa1RzVqHc15tMhsyysrG977zTBK+0M5EBDk1QS4IIkHvXAsXDTU3lFw4d2uGfnlYST6BDr9fL4XB4BaMrGuezAhg3Hvjgg/bM0tKbGN9iIhNMQvmAqMkFoePUKQ/NXJOYkZWMEy+43KCCZhxtnOAdG/N9d/hwbtunn+7GeBOQCcRp7CoeoPg7gS3A/ksvvljac+6cjYxrK5R+YMiY8/jjC2n79t3Lf/rpO5z5Ot/4ePzAlStr2mtq1ozcumUC6RCXLxEJG2JiDJWnT/elHzjwA8bXOS+WKBREQOQSKwD+0l9Xt+vbZ599iJPsgZlnV1bqK0+d6sV/SrA2YBggYzaehOe3y5fXtbz1VvbYL7+EuAQVLYlfvdpyqKGhyZKU9D3GP3G1hEV2v5Hr2vxjVVXaSsbpp+/iRekfR4+m8kcpq4cASrIWoIGA5Pvh4LlzzX/askWvEbLw/NDQzI8nTqznMDhZQwSRjVMVeG6+/37BVHe3SWtUU7sRqoLu2lrTd0eOFGGcDazh92e57skrzbEOx09/O3PmBkgYNKoYuvvNNwL0I4s1xUq5ILLIpACrey9cyODYK8YtDoch76mnQkwiwnkp4bn4iy+88CjGu4CNgIPvk+jcBW7g3dai48cHkTcChykcmJub6Th9Oo1s8aQNKoFEZKxzor3drnV7weHDM2WffHI39+DBBSYhsyckzMZ66aWX9mO8GcgHkrlfkPzeB3rT9u7tXbtnj6B6gMpv8No1HROOVwlYiM29GzdcUjAYXFY2g0GPTO/C/zvln39el1VRMaEhIYNEGNUSAxIlGG/VkDAyCVK/sYLnn59VjdN5fng4gFK3czkaRe5u1qHr15O1sbempASTcnOpXH6mrEUZXUQVTAtK1B4kgcQs05BwcvNaIBn3FBWNx6xaZVZJ+CYmxqe6upI46Q3icov9z/SW3W9NTl7kjjbImd76aE1Nfc5jj82AREStc5AIdp89a6g7dqwkigR9zwfjfjz/QLsW4F22qxe1LTlKXtWZLgHjQAdwu+KLLy5DjOaYhFLnEUkKdZ45E/n+1VcPYLydNcXJRmhuIc1aIQB5X+7EhuX4ILW02g5XWTg/LDzbETboqzh5MnBJFP8K95spIek6SITvfPWVrDeb9+17910bNx8SuFgYDGo8sMQeIbuygS96kx9+eF7bWFAVJkisIzY5WY3XIntCOco/+0wn6vWlXWfPimScPkh949eTJ/0Gs3nr7jffpEw3DTc2upZmZ3tU43Eej8XmcpEtn6qElLHzKZs3jyHzRbXUUBFL+DiplkejXEEmQdXxc1l1dd26Z54JgYislhpI+Furq0db3n47j7rscEtLWAoEvBzKgD0jw2RLTZ3iJA0a+Ma0c9260cScnKXJzk6VhNxWXZ2W9+ST2fDCfRaZUQ0J5Sj58EPqhnvQiFATYaXUqJxvvvdeB8K6vuPLL++rxmmymSUlJu4D5IWwvqqqShUjJ+LugcviVAJwnRRcXExCP/eyy7yqqvFH6ZqQUVqqQ22noQF5kRNkKAAyS0ONjf1Qv2nVOGZuhDo6INW3Me6nsBKBCPdnKzxg7fz667yQzxdiEhI8YkEHs6ds2iSr6wZNP1d7vyV9//4YORTKRDueRE6oM16eOf3f/vrrBdkVFeSRVk7qgEpAWd+ZbDYzjCUM1Nc7SGSUOpek4GBDQ5x/ctKTUlgYZ4yNdXJOOFlSk/i/e01xcYLeaExG3Ifxnk9rPHXbtqRH3nijADb6OYcoDCEioM6ESAjJGzbEoGNlQK30iKGysKDYYmbywNWra5HhrniPJ9Fgsbh5KZdOibo4MuJCu46FHgzNDw6OaY3TOez3z7q3b89EEoa4jU8pJalZlptYy7cBj0DZdpG4kMhoWyqdY+x2c0JamoyY+kVRlHyTk5Hpvr45eGkq2u18Jvji3G4ZalqJNn2V2jaFwcBKRW02yKzIPbbSjz6SIRhFXbW1ArI6rEm+EJLTu9TWFhpra9Puhv4n5o68POvi6KgXCUrh8BUcOZK/KisromqAsr7ULEDVRaqNXUuavr7n/PkNjSdOpMwODExqu1rUVuwB46b4eLnw5Zfz0AnTpnt65q+89trf0dozNh07ts2ckEB7jUZWSq8QtTfUcSeL5cTKAHL9U1NZ/fX1GQiJday1dZEWFisZd23c6MgqL7dgcxLr3rFDzQM79hQxNHMY/5UWK7xoWVQ2Kivt1zS7Jaua4ewVNzzhmu7tTcLMJCinDpBo1eMqLAzb09MnTHFx4yxYwxyKRIaPl23/YhWUqQH/7tZV4w2ViJ3LTl1MWNRup9mczrFizrDSSSxyFo75AhNZ3if+8d75v94QuHOqW3Oz2s9/Z3uu7gtUkRO1GxftJvXfAgwA2h5U++q5JEgAAAAASUVORK5CYII=");
this.buttons.attack.formationReset.set({width:44,height:40,appearance:"button-text-small",toolTipText:"<strong>"+d("Reset Formation")+"</strong>"});this.buttons.attack.formationReset.addListener("click",this.resetFormation,this);this.buttons.attack.flipHorizontal=new qx.ui.form.Button("",c);this.buttons.attack.flipHorizontal.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Flip Horizontal")+"</strong>"});this.buttons.attack.flipHorizontal.addListener("click",
function(){this.flipFormation("horizontal")},this);this.buttons.attack.flipVertical=new qx.ui.form.Button("",e);this.buttons.attack.flipVertical.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Flip Vertical")+"</strong>"});this.buttons.attack.flipVertical.addListener("click",function(){this.flipFormation("vertical")},this);this.buttons.attack.repairMode=new qx.ui.form.ToggleButton("","FactionUI/icons/icon_mode_repair_active.png");this.buttons.attack.repairMode.set({width:44,
height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Activate Repair Mode")+"</strong>"});this.buttons.attack.repairMode.addListener("execute",this.toggleRepairMode,this);this.buttons.attack.repairMode.addListener("changeValue",function(){var a=this.buttons.attack.repairMode;a.getValue()?a.setToolTipText("<strong>"+d("Activate Repair Mode")+"</strong>"):a.setToolTipText("<strong>"+d("Deactivate Repair Mode")+"</strong>")},this);this.buttons.attack.toolbarRefreshStats=
new qx.ui.form.Button("",l);this.buttons.attack.toolbarRefreshStats.addListener("click",this.refreshStatistics,this);this.buttons.attack.toolbarRefreshStats.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Refresh Stats")+"</strong>"});this.buttons.attack.toolbarShowStats=new qx.ui.form.Button("","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QMQFzoqkrYqRAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAGrUlEQVRYw52WyY9c1RXGf+fe+4aqrqG7qgd6wm2MjYnBKFFIskAifwASipRlttlHkSJlkb8iUnYRy6yyyzKgDEgBJYRJcUAYhGkPZWx6qK7pDffek0W1CSB6Uf2WT+/q/t53zvedI5zx/Oa3v/tT3d1+yQhqtCZUHkTEGBAiUQURQVVI04zJbIogIIIxQFQ9GM30sIpmOdU7r/zy57vfdo87CyB0t176xcsv++PhF3Z5fJebH30kNarOOVnrdrh3OKTbTCnqSPCe1b01eivr5I0EQH0x4/dvfiRIL9TlbOese84EODkZ6r/++YYdBqXPiMFwqtPpROrZhG6rxXA0QSTiAyTOYW9Bv7+BNaogItHr7TsPdCDHZk18XBhgf3+fQVpx+fr3qIrAlWvX+ezuPf7x19eYjE7I0hQABRLrOB4OmU1HNFsdEUStEeoQpDg85NiqLAzgg6fbacnOek8//uSIVNpy5cpVfXg8ltHREaPjQ1QEVUjTlOYGfLp/i6efuc5sfEJZVXRXepJ88J7e/uDfiwOIIFHRNGvI8soKeSPXaEQ67Q4mCs4YQowYa3HWIVmOtykbq6vqux2ZFgXLvb5WdSWDT/7LwgDLvT6XrzwneWOFrc0GIiI+Rp576hl88KBz+QUQBDHwYDTm9ZufyaeDQ3JrGN+/Ixvbe2w88yN49W+LAeR5g53HtsnSDCMZcipie6mLflMtIHVCee8h77z1MeMKUivkS132NaXf6S2ugI+Rg6MDGlHwdYVqnP+rCMZarDFf+14Vdpcyfv3Cs9w6OMIIjGZTru3t8tqfP14cIIaazwcD0mkAjYSqIIrBWWG5t8HO5hrhW8z1w16HH6cwrUr2R/fwjTEF1eIARiydTgfTzIkhYJs51lmSJKXT7lD7uSLGyP9LospoBqOZUIVIWVg6zT6ZSc8EMGeXQIhRcdahGKxzCEKr1SHLskc3oqqIKqgiIlgrWAtGFCXiYySoLq4AMVBWFVQFo/GUdiPBpQ3EGKJGjDUQ5z7QRyByqoZy+v6RmsI5csCQ5znd7jLOOjJnUQzGCM4ZxqMReaMF6gFzOph0HiCn6lgMSI3IORQQI5RlyeDuHUbTgmaWkmeOW7dv0+0uY7Xm8GRKb7nNxb0ncM59zZdBA6N6xGQ2owzleZpQeOyxTda2tyhKT+KE6aTg8XnlSdMmT5nArAzIqSXlVGpVJXNNLrQvsLXR4tX03cUB6qrivbffonh/CWMgz3N6nRbT6YyD4ZjhwV12n7zOD777LNaYufynEEaEUXHEjcMP+cvwU+6N7y8OkGQZ33n2Ou3+GrPZDFXFWkdRlVxOHNY+T1lWaFRUFPMViKhKK+vx/fXn2Vx7gf3WK+dIwhA4PDpiVBRMixJjLWVZ0e32OCom+DCX3sfI2uraly74ZpbUKFHDOZIwKjFGfFCQZJ4HydxuW5s71CHQWlrCWIM1BplvY6jO+2dazxiM73PPjhj7yfmaUGPEe49GwVpLmrYQMYgREpPgnKOqCibjMc4IdVQSY0AMtZaU0xnWpUi05wgiZB4lNsVRMZmM2bv4JK1mTohxPoYFJuMRDwYDqnpGHR0mVNisgcRARFgJGyTnATBG6PdXSVoroJ6g0GzkgOBsAsxrniQpS60l2qZJ4SHRGnUNEiucnAzJckfgHEHkfc3b77xLo9Oh9DVBLZcuXuLypSe+HM3GwnQ65s03Xmdra4OTaQRfkjc7EEtqhAd3b/PFwdHiAHne4MUXX6S50sfXnuADxlpUIyIGRIlRWFlZ5yc//RkhKkYUBOo6Yq3B1zW72x1ufP5gcYAQPDf+8z5Zd5XaRxILFy89SavZJEYFnU+9w4P73PzwBuvbewzu3MJZQ9Lo4AxUVcHNGykPvjg8RxOKsLq6Tqu/rr4upQ4RNKqqytzzc8u12m12LlwAjWzuPk7mBHE5BqUoC/a2d/n7BzcWB9CoTKZTTdqVxLrSMih1VUmdJIQwbyprDUVRUhY1vi6YemFlKcdXM4xGQlRGowne+8UXEmtFG3mGiqhJUvLUMRrPqOpIkiQ4ZxExrPTWuHrtOls7j+PEE22CL2ZUviTNLVkmjxaEBUugqoqKsVY1ICFUgoimaSpiDBrt6T6sxAhZo0O328e4jCxJKUtDVQnHRw5/nhzwQU3HutBMU6N1Qae/rdPJidRHD9m4uIlNvrqUA7S5uPv0l+cPB/Dwc1hpgymTcywkxfDDX/3hj1e77VaMihhrJMRA9IEkTbDOgJ6OX4SoEdVTHAHvoa4hM8JnD88ex/8DigFIoHwdTR8AAAAASUVORK5CYII=");
this.buttons.attack.toolbarShowStats.addListener("click",this.toggleTools,this);this.buttons.attack.toolbarShowStats.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Open Stats Window")+"</strong>"});this.buttons.attack.toolbarUndo=new qx.ui.form.Button("","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzdJREFUeNq8ll2ITGEYx+edj901i2UNaaiVyFdK3PgohUJSyo3ykVsXeyFy7+NOElfkjpBy5Yoil5S4EclolfK5YwfL7JwzX8f/af5Hj9eZs2P3nD3165yZc877/N//857nfUwi5PA8T05GLo0xiTiO5DjBe8BaMIDfZsoEMHg32Akug00gNZUOSLD14CQYAu9BMw4B6YDZi9WrwGnQC56A161bf9Lg6Xcmsz7SAcHz4BTIge+gClaA5QxcBqO8Fn7hvTGcXVAXp/5HkLHyPhucAdvAGAV2B6RHjmGKk+c+gLfgKd0qiiAI8ToSwOAzwVFwGPxgzvUAnvXbv29IimI/g0fgNiiAWpgjvgB5eR+tL9PKoOA2TXXWgqZxnEvgrrjUTkRSnXO03Jtg8AaFO2CEv0+AI6CPLrcVUANXwXUwS+XZn1FSYRSJABH+ucy1sB8MyrhBIuxF2AeOgUOgRCEVDtYMcKeXC1dm/ZPP1pUbDcYQd2+BG/KMTkdaf8sQIYvvPBfTHg58H9zkqrfFT6eIzWALWMxZV5UI4RPYC16Bx7qope2CQhEXafdusJIDD+F+3aobJV6+AXfALnCA/5WUAIfjyb0C3iv6LvxTinlDPqULnL0UoNWg386hPEvqfEecOsfUZRi8Rke+ggUsaiZ0L2ABEdvOsrAsA9nQgtISLjN9CK6BebS6RiEVitwIutruBVoEDhFxnIvoy3gllimUkvwAbOf4dTpQowuLWPSKof0AB5QZvAPPcF3pqLa3REqge3StpigzPTk/nclOBpzAbifCn6sU+OvAUXtMZwImcVSt4FXumA47LRO6BiJqdhpW8Cq38mzcDhh+OQ4Du0pIimlIxOlAF+vHNxXcVRWy4pf0yB3g6s6z4Iyo4C7XQ4bOxJYCcXUDv/+yCu6oDW20bSmOYPZSbreym66o4C5TM0ZhsTggu+gOBhu2gksq5qr/oxWA2SfZzq8DLzlLx7J/DrfkRqQCaP18cBB8ZDvvWg7MkBaeW7cXtQOG3ZTMrB+sAUs5Y/9TXwJe6AX4V0sWUQqy7CnlMxwAC/lfhuKu2LuqiakO+I1sD3vGPHvGAoI39PO/BRgAhgJgQiBnZrUAAAAASUVORK5CYII=");
this.buttons.attack.toolbarUndo.addListener("click",function(){console.log("Undo")},this);this.buttons.attack.toolbarUndo.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Undo")+"</strong>"});this.buttons.attack.toolbarRedo=new qx.ui.form.Button("","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNq8l8uPDFEUxvtWV8/o7hmPTCeeC4bJYIhHIhZYiNjZ2CEidlYWHrEwEyxn7x+wtbSxFqyJiEeEeGS0kU4YY3qobt3lO/HdOK6q6mrd5Sa/VLoe93zn3HPuPZ3LZTTCMDSg43teRsZ9XDaD1SLkvwvAKIFT4DqoJEUiKwFN8A5sB+fB0jgRXo+hdjEMeQM8BE/BCXAWlKNE+N0mFi55UABLwDAY4GO5N8LnOT6vglFwEnwBNzDHgjG/08Kk8ZKREmMbwU4wAVaBNfKKhBgsA21i5/0BAjoqeXEJ3JZ7VoRJ4bFMvgMcB7s5mUzccpbSOE7puQ0jJblxDtyHgHaiABiXUG4CZ8B+ehIog54ybK9RaBFFUAPHwKxEwU8wLnV8lWGuMdR5tcba+3ZCQmsRErUyGIxNQhiXibayfIbAR06Sj5nYJEQiR+F2Cb6CKUlOmwN+xJqvBRcZrk807DtrOcTnkvnv6ZlxRA3QW8OKmGc5PoLxVlwEilyfYRr3nVAv57274A54xYkbEdHZA06DbUy+C67xPwTQ+w1gnyQIQxcq4yvAGzANXjMhf2WyqmuWrZTkGPNInLoCHrjG3QjIi0fo0aIT9gpFXZaQY6Kww/myBexisk2y9htRL/tK9Up+NMM6t6PMj6eZPJ3OWBGwHoyDa+CW3njiIuDxAzG0oDLecN1vgud28+gwWsyRl+BJknEtwOem8wF8V/v7IH/fiwvhX0Vv5DwKq7rUkoavDo5KREbLDJ/lfprJlIjU71oBeWZ0nSWTU5tILa33/zJ8Z+0CJwHrjE4hKwGe8jSkp4G6LvI0LKZpMHsR0KTnniOizjIcS9M79CKgwUOnwKy3R+837vUHuFFlJqBFASUVgYBiZtgJjXZqsXvNgSrXu+VEYZ4cUvtDJgJmmQcF5b1dhhc81db1Oxk9tXHMsZevOEsQ8JnkwlFZpn6K8Jw/E4/ZgrWdZQjUH42D3bbzqQTwlHvGtmmEZVeioAl2xHW24/l+CTAR/eBecFhtvxL+t2xGava86Ga/70aA/WM5TsNz3A2bUd1PP8ZPAQYA6tkaX3nBq4MAAAAASUVORK5CYII=");
this.buttons.attack.toolbarRedo.addListener("click",function(){console.log("Redo")},this);this.buttons.attack.toolbarRedo.set({width:44,height:40,padding:0,show:"icon",appearance:"button-text-small",toolTipText:"<strong>"+d("Redo")+"</strong>"});this.buttons.attack.options=(new qx.ui.form.Button).set({width:44,height:40,appearance:"button-text-small",icon:"FactionUI/icons/icon_forum_properties.png",toolTipText:"<strong>"+d("Options")+"</strong>"});this.buttons.attack.options.addListener("click",this.toggleOptionsWindow,
this);this.toolBar.add(this.buttons.attack.flipVertical,{top:10,left:10});this.toolBar.add(this.buttons.attack.flipHorizontal,{top:10,left:60});this.toolBar.add(this.buttons.attack.activateAll,{top:10,left:130});this.toolBar.add(this.buttons.attack.activateInfantry,{top:10,left:180});this.toolBar.add(this.buttons.attack.activateVehicles,{top:10,left:230});this.toolBar.add(this.buttons.attack.activateAir,{top:10,left:280});this.toolBar.add(this.buttons.attack.toolbarRefreshStats,{top:10,left:349});
this.toolBar.add(this.buttons.attack.options,{top:10,right:10});this.toolBar.add(this.buttons.attack.repairMode,{top:10,right:60});this.toolBar.add(this.buttons.attack.toolbarShowStats,{top:10,right:110});this.toolBar.add(this.buttons.attack.toolbarRedo,{top:10,right:175});this.toolBar.add(this.buttons.attack.toolbarUndo,{top:10,right:225});this.toolBar.add(this.buttons.attack.formationReset,{top:10,right:275});this.userInterface&&this._armyBar.remove(this.userInterface);if(this.options.rightSide.getValue())var h=
64,n=g,m=5,q=0,s=30,w=15,x=15;else h=90,n=f,m=15,q=16,s=46,x=w=30;this.userInterface=new qx.ui.container.Composite;this.userInterface.setLayout(new qx.ui.layout.Canvas);this.userInterface.setHeight(160);this.userInterface.setWidth(h);this.userInterface.set({decorator:(new qx.ui.decoration.Background).set({backgroundImage:n})});this.options.rightSide.getValue()?this._armyBar.add(this.userInterface,{top:0,right:53}):this._armyBar.add(this.userInterface,{top:0,left:0});this.buttons.attack.simulate=new qx.ui.form.Button(d("Simulate"));
this.buttons.attack.simulate.set({width:58,appearance:"button-text-small",toolTipText:d("Start Combat Simulation")});this.buttons.attack.simulate.addListener("click",this.startSimulation,this);this.buttons.attack.tools=new qx.ui.form.Button(d("Stats"));this.buttons.attack.tools.set({width:58,appearance:"button-text-small",toolTipText:d("Open Simulator Tools")});this.buttons.attack.tools.addListener("click",this.toggleTools,this);this.buttons.shiftFormationLeft=new qx.ui.form.Button("<");this.buttons.shiftFormationLeft.set({width:30,
appearance:"button-text-small",toolTipText:d("Shift units left")});this.buttons.shiftFormationLeft.addListener("click",function(){this.shiftFormation("l")},this);this.buttons.shiftFormationRight=new qx.ui.form.Button(">");this.buttons.shiftFormationRight.set({width:30,appearance:"button-text-small",toolTipText:d("Shift units right")});this.buttons.shiftFormationRight.addListener("click",function(){this.shiftFormation("r")},this);this.buttons.shiftFormationUp=new qx.ui.form.Button("^");this.buttons.shiftFormationUp.set({width:30,
appearance:"button-text-small",toolTipText:d("Shift units up")});this.buttons.shiftFormationUp.addListener("click",function(){this.shiftFormation("u")},this);this.buttons.shiftFormationDown=new qx.ui.form.Button("v");this.buttons.shiftFormationDown.set({width:30,appearance:"button-text-small",toolTipText:d("Shift units down")});this.buttons.shiftFormationDown.addListener("click",function(){this.shiftFormation("d")},this);var y=localStorage.ta_sim_showShift;if(y=y?JSON.parse(localStorage.ta_sim_showShift):
!0)this.userInterface.add(this.buttons.shiftFormationUp,{top:16,right:w}),this.userInterface.add(this.buttons.shiftFormationLeft,{top:35,right:s}),this.userInterface.add(this.buttons.shiftFormationRight,{top:35,right:q}),this.userInterface.add(this.buttons.shiftFormationDown,{top:54,right:x});this.userInterface.add(this.buttons.attack.tools,{top:77,left:m});this.userInterface.add(this.buttons.attack.simulate,{top:100,left:m})}catch(B){console.log(B)}},getAttackUnits:function(){try{var b=this._MainData.get_Cities().get_CurrentOwnCity(),
a=this._MainData.get_Cities().get_CurrentCity();if(null!=a){var c=a.get_Id(),e=b.get_CityArmyFormationsManager().GetFormationByTargetBaseId(c);this.view.lastUnits=e;this.view.lastUnitList=e.get_ArmyUnits().l}this.attackUnitsLoaded=!0}catch(d){console.log(d)}},optionPopup:function(){localStorage.ta_sim_popup=JSON.stringify(this.options.autoDisplayStats.getValue())},optionShowShift:function(){localStorage.ta_sim_showShift=JSON.stringify(this.options.showShift.getValue());this.options.showShift.getValue()?
this.setupInterface():(this.userInterface.remove(this.buttons.shiftFormationUp),this.userInterface.remove(this.buttons.shiftFormationLeft),this.userInterface.remove(this.buttons.shiftFormationRight),this.userInterface.remove(this.buttons.shiftFormationDown))},optionAttackLock:function(){try{localStorage.ta_sim_attackLock=JSON.stringify(this.options.attackLock.getValue()),this.options.attackLock.getValue()?this._armyBar.add(this.buttons.attack.unlock,{top:108,right:9}):this._armyBar.remove(this.buttons.attack.unlock)}catch(b){console.log(b)}},
optionRepairLock:function(){try{localStorage.ta_sim_repairLock=JSON.stringify(this.options.repairLock.getValue()),this.options.repairLock.getValue()?this._armyBar.add(this.buttons.attack.repair,{top:16,right:9}):this._armyBar.remove(this.buttons.attack.repair)}catch(b){console.log(b)}},toggleTools:function(){this.battleResultsBox.isVisible()?this.battleResultsBox.close():this.battleResultsBox.open()},toggleOptionsWindow:function(){this.optionsWindow.isVisible()?this.optionsWindow.close():this.optionsWindow.open()},
getAllUnitsDeactivated:function(){for(var b=this.getFormation(),a=!1,c=0;c<b.length;c++)if(b[c].e){a=!0;break}return a?!1:!0},refreshStatistics:function(){try{var b=this._MainData.get_Cities().get_CurrentOwnCity();!this.getAllUnitsDeactivated()&&0<b.GetOffenseConditionInPercent()&&(this.timerStart(),ClientLib.API.Battleground.GetInstance().SimulateBattle(),this.buttons.attack.toolbarRefreshStats.setEnabled(!1),this.buttons.attack.simulate.setEnabled(!1),this.labels.countDown.setWidth(110),this.count=
10,this.statsOnly=!0)}catch(a){console.log(a)}},countDownToNextSimulation:function(){try{var b=window.TACS.getInstance();b.count-=1;b.labels.countDown.setWidth(b.labels.countDown.getWidth()-11);0>=b.count&&(clearInterval(b.counter),b.buttons.attack.toolbarRefreshStats.setEnabled(!0),b.warningIcon&&(b._armyBar.remove(b.simulationWarning),b.warningIcon=!1))}catch(a){console.log(a)}},formationChangeHandler:function(){try{0==this.labels.countDown.getWidth()||this.warningIcon||(this.simulationWarning=
new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d75cf9c68c248256dfb416d8b7a86037.png"),this.simulationWarning.set({toolTipText:d("Simulation will be based on most recently refreshed stats!")}),this.options.rightSide.getValue()?this._armyBar.add(this.simulationWarning,{top:122,right:67}):this._armyBar.add(this.simulationWarning,{top:122,left:27}),this.warningIcon=!0)}catch(b){console.log(b)}},calculateLoot:function(){try{var b={1:0,2:0,3:0,6:0,7:0},a=ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(),
c;for(c in a)b[a[c].Type]+=a[c].Count;this.stats.spoils.tiberium.setLabel(this.formatNumberWithCommas(b[1]));this.stats.spoils.crystal.setLabel(this.formatNumberWithCommas(b[2]));this.stats.spoils.credit.setLabel(this.formatNumberWithCommas(b[3]));this.stats.spoils.research.setLabel(this.formatNumberWithCommas(b[6]))}catch(e){console.log(e)}},getRepairCost:function(b,a,c,e,d){if(b!=a){b=ClientLib.API.Util.GetUnitRepairCosts(e,d,0<a?(b-a)/16/c:b/16/c);for(c=a=0;c<b.length;c++)switch(e=b[c],parseInt(e.Type)){case ClientLib.Base.EResourceType.RepairChargeBase:case ClientLib.Base.EResourceType.RepairChargeInf:case ClientLib.Base.EResourceType.RepairChargeVeh:case ClientLib.Base.EResourceType.RepairChargeAir:a+=
e.Count}return a}return 0},setLabelColor:function(b,a,c){var e=["green","blue","black","red"],d=e[0];0<=c&&(a=100-a);99.99<a?d=e[3]:50<a?d=e[2]:0<a&&(d=e[1]);b.setTextColor(d)},updateLabel100:function(b,a,c){this.setLabelColor(b,a,c);a=Math.ceil(100*a)/100;b.setValue(a.toFixed(2).toString())},updateLabel100time:function(b,a,c,e){e=a.toFixed(2).toString()+" @ "+phe.cnc.Util.getTimespanString(e);this.setLabelColor(b,a,c);b.setValue(e)},updateStatsWindow:function(){var b=this,a="",c=0;0===this.stats.damage.structures.construction?
(a=d("Total Victory"),c=0):100>this.stats.damage.structures.overall?(a=d("Victory"),c=1):(a=d("Total Defeat"),c=3);this.labels.damage.outcome.setValue(a);this.labels.damage.outcome.setTextColor(["black","blue","green","red"][c]);this.updateLabel100(this.labels.damage.overall,this.stats.damage.overall,-1);this.updateLabel100(this.labels.damage.units.overall,this.stats.damage.units.overall,-1);this.updateLabel100(this.labels.damage.structures.overall,this.stats.damage.structures.overall,-1);this.updateLabel100(this.labels.damage.structures.construction,
this.stats.damage.structures.construction,-1);this.updateLabel100(this.labels.damage.structures.defense,this.stats.damage.structures.defense,-1);this.view.playerCity?this.updateLabel100(this.labels.damage.structures.command,this.stats.damage.structures.command,-1):(this.labels.damage.structures.command.setValue("--"),this.labels.damage.structures.command.setTextColor("green"));a=0<this.stats.supportLevel?this.stats.supportLevel.toString():"--";this.labels.supportLevel.setValue(d("Support lvl ")+a+
": ");this.updateLabel100(this.labels.damage.structures.support,this.stats.damage.structures.support,-1);this.labels.repair.available.setValue(phe.cnc.Util.getTimespanString(this.stats.repair.available));this.labels.attacks.available.setValue("CP:"+this.stats.attacks.availableAttacksCP+" / F:"+this.stats.attacks.availableAttacksAtFullStrength+"/ C:"+this.stats.attacks.availableAttacksWithCurrentRepairCharges);this.updateLabel100time(this.labels.health.overall,this.stats.health.overall,1,this.stats.repair.overall);
this.updateLabel100time(this.labels.health.infantry,this.stats.health.infantry,1,this.stats.repair.infantry);this.updateLabel100time(this.labels.health.vehicle,this.stats.health.vehicle,1,this.stats.repair.vehicle);this.updateLabel100time(this.labels.health.aircraft,this.stats.health.aircraft,1,this.stats.repair.aircraft);setTimeout(function(){b.stats.time=b._VisMain.get_Battleground().get_BattleDuration()/1E3;b.setLabelColor(b.labels.time,b.stats.time/120,-1);b.labels.time.setValue(b.stats.time.toFixed(2).toString())},
1)},formatNumberWithCommas:function(b){return Math.floor(b).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},unlockAttacks:function(){this._armyBar.remove(this.buttons.attack.unlock);var b=this;setTimeout(function(){b._armyBar.add(b.buttons.attack.unlock)},2E3)},unlockRepairs:function(){this._armyBar.remove(this.buttons.attack.repair);var b=this;setTimeout(function(){b._armyBar.add(b.buttons.attack.repair)},5E3)},calculateDefenseBonus:function(b,a){try{this.view.playerCityDefenseBonus=Math.round(ClientLib.Base.PointOfInterestTypes.GetTotalBonusByType(ClientLib.Base.EPOIType.DefenseBonus,
a.rpois[6].r,a.rpois[6].s))}catch(c){console.log(c)}},hideAll:function(){this.buttons.attack.repairMode.getValue()&&this.buttons.attack.repairMode.execute();this.battleResultsBox.isVisible()&&this.battleResultsBox.close()},gameOverlaysToFront:function(){webfrontend.gui.reports.ReportsOverlay.getInstance().setZIndex(20);webfrontend.gui.mail.MailOverlay.getInstance().setZIndex(20);webfrontend.gui.alliance.AllianceOverlay.getInstance().setZIndex(20);webfrontend.gui.forum.ForumOverlay.getInstance().setZIndex(20);
webfrontend.gui.research.ResearchOverlay.getInstance().setZIndex(20);webfrontend.gui.monetization.ShopOverlay.getInstance().setZIndex(20);webfrontend.gui.ranking.RankingOverlay.getInstance().setZIndex(20)},ownCityChangeHandler:function(b,a){console.log("CurrentOwnChange event");this._armyBarContainer.isVisible()&&(this.buttons.attack.toolbarRefreshStats.setEnabled(!1),this.buttons.attack.simulate.setEnabled(!1),this.onCityLoadComplete(),this.resetDisableButtons());this.updateSaveMarkers()},viewChangeHandler:function(b,
a){this.curViewMode=a;this.buttons.attack.simulate.setEnabled(!1);this.buttons.attack.toolbarRefreshStats.setEnabled(!1);try{switch(this.hideAll(),a){case ClientLib.Vis.Mode.Battleground:this.curPAVM=qx.core.Init.getApplication().getPlayArea().getViewMode();this.onCityLoadComplete();break;case ClientLib.Vis.Mode.CombatSetup:this.curPAVM=qx.core.Init.getApplication().getPlayArea().getViewMode(),this.onCityLoadComplete()}}catch(c){console.log(c)}},resetDisableButtons:function(){try{this.buttons.attack.activateInfantry.getValue(!0)&&
this.buttons.attack.activateInfantry.setValue(!1),this.buttons.attack.activateVehicles.getValue(!0)&&this.buttons.attack.activateVehicles.setValue(!1),this.buttons.attack.activateAir.getValue(!0)&&this.buttons.attack.activateAir.setValue(!1)}catch(b){console.log(b)}},onCityLoadComplete:function(){try{var b=this;if(this._VisMain.GetActiveView().get_VisAreaComplete()){if(setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_CombatSetup();a.SetPosition(0,a.get_MinYPosition()+a.get_DefenseOffsetY()*
a.get_GridHeight())},500),this.checkAttackRange(),3<this.curPAVM){this.showCombatTools();var a=this._MainData.get_Cities().get_CurrentCity();if(null!=a){var c=this._MainData.get_Cities().get_CurrentOwnCity();this.stats.attacks.attackCost=c.CalculateAttackCommandPointCostToCoord(a.get_PosX(),a.get_PosY());this.getAvailableRepairAndCP();this.calculateLoot();this.updateLayoutsList();this.getAttackUnits();if(null!=this.targetCityId&&this.targetCityId!==a.get_Id()){this.labels.repair.available.setValue(phe.cnc.Util.getTimespanString(this.stats.repair.available));
this.labels.attacks.available.setValue("CP:"+this.stats.attacks.availableAttacksCP+" / F:"+this.stats.attacks.availableAttacksAtFullStrength+"/ C:-");this.resetDisableButtons();var e=a.get_CityFaction();this.view.playerCity=e===ClientLib.Base.EFactionType.GDIFaction||e===ClientLib.Base.EFactionType.NODFaction;if(this.view.playerCity){var d=a.get_OwnerAllianceId();ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo",{id:d},phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult,
this,this.calculateDefenseBonus),null)}}this.targetCityId=a.get_Id()}}}else setTimeout(function(){b.onCityLoadComplete()},200)}catch(f){console.log(f)}},showCombatTools:function(){this.curPAVM=qx.core.Init.getApplication().getPlayArea().getViewMode();switch(this.curPAVM){case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:console.log("!!!\n TACS Warning\n!!!\n onCityLoadComplete, unexpected case pavmCombatSetupBase");break;case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:this.options.autoDisplayStats.getValue()&&
this.battleResultsBox.open();break;case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:this.options.autoDisplayStats.getValue()&&this.saveObj.checkbox.showStatsDuringAttack&&this.battleResultsBox.open();break;case ClientLib.Data.PlayerAreaViewMode.pavmCombatViewerAttacker:console.log("pavmCombatViewerAttacker");break;case ClientLib.Data.PlayerAreaViewMode.pavmCombatViewerDefender:console.log("pavmCombatViewerDefender");break;case ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay:this.saveObj.checkbox.showStatsDuringSimulation&&
(console.log("simulation case 10"),this.battleResultsBox.open())}},getAvailableRepairAndCP:function(){try{var b=this._MainData.get_Cities().get_CurrentOwnCity(),a=b.GetOffenseConditionInPercent(),c=b.get_CityUnitsData(),e=c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry,!1),d=c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle,!1),f=c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft,!1);this.stats.repair.available=ClientLib.Base.Resource.GetResourceCount(b.get_RepairOffenseResources().get_RepairChargeOffense());
this.stats.repair.max=this._MainData.get_Time().GetTimeSpan(Math.max(e,f,d));this.stats.attacks.availableCP=this._MainData.get_Player().GetCommandPointCount();this.stats.attacks.availableAttacksCP=Math.floor(this.stats.attacks.availableCP/this.stats.attacks.attackCost);this.stats.attacks.availableAttacksAtFullStrength=Math.floor(this.stats.repair.available/this.stats.repair.max)+1;this.stats.attacks.availableAttacksWithCurrentRepairCharges=Math.floor(this.stats.repair.available/this.stats.repair.overall)+
1;100!==a&&(this.stats.attacks.availableAttacksAtFullStrength--,this.stats.attacks.availableAttacksAtFullStrength+="*")}catch(g){console.log(g)}},returnSetup:function(){try{this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense,localStorage.ta_sim_last_city,0,0)}catch(b){this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense,localStorage.ta_sim_last_city,0,0),console.log(b)}},checkAttackRange:function(){try{var b=
this._MainData.get_Cities(),a=b.get_CurrentCity();if(null!=a){var c=b.get_CurrentOwnCity();10>=ClientLib.Base.Util.CalculateDistance(a.get_PosX(),a.get_PosY(),c.get_PosX(),c.get_PosY())&&(this.buttons.attack.simulate.setEnabled(!0),0>=this.count&&this.buttons.attack.toolbarRefreshStats.setEnabled(!0))}}catch(e){console.log(e)}},skipSimulation:function(){try{for(;this._VisMain.get_Battleground().get_Simulation().DoStep(!1););this._VisMain.get_Battleground().set_ReplaySpeed(1)}catch(b){console.log(b)}},
startSimulation:function(){try{if(1E4<Date.now()-this.lastSimulation){var b=this._MainData.get_Cities().get_CurrentOwnCity();!this.getAllUnitsDeactivated()&&0<b.GetOffenseConditionInPercent()&&(ClientLib.API.Battleground.GetInstance().SimulateBattle(),this.buttons.attack.toolbarRefreshStats.setEnabled(!1),this.buttons.attack.simulate.setEnabled(!1),this.labels.countDown.setWidth(110),this.count=10,this.statsOnly=!1)}else this.enterSimulationView(),this._VisMain.get_Battleground().RestartReplay(),
this._VisMain.get_Battleground().set_ReplaySpeed(1)}catch(a){console.log(a)}},onSimulateBattleFinishedEvent:function(b){this.timerEnd("onSimulateBattleFinishedEvent");try{this.statsOnly||(this.enterSimulationView(),setTimeout(function(){ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(1)},1));var a=0,c=0,e=0,d=0,f=0,g=0,k=0,h=0,n=0,m=0,q=0,s=0,w=0,x=0,y=0,B=0,t=0;this.stats.damage.structures.defense=0;this.stats.damage.structures.construction=0;this.stats.damage.structures.command=
0;this.stats.supportLevel=0;this.stats.damage.structures.support=0;this.stats.repair.infantry=0;this.stats.repair.vehicle=0;this.stats.repair.aircraft=0;this.lastSimulation=Date.now();10==this.count&&(this.counter=setInterval(this.countDownToNextSimulation,1E3));for(var u=0;u<b.length;u++){var D=b[u].Value,z=D.t,v=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(z),C=v.pt,F=v.mt,A=D.l,E=D.sh,r=D.h,p=ClientLib.API.Util.GetUnitMaxHealthByLevel(A,v,!1);switch(C){case ClientLib.Base.EPlacementType.Defense:if(this.view.playerCity)var H=
this.view.playerCityDefenseBonus,I=ClientLib.Base.Util.GetNerfAndBoostModifier(A,H),p=Math.floor(p*I/100*16)/16;k+=p;h+=r;e+=p;d+=r;break;case ClientLib.Base.EPlacementType.Offense:a+=p;c+=r;switch(F){case ClientLib.Base.EUnitMovementType.Feet:x+=p;n+=r;y+=this.getRepairCost(E,r,p,A,z);break;case ClientLib.Base.EUnitMovementType.Wheel:case ClientLib.Base.EUnitMovementType.Track:s+=p;m+=r;t+=this.getRepairCost(E,r,p,A,z);break;case ClientLib.Base.EUnitMovementType.Air:case ClientLib.Base.EUnitMovementType.Air2:w+=
p,q+=r,B+=this.getRepairCost(E,r,p,A,z)}break;case ClientLib.Base.EPlacementType.Structure:this.view.playerCity&&(H=this.view.playerCityDefenseBonus,I=ClientLib.Base.Util.GetNerfAndBoostModifier(A,H),p=Math.floor(p*I/100*16)/16),f+=p,g+=r,e+=p,d+=r}if(200<=z&&205>=z)this.stats.supportLevel=A,this.stats.damage.structures.support=r/16/p*100;else switch(z){case 131:case 158:case 195:this.stats.damage.structures.defense=0<E?r/16/p*100:0;break;case 112:case 151:case 177:this.stats.damage.structures.construction=
r/16/p*100;break;case 111:case 159:this.stats.damage.structures.command=r/16/p*100}}this.stats.health.infantry=x?n/16/x*100:100;this.stats.health.vehicle=s?m/16/s*100:100;this.stats.health.aircraft=w?q/16/w*100:100;this.stats.damage.units.overall=k?h/16/k*100:0;this.stats.damage.structures.overall=g/16/f*100;this.stats.damage.overall=d/16/e*100;this.stats.health.overall=c?c/16/a*100:0;this.stats.repair.infantry=this._MainData.get_Time().GetTimeSpan(y);this.stats.repair.aircraft=this._MainData.get_Time().GetTimeSpan(B);
this.stats.repair.vehicle=this._MainData.get_Time().GetTimeSpan(t);this.stats.repair.overall=this._MainData.get_Time().GetTimeSpan(Math.max(y,B,t));this.getAvailableRepairAndCP();this.updateStatsWindow();this.buttons.attack.simulate.setEnabled(!0)}catch(G){console.log("onSimulateBattleFinishedEvent()\n check getRepairCost()",G)}},enterSimulationView:function(){try{var b=this._MainData.get_Cities().get_CurrentCity();this._MainData.get_Cities().get_CurrentOwnCity().get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());
localStorage.ta_sim_last_city=b.get_Id();this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,b.get_Id(),0,0)}catch(a){console.log(a)}},saveUndoState:function(){var b=this.getFormation(),a=this.getTimestamp(),c=this.badClone(this.stats);this.undoCache[0]={f:b,t:a,s:c};console.log(this.undoCache[0])},wipeUndoStateAfter:function(b){var a;for(a=0;a<this.undoCache.length&&!(this.undoCache[a].t>b);a++);this.undoCache=this.undoCache.slice(0,a)},updateLayoutsList:function(){try{if(this.layouts.list.removeAll(),
this.loadCityLayouts(),this.layouts.current)for(var b in this.layouts.current){var a=this.layouts.current[b],c=new qx.ui.form.ListItem(a.label,null,a.id);this.layouts.list.add(c)}}catch(e){console.log(e)}},deleteCityLayout:function(){try{var b=this.layouts.list.getSelection();if(null!=b&&0<b.length){var a=b[0].getModel();this.layouts.current&&"undefined"!==typeof this.layouts.current[a]&&(delete this.layouts.current[a],this.saveLayouts(),this.updateLayoutsList(),this.updateSaveMarkers())}}catch(c){console.log(c)}},
loadCityLayout:function(b){try{var a=this.layouts.list.getSelection();if(null!=a&&0<a.length){var c="object"===typeof b?a[0].getModel():b;this.layouts.current&&"undefined"!==typeof this.layouts.current[c]&&this.loadFormation(this.layouts.current[c].layout)}}catch(e){console.log(e)}},saveCityLayout:function(){var b=[],a,c;try{b=this.getFormation(),a=(new Date).getTime().toString(),c=null!==this.stats.damage.structures.construction?this.layouts.label.getValue()+" ("+this.stats.damage.structures.construction.toFixed(0).toString()+
":"+this.stats.damage.structures.defense.toFixed(0).toString()+":"+this.stats.damage.units.overall.toFixed(0).toString()+")":this.layouts.label.getValue()+" (??:??:??)",this.layouts.current[a]={id:a,label:c,layout:b},this.saveLayouts(),this.updateLayoutsList(),this.updateSaveMarkers(),this.layouts.label.setValue("")}catch(e){console.log(e)}return a},loadCityLayouts:function(){try{if(null!=this._MainData.get_Cities().get_CurrentCity()){var b=this._MainData.get_Cities().get_CurrentCity().get_Id(),a=
this._MainData.get_Cities().get_CurrentOwnCity().get_Id();this.layouts.all.hasOwnProperty(b)||(this.layouts.all[b]={});this.layouts.all[b].hasOwnProperty(a)||(this.layouts.all[b][a]={});this.layouts.current=this.layouts.all[b][a]}}catch(c){console.log(c)}},loadLayouts:function(){try{var b=localStorage.ta_sim_layouts;this.layouts.all=b?JSON.parse(b):{}}catch(a){console.log(a)}},saveLayouts:function(){try{localStorage.ta_sim_layouts=JSON.stringify(this.layouts.all)}catch(b){console.log(b)}},loadFormation:function(b){try{this.layouts.restore=
!0;for(var a=0;a<b.length;a++){var c=b[a];a==b.length-1&&(this.layouts.restore=!1);for(var e=0;e<this.view.lastUnitList.length;e++)this.view.lastUnitList[e].get_Id()===c.id&&(this.view.lastUnitList[e].MoveBattleUnit(c.x,c.y),void 0===c.e?this.view.lastUnitList[e].set_Enabled(!0):this.view.lastUnitList[e].set_Enabled(c.e))}}catch(d){console.log(d)}},getFormation:function(){var b=[];try{for(var a=0;a<this.view.lastUnitList.length;a++){var c=this.view.lastUnitList[a],e={};e.x=c.get_CoordX();e.y=c.get_CoordY();
e.id=c.get_Id();e.e=c.get_Enabled();b.push(e)}}catch(d){console.log(d)}return b},shiftFormation:function(b){var a=[],c=0,e=0;"u"===b&&(c=-1);"d"===b&&(c=1);"l"===b&&(e=-1);"r"===b&&(e=1);for(b=0;b<this.view.lastUnitList.length;b++){var d=this.view.lastUnitList[b],f={},g=d.get_CoordX()+e;switch(g){case 9:g=0;break;case -1:g=8}var k=d.get_CoordY()+c;switch(k){case 4:k=0;break;case -1:k=3}f.x=g;f.y=k;f.id=d.get_Id();f.e=d.get_Enabled();a.push(f)}this.loadFormation(a)},flipFormation:function(b){var a=
[];try{for(var c=0;c<this.view.lastUnitList.length;c++){var e=this.view.lastUnitList[c],d={},f=e.get_CoordX(),g=e.get_CoordY();"horizontal"===b?f=Math.abs(f-8):"vertical"===b&&(g=Math.abs(g-3));d.x=f;d.y=g;d.id=e.get_Id();d.e=e.get_Enabled();a.push(d)}this.loadFormation(a)}catch(k){console.log(k)}},activateUnits:function(b,a){var c=[];try{for(var e=0;e<this.view.lastUnitList.length;e++){var d=this.view.lastUnitList[e],f={};switch(b){case "air":d.get_UnitGameData_Obj().mt!==ClientLib.Base.EUnitMovementType.Air&&
d.get_UnitGameData_Obj().mt!==ClientLib.Base.EUnitMovementType.Air2||d.set_Enabled(a);break;case "infantry":d.get_UnitGameData_Obj().mt===ClientLib.Base.EUnitMovementType.Feet&&d.set_Enabled(a);break;case "vehicles":d.get_UnitGameData_Obj().mt!==ClientLib.Base.EUnitMovementType.Wheel&&d.get_UnitGameData_Obj().mt!==ClientLib.Base.EUnitMovementType.Track||d.set_Enabled(a)}f.x=d.get_CoordX();f.y=d.get_CoordY();f.e=d.get_Enabled();f.id=d.get_Id();c.push(f)}this.loadFormation(c)}catch(g){console.log(g)}},
resetFormation:function(){var b=[];try{for(var a=0;a<this.view.lastUnitList.length;a++){var c=this.view.lastUnitList[a],e={};e.x=c.GetCityUnit().get_CoordX();e.y=c.GetCityUnit().get_CoordY();e.id=c.get_Id();b.push(e)}this.loadFormation(b);this.buttons.attack.activateInfantry.getValue(!0)&&this.buttons.attack.activateInfantry.setValue(!1);this.buttons.attack.activateVehicles.getValue(!0)&&this.buttons.attack.activateVehicles.setValue(!1);this.buttons.attack.activateAir.getValue(!0)&&this.buttons.attack.activateAir.setValue(!1)}catch(d){console.log(d)}},
playSound:function(b,a){var c=a.audio[b].cloneNode(!0);c.volume=a.getAudioSettings().ui/100;c.play()},getAudioSettings:function(){return JSON.parse(localStorage.getItem("CNC_Audio"))},repairUnit:function(){try{ClientLib.Net.CommunicationManager.GetInstance().SendCommand("Repair",{cityid:this.ownCityId,entityId:this.unitId,mode:4},phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult,this,window.TACS.getInstance().repairResult),this.buttonId,!0)}catch(b){console.log(b)}},repairResult:function(b,
a){try{if(a){var c=window.TACS.getInstance();c.saveObj.audio.playRepairSound&&("Inf"==c.repairButtons[b].unitType?c.playSound("soundRepairReload",c):c.playSound("soundRepairImpact",c));c._armyBar.remove(c.repairButtons[b]);delete c.repairButtons[b]}}catch(e){console.log(e)}},removeAllRepairButtons:function(){for(var b in this.repairButtons)this._armyBar.remove(this.repairButtons[b]);this.repairButtons=[]},setResizeTimer:function(){var b=this;this.repairButtonsRedrawTimer&&clearTimeout(b.repairButtonsRedrawTimer);
this.repairButtonsRedrawTimer=setTimeout(function(){b.redrawRepairButtons(b)},500)},redrawRepairButtons:function(b){b=b||this;var a=b._MainData.get_Cities().get_CurrentOwnCity().get_Id();0<b.repairButtons.length&&b.removeAllRepairButtons();for(var c=b._VisMain.get_CombatSetup(),e=c.get_ZoomFactor(),d=Math.round(c.get_MinXPosition()*e*-1)+10,c=Math.round(c.get_GridWidth()*e),e=0;e<b.view.lastUnitList.length;e++){var f=b.view.lastUnitList[e];if(1>f.get_HitpointsPercent()){var g=f.GetCityUnit().GetResourceCostForFullRepair().d,
k,h,n,m;for(m in g)switch(m=parseInt(m),m){case ClientLib.Base.EResourceType.Crystal:k=g[m];break;case ClientLib.Base.EResourceType.RepairChargeInf:h=g[m];n="Inf";break;case ClientLib.Base.EResourceType.RepairChargeVeh:h=g[m];n="Veh";break;case ClientLib.Base.EResourceType.RepairChargeAir:h=g[m],n="Air"}h=phe.cnc.Util.getTimespanString(b._MainData.get_Time().GetTimeSpan(h));k=b.formatNumberWithCommas(k);b.repairButtons[e]=new qx.ui.form.Button("","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QERCx8kSr25tQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAABmJLR0QA/wD/AP+gvaeTAAAGVUlEQVQYGQXBeZCWdQEA4Of3e9/3O3aXD2EBAcFWQcyLQ3Qcwxs88koJxXQ0y7QcTRunsfJIM9HRmTxIKrzKP/IqybPySscZdQylVZTEVRLDDeQS2F2W3e97fz1PSCmBpYuuSXMXfhcAAAAAAAAAAAA8t+yPrrz6hgAhpWTJomvSmAmjvfDwYkM7NmorgmpOFsgCMRIBRQwgIIGglLRKBlsMNpMdQ0llxFgnnXuFotYw/9xLQrjrlmvS+PGjvPLoYmlgk5H1YGSFehFUY1CJCOSRPBADWRZlyAIlWmi26GuyY6i0dTDZ1Fcq62PM+9YVdrVqQk9PT7r1B8fJd220e0fU2RaMaYv23meioe19hrf1yXOqkWqklgdZJAtBNScfN47Jk2mMoH/AutWf6V7Zq3dHU++20q6i03VLX5HDYN9GezQyYzqC3Ttyp111hrf+vNL+h03VPrhB/0drFJG2IpIjD+SB/Q+ydm3p7mte9t7HyZ6juf+Zcwxs2CIZtLPZ9NmWTSB/4PpT1YugvcKIWrDH2Jr6lwMuvukd++K5dy/QMbiV/u1UI5VINTCiw66yw/xLnrILs9u59udfU5/YMLERfdEXjOgP2orggetPFaGWB/UiqBdRHNolTBvjriv2tRq/+vEzTJ/GyILROWNyxhV8ZYz3u3vtQobHnj/bAYfmQmTSgnkm7d7QVolqRQAR8kiRU2RUczbc/4RTF3Z56OZZlr641T9f28RhMxibMT5nj4zxNRu39oMW7lz0klXvtZzSda/7b3he18wutZw8AyLEEBQxquZBrcjUJd7pNue0CR5ZfJjvXL1c74ctDpzBpIK99mH9WHfdvgrAkr9tcfqlr1udOOP8Wfo/36DIgzwGEKESKSK1SFukvYIc73WbfXKn39w6y0nffMGX72HCfprvdzhh1mM+BuRoYG8su2+OsZOj/t7NMmQByCHPgyJSL4L2epTVMjoCHRn/+8DRl8/0k8+3O+L4Z3R3n+1nlz9pDeDIPfndsgWqExqMrrGmx+DL3QiyLAohgBxCpCiCLI9qBSqBeqAj0shornHer2caLktzZz7ujt/PseaK1+13cJubX76QbDVbevhgkP/uBCknKYlADkUMijyq50GlktGWUYs0MnbL2W0v1tZM3HuUM84ZcNNlr/vlQ8dq7FYjW4/1pBIlMZAFURRDFGMpIYcsCypZ0F7NqAbqkVE1xlXZcwobGuZ1PeRTPPb4sVav/ML8s17Ribd2fp9aovYR1UAWiVEWW2IW5CEYRoQYqWRUMnS2cex05pxE15F6u0vHjX/Ip4DNm7bb/EUCm3FC21Ib3g+0H0BEEciDPCOPhABEqISglmeKSsa8mR695xNHhbsdEpY4atZTPgMcPyM64dJj/PS+49QAaxInHLTM209uYv+DiYE8qGYUkTwEECHGKM9w+DSvLfvcdTeu0osvATBvevTb7qvxodnfmOSGm6cD6Md5Z/7DR68NcMQhRLIsk8dMzAKIkATNEJg21R9uedOJB1e89NYCx88oANz21PlYhfX42FnXLjCzE4AWzj36aQNbOpgzQ8yDmAUhRhChFZJUYuVHHvz3lZa8c7Gu6ckP7/g6gJFj2mltZXCYZh/ede9bF6gB4EvM73qAPfYV26pSIIYEIqTEYBkMr/hE+usLGO/1J7f70bynwVfb0DGB/2zjsxaftvj0Q6OnRA///XQRAB8Ps+LZlUyZJEbKBEQYKpOhZmn7LlKrIm3bYNG3XzSUuHD+7p7dfCVbVrBuJ71DrBti3TBvvGH6iaM98uTJJqIT+9aZOXeqgbVf2NlMmgkIPT096cGrDjWlMzels9A1OjPulNnCtAOFkDHUy4oPWLeeBAjIAhAiR86ic38pRSkN2tndbdVT3Xo2DevZ2HTRHcvlMJSNsrl/u1pRGsbWJ97WXv2XaiBmpESJsgRiJA9kIZC1eHQ5liubpR1DpQ19pc+3JVv6GM5Hg3D3bTemqZMb3vzLEiPCNqPaokY9qudEZDkpkRIEECQhEGKQA4iaqbSzybaB0pb+0tZWw+FnXmZEY4KQUrL49l+kqZMbXv3TPYrmVrUiquTkAhFQAgAiARAAJYaa7BwqDWa7Oeasy4kNJy+8KISUElh656I097SFAAAAAAAAAAAA4O1Xn3PO964M8H8RODTRLDM3YgAAAABJRU5ErkJggg%3D%3D");
b.repairButtons[e].set({decorator:(new qx.ui.decoration.Background).set({backgroundColor:"transparent"}),width:c,height:38,show:"icon",center:!1,padding:3,appearance:"button-text-small",cursor:"pointer",toolTipText:"Crystal: "+k+" / Time: "+h+" / Type: "+n});b.repairButtons[e].addListener("execute",b.repairUnit,{ownCityId:a,unitId:f.get_Id(),buttonId:e,frm:b});b.repairButtons[e].unitType=n;b._armyBar.add(b.repairButtons[e],{left:d+c*f.get_CoordX(),top:7+38*f.get_CoordY()})}}},toggleRepairMode:function(){try{this.audio.soundRepairImpact||
(this.audio.soundRepairImpact=new Audio(window.soundRepairImpact.d),this.audio.soundRepairReload=new Audio(window.soundRepairReload.d),this.audio.soundRepairImpact.volume=this.getAudioSettings().ui/100,this.audio.soundRepairReload.volume=this.getAudioSettings().ui/100),this._armyBar.getLayoutParent().toggleEnabled(),this._armyBar.setEnabled(!0),this.userInterface.toggleEnabled(),this.battleResultsBox.toggleEnabled(),this.buttons.attack.repairMode.getValue()?(this.redrawRepairButtons(),this._armyBar.addListener("resize",
this.setResizeTimer,this),this.repairInfo.show(),this.updateRepairTimeInfobox(),this.repairModeTimer=setInterval(this.updateRepairTimeInfobox,1E3)):(this.removeAllRepairButtons(),this._armyBar.removeListener("resize",this.setResizeTimer,this),this.repairInfo.hide(),clearInterval(this.repairModeTimer))}catch(b){console.log(b)}},updateRepairTimeInfobox:function(){try{var b=window.TACS.getInstance(),a=b._MainData.get_Cities().get_CurrentOwnCity(),c=a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
e=a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),d=a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);b.stats.repair.available=ClientLib.Base.Resource.GetResourceCount(a.get_RepairOffenseResources().get_RepairChargeOffense());b.labels.repairinfos.available.setValue(phe.cnc.Util.getTimespanString(b.stats.repair.available));b.labels.repairinfos.infantry.setValue(phe.cnc.Util.getTimespanString(c-b.stats.repair.available));b.labels.repairinfos.vehicle.setValue(phe.cnc.Util.getTimespanString(e-
b.stats.repair.available));b.labels.repairinfos.aircraft.setValue(phe.cnc.Util.getTimespanString(d-b.stats.repair.available))}catch(f){console.log(f)}},resetDblClick:function(){try{var b=window.TACS.getInstance();clearInterval(b.armybarClearnClickCounter);b.armybarClickCount=0}catch(a){console.log(a)}},updateSaveMarkers:function(){try{if(this.options.markSavedTargets.getValue()){var b=this._MainData.get_Cities().get_CurrentOwnCity(),a=b.get_Id(),c=b.get_X(),d=b.get_Y(),l=this._VisMain.get_Region(),
f=this._MainData.get_Server().get_MaxAttackDistance()+0.1;switch(this._MainData.get_Player().get_Faction()){case ClientLib.Base.EFactionType.GDIFaction:var g=ClientLib.Vis.EBackgroundPlateColor.Orange;break;case ClientLib.Base.EFactionType.NODFaction:g=ClientLib.Vis.EBackgroundPlateColor.Cyan}for(b=c-f;b<c+f;b++)for(var k=d-f;k<d+f;k++){var h=l.GetObjectFromPosition(b*l.get_GridWidth(),k*l.get_GridHeight());if(!(null==h||h.get_VisObjectType()!=ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp&&h.get_VisObjectType()!=
ClientLib.Vis.VisObject.EObjectType.RegionCityType&&h.get_VisObjectType()!=ClientLib.Vis.VisObject.EObjectType.RegionNPCBase||h.get_VisObjectType()==ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp&&h.get_IsDestroyed()||h.get_VisObjectType()==ClientLib.Vis.VisObject.EObjectType.RegionCityType&&h.IsOwnBase())){h.get_BasePlate().setPlateColor(ClientLib.Vis.EBackgroundPlateColor.Black);var n=h.get_Id();if(this.layouts.all.hasOwnProperty(n)&&this.layouts.all[n].hasOwnProperty(a)){var m=0,q;for(q in this.layouts.all[n][a])this.layouts.all[n][a].hasOwnProperty(q)&&
m++;0<m&&h.get_BasePlate().setPlateColor(g)}}}}}catch(s){console.log(s)}},getDateFromMillis:function(b){return new Date(b)},getTimestamp:function(){return(new Date).getTime()},timerStart:function(){this.ts1=this.getTimestamp()},timerEnd:function(b){b=b||"nullName";this.ts2=this.getTimestamp();console.log(this.ts2-this.ts1+"ms to run "+b)},badClone:function(b){return JSON.stringify(b)}}})}function u(){try{if("undefined"!==typeof qx){var b=qx.core.Init.getApplication(),a=qx.core.Init.getApplication().getMenuBar(),
c=ClientLib.Vis.VisMain.GetInstance(),d=ClientLib.Data.MainData.GetInstance();if(b&&a&&c&&d&&"undefined"!==typeof PerforceChangelist)if(10<F||"undefined"!==typeof CCTAWrapper_IsInstalled){t();window.TACS.getInstance().initialize();if(392583<=PerforceChangelist){var l=ClientLib.Data.Cities.prototype.get_CurrentCity.toString(),f;for(f in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(f)&&"function"===typeof ClientLib.Data.Cities.prototype[f]&&-1<ClientLib.Data.Cities.prototype[f].toString().indexOf(l)&&
6==f.length){l=f;break}var g=ClientLib.Data.Cities.prototype.get_CurrentOwnCity.toString(),k;for(k in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(k)&&"function"===typeof ClientLib.Data.Cities.prototype[k]&&-1<ClientLib.Data.Cities.prototype[k].toString().indexOf(g)&&6==k.length){g=k;break}var h=ClientLib.API.Util.GetUnitRepairCosts.toString(),h=h.replace(l,g),n=h.substring(h.indexOf("{")+1,h.lastIndexOf("}")),m=Function("a,b,c",n);ClientLib.API.Util.GetUnitRepairCosts=
m}for(var q in ClientLib.Vis.BaseView.BaseView.prototype)if("function"===typeof ClientLib.Vis.BaseView.BaseView.prototype[q]&&(h=ClientLib.Vis.BaseView.BaseView.prototype[q].toString(),-1<h.indexOf(ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString()))){console.log("ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype."+q);Function("","ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype."+
q)();b="ClientLib.Vis.BaseView.BaseView.prototype."+q+"=function (a){if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7&&window.TACS.getInstance().saveObj.checkbox.disableAttackPreparationTooltips){return;}else{this.ShowToolTip_Original(a);}}";Function("",b)();console.log(b);break}qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original=qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility=
function(a){window.TACS.getInstance().saveObj.checkbox.disableArmyFormationManagerTooltips?qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(!1):qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(a)}}else F++,window.setTimeout(u,1E3);else window.setTimeout(u,1E3)}else window.setTimeout(u,1E3)}catch(s){"undefined"!==typeof console?console.log(s):window.opera?opera.postError(s):GM_log(s)}}console.log("TACS: Simulator loaded");var v=null,C=
"tr_TR de_DE pt_PT it_IT nl_NL hu_HU fr_FR fi_FI".split(" "),G={Stats:"\u0130statistik Statistik Estat\u00edstica Statistiche Statistieken Statisztika Statistiques Tiedot".split(" "),"Enemy Base:":"D\u00fc\u015fman \u00dcss\u00fc:;Feindliche Basis:;Base Inimiga:;Base Nemica:;Vijandelijke Basis:;Ellens\u00e9ges b\u00e1zis:;Base Ennemie:;Vihollisen tukikohta:".split(";"),"Defences:":"Savunma \u00dcniteleri:;Verteidigung:;Defesas:;Difesa:;Verdediging:;V\u00e9delem:;D\u00e9fenses:;Puolustus:".split(";"),
"Buildings:":"Binalar: Geb\u00e4ude: Edif\u00edcios: Strutture: Gebouwen: \u00c9p\u00fcletek: B\u00e2timents: Rakennelmat:".split(" "),"Construction Yard:":"\u015eantiye:;Bauhof:;Estaleiro:;Cantiere:;Bouwplaats:;K\u00f6zpont:;Chantier De Construction:;Rakennustukikohta:".split(";"),"Defense Facility:":"Savunma Tesisi:;Verteidigungseinrichtung:;Instala\u00e7\u00f5es de Defesa:;Stazione di Difesa:;Defensiefaciliteit:;V\u00e9delmi B\u00e1zis:;Complexe De D\u00e9fense:;Puolustuslaitos:".split(";"),"Command Center:":"Komuta Merkezi:;Kommandozentrale:;Centro de Comando:;Centro di Comando:;Commandocentrum:;Parancsnoki k\u00f6zpont:;Centre De Commandement:;Komentokeskus:".split(";"),
"Available Repair:":"Mevcut Onar\u0131m:;;;;;;;Korjausaikaa j\u00e4ljell\u00e4:".split(";"),"Available Attacks:":"Mevcut Sald\u0131r\u0131lar:;;;;;;;Hy\u00f6kk\u00e4yksi\u00e4:".split(";"),"Overall:":"T\u00fcm Birlikler:;Gesamt:;Geral:;Totale:;Totaal:;\u00c1ttekint\u00e9s:;Total:;Yhteens\u00e4:".split(";"),"Infantry:":"Piyadeler: Infanterie: Infantaria: Fanteria: Infanterie: Gyalogs\u00e1g: Infanterie: Jalkav\u00e4ki:".split(" "),"Vehicle:":"Motorlu Birlikler:;Fahrzeuge:;Ve\u00edculos:;Veicoli:;Voertuigen:;J\u00e1rmu:;V\u00e9hicules:;Ajoneuvot:".split(";"),
"Aircraft:":"Hava Ara\u00e7lar\u0131:;Flugzeuge:;Avi\u00f5es:;Velivoli:;Vliegtuigen:;L\u00e9giero:;Avions:;Lentokoneet:".split(";"),"Outcome:":"Sonu\u00e7: Ergebnis: Resultado: Esito: Uitkomst: Eredm\u00e9ny: R\u00e9sultat: Lopputulos:".split(" "),Unknown:"Bilinmiyor Unbekannt Desconhecido Sconosciuto Onbekend Ismeretlen Inconnu Tuntematon".split(" "),"Battle Time:":"Sava\u015f S\u00fcresi:;Kampfdauer:;Tempo de Batalha:;Tempo di Battaglia:;Gevechtsduur:;Csata ideje:;Dur\u00e9e Du Combat:;Taistelun kesto:".split(";"),
Layouts:"Dizili\u015f Layouts Forma\u00e7\u00f5es Formazione Indelingen Elrendez\u00e9s Dispositions Asetelmat".split(" "),Load:"Y\u00fckle Laden Carregar Carica Laad T\u00f6lt\u00e9s Charger Lataa".split(" "),"Load this saved layout.":"Kay\u0131tl\u0131 dizili\u015fi y\u00fckle.;Gespeichertes Layout laden.;Carregar esta forma\u00e7\u00e3o guardada.;Carica questa formazione salvata.;Laad deze opgeslagen indeling.;T\u00f6ltsd be ezt az elmentett elrendez\u00e9st.;Charger Cette Disposition.;Lataa valittu asetelma.".split(";"),
Delete:"Sil L\u00f6schen Apagar Cancella Verwijder T\u00f6rl\u00e9s Effacer Poista".split(" "),"Name: ":"\u0130sim: ;Name: ;Nome: ;Nome: ;Naam: ;N\u00e9v: ;Nom: ;Nimi: ".split(";"),"Delete this saved layout.":"Kay\u0131tl\u0131 dizili\u015fi sil.;Gew\u00e4hltes Layout l\u00f6schen.;Apagar esta forma\u00e7\u00e3o guardada.;Cancella questa formazione salvata.;Verwijder deze opgeslagen indeling.;T\u00f6r\u00f6ld ezt az elmentett elrendez\u00e9st.;Effacer Cette Disposition.;Poista valittu asetelma.".split(";"),
Save:"Kaydet Speichern Guardar Salva Opslaan Ment\u00e9s Sauvegarder Tallenna".split(" "),"Save this layout.":"Bu dizili\u015fi kaydet.;Layout speichern.;Guardar esta forma\u00e7\u00e3o.;Salva questa formazione.;Deze indeling opslaan.;Mentsd el ezt az elrendez\u00e9st.;Sauvegarder Cette Disposition.;Tallenna nykyinen asetelma.".split(";"),Info:"Bilgi Info Info Info Info Info Infos Tietoa".split(" "),Forums:"Forum Forum F\u00f3runs Forum Forums F\u00f3rum Forums Keskustelupalsta".split(" "),Spoils:"Ganimetler Rohstoffausbeute Esp\u00f3lios Bottino Opbrengst Zs\u00e1km\u00e9ny Butin Sotasaalis".split(" "),
Options:"Se\u00e7enekler Optionen Op\u00e7\u00f5es: Opzioni: Opties: Opci\u00f3k: Options: Asetukset".split(" "),"TACS Options":"TACS Se\u00e7enekleri;;;;;;;".split(";"),"Auto display stats":"\u0130statistik penceresini otomatik olarak g\u00f6ster;Dieses Fenster automatisch \u00f6ffnen;Mostrar esta caixa automaticamente;Apri automaticamente la finestra Strumenti;Dit venster automatisch weergeven;Ezen ablak aut\u00f3matikus megjelen\u00edt\u00e9se;Affich. Auto. de cette Fen\u00eatre;N\u00e4yt\u00e4 simuloinnin tiedot automaattisesti".split(";"),
"Show shift buttons":"Kayd\u0131rma tu\u015flar\u0131n\u0131 g\u00f6ster;Bewegungstasten anzeigen;Mostrar bot\u00f5es de deslocamento;Mostra i pulsanti di spostamento;Verschuifknoppen weergeven;Eltol\u00f3 gombok megjelen\u00edt\u00e9se;Affich. Auto. Boutons de D\u00e9placement;N\u00e4yt\u00e4 armeijan siirtopainikkeet".split(";"),"Warning!":"Uyar\u0131! Warnung! Aviso! Attenzione! Waarschuwing! Figyelem! Attention! Varoitus!".split(" "),Simulate:"Simule et;Simulieren;Simular;Simula;Simuleer;Szimul\u00e1ci\u00f3;Simuler;Simuloi".split(";"),
"Start Combat Simulation":"Sava\u015f Simulasyonunu Ba\u015flat;Kampfsimulation starten;Come\u00e7ar a simala\u00e7\u00e3o de combate;Avvia simulazione;Start Gevechtssimulatie;Csata szimul\u00e1ci\u00f3 elind\u00edt\u00e1sa;D\u00e9marrer La Simulation Du Combat;Aloita taistelun simulaatio".split(";"),Setup:"D\u00fczen Aufstellung Configura\u00e7\u00e3o Setup Opzet Elrendez\u00e9s Organisation Takaisin".split(" "),"Return to Combat Setup":"Ordu d\u00fczenini g\u00f6ster;Zur\u00fcck zur Einheitenaufstellung;Voltar \u00e0 configura\u00e7\u00e3o de combate;Ritorna alla configurazione;Keer terug naar Gevechtsopzet;Vissza az egys\u00e9gek elrendez\u00e9s\u00e9hez;Retourner \u00e0 l'Organisation Des Troupes;Return to Combat Setup".split(";"),
Unlock:"Kilidi a\u00e7;Freigabe;Desbloquear;Sblocca;Ontgrendel;Felold;Debloquer;Avaa".split(";"),"Open Simulator Tools":"Simulat\u00f6r Ara\u00e7lar\u0131n\u0131 G\u00f6ster;Extras \u00f6ffnen;Abrir as ferramentas do simulador;Apri strumenti;Open Simulator Gereedschap;Megnyitja a szimul\u00e1tor inform\u00e1ci\u00f3s ablak\u00e1t;Ouvrir Les R\u00e9glages Du Simulateur;Avaa simulaattorin ty\u00f6kalut".split(";"),"Shift units left":"Birlikleri sola kayd\u0131r;Einheiten nach links bewegen;Deslocar as unidades para a esquerda;Spostare le unit\u00e0 a sinistra;Verschuif eenheden links;Egys\u00e9gek eltol\u00e1sa balra;D\u00e9placer Les Unit\u00e9s Vers La Gauche;Siirt\u00e4\u00e4 yksikk\u00f6j\u00e4 vasemmalle".split(";"),
"Shift units right":"Birlikleri sa\u011fa kayd\u0131r;Einheiten nach rechts bewegen;Deslocar as unidades para a direita;Spostare le unit\u00e0 a destra;Verschuif eenheden rechts;Egys\u00e9gek eltol\u00e1sa jobbra;D\u00e9placer Les Unit\u00e9s Vers La Droite;Siirt\u00e4\u00e4 yksikk\u00f6j\u00e4 oikealle".split(";"),"Shift units up":"Birlikleri yukar\u0131 kayd\u0131r;Einheiten nach oben bewegen;Deslocar as unidades para cima;Spostare le unit\u00e0 in alto;Verschuif eenheden omhoog;Egys\u00e9gek eltol\u00e1sa fel;D\u00e9placer Les Unit\u00e9s Vers Le Haut;Siirt\u00e4\u00e4 yksikk\u00f6j\u00e4 yl\u00f6s".split(";"),
"Shift units down":"Birlikleri a\u015fa\u011f\u0131 kayd\u0131r;Einheiten nach unten bewegen;Deslocar as unidades para baixo;Spostare le unit\u00e0 in basso;Verschuif eenheden omlaag;Egys\u00e9gek eltol\u00e1sa le;D\u00e9placer Les Unit\u00e9s Vers Le Bas;Siirt\u00e4\u00e4 yksikk\u00f6j\u00e4 alas".split(";"),"Total Victory":"Mutlak Zafer;Gesamtsieg;Vit\u00f3ria Total;Vittoria Totale;Totale Overwinning;Teljes gyozelem;Victoire Totale;Totaalinen Voitto".split(";"),Victory:"Zafer Sieg Vit\u00f3ria Vittoria Overwinning Gyozelem Victoire Voitto".split(" "),
"Total Defeat":"Mutlak Yenilgi;Totale Niederlage;Derrota total;Sconfitta Totale;Totale Nederlaag;Teljes veres\u00e9g;D\u00e9faite Totale;Total Tappio".split(";"),"Support lvl ":'Takviye seviyesi ;Stufe Supportwaffe ;N\u00edvel do Suporte ;Supporto lvl ;Ondersteuningsniveau ;"Support" \u00e9p\u00fclet szintje ;Lvl. Du Support ;Tukitykist\u00f6n taso '.split(";"),Refresh:"Yenile Erfrischen Actualizar Rinfrescare Verversen Felfriss\u00edt Actualiser P\u00e4ivit\u00e4".split(" "),"Refresh Stats":"\u0130statistikleri Yenile;Erfrischen Statistik;Estat\u00edstica;Rinfrescare Statistiche;Verversen Statistieken;Friss\u00edt\u00e9s Stats;Actualiser Les Stats;P\u00e4ivit\u00e4 tiedot".split(";"),
"Side:":"Taraf: Seite Lado:  Zijde  C\u00f4t\u00e9 Sijainti:".split(" "),Left:"Sol Links Esquerda  Links  Gauche Vasen".split(" "),Right:"Sa\u011f Rechts Direita  Rechts  Droite Oikea".split(" "),"Locks:":"Kilitler: Freigabe Bloquear:  Vergrendelingen:  V\u00e9rouiller: Varmistimet:".split(" "),Attack:"Sald\u0131r\u0131 Angriff Atacar  Aanvallen  Attaquer Hy\u00f6kk\u00e4ys".split(" "),Repair:"Onar\u0131m Reparatur Reparar  Repareren  R\u00e9parer Korjaus".split(" "),Reset:"S\u0131f\u0131rla       Palauta".split(" "),
"Simulation will be based on most recently refreshed stats!":"Simulasyon en son g\u00fcncellenen istatistiklere g\u00f6re yap\u0131lacakt\u0131r!;Die Simulation basiert auf den zuletzt aktualisierten Stand;A simula\u00e7\u00e3o vai ser baseada na mais recente data!;;Simulatie zal gebaseerd worden op meest recentelijke ververste statistieken!;;La Simulation sera bas\u00e9e en fonction des derni\u00e8res stats actualis\u00e9es !;Simulaatio suoritetaan viimeisimm\u00e4n p\u00e4ivityksen tiedoilla!".split(";"),
"Unlock Attack Button":"Sald\u0131r\u0131 D\u00fc\u011fmesinin Kilidini A\u00e7;Angriffsbutton freigeben;Desbloquear o bot\u00e3o de ataque;Sblocca pulsante d'attacco;Ontgrendel Aanvalsknop;a T\u00e1mad\u00e1s gomb felold\u00e1sa;D\u00e9bloquer Le Bouton d'Attaque;Poista hy\u00f6kk\u00e4usnapin lukitus".split(";"),"Unlock Repair Button":"Onar\u0131m D\u00fc\u011fmesinin Kilidini A\u00e7;Reparaturbutton freigeben;Desbloquear bot\u00e3o de repara\u00e7\u00e3o;;Ontgrendel Repareerknop;;D\u00e9bloquer Le Bouton de R\u00e9paration;Poista korjausnapin lukitus".split(";"),
"Unlock Reset Button":"S\u0131f\u0131rlama D\u00fc\u011fmesinin Kilidini A\u00e7;;;;;;;Avaa Tyhjenn\u00e4 nappi".split(";"),SKIP:"ATLA       ".split(" "),"Skip to end":"Simulasyonu atla;Zum Ende Vorspringen;;;;;;Mene loppuun".split(";"),"Reset Formation":"Dizili\u015fi S\u0131f\u0131rla;;;;;;;Palauta armeijan oletusasetelma".split(";"),"Flip Horizontal":"Yatay \u00c7evir;Horizontal Spiegeln;;;;;;K\u00e4\u00e4nn\u00e4 vaakasuunnassa".split(";"),"Flip Vertical":"Dikey \u00c7evir;Vertikal Spiegeln;;;;;;K\u00e4\u00e4nn\u00e4 pystysuunnassa".split(";"),
"Activate All":"Hepsini Aktifle\u015ftir;Alle Aktivieren;;;;;;Aktivoi kaikki".split(";"),"Deactivate All":"Hepsini Deaktifle\u015ftir;Alle Deaktivieren;;;;;;Poista kaikki k\u00e4yt\u00f6st\u00e4".split(";"),"Activate Infantry":"Piyadeleri Aktifle\u015ftir;Infanterie Aktivieren;;;;;;Aktivoi jalkav\u00e4ki".split(";"),"Deactivate Infantry":"Piyadeleri Deaktifle\u015ftir;Infanterie Deaktivieren;;;;;;Poista jalkav\u00e4ki k\u00e4yt\u00f6st\u00e4".split(";"),"Activate Vehicles":"Motorlu Birlikleri Aktifle\u015ftir;Fahrzeuge Aktivieren;;;;;;Aktivoi ajoneuvot".split(";"),
"Deactivate Vehicles":"Motorlu Birlikleri Deaktifle\u015ftir;Fahrzeuge Deaktivieren;;;;;;Poista ajoneuvot k\u00e4yt\u00f6st\u00e4".split(";"),"Activate Air":"Hava Ara\u00e7lar\u0131n\u0131 Aktifle\u015ftir;Flugzeuge Aktivieren;;;;;;Aktivoi lentokoneet".split(";"),"Deactivate Air":"Hava Ara\u00e7lar\u0131n\u0131 Deaktifle\u015ftir;Flugzeuge Deaktivieren;;;;;;Poista lentokoneet k\u00e4yt\u00f6st\u00e4".split(";"),"Activate Repair Mode":"Onar\u0131m Modunu A\u00e7;Reparatur Modus Aktivieren;;;;;;Aktivoi korjaustila".split(";"),
"Deactivate Repair Mode":"Onar\u0131m Modunu Kapat;Reparatur Modus Deaktivieren;;;;;;Poista korjaustila k\u00e4yt\u00f6st\u00e4".split(";"),"Version: ":"S\u00fcr\u00fcm: ;;;;;;;Versio: ".split(";"),"Mark saved targets on region map":"Kaydedilmi\u015f hedefleri haritada i\u015faretle;Gespeicherte Ziele auf der Karte Markieren;;;;;;Merkitse tallennetut kohteet alue kartalle".split(";"),"Enable 'Double-click to (De)activate units'":"\u00c7ift-t\u0131klama ile birlikleri (de)aktifle\u015ftirmeyi etkinle\u015ftir;Doppel-Klick zum Einheiten (De)-Aktivieren ;;;;;;Tuplaklikkaus aktivoi/deaktivoi yksik\u00f6t".split(";"),
"Show Stats During Attack":"\u0130statistikleri sald\u0131r\u0131 s\u0131ras\u0131nda g\u00f6ster;;;;;;;N\u00e4yt\u00e4 tiedot -ikkuna hy\u00f6kk\u00e4yksen aikana".split(";"),"Show Stats During Simulation":"\u0130statistikleri simulasyondayken g\u00f6ster;;;;;;;N\u00e4yt\u00e4 tiedot -ikkuna simuloinnin aikana".split(";"),"Skip Victory-Popup After Battle":"Sava\u015f Bitiminde Zafer Bildirimini Atla;;;;;;;Ohita taistelun j\u00e4lkeinen voittoruutu".split(";"),"Stats Window Opacity":"\u0130statistik Penceresi Saydaml\u0131\u011f\u0131;;;;;;;Tiedot -ikkunan l\u00e4pin\u00e4kyvyys".split(";"),
"Disable Unit Tooltips In Army Formation Manager":"Ordu Dizili\u015fi Y\u00f6neticisinde Birlik \u0130pu\u00e7lar\u0131n\u0131 Gizle;;;;;;;Poista k\u00e4yt\u00f6st\u00e4 yksik\u00f6iden ty\u00f6kaluvihjeet armeijan muodostamisikkunassa".split(";"),"Disable Tooltips In Attack Preparation View":"Sald\u0131r\u0131 Haz\u0131rl\u0131k G\u00f6r\u00fcn\u00fcm\u00fcnde \u0130pu\u00e7lar\u0131n\u0131 Gizle;;;;;;;Poista ty\u00f6kaluvihjeet k\u00e4yt\u00f6st\u00e4 hy\u00f6kk\u00e4yksen valmisteluikkunassa".split(";"),
Undo:"Geri Al;;;;;;;Kumoa".split(";"),Redo:"\u0130leri Al;;;;;;;Tee uudelleen".split(";"),"Open Stats Window":"\u0130statistik Penceresini A\u00e7;;;;;;;Avaa tiedot -ikkuna".split(";")},F=0;/commandandconquer\.com/i.test(document.domain)&&window.setTimeout(u,1E3)}.toString()+")();";t.type="text/javascript";/commandandconquer\.com/i.test(document.domain)&&document.getElementsByTagName("head")[0].appendChild(t);window.soundRepairImpact={info:"Impact Wrench Sound; Used in TACS; courtesy of: http://www.freesfx.co.uk",
d:"data:video/ogg;base64,T2dnUwACAAAAAAAAAADGNAAAAAAAAGaVV6ABHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAxjQAAAEAAACQEk9NDlL///////////////8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgEAAAAhAAAAQ09NTUVOVFM9aHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrAQV2b3JiaXMiQkNWAQBAAAAkcxgqRqVzFoQQGkJQGeMcQs5r7BlCTBGCHDJMW8slc5AhpKBCiFsogdCQVQAAQAAAh0F4FISKQQghhCU9WJKDJz0IIYSIOXgUhGlBCCGEEEIIIYQQQgghhEU5aJKDJ0EIHYTjMDgMg+U4+ByERTlYEIMnQegghA9CuJqDrDkIIYQkNUhQgwY56ByEwiwoioLEMLgWhAQ1KIyC5DDI1IMLQoiag0k1+BqEZ0F4FoRpQQghhCRBSJCDBkHIGIRGQViSgwY5uBSEy0GoGoQqOQgfhCA0ZBUAkAAAoKIoiqIoChAasgoAyAAAEEBRFMdxHMmRHMmxHAsIDVkFAAABAAgAAKBIiqRIjuRIkiRZkiVZkiVZkuaJqizLsizLsizLMhAasgoASAAAUFEMRXEUBwgNWQUAZAAACKA4iqVYiqVoiueIjgiEhqwCAIAAAAQAABA0Q1M8R5REz1RV17Zt27Zt27Zt27Zt27ZtW5ZlGQgNWQUAQAAAENJpZqkGiDADGQZCQ1YBAAgAAIARijDEgNCQVQAAQAAAgBhKDqIJrTnfnOOgWQ6aSrE5HZxItXmSm4q5Oeecc87J5pwxzjnnnKKcWQyaCa0555zEoFkKmgmtOeecJ7F50JoqrTnnnHHO6WCcEcY555wmrXmQmo21OeecBa1pjppLsTnnnEi5eVKbS7U555xzzjnnnHPOOeec6sXpHJwTzjnnnKi9uZab0MU555xPxunenBDOOeecc84555xzzjnnnCA0ZBUAAAQAQBCGjWHcKQjS52ggRhFiGjLpQffoMAkag5xC6tHoaKSUOggllXFSSicIDVkFAAACAEAIIYUUUkghhRRSSCGFFGKIIYYYcsopp6CCSiqpqKKMMssss8wyyyyzzDrsrLMOOwwxxBBDK63EUlNtNdZYa+4555qDtFZaa621UkoppZRSCkJDVgEAIAAABEIGGWSQUUghhRRiiCmnnHIKKqiA0JBVAAAgAIAAAAAAT/Ic0REd0REd0REd0REd0fEczxElURIlURIt0zI101NFVXVl15Z1Wbd9W9iFXfd93fd93fh1YViWZVmWZVmWZVmWZVmWZVmWIDRkFQAAAgAAIIQQQkghhRRSSCnGGHPMOegklBAIDVkFAAACAAgAAABwFEdxHMmRHEmyJEvSJM3SLE/zNE8TPVEURdM0VdEVXVE3bVE2ZdM1XVM2XVVWbVeWbVu2dduXZdv3fd/3fd/3fd/3fd/3fV0HQkNWAQASAAA6kiMpkiIpkuM4jiRJQGjIKgBABgBAAACK4iiO4ziSJEmSJWmSZ3mWqJma6ZmeKqpAaMgqAAAQAEAAAAAAAACKpniKqXiKqHiO6IiSaJmWqKmaK8qm7Lqu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67quC4SGrAIAJAAAdCRHciRHUiRFUiRHcoDQkFUAgAwAgAAAHMMxJEVyLMvSNE/zNE8TPdETPdNTRVd0gdCQVQAAIACAAAAAAAAADMmwFMvRHE0SJdVSLVVTLdVSRdVTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTdM0TRMIDVkJAAABAMAchM4tqJBJCS2YiijEJOhSQQcp6M4wgqD3EjmDnMcUOUKQxpZJhJgGQkNWBABRAACAMcgxxBxyzlHqJEXOOSodpcY5R6mj1FFKsaYYM0oltlRr45yj1FHqKKUaS4sdpRRjirEAAIAABwCAAAuh0JAVAUAUAACBEFIKKYWUYs4p55BSyjHmHFKKOaecU845KJ2UyjkmnZMSKaWcY84p55yUzknlnJPSSSgAACDAAQAgwEIoNGRFABAnAOBwHM2TNE0UJU0TRU8UXdUTRdWVNM00NVFUVU0UTdVUVVkWTdWVJU0zTU0UVVMTRVUVVVOWTVWVZc80bdlUVd0WVVW3ZVv2bVeWdd8zTdkWVdXWTVW1dVeWdd2Vbd2XNM00NVFUVU0UVddUVVs2VdW2NVF0XVFVZVlUVVl2Zde2VVfWdU0UXddTTdkVVVWWVdnVZVWWdV90VV1XXdfXVVf2fdnWfV3WdWEYVdXWTdfVdVV2dV/Wbd+XdV1YJk0zTU0UXVUTRVU1VdW2TVWVbU0UXVdUVVkWTdWVVdn1ddV1bV0TRdcVVVWWRVWVXVV2dd+VZd0WVVW3Vdn1dVN1dV22bWOYbVsXTlW1dVV2dWGVXd2XddsYbl33jc00bdt0XV03XVfXbV03hlnXfV9UVV9XZdk3Vln2fd33sXXfGEZV1XVTdoVfdWVfuHVfWW5d57y2jWz7yjHrvjP8RnRfOJbVtimvbgvDrOv4wu4su/ArPdO0ddNVdd1UXV+XbVsZbl1HVFVfV2VZ+E1X9oVb143j1n1nGV2XrsqyL6yyrAy37xvD7vvCstq2ccy2jmvryrH7SmX3lWV4bdtXZl0nzLptHLuvM35hSAAAwIADAECACWWg0JAVAUCcAACDkHOIKQiRYhBCCCmFEFKKGIOQOSclY05KKSW1UEpqEWMQKsekZM5JCaW0FEppKZTSWikltlBKi621WlNrsYZSWgultFhKaTG1VmNrrcaIMQmZc1Iy56SUUlorpbSWOUelc5BSByGlklKLJaUYK+ekZNBR6SCkVFKJqaQUYyglxpJSjCWlGluKLbcYcw6ltFhSibGkFGOLKccWY84RY1Ay56RkzkkppbRWSmqtck5KByGlzEFJJaUYS0kpZs5J6iCk1EFHqaQUY0kptlBKbCWlGktJMbYYc24pthpKabGkFGtJKcYWY84tttw6CK2FVGIMpcTYYsy5tVZrKCXGklKsJaXaYqy1txhzDaXEWFKpsaQUa6ux1xhjzSm2XFOLNbcYe64tt15zDj61VnOKKdcWY+4xtyBrzr13EFoLpcQYSomxxVZrizHnUEqMJaUaS0mxthhzba3WHkqJsaQUa0mpxhhjzrHGXlNrtbYYe04t1lxz7r3GHINqreYWY+4ptpxrrr3X3IIsAABgwAEAIMCEMlBoyEoAIAoAADCGMecgNAo555yUBinnnJOSOQchhJQy5yCEkFLnHISSWuucg1BKa6WUlFqLsZSSUmsxFgAAUOAAABBgg6bE4gCFhqwEAFIBAAyOY1meZ5qqasuOJXmeKKqmq+q2I1meJ4qqqqq2bXmeKaqqqrqurlueJ4qqqrquq+ueaaqqqrquLOu+Z5qqqqquK8u+b6qq67quLMuy8Juq6rquK8uy7Qur68qyLNu2bhvD6rqyLMu2bevKceu6rvu+sRxHtq77ujD8xnAkAAA8wQEAqMCG1RFOisYCCw1ZCQBkAAAQxiBkEFLIIIQUUkgphJRSAgAABhwAAAJMKAOFhqwEAKIAAAAirLXWWmOttdZai6y11lprraWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUgEAUhMOAFIPNmhKLA5QaMhKACAVAAAwhimmHIMMOsOUc9BJKCWlhjHnnIOSUkqVc1JKSam11jLnpJSSUmsxZhBSaS3GGmvNIJSUWowx9hpKaS3GWnPPPZTSWou11txzaS3GHHvPQQiTUqu15hyEDqq1WmvOOfggTGux1hp0EEIYAIDT4AAAemDD6ggnRWOBhYasBABSAQAIhJRizDHnnENKMeacc845h5RizDHnnHNOMcacc85BCKFizDHnIIQQQuacc85BCCGEzDnnnIMQQgidcw5CCCGEEDrnIIQQQgghdA5CCCGEEELoIIQQQgghhNBBCCGEEEIIoYMQQgghhBBCAQCABQ4AAAE2rI5wUjQWWGjISgAACAAAgtpyLDEzSDnmLDYEIQW5VUgpxbRmRhnluFUKIaQ0ZE4xZKTEWnOpHAAAAIIAAAEhAQAGCApmAIDBAcLnIOgECI42AABBiMwQiYaF4PCgEiAipgKAxASFXACosLhIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAA4A4AEA4LgAIiKaw8jQ2ODo8PgACQkAAAAAABwA+AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAAQDoAAAAAAADGNAAAAgAAAI6VwgUsNzcxNCw0NDEzMigqJzQyMyspKyo3Nv7i8Ozg497p5SgoKCcoJigxMjY29+60KESpQcu8+vnCTK1FbMKAar2Hnlj/Q8i2Eaq8cHq1T7++eHYpP/TjN/tGla6gOHVWV3scT+flxCRZoWX+wBcRSUQwoIYHcI5UR51H0J7Va5ydH3npel4/dhxbHae/Lbk6fUo3qrUQMWxHF16jAOQwKTRzU6+ecxYkQnMCat5MrBrWeATD8mJePwPlxvSeApkEnm65rK2XZaoqMgdXsRIEP1kCDCD81xU5p509PQcAqrU0mLGTtWohLlCJLL/x8rRJ1kH5UfXMhrAv2Hk9Iop1Z28T7EKoBDhx9sgHdrdxAFTD17C/HO4Xvo2We7V5bRz2BOxbZKCKbBS/vVPclwMMRVxEs/8fF3sSUQGqHUelL6S5pMu/X+yWlx+Kj+3flvTbpTYz1bUY/O/xfVhmu+obtVcVHEVcYHL/7+ma0CoB1WZO2/efd/SL85c1ccMj+DTPYDEvr305bPWbUV7o+I383XVb57PPCkxN1DpUny/JGr3PmCkFqDrp7ffkf2HGdayKMwlEr+Yev55CV8LMxPHi+kYkyp/nwgA8U6khcV+1H1kpqATU0CP8JX/401CB91czUf558vh/g3voo/5ulxSuT8iS6/fSMPLvGbM8S0AzmV9/NUISFaAGzTxtjPp+18c+Xvtv+3L6Vqw+TDv9eD3d/07IcnQcUbvlVCi/DTxTwGLSf511t4TwgKrzWEll8KrmMOKw/MX9ubTEwxdlsg9fKlDztQQ0TVgiVubcfrsuJAwgoOpPd17FeoJM74pc4GDg0GlrmTJ+LRhHl3FezzYkUVhCmWwDMAJBZcD5VT/MgSLT5ltPgpVpYDyxR03u2rCZHkjGnAIkR8hug61Pn3Nvwgq9MQHVbrr64S/kbsnhnGJcuuhtZ2dVUjy5P65ubbHDyyFSrK63/TcPPFHA5dD626KzJg2otgyV1Yrx/pl+eDY3zOq+7p8P2poQP7bxHRSSuQJNKjwe2S+qqwMkTSkszuz+u+paQilADQKGHuO1IB63tkovL75ulPpz1ugw6nEWb47HFv4lvyBVXrfjSx8MT1ga4yx2fzO1doIkoCofXfaRavXtHQ378+7d+8EmMgpKTy5iJ6fJv7Q1DEkAQbJk95+YiE0K0AjCcr7/kFx4kFAWrxp5FL32MtfjtbajdCt3FgD8SqiUhPlvz8WeJQmoSlZrba5KrycjPfT1X475v91ToGKppbLofAzNDBIExETS0SiZVd/VbgxoBFRZK+kZw2saJLqRlNTUL6iLxxG7eR3SliEVj2AfHEVZZAbMv1ZdbCIjoJo1Z/j6qc9uP53/e7Jx5Nrii3vG//qYVW3puJRH9h329LDb7VJS/52vAUxRKWIsW/9xLtISjsQXCAWoQWR+4xzbyrXR+ppEN9nT0a91yCLD3LFkn7p7eHl8N43xdZItDjpY3BjP4cWWBjHMTA3hCQAgLoRGGYOdtapsXEqZgumO749yha4bc6/nkZqvTJdzr0Ojt43vfPXM+8HrS4/V43P7y1b3fhnFp89Xe1KzXfvhMIWN4n0eTqxWeVnyOmBBF4voD8okVDNbLZ2543HZKo8Ol+KLrg5G7OxNyaQNSr0omvTD7CgHYXZtVwCmHMk/omHYWtF4wn8v8rezs2LqQnroDyf4IWjgXQ20O+WqnZQQu4DaMUVsHfjlrQGjiQr6KaMd3hFOTLM7f0WONv5Gk14ULPRw8rhf/3wm+3vRpWb9yhbBM8aqypNazNjWiEPDeSLZZmWOH5I5gYpaqJohPhkcVBT0iGsgYi1ueOw9V2SLsbkZO0OkGeEGVgKouGzvSyZKDIT120cL631hDdP6jHTNbaXPYO9yVQ5zwrVGKbqkKnf0sUfMMYsP0jU81xEkw3PYRjKTjO/KFmg5ADJ5qV0eupbHH53FKhsd2umqwMXh9FTSnZf4MMlcNeITLnL80VrMGF2mSI3t2IAqb+5K7AlCUcQ7sqSaEardxSkXYXlYIp1d6sFMUc0aEHduVFjoYQcO4UuT79b8RwazmU2fsvTSRX6kbSULbSpc2qZrTX07cvtMhqJM3RuDOmj8h7BeFP74G+RVxJLXUJGcEhqfNdf7vGXPg1ndbMbZDNKafdlybFpLbOtzuS1ZXEa4Joptf7chEbt0e8end97CyX3tj9MotFNVeXzKYuUoVDHHIZw8xed1lFfFRjzbhFvPdLeLvecj2VUUqz6ODrZUcbV+KXmQC1c2rqbFIdHqz4ih5O2/t27j1kF+Gm2NN5DU/64o+RqBA0B5KMwFWWsZfWb5aIXvlEvYXuDajOm/oLaqdVE/7J+efqKaRrb1KytDyfCn/G9Vx9/hT1iJB1Hoen13ljX1KUZ8KHtmm73z1rVvfv91FmfXIlYO6idBNJFfz79yJL5Y3IDjEE03lkHBgPPDrIx3RV03G3ZnEUGwD+kYKVjMSpsTjktsXWYa/2DXOm2lX0/qXOc+7BlsUjEJNkkqfT0xf+uztBZ2xul1ajXBXKMqnP0g1xYPVbanmOuRF3ks88YvNQYyVY4b6nWzOYCS1CSBK9OObPdeIr5hGwovxUe5dwXCYOFHu783PfjjrmNi35yN7jXBlwF7mnnskZmlqjEdjidLjq7CUZ0WzYeNXl1PVeOVt5YBl88G5oodMD594OmYjiVllnLgYaltSvyDLMFBlXZVUJYsbhulqIicWyr1XaNqnXA2jcfFqf4OvofcpAwgK3EJYIGHeL95TinEbkhCt1zY0xIAFZfNtJmytTNLD7O38UB9OSTV/57n7Z95d3jFrnB23vbgNQoN+ioCrcpGLj+TS12i0C/xVg+dXQE+LI+VGYPt2HFjT0/4oKPoAf9fdge2xI8eQmrdu1JvIkNIEVMOPFfYCCqRuYDaUZGfne8T9bK1vN9DpeX1w1LHmh8BoRvJGbuAYSHUqHwDUdy9lXRLCRL67SZkmxXnMImXd5YwKCX3uUjZpQA89RnY2mRsxq6v8mY47gh8Fi8CF12XWcNKFvPLuSWOx4leJ9w0OcjsfukBwPHpsMbE1nN2p23iOXsX3N5kA0Bl2mSr8sbw7h/zOo2+Jk9X8pXeFtU5Zcram/32uaYzYaSEzkXFyOMq8lrv16PC3ju1Dmor79hMYSGZ2VplRc+0RuS4m1f78uc/JBiWQqsYurxy0XFxWbq3U7YKUn/sQa2cbr003Oyu7tcTGJUDooybS+MEeIH8tkPq21wDKpfirVzi9Ii+fyqjHbw28jJaDlFTeoMhsNiq73s7PWHosYQRJMleK1lL8e19AodiO/XYotzfQTWDC+LeSa6hJrEa1t6j8IgYAZ5X23geA+I6CJjULNMTu5FkpycDMToT5lx77IkA0PRZVVYpKere415Ms1c2X3K/O/JqYmofYcX5zH+mFrnfa+ichw3BwhOqWlhEbHXKq8uIyD0isn/InLvRwY8N2m7GWdaeKr4CKJupdqSbcpe84bAuZoKFRVQ0yIuRChYnVmvRXVipKMAcIZl8oAMq+2aYVtsg5iqjRLRAbO7aOh5Tl14X30aKoR0HIiqZeytPp6iKVWvFUHkJpCmrH9XvN5XvlGEpZxm3q05E+SogAhbznUOKKgUFrEXN03Od9zxdVp4324iCQeoVkwnwyJxPjHJg9dyHsDsmt3TBGQFQjY0rlopdG0v7t+eRJiG81ad+mmWxGtfkXMYqEz5zvMompkHF6dKN+3hEntT0FuJiB2GmYjcHHFtIefRVq0jIr34/9pZ0P3LIgjzO9rJbrQ45JdMg54M+aiWyqI+kmsmEfGbrERMVfMjwjzWFatpiHCkSwWqqI7pVx7iJmbdUV55CDkzdqwDIJycwTs6NOZVy5oI/GTc1ez95/+lqgTBMSylmCCWXCR89xfR+8ZBGK8xLbBvhxIj7NH2mIBebRwWeQ5X96TYcs48cCq4DlhcbBhHH6BUuDCV4cVXUH31w/Y/5U1TuPcxhzpEb601m9aaslXom5flK9a/XqWeyzU6/Z6ebddolZO3UfT6Lp8+zqGJllNQgkRFf/JJBLtOhZrTlJKpNVNbdqMdgIkWxUHWVuhpfR1g3X7rHil/PNQWwZ/P4guJ95C/VvUvZLIxiaLLq+xri7s78htK0KFuOyNnnpKU6t7pTd++45kCXofhQL1fiUP+TADp1PZS8bWsSl98tbVh8phw2+viaMVIbaUVPW8F3wlVJBDWvAK7OT+qbWU7V3wN6dVx3EpR29B3au73eBuw4WG5Rd+Pi4l0gDFCZ+zdnSwKDejPZ2uNXI55oSdEzG88d3W4fGo3kOFJCYkrOvviwFQ0SUJUYqett6Kep2DdZMVdF6+U8hdVNqEyGTXgZ9DhVWdRy95eZkSQBle09ya211OyLEH72HimPxXTvrB7yj1okp1hTB/Q0yH7q7rMuFhAEqLpp/MYaqf3bJvsEI1lNM4n25NnX+WNKfs6IAQQ5qSTcpNn9XXYAT0BVvBLykJm2kE/bisvR62L/gyw/qmQPktaechfkOgAlweM8r+oImCBU2JMQ1ioolJY0YfkUrbPNk+epC3Wnq/Radvw62S9Od/3wFlAIUGXWLx/Wpi6WT5BAFREt7Zx9VHu6jf6GWsLUkx0cPRwg5M+XRrSlATYxoNqm/DQxJeoy6z8PscfrW+W6m2rlj1Fd6m1Ua7/v/lS9fFkODEFIZYb0y1TcsmcqAVVJ+G27y1lV5fHhY/drmp8to0TnzeP0uvDZJ9HvTwrkKgNhRQs0R7zg8v757Z5AJqDaEhdr/7aL1fe8vr/vGa+Pq6en0n+lqnpn9793jO3DdxCoHv3y/mUxngA8R0jVAub5oFiN1pxAAqrNxOpx796flialz3OLteX38/GW79393z6N2jn38JQZC47H/Lqv/gC699tkC/CFuEYD0PDUv1X++tH/2x/lVZWTnj9cZLwtX0E9gp2r8XScNkjJ+uv3rDP/oc0j5sTXmSZL9vulwy521n0etf+delldxWNm4RAPwfVP45UwxvqclzmzO4eK2lkl20WxZo6FVYXiP4OHKL7OWZWPSWIrMqrS9JJM/USY/fvX/j0ZKVfHEZ2P7tdqh30qJh5UkMD9cz8NjWdR7mltp84Q28kwOaMkRovLE7Dd1f6We0i/5LfHrw/rkjjSeUuiLbgcZo1P+10JdYcNzbJ/Bzvvt8DringYXDGi3gU5GbBIuL9sp5xQx2dJVUN1foos3XsTBxQAvgfcNAFJ7e2KvKiKTo8SaNL04KLRRnzZ1gbBsRF5ZwA0mpVZsulFRHKk6XoTlc/oz1qLtmrym2lzS9O3a9BdwgujXbrfEGzkvapObBcQ1BEeNc96P7kcfd/320eOuePQTuTRXP2c8+rmdVxtIY66mIlWFqfPKSubPt0/0X+QorXyaOd01WLVZezfZaVftKudblALSzZB1MI0aQl+cC1bpWbU65i3gq+2F9z5kkEh9eVa920MMiEpIuLSNKDcpyqdRYfdfPygUe6lqM69f4m86Dzy5DJXOoFyFe9+15OJufjLluqMbPuT258gGSm2BE9nZ1MABHt4AAAAAAAAxjQAAAMAAAAknZ7hEPTt6+Xf5+Pj5N3g3NfQzbZ+KNwoCVi7uBSWDz2xq2MQnJ+zsxHqIONz1M2e0ALxLSQANhIANFWVGcqmAmh7rb7M3I+eaKW9tZFY+FabcM+37btBaohTwCyT/GmqjsYo8PcParRDDBC5PWKc1NyYR7J2X+XJyB8GblJKqDlqSd0gX77N7DidKEsYRopOB8qSmRxI9DsVtZPeiGgcnCDgYvKK9MQ9WlgJtS88nZlK7/aGxJSvqSKPG8Een8xl/Anh5zy9clQ549IRvq7e92Ry80JElNkjkdUob3QBNWmK5kHQDEyxVTHt3m+hIviojl7JqlQB6ZmxtDo7HJSCx+jrVTYaDegKHujL8yFd2CseLwveeUey8RHzhqCT4fo5OYJe3EBnABhrLwCAmSJWVsLD2ownfXUbmzGoFjO33xiRYnu3n48oBTd0j21G0UrKJFWOkxFt4/pFV7Gtc+rR7x9fk0+PZ4f8rGWJGi6eH93zRnJ99HWeVacvf5buEYo6T9peOMImQQyk7Gxf8azKo4ZopjrgogcFGyWV0Rf5tx0hZQunCWMG3WKXmcdnjhA/q0GlM6ZvJ37pt9/J/Wpbu9fHDFFgNWGIncsIfgmh+gkyg/1HBWGSWmFV8WgGag7BDlneF7NbUotwkpy7XQBn2l5/vbcAvqfbUCFokis8dHinDPH57RAhDszhTFyNCUDQe6teANTMoNL2VpZI+GxMk7uE9ZWvIz2WUc/ktLmW5fZNao87ALZCgcoRlb9vDqC39I3tB71P9qVUvKOUjL67H11TFSKqPZx9Xj+10DOYE9ocJuB4rv1dlPN6zcrBi6Q1exbaTvofRZXFwov3Y8Xr2tXRYKm+ya0Day+2dKJpQK7yf4A1vHF6YuJWl6qgInQaxsrDCPn5+UlvbMxpI3r2de5I0x161dEKJLlT0fNks6vAdzEd+6wp+cDbFn1EEpdvAtzZvlln51lO3RDIsu4QAp5n21TFM1ddCusHyKmH8PT2LUBd/TonZti0c88zq2wsK1cqmi7v03u2HBOsBmt00aa1h1prlvruCz2iOs7N4ynn9aIGIBU/rJ62qIWIaBKyUuuhCfjV00nlpxfCwtsLxwFeLCTbT8N5BRGaXRTp9iWGTrCuUZgOFuVCkPG0qN3IVLhZ0CRxqT11XSKRHw6WdisjmbZOlo9IIawqiXHiRH8sZUMxycs4WfBoftTCJ6xQ+PUR6uiqpVHO74Zrs3A7EQgf+Kqt6o6ZdOdeknOiGMupkWrNscPYsdBkyz7DWLFowdrhnAP+F9s4RbKydkECQuCpL5ib3fJYtqHPPTEwZ1VJ4mRb6D8NpiwxXauZeGrryNnPM9YhPDtOr2bNZ6Hm5tHjNCsTGQtHv21kWHK7uEdUOSpVH5NbKoPgsYjwTSHHVZjDLRiy5Z07jKIPMg+aJoyL1aGdfa97EPTVGwRA+Lj3/V0OZZ7Kk03eJSe+aTqe8Fgu8Ktl0Gm2s1jloXQnd648lBpMIzlFMlVxs5WblCmx+XtqGA5sT90ViTKCBzlwnTkh20H0YvzTV68+3lZ56mJgydbCMM77JCHRVfMYOFutduMDvvfaOEXSs7oEhFBxfhuoDm9ndtJNE2fVJ8+qLFuymVaq5YzLTXdpbiJKHGFtZ3z/XI49559b9T7ly0d5ZliX8CDHlSz/LFznB8qaMOJR3abxBBC/52tOizyBKDimz5I5/q1NOGJQ+5sKFt6jwIc6os5380xEx/Mlr9hzLUdxn46nK0XYGWeNyoUJ9pSzOcyA4jY0yHUy83HPFvTyDqTbKvlQDfjZ97TJpRaScdr/V8bpVoYfZevxFcrti1P9Kk5TRXOVywSuLfvUU9o9dZUZGMI9XINkI+wUxkUjh525ZEtH8D4+fnkHvtfawKZ0E5eMCyUsjk+NuniY0JGORp8TdctVFdBeNmcSEe8bp6S+Jq/b794k0Uc0aU7aGy0p6eIozfKT611FnZ2P8Hl/Y5Sc3CwyrNmCv6ecUOnzTGyiy2fxSOjhol2e2vBhBfZTCQM6un+OSa47ETpp9nK2q3u1xZ8Di+1HdNeUVc2qwD78PFJIei3LcbeX9VlZYjaCPrzqRaDqWdKlSM50Tw81aDnqxlovnFwN4pWZVe7rEsZ1iurmh87H8iFoqMPxeeVYsezSCqL9P8plYISsGvbkBzhjQZyPJSXl1FnlKgAep9qoxSDzDRZMRfDIfR9mE02bYfXptNkzDFamymfKBt1jjTpwTcNnR25Sb+wmaRznMt7P1vcfCjfjpNqw95TLi7b2UANquIGEdsyWdmOy9uns5BEY9dTllbvkPgb95JkiPDL3eD2yNzk6ps7NabwfK/ZhhWJG8S4NXpfJy6m+qEZNxAeqoppgVcsROZMvVT3bBDx3G5GrscvyyjFOkio81sELLqqCxP06zS0nY9jSGMI3xFidiGlWwoOkHwY5CCEHgDc4nLJS9zrwPFWlDsl9yutgCdMZir2mi3agemvadZK5Cz432pDTgF6ADNLjg+mgN9h6N+s+MbqYz8Sody91GgCq721JqpSC3BjaKUuT09TMydQ/Pc5RvzXI29OLsTxdhGIH3LMa3l3MskGAWu3J3FpuInC45fjugdjy3WMLcbI586zuHGlK6ohW7xVUZ0fqjBX7dYTiN7223WNKPT1oaU1k+jTXtCjuQjFzeMrIeaMsFQeElggXBY2+ymDBjht5tyI9WmNqOLM6rtA6d+NX56zHIEipiYeuYIl/UV/boV5mT8CI2P0IVPGLtmU+PNL1IiV+7Hd2b6dHwuqMS+4lLYAqkRVFBZ4XygGAj1wBtiB4on7jLJKxEbuL1s6TXX0G1qZsRVlUegZ7pDub0Y/1SOMd7iacX/788OURV9VZyWcbKcZePgwcou5DXR67WY0jRuy14nlnZtd/L6je8bvPanHYRsWPjXyHtUvFDhWKxR90myKcrv0MBx46FE/6+RVb2jnFK2uYU8B7K51yS5WrYVhG6VnTdWefQ2DNRSKwf2N264SI0esB+wknje65S2TG28RmsGQTjK3gidzpLNNMadS9yGQpnF1Vg4pt0Ab0L7+3h9rqekn0vq1GwvRRU3kkYCSE/uYZRlDIuQBs4HHrjGZ18PAhqclxWq6qSkkqQcb4q3z+9jQ2pP5//r1laeb3Y7zzlsmzkvdxXdhj5NOxVZeI42QLUe9I5GCGsS7iUj3cDjCLB8SWJglKD7QyLAqFLvuWkwVGxbnn6YUhBZKLR/das1ctWBxZaShuDcrW68Uk9HixH2wZ2fwZGbf8lgSUFXldVGUn24TuxYVRb5P/5XrxU3mc8qRSEaOFHy6vVm191onsFIt+mKeeqihJei+HTY3p/RPOeFwqgQ5+dMtTHEg1/zySj9yXGKl/rS4eB9cTzwDet8lSxo3YguqESuU5jDFC6nbcFsY81ycUcwajbMmRYLFYPZv90o8rX2v2yjCJ+Y/1+NvvaeFv/PVx8vzqyL30LA7Oarz3F3zj9S3oKsa1DkWtVIucczPGaT3fBbSd0KA6pHpJbj/F09c8xsZmTxRlVviiHa5ch/HmJR04Nab7K6Yqje4WGrjDZ+iUzIqrpggWmhWHiP7NXKXILKLi0h9eHLJqalHFC9nXs5XWEQ/blQFlgInKyFWns6TZOnvqMQUoRy6eiAuhA+dD5EfGZo//9f5BNrM0o3Xcrz44fsfJYcmDGsBAwKNz5DWRNiNjyxmdog0bQAPKxuXTSpKYlci6iqe92TgiNpjFj1pHGKMleIgodLrjIhKfx1bvn9WxcxVMx8EbLT+avi/Flg3IcLy5U5eMUlFrL+4uiZzj9GiBd3hLUfrNJUQLjK2YeZejjx/HNteXNQN10g5CECRIujhCijZTq8FsJbOGo3ATzr31oagedSdhwY75ikWtCCSywt/tgYhCsXuDUNvqsLlUIceedfm1srqiYwnNULfUBmfmzd/O9Ke5/+WImoxAcwvjTO0w5jNet8lKxwcANkyPNCbUybGxwers7FNH5sxRpUxJ3oGWkL/kkD/Vc2bLNUdo906OtCVEcV7ve13cnIXsDuGj7A2z/R3ryW2NpTce5KBTtyzoJ8yR0eu1qcmcl/RIBFWzdTjEAwNS/04FC5WrQ/aUFWtTXYIefImaXiYP3XYmpV6ur4X1NcJLiW3EuKShAHUEr2b/Jl0ZF9S8RfqBhbq5ji2LqNcqEb+eECSlzOzIk0vzXJhr4zPoh+V4zZ0z7FrM3So1166RnlqoG9F0zFcIACABXtdRTRQAQgcAHjGsHna3Vg6zFf2e1ntWVV/JjCQNFERNPJLftL0Pq77GNT1OTvXe0+Wo79njR/l/1YialWOMk+qyJ9Vw/R2Og5Wph7YPISuWF8XX/jLDyuIlVWqTcxIgai+AXLVYc1+zrzUjrfvopAYX6hRbRVYvZ9fDyALrzEu2cfMP1WsbvlNtcyHzkY9M7tXlEYZTn5+wPu2oRLAxR0Ux76q6otUIfOkf4pZiVk2yhtJUuZ0pLCtMWl5dnWJb8CYg9AFTlHjkODEYAH4HEnPntnG7TQypIH4AY4zUI43BCXvOOcyZOaUoERQCACAq2+yetE4y5eaX/7ZqzMfwv75j9vXQY4xh7++usqts9ZPkasx595fnYc45o69vtvDq6hbhVQRz5Est4KyIg+lp5unD+lYn1dXVMK++CRY6vM0555x7//wkAED1y6omS1iQXmdI+y1C8UTQHG9vbyK9vj0RDizko6qqYXWVRdXoOUfha2CeLgDAYroAsN/eLObBAUAD"};
window.soundRepairReload={info:"Reload sound; Used in TACS; courtesy of: http://www.freesfx.co.uk; 7806 bytes",d:"data:video/ogg;base64,T2dnUwACAAAAAAAAAACpAAAAAAAAAJKfvKcBHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAqQAAAAEAAABQ3ZLQDlL///////////////8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgEAAAAhAAAAQ09NTUVOVFM9aHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrAQV2b3JiaXMiQkNWAQBAAAAkcxgqRqVzFoQQGkJQGeMcQs5r7BlCTBGCHDJMW8slc5AhpKBCiFsogdCQVQAAQAAAh0F4FISKQQghhCU9WJKDJz0IIYSIOXgUhGlBCCGEEEIIIYQQQgghhEU5aJKDJ0EIHYTjMDgMg+U4+ByERTlYEIMnQegghA9CuJqDrDkIIYQkNUhQgwY56ByEwiwoioLEMLgWhAQ1KIyC5DDI1IMLQoiag0k1+BqEZ0F4FoRpQQghhCRBSJCDBkHIGIRGQViSgwY5uBSEy0GoGoQqOQgfhCA0ZBUAkAAAoKIoiqIoChAasgoAyAAAEEBRFMdxHMmRHMmxHAsIDVkFAAABAAgAAKBIiqRIjuRIkiRZkiVZkiVZkuaJqizLsizLsizLMhAasgoASAAAUFEMRXEUBwgNWQUAZAAACKA4iqVYiqVoiueIjgiEhqwCAIAAAAQAABA0Q1M8R5REz1RV17Zt27Zt27Zt27Zt27ZtW5ZlGQgNWQUAQAAAENJpZqkGiDADGQZCQ1YBAAgAAIARijDEgNCQVQAAQAAAgBhKDqIJrTnfnOOgWQ6aSrE5HZxItXmSm4q5Oeecc87J5pwxzjnnnKKcWQyaCa0555zEoFkKmgmtOeecJ7F50JoqrTnnnHHO6WCcEcY555wmrXmQmo21OeecBa1pjppLsTnnnEi5eVKbS7U555xzzjnnnHPOOeec6sXpHJwTzjnnnKi9uZab0MU555xPxunenBDOOeecc84555xzzjnnnCA0ZBUAAAQAQBCGjWHcKQjS52ggRhFiGjLpQffoMAkag5xC6tHoaKSUOggllXFSSicIDVkFAAACAEAIIYUUUkghhRRSSCGFFGKIIYYYcsopp6CCSiqpqKKMMssss8wyyyyzzDrsrLMOOwwxxBBDK63EUlNtNdZYa+4555qDtFZaa621UkoppZRSCkJDVgEAIAAABEIGGWSQUUghhRRiiCmnnHIKKqiA0JBVAAAgAIAAAAAAT/Ic0REd0REd0REd0REd0fEczxElURIlURIt0zI101NFVXVl15Z1Wbd9W9iFXfd93fd93fh1YViWZVmWZVmWZVmWZVmWZVmWIDRkFQAAAgAAIIQQQkghhRRSSCnGGHPMOegklBAIDVkFAAACAAgAAABwFEdxHMmRHEmyJEvSJM3SLE/zNE8TPVEURdM0VdEVXVE3bVE2ZdM1XVM2XVVWbVeWbVu2dduXZdv3fd/3fd/3fd/3fd/3fV0HQkNWAQASAAA6kiMpkiIpkuM4jiRJQGjIKgBABgBAAACK4iiO4ziSJEmSJWmSZ3mWqJma6ZmeKqpAaMgqAAAQAEAAAAAAAACKpniKqXiKqHiO6IiSaJmWqKmaK8qm7Lqu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67quC4SGrAIAJAAAdCRHciRHUiRFUiRHcoDQkFUAgAwAgAAAHMMxJEVyLMvSNE/zNE8TPdETPdNTRVd0gdCQVQAAIACAAAAAAAAADMmwFMvRHE0SJdVSLVVTLdVSRdVTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTdM0TRMIDVkJAAABAMAchM4tqJBJCS2YiijEJOhSQQcp6M4wgqD3EjmDnMcUOUKQxpZJhJgGQkNWBABRAACAMcgxxBxyzlHqJEXOOSodpcY5R6mj1FFKsaYYM0oltlRr45yj1FHqKKUaS4sdpRRjirEAAIAABwCAAAuh0JAVAUAUAACBEFIKKYWUYs4p55BSyjHmHFKKOaecU845KJ2UyjkmnZMSKaWcY84p55yUzknlnJPSSSgAACDAAQAgwEIoNGRFABAnAOBwHM2TNE0UJU0TRU8UXdUTRdWVNM00NVFUVU0UTdVUVVkWTdWVJU0zTU0UVVMTRVUVVVOWTVWVZc80bdlUVd0WVVW3ZVv2bVeWdd8zTdkWVdXWTVW1dVeWdd2Vbd2XNM00NVFUVU0UVddUVVs2VdW2NVF0XVFVZVlUVVl2Zde2VVfWdU0UXddTTdkVVVWWVdnVZVWWdV90VV1XXdfXVVf2fdnWfV3WdWEYVdXWTdfVdVV2dV/Wbd+XdV1YJk0zTU0UXVUTRVU1VdW2TVWVbU0UXVdUVVkWTdWVVdn1ddV1bV0TRdcVVVWWRVWVXVV2dd+VZd0WVVW3Vdn1dVN1dV22bWOYbVsXTlW1dVV2dWGVXd2XddsYbl33jc00bdt0XV03XVfXbV03hlnXfV9UVV9XZdk3Vln2fd33sXXfGEZV1XVTdoVfdWVfuHVfWW5d57y2jWz7yjHrvjP8RnRfOJbVtimvbgvDrOv4wu4su/ArPdO0ddNVdd1UXV+XbVsZbl1HVFVfV2VZ+E1X9oVb143j1n1nGV2XrsqyL6yyrAy37xvD7vvCstq2ccy2jmvryrH7SmX3lWV4bdtXZl0nzLptHLuvM35hSAAAwIADAECACWWg0JAVAUCcAACDkHOIKQiRYhBCCCmFEFKKGIOQOSclY05KKSW1UEpqEWMQKsekZM5JCaW0FEppKZTSWikltlBKi621WlNrsYZSWgultFhKaTG1VmNrrcaIMQmZc1Iy56SUUlorpbSWOUelc5BSByGlklKLJaUYK+ekZNBR6SCkVFKJqaQUYyglxpJSjCWlGluKLbcYcw6ltFhSibGkFGOLKccWY84RY1Ay56RkzkkppbRWSmqtck5KByGlzEFJJaUYS0kpZs5J6iCk1EFHqaQUY0kptlBKbCWlGktJMbYYc24pthpKabGkFGtJKcYWY84tttw6CK2FVGIMpcTYYsy5tVZrKCXGklKsJaXaYqy1txhzDaXEWFKpsaQUa6ux1xhjzSm2XFOLNbcYe64tt15zDj61VnOKKdcWY+4xtyBrzr13EFoLpcQYSomxxVZrizHnUEqMJaUaS0mxthhzba3WHkqJsaQUa0mpxhhjzrHGXlNrtbYYe04t1lxz7r3GHINqreYWY+4ptpxrrr3X3IIsAABgwAEAIMCEMlBoyEoAIAoAADCGMecgNAo555yUBinnnJOSOQchhJQy5yCEkFLnHISSWuucg1BKa6WUlFqLsZSSUmsxFgAAUOAAABBgg6bE4gCFhqwEAFIBAAyOY1meZ5qqasuOJXmeKKqmq+q2I1meJ4qqqqq2bXmeKaqqqrqurlueJ4qqqrquq+ueaaqqqrquLOu+Z5qqqqquK8u+b6qq67quLMuy8Juq6rquK8uy7Qur68qyLNu2bhvD6rqyLMu2bevKceu6rvu+sRxHtq77ujD8xnAkAAA8wQEAqMCG1RFOisYCCw1ZCQBkAAAQxiBkEFLIIIQUUkgphJRSAgAABhwAAAJMKAOFhqwEAKIAAAAirLXWWmOttdZai6y11lprraWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUgEAUhMOAFIPNmhKLA5QaMhKACAVAAAwhimmHIMMOsOUc9BJKCWlhjHnnIOSUkqVc1JKSam11jLnpJSSUmsxZhBSaS3GGmvNIJSUWowx9hpKaS3GWnPPPZTSWou11txzaS3GHHvPQQiTUqu15hyEDqq1WmvOOfggTGux1hp0EEIYAIDT4AAAemDD6ggnRWOBhYasBABSAQAIhJRizDHnnENKMeacc845h5RizDHnnHNOMcacc85BCKFizDHnIIQQQuacc85BCCGEzDnnnIMQQgidcw5CCCGEEDrnIIQQQgghdA5CCCGEEELoIIQQQgghhNBBCCGEEEIIoYMQQgghhBBCAQCABQ4AAAE2rI5wUjQWWGjISgAACAAAgtpyLDEzSDnmLDYEIQW5VUgpxbRmRhnluFUKIaQ0ZE4xZKTEWnOpHAAAAIIAAAEhAQAGCApmAIDBAcLnIOgECI42AABBiMwQiYaF4PCgEiAipgKAxASFXACosLhIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAA4A4AEA4LgAIiKaw8jQ2ODo8PgACQkAAAAAABwA+AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE+h8AAAAAAACpAAAAAgAAABjIRxMcMTMyNDYzODg1M+gsLTU1Nfbo5ikzNTQzNjX017Qc0MHayNpfi94O6u2FMqBqfecfb+7z3LLmIA1w1fpZfVdl52kwPupvVY6jzALlj1m0HCkyjAXx9T1FHctGA6rWUDFnmX+WuVEV+mm+2BFvhcj59PTzNFJD6p84bV4XhRkEOwO0HliC4lTU+4HqXLpFk5QB1Zpp7ZBwd0yrP8PpgqzZsa9jxG4Cn5innikeYqqXH8XTKbwmRxQY91t7im7Yd7uhhTlBQLU8kPSlHPa4lZQLp/kQcfnols0s+flbMgQVierqZT2Fp3O8KkdX0M/WupfpGHgD89JinxI4gGr7dvuOHNc/X5sso7HsURpd7ap5qq8EE8uCm8E1OePzbgC0MMdpaCK/ijIHtNCAANXu/3NNGMn94ww9fVZ6VY3Hs/yoejoOVS3D37YdPXi94Mhbo2rUMMe91GfB1C8+bAemS4GOeEC1oF+01j3Hnb5et+6XLpRW4zGeu6lQuNLS4ru5ASWPPlSnZ5dCA8Q0C1swFsCXWl46I9ANnTECqiX2HP01t1ejvNPMt76finmyfvMOO43TNbf68GErHcT19c+nz/t39ELHGsj8nu6zrbXoAAOqmXms8+Qbfhtd+uez4yje6n/rTq5+Vsf97bo57D3OFvkRlXKjdgDsQMdoOJE1H9yduOZYooYGAKpSMz75mYm8uB4zEq2Dt5kRGV+dhWfzqt8Jswq1z1L/7QiSN8uNKr9yofhdH0LKqS0yHM85j65neuIvH42z4lqO7oTUc8wq2gdMUDtsJACo4x1f6TiemHXGm/OM9ctiveaa/6hN1wh4JKL7b97MLnYWarKvd0Zb46VOjjj0E7lfJbH3Pyp2j0bQpia+1vP+rKo57krC2sRvlGt2RRd9ocVcPY/Pcsy33BrDRPRLoe2xsseQq4dOohoHKp9VUFiE6xqm7sePH3f4zauchfVZlLw5RAIWGzvTXsU14RXHk8Vdr67hIuMa5kOEdWfod5psQb17w9Kn0zsT9kK1gpwBM5u5lW9sMf0IHYECvLLZYehl6t5H52pARNwgoIZpLG9t/VMVPN1QAstWuEhB987tOm0snSr8YZW8tO4KwDvc/nITaCFnEFBDQpP13Z2AsJqiFOKvcKnL3vyNiqvX2lD0R7uFWBPENEdtFP6B6kJAC64aTUDdQXFBP2Iab1u0w3HCl2v6sFQ1Ne50qaqrcPoZsW9V7Iiuvh3LAdTCBbfNoX94vpjNc6YBVSyyerKYWNVbeT89u/OzF8fp8fR/8X3P3+jPn/q5z64IW/x/3b8HBE/HH7ycenVdD1gpiZiAaqcfcp7dR//EpEn6/DjSdUGheq99e3x2yXFUVYitt9JbdTud2AD6yAtXlceOF56itqOXrqTIcH8wPiuf43cfTu8prh/pegIyjOw1c9oWAPRO01tZyeP6ZFRblm8f35f8y3cEr2qe/HusPwDaxKN2a8OrGcfdX57fyaVmpOuaMTLnGB+yobmf88fJyK455hg5blpDS7KaLPHLvIgMY2Q1WT01PY21hbF9nea4OT789e2aMeKffFm+98W4mJyfN2CerlS3SAOhd50AO4oGbNh+PK9qoi2gL6oOqL2tYyHno6J2JI4i3szvQuYwxXTVZ31aTku9p95FPOwaNltdXTN6Fa+dTwNgoFAX+jTUV2XdAczbuv88Ex3BvMbsTgB+p+K0IgD0TQbKyOaEg72X4UF3vtVJWrJ6O7KzJVZftig9ZIrV4UmWbpfFhrgk8z9m/f7X/b7TEz933WmMj/1buCher0tu5+PMiG0js9vOTeNy+/bNmzdv1nSlqB3TBbyyOcZXKDY3oJ9gaZb8cFovwjWF1/CWLePr6JsiACn6J1qwnStqgUxx02QflETNAsx595eTkWOMvX9+d84ATMOsg9YDp1cvrJYDUH+t18Km6TEJpYFbsqqvJuJa6L699crTZR5LELi8kk+BsxGl9WTeIrxFIX9dr4ZNuD8KH77Li9O008oswqAAVlcirxa7tDl6FYR5EFy75x8Pn37pTEdHDR3BjOeU+kpxCjyTb53jzj/81+7//3mypPL3bPrdp6qupt78/fkavUv5iTLxfDQCWqFkJvXRalkpHMNTTXIb4zqvr+KzmpfrD49znFnkn1VMeWndjtgN6ELMmPLxWPxsHg/Jmr664Xa6cHspRDn+D+fXCmg79sqZe8YcqpOnuqp8HC7HrmGedlemGBJbZqJKk1G0wL4mdlHgYdZAWF75f9dDvKrxeRzrrvo4SCbvZK5/WFwd3HZcVbAjnGmz1IRxr/YWD7N8E2TPzysmRwK0PAAzYTpHnbuiSQsgAlQt35YeEkfKzxLsyG2lXHvPazya4z4CaKCrALQuABfA2MGYe3BdS0xAta7V7/j/p2c5f/7/+rPrdv6mL/yh+THXMddeTaW8UXv/VKxeArQ22AKrz4Y+vxchLBJAtS9E+6W+/7l7/3lSfPZUYjdf8aHgG8Yz/4Mum7n//v175Li6VR4ArDx3bhgM9tMxqYUF4wHVjGqq2Sy/19x9qimpqb/OjN1Z/uvLugK91+LrJ+61V6WvdVXMAeRK2JEGhAdr7Z8xN+oMoAKgGuuY36lVr+tuJlqxCves8uOMx31xlCR94/b4MWOrqzgKbwxRx2c4a15/LUQSE1C1tP/mdvv1X9VefVy121dXLwvb+3/F+M1RfnSlqb5/88Sibdd+yWV7EwRNxxroEvdfPrgzNKWBhAZUyWmTv11RT9Qj/uclxujx/96cUwuRux/+i3F5qL0uCjy1AsYDetfbWFH4c7Fxo+is5xTz4+n68f33po4xun/39QcnPcYwYLgLAFiNtauDrNiq44bV07+i+Yftb0iy/W/y+VPPXpjkDqj2DdmxqKqmi2c5xyR22j7meFQ1vT9OdEbNRMbYsVXxZHwVvI0BbPvh/BmjZty8j+y/fjoRI+zQFx2hTklqFj8z4qG2dxMWAIAwWlQWP/mhpsfqkTByDJ0x1uOXu3dPZuT93V9OOjHN2Ok24GzI13RmtVufUUSeuVxUal8ctdlHdcEBSlAf1y65o6Luh0KqQCxBeAieHLHq4BabDL67yxPz8ybyJw5hGsfz3jjCpAVwOn7nMU3hFenCdOm7zglPvJTTA3BOcE6M4RyDHk6vom3ZVKYIA01gH/dK2j4dauqssLTs/5ce92/Wbd887sa4rtmueZzM4P12GsOAx90GHA+zvVhlrWnmnxQtNvMK9cLi1RhmjLHx4eNzTjo81iEAALZ6/V0Ed3b1xbgCYU4k50S3aXR4TSz0cjRxwNJH1pTWnMXC+mESXifvgB2RsNSCCGZJXvVI9ZOtr7IAgvxNQZorxQMEj47nW0QBcnidD8FuLqwqgYjCgttaPSy1IyiE+evidZbPgU0k"}})();


/***********************************************************************************
Tiberium Alliances PvP/PvE Player Info Mod 1.2									
***********************************************************************************/
// ==UserScript==
// @name Tiberium Alliances PvP/PvE Player Info Mod
// @description Separates the number of bases destroyed into PvP and PvE in the Player Info window. Now also includes a tab showing all the POI the player is holding.
// @namespace player_info_mod
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.2
// @author KRS_L
// ==/UserScript==
(function () {
	var PlayerInfoMod_main = function () {
		var playerInfoWindow = null;
		var general = null;
		var pvpScoreLabel = null;
		var pveScoreLabel = null;
		var playerName = null;
		var tabView = null;
		var tableModel = null;
		var baseCoords = null;
		var rowData = null;

		function createPlayerInfoMod() {
			try {
				console.log('Player Info Mod loaded');
				var tr = qx.locale.Manager.tr;
				playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
				general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
				tabView = playerInfoWindow.getChildren()[0];
				playerName = general.getChildren()[1];

				var pvpLabel = new qx.ui.basic.Label("- PvP:");
				pvpScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pvpLabel, {
					row: 3,
					column: 3
				});
				general.add(pvpScoreLabel, {
					row: 3,
					column: 4
				});

				var pveLabel = new qx.ui.basic.Label("- PvE:");
				pveScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pveLabel, {
					row: 4,
					column: 3
				});
				general.add(pveScoreLabel, {
					row: 4,
					column: 4
				});

				var poiTab = new qx.ui.tabview.Page("POI");
				poiTab.setLayout(new qx.ui.layout.Canvas());
				poiTab.setPaddingTop(6);
				poiTab.setPaddingLeft(8);
				poiTab.setPaddingRight(10);
				poiTab.setPaddingBottom(8);

				tableModel = new webfrontend.data.SimpleColFormattingDataModel().set({
					caseSensitiveSorting: false
				});

				tableModel.setColumns([tr("tnf:name"), tr("tnf:lvl"), tr("tnf:points"), tr("tnf:coordinates")], ["t", "l", "s", "c"]);
				tableModel.setColFormat(3, "<div style=\"cursor:pointer;color:" + webfrontend.gui.util.BBCode.clrLink + "\">", "</div>");
				var poiTable = new webfrontend.gui.widgets.CustomTable(tableModel);
				poiTable.addListener("cellClick", centerCoords, this);

				var columnModel = poiTable.getTableColumnModel();
				columnModel.setColumnWidth(0, 250);
				columnModel.setColumnWidth(1, 80);
				columnModel.setColumnWidth(2, 120);
				columnModel.setColumnWidth(3, 120);
				columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
				columnModel.getDataCellRenderer(2).setUseAutoAlign(false);
				poiTable.setStatusBarVisible(false);
				poiTable.setColumnVisibilityButtonVisible(false);
				poiTab.add(poiTable, {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				});
				tabView.add(poiTab);

				playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
				playerName.addListener("changeValue", onPlayerChanged, this);

			} catch (e) {
				console.log("createPlayerInfoMod: ", e);
			}
		}

		function centerCoords(e) {
			try {
				var poiCoord = tableModel.getRowData(e.getRow())[3].split(":");
				if (e.getColumn() == 3) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(Number(poiCoord[0]), Number(poiCoord[1]));
			} catch (e) {
				console.log("centerCoords: ", e);
			}
		}

		function onPlayerInfo(context, data) {
			try {
				pvpScoreLabel.setValue((data.bd - data.bde).toString());
				pveScoreLabel.setValue(data.bde.toString());
				var bases = data.c;
				baseCoords = new Object;
				for (var i in bases) {
					var base = bases[i];
					baseCoords[i] = new Object();
					baseCoords[i]["x"] = base.x;
					baseCoords[i]["y"] = base.y;
				}
				ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
					id: data.a
				}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfo), null);
			} catch (e) {
				console.log("onPlayerInfo: ", e);
			}
		}

		function onAllianceInfo(context, data) {
			try {
				rowData = [];
				var pois = data.opois;
				for (var i in pois) {
					var poi = pois[i];
					for (var j in baseCoords) {
						var distanceX = Math.abs(baseCoords[j].x - poi.x);
						var distanceY = Math.abs(baseCoords[j].y - poi.y);
						if (distanceX > 2 || distanceY > 2) continue;
						if (distanceX == 2 && distanceY == 2) continue;
						var name = phe.cnc.gui.util.Text.getPoiInfosByType(poi.t).name;
						var level = poi.l;
						var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(poi.l);
						var coords = phe.cnc.gui.util.Numbers.formatCoordinates(poi.x, poi.y);
						rowData.push([name, level, score, coords]);
						break;
					}
				}
				tableModel.setData(rowData);
				tableModel.sortByColumn(0, true);
			} catch (e) {
				console.log("onAllianceInfo: ", e);
			}
		}

		function onPlayerChanged() {
			try {
				if (playerName.getValue().length > 0) {
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
						name: playerName.getValue()
					}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfo), null);
				}
			} catch (e) {
				console.log("onPlayerChanged: ", e);
			}
		}

		function onPlayerInfoWindowClose() {
			try {
				pvpScoreLabel.setValue("");
				pveScoreLabel.setValue("");
				tableModel.setData([]);
			} catch (e) {
				console.log("onPlayerInfoWindowClose: ", e);
			}
		}

		function PlayerInfoMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createPlayerInfoMod();
					} else {
						window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("PlayerInfoMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
		}
	}

	try {
		var PlayerInfoMod = document.createElement("script");
		PlayerInfoMod.innerHTML = "(" + PlayerInfoMod_main.toString() + ")();";
		PlayerInfoMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(PlayerInfoMod);
		}
	} catch (e) {
		console.log("PlayerInfoMod: init error: ", e);
	}
})();


/***********************************************************************************
Command & Conquer TA POIs Analyser - Version: 2.0.1							171353
***********************************************************************************/
// ==UserScript==
// @name        Command & Conquer TA POIs Analyser
// @description Display alliance's POIs scores and next tier requirements.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/171353.meta.js
// @downloadURL https://userscripts.org/scripts/source/171353.user.js
// ==/UserScript==

(function()
{	
	var injectScript = function()
	{
		function create_ccta_pa_class()
		{
			qx.Class.define('ccta_pa',
			{
				type: 'singleton',
				extend: qx.ui.tabview.Page,
				
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.set({layout: new qx.ui.layout.Grow(), label: "Alliance POIs", padding: 10});
						var root = this;
						var footerLayout = new qx.ui.layout.Grid();
						footerLayout.setColumnFlex(1,1);
						var footer = new qx.ui.container.Composite(footerLayout).set({font: "font_size_13", padding: [5, 10], marginTop: 5, decorator: "pane-light-opaque"});
						var label = new qx.ui.basic.Label().set({textColor: "text-value", font: "font_size_13", padding: 10, alignX: 'right'});
						var checkBox = new qx.ui.form.CheckBox('Show/Hide image and alliance appreviation.')
						checkBox.set({textColor: webfrontend.gui.util.BBCode.clrLink, font: "font_size_13"});
						var abr = new qx.ui.basic.Label().set({alignX: 'center', marginTop: 30, font: 'font_size_14', textColor: 'black'});
						var manager = qx.theme.manager.Font.getInstance();
						var defaultFont = manager.resolve(abr.getFont());
						var newFont = defaultFont.clone();
						newFont.setSize(32);
						abr.setFont(newFont);
						var deco = new qx.ui.decoration.Background().set({backgroundImage: "http://archeikhmeri.co.uk/images/fop2.png"});
						var imgCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						imgCont.set({minWidth: 363, minHeight: 356, maxWidth: 363, maxHeight: 356, decorator: deco, alignX: 'center'});
						var scrl = new qx.ui.container.Scroll();
						var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowGrowY: true, padding: 10});
						var gb = new qx.ui.groupbox.GroupBox("Statistics").set({layout: new qx.ui.layout.VBox(), marginLeft: 2});
						var lgb = new webfrontend.gui.GroupBoxLarge().set({layout: new qx.ui.layout.Canvas()});
						var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({padding: [50,10,20,10]});
						var widget = new qx.ui.core.Widget().set({minWidth: 628, minHeight: 335});
						var html = new qx.html.Element('div', null, {id: "graph"});
						var info = new qx.ui.groupbox.GroupBox("Additional Information").set({layout: new qx.ui.layout.VBox(), marginTop: 10});
						var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({marginTop: 10});
						var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({minWidth: 500});
						var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));
						grid.add(buttonCont, {row: 1, column: 1});
						grid.add(tableCont, {row: 1, column: 2});
						var noAllianceLabel = new qx.ui.basic.Label('No Alliance found, please create or join an alliance.').set({maxHeight: 30});
						
						var data = ClientLib.Data.MainData.GetInstance();
						var alliance = data.get_Alliance();
						var exists = alliance.get_Exists();
						var allianceName = alliance.get_Name();
						var allianceAbbr = alliance.get_Abbreviation();
						var faction = ClientLib.Base.Util.GetFactionGuiPatchText();
						var fileManager = ClientLib.File.FileManager.GetInstance();
						var opois = alliance.get_OwnedPOIs();
						var poiUtil = ClientLib.Base.PointOfInterestTypes;
						var getScore = poiUtil.GetScoreByLevel;
						var getMultiplier = poiUtil.GetBoostModifierByRank;
						var getBonus = poiUtil.GetBonusByType;
						var getNextScore = poiUtil.GetNextScore;
						var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
						var endRank = ClientLib.Base.EPOIType.RankedTypeEnd;
						var maxPoiLevel = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxCenterLevel();
						var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
						var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
						
						var tiersData = [], scoreData = [], bonusData = [], tiers = [];
						for (var i = 0; i < 50; i++)
						{
							var previousScore = (i == 0) ? 0 : bonusData[i - 1][1];
							var score = getNextScore(previousScore);
							var bonus = getBonus(startRank, score);
							var percent = getBonus(endRank - 1, score);
							if (score != previousScore)
							{
								bonusData[i] = [i + 1, score, bonus, percent + '%'];
								tiers[i] = [i, previousScore, score];
							}
							else break;
						}
						for (var i = 1; i <= maxPoiLevel; i++)
						{
							if (getScore(i + 1) == 1) continue;
							scoreData.push([i, getScore(i)]);
						}
						for (var i = 1; i < 41; i++) tiersData.push([i, '+' + getMultiplier(i) + '%']);
						
						var createTable = function()
						{
							
							var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
							var rows = [scoreData, bonusData, tiersData];
							
							var make = function(n)
							{
								var model = new qx.ui.table.model.Simple().set({columns: columns[n], data: rows[n]});
								var table = new qx.ui.table.Table(model).set({
									columnVisibilityButtonVisible: false,
									headerCellHeight: 25,
									marginTop: 20,
									minWidth: 500,
									height: 400});
								var renderer = new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false});
								for (i = 0; i < columns[n].length; i++) table.getTableColumnModel().setDataCellRenderer(i, renderer);
								return table;
							};
							this.Scores = make(0);
							this.Tiers = make(1);
							this.Multiplier = make(2);
						};
						var tables = new createTable();
						
						['Scores', 'Multiplier', 'Tiers'].map(function(key)
						{
							var table = tables[key];
							var button = new qx.ui.form.Button(key).set({width: 100, margin: [10, 10, 0, 10]}) ;
							button.addListener('execute', function()
							{
								tableCont.removeAll();
								tableCont.add(table)
								scrl.scrollChildIntoViewY(tableCont, 'top');
							}, this);
							buttonCont.add(button);
						});

						info.add(grid);
						
						var tabview = new qx.ui.tabview.TabView().set({marginTop: 20, maxWidth: 500, maxHeight: 500});
						var coordsButton = new qx.ui.form.Button('Coords').set({width: 100, margin: [10, 10, 0, 10]});
						coordsButton.addListener('execute', function()
						{
							tableCont.removeAll();
							tableCont.add(tabview);
							scrl.scrollChildIntoViewY(tableCont, 'top');
						}, this);
						var res = 
						[
							"ui/common/icn_res_tiberium.png",
							"ui/common/icn_res_chrystal.png",
							"ui/common/icn_res_power.png",
							"ui/" + faction + "/icons/icon_arsnl_off_squad.png",
							"ui/" + faction + "/icons/icon_arsnl_off_vehicle.png",
							"ui/" + faction + "/icons/icon_arsnl_off_plane.png",
							"ui/" + faction + "/icons/icon_def_army_points.png"
						];
						var columns = ['Coords', 'Level', 'Score'], models = [], pages = [];
						for (var i = 0; i < 7; i++)
						{
							var page = new qx.ui.tabview.Page().set({layout: new qx.ui.layout.VBox()});
							page.setIcon(fileManager.GetPhysicalPath(res[i]));
							var model = new qx.ui.table.model.Simple().set({columns: columns});
							model.sortByColumn(1, false);
							var table = new qx.ui.table.Table(model)
							table.set({columnVisibilityButtonVisible: false, headerCellHeight: 25, marginTop: 10, minWidth: 470, showCellFocusIndicator: false, height: 320});
							var renderer = new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false});
							for (var n = 0; n < columns.length; n++)
							{
								if (n == 0) renderer = new qx.ui.table.cellrenderer.Html();
								table.getTableColumnModel().setDataCellRenderer(n, renderer);
							}
							page.add(table);
							tabview.add(page);
							models.push(model);
							pages.push(page);
						}
						this.__poisCoordsPages = pages;
						
					//Simulator
						var wrapper = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: 'tabview-pane-clear', padding: [10, 14, 13, 10], marginTop: 20});
						var header = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({decorator: 'pane-light-opaque', padding: [8, 12]});
						var initValCont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({padding: [5,0], marginLeft: 20});
						var initVals = ['Score:', 'Tier: ', 'Rank:', 'Bonus:'], valueLabels = [];
						for (var i = 0; i < 4; i++)
						{
							var initCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
							var ln = new qx.ui.basic.Label(initVals[i]).set({textColor: webfrontend.gui.util.BBCode.clrLink, font: 'font_size_11'});
							var lv = new qx.ui.basic.Label().set({font: 'font_size_11', paddingLeft: 5, paddingRight: 10});
							initCont.add(ln);
							initCont.add(lv);
							initValCont.add(initCont, {flex: 1});
							valueLabels.push(lv);
						}
						var mainCont = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({maxWidth: 480});
						var modifierCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
						
						var rankingModel = new qx.ui.table.model.Simple().set({columns: ['Rank', 'Name', 'Score', 'Multiplier', 'Total Bonus']});
						var custom =
						{
							tableColumnModel : function(obj)
							{
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};
						var rankingTable = new qx.ui.table.Table(rankingModel, custom);
						rankingTable.set({
							columnVisibilityButtonVisible: false, 
							headerCellHeight: 25, 
							marginTop: 3, 
							showCellFocusIndicator: false, 
							statusBarVisible: false,
							keepFirstVisibleRowComplete: false, 
							height: 105});
						for (var n = 0; n < 5; n++)
						{
							if (n == 1) rankingTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Html());
							else rankingTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false}));
						}
						var rankingTableColumnModel = rankingTable.getTableColumnModel();
						var rankingTableResizeBehavior = rankingTableColumnModel.getBehavior();
						rankingTableResizeBehavior.setWidth(0, 50);
						rankingTableResizeBehavior.setWidth(1, "2*");
						rankingTableResizeBehavior.setWidth(2, 100);
						rankingTableResizeBehavior.setWidth(3, 70);
						rankingTableResizeBehavior.setWidth(4, 100);
						
						var resultsModel = new qx.ui.table.model.Simple().set({columns: ['Property', 'Value']});
						var resultsTable = new qx.ui.table.Table(resultsModel, custom);
						var resultsTableColumnModel = resultsTable.getTableColumnModel();
						var resultsTableResizeBehavior = resultsTableColumnModel.getBehavior();
						resultsTableResizeBehavior.setWidth(0, 100);
						resultsTableResizeBehavior.setWidth(1, "2*");
						resultsTable.set({
							columnVisibilityButtonVisible: false, 
							headerCellHeight: 25, 
							marginTop: 5, 
							width: 210, 
							maxWidth: 210, 
							showCellFocusIndicator: false, 
							height: 300});
						resultsTable.getTableColumnModel().setDataCellRenderer(0, new qx.ui.table.cellrenderer.Html());
						resultsTable.getTableColumnModel().setDataCellRenderer(1, new qx.ui.table.cellrenderer.Html());
						var codeToString = function(s){ return String.fromCharCode(s).toLowerCase() };
						label.setValue(String.fromCharCode(77) + [65,68,69,32,66,89,32,90,68,79,79,77].map(codeToString).join().replace(/,/g, ''));
						
						var poisColumns = ['Coords', 'Level', 'Score', 'Enabled'];
						var poisModel = new qx.ui.table.model.Simple().set({columns: poisColumns  });
						var poisTable = new qx.ui.table.Table(poisModel, custom);
						poisTable.set({
							columnVisibilityButtonVisible: false, 
							headerCellHeight: 25, 
							marginTop: 5, 
							marginLeft: 5,
							showCellFocusIndicator: false,
							height: 300});
						for (var n = 0; n < 4; n++)
						{
							if (n == 0) poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Html());
							else if (n == 3) poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Boolean())
							else poisTable.getTableColumnModel().setDataCellRenderer(n, new qx.ui.table.cellrenderer.Default().set({useAutoAlign: false}));
						}
						var poisTableColumnModel = poisTable.getTableColumnModel();
						var poisTableResizeBehavior = poisTableColumnModel.getBehavior();
						poisTableResizeBehavior.setWidth(0, 70);
						poisTableResizeBehavior.setWidth(1, 50);
						poisTableResizeBehavior.setWidth(2, "2*");
						poisTableResizeBehavior.setWidth(3, 60);
						var selectionModel = poisTable.getSelectionManager().getSelectionModel();
						selectionModel.setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE);
						poisTable.getSelectionModel().addListener('changeSelection', function(e)
						{
							var table = this.__poisTable;
							var tableModel = table.getTableModel();
							var data = tableModel.getDataAsMapArray();
							var score = 0;
							for (var i = 0; i < data.length; i++)
							{
								var isSelected = selectionModel.isSelectedIndex(i);
								var level = tableModel.getValue(1, i);
								tableModel.setValue(3, i, !isSelected);
								if (!isSelected) score += getScore(parseInt(level, 10));
							}
							this.__setResultsRows(score);
							this.__setRankingRows(score);
							table.setUserData('score', score);
						}, this);
					
						var addRowCont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({decorator: 'pane-light-opaque', padding: [8, 12], marginTop: 5});
						var selectPoiLabelCont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
						var selectPoiLabel = new qx.ui.basic.Label('Select POI\'s Level').set({margin: [5, 10], font: 'font_size_11'});
						var selectLevel = new qx.ui.form.SelectBox().set({padding: [5, 15]});
						for (var i = 12; i <= maxPoiLevel; i++) selectLevel.add(new qx.ui.form.ListItem('Level ' + i, null, i));
						var addButton = new qx.ui.form.Button('Add POI').set({padding: [5, 20]});
						var resetButton = new qx.ui.form.Button('Reset').set({padding: [5, 20], marginLeft: 5});
						addButton.addListener('execute', function()
						{
							var level = selectLevel.getSelection()[0].getModel();
							var score = getScore(parseInt(level, 10));
							var originalScore = poisTable.getUserData('score');
							poisModel.addRows([['<p style="padding:0; margin:0; color:' + webfrontend.gui.util.BBCode.clrLink + '">New</p>', level, this.__format(score), true]]);
							var newScore = originalScore + score;
							this.__setResultsRows(newScore);
							this.__setRankingRows(newScore);
							poisTable.setUserData('score', newScore);
						}, this);
						resetButton.addListener('execute', this.__initSim, this);
						mainCont.add(rankingTable, {flex: 1});
						modifierCont.add(resultsTable);
						modifierCont.add(poisTable, {flex: 1});
						mainCont.add(modifierCont);
						selectPoiLabelCont.add(selectPoiLabel);
						addRowCont.add(selectLevel);
						addRowCont.add(selectPoiLabelCont, {flex: 1});
						addRowCont.add(addButton);
						addRowCont.add(resetButton);
						mainCont.add(addRowCont);
						
						var selectBox = new qx.ui.form.SelectBox().set({padding: [5,20]});
						for (var i = 0; i < 7; i++)
						{
							var type = poiInfo(i + startRank).type;
							var listItem = new qx.ui.form.ListItem(type, null, type);
							selectBox.add(listItem);
						}
						selectBox.addListener('changeSelection', function(e)
						{
							if (!e.getData()[0]) return;
							var type = e.getData()[0].getModel();
							this.__selectedSimPoi = type;
							this.__initSim();
						}, this);
						
						header.add(selectBox);
						header.add(initValCont, {flex: 1});
						wrapper.add(header);
						wrapper.add(mainCont);
						
						this.__simLabels = valueLabels;
						this.__rankingModel = rankingModel;
						this.__resultsModel = resultsModel;
						this.__poisModel = poisModel;
						this.__poisTable = poisTable;
						this.__selectPoiLevel = selectLevel;
						this.__simCont = wrapper;
						this.__selectedSimPoi = poiInfo(startRank).type;
						
						var simulatorButton = new qx.ui.form.Button('Simulator').set({width: 100, margin: [10, 10, 0, 10]});
						simulatorButton.addListener('execute', function()
						{
							scrl.scrollChildIntoViewY(tableCont, 'top');
							tableCont.removeAll();
							tableCont.add(wrapper);
						}, this);
						////////////////////////////////////////////////////////////////////////////////////////////////////////
						
						
						var showImage = true;
						if (typeof localStorage.ccta_pa == 'undefined')
						{
							localStorage.ccta_pa = JSON.stringify({'showImage': true});
						}
						else showImage = JSON.parse(localStorage.ccta_pa).showImage;
						checkBox.setValue(showImage);
						
						var toggleImage = function()
						{
							var isChecked = checkBox.getValue();
							localStorage.ccta_pa = JSON.stringify({'showImage': isChecked});
							if (!isChecked) cont.remove(imgCont);
							else cont.addAt(imgCont, 0);
						};
						checkBox.addListener('changeValue', toggleImage, this);
						
						footer.add(checkBox, {row: 0, column: 0});
						footer.add(label, {row: 0, column: 1});
						scrl.add(cont);
						imgCont.add(abr);
						if (showImage) cont.add(imgCont);
						cont.add(lgb);
						lgb.add(lgbc);
						lgbc.add(gb);
						lgbc.add(info);
						lgbc.add(footer);
						widget.getContentElement().add(html);
						this.add(scrl);

						if (exists)
						{
							gb.add(widget);
							buttonCont.addAt(coordsButton, 0);
							buttonCont.addAt(simulatorButton, 1);
							tableCont.add(tabview);
							abr.setValue(allianceAbbr);
							this.__allianceName = allianceName;
							this.__allianceAbbr = allianceAbbr;
						}
						else
						{
							gb.add(noAllianceLabel);
							tableCont.add(tables.Scores);
							noAllianceLabel.setValue('No Alliance found, please create or join an alliance.');
							this.__isReset = true;
						}
						
						this.__models = models;	
						this.__tableCont = tableCont;						
						this.__timer = new qx.event.Timer(1000);
						this.__tiers = tiers;
						this.__timer.addListener('interval', this.__update, this);
						this.addListener('appear', function()
						{
							try
							{
								var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
								var allianceName = alliance.get_Name();
								var allianceAbbr = alliance.get_Abbreviation();
								var exists = alliance.get_Exists();
								if (!exists && !this.__isReset)
								{
									console.log('No alliance found');
									gb.removeAll();
									gb.add(noAllianceLabel);
									buttonCont.remove(coordsButton);
									buttonCont.remove(simulatorButton);
									tableCont.removeAll();
									tableCont.add(tables.Scores);
									abr.setValue('');
									this.__allianceName = '';
									this.__allianceAbbr = '';
									this.__pois = {};
									this.__isReset = true;
								}
								else if (exists)
								{
									if (this.__isReset)
									{
										gb.removeAll();
										gb.add(widget);
										buttonCont.addAt(coordsButton, 0);
										buttonCont.addAt(simulatorButton, 1);
										abr.setValue(allianceAbbr);
										this.__isReset = false;
										this.__allianceName = allianceName;
										this.__allianceAbbr = allianceAbbr;
									}
									tableCont.removeAll();
									tableCont.add(tabview);
									this.__update();
								}
							}
							catch(e)
							{
								console.log(e.toString())
							}
						}, this);
						
						var overlay = webfrontend.gui.alliance.AllianceOverlay.getInstance();
						var mainTabview = overlay.getChildren()[12].getChildren()[0];
							mainTabview.addAt(this, 0);
							mainTabview.setSelection([this]);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				destruct: function(){},
				members:
				{
					__isReset: false,
					__timer: null,
					__allianceName: null,
					__allianceAbbr: null,
					__pois: null,
					__tiers: null,
					__ranks: {},
					__models: null,
					__poisCoordsPages: null,
					__tableCont: null,
					__simCont: null,
					__selectedSimPoi: null,
					__isolatedRanks: null,
					__simLabels: [],
					__rankingModel: null,
					__resultsModel: null,
					__poisModel: null,
					__poisTable: null,
					__selectPoi: null,
					__style:
					{
						"table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
						"graph":
						{
							"td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
							"div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
						},
						"icon":
						{
							"ul": {"listStyleType": "none", "margin": 0, "padding": 0},
							"div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
							"p": {"display": "inline", "fontSize": "10px", "color": "#555"},
							"li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
						},
						"cell":
						{
							"data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
							"header": {"color": "#416d96", "padding": "3px 2px"}
						},
						"rows":
						{
							"graph": {"borderBottom": "3px solid #333", "height": "200px"},
							"tr": {"fontSize": "11px", "borderBottom": "1px solid #333",  "backgroundColor": "#d6dde1"}
						}      
					},
					
					__element: function(tag)
					{
						var elm = document.createElement(tag), root = this;
						this.css = function(a)
						{
							for (var b in a)
							{
								root.elm.style[b] = a[b];
								root.__style[b] = a[b];
							}
						}
						this.set = function(a)
						{
							for (var b in a) root.elm[b] = a[b];
						}
						this.append = function()
						{
							for (var i in arguments)
							{
								if (arguments[i].__instanceof == 'element') root.elm.appendChild(arguments[i].elm);
								else if (arguments[i] instanceof Element) root.elm.appendChild(arguments[i]);
								else console.log(arguments[i] + ' is not an element');
							}
						}
						this.text = function(str)
						{
							var node = document.createTextNode(str);
							root.elm.appendChild(node);
						}
						this.elm = elm;
						this.__style = {};
						this.__instanceof = 'element';
					},
					
					__format: function(n)
					{
						var f = "", n = n.toString();
						if (n.length < 3) return n;
						for (var i = 0; i < n.length; i++)
						{
							(((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
						}
						return f;
					},
					
					__update: function()
					{
						this.__timer.stop();
						var div = document.getElementById('graph');
						if (!div)
						{
							this.__timer.start();
							console.log('Waiting for div dom element to be loaded');
						}
						if (div)
						{
							console.log('Reloading graph');
							div.innerHTML = "";
							this.__updatePOIList();
							this.__updateGraph();
							this.__updateRanks();
						}
					},
					
					__updatePOIList: function()
					{
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var opois = alliance.get_OwnedPOIs();
						var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
						var getScore = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel;
						var models = this.__models, format = this.__format, pages = this.__poisCoordsPages;
						for (var i = 0; i < 7; i++)
						{
							var rows = [];
							opois.map(function(poi)
							{
								if (poi.t - startRank === i)
								{
									var a  = webfrontend.gui.util.BBCode.createCoordsLinkText((poi.x + ':' + poi.y), poi.x, poi.y);
									rows.push([a, poi.l, format(getScore(poi.l))]);
								}
							});
							models[i].setData(rows);
							models[i].sortByColumn(1, false);
							pages[i].setLabel(rows.length);
						}
					},
					
					__updateRanks: function()
					{
						this.__ranks = {}, this.__isolatedRanks = {}, root = this, allianceName = this.__allianceName;
						var getPoiRankType = ClientLib.Base.PointOfInterestTypes.GetPOITypeFromPOIRanking;
						var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType, startRank;
						for (var i = 0; i < 20; i++) if (getPoiRankType(i) > 0) { startRank = i; break; };
						var getPoiRanks = function(type, poiType, increment)
						{
							ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData",
							{'ascending': true, 'firstIndex': 0, 'lastIndex': 100, 'rankingType': poiType, 'sortColumn': 200 + increment, 'view': 1}, 
							phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, root, function(context, data)
							{
								if (data !== null)
								{
									var skip = 1, arr = [];
									for (var i = 0; i < data.a.length; i++)
									{
										var alliance = data.a[i], name = alliance.an, score = (alliance.pois || 0);
										if (name == allianceName)
										{
											skip = 0;
											continue;
										}
										alliance.r = i + skip;
										arr.push(alliance);
									}
									this.__isolatedRanks[type] = arr;
									this.__ranks[type] = data.a;
									if (this.__selectedSimPoi == type) this.__initSim();
								}
							}), null);
						};
						if (startRank) for (var n = 0; n < 7; n++) getPoiRanks(poiInfo(getPoiRankType(n + startRank)).type, n + startRank, n);
					},
					
					__setSimLabels: function()
					{
						var labels = this.__simLabels, pois = this.__pois, type = this.__selectedSimPoi, format = this.__format;
						if (pois[type])
						{
							labels[0].setValue(pois[type].s);
							labels[1].setValue((pois[type].tier == 0) ? "0" : pois[type].tier);
							labels[2].setValue((pois[type].rank == 0) ? "0" : pois[type].rank);
							labels[3].setValue(pois[type].tb);
						}
					},
					
					__setRankingRows: function(score)
					{
						var isolatedRanks = this.__isolatedRanks, format = this.__format, allianceName = this.__allianceName, type = this.__selectedSimPoi, pois = this.__pois;
						var poiUtil = ClientLib.Base.PointOfInterestTypes;
						var getMultiplier = poiUtil.GetBoostModifierByRank;
						var getBonus = poiUtil.GetBonusByType;
						var getRankingData = function(i, type, nr)
						{
							var x = isolatedRanks[type][i], score = (x.pois || 0), name = webfrontend.gui.util.BBCode.createAllianceLinkText(x.an);
							var bonus = getBonus(pois[type].index, score), multiplier = getMultiplier(nr), totalBonus = bonus + (bonus * multiplier / 100);
							totalBonus = (pois[type].bonusType == 1) ? format(Math.round(totalBonus)) : Math.round(totalBonus * 100) / 100 + '%';
							return [nr, name, format(score), '+' + multiplier + '%',  totalBonus] 
						};
						getMyRanking = function(s, i, p)
						{
							var b = getBonus(pois[p].index, s);
							var m = getMultiplier(i);
							var tb = b + (b * m / 100);
							tb = (pois[p].bonusType == 1) ? format(Math.round(tb)) : Math.round(tb * 100) / 100 + '%';
							var n = webfrontend.gui.util.BBCode.createAllianceLinkText(allianceName);
							return [i, n, format(s), '+' + m + '%',  tb]; 
						};
						var getRankingRows = function(s, type)
						{
							var rows;
							for (var i = 0; i < isolatedRanks[type].length; i++)
							{
								if (s >= (isolatedRanks[type][i].pois || 0))
								{
									var matched = getRankingData(i, type, i + 2);
									var nextMatched = getRankingData(i + 1, type, i + 3);
									var preMatched = (i > 0) ? getRankingData(i - 1, type, i) : null;
									if (i == 0) rows = [getMyRanking(s, i + 1, type), matched, nextMatched];
									else rows = [preMatched, getMyRanking(s, i + 1, type), matched];
									break;
								}
							}
							return rows;
						}
						var rankingRows = getRankingRows(score, type);
						if (rankingRows) this.__rankingModel.setData(rankingRows);
					},
								
					__setResultsRows: function(score)
					{
						var pois = this.__pois, tiers = this.__tiers, format = this.__format, type = this.__selectedSimPoi, ranks = this.__isolatedRanks;
						var poiUtil = ClientLib.Base.PointOfInterestTypes;
						var getScore = poiUtil.GetScoreByLevel;
						var getMultiplier = poiUtil.GetBoostModifierByRank;
						var getBonus = poiUtil.GetBonusByType;
						var getTier = function(s)
						{
							if (s == 0) return "0";
							else for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return tiers[i][0];
						};
						var getNextTier = function(s)
						{
							for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return (tiers[i][2] - s);
						};
						var getPreviousTier = function(s)
						{
							for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return (s - tiers[i][1]);
						};
						var getRank = function(s, t)
						{
							for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return i + 1;
						};
						var getNextRank = function(s, t)
						{
							for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return (ranks[t][i-1]) ? ranks[t][i-1].pois : s;
						};
						var getPreviousRank = function(s, t)
						{
							for (var i = 0; i < ranks[t].length; i++) if (s >= (ranks[t][i].pois || 0)) return (ranks[t][i].pois || 0);
						};
						var getSimulatedData = function(s, p)
						{
							var ot = pois[p].tier;
							var or = pois[p].rank;
							var ob = pois[p].bonus;
							var otb = pois[p].totalBonus;
							var pp = pois[p].bonusType;
							var t = getTier(s);
							var r = getRank(s, p);
							var ps = getPreviousRank(s, p);
							var ns = getNextRank(s, p);
							var pr = s - ps;
							var nr = ns - s;
							var nt = getNextTier(s);
							var pt = getPreviousTier(s);
							var b = getBonus(pois[p].index, s);
							var m = getMultiplier(r);
							var f = format;
							var tb = b + (b * m / 100);
							var sc = function(val, org, poiType, fac)
							{
								var cs = [webfrontend.gui.util.BBCode.clrLink, '#41a921', '#e23636'];
								var st = function(c){return '<p style="padding: 0; margin: 0; color: ' + c + '">'}, et = '</p>';
								if (val == undefined) return null;
								if (org == undefined) return st(cs[0]) + val + et;
								else if (org != undefined && poiType == null) return ((val-org)*fac > 0) ? st(cs[1])+val+et : ((val-org)* fac < 0) ? st(cs[2])+val+et : val;
								else
								{
									var fv = (poiType == 1) ? format(Math.round(val)) : Math.round(val * 100) / 100 + '%';
									return ((val - org) * fac > 0) ? st(cs[1]) + fv + et : ((val - org) * fac < 0) ? st(cs[2]) + fv + et : fv;
								}
							};
							var rows = ['Score', 'Tier', 'Rank', 'Multiplier', 'Previous Rank', 'Next Rank', 'Previous Tier', 'Next Tier', 'Bonus', 'Total Bonus'];
							var data = [f(s), sc(t,ot,null,1), sc(r,or,null,-1), '+'+m+'%', '+'+f(pr), '-'+f(nr), '+'+f(pt), '-'+f(nt), sc(b,ob,pp,1), sc(tb,otb,pp,1)];
							var results = [];
							for (var i = 0; i < rows.length; i++) results.push([sc(rows[i]), data[i]]);
							return results;
						};
						var resultsRows = getSimulatedData(score, type);
						if (resultsRows) this.__resultsModel.setData(resultsRows);
					},
					
					__setPoisRows: function()
					{
						var poiUtil = ClientLib.Base.PointOfInterestTypes;
						var getScore = poiUtil.GetScoreByLevel; //poi level
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var opois = alliance.get_OwnedPOIs();
						var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
						var poisRows = [], type = this.__selectedSimPoi;
						opois.map(function(poi)
						{
							if (poiInfo(poi.t).type == type)
							{
								var a  = webfrontend.gui.util.BBCode.createCoordsLinkText((poi.x + ':' + poi.y), poi.x, poi.y);
								poisRows.push([a, poi.l, getScore(poi.l), true]);
							}
						});
						if (poisRows) this.__poisModel.setData(poisRows);
					},
					
					__initSim: function()
					{
						var score = this.__pois[this.__selectedSimPoi].score;
						this.__setSimLabels();
						this.__setRankingRows(score);
						this.__setResultsRows(score);
						this.__setPoisRows();
						this.__poisTable.setUserData('score', score);
						this.__poisTable.resetSelection();
						this.__selectPoiLevel.setSelection([this.__selectPoiLevel.getSelectables()[0]]);
					},
			
					__updateGraph: function()
					{
						try
						{
							var data = ClientLib.Data.MainData.GetInstance();
							var alliance = data.get_Alliance();
							var ranks = alliance.get_POIRankScore();
							var poiUtil = ClientLib.Base.PointOfInterestTypes;
							var getScore = poiUtil.GetScoreByLevel;
							var getMultiplier = poiUtil.GetBoostModifierByRank;
							var getBonus = poiUtil.GetBonusByType;
							var getNextScore = poiUtil.GetNextScore;
							var startRank = ClientLib.Base.EPOIType.RankedTypeBegin;
							var endRank = ClientLib.Base.EPOIType.RankedTypeEnd;
							var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;

							var pois = {}, format = this.__format, tiers = this.__tiers;
							var colors = ["#8dc186", "#5b9dcb", "#8cc1c7", "#d7d49c", "#dbb476", "#c47f76", "#928195"];
							var getTier = function(s)
							{
								for (var i = 0; i < tiers.length; i++) if (s >= tiers[i][1] && s < tiers[i][2]) return tiers[i][0];
							};
							var getHeight = function(s)
							{
								if (s == 0) return 0;
								for (var i = 0; i < tiers.length; i++)
									if (s >= tiers[i][1] && s < tiers[i][2]) return Math.round((s - tiers[i][1]) / (tiers[i][2] - tiers[i][1]) * 100);
							};

							var colors = ["#8dc186", "#5b9dcb", "#8cc1c7", "#d7d49c", "#dbb476", "#c47f76", "#928195"];
							for (var i = 0; i < ranks.length; i++)
							{
								var type = i + startRank;
								var name = poiInfo(type).type;
								var rank = ranks[i].r;
								var multiplier = getMultiplier(rank);
								var score = ranks[i].s;
								var bonus = getBonus(type, score);
								var nextScore = getNextScore(score);
								var nextBonus = getBonus(type, nextScore);
								var totalBonus = bonus + (bonus * multiplier / 100);
								var nextTotalBonus = nextBonus + (nextBonus * multiplier / 100);
								var nextTier = format(nextScore - score);
								var poiType = (i > 2) ? 2 : 1;
								var color = colors[i];
								var tier = getTier(ranks[i].s);
								var height = getHeight(ranks[i].s);
								var f_score = format(score);
								var f_rank = rank + ' (' + multiplier + '%)';
								var f_totalBonus = (poiType == 1) ? format(totalBonus) : Math.round(totalBonus * 100) / 100 + ' %';
								nextTotalBonus = (poiType == 1) ? format(nextTotalBonus) : Math.round(nextTotalBonus * 100) / 100 + ' %';
								pois[name] = 
								{
									'score': score,
									'tier': tier,
									'bonus': bonus,
									'totalBonus': totalBonus,
									'index': type,
									'bonusType': poiType,
									'rank': rank,
									'multiplier': multiplier,
									't': tier, 
									's': f_score, 
									'r': f_rank, 
									'nt': nextTier, 
									'tb': f_totalBonus, 
									'ntb': nextTotalBonus, 
									'c': color, 
									'h': height
								};
							}							
							console.log('data ready')
							this.__pois = pois;
							this.__graph.call(this);
						}
						catch(e)
						{
							console.log(e.toString());
						}
					},
					
					__graph: function()
					{
						console.log('creating graph');
						var root = this, pois = this.__pois, style = this.__style;
						var create = function(a, b)
						{
							var elm = new root.__element(a);
							if (b instanceof Object) elm.css(b);
							return elm;
						};
						var addRow = function(title, arr, table, selected)
						{
							var row = create('tr', style.rows.tr), header = create('td', style.cell.header);
							row.elm.onclick = function()
							{
								var tr = table.elm.getElementsByTagName('tr');
								for (var i = 1; i < tr.length; i++)
								{
									tr[i].style.backgroundColor = '#d6dde1';
								}
								this.style.backgroundColor ='#ecf6fc';
							};
							if (selected == 1) row.css({'backgroundColor': '#ecf6fc'});
							header.text(title);
							row.append(header);
							for (var key in arr)
							{
								var td = create('td', style.cell.data);
								td.text(arr[key]);
								row.append(td);
							}
							table.append(row); 
						};
					
						var table = create('table', style.table);
						var	gc = create('tr', style.rows.graph);
						var	gh = create('td');
						var	ul = create('ul', style.icon.ul);
						table.set({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
						gh.append(ul);
						gc.append(gh);
						table.append(gc);
						
						var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;
						for (var key in pois)
						{
							var color = pois[key].c,
								name  = key,
								h     = pois[key].h,
								td    = create('td', style.graph.td),
								div   = create('div', style.graph.div),
								li    = create('li', style.icon.li),
								icon  = create('div', style.icon.div),
								p     = create('p', style.icon.p);
								
								bns[m]      = pois[key].tb;
								poiRank[m]  = pois[key].r;
								score[m]    = pois[key].s;
								tier[m]     = pois[key].t;
								nextTier[m] = pois[key].nt;
								nextBns[m]  = pois[key].ntb;
					
							div.css({'backgroundColor': color, 'height': h * 2 - 3 + 'px'});
							td.append(div);
							gc.append(td);
							icon.css({'backgroundColor': color});
							p.text(name);
							li.append(icon);
							li.append(p);
							ul.append(li);
							m++;
						}
						
						addRow('Tier', tier, table, 0);
						addRow('Alliance Rank', poiRank, table, 0);		
						addRow('Score', score, table);
						addRow('Next Tier Requires', nextTier, table, 0);
						addRow('Bonus', bns, table, 1);
						addRow('Next Tier Bonus', nextBns, table, 0);
						document.getElementById('graph').appendChild(table.elm);
					}		
				}
			});
		}
		
		function initialize_ccta_pa() 
		{
			console.log('poiAnalyser: ' + 'POIs Analyser retrying...');
			if (typeof qx != 'undefined' && typeof qx.core != 'undefined' && typeof qx.core.Init != 'undefined' && typeof ClientLib != 'undefined' && typeof webfrontend != 'undefined' && typeof phe != 'undefined') 
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true) 
				{
					try
					{
						var isDefined = function(a){return (typeof a == 'undefined') ? false : true};
						var data = ClientLib.Data.MainData.GetInstance();
						var net = ClientLib.Net.CommunicationManager.GetInstance();
						if (isDefined(data) && isDefined(net))
						{
							var alliance = data.get_Alliance();
							var player = data.get_Player();
							var poiUtil = ClientLib.Base.PointOfInterestTypes;
							var poiInfo = phe.cnc.gui.util.Text.getPoiInfosByType;
							if (isDefined(alliance) && isDefined(player) && isDefined(alliance.get_Exists()) && isDefined(player.get_Name()) && player.get_Name() != '' && isDefined(poiUtil) && isDefined(poiInfo))
							{
								try
								{
									console.log('poiAnalyser: ' + 'initializing POIs Analyser');
									create_ccta_pa_class();
									ccta_pa.getInstance();
								}
								catch(e)
								{
									console.log('poiAnalyser: ' + "POIs Analyser script init error:");
									console.log('poiAnalyser: ' + e.toString());
								}
							}
							else window.setTimeout(initialize_ccta_pa, 10000);
						}
						else window.setTimeout(initialize_ccta_pa, 10000);
					}
					catch(e)
					{
						console.log('poiAnalyser: ' + e.toString());
					}
				} 
				else window.setTimeout(initialize_ccta_pa, 10000);
			} 
			else window.setTimeout(initialize_ccta_pa, 10000);
		};
		window.setTimeout(initialize_ccta_pa, 10000);  
	};
	
	function inject()
	{
		var script = document.createElement("script");
			script.innerHTML = "(" + injectScript.toString() + ")();";
			script.type = "text/javascript";
			if (/commandandconquer\.com/i.test(document.domain)) {
				document.getElementsByTagName("head")[0].appendChild(script);
				console.log('injected');
			}
	};
	inject();
	
})();


/***********************************************************************************
Command & Conquer TA World Map - Version: 1.0.0								173330
***********************************************************************************/
// ==UserScript==
// @name        Command & Conquer TA World Map
// @description Creates a detailed map of bases and pois of the alliance and enemies.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.0
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/173330.meta.js
// @downloadURL https://userscripts.org/scripts/source/173330.user.js
// ==/UserScript==

(function(){

	function create_ccta_map_class()
	{
		qx.Class.define("ccta_map", 
		{
			type: "singleton",
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{				
					var root = this;
							
					var mapButton = new qx.ui.form.Button('Map').set({ enabled: false });
					var app = qx.core.Init.getApplication();
					var optionsBar = app.getOptionsBar().getLayoutParent();
					this.__mapButton = mapButton;
					
					optionsBar.getChildren()[0].getChildren()[2].addAt(mapButton,1);
					
					var onReady = function()
					{
						console.log('checking if data is ready');
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Relationships;
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var endGame = ClientLib.Data.MainData.GetInstance().get_EndGame().get_Hubs().d;
						var command = ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand;
						var delegate = phe.cnc.Util.createEventDelegate;
						
						if(!!alliance && !!world && !!command && !!delegate && !!endGame)
						{
							var worldWidth = world.get_WorldWidth();
							if(!worldWidth) return;
							
							var factor = 500 / worldWidth;
							var hubs = [], fortress = [];
							
							for (var index in endGame)
							{
								var currentHub = endGame[index];
								if (currentHub.get_Type() == 1) hubs.push([(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor]);
								if (currentHub.get_Type() == 3) fortress = [(currentHub.get_X() + 2) * factor, (currentHub.get_Y() + 2) * factor];
							}
							
							if (hubs.length > 0)
							{
								timer.stop();
								root.__factor = factor;
								root.__endGame['hubs'] = hubs;
								root.__endGame['fortress'] = fortress;
								root.__init();
							}
							console.log(hubs);
						}
						console.log(!!alliance, !!world, !!command, !!delegate, !!endGame);
					};
					
					var timer = new qx.event.Timer(1000);
					timer.addListener('interval', onReady, this);
					timer.start();
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('ccta_map initialization completed');
			},
			destruct: function(){},
			members: 
			{
				__mapButton: null,
				__allianceExist: null,
				__allianceName: null,
				__allianceId: null,
				__allianceHasRelations: false,
				__defaultAlliances: null,
				__selectedAlliances: null,
				__data: null,
				__totalProcesses: null,
				__completedProcesses: 0,
				__endGame: {},
				__isLoading: false,
				__factor: null,
				
				__init: function()
				{
					try
					{
						var root = this;
						var data = ClientLib.Data.MainData.GetInstance();
						var alliance_data = data.get_Alliance();
						var alliance_exists = alliance_data.get_Exists();
												
						if(alliance_exists)
						{
							var alliance_name = alliance_data.get_Name();
							var alliance_id = alliance_data.get_Id();
							var alliance_relations = alliance_data.get_Relationships();
							
							this.__allianceExist = true;
							this.__allianceId = alliance_id;
							this.__allianceName = alliance_name;
							
							var selectedAlliancesList = [];
							selectedAlliancesList[0] = [alliance_id, 'alliance', alliance_name, 0];
											
							if (alliance_relations != null)
							{
								this.__allianceHasRelations = true;
								alliance_relations.map(function(x)
								{
									var type = x.Relationship, id = x.OtherAllianceId, name = x.OtherAllianceName;
									if ((type == 3) && (selectedAlliancesList.length < 9)) selectedAlliancesList.push([id, 'enemy', name, 0]);
								});
							}
							this.__defaultAlliances = selectedAlliancesList;
						}
						else
						{
							this.__allianceExist = false;
						}
						
						if (typeof(Storage) !== 'undefined' && typeof(localStorage.ccta_map_settings) !== 'undefined')
						{
							this.__selectedAlliances = JSON.parse(localStorage.ccta_map_settings);
						}
						
						this.__mapButton.setEnabled(true);
						this.__mapButton.addListener('execute', function()
						{
							root.getData();
							ccta_map.container.getInstance().open(1);
						}, this);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				getData: function()
				{
					if (this.__isLoading === true) return;
					this.__isLoading = true;
					var arr = (this.__selectedAlliances == null) ? this.__defaultAlliances : this.__selectedAlliances;
					
					if(arr != null)
					{
						this.__data = [];
						this.__totalProcesses = arr.length;
						for(var i = 0; i < arr.length; i++)
						{
							this.__getAlliance(arr[i][0], arr[i][1], arr[i][3]);
						}
					}
				},
				
				__getAlliance: function(aid, type, color)
				{
					try
					{
						var alliance = {}, root = this, factor = this.__factor;
						alliance.id = aid;
						alliance.players = {};
						var totalProcesses = this.__totalProcesses;
						
						var getBases = function(pid, pn, p, tp)
						{
							ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", { id: pid }, 
							phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
							{
								if (data.c != null)
								{
									var totalBases = data.c.length;
									var player = {};
									var bases = [];
									
									for (var b = 0; b < data.c.length; b++)
									{
										var id   = data.c[b].i;
										var name = data.c[b].n;
										var x    = data.c[b].x * factor;
										var y    = data.c[b].y * factor;
										bases.push([x, y, name, id]);
										if((p == tp - 1) && (b == totalBases - 1))
										{
											root.__completedProcesses++;
											var loader = ccta_map.container.getInstance().loader;
											loader.setValue('Loading: ' + root.__completedProcesses + "/" + totalProcesses);
										}
										if(root.__completedProcesses == totalProcesses) root.__onProcessComplete();
									}
									player.id = pid;
									player.name = pn;
									player.bases = bases;
									alliance.players[pn] = player;
								}
							}), null);
						};
						
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", { id: aid }, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							if (data == null) return;
							if (data.opois != null)
							{
								var pois = [];
								data.opois.map(function(poi)
								{
									pois.push({'i': poi.i, 'l': poi.l, 't': poi.t, 'x': poi.x * factor, 'y': poi.y * factor});
								});
								alliance.pois = pois;
							}
							if (data.n != null) alliance.name = data.n;
							if (data.m != null)
							{
								
								for (var p = 0; p < data.m.length; p++)
								{
									var playerName = data.m[p].n;
									var playerId   = data.m[p].i;
									getBases(playerId, playerName, p, data.m.length);								
								}
								root.__data.push([alliance, type, color]);
							}
						}), null);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__onProcessComplete: function()
				{
					console.log('process completed - alliances data has been generated', this.__data);
					this.__isLoading = false;
					var win = ccta_map.container.getInstance();
					win.receivedData = this.__data;
					win.__updateList();
					win.drawCanvas();
					win.loader.setValue('Completed');
					this.__totalProcess = null;
					this.__completedProcesses = 0;
					setTimeout(function(){
						win.loader.setValue('');
					}, 3000);
				}
				
			}
			
		});
		
		qx.Class.define("ccta_map.container",
		{
			type: "singleton",
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					var layout = new qx.ui.layout.Canvas();
					this._setLayout(layout);
					
					var worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
					var factor = 500 / worldWidth;
					this.__factor = factor;
					
					var zoomIn = new qx.ui.form.Button('+').set({ width: 30 });
					var zoomOut = new qx.ui.form.Button('-').set({ width: 30, enabled: false });
					var zoomReset = new qx.ui.form.Button('R').set({ width: 30, enabled: false });
					var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(3,1));
					var info = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ minHeight: 300, padding: 10 });
					var canvasContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
					var rightBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var leftBar = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					var widget = new qx.ui.core.Widget().set({ width: 500, height: 500 });
					var div = new qx.html.Element('div', null, {id: 'canvasContainer'});
					
					
					var li1 = new qx.ui.form.ListItem('All', null, "all");
					var li2 = new qx.ui.form.ListItem('My Bases', null, "bases");
					var li3 = new qx.ui.form.ListItem('My Alliance', null, "alliance");
					var li4 = new qx.ui.form.ListItem('Selected', null, "selected");
					var displayMode = new qx.ui.form.SelectBox().set({ height: 28 });
						displayMode.add(li1);
						displayMode.add(li2);
						displayMode.add(li3);
						displayMode.add(li4);
					
					var zoomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(15));
					
					var bothOpt = new qx.ui.form.RadioButton('Both').set({ model: "both" });
					var basesOpt = new qx.ui.form.RadioButton('Base').set({ model: "bases" });;
					var poisOpt = new qx.ui.form.RadioButton('Poi').set({ model: "pois" });
					var displayOptions = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(), font :'font_size_11' });
						displayOptions.add(bothOpt);
						displayOptions.add(basesOpt);
						displayOptions.add(poisOpt);
						
					var allianceList = new qx.ui.form.List().set({ font :'font_size_11', height: 215 });
					var editAlliance = new qx.ui.form.Button('Edit Alliances');
					var label = new qx.ui.basic.Label('Transparency');
					var slider = new qx.ui.form.Slider().set({ minimum: 30, maximum: 100, value: 100 });
					var coordsField = new qx.ui.form.TextField().set({maxWidth: 100, textAlign: 'center', readOnly: 'true', alignX: 'center'});
					var loader = new qx.ui.basic.Label().set({ marginTop: 100 });
					
					grid.set({ minWidth: 780, backgroundColor: '#8e979b', minHeight: 524, margin: 3, paddingTop: 10 });
					rightBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingRight: 10 });
					leftBar.set({ maxWidth: 130, minWidth: 130, paddingTop: 30, paddingLeft: 10 });
					
					var hints = [[zoomIn,'Zoom in'], [zoomOut,'Zoom out'], [zoomReset,'Restet zoom'], [basesOpt,'Show bases only'] , [poisOpt,'Show POIs only'], [bothOpt,'Show bases and POIs']]
					for(var i = 0; i < hints.length; i++)
					{
						var tooltip = new qx.ui.tooltip.ToolTip(hints[i][1]);
						hints[i][0].setToolTip(tooltip);
					}
					
					zoomBar.add(zoomIn);
					zoomBar.add(zoomOut);
					zoomBar.add(zoomReset);
					
					rightBar.add(zoomBar);
					rightBar.add(displayMode);
					rightBar.add(displayOptions);
					rightBar.add(allianceList);
					rightBar.add(editAlliance);
					rightBar.add(label);
					rightBar.add(slider);
					
					leftBar.add(coordsField);
					leftBar.add(info);
					leftBar.add(loader);
					
					canvasContainer.add(widget);
					widget.getContentElement().add(div);
					grid.add(leftBar, {row: 1, column: 1});
					grid.add(rightBar, {row: 1, column: 3});
					grid.add(canvasContainer, {row: 1, column: 2});
					
					this.info = info;
					this.coordsField = coordsField;
					this.allianceList = allianceList;
					this.panel = [zoomOut, zoomReset, zoomIn, displayOptions, displayMode, allianceList, editAlliance];
					this.loader = loader;
					this.zoomIn = zoomIn;
					this.zoomOut = zoomOut;
					this.zoomReset = zoomReset;
					
					//canvas
					var cont = document.createElement('div'),
						mask = document.createElement('div'),
						canvas = document.createElement('canvas'),
						ctx = canvas.getContext("2d"),
						root = this;
									
					cont.style.width = '500px';
					cont.style.height = '500px';
					cont.style.position = 'absolute';
					cont.style.overflow = 'hidden';
					cont.style.backgroundColor = '#0b2833';
					
					canvas.style.position = 'absolute';
					canvas.style.backgroundColor = '#0b2833';
					
					mask.style.position = 'absolute';
					mask.style.width = '500px';
					mask.style.height = '500px';
					mask.style.background = 'url("http://archeikhmeri.co.uk/images/map_mask.png") center center no-repeat';
					
					this.canvas = canvas;
					this.mask = mask;
					this.ctx = ctx;				
					
					var __zoomIn = function(){ if (root.scale < 12) root.__scaleMap('up') };
					var __zoomOut = function(){if (root.scale > 1) root.__scaleMap('down') };
					var __zoomReset = function()
					{
						canvas.width = 500;
						canvas.height = 500;
						canvas.style.left = 0;
						canvas.style.top = 0;
						root.scale = 1;
						root.drawCanvas();
						zoomIn.setEnabled(true);
						zoomOut.setEnabled(false);
						zoomReset.setEnabled(false);
					};
					
					cont.appendChild(canvas);
					cont.appendChild(mask);				
					root.__draggable(mask);
					root.resetMap();
					
					slider.addListener('changeValue', function(e)
					{
						if (e.getData())
						{
							var val = e.getData() / 100;
							this.setOpacity(val);
							slider.setToolTipText(" " + val * 100 + "% ");
						}
					}, this);
					
					allianceList.addListener('changeSelection', function(e)
					{
						if ((root.__displayM == "bases") || (root.__displayM == "alliance") || !e.getData()[0]) return;
						var aid = e.getData()[0].getModel();
						root.__selectedA = aid;
						root.drawCanvas();
					}, this);
									
					displayMode.addListener('changeSelection', function(e)
					{
						var dm = e.getData()[0].getModel();
						root.__displayM = dm;
						root.__updateList();
						
						if(dm == "bases")
						{
							displayOptions.setSelection([basesOpt]);
							poisOpt.setEnabled(false);
							bothOpt.setEnabled(false);
							root.__displayO = "bases";
						}
						else
						{
							if(!poisOpt.isEnabled()) poisOpt.setEnabled(true);
							if(!bothOpt.isEnabled()) bothOpt.setEnabled(true);
							displayOptions.setSelection([bothOpt]);
							root.__displayO = "both";
						}
						root.drawCanvas();
					}, this);
					
					displayOptions.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var dop = e.getData()[0].getModel();
						root.__displayO = dop;
						root.drawCanvas();
					}, this);
					
					editAlliance.addListener('execute', function()
					{
						ccta_map.options.getInstance().open();
					}, this);
					
					var desktop = qx.core.Init.getApplication().getDesktop();
					desktop.addListener('resize', this._onResize, this);
					
					zoomIn.addListener('execute', __zoomIn, this);
					zoomOut.addListener('execute', __zoomOut, this);
					zoomReset.addListener('execute', __zoomReset, this);
					
					this.add(grid);
			
					this.wdgAnchor = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl1.png").set({ width: 3, height: 32 });
					this.__imgTopRightCorner = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tr.png").set({ width: 34, height: 35 });				
					this._add(this.__imgTopRightCorner, { right: 0, top: 0, bottom: 28 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_r.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { right: 0, top: 35, bottom: 29 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_br.png").set({ width: 5, height: 28, allowGrowY: true, scale: true }), { right: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_b.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { right: 5, bottom: 0, left: 5 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_bl.png").set({ width: 5, height: 29 }), { left: 0, bottom: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_l.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { left: 0, bottom: 29, top: 32 });
					this._add(this.wdgAnchor, { left: 0, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl2.png").set({ width: 25, height: 5 }), { left: 3, top: 0 });
					this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_t.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { left: 28, right: 34, top: 0 });
			
					this.__btnClose = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_close_button.png").set({ appearance: "button-close", width: 23, height: 23, toolTipText: this.tr("tnf:close base view") });
					this.__btnClose.addListener("execute", this._onClose, this);
					this._add(this.__btnClose, { top: 6, right: 5 });
					
					var onLoaded = function()
					{
						var counter = 0;
						var check = function()
						{
							if(counter > 60) return;
							var htmlDiv = document.getElementById('canvasContainer');
							(htmlDiv) ? htmlDiv.appendChild(cont) : setTimeout(check, 1000);
							console.log('retrying check for canvasContainer is loaded');
							counter++;
						};
						check();
					};
					onLoaded();
					
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('container creation completed');
			},
			destruct: function(){},
			members:
			{
				info: null,
				coordsField: null,
				panel: null,
				loader: null,
				canvas: null,
				mask: null,
				ctx: null,
				receivedData: null,
				allianceList: null,
				circles: [53, 85, 113, 145, 242],
				scale: 1,
				selectedBase: false,
				elements: [],
				locations: [],
				inProgress: false,
				isRadarVisible: false,
				__interval: null,
				__pointerX: null,
				__pointerY: null,
				__selectedA: null,
				__selectedB: null,
				__displayM: "all",
				__displayO: "both",
				__factor: null,
		
				__setInfo: function(base)
				{
					try
					{
		//				console.log(base);
						var info = this.info;
						info.removeAll();
						if(!base) return;
						for ( var i = 0; i < base.length; i++)
						{
							var title = new qx.ui.basic.Label(base[i][0]).set({font: 'font_size_13_bold', textColor: '#375773'});
							var value = new qx.ui.basic.Label(base[i][1]).set({font: 'font_size_11', textColor: '#333333', marginBottom: 5});
							info.add(title);
							info.add(value);
						}
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__createLayout: function()
				{
					var s = this.scale, circles = this.circles, ctx = this.ctx;
					for (var i = 0; i < circles.length; i++) {
						var r = circles[i];
						ctx.beginPath();
						ctx.arc(250, 250, r, 0, Math.PI * 2, true);
						ctx.lineWidth = (i == 4) ? 1/s : 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					for(var i = 0; i < 8; i++){
						var r = circles[4], a = (Math.PI * i / 4) - Math.PI / 8;
						ctx.beginPath();
						ctx.moveTo(250,250);
						ctx.lineTo((r * Math.cos(a)) + 250, (r * Math.sin(a)) + 250);
						ctx.lineWidth = 0.3/s;
						ctx.strokeStyle = '#8ce9ef';
						ctx.stroke();
						ctx.closePath();
					}
					
					var endGame = ccta_map.getInstance().__endGame, hubs = endGame.hubs, fortress = endGame.fortress;
					var fortressX = fortress[0];
					var fortressY = fortress[1];
					
					var grd = ctx.createLinearGradient(fortressX, fortressY - 0.5, fortressX, fortressY + 0.5);
						grd.addColorStop(0, 'rgba(200, 228, 228, 0.5)');
						grd.addColorStop(1, 'rgba(170, 214, 118, 0.5)');
					ctx.beginPath();
					ctx.arc(fortressX - 0.2, fortressY - 0.2, 1, 0, Math.PI * 2, true);
					ctx.fillStyle = grd;
					ctx.lineWidth = 0.1;
					ctx.strokeStyle = '#a5fe6a';
					ctx.fill();
					ctx.stroke();	
					ctx.closePath();
						
					for(var i = 0; i < hubs.length; i++)
					{
						var c = 'rgba(200, 228, 228, 0.5)', d = 'rgba(170, 214, 118, 0.5)', l = 1.3, b = 0.1;
						var x = hubs[i][0];
						var y = hubs[i][1];
						var grd = ctx.createLinearGradient(x, y, x, y+l);
							grd.addColorStop(0, c);
							grd.addColorStop(1, d);
						ctx.beginPath();
						ctx.rect(x-b, y-b, l, l);
						ctx.fillStyle = grd;
						ctx.fill();
						ctx.strokeStyle = '#a5fe6a';
						ctx.lineWidth = b;
						ctx.stroke();
						ctx.closePath();
					}
					
				},
				
				__createAlliance: function(name, data, type, color)
				{
					try
					{
						this.inProgress = true;
						var colors = {
							"bases": {"alliance":[["#86d3fb","#75b7d9"]], "owner":[["#ffc48b","#d5a677"]], "enemy":[["#ff8e8b","#dc7a78"],['#e25050','#cc2d2d'],['#93b7f8','#527ef2'],['#d389aa','#b14e69']], "nap":[["#ffffff","#cccccc"]], "selected":[["#ffe50e", "#d7c109"]], "ally":[["#6ce272", "#5fc664"],['#d4e17e','#b3ca47'],['#92f8f2','#52f2e8'],['#1cba1c','#108510']]},
							"pois": [["#add2a8","#6db064"], ["#75b9da","#4282bd"], ["#abd2d6","#6bafb7"], ["#e2e0b7","#ccc880"], ["#e5c998","#d09e53"], ["#d4a297","#b35a54"], ["#afa3b1","#755f79"]]
						};
						
						var owner = ClientLib.Data.MainData.GetInstance().get_Player().name, ctx = this.ctx, factor = this.__factor;
						var dop = this.__displayO, dmd = this.__displayM, root = this, s = this.scale;
						
						var r = (s < 3) ? 0.65 : (s > 3) ? 0.35 : 0.5;
						
						var createBase = function (x, y, bt, clr) 
						{
							var c = colors.bases[bt][clr][0], d = colors.bases[bt][clr][1];
							var grd=ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.arc(x, y, r, 0, Math.PI * 2, true);
							ctx.closePath();
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.lineWidth = 0.1;
							ctx.strokeStyle = '#000000';
							ctx.stroke();
							ctx.closePath();
						};
						
						var createPoi = function(x, y, t) 
						{
							var c = colors.pois[t][0], d = colors.pois[t][1];
							var grd = ctx.createLinearGradient(x, y-r, x, y+r);
								grd.addColorStop(0, c);
								grd.addColorStop(1, d);
							ctx.beginPath();
							ctx.rect(x-r, y-r, r*2, r*2);
							ctx.fillStyle = grd;
							ctx.fill();
							ctx.strokeStyle = "#000000";
							ctx.lineWidth = 0.1;
							ctx.stroke();
							ctx.closePath();
						};
						
						if (dop != "pois")
						{
							for (var player in data.players) {
								for (var i = 0; i < data.players[player].bases.length; i++){
									var b = data.players[player].bases[i], pid = data.players[player].id;
									if(dmd == "bases")
									{
										if (player == owner)
										{
											this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
											this.locations.push([b[0]/factor, b[1]/factor]);
											createBase(b[0], b[1], 'owner', 0);
										}
									}
									else
									{
										this.elements.push({"x":b[0],"y":b[1],"an":name,"pn":player,"bn":b[2],"bi":b[3],"ai":data.id,"pi":pid,"type":"base"});
										this.locations.push([b[0]/factor, b[1]/factor]);
										(player == owner) ? createBase(b[0], b[1], 'owner', 0) : createBase(b[0], b[1], type, color);
									}
								}
							}
						}
						
						if (dop != "bases")
						{
							for (var i = 0; i < data.pois.length; i++){
								var x = data.pois[i].x, y = data.pois[i].y, t = data.pois[i].t, l = data.pois[i].l;
								createPoi(x, y, t - 2);
								this.elements.push({"x": x, "y": y, "an": name, "ai": data.id, "t": t, "l": l});
								this.locations.push([x/factor, y/factor]);
							}
						}
						this.inProgress = false;
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__draggable: function(mask)
				{
					try
					{
						var start, end, initCoords = [], selectedBase = false, root = this, canvas = this.canvas, c = 0;
						var factor = root.__factor;				
						
						var displayBaseInfo = function()
						{
							try
							{
								if (!selectedBase || root.inProgress) return;
								var base = [];
								var pois = ['Tiberium', 'Crystal', 'Reactor', 'Tungesten', 'Uranium', 'Aircraft Guidance', 'Resonater'];
								for ( var i in selectedBase)
								{
									var txt = "", val = "";
									switch(i)
									{
										case "an": txt = "Alliance: "; val = selectedBase[i]; break;
										case "bn": txt = "Base    : "; val = selectedBase[i]; break;
										case "pn": txt = "Player  : "; val = selectedBase[i]; break;
										case "l" : txt = "Level   : "; val = selectedBase[i]; break;
										case "t" : txt = "Type    : "; val = pois[selectedBase[i] - 2]; break;
										default  : txt = false;
									}
									if(txt)
									{
										base.push([txt, val]);
									}
									root.__setInfo(base);
								}
							}
							catch(e)
							{
								console.log(e.toString());
							}
						};
						
						var onMapHover = function(event)
						{
							var loc = root.locations, elements = root.elements, coordsField = root.coordsField;
							var getCoords = function()
							{
								var canvasRect = canvas.getBoundingClientRect();
								var x = (event.pageX - canvasRect.left), y = (event.pageY - canvasRect.top);
								return [x, y];
							};
							
							var coords = getCoords();
							var x = coords[0] + canvas.offsetLeft, y = coords[1] + canvas.offsetTop;
		
							if(Math.sqrt(Math.pow(x - 250, 2) + Math.pow(y - 250, 2)) > 242)
							{
								coordsField.setValue("");
								return;
							}
							
							x = Math.round(coords[0] / (root.scale * factor)); root.__pointerX = x;
							y = Math.round(coords[1] / (root.scale * factor)); root.__pointerY = y;
							
							coordsField.setValue(x + ":" + y);
							
							if (root.scale < 2 || root.inProgress) return;
		
							for(var i = 0; i < loc.length; i++)
							{
								var elmX = loc[i][0], elmY = loc[i][1];
								if ((x == elmX) && (y == elmY)) 
								{
									selectedBase = elements[i];
									displayBaseInfo();
									break;
								}
								else
								{
									selectedBase = false;
									root.__setInfo(false);
								}
							}
						};
						
						var onMapDrag = function(event)
						{
							if (root.scale == 1 || root.inProgress) return;
							var cx = canvas.offsetLeft, cy = canvas.offsetTop, mx = event.pageX, my = event.pageY;
							var newX = cx + mx - initCoords[0], newY = cy + my - initCoords[1];
							initCoords[0] = mx;
							initCoords[1] = my;
							canvas.style.top = newY + 'px';
							canvas.style.left = newX + 'px';
						};
						
						var onMapWheel = function(event)
						{
							if (root.inProgress) return;
							var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
							if((delta < 0 && root.scale <= 1) || (delta > 0 && root.scale >= 12)) return;
							c += delta;
							var str = ( Math.abs(c) % 3 == 0 ) ? ((delta < 0) ? 'down' : 'up') : false;
							if(str) root.__scaleMap(str);
						};
						
						var onMapDown = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							initCoords = [x,y];
							start = t.getTime();
							mask.removeEventListener('mousemove', onMapHover, false);
							mask.addEventListener('mousemove', onMapDrag, false);
						};
						
						var onMapUp = function(event){
							var x = event.pageX, y = event.pageY, t = new Date();
							end = t.getTime();
							initCoords = [x,y];
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
							if (end - start < 150) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(root.__pointerX, root.__pointerY);
						};
						
						var onMapOut = function(event){
							mask.removeEventListener('mousemove', onMapDrag, false);
							mask.addEventListener('mousemove', onMapHover, false); 
						};
						
						mask.addEventListener('mouseup', onMapUp, false);
						mask.addEventListener('mousedown', onMapDown, false);
						mask.addEventListener('mousemove', onMapHover, false); 
						mask.addEventListener('mouseout', onMapOut, false);
						mask.addEventListener('mousewheel', onMapWheel, false);
						mask.addEventListener('DOMMouseScroll', onMapWheel, false);
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				__startRadarScan: function()
				{
					this.isRadarVisible = true;
					var FRAMES_PER_CYCLE = 20, FRAMERATE = 20, RINGS = 6;
					var canvas = this.canvas, ctx = this.ctx, canvassize = 400, animationframe = 0, root = this;
					var ringsize = canvassize / (2 * RINGS + 1);
					var radiusmax = ringsize / 2 + ringsize + (RINGS - 1) * ringsize;
				
					function animateRadarFrame() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						root.__createLayout();
						var radius, alpha;
						for (var ringno = 0; ringno < RINGS; ringno++)
						{
							radius = ringsize / 2 + (animationframe / FRAMES_PER_CYCLE) * ringsize + ringno * ringsize;
							alpha = (radiusmax - radius) / radiusmax;
							ctx.beginPath();
							ctx.fillStyle = "rgba(92,178,112," + alpha + ")";
							ctx.arc(250, 250, radius, 0, 2 * Math.PI, false);
							ctx.fill();
							ctx.closePath();
						}
				
						ctx.beginPath();
						ctx.fillStyle = "rgb(100,194,122)";
						ctx.arc(250, 250, ringsize / 2, 0, 2 * Math.PI, false);
						ctx.fill();
						ctx.closePath();
				
						animationframe = (animationframe >= (FRAMES_PER_CYCLE - 1)) ?  0 :  animationframe + 1;
					}
					this.__interval = setInterval(animateRadarFrame, 1000 / FRAMERATE);
				},
				
				__stopRadarScan: function()
				{
					if(!this.isRadarVisible) return;
					clearInterval(this.__interval);
					this.isRadarVisible = false;
					this.__enablePanel();
				},
				
				__disablePanel: function()
				{
					this.inProgress = true;
					for (var i = 0; i < this.panel.length; i++) this.panel[i].setEnabled(false);
				},
				
				__enablePanel: function()
				{
					for (var i = 0; i < this.panel.length; i++) if(i>1) this.panel[i].setEnabled(true);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0, 0, width, height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var dm = this.__displayM;
					this.__selectedA = null;
					this.allianceList.removeAll();
					var d = this.receivedData, root = this;
					var colors = {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]};
					for (var i = 0; i < d.length; i++)
					{
						var name = d[i][0].name, type = d[i][1], aid = d[i][0].id, clr = d[i][2];
						if((dm == "all") || (dm == "selected"))
						{
							var color = colors[type][clr];
							var li = new qx.ui.form.ListItem(name, root.__createIcon(color, 10, 10), aid);
							var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
							li.setToolTip(tooltip);
							this.allianceList.add(li);
						}
						else
						{
							if(type == "alliance")
							{
								var li = new qx.ui.form.ListItem(name, null, aid);
								var tooltip = new qx.ui.tooltip.ToolTip(name + " - " + type, root.__createIcon(color, 15, 15));
								li.setToolTip(tooltip);
								this.allianceList.add(li);
								break;
							}
						}
					}
				},
				
				drawCanvas: function()
				{
					var dmd = this.__displayM, b = this.receivedData, list = this.allianceList;
					var selected = (this.__selectedA != null && typeof this.__selectedA == 'number') ? this.__selectedA : false;
					var mask = this.mask, n = this.scale, canvas = this.canvas, ctx = this.ctx;
					
					this.elements = [];
					this.locations = [];
					this.__stopRadarScan();
					canvas.width = n * 500;
					canvas.height = n * 500;
					ctx = canvas.getContext("2d");
					ctx.scale(n, n);
					
					this.__createLayout();
					
					for (var i = 0; i < b.length; i++)
					{
						var name = b[i][0].name, data = b[i][0], type = b[i][1], aid = b[i][0].id, color = b[i][2];
						if(((dmd == "alliance") || (dmd == "bases")) && (type == "alliance"))
						{
							this.__createAlliance(name, data, type, 0);
							break;
						}
						if(dmd == "all")
						{
							if(selected && (aid == selected))
							{
								type = 'selected';
								color = 0;
							}
							this.__createAlliance(name, data, type, color);
						}
						if((dmd == "selected") && selected && (aid == selected))
						{
								this.__createAlliance(name, data, type, color);
								break;
						}
					}
				},
					
				__scaleMap: function(str)
				{
					try
					{
						var newScale = (str == 'up') ? this.scale + 2 : this.scale - 2;
						if (newScale > 12 || newScale < 1 || this.inProgress) return;
						var canvas = this.canvas, ctx = this.ctx;
						var x = ((canvas.offsetLeft - 250) * newScale/this.scale) + 250,
							y = ((canvas.offsetTop - 250) * newScale/this.scale) + 250;
							
						this.scale = newScale;
						switch (this.scale)
						{
							case 1: this.zoomOut.setEnabled(false); this.zoomReset.setEnabled(false); this.zoomIn.setEnabled(true); break
							case 11: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(false); break
							default: this.zoomOut.setEnabled(true); this.zoomReset.setEnabled(true); this.zoomIn.setEnabled(true); break
						}
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						this.drawCanvas();
						canvas.style.left = newScale == 1 ? 0 : x + 'px';
						canvas.style.top = newScale == 1 ? 0 : y + 'px';
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				resetMap: function()
				{
					var canvas = this.canvas, ctx = this.ctx;
					this.scale = 1;
					canvas.width = 500; canvas.height = 500; canvas.style.left = 0; canvas.style.top = 0;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					this.__disablePanel();
					this.__startRadarScan();
				},
				
				open: function(faction)
				{
					
					var app = qx.core.Init.getApplication();
					var mainOverlay = app.getMainOverlay();
				   
					this.setWidth(mainOverlay.getWidth());
					this.setMaxWidth(mainOverlay.getMaxWidth());
					this.setHeight(mainOverlay.getHeight());
					this.setMaxHeight(mainOverlay.getMaxHeight());
					
					app.getDesktop().add(this, { left: mainOverlay.getBounds().left, top: mainOverlay.getBounds().top });
				},
				
				_onClose: function()
				{
					var opt = ccta_map.options.getInstance();
					var app = qx.core.Init.getApplication();
					app.getDesktop().remove(this);
					if(opt.isSeeable()) opt.close();
				},
				
				_onResize: function()
				{
					var windowWidth = window.innerWidth - 10;
					var width = this.getWidth();
					var offsetLeft = (windowWidth - width) / 2;
					
					this.setDomLeft(offsetLeft);
					
					var opt = ccta_map.options.getInstance();
					if (opt.isSeeable()) opt.setDomLeft(offsetLeft + width + 5);
				}
				
			}
		});
			
		qx.Class.define('ccta_map.options',
		{
			type: 'singleton',
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				try
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(10));
					this.set({
						width: 200,
						height: 500,
						showMinimize: false,
						showMaximize: false,
						alwaysOnTop: true,
						caption: 'Edit Alliances'
					});
					
					this.__getAlliances();
					
					var root = this;
									
					var searchBox = new qx.ui.form.TextField().set({ placeholder: 'Search...'});
					var list = new qx.ui.form.List().set({ height: 80 });
					var editList = new qx.ui.form.List().set({ height: 160, selectionMode: 'additive' });
						
					var radioButtons = [['Enemy', 'enemy'],['Ally', 'ally'],['NAP', 'nap']];
					var radioGroup = new qx.ui.form.RadioButtonGroup().set({ layout: new qx.ui.layout.HBox(10), textColor: '#aaaaaa' });
						for (var i = 0; i < radioButtons.length; i++)
						{
							var radioButton = new qx.ui.form.RadioButton(radioButtons[i][0]);
								radioButton.setModel(radioButtons[i][1]);
							radioGroup.add(radioButton);
						}
					
					var colors = root.__colors;
					var colorSelectBox = new qx.ui.form.SelectBox().set({ height: 28 });
					var addColors = function(type)
					{
						colorSelectBox.removeAll();
						for (var i = 0; i < colors[type].length; i++)
						{
							var src = root.__createIcon(colors[type][i], 60, 15);
							var listItem = new qx.ui.form.ListItem(null, src, i);
							colorSelectBox.add(listItem);
						}
					};
					addColors('enemy');
						
					var addButton = new qx.ui.form.Button('Add').set({ enabled: false, width: 85, toolTipText: 'Maximum allowed number of alliances is 8.' });;
					var removeButton = new qx.ui.form.Button('Remove').set({ enabled: false, width: 85 });;
					var applyButton = new qx.ui.form.Button('Apply').set({ enabled: false });;
					var defaultsButton = new qx.ui.form.Button('Defaults').set({ enabled: false, width: 85 });;
					var saveButton = new qx.ui.form.Button('Save').set({ enabled: false, width: 85 });;
					
					var hbox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					var hbox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10))
					
					hbox1.add(addButton);
					hbox1.add(removeButton);
					
					hbox2.add(saveButton);
					hbox2.add(defaultsButton);
						
					this.searchBox      = searchBox;
					this.list           = list;
					this.editList       = editList;
					this.radioGroup     = radioGroup;
					this.colorSelectBox = colorSelectBox;
					this.addButton      = addButton;
					this.removeButton   = removeButton;
					this.saveButton     = saveButton;
					this.defaultsButton = defaultsButton;
					this.applyButton    = applyButton;
					
					this.add(searchBox);
					this.add(list);
					this.add(editList);
					this.add(radioGroup);
					this.add(colorSelectBox);
					this.add(hbox1);
					this.add(hbox2);
					this.add(applyButton);
					
					this.addListener('appear', function()
					{
						var cont = ccta_map.container.getInstance()
						var bounds = cont.getBounds(), left = bounds.left, top = bounds.top, width = bounds.width, height = bounds.height;
						searchBox.setValue('');
						list.removeAll();
						addButton.setEnabled(false);
						removeButton.setEnabled(false);
						applyButton.setEnabled(false);
						radioGroup.setSelection([ radioGroup.getSelectables()[0] ]);
						colorSelectBox.setSelection([ colorSelectBox.getSelectables()[0] ]);
						this.__updateList();
						this.__checkDefaults();
						this.__checkSavedSettings();
						this.setUserBounds(left + width + 5, top, 200, height);
					}, this);
					
					searchBox.addListener('keyup', this.__searchAlliances, this);
					
					radioGroup.addListener('changeSelection', function(e)
					{
						if(e.getData()[0]) addColors(e.getData()[0].getModel());
					}, this);
					
					list.addListener('changeSelection', function(e)
					{
						if (!e.getData()[0]) return;
						var items = this.__items, aid = e.getData()[0].getModel();
						(((items != null) && (items.indexOf(aid) > -1)) || (items.length > 8)) ? addButton.setEnabled(false) : addButton.setEnabled(true);
					}, this);
					
					editList.addListener('changeSelection', function(e)
					{
						(e.getData()[0]) ? removeButton.setEnabled(true) : removeButton.setEnabled(false);
					}, this);
					
					addButton.addListener('execute', function()
					{
						var aid = list.getSelection()[0].getModel(), 
							name = list.getSelection()[0].getLabel(),
							type = radioGroup.getSelection()[0].getModel(), 
							color = colorSelectBox.getSelection()[0].getModel();
						
						var li = new qx.ui.form.ListItem(name + " - " + type, root.__createIcon(colors[type][color], 15, 15), {'aid': aid, 'type': type, 'name': name, 'color': color});
						editList.add(li);
						list.resetSelection();
						addButton.setEnabled(false);
						root.__updateItems();
					}, this);
					
					removeButton.addListener('execute', function()
					{
						var selection = (editList.isSelectionEmpty()) ? null : editList.getSelection();
						var ownAlliance = ccta_map.getInstance().__allianceName;
						if(selection != null)
						{
							for(var i = selection.length - 1; i > -1; i--) if(selection[i].getModel().name != ownAlliance) editList.remove(selection[i]);
							root.__updateItems();
							editList.resetSelection();
						}
					}, this);
					
					applyButton.addListener('execute', this.__applyChanges, this);
					defaultsButton.addListener('execute', this.__setDefaults, this);
					saveButton.addListener('execute', this.__saveSettings, this);
		
				}
				catch(e)
				{
					console.log(e.toString());
				}
				console.log('Options Panel creation completed');
			},
			destruct: function()
			{
				
			},
			members:
			{
				__data: null,
				searchBox: null,
				list: null,
				editList: null,
				radioGroup: null,
				colorSelectBox: null,
				addButton: null,
				removeButton: null,
				saveButton: null,
				applyButton: null,
				defaultsButton: null,
				__items: null,
				__colors: {"enemy":["#ff807d", "#a93939", "#739bf5", "#c26b89"], "ally": ["#3bbe5d", "#c4d663", "#73f5ed", "#169f16"], "nap": ["#ffffff"], "selected": ["#ffe50e"], "alliance": ["#75b7d9"], "owner": ["#ffc48b"]},
		
				
				__getAlliances: function()
				{
					var root = this;
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData", 
					{firstIndex: 0, lastIndex: 3000, ascending: true, view: 1, rankingType: 0, sortColumn: 2}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if(data.a != null)
						{
							var arr = [];
							for( var i = 0; i < data.a.length; i++) arr[i] = [data.a[i].an, data.a[i].a];
							root.__data = arr;
						}
						
					}), null);
				},
				
				__createIcon: function(color, width, height)
				{
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
				
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.rect(0,0,width,height);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.closePath();
				
					var data = canvas.toDataURL("image/png");
					return data;
				},
				
				__updateList: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this;
					var alliancesList = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var colors = this.__colors;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
				},
				
				__setDefaults: function()
				{
					var map = ccta_map.getInstance();
					var selectedItems = [], list = this.editList, root = this, colors = this.__colors;
					var alliancesList = map.__defaultAlliances;
					list.removeAll();
					
					alliancesList.map(function(a)
					{
						var aid = a[0], at = a[1], an  = a[2], c = a[3];
						var li = new qx.ui.form.ListItem(an + " - " + at, root.__createIcon(colors[at][c], 15, 15), {'aid': aid, 'type': at, 'name': an, 'color': c});
						list.add(li);
						selectedItems.push(aid);
					});
					this.__items = selectedItems;
					this.__currentListModified();
					this.defaultsButton.setEnabled(false);
				},
				
				__searchAlliances: function()
				{
					var str = this.searchBox.getValue(), data = this.__data, list = this.list;
					list.removeAll();
					if (!data || (str == '')) return;
					
					data.map(function(x)
					{
						var patt = new RegExp("^" + str + ".+$", "i");
						var test = patt.test(x[0]);
						
						if(test)
						{
							var listItem = new qx.ui.form.ListItem(x[0], null, x[1]);
							list.add(listItem);
						}
					});
				},
				
				__updateItems: function()
				{
					var items = [], listItems = this.editList.getSelectables();
					for (var i = 0; i < listItems.length; i++) items.push(listItems[i].getModel().aid);
					this.__items = items;
					this.__checkSavedSettings();
					this.__currentListModified();
				},
				
				__applyChanges: function()
				{
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					ccta_map.getInstance().__selectedAlliances = selectedAlliances;
					ccta_map.container.getInstance().resetMap();
					ccta_map.getInstance().getData();
					this.close();
				},
				
				__saveSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					
					var selectedAlliances = [], listItems = this.editList.getSelectables();
					for(var i = 0; i < listItems.length; i++)
					{
						var model = listItems[i].getModel(), aid = model.aid, type = model.type, name = model.name, color = model.color;
						selectedAlliances.push([aid, type, name, color]);
					}
					
					(!localStorage.ccta_map_settings) ? localStorage['ccta_map_settings'] = JSON.stringify(selectedAlliances) : localStorage.ccta_map_settings = JSON.stringify(selectedAlliances);
					this.saveButton.setEnabled(false);
		//			console.log(localStorage.ccta_map_settings);
				},
				
				__checkSavedSettings: function()
				{
					if(typeof(Storage) === 'undefined') return;
					var original = (localStorage.ccta_map_settings) ? JSON.parse(localStorage.ccta_map_settings) : null;
					var items = this.__items;
					var changed = false;
					
					if ((items != null) && (original != null) && (items.length != original.length)) changed = true;
					if ((items != null) && (original != null) && (items.length == original.length))
					{
						original.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					((items.length > 0) && ((original === null) || changed)) ? this.saveButton.setEnabled(true) : this.saveButton.setEnabled(false);
				},
				
				__checkDefaults: function()
				{
					var defaults = ccta_map.getInstance().__defaultAlliances, items = this.__items, changed = false;
					if(!defaults) return;
					if ((items != null) && (defaults != null) && (items.length != defaults.length)) changed = true;
					if ((items != null) && (defaults != null) && (items.length == defaults.length))
					{
						defaults.map(function(x)
						{
							if (items.indexOf(x[0]) < 0) changed = true;
						});
					}
					(changed) ? this.defaultsButton.setEnabled(true) : this.defaultsButton.setEnabled(false);
				},
				
				__currentListModified: function()
				{
					var map = ccta_map.getInstance(), current = (map.__selectedAlliances == null) ? map.__defaultAlliances : map.__selectedAlliances;
					var items = this.__items, changed = false;
					
					current.map(function(x)
					{
						if(items.indexOf(x[0]) < 0) changed = true;
					});
					((items.length > 0) && ((items.length != current.length) || (changed == true))) ? this.applyButton.setEnabled(true) : this.applyButton.setEnabled(false);
				}
				
			}
		});
	}
	
	var cctaMapLoader = function()
	{
		var qx = window["qx"];
		var ClientLib = window["ClientLib"];
		var webfrontend = window["webfrontend"];
		
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(cctaMapLoader, 1000);
			console.log('retrying....');
		}
		else
		{
			create_ccta_map_class();
			ccta_map.getInstance();
		}
	};
	window.setTimeout(cctaMapLoader, 10000);

})();


/***********************************************************************************
C&C:Tiberium Alliances Maelstrom Tools - Version: 0.1.3.2					140991
***********************************************************************************/
// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.3.2
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();


/***********************************************************************************
C&C:Tiberium Alliances Maelstrom ADDON Basescanner: 1.8.4					145168
***********************************************************************************/
// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.4
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @updateURL   https://userscripts.org/scripts/source/145168.meta.js
// @downloadURL https://userscripts.org/scripts/source/145168.user.js
// ==/UserScript==
(function () {
	var MaelstromTools_Basescanner = function () {
		window.__msbs_version = "1.8.4";
		function createMaelstromTools_Basescanner() {

			qx.Class.define("Addons.BaseScannerGUI", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerGUI " + window.__msbs_version);
						this.T = Addons.Language.getInstance();
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(true);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(true);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(5);
						this.setLayout(new qx.ui.layout.VBox(3));
						this.stats.src = 'http://goo.gl/DrJ2x'; //1.5

						this.FI();
						this.FH();
						this.FD();
						if (this.ZE == null) {
							this.ZE = [];
						}
						this.setPadding(0);
						this.removeAll();

						this.add(this.ZF);
						this.add(this.ZN);

						this.add(this.ZP);
						this.ZL.setData(this.ZE);							

					} catch (e) {
						console.debug("Addons.BaseScannerGUI.construct: ", e);
					}
				},
				members : {
					// pictures
					stats : document.createElement('img'),
					T : null,
					ZA : 0,
					ZB : null,
					ZC : null,
					ZD : null,
					ZE : null,
					ZF : null,
					ZG : null,
					ZH : false,
					ZI : true,
					ZJ : null,
					ZK : null,
					ZL : null,
					ZM : null,
					ZN : null,
					ZO : null,
					ZP : null,
					ZQ : null,
					ZR : [],
					ZT : true,
					ZU : null,
					ZV : null,
					ZX : null,
					ZY : null,
					ZZ : [],
					ZS : {},
					YZ : null,
					YY : null,
					
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								MT_Cache.updateCityCache();
								MT_Cache = window.MaelstromTools.Cache.getInstance();
								var cname;								
								this.ZC.removeAll();
								for (cname in MT_Cache.Cities) {
									var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
									this.ZC.add(item);
									if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
										this.ZC.setSelection([item]);
									}
								}							
								this.open();
								this.moveTo(100, 100);
							}
						} catch (e) {
							console.log("MaelstromTools.DefaultObject.openWindow: ", e);
						}
					},
					FI : function () {
						try {
							this.ZL = new qx.ui.table.model.Simple();
							this.ZL.setColumns(["ID", "LoadState", this.T.get("City"), this.T.get("Location"), this.T.get("Level"), this.T.get("Tiberium"), this.T.get("Crystal"), this.T.get("Dollar"), this.T.get("Research"), "Crystalfields", "Tiberiumfields", this.T.get("Building state"), this.T.get("Defense state"), this.T.get("CP"), "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP", "CY", "DF", this.T.get("base set up at")]);
							this.YY = ClientLib.Data.MainData.GetInstance().get_Player();
							this.ZN = new qx.ui.table.Table(this.ZL);
							this.ZN.setColumnVisibilityButtonVisible(false);
							this.ZN.setColumnWidth(0, 0);
							this.ZN.setColumnWidth(1, 0);
							this.ZN.setColumnWidth(2, Addons.LocalStorage.getserver("Basescanner_ColWidth_2", 120));
							this.ZN.setColumnWidth(3, Addons.LocalStorage.getserver("Basescanner_ColWidth_3", 60));
							this.ZN.setColumnWidth(4, Addons.LocalStorage.getserver("Basescanner_ColWidth_4", 50));
							this.ZN.setColumnWidth(5, Addons.LocalStorage.getserver("Basescanner_ColWidth_5", 60));
							this.ZN.setColumnWidth(6, Addons.LocalStorage.getserver("Basescanner_ColWidth_6", 60));
							this.ZN.setColumnWidth(7, Addons.LocalStorage.getserver("Basescanner_ColWidth_7", 60));
							this.ZN.setColumnWidth(8, Addons.LocalStorage.getserver("Basescanner_ColWidth_8", 60));
							this.ZN.setColumnWidth(9, Addons.LocalStorage.getserver("Basescanner_ColWidth_9", 30));
							this.ZN.setColumnWidth(10, Addons.LocalStorage.getserver("Basescanner_ColWidth_10", 30));
							this.ZN.setColumnWidth(11, Addons.LocalStorage.getserver("Basescanner_ColWidth_11", 50));
							this.ZN.setColumnWidth(12, Addons.LocalStorage.getserver("Basescanner_ColWidth_12", 50));
							this.ZN.setColumnWidth(13, Addons.LocalStorage.getserver("Basescanner_ColWidth_13", 30));
							this.ZN.setColumnWidth(14, Addons.LocalStorage.getserver("Basescanner_ColWidth_14", 60));
							this.ZN.setColumnWidth(15, Addons.LocalStorage.getserver("Basescanner_ColWidth_15", 60));
							this.ZN.setColumnWidth(16, Addons.LocalStorage.getserver("Basescanner_ColWidth_16", 60));
							this.ZN.setColumnWidth(17, Addons.LocalStorage.getserver("Basescanner_ColWidth_17", 50));
							this.ZN.setColumnWidth(18, Addons.LocalStorage.getserver("Basescanner_ColWidth_18", 50));
							this.ZN.setColumnWidth(19, Addons.LocalStorage.getserver("Basescanner_ColWidth_19", 40));
							var c = 0;
							var tcm = this.ZN.getTableColumnModel();
							for (c = 0; c < this.ZL.getColumnCount(); c++) {
								if (c == 0 || c == 1 || c == 11 || c == 12) {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, false));
								} else {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, true));
								}
							}

							tcm.setColumnVisible(1, false);
							tcm.setHeaderCellRenderer(9, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Crystal]), "Crystalfields");
							tcm.setHeaderCellRenderer(10, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Tiberium], "Tiberiumfields"));
							tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(6, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(7, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(15, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(16, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(19, new qx.ui.table.cellrenderer.Boolean());

							this.ZN.addListener("cellDblclick", function (e) {
								Addons.BaseScannerGUI.getInstance().FB(e);
							}, this);
							tcm.addListener("widthChanged", function (e) {
								//console.log(e, e.getData());
								var col = e.getData().col;
								var width = e.getData().newWidth;
								Addons.LocalStorage.setserver("Basescanner_ColWidth_" + col, width);
							}, tcm);

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.FI: ", e);
						}
					},
					FB : function (e) {
						try {
							console.log("e",e.getRow(),this.ZE);
							var cityId = this.ZE[e.getRow()][0];
							var posData = this.ZE[e.getRow()][3];
							/* center screen */
							if (posData != null && posData.split(':').length == 2) {
								var posX = parseInt(posData.split(':')[0]);
								var posY = parseInt(posData.split(':')[1]);
								ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(posX, posY);
							}
							/* and highlight base */
							if (cityId && !(this.ZK[4].getValue())) {
								//ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityId);
								//webfrontend.gui.UtilView.openCityInMainWindow(cityId);
								//webfrontend.gui.UtilView.openVisModeInMainWindow(1, cityId, false);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, cityId, 0, 0);
							}

							var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							if (q != null)
								q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(cityId);

						} catch (ex) {
							console.debug("Addons.BaseScannerGUI FB error: ", ex);
						}
					},
					FN : function (e) {
						this.ZG.setLabel(this.T.get("Scan"));
						this.ZH = false;
					},
					CBChanged : function (e) {
						this.ZH = false;
					},
					FA : function (oValue) {
						var f = new qx.util.format.NumberFormat();
						f.setGroupingUsed(true);
						f.setMaximumFractionDigits(3);
						if (!isNaN(oValue)) {
							if (Math.abs(oValue) < 100000)
								oValue = f.format(Math.floor(oValue));
							else if (Math.abs(oValue) >= 100000 && Math.abs(oValue) < 1000000)
								oValue = f.format(Math.floor(oValue / 100) / 10) + "k";
							else if (Math.abs(oValue) >= 1000000 && Math.abs(oValue) < 10000000)
								oValue = f.format(Math.floor(oValue / 1000) / 1000) + "M";
							else if (Math.abs(oValue) >= 10000000 && Math.abs(oValue) < 100000000)
								oValue = f.format(Math.floor(oValue / 10000) / 100) + "M";
							else if (Math.abs(oValue) >= 100000000 && Math.abs(oValue) < 1000000000)
								oValue = f.format(Math.floor(oValue / 100000) / 10) + "M";
							else if (Math.abs(oValue) >= 1000000000 && Math.abs(oValue) < 10000000000)
								oValue = f.format(Math.floor(oValue / 1000000) / 1000) + "G";
							else if (Math.abs(oValue) >= 10000000000 && Math.abs(oValue) < 100000000000)
								oValue = f.format(Math.floor(oValue / 10000000) / 100) + "G";
							else if (Math.abs(oValue) >= 100000000000 && Math.abs(oValue) < 1000000000000)
								oValue = f.format(Math.floor(oValue / 100000000) / 10) + "G";
							else if (Math.abs(oValue) >= 1000000000000 && Math.abs(oValue) < 10000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000) / 1000) + "T";
							else if (Math.abs(oValue) >= 10000000000000 && Math.abs(oValue) < 100000000000000)
								oValue = f.format(Math.floor(oValue / 10000000000) / 100) + "T";
							else if (Math.abs(oValue) >= 100000000000000 && Math.abs(oValue) < 1000000000000000)
								oValue = f.format(Math.floor(oValue / 100000000000) / 10) + "T";
							else if (Math.abs(oValue) >= 1000000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000000)) + "T";
						};
						return oValue.toString();
					},
					// updateCache : function () {
					// try {}
					// catch (e) {
					// console.debug("Addons.BaseScannerGUI.updateCache: ", e);
					// }
					// },
					// setWidgetLabels : function () {
					// try {
					// if (!this.ZL) {
					// this.FC();
					// }
					// this.ZL.setData(this.ZE);
					// } catch (e) {
					// console.debug("Addons.BaseScannerGUI.setWidgetLabels: ", e);
					// }
					// },
					FH : function () {
						try {
							var oBox = new qx.ui.layout.Flow();
							var oOptions = new qx.ui.container.Composite(oBox);
							this.ZC = new qx.ui.form.SelectBox();
							this.ZC.setHeight(25);
							this.ZC.setMargin(5);
							MT_Cache.updateCityCache();
							MT_Cache = window.MaelstromTools.Cache.getInstance();
							var cname;							
							for (cname in MT_Cache.Cities) {
								var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
								this.ZC.add(item);
								if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
									this.ZC.setSelection([item]);
								}
							}
							this.ZC.addListener("changeSelection", function (e) {								
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZC);

							var l = new qx.ui.basic.Label().set({
									value : this.T.get("CP Limit"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(l);

							this.ZQ = new qx.ui.form.SelectBox();
							this.ZQ.setWidth(50);
							this.ZQ.setHeight(25);
							this.ZQ.setMargin(5);
							var limiter = Addons.LocalStorage.getserver("Basescanner_Cplimiter", 25);
							for (var m = 11; m < 41; m += 1) {
								item = new qx.ui.form.ListItem("" + m, null, m);
								this.ZQ.add(item);
								if (limiter == m) {
									this.ZQ.setSelection([item]);
								}
							}
							this.ZQ.addListener("changeSelection", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZQ);

							var la = new qx.ui.basic.Label().set({
									value : this.T.get("min Level"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(la);
							var minlevel = Addons.LocalStorage.getserver("Basescanner_minLevel", "1");
							this.ZY = new qx.ui.form.TextField(minlevel).set({
									width : 50
								});
							oOptions.add(this.ZY);

							this.ZK = [];
							this.ZK[0] = new qx.ui.form.CheckBox(this.T.get("Player"));
							this.ZK[0].setMargin(5);
							this.ZK[0].setTextColor("white");
							this.ZK[0].setValue(Addons.LocalStorage.getserver("Basescanner_Show0", false));
							this.ZK[0].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[0]);
							this.ZK[1] = new qx.ui.form.CheckBox(this.T.get("Bases"));
							this.ZK[1].setMargin(5);
							this.ZK[1].setTextColor("white");
							this.ZK[1].setValue(Addons.LocalStorage.getserver("Basescanner_Show1", false));
							this.ZK[1].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[1]);
							this.ZK[2] = new qx.ui.form.CheckBox(this.T.get("Outpost"));
							this.ZK[2].setMargin(5);
							this.ZK[2].setTextColor("white");
							this.ZK[2].setValue(Addons.LocalStorage.getserver("Basescanner_Show2", false));
							this.ZK[2].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[2]);
							this.ZK[3] = new qx.ui.form.CheckBox(this.T.get("Camp"));
							this.ZK[3].setMargin(5);
							this.ZK[3].setTextColor("white");
							this.ZK[3].setValue(Addons.LocalStorage.getserver("Basescanner_Show3", true));
							this.ZK[3].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[3], {
								lineBreak : true
							});

							this.ZG = new qx.ui.form.Button(this.T.get("Scan")).set({
									width : 100,
									minWidth : 100,
									maxWidth : 100,
									height : 25,
									margin : 5
								});
							this.ZG.addListener("execute", function () {

								this.FE();
							}, this);
							oOptions.add(this.ZG);

							var border = new qx.ui.decoration.Single(2, "solid", "blue");
							this.ZV = new qx.ui.container.Composite(new qx.ui.layout.Basic()).set({
									decorator : border,
									backgroundColor : "red",
									allowGrowX : false,
									height : 20,
									width : 200
								});
							this.ZU = new qx.ui.core.Widget().set({
									decorator : null,
									backgroundColor : "green",
									width : 0
								});
							this.ZV.add(this.ZU);
							this.ZX = new qx.ui.basic.Label("").set({
									decorator : null,
									textAlign : "center",
									width : 200
								});
							this.ZV.add(this.ZX, {
								left : 0,
								top : -3
							});
							oOptions.add(this.ZV);

							this.YZ = new qx.ui.form.Button(this.T.get("clear Cache")).set({
									minWidth : 100,
									height : 25,
									margin : 5
								});
							this.YZ.addListener("execute", function () {
								this.ZZ = [];
							}, this);
							oOptions.add(this.YZ);

							this.ZK[4] = new qx.ui.form.CheckBox(this.T.get("Only center on World"));
							this.ZK[4].setMargin(5);
							this.ZK[4].setTextColor("white");
							oOptions.add(this.ZK[4], {
								lineBreak : true
							});

							this.ZJ = new qx.ui.form.SelectBox();
							this.ZJ.setWidth(150);
							this.ZJ.setHeight(25);
							this.ZJ.setMargin(5);
							var item = new qx.ui.form.ListItem("7 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 5 " + this.T.get(MaelstromTools.Statics.Crystal), null, 7);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("6 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 6 " + this.T.get(MaelstromTools.Statics.Crystal), null, 6);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("5 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 7 " + this.T.get(MaelstromTools.Statics.Crystal), null, 5);
							this.ZJ.add(item);
							oOptions.add(this.ZJ);
							this.ZD = new qx.ui.form.Button(this.T.get("Get Layouts")).set({
									width : 120,
									minWidth : 120,
									maxWidth : 120,
									height : 25,
									margin : 5
								});
							this.ZD.addListener("execute", function () {
								var layout = window.Addons.BaseScannerLayout.getInstance();
								layout.openWindow(this.T.get("BaseScanner Layout"));
							}, this);
							this.ZD.setEnabled(false);
							oOptions.add(this.ZD);

							this.ZB = new qx.ui.container.Composite();
							this.ZB.setLayout(new qx.ui.layout.Flow());
							this.ZB.setWidth(750);
							//oOptions.add(this.ZB, {flex:1});

							var J = webfrontend.gui.layout.Loader.getInstance();
							//var L = J.getLayout("playerbar", this);
							//this._ZZ = J.getElement(L, "objid", 'lblplayer');


							//this.tableSettings = new qx.ui.groupbox.GroupBox("Visable Columns");
							//box.add(this.tableSettings, {flex:1});
							var k = 2;
							for (k = 2; k < this.ZL.getColumnCount(); k++) {
								var index = k - 2;

								this.ZR[index] = new qx.ui.form.CheckBox(this.ZL.getColumnName(k));
								this.ZR[index].setValue(this.ZN.getTableColumnModel().isColumnVisible(k));
								this.ZR[index].setTextColor("white");
								this.ZR[index].index = k;
								this.ZR[index].table = this.ZN;
								this.ZR[index].addListener("changeValue", function (e) {
									//console.log("click", e, e.getData(), this.index);
									var tcm = this.table.getTableColumnModel();
									tcm.setColumnVisible(this.index, e.getData());
									Addons.LocalStorage.setserver("Basescanner_Column_" + this.index, e.getData());
								});
								this.ZB.add(this.ZR[index]);
								//this.tableSettings.add( this.ZR[index] );
							}

							this.ZO = new qx.ui.form.Button("+").set({
									margin : 5
								});
							this.ZO.addListener("execute", function () {
								if (this.ZI) {
									oOptions.addAfter(this.ZB, this.ZO);
									this.ZO.setLabel("-");
								} else {
									oOptions.remove(this.ZB);
									this.ZO.setLabel("+");
								}
								this.ZI = !this.ZI;
							}, this);
							this.ZO.setAlignX("right");
							oOptions.add(this.ZO, {
								lineBreak : true
							});

							this.ZF = oOptions;

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.createOptions: ", e);
						}
					},
					FD : function () {
						//0.7
						//var n = ClientLib.Data.MainData.GetInstance().get_Cities();
						//var i = n.get_CurrentOwnCity();
						var st = '<a href="https://sites.google.com/site/blindmanxdonate" target="_blank">Support Development of BlinDManX Addons</a>';
						var l = new qx.ui.basic.Label().set({
								value : st,
								rich : true,
								width : 800
							});
						this.ZP = l;
					},
					FE : function () {
						var selectedBase = this.ZC.getSelection()[0].getModel();
						ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY()); //Load data of region
						ClientLib.Vis.VisMain.GetInstance().Update();
						ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(selectedBase.get_Id());

						if (this.ZT) {
							var obj = ClientLib.Data.WorldSector.WorldObjectCity.prototype;
							// var fa = foundfnkstring(obj['$ctor'], /=0;this\.(.{6})=g>>7&255;.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							var fa = foundfnkstring(obj['$ctor'], /this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							if (fa != null && fa[1].length == 6) {
								obj.getLevel = function () {
									return this[fa[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined");
							}
							if (fa != null && fa[2].length == 6) {
								obj.getID = function () {
									return this[fa[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype;
							//var fb = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							var fb = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							if (fb != null && fb[1].length == 6) {
								obj.getLevel = function () {
									return this[fb[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined");
							}
							if (fb != null && fb[2].length == 6) {
								obj.getID = function () {
									return this[fb[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype;
							//var fc = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 2);
							var fc = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 4);
							if (fc != null && fc[1].length == 6) {
								obj.getLevel = function () {
									return this[fc[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined");
							}
							if (fc != null && fc[2].length == 6) {
								obj.getCampType = function () {
									return this[fc[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined");
							}

							if (fc != null && fc[4].length == 6) {
								obj.getID = function () {
									return this[fc[4]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined");
							}
							this.ZT = false;
						}

						//Firstscan
						if (this.ZE == null) {
							this.ZH = false;
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							return;
						}
						//After Pause
						var c = 0;
						for (i = 0; i < this.ZE.length; i++) {
							if (this.ZE[i][1] == -1) {
								c++;
							}
						}

						if (!this.ZH) {
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							if (c > 0) {
								this.ZH = true;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 1000);
								return;
							} else {
								this.ZH = false;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							}
						} else {
							this.ZH = false;
							this.ZG.setLabel(this.T.get("Scan"));
						}

					},
					FP : function (value, max, maxwidth) {
						if (this.ZU != null && this.ZX != null) {
							this.ZU.setWidth(parseInt(value / max * maxwidth, 10));
							this.ZX.setValue(value + "/" + max);
						}
					},
					FJ : function () {
						try {
							this.ZM = {};
							this.ZE = [];
							var selectedBase = this.ZC.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_LastCityID", selectedBase.get_Id());
							var ZQ = this.ZQ.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_Cplimiter", ZQ);
							Addons.LocalStorage.setserver("Basescanner_minLevel", this.ZY.getValue());

							var c1 = this.ZK[0].getValue();
							var c2 = this.ZK[1].getValue();
							var c3 = this.ZK[2].getValue();
							var c4 = this.ZK[3].getValue();
							var c5 = parseInt(this.ZY.getValue(), 10);
							//console.log("Select", c1, c2, c3,c4,c5);
							Addons.LocalStorage.setserver("Basescanner_Show0", c1);
							Addons.LocalStorage.setserver("Basescanner_Show1", c2);
							Addons.LocalStorage.setserver("Basescanner_Show2", c3);
							Addons.LocalStorage.setserver("Basescanner_Show3", c4);
							var posX = selectedBase.get_PosX();
							var posY = selectedBase.get_PosY();
							var scanX = 0;
							var scanY = 0;
							var world = ClientLib.Data.MainData.GetInstance().get_World();
							console.info("Scanning from: " + selectedBase.get_Name());

							// world.CheckAttackBase (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							// world.CheckAttackBaseRegion (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							var t1 = true;
							var t2 = true;
							var t3 = true;

							var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
							for (scanY = posY - Math.floor(maxAttackDistance + 1); scanY <= posY + Math.floor(maxAttackDistance + 1); scanY++) {
								for (scanX = posX - Math.floor(maxAttackDistance + 1); scanX <= posX + Math.floor(maxAttackDistance + 1); scanX++) {
									var distX = Math.abs(posX - scanX);
									var distY = Math.abs(posY - scanY);
									var distance = Math.sqrt((distX * distX) + (distY * distY));
									if (distance <= maxAttackDistance) {
										var object = world.GetObjectFromPosition(scanX, scanY);
										var loot = {};
										if (object) {
											//console.log(object);

											if (object.Type == 1 && t1) {
												//console.log("object typ 1");
												//objfnkstrON(object);
												//t1 = !t1;
											}
											if (object.Type == 2 && t2) {
												//console.log("object typ 2");
												//objfnkstrON(object);
												//t2 = !t2;
											}

											if (object.Type == 3 && t3) {

												//console.log("object typ 3");
												//objfnkstrON(object);
												//t3 = !t3;
											}

											if (object.Type == 3) {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													//console.log(object);
												}
											}

											//if(object.ConditionBuildings>0){
											var needcp = selectedBase.CalculateAttackCommandPointCostToCoord(scanX, scanY);
											if (needcp <= ZQ && typeof object.getLevel == 'function') {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													// 0:ID , 1:Scanned, 2:Name, 3:Location, 4:Level, 5:Tib, 6:Kristal, 7:Credits, 8:Forschung, 9:Kristalfelder, 10:Tiberiumfelder,
													// 11:ConditionBuildings,12:ConditionDefense,13: CP pro Angriff , 14: defhp/offhp , 15:sum tib,krist,credits, 16: sum/cp
													var d = this.FL(object.getID(), 0);
													var e = this.FL(object.getID(), 1);
													if (e != null) {
														this.ZM[object.getID()] = e;
													}

													if (object.Type == 1 && c1) { //User
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Player"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 2 && c2) { //basen
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Bases"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 3 && (c3 || c4)) { //Lager Vposten
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push(d);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push(d);
															}

														} else {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Camp"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Outpost"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
														}
													}
												}
											}
											//}
										}
									}
								}
							}
							this.ZH = true;
							this.ZL.setData(this.ZE);
							this.FP(0, this.ZE.length, 200);
							this.ZL.sortByColumn(4, false); //Sort form Highlevel to Lowlevel
							if (this.YY.name != "DR01D")
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 50);
						} catch (ex) {
							console.debug("Maelstrom_Basescanner FJ error: ", ex);
						}
					},
					FG : function () {
						try {
							var retry = false;
							var loops = 0;
							var maxLoops = 10;
							var i = 0;
							var sleeptime = 150;
							while (!retry) {
								var ncity = null;
								var selectedid = 0;
								var id = 0;
								if (this.ZE == null) {
									console.warn("data null: ");
									this.ZH = false;
									break;
								}
								for (i = 0; i < this.ZE.length; i++) {
									// 1= "LoadState"
									if (this.ZE[i][1] == -1) {
										break;
									}
								}

								if (i == this.ZE.length) {
									this.ZH = false;
								}
								this.FP(i, this.ZE.length, 200); //Progressbar
								if (this.ZE[i] == null) {
									console.warn("data[i] null: ");
									this.ZH = false;
									this.ZG.setLabel(this.T.get("Scan"));
									this.ZD.setEnabled(true);
									break;
								}
								posData = this.ZE[i][3];
								/* make sure coordinates are well-formed enough */
								if (posData != null && posData.split(':').length == 2) {
									posX = parseInt(posData.split(':')[0]);
									posY = parseInt(posData.split(':')[1]);
									/* check if there is any base */
									var playerbase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
									var world = ClientLib.Data.MainData.GetInstance().get_World();
									var foundbase = world.CheckFoundBase(posX, posY, playerbase.get_PlayerId(), playerbase.get_AllianceId());
									//console.log("foundbase",foundbase);
									this.ZE[i][19] = (foundbase == 0) ? true : false;
									//var obj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
									//console.log("obj", obj);
									id = this.ZE[i][0];
									ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
									ncity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);
									//console.log("ncity", ncity);
									if (ncity != null) {
										if (!ncity.get_IsGhostMode()) {
											//if(ncity.get_Name() != null)
											//console.log("ncity.get_Name ", ncity.get_Name() , ncity.get_CityBuildingsData().get_Buildings());
											//var cityBuildings = ncity.get_CityBuildingsData();
											var cityUnits = ncity.get_CityUnitsData();
											if (cityUnits != null) { // cityUnits !=null können null sein
												//console.log("ncity.cityUnits", cityUnits );

												var selectedBase = this.ZC.getSelection()[0].getModel();
												var buildings = ncity.get_Buildings().d;
												var defenseUnits = cityUnits.get_DefenseUnits().d;
												var offensivUnits = selectedBase.get_CityUnitsData().get_OffenseUnits().d;
												//console.log(buildings,defenseUnits,offensivUnits);

												if (buildings != null) //defenseUnits !=null können null sein
												{
													var buildingLoot = getResourcesPart(buildings);
													var unitLoot = getResourcesPart(defenseUnits);

													//console.log("buildingLoot", buildingLoot);
													//console.log("unitLoot", unitLoot);
													this.ZE[i][2] = ncity.get_Name();
													this.ZE[i][5] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
													this.ZE[i][6] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
													this.ZE[i][7] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
													this.ZE[i][8] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
													//console.log(posX,posY,"GetBuildingsConditionInPercent", ncity.GetBuildingsConditionInPercent() );
													if (ncity.GetBuildingsConditionInPercent() != 0) {
														this.ZA = 0;
														if (this.ZE[i][5] != 0) {
															var c = 0;
															var t = 0;
															var m = 0;
															var k = 0;
															var l = 0;
															this.ZM[id] = new Array(9);
															for (m = 0; m < 9; m++) {
																this.ZM[id][m] = new Array(8);
															}
															for (k = 0; k < 9; k++) {
																for (l = 0; l < 8; l++) {
																	//console.log( ncity.GetResourceType(k,l) );
																	switch (ncity.GetResourceType(k, l)) {
																	case 1:
																		/* Crystal */
																		this.ZM[id][k][l] = 1;
																		c++;
																		break;
																	case 2:
																		/* Tiberium */
																		this.ZM[id][k][l] = 2;
																		t++;
																		break;
																	default:
																		//none
																		break;
																	}
																}
															}
															//console.log( c,t );


															this.ZE[i][9] = c;
															this.ZE[i][10] = t;
															this.ZE[i][11] = ncity.GetBuildingsConditionInPercent();
															this.ZE[i][12] = ncity.GetDefenseConditionInPercent();

															try {
																var u = offensivUnits;
																//console.log("OffenseUnits",u);
																var offhp = 0;
																var defhp = 0;
																for (var g in u) {
																	offhp += u[g].get_Health();
																}

																u = defenseUnits;
																//console.log("DefUnits",u);
																for (var g in u) {
																	defhp += u[g].get_Health();
																}

																u = buildings;
																//console.log("DefUnits",u);
																for (var g in u) {
																	//var id=0;
																	//console.log("MdbUnitId",u[g].get_MdbUnitId());
																	var mid = u[g].get_MdbUnitId();
																	//DF
																	if (mid == 158 || mid == 131 || mid == 195) {
																		this.ZE[i][18] = 8 - u[g].get_CoordY();
																	}
																	//CY
																	if (mid == 112 || mid == 151 || mid == 177) {
																		this.ZE[i][17] = 8 - u[g].get_CoordY();
																	}
																}

																//console.log("HPs",offhp,defhp, (defhp/offhp) );
															} catch (x) {
																console.debug("HPRecord", x);
															}
															this.ZE[i][14] = (defhp / offhp);

															this.ZE[i][15] = this.ZE[i][5] + this.ZE[i][6] + this.ZE[i][7];
															this.ZE[i][16] = this.ZE[i][15] / this.ZE[i][13];

															this.ZE[i][1] = 0;
															retry = true;
															console.info(ncity.get_Name(), " finish");
															this.ZA = 0;
															this.countlastidchecked = 0;
															//console.log(this.ZE[i],this.ZM[id],id);
															this.FK(this.ZE[i], this.ZM[id], id);
															//update table
															this.ZL.setData(this.ZE);
														}
													} else {
														if (this.ZA > 250) {
															console.info(this.ZE[i][2], " on ", posX, posY, " removed (GetBuildingsConditionInPercent == 0)");
															this.ZE.splice(i, 1); //entfernt element aus array
															this.ZA = 0;
															this.countlastidchecked = 0;
															break;
														}
														this.ZA++;
													}
												}
											}
										} else {
											console.info(this.ZE[i][2], " on ", posX, posY, " removed (IsGhostMode)");
											this.ZE.splice(i, 1); //entfernt element aus array
											break;
										}
									}
								}
								loops++;
								if (loops >= maxLoops) {
									retry = true;
									break;
								}
							}

							//console.log("getResourcesByID end ", this.ZH, Addons.BaseScannerGUI.getInstance().isVisible());
							if (this.lastid != i) {
								this.lastid = i;
								this.countlastidchecked = 0;
								this.ZA = 0;
							} else {
								if (this.countlastidchecked > 16) {
									console.info(this.ZE[i][2], " on ", posX, posY, " removed (found no data)");
									this.ZE.splice(i, 1); //entfernt element aus array
									this.countlastidchecked = 0;
								} else if (this.countlastidchecked > 10) {
									sleeptime = 500;
								} else if (this.countlastidchecked > 4) {
									sleeptime = 250;
								}
								this.countlastidchecked++;
							}
							//console.log("this.ZH", this.ZH);
							if (this.ZH && Addons.BaseScannerGUI.getInstance().isVisible()) {
								//console.log("loop");
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", sleeptime);
							} else {
								this.ZG.setLabel(this.T.get("Scan"));
								this.ZH = false;
							}
						} catch (e) {
							console.debug("MaelstromTools_Basescanner getResources", e);
						}
					},
					FK : function (dataa, datab, id) {
						this.ZZ.push(dataa);
						this.ZS[id] = datab;
					},
					FL : function (id, t) {
						if (t == 0) {
							for (var i = 0; i < this.ZZ.length; i++) {
								if (this.ZZ[i][0] == id) {
									return this.ZZ[i];
								}
							}
						} else {
							if (this.ZS[id]) {
								return this.ZS[id];
							}
						}
						return null;
					}

				}
			});

			qx.Class.define("Addons.BaseScannerLayout", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerLayout " + window.__msbs_version);
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(false);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(false);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(10);
						this.setLayout(new qx.ui.layout.Grow());

						this.ZW = [];
						this.removeAll();
						this.ZZ = new qx.ui.container.Scroll();
						this.ZY = new qx.ui.container.Composite(new qx.ui.layout.Flow());
						this.add(this.ZZ, {
							flex : 3
						});
						this.ZZ.add(this.ZY);
						//this.FO();
					} catch (e) {
						console.debug("Addons.BaseScannerLayout.construct: ", e);
					}
				},
				members : {
					ZW : null,
					ZZ : null,
					ZY : null,
					ZX : null,
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								this.open();
								this.moveTo(100, 100);
								this.FO();
							}
						} catch (e) {
							console.log("Addons.BaseScannerLayout.openWindow: ", e);
						}
					},
					FO : function () {
						var ZM = window.Addons.BaseScannerGUI.getInstance().ZM;
						var ZE = window.Addons.BaseScannerGUI.getInstance().ZE;
						this.ZX = [];
						var selectedtype = window.Addons.BaseScannerGUI.getInstance().ZJ.getSelection()[0].getModel();
						//console.log("FO: " , ZM.length);
						var rowDataLine = null;
						if (ZE == null) {
							console.info("ZE null: ");
							return;
						}
						//console.log("FO: " , ZM);
						this.ZW = [];
						var id;
						var i;
						var x;
						var y;
						var a;
						for (id in ZM) {
							for (i = 0; i < ZE.length; i++) {
								if (ZE[i][0] == id) {
									rowDataLine = ZE[i];
								}
							}

							if (rowDataLine == null) {
								continue;
							}
							//console.log("ST",selectedtype,rowDataLine[10]);
							if (selectedtype > 4 && selectedtype < 8) {
								if (selectedtype != rowDataLine[10]) {
									continue;
								}
							} else {
								continue;
							}

							posData = rowDataLine[3];
							if (posData != null && posData.split(':').length == 2) {
								posX = parseInt(posData.split(':')[0]);
								posY = parseInt(posData.split(':')[1]);
							}
							var st = '<table border="2" cellspacing="0" cellpadding="0">';
							var link = rowDataLine[2] + " - " + rowDataLine[3];
							st = st + '<tr><td colspan="9"><font color="#FFF">' + link + '</font></td></tr>';
							for (y = 0; y < 8; y++) {
								st = st + "<tr>";
								for (x = 0; x < 9; x++) {
									var img = "";
									var res = ZM[id][x][y];
									//console.log("Res ",res);
									switch (res == undefined ? 0 : res) {
									case 2:
										//console.log("Tiberium " , MT_Base.images[MaelstromTools.Statics.Tiberium] );
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Tiberium] + '">';
										break;
									case 1:
										//console.log("Crystal ");
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Crystal] + '">';
										break;
									default:
										img = '<img width="14" height="14" src="' + MT_Base.images["Emptypixels"] + '">';
										break;
									}
									st = st + "<td>" + img + "</td>";
								}
								st = st + "</tr>";
							}
							st = st + "</table>";
							//console.log("setWidgetLabels ", st);
							var l = new qx.ui.basic.Label().set({
									backgroundColor : "#303030",
									value : st,
									rich : true
								});
							l.cid = id;
							this.ZX.push(id);
							l.addListener("click", function (e) {

								//console.log("clickid ", this.cid, );
								//webfrontend.gui.UtilView.openCityInMainWindow(this.cid);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, this.cid, 0, 0);
								var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								if (q != null)
									q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.cid);

							});
							l.setReturnValue = id;
							this.ZW.push(l);
						}
						this.ZY.removeAll();
						var b = 0;
						var c = 0;
						//console.log("this.ZW.length",this.ZW.length);
						for (a = 0; a < this.ZW.length; a++) {
							this.ZY.add(this.ZW[a], {
								row : b,
								column : c
							});
							c++;
							if (c > 4) {
								c = 0;
								b++;
							}
						}
					}
				}
			});

			qx.Class.define("Addons.LocalStorage", {
				type : "static",
				extend : qx.core.Object,
				statics : {
					isSupported : function () {
						return typeof(localStorage) !== "undefined";
					},
					isdefined : function (key) {
						return (localStorage[key] !== "undefined" && localStorage[key] != null);
					},
					isdefineddata : function (data, key) {
						return (data[key] !== "undefined" && data[key] != null);
					},
					setglobal : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								localStorage[key] = JSON.stringify(value);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setglobal: ", e);
						}
					},
					getglobal : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								if (Addons.LocalStorage.isdefined(key)) {
									return JSON.parse(localStorage[key]);
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getglobal: ", e);
						}
						return defaultValue;
					},
					setserver : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								var data;
								if (Addons.LocalStorage.isdefined(sn)) {
									try {
										data = JSON.parse(localStorage[sn]);
										if (!(typeof data === "object")) {
											data = {};
											console.debug("LocalStorage data from server not null, but not object");
										}
									} catch (e) {
										console.debug("LocalStorage data from server not null, but parsererror", e);
										data = {};
									}
								} else {
									data = {};
								}
								data[key] = value;
								localStorage[sn] = JSON.stringify(data);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setserver: ", e);
						}
					},
					getserver : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								if (Addons.LocalStorage.isdefined(sn)) {
									var data = JSON.parse(localStorage[sn]);
									if (Addons.LocalStorage.isdefineddata(data, key)) {
										return data[key];
									}
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getserver: ", e);
						}
						return defaultValue;
					}
				}
			});
			
			if(typeof Addons.Language === 'undefined'){
				qx.Class.define("Addons.Language", {
					type : "singleton",
					extend : qx.core.Object,
					members : {
						d : {},
						debug : false,
						addtranslateobj : function (o) {
							if ( o.hasOwnProperty("main") ){
								this.d[o.main.toString()] = o;								
								if(this.debug){
									console.log("Translate Added ", o.main.toString() );
								}
								delete o.main;								
							} else {
								console.debug("Addons.Language.addtranslateobj main not define");
							}
						},
						get : function (t) {
							var locale = qx.locale.Manager.getInstance().getLocale();
							var loc = locale.split("_")[0];
							if ( this.d.hasOwnProperty(t) ){
								if ( this.d[t].hasOwnProperty(loc) ){
									return this.d[t][loc];
								}
							}
							if(this.debug){
								console.debug("Addons.Language.get ", t, " not translate for locale ", loc);
							}
							return t;
						}
					}
				});
			}
			
			qx.Class.define("qx.ui.table.cellrenderer.Replace", {
				extend : qx.ui.table.cellrenderer.Default,

				properties : {

					replaceMap : {
						check : "Object",
						nullable : true,
						init : null
					},
					replaceFunction : {
						check : "Function",
						nullable : true,
						init : null
					}
				},
				members : {
					// overridden
					_getContentHtml : function (cellInfo) {
						var value = cellInfo.value;
						var replaceMap = this.getReplaceMap();
						var replaceFunc = this.getReplaceFunction();
						var label;

						// use map
						if (replaceMap) {
							label = replaceMap[value];
							if (typeof label != "undefined") {
								cellInfo.value = label;
								return qx.bom.String.escape(this._formatValue(cellInfo));
							}
						}

						// use function
						if (replaceFunc) {
							cellInfo.value = replaceFunc(value);
						}
						return qx.bom.String.escape(this._formatValue(cellInfo));
					},

					addReversedReplaceMap : function () {
						var map = this.getReplaceMap();
						for (var key in map) {
							var value = map[key];
							map[value] = key;
						}
						return true;
					}
				}
			});
			
			
			console.info("Maelstrom_Basescanner initalisiert");
			
			var T = Addons.Language.getInstance();
			T.debug = false;
			T.addtranslateobj( {main:"Point", de: "Position", pt: "Position", fr: "Position"} );
			T.addtranslateobj( {main:"BaseScanner Overview", de: "Basescanner Übersicht", pt: "Visão geral do scanner de base", fr: "Aperçu du scanner de base"} );
			T.addtranslateobj( {main:"Scan", de: "Scannen", pt: "Esquadrinhar", fr: "Balayer"} );
			T.addtranslateobj( {main:"Location", de: "Lage", pt: "localização", fr: "Emplacement"} );
			T.addtranslateobj( {main:"Player", de: "Spieler", pt: "Jogador", fr: "Joueur"} );
			T.addtranslateobj( {main:"Bases", de: "Bases", pt: "Bases", fr: "Bases"} );
			T.addtranslateobj( {main:"Camp,Outpost", de: "Lager,Vorposten", pt: "Camp,posto avançado", fr: "Camp,avant-poste"} );
			T.addtranslateobj( {main:"Camp", de: "Lager", pt: "Camp", fr: "Camp"} );						
			T.addtranslateobj( {main:"Outpost", de: "Vorposten", pt: "posto avançado", fr: "avant-poste"} );
			T.addtranslateobj( {main:"BaseScanner Layout", de: "BaseScanner Layout", pt: "Layout da Base de Dados de Scanner", fr: "Mise scanner de base"} );
			T.addtranslateobj( {main:"Show Layouts", de: "Layouts anzeigen", pt: "Mostrar Layouts", fr: "Voir Layouts"} );						
			T.addtranslateobj( {main:"Building state", de: "Gebäudezustand", pt: "construção do Estado", fr: "construction de l'État"} );
			T.addtranslateobj( {main:"Defense state", de: "Verteidigungszustand", pt: "de Defesa do Estado", fr: "défense de l'Etat"} );
			T.addtranslateobj( {main:"CP", de: "KP", pt: "CP", fr: "CP"} );
			T.addtranslateobj( {main:"CP Limit", de: "KP begrenzen", pt: "CP limitar", fr: "CP limiter"} );						
			T.addtranslateobj( {main:"min Level", de: "min. Level", pt: "nível mínimo", fr: "niveau minimum"} );
			T.addtranslateobj( {main:"clear Cache", de: "Cache leeren", pt: "limpar cache", fr: "vider le cache"} );
			T.addtranslateobj( {main:"Only center on World", de: "Nur auf Welt zentrieren", pt: "Único centro no Mundial", fr: "Seul centre sur World"} );
			T.addtranslateobj( {main:"base set up at", de: "Basis errichtbar", pt: "base de configurar a", fr: "mis en place à la base"} );	
			T.addtranslateobj( {main:"Infantry", de: "Infanterie", pt: "Infantaria", fr: "Infanterie"} );
			T.addtranslateobj( {main:"Vehicle", de: "Fahrzeuge", pt: "Veículos", fr: "Vehicule"} );
			T.addtranslateobj( {main:"Aircraft", de: "Flugzeuge", pt: "Aeronaves", fr: "Aviation"} );
			T.addtranslateobj( {main:"Tiberium", de: "Tiberium", pt: "Tibério", fr: "Tiberium"} );
			T.addtranslateobj( {main:"Crystal", de: "Kristalle", pt: "Cristal", fr: "Cristal"} );
			T.addtranslateobj( {main:"Power", de: "Strom", pt: "Potência", fr: "Energie"} );
			T.addtranslateobj( {main:"Dollar", de: "Credits", pt: "Créditos", fr: "Crédit"} );
			T.addtranslateobj( {main:"Research", de: "Forschung", pt: "Investigação", fr: "Recherche"} );
			T.addtranslateobj( {main:"-----", de: "--", pt: "--", fr: "--"} );
			

			
			
			var MT_Lang = null;
			var MT_Cache = null;
			var MT_Base = null;
			var fileManager = null;
			var lastid = 0;
			var countlastidchecked = 0;
			fileManager = ClientLib.File.FileManager.GetInstance();
			MT_Lang = window.MaelstromTools.Language.getInstance();
			MT_Cache = window.MaelstromTools.Cache.getInstance();
			MT_Base = window.MaelstromTools.Base.getInstance();

			MT_Base.createNewImage("BaseScanner", "ui/icons/icon_item.png", fileManager);
			MT_Base.createNewImage("Emptypixels", "ui/menues/main_menu/misc_empty_pixel.png", fileManager);
			var openBaseScannerOverview = MT_Base.createDesktopButton(T.get("BaseScanner Overview") + "version " + window.__msbs_version, "BaseScanner", false, MT_Base.desktopPosition(2));
			openBaseScannerOverview.addListener("execute", function () {
				Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
			}, this);
			Addons.BaseScannerGUI.getInstance().addListener("close", Addons.BaseScannerGUI.getInstance().FN, Addons.BaseScannerGUI.getInstance());
			//this.addListener("resize", function(){ }, this );
			
			MT_Base.addToMainMenu("BaseScanner", openBaseScannerOverview);
			
			if(typeof Addons.AddonMainMenu !== 'undefined'){
				var addonmenu = Addons.AddonMainMenu.getInstance();
				addonmenu.AddMainMenu("Basescanner", function () {
					Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
				},"ALT+B");
			}
			
		}

		function getResourcesPart(cityEntities) {
			try {
				var loot = [0, 0, 0, 0, 0, 0, 0, 0];
				if (cityEntities == null) {
					return loot;
				}

				for (var i in cityEntities) {
					var cityEntity = cityEntities[i];
					var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

					for (var x = 0; x < unitLevelRequirements.length; x++) {
						loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
						if (cityEntity.get_HitpointsPercent() < 1.0) {
							// destroyed

						}
					}
				}
				return loot;
			} catch (e) {
				console.debug("MaelstromTools_Basescanner getResourcesPart", e);
			}
		}

		function objfnkstrON(obj) {
			var key;
			for (key in obj) {
				if (typeof(obj[key]) == "function") {
					var s = obj[key].toString();
					console.debug(key, s);
					//var protostring = s.replace(/\s/gim, "");
					//console.log(key, protostring);
				}
			}
		}

		function foundfnkstring(obj, redex, objname, n) {
			var redexfounds = [];
			var s = obj.toString();
			var protostring = s.replace(/\s/gim, "");
			redexfounds = protostring.match(redex);
			var i;
			for (i = 1; i < (n + 1); i++) {
				if (redexfounds != null && redexfounds[i].length == 6) {
					console.debug(objname, i, redexfounds[i]);
				} else if (redexfounds != null && redexfounds[i].length > 0) {
					console.warn(objname, i, redexfounds[i]);
				} else {
					console.error("Error - ", objname, i, "not found");
					console.warn(objname, protostring);
				}
			}
			return redexfounds;
		}

		function MaelstromTools_Basescanner_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && typeof MaelstromTools != 'undefined') {
					createMaelstromTools_Basescanner();
				} else {
					window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.debug("MaelstromTools_Basescanner_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 10000);
		}
	};
	try {
		var MaelstromScript_Basescanner = document.createElement("script");
		MaelstromScript_Basescanner.innerHTML = "(" + MaelstromTools_Basescanner.toString() + ")();";
		MaelstromScript_Basescanner.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(MaelstromScript_Basescanner);
		}
	} catch (e) {
		console.debug("MaelstromTools_Basescanner: init error: ", e);
	}
})();


/***********************************************************************************
Tiberium Alliances Zoom - Version: 1.0.1									138436
***********************************************************************************/
// ==UserScript==
// @name           Tiberium Alliances Zoom
// @description    Allows you to zoom out further
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.0
// @author         Panavia
// @require        http://sizzlemctwizzle.com/updater.php?id=138436
// ==/UserScript==

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 1.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.2;	// Smaller number means able to zoom out further.
      var zoomInc = 0.05;	// Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();


/***********************************************************************************
C&C: Tiberium Alliances Chat Helper Enhanced - Version: 3.1.6				152177
***********************************************************************************/
// ==UserScript==
// @name        C&C: Tiberium Alliances Chat Helper Enhanced
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Automates the use of chat and message BB-Codes: [coords][url][player][alliance][b][i][s][u] - Contact list for whispering - Type /chelp <enter> in chat for help.
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     3.1.6
// @updateURL   https://userscripts.org/scripts/source/152177.meta.js
// @downloadURL https://userscripts.org/scripts/source/152177.user.js
// @icon        https://sites.google.com/site/titlemod/home/favicon.png
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands

// Please report urls that are not tagged properly

// window.chatHelper_suppressBrowserAltKeys suppresses normal browser menu keys [Alt+(a,p,b,i,u,s)] when you are in a textarea so that the menus don't open.

(function () {
	var chatHelper_main = function () {
		window.chatHelper_debug = 0; //initial debug level, top level for easy console access
		var chlog = function chlog(str,lvl){
			if (lvl > 0) { //lvl 1+
				if (window.chatHelper_debug == 1) { // lvl 1
					console.log("ChatHelper_debug: "+str+"\n");
				}
				if (window.chatHelper_debug == 2) { // lvl 2
					console.log("ChatHelper_debug: "+str+"\n");
				}
				
			} else { //lvl 0 or no arg passed to lvl
				console.log("ChatHelper_log: "+str+"\n");
			}
		};
		try {
			function createchatHelper() {
				var onkeyupDelay = 50; //ms to wait after a keyupevent before searching contacts list. Lower for faster searching. Higher for better performance.
				window.chatHelper_suppressBrowserAltKeys = true;
				window.chatHelper_version = "3.1.6";
				window.chatHelper_name = "C&C: Tiberium Alliances Chat Helper Enhanced";
				chlog(window.chatHelper_name + ' v' + window.chatHelper_version + ': loading.',0);
				var saveObj = {
					saveObjVer : "3.1.6",
					contacts : []
				}
				
				var validCharPatt = /[-\w\.]/;
				var isWhisp = false;
				var contacts = [];
				var timer;
				var _sub;

				
				function getCaretPos(obj) {
					// getCaretPos from: http://userscripts.org/scripts/show/151099
					obj.focus();
					
					if (obj.selectionStart) {
						return obj.selectionStart; //Gecko
					} else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					// moveCaretPos from: http://userscripts.org/scripts/show/151099
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(validCharPatt) != null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(validCharPatt) != null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(validCharPatt) != null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/'); //closing tag
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField != null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						//save scroll position
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						//if there is selected text
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
							//if ((input IS empty) OR (the last char was a space)) AND next char ISNOT a left sqbracket
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
							//if last character is a valid playername character
						} else if (inText.charAt(pos - 1).match(validCharPatt) != null) {
							var arr = getCursorWordPos(inputField); //
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						//restore scroll position
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + p or Alt + 3\t:\tplayer tags\n|\tAlt + a or Alt + 4\t:\talliance tags\n|\tAlt + b\t\t\t:\tbold tags\n|\tAlt + i\t\t\t:\titalic tags\n|\tAlt + u\t\t\t:\tunderline tags\n|__\tAlt + s\t\t\t:\tstrikethrough tags\n\nContact list commands:\n/list -or- /contacts\n/add\n/del\n/del all - wipes your whole contact list");
				}
				
				function saveData() {
					saveObj.contacts = contacts;
					var jString = JSON.stringify(saveObj);
					chlog("saveJSON: "+jString, 1);
					localStorage.setItem('chatHelper', jString);
				}

				function loadData() {
					try{
						if (localStorage.getItem('myContacts')) { //should be removed eventually
							var dat = localStorage.getItem('myContacts');
							dat = dat.split(',');
							saveObj.contacts = dat;
							
							//unset old storage 
							localStorage.removeItem('myContacts');
						} else if (localStorage.getItem('chatHelper')) {
							var saveObjTmp = JSON.parse(localStorage.getItem('chatHelper'));
							if (saveObjTmp.saveObjVer != window.chatHelper_version){
								//version changed
								var va = saveObjTmp.saveObjVer.split('.');
								var vb = window.chatHelper_version.split('.');
								
								if (va[0] != vb[0]){ //major version change
									chlog("ChatHelper: Major version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
								} else {
									if (va[1] != vb[1]){ //minor version change
										chlog("ChatHelper: Minor version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
									} else {
										if (va[2] != vb[2]){ //patch release
											chlog("ChatHelper: Version Patched from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
										}
									}
								}
							} else {
								//no version change
								localStorage.getItem('chatHelper');
							}
							saveObj = saveObjTmp;
						}
						contacts = saveObj.contacts;
						saveData();
					}catch(err){
						chlog(err);
					}
				}
				
				if (!localStorage.myContacts) {
					chlog("Deprecated contacts variable does not exist.",1);
					loadData();
				} else {
					//contacts = loadData();
					loadData();
					chlog("Contacts: " + contacts, 1);
				}
				
				function saveContact(fr) {
					chlog("Number of contacts == "+contacts.length,1);
					contacts.push(fr);
					chlog(fr + " added to contacts list.",1);
					saveData();
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					var len = contacts.length;
					var a = contacts.sort(caseInsensitiveSort);
					if (len == 1) {
						alert(len + " Contact:\n\n" + a.join("\n") + "\n");
					} else if (len > 1) {
						alert(len + " Contacts:\n\n" + a.join("\n") + "\n");
					} else {
						var p = prompt("Your contacts list is empty.\n\nType a name here to add a contact:\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						contacts = [];
						chlog("All contacts deleted",1);
						saveData();
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							saveObj.contacts = contacts.splice(ind, 1);
							saveData();
							chlog(contacts,1);
							chlog(fr + " deleted from contacts list.");
						}
					}
				}
				function keyUpTimer(kEv) {
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							chlog("keyUpTimer keyCode =="+kEv.keyCode,1);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
							keyUpTimer(kEv);
						}, onkeyupDelay);
				}
				
				function delayedConfirm() {
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
					}
				}
				
				function autoTag(inputField, inText) {
					var isUrl = false;
					var lookBack;
					//the code here is mostly from Bruce Doan: http://userscripts.org/scripts/show/151965
					////auto url
					inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\+\|#:;,~\*\(\)\$]*)*\/?(\[\/url\])*/gi, function () {
							var result = new Array();
							var protocol = arguments[2].match(/https?:\/\//);
							for (var i in arguments){
								chlog("autoTag url reg arg "+i + "= " + arguments[i],1);
							}
							result.push('[url]');
							result.push(arguments[2]); // http[s]://
							result.push(arguments[3]); // domain
							result.push(arguments[4]); // ext
							result.push(arguments[5]); // query string
							result.push('[/url]');
							if (protocol === null){
								chlog("autotag url - no protocol",2);
							} else {
								isUrl = true;
								chlog("bypassing coords tagging\n detected protocol = " + protocol,2);
								
							}
							return result.join('');
						});
					////auto coords
					if (!isUrl) {
						chlog("checking for coords",1);
						lookBack = inText.replace(/(\[coords\])?([#])?([0-9]{3,4})[:.]([0-9]{3,4})([:.]\w+)?(\[\/coords\])?/gi, function () {
								for (var i in arguments){
									chlog("autoTag coords reg arg " + i + " = " + arguments[i],1);
								}
								var hashBefore = arguments[2];
								chlog("hashBefore "+hashBefore,1);
								if (!hashBefore) {
									chlog("no hash returning");
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[3]);
									result.push(':');
									result.push(arguments[4]);
									if (arguments[5] != undefined) {
										result.push(arguments[5].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								} else {
									return arguments[0];
								}
							});
						inText = lookBack;
						chlog("lookedback",1);
						chlog("LB string: "+lookBack,1);
					}
					// shorthand for player
					inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
					// shorthand for alliance
					inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
					
					return inText;
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						chlog("Tab key pressed",1)
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					 */
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm, 500);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//no message to send, not in contacts, promt to add, clear input
								chlog("clearing input field",1);
								inputField.focus(); //?necessary?
								inputField.value = "";
								var cf = confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list");
								if (cf) {
									saveContact(sub);
									return false;
								} else {
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							chlog("clearing input field",1);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							chlog("clearing input field",1);
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							chlog("clearing input field",1);
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField != null && inputField.type === "text" && inText !== "") {
							chlog("onEnter auto-tagging",1);
							
							inText = autoTag(inputField, inText); //auto-tag
							
							if (inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							chlog("charCode == "+cc,1);
							chlog("keyCode == "+kc,1);

							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								chlog("attempting Alt+1 message auto-tag",1);
								if (inputField != null) {
									var st = inputField.scrollTop;
									
									inText = autoTag(inputField, inText); //auto-tag
									
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;
										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField != null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url != null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField != null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+s for strikethrough */
							if (cc === 115 || kc === 83) {
								tagWith('[s]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			chlog("createchatHelper: "+ err,1);
			console.error(err);
		}
		
		function chatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createchatHelper();
				} else {
					window.setTimeout(chatHelper_checkIfLoaded, 1333);
				}
			} catch (err) {
				console.log("chatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(chatHelper_checkIfLoaded, 1333);
	};
	try {
		var chatHelper = document.createElement("script");
		chatHelper.innerHTML = "(" + chatHelper_main.toString() + ")();";
		chatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(chatHelper);
	} catch (err) {
		console.log("chatHelper: init error: ", err);
	}
})();


/***********************************************************************************
Tiberium Alliances - New Resource Trade Window - Version: 1.4.7				168297
***********************************************************************************/
// ==UserScript==
// @name Tiberium Alliances - New Resource Trade Window
// @description Implements a new TradeOverlay class, allowing you to select individual, multiple or all bases to transfer resources from
// @namespace NewTradeOverlay
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4.7
// @author Chiantii
// @updateURL https://userscripts.org/scripts/source/168297.meta.js
// @downloadURL https://userscripts.org/scripts/source/168297.user.js
// ==/UserScript==
(function () {
	var NewTradeOverlay_main = function () {
		console.log('NewTradeOverlay loaded');
		function CreateNewTradeOverlay() {
			qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
			qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
				type : "singleton",
				extend : webfrontend.gui.OverlayWindow,
				construct : function () {
					webfrontend.gui.OverlayWindow.call(this);
					this.set({
						autoHide : false
					});
					this.clientArea.setLayout(new qx.ui.layout.HBox());
					this.clientArea.setMargin(0);
					this.clientArea.setWidth(464);
					this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.clientArea.add(this.tradeWindow());
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
				},
				members : {
					activated : false,
					transferWindowTableSelectedRows : null,
					modifier : null,
					tradeWindowTable : null,
					tableColumnModel : null,
					resourceTransferType : null,
					transferAmountTextField : null,
					largeTiberiumImage : null,
					costToTradeLabel : null,
					transferFromBaseLabel : null,
					totalResourceAmount : null,
					selectedRowData : null,
					selectedRow : null,
					tradeButton : null,
					tenPercentButton : null,
					twentyFivePercentButton : null,
					fiftyPercentButton : null,
					seventyFivePercentButton : null,
					oneHundredPercentButton : null,
					resourceSelectionRadioButtons : null,
					selectAllNoneButton : null,
					userDefinedMinimumAmount : -1,
					userDefinedMaxDistance : -1,
					tradeConfirmationWidget : null,
					activate : function () {
						if (!this.activated) {
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
							this.selectedRowData = null;
							this.selectedRow = null;
							this.transferWindowTableSelectedRows = [];
							this.transferAmountTextField.setValue("");
							this.costToTradeLabel.setValue("0");
							this.userDefinedMinimumAmount = -1;
							this.userDefinedMaxDistance = -1;
							this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
							this.tradeWindowTable.resetCellFocus();
							this.tradeWindowTable.resetSelection();
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.resourceSelectionRadioButtons.resetSelection();
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
							this.TableRowFilter();
							this.tableColumnModel.sortByColumn(2, true);
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select all" : "Select All"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select none" : "Select None"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:trading with multiple bases" : "Trading with multiple bases"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:percent buttons" : "Please use one of the Percent buttons"
							});
							this.activated = true;
						}
					},
					deactivate : function () {
						if (this.activated) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.costToTradeLabel.setValue("");
							this.selectedRow = null;
							this.selectedRowData = null;
							this.modifier = 1;
							this.activated = false;
						}
					},
					getFilterMinimimAmount : function () {
						return this.userDefinedMinimumAmount;
					},
					getFilterDistanceLimit : function () {
						return this.userDefinedMaxDistance;
					},
					tradeWindow : function () {
						var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
							marginTop : 10,
							marginBottom : 10,
							marginLeft : 4
						});

						tradeWindowContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
							height : 26
						});
						var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
							appearance : "button-toggle",
							width : 84
						});
						tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
						var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
							appearance : "button-toggle",
							width : 84
						});
						crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
						var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						resourceSelectionContainer.add(selectResourcesLabel);
						resourceSelectionContainer.add(tiberiumToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
							width : 2
						}));
						resourceSelectionContainer.add(crystalToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
						this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

						tradeWindowContainer.add(resourceSelectionContainer);

						var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
						var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
						var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
						var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						this.minimumAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.minimumAmountTextField.setFilter(/[0-9]/);
						this.minimumAmountTextField.setMaxLength(12);
						var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13",
							toolTipText : tradeCostToolTip
						});
						this.maxDistanceTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.maxDistanceTextField.setFilter(/[0-9]/);
						this.maxDistanceTextField.setMaxLength(3);
						searchBox.add(minimumAmountLabel);
						searchBox.add(this.minimumAmountTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						searchBox.add(maxDistanceLabel);
						searchBox.add(this.maxDistanceTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 2
						});

						searchContainer.add(searchBox);

						var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
							width : 300,
							maxWidth : 300,
							marginBottom : 8,
							marginTop : 4,
							alignX : "center"
						});
						searchButton.addListener("execute", this.TableRowFilter, this);
						searchContainer.add(searchButton);

						//tradeWindowContainer.add(searchContainer);

						this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
							enabled : true,
							//appearance: "button-forum-light",
							//textColor: "text-label",
							width : 160
						});

						this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

						tradeWindowContainer.add(this.selectAllNoneButton);

						this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
						this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
						this.tableColumnModel.setColumnSortable(0, true);
						this.tableColumnModel.setColumnSortable(1, true);
						this.tableColumnModel.setColumnSortable(2, true);
						this.tableColumnModel.setColumnSortable(3, true);
						this.tableColumnModel.setSortMethods(3, this.AmountSort);
						this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
							statusBarVisible : false,
							columnVisibilityButtonVisible : false,
							maxHeight : 300
						});
						this.tradeWindowTable.addListener("cellClick", this.TradeWindowTableCellClick, this);
						this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
						this.tradeWindowTable.showCellToolTip = true;
						var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
						tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
						tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
						tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
						tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
						tradeWindowTableColumnModel.setColumnWidth(0, 160);
						tradeWindowTableColumnModel.setColumnWidth(1, 60);
						tradeWindowTableColumnModel.setColumnWidth(2, 100);
						tradeWindowTableColumnModel.setColumnVisible(4, false);
						tradeWindowTableColumnModel.setColumnVisible(5, false);
						tradeWindowTableColumnModel.setColumnVisible(6, false);
						tradeWindowContainer.add(this.tradeWindowTable);

						var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
							minHeight : 36
						});
						this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
							alignY : "middle",
							width : 22,
							height : 20,
							scale : true
						});
						this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
							rich : true,
							textColor : "text-label",
							marginBottom : 2,
							alignY : "middle",
							maxWidth : 182
						});
						this.transferAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
							enabled : false,
							width : 208,
							marginRight : 1
						});
						this.transferAmountTextField.setFilter(/[0-9]/);
						this.transferAmountTextField.setMaxLength(20);
						this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
						transferAmountBox.add(this.largeTiberiumImage);
						transferAmountBox.add(this.transferFromBaseLabel);
						var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							marginTop : 2
						});
						this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.tenPercentButton.addListener("execute", this.TenPercent, this);
						this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
						this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
						this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
						this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
						percentButtonsBox.add(this.tenPercentButton);
						percentButtonsBox.add(this.twentyFivePercentButton);
						percentButtonsBox.add(this.fiftyPercentButton);
						percentButtonsBox.add(this.seventyFivePercentButton);
						percentButtonsBox.add(this.oneHundredPercentButton);
						transferAmountContainer.add(transferAmountBox);
						transferAmountContainer.add(this.transferAmountTextField);
						transferAmountContainer.add(percentButtonsBox);
						var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
							alignX : "center",
							maxWidth : 148
						});
						var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
							textColor : "text-label",
							marginBottom : 2,
							font : "font_size_13_bold",
							width : 148,
							textAlign : "center"
						});
						var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							alignX : "center",
							allowGrowX : true,
							marginTop : 10
						});
						this.costToTradeLabel = new qx.ui.basic.Label().set({
							textColor : "text-value",
							alignY : "middle",
							font : "font_size_14_bold",
							marginLeft : 3
						});
						var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
							width : 18,
							height : 20,
							scale : true,
							AutoFlipH : false
						});
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						tradeCostBox.add(dollarImage);
						tradeCostBox.add(this.costToTradeLabel);
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
							width : 196,
							enabled : false
						});
						this.tradeButton.addListener("execute", this.TradeWithBases, this);
						tradeCostContainer.add(tradeCostLabel);
						tradeCostContainer.add(tradeCostBox);
						tradeCostContainer.add(this.tradeButton);
						var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
							decorator : new qx.ui.decoration.Background().set({
								backgroundRepeat : 'no-repeat',
								backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
							})
						});
						tradeWindowCanvas.add(transferAmountContainer, {
							left : 50,
							top : 5
						});
						tradeWindowCanvas.add(tradeCostContainer, {
							left : 285,
							top : 18
						});
						tradeWindowCanvas.add(this.tradeButton, {
							left : 134,
							top : 100
						});
						tradeWindowContainer.add(tradeWindowCanvas);
						return tradeWindowContainer;
					},
					TableRowFilter : function () {
						var tableArray = [];
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
							this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
							var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							for (var currentBase in allCities.d) {
								if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
									var otherCity = allCities.d[currentBase];
									var currentBaseID = currentBase;
									var otherCityName = otherCity.get_Name();
									var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var disqualifyDistance = false;
									var disqualifyAmount = false;
									if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
										disqualifyDistance = true;
									if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
										disqualifyAmount = true;
									if (!disqualifyDistance && !disqualifyAmount) {
										var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
										tableArray.push({
											Base : otherCityName,
											Distance : distance,
											Credits : costToTrade,
											AmountDesc : formattedAmount,
											Amount : resourceAmount,
											Max : maxResources.toString(),
											ID : currentBaseID
										});
									}
								}
							}
							this.tableColumnModel.setDataAsMapArray(tableArray, true);
							this.selectedRow = null;
							this.selectedRowData = null;
							this.tradeWindowTable.resetCellFocus();
							this.MaintainTradeWindow();
						}
					},
					SelectAllRows : function () {
						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
							this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
							this.transferAmountTextField.setValue("");
							this.totalResourceAmount = 0;
							this.costToTradeLabel.setValue("0");
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
							this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
							this.selectedRowData = this.tableColumnModel.getRowData(0);
						} else {
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.SetCostLabel();
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						}
					},
					AmountSort : function (bI, bJ) {
						if (bI[4] < bJ[4])
							return -1;
						if (bI[4] > bJ[4])
							return 1;
						return 0;
					},
					UpdateSelectedRows : function (rowData) {
						this.transferWindowTableSelectedRows = [];

						var localRows = [];
						var colModel = this.tableColumnModel;

						this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
							if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
								localRows.push(colModel.getRowData(index));
						});
						this.transferWindowTableSelectedRows = localRows;

					},
					TradeWindowTableCellClick : function (e) {

						var rowData = this.tableColumnModel.getRowData(e.getRow());
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

						this.modifier = 0;
						this.transferAmountTextField.setValue("");
						this.SetCostLabel();

						if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
							this.selectedRow = e.getRow();
							this.selectedRowData = rowData;

							this.UpdateSelectedRows();

							if (this.transferWindowTableSelectedRows.length == 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
							if (this.transferWindowTableSelectedRows.length > 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

						}

						this.MaintainTradeWindow();

					},
					ChangeResourceType : function (e) {
						var userObject = e.getData()[0];
						this.transferAmountTextField.setValue("");
						this.transferWindowTableSelectedRows = [];
						this.SetCostLabel();
						this.tradeWindowTable.resetSelection();
						this.tradeWindowTable.resetCellFocus();
						this.resourceTransferType = userObject.getUserData("key");
						if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
						} else {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
						}
						this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						this.MaintainTradeWindow();
					},
					ResourceAmountChanged : function () {
						this.modifier = 1;
						this.SetCostLabel();
					},
					CalculateTradeCost : function () {
						this.totalTransferAmount = 0;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							if (this.transferWindowTableSelectedRows.length > 1) {
								for (var base in this.transferWindowTableSelectedRows) {
									this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
								}
							} else {
								this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
							}
							return this.totalTransferAmount;
						}
						return 0;
					},
					ModifyResourceAmount : function (modifier) {
						this.totalResourceAmount = 0;

						this.UpdateSelectedRows(this.selectedRowData);

						if (this.transferWindowTableSelectedRows.length > 0) {
							for (var base in this.transferWindowTableSelectedRows) {
								this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
							}
							return this.totalResourceAmount;
						}
						return 0;
					},
					SetCostLabel : function () {
						var tradeCost = this.CalculateTradeCost();
						if (this.transferAmountTextField.getValue() == "")
							tradeCost = 0;
						this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
						this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
						//this.MaintainTradeWindow();
					},
					TenPercent : function () {
						this.modifier = 0.1;
						var resourceAmount = this.ModifyResourceAmount(0.1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TwentyFivePercent : function () {
						this.modifier = 0.25;
						var resourceAmount = this.ModifyResourceAmount(0.25);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					FiftyPercent : function () {
						this.modifier = 0.5;
						var resourceAmount = this.ModifyResourceAmount(0.5);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					SeventyFivePercent : function () {
						this.modifier = 0.75;
						var resourceAmount = this.ModifyResourceAmount(0.75);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					OneHundredPercent : function () {
						this.modifier = 1;
						var resourceAmount = this.ModifyResourceAmount(1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TradeWithBases : function () {
						var transferAmount = 0;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (this.transferWindowTableSelectedRows.length > 0) {
							if (currentCity != null && this.transferAmountTextField.getValue() != "") {
								for (var base in this.transferWindowTableSelectedRows) {
									var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
									if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
										this.tradeButton.setEnabled(false);
										if (this.transferWindowTableSelectedRows.length == 1) {
											transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
										} else {
											transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
										}
										ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
										currentCity.AddResources(this.resourceTransferType, transferAmount);
										currentBase.AddResources(this.resourceTransferType, -transferAmount);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
											targetCityId : currentCity.get_Id(),
											sourceCityId : currentBase.get_Id(),
											resourceType : this.resourceTransferType,
											amount : transferAmount
										}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
									}
								}

								this.tradeWindowTable.resetSelection();
								this.tradeWindowTable.resetCellFocus();
								this.transferWindowTableSelectedRows = [];
								this.transferAmountTextField.setValue("");
								this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
								this.SetCostLabel();
							}
						}
					},
					TradeResult : function (ce, result) {
						if (result != ClientLib.Base.EErrorCode.Success) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
							this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
						} else {
							this.SetCostLabel();
						}
						this.tradeButton.setEnabled(true);
					},
					UpdateTradeTableData : function () {
						var updatedResourceCount = [];
						var otherCity = null;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
							for (var row in transferWindowsTableData) {
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
									var otherCityID = otherCity.get_Id();
									var otherCityName = otherCity.get_Name();
									var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
									updatedResourceCount.push({
										Base : otherCityName,
										Distance : otherCityDistance,
										Credits : otherCityTradeCost,
										AmountDesc : otherCityResourceCountFormatted,
										Amount : otherCityResourceCount,
										Max : otherCityMaxStorage.toString(),
										ID : otherCityID
									});
								} else {
									updatedResourceCount.push(transferWindowsTableData[row]);
								}
							}
							this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
							if (this.selectedRow != null) {
								var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
									this.selectedRowData = null;
									this.selectedRow = null;
									this.tradeWindowTable.resetCellFocus();
								} else {
									this.selectedRowData = selectedRowData;
								}
							}
						}
					},
					MaintainTradeWindow : function () {

						var hasEnoughtCredits = false;
						var validResourceAmount = true;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
							var tradeCost = this.CalculateTradeCost();
							var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

							if (playerCreditCount < tradeCost) {
								this.costToTradeLabel.setTextColor("text-error");
							} else {
								this.costToTradeLabel.resetTextColor();
							}

							var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

							if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
								//Automatically update the text field with the new resource amount each tick
								var resourceAmount = this.ModifyResourceAmount(this.modifier);
								this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
								this.SetCostLabel();
							}

							if (this.transferWindowTableSelectedRows.length == 1) {
								if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
									this.transferAmountTextField.setTextColor("text-error");
								} else {
									this.transferAmountTextField.resetTextColor();
								}
								validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
							}

							hasEnoughtCredits = playerCreditCount >= tradeCost;

						}

						this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
						this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

						this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
						} else {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
						}

					},
					_onTick : function () {
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null && currentCity.get_HasIncommingAttack()) {
							this.onBtnClose();
						}
						this.UpdateTradeTableData();
						this.MaintainTradeWindow();
					}
				}
			});
		}

		function NewTradeOverlay_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
					qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
					CreateNewTradeOverlay();
				} else {
					window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("NewTradeOverlay_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
		}
	};

	try {
		var NewTradeOverlay = document.createElement("script");
		NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
		NewTradeOverlay.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
		}
	} catch (e) {
		console.log("NewTradeOverlay: init error: ", e);
	}

})();


/***********************************************************************************
Tiberium Alliances BaseNavBar Reorderer - Version: 1.0						165625
***********************************************************************************/
// ==UserScript==
// @name Tiberium Alliances BaseNavBar Reorderer
// @description Allows you to set a custom order for your bases in the Base Navigation Bar.
// @namespace basenav_reorder
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.0
// @author KRS_L
// ==/UserScript==
(function () {
	var BaseNavReorder_main = function () {
		var reorderWindow = null;
		var baseList = null;
		var bases = null;
		var myOrder = null;
		var reorderInterval = 500;
		function createBaseNavReorder() {
			try {
				console.log('Base Navigation Bar Reorderer loaded');
				var baseTimerBar = qx.core.Init.getApplication().getGlobalBaseTimerBar().getChildren()[1];
				var btnToggleWindow=new qx.ui.form.Button("").set({toolTipText:"Reorder Bases"});
				baseTimerBar.add(btnToggleWindow);
				reorderWindow = new qx.ui.window.Window("BaseNavBar Reorderer", "").set({
					contentPaddingTop: 0,
					contentPaddingBottom: 7,
					contentPaddingRight: 7,
					contentPaddingLeft: 7,
					width: 200,
					showMaximize: false,
					showMinimize: false,
					allowMaximize: false,
					allowMinimize: false,
					resizable: false
				});
				reorderWindow.setLayout(new qx.ui.layout.Canvas());

				baseList = new qx.ui.form.List;
				baseList.set({ height: 300, width: 150, selectionMode : "single" });
				var btnMoveUp=new qx.ui.form.Button("↑").set({height:40,toolTipText:"Move Up"});
				var btnMoveDown=new qx.ui.form.Button("↓").set({height:40,toolTipText:"Move Down"});

				reorderWindow.add(btnMoveUp, {
					top: 105,
					right: 3
				});
				reorderWindow.add(btnMoveDown, {
					bottom: 110,
					right: 3
				});

				reorderWindow.add(baseList);
				myOrder = localStorage.ta_basenavbar_baseorder;
				if (!myOrder) {
					myOrder = getAllBases();
					localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
				}
				btnToggleWindow.addListener("click", toggleReorderWindow, this);
				btnMoveUp.addListener("click", moveUp, this);	
				btnMoveDown.addListener("click", moveDown, this);
				reorder();
			} catch (e) {
				console.log("createBaseNavReorder: ", e);
			}
		}

		function moveUp() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex > 0) baseList.addAt(baseList.getSelection()[0],curIndex-1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}

		function moveDown() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex < baseList.getChildren().length) baseList.addAt(baseList.getSelection()[0],curIndex+1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function saveOrder() {
			try {
				myOrder = [];
				for (var y in baseList.getChildren()) {
					myOrder.push(translateNameToId(baseList.getChildren()[y].getLabel()));
				}
				localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
			} catch (e) {
				console.log(e);
			}
		}

		function toggleReorderWindow() {
			try {
				if (reorderWindow.isVisible()) {
					reorderWindow.close();
					baseList.removeAll();
				} else {
					var reorderWindowLeft = qx.bom.Viewport.getWidth(window) - window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getWidth() - reorderWindow.getWidth();
					var reorderWindowTop = window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getHeight();
					reorderWindow.moveTo(reorderWindowLeft, reorderWindowTop);
					var item;
					myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);
					var newBases = getAllBases(); 
					for (var j in myOrder) {
						for (var i in newBases) {
							if (myOrder[j] === newBases[i]) {
								newBases.splice(i, 1);
								continue;
							}
						}
					}
					myOrder = myOrder.concat(newBases);
					reorderWindow.open();
					for (var x in myOrder) {
						item = new qx.ui.form.ListItem(translateIdToName(myOrder[x]));
						baseList.add(item);
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function reorder() {
			try {
				var baseNavigationBar = qx.core.Init.getApplication().getBaseNavigationBar().getChildren()[0].getChildren()[0];
				var baseButtons = baseNavigationBar.getChildren();
				myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);

				for (var i = myOrder.length; i > -1 ; i--) {
					for (var x in baseButtons) {
						if (typeof baseButtons[x].getChildren()[1].getChildren === 'function') {
							var navigationButton = baseButtons[x].getChildren()[1].getChildren()[0].getChildren()[2];
							if (navigationButton.getValue() === translateIdToName(myOrder[i])) {
								baseNavigationBar.addAt(baseButtons[x],0);
							}
						}
					}
				}
				window.setTimeout(reorder, reorderInterval);
			} catch (e) {
				console.log(e);
			}
		}

		function getAllBases() {
			try {
				bases = [];
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					bases.push(cityId);
				}
				return bases;
			} catch (e) {
				console.log(e);
			}
		}

		function translateIdToName(id) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					if (cityId === id) {
						return cities[cityId].get_Name();
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function translateNameToId(name) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var city in cities) {
					if (cities[city].get_Name() === name) {
						return city;
					}
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function BaseNavReorder_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getGlobalBaseTimerBar() && qx.core.Init.getApplication().getBaseNavigationBar()) {
					createBaseNavReorder();
				} else {
					window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("BaseNavReorder_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
		}
	}

	try {
		var BaseNavReorder = document.createElement("script");
		BaseNavReorder.innerHTML = "(" + BaseNavReorder_main.toString() + ")();";
		BaseNavReorder.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(BaseNavReorder);
		}
	} catch (e) {
		console.log("BaseNavReorder: init error: ", e);
	}
})();


/***********************************************************************************
CnC: MH Tiberium Alliances Available Loot Summary : 1.8.3				137978
***********************************************************************************/
// ==UserScript==
// @name          CnC: MHTools Tiberium Alliances Available Loot Summary + Info
// @namespace     MHTools.Loot
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @author        MrHIDEn based on Yaeger & Panavia code. Totaly recoded.
// @grant         none
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version       1.8.3
// ==/UserScript==

 

(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/m9I3B';//1.8.0
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            //this.reloadList();
            this.lootList.reloadList();
            //console.log(this.lootList);
            // extend
            this.extendOwnBase();   
            this.extendAllianceBase();
            this.extendForgottenCamp();
            this.extendForgottenBase();
            this.extendPlayerBase();
            //this.extendOptionsWindow();
            this.extendPOI();
            this.extendHUB();
            this.extendHUBServer();
            this.extendRUIN();
            this.extendSelectionChange();
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info loaded.'); 
          },
          statics : {
            VERSION: '1.8.3',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data
          },
          properties: {
          },
          members : {
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            
            // store v2 - compact
            //UNDERCONSTRUCTION
            lootList: {
              list: {
                l: [],
                max: 50,//na
                idx: 0,//na
              },
              storeName: 'MHToolsLootList2',
              getIndex: function() {//in use
                var res = -1;
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  for(i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) {
                      res = i;
                      break;
                    }
                  }
                } catch (e) {
                  console.warn("save: ", e);
                }
                return res;
              },
              reloadList: function() {//in use
                var S = ClientLib.Base.LocalStorage;
                var l;
                if (S.get_IsSupported()) l = S.GetItem(this.storeName);
                if(l!==null) this.list = l;
                console.log('MHTools: LootList reloaded/created');
              },
              save: function(d) {//in use
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var c = {id:id, Data:d};
                  var S = ClientLib.Base.LocalStorage;
                  for(var i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) 
                    {
                      // found
                      l[i] = c;
                      // JSON
                      if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);
                      // done
                      return;
                    }
                  }
                  // new
                  l[this.list.idx] = c;
                  if(++this.list.idx >= this.list.max) this.list.idx = 0;
                  // JSON
                  if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);   
                } catch (e) {
                  console.warn("save: ", e);
                }
              },
              load: function() {//in use
                try {
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var i = this.getIndex();
                  if(i>=0) return this.list.l[i];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("load: ", e);
                }
              },
              store: function(k, d) {//in use
                try {
                  var mem = this.load().Data;
                  mem[k] = d;
                  this.save(mem);        
                } catch (e) {
                  console.warn("store: ", e);
                }
              },
              restore: function(k) {//?? not in use
                console.log('this.lootList.restore');
                try {
                  var mem = this.load().Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("restore: ", e);
                }
              }              
            },
            // store   
            /*         
            // list: [],
            // listStoreName: 'MHToolsLootList',
            // reloadList: function() {
              // var S = ClientLib.Base.LocalStorage;
              // var l;
              // if (S.get_IsSupported()) l = S.GetItem(this.listStoreName);
              // if(l!==null) this.list = l;
              // this.list.max = 50;
              // this.list.idx = 0;
              // for(var i=0;i<this.list.max;i++) {
                // this.list.idx = i;
                // if(typeof(this.list[i])=='undefined') break;
              // }
              // console.log('MHTools: LootList reloaded/created');
            // },
            // getIndex: function() {
              // var l = this.list;
              // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              // //console.log('getIndex id=',id);
              // for(i=0;i<this.list.max;i++) {
                // if(typeof(l[i])=='undefined') continue;
                // if(l[i]===null) continue;
                // if(l[i].id == id) return i;
              // }
              // return -1;
            // },
            // save: function(d) {
            // //TODO some problems with refreshing
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // var c = {id:id, Data:d};
                // var S = ClientLib.Base.LocalStorage;
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) 
                  // {
                    // // found
                    // l[i] = c;
                    // // JSON
                    // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);
                    // // done
                    // return;
                  // }
                // }
                // // new
                // l[l.idx] = c;
                // if(++l.idx >= l.max) l.idx = 0;
                // // JSON
                // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);   
              // } catch (e) {
                // console.warn("save: ", e);
              // }
            // },
            // load: function() {
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) return l[i];
                // }
                // return {id:id,Data:{}};     
              // } catch (e) {
                // console.warn("load: ", e);
              // }
            // },
            // store: function(k, d) {
              // try {
                // var mem = this.load().Data;
                // mem[k] = d;
                // this.save(mem);        
              // } catch (e) {
                // console.warn("store: ", e);
              // }
            // },
            // restore: function(k) {//?? not in use
              // try {
                // var mem = this.load().Data;
                // if(typeof(mem[k])=='undefined') return 'undefined';
                // return mem[k];    
              // } catch (e) {
                // console.warn("restore: ", e);
              // }
            // },
            */
            // bases
            Data: {},
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,
            //waiting: [1,'','.','..','...','...?'],          
            waiting: [1,'>-','->','--','-<','<-','??'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    //ClientLib.Data.CityBuildings.prototype.kBuildings = d.Keys.Buildings;
                    //ClientLib.Data.CityBuildings.prototype.get_Buildings = function(){return this[this.kBuildings];};
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kOffenseUnits = d.Keys.Offences;
                    //ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){return this[this.kOffenseUnits];};
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kDefenseUnits = d.Keys.Defences;
                    //ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){return this[this.kDefenseUnits];};
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  //console.log('MHTools.Loot Helpers are ready');
                  //console.log('MHTools.Loot Helpers are ready:',d.Keys.Buildings,d.Keys.Defences,d.Keys.Offences);
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() {
                try {
                  if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                  
                  var d = this.Data;         
                              
                  d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  
                  if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                  d.lastSelectedBaseId = d.selectedBaseId;  
                  
                  d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                              
                  d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                  
                  //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                  d.ec = d.cc.get_CurrentCity();
                  if(d.ec === null) return false;
                  if(d.ec.get_CityBuildingsData() === null) return false;         
                  if(d.ec.get_CityUnitsData() === null) return false;         
                  
                  d.oc = d.cc.get_CurrentOwnCity();            
                  if(d.oc === null) return false;
                  if(d.oc.get_CityBuildingsData() === null) return false;
                  if(d.oc.get_CityUnitsData() === null) return false;
                  
                  d.ol = this.getData(d.oc);
                  d.el = this.getData(d.ec);// Buildings Defence Offence               
                  if(typeof(d.ol)=='undefined') return false;
                  if(typeof(d.el)=='undefined') return false;

                  if(d.el.Buildings.c === 0) return false;
                  if(d.ol.Buildings.c === 0) return false;
                  
                  //TEST
                  //console.log('loadBase.el:',d.el);
                  //console.log('loadBase.ol:',d.ol);
                  
                  d.loaded = true;
                  return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            calcResources: function () {
              try {          
                if (!this.settings.showLoot.v) return;

                if (!this.Data.loaded) return;
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store('lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function () {
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var current_hp = unit.get_Health();//EA API
                  troops[0] += current_hp;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += current_hp;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store('troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function () { 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  //CHECK
                  //my
                  //for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_HitpointsPercent();//0-1 means 0-100%
                  //ohp = 100.0 * ohp / ol.Offences.c;
                  //console.log('Health',ohp,oc.GetOffenseConditionInPercent());
                  //ohp = this.numberFormat(ohp, 0);
                  //ea
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  //console.log('oc',oc,'oc.get_LvlOffense()',oc.get_LvlOffense());
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function() {
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;
                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            calcDistance: function () {
              this.Display.distanceArray = [];
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null)// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                {
                  //if (this.Data === null) this.Data = {};
                  var t = visObject.get_VisObjectType();
                  
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  //console.log('Vis Object Type:',t,', ',LObjectType[t]);                  

                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  switch (t) {    
                    /* RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:  
                      //var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      //var pixelX = visObject.get_X();
                      //var pixelY = visObject.get_Y();
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var ecX = visObject.get_RawX();
                      var ecY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                      

                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, ecX, ecY);
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, ecX, ecY);
                      var cdt = oc.GetCityMoveCooldownTime(ecX,ecY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //console.log('Distance:',dis,'EMT:',this.dhms2(cdt),'Steps:',stp);
                      hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
                      break;
                    default:
                      break;
                  } 
                }
                //DISABLED this.lootList.store('distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            onSelectionChange: function(last,curr) {
              //return;
              try {
                //
                //TODO I rather move this to calcDistance and call it from extended widgets.
                //
                
                //ClientLib.Vis.SelectionChange
                //console.clear();
                //console.log('onSelectionChange, curr:',curr);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  //ClientLib.Vis.VisObject.EObjectType
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  console.log('Vis Object Type:',t,', ',LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  this.Data.visObject = visObject;
                  /* NOTE             
                  UnknownType
                  CityBuildingType
                  CityResourceFieldType
                  CityWallType
                  RegionCityType
                  RegionSuperWeaponType
                  RegionTerrainType
                  BattlegroundUnit
                  ArmyUnitType
                  ArmyDismissArea
                  DefenseUnitType
                  DefenseTerrainFieldType
                  RegionMoveTarget
                  RegionFreeSlotType
                  RegionNPCBase
                  RegionNPCCamp
                  RegionPointOfInterest
                  RegionRuin
                  RegionGhostCity
                  RegionNewPlayerSpot
                  DefenseTerrainFieldAdditionalSlosType
                  DefenseOffScreenUnit
                  WorldObject
                  WorldMapMarker
                  RegionHub
                   */
                  switch (t) {  
                    /* NOTE
                    RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    // case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                      // this.calcDistance();
                      // break;
                    // TEST
                    case ClientLib.Vis.VisObject.EObjectType.RegionHub:
                      //console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      //console.log(visObject.get_BuildingName());
                      //window.visObject = visObject;                    
                      break;                      
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;                    
                      // break;
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;
                      // break;
                    default:
                      break;
                  }
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            extendSelectionChange: function() {
              return;//disabled
              //webfrontend.Util.attachNetEvent(/*instance of object which calls the event*/, /*name of the event*/, /*type of the event*/, /*context object*/, /*callback function*/);
              webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            restoreDisplay: function() {
              //var idx = this.getIndex();  
              var idx = this.lootList.getIndex();  
              if(idx > -1) { 
                var d = this.lootList.list.l[idx].Data;            
                var da = this.Display.distanceArray;
                this.Display={};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                // a = this.Data.Distance;
                // if(typeof(a)!='undefined' && a<=10) {
                  c=0;
                  var w = this.waiting[this.waiting[0]];
                  if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                  //if (this.settings.showLoot.v) widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});
                  widget.add(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                // } else {
                  // c=0;
                  // widget.add(new qx.ui.basic.Label('<span style="color:yellow">Base is out of range.</span>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true
                // } 
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(widget) {
              //console.log('addResourcesLabel');
              try {
                widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;                
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j], {row: r, column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j-1], {row: r,column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // EXTEND UI
            /* NOTE
            RegionCityMenu
            RegionCityFoundInfo
            RegionGhostStatusInfo
            RegionCityStatusInfo
            RegionNPCBaseStatusInfo
            RegionHubStatusInfo
            RegionPointOfInterestStatusInfo
            RegionCityStatusInfoEnemy
            RegionCityList
            RegionCityInfo
            RegionNewPlayerSpotStatusInfo
            RegionRuinStatusInfo
            RegionCityStatusInfoOwn
            RegionCitySupportInfo
            RegionCityStatusInfoAlliance
            RegionCityMoveInfo
            RegionNPCCampStatusInfo
            */            
            extendOwnBase: function() {// BASE - Own
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase) {
                webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase = webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange = function () {
                try {            
                  if (!self.lootWindowOwn) {
                    self.lootWindowOwn = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowOwn.setTextColor('yellow');//yellow white            

                    var w = webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance();              
                    w.add(self.lootWindowOwn);
                  }
                  //clear                  
                  self.Display.distanceArray = [];
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.addFriendlyLabel(self.lootWindowOwn);
                  } else {
                    self.addLoadingLabel(self.lootWindowOwn);
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoOwn: ", e);
                }              
                this.__mhloot_showLootOwnBase();// run base function
              }
            },
            extendAllianceBase: function() {// BASE - Alliance
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase) {
                webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase = webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange;
              }// ^inject
              webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoAlliance:');
                try {  
        //todo wrap in function        
                  if (!self.lootWindowAlly) {
                    self.lootWindowAlly = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowAlly.setTextColor('yellow');//yellow             

                    var w = webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance();              
                    w.add(self.lootWindowAlly);
                  }           
                  self.calcDistance();
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.calcDistance();
                    self.addFriendlyLabel(self.lootWindowAlly);
                  } else {
                    self.addLoadingLabel(self.lootWindowAlly);
                  }
                } catch (e) {
                  console.warn("MHTools.Loot.RegionCityStatusInfoAlliance: ", e);
                }              
                this.__mhloot_showLootAllianceBase();
              }  
            },
            extendForgottenCamp: function() {// CAMP - Forgotten
              var self = this;          
              if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
                webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCCampStatusInfo:');
                try {
                  if (!self.lootWindowCamp) {
//TODO does it have , allowGrowX: true property?
                    self.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowCamp.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
                    widget.add(self.lootWindowCamp);
                  }                 
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowCamp);
                  } else {          
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowCamp);
                    } else {        
                      self.addLoadingLabel(self.lootWindowCamp);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCCampStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCCamp();
              }
            },
            extendForgottenBase: function() {// BASE - Forgotten
              var self = this;  
              if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase) {
                webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCBaseStatusInfo:');
                try {
                  if (!self.lootWindowBase) {
                    self.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowBase.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
                    widget.add(self.lootWindowBase);
                  }      
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowBase);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowBase);
                    } else {           
                      self.addLoadingLabel(self.lootWindowBase);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCBaseStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCBase();
              }
            },            
            extendPlayerBase: function() {// BASE - PvP
              var self = this; 
              if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase) {
                webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoEnemy:');
                try {
                  if (!self.lootWindowPlayer) {
                    self.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPlayer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
                    widget.add(self.lootWindowPlayer);
                  }
                  self.calcDistance();
                  if (self.loadBase()) {  
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo(); 
                    self.addResourcesLabel(self.lootWindowPlayer);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowPlayer);
                    } else {          
                      self.addLoadingLabel(self.lootWindowPlayer);
                    }      
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoEnemy: ", e);
                }

                this.__mhloot_showLootPlayerBase();
              }
            },            
            extendPOI: function() {// POI
              var self = this; 
              if (!webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI) {
                webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI = webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionPointOfInterestStatusInfo:');
                try {
                  if (!self.lootWindowPOI) {
                    self.lootWindowPOI = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPOI.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance();
                    widget.add(self.lootWindowPOI);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowPOI);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionPointOfInterestStatusInfo: ", e);
                }
                this.__mhloot_showLootPOI();
              }
            },
            extendHUB: function() {// HUB
              var self = this; 
              if (!webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubStatusInfo:');
                try {
                  if (!self.lootWindowHUB) {
                    self.lootWindowHUB = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUB.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubStatusInfo.getInstance();
                    widget.add(self.lootWindowHUB);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUB);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendHUBServer: function() {
              var self = this; 
              if (!webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubServerStatusInfo:');
                try {
                  if (!self.lootWindowHUBServer) {
                    self.lootWindowHUBServer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUBServer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubServerStatusInfo.getInstance();
                    widget.add(self.lootWindowHUBServer);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUBServer);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendRUIN: function() {// RUIN
              var self = this; 
              if (!webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN) {
                webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN = webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionRuinStatusInfo:');
                try {
                  if (!self.lootWindowRUIN) {
                    self.lootWindowRUIN = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowRUIN.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionRuinStatusInfo.getInstance();
                    widget.add(self.lootWindowRUIN);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowRUIN);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionRuinStatusInfo: ", e);
                }
                this.__mhloot_showLootRUIN();
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  }
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();


/***********************************************************************************
PluginsLib - mhShortcuts - Tiberium Alliances: 1.8.3						135806
***********************************************************************************/
// ==UserScript==
// @name           PluginsLib - mhShortcuts - Tiberium Alliances
// @author         MrHIDEn(game:PEEU)
// @description    Easy login to C&C from https://www.tiberiumalliances.com/login/auth
// @downloadURL    https://userscripts.org/scripts/source/135806.user.js
// @updateURL      https://userscripts.org/scripts/source/135806.meta.js
// @description    Get and plapce coordinates into a message with three useful keyboard shortcuts
// @description    Alt+A - popup window, Alt+S - insert [coords][/coords], 
// @description    Alt+P - popup window, insert [url][/url], 
// @description    Alt+X - magically insert [coords]x:y[/coords]. Earlier you must move  
// @description    your mouse cursor OVER the map "Coordinates".
// @description    Now it also make a sound when captured coordinates.
// @description    Alt+G - Collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+I - Insert to message/chat/post all your bases/cities info 
// @description    Alt+B - Repair all.
// @description    Alt+V - Get back to attack (just after unfinished battle) or attack selected base. This do NOT repair.
// @description    Alt+; - EA Simulation.
// @description    Ctrl+SPACE - Get back to attack (just after unfinished battle) or attack selected base. This DO repair.
// @description    Shortcuts Alt+X,A,S for coordinates
// @grant          none 
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.83
// ==/UserScript==

//** IMPORTANT **//
// For Login/Logout go to:
// http://userscripts.org/scripts/show/137955
// Code has been splited

(function () {
//var injectBody = function ()
function injectBody()
{  

  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhShortcuts";
  var created = false;
  //var spaceName = 'PluginsLib.mhShortcuts';
  function CreateClasses() {      
    // Classes
    //=======================================================      
    //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
    function OptionsPage() {
      try {
        qx.Class.define("PluginsLib.mhOptionsPage", 
        {
          type: 'singleton',
          extend: webfrontend.gui.options.OptionsPage,
          construct: function() {
            console.log('Create PluginsLib.mhOptionsPage at Shortcuts');
            this.base(arguments);
            this.setLabel('PluginsLib');
            
            this.extendOptionsWindow();
            
            //Add Content
            var container = this.getContentContainer();
            this.tabView = new qx.ui.tabview.TabView();
            container.add(this.tabView);//, {left:40, top:40});
            
            this.removeButtons();
            this.addPageAbout();
            console.log('PluginsLib.OptionsPage loaded.'); 
          },
          statics: {
            VERSION: '1.0.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'OptionsPage'
          },
          members: {
            pageCreated: null,
            tabView: null,
            getTabView: function() {
              return this.tabView;
            },
            addPage: function(name) {
              var c = this.tabView.getChildren();
              this.tabView.remove(c[c.length-1]);//remove PageAbout
              var page = new qx.ui.tabview.Page(name);
              page.set({height:220});
              this.tabView.add(page);
              this.addPageAbout();
              return page;
            },
            addPageAbout: function() {
              var page = new qx.ui.tabview.Page("About");
              page.set({height:220});
              this.tabView.add(page);
              page.setLayout(new qx.ui.layout.VBox());
              page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
              page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
            },
            removeButtons: function() {
              this.getChildren()[2].removeAll();
            },
            getContentContainer: function() {
                if(!this.contentCnt) {
                    this.contentCnt = this.getChildren()[0].getChildren()[0];
                }
                return this.contentCnt;
            },
            extendOptionsWindow: function() {
              var self = this;
              if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
              }
              webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                try {
                  var tabView = this.clientArea.getChildren()[0];
                  //console.log('B this.clientArea.getChildren()[0]',this.clientArea.getChildren()[0]);
                  tabView.add(self);
                  webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                  self.pageCreated = true;
                  this.show();
                } catch (e) {            
                  console.warn("PluginsLib.mhOptionsPage.extendOptionsWindow: ", e);
                }
              };
            }
          }
        });
      } catch (e) {
        console.warn("qx.Class.define(PluginsLib.mhOptionsPage: ", e);      
      }
    }
    //=======================================================
    // //Translation
    // qx.locale.Manager.getInstance().addTranslation('pl', {
    // 'Auto collect packages 1/30 sec.': 'Zbierz pakiety automatycznie 1/30 sec',
    // 'First, just move mouse cursor over some map coordinates numbers ex. 666:666': 'Wpierw przesun wskaźnik myszy nad współrzędne np. 666:666',
    // 'Replace coordinates. Ex. 500:500', 'Zamień współrzędne. Ex. 500:500',
    // 'Player: ', 'Gracz: '
    // });
    try {
      qx.Class.define("PluginsLib." + pluginName, //PluginsLib.mhShortcuts PluginsLib.mhShortcuts
      {
        type: "singleton",
        extend: qx.core.Object,
        statics : {
          NAME: 'Shortcuts',
          PLUGIN: 'MH Shortcuts',
          AUTHOR: 'MrHIDEn',
          VERSION: 1.83,
          REQUIRES: '',
          NEEDS: '',
          INFO: 'This script adds keyboard shortcuts to the game and allow you to quick login.',
          WWW: 'http://userscripts.org/scripts/show/135806',
          ONPLUGIN: null,
          ONOPTIONS: null,
          SIZE: 0
        },
        construct: function () {
          this.stats.src = 'http://goo.gl/i6mb1';//1.8.0
          //TODO: check with qooxdoo for better solution
          window.addEventListener("click", this.onClick, false);
          window.addEventListener("keyup", this.onKey, false);
          window.addEventListener("mouseover", this.onMouseOver, false);
          window.setInterval(this.getBonuses, 30000);
          console.log('this.addShortcutsPage();');
          this.addShortcutsPage();
          
          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED Part 2");
        },
        properties: {
        },
        members: {    
          stats: document.createElement('img'),      
          // setttings
          settings: {
            collectPackages:{v:true,  d:true,  l:'Auto collect packages 1/30 sec.'}
          },
          Coords: 'First, just move mouse cursor over some map coordinates numbers ex. 666:666',
          eaSimulator: function() {
            console.log('eaSimulator');
            try {
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
              var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
              ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
              var app = qx.core.Init.getApplication();
              app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.eaSimulator: ", e); 
            }
          },
          GetCaretPosition: function (ctrl) {
            var CaretPos = 0; // IE Support
            if (document.selection) {
              ctrl.focus();
              var Sel = document.selection.createRange();
              Sel.moveStart('character', -ctrl.value.length);
              CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
            return (CaretPos);
          },
          SetCaretPosition: function (ctrl, pos) {
            if (ctrl.setSelectionRange) {
              ctrl.focus();
              ctrl.setSelectionRange(pos, pos);
            } else if (ctrl.createTextRange) {
              var range = ctrl.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          },
          onKey: function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var tas = PluginsLib.mhShortcuts.getInstance();// ?=this

            // ALT+
            if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {

              switch (s) {
              case "A":
                // coords by popup window
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField !== null) {
                  this.Coords = prompt('Replace coordinates. Ex. 500:500', "");
                  if (this.Coords !== null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords]" + this.Coords + "[/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              case "X":
                // coords by moving mouse OVER map coordinates
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  if (this.Coords != null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords]" + this.Coords + "[/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              case "S":
                // coords by inserting [coords][/coords]
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  var position = tas.GetCaretPosition(inputField);
                  var txt = inputField.value;
                  var insert = "[coords][/coords]";
                  inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                  tas.SetCaretPosition(inputField, position + ("[coords]").length);
                }
                break;
              case "I":
                // player bases info to share with others
                var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
                  var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                  var txt = 'Player: ' + PlayerName + "\r\n";//----------------------------------\r\n";
                  var apcl = apc.get_AllCities().d;//all player cities list
                  for (var key in apcl) {
                    var c = apcl[key];
                    try {
                      var sd = c.get_SupportData();
                      var sn = '--';
                      var sl = '--';
                      if(sd !== null) {
                        sl = sd.get_Level().toString();
                        sn = c.get_SupportWeapon().dn; 
                      }                      
                      txt += "[b]" + c.get_Name() + "[/b]_________________________\r\n"; //m_Level
                      txt += "[u]Off: " + c.get_LvlOffense().toFixed(1).toString() + "[/u]  " + //"\r\n" +
                             "Def: " + c.get_LvlDefense().toFixed(1).toString() + "  " + "__" + //"\r\n" +
                             "Bas: " + c.get_LvlBase().toFixed(1).toString()    + "  " + //"\r\n" +
                             "[i]Sup: " + sl + " - " + sn + "[/i]\r\n";
                      //txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
                      //txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
                    } catch (e) {
                      console.warn("PluginsLib.mhShortcuts.INFO exception: ", e); 
                    }
                    //txt += "----------------------------------\r\n";
                  }
                  inputField.value += txt;
                }
                break;
              case "G":
                // Collect all resources at once manualy
                // log("G");
                // why this. does not work here. Do you know?
                this.PluginsLib.mhShortcuts.getInstance().getBonuses();
                //this.getBonuses();
                break;
              case "B":
                // Repair all armies
                this.PluginsLib.mhShortcuts.getInstance().repairAllArmies();
                //this.repairAllArmies();
                break;
              case "V":
                // Go back to fight without repair
                this.PluginsLib.mhShortcuts.getInstance().goBackToFight();
                break;
              case "L":
              case ";":
                console.log('eaSim key:',s);
                this.PluginsLib.mhShortcuts.getInstance().eaSimulator();
                //this.eaSimulator();
                break;
              case "P":
                // URL by popup window
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  this.Coords = prompt("Enter URL", "");
                  if (Coords != null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[url]" + this.Coords + "[/url]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + insert.length);
                  }
                }
                break;
              default:
                // Other letters
                //log("Other letter (" + s + ")");
                break;
              }
            } // CTRL+
            else if (!ev.altKey && ev.ctrlKey && !ev.shiftKey && !ev.altGraphKey) {              
              switch (s) {
              case " ":
                // Repair current army and go back to fight
                this.PluginsLib.mhShortcuts.getInstance().repairArmyAndBack();
                break;
              default:
                // Other letters
                //log("Other letter (" + s + ")");
              }
            }
          },
          onMouseOver: function (ev) {
            //log("onMouseOver");						
            var tag = ev.target.tagName;
            if (tag == "B" || tag == "DIV" || tag == "A") {
              var s = ev.target.textContent;
              var semicolon = s.indexOf(":");
              if (semicolon > 0) {
                var n1 = s.substring(0, semicolon);
                var n2 = s.substring(semicolon + 1, s.length);
                if (isFinite(n1) && isFinite(n2)) {
                  if(s.length==5 && s[0]=="0") return;
                  this.Coords = s;
                  //ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
                }
              }
            }
          },
          //window.setInterval(this.getBonuses, 30000);
          getBonuses: function () {
            try {
              if(!PluginsLib.mhShortcuts) return;
              if(!PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].v) return;
              
              var apc = ClientLib.Data.MainData.GetInstance().get_Cities();
              var apcl = apc.get_AllCities().d;
              var ps = false;
              for (var key in apcl) {
                apcl[key].CollectAllResources();
                
                // EA There is no API for this function. It is on API list but it is obfusticated.
                
                //ps |= apcl[key].get_CanCollectResources();
              }
              if(ps) {
                ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectCrystal');
              }
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.getBonuses: ", e); 
            }
          },//button Alt+V
          goBackToFight: function () {
            // GET BACK TO FIGTH == ATTACK
            try {	// NOTICE Under construction
              var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var oci = pc.get_CurrentOwnCityId();
              var tci = pc.get_CurrentCityId();  
              if (oci > 0 && tci > 0 && oci != tci) {// add timer
                var tc = pc.get_CurrentCity();         
                if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                  webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                }
              }                           
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.goBackToFight: ", e);
            }
          },
          //button Alt+B
          repairAllArmies: function () {
            //console.log('repairAllArmies');
            // REPAIR ALL OWN ARMIES
            try {	// NOTICE Under construction
              //var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var cx = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
              console.log('cx',cx);
              for(var key in cx) {
                var oc = cx[key];
                console.log('key',key);
                oc.RepairAllOffense();
              }                   
              ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");         
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.repairAllArmies: ", e);
            }
          },
          //button Ctrl+SPACE
          repairArmyAndBack: function () {
            // REPAIR CURRENT ARMY AND GET BACK TO FIGTH
            try {	// NOTICE Under construction
              var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
              var oci = pc.get_CurrentOwnCityId();//own city                
              if (oci > 0 ) {
                //var c = pc.GetCity(oci);//works, it could be useful with JSON + storage
                var oc = pc.get_CurrentOwnCity();
                if(oc.CanRepairAllOffense()) {
                  oc.RepairAllOffense();
                  ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");
                }
                var tci = pc.get_CurrentCityId();//target city -1 non selected, tci=oci you are in your base, tci>0 you are watching on other base
                if (tci > 0 && oci != tci) {// add timer           
                  var tc = pc.get_CurrentCity();         
                  if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                    webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                  }
                }  
              }                            
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.repairArmyAndBack: ", e);
            }
          },
          // NOTE
          /*
          //#use(qx.event.handler.Keyboard)
          var find = new qx.ui.core.Command("Alt+L");
          find.addListener("execute", _onFind, this);
          function _onFind() {  console.log('Find');}
          */
          
          // OPTIONS
          optionsTab: null,
          optionsPage: null,
          btnApply: null,
          //rebuild with new approach
          optionsStoreName: 'mhShortcutsOptions',
          addShortcutsPage: function() {            
            console.log('addShortcutsPage');
            try {
              if(!PluginsLib.mhOptionsPage) OptionsPage();
              
              if(!this.optionsTab) {
                //Create Tab
                this.optionsTab = PluginsLib.mhOptionsPage.getInstance();
              }       
          //console.log('this.optionsTab',this.optionsTab);
              this.optionsPage = this.optionsTab.addPage("Shortcuts");
              this.optionsPage.setLayout(new qx.ui.layout.VBox());
              this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
              this.settings['collectPackages'].obj = new qx.ui.form.CheckBox(this.settings['collectPackages'].l).set({
                value: this.settings['collectPackages'].v,
                marginLeft: 10
              });
              this.settings['collectPackages'].obj.addListener("execute", this.optionsChanged, this);

              this.optionsPage.add(this.settings['collectPackages'].obj);//, {row:1+i++, column:3}); 
              
              this.loadOptions();
              this.addButtons();              
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.addShortcutsPage: ", e);
            }
          },
          optionsChanged: function() {
            var c = false;
            for(var k in this.settings) {
              c = c || (this.settings[k].v != this.settings[k].obj.getValue());
            }
            this.btnApply.setEnabled(c);
          },
          addButtons: function() {
            try {
              this.btnApply = new qx.ui.form.Button("Apply");
              this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
              
              var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
              c.setMarginTop(20);
              c.add(this.btnApply);
              this.optionsPage.add(c);
              
              this.btnApply.addListener("execute", this.applyOptions, this); 
              this.btnApply.setEnabled(false);
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.addButtons: ", e);
            }
          },
          applyOptions: function(e) {
            //console.log("applyOptions e:",e);
            this.saveOptions();
            this.btnApply.setEnabled(false); 
          },
          saveOptions: function() {   
            //PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].obj.basename == "CheckBox"
            var c = {};
            var i = 0;
            for(var k in this.settings) {
              c[k] = this.settings[k].obj.getValue();
              this.settings[k].v = c[k];
            }
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
          },
          loadOptions: function() {
            try {
              var c = {};            
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
              //console.log('loadOptions c:',c);
              if(c===null) c = {};
              var i = 0;              
              for(var k in this.settings) {
                if(typeof(c[k])!='undefined') {
                  this.settings[k].obj.setValue(c[k]);
                  this.settings[k].v = c[k];
                } else {
                  this.settings[k].obj.setValue(this.settings[k].d);
                  this.settings[k].v = this.settings[k].d;
                }
              }             
            } catch (e) {
                console.warn("PluginsLib.mhShortcuts.loadOptions: ", e);
            }
          }
        } // members
      });          
    } catch (e) {
      console.warn("qx.Class.define(PluginsLib.mhShortcuts: ", e);      
    }
    //=======================================================
    // START
    PluginsLib.mhShortcuts.getInstance();
  }//CreateClasses()
  // Loading
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}

// Injecting
function Inject() {
  if (window.location.pathname != "/login/auth") {
    var script = document.createElement('script');
    var txt = injectBody.toString();
    txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }
}    
Inject();
})();


/***********************************************************************************
PluginsLib - mhNavigator - Tiberium Alliances - Version: 1.34				159496
***********************************************************************************/
// ==UserScript==
// @name          PluginsLib - mhNavigator - Tiberium Alliances
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description   Creates compass poiting to the currently selected base (compass points from itself).
// @version       1.35
// @author        MrHIDEn (in game PEEU) based on Caine code. Extended
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/159496.user.js
// @updateURL     https://userscripts.org/scripts/source/159496.meta.js
// ==/UserScript==
(function () {
function injectBody()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhNavigator";
  var created = false;
  function CreateClasses() {
    function classExist(name) {
      if(name===null || name===undefined) return;
      var sp = name.split('.');
      var w = window;
      for(var i=0;i<sp.length;i++) {
        w = w[sp[i]];
        if(w===undefined) {
          return false;
        }
      }
      return true;
    }
    if(!classExist('qx.html.Canvas')) {
      qx.Class.define("qx.html.Canvas",
      {
        extend : qx.html.Element,
        construct : function(styles, attributes)
        {
          this.base(arguments, "canvas", styles, attributes);
          this.__canvas = document.createElement("canvas");
        },
        members :
        {
          __canvas : null,
          _createDomElement : function() {
            return this.__canvas;
          },
          getCanvas : function() {
            return this.__canvas;
          },
          setWidth : function(width) {
            this.__canvas.width = width;
          },
          getWidth : function() {
            return this.__canvas.width;
          },
          setHeight : function(height) {
            this.__canvas.height = height;
          },
          getHeight : function() {
            return this.__canvas.height;
          },
          getContext2d : function() {
            return this.__canvas.getContext("2d");
          }
        },
        destruct : function() {
          this.__canvas = null;
        }
      });
      cci('qx.html.Canvas ADDED');
    }
    if(!classExist('qx.ui.embed.Canvas')) {
      qx.Class.define("qx.ui.embed.Canvas",
      {
        extend : qx.ui.core.Widget,
        construct : function(canvasWidth, canvasHeight)
        {
          this.base(arguments);
          this.__deferredDraw = new qx.util.DeferredCall(this.__redraw, this);
          this.addListener("resize", this._onResize, this);
          if (canvasWidth !== undefined) {
            this.setCanvasWidth(canvasWidth);
          }
          if (canvasHeight !== undefined) {
            this.setCanvasHeight(canvasHeight);
          }
        },
        events :
        {
          "redraw" : "qx.event.type.Data"
        },
        properties :
        {
          syncDimension :
          {
            check : "Boolean",
            init : false
          },
          canvasWidth :
          {
            check : "Integer",
            init : 300,
            apply : "_applyCanvasWidth"
          },
          canvasHeight :
          {
            check : "Integer",
            init : 150,
            apply : "_applyCanvasHeight"
          }
        },
        members :
        {
          __deferredDraw : null,
          _createContentElement : function() {
            return new qx.html.Canvas();
          },
          __redraw : function()
          {
            var canvas = this.getContentElement();
            var height = canvas.getHeight();
            var width = canvas.getWidth();
            var context = canvas.getContext2d();
            this._draw(width, height, context);
            this.fireNonBubblingEvent(
              "redraw",
              qx.event.type.Data,
              [{
                width: width,
                height: height,
                context: context
              }]
            );
          },
          _applyCanvasWidth : function(value, old)
          {
            this.getContentElement().setWidth(value);
            this.__deferredDraw.schedule();
          },
          _applyCanvasHeight : function(value, old)
          {
            this.getContentElement().setHeight(value);
            this.__deferredDraw.schedule();
          },
          update : function() {
            this.__deferredDraw.schedule();
          },
          _onResize : function(e)
          {
            var data = e.getData();

            if (this.getSyncDimension())
            {
              this.setCanvasHeight(data.height);
              this.setCanvasWidth(data.width);
            }
          },
          getContext2d : function() {
            return this.getContentElement().getContext2d();
          },
          _draw : function(width, height, context) {}
        },
        destruct : function() {
          this._disposeObjects("__deferredDraw");
        }
      });
      cci('qx.ui.embed.Canvas ADDED');
    }
    // MAIN BODY
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: 'singleton',
      extend: qx.core.Object,
      statics : {
        NAME: 'Navigator',
        PLUGIN: 'mhNavigator',
        AUTHOR: 'MrHIDEn',
        VERSION: 1.35,
        REQUIRES: '',
        NEEDS: 'Menu',
        INFO: 'This script uses compas look like navigator.',
        WWW: 'http://userscripts.org/scripts/show/159496',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },
      construct: function() {
        try {
          this.stats.src = 'http://goo.gl/aeCxf';//1.0.0 1.1.0 1.2.0 1.3x
          this.Self = this;
          var backColor = '#eeeeff';          
          //var STATIC = PluginsLib[this.basename];
          var serv = ClientLib.Data.MainData.GetInstance().get_Server();
          this.cenX = serv.get_ContinentWidth() / 2;
          this.cenY = serv.get_ContinentHeight() / 2;
          var pos = this.loadFromStorage('lock', {x:this.cenX, y:this.cenY});
          this.lockX = pos.x;
          this.lockY = pos.y;
          this.posTimer = new qx.event.Timer();
          this.posTimer.addListener("interval",this.onPosTimer,this);
          //this.winName = "Navigator " + PluginsLib.mhNavigator.VERSION.toFixed(2);
          this.winName = "Navigator " + this.constructor.VERSION.toFixed(2);
          this.win = new qx.ui.window.Window(this.winName);
          this.win.set({
            width:120,
            //showMinimize:false,
            showMaximize:false,
            showClose:false,
            padding: 1,
            //contentPadding: 6,
            allowClose:false,
            //allowMinimize:false,
            resizable:false,
            toolTipText: "MrHIDEn tool - Navigator."
          });
          this.win.addListener("minimize",function(e) {
            if(this.extMinimized) {
              this.extMinimized = false;
              for(var k in this.extItems) this.win.add(this.extItems[k]);
            }
            else {
              this.extMinimized = true;
              this.win.removeAll();
            }
            this.win.restore();//trick
          },this);
          this.win.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.saveToStorage('winpos', pos);
          }, this);
          pos = this.loadFromStorage('winpos', {left:130, top:5});
          this.win.moveTo(pos.left, pos.top);
          var winLayout = new qx.ui.layout.VBox();
          winLayout.setAlignX("center");
          this.win.setLayout(winLayout);

          var winXYLayout = new qx.ui.layout.VBox();
          this.winXY = new qx.ui.window.Window("Go to x:y");
          this.winXY.set({
            width:170,
            height:50,
            showMinimize:false,
            showMaximize:false,
            showClose:true,
            //contentPadding: 6,
            padding: 1,
            resizable:false
            //layout:winXYLayout
          });
          this.winXY.setLayout(winXYLayout);
          this.winXY.setToolTipText('Proper values:<br>333 444<br>333:444<br>333;444<br>333,444<br>333.444<br>[coords]333:444[/coords]');
          var cntXY = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          //cntXY.setThemedBackgroundColor(backColor);
          cntXY.setBackgroundColor(backColor);
          var lblXY = new qx.ui.basic.Label('Write X:Y and press [Enter]');
          this.txtXY = new qx.ui.form.TextField('');
          this.txtXY.set(
          {
            required    : true,
            placeholder : "Ex: 333:444"
          });
          this.txtXY.addListener("keydown", function(e) {
            if(e.getKeyIdentifier()=="Enter") {
              var txt = this.txtXY.getValue();
              if(txt.length>2) {
                  txt = txt.trim();
                  txt = txt.replace('[coords]','').replace('[/coords]','');
                  txt = txt.replace(' ',':');
                  txt = txt.replace(';',':');
                  txt = txt.replace(',',':');
                  txt = txt.replace('.',':');
                  var s = txt.split(':');
                  if(s.length==2) {
                    var x = s[0];
                    var y = s[1];
                    if(!isNaN(parseInt(x)) && !isNaN(parseInt(y))) {
                      x = parseInt(x);
                      y = parseInt(y);
                      webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(x,y);
                      this.txtXY.setValue('');
                      this.winXY.close();
                    }
                  }
                  return;
              }
              alert('Use:\nnumers and one of allowed separators \' :;,.\' \nor [coords]333:444[/coords]');
            }
          }, this);
          this.winXY.add(cntXY);
          cntXY.add(lblXY);
          cntXY.add(this.txtXY);


          // Compass 1 //////////////////////////////////////////////////////////////
          var canvas1 = new qx.ui.embed.Canvas();
          canvas1.set({
            width: 50,
            height: 50,
            canvasWidth: 50,
            canvasHeight: 50,
            toolTipText: "Pointing selected base."
          });
          canvas1.addListener("click",function(e) {
            var cid  = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
            webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cid);
            this.displayCompass();
          },this);
          canvas1.set({
            toolTipText: "Click - go to."
          });
          var hboxNav1 = new qx.ui.layout.HBox();
          hboxNav1.setAlignX("center");
          var cntNav1 = new qx.ui.container.Composite();
          cntNav1.setLayout(hboxNav1);
          //cntNav1.setThemedBackgroundColor(backColor);
          cntNav1.setBackgroundColor(backColor);
          cntNav1.add(canvas1);
          this.ctx1 = canvas1.getContext2d();
          // add
          this.extItems.push(cntNav1);

          // Info //////////////////////////////////////////////////////////////
          var vboxInfo1 = new qx.ui.layout.VBox();
          vboxInfo1.setAlignX("center");
          var cntInfo1 = new qx.ui.container.Composite();
          cntInfo1.setLayout(vboxInfo1);
          //cntInfo1.setThemedBackgroundColor(backColor);
          cntInfo1.setBackgroundColor(backColor);
          cntInfo1.setThemedFont("bold");
          this.disBase = new qx.ui.basic.Label('0');
          this.disBase.set({
            toolTipText: "Distance from your current base to the center of view."
          });
          cntInfo1.add(new qx.ui.basic.Label("Current Base"));
          cntInfo1.add(this.disBase);
          // add
          this.extItems.push(cntInfo1);

          // Compass 2 //////////////////////////////////////////////////////////////
          var canvas2 = new qx.ui.embed.Canvas();
          canvas2.set({
            width: 50,
            height: 50,
            canvasWidth: 50,
            canvasHeight: 50,
            toolTipText: "Pointing locked base. Click this to lock center of the map."
          });
          canvas2.addListener("click",function(e) {
            webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.lockX,this.lockY);
          },this);
          canvas2.set({
            toolTipText: "Click - go to."
          });
          var hboxNav2 = new qx.ui.layout.HBox();
          hboxNav2.setAlignX("center");
          var cntNav2 = new qx.ui.container.Composite();
          cntNav2.setLayout(hboxNav2);
          //cntNav2.setThemedBackgroundColor(backColor);
          cntNav2.setBackgroundColor(backColor);
          cntNav2.add(canvas2);
          this.ctx2 = canvas2.getContext2d();
          // add
          this.extItems.push(cntNav2);


          var vboxInfo2 = new qx.ui.layout.VBox();
          vboxInfo2.setAlignX("center");
          var cntInfo2 = new qx.ui.container.Composite();
          cntInfo2.setLayout(vboxInfo2);
          //cntInfo2.setThemedBackgroundColor(backColor);
          cntInfo2.setBackgroundColor(backColor);
          cntInfo2.setThemedFont("bold");

          this.coordLock = new qx.ui.basic.Label(this.lockX.toString()+':'+this.lockY.toString());//('X:Y');
          //this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
          this.coordLock.set({
            toolTipText: "Click - set center of map."
          });
          this.coordLock.addListener("click",function(e) {
            var serv = ClientLib.Data.MainData.GetInstance().get_Server();
            this.lockX = serv.get_ContinentWidth() / 2;
            this.lockY = serv.get_ContinentHeight() / 2;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.saveToStorage('lock', {x:this.lockX,y:this.lockY});
            this.displayCompass();
          },this);
          this.disLock = new qx.ui.basic.Label('0');
          this.disLock.set({
            toolTipText: "Distance from locked object to the selected object."
          });
          var btnXY = new qx.ui.form.Button("X:Y");
          btnXY.set({
            width:50,
            toolTipText: "Go to position."
          });
          btnXY.addListener("execute", function(e) {
            var lp = this.win.getLayoutProperties();
            this.winXY.moveTo(lp.left, lp.top+150);
            this.winXY.open();
            this.txtXY.focus();
          }, this);
          var btnLock = new qx.ui.form.Button("Lock");
          btnLock.set({
            width:60,
            toolTipText: "Lock position of the selected object."
          });
          btnLock.addListener("execute", function(e) {
            this.lockX = this.selX;
            this.lockY = this.selY;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.saveToStorage('lock', {x:this.lockX,y:this.lockY});
            this.displayCompass();
          }, this);
          cntInfo2.add(this.coordLock);
          cntInfo2.add(this.disLock);
          // add
          this.extItems.push(cntInfo2);

          var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          //cntButtons.setThemedBackgroundColor(backColor);
          cntButtons.setBackgroundColor(backColor);
          cntButtons.add(btnXY);
          cntButtons.add(btnLock);
          // add
          this.extItems.push(cntButtons);

          for(var k in this.extItems) this.win.add(this.extItems[k]);

          this.win.open();

          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);

          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        } catch (e) {
          console.error(this.classname,".construct: ", e);
        }
      },
      members: {
        Self: null,
        stats: document.createElement('img'),
        winName: '',
        win: null,
        extItems: [],
        extMinimized: false,
        winXY: null,
        txtXY: null,
        posTimer: null,
        disBase: null,
        disObj: null,
        coordLock: null,
        disLock: null,
        ctx1: null,
        ctx2: null,
        background: null,
        size: 50,
        LObjectType: [],
        selX: -1,
        selY: -1,
        lockX: 0,
        lockY: 0,
        cenX: 0,
        cenY: 0,
        selected: null,
        visObject: null,
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var val = S.GetItem(this.classname+'.'+key);
            if(val!==null) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val) {
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.classname+'.'+key, val);
          }
        },
        onPositionChange: function (e) {
          //console.log('onPositionChange');
          this.posTimer.restartWith(200);
        },
        onPosTimer: function (e) {
          //console.log('onPosTimer');
          this.posTimer.stop();
          this.displayCompass();
        },
        onSelectionChange: function (l,c) {
          //console.log('onSelectionChange.c:',c);
          try {
            var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
            if (visObject!==null) {
              var t = visObject.get_VisObjectType();
              switch (t) {
                /* NOTE
                RegionCityType
                RegionSuperWeaponType
                RegionTerrainType
                RegionMoveTarget
                RegionFreeSlotType
                RegionNPCBase
                RegionNPCCamp
                RegionPointOfInterest
                RegionRuin
                RegionGhostCity
                RegionNewPlayerSpot
                RegionHub  */
                case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                  //this.calcDistance();
                  //console.log('visObject:',visObject);
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  this.visObject = visObject;
                  this.selX = visObject.get_RawX();
                  this.selY = visObject.get_RawY();
                  this.selected = true;
                  this.displayCompass();
                  break;
                default:
                  break;
              }
            }
          } catch (e) {
            console.error(this.classname,".onSelectionChange", e);
          }
        },
        displayCompass: function () {
          //console.log('displayCompass:');
          try {
            if(this.ctx1===null) return;
            if(this.ctx2===null) return;
            var ctx1 = this.ctx1;
            var ctx2 = this.ctx2;
            var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var cityCoordX = currentCity.get_PosX();
            var cityCoordY = currentCity.get_PosY();
            if(this.selX==-1 && this.selY==-1) {
              this.selX = currentCity.get_PosX();
              this.selY = currentCity.get_PosY();
              //this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            }

            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var gridW = region.get_GridWidth();
            var gridH = region.get_GridHeight();
            var regionX = region.get_PosX();
            var regionY = region.get_PosY();
            var viewW = region.get_ViewWidth();
            var viewH = region.get_ViewHeight();
            var zoom = region.get_ZoomFactor();

            var viewCoordX = (regionX + viewW / 2 / zoom) / gridW - 0.5;
            var viewCoordY = (regionY + viewH / 2 / zoom) / gridH - 0.5;

            var dx = viewCoordX - cityCoordX;
            var dy = cityCoordY - viewCoordY;
            var distance = Math.sqrt(dx * dx + dy * dy);

            ctx1.clearRect(0, 0, 50, 50);
            ctx1.save();
            ctx1.translate(25, 25);
            ctx1.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));
            this.drawCompass(ctx1);
            ctx1.restore();

            var dx2 = this.selX - this.lockX;
            var dy2 = this.lockY - this.selY;
            var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            ctx2.clearRect(0, 0, 50, 50);
            ctx2.save();
            ctx2.translate(25, 25);
            ctx2.rotate(dy2 > 0 ? Math.asin(dx2 / distance2) + Math.PI : -Math.asin(dx2 / distance2));
            this.drawCompass(ctx2);
            ctx2.restore();

            this.disBase.setValue(distance.toFixed(1).toString());
            var ltext = ClientLib.Base.Util.CalculateDistance(this.lockX, this.lockY, this.selX, this.selY);
            this.disLock.setValue(ltext.toString());


          } catch (e) {
            console.error(this.classname,".displayCompass", e);
          }
        },
        drawCompass: function(c) {
          //console.log('drawCompass:');
          c.strokeStyle = 'black';
          c.beginPath();
          c.arc(0,0,20,0,Math.PI*2,true); // Outer circle
          c.stroke();

          c.strokeStyle = 'black';
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(0, -20);  // Line
          c.closePath();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'white';
          c.arc(0,0,4,0,Math.PI*2,true); // Inner dot
          c.fill();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'aqua';
          c.arc(0,-20,4,0,Math.PI*2,true); // Outer dot
          c.fill();
          c.stroke();
        }
      }
    });
  }//CreateClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();


/***********************************************************************************
C&C:Tiberium Alliances Coords Button - All - Version: 2.0.1					167957
***********************************************************************************/
// ==UserScript==
// @name        C&C:Tiberium Alliances Coords Button - All
// @namespace   CNCTACoordsButtonAll
// @description Copy & Paste selected world object coords to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     2.0.1
// @author Bruce Doan, Chiantii
// @updateURL   https://userscripts.org/scripts/source/167957.meta.js
// @downloadURL https://userscripts.org/scripts/source/167957.user.js
// ==/UserScript==
(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();


/***********************************************************************************
WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: 13.10.30			167564
***********************************************************************************/
// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
// @description     Upgrade your Base,Defense Army to a specific Level.
// @author          Eistee
// @version         13.10.30
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/167564.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/167564/large.png
// @updateURL       https://userscripts.org/scripts/source/167564.meta.js
// @downloadURL     https://userscripts.org/scripts/source/167564.user.js
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 *
 *  thx to TheStriker for his API knowledge.
 *
 */
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("Upgrade", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					try {
						var qxApp = qx.core.Init.getApplication();

						var stats = document.createElement('img')
						stats.src = "http://goo.gl/BuvwKs"; // http://goo.gl/#analytics/goo.gl/BuvwKs/all_time

						var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
							toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
							alignY: "middle",
							show: "icon",
							width : 60,
							allowGrowX : false,
							allowGrowY : false,
							appearance : "button"
						});
						btnUpgrade.addListener("click", this.toggleWindow, this);

						var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
						btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
					} catch (e) {
						console.log("Error setting up Upgrade Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					toggleWindow: function () {
						if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
						else Upgrade.Window.getInstance().open();
					}
				}
			});
			qx.Class.define("Upgrade.Window", {
				type: "singleton",
				extend: qx.ui.window.Window,
				construct: function () {
					try {
						this.base(arguments);
						this.set({
							layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
							contentPadding: 5,
							contentPaddingTop: 0,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							resizable: false
						});
						this.moveTo(124, 31);
						this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

						this.add(new Upgrade.Current());
						this.add(new Upgrade.All());
						this.add(new Upgrade.Repairtime());

						this.addListener("appear", this.onOpen, this);
						this.addListener("close", this.onClose, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Window Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					onOpen: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onClose: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
					},
					onViewModeChanged: function (oldMode, newMode) {
						if (oldMode !== newMode) {
							var qxApp = qx.core.Init.getApplication();
							switch (newMode) {
							case ClientLib.Vis.Mode.City:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
								this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
								this.setIcon("FactionUI/icons/icon_def_army_points.png");
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
								this.setIcon("FactionUI/icons/icon_army_points.png");
								break;
							default:
								this.close();
								break;
							}
						}
					},
				}
			});
			qx.Class.define("Upgrade.All", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));

						var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
						level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
						level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
						this.txtLevel.addListener("changeValue", this.onInput, this);
						level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
						this.btnLevel.addListener("execute", this.onUpgrade, this);
						this.add(level);

						var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
						var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
						this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
						this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
						this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
						this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
						this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
						this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						requires.add(resource);
						this.add(requires);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.All Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					txtLevel: null,
					btnLevel: null,
					resTiberium: null,
					resChrystal: null,
					resPower: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onViewModeChanged: function (oldViewMode, newViewMode) {
						if (oldViewMode !== newViewMode) {
							switch (newViewMode) {
							case ClientLib.Vis.Mode.City:
								this.title.setValue(this.tr("All buildings"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.title.setValue(this.tr("All defense units"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.title.setValue(this.tr("All army units"));
								this.reset();
								break;
							}
						}
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.reset();
						}
					},
					getResTime: function (need, type) {
						var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						need -= CurrentOwnCity.GetResourceCount(type);
						need = Math.max(0, need);
						var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
						var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
						var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
						return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
					},
					getUpgradeCostsToLevel: function (newLevel) {
						if (newLevel > 0) {
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
							case ClientLib.Vis.Mode.City:
								return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
							case ClientLib.Vis.Mode.DefenseSetup:
								return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
							case ClientLib.Vis.Mode.ArmySetup:
								return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
							}
						}
						return null;
					},
					getLowLevel: function () {
						for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
							var costs = this.getUpgradeCostsToLevel(newLevel);
							if (costs !== null) {
								for (var i = 0; i < costs.length; i++) {
									var uCosts = costs[i];
									var cType = parseInt(uCosts.Type, 10);
									switch (cType) {
									case ClientLib.Base.EResourceType.Tiberium:
										Tib += uCosts.Count;
										break;
									case ClientLib.Base.EResourceType.Crystal:
										Cry += uCosts.Count;
										break;
									case ClientLib.Base.EResourceType.Power:
										Pow += uCosts.Count;
										break;
									}
								}
							}
						}
						return (newLevel === 1000?0:(newLevel - 1));
					},
					reset: function () {
						var LowLevel = this.getLowLevel();
						if (LowLevel > 0) {
							this.txtLevel.setMinimum(LowLevel);
							this.txtLevel.setMaximum(LowLevel + 50);
							this.txtLevel.setValue(LowLevel);
							this.txtLevel.setEnabled(true);
							this.btnLevel.setEnabled(true);
						} else {
							this.txtLevel.setMinimum(0);
							this.txtLevel.setMaximum(0);
							this.txtLevel.resetValue();
							this.txtLevel.setEnabled(false);
							this.btnLevel.setEnabled(false);
						}
						this.onInput();
					},
					onTick: function () {
						this.onInput();
					},
					onInput: function () {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						var costs = this.getUpgradeCostsToLevel(newLevel);
						if (newLevel > 0 && costs !== null) {
							for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
								var uCosts = costs[i];
								switch (parseInt(uCosts.Type, 10)) {
								case ClientLib.Base.EResourceType.Tiberium:
									Tib += uCosts.Count;
									TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
									break;
								case ClientLib.Base.EResourceType.Crystal:
									Cry += uCosts.Count;
									CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
									break;
								case ClientLib.Base.EResourceType.Power:
									Pow += uCosts.Count;
									PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
									break;
								}
							}
							this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
							this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
							if (Tib === 0) this.resTiberium.exclude();
							else this.resTiberium.show();
							this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
							this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
							if (Cry === 0) this.resChrystal.exclude();
							else this.resChrystal.show();
							this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
							this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
							if (Pow === 0) this.resPower.exclude();
							else this.resPower.show();
						} else {
							this.resTiberium.setLabel("-");
							this.resTiberium.resetToolTipText();
							this.resTiberium.show();
							this.resChrystal.setLabel("-");
							this.resChrystal.resetToolTipText();
							this.resChrystal.show();
							this.resPower.setLabel("-");
							this.resPower.resetToolTipText();
							this.resPower.show();
						}
					},
					onUpgrade: function () {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						if (newLevel > 0) {
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
							case ClientLib.Vis.Mode.City:
								ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
								this.reset()
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								this.reset()
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								this.reset()
								break;
							}
						}
					}
				}
			});
			qx.Class.define("Upgrade.Current", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
						this.add(this.txtSelected = new qx.ui.basic.Label("").set({ alignX: "center" }));

						var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
						level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
						level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
						this.txtLevel.addListener("changeValue", this.onInput, this);
						level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
						this.btnLevel.addListener("execute", this.onUpgrade, this);
						this.add(level);

						var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
						var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
						this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
						this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
						this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
						this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
						this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
						this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						requires.add(resource);
						this.add(requires);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Current Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					txtSelected: null,
					txtLevel: null,
					btnLevel: null,
					resTiberium: null,
					resChrystal: null,
					resPower: null,
					Selection: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onViewModeChanged: function (oldViewMode, newViewMode) {
						if (oldViewMode !== newViewMode) {
							switch (newViewMode) {
							case ClientLib.Vis.Mode.City:
								this.title.setValue(this.tr("Selected building"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.title.setValue(this.tr("Selected defense unit"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.title.setValue(this.tr("Selected army unit"));
								this.reset();
								break;
							}
						}
					},
					onSelectionChange: function (oldSelection, newSelection) {
						if (newSelection != null) {
							switch (newSelection.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								this.Selection = newSelection;
								var name = newSelection.get_BuildingName();
								var level = newSelection.get_BuildingLevel();
								this.txtSelected.setValue(name + " (" + level + ")");
								this.txtLevel.setMinimum(level + 1);
								this.txtLevel.setMaximum(level + 51);
								this.txtLevel.setValue(level + 1);
								this.txtLevel.setEnabled(true);
								this.btnLevel.setEnabled(true);
								this.onInput();
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								this.Selection = newSelection;
								var name = newSelection.get_UnitName();
								var level = newSelection.get_UnitLevel();
								this.txtSelected.setValue(name + " (" + level + ")");
								this.txtLevel.setMinimum(level + 1);
								this.txtLevel.setMaximum(level + 51);
								this.txtLevel.setValue(level + 1);
								this.txtLevel.setEnabled(true);
								this.btnLevel.setEnabled(true);
								this.onInput();
								break;
							}
						}
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.reset();
						}
					},
					getResTime: function (need, type) {
						var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						need -= CurrentOwnCity.GetResourceCount(type);
						need = Math.max(0, need);
						var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
						var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
						var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
						return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
					},
					getUpgradeCostsToLevel: function (unit, newLevel) {
						var costs = null;
						if (unit !== null && newLevel > 0) {
							switch (unit.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								if (newLevel > unit.get_BuildingLevel())
									costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(unit.get_BuildingDetails(), newLevel);
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
								if (newLevel > unit.get_UnitLevel())
									costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
								break;
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								if (newLevel > unit.get_UnitLevel())
									costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
								break;
							}
						}
						return costs;
					},
					reset: function () {
						this.Selection = null;
						this.txtSelected.setValue("-");
						this.txtLevel.setMinimum(0);
						this.txtLevel.setMaximum(0);
						this.txtLevel.resetValue();
						this.txtLevel.setEnabled(false);
						this.btnLevel.setEnabled(false);
						this.onInput();
					},
					onTick: function () {
						this.onInput();
					},
					onInput: function () {
						var costs = this.getUpgradeCostsToLevel(this.Selection, parseInt(this.txtLevel.getValue(), 10));
						if (costs !== null) {
							for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
								var uCosts = costs[i];
								switch (parseInt(uCosts.Type, 10)) {
								case ClientLib.Base.EResourceType.Tiberium:
									Tib += uCosts.Count;
									TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
									break;
								case ClientLib.Base.EResourceType.Crystal:
									Cry += uCosts.Count;
									CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
									break;
								case ClientLib.Base.EResourceType.Power:
									Pow += uCosts.Count;
									PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
									break;
								}
							}
							this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
							this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
							if (Tib === 0) this.resTiberium.exclude();
							else this.resTiberium.show();
							this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
							this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
							if (Cry === 0) this.resChrystal.exclude();
							else this.resChrystal.show();
							this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
							this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
							if (Pow === 0) this.resPower.exclude();
							else this.resPower.show();
						} else {
							this.resTiberium.setLabel("-");
							this.resTiberium.resetToolTipText();
							this.resTiberium.show();
							this.resChrystal.setLabel("-");
							this.resChrystal.resetToolTipText();
							this.resChrystal.show();
							this.resPower.setLabel("-");
							this.resPower.resetToolTipText();
							this.resPower.show();
						}
					},
					onUpgrade: function() {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						if (newLevel > 0 && this.Selection !== null) {
							switch (this.Selection.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								if (newLevel > this.Selection.get_BuildingLevel()) {
									ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Selection.get_BuildingDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
								if (newLevel > this.Selection.get_UnitLevel()) {
									ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								if (newLevel > this.Selection.get_UnitLevel()) {
									ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							}
						}
					}
				}
			});
			qx.Class.define("Upgrade.Repairtime", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label(this.tr("tnf:repair points")).set({ alignX: "center", font: "font_size_14_bold" }));
						this.add(this.grid = new qx.ui.container.Composite(new qx.ui.layout.Grid()));

						this.grid.add(this.basRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_base_buildings.png").set({toolTipText: this.tr("tnf:base")}), {row: 0, column: 0});
						this.basRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 4});
						this.grid.add(this.btnBuildings = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 0, column: 6});
						this.btnBuildings.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnBuildings.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Construction_Yard); }, this);

						this.grid.add(this.infRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_squad.png").set({toolTipText: this.tr("tnf:infantry repair title")}), {row: 1, column: 0});
						this.infRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 4});
						this.grid.add(this.btnInfantry = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 1, column: 6});
						this.btnInfantry.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnInfantry.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Barracks); }, this);

						this.grid.add(this.vehRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_vehicle.png").set({toolTipText: this.tr("tnf:vehicle repair title")}), {row: 2, column: 0});
						this.vehRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 4});
						this.grid.add(this.btnVehicle = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 2, column: 6});
						this.btnVehicle.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnVehicle.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Factory); }, this);

						this.grid.add(this.airRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_plane.png").set({toolTipText: this.tr("tnf:aircraft repair title")}), {row: 3, column: 0});
						this.airRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 4});
						this.grid.add(this.btnAircraft = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 3, column: 6});
						this.btnAircraft.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnAircraft.addListener("execute", function (e) { this.upgradeBuilding(ClientLib.Base.ETechName.Airport); }, this);

						this.grid.getLayout().setRowFlex(0, 0);
						this.grid.getLayout().setRowFlex(1, 0);
						this.grid.getLayout().setRowFlex(2, 0);
						this.grid.getLayout().setRowFlex(3, 0);
						this.grid.getLayout().setColumnFlex(1, 200);
						this.grid.getLayout().setColumnFlex(3, 200);
						this.grid.getLayout().setColumnFlex(5, 200);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Repairtime Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					grid: null,
					btnBuildings: null,
					btnInfantry: null,
					btnVehicle: null,
					btnAircraft: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.getInfo();
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onTick: function () {
						this.getInfo();
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.getInfo();
						}
					},
					canUpgradeBuilding: function (ETechName) {
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
						if (building) {
							var ResourceRequirements_Obj = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_UnitGameData_Obj())
							return (building.get_CurrentDamage() == 0 && !city.get_IsLocked() && city.HasEnoughResources(ResourceRequirements_Obj));
						} else return false;
					},
					upgradeBuilding: function (ETechName) {
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
						if (building) {
							ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", {
								cityid : city.get_Id(),
								posX : building.get_CoordX(),
								posY : building.get_CoordY()
							}, null, null, true);
						}
					},
					getInfo: function () {
						try {
							var lvl, win, city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard).get_CurrentLevel();
							win = (city.get_CityBuildingsData().GetFullRepairTime(true) - city.get_CityBuildingsData().GetFullRepairTime(false)) * -1;
							this.grid.getLayout().getCellWidget(0, 0).setLabel("("+ lvl +")");
							this.grid.getLayout().getCellWidget(0, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityBuildingsData().GetFullRepairTime()));
							this.grid.getLayout().getCellWidget(0, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Barracks).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)) * -1;
								this.grid.getLayout().getCellWidget(1, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(1, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)));
								this.grid.getLayout().getCellWidget(1, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(1, 18);
							} else {
								this.grid.getLayout().setRowHeight(1, 0);
							}

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Factory).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)) * -1;
								this.grid.getLayout().getCellWidget(2, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(2, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)));
								this.grid.getLayout().getCellWidget(2, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(2, 18);
							} else {
								this.grid.getLayout().setRowHeight(2, 0);
							}

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Airport).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)) * -1;
								this.grid.getLayout().getCellWidget(3, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(3, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)));
								this.grid.getLayout().getCellWidget(3, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(3, 18);
							} else {
								this.grid.getLayout().setRowHeight(3, 0);
							}

							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Construction_Yard)) this.btnBuildings.setEnabled(true);
							else this.btnBuildings.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Barracks)) this.btnInfantry.setEnabled(true);
							else this.btnInfantry.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Factory)) this.btnVehicle.setEnabled(true);
							else this.btnVehicle.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Airport)) this.btnAircraft.setEnabled(true);
							else this.btnAircraft.setEnabled(false);
						} catch (e) {
							console.log("Error in Upgrade.Repairtime.getInfo: ");
							console.log(e.toString());
						}
					}
				}
			});

		}
		function translation() {
			var localeManager = qx.locale.Manager.getInstance();

			// Default language is english (en)
			// Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
			// You can send me translations so i can include them in the Script.

			// German
			localeManager.addTranslation("de", {
				"Selected building": "Markiertes Gebäude",
				"All buildings": "Alle Gebäude",
				"Selected defense unit": "Markierte Abwehrstellung",
				"All defense units": "Alle Abwehrstellungen",
				"Selected army unit": "Markierte Armee-Einheit",
				"All army units": "Alle Armee-Einheiten"
			});

			// Hungarian
			localeManager.addTranslation("hu", {
				"Selected building": "Kiválasztott létesítmény",
				"All buildings": "Összes létesítmény",
				"Selected defense unit": "Kiválasztott védelmi egység",
				"All defense units": "Minden védelmi egység",
				"Selected army unit": "Kiválasztott katonai egység",
				"All army units": "Minden katonai egység"
			});
		}
		function waitForGame() {
			try {
				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) {
						try {
							console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
							translation();
							createClasses();
							Upgrade.getInstance();
							console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
						} catch (e) {
							console.log(e);
						}
					} else {
						window.setTimeout(waitForGame, 1000);
					}
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.log(e);
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


/***********************************************************************************
WarChiefs - Tiberium Alliances Sector HUD 13.12.18							172683
***********************************************************************************/
// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Sector HUD
// @description     Displays a tiny HUD with the Sector you are viewing.
// @author          Eistee
// @version         13.12.18
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @require         http://usocheckup.redirectme.net/172683.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/172683/large.png
// @updateURL       https://userscripts.org/scripts/source/172683.meta.js
// @downloadURL     https://userscripts.org/scripts/source/172683.user.js
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
						text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]");
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


/***********************************************************************************
C&C:AllianceMemberOnline: 0.1.3.0
***********************************************************************************/
// ==UserScript==
// @name        AllianceMemberOnline
// @namespace   AllianceMemberOnline
// @description Gives an overview of all online alliance members sorted by there member state.
// @version     0.1.3.0
// @updateURL     https://userscripts.org/scripts/source/178740.meta.js
// @downloadURL   https://userscripts.org/scripts/source/178740.user.js
// @author      InFlames2k (Patrick Schubert)
// @include     http*://*.alliances.commandandconquer.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @grant         metadata
// ==/UserScript==
(function(){
	var AllianceMemberOnline0 = function()
	{
		// create the main class
		function createClass()
		{
	      	console.log("Starting creation of classes");
			// define the memberoverview class
			qx.Class.define("AllianceMemberOnline.Main",
			{
				type: "singleton",
				extend: qx.core.Object,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Initializing AllianceMemberOnlineButton Button");
						var AllianceMemberOnlineButton = new qx.ui.form.Button("Alliance Overview");
						AllianceMemberOnlineButton.set(
						{			
							alignY: "middle",							
							width : 120,							
							toolTipText : "open AllianceMemberOnline window",
							appearance: "button-text-small"
						});
												
						AllianceMemberOnlineButton.addListener("execute", this.__openAllianceMemberOnlineWindow, this);
		
						console.log("Adding AllianceMemberOnlineButton to view");
						var app = qx.core.Init.getApplication();
						app.getDesktop().add(AllianceMemberOnlineButton, 
						{
							bottom: 0, 
							right: 120
						});
						
					//	var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
					//	AllianceMemberOnlineWindow.open();
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline: ", e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{				
					// Method to show the window
					__openAllianceMemberOnlineWindow: function()
					{
						var AllianceMemberOnlineWindow = AllianceMemberOnline.Window.getInstance();
						
						if(AllianceMemberOnlineWindow.isVisible())
						{
							console.log("closing AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.close();
						}
						else
						{
							console.log("opening AllianceMemberOnlineWindow");
							AllianceMemberOnlineWindow.open();
						}
					}
				}
			});		
			
			qx.Class.define("AllianceMemberOnline.Window",
			{
				type: "singleton",
				extend: qx.ui.window.Window,
				
				// constructor of the class
				construct: function()
				{
					try
					{				
						console.log("Creating AllianceMemberOnline.Window");
						this.base(arguments);
						this.setLayout(new qx.ui.layout.Canvas());
						
						this.set(
						{				
							width: 150,
							caption: "Online Members",
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							resizable: true
						});		
						
						this.model = new qx.ui.table.model.Simple();
						this.model.setColumns(["Role", "Name", "OnlineState", "RoleText"]);
						this.model.sortByColumn(1, true);						
						this.list = new qx.ui.table.Table(this.model);
						this.list.setColumnVisibilityButtonVisible(false);
						this.list.setColumnWidth(0, 0);
						this.list.setColumnWidth(1, 130);					
						this.list.setColumnWidth(2, 0);
						this.list.setColumnWidth(3, 0);	
						this.list.set({ width: 130, minHeight: 250 });
						var tModel = this.list.getTableColumnModel();
						tModel.setColumnVisible(0, false);
						tModel.setColumnVisible(2, false);
						tModel.setColumnVisible(3, false);
						this.list.setStatusBarVisible(false);
						this.add(this.list, {
							bottom: 0, 
							left: 0
						});
						
						this.list.addListener("mousemove", function(e)
                        {
                            var cell = this.getCellUnderMouse(this.list, e);
                            var row  = cell.row;
                            var col  = cell.col;
                            if((row >= 0) && (col >= 0))
                            {
                                if((this._curTtRow != row) || (this._curTtCol != col))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                    var ttText = this._onGetToolTipText(this.list, row, col);
                                    if(ttText && (ttText != ""))
                                    {
                                        this.list.setToolTipText(ttText);
                                        ttManager.showToolTip(this.list);
                                    }
                                }
                            }
                            else
                            {
                                if((this._curTtRow >= 0) && (this._curTtCol >= 0))
                                {
                                    this.list.setToolTipText("");
                                    var ttManager = qx.ui.tooltip.Manager.getInstance();
                                    ttManager.resetCurrent();
                                }
                            }
                            this._curTtRow = row;
                            this._curTtCol = col;
                        }, this);
						
						try
						{
							var timer = qx.util.TimerManager.getInstance();
						}
						catch(e)
						{
							console.log("Failed to get timer");
							throw e;
						}
						timer.start(function()
						{
										console.log("Timer function running");
										// example getting player title icon
										// console.log(ClientLib.Data.MainData.GetInstance().get_Player().get_TitleIcon());
										console.log("Getting Members and members count");
										var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
										alliance.RefreshMemberData();
										var members = alliance.get_MemberDataAsArray();
						
										console.log("Creating model");
										var rowArr=[];									
									
										var iCounter = 0;
										for(i = 0; i < alliance.get_NumMembers(); i++)
										{
											var member = members[i];
											var name = member.Name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											     name=">>" + name;
											if(member.OnlineState == ClientLib.Data.EMemberOnlineState.Online || member.OnlineState == ClientLib.Data.EMemberOnlineState.Away)
											{	
											 
											 //   var name = member.Name;
												rowArr.push([member.Role, name, member.OnlineState, member.RoleName]);
												console.log(member.Role + " - " + member.Name);
												console.log("AllianceMemberOnlineView: " + member.Name + " - " + member.OnlineState);
												iCounter++;
											}
										}
						
										this.model.removeRows(0, this.model.getRowCount(), true)
										this.model.setData(rowArr);
										this.model.sortByColumn(0, true);
						},
						5000,
						this,
						null,
						1000); 
					}
					catch(e)
					{
						console.log("Failed to initialize AllianceMemberOnline.Window");
						console.log(e);
					}
					console.log("AllianceMemberOnline loaded");
				},
				
				// destructor of the class
				destruct: function()
				{
				},
				
				members:
				{			
					model: null,
					list: null,
				
					getCellUnderMouse : function(table, mouseEvent)
                    {
                        var row = -1, col = -1;
                        if(table && mouseEvent)
                        {
                            var pageX = mouseEvent.getDocumentLeft();
                            var pageY = mouseEvent.getDocumentTop();                    
                            var sc = table.getTablePaneScrollerAtPageX(pageX);                    
                            if(sc)                    
                            {                    
                              row = sc._getRowForPagePos(pageX, pageY);                    
                              col = sc._getColumnForPageX(pageX);                    
                              if((row === null) || (row === undefined)) { row = -1; }                    
                              if((col === null) || (col === undefined)) { col = -1; }                    
                            }                    
                          }                    
                          return({ "row": row, "col": col });
                    },
                    
                    _onGetToolTipText : function(table, row, col)
                    {     
                      //  console.log(this.model.getValue(3, row));
                        return this.model.getValue(3, row);                          
                    } 
				}
			});
		}	
		
		
		// **************************************************************
		// Main Initialization
		function AllianceMemberOnline_checkIfLoaded() 
		{
			try 
			{
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible())
				{
					createClass();
					window.AllianceMemberOnline.Main.getInstance();			
				} else 
				{
					window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
				}
			} catch (e) 
			{
				console.log("AllianceMemberOnline_checkIfLoaded: ", e);
			}
		}
		
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(AllianceMemberOnline_checkIfLoaded, 1000);
		}
	};	
	
	try 
	{
		var script = document.createElement("script");
		script.innerHTML = "(" + AllianceMemberOnline0.toString() + ")();";
		script.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	} 
	catch (e) 
	{
		console.log("AllianceMemberOnline init error: ", e);
	}
})();