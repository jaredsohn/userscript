// ==UserScript==
// @name           CivwarsV2
// @author         gensisnew
// @version        2.10
// @description    王者歸來輔助程式
// @namespace      CivwarsV2
// @include        http*://apps.*facebook.com/genesistwo/*
// @include        http://g2.by.ca.cutedna.com/*
// @include        http://g2-by-ul.cutedna.com/*
// @scriptsource   
// ==/UserScript==
var thisVersion = "2.10";
var gameName = 'genesistwo';
var newVersionAvailable=0;
var SUC_script_num = 000000;
var AutoStart;
var AutoFlag;
var AutoGetTax;
var AutoTraining;
var wait_count = 0;

if (parseInt(GM_getValue('SUC_remote_version',0),10) > thisVersion) {
	newVersionAvailable=1;
}

// update script from: http://userscripts.org/scripts/review/000000

try{ function updateCheck(forced) {
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'),10) + (86400000*1) <= (new Date().getTime()))) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp){
					var remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1],10);
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					GM_setValue('SUC_remote_version', remote_version);
					GM_log('remote version ' + remote_version);
					if (remote_version > thisVersion) {
						newVersionAvailable=1;
						if (forced) {
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							}
						}
					} else if (forced) alert('No update is available for "'+script_name+'."');
				}
			});
		}catch (err) {
			if (forced) alert('An error occurred while checking for updates:\n'+err);
		}
	}
     }
     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
     updateCheck(false);
} catch(err) {}

var cities = [];
var friends = [];
var npid="";
var friendIndex = 0;
var no = cityIndex = afkmode = 0;
var getAllAtLast = true;	//發稅即收稅金
//for savings
GM_addStyle("input.hack {height:12px;font-size:12px;} ");

/////////////////////////////////////////////////////////////////////

//							gm OBJECT

// this object is used for setting/getting GM specific functions.
/////////////////////////////////////////////////////////////////////
var os='\n'; // Object separator - used to separate objects
var vs='\t'; // Value separator - used to separate name/values within the objects
var ls='\f'; // Label separator - used to separate the name from the value
gm={

// use to log stuff
log:function(mess) {
	GM_log('v'+thisVersion + ': ' +mess);
},
debug:function(mess) {
	if(debug) { gm.log(mess); }
},
// use these to set/get values in a way that prepends the game's name
setValue:function(n,v) {
	gm.debug('Set ' + n + ' to ' + v);
//	GM_setValue(civwarap.gameName+"__"+n,v);
	GM_setValue(gameName+"__"+n,v);
	return v;
},
getValue:function(n,v) {
//	gm.debug('Get ' +n + ' value ' + GM_getValue(civwarap.gameName+"__"+n,v));
//	return GM_getValue(civwarap.gameName+"__"+n,v);
	gm.debug('Get ' +n + ' value ' + GM_getValue(gameName+"__"+n,v));
	return GM_getValue(gameName+"__"+n,v);
},
deleteValue:function(n) {
	gm.debug('Delete ' +n + ' value ');
//	return GM_deleteValue(civwarap.gameName+"__"+n);
	return GM_deleteValue(gameName+"__"+n);
},
IsArray:function(testObject) {
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
},
setList:function(n,v) {
	if (!gm.IsArray(v)) {
		gm.log('Attempted to SetList ' + n + ' to ' + v.toString() + ' which is not an array.');
		return;
	}
//	return GM_setValue(civwarap.gameName+"__"+n,v.join(os));
	return GM_setValue(gameName+"__"+n,v.join(os));
},
getList:function(n) {
//	getList = GM_getValue(civwarap.gameName+"__"+n,'');
//	gm.debug('GetList ' +n + ' value ' + GM_getValue(civwarap.gameName+"__"+n));
	getList = GM_getValue(gameName+"__"+n,'');
	gm.debug('GetList ' +n + ' value ' + GM_getValue(gameName+"__"+n));
	return (getList) ? getList.split(os) : [];
},
listAddBefore:function(listName,addList) {
	newList = addList.concat(gm.getList(listName));
	gm.setList(listName,newList);
	return newList;
},
listPop:function(listName) {
	popList = gm.getList(listName);
	if (!popList.length) return '';
	popItem = popList.pop();
	gm.setList(listName,popList);
	return popItem;
},
listPush:function(listName, pushItem, max) {
  var list = gm.getList(listName);

  // Only add if it isn't already there.
  if (list.indexOf(pushItem) != -1) {
    return;
  }
  list.push(pushItem);
  if (max > 0) {
    while (max < list.length) {
      //var pushItem = list.shift();
      pushItem = list.shift();
      gm.debug('Removing ' + pushItem + ' from ' + listName + '.');
    }
  }
  gm.setList(listName, list);
},
listFindItemByPrefix:function(list,prefix) {
	var itemList = list.filter(function(item){
		return item.indexOf(prefix)==0;
	});
//gm.log('List: ' + list + ' prefix ' + prefix + ' filtered ' + itemList);
	if (itemList.length) return itemList[0];
},
setObjVal:function(objName,label,value) {
	if (!(objStr = gm.getValue(objName))) {
		gm.setValue(objName,label+ls+value);
		return;
	}
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) {
		gm.setValue(objName,label + ls + value + vs + objStr);
		return;
	}
	objList = objStr.split(vs);
	objList.splice(objList.indexOf(itemStr),1,label+ls+value);
	gm.setValue(objName,objList.join(vs));
},
getObjVal:function(objName,label,defaultValue) {
	objStr = gm.getValue(objName);
	if (!objStr) return defaultValue;
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
	return itemStr.split(ls)[1];
},
getListObjVal:function(listName,objName,label,defaultValue) {
	gLOVlist = gm.getList(listName);
	if (!(gLOVlist.length)) return defaultValue;
//gm.log('have list '+gLOVlist);
	if (!(objStr = gm.listFindItemByPrefix(gLOVlist,objName+vs))) return defaultValue;
//gm.log('have obj ' + objStr);
	if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
//gm.log('have val '+itemStr);
	return itemStr.split(ls)[1];
},
setListObjVal:function(listName,objName,label,value) {
	objList = gm.getList(listName);
	if (!(objList.length)) {
		gm.setValue(listName,objName+vs+label+ls+value);
		return;
	}
	if (!(objStr = gm.listFindItemByPrefix(objList,objName+vs))) {
		gm.listPush(listName,objName+vs+label+ls+value);
		return;
	}
	valList = objStr.split(vs);
	if (!(valStr = gm.listFindItemByPrefix(valList,label+ls))) {
		valList.push(label+ls+value);
		objList.splice(objList.indexOf(objStr),1,objStr+vs+label+ls+value);
		gm.setList(listName,objList);
		return;
	}
	valList.splice(valList.indexOf(valStr),1,label+ls+value);
	objList.splice(objList.indexOf(objStr),1,valList.join(vs));
	gm.setList(listName,objList);
},
deleteListObj:function(listName,objName) {
	objList = gm.getList(listName);
	if (!(objList.length)) return false;
	if ((objStr = gm.listFindItemByPrefix(objList,objName))) {
		objList.splice(objList.indexOf(objStr),1);
		gm.setList(listName,objList);
	}
}
};


