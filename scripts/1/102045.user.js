// ==UserScript==
// @name           LoU Assistant
// @namespace      brm
// @description    UI Extension for LordOfUltima
// @version        340089.1 (2011-12-21)
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @require        http://sizzlemctwizzle.com/updater.php?id=102045&days=1&uso
// ==/UserScript==

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
    var as_start = function() {
        
        // inner shell for delayed execution
        function as_main() {

            qx.Class.define("brm.Const", {
                type: "static",
                //extend: qx.core.Object, // don't extend, firebug works better 
                statics: {
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

            qx.Class.define("brm.loua.Tweaks", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    start: function() {
                        brm.loua.ConfigManager.getInstance().start();
                        
                        brm.loua.Chat.getInstance().start();
                        brm.loua.Ministers.getInstance().start();
                        brm.loua.Items.getInstance().start();
                        brm.loua.PlayerStats.getInstance().start();
                        brm.loua.ResourceStats.getInstance().start();
                        brm.loua.OverviewWindowAlignment.getInstance().start();
                        brm.loua.CityOverview.getInstance().start();
                        // brm.loua.CityBuildingStats.getInstance().start();
                        
                        brm.loua.ConfigManager.getInstance().saveConfig();
                        info("main script: initialization completed");
                    }, // end start
                } // end members
            }); // end class "brm.loua.Tweaks"

            qx.Class.define("brm.loua.ConfigManager", {
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
                            if (localStorage && localStorage.brmConf) {
                                this.oldConfig = JSON.parse(localStorage.brmConf);
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
                                localStorage.brmConf = JSON.stringify(conf);
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
                        var c = new brm.loua.ConfigManagerCategory(this.oldConfig[category], title, defaults.desc);
                        this.config[category] = c;
                        // loop over items
                        if (defaults.items) {
                            for (var key in defaults.items) {
                                // merge items
                                var configValue = this.oldConfig[category] ? this.oldConfig[category][key] : null;
                                var item = new brm.loua.ConfigManagerItem(key, configValue, defaults.items[key]);
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
                            this.mainPanel = new qx.ui.tabview.Page("[brm] Tweak", "");
                            this.mainPanel.setLayout(new qx.ui.layout.VBox());
                            this.copyright = $BU.createLabel("&copy; LoU Assistant by brm. This is not part of the official game!", "");
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

							$BU.getOptionWindowTabView().add(this.mainPanel);
							// Listener registrieren?
                        }
                        catch (e) {
                            error("addOptionTab: " + e);
                        }
                    },
					
                    addOptions: function(obj) {
                        var config = this.getConfig(obj);
                        
                        var title = new qx.ui.form.CheckBox(config.getTitle());
                        title.set({backgroundColor: "white", paddingBottom: 1, allowStretchX: true});
                        title.getChildControl("label").setAllowStretchX(true);
                        // bind config, then title, important!
                        config.bind("enabled", title, "value");
                        title.bind("value", config, "enabled");
                        
                        var block = new qx.ui.container.Composite(new qx.ui.layout.VBox());
                        block.set({marginBottom: 10, allowStretchY: true});
                        block.setDecorator(new qx.ui.decoration.Uniform(1, "dotted", "white"));
                        block.add(title, {flex: 1});
                        
                        if (config.getDescription()) {
                            var desc = new qx.ui.basic.Label(config.getDescription(), "");
                            desc.set({rich: true, padding: 2, allowStretchX: true});
                            block.add(desc, {flex: 1});
                        }
                        for (var key in config.items) {
                            var item = config.items[key];
                            switch (item.getType()) {
                                case "boolean":
                                    var cb = new qx.ui.form.CheckBox(item.getTitle());
                                    cb.set({rich: true, marginLeft: 25, allowStretchX: true});
                                    cb.getChildControl("label").setAllowStretchX(true);
                                    if (item.getDescription()) cb.setToolTipText(item.getDescription());
                                    item.bind("value", cb, "value");
                                    cb.bind("value", item, "value");
                                    block.add(cb, {flex: 1});
                                break;
                                default:
                                    var lbl = new qx.ui.basic.Label(item.getTitle(), "");
                                    lbl.setRich(true);
                                    block.add(lbl);
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
            
            qx.Class.define("brm.loua.ConfigManagerCategory", {
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

            qx.Class.define("brm.loua.ConfigManagerItem", {
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
                    getDescription: function() { return this.defaults.desc; },
                    getOptions: function() { return this.defaults.options; },
                }
            });

            qx.Class.define("brm.loua.Mod", {
                type: "abstract",
                extend: qx.core.Object,
                members: {
                    __configDefaults: {
                        title: "Untitled",
                        desc: "No configuration description available.",
                        items: {}
                    },
                    __active: false,
                    
                    start: function() {
                        info ("registering " + this.__configDefaults.title + " Mod ...");
                        var m = brm.loua.ConfigManager.getInstance();
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
                        if (!$BU.getPlayerData().$$user_resourceOverviewOptions) {
                            debug ("not all required game data yet available, delaying activation of " + this.__configDefaults.title + " Mod");
                            var that = this; // memorize context
                            window.setTimeout(function() {that._activate();}, 100);
                            return false;
                        }
                        return true;
                    },
                }
            });
            
            qx.Class.define("brm.loua.Chat", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Chat",
                        desc: "Switch <b>Chat</b> to <b>Alliance</b> tab on startup.",
                        items: {}
                    },

                    addMod: function() {
                        var tab = $BU.getChat().tabView;
                        // TODO Allianz-Tab identifizieren
                        tab.setSelection([tab.getChildren()[1]]);
                    },
                    
                    removeMod: function() {
                        // nothing to do
                    }
                }
            });

            qx.Class.define("brm.loua.Ministers", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Ministers",
                        desc: "Switch <b>Minister</b> dialogs to <b>Assistance/Options</b> tab on startup.",
                        items: {}
                    },

                    addMod: function() {
                        // app.showMinisterInfo(minister) "überladen"
                        // um Modifikation verzögert auszuführen, da das
                        // ministerInfoWidget erst beim ersten Aufruf von
                        // showMinisterInfo() erzeugt wird.
                        var orgFkt = $A.showMinisterInfo;
                        brm.Utils.getApp().showMinisterInfo = function(minister) {
                            //////////
                            // delayed function
                            //////////
                            debug("delayed minister tabs switcher called");
                            
                            // Wrapper wieder mit Original ersetzen und
                            // Aufruf durchreichen
                            $A.showMinisterInfo = orgFkt;
                            $A.showMinisterInfo(minister);
                            
                            // Ok, ministerInfoWidget gibt es jetzt. Indexobjekt belegen.
                            var mtab = brm.Utils.__getMinisterDialogTabSelection();
                            // Verfügbarkeit der Minister ist egal, da indirekte
                            // Steuerung. Wird von LoU berücksichtigt.
                            var mId = webfrontend.base.GameObjects.eMinisterId;
                            mtab[mId.BuildMinister] = 1; // auf Index 1 setzen
                            mtab[mId.DefenseMinister] = 1; // auf Index 1 setzen
                            mtab[mId.MilitaryMinister] = 1; // auf Index 1 setzen
                            mtab[mId.TradeMinister] = 1; // auf Index 1 setzen

                            // Aber für den ersten Aufruf ist es für den Tabwechsel
                            // zu spät.
                            // Dialog schließen und nochmal öffnen, dann passt auch
                            // der Tab.
                            $A.showMinisterInfo(minister);
                            $A.showMinisterInfo(minister);
                            orgFkt = null;
                            //////////
                            // (end) delayed function
                            //////////
                        };
                        
                        debug("... delayed minister tabs switcher installed");
                        
                        //var w = $A.getCityBar().ministerBuildButton.setThemedDecorator(null);
                    },
                    
                    removeMod: function() {
                        // nothing to do
                    }
                }
            });

            qx.Class.define("brm.loua.Items", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Items",
                        desc: "Set <b>Items</b> filter to <b>All</b> on startup. Filter will no longer be changed when opening the dialog.",
                        items: {}
                    },
                    orgPopulateTitleDropdown: null,

                    addMod: function() {
                        // FIXME bis onItems() verzögern??
                        if ($A.title.items == null) {
                            $A.title.items = new webfrontend.gui.ItemsWidget();
                        }
                        $A.title.items.titleDropdown.setSelection([$A.title.items.titleDropdown.getSelectables(true)[0]]);
                        // diable this function
                        this.orgPopulateTitleDropdown = $A.title.items.populateTitleDropdown;
                        $A.title.items.populateTitleDropdown = function() {};
                    },
                    
                    removeMod: function() {
                        $A.title.items.populateTitleDropdown = this.orgPopulateTitleDropdown;
                        this.orgPopulateTitleDropdown = null;
                    }
                }
            });

            // FIXMEs in addMod()
            // FIXMEs in updateMod()
            qx.Class.define("brm.loua.PlayerStats", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Player Statistics",
                        desc: "Adds additional player statistics (city count, barons, title level, etc.) into the <b>Title Bar</b>.",
                        items: {}
                    },
                    cityAtom: null,
                    cityToolTip: null, titleToolTip: null,
                    
                    addMod: function() {
                        var player = $BU.getPlayerData();
                        var title = $A.getTitleWidget();
                        var style = title.titleLabel.getAppearance(); // "label-playername-banner"
                        var ileft = 140;
                        // goldLabel might no longer be visible! Use titleLabel instead.
                        var itop = title.titleLabel.getContentLocation("box").top; // 36

                        this.cityAtom = $BU.createAtom("1 / 1", style, $C.icons.townIconLand);
                        this.cityAtom.setIconPosition("top-left");
                        this.cityToolTip = $BU.createToolTip("1 / 1");
                        this.cityAtom.setToolTip(this.cityToolTip);
                        
                        // FIXME width rücksetzen/neutralisieren, überschneidet sich mit anderen Labels
                        title.titleLabel.setWidth(80);
                        this.titleToolTip = new brm.loua.PlayerStatsTitleToolTip("");
                        title.titleLabel.setToolTip(this.titleToolTip);
                        // FIXME ToolTip auch auf "Title:" Label anwenden

                        title._add(this.cityAtom, {left: ileft, top: itop});
                        
                        player.addListener("changeVersion", this.updateMod, this);
                        this.updateMod();
                        
                        // TODO title label einfärben, wenn alles verfügbar
                    },
                    
                    removeMod: function() {
                        var igd = $BU.getIGD();
                        var player = $BU.getPlayerData();
                        var title = $A.getTitleWidget();

                        // remove cityToolTip and cityLabel
                        this.cityAtom.resetToolTip();
                        this.cityToolTip.dispose();
                        this.cityToolTip = null;
                        title._remove(this.cityAtom);
                        this.cityAtom.dispose();
                        this.cityAtom = null;
                        
                        // remove titleToolTip
                        title.titleLabel.resetToolTip();
                        this.titleToolTip.dispose(); 
                        this.titleToolTip = null;
                        // refresh titleLabel
                        var t = igd.playerTitles[player.getTitle()]; // t.b = title.border
                        title.titleLabel.setValue(t.dn);

                        player.removeListener("changeVersion", this.updateMod, this);
                    },
                    
                    updateMod: function() {
                        // debug("PlayerStats.updateMod");
                        
                        var igd = $BU.getIGD();
                        var player = $BU.getPlayerData();
                        var title = $A.getTitleWidget();
                        var cities = player.getNumCities();
                        var maxBarons = player.getModifiers()[$C.modifierIDs.maxBarons] || 0;
                        var maxCities = maxBarons + 1;
                        var barons = player.getBarons(); // includes idleBarons and queueBarons
                        var idleBarons = player.getBaronsIdle();
                        var queueBarons = player.getBaronsQueue();
                        var remainingBarons = maxBarons - barons;
                        
                        this.cityAtom.setLabel(cities + " / " + maxCities);
                        
                        var sb=new qx.util.StringBuilder(1024);
                        // FIXME i18n
                        // FIXME create function for table matrix
                        sb.add("<table cellspacing='0'><tr><td width='200'>",
                                "Current number of cities:","</td><td>", cities,
                                "</td></tr>","<tr><td>",
                                "Maximum number of cities:","</td><td>", maxCities,
                                "</td></tr>","<tr><td>",
                                "Available Barons:","</td><td>", idleBarons,
                                "</td></tr>","<tr><td>",
                                "Barons being recruited:","</td><td>", queueBarons,
                                "</td></tr>","<tr><td>",
                                "Amount of barons which can be recruited:","</td><td>", remainingBarons,
                                "</td></tr></table>");
                        this.cityToolTip.setLabel(sb.get());
                        
                        var t = igd.playerTitles[player.getTitle()]; // t.b = title.border;
						var costModel = $BU.getPlayerProgressCostModel();
						if (t.b[costModel] > 0) {
							var level = maxBarons - t.b[costModel] + 1; // FIXME world started [1] before 08.09.2011, [2] later
							title.titleLabel.setValue(t.dn + " (" + level + ")");
						}
                    }
                }
            });

            // FIXMEs in onTick()
            qx.Class.define("brm.loua.PlayerStatsTitleToolTip", {
                extend: qx.ui.tooltip.ToolTip,
                construct: function(value) {
                    this.base(arguments, value); // call super constructor
                    this.setRich(true); // using HTML
                    this.addListener("appear", this.onAppear, this);
                    this.addListener("disappear", this.onDisappear, this);
                },
                destruct: function() {
                    this.removeListener("appear", this.onAppear, this);
                    this.removeListener("disappear", this.onDisappear, this);
                    $BU.getTimer().removeListener("uiTick", this.onTick, this);
                },
                members: {
                    onAppear: function() {
                        $BU.getTimer().addListener("uiTick", this.onTick, this);
                        this.onTick();
                    },
                    onDisappear: function() {
                        $BU.getTimer().removeListener("uiTick", this.onTick, this);
                    },
                    onTick: function() {
                        var title = $A.getTitleWidget();
						var sb = new qx.util.StringBuilder(1024);
                        
						// FIXME ab wann die ersten pur. Res. anzeigen?
						// block this feature until title is Baron
						if ($BU.getPlayerData().getTitle() >= 3) {
							// initialize title.research if not yet done
							if (title.research == null) { 
								title.research=new webfrontend.gui.ResearchOverviewWidget();
							}

							// FIXME node 2
							var node = $BU.getResearchOverviewDataModel()._nodeArr[2];
							var icons = $BU.__getResearchResourceIcons();
							// Neuberechnung durchführen
							$BU.__updateResearchNode(node);
							var mres = node.missingRes;

							// FIXME i18n
							sb.add("Missing resources for next level:", "<br>");
							if (!mres || mres.length == 0) {
								sb.add("<span style='color:green'>All resources available.</span>");
							} else {
								for (var r = 0; r < mres.length; r++) {
									sb.add("<img style='padding-left:20px;' src='resource/webfrontend/ui/",
											icons[mres[r][0]], ".png'> ",
											$BU.formatNumbers(mres[r][1]));
								}
							}
							sb.add("<br><br>");
						}
                        
                        sb.add(this.getOpener().getToolTipText());

                        this.setLabel(sb.get());
                    }
                }
            });
            
            // FIXME goldProd geht auch ohne Minister
            // FIXMEs in addMod()
            // FIXMEs in removeMod()
            // FIXMEs in updateMod()
            qx.Class.define("brm.loua.ResourceStats", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Resource Statistics",
                        desc: "Adds additional resource statistics (total resources, total production) into the <b>Title Bar</b>. (<b>Requires Trade Minister</b>)",
                        items: {
                            hideManaLabel: {
                                type: "boolean",
                                title: "Hide <b>Mana</b> label.",
                                desc: "Hides the <b>Mana</b> label in the <b>Title Bar</b>.",
                                default: false,
                            },
                            /*totalResourceStyle: {
                                default: "auto",
                                title: "Resource Totals",
                                desc: "Choose a pattern for the resource totals.<br>auto will choose a pattern based on the available space.<br>The compact patterns will show the value in thousands or millions.",
                                options: [
                                    "auto", 
                                    "rp|resources + production", "rpc|resources + production (compact)", 
                                    "ro|resources only", "roc|resources only (compact)",
                                    "po|production only", "poc|production only (compact)"
                                ]
                            },*/
                        },
                    },
                    patterns: [],

                    woodLabel: null, stoneLabel: null, ironLabel: null, foodLabel: null, goldLabel: null,
                    woodIcon: null, stoneIcon: null, ironIcon: null, foodIcon: null, goldIcon: null,
                    orgLocation: {},
                    manaIconLeft: 0, manaLabelLeft: 0, w1: 0,
                    pattern: null,
                    
                    _checkRequirements: function() {
                        return $BU.getPlayerData().getMinisterTradePresent();
                    },
                    
                    _checkGameState: function() {
                        // FIXME was genau verursacht das Problem gleich wieder?
                        return this._waitForResourceOverviewPrerequirements();
                    },
                    
                    addMod: function() {
                        // FIXME auf BoxLayout umstellen
                        var cfg = brm.loua.ConfigManager.getInstance().getConfig(this);
                        var title = $A.getTitleWidget();
						var titleInfos = title.goldLabel.getLayoutParent();
						var titleInfosLayout = titleInfos.getLayout();

                        if (cfg.checkEnabled() && ! this.goldLabel) {
                            var igd = $BU.getIGD();
                            var style = title.titleLabel.getAppearance(); // "label-playername-banner"
                            // var goldIcon = $BU.createImage("ui/icons_ressource_gold.png", iw, ih, true);
                            this.goldIcon = this.__getGoldIcon();
                            // FIXME Fehlerfall behandeln (Icon nicht gefunden)
                            var iw = title.manaIcon.getWidth(), ih = title.manaIcon.getHeight(); // 24, 24
                            var gii = this.orgLocation.goldIcon = this.goldIcon.getContentLocation("box");
                            var gll = this.orgLocation.goldLabel = title.goldLabel.getContentLocation("box");
                            this.orgLocation.manaIcon = title.manaIcon.getContentLocation("box");
							this.manaIconLeft = this.orgLocation.manaIcon.left;
                            this.orgLocation.manaLabel = title.manaLabel.getContentLocation("box");
							this.manaLabelLeft = this.orgLocation.manaLabel.left;
                            this.orgLocation.allianceAttackIcon = title.allianceAttackIcon.getContentLocation("box");
                            this.orgLocation.allianceAttackLabel = title.allianceAttackLabel.getContentLocation("box");
                            this.orgLocation.enlightenmentIcon = title.enlightenmentIcon.getContentLocation("box");
                            this.orgLocation.enlightenmentLabel = title.enlightenmentLabel.getContentLocation("box");
                            this.orgLocation.iconFoodWarning = title.iconFoodWarning.getContentLocation("box");
                            this.orgLocation.lblFoodWarning = title.lblFoodWarning.getContentLocation("box");
                            var ileft = gii.left - 25; // goldIcon=504;
                            var itop = gll.top; // 36
                            var w1 = this.w1 = gll.left - gii.left; // 26
                            var w2 = 120; //160;
                            
                            this.woodIcon = $BU.createImage(igd.imageFiles[igd.resources[$C.woodID].i], iw, ih, true);
                            this.woodLabel = $BU.createLabel("0 (+0)", style);
                            this.stoneIcon = $BU.createImage(igd.imageFiles[igd.resources[$C.stoneID].i], iw, ih, true);
                            this.stoneLabel = $BU.createLabel("0 (+0)", style);
                            this.ironIcon = $BU.createImage(igd.imageFiles[igd.resources[$C.ironID].i], iw, ih, true);
                            this.ironLabel = $BU.createLabel("0 (+0)", style);
                            this.foodIcon = $BU.createImage(igd.imageFiles[igd.resources[$C.foodID].i], iw, ih, true);
                            this.foodLabel = $BU.createLabel("0 (+0)", style);
                            this.goldLabel = $BU.createLabel("0 (+0)", style);
                            this.goldLabel.setToolTip(title.goldLabel.getToolTip());

                            // Elemente hinzufügen und nachfoldende Icons und Label verschieben
							titleInfos.remove(this.goldIcon);
							titleInfosLayout.setColumnWidth(5, 0);
							titleInfos.remove(title.goldLabel);
							titleInfosLayout.setColumnWidth(6, 0);
							titleInfos.remove(title.manaIcon);
							titleInfosLayout.setColumnWidth(7, 0);
							titleInfos.remove(title.manaLabel);
							titleInfosLayout.setColumnWidth(8, 0);
							titleInfosLayout.setColumnWidth(16, 50);
							titleInfosLayout.setColumnWidth(18, 40);

							var col = 20;

                            titleInfos.add(this.goldIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(this.goldLabel, {row: 0, column: col}); // and replace with own label
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);
                            titleInfos.add(this.woodIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(this.woodLabel, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);
                            titleInfos.add(this.stoneIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(this.stoneLabel, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);
                            titleInfos.add(this.ironIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(this.ironLabel, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);
                            titleInfos.add(this.foodIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(this.foodLabel, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);
                            titleInfos.add(title.manaIcon, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'right', 'middle');
							titleInfosLayout.setColumnWidth(col++, w1);
                            titleInfos.add(title.manaLabel, {row: 0, column: col});
							titleInfosLayout.setColumnAlign(col, 'left', 'middle');
							titleInfosLayout.setColumnWidth(col++, w2);

//                            title.manaIcon.setDomLeft(this.manaIconLeft = (ileft += w2));
//                            title.manaLabel.setDomLeft(this.manaLabelLeft = (ileft += w1));
/*                            title.allianceAttackIcon.setDomLeft(ileft += 29);
                            title.allianceAttackLabel.setDomLeft(ileft += w1);
                            title.enlightenmentIcon.setDomLeft(ileft += 39);
                            title.enlightenmentLabel.setDomLeft(ileft += w1 + 4);
                            title.iconFoodWarning.setDomLeft(ileft += 68);
                            title.lblFoodWarning.setDomLeft(ileft += w1);
  */                          
                            // Listener beim Timer für UI-Updates registrieren 
                            $BU.getTimer().addListener("uiTick", this.updateMod, this);
                            // HACK: damit bereits nach dem Start eine Anzeige verfügbar ist
                            // müssen die Daten über den UpdateManager angefordert werden und
                            // der ResourceOverviewWidget als Consumer eingetragen werden.
                            // Das klappt aber erst, nachdem dieser auch initialisiert ist.
                            $BU.__initResourceOverviewWidget();
                            $BU.getUpdateManager().addConsumer("RESO", $BU.getResourceOverviewWidget());
                            // FIXME bleibt nur bis zum Öffnen/Schließen des ResourceOverview wirksam
                        }
                        
                        if (cfg.checkConfigItem("hideManaLabel")) {
                            var ileft = title.manaIcon.getContentLocation("box").left;
                            var w1 = this.w1;
                            title.manaIcon.exclude();
                            title.manaLabel.exclude();
                            title.allianceAttackIcon.setDomLeft(ileft += 29);
                            title.allianceAttackLabel.setDomLeft(ileft += w1);
                            title.enlightenmentIcon.setDomLeft(ileft += 39);
                            title.enlightenmentLabel.setDomLeft(ileft += w1 + 4);
                            title.iconFoodWarning.setDomLeft(ileft += 68);
                            title.lblFoodWarning.setDomLeft(ileft += w1);
                        }
                    },
                    
                    removeMod: function() {
                        var cfg = brm.loua.ConfigManager.getInstance().getConfig(this);
                        var title = $A.getTitleWidget();

                        if (! cfg.checkConfigItem("hideManaLabel")) {
                            var ileft = title.attackIcon.getContentLocation("box").left;
                            var w1 = this.w1;
                            title.manaIcon.show();
                            title.manaLabel.show();
                            title.allianceAttackIcon.setDomLeft(ileft += 29);
                            title.allianceAttackLabel.setDomLeft(ileft += w1);
                            title.enlightenmentIcon.setDomLeft(ileft += 39);
                            title.enlightenmentLabel.setDomLeft(ileft += w1 + 4);
                            title.iconFoodWarning.setDomLeft(ileft += 68);
                            title.lblFoodWarning.setDomLeft(ileft += w1);
                        }
                        
                        if (! cfg.checkEnabled() && this.goldLabel) {
                            $BU.getTimer().removeListener("uiTick", this.updateMod, this);

                            title._remove(this.woodIcon); this.woodIcon.dispose(); this.woodIcon = null;
                            title._remove(this.woodLabel); this.woodLabel.dispose(); this.woodLabel = null;
                            title._remove(this.stoneIcon); this.stoneIcon.dispose(); this.stoneIcon = null;
                            title._remove(this.stoneLabel); this.stoneLabel.dispose(); this.stoneLabel = null;
                            title._remove(this.ironIcon); this.ironIcon.dispose(); this.ironIcon = null;
                            title._remove(this.ironLabel); this.ironLabel.dispose(); this.ironLabel = null;
                            title._remove(this.foodIcon); this.foodIcon.dispose(); this.foodIcon = null;
                            title._remove(this.foodLabel); this.foodLabel.dispose(); this.foodLabel = null;
                            title._remove(this.goldLabel); this.goldLabel.resetToolTip(); this.goldLabel.dispose(); this.goldLabel = null;

                            this.goldIcon.setDomLeft(this.orgLocation.goldIcon.left);
                            title.goldLabel.show(); // show original label
                            title.manaIcon.setDomLeft(this.orgLocation.manaIcon.left);
                            title.manaLabel.setDomLeft(this.orgLocation.manaLabel.left);
                            title.allianceAttackIcon.setDomLeft(this.orgLocation.allianceAttackIcon.left);
                            title.allianceAttackLabel.setDomLeft(this.orgLocation.allianceAttackLabel.left);
                            title.enlightenmentIcon.setDomLeft(this.orgLocation.enlightenmentIcon.left);
                            title.enlightenmentLabel.setDomLeft(this.orgLocation.enlightenmentLabel.left);
                            title.iconFoodWarning.setDomLeft(this.orgLocation.iconFoodWarning.left);
                            title.lblFoodWarning.setDomLeft(this.orgLocation.lblFoodWarning.left);
                            
                            // FIXME consumer(RESO) ??
                        }
                    },
                    
                    __getGoldIcon: function() {
                        // Image Object aus der Liste der Children heraussuchen, da nicht als property
                        // hinterlegt
                        //var ch = $A.getTitleWidget()._getChildren();
						var ch = $A.getTitleWidget().goldLabel.getLayoutParent()._getChildren(); // oder rekursiv suchen
                        for (var i = 0; i < ch.length; i++) {
                            if (ch[i] instanceof qx.ui.basic.Image 
                                    && ch[i].getSource() == "webfrontend/ui/icons_ressource_gold.png") {
                                return ch[i];
                            }
                        }
                        return null;
                    },
                    
                    updateMod: function(event) {
                        try {
                            // FIXME manalabel bleibt nicht verschoben (LoU Tweak tweakInterface!!)
//                            var title = $A.getTitleWidget();
//                            title.manaIcon.setDomLeft(this.manaIconLeft); // 598+650?
//                            title.manaLabel.setDomLeft(this.manaLabelLeft); // 621+650?

                            var cities = $BU.getResourceOverviewWidget().cities;
                            var ctick = $BU.getCurrentTicks();
                            var wood = 0, stone = 0, iron = 0, food = 0, gold = 0;
                            var woodProd = 0, stoneProd = 0, ironProd = 0, foodProd = 0, goldProd = 0;
                            for (var id in cities) {
                                // FIXME ist r[3] immer wood? besser r[x].i prüfen
                                wood += cities[id].r["3"].b; // Bestand
                                wood += cities[id].r["3"].d * (ctick - cities[id].r["3"].s); // prod. Bestand
                                woodProd += cities[id].r["3"].d; // Produktion
                                stone += cities[id].r["2"].b; // Bestand
                                stone += cities[id].r["2"].d * (ctick - cities[id].r["2"].s); // prod. Bestand
                                stoneProd += cities[id].r["2"].d; // Produktion
                                iron += cities[id].r["1"].b; // Bestand
                                iron += cities[id].r["1"].d * (ctick - cities[id].r["1"].s); // prod. Bestand
                                ironProd += cities[id].r["1"].d; // Produktion
                                food += cities[id].r["0"].b; // Bestand
                                food += cities[id].r["0"].d * (ctick - cities[id].r["0"].s); // prod. Bestand
                                foodProd += cities[id].r["0"].d; // Produktion
                                goldProd += cities[id].g; // Gold
                            }
                            
                            wood = Math.floor(wood);
                            stone = Math.floor(stone);
                            iron = Math.floor(iron);
                            food = Math.floor(food);
                            gold = Math.floor($BU.getCurrentGold());

                            var ticksPerHour = $BU.getTicksPerHour();
                            woodProd = Math.floor(woodProd * ticksPerHour);
                            stoneProd = Math.floor(stoneProd * ticksPerHour);
                            ironProd = Math.floor(ironProd * ticksPerHour);
                            foodProd = Math.floor(foodProd * ticksPerHour);
                            goldProd = Math.floor(goldProd * ticksPerHour);

                            this.woodLabel.setValue($BU.formatNumbers(wood, "M", 2) + " (+" + $BU.formatNumbers(woodProd, "k", 0) + "/h)");
                            // FIXME .setToolTipText(...)
                            this.stoneLabel.setValue($BU.formatNumbers(stone, "M", 2) + " (+" + $BU.formatNumbers(stoneProd, "k", 0) + "/h)");
                            this.ironLabel.setValue($BU.formatNumbers(iron, "M", 2) + " (+" + $BU.formatNumbers(ironProd, "k", 0) + "/h)");
                                    // FIXME foodProd +/- prüfen
                            this.foodLabel.setValue($BU.formatNumbers(food, "M", 2) + " (+" + $BU.formatNumbers(foodProd, "k", 0) + "/h)");
                            this.goldLabel.setValue($BU.formatNumbers(gold, "M", 2) + " (+" + $BU.formatNumbers(goldProd, "k", 0) + "/h)");
                        }
                        catch (e) {
                            error("ResourceStats.updateMod: " + e);
                        }
                    },
                }
            });

            // FIXME Umstellung abschließen, add/removeMod()
            qx.Class.define("brm.loua.OverviewWindowAlignment", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "Overviews Dialog Alignment",
                        desc: "Places Overviews dialog on the right side. (Restart required)",
                        items: {},
                    },

                    addMod: function() {
                        // Workaround um orig. Listener auszuhebeln.
                        // Sonst stimmt die Position erst beim zweiten Öffnen und maxHeight wird rückgesetzt.
                        // Event "appear" kommt nach "resize", das center() ist also schon erfolgt, 
                        // der 2. Listener kann auch entfernt werden, vor er wirksam werden kann.
                        // (304806:webfrontend.js:42892ff)
                        $BU.getOverviewWindow().addListenerOnce("appear", function(event) {
                            log("brm.loua.Tweaks._removeOriginalOverviewWindowListener() " + event.getType());

                            $BU.getOverviewWindow().removeListener("resize", 
                                    $BU.__getOverviewWindowResizeListener(), $BU.getOverviewWindow());
                        }, this); // Important: scope reference for callback
                        
                        // Listener für "OverviewWindow wird angezeigt"
                        $BU.getOverviewWindow().addListener("appear", this._resizeOverviewWindow, this); // Important: scope reference for callback
                        
                        // resize Listener hinzufügen, auch für Chat
                        $BU.getRootWindow().addListener("resize", this._resizeOverviewWindowAsync, this); // Important: scope reference for callback
                        $BU.getChat().addListener("resize", this._resizeOverviewWindowAsync, this); // Important: scope reference for callback
                    },
                    
                    _resizeOverviewWindowAsync: function(event) {
                        log("brm.loua.Tweaks._resizeOverviewWindowAsync() " + event.getType());

                        // Aufruf verzögern, damit Änderungen im DOM vorher wirksam werden können.
                        // Sonst werden noch die Werte "vor" der Änderung ausgewertet!
                        var evt = event.clone(); // event Objekt wird wiederverwendet, daher clonen
                        var scope = this; // this ändert sich beim Aufruf, daher in scope sichern
                        window.setTimeout(function() {scope._resizeOverviewWindow(evt);}, 0);
                    },
                    
                    _resizeOverviewWindow: function(event) {
                        log("brm.loua.Tweaks._resizeOverviewWindow() " + event.getType());

                        try {
                            // Koordinaten für OverviewWindow bestimmen:
                            // top = selectorBar.top (city/region/world)
                            var top = $BU.getSelectorBar().getContainerLocation("padding").top; //63
                            // bottom = chat.bottom
                            // FIXME geht nicht, wenn Chat iconified
                            // a.overlayPositions, a.overlaySize
                            var ch = $BU.getChat().getContainerLocation("padding");
                            var height = ch.bottom - top;
                            // left = chat.right (ist aber variabel) 
                            // alternativ: cityInfoWindow.right
                            // TODO alternative testen
                            var left = ch.right; // 1004
                            // right = root.right
                            var width = $BU.getRootWindow().getContainerLocation("padding").right - left;

                            with ($BU.getOverviewWindow()) {
                                setWidth(width);
                                setMaxHeight(height);
                                setHeight(height);
                                moveTo(left, top);
                            }
                        }
                        catch (e) {
                            error("_resizeOverviewWindow: " + e);
                        }
                    }, // end resizeOverview

                }
            });
            
            // FIXME in addMod()
            qx.Class.define("brm.loua.CityOverview", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "City Overview",
                        desc: "Adds a <b>City Overview</B> tab in <b>Overviews</b> dialog. Provides a forecast of the building queue.",
                        items: {
                            showCompletionLabel: {
                                type: "boolean",
                                title: "Show <b>Completed</b> time in <b>Building Queue</b>",
                                desc: "Adds an additional label below <b>Construction Speed</b>, showing the estimated completion time, based on city buildings and minister settings. Only available when in <b>City View</b>!",
                                default: true,
                            }
                        },
                    },
                    widget: null,
                    header: null,
                    constructionTimeLabel: null,

                    addMod: function() {
                        var cfg = brm.loua.ConfigManager.getInstance().getConfig(this);
                        
                        if (cfg.checkEnabled() && ! this.widget) {
                            this.widget = new brm.loua.CityOverviewWidget(_i18n("[brm] City Overview"), "");
                            brm.Utils.getOverviewWindowTabView().add(this.widget);
                        }

                        if (cfg.checkConfigItem("showCompletionLabel") && ! this.constructionTimeLabel) {
                            this.header = $A.getCityInfoView().buildingQueue.header;
                            this.constructionTimeLabel = new qx.ui.basic.Label();
                            this.constructionTimeLabel.setMarginBottom(5);
                            this.constructionTimeLabel.setWidth(336);
                            this.constructionTimeLabel.setTextAlign("center");
                            this.constructionTimeLabel.setToolTipText("Completion time, based on city buildings and minister settings. Missing resources can delay completion.");
                            this.header.addListener("resize", this.onResize, this);
                            this.header.add(this.constructionTimeLabel, {left: 0, top: 48});
                            this.constructionTimeLabel.exclude();
                            this.widget.addListener("changeOverallTime", this.onUpdate, this);
                            // FIXME replace
                            this.widget.updateFoo();
                        }
                    },
                    
                    removeMod: function() {
                        var cfg = brm.loua.ConfigManager.getInstance().getConfig(this);

                        if (! cfg.checkConfigItem("showCompletionLabel") && this.constructionTimeLabel) {
                            var excluded = this.constructionTimeLabel.isExcluded();
                            this.widget.removeListener("changeOverallTime", this.onUpdate, this);
                            this.header.remove(this.constructionTimeLabel);
                            this.constructionTimeLabel.dispose();
                            this.constructionTimeLabel = null;

                            if (excluded) {
                                this.header.removeListener("resize", this.onResize, this);
                                this.header = null;
                            } else {
                                // remove onResize listener and clear this.header on next resize event
                                // (see onResize, triggered by cleared constructionTimeLabel)
                            }
                        }

                        if (! cfg.checkEnabled() && this.widget) {
                            brm.Utils.getOverviewWindowTabView().remove(this.widget);
                            this.widget.dispose();
                            this.widget = null;
                        }
                    },
                    
                    updateMod: function() {
                        if (this.constructionTimeLabel) {
                            var excluded = this.constructionTimeLabel.isExcluded();
                            if (this.widget.getOverallTime() != null) {
                                var done = brm.Utils.getTimeString(this.widget.getOverallTime());
                                var span = brm.Utils.getTimespanString(this.widget.getOverallTime() - $BU.getCurrentTicks());
                                this.constructionTimeLabel.setValue("Completed: " + done + " (" + span + ")");
                                this.constructionTimeLabel.show();
                            } else {
                                this.constructionTimeLabel.exclude();
                            }
                        }
                    },
                    
                    onUpdate: function(e) {
                        this.updateMod();
                    },
                    
                    onResize: function(e) {
                        $BU.fixQueueHeaderBorder(this.header);

                        // delayed remove
                        if (!this.constructionTimeLabel) {
                            this.header.removeListener("resize", this.onResize, this);
                            this.header = null;
                        }
                    }
                }
            });
            
            qx.Class.define("brm.loua.CityOverviewWidget", {
                type: "singleton",
                extend: qx.ui.tabview.Page,
                construct: function(title, icon) {
                    this.base(arguments, title, icon);
                    this.setLayout(new qx.ui.layout.Grow());
                    this.txt = new qx.ui.form.TextArea("Text comes in here ...");
                    this.txt.setReadOnly(true);
                    this.add(this.txt, {left:0, top:0, bottom:0, right:0});
                    
                    this.addListener("appear", this.update, this);
                    // Listener für Aktualisierung der Map
                    brm.Utils.getApp().visMain.addListener("changeMapLoaded", this.update, this);
                    // Listener für Änderungen in der BuildQueue
                    brm.Utils.getCityData().addListener("changeVersion", this.update, this);
                }, // end construct
                destruct: function() {
                    brm.Utils.getCityData().removeListener("changeVersion", this.update, this);
                    brm.Utils.getApp().visMain.removeListener("changeMapLoaded", this.update, this);
                    this.removeListener("appear", this.update, this);
                    this.txt.dispose();
                    this.txt = null;
                },
                properties: {
                    overallTime: { init: null, event: "changeOverallTime" },
                },
                members: {
                    fcq: null,
                    txt: null,
                    // FIXME remove, helper for completed label until page is restructured
                    updateFoo: function() {
                        this.update(new qx.event.type.Event());
                    },
                    update: function(event) {
                        // FIXME event "changeVersion"
                        // ***** hat "buildings[oldLevel][type] is undefined" verursacht
                        /* "([object Array])@http://prodgame02.lordofultima.com/2/index.aspx:3 
                            ([object Object])@http://prodgame02.lordofultima.com/2/index.aspx:3 
                            ([object Object],[object Object],"changeVersion")@http://prodgame02.lordofultima.com/2/305363/script/webfrontend.js:25026
                        */
                        try {
                            log("brm.loua.CityOverviewWidget.update() " + event.getType());
                            // FIXME ist die Page sichtbar?
                            var igd = brm.Utils.getIGD();
                            var name = brm.Utils.getCityData().getName();
                            var buildings = brm.Utils.getApp().visMain.getBuildings(); // Array
                            // FIXME buildings enthält nicht city walls
                            var forecast = this.calculateForecast(this.sortBuildings(buildings));
                            // FIXME welcher View ist aktiv? City/Region/World
                            /*
                            var output = name;
                            output += "\n\nCottages\nLevel\t\tvisId\t\tvis0\t\tx\ty";
                            var levels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            for (var i = 0; i < buildings.length; i++) {
                                var building = buildings[i];
                                if (building.id == 4) { // cottage
                                    var level = building.level;
                                    levels[level]++;
                                    var vis = building.visId;
                                    var vis0 = vis & 0x0ffff;
                                    var posx = vis0 & 0x000ff;
                                    var posy = (vis0 & 0x0ff00) >> 8;
                                    output += "\n" + level + "\t\t" + vis + "\t" + vis0
                                        + "\t\t" + posx + "\t" + posy;
                                }
                            }
                            output += "\n";
                            var remaining = 0;
                            var multi = 0;
                            for (var i = 0; i < levels.length; i++) {
                                if (levels[i] > 0) {
                                    output += "\nLevel " + i + ": " + levels[i];
                                }
                                if (i < 10) {
                                    remaining += igd.buildings[4].r[i+1].t * (levels[i] + multi);
                                    multi += levels[i];
                                }
                            }
                            var speed = brm.Utils.getCityData().getBuildTimePercentMod() + brm.Utils.getConstructionSpeedBonus();
                            remaining = remaining * 100 / speed;
                            output += "\nRemaining build time: " + (remaining / 3600) + "h (@ " + speed + "%)\n";
                            for (var i = 0; i < buildings.length; i++) {
                                if (buildings[i].level < 10 && buildings[i].id != 4) {
                                    output += "\n" + igd.buildings[buildings[i].id & 0x0ff].dn
                                        + " " + buildings[i].level;
                                }
                            }
                            // this.txt.setValue(output);*/
                        }
                        catch (e) {
                            log(e);
                        }
                    },
                    // LoU unsorted buildings array --> buildings[level][id][..]
                    sortBuildings: function(buildings) {
                        var sorted = new Array();
                        for (var i = 0; i < buildings.length; i++) {
                            var building = buildings[i];
                            var id = building.id & 0x0ff; // ignore different views
                            var level = building.level;
                            if (! (level in sorted)) {
                                sorted[level] = new Array();
                            }
                            if (! (id in sorted[level])) {
                                sorted[level][id] = new Array();
                            }
                            sorted[level][id].push(building);
                        }
                        return sorted;
                    },
                    // buildings[level][id][..] + buildingQueue --> forecast[]
                    calculateForecast: function(buildings) {
                        this.fcq = new Array();
                        // zuerst BuildingQueue Gebäude, soweit baubar
                        // FIXME bei Stadtwechsel Aufruf trotz veraltetet bq!!
                        // FIXME div. getter in brm.Utils definieren
                        var bq = brm.Utils.getCityData().getBuildQueue();
                        if (bq) {
                            for (var i = 0; i < bq.length; i++) {
                                var bqi = bq[i];
                                // nur abarbeiten, wenn baubar, sonst ignorieren
                                if (bqi.warnings == 0) {
                                    // log("bqi.l=" + bqi.level + ",bqi.type=" + bqi.type);
                                    // find building object
                                    var oldLevel = bqi.level != 0 ? bqi.level - 1 : bqi.l;
                                    var newLevel = bqi.level;
                                    var type = bqi.type;
                                    // FIXME neue Gebäude auf Level 0??
                                    if (! buildings[oldLevel]) break;
                                    for (var j = 0; j < buildings[oldLevel][type].length; j++) {
                                        if (buildings[oldLevel][type][j].visId == bqi.building) {
                                            // log("found");
                                            var fc = this._createForecastEntry(buildings, oldLevel, newLevel, type, j, bqi);
                                            this.fcq.push(fc);
                                            break; // for j
                                        }
                                    }
                                }
                            }
                        }
                        
                        // FIXME div. getter in brm.Utils definieren
                        var city = brm.Utils.getCityData();
                        var boe = city.getAutoBuildOptionEconomy();
                        var bod = city.getAutoBuildOptionDefense();
                        var bofl = city.getAutoBuildTypeFlags();
                        for (var level = 0; level < 10; level++) {
                            if (! buildings[level]) { continue; }
                            for (var t = 0; t < $C.buildOrder.length; t++) {
                                var type = $C.buildOrder[t];
                                if (! buildings[level][type]) { continue; }
                                
                                // log (type + " " + boe + " " + (!boe) + " " + bofl + " " + (bofl & 1<<1) + " " + (!(bofl & 1<<1)));
                                switch (parseInt(type)) {
                                    case 24: // old towers
                                    case 25: // old towers
                                    case 26: // old towers
                                        // ignore
                                        continue;
                                    default:
                                        var cat = $C.buildingCategory[type];
                                        if (cat === undefined) {
                                            log("oops, type " + type);
                                            continue;
                                        }
                                        if ((cat < 6 ? !boe : !bod) || !(bofl & 1<<cat)) {
                                            // disabled
                                            continue;
                                        }
                                }
                                
                                while (buildings[level][type].length > 0) {
                                    // FIXME baubar? slots
                                    var fc = this._createForecastEntry(buildings, level, level + 1, type, 0);
                                    this.fcq.push(fc);
                                }
                            }
                        }
                        
                        var output = "";
                        for (var i = 0; i < this.fcq.length; i++) {
                            output += "\n" + this.fcq[i].toString();
                        }
                        this.txt.setValue(output);
                        if (this.fcq.length > 0) {
                            this.setOverallTime(this.fcq[this.fcq.length - 1].getEnd());
                        } else {
                            this.setOverallTime(null);
                        }
                    },
                    _createForecastEntry: function(buildings, oldLevel, newLevel, type, j, bqEntry) {
                        var previousEntry = (this.fcq && this.fcq.length > 0) ? this.fcq[this.fcq.length - 1] : null;
                        var city = brm.Utils.getCityData();
                        
                        var now = brm.Utils.getCurrentTicks();
                        var speed = previousEntry ? previousEntry.getSpeed() 
                                    : (city.getBuildTimePercentMod() + brm.Utils.getConstructionSpeedBonus());

                        var fc = new brm.data.Forecast(buildings[oldLevel][type][j], newLevel);
                        // start
                        fc.setStart(bqEntry ? bqEntry.start : (previousEntry ? previousEntry.getEnd() : now));
                        // end
                        var buildtime = newLevel != 0 ? 
                                (brm.Utils.getBuildingBuildTime(type, newLevel) * 100 / speed) : 0; // alter speed
                        fc.setEnd(bqEntry ? bqEntry.end : fc.getStart() + buildtime);
                        // wood
                        var wood = previousEntry ? previousEntry.getWood() : city.getResourceCount(1);
                        // FIXME berücksichtigt keine neu gebauten Resourcegebäude
                        wood += city.getResourceGrowPerHour(1) * (fc.getEnd() - Math.max(now, fc.getStart())) / 3600;
                        if (newLevel != 0) {
                            // FIXME berücksichtigt keine Gebäudeabrisse
                            wood -= bqEntry && bqEntry.isPaid ? 0 : brm.Utils.getBuildingResourceCost(type, newLevel, 1);
                        }
                        fc.setWood(wood);
                        // stone
                        var stone = previousEntry ? previousEntry.getStone() : city.getResourceCount(2);
                        // FIXME berücksichtigt keine neu gebauten Resourcegebäude
                        stone += city.getResourceGrowPerHour(2) * (fc.getEnd() - Math.max(fc.getStart())) / 3600;
                        if (newLevel != 0) {
                            // FIXME berücksichtigt keine Gebäudeabrisse
                            stone -= bqEntry && bqEntry.isPaid ? 0 : brm.Utils.getBuildingResourceCost(type, newLevel, 2);
                        }
                        fc.setStone(stone);
                        // speed
                        if (fc.getBuilding().id == 4) { // cottage
                            speed += brm.Utils.getCottageConstructionSpeedIncrement(newLevel);
                        }
                        fc.setSpeed(speed);
                        
                        // entfernen
                        var b = buildings[oldLevel][type].splice(j,1)[0];
                        // und neu einfügen (außer bei demolish)
                        
                        if (newLevel != 0) {
                            if (! (newLevel in buildings)) {
                                buildings[newLevel] = new Array();
                            }
                            if (! (type in buildings[newLevel])) {
                                buildings[newLevel][type] = new Array();
                            }
                            buildings[newLevel][type].push(b);
                        }
                            
                        return fc;
                    },
                } // end members
            }); // end class "brm.loua.CityOverviewWidget"
            
            qx.Class.define("brm.data.Forecast", {
                extend: qx.core.Object,
                construct: function(building, level) {
                    this.setBuilding(building);
                    this.setLevel(level);
                },
                properties: {
                    building: {},
                    level: { init: 0 },
                    start: { init: 0 },
                    end: { init: 0 },
                    wood: { init: 0 },
                    stone: { init: 0 },
                    speed: { init: 0 },
                },
                members: {
                    toString: function() {
                        var tm = webfrontend.data.ServerTime.getInstance();
                        return brm.Utils.getTimeString(this.getEnd())
                                + ", " + brm.Utils.getIGD().buildings[this.getBuilding().id & 0x0ff].dn 
                                + " " + this.getLevel() 
                                // FIXME Tausendertrennzeichen
                                + ", wood=" + this.getWood().toFixed(0)
                                + ", stone=" + this.getStone().toFixed(0)
                                + ", speed=" + this.getSpeed().toFixed(0);
                    },
                }
            });
            
            // $A.title.statistics.pageDataRef[0] // player data
            // $A.title.statistics.currentSelectedData.listData.__ML // continent
            // $A.title.statistics.currentSelectedData.listData.__di[0].rowDataArr
            // .i // player ID
            // .n // name (extrahieren)
            // .p // points
            // .c // cities
            // .a // alliance name (extrahieren)
            // .j // alliance ID
            
            qx.Class.define("brm.loua.CityBuildingStats", {
                type: "singleton",
                extend: brm.loua.Mod,
                members: {
                    __configDefaults: {
                        title: "City Building Statistics",
                        desc: "under construction. (Restart required)",
                        items: {},
                    },

                    addMod: function() {
                        var container = $$.getUI().getCityInfo().buildingQueue.header;
                        // FIXME Layout patchen, damit die Rahmen wieder stimmen
                        // später anders machen für dynamische Höhe
                        var image = container.getChildren()[0];
                        // Image hat evtl. Alpha-Border! Vorsicht beim erweitern!
                        var imageNew = new qx.ui.basic.Image("webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png");
                        image.setZIndex(-10);
                        imageNew.setZIndex(-5);
                        container.addAfter(imageNew, image, {left: 0, top:40});
                        container.add(new qx.ui.basic.Label("Building stats"), {left: 10, top: 50});
                    },
                    
                    removeMod: function() {
                        // t.b.d.
                    },
                }
            });
            
            qx.Class.define("brm.Utils", {
                type: "static",
                //extend: qx.core.Object, // don't extend, firebug works better 
                statics: {
                    a: null,
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
					getPlayerProgressCostModel: function() { return webfrontend.data.Server.getInstance().getPlayerProgressCostModel(); },
                    // getOverviewButton: function() { return this.a.getTitleWidget().overviewButton; },
                    
                    /* gibt ein Objekt zurück, mit key-value Paaren "Minister-ID" = "Tab Index" */
                    __getMinisterDialogTabSelection: function() { return this.a.ministerInfoWidget.__PF;},     // Object 1=x, 2=x, ...; hinter Array mit localized Strings
                    __researchOverviewDataModel: null,
                    getResearchOverviewDataModel: function() {
                        if (!this.__researchOverviewDataModel) {
                            var page = this.getOverviewWindow();
                            this.__researchOverviewDataModel = this.findObject(this.a.title.research, qx.ui.treevirtual.SimpleTreeDataModel, false);
                        }
                        return this.__researchOverviewDataModel;
                    },
                    __getResearchResourceIcons: function() { return this.a.title.research.__xC; },
                    __updateResearchNode: function(node) { this.a.title.research.__xW(node); }, // vorletzte __function
                    getOverviewWindow: function() { return this.a.getOverviewWindow(); },
					__resourceOverviewWidget: null,
                    getResourceOverviewWidget: function() { 
                        if (!this.__resourceOverviewWidget) {
                            var page = this.getOverviewWindow();
                            this.__resourceOverviewWidget = this.findObject(page, webfrontend.gui.ResourceOverviewWidget, false);
                        }
                        return this.__resourceOverviewWidget;
					},
                    __initResourceOverviewWidget: function() { this.getResourceOverviewWidget().__bbQ(); }, // erste __function, Achtung Sortierung im Firebug falsch!! Kleinbuchstaben kommen vor Großbuchstaben!
                    __getOverviewWindowResizeListener: function() { return this.a.getOverviewWindow().__bnF; }, // Listener aus "addListenerOnce"
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
                    // caution: using findObject with recursive=true is dangerous (infinite loop)
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
                        var iconH = $BU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
                        var iconS = $BU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png");
                        var iconE = $BU.findIcon(header, "webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png");
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
                } // end statics
            }); // end class "brm.Utils"

            qx.Class.define("brm.LAPI.Core", {
                type: "static",
                extend: qx.core.Object,
                statics: {
                    _app: null,
                    _getLouApp: function() { if (this._app == null) this._app = qx.core.Init.getApplication(); return this._app; },
                    // $ui: brm.LAPI.UI,
                    getUI: function() { return $ui; },
                } // end statics
            }); // end class "brm.LAPI.Core"
            
            qx.Class.define("brm.LAPI.UI", {
                type: "static",
                extend: qx.core.Object,
                statics: {
                    $cityInfo: null,
                    getCityInfo: function() { return $cityInfo; },
                } // end statics
            }); // end class "brm.LAPI.UI"
            
            function _i18n(string) {
                if (!(string in _lang)) { alert("Translation missing"); return string; }
                if (!("en" in _lang[string])) { alert("Translation missing"); return string; }
                return _lang[string].en;
            }
            
            var _lang = {
                // Options Tab
                "[brm] Tweak": {en:"[brm] Tweak"},
                // City Overview Tab
                "[brm] City Overview": {en:"[brm] City Overview"},
            };
            
            function checkIfLoaded() {
                debug("main script: checking if game is ready ...");

                var a = brm.Utils.getApp();
                var p = brm.Utils.getPlayerData();
                
                if (    // LoU initialized 
                        a && a.initDone
                        // player data loaded
                        && p.$$user_version
                    ) {
                    info("requirements ok, installing mods");
                    brm.loua.Tweaks.getInstance().start();
                }
                else {
                    window.setTimeout(checkIfLoaded, 100);
                }
            }

            info("running main script ...");

            $A = brm.Utils.getApp();
            $BRM = brm;
            $BU = brm.Utils;
            var $$ = brm.LAPI.Core;
            $C = brm.Const;
            $Q = qx;
            $W = webfrontend;
            
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
                    as_main();
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
    script.innerHTML = "(" + as_start.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

})();