// ==UserScript==
// @name           Civwars2012
// @author         Garphy
// @version        1.0
// @description    automatic toolsets for civwars
// @website        garphy.com
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://g2.manyou.h.dragonzone.com/modules/civwar.php?*

// @scriptsource   
// ==/UserScript==
var cities = [];
var no = cityIndex = afkmode = 0;
var myTeam = '猎魔军团';	//工会名称，避免攻击同盟
var getAllAtLast = true;	//临发税收取所有城市税金
//for savings
var weaponId = 23;	//武器ID，目前为-防空步兵
var weaponPrice = 4680;	//对应武器价格
GM_addStyle("input.hack {height:12px;font-size:12px;} ");

//basic function
var $ = function(n){
	if(document.getElementById(n)) return document.getElementById(n); else return false;
}
document.getElementByXPath = function(XPath, contextNode){
	if(!contextNode)return null;
	var a = this.evaluate(XPath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	return (a.snapshotLength ? a.snapshotItem(0) : null);
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
	location.assign( "javascript:civWarCls."+ cmd +"; void(0) ");
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
			exec( "claimall()");
		else
			exec( "claimmoney('"+ cities[no] +"')");
		return true;
	}else{
		return false;
	}	
}

function isTime2Tax(){ return !$('claimCountdownArea') || $('claimCountdownArea').innerHTML.split(':')[0]=='00';}

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
	if( isTime2Tax() && getMoney() ){
		window.setTimeout( isGetting , 2*1000);
	}else if($('interval') && $('interval').innerHTML == '??:??:??'){
		window.location.reload();
	}else{
		afkmode = 0;
		window.setTimeout( monitor,2000 );
	}
	//$('c_a_all').innerHTML = $('interval').innerHTML == '??:??:??' ? 'go' : $('interval').innerHTML;
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
		}else if( n==1 && id==28){//无限审计卡
			research(24,n);
		}else if( n==1 && id==33){//无限减税卡
			research(29,n);
		}else if( n==1 && id==38){//无限时间停止卡
			research(34,n);
		}else if( n==1 && id==43){//无限夺城卡
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

//cash save
function tosavings (){
	if($('armyArea')){
		var num_available = [500,100,10];
		var num = n_cashes()/weaponPrice;
		if( num < 1 ) return false;
		for(var i=0;i<num_available.length;i++){
			if( num >= num_available[i] ){
				exec( "doEquipment('"+ weaponId +"',"+ num_available[i] +")" );
				window.setTimeout( tosavings , 800);
				break;
			}
		}		
	}else{
		//alert('去军队页面先！');
		location.assign( $('navArea').getElementsByTagName('a')[5].href );
		cmdquery("tosavings()");
	}
}

//get savings
function getsavings (){
	var num = prompt('目标是多少钱？');
	var accuracy = 500;//精确度：1、10、100、500
	var getsaving = function (){
		if( num - n_cashes() > weaponPrice*accuracy/2){
			exec("doSaleEquipment('"+ weaponId +"', "+ accuracy +")");
			window.setTimeout( getsaving , 800);
		}
	};
	getsaving();
}

//one key recruit
function torecruit(){
	exec("showBuySoldier()");
	exec("doBuySoldiers()");
}

//fight n times
function tofight(){
	if(!$('army_war_area')){ alert('打谁打谁！？先打了再喊我！'); return false;}
	var n = prompt('How many times do you want to fight? num x 100', '');
	if( n<1 ) return false;
	var o = document.getElementByXPath('//div/div/div[2]/span[4]/a', $('tipinfoContentArea'));
	var cmd = o.getAttribute('onclick');
	var battle = function (){
		if( n-- > 0){
			location.assign( "javascript:"+ cmd +"; void(0) ");
			window.setTimeout( battle , 800);
		}
	};
	battle();
}
//=====================init
function init(){
//cmd query
runQuery();

//left point to upgrade
if($('totalXpArea')){
	$('proj_military_xp_area').innerHTML += '<span id="totalXpLeftArea"></span>'
	pointleft();
	$('proj_military_xp_area').addEventListener('mouseover', pointleft ,false);
}

//City Management
if( $('claimAllVArea') ){
	//cities
	var links = $('cityContent').getElementsByTagName('ul')[0].getElementsByTagName('a');
	for(var j=0; j< links.length; j++){
		var a = links[j].getAttribute('onclick');
		if( a && a.indexOf('getCityDetail') > -1 && a.indexOf(cid) == -1){//get city list
			var cid = a.replace( /(.*?\(')|('\))/g,'');
			cities.push( cid );
		}else if( a && a.indexOf('removalCard') > -1 ){//remove card
			links[j].addEventListener('click', function(){ rmcard(this.getAttribute('onclick')); } , false);
		}		
	}
	window.setTimeout(monitor,2000);

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
//others
}else{
	//allience protect
	window.setTimeout( protect, 500);
	//back to City Manage 10mins later
	window.setTimeout( function(){location.assign( $('l_n_city').getElementsByTagName('a')[0].href ); } ,10*60*1000);
}

//auto research
var isSpecial = ( $('navArea') && document.getElementByXPath('//ul/li[2]/a[2]',$('navArea')).className.indexOf('war_navoff')>-1 ) ? 1:0 ;
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

//cash saving
$('money_area').parentNode.innerHTML += ' <a href="javascript:void(0)" id="tosavings">存</a> <a href="javascript:void(0)" id="getsavings">取</a';
$('tosavings').addEventListener('click', tosavings ,false);
$('getsavings').addEventListener('click', getsavings ,false);
if(document.getElementByXPath('//ul/li[5]/a',$('navArea')).className.indexOf('war_navoff')>-1 ){
	var boughtnum = parseInt($('saleNumbersBtn_'+weaponId).parentNode.getElementsByTagName('font')[0].innerHTML);
	$('getsavings').title = weaponPrice/2*boughtnum;
}
//one key recruit
$('soldiers_area').parentNode.innerHTML += ' <a href="javascript:void(0)" id="torecruit">招</a>';
$('torecruit').addEventListener('click', torecruit ,false);

//one key recruit
$('military_energy_limit_area').parentNode.innerHTML += ' <a href="javascript:void(0)" id="tofight">打</a>';
$('tofight').addEventListener('click', tofight ,false);
}//end of init
window.setTimeout( init, 200);