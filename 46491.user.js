// ==UserScript==
// @name          Dragon Slayer - Auto Hunt Evolution
// @namespace     http://hi.baidu.com/qilongjitools
// @description   Automation scripts to for game www.qilongji.com.
// @include       http://d*.duniu.com/*
// @include       http://d*.7l.mop.com/*
// @include       http://x*.7.xiaonei.com/*
// @include       http://d*.qlj.ewtang.com/*
// ==/UserScript==

/*
 * Follow enviorment varibles need to be the unique value for different citys.
 * ds_lastArmyAssignmentedHour_
 * ds_heroAttackDelayTimeStamp_
 * ds_taxCollected_
 * ds_resourceUpgraded_
 * ds_armyAssignmented_
 */
 
// Couldn't connect Test 
var title = document.getElementsByTagName('title');
var body = document.getElementsByTagName('body');
if (
  (body[0].innerHTML.indexOf('Though the site seems valid, the browser was unable to establish a connection.') > 0 && title[0].innerHTML == 'Page Load Error')
  || (body[0].innerHTML.indexOf('如果您的计算机受到防火墙或代理服务器的保护，请确认 Firefox  被授权访问网页') > 0 && title[0].innerHTML == '页面载入出错')
) 
{
  body[0].innerHTML='<h1><font color="#ff0000">无法与服务器建立连接...等待30秒重试!</font></h1><STRONG><FONT face="Courier New" size="2" color="#006600">Powered By <a href="http://qilongjitools.cn" target="_blank">屠龙者</a> </FONT></STRONG><hr/>';
  window.setTimeout("window.location.reload();",30000);
  return;
}



