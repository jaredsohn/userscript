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
// Two function need to be implemented , building_handler & building_handler_configMode
// used GM Variables
// ds_buildingRuleCurrent : for identify the what building need to be built.

var title = $('div.container > div.col2 > h1').html();
var level = 0;
if($('div.container > div.col2 > h1 > span').length > 0)
    level = parseInt(jQuery.trim($('div.container > div.col2 > h1 > span').html().replace("(","").replace(")","").replace("等级","")));
//common css insertion
$(document.body).append([
        '<style>',
        '.ds_addHuntRuleHeroDropArea { ',
        	'background-color: #e9b96e;',
        	'border: 3px double #c17d11',
        	'margin: 10px;',
        	'opacity: 0.5;',
        	'overflow:auto;',
        	'text-align:center;',
        '}',
        '.ds_heroItem { ',
            'float:left;',
            'margin-left:4px;}',
        '}',
        '.droppable-active {',
        	'opacity: 1.0;',
        	'background-color:#993300',
        '}',
        '.droppable-hover {',
        	'outline: 4px dotted black;',
        	'background-color:#993300',
        '}',
        '</style>'
    ].join(''));    // css for auto hunt rules
    
function building_handler(){
    // code for auto building 
    if(GM_safeVariables["ds_buildingRuleCurrent"] != null && GM_safeVariables["ds_buildingRuleCurrent"] != ""){
        var currentBuildingRule = GM_safeVariables["ds_buildingRuleCurrent"];
        log("针对建筑物'"+currentBuildingRule.buildingName+"',进入建造/升级过程...");
        var link = null;
        //find out the "建造" link
        if(title == "新建筑物建造"){
            var titleH2s = $("div.b_block > h2");
            link = $('div.b_block > h2:contains("'+currentBuildingRule.buildingName+'") ~ div.b_info > p > a:contains("建造")').get(0);
        }else{
            var links = $('a:contains("建造"):first');
            if(links.length > 0)
                link = links.get(0);
        }
        //remove rule from building rule array.
        CONFIG.building_rules.removeByObjectProperty("id",currentBuildingRule.id);
        //remove identity variable      
        delete GM_safeVariables["ds_buildingRuleCurrent"];
        if(link != null){
            var randomTime = Math.random()*5000;
            randomTime = randomTime<2000?2000:randomTime;
            window.setTimeout(function(){
              var evt = document.createEvent("MouseEvents");  
              evt.initEvent("click",true,true);  
              link.dispatchEvent(evt);   
            },randomTime);
        }else{
            log("无法满足当前建筑步骤的要求,或许您的建筑顺序安排有误,如不满足本建筑的先决条件,或者建筑正在进行中,或资源不足.将当步骤放入队列最末,以便稍后执行...");
            if(currentBuildingRule["failed"] == null){
              currentBuildingRule["failed"] = 1;        
              CONFIG.building_rules.push(currentBuildingRule);
            }else{
              var failedCount =  parseInt(currentBuildingRule["failed"]);
              if(failedCount < 3){
                currentBuildingRule["failed"] = (failedCount+1).toString();
                CONFIG.building_rules.push(currentBuildingRule);
              }else{
                log("当前建筑步骤失败已经超过3次,自动从队列中删除...");
              }
            }
            clickLink("/mindex");
        }
    }                                   
    
    if(title.indexOf("军事指挥所") > -1){      
        log("军事指挥所,包含所有正在出征的英雄信息与所有狩猎规则信息.");
        //restore hunt rules data on UI
        var h2 = $("div.b_detail > div.army_area > h2:contains('行进中的军队')");
        for(var i=0;i<CONFIG.hunt_rules.length;i++){
            var html = _generateHuntRuleUI(CONFIG.hunt_rules[i]);
            h2.after(html);
        }
        $("div.b_detail > div.army_area > h2").html(getDSIconPath()+'屠龙者狩猎规则&nbsp;&nbsp;&amp;&nbsp;&nbsp;行进中的军队')
    }
    //logic code for resurrect hero
    if(title.indexOf("酒馆")>=0){ //Inn page
      //to resurrect heros
      log("进入酒馆,开始复活英雄流程...");
      var links = document.getElementsByTagName('a');
      var link = null;
      for(var i=0;i<links.length;i++){
        if(links[i].innerHTML == '复活'){
          link = links[i];
          break;
        }
      }
      if(link != null){
        //start resurrect hero process
        document.ResurrectionForm = $x('//form[@name="ResurrectionForm"]')[0];
        eval('var func = function(){'+links[i].getAttribute('onclick')+'}');
        func.apply(window,[]);//transition to current state in loop
        return;
      }else{
        log("没有任何英雄需要复活");
        clickLink("/mindex");
        return;
      }
    }
    //logic code for collect tax
    if(title.indexOf("市政中心")>=0){ //city hall
      log("进入市政中心，开始税收流程...");
      var link = $('div.b_detail > p > a:contains("收税")');
      if(link.length > 0){
          clickLink(link.attr('href'));
          return;
      }else{
          log("进入市政中心，税收已经完成.");
          GM_safeVariables["ds_taxCollected_"+GM_safeVariables['ds_currentCityID']] = (new Date()).toLocaleDateString();
          clickLink('/mindex');
          return;
      }
    }
    return;  
}

