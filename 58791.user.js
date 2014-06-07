// ==UserScript==
// @name           MCS BOT angepasst von ATR fuer MyCityStreets.de
// @namespace      http://userscripts.org 
// @description    Auto Build, Auto Clear, Find Street
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// ==/UserScript==


function addInlineJavascript1(content)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	head.appendChild(script);
	

}


function init1()
{
    if (typeof (MCS) == 'undefined' || MCS.getPlayerData() == null) {
        window.setTimeout("init1()", 250);
        return;
    }
    setTimeout("MyCustomMenue();",1000);

}

function MyCustomMenue()
{
	$('body').append('<div id="#MCStoolsMen2" style="left: 353px; top: 8px; width: 85px; display: block; position: absolute; z-index: 2000;"> <a href="javascript:AutoBuild();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">AutoBuild</a> <a href="javascript:JumpTo();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">JumpTo</a> <a href="javascript:ClearStreet(6);" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">ClearStreet</a></div>');	
}
function AutoBuild()
{
var delay = prompt ("Wieviel Sekunden Pause nach jedem Haus?","6");
var buildingType = prompt ("Welcher Gebaeudetyp?","6");

if (!buildingType) return;
function GetFirstFreeConeNumber(data)
{
for(var i in data){if(data[i]) return i;}
return -1;
}
function SendBuyBuilding(){
var streetData=MCS.STREET.getStreetData();var player=MCS.getPlayerData();MCS.LOADING.show();
var isBuildSucc=false;var isChance=false;isBuildSucc=false;isChance=false;
$.ajax({url:"/build/getlocations",cache:false,data:{id:streetData.id,type:buildingType},dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{;;;{var FreeCone =GetFirstFreeConeNumber(data);if(FreeCone>=0){$.ajax({url:"/negotiate/buybuilding",type:"post",data: {nickname:player.nickname,hash:player.hash,id:streetData.id,type:buildingType,loc:FreeCone},dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{
if(data){
 MCS.ALERT.show(FreeCone,"Build "+parseInt(FreeCone)+status+" C="+data.c);player.balance-=MCS.buildings[buildingType].price;MCS.STATUSBAR.redraw();
 if(data.c && (data.c==3||data.c==8||data.c==13||data.c==17){isChance=true;MCS.CHANCE.take(data.c,streetData.id);}else{warten(2);SendBuyBuilding();}
}else{ MCS.ALERT.show(FreeCone,"fehler:"+parseInt(FreeCone)+status);}
}
})};}}});
}
warten(delay);
SendBuyBuilding();
}

function ClearStreet()
{
// Alle Gebäude auf Straße abreißen
var buildingType = prompt ("What type of building you like to demolish?","6");
if (!buildingType) return;

function ClearStreetB(buildingType)
{
var streetData=MCS.STREET.getStreetData();var player=MCS.getPlayerData();
function GetNextBuilding(data)
{
for(var i in data.b){if(data.b[i].t==buildingType){data.b[i].t=0; return i;}}
return -1;
}

var bidd = GetNextBuilding(streetData.data); //streetData.data.b[i].num_;
if (bidd >= 0){
MCS.LOADING.show();
$.ajax({url:"/negotiate/demolishbuilding",type:"post",data:{nickname:player.nickname,hash:player.hash,id:streetData.id,bid:bidd },dataType:"json",complete:MCS.LOADING.hide,success:function(){MCS.LOADING.hide;MCS.ALERT.show(bidd,"Sold:"+bidd );MCS.getPlayerData().balance+=parseInt(MCS.buildings[buildingType].price/2);MCS.STATUSBAR.redraw();ClearStreetB(buildingType);}});
}
//MCS.updateInterface();
}
ClearStreetB(buildingType);
}

function JumpTo()
{
var streetData=MCS.STREET.getStreetData();var player=MCS.getPlayerData();
MCS.LOADING.show();$.ajax({url:"/build/getlocations",cache:false,data: {id:streetData.id,type:6},dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{var isRoom=false;$.each(data,function(foo,point){if(point&&isRoom==false){isRoom=true;var split=point.split("/");var lat=parseInt(split [0])/MCS.intToFloat,lng=parseInt(split[1])/MCS.intToFloat;MCS.map().setCenter(new google.maps.LatLng(lat,lng),17);};})}});
}

function warten(prmSec)
  {
  prmSec *= 1000;
  var eDate = null;
  var eMsec = 0;
  var sDate = new Date();
  var sMsec = sDate.getTime();

  do {
      eDate = new Date();
      eMsec = eDate.getTime();

  } while ((eMsec-sMsec)<prmSec);
}


addInlineJavascript1(warten);
addInlineJavascript1(init1);
addInlineJavascript1(AutoBuild);
addInlineJavascript1(JumpTo);
addInlineJavascript1(ClearStreet);
addInlineJavascript1(MyCustomMenue);
init1();
