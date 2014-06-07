// ==UserScript==
// @version       1.7.2p
// @name          CnC: MH Tiberium Alliances Pure Loot Summary
// @namespace     MHLoot
// @description   CROSS SERVERS Pure Loot info.
// @author        MrHIDEn based on Yaeger & Panavia code. Totaly recoded.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require       http://sizzlemctwizzle.com/updater.php?id=145657
// ==/UserScript==
(function () {
  var MHLootMain = function () {
    
    function MHLootCreate() {
    
      if(typeof(window.MHTools)=='undefined') window.MHTools = {$n:'MHTools'};
      if(typeof(window.MHTools.Loot)=='undefined') window.MHTools.Loot = {$n:'Loot'};
      MHTools.Loot.Version = '1.7.2p';
      var stats = document.createElement('img');
      stats.src = 'http://goo.gl/lXeEK';//1.7.2p
      
      var resPaths = [
        "webfrontend/ui/common/icn_res_research_mission.png",
        "webfrontend/ui/common/icn_res_tiberium.png",
        "webfrontend/ui/common/icn_res_chrystal.png",
        "webfrontend/ui/common/icn_res_dollar.png"
      ];
      var resImages = [];
      for(var k in resPaths) {
        resImages.push(new qx.ui.basic.Image(resPaths[k]).set({Scale:true,Width:16,Height:16}));
      }  

      // BASES
      var list = [];
      var storeName = 'MHToolsLootList';
      function reload() {
        var S = ClientLib.Base.LocalStorage;
        var l;
        if (S.get_IsSupported()) l = S.GetItem(storeName);
        if(l!==null) list = l;
        list.max = 50;
        list.idx = 0;
        for(var i=0;i<list.max;i++) {
          list.idx = i;
          if(typeof(list[i])=='undefined') break;
        }
        console.log('MHLootList reloaded/created');
      }
      reload();
      function getIndex() {
        var l = list;
        var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
        for(i=0;i<list.max;i++) {
          if(typeof(l[i])=='undefined') continue;
          if(l[i]===null) continue;
          if(l[i].id == id) return i;
        }
        return -1;
      }
      function save(d) {
        try {
          var l = list;
          var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
          var c = {id:id, Data:d};
          var S = ClientLib.Base.LocalStorage;
          for(var i=0;i<l.max;i++) {
            if(typeof(l[i])=='undefined') continue;
            if(l[i]===null) continue;
            if(l[i].id == id) 
            {
              // found
              l[i] = c;
              // JSON
              if (S.get_IsSupported()) S.SetItem(storeName, l);
              // done
              return;
            }
          }
          // new
          l[l.idx] = c;
          if(++l.idx >= l.max) l.idx = 0;
          // JSON
          if (S.get_IsSupported()) S.SetItem(storeName, l);   
        } catch (e) {
          console.warn("save: ", e);
        }
      }
      function load() {
        try {
          var l = list;
          var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
          for(var i=0;i<l.max;i++) {
            if(typeof(l[i])=='undefined') continue;
            if(l[i]===null) continue;
            if(l[i].id == id) return l[i];
          }
          return {id:id,Data:{}};     
        } catch (e) {
          console.warn("load: ", e);
        }
      }
      function store(k, d) {
        try {
          var mem = load().Data;
          mem[k] = d;
          save(mem);        
        } catch (e) {
          console.warn("store: ", e);
        }
      }
      function restore(k) {
        try {
          var mem = load().Data;
          if(typeof(mem[k])=='undefined') return 'undefined';
          return mem[k];    
        } catch (e) {
          console.warn("restore: ", e);
        }
      }
      
      var MHLoot = {
        selectedType: -1,
        selectedBaseId: null,
        lastSelectedBaseId: null,
        flagBaseLoaded: false,
        
        selectedOwnBaseId: null,
        lastSelectedOwnBaseId: null,
        Data: null,

        // the widgets for the different screens
        lootWindowPlayer: null,
        lootWindowBase: null,
        lootWindowCamp: null,
        lootWindowOwn: null,
        lootWindowAlly: null,

        waiting: [1,'','.','..','...'],
        
        Display: {
          lootArray: []       
        },
        
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
        getKey: function(list, find) {
          for (var k in list) {
            var o = list[k];
            if (o === null) continue;
            if (o[find] === undefined) continue;
            if (find != 'l') {
              //console.info('MHLoot.getKey',k); 
              return k; 
            }
            if (o.l.length === 0) continue;
            //console.info('MHLoot.getKey',k);
            return k;
          }
          return undefined;
        }, 
        getResKey: function(list,find) {
          for (var k in list) {
            var o = list[k];
            if (o === null) continue;
            if (!Array.isArray(o)) continue;
            if (o.length===0) continue;
            if (o[0][find] === undefined) continue;
            return k;
          }
        },
        getKeyHitpoints: function(l) {
          var unit = l[0];
          s = unit.get_IsAlive.toString();//get_HitpointsPercent
          var sa = 'this.';
          var sb = '()';
          var a = s.indexOf(sa) + sa.length;
          var t = s.substr(a);
          var b = t.indexOf(sb);    
          var k = t.substr(0, b);      
          //console.info('a',a,'b',b,'k',k);
          return k;
        },           
        getKeys: function(list, b) {
          for (var k in list) {
            var o = list[k];
            if (o === null) continue;
            if (typeof(o.l) == 'undefined') continue;
            if (o.l.length === 0) continue;
            var m = MHLoot.getKey(o.l[0],'mt');//dnuc & mt=MoveType
            if(typeof(m) == 'undefined') continue;
            if(typeof(b.keys.Type) == 'undefined') {
              b.keys.Type = m;//MoveType & dnucKeys aviable in this branch
              //b.keys.dnucKeys = m;
            }
            if(typeof(o.l[0].GetUnitGroupType) ==  'undefined') {
              if(typeof(b.keys.Resources) == 'undefined') {
                b.keys.Resources = MHLoot.getResKey(o.l[0],'Count');//Resouces
              }
              // buildings
              b.keys.Buildings = k;
            } else {
              // units
              if(o.l[0].GetUnitGroupType()) {
                //1-attack
                b.keys.Offences = k;
              } else {
                //0-defend
                b.keys.Defences = k;
              }
            }
          }
          return b;
        },
        getBypass: function(city, b) {
          //if(b === undefined) b = {};
          if(b.rdy === undefined) {
            // get keys
            b.keys = {};
            //b.dnucKeys = {};
            try {
              b = MHLoot.getKeys(city.get_CityUnitsData(), b);
              b = MHLoot.getKeys(city.get_CityBuildingsData(), b);
              var o;  
              o = city.get_CityBuildingsData()[b.keys.Buildings].l;
              b.keys.Hitpoints = MHLoot.getKeyHitpoints(o);//Buildings   
              b.rdy = true;
            } catch (e) {
              console.warn('getBypass: ', e);
            }
          }
          console.dir(b.keys);
          return b;
        },
        getData: function(city) {
          var b = MHLoot.Data.Bypass;
          if(typeof(b.rdy) == 'undefined') {
            b = MHLoot.getBypass(city, b);//b must be obj to pass via reference
          }
          l = {};
          try {
            var o;
            
            l.Buildings = [];
            l.Defences = [];
            l.Offences = [];
            
            if(b.keys.Buildings!==undefined) {
              o = city.get_CityBuildingsData()[b.keys.Buildings];
              if(o!==null) l.Buildings = o.l;
            }
            
            if(b.keys.Defences!==undefined) {
              o = city.get_CityUnitsData()[b.keys.Defences];
              if(o!==null) l.Defences = o.l;
            }
            
            if(b.keys.Offences!==undefined) {
              o = city.get_CityUnitsData()[b.keys.Offences];
              if(o!==null) l.Offences = o.l;
            }
            
            l.rdy = true;              
          } catch (e) {
            console.warn('getData: ', e);
          }            
          return l;
        },
        
        // CORE
        MHTools: function() {
          // for testing
          if(typeof(window.MHTools)=='undefined') window.MHTools = {$n:'MHTools'};
          if(typeof(window.MHTools.Loot)=='undefined') window.MHTools.Loot = {$n:'Loot'};
          window.MHTools.Loot.Data = MHLoot.Data;
          window.MHTools.Loot.List = list;
        },  
        loadBase: function() {
            try {
              if (MHLoot.Data === null) MHLoot.Data = {lastSelectedBaseId: -1, Bypass: {}};
              
              var r = MHLoot.Data;         
                          
              r.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              r.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
              
              if (r.lastSelectedBaseId !== r.selectedBaseId) r.loaded = false;
              r.lastSelectedBaseId = r.selectedBaseId;  
              
              r.IsOwnBase = r.selectedBaseId === r.selectedOwnBaseId;
                          
              r.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
              
              r.ec = r.cc.GetCity(r.selectedBaseId);// it is very nice function          
              if(r.ec === null) return false;
              if(r.ec.get_CityBuildingsData() === null) return false;          
              
              r.oc = r.cc.get_CurrentOwnCity();            
              if(r.oc === null) return false;
              if(r.oc.get_CityBuildingsData() === null) return false;
              
              r.ol = MHLoot.getData(r.oc);
              r.el = MHLoot.getData(r.ec);// Buildings Defence Offence               
              if(typeof(r.ol)=='undefined') return false;
              if(typeof(r.el)=='undefined') return false;
              
              if(typeof(MHLoot.Data.Bypass.rdy)=='undefined') return false;
              
              if(r.el.Buildings.length === 0) return false;
                          
              // for testing
              MHLoot.MHTools();
                          
              r.loaded = true;
              MHLoot.flagBaseLoaded = true;
              return true;
          } catch (e) {
            console.warn("loadBase: ", e);
            console.dir("MHLoot.Data:",MHLoot.Data);
            return false;
          }
        },
        
        calcResources: function () {
          try {          

            if (!MHLoot.Data.loaded) return;
            
            var el = MHLoot.Data.el;
            
            var loots = [0, 0, 0, 0, 0, 0, 0, 0];
           
            // enemy buildings
            for (var j in el.Buildings) {
              var building = el.Buildings[j];
              var mod = building.get_HitpointsPercent(); // 0-1 , 1 means 100%
              var resourcesList = building[MHLoot.Data.Bypass.keys.Resources]; 
              for (var i in resourcesList) {
                loots[resourcesList[i].Type] += mod * resourcesList[i].Count;// resourcesList[i].Type resourcesList[i].Count
              }
            }
            
            // enemy defences
            for (var j in el.Defences) {
              var unit = el.Defences[j];
              var mod = unit.get_HitpointsPercent(); // 0-1 , 1 means 100%
              var resourcesList = unit[MHLoot.Data.Bypass.keys.Resources];
              for (var i in resourcesList) {
                loots[resourcesList[i].Type] += mod * resourcesList[i].Count;
              }
            }
            MHLoot.Display.lootArray = [];
            MHLoot.Display.lootArray[0] = loots[6];//imgResearch 6 
            MHLoot.Display.lootArray[1] = loots[1];//imgTiberium 1
            MHLoot.Display.lootArray[2] = loots[2];//imgCrystal 2
            MHLoot.Display.lootArray[3] = loots[3];//imgCredits 3 
            store('lootArray',MHLoot.Display.lootArray);
          } catch (e) {
            console.warn("calcResources: ", e);
            console.dir("Bypass:",MHLoot.Data.Bypass);
          }
        },
        restoreDisplay: function() {
          var idx = getIndex();  
          if(idx > -1) { 
            var d = list[idx].Data;
            MHLoot.Display={};
            for(var k in d) MHLoot.Display[k] = d[k];
            return true;
          }
          return false;
        }
      };        
      
      // CAMP - Forgotten
      if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
        webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
      }
      // TODO do i need a few functions or i can use only one? like:
      // webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = ExtendInfo;
      webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
        try {
          if (!MHLoot.lootWindowCamp) {
            MHLoot.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
            MHLoot.lootWindowCamp.setTextColor('white');

            var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
            widget.add(MHLoot.lootWindowCamp);
          }
          
          if (MHLoot.loadBase()) {
            MHLoot.calcResources();
            addResourcesLabel(MHLoot.lootWindowCamp);
          } else {          
            if(MHLoot.restoreDisplay()) {
              addResourcesLabel(MHLoot.lootWindowCamp);
            } else {        
              addLoadingLabel(MHLoot.lootWindowCamp);
            }
          }

        } catch (e) {
          console.warn("MHLoot.webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange(): ", e);
        }

        this.__mhloot_showLootNPCCamp();
      }

      // BASE - Forgotten
      if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase) {
        webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
      }
      webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
        try {
          if (!MHLoot.lootWindowBase) {
            MHLoot.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
            MHLoot.lootWindowBase.setTextColor('white');

            var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
            widget.add(MHLoot.lootWindowBase);
          }
          
          if (MHLoot.loadBase()) {
            MHLoot.calcResources();
            addResourcesLabel(MHLoot.lootWindowBase);
          } else {           
            if(MHLoot.restoreDisplay()) {
              addResourcesLabel(MHLoot.lootWindowCamp);
            } else {          
              addLoadingLabel(MHLoot.lootWindowCamp);
            }
          }

        } catch (e) {
          console.warn("MHLoot.webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange(): ", e);
        }

        this.__mhloot_showLootNPCBase();
      }

      // BASE - PvP
      if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase) {
        webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
      }
      webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
        try {
          if (!MHLoot.lootWindowPlayer) {
            MHLoot.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
            MHLoot.lootWindowPlayer.setTextColor('white');

            var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
            widget.add(MHLoot.lootWindowPlayer);
          }

          if (MHLoot.loadBase()) {  
            MHLoot.calcResources();       
            addResourcesLabel(MHLoot.lootWindowPlayer);
          } else {           
            if(MHLoot.restoreDisplay()) {
              addResourcesLabel(MHLoot.lootWindowCamp);
            } else {          
              addLoadingLabel(MHLoot.lootWindowCamp);
            }      
          }

        } catch (e) {
          console.warn("MHLoot.webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange(): ", e);
        }

        this.__mhloot_showLootPlayerBase();
      }

      function addResourcesLabel(widget) {
        try {
          var r=0;
          var c=0;
          widget.removeAll();
          //qx.ui.basic.Atom("Icon Right", "icon/32/actions/go-next.png"); //how to scale icon in atom?
          //OK widget.add(new qx.ui.basic.Atom("MrHIDE","webfrontend/ui/common/icn_res_chrystal.png"), { row: r++, column: c});
          
          //var iconArrays;
          var hp;
          
          // loot
          hp = {};
          hp.name = '<b>Lootable Resources</b>';
          hp.img = resImages;
          t = [];  
          t.push(MHLoot.Display.lootArray[0]);//Research 6  
          t.push(MHLoot.Display.lootArray[1]);//Tiberium 1
          t.push(MHLoot.Display.lootArray[2]);//Crystal 2
          t.push(MHLoot.Display.lootArray[3]);//Credits 3           
          hp.val = t;
          
          // draw icon's info              
          r++; c=0;
          widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
          for(var j in hp.val) {
            widget.add(hp.img[j], {row: r, column: c++}); 
            widget.add(new qx.ui.basic.Label(MHLoot.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
          }          
          
        } catch (e) {
          console.warn('MHLoot.addResourcesLabel(): ', e);
        }
      }
      
      function addLoadingLabel(widget) {
        try {
          widget.removeAll();
          var r=0, c=0;
          var w = MHLoot.waiting[MHLoot.waiting[0]];
          if(++MHLoot.waiting[0] >= MHLoot.waiting.length) MHLoot.waiting[0]=1;
          widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({rich: true}), {row: r++,column: c, colSpan: 6});
          widget.add(new qx.ui.basic.Label('Waiting for server response ' + w).set({rich: true}), {row: r++,column: c});
        } catch (e) {
          console.warn('MHLoot.addLoadingLabel: ', e);
        }
      }    

    }//endof function MHLootCreate
   
    function MHLootLoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            MHLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(MHLootLoadExtension, 1000); // force it
    }
    window.setTimeout(MHLootLoadExtension, 1000);
  }

  function MHLootInject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  
  MHLootInject();
})();