//var nHtml={
function FindByAttrContains(obj,tag,attr,className) 
{
  
	if(attr=="className") { attr="class"; }
	className=className.toLowerCase();

	var q=document.evaluate(".//"+tag+
		"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
		"')]",obj,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
	
}
  


function SetDisplay(idName,setting){

	if (!(div = document.getElementById('civwarap_' + idName))) {
		gm.log('Unable to find div: ' + idName);
		return;
	}
	if (setting == true) {
		div.style.display = 'block';
	} else {
		div.style.display = 'none';
	}
	
}

function AddListeners(topDivName) {

	if(!(div = document.getElementById(topDivName))) return false;
	var ss=document.evaluate("//input[contains(@id,'civwarap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no inputs');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		if (inputDiv.type=='checkbox') {
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/civwarap_/i,'');
				var value = e.target.value;
				gm.setValue(idName,e.target.checked);
//				if (e.target.className) civwarap.SetDisplay(e.target.className,e.target.checked);
				if (e.target.className) SetDisplay(e.target.className,e.target.checked);
				else if (idName == 'AutoStatAdv') {
					if (value) {
						//civwarap.
						SetDisplay('Status_Normal',false);
						//civwarap.
						SetDisplay('Status_Adv',true);
						for (var n=1; n<=5; n++) {
							gm.setValue('AttrValue' + n,'');
						}
					} else {
						//civwarap.
						SetDisplay('Status_Normal',true);
						//civwarap.
						SetDisplay('Status_Adv',false);
					}

					//civwarap.
					SetControls(true);
				}
			},false);

		} else if (inputDiv.type=='text') {
			var idName = inputDiv.id.replace(/civwarap_/i,'');
			inputDiv.value=gm.getValue(idName,'').toString();
			inputDiv.addEventListener('change',function(e) {
				var idName = e.target.id.replace(/civwarap_/i,'');
				
				if (/Style.*/.test(inputDiv.id)) {
					gm.setValue("StyleBackgroundLight","#"+gm.getValue("StyleColorStarted","FFF"));
					gm.setValue("StyleOpacityLight",gm.getValue("StyleTransparencyStarted","1"));
					gm.setValue("StyleBackgroundDark","#"+gm.getValue("StyleColorStoped","FFF"));
					gm.setValue("StyleOpacityDark",gm.getValue("StyleTransparencyStoped","1"));
				}
				gm.setValue(idName,e.target.value);
				
			},false);
		}
	}
	
	var ss=document.evaluate("//select[contains(@id,'civwarap_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength<=0) gm.log('no selects');
	for(var s=0; s<ss.snapshotLength; s++) {
		var inputDiv=ss.snapshotItem(s);
		inputDiv.addEventListener('change',function(e) {
			if (e.target.selectedIndex > 0) {
				var idName = e.target.id.replace(/civwarap_/i,'');
				var value = e.target.options[e.target.selectedIndex].value;
				gm.log('Change: setting ' + idName + ' to ' + value);
				gm.setValue(idName,value);
				//civwarap.
				SetControls(true);
				e.target.options[0].value = value;
			}
		},false);
	}	
	var ss=document.evaluate("//a[contains(@id,'civwarap_Switch_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<ss.snapshotLength; s++) {
		var switchDiv=ss.snapshotItem(s);
		
		switchDiv.addEventListener('click',function(e) {
			var subId = e.target.id.replace(/_Switch/i,'');
			var subDiv = document.getElementById(subId);
			if(subDiv.style.display == "block") {
				subDiv.style.display = "none";
				e.target.innerHTML = e.target.innerHTML.replace(/-/,'+');
				gm.setValue('Control_' + subId.replace(/civwarap_/i,''),"none");
			}
			else {
				subDiv.style.display = "block";
				e.target.innerHTML = e.target.innerHTML.replace(/\+/,'-');
				gm.setValue('Control_'+ subId.replace(/civwarap_/i,''),"block");
			}
		},false);
	}
	
}

