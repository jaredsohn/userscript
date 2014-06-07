// ==UserScript==
// @name           Travian T4 Gold Custom Script
// @namespace      travian.Furion
// @description    Gold Club Custom modifications
// @include       http://*.travian.*/*
// @require 	https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant	GM_addStyle
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
// ==/UserScript==

// Constants
var server = location.hostname;
var fastWait = 1450;
var rootPath = "http://" + server + "/";
var url = document.URL;
	url = url.substring(url.lastIndexOf("/") + 1);
var separator = ">:)>";
var separator2 = "|";

// Player variables
var user_race = -1;
var uniqueid = -1;
var uniquename = $('#sidebarBoxHero .playerName').text();
var villagecount = 0;
var villageid = -1;
var suffixLocal = "";
var suffixGlobal = "";

// Account variables
var farm_list = new Array();

function initialize() { 
	uniqueid = $('#heroImageButton img').attr('src');
	uniqueid = uniqueid.match(/uid=([0-9]+)/)[1];
	uniquename = $('#sidebarBoxHero .playerName').text().replace("\n","").trim();
	
	suffixGlobal = server + '_' + uniquename;
	suffixLocal = suffixGlobal + '_' + uniqueid;	
	var nation = $('playerName').find('img.nation');
	user_race = 1;
	if(nation.hasClass("nation2")) {
		user_race = 11;
	}
	if(nation.hasClass("nation3")) {
		user_race = 21;
	}
	villagecount = $('#sidebarBoxVillagelist div.content ul li').length;
	villageid = $('#sidebarBoxVillagelist div.content ul li.active a.active').attr("href");
	villageid = villageid.match(/newdid=([0-9]+)/)[1];
	
	// Debug: initializing all basic variables
	//alert("Village ID: "+villageid + "\nVillage count: "+villagecount+"\nRace: "+user_race + "\nServer: "+rootPath+"\nUnique ID: "+uniqueid+"\nPlayer name: "+uniquename);
}


function setupScript() {
	GM_setValue("CurrentTask_" + suffixLocal, "");
	GM_setValue("NextTask_" + suffixLocal, "");
	GM_setValue("FarmList_" + suffixLocal, "");
	GM_setValue("Settings_" + suffixLocal, "");
}
function removeScript() {
	GM_deleteValue("CurrentTask_" + suffixLocal);
	GM_deleteValue("NextTask_" + suffixLocal);
	GM_deleteValue("FarmList_" + suffixLocal);
	GM_deleteValue("Settings_" + suffixLocal);
}

function getFarmList() {
	var farm_string = "";
	farm_string = GM_getValue("FarmList_"+suffixLocal);
	var temp_list = {};
	farm_list = new Array();
	if(farm_string && farm_string.length>0) {
		temp_list = farm_string.split(separator);
		for (i = 0; i < temp_list.length; i++) {
			farm_list[farm_list.length] = temp_list[i].split(separator2);
		}
	}
}
function setFarmList() {
	var farm_string = '', flag = false, i = 0;
	
	for (i = 0; i < farm_list.length; i++) {
		if (flag) { farm_string += separator; }
		var temp_string = ""; var sep2 = "";
		for(j=0; j<farm_list[i].length;j++){
			temp_string += sep2+farm_list[i][j];
			sep2 = separator2;
		}
		temp_string += sep2+"true";
		farm_string += temp_string;
		flag = true;
	}
	
	console.log(farm_string);
	GM_setValue("FarmList_"+suffixLocal, farm_string);
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}
$.fn.exists = function () {
    return this.length !== 0;
}
if (typeof String.prototype.containsSubstring != 'function') {
  String.prototype.containsSubstring = function (str){
    return (!(this.indexOf(str) == -1));
  };
}

// Farmlist and etc
function addFarmTable() {
	jQuery('#content').append('<div id="customAttackTable"><table id="attackTable" width="100%" cellpadding="2" cellspacing="1"><tr><td colspan="13">TABLE OF STATISTICS<br>lalala</td></tr></table></div>');
}
function addMapTable() {
	jQuery('#content').append('<br><br>'+
	'<div id="customAttackTable">'+
	'<table id="attackTable" width="100%" cellpadding="2" cellspacing="1">'+
	'<tr>'+
		'<td>FID</td>'+
		'<td>Name</td>'+
		'<td>X</td>'+
		'<td>Y</td>'+
		'<td>Distance</td>'+
		'<td>Time</td>'+
		'<td>Last</td>'+
	'</tr>'+
	'</table></div>');
}
function isOnFarmList(x,y) {
	getFarmList();
	var i = 0;
	var flag2 = -1;
	if(farm_list.length>0)
	{
		for(i = 0; i< farm_list.length;i++) {
			var arr = farm_list[i];
			var x1 = arr[5];
			var y1 = arr[6];
			if(parseInt(x1) == parseInt(x) && parseInt(y1) == parseInt(y))
			{
				flag2 = i;
				return flag2;
			}
		}
	}
	return flag2;
}