function building_handler_configMode(){
    //为了尊重作者个人的努力,请您不要去掉这个广告代码.如果您有这些精力找到这段广告代码的话,为什么不去研究点实际的功能呢?如果您确实去掉了这段广告代码的话,请通知我,并且请不要将修改后的代码进行传播.多谢您的支持.
    //code for google adsense
    $('div.col3 > div.elink').after('<div style="z-index:999999"><iframe frameborder="0" width="165" height="620" scrolling="no" src="http://qilongjitools.cn/asdscripts/ds_ad.html" /></div>');
    $('div.container > div.col2 > div.b_block:first').after('<div style="z-index:999999"><iframe frameborder="0" width="470" height="62" scrolling="no" src="http://qilongjitools.cn/asdscripts/dswave_horizontal.html" /></div>');
    
    // code for insert button for add auto building rule
    var cityName = jQuery.trim($('ul.city_list > li.on > a').attr('title'));
    //create patch for server bug.
    if(cityName.indexOf('(主城)')>-1)
        cityName = jQuery.trim(cityName.replace('(主城)',''));
    var ds_cfg_addBuildingRule = null;
    var buildingName = null;
    if(title == "新建筑物建造"){
        $('div.col2 > div.b_block > div.b_info').append('<p>'+getDSIconPath()+'<a href="javascript:{void(0);}" class="ds_cfg_addBuildingRule">加入屠龙者自动建筑队列</a></p>');
    }else{
        $('div.col2 > div.b_block > div.b_info').append('<p>'+getDSIconPath()+'<a href="javascript:{void(0);}" class="ds_cfg_addBuildingRule">加入屠龙者自动建筑队列</a></p>');
        buildingName = jQuery.trim($('div.col2 > h1').html().split('<span>')[0]);
    }
    
    $('a.ds_cfg_addBuildingRule').click(function(){ 
        if(buildingName == null){
            buildingName = $(this).parent().parent().siblings('h2').html();
        }
        var id = new Date().getTime();
        var rule = new Object();
        rule.id = id;
        rule.cityName = cityName;
        rule.buildingName = buildingName;
        CONFIG.building_rules.push(rule);
        $(this).replaceWith('<span>成功加入屠龙者自动建筑队列</span>');
        buildingName = null;
    })
    // code for process the code for add hunt rule.
    if(title.indexOf("军事指挥所") > -1){
        
        log("进入军事指挥所,您可以在这里自由配置每个英雄的狩猎规则.支持多英雄同时狩猎.");
        var h2 = $("div.b_detail > div.army_area > h2:contains('行进中的军队')");
        //add new hunt rule html template
        h2.after([
              '<form class="ds_formAddHuntRule">',
                  '<table class="t3">',
                      '<tbody>',
                          '<tr>',
                              '<td>'+getDSIconPath()+'在<input id="ds_cfg_iptHuntRuleRadius" type="text" style="width:20px;" value="22"/>格',
                              '<input type="checkbox" id="ds_cfg_chkHuntRuleFixRadius"/><label for="ds_cfg_chkHuntRuleFixRadius">固定半径</label>范围内',                       
                          '</tr>',
                          '<tr>',
                              '<td>',
                                  '对于&nbsp;&nbsp;<img src="/sys/images/arrow3.gif" style="margin-left:4px;"/>',
                                   '<input id="ds_cfg_rdoHuntRuleWild" type="radio" value="wild" checked="true" name="huntTarget"/><label for="ds_cfg_rdoHuntRuleWild">野地</label>',
                                   '<input id="ds_cfg_rdoHuntRuleDevil" type="radio" value="devil" name="huntTarget" /><label for="ds_cfg_rdoHuntRuleDevil">恶魔城</label>',
                                   '<input id="ds_cfg_rdoHuntRuleWheel" type="radio" value="wheel" name="huntTarget" /><label for="ds_cfg_rdoHuntRuleWheel">水/风车</label>',
                              '</td>',
                          '</tr>',
                          '<tr>',
                              '<td>',
                                  '进行 &nbsp;&nbsp;<img src="/sys/images/arrow3.gif" style="margin-left:4px;"/>',
                                  '<input id="ds_cfg_rdoHuntRuleAttack" type="radio" value="attack" checked="true" name="huntType" /><label for="ds_cfg_rdoHuntRuleAttack">攻击</label>',
                                  '<input id="ds_cfg_rdoHuntRuleCollect" type="radio" value="collect" name="huntType" /><label for="ds_cfg_rdoHuntRuleCollect">采集</label>',
                              '</td>',
                          '</tr>',
                          '<tr>',
                              '<td>',
                                  '<div class="ds_addHuntRuleHeroDropArea">请将英雄拖动到本区域中指派狩猎规则</div>',
                              '</td>',
                          '</tr>',
                          '<tr>',
                              '<div><a href="javascript:void(0);" style="margin-left:20px;" class="ds_resetNewHuntRule">重置</a><a href="javascript:void(0);" style="margin-left:20px;" class="ds_addHuntRule">增加编队</a></div></td>',
                          '</tr>',
                      '</tbody>',
                  '</table>',
              '</form>'
        ].join(''));
        $('a.ds_resetNewHuntRule').click(function(){
            $('input.ds_cfg_iptHuntRuleRadius').val('22');
            $('div.ds_addHuntRuleHeroDropArea').html('请将英雄拖动到本区域中指派狩猎规则');
        });
        $('a.ds_addHuntRule').click(function(){
            var id = new Date().getTime();
            var rule = new Object();
            rule.id = id;
            rule.heros = [];
            $('form.ds_formAddHuntRule > table > tbody > tr > td > div.ds_addHuntRuleHeroDropArea > div.ds_heroItem').each(function(i){
                //alert(this);
                var hero = {}
                hero.name = $(this).attr('ds_heroname');
                hero.icon = $(this).children(':first').attr('src');
                rule.heros.push(hero);
            })
            if(rule.heros.length == 0){
                alert('请至少选择一个英雄生成新的狩猎规则.');
                return;
            }
            //check if exists the same hero in other rules
            for(var i=0;i<rule.heros.length;i++){
                var hero = rule.heros[i];
                for(var j=0;j<CONFIG.hunt_rules.length;j++){
                    var existsrule = CONFIG.hunt_rules[j];
                    if(existsrule.heros.getObjectByProperty('name',hero.name) != null){
                        alert('英雄:'+hero.name+'已经存在于其他规则中,一个英雄只能被分配到一种狩猎规则中.');
                        return;
                    }
                }
            }
            rule.radius = parseInt($("#ds_cfg_iptHuntRuleRadius").val());
            rule.fixRadius = $("#ds_cfg_chkHuntRuleFixRadius").get(0).checked;
            rule.target = $('input[name="huntTarget"]:radio:checked').val();
            rule.attackType = $('input[name="huntType"]:radio:checked').val();
            $('input.ds_cfg_iptHuntRuleRadius').val('22');
            $('div.ds_addHuntRuleHeroDropArea').html('请将英雄拖动到本区域中指派狩猎规则');
            CONFIG.hunt_rules.push(rule);
            //generate ui for rule           
            var form = $('form.ds_formAddHuntRule');
            var html = _generateHuntRuleUI_configMode(rule);
            form.after(html);
            _syncEventForRemoveHuntRule();
        })
        $('div.army_area > ul.hero_info > li > a > img').wrap('<div class="ds_heroAvatar"></div>');
        $('div.army_area > ul.hero_info > li > a').attr('href','javascript:void(0);');
        $('div.army_area > ul.hero_info > li > a > div.ds_heroAvatar').draggable({helper: 'clone'});
        $("div.ds_addHuntRuleHeroDropArea").droppable({
        	accept: ".ds_heroAvatar",
        	activeClass: 'droppable-active',
        	hoverClass: 'droppable-hover',
        	drop: function(ev, ui) {
        	    var text = jQuery.trim(ui.draggable.parent().siblings('h3').html());
        	    if(text != ''){
        	        text = jQuery.trim(jQuery.trim(text).split(' ')[1]);
        	        if($(this).children('[ds_heroname*="'+text+'"]').length == 0){
        	            if($(this).children().length == 0){
            	            $(this).html('');
            	        }
            	        $(this).append('<div class="ds_heroItem" ds_heroname="'+text+'"><img src="'+ui.draggable.children(':first').attr('src')+'" width="32" height="32" title="'+text+'"/></div>');
        	        }          		
        	    }
        	    
        	}
        });
        //restore hunt rules data on UI
        var form = $('form.ds_formAddHuntRule');
        for(var i=0;i<CONFIG.hunt_rules.length;i++){
            var html = _generateHuntRuleUI_configMode(CONFIG.hunt_rules[i]);
            form.after(html);
        }
        _syncEventForRemoveHuntRule();     
    }
    
    //code for process config UI of resurrect heros
    if(title.indexOf("酒馆")>=0){
        log("进入酒馆,您可以在这里进行是否允许自动复活已经阵亡的英雄的配置.");
        $('div.b_detail > h2 ').append('<span style="margin-left:10px;font-size:14px;">'+getDSIconPath()+'<input type="checkbox" class="ds_cfg_chkAutoResurrectHero" checked />自动复活阵亡的英雄</span>');
        $('div.b_detail > h2 > span > input.ds_cfg_chkAutoResurrectHero').get(0).checked = CONFIG.auto_resurrect;
        $('div.b_detail > h2 > span > input.ds_cfg_chkAutoResurrectHero').click(function(){
            CONFIG.auto_resurrect = this.checked;
        });
    }

}