//basic function
var $ = function(n){
	if(document.getElementById(n)) return document.getElementById(n); else return false;
}
document.getElementByXPath = function(XPath, contextNode){
	if(!contextNode)return null;
	var a = this.evaluate(XPath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	return (a.snapshotLength ? a.snapshotItem(0) : null);
};
var n_fullsoldiers = function(){
	return parseInt( $('total_population_area').innerHTML.replace(/,/g,'') );
};
var n_soldiers = function(){
	return parseInt( $('soldiers_area').innerHTML.replace(/,/g,'') );
};
var n_cashes = function(){
	return parseInt( $('money_area').innerHTML.replace(/,/g,'') );
};
var n_resources = function(){
	return parseInt($('project_energy_area').innerHTML);
};
var n_attacks = function(){
	return parseInt($('military_energy_area').innerHTML);
};
var exec = function (cmd){
    //console.info('cmd=' +cmd);
	eval('unsafeWindow.civWarCls.' + cmd);    
	//location.assign( "javascript:civWarCls."+ cmd +"; void(0) ");
}
var cmdquery = function (cmd){
	GM_setValue('cmd', cmd);
}
var runQuery = function (){	
	eval(GM_getValue('cmd'));
	GM_setValue('cmd', '');
}

//get city money
function getMoney (){
	var num = 0;
	for(var i =0; i<cities.length; i++){
		var thisCity = parseInt($('m_u_'+cities[i]).innerHTML);
		if( thisCity > num ){ num = thisCity; no = i;}		
	}	
	if( num > 0 ){
		if( getAllAtLast && parseInt($('interval').innerHTML.split(':')[1]) < 10 )
		{
			exec( "claimall()");
		}	
		else
		{
			exec( "claimmoney('"+ cities[no] +"')");
        }    
			
		return true;
	}else{
		return false;
	}
}

function isTime2Tax(){ 
  return !$('claimCountdownArea') || $('claimCountdownArea').innerHTML.split(':')[0]=='00';
}

function isGetting(){
	var status = $('city_claim_area_'+ cities[no]).innerHTML;
	if( isTime2Tax() ){
		if( status.indexOf('load.gif') > -1 ){
			window.setTimeout(isGetting,1000);
		}else if( $('randImgArea') && !afkmode){
			window.setTimeout( function(){alert('Fail to get money! you may need to input the verification code.');} ,0 );
			afkmode = 1;
			window.setTimeout( monitor,120*1000 );
		}else{
			window.setTimeout( function(){ if(isTime2Tax())torecruit(); },60*1000);
		}
	}else{//succeed to get money
		window.setTimeout( function(){window.location.reload();} , 9*60*1000);
	}
}

function monitor(){
    wait_count = wait_count + 1;
    console.info('count:' + wait_count);
	if( isTime2Tax() && getMoney() ){
        console.info('chkAutoGetTax:' + AutoGetTax);
		window.setTimeout( isGetting , 2*1000);
		//if (AutoTraining == 1){
        //  console.info('chkAutoTraining:' + AutoTraining);    
        //  window.setTimeout( function(){ReloadTraining(0,4,1);} , 2*1000);	
        //}  
	}else if($('interval') && $('interval').innerHTML == '??:??:??'){
		window.location.reload();
	}else{
      if (AutoTraining == 1 && wait_count > 30){
        wait_count = 0;
  	    console.info('chkAutoTraining:' + AutoTraining);    
  	    window.setTimeout( function(){ReloadTraining(0,1,1);} , 2*1000);	
      }  
		afkmode = 0;
		window.setTimeout( monitor,2000 );
	}
	
	//$('c_a_all').innerHTML = $('interval').innerHTML == '??:??:??' ? 'go' : $('interval').innerHTML;
}

function AutoButton() {

  if(AutoStart == 1)
  {
    AutoStart = 0; 
    
  }
  else
  {
    AutoStart = 1; 
  }
  console.info ("change autostart:" + AutoStart);
  //window.setTimeout( function(){location.assign( $('l_n_city').getElementsByTagName('a')[0].href ); } ,500); 
  window.setTimeout( function(){exec( "navigateTo('act=city')" ); } ,500); 
}
//build all
function buildall(){
	exec( "buildFacilityAll('"+ cities[cityIndex++] +"')" );
	if(cityIndex<cities.length){
		window.setTimeout( buildall, 1000);
	}
}

//auto research
var resourcesNeeded = 0;
function getPercent(id){
	return !!$('projectPct_'+id) ? (isNaN(parseInt($('projectPct_'+id).innerHTML))?1:parseInt($('projectPct_'+id).innerHTML)) : false;
}
function research(id,n){
	var justdo = 0;
	//tips for upgrade
	if( parseInt($('xpRateArea').style.width)>97 ){
		alert('Time to Upgrade!');
		return false;
	}		
	if( justdo || n_resources()>resourcesNeeded ){
		if( !!getPercent(id) && getPercent(id)<100 ){
			var arg = id+"','"+n;
			exec("workonProject('"+ arg +"')");
			window.setTimeout( research, 1000 , id, n);
		}else if( n==1 && !!getPercent(id+1) ){//go on research for special
			research(id+1,n);
		}else if( n==1 && id==28){//無限審計卡
			research(24,n);
		}else if( n==1 && id==33){//無限減稅卡
			research(29,n);
		}else if( n==1 && id==38){//無限時間停止卡
			research(34,n);
		}else if( n==1 && id==43){//無限奪城卡
			research(39,n);
		}
	}
}

//allience protect
function protect(){
	if(!myTeam || myTeam == '')return false;
	if($('duishou_c')){
		var li = $('duishou_c').getElementsByTagName('ul')[2].getElementsByTagName('li');
		for(var i=0;i<li.length; i++){
			var s = li[i].getElementsByTagName('span');
			if( s[1].innerHTML.indexOf(myTeam) > -1) attackConfirm( s[6].getElementsByTagName('a')[0] );
		}
	}
	if($('civwardetail_nickname_area')){
		var node = $('civwardetail_nickname_area').parentNode;
		if( node.getElementsByTagName('span')[4].innerHTML.indexOf(myTeam) > -1) attackConfirm( node.nextSibling.nextSibling.getElementsByTagName('li')[0].firstChild );
	}
}
function attackConfirm(o){
	o.innerHTML += '同盟';
	o.setAttribute('onclick','if(confirm(\'Attack Allience!?\'))' + o.getAttribute('onclick'));
}

//point left to upgrade
function pointleft(){
	var tmp = $('totalXpArea').innerHTML.split('/');
	$('totalXpLeftArea').innerHTML = '='+ (parseInt(tmp[1])-parseInt(tmp[0]));
}

//one key recruit
function torecruit(){
	exec("showBuySoldier()");
	exec("doBuySoldiers()");
}

//批次尋寶
function toHunt(){
	//init
  friendIndex = 0;
  friends = [];
  countHunt();
}  
  
function countHunt(){
    npid="";
	//var friends = document.getElementByXPath('//div[2]/ul/li/div/div/span/a', $('memberContentArea'));
	var flinks = $('memberContentArea').getElementsByTagName('a');
	for(var j=0; j< flinks.length; j++){
		var a = flinks[j].getAttribute('onclick');
		var a_title=flinks[j].getAttribute('title');
		var a_call=flinks[j].getAttribute('href');
		var a_class=flinks[j].getAttribute('class');
		if( a && a.indexOf('treasureHunt') > -1 && a.indexOf(fid) == -1){//get friends list
			var fid = a.replace( /(.*?\(')|('\);)/g,'');
			friends.push( fid );
		}else if( a_class == "next_1"  && a_title == "下一頁"){
			npid = a.replace( /(.*?\(')|('\);)/g,'');
		    //console.warn("下一頁:" + npid );
   		    //console.info("friend count:" +friends.length);	    
		    HuntPage();
		}		
	}	
}

//跳到下一頁
function HuntPage(){
  //console.info("member_page('" + npid + "')");
  exec("member_page('" + npid + "')");
  window.setTimeout(countHunt, 500);  
}

function HuntAll(){

    //console.info(friendIndex + ':' + friends[friendIndex]);
    //console.warn( "treasureHunt('"+ friends[friendIndex++] +"')" );
	exec( "treasureHunt('"+ friends[friendIndex++] +"')" );
	if(friendIndex<friends.length){
		window.setTimeout(HuntAll, 500);
	}

}

/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////

function SetupDivs() {

	if(document.getElementById('civwarap_div')) {
		return false;
	}
	
	var div=document.createElement('div');
	div.id='civwarap_div';
	div.style.height='200px';

	div.style.padding='4px';
	div.style.border='2px solid #444';
	div.style.background = gm.getValue('StyleBackgroundLight','#000000');
	div.style.opacity = gm.getValue('StyleOpacityLight','1');
	div.style.color='#000';
    div.style.cssFloat='top';

	var divList = ['control'];
	for (var divID in divList) {
		var addDiv=document.createElement('div');
		addDiv.id='civwarap_' + divList[divID];
		div.appendChild(addDiv);
	}

//check these out to see which one actually works 

    b=FindByAttrContains(document.body, 'div', 'class', 'civwar_main');
	if(b) 
	{
		b.insertBefore(div,b.childNodes[1]);
	} 

	return true;
	
}


function SetDivContent(idName,mess) {

	SetupDivs();
	var d=document.getElementById('civwarap_' + idName);
	if(d) { d.innerHTML=mess; }
	
}

function SetControls(force) {

	var controlDiv=document.getElementById('civwarap_control');
	if(controlDiv && controlDiv.innerHTML.length>0 && !force) {
		// we already have the controls
		return;
	}


	var htmlCode = '';
	htmlCode += '<hr />' + ToggleControl('Extra','特殊功能');
		jobList = ['研究','特殊研究','神秘勢力','翻牌'];
		htmlCode += '<table width=700 cellpadding=0 cellspacing=0>'; 
		
		htmlCode += '<tr><td width=80><font color="#FFFFFF">項目:</font></td><td>' + MakeDropDown('Job',jobList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + '</td></tr>';
		
		switch (gm.getValue('Job', jobList[0])){
			case '研究':
				var projectList = ['1.捕獵(1)','2.漁業(2)','3.車輪(3)','4.農業(4)','5.神秘論(5)','6.採礦(3)','7.航行術(2)','8.製陶(2)','9.家畜馴養(3)','10.弓箭(3)','11.冥想學(8)','12.多神論(9)','13.石工術(13)','14.祭司制度(5)','15.騎術(5)','16.一神論(5)','17.青銅器(16)','18.文字(9)','19.字母表(7)','20.鐵器(22)','21.數學(6)','22.美學(27)','23.君主制(27)','24.羅盤(18)','25.文獻(21)','26.曆法(16)','27.建築構造學(22)','28.貨幣制度(22)','29.戲劇(13)','30.法典(11)','31.金屬鑄造(31)','32.機械(36)','33.工程學(23)','34.封建制度(32)','35.光學(29)','36.音樂(31)','37.哲學(22)','38.文官制度(27)','39.神學(54)','40.行會(27)','41.君權神授論(18)','42.造紙(25)','43.民族主義(45)','44.銀行業(32)','45.印刷機(40)','46.教育學(36)','47.軍事制度(22)','48.憲法(54)','49.經濟學(45)','50.火藥(40)','51.可更換部件(21)','52.自由主義(45)','53.民主主義(45)','54.槍支（膛線）(45)','55.天文學(40)','56.化學(47)','57.蒸汽機(50)','58.公司制(32)','59.生物學(31)','60.科學方法(32)','61.軍事科學(29)','62.煉鋼(30)','63.生產流水線(40)','64.鐵路(34)','65.共產主義(37)','66.內燃機(50)','67.進化論(60)','68.物理學(38)','69.火砲(34)','70.法西斯主義(40)','71.電學(46)','72.醫學(50)','73.產業主義(31)','74.核裂變(39)','75.航空(52)','76.相對論(77)','77.量子力學(36)','78.無線電(47)','79.塑料(36)','80.先進航空(36)','81.火箭(41)','82.生態學(46)','83.制冷(40)','84.大眾傳媒(34)','85.人造衛星(54)','86.複合材料(47)','87.電子計算機(63)','88.搖滾音樂(47)','89.激光(40)','90.光纖(44)','91.超導(38)','92.隱形(40)','93.遺傳學(45)','94.機器人(47)','95.核聚變(50)','96.互聯網(56)','97.人工智能(31)','98.納米技術(67)','99.量子計算機(48)','100.等離子體(41)','101.弦理論(50)','102.神經系統科學(47)','103.腦-計算機接口(50)','104.克隆(45)','105.瞬移(52)','106.飛船(63)','107.時間機器(56)','108.宇宙旅行(65)','109.太空生物學(63)','110.反物質(101)','111.激光武器(112)','112.探索天體系統(179)','113.太空移民(162)','114.登月飛行(113)','115.航天育種(136)','116.碳捕獲與埋藏(155)','117.生物改造(191)','118.空間基地(120)','119.生物質能(125)','120.人類DNA重組(164)','121.宇宙馴養(137)','122.電磁能(226)','123.後人類(178)','124.宇宙探險(159)','125.星級種族探索(141)','126.宇宙生物圈(136)','127.星球漂移(260)','128.生命體冰封技術(108)','129.氦3能源(293)','130.新化石能源(114)','131.生化科技(152)','132.烏托邦文明(195)','133.公有製(136)','134.空想主義(128)','135.臆念消費(175)','136.安那其主義(150)','137.未來檔案(196)','138.意識海(146)','139.磁歐石(308)','140.幻星遊蕩(207)','141.神秘代碼(188)','142.精神穿透(230)','143.應用相對論(249)','144.超弦理論(226)','145.單極磁體(209)','146.引力子理論(160)','147.應用引力學(183)','148.高能化學(202)','149.高級亞原子理論(238)','150.多態性軟件(167)','151.可控光(172)','152.光學計算機(211)','153.高溫超導體(184)','154.引力能引擎(273)','155.飛向外太空(225)','156.量子裂變(206)','157.統一場理論(188)','158.無摩擦表面(183)','159.有機潤滑(307)','160.超拉伸固體(155)','161.納米工藝(340)','162.納米冶金(161)','163.神經移植(199)','164.基因修復工程(242)','165.智能機器(183)','166.奇點結構(175)','167.受控奇點(222)','168.蟲洞(197)','169.遠征銀河系(243)'];
				htmlCode += '<tr><td width=100><font color="#FFFFFF">研究項目:</font></td><td>' + MakeDropDown('Project',projectList,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + "</td>";
	  			htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動補充學術資源包(背包). ' + MakeCheckBox('BagFillEnergy',false) + " </td></tr>";
    			htmlCode += '<tr><td width=100><font color="#FFFFFF">研究次數:</font></td><td>' + MakeNumberForm('ProjectTimes','','100',"type='text'  size='12' style='font-size: 10px'") + " </td>";		
	  			//htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動補充學術資源包(神域20豆豆). ' + MakeCheckBox('GodFillEnergy',false) + " </td></tr>";
				break;
			case '特殊研究':
				var projectList1 = ['1.水晶頭骨(34)','2.太陽金字塔(58)','3.水晶池(47)','4.瑪雅曆法(78)','5.金星公式(53)','6.瑪雅象形文字(60)','7.瑪雅禁祀(82)','8.信仰(63)','9.遙視(58)','10.靈魂出竅(76)','11.心靈感應(53)','12.預知(83)','13.意念移物(69)','14.懸浮術(92)','15.瀕死體驗(87)','16.綜合搏擊術(92)','17.巴西柔術(117)','18.拳擊(93)','19.摔跤(87)','20.柔搏(107)','21.泰拳(99)','22.柔道(100)','23.瑪雅文明(134)','24.根達雅文明(130)','25.米索不達亞文明(137)','26.穆裡亞文明(157)','27.亞特蘭蒂斯文明(128)','28.占星術(136)','29.煉金術(149)','30.生命之樹(134)','31.塔羅牌(142)','32.脈輪(181)'];
				htmlCode += '<tr><td width=100><font color="#FFFFFF">研究項目:</font></td><td>' + MakeDropDown('Project1',projectList1,'',"style='font-size: 10px min-width: 110px; max-width: 110px; width : 110px;'") + "</td>";
	  			htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動補充學術資源包(背包). ' + MakeCheckBox('BagFillEnergy',false) + " </td></tr>";
    			htmlCode += '<tr><td width=100><font color="#FFFFFF">研究次數:</font></td><td>' + MakeNumberForm('ProjectTimes','','100',"type='text'  size='12' style='font-size: 10px'") + " </td>";		
	  			//htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動補充學術資源包(神域20豆豆). ' + MakeCheckBox('GodFillEnergy',false) + " </td></tr>";
				break;
			case '神秘勢力':
				var ForceList = ['1.[水]','2.[土]','3.[木]','4.[金]','5.[火]'];
				htmlCode += '<tr><td width=100><font color="#FFFFFF">神秘英雄:</font></td><td width=80>' + MakeDropDown('Force',ForceList,'',"style='font-size: 10px'") + "</td>";
 			  	htmlCode += '<td width=180 align="left"><font color="#FFFFFF">自動隨時滿兵(國庫). ' + MakeCheckBox('MoneyBuySolider',false) + " </td></tr>";
		    	var PowerList = ['1','10','50','100'];				
    			htmlCode += '<tr><td width=100><font color="#FFFFFF">訓練次數:</font></td><td>' + MakeNumberForm('TrainingTimes','','100',"type='text'  size='12' style='font-size: 10px'") + " </td>";		
 			  	htmlCode += '<td width=180 align="left"><font color="#FFFFFF">低於20%用徵兵虎符(神域5豆豆). ' + MakeCheckBox('BagFillSoldiers',false) + " </td></tr>";
    			htmlCode += '<tr><td width=100><font color="#FFFFFF"></font></td><td></td>';		
 			  	//htmlCode += '<td width=180 align="left"><font color="#FFFFFF">低於20%自動滿兵(神域5豆豆). ' + MakeCheckBox('GodFillSoldiers',false) + " </td></tr>";
    			//htmlCode += '<tr><td width=100><font color="#FFFFFF"></font></td><td></td>';		
 			  	htmlCode += '<td width=180 align="left"><font color="#FFFFFF">自動補充軍事資源包(神域20豆豆). ' + MakeCheckBox('GodFillMilitaryEnergy',false) + " </td></tr>";
				break;
				
			case '翻牌':
				var BoxList = ['1','2','3','4','5','6','7','8','9'];
				//htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
				htmlCode += '<tr><td width=100><font color="#FFFFFF">選擇格子(依序由左至右、由上到下編號):</font></td><td width=80>' + MakeDropDown('Box',BoxList,'',"style='font-size: 10px'") + "</td></tr>";
    			htmlCode += '<tr><td width=100><font color="#FFFFFF">翻牌次數:</font></td><td>' + MakeNumberForm('PlayTimes','','100',"type='text'  size='12' style='font-size: 10px'") + " </td></tr>";		
				break;
				
			default:
				htmlCode += '<tr><td width=80><font color="#FFFFFF">開發中...</font></td><td>' + "</td></tr>";	
		}
        
  	htmlCode += "<tr><td><input type='button' id='doJob' value='開始' style='font-size: 10px; width:50; height:50'></td></tr>"; //</table>";					
	htmlCode += "</table>";
	htmlCode += "</div>";

	
	htmlCode += ToggleControl('Extra1','自動化設定');
	htmlCode += '<table width=700 cellpadding=0 cellspacing=0>';
	htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動收稅. ' + MakeCheckBox('chkAutoTax',false) + " </td></tr>";
	htmlCode += '<td width=180 colspan=2><font color="#FFFFFF">自動訓練神秘勢力. ' + MakeCheckBox('chkAutoTraining',false) + " </td></tr>";

	htmlCode += '<tr><td width=180 colspan=2><font color="#FFFFFF">' + MakeCheckBox("chkAutoStart",true) + '"啟動自動化" </td></tr>';
  	htmlCode += "<tr><td><input type='button' id='btnAutoStart' value='設定' style='font-size: 10px; width:50; height:50'></td></tr>";
	htmlCode += "</table><hr/>";
	
	htmlCode += "</div>";
	
	htmlCode += '<table width=180 cellpadding=0 cellspacing=0>';
    htmlCode+= '<font color="#FFFFFF">Version: ' + thisVersion + "</font><br />";
	if (newVersionAvailable) {
		htmlCode += "<a href='http://userscripts.org/scripts/source/" +SUC_script_num+".user.js'>Install new autoplayer version: "+GM_getValue('SUC_remote_version') + "!</a>";
	}
  	SetDivContent('control',htmlCode);
	AddListeners('civwarap_div');
	
	var doJob=document.getElementById('doJob');
	if (doJob != null){
	  console.info('job not null');
	  doJob.addEventListener('click',function(e){
			var CurrentJob = gm.getValue('Job');
	        switch (CurrentJob)
	        {
				case '研究':
					var CurrentProject = gm.getValue('Project');
					gm.setValue('CurrentProject',CurrentProject);
					var CurrentProjectNum = CurrentProject.substr(0,CurrentProject.indexOf(".",0));
					gm.setValue('CurrentProjectNum',CurrentProjectNum);
					var CurrentProjectEnergy = CurrentProject.substring(CurrentProject.indexOf("(",0)+1,CurrentProject.indexOf(")",0));
					gm.setValue('CurrentProjectEnergy',CurrentProjectEnergy);
					var CurrentProjectTimes = gm.getValue('ProjectTimes');
					var i=0;
					ReloadProject(0,CurrentProjectTimes,CurrentProjectNum,0);
	    			break;
	    			
				case '特殊研究':
					var CurrentProject = gm.getValue('Project1');
					gm.setValue('CurrentProject',CurrentProject);
					var CurrentProjectNum = CurrentProject.substr(0,CurrentProject.indexOf(".",0));
					gm.setValue('CurrentProjectNum',CurrentProjectNum);
					var CurrentProjectEnergy = CurrentProject.substring(CurrentProject.indexOf("(",0)+1,CurrentProject.indexOf(")",0));
					gm.setValue('CurrentProjectEnergy',CurrentProjectEnergy);
					var CurrentProjectTimes = gm.getValue('ProjectTimes');
					var i=0;
					ReloadProject(0,CurrentProjectTimes,CurrentProjectNum,1);
	    			break;
	    			
			case '神秘勢力':
			        console.info('神秘勢力');
					var CurrentForce = gm.getValue('Force');
					gm.setValue('CurrentForce',CurrentForce);
					var CurrentForceNum = CurrentForce.substr(0,CurrentForce.indexOf(".",0));
					gm.setValue('CurrentForceNum',CurrentForceNum);
					var CurrentTrainingTimes = gm.getValue('TrainingTimes');
					gm.setValue('CurrentTrainingTimes',CurrentTrainingTimes);
					var i=0;
					ReloadTraining(0,CurrentTrainingTimes,CurrentForceNum); 		
	    			break;
	    			
			case '翻牌':
					var CurrentXmasNum = gm.getValue('Box');
					gm.setValue('CurrentXmasNum',CurrentXmasNum);
					var CurrentPlayTimes = gm.getValue('PlayTimes');
					gm.setValue('CurrentPlayTimes',CurrentPlayTimes);
					var i=0;
					unsafeWindow.civWarCls.popUpChristmas2010()
					ReloadXmas(0,CurrentPlayTimes,CurrentXmasNum); 		
	    			break;
	    			
	    			
				default:
				    alert('錯誤!!');
	        }
	  },false);
	}

	var btnAutoStart=document.getElementById('btnAutoStart');
	btnAutoStart.addEventListener('click',AutoButton ,false);  
    
	if (!(globalContainer = document.querySelector('#app_content_264464196372'))) return;
	globalContainer.addEventListener('DOMNodeInserted', function(event) {
 		//level
 		if(document.querySelector('#all_faz pleft5')) {
			nHtml.setTimeout(this.addExpDisplay, 0);
		}
	}, true);

    
	globalContainer.addEventListener('click', function(event) {
		var obj = event.target;
		while(obj && !obj.href) obj = obj.parentNode;
		if(obj && obj.href) this.clickUrl = obj.href;
	}, true);
	
    
}


function MakeDropDown(idName, dropDownList,instructions,formatParms) {
	var selectedItem = gm.getValue(idName,'defaultValue');
	if (selectedItem=='defaultValue')
		selectedItem = gm.setValue(idName,dropDownList[0]);
	var htmlCode = " <select id='civwarap_" + idName + "' " + formatParms + "'><option>" + selectedItem;
	for (var item in dropDownList) {
		if (selectedItem!=dropDownList[item]) {
			if (instructions) {
				htmlCode+="<option" + ((instructions[item])?" title='" + instructions[item] + "'":'') + ">"  + dropDownList[item];
			} else {
				htmlCode+="<option>"  + dropDownList[item];
			}
		}
	}
	htmlCode+='</select>';
	return htmlCode;
}
function MakeCheckBox(idName,defaultValue,varClass,instructions,tableTF) {
	var checkItem = gm.getValue(idName,'defaultValue');
	if (checkItem=='defaultValue') gm.setValue(idName,defaultValue);
	var htmlCode = "<input type='checkbox' id='civwarap_" + idName + "' title=" + '"' + instructions +'"' + ((varClass)?" class='" + varClass + "'":'') + (gm.getValue(idName)?'checked':'')+' />';
	if (varClass) {
		if (tableTF) htmlCode += "</td></tr></table>";
		else htmlCode += '<br />';
		htmlCode += this.AddCollapsingDiv(idName,varClass);
	}
	return htmlCode;
}

function MakeNumberForm(idName,instructions,initDefault,formatParms) {
	if (gm.getValue(idName,'defaultValue')=='defaultValue') gm.setValue(idName,initDefault);
	if (!initDefault) initDefault = '';
	if (!formatParms) formatParms = "size='4'";
	var htmlCode = " <input type='text' id='civwarap_" + idName + "' " + formatParms + " title=" + '"' + instructions +'"' + " value=" +  initDefault + " />";
	return htmlCode;
}

function AddCollapsingDiv(parentId,subId) {
	var htmlCode = "<div id='civwarap_" + subId + "' style='display: " + (gm.getValue(parentId,false)?'block':'none') +"'>";
	return htmlCode;
}

function ToggleControl(controlId,staticText) {
	var currentDisplay = gm.getValue('Control_'+controlId,"none");
	if (currentDisplay == "none") var displayChar = "+";
	else var displayChar = "-";
	var toggleCode = '<b><a id="civwarap_Switch_' + controlId + '" href="javascript:;" style="text-decoration: none;"> ' + displayChar + ' ' + staticText + '</a></b> <br />';
	toggleCode += "<div id='civwarap_" + controlId + "' style='display: " + currentDisplay + "'>";
	return toggleCode;
}

function GetNumber(name,defaultValue) {
	if(!gm.getValue(name)) return defaultValue || '';
	return Number(gm.getValue(name));
}

function MakeTextBox(idName,instructions,formatParms) {
	var checkItem = gm.getValue(idName,'');
	var htmlCode = "<textarea title=" + '"' + instructions +'"' + " type='text' id='civwarap_" + idName + "' " + formatParms + ">"+gm.getValue(idName,'')+"</textarea><br />";
	return htmlCode;
}

function SaveBoxText(idName) {
	var boxText=document.getElementById('civwarap_' + idName);
	gm.setValue(idName,boxText.value);
}
/////////////////////////////////////////////////////////////////	

function ReloadProject(i,CurrentProjectTimes,CurrentProjectNum,Type) {
	if (i < CurrentProjectTimes){
		if (n_resources-1 < gm.getValue('CurrentProjectEnergy') && gm.getValue('BagFillEnergy'))
		{
			unsafeWindow.civWarCls.useChristmasBag('33', 1);
			this.waitForPageChange=true;
			//nHtml.setTimeout(function() { this.waitForPageChange=false; this.doWorkonProject(i,CurrentProjectTimes,CurrentProjectNum,Type); },civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}
	  doWorkonProject(i,CurrentProjectTimes,CurrentProjectNum,Type);	  	  
	}	
}
function doWorkonProject(i,CurrentProjectTimes,CurrentProjectNum,Type) {
  	window.setTimeout(function() {
		i++;
		unsafeWindow.civWarCls.workonProject(CurrentProjectNum,Type);
		//civwarap.
		ReloadProject(i,CurrentProjectTimes,CurrentProjectNum,Type);
	}, 1500);	
}

/////////////////////////////////////////////////////////////////	

function ReloadTraining(i,CurrentTrainingTimes,CurrentForceNum) {	

	if (i < CurrentTrainingTimes)
	{
   		gm.log('soldiers_area: ' + (n_soldiers -2));
		gm.log('total_population_area: ' + n_fullsoldiers *0.2);

		if (n_soldiers-2 < n_fullsoldiers && gm.getValue('MoneyBuySolider'))
		{
		    var need_soldiers = n_fullsoldiers -n_soldiers -2;
			if (need_soldiers > 0 && n_cashes > need_soldiers /2)
			{
				unsafeWindow.civWarCls.showBuySoldier()
				unsafeWindow.civWarCls.doBuySoldiers();
			}
			this.waitForPageChange=true;
			nHtml.setTimeout(function() { this.waitForPageChange=false; this.doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum);},civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}
		
        //使用徵兵虎符
		else if (n_soldiers-2 < n_fullsoldiers && gm.getValue('BagFillSoldiers'))
		{
			unsafeWindow.civWarCls.useChristmasBag('42', 1);
			this.waitForPageChange=true;
			nHtml.setTimeout(function() { this.waitForPageChange=false; this.doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum);},civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}

        /*
		//兵力低於20%才用神域補兵
		if ($("#soldiers_area").text().replace(/,/g,"")-2 < $("#total_population_area").text().replace(/,/g,"") *0.2 && gm.getValue('GodFillSoldiers'))
		{
			unsafeWindow.civWarCls.doGod('FullSoldiers');
			//prepareBuy_facebook('FullSoldiers',1,'');
			this.waitForPageChange=true;
			nHtml.setTimeout(function() { this.waitForPageChange=false; this.doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum);},civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}
		*/
		
		if (n_attacks-1 < gm.getValue('CurrentTrainingPower') && gm.getValue('GodFillMilitaryEnergy'))
		{
			unsafeWindow.civWarCls.doGod('FullMilitaryEnergy');
			this.waitForPageChange=true;
			nHtml.setTimeout(function() { this.waitForPageChange=false; this.doTrainingBoss(i,CurrentTrainingTimes,CurrentBossNum); },civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}
	    else if (n_attacks-1 < gm.getValue('CurrentTrainingPower') && !gm.getValue('GodFillMilitaryEnergy'))
		{
			this.waitForPageChange=true;
			nHtml.setTimeout(function() { this.waitForPageChange=false; this.doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum); },civwarap.waitMilliSecs * (20 + Math.random() * 0.5));
		}		
		
	  doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum);	  	  
	}	
	
}

function doTrainingForce(i,CurrentTrainingTimes,CurrentForceNum) {
  	window.setTimeout(function() {
		i++;
		unsafeWindow.civWarCls.trainForce(CurrentForceNum);
		//civwarap.
		ReloadTraining(i,CurrentTrainingTimes,CurrentForceNum);
	  }, 300);	
}

/////////////////////////////////////////////////////////////////	

function ReloadXmas(i,CurrentPlayTimes,CurrentXmasNum) {	
	if (i <= CurrentPlayTimes){
	  doXmasBox(i,CurrentPlayTimes,CurrentXmasNum);	  	  
	}	
	else if (i > CurrentPlayTimes)
	{
	  unsafeWindow.civWarCls.navigateTo('act=god&t=bag');
	}
}

function doXmasBox(i,CurrentPlayTimes,CurrentXmasNum) {
  	window.setTimeout(function() {
		i++;
        unsafeWindow.civWarCls.activityChristmasInit();		
		unsafeWindow.civWarCls.activityChristmasReward(gm.getValue('CurrentXmasNum'));
		ReloadXmas(i,CurrentPlayTimes,CurrentXmasNum);
	  }, 1500);	
}


//=====================init
function init(){ 
  //cmd query
  runQuery();
  
  SetupDivs();
  SetControls();
  AutoFlag=document.getElementById('civwarap_' + 'chkAutoStart');

  
  if (AutoFlag.checked){
    AutoStart = 1;
  }
  else{
    AutoStart = 0;
  }    
  if(AutoStart == null)
    AutoStart = 1;
  console.info("AutoStart:" + AutoStart);
  
  if (document.getElementById('civwarap_' + 'chkAutoTax').checked)
  {
  	AutoGetTax= 1;
  }	
  else 
  {
    AutoGetTax= 0;
  }  
  if (document.getElementById('civwarap_' + 'chkAutoTraining').checked)
  {
  	AutoTraining= 1;
  }	
  else 
  {
    AutoTraining= 0;
   } 
  //left point to upgrade
  if($('totalXpArea')){
  	$('proj_military_xp_area').innerHTML += '<span id="totalXpLeftArea"></span>'
  	pointleft();
  	$('proj_military_xp_area').addEventListener('mouseover', pointleft ,false);
  }
  console.warn('chkAutoGetTax:' + AutoGetTax);
  console.warn('chkAutoTraining:' + AutoTraining);    
  
  //auto research
  //特別研究
  
  var isSpecial = ( $('navArea') && document.getElementByXPath('//div/div[3]/ul/li[3]/nobr/a',$('navArea')).className.indexOf('war_navoff')>-1 ) ? 1:0 ;
  if( isSpecial || $('projectContentArea')){
    resourcesNeeded = isSpecial ? 50:200;
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id','rid');
    input.setAttribute('class','hack');
    input.setAttribute('style','width:20px;');
    input.addEventListener('dblclick', function(){ $('rid').value=parseInt($('rid').value)+1; research( parseInt($('rid').value),isSpecial);}, true);
    input.addEventListener('keypress', function(e){ if(e.keyCode==13){ research( parseInt($('rid').value),isSpecial);} } , true);
    $('project_energy_limit_area').parentNode.appendChild(input);
  }
  
  
  //盟友批次尋寶
  var isFriend= ( $('navArea') && document.getElementByXPath('//div[2]/div[3]/ul/li[2]/nobr/a',$('navArea')).className.indexOf('war_navoff')>-1 ) ? 1:0 ;
  console.info (isFriend);
  
  if (isFriend){
  //<li style="padding:0 10px;border:none;" class="fleft multi_width5"><a onclick="$('member_list_type').value='0';civWarCls.member_page();" href="javascript:;">一鍵尋寶</a></li>
    //var hunt = docment.createElement('hunt');
    //hunt.setAttribute('type','button');
    //hunt.setAttribute('id','huntall');
    //hunt.setAttribute('class','huntall');
    //hunt.addEventListener('click',function(){huntAll();},false);
    //$('military_energy_limit_area').parentNode.appendChild(hunt);
    $('total_population_area').parentNode.innerHTML +=  ' <a href="javascript:void(0)" id="hunt">批次尋寶</a>'
    $('hunt').addEventListener('click', HuntAll ,false);
  }
  
  
  //City Management
  
  if( $('claimAllVArea') ){
  	//cities
  	//var links = $('cityContent').getElementsByTagName('ul')[0].getElementsByTagName('a');
  	var links = $('cityContent').getElementsByTagName('a');
  
  	for(var j=0; j< links.length; j++){
  		var a = links[j].getAttribute('onclick');
  		if( a && a.indexOf('getCityDetail') > -1 && a.indexOf(cid) == -1){//get city list
  			var cid = a.replace( /(.*?\(')|('\))/g,'');
  			cities.push( cid );
  		}else if( a && a.indexOf('removalCard') > -1 ){//remove card
  			links[j].addEventListener('click', function(){ rmcard(this.getAttribute('onclick')); } , false);
  		}		
  	}
  	if (AutoStart)
  	{
  	  window.setTimeout(monitor,1000);
  	}  
  	//build all
  	$('claimAllVArea').innerHTML +='<a id="buildall" style="width: 70px; margin-left:5px;" href="javascript:void(0)" class="war_continu font_war font_bold font_14">Build All</a>';
  	$('buildall').addEventListener('click', buildall , true);
  	
  	//remove card
  	var rmcard = function (cmd){
  		var cardStatus = document.getElementByXPath('//div/div[2]/p[3]/a', $('tipinfoContentArea'));
  		if( (!cardStatus || cardStatus.innerHTML=='拆除') && n_soldiers() > 999999 && n_attacks() > 10 ){
  			location.assign( "javascript:"+ cmd +" void(0) ");
  			window.setTimeout( rmcard, 500, cmd);
  		}
  	};
  	var card = document.getElementByXPath('//div/div/div[2]/span[5]/a', $('cityContent'));
  	if( card ){
  		var rmcmd = card.getAttribute('onclick');
  		window.setTimeout( rmcard, 1000, rmcmd);	
  	}
  }
  else if($('memberContentArea'))
  {
    countHunt();
   	if (AutoStart)
  	{
  	  window.setTimeout( protect, 500);    
  	  //window.setTimeout( function(){location.assign( $('l_n_city').getElementsByTagName('a')[0].href ); } ,5*60*1000);    
  	  window.setTimeout( function(){exec( "navigateTo('act=city')" ); } ,5*60*1000); 
  	}  
  //others
  }  
  else{
   	if (AutoStart)
   	{
  	  //allience protect
  	  window.setTimeout( protect, 500);
  	  //back to City Manage 10mins later
  	  //window.setTimeout( function(){location.assign( $('l_n_city').getElementsByTagName('a')[0].href ); } ,5*60*1000);
  	  window.setTimeout( function(){exec( "navigateTo('act=city')" ); } ,5*60*1000);  	  
  	}
  }

}//end of init
window.setTimeout( init, 200);