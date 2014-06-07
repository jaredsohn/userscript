// ==UserScript==
// @name          Dragon Slayer - Search Valuable Resource
// @namespace     http://www.riaexpert.net/
// @description   Search demon elite scripts to for game www.qilongji.com.
// @include       http://d*.duniu.com/*
// ==/UserScript==

addEventListener('load', function(event){
	//config variables
	var SEARCH_RADIUS = 2;
	
  var info = document.createElement('div');
  info.style.backgroundColor = 'red';
  info.style.color = 'white';
  info.style.position = "absolute";
  info.style.right = "10px";
  info.style.top = "20px";
  info.innerHTML = "屠龙者 alpha - 搜索地图";
  document.body.appendChild(info);
  var msg = document.createElement('div');
  msg.style.backgroundColor = 'red';
  msg.style.color = 'white';
  msg.style.position = "absolute";
  msg.style.right = "10px";
  msg.style.top = "40px";
  if(GM_getValue("qilongAutoStatus") != null && GM_getValue("qilongAutoStatus") != '')
    msg.innerHTML = "状态: " + GM_getValue("qilongAutoStatus");
  else
    msg.innerHTML = "准备就绪";
  document.body.appendChild(msg);
  var report = document.createElement('div');
  report.style.backgroundColor = '#D9D9D9';
  report.style.color = 'white';
  report.style.position = "absolute";
  report.style.right = "10px";
  report.style.top = "60px";
  report.style.height = "400px";
	report.style.width = "150px";
  report.style.overflow = "auto";
	report.style.border = "1px solid #DDDDDD";
  if(GM_getValue("qilongSearchReport") != null && GM_getValue("qilongSearchReport") != '')
    report.innerHTML = "<span style='color:#FF6600;font-weight:bold;'>状态报告</span>:<br/>" + GM_getValue("qilongSearchReport");
  else
    report.innerHTML = "还未生成报告";
  document.body.appendChild(report);
  
  var btnClear = document.createElement('input');
  btnClear.type = 'button';
	if(GM_getValue('qilongSearchStarted') == null || GM_getValue('qilongSearchStarted') == ''){
		btnClear.value = '开始扫描';
	}else{
		btnClear.value = '停止扫描';
	}
  btnClear.style.position = "absolute";
  btnClear.style.right = "10px";
  btnClear.style.top = "480px";
  document.body.appendChild(btnClear);
  btnClear.addEventListener('click',function(evt){
		if(GM_getValue('qilongSearchStarted') == null || GM_getValue('qilongSearchStarted') == ''){
			//some initialization code.
			GM_setValue('qilongSearchStarted','true');
			btnClear.value = '停止扫描';
			GM_setValue('qilongSearchReport','');
			GM_setValue('qilongSearchArea','');
			GM_setValue('qilongSearchPosition','');
			GM_setValue("qilongAutoStatus","跳转到地图页面开始搜索...");
			window.location.href = '/GameMap';
		}else{
			GM_setValue('qilongSearchStarted','');
			btnClear.value = '开始扫描';
		}
    
  },false);
	//retrieve the main city position
	if(window.location.href.indexOf('GameMap')>=0 && window.location.search == ''){
		var centerX = parseInt(document.getElementsByName('xp')[0].value);
		var centerY = parseInt(document.getElementsByName('yp')[0].value);
		//lt - left top , rb - right bottom
		var ltX = centerX - SEARCH_RADIUS*11;
		var ltY = centerY + SEARCH_RADIUS*9;
		var rbX = centerX + SEARCH_RADIUS*11;
		var rbY = centerY - SEARCH_RADIUS*9;
		ltX = (ltX<-495)?-495:ltX;
		ltY = (ltY>496)?496:ltY;
		rbX = (rbX>495)?495:rbX;
		rbY = (rbY<-496)?-496:rbY;
		var scanArea = ltX.toString() + ',' + ltY.toString() + '|' + rbX.toString() + ',' + rbY.toString();
		GM_setValue('qilongSearchArea',scanArea);
	}
  //check enable to start flag
	if(GM_getValue('qilongSearchStarted') == null || GM_getValue('qilongSearchStarted') == ''){
		return;
	}
	//get the search area positions,if failed ,the process must be interuppted.
	if(GM_getValue('qilongSearchArea') == null || GM_getValue('qilongSearchArea') == ''){
		return;
	}
	var posLTX = GM_getValue('qilongSearchArea').split('|')[0].split(',')[0];
	var posLTY = GM_getValue('qilongSearchArea').split('|')[0].split(',')[1];
	var posRBX = GM_getValue('qilongSearchArea').split('|')[1].split(',')[0];
	var posRBY = GM_getValue('qilongSearchArea').split('|')[1].split(',')[1];
  //begin to search.
  if(GM_getValue('qilongSearchPosition') == null || GM_getValue('qilongSearchPosition') == ''){
    GM_setValue('qilongSearchPosition',posLTX+','+posLTY);
  }
  //the x,y postion is use to move map this time.
  var xPosition = parseInt(GM_getValue('qilongSearchPosition').split(',')[0]);
  var yPosition = parseInt(GM_getValue('qilongSearchPosition').split(',')[1]);
  //logic code to search current map for target and record them in a object to deserialize to a string for storage.
  var reportHTML = GM_getValue('qilongSearchReport');
  if(reportHTML == null)  report = '';
  var imgs = document.getElementsByTagName('img');
  for(var i=0;i<imgs.length;i++){
		//dummy function to retrieve the informations
	  //exp. showCityInfo('-17|-228','农场','zj892','25 / 小时','ＤｒｅａｍＳｋｙ');
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
    //130 资源
    if(imgs[i].getAttribute('src') == '/sys/images/c/c10.gif'
			|| imgs[i].getAttribute('src') == '/sys/images/c/c7.gif'
			|| imgs[i].getAttribute('src') == '/sys/images/c/c9.gif'
			|| imgs[i].getAttribute('src') == '/sys/images/c/c8.gif'
			){
      var link = imgs[i].parentNode;
      eval(link.getAttribute('onmouseover'));
			if(productivity > 25)
				reportHTML += '<a href="/GameMap?xp=' + positionX + '&yp=' + positionY + '" style="color:#993300">' + text + ':' + productivity.toString() + '</a><br/>';
    }
		//未访问水车/风车
		if(imgs[i].getAttribute('src') == '/sys/images/c/c11.gif' || imgs[i].getAttribute('src') == '/sys/images/c/c12.gif'){
			if(imgs[i].parentNode.childNodes.length < 2){
				var link = imgs[i].parentNode;
				eval(link.getAttribute('onmouseover'));
				reportHTML += '<a href="/GameMap?xp=' + positionX + '&yp=' + positionY + '" style="color:#993300;font-weight:bold;">未访问的风车/水车</a><br/>';
			}
		}
  }
  GM_setValue('qilongSearchReport',reportHTML);
  //logic code to end the searching process
  if(xPosition >= posRBX && yPosition <= posRBY){
    GM_setValue('qilongSearchStarted','');
		btnClear.value = '开始扫描';
    msg.innerHTML = '搜索地图完成-请查看报告.';
    return;
  }
  //the next x,y position is use to move map in next time.
  var nextxPosition = 0;
  var nextyPosition = yPosition;
  var singleMoved = false;
  if(xPosition >= posRBX) 
    nextxPosition = posLTX;
  else{
    nextxPosition = xPosition + 11;
    singleMoved = true;
  }
  if(!singleMoved){
    if(yPosition <= posRBY){
      //nextyPosition = 496
		}
    else{
      nextyPosition = yPosition - 9;
    }
  }

  //move map to target x,y; and set the next move position x,y value.
	//a timeout to enable user do some interactions like click button
	window.setTimeout(function(){
		GM_setValue("qilongAutoStatus",'搜索地图-'+xPosition.toString()+','+yPosition.toString());
		GM_setValue('qilongSearchPosition',nextxPosition.toString()+','+nextyPosition.toString());
		window.location.href = '/GameMap?xp=' + xPosition.toString() + '&yp=' + yPosition.toString();
	},2000);
  
  
},false);

