// ==UserScript==
// @name          PluginsLib - mhBuilder - Tiberium Alliances
// @description   Auto base builder for PluginsLib
// @namespace     http://userscripts.org/users/471241
// @author        MrHIDEn    (game:PEEU)
// @downloadURL   https://userscripts.org/scripts/source/186973.user.js
// @updateURL     https://userscripts.org/scripts/source/186973.meta.js
// @grant         none
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version       0.01 alpha
// ==/UserScript==
/*NOTE
var gameDataTech = unit.get_UnitGameData_Obj();
var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
*/
(function(){
var InjectBody = function()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var cce=console.error;var ccd=console.dir;
  var ccc=console.clear;var ccg=console.group;var ccge=console.groupEnd;var cct=console.time;var ccte=console.timeEnd;var cctr=console.trace;

  var pluginName = "mhBuilder";
  var created = false;
  function CreateClasses()
  {
    //DEBUG
    qx.Class.define("PluginsLib.Debug." + pluginName, {
      //DEBUG handler 
      //EX var debug = (PluginsLib.Debug.yourClass.something={}); OR var debug = (this.debug.something={});
      //ccl(Object.keys(PluginsLib.Debug)); //ccl(Object.keys(PluginsLib.Debug[pluginName]));
      type : "static",
      statics : {
      }
    });
    //API
    qx.Class.define("PluginsLib.API." + pluginName, {
      type : "static",
      statics : {
        extend: function(self){
          self = self || this;
            try{
            var gc = ClientLib.Data.MainData.GetInstance().get_Cities();       
            //var ccid = c.get_CurrentCityId();
            var cc = gc.get_CurrentCity();
            if(self.join(cc)){
                return;//done
            }
            var ac = gc.get_AllCities().d;
            for(var k in ac){
              if(self.join(ac[k])){
                return;//done
              }
            }
          }catch(ex){}
          window.setTimeout(self.extend, 2000, self);//try utile done
        },
        join: function(city){
          keys = {};
          this.getKeys(keys,city.get_CityBuildingsData());
          this.getKeys(keys,city.get_CityUnitsData());
          var cnt = Object.keys(keys).length;
          if(cnt==3) {
            if(typeof(ClientLib.Data.City.prototype.get_Buildings)=="undefined" && typeof(keys.Buildings)!='undefined') {
              ClientLib.Data.City.prototype.kBuildings = keys.Buildings;
              ClientLib.Data.City.prototype.get_Buildings = function(){
                var o=this.get_CityBuildingsData()[this.kBuildings];
                return {c:o.c,d:o.d};
              };
            }
            if(typeof(ClientLib.Data.City.prototype.get_OffenseUnits)=="undefined" && typeof(keys.Offences)!='undefined') {
              ClientLib.Data.City.prototype.kOffenseUnits = keys.Offences;
              ClientLib.Data.City.prototype.get_OffenseUnits = function(){
                var o=this.get_CityUnitsData()[this.kOffenseUnits];
                return {c:o.c,d:o.d};
              };
            }
            if(typeof(ClientLib.Data.City.prototype.get_DefenseUnits)=="undefined" && typeof(keys.Defences)!='undefined') {
              ClientLib.Data.City.prototype.kDefenseUnits = keys.Defences;
              ClientLib.Data.City.prototype.get_DefenseUnits = function(){
                var o=this.get_CityUnitsData()[this.kDefenseUnits];
                return {c:o.c,d:o.d};
              };
            }
            console.info('PluginsLib.API.'+pluginName+'.extend DONE');
            //this.extend = function(){};// don't remove
            return true;
          }
          return false;
        },
        getKeys: function(keys,city){
          var off = false, def = false;
          for(var k in city){
            var o=city[k];
            if(o===null) continue;
            if(typeof(o)!='object') continue;
            if(typeof(o.c)=='undefined') continue;
            if(o.c<1) continue;
            if(typeof(o.d)=='undefined') continue;
            var ks = Object.keys(o.d);
            var u = o.d[ks[0]];//sample
            if(typeof(u) != 'object') continue;                  
            if(typeof(u.get_UnitLevelRepairRequirements)!='function') continue;
            //ccl(k,typeof(o),typeof(o.d),n[k]);
            if(typeof(u.GetUnitGroupType)=='undefined') { 
              keys.Buildings = k;// buildings
              return;
            } else {                
              if(u.GetUnitGroupType()) {// units=3 - attack
                keys.Offences = k;
                off = true;
              } else {// units=0 - defend
                keys.Defences = k;
                def = true;
              }
              if(off && def) return;
            }
          }
        }        
      }
    });
    //BUILDER
    qx.Class.define("PluginsLib." + pluginName + ".builder" , {
      type : "static",
      statics : {
        aTechNameShort: [
        "CY",//ConstructionYard
        "R",//Refinery
        "P",//PowerPlant
        "CC",//CommandCenter
        "DH",//DefHeadQ
        "OI",//baraks
        "OV",//factory
        "OA",//airfield
        "DF",//DefFac
        "Research_BaseFound",
        "C",//crystal
        "T",//tiberium
        "DS",//support air
        "DS",//support ion
        "DS",//support art
        "S",//silo
        "A" //accumlator
        ],
        done: null,
        data: {},//do not use it !!! every city must have own
        task: null,//general
        clearTask: function(){
          var buf = {};
          if(this.task===null){
            buf.gc = 0;
            buf.gi = {};
            buf.ga = [];
          }
          else{
            buf.gc = this.task.gc;
            buf.gi = this.task.gi;
            buf.ga = this.task.ga;
          }            
          this.task = {
            idx:0,//db idx
            t:{},//task items list
            p:0, //task items count
            
            a:0,//cities count
            b:{},//cities ids
            
            //u,ua are clear when another run starts
            //should that be stored for whole sesion?
            //or another array?
            uc:0, //upgraded count
            ui:{},//arrays of upgraded items by cityId
            ua:[],//array of all upgraded items
            
            r:{} //report
          };
          var k;
          for(k in buf) this.task[k] = buf[k];
        },
        lessCost: function(a,b) {
          var r = true;
          for(var k in a) {
            if(typeof(b[k])!='undefined'){
              //ccl(a[k],b[k]);
              r = r && (a[k]<b[k]);
              if(!r) break;
            }
          }
          return r;
        },
        getCost: function (d,o) {
          //ccl('getCost d',d,r);
          o = o || {};
          var r = {};
          for(var k in o) r[k] = o[k];//copy
          //aResourceType = getEnum(ClientLib.Base.EResourceType);
          var t={1:'T',2:'C',3:'G',4:'PL',5:'P',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
          for (var i in d) {
            var c = d[i];//Requirement/Cost
            if(typeof(c)!='object') continue;
            k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
            if(typeof(r[k])=='undefined') r[k] = 0;//add branch
            r[k] += c.Count;
          }
          //ccl('getCost r',r);
          return r;
        },
        sumCost: function (a,b) {
          var r = {};
          var k;
          for(k in a) r[k] = a[k];
          for(k in b) r[k] = (typeof(a[k])=='undefined')? b[k]: a[k] +b[k];
          return r;
        },
        difCost: function (a,b) {
          var r = {};
          var k;
          for(k in a) r[k] = a[k];
          for(k in b) r[k] = (typeof(a[k])=='undefined')? -b[k]: a[k] -b[k];
          return r;
        },
        copyCost: function (a) {
          var r = {};
          var k;
          for(k in a) r[k] = a[k];
          return r;
        },
        formatCost: function (r,f) {
          //ccl('formatCost r',r,f);
          if(r===null) return "";
          f = f || {T:"0",C:"0",P:"0",G:"0"};
          //ccl('r',r);
          var k;
          for(k in f) { // PluginsLib.Util.formatNumbersCompact
            var val = typeof(r[k])!='undefined'?r[k]:0;
            f[k] = PluginsLib.Util.formatNumbersCompact(val,2);
          }
          var s='';
          for(k in f) s += k + ':' + f[k] +'  ';
          s = s.trimRight();
          return s;
        },
        getAvailableResources: function(data){
          var city = data.city;
          var res = {T:0,C:0,G:0,P:0};  
          res.T = city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
          res.C = city.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
          res.P = city.GetResourceCount(ClientLib.Base.EResourceType.Power);
          res.G = city.GetResourceCount(ClientLib.Base.EResourceType.Gold);
          data.resources = res;
          return data;
        },
        parseScript: function(sScript,cityName,typeList){
          //script = "S T A P C";
          //NOTE first level is ignored and it is ALWAYS set to 0
          sScript = sScript || "";
          cityName = cityName || "";
          if(!sScript) return cityName+" Empty script";
          sScript = sScript.toUpperCase();
          //sScript = sScript.replace(/^ +| +$/g,"").replace(/ +/g," ");// unnecessary spaces
          sScript = sScript.replace(/ +$/g,"");//trim right
          var aScript = sScript.split(/[ ]/);
          //ccl(sScript,aScript);
          //var typeList = ["T","C","P","R","A","S","DF","DH","DS","CY","CC","OI","OV","OA","ANY"];//ANY means any buiulding - future, ALL, just for all
          //TODO ALL in random order
          //TODO test ANY to be on the end
          //TODO by placeing only ANY you are able to upgrade all just by level, from lower to higher
          
          //TODO check that 'type' is only onece on the list 'This type is already in script'
          var aSyntax = [];
          var aLevels = [];
          for(i=0;i<aScript.length;i++){ 
            var s = aScript[i];
            var lev = s.replace(/^[A-Z]*/,"");//get level
            //var type=s.replace(/[-+][0-9]*$/,"");
            var type = s.replace(lev,"");//get type
            //ccl('typeList',type,typeList.indexOf(type));//test -1=ERROR
            aSyntax.push(type+lev);
            if(aSyntax.length>3) aSyntax.splice(0,1);
            if(typeList.indexOf(type)<0){
              console.error('parseScript Syntax error. type=',type,', lev=',lev);
              //var wrong = type?" Wrong type '"+type+"'":(!type && !lev)?" Unnecessary char ' '!":"";
              var wrong = type?" Wrong type '"+type+"'":" Unnecessary char ' '!";
              wrong += " Parameter #"+(i+1)+".";
              return cityName+" Syntax error at '"+aSyntax.join(" ")+"'."+wrong;
            }
            if(!lev) lev = 0;
            try{
              lev = parseInt(lev,10);
            }catch(ex){return cityName+" Syntax error at '"+aSyntax.join(" ")+"'. Wrong number.";}
            if(i===0) lev = 0;//first is ignored
            aLevels.push({t:type,l:lev});
          }
          return aLevels;
        },
        getCityBuildings: function(data) {
          var cid,typ;
          var bs = data.city.get_Buildings().d;
          data.aSorted = {};
          data.c = data.city.get_Buildings().c;
          data.min = {};
          data.max = {};
          //sort by type
          for(cid in bs) {//scan all building
            var b = bs[cid]; 
            var techName = b.get_TechName();
            if(b.get_CollectResourceType()==2) techName--;
            techName = this.aTechNameShort[techName];
            if(data.aSorted[techName]===undefined) data.aSorted[techName] = [];
            data.aSorted[techName].push(b);//need full base info for cost API
          }
          //sort by level
          var cmpLevel = function(a,b){return a.get_CurrentLevel()>b.get_CurrentLevel();};//asc
          for(typ in data.aSorted){//scan all types
            var a = data.aSorted[typ];//arr of all buildings of one type
            a.sort(cmpLevel);//sort them
            var min=a[0].get_CurrentLevel();//find the lowest level
            var max=a[a.length-1].get_CurrentLevel();//find the highest level
              //var s = typ +" ";a.forEach(function(v){s += v.get_CurrentLevel()+",";});ccl(s+"(min:"+min+"),(max:"+max+")");
            data.min[typ] = min;
            data.max[typ] = max;
          }
          return data;
        },
        setLevels: function(data){
          var baseLevel,aLevels=[];
          if(data.aScript.length>0) baseLevel = data.newLevel || data.min[data.aScript[0].t];
          for(var i=0;i<data.aScript.length;i++){
            var script = {t:data.aScript[i].t,l:data.aScript[i].l};
            script.l += baseLevel;
            if(script.l<1) script.l = 1;//minimum to level
            aLevels.push(script);
          }
          data.baseLevel = baseLevel;
          data.aLevels = aLevels;
          return data;
        },
        tryUpgradeAll: function(data){
          //cci('tryUpgradeAll');
          //PREPARE
          var t;
          data.report = null;
          data.reportAll = [];
          data.items = {};
          data.totalCost = {T:0,P:0};
          data.needCost = {T:0,P:0};
          data.nextCost = null;
          data.upgrade = {c:0,a:[],b:[],l:[]};
          data.aPreselected = [];//test {tt:trgType,tl:trgLevel,o:object};
          var iType=0;    
          var aScriptTypes =   [];//all types in the script
          var aScriptLevels =  [];//all levels in the script
          var aExistingTypes = [];//all kinds of buildngs in this city
          for(t in data.aLevels) {
            aScriptTypes.push(data.aLevels[t].t);
            aScriptLevels.push(data.aLevels[t].l);
          }
          for(t in data.aSorted) aExistingTypes.push(t);
          //ccw('tryUpgradeAll lists',aScriptTypes,aScriptLevels,aExistingTypes);
          //cci('aScriptTypes ',aScriptTypes.join(","));
          //TODO if ALL than build all from the lowest up in random order
          //if(aScriptTypes[0]=="ALL")
          //first find all biuildings from script list
          var trgType,trgLevel;
          var prg = 0, all = 0;          
          
          // ccw('data.totalCost ',this.formatCost(data.totalCost,{T:0,P:0}));
          // ccw('data.needCost  ',this.formatCost(data.needCost,{T:0,P:0}));
          // ccw('data.resources ',this.formatCost(data.resources,{T:0,P:0}));
          
          //TASK
          //while(aScriptTypes.length>0){
          data.aItemsAll = [];//test
          data.aItemsPreselected = [];//test
          data.aItemsQualified = [];//test
          var iTypes = 0;
          for(iTypes=0; iTypes<aScriptTypes.length; iTypes++){
            //script params
            trgType = aScriptTypes[iTypes];
            trgLevel = aScriptLevels[iTypes];
            if(trgType=="ANY") break;//or something better 
            var iExisting = aExistingTypes.indexOf(trgType);
            if(iExisting<0) continue;//there is no this type in the city
            aExistingTypes.splice(iExisting, 1);
            
            //NOMINATED, EXISTING TYPES
            
            //TODO next type only if before one is done?
            
            var aObjects = data.aSorted[trgType];
            all += aObjects.length;
            //cci('aScriptTypes ,trgT',trgType,',trgL',trgLevel,',pos',iExisting,',cnt',aObjects.length,',all',all);
            
            //data.aItemsAll[trgType] = "" + trgLevel + ": ";//test
            data.aItemsAll.push(trgType + trgLevel + ": ");//test
            data.aItemsPreselected.push(trgType + trgLevel + ": ");//test
            data.aItemsQualified.push(trgType + trgLevel + ": ");//test
            var dcid = data.aItemsAll.length-1;
              
            data.items[trgType] = {c:0,a:[]};
            for(var iObj in aObjects){
              obj = aObjects[iObj];
              
              data.aItemsAll[dcid] += "" + obj.get_CurrentLevel() + " ";
              
              var skip = (trgLevel <= obj.get_CurrentLevel()) || obj.HasReachedMaxLevel();
              //ccl('trgLevel',trgLevel,' obj.get_CurrentLevel()',obj.get_CurrentLevel());
              
              //SKIP OR
              if(skip) prg++;//ready
              //TRY UPGRADE
              else {
                data.aPreselected.push({tt:trgType,tl:trgLevel,o:obj});//test
                
                data.aItemsPreselected[dcid] += "" + obj.get_CurrentLevel() + " ";//test                
                
                if(this.tryUpgradeObj(data,obj,trgType,trgLevel,iObj)) {
                  prg++;
                  data.aItemsQualified[dcid] += "" + obj.get_CurrentLevel() + " ";//test
                }
                //else break;//there is not enouth resources
              }                
            }
            //cci('trgT',trgType,',prg',prg,',all',all,',cnt',aObjects.length);            
            
            var y=[];for(var x in data.aSorted[trgType]) y.push(data.aSorted[trgType][x].get_CurrentLevel());
            var report = trgType+'.'+trgLevel+':'+(skip?'DONE':'todo')+', '+data.aSorted[trgType][0].get_CurrentLevel()+'/'+trgLevel+' list:'+y.join(",");
            data.reportAll.push(report);
            //ccl(report);
          }
          // ccl('aExistingTypes left',aExistingTypes);
          // ccw('prg',prg,',all',all,',tot',100*prg/all|0,'%');
          // ccw('data.totalCost ',this.formatCost(data.totalCost,{T:0,P:0}));
          // ccw('data.needCost  ',this.formatCost(data.needCost,{T:0,P:0}));
          // ccw('data.resources ',this.formatCost(data.resources,{T:0,P:0}));
          
          
          data.levelDone = (prg == all) && (all > 0);// << this could be a problem if prg=0 == all=0
          // cci('DONE ',data.levelDone?"YES":"NO");
          data.prg = prg;
          data.all = all;
          
          var str = 'Target Level:'+data.baseLevel +', Done:';
          str += (100*prg/all|0).toString() +'% ('+prg+'/'+all+' objects)\r\n';//zle !!! w innym miejscu
          str += 'Spent: '+this.formatCost(data.totalCost,{T:0,P:0})+', ';
          str += 'Resources: '+this.formatCost(data.resources,{T:0,P:0})+', ';
          str += 'Need: '+this.formatCost(data.needCost,{T:0,P:0})+', ';
          cci(str);
          
          //RETURN REPORT
          //data.report = {progress:'L'+data.baseLevel.toString()+' '+(100*prg/all|0).toString()+'% '+prg+'/'+all,need:this.formatCost(data.needCost,{T:0,P:0})};
          data.report = {progress:'L'+data.baseLevel.toString()+' '+(100*prg/all|0).toString()+'%',need:this.formatCost(data.needCost,{T:0,P:0}),next:this.formatCost(data.nextCost,{T:0,P:0})};
          //ccl('data.report',data.report);
          
          if(aScriptTypes[iTypes]=="ANY" && aExistingTypes.length>0){
            trgLevel = aScriptLevels[iTypes];
            for(iTypes=0;iTypes<aExistingTypes.length;iTypes++){
              trgType = aExistingTypes[iTypes];
              //TODO
            }
          }
          
          return data;
        },
        tryUpgradeObj: function(data,obj,trgType,trgLevel,iObj){
          var objLevel = obj.get_CurrentLevel();
          var stpLevel = trgLevel;
          var isEnough = true;
          var totalCost = data.totalCost;//ref
          var upgrCost = {};
          
          
          //TODO
          //does not upgrade new little building
          
          //try to get the highest aviable level to upgrade
          do{
            upgrCost = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel( obj, stpLevel);//=null if upgrade is unnecessary
            if(!upgrCost){
              cce('upgrCost trgT:',trgType,' stpL:',stpLevel,' curL:',objLevel,' trgL:',trgLevel,' upgCst:',upgrCost);
              return;
            }    
            upgrCost = this.getCost(upgrCost);
            //ccl('upgrCost ',this.formatCost(upgrCost,{T:0,P:0}));
            //ccw('Cost,'+trgType+'_'+objLevel+' '+stpLevel+'/'+trgLevel+', '+formatCost(upgrCost,{T:0,P:0}));
            totalCost = this.sumCost(data.totalCost, upgrCost);   
            isEnough = this.lessCost(totalCost, data.resources);//is enough?
            if(!isEnough) stpLevel--;//not enough, try lower            
          }while(!isEnough && stpLevel > objLevel);
          
          if(isEnough) data.totalCost = totalCost;//sum of all to be upgraded (You will spend this amount right now)
          else data.needCost = this.sumCost(data.needCost, upgrCost);//sum of all not be upgraded (You need this amount to finish this level)
          
          if(!isEnough && data.nextCost === null) data.nextCost = this.copyCost(upgrCost);
          
          data.enough = isEnough;
          //ccw(isEnough?'IS ENOUGH':'is NOT ENOUGH');
          if(isEnough){ 
            //ccl('data.resources ',this.formatCost(data.resources,{T:0,P:0}));
            //ccl('data.totalCost',this.formatCost(data.totalCost,{T:0,P:0}));
            //ccl('data.needCost ',this.formatCost(data.needCost,{T:0,P:0}));
            //ccl('upgrCost ',this.formatCost(upgrCost,{T:0,P:0}));
            //ccw('Cost,'+trgType+''+objLevel+' '+stpLevel+'/'+trgLevel+', '+this.formatCost(upgrCost,{T:0,P:0}));
            //ccl('data.enough',data.enough);
            var delta = stpLevel - objLevel;
            if(delta>0) {
              var bldId = obj.get_Id();
              var bldX = obj.get_CoordX();
              var bldY = obj.get_CoordY();
              
              var item = { l:objLevel, i:bldId, x:bldX, y:bldY, d:delta};        
              data.items[trgType].c++;
              data.items[trgType].a.push(item);
              
              data.upgrade.c++;
              data.upgrade.a.push(String(bldId)+":"+String(delta));//send array
              
              var dbg = trgType+iObj+' '+objLevel+'+'+delta;//view array, debug
              data.upgrade.b.push(dbg);//view array, debug
              data.upgrade.l.push(objLevel);//view array, debug
            }
          }
          // ccl('data.totalCost',this.formatCost(data.totalCost,{T:0,P:0}));
          // ccl('data.needCost ',this.formatCost(data.needCost,{T:0,P:0}));
          // ccl('data.resources ',this.formatCost(data.resources,{T:0,P:0}));
          return isEnough;
        },
        addTask: function(cityId){
          //ccl('addTask',cityId);
          var idx = this.task.idx++;
          var newTask = {};
          newTask.idx = idx;
          newTask.cityId = cityId;
          newTask.tid = 0;
          
          this.task.t[idx] = newTask;
          this.task.p++;
          
          if(typeof(this.task.b[cityId])=='undefined'){
            this.task.b[cityId] = 1;
            this.task.a++;
          }
          else this.task.b[cityId]++;
          
          //cci('addTask ',this.task.idx,this.task.p,this.task.t);
          //ccw('addTask p',this.task.p);
          //ccw('addTask t',this.task.t);
          //ccd(this.task);
          
          return newTask;
        },
        removeTask: function(currTask){
          //ccl('removeTask',cityId);
          var tid = currTask.tid;
          if(tid) clearTimeout(tid);
          var idx = currTask.idx;
          
          delete this.task.t[idx];
          this.task.p--;
          
          //cci('removeTask ',this.task.idx,this.task.p,this.task.t);
          //ccw('removeTask p',this.task.p);
          //ccw('removeTask t',this.task.t);
          //ccw('removeTask r',this.task.r);
          //ccd(this.task);
        },        
        exit: function(data){
          //ccw('exit',data.cityId);
          
          //REPORT
          if(data.report) {
            data.report.cityId = data.task.cityId;
            this.task.r[data.task.cityId] = {};
            this.task.r[data.task.cityId].progress = data.report.progress;
            this.task.r[data.task.cityId].need = data.report.need;
            //this.task.r[data.task.cityId].need = data.report.need;
            //cci('exit typeof(callback)',typeof(data.callback));
            if(typeof(data.callback)=='function') data.callback(data.report);
          }
          
          //REMOVE TASK
          this.removeTask(data.task);
          
          //ccl('exit 1',data);ccd(data);
          //ccl('exit 2',this.task);ccd(this.task); 
          
          //NOTHING TO UPGRADE ON THIS LEVEL
          if(data.levelDone) {//script was done in 100%
            var ret = { r:"DONE", m:"", t:this.task};
            ccw("DONE:",data.levelDone?"YES":"NO",' On the lev:',data.baseLevel);
            //ANOTHER UPGRADE +1 LEVEL
            //if(data.levelDone) {
              data.newLevel = data.baseLevel +1;
              //REAL PROBLEM
              //does 'data.levelDone' mean that all row has been done?
              //what about 'data.enougth' ?
              //why did not upgraded R-5 ??
              ret = this.upgradeRepeat(data);//all items in script are done, next level
            //}
            
            return ret;
          }
          else {
            if(data.upgrade.a.length>0){
              //QUERY
              var q = {
                cityid:        data.cityId,
                buildingInfos: data.upgrade.a
              };
              ccw('SendCommand ',data.cityName," ",data.upgrade.b);
              //REQUEST
              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuildingBatch", q, null, null, true);      
            }
            
            //ccw('ENOUGH:',data.enough?"YES":"NO");
            //ENOUTH RESOURCES TO TRY UPGRADE MORE
            if(data.enough) {
              ccw('ENOUGH:',data.enough?"YES":"NO");
              ccw('data.resources     ',this.formatCost(data.resources,{T:0,P:0}));
              ccw('data.totalCost     ',this.formatCost(data.totalCost,{T:0,P:0}));
              ccw('data.needCost      ',this.formatCost(data.needCost,{T:0,P:0}));
              
              //TODO
              //problem, stack              
              //DELAYED UPGRADE
              //this.upgradeBuildingsDelayed(city,script,callback,  data.baseLevel);
              //data.newLevel = data.baseLevel +0;
              
              //if(typeof(data.delayed)=='undefined') data.delayed=3;
              //if(--data.delayed) this.upgradeRepeatDelayed(data);
              this.upgradeRepeatDelayed(data);
              
              return { r:"DELAYED", m:""};
            }
            //NO RESOUCES, DONE   
          }
          
          var cityId = data.cityId;
          if(typeof(this.task.b[cityId]) != 'undefined'){
            delete this.task.b[cityId];
            this.task.a--;
          }
          //ccl('exit 3',this.task);ccd(this.task);ccd(data);
          ccl('exit 3');ccd(data);
          return { r:"NEED_RESOURCES", m:""};
        },
        upgradeBuildings: function(city,script,callback){
          var data = {};
          data.self = this;
          data.city = city;
          data.script = script;
          data.callback = callback;
          data.newLevel = null;
          data.cityId = city.get_Id();
          data.cityName = city.get_Name();
          data.task = this.addTask(data.cityId);
          
          return this.upgrade(data);
        },
        //upgradeBuildingsDelayed: function(city,script,callback,  newlevel){  
        upgradeRepeatDelayed: function(data){ 
          ccl('upgradeRepeatDelayed');
          //return;
          data.task = this.addTask(data.cityId);
          var tid = setTimeout(this.upgrade, 3 *1000, data);
          data.task.tid = tid;//correct TimerId, def=0
        },
        upgradeRepeat: function(data){
          ccl('upgradeRepeat');
          //return;
          data.task = this.addTask(data.cityId);
          
          return this.upgrade(data);
        },
        //upgrade: function(self,city,script,callback,  newlevel,task){
        upgrade: function(data){
        //PluginsLib.mhBuilder.builder
          //cci('upgrade typeof(data.callback)',typeof(data.callback));
          //if(!data.city) return {c:0,r:"ERROR",m:"What city?"};
          cct("upgradeBuildings");
          try{
            cci('upgrade '+data.cityId+', '+data.cityName+', '+data.script);//city name
            
            //cci('data.newLevel',data.newLevel);
            
            //ccl('upgrade data 1',data); ccd(data);
            
            //MAIN JOB
            if(!data.newLevel) {
              var typeList = ["T","C","P","R","A","S","DF","DH","DS","CY","CC","OI","OV","OA","ANY"];
              var aScript = data.self.parseScript(data.script,data.cityName,typeList);
              if(typeof(aScript)=="string"){//=error    
                return {c:0,r:"ERROR",m:aScript};//m-message
                //TODO callback
              }
              //ccd(aScript);
              data.aScript   = aScript;
            }
            data = data.self.getAvailableResources(data);
            data = data.self.getCityBuildings(data);
            data = data.self.setLevels(data);
            data = data.self.tryUpgradeAll(data);            
            
            //FINISH
            if(data.upgrade.b.length>0) {
              ccl('Upgraded',data.upgrade.b);
              ccl('needed [',data.self.formatCost(data.needCost,{T:0,P:0}),'], available [',data.self.formatCost(data.resources,{T:0,P:0}),'], spent [',data.self.formatCost(data.totalCost,{T:0,P:0}),'],');
              //ccl('task',data.task);
              
              if(typeof(data.self.task.ui[data.task.cityId])=='undefined') data.self.task.ui[data.task.cityId] = [];// ??? data.task.cityId == data.cityId
              data.self.task.ui[data.task.cityId] = data.self.task.ui[data.task.cityId].concat(data.upgrade.b);
              data.self.task.uc += data.upgrade.b.length;
              data.self.task.ua = data.self.task.ua.concat(data.upgrade.b);
              
              if(typeof(data.self.task.gi[data.task.cityId])=='undefined') data.self.task.gi[data.task.cityId] = [];
              data.self.task.gi[data.task.cityId] = data.self.task.gi[data.task.cityId].concat(data.upgrade.b);
              data.self.task.gc += data.upgrade.b.length;
              data.self.task.ga = data.self.task.ga.concat(data.upgrade.b);
              
              //ccl('task',data.self.task.uc);
              //ccd(data.self.task.ui);
              //ccl(data.self.task.ua);
            }            
            //ccd(data);
            
            //ccl('upgrade data 4',data);ccd(data);ccd(data.self.task);
            
            //EXIT
            var ret = data.self.exit(data);
            
            ccte("upgradeBuildings");
            return ret;
          }catch(ex){console.error('builder ex',ex);}
        },
        upgradeAll: function(){
          var ocs = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
          this.clearTask();
          for(var n in ocs) {
            this.upgradeBuildings(ocs[n],"P A1 S1 T C DH DF CC CY OA+2 OF+2 OB R-2",null);
          }
        },
        upgradeOne: function(){
          var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().d;
          this.clearTask();
          this.upgradeBuildings(oc,"P A1 S1 T C DH DF CC CY OA+2 OF+2 OB R-2",null);
        },
        upgradeOneAlongData: function(scriptData,callback,cityId){
          this.clearTask();
          cci('upgradeOneAlongData cid',cityId);
          //cci('upgrade typeof(callback)',typeof(callback));
          var d = scriptData[cityId];//cid-CityId, d.r-Run, d.s-Script
          var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
          city.CollectAllResources();          
          //cci('upgradeAlongData d.s',d.s);
          
          this.upgradeBuildings(city,d.s,callback);
          //ccl('upgradeOneAlongData 1',this.task);ccd(this.task);
        },
        upgradeAllAlongData: function(scriptData,callback){
          //console.info('upgradeAllAlongData 1');
          this.clearTask();
          //console.log('upgradeAllAlongData 2');
          //cci('upgrade typeof(callback)',typeof(callback));
          //cci('scriptData',scriptData);
          for(var cid in scriptData) {
            //cci('cityId',cid);
            var d = scriptData[cid];//cid-CityId, d.r-Run, d.s-Script
            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cid);
            city.CollectAllResources();
            if(!d.r) continue;
            this.upgradeBuildings(city,d.s,callback);
          }
          //ccl('upgradeAllAlongData 1',this.task);ccd(this.task);
        } 
      }
    });
    //MAIN
    qx.Class.define("PluginsLib." + pluginName, {
      type: "singleton",
      //extend: webfrontend.gui.CustomWindow,
      extend: qx.core.Object,
      statics : {
        NAME: 'Auto base builder',
        PLUGIN: 'MH Builder',//=Menu Name
        HINT: 'Open builder',
        AUTHOR: 'MrHIDEn',
        VERSION: 0.01,
        REQUIRES: 'Menu,Util',
        NEEDS: '',
        INFO: 'Auto builder for PluginsLib',
        WWW: 'http://userscripts.org/scripts/show/186973',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },
      //class PluginsLib.mhNotepad.construct
      construct: function() //mhNotepad
      {
        try
        {
          this.stats.src = 'http://goo.gl/QVgCnq';//
          this.self = this;
          //this.stamp('construct',new Error().lineNumber);//REMOVE
          var debug = (this.debug.construct={});
          //EXTEND API
          PluginsLib.API[pluginName].extend();
          
          //ccl(Object.keys(PluginsLib.Debug));
          
          //this.stamp('construct',new Error().lineNumber);//REMOVE
          //ccw('this.scripts',this.scripts);
          
          var scripts = this.storageLoad('scripts', this.scripts, true);//this solve default values
          if(this.scripts.version > scripts.version) this.storageSave('scripts', this.scripts);//new version
          else this.scripts = scripts;
          
          //GUI
          var Width = 720;
          var tHeight = 420;
          ////////////////// PLUGIN WINDOW ////////////////////
          this.winPlugin = this.createPluginWindow("Builder",Width,tHeight+80);     
          ////////////////// TABLE MAIN ////////////////////
          this.tblMain = this.createMainTable();
          //TEST
          //this.setMainStatusBarText("Help: T,C,P,R,A,S,DF,DH,DS,CY,CC,OB,OF,OA");
          ////////////////// SCRIPT ////////////////////
          this.scriptField = this.createScriptField(this.onScriptField);
          
          ////////////////// LABEL 1 ////////////////////          
          var lblBase = new qx.ui.basic.Label().set({ alignX: "left", rich:true});
          lblBase.setValue(this.strings.lblBaseLbl);
          lblBase.setToolTipText(this.strings.lblBaseTip);
          
          ////////////////// PAGE 1 ////////////////////
          this.tabPage1 = this.createPage(this.strings.page1,1);
          //add
          this.tabPage1.add(lblBase);
          this.tabPage1.add(this.tblMain);
          this.tabPage1.add(this.scriptField);
          ////////////////// PAGE 2 ////////////////////
          this.tabPage2 = this.createPage(this.strings.page2,2); 
          ////////////////// PAGE 3 ////////////////////
          this.tabPage3 = this.createPage(this.strings.page3,3);
          ////////////////// TABVIEW ////////////////////          
          this.tabView = this.createTabView(Width,tHeight);
          //add
          this.tabView.add(this.tabPage1);
          this.tabView.add(this.tabPage2);
          this.tabView.add(this.tabPage3);
          ////////////////// BUTTONS ////////////////////
          var cntHButtons = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));          
          var btnUpgradeAll = this.createButton(this.strings.btnUpgradeAllLbl,this.strings.btnUpgradeAllTip, 100,this.onUpgradeAll);          
          var btn2 = this.createButton(this.strings.btnUpdateSelectedLbl,this.strings.btnUpdateSelectedTip, 120,this.onUpdateSelected);

          //base
          var layContainer = new qx.ui.layout.VBox(0);
          var cntContainer = new qx.ui.container.Composite(layContainer);
          cntContainer.set({ padding: 1, decorator: "pane-light-opaque"});

          
          //cntContainer.add(lblBase);
          cntContainer.add(this.tabView);
          cntHButtons.add(btnUpgradeAll);
          cntHButtons.add(btn2);
          cntContainer.add(cntHButtons);
          this.winPlugin.add(cntContainer);
          
          //this.stamp('construct',new Error().lineNumber);//REMOVE
          //EVENTS
          //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
          //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
          //phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCityChanged);
          
          //move window left if needed ///////////////////////////
          //var dsk = qx.core.Init.getApplication().getDesktop();
          //dsk.addListener("resize", function(){console.warn(pluginName+" onResize");}, this);
          
          //DELEGATES FOR REGISTER PLUGIN
          this.constructor.ONPLUGIN = function(){this.constructor.getInstance().winPlugin.open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test = null
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        }
        catch (e) {
          console.error(this.classname,'.construct: ', e);
        }
      },
      destruct: function(){},
      members: {
        self: null,
        debug: PluginsLib.Debug[pluginName],
        builder: PluginsLib[pluginName].builder,
        stats: document.createElement('img'),
        backColor: '#eeeeff',
        stamp: function(a,b,c) {
          //EX this.stamp('yourLabel',new Error().lineNumber,object);//REMOVE
          c = c || "";
          var beginOfCode = 12;
          if(c) console.warn('STAMP ',pluginName+'.'+a, beginOfCode + b,c);
          else console.warn('STAMP ',pluginName+'.'+a, beginOfCode + b);
          //var s = ".options:"+"{menu:"+this.__settings.options.menu.toString() + ",button:"+this.__settings.options.button.toString() + "}";
          //if(this.__settings.options.menu == 2 &&  this.__settings.options.button == 1) console.log(s);
          //else console.error(s);
        },
        notes: null,
        scripts: {
          version:2,
          data:{},//by cityId
          report:{},//by cityId
          cid:[],//city id by row
          rid:{} //row id by cityId
        },
        strings: {
          page1: "Base",
          page2: "Defence",
          page3: "Offence",
          lblBaseLbl: "<b>Help: T,C,P,R,A,S,DF,DH,DS,CY,CC,OI,OV,OA</b>",
          lblBaseTip: "List:<br>T - Tiberium<br>C - Crystal<br>P - Power Plant<br>R - Refinery<br>A - Accumlator<br>S - Silo<br>DF - Defence Facility<br>DH - Defence HQ<br>DS - Defence Support<br>CY - Contruction Yard<br>CC - Command Center<br>OI - Barrack<br>OV - Factory<br>OA - Airfield",
          btnUpgradeAllLbl: "Upgrade All",
          btnUpgradeAllTip: "",
          btnUpdateSelectedLbl: "Update Selected",
          btnUpdateSelectedTip: "",
          btnApplyThisLbl: "Apply this to all selected",
          btnApplyThisTip: "",
          btnRunThisLbl: "Run this once",
          btnRunThisTip: "Run script without 'Run' flag."
        },
        //GUI
        winPlugin: null,
        //winOptions: null,
        tabView: null,
        tabPage1: null,
        tabPage2: null,
        tabPage3: null,
        tblMain: null,
        scriptField: null,
        //create GUI
        createPluginWindow: function(name,width,height) {
          var win = new qx.ui.window.Window();
          win.set({
            width:width,
            height:height,
            caption:name + " " + this.constructor.VERSION.toFixed(2) + " (MH)",
            padding:0,
            allowMaximize:0,
            showMaximize:0,
            allowMinimize:0,
            showMinimize:0, 
            allowClose:1,           
            showClose:1,
            resizable:false
          });          
          //more Listeners
          win.addListener("appear", function(){ this.onCityChanged();}, this);
          win.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.storageSave('winpos', pos);
          }, this);
          pos = this.storageLoad('winpos', {left:130, top:5});
          win.moveTo(pos.left, pos.top);
          var layWin = new qx.ui.layout.VBox(0);
          this.layWin = layWin;//REMOVE
          //winLayout.setAlignX("center");
          win.setLayout(layWin);
          return win;
        },
        createTabView: function(width,height) {
          var tview = new qx.ui.tabview.TabView();
          tview.setWidth(width);
          tview.setHeight(height);
          return tview;
        },
        createPage: function(label,id) {
          var tabPage = new qx.ui.tabview.Page(label);
          tabPage.setLayout(new qx.ui.layout.VBox(1));
          tabPage.setUserData("page",id);
          return tabPage;
        },
        createButton: function(label,toolTip,width,onExecute) {
          var btn = new qx.ui.form.Button(label).set({width:width});
          btn.setToolTipText(toolTip);
          btn.addListener("execute", onExecute, this);
          return btn;
        },        
        createScriptField: function(onKey){
          var txtField = new qx.ui.form.TextField();
          //txtField.addListener("keypress", onKey, this);//changeValue
          txtField.addListener("keyup", onKey, this);//changeValue
          txtField.setPlaceholder("Enter script");          
          return txtField;
        },
        //TODO refresh data every time appear
        createMainTable: function(){
          //this.stamp('createMainTable',new Error().lineNumber);
          var self = this;
          //ccl('this.scripts',this.scripts);
          //ccl('self.scripts',self.scripts);
          function makeData(){            
            //ccl('makeData self.scripts',self.scripts);
            var a = [];
            var ocs = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
            self.scripts.rid = {};
            self.scripts.cid = [];
            var cid,d,rep,i=0;
            for(cid in ocs) {
              //READ FROM STORE or DEFAULT
              if(typeof(self.scripts.data[cid])!=="undefined") d = self.scripts.data[cid];
              else d = self.scripts.data[cid] = {r:false,s:"P A1 S1 T C DH DF CC CY OA2 OV2 OI R"};//default
              if(typeof(self.scripts.report[cid])!=="undefined") rep = self.scripts.report[cid];
              else rep = self.scripts.report[cid] = {p:"---",n:"---"};//default
              
              //ROW
              var row =[];
              row[0] = ocs[cid].get_Name();//city name
              row[1] = d.r;//run flag
              row[2] = rep.p;//progress
              row[3] = d.s;//script
              row[4] = rep.n;//need resources
              a.push(row);
              
              //MAKE HELPERS
              self.scripts.rid[cid] = i;
              self.scripts.cid[i++] = cid;
            }
            //ccd(self.scripts.data);
            
            return a;
          }
          var tableModel = new qx.ui.table.model.Simple();
          tableModel.setColumns(["City","Run","Progress","Script","Need"]);
          tableModel.setUserData("makeData",makeData);
          //tableModel.setData(makeData());
          var table = new qx.ui.table.Table();
          table.setTableModel(tableModel);
          table.set({
            //width: 600,
            height: 310,
            decorator: null
          });
          table.addListener("appear", function(){ 
            //console.log('appear 1');
            var self = PluginsLib[pluginName].getInstance();
            var tableModel = self.tblMain.getTableModel();            
            var makeData = tableModel.getUserData("makeData");
            tableModel.setData(makeData());
          }, this);
          table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
          var columnModel = table.getTableColumnModel();
          columnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Boolean());
          columnModel.setColumnWidth(0, 140);//city name
          columnModel.setColumnWidth(1, 40);//run
          columnModel.setColumnWidth(2, 65);//progress
          columnModel.setColumnWidth(3, 280);//script
          columnModel.setColumnWidth(4, 120);//need
          // var newRenderer = new qx.ui.table.cellrenderer.Conditional();
          // newRenderer.addNumericCondition(">=", 0, null, "red");
          // newRenderer.addNumericCondition(">=",25, null, "black");
          // newRenderer.addNumericCondition(">=",50, null, "blue");
          // newRenderer.addNumericCondition(">", 75, null, "green");
          // table.getTableColumnModel().setDataCellRenderer(2, newRenderer);
          function getContextMenu(){
            //ccl('getContextMenu');
            var menu = new qx.ui.menu.Menu();
            var btnApplyThis = new qx.ui.menu.Button(self.strings.btnApplyThisLbl);
            var btnRunThis = new qx.ui.menu.Button(self.strings.btnRunThisLbl);
            btnApplyThis.addListener("execute",function(e){
              var rc = table.getUserData("rc");
              if(rc) {
                //ccl('btnApplyThis',rc);
                var bRun = tableModel.getValue(1,rc.r);
                var sScript = tableModel.getValue(3,rc.r);
                table.getSelectionModel().iterateSelection(function(row){
                  tableModel.setValue(1,row,bRun);
                  tableModel.setValue(3,row,sScript);
                  var k = self.scripts.cid[row];
                  self.scripts.data[k].r = bRun;
                  self.scripts.data[k].s = sScript;
                });      
                ccd(self.scripts.data);
                self.storageSave("scripts",self.scripts);
              }
            }, this);
            btnRunThis.addListener("execute",function(e){
              var rc = table.getUserData("rc");
              //ccl('this',this);//=window
              //ccl('self',self);//=PluginsLib.mhBuilder.getInstance();
              if(rc) {
                //ccl('btnRunThis',rc,cityId);  
                var cityId = self.scripts.cid[rc.r];
                self.builder.upgradeOneAlongData(self.scripts.data, self.onUpgraded,cityId);
              }
            }, this);
            btnRunThis.setToolTipText(self.strings.btnRunThisTip);
            menu.add(btnApplyThis);
            menu.add(btnRunThis);
            //menu.add(b3);
            return menu;
          }
          table.setContextMenu(getContextMenu());
          
          function cellClick(e) {
            //ccw('cellClick',[e.getType(),e.getRow(),e.getColumn(),e.getButton()]);
            //cellClick = e;
            var r = e.getRow();
            var c = e.getColumn();
            table.setUserData("rc",{r:r,c:c});
            if(c==1) {
              var bRun = !tableModel.getValue(1,r);
              tableModel.setValue(1,r,bRun);
              table.getSelectionModel().iterateSelection(function(row){
                tableModel.setValue(1,row,bRun);      
                var k = self.scripts.cid[row];
                self.scripts.data[k].r = bRun;
              });
              //ccd(self.scripts.data);
              self.storageSave("scripts",self.scripts);
            }
            else if(c==3){
              var sScript = tableModel.getValue(3,r);
              self.scriptField.setValue(sScript);
              //maybe in general call without column
              var typeList = ["T","C","P","R","A","S","DF","DH","DS","CY","CC","OI","OV","OA","ANY"];
              var aScript = this.builder.parseScript(sScript,"",typeList);
              var msg = (typeof(aScript)=='string')? aScript: "Script is correct";//"sScript";
              this.setMainStatusBarText(msg);
            }            
          }
          table.addListener("cellClick", cellClick, this);

          return table;
        },
        setMainStatusBarText: function(text){
          text = text || "";
          text = ". " + text;
          this.tblMain.setAdditionalStatusBarText(text);
        },
        onScriptField: function(e){
          //this.stamp('onScriptField',new Error().lineNumber);          
          if(e.getKeyCode()==13){
            console.log(e.getKeyCode());
            //window.onScriptField = {};
            //window.onScriptField.e = e;
            var sScript = this.scriptField.getValue();
            //console.log(sScript);
            //ccl('scriptField',[e.getKeyCode(),e.getKeyIdentifier(),sScript]);
            this.tblMain.getSelectionModel().iterateSelection(function(row){
              this.tblMain.getTableModel().setValue(3,row,sScript);
              var k = this.scripts.cid[row];
              this.scripts.data[k].s = sScript;
            }, this);
            //ccd(this.scripts.data);
            this.storageSave("scripts",this.scripts);
          }
          else{
            var typeList = ["T","C","P","R","A","S","DF","DH","DS","CY","CC","OI","OV","OA","ANY"];
            var aScript = this.builder.parseScript(this.scriptField.getValue(),"",typeList);
            var msg = (typeof(aScript)=='string')? aScript: "Script is correct";//"sScript";
            this.setMainStatusBarText(msg);
          }
        },
        onCityChanged: function (l,c) {
          //this.stamp('onCityChanged',new Error().lineNumber);
          //var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
          //this.tabPage2.setLabel(oc.get_Name());
          //this.tabView.setSelection([this.tabPage2]);// reconsider this
          
        },
        onUpgradeAll: function() {
          //console.log('onUpgradeAll');
          //this.stamp('onUpgradeAll',new Error().lineNumber);
          //console.log('this.builder',this.builder);
          //console.log('this.builder.upgradeAllAlongData',this.builder.upgradeAllAlongData);
          //try{
          this.builder.upgradeAllAlongData(this.scripts.data, this.onUpgraded);
            //console.log('this.builder.upgradeAllAlongData 2');
          //}catch(ex){console.error('onUpgradeAll ex',ex);}
          //console.log('onUpgradeAll 2');
        },
        onUpdateSelected: function() {
          //this.stamp('onUpdateSelected',new Error().lineNumber);          
          var sScript = this.scriptField.getValue();
          //console.log(sScript);
          //ccl('scriptField',[e.getKeyCode(),e.getKeyIdentifier(),sScript]);
          this.tblMain.getSelectionModel().iterateSelection(function(row){
            this.tblMain.getTableModel().setValue(3,row,sScript);
            var k = this.scripts.cid[row];
            this.scripts.data[k].s = sScript;
          }, this);
          //ccd(this.scripts.data);
          this.storageSave("scripts",this.scripts);
        },
        //TODO after upgrade place reports
        onUpgraded: function(report) {
          //console.warn('onUpgraded',new Error().lineNumber+12);
          var self = PluginsLib.mhBuilder.getInstance();
          //self.stamp('onUpgraded',new Error().lineNumber);
          //
          //console.dir(self.scripts);
          if(report) {
            //console.dir(report);
            var row = self.scripts.rid[report.cityId];
            self.tblMain.getTableModel().setValue(2,row,report.progress);
            self.tblMain.getTableModel().setValue(4,row,report.need);
            //STORE
            var rep = self.scripts.report[report.cityId];
            rep.p = report.progress;
            rep.n = report.need;
            //self.scripts.report[report.cityId] = rep;
            //ccd(
            self.storageSave("scripts",self.scripts);
            
            self.setMainStatusBarText(self.builder.task.ua.length+" buildings upgraded.");
          }
        },
        enums: {
        },
        storageLoad: function(key,defval,bstore) {
          if(localStorage && key) {
            var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId().toString();
            var storeKey = wid + '.PluginsLib.' + pluginName + '.' + key;
            var storeVal = JSON.parse(localStorage.getItem(storeKey));
            if(storeVal) {
              return storeVal;
            }
            else if(bstore) this.storageSave(storeKey, defval);
          }
          return defval;
        },
        storageSave: function(key,val) {
          if(localStorage && key && val) {
            var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId().toString();
            var storeKey = wid + '.PluginsLib.' + pluginName + '.' + key;
            localStorage.setItem(storeKey, JSON.stringify(val));
          }
        }
      }//members
    });
    created = true;
  }//CreateClasses()
  function WaitForGame() {
    //CreateClasses -> getInstance -> construct
    try
    {
      var c=0;
      try{
        c = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().c;
      }catch(ex){}
      if(typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined' && c>0)
      {
        var app = qx.core.Init.getApplication();
        if(app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin;
          var registerPlugin = false;
          var ready = typeof(PluginsLib[pluginName]) != 'undefined';
          if(ready) {
            plugin = PluginsLib[pluginName];
            if(plugin.REQUIRES.length > 0) {
              var req = plugin.REQUIRES.split(',');
              //check all requires
              for(var i in req) {
                //cci(req[i]);
                if(typeof(PluginsLib[req[i]]) == 'undefined') {
                  ready = false;
                  console.warn("Plugin '" + pluginName + "' REQUIRES: '" + req[i] + "' Waiting...");
                  break;//WAIT
                }
                if(req[i] == "Menu") registerPlugin = true;
              }
            }
          }
          else {
            console.warn("Plugin '" + pluginName + "' UNDEFINED");
            if(typeof(PluginsLib) != 'undefined') console.dir(PluginsLib);
            else console.warn("Plugin 'PluginsLib' UNDEFINED");
          }
          if(ready) {
            plugin.SIZE = scriptSize;
            // START PLUGIN
            plugin.getInstance(); //needed? YES
            //REGISTER PLUGIN
            if(registerPlugin) PluginsLib.Menu.getInstance().RegisterPlugin(plugin.getInstance());
            console.info("Plugin '" + pluginName + "' READY");
            return;//DONE
          }
        }
      }
    }
    catch (ex) {
      console.error('PluginsLib.'+pluginName+'.WaitForGame: ', ex);
    }
    window.setTimeout(WaitForGame, 3000);
  }
  window.setTimeout(WaitForGame, 3000);
};
function Inject() {
  var script = document.createElement('script');
  var txt = InjectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();