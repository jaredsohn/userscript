// ==UserScript==
// @name           Dragon Slayer - Wave alpha0108
// @namespace      http://qilongjitools.cn
// @description    Bootstrap script for dragon slayer.
// @include        http://d*.duniu.com/*
// @include        http://d*.7l.mop.com/*
// @include        http://x*.7.xiaonei.com/*
// @include        http://d*.qlj.ewtang.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

// ds_stoped_window.location.host // variable for identify the ds is running or not

//meta variables
var ds_Product = '屠龙者';
var ds_CodeName = 'Wave';
var ds_Version = 'alpha 尝鲜测试版0108';
//var basePath = "http://dragonslayer-wave.googlecode.com/svn/trunk/";
var basePath = "http://qilongjitools.cn/dswave0108/";
addEventListener('load', function(event){      
    GM_xmlhttpRequest({
          method: 'GET',
          url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js',
          onload: function(xpr) {
              eval(xpr.responseText);
              // visual style assets
              var getDSIconPath = function(){
                  return '<img src="'+basePath+'ds.gif" border="0" style="margin-left:2px;margin-right:2px;" />';
              }
              //render information bar
              $(document.body).append('<div style="background-color:red;color:white;position:absolute;right:10px;top:20px;">'+ds_Product+' - '+ds_CodeName+' '+ds_Version+'</div>');
              //render statistics bar
              $(document.body).append('<div style="width:0px;height:0px;display:none;left:-10px;top:-10px;"><img src="http://img.tongji.cn.yahoo.com/878977/ystat.gif" /></div>');
              //render message info bar      
              $(document.body).append('<div class="ds_msg" style="background-color:red;color:white;position:absolute;right:10px;top:40px;">状态:脚本停止 - 目前处于配置模式</div>');
              var msg = $('div.ds_msg').get(0);
              var log = function(txt){
                  msg.innerHTML = "状态：" + txt; 
              }
              //render ds news
              $('div.col3 > h2:contains("系统公告")').before('<h2>屠龙者相关</h2><ul class="list1"><li><a href="http://qilongjitools.cn" target="_blank">屠龙者官方网站</a></li><li><a href="http://qilongjitools.cn" target="_blank">屠龙者用户论坛</a></li></ul>')
              //start/stop flag check
              $(document.body).append('<a class="ds_linkSwitch" style="position:absolute;right:10px;top:60px;" href="javascript:{void(0)}">状态:脚本停止 - 目前处于配置模式</a>');
              var linkSwitch = $('a.ds_linkSwitch').get(0);
              if(GM_getValue("ds_stoped_"+window.location.host) != null && GM_getValue("ds_stoped_"+window.location.host) != ""){
                  linkSwitch.innerHTML = "+开启屠龙者(进入配置模式)+";
                  linkSwitch.addEventListener('click',function(){
                      GM_setValue("ds_stoped_"+window.location.host,"");
                      window.location.href = "/mindex";
                  },false);
              }else{
                  linkSwitch.innerHTML = "-关闭屠龙者(进入工作模式)-";
                  linkSwitch.addEventListener('click',function(){
                      GM_setValue("ds_stoped_"+window.location.host,"true");
                      window.location.href = "";
                  },false);
              }


              var CONFIG = {
                  hunt_radius:33,
                  fix_radius:true,
                  attack_wild:true,
                  attack_evilCity:true,
                  attack_wheel:true,
                  auto_gamble:true,
                  auto_resurrect:false,
                  enable_armyRules:false,
                  enable_armyRulesAverage:true,
                  army_rules:[], //{id:"1111",heroName:"亏托斯",armyType:"鬼魂",armyCount:100}
                  enable_autoSellResource:false,
                  resource_sellAmount:50000,
                  enable_mapLog:false,
                  enable_attackDelay:false,
                  enable_huntRules:false,
                  hunt_rules:[], //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
                  enable_multiCity:true,
                  ignore_cityRules:[], //{id:"1111",cityName:"屠龙者主城"}
                  enable_buildingRules:false,
                  building_rules:[], //{id:"1111",cityName:"屠龙者主城",buildingName:"军事指挥所"}
                  attackList:[], //{id:"1111",names:"闹鬼(-231 | 294)",urls:"/a2t?type=2&mapId=2700795"}
                  market_rules : {
                      decisionpercent: 0.3,
                      isautobuy: false,
                      woodbuyprice: "",
                      stonebuyprice: "",
                      irishbuyprice: "",
                      foodbuyprice: "",
                      isautosale: false,
                      woodsaleprice: "",
                      stonesaleprice: "",
                      irishsaleprice: "",
                      foodsaleprice: ""
                  }
              };
              if(GM_getValue("ds_CONFIG_"+window.location.host) != null && GM_getValue("ds_CONFIG_"+window.location.host) != ""){
                  CONFIG = extend(CONFIG,eval(GM_getValue("ds_CONFIG_"+window.location.host)));
              }
              // simulate the GM Variables,but safe for cross domain.
              var GM_safeVariables = {};
              if(GM_getValue("ds_GMSafeVariables_"+window.location.host) != null && GM_getValue("ds_GMSafeVariables_"+window.location.host) != ""){
                  GM_safeVariables = extend(GM_safeVariables,eval(GM_getValue("ds_GMSafeVariables_"+window.location.host)));
              }
              // identify for different page,different state for state machine,for different state ,logic code will load different processing logic code by add <script> tag
              // based on finite state machine , every set for window.location.href is a state transition
              var states = [
                  {
                    name:'mindex', //unique name to find the process handler
                    identity: '/mindex', //page identity
                    text: '首页', // text for human understanding
                    configObj: {} // some configuration varibles
                  },
                  {
                    name:'building', //unique name to find the process handler
                    identity: '/building', //page identity
                    text: '建筑页', // text for human understanding
                    configObj: {} // some configuration varibles
                  },
                  {
                    name:'GameMap',
                    identity: '/GameMap',
                    text: '地图页',
                    configObj: {areaRadius:3}
                  },
                  {
                    name:'GameMapInfo',
                    identity: '/GameMapInfo',
                    text: '地图信息页',
                    configObj: {}
                  },
                  {
                    name:'a2t',
                    identity: '/a2t',
                    text: '出军页',
                    configObj: {} 
                  },
                  {
                    name:'gdpf',
                    identity: '/gdpf',
                    text: '酒馆赌博页面',
                    configObj: {} 
                  },
                  {
                    name:'resourcesell',
                    identity: '/resourcesell',
                    text: '买资源给NPC页面',
                    configObj: {} 
                  },
                  {
                    name:'s2h',
                    identity: '/s2h',
                    text: '英雄分兵页面',
                    configObj: {} 
                  },
                  {
                    name:'messageList',
                    identity: '/messageList',
                    text: '消息页面',
                    configObj: {} 
                  },
                  {
                    name:'market',
                    identity: '/market',
                    text: '资源市场页面',
                    configObj: {} 
                  },
                  {
                    name:'MarketForm',
                    identity: '/MarketForm',
                    text: '交易成功页面',
                    configObj: {} 
                  }
              ];

              // function to load script by add <script> tag to page.and check the entry point to current page,invoke the proper function
              // for every different page, two method need to be implemented.
              // 1. pageIdentity_handler // for process the current page in running mode
              // 2. pageIdentity_handler_configMode // for process the current page in config mode
              
              var loadingCount = 0;
              //function to generate update time stamp
              var genereateTimeStamp = function(){
                  return (new Date()).toLocaleDateString();
              }

              //load different logic code for current page.
              var url = window.location.pathname.toString();
              var identified = false;
              var identity = null;
              for(var i=0;i<states.length;i++){
                  var state = states[i];
                  if(url == state.identity){
                      log("进入"+state.text+"处理逻辑");
                      identified = true;
                      identity = state.name;
                      break;
                  }
              }
              if(!identified){
                  log('无法处理本页面，请手动将页面跳转至首页！');
              }else{
                  //loadScript(identity);
                  GM_xmlhttpRequest({
                      method: 'GET',
                      url: basePath+identity+'.js?'+genereateTimeStamp(),
                      onload: function(xpr) {
                          try{
                              eval(xpr.responseText);
                          }catch(e){
                              log('无法从服务器加载处理逻辑,请您到<a href="http://qilongjitools.cn" target="_blank">屠龙者官网</a>关注最新消息,或到<a href="http://bbs.qilongjitools.cn" target="_blank">屠龙者论坛</a>报告BUG.'+e);
                              return;
                          }                 	        
                          GM_xmlhttpRequest({
                              method: 'GET',
                              url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js',
                              onload: function(xpr) {
                                  eval(xpr.responseText);
                                  if(GM_getValue("ds_stoped_"+window.location.host) != null && GM_getValue("ds_stoped_"+window.location.host) != ""){
                                      funcName = identity+'_handler_configMode';
                                      log("本页逻辑加载成功,目前处配置模式,单击下面链接完成配置,进入执行模式.");
                                  }else{
                                      funcName = identity+'_handler';
                                      log("本页逻辑加载成功,开始执行...");
                                  }
                                  try{
                                      func = eval(funcName);
                                  }catch(e){log("发生致命错误:"+e)}
                                  if(func){                                        
                                      func.apply(unsafeWindow,[]);
                                  }else{
                                      log("脚本加载错误,该错误可能由网络原因导致,请您稍后重新刷新页面...");
                                  }
                              }
                          });
                      }
                  });
              }
              //function for auto store the CONFIG by GM_setValue(), fix "Greasemonkey access violation: unsafeWindow cannot call GM_getValue."
              window.setInterval(function(){
                  GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
                  GM_setValue("ds_GMSafeVariables_"+window.location.host,uneval(GM_safeVariables));                  
              },500);
          } // end of callback function
    }); // end of GM_xmlhttpRequest
},false);

