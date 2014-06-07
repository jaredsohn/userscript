// ==UserScript==
// @name        C&C:Tiberium Alliances Maelstrom Tools Deutsch
// @namespace   MaelstromTools
// @description Sammlung von Tools, die das Leben als Commander bei C&C TA vereinfachen
// @version     0.1.1.3
// @author      Maelstrom & HuffyLuf
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
(function () {
    var b = function () {
        try {
            function a() {
                return typeof CCTAWrapper_IsInstalled != "undefined" && CCTAWrapper_IsInstalled
            }
            function c() {
                console.log("MaelstromTools loaded");
                qx.Class.define("MaelstromTools.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        timerInterval: 1500,
                        mainTimerInterval: 5e3,
                        images: null,
                        mWindows: null,
                        mainMenuWindow: null,
                        itemsOnDesktop: null,
                        itemsOnDesktopCount: null,
                        itemsInMainMenu: null,
                        itemsInMainMenuCount: null,
                        buttonCollectAllResources: null,
                        buttonRepairAllUnits: null,
                        buttonRepairAllDefense: null,
                        buttonRepairAllBuildings: null,
                        lootWidget: null,
                        initialize: function () {
                            try {
                                this.itemsOnDesktopCount = [];
                                this.itemsOnDesktop = {};
                                this.itemsInMainMenuCount = [];
                                this.itemsInMainMenu = {};
                                var b = ClientLib.File.FileManager.GetInstance(),
                                    e = ClientLib.Base.Util.GetFactionGuiPatchText();
                                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", b);
                                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", b);
                                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", b);
                                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", b);
                                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", b);
                                this.createNewImage("Sum", "ui/common/icn_build_slots.png", b);
                                this.createNewImage("AccessBase", "ui/" + e + "/icons/icon_mainui_enterbase.png", b);
                                this.createNewImage("FocusBase", "ui/" + e + "/icons/icon_mainui_focusbase.png", b);
                                this.createNewImage("Packages", "ui/" + e + "/icons/icon_collect_packages.png", b);
                                this.createNewImage("RepairAllUnits", "ui/" + e + "/icons/icon_army_points.png", b);
                                this.createNewImage("RepairAllDefense", "ui/" + e + "/icons/icon_def_army_points.png", b);
                                this.createNewImage("RepairAllBuildings", "ui/" + e + "/icons/icn_build_slots.png", b);
                                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", b);
                                this.createNewImage("ProductionMenu", "ui/" + e + "/icons/icn_build_slots.png", b);
                                this.createNewImage("RepairTimeMenu", "ui/" + e + "/icons/icon_repair_all_button.png", b);
                                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", b);
                                this.createNewImage("UpgradeBuilding", "ui/" + e + "/icons/icon_building_detail_upgrade.png", b);
                                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                                this.createNewWindow("SupportWeapon", "L", 120, 60, 340, 140);
                                this.createNewWindow("Preferences", "L", 120, 60, 340, 140);
                                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);
                                if (!this.mainMenuWindow) {
                                    this.mainMenuWindow = (new qx.ui.popup.Popup(new qx.ui.layout.Canvas)).set({
                                        padding: 5,
                                        paddingRight: 0
                                    });
                                    if (c.Settings.useDedicatedMainMenu) {
                                        this.mainMenuWindow.setPlaceMethod("mouse");
                                        this.mainMenuWindow.setPosition("top-left")
                                    } else {
                                        this.mainMenuWindow.setPlaceMethod("widget");
                                        this.mainMenuWindow.setPosition("bottom-right");
                                        this.mainMenuWindow.setAutoHide(false);
                                        this.mainMenuWindow.setBackgroundColor("transparent");
                                        this.mainMenuWindow.setShadow(null);
                                        this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background)
                                    }
                                }
                                var d = 0;
                                this.buttonCollectAllResources = this.createDesktopButton("Alle Pakete einsammeln", "Packages", true, this.desktopPosition(d));
                                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);
                                var h = this.createDesktopButton("Produktion Übersicht", "ProductionMenu", false, this.desktopPosition(d));
                                h.addListener("execute", function () {
                                    window.MaelstromTools.Production.getInstance().openWindow("Production", "Produktion Übersicht")
                                }, this);
                                var g = this.createDesktopButton("Basis Ressourcen", "ResourceOverviewMenu", false, this.desktopPosition(d));
                                g.addListener("execute", function () {
                                    window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", "Basis Produktion Rohstoffe")
                                }, this);
                                d++;
                                var l = this.createDesktopButton("Main Menu", "ProductionMenu", false, this.desktopPosition(d));
                                l.addListener("click", function (a) {
                                    this.mainMenuWindow.placeToMouse(a);
                                    this.mainMenuWindow.show()
                                }, this);
                                this.buttonRepairAllUnits = this.createDesktopButton("Alle Einheiten reparieren", "RepairAllUnits", true, this.desktopPosition(d));
                                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);
                                this.buttonRepairAllDefense = this.createDesktopButton("Repair all defense buildings", "RepairAllDefense", true, this.desktopPosition(d));
                                this.buttonRepairAllDefense.addListener("execute", this.repairAllDefense, this);
                                this.buttonRepairAllBuildings = this.createDesktopButton("Repair all buildings", "RepairAllBuildings", true, this.desktopPosition(d));
                                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);
                                var i = this.createDesktopButton("Truppen Übersicht", "RepairTimeMenu", false, this.desktopPosition(d));
                                i.addListener("execute", function () {
                                    window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", "Truppen Übersicht")
                                }, this);
                                var j = this.createDesktopButton("Artillerie Support Übersicht", "Crosshair", false, this.desktopPosition(d));
                                j.addListener("execute", function () {
                                    window.MaelstromTools.SupportWeapon.getInstance().openWindow("SupportWeapon", "Artillerie Support Übersicht")
                                }, this);
                                if (a()) {
                                    d++;
                                    var k = this.createDesktopButton("Upgrade Übersicht", "UpgradeBuilding", false, this.desktopPosition(d));
                                    k.addListener("execute", function () {
                                        window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", "Aufwertungen Übersicht")
                                    }, this)
                                }
                                d++;
                                var f = (new qx.ui.form.Button("Einstellungen")).set({
                                    appearance: "button-text-small",
                                    width: 100,
                                    minWidth: 100,
                                    maxWidth: 100
                                });
                                f.setUserData("desktopPosition", this.desktopPosition(d));
                                f.addListener("execute", function () {
                                    window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", "MaelstromTools Einstellungen", true)
                                }, this);
                                c.Settings.useDedicatedMainMenu && this.addToDesktop("MainMenu", l);
                                this.addToMainMenu("ResourceOverviewMenu", g);
                                this.addToMainMenu("ProductionMenu", h);
                                this.addToMainMenu("SupportWeaponMenu", j);
                                this.addToMainMenu("RepairTimeMenu", i);
                                a() && this.addToMainMenu("UpgradeBuilding", k);
                                this.addToMainMenu("PreferencesMenu", f);
                                if (!c.Settings.useDedicatedMainMenu) {
                                    this.mainMenuWindow.show();
                                    var m = qx.core.Init.getApplication().getOptionsBar();
                                    this.mainMenuWindow.placeToWidget(m, true)
                                }
                                this.runSecondlyTimer();
                                this.runMainTimer();
                                this.runAutoCollectTimer()
                            } catch (n) {
                                console.log("MaelstromTools.initialize: ", n)
                            }
                        },
                        desktopPosition: function (a) {
                            if (!a) a = 0;
                            return a
                        },
                        createDesktopButton: function (e, d, a, b) {
                            try {
                                if (!a) a = false;
                                if (!b) b = this.desktopPosition();
                                var c = (new qx.ui.form.Button(null, this.images[d])).set({
                                    toolTipText: e,
                                    width: 50,
                                    height: 40,
                                    maxWidth: 50,
                                    maxHeight: 40,
                                    appearance: a ? "button-standard-nod" : "button-playarea-mode-frame",
                                    center: true
                                });
                                c.setUserData("isNotification", a);
                                c.setUserData("desktopPosition", b);
                                return c
                            } catch (f) {
                                console.log("MaelstromTools.createDesktopButton: ", f)
                            }
                        },
                        createNewImage: function (b, c, a) {
                            try {
                                if (!this.images) this.images = {};
                                if (!a) return;
                                this.images[b] = a.GetPhysicalPath(c)
                            } catch (d) {
                                console.log("MaelstromTools.createNewImage: ", d)
                            }
                        },
                        createNewWindow: function (a, c, f, g, e, d, b) {
                            try {
                                if (!this.mWindows) this.mWindows = {};
                                this.mWindows[a] = {};
                                this.mWindows[a].Align = c;
                                this.mWindows[a].AlignV = b;
                                this.mWindows[a].x = f;
                                this.mWindows[a].y = g;
                                this.mWindows[a].w = e;
                                this.mWindows[a].h = d
                            } catch (h) {
                                console.log("MaelstromTools.createNewWindow: ", h)
                            }
                        },
                        addToMainMenu: function (e, b) {
                            try {
                                if (this.itemsInMainMenu[e] != null) return;
                                var a = b.getUserData("desktopPosition"),
                                    d = b.getUserData("isNotification");
                                if (!a) a = this.desktopPosition();
                                if (!d) d = false;
                                if (d && c.Settings.useDedicatedMainMenu) this.addToDesktop(e, b);
                                else {
                                    if (!this.itemsInMainMenuCount[a]) this.itemsInMainMenuCount[a] = 0;
                                    this.mainMenuWindow.add(b, {
                                        right: 5 + 52 * this.itemsInMainMenuCount[a],
                                        top: 0 + 42 * a
                                    });
                                    this.itemsInMainMenu[e] = b;
                                    this.itemsInMainMenuCount[a]++
                                }
                            } catch (f) {
                                console.log("MaelstromTools.addToMainMenu: ", f)
                            }
                        },
                        removeFromMainMenu: function (a, e) {
                            try {
                                if (e == null) e = true;
                                if (this.itemsOnDesktop[a] != null) {
                                    var b = this.itemsOnDesktop[a].getUserData("isNotification");
                                    if (!b) b = false;
                                    b && c.Settings.useDedicatedMainMenu && this.removeFromDesktop(a, e)
                                } else if (this.itemsInMainMenu[a] != null) {
                                    var d = this.itemsInMainMenu[a].getUserData("desktopPosition"),
                                        b = this.itemsInMainMenu[a].getUserData("isNotification");
                                    if (!d) d = this.desktopPosition();
                                    if (!b) b = false;
                                    this.mainMenuWindow.remove(this.itemsInMainMenu[a]);
                                    this.itemsInMainMenu[a] = null;
                                    this.itemsInMainMenuCount[d]--;
                                    if (e && this.itemsInMainMenu[d] > 1) {
                                        var g = {};
                                        for (var f in this.itemsOnDesktop) {
                                            if (this.itemsInMainMenu[f] == null) continue;
                                            if (!b) continue;
                                            g[f] = this.itemsInMainMenu[f];
                                            this.removeFromMainMenu(f, false)
                                        }
                                        for (var h in g) {
                                            var i = g[h];
                                            if (i == null) continue;
                                            this.addToMainMenu(h, i)
                                        }
                                    }
                                }
                            } catch (j) {
                                console.log("MaelstromTools.removeFromDesktop: ", j)
                            }
                        },
                        addToDesktop: function (c, b) {
                            try {
                                if (this.itemsOnDesktop[c] != null) return;
                                var a = b.getUserData("desktopPosition");
                                if (!a) a = this.desktopPosition();
                                if (!this.itemsOnDesktopCount[a]) this.itemsOnDesktopCount[a] = 0;
                                var d = qx.core.Init.getApplication();
                                d.getDesktop().add(b, {
                                    right: 5 + 52 * this.itemsOnDesktopCount[a],
                                    bottom: 140 - 42 * (a - 1)
                                });
                                this.itemsOnDesktop[c] = b;
                                this.itemsOnDesktopCount[a]++
                            } catch (e) {
                                console.log("MaelstromTools.addToDesktop: ", e)
                            }
                        },
                        removeFromDesktop: function (b, d) {
                            try {
                                if (d == null) d = true;
                                var i = qx.core.Init.getApplication();
                                if (this.itemsOnDesktop[b] != null) {
                                    var c = this.itemsOnDesktop[b].getUserData("desktopPosition"),
                                        f = this.itemsOnDesktop[b].getUserData("isNotification");
                                    if (!c) c = this.desktopPosition();
                                    if (!f) f = false;
                                    i.getDesktop().remove(this.itemsOnDesktop[b]);
                                    this.itemsOnDesktop[b] = null;
                                    this.itemsOnDesktopCount[c]--;
                                    if (d && this.itemsOnDesktopCount[c] > 1) {
                                        var e = {};
                                        for (var a in this.itemsOnDesktop) {
                                            if (this.itemsOnDesktop[a] == null) continue;
                                            if (!this.itemsOnDesktop[a].getUserData("isNotification")) continue;
                                            e[a] = this.itemsOnDesktop[a];
                                            this.removeFromDesktop(a, false)
                                        }
                                        for (var g in e) {
                                            var h = e[g];
                                            if (h == null) continue;
                                            this.addToMainMenu(g, h)
                                        }
                                    }
                                }
                            } catch (j) {
                                console.log("MaelstromTools.removeFromDesktop: ", j)
                            }
                        },
                        runSecondlyTimer: function () {
                            try {
                                this.calculateCostsForNextMCV();
                                var a = this;
                                window.setTimeout(function () {
                                    a.runSecondlyTimer()
                                }, 1e3)
                            } catch (b) {
                                console.log("MaelstromTools.runSecondlyTimer: ", b)
                            }
                        },
                        runMainTimer: function () {
                            try {
                                this.checkForPackages();
                                if (a()) {
                                    this.checkRepairAllUnits();
                                    this.checkRepairAllDefense();
                                    this.checkRepairAllBuildings()
                                }
                                if (c.Settings.autoHideMissionTracker) {
                                    var b = qx.core.Init.getApplication().getMissionTracker();
                                    b.isVisible() && b.hide()
                                }
                                var d = this;
                                window.setTimeout(function () {
                                    d.runMainTimer()
                                }, this.mainTimerInterval)
                            } catch (e) {
                                console.log("MaelstromTools.runMainTimer: ", e)
                            }
                        },
                        runAutoCollectTimer: function () {
                            try {
                                if (a()) {
                                    this.checkForPackages() && c.Settings.autoCollectPackages && this.collectAllPackages();
                                    this.checkRepairAllUnits() && c.Settings.autoRepairUnits && this.repairAllUnits();
                                    if (this.checkRepairAllDefense() && c.Settings.autoRepairDefense) this.repairAllDefense();
                                    else this.checkRepairAllBuildings() && c.Settings.autoRepairBuildings && this.repairAllBuildings()
                                }
                                var b = this;
                                window.setTimeout(function () {
                                    b.runAutoCollectTimer()
                                }, c.Settings.AutoCollectTimer * 6e4)
                            } catch (d) {
                                console.log("MaelstromTools.runMainTimer: ", d)
                            }
                        },
                        openWindow: function (a, b, c) {
                            try {
                                if (!a.isVisible()) if (b == "MainMenu") a.show();
                                else {
                                    !c && this.moveWindow(a, b);
                                    a.open()
                                }
                            } catch (d) {
                                console.log("MaelstromTools.openWindow: ", d)
                            }
                        },
                        moveWindow: function (b, a) {
                            try {
                                var c = this.mWindows[a].x,
                                    d = this.mWindows[a].y;
                                if (this.mWindows[a].Align == "R") c = qx.bom.Viewport.getWidth(window) - this.mWindows[a].x;
                                if (this.mWindows[a].AlignV == "B") d = qx.bom.Viewport.getHeight(window) - this.mWindows[a].y - b.height;
                                b.moveTo(c, d);
                                if (a != "MainMenu") {
                                    b.setHeight(this.mWindows[a].h);
                                    b.setWidth(this.mWindows[a].w)
                                }
                            } catch (e) {
                                console.log("MaelstromTools.moveWindow: ", e)
                            }
                        },
                        checkForPackages: function () {
                            try {
                                b.updateCityCache();
                                if (b.CityCount <= 1) return false;
                                for (var a in b.Cities) {
                                    var c = b.Cities[a].Object;
                                    if (c.get_CityBuildingsData().get_HasCollectableBuildings()) {
                                        this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                                        return true
                                    }
                                }
                                this.removeFromMainMenu("CollectAllResources");
                                return false
                            } catch (d) {
                                console.log("MaelstromTools.checkForPackages: ", d);
                                return false
                            }
                        },
                        collectAllPackages: function () {
                            try {
                                b.updateCityCache();
                                if (b.CityCount <= 1) return;
                                for (var c in b.Cities) {
                                    var a = b.Cities[c].Object;
                                    a.get_CityBuildingsData().get_HasCollectableBuildings() && a.CollectAllResources()
                                }
                                this.removeFromMainMenu("CollectAllResources")
                            } catch (d) {
                                console.log("MaelstromTools.collectAllPackages: ", d)
                            }
                        },
                        checkRepairAll: function (c, a, d) {
                            try {
                                b.updateCityCache();
                                for (var e in b.Cities) {
                                    var f = b.Cities[e].Object;
                                    if (MaelstromTools.Wrapper.CanRepairAll(f, c)) {
                                        this.addToMainMenu(a, d);
                                        return true
                                    }
                                }
                                this.removeFromMainMenu(a);
                                return false
                            } catch (g) {
                                console.log("MaelstromTools.checkRepairAll: ", g);
                                return false
                            }
                        },
                        checkRepairAllUnits: function () {
                            return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits)
                        },
                        checkRepairAllDefense: function () {
                            return this.checkRepairAll(ClientLib.Vis.Mode.DefenseSetup, "RepairAllDefense", this.buttonRepairAllDefense)
                        },
                        checkRepairAllBuildings: function () {
                            return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings)
                        },
                        repairAll: function (a, d) {
                            try {
                                b.updateCityCache();
                                for (var e in b.Cities) {
                                    var c = b.Cities[e].Object;
                                    MaelstromTools.Wrapper.CanRepairAll(c, a) && MaelstromTools.Wrapper.RepairAll(c, a)
                                }
                                this.removeFromMainMenu(d)
                            } catch (f) {
                                console.log("MaelstromTools.repairAll: ", f)
                            }
                        },
                        repairAllUnits: function () {
                            try {
                                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits")
                            } catch (a) {
                                console.log("MaelstromTools.repairAllUnits: ", a)
                            }
                        },
                        repairAllDefense: function () {
                            try {
                                this.repairAll(ClientLib.Vis.Mode.DefenseSetup, "RepairAllDefense")
                            } catch (a) {
                                console.log("MaelstromTools.repairAllDefense: ", a)
                            }
                        },
                        repairAllBuildings: function () {
                            try {
                                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings")
                            } catch (a) {
                                console.log("MaelstromTools.repairAllBuildings: ", a)
                            }
                        },
                        updateLoot: function (f, i, j) {
                            try {
                                if (!c.Settings.showLoot) {
                                    this.lootWidget[f] && this.lootWidget[f].removeAll();
                                    return
                                }
                                var g = b.updateLoot(i);
                                if (g == -2) return;
                                if (!this.lootWidget) this.lootWidget = {};
                                if (!this.lootWidget[f]) {
                                    this.lootWidget[f] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                                    this.lootWidget[f].setTextColor("white");
                                    j.add(this.lootWidget[f])
                                }
                                var a = this.lootWidget[f],
                                    e = 1,
                                    h = 1;
                                a.removeAll();
                                switch (g) {
                                case -1:
                                    MaelstromTools.Util.addLabel(a, e, h++, "Target out of range, no resource calculation possible", null, null, "bold", null);
                                    break;
                                case 1:
                                    var d = b.SelectedBaseResources;
                                    this.createResourceLabels(a, ++e, "Möglich Angriffe von dieser Base (verfügbare CP):", d, - 1);
                                    this.createResourceLabels(a, ++e, "Plünderbare Ressourcen:", d, 1);
                                    this.createResourceLabels(a, ++e, "pro CP:", d, 1 * d.CPNeeded);
                                    this.createResourceLabels(a, ++e, "2. Welle:", d, 2 * d.CPNeeded);
                                    this.createResourceLabels(a, ++e, "3. Welle:", d, 3 * d.CPNeeded);
                                    break;
                                default:
                                    MaelstromTools.Util.addLabel(a, e, h++, "Berechne Ressourcen...", null, null, "bold", null)
                                }
                            } catch (k) {
                                console.log("MaelstromTools.updateLoot: ", k)
                            }
                        },
                        createResourceLabels: function (b, c, g, e, d) {
                            var a = 1,
                                f = d > 1 ? null : "bold";
                            if (d == -1 && e.CPNeeded > 0) {
                                g = g + " " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / e.CPNeeded);
                                MaelstromTools.Util.addLabel(b, c, a++, g, null, "left", f, null, 9);
                                return
                            }
                            a = 1;
                            if (d > 0) {
                                MaelstromTools.Util.addLabel(b, c, a++, g, null, null, f);
                                MaelstromTools.Util.addImage(b, c, a++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                                MaelstromTools.Util.addLabel(b, c, a++, MaelstromTools.Wrapper.FormatNumbersCompact(e[MaelstromTools.Statics.Research] / d), 50, "right", f);
                                MaelstromTools.Util.addImage(b, c, a++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                                MaelstromTools.Util.addLabel(b, c, a++, MaelstromTools.Wrapper.FormatNumbersCompact(e[MaelstromTools.Statics.Tiberium] / d), 50, "right", f);
                                MaelstromTools.Util.addImage(b, c, a++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                                MaelstromTools.Util.addLabel(b, c, a++, MaelstromTools.Wrapper.FormatNumbersCompact(e[MaelstromTools.Statics.Crystal] / d), 50, "right", f);
                                MaelstromTools.Util.addImage(b, c, a++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                                MaelstromTools.Util.addLabel(b, c, a++, MaelstromTools.Wrapper.FormatNumbersCompact(e[MaelstromTools.Statics.Dollar] / d), 50, "right", f);
                                MaelstromTools.Util.addImage(b, c, a++, MaelstromTools.Util.getImage("Sum"));
                                MaelstromTools.Util.addLabel(b, c, a++, MaelstromTools.Wrapper.FormatNumbersCompact(e.Total / d), 50, "right", f)
                            }
                        },
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        calculateCostsForNextMCV: function () {
                            try {
                                if (!c.Settings.showCostsForNextMCV) {
                                    this.mcvPopup && this.mcvPopup.hide();
                                    return
                                }
                                var b = ClientLib.Data.MainData.GetInstance().get_Player(),
                                    o = b.get_Faction(),
                                    m = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, o),
                                    n = b.get_PlayerResearch(),
                                    j = n.GetResearchItemFomMdbId(m);
                                if (j == null) {
                                    this.mcvPopup && this.mcvPopup.hide();
                                    return
                                }
                                if (!this.mcvPopup) {
                                    this.mcvPopup = (new qx.ui.popup.Popup(new qx.ui.layout.VBox)).set({
                                        padding: 5
                                    });
                                    this.mcvPopup.setPlaceMethod("widget");
                                    this.mcvPopup.setPosition("left-bottom");
                                    this.mcvPopup.setAutoHide(false);
                                    this.mcvPopup.setBackgroundColor("black");
                                    this.mcvPopup.setShadow(null);
                                    this.mcvPopup.setDecorator(new qx.ui.decoration.Background);
                                    var k = qx.core.Init.getApplication().getServerBar();
                                    this.mcvPopup.placeToWidget(k, true);
                                    this.mcvInfoLabel = new qx.ui.basic.Label;
                                    var l = qx.bom.Font.fromString("bold").set({
                                        size: 20
                                    });
                                    this.mcvTimerLabel = (new qx.ui.basic.Label).set({
                                        font: l,
                                        textColor: "red",
                                        width: 140,
                                        textAlign: "center"
                                    });
                                    this.mcvPopup.add(this.mcvInfoLabel);
                                    this.mcvPopup.add(this.mcvTimerLabel)
                                }
                                var a = j.get_NextLevelInfo_Obj(),
                                    h = [];
                                for (var d in a.rr) if (a.rr[d].t > 0) h[a.rr[d].t] = a.rr[d].c;
                                var i = h[ClientLib.Base.EResourceType.Gold],
                                    g = b.get_Credits(),
                                    f = (g.Delta + g.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour(),
                                    e = (i - b.GetCreditsCount()) / f;
                                if (f == 0 || e <= 0) {
                                    this.mcvPopup && this.mcvPopup.hide();
                                    return
                                }
                                this.mcvInfoLabel.setValue("Nächste Basis ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(i) + ")");
                                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(e * 60 * 60));
                                !this.mcvPopup.isVisible() && this.mcvPopup.show()
                            } catch (p) {
                                console.log(p)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Preferences", {
                    type: "singleton",
                    extend: qx.core.Object,
                    statics: {
                        USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
                        AUTOCOLLECTPACKAGES: "autoCollectPackages",
                        AUTOREPAIRUNITS: "autoRepairUnits",
                        AUTOREPAIRDEFENSE: "autoRepairDefense",
                        AUTOREPAIRBUILDINGS: "autoRepairBuildings",
                        AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
                        AUTOCOLLECTTIMER: "AutoCollectTimer",
                        SHOWLOOT: "showLoot",
                        SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV"
                    },
                    members: {
                        Window: null,
                        Widget: null,
                        Settings: null,
                        FormElements: null,
                        readOptions: function () {
                            try {
                                if (!this.Settings) this.Settings = {};
                                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOREPAIRDEFENSE] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRDEFENSE, 0) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1;
                                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1;
                                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1;
                                if (!a()) {
                                    this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                                    this.Settings[MaelstromTools.Preferences.AUTOREPAIRDEFENSE] = false;
                                    this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                                    this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false
                                }
                            } catch (b) {
                                console.log("MaelstromTools.Preferences.readOptions: ", b)
                            }
                        },
                        openWindow: function (b, a) {
                            try {
                                if (!this.Window) {
                                    this.Window = (new webfrontend.gui.OverlayWindow).set({
                                        autoHide: false,
                                        title: a,
                                        minHeight: 330
                                    });
                                    this.Window.clientArea.setPadding(10);
                                    this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));
                                    this.Widget = new qx.ui.container.Composite((new qx.ui.layout.Grid).set({
                                        spacingX: 5,
                                        spacingY: 5
                                    }));
                                    this.Window.clientArea.add(this.Widget)
                                }
                                if (this.Window.isVisible()) this.Window.close();
                                else {
                                    d.openWindow(this.Window, b);
                                    this.setWidgetLabels()
                                }
                            } catch (c) {
                                console.log("MaelstromTools.Preferences.openWindow: ", c)
                            }
                        },
                        addFormElement: function (b, a) {
                            this.FormElements[b] = a
                        },
                        setWidgetLabels: function () {
                            try {
                                this.readOptions();
                                this.FormElements = {};
                                this.Widget.removeAll();
                                var c = 1,
                                    b = 1,
                                    e = (new qx.ui.form.CheckBox("Missionen Popup ausblenden")).set({
                                        value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                                    }),
                                    f = (new qx.ui.form.CheckBox("Eigenes Hauptmenü benutzen (Neustart erforderlich)")).set({
                                        value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                                    }),
                                    n = (new qx.ui.form.CheckBox("Zeige plünderbare Ressourcen (Neustart erforderlich)")).set({
                                        value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1,
                                        enabled: a()
                                    }),
                                    k = (new qx.ui.form.CheckBox("Zeit für nächste Basis anzeigen")).set({
                                        value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                                    });
                                MaelstromTools.Util.addElement(this.Widget, c++, b, e, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, f, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, n, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, k, 2);
                                var g = (new qx.ui.form.CheckBox("Automatisch alle Pakete einsammeln")).set({
                                    value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                                }),
                                    j = (new qx.ui.form.CheckBox("Automatische Reparatur Einheiten")).set({
                                        value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                                        enabled: a()
                                    }),
                                    i = (new qx.ui.form.CheckBox("Automatische Reparatur Verteidigung (Höhere Priorität als Gebäude)")).set({
                                        value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRDEFENSE] == 1,
                                        enabled: a()
                                    }),
                                    h = (new qx.ui.form.CheckBox("Automatische Reparatur Gebäude")).set({
                                        value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                                        enabled: a()
                                    }),
                                    d = (new qx.ui.form.Spinner).set({
                                        minimum: 5,
                                        maximum: 60 * 6,
                                        value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                                    });
                                MaelstromTools.Util.addLabel(this.Widget, c, b, "Automatik Intervall in Minuten (" + d.getMinimum() + " - " + d.getMaximum() + ")");
                                MaelstromTools.Util.addElement(this.Widget, c++, b + 1, d);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, g, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, j, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, i, 2);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, h, 2);
                                var m = (new qx.ui.form.Button("Speichern")).set({
                                    appearance: "button-detailview-small",
                                    width: 120,
                                    minWidth: 120,
                                    maxWidth: 120
                                });
                                m.addListener("execute", this.applyChanges, this);
                                var l = (new qx.ui.form.Button("Änderungen verwerfen")).set({
                                    appearance: "button-detailview-small",
                                    width: 120,
                                    minWidth: 120,
                                    maxWidth: 120
                                });
                                l.addListener("execute", function () {
                                    this.Window.close()
                                }, this);
                                var o = (new qx.ui.form.Button("Standardeinstellung")).set({
                                    appearance: "button-detailview-small",
                                    width: 120,
                                    minWidth: 120,
                                    maxWidth: 120
                                });
                                o.addListener("execute", this.resetToDefault, this);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, o);
                                b = 1;
                                MaelstromTools.Util.addElement(this.Widget, c, b++, l);
                                MaelstromTools.Util.addElement(this.Widget, c++, b, m);
                                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, e);
                                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, f);
                                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, n);
                                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, k);
                                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, g);
                                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, j);
                                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRDEFENSE, i);
                                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, h);
                                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, d)
                            } catch (p) {
                                console.log("MaelstromTools.Preferences.setWidgetLabels: ", p)
                            }
                        },
                        applyChanges: function () {
                            try {
                                var b = false;
                                for (var a in this.FormElements) {
                                    var c = this.FormElements[a];
                                    if (a == MaelstromTools.Preferences.AUTOCOLLECTTIMER) b = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != c.getValue();
                                    MaelstromTools.LocalStorage.set(a, c.getValue())
                                }
                                this.readOptions();
                                b && d.runAutoCollectTimer();
                                this.Window.close()
                            } catch (e) {
                                console.log("MaelstromTools.Preferences.applyChanges: ", e)
                            }
                        },
                        resetToDefault: function () {
                            try {
                                MaelstromTools.LocalStorage.clearAll();
                                this.setWidgetLabels()
                            } catch (a) {
                                console.log("MaelstromTools.Preferences.resetToDefault: ", a)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.DefaultObject", {
                    type: "abstract",
                    extend: qx.core.Object,
                    members: {
                        Window: null,
                        Widget: null,
                        Cache: null,
                        IsTimerEnabled: true,
                        calc: function () {
                            try {
                                if (this.Window.isVisible()) {
                                    this.updateCache();
                                    this.setWidgetLabels();
                                    if (this.IsTimerEnabled) {
                                        var a = this;
                                        window.setTimeout(function () {
                                            a.calc()
                                        }, d.timerInterval)
                                    }
                                }
                            } catch (b) {
                                console.log("MaelstromTools.DefaultObject.calc: ", b)
                            }
                        },
                        openWindow: function (b, a) {
                            try {
                                if (!this.Window) {
                                    this.Window = (new qx.ui.window.Window(a)).set({
                                        resizable: false,
                                        showMaximize: false,
                                        showMinimize: false,
                                        allowMaximize: false,
                                        allowMinimize: false,
                                        showStatusbar: false
                                    });
                                    this.Window.setPadding(10);
                                    this.Window.setLayout(new qx.ui.layout.VBox(3));
                                    this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid);
                                    this.Widget.setTextColor("white");
                                    this.Window.add(this.Widget)
                                }
                                if (this.Window.isVisible()) this.Window.close();
                                else {
                                    d.openWindow(this.Window, b);
                                    this.calc()
                                }
                            } catch (c) {
                                console.log("MaelstromTools.DefaultObject.openWindow: ", c)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Production", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        updateCache: function (d) {
                            try {
                                b.updateCityCache();
                                var e = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                this.Cache = Object();
                                for (var a in b.Cities) {
                                    if (d != null && d != a) continue;
                                    var c = b.Cities[a].Object;
                                    this.Cache[a] = Object();
                                    this.Cache[a].ProductionStopped = c.get_IsGhostMode();
                                    this.Cache[a].PackagesStopped = c.get_hasCooldown() || c.get_IsGhostMode();
                                    this.Cache[a][MaelstromTools.Statics.Tiberium] = Object();
                                    this.Cache[a][MaelstromTools.Statics.Tiberium].Delta = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
                                    this.Cache[a][MaelstromTools.Statics.Tiberium].ExtraBonusDelta = c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                    this.Cache[a][MaelstromTools.Statics.Tiberium].POI = e.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                                    this.Cache[a][MaelstromTools.Statics.Crystal] = Object();
                                    this.Cache[a][MaelstromTools.Statics.Crystal].Delta = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
                                    this.Cache[a][MaelstromTools.Statics.Crystal].ExtraBonusDelta = c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                    this.Cache[a][MaelstromTools.Statics.Crystal].POI = e.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                                    this.Cache[a][MaelstromTools.Statics.Power] = Object();
                                    this.Cache[a][MaelstromTools.Statics.Power].Delta = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    this.Cache[a][MaelstromTools.Statics.Power].ExtraBonusDelta = c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    this.Cache[a][MaelstromTools.Statics.Power].POI = e.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    this.Cache[a][MaelstromTools.Statics.Dollar] = Object();
                                    this.Cache[a][MaelstromTools.Statics.Dollar].Delta = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false);
                                    this.Cache[a][MaelstromTools.Statics.Dollar].ExtraBonusDelta = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
                                    this.Cache[a][MaelstromTools.Statics.Dollar].POI = 0;
                                    if (d != null && d == a) return this.Cache[a]
                                }
                            } catch (f) {
                                console.log("MaelstromTools.Production.updateCache: ", f)
                            }
                        },
                        createProductionLabels2: function (a, d, f, b) {
                            try {
                                if (f == "-Total-") {
                                    var c = Object();
                                    c.Delta = 0;
                                    c.ExtraBonusDelta = 0;
                                    c.POI = 0;
                                    c.Total = 0;
                                    for (var g in this.Cache) {
                                        c.Delta += this.Cache[g][b].Delta;
                                        c.ExtraBonusDelta += this.Cache[g][b].ExtraBonusDelta;
                                        c.POI += this.Cache[g][b].POI
                                    }
                                    c.Total = c.Delta + c.ExtraBonusDelta + c.POI;
                                    a++;
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(c.Delta), 100, "right", "bold");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(c.ExtraBonusDelta), 100, "right", "bold");
                                    b != MaelstromTools.Statics.Dollar && MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(c.POI), 100, "right", "bold");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(c.Total), 100, "right", "bold")
                                } else if (f == "-Labels-") {
                                    MaelstromTools.Util.addImage(this.Widget, a++, d, MaelstromTools.Util.getImage(b));
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, "Dauerhafte Produktion", 120, "left");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, "Paket Produktion", 120, "left");
                                    b != MaelstromTools.Statics.Dollar && MaelstromTools.Util.addLabel(this.Widget, a++, d, "Allianz Bonus", 120, "left");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, "Total / h", 120, "left")
                                } else {
                                    var e = this.Cache[f];
                                    if (a > 2) a++;
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(e[b].Delta), 100, "right", null, e.ProductionStopped || e[b].Delta == 0 ? "red" : "white");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(e[b].ExtraBonusDelta), 100, "right", null, e.PackagesStopped || e[b].ExtraBonusDelta == 0 ? "red" : "white");
                                    b != MaelstromTools.Statics.Dollar && MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(e[b].POI), 100, "right", null, e[b].POI == 0 ? "red" : "white");
                                    MaelstromTools.Util.addLabel(this.Widget, a++, d, MaelstromTools.Wrapper.FormatNumbersCompact(e[b].Delta + e[b].ExtraBonusDelta + e[b].POI), 100, "right", "bold")
                                }
                                return a
                            } catch (h) {
                                console.log("MaelstromTools.Production.createProductionLabels2: ", h)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                this.Widget.removeAll();
                                var a = 1,
                                    b = 1;
                                a = this.createProductionLabels2(a, b, "-Labels-", MaelstromTools.Statics.Tiberium);
                                a = this.createProductionLabels2(a, b, "-Labels-", MaelstromTools.Statics.Crystal);
                                a = this.createProductionLabels2(a, b, "-Labels-", MaelstromTools.Statics.Power);
                                a = this.createProductionLabels2(a, b, "-Labels-", MaelstromTools.Statics.Dollar);
                                b++;
                                for (var c in this.Cache) {
                                    a = 1;
                                    MaelstromTools.Util.addLabel(this.Widget, a++, b, c, 100, "right");
                                    a = this.createProductionLabels2(a, b, c, MaelstromTools.Statics.Tiberium);
                                    a = this.createProductionLabels2(a, b, c, MaelstromTools.Statics.Crystal);
                                    a = this.createProductionLabels2(a, b, c, MaelstromTools.Statics.Power);
                                    a = this.createProductionLabels2(a, b, c, MaelstromTools.Statics.Dollar);
                                    MaelstromTools.Util.addElement(this.Widget, a, b++, MaelstromTools.Util.getAccessBaseButton(c))
                                }
                                a = 1;
                                MaelstromTools.Util.addLabel(this.Widget, a, b, "Total / h", 100, "right", "bold");
                                a = this.createProductionLabels2(a, b, "-Total-", MaelstromTools.Statics.Tiberium);
                                a = this.createProductionLabels2(a, b, "-Total-", MaelstromTools.Statics.Crystal);
                                a = this.createProductionLabels2(a, b, "-Total-", MaelstromTools.Statics.Power);
                                a = this.createProductionLabels2(a, b, "-Total-", MaelstromTools.Statics.Dollar)
                            } catch (d) {
                                console.log("MaelstromTools.Production.setWidgetLabels: ", d)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.RepairTime", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        Window: null,
                        Widget: null,
                        Cache: null,
                        updateCache: function () {
                            try {
                                b.updateCityCache();
                                this.Cache = Object();
                                for (var a in b.Cities) {
                                    var c = b.Cities[a].Object,
                                        e = "";
                                    this.Cache[a] = Object();
                                    this.Cache[a].RepairTime = Object();
                                    this.Cache[a].Repaircharge = Object();
                                    this.Cache[a].Repaircharge.Smallest = 999999999;
                                    this.Cache[a].RepairTime.Largest = 0;
                                    this.Cache[a].RepairTime[MaelstromTools.Statics.Infantry] = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                    this.Cache[a].RepairTime[MaelstromTools.Statics.Vehicle] = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                    this.Cache[a].RepairTime[MaelstromTools.Statics.Aircraft] = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                    this.Cache[a].RepairTime.Maximum = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                                    this.Cache[a].Repaircharge[MaelstromTools.Statics.Infantry] = c.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                                    this.Cache[a].Repaircharge[MaelstromTools.Statics.Vehicle] = c.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                                    this.Cache[a].Repaircharge[MaelstromTools.Statics.Aircraft] = c.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                                    if (this.Cache[a].Repaircharge[MaelstromTools.Statics.Infantry] < this.Cache[a].Repaircharge.Smallest) this.Cache[a].Repaircharge.Smallest = this.Cache[a].Repaircharge[MaelstromTools.Statics.Infantry];
                                    if (this.Cache[a].Repaircharge[MaelstromTools.Statics.Vehicle] < this.Cache[a].Repaircharge.Smallest) this.Cache[a].Repaircharge.Smallest = this.Cache[a].Repaircharge[MaelstromTools.Statics.Vehicle];
                                    if (this.Cache[a].Repaircharge[MaelstromTools.Statics.Aircraft] < this.Cache[a].Repaircharge.Smallest) this.Cache[a].Repaircharge.Smallest = this.Cache[a].Repaircharge[MaelstromTools.Statics.Aircraft];
                                    if (this.Cache[a].RepairTime[MaelstromTools.Statics.Infantry] > this.Cache[a].RepairTime.Largest) {
                                        this.Cache[a].RepairTime.Largest = this.Cache[a].RepairTime[MaelstromTools.Statics.Infantry];
                                        e = "Infantry"
                                    }
                                    if (this.Cache[a].RepairTime[MaelstromTools.Statics.Vehicle] > this.Cache[a].RepairTime.Largest) {
                                        this.Cache[a].RepairTime.Largest = this.Cache[a].RepairTime[MaelstromTools.Statics.Vehicle];
                                        e = "Vehicle"
                                    }
                                    if (this.Cache[a].RepairTime[MaelstromTools.Statics.Aircraft] > this.Cache[a].RepairTime.Largest) {
                                        this.Cache[a].RepairTime.Largest = this.Cache[a].RepairTime[MaelstromTools.Statics.Aircraft];
                                        e = "Aircraft"
                                    }
                                    this.Cache[a].RepairTime.LargestDiv = this.Cache[a].RepairTime[e];
                                    this.Cache[a].RepairTime.PossibleAttacks = Math.floor(this.Cache[a].Repaircharge.Smallest / this.Cache[a].RepairTime.LargestDiv);
                                    this.Cache[a].RepairTime.MaxAttacks = Math.floor(this.Cache[a].RepairTime.Maximum / this.Cache[a].RepairTime.LargestDiv);
                                    var d = c.get_CityUnitsData();
                                    this.Cache[a].Base = Object();
                                    this.Cache[a].Base.Level = (Math.floor(c.get_LvlBase() * 100) / 100).toFixed(2);
                                    this.Cache[a].Base.UnitLimit = c.GetBuildingSlotLimit();
                                    this.Cache[a].Base.TotalHeadCount = c.GetBuildingSlotCount();
                                    this.Cache[a].Base.FreeHeadCount = this.Cache[a].Base.UnitLimit - this.Cache[a].Base.TotalHeadCount;
                                    this.Cache[a].Base.HealthInPercent = c.GetBuildingsConditionInPercent();
                                    this.Cache[a].Offense = Object();
                                    this.Cache[a].Offense.Level = (Math.floor(c.get_LvlOffense() * 100) / 100).toFixed(2);
                                    this.Cache[a].Offense.UnitLimit = d.get_UnitLimitOffense();
                                    this.Cache[a].Offense.TotalHeadCount = d.get_TotalOffenseHeadCount();
                                    this.Cache[a].Offense.FreeHeadCount = d.get_FreeOffenseHeadCount();
                                    this.Cache[a].Offense.HealthInPercent = c.GetOffenseConditionInPercent();
                                    this.Cache[a].Defense = Object();
                                    this.Cache[a].Defense.Level = (Math.floor(c.get_LvlDefense() * 100) / 100).toFixed(2);
                                    this.Cache[a].Defense.UnitLimit = d.get_UnitLimitDefense();
                                    this.Cache[a].Defense.TotalHeadCount = d.get_TotalDefenseHeadCount();
                                    this.Cache[a].Defense.FreeHeadCount = d.get_FreeDefenseHeadCount();
                                    this.Cache[a].Defense.HealthInPercent = c.GetDefenseConditionInPercent()
                                }
                            } catch (f) {
                                console.log("MaelstromTools.RepairTime.updateCache: ", f)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                this.Widget.removeAll();
                                var a = 1;
                                a = this.createOverviewLabels(a);
                                a = this.createRepairchargeLabels(a)
                            } catch (b) {
                                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", b)
                            }
                        },
                        createRepairchargeLabels: function (b) {
                            try {
                                var a = 2;
                                MaelstromTools.Util.addLabel(this.Widget, b++, a++, "Reparaturzeit", null, "left", null, null, 3);
                                a = 2;
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Infanterie", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Fahrzeuge", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Flugzeuge", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Reparaturzeit", 80, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Angriffe", 60, "right");
                                b++;
                                for (var d in this.Cache) {
                                    var c = this.Cache[d];
                                    if (c.Offense.UnitLimit == 0) continue;
                                    a = 1;
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, d, 80, "left");
                                    if (c.Offense.UnitLimit > 0) {
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, MaelstromTools.Wrapper.FormatTimespan(c.RepairTime.Infantry), 60, "right", null, c.RepairTime.Infantry == c.RepairTime.LargestDiv ? "yellow" : "white");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, MaelstromTools.Wrapper.FormatTimespan(c.RepairTime.Vehicle), 60, "right", null, c.RepairTime.Vehicle == c.RepairTime.LargestDiv ? "yellow" : "white");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, MaelstromTools.Wrapper.FormatTimespan(c.RepairTime.Aircraft), 60, "right", null, c.RepairTime.Aircraft == c.RepairTime.LargestDiv ? "yellow" : "white");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, MaelstromTools.Wrapper.FormatTimespan(c.Repaircharge.Smallest), 80, "right");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.RepairTime.PossibleAttacks + " / " + c.RepairTime.MaxAttacks, 60, "right")
                                    } else a += 5;
                                    a += 4;
                                    MaelstromTools.Util.addElement(this.Widget, b, a++, MaelstromTools.Util.getAccessBaseButton(d, webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                                    b += 2
                                }
                                return b
                            } catch (e) {
                                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e)
                            }
                        },
                        createOverviewLabels: function (b) {
                            try {
                                var a = 2;
                                MaelstromTools.Util.addLabel(this.Widget, b, a, "Basis", 60, "right");
                                a += 3;
                                MaelstromTools.Util.addLabel(this.Widget, b, a, "Defensive", 60, "right");
                                a += 3;
                                MaelstromTools.Util.addLabel(this.Widget, b, a, "Offensive", 60, "right");
                                b++;
                                a = 2;
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Stufe", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Gebäude", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Zustand", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Stufe", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Gebäude", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Zustand", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Stufe", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Einheiten", 60, "right");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Zustand", 60, "right");
                                b++;
                                for (var d in this.Cache) {
                                    var c = this.Cache[d];
                                    a = 1;
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, d, 80, "left");
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Base.Level, 60, "right");
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Base.TotalHeadCount + " / " + c.Base.UnitLimit, 60, "right", null, c.Base.FreeHeadCount >= 1 ? "red" : "white");
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Base.HealthInPercent + "%", 60, "right", null, c.Base.HealthInPercent < 25 ? "red" : c.Base.HealthInPercent < 100 ? "yellow" : "white");
                                    if (c.Defense.UnitLimit > 0) {
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Defense.Level, 60, "right");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Defense.TotalHeadCount + " / " + c.Defense.UnitLimit, 60, "right", null, c.Defense.FreeHeadCount >= 5 ? "red" : c.Defense.FreeHeadCount >= 3 ? "yellow" : "white");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Defense.HealthInPercent + "%", 60, "right", null, c.Defense.HealthInPercent < 25 ? "red" : c.Defense.HealthInPercent < 100 ? "yellow" : "white")
                                    } else a += 3;
                                    if (c.Offense.UnitLimit > 0) {
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Offense.Level, 60, "right");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Offense.TotalHeadCount + " / " + c.Offense.UnitLimit, 60, "right", null, c.Offense.FreeHeadCount >= 10 ? "red" : c.Offense.FreeHeadCount >= 5 ? "yellow" : "white");
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.Offense.HealthInPercent + "%", 60, "right", null, c.Offense.HealthInPercent < 25 ? "red" : c.Offense.HealthInPercent < 100 ? "yellow" : "white")
                                    } else a += 3;
                                    MaelstromTools.Util.addElement(this.Widget, b, a++, MaelstromTools.Util.getAccessBaseButton(d));
                                    b += 2
                                }
                                return b
                            } catch (e) {
                                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.ResourceOverview", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        Window: null,
                        Widget: null,
                        Cache: null,
                        updateCache: function () {
                            try {
                                b.updateCityCache();
                                this.Cache = Object();
                                for (var a in b.Cities) {
                                    var c = b.Cities[a].Object,
                                        d = ClientLib.Data.MainData.GetInstance().get_Time();
                                    this.Cache[a] = Object();
                                    this.Cache[a][MaelstromTools.Statics.Tiberium] = c.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    this.Cache[a][MaelstromTools.Statics.Tiberium + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    this.Cache[a][MaelstromTools.Statics.Tiberium + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                                    this.Cache[a][MaelstromTools.Statics.Crystal] = c.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    this.Cache[a][MaelstromTools.Statics.Crystal + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    this.Cache[a][MaelstromTools.Statics.Crystal + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                                    this.Cache[a][MaelstromTools.Statics.Power] = c.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    this.Cache[a][MaelstromTools.Statics.Power + "Max"] = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    this.Cache[a][MaelstromTools.Statics.Power + "Full"] = d.GetJSStepTime(c.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power))
                                }
                            } catch (e) {
                                console.log("MaelstromTools.ResourceOverview.updateCache: ", e)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                this.Widget.removeAll();
                                var e = true,
                                    c = 2,
                                    d = Object(),
                                    b = 1;
                                d[MaelstromTools.Statics.Tiberium] = 0;
                                d[MaelstromTools.Statics.Crystal] = 0;
                                d[MaelstromTools.Statics.Power] = 0;
                                for (var f in this.Cache) {
                                    var a = this.Cache[f];
                                    d[MaelstromTools.Statics.Tiberium] += a[MaelstromTools.Statics.Tiberium];
                                    d[MaelstromTools.Statics.Crystal] += a[MaelstromTools.Statics.Crystal];
                                    d[MaelstromTools.Statics.Power] += a[MaelstromTools.Statics.Power];
                                    b = 1;
                                    MaelstromTools.Util.addLabel(this.Widget, c, b++, f, 100, "left");
                                    e && MaelstromTools.Util.addLabel(this.Widget, 1, b, "Maximum", 80, "left");
                                    MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(a[MaelstromTools.Statics.Tiberium + "Max"]), 80, "right");
                                    e && MaelstromTools.Util.addImage(this.Widget, 1, b, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                                    MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(a[MaelstromTools.Statics.Tiberium]), 60, "right", null, a[MaelstromTools.Statics.Tiberium] >= a[MaelstromTools.Statics.Tiberium + "Max"] ? "red" : a[MaelstromTools.Statics.Tiberium] >= .75 * a[MaelstromTools.Statics.Tiberium + "Max"] ? "yellow" : "white");
                                    if (a[MaelstromTools.Statics.Tiberium] < a[MaelstromTools.Statics.Tiberium + "Max"]) MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.GetDateTimeString(a[MaelstromTools.Statics.Tiberium + "Full"]), 100, "right", null, a[MaelstromTools.Statics.Tiberium] >= .75 * a[MaelstromTools.Statics.Tiberium + "Max"] ? "yellow" : "white");
                                    else MaelstromTools.Util.addLabel(this.Widget, c, b++, "Storage full!", 100, "right", null, "red");
                                    e && MaelstromTools.Util.addImage(this.Widget, 1, b, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                                    MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(a[MaelstromTools.Statics.Crystal]), 60, "right", null, a[MaelstromTools.Statics.Crystal] >= a[MaelstromTools.Statics.Crystal + "Max"] ? "red" : a[MaelstromTools.Statics.Crystal] >= .75 * a[MaelstromTools.Statics.Crystal + "Max"] ? "yellow" : "white");
                                    if (a[MaelstromTools.Statics.Crystal] < a[MaelstromTools.Statics.Crystal + "Max"]) MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.GetDateTimeString(a[MaelstromTools.Statics.Crystal + "Full"]), 100, "right", null, a[MaelstromTools.Statics.Crystal] >= .75 * a[MaelstromTools.Statics.Crystal + "Max"] ? "yellow" : "white");
                                    else MaelstromTools.Util.addLabel(this.Widget, c, b++, "Storage full!", 100, "right", null, "red");
                                    e && MaelstromTools.Util.addImage(this.Widget, 1, b, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                                    MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(a[MaelstromTools.Statics.Power]), 60, "right", null, a[MaelstromTools.Statics.Power] >= a[MaelstromTools.Statics.Power + "Max"] ? "red" : a[MaelstromTools.Statics.Power] >= .75 * a[MaelstromTools.Statics.Power + "Max"] ? "yellow" : "white");
                                    if (a[MaelstromTools.Statics.Power] < a[MaelstromTools.Statics.Power + "Max"]) MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.GetDateTimeString(a[MaelstromTools.Statics.Power + "Full"]), 100, "right", null, a[MaelstromTools.Statics.Power] >= .75 * a[MaelstromTools.Statics.Power + "Max"] ? "yellow" : "white");
                                    else MaelstromTools.Util.addLabel(this.Widget, c, b++, "Storage full!", 100, "right", null, "red");
                                    MaelstromTools.Util.addElement(this.Widget, c, b++, MaelstromTools.Util.getAccessBaseButton(f));
                                    c++;
                                    e = false
                                }
                                b = 1;
                                MaelstromTools.Util.addLabel(this.Widget, c, b++, "Summe", 100, "left", "bold");
                                b++;
                                MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(d[MaelstromTools.Statics.Tiberium]), 60, "right", "bold");
                                b++;
                                MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(d[MaelstromTools.Statics.Crystal]), 60, "right", "bold");
                                b++;
                                MaelstromTools.Util.addLabel(this.Widget, c, b++, MaelstromTools.Wrapper.FormatNumbersCompact(d[MaelstromTools.Statics.Power]), 60, "right", "bold")
                            } catch (g) {
                                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", g)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.SupportWeapon", {
                    type: "singleton",
                    extend: MaelstromTools.DefaultObject,
                    members: {
                        Window: null,
                        Widget: null,
                        Cache: null,
                        CityMenuButtons: null,
                        updateCache: function () {
                            try {
                                b.updateCityCache();
                                this.Cache = Object();
                                for (var a in b.Cities) {
                                    var c = b.Cities[a].Object,
                                        f = ClientLib.Data.MainData.GetInstance().get_Player(),
                                        d = c.get_SupportData();
                                    this.Cache[a] = Object();
                                    if (d == null) this.Cache[a].HasSupportWeapon = false;
                                    else {
                                        this.Cache[a].HasSupportWeapon = true;
                                        if (c.get_SupportDedicatedBaseId() > 0) {
                                            this.Cache[a].SupportedCityId = c.get_SupportDedicatedBaseId();
                                            this.Cache[a].SupportedCityName = c.get_SupportDedicatedBaseName();
                                            var e = c.get_SupportDedicatedBaseCoordId();
                                            this.Cache[a].SupportedCityX = e & 65535;
                                            this.Cache[a].SupportedCityY = e >> 16 & 65535
                                        }
                                        this.Cache[a].SupportRange = MaelstromTools.Wrapper.GetSupportWeaponRange(c.get_SupportWeapon());
                                        var g = ClientLib.Base.Tech.GetTechNameFromTechId(d.get_Type(), f.get_Faction());
                                        this.Cache[a].SupportName = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(g, f.get_Faction());
                                        this.Cache[a].SupportLevel = d.get_Level()
                                    }
                                }
                            } catch (h) {
                                console.log("MaelstromTools.SupportWeapon.updateCache: ", h)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                this.Widget.removeAll();
                                var b = 1,
                                    a = 2;
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Artillerie Support", 140, "left");
                                MaelstromTools.Util.addLabel(this.Widget, b, a++, "Kalibriert auf", 140, "left");
                                var g = b,
                                    f = a++,
                                    e = 0;
                                b++;
                                for (var d in this.Cache) {
                                    var c = this.Cache[d];
                                    a = 1;
                                    MaelstromTools.Util.addLabel(this.Widget, b, a++, d, 100, "left");
                                    if (!c.HasSupportWeapon) {
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, "none", 140, "left");
                                        a += 2
                                    } else {
                                        e++;
                                        MaelstromTools.Util.addLabel(this.Widget, b, a++, c.SupportName + " (" + c.SupportLevel + ")", 140, "left");
                                        if (c.SupportedCityId > 0) {
                                            MaelstromTools.Util.addLabel(this.Widget, b, a++, c.SupportedCityName, 140, "left");
                                            MaelstromTools.Util.addElement(this.Widget, b, a++, this.getRecallButton(d))
                                        } else a += 2
                                    }
                                    MaelstromTools.Util.addElement(this.Widget, b, a++, MaelstromTools.Util.getAccessBaseButton(d));
                                    MaelstromTools.Util.addElement(this.Widget, b, a++, MaelstromTools.Util.getFocusBaseButton(d));
                                    b++
                                }
                                e > 0 && MaelstromTools.Util.addElement(this.Widget, g, f, this.getRecallAllButton())
                            } catch (h) {
                                console.log("MaelstromTools.SupportWeapon.setWidgetLabels: ", h)
                            }
                        },
                        getRecallAllButton: function () {
                            var a = (new qx.ui.form.Button("Recall all")).set({
                                appearance: "button-text-small",
                                toolTipText: "Recall all support weapons",
                                width: 100,
                                height: 20
                            });
                            a.addListener("execute", function () {
                                MaelstromTools.Util.recallAllSupport()
                            }, this);
                            return a
                        },
                        getRecallButton: function (a) {
                            var b = (new qx.ui.form.Button("Recall")).set({
                                appearance: "button-text-small",
                                toolTipText: "Recall support to " + a,
                                width: 100,
                                height: 20
                            });
                            b.addListener("execute", function () {
                                MaelstromTools.Util.recallSupport(a)
                            }, this);
                            return b
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Statics", {
                    type: "static",
                    statics: {
                        Tiberium: "Tiberium",
                        Crystal: "Crystal",
                        Power: "Power",
                        Dollar: "Dollar",
                        Research: "Research",
                        Vehicle: "Vehicle",
                        Aircraft: "Aircraft",
                        Infantry: "Infantry",
                        LootTypeName: function (a) {
                            switch (a) {
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
                                return ""
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Util", {
                    type: "static",
                    statics: {
                        ArrayUnique: function (b) {
                            for (var c = {}, e = b.length, d = [], a = 0; a < e; a += 1) c[b[a]] = b[a];
                            for (a in c) d.push(c[a]);
                            return d
                        },
                        ArraySize: function (a) {
                            var b = 0,
                                c;
                            for (c in a) if (a.hasOwnProperty(c)) b++;
                            return b
                        },
                        addLabel: function (i, h, g, j, e, c, f, d, b) {
                            try {
                                var a = (new qx.ui.basic.Label).set({
                                    value: j
                                });
                                e && a.setWidth(e);
                                c && a.setTextAlign(c);
                                d && a.setTextColor(d);
                                f && a.setFont(f);
                                if (!b || b == 0) b = 1;
                                i.add(a, {
                                    row: h,
                                    column: g,
                                    colSpan: b
                                })
                            } catch (k) {
                                console.log("MaelstromTools.Util.addLabel: ", k)
                            }
                        },
                        addElement: function (e, d, c, b, a) {
                            try {
                                if (!a || a == 0) a = 1;
                                e.add(b, {
                                    row: d,
                                    column: c,
                                    colSpan: a
                                })
                            } catch (f) {
                                console.log("MaelstromTools.Util.addElement: ", f)
                            }
                        },
                        addImage: function (c, b, a, d) {
                            try {
                                c.add(d, {
                                    row: b,
                                    column: a
                                })
                            } catch (e) {
                                console.log("MaelstromTools.Util.addImage: ", e)
                            }
                        },
                        getImage: function (b) {
                            var a = new qx.ui.basic.Image(d.images[b]);
                            a.setScale(true);
                            a.setWidth(20);
                            a.setHeight(20);
                            return a
                        },
                        getAccessBaseButton: function (c, e) {
                            try {
                                var a = (new qx.ui.form.Button(null, d.images.AccessBase)).set({
                                    appearance: "button-detailview-small",
                                    toolTipText: "Springe zu " + c,
                                    width: 20,
                                    height: 20,
                                    marginLeft: 5
                                });
                                a.setUserData("cityId", b.Cities[c].ID);
                                a.setUserData("viewMode", e);
                                a.addListener("execute", function (a) {
                                    MaelstromTools.Util.accessBase(a.getTarget().getUserData("cityId"), a.getTarget().getUserData("viewMode"))
                                }, this);
                                return a
                            } catch (f) {
                                console.log("MaelstromTools.Util.getAccessBaseButton: ", f)
                            }
                        },
                        getFocusBaseButton: function (c) {
                            try {
                                var a = (new qx.ui.form.Button(null, d.images.FocusBase)).set({
                                    appearance: "button-detailview-small",
                                    toolTipText: "Zeige auf Karte " + c,
                                    width: 20,
                                    height: 20,
                                    marginLeft: 5
                                });
                                a.setUserData("cityId", b.Cities[c].ID);
                                a.addListener("execute", function (a) {
                                    MaelstromTools.Util.focusBase(a.getTarget().getUserData("cityId"))
                                }, this);
                                return a
                            } catch (e) {
                                console.log("MaelstromTools.Util.getFocusBaseButton: ", e)
                            }
                        },
                        accessBase: function (a, b) {
                            try {
                                if (a > 0) {
                                    var c = MaelstromTools.Wrapper.GetCity(a);
                                    if (c != null && !c.get_IsGhostMode()) if (b) webfrontend.gui.UtilView.openVisModeInMainWindow(b, a, false);
                                    else webfrontend.gui.UtilView.openCityInMainWindow(a)
                                }
                            } catch (d) {
                                console.log("MaelstromTools.Util.accessBase: ", d)
                            }
                        },
                        focusBase: function (a) {
                            try {
                                if (a > 0) {
                                    var b = MaelstromTools.Wrapper.GetCity(a);
                                    b != null && !b.get_IsGhostMode() && webfrontend.gui.UtilView.centerCityOnRegionViewWindow(a)
                                }
                            } catch (c) {
                                console.log("MaelstromTools.Util.focusBase: ", c)
                            }
                        },
                        recallSupport: function (a) {
                            try {
                                var c = b.Cities[a].Object;
                                c.RecallDedicatedSupport()
                            } catch (d) {
                                console.log("MaelstromTools.Util.recallSupport: ", d)
                            }
                        },
                        recallAllSupport: function () {
                            try {
                                b.updateCityCache();
                                for (var a in b.Cities) {
                                    var c = b.Cities[a].Object;
                                    c.RecallDedicatedSupport()
                                }
                            } catch (d) {
                                console.log("MaelstromTools.Util.recallAllSupport: ", d)
                            }
                        },
                        checkIfSupportIsAllowed: function (a) {
                            try {
                                return a.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType ? false : a.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && a.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance ? false : true
                            } catch (b) {
                                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", b);
                                return false
                            }
                        },
                        calibrateWholeSupportOnSelectedBase: function () {
                            this.checkIfSupportIsAllowed(b.SelectedBaseForMenu) && this.calibrateWholeSupport(b.SelectedBaseForMenu)
                        },
                        calibrateWholeSupport: function (a) {
                            try {
                                b.updateCityCache();
                                for (var h in b.Cities) {
                                    var c = b.Cities[h].Object,
                                        d = c.get_SupportWeapon();
                                    if (a != null && d != null) {
                                        var f = c.get_X() - a.get_RawX(),
                                            g = c.get_Y() - a.get_RawY(),
                                            i = f * f + g * g,
                                            e = MaelstromTools.Wrapper.GetSupportWeaponRange(d);
                                        i <= e * e && c.SetDedicatedSupport(a.get_Id())
                                    }
                                }
                            } catch (j) {
                                console.log("MaelstromTools.Util.calibrateWholeSupport: ", j)
                            }
                        },
                        getResources: function (b) {
                            try {
                                var a = {};
                                if (b.get_X() < 0 || b.get_Y() < 0) {
                                    a.LoadState = 0;
                                    return a
                                }
                                var f = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),
                                    l = ClientLib.Base.Util.CalculateDistance(f.get_X(), f.get_Y(), b.get_RawX(), b.get_RawY()),
                                    g = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                                if (l > g) {
                                    a.LoadState = -1;
                                    return a
                                }
                                var e = MaelstromTools.Wrapper.GetCity(b.get_Id()),
                                    h = e.get_CityBuildingsData(),
                                    k = e.get_CityUnitsData(),
                                    j = MaelstromTools.Wrapper.GetBuildings(h),
                                    i = MaelstromTools.Wrapper.GetDefenseUnits(k),
                                    c = MaelstromTools.Util.getResourcesPart(j),
                                    d = MaelstromTools.Util.getResourcesPart(i);
                                a[MaelstromTools.Statics.Tiberium] = c[ClientLib.Base.EResourceType.Tiberium] + d[ClientLib.Base.EResourceType.Tiberium];
                                a[MaelstromTools.Statics.Crystal] = c[ClientLib.Base.EResourceType.Crystal] + d[ClientLib.Base.EResourceType.Crystal];
                                a[MaelstromTools.Statics.Dollar] = c[ClientLib.Base.EResourceType.Gold] + d[ClientLib.Base.EResourceType.Gold];
                                a[MaelstromTools.Statics.Research] = c[ClientLib.Base.EResourceType.ResearchPoints] + d[ClientLib.Base.EResourceType.ResearchPoints];
                                a.Factor = a[MaelstromTools.Statics.Tiberium] + a[MaelstromTools.Statics.Crystal] + a[MaelstromTools.Statics.Dollar] + a[MaelstromTools.Statics.Research];
                                a.CPNeeded = f.CalculateAttackCommandPointCostToCoord(e.get_X(), e.get_Y());
                                a.LoadState = a.Factor > 0 ? 1 : 0;
                                a.Total = a[MaelstromTools.Statics.Research] + a[MaelstromTools.Statics.Tiberium] + a[MaelstromTools.Statics.Crystal] + a[MaelstromTools.Statics.Dollar];
                                return a
                            } catch (m) {
                                console.log("MaelstromTools.Util.getResources", m)
                            }
                        },
                        getResourcesPart: function (c) {
                            try {
                                var e = [0, 0, 0, 0, 0, 0, 0, 0];
                                if (c == null) return e;
                                for (var f = 0; f < c.length; f++) for (var d = c[f], b = MaelstromTools.Wrapper.GetUnitLevelRequirements(d), a = 0; a < b.length; a++) {
                                    e[b[a].t] += b[a].c * d.get_HitpointsPercent();
                                    d.get_HitpointsPercent() < 1
                                }
                                return e
                            } catch (g) {
                                console.log("MaelstromTools.Util.getResourcesPart", g)
                            }
                        }
                    }
                });
                qx.Class.define("MaelstromTools.Wrapper", {
                    type: "static",
                    statics: {
                        FormatNumbersCompact: function (a) {
                            return webfrontend.gui.Util.formatNumbersCompact(a)
                        },
                        GetDateTimeString: function (a) {
                            return webfrontend.Util.getDateTimeString(a)
                        },
                        FormatTimespan: function (a) {
                            return ClientLib.Vis.VisMain.FormatTimespan(a)
                        },
                        GetSupportWeaponRange: function (a) {
                            return a.r
                        },
                        GetCity: function (a) {
                            return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(a)
                        },
                        RepairAll: function (c, b) {
                            var a = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                            ClientLib.Vis.VisMain.GetInstance().set_Mode(b);
                            c.RepairAll();
                            ClientLib.Vis.VisMain.GetInstance().set_Mode(a)
                        },
                        CanRepairAll: function (c, a) {
                            try {
                                var b = c.get_CityRepairData(),
                                    d = b.CanRepair(0, a);
                                b.UpdateCachedFullRepairAllCost(a);
                                return d != null && (!c.get_IsLocked() || a != ClientLib.Vis.Mode.ArmySetup);
                                return false
                            } catch (e) {
                                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                                return false
                            }
                        },
                        GetBuildings: function (a) {
                            return a.get_Buildings() != null ? a.get_Buildings().l : null
                        },
                        GetDefenseUnits: function (a) {
                            return a.get_DefenseUnits() != null ? a.get_DefenseUnits().l : null
                        },
                        GetUnitLevelRequirements: function (a) {
                            return a.get_UnitLevelRequirements() != null ? a.get_UnitLevelRequirements().rer : null
                        }
                    }
                });
                qx.Class.define("MaelstromTools.LocalStorage", {
                    type: "static",
                    statics: {
                        isSupported: function () {
                            return typeof Storage !== "undefined"
                        },
                        "set": function (b, a) {
                            try {
                                if (MaelstromTools.LocalStorage.isSupported()) localStorage["CCTA_MaelstromTools_" + b] = JSON.stringify(a)
                            } catch (c) {
                                console.log("MaelstromTools.LocalStorage.set: ", c)
                            }
                        },
                        "get": function (a, b) {
                            try {
                                if (MaelstromTools.LocalStorage.isSupported()) if (localStorage["CCTA_MaelstromTools_" + a] != null && localStorage["CCTA_MaelstromTools_" + a] != "undefined") return JSON.parse(localStorage["CCTA_MaelstromTools_" + a])
                            } catch (c) {
                                console.log("MaelstromTools.LocalStorage.get: ", c)
                            }
                            return b
                        },
                        clearAll: function () {
                            try {
                                if (!MaelstromTools.LocalStorage.isSupported()) return;
                                for (var a in localStorage) a.indexOf("CCTA_MaelstromTools_") == 0 && localStorage.removeItem(a)
                            } catch (b) {
                                console.log("MaelstromTools.LocalStorage.clearAll: ", b)
                            }
                        }
                    }
                });
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
                                var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                                for (var b in d.d) {
                                    this.CityCount++;
                                    var c = MaelstromTools.Wrapper.GetCity(b),
                                        a = c.get_Name();
                                    this.Cities[a] = Object();
                                    this.Cities[a].ID = b;
                                    this.Cities[a].Object = c
                                }
                            } catch (e) {
                                console.log("MaelstromTools.Cache.updateCityCache: ", e)
                            }
                        },
                        updateLoot: function (a) {
                            var b = a.get_Id();
                            if (this.SelectedBaseForLoot != null && b == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources.LoadState > 0) return -2;
                            this.SelectedBaseForLoot = a;
                            this.SelectedBaseResources = MaelstromTools.Util.getResources(a);
                            return this.SelectedBaseResources.LoadState
                        }
                    }
                });
                qx.Class.define("HuffyTools.ImageRender", {
                    extend: qx.ui.table.cellrenderer.AbstractImage,
                    construct: function (b, a) {
                        this.base(arguments);
                        if (b) this.__imageWidth = b;
                        if (a) this.__imageHeight = a;
                        this.__am = qx.util.AliasManager.getInstance()
                    },
                    members: {
                        __am: null,
                        __imageHeight: 16,
                        __imageWidth: 16,
                        _identifyImage: function (b) {
                            var a = {
                                imageWidth: this.__imageWidth,
                                imageHeight: this.__imageHeight
                            };
                            if (b.value == "") a.url = null;
                            else a.url = this.__am.resolve(b.value);
                            a.tooltip = b.tooltip;
                            return a
                        }
                    },
                    destruct: function () {
                        this.__am = null
                    }
                });
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
                        _getContentHtml: function (a) {
                            var c = a.value,
                                b = this.getReplaceFunction();
                            if (b) a.value = b(c);
                            return qx.bom.String.escape(this._formatValue(a))
                        }
                    }
                });
                qx.Class.define("HuffyTools.CityCheckBox", {
                    extend: qx.ui.form.CheckBox,
                    members: {
                        HT_CityID: null
                    }
                });
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
                            try {
                                this.HT_SelectedResourceType = -1;
                                this.IsTimerEnabled = false;
                                this.upgradeInProgress = false;
                                this.HT_TabView = new qx.ui.tabview.TabView;
                                this.HT_TabView.set({
                                    contentPadding: 0,
                                    appearance: "tabview",
                                    margin: 5,
                                    barPosition: "left"
                                });
                                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                                this.Widget.setPadding(0);
                                this.Widget.setMargin(0);
                                this.Widget.setBackgroundColor("#BEC8CF");
                                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                                this.Widget.add(this.HT_TabView, {
                                    flex: 1
                                });
                                this.Window.setPadding(0);
                                this.Window.set({
                                    resizable: true
                                });
                                this.Window.removeAll();
                                this.Window.add(this.Widget);
                                this.BuildingList = [];
                                this.HT_Models = [];
                                this.HT_Tables = [];
                                this.HT_Pages = [];
                                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (a) {
                                    this.upgradeBuilding(a, ClientLib.Base.EResourceType.Tiberium)
                                }, this);
                                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                                this.createTable(ClientLib.Base.EResourceType.Crystal);
                                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (a) {
                                    this.upgradeBuilding(a, ClientLib.Base.EResourceType.Crystal)
                                }, this);
                                this.createTabPage(ClientLib.Base.EResourceType.Power);
                                this.createTable(ClientLib.Base.EResourceType.Power);
                                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (a) {
                                    this.upgradeBuilding(a, ClientLib.Base.EResourceType.Power)
                                }, this);
                                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                                this.createTable(ClientLib.Base.EResourceType.Gold);
                                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (a) {
                                    this.upgradeBuilding(a, ClientLib.Base.EResourceType.Gold)
                                }, this);
                                b.updateCityCache();
                                this.HT_Options = [];
                                this.HT_ShowOnlyTopBuildings = [];
                                this.HT_ShowOnlyAffordableBuildings = [];
                                this.HT_CityBuildings = [];
                                for (var a in this.HT_Pages) {
                                    this.createOptions(a);
                                    this.HT_Pages[a].add(this.HT_Options[a]);
                                    this.HT_Pages[a].add(this.HT_Tables[a], {
                                        flex: 1
                                    });
                                    this.HT_TabView.add(this.HT_Pages[a])
                                }
                                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold
                            } catch (c) {
                                console.log("HuffyTools.UpgradePriority.init: ", c)
                            }
                        },
                        createOptions: function (a) {
                            var g = new qx.ui.layout.Flow,
                                d = new qx.ui.container.Composite(g);
                            d.setMargin(5);
                            this.HT_ShowOnlyTopBuildings[a] = new qx.ui.form.CheckBox("Wichtigste Gebäude anzeigen");
                            this.HT_ShowOnlyTopBuildings[a].setMargin(5);
                            this.HT_ShowOnlyTopBuildings[a].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + a, true));
                            this.HT_ShowOnlyTopBuildings[a].addListener("execute", this.CBChanged, this);
                            d.add(this.HT_ShowOnlyTopBuildings[a], {
                                left: 10,
                                top: 10
                            });
                            this.HT_ShowOnlyAffordableBuildings[a] = new qx.ui.form.CheckBox("Nur verfügbare Upgrades anzeigen");
                            this.HT_ShowOnlyAffordableBuildings[a].setMargin(5);
                            this.HT_ShowOnlyAffordableBuildings[a].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + a, true));
                            this.HT_ShowOnlyAffordableBuildings[a].addListener("execute", this.CBChanged, this);
                            d.add(this.HT_ShowOnlyAffordableBuildings[a], {
                                left: 10,
                                top: 10,
                                lineBreak: true
                            });
                            this.HT_CityBuildings[a] = [];
                            for (var e in b.Cities) {
                                var f = b.Cities[e].Object,
                                    c = new HuffyTools.CityCheckBox(e);
                                c.HT_CityID = f.get_Id();
                                c.setMargin(5);
                                c.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + a + "_" + f.get_Id(), true));
                                c.addListener("execute", this.CBChanged, this);
                                d.add(c, {
                                    left: 10,
                                    top: 10
                                });
                                this.HT_CityBuildings[a][e] = c
                            }
                            this.HT_Options[a] = d
                        },
                        createTable: function (a) {
                            try {
                                this.HT_Models[a] = new qx.ui.table.model.Simple;
                                this.HT_Models[a].setColumns(["ID", "Basis", "Typ (X:Y)", "zu Stufe", "Zuwachs/h", "Faktor", "Tiberium", "Energie", "Tiberium+", "Energie+", "Verfügbar in", "Upgrade", "Status"]);
                                this.HT_Tables[a] = new qx.ui.table.Table(this.HT_Models[a]);
                                this.HT_Tables[a].setColumnVisibilityButtonVisible(false);
                                this.HT_Tables[a].setColumnWidth(0, 0);
                                this.HT_Tables[a].setColumnWidth(1, 90);
                                this.HT_Tables[a].setColumnWidth(2, 120);
                                this.HT_Tables[a].setColumnWidth(3, 55);
                                this.HT_Tables[a].setColumnWidth(4, 70);
                                this.HT_Tables[a].setColumnWidth(5, 60);
                                this.HT_Tables[a].setColumnWidth(6, 70);
                                this.HT_Tables[a].setColumnWidth(7, 70);
                                this.HT_Tables[a].setColumnWidth(8, 70);
                                this.HT_Tables[a].setColumnWidth(9, 70);
                                this.HT_Tables[a].setColumnWidth(10, 70);
                                this.HT_Tables[a].setColumnWidth(11, 40);
                                this.HT_Tables[a].setColumnWidth(12, 0);
                                var b = this.HT_Tables[a].getTableColumnModel();
                                b.setColumnVisible(0, false);
                                b.setColumnVisible(12, false);
                                b.setDataCellRenderer(4, (new qx.ui.table.cellrenderer.Number).set({
                                    numberFormat: (new qx.util.format.NumberFormat).set({
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 2
                                    })
                                }));
                                b.setDataCellRenderer(5, (new qx.ui.table.cellrenderer.Number).set({
                                    numberFormat: (new qx.util.format.NumberFormat).set({
                                        maximumFractionDigits: 5,
                                        minimumFractionDigits: 5
                                    })
                                }));
                                b.setDataCellRenderer(6, (new HuffyTools.ReplaceRender).set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                b.setDataCellRenderer(7, (new HuffyTools.ReplaceRender).set({
                                    ReplaceFunction: this.formatTiberiumAndPower
                                }));
                                b.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20))
                            } catch (c) {
                                console.log("HuffyTools.UpgradePriority.createTable: ", c)
                            }
                        },
                        createTabPage: function (c) {
                            try {
                                var e = MaelstromTools.Statics.LootTypeName(c),
                                    a = new qx.ui.tabview.Page(e, d.images[e]);
                                a.setLayout(new qx.ui.layout.VBox(2));
                                a.setPadding(5);
                                var b = a.getChildControl("button");
                                b.resetWidth();
                                b.resetHeight();
                                b.set({
                                    show: "icon",
                                    margin: 0,
                                    padding: 0,
                                    toolTipText: e
                                });
                                b.addListener("execute", this.TabChanged, [this, c]);
                                this.HT_Pages[c] = a;
                                return a
                            } catch (f) {
                                console.log("HuffyTools.UpgradePriority.createTabPage: ", f)
                            }
                        },
                        TabChanged: function () {
                            try {
                                this[0].HT_SelectedResourceType = this[1];
                                this[0].UpgradeCompleted(null, null)
                            } catch (a) {
                                console.log("HuffyTools.UpgradePriority.TabChanged: ", a)
                            }
                        },
                        upgradeBuilding: function (a, b) {
                            if (this.upgradeInProgress == true) {
                                console.log("upgrade in progress !");
                                return
                            }
                            try {
                                if (a.getColumn() == 11) {
                                    var c = this.HT_Models[b].getValue(0, a.getRow()),
                                        d = parseInt(this.HT_Models[b].getValue(12, a.getRow()));
                                    if (d != 1) return;
                                    if (c in this.BuildingList) {
                                        this.upgradeInProgress = true;
                                        ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[c], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true)
                                    }
                                }
                            } catch (a) {
                                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", a)
                            }
                        },
                        UpgradeCompleted: function () {
                            this.calc();
                            this.upgradeInProgress = false
                        },
                        CBChanged: function () {
                            this.UpgradeCompleted(null, null)
                        },
                        formatTiberiumAndPower: function (a) {
                            return webfrontend.gui.Util.formatNumbersCompact(a)
                        },
                        updateCache: function () {
                            try {
                                !this.HT_TabView && this.init();
                                var a = this.HT_SelectedResourceType,
                                    g = this.HT_ShowOnlyTopBuildings[a].getValue();
                                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + a, g);
                                var d = this.HT_ShowOnlyAffordableBuildings[a].getValue();
                                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + a, d);
                                var e = [];
                                for (var f in this.HT_CityBuildings[a]) {
                                    var c = this.HT_CityBuildings[a][f],
                                        b = c.getValue();
                                    MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + a + "_" + c.HT_CityID, b);
                                    e[f] = b
                                }
                                window.HuffyTools.UpgradePriority.getInstance().collectData(g, d, e, a)
                            } catch (h) {
                                console.log("HuffyTools.UpgradePriority.updateCache: ", h)
                            }
                        },
                        setWidgetLabels: function () {
                            try {
                                var q = window.HuffyTools.UpgradePriority.getInstance(),
                                    e = q.Cache;
                                for (var b in e) {
                                    var n = [];
                                    this.HT_Models[b].setData([]);
                                    for (var g in e[b]) for (var m in e[b][g]) {
                                        var a = e[b][g][m];
                                        if (typeof a.Type == "undefined") continue;
                                        if (!(m in this.BuildingList)) this.BuildingList[a.ID] = a.Building;
                                        var j = 0;
                                        if (ClientLib.Base.EResourceType.Tiberium in a.Costs) j = a.Costs[ClientLib.Base.EResourceType.Tiberium];
                                        var i = 0;
                                        if (ClientLib.Base.EResourceType.Tiberium in a.Costs) i = a.Costs[ClientLib.Base.EResourceType.Tiberium] / a.GainPerHour;
                                        var l = 0;
                                        if (ClientLib.Base.EResourceType.Power in a.Costs) l = a.Costs[ClientLib.Base.EResourceType.Power];
                                        var k = 0;
                                        if (ClientLib.Base.EResourceType.Power in a.Costs) k = a.Costs[ClientLib.Base.EResourceType.Power] / a.GainPerHour;
                                        var p = d.images.UpgradeBuilding;
                                        if (a.Affordable == false) p = "";
                                        var h = a.Type;
                                        h = h + "(" + a.PosX + ":" + a.PosY + ")";
                                        var c = 0;
                                        if (a.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) c = a.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                                        if (a.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > c) c = a.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                                        var o = "";
                                        if (c > 0) o = ClientLib.Vis.VisMain.FormatTimespan(c);
                                        var f = 0;
                                        if (a.Affordable == true) f = 1;
                                        else if (a.AffordableByTransfer == true) f = 2;
                                        else f = 3;
                                        n.push([a.ID, g, h, a.Level, a.GainPerHour, a.Ticks, j, l, i, k, o, p, f])
                                    }
                                    this.HT_Models[b].setData(n)
                                }
                            } catch (r) {
                                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", r)
                            }
                        }
                    }
                });
                qx.Class.define("HuffyTools.UpgradePriority", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        list_units: null,
                        list_buildings: null,
                        comparePrio: function (a, b) {
                            return a.Ticks < b.Ticks ? -1 : a.Ticks > b.Ticks ? 1 : 0
                        },
                        getPrioList: function (f, C, K, L, J, I) {
                            try {
                                var Q = window.MaelstromTools.ResourceOverview.getInstance();
                                Q.updateCache();
                                var A = 0;
                                for (var N in this.Cache) {
                                    var M = this.Cache[N];
                                    A += M[MaelstromTools.Statics.Tiberium]
                                }
                                for (var d = [], x = MaelstromTools.Production.getInstance().updateCache(f.get_Name()), D = MaelstromTools.Wrapper.GetBuildings(f.get_CityBuildingsData()), y = 0; y < D.length; y++) {
                                    var e = D[y],
                                        E = e.get_TechName(),
                                        G = true;
                                    for (var O in C) if (C[O] == E) {
                                        G = false;
                                        break
                                    }
                                    if (G == true) continue;
                                    var j = f.GetBuildingDetailViewInfo(e);
                                    if (j == null) continue;
                                    var F = e.get_Id(),
                                        a = [];
                                    a.ID = F;
                                    a.Type = this.TechTypeName(parseInt(E, 10));
                                    a.PosX = e.get_CoordX();
                                    a.PosY = e.get_CoordY();
                                    a.Building = {
                                        cityid: f.get_Id(),
                                        posX: a.PosX,
                                        posY: a.PosY,
                                        isPaid: true
                                    };
                                    a.GainPerHour = 0;
                                    a.Level = e.get_CurrentLevel() + 1;
                                    for (ModifierType in j.OwnProdModifiers.d) switch (parseInt(ModifierType, 10)) {
                                    case K:
                                        var H = j.OwnProdModifiers.d[e.get_MainModifierTypeId()],
                                            P = (H.TotalValue + H.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                        a.GainPerHour += j.OwnProdModifiers.d[ModifierType].NewLvlDelta / P;
                                        break;
                                    case L:
                                        a.GainPerHour += j.OwnProdModifiers.d[ModifierType].NewLvlDelta
                                    }
                                    var c = ClientLib.Base.Util.GetTechLevelData_Obj(e.get_CurrentLevel() + 1, e.get_TechGameData_Obj()),
                                        n = {}, h = "",
                                        g = "",
                                        q = 0,
                                        u = true,
                                        B = true,
                                        z = true,
                                        r = [],
                                        w = [];
                                    for (var b in c.rr) {
                                        if (typeof c.rr[b] == "function") continue;
                                        if (c.rr[b].t == "0") continue;
                                        r[c.rr[b].t] = c.rr[b].c;
                                        if (parseInt(c.rr[b].c) <= 0) continue;
                                        n[b] = c.rr[b].c / a.GainPerHour;
                                        if (g.length > 0) g = g + ", ";
                                        g = g + webfrontend.gui.Util.formatNumbersCompact(c.rr[b].c) + " " + MaelstromTools.Statics.LootTypeName(c.rr[b].t);
                                        if (h.length > 0) h = h + ", ";
                                        if (f.GetResourceCount(c.rr[b].t) < c.rr[b].c) switch (c.rr[b].t) {
                                        case ClientLib.Base.EResourceType.Tiberium:
                                            B = false;
                                            if (A < c.rr[b].c) z = false;
                                            break;
                                        case ClientLib.Base.EResourceType.Power:
                                            u = false
                                        }
                                        h = h + webfrontend.gui.Util.formatNumbersCompact(n[b]);
                                        var s = MaelstromTools.Statics.LootTypeName(c.rr[b].t),
                                            o = x[s].Delta + x[s].ExtraBonusDelta + x[s].POI;
                                        if (o > 0) if (q < 3600 * n[b] / o) q = 3600 * n[b] / o;
                                        w[c.rr[b].t] = 0;
                                        if (r[c.rr[b].t] > f.GetResourceCount(c.rr[b].t)) w[c.rr[b].t] = 3600 * (r[c.rr[b].t] - f.GetResourceCount(c.rr[b].t)) / o
                                    }
                                    a.Ticks = q;
                                    a.Time = ClientLib.Vis.VisMain.FormatTimespan(q);
                                    a.Costtext = g;
                                    a.Costs = r;
                                    a.TimeTillUpgradable = w;
                                    a.Ratio = h;
                                    a.Affordable = B && u;
                                    a.AffordableByTransfer = u && z;
                                    if (a.GainPerHour > 0 && (I == false || a.Affordable == true)) d[F] = a
                                }
                                d = d.sort(this.comparePrio);
                                if (!J) return d;
                                var i = [];
                                if (MaelstromTools.Util.ArraySize(d) > 0) {
                                    var m = -1,
                                        k = -1,
                                        l = -1,
                                        t = -1;
                                    for (var p in d) {
                                        if (d[p].Affordable == true) {
                                            if (k == -1) {
                                                k = p;
                                                l = t
                                            }
                                        } else if (m == -1) m = p;
                                        t = p
                                    }
                                    if (k == -1) l = t;
                                    var v = 0;
                                    if (m != -1) i[v++] = d[m];
                                    if (l != -1) i[v++] = d[l];
                                    if (k != -1) i[v++] = d[k]
                                }
                                i = i.sort(this.comparePrio);
                                return i
                            } catch (R) {
                                console.log("HuffyTools.getPrioList: ", R)
                            }
                        },
                        TechTypeName: function (a) {
                            switch (a) {
                            case ClientLib.Base.ETechName.PowerPlant:
                                return "Kraftwerk";
                                break;
                            case ClientLib.Base.ETechName.Refinery:
                                return "Raffinerie";
                                break;
                            case ClientLib.Base.ETechName.Harvester_Crystal:
                                return "Sammler";
                                break;
                            case ClientLib.Base.ETechName.Harvester:
                                return "Sammler";
                                break;
                            case ClientLib.Base.ETechName.Silo:
                                return "Silo";
                                break;
                            case ClientLib.Base.ETechName.Accumulator:
                                return "Akkumulator"
                            }
                            return "?"
                        },
                        collectData: function (e, d, g, a) {
                            try {
                                b.updateCityCache();
                                this.Cache = {};
                                if (a == ClientLib.Base.EResourceType.Tiberium) this.Cache[ClientLib.Base.EResourceType.Tiberium] = {};
                                if (a == ClientLib.Base.EResourceType.Crystal) this.Cache[ClientLib.Base.EResourceType.Crystal] = {};
                                if (a == ClientLib.Base.EResourceType.Power) this.Cache[ClientLib.Base.EResourceType.Power] = {};
                                if (a == ClientLib.Base.EResourceType.Gold) this.Cache[ClientLib.Base.EResourceType.Gold] = {};
                                for (var c in b.Cities) {
                                    var f = b.Cities[c].Object;
                                    if (g[c] == false) continue;
                                    if (a == ClientLib.Base.EResourceType.Tiberium) this.Cache[ClientLib.Base.EResourceType.Tiberium][c] = this.getPrioList(f, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, e, d);
                                    if (a == ClientLib.Base.EResourceType.Crystal) this.Cache[ClientLib.Base.EResourceType.Crystal][c] = this.getPrioList(f, [ClientLib.Base.ETechName.Harvester_Crystal, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, e, d);
                                    if (a == ClientLib.Base.EResourceType.Power) this.Cache[ClientLib.Base.EResourceType.Power][c] = this.getPrioList(f, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, e, d);
                                    if (a == ClientLib.Base.EResourceType.Gold) this.Cache[ClientLib.Base.EResourceType.Gold][c] = this.getPrioList(f, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, e, d)
                                }
                            } catch (h) {
                                console.log("HuffyTools.UpgradePriority.collectData: ", h)
                            }
                        }
                    }
                });
                var b = window.MaelstromTools.Cache.getInstance(),
                    d = window.MaelstromTools.Base.getInstance(),
                    c = window.MaelstromTools.Preferences.getInstance();
                c.readOptions();
                if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
                webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (f) {
                    b.SelectedBaseForMenu = f;
                    var a = window.MaelstromTools.SupportWeapon.getInstance();
                    if (this.__MTCity_initialized != 1) {
                        this.__MTCity_initialized = 1;
                        a.CityMenuButtons = [];
                        for (var d in this) try {
                            if (this[d] && this[d].basename == "Composite") {
                                var c = new qx.ui.form.Button("Calibrate support");
                                c.addListener("execute", function () {
                                    MaelstromTools.Util.calibrateWholeSupportOnSelectedBase()
                                }, this);
                                this[d].add(c);
                                a.CityMenuButtons.push(c)
                            }
                        } catch (h) {
                            console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", h)
                        }
                    }
                    for (var g = MaelstromTools.Util.checkIfSupportIsAllowed(b.SelectedBaseForMenu), e = 0; e < a.CityMenuButtons.length; ++e) a.CityMenuButtons[e].setVisibility(g ? "visible" : "excluded");
                    this.__MTCity_showMenu(f)
                };
                if (c.Settings.showLoot) {
                    if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
                    webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
                        d.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
                        return this.__MTCity_NPCCamp()
                    };
                    if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
                    webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
                        d.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
                        return this.__MTCity_NPCBase()
                    };
                    if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
                    webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
                        d.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
                        return this.__MTCity_City()
                    }
                }
            }
        } catch (d) {
            console.log("createMaelstromTools: ", d)
        }
        function b() {
            try {
                if (typeof qx != "undefined" && qx.core.Init.getApplication() && qx.core.Init.getApplication().getNavigationBar() && qx.core.Init.getApplication().getNavigationBar().isVisible()) {
                    c();
                    window.MaelstromTools.Base.getInstance().initialize()
                } else window.setTimeout(b, 1e3)
            } catch (a) {
                console.log("MaelstromTools_checkIfLoaded: ", a)
            }
        }
        /commandandconquer\.com/i.test(document.domain) && window.setTimeout(b, 1e3)
    };
    try {
        var a = document.createElement("script");
        a.innerHTML = "(" + b.toString() + ")();";
        a.type = "text/javascript";
        /commandandconquer\.com/i.test(document.domain) && document.getElementsByTagName("head")[0].appendChild(a)
    } catch (c) {
        console.log("MaelstromTools: init error: ", c)
    }
})();