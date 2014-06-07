// ==UserScript==
// @name           Base Statistics
// @author         dedicated to GoldenDp
// @description    press (left) Alt + M and insert all your bases info into message / chat / post
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL      https://userscripts.org/scripts/source/164794.meta.js
// @downloadURL    https://userscripts.org/scripts/source/164794.user.js
// @version        2.0.10
// ==/UserScript==
(function () {
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
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "M") {
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var txt = "", c, unitData, bh, supp, type, df;
                for (var key in apc) {
                  c = apc[key];
                  txt += "Off: [b] " + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b], ";
                  txt += "Def: [b] " + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b], ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                    if (df !== null) {
                    txt += "DeFac: " + df.get_TechGameData_Obj().dn.slice(1, 1) + "[b]" + df.get_CurrentLevel() + "[/b], ";
                    }
                  if (bh !== null) {
                    txt += "CY: " + bh.get_TechGameData_Obj().dn.slice(1, 1) + "[b]" + bh.get_CurrentLevel() + "[/b], ";
                  }
                  if (supp !== null) {
                    txt +=  supp.get_TechGameData_Obj().dn.slice(0, 3) + ": [b]" + supp.get_CurrentLevel() + "[/b]";
                    txt += " - [coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]";
                    //txt += "BaseRep: [b]" + (c.get_CityBuildingsData().GetFullRepairTime() / 3600).toFixed(2) + "h[/b] ";
                    //txt += "defRT: [b]" + (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Defense) / 3600).toFixed(2) + "h[/b] ";
                  }  
                  txt += "[hr]";
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
                  if (base.get_Level() >= 35)
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
                inputField.value += "[b]total bases: " + baseCount+ "[/b]\r\n";
                inputField.value += "[b]total supports: " + supBaseCount + " (" + (supBaseCount / baseCount * 100).toFixed(0) + "%)"+ "[/b]\r\n";
                inputField.value += "[b]avrg support lvl: " + avg.toFixed(2)+ "[/b]\r\n";
                inputField.value += "[b]supports lvl 35+: " + high + " (" + (high / baseCount * 100).toFixed(0) + "%)[/b]";
                //for (var i in info)
                //  console.log("Type: " + i + " Count: " + info[i]);
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
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);
  }
})();