//utility functions,also treat as an common function library.
function $ID(id){
    return document.getElementById(id);
}
//xpath helper function
function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}
//extend object function
function extend(tar,source){
    for(var key in source){
        tar[key] = source[key];
    }
    return tar;
}
//simulate the human click the link
function clickLink(link){
    var randomTime = Math.random()*15000;
    randomTime = randomTime<3000?3000:randomTime;
    var str = "window.location.href = '" + link + "'";
    window.setTimeout(str,randomTime);
}
//function to generate the action probabilty
//probability between 0 - 1
function makeDecision(probability){
    var random = Math.random();
    if(random <= probability) return true;
    return false;
}
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
Array.prototype.removeByObjectProperty = function(prop,val){
    var rmIdx = -1;
    for(var i=0;i<this.length;i++){
        if(this[i][prop] == val){
            rmIdx = i;
            break;
        }
    }
    if(rmIdx != -1)
        return this.remove(rmIdx);
    return this;
}
//getObject by object property from an objects array
Array.prototype.getObjectByProperty = function(property,value){
    for(var i=0;i<this.length;i++){
        if(this[i][property] == value)  return this[i];
    }
    return null;
}
Array.prototype.exists = function(value){
    for(var i=0;i<this.length;i++){
        if(this[i] == value) return i;
    }
    return -1;
}
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
}