// private functions             

//generate the hunt rule list UI in config mode
var _generateHuntRuleUI_configMode = function(huntRule){
    var html = ['<form class="ds_formHuntRule$huntruleid">',
          '<table class="t3">',
              '<tbody>',
                  '<tr>',
                      '<td>$heros</td>',                       
                  '</tr>',
                  '<tr>',
                      '<td>',
                          '$detail',
                      '</td>',
                  '</tr>',
                  '<tr>',
                      '<div><a href="javascript:void(0);" style="margin-left:20px;" class="ds_deleteHuntRule" ds_huntruleid="$huntruleid">删除</a></div></td>',
                  '</tr>',
              '</tbody>',
          '</table>',
      '</form>'].join('');
     html = html.replace(/\$huntruleid/g,huntRule.id);
     var heros = '';
     for(var i=0;i<huntRule.heros.length;i++){
         var objHero = huntRule.heros[i];
         heros += ['<div class="ds_heroItem" ds_heroname="'+objHero.name+'">',
                        '<img height="32" width="32" title="'+objHero.name+'" src="'+objHero.icon+'"/>',
                   '</div>'].join('');
     }
     html = html.replace(/\$heros/g,heros);
     var details = '<img src="/sys/images/arrow3.gif" style="margin-left:4px;"/>';
     if(huntRule.attackType == "attack"){
         details += "<strong style='margin-right:4px;margin-left:4px;'>攻击</strong>"
     }else{
         details += "<strong style='margin-right:4px;margin-left:4px;'>采集</strong>"
     }
     details += "<strong style='margin-right:4px;margin-left:4px;'>" + huntRule.radius.toString() + "格</strong>"
     if(huntRule.fixRadius == true){
         details += "<strong style='margin-right:4px;margin-left:4px;'>固定半径</strong>上"
     }else{
         details += "<strong style='margin-right:4px;margin-left:4px;'>随机半径</strong>内"
     }
     details += '的';
     if(huntRule.target == "wild")  details += "野地";
     else if(huntRule.target == "devil") details += "恶魔城";
     else details += "水/风车";
     html = html.replace(/\$detail/g,details);
     return html;
}

