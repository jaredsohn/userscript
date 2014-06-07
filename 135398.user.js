// ==UserScript==
// @name           CnC TA Autocollect Packages
// @description    Autocollect packages on city
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author         DrakeZ
// @author         Based on Tiberium Alliances Tweak by KatzSmile
// @version        0.4
// ==/UserScript==

(function(){
  var cncAutoCollect_main = function(){
    var DEBUG_MODE = false;
    function writeLog(msg){
      if (DEBUG_MODE){
        if (typeof console != 'undefined') console.log(msg);
        else if (window.opera) opera.postError(msg);
        else GM_log(msg);
      }
    };
    
    function cncAutoCollect_create(){
      var TAAutoCollect = {};
      qx.Class.define("TAAutoCollect.main",
                      {
                        type: "singleton",
                        extend: qx.core.Object,
                        members: {
                          initialize: function(){
                            qx.core.Init.getApplication()._onDesktopResize();
                            
                            var interval = (Math.floor(Math.random() * 45) + 15);
                            writeLog('Autocollect building interval: '+interval);
                            window.setInterval(this.autoCollect, (interval * 1000));
                            
                            writeLog('CnC TA Autocollec initialized');
                          },
                          autoCollect: function(){
                            try {
                              this.AllCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                              this.AllCitiesData = this.AllCities.d;
                              
                              writeLog('Checking all cities building');
                              for (var CurrentCity in this.AllCitiesData){
                                var ThisCity = this.AllCitiesData[CurrentCity];
                                writeLog('Get building list for base '+ThisCity.m_SupportDedicatedBaseName);
                                
                                this.buildings = ThisCity.TDI();
                                if (this.buildings != 'undefined'){
                                  writeLog('Found '+this.buildings.l.length+' buildings');
                                  for (var i = 0; (i < this.buildings.l.length); i++) {
                                    this.CurrentBuilding = this.buildings.l[i];
                                    if (this.CurrentBuilding.KZI() > 0){
                                      writeLog('Collect '+this.CurrentBuilding.TZI.dn+' package at '+this.CurrentBuilding.MWG.FQJ+':'+this.CurrentBuilding.MWG.GQJ);
                                      this.CurrentBuilding.BZI();
                                    }
                                  }
                                }
                                else
                                  writeLog('No building on base '+ThisCity.m_SupportDedicatedBaseName);
                              }
                            }catch(e){
                              writeLog('Building check error');
                              writeLog(e);
                            }
                          },
                        }
                      });
      writeLog('CnC TA Autocollect created');
    }
    
    function TAAutoCollect_checkIfLoaded(){
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            cncAutoCollect_create();
            window.TAAutoCollect.main.getInstance().initialize();
          } else
            window.setTimeout(TAAutoCollect_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TAAutoCollect_checkIfLoaded, 1000);
        }
      }catch(e){
        writeLog('Script load check error');
        writeLog(e);
      }
	}
    if (/commandandconquer\.com/i.test(document.domain))
      window.setTimeout(TAAutoCollect_checkIfLoaded, 1000);
  }
                            
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var CnCAutoCollectScript = document.createElement("script");
  CnCAutoCollectScript.innerHTML = "(" + cncAutoCollect_main.toString() + ")();";
  CnCAutoCollectScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain))
    document.getElementsByTagName("head")[0].appendChild(CnCAutoCollectScript);
  
})();