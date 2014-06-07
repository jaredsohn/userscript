// ==UserScript==
// @name           C&C: T.A.C.U.B.I
// @author         TheStriker (modified by htc1977 & sxseth)
// @description    Alt+M - Insert to message/chat/post all your bases/cities info
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant          none
// @version        0.1.5
// ==/UserScript==

function startTACUBI() {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
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
                    txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: ";
                  txt += "[u]Basis[/u]: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "[u]Deff[/u]: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
                  txt += "[u]Off[/u]: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "[u]| [i]Differenz: [b]" + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i] |[/u] ";  
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                      txt += "[u]BH[/u]: [b]" + bh.get_CurrentLevel() + "[/b] ";
                  }
                  if (df !== null) {
                      txt += "[u]VE[/u]: [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  if (supp !== null) {
                    txt += "[u]" + supp.get_TechGameData_Obj().dn + "[/u]: [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "\n";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "N") {
                var bases = ClientLib.Data.MainData.GetInstance().get_AllianceSupportState().get_Bases().d;
                var base, keys = Object.keys(bases), len = keys.length, info = {}, avg = 0, high = 0, supBaseCount = len;
                while (len--) {
                  base = bases[keys[len]];
                  if (!info.hasOwnProperty(base.get_Type())) {
                    info[base.get_Type()] = 0;
                  }
                  info[base.get_Type()]++;
                  if (base.get_Level() >= 30)
                    high++;
                  avg += base.get_Level();
                }
                avg /= supBaseCount;
                var members = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d, member, baseCount = 0;
                keys = Object.keys(members);
                len = keys.length;
                while (len--) {
                  member = members[keys[len]];
                  baseCount += member.Bases;
                }
                inputField.value += "Bases: " + baseCount + " SupCount: " + supBaseCount + "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) Avg: " + avg.toFixed(2) + " 30+: " + high + "(" + (high / baseCount * 100).toFixed(0) + "%)";
                for (var i in info)
                  console.log("Type: " + i + " Count: " + info[i]);
              }
            }
          }
        } // members
      });
    }

    // Loading
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
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);
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
        var tacubiDate = new Date();
        var tacubiWorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId(); 
        var tacubiAllianceID = ClientLib.Data.MainData.GetInstance().get_Player().get_AllianceId();
        if ((tacubiWorldID!=156) || (tacubiAllianceID!=126))
        {
            return;
        } else {
            if (tacubiDate.getDay()==0)
            {
                alert("Bitte denke daran jeden Sonntag Deine Basenwerte (durch ALT+M)\nins extra dafuer vorgesehene forum zuposten!\n\nVielen Dank.");
            }
        }
        startTACUBI();
    }
    
}
function startup(){
    setTimeout(waitForClientLib, 10000);
};
startup();