function getFarmTroops(x,y) {
	getFarmList();
	var i = 0;
	var flag2 = -1;
	if(farm_list.length>0)
	{
		for(i = 0; i< farm_list.length;i++) {
			var arr = farm_list[i];
			var x1 = arr[5];
			var y1 = arr[6];
			if(parseInt(x1) == parseInt(x) && parseInt(y1) == parseInt(y))
			{
				flag2 = i;
				return {x: arr[5], y:arr[6], troops: arr[8]};
			}
		}
	}
	return flag2;
}
function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}
function id2xy(id) { 
	var x = (id % 801) - 401;
	var y = 400 - (id - 401 - x) / 801;
	return {
		'x' : x,
		'y' : y
	};
}
function globeDistance(a, b) { //calculate globe distance
	var dist1 = (a > b) ? Math.abs(a - b) : Math.abs(b - a);
	var dist2 = (a > b) ? (Math.abs(400 - a) + Math.abs(-400 - b)) : (Math.abs(400 - b) + Math.abs(-400 - a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;
	return distFinal;
}

function coordDistXYtoXY(x1, y1, x2, y2) { //calculate distance between two villages
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX * distX) + (distY * distY));
	return dist;
}
function mapAddToList (x, y, flag) {
	getFarmList();
	var check = isOnFarmList(x,y);
	var temp_array = new Array();
	temp_array[0] = farm_list.length;
	temp_array[1] = -1;
	temp_array[2] = -1;
	temp_array[3] = villageid;
	temp_array[4] = xy2id(x,y);
	temp_array[5] = x;
	temp_array[6] = y;
	temp_array[7] = coordDistXYtoXY(x,y, 31,-33);
	temp_array[8] = "2,0,0,0,0,0,0,0,0,0";
	if(flag==1) {
		temp_array[8] = "3,0,0,0,0,0,0,0,0,0";
	}
	temp_array[9] = "0,0,0,0,0,0,0,0,0,0";
	temp_array[10] = "0,0,0,0,0";
	temp_array[11] = 0;
	temp_array[12] = "true";
	
	if(check!=null && (check>-1)) {
		farm_list[check]=temp_array;
	}
	else { 
		farm_list[farm_list.length]=temp_array;
	}
	
	setFarmList();
}
function mapRemoveFromList(x, y) {
	getFarmList();
	var i = 0;
	var t_list = new Array();
	if(farm_list.length>0)
	{
		for(i = 0; i< farm_list.length;i++) {
			var farm_array = farm_list[i];
			var x1 = farm_array[5];
			var y1 = farm_array[6];
			if(parseInt(x1) == parseInt(x) && parseInt(y1) == parseInt(y))
			{}else{
				t_list[t_list.length]=farm_array;
			}
		}
	}
	farm_list = t_list;
	setFarmList();
}
function delayedMarks() {
	if(!$('.greenborder').exists())
	{		
		var reX = new RegExp("x{([-0-9]+)}");
		var reY = new RegExp("y{([-0-9]+)}");

		$('.tile').each(function(){
			var classes = $(this).attr('class').split(' ');		
			var tilex = -500;
			var tiley = -500;
			var farmFlag = -1;
			for(var i=0; i<classes.length; i++){
				var m = classes[i].match(reX);
				if(m==null) {} else {
					tilex = m[1];
				}
				var m2 = classes[i].match(reY);
				if(m2==null) {} else {
					tiley = m2[1];
				}
				if(classes[i].containsSubstring('oasis')) {
					farmFlag = 0;
					if(classes[i].containsSubstring('occupied')) {
						farmFlag = 1;
					}
				}
				if(classes[i].containsSubstring('village')) {
					farmFlag = 1;
				}
			}
			if(farmFlag!=-1) {
				if(isOnFarmList(tilex,tiley)>-1) {				
					$(this).contextPopup({
						title: 'Remove Farm',
						items: [{
							label:'Remove', 
							icon:null, 
							action:function() { mapRemoveFromList(tilex, tiley);}
						}]
					});
				} else {
					$(this).contextPopup({
						title: 'Add Farm',
						items: [{label:'Add to FarmList', icon:null, action:function() { mapAddToList(tilex, tiley, farmFlag);  }}]
					});
				}
			}
		});
		getFarmList();
		var arr = new Array();
		for (i = 0; i < farm_list.length; i++) {
			arr = farm_list[i];
			$('div[class*="x{'+arr[5]+'} y{'+arr[6]+'}"]').addClass('greenborder');
		}
		$('.greenborder').css('border',"2px solid #ff0000 !important").css('padding','-2px');
	}
	setTimeout(function(){delayedMarks()}, 2*fastWait);
}
jQuery.fn.contextPopup = function(menuData) {
	// Define default settings
	var settings = {
		contextMenuClass: 'contextMenuPlugin',
		gutterLineClass: 'gutterLine',
		headerClass: 'header',
		seperatorClass: 'divider',
		title: '',
		items: []
	};

	$.extend(settings, menuData);

	function createMenu(e) {
		var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
      .appendTo(document.body);
		if (settings.title) {
		$('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
		}
		settings.items.forEach(function(item) {
			if (item) {
				var rowCode = '<li><a href="#"><span></span></a></li>';
				var row = $(rowCode).appendTo(menu);
				if(item.icon){
					var icon = $('<img>');
					icon.attr('src', item.icon);
					icon.insertBefore(row.find('span'));
				}
				row.find('span').text(item.label);
				if (item.action) {
					row.find('a').click(function(){ item.action(e); });
				}
			} else {
				$('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
			}
		});
		menu.find('.' + settings.headerClass ).text(settings.title);
		return menu;
	}	
  
	this.bind('contextmenu', function(e) {
		var menu = createMenu(e)
		.show()
		.css({zIndex:1000001, left:e.pageX + 5 /* nudge to the right, so the pointer is covering the title */, top:e.pageY})
		.bind('contextmenu', function() { return false; });

		var bg = $('<div></div>')
		.css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1000000})
		.appendTo(document.body)
		.bind('contextmenu click', function() {
			bg.remove();
			menu.remove();
			return false;
		});

		menu.find('a').click(function() {
			bg.remove();
			menu.remove();
		});

		return false;
	});

	return this;
};
function mapMarks() {
	if($('#content .titleInHeader')) {
		$('#content .titleInHeader').text("Custom Map");
	}
	GM_addStyle('#mapContainer .tile {margin: 1px; border: 2px solid #333333 }'+
		'#mapContainer .tileRow {margin: 1px; height: 66px !important;}'
	);
	GM_addStyle('.titleInHeader {color: red !important}');
	GM_addStyle('.tile {margin: 1px; border: 2px solid #333333}'+
		'.tileRow {margin: 1px; height: 66px !important;}'+
		'.x .rulerContainer {background: none !important}'+
		'.y .rulerContainer {background: none !important}'+
		'.x .coordinate {display: block; margin: 1px; width: 66px !important}'+
		'.y .coordinate {display: block; margin: 1px;}'+
		'.contextMenuPlugin {'+
		  '-webkit-user-select: none;'+
		  'display: none;'+
		  'font-family: tahoma, arial, sans-serif;'+
		  'font-size: 11px;'+
		  'position: absolute;'+
		  'left: 100px;'+
		  'top: 100px;'+
		  'min-width: 100px;'+
		  'list-style-type: none;'+
		  'margin: 0;'+
		  'padding: 0;'+
		  'background-color: #f7f3f7;'+
		  'border: 2px solid #f7f7f7;'+
		  'outline: 1px solid #949694;'+
		'}'+
''+
		'.contextMenuPlugin > li {'+
		  'margin: 0 0 0 0;'+
		  'padding: 1px;'+
		  'background-repeat: no-repeat;'+
		'}'+
''+
		'.contextMenuPlugin > li > a {'+
		  'position: relative;'+
		  'display: block;'+
		  'padding: 3px 3px 3px 28px;'+
		  'color: ButtonText;'+
		  'text-decoration: none;'+
		  'margin: 1px;'+
		'}'+
''+
		'.contextMenuPlugin > li > a img {'+
		  'position: absolute;'+
		  'left: 3px;'+
		  'margin-top: -2px;'+
		  'width: 16px;'+
		  'height: 16px;'+
		'}'+
		'.contextMenuPlugin > li > a:hover {'+
		  'border: 1px solid #fffbff;'+
		  'outline: 1px solid #b5d3ff;'+
		  'margin: 0;'+
		  'background: -moz-linear-gradient(top, rgba(239,239,255,0.5) 0%, rgba(223,223,255,0.5) 100%); /* FF3.6+ */'+
		  'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,255,0.5)), color-stop(100%,rgba(223,223,255,0.5))); /* Chrome,Safari4+ */'+
		  'background: -webkit-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Chrome10+,Safari5.1+ */'+
		  'background: -o-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Opera11.10+ */'+
		  'background: -ms-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* IE10+ */'+
		  'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#80efefff\', endColorstr=\'#80dfdfff\',GradientType=0 );'+
		  'background: linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* W3C */'+
		  'cursor: default;'+
		'}'+
''+
		'.contextMenuPlugin > li.divider {'+
		  'border-top: 1px solid #e7e3e7;'+
		  'border-bottom: 1px solid #ffffff;'+
		  'height: 0;'+
		  'padding: 0;'+
		  'margin: 5px 0 5px 27px;'+
		'}'+
''+
		'.contextMenuPlugin > .header {'+
		  'background: rgb(90,90,90); /* Old browsers */'+
		  'background: -moz-linear-gradient(top, rgba(90,90,90,1) 0%, rgba(20,20,20,1) 100%); /* FF3.6+ */'+
		  'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(90,90,90,1)), color-stop(100%,rgba(20,20,20,1))); /* Chrome,Safari4+ */'+
		  'background: -webkit-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Chrome10+,Safari5.1+ */'+
		  'background: -o-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Opera11.10+ */'+
		  'background: -ms-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* IE10+ */'+
		  'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#5a5a5a\', endColorstr=\'#141414\',GradientType=0 ); /* IE6-9 */'+
		  'background: linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* W3C */'+
		  'position: relative;'+
		  'cursor: default;'+
		  'padding: 3px 3px 3px 3px;'+
		  'color: #ffffff;'+
		'}'+
''+
		'.contextMenuPlugin > .gutterLine {'+
		  'position: absolute;'+
		  'border-left: 1px solid #e7e3e7;'+
		  'border-right: 1px solid #ffffff;'+
		  'width: 0;'+
		  'top: 0;'+
'		  bottom: 0;'+
		  'left: 26px;'+
		  'z-index: 0;'+
		'}'+
		'.greenborder {border-color: #ff0000 !important;}');
	setTimeout(function(){delayedMarks()}, fastWait);
}
function makeAttack(x,y) {
	GM_setValue("CurrentTask_" + suffixLocal,"makeAttack|"+x+"|"+y);
}
function changePage(path) {
	window.location.href = rootPath+path;
}
function sendAttacksFromFarmList() {
	getFarmList();
	var arr = new Array();
	for (i = 0; i < farm_list.length; i++) {
		arr = farm_list[i];
		var v = GM_getValue("NextTask_" + suffixLocal); if(v==""){} else {v=v+separator;}
		GM_setValue("NextTask_" + suffixLocal,v+"makeAttack|"+arr[5]+"|"+arr[6]);
	}
}
function customTravianMain() {
	initialize();
	var current=GM_getValue("CurrentTask_" + suffixLocal);
	if(current!=undefined) {		
		if(current=="")	{
			if(url.startsWith("karte.php")) {
				addMapTable();mapMarks();
			} else if(url=="nachrichten.php") {
				addFarmTable();
			}
			var next = GM_getValue("NextTask_"+suffixLocal);
			if(next!=undefined && next!="") {
				var task_array = next.split(separator);
				GM_setValue("CurrentTask_" + suffixLocal, task_array[0]);
				var t = "";task_string="";
				for(var i = 1; i<task_array.length;i++) {
					task_string+=t+task_array[i];
					t=separator;
				}
				GM_setValue("NextTask_" + suffixLocal, task_string);
				setTimeout(function(){changePage("dorf2.php");}, fastWait);
			}
		} else {
			current = current.split("|");
			if(current[0]=="dummyaction") {
			} else if (current[0]=="makeAttack") {
				if(url.startsWith("position_details.php")) {
					var t_z = $('.options').find('a[href*="build.php?id=39"]').attr("href");
					if(t_z.length>0) {
						setTimeout(function(){changePage(t_z)}, fastWait);
					} else {				
						GM_setValue("CurrentTask_" + suffixLocal, "");
						setTimeout(function(){changePage("build.php?gid=16")}, fastWait);
					}
				} else if(url.startsWith("build.php?id=39")) {
					if(current[3]==2) {
						GM_setValue("CurrentTask_" + suffixLocal, "");
						setTimeout(function(){var loginForm = document.forms[0];loginForm.submit();}, fastWait);
					} else {
						var troops = getFarmTroops(current[1], current[2]);
						troops = troops.troops;
						var troops = troops.split(',');
						var flag = true;
						
						// unit #1
						if(parseInt(troops[0])>0) {
							if($('input[name=t1]').parent().find('a')) {
								if(parseInt(troops[0])<=parseInt($('input[name=t1]').parent().find('a').text()))
								{} else{flag = false; }	
							} else {
								flag = false;
							}
						}
						$('input[name=t1]').val(troops[0]);
						if(flag) {
							GM_setValue("CurrentTask_" + suffixLocal, "makeAttack|"+current[1]+"|"+current[2]+"|2");
							setTimeout(function(){var loginForm = document.forms.namedItem("snd");loginForm.submit();}, fastWait);
						} else {
							GM_setValue("CurrentTask_" + suffixLocal, "");
							setTimeout(function(){changePage("build.php?gid=16")}, fastWait);
						}
					}
				} else {
					setTimeout(function(){changePage("position_details.php?x="+current[1]+"&y="+current[2]);}, fastWait);
				}
			} 
			
		}
	} else {
		setupScript();
	}
}

customTravianMain();



