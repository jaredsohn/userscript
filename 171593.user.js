// ==UserScript==
// @name           FRC
// @author         TheStriker (modifié par OswaldJon)
// @description    Voir forum pour explications
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant          none
// @version        0.1
// ==/UserScript==

function initFrcReport() {
  var FRC_main = function () {
    function createInstance() {
      qx.Class.define("FRC", { 
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "M") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, bh, supp, type, df,dif;
                for (var key in apc) {
                  c = apc[key];
                    txt +=  "- " + c.get_Name() +": [coords]" + c.get_PosX() + ":" + c.get_PosY() +  "[/coords] : ";
                  txt += "Base: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "Def: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
                  txt += "Att: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "| [i]Diff: [b]" + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i] | ";  
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                      txt += "CC: [b]" + bh.get_CurrentLevel() + "[/b] ";
                  }
                  if (df !== null) {
                      txt += "CD: [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  if (supp !== null) {
                    txt += supp.get_TechGameData_Obj().dn + ": [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              }
            }
          }
        }
      });
    }

    // Loading
    function FRC_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            createInstance();
            FRC.getInstance().initialize();
          } else setTimeout(FRC_checkIfLoaded, 1000);
        } else {
          setTimeout(FRC_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') {
          console.log(e);
        } else if (window.opera) {
          opera.postError(e);
        } else {
          GM_log(e);
        }
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      setTimeout(FRC_checkIfLoaded, 1000);
    }
  };
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var FRCScript = document.createElement("script");
  var txt = FRC_main.toString();
  FRCScript.innerHTML = "(" + txt + ")();";
  FRCScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(FRCScript);
  }
}
/*Main*/
function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
    {
        setTimeout(waitForClientLib, 10000);
        return;
    }
    else {
        initFrcReport();
    }
    
}
function startup(){
    setTimeout(waitForClientLib, 10000);
};
startup();