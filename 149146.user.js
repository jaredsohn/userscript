// ==UserScript==
// @name        C&C - Tiberium Alliances Combat Simulator
// @namespace   Deyhak
// @description C&C Tiberium Alliances Basic Combat Simulator
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     0.1.7.4
// @author      Deyhak
// @require     http://sizzlemctwizzle.com/updater.php?id=147335
// @grant       MetaData
// ==/UserScript==

    (function () {
    var MHLootMain = function () {
    var showLoot = true;                // shows Loot resources info
    var showTroops = false;             // shows overall Hitpoints for Troops
    var showTroopsExtra = false;        // shows Troops Hitpoints for Vehicles/Aircrafts/Infantry
    var showInfo = true;                // shows HP/HC/DF/CY info
    var showColumnCondition = false;    // shows your progress against DF/CY
    var showRepairTime = true;          // shows Repair Times info for Enemy Base/Camp/Outpost
    var showAllyRepairTimeInfo = true;  // shows Ally/Your Repair Times info
    var showLevels = true;              // shows Levels of Base/Defence/Offence info
    var showColumnLetter = false;       // shows columns letters for DF/CY position Ex A-1 or E-4. If 'false' shows only 1 or 4.
    
    function MHLootCreate() {
    
      if(typeof(window.MHTools)=='undefined') window.MHTools = {$n:'MHTools'};
      if(typeof(window.MHTools.Loot)=='undefined') window.MHTools.Loot = {$n:'Loot'};
      MHTools.Loot.Version = '1.7.2';
      var stats = document.createElement('img');
      stats.src = 'http://goo.gl/0Fiza';//1.7.2
      
      var resPaths = [
        "webfrontend/ui/common/icn_res_research_mission.png",
        "webfrontend/ui/common/icn_res_tiberium.png",
        "webfrontend/ui/common/icn_res_chrystal.png",
        "webfrontend/ui/common/icn_res_dollar.png"
      ];
      var resImages = [];
      if (showLoot) {
        for(var k in resPaths) {
          resImages.push(new qx.ui.basic.Image(resPaths[k]).set({Scale:true,Width:16,Height:16}));
        }
      }
      
      var troopPaths = [
        "https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d8d4e71d9de051135a7f5baf1f799d77.png",//inf
        "https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/af8d7527e441e1721ee8953d73287e9e.png",//veh
        "https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/5f889719f06aad76f06d51863f8eb524.png",//stu
        "https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/6962b667bd797fc2e9e74267e1b3e7c3.png" //air
      ];
      var troopImages = [];
      if (showTroops) {
        for(var k in troopPaths) {
          troopImages.push(new qx.ui.basic.Image(troopPaths[k]).set({Scale:true,Width:16,Height:16}));
        }
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
        //console.log('getIndex id=',id);
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
          troopsArray: [],
          lootArray: [],
          iconArrays: [],
          infoArrays: [],
          twoLineInfoArrays: []        
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
        hms: function(s) {
          var h = Math.floor(s/3600); s%=3600;
          var m = Math.floor(s/60); s%=60;
          var r = (h<10?"0"+h.toString():h.toString()) + ":";
          r += (m<10?"0"+m.toString():m.toString()) + ":";
          r += (s<10?"0"+s.toString():s.toString());
          return r;
        },
        hmsRT: function(city, type) {
          var nextLevelFlag = false;
          var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
          var h = Math.floor(s/3600); s%=3600;
          var m = Math.floor(s/60); s%=60;
          //console.log(h,m,s);
          var r = (h<10?"0"+h.toString():h.toString()) + ":";
          r += (m<10?"0"+m.toString():m.toString()) + ":";
          r += (s<10?"0"+s.toString():s.toString());
          return r;
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
            if (typeof(o[0][find]) == 'undefined') continue;
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
        getImportants: function(list) {         
          list.Support = {Condition: '-',Row: '-',Column: '-'};
          list.CY = {Condition: '-',Row: '-',Column: '-'};
          list.DF = {Condition: '-',Row: '-',Column: '-'};
          if(!showInfo) return;         
          for (var j in list.Buildings) {
            var building = list.Buildings[j];
            var id = building.get_MdbUnitId();
            if(id >= 200 && id <= 205) {
              //console.log(id,'SU',100*building.get_HitpointsPercent(),'x',building.get_CoordX(),'y',building.get_CoordY(),'8-y',8-parseInt(building.get_CoordY()));
              list.Support.Condition = 100*building.get_HitpointsPercent();
              list.Support.Row = 8-parseInt(building.get_CoordY());
              list.Support.Column = building.get_CoordX();
            } 
            else {
              switch (id) {
                case 112: // CONSTRUCTION YARD
                case 151:
                case 177:
                  //console.log(id,'CY',100*building.get_HitpointsPercent(),'x',building.get_CoordX(),'y',building.get_CoordY(),'8-y',8-parseInt(building.get_CoordY()));
                  list.CY.Condition = 100*building.get_HitpointsPercent();
                  list.CY.Row = 8-parseInt(building.get_CoordY());
                  list.CY.Column = building.get_CoordX();
                  //console.log('CY',building,list.CY);
                  //console.log('list.CY',list.CY);
                  break;
                case 158: // DEFENSE FACILITY
                case 131:
                case 195:
                  //console.log(id,'DF',100*building.get_HitpointsPercent(),'x',building.get_CoordX(),'y',building.get_CoordY(),'8-y',8-parseInt(building.get_CoordY()));
                  list.DF.Condition = 100*building.get_HitpointsPercent();
                  list.DF.Row = 8-parseInt(building.get_CoordY());
                  list.DF.Column = building.get_CoordX();
                  //console.log('DF',building,list.DF);
                  //console.log('list.DF',list.DF);
                  break;
                default:
                  break;
              }
            }
          }
          //console.log('list',list);
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
            if (!showLoot) return;

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
        calcTroops: function () {
          try {
            if (!showTroops) return;            

            if (!MHLoot.Data.loaded) return;            
            
            var el = MHLoot.Data.el; 
            
            var troops = [0, 0, 0, 0, 0]; 
              
            // enemy defence units
            for (var j in el.Defences) {
              var unit = el.Defences[j];
              var current_hp = unit[MHLoot.Data.Bypass.keys.Hitpoints]();
              troops[0] += current_hp;
              if (showTroopsExtra) {
                switch (unit[MHLoot.Data.Bypass.keys.Type].mt) {//keyTroop // TODO check .mt
                  case ClientLib.Base.EUnitMovementType.Feet:
                    troops[1] += current_hp;
                    break;
                  case ClientLib.Base.EUnitMovementType.Track:
                  case ClientLib.Base.EUnitMovementType.Wheel:
                    troops[2] += current_hp;
                    break;
                  case ClientLib.Base.EUnitMovementType.Structure:
                    troops[3] += current_hp;
                    break;
                  case ClientLib.Base.EUnitMovementType.Air:
                  case ClientLib.Base.EUnitMovementType.Air2:
                    troops[4] += current_hp;
                    break;
                }
              }
            }
            MHLoot.Display.troopsArray = troops;
            store('troopsArray',MHLoot.Display.troopsArray);
          } catch (e) {
            console.warn("calcTroops: ", e);
            console.dir("Bypass:",MHLoot.Data.Bypass);
          }
        },
        calcInfo: function () { 
          MHLoot.Display.infoArrays = [];
          MHLoot.Display.twoLineInfoArrays = [];
          var hp;
          var t;         

          if (!MHLoot.Data.loaded) return;
          
          //var cc = MHLoot.Data.cc;
          var oc = MHLoot.Data.oc;
          var ec = MHLoot.Data.ec; 
          
          var ol = MHLoot.Data.ol;
          var el = MHLoot.Data.el;                
          
          if(showInfo) { 
            try {                   
              var ohp=0, dhp=0;
              for (var k in ol.Offences) ohp += ol.Offences[k].get_Health();//own of units
              for (var k in el.Defences) dhp += el.Defences[k].get_Health();//ene df units
                              
              // find CY & DF row/line
              MHLoot.getImportants(el);
              
              hp = {};
              hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
              hp.lbs = ['HP:','HC:','DF:','CY:'];
              t = [];
              t.push(MHLoot.numberFormat(dhp/ohp, 2));
              t.push(MHLoot.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
              var abc = "ABCDEFGHI";//abc[column]
              if(showColumnLetter) {
                if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
              } else {
                if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
              }                
              hp.val = t;
              MHLoot.Display.infoArrays.push(hp);
              // store
              store('infoArrays',MHLoot.Display.infoArrays);              
              //already done MHLoot.lastSelectedOwnBaseId = MHLoot.selectedOwnBaseId;              
            } catch (e) {
              console.log("calcInfo 1: ", e);
            }
          }            
          if(showColumnCondition) { 
            try {   
              var bl = el.Buildings;
              var dl = el.Defences;
              
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
              t.push(MHLoot.numberFormat(cyhp, 0));
              t.push(MHLoot.numberFormat(dfhp, 0));        
              hp.val = t;
              MHLoot.Display.infoArrays.push(hp);
              //MHLoot.Display.twoLineInfoArrays.push(hp);
              // store
              store('infoArrays',MHLoot.Display.infoArrays);                       
            } catch (e) {
              console.log("calcInfo 2: ", e);
            }
          }
          if(showRepairTime) { 
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
              for (var k in ol.Offences) ohp += ol.Offences[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
              ohp = 100.0 * ohp / ol.Offences.length;
              
              var ool = MHLoot.numberFormat(oc.get_LvlOffense(), 1);
              
              hp = {};
              hp.name = '<b>Repair time (Your offence)</b>';
              hp.lbs = ['Maximum:','Available:','Health:','Level:'];
              t = [];
              t.push(MHLoot.hms(m)); 
              t.push(MHLoot.hms(am));
              t.push(MHLoot.numberFormat(ohp, 0));
              t.push(ool);                 
              hp.val = t;
              //MHLoot.Display.infoArrays.push(hp);
              MHLoot.Display.twoLineInfoArrays.push(hp);
              // store
              store('twoLineInfoArrays',MHLoot.Display.twoLineInfoArrays);                       
            } catch (e) {
              console.log("calcInfo 3: ", e);
            }
          }
        },
        calcFriendlyInfo: function() {
          if(!showLevels && !showAllyRepairTimeInfo) return;
          
          twoLineInfoArrays = [];
            
          try { 
            if (!MHLoot.Data.loaded) return;
            
            //var cc = MHLoot.Data.cc;
            var oc = MHLoot.Data.oc;
            var ec = MHLoot.Data.ec;
            
            var ol = MHLoot.Data.ol;
            var el = MHLoot.Data.el;            
            
            var IsOwn = MHLoot.Data.IsOwnBase;
            
            
            
            if(showLevels) { 
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
              if(el.Buildings.length>0) t.push(MHLoot.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
              if(el.Defences.length>0) t.push(MHLoot.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
              if(el.Offences.length>0) t.push(MHLoot.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
              if(sd !== null) t.push(MHLoot.numberFormat(sl, 1)); else t.push('--'); 
              hp.val = t;
              twoLineInfoArrays.push(hp);
            }
          
            if(showAllyRepairTimeInfo) {
              
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
              if(el.Offences.length>0) {
                for (var k in el.Offences) ohp += el.Offences[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                //console.log(
                ohp = MHLoot.numberFormat(100.0 * ohp / el.Offences.length, 0);
                //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                ofl = MHLoot.numberFormat(ec.get_LvlOffense(), 1);
              } else {
                ohp = '---';
                ofl = '---';
              }
              
              hp = {};
              hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
              hp.lbs = ['Maximum:','Available:','Health:','Level:'];
              t = [];
              t.push(MHLoot.hms(m)); 
              //t.push('---');
              t.push(MHLoot.hms(am));
              t.push(ohp); 
              t.push(ofl);       
              hp.val = t;
              twoLineInfoArrays.push(hp);
            } 
            store('twoLineInfoArrays',MHLoot.Display.twoLineInfoArrays); 
          } catch (e) {
            console.warn("MHLoot.calcFriendlyInfo: ", e);
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
      
      //webfrontend.gui.region.RegionCityStatusInfoOwn
      // BASE - Alliance
      if (!webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase) {
        webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase = webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange;
      }
      webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange = function () {
        try {            
          if (!MHLoot.lootWindowAlly) {
            MHLoot.lootWindowAlly = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
            MHLoot.lootWindowAlly.setTextColor('yellow');//yellow             

            var w = webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance();              
            w.add(MHLoot.lootWindowAlly);
          }
          
          if(MHLoot.loadBase()) {           
            MHLoot.calcFriendlyInfo();
            addFriendlyLabel(MHLoot.lootWindowAlly);
          } else {
            addLoadingLabel(MHLoot.lootWindowAlly);
          }
        } catch (e) {
          console.warn("MHLoot.webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange(): ", e);
        }
      
        this.__mhloot_showLootAllianceBase();
      }
      
      //webfrontend.gui.region.RegionCityStatusInfoOwn
      // BASE - Own
      if (!webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase) {
        webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase = webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange;
      }
      webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange = function () {
        try {            
          if (!MHLoot.lootWindowOwn) {
            MHLoot.lootWindowOwn = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
            MHLoot.lootWindowOwn.setTextColor('yellow');//yellow white            

            var w = webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance();              
            w.add(MHLoot.lootWindowOwn);
          }
          
          if(MHLoot.loadBase()) {           
            MHLoot.calcFriendlyInfo();
            addFriendlyLabel(MHLoot.lootWindowOwn);
          } else {
            addLoadingLabel(MHLoot.lootWindowOwn);
          }
        } catch (e) {
          console.warn("MHLoot.webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange(): ", e);
        }
      
        this.__mhloot_showLootOwnBase();// ??? what for
      }

      // CAMP - Forgotten
      if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
        webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
      }
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
            MHLoot.calcTroops();
            MHLoot.calcInfo();
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
            MHLoot.calcTroops();
            MHLoot.calcInfo();
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
            MHLoot.calcTroops();
            MHLoot.calcInfo();            
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
          if (showLoot) {
            hp = {};
            hp.name = '<b>Lootable Resources</b>';
            hp.img = resImages;
            t = [];  
            t.push(MHLoot.Display.lootArray[0]);//Research 6  
            t.push(MHLoot.Display.lootArray[1]);//Tiberium 1
            t.push(MHLoot.Display.lootArray[2]);//Crystal 2
            t.push(MHLoot.Display.lootArray[3]);//Credits 3           
            hp.val = t;
            //iconArrays.push(hp);  //store !!
            
            // draw icon's info              
            r++; c=0;
            widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
            //console.log('A) i',i);   
            for(var j in hp.val) {
              //console.log('B) i',i,'j',j);
              widget.add(hp.img[j], {row: r, column: c++}); 
              widget.add(new qx.ui.basic.Label(MHLoot.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
            } 
          }
          
          // troop
          if (showTroops) { //to do     
            hp = {};
            hp.name = '<b>Troop Strength</b>';
            hp.img = troopImages;
            t = [];
            t.push(MHLoot.Display.troopsArray[0]);
            if (showTroopsExtra) {
              t.push(MHLoot.Display.troopsArray[1]);//inf
              t.push(MHLoot.Display.troopsArray[2]);//veh
              t.push(MHLoot.Display.troopsArray[3]);//stu
              //t.push(MHLoot.Display.troopsArray[4]);//air
            }              
            hp.val = t;
            // draw icon's info                            
            r++; c=0;
            widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
            widget.add(new qx.ui.basic.Label(MHLoot.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
            //console.log('A) i',i);
            c=2;
            for(var j=1;j<hp.val.length;j++) {
              //console.log('B) i',i,'j',j);
              widget.add(hp.img[j-1], {row: r,column: c++}); 
              widget.add(new qx.ui.basic.Label(MHLoot.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
            }   
          }
          
          // draw text info
          if(MHLoot.Display.infoArrays !== undefined) {
            for(var i in MHLoot.Display.infoArrays) {              
              r++; c=0;
              widget.add(new qx.ui.basic.Label(MHLoot.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
              c=1;
              for(var j in MHLoot.Display.infoArrays[i].lbs) {
                widget.add(new qx.ui.basic.Label(MHLoot.Display.infoArrays[i].lbs[j]+' '+MHLoot.Display.infoArrays[i].val[j]), {row: r, column: c});
                c+=2;
              }           
            }
          } 
          if(MHLoot.Display.twoLineInfoArrays !== undefined) {     
            for(var i in MHLoot.Display.twoLineInfoArrays) {              
              r++; c=0;
              widget.add(new qx.ui.basic.Label(MHLoot.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
              //console.log('i',i);   
              c=1;
              for(var j in MHLoot.Display.twoLineInfoArrays[i].lbs) {
                widget.add(new qx.ui.basic.Label(MHLoot.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                widget.add(new qx.ui.basic.Label(MHLoot.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                c+=2;
              }
              r++;                
            }
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
          if (showLoot) widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({rich: true}), {row: r++,column: c, colSpan: 6});
          widget.add(new qx.ui.basic.Label('Waiting for server response ' + w).set({rich: true}), {row: r++,column: c});
        } catch (e) {
          console.warn('MHLoot.addLoadingLabel: ', e);
        }
      }
    
      function addFriendlyLabel(widget) {
        try {              
          widget.removeAll();
          if(typeof(twoLineInfoArrays)!='undefined') {
            var r=0, c=0;
            for(var i in twoLineInfoArrays) {              
              r++; c=0;
              widget.add(new qx.ui.basic.Label(twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
              c=1;
              for(var j in twoLineInfoArrays[i].lbs) {
                widget.add(new qx.ui.basic.Label(twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                widget.add(new qx.ui.basic.Label(twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                c+=2;
              }
              r++;                
            }
          }
        } catch (e) {
          console.warn('MHLoot.addFriendlyLabel: ', e);
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


(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              
              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {
        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
          case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
          case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
            windowSaver.update();
            windowSaver.show();
            break;
          default:
            windowSaver.hide();
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();


function initOptions(){
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);  
    var opBtn = new qx.ui.form.Button("O");
    opBtn.set({ width: 30, 
               height: 30,
               toolTipText: "Addons Options"
              
              });
    var optionBox = new qx.ui.window.Window("Optons");
    opBtn.addListener("click", function(){
                     optionBox.setPadding(1);
                     optionBox.setLayout(new qx.ui.layout.VBox(1));
                     optionBox.setShowMaximize(false);
                     optionBox.setShowMinimize(false);
                     optionBox.moveTo(125, 525);
                     optionBox.setHeight(100);
                     optionBox.setWidth(200);
                     if (optionBox.isVisible()) {
                        optionBox.close();
                        return;
                     }
                     else optionBox.open();
    },this);
    bas.add(opBtn, { right: 66, bottom: 80 });
    
    
     var tabView = new qx.ui.tabview.TabView();
     tabView.setPadding(5);
     optionBox.add(tabView);

     ////////////////// Buttons ////////////////////
     var btnTab = new qx.ui.tabview.Page("Buttons");
     btnTab.setLayout(new qx.ui.layout.VBox(5));
     btnTab.setPadding(1);
     var eHBox = new qx.ui.container.Composite()
     eHBox.setLayout(new qx.ui.layout.HBox(5));
     eHBox.setThemedFont("bold");
     eHBox.setThemedPadding(2);
     eHBox.setThemedBackgroundColor("#eef");
     eHBox.add(new qx.ui.basic.Label("Side: "));

     var leftBtn = new qx.ui.form.Button("L");
     leftBtn.set({ width: 20, 
                   appearance: "button-text-small",
                   toolTipText: "Moves Buttons To The Left"
              
              });
     leftBtn.addListener("click",function(){
                                    bas.remove(opBtn);
                                    opBtn.set({width:76});
                                    bas.add(opBtn, { right: null, left: 6, bottom: 80 });
                                },this);
     
     var rightBtn = new qx.ui.form.Button("R");
     rightBtn.set({ width: 20, 
                    appearance: "button-text-small",
                    toolTipText: "Moves Buttons To The Right"
              
              });
     rightBtn.addListener("click",function(){
                                    bas.remove(opBtn);
                                    opBtn.set({width:30});
                                    bas.add(opBtn, { right: 66, left: null, bottom: 80 });
                                },this);
    
     eHBox.add(leftBtn);
     eHBox.add(rightBtn);    
     btnTab.add(eHBox);
     tabView.add(btnTab);
    
    
    
}

                      
                      
function initSimulateBattle(){
    
	qx = unsafeWindow["qx"];
	ClientLib = unsafeWindow["ClientLib"];
	
    var lock = false;
	var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	var btn = new qx.ui.form.Button("S");
	
	btn.set({ width: 30, 
             height: 30,
             toolTipText: "Simulates Combat"   
            });
	btn.addListener("click", function(){
		if (lock)                 
            return;
		
		qx = unsafeWindow["qx"];
		ClientLib = unsafeWindow["ClientLib"];
		webfrontend = unsafeWindow["webfrontend"];

		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
		var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
		var app = qx.core.Init.getApplication();		
		ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
		ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
		app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);

		lock = true;
        var cooldown = new qx.ui.form.Button("X");
        cooldown.set({ width: 30, height: 30});
        bas.add(cooldown, { right: 66, bottom: 4 });
		setTimeout(function(){
			lock = false;
            bas.remove(cooldown);
		}, 10000)
	}, this)
        bas.add(btn, { right: 66, bottom: 4 });
}


function initReturnSetup(){
    

        var buttonReturnSetup = new qx.ui.form.Button("Setup");
                     buttonReturnSetup.set({
                        width: 80,
                        appearance: "button-text-small",
                        toolTipText: "Return to Combat Setup"
                     });
                     buttonReturnSetup.addListener("click", function() {
                     // Set the scene again, just in case it didn't work the first time
                     var app = qx.core.Init.getApplication();
                     var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                     var current_city = player_cities.get_CurrentCity();
                     try {
                        app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, current_city.get_Id(), 0, 0);
                     } catch (e) {
                        app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, current_city.get_Id(), 0, 0);
                     }
                  } , this);
    
        var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(buttonReturnSetup, {
                        top: 10,
                        left: 0
                     });
}

function initUnlockCombat()
{
             var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);

                     var buttonUnlockAttack = new qx.ui.form.Button("X");
                     buttonUnlockAttack.set({
                        width: 44,
                        height: 45,
                        appearance: "button-text-small",
                        toolTipText: "Unlocks Combat"
                     });
                     buttonUnlockAttack.setThemedFont("bold");
                     buttonUnlockAttack.addListener("click",function() {
                     var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
                     armyBar.remove(buttonUnlockAttack);
                     setTimeout(function() {
                        armyBar.add(buttonUnlockAttack);}, 2000);
                  } , this);
                     armyBar.add(buttonUnlockAttack, {
                        bottom: 7,
                        right: 10
                     });
      
}

function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var battleResultsBox = null;
var simTimeLabel = null;

function initTools(){
    ///////////////Labels//////////////
    var enemyTroopStrengthLabel = null;
    var enemyUnitsStrengthLabel = null;
    var enemyBuildingsStrengthLabel = null;
    var CYTroopStrengthLabel = null;
    var DFTroopStrengthLabel = null;
    //////////End Labels//////////////
     var buttonTools = new qx.ui.form.Button("T");
     buttonTools.set({
        width: 30, height: 30,
        appearance: "button-text-small",
        toolTipText: "Open Simulator Tools"
     });
     battleResultsBox = new qx.ui.window.Window("Tools");
     buttonTools.addListener("click", function() {

                     battleResultsBox.setPadding(1);
                     battleResultsBox.setLayout(new qx.ui.layout.VBox(1));
                     battleResultsBox.setShowMaximize(false);
                     battleResultsBox.setShowMinimize(false);
                     battleResultsBox.moveTo(125, 125);
                     battleResultsBox.setHeight(300);
                     battleResultsBox.setWidth(200);
                     if (battleResultsBox.isVisible()) {
                        battleResultsBox.close();
                        return;
                     }
                     else battleResultsBox.open();
                     var curCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();         
                     var targetHP = curCity.GetDefenseConditionInPercent(); 
                     var targetBuilding = curCity.GetBuildingsConditionInPercent();
                     var targetDefense = curCity.GetDefenseConditionInPercent();
                     var CYHP = (curCity.get_CityBuildingsData().GetBuildingByMDBId(58).get_HitpointsPercent()) * 100;
                     var DFHP = (curCity.get_CityBuildingsData().GetBuildingByMDBId(74).get_HitpointsPercent()) * 100;
         
                     var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                     battleground.SimulateBattle();

                     setTimeout(function() {
                         var battleDuration = battleground.get_BattleDuration ()/1000;
                         console.log("battleDuration = " + battleDuration); 
                         simTimeLabel.setValue(""+ battleDuration);
                         console.log("CYHP After sim = " + ((curCity.get_CityBuildingsData().GetBuildingByMDBId(58).get_HitpointsPercent()) * 100));
                     }, 1000);


         
                     enemyTroopStrengthLabel.setValue(""+targetHP);
                     enemyUnitsStrengthLabel.setValue(""+targetDefense);
                     enemyBuildingsStrengthLabel.setValue(""+targetBuilding);
                     CYTroopStrengthLabel.setValue(""+CYHP.toFixed(2));
                     DFTroopStrengthLabel.setValue(""+DFHP.toFixed(2));
                     }, this);
    
    var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
    armyBar.add(buttonTools, {
    bottom: 42,
    right: 66
    });
    
     var tabView = new qx.ui.tabview.TabView();
     tabView.setPadding(5);
     battleResultsBox.add(tabView);

     ////////////////// Stats ////////////////////
     var statsPage = new qx.ui.tabview.Page("Stats");
     statsPage.setLayout(new qx.ui.layout.VBox(5));
     statsPage.setPadding(1);
     tabView.add(statsPage);
        // The Enemy Vertical Box
     var eVBox = new qx.ui.container.Composite()
     eVBox.setLayout(new qx.ui.layout.VBox(5));
     eVBox.setThemedFont("bold");
     eVBox.setThemedPadding(2);
     eVBox.setThemedBackgroundColor("#eef");
     statsPage.add(eVBox);
    // The Enemy Troop Strength Label
     var eHBox1 = new qx.ui.container.Composite();
     eHBox1.setLayout(new qx.ui.layout.HBox(5));
     eHBox1.add(new qx.ui.basic.Label("Enemy Base: "));

     enemyTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     eHBox1.add(enemyTroopStrengthLabel);
     enemyTroopStrengthLabel.setTextColor("red");
     eVBox.add(eHBox1);
     // Units
     var eHBox4 = new qx.ui.container.Composite();
     eHBox4.setLayout(new qx.ui.layout.HBox(5));
     eHBox4.add(new qx.ui.basic.Label("Defences: "));
     enemyUnitsStrengthLabel = new qx.ui.basic.Label("Undefined");
     eHBox4.add(enemyUnitsStrengthLabel);
     enemyUnitsStrengthLabel.setTextColor("green");
     eVBox.add(eHBox4);
     // Buildings
     var eHBox5 = new qx.ui.container.Composite();
     eHBox5.setLayout(new qx.ui.layout.HBox(5));
     eHBox5.add(new qx.ui.basic.Label("Buildings: "));
     enemyBuildingsStrengthLabel = new qx.ui.basic.Label("Undefined");
     eHBox5.add(enemyBuildingsStrengthLabel);
     enemyBuildingsStrengthLabel.setTextColor("green");
     eVBox.add(eHBox5);
     // Command Center
     var eHBox2 = new qx.ui.container.Composite();
     eHBox2.setLayout(new qx.ui.layout.HBox(5));
     eHBox2.add(new qx.ui.basic.Label("Construction Yard: "));
     CYTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     eHBox2.add(CYTroopStrengthLabel);
     CYTroopStrengthLabel.setTextColor("red");
     eVBox.add(eHBox2);
     // Defense Facility
     var eHBox3 = new qx.ui.container.Composite();
     eHBox3.setLayout(new qx.ui.layout.HBox(5));
     eHBox3.add(new qx.ui.basic.Label("Defense Facility: "));
     DFTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     eHBox3.add(DFTroopStrengthLabel);
     DFTroopStrengthLabel.setTextColor("red");
     eVBox.add(eHBox3);
    
     var hboxSupportContainer = new qx.ui.container.Composite();
     hboxSupportContainer.setLayout(new qx.ui.layout.HBox(5));
     var enemySupportLevelLabel = new qx.ui.basic.Label("Support lvl ");
     hboxSupportContainer.add(enemySupportLevelLabel);
     var enemySupportStrengthLabel = new qx.ui.basic.Label("--: Undefined");
     hboxSupportContainer.add(enemySupportStrengthLabel);
     enemySupportStrengthLabel.setTextColor("red");
     eVBox.add(hboxSupportContainer);
     // The Troops Vertical Box
     var tVBox = new qx.ui.container.Composite()
     tVBox.setLayout(new qx.ui.layout.VBox(5));
     tVBox.setThemedFont("bold");
     tVBox.setThemedPadding(2);
     tVBox.setThemedBackgroundColor("#eef");
     statsPage.add(tVBox);
     // The Repair Time Label
     var tHBox1 = new qx.ui.container.Composite();
     tHBox1.setLayout(new qx.ui.layout.HBox(5));
     tHBox1.add(new qx.ui.basic.Label("Repair Time: "));
     var simRepairTimeLabel = new qx.ui.basic.Label("Undefined");
     tHBox1.add(simRepairTimeLabel);
     simRepairTimeLabel.setTextColor("blue");
     tVBox.add(tHBox1);
     // The Troop Strength Label
     var tHBox5 = new qx.ui.container.Composite();
     tHBox5.setLayout(new qx.ui.layout.HBox(5));
     tHBox5.add(new qx.ui.basic.Label("Overall: "));
     var simTroopDamageLabel = new qx.ui.basic.Label("Undefined");
     tHBox5.add(simTroopDamageLabel);
     simTroopDamageLabel.setTextColor("blue");
     tVBox.add(tHBox5);
     // The Infantry Troop Strength Label
     var tHBox2 = new qx.ui.container.Composite();
     tHBox2.setLayout(new qx.ui.layout.HBox(5));
     tHBox2.add(new qx.ui.basic.Label("Infantry: "));
     var infantryTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     tHBox2.add(infantryTroopStrengthLabel);
     infantryTroopStrengthLabel.setTextColor("green");
     tVBox.add(tHBox2);
     // The Vehicle Troop Strength Label
     var tHBox3 = new qx.ui.container.Composite();
     tHBox3.setLayout(new qx.ui.layout.HBox(5));
     tHBox3.add(new qx.ui.basic.Label("Vehicle: "));
     var vehicleTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     tHBox3.add(vehicleTroopStrengthLabel);
     vehicleTroopStrengthLabel.setTextColor("green");
     tVBox.add(tHBox3);
     // The Air Troop Strength Label
     var tHBox4 = new qx.ui.container.Composite();
     tHBox4.setLayout(new qx.ui.layout.HBox(5));
     tHBox4.add(new qx.ui.basic.Label("Aircraft: "));
     var airTroopStrengthLabel = new qx.ui.basic.Label("Undefined");
     tHBox4.add(airTroopStrengthLabel);
     airTroopStrengthLabel.setTextColor("green");
     tVBox.add(tHBox4);

     // The inner Vertical Box
     var vBox = new qx.ui.container.Composite()
     vBox.setLayout(new qx.ui.layout.VBox(5));
     vBox.setThemedFont("bold");
     vBox.setThemedPadding(2);
     vBox.setThemedBackgroundColor("#eef");
     // The Victory Label
     var hBox2 = new qx.ui.container.Composite()
     hBox2.setLayout(new qx.ui.layout.HBox(5));
     hBox2.add(new qx.ui.basic.Label("Outcome: "));
     var simVictoryLabel = new qx.ui.basic.Label("Unknown");
     hBox2.add(simVictoryLabel);
     simVictoryLabel.setTextColor("green");
     vBox.add(hBox2);
     // The Battle Time Label
     var hBox1 = new qx.ui.container.Composite()
     hBox1.setLayout(new qx.ui.layout.HBox(5));
     hBox1.add(new qx.ui.basic.Label("Battle Time: "));
     simTimeLabel = new qx.ui.basic.Label("Undefined");
     hBox1.add(simTimeLabel);
     simTimeLabel.setTextColor("black");
     vBox.add(hBox1);

     statsPage.add(vBox);
  
     ////////////////// Info ////////////////////
     var infoPage = new qx.ui.tabview.Page("Info");
     infoPage.setLayout(new qx.ui.layout.VBox(5));
     tabView.add(infoPage);

     // The Help Vertical Box
     var pVBox = new qx.ui.container.Composite()
     pVBox.setLayout(new qx.ui.layout.VBox(5));
     pVBox.setThemedFont("bold");
     pVBox.setThemedPadding(2);
     pVBox.setThemedBackgroundColor("#eef");
     infoPage.add(pVBox);
     var proHelpBar = new qx.ui.basic.Label().set({
        value: "<a target='_blank' href='http://userscripts.org/scripts/discuss/147335'>Forums</a>",
        rich: true
     });
     pVBox.add(proHelpBar);
     // The Spoils
     var psVBox = new qx.ui.container.Composite()
     psVBox.setLayout(new qx.ui.layout.VBox(5));
     psVBox.setThemedFont("bold");
     psVBox.setThemedPadding(2);
     psVBox.setThemedBackgroundColor("#eef");
     infoPage.add(psVBox);
     psVBox.add(new qx.ui.basic.Label("Spoils"));
     // Tiberium
     var tiberiumSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_tiberium.png");
     psVBox.add(tiberiumSpoils);
     // Crystal
     var crystalSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_chrystal.png");
     psVBox.add(crystalSpoils);
     // Credits
     var creditSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_dollar.png");
     psVBox.add(creditSpoils);
     // Research
     var researchSpoils = new qx.ui.basic.Atom("0", "webfrontend/ui/common/icn_res_research_mission.png");
     psVBox.add(researchSpoils);

     battleResultsBox.add(tabView);

}


function initFormationShiftKeys(){

    
    var application = qx.core.Init.getApplication();
	var bas = application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);  
    var shiftBtn = new qx.ui.form.Button("F");
    shiftBtn.set({ width: 30, 
               height: 30,
               toolTipText: "Shift Formation"
              
              });
    var shiftBox = new qx.ui.window.Window("Shift Formation");
    shiftBtn.addListener("click", function(){
                     shiftBox.setPadding(1);
                     shiftBox.setLayout(new qx.ui.layout.VBox(1));
                     shiftBox.setShowMaximize(false);
                     shiftBox.setShowMinimize(false);
                     shiftBox.moveTo(325, 525);
                     shiftBox.setHeight(100);
                     shiftBox.setWidth(200);
                     if (shiftBox.isVisible()) {
                        shiftBox.close();
                        return;
                     }
                     else shiftBox.open();
    },this);
    bas.add(shiftBtn, { right: 66, bottom: 118 }); 
    
    
	 var shiftTab = new qx.ui.tabview.Page("Shift");
     shiftTab.setLayout(new qx.ui.layout.VBox(5));

    
	var arrows = {};
	arrows.ShiftFormationLeft = new qx.ui.form.Button("←");
	arrows.ShiftFormationLeft.set(
	{
		width: 85,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Left"
	});
	arrows.ShiftFormationLeft.addListener("click", function(){shiftFormation('l');}, this);
	
	arrows.ShiftFormationRight = new qx.ui.form.Button("→");
	arrows.ShiftFormationRight.set(
	{
		width: 85,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Right"
	});
	arrows.ShiftFormationRight.addListener("click", function(){shiftFormation('r');}, this);    
    
	
	arrows.ShiftFormationUp = new qx.ui.form.Button("↑");
	arrows.ShiftFormationUp.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Up"
	});
	arrows.ShiftFormationUp.addListener("click", function(){shiftFormation('u');}, this);
    
	
	arrows.ShiftFormationDown = new qx.ui.form.Button("↓");
	arrows.ShiftFormationDown.set(
	{
		width: 30,
		appearance: "button-text-small",
		toolTipText: "Moves Formation Down"
	});
	arrows.ShiftFormationDown.addListener("click", function(){shiftFormation('d');}, this);
    
	var shiftHBox = new qx.ui.container.Composite()
    shiftHBox.setLayout(new qx.ui.layout.HBox(5));         
	shiftTab.add(arrows.ShiftFormationUp);
	shiftHBox.add(arrows.ShiftFormationLeft);
	shiftHBox.add(arrows.ShiftFormationRight);
    shiftTab.add(shiftHBox);
	shiftTab.add(arrows.ShiftFormationDown);
    
    shiftBox.add(shiftTab);
    //End of Shift Keys
    

}

function getCityPreArmyUnits() {
	ClientLib = unsafeWindow["ClientLib"];
	var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
	var formationManager = ownCity.get_CityArmyFormationsManager();
	return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
}

function restoreFormation(saved_units) {
	var sUnits = saved_units;
	var units = getCityPreArmyUnits();
	var units_list = units.get_ArmyUnits().l;
	for (var idx = 0; idx < sUnits.length; idx++) {
		var saved_unit = sUnits[idx];
		var uid = saved_unit.id;
		for (var i = 0;
		(i < units_list.length); i++) {
			if (units_list[i].get_Id() === uid) {
				units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
				if (saved_unit.enabled === undefined) units_list[i].set_Enabled(true);
				else units_list[i].set_Enabled(saved_unit.enabled);
			}
		}
	}
	units.UpdateFormation(true); //this works and USES the API so works for both servers
}

function shiftFormation(direction) { //left right up down
	
	if (!direction) var direction = window.prompt("indicate a direction to shift units: up(u), down(d), left(l) or right(r)");
	
	if (direction == "up" || direction == "u") var v_shift = -1;
	if (direction == "down" || direction == "d") var v_shift = 1;
	if (direction == "left" || direction == "l") var h_shift = -1;
	if (direction == "right" || direction == "r") var h_shift = 1;
	
	if (!v_shift) var v_shift = 0;
	if (!h_shift) var h_shift = 0;
	
	units = getCityPreArmyUnits().get_ArmyUnits().l;
	var Army = [];
	//read army, consider use saveFormation(?)
	for (var i = 0;	(i < this.units.length); i++) {
		var unit = this.units[i];
		var armyUnit = {};
		var x = unit.get_CoordX() + h_shift;
		switch (x) {
			case 9:
			x = 0;
			break;
			case -1:
			x = 8;
			break;
		}
		var y = unit.get_CoordY() + v_shift;
		switch (y) {
			case 4:
			y = 0;
			break;
			case -1:
			y = 3;
			break;
		}
		armyUnit.x = x;
		armyUnit.y = y;
		armyUnit.id = unit.get_Id();
		armyUnit.enabled = unit.get_Enabled();
		Army.push(armyUnit);
	}
	restoreFormation(Army);
    onUnitMoved();
}

function onViewChange(oldMode, newMode) {
                     if (battleResultsBox.isVisible()) {
                        battleResultsBox.close();
                     }
}

function onUnitMoved(sender, e) {

        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
        battleground.SimulateBattle();


        var battleDuration = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration ()/1000;
        
        simTimeLabel.setValue(""+ battleDuration);
        console.log("Moved Unit");

}
    
    
function initViewChange(){
    try{
    var add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).NBGYGU(this, onViewChange);

    ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(add_ViewModeChange);
    }
    catch(e){
        console.log(e);
    }
}

function initUnitMoved(){
    var add_UnitMoved = (new ClientLib.Data.CityPreArmyUnitsChanged).NBGYGU(this, onUnitMoved);
    logObject(add_UnitMoved);
    
    units = new ClientLib.Data.CityPreArmyUnits();

    units.add_ArmyChanged(add_UnitMoved);

}
    
function waitForClientLib(){
    
		ClientLib = unsafeWindow["ClientLib"];
		qx = unsafeWindow["qx"];
	
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(waitForClientLib, 1000);
			return;
		}
		initSimulateBattle();
        initReturnSetup();
        initUnlockCombat();
        initTools();
        initViewChange();
        //initUnitMoved();
        initOptions();
        initFormationShiftKeys()

}

function logObject(obj){
    var output = '';
    for (property in obj) {
      output += property + ': ' + obj[property]+';\n ';
    }
    console.log(obj + output);   
}

function startup(){
    
	setTimeout(waitForClientLib, 1000);
};

startup();