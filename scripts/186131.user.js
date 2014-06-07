// ==UserScript==
// @name        CnC bases overview to send to email
// @author      Malabar, basé sur "C&C Tiberium Alliances: Base datas overview to mail" de Scripter D. - based on "basen scannen 1" from Bratze 
// @description Alt+Y - Insert dans forum/chat les données essentielles de vos bases
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     0.2
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

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
				var joueur = ClientMainData.get_Player.get_Name();
				var alliance = ClientLib.Data.MainData.getInstance().get_Alliance().get_Name();
                var faction = ClientLib.Base.EFactionType.Faction;
				var txt = "", c, unitData, bh, supp, type, df,dif;
				var repair = ClientLib.Base.EItemCategory.ArmyRepairTimeCapacity;
				
				txt += " [b]Joueur : [/b]" + joueur + " | [b]Alliance : [/b]" + alliance + " | [b]Faction : [/b]" + faction;
				txt += String.fromCharCode(13);
				txt += " [b] Réparation: [/b]" + repair + " | [b] PC : [/b]" + ClientLib.Base.EResourceType.CommandPoints;
				  txt += "[hr]";
                for (var key in apc) {
                  c = apc[key];
                  txt += " [coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: ";
				  txt += String.fromCharCode(13);
				  
                  //txt += " Basis: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
                  txt += " Attaque : [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
				  txt += " Défense : [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
                  //txt += "[u]| [i]Differenz: [b]" + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i] |[/u] "; 
				  
				  
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  
				  // Base
				  if (bh !== null) {
                      txt += " [b]Base :[/b] " + bh.get_CurrentLevel() + " ";
                  }
				  // Niveau base
                  if (df !== null) {
                      txt += " [b]Chantier : [/b]" + df.get_CurrentLevel() + " ";
                  }
				  // Soutien
                  if (supp !== null) {
                    txt += " [b]" + supp.get_TechGameData_Obj().dn + ": [/b]" + supp.get_CurrentLevel() + " ";
                  }
				  
				  txt += String.fromCharCode(13);
				  //txt += String.fromCharCode(10)
				  
				  // Energie
				  txt += " Energie: [/b]" + (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
				  // Tiberium
				  txt += " [b] Tiberium: [/b]" + (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
				  // Cristaux
				  txt += " [b] Cristaux: [/b]" + (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
				  
				  txt += String.fromCharCode(13);
					
				  
				  
                  txt += "[hr]";
                }
                inputField.value += txt;
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