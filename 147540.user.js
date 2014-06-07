// ==UserScript==
// @name C&C Tiberium Alliances Wrapper
// @description Creating prototypes that EA missed in their API
// @namespace CCTAWrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.9.2
// @author mmaelstrom, PythEch, KRS_L, TheStriker
// @require http://sizzlemctwizzle.com/updater.php?id=140988
// ==/UserScript==
(function () {
  var CCTAWrapper_main = function () {
    try {
      /*var v = null;

      function setValue(a, b, c, value) {
        switch (v) {
        case 0:
          a = value;
          break;
        case 1:
          b = value;
          break;
        case 2:
          c = value;
          break;
        default:
          break;
        }
      }*/

      function createCCTAWrapper() {
        console.log('CCTAWrapper loaded');

        /*****************************************************/
        /** Creating prototypes that EA missed in their API **/
        /*****************************************************/

        /*switch (PerforceChangelist) {
          //Localized Servers
        case 364597:
          v = 0;
          break;
          //English Servers  
        case 366355:
          v = 1;
          break;
          //Closed Beta Servers  
        case 367696:
          v = 2;
          break;
        default:
          break;
        }*/

        System = $I;
        SharedLib = $I;

        System.EventHandler = System.UXDRTN;

        //ClientLib.Vis.ViewModeChange.prototype.$ctor = ClientLib.Vis.ViewModeChange.prototype.EXEWFH;
        System.EventHandler.prototype.$ctor = System.EventHandler.prototype.NKAYQG;
        ClientLib.Vis.ViewModeChange.prototype.$ctor = ClientLib.Vis.ViewModeChange.prototype.NKAYQG;

        SharedLib.Combat = SharedLib.ABMZCA;
        SharedLib.Combat.CbtSetup = SharedLib.PIZEIS;
        SharedLib.Combat.CbtSimulation = SharedLib.MTNICQ;

        //ClientLib.Vis.Battleground.Battleground.prototype.get_Entities
        SharedLib.Combat.CbtSetup.prototype.get_Entities = function () {
          return this.VMKWMN;
        };
        ClientLib.Vis.Battleground.Battleground.prototype.get_Entities = function () {
          return this.VMKWMN;
        };

        SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.RVQKEM;

        SharedLib.Combat.CbtSimulation.prototype.get_iCombatStep = function () {
          return this.XPJFXB;
        };

        SharedLib.Combat.CbtEntity = SharedLib.RMODUK;
        SharedLib.Combat.CbtEntity.prototype.get_eAlignment = function () {
          return this.VTZLJN;
        };
        SharedLib.Combat.CbtEntity.prototype.get_iHitpoints = function () {
          return this.FOYNHE;
        };
        SharedLib.Combat.CbtEntity.prototype.get_iHitpointsCurrent = function () {
          return this.BVCBXJ;
        };
        SharedLib.Combat.CbtEntity.prototype.get_MDCTypeId = function () {
          return this.ADPYGJ;
        };
        SharedLib.Combat.CbtEntity.prototype.get_iLevel = function () {
          return this.XAWKEE;
        };

        ClientLib.Base.Util.GetUnitLevelData = ClientLib.Base.Util.MYJUVV;

        ClientLib.Data.World = SharedLib.DHZVSV;
        ClientLib.Data.World.prototype.getSectors = function () {
          return this.EBJZUK;
        };

        ClientLib.Data.CityUnits.prototype.get_FullRawRepairTimeForUnitGroupTypes = function () {
          return this.IKDTVE;
        };
        ClientLib.Data.CityUnits.prototype.get_OffenseUnits = ClientLib.Data.CityUnits.prototype.VPNCHY;
        ClientLib.Data.CityUnits.prototype.get_DefenseUnits = ClientLib.Data.CityUnits.prototype.BFENHD;

        ClientLib.Data.CityRepair = SharedLib.KBVZQX;
        ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.JPPHSL;
        ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.IMVKOC;
        ClientLib.Data.CityRepair.prototype.ConvertRepairCost = ClientLib.Data.CityRepair.prototype.SPZDZS;

        ClientLib.Data.CityPreArmyUnits.prototype.UpdateArmyLayout = ClientLib.Data.CityPreArmyUnits.prototype.CIVNTG; // Should not be needed
        ClientLib.Data.CityPreArmyUnits.prototype.RefreshData = ClientLib.Data.CityPreArmyUnits.prototype.UPLGQX;

        ClientLib.Data.City.prototype.getResourceLayout = function () {
          return this.TTZXUV;
        };

        ClientLib.Data.CityBuildings.prototype.get_Buildings = function () {
          return this.QQXUFW;
        };

        //get_UnitLevelRepairCost
        ClientLib.Data.CityEntity.prototype.get_UnitLevelRequirements = function () {
          return this.JSPNOJ;
        };
        ClientLib.Data.CityEntity.prototype.get_UnitLevelRepairCost = ClientLib.Data.CityEntity.prototype.get_UnitLevelRequirements; // does not exist in the old way

        ClientLib.Data.Combat.prototype.set_Version = function (value) {
          this.QVVMKN = value;
        };
        ClientLib.Data.Combat.prototype.set_StartStep = function (value) {
          this.ILFZUG = value;
        };
        ClientLib.Data.Combat.prototype.set_Attacker = function (value) {
          this.OYABQD = value;
        };
        ClientLib.Data.Combat.prototype.set_Defender = function (value) {
          this.UQJQSW = value;
        };
        ClientLib.Data.Combat.prototype.set_Blocker = function (value) {
          this.ZBVZOD = value;
        };
        ClientLib.Data.Combat.prototype.set_Buildings = function (value) {
          this.DFGGIB = value;
        };
        ClientLib.Data.Combat.prototype.set_Supports = function (value) {
          this.DZOZGI = value;
        };
        ClientLib.Data.Combat.prototype.set_Debug = function (value) {
          this.GNSESK = value;
        };
        ClientLib.Data.Combat.prototype.setNPCNames = ClientLib.Data.Combat.prototype.DUVWXR;

        ClientLib.Vis.Battleground.BattlegroundEntity = System.BLEBFL;
        ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_Entity = function () {
          return this.ILLYJL;
        };
        ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_UnitType = function () {
          return this.KPWXBD;
        };

        ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function () {
          return this.YPYRGP;
        };
        ClientLib.Vis.Battleground.Battleground.prototype.set_CurrentReplay = function (value) {
          this.YMADLI = value;
        };
        ClientLib.Vis.Battleground.Battleground.prototype.setCombatData = ClientLib.Vis.Battleground.Battleground.prototype.ZMQRGW;

        ClientLib.Res.ResMain.prototype.get_Gamedata = function () {
          return this.YMIGZX;
        };

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