// ==UserScript==
// @name           Tiberium Alliances Tweak 2.0
// @description    Not working... Additions to Tiberium Alliances: Credits production, Command Points timer, Logout and Options buttons, Autocollect bonuses in all cities, Base tooltip resources, Autorepair
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author         K3YL3SS
// @author         Based on Tiberium Alliances Tweak by KatzSmile
// @version        0.02
// ==/UserScript==
(function () {
  var TASuite_mainFunction = function () {
      function createTweak() {
        var TASuite = {};
        qx.Class.define("TASuite.main", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            PlayerBar: null,
            MenuBar: null,
            AppointmentsBar: null,
            buildings: null,
            CurrentBuilding: null,
            AllCities: null,
            AllCitiesData: null,
            containerCityMenu: null,
            containerRegion: null,
            buttonShowBase: null,
            buttonMessage: null,
            ClassicPlayArea: null,
            TAvisMain: null,
            ImageURL: "https://prodgame06.alliances.commandandconquer.com/21/resource/"
            initialize: function () {
              this.tweakTA();
            },
            tweakTA: function () {
              this.setMenuBar();
              this.setPlayerBar();
              this.setAppointmentsBar();

              //grab the application handler
              qx.core.Init.getApplication()._onDesktopResize();

              //generating number between 20 to 30 
              //function Math.random() generates random number between 0 to 1
              //if we multiply it by 11 we get random number between 0 to 10
              //then we adds 20 to this random number to make it 
              // between 20 to 30
              randomCollect = Math.floor(Math.random() * 45) + 15; //11*0 = 0
              randomRepair = Math.floor(Math.random() * 45) + 15; //between 15 and 60
              //as the collection time must be in miliseconds we have to 
              //multiply our randomnumber
              //have it in miliseconds whichis actual time 			
              randomCollect = randomCollect * 1000;
              randomRepair = randomRepair * 1000;

              window.setInterval(this.autoCollect, randomCollect);
              window.setInterval(this.autoRepair, randomRepair);
            },
            autoCollect: function () {
              try {
                this.AllCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                this.AllCitiesData = this.AllCities.d;

                for (var CurrentCity in this.AllCitiesData) {
                  var ThisCity = this.AllCitiesData[CurrentCity];
                  this.buildings = ThisCity.m_CityBuildings.get_Buildings$2();

                  if (this.buildings != 'undefined') {
                    for (var i = 0;
                    (i < this.buildings.l.length); i++) {
                      this.CurrentBuilding = this.buildings.l[i];

                      if (((this.CurrentBuilding.get_BonusPackageFullStep$0() == 0) || (ClientLib.Data.MainData.GetInstance$9().get_Time$3().GetServerStep$0() < this.CurrentBuilding.get_BonusPackageReadyStep$0())) || (this.CurrentBuilding.GetPossibleResourcesToCollect$0() <= 0)) {} else {
                        ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource", {
                          cityid: ThisCity.m_Id,
                          posX: this.CurrentBuilding.get_CoordX$0(),
                          posY: this.CurrentBuilding.get_CoordY$0()
                        }, (new ClientLib.Net.CommandResult).$ctor(ThisCity, ThisCity.CollectResourcesCommandDone$0), this.CurrentBuilding.get_ResourceStep$0(), true);
                      }
                    }
                  }

                }
              } catch (err) {
                console.log(err);
              }
            },
            autoRepair: function () {
              try {
                this.AllCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                this.AllCitiesData = this.AllCities.d;

                for (var CurrentCity in this.AllCitiesData) {
                  var ThisCity = this.AllCitiesData[CurrentCity];

                  var $out = {};
                  var somethingRepaired = false;
                  if (ThisCity.CanRepairAll$0()) {
                    var repairCost = (new System.Collections.Generic.Dictionary$2).$ctor$0();
                    var repairableEntities = ThisCity.CalculateRepairAllInfo$0(null);
                    for (var i = 0;
                    (i < repairableEntities.EntityInfo.l.length); i++) {
                      var entity = repairableEntities.EntityInfo.l[i];
                      var maxRepairPercent = 0;
                      if (($out.$r = ThisCity.m_CachedRepairAllRepairableHealthRatios.TryGetValue$0(entity.DamagedEntity.get_Id$2(), $out), maxRepairPercent = $out.value, $out.$r)) {
                        for (var j = 0;
                        (j < entity.DamagedEntity.get_UnitLevelRequirements$0().rer.length); j++) {
                          var repairRequirement = entity.DamagedEntity.get_UnitLevelRequirements$0().rer[j];
                          var amountSpent = ((repairRequirement.c / entity.DamagedEntity.GetModifierRepairFactor$0(repairRequirement.t)) * maxRepairPercent);
                          if ((amountSpent > 0) && (repairRequirement.t == 12)) {
                            amountSpent = Math.max(1, amountSpent);
                          }
                          var currentValue = 0;
                          if (!($out.$r = repairCost.TryGetValue$0(repairRequirement.t, $out), currentValue = $out.value, $out.$r)) {
                            currentValue = 0;
                          }
                          repairCost.set_Item$2(repairRequirement.t, (currentValue + amountSpent));
                          somethingRepaired = true;
                        }
                        if (somethingRepaired) {
                          var newHealth = (entity.DamagedEntity.get_Health$0() + (entity.DamagedEntity.get_MaxHealth$0() * maxRepairPercent));
                          entity.DamagedEntity.set_Health$0(newHealth);
                          ThisCity.UpdateLastRepairStepTimes$0(entity.DamagedEntity.get_Id$2());
                        }
                      }
                    }
                    if (somethingRepaired) {
                      ThisCity.m_CachedRepairAllCityResourceCost = null;
                      ThisCity.m_CachedRepairAllRepairableHealthRatios.Clear$0();
                      ThisCity.UpdateCityResourcesExact$0(repairCost, false);
                      ThisCity.UpdateCityData$1(true, false);
                      ThisCity.UpdateCityVisual$0();
                      ThisCity.UpdateCity$1();
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("Repair", {
                        cityid: ThisCity.get_Id$2(),
                        entityId: -1,
                        mode: 1
                      }, (new ClientLib.Net.CommandResult).$ctor(ThisCity, ThisCity.RepairAllResult$0), null, true);
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("Repair", {
                        cityid: ThisCity.get_Id$2(),
                        entityId: -1,
                        mode: 5
                      }, (new ClientLib.Net.CommandResult).$ctor(ThisCity, ThisCity.RepairAllResult$0), null, true);
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("Repair", {
                        cityid: ThisCity.get_Id$2(),
                        entityId: -1,
                        mode: 4
                      }, (new ClientLib.Net.CommandResult).$ctor(ThisCity, ThisCity.RepairAllResult$0), null, true);
                    }
                  }

                }
              } catch (err) {
                console.log(err);
              }
            },
            setAppointmentsBar: function () {
              try {
                //replace vanilla AppointmentsBar
                this.AppointmentsBar = new window.TATweak.AppointmentsBar();
                qx.core.Init.getApplication().__dh.setVisibility("excluded");
                qx.core.Init.getApplication().__dh.$$parent.add(this.AppointmentsBar);
                qx.core.Init.getApplication().__dh = this.AppointmentsBar;
              } catch (err) {
                console.log(err);
              }
            },
            setMenuBar: function () {
              try {
                //replace vanilla MenuBar
                qx.core.Init.getApplication().__cV.remove(qx.core.Init.getApplication().__db);
                qx.core.Init.getApplication().__db = new window.TATweak.MenuBar();
                qx.core.Init.getApplication().__db.setHeight(30);
                qx.core.Init.getApplication().__db.setWidth(760);
                qx.core.Init.getApplication().__cV.add(qx.core.Init.getApplication().__db, {
                  left: 0,
                  top: 0
                });
              } catch (err) {
                console.log(err);
              }
            },
            setPlayerBar: function () {
              try {
                //replace vanilla PlayerBar
                qx.core.Init.getApplication().__cV.remove(qx.core.Init.getApplication().__dg);
                qx.core.Init.getApplication().__dg = new window.TATweak.PlayerBar();
                qx.core.Init.getApplication().__cV.add(qx.core.Init.getApplication().__dg, {
                  left: 0,
                  top: 0
                });
              } catch (err) {
                console.log(err);
              }
            }
          }
        });

        //================== TATweak.AppointmentsBar ====================		
        qx.Class.define("TATweak.AppointmentsBar", {
          extend: qx.ui.container.Composite,
          construct: function () {
            qx.ui.container.Composite.call(this);
            this.setLayout(new qx.ui.layout.VBox());
            this.setHeight(25);
            this.arrCity = new Array();
            this.arrCities = new Array();
            this.CityContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            this.CitiesContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            var R = new qx.ui.basic.Image(this.ImageURL + "webfrontend/ui/common/bgr_appointments_t.png");
            var Q = this.__yn();
            this.CityContainer.add(R, {
              right: 0,
              top: 0
            });
            this.CityContainer.add(Q, {
              right: 0,
              top: 0
            });
            var T = new qx.ui.basic.Image(this.ImageURL + "webfrontend/ui/common/bgr_appointments_scaler.png").set({
              allowGrowY: true,
              allowShrinkY: true,
              scale: true,
              height: 0
            });
            this.CitiesContainer.add(T, {
              right: 0,
              top: 0,
              bottom: 13
            });
            var U = new qx.ui.basic.Image(this.ImageURL + "webfrontend/ui/common/bgr_appointments_b.png");
            this.CitiesContainer.add(U, {
              right: 0,
              bottom: 0
            });
            this.__ye = new qx.ui.container.Scroll().set({
              scrollbarX: "off",
              scrollbarY: "auto",
              minHeight: 0
            });
            this.__yf = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
            this.__yf.set({
              decorator: new qx.ui.decoration.Background().set({
                backgroundRepeat: 'repeat',
                backgroundImage: this.ImageURL + "webfrontend/ui/menues/win_overlay/win_overlay_grid.png"
              })
            });
            this.__ye.add(this.__yf);
            this.CitiesContainer.add(this.__ye, {
              top: 0,
              bottom: 13,
              left: 7,
              right: 0
            });
            this.add(this.CityContainer);
            this.add(this.CitiesContainer);
            var S = ClientLib.Data.MainData.GetInstance().get_Cities();
            webfrontend.Util.attachNetEvent(S, "Change", ClientLib.Data.CitiesChange, this, this.__yi);
            webfrontend.base.Timer.getInstance().addListener("uiTick", this.__yj, this);
          },
          members: {
            CityContainer: null,
            CitiesContainer: null,
            __ye: null,
            __yf: null,
            arrCity: null,
            arrCities: null,
            __yg: null,
            __yh: null,
            __yi: function () {
              var Y = ClientLib.Data.MainData.GetInstance().get_Cities();
              var c = 0;

              for (var X in Y.get_AllCities().d) {
                var V = Y.get_AllCities().d[X];

                if (this.arrCities.length <= c) {
                  var W = this.__yo();
                  this.__yf.add(W);
                  this.arrCities.push(W);
                } else {
                  this.arrCities[c].show();
                }
                c++;
              }
              for (var i = 0; i < this.arrCities.length - c; i++) {
                this.arrCities[i].exclude();
              }
              this.__yj();
            },
            __yj: function () {
              var bs = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
              var bq = bs.d;

              if (bs.c > this.arrCities.length) return;
              var bi = ClientLib.Data.MainData.GetInstance().get_Time();
              var bu = new Array();
              var br = 0;
              var bf = null;
              var bn = 0;
              var bp = null;
              this.__yh = null;
              for (var bo in bq) {
                var bh = bq[bo];
                var ba = new Object();
                var be = bh.GetNextAppointmentInfo();
                ba.cityId = bh.get_Id();
                ba.readyTimeLeft = be.PrimaryAppointmentStep - bi.GetServerStep();
                ba.secondaryReadyTimeLeft = be.SecondaryAppointmentStep - bi.GetServerStep();
                ba.progressRatio = be.PrimaryProgress;
                ba.secondaryProgressRatio = be.SecondaryProgress;
                ba.sortTime = 0;

                if (ba.readyTimeLeft > 0 && ba.readyTimeLeft < ba.secondaryReadyTimeLeft) ba.sortTime = ba.readyTimeLeft;
                else ba.sortTime = ba.secondaryReadyTimeLeft;
                bu.push(ba);
              }
              bu.sort(function (a, b) {
                return a.sortTime == b.sortTime ? 0 : a.sortTime > b.sortTime ? 1 : -1;
              });
              for (var i = 0; i < this.arrCity.length; i++) {
                var bt = this.arrCity[i];
                var bm = bu[i];
                var bh = bq[bm.cityId];
                var bk = bm.readyTimeLeft;
                var bj = bm.secondaryReadyTimeLeft;
                var bl = bm.progressRatio;
                var bc = bm.secondaryProgressRatio;
                var bb = new qx.util.StringBuilder(1024);

                var cityIcon = "";

                if (ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).get_CityFaction() == ClientLib.Base.EFactionType.GDIFaction) {
                  cityIcon = this.ImageURL + "webfrontend/battleview/neutral/gui/icn_gdi.png"
                } else if (ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).get_CityFaction() == ClientLib.Base.EFactionType.NODFaction) {
                  cityIcon = this.ImageURL + "webfrontend/battleview/neutral/gui/icn_nod.png"
                } else if (ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).get_CityFaction() == ClientLib.Base.EFactionType.FORFaction) {
                  cityIcon = this.ImageURL + "webfrontend/battleview/neutral/gui/icn_mutants.png"
                }

                bb.add('<div style="display: inline-block; width: 150px;"><img src="', cityIcon, '" width="23" height="21" style="vertical-align: middle;"/>&nbsp;', bh.get_Name(), '&nbsp;lvl&nbsp;', ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).get_BaseLevel(), '</div><br />');
                bt.cityId = bm.cityId;
                bt.lblBaseName.setValue(bh.get_Name());

                bb.add('<div style="display: inline-block; width: 150px;"><img src="' + this.ImageURL + 'webfrontend/ui/common/icn_res_tiberium.png" width="23" height="21" style="vertical-align: middle;"/>&nbsp;', webfrontend.gui.Util.formatNumbers(Math.floor(ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).GetResourceCount(ClientLib.Base.EResourceType.Tiberium)), true), '</div><br />');
                bb.add('<div style="display: inline-block; width: 150px;"><img src="resource/webfrontend/ui/common/icn_res_chrystal.png" width="23" height="21" style="vertical-align: middle;"/>&nbsp;', webfrontend.gui.Util.formatNumbers(Math.floor(ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).GetResourceCount(ClientLib.Base.EResourceType.Crystal)), true), '</div><br />');
                bb.add('<div style="display: inline-block; width: 150px;"><img src="resource/webfrontend/ui/common/icn_res_power.png" width="23" height="21" style="vertical-align: middle;"/>&nbsp;', webfrontend.gui.Util.formatNumbers(Math.floor(ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(bm.cityId).GetResourceCount(ClientLib.Base.EResourceType.Power)), true), '</div><br />');

                if (bc >= 0 && (bj < bf || bf == null)) {
                  bf = bj;
                  bn = bc;
                  bp = bh;
                  this.__yh = bh.get_Id();
                }
                if ((bk < bj && bl >= 0 && bk < bi.get_StepsPerHour() / 60 * ClientLib.Config.Main.GetInstance().GetConfig(ClientLib.Config.Main.CONFIG_PRIORNOTICETIME)) || (bc >= 0 && bj < bi.get_StepsPerHour() / 60 * ClientLib.Config.Main.GetInstance().GetConfig(ClientLib.Config.Main.CONFIG_PRIORNOTICETIME))) {
                  if (bk <= 0) bl = 1.0;

                  if (bj <= 0) bc = 1.0;
                  var bg = "";
                  var bd = 1.0;

                  if (bk > 0 && bk < bj) {
                    bg = webfrontend.Util.getTimespanString(bi.GetTimeSpan(bk), true);
                    bd = bl;
                    bt.progressBar.setSource("webfrontend/ui/common/msc_appointments_bar_green.png");
                    bt.lblTimer.setTextColor("text-value");
                    bt.readyImage.exclude();
                    bt.stalledImage.exclude();
                    bb.add("Next bonus in: ", bg);
                  } else if (bj > 0) {
                    bg = webfrontend.Util.getTimespanString(bi.GetTimeSpan(bj), true);
                    bd = bc;
                    bt.progressBar.setSource("webfrontend/ui/common/msc_appointments_bar_orange.png");
                    bt.lblTimer.setTextColor("text-value");
                    bt.readyImage.show();
                    bt.stalledImage.exclude();
                    bb.add(this.tr("tnf:bonus ready to collect. prod full in: %1", bg));
                  } else {
                    bg = this.tr("tnf:attention!");
                    bd = 1.0;
                    bt.progressBar.setSource("webfrontend/ui/common/msc_appointments_bar_red.png");
                    bt.lblTimer.setTextColor("text-label-light");
                    bt.readyImage.exclude();
                    bt.stalledImage.show();
                    bb.add(this.tr("tnf:bonus prod stall! collect bonus to cont prod"));
                  }
                  bt.lblTimer.setValue(bg);
                  bt.lblTimer.show();
                  bt.progressBar.show();
                  bt.progressBar.setWidth(Math.floor(this.__yq(bt.container) * bd));
                  bb.add("<br /><br />", this.tr("tnf:click to access base."));
                  bt.tooltip.setLabel(bb.get());
                  this.arrCities[i].show();
                  br++;
                } else {
                  this.arrCities[i].exclude();
                }
              }
              if (bn > 0) {
                var bg = "";
                var bb = new qx.util.StringBuilder(1024);
                bb.add(bp.get_Name(), "<br />");

                if (bf != null && bf > 0) {
                  bg = webfrontend.Util.getTimespanString(bi.GetTimeSpan(bf), true);
                  bb.add(this.tr("tnf:next urgent finished in: %1", bg));
                  this.__yg.stalledImage.exclude();
                  this.__yg.progressBar.setSource("webfrontend/ui/common/msc_appointments_bar_orange.png");
                  this.__yg.lblTimer.setTextColor("text-value");
                } else {
                  bg = this.tr("tnf:attention!");
                  bb.add(this.tr("tnf:bonus prod stall! collect bonus to cont prod"));
                  this.__yg.stalledImage.show();
                  this.__yg.progressBar.setSource("webfrontend/ui/common/msc_appointments_bar_red.png");
                  this.__yg.lblTimer.setTextColor("text-label-light");
                }
                bb.add("<br /><br />", this.tr("tnf:click to access base."));
                this.__yg.tooltip.setLabel(bb.get());
                this.__yg.progressBar.setWidth(Math.floor(this.__yq(this.__yg.container) * bn));
                this.__yg.lblTimer.setValue(bg);
              } else {
                this.__yg.tooltip.setLabel(this.tr("tnf:tt text for no next urgent app"));
                this.__yg.progressBar.setWidth(0);
                this.__yg.stalledImage.exclude();
                this.__yg.lblTimer.setValue(this.tr("tnf:none"));
              }
              this.__yk(br);
            },
            __yk: function (bv) {
              var bx = qx.core.Init.getApplication();
              var bF = 13;
              var by = 41;
              var bC = 48;
              var bE = 64;
              var bB = bF + by * bv + bC;
              var bA = bB;
              var bw = bx.getMainOverlay().getBounds();

              if (bw != null && this.getLayoutParent().getBounds() != null) {
                var bz = bw.top + bw.height;
                var bD = (this.getLayoutParent().getBounds().top + this.getBounds().top) - bw.top;
                bA = bw.height - bD;
              }
              bB = Math.min(bB, bA);
              this.setHeight(bB);
              this.setMaxHeight(bA);

              if (bB - bC > bE + bF) this.__ye.setMinHeight(bE);
              else this.__ye.setMinHeight(0);
              this.CitiesContainer.setHeight(bB - bC);
            },
            __yl: function () {
              if (this.cityId > 0) webfrontend.gui.UtilView.openCityInMainWindow(this.cityId);
            },
            __ym: function () {
              if (this.__yh != null && this.__yh > 0) webfrontend.gui.UtilView.openCityInMainWindow(this.__yh);
            },
            __yn: function () {
              var bG = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
                height: 48,
                width: 124
              });
              var bH = new qx.ui.basic.Label(this.tr("tnf:next urgent:")).set({
                font: "bold-small",
                textColor: "text-value",
                maxWidth: 106
              });
              this.__yg = this.__yp();
              bG.add(bH, {
                left: 6,
                top: 4
              });
              bG.add(this.__yg.container, {
                left: 5,
                top: 22,
                right: 13
              });
              this.__yg.stalledImage = new qx.ui.basic.Image("webfrontend/ui/icons/appointment_stalled.png").set({
                visibility: "excluded"
              });
              bG.add(this.__yg.stalledImage, {
                right: 0,
                top: 7
              });
              bG.addListener("click", this.__ym, this);
              this.__yg.tooltip = new qx.ui.tooltip.ToolTip("").set({
                width: 200,
                rich: true
              });
              bG.setToolTip(this.__yg.tooltip);
              return bG;
            },
            __yo: function () {
              var bP = new qx.ui.container.Composite(new qx.ui.layout.HBox());
              var bO = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
                height: 39
              });
              bP.add(new qx.ui.basic.Image("webfrontend/ui/common/bgr_appointment_item_small_l.png"));
              var bI = new qx.ui.basic.Image("webfrontend/ui/common/bgr_appointment_item_small_scaler.png").set({
                allowShrinkX: true,
                allowGrowX: true,
                scale: true
              });
              bP.add(bI, {
                flex: 2
              });
              bP.add(new qx.ui.basic.Image("webfrontend/ui/common/bgr_appointment_item_small_r.png"));
              bO.add(bP, {
                left: 0,
                right: 0
              });
              var bN = new qx.ui.basic.Label("").set({
                font: "bold-small",
                textColor: "text-value",
                width: 90
              });
              var bK = this.__yp();
              bO.add(bN, {
                left: 6,
                top: 2
              });
              bO.add(bK.container, {
                left: 2,
                top: 17,
                right: 16
              });
              var bJ = new qx.ui.basic.Image("webfrontend/ui/icons/appointment_ready.png").set({
                visibility: "excluded"
              });
              var bL = new qx.ui.basic.Image("webfrontend/ui/icons/appointment_stalled.png").set({
                visibility: "excluded"
              });
              bO.add(bJ, {
                right: 4,
                top: 2
              });
              bO.add(bL, {
                right: 4,
                top: 2
              });
              var bM = new qx.ui.tooltip.ToolTip("").set({
                width: 200,
                rich: true
              });
              bO.setToolTip(bM);
              this.arrCity.push({
                cityId: -1,
                lblBaseName: bN,
                container: bK.container,
                textcontainer: bK.textContainer,
                lblTimer: bK.lblTimer,
                progressBar: bK.progressBar,
                readyImage: bJ,
                stalledImage: bL,
                tooltip: bM
              });
              bO.addListener("click", this.__yl, this.arrCity[this.arrCity.length - 1]);
              return bO;
            },
            __yp: function () {
              var bR = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
              var bQ = new qx.ui.container.Composite(new qx.ui.layout.HBox());
              var bU = new qx.ui.basic.Label().set({
                textColor: "text-value",
                font: "small",
                textAlign: "center"
              });
              var bT = new qx.ui.basic.Image("webfrontend/ui/common/msc_appointments_bar_green.png").set({
                height: 13,
                scale: true,
                allowShrinkX: true,
                allowShrinkY: true,
                width: 0
              });
              var bS = new qx.ui.basic.Image("webfrontend/ui/common/bgr_appointment_progbar_shadow.png").set({
                height: 15,
                allowGrowX: true,
                allowShrinkX: true,
                scale: true
              });
              bR.add(bT, {
                top: 1,
                left: 3,
                right: 3,
                bottom: 2
              });
              bQ.add(new qx.ui.core.Spacer(), {
                flex: 1
              });
              bQ.add(bU);
              bQ.add(new qx.ui.core.Spacer(), {
                flex: 1
              });
              bR.add(bQ, {
                left: 0,
                right: 0
              });
              return {
                container: bR,
                textcontainer: bQ,
                lblTimer: bU,
                progressBar: bT
              };
            },
            __yq: function (bV) {
              var bX = 0;
              var bY = bV.getBounds();

              if (bY != null) {
                var bW = bY.width;
                bX = bW - 7;
              }
              return bX;
            }
          }
        });

        //================== TATweak.PlayerBar ====================		
        qx.Class.define("TATweak.PlayerBar", {
          extend: qx.ui.container.Composite,
          construct: function () {
            qx.ui.container.Composite.call(this);
            var PlayerBarLayout = new qx.ui.layout.Canvas();
            this._setLayout(PlayerBarLayout);
            var ClientLibHost = ClientLib.Host.Main.GetInstance();
            var ClientPrimaryHost = ClientLibHost.get_PrimaryHost();
            var PlayerInfoBg = new qx.ui.basic.Image("webfrontend/ui/common/bgr_player_info.png").set({
              width: 126,
              height: 200
            });
            this.add(PlayerInfoBg, {
              left: 0,
              top: 0
            });
            this.setWidth(126);
            this.setHeight(200);
            var PlayerInfoLogo = new qx.ui.basic.Image("webfrontend/ui/common/bgr_player_info_logo.png").set({
              width: 118,
              height: 46,
              cursor: "pointer"
            });
            PlayerInfoLogo.addListener("click", this.linkGotoHome, this);
            this.add(PlayerInfoLogo, {
              left: 0,
              top: 3
            });
            if (ClientPrimaryHost != null) {
              var ClientPrimaryHostUser = ClientPrimaryHost.get_User();
              this.iconPlayerAvatar = new qx.ui.basic.Image(ClientPrimaryHostUser.get_AvatarImage());
              this.add(this.iconPlayerAvatar, {
                left: 2,
                top: 2
              });
              webfrontend.Util.attachNetEvent(ClientPrimaryHost, "OnUserChange", ClientLib.Host.HostDataChange, this, this._onHostUserChange);
            }
            this.labelPlayerName = new webfrontend.gui.widgets.PlayerLabel("", 0).set({
              textColor: "black",
              font: "font_size_14_bold",
              maxWidth: 106,
              rich: false
            });
            this.labelPlayerName2 = new webfrontend.gui.widgets.PlayerLabel("", 0).set({
              textColor: "#cccccc",
              font: "font_size_14_bold",
              maxWidth: 106,
              rich: false
            });
            this.add(this.labelPlayerName2, {
              left: 11,
              top: 58
            });
            this.add(this.labelPlayerName, {
              left: 10,
              top: 57
            });
            this.labelPlayerRankValue = new qx.ui.basic.Label("").set({
              textColor: "text-value",
              font: "visit-points",
              width: 46,
              textAlign: "center"
            });
            var labelPlayerRank = new qx.ui.basic.Label(this.tr("tnf:rank:")).set({
              textColor: "text-value",
              font: "font_size_13"
            });
            this.labelPlayerRankOverall = new qx.ui.basic.Label("").set({
              textColor: "text-label-dark",
              font: "font_size_13_bold"
            });
            var RankContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            RankContainer.add(labelPlayerRank);
            RankContainer.add(this.labelPlayerRankOverall);
            this.add(RankContainer, {
              left: 10,
              top: 76
            });
            this.labelAlliance = new webfrontend.gui.widgets.AllianceLabel("").set({
              textColor: "text-value",
              font: "font_size_14_bold",
              maxWidth: 106,
              rich: false
            });
            this.add(this.labelAlliance, {
              left: 10,
              top: 92
            });
            this.iconCredits = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_dollar.png").set({
              width: 24,
              height: 24,
              scale: true
            });
            this.labelCreditsCount = new qx.ui.basic.Label().set({
              textColor: "text-value",
              font: "font_size_13_bold"
            });
            this.labelCreditsTimer = new qx.ui.basic.Label().set({
              textColor: "text-value",
              font: "bold-small"
            });
            var buttonAddCreditPoints = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_mainui_addpoints_plus.png").set({
              width: 17,
              height: 17
            });
            buttonAddCreditPoints.setAppearance("button-addpoints");
            this.add(this.iconCredits, {
              left: 4,
              top: 117
            });
            this.add(this.labelCreditsCount, {
              left: 30,
              top: 120
            });
            this.add(this.labelCreditsTimer, {
              left: 30,
              top: 132
            });
            var iconResearchPoints = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_research.png").set({
              toolTipText: '<div style="display: inline-block; width: 200px;">' + this.tr("tnf:research point desc") + '</div>'
            });
            this.labelResearchPointsCount = new qx.ui.basic.Label().set({
              toolTipText: '<div style="display: inline-block; width: 200px;">' + this.tr("tnf:research point desc") + '</div>',
              textColor: "text-value",
              font: "font_size_13_bold"
            });
            var buttonAddResearchPoints = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_mainui_addpoints_plus.png").set({
              width: 17,
              height: 17
            });
            buttonAddResearchPoints.setAppearance("button-addpoints");
            this.add(iconResearchPoints, {
              left: 2,
              top: 140
            });
            this.add(this.labelResearchPointsCount, {
              left: 30,
              top: 143
            });
            var iconCashPoints = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_cnc_points.png").set({
              toolTipText: this.tr("tnf:cash")
            });
            this.labelCash = new qx.ui.basic.Label("0").set({
              textColor: "text-value",
              font: "font_size_13_bold",
              toolTipText: this.tr("tnf:cash")
            });
            var buttonAddCashPoints = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_mainui_addpoints_plus.png").set({
              width: 17,
              height: 17
            });
            buttonAddCashPoints.setAppearance("button-addpoints");
            var tooltipBubble = new qx.ui.tooltip.ToolTip("").set({
              rich: true
            });
            var iconCommandPoints = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_command_points.png").set({
              toolTip: tooltipBubble
            });
            this.labelCommandPointsCount = new qx.ui.basic.Label("0").set({
              textColor: "text-value",
              font: "font_size_13_bold",
              toolTip: tooltipBubble
            });
            this.labelCPTimer = new qx.ui.basic.Label("0").set({
              textColor: "text-value",
              font: "bold-small",
              toolTip: tooltipBubble
            });
            var buttonAddCommandPoints = new qx.ui.form.Button(null, "webfrontend/ui/icons/icon_mainui_addpoints_plus.png").set({
              width: 17,
              height: 17
            });
            buttonAddCommandPoints.setAppearance("button-addpoints");
            this.add(iconCommandPoints, {
              left: 2,
              top: 163
            });
            this.add(this.labelCommandPointsCount, {
              left: 30,
              top: 166
            });
            this.add(this.labelCPTimer, {
              left: 30,
              top: 178
            });
            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Player(), "Change", ClientLib.Data.PlayerChange, this, this.SetPlayerLabels);
            this.SetPlayerLabels();
            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Alliance(), "Change", ClientLib.Data.AllianceChange, this, this.SetAllianceLabel);
            this.SetAllianceLabel();
            webfrontend.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
          },
          members: {
            iconPlayerAvatar: null,
            labelPlayerName: null,
            labelPlayerRankValue: null,
            labelPlayerRankOverall: null,
            labelAlliance: null,
            labelCreditsCount: null,
            labelResearchPointsCount: null,
            labelCash: null,
            labelCommandPointsCount: null,
            iconCredits: null,
            labelCreditsTimer: null,
            labelCPTimer: null,
            _onHostUserChange: function (S) {
              this.SetPlayerLabels();
            },
            _onTick: function () {
              this.UpdatePlayerLabels();
            },
            linkGotoHome: function () {
              var qxapp = qx.core.Init.getApplication();
              qxapp.showExternal(LandingPageURL);
            },
            SetPlayerLabels: function () {
              var ClientMainData = ClientLib.Data.MainData.GetInstance();
              var ClientHostMain = ClientLib.Host.Main.GetInstance();
              var ClientPlayer = ClientMainData.get_Player();

              if (ClientHostMain.get_PrimaryHost() != null) this.iconPlayerAvatar.setSource(ClientHostMain.get_PrimaryHost().get_User().get_AvatarImage());
              this.labelPlayerName.setPlayer(ClientPlayer.get_Name(), ClientPlayer.get_Id());
              this.labelPlayerName2.setPlayer(ClientPlayer.get_Name(), ClientPlayer.get_Id());
              this.labelPlayerRankValue.setValue(ClientPlayer.get_Level().toString());
              this.labelPlayerRankOverall.setValue(ClientPlayer.get_OverallRank().toString());
              this.labelResearchPointsCount.setValue(webfrontend.gui.Util.formatNumbers(ClientPlayer.get_ResearchPoints(), true).toString());
              this.labelCreditsCount.setValue(webfrontend.gui.Util.formatNumbers(ClientPlayer.GetCreditsCount(), true).toString());
              this.labelCreditsTimer.setValue(webfrontend.gui.Util.formatNumbers(Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsGrowth())) + this.tr("tnf:/h"));
              var CreditsTooltip = this.GetCreditsTooltip();
              this.iconCredits.setToolTipText(CreditsTooltip);
              this.labelCreditsCount.setToolTipText(CreditsTooltip);
              this.labelCreditsTimer.setToolTipText(CreditsTooltip);
              this.UpdatePlayerLabels();
            },
            SetAllianceLabel: function () {
              var ClientAlliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              this.labelAlliance.setAlliance(ClientAlliance.get_Name(), ClientAlliance.get_Id());
              this.labelAlliance.setToolTipText(ClientAlliance.get_Name());
            },
            UpdatePlayerLabels: function () {
              var bf = ClientLib.Data.MainData.GetInstance().get_Time();
              var bn = bf.GetServerStep();
              var bi = ClientLib.Data.MainData.GetInstance().get_Player();
              var bj = bi.GetCommandPointMaxStorage();
              var ba = bi.GetCommandPointCount();
              var bk = webfrontend.gui.Util.formatNumbers(ba, true);
              var be = webfrontend.gui.Util.formatNumbers(bj, true);
              var bh = webfrontend.gui.Util.formatNumbers(bi.GetCommandPointsGrowPerHour(), true);
              var bg = null;
              var bc = Math.max(0, bi.PredictNextCommandPointStep() - bn);

              if (bc > 0) bg = webfrontend.Util.getTimespanString(bf.GetTimeSpan(bc), true);
              var bb = null;
              var bm = bf.GetTimeSpan(bi.PredictCommandPointStepAtValue(bj));

              if (bm > 0) bb = webfrontend.Util.getDateTimeString(bf.GetJSStepTime(bm));
              var bl = new qx.util.StringBuilder(1024);
              bl.add('<div>');
              bl.add('<div style="display: inline-block; width: 200px;"><img src="resource/webfrontend/ui/common/icn_res_command_points.png" width="23" height="21" style="vertical-align: middle;"/>');
              bl.add('<font color="', webfrontend.theme.Color.colors["res-white"], '">', bk, ' / ', be, '</font>&nbsp;', this.tr("tnf:command points"), '</div>');
              bl.add('<div>', this.tr("tnf:global production:"), "&nbsp;", bh, this.tr("tnf:/h"), '</div>');
              var bd = false;

              if (bc > 0) {
                bl.add('<br/><div>', this.tr("tnf:time untill next point: %1", bg), '</div>');

                if (bb != null) bl.add('<div>', this.tr("tnf:storage full on:"), "&nbsp;", bb, '</div>');
              }
              if (bj > 0 && ba >= bj) bl.add('<br/><div><font color="', webfrontend.theme.Color.colors["res-red"], '">', this.tr("tnf:storage full, production stalled."), '</font></div>');
              bl.add('<br/><div style="width: 200px; word-wrap: break-word;">', this.tr("tnf:command points desc"), '</div>');
              bl.add('</div>');
              this.labelCommandPointsCount.getToolTip().setLabel(bl.get());
              this.labelCommandPointsCount.setValue((bk + ' / ' + be).toString());
              this.labelCPTimer.getToolTip().setLabel(bl.get());
              this.labelCPTimer.setValue(bg);
            },
            GetCreditsTooltip: function () {
              var bp = ClientLib.Data.MainData.GetInstance().get_Player();
              var bq = webfrontend.gui.Util.formatNumbers(Math.floor(bp.GetCreditsCount()));
              var bo = webfrontend.gui.Util.formatNumbers(Math.floor(bp.GetCreditsGrowth()));
              var br = webfrontend.theme.Color.colors["res-white"];
              var bs = new qx.util.StringBuilder(1024);
              bs.add('<div>');
              bs.add('<div style="display: inline-block; width: 200px;"><img src="resource/webfrontend/ui/common/icn_res_dollar.png" width="23" height="21" style="vertical-align: middle;"/>');
              bs.add('<font color="', br, '">', bq, '</font>');
              bs.add('&nbsp;', this.tr("tnf:credits"), '</div>');
              bs.add('<div><div style="display: inline-block; width: 150px;">', this.tr("tnf:global production:"), "</div>", bo, this.tr("tnf:/h"), '</div>');
              bs.add('<br/><div style="width: 200px; word-wrap: break-word;">', this.tr("tnf:credit desc"), '</div>');
              bs.add('</div>');
              return bs.get();
            }
          }
        });

        //================== TATweak.MenuBar ====================		
        qx.Class.define("TATweak.MenuBar", {
          extend: qx.ui.container.Composite,
          construct: function () {
            qx.ui.container.Composite.call(this);
            var MenuBarLayout = new qx.ui.layout.Canvas();
            this._setLayout(MenuBarLayout);
            var MenuBarBg = new qx.ui.basic.Image("webfrontend/ui/common/bgr_menu_bar_top.png");
            this.add(MenuBarBg);
            var MenuBarContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
              width: 760
            });
            this.add(MenuBarContainer, {
              top: 1,
              left: 2
            });
            MenuBarContainer.add(new qx.ui.core.Spacer(), {
              flex: 1
            });
            this.buttonMissions = new qx.ui.form.Button(this.tr("tnf:quests")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-left"
            });
            MenuBarContainer.add(this.buttonMissions);
            this.buttonMissions.addListener("execute", this._onMissions, this);
            this.buttonReports = new qx.ui.form.Button(this.tr("tnf:reports")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            MenuBarContainer.add(this.buttonReports);
            this.buttonReports.addListener("execute", this._onReports, this);
            this.buttonMail = new qx.ui.form.Button(this.tr("tnf:messages")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            MenuBarContainer.add(this.buttonMail);
            this.buttonMail.addListener("execute", this._onMessages, this);
            this.buttonAlliances = new qx.ui.form.Button(this.tr("tnf:alliance")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            MenuBarContainer.add(this.buttonAlliances);
            this.buttonAlliances.addListener("execute", this._onAlliance, this);
            this.buttonOverviews = new qx.ui.form.Button(this.tr("tnf:overviews")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            //MenuBarContainer.add(this.buttonOverviews);				
            this.buttonForum = new qx.ui.form.Button(this.tr("tnf:forum")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            MenuBarContainer.add(this.buttonForum);
            this.buttonForum.addListener("execute", this._onForum, this);
            this.buttonResearch = new qx.ui.form.Button(this.tr("tnf:research")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            MenuBarContainer.add(this.buttonResearch);
            this.buttonResearch.addListener("execute", this._onResearch, this);
            this.buttonInventory = new qx.ui.form.Button(this.tr("tnf:inventory")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            //MenuBarContainer.add(this.buttonInventory);
            this.buttonSocial = new qx.ui.form.Button(this.tr("tnf:social")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            this.buttonRanking = new qx.ui.form.Button(this.tr("tnf:ranking")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            this.buttonRanking.addListener("execute", this._onRanking, this);
            MenuBarContainer.add(this.buttonRanking);
            this.buttonOptions = new qx.ui.form.Button(this.tr("tnf:options")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-center"
            });
            this.buttonOptions.addListener("execute", this._onOptions, this);
            MenuBarContainer.add(this.buttonOptions);
            this.buttonLogout = new qx.ui.form.Button(this.tr("tnf:logout")).set({
              width: 84,
              height: 28,
              appearance: "button-bar-right"
            });
            this.buttonLogout.addListener("execute", this._onLogout, this);
            MenuBarContainer.add(this.buttonLogout);
            MenuBarContainer.add(new qx.ui.core.Spacer(), {
              flex: 1
            });

            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Mail(), "DataChange", ClientLib.Data.MailDataChange, this, this._onMailChange);
            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Forum(), "Change", ClientLib.Data.ForumChange, this, this._onForumChange);
            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Reports(), "TotalUnreadCountUpdated", ClientLib.Data.Reports.TotalUnreadCountUpdated, this, this._onReportsChange);
            webfrontend.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Missions(), "MissionUpdated", ClientLib.Data.Missions.MissionUpdated, this, this._onMissionsChange);
            this._onMissionsChange();
          },
          statics: {
            buttons: {
              ranking: 0,
              forum: 1,
              mail: 2,
              missions: 3,
              reports: 4,
              alliance: 5,
              overviews: 6,
              research: 7,
              inventory: 8
            }
          },
          members: {
            buttonAlliances: null,
            buttonMissions: null,
            buttonReports: null,
            buttonMail: null,
            buttonOverviews: null,
            buttonForum: null,
            buttonResearch: null,
            buttonInventory: null,
            buttonSocial: null,
            buttonRanking: null,
            buttonLogout: null,
            buttonOptions: null,
            _onResearch: function () {
              webfrontend.gui.research.ResearchOverlay.getInstance().toggle();
            },
            _onRanking: function () {
              webfrontend.gui.ranking.RankingOverlay.getInstance().toggle();
            },
            _onMissions: function () {
              webfrontend.gui.missions.MissionsOverlay.getInstance().toggle();
            },
            _onReports: function () {
              webfrontend.gui.reports.ReportsOverlay.getInstance().toggle();
            },
            _onMessages: function () {
              webfrontend.gui.mail.MailOverlay.getInstance().toggle();
            },
            _onLogout: function () {
              window.location = LandingPageURL + "/logout";
            },
            _onOptions: function () {
              var qxapp = qx.core.Init.getApplication();
              qxapp.showOptionsPage();
            },
            _onMailChange: function (A) {
              if (A) {
                var B = ClientLib.Data.MainData.GetInstance().get_Mail().GetUnreadCount();
                var C = B > 0 ? "(" + B + ") " + this.tr("tnf:messages") : this.tr("tnf:messages");
                this.buttonMail.setLabel(C);
              }
            },
            _onForumChange: function () {
              var D = ClientLib.Data.MainData.GetInstance().get_Forum().get_UnreadItems();
              var E = D > 0 ? "(" + D + ") " + this.tr("tnf:forum") : this.tr("tnf:forum");
              this.buttonForum.setLabel(E);
            },
            _onReportsChange: function (F) {
              var G = F > 0 ? "(" + F + ") " + this.tr("tnf:reports") : this.tr("tnf:reports");
              this.buttonReports.setLabel(G);
            },
            _onMissionsChange: function () {
              var H = ClientLib.Data.MainData.GetInstance().get_Missions().GetClaimableCount();
              this.buttonMissions.setLabel("" + (H > 0 ? "(" + H + ") " : "") + this.tr("tnf:quests"));
            },
            _onAlliance: function () {
              webfrontend.gui.alliance.AllianceOverlay.getInstance().toggle();
            },
            _onForum: function () {
              webfrontend.gui.forum.ForumOverlay.getInstance().toggle();
            },
            setOverlayButtonActive: function (I, J) {
              var K = null;

              switch (I) {
              case webfrontend.gui.bars.MenuBar.buttons.ranking:
                K = this.buttonRanking;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.forum:
                K = this.buttonForum;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.mail:
                K = this.buttonMail;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.missions:
                K = this.buttonMissions;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.reports:
                K = this.buttonReports;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.alliance:
                K = this.buttonAlliances;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.overviews:
                K = this.buttonOverviews;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.research:
                K = this.buttonResearch;
                break;
              case webfrontend.gui.bars.MenuBar.buttons.inventory:
                K = this.buttonInventory;
                break;
              }
              if (K != null) {
                if (J) K.addState('opened');
                else if (K.hasState('opened')) K.removeState('opened');
              }
            },
            getUIItem: function (L) {
              switch (L) {
              case ClientLib.Data.Missions.PATH.WDG_MISSIONS:
                return this.buttonMissions;
              case ClientLib.Data.Missions.PATH.WDG_RESEARCH:
                return this.buttonResearch;
              }
              return null;
            }
          }
        });
      }

      //Is the screen loaded checking the qx
      function TASuite_checkIfLoaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            mb = qx.core.Init.getApplication().getMenuBar();
            if (a && mb) {
              createTweak();
              window.TASuite.main.getInstance().initialize();
            } else window.setTimeout(TASuite_checkIfLoaded, 1000);
          } else {
            window.setTimeout(TASuite_checkIfLoaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }

      //not loaded, wait one second
      if (/commandandconquer\.com/i.test(document.domain)) {
        window.setTimeout(TASuite_checkIfLoaded, 1000);
      }
    }

    // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TASuiteScript = document.createElement("script");
  var txt = TASuite_mainFunction.toString(); //get contents
  TASuiteScript.innerHTML = "(" + txt + ")();";
  TASuiteScript.type = "text/javascript";

  //append the script
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
  }

})();