// ==UserScript==
// @name           Ika-Distancia
// @version        v4.5
// @author         2-D (Ex-Reaper)
// @homepage       http://userscripts.org/scripts/show/113147
// @icon           http://img8.imageshack.us/img8/5576/ikadf.jpg
// @description    Calcula el tiempo de viaje de espias y barcos.
// @include        http://m*.ikariam.*/index.php*view=island*
// @include        http://m*.ikariam.*/index.php*view=worldmap_iso*
// @include        http://m*.*.ikariam.*/index.php*view=island*
// @exclude        http://support*.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


var current={};
current.city={};
function parseCoords(coords){
	var match = /\[(\d+):(\d+)\]/.exec( coords );
	return {x: match[1]-0, y:match[2]-0};
}
var image = {
	"jurneytime" : "data:image/gif;base64,R0lGODlhIAAUANU8AGTcL23eM6eab7XvVbJvJaDqS4VWH8+aPG4qCn5pT5foR9z0i1XYKKfsTn7iO4bkP4/mQ1zaK+Xo6k3XJLFkFpB6X9PDZI5BCb5rF+GgMeHInUzWKa/tUvrist3xt27bSci2ipdDDkHUHtO7k/Laq8jDrvv326zohkfVIbvwWNHPwq3pf33gS9nZl6XabvfVSO/v8DvSHN/gnOjYfuaqOlVCLXbgNykcDMPyXL2yj/a9P////////wAAAAAAAAAAACH5BAEAADwALAAAAAAgABQAAAb/QJ5wSCzydMikMnmg6YzQoVNHo2UOlBACcaFQDLdolJCpWrGX7QVDINTEQ89QULvZ73h7DQQX2lZDGgkCOYWGhXQjfX4BLHIdFTuSOxKVEioqNR2LPDYBAAAnJjkCk5OVFQlCCzitAxwNBQoQDw6eoAwfMgIWMxa/FaQJJKuur7GztbcRDBMbLoW+BwIJFZvFxsi0tp/MziIfLTkaFTWKRKzZstvLzSgiMRsgMzUCRukpx+vK3e7gpTNy1CM2BJ++ZNxwOYMmKaDAPQXV7UvILFwJGDtmzDhQKEENDZw6dRNVouGMDG06quLkyRGPDiUzniRgwEChGgT7/AkEcAaNJAM0awo810eOkCVIl4QUUiXJTwxauGD4EmbplBdUDkBVwwZMEAA7",
	"transport" : "http://img515.imageshack.us/img515/3991/transportr.jpg",
	"spy" : "http://img51.imageshack.us/img51/6812/spyav.jpg",
	"ship_ram" : "http://img713.imageshack.us/img713/6834/unopb.jpg",
	"ship_ballista" : "http://img59.imageshack.us/img59/474/dosyh.jpg",
	"ship_flamethrower" : "http://img408.imageshack.us/img408/237/mortero.jpg",
	"ship_catapult" : "http://img707.imageshack.us/img707/6078/cohetesv.jpg",
	"ship_steamboat" : "http://img28.imageshack.us/img28/4499/lanchas.jpg",
	"ship_mortar" : "http://img807.imageshack.us/img807/7925/portaglobos.jpg",
	"ship_submarine" : "http://img62.imageshack.us/img62/8766/suministro.jpg"
};
var gamedata = {
	speed:{
		"transport":[60,0],
		"spy":[240,5],
		"ship_ram":[40,0],
		"ship_ballista":[40,0],
		"ship_flamethrower":[30,0],
		"ship_catapult":[30,0],
		"ship_steamboat":[60,0],
		"ship_mortar":[20,0],
		"ship_submarine":[30,0]
	}
}

current.view=$("body").attr('id');
switch (current.view){
	case 'island':
		add_DistanceCalc_Island();
		break;
	case 'worldmap_iso':
		add_DistanceCalc_World();
		break;
}

function add_DistanceCalc_World(){
	add_DistanceCalc_init();
	if (!current.city.coords) return;
	clickIslandDefault=unsafeWindow.map.clickIsland;
	unsafeWindow.map.clickIsland=function(objId){
		clickIslandDefault(objId);
		island_coords = parseCoords($("[id="+objId+"]").attr("title"));
		add_DistanceCalc_changeContent(island_coords);
	}
	island_coords = parseCoords($("div#breadcrumbs a.island").html());
	add_DistanceCalc_changeContent(island_coords);
}
function add_DistanceCalc_Island(){	
	add_DistanceCalc_init();
	if (!current.city.coords) return;
	island_coords = parseCoords($("div#breadcrumbs span.island").html());
	add_DistanceCalc_changeContent(island_coords);
}
function add_DistanceCalc_init(){
	var list = $("select#citySelect option[class^=tradegood]");
	var coordsIn='title';
	if (list.length==0){
		list = $("select#citySelect option[class$=coords]");
		coordsIn='name';
		if (list.length==0){
			return;
		}
	}
	var selectedItem=null;
	list.each(function(){
		if (this.selected){
			selectedItem=this;
		}
	});
	if (selectedItem==null) return;
	switch (coordsIn){
		case 'title':
			city_coords=parseCoords(selectedItem.title);
			break;
		case 'name':
			city_coords=parseCoords(selectedItem.innerHTML);
			break;
	}
	current.city.coords=city_coords;
	
	$("div#breadcrumbs [class=island]").eq(0).after("<span id='ikariamdistancecalc' style='cursor:help;'>&nbsp;<img src='"+image["jurneytime"]+"' width='22px'><div class='tooltip' style='display: none;background-color:#F1D7AD;border-color:#BE8D53;border-style:solid;border-width:4px 1px 1px;color:#542C0F;padding:0 8px;'></div></span>");
	$("span#ikariamdistancecalc").mouseover(function (){$("span#ikariamdistancecalc").children("div[class=tooltip]").css('display','block');});
	$("span#ikariamdistancecalc").mouseout(function (){$("span#ikariamdistancecalc").children("div[class=tooltip]").css('display','none');});
}
function add_DistanceCalc_changeContent(island_coords){
	var holder = $("span#ikariamdistancecalc");
	holder.children("div[class=tooltip]").html("");
	var	unitsToCalc = ["transport","spy","ship_ram","ship_ballista","ship_flamethrower","ship_catapult","ship_steamboat","ship_mortar","ship_submarine"];
	var first=true;
	for (i in unitsToCalc){
		unit=unitsToCalc[i];
		holder.children("div[class=tooltip]").append("<div style='padding:3px 0;"+((first)?"":"border-top:1px dotted #BE8D53;")+"'><img src='"+image[unit]+"' width='30px' style='padding-right:10px;'>"+unsafeWindow.getTimestring(distanceCalc(gamedata.speed[unit][0],current.city.coords,island_coords,gamedata.speed[unit][1])*60*1000,3," ","",true,true)+"</div>");
		first=false;
	}
}
function distanceCalc(speed,cord1,cord2,min_time){
	if (cord1.x==cord2.x && cord1.y==cord2.y){
		time=1200/speed*0.5;
	}else{
		time=1200/speed*(Math.sqrt(Math.pow((cord2.x-cord1.x),2)+Math.pow((cord2.y-cord1.y),2)));
	}	
	return (time<min_time)?min_time:time;
}