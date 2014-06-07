// ==UserScript==
// @name           SkraggleSkript
// @namespace      sks
// @description    Scripts by SkraggleRock
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

// Framework hijacked from LoUAssistant, whose copyright notice follows:

/*****************************************************************************************
Copyright (c) 2011 Martin Brunninger

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*****************************************************************************************/

(function() {

    // outer shell for injection
    var sks_as_start = function() {

        // inner shell for delayed execution
        function sks_as_main() {

            qx.Class.define("sks.Const", {
                type: "static",
                //extend: qx.core.Object, // don't extend, firebug works better
                statics: {
					versionID: "0.9.02",
                    woodID: 1,
                    stoneID: 2,
                    ironID: 3,
                    foodID: 4,

                    modifierIDs: { // player.getModifiers()
                        maxBarons: 96, // index
                    },
                    icons: {
                        townIconLand: "ui/icons/icon_playerinfo_townicon_civil_land.png",
                    },

                    cottageSpeedIncrement: [0, 4, 6, 6, 9, 10, 11, 12, 13, 14, 15],

                    buildingCategory: [
                        // categories:
                        //   building minister:
                        //   0: baracks, 1: cottages, 2: economy, 3: military, 4: other, 5: warehouse
                        //   defense minister:
                        //   6: towers, 7: wall
                        /* 0 */ undefined, /* 1: wood old */ 2, /* 2: stone old */ 2, /* 3: food old */ 2,
                        /* 4: cottages */ 1, /* 5: Marketplace */ 4, /* 6: iron old */ 2, /* 7: sawmill */ 2,
                        /* 8: mill */ 2, /* 9: hideout */ 4, /* 10: stonemason */ 2, /* 11: foundry */ 2,
                        /* 12: Town Hall */ 4, /* 13: townhouse */ 4, /* 14: baracks */ 0, /* 15: city guard house */ 3,
                        /* 16: training ground */ 3, /* 17: stable */ 3, /* 18: workshop */ 3, /* 19: shipyard */ 3,
                        /* 20: warehouse */ 5, /* 21: castle */ 3, /* 22: harbor */ 4, /* 23: city walls */ 7,
                        /* 24: old tower */ 3, /* 25: old tower */ 3, /* 26: old tower */ 3, /* 27: resource */ undefined,
                        /* 28: resource */ undefined, /* 29: resource */ undefined, /* 30: resource */ undefined, /* 31: */ undefined,
                        /* 32: */ undefined, /* 33: */ undefined, /* 34: */ undefined, /* 35: */ undefined,
                        /* 36: moonglow tower */ 3, /* 37: trinsic temple */ 3, /* 38: tower */ 6, /* 39: tower */ 6,
                        /* 40: tower */ 6, /* 41: tower */ 6, /* 42: tower */ 6, /* 43: tower */ 6,
                        /* 44: tower */ 6, /* 45: tower */ 6, /* 46: tower */ 6, /* 47: wood */ 2,
                        /* 48: stone */ 2, /* 49: iron */ 2, /* 50: food */ 2, /* 51: palace */ 4,
                        /* 52: palace */ 4, /* 53: palace */ 4, /* 54: palace */ 4, /* 55: palace */ 4,
                        /* 56: palace */ 4, /* 57: palace */ 4, /* 58: palace */ 4, /* 59: palace */ 4,
                    ],
                    buildOrder: [
                        4, // cottages
                        1, 47, 2, 48, 6, 49, 3, 50, 7, 10, 11, 8, // economy
                        20, // warehouses
                        14, // baracks
                        // FIXME Reihenfolge prüfen
                        15, 16, 17, 36, 37, 18, 19, 21, // military
                        // FIXME Reihenfolge prüfen
                        5, 9, 12, 13, 22, 51, 52, 53, 54, 55, 56, 57, 58, 59, // others
                        23, // wall
                        // FIXME Reihenfolge prüfen
                        24, 25, 26, 38, 39, 40, 41, 42, 42, 43, 44, 45, 46, // towers

                        // bisher bestätigt:
                        // cottage
                        // wood, stone, iron, food, sawmill, stonemason, foundry, mill
                        // (noch unklar: alt/neu bei wood, etc.)
                        // warehouse

                        // marketplace
                        // harbor
                    ],
                }
            });

            qx.Class.define("sks.loua.Tweaks", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    start: function()
					{
                        sks.loua.ConfigManager.getInstance().start();

						//sks.loua.ReportExport.getInstance().start();
						sks.loua.RaidReporter.getInstance().start();

						sks.loua.ConfigManager.getInstance().saveConfig();

						var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
						for( var key in worldDataRoot )
						{
							if( worldDataRoot[key] instanceof Object )
							{
								if( worldDataRoot[key].hasOwnProperty( "d" ) && worldDataRoot[key].hasOwnProperty( "c" ) )
								{
									$SKSU.worldData = worldDataRoot[key];
									break;
								}
							}
						}
			            $SKSU.region_object = ClientLib.Vis.VisMain.GetInstance().get_Region();

						var btn = new qx.ui.form.Button("SkS");
						btn.set({width: 30, appearance: "button-text-small"});
						btn.addListener("click", $SKSU.showSkSWin, $SKSU);

						$SKSU.a.serverBar.add(btn, {top: 2, left: 675});

                        info("main script: initialization completed");
                    }, // end start
                } // end members
            }); // end class "sks.loua.Tweaks"

            qx.Class.define("sks.loua.ConfigManager", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    config: {},
                    oldConfig: null,
                    mainPanel: null,
                    mainList: null,
                    applyButton: null,
                    copyright: null,

                    start: function() {
                        this.loadConfig();
                        this._addOptionsPane();
                    },

                    loadConfig: function() {
                        debug("loading configuration ...");
                        try {
                            if (localStorage && localStorage.sksConf) {
                                this.oldConfig = JSON.parse(localStorage.sksConf);
                            } else {
                                this.oldConfig = {};
                            }
                            $CFG = this.config;
                            $CFGO = this.oldConfig;
                        }
                        catch (e) {
                            error("loadConfig: " + e);
                        }
                    },

                    saveConfig: function() {
                        debug("storing configuration ...");
                        try {
                            if (localStorage)
                            {
                                // copy config, just category, enabled and values
                                var conf = {};
                                for (var key in this.config) {
                                    conf[key] = {};
                                    conf[key].enabled = this.config[key].getEnabled();
                                    for (var item in this.config[key].items) {
                                        conf[key][item] = this.config[key].items[item].getValue();
                                    }
                                }
                                localStorage.sksConf = JSON.stringify(conf);
                                /* XXX debug */this.loadConfig();
                            }
                        }
                        catch (e) {
                            error("saveConfig: " + e);
                        }
                    },

                    __getCategory: function(obj) {
                        return typeof(obj) == "string" ? obj : obj.classname;
                    },

                    mergeConfig: function(obj, defaults) {
                        var category = this.__getCategory(obj);
                        var title = defaults.title || category;
                        // create category
                        var c = new sks.loua.ConfigManagerCategory(this.oldConfig[category], title, defaults.desc);
                        this.config[category] = c;
                        // loop over items
                        if (defaults.items) {
                            for (var key in defaults.items) {
                                // merge items
                                var configValue = this.oldConfig[category] ? this.oldConfig[category][key] : null;
                                var item = new sks.loua.ConfigManagerItem(key, configValue, defaults.items[key]);
                                c.addConfigItem(key, item);
                                item.addListener("changeValue", c.onFeatureChanged, c);
                            }
                        }

                        // FIXME bis zum Öffnen des Dialogs verzögern
                        this.addOptions(obj);
                    },

					_addOptionsPane: function() {
                        debug("installing option dialog tab ...");
                        try {
                            this.mainPanel = new qx.ui.tabview.Page("[sks] Tweak", "");
                            this.mainPanel.setLayout(new qx.ui.layout.VBox());
                            this.copyright = $SKSU.createLabel("SkraggleScripts version " + sks.Const.versionID + ". This is not part of the official game!", "");
                            this.copyright.set({rich: true, marginBottom: 5});
                            this.mainList = new qx.ui.container.Composite(new qx.ui.layout.VBox());
                            var scroll = new qx.ui.container.Scroll(this.mainList);
                            scroll.setAllowStretchY(true);
                            scroll.setContentPaddingRight(5);
                            this.applyButton = new qx.ui.form.Button("Save Changes");
                            this.applyButton.setMarginTop(15);
                            this.applyButton.setToolTipText("Make changes permanent.");
                            this.applyButton.addListener("execute", function(e) {
                                this.saveConfig();
                            }, this);

                            this.mainPanel.add(this.copyright);
                            this.mainPanel.add(scroll, {flex: 1});
                            this.mainPanel.add(this.applyButton);

                            $SKSU.getOptionWindowTabView().add(this.mainPanel);
                            // Listener registrieren?
                        }
                        catch (e) {
                            error("addOptionTab: " + e);
                        }
                    },

                    addOptions: function(obj) {
                        var config = this.getConfig(obj);

                        var title = new qx.ui.form.CheckBox(config.getTitle());
                        title.set({backgroundColor: "white", paddingBottom: 1, allowGrowX: true});
                        title.getChildControl("label").setAllowGrowX(true);
                        // bind config, then title, important!
                        config.bind("enabled", title, "value");
                        title.bind("value", config, "enabled");

                        var block = new qx.ui.container.Composite(new qx.ui.layout.VBox());
                        block.set({marginBottom: 10, allowGrowY: true, allowGrowX: true});
                        block.setDecorator(new qx.ui.decoration.Uniform(1, "dotted", "white"));
                        block.add(title);

                        if (config.getDescription()) {
                            var desc = new qx.ui.basic.Label(config.getDescription(), "");
                            desc.set({rich: true, padding: 2, allowGrowX: true});
                            block.add(desc);
                        }
                        for (var key in config.items) {
                            var item = config.items[key];
                            switch (item.getType()) {
                                case "boolean":
                                    var cb = new qx.ui.form.CheckBox(item.getTitle());
                                    cb.set({rich: true, marginLeft: 25, allowGrowX: true});
                                    cb.getChildControl("label").setAllowGrowX(true);
                                    if (item.getDescription()) cb.setToolTipText(item.getDescription());
                                    item.bind("value", cb, "value");
                                    cb.bind("value", item, "value");
                                    block.add(cb);
                                break;
                                case "number":
								default:
                                    var cnt = new qx.ui.container.Composite( new qx.ui.layout.HBox() );
									cnt.setAlignY( "middle" );
									cnt.setAllowGrowX( true );
									var lbl = new qx.ui.basic.Label();
									lbl.setAlignY( "middle" );
                                    lbl.setRich(true);
									lbl.setAllowGrowX( true );
									lbl.setWrap( false );
									lbl.setValue(item.getTitle());
									lbl.setToolTipText(item.getDescription());

									var tb = new qx.ui.form.TextField();
									var w = item.getWidth();
									if( w > -1 )
										tb.setWidth( w );
                                    if( item.getType() == "number" )
										tb.setTextAlign( "right" );
									item.bind("value", tb, "value");
									tb.bind("value", item, "value");
									cnt.add( new qx.ui.core.Spacer().set({width:10}) );
									cnt.add( tb );
									cnt.add( new qx.ui.core.Spacer().set({width:10}) );
									cnt.add( lbl );
									block.add(cnt);
									break;
                            }
                        }

                        this.mainList.add(block);
                    },

                    isEnabled: function(obj) {
                        var category = this.__getCategory(obj);
                        return this.config[category] ? this.config[category].getEnabled() : false;
                    },

                    getConfig: function(obj) {
                        return this.config[this.__getCategory(obj)];
                    }
                }
            });

            qx.Class.define("sks.loua.ConfigManagerCategory", {
                extend: qx.core.Object,
                properties: {
                    enabled: { deferredInit: true, event: "changeEnabled" },
                },
                events: {
                    "changeFeature": qx.event.type.Data,
                },
                // FIXME an config item angleichen
                construct: function(value, title, desc) {
                    if (value && typeof(value.enabled) == "boolean") {
                        this.initEnabled(value.enabled)
                    } else {
                        this.initEnabled(false);
                    }
                    this.title = title;
                    this.desc = desc || null;
                    this.items = {};
                },
                members: {
                    title: null,
                    desc: null,
                    items: null,

                    getTitle: function() { return this.title; },
                    getDescription: function() { return this.desc; },
                    addConfigItem: function(key, item) {
						this.items[key] = item;
                    },
                    getConfigItem: function(key) {
						return this.items[key];
                    },
                    checkEnabled: function(key) {
                        return this.getEnabled();
                    },
                    checkConfigItem: function(key) {
                        return this.getEnabled() && this.items[key].getValue();
                    },
                    onFeatureChanged: function(e) {
                        this.fireDataEvent("changeFeature", e.getData(), e.getOldData());
                    },
                }
            });

            qx.Class.define("sks.loua.ConfigManagerItem", {
                extend: qx.core.Object,
                properties: {
                    value: { deferredInit: true, event: "changeValue" },
                },
                construct: function(key, configValue, defaults) {
                    this.key = key;
                    configValue = configValue != null ? configValue : defaults.default;
                    this.initValue(configValue);
                    this.setValue(configValue);
                    this.defaults = defaults;
                },
                members: {
                    key: null,
                    defaults: null,

                    getType: function() { return this.defaults.type; },
                    getDefault: function() { return this.defaults.default; },
                    getTitle: function() { return this.defaults.title; },
					getWidth: function() { return this.defaults.width; },
                    getDescription: function() { return this.defaults.desc; },
                    getOptions: function() { return this.defaults.options; },
                }
            });

            qx.Class.define("sks.loua.Mod", {
                type: "abstract",
                extend: qx.core.Object,
                members: {
                    __configDefaults: {
                        title: "Untitled",
                        desc: "No configuration description available.",
						width: -1,
                        items: {}
                    },
                    __active: false,

                    start: function() {
                        info ("registering " + this.__configDefaults.title + " Mod ...");
                        var m = sks.loua.ConfigManager.getInstance();
                        m.mergeConfig(this, this.__configDefaults);
                        m.getConfig(this).addListener("changeEnabled", this._onEnabledChanged, this);
                        m.getConfig(this).addListener("changeFeature", this._onFeatureChanged, this);

                        if (m.isEnabled(this)) this._activate();
                    },

                    _checkRequirements: function() {
                        return true;
                    },

                    _checkGameState: function() {
                        return true;
                    },

                    _onEnabledChanged: function(e) {
                        if (this.__active && e.getData() == false) {
                            this._removeMod();
                        } else if (!this.__active && e.getData() == true) {
                            this._activate();
                        }
                    },

                    _onFeatureChanged: function(e) {
                        if (! this.__active) return;
                        if (e.getData() === true) {
                            this._addMod(true);
                        } else if (e.getData() === false) {
                            this._removeMod(true);
                        }
                        this.updateMod();
                    },

                    // override to check prerequirements
                    _activate: function() {
                        if (!this._checkRequirements()) return;
                        if (!this._checkGameState()) return;
                        this._addMod();
                        this.updateMod();
                        debug ("... " + this.__configDefaults.title + " Mod done.");
                    },

                    _addMod: function(feature) {
                        debug ("activating " + this.__configDefaults.title + " Mod " + (feature ? "feature " : "") + "...");
                        try {
                            this.addMod();
                            if (! feature) this.__active = true;
                        }
                        catch (e) {
                            error(this.__configDefaults.title + ".addMod: " + e);
                        }
                    },

                    addMod: function() {
                        error(this.__configDefaults.title + " Mod does not implement addMod()!");
                    },

                    _removeMod: function(feature) {
                        debug ("deactivating " + this.__configDefaults.title + " Mod " + (feature ? "feature " : "") + "...");
                        try {
                            this.removeMod();
                            if (! feature) this.__active = false;
                        }
                        catch (e) {
                            error(this.__configDefaults.title + ".removeMod: " + e);
                        }
                    },

                    removeMod: function() {
                        error(this.__configDefaults.title + " Mod does not implement removeMod()!");
                    },

                    updateMod: function() {},

                    _waitForResourceOverviewPrerequirements: function() {
                        if (!$SKSU.getPlayerData().$$user_resourceOverviewOptions) {
                            debug ("not all required game data yet available, delaying activation of " + this.__configDefaults.title + " Mod");
                            var that = this; // memorize context
                            window.setTimeout(function() {that._activate();}, 100);
                            return false;
                        }
                        return true;
                    },
                }
            });

            qx.Class.define("sks.loua.ReportExport", {
                type: "singleton",
                extend: sks.loua.Mod,
                members: {
                    __configDefaults:
                    {
                        title: "ReportExport",
                        desc: "Add an export button to reports.",
                        items: {}
                    },

                    addMod: function()
                    {

                    },

                    removeMod: function()
                    {
                        // nothing to do
                    }
                }
            });

            qx.Class.define("sks.loua.RaidReporter", {
                type: "singleton",
                extend: sks.loua.Mod,
                members: {

					__configDefaults:
                    {
                        title: "RaidReporter",
                        desc: "Add extra info to raid reports.",
                        items:
						{
                            showOverkill:
							{
                                type: "number",
                                title: "Max Overkill %",
								width: 35,
                                desc: "Maximum overkill percentage to display",
                                default: "100",
                            },
							yellowOverkill:
							{
                                type: "number",
                                title: "Yellow Overkill %",
								width: 35,
                                desc: "Percentage to show overkill in yellow",
                                default: "90",
							},
							redOverkill:
							{
                                type: "number",
                                title: "Red Overkill %",
								width: 35,
                                desc: "Percentage to show overkill in red",
                                default: "75",
							},
                            showUnderkill:
							{
                                type: "number",
                                title: "Max Underkill %",
								width: 35,
                                desc: "Maximum underkill percentage to display",
                                default: "100",
                            },
							yellowUnderkill:
							{
                                type: "number",
                                title: "Yellow Underkill %",
								width: 35,
                                desc: "Percentage to show underkill in yellow",
                                default: "80",
							},
							redUnderkill:
							{
                                type: "number",
                                title: "Red Underkill %",
								width: 35,
                                desc: "Percentage to show underkill in red",
                                default: "60",
							},
						}
                    },

					interceptOnReport: function(r,fm,fn)
                    {
                        // DONT FORGET THAT THIS RUNS ON THE REPORT PAGE, NOT THE MOD
						var cfg = sks.loua.ConfigManager.getInstance().getConfig(this.sksRaidReporterMod);

						$SKSU.getApp().getReportPage().sksOriginalOnReport( r,fm,fn );

						children = $SKSU.getApp().getReportPage().reportBody.getChildren();
						for( i = 0; i < children.length; i++ )
                        {
							if( children[i] instanceof qx.ui.core.Spacer )
                            {
								var fA=fm.h.t.substr(0,5);
								var fv=fA.charAt(1);
								var fs=fA.charAt(4);
								var kp=webfrontend.res.Main.getInstance();

								// fA on me assaulting somebody else = 11013
								// fA on dungeon report = 01018
								// fA on somebody plundering me = 11112
								// fA on somebody scouting me = 11111

								if(fm.hasOwnProperty("r")&&fm.r!=null && fm.hasOwnProperty("a")&&fm.a!=null)
								{
									var resGain = {0:0,1:0,2:0,3:0,4:0};
									var resLoss = {0:0,1:0,2:0,3:0,4:0};
									var maxLoot = 0;
									var hasDungeonLoot = false;
									var dungCoords = 0;
									var armies = [];

									if(fm.hasOwnProperty("r")&&fm.r!=null)
									{
										for(var rindex=0;rindex<fm.r.length;rindex++)
										{
											if(fm.r[rindex].t>=0)
											{
												resGain[fm.r[rindex].t] = fm.r[rindex].v;
											}
										}
									}
									if(fm.hasOwnProperty("a")&&fm.a!=null)
									{
										for(var armyIndex=0;armyIndex<fm.a.length;armyIndex++)
										{
											var ku=0;
											var ko=fm.a[armyIndex];

											if(ko.r==webfrontend.base.GameObjects.eArmyRole.Attacker)
											{
												if(ko.u!=null)
													for(var unitIndex=0;unitIndex<ko.u.length;unitIndex++)
													{
														var unitType=ko.u[unitIndex].t;

														if(!kp.units.hasOwnProperty(unitType))
															continue;
														var unitData=kp.units[unitType];
														var unitCount=ko.u[unitIndex].o-ko.u[unitIndex].l;

														for(var resIndex in unitData.res)
														{
															resLoss[resIndex] += unitData.res[resIndex]*unitCount;
														}
														resLoss[0] += unitData.g*unitCount;
													}
											}
											else
											{
												if( ko.u!=null )
												{
													for(var unitIndex=0;unitIndex<ko.u.length;unitIndex++)
													{
														var unitType=ko.u[unitIndex].t;

														if(!kp.units.hasOwnProperty(unitType))
															continue;
														var unitData=kp.units[unitType];
														if( $SKSU.dungeonLoot.hasOwnProperty( unitData.dn ) )
														{
															maxLoot += $SKSU.dungeonLoot[unitData.dn] * ko.u[unitIndex].o;
															armies[unitIndex] = {};
															armies[unitIndex].armytype = unitData.dn;
															armies[unitIndex].armysize = ko.u[unitIndex].o;
															hasDungeonLoot = true;
														}
													}
													if( hasDungeonLoot )
													{
														dungCoords = ko.c[0].i;
													}
												}
											}
										}
									}


									var totalGain = resGain[0]+resGain[1]+resGain[2]+resGain[3]+resGain[4];
									var totalLoss = resLoss[0]+resLoss[1]+resLoss[2]+resLoss[3]+resLoss[4];

									var resOutput = new qx.ui.container.Composite();
									resOutput.setLayout( new qx.ui.layout.HBox(5) );
									for( rindex = 1; rindex <= 5; rindex++ )
									{
										var actualIndex = rindex == 5 ? 0 : rindex;
										var net = resGain[actualIndex] - resLoss[actualIndex];
										var rText = new qx.ui.basic.Label();
										rText.setAlignY( "middle" );
										rText.setRich( true );
										rText.setFont( "bold" );
										if( net == 0 )
										{
											rText.setValue( "+0" );
										}
										else if( net >= 0 )
										{
											rText.setValue( "+" + webfrontend.gui.Util.formatNumbers(net).toString() );
											rText.setTextColor( "green" );
										}
										else
										{
											rText.setValue( webfrontend.gui.Util.formatNumbers(net).toString() );
											rText.setTextColor( "red" );
										}
										var img;
										if( rindex == 5 )
										{
											img = new qx.ui.basic.Image( webfrontend.config.Config.getInstance().getUIImagePath("ui/icons_ressource_gold.png") );
										}
										else
										{
											var fileInfo = kp.getFileInfo(kp.resources[rindex].i);
											img = new qx.ui.basic.Image( webfrontend.config.Config.getInstance().getUIImagePath(fileInfo.url) );
										}
										img.setWidth(30);
										img.setHeight(30);
										img.setScale(true);
										resOutput.add( img );
										resOutput.add( rText );
										resOutput.add( new qx.ui.core.Spacer().set({width:5}) );
									}

									var rrHeader = new qx.ui.basic.Label( "RaidReporter:" );
									rrHeader.setRich( true );
									rrHeader.setAppearance( "textheader_main1_serif" );
									$SKSU.getApp().getReportPage().reportBody.addAt( rrHeader, i++ );
									$SKSU.getApp().getReportPage().reportBody.addAt( resOutput, i++ );

									var yellowColor = "#AF7817";
									if( hasDungeonLoot )
									{
										var str = "";
										var showText = true;
										if( fm.rcc < maxLoot )
										{
											var percent = (totalGain - resGain[0]) / maxLoot * 100.0;
											var col = "green";
											if( percent < cfg.getConfigItem( "redUnderkill" ).getValue() )
												col = "red";
											else if( percent < cfg.getConfigItem( "yellowUnderkill" ).getValue() )
												col = yellowColor;
											else if( percent > cfg.getConfigItem( "showUnderkill" ).getValue() )
												showText = false;

											str = "<b style=\"color:" + col + "\">" + parseInt( percent ) + "%  Underkill:</b>  Gained " + percent.toFixed( 2 ) + "% of " + webfrontend.gui.Util.formatNumbers(maxLoot).toString();
										}
										else
										{
											var percent = maxLoot / fm.rcc * 100.0;
											var col = "green";
											if( percent < cfg.getConfigItem( "redOverkill" ).getValue() )
												col = "red";
											else if( percent < cfg.getConfigItem( "yellowOverkill" ).getValue() )
												col = yellowColor;
											else if( percent > cfg.getConfigItem( "showOverkill" ).getValue() )
												showText = false;

											str = "<b style=\"color:" + col + "\">" + parseInt( percent ) + "%  Overkill:</b>  Only " + percent.toFixed( 2 ) + "% of troops needed for max loot (" + webfrontend.gui.Util.formatNumbers(maxLoot).toString() + ")";
										}
										if( showText )
										{
											var txt = new qx.ui.basic.Label();
											txt.setRich( true );
											txt.setAllowGrowX( true );
											txt.setValue( str );
											$SKSU.getApp().getReportPage().reportBody.addAt( txt, i++ );
										}
									}

									$SKSU.getApp().getReportPage().reportBody.addAt( new qx.ui.core.Spacer().set( { height:5 } ), i++ );
									$SKSU.getApp().getReportPage().reportBody.addAt( new qx.ui.core.Widget().set({backgroundColor:"#c4a77b",height:2,allowGrowX:true,marginTop:6}), i++ );

									if( hasDungeonLoot )
									{
										if( $SKSU.curDungeon != null && $SKSU.curDungeon.get_Coordinates() == dungCoords )
										{
											if( $SKSU.dungeonLootInfo.hasOwnProperty( dungCoords ) )
											{
												var info = $SKSU.dungeonLootInfo[dungCoords];
												var n = info.n;
												var l = (info.l/(n+1))*n + maxLoot/(n+1);
												info.n = n+1;
												info.l = Math.floor(l);
												if( maxLoot > info.mx )
													info.mx = maxLoot;
												if( maxLoot < info.mn )
													info.mn = maxLoot;
											}
											else
											{
												var info = {};
												info.n = 1;
												info.l = maxLoot;
												info.mx = maxLoot;
												info.mn = maxLoot;
												$SKSU.dungeonLootInfo[dungCoords] = info;
											}
											$SKSU.updateDungeonRaidInfo( dungCoords );
										}
									}
								}
								break;
                            }
                        }
                    },

                    addMod: function()
                    {
                        var rep = $SKSU.getApp().getReportPage();
						rep.sksRaidReporterMod = this;
						rep.sksOriginalOnReport = $SKSU.getApp().getReportPage()._onReport;
                        rep._onReport = this.interceptOnReport;

						info( "Adding MOD" );
                    },

                    removeMod: function()
                    {
                        $SKSU.getApp().getReportPage()._onReport = $SKSU.getApp().getReportPage().sksOriginalOnReport;
                    }
                }
            });

            qx.Class.define("sks.CommandsWindow", 
			{
				type: "singleton",
				extend: qx.ui.window.Window, 
				implement: [webfrontend.net.IUpdateConsumer], 
				construct: function ()
				{
					qx.ui.window.Window.call(this);
					this.setCaption( "Commands" );
					this.set({ width: 250, height: 400, allowMaximize: false, allowMinimize: false, showMaximize: false, showMinimize: false});
					this.addListener( "close", this.onClose, this );
					this.setLayout( new qx.ui.layout.Dock );
					var container = new qx.ui.container.Scroll();
					container.setContentPaddingRight( 10 );
					this.idleContainer = new qx.ui.container.Composite();
					this.idleContainer.setLayout( new qx.ui.layout.Grid() );
					container.add( this.idleContainer );
					this.add( container, {edge:"center",width:"100%",height:"100%"} );
					this.refresh();
				},
				members:
				{
					idleContainer: null,
					onClose: function()
					{
						$SKSU.sksCommandsWin = null;
					},
					refresh: function()
					{
						this.idleContainer.removeAll();
						this.idleContainer.add( new qx.ui.basic.Label( "Retrieving unit info.  Please wait." ).set({alignX:"center"}), {row:0,column:1} );
						$SKSU.commandsResults = [];
						webfrontend.net.UpdateManager.getInstance().addConsumer("COMO", this);
					},
					getRequestDetails: function( details )
					{
						return "a";
					}, 
					dispatchResults: function( results )
					{
						if( results == null )
							return;
						$SKSU.commandsResults.push( results );
						webfrontend.net.UpdateManager.getInstance().removeConsumer("COMO", this);
					},
				},
			} );

            qx.Class.define("sks.IncomingAttacksWindow", 
			{
				type: "singleton",
				extend: qx.ui.window.Window, 
				implement: [webfrontend.net.IUpdateConsumer], 
				construct: function ()
				{
					qx.ui.window.Window.call(this);
					this.setCaption( "Incoming Attacks" );
					this.set({ width: 1500, height: 600, allowMaximize: false, allowMinimize: false, showMaximize: false, showMinimize: false});
					this.addListener( "close", this.onClose, this );
					this.setLayout( new qx.ui.layout.Dock );
					//container = new qx.ui.container.Scroll();
					//container.setContentPaddingRight( 10 );
					//this.attacksContainer = new qx.ui.container.Composite();
					//this.attacksContainer.setLayout( new qx.ui.layout.VBox );
					//container.add( this.attacksContainer );
					//this.add( container, {edge:"center",width:"100%",height:"100%"} );
					webfrontend.net.UpdateManager.getInstance().addConsumer("ALL_AT", this);
					this.add( new qx.ui.basic.Label( "Retrieving attack info.  Please wait." ).set({alignX:"center"}), {edge:"center"} );
				},
				members:
				{
					attacksContainer: null,
					attacksGrid: null,
					onClose: function()
					{
						webfrontend.net.UpdateManager.getInstance().removeConsumer("ALL_AT", this);
						$SKSU.sksIncomingAttacksWin = null;
					},
					refresh: function()
					{
						this.attacksContainer.removeAll();
					},
					getRequestDetails: function( details )
					{
						return "a";
					}, 
					dispatchResults: function( results )
					{
						if( results == null )
							return;
						if( this.attacksGrid == null )
						{
							this.removeAll();
							var tableModel = new qx.ui.table.model.Simple();
							var columnNames = ["Defender", "Target", "Coords", "ArrTm", "Arrives", "Attacker", "Alliance", "Source", "Coords", "SptTm", "Spotted", 
								"Travel Time", "Travel Type", "TID", "AID" ];
							var columnIDs = ["defender", "target", "coords", "arrtm", "arrives", "attacker", "alliance", "source", "scoords", "spttm", "spotted", 
								"travelTime", "travelType", "tID", "aID" ];
        
							tableModel.setColumnIds(columnIDs);
							tableModel.setColumns(columnNames);
							//tableModel.setSortMethods( 4, function( row1, row2 ) { return Number(row1[3]) - Number(row2[3]); } );
        
							var custom =
							{
								tableColumnModel : function(obj) {
										return new qx.ui.table.columnmodel.Resize(obj);
									}
							};

							this.attacksGrid = new qx.ui.table.Table(tableModel, custom);

							var columnModel = this.attacksGrid.getTableColumnModel();
							columnModel.setColumnVisible( 3, false );
							columnModel.setColumnVisible( 9, false );
							columnModel.setColumnVisible( 13, false );
							columnModel.setColumnVisible( 14, false );
							var linkStyle = new qx.ui.table.cellrenderer.Default();
							linkStyle.setDefaultCellStyle( "text-decoration:underline;color:blue" );
							columnModel.setDataCellRenderer( 0, linkStyle );
							columnModel.setDataCellRenderer( 1, linkStyle );
							columnModel.setDataCellRenderer( 2, linkStyle );
							columnModel.setDataCellRenderer( 5, linkStyle );
							columnModel.setDataCellRenderer( 6, linkStyle );
							columnModel.setDataCellRenderer( 7, linkStyle );
							columnModel.setDataCellRenderer( 8, linkStyle );

							this.add( this.attacksGrid, {edge:"center"} );
							var btn = new qx.ui.form.Button("Export");
							btn.addListener("click", function() 
								{
									var dataStr = "Defender, Target, Coords, ArrTm, Arrives, Attacker, Alliance, Source, Coords, SptTm, Spotted, TravelTime, TravelType, TID, AID";
									for( var i = 0; i < this.attacksGrid.getTableModel().getRowCount(); i++ )
									{
										var row = this.attacksGrid.getTableModel().getRowData( i );
										for( var j = 0; j < row.length; j++ )
										{
											if( j != 0 )
												dataStr += "," + row[j];
											else
												dataStr += row[j];
										}
										dataStr += "\n";
									}
									$SKSU.showOutputWindow( "Incoming Attacks", dataStr );
								}, this );
							this.add( btn, {edge:"north"} );
						}

						var resArray = []
						if( results.hasOwnProperty( "a" ) )
						{
							resArray = results.a;
						}
						else
						{
							if( results[0].hasOwnProperty( "a" ) )
								resArray = results[0].a;
						}
						var sTime = webfrontend.data.ServerTime.getInstance();
						var newRows = [];
						for (var i = 0; i < resArray.length; i++)
						{
							var result = resArray[i];
							if (result.hasOwnProperty("a"))
							{
								// type, defender (tpn), target(tcn), coords(tc), arrv(es), att(pn), all(an), src(c), spot(ds), TS att(ta), TS def (td), claim
								//time: cA.c == 0 ? this.tr("tnf:no defense minister") : webfrontend.Util.getDateTimeString(cz.getStepTime(cA.es)), 
								// claim: cA.b == true ? cA.cp + ' %' : '', 
								var atype = "Unknown";
								if( result.t == 5 )
								{
									if( result.s == 5 )
										atype = result.b == 0 ? "Sieged" : "Baron";
									else
										atype = "Siege";
								}
								var travelType = "???";
								if( result.c != 0 )
								{
									var dist = $SKSU.distanceToCityID( result.tc, result.c );
									travelType = $SKSU.calculateTravelType( dist, result.es - result.ds );
								}
								var data =
								{
									defender: result.tpn,
									target: result.tcn,
									coords: webfrontend.gui.Util.formatCityCoordsFromId(result.tc, true),
									arrtm: result.es,
									arrives: result.c == 0 ? "???" : webfrontend.Util.getDateTimeString(sTime.getStepTime(result.es)),
									attacker: result.pn,
									alliance: result.an,
									source: result.cn,
									scoords: result.c == 0 ? "???" : webfrontend.gui.Util.formatCityCoordsFromId(result.c, true),
									spttm: result.ds,
									spotted: result.c == 0 ? "???" : webfrontend.Util.getDateTimeString(sTime.getStepTime(result.ds)),
									travelTime: result.c == 0 ? "???" : webfrontend.Util.getTimespanString(result.es - result.ds),
									travelType: travelType
								};
								newRows.push( data );
							}
						}
						this.attacksGrid.getTableModel().setDataAsMapArray( newRows );
					},
				},
			} );

            qx.Class.define("sks.IdleRaidUnitsTable",
			{
				extend: qx.ui.table.Table,
				implement: [webfrontend.net.IUpdateConsumer],
				construct: function ()
				{
					var tableModel = new qx.ui.table.model.Simple();
					var columnNames = ["CityID", "TS", "Type", "City", "Ref", "Cont", "Coords"];
        
					tableModel.setColumns(columnNames);
        
					var custom =
					{
						tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
					};
					
					qx.ui.table.Table.call(this,tableModel,custom);

					this.addListener("cellClick", this.onCellClick, this);
    
					var columnModel = this.getTableColumnModel();
					columnModel.setColumnVisible( 0, false );
					this.refresh();
				},
				members:
				{
					onCellClick: function( event )
					{
						var cityID = this.getTableModel().getValue( 0, event.getRow() );
						var spl = this.getTableModel().getValue( 6, event.getRow() ).split(":");
						var x = Number( spl[0] );
						var y = Number( spl[1] );
						webfrontend.data.City.getInstance().setRequestId(cityID);
						webfrontend.gui.Util.showMapModeViewPos( 'r', 0, x, y ); 
					},
					updateCityTS: function( cid, count )
					{
						var tm = this.getTableModel();
						for( var i = 0; i < tm.getRowCount(); i++ )
						{
							if( tm.getValue( 0, i ) == cid )
							{
								tm.setValue( 1, i, count );
								break;
							}
						}
					},
					refresh: function()
					{
						var tm = this.getTableModel();
						tm.removeRows( 0, tm.getRowCount() );
						tm.addRows( [[0,"..."]] );
						webfrontend.net.UpdateManager.getInstance().addConsumer("DEFO", this);
					},
					getRequestDetails: function( details )
					{
						return "a";
					}, 
					dispatchResults: function( results )
					{
						if( results == null )
							return;
						var resMain = webfrontend.res.Main.getInstance();
						var sI = webfrontend.data.Server.getInstance();
						var pC = webfrontend.data.Player.getInstance().cities;
						var tm = this.getTableModel();
						var idleCities = [];
						tm.removeRows( 0, tm.getRowCount() );
						for (var i = 0; i < results.length; i++)
						{
							var result = results[i];
							if (result.hasOwnProperty("c"))
							{
								for (var j = 0; j < result.c.length; j++)
								{
									var command = result.c[j];
									if (command.i == 0)
									{
										var x = result.i & 0xffff;
										var y = result.i >> 16;
										var first = true;
										var unitStr = "";
										var ts = 0;
										for (var k = 0; k < command.u.length; k++)
										{
											var unitInfo = resMain.units[command.u[k].t];
											var count = command.u[k].c;
											if (count > 0 && unitInfo.c > 0 && unitInfo.ls)
											{
												if (!first)
												{
													unitStr += ",";
												}
												unitStr += $SKSU.unitShortName( command.u[k].t );
												ts += count * unitInfo.uc;
												first = false;
											}
										}
										if (!first)
										{
											//var columnNames = ["CityID", "TS", "Type", "City", "Ref", "Cont", "Coords"];
											var cont = sI.getContinentFromCoords(x, y);
											var ref = "";
											if( pC.hasOwnProperty( result.i ) )
												ref = pC[result.i].reference;

											idleCities.push([result.i, ts, unitStr, result.n, ref, cont, x.toString() + ":" + y.toString()]);
										}
									}
								}
							}
						}
						tm.setData( idleCities );
						tm.sortByColumn( 1, false );
						webfrontend.net.UpdateManager.getInstance().removeConsumer("DEFO", this);
						$SKSU.sksRaidWin.nextIdleCityButton.setEnabled( true );
					},
				},
			} );

            qx.Class.define("sks.Utils", {
                type: "static",
                //extend: qx.core.Object, // don't extend, firebug works better
                statics: {
                    a: null,
					worldData: null,
					exportWin: null,
					sksWin: null,
					sksRaidWin: null,
					sksRaidErrorWin: null,
					sksCommandsWin: null,
					sksIncomingAttacksWin: null,
					curContX: 0,
					curContY: 0,
					rowCount: 0,
					rankingsDataStep: -1,
					rankingsDataString: "",
					activeConts:[],
					rankingsProgress: null,
					dungeonReports:{},
					dungeonLootInfo:{},
					dungeonDataMine:[],
					dungeonsToDataMine:[],
					curDungeon: null,
					region_object: null,
					ratioMode: "count",
					dungeonProgressData: // [type][level][progress][max/avg]
						[ // LEAVE THIS LINE
							[
								//Forest L1
								[
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]
								],
								//Forest L2
								[
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[1243,1243],[1243,1243],[1243,1243],[1243,1243],[1243,1243],
									[1243,1243],[1243,1243],[1243,1243],[1243,1243],[1243,1243],
									[1243,1243],[1243,1243],[1243,1243],[-1,-1],[-1,-1]
								],
								//Forest L3
								[
									[2400,2400],[2448,2443],[2492,2485],[2538,2528],[2584,2572],
									[2637,2614],[2686,2658],[2736,2702],[2785,2746],[2833,2789],
									[2882,2833],[2930,2876],[2978,2920],[3027,2964],[3076,3008],
									[3124,3051],[3073,3004],[2999,2938],[2910,2857],[3213,3130],
									[3303,3212],[3389,3289],[3335,3242],[3249,3166],[3140,3070],
									[3486,3378],[3583,3465],[3675,3547],[3740,3606],[3797,3656],
									[3847,3702],[3899,3748],[3948,3792],[3997,3836],[4045,3880],
									[4094,3924],[4142,3967],[4191,4011],[4239,4054],[4288,4098],
									[4336,4142],[4313,4137],[4274,4122],[4224,4099],[4455,4266],
									[4533,4329],[4608,4391],[4666,4441],[4720,4488],[4670,4459],
									[4595,4413],[4504,4355],[4811,4588],[4902,4662],[4988,4733],
									[5050,4787],[5106,4836],[5157,4881],[5208,4926],[5257,4970],
									[5306,5014],[5355,5058],[5403,5102],[5452,5146],[5500,5189],
									[5548,5233],[5597,5277],[5645,5320],[5693,5363],[5742,5407],
									[5791,5451],[5839,5494],[5888,5538],[5936,5582],[5985,5626],
									[6033,5669],[6082,5713],[6130,5756],[6179,5800],[6227,5844],
									[6276,5888],[6324,5931],[6372,5974],[6421,6018],[6470,6062],
									[6518,6105],[6567,6149],[6615,6193],[6664,6237],[6712,6280],
									[6761,6324],[6809,6367],[6858,6411],[6906,6455],[6955,6499],
									[7003,6542],[7056,6590],[7111,6640],[7199,6719],[7199,6719]
								],
								//Forest L4
								[
									[8450,7651],[8550,8075],[8568,8073],[8869,8344],[8742,8395],
									[8581,8135],[8333,8012],[8704,8264],[8924,8444],[8857,8530],
									[9423,8953],[9561,9165],[9819,9252],[9845,9335],[9721,9375],
									[10088,9616],[9852,9535],[9834,9425],[9178,8989],[9341,9118],
									[9290,9090],[9961,9615],[10695,10349],[11270,10662],[11570,10905],
									[11791,11086],[11697,11059],[11406,10942],[11035,10781],[11699,11351],
									[12250,11663],[12536,11888],[12564,11957],[12328,11883],[12004,11759],
									[12384,12044],[12974,12419],[13159,12563],[13275,12667],[13362,12773],
									[13193,12685],[12962,12553],[13741,13210],[13861,13391],[13944,13552],
									[14326,13806],[14408,13946],[14457,14071],[14567,14054],[14378,13922],
									[14130,13749],[15072,14491],[15185,14643],[15245,14765],[15042,14728],
									[15418,15002],[15410,15066],[15862,15296],[15787,15245],[15644,15149],
									[15936,15622],[15984,15645],[15696,15515],[15471,15252],[16083,15732],
									[15978,15665],[17038,16510],[17128,16603],[16752,16320],[16162,15867],
									[16373,16054],[17466,17020],[17821,17481],[18111,17918],[18725,18509],
									[18537,18137],[18573,18137],[18960,18200],[19259,18576],[19552,18819],
									[19460,18825],[19563,18946],[19668,19067],[19895,19265],[20141,19535],
									[20403,19829],[20261,19873],[20382,19848],[20250,19769],[20092,19672],
									[19898,19563],[20630,20132],[20863,20339],[21026,20542],[21023,20670],
									[20974,20780],[21154,20888],[21585,21138],[21970,21422],[21970,21422]
								],
								//Forest L5
								[
									[26425,23718],[24475,24074],[26081,24752],[27174,25026],[27689,25290],
									[28020,25494],[28245,25683],[28496,26159],[28171,26180],[27026,25731],
									[28204,26555],[27736,26427],[29604,27505],[29600,27543],[28501,26969],
									[27627,27057],[28953,28535],[29508,28818],[31141,29995],[32095,30627],
									[31648,30335],[32880,30678],[33908,31392],[34848,32595],[34145,32495],
									[32879,32261],[33475,33154],[34460,34062],[34033,33395],[35182,33937],
									[35483,34562],[36239,35037],[35249,34595],[36758,35624],[38750,37001],
									[38586,37217],[37996,37214],[39942,39049],[40913,39495],[40756,39641],
									[41860,40054],[41905,40127],[43310,41309],[42836,41351],[41776,40941],
									[41899,40728],[43620,41629],[44363,42467],[44652,42896],[44322,42889],
									[46417,44515],[46017,44603],[44167,43642],[43214,42940],[43180,43061],
									[45818,45761],[46624,46324],[47792,47171],[47605,46293],[45317,44319],
									[45482,44158],[45552,45148],[47361,47124],[48671,48302],[49295,48645],
									[50885,49887],[50605,50041],[53388,52465],[54605,53120],[55249,53878],
									[55194,53666],[56697,55034],[57585,55931],[57308,55362],[58346,55507],
									[57030,55385],[55809,55128],[56799,56158],[57862,56765],[59721,57957],
									[59761,58192],[60228,58555],[60907,58367],[60898,58079],[59842,58149],
									[61610,59614],[61710,60035],[61961,60846],[63901,62428],[64853,63625],
									[64940,62951],[65350,63221],[66020,64035],[66783,65075],[66647,65533],
									[65295,63669],[64473,62896],[67432,64880],[68705,66410],[68705,66410]
								],
								//Forest L6
								[
									[60325,53311],[57625,52897],[59896,53827],[60113,54285],[59386,54478],
									[56899,53738],[58966,55425],[61035,57252],[61641,57482],[61805,57709],
									[61600,58122],[60395,57145],[58150,56433],[58953,57957],[61248,60204],
									[62326,60973],[63237,62087],[63714,62598],[65162,63029],[67214,65231],
									[68937,66182],[70317,68691],[74460,71410],[79956,74332],[81224,75100],
									[81700,75409],[80526,74643],[81748,76102],[78960,75074],[77921,75508],
									[78064,76453],[78068,76477],[78911,78378],[79487,78673],[78121,76844],
									[81534,78933],[79768,77704],[81343,78580],[81523,79875],[88205,85117],
									[94305,88608],[96055,89614],[96772,89873],[98012,91730],[94423,89840],
									[87763,86047],[88674,87783],[89979,88780],[93633,91647],[99793,96788],
									[100009,98308],[101700,99364],[101311,97604],[95496,93287],[97960,94751],
									[99497,96485],[105470,100733],[108520,103506],[107499,102581],[108628,102502],
									[105969,100637],[103928,101243],[109553,106598],[118404,114735],[121895,120367],
									[123503,122089],[122767,120569],[125002,120772],[127561,123220],[128752,122983],
									[131508,125865],[135333,128021],[134730,128674],[135445,129409],[133276,129589],
									[133041,129228],[127452,123963],[129063,124296],[125655,121714],[131219,125077],
									[131455,126535],[135428,130203],[135500,131522],[135811,131850],[140492,135007],
									[140755,136598],[140522,138154],[139643,136151],[144381,138636],[145835,140081],
									[145014,140461],[143759,139706],[141819,138737],[148234,143747],[149920,146062],
									[152180,145788],[153629,146738],[154959,147672],[156845,149270],[156845,149270]
								],
								//Forest L7
								[
									[119725,106135],[120400,107908],[118692,108203],[117708,108522],[120897,110849],
									[123364,111833],[126952,115481],[124362,115237],[120809,115010],[117723,113784],
									[119276,115977],[116497,115000],[120876,119523],[125664,124218],[128836,126845],
									[131641,127535],[139649,133028],[135692,132370],[134035,132160],[136333,134744],
									[146006,142716],[148683,144477],[149760,143386],[145840,141674],[150070,144953],
									[157435,150394],[155051,151567],[157195,155538],[158476,156268],[164305,161026],
									[166920,160512],[166470,161624],[164737,158362],[156089,154134],[161367,159668],
									[169428,166477],[173573,167250],[183049,174271],[184183,176225],[186785,180501],
									[191202,184320],[196806,185373],[197399,186421],[195841,186052],[191657,184553],
									[194389,184093],[193871,183717],[192208,180363],[188311,179196],[182718,176525],
									[184195,178925],[194236,186284],[200102,192011],[207703,196269],[200720,190301],
									[198782,190500],[198898,193863],[219143,210685],[237390,222537],[239788,223743],
									[237941,224797],[235994,225107],[235203,226683],[242247,228928],[245085,231573],
									[247363,235026],[241417,236014],[247551,242375],[252199,246483],[259882,252857],
									[256820,249972],[253406,251104],[240149,238622],[245492,244388],[255081,253904],
									[260865,258926],[270290,266619],[269315,263619],[271029,266967],[266497,259837],
									[271776,260251],[268983,260906],[268061,258517],[267422,260565],[272058,261134],
									[287217,271292],[297591,278011],[300762,282777],[304505,286510],[309152,289465],
									[305890,286262],[305822,286998],[305942,290944],[304503,292470],[296983,292643],
									[292206,289126],[298783,294490],[308447,300110],[311285,297177],[311285,297177]
								],
								//Forest L8
								[
									[214600,188677],[210350,187532],[213989,193938],[213678,197545],[208667,196387],
									[208774,200690],[210035,200085],[222282,205427],[225307,207035],[219390,205087],
									[219114,208357],[230733,218774],[235094,221640],[234872,222614],[240009,227025],
									[243968,234245],[248972,238593],[252105,237630],[250975,241057],[249392,242858],
									[261766,251597],[263697,248206],[261168,247105],[262526,251248],[279536,263502],
									[279064,267268],[286516,273050],[289616,279172],[291980,282013],[292235,277335],
									[301909,286236],[306524,290818],[318699,297947],[323709,300829],[324025,302468],
									[318792,303167],[328013,309482],[328128,312539],[327428,306690],[321942,302962],
									[326563,306768],[327482,311218],[335657,317790],[321350,311363],[310249,303670],
									[317315,309778],[339426,329464],[346855,341763],[356011,345844],[371122,351070],
									[397642,369708],[401348,379462],[390145,373207],[395353,378739],[400054,386160],
									[415417,397031],[410333,394683],[409960,392268],[432765,403468],[443905,414245],
									[443907,414696],[445569,417628],[440139,413290],[444953,423487],[441043,428832],
									[446479,441380],[442953,438109],[454278,445409],[461067,443285],[458076,434010],
									[468776,438302],[476285,442196],[466020,437097],[470461,441010],[488601,459229],
									[503580,478719],[500125,490263],[484976,477876],[502477,496584],[512534,510436],
									[514702,510356],[504183,496535],[506140,488789],[512735,497040],[531464,509119],
									[532259,519954],[543662,527701],[536457,517434],[518192,508932],[509838,497151],
									[528825,506445],[541619,519720],[558726,532109],[563297,544992],[567209,542141],
									[554545,539156],[543496,521533],[541984,520795],[557960,528295],[557960,528295]
								],
								//Forest L9
								[
									[351275,310377],[353850,312821],[355088,317854],[356676,320891],[360136,323300],
									[368405,328848],[370835,331360],[372010,332020],[371437,333860],[373974,336908],
									[381069,344963],[387967,352314],[391665,354810],[397105,358944],[406921,366454],
									[413098,373575],[417360,380402],[424532,387390],[434959,396558],[440951,403991],
									[450837,410235],[449602,412004],[452875,419292],[462177,428585],[471659,435342],
									[486755,444364],[492018,449555],[494584,450120],[494268,454576],[495171,460950],
									[511896,471241],[516800,474072],[521359,478717],[526164,484187],[519501,481391],
									[520231,483644],[518179,483987],[530459,496708],[546729,511765],[554205,524826],
									[562118,529576],[563357,522583],[571363,528361],[590014,540300],[624051,568512],
									[632124,588953],[646459,597011],[663948,611415],[664308,614261],[663110,610832],
									[677746,619594],[677783,619257],[690587,632090],[694112,642214],[709386,658254],
									[717058,660285],[724952,666644],[734108,667010],[732081,670985],[723460,668484],
									[716065,667785],[722308,672433],[729443,674154],[753039,688017],[756728,696539],
									[752781,699307],[745449,698046],[762199,713551],[782422,730105],[782952,743706],
									[774170,755296],[787387,762704],[823343,793007],[822009,770486],[815586,772000],
									[835279,788218],[834038,792621],[832800,795280],[846530,797824],[845206,800196],
									[846243,811858],[872765,836361],[890370,833943],[888712,836606],[874064,827794],
									[872199,837342],[894056,871463],[909069,883898],[903262,865000],[904306,853327],
									[884190,837446],[880659,836541],[872744,833578],[878847,847103],[909584,872769],
									[910073,888862],[903893,873202],[911034,870815],[913314,869055],[913314,869055]
								],
								//Forest L10
								[
									[533250,477043],[514100,486999],[539791,489432],[536191,492700],[525671,493011],
									[528443,501279],[546175,514271],[559729,527934],[550622,534312],[565133,545332],
									[579856,556449],[610050,568271],[622076,577182],[640042,588456],[645989,598753],
									[641769,607081],[633953,614861],[635174,612180],[651623,620732],[637434,620131],
									[656285,642897],[662812,643813],[698678,667919],[707025,686521],[715402,698554],
									[723926,717386],[727783,717350],[738136,721392],[739619,710459],[734107,707591],
									[777006,731533],[784927,735743],[790454,738545],[791563,738843],[818404,764728],
									[830237,776296],[835137,787078],[836829,796096],[837037,804635],[862390,814655],
									[875555,831362],[898429,865325],[922106,903864],[936950,917269],[916715,886427],
									[916572,889773],[931402,892281],[942671,907187],[954812,924754],[951939,911609],
									[952557,916516],[952285,922023],[975551,929292],[986434,937301],[1009440,963827],
									[1033765,994553],[1059728,1028267],[1037178,990485],[1040796,991617],[1044839,993452],
									[1051885,999768],[1059646,1007158],[1072335,1021525],[1086197,1037561],[1100868,1054743],
									[1098108,1047405],[1105824,1060246],[1113929,1074846],[1132315,1106923],[1149217,1115960],
									[1169790,1142158],[1154899,1110236],[1159621,1111835],[1164762,1114426],[1172175,1120962],
									[1199140,1153257],[1230703,1191716],[1265459,1234406],[1223272,1183102],[1221347,1185701],
									[1219819,1189833],[1231486,1186403],[1239654,1191881],[1248511,1198500],[1257133,1206363],
									[1265778,1214627],[1274402,1223119],[1285120,1232290],[1296300,1241637],[1307815,1251098],
									[1311077,1258273],[1318828,1266702],[1326657,1275153],[1335005,1283751],[1343475,1292383],
									[1352030,1301039],[1361575,1310667],[1371351,1320515],[1386450,1335720],[1386450,1335720]
								]
							],
							[
								//Mountain L1
								[
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],
									[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]
								],
								//Mountain L2
								[
									[690,690],[703,702],[715,712],[729,725],[742,737],
									[755,749],[769,761],[783,774],[797,787],[811,799],
									[825,812],[839,824],[853,837],[867,849],[881,862],
									[895,875],[908,887],[922,899],[936,912],[950,924],
									[964,937],[978,950],[992,962],[1006,975],[1020,987],
									[1034,1000],[1048,1012],[1062,1025],[1076,1038],[1090,1050],
									[1104,1063],[1118,1075],[1132,1088],[1145,1100],[1159,1113],
									[1173,1125],[1187,1137],[1201,1150],[1215,1163],[1229,1175],
									[1243,1188],[1257,1200],[1271,1213],[1285,1226],[1299,1238],
									[1313,1251],[1327,1263],[1341,1276],[1355,1289],[1368,1301],
									[1358,1297],[1341,1288],[1322,1278],[1400,1334],[1396,1334],
									[1386,1330],[1363,1317],[1450,1380],[1476,1401],[1501,1421],
									[1519,1436],[1536,1451],[1550,1464],[1564,1476],[1578,1489],
									[1592,1502],[1605,1514],[1619,1527],[1633,1539],[1647,1552],
									[1661,1564],[1675,1577],[1689,1589],[1703,1602],[1717,1615],
									[1731,1627],[1745,1640],[1759,1652],[1773,1665],[1787,1677],
									[1801,1690],[1815,1703],[1828,1715],[1842,1727],[1798,1695],
									[1741,1652],[1674,1602],[1770,1677],[1728,1644],[1671,1600],
									[1863,1754],[1909,1791],[1950,1825],[1974,1846],[1976,1860],
									[1972,1873],[1966,1885],[2025,1904],[2070,1931],[2070,1931]
								],
								//Mountain L3
								[
									[2970,2835],[3060,3060],[2988,2917],[2971,2915],[3051,2964],
									[3031,2953],[2922,2870],[3058,2989],[2945,2900],[3109,3046],
									[3078,3027],[3381,3300],[3476,3393],[3563,3477],[3626,3541],
									[3681,3599],[3732,3654],[3782,3707],[3831,3759],[3802,3741],
									[3757,3707],[3699,3662],[3942,3892],[4022,3973],[4099,4051],
									[4157,4112],[4210,4167],[4261,4221],[4310,4274],[4359,4326],
									[4407,4378],[4348,4324],[4266,4248],[4165,4154],[4487,4474],
									[4578,4569],[4666,4659],[4729,4725],[4787,4783],[4844,4839],
									[4900,4892],[4955,4944],[5010,4996],[5065,5048],[5096,5078],
									[5072,5058],[5033,5024],[5083,5068],[5274,5244],[5359,5323],
									[5435,5394],[5422,5382],[5341,5311],[5235,5217],[5428,5400],
									[5630,5580],[5734,5675],[5816,5750],[5881,5811],[5942,5868],
									[5999,5922],[6056,5975],[6112,6027],[6167,6078],[6222,6130],
									[6277,6182],[6333,6233],[6388,6285],[6443,6336],[6498,6388],
									[6553,6439],[6608,6491],[6663,6542],[6588,6453],[6484,6331],
									[6188,6033],[6370,6257],[6244,6153],[6782,6653],[6925,6787],
									[7053,6907],[7134,6983],[7131,6993],[7104,6984],[7062,6964],
									[7302,7155],[7313,7174],[7305,7180],[7267,7163],[7518,7359],
									[7607,7434],[7690,7507],[7755,7566],[7815,7621],[7873,7675],
									[7930,7727],[7990,7784],[8054,7843],[8154,7937],[8154,7937]
								],
								//Mountain L4
								[
									[9990,9378],[9840,9840],[9864,9600],[10078,9697],[9976,9608],
									[9660,9370],[10299,9865],[10347,9915],[11035,10534],[11300,10791],
									[11543,11030],[11734,11226],[11911,11410],[12079,11586],[12244,11759],
									[12406,11930],[12569,12102],[12731,12273],[12893,12444],[13053,12614],
									[13215,12785],[13106,12729],[12936,12622],[12722,12479],[13442,13124],
									[13551,13259],[13627,13369],[14169,13838],[14406,14068],[14627,14286],
									[14542,14241],[14310,14095],[14012,13897],[14435,14318],[14168,14028],
									[13595,13520],[14149,14025],[15367,15150],[15807,15570],[16064,15845],
									[16193,16009],[16273,16132],[16450,16272],[16236,16107],[15947,15877],
									[16456,16361],[17032,16896],[16965,16862],[16761,16705],[16767,16690],
									[17700,17574],[18015,17882],[18297,18163],[18502,18373],[18687,18565],
									[18857,18744],[19023,18919],[19187,19091],[19349,19262],[19512,19434],
									[19674,19605],[19835,19775],[19997,19946],[20158,20117],[20320,20288],
									[20287,20265],[20212,20198],[19643,19637],[19743,19736],[19356,19346],
									[20796,20774],[20950,20924],[21020,20991],[20928,20898],[21766,21713],
									[22062,21998],[22161,22096],[22156,22095],[21892,21849],[22276,22211],
									[22237,22176],[23035,22929],[23328,23206],[23601,23465],[23888,23760],
									[24227,24131],[24574,24374],[24244,23860],[23788,23164],[23401,23150],
									[24195,23956],[23921,23769],[23611,23550],[24545,24487],[25464,25360],
									[25419,25250],[25390,25224],[25259,25108],[26542,26258],[26542,26258]
								],
								//Mountain L5
								[
									[31410,28396],[32790,29411],[31479,29157],[30828,29045],[32639,30205],
									[32826,30438],[32424,30434],[31712,30274],[33379,31452],[34298,32125],
									[34022,32113],[34466,32427],[33808,32622],[33767,32753],[33132,31828],
									[34956,32975],[34952,33408],[33097,32271],[34084,33205],[35102,34028],
									[34618,34281],[35075,34850],[37385,36924],[38544,37702],[40497,39323],
									[40073,39719],[39941,39732],[40784,40698],[40168,39966],[42031,41656],
									[41844,40781],[43110,41879],[43852,42031],[43318,42475],[45235,44106],
									[46359,44538],[45835,44296],[47395,45816],[46485,45522],[46840,45707],
									[46582,45724],[46088,45771],[46791,46332],[48698,47657],[50963,49166],
									[50469,48873],[50842,50036],[49292,48556],[50109,49855],[50205,50067],
									[51380,51321],[52582,52263],[53680,52738],[54120,52437],[55695,53946],
									[54966,53548],[55847,53547],[56011,54237],[56189,53579],[56632,55055],
									[57935,56276],[56673,55849],[56050,55646],[57917,57390],[56646,55829],
									[58919,57861],[57540,56945],[60484,59427],[64009,62095],[65459,63309],
									[66512,64219],[66837,64758],[67177,65364],[67442,65945],[69045,67085],
									[68834,67182],[69029,67662],[70209,68161],[70832,68669],[70289,68288],
									[69422,67707],[68634,66832],[71353,68620],[71258,68390],[69383,68280],
									[71958,70818],[71524,70158],[71541,70357],[70023,69360],[72996,72220],
									[76730,75143],[79122,77246],[80453,77582],[78052,76469],[76033,75200],
									[73655,72399],[76354,74114],[79211,76141],[81666,79508],[81666,79508]
								],
								//Mountain L6
								[
									[72150,62745],[71580,65594],[70122,64150],[72488,65902],[72167,66872],
									[70873,66606],[70106,67454],[69416,67732],[71800,69316],[73346,69597],
									[76113,72200],[76934,73490],[77509,72721],[73898,71076],[76393,72836],
									[77642,73777],[77912,74597],[83166,78625],[82859,79247],[85301,81830],
									[86659,80960],[90887,84468],[90823,85467],[91590,87462],[93798,87831],
									[92049,88028],[95764,90854],[94373,91709],[96679,93288],[101653,96358],
									[100838,97552],[100406,95351],[101545,96640],[106456,98636],[105942,98736],
									[102908,97908],[103275,99703],[103416,100912],[107339,104077],[110891,106425],
									[107986,106630],[105802,103839],[108601,105683],[112300,107937],[110532,108064],
									[114671,110225],[118901,111920],[118299,111505],[119796,113283],[123921,115090],
									[123867,117468],[122182,118270],[123869,119430],[124628,119337],[121497,118048],
									[122644,118018],[127180,120955],[124289,119359],[130969,122961],[128399,121491],
									[132604,124865],[132888,127860],[138820,132968],[139812,136682],[144251,139759],
									[147168,139315],[149721,141320],[152735,146297],[155812,152206],[155320,151321],
									[156127,149867],[157662,152083],[157518,148024],[158980,148610],[161105,149546],
									[159759,148800],[158245,148925],[155110,151035],[159515,155125],[163217,159250],
									[160026,154362],[157858,155185],[161650,158509],[166125,162931],[166437,161438],
									[170273,164241],[171249,167922],[171083,167527],[167712,165255],[168288,163865],
									[172980,164756],[174049,165158],[178031,167312],[179813,168597],[181430,169882],
									[182763,171071],[184147,172365],[185509,173672],[187590,175685],[187590,175685]
								],
								//Mountain L7
								[
									[145710,127730],[140070,126769],[144371,130483],[144207,130695],[146255,132804],
									[146665,134693],[146795,137116],[143822,136576],[148042,138368],[148800,141032],
									[150498,141711],[149642,141583],[150211,144438],[156875,149117],[157527,152442],
									[156813,152040],[159172,156134],[165871,161840],[170659,163448],[169844,164317],
									[167378,160132],[164127,161902],[170705,168108],[178973,173999],[180128,169853],
									[187498,174142],[193295,179362],[196368,183399],[195268,184526],[207634,193285],
									[210539,197725],[209742,200356],[210523,199238],[201932,196230],[200750,198229],
									[195568,194057],[207282,203569],[218282,209060],[228606,212521],[230939,214089],
									[227960,213556],[230049,216383],[225688,216744],[236271,226305],[233449,230240],
									[231414,229433],[230423,227134],[235372,227421],[246151,233154],[245367,232888],
									[241152,230529],[256080,239515],[258987,241433],[267397,248504],[271160,251838],
									[271990,252690],[271654,252576],[271994,255361],[283687,268426],[287394,276595],
									[288272,273521],[285192,275009],[297038,282194],[291670,279609],[296385,280902],
									[296706,283534],[299131,291097],[303994,292761],[315149,305951],[309924,297918],
									[299318,293641],[294709,286389],[310548,296340],[315072,301206],[318195,306689],
									[320608,314137],[324046,314351],[326545,309898],[328210,311049],[329587,312929],
									[332009,319492],[336885,323083],[337278,328224],[334005,322438],[331121,322983],
									[340180,329089],[346011,335715],[346311,342791],[343086,340190],[335322,330022],
									[344729,333338],[354913,337817],[359791,340729],[364843,344581],[369343,348469],
									[372247,353324],[369932,354017],[370078,357371],[378846,357643],[378846,357643]
								],
								//Mountain L8
								[
									[258540,227156],[249240,230153],[261488,236793],[260876,238118],[260779,238515],
									[264906,243864],[268628,246620],[273111,250992],[275097,252534],[273836,253411],
									[269533,255038],[275436,260915],[279053,261725],[279384,264317],[274154,265831],
									[283966,270899],[301940,281602],[316956,295582],[316548,300568],[311680,294320],
									[306369,291714],[315489,295940],[323445,302232],[331389,309774],[340846,320402],
									[341632,324343],[347007,336355],[349151,340812],[347876,341738],[354072,344913],
									[364209,349982],[366434,345181],[375584,351389],[377136,351528],[369629,351840],
									[385742,365158],[386872,370706],[389352,375787],[391922,375606],[403010,386323],
									[417986,390789],[419262,392446],[416741,393905],[417678,393727],[429614,404720],
									[428090,405554],[423179,405864],[436625,410361],[439079,412515],[440200,413374],
									[451790,430293],[471884,449564],[487167,470323],[484845,465768],[516205,483151],
									[522808,488230],[533592,496995],[531086,504807],[529870,503512],[536445,510052],
									[544713,508752],[539450,507386],[531600,501479],[534760,506015],[543376,512706],
									[543131,519624],[532167,519846],[532948,520257],[522783,511311],[545611,525305],
									[548746,524354],[549672,525353],[539701,520255],[553100,530676],[551982,541695],
									[556419,539853],[574787,550703],[582987,554501],[575104,554528],[589189,562223],
									[593549,570852],[586992,568597],[586402,562258],[579435,557618],[575985,560483],
									[597593,577412],[612490,588463],[625331,597910],[636646,595656],[625469,592591],
									[619053,592009],[603071,587103],[617444,602726],[609112,597369],[627426,611200],
									[621712,600676],[646196,608305],[666435,624376],[672204,636036],[672204,636036]
								],
								//Mountain L9
								[
									[428430,370853],[419670,373273],[426662,381635],[431352,384942],[431378,385825],
									[432531,389181],[433143,393249],[439538,398137],[448237,402754],[457258,407415],
									[459156,410786],[460132,416257],[471887,428306],[487026,437487],[497560,446644],
									[506570,454565],[509542,462047],[511843,467453],[515373,470645],[517025,474310],
									[531752,485823],[551939,498533],[564951,511734],[564948,520289],[567245,520761],
									[570058,522621],[581542,531409],[598736,542385],[600545,548790],[605240,556574],
									[607854,557672],[618284,566943],[628603,570867],[628852,575625],[624468,580764],
									[617939,578101],[617410,578831],[623700,585206],[654577,602115],[665006,611523],
									[673682,615225],[672685,621843],[685634,634440],[718296,664528],[759770,689841],
									[775566,711870],[782975,718029],[793308,725070],[796268,738206],[807724,754367],
									[833366,776146],[851929,775989],[860615,778039],[857288,774788],[846961,776490],
									[838022,775328],[852692,787752],[868791,800842],[861979,803808],[862188,800473],
									[843629,801044],[854989,810280],[846878,807305],[865805,817357],[887740,827375],
									[914472,835929],[923173,842036],[926047,853638],[914561,859298],[920235,857584],
									[903520,850133],[923978,860354],[931475,867511],[925158,867772],[932749,883989],
									[950076,908216],[943870,907505],[931448,894375],[964690,905548],[977741,922290],
									[994629,949955],[1003301,968944],[993584,947871],[985230,933555],[988968,940311],
									[977098,944041],[1005972,960242],[1017161,965089],[1019684,975408],[1009552,969064],
									[1011257,977525],[1015073,983210],[1047988,996586],[1052590,1005194],[1041338,990914],
									[1052111,1005714],[1096654,1022537],[1102263,1025920],[1113918,1038388],[1113918,1038388]
								],
								//Mountain L10
								[
									[656160,582434],[579390,535504],[615839,576340],[631357,588023],[657902,609625],
									[651402,613625],[657924,619713],[653784,607233],[662378,616073],[708418,649532],
									[711964,653876],[729296,670121],[702157,659912],[691110,666931],[719991,693491],
									[781600,740155],[796464,765542],[802766,761966],[796893,769165],[813642,786468],
									[828058,794264],[815045,804123],[809163,793965],[864091,833627],[893752,835898],
									[913516,847869],[917386,854920],[916624,861956],[902521,866137],[928490,881368],
									[922390,888120],[943581,899461],[935636,903967],[951560,914874],[997940,936774],
									[1017085,949911],[1033562,962324],[1046421,973602],[1059191,984732],[1071537,995702],
									[1085381,1016484],[1092072,1043556],[1110070,1091633],[1135305,1115720],[1181790,1146925],
									[1197503,1140750],[1190137,1140576],[1209994,1167859],[1194087,1126266],[1211389,1143635],
									[1221512,1164146],[1181985,1161709],[1164626,1145465],[1189317,1157961],[1217612,1158822],
									[1233713,1167461],[1247505,1176536],[1242971,1178405],[1236148,1187848],[1226778,1198172],
									[1282417,1242204],[1294695,1232817],[1310675,1242683],[1307169,1243701],[1299744,1244891],
									[1289284,1245137],[1345154,1279194],[1368953,1299083],[1392995,1319581],[1391623,1317703],
									[1401059,1326622],[1410073,1335455],[1420194,1345470],[1410758,1344295],[1397098,1340765],
									[1380327,1335469],[1441424,1375284],[1467426,1391542],[1494282,1407577],[1517429,1420947],
									[1510967,1429941],[1500381,1430022],[1466536,1416915],[1427064,1399887],[1452494,1424276],
									[1511552,1468928],[1525621,1487703],[1557653,1502204],[1555453,1512999],[1557712,1533775],
									[1555642,1520577],[1604274,1543761],[1621920,1554506],[1638316,1566530],[1650989,1577455],
									[1662698,1588280],[1674955,1600135],[1687228,1612209],[1706015,1630814],[1706015,1630814]
								]
							]
						], // LEAVE THIS LINE

					//seaData: "MDD", //l=32
					//resData: "XIB",
					//riverData: "ODD", //l=68
					objData: "none",
					playerData: "none",
					allianceData: "none",
					configMain: null,

					// object data:
						//objType: "JKD",

						// cities, type 1
						//cityHasWater:"RKD",
						//cityHasCastle:"SKD",
						//cityIsEnlightened:"TKD",
						//cityPalaceUpgrading:"UKD",
						//cityPalaceLevel:"VKD",
						//cityEnlightenType:"WKD",
						//cityPalaceDamage:"XKD",
						//cityPoints:"YKD",
						//playerIndex:"ZKD",
						//cityEnlightenmentStep:"ALD",
						//cityPlunderProtection:"BLD",
						//cityName:"CLD",

						// dungeons, type 2
						//dungType:"BKD",
						//dungLevel:"CKD",
						//dungProgress:"DKD",
						//dungActive:"EKD",
						//dungStart:"FKD",

						// bosses, type 3
						//bossType:"LKD",
						//bossLevel:"MKD",
						//bossActive:"NKD",
						//bossStart:"OKD",

						// moongate, type 4

						// shrine, type 5
						//shrineType:"QMD",

						// lawless city, type 6
						//lawlessHasWater:"BMD",
						//lawlessHasCastle:"AMD",
						//lawlessScore:"CMD",

					// player data
						//playerID:"FLD",
						//playerPoints:"GLD",
						//playerName:"HLD",
						//playerAllianceIndex:"ILD",
						//playerPeaceStart:"JLD",
						//playerPeaceDuration:"KLD",

					// alliance data
						//allianceID:"NLD",
						//allianceName:"PLD",
						//alliancePoints:"OLD",

					initSKSU: function()
					{
						this.configMain = ClientLib.Config.Main.GetInstance();
					},

					showOutputWindow: function( title, text )
					{
						var win = new qx.ui.window.Window(title);
						win.setLayout(new qx.ui.layout.Grow);
						win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
						win.setWidth(550);
						win.setHeight(700);

						var ta = new qx.ui.form.TextArea(text);
						ta.addListener("click", function(){this.selectAllText();});
						win.add(ta, {left:10, top:10, bottom:10, right:10} );

						win.center();
						win.open();
					},

					getObfuscatedNames: function()
					{
						if( $SKSU.objData == "none" )
						{
							for( var cluster in $SKSU.worldData.d )
							{
								for( var key in $SKSU.worldData.d[cluster] )
								{
									var d = $SKSU.worldData.d[cluster][key];
									if( d.hasOwnProperty( "d" ) )
									{
										for( var dkey in d.d )
										{
											if( d.d[dkey].hasOwnProperty( "Type" ) )
												$SKSU.objData = key;
											else if( d.d[dkey].hasOwnProperty( "Alliance" ) )
												$SKSU.playerData = key;
											else
												$SKSU.allianceData = key;
											break;
										}
									}
									if( $SKSU.objData != "none" && $SKSU.playerData != "none" && $SKSU.allianceData != "none" )
										break;
								}
								break;
							}
						}
					},

					unitShortName: function( unitType )
					{
						switch( unitType )
						{
							case 3: return "Rng";
							case 4: return "Grd";
							case 5: return "Tmp";
							case 6: return "Zrk";
							case 7: return "Mge";
							case 9: return "Xbw";
							case 10: return "Pal";
							case 11: return "Knt";
							case 12: return "Lck";
							case 15: return "Frg";
							case 16: return "Slp";
							case 17: return "WG";
						}
						return webfrontend.res.Main.getInstance().units[unitType].dn;
					},

					dungShortName: function( dungType )
					{
						switch( dungType )
						{
							case 2: return "Sea";
							case 3: return "Hil";
							case 4: return "Mtn";
							case 5: return "For";
						}
						return "Unk";
					},
					dungName: function( dungType )
					{
						switch( dungType )
						{
							case 2: return "Sea";
							case 3: return "Hill";
							case 4: return "Mountain";
							case 5: return "Forest";
						}
						return "Unknown";
					},
					dungProgressType: function( dungType )
					{
						switch( dungType )
						{
							case 4: return 1; // mountain
						}
						return 0; // use the forest progress
					},

					bossName: function( bossType )
					{
						switch( bossType )
						{
							case 6: return "Dragon";
							case 7: return "Moloch";
							case 8: return "Hydra";
							case 12: return "Octopus";
						}
						return "Unknown";
					},

					bossUnitType: function( bossType, bossLevel )
					{
						var ut = null;
						switch( bossType )
						{
							case 6: // dragon
								ut = [ 33, 36, 39, 42, 45, 48, 49, 50, 51, 52 ];
								break;
							case 8: // hydra
								ut = [ 34, 37, 40, 43, 46, 53, 54, 55, 56, 57 ];
								break;
							case 7: // moloch
								ut = [ 35, 38, 41, 44, 47, 58, 59, 60, 61, 62 ];
								break;
							case 12: // octopus
								ut = [ 67, 68, 69, 70, 71, 72, 73, 74, 75, 76 ];
								break;
						}
						return ut[parseInt(bossLevel) - 1];
					},

					shrineNames: ["Inactive", "Compassion", "Honesty", "Honor", "Humility", "Justice", "Sacrifice", "Spirituality", "Valor"],

					leftPad: function( num, minsize, padstring )
					{
						var str = num.toString();
						while( str.length < minsize )
							str = padstring + str;
						return str;
					},
					safeGetProperty: function( obj, prop )
					{
						if( obj && obj.hasOwnProperty( prop ) )
							return obj[prop];
						return null;
					},
					coordsFromCluster: function( clusterID, coordRef )
					{
						var clusterY = Math.floor(clusterID / 32);
						var clusterX = clusterID - (clusterY * 32);

						var x = clusterX * 32 + (coordRef & 0xffff);
						var y = clusterY * 32 + (coordRef >> 16);
						return x | (y<<16);
					},

                    dungeonLoot :
					{
						"Giant Spider" : 25,
						"Thief" : 33,
						"Centaur" : 70,
						"Troll" : 290,
						"Skeleton" : 25,
						"Ghoul" : 33,
						"Gargoyle" : 135,
						"Daemon" : 340,
						"Orc" : 30,
						"Troglodyte" : 40,
						"Ettin" : 120,
						"Minotaur" : 250,
						"Pirate Dhow" : 75,
						"Pirate Sloop" : 250,
						"Pirate Frigate" : 650,
						"Pirate War Galleon" : 1400
					},
					rankingsStepHasContData: function()
					{
						switch( this.rankingsDataStep )
						{
							case 0:
							case 1:
							case 2:
							case 6:
								return true;
						}
						return false;
					},
					rankingsReportType: function()
					{
						switch( this.rankingsDataStep )
						{
							case 0: return 0;//player score
							case 1: return 3;//player offense
							case 2: return 4;//player defense
							case 3: return 8;//player offensive fame
							case 4: return 9;//player defensive fame
							case 5: return 5;//player units defeated
							case 6: return 0;//alliance score
							case 7: return 2;//alliance faith
						}
						return -1;
					},
					rankingsRowType: function()
					{
						switch( this.rankingsDataStep )
						{
							case 6:
							case 7:
								return "AllianceGetCount";
						}
						return "PlayerGetCount";
					},
					rankingsRangeType: function()
					{
						switch( this.rankingsDataStep )
						{
							case 6:
							case 7:
								return "AllianceGetRange";
						}
						return "PlayerGetRange";
					},
					rankingsSortKey: function()
					{
						switch( this.rankingsDataStep )
						{
							case 0: return 0;//player score
							case 1: return 14;//player offense
							case 2: return 15;//player defense
							case 3: return 27;//player offensive fame
							case 4: return 28;//player defensive fame
							case 5: return 17;//player units defeated
							case 6: return 0;//alliance score
							case 7: return 7;//alliance faith
						}
						return 0;
					},
					rankingsLongName: function()
					{
						switch( this.rankingsDataStep )
						{
							case 0: return "PlayerScore";//player score
							case 1: return "PlayerOffense";//player offense
							case 2: return "PlayerDefense";//player defense
							case 3: return "PlayerOffFame";//player offensive fame
							case 4: return "PlayerDefFame";//player defensive fame
							case 5: return "PlayerUnitsDef";//player units defeated
							case 6: return "AllianceScore";//alliance score
							case 7: return "AllianceFaith";//alliance faith
						}
						return "";
					},
					rankingsName: function()
					{
						switch( this.rankingsDataStep )
						{
							case 0: return "pscore";//player score
							case 1: return "po";//player offense
							case 2: return "pd";//player defense
							case 3: return "pofame";//player offensive fame
							case 4: return "pdfame";//player defensive fame
							case 5: return "pud";//player units defeated
							case 6: return "ascore";//alliance score
							case 7: return "afaith";//alliance faith
						}
						return 0;
					},
					curContID: function()
					{
						if( this.rankingsStepHasContData() )
							return this.activeConts[this.curContX];
						return -1;
					},
					onContListLoaded:function(r,fy)
					{
						if(r==false||!fy)
							return;
						this.setContList(fy['p'],0);
					},
					setContList:function(fE,fF)
					{
						if(fE==null)
							return;
						fE.sort(function(a,b){return a-b;});

						var nActive = 0;
						for(var i=0;i<fE.length;i++)
						{
							if( fE[i] >= 0 )
							{
								this.activeConts[nActive] = fE[i];
								nActive++;
							}
						}

						this.getRankingsData();
					},

					getRankingsData: function()
					{
						if( this.activeConts.length == 0 )
						{
							webfrontend.net.CommandManager.getInstance().sendCommand
							(
								"PlayerGetStatisticInitData",
								null,
								this,
								this.onContListLoaded
							);
							return;
						}

						if( this.rankingsDataStep == -1 )
						{
							this.rankingsDataStep = 0;
							this.curContX = 0;
							this.rankingsDataString = "<sksRankingsExport>\n<exportversion>0x900</exportversion>\n";

							var U=webfrontend.data.ServerTime.getInstance();
							var W=U.getServerStep();
							var Y=U.getStepTime(W);
							Y=new Date(Y.getTime()+U.getServerOffset());
							var si=webfrontend.data.Server.getInstance();

							this.rankingsDataString += "<server>" + si.getName() + "</server>\n";
							this.rankingsDataString += "<time>" + $SKSU.leftPad(Y.getUTCMonth()+1, 2, "0") + $SKSU.leftPad( Y.getUTCDate(), 2, "0" ) +
									$SKSU.leftPad(Y.getUTCFullYear(), 4, "0") + " " +
									$SKSU.leftPad(Y.getUTCHours(), 2, "0") + $SKSU.leftPad( Y.getUTCMinutes(), 2, "0" ) + $SKSU.leftPad( Y.getUTCSeconds(), 2, "0" ) +
									"</time>\n";

							var win = new qx.ui.window.Window("Rankings Data");
							win.setLayout(new qx.ui.layout.Canvas);
							win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
							win.setWidth(300);
							win.setHeight(100);

							var ta = new qx.ui.form.TextField("Retrieving rankings data");
							ta.set({textAlign:"center",readOnly:true});
							win.progLabel = ta;
							win.add(ta, {left:10, top:10, bottom:10, right:10} );
							win.addListener( "close", function() { $SKSU.rankingsProgress = null; }, this );

							//$SKSU.a.desktop.add( win );
							win.center();
							win.open();
							$SKSU.rankingsProgress = win;
						}
						else
						{
							this.curContX++;
							if( this.curContX >= this.activeConts.length || this.curContID() == -1 )
							{
								this.curContX = 0;
								this.rankingsDataStep++;
								if( this.rankingsDataStep > 7 )
								{
									if( $SKSU.rankingsProgress != null )
									{
										$SKSU.rankingsProgress.close();
									}

									this.rankingsDataString += "</sksRankingsExport>";
									var win = new qx.ui.window.Window("Rankings Data");
									win.setLayout(new qx.ui.layout.Grow);
									win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
									win.setWidth(550);
									win.setHeight(700);

									var ta = new qx.ui.form.TextArea(this.rankingsDataString);
									ta.addListener("click", function(){this.selectAllText();});
									ta.set( {alignX:"center", alignY:"middle"} );
									win.add(ta, {left:10, top:10, bottom:10, right:10} );

									//$SKSU.a.desktop.add( win );
									win.center();
									win.open();

									this.rankingsDataStep = -1;
									this.rankingsDataString = "";
									return;
								}
							}
						}
						if( $SKSU.rankingsProgress != null )
						{
							$SKSU.rankingsProgress.progLabel.setValue( "Retrieving " + this.rankingsLongName() +
								" for continent " + this.curContID().toString() );
						}
						webfrontend.net.CommandManager.getInstance().sendCommand
						(
							this.rankingsRowType(),
							{ continent:this.curContID(), type:this.rankingsReportType() },
							this,
							this._onRowCountCompleted
						);
					},
					_onRowCountCompleted: function( r, f )
					{
							info( "Row Count " + f );
							this.rowCount = Number(f);
							if( this.rowCount > 0 )
							{
								webfrontend.net.CommandManager.getInstance().sendCommand
								(
									this.rankingsRangeType(),
									{
										start:0, end:this.rowCount - 1,
										sort:this.rankingsSortKey(), ascending:true,
										continent:this.curContID(), type:this.rankingsReportType()
									},
									this,this._onLoadRowDataCompleted
								);
							}
							else
							{
								this.getRankingsData();
							}
					},
					_onLoadRowDataCompleted:function(r,rows)
					{
						if(r!=false)
						{
							this.rankingsDataString += "<"+this.rankingsName()+" cont=\"" + this.curContID() + "\">\n";
							info( rows.length + " rows of " + this.rankingsReportType() );
							for( var i = 0; i < rows.length; i++ )
							{
								var d = rows[i];
								switch( this.rankingsDataStep )
								{
									case 0: //player score
										// playerid,allianceid,score,cities
										this.rankingsDataString += "<r>" + d.i + "," + d.j + "," + d.p + "," + d.c + "</r>\n";
										break;
									case 1: //player offense
									case 2: //player defense
									case 3: //player offensive fame
									case 4: //player defensive fame
									case 5: //player units defeated
										// playerid,allianceid,score
										this.rankingsDataString += "<r>" + d.i + "," + d.j + "," + d.p + "</r>\n";
										break;
									case 6: //alliance score
										// allianceid,score,members,avg,cities
										this.rankingsDataString += "<r>" + d.i + "," + d.p + "," + d.m + "," + d.a + "," + d.c + "</r>\n";
										break;
									case 7: //alliance faith
										// allianceid,total,percent,compassion,compassion%,honesty,honesty%,honor,honor%,humility,humility%,
										// justice,justice%,sacrifice,sacrifice%,spirituality,spirituality%,valor,valor%
										this.rankingsDataString += "<r>" + d.i + "," + d.p + "," + d.pp + "," +
											d.c + "," + d.cp + "," + d.o + "," + d.op + "," + d.h + "," + d.hp + "," +
											d.u + "," + d.up + "," + d.j + "," + d.jp + "," + d.f + "," + d.fp + "," +
											d.s + "," + d.sp + "," + d.v + "," + d.vp + "</r>\n";
										break;
									default: //unknown
										info( "Row: ", d );
										var comm = false;
										for( var key in d )
										{
											if( comm )
												this.rankingsDataString += ", ";
											else
												comm = true;
											this.rankingsDataString += "{" + key + ":" + d[key] + "}";
										}
										this.rankingsDataString += "\n";
										break;
								}
							}
							this.rankingsDataString += "</"+this.rankingsName()+">\n";
						}
						this.getRankingsData();
					},

					nextCont: function()
					{
						var si=webfrontend.data.Server.getInstance();
						var cw=si.getContinentWidth();
						var ch=si.getContinentHeight();
						var cx=si.getContinentCountX();
						var cy=si.getContinentCountY();

						this.curContX++;
						if( this.curContX >= cx )
						{
							this.curContX = 0;
							this.curContY++;
							if( this.curContY >= cy )
								this.curContY = 0;
						}
					},
					showCont: function()
					{
						var si=webfrontend.data.Server.getInstance();
						var cw=si.getContinentWidth();
						var ch=si.getContinentHeight();
						webfrontend.gui.Util.showMapModeViewPos( 'w', 0, this.curContX * cw + cw/2, this.curContY * ch + ch/2 );
					},
					showNextCont: function()
					{
						if( $SKSU.a.visMain.getMapMode() == 'w' )
							this.nextCont();
						else
						{
							this.curContX = 0;
							this.curContY = 0;
						}
						this.showCont();
					},
					prevCont: function()
					{
						var si=webfrontend.data.Server.getInstance();
						var cw=si.getContinentWidth();
						var ch=si.getContinentHeight();
						var cx=si.getContinentCountX();
						var cy=si.getContinentCountY();

						this.curContX--;
						if( this.curContX < 0 )
						{
							this.curContX = cx - 1;
							this.curContY--;
							if( this.curContY < 0 )
								this.curContY = cy - 1;
						}
					},
					showPrevCont: function()
					{
						if( $SKSU.a.visMain.getMapMode() == 'w' )
							this.prevCont();
						else
						{
							this.curContX = 0;
							this.curContY = 0;
							this.prevCont();
						}
						this.showCont();
					},
					exportDungeons: function()
					{
						var dataString = "<sksDungeonExport>\n";
						var U=webfrontend.data.ServerTime.getInstance();

						var W=U.getServerStep();
						var Y=U.getStepTime(W);

						Y=new Date(Y.getTime()+U.getServerOffset());
						dataString += "<time>" + $SKSU.leftPad(Y.getUTCMonth()+1, 2, "0") + $SKSU.leftPad( Y.getUTCDate(), 2, "0" ) +
								$SKSU.leftPad(Y.getUTCFullYear(), 4, "0") + " " +
								$SKSU.leftPad(Y.getUTCHours(), 2, "0") + $SKSU.leftPad( Y.getUTCMinutes(), 2, "0" ) + $SKSU.leftPad( Y.getUTCSeconds(), 2, "0" ) +
								"</time>\n";

						
						for( var key in $SKSU.dungeonInfo )
						{
							var bi = $SKSU.dungeonInfo[key];
							var bv = bi.get_Coordinates();
							var x = bv&0xFFFF;
							var y = bv>>16;
							var bl = U.getStepTime(bi.get_StartStep());

							var Y = new Date( bl.getTime() + U.getServerOffset() );
							var ds = $SKSU.leftPad(Y.getUTCMonth()+1, 2, "0") + $SKSU.leftPad( Y.getUTCDate(), 2, "0" ) +
									$SKSU.leftPad(Y.getUTCFullYear(), 4, "0") + " " +
									$SKSU.leftPad(Y.getUTCHours(), 2, "0") + $SKSU.leftPad( Y.getUTCMinutes(), 2, "0" ) + 
									$SKSU.leftPad( Y.getUTCSeconds(), 2, "0" );
							dataString += "<d id=\"" + x + ":" + y + "\">" +
								$SKSU.dungName(bi.get_Type()) + "," + bi.get_Level() + "," + bi.get_Progress() + "," +
								bi.get_Active() + "," + ds +
								"</d>\n";
						}
						for( var key in $SKSU.dungeonReports )
						{
							if( $SKSU.dungeonInfo.hasOwnProperty( key ) )
							{
								var dr = $SKSU.dungeonReports[key];
								var bi = $SKSU.dungeonInfo[key];
								var bv = bi.get_Coordinates();
								var x = bv&0xFFFF;
								var y = bv>>16;

								for( var repIndex = 0; repIndex < dr.length; repIndex++ )
								{
									var rep = dr[repIndex];
									var Y = new Date( rep.time + U.getServerOffset() );
									var ds = $SKSU.leftPad(Y.getUTCMonth()+1, 2, "0") + $SKSU.leftPad( Y.getUTCDate(), 2, "0" ) +
											$SKSU.leftPad(Y.getUTCFullYear(), 4, "0") + " " +
											$SKSU.leftPad(Y.getUTCHours(), 2, "0") + $SKSU.leftPad( Y.getUTCMinutes(), 2, "0" ) + 
											$SKSU.leftPad( Y.getUTCSeconds(), 2, "0" );

									dataString += "<dr id=\"" + x + ":" + y + "\">" +
										ds + "," + rep.maxLoot + ",";

									for( var armyIndex = 0; armyIndex < rep.armies.length; armyIndex++ )
									{
										var army = rep.armies[armyIndex];
										dataString += army.armytype + "," + army.armysize + ",";
									}
									dataString += dr[repIndex].shareID + "</dr>\n";
								}
							}
						}
						
						dataString += "</sksDungeonExport>\n";

						var win = new qx.ui.window.Window("Exported Dungeons");
						win.setLayout(new qx.ui.layout.Grow);
						win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
						win.setWidth(550);
						win.setHeight(700);

						var ta = new qx.ui.form.TextArea(dataString);
						ta.addListener("click", function(){this.selectAllText();});
						win.add(ta, {left:10, top:10, bottom:10, right:10} );

						//$SKSU.a.desktop.add( win );
						win.center();
						win.open();
					},
					exportData: function()
					{
						$SKSU.getObfuscatedNames();
						var U=webfrontend.data.ServerTime.getInstance();
						var W=U.getServerStep();
						var Y=U.getStepTime(W);

						Y=new Date(Y.getTime()+U.getServerOffset());

						var dataString = "";

						var si=webfrontend.data.Server.getInstance();
						var contW=si.getContinentWidth();
						var contH=si.getContinentHeight();
						var contX=si.getContinentCountX();
						var contY=si.getContinentCountY();
						var clustersX = Math.ceil((contW * contX)/32);
						var clustersY = Math.ceil((contH * contY)/32);
						var totalClusters = clustersX * clustersY;

						var cx = 0;
						var cy = 0;
						var needAll = false;
						var haveClusters = 0;
						for( cx = 0; cx < clustersX; cx++ )
						{
							for( cy = 0; cy < clustersY; cy++ )
							{
								if( $SKSU.worldData.d.hasOwnProperty( (cx+cy*32) ) )
								{
									haveClusters++;
								}
							}
						}
						dataString += "<sksWorldExport>\n";

						if( haveClusters != totalClusters )
							dataString += "<missingdata>MISSING DATA got " + haveClusters + " out of " + totalClusters + " clusters</missingdata>\n";

						if( haveClusters == totalClusters || !needAll )
						{
							dataString += "<exportversion>0x902</exportversion>\n";
							dataString += "<server>" + si.getName() + "</server>\n";
							dataString += "<time>" + $SKSU.leftPad(Y.getUTCMonth()+1, 2, "0") + $SKSU.leftPad( Y.getUTCDate(), 2, "0" ) +
									$SKSU.leftPad(Y.getUTCFullYear(), 4, "0") + " " +
									$SKSU.leftPad(Y.getUTCHours(), 2, "0") + $SKSU.leftPad( Y.getUTCMinutes(), 2, "0" ) + $SKSU.leftPad( Y.getUTCSeconds(), 2, "0" ) +
									"</time>\n";
							dataString += "<contsize>" + contW + "," + contH + "</contsize>\n";
							dataString += "<contcount>" + contX + "," + contY + "</contcount>\n";

							var debugInfo = false;
							var players = new Object();
							var alliances = new Object();
							for( var cluster in $SKSU.worldData.d )
							{
								var seaData = $SKSU.worldData.d[cluster].get_Terrain().l;
								if( seaData == null )
									info( "No sea data:  version update?" );
								if( debugInfo ) info( "Cluster " + cluster );
								var playerData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.playerData], "d" );
								var allianceData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.allianceData], "d" );
								var objectData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.objData], "d" );
								var riverData = $SKSU.worldData.d[cluster].get_Rivers().l;
								//var resData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.resData], "l" );
								if( debugInfo ) info( "GatherAlliances" );
								if( allianceData )
								{
									for( var alliance in allianceData )
									{
										var id = allianceData[alliance].Id;
										alliances[id] = new Object();
										alliances[id].name = allianceData[alliance].Name;
										alliances[id].points = allianceData[alliance].Points;
									}
								}
								if( debugInfo ) info( "GatherPlayers" );
								if( playerData )
								{
									for( var player in playerData )
									{
										var pid = playerData[player].Id;
										players[pid] = new Object();
										players[pid].points = playerData[player].Points;
										players[pid].name = playerData[player].Name;
										var aindex = playerData[player].Alliance;
										if( aindex > 0 )
											players[pid].alliance = allianceData[aindex].Id;
										else
											players[pid].alliance = 0;
									}
								}

								dataString += "<cluster id=\"" + cluster.toString() + "\">\n";

								if( debugInfo ) info( "RiverData" );
								if( riverData == null )
									info( "No riverdata" );
								dataString += "<riverdata>";
								for( var d in riverData )
								{
									if( d != 0 )
										dataString += ", ";
									dataString += riverData[d];
								}
								dataString += "</riverdata>\n";

								if( debugInfo ) info( "SeaData" );
								if( seaData == null )
									info( "No seadata" );
								dataString += "<seadata>";
								for( var d in seaData )
								{
									if( d != 0 )
										dataString += ", ";
									dataString += seaData[d];
								}
								dataString += "</seadata>\n";

								//if( debugInfo ) info( "ResData" );
								//if( resData )
								//{
								//	dataString += "<resdata>";
								//	for( var d in resData )
								//	{
								//		if( d != 0 )
								//			dataString += ", ";
								//		dataString += resData[d];
								//	}
								//	dataString += "</resdata>\n";
								//}

								if( debugInfo ) info( "Objects" );
								if( objectData )
								{
									for( var obj in objectData )
									{
										var coord = $SKSU.coordsFromCluster( cluster, obj );
										var x = coord & 0xffff;
										var y = coord >> 16;
										var o = objectData[obj];
										switch( o.Type )
										{
											case 1: // city
											{
												var pindex = o.Player;
												var pid = playerData[pindex].Id;

												dataString += "<c id=\"" + x + ":" + y + "\">" + pid + "," + o.Name + "," +
													o.Points + "," + o.Castle + "," + o.Water + "," +
													$SKSU.shrineNames[o.PalaceType] + "," + o.PalaceLevel + "," + o.PalaceUpgradeing + "," +
													o.Enlighted +
													"</c>\n";
												break;
											}
											case 2: // dungeon
												dataString += "<d id=\"" + x + ":" + y + "\">" +
													$SKSU.dungName(o.DungeonType) + "," + o.DungeonLevel + "," + o.Progress + "," +
													o.State + "," + o.StartStep +
													"</d>\n";
												break;
											case 3: // boss
												dataString += "<b id=\"" + x + ":" + y + "\">" +
													$SKSU.bossName(o.BossType) + "," + o.BossLevel + "," +
													o.State + "," + o.StartStep +
													"</b>\n";
												break;
											case 4: // moongate
												dataString += "<m id=\"" + x + ":" + y + "\">" +
													"</m>\n";
												break;
											case 5: // shrine
												dataString += "<s id=\"" + x + ":" + y + "\">" +
													$SKSU.shrineNames[o.ShrineType] +
													"</s>\n";
												break;
											case 6: // lawless
												dataString += "<l id=\"" + x + ":" + y + "\">" +
													o.Points + "," + o.Castle + "," + o.Water +
													"</l>\n";
												break;
										}
									}
								}
								if( debugInfo ) info( "Done with cluster" );
								dataString += "</cluster>\n";
							}

							var a;
							var p;
							if( debugInfo ) info( "Writing Alliances" );
							for( var alliance in alliances )
							{
								a = alliances[alliance];
								dataString += "<a id=\"" + alliance + "\">" + a.name + "," + a.points + "</a>\n";
							}
							if( debugInfo ) info( "Writing Players" );
							for( var player in players )
							{
								p = players[player];
								dataString += "<p id=\"" + player + "\">" + p.name + "," + p.points + "," + p.alliance + "</p>\n";
							}
							if( debugInfo ) info( "Done!" );
						}
						dataString += "</sksWorldExport>\n";

						var win = new qx.ui.window.Window("Exported Data");
						win.setLayout(new qx.ui.layout.Grow);
						win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
						win.setWidth(550);
						win.setHeight(700);

						var ta = new qx.ui.form.TextArea(dataString);
						ta.addListener("click", function(){this.selectAllText();});
						win.add(ta, {left:10, top:10, bottom:10, right:10} );

						//$SKSU.a.desktop.add( win );
						win.center();
						win.open();
						$SKSU.exportWin = win;
					},
					
					distanceToCityID : function( cid1, cid2 )
					{
						var x1 = cid1&0xFFFF;
						var y1 = cid1>>16;
						var x2 = cid2&0xFFFF;
						var y2 = cid2>>16;
						var dx = x2-x1;
						var dy = y2-y1;
						return Math.sqrt( dx*dx + dy*dy );
					},

					calculateTravelType : function( dist, time )
					{
						var u = webfrontend.res.Main.getInstance().units;
						// scout, cav, inf, siege, baron
						var spd = [ 1.0/u[8].s, 1.0/u[11].s, 1.0/u[6].s, 1.0/u[14].s, 1.0/u[19].s ]; // fields per second
						var bonus = [ 1.0, 1.01, 1.03, 1.06, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50 ];
						var tpnames = [ "Scout", "Cavalry", "Infantry", "Siege", "Baron"];
						
						//debug( "Time " + time + "  Distance " + dist );
						//debug( "Speeds " + spd[0] + "," + spd[1] + "," + spd[2] + "," + spd[3] + "," + spd[4] );
						var closestMatch = 100000.0;
						var closestSpd = -1;
						var closestBonus = -1;

						for( var s = 0; s < spd.length; s++ )
						{
							for( var b = 0; b < bonus.length; b++ )
							{
								var secsPerField = Math.round( 1.0 / (spd[s] * bonus[b]) ); 
								var testtime = Math.round(dist * secsPerField);
								//debug( "TestTime["+s+"]["+b+"] = " + testtime );
								var t = time - testtime;
								if( Math.abs(t) < Math.abs(closestMatch) )
								{
									closestMatch = t;
									closestSpd = s;
									closestBonus = b;
								}
							}
						}
						if( closestSpd == -1 )
							return "Unknown";
						var str = tpnames[closestSpd] + " +" + ( Math.round((bonus[closestBonus] - 1.0) * 100) ).toString() + "%" + " (" + Math.round(closestMatch).toString() + ")";
						return str;
					},

					interceptSetDungeon: function(bi)
					{
						$SKSU.getApp().dungeonDetailView.sksOriginalSetDungeon( bi );
						$SKSU.curDungeon = bi;
						$SKSU.addDungeonToRaid( bi );
					},

					onCityChange: function()
					{
						this.updateDungeonRaidCity();
						this.updateBossRaidCity();
						this.fillBossList();
					},

					updateBossRaidCity : function()
					{
						var raider = $SKSU.pickBossRaider();
						$SKSU.sksRaidWin.bossRaider = raider;
						var vis = "hidden";
						
						if( raider.t != -1 )
						{
							var CI = webfrontend.data.City.getInstance();
							var bS = webfrontend.res.Main.getInstance();
							$SKSU.sksRaidWin.bossUnitImage.setSource( "webfrontend/"+bS.imageFiles[bS.units[raider.t].mimg]);

							var uinfo = CI.getUnitTypeInfo( raider.t );
							$SKSU.sksRaidWin.bossUnitLabel.setValue( uinfo.count );
							vis = "visible";
						}
						$SKSU.sksRaidWin.bossUnitImage.setVisibility( vis );
						$SKSU.sksRaidWin.bossUnitLabel.setVisibility( vis );
					},

					updateDungeonRaidCity : function()
					{
						if( $SKSU.sksRaidWin != null )
						{
							var CI = webfrontend.data.City.getInstance();
							var bv = CI.getId();
							var cx = bv&0xFFFF;
							var cy = bv>>16;

							$SKSU.sksRaidWin.setCaption( "SkS Raid: " + CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(),true) );
							$SKSU.sksRaidWin.targetContainer.removeAll();
							//var children = $SKSU.sksRaidWin.targetContainer.getChildren();
							//for (var i = 0; i < children.length; i++) 
							//{
							//	var ch = children[i].getChildren();
							//	ch[0].raidcontainer.removeAll();
							//	var coords = ch[3];
							//	var x = Number( coords.getValue().substr( 0, 3 ) );
							//	var y = Number( coords.getValue().substr( 4, 3 ) );
							//	var dist = Math.sqrt( (x-cx)*(x-cx) + (y-cy)*(y-cy) ).toFixed(2);
							//	ch[4].setValue( dist );
							//}
							$SKSU.updateAvailableUnits();
						}
					},
					
					updateDungeonRaidInfo : function( dcoord )
					{
						if( $SKSU.sksRaidWin != null )
						{
							var x = dcoord&0xFFFF;
							var y = dcoord>>16;
							var cstr = $SKSU.leftPad( x, 3, "0" ) + ":" + $SKSU.leftPad( y, 3, "0" );

							var children = this.sksRaidWin.targetContainer.getChildren();
							for (var i = 0; i < children.length; i++) 
							{
								var coords = children[i].getChildren()[3];
								if( coords.getValue() == cstr )
								{
									if( $SKSU.dungeonLootInfo.hasOwnProperty( dcoord ) )
									{
										var di = $SKSU.dungeonLootInfo[dcoord];
										children = children[i].getChildren();
										children[5].setValue( di.mx );
										children[6].setValue( di.l );
									}
									break;
								}
							}
						}
					},
					
					clearRaidErrorWindow: function()
					{
						if( this.sksRaidErrorWin )
						{
							this.sksRaidErrorWin.lbl.setValue( "" );
						}
					},

					showRaidErrorWindow: function()
					{
						if( this.sksRaidErrorWin == null )
						{
							var win = new qx.ui.window.Window("SkSRaid Status");
							win.setLayout(new qx.ui.layout.Grow);
							win.set({showMaximize: false, showMinimize: false, allowMaximize: false, width: 300, height: 200});

							var container = new qx.ui.container.Scroll();
							
							win.lbl = new qx.ui.basic.Label( "" ).set( {rich:true} );

							container.add( win.lbl );
							win.add( container );

							win.addListener( "close", function(){ this.sksRaidErrorWin = null; }, this );
							//this.a.desktop.add( win );
							win.center();
							win.open();
							this.sksRaidErrorWin = win;
						}
					},

					addRaidError: function( msg )
					{
						this.showRaidErrorWindow();
						this.sksRaidErrorWin.lbl.setValue( this.sksRaidErrorWin.lbl.getValue() + msg + "<br>" );
					},

					onRaidSent: function( comm, result, v )
					{
						if( !comm || result == null )
							this.addRaidError( "Comm failed" );
						else if( result == 0 )
						{
							v.destroy();
						}
						else
						{
							switch( result )
							{
	/*							case 0:mV.add(this.tr(invalid));
								break;
								case 1:mV.add(this.tr(the selct army can't do this));
								break;
								case 2:mV.add(this.tr(not enough units));
								break;
								case 3:mV.add(this.tr(under siege));
								break;
								case 4:mV.add(this.tr(target not castle));
								break;
								case 5:mV.add(this.tr(source not castle));
								break;
								case 6:mV.add(this.tr(order limit reached));
								break;
								case 7:mV.add(this.tr(cant load on ship));
								break;
								case 8:mV.add(this.tr(invalid cont));
								break;
								case 9:mV.add(this.tr(cant use ship));
								break;
								case 10:mV.add(this.tr(illegal order type));
								break;
								case 11:mV.add(this.tr(dungeon order time limit overflow));
								break;
								case 12:mV.add(this.tr(dungeon not active));
								break;
								case 13:mV.add(this.tr(plunder protection active));
								break;
								case 14:mV.add(this.tr(baron missing));
								break;
								case 15:mV.add(this.tr(not enough resource));
								break;
								case 16:mV.add(this.tr(invalid world field));
								break;
								case 17:mV.add(this.tr(not enough trader capacity));
								break;
								case 18:mV.add(this.tr(invalid target player));
								break;
								case 19:mV.add(this.tr(cant reach target));
								break;
								case 20:mV.add(this.tr(scout protection active));
								break;
								case 21:mV.add(this.tr(minister required));
								break;
								case 22:mV.add(this.tr(delayed order in the past));
								break;
								case 23:mV.add(this.tr(must use ship));
								break;
								case 24:mV.add(this.tr(dungeon max attack count reached));
								break;
								case 25:mV.add(this.tr(dungeon boss already attacked));
								break;
								case 26:mV.add(this.tr(recurring order until time reached));
								break;
								case 27:mV.add(this.tr(blocked by peace time));
								break;
								case 28:mV.add(this.tr(blocked for anonymous));
								break;
								case 29:mV.add(this.tr(not enough ship space));
								break;
								case 30:mV.add(this.tr(target is ruin));
								break;
								case 31:mV.add(this.tr(minimum unit count not met));
								break;
								default:mV.add(this.tr(invalid));
								break;
	*/
								case 0:
									logEntry = "Successful raid sent";
									break;
								case (1<<2):
									logEntry = "Not enough units.";
									break;
								case (1<<6):
									logEntry = "Not enough command slots.";
									break;
								case (1<<22):
									logEntry = "Delayed order in the past";
									break;
								default:
									logEntry = null;
									break;
							}

                            if (logEntry != null)
                            {
                                this.addRaidError( logEntry );
                            }
						}
					},

					getOffsetTime : function( dayOffset, hours, mins, secs )
					{
						//debug( "GetOffsetTime " + dayOffset + ", " + hours + ", " + mins + ", " + secs );
						var curTime=webfrontend.Util.getCurrentTime();
						var hourOffset=0;

						if(webfrontend.config.Config.getInstance().getTimeZone()>0)
						{
							curTime.setHours(curTime.getHours()+curTime.getTimezoneOffset()/60);
							hourOffset+=curTime.getTimezoneOffset()/60;

							if(webfrontend.config.Config.getInstance().getTimeZone()==1)
								hourOffset+=webfrontend.data.ServerTime.getInstance().getServerOffset()/1000/60/60;
							else if(webfrontend.config.Config.getInstance().getTimeZone()==2)
								hourOffset+=webfrontend.config.Config.getInstance().getTimeZoneOffset()/1000/60/60;
						}

						var hI=new Date(curTime.getTime());
						hI.setDate(hI.getDate()+dayOffset);
						hI.setHours(hours-hourOffset);
						hI.setMinutes(mins);
						hI.setSeconds(secs);
						hI.setMilliseconds(500);
						//debug( hI.toString() );

						if(webfrontend.config.Config.getInstance().getTimeZone()==0)
							hI=new Date(hI.getTime()-webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},

					sendRaids : function()
					{
						if( $SKSU.sksRaidWin )
						{
							$SKSU.clearRaidErrorWindow();
							var CI = webfrontend.data.City.getInstance();
							var sendTime = 0;
							var sendContainer = $SKSU.sksRaidWin.commandContainer.getChildren()[0];
							var sendMode = sendContainer.getChildren()[0].getSelection()[0].getModel();
							if( sendMode != webfrontend.gui.SendArmyWindow.timings.now )
							{
								//for( var si = 0; si < sendContainer.getChildren().length; si++ )
								//{
								//	if( sendContainer.getChildren()[si] instanceof qx.ui.form.SelectBox )
								//		debug( "Send Child " + si + " is a select box" );
								//}
								sendTime = $SKSU.getOffsetTime( sendContainer.getChildren()[6].getSelection()[0].getModel(), 
										Number(sendContainer.getChildren()[1].getValue()), Number(sendContainer.getChildren()[3].getValue()), Number(sendContainer.getChildren()[5].getValue()) );
							}

							var returnTime = 0;
							var returnContainer = $SKSU.sksRaidWin.commandContainer.getChildren()[1];
							var returnMode = returnContainer.getChildren()[0].getSelection()[0].getModel();
							if( (returnMode + webfrontend.gui.SendArmyWindow.timings.once) == webfrontend.gui.SendArmyWindow.timings.latest )
							{
								//for( var si = 0; si < returnContainer.getChildren().length; si++ )
								//{
								//	if( returnContainer.getChildren()[si] instanceof qx.ui.form.SelectBox )
								//		debug( "Return Child " + si + " is a select box" );
								//}
								returnTime = $SKSU.getOffsetTime( returnContainer.getChildren()[6].getSelection()[0].getModel(), 
										Number(returnContainer.getChildren()[1].getValue()), Number(returnContainer.getChildren()[3].getValue()), Number(returnContainer.getChildren()[5].getValue()) );
							}

							var targets = $SKSU.sksRaidWin.targetContainer.getChildren();
							for( var target = 0; target < targets.length; target++ )
							{
								var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
								for( var raid = 0; raid < raids.length; raid++ )
								{
									var units = [];
									var thisRaid = raids[raid];
									var ch = thisRaid.getChildren();
									for( var i = 0; i < ch.length; i++ )
									{
										if( ch[i] instanceof qx.ui.form.TextField )
										{
											if( ch[i].unitType && Number( ch[i].getValue() ) > 0 )
											{
												units.push( {t: ch[i].unitType, c: Number(ch[i].getValue())} );
											}
										}
									}

									var updateManager = webfrontend.net.UpdateManager.getInstance();
									var data =
									{
							            //session: updateManager.getInstanceGuid(),
										cityid: CI.getId(),
										units: units,
										targetPlayer: "",
										targetCity: targets[target].getChildren()[3].getValue(),
										order: webfrontend.base.GameObjects.eUnitOrderType.Raid,
										transport: 1,
										createCity: "",
										timeReferenceType: sendMode,
										referenceTimeUTCMillis: sendTime,
										raidTimeReferenceType: returnMode,
										raidReferenceTimeUTCMillis: returnTime,
										iUnitOrderOptions:0,
										//raid: thisRaid
									};
									$SKSU.OrderData = data;

									webfrontend.net.CommandManager.getInstance().sendCommand
									(
										"OrderUnits", data, $SKSU, $SKSU.onRaidSent, thisRaid
									);

									//var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/OrderUnits", "POST", "application/json");
									//req.setProhibitCaching(false);
									//req.setRequestHeader("Content-Type", "application/json");
									//req.setData(qx.util.Json.stringify(data));
									//req.setTimeout(10000);
									//req.addListener("completed", function(e) 
									//		{
									//			$SKSU.onRaidSent(e, raidData);
									//		}, this);
									//req.send();
								}
							}
						}


/*
									webfrontend.net.CommandManager.getInstance().sendCommand(
											"OrderUnits",
											{
												cityid:this.__YD,
												units:mP,
												targetPlayer:this.getTargetPlayerName(),
												targetCity:this.__Xo.getValue()+ft+this.__Xp.getValue(),
												order:mQ,
												transport:mK,
												createCity:this.__XV.getValue(),
												timeReferenceType:mT,
												referenceTimeUTCMillis:mI,
												raidTimeReferenceType:mM,
												raidReferenceTimeUTCMillis:mJ,
												iUnitOrderOptions:mH
											},
											this,
											this.__bbE);

									lou_suite.sendTroops(lou_suite.LS_RAID, cityId, dungeon['x'], dungeon['y'], units_to_send, lou_suite.LS_RAID_REPEAT, this.onTroopsSent);
									sendTroops: function (order_type, city_id, x, y, units, repeat, callbackFunc) {
										var updateManager = webfrontend.net.UpdateManager.getInstance();
										var data = {
											session: updateManager.getInstanceGuid(), 
											cityid: city_id, 
											units: units, 
											targetPlayer: "", 
											targetCity: x + ':' + y, 
											order: order_type, 
											transport: 1, 
											createCity: "", 
											timeReferenceType: 1, 
											referenceTimeUTCMillis: 0, 
											raidTimeReferenceType: repeat, // Repeat raid or not
											raidReferenceTimeUTCMillis: 0, 
											iUnitOrderOptions: 0, 
										};
          
										var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/OrderUnits", "POST", "application/json");
										req.setProhibitCaching(false);
										req.setRequestHeader("Content-Type", "application/json");
										req.setData(qx.util.Json.stringify(data));
										req.setTimeout(10000);
										req.addListener("completed", function(e) 
												{
													callbackFunc(e, {cid: city_id, x: x, y: y, units: units});
												}, this);
										req.send();
									},
*/

					},

					getAllocatedOrders : function()
					{
						var c = $SKSU.sksRaidWin.targetContainer;
						var ch = c.getChildren();
						var total = 0;
						for( var i = 0; i < ch.length; i++ )
						{
							var addButton = ch[i].getChildren()[0];
							var rch = addButton.raidcontainer.getChildren();
							for( var j = 0; j < rch.length; j++ )
							{
								var hch = rch[j].getChildren();
								for( var k = 0; k < hch.length; k++ )
								{
									if( hch[k] instanceof qx.ui.form.TextField )
									{
										if( Number( hch[k].getValue() ) > 0 )
										{
											total++;
											break;
										}
									}
								}
							}
						}
						var CI = webfrontend.data.City.getInstance();
						if( CI.getUnitOrders() )
							total += CI.getUnitOrders().length;
						return total;
					},

					getAllocatedUnits : function( unitType )
					{
						var c = $SKSU.sksRaidWin.targetContainer;
						var ch = c.getChildren();
						var total = 0;
						for( var i = 0; i < ch.length; i++ )
						{
							var addButton = ch[i].getChildren()[0];
							var rch = addButton.raidcontainer.getChildren();
							for( var j = 0; j < rch.length; j++ )
							{
								var hch = rch[j].getChildren();
								for( var k = 0; k < hch.length; k++ )
								{
									if( hch[k] instanceof qx.ui.form.TextField )
									{
										if( hch[k].unitType == unitType )
										{
											total += Number( hch[k].getValue() );
										}
									}
								}
							}
						}
						return total;
					},

					updateAvailableUnits : function()
					{
						if( $SKSU.sksRaidWin != null )
						{
							var departNow = ($SKSU.sksRaidWin.commandContainer.getChildren()[0].getChildren()[0].getSelection()[0].getLabel() == "Now");
							var okToSend = true;
							var haveOrders = false;
							var container = $SKSU.sksRaidWin.troopContainer;
							container.removeAll();
							var CI = webfrontend.data.City.getInstance();
							var img = new qx.ui.basic.Image( "webfrontend/ui/icons/icon_command_slots.png" );
							img.setWidth(16);
							img.setHeight(16);
							img.setScale(true);
							img.setAlignY( "middle" );
							container.add( img );

							var orders = $SKSU.getAllocatedOrders();
							if( orders > 0 )
								haveOrders = true;
							
							var lbl = new qx.ui.basic.Label( (CI.getOrderLimit() - orders).toString() + "/" + CI.getOrderLimit() );
							lbl.setRich( true );
							lbl.setAlignY( "middle" );
							if( orders > CI.getOrderLimit() )
							{
								lbl.setTextColor( "red" );
								okToSend = false;
							}
							container.add( lbl );
							
							container.add( new qx.ui.core.Spacer().set( {width:10} ) );
								
							var bS=webfrontend.res.Main.getInstance();
							var uk = [];
							var totalTS = 0;
							for( var key in CI.units )
							{
								if( bS.units[key].c > 0 && bS.units[key].ls )
								{
									uk[uk.length] = key;
								}
							}
							uk.sort( function(a,b){ return bS.units[a].y - bS.units[b].y; } );
							for( var i = 0; i < uk.length; i++ )
							{
								var key = uk[i];
										
								var img = new qx.ui.basic.Image("webfrontend/"+bS.imageFiles[bS.units[key].mimg]);
								img.setWidth(24);
								img.setHeight(24);
								img.setScale(true);
								img.setAlignY( "middle" );
								container.add( img );

								var uinfo = CI.getUnitTypeInfo( key );
								var cnt = uinfo.count - $SKSU.getAllocatedUnits( key );
								var lbl = new qx.ui.basic.Label( cnt + " / " + uinfo.total );
								lbl.setRich( true );
								lbl.setAlignY( "middle" );
								if( cnt < 0 )
								{
									lbl.setTextColor( "red" );
									if( departNow )
										okToSend = false;
								}
								totalTS += cnt * bS.units[key].uc;
								container.add( lbl );
							}
							if( uk.length == 0 )
							{
								var lbl = new qx.ui.basic.Label( "No Available Units" );
								lbl.setRich( true );
								lbl.setAppearance( "textheader_sub1" );
								container.add( lbl );
							}
							
							var btn = $SKSU.sksRaidWin.commandContainer.getChildren()[0].getChildren()[9];
							btn.setEnabled( okToSend && haveOrders );

							$SKSU.sksRaidWin.idleUnitsTable.updateCityTS( CI.getId(), totalTS );
						}
					},

					onRaidCountInput: function( textField )
					{
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var unitType = textField.unitType;
						
						if( unitType == null )
						{
							if( this.ratioMode != "none" )
							{
								// figure out how many units are needed to bring this much loot
								var lootToCarry = Number( textField.getValue() );
								var totalCarry = 0;
								var hch = textField.getLayoutParent().getChildren();
								for( var k = 0; k < hch.length; k++ )
								{
									if( hch[k] instanceof qx.ui.form.TextField )
									{
										if( hch[k].unitType != null )
										{
											var uinfo = CI.getUnitTypeInfo( hch[k].unitType );
											totalCarry = totalCarry + (uinfo[this.ratioMode] * bS.units[hch[k].unitType].c);
										}
									}
								}

								for( var k = 0; k < hch.length; k++ )
								{
									if( hch[k] instanceof qx.ui.form.TextField )
									{
										if( hch[k].unitType != null )
										{
											var uinfo = CI.getUnitTypeInfo( hch[k].unitType );
											var cnt = Math.floor( (lootToCarry / totalCarry) * uinfo[this.ratioMode] );
											hch[k].setValue( cnt.toString() );
										}
									}
								}
							}
						}
						else
						{
							// set the other unit types to the same percentage, and then set the total loot field
							var uinfo = CI.getUnitTypeInfo( unitType );
							var cnt = Number( textField.getValue() );
							var pct = cnt == 0 ? 0 : cnt / uinfo[this.ratioMode];
							var lootTotal = cnt * bS.units[unitType].c;
						
							var hch = textField.getLayoutParent().getChildren();
							for( var k = 0; k < hch.length; k++ )
							{
								if( hch[k] instanceof qx.ui.form.TextField )
								{
									if( hch[k] != textField )
									{
										if( hch[k].unitType == null )
										{
											// set the total
											hch[k].setValue( lootTotal.toString() );
										}
										else
										{
											uinfo = CI.getUnitTypeInfo( hch[k].unitType );
											if( this.ratioMode == "none" )
											{
												cnt = Number( hch[k].getValue() );
											}
											else
											{
												cnt = Math.floor( pct * uinfo[this.ratioMode] );
												hch[k].setValue( cnt.toString() );
											}
											lootTotal = lootTotal + cnt * bS.units[hch[k].unitType].c;
										}
									}
								}
							}
						}
						
						$SKSU.updateAvailableUnits();
					},

					onAddRaidButton: function( addButton )
					{
						var atype = this.sksRaidWin.raidAddType.getSelection()[0].getLabel();
						var c = addButton.getLayoutParent();
						var max = Number(c.getChildren()[5].getValue());
						var avg = Number(c.getChildren()[6].getValue());
						var val = 0;
						if( this.ratioMode != "none" )
						{
							if( atype == "Max +" )
								val = max + ((max - avg)/2);
							else if( atype == "Max" )
								val = max;
							else if( atype == "Mavg" )
								val = (max + avg)/2;
							else if( atype == "Avg" )
								val = avg;
							else if( atype == "Split" )
							{
								this.addSplit( addButton, max, avg );
								return;
							}
						}
						this.addRaid( addButton, Math.floor(val) );
					},

					addSplit: function( addButton, max, avg )
					{
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if( availOrders == 0 )
							return;
						
						for( var key in CI.units )
						{
							var carry = bS.units[key].c;
							if( carry > 0 && bS.units[key].ls )
							{
								var uinfo = CI.getUnitTypeInfo( key );
								totalCarry = totalCarry + (uinfo.count - this.getAllocatedUnits(key)) * carry;
							}
						}
						var orders = totalCarry / max;
						if( orders < 1 )
							orders = 1;
						else
						{
							var iOrders = Math.floor( orders );
							var carryPerOrder = totalCarry / iOrders;
							if( carryPerOrder / max > 1.1 && totalCarry / (iOrders + 1) > avg && iOrders + 1 <= availOrders )
								orders = iOrders + 1;
							else
								orders = iOrders;
						}
						if( orders > availOrders )
							orders = availOrders;
						var c = Math.floor(totalCarry / orders);
						for( var i = 0; i < orders; i++ )
							this.addRaid( addButton, c );
					},

					addRaid: function( addButton, value )
					{
						var rc = addButton.raidcontainer;

						var bS = webfrontend.res.Main.getInstance();
						var CI = webfrontend.data.City.getInstance();
						var uk = [];
						for( var key in CI.units )
						{
							if( bS.units[key].c > 0 && bS.units[key].ls )
							{
								uk[uk.length] = key;
							}
						}
						if( uk.length == 0 )
							return;
						
						var c = new qx.ui.container.Composite();
						c.setLayout( new qx.ui.layout.HBox().set({spacing:5}) );

						uk.sort( function(a,b){ return bS.units[a].y - bS.units[b].y; } );
						for( var i = 0; i < uk.length; i++ )
						{
							var key = uk[i];
							var img = new qx.ui.basic.Image("webfrontend/"+bS.imageFiles[bS.units[key].simg]);
							img.setAlignY( "middle" );
							c.add( img );

							var tf = new qx.ui.form.TextField("").set( {paddingTop: 0, paddingBottom: 0} );
							tf.setWidth( 50 );
							tf.unitType = key;
							tf.setAlignY( "middle" );
							tf.setTextAlign( "right" );
							tf.addListener( "input", function() { $SKSU.onRaidCountInput( this ); } );
							tf.addListener( "click", function() { this.selectAllText(); } );
							c.add( tf );
							c.add( new qx.ui.core.Spacer().set({width:10}) );
						}
						c.add( new qx.ui.core.Spacer().set({width:30}) );
						var tf = new qx.ui.form.TextField( value.toString() ).set( {paddingTop: 0, paddingBottom: 0} );
						tf.setWidth( 60 );
						tf.unitType = null;
						tf.setAlignY( "middle" );
						tf.setTextAlign( "right" );
						tf.addListener( "input", function() { $SKSU.onRaidCountInput( this ); } );
						tf.addListener( "click", function() { this.selectAllText(); } );
						if( $SKSU.ratioMode == "none" )
						{
							tf.setReadOnly( true );
							tf.setEnabled( false );
						}
						c.add( tf );
						var btn = new qx.ui.form.Button("X").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0, alignY: "middle"} );
						btn.addListener( "click", function() 
								{ 
									this.getLayoutParent().destroy();
									$SKSU.updateAvailableUnits();
								} );
						c.add( btn );
						rc.add( c );
						$SKSU.onRaidCountInput( tf );
					},

					addDungeonToRaid: function( d )
					{
						if( this.sksRaidWin != null && webfrontend.res.Main.getInstance().dungeons[d.get_Type()].b == 0)
						{
							var bv = d.get_Coordinates();
							var dungX = bv&0xFFFF;
							var dungY = bv>>16;
							var cstr = $SKSU.leftPad( dungX, 3, "0" ) + ":" + $SKSU.leftPad( dungY, 3, "0" );

	                        var found = false;
							var children = this.sksRaidWin.targetContainer.getChildren();
		                    for (var i = 0; i < children.length; i++) 
							{
								var coords = children[i].getChildren()[3];
								if( coords.getValue() == cstr )
									found = true;
							}
							if( !found )
							{
								var CI = webfrontend.data.City.getInstance();
								bv = CI.getId();
								var cx = bv&0xFFFF;
								var cy = bv>>16;
								var dist = Math.sqrt( (dungX-cx)*(dungX-cx) + (dungY-cy)*(dungY-cy) ).toFixed(2);

								//debug( "GETTING MAX/AVG" );
								var dpt = this.dungProgressType( d.get_Type() );
								var dpl = d.get_Level() - 1;
								var dpp = d.get_Progress();
								//debug( "t:" + dpt + " l:" + dpl + " p:" + dpp );
								var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
								var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
								//debug( "Max " + max + " Avg " + avg );

								var subcontainer = new qx.ui.container.Composite();
								subcontainer.setLayout( new qx.ui.layout.Basic );

								btn = new qx.ui.form.Button("Add").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0} );
								subcontainer.add( btn, { top: 0, left: 0 } );
								btn.raidcontainer = new qx.ui.container.Composite();
								btn.raidcontainer.setLayout( new qx.ui.layout.VBox );
								btn.addListener( "click", function() { $SKSU.onAddRaidButton( this ); } );
								var raidcontainer = btn.raidcontainer;

								btn = new qx.ui.basic.Label( "L" + d.get_Level() + " " + $SKSU.dungShortName( d.get_Type() ) ).set( {rich:true,textColor:"blue"} );
								btn.d = d;
								btn.addListener( "click", function() { $SKSU.curDungeon = this.d; var x = this.getValue().substr(0,3); var y = this.getValue().substr(4,3); webfrontend.gui.Util.openDungeonProfile(this.d); } );
								subcontainer.add( btn, { top: 4, left: 50 * 1 + 30 } );
								subcontainer.add( new qx.ui.basic.Label( d.get_Progress() + "%" ),		{ top: 4, left: 50 * 2 + 30 } );
								btn = new qx.ui.basic.Label( cstr ).set( {rich:true,textColor:"blue"} )
								btn.dungX = dungX;
								btn.dungY = dungY;
								btn.addListener( "click", function() 
										{ 
											webfrontend.gui.Util.showMapModeViewPos( 'r', 0, this.dungX, this.dungY );
										} );
								subcontainer.add( btn, { top: 4, left: 50 * 3 + 30 } );
								subcontainer.add( new qx.ui.basic.Label( dist ),		{ top: 4, left: 50 * 4 + 30 } );
								btn = new qx.ui.basic.Label( max );
								btn.addListener( "click", function() 
										{
											if( Number( this.getValue() ) > 0 )
												$SKSU.addRaid( this.getLayoutParent().getChildren()[0], this.getValue() );
										} );
								subcontainer.add( btn, { top: 4, left: 50 * 5 + 30 } );
								btn = new qx.ui.basic.Label( avg );
								subcontainer.add( btn, { top: 4, left: 50 * 6 + 30 } );
								btn = new qx.ui.form.Button("X").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0} );
								btn.addListener( "click", function() { this.getLayoutParent().destroy(); $SKSU.updateAvailableUnits(); } );
								subcontainer.add( btn, { top: 0, left: 50 * 8 } );

								subcontainer.add( raidcontainer, { top: 24, left: 16 } );

								this.sksRaidWin.targetContainer.add( subcontainer );
								
								$SKSU.updateDungeonRaidInfo( d.get_Coordinates() );
							}
						}						
					},

					createHMSTextField: function( visibility, tabIndex )
					{
						var tf = new qx.ui.form.TextField("0").set( {width:25,visibility:visibility,alignY:"middle",tabIndex:tabIndex} ) 
						tf.addListener( "click", function() { this.selectAllText(); } );
						return tf;
					},

					setTotalsReadOnly: function( readOnly )
					{
						var targets = $SKSU.sksRaidWin.targetContainer.getChildren();
						for( var target = 0; target < targets.length; target++ )
						{
							var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
							for( var raid = 0; raid < raids.length; raid++ )
							{
								var thisRaid = raids[raid];
								var ch = thisRaid.getChildren();
								for( var i = 0; i < ch.length; i++ )
								{
									if( ch[i] instanceof qx.ui.form.TextField )
									{
										if( ch[i].unitType == null )
										{
											ch[i].setReadOnly( readOnly );
											ch[i].setEnabled( !readOnly );
										}
									}
								}
							}
						}
					},

					createDungeonPage: function( win )
					{
						var dungeonPage = new qx.ui.tabview.Page( "Dungeons" );
						dungeonPage.setLayout( new qx.ui.layout.Dock );

						var layoutContainer = new qx.ui.container.Composite();
						layoutContainer.setLayout( new qx.ui.layout.VBox );
							
						layoutContainer.add( new qx.ui.basic.Label("Targets") );

						var container = new qx.ui.container.Composite();
						container.setLayout( new qx.ui.layout.Basic );
						container.add( new qx.ui.basic.Label("Type").set({alignY:"middle"}),		{top: 0, left: 80} );
						container.add( new qx.ui.basic.Label("Prog").set({alignY:"middle"}),		{top: 0, left: 130} );
						container.add( new qx.ui.basic.Label("Coords").set({alignY:"middle"}),		{top: 0, left: 180} );
						container.add( new qx.ui.basic.Label("Dist").set({alignY:"middle"}),		{top: 0, left: 230} );
						container.add( new qx.ui.basic.Label("Max").set({alignY:"middle"}),		{top: 0, left: 280} );
						container.add( new qx.ui.basic.Label("Avg").set({alignY:"middle"}),		{top: 0, left: 330} );
						var sel = new qx.ui.form.SelectBox().set( {width:60,alignY:"middle",paddingLeft:4,paddingRight:4,paddingTop:0,paddingBottom:0} );
						sel.add( new qx.ui.form.ListItem( "Max +" ) );
						sel.add( new qx.ui.form.ListItem( "Max" ) );
						sel.add( new qx.ui.form.ListItem( "Mavg" ) );
						sel.add( new qx.ui.form.ListItem( "Avg" ) );
						sel.add( new qx.ui.form.ListItem( "Split" ) );
						sel.setSelection( [sel.getChildren()[1]] );
						win.raidAddType = sel;
						container.add( sel, {top: 0, left: 0} );

						//container.add( new qx.ui.basic.Label("Min"),		{top: 0, left: 350} );

						var btn = new qx.ui.form.Button("X").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0} );
						btn.addListener( "click", function() { $SKSU.sksRaidWin.targetContainer.removeAll(); } );
						container.add( btn,			{ top: 0, left: 400 } );

						layoutContainer.add( container );
						layoutContainer.add( new qx.ui.core.Widget().set({backgroundColor:"#c4a77b",height:2,allowGrowX:true,marginTop:4,marginBottom:2}) );
						dungeonPage.add( layoutContainer, {edge:"north"} );

						win.targetContainer = new qx.ui.container.Composite();
						win.targetContainer.setLayout( new qx.ui.layout.VBox().set( {spacing: 3} ) );

						var scrollContainer = new qx.ui.container.Scroll();
						scrollContainer.add( win.targetContainer );

						dungeonPage.add( scrollContainer, {edge:"center",width:"100%"} );

						container = new qx.ui.container.Composite();
						container.setLayout( new qx.ui.layout.VBox );
						container.add( new qx.ui.core.Widget().set({backgroundColor:"#c4a77b",height:2,allowGrowX:true,marginTop:4,marginBottom:4}) );
						
						var subContainer = new qx.ui.container.Composite();
						subContainer.setLayout( new qx.ui.layout.HBox().set( {spacing:4} ) );
						subContainer.add( new qx.ui.basic.Label( "Available Troops" ).set( {alignY:"middle"} ) );
						subContainer.add( new qx.ui.core.Spacer(), {flex:1} );
						subContainer.add( new qx.ui.basic.Label( "Ratio Type:" ).set( {alignY:"middle"} ) );
						sel = new qx.ui.form.SelectBox().set( {width:80,alignY:"middle"} );
						sel.add( new qx.ui.form.ListItem( "Available" ) );
						sel.add( new qx.ui.form.ListItem( "Total" ) );
						sel.add( new qx.ui.form.ListItem( "None" ) );
						if( $SKSU.ratioMode == "total" )
							sel.setSelection( [sel.getChildren()[1]] );
						else if( $SKSU.ratioMode == "none" )
							sel.setSelection( [sel.getChildren()[2]] );

						sel.addListener( "changeSelection", function(e) {
								var readOnly = false;
								if( e.getData()[0].getLabel() == "Available" )
									$SKSU.ratioMode = "count";
								else if( e.getData()[0].getLabel() == "Total" )
									$SKSU.ratioMode = "total";
								else
								{
									$SKSU.ratioMode = "none";
									readOnly = true;
								}
								$SKSU.setTotalsReadOnly( readOnly );
							});
						subContainer.add( sel );
						container.add( subContainer );
						
						win.troopContainer = new qx.ui.container.Composite();
						win.troopContainer.setLayout( new qx.ui.layout.HBox().set( {spacing:4} ) );
						container.add( win.troopContainer );

						container.add( new qx.ui.core.Widget().set({backgroundColor:"#c4a77b",height:2,allowGrowX:true,marginTop:4,marginBottom:4}) );

						win.commandContainer = new qx.ui.container.Composite();
						win.commandContainer.setLayout( new qx.ui.layout.VBox().set( {spacing:2} ) );

						var defVis = "hidden";
						subContainer = new qx.ui.container.Composite();
						subContainer.setLayout( new qx.ui.layout.HBox().set( {spacing:2} ) );
						sel = new qx.ui.form.SelectBox().set( {width:80,alignY:"middle",tabIndex:1} );
						sel.add( new qx.ui.form.ListItem( "Arrive", null, webfrontend.gui.SendArmyWindow.timings.arrive ) );
						sel.add( new qx.ui.form.ListItem( "Depart", null, webfrontend.gui.SendArmyWindow.timings.depart ) );
						sel.add( new qx.ui.form.ListItem( "Now", null, webfrontend.gui.SendArmyWindow.timings.now ) );
						sel.setSelection( [sel.getChildren()[2]] );
						sel.addListener( "changeSelection", function(e) {
								var ch = this.getLayoutParent().getChildren();
								var vis = "visible";
								if( e.getData()[0].getLabel() == "Now" )
									vis = "hidden";
								for( var i = 1; i <= 6; i++ )
									ch[i].setVisibility( vis );
								$SKSU.updateAvailableUnits();
							});
						subContainer.add( sel );
						subContainer.add( this.createHMSTextField( defVis, 2 ) );
						subContainer.add( new qx.ui.basic.Label(":").set({visibility:defVis,alignY:"middle"}) );
						subContainer.add( this.createHMSTextField( defVis, 3 ) );
						subContainer.add( new qx.ui.basic.Label(":").set({visibility:defVis,alignY:"middle"}) );
						subContainer.add( this.createHMSTextField( defVis, 4 ) );
						sel = new qx.ui.form.SelectBox().set( {width:100,visibility:defVis,alignY:"middle",tabIndex:5} );
						sel.add( new qx.ui.form.ListItem( "7 days" ,null,7) );
						sel.add( new qx.ui.form.ListItem( "6 days" ,null,6) );
						sel.add( new qx.ui.form.ListItem( "5 days" ,null,5) );
						sel.add( new qx.ui.form.ListItem( "4 days" ,null,4) );
						sel.add( new qx.ui.form.ListItem( "3 days" ,null,3) );
						sel.add( new qx.ui.form.ListItem( "2 days" ,null,2) );
						sel.add( new qx.ui.form.ListItem( "Tomorrow" ,null,1) );
						sel.add( new qx.ui.form.ListItem( "Today" ,null,0) );
						sel.setSelection( [sel.getChildren()[7]] );
						subContainer.add( sel );
						subContainer.add( new qx.ui.core.Spacer(), {flex:1} );
						win.nextIdleCityButton=new webfrontend.ui.SoundButton(null,"webfrontend/theme/scrollbar/scrollbar-right.png").set( { paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, alignY:"center", enabled:false} );
						win.nextIdleCityButton.addListener( "click", $SKSU.nextIdleRaidCity );
						subContainer.add( win.nextIdleCityButton );
						btn = new qx.ui.form.Button("GO").set( { paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, alignY:"center", enabled:false} );
						btn.addListener( "click", $SKSU.sendRaids );
						subContainer.add( btn );
						win.commandContainer.add( subContainer );

						subContainer = new qx.ui.container.Composite();
						subContainer.setLayout( new qx.ui.layout.HBox().set( {spacing:2} ) );
						sel = new qx.ui.form.SelectBox().set( {width:80,alignY:"middle",tabIndex:6} );
						sel.add( new qx.ui.form.ListItem( "Once",null,webfrontend.gui.SendArmyWindow.timings.once-webfrontend.gui.SendArmyWindow.timings.once ) );
						sel.add( new qx.ui.form.ListItem( "Return",null,webfrontend.gui.SendArmyWindow.timings.latest-webfrontend.gui.SendArmyWindow.timings.once ) );
						sel.add( new qx.ui.form.ListItem( "Complete",null,webfrontend.gui.SendArmyWindow.timings.completed-webfrontend.gui.SendArmyWindow.timings.once ) );
						sel.setSelection( [sel.getChildren()[2]] );
						sel.addListener( "changeSelection", function(e) {
								var ch = this.getLayoutParent().getChildren();
								var vis = "hidden";
								if( e.getData()[0].getLabel() == "Return" )
									vis = "visible";
								for( var i = 1; i <= 6; i++ )
									ch[i].setVisibility( vis );
							});
						subContainer.add( sel );
						subContainer.add( this.createHMSTextField( defVis, 7 ) );
						subContainer.add( new qx.ui.basic.Label(":").set({visibility:defVis,alignY:"middle"}) );
						subContainer.add( this.createHMSTextField( defVis, 8 ) );
						subContainer.add( new qx.ui.basic.Label(":").set({visibility:defVis,alignY:"middle"}) );
						subContainer.add( this.createHMSTextField( defVis, 9 ) );
						sel = new qx.ui.form.SelectBox().set( {width:100,visibility:defVis,alignY:"middle",tabIndex:10} );
						sel.add( new qx.ui.form.ListItem( "7 days" ,null,7) );
						sel.add( new qx.ui.form.ListItem( "6 days" ,null,6) );
						sel.add( new qx.ui.form.ListItem( "5 days" ,null,5) );
						sel.add( new qx.ui.form.ListItem( "4 days" ,null,4) );
						sel.add( new qx.ui.form.ListItem( "3 days" ,null,3) );
						sel.add( new qx.ui.form.ListItem( "2 days" ,null,2) );
						sel.add( new qx.ui.form.ListItem( "Tomorrow" ,null,1) );
						sel.add( new qx.ui.form.ListItem( "Today" ,null,0) );
						sel.setSelection( [sel.getChildren()[7]] );
						subContainer.add( sel );
						win.commandContainer.add( subContainer );

						container.add( win.commandContainer );

						dungeonPage.add( container, {edge:"south"} );
						return dungeonPage;
					},

					getMinBossLevel: function()
					{
						var title = webfrontend.data.Player.getInstance().getTitle();
						var resMain = webfrontend.res.Main.getInstance();
						for( var i = 6; i >= 1; i-- )
						{
							if( resMain.dungeonLevels[i].t < title - 1 )
								return i+1;
						}
						return 1;
					},

					pickBossRaider: function()
					{
						var CI = webfrontend.data.City.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var tech = webfrontend.data.Tech.getInstance();
						for( var unitType in CI.units )
						{
							// zerk, mage, paladin, knight, warlock
							if( unitType == 6 || unitType == 7 || unitType == 10 || unitType == 11 || unitType == 12 )
							{
								var u = CI.units[unitType];
								if( u.count > 0 && resMain.units[unitType].c > 0 && resMain.units[unitType].ls )
								{
									var uspeed = Math.max( 0, u.speed / ( 1 + tech.getBonus( "unitSpeed", webfrontend.data.Tech.research, parseInt(unitType) ) / 100 +
										tech.getBonus( "unitSpeed", webfrontend.data.Tech.shrine, parseInt(unitType) ) / 100 ) );
									return { t:parseInt(unitType), s:uspeed };
								}
							}
						}
						return { t:-1, s:0 };
					},
					
					getAttackType: function( unitType )
					{
						switch( unitType )
						{
							case 17: //wg
							case 16: //sloop
							case 15: //frigate
							case 14: //cat
							case 13: //ram
							case 2: //ballista
								return 3; // artillery

							case 12: //lock
							case 7: // mage
								return 4; // magic

							case 11: //knight
							case 8: // scout
							case 9: // xbow
							case 10: // pal
								return 2; // cavalry

							case 3: // ranger
							case 4: // guardian
							case 5: // templar
							case 6: // zerk
								return 1; // infantry
						}
						return 3;
					},

					getUnitsToKill: function( unitType, boss )
					{
						var tech = webfrontend.data.Tech.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var bossUnit = $SKSU.bossUnitType( boss.BossType, boss.BossLevel );
						var attack = resMain.units[unitType].av;
						var attackType = $SKSU.getAttackType(unitType);
						var bonus = tech.getBonus("unitDamage", webfrontend.data.Tech.research, parseInt(unitType)) +
									tech.getBonus("unitDamage", webfrontend.data.Tech.shrine, parseInt(unitType));
						var def = resMain.units[bossUnit].def[attackType] * 4;
						var units = Math.ceil( def / attack );
						units = Math.ceil( units / (1.0 + (bonus / 100)) );
						return units;
					},

					fillBossList: function()
					{
						var tech = webfrontend.data.Tech.getInstance();
						var CI = webfrontend.data.City.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var bv = CI.getId();
						var cx = bv&0xFFFF;
						var cy = bv>>16;
						var raider = $SKSU.sksRaidWin.bossRaider;
						var moveSpeed = raider.s;
						var minLevel = $SKSU.getMinBossLevel();
						var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var m = $SKSU.sksRaidWin.bossTable.getTableModel();
						if( moveSpeed == 0 )
						{
							m.setData( [["No units"]] );
							return;
						}
						m.setData( [] );
						$SKSU.getObfuscatedNames();
						for( var cluster in $SKSU.worldData.d )
						{
							var objectData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.objData], "d" );
							if( objectData )
							{
								for( var obj in objectData )
								{
									var coord = $SKSU.coordsFromCluster( cluster, obj );
									var x = coord & 0xffff;
									var y = coord >> 16;
									var bossCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
									if( bossCont == cont )
									{
										var o = objectData[obj];
										switch( o.Type )
										{
											case 3: // boss
												if( o.State && o.BossType != 12 && o.BossLevel >= minLevel )
												{
													var dist = Math.sqrt( (x-cx)*(x-cx) + (y-cy)*(y-cy) );
													m.addRows( [ [$SKSU.bossName( o.BossType ), o.BossLevel, x + ":" + y, 
														dist.toFixed(2), webfrontend.Util.getTimespanString( dist * moveSpeed ), 
														$SKSU.getUnitsToKill( raider.t, o )] ] );
												}
												break;
										}
									}
								}
							}
						}
						m.sortByColumn( 4, true );
					},

					createBossPage: function( win )
					{
						var bossPage = new qx.ui.tabview.Page( "Bosses" );
						bossPage.setLayout( new qx.ui.layout.VBox );

						var container = new qx.ui.container.Composite();
						container.setLayout( new qx.ui.layout.HBox );

						var btn = new qx.ui.form.Button( "World Map" );
						btn.addListener( "click", function() 
							{
								var bv = webfrontend.data.City.getInstance().getId();
								var cx = bv&0xFFFF;
								var cy = bv>>16;
		
								var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
								var cent = webfrontend.data.Server.getInstance().getContinentCentrePoint(cont);
								
								webfrontend.gui.Util.showMapModeViewPos( 'w', 0, cent.x, cent.y );
							} );
						container.add( btn );

						btn = new qx.ui.form.Button( "Scan" );
						btn.addListener( "click", $SKSU.fillBossList );
						container.add( btn );
						
						container.add( new qx.ui.core.Spacer(), {flex:1} );

						var lbl = new qx.ui.basic.Label;
						lbl.setRich( true );
						lbl.setAlignY( "middle" );
						win.bossUnitLabel = lbl;
						container.add( lbl );
						
						container.add( new qx.ui.core.Spacer().set({width:10}) );
						var img = new qx.ui.basic.Image;
						img.setWidth(24);
						img.setHeight(24);
						img.setScale(true);
						img.setAlignY( "middle" );
						win.bossUnitImage = img;
						container.add( img );

						bossPage.add( container );

						var tableModel = new qx.ui.table.model.Simple();
						var columnNames = ["Type", "Level", "Pos", "Dist", "Travel", "Units" ];
        
						tableModel.setColumns(columnNames);
						tableModel.setSortMethods( 4, function( row1, row2 ) { return Number(row1[3]) - Number(row2[3]); } );
        
						var custom =
						{
							tableColumnModel : function(obj) {
									return new qx.ui.table.columnmodel.Resize(obj);
								}
						};
						win.bossTable = new qx.ui.table.Table(tableModel, custom);
						//this.table.addListener("cellClick", this._handleCellClick, this);
						win.bossTable.onCellClick = function( event )
							{
								switch( event.getColumn() )
								{
									case 2: // coords
										var spl = this.getTableModel().getValue(event.getColumn(),event.getRow()).split(":");
										var x = Number( spl[0] );
										var y = Number( spl[1] );
										var app = qx.core.Init.getApplication();
										app.showSendArmy( x, y, false, webfrontend.gui.SendArmyWindow.pages.raid );
										webfrontend.gui.Util.showMapModeViewPos( 'r', 0, x, y );
										if( $SKSU.sksRaidWin.hasOwnProperty( "bossRaider" ) && $SKSU.sksRaidWin.bossRaider.t != -1 )
										{
											var saw = app.sendArmyWidget;
											var units = null;
											// find the ui for this unit type
											for( var key in saw )
											{
												if( saw[key] && saw[key].hasOwnProperty( "1" ) )
												{
													if( saw[key]["1"] && saw[key]["1"].hasOwnProperty( "cityinfo" ) && saw[key]["1"].hasOwnProperty("ui") )
													{
														//debug( "Found it! at " + key );
														units = saw[key];
														units[$SKSU.sksRaidWin.bossRaider.t].ui.input.setValue( this.getTableModel().getValue(5, event.getRow()) );
														break;
													}
												}
											}
										}
										break;
									case 6: // send
										break;
								}
							};
						win.bossTable.addListener("cellClick", win.bossTable.onCellClick, win.bossTable);
    
						var columnModel = win.bossTable.getTableColumnModel();
						columnModel.setColumnVisible( 3, false );
						var linkStyle = new qx.ui.table.cellrenderer.Default();
						linkStyle.setDefaultCellStyle( "text-decoration:underline;color:blue" );
						columnModel.setDataCellRenderer( 2, linkStyle );
        
						bossPage.add( win.bossTable );
						return bossPage;
					},

					createPVPPage: function()
					{
						var pvpPage = new qx.ui.tabview.Page( "PvP" );
						pvpPage.setLayout( new qx.ui.layout.VBox );
						return pvpPage;
					},

					createCommandsPage: function()
					{
						var commandsPage = new qx.ui.tabview.Page( "Commands" );
						commandsPage.setLayout( new qx.ui.layout.VBox );

						var btn = new qx.ui.form.Button( "Stop All" );
						commandsPage.add( btn );
						return commandsPage;
					},

					nextIdleRaidCity: function()
					{
						var tm = $SKSU.sksRaidWin.idleUnitsTable.getTableModel();
						var cid = webfrontend.data.City.getInstance().getId();
						var nextcid = cid;
						if( tm.getRowCount() > 0 )
							nextcid = tm.getValue( 0, 0 );
						for( var i = 0; i < tm.getRowCount(); i++ )
						{
							if( tm.getValue( 0, i ) == cid )
							{
								if( i == tm.getRowCount() - 1 )
									nextcid = tm.getValue( 0, 0 );
								else
									nextcid = tm.getValue( 0, i + 1 );
								break;
							}
						}
						var x = nextcid & 0xffff;
						var y = nextcid >> 16;
						webfrontend.data.City.getInstance().setRequestId(nextcid);
						webfrontend.gui.Util.showMapModeViewPos( 'r', 0, x, y ); 
					},

					createIdleUnitsPage: function( win )
					{
						var idleUnitsPage = new qx.ui.tabview.Page( "Idle Raiders" );
						idleUnitsPage.setLayout( new qx.ui.layout.VBox );

						var container = new qx.ui.container.Composite();
						container.setLayout( new qx.ui.layout.HBox );

						var btn = new qx.ui.form.Button( "Refresh" );
						btn.addListener( "click", function() 
							{
								this.targetTable.refresh();
							} );

						container.add( btn );

						idleUnitsPage.add( container );

						win.idleUnitsTable = new sks.IdleRaidUnitsTable();
						idleUnitsPage.add( win.idleUnitsTable, {flex:1} );

						btn.targetTable = win.idleUnitsTable;

						return idleUnitsPage;
					},

					showRaidInterface: function()
					{
						if( this.sksRaidWin == null )
						{
							if( this.sksWin != null )
								this.sksWin.close();

							var CI = webfrontend.data.City.getInstance();

							var win = new qx.ui.window.Window( "SkS Raid: " + CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(),true) );
							win.setLayout( new qx.ui.layout.Grow );
							var w = qx.bom.Viewport.getWidth(window);
							var h = qx.bom.Viewport.getHeight(window);
							var wh = Math.floor(h*0.45);
							win.set({showMaximize: false, showMinimize: false, allowMaximize: false, width: 500, height: wh});

							this.sksRaidWin = win;

							var tabview = new qx.ui.tabview.TabView();
							tabview.add( this.createDungeonPage( win ) );
							tabview.add( this.createBossPage( win ) );
							tabview.add( this.createPVPPage( win ) );
							tabview.add( this.createCommandsPage( win ) );
							tabview.add( this.createIdleUnitsPage( win ) );

							win.add( tabview );

							this.updateAvailableUnits();
							this.updateBossRaidCity();

							webfrontend.data.City.getInstance().addListener("changeVersion", this.updateAvailableUnits, this);

							var dv = $SKSU.getApp().dungeonDetailView;
							if( !dv.hasOwnProperty( "sksOriginalSetDungeon" ) )
							{
								dv.sksOriginalSetDungeon = dv.setDungeon;
								dv.setDungeon = this.interceptSetDungeon;
							}

							webfrontend.data.City.getInstance().addListener("changeCity",this.onCityChange,this);
							
							win.addListener( "close", function(){ 
									this.sksRaidWin = null;
									webfrontend.data.City.getInstance().removeListener("changeVersion", this.updateAvailableUnits, this);
									webfrontend.data.City.getInstance().removeListener("changeCity",this.onCityChange,this)

								}, this );
							//this.a.desktop.add( win, {right:0,bottom:0,top:"50%"} );
							win.center();
							win.moveTo( w - 500, h - wh );
							win.open();
						}
					},


					showIncomingAttacks: function()
					{
						if( this.sksIncomingAttacksWin == null )
						{
							if( this.sksWin != null )
								this.sksWin.close();

							var win = new sks.IncomingAttacksWindow("IncomingAttacks");
							//this.a.desktop.add( win );
							win.center();
							win.open();
							this.sksIncomingAttacksWin = win;
						}
						else
						{
							this.sksIncomingAttacksWin.refresh();
						}
					},

					showCommands: function()
					{
						if( this.sksCommandsWin == null )
						{
							if( this.sksWin != null )
								this.sksWin.close();

							var win = new sks.CommandsWindow("Idle Units");
							//this.a.desktop.add( win );
							win.center();
							win.open();
							this.CommandsWindow = win;
						}
						else
						{
							this.CommandsWindow.refresh();
						}
					},

                    getCurrentServerDate: function()
					{
						var U=webfrontend.data.ServerTime.getInstance();
						var W=U.getServerStep();
						var Y=U.getStepTime(W);
						return new Date(Y.getTime());
					},

					getCurrentServerTime: function()
					{
						var U=webfrontend.data.ServerTime.getInstance();
						var W=U.getServerStep();
						var Y=U.getStepTime(W);
						Y.getTime()+U.getServerOffset();
					},

					getDungeonReport: function()
					{
						this.dungeonDataMineStep = 0;
						if( this.dungeonDataMineIndex < this.dungeonsToDataMine.length )
						{
							var dm = this.dungeonsToDataMine[this.dungeonDataMineIndex];
							if( this.dungeonDataMineIndex - this.dungeonDataMineLastDisplay >= 50 )
							{
								debug( "Searching " + this.dungeonDataMineIndex + " / " + this.dungeonsToDataMine.length  + " found " + this.dungeonDataMine.length );
								this.dungeonDataMineLastDisplay = this.dungeonDataMineIndex;
							}
							webfrontend.net.CommandManager.getInstance().sendCommand
							(
								"ReportGetCount",
								{
									folder:0,
									city:dm.c,
									mask:0x30FFF
								},
								this,
								this.DR_onRowCountCompleted
							);
						}
						else
							this.displayMinedDungeons();
					},
					DR_onRowCountCompleted: function( r, f )
					{
						var rowCount = Number(f);
						if( rowCount > 0 )
						{
							//this.CurrentServerTime = webfrontend.Util.getDateTimeString( Y );
	
							var dm = this.dungeonsToDataMine[this.dungeonDataMineIndex];
							//debug( "Mining dungeon " + this.dungeonDataMineIndex + " step 1 with " + rowCount + " rows" );
							webfrontend.net.CommandManager.getInstance().sendCommand
							(
								"ReportGetHeader",
								{
									folder:0,
									city:dm.c,
									start:rowCount - 1,
									end:rowCount - 1,
									sort:1,
									ascending:true,
									mask:0x30FFF
								},
								this,
								this.DR_onReportHeader
							);
						}
						else
						{
							this.dungeonDataMineIndex++;
							this.getDungeonReport();
						}
					},
					
					DR_onReportHeader:function(r,rows)
					{
						//this.FoundDungeonRows = rows;
						if(r!=false && rows.length == 1)
						{
							var allowReport = true;
							var dm = this.dungeonsToDataMine[this.dungeonDataMineIndex];
							if( this.dungeonDataMineStep == 0 )
							{
								// don't allow reports more than 4 hours old
								var now = this.getCurrentServerDate();
								dm.nowString = this.getCurrentServerDate().toString();
								var dDate = new Date( rows[0].d );
								dm.lastDString = dDate.toString();
								if( now.getTime() - dDate.getTime() > (4*60*60*1000) )
								{
									allowReport = false;
									var diff = now.getTime() - dDate.getTime();
									//debug( "Report disallowed on " + dm.x + ":" + dm.y + " for being " + (diff/(60*60*1000)) + " hours old" );
								}
							}
							else
							{
								// don't allow reports that weren't within 12 hours of the open time
								var s = webfrontend.data.ServerTime.getInstance().getStepTime(dm.d.StartStep).getTime();
								dm.startString = webfrontend.data.ServerTime.getInstance().getStepTime(dm.d.StartStep).toString();
								var dDate = new Date( rows[0].d );
								dm.firstDString = dDate.toString();
								if( dDate.getTime() - s > (12*60*60*1000) )
								{
									allowReport = false;
									var diff = dDate.getTime() - s;
									//debug( "Report disallowed on " + dm.x + ":" + dm.y + " for being " + (diff/(60*60*1000)) + " hours past start time" );
								}
							}

							if( allowReport )
							{
								webfrontend.net.CommandManager.getInstance().sendCommand
								(
									"GetReport",
									{
										id:rows[0].i
									},
									this,
									this.DR_onReport
								);
							}
							else
								this.DR_advanceStep();
						}
					},

					DR_advanceStep: function()
					{
						if( this.dungeonDataMineStep == 1 )
						{
							this.dungeonDataMineIndex++;
							this.getDungeonReport();
						}
						else
						{
							this.dungeonDataMineStep = 1;
							var dm = this.dungeonsToDataMine[this.dungeonDataMineIndex];
							//debug( "Mining dungeon " + this.dungeonDataMineIndex + " step 2" );
							webfrontend.net.CommandManager.getInstance().sendCommand
							(
								"ReportGetHeader",
								{
									folder:0,
									city:dm.c,
									start:0,
									end:0,
									sort:1,
									ascending:true,
									mask:0x30FFF
								},
								this,
								this.DR_onReportHeader,
								0
							);
						}
					},

					DR_onReport: function(r,fm)
					{
						if( r != false )
						{
							//this.lastMinedDungeonReport = fm;
							var kp=webfrontend.res.Main.getInstance();

							if(fm.hasOwnProperty("a")&&fm.a!=null)
							{
								var armies = [];
								for(var armyIndex=0;armyIndex<fm.a.length;armyIndex++)
								{
									var ku=0;
									var ko=fm.a[armyIndex];

									if(ko.r==webfrontend.base.GameObjects.eArmyRole.Defender)
									{
										if( ko.u!=null )
										{
											for(var unitIndex=0;unitIndex<ko.u.length;unitIndex++)
											{
												var unitType=ko.u[unitIndex].t;

												if(!kp.units.hasOwnProperty(unitType))
													continue;
												var unitData=kp.units[unitType];
												if( $SKSU.dungeonLoot.hasOwnProperty( unitData.dn ) )
												{
													armies.push( { armytype: unitData.dn, armysize: ko.u[unitIndex].o, loot: $SKSU.dungeonLoot[unitData.dn] } );
												}
											}
										}
									}
								}
								var dm = this.dungeonsToDataMine[this.dungeonDataMineIndex];
								var prog = this.dungeonDataMineStep != 0 ? 0 : dm.d.Progress;
								//debug( "Pushing report stage " + this.dungeonDataMineStep + ": " + prog );
								this.dungeonDataMine.push( { t: dm.d.DungeonType, l: dm.d.DungeonLevel, p:prog, a: armies, c: dm.c, x: dm.x, y: dm.y, id: fm.h.i} );
							}
						}
						this.DR_advanceStep();
					},
					
					getDungeonReports: function()
					{
						$SKSU.getObfuscatedNames();
						$SKSU.dungeonsToDataMine = [];
						$SKSU.dungeonDataMine = [];
						for( var cluster in $SKSU.worldData.d )
						{
							var objectData = $SKSU.safeGetProperty( $SKSU.worldData.d[cluster][$SKSU.objData], "d" );
							if( objectData )
							{
								for( var obj in objectData )
								{
									var coord = $SKSU.coordsFromCluster( cluster, obj );
									var o = objectData[obj];
									var x = coord & 0xffff;
									var y = coord >> 16;
									var cont = Math.floor(y/100)*10 + Math.floor(x/100);
									if( cont == 12 || cont == 13 || cont == 14 || cont == 22 || cont == 23 || cont == 31 || cont == 32 || cont == 33 || cont == 52 )
									{
										switch( o.Type )
										{
											case 2: // dungeon
												if( o.State )
													$SKSU.dungeonsToDataMine.push( {c:coord, d:o, x:x, y:y} );
												break;
										}
									}
								}
							}
						}
						debug( "Found " + $SKSU.dungeonsToDataMine.length + " dungeons" );
						$SKSU.dungeonDataMineIndex = 0;
						$SKSU.dungeonDataMineLastDisplay = 0;
						$SKSU.getDungeonReport();
					},

					displayMinedDungeons: function()
					{
						if( this.sksWin != null )
							this.sksWin.close();

						var dataString = "<sksDungeonExport>\n";
						for( var i = 0; i < this.dungeonDataMine.length; i++ )
						{
							var dm = this.dungeonDataMine[i];
							var maxLoot = 0;
							for( var armyIndex = 0; armyIndex < dm.a.length; armyIndex++ )
							{
								var army = dm.a[armyIndex];
								maxLoot += army.loot * army.armysize;
							}
							dataString += "<dr id=\"" + dm.x + ":" + dm.y + "\">" + dm.id + "," + this.dungName( dm.t ) + "," + dm.l + "," + dm.p + "," +	maxLoot;
							for( var armyIndex = 0; armyIndex < dm.a.length; armyIndex++ )
							{
								var army = dm.a[armyIndex];
								dataString += "," + army.armytype + "," + army.armysize;
							}
							dataString += "</dr>\n";
						}
						dataString += "</sksDungeonExport>\n";

						this.showOutputWindow( "Mined Dungeons", dataString );
					},

					showSkSWin: function()
					{
						if( this.sksWin == null )
						{
							var win = new qx.ui.window.Window("SkraggleScripts");
							win.setLayout(new qx.ui.layout.VBox);
							win.set({showMaximize: false, showMinimize: false, allowMaximize: false});

							btn = new qx.ui.form.Button("Cont+");
							btn.addListener("click", this.showNextCont, this);
							win.add(btn);
							btn = new qx.ui.form.Button("Cont-");
							btn.addListener("click", this.showPrevCont, this);
							win.add(btn);
							
							win.add( new qx.ui.core.Spacer().set({height:10}) );
							
							btn = new qx.ui.form.Button("Export World Data");
							btn.addListener("click", this.exportData, this);
							win.add(btn);
							var btn = new qx.ui.form.Button("Get Rankings Data");
							btn.addListener("click", this.getRankingsData, this);
							win.add(btn);

							win.add( new qx.ui.core.Spacer().set({height:10}) );
							
							btn = new qx.ui.form.Button("Mine Dungeon Reports");
							btn.addListener("click", this.getDungeonReports, this);
							win.add(btn);
							btn = new qx.ui.form.Button("Clear Dungeon Loot Info");
							btn.addListener("click", function() {this.dungeonLootInfo = {}}, this);
							win.add(btn);
							btn = new qx.ui.form.Button("Commands");
							btn.addListener("click", this.showCommands, this);
							win.add(btn);

							win.add( new qx.ui.core.Spacer().set({height:10}) );
							
							btn = new qx.ui.form.Button("Incoming Attacks");
							btn.addListener("click", this.showIncomingAttacks, this);
							win.add(btn);
							
							debug( "Adding raid button" );
							btn = new qx.ui.form.Button("SkSRaid");
							btn.addListener("click", this.showRaidInterface, this);
							win.add(btn);

							win.addListener( "close", function(){ this.sksWin = null; }, this );
							//this.a.desktop.add( win );
							win.center();
							win.open();
							this.sksWin = win;
						}
						else
						{
							this.sksWin.close();
						}
					},

					getApp: function() { if (this.a == null) this.a = qx.core.Init.getApplication(); return this.a; },
                    getIGD: function() { return webfrontend.res.Main.getInstance(); },
                    getTimer: function() { return webfrontend.base.Timer.getInstance(); },
                    getUpdateManager: function() { return webfrontend.net.UpdateManager.getInstance(); },

                    createImage: function(path, width, height, scale) {
                        var image = new qx.ui.basic.Image("webfrontend/" + path);
                        image.setWidth(width);
                        image.setHeight(height);
                        image.setScale(scale || false);
                        return image;
                    },
                    createLabel: function(text, style) {
                        var label = new qx.ui.basic.Label(text);
                        label.setAppearance(style);
                        return label;
                    },
                    createAtom: function(text, style, path, width, height, scale) {
                        var label = new qx.ui.basic.Atom(text, "webfrontend/" + path);
                        label.setAppearance(style);
                        //image.setWidth(width);
                        //image.setHeight(height);
                        //image.setScale(scale || false);
                        return label;
                    },
                    createToolTip: function(text, width) {
                        var tooltip = new qx.ui.tooltip.ToolTip(text);
                        if (width) tooltip.setWidth(width);
                        tooltip.setRich(true);
                        return tooltip;
                    },
                    formatNumbers: function(number, factor, fraction) {
                        factor = factor || "";
                        fraction = fraction || 0;
                        var pow = 0;
                        if (factor == "M") pow = 6;
                        if (factor == "k") pow = 3;
                        if (pow > 0) number = Math.floor(number / Math.pow(10, pow - fraction)) / Math.pow(10, fraction);
                        return webfrontend.gui.Util.formatNumbers(number).toString() + factor;
                    },

                    getTech: function() { return webfrontend.data.Tech.getInstance(); },
                    getConstructionSpeedBonus: function() {
                        var tech = this.getTech();
                        return tech.getBonus("constSpeed", webfrontend.data.Tech.research)
                                + tech.getBonus("constSpeed", webfrontend.data.Tech.shrine);
                    },
                    // FIXME speed info in Gamedaten suchen
                    getCottageConstructionSpeedIncrement: function(level) { return $C.cottageSpeedIncrement[level]; },
                    getBuildingBuildTime: function(type, level) { return this.getIGD().buildings[type].r[level].t; },
                    getBuildingResourceCost: function(type, level, resource) {
                        var list = this.getIGD().buildings[type].r[level].r;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].t == resource) return list[i].c;
                        }
                        return 0;
                    },
                    getCurrentTicks: function() { return webfrontend.data.ServerTime.getInstance().getServerStep(); },
                    getTicksPerHour: function() { return webfrontend.data.ServerTime.getInstance().getStepsPerHour(); },
                    getTimeString: function(t) { return webfrontend.Util.getDateTimeString(
                            webfrontend.data.ServerTime.getInstance().getStepTime(t)); },
                    getTimespanString: function(t) {
                        var h = t / this.getTicksPerHour();
                        if (h < 1/60) return "< 1m";
                        else if (h < 1) return "" + Math.round(h*60) + "m";
                        else if (h < 48) return "" + (Math.round(h*10) / 10) + "h";
                        else return "" + (Math.round(h*10/24) / 10) + "d";
                    },
                    // data
                    getPlayerData: function() { return webfrontend.data.Player.getInstance(); },
                    getCurrentGold: function() {
                        var player = this.getPlayerData();
                        return player.getGold();
                    },
                    getCityData: function() { return webfrontend.data.City.getInstance(); },
                    // UI
                    getRootWindow: function() { return this.a.getRoot(); },
                    getSelectorBar: function() { return this.a.getSelectorBar(); },
                    getChat: function() { return this.a.chat; },
                    // getOverviewButton: function() { return this.a.getTitleWidget().overviewButton; },

                    /* gibt ein Objekt zurück, mit key-value Paaren "Minister-ID" = "Tab Index" */
                    __getMinisterDialogTabSelection: function() { return this.a.ministerInfoWidget.__nC;},     // Object 1=x, 2=x, ...
                    __researchOverviewDataModel: null,
                    getResearchOverviewDataModel: function() {
                        if (!this.__researchOverviewDataModel) {
                            var page = this.getOverviewWindow();
                            this.__researchOverviewDataModel = this.findObject(this.a.title.research, qx.ui.treevirtual.SimpleTreeDataModel, false);
                        }
                        return this.__researchOverviewDataModel;
                    },
                    __getResearchResourceIcons: function() { return this.a.title.research.__FS; },
                    __updateResearchNode: function(node) { this.a.title.research.__Gn(node); },
                    getOverviewWindow: function() { return this.a.getOverviewWindow(); },
                    __getResourceOverviewWidget: function() { return this.a.getOverviewWindow().__beR; },
                    __initResourceOverviewWidget: function() { this.__getResourceOverviewWidget().__Sl(); },   // erste __function
                    __getOverviewWindowResizeListener: function() { return this.a.getOverviewWindow().__bfc; }, // Listener aus "addListenerOnce"
                    __overviewWindowTabView: null,
                    getOverviewWindowTabView: function() {
                        if (!this.__overviewWindowTabView) {
                            var page = this.getOverviewWindow();
                            this.__overviewWindowTabView = this.findComponent(page, qx.ui.tabview.TabView, true);
                        }
                        return this.__overviewWindowTabView;
                    },
                    __optionWindowTabView: null,
                    getOptionWindowTabView: function() {
                        if (!this.__optionWindowTabView) {
                            var page = this.a.getOptionsPage();
                            this.__optionWindowTabView = this.findComponent(page.clientArea, qx.ui.tabview.TabView, true);
                        }
                        return this.__optionWindowTabView;
                    },

                    findComponent: function(composite, component, recursive) {
                        recursive = recursive || false;
                        var children = composite.getChildren();
                        for (var i = 0; i < children.length; i++) {
                            if (children[i] instanceof component) {
                                return children[i];
                            } else if (recursive && children[i] instanceof qx.ui.container.Composite) {
                                var ret = this.findComponent(children[i], component, recursive);
                                if (ret != null) return ret;
                            }
                        }
                        return null;
                    },
                    findObject: function(parent, component, recursive) {
                        recursive = recursive || false;
                        for (var key in parent) {
                            if (parent[key] instanceof component) {
                                return parent[key];
                            } else if (recursive && typeof parent[key] == "object") {
                                var ret = this.findObject(parent[key], component, recursive);
                                if (ret != null) return ret;
                            }
                        }
                        return null;
                    },
                    findIcon: function(parent, source) {
                        // Image Object aus der Liste der Children heraussuchen, da nicht als property
                        // hinterlegt
                        var ch = parent._getChildren();
                        for (var i = 0; i < ch.length; i++) {
                            if (ch[i] instanceof qx.ui.basic.Image
                                    && ch[i].getSource() == source) {
                                return ch[i];
                            }
                        }
                        return null;
                    },

                    fixQueueHeaderBorder: function(header) {
                        // FIXME icons permanent in header merken
                        var iconH = $SKSU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
                        var iconS = $SKSU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png");
                        var iconE = $SKSU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png");
                        var b = iconE.getBounds();
                        var hb = header.getBounds();
                        var h = hb.height - b.height;
                        iconE.setDomTop(h);

                        var scalerTop = iconH.getBounds().height - 8;
                        if (h > scalerTop) {
                            if (iconS == null) {
                                iconS = new qx.ui.basic.Image("webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png");
                                iconS.setZIndex(-5);
                                header.add(iconS, {left: 0, top: scalerTop });
                            }
                            iconS.setHeight(h - (scalerTop) + 2);
                        }
                        else {
                            if (iconS != null) {
                                iconS.setHeight(2);
                            }
                        }
                    },

                    resIndex: function(resName)
                    {
                        var gData=webfrontend.res.Main.getInstance();

                        for( r in gData.resources )
                        {
                            if( gData.resources[r].n == resName )
                                return r;
                        }
						return 0;
					}
                } // end statics
            }); // end class "sks.Utils"

            qx.Class.define("sks.LAPI.Core", {
                type: "static",
                extend: qx.core.Object,
                statics: {
                    _app: null,
                    _getLouApp: function() { if (this._app == null) this._app = qx.core.Init.getApplication(); return this._app; },
                    // $ui: sks.LAPI.UI,
                    getUI: function() { return $ui; },
                } // end statics
            }); // end class "sks.LAPI.Core"

            qx.Class.define("sks.LAPI.UI", {
                type: "static",
                extend: qx.core.Object,
                statics: {
                    $cityInfo: null,
                    getCityInfo: function() { return $cityInfo; },
                } // end statics
            }); // end class "sks.LAPI.UI"

            function _i18n(string) {
                if (!(string in _lang)) { alert("Translation missing"); return string; }
                if (!("en" in _lang[string])) { alert("Translation missing"); return string; }
                return _lang[string].en;
            }

            var _lang = {
                // Options Tab
                "[sks] Tweak": {en:"[sks] Tweak"},
                // City Overview Tab
                "[sks] City Overview": {en:"[sks] City Overview"},
            };

            function checkIfLoaded() {
                debug("main script: checking if game is ready ...");

                var a = sks.Utils.getApp();
                var p = sks.Utils.getPlayerData();

                if (    // LoU initialized
                        a && a.initDone
                        // player data loaded
                        && p.$$user_version
                    ) {
                    info("requirements ok, installing mods");
                    sks.loua.Tweaks.getInstance().start();
                }
                else {
                    window.setTimeout(checkIfLoaded, 100);
                }
            }

            info("running main script ...");

            $A = sks.Utils.getApp();
            $SKS = sks;
            $SKSU = sks.Utils;
            var $$ = sks.LAPI.Core;
            $C = sks.Const;
            $Q = qx;
            $W = webfrontend;
			$SKSU.initSKSU();

            window.setTimeout(checkIfLoaded, 500);
        } // end as_main

        function log(obj) {
            try {
                if (console) console.log(obj);
            }
            catch (e) {
                // no console to log to
            }
        }

        function debug(obj) {
            try {
                if (console) console.debug(obj);
            }
            catch (e) {
                // no console to log to
            }
        }

        function info(obj) {
            try {
                if (console) console.info(obj);
            }
            catch (e) {
                // no console to log to
            }
        }

        function error(obj) {
            try {
                if (console) console.error(obj);
            }
            catch (e) {
                // no console to log to
            }
        }

        function checkQX() {
            debug("start script: checking for qx framework ...");
            if (typeof qx == "undefined") {
                window.setTimeout(checkQX, 100);
            }
            else {
                info("start script: qx framework found, proceeding with main script");

                try {
                    sks_as_main();
                }
                catch (e) {
                    error(e);
                }
            }
        }

        info("running start script ...");

        // wait until qx Framework is loaded
        window.setTimeout(checkQX, 500);

    } // end of function as_start

    // inject and start script
    var script = document.createElement("script");
    script.innerHTML = "(" + sks_as_start.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

})();