var _syncEventForRemoveHuntRule = function(){
    $('a.ds_deleteHuntRule').click(function(){
       var id = $(this).attr('ds_huntruleid');
       $('form.ds_formHuntRule'+id).remove();
       CONFIG.hunt_rules.removeByObjectProperty('id',id);
    });
}

//generate the hunt rule list UI in normal mode
var _generateHuntRuleUI = function(huntRule){
    var html = ['<form class="ds_formHuntRule$huntruleid">',
          '<table class="t3">',
              '<tbody>',
                  '<tr>',
                      '<td>$heros</td>',                       
                  '</tr>',
                  '<tr>',
                      '<td>',
                          '$detail',
                      '</td>',
                  '</tr>',
              '</tbody>',
          '</table>',
      '</form>'].join('');
     html = html.replace(/\$huntruleid/g,huntRule.id);
     var heros = '';
     for(var i=0;i<huntRule.heros.length;i++){
         var objHero = huntRule.heros[i];
         heros += ['<div class="ds_heroItem" ds_heroname="'+objHero.name+'">',
                        '<img height="32" width="32" title="'+objHero.name+'" src="'+objHero.icon+'"/>',
                   '</div>'].join('');
     }
     html = html.replace(/\$heros/g,heros);
     var details = '<img src="/sys/images/arrow3.gif" style="margin-left:4px;"/>';
     if(huntRule.attackType == "attack"){
         details += "<strong style='margin-right:4px;margin-left:4px;'>攻击</strong>"
     }else{
         details += "<strong style='margin-right:4px;margin-left:4px;'>采集</strong>"
     }
     details += "<strong style='margin-right:4px;margin-left:4px;'>" + huntRule.radius.toString() + "格</strong>"
     if(huntRule.fixRadius == true){
         details += "<strong style='margin-right:4px;margin-left:4px;'>固定半径</strong>上"
     }else{
         details += "<strong style='margin-right:4px;margin-left:4px;'>随机半径</strong>内"
     }
     details += '的';
     if(huntRule.target == "wild")  details += "野地";
     else if(huntRule.target == "devil") details += "恶魔城";
     else details += "水/风车";
     html = html.replace(/\$detail/g,details);
     return html;
}





































