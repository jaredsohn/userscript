// ==UserScript==
// @name          PluginsLib - mhLoot - Tiberium Alliances
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @version       2.06
// @author        MrHIDEn (in game: PEEU) based on Yaeger & Panavia code.
// @namespace     PluginsLib.mhLoot
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/160800.user.js
// @updateURL     https://userscripts.org/scripts/source/160800.meta.js
// ==/UserScript==
/*TODO list
"function (){this.show();this.setActive(true);this.focus();}"
*/
(function () {
var injectBody = function ()
{      
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}

  var pluginName = "mhLoot";
  var created = false;
  function CreateClasses() {        
    //console.log('CreateClasses');
    // Classes
    //=======================================================      
    //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
    function OptionsPage() {
      try //PluginsLib.mhOptionsPage
      {  
				qx.Class.define("PluginsLib.mhOptionsPage",
        {
          type: 'singleton',
          extend: webfrontend.gui.options.OptionsPage,
          construct: function() {
            console.log('Create PluginsLib.mhOptionsPage at Loot+Info');
            this.base(arguments);
            this.setLabel('MHTools');
            
            this.extendOptionsWindow();
            
            //Add Content
            var container = this.getContentContainer(); 
            this.tabView = new qx.ui.tabview.TabView();
            container.add(this.tabView);//, {left:40, top:40});
            
            this.removeButtons();
            this.addPageAbout();
            console.log('MHTools: OptionsPage loaded.'); 
          },
          statics: {
            VERSION: '1.0.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'OptionsPage'
          },
          members: {
            pageCreated: null,
            tabView: null,
            getTabView: function() {
              return this.tabView;
            },
            addPage: function(name) {
              var c = this.tabView.getChildren();
              this.tabView.remove(c[c.length-1]);//remove PageAbout
              var page = new qx.ui.tabview.Page(name);
              page.set({height:220});
              this.tabView.add(page);
              this.addPageAbout();
              return page;
            },
            addPageAbout: function() {
              var page = new qx.ui.tabview.Page("About");
              page.set({height:220});
              this.tabView.add(page);
              page.setLayout(new qx.ui.layout.VBox());
              page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
              page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
              page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
            },
            removeButtons: function() {
              this.getChildren()[2].removeAll();
            },
            getContentContainer: function() {
                if(!this.contentCnt) {
                    this.contentCnt = this.getChildren()[0].getChildren()[0];
                }
                return this.contentCnt;
            },
            extendOptionsWindow: function() {
              var self = this;
              if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
              }
              webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                try {
                  var tabView = this.clientArea.getChildren()[0];
                  tabView.add(self);
                  webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                  self.pageCreated = true;
                  this.show();
                } catch (e) {            
                  console.warn("PluginsLib.mhOptionsPage.extendOptionsWindow: ", e);
                }
              };
            }
          }
        });
      } catch (e) {
        console.warn("qx.Class.define(PluginsLib.mhOptionsPage: ", e);      
      }
    }
    //=======================================================  
    try // "PluginsLib.mhLoot"   
		{
			qx.Class.define("PluginsLib." + pluginName,
      {
        type: 'singleton',
        extend: qx.core.Object,
        statics : {
          NAME: 'LootInfo',
          PLUGIN: 'mhLoot',
          AUTHOR: 'MrHIDEn',
          VERSION: 2.06,
          REQUIRES: '',
          NEEDS: 'Menu',
          INFO: '',
          WWW: 'http://userscripts.org/scripts/show/160800',
          ONPLUGIN: null,
          ONOPTIONS: null,
          SIZE: 0
        },
        construct: function() {         
          //console.log('Create PluginsLib.mhLoot');
          this.stats.src = 'http://goo.gl/IDap9';//2.0.x
          var version = PluginsLib.mhLoot.VERSION.toString();
          //this.base(arguments);
          for(var k in this.resPaths) {
            this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
          }
          for(var k in this.troopPaths) {
            this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
          }
          // reload bases stored in browser
          //this.lootList.reloadList();
          function Types(o) {
            var a = [];
            for(var k in o) a[o[k]] = k;
            return a;
          }             
          this.LObjectType = Types(ClientLib.Vis.VisObject.EObjectType);
          this.LViewMode = Types(ClientLib.Vis.Mode);
          
          // window
          this.Self = this;
          var backColor = '#eef';
          var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
          var viewW = region.get_ViewWidth();
          this.win = (new qx.ui.window.Window("Loot "+version));
          this.win.set({
            width:350,
            showMinimize:false,
            showMaximize:false,
            showClose:true,
            contentPadding: 6,
            allowClose:true,
            resizable:false,                  
            toolTipText: "MrHIDEn tool - Loot "+version
          });
          //http://demo.qooxdoo.org/2.0.2/apiviewer/#qx.ui.mobile.core.Widget~dblclick!event
          //mouseover
          //qx.event.Timer.once(fun,obj,time)
          /*NOTE
          PluginsLib.mhLoot.getInstance().win.toggleActive();
          PluginsLib.mhLoot.getInstance().win.setUseMoveFrame(1)
          PluginsLib.mhLoot.getInstance().win.moveTo(100,100);
          PluginsLib.mhLoot.getInstance().win.setLayoutProperties({left:200,top:100});
          lp=PluginsLib.mhLoot.getInstance().win.getLayoutProperties();
          //Object { left=586, top=112}
          */
          this.win.addListener("mouseover",function(e) {
            //TODO stop timer. message STOPED
            //this.extTimer.stop();
            //this.win.close(); 
          },this);
          this.win.addListener("click",function(e) {
              //webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.Data.Selected.X,this.Data.Selected.Y);
          },this);
          this.win.addListener("dblclick",function(e) {
            this.extTimer.stop();
            this.win.close(); 
          },this);
          this.win.addListener("close",function(e) {
            this.extTimer.stop();
            //this.win.close(); 
          },this);
          this.win.addListener("minimize",function(e) {
            if(this.extMinimized) {
              this.extMinimized = false;
              this.extPrint();
            }
            else {
              this.extMinimized = true;                
              this.win.removeAll();
            }
            this.win.restore();//trick
          },this);
          this.win.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.saveToStorage('winpos', pos);
          }, this);
          var pos = {left:(viewW-10-this.win.getWidth()), top:35};
          pos = this.loadFromStorage('winpos', pos);
          this.win.moveTo(pos.left, pos.top);
          var winLayout = new qx.ui.layout.Grid(5,5);
          this.win.setLayout(winLayout);
          this.win.setTextColor('yellow');   
          
          //this.extTimer = new qx.event.Timer.once(this.extOnTimer,this,500);
          this.extTimer = new qx.event.Timer(1000);
          this.extTimer.addListener("interval",this.extOnTimer,this);
          
          this.extendSelectionChange();
          this.extendViewModeChange();
          //options
          this.addLootPage();
          //bypass
          this.loadBypass();
          
          
          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        },
        members : {
          Self: null,
          loadFromStorage: function(key,preval) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var val = S.GetItem(this.classname+'.'+key);
              if(val!==null) {
                preval = val;
              }
            }
            return preval;
          },
          saveToStorage: function(key,val) {
            if(val!==null) {
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.classname+'.'+key, val);
            }
          },           
          win: null,
          //winStoreName: this.classname+'.winpos',
          extItems: [],
          extMinimized: false,
          extTimer: null,
          extAdd: function(l,p) {
            this.extItems.push(l,p);
          },
          extPrint: function(type) {            
            this.win.removeAll();
            if(!this.extMinimized) {
              for(var i=0;i<this.extItems.length;i+=2) {
                this.win.add(this.extItems[i],this.extItems[i+1]);
              }
            }
            this.win.open();
          },
          extOnTimer: function() {
            //console.log('extOnTimer');
            this.onSelectionChange('Timer');
            this.extPrint();
          },
          // setttings
          settings: {
            showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
            showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
            showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
            showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
            showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
            showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
            showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
            showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
            showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
            showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
            //,showMeasure:             {v:true,  d:true,  l:'Shows distance from locked object to the selected object'}
          },
          // pictures
          stats: document.createElement('img'),
          resPaths: [
            "icn_res_research_mission.png",
            "icn_res_tiberium.png",
            "icn_res_chrystal.png",
            "icn_res_dollar.png"
          ],
          resImages: [],
          troopPaths: [
            "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
            "af8d7527e441e1721ee8953d73287e9e.png",//veh
            "5f889719f06aad76f06d51863f8eb524.png",//stu
            "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
          ],
          troopImages: [],
          // store v3
          lootList: {
            storeName: 'MHToolsLootList3',
            list: {
              d: {},
              c: 0
            },
            exist: function(xy) {
              return typeof(this.list.d[xy])=="object";
            },
            save: function(xy,d) {//in use
              //console.info("lootList.save");
              try {
                if(xy<0) return;
                //id could be not actual after some patch
                var fprint = false;
                var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                if(!this.exist(xy)) {//new item
                  this.list.c++;
                  fprint = true;
                }
                this.list.d[xy] = {id:id, Data:d, xy:xy};
                //if(fprint) console.dir(this.list.d);
                // JSON - disabled
                //var S = ClientLib.Base.LocalStorage;
                //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);  
              } catch (e) {
                console.warn("lootList.save: ", e);
              }
            },
            load: function(xy) {//in use
              //console.info("lootList.load");
              try {
                if(xy<0) return {id:id,Data:{}};
                var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                if(this.exist(xy)) return this.list.d[xy];
                return {id:id,Data:{}};     
              } catch (e) {
                console.warn("lootList.load: ", e);
              }
            },
            store: function(xy, k, d) {//in use
              //console.info("lootList.store key:",k);
              try {
                var mem = this.load(xy).Data;
                mem[k] = d;
                this.save(xy,mem);        
              } catch (e) {
                console.warn("lootList.store: ", e);
              }
            },
            restore: function(xy,k) {//?? NOT in use
              //console.info("lootList.restore");
              try {
                var mem = this.load(xy).Data;
                if(typeof(mem[k])=='undefined') return 'undefined';
                return mem[k];    
              } catch (e) {
                console.warn("lootList.restore: ", e);
              }
            }              
          },            
          // bases
          Data: {
            lastSelectedBaseId: -1,
            selectedBaseId: -1
          },
          // display containers
          lootWindowPlayer: null,
          lootWindowBase: null,
          lootWindowCamp: null,
          lootWindowOwn: null,
          lootWindowAlly: null,
          lootWindowPOI: null,
          lootWindowRUIN: null,
          lootWindowHUBServer: null,          
          waiting: [1,'0','_','1','_','2','_','3','_','4','_','5','_','6','_','7','_','8','_','9','_'],          
          Display: {
            troopsArray: [],
            lootArray: [],
            iconArrays: [],
            infoArrays: [],
            twoLineInfoArrays: [],
            distanceArray: []
          },
          LObjectType: [],
          LViewMode: [],
          viewMode: 0,//"None"
          // HELPERS
          kMG: function(v) {
            var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
            var i = 0;
            while (v > 1000 && i < t.length) {
              v = (v / 1000).toFixed(1);
              i++;
            }
            return v.toString().replace('.',',') + t[i];
          },
          numberFormat: function(val,fixed) {
            return val.toFixed(fixed).replace('.',',');
          },
          hms: function(s) {
            var h = Math.floor(s/3600); s%=3600;
            var m = Math.floor(s/60); s%=60;
            var r = (h<10?"0"+h.toString():h.toString()) + ":";
            r += (m<10?"0"+m.toString():m.toString()) + ":";
            s = s.toFixed(0);
            r += (s<10?"0"+s.toString():s.toString());
            return r;
          },
          dhms: function(s) {
            var d = Math.floor(s/86400); s%=86400;
            var h = Math.floor(s/3600); s%=3600;
            var m = Math.floor(s/60); s%=60;
            var r = (d<1?"":d.toString() + ":");
            r += (h<10?"0"+h.toString():h.toString()) + ":";
            r += (m<10?"0"+m.toString():m.toString()) + ":";
            s = s.toFixed(0);
            r += (s<10?"0"+s.toString():s.toString());
            return r;
          },
          dhms2: function(s) {
            var d = Math.floor(s/86400); s%=86400;
            var h = Math.floor(s/3600); s%=3600;
            var m = Math.floor(s/60); s%=60;
            var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
            r += (h<10?"0"+h.toString():h.toString()) + ":";
            r += (m<10?"0"+m.toString():m.toString()) + ":";
            s = s.toFixed(0);
            r += (s<10?"0"+s.toString():s.toString()) + "";
            return r;
          },
          hmsRT: function(city, type) {
            var nextLevelFlag = false;
            var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
            var h = Math.floor(s/3600); s%=3600;
            var m = Math.floor(s/60); s%=60;
            var r = (h<10?"0"+h.toString():h.toString()) + ":";
            r += (m<10?"0"+m.toString():m.toString()) + ":";
            r += (s<10?"0"+s.toString():s.toString());
            return r;
          },
          // BYPASS
          getBypass: function(c,d) {
            try {
              function getKeys(obj, d) {
                for (var k in obj) {
                  var o = obj[k];
                  if (o === null) continue;
                  if (typeof(o.c) == 'undefined') continue;//count
                  if (o.c === 0) continue;//empty
                  if (typeof(o.d) == 'undefined') continue;//data {}
                  var ks = Object.keys(o.d);
                  if (ks.length != o.c) continue;
                  var u = o.d[ks[0]];
                  if(typeof(u) != 'object') continue;                  
                  if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                  if(typeof(u.GetUnitGroupType) ==  'undefined') {
                    // buildings
                    d.Keys.Buildings = k;
                    //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                  } else {
                    // units 3-attack
                    if(u.GetUnitGroupType()) {
                      d.Keys.Offences = k;
                    } else {
                      // units 0-defend
                      d.Keys.Defences = k;
                    }
                  }
                }
                if(typeof(d.Keys.Buildings)!='undefined') {
                  ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                  ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                }
                if(typeof(d.Keys.Offences)!='undefined') {
                  ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                  ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                }
                if(typeof(d.Keys.Defences)!='undefined') {
                  ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                  ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                }
              }
              if(typeof(d.Keys)=='undefined') d.Keys={};
              getKeys(c.get_CityBuildingsData(), d);
              getKeys(c.get_CityUnitsData(), d);
              var cnt=Object.keys(d.Keys).length;
              if(cnt==3) {
                console.log('PluginsLib.mhLoot Helpers are ready:');
                console.log(d.Keys);
                delete d.Keys;
                this.getBypass = function(){return true;};
                return true;
              }
              else console.log('#Keys(!=3): ',cnt);
            } catch (e) {
              console.warn("PluginsLib.mhLoot.",arguments.callee.name,': ', e);
            }
            //return d.Bypass.Rdy;
            return false;
          },
          loadBypass: function(self) {
            try {                
              if(typeof(self)=='undefined') self = this;
              var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
              if(Object.keys(ac).length<1) {
                window.setTimeout(self.loadBypass, 5000, self); // check again
                return;
              }
              for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
            } catch (e) {
              console.warn("PluginsLib.mhLoot.",arguments.callee.name,': ', e);
            }
          },
          getData: function(city) {
            try {   
              var l = {};  
              if(!this.getBypass(city,this.Data)) return l;
              
              l.Buildings = city.get_Buildings();
              l.Defences = city.get_DefenseUnits();
              l.Offences = city.get_OffenseUnits();
              
              l.rdy = true;              
            } catch (e) {
              console.warn("PluginsLib.mhLoot.",arguments.callee.name,': ', e);
            }               
            return l;
          },
          loadBase: function() { 
            try {
              //if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
              
              var d = this.Data;    
              //console.info("loot.loadBase.lastID:",d.lastSelectedBaseId);      
                          
              d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
              
              if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
              
              d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                          
              d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
              
              //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
              d.ec = d.cc.get_CurrentCity();
              if(d.ec === null) return false;
              if(d.ec.get_CityBuildingsData() === null) return false;         
              if(d.ec.get_CityUnitsData() === null) return false;         
              
              d.oc = d.cc.get_CurrentOwnCity();            
              if(d.oc === null) return false;
              if(d.oc.get_CityBuildingsData() === null) return false;
              if(d.oc.get_CityUnitsData() === null) return false;
              
              d.ol = this.getData(d.oc);
              d.el = this.getData(d.ec);// Buildings Defence Offence               
              if(typeof(d.ol)=='undefined') return false;
              if(typeof(d.el)=='undefined') return false;

              if(d.el.Buildings.c === 0) return false;
              if(d.ol.Buildings.c === 0) return false;                 
               
              //console.info("loot.loadBase.ID:",d.selectedBaseId); 
              d.lastSelectedBaseId = d.selectedBaseId; 
              d.loaded = true;
              return true;
            } catch (e) {
              console.warn("PluginsLib.mhLoot.",arguments.callee.name,': ', e);
              console.dir("PluginsLib.mhLoot.Data: ",this.Data);
              return false;
            }
          },
          getImportants: function(list) {         
            list.Support = {Condition: '-',Row: '-',Column: '-'};
            list.CY = {Condition: '-',Row: '-',Column: '-'};
            list.DF = {Condition: '-',Row: '-',Column: '-'};
            if(!this.settings.showInfo.v) return;
            for (var j in list.Buildings.d) {
              var building = list.Buildings.d[j];
              var mod = building.get_HitpointsPercent();
              var id = building.get_MdbUnitId();
              if(id >= 200 && id <= 205) {
                list.Support.Condition = 100*mod;
                list.Support.Row = 8-parseInt(building.get_CoordY());
                list.Support.Column = building.get_CoordX();
              } 
              else {
                switch (id) {
                  case 112: // CONSTRUCTION YARD
                  case 151:
                  case 177:
                    list.CY.Condition = 100*mod;
                    list.CY.Row = 8-parseInt(building.get_CoordY());
                    list.CY.Column = building.get_CoordX();
                    break;
                  case 158: // DEFENSE FACILITY
                  case 131:
                  case 195:
                    list.DF.Condition = 100*mod;
                    list.DF.Row = 8-parseInt(building.get_CoordY());
                    list.DF.Column = building.get_CoordX();
                    break;
                  default:
                    break;
                }
              }
            }
          },
          getLoots: function (ul,r) { 
            if(typeof(r)=='undefined') r={}; 
            //console.log('r',r);
            var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
            for (var j in ul.d) {
              var u = ul.d[j];// unit/building
              //here are key infos about units ranges and behavior and more 
              //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
              var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
              var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
              for (var i in cl) {
                var c = cl[i];//Requirement/Cost
                if(typeof(c)!='object') continue;                
                var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                r[k] += p * c.Count;                 
              }
            }
            return r;
          },
          //NEW API for LOOTS
          getLoots2: function (r) {
            r = r || {};
            var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
            var l=ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();     
            for (var i in l) {
              var c = l[i];//Requirement/Cost
              if(typeof(c)!='object') continue;                
              var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
              if(typeof(r[k])=='undefined') r[k] = 0;//add branch
              r[k] += c.Count;                 
            }
            return r;
          },
          calcResources: function (xy) {
            //console.info("loot.calcResources"); 
            try {          
              if (!this.settings.showLoot.v) return;

              if (!this.Data.loaded) return;
              
              this.Display.lootArray = [];            
              
              var el = this.Data.el;
              var ec = this.Data.ec;
              
              // NEW
              // ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity()
              var loots2 = this.getLoots2();              
              
              var loots = {RP:0, T:0, C:0, G:0};//for getLoots                
              
              this.getLoots(el.Buildings,loots);
              this.getLoots(el.Defences,loots);
              
              if(el.Offences.c>0) {
                var off = this.getLoots(el.Offences);                  
                //console.log('Offences: ',off);
              }
              
              this.Display.lootArray[0] = loots.RP;
              this.Display.lootArray[1] = loots.T;
              this.Display.lootArray[2] = loots.C;
              this.Display.lootArray[3] = loots.G;
                          
              this.lootList.store(xy,'lootArray',this.Display.lootArray);
            } catch (e) {
              console.warn("PluginsLib.mhLoot.calcResources: ", e);
              console.dir("PluginsLib.mhLoot.~.Data:",this.Data);
            }
          },
          calcTroops: function (xy) {
            //console.info("loot.calcTroops"); 
            try {
              if (!this.settings.showTroops.v) return;            

              if (!this.Data.loaded) return;            
              
              var troops = [0, 0, 0, 0, 0]; 
              
              var el = this.Data.el; 
                
              // enemy defence units
              for (var j in el.Defences.d) {
                var unit = el.Defences.d[j];
                var h = unit.get_Health();//EA API
                troops[0] += h;
                if (this.settings.showTroopsExtra.v) {
                  switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                    case ClientLib.Base.EUnitMovementType.Feet:
                      troops[1] += h;
                      break;
                    case ClientLib.Base.EUnitMovementType.Track:
                    case ClientLib.Base.EUnitMovementType.Wheel:
                      troops[2] += h;
                      break;
                    case ClientLib.Base.EUnitMovementType.Structure:
                      troops[3] += h;
                      break;
                    case ClientLib.Base.EUnitMovementType.Air:
                    case ClientLib.Base.EUnitMovementType.Air2:
                      troops[4] += h;
                      break;
                  }
                }
              }
              this.Display.troopsArray = troops;
              this.lootList.store(xy,'troopsArray',this.Display.troopsArray);
            } catch (e) {
              console.warn("PluginsLib.mhLoot.calcTroops: ", e);
              console.dir("PluginsLib.mhLoot.~.Data:",this.Data);
            }
          },
          calcInfo: function (xy) { 
            //console.info("loot.calcInfo"); 
            this.Display.infoArrays = [];
            this.Display.twoLineInfoArrays = [];
            
            if (!this.Data.loaded) return;
            
            var hp;
            var t;         
            
            //var cc = this.Data.cc;
            var oc = this.Data.oc;
            var ec = this.Data.ec; 
            
            var ol = this.Data.ol;
            var el = this.Data.el; 
            
            if(this.settings.showInfo.v) { 
              try {                   
                var ohp=0, dhp=0;
                for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                
                // find CY & DF row/line
                this.getImportants(el);
                
                hp = {};
                hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                hp.lbs = ['HP:','HC:','DF:','CY:'];
                t = [];
                t.push(this.numberFormat(dhp/ohp, 2));
                t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                var abc = "ABCDEFGHI";//abc[column]
                if(this.settings.showColumnLetter.v) {
                  if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                  if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                } else {
                  if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                  if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                }                
                hp.val = t;
                this.Display.infoArrays.push(hp);
                // store
                this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                           
              } catch (e) {
                console.log("PluginsLib.mhLoot.calcInfo 1: ", e);
              }
            }            
            if(this.settings.showColumnCondition.v) { 
              try {   
                var bl = el.Buildings.d;
                var dl = el.Defences.d;
                
                for(var k in bl) {
                  var b = bl[k];
                  if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                  if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                }

                var tb;
                var tbhp;
                var cnt;
                var mi;
                var ma;
                var dc;
                
                // CY
                tb = cy;
                cnt = 0;
                tbhp = 0;
                dc = 1;
                mi = tb.get_CoordX() - dc;
                ma = tb.get_CoordX() + dc;
                // scan
                for(var k in bl) {
                  var o = bl[k];  
                  if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                    if(o.get_CoordY() >= tb.get_CoordY()) {
                      cnt++;
                      tbhp += o.get_HitpointsPercent();
                    }
                  }
                }
                for(var k in dl) {
                  var o = dl[k];  
                  //if(o.get_CoordX() == tb.get_CoordX()) {
                  if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                    if(o.get_CoordY() >= tb.get_CoordY()) {
                      cnt++;
                      tbhp += o.get_HitpointsPercent();
                    }
                  }
                }
                tbhp = 100 * tbhp / cnt;
                var cyhp = tbhp;

                // DF
                tb = df;
                cnt = 0;
                tbhp = 0;
                dc = 1;
                mi = tb.get_CoordX() - dc;
                ma = tb.get_CoordX() + dc;
                for(var k in bl) {
                  var o = bl[k];  
                  if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                    if(o.get_CoordY() >= tb.get_CoordY()) {
                      cnt++;
                      tbhp += o.get_HitpointsPercent();
                    }
                  }
                }
                for(var k in dl) {
                  var o = dl[k];  
                  if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                    if(o.get_CoordY() >= tb.get_CoordY()) {
                      cnt++;
                      tbhp += o.get_HitpointsPercent();
                    }
                  }
                }
                tbhp = 100 * tbhp / cnt;
                var dfhp = tbhp;               
                
                hp = {};
                hp.name = '<b>CY & DF column HP [%]</b>';
                hp.lbs = ['CY:','DF:'];
                t = [];
                t.push(this.numberFormat(cyhp, 0));
                t.push(this.numberFormat(dfhp, 0));        
                hp.val = t;
                this.Display.infoArrays.push(hp);
                //this.Display.twoLineInfoArrays.push(hp);
                // store
                this.lootList.store(xy,'infoArrays',this.Display.infoArrays);                       
              } catch (e) {
                console.log("PluginsLib.mhLoot.calcInfo 2: ", e);
              }
            }
            if(this.settings.showRepairTime.v) { 
              try {                 
                var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                var m = Math.max(a,v,i);
                
                var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                var am = Math.min(aa,av,ai);
                
                var ohp=0;
                ohp = oc.GetOffenseConditionInPercent();
                
                var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                
                hp = {};
                hp.name = '<b>Repair time (Your offence)</b>';
                hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                t = [];
                t.push(this.hms(m)); 
                t.push(this.hms(am));
                t.push(ohp);
                t.push(ool);                 
                hp.val = t;
                //this.Display.infoArrays.push(hp);
                this.Display.twoLineInfoArrays.push(hp);              
                // store
                this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
              } catch (e) {
                console.log("PluginsLib.mhLoot.calcInfo 3: ", e);
              }
            }
          },
          calcFriendlyInfo: function(xy) {
            //console.info("loot.calcFriendlyInfo"); 
            this.Display.twoLineInfoArrays = [];
            if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                        
            try { 
              if (!this.Data.loaded) return;            
              
              var hp;
              var t;
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec;
              
              var ol = this.Data.ol;
              var el = this.Data.el;            
              
              var IsOwn = this.Data.IsOwnBase;                
              
              
              if(this.settings.showLevels.v) { 
                var sd = ec.get_SupportData();
                var sn;
                var sl;
                if(sd !== null) {
                  sl = sd.get_Level();
                  sn = ec.get_SupportWeapon().dn; 
                }
              
                hp = {};
                hp.name = '<b>Levels</b>';
                hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                t = [];
                if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                hp.val = t;
                this.Display.twoLineInfoArrays.push(hp);
              }
            
              if(this.settings.showAllyRepairTimeInfo.v) {
                
                var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                var m = Math.max(a,v,i);
                
                var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                var am = Math.min(aa,av,ai);
                
                var ofl;              
                var ohp=0;
                if(el.Offences.c>0) {
                  //my
                  //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                  //ohp = 100.0 * ohp / el.Offences.c;
                  //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                  //ohp = this.numberFormat(ohp, 0);
                  //ea
                  ohp = ec.GetOffenseConditionInPercent();
                  //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                  ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                  //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                } else {
                  ohp = '---';
                  ofl = '---';
                }
                
                hp = {};
                hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                t = [];
                t.push(this.hms(m)); 
                //t.push('---');
                t.push(this.hms(am));
                t.push(ohp); 
                t.push(ofl);       
                hp.val = t;
                this.Display.twoLineInfoArrays.push(hp);
              } 
              //this.Display.twoLineInfoArrays = twoLineInfoArrays;
              this.lootList.store(xy,'twoLineInfoArrays',this.Display.twoLineInfoArrays); 
            } catch (e) {
              console.warn("PluginsLib.mhLoot.calcFriendlyInfo: ", e);
            }
          },
          
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
          calcDistance: function () {
            //console.info("loot.calcDistance"); 
            this.Display.distanceArray = [];
            
            var hp;
            
            if(!this.settings.showDistance.v) return;
            //console.log('calcDistance');              
            try {                
              var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
              if (visObject!==null) {
                var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                var t = visObject.get_VisObjectType();
                switch (t) {                   
                  case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                  case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                  case ClientLib.Vis.VisObject.EObjectType.RegionRuin: 
                  case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                  case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                    var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                    var selX = visObject.get_RawX();
                    var selY = visObject.get_RawY();
                    var ocX = oc.get_X();
                    var ocY = oc.get_Y();          
                    var cenX = ser.get_ContinentWidth() / 2;
                    var cenY = ser.get_ContinentHeight() / 2;                        
                    //target is locked by button
                    // if(typeof(this.Data.Lock)=='undefined') {
                      // this.Data.Lock={X:ocX,Y:ocY};//{X:0,Y:0};
                    // }
                    //var locX = this.Data.Lock.X;                    
                    //var locY = this.Data.Lock.Y;
                    if(typeof(this.Data.Selected)=='undefined') {
                      this.Data.Selected={};
                    }
                    this.Data.Selected={X:selX,Y:selY};
                    var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, selX, selY).toString();
                    var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, selX, selY);
                    //var loc = ClientLib.Base.Util.CalculateDistance(locX, locY, selX, selY);
                    var cdt = oc.GetCityMoveCooldownTime(selX,selY);//cool down time
                    var stp = dis / 20;//steps
                    this.Data.Distance = dis;
                    //this.Data.MeasureDistance = loc;                      
                    var hp = {};
                    hp.name = '<b>Movement</b>';
                    hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                    var t = [];
                    t.push(dis);
                    t.push(this.dhms2(cdt));
                    t.push(stp);       
                    t.push(cen);       
                    hp.val = t;
                    this.Display.distanceArray.push(hp);
                    break;
                  default:
                    break;
                }//switch (t) 
              }//if (visObject               
              //DISABLED this.lootList.store(xy,'distanceArray',this.Display.distanceArray);               
            } catch (e) {
              console.warn("PluginsLib.mhLoot.calcDistance: ", e);
            }
          },
          
          onSelectionChange: function(oldObject,newObject) {
            try { 
             if(qx.core.Init.getApplication().getChat().getFocused() || (qx.core.Init.getApplication().getPlayArea().getViewMode()!=ClientLib.Data.PlayerAreaViewMode.pavmNone)) {
                  //TODO something is wrong
                  //this.extTimer.stop();
                  //this.win.close();
                  //return;
              }            
              this.extItems = [];
              this.win.removeAll();
              this.win.close(); 
              
              if(oldObject=="Timer") {
                //console.log("@Timer");
              }
              else {
                //console.log("@Select");
                this.Data.lastSelectedBaseId = -2;
                this.waiting[0] = 1;
              }
              //ClientLib.Vis.SelectionChange
              //console.clear();
              var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
              if(visObject!==null) {
                var vt = visObject.get_VisObjectType();
                //console.log('onSelectionChange.Object: ',this.LObjectType[vt]);
              }
              else {
                //console.log('onSelectionChange.Object: ','null');
                this.Data.lastSelectedBaseId = -3;
              }
              
              if (visObject!==null) {
                var t = visObject.get_VisObjectType();
                //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                //console.log('!=null: Object type: ',this.LObjectType[t]);
                //window.PluginsLib.visObject = visObject;
                //window.visObject = visObject;
                this.Data.visObject = visObject;
                this.extTimer.start();
                var xy = -1;
                if(typeof(visObject.get_RawX)!='undefined') {
                  var xy = 10000 * visObject.get_RawX() + visObject.get_RawY();
                }
                switch (t) {                    
                  // Own bases, ally base
                  case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    //this.extTimer.setEnabled(true);
                    //this.extTimer.start();// does not work
                    var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                    var aid = oc.get_AllianceId();
                    var sid = visObject.get_AllianceId();
                    
                    this.calcDistance();                      
                    if(aid == sid) {
                      // Own, Ally
                      //clear                  
                      //self.Display.distanceArray = [];
                      if (this.loadBase() && oldObject=="Timer") {
                        this.extTimer.stop();
                        this.calcFriendlyInfo(xy);
                        this.addFriendlyLabel();
                      } else {
                        //this.addLoadingLabel();         
                        if(this.restoreDisplay(xy)) {
                          this.addResourcesLabel("r");
                        } else {        
                          this.addLoadingLabel();
                        }                          
                      }                      
                    }
                    else {
                      // Enemy
                      if (this.loadBase() && oldObject=="Timer") {
                        this.extTimer.stop();
                        this.calcResources(xy);
                        this.calcTroops(xy);
                        this.calcInfo(xy);
                        this.addResourcesLabel();
                      } else {           
                        if(this.restoreDisplay(xy)) {
                          this.addResourcesLabel("r");
                        } else {          
                          this.addLoadingLabel();
                        }      
                      }
                    }
                    break;
                  // CAMP OUTPOST BASE
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    this.calcDistance();
                    if (this.loadBase() && oldObject=="Timer") {
                      this.extTimer.stop();                       
                      this.calcResources(xy);
                      this.calcTroops(xy);
                      this.calcInfo(xy);
                      this.addResourcesLabel();
                    } else {          
                      if(this.restoreDisplay(xy)) {
                        this.addResourcesLabel("r");
                      } else {        
                        this.addLoadingLabel();
                      }
                    }
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                  case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                  case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                  case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                    this.extTimer.stop();
                    //clear
                    this.Display.lootArray = [];
                    this.Display.troopsArray = [];
                    this.Display.infoArrays = [];
                    this.Display.twoLineInfoArrays = [];
                    this.calcDistance();
                    this.addResourcesLabel();
                    break;
                  default:
                    this.extTimer.stop();
                    this.win.close();
                    break;
                }                  
                // console.log('focusable: false');
                // this.win.set({focusable: false});
              }
              else {                
                this.extTimer.stop();
                this.win.close();
              }
              this.win.setActive(false);
            } catch (e) {
              console.warn('PluginsLib.mhLoot.onSelectionChange: ', e);
            }
          },
          onViewChanged: function(oldMode, newMode) {
            //console.log('onViewChanged: ');
            // var p = qx.core.Init.getApplication().getPlayArea();
            // console.log('getViewMode',p.getViewMode());//0-map,1-base,2-def,3-off
            // qx.core.Init.getApplication().getPlayArea().getViewMode();
            // case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:
            // console.log('getViewCity',p.getViewCity());//id
            // var fH = ClientLib.Data.MainData.GetInstance().get_Combat();
            // qx.core.Init.getApplication().getPlayArea().getCurrentViewMode()
            // var c = qx.core.Init.getApplication().getChat();
            // c.getFocused();//good
            // c.getFocusedOrMoused();//good
            // qx.core.Init.getApplication().getChat().getFocusedOrMoused();
            try {
              //console.log('newMode: ',newMode);
              console.log('onViewChanged: ',this.LViewMode[newMode]);
              this.viewMode = newMode;
              if(newMode != ClientLib.Vis.Mode.Region) {
                this.extTimer.stop();
                this.win.close();
              }
            } catch (e) {
              console.warn('PluginsLib.mhLoot.onViewChanged: ', e);
            }
          },
          extendSelectionChange: function() {
            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
          },
          extendViewModeChange: function() {
            //disabled
            //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , this.onViewChanged);
            
          },
          restoreDisplay: function(xy) {
            //console.info("loot.restoreDisplay");              
            var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
            if(this.lootList.exist(xy)) {
              var d = this.lootList.list.d[xy].Data;            
              var da = this.Display.distanceArray;
              this.Display = {};
              for(var k in d) this.Display[k] = d[k];
              this.Display.distanceArray = da;
              return true;
            }
            return false;
          },
          // DISPLAY data
          addLoadingLabel: function(widget) {
            //console.log('addLoadingLabel');
            try {
              this.extItems = [];
              //widget.removeAll();
              var r=0, c=0;
              var a;
                    
              // DISTANCE
              //console.log('DISTANCE');
              a = this.Display.distanceArray;
              if(typeof(a)!='undefined' && a.length>0) { 
                for(var i in this.Display.distanceArray) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                  c=1;
                  for(var j in this.Display.distanceArray[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                    c+=2;
                  }
                  r+=2;
                }
              }
              
              // AWAITING
              //console.log('AWAITING');
              c=0;
              var w = this.waiting[this.waiting[0]];
              if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
              this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>SCANNING... " + w + "</b>").set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
              
              this.extPrint();
            } catch (e) {
              console.warn('PluginsLib.mhLoot.addLoadingLabel: ', e);
            }
          }, 
          addResourcesLabel: function(type) {
            //console.log('addResourcesLabel');
            try {
              this.extItems = [];
              var r=0, c=0;                
              var hp;
              var a;
              
              // DISTANCE
              a = this.Display.distanceArray;
              if(typeof(a)!='undefined' && a.length>0) { 
                for(var i in this.Display.distanceArray) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                  c=1;
                  for(var j in this.Display.distanceArray[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                    c+=2;
                  }
                  r+=2;
                }
              }
              
              // LOOT
              if (this.settings.showLoot.v) {
                a = this.Display.lootArray;
                if(typeof(a)!='undefined' && a.length>0) {
                  hp = {};
                  hp.name = '<b>Lootable Resources</b>';
                  hp.img = this.resImages;
                  t = [];  
                  t.push(this.Display.lootArray[0]);//Research 6  
                  t.push(this.Display.lootArray[1]);//Tiberium 1
                  t.push(this.Display.lootArray[2]);//Crystal 2
                  t.push(this.Display.lootArray[3]);//Credits 3           
                  hp.val = t;
                  //iconArrays.push(hp);  //store !!
                  
                  // draw icon's info              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                  for(var j in hp.val) {
                    this.extAdd(hp.img[j], {row: r, column: c++}); 
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                  }
                  r++;
                }
              }
              
              // TROOP
              if (this.settings.showTroops.v) { //to do  
                a = this.Display.troopsArray;
                if(typeof(a)!='undefined' && a.length>0) {   
                  hp = {};
                  hp.name = '<b>Troop Strength</b>';
                  hp.img = this.troopImages;
                  t = [];
                  t.push(this.Display.troopsArray[0]);
                  if (this.settings.showTroopsExtra.v) {
                    t.push(this.Display.troopsArray[1]);//inf
                    t.push(this.Display.troopsArray[2]);//veh
                    t.push(this.Display.troopsArray[3]);//stu
                    //t.push(this.Display.troopsArray[4]);//air
                  }              
                  hp.val = t;
                  // draw icon's info                            
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                  this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                  c=2;
                  for(var j=1;j<hp.val.length;j++) {
                    this.extAdd(hp.img[j-1], {row: r,column: c++}); 
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                  }
                  r++;
                }
              }
              
              // INFO
              a = this.Display.infoArrays;
              if(typeof(a)!='undefined' && a.length>0) { 
                for(var i in this.Display.infoArrays) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                  c=1;
                  for(var j in this.Display.infoArrays[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                    c+=2;
                  }
                  r++;
                }
              } 
              
              // 2 lines INFO
              a = this.Display.twoLineInfoArrays;
              if(typeof(a)!='undefined' && a.length>0) {       
                for(var i in this.Display.twoLineInfoArrays) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                  c=1;
                  for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                    c+=2;
                  }
                  r+=2;                
                }
              }
              
              // WARNING
              c=0;
              if(type == "r") {
                this.extAdd(new qx.ui.basic.Label("<b style='color:white;font-size:10pt'>[*STORED DATA. WAIT...]</b>").set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6});
              }
              
              this.extPrint();
              
            } catch (e) {
              console.warn('PluginsLib.mhLoot.addResourcesLabel(): ', e);
            }
          },       
          addFriendlyLabel: function(widget) {
            //console.log('addFriendlyLabel');
            try {              
              this.extItems = [];
              var a;
              var r=0, c=0;
              
              // DISTANCE
              a = this.Display.distanceArray;
              if(typeof(a)!='undefined' && a.length>0) {    
                for(var i in this.Display.distanceArray) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                  c=1;
                  for(var j in this.Display.distanceArray[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                    c+=2;
                  }
                  r+=2;
                }
              }
              
              
              // 2 lines INFO
              a = this.Display.twoLineInfoArrays;
              if(typeof(a)!='undefined' && a.length>0) {  
                c=0;
                for(var i in this.Display.twoLineInfoArrays) {              
                  c=0;
                  this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                  c=1;
                  for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                    c+=2;
                  }
                  r+=2;                
                }
              }
              
              this.extPrint();

            } catch (e) {
              console.warn('PluginsLib.mhLoot.addFriendlyLabel: ', e);
            }
          },
          // OPTIONS
          optionsTab: null,
          optionsPage: null,
          btnApply: null,
          optionsStoreName: 'MHToolLootOptions',
          addLootPage: function() {            
            //console.log('addLootPage');
            try {
              if(!PluginsLib.mhOptionsPage) OptionsPage();
              
              if(!this.optionsTab) {
                //Create Tab
                this.optionsTab = PluginsLib.mhOptionsPage.getInstance();
              }
              this.optionsPage = this.optionsTab.addPage("Loot");
              this.optionsPage.setLayout(new qx.ui.layout.VBox());
              // ...
              this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
              var i = 0;
              for(var k in this.settings) {
                this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                  value: this.settings[k].v,
                  paddingLeft: 10
                });
                this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
              }
              //typeGet
              //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
              //  container.add(new qx.ui.core.Spacer(50));
              this.loadOptions();
              this.addButtons();               
            } catch (e) {
              console.warn("MHTool.mhLoot.addLootPage: ", e);
            }           
          },
          addButtons: function() {
            try {
              this.btnApply = new qx.ui.form.Button("Apply");
              this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
              
              var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
              c.setMarginTop(20);
              c.add(this.btnApply);
              this.optionsPage.add(c);
              
              this.btnApply.addListener("execute", this.applyOptions, this); 
              this.btnApply.setEnabled(false);
            } catch (e) {
              console.warn("MHTool.mhLoot.addButtons: ", e);
            }
          },
          optionsChanged: function() {
            var c = false;
            for(var k in this.settings) {
              c = c || (this.settings[k].v != this.settings[k].cb.getValue());
            }
            this.btnApply.setEnabled(c);
          },
          applyOptions: function(e) {
            //console.log("applyOptions e:",e);
            this.saveOptions();
            this.btnApply.setEnabled(false); 
          },
          saveOptions: function() {   
            var c = {};
            var i = 0;
            for(var k in this.settings) {
              c[k] = this.settings[k].cb.getValue();
              this.settings[k].v = c[k];
            }
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
          },
          loadOptions: function() {
            try {
              var c = {};            
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
              //console.log('loadOptions c:',c);
              if(c===null) c = {};
              var i = 0;              
              for(var k in this.settings) {
                if(typeof(c[k])!='undefined') {
                  this.settings[k].cb.setValue(c[k]);
                  this.settings[k].v = c[k];
                } else {
                  this.settings[k].cb.setValue(this.settings[k].d);
                  this.settings[k].v = this.settings[k].d;
                }
              }             
              //console.log('loadOptions settings:',this.settings);
            } catch (e) {
                console.warn("MHTool.mhLoot.loadOptions: ", e);
            }
          }
        }//members
      });//Class     
    } catch (e) {
      console.warn("qx.Class.define(PluginsLib.mhLoot: ", e);      
    }
    //======================================================= 
    // START
    // PluginsLib.mhLoot.getInstance();
    
    created = true;
  }//CreateClasses
  //=======================================================   
  // function LoadExtension() {
    // try {
      // if (typeof(qx) != 'undefined') {
        // //if (qx.core.Init.getApplication().getMenuBar() !== null) {
        // if (!!qx.core.Init.getApplication().getMenuBar()) {
          // CreateClasses();
          // return; // done
        // } 
      // }
    // } catch (e) {
      // if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
      // else if (window.opera) opera.postError(e);
      // else GM_log(e);
    // }
    // window.setTimeout(LoadExtension, 1000); // force it
  // }
  // LoadExtension();
  function WaitForGame() {
    try
    {
      //if (typeof(PluginsLib) != 'undefined' && typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 3000);
  }
  window.setTimeout(WaitForGame, 3000);
};
//=======================================================
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();