// ==UserScript==
// @name          Dragon Slayer - Auto Hunt
// @namespace     http://www.riaexpert.net/
// @description   Automation scripts to for game www.qilongji.com.
// @include       http://d*.duniu.com/*
// ==/UserScript==

addEventListener('load', function(event){
  test = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
  if(test.indexOf(" <!-- ERROR ITEM CONTAINER") != -1){
  		window.location.reload();
  }
	var randomTimespan = Math.random() * 20000;
  //render information bar
  var info = document.createElement('div');
  info.style.backgroundColor = 'red';
  info.style.color = 'white';
  info.style.position = "absolute";
  info.style.right = "10px";
  info.style.top = "20px";
  info.innerHTML = "屠龙者 alpha - 自动狩猎";
  document.body.appendChild(info);
  var msg = document.createElement('div');
  msg.style.backgroundColor = 'red';
  msg.style.color = 'white';
  msg.style.position = "absolute";
  msg.style.right = "10px";
  msg.style.top = "40px";
  msg.innerHTML = "状态: " + GM_getValue("qilongAutoStatus");
  document.body.appendChild(msg);
  
  window.setTimeout(function(){

    var handler_jumpToMindex = function(){
      window.location.href = "/mindex";
    }
    var handler_findInn = function(){
      var areas = document.getElementsByTagName('area');
      for(var i=0;i<areas.length;i++){
        var area = areas[i];
        if(area.getAttribute('title').indexOf('酒馆')>=0){
          window.location.href = area.getAttribute('href');
          return;
        }
      }
      throw 'You don\'t have Inn to resurrect hero.skip resurrect step';
    }
    var handler_resurrectHero = function(){
      //code to fix document.ResurrectionForm issues.
      var forms = document.getElementsByTagName('form');
      for(var i=0;i<forms.length;i++){
        if(forms[i].name.indexOf('ResurrectionForm')>=0){
          document.ResurrectionForm = forms[i];
        }
      }

      var links = document.getElementsByTagName('a');
      for(var i=0;i<links.length;i++){
        if(links[i].innerHTML == '复活'){
          try{
            eval('var func = function(){'+links[i].getAttribute('onclick')+'}');
            //console.log('function is: ',func);
            func.apply(window,[]);
          }catch(e){
            //console.log('error is:',e);
          }

          return;
        }
      }
      window.location.href = "";//no hero to resurrect
    }

    var handler_jumpToMap = function(){
      window.location.href = "/GameMap";
    }

    var handler_randomMoveMap = function(){
      var random = Math.random() * 100;
      var direction = "u2";
      if(random >= 0 && random <= 10){
        direction = "lu";
      }else if (random > 10 && random <= 20){
        direction = "u2";
      }else if (random > 20 && random <= 30){
        direction = "ru";
      }else if (random > 30 && random <= 40){
        direction = "r2";
      }else if (random > 40 && random <= 50){
        direction = "rd";
      }else if (random > 50 && random <= 60){
        direction = "d2";
      }else if (random > 60 && random <= 70){
        direction = "ld";
      }else if (random > 70 && random <= 80){
        direction = "l2";
      }else if (random > 80 && random <= 90){
        direction = "d2";
      }else if (random > 90 && random <= 100){
        direction = "c2";
      }
      var link = "";
      var imgs = document.getElementsByTagName('img');
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].src.indexOf('/sys/images/m_'+direction+'.gif')>=0){
          link = imgs[i].parentNode.getAttribute('href');
          break;
        }
      }
      window.location.href = link;

    }
    var handler_findStageToHunt = function(){
			//find demon city to hunt at first.
			var link = "";
      var imgs = document.getElementsByTagName('img');
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].src.indexOf('/sys/images/c/c6.gif')>=0){
          link = imgs[i].parentNode.getAttribute('href');
					window.location.href = link;
          return;
        }
      }
			//find other place to hunt
      var random = Math.random() * 100;
      var direction = "c4";
      if(random >= 0 && random <= 30){
        direction = "c5";
      }else if (random > 30 && random <= 60){
        direction = "c3";
      }else if (random > 60 && random <= 100){
        direction = "c4";
      }
      var imgs = document.getElementsByTagName('img');
      for(var i=0;i<imgs.length;i++){
        if(imgs[i].src.indexOf('/sys/images/c/'+direction+'.gif')>=0){
          link = imgs[i].parentNode.getAttribute('href');
          break;
        }
      }
			//find nothing to hunt.just refresh current page.
      window.location.href = link;
    }
    var handler_hunt = function(){
      var link = "";
      var links = document.getElementsByTagName('a');
      for(var i=0;i<links.length;i++){
        if(links[i].innerHTML == '狩猎' || links[i].innerHTML == '出军'){
          link = links[i].getAttribute('href');
          break;
        }
      }
      window.location.href = link;
    }
    var handler_huntStart1 = function(){
      var success = false;
      var inputs = document.getElementsByTagName('input');
      for(var i=0;i<inputs.length;i++){
        if(inputs[i].getAttribute("name") == "heroid"){
          inputs[i].checked = true;
          success = true;
          break;
        }
      }
      if(!success){
        throw "You don't have hero for hunting.skip step";
      }
      var forms = document.getElementsByTagName('form');
      for(var i=0;i<forms.length;i++){
        if(forms[i].getAttribute("action").indexOf("/a2t")>=0){
          forms[i].submit();
          break;
        }
      }
    }
    var handler_huntStart2 = function(){
      var btn = document.getElementById("fbsb2");
      document.getElementById('s2t').action='/s2t';
      document.getElementById('fbbtn').click(); 
      btn.disabled=true;
    }

    var handler_endLoop = function(){
      window.location.href = "";
    }
    
    //automation script work flow
    var flow_hunt = [
    {
      name: "jumpToMindex",
      action: handler_jumpToMindex,
      msg: "跳转到主页找寻酒馆"
    },
    {
      name: "findInn",
      action: handler_findInn,
      msg: "打开酒馆复活英雄"
    },
    {
      name: "resurrectHero",
      action: handler_resurrectHero,
      msg: "复活英雄"
    },

    {
      name: "jumpToMap",
      action: handler_jumpToMap,
      msg: "跳转到地图页面"
    },
    {
      name: "randomMoveMap",
      action: handler_randomMoveMap,
      msg: "随机移动地图第一次 "
    },
    {
      name: "randomMoveMap2",
      action: handler_randomMoveMap,
      msg: "随机移动地图第二次 "
    },
    {
      name: "randomMoveMap3",
      action: handler_randomMoveMap,
      msg: "随机移动地图第三次 "
    },
    {
      name: "findStageToHunt",
      action: handler_findStageToHunt,
      msg: "随机选取一个场景进行狩猎 "
    },
    {
      name: "hunt",
      action: handler_hunt,
      msg: "狩猎开始 "
    },
    {
      name: "huntStart1",
      action: handler_huntStart1,
      msg: "完成狩猎第一步骤"
    },
    {
      name: "huntStart2",
      action: handler_huntStart2,
      msg: "完成狩猎第二步骤 "
    },
    {
      name: "endLoop",
      action: handler_endLoop,
      msg: "结束自动狩猎全过程"
    }

    ];

    //utility functions
    var getIndexByName = function(name,arrObjs){
      for(var i=0;i<arrObjs.length;i++){
        var objName = arrObjs[i].name;
        if(objName == name) return i;
      }
      return -1;
    }

    var command = GM_getValue("qilongAutoCmd");
    var cmdIndex = 0;
    if(command == null || command == ""){
      cmdIndex = 0;
    }else{
      cmdIndex = getIndexByName(command,flow_hunt);
      cmdIndex = cmdIndex<0?0:cmdIndex;
      if((cmdIndex+1) > (flow_hunt.length -1) ){
        cmdIndex = 0;
        GM_setValue("qilongAutoCmd","");
        GM_setValue("qilongAutoStatus","初始化...");
      }else{
        cmdIndex ++;
      }
    }
    var cmdObj = flow_hunt[cmdIndex];
    //console.log('cmdIndex is ',cmdIndex,',phase at: ',cmdObj.msg);
    var func = eval('(' + cmdObj.action + ')');
    GM_setValue("qilongAutoCmd",cmdObj.name);
    GM_setValue("qilongAutoStatus",cmdObj.msg);
    try{
      func.apply(window,[]);
    }catch(e){
      //console.log('error is: ',e);
      GM_setValue("qilongAutoCmd",flow_hunt[flow_hunt.length - 1].name);
      GM_setValue("qilongAutoStatus",flow_hunt[flow_hunt.length - 1].msg);
      window.location.href = "";
      return;
    }

  },randomTimespan);
    
},false);

