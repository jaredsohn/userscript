// ==UserScript==
// @name           CnC TA Tweak
// @description    Tweaking CnC TA, contains plugins for check loot, auto collect package
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author         noface83
// @version        0.5b
// ==/UserScript==

(function(){
  var TATweak_main = function(){
    var DEBUG_MODE = true;
    function writeLog(msg){
      if (DEBUG_MODE){
        if (typeof console != 'undefined') console.log(msg);
        else if (window.opera) opera.postError(msg);
        else GM_log(msg);
      }
    };
    
    var LIST_PLAYER_CITIES       = 'TAI';
    var LIST_PLAYER_BASES        = 'AP';
    var LIST_BASES               = 'd';
    var BASE_NAME                = 'BNI';
    
    var LIST_BUILDING            = 'TDI';
    var GET_BUILDING_COLLECTABLE = 'KZI';
    var COLLECT_BUILDING_PACKAGE = 'BZI';
    
    var COORDS                   = 'MWG';
    var COORDS_X                 = 'FQJ';
    var COORDS_Y                 = 'GQJ';
    
    var DEFENSE_UNITS            = 'QIG';
    
    var OBJECT_DETAIL            = 'JWG';
    var OBJECT_NAME              = 'dn';
    var OBJECT_LIST              = 'l';
    var OBJECT_LEVEL_DATA        = 'KWG';
    var OBJECT_HEALTH            = 'PWG';
    var OBJECT_MAX_HEALTH        = 'QWG';
    
    var LOOT_INFO      = '__LOOT';
    var AUTO_COLLECT   = '__AUTOCOLLECT';
    
    var LOOT_IMG_TIBS  = '__LOOT_IMG_TIBS';
    var LOOT_IMG_CRYS  = '__LOOT_IMG_TIBS';
    var LOOT_IMG_CRDT  = '__LOOT_IMG_TIBS';
    var LOOT_IMG_RSCH  = '__LOOT_IMG_TIBS';
    var LOOT_LBL_LOAD  = '__LOOT_IMG_TIBS';
    var LOOT_LBL_INFO  = '__LOOT_IMG_TIBS';
    
    var LOOT_NPCAMP    = 'RegionNPCCampStatusInfo';
    var LOOT_NPBASE    = 'RegionNPCBaseStatusInfo';
    var LOOT_PENEMY    = 'RegionCityStatusInfoEnemy';
    var LOOT_PALLIANCE = 'RegionCityStatusInfoAlliance';
    var LOOT_POWN      = 'RegionCityStatusInfoOwn';
    
    var LOOT_TIBS = 1;
    var LOOT_CRYS = 2;
    var LOOT_CRDT = 3;
    var LOOT_RSCH = 6;
    
    var LOOT_TARGETS = {
      LOOT_NPCAMP    : 'RegionNPCCampStatusInfo',
      LOOT_NPBASE    : 'RegionNPCBaseStatusInfo',
      LOOT_PENEMY    : 'RegionCityStatusInfoEnemy',
      LOOT_PALLIANCE : 'RegionCityStatusInfoAlliance',
      LOOT_POWN      : 'RegionCityStatusInfoOwn',
    };
    
    var LOOT_WIDGETS = {};
    
    function TATweak_create(){
      var TATweak = {};
      
      qx.Class.define("TATweak.main",
                      {
                        type: "singleton",
                        extend: qx.core.Object,
                        members: {
                          vis: {
                            __LOOT: {
                              elements : {},
                            },
                          },
                          callbacks: {
                          },
                          vars: {
                            __AUTOCOLLECT: {
                              interval: 45,
                            },
                          },
                          initialize: function(){
                            qx.core.Init.getApplication()._onDesktopResize();
                            
                            this.setupVis();
                            this.setupLootInfo();
                            this.setupAutoCollect();
                            
                            writeLog('CnC TATweak initialized');
                          },
                          /* Setup Methods */
                          // Setup visualization
                          setupVis: function(){
                            // Tibs image
                            this.vis[LOOT_INFO].elements[LOOT_IMG_TIBS] = new qx.ui.basic.Image("resource/webfrontend/ui/common/icn_res_tiberium.png");
                            this.vis[LOOT_INFO].elements[LOOT_IMG_TIBS].setScale(true);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_TIBS].setWidth(16);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_TIBS].setHeight(16);
                            // Crystal image
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRYS] = new qx.ui.basic.Image("resource/webfrontend/ui/common/icn_res_chrystal.png");
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRYS].setScale(true);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRYS].setWidth(16);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRYS].setHeight(16);
                            // Credit image
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRDT]  = new qx.ui.basic.Image("resource/webfrontend/ui/common/icn_res_dollar.png");
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRDT].setScale(true);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRDT].setWidth(16);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_CRDT].setHeight(16);
                            // Research point image
                            this.vis[LOOT_INFO].elements[LOOT_IMG_RSCH] = new qx.ui.basic.Image("resource/webfrontend/ui/common/icn_res_research_mission.png");
                            this.vis[LOOT_INFO].elements[LOOT_IMG_RSCH].setScale(true);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_RSCH].setWidth(16);
                            this.vis[LOOT_INFO].elements[LOOT_IMG_RSCH].setHeight(16);
                            // Load label
                            this.vis[LOOT_INFO].elements[LOOT_LBL_LOAD] = new qx.ui.basic.Label("Scanning loot info...");
                            //this.vis[LOOT_INFO].elements[LOOT_LBL_LOAD].set({width: 200});
                            // Info label
                            this.vis[LOOT_INFO].elements[LOOT_LBL_INFO] = new qx.ui.basic.Label("Lootable resources");
                            ///this.vis[LOOT_INFO].elements[LOOT_LBL_INFO].set({width: 200});
                          },
                          // Setup loot info
                          setupLootInfo: function(){
                            for (var targetType in LOOT_TARGETS){
                              webfrontend.gui.region[LOOT_TARGETS[targetType]].prototype.onCitiesChangeBase = webfrontend.gui.region[LOOT_TARGETS[targetType]].prototype.onCitiesChange;
                              webfrontend.gui.region[LOOT_TARGETS[targetType]].prototype.onCitiesChange = function(){
                                if (!LOOT_WIDGETS[targetType]){
                                  LOOT_WIDGETS[targetType] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5,5));
                                  LOOT_WIDGETS[targetType].setTextColor("white");
                                  
                                  var widget = webfrontend.gui.region[LOOT_TARGETS[targetType]].getInstance();
                                  widget.add(LOOT_WIDGETS[targetType]);
                                }
                                
                                var tweak = window.TATweak.main.getInstance();
                                var info = tweak.calcResources(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity());
                                var lootResources = info.lootResources;
                                if(info.haveAny ||
                                   lootResources[LOOT_TIBS] > 0 ||
                                   lootResources[LOOT_CRYS] > 0 ||
                                   lootResources[LOOT_CRDT] > 0 ||
                                   lootResources[LOOT_RSCH] > 0)
                                  try {
                                    LOOT_WIDGETS[targetType].removeAll();
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_LBL_INFO],                                               {row: 0, column: 0, colSpan: 4});
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_IMG_RSCH],                                               {row: 1, column: 0});
                                    LOOT_WIDGETS[targetType].add(new qx.ui.basic.Label(webfrontend.gui.Util.formatNumbersCompact(lootResources[LOOT_RSCH])), {row: 1, column: 1});
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_IMG_TIBS],                                               {row: 1, column: 2});
                                    LOOT_WIDGETS[targetType].add(new qx.ui.basic.Label(webfrontend.gui.Util.formatNumbersCompact(lootResources[LOOT_TIBS])), {row: 1, column: 3});
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_IMG_CRDT],                                               {row: 1, column: 4});
                                    LOOT_WIDGETS[targetType].add(new qx.ui.basic.Label(webfrontend.gui.Util.formatNumbersCompact(lootResources[LOOT_CRYS])), {row: 1, column: 5});
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_IMG_RSCH],                                               {row: 1, column: 6});
                                    LOOT_WIDGETS[targetType].add(new qx.ui.basic.Label(webfrontend.gui.Util.formatNumbersCompact(lootResources[LOOT_CRDT])), {row: 1, column: 7});
                                  } catch (e) {
                                    writeLog('Add loot info widget error');
                                    writeLog(e);
                                  }
                                else
                                  try {
                                    LOOT_WIDGETS[targetType].removeAll();
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_LBL_INFO],                                               {row: 0, column: 0, colSpan: 4});
                                    LOOT_WIDGETS[targetType].add(tweak.vis[LOOT_INFO].elements[LOOT_LBL_LOAD],                                               {row: 1, column: 0, colSpan: 4});
                                  } catch (e) {
                                    writeLog('Add loot info loading error');
                                    writeLog(e);
                                  }                                
                                
                                this.onCitiesChangeBase();
                              };
                            }
                          },
                          // Setup auto collect
                          setupAutoCollect: function(){
                            writeLog('Initial autocollect building after login');
                            this.autoCollect();
                            
                            var interval = (this.vars[AUTO_COLLECT].interval + 15);
                            writeLog('Autocollect building interval: '+interval);
                            window.setInterval(this.autoCollect, (interval * 1000));
                          },
                          /* End of Setup Methods */
                          /* Loot Info Functions */
                          calcResources: function(city) {
                            var haveAny = false;
                            var lootResources = [0,0,0,0,0,0,0,0];
                            try {                              
                              // Get loot resources from building
                              var buildings = city[LIST_BUILDING]()[OBJECT_LIST];
                              haveAny |= (buildings.length > 0);
                              for (var i=0; i<buildings.length; i++){
                                var building = buildings[i];
                                var mod = building[OBJECT_HEALTH]/building[OBJECT_MAX_HEALTH];
                                writeLog('Get loot from building '+building[OBJECT_DETAIL][OBJECT_NAME]+' at '+building[COORDS][COORDS_X]+','+building[COORDS][COORDS_Y]+' with health '+building[OBJECT_HEALTH]+' of '+building[OBJECT_MAX_HEALTH]);
                                for (var j=0; j<building[OBJECT_LEVEL_DATA].rer.length; j++)
                                  lootResources[building[OBJECT_LEVEL_DATA].rer[j].t] += mod * building[OBJECT_LEVEL_DATA].rer[j].c;
                              }
                              
                              // Get loot from defense units
                              if (city[DEFENSE_UNITS] != null){
                                var defenders = city[DEFENSE_UNITS][OBJECT_LIST];
                                haveAny |= (defenders.length > 0);
                                for (var i=0; i<defenders.length; i++){
                                  var unit = defenders[i];
                                  var mod = unit[OBJECT_HEALTH]/unit[OBJECT_MAX_HEALTH];
                                  writeLog('Get loot from defender '+unit[OBJECT_DETAIL][OBJECT_NAME]+' at '+unit[COORDS][COORDS_X]+','+unit[COORDS][COORDS_Y]+' with health '+unit[OBJECT_HEALTH]+' of '+unit[OBJECT_MAX_HEALTH]);
                                  for (var j=0; j<unit[OBJECT_LEVEL_DATA].rer.length; j++)
                                    lootResources[unit[OBJECT_LEVEL_DATA].rer[j].t] += mod * unit[OBJECT_LEVEL_DATA].rer[j].c;
                                }
                              }                            
                            } catch (e) {
                              writeLog('TATweak loot info check error');
                              writeLog(e);
                            }
                            return {'haveAny': haveAny, 'lootResources': lootResources};  
                          },
                          /* End of Loot Info Functions */
                          autoCollect: function(){
                            try {
                              var allCitiesData = ClientLib.Data.MainData.GetInstance()[LIST_PLAYER_CITIES][LIST_PLAYER_BASES]()[LIST_BASES];
                              
                              writeLog('Checking all cities building');
                              for (var currentCityId in allCitiesData){
                                var currentCity = allCitiesData[currentCityId];
                                writeLog('Get building list for base '+currentCity[BASE_NAME]);
                                
                                var buildings = currentCity[LIST_BUILDING]();
                                if (buildings != 'undefined'){
                                  writeLog('Found '+buildings[OBJECT_LIST].length+' buildings');
                                  for (var i = 0; (i < buildings[OBJECT_LIST].length); i++) {
                                    var currentBuilding = buildings[OBJECT_LIST][i];
                                    if (currentBuilding[GET_BUILDING_COLLECTABLE]() > 0){
                                      writeLog('Collect '+currentBuilding[OBJECT_DETAIL][OBJECT_NAME]+' at '+currentBuilding[COORDS][COORDS_X]+','+currentBuilding[COORDS][COORDS_Y]+' with package: '+currentBuilding[GET_BUILDING_COLLECTABLE]());
                                      currentBuilding[COLLECT_BUILDING_PACKAGE]();
                                    } else
                                      writeLog('Collect '+currentBuilding[OBJECT_DETAIL][OBJECT_NAME]+' at '+currentBuilding[COORDS][COORDS_X]+','+currentBuilding[COORDS][COORDS_Y]+' no package to collect');
                                  }
                                }
                                else
                                  writeLog('No building on base '+currentCity[BASE_NAME]);
                              }
                            }catch(e){
                              writeLog('Building check error');
                              writeLog(e);
                            }
                          },
                        }
                      });
      writeLog('CnC TATweak created');
    }
    
    function TATweak_checkIfLoaded(){
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            TATweak_create();
            window.TATweak.main.getInstance().initialize();
          } else
            window.setTimeout(TATweak_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TATweak_checkIfLoaded, 1000);
        }
      }catch(e){
        writeLog('Script load check error');
        writeLog(e);
      }
	}
    if (/commandandconquer\.com/i.test(document.domain))
      window.setTimeout(TATweak_checkIfLoaded, 1000);
  }
      
      // injecting, because there seem to be problems when creating game interface with unsafeWindow
      var TATweakScript = document.createElement("script");
  TATweakScript.innerHTML = "(" + TATweak_main.toString() + ")();";
  TATweakScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain))
    document.getElementsByTagName("head")[0].appendChild(TATweakScript);
  
})();