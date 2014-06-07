// ==UserScript==
// @name           Legio Nero BASE INFO
// @namespace      BASEINFO
// @author         COW
// @copyright      Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 3.0 Unported Lizenz (CC-BY-NC-SA 3.0)
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/deed.de/
// @description    Alt+M - Kopiert deine Basis-Informationen in eine Nachricht/Chat/Forumpost
// @description    Basierend auf C&C: T.A.C.U.B.I (http://userscripts.org/scripts/review/158800)
// @description    Basierend aufhttp://userscripts.org/scripts/show/164915
// @description    Veränderungen:
// @description    Ver 0.1 Texte und Angaben gekürzt
// @description    Ver 0.2 Alt + M anstatt ATL + L (Firefox Lesezeichen)
// @description    Ver 0.3 nur noch eine Dezimalstelle
// @grant          none
// @include        *tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        0.3
// ==/UserScript==
(function () {
  var TAI_main = function () {
       function formatNumbersCompact(value, decimals) {
          if (decimals == undefined) decimals = 1;
             var valueStr;
             var unit = "";
             if (value < 1000) valueStr = value.toString();
             else if (value < 1000 * 1000) {
                valueStr = (value / 1000).toString();
                unit = "k";
             } else if (value < 1000 * 1000 * 1000) {
                valueStr = (value / 1000000).toString();
                unit = "M";
             } else {
                valueStr = (value / 1000000000).toString();
                unit = "G";
             }
             if (valueStr.indexOf(".") >= 0) {
                var whole = valueStr.substring(0, valueStr.indexOf("."));
                if (decimals === 0) {
                    valueStr = whole;
                } else {
                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                    valueStr = whole + "." + fraction;
                }
             }
          valueStr = valueStr + unit;
          return valueStr;
       }
	   function transformtime(sec){
		  var minute;
		  var hour;
		  var second;
		  hour = Math.floor(sec/3600);
		  if(sec%3600 == 0){
			 rt = hour + ":00:00";
		  }
		  else{
		     minute = Math.floor((sec - (hour * 3600))/60);
		     if((sec-(hour*3600))%60 == 0){
				 rt = ((hour == "undefined" || hour < 1) ? "0" : hour) + ":" + ((minute < 10) ? '0' + minute : minute) + ":00";
		     }
		     else{
			    second = (sec-(hour*3600))%60
				rt = ((hour == "undefined" || hour < 1) ? "0" : hour) + ":" + ((minute < 10) ? '0' + minute : minute) + ":" + ((second < 10) ? '0' + second : second);
		}
	}
	return rt;
}
    function createInstance() {
      qx.Class.define("TAI", {
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
          },
          onKey : function (ev) {
		  repairTimerLabel = null;
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "M") {
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var txt = "", c, unitData, bh, supp, type, df,dif;
				  txt += "";
				  sum = 0;
				  sumb = 0;
                for (var key in apc) {
                  c = apc[key];
				  txt += c.get_Name();
                  txt += " - LvL " + Math.floor(('0' + c.get_LvlBase().toFixed(2)).slice(-5)) + " | ";
                  txt += " OFF: " + Math.floor(('0' + c.get_LvlOffense().toFixed(2)).slice(-5)) + " | ";
				  txt += " DEF: " + Math.floor(('0' + c.get_LvlDefense().toFixed(2)).slice(-5)) + " | ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
				  dhq = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
                    
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                    txt += " BH: " + bh.get_CurrentLevel() + " | ";
                  }
                  if (df !== null) {
                    txt += " VE: " + df.get_CurrentLevel() + " | ";
                  }
				  if (dhq !== null) {
                    txt += " VZ: " + dhq.get_CurrentLevel() + " | ";
                  }
				  if (supp !== null) {
                    txt += " " + supp.get_TechGameData_Obj().dn.substr(0, 3) + ": " + supp.get_CurrentLevel() ;
                  }
				  deucre = (ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false));
				  deucreb = (ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false));
				  deucreall = (1 * deucre) + (1 * deucreb);
				  
				  deutib = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
				  deutibb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
				  deutiball = (1 * deutib) + (1 * deutibb);
				  
				  deucry = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
				  deucryb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
				  deucryall = (1 * deucry) + (1 * deucryb);
				  
				  alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
				  
				  deupow = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
				  deupowb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
				  deupowall = (1 * deupow) + (1 * deupowb);
				  txt += " \n";
				  if ((deucre+deucreb) > 0){
				    txt += " CRE: " + formatNumbersCompact(deucreall) + " |";
				  }
				  if ((deutib+deutibb) >0){
				  	txt += " TIB: " + formatNumbersCompact(deutiball) + " |";
				  }
				  if ((deucry+deucryb) >0){
				    txt += " KRI: " + formatNumbersCompact(deucryall) + " |";
				  }
				  if ((deupow+deupowb) >0){
				    txt += " ENG: " + formatNumbersCompact(deupowall);
				  }
                  txt += " \n";
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