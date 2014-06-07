// ==UserScript==
// @name           Monopoly City Street BOT
// @namespace      http://userscripts.org 
// @description    Auto Build, Auto Clear, Find Street
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.6
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
	$('body').append('<div id="#MCStoolsMen2" style="left: 353px; top: 8px; width: 85px; display: block; position: absolute; z-index: 2000;"> <a href="javascript:AutoBuild();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">AutoBuild</a> <a href="javascript:JumpTo();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">JumpTo</a> <a href="javascript:ClearStreet();" style="font-family: verdana; color: #ffffff; font-size: 11px; font-weight: bold;">ClearStreet</a></div>');	
}
function AutoBuild(buildingType)
{
if (!buildingType){
buildingType = prompt ("What type of building you like to build? \n \
6-Green House ($50K) \n \
7-City Centre Cottage ($75K) \n \
8-Cane Top Multiplex ($150K) \n \
9-The Sentinel ($175K) \n \
10-High Reach Place ($200K) \n \
11-Nova Tower Block ($300K) \n \
12-Polyhedron Plaza ($400K) \n \
13-The Grid Building ($500K) \n \
14-Four Sided Fortress ($600K) \n \
15-Nori Place ($750K) \n \
16-Honeycomb Complex ($900K) \n \
17-Blanco Bastion ($1.1M) \n \
18-The Photat Building ($1.5M) \n \
19-Cubic Quarters ($2M) \n \
20-Opaque Overlook ($2.8M) \n \
21-Tri-rectangle Tower ($3.9M) \n \
22-Spear End Summit ($5M) \n \
23-Unbounded Megaplex ($6M) \n \
24-Hammer Head House ($7M) \n \
25-Tobo Place ($8.4M) \n \
26-Hips Plaza ($10M) \n \
27-Difo Square ($12M) \n \
28-Brouette Tower ($15M) \n \
29-Blemith Centre ($19M) \n \
30-Graduating Megastructure ($24M) \n \
31-Sky High Tower ($30M) \n \
32-MONOPOLY Tower ($100M) \n \
33-Spiral Luxe ($2.5M) \n \
34-Revolving Restaurant ($11M) \n \
35-Sairway to the Future ($60M) ","6");}
if (!buildingType) return;
function GetFirstFreeConeNumber(data)
{
for(var i in data){if(data[i]) return i;}
return -1;
}
function SendBuyBuilding(){
var streetData=MCS.STREET.getStreetData();var player=MCS.getPlayerData();
MCS.LOADING.show();
var isBuildSucc=false;
var isChance=false;

isBuildSucc=false;isChance=false;
$.ajax({url:"/build/getlocations",cache:false,data:{id:streetData.id,type:buildingType},dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{;;;{var FreeCone =GetFirstFreeConeNumber(data);if(FreeCone>=0){$.ajax({url:"/negotiate/buybuilding",type:"post",data: {nickname:player.nickname,hash:player.hash,id:streetData.id,type:buildingType,loc:FreeCone},dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{
if(data){
 MCS.ALERT.show(FreeCone,"Build "+parseInt(FreeCone)+status+" C="+data.c);player.balance-=MCS.buildings[buildingType].price;MCS.STATUSBAR.redraw();
 if(data.c ){isChance=true;MCS.CHANCE.take(data.c,streetData.id);}
else{setTimeout("AutoBuild("+buildingType+");",1000);}
}else{ MCS.ALERT.show(FreeCone,"fehler:"+parseInt(FreeCone)+status);}
}
})};}}});
}
SendBuyBuilding();
//&& (data.c==3||data.c==8||data.c==13||data.c==17)
}

