// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Позволяет моделировать битвы без растрат.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.4.1.6
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, MrHIDEn, TheStriker, JDuarteDJ Русификация nikimiry
// @require        http://sizzlemctwizzle.com/updater.php?id=138212
// ==/UserScript==
(function () {
    var e = function () {
        function e(e, t) {
            return e - t;
        }
        function t(t) {
            t.sort(e);
            for (var n = 1; n < t.length; n++) {
                t[n] === t[n - 1] && t.splice(n--, 1);
            }
            return t;
        }
        function n() {
            var e = {};
            qx.Class.define("TASuite.main", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    mn: {
                        mnn: {
                            layout: {
                                mmnmm: null,
                                load: null
                            },
                            mnnn: null,
                            unlock: null,
                            mmnnn: null
                        },
                        mnnn: {
                            back: null
                        },
                        mnmnnm: null,
                        mnnmmm: null,
                        mnmnnn: null,
                        mnmnmn: null
                    },
                    mm: {
                        nmn: {
                            mnmmn: null,
                            mnmnm: null,
                            mnnmm: null,
                            mnmm: null
                        },
                        nmm: {
                            mmnm: null,
                            mmmn: null,
                            mmmm: null,
                            overall: null
                        },
                        nnm: {
                            mmnm: null,
                            mmmn: null,
                            mmmm: null,
                            overall: null
                        },
                        nm: {
                            units: {
                                overall: null
                            },
                            mmm: {
                                nmmm: null,
                                nmmn: null,
                                mnnm: null,
                                nnnm: null,
                                overall: null
                            },
                            overall: null
                        },
                        mnmn: null,
                        nmnm: null
                    },
                    nn: {
                        nmm: {
                            mmnm: null,
                            mmmn: null,
                            mmmm: null,
                            overall: null
                        },
                        nm: {
                            units: {
                                overall: null
                            },
                            mmm: {
                                nmmm: null,
                                nmmn: null,
                                mnnm: null,
                                nnnm: null,
                                overall: null
                            },
                            overall: null,
                            mmmnn: null
                        },
                        mnmn: null,
                        nmnm: null
                    },
                    mnm: {
                        nnnmm: null,
                        mnnnm: null,
                        mnmnmm: null,
                        nnmnm: null,
                        mnmnn: null,
                        mmmmm: null,
                        mmnn: null
                    },
                    mmn: {
                        label: null,
                        nnmm: null,
                        all: null,
                        current: null,
                        nmmmm: null
                    },
                    options: {
                        nnnn: null,
                        nnmn: null
                    },
                    nmmnm: null,
                    nmmmn: null,
                    nnn: null,
                    mmmmn: null,
                    mnmmnn: function (e) {
                        try {
                            this.mmmmn = new qx.ui.tabview.Page("Статистика"), this.mmmmn.setLayout(new qx.ui.layout.VBox(1)), e.add(this.mmmmn);
                            var t = new qx.ui.container.Composite,
                                n = new qx.ui.layout.Grid;
                            n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), this.mmmmn.add(t), t.add(new qx.ui.basic.Label("Вражеская база:"), {
                                row: 0,
                                column: 0
                            }), this.nn.nm.overall = new qx.ui.basic.Label("100"), t.add(this.nn.nm.overall, {
                                row: 0,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Оборона:"), {
                                row: 1,
                                column: 0
                            }), this.nn.nm.units.overall = new qx.ui.basic.Label("100"), t.add(this.nn.nm.units.overall, {
                                row: 1,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Здания:"), {
                                row: 2,
                                column: 0
                            }), this.nn.nm.mmm.overall = new qx.ui.basic.Label("100"), t.add(this.nn.nm.mmm.overall, {
                                row: 2,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Строительный цех:"), {
                                row: 3,
                                column: 0
                            }), this.nn.nm.mmm.nmmm = new qx.ui.basic.Label("100"), t.add(this.nn.nm.mmm.nmmm, {
                                row: 3,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Штаб обороны:"), {
                                row: 4,
                                column: 0
                            }), this.nn.nm.mmm.nmmn = new qx.ui.basic.Label("100"), t.add(this.nn.nm.mmm.nmmn, {
                                row: 4,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Командный центр:"), {
                                row: 5,
                                column: 0
                            }), this.nn.nm.mmm.mnnm = new qx.ui.basic.Label("100"), t.add(this.nn.nm.mmm.mnnm, {
                                row: 5,
                                column: 1
                            }), this.nn.nmnm = new qx.ui.basic.Label(""), t.add(this.nn.nmnm, {
                                row: 6,
                                column: 0
                            }), this.nn.nm.mmm.nnnm = new qx.ui.basic.Label(""), t.add(this.nn.nm.mmm.nnnm, {
                                row: 6,
                                column: 1
                            }), t = new qx.ui.container.Composite, n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), this.mmmmn.add(t), t.add(new qx.ui.basic.Label("Всего:"), {
                                row: 0,
                                column: 0
                            }), this.nn.nmm.overall = new qx.ui.basic.Label("100"), t.add(this.nn.nmm.overall, {
                                row: 0,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Пехота:"), {
                                row: 1,
                                column: 0
                            }), this.nn.nmm.mmnm = new qx.ui.basic.Label("100"), t.add(this.nn.nmm.mmnm, {
                                row: 1,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Техника:"), {
                                row: 2,
                                column: 0
                            }), this.nn.nmm.mmmn = new qx.ui.basic.Label("100"), t.add(this.nn.nmm.mmmn, {
                                row: 2,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Авиация:"), {
                                row: 3,
                                column: 0
                            }), this.nn.nmm.mmmm = new qx.ui.basic.Label("100"), t.add(this.nn.nmm.mmmm, {
                                row: 3,
                                column: 1
                            }), t = new qx.ui.container.Composite, n = new qx.ui.layout.Grid, n.setColumnAlign(1, "right", "middle"), n.setColumnFlex(0, 1), t.setLayout(n), t.setThemedFont("bold"), t.setThemedBackgroundColor("#eef"), this.mmmmn.add(t), t.add(new qx.ui.basic.Label("Итог:"), {
                                row: 0,
                                column: 0
                            }), this.nn.nm.mmmnn = new qx.ui.basic.Label("Неизвестно"), t.add(this.nn.nm.mmmnn, {
                                row: 0,
                                column: 1
                            }), t.add(new qx.ui.basic.Label("Время битвы:"), {
                                row: 1,
                                column: 0
                            }), this.nn.mnmn = new qx.ui.basic.Label("120"), t.add(this.nn.mnmn, {
                                row: 1,
                                column: 1
                            });
                        } catch (r) {
                            console.log(r);
                        }
                    },
                    mnmmnm: function (e) {
                        try {
                            var t = new qx.ui.tabview.Page("Расстановки");
                            t.setLayout(new qx.ui.layout.VBox), e.add(t), this.mmn.nnmm = new qx.ui.form.List, this.mmn.nnmm.set({
                                height: 150,
                                selectionMode: "one"
                            }), t.add(this.mmn.nnmm);
                            var n = new qx.ui.container.Composite;
                            n.setLayout(new qx.ui.layout.HBox(5)), this.mn.mnn.layout.load = new qx.ui.form.Button("Загрузить"), this.mn.mnn.layout.load.set({
                                width: 80,
                                appearance: "button-text-small",
                                toolTipText: "Загрузить сохранённую расстановку."
                            }), this.mn.mnn.layout.load.addListener("click", this.mmnnnm, this), n.add(this.mn.mnn.layout.load), this.buttonLayoutDelete = new qx.ui.form.Button("Удалить"), this.buttonLayoutDelete.set({
                                width: 80,
                                appearance: "button-text-small",
                                toolTipText: "Удалить сохранённую расстановку."
                            }), this.buttonLayoutDelete.addListener("click", this.mmnnmn, this), n.add(this.buttonLayoutDelete), t.add(n);
                            var r = new qx.ui.container.Composite;
                            r.setLayout(new qx.ui.layout.VBox(1)), r.setThemedFont("bold"), r.setThemedPadding(2), r.setThemedBackgroundColor("#eef");
                            var i = new qx.ui.container.Composite;
                            i.setLayout(new qx.ui.layout.HBox(5)), i.add(new qx.ui.basic.Label("Имя: ")), this.mmn.label = new qx.ui.form.TextField, i.add(this.mmn.label), r.add(i), this.mn.mnn.layout.mmnmm = new qx.ui.form.Button("Сохранить"), this.mn.mnn.layout.mmnmm.set({
                                width: 80,
                                appearance: "button-text-small",
                                toolTipText: "Сохранить расстановку."
                            }), this.mn.mnn.layout.mmnmm.addListener("click", this.mmnmnn, this), r.add(this.mn.mnn.layout.mmnmm), t.add(r);
                        } catch (s) {
                            console.log(s);
                        }
                    },
                    mmnmnm: function (e) {
                        try {
                            var t = new qx.ui.tabview.Page("Информация");
                            t.setLayout(new qx.ui.layout.VBox(1)), e.add(t);
                            var n = new qx.ui.container.Composite;
                            n.setLayout(new qx.ui.layout.VBox(1)), n.setThemedFont("bold"), n.setThemedPadding(2), n.setThemedBackgroundColor("#eef"), t.add(n);
                            var r = (new qx.ui.basic.Label).set({
                                value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/138212'>Обсуждение</a> (англ)",
                                rich: true
                            });
                            n.add(r);
                            var i = new qx.ui.container.Composite;
                            i.setLayout(new qx.ui.layout.VBox(1)), i.setThemedFont("bold"), i.setThemedPadding(2), i.setThemedBackgroundColor("#eef"), t.add(i), i.add(new qx.ui.basic.Label("Добыча")), this.mm.nmn.mnmmn = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png"), i.add(this.mm.nmn.mnmmn), this.mm.nmn.mnmnm = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png"), i.add(this.mm.nmn.mnmnm), this.mm.nmn.mnnmm = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png"), i.add(this.mm.nmn.mnnmm), this.mm.nmn.mnmm = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png"), i.add(this.mm.nmn.mnmm);
                            var s = new qx.ui.container.Composite;
                            s.setLayout(new qx.ui.layout.VBox(1)), s.setThemedFont("bold"), s.setThemedPadding(2), s.setThemedBackgroundColor("#eef"), t.add(s), s.add(new qx.ui.basic.Label("Настройки:")), this.options.nnnn = new qx.ui.form.CheckBox("Автоматически показывать окно");
                            var o = localStorage.ta_sim_popup;
                            o ? (o = JSON.parse(localStorage.ta_sim_popup), this.options.nnnn.setValue(o)) : this.options.nnnn.setValue(true), this.options.nnnn.addListener("click", this.mmmmnn, this), s.add(this.options.nnnn), this.options.nnmn = new qx.ui.form.CheckBox("Показывать панель перемещения");
                            var o = localStorage.ta_sim_showShift;
                            o ? (o = JSON.parse(localStorage.ta_sim_showShift), this.options.nnmn.setValue(o)) : this.options.nnmn.setValue(true), this.options.nnmn.addListener("click", this.mmmnmm, this), s.add(this.options.nnmn), this.nnn.add(e);
                        } catch (u) {
                            console.log(u);
                        }
                    },
                    mnmmmn: function () {
                        try {
                            if (typeof CCTAWrapper_IsInstalled == "undefined" || !CCTAWrapper_IsInstalled) {
                                alert("Необходимо установить скрипт 'C&C TA Wrapper' !\r\nОтмена операции...");
                                return;
                            }
                            this.mnm.nnmnm = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.mmnnmm), this.mnm.mnmnn = (new System.EventHandler).$ctor(this, this.nnmmn), this.mn.mnn.mnnn = new qx.ui.form.Button("Проба"), this.mn.mnn.mnnn.set({
                                width: 58,
                                appearance: "button-text-small",
                                toolTipText: "Смоделировать бой"
                            }), this.mn.mnn.mnnn.addListener("click", this.mmmnnm, this), this.mn.mnnn.back = new qx.ui.form.Button("Настройка"), this.mn.mnnn.back.set({
                                width: 80,
                                appearance: "button-text-small",
                                toolTipText: "Вернуться к настройкам"
                            }), this.mn.mnnn.back.addListener("click", this.mmnnnn, this);
                            var e = qx.core.Init.getApplication().getReportReplayOverlay();
                            e.add(this.mn.mnnn.back, {
                                top: 10,
                                left: 0
                            });
                            var t = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                            this.mn.mnn.unlock = new qx.ui.form.Button("Готов"), this.mn.mnn.unlock.set({
                                width: 55,
                                height: 46,
                                appearance: "button-text-small",
                                toolTipText: "Разблокировать кнопку атаки"
                            }), this.mn.mnn.unlock.addListener("click", this.mnmmmm, this), this.mn.mnn.unlock.setOpacity(0.5), t.add(this.mn.mnn.unlock, {
                                top: 107,
                                right: 4
                            }), this.mn.mnn.mmnnn = new qx.ui.form.Button("Отчёт"), this.mn.mnn.mmnnn.set({
                                width: 58,
                                appearance: "button-text-small",
                                toolTipText: "Открыть анализ повреждений"
                            }), this.mn.mnn.mmnnn.addListener("click", this.mmnmmn, this), this.mn.ShiftFormationLeft = new qx.ui.form.Button("<"), this.mn.ShiftFormationLeft.set({
                                width: 30,
                                appearance: "button-text-small",
                                toolTipText: "влево"
                            }), this.mn.ShiftFormationLeft.addListener("click", function () {
                                this.mnmmm("l");
                            }, this), this.mn.ShiftFormationRight = new qx.ui.form.Button(">"), this.mn.ShiftFormationRight.set({
                                width: 30,
                                appearance: "button-text-small",
                                toolTipText: "вправо"
                            }), this.mn.ShiftFormationRight.addListener("click", function () {
                                this.mnmmm("r");
                            }, this), this.mn.ShiftFormationUp = new qx.ui.form.Button("^"), this.mn.ShiftFormationUp.set({
                                width: 30,
                                appearance: "button-text-small",
                                toolTipText: "вверх"
                            }), this.mn.ShiftFormationUp.addListener("click", function () {
                                this.mnmmm("u");
                            }, this), this.mn.ShiftFormationDown = new qx.ui.form.Button("v"), this.mn.ShiftFormationDown.set({
                                width: 30,
                                appearance: "button-text-small",
                                toolTipText: "вниз"
                            }), this.mn.ShiftFormationDown.addListener("click", function () {
                                this.mnmmm("d");
                            }, this);
                            var n = localStorage.ta_sim_showShift;
                            n ? (n = JSON.parse(localStorage.ta_sim_showShift)) : (n = true), n && (t.add(this.mn.ShiftFormationUp, {
                                top: 21,
                                right: 77
                            }), t.add(this.mn.ShiftFormationLeft, {
                                top: 40,
                                right: 92
                            }), t.add(this.mn.ShiftFormationRight, {
                                top: 40,
                                right: 62
                            }), t.add(this.mn.ShiftFormationDown, {
                                top: 55,
                                right: 77
                            }));
                            var r = ClientLib.Data.CityPreArmyUnit.prototype;
                            r.set_Enabled_Original || (r.set_Enabled_Original = r.set_Enabled), r.set_Enabled = function (e) {
                                this.set_Enabled_Original(e), window.TASuite.main.getInstance().nnmmn();
                            }, ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(this.mnm.nnmnm), this.mmmmnm(), t.add(this.mn.mnn.mmnnn, {
                                top: 74,
                                right: 62
                            }), t.add(this.mn.mnn.mnnn, {
                                top: 112,
                                right: 62
                            }), this.nnn = (new qx.ui.window.Window("Моделирование битвы", "FactionUI/icons/icon_loading_logo.gif")).set({
                                contentPaddingTop: 0,
                                contentPaddingBottom: 2,
                                contentPaddingRight: 2,
                                contentPaddingLeft: 6,
                                showMaximize: false,
                                showMinimize: false
                            }), this.nnn.getChildControl("icon").set({
                                scale: true,
                                width: 25,
                                height: 25
                            }), this.nnn.setLayout(new qx.ui.layout.HBox), this.nnn.moveTo(125, 125), this.nnn.addListener("beforeClose", function () {
                                window.TASuite.main.getInstance().mnnmn();
                            });
                            var i = (new qx.ui.tabview.TabView).set({
                                contentPaddingTop: 3,
                                contentPaddingBottom: 6,
                                contentPaddingRight: 7,
                                contentPaddingLeft: 3
                            });
                            this.nnn.add(i), this.mnmmnn(i), this.mnmmnm(i), this.mmnmnm(i);
                        } catch (s) {
                            console.log(s);
                        }
                    },
                    nmnnn: function () {
                        try {
                            var e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),
                                t = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
                                n = t.get_Id(),
                                r = e.get_CityArmyFormationsManager().GetFormationByTargetBaseId(n);
                            this.mnm.mmmmm !== null && this.mnnmn(), this.mnm.mmmmm = r, this.mnm.mmnn = r.get_ArmyUnits().l;
                        } catch (i) {
                            console.log(i);
                        }
                    },
                    mmmmnn: function () {
                        localStorage.ta_sim_popup = JSON.stringify(this.options.nnnn.getValue());
                    },
                    mmmnmm: function () {
                        localStorage.ta_sim_showShift = JSON.stringify(this.options.nnmn.getValue());
                        var e = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        this.options.nnmn.getValue() ? (e.add(this.mn.ShiftFormationUp, {
                            top: 21,
                            right: 77
                        }), e.add(this.mn.ShiftFormationLeft, {
                            top: 40,
                            right: 92
                        }), e.add(this.mn.ShiftFormationRight, {
                            top: 40,
                            right: 62
                        }), e.add(this.mn.ShiftFormationDown, {
                            top: 55,
                            right: 77
                        })) : (e.remove(this.mn.ShiftFormationUp), e.remove(this.mn.ShiftFormationLeft), e.remove(this.mn.ShiftFormationRight), e.remove(this.mn.ShiftFormationDown));
                    },
                    mmnmmn: function () {
                        this.nnn.isVisible() ? this.nmnmm() : this.nnmmm();
                    },
                    nnnnn: function () {
                        try {
                            var e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
                                t = 0,
                                n, r = {
                                    1: 0,
                                    2: 0,
                                    3: 0,
                                    6: 0,
                                    7: 0
                                };
                            if (e.get_CityBuildingsData().get_Buildings() !== null) {
                                t = e.get_CityBuildingsData().get_Buildings().l.length;
                                var i;
                                for (var s = t; --s >= 0;) {
                                    i = e.get_CityBuildingsData().get_Buildings().l[s], n = i.get_HitpointsPercent();
                                    for (var o = i.get_UnitLevelRepairCost().length; --o >= 0;) {
                                        r[i.get_UnitLevelRepairCost()[o].Type] += n * i.get_UnitLevelRepairCost()[o].Count;
                                    }
                                }
                            }
                            if (e.get_CityUnitsData().get_DefenseUnits() !== null) {
                                t = e.get_CityUnitsData().get_DefenseUnits().l.length;
                                var u;
                                for (s = t; --s >= 0;) {
                                    u = e.get_CityUnitsData().get_DefenseUnits().l[s], n = u.get_HitpointsPercent();
                                    for (o = u.get_UnitLevelRepairCost().length; --o >= 0;) {
                                        r[u.get_UnitLevelRepairCost()[o].Type] += n * u.get_UnitLevelRepairCost()[o].Count;
                                    }
                                }
                            }
                            this.mm.nmn.mnmmn.setLabel(this.mmnmn(r[1])), this.mm.nmn.mnmnm.setLabel(this.mmnmn(r[2])), this.mm.nmn.mnnmm.setLabel(this.mmnmn(r[3])), this.mm.nmn.mnmm.setLabel(this.mmnmn(r[6]));
                        } catch (a) {
                            console.log(a);
                        }
                    },
                    mmmnm: function (e, t) {
                        try {
                            if (qx.core.Init.getApplication().getPlayArea().getViewMode() !== webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatViewerAttacker) {
                                var n = this.nnmnn(this.mnm.mmmmm);
                                while (n.get_Simulation().DoStep(false)) {}
                                this.mmnmmm(n), t && this.nnnnn(), e && this.mmmnnn();
                            }
                        } catch (r) {
                            console.log(r);
                        }
                    },
                    nnmmn: function (e, t) {
                        try {
                            this.nnn.isVisible() && !this.mmn.nmmmm && window.TASuite.main.getInstance().mmmnm(true);
                        } catch (t) {
                            console.log(t);
                        }
                    },
                    nmmnn: function (e, t, n, r) {
                        if (n >= 1) {
                            return 0;
                        }
                        var i = e.length,
                            s;
                        while (i--) {
                            s = e[i];
                            if (s.Type == t) {
                                return r.ConvertRepairCost(s.Type, s.Count, 1 - n);
                            }
                        }
                        return 0;
                    },
                    mmnmmm: function (e) {
                        try {
                            e = e ? e : ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                            var t = 0,
                                n = 0,
                                r = 0,
                                i = 0,
                                s = 0,
                                o = 0,
                                u = 0,
                                a = 0,
                                f = 0,
                                l = 0,
                                c = 0,
                                h = 0,
                                p = 0,
                                d = 0;
                            this.mm.nm.mmm.nmmn = 0, this.mm.nm.mmm.nmmm = 0, this.mm.nm.mmm.mnnm = 0, this.mm.nmnm = 0, this.mm.nm.mmm.nnnm = 0, this.mm.nnm.mmnm = 0, this.mm.nnm.mmmn = 0, this.mm.nnm.mmmm = 0;
                            var v = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),
                                m = v.get_CityRepairData(),
                                g = ClientLib.Res.ResMain.GetInstance().GetGamedata().units,
                                y = e.get_Entities().d,
                                b, w, E, S, x, T, N = 0,
                                C = 0,
                                k = 0;
                            for (var L in y) {
                                b = y[L], w = b.get_Entity(), E = g[w.get_MDCTypeId()];
                                if (E.r.length <= 1) {
                                    continue;
                                }
                                S = w.get_iHitpointsCurrent(), x = w.get_iHitpoints(), T = ClientLib.Base.Util.GetUnitLevelData(w.get_iLevel(), E);
                                if (w.get_eAlignment() == 1) {
                                    n += S, t += x;
                                    switch (E.mt) {
                                    case ClientLib.Base.EUnitMovementType.Air:
                                    case ClientLib.Base.EUnitMovementType.Air2:
                                        c += S, p += x, k += this.nmmnn(T, ClientLib.Base.EResourceType.RepairChargeAir, S / x, m);
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Feet:
                                        f += S, d += x, N += this.nmmnn(T, ClientLib.Base.EResourceType.RepairChargeInf, S / x, m);
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Track:
                                    case ClientLib.Base.EUnitMovementType.Wheel:
                                        l += S, h += x, C += this.nmmnn(T, ClientLib.Base.EResourceType.RepairChargeVeh, S / x, m);
                                        break;
                                    default:
                                        ;
                                    }
                                } else {
                                    r += x, i += S;
                                    if (w.get_MDCTypeId() >= 200 && w.get_MDCTypeId() <= 205) {
                                        this.mm.nmnm = w.get_iLevel(), this.mm.nm.mmm.nnnm = S / x * 100;
                                    } else {
                                        switch (w.get_MDCTypeId()) {
                                        case 112:
                                        case 151:
                                        case 177:
                                            this.mm.nm.mmm.nmmm = S / x * 100;
                                            break;
                                        case 158:
                                        case 131:
                                        case 195:
                                            this.mm.nm.mmm.nmmn = S / x * 100;
                                            break;
                                        case 111:
                                        case 159:
                                            this.mm.nm.mmm.mnnm = S / x * 100;
                                            break;
                                        default:
                                            ;
                                        }
                                    }
                                    switch (E.mt) {
                                    case ClientLib.Base.EUnitMovementType.Structure:
                                        s += x, o += S;
                                        break;
                                    default:
                                        u += x, a += S;
                                    }
                                }
                            }
                            this.mm.nmm.mmnm = d ? f / d * 100 : 100, this.mm.nmm.mmmn = h ? l / h * 100 : 100, this.mm.nmm.mmmm = p ? c / p * 100 : 100, this.mm.mnmn = e.get_Simulation().get_iCombatStep() * e.get_TimePerStep() / 1000, this.mm.nm.units.overall = a / u * 100, this.mm.nm.mmm.overall = o / s * 100, this.mm.nm.overall = i / r * 100, this.mm.nmm.overall = n ? n / t * 100 : 0, this.mm.nnm.mmnm = N, this.mm.nnm.mmmm = k, this.mm.nnm.mmmn = C, this.mm.nnm.overall = Math.max(this.mm.nnm.mmmn, this.mm.nnm.mmmm, this.mm.nnm.mmnm);
                        } catch (A) {
                            console.log(A);
                        }
                    },
                    mnnnn: function (e, t, n) {
                        var r = ["green", "blue", "black", "red"],
                            i = r[0],
                            s = t;
                        n >= 0 && (s = 100 - s), s > 99.99 ? (i = r[3]) : s > 50 ? (i = r[2]) : s > 0 && (i = r[1]), e.setTextColor(i);
                    },
                    nmnn: function (e, t, n) {
                        this.mnnnn(e, t, n), e.setValue(t.toFixed(2).toString());
                    },
                    mmnnm: function (e, t, n, r) {
                        var i = t.toFixed(2).toString() + " @ ";
                        i += this.mmmnmn(r, "h:mm:ss"), this.mnnnn(e, t, n), e.setValue(i);
                    },
                    mmmnnn: function () {
                        var e = ["black", "blue", "green", "red"],
                            t = "",
                            n = 0;
                        this.mm.nm.mmm.nmmm === 0 ? (t = "Полная победа!", n = 0) : this.mm.nm.mmm.overall < 100 ? (t = "Победа", n = 1) : (t = "Полное поражение", n = 3), this.nn.nm.mmmnn.setValue(t), this.nn.nm.mmmnn.setTextColor(e[n]), this.nmnn(this.nn.nm.overall, this.mm.nm.overall, - 1), this.nmnn(this.nn.nm.units.overall, this.mm.nm.units.overall, - 1), this.nmnn(this.nn.nm.mmm.overall, this.mm.nm.mmm.overall, - 1), this.nmnn(this.nn.nm.mmm.nmmm, this.mm.nm.mmm.nmmm, - 1), this.nmnn(this.nn.nm.mmm.nmmn, this.mm.nm.mmm.nmmn, - 1), this.mnm.nnnmm ? this.nmnn(this.nn.nm.mmm.mnnm, this.mm.nm.mmm.mnnm, - 1) : (this.nn.nm.mmm.mnnm.setValue("--"), this.nn.nm.mmm.mnnm.setTextColor("green"));
						//..r + 
                        this.nn.nmnm.setValue("Поддержка " + ": "), this.nmnn(this.nn.nm.mmm.nnnm, this.mm.nm.mmm.nnnm, - 1), this.mmnnm(this.nn.nmm.overall, this.mm.nmm.overall, 1, this.mm.nnm.overall), this.mmnnm(this.nn.nmm.mmnm, this.mm.nmm.mmnm, 1, this.mm.nnm.mmnm), this.mmnnm(this.nn.nmm.mmmn, this.mm.nmm.mmmn, 1, this.mm.nnm.mmmn), this.mmnnm(this.nn.nmm.mmmm, this.mm.nmm.mmmm, 1, this.mm.nnm.mmmm), this.mnnnn(this.nn.mnmn, this.mm.mnmn / 120, - 1), this.nn.mnmn.setValue(this.mm.mnmn.toFixed(2).toString());
Поддержка
                        var r = this.mm.nmnm > 0 ? this.mm.nmnm.toString() : "--";
                    },
                    mmnmn: function (e) {
                        return Math.floor(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                    mmmnmn: function (e, t) {
                        var n = Math.floor(e / 3600),
                            r = Math.floor((e - n * 3600) / 60),
                            i = Math.floor(e - n * 3600 - r * 60);
                        n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), i < 10 && (i = "0" + i);
                        if (t !== null) {
                            var s = t.replace("hh", n);
                            return s = s.replace("h", n * 1 + ""), s = s.replace("mm", r), s = s.replace("m", r * 1 + ""), s = s.replace("ss", i), s = s.replace("s", i * 1 + ""), s;
                        }
                        return n + ":" + r + ":" + i;
                    },
                    nnmmm: function () {
                        this.nmnnn(), this.nmnmn(), this.nmnnm(), this.mmmnm(true, true), this.nnn.open();
                    },
                    nmnmm: function () {
                        this.nnn.close();
                    },
                    mnmmmm: function () {
                        var e = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                        e.remove(this.mn.mnn.unlock);
                        var t = this;
                        setTimeout(function () {
                            e.add(t.mn.mnn.unlock);
                        }, 2000);
                    },
                    mnnmn: function () {
                        try {
                            this.mnm.mmmmm.remove_ArmyChanged(this.mnm.mnmnn);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    nmnnm: function () {
                        try {
                            this.mnm.mmmmm.add_ArmyChanged(this.mnm.mnmnn);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    mmnnmm: function (e, t) {
                        try {
                            var n = this.mnm.mnnnm;
                            this.mnm.mnnnm = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() === ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var r = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction();
                            this.mnm.nnnmm = r === ClientLib.Base.EFactionType.GDIFaction || r === ClientLib.Base.EFactionType.NODFaction;
                            if (!n && e === webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense && t !== webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense) {
                                this.nnn.isVisible() && this.nmnmm();
                                return;
                            }
                            if (!this.mnm.mnnnm && t === webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense && qx.core.Init.getApplication().getPlayArea().getViewMode() !== webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatViewerAttacker) {
                                if (this.options.nnnn.getValue()) {
                                    var i = this;
                                    setTimeout(function () {
                                        i.nnmmm();
                                    }, 1500);
                                }
                                return;
                            }
                            this.nnn.isVisible() && this.nmnmm();
                        } catch (s) {
                            console.log(s);
                        }
                    },
                    mmnnnn: function () {
                        var e = qx.core.Init.getApplication(),
                            t = ClientLib.Data.MainData.GetInstance().get_Cities();
                        t.get_CurrentCity();
                        try {
                            e.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
                        } catch (n) {
                            e.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0), console.log(n);
                        }
                    },
                    nnmnn: function (e) {
                        try {
                            var n = ClientLib.Data.MainData.GetInstance().get_Cities(),
                                r = n.get_CurrentCity(),
                                i = n.get_CurrentOwnCity();
                            localStorage.ta_sim_last_city = r.get_Id();
                            var s = ClientLib.Data.MainData.GetInstance().get_Alliance(),
                                o = (new ClientLib.Data.Combat).$ctor();
                            o.set_Version(1);
                            var u = i.get_CityUnitsData().get_OffenseUnits().l;
                            e = e ? e.get_ArmyUnits().l : i.get_CityArmyFormationsManager().GetFormationByTargetBaseId(r.get_Id()).get_ArmyUnits().l;
                            var a = new Array,
                                f = {
                                    l: []
                                }, l, c, h, p = [],
                                d = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch(),
                                v, m;
                            for (var g = 0; g < u.length; g++) {
                                if (e[g].get_Enabled()) {
                                    m = {
                                        h: u[g].get_Health(),
                                        i: u[g].get_MdbUnitId(),
                                        l: u[g].get_CurrentLevel(),
                                        m: 100,
                                        x: e[g].get_CoordX(),
                                        y: e[g].get_CoordY()
                                    }, a.push(m), v = d.GetResearchItemFomMdbId(u[g].get_UnitGameData_Obj().tl), c = u[g].get_UnitGameData_Obj().m, h = c.length;
                                    while (h--) {
                                        l = c[h], v !== null && l.r.length > 0 ? v.get_CurrentLevel() >= l.r[0].l && p.push(l.i) : p.push(l.i);
                                    }
                                }
                            }
                            o.set_Attacker(a), u = i.get_CityUnitsData().get_DefenseUnits().l;
                            for (g = 0; g < u.length; g++) {
                                v = d.GetResearchItemFomMdbId(u[g].get_UnitGameData_Obj().tl), c = u[g].get_UnitGameData_Obj().m, h = c.length;
                                while (h--) {
                                    l = c[h], v !== null && l.r.length > 0 ? v.get_CurrentLevel() >= l.r[0].l && p.push(l.i) : p.push(l.i);
                                }
                            }
                            f.l = t(p), a = new Array;
                            var y = {
                                l: []
                            };
                            if (r.get_CityUnitsData().get_DefenseUnits() !== null) {
                                u = r.get_CityUnitsData().get_DefenseUnits().l, p = [];
                                for (g = 0; g < u.length; g++) {
                                    m = {
                                        h: u[g].get_Health(),
                                        i: u[g].get_MdbUnitId(),
                                        l: u[g].get_CurrentLevel(),
                                        m: 100,
                                        x: u[g].get_CoordX(),
                                        y: u[g].get_CoordY()
                                    }, a.push(m), c = u[g].get_UnitGameData_Obj().m, h = c.length;
                                    while (h--) {
                                        p.push(c[h].i);
                                    }
                                }
                                y.l = t(p);
                            }
                            o.set_Defender(a), a = new Array;
                            for (var g = 0; g < 9; g++) {
                                for (var b = 0; b < 8; b++) {
                                    var w = r.GetResourceType(g, b + 8),
                                        E = -1;
                                    switch (w) {
                                    case ClientLib.Data.ECityTerrainType.FOREST:
                                        E = ClientLib.Base.EUnit.Forest;
                                        break;
                                    case ClientLib.Data.ECityTerrainType.BRIAR:
                                        E = ClientLib.Base.EUnit.Scrub;
                                        break;
                                    case ClientLib.Data.ECityTerrainType.SWAMP:
                                        E = ClientLib.Base.EUnit.Swamp;
                                        break;
                                    case ClientLib.Data.ECityTerrainType.WATER:
                                        E = ClientLib.Base.EUnit.Water;
                                        break;
                                    default:
                                        ;
                                    }
                                    E !== -1 && (m = {
                                        h: 100,
                                        i: E,
                                        l: 1,
                                        m: 100,
                                        x: g,
                                        y: b
                                    }, a.push(m));
                                }
                            }
                            o.set_Blocker(a), u = r.get_CityBuildingsData().get_Buildings().l, a = new Array;
                            for (g = 0; g < u.length; g++) {
                                m = {
                                    h: u[g].get_Health(),
                                    i: u[g].get_MdbUnitId(),
                                    l: u[g].get_CurrentLevel(),
                                    m: 100,
                                    x: u[g].get_CoordX(),
                                    y: u[g].get_CoordY()
                                }, a.push(m);
                            }
                            o.set_Buildings(a), o.set_Supports(null), o.set_StartStep(8696244), o.m_CombatSteps = 1, o.m_BoostInfantry = s.get_POIInfantryBonus(), o.m_BoostVehicle = s.get_POIVehicleBonus(), o.m_BoostAir = s.get_POIAirBonus(), o.m_BoostDefense = r.get_AllianceDefenseBonus(), o.m_AttackerBaseId = i.get_Id(), o.m_AttackerBaseName = i.get_Name(), o.m_AttackerPlayerId = i.get_PlayerId(), o.m_AttackerPlayerName = i.get_PlayerName(), o.m_AttackerAllianceId = i.get_AllianceId(), o.m_AttackerAllianceName = i.get_AllianceName(), o.m_DefenderBaseId = r.get_Id(), o.m_DefenderBaseName = r.get_Name(), o.m_DefenderPlayerId = r.get_PlayerId(), o.m_DefenderPlayerName = r.get_OwnerName(), o.m_DefenderAllianceId = r.get_AllianceId(), o.m_DefenderAllianceName = r.get_OwnerAllianceName(), o.m_DefenderBlockStep = 0, o.m_AttackTimeStamp = (new Date).getTime(), o.m_ResourceLayout = {
                                l: []
                            }, o.m_AttackerFaction = i.get_CityFaction(), o.m_DefenderFaction = r.get_CityFaction(), o.m_AttackerModules = f, o.m_DefenderModules = y, (o.m_DefenderFaction === ClientLib.Base.EFactionType.FORFaction || o.m_DefenderFaction === ClientLib.Base.EFactionType.NPCBase || o.m_DefenderFaction === ClientLib.Base.EFactionType.NPCCamp) && o.setNPCNames(), o.m_MaxDuration = 120, o.m_Complete = false, o.set_Debug(null);
                            var S = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                            return S.Reset(), S.set_CurrentReplay(o), S.InitBattle(), S.setCombatData(o), S.StartBattle(), S;
                        } catch (x) {
                            console.log(x);
                        }
                    },
                    mmmnnm: function () {
                        try {
                            var e = qx.core.Init.getApplication(),
                                t = ClientLib.Data.MainData.GetInstance().get_Cities(),
                                n = t.get_CurrentCity();
                            try {
                                e.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, n.get_Id(), 0, 0);
                            } catch (r) {
                                e.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, n.get_Id(), 0, 0);
                            }
                            this.nnmnn();
                            try {
                                e.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, n.get_Id(), 0, 0);
                            } catch (r) {
                                e.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, n.get_Id(), 0, 0);
                            }
                        } catch (r) {
                            console.log(r);
                        }
                    },
                    nmnmn: function () {
                        try {
                            this.mmn.nnmm.removeAll(), this.mmmmmn();
                            if (this.mmn.current) {
                                for (var e in this.mmn.current) {
                                    var t = this.mmn.current[e],
                                        n = new qx.ui.form.ListItem(t.label, null, t.id);
                                    this.mmn.nnmm.add(n);
                                }
                            }
                        } catch (r) {
                            console.log(r);
                        }
                    },
                    mmnnmn: function () {
                        try {
                            var e = this.mmn.nnmm.getSelection()[0].getModel();
                            this.mmn.current && typeof this.mmn.current[e] != "undefined" && (delete this.mmn.current[e], this.nnnmn(), this.nmnmn());
                        } catch (t) {
                            console.log(t);
                        }
                    },
                    mmnnnm: function (e) {
                        var t = typeof e == "object" ? this.mmn.nnmm.getSelection()[0].getModel() : e;
                        try {
                            this.mmn.current && typeof this.mmn.current[t] != "undefined" && this.nnnnm(this.mmn.current[t].layout), this.mmmnm(true, true);
                        } catch (n) {
                            console.log(n);
                        }
                    },
                    mmnmnn: function () {
                        try {
                            var e = this.mmmmmm(),
                                t = (new Date).getTime().toString(),
                                n = this.mmn.label.getValue() + " (" + this.mm.nm.mmm.nmmm.toFixed(0).toString() + ":" + this.mm.nm.mmm.nmmn.toFixed(0).toString() + ":" + this.mm.nm.units.overall.toFixed(0).toString() + ")";
                            return this.mmn.current[t] = {
                                id: t,
                                label: n,
                                layout: e
                            }, this.nnnmn(), this.nmnmn(), this.mmn.label.setValue(""), t;
                        } catch (r) {
                            console.log(r);
                        }
                    },
                    mmmmmn: function () {
                        try {
                            var e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id(),
                                t = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            this.mmn.all.hasOwnProperty(e) || (this.mmn.all[e] = {}), this.mmn.all[e].hasOwnProperty(t) || (this.mmn.all[e][t] = {}), this.mmn.current = this.mmn.all[e][t];
                        } catch (n) {
                            console.log(n);
                        }
                    },
                    mmmmnm: function () {
                        try {
                            var e = localStorage.ta_sim_layouts;
                            e ? (this.mmn.all = JSON.parse(e)) : (this.mmn.all = {});
                        } catch (t) {
                            console.log(t);
                        }
                    },
                    nnnmn: function () {
                        try {
                            localStorage.ta_sim_layouts = JSON.stringify(this.mmn.all);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    nnnnm: function (e) {
                        try {
                            this.mmn.nmmmm = true;
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t];
                                for (var r = 0; r < this.mnm.mmnn.length; r++) {
                                    this.mnm.mmnn[r].get_Id() === n.id && (this.mnm.mmnn[r].MoveBattleUnit(n.x, n.y), n.enabled === undefined ? this.mnm.mmnn[r].set_Enabled(true) : this.mnm.mmnn[r].set_Enabled(n.enabled));
                                }
                            }
                            this.mnm.mmmmm.RefreshData(), this.mmn.nmmmm = false;
                        } catch (i) {
                            console.log(i);
                        }
                    },
                    mmmmmm: function () {
                        try {
                            var e = [];
                            for (var t = 0; t < this.mnm.mmnn.length; t++) {
                                var n = this.mnm.mmnn[t],
                                    r = {};
                                r.x = n.get_CoordX(), r.y = n.get_CoordY(), r.id = n.get_Id(), r.enabled = n.get_Enabled(), e.push(r);
                            }
                            return e;
                        } catch (i) {
                            console.log(i);
                        }
                    },
                    mnmmm: function (e) {
                        if (e === "u") {
                            var t = -1;
                        }
                        if (e === "d") {
                            var t = 1;
                        }
                        if (e === "l") {
                            var n = -1;
                        }
                        if (e === "r") {
                            var n = 1;
                        }
                        if (!t) {
                            var t = 0;
                        }
                        if (!n) {
                            var n = 0;
                        }
                        this.nmnnn();
                        var r = [];
                        this.mnnmn();
                        for (var i = 0; i < this.mnm.mmnn.length; i++) {
                            var s = this.mnm.mmnn[i],
                                o = {}, u = s.get_CoordX() + n;
                            switch (u) {
                            case 9:
                                u = 0;
                                break;
                            case -1:
                                u = 8;
                                break;
                            default:
                                ;
                            }
                            var a = s.get_CoordY() + t;
                            switch (a) {
                            case 4:
                                a = 0;
                                break;
                            case -1:
                                a = 3;
                                break;
                            default:
                                ;
                            }
                            o.x = u, o.y = a, o.id = s.get_Id(), o.enabled = s.get_Enabled(), r.push(o);
                        }
                        this.nnnnm(r), this.mmmnm(true), this.nmnnm();
                    }
                }
            });
        }
        function r() {
            try {
                typeof qx != "undefined" ? (a = qx.core.Init.getApplication(), mb = qx.core.Init.getApplication().getMenuBar(), a && mb && typeof PerforceChangelist != "undefined" ? (PerforceChangelist === 368132 ? n() : alert("C&C TA Combat Simulator:\r\nНеподдерживаемая версия: " + PerforceChangelist), window.TASuite.main.getInstance().mnmmmn()) : window.setTimeout(r, 1000)) : window.setTimeout(r, 1000);
            } catch (e) {
                typeof console != "undefined" ? console.log(e) : window.opera ? opera.postError(e) : GM_log(e);
            }
        }
        console.log("CombatSim: моделятор загружен"), /commandandconquer\.com/i.test(document.domain) && window.setTimeout(r, 5000);
    }, t = document.createElement("script"),
        n = e.toString();
    t.innerHTML = "(" + n + ")();", t.type = "text/javascript", /commandandconquer\.com/i.test(document.domain) && document.getElementsByTagName("head")[0].appendChild(t);
})();