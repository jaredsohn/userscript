// ==UserScript==
    // @name           Tiberium Alliances Combat Optimizer
    // @description    NN-2013-69
    // @namespace      NN-2013-69
    // @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
    // @version        1.1.0
    // @author         CDIHCAH
    // ==/UserScript==
    (function () {
      var TAOpt_mainFunction = function () {
          function createTweak() {
            window.TASuite.main.prototype.degree = null;
            window.TASuite.main.prototype.currentDx = null;
            window.TASuite.main.prototype.currentDy = null;
            window.TASuite.main.prototype.currentUnit = null;
            window.TASuite.main.prototype.buttonOptimize = null;
            window.TASuite.main.prototype.degreeSelect = null;
            window.TASuite.main.prototype.primarySelect = null;
            window.TASuite.main.prototype.secondarySelect = null;
            window.TASuite.main.prototype.tertiarySelect = null;
            window.TASuite.main.prototype.lastPrimary = null;
            window.TASuite.main.prototype.lastSecondary = null;
            window.TASuite.main.prototype.lastTertiary = null;
            window.TASuite.main.prototype.currentPrimary = null;
            window.TASuite.main.prototype.currentSecondary = null;
            window.TASuite.main.prototype.currentTertiary = null;
            window.TASuite.main.prototype.continuousCheckBox = null;
            window.TASuite.main.prototype.busy = null;
            window.TASuite.main.prototype.found_improvement = null;
           
            window.TASuite.main.prototype.initOptimizer = function () {
              this.battleResultsBox.getApplicationRoot().set({
                blockerColor: '#000000',
                blockerOpacity: 0.6
              });
              this.buttonOptimize = new qx.ui.form.Button("Optimize");
              this.buttonOptimize.set({width: 80, appearance: "button-text-small", toolTipText: "Attempt to optimize your setup"});
              this.buttonOptimize.addListener("click", this.optimizeLayout, this);
             
              // The Optimize Vertical Box
              var vBox = new qx.ui.container.Composite()
              vBox.setLayout(new qx.ui.layout.VBox(5));
              vBox.setThemedFont("bold");
              vBox.setThemedPadding(2);
              vBox.setThemedBackgroundColor("#eef");
              this.statsPage.add(vBox);
             
              // Continuous Checkbox
              this.continuousCheckBox = new qx.ui.form.CheckBox('Continuous');
              vBox.add(this.continuousCheckBox);
              // Options for Optimize
              // Degree selector
              var hBox3 = new qx.ui.container.Composite()
              hBox3.setLayout(new qx.ui.layout.HBox(5));
              hBox3.add(new qx.ui.basic.Label("Mode: "));
              this.degreeSelect = new qx.ui.form.SelectBox();
              this.degreeSelect.add(new qx.ui.form.ListItem("Small", null, "1"));
              var averageChoice = new qx.ui.form.ListItem("Medium", null, "2");
              this.degreeSelect.add(averageChoice);
              this.degreeSelect.add(new qx.ui.form.ListItem("Large", null, "4"));
              this.degreeSelect.add(new qx.ui.form.ListItem("Full", null, "8"));
              this.degreeSelect.setSelection([averageChoice]);
              hBox3.add(this.degreeSelect);
              vBox.add(hBox3);
              // Primary selector
              var hBox4 = new qx.ui.container.Composite();
              hBox4.setLayout(new qx.ui.layout.HBox(5));
              hBox4.add(new qx.ui.basic.Label("1st: "));
              this.primarySelect = new qx.ui.form.SelectBox();
              var primarySelectDefault = new qx.ui.form.ListItem("C. Yard", null, "CY");
              this.primarySelect.add(primarySelectDefault);
              this.primarySelect.add(new qx.ui.form.ListItem("Repair Time", null, "RT"));
              this.primarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.primarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              this.primarySelect.add(new qx.ui.form.ListItem("Enemy Strength", null, "ES"));
              this.primarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.primarySelect.setSelection([primarySelectDefault]);
              hBox4.add(this.primarySelect);
              vBox.add(hBox4);
              // Secondary selector
              var hBox5 = new qx.ui.container.Composite();
              hBox5.setLayout(new qx.ui.layout.HBox(5));
              hBox5.add(new qx.ui.basic.Label("2nd: "));
              this.secondarySelect = new qx.ui.form.SelectBox();
              this.secondarySelect.add(new qx.ui.form.ListItem("C. Yard", null, "CY"));
              var secondarySelectDefault = new qx.ui.form.ListItem("Repair Time", null, "RT");
              this.secondarySelect.add(secondarySelectDefault);
              this.secondarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Enemy Strength", null, "ES"));
              this.secondarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.secondarySelect.setSelection([secondarySelectDefault]);
              hBox5.add(this.secondarySelect);
              vBox.add(hBox5);
              // Tertiary selector
              var hBox6 = new qx.ui.container.Composite();
              hBox6.setLayout(new qx.ui.layout.HBox(5));
              hBox6.add(new qx.ui.basic.Label("3rd: "));
              this.tertiarySelect = new qx.ui.form.SelectBox();
              this.tertiarySelect.add(new qx.ui.form.ListItem("C. Yard", null, "CY"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Repair Time", null, "RT"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
              this.tertiarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
              var tertiarySelectDefault = new qx.ui.form.ListItem("Enemy Strength", null, "ES");
              this.tertiarySelect.add(tertiarySelectDefault);
              this.tertiarySelect.add(new qx.ui.form.ListItem("Battle Time", null, "BT"));
              this.tertiarySelect.setSelection([tertiarySelectDefault]);
              hBox6.add(this.tertiarySelect);
              vBox.add(hBox6);
              // The Optimize button
              this.statsPage.add(this.buttonOptimize);
            };
           
            window.TASuite.main.prototype.optimizeLayout = function () {
              try {
                // First, get the CityPreArmyUnits
                var units = this.getCityPreArmyUnits();
                if (this.busy) {
                  this.optimizingDone(false);
                  this.restoreFormation();
                } else {
                  this.battleResultsBox.setModal(true);
                  this.battleResultsBox.setAllowClose(false);
                  this.buttonOptimize.setLabel("Stop"); // Cancel means that all changes will be restored back
                  this.busy = true;
                  // Set the current primary and secondary targets
                  this.calculateSimResults();
                  this.updateStatsWindow();
                  this.setTargets();
                  this.degree = parseInt(this.degreeSelect.getSelection()[0].getModel());
                  this.found_improvement = false;
                  this.checkBetterFormation();
                }
              } catch (e) {
                console.log(e);
              }
            };
            window.TASuite.main.prototype.optimizingDone = function (cancelled) {
              if (cancelled == null) {
                var continuous = this.continuousCheckBox.getValue();
              } else {
                var continuous = false;
              }
              if (continuous && this.found_improvement) {
                this.busy = false;
                this.optimizeLayout();
              } else {
                this.buttonOptimize.setLabel("Optimize");
                this.battleResultsBox.setAllowClose(true);
                this.battleResultsBox.setModal(false);
                this.busy = false;
              }
            };
            window.TASuite.main.prototype.checkBetterFormation = function () {
              this.saveFormation();
     
              var order = [];
              for (var i = 0; i < this.units.length; i++) {
                order.push(i);
              }
     
              // Randomize the units order
              var tmp, current, top = order.length;
     
              if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = order[current];
                order[current] = order[top];
                order[top] = tmp;
              }
     
              this.units_list = order;
              this.currentUnit = this.units[this.units_list.pop()];
              this.currentDx = this.degree;
              this.currentDy = this.degree;
              setTimeout(this.moveLoop, 1000);
     
              return false;
            };
            window.TASuite.main.prototype.moveLoop = function () {
              ta = window.TASuite.main.getInstance();
              if (!ta.busy) {
                return;
              }
              // First check if this move is legal
              var unit = ta.currentUnit;
              var x = unit.get_CoordX();
              var y = unit.get_CoordY();
              var degree = ta.degree;
              var dx = ta.currentDx;
              var dy = ta.currentDy;
              dx -= 1;
     
              new_x = dx + x;
              new_y = dy + y;
              if (dy == 0 && dx == 0) {
                dx -= 1;
              } else {
                if (new_x >= 0 && new_x < 8) {
                  if (new_y >= 0 && new_y < 4) {
                    // Move the unit
                    unit.MoveBattleUnit(new_x, new_y);
                    if (ta.checkNewResults()) {
                      ta.restoreFormation();
                      ta.nextUnit();
                      return;
                    } else {
                      unit.MoveBattleUnit(x, y);
                    }
                  }
                }
              }
     
              if (dx < -degree || dx < 0) {
                dx = degree;
                dy -= 1;
                if (dy < -degree || dy < 0) {
                  ta.nextUnit();
                  return;
                }
              }
     
              // If we are still on this unit, then set the dx and dy and schedule another iteration
              ta.currentDx = dx;
              ta.currentDy = dy;
              setTimeout(ta.moveLoop, 10);
            };
            window.TASuite.main.prototype.nextUnit = function () {
              // Set the next unit if this isn't the last one, and start the loop again
              if (this.units_list.length > 0) {
                this.currentDx = this.degree;
                this.currentDy = this.degree;
                this.currentUnit = this.units[this.units_list.pop()];
                setTimeout(this.moveLoop, 10);
              } else {
                // Subtract the degree and start over
                this.degree -= 1;
                if (this.degree > 0) {
                  this.checkBetterFormation();
                } else {
                  this.optimizingDone();
                  this.restoreFormation();
                }
              }
            };
            window.TASuite.main.prototype.setTargets = function () {
              var p = this.primarySelect.getSelection()[0].getModel();
              var s = this.secondarySelect.getSelection()[0].getModel();
              var t = this.tertiarySelect.getSelection()[0].getModel();
     
              this.lastPrimary = this.getTarget(p);
              this.lastSecondary = this.getTarget(s);
              this.lastTertiary = this.getTarget(t);
     
              this.currentPrimary = this.lastPrimary;
              this.currentSecondary = this.lastSecondary;
              this.currentTertiary = this.lastTertiary;
            };
            window.TASuite.main.prototype.getTarget = function (key) {
              // i will add some options soon
              switch (key) {
              case 'DF':
                // enemyDF -1
                return this.lastDFPercentage;
              case 'CY':
                // enemyCY -1
                return this.lastCYPercentage;
              case 'RT':
                // attackerRT -1
                return this.lastRepairTime;
              case 'TS':
                // attacker Overall +1
                return this.lastPercentage;
              case 'ES':
                // enemyBase -1
                return this.lastEnemyPercentage;
              case 'BT':
                // battleTime -1
                return this.totalSeconds;
              }
            };
            window.TASuite.main.prototype.compareTargets = function () {
              // simplyfied
              var np = -1;
              var ns = -1;
              var nt = -1;
              var p = this.primarySelect.getSelection()[0].getModel();
              var s = this.secondarySelect.getSelection()[0].getModel();
              var t = this.tertiarySelect.getSelection()[0].getModel();
              // Check if the primary should be negated
              switch (p) {
              case 'TS':
                np = 1;
                break;
              }
              switch (s) {
              case 'TS':
                ns = 1;
                break;
              }
              switch (t) {
              case 'TS':
                nt = 1;
                break;
              }
              this.lastPrimary = this.getTarget(p);
              this.lastSecondary = this.getTarget(s);
              this.lastTertiary = this.getTarget(t);
              // Check if the primary is higher, if so, return true
              if ((this.lastPrimary * np) > (this.currentPrimary * np)) {
                return true;
              } else if ((this.lastPrimary * np) == (this.currentPrimary * np)) {
                // Check if the primary is equal, if so, check the secondary
                if ((this.lastSecondary * ns) > (this.currentSecondary * ns)) {
                  return true;
                } else if ((this.lastSecondary * ns) == (this.currentSecondary * ns)) {
                  if ((this.lastTertiary * nt) > (this.currentTertiary * nt)) {
                    return true;
                  }
                }
              }
     
              return false;
            };
            window.TASuite.main.prototype.checkNewResults = function () {
              this.calculateSimResults();
     
              if (this.compareTargets()) {
                this.found_improvement = true;
                this.saveFormation();
                this.setTargets();
                this.calculateSimResults();
                this.updateStatsWindow();
                return true;
              }
     
              return false;
            };
          }
     
          function TAOpt_checkIfLoaded() {
            try {
              if (typeof qx != 'undefined') {
                a = qx.core.Init.getApplication(); // application
                mb = qx.core.Init.getApplication().getMenuBar();
                ta = window.TASuite.main.getInstance();
                if (a && mb && ta) {
                  createTweak();
                  window.TASuite.main.getInstance().initOptimizer();
                } else window.setTimeout(TAOpt_checkIfLoaded, 1000);
              } else {
                window.setTimeout(TAOpt_checkIfLoaded, 1000);
              }
            } catch (e) {
              if (typeof console != 'undefined') console.log(e);
              else if (window.opera) opera.postError(e);
              else GM_log(e);
            }
          }
     
          if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(TAOpt_checkIfLoaded, 15000);
          }
        }
     
        // injecting, because there seem to be problems when creating game interface with unsafeWindow
      var TAOptScript = document.createElement("script");
      var txt = TAOpt_mainFunction.toString();
      TAOptScript.innerHTML = "(" + txt + ")();";
      TAOptScript.type = "text/javascript";
      if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(TAOptScript);
      }
     
    })();