function ClearStreet(buildingType)
{
if (!buildingType){
// Alle Gebaude auf Strasse abreissen
buildingType = prompt ("What type of building you like to demolish? \n \
6-Green House ($50K) \n \
7-City Centre Cottage ($75K) \n \
8-Cane Top Multiplex ($150K) \n \
9-The Sentinel ($175K) \n \
10-High Reach Place ($200K) \n \
11-Nova Tower Block ($300K) \n \
12-Polyhedron Plaza ($400K) \n \
13-The Grid Building ($500K) \n \
14-Four Sided Fortress ($600K) \n \
15-Nori Place ($750K) \n \
16-Honeycomb Complex ($900K) \n \
17-Blanco Bastion ($1.1M) \n \
18-The Photat Building ($1.5M) \n \
19-Cubic Quarters ($2M) \n \
20-Opaque Overlook ($2.8M) \n \
21-Tri-rectangle Tower ($3.9M) \n \
22-Spear End Summit ($5M) \n \
23-Unbounded Megaplex ($6M) \n \
24-Hammer Head House ($7M) \n \
25-Tobo Place ($8.4M) \n \
26-Hips Plaza ($10M) \n \
27-Difo Square ($12M) \n \
28-Brouette Tower ($15M) \n \
29-Blemith Centre ($19M) \n \
30-Graduating Megastructure ($24M) \n \
31-Sky High Tower ($30M) \n \
32-MONOPOLY Tower ($100M) \n \
33-Spiral Luxe ($2.5M) \n \
34-Revolving Restaurant ($11M) \n \
35-Sairway to the Future ($60M) ","6");}
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
$.ajax({url:"/negotiate/demolishbuilding",type:"post",data:{nickname:player.nickname,hash:player.hash,id:streetData.id,bid:bidd },dataType:"json",complete:MCS.LOADING.hide,success:function(){MCS.LOADING.hide;MCS.ALERT.show(bidd,"Sold:"+bidd );MCS.getPlayerData().balance+=parseInt(MCS.buildings[buildingType].price/2);MCS.STATUSBAR.redraw();setTimeout("ClearStreet("+buildingType+");",1200);}});
}
//MCS.updateInterface();
}
ClearStreetB(buildingType);
}

function JumpTo()
{
var buildingType = prompt ("What type of building you like to find space for? \n \
0 = Park \n \
1 = School \n \
2 = Stadium \n \
3 = Jail \n \
4 = Pover station \n \
5 = Sewage \n \
6-Green House ($50K) \n \
7-City Centre Cottage ($75K) \n \
8-Cane Top Multiplex ($150K) \n \
9-The Sentinel ($175K) \n \
10-High Reach Place ($200K) \n \
11-Nova Tower Block ($300K) \n \
12-Polyhedron Plaza ($400K) \n \
13-The Grid Building ($500K) \n \
14-Four Sided Fortress ($600K) \n \
15-Nori Place ($750K) \n \
16-Honeycomb Complex ($900K) \n \
17-Blanco Bastion ($1.1M) \n \
18-The Photat Building ($1.5M) \n \
19-Cubic Quarters ($2M) \n \
20-Opaque Overlook ($2.8M) \n \
21-Tri-rectangle Tower ($3.9M) \n \
22-Spear End Summit ($5M) \n \
23-Unbounded Megaplex ($6M) \n \
24-Hammer Head House ($7M) \n \
25-Tobo Place ($8.4M) \n \
26-Hips Plaza ($10M) \n \
27-Difo Square ($12M) \n \
28-Brouette Tower ($15M) \n \
29-Blemith Centre ($19M) \n \
30-Graduating Megastructure ($24M) \n \
31-Sky High Tower ($30M) \n \
32-MONOPOLY Tower ($100M) \n \
33-Spiral Luxe ($2.5M) \n \
34-Revolving Restaurant ($11M) \n \
35-Sairway to the Future ($60M) ","2");

var streetData=MCS.STREET.getStreetData();var player=MCS.getPlayerData();
MCS.LOADING.show();$.ajax({url:"/build/getlocations",cache:false,data: {id:streetData.id,type:buildingType },dataType:"json",complete:MCS.LOADING.hide,success:function(data,status)
{var isRoom=false;$.each(data,function(foo,point){if(point&&isRoom==false){isRoom=true;var split=point.split("/");var lat=parseInt(split [0])/MCS.intToFloat,lng=parseInt(split[1])/MCS.intToFloat;MCS.map().setCenter(new google.maps.LatLng(lat,lng),17);};})}});
}

addInlineJavascript1(init1);
addInlineJavascript1(AutoBuild);
addInlineJavascript1(JumpTo);
addInlineJavascript1(ClearStreet);
addInlineJavascript1(MyCustomMenue);
init1();
