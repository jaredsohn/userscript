// ==UserScript==
// @name           Tiberium Alliances Combat Simulator
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.5
// @author         PythEch & KRS_L
// ==/UserScript==

// ==/UserScript==
(function () {
  var TASuite_mainFunction = function () {
    console.log("Simulator loaded");

    // Using EA's API (Limited Support)
    function LimitedCreateTweak() {
      var TASuite = {};
      qx.Class.define("TASuite.main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          buttons: {
            attack: {
              simulate: null, // buttonSimulateCombat
              unlock: null, // buttonUnlockAttack
            },
          },

          initialize: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            this.buttons.attack.simulate = new qx.ui.form.Button("Simulate");
            this.buttons.attack.simulate.set({
              width: 58,
              appearance: "button-text-small",
              toolTipText: "Start Combat Simulation"
            });
            this.buttons.attack.simulate.addListener("click", this.startSimulation, this);
            armyBar.add(this.buttons.attack.simulate, {
              top: 112,
              right: 62
            });

            this.buttons.attack.unlock = new qx.ui.form.Button("Unlock");
            this.buttons.attack.unlock.set({
              width: 55,
              height: 46,
              appearance: "button-text-small",
              toolTipText: "Unlock Attack Button"
            });
            this.buttons.attack.unlock.addListener("click", this.unlockAttacks, this);
            this.buttons.attack.unlock.setOpacity(0.5);
            armyBar.add(this.buttons.attack.unlock, {
              top: 107,
              right: 4
            });

            _this = this;
          },
          unlockAttacks: function () {
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.remove(this.buttons.attack.unlock);
            var _this = this;
            setTimeout(function () {
              armyBar.add(_this.buttons.attack.unlock);
            }, 2000);
          },
          startSimulation: function () {
            try {
              var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
              ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
              ClientLib.Data.MainData.GetInstance().get_Combat().Clear();
              city.SimulateBattle();
              ClientLib.Data.MainData.GetInstance().get_Combat().set_Id(city.get_Id());
              var app = qx.core.Init.getApplication();
              app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatAttacker, city.get_Id(), 0, 0);

            } catch (e) {
              console.log(e);
            }
          },
        }
      });
    }

    function TASuite_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb && typeof PerforceChangelist !== 'undefined') {
			if (PerforceChangelist > 366187) {
              LimitedCreateTweak();
            } else {
              alert("C&C TA Simulator:\r\nUnsupported Version:" + PerforceChangelist);
            }
            window.TASuite.main.getInstance().initialize();
          } else window.setTimeout(TASuite_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TASuite_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(TASuite_checkIfLoaded, 1000);
    }

  }
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TASuiteScript = document.createElement("script");
  var txt = TASuite_mainFunction.toString();
  TASuiteScript.innerHTML = "(" + txt + ")();";
  TASuiteScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
})();