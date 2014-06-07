// ==UserScript==
// @name          PluginsLib - Util - Tiberium Alliances
// @author        MrHIDEn(game:PEEU)
// @description   Provides Util for PluginsLib
// @version       1.06
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/167374.user.js
// @updateURL     https://userscripts.org/scripts/source/167374.meta.js
// ==/UserScript==
(function(){
function injectBody()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}

  var spaceName = 'PluginsLib.Util';
  function CreateClasses()
  {
    //class PluginsLib.Util
    qx.Class.define("PluginsLib.Util", {
      //INFO Provides UTIL for PluginsLib
      type : "static",
      //class PluginsLib.Util.statics
      statics : {
        NAME: 'Util',
        PLUGIN: 'Util',
        AUTHOR: 'MrHIDEn',
        VERSION: 1.06,
        REQUIRES: '',
        NEEDS: 'Menu',
        INFO: 'Util for all PluginLib and so on',
        WWW: 'http://userscripts.org/scripts/show/167374',
        SIZE: 0,
        //INFO functions
        formatNumbersCompact: function(v,d) {
          //INFO provides global values formating ex. 123456 = 123,4k
          //return phe.cnc.gui.util.Numbers.formatNumbersCompact(v);
          d = d || 1;
          return this.kMG(v,d);
        },
        kMG: function(v,d) {//value,digits
          //INFO returns formated numer ex. 12,4k
          if(typeof(d)=='undefined') d = 1;
          var t = [ '', 'k', 'M', 'G', 'T', 'P' ,'E' ];
          var i = 0;
          while (v > 1000 && i < t.length) {
            v = (v / 1000).toFixed(d);
            i++;
          }
          //return v.toString().replace('.',',') + t[i];
          return v.toString() + t[i];
        },
        numberFormat: function(v,d) {//value,digits
          //return v.toFixed(d).replace('.',',');
          return v.toFixed(d);
        },
        hms: function(s) {
          //INFO returns formated time hh:mm:ss from s
          var h = Math.floor(s/3600); s%=3600;
          var m = Math.floor(s/60); s%=60;
          var r = (h<10?"0"+h.toString():h.toString()) + ":";
          r += (m<10?"0"+m.toString():m.toString()) + ":";
          s = s.toFixed(0);
          r += (s<10?"0"+s.toString():s.toString());
          return r;
        },
        dhms: function(s,daySep) {//s, [daySep]
          //INFO returns formated time dd:hh:mm:ss from s
          //INFO coverts numers of seconds to formated time ex. '1:02:03:56', daySep="d " '1d 02:03:56'
          //INFO daySep def=":" ex dhms(anyTime), day separator
          daySep = daySep || ":";
          var d = Math.floor(s/86400); s%=86400;
          var h = Math.floor(s/3600); s%=3600;
          var m = Math.floor(s/60); s%=60;
          var r = (d<1?"":d.toString() + daySep);
          r += (h<10?"0"+h.toString():h.toString()) + ":";
          r += (m<10?"0"+m.toString():m.toString()) + ":";
          s = s.toFixed(0);
          r += (s<10?"0"+s.toString():s.toString());
          return r;
        },
        hmsRT: function(city, type, nextLevelFlag) {//city, type, [nextLevelFlag]
          //INFO returns RepairingTime
          nextLevelFlag = nextLevelFlag || false;
          var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
          var h = Math.floor(s/3600); s%=3600;
          var m = Math.floor(s/60); s%=60;
          var r = (h<10?"0"+h.toString():h.toString()) + ":";
          r += (m<10?"0"+m.toString():m.toString()) + ":";
          r += (s<10?"0"+s.toString():s.toString());
          return r;
        },
        getLootsFromCurrentCity: function(r) {
          //INFO T-Tiberium C-Crystals G-Credits P-Power RP-Research Points
          r = r || {};
          var t={1:'T',2:'C',3:'G',5:'P',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
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
        appendScript: function(src,type) {
          //INFO Appends external script to body
          src = src || '';
          type = type || 'text/javascript';
          var i;
          //remove existing
          var list = document.getElementsByTagName('script');
          //BACKWARD, must be to remove all items
          for(i=list.length-1;i>=0;i--) {
            if(list[i].src.indexOf(src)>=0) {
              list[i].remove();
              //console.log('appendScript: FOUND/REMOVED at #' + i);
            }
          }
          //add new
          var script = document.createElement('script');
          script.type = type;
          script.charset = 'UTF-8';
          script.src = src;
          document.body.appendChild(script);
          //make sure
          list = document.getElementsByTagName('script');
          for(i=0;i<list.length;i++) {
              if(list[i].src.indexOf(src)>=0) {
              console.info('appendScript: READY',', ',list[i].type,', ',src);
            }
          }
          console.error(spaceName,'.appendScript: ERROR (',src,')');
          return false;
        },
        denumerate: function(EList) {//denumerate ENUMS
          //INFO return array of strings/keys
          //EX var LNotificationCategory = denumerate(ClientLib.Config.Main.ENotificationCategory);//=["Sys....]
          var keys = [];
          for(var k in EList) {
            if(EList[k]<0) continue;
            keys[EList[k]]=k;
          }
          return keys;
        },
        extendNotificationGetDetails: function() {
          //INFO extend [ClientLib.Data.Notification] by [get_Details()]
          var m=ClientLib.Data.MainData.GetInstance().get_Notifications().GetAll();
          if(m.length>0){
            var n=m[0];
            for(var k in n){
              if(n[k]===null) continue;
              if(typeof(n[k])!='object') continue;
              if(typeof(n[k].msg)=='undefined') continue;
              ClientLib.Data.Notification.prototype.kDetails=k;
              ClientLib.Data.Notification.prototype.get_Details=function(){return this[this.kDetails];};
              //ClientLib.Data.Notification.prototype.isGetDetailsExtended = true;
              cci(spaceName+'.extendNotificationGetDetails DONE');
              return;//DONE
            }
          }
          //ccw('extendNotificationGetDetails Waiting for data');
          window.setTimeout(PluginsLib.Util.extendNotificationGetDetails, 2000);
        },
        extendCityInfo: function() {
          //INFO +get_Buildings() +get_DefenseUnits() +get_OffenseUnits()
          //EX extendCityInfo();
          var keys={};
          var c=0;
          function getKeys(n){
            for(var k in n){
              var o=n[k];
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
              } else {                
                if(u.GetUnitGroupType()) {// units 3-attack
                  keys.Offences = k;
                } else {// units 0-defend                  
                  keys.Defences = k;
                }
              }
            }
          }
          function join(n){  
            getKeys(n.get_CityBuildingsData());
            getKeys(n.get_CityUnitsData());
            c=Object.keys(keys).length;
            if(c==3) {
              ClientLib.Data.City.prototype.isCityInfoExtended = true;
              if(typeof(keys.Buildings)!='undefined') {
                ClientLib.Data.City.prototype.kBuildings = keys.Buildings;
                ClientLib.Data.City.prototype.get_Buildings = function(){
                  var o=this.get_CityBuildingsData()[this.kBuildings];
                  return {c:o.c,d:o.d};
                };
              }
              if(typeof(keys.Offences)!='undefined') {
                ClientLib.Data.City.prototype.kOffenseUnits = keys.Offences;
                ClientLib.Data.City.prototype.get_OffenseUnits = function(){
                  var o=this.get_CityUnitsData()[this.kOffenseUnits];
                  return {c:o.c,d:o.d};
                };
              }
              if(typeof(keys.Defences)!='undefined') {
                ClientLib.Data.City.prototype.kDefenseUnits = keys.Defences;
                ClientLib.Data.City.prototype.get_DefenseUnits = function(){
                  var o=this.get_CityUnitsData()[this.kDefenseUnits];
                  return {c:o.c,d:o.d};
                };
              }
              //console.log('Plugin.Util.extendCityInfo DONE:',keys);
              cci('extendCityInfo DONE');
              //this.extendCityInfo = function(){};// don't remove
              return true;
            }
            return false;
          }
          var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
          for(var k in ac){
            if(join(ac[k])) return;
          }
          var n=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
          if(join(n)) return;
          ccw(spaceName+'.extendCityInfo #Keys(!=3)=',c,'  Waiting for data...');
          window.setTimeout(PluginsLib.Util.extendCityInfo, 2000);//try utile done
        },
        FormatString: function(str,tbl) {
          //INFO ex. PluginsLib.Util.FormatString("Online %0, Members %1, Title %2", [23,50,'Workshop']);
          for(var i=0;i<tbl.length;i++) str=str.replace("%"+i.toString(),tbl[i]);
          return str;
        }
      
      }//statics
    });
		console.info("Plugin '"+this.basename+"' LOADED, READY");
  
  }//CreateClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          CreateClasses();
          PluginsLib.Util.SIZE = scriptSize;
          return;//DONE
        }
      }
    } catch (e) {
      console.log(spaceName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}
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