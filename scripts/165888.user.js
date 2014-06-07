// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Combat Simulator
// @description     Combat Simulator used to plan and strategize attack before going into battle.
// @author          Eistee
// @version         13.09.26
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
                        var qxApp = qx.core.Init.getApplication();
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
                        this.simBtn = new qx.ui.form.Button(qxApp.tr("Simulate")).set({toolTipText: qxApp.tr("Opens Simulation Screen."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this);
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119});

                        //Simulator Stats Button//
                        this.statBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81});

                        //Simulator Options Button//
                        this.optionBtn = new qx.ui.form.Button(qxApp.tr("Options")).set({toolTipText: qxApp.tr("Opens Simulator Options."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this);
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43});

                        //Simulator Layout Button//
                        this.layoutBtn = new qx.ui.form.Button(qxApp.tr("Layout")).set({toolTipText: qxApp.tr("Save/Load/Delete Unit Formations for current city."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this);
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6});

                        //Simulator Unlock Combat Button//
                        this.unlockCmtBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Combat Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this);
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 10, bottom: 8});

                        //Simulator Unlock Repair Time Button//
                        this.unlockRTBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Repair Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this);
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 10, bottom: 100});

                        //Formation Shift Buttons//
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u"); }, this);
                        this.shiftUpBtn.hide();
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113});

                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d"); }, this);
                        this.shiftDownBtn.hide();
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73});

                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l"); }, this);
                        this.shiftLeftBtn.hide();
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93});

                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r"); }, this);
                        this.shiftRightBtn.hide();
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93});

                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
                            var btnMirrorH = new qx.ui.form.Button(i, img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), width: 19, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            btnMirrorH.addListener("click", function (e) { this.mirrorFormation("h", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorH.getChildControl("icon").set({width: 16, height: 16, scale: true});
                            var shiftLeftBtn = new qx.ui.form.Button(i, img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            var shiftRightBtn = new qx.ui.form.Button(i, img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
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
                            var btnMirrorV = new qx.ui.form.Button(i, img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnMirrorV.addListener("click", function (e) { this.mirrorFormation("v", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorV.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnMirrorV.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            btnMirrorV.getChildControl("icon").set({width: 14, height: 14, scale: true});
                            var btnShiftUp = new qx.ui.form.Button(i, img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnShiftUp.addListener("click", function (e) { this.shiftFormation("u", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnShiftUp.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnShiftUp.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            var btnShiftDown = new qx.ui.form.Button(i, img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
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
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this);
                        this.mirrorBtnH.hide();
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160});

                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this);
                        this.mirrorBtnV.hide();
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160});

                        //Disable all Units Button//
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: qxApp.tr("Enables/Disables all units."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n"); }, this);
                        this.disableAllUnitsBtn.hide();
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120});

                        //Undo Button//
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: qxApp.tr("Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this);
                        this.armyUndoBtn.setEnabled(false);
                        this.armyUndoBtn.hide();
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200});

                        //Quick Save Button//
                        this.quickSaveBtn = new qx.ui.form.Button(qxApp.tr("QS")).set({toolTipText: qxApp.tr("Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent."), width: 35, height: 35, alignY: "middle", appearance: "button-text-small"});
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this);
                        this.quickSaveBtn.hide();
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240});

                        //Simulator Back Button//
                        this.backBtn = new qx.ui.form.Button(qxApp.tr("Back")).set({toolTipText: qxApp.tr("Return to Combat Setup."), width: 50, height: 24, appearance: "button-text-small"});
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this);
                        this.replayBar.add(this.backBtn, {top: 37, left: 255});

                        this.replayStatBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 50, height: 24, appearance: "button-text-small"});
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
                        try {
                            var v_shift = 0;
                            var h_shift = 0;

                            if (direction == "u") var v_shift = -1;
                            if (direction == "d") var v_shift = 1;
                            if (direction == "l") var h_shift = -1;
                            if (direction == "r") var h_shift = 1;

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
                                    var qxApp = qx.core.Init.getApplication();
                                    Simulator.getInstance().simBtn.setEnabled(true);
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("Simulate"));
                                    else
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("S"));
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
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);

                        this.set({
                            layout: new qx.ui.layout.VBox().set({
                                spacing: 0
                            }),
                            caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Stats"),
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
                        this.simStatBtn.setToolTipText(qxApp.tr("Updates Simulation Stats."));
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
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle", rich: true}),
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
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</span>");
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
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHP().toFixed(2) + "%</span>");
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
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHPrel().toFixed(2) + "%</span>");
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
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + formatTime(this.Stats.Repair.Overall.RT) + "</span>");
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
                            ClientLib.Vis.VisMain.GetInstance().get_Battleground().Reset();
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
                        if (battleground.get_Simulation() !== null) sim.Stats.Battle.Duration = battleground.get_Replay().m_CombatSteps * battleground.get_TimePerStep();
                        else setTimeout(function () {
                            Simulator.StatWindow.getInstance().getBattleDuration(sim);
                        }, 10);
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
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox(5));
                    this.addListener("resize", function () {
                        this.center();
                    }, this);

                    this.set({
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("tnf:options"),
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    var genPage = new qx.ui.tabview.Page(qxApp.tr("tnf:general"));
                    genLayout = new qx.ui.layout.VBox(5);
                    genPage.setLayout(genLayout);

                    //Add General Page Items
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    buttonsHeader.setThemedFont("bold");
                    var buttonsTitle = new qx.ui.basic.Label(qxApp.tr("Buttons:"));
                    buttonsHeader.add(buttonsTitle);
                    genPage.add(buttonsHeader);

                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._buttonLocCB = new qx.ui.form.CheckBox(qxApp.tr("Right Side"));
                    this._buttonSizeCB = new qx.ui.form.CheckBox(qxApp.tr("Normal Size"));
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

                    this._disableRTBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Repair Button"));
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
                    if (localStorage['isRTBtnDisabled'] !== undefined && localStorage['isRTBtnDisabled'] == "no") this._disableRTBtnCB.setValue(false);
                    else this._disableRTBtnCB.setValue(true);

                    this._disableCmtBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Combat Button"));
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
                    if (localStorage['isCmtBtnDisabled'] !== undefined && localStorage['isCmtBtnDisabled'] == "no") this._disableCmtBtnCB.setValue(false);
                    else this._disableCmtBtnCB.setValue(true);

                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox(qxApp.tr("Disable Army Unit Tooltip"));
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
                    var simulatorTitle = new qx.ui.basic.Label(qxApp.tr("Simulator") + ":");
                    simulatorHeader.add(simulatorTitle);
                    genPage.add(simulatorHeader);

                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoSimulateCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Start Simulation"));

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

                    var statsPage = new qx.ui.tabview.Page(qxApp.tr("Stats"));
                    statsLayout = new qx.ui.layout.VBox(5);
                    statsPage.setLayout(statsLayout);

                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    statWindowHeader.setThemedFont("bold");
                    var statWindowTitle = new qx.ui.basic.Label(qxApp.tr("Stats Window:"));
                    statWindowHeader.add(statWindowTitle);
                    statsPage.add(statWindowHeader);

                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoOpenCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Open"));
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
                    var simViewsTitle = new qx.ui.basic.Label(qxApp.tr("Simulations shown"));
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
                    var hideSecTitle = new qx.ui.basic.Label(qxApp.tr("Hide Sections (on Startup):"));
                    hideSecHeader.add(hideSecTitle);
                    statsPage.add(hideSecHeader);

                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._hideHealthCB = new qx.ui.form.CheckBox(qxApp.tr("Health"));
                    this._hideRepairCB = new qx.ui.form.CheckBox(qxApp.tr("Repair"));
                    this._hideLootCB = new qx.ui.form.CheckBox(qxApp.tr("Loot"));
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
                    var statPosTitle = new qx.ui.basic.Label(qxApp.tr("Set Stat Window Position:")).set({alignY: "middle"});
                    statPosTitle.setFont("bold");
                    var statPosBtn = new qx.ui.form.Button(qxApp.tr("Set")).set({allowGrowX: false, allowGrowY: false, height: 20});
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
                            Simulator.getInstance().unlockRTBtn.show();
                        else
                            Simulator.getInstance().unlockRTBtn.hide();
                    },

                    setCmtBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockCmtBtn.show();
                        else
                            Simulator.getInstance().unlockCmtBtn.hide();
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
                            var qxApp = qx.core.Init.getApplication();
                            value = this._buttonSizeCB.getValue();

                            if (value == true) {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("Simulate"));
                                Simulator.getInstance().simBtn.setWidth(60);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("Stats"));
                                Simulator.getInstance().statBtn.setWidth(60);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("Options"));
                                Simulator.getInstance().optionBtn.setWidth(60);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("Layout"));
                                Simulator.getInstance().layoutBtn.setWidth(60);
                            } else {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("S"));
                                Simulator.getInstance().simBtn.setWidth(30);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("I"));
                                Simulator.getInstance().statBtn.setWidth(30);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("O"));
                                Simulator.getInstance().optionBtn.setWidth(30);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("L"));
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
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox());

                    this.set({
                        width: 200,
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Layouts"),
                        padding: 2,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });

                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
                        decorator: "pane-light-opaque"
                    });
                    var layoutListTitle = new qx.ui.basic.Label(qxApp.tr("Formation Saver")).set({alignX: "center", alignY: "top", font: "font_size_14_bold"});
                    layoutListHeader.add(layoutListTitle);
                    this.add(layoutListHeader);

                    this.layoutList = new qx.ui.form.List();
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5});
                    this.add(this.layoutList);

                    var listButtonBox = new qx.ui.container.Composite();
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center");
                    listButtonBox.setLayout(listButtonLayout);
                    var loadButton = new qx.ui.form.Button(qxApp.tr("Load"));
                    var deleteButton = new qx.ui.form.Button(qxApp.tr("Delete"));
                    loadButton.set({height: 15, width: 70, alignX: "center"});
                    loadButton.addListener("click", this.loadLayout, this);
                    deleteButton.set({height: 15, width: 70, alignX: "center"});
                    deleteButton.addListener("click", this.deleteLayout, this);
                    listButtonBox.add(loadButton);
                    listButtonBox.add(deleteButton);
                    this.add(listButtonBox);

                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
                    var saveButton = new qx.ui.form.Button(qxApp.tr("Save"));
                    saveButton.set({height: 10, width: 70, alignX: "center"});
                    saveButton.addListener("click", this.saveNewLayout, this);
                    saveLayoutBox.add(this.layoutTextBox);
                    saveLayoutBox.add(saveButton);
                    this.add(saveLayoutBox);

                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
                    this.persistentCheck = new qx.ui.form.CheckBox(qxApp.tr("Make Persistent"));
                    this.persistentCheck.setTextColor("white");
                    this.persistentCheck.setFont("bold");
                    this.persistentCheck.setToolTipText(qxApp.tr("If checked, formation will be saved and can be used by this city in any other city."));
                    checkBox.add(this.persistentCheck);
                    this.add(checkBox);

                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
                    var clearAllLayoutsBtn = new qx.ui.form.Button(qxApp.tr("Clear All")).set({alignX: "center", width: 70});
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
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German (incomplete)
            localeManager.addTranslation("de", {
                "Simulator": "Simulator",
                "S": "S",
                "Simulate": "Simulate",
                "Opens Simulation Screen.": "Startet die Simulation",
                "I": "I",
                "Stats": "Statistik",
                "Opens Simulator Stats Window.": "Öffnet das Statistikfenster.",
                "O": "O",
                "Options": "Options",
                "Opens Simulator Options.": "Öffnet das Optionsfenster.",
                "L": "L",
                "Layout": "Layout",
                "Save/Load/Delete Unit Formations for current city.": "Speichern/Laden/Löschen von Formationen für den aktuellen Gegner",
                "Unlock": "Unlock",
                "Unlock Combat Button.": "Entsperrt die Angriffsschaltfläche.",
                "Unlock Repair Button.": "Entsperrt die Reparaturschaltfläche.",
                "Shifts units one space up.": "Verschiebt Einheiten einen Platz nach oben.",
                "Shifts units one space down.": "Verschiebt die Einheiten einen Platz nach unten.",
                "Shifts units one space left.": "Verschiebt die Einheiten einen Platz nach links.",
                "Shifts units one space right.": "Verschiebt die Einheiten einen Platz nach rechts.",
                "Mirrors units horizontally.": "Spiegelt die Einheiten horizontal.",
                "Mirrors units vertically.": "Spiegelt die Einheiten vertikal.",
                "Enables/Disables all units.": "Alle Einheiten de-/aktivieren.",
                "Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.": "Setzt die Formation auf die vorher gespeicherte zurück.<br>Formationen werden gespeichert,<br>wenn man auf Simulieren oder Aktualisieren drückt.",
                "QS": "QS",
                "Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.": "Speichert die aktuelle Formation,<br>ohne das das Formationsfenster<br>geöffnet werden muss.",
                "Back": "zurück",
                "Return to Combat Setup.": "Zurück zum Angriffsbildschirm.",
                "Updates Simulation Stats.": "Aktualisiert die Statistik.",
                "Buttons:": "Schaltflächen:",
                "Right Side": "Rechte Seite",
                "Normal Size": "Normale Größe",
                "Disable Repair Button": "Sperre Reparatur-Schaltfläche",
                "Disable Combat Button": "Sperre Angriffs-Schaltfläche",
                "Disable Army Unit Tooltip": "Deaktiviere Einheiten Tooltips",
                "Auto Start Simulation": "Simulation automatisch starten",
                "Stats Window:": "Statistik Fenster:",
                "Auto Open": "Automatisch öffnen",
                "Simulations shown": "Anzuzeigende Simulationen",
                "Hide Sections (on Startup):": "Verstecke Bereich (beim starten):",
                "Health": "Health",
                "Repair": "Repair",
                "Loot": "Loot",
                "Set Stat Window Position:": "Setze die Statistikfenster Position:",
                "Set": "setzen",
                "Layouts": "Layouts",
                "Formation Saver": "Formationen speichern",
                "Load": "Laden",
                "Delete": "Löschen",
                "Save": "Speichern",
                "Make Persistent": "Dauerhaft",
                "If checked, formation will be saved and can be used by this city in any other city.": "Wenn angewählt kann die Formation für andere Gegner verwendet werden.",
                "Clear All": "Lösche alle"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loading");
                            translation();
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