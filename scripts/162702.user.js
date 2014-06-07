// ==UserScript==
// @name           123_rampart_321
// @author         TheStriker
// @modified       Rampart
// @description    Alt+P - Insert homework; ALT+O - Insert Off
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.7
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
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "P") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, bh, supp, type, df;
                for (var key in apc) {
                  c = apc[key];
                  unitData = c.get_CityBuildingsData();
				  
				  //BasisName & Coordinaten
                  txt += "[u][b]" + c.get_Name() + "[/b][/u] [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords] ";
                  
                  ///************************///
				  //Basisstufe
                  txt += "\n[u]Basisstufe:[/u] [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";      
                  //////////////////////////////
				  
				  ///************************///
				  //Bauhof
				  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
				  txt += "\n[u]" + bh.get_TechGameData_Obj().dn + ":[/u] [b]" + bh.get_CurrentLevel() + "[/b] ";                       
                  //////////////////////////////
				  
				  ///************************///
				  //VZ
                  cc = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Command_Center);				  
                  if (cc !== null) {
                    txt += "\n[u]" + cc.get_TechGameData_Obj().dn + ":[/u] [b]" + cc.get_CurrentLevel() + "[/b] ";
                  }
				  //Off
                  txt += "\n[u]Off:[/u] [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
				   
                  ///************************///
				  //VZ
                  vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);				  
                  if (vz !== null) {
                    txt += "\n[u]" + vz.get_TechGameData_Obj().dn + ":[/u] [b]" + vz.get_CurrentLevel() + "[/b] ";
                  }
				  //Def
                  txt += "\n[u]Def:[/u] [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b]";	
				  
				  //VE
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  if (df !== null) {
                    txt += "\n[u]" + df.get_TechGameData_Obj().dn + ":[/u] [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  //////////////////////////////
                  
				  //Unterstützung
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (supp !== null) {				 
                    txt += "\n[u]Unterstützung:[/u] [b]" + supp.get_TechGameData_Obj().dn.slice(0, 3) + " lvl:" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              } 
			  else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "O") 
			  ///************************///
			  {	
				var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData;
                var tmp = 0.0;
                for (var key in apc)
                {
					c = apc[key];
					unitData = c.get_CityBuildingsData(); 
            
                    //BasisName & Coordinaten
				    txt += "[u][b]" + c.get_Name() + "[/b][/u] [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords] \n";
            
					if (tmp != c.get_LvlOffense().toFixed(2))
					{
						
                  
						///************************///
						//Basisstufe
						//txt += "\n[u]Basisstufe:[/u] [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";      
						//////////////////////////////
				  
						///************************///
						//Off
						txt += "[u]Off:[/u] [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";               
						 
                    }                    
                   txt += "[hr]";
                }
                inputField.value += txt;
			  }
			  //////////////////////////////	
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