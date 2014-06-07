// ==UserScript==
// @name           C&C: VvJ_RF BASE INFO
// @namespace      BASEINFO
// @Id             164915
// @author         k37z3r
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen 3.0 Unported Lizenz (CC-BY-NC-SA 3.0)
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/deed.de/
// @description    Alt+Y - Kopiert deine Basis-Informationen in eine Nachricht/Chat/Forumpost
// @downloadURL    https://userscripts.org/scripts/source/164915.user.js
// @updateURL      https://userscripts.org/scripts/source/164915.meta.js
// @icon           http://s3.amazonaws.com/uso_ss/icon/164915/large.png?1368107515
// @description    Dieses Script ist auf Deutsch und für die Allianz VvJ_Raid_Freaks auf Welt 24 optimiert
// @description    Basierend auf C&C: T.A.C.U.B.I (http://userscripts.org/scripts/review/158800)
// @description    Veränderungen:
// @description    Rechtschreibfehler behoben
// @description    Paketproduktion wird angezeigt
// @description    Globale Credit-Produktion wird angezeigt
// @description    Informationen wo keine Produktion stattfindet wird nicht mehr angezeigt
// @description    Rep.Zeit der Basis wird angezeigt
// @grant          none
// @include        *tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.4
// ==/UserScript==
(function () {
  var TAI_main = function () {
       function formatNumbersCompact(value, decimals) {
          if (decimals == undefined) decimals = 2;
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
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var txt = "", c, unitData, bh, supp, type, df,dif;
				  txt += "[hr]";
				  sum = 0;
				  sumb = 0;
                for (var key in apc) {
                  c = apc[key];
                  txt += " [coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: \n";
                  txt += " Basis: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] \n";
                  txt += " Offensive: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] \n";
				  txt += " Defensive: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] \n";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                    txt += " Bauhof: [b]" + bh.get_CurrentLevel() + "[/b] \n";
                  }
                  if (df !== null) {
                    txt += " Verteidigungseinrichtung: [b]" + df.get_CurrentLevel() + "[/b] \n";
                  }
                  if (supp !== null) {
                    txt += " " + supp.get_TechGameData_Obj().dn + ": [b]" + supp.get_CurrentLevel() + "[/b] \n";
                  }
				  deucre = (ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false));
				  deucreb = (ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false));
				  deutib = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
				  deutibb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium).toFixed(0));
				  deucry = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
				  deucryb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal).toFixed(0));
				  alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
				  deupow = (c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
				  deupowb = (c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power).toFixed(0));
				  if ((deucre+deucreb) > 0){
				    txt += " Credits (Dauerhaft/Paket): [b]" + formatNumbersCompact(deucre) + " pro Std. / " + formatNumbersCompact(deucreb) + " pro Std.[/b] \n";
				  }
				  if ((deutib+deutibb) >0){
				    txt += " Tiberium (Dauerhaft/Paket): [b]" + formatNumbersCompact(deutib) + " pro Std. / " + formatNumbersCompact(deutibb) + " pro Std.[/b] \n";
				  }
				  if ((deucry+deucryb) >0){
				    txt += " Kristall (Dauerhaft/Paket): [b]" + formatNumbersCompact(deucry) + " pro Std. / " + formatNumbersCompact(deucryb) + " pro Std.[/b] \n";
				  }
				  if ((deupow+deupowb) >0){
				    txt += " Energie (Dauerhaft/Paket): [b]" + formatNumbersCompact(deupow) + " pro Std. / " + formatNumbersCompact(deupowb) + " pro Std.[/b] \n";
				  }
				  txt += " benötigte Rep.Zeit der Basis bei Zerstörung: [b]" + transformtime(c.get_CityBuildingsData().GetFullRepairTime().toFixed(0)) + " Std.[/b] \n";
                  txt += "[hr] \n";
				  txt += " ";
				  sum = sum+deucre;
				  sumb = sumb+deucreb;
                }
				if ((sum+sumb) >0){
				  txt += " Globale Prod. Credits (Dauerhaft/Paket): [b]" + formatNumbersCompact(sum) + " pro Std. / " + formatNumbersCompact(sumb) + " pro Std.[/b] \n";
				  txt += "[hr] \n";
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

