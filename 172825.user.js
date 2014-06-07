// ==UserScript==
// @name           CnC: Tiberium Alliances Info HOT
// @author         Modified by: Mike (1.Author TheStriker)
// @description    Alt+Y - Insert to message/chat/post all your bases/cities info
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.0.7
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
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                // player bases info to share with others
                
                var txt = "", c, unitData;
                //PlayerName - Alliance
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities();
                var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                var txt = "[b] [player]" + PlayerName + "[/player] [/b] \n";
                // all player cities
                var apc2 = apc.get_AllCities().d;               
                for (var key in apc2) {
                  c = apc2[key];
                  txt += "[b]" + c.get_Name() + "[/b], [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords], ";
                  txt += "BN: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b], ";
                  txt += "Def: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b], "; 
                  txt += "Off: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b], ";
                  unitData = c.get_CityBuildingsData();
                  ion = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  art = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  fal = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (ion !== null) {
                      txt += "Ion: [b]" + ion.get_CurrentLevel() + "[/b] ";
                  }
                  if (art !== null) {
                      txt += "Sky: [b]" + art.get_CurrentLevel() + "[/b] ";
                  }
                  if (fal !== null) {
                      txt += "Fal: [b]" + fal.get_CurrentLevel() + "[/b] ";
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
                inputField.value += "Bases: " + baseCount + " SupCount: " + supBaseCount + "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) Avg: " + avg.toFixed(2) + " 25+: " + high + "(" + (high / baseCount * 100).toFixed(0) + "%)";
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