//utility functions
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
// document.getElementById
function $(id){
  return document.getElementById(id);
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

addEventListener('load', function(event){
  //inject dragon slayer website
  var uls = $x('//ul[@class="list1"]');
  if(uls.length != 0){
    var li = document.createElement("li");
    li.innerHTML = '<a target="_blank" href="http://qilongjitools.cn" style="color:green;"><strong>Tool hỗ trợ Truyền Thuyết Rồng</strong></a>';
    uls[0].insertBefore(li,uls[0].firstChild);
    li = document.createElement("li");
    li.innerHTML = '<a target="_blank" href="http://bbs.qilongjitools.cn" style="color:red;"><strong>happy new year</strong></a>';
    uls[0].insertBefore(li,uls[0].firstChild);

  }
  //render information bar
  var info = document.createElement('div');
  info.style.backgroundColor = 'red';
  info.style.color = 'white';
  info.style.position = "absolute";
  info.style.right = "10px";
  info.style.top = "20px";
  info.innerHTML = "Tool Truyền Thuyết Rồng Beta 081130 -";
  document.body.appendChild(info);
  //render message info bar
  var msg = document.createElement('div');
  msg.style.backgroundColor = 'red';
  msg.style.color = 'white';
  msg.style.position = "absolute";
  msg.style.right = "10px";
  msg.style.top = "40px";
  msg.innerHTML = "Trạng Thái:Stop ";
  document.body.appendChild(msg);
  var log = function(txt){
     msg.innerHTML = "Trạng Thái：" + txt; 
  }
  
  //statistics initialize - yahoo
  var div = document.createElement('div');
  div.style.position = "absolute";
  div.style.right = "10px";
  div.style.top = "100px";
  div.innerHTML = '<a href="http://tongji.cn.yahoo.com"><img src="http://img.tongji.cn.yahoo.com/823918/ystat.gif"/></a>';
  document.body.appendChild(div);

  //start/stop flag check
  var linkSwitch = document.createElement('a');
  linkSwitch.style.position = "absolute";
  linkSwitch.style.right = "10px";
  linkSwitch.style.top = "80px";
  linkSwitch.href = "javascript:{void(0)}";
  linkSwitch.innerHTML = "Auto On/Off";
  document.body.appendChild(linkSwitch);
  if(GM_getValue("ds_stoped_"+window.location.host) != null && GM_getValue("ds_stoped_"+window.location.host) != ""){
    linkSwitch.innerHTML = "+Auto on+";
    linkSwitch.addEventListener('click',function(){
      GM_setValue("ds_stoped_"+window.location.host,"");
      window.location.href = "/mindex";
    },false);
    return;
  }
  linkSwitch.innerHTML = "-Auto off-";
  linkSwitch.addEventListener('click',function(){
    GM_setValue("ds_stoped_"+window.location.host,"true");
    window.location.href = "/mindex";
  },false);
  
  //configuration initialize
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
    building_rules:[] //{id:"1111",cityName:"屠龙者主城",buildingName:"[Binh trường"}
  };
  if(GM_getValue("ds_CONFIG_"+window.location.host) != null && GM_getValue("ds_CONFIG_"+window.location.host) != ""){
    CONFIG = extend(CONFIG,eval(GM_getValue("ds_CONFIG_"+window.location.host)));
  }
  //render config window
  if(GM_getValue("ds_inConfig_"+window.location.host)!=null
  && GM_getValue("ds_inConfig_"+window.location.host)!=""){
   var cfgWin = document.createElement('div');
   //cfgWin.setAttribute("id","ds_configWindow");
   cfgWin.style.backgroundColor = '#D9D9D9';
   //cfgWin.style.color = 'white';
   cfgWin.style.position = "absolute";
   cfgWin.style.right = "10px";
   cfgWin.style.top = "60px";
   cfgWin.style.border = "1px solid #C59D47";
   document.body.appendChild(cfgWin);
   cfgWin.innerHTML = '<div style="text-align:center;background-color:#C59D47">Thiết lập chế độ</div>'+
                      '<div><fieldSet ><legend>Thành thị bỏ qua:<input id="ds_cfg_btnClearCityRules" type="button" value="Reset chế độ"/></legend>'+
                      '<div><input type="checkbox" id="ds_cfg_chkEnableMultiCity"/><label for="ds_cfg_chkEnableMultiCity">Cho phép người chơi quản lí nhiều thành, đồng thời bỏ danh sách thành thị dưới đây</label></div>'+
                      '<div>Chú ý:danh sách thành thị dưới đây không được quản lí.</div>'+
                      '<div id="ds_cfg_ctCityRules"></div>'+
                      '<div>'+
                        'Thành thị bỏ qua:<input id="ds_cfg_iptCityName" type="text" style="width:80px;"/>(Tên thành)'+
                        '<input id="ds_cfg_btnAddCityRule" type="button" value="+"/>'+
                      '</div>'+
                      '</fieldSet></div>'+
                      '<div><fieldSet><legend>Đi săn:</legend>'+
                        '<div>'+
                        '<input type="checkbox" id="ds_cfg_chkWild"/><label for="ds_cfg_chkWild">Dã địa</label>'+
                        '<input type="checkbox" id="ds_cfg_chkEvilCity"/><label for="ds_cfg_chkEvilCity">Ác quỷ thành</label>'+
                        '<input type="checkbox" id="ds_cfg_chkWheel"/><label for="ds_cfg_chkWheel">(Chưa thám hiểm)Guồng/Cối xay</label>'+
                        '</div>'+
                        '<div><span>Đi săn bán kính:Tại</span><input type="text" id="ds_cfg_iptRadius" value="2" style="width:30px;" />Phạm vi</div>'+
                        '<div><input type="checkbox" id="ds_cfg_chkFixRadius"/><label for="ds_cfg_chkFixRadius">Bán kính cố định(Huỷ bỏ chọn lựa sẽ sử dụng trong phạm vi chỉ dịnh)</label></div>'+
		                    '<div><input type="checkbox" id="ds_cfg_chkAutoResurrect"/><label for="ds_cfg_chkAutoResurrect">Hồi sinh(tất cả các tướng không phân biệt đẳng cấp)</label></div>'+
		                    '<div><input type="checkbox" id="ds_cfg_chkAutoGamble"/><label for="ds_cfg_chkAutoGamble">Tự động đánh bạc(Lợi dụng thời gian rảnh hoàn thành 100 lần hệ thống cho phép)</label></div>'+
		                    '<div><input type="checkbox" id="ds_cfg_chkMapLog"/><label for="ds_cfg_chkMapLog">Sử dụng nhật ký bản đồ tài nguyên(từ bản đồ đi săn)</label></div>'+
		                    '<div><input type="checkbox" id="ds_cfg_chkEnableAttackDelay"/><label for="ds_cfg_chkEnableAttackDelay">Cho phép Hero chậm xuất quân(Có thể chậm 5-10 phút xuất quân)</label></div>'+
                      '</fieldSet></div>'+
                      '<div><fieldSet><legend>Quy tắc đi săn:<input id="ds_cfg_btnClearHuntRules" type="button" value="Reset chế độ"/></legend>'+
                        '<div><input type="checkbox" id="ds_cfg_chkEnableHuntRules" /><label for="ds_cfg_chkEnableHuntRules">cho phép quy tắc đi săn dưới đây(Quy tắc được chọn mới được áp dụng)</label></div>'+
                        '<div id="ds_cfg_ctHuntRules"></div>'+
                        '<div>'+
                          'Thêm quy tắc:hero<input id="ds_cfg_iptHuntHeroName" type="text" style="width:40px;"/>'+
                          'Tại<input id="ds_cfg_iptHuntRuleRadius" type="text" style="width:20px;" value="22"/>Cách'+
                          '<input type="checkbox" id="ds_cfg_chkHuntRuleFixRadius"/><label for="ds_cfg_chkHuntRuleFixRadius">Cố định bán kính</label>Trong phạm vi<br/>'+
                          '对于&nbsp;&nbsp;'+
                          '<input id="ds_cfg_rdoHuntRuleWild" type="radio" value="wild" checked="true" name="huntTarget"/><label for="ds_cfg_rdoHuntRuleWild">Dã địa</label>'+
                          '<input id="ds_cfg_rdoHuntRuleDevil" type="radio" value="devil" name="huntTarget" /><label for="ds_cfg_rdoHuntRuleDevil">Ác quỷ thành</label>'+
                          '<input id="ds_cfg_rdoHuntRuleWheel" type="radio" value="wheel" name="huntTarget" /><label for="ds_cfg_rdoHuntRuleWheel">Guồng/Cối xây</label>'+
                          '&nbsp;&nbsp;Tiến hành&nbsp;&nbsp;'+
                          '<input id="ds_cfg_rdoHuntRuleAttack" type="radio" value="attack" checked="true" name="huntType" /><label for="ds_cfg_rdoHuntRuleAttack">Xuất quân</label>'+
                          '<input id="ds_cfg_rdoHuntRuleCollect" type="radio" value="collect" name="huntType" /><label for="ds_cfg_rdoHuntRuleCollect">Thu thập</label>'+
                          '<input id="ds_cfg_btnAddHuntRule" type="button" value="+"/>'+
                        '</div>'+
                      '</fieldSet></div>'+
		                  '<div><fieldSet ><legend>Tự động điều binh:<input id="ds_cfg_btnClearRules" type="button" value="Reset chế độ"/></legend>'+
                        '<div><input type="checkbox" id="ds_cfg_chkEnableArmyRules"/><label for="ds_cfg_chkEnableArmyRules">Cho phép tự động điều binh(Khi chọn, chức năng tự động điều binh mới xảy ra)</label></div>'+
		                    '<div>Chú ý:Tự động điều binh chỉ thực hiện khi có hero mỗi tiếng thực hiện 1 lần.</div>'+
                        '<div><input type="checkbox" id="ds_cfg_chkEnableArmyRulesAverage"/><label for="ds_cfg_chkEnableArmyRulesAverage">Chia đều quân ra các ô</label></div>'+
		                    '<div id="ds_cfg_ctArmyRules"></div>'+
                        '<div>'+
                          'Thêm quy tắc:Hero<input id="ds_cfg_iptHeroName" type="text" style="width:40px;"/>'+
                          'Quân đem theo<input id="ds_cfg_iptArmyType" type="text" style="width:40px;"/>'+
                          'Số lượng<input id="ds_cfg_iptArmyCount" type="text" style="width:40px;"/>'+
                          '<input id="ds_cfg_btnAddRule" type="button" value="+"/>'+
                        '</div>'+
                      '</fieldSet></div>'+
                      '<div><fieldSet><legend>Tài nguyên</legend>'+
		                    '<div><input type="checkbox" id="ds_cfg_chkEnableAutoSellResource"/>Mỗi khi tài nguyên vượt quá<input type="text" id="ds_cfg_iptSellAmount" value="" style="width:40px;" />giờ，Bán tài nguyên cho NPC</div>'+
                      '</fieldSet></div>'+
                      '<div><fieldSet ><legend>Danh sách kiến trúc:<input id="ds_cfg_btnClearBuildingRules" type="button" value="Reset chế độ"/></legend>'+
                        '<div><input type="checkbox" id="ds_cfg_chkEnableBuildingRules"/><label for="ds_cfg_chkEnableBuildingRules">Cho phép xây dựng tuần tự kiến trúc trong danh sách</label></div>'+
		                    '<div>Chú ý:Nếu kiến trúc đã có,sẽ được up cấp.</div>'+
		                    '<div id="ds_cfg_ctBuildingRules"></div>'+
                        '<div>'+
                          'Thêm kiến trúc:Thành thị:<input id="ds_cfg_iptBuildingCityName" type="text" style="width:40px;"/>'+
                          'Tên kiến trúc:<input id="ds_cfg_iptBuildingName" type="text" style="width:40px;"/>'+
                          '<input id="ds_cfg_btnAddBuildingRule" type="button" value="+"/>'+
                        '</div>'+
                      '</fieldSet></div>'+
                      '<div style="text-align:right;"><input type="button" value="Hoàn thành" id="ds_cfg_btnConfirm" />'+
                      '<input type="button" value="Huỷ bỏ" id="ds_cfg_btnCancel" ></div>';
   //restor config status
   $("ds_cfg_iptRadius").value = CONFIG.hunt_radius.toString();
   $("ds_cfg_chkFixRadius").checked = CONFIG.fix_radius;
   $("ds_cfg_chkWild").checked = CONFIG.attack_wild;
   $("ds_cfg_chkEvilCity").checked = CONFIG.attack_evilCity;
   $("ds_cfg_chkWheel").checked = CONFIG.attack_wheel;
   $("ds_cfg_chkAutoGamble").checked = CONFIG.auto_gamble;
   $("ds_cfg_chkAutoResurrect").checked = CONFIG.auto_resurrect;
   $("ds_cfg_chkEnableArmyRules").checked = CONFIG.enable_armyRules;
   $("ds_cfg_chkEnableArmyRulesAverage").checked = CONFIG.enable_armyRulesAverage;
   $("ds_cfg_chkEnableAutoSellResource").checked = CONFIG.enable_autoSellResource;
   $("ds_cfg_iptSellAmount").value = CONFIG.resource_sellAmount;
   $("ds_cfg_chkMapLog").checked = CONFIG.enable_mapLog;
   $("ds_cfg_chkEnableAttackDelay").checked = CONFIG.enable_attackDelay;
   $("ds_cfg_chkEnableMultiCity").checked = CONFIG.enable_multiCity;
   $("ds_cfg_chkEnableHuntRules").checked = CONFIG.enable_huntRules;
   $("ds_cfg_chkEnableBuildingRules").checked = CONFIG.enable_buildingRules;
   
   //bind button event
   $('ds_cfg_btnConfirm').addEventListener('click',function(){
     //validate radius 
     var radius = -1;
     try{
       var radius = parseInt($("ds_cfg_iptRadius").value);
     }catch(e){
       alert("Đi săn bán kính phải là 1 số từ 1－100");
       return;
     }
     if(radius <= 0){
       alert("Đi săn bán kính phải lớn hơn 0");
       return;
     }
     //validate sell amount
     var sellAmount = -1;
     try{
       sellAmount = parseInt($("ds_cfg_iptSellAmount").value);
     }catch(e){
       alert("Số tài nguyên ít nhất phải là từ 1－100");
       return;
     }
     CONFIG.hunt_radius = radius;
     CONFIG.fix_radius = $("ds_cfg_chkFixRadius").checked;
     CONFIG.attack_wild = $("ds_cfg_chkWild").checked;
     CONFIG.attack_evilCity = $("ds_cfg_chkEvilCity").checked;
     CONFIG.attack_wheel = $("ds_cfg_chkWheel").checked;
     CONFIG.auto_gamble = $("ds_cfg_chkAutoGamble").checked;
     CONFIG.auto_resurrect = $("ds_cfg_chkAutoResurrect").checked;
     CONFIG.enable_armyRules = $("ds_cfg_chkEnableArmyRules").checked;
     CONFIG.enable_armyRulesAverage = $("ds_cfg_chkEnableArmyRulesAverage").checked;
     CONFIG.enable_autoSellResource = $("ds_cfg_chkEnableAutoSellResource").checked;
     CONFIG.resource_sellAmount = sellAmount;
     CONFIG.enable_mapLog = $("ds_cfg_chkMapLog").checked;
     CONFIG.enable_attackDelay = $("ds_cfg_chkEnableAttackDelay").checked;
     CONFIG.enable_multiCity = $("ds_cfg_chkEnableMultiCity").checked;
     CONFIG.enable_huntRules = $("ds_cfg_chkEnableHuntRules").checked;
     CONFIG.enable_buildingRules = $("ds_cfg_chkEnableBuildingRules").checked;
     GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
     GM_setValue("ds_inConfig_"+window.location.host,""); 
     window.location.href = "/mindex";
   },false);
   $('ds_cfg_btnCancel').addEventListener('click',function(){
     GM_setValue("ds_inConfig_"+window.location.host,""); 
     window.location.href = "/mindex";
   },false);
   
   //code for process the army rules
   var createArmyRuleItem = function(ruleItem){
     var item = document.createElement("div");
     item.setAttribute("id",ruleItem.id);
     item.innerHTML = "<span style='margin-right:8px;'><strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.heroName + "</strong>Đem theo<strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.armyType + "</strong><strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.armyCount + "</strong>Tên" + "</span>";
     var del = document.createElement("img");
     del.src = "/sys/images/del.gif";
     del.style.cursor = "pointer";
     //item.appendChild(del);
     item.insertBefore(del,item.firstChild);
     del.addEventListener('click',function(){
        $(ruleItem.id).parentNode.removeChild($(ruleItem.id));
        var rmIdx = -1;
        for(var i=0;i<CONFIG.army_rules.length;i++){
          if(CONFIG.army_rules[i].id == ruleItem.id){
            rmIdx = i;
            break;
          }
        }
        if(rmIdx != -1)
          CONFIG.army_rules.remove(rmIdx);
     },false);
     return item;
   }
   $('ds_cfg_btnAddRule').addEventListener('click',function(){
     var id = new Date().getTime();
     var rule = new Object();
     rule.id = id;
     rule.heroName = $("ds_cfg_iptHeroName").value;
     rule.armyType = $("ds_cfg_iptArmyType").value;
     rule.armyCount = parseInt($("ds_cfg_iptArmyCount").value);
     CONFIG.army_rules.push(rule);
     $("ds_cfg_ctArmyRules").appendChild(createArmyRuleItem(rule));
   },false);
   $('ds_cfg_btnClearRules').addEventListener('click',function(){
     CONFIG.army_rules = new Array();
     $("ds_cfg_ctArmyRules").innerHTML = '';
   },false);
   //restore the army rules list
   for(var i = 0;i<CONFIG.army_rules.length;i++){
     var armyRule = CONFIG.army_rules[i];
     $("ds_cfg_ctArmyRules").appendChild(createArmyRuleItem(armyRule));
   }
   //code for process hunt rules
   var createHuntRuleItem = function(ruleItem){
     //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
     var item = document.createElement("div");
     item.setAttribute("id",ruleItem.id);
     var html = "<span style='margin-right:8px;'><strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.heroName + "</strong>在<strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.radius.toString() + "Cách</strong>";
     if(ruleItem.fixRadius == true){
       html += "<strong style='margin-right:4px;margin-left:4px;'>Bán kính cố định</strong>Trên"
     }else{
       html += "<strong style='margin-right:4px;margin-left:4px;'>Bán kính ngẫu nhiên</strong>Trong"
     }
     if(ruleItem.attackType == "attack"){
       html += "<strong style='margin-right:4px;margin-left:4px;'>Tấn công</strong>"
     }else{
       html += "<strong style='margin-right:4px;margin-left:4px;'>Thu thập</strong>"
     }
     var targetText = null;
     if(ruleItem.target == "wild")  targetText = "Dã địa";
     else if(ruleItem.target == "devil") targetText = "Ác quỷ thành";
     else targetText = "Guồng/Cối xây";
     html += "<strong style='margin-right:4px;margin-left:4px;'>"+targetText+"</strong></span>";
     item.innerHTML = html;
     var del = document.createElement("img");
     del.src = "/sys/images/del.gif";
     del.style.cursor = "pointer";
     item.insertBefore(del,item.firstChild);
     del.addEventListener('click',function(){
       $(ruleItem.id).parentNode.removeChild($(ruleItem.id));
       var rmIdx = -1;
       for(var i=0;i<CONFIG.hunt_rules.length;i++){
         if(CONFIG.hunt_rules[i].id == ruleItem.id){
           rmIdx = i;
           break;
         }
       }
       if(rmIdx != -1) CONFIG.hunt_rules.remove(rmIdx);
     },false);
     return item;
   }
   $('ds_cfg_btnAddHuntRule').addEventListener('click',function(){
     //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
     var id = new Date().getTime();
     var rule = new Object();
     rule.id = id;
     rule.heroName = $("ds_cfg_iptHuntHeroName").value;
     rule.radius = parseInt($("ds_cfg_iptHuntRuleRadius").value);
     rule.fixRadius = $("ds_cfg_chkHuntRuleFixRadius").checked;
     if($('ds_cfg_rdoHuntRuleWild').checked) rule.target = $('ds_cfg_rdoHuntRuleWild').value;
     if($('ds_cfg_rdoHuntRuleDevil').checked) rule.target = $('ds_cfg_rdoHuntRuleDevil').value;
     if($('ds_cfg_rdoHuntRuleWheel').checked) rule.target = $('ds_cfg_rdoHuntRuleWheel').value;
     if($('ds_cfg_rdoHuntRuleAttack').checked) rule.attackType = $('ds_cfg_rdoHuntRuleAttack').value;
     if($('ds_cfg_rdoHuntRuleCollect').checked) rule.attackType = $('ds_cfg_rdoHuntRuleCollect').value;
     CONFIG.hunt_rules.push(rule);
     $("ds_cfg_ctHuntRules").appendChild(createHuntRuleItem(rule));
   },false);
   $('ds_cfg_btnClearHuntRules').addEventListener('click',function(){
     CONFIG.hunt_rules = new Array();
     $("ds_cfg_ctHuntRules").innerHTML = '';
   },false);
   //restore the hunt rules list
   for(var i = 0;i<CONFIG.hunt_rules.length;i++){
     var huntRule = CONFIG.hunt_rules[i];
     $("ds_cfg_ctHuntRules").appendChild(createHuntRuleItem(huntRule));
   }
   //code for process city rules
   var createCityRuleItem = function(cityItem){
     //{id:"1111",cityName:"屠龙者主城"}
     var item = document.createElement("div");
     item.setAttribute("id",cityItem.id);
     var html = "<span style='margin-right:8px;'><span>Không quản lí</span><strong style='margin-right:4px;margin-left:4px;'>" + cityItem.cityName + "</strong></span>";
     item.innerHTML = html;
     var del = document.createElement("img");
     del.src = "/sys/images/del.gif";
     del.style.cursor = "pointer";
     item.insertBefore(del,item.firstChild);
     del.addEventListener('click',function(){
       $(cityItem.id).parentNode.removeChild($(cityItem.id));
       var rmIdx = -1;
       for(var i=0;i<CONFIG.ignore_cityRules.length;i++){
         if(CONFIG.ignore_cityRules[i].id == cityItem.id){
           rmIdx = i;
           break;
         }
       }
       if(rmIdx != -1) CONFIG.ignore_cityRules.remove(rmIdx);
     },false);
     return item;
   }
   $('ds_cfg_btnAddCityRule').addEventListener('click',function(){
      //{id:"1111",cityName:"屠龙者主城"}
      var id = new Date().getTime();
      var rule = new Object();
      rule.id = id;
      rule.cityName = $("ds_cfg_iptCityName").value;
      CONFIG.ignore_cityRules.push(rule);
      $("ds_cfg_ctCityRules").appendChild(createCityRuleItem(rule));
   },false);
    
   $('ds_cfg_btnClearCityRules').addEventListener('click',function(){
      CONFIG.ignore_cityRules = new Array();
      $("ds_cfg_ctCityRules").innerHTML = '';
   },false);
   //restore the hunt rules list
   for(var i = 0;i<CONFIG.ignore_cityRules.length;i++){
      var cityRule = CONFIG.ignore_cityRules[i];
      $("ds_cfg_ctCityRules").appendChild(createCityRuleItem(cityRule));
   }
   //code for process building rules
   var createBuildingRuleItem = function(ruleItem){
     //{id:"1111",cityName:"屠龙者主城",buildingName:"[Binh trường]"}
     var item = document.createElement("div");
     item.setAttribute("id",ruleItem.id);
     var html = "<span style='margin-right:8px;'>Tại<strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.cityName + "</strong>Xây dựng<strong style='margin-right:4px;margin-left:4px;'>" + ruleItem.buildingName + "</strong>";
     item.innerHTML = html;
     var del = document.createElement("img");
     del.src = "/sys/images/del.gif";
     del.style.cursor = "pointer";
     item.insertBefore(del,item.firstChild);
     del.addEventListener('click',function(){
       $(ruleItem.id).parentNode.removeChild($(ruleItem.id));
       var rmIdx = -1;
       for(var i=0;i<CONFIG.building_rules.length;i++){
         if(CONFIG.building_rules[i].id == ruleItem.id){
           rmIdx = i;
           break;
         }
       }
       if(rmIdx != -1) CONFIG.building_rules.remove(rmIdx);
     },false);
     return item;
   }
   $('ds_cfg_btnAddBuildingRule').addEventListener('click',function(){
     //{id:"1111",cityName:"屠龙者主城",buildingName:"[Binh trường]"}
     var id = new Date().getTime();
     var rule = new Object();
     rule.id = id;
     rule.cityName = $("ds_cfg_iptBuildingCityName").value;
     rule.buildingName = $("ds_cfg_iptBuildingName").value;
     CONFIG.building_rules.push(rule);
     $("ds_cfg_ctBuildingRules").appendChild(createBuildingRuleItem(rule));
   },false);
   $('ds_cfg_btnClearBuildingRules').addEventListener('click',function(){
     CONFIG.building_rules = new Array();
     $("ds_cfg_ctBuildingRules").innerHTML = '';
   },false);
   //restore the building rules list
   for(var i = 0;i<CONFIG.building_rules.length;i++){
     var buildingRule = CONFIG.building_rules[i];
     $("ds_cfg_ctBuildingRules").appendChild(createBuildingRuleItem(buildingRule));
   }
   
   //code for adsense page
   //为了尊重作者个人的努力,请您不要去掉这个广告代码.如果您有这些精力找到这段广告代码的话,为什么不去研究点实际的功能呢?如果您确实去掉了这段广告代码的话,请通知我,并且请不要将修改后的代码进行传播.多谢您的支持.
   var adWin = document.createElement('div');
   adWin.style.position = "fixed";
   adWin.style.right = (cfgWin.offsetWidth+10).toString()+'px';
   adWin.style.top = "60px";
   adWin.style.border = "2px solid #C59D47";
   adWin.style.zIndex = "999999";
   document.body.appendChild(adWin);
   adWin.innerHTML = '<iframe frameborder="0" width="165" height="620" scrolling="no" src="http://qilongjitools.cn/asdscripts/ds_ad.html" />';
   
   return;
  }else{
    var linkCfg = document.createElement('a');
    linkCfg.style.position = "absolute";
    linkCfg.style.right = "10px";
    linkCfg.style.top = "60px";
    linkCfg.href = "javascript:{void(0)}";
    linkCfg.innerHTML = "Setup";
    document.body.appendChild(linkCfg);
    linkCfg.addEventListener('click',function(){
      GM_setValue("ds_inConfig_"+window.location.host,"true");
      window.location.href = "/mindex";
    },false);
  }

  //render map log bar
  if(CONFIG.enable_mapLog == true){
    var ul = $x("//ul[@class='list1']");
    if(ul.length != 0){
      var newUL = document.createElement('ul');
      newUL.setAttribute("class","list1");
      ul[0].parentNode.appendChild(newUL);
      newUL.innerHTML = "<li>Chưa kiểm tra tài nguyên</li>";
      if(GM_getValue("ds_mapLog_"+window.location.host)!=null&&GM_getValue("ds_mapLog_"+window.location.host)!=""){
        newUL.innerHTML = GM_getValue("ds_mapLog_"+window.location.host);
        var liClear = document.createElement('li');
        var linkClear = document.createElement('a');
        liClear.appendChild(linkClear);
        linkClear.setAttribute("href","javascript:{void(0)}");
        linkClear.innerHTML = '<img src="/sys/images/del.gif" style="margin-right:2px;"/>Xoá nhật ký tài nguyên';
        linkClear.addEventListener("click",function(evt){
          GM_setValue("ds_mapLog_"+window.location.host,"");
          window.location.href = "/mindex"; //transition to the state indexPage
        },false);
        newUL.appendChild(liClear);
      }
    }
 }

  // start automation logic processing
  // based on finite state machine , every set for window.location.href is a state transition
  var states = [
    {
      name:'indexPage', //unique name to find the process handler
      identity: '/mindex', //page identity
      text: 'Trang chủ', // text for human understanding
      configObj: {} // some configuration varibles
    },
    {
      name:'buildingPage', //unique name to find the process handler
      identity: '/building', //page identity
      text: 'Danh sách kiến trúc', // text for human understanding
      configObj: {} // some configuration varibles
    },
    {
      name:'mapPage',
      identity: '/GameMap',
      text: 'Bản đồ',
      configObj: {areaRadius:3}
    },
    {
      name:'mapInfoPage',
      identity: '/GameMapInfo',
      text: 'Thông tin bản đồ',
      configObj: {}
    },
    {
      name:'attackPage',
      identity: '/a2t',
      text: 'Xuất binh',
      configObj: {} 
    },
    {
      name:'gamblePage',
      identity: '/gdpf',
      text: 'Đánh bạc',
      configObj: {} 
    },
    {
      name:'resourceSellPage',
      identity: '/resourcesell',
      text: 'Bán tài nguyên cho NPC',
      configObj: {} 
    },
    {
      name:'armyAssignmentPage',
      identity: '/s2h',
      text: 'Điều binh',
      configObj: {} 
    },
    {
      name:'messageListPage',
      identity: '/messageList',
      text: 'Thư tín',
      configObj: {} 
    }

  ];
 

  //utility function for get the status of resources
  var _getResourceStatus = function(){
    var clauses = [
      {text:"Gỗ",img:"/sys/images/z/z_mu.gif"},
      {text:"Đá",img:"/sys/images/z/z_shi.gif"},
      {text:"Thuỷ tinh",img:"/sys/images/z/z_jing.gif"},
      {text:"Lúa",img:"/sys/images/z/z_liang.gif"}
    ]; 
    var resArray = [];
    for(var i=0;i<clauses.length;i++){
      var imgs = document.getElementsByTagName('img');
      var img = null;
      for(var j=0;j<imgs.length;j++){
        if(imgs[j].getAttribute("title") == clauses[i].text && imgs[j].getAttribute("src") == clauses[i].img){
          img = imgs[j];
          break;
        }
      }
      var count = parseInt(img.parentNode.childNodes[1].childNodes[0].innerHTML);
      var increase = parseInt(img.parentNode.childNodes[1].childNodes[2].childNodes[1].innerHTML);
      var obj = new Object();
      obj.text = clauses[i].text;
      obj.count = count;
      obj.increase = increase;
      resArray.push(obj);
    }
    return resArray;
  };
  var _getAreasByBuildingName_indexPage = function(buildingName){
    var areaTags = document.getElementsByTagName("area");
    var areas = [];
    for(var i=0;i<areaTags.length;i++){
      if(areaTags[i].getAttribute('title').indexOf(buildingName)>=0)
      areas.push(areaTags[i]);
    }
    return areas;
  }
  //handler functions for every page
  var handler_indexPage = function(objState){
    //reset all temp variables
    GM_setValue("ds_mapJumpOver_"+window.location.host,"");
    GM_setValue("ds_huntRuleCurrent_"+window.location.host,"");
    //get the current city id & index before do anythings.
    var currentCityID = 0;
    var citys = [];//city objects array,it's html object array
    var currentCityIndex = 0;//current city index
    citys = $x("//div[@class='col1']/div[@class='my_citys']/ul/li");
    //find out the currentCityIndex
    for(var i=0;i<citys.length;i++){
      var src = citys[i].childNodes[0].childNodes[0].getAttribute("src");
      if(src.indexOf("_on.gif")>-1){
        currentCityIndex = i;
        var link = citys[i].childNodes[0].getAttribute("href");
        currentCityID = link.substring(link.indexOf("vid=")+4);
        break;
      }
    }
    GM_setValue("ds_currentCityID",currentCityID); //set current city id for identify the current city.
    //check if current city is need to be ignored.
    if(CONFIG.enable_multiCity == true && citys.length > 1 && CONFIG.ignore_cityRules.length > 0){
      var cityName = citys[currentCityIndex].childNodes[0].getAttribute("title");
      var ignoreCurrentCity = false; // flag to determine whether ignore the current city
      for(var i=0;i<CONFIG.ignore_cityRules.length;i++){
        var rule = CONFIG.ignore_cityRules[i];
        if(cityName.indexOf(rule.cityName) > -1){
          ignoreCurrentCity = true;
          break;
        }
      }
      if(ignoreCurrentCity){
        //start to switch city logic code.
        if(currentCityIndex == (citys.length - 1)){
          currentCityIndex = 0;
        }else{
          currentCityIndex++;
        }
        var nextCityName = citys[currentCityIndex].childNodes[0].getAttribute("title");
        var link = citys[currentCityIndex].childNodes[0].getAttribute("href");
        log("Vì quy tắc hạn chế,Bỏ qua thành hiện tại'"+cityName+"',Chuyển sang thành khác'"+nextCityName+"'...");
        clickLink(link);
        return;
      }    
    }
    //detect idle hero,and assign them some task to do 
    var _assignmentHeroTask = function(){
      log("Đang sắp xếp hero xuất binh...");
      if(CONFIG.enable_huntRules == true && CONFIG.hunt_rules.length>0){
        var firstHero = $x("//ul[@class='hero_info']/li/h3")[0].innerHTML;
        //loop for check the rules of current hero
        for(var i=0;i<CONFIG.hunt_rules.length;i++){
          var rule = CONFIG.hunt_rules[i];
          if(firstHero.indexOf(rule.heroName)>-1){
            GM_setValue("ds_huntRuleCurrent_"+window.location.host,uneval(rule));
            break;
          }
        }
      }
      clickLink('/GameMap');//transition to state mapPage
    }
    var heros = $x("//ul[@class='hero_info']/li");
    if(heros.length > 1){
      var armys = $x("//ul[@class='hero_info']/li/a/img[@src='/sys/images/hero_none.gif']")[0].parentNode.parentNode;
      if(
        (CONFIG.enable_armyRules == true)
      && armys.getElementsByTagName('div').length>0
      && GM_getValue("ds_lastArmyAssignmentedHour_"+window.location.host+GM_getValue("ds_currentCityID")) != (new Date().getHours().toString()) 
      && CONFIG.army_rules.length > 0
      ){
        log("Phát hiện trong vòng 1 giờ chưa thực hiện điều binh,Đang tồn tại hero có thể xuất binh,Đang chuẫn bị điều binh...");
        GM_setValue("ds_armyAssignmented_"+window.location.host+GM_getValue("ds_currentCityID"),"");
        clickLink('/s2h');
      }else{
        if(CONFIG.enable_attackDelay != true){
          _assignmentHeroTask();
          return;
        }
        //check attack delay time
        var oldTimeStamp = GM_getValue("ds_heroAttackDelayTimeStamp_"+window.location.host+GM_getValue("ds_currentCityID"));
        if(oldTimeStamp == null || oldTimeStamp == ""){
          var randomTime = Math.random()*600000;
          randomTime = randomTime<300000?300000:randomTime;
          var delayToTime = parseInt(new Date().getTime())+randomTime;
          GM_setValue("ds_heroAttackDelayTimeStamp_"+window.location.host+GM_getValue("ds_currentCityID"),(delayToTime).toString());
          log("Hero mới đi về,cho nghỉ ngơi ít phút.Chậm lại"+(new Date(delayToTime)).toLocaleTimeString()+"Hero tiếp tục xuất binh..");
          window.setTimeout('window.location.href=""',randomTime);
          return;
        }else{
          var currentTime = parseInt(new Date().getTime());
          if(currentTime < parseInt(oldTimeStamp)){
            log("Thời gian dự định hero xuất binh:"+(new Date(parseInt(oldTimeStamp))).toLocaleTimeString()+"Vẫn chưa đến giờ，đợi...");
            window.setTimeout(function(){
              window.location.href="";
            },60000);
          }else{
            _assignmentHeroTask();
            return;
          }
        }
      }
      return;
    }
    GM_setValue("ds_heroAttackDelayTimeStamp_"+window.location.host+GM_getValue("ds_currentCityID"),"");
    //detect new messages,if new messages arrived , modify the open messagebox link to open unread message list.
    var msgs = $x("//img[@src='/sys/images/msg1.gif']");
    if(msgs.length > 0){
      log("Phát hiện thư chưa đọc, Nhưng đang buồn, Lần sau xem vậy...");
      if(makeDecision(0.5)){
        msgs[0].parentNode.setAttribute('href','/messageList?type=1&isread=0');
        log("Phát hiện thư chưa đọc,đang đọc...");
        clickLink("/messageList?type=1&isread=0");
        return;
      }
    }    
    //open Inn to resurrect heros, probability = 50%
    if(
      CONFIG.auto_resurrect == true
      && makeDecision(0.2)
    ){
      var areas = _getAreasByBuildingName_indexPage("Tửu quán");
      if(areas.length == 0){
        log("Không thể hồi sinh hero，Hãy xây tửu quán");
      }else{
        log("Tìm thấy tửu quán，đang vào");
        clickLink(areas[0].getAttribute('href'));//transition to state resurrect hero.
        return;
      }
    }

    //collect tax
   
if(GM_getValue("ds_taxCollected_"+window.location.host+GM_getValue("ds_currentCityID")) != (new Date()).toLocaleDateString()){
      var areas = _getAreasByBuildingName_indexPage("Tòa thị chính");
      if(areas.length == 0){
        log("Không tìm thấy toà thị chính？Bị phá bỏ àh！");
      }else{
        log("Tìm thấy toà thị chính，Đang vào xử lí");
        clickLink(areas[0].getAttribute('href'));//transition to state resurrect hero.
        return;
      }
    }
    
    //auto gamble
    if(CONFIG.auto_gamble == true && GM_getValue("ds_gambleOver_"+window.location.host) != (new Date()).toLocaleDateString()){   
      log("Hôm nay chưa đánh bạc,Đi xem thử...");
      clickLink("/gdpf");//transition to state resurrect hero.
      return;
    }
    //detect resource status, for upgrade and auto selling purpose
    var status = _getResourceStatus();
    //auto selling logic code
    if(CONFIG.enable_autoSellResource == true){
      if(status[0].count > CONFIG.resource_sellAmount
      || status[1].count > CONFIG.resource_sellAmount
      || status[2].count > CONFIG.resource_sellAmount
      || status[3].count > CONFIG.resource_sellAmount){
        log("Tài nguyên nhiều đem bán cho NPC thôi...");
        GM_setValue("ds_resourceSelled_"+window.location.host,"");
        clickLink("/resourcesell");
        return;
      }
    }
    //auto building logic code
    //{id:"1111",cityName:"屠龙者主城",buildingName:"Binh trường"}
    if(CONFIG.enable_buildingRules == true && CONFIG.building_rules.length > 0){
      var uls = $x("//ul[@class='bd_info']/li");
      if(uls.length < 2){
        var cityName = citys[currentCityIndex].childNodes[0].getAttribute("title");
        var rule = null;
        var ruleIdx = -1;
        for(var i=0;i<CONFIG.building_rules.length;i++){
          rule = CONFIG.building_rules[i];
          if(cityName.indexOf(rule.cityName) > -1){
            ruleIdx = i;
            break;
          }
        }
        if(ruleIdx == -1){ // no match building rule for current city
          log("Chưa đặt kiến trúc quy tắc cho thành thị này...");
        }else{
          //GM_setValue("ds_buildingRuleCurrent_"+window.location.host,uneval(rule));
          //code for get wether exists the building of current rule,if exists just upgrading...
          if(rule.buildingName == '' || rule.buildingName == null){
            log("Hiện đang chấp hành 当前执行的建造步骤中建筑物的名称为空,取消建造并删除当前步骤...");
            CONFIG.building_rules.remove(ruleIdx);
            GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
            clickLink("/mindex");
            return;
          }else{
            var areas = _getAreasByBuildingName_indexPage(rule.buildingName);
            var link = '';
            if(areas.length == 0){
              log("Không tồn tại kiến trúc được chỉ định xây dựng'"+rule.buildingName+"',Đang vào quá trình kiến trúc phải xây dựng..");
              areas = _getAreasByBuildingName_indexPage("Đất trống");
              if(areas.length == 0){
                log("Thành thị không tồn tại kiến trúc đang chọn'"+rule.buildingName+"',Hiện giờ không còn đất trống để xây dựng, thao tác xây dựng có lỗi, Huỷ thao tác xây dựng...");
                CONFIG.building_rules.remove(ruleIdx);
                GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
                clickLink("/mindex");
                return;
              }
            }else{
              log("Đã tồn tại kiến trúc này'"+rule.buildingName+"',Tiến hành up kiến trúc này...");
            }
            GM_setValue("ds_buildingRuleCurrent_"+window.location.host,uneval(rule));
            clickLink(areas[0].getAttribute("href"));
            return;
          }       
        }
      }else{
        log("Hiện tại danh sách xây dựng đã đầy, Không thể tiến hàng thao tác tiếp theo!");
      }
    }
    //switch city to management
    if(CONFIG.enable_multiCity == true && citys.length > 1){
      //start to switch city logic code.
      if(currentCityIndex == (citys.length - 1)){
        currentCityIndex = 0;
      }else{
        currentCityIndex++;
      }
      var cityName = citys[currentCityIndex].childNodes[0].getAttribute("title");
      var link = citys[currentCityIndex].childNodes[0].getAttribute("href");
      log("Thành thị hiện tại đã được xử lí xong, đợi 5-10 phút chuyển đến thành tiếp theo'"+cityName+"'...");
      var randomTime = Math.random()*600000;
      randomTime = randomTime<300000?300000:randomTime;
      window.setTimeout(function(){
        window.location.href = link;
      },randomTime);
      return;
    }

    //stay at index page and keep checking the conditions 
    log("Không tìm thấy công việc để xử lí 未发现任何需要处理的逻辑");
    var randomTime = Math.random()*600000;
    randomTime = randomTime<300000?300000:randomTime;
    window.setTimeout('window.location.href=""',randomTime);
  }

  var handler_buildingPage = function(objState){

    var elem = $x('//div[@class="container"]/div[@class="col2"]/h1')[0];
    var title = "";
    if(elem != null)
    title = elem.innerHTML;
    //logic code for auto building..
    if(GM_getValue("ds_buildingRuleCurrent_"+window.location.host) != null && GM_getValue("ds_buildingRuleCurrent_"+window.location.host) != ""){
      var currentBuildingRule = eval("("+GM_getValue("ds_buildingRuleCurrent_"+window.location.host)+")");
      log("针对建筑物'"+currentBuildingRule.buildingName+"',进入建造/升级过程...");  
      var link = null;
      //find out the "Xây" link
      if(title == "Xây kiến trúc mới"){
        //create new building logic
        var titleH2s = $x("//div[@class='b_block']/h2");
        for(var i=0;i<titleH2s.length;i++){
          if(titleH2s[i].innerHTML == currentBuildingRule.buildingName){
            var links = titleH2s[i].parentNode.getElementsByTagName('a');
            for(var j=0;j<links.length;j++){
              if(links[j].innerHTML == 'Xây'){
                link = links[j];
                break;
              }
            }
            break;
          }
        }
      }else{
        var links = document.getElementsByTagName('a');
        for(var i=0;i<links.length;i++){
          if(links[i].innerHTML == 'Xây'){
            link = links[i];
            break;
          }
        }
      }
      //remove current rule from auto building queue.
      var ruleIdx = -1;
      for(var i=0;i<CONFIG.building_rules.length;i++){
        var rule = CONFIG.building_rules[i];
        if(currentBuildingRule.cityName == rule.cityName && currentBuildingRule.buildingName == rule.buildingName){
          ruleIdx = i;
          break;
        }
      }
      if(ruleIdx != -1){
        CONFIG.building_rules.remove(ruleIdx);
        GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
      }
      GM_setValue("ds_buildingRuleCurrent_"+window.location.host,"");
      //if the link exists,click it. else push it to the end of the queue
      if(link != null){
        var randomTime = Math.random()*5000;
        randomTime = randomTime<1000?1000:randomTime;
        window.setTimeout(function(){
          var evt = document.createEvent("MouseEvents");  
          evt.initEvent("click",true,true);  
          link.dispatchEvent(evt);   
        },randomTime);
      }else{
        log("Không thể hoàn thành yêu cầu xây dựng, Có thể thứ tự xây dựng mâu thuẩn, không đáp ứng điều kiện kiến trúc cần xây, hoặc kiến trúc đang được xây dựng, hoặc tài nguyên không đủ. Thao tác này chuyển về lượt cuối tiến hành...");
        if(currentBuildingRule["failed"] == null){
          currentBuildingRule["failed"] = 1;        
          CONFIG.building_rules.push(currentBuildingRule);
          GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
        }else{
          var failedCount =  parseInt(currentBuildingRule["failed"]);
          if(failedCount < 3){
            currentBuildingRule["failed"] = (failedCount+1).toString();
            CONFIG.building_rules.push(currentBuildingRule);
            GM_setValue("ds_CONFIG_"+window.location.host,uneval(CONFIG));
          }else{
            log("Thao tác xây dựng thất bại lần 4, Tự động huỷ thao tác chờ...");
          }
        }
        clickLink("/mindex");
      }
      return;
    }
    //logic code for resurrect hero
    if(title.indexOf("Tửu quán")>=0){ //Inn page
      //to resurrect heros
      log("Vào tửu quán , bắt đầu hồi sinh hero...");
      var links = document.getElementsByTagName('a');
      var link = null;
      for(var i=0;i<links.length;i++){
        if(links[i].innerHTML == 'Hồi sinh'){
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
        log("Không có hero cần hồi sinh");
        clickLink("/mindex");
        return;
      }
    }
    //logic code for collect tax
    
    if(title.indexOf("Tòa thị chính")>=0)
    { //city hall
      log("Vào toà thị chính，Bắt đầu thu thuế...");
      var links = document.getElementsByTagName('a');
      var link = null;
      for(var i=0;i<links.length;i++)
      {
        if(links[i].innerHTML == 'Thu thuế')
        {
          link = links[i];
          break;
        }
      }
      if(link != null)
      {
        clickLink(link);
        return;
      }
      else
      {
        log("Đang vào toà thị chinh，đã thu thuế.");
        GM_setValue("ds_taxCollected_"+window.location.host+GM_getValue("ds_currentCityID"),(new Date()).toLocaleDateString());
        clickLink("/mindex");
        return;
      }
    }
    
    log("Đối với tiêu đề kiến trúc 对于建筑物标题'"+title+"'không có yêu cầu có thể đáp ứng，thoát ra trang chủ");
    clickLink("/mindex");//transition to the state indexPage
  }
  
  // gloable variables
  // ds_mapJumpOver
  var handler_mapPage = function(objState){
    if(GM_getValue("ds_mapJumpOver_"+window.location.host) == null
    || GM_getValue("ds_mapJumpOver_"+window.location.host) == ''){
      //calculate jump target postions
      var PI = 3.1415926;
      var isFixRadius = CONFIG.fix_radius;
      var huntRadius = CONFIG.hunt_radius;
      //huntRadius = huntRadius*4;//convert hunt_radius from screen to coordinate system.
      var currentHuntRule = GM_getValue("ds_huntRuleCurrent_"+window.location.host);
      if(currentHuntRule != null && currentHuntRule != ''){
        //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
        currentHuntRule = eval('('+currentHuntRule+')');
        isFixRadius = currentHuntRule.fixRadius;
        huntRadius = currentHuntRule.radius;
        log("Đang theo quy tắc thiết lập, vì thế<strong>"+currentHuntRule.heroName+"</strong>Chuyển đến"+currentHuntRule.radius.toString()+"屏左右的地区.");
      }
      var curX = parseInt($x('//input[@name="xp"]')[0].value);
      var curY = parseInt($x('//input[@name="yp"]')[0].value);
      var randomX,randomY,tarX,tarY;
      if(isFixRadius){ //fix radius logic
        var angle = Math.random()*2*PI;
        randomX = parseInt(Math.cos(angle)*huntRadius);
        randomY = parseInt(Math.sin(angle)*huntRadius);
      }else{
        var angle = Math.random()*2*PI;
        huntRadius = Math.random()*huntRadius;
        randomX = parseInt(Math.cos(angle)*huntRadius);
        randomY = parseInt(Math.sin(angle)*huntRadius);
      }
      tarX = curX + randomX;
      tarY = curY + randomY;
      //jump to target positions and set ds_mapJumpOver
      GM_setValue("ds_mapJumpOver_"+window.location.host,"YES");
      clickLink("/GameMap?xp=" + tarX + "&yp=" + tarY);
    }else{
      //collect the valuable resources
      if(CONFIG.enable_mapLog == true)
        _collect_valuableResource();
      //pick up a random place to hunt or attack.follow the primary order.
      //demon > demon city > wild 
      var link = "";
      var targets = [];
      var attackWild = CONFIG.attack_wild;
      var attackDevil = CONFIG.attack_evilCity;
      var attackWheel = CONFIG.attack_wheel;
      var currentHuntRule = GM_getValue("ds_huntRuleCurrent_"+window.location.host);
      if(currentHuntRule != null && currentHuntRule != ''){
        //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
        currentHuntRule = eval('('+currentHuntRule+')');
        switch(currentHuntRule.target){
          case 'wild':
            attackWild = true;
            attackDevil = attackWheel = false;
          break;
          case 'devil':
            attackDevil = true;
            attackWild = attackWheel = false;
          break;
          case 'wheel':
            attackWheel = true;
            attackDevil = attackWild = false;
          break;
        }
        log("Đang theo quy tắc thiết lập, vì thế<strong>"+currentHuntRule.heroName+"</strong>Chọn địa điểm được quy tắc thiết lập.");
      }
      //wild place
      if(attackWild){
        var random = Math.random() * 100;
        var direction = "c4";
        //这段是玩家海拉斯特贡献的代码,特此感谢
        if(random >= 0 && random <= 25){
          direction = "c2";//forest
        }else if (random > 25 && random <= 50){
          direction = "c3";//country
        }else if (random > 50 && random <= 75){
          direction = "c4";//marsh
        }else if (random > 75 && random <= 100){
          direction = "c5";//plain
        }
        targets = $x("//img[@src='/sys/images/c/"+direction+".gif']");
      }
      //devil city
      if(attackDevil){
        if($x("//img[@src='/sys/images/c/c6.gif']").length != 0)
          targets = $x("//img[@src='/sys/images/c/c6.gif']");
      }
      //unvisited wheel 
      if(attackWheel){
        if($x("//img[@src='/sys/images/c/c11.gif']").length != 0
        &&$x("//img[@src='/sys/images/c/c11.gif']")[0].parentNode.childNodes.length < 2){
          targets = $x("//img[@src='/sys/images/c/c11.gif']");
        }
        if($x("//img[@src='/sys/images/c/c12.gif']").length != 0
        &&$x("//img[@src='/sys/images/c/c12.gif']")[0].parentNode.childNodes.length < 2){
          targets = $x("//img[@src='/sys/images/c/c12.gif']");
        }
      }
      
      if(targets.length != 0){
        var xyPosition = "";
        var showCityInfo = function(pos){
          xyPosition = pos;
        };
        //随机对象抽取代码,由玩家海拉斯特贡献
        var iTarget = Math.round(Math.random()* targets.length - 0.5);
        eval(targets[iTarget].parentNode.getAttribute('onmouseover'));
        link = targets[iTarget].parentNode.getAttribute('href');
        //cache for target list
        var targetList = null;
        if(GM_getValue("ds_lastVisitedPositionList_"+window.location.host) != null && GM_getValue("ds_lastVisitedPositionList_"+window.location.host) != ""){
          targetList = eval("(" + GM_getValue("ds_lastVisitedPositionList_"+window.location.host) + ")");
          if(targetList.ts != (new Date().getHours().toString())){
            targetList = {ts:new Date().getHours().toString(),targets:[]};
          }
        }else{
          targetList = {ts:new Date().getHours().toString(),targets:[]};
        }      
        if(targetList.targets.exists(xyPosition) == -1){   
          GM_setValue("ds_mapJumpOver_"+window.location.host,"");
          targetList.targets.push(xyPosition);
          GM_setValue("ds_lastVisitedPositionList_"+window.location.host,uneval(targetList));
          clickLink(link);
          return;
        }else{
          log("Trong thời gian ngắn tìm thấy mục tiêu được tấn công qua, huỷ thao tác tấn công, tiếp tục tìm kiếm trong map...");
          GM_setValue("ds_mapJumpOver_"+window.location.host,"");
          GM_setValue("ds_lastVisitedPositionList_"+window.location.host,uneval(targetList));
          clickLink("/GameMap");
          return;
        }      
      }else{
        log("không tìm thấy mục tiêu có thể tấn công trong bản đồ，Tiếp tục tìm kiếm...");
        clickLink("/GameMap");
        GM_setValue("ds_mapJumpOver_"+window.location.host,"");
      }
    }
  }
  //utility function for collect valuable resource when jumping the map
  var _collect_valuableResource = function(){
    //logic code to search current map for target and record them in a object to deserialize to a string for storage.
    var reportHTML = GM_getValue('ds_mapLog_'+window.location.host);
    if(reportHTML == null)  reportHTML = '';
    var imgs = document.getElementsByTagName('img');
    for(var i=0;i<imgs.length;i++){
      //dummy function to retrieve the informations
      //exp. showCityInfo('-17|-228','Nông trường','zj892','25 / giờ','ＤｒｅａｍＳｋｙ');
      var positionX = 0;
      var positionY = 0;
      var text = '';
      var productivity = 0 ;
      var showCityInfo = function(strPos,strText,strOwner,strProductivity,strAilliance){
        positionX = parseInt(strPos.split('|')[0]);
        positionY = parseInt(strPos.split('|')[1]);
        text = strText;
        productivity = parseInt(strProductivity.split('/')[0].substring(0,strProductivity.split('/')[0].length - 1));
      };
      //130 Tài nguyên
      if(imgs[i].getAttribute('src') == '/sys/images/c/c10.gif'
      || imgs[i].getAttribute('src') == '/sys/images/c/c7.gif'
      || imgs[i].getAttribute('src') == '/sys/images/c/c9.gif'
      || imgs[i].getAttribute('src') == '/sys/images/c/c8.gif'
      ){
        var link = imgs[i].parentNode;
        var taken = "";
        if(link.parentNode.childNodes.length > 1) taken = "(Chiếm)";
        eval(link.getAttribute('onmouseover'));
        if(productivity > 25)
          reportHTML += '<li><a href="/GameMap?xp=' + positionX + '&yp=' + positionY + '" style="color:#993300">' + taken + text + ':' + productivity.toString() + '</a></li>';
      }
      //Guồng/cối xây chưa thám hiểm
      if(imgs[i].getAttribute('src') == '/sys/images/c/c11.gif' || imgs[i].getAttribute('src') == '/sys/images/c/c12.gif'){
        if(imgs[i].parentNode.childNodes.length < 2){
          var link = imgs[i].parentNode;
          eval(link.getAttribute('onmouseover'));
          reportHTML += '<li><a href="/GameMap?xp=' + positionX + '&yp=' + positionY + '" style="color:#993300;font-weight:bold;">Guồng/cối xây chưa thám hiểm</a></li>';
        }
      }
      GM_setValue('ds_mapLog_'+window.location.host,reportHTML);
    }
  }
  
  var handler_mapInfoPage = function(objState){
    var lis = $x("//div[@class='cz_info']/ul")[0].getElementsByTagName("li");
    if(lis[0].innerHTML.indexOf("Số lần đi săn") >= 0){ //the place has been visited,so re-select the target place
      log("Mục tiêu được chọn đã săn qua，tiếp tục tìm mục tiêu khác...");
      clickLink("/GameMap");
      return;
    }
    var link = "";
    var links = $x("//div[@class='col1']")[0].getElementsByTagName('a');
    var currentHuntRule = GM_getValue("ds_huntRuleCurrent_"+window.location.host);
    if(currentHuntRule != null && currentHuntRule != ''){
      //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
      currentHuntRule = eval('('+currentHuntRule+')');
      log("Đang theo quy tắc thiết lập, vì thế<strong>"+currentHuntRule.heroName+"</strong>Chọn phương thức xuất quân theo quy tắc thiết lập.");
    }
    for(var i=0;i<links.length;i++){
      if(currentHuntRule != null && currentHuntRule != '' && currentHuntRule.target == 'wild' && currentHuntRule.attackType == 'collect'){
        if(links[i].innerHTML == 'Thu thập'){
          link = links[i].getAttribute('href');
          break;
        }
      }else{
        if(links[i].innerHTML == 'Đi săn' || links[i].innerHTML == 'Xuất quân' || links[i].innerHTML == 'Thám hiểm'){
          link = links[i].getAttribute('href');
          break;
        }
      }
    }
    if(link != "")
      clickLink(link);
    else{
      log("Không tìm thấy trong bản đồ thao tác có thể thực hiện，chuyển đến trang chủ...");
      clickLink("/mindex");
    }
  }

  var handler_attackPage = function(objState){
    if(window.location.search == ""){
      //encount error , hero couldn't attack that place because out of food
      if($x('//div[@class="attack"]/p[@class="msg"]').length > 0 
      && $x('//div[@class="attack"]/p[@class="msg"]')[0].innerHTML != ""){
        log($x('//div[@class="attack"]/p[@class="msg"]')[0].innerHTML + "，Chuyển đến trang chủ bắt đầu lại quá trình");
        clickLink("/mindex");
        return;
      }
      //direct to submit the last step for attack
      var btn = $("fbsb2");
      $('s2t').action='/s2t';
      btn.disabled=true;
      var randomTime = Math.random()*15000;
      randomTime = randomTime<3000?3000:randomTime;
      window.setTimeout(function(){
        GM_setValue("ds_huntRuleCurrent_"+window.location.host,"");
        $('fbbtn').click();//auto transition to the start state,server will redirect the page to mindex page
      },randomTime);
      return;
    }
    var inputs = $x("//input[@name='heroid']");
    if(inputs.length != 0){
      var iptHero = inputs[0];
      var currentHuntRule = GM_getValue("ds_huntRuleCurrent_"+window.location.host);
      if(currentHuntRule != null && currentHuntRule != ''){
        //{id:"1111",heroName:"苦托斯",radius:2,fixRadius:false,target:"wild/devil/wheel",attackType:"attack/collect"}
        currentHuntRule = eval('('+currentHuntRule+')');
        log("Đang theo quy tắc thiết lập, Chọn hero<strong>"+currentHuntRule.heroName+"</strong>Xuất quân, nếu không tìm thấy hero đã lập, sẽ chọn hero đầu tiên xuất quân.");
        for(var i=0;i<inputs.length;i++){
          var hero = inputs[i].parentNode.getElementsByTagName("h3")[0];
          if(hero.innerHTML.indexOf(currentHuntRule.heroName)>-1){
            iptHero = inputs[i];
            break;
          }
        }
      }
      iptHero.checked = true;
      var randomTime = Math.random()*15000;
      randomTime = randomTime<3000?3000:randomTime;
      window.setTimeout(function(){
        //transition to next state
        $x("//form[@action='/a2t']")[0].submit();
      },randomTime);
      return;
    }
    log("Không có hero để xuất quân，chuyển đến trang chủ...");
    clickLink("/mindex");
  }
  
  var handler_gamblePage = function(objState){
    //check whether hero can go into the Gamble room
    var btn = $x("//div[@class='jgdb']/form/p/input[@value='开']")[0];
    if(btn == null){
      log("Sorry, bạn không có hero đủ level tham gia đánh bạc, tối thiểu hero lv5. Chuyển đến trang chủ...");
      GM_setValue("ds_gambleOver_"+window.location.host,(new Date()).toLocaleDateString());
      clickLink("/mindex");
      return;
    }
    //check whether you have complete the gamble today
    var msg = $x("//div[@class='jgdb']/p[@class='msg']")[0];
    if(msg != null && msg.innerHTML == 'Bạn hôm nay không thể chơi tiếp được。'){
      log("Sorry, hôm nay phiên đánh bạc đã xong. Chuyển đến trang chủ...");
      GM_setValue("ds_gambleOver_"+window.location.host,(new Date()).toLocaleDateString());
      clickLink("/mindex");
      return;
    }
    //start gamble logic
    log("Vào tửu quán đánh bạc..good luck!");
    //<img title="Bạc" src="/sys/images/z/z_yin.gif"/>
    var imgs = document.getElementsByTagName('img');
    var img = null;
    for(var i=0;i<imgs.length;i++){
      if(imgs[i].getAttribute("title") == 'Bạc' && imgs[i].getAttribute("src") == "/sys/images/z/z_yin.gif"){
        img = imgs[i];
        break;
      }
    }
    if(img == null){
      log("Không thế lấy thông tin số vàng của bạn, chuyển đến trang chủ...");
      GM_setValue("ds_gambleOver_"+window.location.host,(new Date()).toLocaleDateString());
      clickLink("/mindex");
      return;
    }
    var coinCount = parseInt(img.parentNode.childNodes[0].nodeValue.toString());
    //str = str.substring(0,str.indexOf("<br/>"));
    if(coinCount > 120){
      log("Ok man, Chúng ta đánh nhé!");
    }else{
      log("Có vẻ bạn hơi xui, thôi thì đợi gold lớn hơn 120 quay lại đánh, chuyển đến trang chủ...");
      GM_setValue("ds_gambleOver_"+window.location.host,(new Date()).toLocaleDateString());
      clickLink("/mindex");
      return;
    }
    
    var random = Math.random()*10;
    var id = "";
    if(random>=0&&random<=1){
      id = "b3";
    }else if(random>1&&random<=5.5){
      id = "b1";
    }else{
      id = "b2";
    }
    document.getElementById(id).checked = true;
    log("Đã đặt, đợi kết quả...");
    //clickLink("");
    var submitForm = $x("//div[@class='jgdb']/form")[0];
    if(submitForm != null){
      var randomTime = Math.random()*10000;
      randomTime = randomTime<2000?2000:randomTime;
      window.setTimeout(function(){
        submitForm.submit();
      },randomTime);
    }else{
      log("Không tìm thấy button mở bài, hệ thống có lỗi...quay về trang chủ...");
      GM_setValue("ds_gambleOver_"+window.location.host,(new Date()).toLocaleDateString());
      clickLink("/mindex");
      return;
    }
  }
  
  var handler_resourceSellPage = function(objState){
    if(CONFIG.enable_autoSellResource != true){
      log("Bạn chưa thiết lập nguyên tắc cho phép bán tài nguyên, không có thao tác tiếp theo, chuyển đến trang chủ...");
      clickLink("/mindex");
      return;
    }
    if(GM_getValue("ds_resourceSelled_"+window.location.host) != null && GM_getValue("ds_resourceSelled_"+window.location.host) != ''){
      log("Tài nguyên đã được tự động bán, chuyển đến trang chủ...");
      clickLink('/mindex');
      return;
    }
 
    var forms = $x("//div[@class='m_area']/form");
    forms[0].setAttribute("onsubmit","");
    var trs = $x("//table[@id='ct3']/tbody/tr");

    var resStatus = _getResourceStatus();
    for(var i=1;i<trs.length;i++){
      var count = resStatus[i-1].count - CONFIG.resource_sellAmount;
      if(count > 0){
        count = count + 1000 // offset value for infinite loop
        var ipt = trs[i].childNodes[3].childNodes[0];
        ipt.value = count;
      }
    }
    log("Tài nguyên được treo lên chợ, đang giao dịch...");
    var randomTime = Math.random()*15000;
    randomTime = randomTime<3000?3000:randomTime;
    window.setTimeout(function(){
      GM_setValue("ds_resourceSelled_"+window.location.host,"true");
      $x('//input[@value="Bán"]')[0].click();//auto transition to the start state,server will redirect the page to mindex page
    },randomTime);

  }

  var _setUIBySoldierInfo = function(soldierInfo){
    var lis = $x("//ul[@id='all_soldier']/li");
    for(var i=0;i<lis.length;i++){
      if(soldierInfo.name == lis[i].getAttribute("title")){
        lis[i].childNodes[1].innerHTML = soldierInfo.count.toString();
      }
    }
  }
  var _collectArmyInfo = function(){
    //collect army info
    var soldierInfos = []; //{name:"Sư tụ",count:10,sysName:"s_1_3"};
    var lis = $x("//ul[@id='all_soldier']/li");
    for(var i=0;i<lis.length;i++){
      var soldierInfo = {};
      soldierInfo.name = lis[i].getAttribute("title");
      soldierInfo.count = parseInt(lis[i].childNodes[1].innerHTML);
      soldierInfo.sysName = lis[i].getElementsByTagName('input')[0].getAttribute("id");
      soldierInfos.push(soldierInfo);
    }
    return soldierInfos;
  }
  var handler_armyAssignmentPage_average = function(objState){
    //do army assignment
    var rules = CONFIG.army_rules;
    for(var i=0;i<rules.length;i++){ // loop for rules
      var rule = rules[i]; //{id:"1111",heroName:"亏托斯",armyType:"鬼魂",armyCount:100}
      //find hero 
      var heros = $x("//div[@class='hero_army']");
      var tarHero = null;
      for(var j=0;j<heros.length;j++){
        if(heros[j].getElementsByTagName("h3")[0].innerHTML.indexOf(rule.heroName)>=0)
          tarHero = heros[j];
      }
      if(tarHero == null) continue; // no hero match current rule,jump to next loop
      //clear all slots for current hero
      var liSlots = tarHero.getElementsByTagName('li');
      for(var j=0;j<liSlots.length;j++){
        if(liSlots[j].getAttribute('class') == 'on'){ // update exists army assignment.
          var link = liSlots[j].firstChild;
          var evt = document.createEvent("MouseEvents");  
          evt.initEvent("click",true,true);  
          link.dispatchEvent(evt);
        }
      }
      var soldierInfos = _collectArmyInfo();
      var soldierInfo = soldierInfos.getObjectByProperty("name",rule.armyType);//{name:"Sư tụ",count:10,sysName:"s_1_3"};
      if(soldierInfo == null) continue; // no soldier match current rule,jump to next loop
      if(soldierInfo.count == 0) continue;
      var strCapacity = tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML;
      var heroCapacity = parseInt(strCapacity.split('/')[1]);
      var slotsCount = liSlots.length;
      var finalArmyCount = rule.armyCount;
      if(soldierInfo.count < finalArmyCount) finalArmyCount = soldierInfo.count;
      if(heroCapacity < finalArmyCount) finalArmyCount = heroCapacity;
      var averageCount = parseInt(finalArmyCount/slotsCount);
      var modCount = finalArmyCount%slotsCount;
      //do army assignment
      for(var j=0;j<liSlots.length;j++){
        var liSlot = liSlots[j];
        if(j<modCount){
          liSlot.childNodes[2].value = (averageCount+1).toString();
        }else{
          liSlot.childNodes[2].value = averageCount.toString();
        }
        liSlot.childNodes[1].setAttribute('title',soldierInfo.name);
        liSlot.childNodes[1].setAttribute('src','/sys/images/s/'+soldierInfo.sysName+'.gif');
        liSlot.childNodes[3].value = soldierInfo.sysName+'.gif';
        liSlot.setAttribute('class','on');
      }
      soldierInfo.count -= finalArmyCount;
      _setUIBySoldierInfo(soldierInfo);
    } // loop for rules

    //logic code for submit the assignments.
    GM_setValue("ds_armyAssignmented_"+window.location.host+GM_getValue("ds_currentCityID"),"true");
    GM_setValue("ds_lastArmyAssignmentedHour_"+window.location.host+GM_getValue("ds_currentCityID"),(new Date().getHours().toString()));
    var randomTime = Math.random()*15000;
    randomTime = randomTime<3000?3000:randomTime;
    window.setTimeout(function(){
      document.getElementById('fbbtn').click();
    },randomTime);

  }
  var handler_armyAssignmentPage = function(objState){
    if(GM_getValue("ds_armyAssignmented_"+window.location.host+GM_getValue("ds_currentCityID")) != null && GM_getValue("ds_armyAssignmented_"+window.location.host+GM_getValue("ds_currentCityID")) != ''){
      log("Điều quân đã xong, chuyển đến trang chủ...");
      clickLink('/mindex');
      return;
    }
    if(CONFIG.enable_armyRulesAverage == true){
      return handler_armyAssignmentPage_average(objState);
    }
    //collect army info
    var soldierInfos = []; //{name:"Sư tụ",count:10,sysName:"s_1_3"};
    var lis = $x("//ul[@id='all_soldier']/li");
    for(var i=0;i<lis.length;i++){
      var soldierInfo = {};
      soldierInfo.name = lis[i].getAttribute("title");
      soldierInfo.count = parseInt(lis[i].childNodes[1].innerHTML);
      soldierInfo.sysName = lis[i].getElementsByTagName('input')[0].getAttribute("id");
      soldierInfos.push(soldierInfo);
    }
    //do army assignment
    var rules = CONFIG.army_rules;
    for(var i=0;i<rules.length;i++){ // loop for rules
      var rule = rules[i]; //{id:"1111",heroName:"亏托斯",armyType:"鬼魂",armyCount:100}
      var soldierInfo = soldierInfos.getObjectByProperty("name",rule.armyType);
      if(soldierInfo == null) continue; // no soldier match current rule,jump to next loop
      if(soldierInfo.count == 0) continue;
      //find hero 
      var heros = $x("//div[@class='hero_army']");
      var tarHero = null;
      for(var j=0;j<heros.length;j++){
        if(heros[j].getElementsByTagName("h3")[0].innerHTML.indexOf(rule.heroName)>=0)
          tarHero = heros[j];
      }
      if(tarHero == null) continue; // no hero match current rule,jump to next loop
      //check hero army capacity
      var strCapacity = tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML;
      var currentNum = parseInt(strCapacity.split('/')[0]);
      var maxNum = parseInt(strCapacity.split('/')[1]);
      var freeNum = maxNum - currentNum;
      if(freeNum <= 0) continue; // user contains no free capacity for more army assignments.
      //check existing army slots for current rule
      var liSlots = tarHero.getElementsByTagName('li');
      for(var j=0;j<liSlots.length;j++){ // loop for target hero army slots
        var liSlot = liSlots[j];
        if(liSlot.getAttribute('class') == 'on'){ // update exists army assignment.
          var soldierName = liSlot.childNodes[1].getAttribute('title');
          if(soldierName != rule.armyType) continue; // soldierName not matched, into next slot loop
          var soldierCount = parseInt(liSlot.childNodes[2].value);
          if(soldierCount >= rule.armyCount) break; // soldierCount already match the rule's requirment,so just into next rule loop
          var needCount = 0;
          if(rule.armyCount - soldierCount >= freeNum){
            needCount = freeNum;
          }else{
            needCount = rule.armyCount - soldierCount;
          }
          if(currentNum + needCount > maxNum){
            needCount = maxNum - currentNum;
          }
          if(needCount >= soldierInfo.count){
            liSlot.childNodes[2].value = (soldierCount + soldierInfo.count).toString();
            soldierInfo.count = 0;
            tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML = (currentNum + soldierInfo.count).toString() + '/' + maxNum;
          }else{
            liSlot.childNodes[2].value = (soldierCount + needCount).toString();
            soldierInfo.count = soldierInfo.count - needCount;
            tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML = (currentNum + needCount).toString() + '/' + maxNum;
          }   
          break;       
        }else{ // add new army assignments;
          var needCount = 0;
          if(rule.armyCount > freeNum){
            needCount = freeNum;
          }else{
            needCount = rule.armyCount;
          }
          if(currentNum + needCount > maxNum){
            needCount = maxNum - currentNum;
          }
          if(needCount >= soldierInfo.count){
            liSlot.childNodes[2].value = soldierInfo.count.toString();
            soldierInfo.count = 0;
            tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML = (currentNum + soldierInfo.count).toString() + '/' + maxNum;
          }else{
            liSlot.childNodes[2].value = needCount.toString();
            soldierInfo.count = soldierInfo.count - needCount;
            tarHero.getElementsByTagName("p")[0].childNodes[1].innerHTML = (currentNum + needCount).toString() + '/' + maxNum;
          }
          liSlot.childNodes[1].setAttribute('title',soldierInfo.name);
          liSlot.childNodes[1].setAttribute('src','/sys/images/s/'+soldierInfo.sysName+'.gif');
          liSlot.childNodes[3].value = soldierInfo.sysName+'.gif';
          liSlot.setAttribute('class','on');
          break;
        }
        
      } // end loop for target hero army slots

    } // end loop for rules
    
    //logic code for submit the assignments.
    GM_setValue("ds_armyAssignmented_"+window.location.host+GM_getValue("ds_currentCityID"),"true");
    GM_setValue("ds_lastArmyAssignmentedHour_"+window.location.host+GM_getValue("ds_currentCityID"),(new Date().getHours().toString()));
    var randomTime = Math.random()*15000;
    randomTime = randomTime<3000?3000:randomTime;
    window.setTimeout(function(){
      document.getElementById('fbbtn').click();
    },randomTime);
    
  }
  
  var handler_messageListPage = function(objState){
    var query = window.location.search;
    if(query == "?type=1&isread=0"){ //in list page
      var trs = $x("//table[@id='ct1']/tbody/tr");
      if(trs.length >2){
        var link = trs[1].childNodes[2].childNodes[0].getAttribute("href");
        var title = trs[1].childNodes[2].childNodes[0].innerHTML;
        log("Đang đọc tin: '"+title+"', chuyển đến trang chủ...");
        clickLink(link);      
      }else{
        log("Đã đọc xong, chuyển về trang chủ...");
        clickLink("/mindex");
      }
      return;
    }
    if(query.indexOf("eventSubmit_detail=true")>-1){ // in message content page
      log("Đọc xong tin, chuyển đến tin chưa đọc...");
      clickLink("/messageList?type=1&isread=0");
      return;
    }
    log("Trang tin tức không tìm thấy thao tác tiếp theo, chuyển về trang chủ...");
    clickLink("/mindex");
    
  }
  
  
  var url = window.location.pathname.toString();
  var identified = false;
  for(var i=0;i<states.length;i++){
    var state = states[i];
    if(url == state.identity){
      log("vào"+state.text+"xử lí 处理逻辑");
      identified = true;
      var func = eval('handler_' + state.name);
      func.apply(window,[state]);
      break;
    }
  }
  if(!identified){
    log('Không thể xử lí trang hiện tại，xin click chuyển về trang chủ！');
  }

},false);