// ==UserScript==
// @name           CCTA:CCFL STATS
// @author         TheStriker (modified by john33fr)
/* @description    Utilisez Alt+Y pour insérer les stats sur le forum ou dans un message.
Basé sur C&C: T.A.C.U.B.I (http://userscripts.org/scripts/review/158800)
*/
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant          none
// @version        1.0
// ==/UserScript==
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", {
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("CCTA:CCFL STATS loaded.");
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var txt = "", c, unitData, bh, supp, type, df,dif;
				  txt += "";
                for (var key in apc) {
                  c = apc[key];
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  txt += c.get_Name() + ": " + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "";
                  if (bh !== null) {
                      txt += " (CY:" + bh.get_CurrentLevel() + ")";
                  }
                  txt += " / ATT: " + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "";
				  txt += " / DEF: " + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "";
                  if (df !== null) {
                      txt += " (DC:" + df.get_CurrentLevel() + ")";
                  }
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (supp !== null) {
                    txt += " / " + supp.get_TechGameData_Obj().dn.slice(0, 6) + ": " + supp.get_CurrentLevel() + "";
                  }
                  txt += "\n";
                }
                inputField.value += txt;
              }
            }
          }
        }
      });
    }
    function TAI_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            createInstance();
            TAI.getInstance().initialize();
          } else setTimeout(TAI_checkIfLoaded, 1000);
        } else {
          setTimeout(TAI_checkIfLoaded, 1000);
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
      setTimeout(TAI_checkIfLoaded, 1000);
    }
  };
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);
  }
})();