// ==UserScript==
// @name		Base Info
// @namespace	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include		https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version		1.1
// @date		2013-03-09
// @author		Elda1990
// @description	Base Info
// ==/UserScript==
//  Alt+Y - base info
// 	Alt+X - ally info
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            var message = true;
            if(localStorage) {
              if(localStorage["Baeren.Info.lastlogin"]) {
                if((new Date().getTime() - localStorage["Baeren.Info.lastlogin"]) < 86400000) {
                  message=false;
                }
              }
            } 
            if(message) {
           		//alert("Hallo Speiler,\n\denk bitte daran deine Werte (durch ALT+Y)\n\immer zum Wochenende in Forum zu Posten!\n\MFG die \n\OBH`s \n\ ");
            	if(localStorage) {
              		localStorage["Baeren.Info.lastlogin"] = new Date().getTime();
               	}
            }
		   addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "[b]Base Name / Base Stufe / Offensiv / Deffensiv / Support / V-Zen/Einr[/b][hr]", c, unitData, bh, supp, type, df, dh;
                for (var key in apc) {
                  c = apc[key];
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  dh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ
);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  txt += "[b]" + c.get_Name() + "[/b]"; // [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]: ";
                  txt += " / " + ('0' + c.get_LvlBase().toFixed(2)).slice(-5);             
                  txt += " / " + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5);
                  txt += " / " + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5);
                    if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                   if (supp !== null) {
                    txt += " / " + supp.get_TechGameData_Obj().dn.slice(0, 3) + ": " +  supp.get_CurrentLevel();                  }
                  if (dh !== null) {
                    txt += " / " + dh.get_CurrentLevel();
                  }
                  if (df !== null) {
                    txt += "/" + df.get_CurrentLevel();
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "X") {
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
  
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);
  }
})();