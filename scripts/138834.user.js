(function(){try{
var thisVersion = "1.2.9";
var thisName = "CustomTowns";
var thisTag = "aIkaCT_";
// --------------------------------------------------------------------
// ==UserScript==
// @name            CustomTowns
// @description     script for ikariam (v0.5.0 or later) to move own buildings by drag'n'drop
// @author          Manuel Ullrich
// @namespace       http://pokeplay.org/UserScript.js/
// @match           http://*.ikariam.gameforge.com/*
// @include         http://s*.*.ikariam.gameforge.com/*
// @exclude         http://support.*.ikariam.gameforge.com/*
// @exclude         http://s*.ikariam.gameforge.com/skin/*

// @version         1.2.9
// @history 1.2.9   Updated saving of configs to support playing on multiple servers
// @history 1.2.8   Updated language system. Readded custom updater via iframe. added history parameters to metadata of script.
// @history 1.2.7   HOTFIX: drag'n'drop is working again
// @history 1.2.6   Deleted IE pngfix because it doesnt seem to work - no longer supporting shadows in IE! HOTFIX: fixed bug that caused errors on the very first startup.
// @history 1.2.5   Optimized code. Updated save system to use less data for storaging. Deleted abort button because there's already the "x" button. Undo button doesnt contain undo counts anymore - button may get deleted in later versions! Added tutorial window for those who cannot find the edit link =) Changed language system to use memory system too.
// @history 1.2.3   Found and fixed bug that doesnt load customized positions.
// @history 1.2.0   Official released on userscripts.org! Changed refresh function from interval to timeout. Updated function that refreshes z index of buildings. Added support for IE8 (8.0.6001.18702). Added pngfix for IE8. Added memory system to use GM_ functions or local storage. Fixed small bugs and changed little things to increase performance.
// @history 1.1.0   Fixed some small bugs. Updated Metadata. Changed shadow images to hover images. Changed update function to use iframe now - no more malicious code! Changed position and zindex of menu window. Updated design of menu window. Added option to change between shadow types. Enabled shadows for cunstructing buildings. Images of ports and yards can now be changed between left and right.
// @history 1.0.0   Released on 2012/07/06
// ==/UserScript==
// --------------------------------------------------------------------
// Copyright (c) 2012, Manuel Ullrich
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Tested under:
// - Pale Moon 3.6.31
//   - no problems, runs well
// - Mozilla Firefox 3.6.28
//   - no problems, runs well
// - Google Chrome 20.0.1132.47 m
//   - no problems, runs awesome
// - Internet Explorer 8.0.6001.18702 (+Trixie)
//   - problem with shadows, runs very slow
// - Opera 12.00
//   - dont use! images doesnt show up / refresh correctly
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// include lib v3

  // neccessary pointers
  var BODY = document.getElementsByTagName("body")[0];
  var HEAD = document.getElementsByTagName("head")[0];

  // System Functions
  function getCookie(n){var n2=n+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++) {var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(n2)==0)return unescape(c.substring(n2.length,c.length));}return null;}
  function cookieExists(n){return getCookie(n)?true:false;}
  function setCookie(n,v,t){var e="";if(t){var d=new Date();d.setTime(d.getTime()+(t*1000));e="; expires="+d.toGMTString();}document.cookie=n+"="+escape(v)+e+"; path=/";}
  function deleteCookie(n){createCookie(n,"",-1);}
  function addEvent(o,t,f){if(o.addEventListener){o.addEventListener(t,f,false);}else if(o.attachEvent){o["e"+t+f]=f;o[t+f]=function(){o["e"+t+f](window.event);};o.attachEvent("on"+t,o[t+f]);}}
  function removeEvent(o,t,f){if(o.removeEventListener){o.removeEventListener(t,f,false);}else if(o.detachEvent){o.detachEvent("on"+t,o[t+f]);o[t+f]=null;o["e"+t+f]=null;}}
  function removeNode(o){if(!o)return false;try{o.parentNode.removeChild(o);return true;}catch(e){}return false;}
  //function strFormat(s,l){return s.replace(/{(\d+)}/g,function(m,n){return typeof l[n]!='undefined'?l[n]:m;});};
  function trim(c){return c.replace(/^\s+/,'').replace(/\s+$/,'');}
  function time(m){return((m)?(new Date().getTime()/1000):(Math.round(new Date().getTime()/1000)));}
  function styleInner(o,s){if (o.styleSheet){o.styleSheet.cssText=s;}else{o.appendChild(document.createTextNode(s));}}
  function serializePrimitive(o){switch(true){case(o instanceof Array):var r='[';for(var i=0;i<o.length;i++)r+=serializePrimitive(o[i])+',';return r+']';break;case(o instanceof Object):var r='{';for(var i in o)r+='"'+i+'":'+serializePrimitive(o[i])+',';return r+'}';break;case(typeof o=='string'):return '"'+o+'"';break;case(typeof o=='number'):return o;break;case(typeof o=='boolean'):return o;break;}return 'null';}
  //function addClass(o,_c){var c=_c.replace(/^\s+/,'').replace(/\s+$/,'');if (/\s/.test(c))return false;var t,e=o.getAttribute("class").split(/\s+/),a=[];while(e.length){t=e.shift();if(t!==c)a.push(t);}a.push(c);return o.setAttribute("class",a.join(" "));}
  //function removeClass(o,_c){var c=_c.replace(/^\s+/,'').replace(/\s+$/,'');if (/\s/.test(c))return false;var t,e=o.getAttribute("class").split(/\s+/),a=[];while(e.length){t=e.shift();if(t!==c)a.push(t);}return o.setAttribute("class",a.join(" "));}
  function dupScriptCheck(i){if (document.getElementById(i)){return false;}var l=document.createElement("div");l.id=i;BODY.appendChild(l);return true;}
  function isObject(v){return typeof v=="object";}
  function isArray(v){return v instanceof Array;}
  function isDate(v){return Object.prototype.toString.call(v)==='[object Date]';}
  function cloneVar(v){if(v.cloneNode)return v.cloneNode(true);if(isObject(v)){var c=v instanceof Array?[]:{};for(var a in v)c[a]=cloneVar(v[a]);return c;}if(isDate(v)){var c=new Date();c.setTime(v.getTime());return c;}return v;}
  function setOpacity(o,v){o.style.opacity=v/100;o.style.filter='alpha(opacity='+parseInt(v)+')';}
  //function inArray(n,a){if(a instanceof Array==false)return false;for(var i=0;i<a.length;i++)if(a[i]==n)return true;return false;}
  //function containsClass(o,_c){var c=_c1.replace(/^\s+/,'').replace(/\s+$/,'');if (/\s/.test(c))return false;var e=o.getAttribute("class").split(/\s+/),a=[];while(e.length){if(e.shift()===c)return true;}return false;}
  //function replaceClass(o,_c1,_c2){var c1=_c1.replace(/^\s+/,'').replace(/\s+$/,'');var c2=_c2.replace(/^\s+/,'').replace(/\s+$/,'');if (/\s/.test(c1))return false;if (/\s/.test(c2))return false;var e=o.getAttribute("class").split(/\s+/),a=[];while(e.length){if(e.shift()===c1)a.push(c2);}return o.setAttribute("class",a.join(" "));}
  function appendScript(z,i){var s=document.createElement("script");s.type="text/javascript";s.innerHTML=z;if(typeof i=="string")s.id=i;if(i===true)addEvent(s,"load",function(e){removeNode(s);});BODY.appendChild(s);return s;}

  // normal ikariam functions
  function isInGame(){if(document.getElementById("js_GlobalMenu_ambrosia"))return true;return false;}
  function isBackupSite(){if(document.getElementById("backupLockTimer"))return true;return false;}
  function isMobileVersion(){return(window.location.host.indexOf("m")==0);}
  function getIkaVersion(){var t=document.getElementsByTagName('span');for(var i=0;i<t.length;i++)if(t[i].parentNode&&t[i].parentNode.href&&t[i].parentNode.href.indexOf("?view=version")!=-1)return t[i].innerHTML;return null;}
  function checkIkaVersion(v){var t=getIkaVersion();if(v instanceof Array)for(var i=0;i<v.length;i++)if(t[i]==v)return true;return(v==t)}
  //function isOwnTownView(){var x=document.getElementById('js_CityPosition0Link');if(!x)return false;return(x.href!='javascript:void(0);');}
  function getIkaLang(){var m=/\w\d{1,2}\.(\w{2})\.ikariam\.com/.exec(window.location.host);if(m && m[1])return m[1];}
  function getIkaServer(){var m=/(\w\d{1,2})\.\w{2}\.ikariam\.com/.exec(window.location.host);return(m&&m[1])?m[1]:null;}
  function isTownView(){if(document.getElementById("position0"))return true;return false;}
  function getCurrentOwnTownId(){var l=document.getElementById("js_CityPosition0Link");if(!l)return null;var m=/cityId=(\d+)/.exec(l.href);if(m && m[1])return parseInt(m[1]);return null;}
  function getWorldmapScale(){return parseFloat(/scale\((\d+(\.\d+)?)\)/.exec(document.getElementById("worldmap").getAttribute("style"))[1]);}

  // secret ikariam functions
  function getJsonData(v){var re=new RegExp(v+"\\s{0,}\\:\\s{0,}JSON\\.parse\\(\\'(.*?)\\'\\)\\,");var o,m;o=document.getElementsByTagName('script');for(var i=0;i<o.length;i++){m=re.exec(o[i].innerHTML);if(m&&m[1])return eval('('+eval('("'+m[1]+'")')+')');}return null;}
  //function switchToCity(i){var b=document.createElement("input");b.style.visibility="hidden";b.type="submit";document.getElementById("changeCityForm").appendChild(b);document.getElementById("js_cityIdOnChange").value=i;b.click();b.parentNode.removeChild(b);}
  //function openDestinationCityId(w,c){appendScript("ajaxHandlerCall('http://s20.de.ikariam.com/index.php?view="+w+"&destinationCityId="+parseInt(c)+"');",true);}
  //function openTransportTo(t){openDestinationCityId("transport",t);}
  //function openDefendCity(t){openDestinationCityId("defendCity",t);}
  //function openDefendPort(t){openDestinationCityId("defendPort",t);}
  //function openBlockadePort(t){openDestinationCityId("blockade",t);}
  //function openPlunderCity(t){openDestinationCityId("plunder",t);}
  //function openOccupyCity(t){openDestinationCityId("occupy",t);}
  //function openSendSpy(t){openDestinationCityId("sendSpy",t);}

  // Extended
  var MEMORY=function(so,lo,sall){var c1=(typeof GM_setValue=="function"&&typeof GM_getValue=="function");if(c1){var t=time();GM_setValue(t,t);if(t!=GM_getValue(t))c1=false;else GM_deleteValue(t);}var c2=(typeof localStorage!="undefined");if(c2){var t=time();localStorage.setItem(t,t);if(t!=localStorage.getItem(t))c1=false;else localStorage.removeItem(t);}var c3=true;this.canUseGM=function(){return c1;};this.canUseLocal=function(){return c2;};this.canUseCookie=function(){return c3;};
    this.drop=function(k){var d=true;for(var i=0;i<so.length;i++){if("gm"==so[i].toLowerCase()){if(!c1)continue;try{GM_deleteValue(k);if(GM_getValue(k)!=null)d=false;}catch(e){}}if("local"==so[i].toLowerCase()){if(!c2)continue;try{localStorage.removeItem(k);if(typeof localStorage.getItem(k)!="undefined")d=false;}catch(e){}}if("cookie"==so[i].toLowerCase()){if(!c3)continue;try{deleteCookie(k);if(getCookie(k)!=null)d=false;}catch(e){}}}return d;};
    this.save=function(k,v){var s=false;for(var i=0;i<so.length;i++){if("gm"==so[i].toLowerCase()){if(!c1)continue;try{GM_setValue(k,v);if(GM_getValue(k)!=v)continue;s=true;if(!sall)break;}catch(e){}}if("local"==so[i].toLowerCase()){if(!c2)continue;try{localStorage.setItem(k,v);if(localStorage.getItem(k)!=v)continue;s=true;if(!sall)break;}catch(e){}}if("cookie"==so[i].toLowerCase()){if(!c3)continue;try{setCookie(k,v,(30*24*60*60));if(getCookie(k)!=v)continue;s=true;if(!sall)break;}catch(e){}}}return s;};
    this.load=function(k){var l=null;for(var i=0;i<lo.length;i++){if("gm"==lo[i].toLowerCase()){if(!c1)continue;try{l=GM_getValue(k,null);if(l!==null)return l;}catch(e){}}if("local"==lo[i].toLowerCase()){if(!c2)continue;try{if(typeof localStorage.getItem(k)!="undefined")return localStorage.getItem(k);}catch(e){}}if("cookie"==lo[i].toLowerCase()){if(!c3)continue;try{l=getCookie(k);if(l!==null)return l;}catch(e){}}}return null;};};
  var LANG=function(c,std1,std2,list){var used={};this.add=function(l){if(!list[l])return false;for(var i in list[l])used[i]=list[l][i];return true;};this.set=function(l){if(!this.add(l))return false;return MEMORY.save(c,l);};this.get=function(s){if(used[s])return used[s];return "!LANG STR '"+s+"' MISSING!";};this.add(std1);if(!this.add(MEMORY.load(c)))this.set(std2);};

// --------------------------------------------------------------------
// Main

  MEMORY = new MEMORY(["gm","local","cookie"],["gm","local","cookie"],false);
  LANG = new LANG("aIkaLANG2", "en", getIkaLang(), {
    en : {
      mobileNotSupported : "Mobile version is not supported yet!",
      ikaVersionNotSupported : "This Ikariam version is not supported!",
      notYourTown : "This is not your town!",
      customizingNotPossible : " Customizing not possible",
      savePositions : "Save Positions",
      defaultPositions : "Default",
      undoPosition : "Undo",
      gridSize : "Adjust-Distance",
      shadowType : "Shadow type",
      shadowType0 : "No shadows",
      shadowType1 : "Buildings",
      shadowType2 : "Borders",
      waterBuildings : "Coast Buildings",
      waterBuildingLeft : "Left",
      waterBuildingRight : "Right",
    },
    lv : {
      mobileNotSupported : "Mobilā versija pagaidām netiek atbalstīta!",
      ikaVersionNotSupported : "Šī Ikariam versija netiek atbalstīta!",
      notYourTown : "Šī nav Jūsu pilsēta!",
      customizingNotPossible : "Izmaiņas nav iespējamas",
      savePositions : "Saglabāt pozīcijas",
      defaultPositions : "Pēc noklusējuma",
      undoPosition : "Atcelt",
      gridSize : "Pielāgot attālumu",
      shadowType : "Ēnas tips",
      shadowType0 : "Bez ēnām",
      shadowType1 : "Ēkas",
      shadowType2 : "Rāmji",
      waterBuildings : "Piekrastes ēkas",
      waterBuildingLeft : "Uz kreiso pusi",
      waterBuildingRight : "Uz labo pusi",
    },
  });

  if (isBackupSite()){return;}
  if (!isInGame()){return;}
  if (isMobileVersion()){return;}
  if (!checkIkaVersion("v 0.5.0")){return;}
  if (!dupScriptCheck(thisTag+"duplicateScriptCheck")){return;}

  if (!isTownView()){return;}

  // ------------------------------------------
  // Init Vars

  var relatedCityData = getJsonData('relatedCityData');
  if (!relatedCityData) {
    alert("FatalError: relatedCityData not found");
    return;
  }

  var originalPositions = {};
  for (var i=0; i<=16; i++) {
    var posObj = document.getElementById("position"+i);
    if (!posObj) {
      alert("Error: 2 - "+i);
      return
    }
    originalPositions[i+""] = [posObj.offsetLeft, posObj.offsetTop];
    posObj.style.left = posObj.offsetLeft+"px";
    posObj.style.top = posObj.offsetTop+"px";
    delete posObj;
  }

  var isCustomizing = false;
  var customizingPositions = {};
  var undoQueue = {};
  for (var i in relatedCityData)
    if (relatedCityData[i].relationship && relatedCityData[i].relationship == 'ownCity')
      undoQueue[i] = [];
  var shadowImages = [];
  var curCityId = null;

  // Init Vars
  // ------------------------------------------
  // Configs Via memory

  // aIkaCT_t = aIka_CustomTowns_timeout
  var CFG_timeout = 333;
  var CFG_timeoutMin = 100;

  // aIkaCT_p = aIka_CustomTowns_positions
  var CFG_positions = {};
  for (var i in relatedCityData)
    if (relatedCityData[i].relationship && relatedCityData[i].relationship == 'ownCity')
      CFG_positions[i] = originalPositions;

  // aIkaCT_a = aIka_CustomTowns_gridSize
  var CFG_gridSize = 20;
  var CFG_gridSizeMax = 50;

  // aIkaCT_s = aIka_CustomTowns_shadowType
  var CFG_shadowType = 2;

  // aIkaCT_w = aIka_CustomTowns_waterBuildingImages
  var CFG_waterBuildingImages = {};
  for (var i in relatedCityData)
    if (relatedCityData[i].relationship && relatedCityData[i].relationship == 'ownCity')
      CFG_waterBuildingImages[i] = {"1":"1","2":"2",};

  // aIkaCT_y = aIka_CustomTowns_tutorial
  var CFG_tutorial = 0;
  var CFG_tutorialMax = 1;

  // aIkaCT_u = aIka_CustomTowns_lastUpdateCheck
  var CFG_updateLastCheck = 0;
  var CFG_updateCheckTimeout = 12*60*60; // 12 hours

  // ---

  function saveCFG_updateLastCheck() {
    MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_u", CFG_updateLastCheck);
  }
  function loadCFG_updateLastCheck() {
    var c = MEMORY.load("aIkaCT_u");
    if (c != null) MEMORY.drop("aIkaCT_u");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_t");
    if (c != null) {
      c = parseInt(c);
      if (c != "NaN") CFG_updateLastCheck = c;
    }
    return true;
  }


  // ---

  function saveCFG_timeout() {
    MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_t", CFG_timeout);
  }
  function loadCFG_timeout() {
    var c = MEMORY.load("aIka_CustomTowns_timeout");
    if (c != null) MEMORY.drop("aIka_CustomTowns_timeout");
    else c = MEMORY.load("aIkaCT_t");
    if (c != null) MEMORY.drop("aIkaCT_t");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_t");
    if (c != null) {
      c = parseInt(c);
      if (c != "NaN" && c >= CFG_timeoutMin) CFG_timeout = c;
    }
    return true;
  }

  // ---

  function saveCFG_positions() {
    var _CFG_positions = {};
    for (var i in CFG_positions)
      for (var j in CFG_positions[i])
        if (originalPositions[j])
          if (originalPositions[j][0] != CFG_positions[i][j][0] || originalPositions[j][1] != CFG_positions[i][j][1]) {
            if (!_CFG_positions[i]) _CFG_positions[i] = {};
            _CFG_positions[i][j] = CFG_positions[i][j];
          }
    return MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_p", serializePrimitive(_CFG_positions));
  }
  function loadCFG_positions() {
    var c = MEMORY.load("aIka_CustomTowns_positions");
    if (c != null) MEMORY.drop("aIka_CustomTowns_positions");
    else c = MEMORY.load("aIkaCT_p");
    if (c != null) MEMORY.drop("aIkaCT_p");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_p");
    if (c != null) {
      try {
        c = eval('('+c+')');
      } catch(e) {
        c={};
      }
      CFG_positions = {};
      for (var i in relatedCityData)
        if (relatedCityData[i].relationship && relatedCityData[i].relationship == 'ownCity') {
          CFG_positions[i] = {};
          if (c[i])
            for (var j in originalPositions)
              if (c[i][j])
                CFG_positions[i][j] = c[i][j];
              else
                CFG_positions[i][j] = originalPositions[j];
          else
            CFG_positions[i] = originalPositions;
        }
    }
    return true;
  }

  // ---

  function saveCFG_gridSize() {
    return MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_a", CFG_gridSize);
  }
  function loadCFG_gridSize() {
    var c = MEMORY.load("aIka_CustomTowns_gridSize");
    if (c != null) MEMORY.drop("aIka_CustomTowns_gridSize");
    else c = MEMORY.load("aIkaCT_a");
    if (c != null) MEMORY.drop("aIkaCT_a");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_a");
    if (c != null) {
      c = parseInt(c);
      if (c != "NaN" && c >= 0 && c <= CFG_gridSizeMax) CFG_gridSize = parseInt(c / 10) * 10;
    }
    return true;
  }

  // ---

  function saveCFG_shadowType() {
    return MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_s", CFG_shadowType);
  }
  function loadCFG_shadowType() {
    var c = MEMORY.load("aIka_CustomTowns_shadowType");
    if (c != null) MEMORY.drop("aIka_CustomTowns_shadowType");
    else c = MEMORY.load("aIkaCT_s");
    if (c != null) MEMORY.drop("aIkaCT_s");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_s");
    if (c != null) {
      c = parseInt(c);
      if (c != "NaN" && c >= 0 && c <= 2) CFG_shadowType = c;
    }
    return true;
  }

  // ---

  function saveCFG_waterBuildingImages() {
    var _CFG_waterBuildingImages = {};
    for (var i in CFG_waterBuildingImages) {
      if (CFG_waterBuildingImages[i]["1"] == "2") {
        if (!_CFG_waterBuildingImages[i]) _CFG_waterBuildingImages[i] = {};
        _CFG_waterBuildingImages[i]["1"] = "2";
      }
      if (CFG_waterBuildingImages[i]["2"] == "1") {
        if (!_CFG_waterBuildingImages[i]) _CFG_waterBuildingImages[i] = {};
        _CFG_waterBuildingImages[i]["2"] = "1";
      }
    }
    return MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_w", serializePrimitive(_CFG_waterBuildingImages));
  }
  function loadCFG_waterBuildingImages() {
    var c = MEMORY.load("aIka_CustomTowns_waterBuildingImages");
    if (c != null) MEMORY.drop("aIka_CustomTowns_waterBuildingImages");
    else c = MEMORY.load("aIkaCT_w");
    if (c != null) MEMORY.drop("aIkaCT_w");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_w");
    if (c != null) {
      try {
        c = eval('('+c+')');
      } catch(e) {
        c={};
      }
      CFG_waterBuildingImages = {};
      for (var i in c)
        if (relatedCityData[i] && relatedCityData[i].relationship == 'ownCity')
          CFG_waterBuildingImages[i] = c[i];
      for (var i in relatedCityData)
        if (relatedCityData[i].relationship && relatedCityData[i].relationship == 'ownCity' && !CFG_waterBuildingImages[i])
          CFG_waterBuildingImages[i] = {};
    }
    return true;
  }

  // ---

  function saveCFG_tutorial() {
    MEMORY.save(getIkaServer()+getIkaLang()+"_aIkaCT_y", CFG_tutorial);
  }
  function loadCFG_tutorial() {
    var c = MEMORY.load("aIka_CustomTowns_tutorial");
    if (c != null) MEMORY.drop("aIka_CustomTowns_tutorial");
    else c = MEMORY.load("aIkaCT_y");
    if (c != null) MEMORY.drop("aIkaCT_y");
    else c = MEMORY.load(getIkaServer()+getIkaLang()+"_aIkaCT_y");
    if (c != null) {
      c = parseInt(c);
      if (c != "NaN" && c >= 0 && c <= CFG_tutorialMax) CFG_tutorial = c;
    }
    return true;
  }

  // ---

  loadCFG_timeout();
  loadCFG_positions();
  loadCFG_gridSize();
  loadCFG_shadowType();
  loadCFG_waterBuildingImages();
  loadCFG_tutorial();
  loadCFG_updateLastCheck();

  saveCFG_timeout();
  saveCFG_positions();
  saveCFG_gridSize();
  saveCFG_shadowType();
  saveCFG_waterBuildingImages();
  saveCFG_tutorial();
  saveCFG_updateLastCheck();

  // Configs Via memory
  // ------------------------------------------
  // Init Styles

  var IkaCSS = {
    buildings : {},
    getRect : function(name, lvl, hover, busy) {return IkaCSS.buildings[name].rect["000"];},
    getImg : function(name, lvl, hover, busy) {return IkaCSS.buildings[name].img["0"+(hover?"1":"0")+(busy?"1":"0")];},
    getDeclRect : function(name, lvl, hover, busy) {return IkaCSS.buildings[name].declRect["000"];},
    getDeclImg : function(name, lvl, hover, busy) {return IkaCSS.buildings[name].declImg["0"+(hover?"1":"0")+(busy?"1":"0")];},
  };

  IkaCSS.buildings["port1"] = {
    rect : {"000" : "left:-45px;top:-48px;width:209px;height:148px;",},
    img : {"000" : "background-image:url(skin/img/city/port_r.png);","010" : "background-image:url(http://gf1.geo.gfsrv.net/cdn00/1e6f6c206e6bf006790b2062fba85d.png);","001" : "background-image:url(skin/img/city/port_r_mit_schiff.png);","011" : "background-image:url(http://gf1.geo.gfsrv.net/cdn69/190095b6f4a41734c6057572c56114.png);",},
    declRect : {"000" : "#city #locations #position1.port .img_pos ",},
    declImg : {"000" : "#city #locations #position1.port .buildingimg ","010" : "#city #locations #position1.port .hover ","001" : "#city #locations #position1.port.busy .buildingimg ","011" : "#city #locations #position1.port.busy .hover, #city .animated #locations #position1.port.busy .hover ",},
  };

  IkaCSS.buildings["port2"] = {
    rect : {"000" : "left:-57px;top:-43px;width:209px;height:148px;",},
    img : {"000" : "background-image:url(skin/img/city/port_l.png);","010" : "background-image:url(http://gf2.geo.gfsrv.net/cdn48/5f95f6e13b94a5fedae8aca896d3d1.png);","001" : "background-image:url(skin/img/city/port_l_mit_schiff.png);","011" : "background-image:url(http://gf3.geo.gfsrv.net/cdn8a/00870b7734b675defbd7113b7f9d63.png);",},
    declRect : {"000" : "#city #locations #position2.port .img_pos ",},
    declImg : {"000" : "#city #locations #position2.port .buildingimg ","010" : "#city #locations #position2.port .hover ","001" : "#city #locations #position2.port.busy .buildingimg ","011" : "#city #locations #position2.port.busy .hover, #city .animated #locations #position2.port.busy .hover ",},
  };

  IkaCSS.buildings["shipyard1"] = {
    rect : {"000" : "left:-70px;top:-64px;width:191px;height:126px;",},
    img : {"000" : "background-image:url(skin/img/city/shipyard_r.png);","010" : "background-image:url(http://gf1.geo.gfsrv.net/cdn3f/9f9aabfcb932d03424c287a9743315.png);",},
    declRect : {"000" : "#city #locations #position1.shipyard .img_pos ",},
    declImg : {"000" : "#city #locations #position1.shipyard .buildingimg ","010" : "#city #locations #position1.shipyard .hover ",},
  };

  IkaCSS.buildings["shipyard2"] = {
    rect : {"000" : "left:-70px;top:-64px;width:191px;height:126px;",},
    img : {"000" : "background-image:url(skin/img/city/shipyard_l.png);","010" : "background-image:url(http://gf2.geo.gfsrv.net/cdn44/c2e872f477f8bb8e49eaab4e154012.png);",},
    declRect : {"000" : "#city #locations #position2.shipyard .img_pos ",},
    declImg : {"000" : "#city #locations #position2.shipyard .buildingimg ","010" : "#city #locations #position2.shipyard .hover ",},
  };

  // shadows
  var tmpStyle = document.createElement("style");
  tmpStyle.setAttribute("type", "text/css");
  var tmpInner = "";
  tmpInner += "#city #locations .port1 .img_pos {"+IkaCSS.getRect("port1",0,false,false)+"}";
  tmpInner += "#city #locations .port1 .buildingimg {"+IkaCSS.getImg("port1",0,false,false)+"}";
  tmpInner += "#city #locations .port1 .hover {"+IkaCSS.getImg("port1",0,true,false)+"}";
  tmpInner += "#city #locations .port1.busy .buildingimg {"+IkaCSS.getImg("port1",0,false,true)+"}";
  tmpInner += "#city #locations .port1.busy .hover {"+IkaCSS.getImg("port1",0,true,true)+"}";
  tmpInner += "#city #locations .shipyard1 .img_pos {"+IkaCSS.getRect("shipyard1",0,false,false)+"}";
  tmpInner += "#city #locations .shipyard1 .buildingimg {"+IkaCSS.getImg("shipyard1",0,false,false)+"}";
  tmpInner += "#city #locations .shipyard1 .hover {"+IkaCSS.getImg("shipyard1",0,true,false)+"}";
  tmpInner += "#city #locations .port2 .img_pos {"+IkaCSS.getRect("port2",0,false,false)+"}";
  tmpInner += "#city #locations .port2 .buildingimg {"+IkaCSS.getImg("port2",0,false,false)+"}";
  tmpInner += "#city #locations .port2 .hover {"+IkaCSS.getImg("port2",0,true,false)+"}";
  tmpInner += "#city #locations .port2.busy .buildingimg {"+IkaCSS.getImg("port2",0,false,true)+"}";
  tmpInner += "#city #locations .port2.busy .hover {"+IkaCSS.getImg("port2",0,true,true)+"}";
  tmpInner += "#city #locations .shipyard2 .img_pos {"+IkaCSS.getRect("shipyard2",0,false,false)+"}";
  tmpInner += "#city #locations .shipyard2 .buildingimg {"+IkaCSS.getImg("shipyard2",0,false,false)+"}";
  tmpInner += "#city #locations .shipyard2 .hover {"+IkaCSS.getImg("shipyard2",0,true,false)+"}";
  styleInner(tmpStyle, tmpInner);
  HEAD.appendChild(tmpStyle);
  delete tmpInner;
  delete tmpStyle;

  // water buildings
  function unsetWaterPositionCustomStyle(pos) {
    removeNode(document.getElementById(thisTag+"position"+pos+"CustomStyle"));
  }
  function setWaterPositionCustomStyle(pos,to) {
    unsetWaterPositionCustomStyle(pos);
    if (to==pos || (pos!=1&&pos!=2) || (to!=1&&to!=2)) return;
    var t = "";
    t += IkaCSS.getDeclRect("port"+pos,0,false,false)+"{"+IkaCSS.getRect("port"+to,0,false,false)+"}";
    t += IkaCSS.getDeclImg("port"+pos,0,false,false)+"{"+IkaCSS.getImg("port"+to,0,false,false)+"}";
    t += IkaCSS.getDeclImg("port"+pos,0,true,false)+"{"+IkaCSS.getImg("port"+to,0,true,false)+"}";
    t += IkaCSS.getDeclImg("port"+pos,0,false,true)+"{"+IkaCSS.getImg("port"+to,0,false,true)+"}";
    t += IkaCSS.getDeclImg("port"+pos,0,true,true)+"{"+IkaCSS.getImg("port"+to,0,true,true)+"}";
    t += IkaCSS.getDeclRect("shipyard"+pos,0,false,false)+"{"+IkaCSS.getRect("shipyard"+to,0,false,false)+"}";
    t += IkaCSS.getDeclImg("shipyard"+pos,0,false,false)+"{"+IkaCSS.getImg("shipyard"+to,0,false,false)+"}";
    t += IkaCSS.getDeclImg("shipyard"+pos,0,true,false)+"{"+IkaCSS.getImg("shipyard"+to,0,true,false)+"}";
    var s = document.createElement("style");
    s.setAttribute("type", "text/css");
    s.id = thisTag+"position"+pos+"CustomStyle";
    styleInner(s, t);
    HEAD.appendChild(s);
    delete t;
    delete s;
  }

  // Init Styles
  // ------------------------------------------
  // Refresh Functions

  function setWaterBuildingImagesToCostomized() {
    if (!curCityId) return;
    var townKey = "city_"+curCityId;
    if (!CFG_waterBuildingImages[townKey]) CFG_waterBuildingImages[townKey] = {};
    if (!CFG_waterBuildingImages[townKey]["1"]) CFG_waterBuildingImages[townKey]["1"] = "1";
    if (!CFG_waterBuildingImages[townKey]["2"]) CFG_waterBuildingImages[townKey]["2"] = "2";
    if (isCustomizing) {
      var l = document.getElementById(thisTag+"editMenu_waterBuildingLeft");
      l.disabled = false;
      if (l.length > 0) {l.options[0] = null;l.options[0] = null;}
      l.options[l.length] = new Option(LANG.get("waterBuildingLeft"), "1");
      l.options[l.length] = new Option(LANG.get("waterBuildingRight"), "2");
      l.value = CFG_waterBuildingImages[townKey]["1"];
      var r = document.getElementById(thisTag+"editMenu_waterBuildingRight");
      r.disabled = false;
      if (r.length > 0) {r.options[0]=null;r.options[0]=null;}
      r.options[r.length] = new Option(LANG.get("waterBuildingLeft"), "1");
      r.options[r.length] = new Option(LANG.get("waterBuildingRight"), "2");
      r.value = CFG_waterBuildingImages[townKey]["2"];
    }
    setWaterPositionCustomStyle("1", CFG_waterBuildingImages[townKey]["1"]);
    setWaterPositionCustomStyle("2", CFG_waterBuildingImages[townKey]["2"]);
  }
  function setWaterBuildingImagesToOriginal() {
    unsetWaterPositionCustomStyle("1");
    unsetWaterPositionCustomStyle("2");
    if (isCustomizing) {
      var l = document.getElementById(thisTag+"editMenu_waterBuildingLeft");
      l.disabled = true;
      if (l.length > 0) {l.options[0] = null;l.options[0] = null;}
      var r = document.getElementById(thisTag+"editMenu_waterBuildingRight");
      r.disabled = true;
      if (r.length > 0) {r.options[0] = null;r.options[0] = null;}
    }
  }

  function refreshBuildingsZ() {
    var queue = [];
    for (var posI in originalPositions) {
      var o = document.getElementById("position"+posI);
      if (!o) continue;
      var t = parseInt(o.style.top);
      queue.push([t,o]);
    }
    var z = 300;
    while (queue.length > 0) {
      var lowest_top = 999999999;
      var lowest_obj = null;
      var lowest_i = 0;
      for (var i=0; i<queue.length; i++) {
        if (queue[i][0]>=lowest_top) continue;
        lowest_top = queue[i][0];
        lowest_obj = queue[i][1];
        lowest_i = i;
      }
      z++;
      lowest_obj.style.zIndex = z;
      queue.splice(lowest_i,1); 
    }
  }
  function enableMoveEvents() {
    for (var i in originalPositions)
      addEvent(document.getElementById("js_CityPosition"+i+"Link"), "mousedown", moveObjectStart);
  }
  function disableMoveEvents() {
    for (var i in originalPositions)
      removeEvent(document.getElementById("js_CityPosition"+i+"Link"), "mousedown", moveObjectStart);
  }
  function setAllToCostomized() {
    if (!curCityId) return;
    var townKey = "city_"+curCityId;
    if (!CFG_positions[townKey]) return false;
    for (var posI in originalPositions) {
      if (!CFG_positions[townKey][posI]) continue;
      var o = document.getElementById("position"+posI);
      if (!o) continue;
      o.style.left = CFG_positions[townKey][posI][0]+"px";
      o.style.top = CFG_positions[townKey][posI][1]+"px";
    }
    refreshBuildingsZ();
    setWaterBuildingImagesToCostomized();
  }
  function setAllToCostomizing() {
    if (!curCityId) return;
    var townKey = "city_"+curCityId;
    if (!customizingPositions[townKey]) return false;
    for (var posI in originalPositions) {
      if (!customizingPositions[townKey][posI]) continue;
      var o = document.getElementById("position"+posI);
      if (!o) continue;
      o.style.left = customizingPositions[townKey][posI][0]+"px";
      o.style.top = customizingPositions[townKey][posI][1]+"px";
    }
    refreshBuildingsZ();
    setWaterBuildingImagesToCostomized();
  }
  function setAllToOriginal() {
    for (var posI in originalPositions) {
      if (!originalPositions[posI]) continue;
      var o = document.getElementById("position"+posI);
      if (!o) continue;
      o.style.left = originalPositions[posI][0]+"px";
      o.style.top = originalPositions[posI][1]+"px";
    }
    refreshBuildingsZ();
    setWaterBuildingImagesToOriginal();
  }

  // Refresh Functions
  // ------------------------------------------
  // Refresh Handler

  var refreshed = false;
  var wasCustomizing = false;
  var newCityId = null;
  function refreshPositions() {
    newCityId = getCurrentOwnTownId();
    if (curCityId != newCityId) {
      curCityId = newCityId;
      refreshed = false;
      if (!curCityId && isCustomizing) disableMoveEvents(); // pause keep customizing
      if (curCityId && isCustomizing) enableMoveEvents(); // unpause keep customizing
    }
    if (wasCustomizing != isCustomizing) {
      refreshed = false;
      if (wasCustomizing && !isCustomizing) disableMoveEvents(); // stop customizing when requested
      if (isCustomizing && curCityId) enableMoveEvents(); // start customizing when requested and in own town
      wasCustomizing = isCustomizing;
    }
    if (!refreshed) {
      refreshed = true;
      if (curCityId) {
        if (isCustomizing) {
          setAllToCostomizing();
          if (document.getElementById(thisTag+"editMenu_notYourTown"))
            document.getElementById(thisTag+"editMenu_notYourTown").style.display = "none";
        } else {
          setAllToCostomized();
        }
      } else {
        if (isCustomizing) {
          if (document.getElementById(thisTag+"editMenu_notYourTown"))
            document.getElementById(thisTag+"editMenu_notYourTown").style.display = "block";
        }
        setAllToOriginal();
      }
    }
    window.setTimeout(refreshPositions, CFG_timeout);
  }
  refreshPositions();

  // Refresh Handler
  // ------------------------------------------
  // Menu Button

  var btn1 = document.createElement("span");
  var btn2 = document.createElement("a");
  btn2.href = "javascript:void(0);";
  btn2.innerHTML = "Rediģēt";
  btn2.setAttribute("class", "yellow");
  btn1.appendChild(document.createTextNode("["));
  btn1.appendChild(btn2);
  btn1.appendChild(document.createTextNode("]"));
  btn1.setAttribute("class", "yellow");
  btn1.id = thisTag+"editBtn";
  document.getElementById("breadcrumbs").insertBefore(btn1, document.getElementById("js_cityWarningBox"));
  addEvent(btn2, "click", function(){

    if (!document.getElementById(thisTag+"editMenu")) {

      if (document.getElementById(thisTag+"tutorialWindow")) removeNode(document.getElementById(thisTag+"tutorialWindow"));

      var editMenu = document.createElement("div");
      editMenu.id = thisTag+"editMenu";

      var html = '';
      html += '<div style="z-index:60;right:auto;left:70px;top:170px;opacity:1;-moz-box-shadow:0px 0px 4px #000;-webkit-box-shadow:0px 0px 4px black;box-shadow:0px 0px 4px black;margin:8px 0 0 -8px;position:absolute;">';
      html += '  <ul style="width:228px;background:url(skin/layout/bg_sidebox_footer.png) no-repeat scroll left bottom transparent;padding-bottom:5px;">';
      html += '    <li style="display:inline;">';
      html += '      <div style="text-align:center;z-index:3000;display:block;font-weight:700;text-decoration:none;height:24px;padding-top:2px;line-height:24px;background:url(skin/layout/bg_sidebox_header.jpg) no-repeat;position:relative;">';
      html += '        <button id="'+thisTag+'editMenu_closeBtn" style="padding:0px;margin:2px 4px 0px 0px;float:right;font-weight:bold;font-size:12px;width:25px;height:21px;">X</button>';
      html += '        aIka :: '+thisName+' v'+thisVersion;
      html += '      </div>';
      html += '      <div style="clear:both;overflow:hidden;margin:0;padding:10px 4px;background:url(skin/layout/bg_sidebox.png) repeat-y;">';
      html += '        <p id="'+thisTag+'editMenu_notYourTown" style="display:none;font-weight:bold;color:#cc0000;font-size:11px;padding:4px;text-align:left;margin:0 7px;">'+LANG.get("notYourTown")+LANG.get("customizingNotPossible")+'</p>';

      html += '        <div style="margin:5px 10px;padding:5px;border:1px solid #E4B873;background:#FFE4B7;">';
      html += '         <div>';
      html += '          <select style="width:50px;" id="'+thisTag+'editMenu_gridSize" value="'+CFG_gridSize+'">';
      html += '           <option value="0"'+((CFG_gridSize==0)?(' selected="selected"'):(''))+'>0</option>';
      html += '           <option value="10"'+((CFG_gridSize==10)?(' selected="selected"'):(''))+'>10</option>';
      html += '           <option value="20"'+((CFG_gridSize==20)?(' selected="selected"'):(''))+'>20</option>';
      html += '           <option value="30"'+((CFG_gridSize==30)?(' selected="selected"'):(''))+'>30</option>';
      html += '           <option value="40"'+((CFG_gridSize==40)?(' selected="selected"'):(''))+'>40</option>';
      html += '           <option value="50"'+((CFG_gridSize==50)?(' selected="selected"'):(''))+'>50</option>';
      html += '          </select> '+LANG.get("gridSize");
      html += '         </div>';
      html += '         <div>';
      html += '          <select style="width:100px;" id="'+thisTag+'editMenu_shadowType" value="'+CFG_shadowType+'">';
      html += '           <option value="0"'+((CFG_shadowType==0)?(' selected="selected"'):(''))+'>'+LANG.get("shadowType0")+'</option>';
      html += '           <option value="1"'+((CFG_shadowType==1)?(' selected="selected"'):(''))+'>'+LANG.get("shadowType1")+'</option>';
      html += '           <option value="2"'+((CFG_shadowType==2)?(' selected="selected"'):(''))+'>'+LANG.get("shadowType2")+'</option>';
      html += '          </select> '+LANG.get("shadowType");
      html += '         </div>';
      html += '        </div>';

      html += '        <div class="centerButton" style="margin-top:15px;">';
      html += '          <a id="'+thisTag+'editMenu_toDefaultBtn" href="javascript:void(0);" class="button">'+LANG.get("defaultPositions")+'</a>';
      html += '          <a id="'+thisTag+'editMenu_undoBtn" href="javascript:void(0);" class="button">'+LANG.get("undoPosition")+'</a>';
      html += '        </div>';
      html += '        <div class="centerButton" style="margin-top:15px;">';
      html += '          <a id="'+thisTag+'editMenu_savePositionsBtn" href="javascript:void(0);" class="button">'+LANG.get("savePositions")+'</a>';
      html += '        </div>';

      html += '        <div style="margin:5px 10px;padding:5px;border:1px solid #E4B873;background:#FFE4B7;">';
      html += '         <div>'+LANG.get("waterBuildings")+"</div>";
      html += '         <div>';
      html += '          <select style="width:100px;" id="'+thisTag+'editMenu_waterBuildingLeft">';
      html += '          </select> '+LANG.get("waterBuildingLeft");
      html += '         </div>';
      html += '         <div>';
      html += '          <select style="width:100px;" id="'+thisTag+'editMenu_waterBuildingRight">';
      html += '          </select> '+LANG.get("waterBuildingRight");
      html += '         </div>';
      html += '        </div>';

      html += '      </div>';
      html += '    </li>';
      html += '  </ul>';
      html += '</div>';
      editMenu.innerHTML = html;
      document.getElementById("container").appendChild(editMenu);

      customizingPositions = cloneVar(CFG_positions);
      isCustomizing = true;

      addEvent(document.getElementById(thisTag+"editMenu_waterBuildingLeft"), "change", function(){
        if (!curCityId) return false;
        var townKey = "city_"+curCityId;
        if (!CFG_waterBuildingImages[townKey]) return false;
        var v = document.getElementById(thisTag+"editMenu_waterBuildingLeft").value;
        if (v == "1" || v == "2") {
          CFG_waterBuildingImages[townKey]["1"] = v;
          saveCFG_waterBuildingImages();
          setWaterPositionCustomStyle("1", CFG_waterBuildingImages[townKey]["1"]);
        }
        document.getElementById(thisTag+"editMenu_waterBuildingLeft").value = CFG_waterBuildingImages[townKey]["1"];
        return false;
      });
      addEvent(document.getElementById(thisTag+"editMenu_waterBuildingRight"), "change", function(){
        if (!curCityId) return false;
        var townKey = "city_"+curCityId;
        if (!CFG_waterBuildingImages[townKey]) return false;
        var v = document.getElementById(thisTag+"editMenu_waterBuildingRight").value;
        if (v == "1" || v == "2") {
          CFG_waterBuildingImages[townKey]["2"] = v;
          saveCFG_waterBuildingImages();
          setWaterPositionCustomStyle("2", CFG_waterBuildingImages[townKey]["2"]);
        }
        document.getElementById(thisTag+"editMenu_waterBuildingRight").value = CFG_waterBuildingImages[townKey]["2"];
        return false;
      });

      addEvent(document.getElementById(thisTag+"editMenu_shadowType"), "change", function(){
        var v = parseInt(document.getElementById(thisTag+"editMenu_shadowType").value);
        if (v != "NaN") {
          if (v >= 0 && v <= 2) {
            CFG_shadowType = v;
            saveCFG_shadowType();
          }
        }
        document.getElementById(thisTag+"editMenu_shadowType").value = CFG_shadowType;
        return false;
      });

      addEvent(document.getElementById(thisTag+"editMenu_gridSize"), "change", function(){
        var v = parseInt(document.getElementById(thisTag+"editMenu_gridSize").value);
        if (v != "NaN") {
          if (v >= 0 && v <= CFG_gridSizeMax) {
            CFG_gridSize = v;
            if (CFG_gridSize % 10 != 0) {
              CFG_gridSize = parseInt(CFG_gridSize / 10) * 10;
            }
            saveCFG_gridSize();
          }
        }
        document.getElementById(thisTag+"editMenu_gridSize").value = CFG_gridSize;
        return false;
      });

      addEvent(document.getElementById(thisTag+"editMenu_savePositionsBtn"), "click", function(){
        removeNode(document.getElementById(thisTag+"editMenu"));
        CFG_positions = cloneVar(customizingPositions);
        saveCFG_positions();
        isCustomizing = false;
      });
      addEvent(document.getElementById(thisTag+"editMenu_closeBtn"), "click", function(){
        removeNode(document.getElementById(thisTag+"editMenu"));
        isCustomizing = false;
      });
      addEvent(document.getElementById(thisTag+"editMenu_toDefaultBtn"), "click", function(){
        if (!curCityId) return;
        var townKey = "city_"+curCityId;
        if (!customizingPositions[townKey]) return;
        undoQueue[townKey].push(cloneVar(customizingPositions[townKey]));
        for (var posI in originalPositions) {
          if (!originalPositions[posI]) continue;
          var o = document.getElementById("position"+posI);
          if (!o) continue;
          o.style.left = originalPositions[posI][0]+"px";
          o.style.top = originalPositions[posI][1]+"px";
          if (!customizingPositions[townKey][posI]) continue;
          customizingPositions[townKey][posI] = [originalPositions[posI][0], originalPositions[posI][1]];
        }
      });
      addEvent(document.getElementById(thisTag+"editMenu_undoBtn"), "click", function(){
        if (!curCityId) return false;
        var townKey = "city_"+curCityId;
        if (!undoQueue[townKey]) return false;
        if (undoQueue[townKey].length == 0) return false;
        if (undoQueue[townKey].pop) {
          var undo = undoQueue[townKey].pop();
        } else {
          undoQueue[townKey].reverse();
          var undo = undoQueue[townKey].shift();
          undoQueue[townKey].reverse();
        }
        if (undo instanceof Array) {
          var o = document.getElementById("position"+undo[0]);
          if (!o) return false;
          o.style.left = undo[1]+"px";
          o.style.top = undo[2]+"px";
          if (!customizingPositions[townKey][undo[0]]) return false;
          customizingPositions[townKey][undo[0]] = [undo[1], undo[2]];
        } else {
          customizingPositions[townKey] = undo;
          setAllToCostomizing();
        }
      });

    }
  });
  delete btn1;
  delete btn2;

  // Menu Button
  // ------------------------------------------
  // Move Handler

  function moveObjectStart(e) {
    if (!curCityId) return false;

    if (!e) var e = window.event;
    if (!e.pageX && e.clientX) e.pageX = e.clientX;
    if (!e.pageY && e.clientY) e.pageY = e.clientY;
    if (!e.target && e.srcElement) e.target = e.srcElement;

    var linkObj = e.target;
    var posObj = e.target.parentNode;
    var objX = parseInt(posObj.style.left);
    var objY = parseInt(posObj.style.top);
    var xStart = e.pageX;
    var yStart = e.pageY;

    var townKey = "city_"+curCityId;
    if (!customizingPositions[townKey]) return false;
    var posI = /position(\d+)/.exec(posObj.id)[1];
    if (!customizingPositions[townKey][posI]) return false;

    linkObj.style.display = "none";
    posObj.style.zIndex = 400;

    if (!undoQueue[townKey]) undoQueue[townKey] = [];

    if (CFG_shadowType != 0) {
      var curPosClass = document.getElementById("position"+posI).getAttribute("class");
      if (posI=="1" || posI=="2") {
        curPosClass = curPosClass.replace(/port /,"port"+CFG_waterBuildingImages[townKey][posI]+" ");
        curPosClass = curPosClass.replace(/shipyard /,"shipyard"+CFG_waterBuildingImages[townKey][posI]+" ");
      }
      for (var i in originalPositions) {
        var obj1 = document.createElement("div");
        obj1.style.position = "absolute";
        obj1.id = thisTag+"shadowImage"+i;
        obj1.setAttribute("class", curPosClass);
        obj1.style.left = originalPositions[i][0] + "px";
        obj1.style.top = originalPositions[i][1] + "px";
        obj1.style.zIndex = 401;
        var obj2 = document.createElement("div");
        if (CFG_shadowType == 1)
          if (curPosClass.indexOf("constructionSite") == -1)
            obj2.setAttribute("class", "buildingimg img_pos shadow"); // shadows normal
          else
            obj2.setAttribute("class", "constructionSite img_pos shadow"); // shadows normal
        if (CFG_shadowType == 2) obj2.setAttribute("class", "hover img_pos shadow"); // hover
        setOpacity(obj2, 70);
        shadowImages.push(obj1.id);
        obj1.appendChild(obj2);
        document.getElementById("locations").appendChild(obj1);
        delete obj2;
        delete obj1;
      }
    }

    var doMove = function(e) {
      if (!e) var e = window.event;
      if (!e.pageX && e.clientX) e.pageX = e.clientX;
      if (!e.pageY && e.clientY) e.pageY = e.clientY;
      var unScale = 1/getWorldmapScale();
      var newX = objX + parseInt((e.pageX - xStart) * unScale);
      var newY = objY + parseInt((e.pageY - yStart) * unScale);
      if (CFG_gridSize > 0) {
        for (var i in originalPositions) {
          if (newX >= (originalPositions[i][0]-CFG_gridSize) && newX <= (originalPositions[i][0]+CFG_gridSize)
           && newY >= (originalPositions[i][1]-CFG_gridSize) && newY <= (originalPositions[i][1]+CFG_gridSize)
          ) {
            newX = originalPositions[i][0];
            newY = originalPositions[i][1];
            break;
          }
        }
      }
      customizingPositions[townKey][posI] = [newX, newY];
      posObj.style.left = newX + "px";
      posObj.style.top = newY + "px";
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      return false;
    };
    var doStop = function(e) {
      if (!e) var e = window.event;
      if (customizingPositions[townKey][posI][0] != objX || customizingPositions[townKey][posI][1] != objY) {
        undoQueue[townKey].push([posI,objX,objY,]);
      }
      while (shadowImages.length > 0) {
        removeNode(document.getElementById(shadowImages.shift()));
      }
      refreshBuildingsZ();
      linkObj.style.display = "block";
      removeEvent(document, "mousemove", doMove);
      removeEvent(document, "mouseup", doStop);
      return true;
    };
    addEvent(document, "mousemove", doMove);
    addEvent(document, "mouseup", doStop);

    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
  }

  // Move Handler
  // ------------------------------------------
  // tut bubble

  if (CFG_tutorial == 0) {

    var bubblePosition = document.createElement("span");
    bubblePosition.style.width = "0px";
    bubblePosition.style.height = "0px";
    bubblePosition.style.overflow = "visible";
    bubblePosition.style.position = "absolute";
    bubblePosition.id = thisTag+"tutorialWindow";
    var bubble = document.createElement("span");
    bubble.style.marginLeft = "-200px";
    bubble.style.marginTop = "20px";
    bubble.style.display = "block";
    bubble.style.width = "200px";
    bubble.style.height = "150px";
    bubble.style.background = "url(skin/interface/bubble.png)";
    bubblePosition.appendChild(bubble);
    var html = "";
    html += "<div style='padding:20px 5px 5px;font-size:12px;line-height: 14px;text-align:justify;'>";
    html += "Lietojat šo skriptu pirmo reizi?<br><br>Šī saite parādīsies, kad būsiet atvēris pilsētas skatu - noklikšķiniet uz tās un atvērsies jauns logs. Tajā Jūs varat mainīt dažādus iestatījumus un pārvietot savas ēkas, kur vien vēlaties!";
    html += "</div>";
    bubble.innerHTML = html;
    delete bubble;
    delete html;
    document.getElementById("breadcrumbs").insertBefore(bubblePosition, document.getElementById("js_cityWarningBox"));

    CFG_tutorial = 1;
    saveCFG_tutorial();
  }




// --------------------------------------------------------------------
return true;}catch(e){alert("FatalError in script "+thisName+"\n"+e);}return false})();