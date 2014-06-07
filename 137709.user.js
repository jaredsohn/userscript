// ==UserScript==
// @name C&C Tiberium Alliances Wrapper
// @description Creating prototypes that EA missed in their API
// @namespace CCTAWrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.9b11
// @author mmaelstrom and PythEch
// ==/UserScript==
(function() {
  var CCTAWrapper_main = function() {
    try {
      function createCCTAWrapper() {
        console.log('CCTAWrapper loaded');

        /*****************************************************/
        /** Creating prototypes that EA missed in their API **/
        /*****************************************************/
        var v = null;
        switch (PerforceChangelist) {
          // Latest patched English servers
          case 363030:
            v = 0;
            break;
          // Closed Beta Servers
          case 362709:
            v = 1;
            break;
          // Non-Patched servers
          case 361439:
            v = 2;
            break;
          case 363782:
            v = 3;
            break;
          case 364597:
            v = 4;
            break;
          default:
            //do something//
            break;
        }

        if (typeof System === 'undefined') {
          try {
            System = $I;
          } catch (e) {
            console.log("System: ", e);
          }
        }
        if (typeof SharedLib === 'undefined') {
          try {
            SharedLib = $I;
          } catch (e) {
            console.log("SharedLib: ", e);
          }
        }
        if (typeof SharedLib.Combat === 'undefined') {
          // look for GetProductionBuildingFromUntiMoveType
          try {
            SharedLib.Combat = [SharedLib.MKLAOS, SharedLib.HFKQVP, SharedLib.ELL, SharedLib.NDGYDG, SharedLib.SAFWGR][v];
          } catch (e) {
            console.log("SharedLib.Combat: ", e);
          }
        }
        if (typeof SharedLib.Combat.CbtSetup === 'undefined') {
          // look for get_DamageResolution
          try {
            SharedLib.Combat.CbtSetup = [SharedLib.XTJTVV, SharedLib.YUEBQC, SharedLib.PML, SharedLib.HOFZBM, SharedLib.HRYPNH][v];
          } catch (e) {
            console.log("SharedLib.Combat.CbtSetup: ", e);
          }
        }
        if (typeof SharedLib.Combat.CbtSimulation === 'undefined') {
          try {
            SharedLib.Combat.CbtSimulation = [SharedLib.PRFSNB, SharedLib.FBJZWE, SharedLib.QOL, SharedLib.HYSASQ, SharedLib.RNTUQF][v];
          } catch (e) {
            console.log("SharedLib.Combat.CbtSimulation: ", e);
          }
        }
        if (typeof ClientLib.Data.World === 'undefined') {
          try {
            ClientLib.Data.World = [System.QLAHZR, System.DMZICA, System.HHH, System.OHKQYD, SharedLib.PWLPYH][v];
          } catch (e) {
            console.log("ClientLib.Data.World: ", e);
          }
        }
        
        if(!ClientLib.Data.World.prototype.getSectors) {
          ClientLib.Data.World.prototype.getSectors = function() {
            // m_Sectors
            try {
              return [this.RBJXOL, this.IWEESP, this.KIH, this.HYMYNV, this.ONQEIH][v];
            } catch (e) {
              console.log("ClientLib.Data.World.prototype.getSectors: ", e);
              return null;
            }
          }
        }
        
        if (typeof ClientLib.Data.CityRepair === 'undefined') {
          try {
            ClientLib.Data.CityRepair = [System.YSYTHM, System.CJRFBH, System.TVI, System.JMOCEM, SharedLib.AJJPZZ][v];
          } catch (e) {
            console.log("ClientLib.Data.CityRepair: ", e);
          }
        }

        if (!System.EventHandler) {
          System.EventHandler = function() {
            try {
              console.log("System.EventHandler");
              return [this.GRHRBP, this.WMJHOK, this.QQL, this.UMBJYW, this.QUXOEF][v]
            } catch (e) {
              console.log("System.EventHandler: ", e);
              return null;
            }
          }
        }
        if (!System.EventHandler.prototype.$ctor) {
          System.EventHandler.prototype.$ctor = function() {
            try {
              return [this.TNQEHB, this.GEDTYY, this.HGL, this.EJYJNU, this.LEUXCZ][v];
            } catch (e) {
              console.log("System.EventHandler.$ctor: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Vis.Battleground.BattlegroundEntity) {
          try {
            ClientLib.Vis.Battleground.BattlegroundEntity = [System.MPWDBM, System.GMKMXN, System.GZJ, System.UJRHYF, System.PCTLRR][v];
          } catch (e) {
            console.log("ClientLib.Vis.Battleground.BattlegroundEntity: ", e);
          }
        }

        if (!ClientLib.Res.ResMain.prototype.get_Gamedata) {
          ClientLib.Res.ResMain.prototype.get_Gamedata = function() {
            // m_Gamedata
            try {
              return [this.NUMTUV, this.IYHFVG, this.YEJ, this.NQWCNO, this.EUIRZQ][v];
            } catch (e) {
              console.log("ClientLib.Res.ResMain.prototype.get_Gamedata: ", e);
              return null;
            }
          }
        }
        if (!ClientLib.Data.CityUnits.prototype.get_FullRawRepairTimeForUnitGroupTypes) {
          ClientLib.Data.CityUnits.prototype.get_FullRawRepairTimeForUnitGroupTypes = function() {
            // m_FullRawRepairTimeForUnitGroupTypes
            try {
              return [this.RAECNA, this.NBLSAX, this.ZHG, this.OLGZRY, this.EDTHDX][v];
            } catch (e) {
              console.log("ClientLib.Res.ResMain.prototype.get_FullRawRepairTimeForUnitGroupTypes: ", e);
              return null;
            }
          }
        }
        // TEST //
        if (!SharedLib.Combat.CbtSetup.prototype.get_Entities) {
          SharedLib.Combat.CbtSetup.prototype.get_Entities = function() {
            // m_Entities
            try {
              return [this.UNMZDH, this.RMCABE, this.OAG, this.XYXNRM, this.NNXRBC][v];
            } catch (e) {
              console.log("SharedLib.Combat.CbtSetup.prototype.get_Entities: ", e);
              return null;
            }
          }
        }
        // TEST //
        if (!ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_Entity) {
          ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_Entity = function() {
            // m_Entity
            try {
              return [this.DPSDGN, this.HLUBJW, this.UBK, this.OSWGOC, this.QXYJOG][v];
            } catch (e) {
              console.log("ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_Entity: ", e);
              return null;
            }
          }
        }
        if (!ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_UnitType) {
          ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_UnitType = function() {
            // m_UnitType
            try {
              return [this.LLEHXS, this.CMCLEW, this.TAK, this.UWWDAL, this.GUXBBT][v];
            } catch (e) {
              console.log("ClientLib.Vis.Battleground.BattlegroundEntity.prototype.get_UnitType: ", e);
              return null;
            }
          }
        }
        if (!ClientLib.Data.CityBuildings.prototype.get_Buildings) {
          ClientLib.Data.CityBuildings.prototype.get_Buildings = function() {
            // m_Buildings , GetFullRepairTime
            try {
              return [this.LYXSZY, this.ZATNVD, this.ZEI, this.RKLPXW, this.HWFIJH][v];
            } catch (e) {
              console.log("ClientLib.Data.CityBuildings.prototype.get_Buildings: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Data.CityUnits.prototype.get_DefenseUnits) {
          ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function() {
            // m_DefenseUnits
            try {
              return [this.KWTOCI, this.OCYIKN, this.QIG, this.QNYAIE, this.TXDWUM][v];
            } catch (e) {
              console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Data.CityEntity.prototype.get_UnitLevelRequirements) {
          ClientLib.Data.CityEntity.prototype.get_UnitLevelRequirements = function() {
            // m_UnitLevelRequirements.rer
            try {
              return [this.KBUDOV, this.RBGTWS, this.KWG, this.YUQEXG, this.MNNADO][v];
            } catch (e) {
              console.log("ClientLib.Data.CityEntity.prototype.get_UnitLevelRequirements: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Data.CityRepair.prototype.CanRepair) {
          switch(v) {
            case 0:
              ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.VGWGGR;
              break;
            case 1:
              ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.MZMQLL;
              break;
            case 2:
              ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.TWI;
              break;
            case 3:
              ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.CRTGMD;
              break;
            case 4:
              ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype.SYDBAS;
              break;
          }
        //ClientLib.Data.CityRepair.prototype.CanRepair = [System.YSYTHM.prototype.VGWGGR, System.CJRFBH.prototype.MZMQLL, System.CJRFBH.prototype.TWI][v];
        }

        if (!ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost) {
          switch(v) {
            case 0:
              ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.LVTUFF;
              break;
            case 1:
              ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.SQGYHR;
              break;
            case 2:
              ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.HXI;
              break;
            case 3:
              ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.PSOTXF;
              break;
              case 4:
                ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype.CWPAVD;
                break;
          }
        //ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = [System.YSYTHM.prototype.LVTUFF, System.CJRFBH.prototype.SQGYHR, System.CJRFBH.prototype.HXI][v];
        }

        if (!ClientLib.Data.City.prototype.getResourceLayout) {
          ClientLib.Data.City.prototype.getResourceLayout = function() {
            try {
              return [this.JTKSIY, this.NCTWJE, this.KOI, this.QFKOKN, this.GGFGUN][v];
            } catch (e) {
              console.log("ClientLib.Data.City.prototype.getResourceLayout: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Vis.Battleground.Battleground.prototype.getSimulation) {
          ClientLib.Vis.Battleground.Battleground.prototype.getSimulation = function() {
            // m_Simulation
            try {
              return [this.EGIABS, this.HXGRQD, this.MAG, this.LCZLRE, this.DHSWQJ][v];
            } catch (e) {
              console.log("ClientLib.Vis.Battleground.Battleground.prototype.getSimulation: ", e);
              return null;
            }
          }
        }
        // TEST //
        if (!SharedLib.Combat.CbtSimulation.prototype.DoStep) {
          switch(v) {
            case 0:
              SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.HGWHBL;
              break;
            case 1:
              SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.ICPGRO;
              break;
            case 2:
              SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.DPL;
              break;
            case 3:
              SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.PFKXLZ;
              break;
              case 4:
              SharedLib.Combat.CbtSimulation.prototype.DoStep = SharedLib.Combat.CbtSimulation.prototype.OAEJMD;
              break;
          }
          
        /*
SharedLib.Combat.CbtSimulation.prototype.DoStep = function(_dryRun) {
// m_Simulation
try {
return [this.HGWHBL(_dryRun), this.ICPGRO(_dryRun), this.DPL(_dryRun)][v];
} catch (e) {
console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep: ", e);
return null;
}
}*/
        }
        // TEST //
        if (!ClientLib.Data.CityPreArmyUnits.prototype.UpdateArmyLayout) {
          ClientLib.Data.CityPreArmyUnits.prototype.UpdateArmyLayout = function() {
            // UpdateArmyLayout$0
            try {
              return [this.AXPSSY(), this.TNEWNF(), this.DJG(), this.SQJYVV(), this.RWXUKW()][v];
            } catch (e) {
              console.log("ClientLib.Data.CityPreArmyUnits.prototype.UpdateArmyLayout: ", e);
              return null;
            }
          }
        }

        if (!ClientLib.Data.CityPreArmyUnits.prototype.RefreshData) {
          ClientLib.Data.CityPreArmyUnits.prototype.RefreshData = function() {
            // RefreshData$0
            try {
              return [this.ZDELLG(), this.AOMXAS(), this.BJG(), this.RKBGVA(), this.WRKUTR()][v];
            } catch (e) {
              console.log("ClientLib.Data.CityPreArmyUnits.prototype.RefreshData: ", e);
              return null;
            }
          }
        }
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

