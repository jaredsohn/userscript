// ==UserScript==
// @name			jQBot T4 
// @namespace		jQBot T4
// @description		jQBot T4
// @author			AFF
// @version			1.0.000
// @email			AFF@jqbot.ru
// @license			GNU GPL
// @include			http://travian/*
// @include			http://*jqbot.*
// @include			http://*.travian*.*/
// @include			http://*.travian*.*/*.php*
// @exclude			http://www.gettertools.com/*
// @exclude			http://travian.ws/*
// @exclude			http://www.traviantoolbox.com/*
// @exclude			http://*.travian*.*/hilfe.php*
// @exclude			http://*.travian*.*/index.php*
// @exclude			http://*.travian*.*/anleitung.php*
// @exclude			http://*.travian*.*/impressum.php*
// @exclude			http://*.travian*.*/anmelden.php*
// @exclude			http://*.travian*.*/gutscheine.php*
// @exclude			http://*.travian*.*/spielregeln.php*
// @exclude			http://*.travian*.*/links.php*
// @exclude			http://*.travian*.*/geschichte.php*
// @exclude			http://*.travian*.*/gold.php*
// @exclude			http://*.travian*.*/tutorial.php*
// @exclude			http://*.travian*.*/manual.php*
// @exclude			http://*.travian*.*/manual.php*
// @exclude			http://*.travian*.*/ajax.php*
// @exclude			http://*.travian*.*/ad/*
// @exclude			http://*.travian*.*/chat/*
// @exclude			http://forum.travian*.*
// @exclude			http://board.travian*.*
// @exclude			http://shop.travian*.*
// @exclude			http://*.travian*.*/activate.php*
// @exclude			http://*.travian*.*/support.php*
// @exclude			http://help.travian*.*
// @exclude			http://analytics.traviangames.com/*
// @exclude			http://*.traviantoolbox.com/*
// @exclude			http://*.traviandope.com/*
// @exclude			http://*.travianteam.com/*
// @exclude			http://travianutility.netsons.org/*
// @exclude			*.css
// @exclude			*.js
// @require			http://code.jquery.com/jquery-1.5.min.js
// @require			http://sridharkatakam.com/js/jquery.corner.js
// @require			http://plugins.jquery.com/files/jquery.timers-1.2.js.txt
// @require			http://plugins.jquery.com/files/jquery.cookie.js.txt
// @require			http://jquery.bassistance.de/treeview/jquery.treeview.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/latest/external/jquery.bgiframe-2.1.2.js
// @require			http://jquery-ui-dialog-extra.googlecode.com/svn-history/r3/trunk/jquery.dialog.extra.js
// @require			https://raw.github.com/phstc/jquery-dateFormat/master/jquery.dateFormat-1.0.js
// @require			http://kadirtour.googlecode.com/svn-history/r208/NhibernateLibrary/Branch/KNA.Controls/Resources/jquery.format.1.04.js
// ==/UserScript==
//http://travilog.org.ua/
//http://logs.travianas.lt/	
//http://travian-reports.net/

var p0 = 5;
var img_u = 1;
var ttqftScript = false;
var trbpScript = false;
var tcnScript = false;
var p1 = window.location.href;
var message = 0;
var console = 0;
var p2 = 1;
var winn = new Array();
var count_winn = 0;
var p3 = self.location.href;
var p4 = p3.match(/(.)*\/\/(.)*\//gi);
var server_ = p4[0];
var server = server_.substr(0,server_.length-1);
var p5 = 'Mozilla/4.0 (compatible) Greasemonkey';
var accept = 'application/atom+xml,application/xml,text/xml';
var uid = 0;
var newdid = 0;
var zindex = 0;

function f0(href){
	var GM_JQ = document.createElement('link');
	GM_JQ.rel = 'stylesheet';
	GM_JQ.href = href;
	GM_JQ.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

f0('http://travian/bot/css/style.css');
f0('http://travian/jquery/treeview/jquery.treeview.css');
f0('http://travian/themes/base/jquery.ui.all.css');
f0('http://travian/demos/demos.css');

var app_arr = new Array();
var p6 = new Array();
var p7 = new Array();

var resource = new Array();
resource[0] = new Array();
resource[1] = new Array();
resource[2] = new Array();
resource[3] = new Array();

var resource_time = new Array();
resource_time['sec'] = new Array();
resource_time['min'] = new Array();
resource_time['hour'] = new Array();
resource_time['dey'] = new Array();
resource_time['color'] = new Array();

var sec = new Array();

var p8 = new Array();
	p8 = 	[
					"root",
					"about",
					"farm_list",
					"farm_list_time",
					"option",
					"log",
					"after_army",
					"study_army",
					"new_constr",
					"level_constr",
					"total_queue",
					"vmod_army",
					"salvation_army",
					"remove_constr",
					"notebook",
					"link",
					"mini_village",
					"holidays",
					"trading_routes",
					"trading_resource",
					"game_auction",
					"all_village_resource",
					"all_village_army",
					"all_village_time",
					"search_15",
					"admin_village",
					"reports",
					"autologin"
				];

var p9 = new Array();
	p9 = ["none","manipulation","about","help"];

var p11 = new Array();

var b_title_root = GM_getValue('before_title_root');
if (b_title_root == undefined){
	b_title_root = '';
}

p11["root"] = 				{'title':b_title_root+"jQBot",'zload':0};
p11["about"] =				{'title':"<span class='lang'>О программе</span>",'zload':0};
p11["farm_list"] = 			{'title':"<span class='lang'>Фарм лист</span>",'zload':0};
p11["farm_list_time"] = 		{'title':"<span class='lang'>Очередь фарма</span>",'zload':0};
p11["option"] =				{'title':"<span class='lang'>Настройки приложения</span>",'zload':0};
p11["log"] = 					{'title':"<span class='lang'>Лог</span>",'zload':0};
p11["after_army"] = 			{'title':"<span class='lang'>Очередь постройки войск</span>",'zload':0};
p11["study_army"] = 			{'title':"<span class='lang'>Очередь исследования войск</span>",'zload':0};
p11["new_constr"] = 			{'title':"<span class='lang'>Очередь постройки новых зданий</span>",'zload':0};
p11["level_constr"] = 		{'title':"<span class='lang'>Очередь усовершенствований зданий</span>",'zload':0};
p11["remove_constr"] =		{'title':"<span class='lang'>Очередь сноса зданий</span>",'zload':0};
p11["total_queue"] = 			{'title':"<span class='lang'>Общая очередь заказов</span>",'zload':0};
p11["vmod_army"] = 			{'title':"<span class='lang'>Очередь усовершенствований войск</span>",'zload':0};
p11["salvation_army"] = 		{'title':"<span class='lang'>Автоувод войск</span>",'zload':0};
p11["notebook"] = 			{'title':"<span class='lang'>Блакнот</span>",'zload':0};
p11["link"] = 				{'title':"<span class='lang'>Полезные ссылки</span>",'zload':0};
p11["mini_village"] = 		{'title':"<span class='lang'>Миницентр деревни</span>",'zload':0};
p11["holidays"] = 			{'title':"<span class='lang'>Проведение праздников</span>",'zload':0};
p11["trading_routes"] = 		{'title':"<span class='lang'>Торговые маршруты</span>",'zload':0};
p11["trading_resource"] = 	{'title':"<span class='lang'>Продажа и закупка рессурсов</span>",'zload':0};
p11["game_auction"] = 		{'title':"<span class='lang'>Игра на аукционе</span>",'zload':0};
p11["all_village_resource"] = {'title':"<span class='lang'>Рессурсы всех деревень</span>",'zload':0};
p11["all_village_army"] = 	{'title':"<span class='lang'>Армии всех деревень</span>",'zload':0};
p11["all_village_time"] = 	{'title':"<span class='lang'>Передвижения войск всех деревень</span>",'zload':0};
p11["search_15"] = 			{'title':"<span class='lang'>Поиск 15 и 9</span>",'zload':0};
p11["admin_village"] = 		{'title':"<span class='lang'>Деревни</span>",'zload':0};
p11["reports"] = 				{'title':"<span class='lang'>Анализ отчетов</span>",'zload':0};
p11["autologin"] = 			{'title':"<span class='lang'>Автоввод логина при сбое</span>",'zload':0};


var href = Array();

href['field'] = server + '/build.php?id=';
href['construct'] = server + '/build.php?id=';
href['resource'] = server + '/dorf1.php';
href['centr_village'] = server + '/dorf2.php';
href['karte'] = server + '/karte.php';
href['statistiken'] = server + '/statistiken.php';
href['berichte'] = server + '/berichte.php';
href['nachrichten'] = server + '/nachrichten.php';
href['heros'] = server + '/spieler.php?uid=19437';
href['allianz'] = server + '/allianz.php';
href['hero_adventure'] = server + '/hero_adventure.php';
href['send_army'] = server + '/a2b.php';

jQuery.fn.exists = function(){return this.length>0;}
jQuery.fn.notexists   = function(){return this.length<0;}

jQuery.fn.countElement = function() {
  return this.length;
}

jQuery.countElementNew = function(elem) {
}

function f1(app_arr_one){
	var p18 = "";	
	for (key in app_arr_one){
		p18 += '&' + key + '=' + app_arr_one[key]; 
		app_arr[key] = app_arr_one[key];
		GM_setValue(key,key+'='+app_arr_one[key]);
	}
	if (console=='1') unsafeWindow.console.log('p18 = ' + p18);
	f90(p18);
}


function f2(hash)
{
    for( var k in hash )
        return false;
    return true;
}

function f3(hash)
{
    var counter = 0;
    for( var k in hash )
        counter++;
    return counter;
}

function f4(){
	var this_href = $("li.entry a.active").attr('href').substr(8);
	if (this_href.indexOf('&')>0){
		this_href = this_href.substr(0,this_href.indexOf('&'));
	}
	newdid = parseInt(this_href);
}

function f5(str){
	var sec_return = 0;
	var timestr = jQuery.trim(str).split(':');
	sec_return = parseInt(timestr[0])*60*60 + parseInt(timestr[1])*60 + parseInt(timestr[2]);
	return sec_return;
}

function f6(){
		var arr_forest = $("span#l1").text().split("/");
		resource[0][1] = arr_forest[0];
		resource[0][2] = arr_forest[1];
		resource[0][0] = jQuery.trim($("#production tbody tr:nth-child(1)").find(".num").html());
		var arr_clay = $("span#l2").text().split("/");
		resource[1][1] = arr_clay[0];
		resource[1][2] = arr_clay[1];
		resource[1][0] = jQuery.trim($("#production tbody tr:nth-child(2)").find(".num").html());
		var arr_iron = $("span#l3").text().split("/");
		resource[2][1] = arr_iron[0];
		resource[2][2] = arr_iron[1];
		resource[2][0] = jQuery.trim($("#production tbody tr:nth-child(3)").find(".num").html());	
		var arr_crop = $("span#l4").text().split("/");
		resource[3][1] = arr_crop[0];
		resource[3][2] = arr_crop[1];
		resource[3][0] = jQuery.trim($("#production tbody tr:nth-child(4)").find(".num").html());
		f7();
		$(".value_dop").remove();
		if(/dorf1.php/.test(p1)){
			
			$("span#l1").before("<span style='color:"+resource_time['color'][0]+";margin:0px;padding:0px;top:30px;left:5px;' class='value value_dop'>["+resource_time['dey'][0]+":"+resource_time['hour'][0]+":"+resource_time['min'][0]+"]</span>");
			$("span#l2").before("<span style='color:"+resource_time['color'][1]+";margin:0px;padding:0px;top:30px;left:5px;' class='value value_dop'>["+resource_time['dey'][1]+":"+resource_time['hour'][1]+":"+resource_time['min'][1]+"]</span>");
			$("span#l3").before("<span style='color:"+resource_time['color'][2]+";margin:0px;padding:0px;top:30px;left:5px;' class='value value_dop'>["+resource_time['dey'][2]+":"+resource_time['hour'][2]+":"+resource_time['min'][2]+"]</span>");
			$("span#l4").before("<span style='color:"+resource_time['color'][3]+";margin:0px;padding:0px;top:30px;left:5px;' class='value value_dop'>["+resource_time['dey'][3]+":"+resource_time['hour'][3]+":"+resource_time['min'][3]+"]</span>");
		}
}

function f7()
{

	for (var i=0;i<4;i++)
	{
		if (resource[i][0] > 0)
		{
			sec[i] = [ Math.floor(3600*(resource[i][2]-resource[i][1])/resource[i][0])];
			resource_time['color'][i] = '#000000';
		} else{
			if (resource[i][0]<0)
			{

				sec[i] = [ Math.floor(3600*(-resource[i][1])/resource[i][0])];
			} else
			{
				sec[i]=[0];
			}
			
			resource_time['color'][i] = '#EE0000';
		}
		
		resource_time['sec'][i]  = sec[i];
		resource_time['dey'][i]  = f8(Math.floor(sec[i]/(60*24)));
		resource_time['hour'][i] = f8(Math.floor(sec[i]/(60))%(60));
		resource_time['min'][i]  = f8(Math.floor(sec[i])%(60));
	}
	return sec;
}

function f8(sec)
{
	var buf_t = sec;
		if (buf_t < 10){
			var buf_t_str = "0" + buf_t.toString();
		}else{
			var buf_t_str = buf_t.toString();
		}
		
	return buf_t_str;
}

function f9(maxtime, hours, minutes, seconds, off)
{
	return [Math.floor(maxtime/3600)+hours+off,(Math.floor(maxtime/60)%60)+minutes,(maxtime % 60)+seconds];
}

function f10(str,split_root,split_separator){

	var loadArray_arr = Array();
	var application = jQuery.trim(str).split(split_root);
	
	for (i=0; i<application.length; i++) {
		var param_arr = application[i].split(split_separator);
		loadArray_arr[param_arr[0]] = param_arr[1];
	}
	return loadArray_arr;
}

function f11(red, green, blue)
{
	var decColor = red + (256 * green) + (65536 * blue);
	decColor=decColor.toString(16);
	while( decColor.length < 6){
		decColor="0"+decColor;
	}
	return "#"+decColor;
}

function f12(href_param){
	self.location.href = href[href_param];
}

function f13(param){
	self.location.href = href['construct'] + param['id'];
}

function f14(){
	if($("form").exists()){
		document.forms[0].submit();
	}else{
	}
}

function f15(param){
	self.location.href = href['resource'] + '?newdid=' + param['newdid']+'&id=19';
}

function f16(set_send_army_arr){
	$("input#xCoordInput").val(set_send_army_arr['x']);
	$("input#yCoordInput").val(set_send_army_arr['y']);
	f21(set_send_army_arr);
	f20(set_send_army_arr['uid_tip_nap']);
	p0 = 0;
}


function f17(set_send_army_arr){
	$("input#xCoordInput").val(set_send_army_arr['x1']);
	$("input#yCoordInput").val(set_send_army_arr['y1']);
	f21(set_send_army_arr);	
	f20(set_send_army_arr['uid_tip_nap1']);
	p0 = 0;
}

function f18(set_send_army_arr){
	$("input#xCoordInput").val(set_send_army_arr['x2']);
	$("input#yCoordInput").val(set_send_army_arr['y2']);
	f21(set_send_army_arr);
	f20(set_send_army_arr['uid_tip_nap2']);
	p0 = 0;
}

function f19(set_send_army_arr){
	$("input#xCoordInput").val(set_send_army_arr['x3']);
	$("input#yCoordInput").val(set_send_army_arr['y3']);
	f21(set_send_army_arr);
	f20(set_send_army_arr['uid_tip_nap3']);
	p0 = 0;
}

function f20(uid_tip_nap){
	if (uid_tip_nap=='1'){
		$("input[value='2']").attr("checked","checked");
	}else if (uid_tip_nap=='2'){
		$("input[value='3']").attr("checked","checked");
	}else if (uid_tip_nap=='3'){
		$("input[value='4']").attr("checked","checked");
	}
}


function f21(set_send_army_arr){
	
	for(var i=1;i<12;i++){
		$("input[name=t"+i+"]").val(set_send_army_arr['a'+i]);
	}
}


function f22(delete_uid_farm_time){

	if($("form").exists() && jQuery.trim(($("div.button-contents").text()).indexOf('Подтвердить')==0)){
		f36('ajax_deleteFirstAttac','uid_farm_time='+delete_uid_farm_time['uid_farm_time'],'null');
		document.forms[0].submit();
	}else{
		
		f36('ajax_deleteFirstAttacRed','uid_farm_time='+delete_uid_farm_time['uid_farm_time'],'null');
	}
	
}


function f23(){
	var cancel_href = $("div.abort").html();
	cancel_href = cancel_href.substr(cancel_href.indexOf("'")+1);
	cancel_href = cancel_href.substr(0,cancel_href.indexOf("'"));
	cancel_href = cancel_href.replace(/&amp;/g,"&");
	self.location.href = cancel_href;
}


function f24(set_send_army_arr){
	if($("p.error").exists()){
		if($("p.error").html() == 'Деревня с данными координатами не существует'){
			f39('ajax_null_ch_exists_village','uid_farm_time=' + set_send_army_arr['uid_farm_time']);
		}else{
			f36('ajax_deleteFirstAttacRed','uid_farm_time='+set_send_army_arr['uid_farm_time'],'null');
		}
		f29();
	}
	p0 = 0;
}


function f25(param){
	if($("form").exists()){
			$("select option[value='"+param['id_remove']+"']").attr('selected','selected')
			f39('ajax_delete_constr','uid_remove_constr=' + param['uid_remove_constr'],'null');
			document.forms[0].submit();
	}else{
	}
}


function f26(param){
	if($("form").exists()){
		$("input#r1").val(param['forest']);
		$("input#r2").val(param['clay']);
		$("input#r3").val(param['iron']);
		$("input#r4").val(param['crop']);

		$("input#xCoordInput").val(param['x']);
		$("input#yCoordInput").val(param['y']);
		
		document.forms[0].submit();	
	}else{
		
	}
	
}



function f27(param){
	f69("next_remove_constr_timer="+f5($("span#timer1").html())+'&newdid='+newdid);
	p0 = 0;
}



function f28(set_send_army_arr){
	if($("p.error").exists()){
	
	}else{
		
		var p6 = $.cookie("event");
		
			f149(p6);
		
			p7['step'] = p7['submit_step'];
			
			var p18 = "";	
			for (key in p7){
				p18 += key + '=' + p7[key] + ';'; 
			}
			p18 = p18.substr(0,p18.length - 1);	
			$.cookie("event", p18);
		
	}
	
	p0 = 0;
}


function f29(){

		var p6 = $.cookie("event");
		f149(p6);
		p7['step'] = p7['max_step'];
		var p18 = "";	
		for (key in p7){
			p18 += key + '=' + p7[key] + ';'; 
		}
		p18 = p18.substr(0,p18.length - 1);	
		$.cookie("event", p18);	
}

function f30(step_param){
	$("input[name='t"+step_param['name_db'].substr(1)+"']").val(step_param['count']);
	p0 = 0;
}

function f31(step_param){
	var hstr = $(".contractLink").html();
	var ihref = hstr.indexOf('window.location.href') + 24;
	var iret = hstr.indexOf('return false');
	var tinterval = iret - ihref;
	hstr = hstr.substr(ihref,tinterval-3);
	self.location.href = server + '/' + hstr.replace(/&amp;/g,"&");
}


function f32(step_param){
	$('div.contractLink').each(function(index) {
		var cl_str = $(this).html();
		if (cl_str.indexOf("dorf2.php?a=" + step_param['id_num'])>0){
			var hstr = cl_str;
			var ihref = hstr.indexOf('window.location.href') + 24;
			var iret = hstr.indexOf('return false');
			var tinterval = iret - ihref;
			hstr = hstr.substr(ihref,tinterval-3);
			self.location.href = server + '/' + hstr.replace(/&amp;/g,"&");
		}
	});
}

function f33(step_param){
		$('div.contractLink').each(function(index){
			var cl_str = $(this).html();
			if (cl_str.indexOf('&amp;a='+step_param['name_db'].substr(1)+'&amp')>0){
				var hstr = cl_str;
				var ihref = hstr.indexOf('window.location.href') + 24;
				var iret = hstr.indexOf('return false');
				var tinterval = iret - ihref;
				hstr = hstr.substr(ihref,tinterval-3);
				self.location.href = server + '/' + hstr.replace(/&amp;/g,"&");
			}
		});
}


function f34(step_param){
		$('div.contractLink').each(function(index){
			var cl_str = $(this).html();
			if (cl_str.indexOf('&amp;a='+step_param['name_db'].substr(1)+'&amp')>0){
				var hstr = cl_str;
				var ihref = hstr.indexOf('window.location.href') + 24;
				var iret = hstr.indexOf('return false');
				var tinterval = iret - ihref;
				hstr = hstr.substr(ihref,tinterval-3);
				self.location.href = server + '/' + hstr.replace(/&amp;/g,"&");
			}
		});
}


function f35(step_param){
		$('div.contractLink').each(function(index){
			var cl_str = $(this).html();
			if (cl_str.indexOf('&amp;a='+step_param['name_db'].substr(1)+'&amp')>0){
				
				var hstr = cl_str;
				var ihref = hstr.indexOf('window.location.href') + 24;
				var iret = hstr.indexOf('return false');
				var tinterval = iret - ihref;
				hstr = hstr.substr(ihref,tinterval-3);
				self.location.href = server + '/' + hstr.replace(/&amp;/g,"&");
			}
		});
}


function f36(cmd,param,tip_request){

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event='+cmd+'&'+param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails){
			if (tip_request == 'alert'){
				alert(responseDetails.responseText);
			}
			
			if (tip_request == 'win'){
				f37(responseDetails.responseText);
			}

			
			f185();
		}
	});
}



var count_modal = 0;

function f37(text){
		
	count_modal++;
	
	var title_m = "Сообщение";
	var text_m_ok = 'ОК';
	var text_m = jQuery.trim(text);
	
	var lang = GM_getValue('lang');
	if (lang != 'ru'){
		title_m = f187(lang,title_m);
		text_m_ok = f187(lang,text_m_ok);
		text_m = f187(lang,text_m);
	}
	
		$("body").append("<div class='modal_win' id='modal_link_"+count_modal+"'></div>");
		
		$(function() {
			var div = $("div#modal_link_"+count_modal).html('');
			div.dialog(
				{ 
					title: title_m,
					minHeight: '10px',				
					dragStop: function(event, ui) {
					},
					
					focus: function(event, ui) {
					},
					
					dragStart: function(event, ui) { 
					},
					
					close: function(event, ui) {
						div.parent().remove();
					},
					 
					create: function(event, ui) {
						
					},
					
					canMinimize:false,
					
					resizeStop: function(event, ui) {
	
					},
						
					zIndex: 99999999,
					width: 400,
					
					buttons:[
						{
							text:text_m_ok,
							click:function(){
								div.dialog('close');
								div.parent().remove();
							}
						}
						
					]
					
				
	
				}
			);
			$("div#modal_link_"+count_modal).append("<div class='message'>"+text_m+"</div>");

		});
		
}


function f38(text){
	var style = 'div#win_error{text-align:center;background-color:#99CC99;z-index:999999;position: absolute;top: 20px;left: 20px;width:auto;height:auto;padding:10px;}';
	GM_addStyle(style);
	$("body").append("<div id='win_error'><b><span class='lang'>"+text+"</span>(MySQL)</b><br/>"+f100('start_www','','download full soft jQBot T4')+"</div>");
	$("#win_error").corner("round");
	f185();
	$("button#start_www").click(function(){
		f159(15);
	});
}




function f39(cmd,param,tip_request){

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event='+cmd+'&'+param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails){
			
			if (tip_request == 'alert'){
				alert(responseDetails.responseText);
			}
			
			if (tip_request == 'win'){
				f37(responseDetails.responseText);
			}
			
			switch(cmd){
				case 'ajax_add_remove_constr':
					f65();
				break;
				case 'ajax_add_level_constr':
					f52();
				break;
				case 'ajax_add_vmod_army':
					f52();
				break;
				case 'ajax_add_new_holidays':
					f52();
				break;
				case 'ajax_add_study_army':
					f52();
				break;
				case 'ajax_add_after_army':
					f52();
				break;
				case 'ajax_add_new_constr':
					f52();
				break;

				case 'ajax_delete_farm_list_on_this_time':

					f51();
				break;
				
				case 'ajax_generationAllAttacFieldList':

					f51();
					f37('Перегенерирована очередь фарма');
				break;
				
				case 'ajax_delete_constr':

					f65();
				break;

				case 'ajax_null_ch_exists_village':
				break;

				case 'ajax_update_uid_total_queue':
					f52();
				break;

				case 'ajax_delete_vmod_army':
					f52();
				break;
				
				case 'ajax_delete_study_army':
					f52();
				break;
				
				case 'ajax_delete_level_constr':
					f52();
				break;
				
				case 'ajax_delete_new_constr':
					f52();
				break;
				
				case 'ajax_delete_holidays':
					f52();
				break;
				
				case 'ajax_delete_after_army':
					f52();
				break;
				
				
				case 'ajax_load_next_zindex':
					zindex = parseInt(responseDetails.responseText);
				break;
				
				case 'ajax_load_next_zindex_start':
					zindex = parseInt(responseDetails.responseText);
				break;
				
				case 'ajax_add_new_link':
					f77();
				break;
				
				
				case 'ajax_delete_link':
					f77();
				break;
								
				case 'ajax_add_trading_routes':
					f63();
				break;
				
				case 'ajax_delete_trading_routes':
					f63();
				break;
				
				case 'ajax_search_15_clear':
					f68();
				break;
				
				case 'ajax_delte_my_village':
					f66();
				break;
				
				case 'ajax_run_village':
					f73(GM_getValue('farm_list_n')*23,'23');
					f51();
				break;
				
				case 'ajax_stop_village':
					f73(GM_getValue('farm_list_n')*23,'23');
					f51();
				break;
				
				case 'ajax_stop_village_d':
					f73(GM_getValue('farm_list_n')*23,'23');
				break;
				

				default: 
			}
			
		}
	});
}



function f40(param){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_html_get_mini_village&' + param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

			var html_and_color = (jQuery.trim(responseDetails.responseText)).split('|');
			
			if (GM_getValue('auto_color_level') == 'true'){
			
				var green = jQuery.trim(html_and_color[1]).split(":");
				if (green.length>40){
					f37('Проблемы с загрузкой миникарты, отключите конфликтующие программы');
					return 0;
				}
				for (i=0; i<green.length; i++){
					var p19 = $("div#levels div.aid"+green[i]).html();
					$("div#levels div.aid"+green[i]).html("");
					if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
					$("div#levels div.aid"+green[i]).append("<h2 class='level_constr'>"+p19+"</h2>");
					$("div#levels div.aid"+green[i]).append("<img class='color_constr' src='http://travian/bot/image/round_green.gif' id='img_t1' class=''/>");			
				}
				
				
				var red = jQuery.trim(html_and_color[2]).split(":");
				if (red.length>40){
					f37('Проблемы с загрузкой миникарты, отключите конфликтующие программы');
					return 0;
				}
				for (i=0; i<red.length; i++){
					var p19 = $("div#levels div.aid"+red[i]).html();
					$("div#levels div.aid"+red[i]).html("");
					if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
					$("div#levels div.aid"+red[i]).append("<h2 class='level_constr'>"+p19+"</h2>");
					$("div#levels div.aid"+red[i]).append("<img class='color_constr' src='http://travian/bot/image/round_red.gif' id='img_t1' class=''/>");			
				}
				
				
				var gold = jQuery.trim(html_and_color[3]).split(":");
				if (gold.length>40){
					f37('Проблемы с загрузкой миникарты, отключите конфликтующие программы');
					return 0;
				}
				for (i=0; i<gold.length; i++){
					var p19 = $("div#levels div.aid"+gold[i]).html();
					$("div#levels div.aid"+gold[i]).html("");
					if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
					$("div#levels div.aid"+gold[i]).append("<h2 class='level_constr'>"+p19+"</h2>");
					$("div#levels div.aid"+gold[i]).append("<img class='color_constr' src='http://travian/bot/image/round_gold.gif' id='img_t1' class='addArmyInQueue'/>");			
				}
			
			}

			$("#body_mini_village").append(html_and_color[0]);
		
			$("img[id^='count_']").bind("click",function(){
				self.location.href = href['construct']+$(this).attr('id').substr(6);
			});

		}
	});
}




function f41(){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_reset_application',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			
			GM_setValue('ajax_reset_application','1');
			GM_setValue('farm_list_n','0');
			GM_setValue('scaner_village','1');
			GM_setValue('all_visibility','true');
			GM_setValue('application_end','false');
			
			GM_setValue('auction_m','50');
			GM_setValue('auction_s','100');
			GM_setValue('auction_k','200');
			
			GM_setValue('lang','ru');

			GM_setValue('auto_all_village','true');
			GM_setValue('auto_salvation','true');
			GM_setValue('auto_all_event','true');
			GM_setValue('auto_army','true');
			GM_setValue('auto_remove_constr','true');
			GM_setValue('auto_constr','true');
			GM_setValue('auto_trading','true');
			GM_setValue('auto_color_level','true');
			GM_setValue('auto_www_link','true');
			GM_setValue('auto_this_link','true');
			GM_setValue('auto_login','true');
			GM_setValue('auto_button','true');
			GM_setValue('auto_auction','true');
			GM_setValue('reports_limit','25');
			GM_setValue('auto_reports','true');
			GM_setValue('autologin_login','');
			GM_setValue('autologin_password','');
			GM_setValue('add_click',0);
			f37(responseDetails.responseText);
			self.location.href = f76();
		}
	});
}





function f42(){
	
	
	if (GM_getValue('auto_army') == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://travian/ajax/router.php?event=ajax_getFirstAttac_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {

				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					
					$.cookie("event", jQuery.trim(responseDetails.responseText));
					if (p2=='1') f184("<span class='blue lang'>[3]+Отправка войска</span>");
				}else{
					if ((jQuery.trim(responseDetails.responseText)) == '-1'){
						
						if (p2=='1') f184("<span class='brown lang'>[3]-Отправка войска</span>");
						f51();
						
					}
					
					if ((jQuery.trim(responseDetails.responseText)) == '0'){
						if (p2=='1') f184("<span class='brown lang'>[3]-Отправка войска</span>");
						
					}

					f45();
					
				}
				
			}
		});
	}else{
		f45();
	}
}



function f43(){

	if (GM_getValue('auto_trading') == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://travian/ajax/router.php?event=ajax_getFirstTradingRoutes_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
	
				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					
				
					$.cookie("event", jQuery.trim(responseDetails.responseText));
					if (p2=='1') f184("<span class='blue lang'>[6]+Отправка торговцев</span>");
				}else{
					if ((jQuery.trim(responseDetails.responseText)) == '-1'){
						
						if (p2=='1') f184("<span class='brown lang'>[6]-Отправка торговцев</span>");
						f51();
						
					}
					
					if ((jQuery.trim(responseDetails.responseText)) == '0'){
						if (p2=='1') f184("<span class='brown lang'>[6]-Отправка торговцев</span>");
						
					}

				}
				
			}
		});
	}else{
	}
}



function f44(){

	if (GM_getValue('auto_salvation') == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_getSalvationArmy_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
			
				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					if (p2=='1') f184("<span class='blue lang'>[1]+Автоувод армии</span>");
					$.cookie("event", jQuery.trim(responseDetails.responseText));
				}else{
					if (p2=='1') f184("<span class='brown lang'>[1]-Автоувод армии</span>");
					f46();
				}
			}
		});
	}else{
		f46();
	}
}



function f45(){

	if (GM_getValue('auto_remove_constr') == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_getRemoveConstr_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					if (p2=='1') f184("<span class='blue lang'>[4]+Рушим здания</span>");
					$.cookie("event", jQuery.trim(responseDetails.responseText));
	
				}else{
					if (p2=='1') f184("<span class='brown lang'>[4]-Рушим здания</span>");
					f47();
				}
				
			}
		});
	}else{
		f47();
	}
}



function f46(){
	
	if (GM_getValue('auto_all_event') == 'true'){
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://travian/ajax/router.php?event=ajax_getFirstQueue_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				
				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					
					if (p2=='1') f184("<span class='blue lang'>[2]+Общая очередь</span>");
					$.cookie("event", jQuery.trim(responseDetails.responseText));
					
				}else{
					if ((jQuery.trim(responseDetails.responseText)) == '-1'){
	
					}
					
					if (p2=='1') f184("<span class='brown lang'>[2]-Общая очередь</span>");
					f42();
					
				}
				
			}
		});
	}else{
		f42();
	}
}

function f47(){
	
	
	if (GM_getValue('auto_constr') == 'true'){
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://travian/ajax/router.php?event=ajax_getFirstQueueConstr_and_exec&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				
				if((jQuery.trim(responseDetails.responseText)) != '0' && (jQuery.trim(responseDetails.responseText)) != '-1' && (jQuery.trim(responseDetails.responseText) != '')){
					
					if (p2=='1') f184("<span class='blue lang'>[5]+Общая очередь(здания)</span>");
					$.cookie("event", jQuery.trim(responseDetails.responseText));
					
					
				}else{
					
					if ((jQuery.trim(responseDetails.responseText)) == '-1'){
	
					}
					
					if (p2=='1') f184("<span class='brown lang'>[5]-Общая очередь(здания)</span>");
					
	
					f43();
					
				}
				
			}
		});
	}else{
		f43();
	}
}

var Utf8 = {
 
	encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}



function f48(){

	
	var d = $("div#tileDetails div.detailImage div.options div:nth-child(2)").find("a").attr('href');
	d = d.substr(10);
	

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://travian/ajax/router.php?event=ajax_addVillage_in_farmListVillage'
			+'&user_name=' + $("#village_info tbody tr:nth-child(3)").find('a[href^=spieler]').html()
			+'&name=' + $("span.coordinates").find("span.coordText").html()
			+'&people=' + $("#village_info tbody tr:nth-child(1)").find("td").html()
			+'&population=' + $("#village_info tbody tr:nth-child(4)").find("td").html()
			+'&alliance=' + $("#village_info tbody tr:nth-child(2)").find("td").html()
			+'&x=' + $("span.coordinateX").html().substring(1)
			+'&y=' + $("span.coordinateY").html().substring(0, $("span.coordinateY").html().length-1)
			+'&interval=' + $("#farm_interval").val()
			+'&interval_drift=' + $("#farm_interval_drift").val()
			+'&interval=' + $("#farm_interval").val()
			+'&a1=' + $("#farm_a1").val()
			+'&a2=' + $("#farm_a2").val()
			+'&a3=' + $("#farm_a3").val()
			+'&a4=' + $("#farm_a4").val()
			+'&a5=' + $("#farm_a5").val()
			+'&a6=' + $("#farm_a6").val()
			+'&a7=' + $("#farm_a7").val()
			+'&a8=' + $("#farm_a8").val()
			+'&a9=' + $("#farm_a9").val()
			+'&a10=' + $("#farm_a10").val()
			+'&a11=' + $("#farm_a11").val()
			+'&uid_tip_nap=' + $("select#uid_tip_nap option:selected").val()
			+'&newdid='+newdid
			+'&d='+ d
			,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			$("#farm_list_add_table").remove();
			$("#add_in_farm_list").parent().remove();
			
			f73(GM_getValue('farm_list_n')*23,'23');
			f51();
		}
	});
}


function f49(){

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://travian/ajax/router.php?event=ajax_save_salvation_army'
			+'&newdid='+newdid
			+'&flag_salvation_army=' + $("input#flag_salvation_army").attr('checked')
			+'&sa_a1=' + $("input#sa_a1").attr('checked')
			+'&sa_a2=' + $("input#sa_a2").attr('checked')
			+'&sa_a3=' + $("input#sa_a3").attr('checked')
			+'&sa_a4=' + $("input#sa_a4").attr('checked')
			+'&sa_a5=' + $("input#sa_a5").attr('checked')
			+'&sa_a6=' + $("input#sa_a6").attr('checked')
			+'&sa_a7=' + $("input#sa_a7").attr('checked')
			+'&sa_a8=' + $("input#sa_a8").attr('checked')
			+'&sa_a9=' + $("input#sa_a9").attr('checked')
			+'&sa_a10=' + $("input#sa_a10").attr('checked')
			+'&sa_a11=' + $("input#sa_a11").attr('checked')
			+'&sa_ax1=' + $("input#sa_ax1").val()
			+'&sa_ay1=' + $("input#sa_ay1").val()
			+'&uid_tip_nap1=' + $("select#uid_tip_nap1 option:selected").val()
			+'&sa_ax2=' + $("input#sa_ax2").val()
			+'&sa_ay2=' + $("input#sa_ay2").val()
			+'&uid_tip_nap2=' + $("select#uid_tip_nap2 option:selected").val()
			+'&sa_ax3=' + $("input#sa_ax3").val()
			+'&sa_ay3=' + $("input#sa_ay3").val()
			+'&uid_tip_nap3=' + $("select#uid_tip_nap3 option:selected").val()
			+'&min_time=' + $("input#min_time").val()
			,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			
			f37(responseDetails.responseText);
			
			f62();
		}
	});
}


function f50(color,param){

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_get_checking_in_farm_list' + param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
		
		
			$("div#tileDetails div.detailImage div.options").append('<div class="option" id="div_options"><a id="add_in_farm_list" class="a arrow" href="#"><span class="lang">Добавить деревню в фарм лист</span></a></div>');
			$("div.dialog").parent().css('top','60px');
			
			$("div.detailImage").append(responseDetails.responseText);
			
			if ($("#delete_title_in_village").exists()){
				$("#add_in_farm_list").parent().remove();
			}
			

			$("a[id^='ifl_']").bind("click", function(e){
				var img_id_village = $(this).attr('id').substr(4);
				f78(img_id_village,'0','23');
			});
			
			$("#add_in_farm_list").click(function(){

				f48();
			});
			
			flag_add_village = 0;
			
			if (color == 'white'){
				$("td.trfl").addClass("trfl_white").removeClass("trfl");
			}
	
			f185();
			f112();
		}
	});
}




function f51(){

	if (app_arr['win_farm_list_time_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_farm_list_time&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_farm_list_time").remove();
				
				if (!$("button#ajax_delete_on_this_time").exists()){
					$("#body_farm_list_time").append("<div style='text-align:center;background-color:#CFCDC8 !important;'>"+f100('ajax_delete_on_this_time','','Сброс всех напов до текущего времени')+"</div>");
					$("button#ajax_delete_on_this_time").click(function(){						
						f39('ajax_delete_farm_list_on_this_time','newdid='+newdid,'null');
					});
				}
				
				$("#body_farm_list_time").append(responseDetails.responseText);

				$("img[id^='iflt_']").bind("click", function(e){
					
					var img_id = $(this).attr('id').substr(5);
					f36('ajax_deleteFirstAttacRed','uid_farm_time='+img_id,'null');
					f51();
					
					
				});
				
				$("img[id^='iswo_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f36('ajax_deleteFirstAttacNull','uid_farm_time='+img_id,'null');
					f51();
				});
				
				$("button#exec_count_att").click(function(){
					var count = $("select#exec_count_select").val();
					f36('ajax_exec_count_att','count='+count + '&newdid='+newdid,'win');
					f51();
				});
				f185();
			}
		});
		
		
	}
}



function f52(){

	if (app_arr['win_total_queue_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_total_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_total_queue").remove();
				$("#body_total_queue").append(responseDetails.responseText);
				$("img[id^='titq_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_update_uid_total_queue','uid_queue=' + img_id + '&vector=top','null');
				});
				
				$("img[id^='bitq_']").bind("click", function(e){
					
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_update_uid_total_queue','uid_queue=' + img_id + '&vector=bottom','null');
					
					
				});
				$("img[id^='citq_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					
					f72(img_id);
					
				});
				
				f53();
				f61();
				
				f60();
				f70();
				f71();
				
				f64();
				f185();
			}
		});
	}else{
		f53();
		f61();
		
		f60();
		f70();
		f71();
		f64();
		f185();
	}
}


function f53(){
	if (app_arr['win_after_army_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_after_army_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_after_army").remove();
				$("#body_after_army").append(responseDetails.responseText);
				$("img[id^='itaa_']").bind("click", function(e){
					
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_delete_after_army','uid_after_army=' + img_id,'null');
				});
				f185();
			}
		});
	}
}


function f54(param){
	if (app_arr['win_all_village_resource_show'] == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_all_village_resource&'+param,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {

			var html_and_progress = (jQuery.trim(responseDetails.responseText)).split('|');
			
			$("#table_all_village_resource").remove();				
			$("#body_all_village_resource").append(html_and_progress[0]);

			var progress = jQuery.trim(html_and_progress[1]).split(";");
			
			for (i=0; i<progress.length; i++){
				var element_progress = progress[i].split("=");
				$( "#"+element_progress[0]).progressbar({
					value: parseInt(element_progress[1])
				});
			}
			
			for (i=0; i<progress.length; i++){
				var element_progress = progress[i].split("=");
				
				if (parseInt(element_progress[1])>85){
					$( "#"+element_progress[0] + " div.ui-progressbar-value").css('background-image','url("http://travian/themes/base/images/ui-bg_highlight-soft_75_cccccc_1x100_red.png")');
				}else if (parseInt(element_progress[1])>10){
					$( "#"+element_progress[0] + " div.ui-progressbar-value").css('background-image','url("http://travian/themes/base/images/ui-bg_highlight-soft_75_cccccc_1x100_orange.png")');
				}
			}

			f185();	
			
			$("button#reload_all_village_resource").click(function(){
				f170();
			});

			}
		});
	}
}


function f55(param){

	if (app_arr['win_all_village_army_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_all_village_army&'+param,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_all_village_army").remove();
								
				$("#body_all_village_army").append(responseDetails.responseText);
				
				f185();
				
				$("button#reload_all_village_army").click(function(){
					f170();
				});

			}
		});
	}
}


function f56(param){


	if (app_arr['win_all_village_time_show'] == 'true'){


		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_all_village_time&'+param,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_all_village_time").remove();
				$("#body_all_village_time").append(responseDetails.responseText);
				f185();
				$("button#reload_all_village_time").click(function(){
					f170();
				});
				
			}
		});
	}
}



function f57(){
	f150();
	self.location.href = f76();
}


function f58(){


	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_html_get_application_param_table',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			
			$("#tab_about").append(responseDetails.responseText);
			
			

			$("#stop_event_timer").click(function(){
				f165();
			});
			
			
			$("#run_event_timer").click(function(){
				f166();
			});
			
			
			$("#stop_all_timer").click(function(){
				f163();
			});
			
			$("#run_all_timer").click(function(){
				f164();
			});
			

			$("#delete_p7_step").click(function(){
				f57();
			});
			
			
			$("#table_save_application_param").click(function(){
				f89();
			});
			
			f185();		
		}
	});
	
}



function f59(){

	if (app_arr['win_option_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_option',
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				
				$("#table_option").remove();
				$("#body_option").append(responseDetails.responseText);
				
				
				$("#table_save_application_param").click(function(){
					f89();
				});
						
						
				f185();
			}
		});
	}
	
}




function f60(){

	if (app_arr['win_study_army_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_study_army_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_study_army").remove();
				$("#body_study_army").append(responseDetails.responseText);

				$("img[id^='itsa_']").bind("click", function(e){
					
					var img_id = $(this).attr('id').substr(5);
					
					f39('ajax_delete_study_army','uid_study_army=' + img_id,'null');
					
					
				});
				f185();
			}
		});
	}
}



function f61(){

	
	if (app_arr['win_vmod_army_show'] == 'true'){

		
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_vmod_army_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_vmod_army").remove();
				$("#body_vmod_army").append(responseDetails.responseText);
				
				$("img[id^='itva_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_delete_vmod_army','uid_vmod_army=' + img_id,'null');
				});
				
				f185();
			}
		});
	}
}


function f62(){

	
	if (app_arr['win_salvation_army_show'] == 'true'){

		
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_salvation_army&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_salvation_army").remove();
				$("#body_salvation_army").append(responseDetails.responseText);
				
				
				$("button[id='sa_save']").bind("click", function(e){
					f49();
				});
				
				f185();
				f112();
			}
		});
	}
}


function f63(){

	
	if (app_arr['win_trading_routes_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_trading_routes&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails){
				$("#table_trading_routes").remove();
				$("#body_trading_routes").append(responseDetails.responseText);
				
				$("img[id^='itrro_']").bind("click", function(e){
					var img_trading_routes = $(this).attr('id').substr(6);
					f39('ajax_delete_trading_routes','uid_trading_routes=' + img_trading_routes,'null');
				});
				f185();
			}
		});
	}
}


function f64(){

	
	if (app_arr['win_holidays_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_holidays&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_holidays").remove();
				$("#body_holidays").append(responseDetails.responseText);
				
				$("img[id^='ithd_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_delete_holidays','uid_holidays=' + img_id,'null');
				});
				f185();
			}
		});
	}
}


function f65(){

	if (app_arr['win_remove_constr_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_remove_constr&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
			
				$("#table_remove_constr").remove();
				$("#body_remove_constr").append(responseDetails.responseText);

				$("img[id^='irca_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					ajax_delete_constr(img_id + '&position=min');
				});
				f185();
			}
		});
	}
}



function f66(){

	if (app_arr['win_admin_village_show'] == 'true'){
		
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_admin_village&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {

				$("#table_admin_village").remove();
				$("#body_admin_village").append(responseDetails.responseText);
				
				$("img[id^='ivill_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(6);
					f39('ajax_delte_my_village','newdid='+img_id,'null');
				});

				$("button#reload_admin_village").click(function(){
					f67();
				});
				
				f185();
			}
		});
	}
}

function f67(){
	$("div.list").find("li.entry  a").each(function(index){
		var href_arr = ($(this).attr('href')).match(/[0-9]{1,8}/gi);
		var href_a = href_arr[0];
		GM_xmlhttpRequest({
			method: 'GET',
			url: self.location.href,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				var post_root = responseDetails.responseText;
				var start = post_root.indexOf('newdid='+href_a);
				var post = post_root.substr(start);
				var end = post.indexOf("</a>");
				post = post.substr(0,end);
				var mass = post.match(/[0-9,-]{1,9}/gi);
				var end_mass = mass.length;
				f36('ajax_reload_admin_village','newdid='+mass[0]+'&x='+mass[end_mass-3]+'&y='+mass[end_mass-2]+'&name='+mass[end_mass-1],'null');
			}
		});
		setTimeout(function(){f66();},2000);
	});
}

function f68(){
	if (app_arr['win_search_15_show'] == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_search_15&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {

				$("#table_search_15").remove();
				$("#body_search_15").append(responseDetails.responseText);
				
				$("button#search_15_clear").click(function(){
					f39('ajax_search_15_clear','','null');
				});

				$("button#search_15_button").click(function(){

					GM_xmlhttpRequest({
						method: 'GET',				
						url: 'http://travian/ajax/router.php?event=get_xy&newdid=' + newdid,
						headers: {
							'User-agent': p5,
							'Accept': accept,
						},
						onload: function(responseDetails) {
							var xy = ($.trim(responseDetails.responseText)).split(":");
							var x = parseInt(xy[0]);
							var y = parseInt(xy[1]);
							
							var r = parseInt($("input#search_15_radius").val());
							
							var r_2 = Math.floor(r/2);
							
							
							for(var i=x-r_2;i<x+r_2;i++){
								for(var j=y-r_2;j<y+r_2;j++){
									
									if ((i==x+r_2-1)&&(j==y+r_2-1)){
										f147(i,j,x,y,'null');
									}else{
										f147(i,j,x,y,'end');
									}
								}
							}

							f37('Поиск завершен');

						}
					});
					
				});

				f185();
				f112();
			}
		});
	}
}


function f69(param){

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_set_my_timer_next_remove_constr&' + param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

		}
	});
	
}


function f70(){

	if (app_arr['win_new_constr_show'] == 'true'){

		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_new_constr_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_new_constr").remove();
				$("#body_new_constr").append(responseDetails.responseText);
				$("img[id^='itnc_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_delete_new_constr','uid_new_constr=' + img_id,'null');
				});
				f185();
			}
		});
	}
}


function f71(){
	if (app_arr['win_level_constr_show'] == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_level_constr_queue&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_level_constr").remove();
				$("#body_level_constr").append(responseDetails.responseText);
				$("img[id^='itlc_']").bind("click", function(e){
					var img_id = $(this).attr('id').substr(5);
					f39('ajax_delete_level_constr','uid_level_constr=' + img_id,'null');
				});
				f185();
			}
		});
	}
}


function f72(param){

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_delete_total_queue&uid_queue=' + param,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			f52();
			
			f53();
			f61();
			f60();

			f70();
			f71();
			
			f64();
		}
	});
}


function f73(pos,count){

	if (app_arr['win_farm_list_show'] == 'true'){
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_farm_list&pos='+pos+'&count='+count+'&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_farm_list").remove();

				if (!$("button#ajax_generationAllAttacFieldList").exists()){
					$("#body_farm_list").append("<div class='button_fon'>"+f100('ajax_generationAllAttacFieldList','','Сброс очереди фарма')+"</div>");
					$("button#ajax_generationAllAttacFieldList").click(function(){
						f39('ajax_generationAllAttacFieldList','newdid='+newdid,'null');
					});
				}
				
				$("#body_farm_list").append(responseDetails.responseText);
				
				
				$("button[class='a_rows']").bind("click", function(e){
					
					var a_pos = $(this).attr('id').substr(3);
					
					GM_setValue('farm_list_n',a_pos);
					
					f73((parseInt(a_pos)*count).toString(),'23');
					
				});
				
				
				$("img[id^='ifl_']").bind("click", function(e){
					var img_id_village = $(this).attr('id').substr(4);
					f78(img_id_village,pos,count);
				});

				$("img[id^='irun_']").bind("click", function(e){
					
					var img_id_village = $(this).attr('id').substr(5);
					f39('ajax_run_village','uid_village='+img_id_village,'null');
				});
				
				$("img[id^='istp_']").bind("click", function(e){
					var img_id_village = $(this).attr('id').substr(5);
					f39('ajax_stop_village','uid_village='+img_id_village,'null');
				});
				
				
				$("img#save_radius").click(function(){
					f39('ajax_set_farm_radius','newdid=' + newdid + '&radius=' + $("input#att_radius").val(),'alert');
				});
				
				
				f185();
				f112();
			}
		});
	}
}


function f74(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}



function f75(param){
	if (!($("div#modal_link").exists())){
	
	
	var title_m = "Новая ссылка";
	var text_m_ok = 'ОК';
	var text_m_cancel = 'Отмена';
	
	var lang = GM_getValue('lang');
	if (lang != 'ru'){
		title_m = f187(lang,title_m);
		text_m_ok = f187(lang,text_m_ok);
		text_m_cancel = f187(lang,text_m_cancel);
	}
	
		$("body").append("<div class='modal_win' id='modal_link'></div>");
		
		$(function() {
			var div = $("#modal_link").html('');
			div.dialog(
				{ 
					title: title_m,
					minHeight: '10px',				
					dragStop: function(event, ui) {
					},
					
					focus: function(event, ui) {
					},
					
					dragStart: function(event, ui) { 
					},
					
					close: function(event, ui) {
						div.parent().remove();
					},
					 
					create: function(event, ui) {
					},
					
					canMinimize:false,
					
					resizeStop: function(event, ui) {
	
					},
					zIndex: 99999999,
					width: 400,
					
					buttons:[
						{
							text:text_m_ok,
							click:function(){
								
								f39('ajax_add_new_link',
									'&input_new_link_name='+($("input#input_new_link_name").val()).replace(/&/g, "ampampampamp")+
									'&input_new_link_href='+($("input#input_new_link_href").val()).replace(/&/g, "ampampampamp")+
									'&type_link='+$("select#type_link option:selected").val()
									,'win');
								div.dialog('close');
								div.parent().remove();
							}
						},
						{
							text:text_m_cancel,
							click:function(){
								div.dialog('close');
								div.parent().remove();
							}
						}
					]
					
				
	
				}
			);
			$("#modal_link").append("<table id='modal_table_link' style='width:100%;'>"+
				"<col style='width:100px;'/>"+
				"<col/>"+
				"<tr>"+
					"<td>"+
						"<span class='lang'>Название</span>:"+
					"</td>"+
					"<td>"+
						"<input style='width:98%;' type='text' value='' id='input_new_link_name'>"+				
					"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>"+
						"<span class='lang'>Ссылка</span>:"+
					"</td>"+
					"<td>"+
						"<input style='width:98%;' "+(param=='this'?'disabled':'')+" type='text' value='"+(param=='this'?f76():'')+"' id='input_new_link_href'>"+
					"</td>"+
				"</tr>"+
													
													
				"<tr>"+
					"<td>"+
						"<span class='lang'>Тип</span>:"+
					"</td>"+
					"<td>"+
						"<select id='type_link' style='width:99% !important;'>"+
							"<option value='1' ><span class='lang'>Открывать в текущей вкладке</span></option>"+
							"<option value='2' ><span class='lang'>Открывать в новой вкладке</span></option>"+
						"</select>"+
					"</td>"+
				"</tr>"+
			"</table>");
		});
		
		$("div#modal_link").parent().css('z-index','99999999');
		
		f185();
	}
}


function f76(){
	return  (self.location.href).replace('#','');
}


function f77(){


	if (app_arr['win_link_show'] == 'true'){
		


		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_html_get_link&newdid='+newdid,
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("#table_link").remove();
				$("#body_link").append(responseDetails.responseText);

				$("button#new_link").bind("click", function(e){
					f75('new');
				});
				
				$("button#new_this_link").bind("click", function(e){
					f75('this');
				});

				$("img[id^='ilink_']").bind("click", function(e){
					var img_id_link = $(this).attr('id').substr(6);
					f39('ajax_delete_link','&uid_link='+img_id_link,'null');
				});
				
				f185();
				
			}
		});
	}
}


function f78(uid_village,pos,count){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_delete_village&uid_village=' + uid_village,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

			f73(GM_getValue('farm_list_n')*23,'23');
			
			if ($("div.dialog").exists() || $("div#contentOuterContainer").exists()){
				$("#red_title_in_village").remove();
				$("#delete_title_in_village").remove();
				$("#farm_list_add_table").remove();
			}
			
		}
	});
}


function f79(){

	var att1 = $("img.att1").parent().parent().parent().find("span[id^='timer']").html(); //Нападение на нас
	var att2 = $("img.att2").parent().parent().parent().find("span[id^='timer']").html(); //Мы нападаем
	var def1 = $("img.def1").parent().parent().parent().find("span[id^='timer']").html(); //Возвращения
	var def2 = $("img.def2").parent().parent().parent().find("span[id^='timer']").html(); //Подкрепление
	var att3 = $("img.hero_on_adventure").parent().parent().parent().find("span[id^='timer']").html();  //Приключение

	var time_att1 = f5(att1);
	var time_att2 = f5(att2);
	var time_att3 = f5(att3);
	
	var time_def1 = f5(def1);
	var time_def2 = f5(def2);
	
	var bf = 'true';
	if ($("table#building_contract").exists()){
		var bf = 'true';
	}else{
		var bf = 'false';
	}

	var army = '';
	
	for(iw=0;iw<10;iw++){
		if ($("img.u"+img_u+iw.toString()).exists()){
			army  = army +'&a'+iw.toString()+'=' + $("img.u"+img_u+iw.toString()).parent().parent().parent().find(".num").html();
		}else{
			army  = army +'&a'+iw.toString()+'=0';
		}
	}
	
	if ($("img.u20").exists()){
		army  = army +'&a10=' + $("img.u20").parent().parent().parent().find(".num").html();
	}else{
		army  = army +'&a10=0';
	}
	
	if ($("img.uhero").exists()){
		army  = army +'&a11=' + $("img.uhero").parent().parent().parent().find(".num").html();
	}else{
		army  = army +'&a11=0';
	}
		

	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_set_my_param_village&'
		+ '&forest=' + resource[0][1]
		+ '&forest_inc=' + resource[0][0]
		+ '&forest_max=' + resource[0][2]
		+ '&clay=' + resource[1][1]
		+ '&clay_inc=' + resource[1][0]
		+ '&clay_max=' + resource[1][2]
		+ '&iron=' + resource[2][1]
		+ '&iron_inc=' + resource[2][0]
		+ '&iron_max=' + resource[2][2]
		+ '&crop=' + resource[3][1]
		+ '&crop_inc=' + resource[3][0]
		+ '&crop_max=' + resource[3][2]
		+ army
		+ '&building_contract=' + bf
		+ '&att1=' + time_att1
		+ '&att2=' + time_att2
		+ '&att3=' + time_att3
		+ '&def1=' + time_def1
		+ '&def2=' + time_def2
		+ '&newdid=' + newdid
		,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
		}
	});
}



function f80(server_timer){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_set_my_timer'
		+ '&server_timer=' + server_timer
		,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

		}
	});
}


function f81(param){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_set_my_timer_online&' + param
		,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			
			$("h1.h1_timer").remove();
			$("div.art-post-inner").append("<h1 class='h1_timer'>"+responseDetails.responseText+"<h1b>");
			
			if ( (jQuery.trim(responseDetails.responseText)) == 'reset'){

				if (winn.length > 0){
					winn[count_winn].close();
					count_winn++;
				}else{

				}
				winn[count_winn] = window.open(server + '/dorf1.php?count_winn='+count_winn);
			}

		}
	});
}



function f82(){

	var p18 = "";	
	for (key in app_arr){
		p18 += '&' + key + '=' + app_arr[key]; 
		GM_setValue(key,key+'='+app_arr[key]);
	}
	if (console=='1') unsafeWindow.console.log('p18 = ' + p18);
}


function f83(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://travian/ajax/router.php?event=ajax_load_application_param',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			
			var app = responseDetails.responseText;			
			var application = jQuery.trim(app).substr(1).split(";");
			
			if (message == 1) alert(application);
				
			for (i=0; i<application.length; i++){
				var param_cookie = application[i].split("=");
				app_arr[param_cookie[0]] = param_cookie[1];
			}
			
			f82();
		}
	});
	
}


function f84(){
	var vals = [];
	for each (var val in GM_listValues()) {
	  vals.push(GM_getValue(val));
	}

	var p18 = "";
	for (key in vals){
	
		if (typeof(vals[key]) == "string"){
			if (vals[key].indexOf('=')>-1){
				var separator = vals[key].split('=');
				if (separator.length == 2){
					app_arr[separator[0]] = separator[1];
				}
			}					
		}

	}
	
	zindex = 0;
	for (key in app_arr){
		if (key.indexOf('_z')>0){
			if (app_arr[key] > zindex) zindex=app_arr[key];
		}
	}
}


function f85(){

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://travian/ajax/router.php?event=ajax_load_application_param',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

			GM_setValue('GM_xmlhttpRequest','true');
			
			f4();

			var app = responseDetails.responseText;			
			var application = jQuery.trim(app).substr(1).split(";");

			if (message == 1) alert(application);
				
			for (i=0; i<application.length; i++){
				var param_cookie = application[i].split("=");
				app_arr[param_cookie[0]] = param_cookie[1];
			}

			zindex = app_arr['zindex'];
			
			if (app_arr['uid_people'] == '1'){img_u = '';}
			else if (app_arr['uid_people'] == '2'){ img_u = '1';}
			else if (app_arr['uid_people'] == '3'){ img_u = '2';}
			else { img_u = '1';}
			
			if (GM_getValue('ajax_reset_application')=='1'){
				f83();
				GM_setValue('ajax_reset_application','0');
			}
			
			f87();

		},
		
		onerror: function() {
			f38('Запустите Denver 3');
		}
		
	});	
	
	
}


function f86(){
	var checking_village_name = '';
	$("div.list").find("li.entry  a").each(function(index){
		checking_village_name += '_'+$(this).html();
	});

	if (GM_getValue('checking_village_name') != checking_village_name){
		f67();
		GM_setValue('checking_village_name',checking_village_name);
	}
}


function f87(){
	f111();
	roundessf37();
	f155();
	f180(); 
	f185();
	setTimeout(function(){f156();},1000);
	if (console=='1') unsafeWindow.console.log('Конец работы скрипта');
	f86();
}

function f88(){
	$("div.tab").css('background-color','#FF8888');
	$("table#application_param tbody tr td").css('background-color','#FF8888');
}

function f89(){


	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_table_save_application_param'+
		'&timer_event_interval=' + $("select#timer_event_interval option:selected").val() +
		'&timer_scaner_interval=' + $("select#timer_scaner_interval option:selected").val() +
		'&total_queue_strateqy_exec=' + $("select#total_queue_strateqy_exec option:selected").val() +
		'&uid_people=' + $("select#uid_people option:selected").val()
		,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			f37(responseDetails.responseText);
		}
	});
}


function f90(param){
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=ajax_save_application_param'+ param
		,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
		}
	});
}


var flag_add_village = 0;

function f91(color){
	if ($("div#tileDetails div.detailImage div.options").find("#add_in_farm_list").exists()){

	}else{
		if ($("#delete_title_in_village").exists()){
			
		}else{

			if (flag_add_village == 0){
				flag_add_village = 1;
				if ( $("span.coordinates").find("span.coordText").html() == null){
					flag_add_village = 0;
				}else{
					f50(color,'&newdid='+newdid+'&village_name=' + $("span.coordinates").find("span.coordText").html() + '&x=' + $("span.coordinateX").html().substring(1) + '&y=' + $("span.coordinateY").html().substring(0, $("span.coordinateY").html().length-1));
				}
				
			}
			
		}
	}
}


function f92(){
	if (!($(".addArmyInQueue").exists())){
	
		for(var i=0;i<10;i++){
			$("input[name='t"+i+"']").parent().append("<br/><img src='http://travian/bot/image/addArmyInQueue.gif' id='img_t"+i+"' class='addArmyInQueue'/>");
		}

		$("img[id^='img_t']").bind("click", function(e){
			var img_id = $(this).attr('id').substr(5);
			var count_army = $("input[name='t"+img_id+"']").val();
			var constr = (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');

			f39('ajax_add_after_army','name_db=a'+img_id+'&count='+count_army+'&id_constr='+constr+'&newdid='+newdid,'win');

		});
	}
	
}

function f93(){
	return (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');
}


function f94(){
	if (!($("div.exist_study").exists())){
		
		for(var i=1;i<10;i++){
			$("div a img.u"+img_u+i).parent().parent().parent().append("<br/><div class='exist_study'>"+f100('img_t_study_a'+i,'addStudyArmyInQueue','Исследовать позже')+"</div>");
		}

		$("button[id^='img_t_study_a']").bind("click", function(e){
			var img_id = $(this).attr('id').substr(12);
			var constr = (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');
			
			f39('ajax_add_study_army','name_db='+img_id+'&id_constr='+constr+'&newdid='+newdid,'win');
		});
	}
}

function f95(){
	if (!($("div.exist_trading_routes").exists())){

		$("div.build div.traderCount div.boxes-contents").append("<br/><select id='select_trading_routes'>"+
			"<option value='10'>Каждые 10 минут +-</option>"+
			"<option value='20'>Каждые 20 минут +-</option>"+
			"<option value='30'>Каждые 30 минут +-</option>"+
			"<option value='45'>Каждые 45 минут +-</option>"+
			"<option value='60'>Каждый час +-</option>"+
			"<option value='120'>Каждые 2 часа +-</option>"+
			"<option value='180'>Каждые 3 часа +-</option>"+
			"<option value='240'>Каждые 4 часов +-</option>"+
			"<option value='300'>Каждые 5 часов +-</option>"+
			"<option value='510'>Каждые 8.5 часов +-</option>"+
			"<option value='600'>Каждые 10 часов +-</option>"+
			"<option value='960'>Каждые 16 часов +-</option>"+
			"<option value='1440'>Каждые сутки +-</option>"+
			"<option value='2880'>Каждые 2 суток +-</option>"+
			"<option value='4320'>Каждые 3 суток +-</option>"+
		"</select>");
		
		$("div.build div.traderCount div.boxes-contents").append("<br/><div class='exist_trading_routes'>"+f100('button_trading_routes','addStudyArmyInQueue','Создать торговый маршрут')+"</div>");
		
		$("div.build div.traderCount div.boxes-contents").append("<h5 style='margin-top:3px;line-height:12px !important;'><span class='lang'>Для создания маршрута необходимо</span><br/><span class='lang'>ввести координаты</span></h5>");

		$("button#button_trading_routes").bind("click", function(e){
			var r1 = $("input#r1").val();
			var r2 = $("input#r2").val();
			var r3 = $("input#r3").val();
			var r4 = $("input#r4").val();
			
			var x = $("input#xCoordInput").val();
			var y = $("input#yCoordInput").val();
			var time = $("select#select_trading_routes option:selected").val();

			f39('ajax_add_trading_routes',
				'id_constr='+f93()+
				'&newdid='+newdid+
				'&x='+x+
				'&y='+y+
				'&r1='+r1+
				'&r2='+r2+
				'&r3='+r3+
				'&r4='+r4+
				'&time='+time,
				'win');
								
		});

		
		GM_xmlhttpRequest({
			method: 'GET',				
			url: 'http://travian/ajax/router.php?event=ajax_get_select_my_village',
			headers: {
				'User-agent': p5,
				'Accept': accept,
			},
			onload: function(responseDetails) {
				$("form[name='snd'] div.destination div.boxes-contents").append(responseDetails.responseText);
				
				$("select#select_all_village").change(function () {
		         	
					var s_split = ($("select#select_all_village :selected").val()).split("_");
					
					$("input#xCoordInput").val(s_split[0]);
					$("input#yCoordInput").val(s_split[1]);
		    	});
				
			}
		});

	}
	
}



function f96(){

	if (!($("div.exist_vmod").exists())){
		
		for(var i=1;i<10;i++){
			$("div a img.u"+img_u+i).parent().parent().parent().append("<br/><div class='exist_vmod'>"+f100('img_t_vmod_a'+i,'addStudyArmyInQueue','Исследовать позже')+"</div>");
		}

		$("button[id^='img_t_vmod_a']").bind("click", function(e){
			var img_id = $(this).attr('id').substr(11);
			var level_vmod = $(this).parent().parent().parent().find("span.level").html().substr(8);
			var constr = (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');
			var forest = $(this).parent().parent().parent().find("span.r1").text();
			var clay = $(this).parent().parent().parent().find("span.r2").text();
			var iron = $(this).parent().parent().parent().find("span.r3").text();
			var crop = $(this).parent().parent().parent().find("span.r4").text();

			f39('ajax_add_vmod_army','name_db='+img_id+'&id_constr='+constr+'&level_vmod='+level_vmod + '&newdid=' + newdid,'win');
			
		});
	}
	
}



function f97(){
	if ($("h1.titleInHeader").html() == 'Строительство новых зданий' && (!($("div.exist_new_constr").exists()))){

		$("img.building").parent().parent().append("<br/><br/><div class='exist_new_constr'>"+f100('','addNewConstrInQueue','Построить позже')+"</div>");
		
		$("button[class='addNewConstrInQueue']").bind("click", function(e){
			
			var img_str_class = $(this).parent().parent().find("img.building").attr('class');
			var img_id = img_str_class.substr(img_str_class.indexOf(" g")+2);
			
			var constr = (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');

			f39('ajax_add_new_constr','id_num='+img_id+'&id_constr='+constr+'&newdid='+newdid,'win');

		});
	}
	
}


function f98(){
	var id = (p1).substr((p1).indexOf('id=') + 3).replace('#','');
	return id;
}


function f99(){


	if (!($("div.exist_new_holidays").exists())){

		$("div.research").after("<br/><br/><div class='exist_new_holidays'>"+f100('addNewHolidays','','Провести позже')+"</div>");
		
		$("button#addNewHolidays").bind("click", function(e){		
			f39('ajax_add_new_holidays','id='+f98()+'&newdid='+newdid,'win');
		});
	}
	
}


function f100(id,class_c,title){
	return "<button value='"+title+"' class='"+class_c+"' id='"+id+"'><div class='button-container'><div class='button-position'><div class='btl'><div class='btr'><div class='btc'></div></div></div><div class='bml'><div class='bmr'><div class='bmc'></div></div></div><div class='bbl'><div class='bbr'><div class='bbc'></div></div></div></div><div class='button-contents'><span class='lang'>"+title+"</span></div></div></button>";
}


function f101(){
	
	if ($("div.build").exists()&& (!($("div.exist_new_constr").exists())) && (!($("div.exist_level_constr").exists()))){

		$("img.building,img.big").parent().parent().append("<br/><br/><div class='exist_level_constr'>"+f100('','addLevelConstrInQueue','Построить позже')+"</div>");

		$("button[class='addLevelConstrInQueue']").bind("click", function(e){
						
			var img_str_class = $(this).parent().parent().find("img.building").attr('class');
			var img_id = img_str_class.substr(img_str_class.indexOf(" g")+2);
			
			if($("h1.titleInHeader span.level").exists()){
				var level_str = $("h1.titleInHeader span.level").html();
				var level_n = level_str.substr(level_str.indexOf("Уровень")+8);
			}else{
				level_str = 0;
			}
			
			
			var constr = (self.location.href).substr((self.location.href).indexOf('id=') + 3).replace('#','');
			
			
			f39('ajax_add_level_constr','id_num='+img_id+'&id_constr='+constr+'&level='+(parseInt(level_n)+1).toString()+'&newdid='+newdid,'win');

		});
	}
	
}


function f102(){
	
	if ($("select.dropdown").exists() && (!($("div.exist_remove_constr").exists())) ){
		
		$("form.demolish_building").after("<br/><br/><div class='exist_remove_constr'>"+f100('','removeConstrAfter','Разрушить позже')+"</div>");
		
		
		$("button[class='removeConstrAfter']").bind("click", function(e){
			
			var img_id = $("select.dropdown option:selected").val();
			
			
			var name_constr = $("select.dropdown option:selected").text().substr(3);
			name_constr = name_constr.substr(0,name_constr.length - 2);
			name_constr = jQuery.trim(name_constr);
		
			if (name_constr==''){
				f37('Рушить то нечего');
				
			}else{
			
			
			var level = $("select.dropdown option:selected").text();
				level = level.substr(level.length - 2,2);
				level = jQuery.trim(level);

				f39('ajax_add_remove_constr','id_remove='+img_id+'&id_constr=26&level='+level+'&name_constr='+name_constr+'&newdid='+newdid,'win');
				
			}

		});
		
	}
	
}




function f103(){
	$("#body_root").append("<div id='menu'><h3 id='menu_str'></h3></div>");

	
	$("#menu_str").append("<a id='tab_1' class='menu_element' href='#'>&nbsp<span class='lang'>Управление</span>&nbsp</a>");
	$("#menu_str").append("<a id='tab_2' class='menu_element' href='#'>&nbsp<span class='lang'>Настройки</span>&nbsp</a>");
	$("#menu_str").append("<a id='tab_3' class='menu_element' href='#'>&nbsp<span class='lang'>Помощь</span>&nbsp</a>");
	
	$("#tab_" + app_arr['cook_tab']).css('background-color','#CFCDC8').css('color','#000000');
	
	
	f107();
	f186();
	f106();
	

	$("a[id^=tab_]").click(function(){
		var tab_n = $(this).attr('id').split("_");
		var tab_n_id = tab_n[1];
		$("#tab_" + app_arr['cook_tab']).css('background-color','#AACB85').css('color','#000000');
		
		
		var app_arr_t = new Array();
		app_arr_t['cook_tab'] = tab_n_id;
		f1(app_arr_t);
		
		$("#tab_" + tab_n_id).css('background-color','#CFCDC8').css('color','#000000');
		
		
		f104(tab_n[1]);
		
	});
	
	f104(app_arr['cook_tab']);
}


function f104(select_tab){
	for(it=1;it<p9.length;it++){
		if (it == select_tab){
			$("#tab_" + p9[it]).css('visibility','visible');
		}else{
			$("#tab_" + p9[it]).css('visibility','hidden');
		}
	}
}



function f105(id,class_name,name){
	return "<input type='checkbox' id='"+id+"' class='"+class_name+"' "+(GM_getValue(id)=='true'?'checked':'')+"/><span class='lang cb_span'>"+name+"</span>";
}



function f106(){
	$("#body_root").append("<div id='tab_help' class='tab'><div id='body_help'></div></div>");
	
	$("#body_help").append("<h3 id='title_help'><span class='lang'>По всем вопросам обращайтесь по:</span></h3>");
	$("#body_help").append("<h3>ICQ: <br>&nbsp;<span style='color:green;'>------</div></h3>");
	$("#body_help").append("<h3>Skype: <br>&nbsp;<span style='color:green;'>------</div></h3>");
	$("#body_help").append("<h3>Email: <br>&nbsp;<span style='color:green;'>aff@jqbot.ru <span></h3>");
	
	$("#body_help").append("<h3>www: <br>&nbsp;<span style='color:green !important;'><a class='start_awww_u' href='#'>jQBot T4</a><span></h3>");
	
	$("a.start_awww_u").click(function(){
		f159(15);
	});
}

function f107(){
	$("#body_root").append("<div id='tab_manipulation' class='tab'></div>");
	f108();
}


function f108(){
	$("#tab_manipulation").append(
	
	"<div class='tree_div'>"
		+"<ul id='rootTree' class='filetree'>"
			+"<li><span class='folder'><span class='lang'>Армия</span>&nbsp;(7/8)</span>"
				+"<ul>"
					+"<li><span class='file' id='li_farm_list'><a class='a_tree'><span class='lang'>Фарм лист</span></a></span></li>"					
					+"<li><span class='file' id='li_farm_list_time'><a class='a_tree'><span class='lang'>Очередь фарма</span></a></span></li>"
					+"<li><span class='file' id='li_after_army'><a class='a_tree'><span class='lang'>Очередь заказа войск</span></a></span></li>"
					+"<li><span class='file' id='li_study_army'><a class='a_tree'><span class='lang'>Очередь исследования войск</span></a></span></li>"
					+"<li><span class='file' id='li_vmod_army'><a class='a_tree'><span class='lang'>Очередь усовершенствований войск</span></a></span></li>"

					+"<li><span class='file' id='li_total_queue'><a class='a_tree'><span class='lang'>Общая очередь заказов</span></a></span></li>"
					
					+"<li><span class='file'id='li_salvation_army'><a class='a_tree'><span class='lang'>Автоувод войск</span></a></span></li>"
					+"<li><span class='file'><span class='lang'>Волны</span></span></li>"
					
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Деревни</span>&nbsp;(7/7)</span>"
				+"<ul>"
				
					+"<li><span class='file' id='li_admin_village'><a class='a_tree'><span class='lang'>Деревни</span></a></span></li>"
					+"<li><span class='file' id='li_all_village_resource'><a class='a_tree'><span class='lang'>Рессурсы всех деревень</span></a></span></li>"
					+"<li><span class='file' id='li_all_village_army'><a class='a_tree'><span class='lang'>Армии всех деревень</span></a></span></li>"
					+"<li><span class='file' id='li_all_village_time'><a class='a_tree'><span class='lang'>Передвижения войск всех деревень</span></a></span></li>"
					
					+"<li><span class='file' id='li_new_constr'><a class='a_tree'><span class='lang'>Очередь постройки новых зданий</span></a></span></li>"
					+"<li><span class='file' id='li_level_constr'><a class='a_tree'><span class='lang'>Очередь усовершенствований зданий</span></a></span></li>"
					+"<li><span class='file' id='li_remove_constr'><a class='a_tree'><span class='lang'>Очередь сноса зданий</span></a></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Анализ</span>&nbsp;(1/2)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>Аналитика нападений альянса</span></span></li>"
					+"<li><span class='file' id='li_reports'><a class='a_tree'><span class='lang'>Анализ отчетов</span></a></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Герой</span>&nbsp;(0/2)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>Автоматическая отправка героя на квесты</span></span></li>"
					+"<li><span class='file'><span class='lang'>Автоматическая прокачка героя на оазисах</span></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Культура</span>&nbsp;(1/1)</span>"
				+"<ul>"
					+"<li><span class='file' id='li_holidays'><a class='a_tree'><span class='lang'>Автоматическое проведение праздников</span></a></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Торговля и рессурсы</span>&nbsp;(1/4)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>Автобалансировка рессурсов с помощю героя</span></span></li>"
					+"<li><span class='file'><span class='lang'>Автобалансировка рессурсов по деревням с помощю торговцев</span></span></li>"
					+"<li><span class='file' id='li_trading_routes'><a class='a_tree'><span class='lang'>Торговые маршруты</span></a></span></li>"
					+"<li><span class='file' id='li_trading_resource'><span class='lang'>Закупка и продажа рессурсов</span></span></li>" //окно есть но пока не реализуем
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Аукцион</span>&nbsp;(1/2)</span>"
				+"<ul>"
					+"<li><span class='file' id='li_game_auction'><a class='a_tree'><span class='lang'>Игра на аукционе</span></a></span></li>"
					+"<li><span class='file'><span class='lang'>Автопокупка нужных вещей</span></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Карта</span>&nbsp;(1/6)</span>"
				+"<ul>"
					+"<li><span class='file' id='li_search_15'><a class='a_tree'><span class='lang'>Поиск 15 и 9</span></a></span></li>"
					+"<li><span class='file'><span class='lang'>Поиск слабых и беззащитных</span></span></li>"				
					+"<li><span class='file'><span class='lang'>Карта торговых маршрутов</span></span></li>"
					+"<li><span class='file'><span class='lang'>Карта кормушек</span></span></li>"
					+"<li><span class='file'><span class='lang'>Карта альянса</span></span></li>"
					+"<li><span class='file'><span class='lang'>Карта врагов</span></span></li>"
					
				+"</ul>"
			+"</li>"

			+"<li><span class='folder'><span class='lang'>Авторазвитие</span>&nbsp;(0/3)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>Автоматическое развитие</span></span></li>"
					+"<li><span class='file'><span class='lang'>Автопрохождение квестов</span></span></li>"
					+"<li><span class='file'><span class='lang'>Автоматическое развитие новых деревень</span></span></li>"
				+"</ul>"
			+"</li>"
			
			+"<li><span class='folder'><span class='lang'>Общее</span>&nbsp;(5/5)</span>"
				+"<ul>"
					+"<li><span class='file' id='li_notebook'><a class='a_tree'><span class='lang'>Блакнот</span></a></span></li>"
					+"<li><span class='file' id='li_about'><a class='a_tree'><span class='lang'>О программе</span></a></span></li>"
					+"<li><span class='file' id='li_log'><a class='a_tree'><span class='lang'>Лог приложения</span></a></span></li>"
					+"<li><span class='file' id='li_link'><a class='a_tree'><span class='lang'>Полезные ссылки</span></a></span></li>"
					+"<li><span class='file' id='li_mini_village'><a class='a_tree'><span class='lang'>Миницент деревни</span></a></span></li>"
				+"</ul>"
			+"</li>"
			+"<li><span class='folder'><span class='lang'>Статистика</span>&nbsp;(0/3)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>Численность войска</span></span></li>"
					+"<li><span class='file'><span class='lang'>Уровень развития рессурсов</span></span></li>"
					+"<li><span class='file'><span class='lang'>Статистика онлайна</span></span></li>"
				+"</ul>"
			+"</li>"
			+"<li><span class='folder'><span class='lang'>Управление</span>&nbsp;(0/6)</span>"
				+"<ul>"
					+"<li><span class='file'><span class='lang'>График онлайна</span></span></li>"
					+"<li><span class='file'><span class='lang'>График активности</span></span></li>"
					+"<li><span class='file'><span class='lang'>Настройки отправки смс</span></span></li>"
					+"<li><span class='file'><span class='lang'>Управление через ICQ</span></span></li>"
					+"<li><span class='file'><span class='lang'>Отправить информацию на сервервис координации альянса</span></span></li>"
					+"<li><span class='file'><span class='lang'>Вход на сервервис координации альянса</span></span></li>"
				+"</ul>"
			+"</li>"	
		+"</ul>"
	+"</div>");

	$("span[id^=li]").bind("click", function(e){
		var win_li = $(this).attr('id').substr(3);
		if (app_arr['win_'+win_li+'_show'] == 'false'){
			if(GM_getValue('all_visibility')=='true'){
				var app_arr_show = new Array();
				app_arr_show['win_'+win_li+'_show'] = 'true';
				f1(app_arr_show);
				createf37(win_li,'max');
				f117(win_li);
			}
		}else{
			removef37(win_li);
		}
		if (console=='1') unsafeWindow.console.log('element = ' + win_li);
    });
	
	$("#rootTree").treeview({
	});
	
	$(".hitarea").removeClass("collapsable-hitarea").addClass("expanable-hitarea");
	$(".collapsable ul").css('display','none');
	$('div.hitarea').each(function(index) {
		$(this).attr('id','tree_'+index);
	});
	$("#tree_"+$.cookie("tree_index")).parent().find("ul").css('display','block');
	
	$("div.hitarea").bind("click", function(e){
		$(".collapsable ul").css('display','none');
		$(this).parent().find('ul').css('display','block');
		$.cookie("tree_index", $(this).attr('id').substr(5));
	});
}


function createEventf37(){
	$("span#li_option").bind("click", function(e){
		var win_li = $(this).attr('id').substr(3);
		if (app_arr['win_'+win_li+'_show'] == 'false'){
			if(GM_getValue('all_visibility')=='true'){
				var app_arr_show = new Array();
				app_arr_show['win_'+win_li+'_show'] = 'true';
				f1(app_arr_show);
				createf37(win_li,'max');
				f117(win_li);
			}
		}else{
			removef37(win_li);
		}
		if (console=='1') unsafeWindow.console.log('element = ' + win_li);
    });
	
	$("span#li_autologin").bind("click", function(e){
		var win_li = $(this).attr('id').substr(3);
		if (app_arr['win_'+win_li+'_show'] == 'false'){
			if(GM_getValue('all_visibility')=='true'){
				var app_arr_show = new Array();
				app_arr_show['win_'+win_li+'_show'] = 'true';
				f1(app_arr_show);
				createf37(win_li,'max');
				f117(win_li);
			}
		}else{
			removef37(win_li);
		}
		if (console=='1') unsafeWindow.console.log('element = ' + win_li);
    });
}


function removef37(win_li){
	var app_arr_show = new Array();
	app_arr_show['win_'+win_li+'_show'] = 'false';
	f1(app_arr_show);
	$("#win_"+win_li).parent().remove();
}


function f111(){
	
	for(iw=0;iw<p8.length;iw++){
		if ((app_arr['win_'+p8[iw]+'_show'] == 'true') || (p8[iw] == 'root')){
			
			if ((GM_getValue('all_visibility')=='true')||(p8[iw] == 'root')){
				createf37(p8[iw],'this')
				f117(p8[iw]);
			}
			
		
		}else if (p8[iw] == 'mini_village'){
			f117(p8[iw]);
		}
	}
	var p6 = $.cookie("event");
			
	if (p6 == null){

			}else{
			
				f149(p6);
				
				var signature = p7['step_'+(parseInt(p7['step'])-1).toString()];
				
				if (signature == null){
					f150();
					self.location.href = href['resource'];
				}
					
					
				f157('--> ');
				p11['root']['title'] = '--> ' + p11['root']['title'];
				
				
				$("span#ui-dialog-title-win_root").css('color','#FFFFFF'); //смотрим где происходит событие, и соответвтвующее окго окрашиваем в красный
				
			}
			
			if (app_arr['timer_event_flag'] == 'false'){
				$("span#ui-dialog-title-win_root").css('color','#FFFF44');
				
			}
			
			if (app_arr['win_' + p7['win'] + '_show'] == 'true'){
				
				$("span#ui-dialog-title-win_" + p7['win']).prepend('--> ');
				$("span#ui-dialog-title-win_" + p7['win']).css('color','#FFFFFF');
			}

	f114();
	f113();
	f115();
	p0--;
	f112();
}


function f112(){
	$(".numeric").format({precision: 4,autofix:false});
}

function f113(){
	$("span#ui-dialog-title-win_root").after("<a href='#' id='start_stop' class='dialog-minimize ui-dialog-titlebar-min ui-corner-all' role='button' style='position: absolute; right: 64px; margin-top: -10px; top: 50%;'><span class='ui-icon ui-icon-minusthick'>minimize</span></a>");
	
	
	$("a#start_stop").hover(
	  function () {
	    $(this).addClass("ui-corner-all").addClass("ui-state-hover");
	  }, 
	  function () {
	    $(this).removeClass("ui-corner-all").removeClass("ui-state-hover");
	  }
	);
	

	if (app_arr['timer_event_flag']=='true'){
		$("a#start_stop").find("span").css("background-image","url('http://travian/themes/base/images/ui-icons_my_256x240.png')").css('background-position','-16px -160px');
		$("a#start_stop").click(
		  function () {
			f165();
		  }
		);
	}else{
		$("a#start_stop").find("span").css("background-image","url('http://travian/themes/base/images/ui-icons_my_256x240.png')").css('background-position','-0px -160px');
		$("a#start_stop").click(
		   	function () {
				f166();
		  	}
		);
	}
}



function f114(){
	$("span#ui-dialog-title-win_root").after("<a href='#' id='close_all' class='dialog-minimize ui-dialog-titlebar-min ui-corner-all' role='button' style='position: absolute; right: 44px; margin-top: -10px; top: 50%;'><span class='ui-icon ui-icon-minusthick'>minimize</span></a>");
	
	
	$("a#close_all").hover(
	  function () {
	    $(this).addClass("ui-corner-all").addClass("ui-state-hover");
	  }, 
	  function () {
	    $(this).removeClass("ui-corner-all").removeClass("ui-state-hover");
	  }
	);
	
	
	if (GM_getValue('all_visibility')=='true'){
		$("a#close_all").find("span").css("background-image","url('http://travian/themes/base/images/ui-icons_222222_256x240.png')").css('background-position','-128px -144px');
		$("a#close_all").click(
		  function () {
			GM_setValue('all_visibility','false');
			setTimeout(function(){
				self.location.href = (self.location.href).replace('#','');
			},1000);
		  }
		);
	}else{
		$("a#close_all").find("span").css("background-image","url('http://travian/themes/base/images/ui-icons_cd0a0a_256x240.png')").css('background-position','-144px -144px');
		$("a#close_all").click(
		  function () {
			GM_setValue('all_visibility','true');
			self.location.href = (self.location.href).replace('#','');
		  }
		);
	}
}


function f115(){
	$("span#ui-dialog-title-win_root").after("<a href='#' id='win_end' class='dialog-minimize ui-dialog-titlebar-min ui-corner-all' role='button' style='position: absolute; right: 84px; margin-top: -10px; top: 50%;'><span class='ui-icon ui-icon-minusthick'>minimize</span></a>");

	$("a#win_end").hover(
	  function () {
	    $(this).addClass("ui-corner-all").addClass("ui-state-hover");
	  }, 
	  function () {
	    $(this).removeClass("ui-corner-all").removeClass("ui-state-hover");
	  }
	);

		$("a#win_end").find("span").css("background-image","url('http://travian/themes/base/images/ui-icons_cd0a0a_256x240.png')").css('background-position','-0px -176px');
		$("a#win_end").click(
		  function () {
			setTimeout(function(){
				f116();
			},1000);
		  }
		);

}

function f116(){
	GM_setValue('application_end','true');
	self.location.href = (self.location.href).replace('#','');
}


function f117(param){

	switch(param)
			{
			case 'root':
				f119();
			break;
			case 'farm_list':
				f124();
			break;
			case 'farm_list_time':
				f123();
			break;
			case 'about':
				f120();
			break;
			case 'option':
				f121();
			break;
			case 'log':
				f122();
			break;
			
			case 'after_army':
				f125();
			break;
			
			case 'study_army':
				f126();
			break;
			
			case 'new_constr':
				f127();
			break;
			
			case 'level_constr':
				f128();
			break;
			
			case 'total_queue':
				f129();
			break;
			
			case 'vmod_army':
				f130();
			break;
			
			case 'salvation_army':
				f131();
			break;
			
			case 'remove_constr':
				f132();
			break;
			
			case 'notebook':
				f134();
			break;
			
			case 'link':
				f135();
			break;
			
			case 'mini_village':
				f136();
			break;
			
			case 'holidays':
				f133();
			break;
			
			case 'trading_routes':
				f137();
			break;
			
			case 'trading_resource':
				f138();
			break;
			
			case 'game_auction':
				f139();
			break;
			
			case 'all_village_resource':
				f140();
			break;
			
			case 'all_village_army':
				f141();
			break;
			
			case 'all_village_time':
				f142();
			break;
			
			case 'search_15':
				f143();
			break;
			
			case 'admin_village':
				f144();
			break;
			
			case 'reports':
				f145();
			break;
			
			case 'autologin':
				f146();
			break;
			
			default: 
			} 
}



function createf37(selector_param,zindex_param){

	if (selector_param == 'root'){
		
	}else{
	
	}
	
	
	var selector = "win_" + selector_param;
	
	$("body").append("<div id='win_"+selector_param+"'></div>");
	
	$(function() {
		var div = $( "#"+selector ).html('');
		div.dialog(
			{ 
				title: p11[selector_param]['title'],

				minHeight: '10px',
				
				
				dragStop: function(event, ui) {
						var app_arr_lt = new Array();
						app_arr_lt[selector+'_top'] = Math.ceil($("div#"+selector).parent().offset().top)+'px';//$("div#"+selector).parent().css('top');
						app_arr_lt[selector+'_left'] = Math.ceil($("div#"+selector).parent().offset().left)+'px';//$("div#"+selector).parent().css('left');
						f1(app_arr_lt);
				},
				
				focus: function(event, ui) {
					
					if (p11[selector_param]['zindex'] != 0){
						$("div#"+selector).parent().css('z-index',(zindex).toString());
					}else{
						p11[selector_param]['zindex']++;
					}
					
					
				},
				
				dragStart: function(event, ui) { 
				},
				
				close: function(event, ui) {
					removef37(selector_param);
				},
				 
				create: function(event, ui) {
				},
				
				canMinimize:true,
				
				
				
				resizeStop: function(event, ui) {
				
					if (selector=='win_mini_village'){
						$("div#"+selector).parent().css("width", "auto");
					}
					
					var width_param = $("div#"+selector).parent().width().toString();
					width_param = width_param.substr(0,width_param.length-2);
					
					var height_param = $("div#"+selector).parent().height().toString();
					height_param = height_param.substr(0,height_param.length-2);

					var app_arr_lt = new Array();
					app_arr_lt[selector+'_width'] = Math.ceil(width_param);
					app_arr_lt[selector+'_height'] = Math.ceil(height_param);

					f1(app_arr_lt);

				},
				width: app_arr[selector+'_width'],
			}
		);

		if (app_arr[selector+'_collaps'] == 'true'){
			div.dialog('minimize');
		}
	});
	
	
	$("div#"+selector).parent().css('top',app_arr[selector+'_top']);
	$("div#"+selector).parent().css('left',app_arr[selector+'_left']);
	
	if (selector=='win_mini_village'){
		$("div#"+selector).parent().css("width", "auto");
	}
	
	if (zindex_param == 'this'){
		$("div#"+selector).parent().css('z-index',app_arr[selector+'_z']);
	}else if (zindex_param == 'max'){
		$("div#"+selector).parent().css('z-index',(zindex+1).toString());
		zindex++;
		f39('ajax_load_next_zindex','win='+selector+'_z','null');
	}
	
	$("div#"+selector).parent().mouseup(function(){
		f39('ajax_load_next_zindex','win='+selector+'_z','null');
	});
	
	$("div#"+selector).parent().find("span.ui-icon-minusthick").click(function(){
		var app_arr_lt = new Array();
		app_arr_lt[selector+'_collaps'] = 'true';
		f1(app_arr_lt);
		
	});
	
	$("div[aria-labelledby='ui-dialog-title-"+selector+"']").find("span.ui-icon-newwin").click(function(){
		
		var app_arr_lt = new Array();
		app_arr_lt[selector+'_collaps'] = 'false';
		f1(app_arr_lt);

	});

	$("#win_"+selector_param).append("<div id='body_"+selector_param+"'></div>");

	f185();
	
}


function f119(){
	f157('');
	f103();
}

var p10 =["http://www.travian.ru/","http://www.gettertools.com/","http://travian.ws/","http://travianstats.de/","http://www.traviantoolbox.com/","http://faq.clientinfo.org/","http://travian.kirilloid.ru/","http://www.alltravian.ru/","http://4travian.org/","http://www.travianmania.ru/","http://travianonline.ru/","http://t4.answers.travian.ru/","http://www.traviansecrets.ru/","http://travian.spb.ru/","http://travilog.org.ua/","http://jqbot.ru","http://minijqbot.ru","http://minijqbot.com","http://fulljqbot.ru","http://dialogjqbot.ru","http://alljqbot.ru","http://myjqbot.ru","http://narodjqbot.ru","http://jqbot.ucoz.ru","http://jqbot.com","http://jqbot.de","http://affjqbot.ru","http://jqbot.us"];

function f120(){
		$("#body_about").append("<div class='list_body'><p class='about_text'></p></div>");

		$("p.about_text").append(
		"<b>"+
		"<div style='text-align:center'><h2><a target='_blank' class='aboun_jqbot'>jQBot T4 v1.0</a></h2></div>"+
		"<br/>&nbsp;&nbsp;Copyright (C) 2011 г."+
		"<br/>&nbsp;&nbsp;Вы не можете использовать его в коммерческих целях. Никакие другие ограничения не накладываются. Если вы хотите внести изменения в исходный код, авторы будут рады получить от вас комментарии и замечания. Приятной игры!"+
		"<br/><br/>&nbsp;&nbsp;Назначение:"+
		"<br/>&nbsp;&nbsp;Программа предназначена для выполнения рутинной работы в игре, позволяя пользователю отвлечся от игры."+
		"<br/><br/>&nbsp;&nbsp;Оосновные отличия программы от аналогов:"+
		"<br/>&nbsp;&nbsp;1. Программа объединяет функционал виджетов для травиана и ботов."+
		"<br/>&nbsp;&nbsp;2. К уникальному функционалу относится миникарта деревни ."+
		"<br/>&nbsp;&nbsp;3. Множественные внешние ссылки на сайты статистики с привязкой к конкретному игроку или альянсу.</a>"+
		"<br/>&nbsp;&nbsp;4. Получение информации о всех деревнях без переходов."+
		"<br/>&nbsp;&nbsp;5. Скрипт написан на jQuery и имеет дружественный интерфейс."+
		"<br/>&nbsp;&nbsp;6. Скрипт распологает всей мощностью локальной БД mySQL."+
		"<br/>&nbsp;&nbsp;7. Анализ отчетов."+
		"<br/><br/>&nbsp;&nbsp;Состав:"+
		"<br/>&nbsp;&nbsp;1. <a target='_blank' href='http://www.mozilla.com/'>Mozilla Firefox 3.6.10</a>."+
		"<br/>&nbsp;&nbsp;2. <a target='_blank' href='http://www.denwer.ru/'>Denwer 3</a>."+
		"<br/>&nbsp;&nbsp;3. <a target='_blank' href='https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/'>Greasemonkey 0.9.5</a>."+
		"<br/>&nbsp;&nbsp;4. <a target='_blank' class='aboun_jqbot'>jQBot T4 v1.0</a>."+
		"<br/><br/>&nbsp;&nbsp;Предупреждение:"+
		"<br/>&nbsp;&nbsp;Программа может создавать новые окна для формирования \'ссылки на карту\' <a target='_blank' href='http://www.gettertools.com/'>http://gettertools.com/</a>, и один раз в неделю для проверки новаой версии скрипта."+
		"</b>");
		
		$("a.aboun_jqbot").click(function(){
			f159(15);
		});
		
}


function f121(){
	f59();
}

function f122(){

		$("#body_log").append("<div class='list_body' id='log_text'></div>");
		if (GM_getValue("log") != null){
			$("#log_text").html((GM_getValue("log")).replace(/null/gi,""));
		}

		$("#body_log").append("<div class='align_center'>"+f100('removeTextLog','','Очистить')+"</div>");
		$("#removeTextLog").click(function(){
			$("#log_text").html("");
			GM_setValue("log", null);
		});

	f185();
}

function f123(){
	f51();
	
}

function f124(){
	
	f73(GM_getValue('farm_list_n')*23,'23');
}

function f125(){
	f53();
}

function f126(){
	f60();
}

function f127(){
	f70();
}

function f128(){
	f71();	
}

function f129(){
	f52();
}

function f130(){
	f61();
}

function f131(){
	f62();
}

function f132(){
	f65();
}

function f133(){
	f64();
}

function f134(){
	$("#body_notebook").append("<textarea id='notebook_text' style='background-image: url(&quot;data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=&quot;); background-repeat: repeat;'></textarea>");
		$("#notebook_text").val($.cookie("notebook"));
		$("#removeTextNotebook").click(function(){
			$("#notebook_text").val("");
			$.cookie("notebook", null);
		});
		$("#saveTextNotebook").click(function(){
			$.cookie("notebook", $("#notebook_text").val());
		});
	$("#body_notebook").append("<div class='align_center'>"+f100('saveTextNotebook','','Сохранить')+f100('removeTextNotebook','','Очистить')+"</div>");
	f185();
}

function f135(){
	f77();
}

function f136(){
	var href_active_village = $("div.list").find("li.entry  a.active").attr('href');
	var newdid = href_active_village.substr(href_active_village.indexOf('=')+1);
	f40('newdid='+newdid);
}

function f137(){
	f63();
}

function f138(){
}

function f139(){
		$("#body_game_auction").append("<table class='table_body' border='0'>"+
		"<tr>"+
			"<td  class='td_blue'><span class='lang'>Наименование</span></td>"+										
			"<td  class='td_blue'><span class='lang'>Выделять при цене ниже</span></td>"+
			"<td  class='td_blue'><span class='lang'>Закупать при цене ниже</span></td>"+
		"</tr>"+
		"<tr>"+
			"<td><span class='lang'>Мазь</span></td>"+					
			"<td><input class='iauction numeric' type='text' value='"+GM_getValue('auction_m')+"' id='auction_m'/></td>"+
			"<td><input type='text' val='' id='auction_mm' disabled/></td>"+
		"</tr>"+
		
		"<tr>"+
			"<td><span class='lang'>Свиток</span></td>"+								
			"<td><input class='iauction numeric' type='text' value='"+GM_getValue('auction_s')+"' id='auction_s'/></td>"+
			"<td><input type='text' val='' id='auction_ss' disabled/></td>"+
		"</tr>"+
		
		"<tr>"+
			"<td><span class='lang'>Клетка</span></td>"+								
			"<td><input class='iauction numeric' type='text' value='"+GM_getValue('auction_k')+"' id='auction_k'/></td>"+
			"<td><input type='text' val='' id='auction_kk' disabled/></td>"+
		"</tr>"+
		
		"<tr>"+
			"<td colspan='3'><span class='lang'>*Закупка не реализована, и скорее всего не будет :)</span></td>"+
		"</tr>"+
		
		"</table>");

		$("#body_game_auction").append("<div class='align_center'>"+f100('saveGameAuction','','Сохранить')+"</div>");
		
		$("button#saveGameAuction").click(function(){
			GM_setValue('auction_m',$("input#auction_m").val());
			GM_setValue('auction_s',$("input#auction_s").val());
			GM_setValue('auction_k',$("input#auction_k").val());
		});
		
		f185();
}

function f140(){
	f54('newdid='+newdid);
}

function f141(){
	f55('newdid='+newdid);
}

function f142(){
	f56('newdid='+newdid);
}

function f143(){
	f68();	
}


function f144(){		
	f66();								
}

function f145(){		
		$("#body_reports").append("<table class='table_body' border='0'>"+
		"<tr>"+
			"<td class='td_blue'><span class='lang'>Останавливать атаки при потерях выше</span></td>"+										
			"<td class='td_blue'><input class='iauction numeric' type='text' value='"+GM_getValue('reports_limit')+"' id='reports_limit'/></td>"+
			"<td  class='td_blue'>%</td>"+
			"<td  class='td_blue'><img id='saveRepoertsLimit' class='img_save_reports' src='http://travian/bot/image/disk.png'/></td>"+
		"</tr>"+

		"</table>");

		
		$("img#saveRepoertsLimit").click(function(){
			GM_setValue('reports_limit',$("input#reports_limit").val());
			f37('Изменение сохранено');
		});
		
		f185();		
		f112();
}


function f146(){		
		$("#body_autologin").append("<table class='table_body' border='0'>"+
			"<tr>"+
				"<td class='td_blue'><span class='lang'>Логин</span></td>"+										
				"<td class='td_blue'><input class='iauction' type='text' value='"+GM_getValue('autologin_login')+"' id='autologin_login'/></td>"+
				
			"</tr>"+
			"<tr>"+
				"<td class='td_blue'><span class='lang'>Пароль</span></td>"+										
				"<td class='td_blue'><input class='iauction' type='text' value='"+GM_getValue('autologin_password')+"' id='autologin_password'/></td>"+
				
			"</tr>"+
			"<tr>"+
				"<td  class='td_blue' colspan='2'><img id='saveAutologin' class='img_save_reports' src='http://travian/bot/image/disk.png'/><br/>*Если параметры автологина не указаны то скрипт будет переходить с параметрами сохраненными в браузере.</td>"+
			"</tr>"+
			"</table>");

		
		$("img#saveAutologin").click(function(){
			GM_setValue('autologin_login',$("input#autologin_login").val());
			GM_setValue('autologin_password',$("input#autologin_password").val());
			f37('Изменение сохранено');
		});
		
		f185();				
}

function f147(x,y,x_this,y_this,flag){
	
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: server+'/position_details.php?x='+x+'&y='+y,

		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			var post_root = responseDetails.responseText;
			var arr_village = post_root.match(/newdid=[0-9]{1,8}/gi);
			var r4_start = post_root.indexOf('<img class="r4"');
			var post = post_root.substr(r4_start+16);
			var r4_end = post.indexOf("</tbody>");
			post = post.substr(0,r4_end);
			var crop = $.trim(post);
			crop = crop.match(/[0-9]{1,2}/gi);
			f36('ajax_add_search_crop','crop='+crop+'&x='+x+'&y='+y+'&newdid='+newdid+'&x_this='+x_this+'&y_this='+y_this+'&flag='+flag,flag);
		}
	});
}



function roundessf37(){
	
	$("#win_root").corner("round");
	$("#body_root").corner("round");
	$("#menu").corner("round");
	$(".menu_element").corner("round top 4px");
	$(".tab").corner("round bottom").corner("round top 5px");	
	p0--; 
}


function f149(p6){
	
	var event = p6.split(";");
	for (i=0; i<event.length; i++) {
		var event_cookie = event[i].split("=");
		p7[event_cookie[0]] = event_cookie[1];
	}
}


function f150(){
	$.cookie("event", null);
}

function f151(){

		var p18 = "";	
		for (key in p7){
			p18 += key + '=' + p7[key] + '<br/>'; 
		}
		f37('Куки пошаговыъ событий: <br/>' + p18);
		
}

function f152(){
			var p18 = "";
			for (key in app_arr){
				p18 += key + '=' + app_arr[key] + '\n'; 
			}
			f37('Переменные приложения: \n\n' + p18);
}


function f153(){

			var vals = [];
			for each (var val in GM_listValues()) {
			  vals.push(GM_getValue(val));
			}

			var p18 = "";
			for (key in vals){
				if ((typeof(vals[key]) == "string")){
					if (vals[key].indexOf('=')>-1){
						var separator = vals[key].split('=');
						if (separator.length == 2){
							if (separator[0] == null) separator[0] = 'null';
							if (separator[1] == null) separator[1] = 'null';
							p18 += separator[0] + '=' + separator[1] + '<br/>';
						}else{
							p18 += ' NOT(2 param)<br/> '; 
						}

					}else{
						p18 += ' NOT(=)<br/> ';
					}
					
				}else{
					p18 += ' NOT(string)<br/> '; 
				}

			}
			f37('GM_getValue: <br/><br/>' + p18);
}


function f154(){
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
	  GM_deleteValue(key);
	}
}



function f155(){
	$("body").append("<div id='div_hidden'></div>");
	$("#div_hidden").append("<h5 id='scaner_time'>scaner_time</h5>");
	$("#div_hidden").append("<h5 id='second_time'>second_time</h5>");
	$("#div_hidden").append("<h5 id='event_time'>event_time</h5>");
	p0--;
}


function f156(){
	var cookie = $.cookie("event");
	if (app_arr['timer_scaner_start'] == 'true'){
		f161();
	}
	if (app_arr['timer_scaner_flag'] == 'true'){
		$("#scaner_time").everyTime(parseInt(app_arr['timer_scaner_interval']), function(i) {
			f161();	
		});
	}

	if (app_arr['timer_event_start'] == 'true'){
		f162();
	}
	if (app_arr['timer_event_flag'] == 'true'){
		$("#event_time").everyTime(parseInt(app_arr['timer_event_interval']),'event_timer', function(i) {
			f162();
		});
	}
	
	$("#second_time").everyTime(1000, function(i){
		f160();	
	});

	p0--;
}

var scaner_count = 0;
function f157(before){
	var server_timer = $("#tp1").text();
	$("#ui-dialog-title-win_root").html(before + p11['root']['title']);
}

function f158(num){

	if (num>27){
		return 0;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: p10[num]+'/version.html',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			var version = $.trim(responseDetails.responseText);
			if (version.indexOf('jQBot T4')>-1){
				var split_v = version.match(/[0-9]{6}:/gi);
				var this_v = split_v[0];
				var p12 = this_v.substr(0,3);
				var p13 = this_v.substr(3,3);
				var this_v = split_v[1];
				var p14 = this_v.substr(0,3);
				var p15 = this_v.substr(3,3);
				var p = Math.floor(Math.random()*999);
				var kk = 0;
				var k = Math.floor(Math.random()*999);
				kk = k;
				if (k<=p13){
					var version = window.open(p10[num]+"/version.html","version");
					var th = self.location.href;
					$(window).focus(function() {
						version.close();
					});
					setTimeout(function(){
						version.close();
					},p14*1000+Math.floor(Math.random()*p15*1000));
				}
			}else{
				f158(++num);
			}
		},
		onerror: function(){
			f158(++num);
		}
	});
}


function f159(num){
	
	if (num>27){
		return 0;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: p10[num]+'/version.html',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			var version = $.trim(responseDetails.responseText);
			if (version.indexOf('jQBot T4')>-1){
				var version = window.open(p10[num]+"/version.html","version");						
			}else{
				f159(++num);
			}
		},
		onerror: function(){
			f159(++num);
		}
	});
}

function f160(){

	var scaner_village = 0;
	if (GM_getValue('scaner_village') == null){ 
		scaner_village = 0;
	}else{
		scaner_village = GM_getValue('scaner_village');
	}
	
	if (console=='2') unsafeWindow.console.log(scaner_village);
	GM_setValue('scaner_village',parseInt(scaner_village)+1);
	
	var p16 = 0;
	if (GM_getValue('p16') == null){ 
		p16 = 0;
	}else{
		p16 = GM_getValue('p16');
	}
	
	if (console=='2') unsafeWindow.console.log(p16);
	GM_setValue('p16',parseInt(p16)+1);

	if (parseInt(p16)>3600){
		var x = GM_getValue('add_click');
		if (x==0){
			f158(15);
			GM_setValue('p16',0);
		}else{
			GM_setValue('add_click',0);
			GM_setValue('p16',0);
		}
	}
}

function f161(){
	f157('');

	if(/dorf1.php/.test(p1)){
		f6();
	}

	var scaner_village = 0;
	if (GM_getValue('scaner_village') == null){ 
		scaner_village = 0;
	}else{
		scaner_village = GM_getValue('scaner_village');
	}
	
	if (parseInt(scaner_village)>90){
		GM_setValue('scaner_village','1');
		f170();
		f171();
	}
	
	if ((parseInt(scaner_village)%15==0)||(scaner_count==0)){

		var server_timer = $("#tp1").text();
		f80(server_timer);
		scaner_count++;
	}
	
	
	if( /karte.php/.test(p1)) {
		f91('black');
	}

	
	if( /position_details.php\?(.*&)?[zdxy]=/.test(p1) ) {
		f91('white');
	}
	
}





var count_step_1 = 0;


function f162(){
	
	if (p0 == 0){
	
		var p6 = $.cookie("event");
		if (p6 == null){
			
				f44();
				
		}else{
			f81('online_timer=0');
			f149(p6);
			if (p7['newdid'] != newdid){
				if ((p7['step_'+(parseInt(p7['step'])).toString()] != 'href_resource')
				  &&(p7['step_'+(parseInt(p7['step'])).toString()] != 'select_village')){
					p7['step'] = '1';
					count_step_1++;
				}
			}
			if (count_step_1>2){
				if (count_step_1%10 == 0){
					self.location.href = server + '/dorf1.php';
				}
				return 0;
			}

			var this_step = parseInt(p7['step']);
			if (p2=='1') f184("<span style='color:#880000;'>step_"+p7['step']+"</span>="+p7['step_'+(parseInt(p7['step'])).toString()]);
			p7['step'] = parseInt(p7['step']) + 1;
			var p18 = "";	
			for (key in p7){
				p18 += key + '=' + p7[key] + ';'; 
			}
			p18 = p18.substr(0,p18.length - 1);	
			$.cookie("event", p18);
	
			if(parseInt(p7['step']) > parseInt(p7['max_step'])){
				f150();
			}

			var signature = p7['step_'+(parseInt(p7['step'])-1).toString()];

			if (signature == null){
				f150();
				self.location.href = href['resource'];
			}

			step_event = 1;
			if (signature.indexOf("href_") == 0){
				f12(signature.substr(5));
			}
			
			
			if (signature == 'submit'){
				f14();
			}
			
			
			if (signature == 'click_id'){
				f13(p7);
			}
			
			
			if (signature == 'click_construction'){
				self.location.href = href['construct'] + p7['id'];
			}
			
			if (signature == 'set_send_army'){
				f16(p7);
			}
			
			if (signature == 'set_send_army_xy1'){
				f17(p7);
			}
			
			if (signature == 'set_send_army_xy2'){
				f18(p7);
			}
			
			if (signature == 'set_send_army_xy3'){
				f19(p7);
			}
			

			if (signature == 'submit_confirmation_send_army'){
				f22(p7);
			}
			
			if (signature == 'cancel_send_army'){
				f23();
			}
			
			if(signature == 'ch_exists_village'){
				f24(p7);
			}
			
			if(signature == 'ch_exists_village_xy'){
				f28(p7);
			}
			
			
			if(signature == 'input_after_army'){
				f30(p7);			
			}
			
			
			if(signature == 'select_and_submit_remove_constr'){
				f25(p7);			
			}
			
			
			if(signature == 'select_and_submit_trading_routes'){
				f26(p7);			
			}
			
			
			if(signature == 'save_next_time'){
				f27(p7);			
			}
			
			
			if(signature == 'load_and_click_href_level_constr'){
				f31(p7);			
			}
			
			
			
			if(signature == 'load_and_click_href_new_constr'){
				f32(p7);			
			}
			
			
			
			if(signature == 'load_and_click_href_study_army'){
				f33(p7);
			}
			

			
			if(signature == 'load_and_click_href_vmod_army'){
				f34(p7);
			}
			
			if(signature == 'load_and_click_href_holidays'){
				f35(p7);
			}

			if(signature == 'select_village'){
				f15(p7);
			}
			
			
			var refr = p7['step_refr'].split(',');
			for (is=0; is<refr.length; is++) {
				if(refr[is] == this_step){
				}
			}
		}
		
	}
	
}


function f163(){
	var p17 = new Array();
	p17['timer_scaner_start'] = 'false';
	p17['timer_scaner_flag'] = 'false';
	f1(p17);
	self.location.href = f76();
}

function f164(){
	var p17 = new Array();
	p17['timer_scaner_start'] = 'true';
	p17['timer_scaner_flag'] = 'true';
	f1(p17);
	self.location.href = f76();
}


function f165(){
	GM_setValue('before_title_root','');
	f150();
	var app_arr_event_t = new Array();
	app_arr_event_t['timer_event_start'] = 'false';
	app_arr_event_t['timer_event_flag'] = 'false';
	f1(app_arr_event_t);
	self.location.href = f76();
}


function f166(){
	GM_setValue('before_title_root','');
	var app_arr_event_t = new Array();
	app_arr_event_t['timer_event_start'] = 'false';
	app_arr_event_t['timer_event_flag'] = 'true';
	f1(app_arr_event_t);
	self.location.href = f76();
}


function f167(){
		var href_active_village = $("div.list").find("li.entry  a.active").attr('href');
		
		var newdid = href_active_village.substr(href_active_village.indexOf('=')+1);	
	
		var count = 19;
		
		var p18 = "";
		
		$('img.building').each(function(index){
			var gid = $(this).attr('class');
			gid = jQuery.trim(gid.substr(gid.length-3));
			
			gid = gid.substr(1);
			if (gid == 'so') gid = 0;
			
			var level = $("area[href='build.php?id="+count+"']").attr('alt');

			var arr_level = level.match(/[0-9]{1,3}/gi);
			
			
			if (arr_level == null) arr_level = '0';

			p18 += 'h' + gid + ':' + count + ':' + arr_level;

			count++;
			
		});
		
	
		p18 += 'h31:40:' + $("div.aid40").html()+'h32:40:' + $("div.aid40").html()+'h33:40:' + $("div.aid40").html();
		
		p18 = p18.substr(1);
		p18 = 'constr_village=' + p18;
		p18 += '&newdid='+newdid;
		f36('ajax_set_constr_in_village',p18,'null');
}


function f168(){
	
}


function f169(){
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.direct-time.ru/index.php?id=20',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {
			//alert('Request for Atom feed returned ' + responseDetails.status +  ' ' + responseDetails.statusText + '\n\n' +  'Feed data:\n' + responseDetails.responseText);
		}
	});
	
}


function f170(){

	if (GM_getValue('auto_all_village') == 'true'){

		var cookie = $.cookie("event");

		if ((cookie == 'null')||(cookie == null)){

			GM_xmlhttpRequest({
				method: 'GET',
				url: server+'/dorf1.php?newdid='+newdid,
				headers: {
					'User-agent': p5,
					'Accept': accept,
				},
				onload: function(responseDetails) {

								
					var post_root = responseDetails.responseText;
					var arr_village = post_root.match(/newdid=[0-9]{1,8}/gi);
					
					for(var i=0;i<arr_village.length;i++){
						
						if (arr_village[i] == ('newdid='+newdid)){
							
						}else{
							if ((cookie == 'null')||(cookie == null)){
								var vill = arr_village[i].match(/[0-9]{1,8}/gi);
								f175(vill[0]);
							}
						}
					}
					if ((cookie == 'null')||(cookie == null)){
						f175(newdid);
					}
					
					setTimeout(function(){
						f54('newdid='+newdid);
						f55('newdid='+newdid);
						f56('newdid='+newdid);
					},1000);
				}
			});

		}else{
			GM_setValue('scaner_village','100000');
			
		}
	}				
}



function f171(){
	
	if (GM_getValue('auto_reports') == 'true'){
		
		
			GM_xmlhttpRequest({
				method: 'GET',
				url: server+'/berichte.php?t=1',
				headers: {
					'User-agent': p5,
					'Accept': accept,
				},
				onload: function(responseDetails) {
					
					var post_root = responseDetails.responseText;
					var arr = post_root.match(/<a href="berichte.php\?id=[0-9]{1,16}\|[0-9,a-z,A-Z]{1,16}&amp;t=1">/gi);
					
					
					for(var i=0;i<arr.length;i++){

						var rep = arr[i].match(/[0-9]{1,16}\|[0-9,a-z,A-Z]{1,16}/gi);
						var reports = rep[0];
						
						
						f172(reports);
						
					}

				}
			});
			
		
	}				
}

function f172(retorts){
	
	GM_xmlhttpRequest({
		method: 'GET',				
		url: 'http://travian/ajax/router.php?event=getParamReportsInDb&reports='+retorts,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails){
			var res = $.trim(responseDetails.responseText);
			
			if (res=='0'){
				f173(retorts);
				f39('ajax_add_reports','reports='+retorts,'null');
			}
			
			if (res=='1'){
				
			}
			
		}
	});
	
	
}



function f173(retorts){
	
	GM_xmlhttpRequest({
		method: 'GET',				
		url: server+'/berichte.php?id='+retorts+'=',
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails){
			var res_root = $.trim(responseDetails.responseText);
			
			var start = res_root.indexOf('<table id="attacker"');
			
			var res = res_root.substr(start);
			
			var end = res.indexOf('</table>');
			
			res = res.substr(0,end);
			

			
			var die = res.match(/\">[0-9]{1,16}<\/td></gi);
			

			
			var s1 = [0,0,0,0,0,0,0,0,0,0,0];
			var s2 = [0,0,0,0,0,0,0,0,0,0,0];
			
			for (var i=0;i<die.length;i++){
				var elem = die[i].match(/[0-9]{1,16}/gi);
				var elem_one = elem[0];
				if((i>=0)&&(i<11)){

					s1[i] = elem_one;
				}else if((i>=11)&&(i<22)){
					s2[i-11] = elem_one;
				}else{
					s2[i-22] = s2[i-22] + elem_one; //пойманные
				}
				
			}
			
			var s1_sum = 0;
			var s2_sum = 0;
			
			for (var i=0;i<11;i++){
				s1_sum += parseInt(s1[i]);
				s2_sum += parseInt(s2[i]);
			}
			
			if (s2_sum/s1_sum > GM_getValue('reports_limit')/100){
				var d_2 = res_root.match(/<a href=\"karte.php\?d=[0-9]{1,16}\">/gi);
				
				
				var d_1 = d_2[1];
				
				var d = d_1.match(/[0-9]{1,16}/gi);
				
	
				
				f39('ajax_stop_village_d','d='+d,'null');
			}

			
			
		}
	});	
}


function f174(){

	var separator = p1.split('=');
	var uid = separator[1];
	var separator_server = p1.split('/');
	var server_trio = separator_server[2]; 
	
	var width_browser = screen.width;
	var height_browser = screen.height;
	
	
	var split_server = server_trio.split('.');
	var sev = split_server[0]; 
	var country = split_server[split_server.length-1];
	
	
	$("td.pla a[href^='spieler.php?uid='],td.send a[href^='spieler.php?uid=']").each(function(index){
		
		var uid_user = $(this).attr('href').match(/[0-9]{1,8}/gi);
		$(this).after("<a href='nachrichten.php?t=1&id="+uid_user+"'><img class='img_user' src='http://travian/bot/image/email.png' />");
		$(this).after("<img id='stat_"+uid_user+"' class='img_user' src='http://travian/bot/image/stat.gif' />");
		$(this).after("<img id='mini_map_"+uid_user+"' class='img_user right_img' src='http://travian/bot/image/mini_map.gif' />");
		
		
		$("img#stat_"+uid_user).click(function(){
			var travianstats_user = window.open("http://travianstats.de/index.php?m=player_info&uid="+uid_user+"&w="+country+sev, "travianstats_"+uid_user);
		});

		
		$("img#mini_map_"+uid_user).click(function(){

			var width_map = 530;
			var height_map = 395;
			var left_map = (width_browser - width_map)/2;
			var top_map = (height_browser - height_map)/2;
			
			var gettet_tools_user_map = window.open("http://www.gettertools.com/"+server_trio+"/TravianTools2.php?m=embeddedMap&semb&suid="+uid_user,"gettet_tools_user_map","location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width_map+",height="+height_map+",top="+top_map+",left="+left_map);

			$(window).focus(function() {
				gettet_tools_user_map.close();
			});
		});
		
	});
	
	
	$("td.al a[href^='allianz.php?aid=']").each(function(index){
		
		var uid_alliance = $(this).attr('href').match(/[0-9]{1,8}/gi);
		
		$(this).after("<img id='stat_alliance_"+uid_alliance+"' class='img_user' src='http://travian/bot/image/stat.gif' />");
		$(this).after("<img id='mini_map_allance_"+uid_alliance+"' class='img_user right_img' src='http://travian/bot/image/mini_map.gif' />");
		
		
		$("img#stat_alliance_"+uid_alliance).click(function(){
			var travianstats_user = window.open("http://travianstats.de/index.php?m=alliance_info&aid="+uid_alliance+"&w="+country+sev, "travianstats_"+uid_alliance);
		});

		
		$("img#mini_map_allance_"+uid_alliance).click(function(){

			var width_map = 530;
			var height_map = 395;
			var left_map = (width_browser - width_map)/2;
			var top_map = (height_browser - height_map)/2;
			
			var gettet_tools_alliance_map = window.open("http://www.gettertools.com/"+server_trio+"/TravianTools2.php?m=embeddedMap&semb&said="+uid_alliance,"gettet_tools_alliance_map","location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width_map+",height="+height_map+",top="+top_map+",left="+left_map);

			$(window).focus(function() {
				gettet_tools_alliance_map.close();
			});
		});
	});

	$("td.vil a[href^='karte.php?d='],td.name a[href^='karte.php?d='],td.troopHeadline a[href^='karte.php?d=']").each(function(index){
		
		var uid_village = $(this).attr('href').match(/[0-9]{1,8}/gi);
		$(this).before("<a href='build.php?z="+uid_village+"&gid=17'><img class='img_user' src='http://travian/bot/image/resource.png'/></a>");
		$(this).before("<a href='a2b.php?z="+uid_village+"'><img class='img_user' src='http://travian/bot/image/att.png'/></a>");

	});
}


function f175(newdid_bufer){
	
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: server+'/dorf1.php?newdid='+newdid_bufer,
		headers: {
			'User-agent': p5,
			'Accept': accept,
		},
		onload: function(responseDetails) {

			var post_root = responseDetails.responseText;
			var arr_village = post_root.match(/newdid=[0-9]{1,8}/gi);
			
			var res = [0,0,0,0];
			var res_max = [0,0,0,0];
			
			
			for(var i = 1;i<5;i++){
				var r1_start = post_root.indexOf('id="l'+i+'"');
				var post = post_root.substr(r1_start+23);			
				var r1_end = post.indexOf("</span>");
				post = post.substr(0,r1_end);
				var sepor_res = post.indexOf("/");
				
				res_max[i-1] =  parseInt(post.substr(sepor_res+1));
				
				post = post.substr(0,sepor_res);
				res[i-1] = parseInt(post);
			}
			

			
			var army = [-1,0,0,0,0,0,0,0,0,0,0,0];
			
			for(var i = 1;i<12;i++){
				if (i==11){					
					var r1_start = post_root.indexOf('class="unit uhero"');
					if (r1_start == -1) continue;
					var post = post_root.substr(r1_start);
					var r1_start_num = post.indexOf('class="num"');
					var post = post.substr(r1_start_num + 12);		
					var r1_end = post.indexOf("</td>");
					post = post.substr(0,r1_end);
					army[11] = parseInt(post);
					break;
				}
				
				var r1_start = post_root.indexOf('class="unit u'+img_u+i+'"');
				if (r1_start == -1) continue;
				var post = post_root.substr(r1_start);
				var r1_start_num = post.indexOf('class="num"');
				var post = post.substr(r1_start_num + 12);	
				var r1_end = post.indexOf("</td>");
				post = post.substr(0,r1_end);
				army[i] = parseInt(post);
			}
			
				
			
			
			var tim_arr = {0:'att1',1:'att2',2:'def1',3:'def2',4:'hero_on_adventure'};
			var tim = [0,0,0,0,0];
				
			for(var i = 0;i<5;i++){
				var r1_start = post_root.indexOf('class="'+tim_arr[i]+'"');
				if (r1_start == '-1') continue;
				var post = post_root.substr(r1_start);
				
				
				var r1_start_num = post.indexOf('id="timer');
				var post = post.substr(r1_start_num + 12);
						
				var r1_end = post.indexOf("</span>");
				post = post.substr(0,r1_end);
				
				tim[i] = f5(post);
			}
			var building_contract = 'false';
			if ((post_root.indexOf('building_contract'))>-1){
				building_contract = 'true';
			}
			
			
			var army_str = '';
			for(var i=1;i<12;i++){
				army_str += '&a'+i+'='+army[i];
			}
			
			var att_str = '';
			for(var i=0;i<4;i++){
				att_str += '&'+tim_arr[i]+'='+tim[i];
			}
			
			f36('ajax_set_my_param_village',
			'forest='+res[0]+
			'&clay='+res[1]+
			'&iron='+res[2]+
			'&crop='+res[3]+
			
			'&forest_max='+res_max[0]+
			'&clay_max='+res_max[1]+
			'&iron_max='+res_max[2]+
			'&crop_max='+res_max[3]+
			
			army_str+
			'&building_contract='+building_contract+
			'&newdid=' + newdid_bufer+
			att_str+
			'&att3='+tim[4]
			,'null');
			
			
			
		}
	});
					
}




var r0,r1,r2,tab;


function f176(){

	$('span.r1').each(function(index){
		var this_r1 = $(this).text();
		if (parseInt(this_r1)<parseInt(resource[0][1])){
			$(this).append("<br/><span style='color:green;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [+"+(parseInt(resource[0][1])-parseInt(this_r1)).toString()+"]</span>");
		}else{
			$(this).append("<br/><span style='color:red;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [-"+(parseInt(this_r1)-parseInt(resource[0][1])).toString()+"]</span>");
		}
	});
	
	$('span.r2').each(function(index){
		var this_r2 = $(this).text();
		if (parseInt(this_r2)<parseInt(resource[1][1])){
			$(this).append("<br/><span style='color:green;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [+"+(parseInt(resource[1][1])-parseInt(this_r2)).toString()+"]</span>");
		}else{
			$(this).append("<br/><span style='color:red;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [-"+(parseInt(this_r2)-parseInt(resource[1][1])).toString()+"]</span>");
		}
	});
	
	$('span.r3').each(function(index){
		var this_r3 = $(this).text();
		if (parseInt(this_r3)<parseInt(resource[2][1])){
			$(this).append("<br/><span style='color:green;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [+"+(parseInt(resource[2][1])-parseInt(this_r3)).toString()+"]</span>");
		}else{
			$(this).append("<br/><span style='color:red;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [-"+(parseInt(this_r3)-parseInt(resource[2][1])).toString()+"]</span>");
		}
	});
	
	$('span.r4').each(function(index){
		var this_r4 = $(this).text();
		if (parseInt(this_r4)<parseInt(resource[3][1])){
			$(this).append("<br/><span style='color:green;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [+"+(parseInt(resource[3][1])-parseInt(this_r4)).toString()+"]</span>");
		}else{
			$(this).append("<br/><span style='color:red;font-weight:bold;margin-top:-8px !important;margin-left:8px;'> [-"+(parseInt(this_r4)-parseInt(resource[3][1])).toString()+"]</span>");
		}
	});
		
}
	
	
function f177(){
	
	if (GM_getValue('auto_color_level') == 'true'){

	
		$("div#village_map div.level").each(function(index){
			if (console=='1') unsafeWindow.console.log($(this).html());
			
			var field_coord = {
			'179_79':0,
			'269_80':1,
			'337_92':2,
			'121_118':3,
			'234_131':4,
			'291_138':5,
			'376_136':6,
			'61_169':7,
			'142_170':8,
			'332_170':9,
			'419_170':10,
			'69_230':11,
			'142_220':12,
			'278_256':13,
			'400_225':14,
			'173_310':15,
			'264_315':16,
			'354_292':17};
			
			
			var coord = $(this).attr('style').match(/[0-9]{1,3}/gi);
			
			var gid = fieldsOfVillage[$("div#village_map").attr('class')][field_coord[coord[0]+'_'+coord[1]]]+1;//там в таблице косяк -1
			
			var level = parseInt($(this).html())+1;//сразу смотрим новый уровень
			
	
			
			if ((bCost[gid][level][0]<resource[0][1])&&(bCost[gid][level][1]<resource[1][1])&&(bCost[gid][level][2]<resource[2][1])&(bCost[gid][level][3]<resource[3][1])){
			
					var p19 = $(this).html();
					$(this).html("");
					if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
					
					$(this).append("<h2 class='level_constr'>"+p19+"</h2>");
					$(this).append("<img class='color_constr_h' src='http://travian/bot/image/round_green.gif' id='img_t1' class=''/>");
					
				
			}else{
				if ((bCost[gid][level][0] + bCost[gid][level][1] +bCost[gid][level][2] + bCost[gid][level][3] < parseInt(resource[0][1])+parseInt(resource[1][1])+parseInt(resource[2][1])+parseInt(resource[3][1]))){
						var p19 = $(this).html();
						$(this).html("");
						if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
						
						$(this).append("<h2 class='level_constr'>"+p19+"</h2>");
						$(this).append("<img class='color_constr_h' src='http://travian/bot/image/round_gold.gif' id='img_t1' class=''/>");
						
				}else{
						var p19 = $(this).html();
						$(this).html("");
						if (parseInt(p19)<10) p19 = "&nbsp;" + p19;
						
						$(this).append("<h2 class='level_constr'>"+p19+"</h2>");
						$(this).append("<img class='color_constr_h' src='http://travian/bot/image/round_red.gif' id='img_t1' class=''/>");
						
						
				}
			}	
			
					
	
		});
	
	}
}

function f178(){
	GM_setValue('application_end','false');
	self.location.href = (self.location.href).replace('#','');
}




var m = 0;
$(document).ready(function(){
	
	var lang = GM_getValue('lang');
	
	var menu_pageJQBot = 'Страница jQBot T4';
	var menu_startJQBot = 'Запустить jQBot T4';
	var menu_endJQBot =  'Закрыть jQBot T4';
	var menu_ajax_reset_application = 'Сбросить параметры приложения';
	var menu_stopEventTimer = 'Остановить таймер выполнения событий';
	var menu_runEventTimer = 'Запустить таймер выполнения событий';
	var menu_viewApplicationParamGM = 'Просмотр переменные GM';
	var menu_deleteApplicationParamGM = 'Удалить переменные GM';
	var menu_viewCookieEventStep = 'Просмотр Cookie пошаговых событий';
	var menu_deleteCookieEventStep = 'Удаление Cookie пошаговых событий';
	var menu_viewApplicationParam = 'Посмотреть переменные приложения';

	
	if (lang != 'ru'){
		menu_pageJQBot = f187(lang,menu_pageJQBot);
		menu_startJQBot = f187(lang,menu_startJQBot);
		menu_endJQBot = f187(lang,menu_endJQBot);
		menu_ajax_reset_application = f187(lang,menu_ajax_reset_application);
		menu_stopEventTimer = f187(lang,menu_stopEventTimer);
		menu_runEventTimer = f187(lang,menu_runEventTimer);
		menu_viewApplicationParamGM = f187(lang,menu_viewApplicationParamGM);
		menu_deleteApplicationParamGM = f187(lang,menu_deleteApplicationParamGM);
		menu_viewCookieEventStep = f187(lang,menu_viewCookieEventStep);
		menu_deleteCookieEventStep = f187(lang,menu_deleteCookieEventStep);
		menu_viewApplicationParam = f187(lang,menu_viewApplicationParam);
	}
	

	if ($("body.v35").exists()){
		$("div#wrapper").append("<div id='tbver'>"+
								"<a class='start_awww' alt='"+menu_pageJQBot+"' href='#'>jQBot T4</a>"+
								"&nbsp;(v<a class='start_awww' alt='Проверить, не появилась ли новая версия jQBot T4' href='javaScript:void(0)'>"+
								"&nbsp;1.0.000</a>) time: <b>0</b> ms | 4.00 (AFF)</div>&nbsp;&nbsp;&nbsp;"
								);
		$("a.start_awww").click(function(){
			f159(15);
		});

	}
	

	var start = GM_getValue('ajax_reset_application');
	if (start == null){
		f41();
	}
	
	if(GM_getValue('application_end') == 'true'){
		$("div#tbver").append("&nbsp;<a id='a_start' alt='"+menu_startJQBot+"' href='javaScript:void(0)'><span class='lang'>"+menu_startJQBot+"</span></a>");
		$("a#a_start").click(function(){
			f178();
		});
		GM_registerMenuCommand(menu_startJQBot, startJQBot); 
	}else{
		
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_endJQBot, function(){f116()});
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_ajax_reset_application, function(){f41()});
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_stopEventTimer, function(){f165()});
	GM_registerMenuCommand(menu_runEventTimer, function(){f166()}); 
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_viewApplicationParamGM, function(){f153()});
	GM_registerMenuCommand(menu_deleteApplicationParamGM, function(){f154()});
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_viewCookieEventStep, function(){f151()}); 
	GM_registerMenuCommand(menu_deleteCookieEventStep, function(){f57()});
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	GM_registerMenuCommand(menu_viewApplicationParam, function(){f152()});		
	GM_registerMenuCommand('-----------------------------------', function(){f168()});
	
		if (console=='1') unsafeWindow.console.log('Начало работы бот скрипта');
		

		if ((!($("body.v35").exists()))||($("div.login").exists())||($("div.error_site").exists())||($("div#sysmsg").exists())||($("div.fatal_error").exists())){
			if (GM_getValue('auto_login') == 'true'){
				$("body").append("<div style='visibility:hidden;' id='div_hidden'></div>");
				
				$("#div_hidden").everyTime(25000, function(i) {

					if (!($("body.v35").exists())){
						var x = self.location.href;
						if (!x.indexOf('jqbot')){
							self.location.href = server + '/login.php';
						}else{
							
						}
						
					}

					if ($("div.login").exists()){
						
						$("#lowRes").attr("checked","checked");
						
						var login = GM_getValue('autologin_login');
						var password = GM_getValue('autologin_password');
						if ((login != '')&&(password != '')){
							$("input[name='name']").val(login);
							$("input[name='password']").val(password);
						}
						document.forms[0].submit();
					}

					if ($("div.error_site").exists()){
						self.location.href = server + '/login.php';
					}
				});
			}	
		}else{
			f85();
		}
	}

	$("body").click(function(){
		f179();
	});

	
});






function f179(){
	var x = GM_getValue('add_click');
	GM_setValue('add_click',parseInt(x)+1);
}

function f180(){
	
	f6();
		

	if( /build.php\?id=26/.test(p1) ){
		
		if (GM_getValue('auto_button') == 'true'){
			f102();
		}
		
	}else if( /build.php\?id=39/.test(p1) ) {
		
	}else if( /build.php\?id=40/.test(p1) ) {
						
	}
	

	if( /dorf2.php/.test(p1)){
		setTimeout(function(){f167()}, 1000);
	}
	
	
	
	
	if( /build.php.+id=/.test(p1) ) {
		f176();
		
		var href_active_village = $("ul li.entry a.active").attr('href');
		
		if (GM_getValue('auto_button') == 'true'){
			f97();
			f101();
		}
		
		if (GM_getValue('auto_button') == 'true'){
			
			if ((/gid=19/.test(href_active_village))||(/gid=20/.test(href_active_village))||(/gid=29/.test(href_active_village))||(/gid=30/.test(href_active_village))||(/gid=21/.test(href_active_village))){
				f92();
			}
			
			if (/gid=13/.test(href_active_village)){
				f96();
			}
			
			if (/gid=22/.test(href_active_village)){
				f94();
			}
			
			if (/gid=24/.test(href_active_village)){
				f99();
			}	
			
			
			if (/gid=17/.test(href_active_village)){
				f95();
			}
		}
		
		
	}

	if( /dorf1.php/.test(p1) ){
		f177();
		f79();
	}


	if( /spieler.php\?.*uid=/.test(p1) ) {
		if (GM_getValue('auto_www_link') == 'true'){
			f182();
		}
	}
	
	if( /allianz.php(\?aid=\d+)?$/.test(p1) ){
		if (GM_getValue('auto_www_link') == 'true'){
			f183();
		}
	}

	if(( /(?:nachrichten|berichte).php/.test(p1) )||( /berichte.php.+id=/.test(p1) )||( /statistiken.php/.test(p1)  )||( /spieler.php\?.*uid=/.test(p1) )||( /allianz.php(\?aid=\d+)?$/.test(p1) ) ){
		if (GM_getValue('auto_this_link') == 'true'){
			f174();
		}
	}
	
	if((/hero_auction.php/.test(p1)) && (!(/action=bids/.test(p1)))&& (!(/action=sell/.test(p1)))){
		if (GM_getValue('auto_auction') == 'true'){
			f181();
		}
	}

	p0--;
}

function f181(){
	
	
	$("td.name").each(function(index){
		var count = ($(this).html()).match(/[0-9]{1,12}/);
		var silver = $.trim($(this).parent().find("td.silver").html());
		var one =parseInt( (parseInt(silver))/(parseInt(count)));
		var name_class = $.trim($(this).parent().find("td.icon img").attr('class'));
		var color = '';

		if (name_class.indexOf('itemCategory_scroll')>-1){			
			if (one<parseInt(GM_getValue("auction_s"))){
				color = " style='color:red;' ";
			}
		}
		
		if (name_class.indexOf('itemCategory_cage')>-1){			
			if (one<parseInt(GM_getValue("auction_k"))){
				color = " style='color:red;' ";
			}
		}
		
		if (name_class.indexOf('itemCategory_ointment')>-1){
			if (one<parseInt(GM_getValue("auction_m"))){
				color = " style='color:red;' ";
			}
		}

		$(this).append("<span "+color+" class='td_name'>"+one+"<img src='http://travian/bot/image/silver.gif'/></span>");

	});

}


function f182(){

		$('a.message,a.arrow').after("<div id='link_div'>&nbsp;</div>");
		$("#link_div").corner("round");

		var d = new Date();
		d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1000);
	   	var this_date = $.format.date(d, 'yyyy-MM-dd');

		var separator = p1.split('=');
		var uid = separator[1]; 
		var separator_server = p1.split('/');
		var server_trio = separator_server[2]; 
		
		var width_browser = screen.width;
		var height_browser = screen.height;

		var split_server = server_trio.split('.');
		var sev = split_server[0];
		var country = split_server[split_server.length-1];

		var n = split_server[0].match(/[0-9]{1,2}/gi);

		var user_name = $("h1.titleInHeader").text().substr(17);
		var user_name_encodeURIComponent = encodeURIComponent(user_name);

		$('div#link_div').append("<img id='gettertools_all_map' src='http://travian/bot/image/gettet_tools_user_all.gif'/>&nbsp;");
		$("img#gettertools_all_map").click(function(){
			var gettet_tools_user_all = window.open("http://www.gettertools.com/"+server_trio+"/Player/"+uid+"-_", 
			"gettet_tools_user_all");		
		});
				
	
		$('div#link_div').append("<img id='gettertools_map'src='http://travian/bot/image/gettet_tools_user_map.gif'/>&nbsp;");
		$("img#gettertools_map").click(function(){
	
			var width_map = 530;
			var height_map = 395;
			var left_map = (width_browser - width_map)/2;
			var top_map = (height_browser - height_map)/2;
			var gettet_tools_user_map = window.open("http://www.gettertools.com/"+server_trio+"/TravianTools2.php?m=embeddedMap&semb&suid="+uid,"gettet_tools_user_map","location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width_map+",height="+height_map+",top="+top_map+",left="+left_map);
			
			
			$(window).focus(function() {
				gettet_tools_user_map.close();
			});
		});

		$('div#link_div').append("<img id='gettertools_sd_map'src='http://travian/bot/image/gettet_tools_user_pop_stat.gif'/>&nbsp;");
		$("img#gettertools_sd_map").click(function(){
			var width = 330;
			var height = 260;
			var left = (width_browser - width)/2;
			var top = (height_browser - height)/2;
			var gettet_tools_user_pop_stat = window.open("http://www.gettertools.com/"+server_trio+"/11-Players&plotter&uid="+uid+"&d=90", 
			"gettet_tools_user_pop_stat", "location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width+",height="+height+",top="+top+",left="+left);
			
			$(window).focus(function() {
				gettet_tools_user_pop_stat.close();
			});
			
		});

		$('div#link_div').append("<img id='travian_ws' src='http://travian/bot/image/travian_ws.gif'/>&nbsp;");
		$("img#travian_ws").click(function(){
			
			var travian_ws = window.open("http://travian.ws/analyser.pl?s="+country+n+"&aid="+uid,"travian_ws");
		});

		$('div#link_div').append("<img id='traviantoolbox_map' src='http://travian/bot/image/traviantoolbox_map.gif'/>&nbsp;");
		$("img#traviantoolbox_map").click(function(){

			var traviantoolbox_map = window.open("http://www.traviantoolbox.com/"+country+"/travmap.php?lang=ru&serveur=1713&server="+server_trio+"&alliance=&player="+user_name_encodeURIComponent+"&town=&groupby=player&colby=&x=&y=&zoom=&mindist=&maxdist=&minpop=&maxpop=&ok=%D0%9F%D0%BE%D0%B4%D1%82%D0%B2%D0%B5%D1%80%D0%B4%D0%B8%D1%82%D1%8C","traviantoolbox_map");
			
		});

		$('div#link_div').append("<br/>&nbsp;");

		$('div#link_div').append("<img id='travianstats' src='http://travian/bot/image/travianstats.gif'/>&nbsp;");
		
		$("img#travianstats").click(function(){
			
			var travianstats = window.open("http://travianstats.de/index.php?m=player_info&uid="+uid+"&w="+country+sev, 
			"travianstats");
		});

		$('div#link_div').append("<img alt='Ранг' id='travianstats_user_rank' src='http://travian/bot/image/travianstats_user_rank.gif'/>&nbsp;");
		
		$("img#travianstats_user_rank").click(function(){	
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#content img.heroImage").after('<div id="travianstats_user_div"><embed src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/compl_rank/'+country+sev+'/'+uid+'.php" quality="high" bgcolor="#FFFFFF" name="Ранг" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" id="travianstats_user_rank_embed" align="middle" height="'+height+'" width="'+width+'"></embed></div>');

		});

		$('div#link_div').append("<img alt='Население' id='travianstats_user_population' src='http://travian/bot/image/travianstats_user_population.gif'/>&nbsp;");
		
		$("img#travianstats_user_population").click(function(){				
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#content img.heroImage").after('<div id="travianstats_user_div"><embed width="'+width+'" height="'+height+'" align="middle" id="travianstats_user_population_embed" type="application/x-shockwave-flash" allowscriptaccess="sameDomain" name="Населене" bgcolor="#FFFFFF" quality="high" src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/compl_inhab/'+country+sev+'/'+uid+'.php"></div>');
		});

		$('div#link_div').append("<img id='traviantoolbox_map_gold' src='http://travian/bot/image/traviantoolbox_map_gold.gif'/>&nbsp;");
		$("img#traviantoolbox_map_gold").click(function(){

			var traviantoolbox_map_gold = window.open("http://www.traviantoolbox.com/carte.php?serveur="+country+n+"&x=0&y=0&zoom=2&type=peuple&pop_min=0&pop_max=1500&date="+this_date+"&alliance=&alliances_alliees=&alliances_alliees_couleurs=&alliances_ennemies=&alliances_ennemies_couleurs=&persos=&persos_couleurs=","traviantoolbox_map_gold");

		});

		$('div#link_div').append("<img id='traviantoolbox_map_user' src='http://travian/bot/image/traviantoolbox_map_user.gif'/>&nbsp;");
		$("img#traviantoolbox_map_user").click(function(){

			var traviantoolbox_map_user = window.open("http://www.traviantoolbox.com/"+country+"/listes.php?serveur="+country+n+"&l=joueurs&id="+uid,"traviantoolbox_map_user");
			
		});

}

function f183(){

		$('div#details table.transparent').after("<div id='link_div'>&nbsp;</div>");
		$("#link_div").corner("round");

		var d = new Date();
		d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1000);
	   	var this_date = $.format.date(d, 'yyyy-MM-dd');

		var separator = p1.split('=');
		var uid = separator[1];
		var separator_server = p1.split('/');
		var server_trio = separator_server[2];
		
		var width_browser = screen.width;
		var height_browser = screen.height;
		
		
		var split_server = server_trio.split('.');
		var sev = split_server[0];
		var country = split_server[split_server.length-1]; 
		
	
		var n = split_server[0].match(/[0-9]{1,2}/gi); 
		
		var user_name = $("div#details table.transparent tbody tr:nth-child(1)").find("td").text();
		var user_name_encodeURIComponent = encodeURIComponent(user_name);
		
		$('div#link_div').append("<img id='gettertools_all_map' src='http://travian/bot/image/gettet_tools_user_all.gif'/>&nbsp;");
		$("img#gettertools_all_map").click(function(){
			var gettet_tools_user_all = window.open("http://www.gettertools.com/"+server_trio+"/Alliance/"+uid+"-", "gettet_tools_user_all");		
		});

		$('div#link_div').append("<img id='gettertools_map'src='http://travian/bot/image/gettet_tools_user_map.gif'/>&nbsp;");
		$("img#gettertools_map").click(function(){
	
			var width_map = 530;
			var height_map = 395;
			var left_map = (width_browser - width_map)/2;
			var top_map = (height_browser - height_map)/2;
			
			var gettet_tools_user_map = window.open("http://www.gettertools.com/"+server_trio+"/TravianTools2.php?m=embeddedMap&semb&said="+uid,"gettet_tools_user_map","location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width_map+",height="+height_map+",top="+top_map+",left="+left_map);

			$(window).focus(function() {
				gettet_tools_user_map.close();
			});
		});

		$('div#link_div').append("<img id='gettertools_sd_map'src='http://travian/bot/image/gettet_tools_user_pop_stat.gif'/>&nbsp;");
		$("img#gettertools_sd_map").click(function(){
			var width = 330;
			var height = 260;
			var left = (width_browser - width)/2;
			var top = (height_browser - height)/2;
	
			var gettet_tools_user_pop_stat = window.open("http://www.gettertools.com/"+server_trio+"/12-Alliances&plotter&aid="+uid+"&d=90",
			"gettet_tools_user_pop_stat", "location=1,status=1,resizable=no,scrollbars=no,toolbar=no,directories=no,menubar=0,width="+width+",height="+height+",top="+top+",left="+left);
			
			$(window).focus(function() {
				gettet_tools_user_pop_stat.close();
			});
			
		});

		$('div#link_div').append("<img id='travian_ws' src='http://travian/bot/image/travian_ws.gif'/>&nbsp;");
		$("img#travian_ws").click(function(){
			
			var travian_ws = window.open("http://travian.ws/analyser.pl?s="+country+n+"&aid="+uid,"travian_ws");
		});

		$('div#link_div').append("<img id='traviantoolbox_map' src='http://travian/bot/image/traviantoolbox_map.gif'/>");
		$("img#traviantoolbox_map").click(function(){

			var traviantoolbox_map = window.open("http://www.traviantoolbox.com/"+country+"/travmap.php?lang="+country+"&serveur=1713&server="+server_trio+"&alliance="+user_name_encodeURIComponent+"&player=&town=&groupby=alliance&colby=&x=&y=&zoom=&mindist=&maxdist=&minpop=&maxpop=&ok=%D0%9F%D0%BE%D0%B4%D1%82%D0%B2%D0%B5%D1%80%D0%B4%D0%B8%D1%82%D1%8C","traviantoolbox_map");

		});

		$('div#link_div').append("<br/>&nbsp;");

		$('div#link_div').append("<img id='travianstats' src='http://travian/bot/image/travianstats.gif'/>&nbsp;");
		
		$("img#travianstats").click(function(){
			
			var travianstats = window.open("http://travianstats.de/index.php?m=alliance_info&aid="+uid+"&w="+country+sev, "travianstats");
		});

		$('div#link_div').append("<img alt='Ранг' id='travianstats_user_rank' src='http://travian/bot/image/travianstats_user_rank.gif'/>&nbsp;");
		
		$("img#travianstats_user_rank").click(function(){	
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#link_div").after('<div id="travianstats_user_div"><br/><embed src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/ally_rank/'+country+sev+'/'+uid+'.php" quality="high" bgcolor="#FFFFFF" name="inhab_'+country+sev+'_" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" id="travianstats_user_rank_embed" align="middle" height="'+height+'" width="'+width+'"></embed></div>');
			
		
		});

		$('div#link_div').append("<img alt='Население' id='travianstats_user_population' src='http://travian/bot/image/travianstats_user_population.gif'/>&nbsp;");
		
		$("img#travianstats_user_population").click(function(){				
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#link_div").after('<div id="travianstats_user_div"><br/><embed src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/ally_inhab/'+country+sev+'/'+uid+'.php" quality="high" bgcolor="#FFFFFF" name="inhab_'+country+sev+'_" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" id="travianstats_user_population" align="middle" height="'+height+'" width="'+width+'"></embed></div>');
		});

		$('div#link_div').append("<img alt='Деревни' id='travianstats_user_villages' src='http://travian/bot/image/travianstats_user_villages.gif'/>&nbsp;");
		
		$("img#travianstats_user_villages").click(function(){	
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#link_div").after('<div id="travianstats_user_div"><br/><embed src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/ally_villages/'+country+sev+'/'+uid+'.php" quality="high" bgcolor="#FFFFFF" name="inhab_'+country+sev+'_" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" id="travianstats_user_villages" align="middle" height="'+height+'" width="'+width+'"></embed></div>');

		});

		$('div#link_div').append("<img alt='Игроки' id='travianstats_user_players' src='http://travian/bot/image/travianstats_user_players.gif'/>&nbsp;");
		
		$("img#travianstats_user_players").click(function(){	
			var width = 530;
			var height = 250; 
	
			$("#travianstats_user_div").remove();
			
			$("div#link_div").after('<div id="travianstats_user_div"><br/><embed src="http://data.travianstats.de/open-flash-chart.swf?data=http://travianstats.de/flash/ally_players/'+country+sev+'/'+uid+'.php" quality="high" bgcolor="#FFFFFF" name="travianstats_user_players" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" id="inhab_'+country+sev+'_" align="middle" height="'+height+'" width="'+width+'"></embed></div>');

		});

		$('div#link_div').append("<br/>&nbsp;");

		$('div#link_div').append("<img id='traviantoolbox_map_gold' src='http://travian/bot/image/traviantoolbox_map_gold.gif'/>&nbsp;");
		$("img#traviantoolbox_map_gold").click(function(){

			var traviantoolbox_map_gold = window.open("http://www.traviantoolbox.com/carte.php?serveur="+country+n+"&x=0&y=0&zoom=5&type=alliance&pop_min=0&pop_max=1500&date="+this_date+"&alliance="+uid+"&alliances_alliees=&alliances_alliees_couleurs=&alliances_ennemies=&alliances_ennemies_couleurs=&persos=&persos_couleurs=","traviantoolbox_map_gold");

		});

		$('div#link_div').append("<img id='traviantoolbox_map_user' src='http://travian/bot/image/traviantoolbox_map_user.gif'/>&nbsp;");
		$("img#traviantoolbox_map_user").click(function(){

			var traviantoolbox_map_user = window.open("http://www.traviantoolbox.com/"+country+"/listes.php?serveur="+country+n+"&l=alliances&aid="+uid,"traviantoolbox_map_user");

		});

}


function f184(text){
	$("#log_text").append("<span class='logline'>#"+ $("#tp1").html()+" -> "+text+"<br/></span>");
	
	var count_line = $('span.logline').countElement();
	
	if (count_line>12){
		for(var i=0;i<count_line-12;i++){
			$('span.logline:first').remove();
		}
	}
	
	GM_setValue("log", $("#log_text").html() + "<span class='logline'><hr class='about_hr'/></span>");
	
	f185();
}


var bCost=[[0],[[0,0,0,0,0,0],[40,100,50,60,1,2],[65,165,85,100,1,3],[110,280,140,165,2,4],[185,465,235,280,2,5],[310,780,390,465,2,6],[520,1300,650,780,3,8],[870,2170,1085,1300,4,10],[1450,3625,1810,2175,4,12],[2420,6050,3025,3630,5,14],[4040,10105,5050,6060,6,16],[6750,16870,8435,10125,7,18],[11270,28175,14090,16905,9,20],[18820,47055,23525,28230,11,22],[31430,78580,39290,47150,13,24],[52490,131230,65615,78740,15,26],[87660,219155,109575,131490,18,29],[146395,365985,182995,219590,22,32],[244480,611195,305600,366715,27,35],[408280,1020695,510350,612420,32,38],[681825,1704565,852280,1022740,38,41],[1138650,2846620,1423310,1707970,38,44],[1901540,4753855,2376925,2852315,38,47],[3175575,7938935,3969470,4763360,38,50],[5303210,13258025,6629015,7954815,38,53],[8856360,22140900,11070450,13284540,38,56]],[[0,0,0,0,0,0],[80,40,80,50,1,2],[135,65,135,85,1,3],[225,110,225,140,2,4],[375,185,375,235,2,5],[620,310,620,390,2,6],[1040,520,1040,650,3,8],[1735,870,1735,1085,4,10],[2900,1450,2900,1810,4,12],[4840,2420,4840,3025,5,14],[8080,4040,8080,5050,6,16],[13500,6750,13500,8435,7,18],[22540,11270,22540,14090,9,20],[37645,18820,37645,23525,11,22],[62865,31430,62865,39290,13,24],[104985,52490,104985,65615,15,26],[175320,87660,175320,109575,18,29],[292790,146395,292790,182995,22,32],[488955,244480,488955,305600,27,35],[816555,408280,816555,510350,32,38],[1363650,681825,1363650,852280,38,41],[2277295,1138650,2277295,1423310,38,44],[3803085,1901540,3803085,2376925,38,47],[6351150,3175575,6351150,3969470,38,50],[10606420,5303210,10606420,6629015,38,53],[17712720,8856360,17712720,11070450,38,56]],[[0,0,0,0,0,0],[100,80,30,60,1,3],[165,135,50,100,1,5],[280,225,85,165,2,7],[465,375,140,280,2,9],[780,620,235,465,2,11],[1300,1040,390,780,3,13],[2170,1735,650,1300,4,15],[3625,2900,1085,2175,4,17],[6050,4840,1815,3630,5,19],[10105,8080,3030,6060,6,21],[16870,13500,5060,10125,7,24],[28175,22540,8455,16905,9,27],[47055,37645,14115,28230,11,30],[78580,62865,23575,47150,13,33],[131230,104985,39370,78740,15,36],[219155,175320,65745,131490,18,39],[365985,292790,109795,219590,22,42],[611195,488955,183360,366715,27,45],[1020695,816555,306210,612420,32,48],[1704565,1363650,511370,1022740,38,51],[2846620,2277295,853985,1707970,38,54],[4753855,3803085,1426155,2852315,38,57],[7938935,6351150,2381680,4763360,38,60],[13258025,10606420,3977410,7954815,38,63],[22140900,17712720,6642270,13284540,38,66]],[[0,0,0,0,0,0],[70,90,70,20,1,0],[115,150,115,35,1,0],[195,250,195,55,2,0],[325,420,325,95,2,0],[545,700,545,155,2,0],[910,1170,910,260,3,1],[1520,1950,1520,435,4,2],[2535,3260,2535,725,4,3],[4235,5445,4235,1210,5,4],[7070,9095,7070,2020,6,5],[11810,15185,11810,3375,7,6],[19725,25360,19725,5635,9,7],[32940,42350,32940,9410,11,8],[55005,70720,55005,15715,13,9],[91860,118105,91860,26245,15,10],[153405,197240,153405,43830,18,12],[256190,329385,256190,73195,22,14],[427835,550075,427835,122240,27,16],[714485,918625,714485,204140,32,18],[1193195,1534105,1193195,340915,38,20],[1992635,2561960,1992635,569325,38,22],[3327700,4278470,3327700,950770,38,24],[5557255,7145045,5557255,1587785,38,26],[9280620,11932225,9280620,2651605,38,28],[15498630,19926810,15498630,4428180,38,30]],[[0,0,0,0,0,0],[520,380,290,90,1,4],[935,685,520,160,1,6],[1685,1230,940,290,2,8],[3035,2215,1690,525,2,10],[5460,3990,3045,945,2,12]],[[0,0,0,0,0,0],[440,480,320,50,1,3],[790,865,575,90,1,5],[1425,1555,1035,160,2,7],[2565,2800,1865,290,2,9],[4620,5040,3360,525,2,11]],[[0,0,0,0,0,0],[200,450,510,120,1,6],[360,810,920,215,1,9],[650,1460,1650,390,2,12],[1165,2625,2975,700,2,15],[2100,4725,5355,1260,2,18]],[[0,0,0,0,0,0],[500,440,380,1240,1,3],[900,790,685,2230,1,5],[1620,1425,1230,4020,2,7],[2915,2565,2215,7230,2,9],[5250,4620,3990,13015,2,11]],[[0,0,0,0,0,0],[1200,1480,870,1600,1,4],[2160,2665,1565,2880,1,6],[3890,4795,2820,5185,2,8],[7000,8630,5075,9330,2,10],[12595,15535,9135,16795,2,12]],[[0,0,0,0,0,0],[130,160,90,40,1,1],[165,205,115,50,1,2],[215,260,145,65,2,3],[275,335,190,85,2,4],[350,430,240,105,2,5],[445,550,310,135,3,6],[570,705,395,175,4,7],[730,900,505,225,4,8],[935,1155,650,290,5,9],[1200,1475,830,370,6,10],[1535,1890,1065,470,7,12],[1965,2420,1360,605,9,14],[2515,3095,1740,775,11,16],[3220,3960,2230,990,13,18],[4120,5070,2850,1270,15,20],[5275,6490,3650,1625,18,22],[6750,8310,4675,2075,22,24],[8640,10635,5980,2660,27,26],[11060,13610,7655,3405,32,28],[14155,17420,9800,4355,38,30]],[[0,0,0,0,0,0],[80,100,70,20,1,1],[100,130,90,25,1,2],[130,165,115,35,2,3],[170,210,145,40,2,4],[215,270,190,55,2,5],[275,345,240,70,3,6],[350,440,310,90,4,7],[450,565,395,115,4,8],[575,720,505,145,5,9],[740,920,645,185,6,10],[945,1180,825,235,7,12],[1210,1510,1060,300,9,14],[1545,1935,1355,385,11,16],[1980,2475,1735,495,13,18],[2535,3170,2220,635,15,20],[3245,4055,2840,810,18,22],[4155,5190,3635,1040,22,24],[5315,6645,4650,1330,27,26],[6805,8505,5955,1700,32,28],[8710,10890,7620,2180,38,30]],[[0,0,0,0,0,0],[170,200,380,130,2,4],[220,255,485,165,3,6],[280,330,625,215,3,8],[355,420,795,275,4,10],[455,535,1020,350,5,12],[585,685,1305,445,6,15],[750,880,1670,570,7,18],[955,1125,2140,730,9,21],[1225,1440,2740,935,10,24],[1570,1845,3505,1200,12,27],[2005,2360,4485,1535,15,30],[2570,3020,5740,1965,18,33],[3290,3870,7350,2515,21,36],[4210,4950,9410,3220,26,39],[5390,6340,12045,4120,31,42],[6895,8115,15415,5275,37,46],[8825,10385,19730,6750,44,50],[11300,13290,25255,8640,53,54],[14460,17015,32325,11060,64,58],[18510,21780,41380,14155,77,62]],[[0,0,0,0,0,0],[180,250,500,160,2,1],[230,320,640,205,3,2],[295,410,820,260,3,3],[375,525,1050,335,4,4],[485,670,1340,430,5,5],[620,860,1720,550,6,6],[790,1100,2200,705,7,7],[1015,1405,2815,900,9,8],[1295,1800,3605,1155,10,9],[1660,2305,4610,1475,12,10],[2125,2950,5905,1890,15,11],[2720,3780,7555,2420,18,12],[3480,4835,9670,3095,21,13],[4455,6190,12380,3960,26,14],[5705,7925,15845,5070,31,15],[7300,10140,20280,6490,37,16],[9345,12980,25960,8310,44,17],[11965,16615,33230,10635,53,18],[15315,21270,42535,13610,64,19],[19600,27225,54445,17420,77,20],],[[0,0,0,0,0,0],[1750,2250,1530,240,1,1],[2240,2880,1960,305,1,2],[2865,3685,2505,395,2,3],[3670,4720,3210,505,2,4],[4700,6040,4105,645,2,5],[6015,7730,5255,825,3,6],[7695,9895,6730,1055,4,7],[9850,12665,8615,1350,4,8],[12610,16215,11025,1730,5,9],[16140,20755,14110,2215,6,10],[20660,26565,18065,2835,7,12],[26445,34000,23120,3625,9,14],[33850,43520,29595,4640,11,16],[43330,55705,37880,5940,13,18],[55460,71305,48490,7605,15,20],[70990,91270,62065,9735,18,22],[90865,116825,79440,12460,22,24],[116305,149540,101685,15950,27,26],[148875,191410,130160,20415,32,28],[190560,245005,166600,26135,38,30]],[[0,0,0,0,0,0],[70,40,60,20,2,2],[90,50,75,25,3,3],[115,65,100,35,3,4],[145,85,125,40,4,5],[190,105,160,55,5,6],[240,135,205,70,6,8],[310,175,265,90,7,10],[395,225,340,115,9,12],[505,290,430,145,10,14],[645,370,555,185,12,16],[825,470,710,235,15,18],[1060,605,905,300,18,20],[1355,775,1160,385,21,22],[1735,990,1485,495,26,24],[2220,1270,1900,635,31,26],[2840,1625,2435,810,37,29],[3635,2075,3115,1040,44,32],[4650,2660,3990,1330,53,35],[5955,3405,5105,1700,64,38],[7620,4355,6535,2180,77,41]],[[0,0,0,0,0,0],[110,160,90,70,1,1],[140,205,115,90,1,2],[180,260,145,115,2,3],[230,335,190,145,2,4],[295,430,240,190,2,5],[380,550,310,240,3,6],[485,705,395,310,4,7],[620,900,505,395,4,8],[795,1155,650,505,5,9],[1015,1475,830,645,6,10],[1300,1890,1065,825,7,12],[1660,2420,1360,1060,9,14],[2130,3095,1740,1355,11,16],[2725,3960,2230,1735,13,18],[3485,5070,2850,2220,15,20],[4460,6490,3650,2840,18,22],[5710,8310,4675,3635,22,24],[7310,10635,5980,4650,27,26],[9360,13610,7655,5955,32,28],[11980,17420,9800,7620,38,30]],[[0,0,0,0,0,0],[80,70,120,70,4,4],[100,90,155,90,4,6],[130,115,195,115,5,8],[170,145,250,145,6,10],[215,190,320,190,7,12],[275,240,410,240,9,15],[350,310,530,310,11,18],[450,395,675,395,13,21],[575,505,865,505,15,24],[740,645,1105,645,19,27],[945,825,1415,825,22,30],[1210,1060,1815,1060,27,33],[1545,1355,2320,1355,32,38],[1980,1735,2970,1735,39,41],[2535,2220,3805,2220,46,44],[3245,2840,4870,2840,55,48],[4155,3635,6230,3635,67,52],[5315,4650,7975,4650,80,56],[6805,5955,10210,5955,96,60],[8710,7620,13065,7620,115,64]],[[0,0,0,0,0,0],[180,130,150,80,5,3],[230,165,190,100,6,5],[295,215,245,130,7,7],[375,275,315,170,8,9],[485,350,405,215,10,11],[620,445,515,275,12,13],[790,570,660,350,14,15],[1015,730,845,450,17,17],[1295,935,1080,575,21,19],[1660,1200,1385,740,25,21],[2125,1535,1770,945,30,24],[2720,1965,2265,1210,36,27],[3480,2515,2900,1545,43,30],[4455,3220,3715,1980,51,33],[5705,4120,4755,2535,62,36],[7300,5275,6085,3245,74,39],[9345,6750,7790,4155,89,42],[11965,8640,9970,5315,106,45],[15315,11060,12760,6805,128,48],[19600,14155,16335,8710,153,51]],[[0,0,0,0,0,0],[210,140,260,120,1,4],[270,180,335,155,1,6],[345,230,425,195,2,8],[440,295,545,250,2,10],[565,375,700,320,2,12],[720,480,895,410,3,15],[925,615,1145,530,4,18],[1180,790,1465,675,4,21],[1515,1010,1875,865,5,24],[1935,1290,2400,1105,6,27],[2480,1655,3070,1415,7,30],[3175,2115,3930,1815,9,33],[4060,2710,5030,2320,11,36],[5200,3465,6435,2970,13,39],[6655,4435,8240,3805,15,42],[8520,5680,10545,4870,18,46],[10905,7270,13500,6230,22,50],[13955,9305,17280,7975,27,54],[17865,11910,22120,10210,32,58],[22865,15245,28310,13065,38,62]],[[0,0,0,0,0,0],[260,140,220,100,2,5],[335,180,280,130,3,8],[425,230,360,165,3,11],[545,295,460,210,4,14],[700,375,590,270,5,17],[895,480,755,345,6,20],[1145,615,970,440,7,23],[1465,790,1240,565,9,26],[1875,1010,1585,720,10,29],[2400,1290,2030,920,12,32],[3070,1655,2595,1180,15,36],[3930,2115,3325,1510,18,40],[5030,2710,4255,1935,21,44],[6435,3465,5445,2475,26,48],[8240,4435,6970,3170,31,52],[10545,5680,8925,4055,37,56],[13500,7270,11425,5190,44,60],[17280,9305,14620,6645,53,64],[22120,11910,18715,8505,64,68],[28310,15245,23955,10890,77,72]],[[0,0,0,0,0,0],[460,510,600,320,4,3],[590,655,770,410,4,5],[755,835,985,525,5,7],[965,1070,1260,670,6,9],[1235,1370,1610,860,7,11],[1580,1750,2060,1100,9,13],[2025,2245,2640,1405,11,15],[2590,2870,3380,1800,13,17],[3315,3675,4325,2305,15,19],[4245,4705,5535,2950,19,21],[5430,6020,7085,3780,22,24],[6950,7705,9065,4835,27,27],[8900,9865,11605,6190,32,30],[11390,12625,14855,7925,39,33],[14580,16165,19015,10140,46,36],[18660,20690,24340,12980,55,39],[23885,26480,31155,16615,67,42],[30570,33895,39875,21270,80,45],[39130,43385,51040,27225,96,48],[50090,55535,65335,34845,115,51]],[[0,0,0,0,0,0],[220,160,90,40,5,4],[280,205,115,50,6,6],[360,260,145,65,7,8],[460,335,190,85,8,10],[590,430,240,105,10,12],[755,550,310,135,12,15],[970,705,395,175,14,18],[1240,900,505,225,17,21],[1585,1155,650,290,21,24],[2030,1475,830,370,25,27],[2595,1890,1065,470,30,30],[3325,2420,1360,605,36,33],[4255,3095,1740,775,43,36],[5445,3960,2230,990,51,39],[6970,5070,2850,1270,62,42],[8925,6490,3650,1625,74,46],[11425,8310,4675,2075,89,50],[14620,10635,5980,2660,106,54],[18715,13610,7655,3405,128,58],[23955,17420,9800,4355,153,62]],[[0,0,0,0,0,0],[40,50,30,10,1,0],[50,65,40,15,1,0],[65,80,50,15,2,0],[85,105,65,20,2,0],[105,135,80,25,2,0],[135,170,105,35,3,1],[175,220,130,45,4,2],[225,280,170,55,4,3],[290,360,215,70,5,4],[370,460,275,90,6,5]],[[0,0,0,0,0,0],[1250,1110,1260,600,6,4],[1600,1420,1615,770,7,6],[2050,1820,2065,985,9,8],[2620,2330,2640,1260,10,10],[3355,2980,3380,1610,12,12],[4295,3815,4330,2060,15,15],[5500,4880,5540,2640,18,18],[7035,6250,7095,3380,21,21],[9005,8000,9080,4325,26,24],[11530,10240,11620,5535,31,27],[14755,13105,14875,7085,37,30],[18890,16775,19040,9065,45,33],[24180,21470,24370,11605,53,36],[30950,27480,31195,14855,64,39],[39615,35175,39930,19015,77,42],[50705,45025,51110,24340,92,46],[64905,57635,65425,31155,111,50],[83075,73770,83740,39875,133,54],[106340,94430,107190,51040,160,58],[136115,120870,137200,65335,192,62]],[[0,0,0,0,0,0],[580,460,350,180,2,1],[740,590,450,230,3,2],[950,755,575,295,3,3],[1215,965,735,375,4,4],[1555,1235,940,485,5,5],[1995,1580,1205,620,6,6],[2550,2025,1540,790,7,7],[3265,2590,1970,1015,9,8],[4180,3315,2520,1295,11,9],[5350,4245,3230,1660,12,10],[6845,5430,4130,2125,15,12],[8765,6950,5290,2720,18,14],[11220,8900,6770,3480,21,16],[14360,11390,8665,4455,26,18],[18380,14580,11090,5705,31,20],[23530,18660,14200,7300,37,22],[30115,23885,18175,9345,44,24],[38550,30570,23260,11965,53,26],[49340,39130,29775,15315,64,28],[63155,50090,38110,19600,77,30]],[[0,0,0,0,0,0],[550,800,750,250,6,1],[705,1025,960,320,7,2],[900,1310,1230,410,9,3],[1155,1680,1575,525,10,4],[1475,2145,2015,670,12,5],[1890,2750,2575,860,15,6],[2420,3520,3300,1100,18,7],[3095,4505,4220,1405,21,8],[3965,5765,5405,1800,26,9],[5075,7380,6920,2305,31,10],[6495,9445,8855,2950,37,12],[8310,12090,11335,3780,45,14],[10640,15475,14505,4835,53,16],[13615,19805,18570,6190,64,18],[17430,25355,23770,7925,77,20],[22310,32450,30425,10140,92,22],[28560,41540,38940,12980,111,24],[36555,53170,49845,16615,133,26],[46790,68055,63805,21270,160,28],[59890,87110,81670,27225,192,30]],[[0,0,0,0,0,0],[2880,2740,2580,990,7,4],[3630,3450,3250,1245,9,6],[4570,4350,4095,1570,10,8],[5760,5480,5160,1980,12,10],[7260,6905,6505,2495,15,12],[9145,8700,8195,3145,18,15],[11525,10965,10325,3960,21,18],[14520,13815,13010,4990,26,21],[18295,17405,16390,6290,31,24],[23055,21930,20650,7925,37,27],[29045,27635,26020,9985,45,30],[36600,34820,32785,12580,53,33],[46115,43875,41310,15850,64,36],[58105,55280,52050,19975,77,39],[73210,69655,65585,25165,92,42],[92245,87760,82640,31710,111,46],[116230,110580,104125,39955,133,50],[146450,139330,131195,50340,160,54],[184530,175560,165305,63430,192,58],[232505,221205,208285,79925,230,62]],[[0,0,0,0,0,0],[1400,1330,1200,400,4,3],[1790,1700,1535,510,4,5],[2295,2180,1965,655,5,7],[2935,2790,2515,840,6,9],[3760,3570,3220,1075,7,11],[4810,4570,4125,1375,9,13],[6155,5850,5280,1760,11,15],[7880,7485,6755,2250,13,17],[10090,9585,8645,2880,15,19],[12915,12265,11070,3690,19,21],[16530,15700,14165,4720,22,24],[21155,20100,18135,6045,27,27],[27080,25725,23210,7735,32,30],[34660,32930,29710,9905,39,33],[44370,42150,38030,12675,46,36],[56790,53950,48680,16225,55,39],[72690,69060,62310,20770,67,42],[93045,88395,79755,26585,80,45],[119100,113145,102085,34030,96,48],[152445,144825,130670,43555,115,51]],[[0,0,0,0,0,0],[630,420,780,360,1,4],[805,540,1000,460,1,6],[1030,690,1280,590,2,8],[1320,880,1635,755,2,10],[1690,1125,2095,965,2,12],[2165,1445,2680,1235,3,15],[2770,1845,3430,1585,4,18],[3545,2365,4390,2025,4,21],[4540,3025,5620,2595,5,24],[5810,3875,7195,3320,6,27],[7440,4960,9210,4250,7,30],[9520,6345,11785,5440,9,33],[12185,8125,15085,6965,11,36],[15600,10400,19310,8915,13,39],[19965,13310,24720,11410,15,42],[25555,17035,31640,14605,18,46],[32710,21810,40500,18690,22,50],[41870,27915,51840,23925,27,54],[53595,35730,66355,30625,32,58],[68600,45735,84935,39200,38,62]],[[0,0,0,0,0,0],[780,420,660,300,2,5],[1000,540,845,385,3,8],[1280,690,1080,490,3,11],[1635,880,1385,630,4,14],[2095,1125,1770,805,5,17],[2680,1445,2270,1030,6,20],[3430,1845,2905,1320,7,23],[4390,2365,3715,1690,9,26],[5620,3025,4755,2160,10,29],[7195,3875,6085,2765,12,32],[9210,4960,7790,3540,15,36],[11785,6345,9975,4535,18,40],[15085,8125,12765,5805,21,44],[19310,10400,16340,7430,26,48],[24720,13310,20915,9505,31,52],[31640,17035,26775,12170,37,56],[40500,21810,34270,15575,44,60],[51840,27915,43865,19940,53,64],[66355,35730,56145,25520,64,68],[84935,45735,71870,32665,77,72]],[[0,0,0,0,0,0],[70,90,170,70,1,0],[90,115,220,90,1,0],[115,145,280,115,2,0],[145,190,355,145,2,0],[190,240,455,190,2,0],[240,310,585,240,3,1],[310,395,750,310,4,2],[395,505,955,395,4,3],[505,650,1225,505,5,4],[645,830,1570,645,6,5],[825,1065,2005,825,7,6],[1060,1360,2570,1060,9,7],[1355,1740,3290,1355,11,8],[1735,2230,4210,1735,13,9],[2220,2850,5390,2220,15,10],[2840,3650,6895,2840,18,12],[3635,4675,8825,3635,22,14],[4650,5980,11300,4650,27,16],[5955,7655,14460,5955,32,18],[7620,9800,18510,7620,38,20]],[[0,0,0,0,0,0],[120,200,0,80,1,0],[155,255,0,100,1,0],[195,330,0,130,2,0],[250,420,0,170,2,0],[320,535,0,215,2,0],[410,685,0,275,3,1],[530,880,0,350,4,2],[675,1125,0,450,4,3],[865,1440,0,575,5,4],[1105,1845,0,740,6,5],[1415,2360,0,945,7,6],[1815,3020,0,1210,9,7],[2320,3870,0,1545,11,8],[2970,4950,0,1980,13,9],[3805,6340,0,2535,15,10],[4870,8115,0,3245,18,12],[6230,10385,0,4155,22,14],[7975,13290,0,5315,27,16],[10210,17015,0,6805,32,18],[13065,21780,0,8710,38,20]],[[0,0,0,0,0,0],[160,100,80,60,1,0],[205,130,100,75,1,0],[260,165,130,100,2,0],[335,210,170,125,2,0],[430,270,215,160,2,0],[550,345,275,205,3,1],[705,440,350,265,4,2],[900,565,450,340,4,3],[1155,720,575,430,5,4],[1475,920,740,555,6,5],[1890,1180,945,710,7,6],[2420,1510,1210,905,9,7],[3095,1935,1545,1160,11,8],[3960,2475,1980,1485,13,9],[5070,3170,2535,1900,15,10],[6490,4055,3245,2435,18,12],[8310,5190,4155,3115,22,14],[10635,6645,5315,3990,27,16],[13610,8505,6805,5105,32,18],[17420,10890,8710,6535,38,20]],[[0,0,0,0,0,0],[155,130,125,70,1,2],[200,165,160,90,1,3],[255,215,205,115,2,4],[325,275,260,145,2,5],[415,350,335,190,2,6],[535,445,430,240,3,8],[680,570,550,310,4,10],[875,730,705,395,4,12],[1115,935,900,505,5,14],[1430,1200,1155,645,6,16],[1830,1535,1475,825,7,18],[2340,1965,1890,1060,9,20],[3000,2515,2420,1355,11,22],[3840,3220,3095,1735,13,24],[4910,4120,3960,2220,15,26],[6290,5275,5070,2840,18,29],[8050,6750,6490,3635,22,32],[10300,8640,8310,4650,27,35],[13185,11060,10635,5955,32,38],[16880,14155,13610,7620,38,41]],[[0,0,0,0,0,0],[1460,930,1250,1740,5,6],[2045,1300,1750,2435,6,9],[2860,1825,2450,3410,7,12],[4005,2550,3430,4775,8,15],[5610,3575,4800,6685,10,18],[7850,5000,6725,9360,12,22],[10995,7000,9410,13100,14,26],[15390,9805,13175,18340,17,30],[21545,13725,18445,25680,21,34],[30165,19215,25825,35950,25,38]],[[0,0,0,0,0,0],[100,100,100,100,1,4],[130,130,130,130,1,6],[165,165,165,165,2,8],[210,210,210,210,2,10],[270,270,270,270,2,12],[345,345,345,345,3,15],[440,440,440,440,4,18],[565,565,565,565,4,21],[720,720,720,720,5,24],[920,920,920,920,6,27],[1180,1180,1180,1180,7,30],[1510,1510,1510,1510,9,33],[1935,1935,1935,1935,11,36],[2475,2475,2475,2475,13,39],[3170,3170,3170,3170,15,42],[4055,4055,4055,4055,18,46],[5190,5190,5190,5190,22,50],[6645,6645,6645,6645,27,54],[8505,8505,8505,8505,32,58],[10890,10890,10890,10890,38,62]],[[0,0,0,0,0,0],[700,670,700,240,1,2],[930,890,930,320,1,3],[1240,1185,1240,425,2,4],[1645,1575,1645,565,2,5],[2190,2095,2190,750,2,6],[2915,2790,2915,1000,3,8],[3875,3710,3875,1330,4,10],[5155,4930,5155,1765,4,12],[6855,6560,6855,2350,5,14],[9115,8725,9115,3125,6,16],[12125,11605,12125,4155,7,18],[16125,15435,16125,5530,9,20],[21445,20525,21445,7350,11,22],[28520,27300,28520,9780,13,24],[37935,36310,37935,13005,15,24],[50450,48290,50450,17300,18,27],[67100,64225,67100,23005,22,30],[89245,85420,89245,30600,27,33],[118695,113605,118695,40695,32,36],[157865,151095,157865,54125,37,39]],[[0,0,0,0,0,0,0],[650,800,450,200,1,1],[830,1025,575,255,1,2],[1065,1310,735,330,2,3],[1365,1680,945,420,2,4],[1745,2145,1210,535,2,5],[2235,2750,1545,685,3,6],[2860,3520,1980,880,4,7],[3660,4505,2535,1125,4,8],[4685,5765,3245,1440,5,9],[5995,7380,4150,1845,6,10],[7675,9445,5315,2360,7,12],[9825,12090,6800,3020,9,14],[12575,15475,8705,3870,11,16],[16095,19805,11140,4950,13,18],[20600,25355,14260,6340,15,20],[26365,32450,18255,8115,18,22],[33750,41540,23365,10385,22,24],[43200,53170,29910,13290,27,26],[55295,68055,38280,17015,32,28],[70780,87110,49000,21780,38,30]],[[0,0,0,0,0,0],[400,500,350,100,1],[510,640,450,130,1,2],[655,820,575,165,2,3],[840,1050,735,210,2,4],[1075,1340,940,270,2,5],[1375,1720,1205,345,3,6],[1760,2200,1540,440,4,7],[2250,2815,1970,565,4,8],[2880,3605,2520,720,5,9],[3690,4610,3230,920,6,10],[4720,5905,4130,1180,7,12],[6045,7555,5290,1510,9,14],[7735,9670,6770,1935,11,16],[9905,12380,8665,2475,13,18],[12675,15845,11090,3170,15,20],[16225,20280,14200,4055,18,22],[20770,25960,18175,5190,22,24],[26585,33230,23260,6645,27,26],[34030,42535,29775,8505,32,28],[43555,54445,38110,10890,38,30]],[[0,0,0,0,0,0],[66700,69050,72200,13200,0,1],[68535,70950,74185,13565,0,2],[70420,72900,76225,13935,0,3],[72355,74905,78320,14320,0,4],[74345,76965,80475,14715,0,5],[76390,79080,82690,15120,0,6],[78490,81255,84965,15535,0,7],[80650,83490,87300,15960,0,8],[82865,85785,89700,16400,0,9],[85145,88145,92165,16850,0,10],[87485,90570,94700,17315,0,12],[89895,93060,97305,17790,0,14],[92365,95620,99980,18280,0,16],[94905,98250,102730,18780,0,18],[97515,100950,105555,19300,0,20],[100195,103725,108460,19830,0,22],[102950,106580,111440,20375,0,24],[105785,109510,114505,20935,0,26],[108690,112520,117655,21510,0,28],[111680,115615,120890,22100,0,30],[114755,118795,124215,22710,0,33],[117910,122060,127630,23335,0,36],[121150,125420,131140,23975,0,39],[124480,128870,134745,24635,0,42],[127905,132410,138455,25315,0,45],[131425,136055,142260,26010,0,48],[135035,139795,146170,26725,0,51],[138750,143640,150190,27460,0,54],[142565,147590,154320,28215,0,57],[146485,151650,158565,28990,0,60],[150515,155820,162925,29785,0,64],[154655,160105,167405,30605,0,68],[158910,164505,172010,31450,0,72],[163275,169030,176740,32315,0,76],[167770,173680,181600,33200,0,80],[172380,178455,186595,34115,0,84],[177120,183360,191725,35055,0,88],[181995,188405,197000,36015,0,92],[186995,193585,202415,37005,0,96],[192140,198910,207985,38025,0,100],[197425,204380,213705,39070,0,105],[202855,210000,219580,40145,0,110],[208430,215775,225620,41250,0,115],[214165,221710,231825,42385,0,120],[220055,227805,238200,43550,0,125],[226105,234070,244750,44745,0,130],[232320,240505,251480,45975,0,135],[238710,247120,258395,47240,0,140],[245275,253915,265500,48540,0,145],[252020,260900,272800,49875,0,150],[258950,268075,280305,51245,0,156],[266070,275445,288010,52655,0,162],[273390,283020,295930,54105,0,168],[280905,290805,304070,55590,0,174],[288630,298800,312430,57120,0,180],[296570,307020,321025,58690,0,186],[304725,315460,329850,60305,0,192],[313105,324135,338925,61965,0,198],[321715,333050,348245,63670,0,204],[330565,342210,357820,65420,0,210],[339655,351620,367660,67220,0,217],[348995,361290,377770,69065,0,224],[358590,371225,388160,70965,0,231],[368450,381435,398835,72915,0,238],[378585,391925,409800,74920,0,245],[388995,402700,421070,76985,0,252],[399695,413775,432650,79100,0,259],[410685,425155,444550,81275,0,266],[421980,436845,456775,83510,0,273],[433585,448860,469335,85805,0,280],[445505,461205,482240,88165,0,288],[457760,473885,495505,90590,0,296],[470345,486920,509130,93080,0,304],[483280,500310,523130,95640,0,312],[496570,514065,537520,98270,0,320],[510225,528205,552300,100975,0,328],[524260,542730,567490,103750,0,336],[538675,557655,583095,106605,0,344],[553490,572990,599130,109535,0,352],[568710,588745,615605,112550,0,360],[584350,604935,632535,115645,0,369],[600420,621575,649930,118825,0,378],[616930,638665,667800,122090,0,387],[633895,656230,686165,125450,0,396],[651330,674275,705035,128900,0,405],[669240,692820,724425,132445,0,414],[687645,711870,744345,136085,0,423],[706555,731445,764815,139830,0,432],[725985,751560,785850,143675,0,441],[745950,772230,807460,147625,0,450],[766460,793465,829665,151685,0,460],[787540,815285,852480,155855,0,470],[809195,837705,875920,160140,0,480],[831450,860745,900010,164545,0,490],[854315,884415,924760,169070,0,500],[877810,908735,950190,173720,0,510],[901950,933725,976320,178495,0,520],[926750,959405,1000000,183405,0,530],[952235,985785,1000000,188450,0,540],[1000000,1000000,1000000,193630,0,550]],[[0,0,0,0,0,0],[780,420,660,540,4,5],[1000,540,845,690,4,8],[1280,690,1080,885,5,11],[1635,880,1385,1130,6,14],[2095,1125,1770,1450,7,17],[2680,1445,2270,1855,9,20],[3430,1845,2905,2375,11,23],[4390,2365,3715,3040,13,26],[5620,3025,4755,3890,15,29],[7195,3875,6085,4980,19,31],[9210,4960,7790,6375,22,35],[11785,6345,9975,8160,27,39],[15085,8125,12765,10445,32,43],[19310,10400,16340,13370,39,47],[24720,13310,20915,17115,46,51],[31640,17035,26775,21905,55,55],[40500,21810,34270,28040,67,59],[51840,27915,43865,35890,80,63],[66355,35730,56145,45940,96,67],[84935,45735,71870,58800,115,71]]];

fieldsOfVillage = {
	'f1':	[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f2':	[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f3':	[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f4':	[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f5':	[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
	'f6':	[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], 
	'f7':	[0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
	'f8':	[2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f9':	[2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f10':	[2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], 
	'f11':	[2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], 
	'f12':	[0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1] 
};


function f185(){
	var lang = GM_getValue('lang');
	if (lang != 'ru'){
	
		$('span.lang').each(function(index){

			$(this).html(f187(lang,$(this).html()));
			
			$(this).removeClass('lang');
		});
		
		
		$('select.lang option').each(function(index){
			$(this).html(f187(lang,$(this).html()));
			$(this).parent().removeClass('lang');
		});
		
		$('td.lang').each(function(index){
			$(this).html(f187(lang,$(this).html()));
			$(this).removeClass('lang');
		});
	}
}


function f186(){
	$("#body_root").append("<div id='tab_about' class='tab'></div>");
	
	
	var return_lang = "<select id='select_lang' style='width:98%;'>"+
"<option value='ru'>[ru] Российская Федерация</option>"+
"<option value='ae'>[ae] Арабский</option>"+
"<option value='asia'>[asia] Азия</option>"+
"<option value='au'>[au] Австралия</option>"+
"<option value='ba'>[ba] Босния</option>"+
"<option value='bg'>[bg] Болгария</option>"+
"<option value='pt'>[br] Бразилия</option>"+
"<option value='ba'>[ba] Чили</option>"+
"<option value='cn'>[cn] Китайский</option>"+
"<option value='cz'>[cz] Чехия</option>"+
"<option value='de'>[de] Германия</option>"+
"<option value='dk'>[dk] Дания</option>"+
"<option value='eg'>[eg] Египет</option>"+
"<option value='ee'>[ee] Эстонский</option>"+
"<option value='fi'>[fi] Финляндия</option>"+
"<option value='fr'>[fr] Франция</option>"+
"<option value='gr'>[gr] Греция</option>"+
"<option value='hk'>[hk] Гонконг</option>"+
"<option value='hr'>[hr] Хорватия</option>"+
"<option value='hu'>[hu] Венгрия</option>"+
"<option value='id'>[id] Индонезия</option>"+
"<option value='il'>[il] Израиль</option>"+
"<option value='in'>[in] Индия</option>"+
"<option value='ir'>[ir] Иран</option>"+
"<option value='it'>[it] Италия</option>"+
"<option value='jp'>[jp] Япония</option>"+
"<option value='kr'>[kr] Корейский</option>"+
"<option value='li'>[li] Лихтенштейн</option>"+
"<option value='lt'>[lt] Литва</option>"+
"<option value='lv'>[lv] Латвия</option>"+
"<option value='ma'>[ma] Марокко</option>"+
"<option value='my'>[my] Малайзия</option>"+
"<option value='nl'>[nl] Нидерланды</option>"+
"<option value='no'>[no] Норвегия</option>"+
"<option value='ph'>[ph] Филипины</option>"+
"<option value='pk'>[pk] Пакистан(Урду)</option>"+
"<option value='pl'>[pl] Польша</option>"+
"<option value='pt'>[pt] Португалия</option>"+
"<option value='ro'>[ro] Румыния</option>"+
"<option value='rs'>[rs] Сербия</option>"+
"<option value='sa'>[sa] Саудовская Аравия</option>"+
"<option value='se'>[se] Швеция</option>"+
"<option value='si'>[si] Словения</option>"+
"<option value='sk'>[sk] Словакия</option>"+
"<option value='tr'>[tr] Турция</option>"+
"<option value='tw'>[tw] Тайвань</option>"+
"<option value='ua'>[ua] Украина</option>"+
"<option value='uk'>[uk] Англия</option>"+
"<option value='us'>[us] США</option>"+
"<option value='vn'>[vn] Вьетнам</option>"+
"<option value='za'>[za] ЮАР</option>"+
"<option value='com'>[com][en] Английский</option>"+
								"</select>"; 
	
	
	var p18 = "<table id='application_param'>"+
		
	"<col style='width:45%;'>"+
	"<col style='width:55%;'>"+
	
	
	"<tr>"+
		"<td  colspan='2'>"+
			"<span class='lang bold'>Настройки приложения:</span> &nbsp;"+
			"<span span='float:right;'>"+f100('reset_application','','Сбросить')+"</span>"+
		"</td>"+
	"</tr>"+					
	
	"<tr>"+
		"<td colspan='2'>"+
			"<span class='lang bold'>Язык:</span>"+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			return_lang+
		"</td>"+
	"</tr>"+
	
	
	"<tr style='line-height:4px !important;'>"+
		"<td colspan='2'>"+
			"&nbsp;"+
		"</td>"+
	"</tr>"+
	
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_all_village','auto_param','Автосканирование всех деревень')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_reports','auto_param','Анализ отчетов')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_salvation','auto_param','Автоувод войск')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_all_event','auto_param','Общая очередь')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_army','auto_param','Отправка войска')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_remove_constr','auto_param','Разрушение зданий')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_constr','auto_param','Постройка зданий')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_trading','auto_param','Отправка торговцев')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_color_level','auto_param','Уровни зданий')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_www_link','auto_param','Внешние переходы')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_this_link','auto_param','Быстрые переходы')+
		"</td>"+
	"</tr>"+
	
	
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_button','auto_param','Кнопки развития')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_login','auto_param','Автоввод логина при сбое')+
		"</td>"+
	"</tr>"+
	
	"<tr>"+
		"<td colspan='2'>"+
			f105('auto_auction','auto_param','Аукцион')+
		"</td>"+
	"</tr>"+
	"</table>";
	
	$("div#tab_about").append(p18);
	$("div#tab_about").append("<span class='file' id='li_option'><a class='a_tree'><h3><span class='lang'>Настройки приложения</span></h3></a></span></li>");
	$("div#tab_about").append("<span class='file' id='li_autologin'><a class='a_tree'><h3><span class='lang'>Настройки автоввода логина при сбое</span></h3></a></span></li>");

	createEventf37();

	$("select#select_lang option").each(function(index){
		$(this).attr('selected','');
		if ($(this).val() == GM_getValue('lang')){
			$(this).attr('selected','selected');
		}
	 });
	 
	 $("select#select_lang").change(function () {
         	GM_setValue('lang',$("select#select_lang option:selected").val());
			self.location.href = f76();
     });
	 
	 $("button#reset_application").click(function(){
		f41();
	});
	
	
	$("input.auto_param").click(function(){
		if ($(this).attr('checked') == true){
			GM_setValue($(this).attr('id'),'true');
		}else{
			GM_setValue($(this).attr('id'),'false');
		}
	});
	
}


function f187(b,a){switch(b){case"ae":return lang_ae[lang_default[a]];break;case"bg":return lang_bg[lang_default[a]];break;case"cn":return lang_cn[lang_default[a]];break;case"cz":return lang_cz[lang_default[a]];break;case"de":return lang_de[lang_default[a]];break;case"dk":return lang_dk[lang_default[a]];break;case"ee":return lang_ee[lang_default[a]];break;case"fi":return lang_fi[lang_default[a]];break;case"fr":return lang_fr[lang_default[a]];break;case"gr":return lang_gr[lang_default[a]];break;case"hr":return lang_hr[lang_default[a]];break;case"hu":return lang_hu[lang_default[a]];break;case"id":return lang_id[lang_default[a]];break;case"in":return lang_in[lang_default[a]];break;case"it":return lang_it[lang_default[a]];break;case"jp":return lang_jp[lang_default[a]];break;case"kr":return lang_kr[lang_default[a]];break;case"lt":return lang_lt[lang_default[a]];break;case"my":return lang_my[lang_default[a]];break;case"com":return lang_com[lang_default[a]];break;case"asia":return lang_cn[lang_default[a]];break;case"au":return lang_com[lang_default[a]];break;case"ba":return lang_ae[lang_default[a]];break;case"cl":return lang_com[lang_default[a]];break;case"eg":return lang_ae[lang_default[a]];break;case"hk":return lang_cn[lang_default[a]];break;case"id":return lang_ae[lang_default[a]];break;case"il":return lang_ae[lang_default[a]];break;case"ir":return lang_ae[lang_default[a]];break;case"li":return lang_de[lang_default[a]];break;case"ma":return lang_ae[lang_default[a]];break;case"br":return lang_pt[lang_default[a]];break;case"nl":return lang_com[lang_default[a]];break;case"no":return lang_no[lang_default[a]];break;case"ph":return lang_com[lang_default[a]];break;case"pk":return lang_pk[lang_default[a]];break;case"pl":return lang_pl[lang_default[a]];break;case"ro":return lang_ro[lang_default[a]];break;case"rs":return lang_rs[lang_default[a]];break;case"sa":return lang_sa[lang_default[a]];break;case"se":return lang_se[lang_default[a]];break;case"si":return lang_si[lang_default[a]];break;case"sk":return lang_sk[lang_default[a]];break;case"tr":return lang_tr[lang_default[a]];break;case"tw":return lang_tw[lang_default[a]];break;case"ua":return lang_ua[lang_default[a]];break;case"uk":return lang_com[lang_default[a]];break;case"us":return lang_com[lang_default[a]];break;case"vn":return lang_vn[lang_default[a]];break;case"za":return lang_com[lang_default[a]];break;default:return"-"}};
var lang_default={"О программе":1,"Фарм лист":2,"Очередь фарма":3,"Настройки приложения":4,"Очередь постройки войск":5,"Очередь исследования войск":6,"Очередь постройки новых зданий":7,"Очередь усовершенствований зданий":8,"Очередь сноса зданий":9,"Общая очередь заказов":10,"Очередь усовершенствований войск":11,"Автоувод войск":12,"Блакнот":13,"Полезные ссылки":14,"Миницентр деревни":15,"Проведение праздников":16,"Торговые маршруты":17,"Продажа и закупка рессурсов":18,"Игра на аукционе":19,"Рессурсы всех деревень":20,"Армии всех деревень":21,"Передвижения войск всех деревень":22,"Лог":23,"Фарм лист":24,"Очередь фарма":25,"Очередь заказа войск":26,"Очередь исследования войск":27,"Очередь усовершенствований войск":28,"Общая очередь заказов":29,"Автоувод войск":30,"Волны":31,"Деревни":32,"Рессурсы всех деревень":33,"Армии всех деревень":34,"Передвижения войск всех деревень":35,"Очередь постройки новых зданий":36,"Очередь усовершенствований зданий":37,"Очередь сноса зданий":38,"Анализ":39,"Аналитика нападений альянса":40,"Анализ отчетов":41,"Герой":42,"Автоматическая отправка героя на квесты":43,"Автоматическая прокачка героя на оазисах":44,"Культура":45,"Автоматическое проведение праздников":46,"Торговля и рессурсы":47,"Автобалансировка рессурсов с помощю героя":48,"Автобалансировка рессурсов по деревням с помощю торговцев":49,"Торговые маршруты":50,"Закупка и продажа рессурсов":51,"Аукцион":52,"Игра на аукционе":53,"Автопокупка нужных вещей":54,"Карта":55,"Поиск 15 и 9":56,"Поиск слабых и беззащитных":57,"Карта торговых маршрутов":58,"Карта кормушек":59,"Карта альянса":60,"Карта врагов":61,"Авторазвитие":62,"Автоматическое развитие":63,"Автопрохождение квестов":64,"Автоматическое развитие новых деревень":65,"Общее":66,"Блакнот":67,"О программе":68,"Настройки приложения":69,"Лог приложения":70,"Полезные ссылки":71,"Миницент деревни":72,"Статистика":73,"Численность войска":74,"Уровень развития рессурсов":75,"Статистика онлайна":76,"Управление":77,"График онлайна":78,"График активности":79,"Настройки отправки смс":80,"Управление через ICQ":81,"Отправить информацию на сервервис координации альянса":82,"Вход на сервервис координации альянса":83,"Армия":84,"Сбросить":85,"Очистить":86,"Сохранить":87,"ОК":88,"Разрушить позже":89,"Настройки приложения:":90,"Язык:":91,"По всем вопросам обращайтесь по:":92,"Наименование":93,"Выделять при цене ниже":94,"Закупать при цене ниже":95,"*Закупка не реализована, и скорее всего не будет :)":96,"Мазь":97,"Свиток":98,"Клетка":99,"Запустить jQBot T4":100,"Заказать позже":101,"Построить позже":102,"Исследовать позже":103,"Создать торговый маршрут":104,"Для создания маршрута необходимо":105,"ввести координаты":106,"ОК":107,"Отмена":108,"Название":109,"Ссылка":110,"Открывать в текущей вкладке":111,"Открывать в новой вкладке":112,"Остановить":113,"Послать последние в списке":114,"+ текущая":115,"Сброс всех напов до текущего времени":116,"Сброс очереди фарма":117,"Провести позже":118,"Разрушить позже":119,"Новая ссылка":120,"Тип":121,"Подкрепление":122,"Обычное нападение":123,"Набег":124,"Периодичность":125,"Случайное смещение":126,"Тип атаки":127,"1 атаку":128,"2 атаки":129,"3 атаки":130,"5 атак":131,"10 атак":132,"15 атак":133,"20 атак":134,"25 атак":135,"30 атак":136,"40 атак":137,"50 атак":138,"75 атак":139,"100 атак":140,"Деревня":141,"Время":142,"Войско":143,"Игрок":144,"Дерево":145,"Глина":146,"Железо":147,"Зерно":148,"Отправитель":149,"Получатель":150,"Рессурсы":151,"Период":152,"Отправка в":153,"Количество":154,"Тип заказа":155,"Постройка":156,"Уровень":157,"Народ":158,"Период таймера событий":159,"Период сканера":160,"Общая очередь":161,"Заказывать войско, если идет строительство":162,"Строить то на что хватает рессурсов":163,"Строить все в порядке очередности":164,"Радиус фарма":165,"Уводить за X секунд":166,"Автоувод войск":167,"Лесопилка":400,"Глиняный карьер":401,"Железный рудник":402,"Ферма":403,"Лесопильный завод":404,"Кирпичный завод":405,"Чугунолитейный завод":406,"Мукомольная мельница":407,"Пекарня":408,"Склад":409,"Амбар":410,"Кузница оружия":411,"Кузница доспехов":412,"Арена":413,"Главное здание":414,"Пункт сбора":415,"Рынок":416,"Посольство":417,"Казарма":418,"Конюшня":419,"Мастерская":420,"Академия":421,"Тайник":422,"Ратуша":423,"Резиденция":424,"Дворец":425,"Сокровищница":426,"Торговая палата":427,"Большая казарма":428,"Большая конюшня":429,"Городская стена":430,"Земляной вал":431,"Изгородь":432,"Каменотес":433,"Пивоварня":434,"Капканщик":435,"Таверна":436,"Большой склад":437,"Большой амбар":438,"Чудо света":439,"Заказ войск":460,"Исследование войск":461,"Постройка":462,"Усовершенствование":463,"Проведение праздников":464,"Управление":501,"Настройки":502,"Помощь":503,"Набег":504,"Подкрепление":505,"Обычное нападение":506,"Римляне":507,"Германцы":508,"Галлы":509,"[3]-Отправка войска":700,"[3]+Отправка войска":701,"[6]-Отправка торговцев":702,"[6]+Отправка торговцев":703,"[1]-Автоувод армии":704,"[1]+Автоувод армии":705,"[4]-Рушим здания":706,"[4]+Рушим здания":707,"[2]-Общая очередь":708,"[2]+Общая очередь":709,"[5]-Общая очередь(здания)":710,"[5]+Общая очередь(здания)":711,"Данные успешно сохранены":600,"Задача выполнена хозяин":601,"Все параметры приложения сброшены":602,"Установлен новый радиус":603,"Добавлена новая ссылка":604,"Добавлен новый маршрут":605,"Ошибка":606,"Данные добавлены в очередь":607,"Такое исследование уже есть в очереди":608,"Это здание уже стоит в очереди на снос":609,"Усовершенствование и так имеет максимальный уровень":610,"На данной клетке уже что-то строится":611,"Такое здание уже строится в этой деревне":612,"Здание и так будет иметь максимальный уровень":613,"Сообщение":614,"Перегенерирована очередь фарма":615,"Рушить то нечего":616,"Автосканирование всех деревень":617,"Отправка войска":618,"Разрушение зданий":619,"Постройка зданий":620,"Отправка торговцев":621,"Уровни зданий":622,"Внешние переходы":623,"Быстрые переходы":624,"Автоввод логина при сбое":625,"Кнопки развития":626,"Эта деревня уже есть в фарм листе":627,"Полностью удалить из фарм листа":628,"Деревня занесена в фарм лист":629,"Страница jQBot T4":630,"Закрыть jQBot T4":631,"Сбросить параметры приложения":632,"Остановить таймер выполнения событий":633,"Запустить таймер выполнения событий":634,"Просмотр переменные GM":635,"Удалить переменные GM":636,"Просмотр Cookie пошаговых событий":637,"Удаление Cookie пошаговых событий":638,"Посмотреть переменные приложения":639,"Проблемы с загрузкой миникарты, отключите конфликтующие программы":640,"Поиск":641,"Параметры поиска":642,"Радиус":643,"Поиск завершен":644,"Оазисы":645,"Аукцион":646,"Деревни":647,"Запустите Denver 3":648,"Координаты":649,"Обновить":650,"Добавить деревню в фарм лист":651,"Останавливать атаки при потерях выше":652,"Изменение сохранено":653,"Логин":654,"Пароль":655,"Настройки автоввода логина при сбое":656,"Легионер":1001,"Преторианец":1002,"Империанец":1003,"Конный разведчик":1004,"Конница императора":1005,"Конница Цезаря":1006,"Таран":1007,"Огненная катапульта":1008,"Сенатор":1009,"Поселенец":1010,"Герой":1011,"Дубинщик":1012,"Копьеносец":1013,"Топорщик":1014,"Скаут":1015,"Паладин":1016,"Тевтонская конница":1017,"Стенобитное орудие":1018,"Катапульта":1019,"Вождь":1020,"Поселенец":1021,"Герой":1022,"Фаланга":1023,"Мечник":1024,"Следопыт":1025,"Тевтатский гром":1026,"Друид-всадник":1027,"Эдуйская конница":1028,"Таран":1029,"Требушет":1030,"Предводитель":1031,"Поселенец":1032,"Герой":1033,};
var lang_ae={1:"حول",2:"قائمة المزرعة",3:"الصيدلية السطر",4:"إعدادات التطبيق",5:"إن قائمة الانتظار بناء القوات",6:"إن القوات الدراسة قائمة الانتظار",7:"إن خط تشييد المباني الجديدة",8:"إن التحسينات سطر من المباني",9:"إن خط الهدم",10:"المجموع الكلي لأوامر",11:"إن خط التحسينات القوات",12:"التخلص من القوات",13:"إن الكمبيوتر الدفتري",14:"خيارات",15:"إن مركز القرية",16:"تنفيذ العطل",17:"طرق التجارة",18:"الموارد بيع وشراء",19:"إن اللعبة في مزاد",20:"جميع القرى الموارد",21:"جيش من جميع القرى",22:"نقل القوات من جميع القرى",23:"سجل",24:"قائمة المزرعة",25:"إن خط الصيدلة",26:"إن قائمة الانتظار يأمر القوات",27:"إن القوات الدراسة قائمة الانتظار",28:"إن خط التحسينات القوات",29:"المجموع الكلي لأوامر",30:"التخلص من القوات",31:"امواج",32:"قرى",33:"جميع القرى الموارد",34:"جيش من جميع القرى",35:"نقل القوات من جميع القرى",36:"إن بناء خط للمباني الجديدة",37:"إن التحسينات سطر من المباني",38:"إن هدم قائمة الانتظار",39:"تحليل",40:"تحليل التحالف هجمات",41:"تحليل الإحصاءات من الهجمات",42:"البطل",43:"ترسل تلقائيا بطلا على السعي",44:"تلقائي ضخ البطل في الواحات",45:"الثقافة",46:"تلقائي الاحتفالات قابضة",47:"التجارة والموارد",48:"لصناعة السيارات في تحقيق التوازن مع مساعدة من الموارد البطل",49:"لصناعة السيارات في تحقيق التوازن بين الموارد في القرى بمساعدة التجار",50:"طرق التجارة",51:"شراء وبيع الموارد",52:"مزاد",53:"إن اللعبة في مزاد",54:"شراء الأشياء الصحيحة",55:"الخريطة",56:"العثور على 15 و 9",57:"البحث عن الضعفاء والعزل",58:"خريطة طرق التجارة",59:"إن خريطة المقالي",60:"خريطة للتحالف",61:"خريطة الأعداء",62:"التنمية",63:"التنمية تلقائي",64:"أسئلة",65:"التنمية التلقائية للقرى جديدة",66:"الجنرال",67:"كراس",68:"حول",69:"إعدادات التطبيق",70:"سجل التطبيق",71:"روابط مفيدة",72:"وسط القرية",73:"الإحصاء",74:"إن عدد القوات",75:"إن مستوى تنمية الموارد",76:"الاحصائيات أون لاين",77:"التحكم",78:"ان الجدول الزمني على الانترنت",79:"ان الجدول الزمني لنشاط",80:"إعداد الرسائل القصيرة المرسلة",81:"التحكم عن طريق ICQ",82:"إرسال المعلومات إلى ملقم تنسيق التحالف",83:"تسجيل الدخول إلى ملقم تنسيق التحالف",84:"الجيش",85:"إعادة",86:"واضح",87:"حفظ",88:"موافق",89:"دمروا في وقت لاحق",90:"إعدادات التطبيق",91:"اللغة",92:"للحصول على أية أسئلة ، من فضلك",93:"الاسم",94:"حدد بسعر أقل",95:"الشراء بسعر أقل",96:"لم يتم تنفيذ * المشتريات، ولن على الأرجح :)",97:"مرهم",98:"انتقل",99:"كيج",100:"تشغيل jQBot T4",101:"طلب في وقت لاحق",102:"بناء لاحقا",103:"التحقيق في وقت لاحق",104:"الطريق التجاري الجديد",105:"لإنشاء الطريق نحو",106:"تنسق المدخلات",107:"موافق",108:"إلغاء",109:"الاسم",110:"ارتباط",111:"فتح في علامة التبويب الحالية",112:"فتح في علامة تبويب جديدة",113:"إيقاف",114:"أرسل الأخير في القائمة",115:"+ الحالية",116:"إعادة تعيين جميع الهجمات حتى الوقت الحالي",117:"مسح فارما الصف",118:"القيام في وقت لاحق",119:"دمروا في وقت لاحق",120:"روابط جديدة",121:"نوع",122:"تعزيز",123:"الهجوم المعتاد",124:"ان الغارة",125:"التردد",126:"النزوح العرضي",127:"إن النوع من الهجوم",128:"هجوم",129:"2 هجوم",130:"3 هجمات",131:"5 هجمات",132:"هجمات 10",133:"15 هجوما",134:"20 هجوما",135:"25 هجمات",136:"30 هجوما",137:"40 هجوما",138:"50 هجوما",139:"75 هجمات",140:"100 اعتداء",141:"القرية",142:"تايم",143:"إن الجيش",144:"المقامر",145:"شجرة",146:"كلاي",147:"الحديدي",148:"حبوب",149:"المرسل",150:"استقبال",151:"الموارد",152:"فترة",153:"أرسل إلى",154:"لا",155:"نوع النظام",156:"البناء",157:"المستوى",158:"الشعب",159:"إن الفترة من الأحداث الموقت",160:"إن الفترة من الماسحة الضوئية",161:"إن إجمالي جميع",162:"طلب الجيش، إذا كان هناك مبنى",163:"بناء على ما هو مفقود الموارد",164:"بناء كل ما في ترتيب الأولويات",165:"فارما الشعاع",166:"يأخذ ثوان X",167:"سحب القوات",400:"المنشرة",401:"حفرة الطين",402:"منجم الحديد",403:"المزرعة",404:"المنشرة",405:"مصنع الطوب",406:"يعمل الحديد",407:"مطحنة الدقيق",408:"مخبز",409:"المخزن",410:"الحظيرة",411:"الحداد",412:"قهوة درع",413:"أرينا",414:"المبنى الرئيسي",415:"نقطة التجمع",416:"السوق",417:"السفارة",418:"ثكنة",419:"مستقرة",420:"ورشة عمل",421:"الاكاديمية",422:"السري",423:"تاون هول",424:"الإقامة",425:"القصر",426:"الخزانة",427:"غرفة التجارة",428:"ثكنة العظمى",429:"مستقر العظيم",430:"جدران المدينة",431:"الأرض الجدار",432:"الجدار",433:"طوب",434:"وبيرة",435:"الصياد",436:"الحانة",437:"من Google العظمى",438:"الشونة الكبير",439:"ووندر في العالم",460:"طلب من القوات",461:"دراسة للقوات",462:"بناء",463:"تحسين",464:"تنفيذ العطل",501:"التحكم",502:"خيارات",503:"تعليمات",504:"ان الغارة",505:"تعزيز",506:"الهجوم المعتاد",507:"إن الرومان",508:"إن الألمان",509:"غالا",600:"حفظ البيانات بنجاح",601:"وقد أصبحت مهمة مالك",602:"كل إعادة تعيين إعدادات التطبيق",603:"نصف قطرها الجديدة المثبتة",604:"ارتباط جديد",605:"أضيفت طريقا جديدا",606:"خطأ",607:"إضافة البيانات إلى قائمة الانتظار",608:"هذه الدراسة هي بالفعل في قائمة الانتظار",609:"هذا المبنى هو بالفعل يقف في خط لهدم",610:"تحسين وهكذا يحتوي على أعلى مستوى",611:"في خلية معين هو بناء شيء ما",612:"هذا المبنى قيد الإنشاء في هذه القرية",613:"إن بناء وهكذا سيكون على أعلى مستوى",614:"الاتصال",615:"كل صوغه فارما",616:"لتدمير أي شيء",617:"صناعة السيارات في مسح جميع القرى",618:"إرسال قوات",619:"إن تدمير المباني",620:"إن تشييد المباني",621:"إرسال المتعاملين",622:"مستويات المباني",623:"وصلات خارجية",624:"روابط سريعة",625:"الدخول التلقائي من فشل تسجيل الدخول",626:"أزرار التنمية",627:"هذه القرية بالفعل في قائمة الأدوية",628:"إزالة تماما من ورقة المزارع",629:"يتم سرد قرية في لائحة الأدوية",630:"صفحة jQBot T4",631:"إغلاق jQBot T4",632:"طلب إعادة تعيين",633:"إيقاف تشغيل الأحداث الموقت",634:"تشغيل الأحداث الموقت تشغيل",635:"المتغيرات الشخصية جنرال موتورز",636:"إزالة المتغيرات جنرال موتورز",637:"عرض كوكي في خطوة خطوة",638:"إزالة يستند بدوره إلى كوكي",639:"عرض متغيرات التطبيق",640:"مشاكل مع تحميل مصغره ، إيقاف البرنامج المتعارضة",641:"بحث",642:"إعدادات البحث",643:"الشعاع",644:"بحث كامل",645:"واحة",646:"مزاد",647:"قرى",648:"تشغيل دنفر 3",649:"إحداثيات",650:"تحديث",651:"إضافة في قرية مزرعة ليف",652:"أوقفوا الهجمات مع خسائر أعلاه",653:"حفظ التغييرات",654:"الدخول",655:"كلمة السر",656:"تعيين الإدخال التلقائي للفشل تسجيل الدخول",700:"[3] - إرسال قوات",701:"[3] + ارسال قوات",702:"[6] - تجار إرسال",703:"[6] + تجار إرسال",704:"[1] - استخراج الجيش",705:"[1] + تحدي الجيش",706:"[4] - وهدم المبنى",707:"[4] + هدم المبنى",708:"[2] - مجموع جميع",709:"[2] + مجموع جميع",710:"[5] - المجموع الكلي ل(بناء)",711:"[5] + مجموع جميع (بناء)",1001:"جندي أول",1002:"حراس الأمبراطور",1003:"جندي مهاجم",1004:"فرقة تجسس",1005:"سلاح الفرسان",1006:"فرسان قيصر",1007:"كبش",1008:"المقلاع الناري",1009:"حكيم",1010:"مستوطن",1011:"بطل",1012:"مقاتل بهراوة",1013:"مقاتل برمح",1014:"مقاتل بفأس",1015:"الكشاف",1016:"مقاتل القيصر",1017:"فرسان الجرمان",1018:"محطمة الابواب",1019:"المقلاع",1020:"الزعيم",1021:"مستوطن",1022:"بطل",1023:"الكتيبه",1024:"مبارز",1025:"المستكشف",1026:"رعد الجرمان",1027:"فرسان السلت",1028:"فرسان الهيدوانر",1029:"محطمة الابواب الخشبية",1030:"المقلاع الحربي",1031:"رئيس",1032:"مستوطن",1033:"بطل"};
var lang_bg={1:"За",2:"Ферма List",3:"Линията аптека",4:"Прилагане на настройките",5:"Опашката е сграда войски",6:"Опашката войски проучване",7:"Линията на изграждане на нови сгради",8:"Линията подобрения на сгради",9:"Опашката разрушаване",10:"Общият брой на всички поръчки",11:"Линията подобрения войски",12:"Отстраняване на войски",13:"The Notebook",14:"Полезни връзки",15:"В центъра на селото",16:"Изпълнение на празниците",17:"Размени",18:"покупко-продажба РЕСУРСИ",19:"Играта на търг",20:"всички села РЕСУРСИ",21:"Армията на всички села",22:"Движенията на войските на всички села",23:"Вход",24:"Ферма List",25:"Линията аптека",26:"Опашката поръчка войски",27:"Опашката войски проучване",28:"Линията подобрения войски",29:"Общият брой на всички поръчки",30:"Отстраняване на войски",31:"вълни",32:"Села",33:"всички села РЕСУРСИ",34:"Армията на всички села",35:"Движенията на войските на всички села",36:"Линията строителство на нови сгради",37:"Линията подобрения на сгради",38:"Опашката разрушаване",39:"Анализ",40:"Анализ на атаките съюз",41:"Анализ доклад",42:"Hero",43:"Автоматично изпрати герой на търсенето",44:"Автоматично изпомпване на герой в оазиси",45:"Култура",46:"Автоматично провеждане празници",47:"Търговия и РЕСУРСИ",48:"авто-балансиране с помощта на героя РЕСУРСИ",49:"авто-балансиране РЕСУРСИ в селата с помощта на търговци",50:"Размени",51:"Купуването и продаването РЕСУРСИ",52:"търг",53:"Играта е на търг",54:"Купуването на правилните неща",55:"Карта",56:"Намирането на 15 и 9",57:"Намерете най-слабите и беззащитни",58:"Карта на търговските пътища",59:"Картата тигани",60:"Карта на алианса",61:"Карта на врагове",62:"Развитие",63:"Автоматично развитие",64:"търсения",65:"Автоматично създаване на нови селища",66:"Общи",67:"лаптоп",68:"За",69:"Прилагане на настройките",70:"Приложението Дневник",71:"Полезни връзки",72:"Централен село",73:"Статистика",74:"Броят на войски",75:"Нивото на ресурсите за развитие",76:"Статистика Онлайн",77:"Контрол",78:"Графикът онлайн",79:"Графикът на дейност",80:"Създаване на изпращане на SMS",81:"Контрол чрез ICQ",82:"Изпращане на информация към сървъра координиране на съюз",83:"Влезте в сървъра координиране на съюз",84:"армия",85:"Reset",86:"Изчисти",87:"Запазване",88:"OK",89:"Разрушете по-късно",90:"Прилагане на настройките",91:"Език",92:"За всякакви въпроси, моля",93:"Име",94:"Избор на цена, по-долу",95:"Закупуване на цена, по-долу",96:"* Закупуване не се прилага и ще най-вероятно не:)",97:"Маз",98:"преместване",99:"Клетка",100:"Run jQBot T4",101:"Ред-късно",102:"Изграждане на по-късно",103:"За да се изследва по-късно",104:"Нови търговски път",105:"За да създадете маршрут до",106:"въвеждане на координати",107:"OK",108:"Отказ",109:"Име",110:"връзка",111:"Отвори в текущия раздел",112:"Отваряне в нов раздел",113:"Стоп",114:"Изпращане на последния в списъка",115:"+ сегашната",116:"Възстановяване на всички атаки, докато текущото време",117:"Clear Queue Pharma",118:"Извършване по-късно",119:"Разрушете по-късно",120:"Нови връзки",121:"Тип",122:"Укрепване",123:"Обичайната Атака",124:"The Raid",125:"Frequency",126:"случайно разместване",127:"Видът на атака",128:"атака",129:"2 Атака",130:"3 атаки",131:"5 атаки",132:"10 атаки",133:"15 атаки",134:"20 атаки",135:"25 атаки",136:"30 атаки",137:"40 атаки",138:"50 атаки",139:"75 атаки",140:"100 Атака",141:"The Village",142:"Time",143:"Армията",144:"Комарджията",145:"The Tree",146:"Клей",147:"желязо",148:"зърно",149:"Подател",150:"приемник",151:"ресурси",152:"Период",153:"Изпрати",154:"Не",155:"Ред тип",156:"Строителство",157:"Level",158:"Хората",159:"Срокът на таймер събития",160:"Срокът на скенера",161:"Общият брой на всички",162:"Ред на армията, ако има една сграда",163:"Въз основа на това, което липсва РЕСУРСИ",164:"Изграждане на всички по ред на приоритет",165:"Радиус Pharma",166:"отнеме за секунди X",167:"отклоняването на войски",400:"Дъскорезница",401:"Клей Pit",402:"Iron Mine",403:"Фермата",404:"Дъскорезница",405:"лагера",406:"Iron Works",407:"мелница",408:"Производство на хлебни",409:"Склад",410:"The Barn",411:"Ковачница",412:"Forge Armor",413:"Арена",414:"Главна сграда",415:"Сборен пункт",416:"Пазар",417:"Посолството",418:"В казарма",419:"стабилна",420:"Работилница",421:"Академия",422:"Тайна",423:"Town Hall",424:"Residence",425:"Двореца",426:"съкровище",427:"Търговско",428:"Голяма казарма",429:"Велики стабилна",430:"градските стени",431:"Земята Wall",432:"Ограда",433:"каменоделец",434:"The пивоварна",435:"Трапер",436:"Механа",437:"Голямата галерия",438:"Big Barn",439:"Чудо на света",460:"Ред на войските",461:"Изследване на войски",462:"Билдинг",463:"Подобряване",464:"Изпълнение на празниците",501:"Контрол",502:"Options",503:"Помощ",504:"Акцията",505:"Укрепване",506:"Обичайната Атака",507:"Римляните",508:"Германците",509:"Гала",600:"данните, записани успешно",601:"Задачата е на собственика",602:"Всички настройките на приложението рестартиране",603:"Installed нови радиус",604:"Нова връзка",605:"Добавено е ново маршрут",606:"Грешка",607:"Данните добавят към опашката",608:"Такова изследване вече е в опашката",609:"Тази сграда е вече на опашката за разрушаване",610:"Подобряване и така е най-високо ниво",611:"в дадена клетка е изградена нещо",612:"Тази сграда е в процес на изграждане в това село",613:"Сградата и така ще имате най-високо ниво",614:"Комуникация",615:"пресъздава всички фарма",616:"За да унищожи нищо",617:"Auto-сканиране на всички села",618:"Изпратете войски",619:"Разрушаването на сгради",620:"Строителството на сгради",621:"Изпращане на търговци",622:"Нива на сгради",623:"Външни връзки",624:"Бързи връзки",625:"Автоматично влизане на вход провал",626:"Бутони развитие",627:"Това селище е вече във фармацевтичния списък",628:"Извадете напълно от фермата лист",629:"Селото е в списъка на фармацевтични списък",630:"Page jQBot T4",631:"Close jQBot T4",632:"Възстановяване на приложение",633:"Спиране на събития таймер Run",634:"Run събития таймер Run",635:"Преглед на променливи GM",636:"Премахване на променливите GM",637:"Виж Cookie е стъпка по стъпка",638:"Отстраняване на Cookie е походова",639:"Виж приложение променливи",640:"Проблеми с зареждането на миникартата, изключете противоречиви програма",641:"Търсене",642:"Настройки за търсене",643:"Радиус",644:"Търсенето приключи",645:"Оазис",646:"търг",647:"Села",648:"Run Денвър 3",649:"Координати",650:"Update",651:"Добави във фермата село Leaf",652:"Спрете атаки със загуби над",653:"Промени спасен",654:"Login",655:"парола",656:"Създаване на автоматичен вход на вход провал",700:"[3]-изпрати войски",701:"[3] + изпращането на войски",702:"[6] Изпращане на търговци",703:"[6] + Изпращане на търговци",704:"[1] извличане на армията",705:"[1] + Challenge армия",706:"[4], разрушаване на сграда",707:"[4] + разрушаване на сградата",708:"[2] Общият брой на всички",709:"[2] + Общо за всички",710:"[5] Общата стойност на всички (сграда)",711:"[5] + Общо за всички (сграда)",1001:"Легионерът",1002:"преторианска",1003:"Империан",1004:"Конна скаут",1005:"The кавалерия на императора",1006:"The конница на Цезар",1007:"Таран",1008:"Пожарна Катапулт",1009:"Сенатор",1010:"Settler",1011:"Hero",1012:"Боец с боздуган",1013:"Копиеносец",1014:"Axefighter",1015:"Скаут",1016:"Паладин",1017:"тевтонските кавалерия",1018:"таран",1019:"Катапулт",1020:"Главният",1021:"Settler",1022:"Hero",1023:"Фаланга",1024:"Мечоносец",1025:"Pathfinder",1026:"Theutates Thunder",1027:"друид конник",1028:"хедуан",1029:"Таран",1030:"Trebuchet",1031:"Лидер",1032:"Settler",1033:"Hero"};
var lang_cn={1:"關於",2:"農場名單",3:"行藥房",4:"應用程序設置",5:"隊列是建設部隊",6:"部隊的隊列研究",7:"該生產線的建設新建築",8:"該生產線的改進建築",9:"隊列拆遷",10:"總的所有訂單",11:"該生產線的改進部隊",12:"出售的軍隊",13:"說筆記本",14:"友情鏈接",15:"中心村",16:"實施的假期",17:"貿易之路",18:"銷售和購買資源",19:"這場比賽是在拍賣會",20:"所有的村莊資源",21:"陸軍所有的村莊",22:"變動部隊所有的村莊",23:"日誌",24:"農場名單",25:"行藥房",26:"部隊的隊列排序",27:"部隊的隊列研究",28:"該生產線的改進部隊",29:"總的所有訂單",30:"出售的軍隊",31:"波",32:"城中村",33:"所有的村莊資源",34:"陸軍所有的村莊",35:"變動部隊所有的村莊",36:"該生產線建設的新建築",37:"該生產線的改進建築",38:"隊列拆遷",39:"分析",40:"分析攻擊聯盟",41:"分析統計襲擊",42:"英雄",43:"自動發送一個英雄的追求",44:"自動抽中的主人公綠洲",45:"文化",46:"自動舉行慶祝活動",47:"貿易和資源",48:"自動平衡，借助資源的英雄",49:"自動平衡資源的村莊與幫助商人",50:"貿易之路",51:"買和賣資源",52:"拍賣",53:"這場比賽是在拍賣會",54:"買正確的事",55:"地圖",56:"尋找 15和9",57:"查找薄弱和無助",58:"地圖的貿易路線",59:"地圖鍋",60:"地圖的聯盟",61:"地圖的敵人",62:"發展",63:"自動發展",64:"任務",65:"自動發展的新農村",66:"大將軍",67:"筆記本",68:"關於",69:"應用程序設置",70:"日誌應用",71:"友情鏈接",72:"中央村",73:"統計",74:"部隊的數目",75:"在發展水平資源",76:"統計在線",77:"控制",78:"網上的時間表",79:"日程安排的活動",80:"設置發送短信",81:"控制通過 ICQ",82:"發送信息到服務器協調聯盟",83:"登錄到服務器協調聯盟",84:"軍",85:"復位",86:"清除",87:"保存",88:"好",89:"消滅後",90:"應用程序設置",91:"語言",92:"對於任何問題，請",93:"名",94:"選擇在價格低於",95:"採購的價格低於",96:"*採購不落實，將極有可能不會：）",97:"膏",98:"滾動",99:"籠子",100:"運行 jQBot T4",101:"訂單之後",102:"建立後",103:"為了調查後",104:"新的貿易通道",105:"要創建一個路線",106:"輸入坐標",107:"好",108:"取消",109:"名稱",110:"鏈接",111:"在當前標籤打開",112:"在新標籤中打開",113:"停止",114:"發送最後的名單",115:"+當前",116:"復位所有的攻擊，直到當前的時間",117:"清除隊列醫藥",118:"開展後",119:"消滅後",120:"新鏈接",121:"類型",122:"加固",123:"通常攻擊",124:"說空襲",125:"頻率",126:"意外情況",127:"類型的攻擊",128:"攻擊",129:"2攻擊",130:"3攻擊",131:"5次攻擊",132:"10攻擊",133:"15攻擊",134:"20攻擊",135:"25攻擊",136:"30攻擊",137:"40攻擊",138:"50攻擊",139:"75攻擊",140:"100襲擊",141:"村",142:"時代",143:"軍隊",144:"賭徒",145:"樹",146:"泥",147:"鐵",148:"糧",149:"發件人",150:"接收器",151:"資源",152:"期間",153:"發送到",154:"沒有。",155:"訂單式",156:"建築",157:"等級",158:"人民",159:"這一時期的計時器事件",160:"這一時期的掃描儀",161:"總的所有",162:"訂單軍隊是否有建設",163:"建設上缺什麼資源",164:"建設都是為了優先",165:"半徑醫藥",166:"拿走X秒",167:"部隊的轉移",400:"锯木",401:"粘土坑",402:"铁矿",403:"农场",404:"锯木",405:"砖场",406:"铁工程",407:"面粉厂",408:"面包",409:"仓库",410:"说谷仓",411:"铁匠",412:"锻造护甲",413:"竞技场",414:"主楼",415:"集结点",416:"市场",417:"使馆",418:"说军营",419:"稳定",420:"生产车间",421:"学院",422:"秘密",423:"镇馆",424:"公馆",425:"故宫",426:"财政部",427:"商会",428:"大兵营",429:"大稳定",430:"城墙",431:"地球墙",432:"篱笆",433:"石匠",434:"说啤酒",435:"捕手",436:"小酒馆",437:"大仓库",438:"大粮仓",439:"奇迹世界",460:"訂單部隊",461:"一項研究部隊",462:"大廈",463:"改善",464:"實施的假期",501:"控制",502:"選項",503:"幫助",504:"說空襲",505:"加固",506:"通常攻擊",507:"入鄉隨俗",508:"德國人",509:"五倍子",600:"數據保存成功",601:"我們的任務是做主人",602:"所有的應用程序設置復位",603:"安裝了新的半徑",604:"一個新的鏈接",605:"增加了一​​個新的路線",606:"錯誤",607:"這些數據添加到隊列",608:"這樣的研究已經在隊列中",609:"這個建築已經站在線拆遷",610:"改善等方面具有最高水平",611:"在一個給定的細胞，是構建東西",612:"這是正在施工建設這個村",613:"建築等都將具有最高水平",614:"交流",615:"重建所有的醫藥",616:"要摧毀什麼",617:"自動掃描所有的村莊",618:"出兵",619:"建築物的破壞",620:"建造建築物",621:"發送經銷商",622:"水平的大廈",623:"外部鏈接",624:"快速鏈接",625:"自動輸入的登錄失敗",626:"按鈕發展",627:"這個村莊已經在製藥清單",628:"刪除完全從農場表",629:"村里列在藥品清單",630:"第jQBot T4",631:"關閉 jQBot T4",632:"復位應用",633:"停止運行計時器事件",634:"運行運行計時器事件",635:"查看變量 GM",636:"刪除變量 GM",637:"查看Cookie的一步一步",638:"去除Cookie的回合制",639:"查看應用程序變量",640:"問題與小地圖加載，關閉衝突的程序",641:"搜索",642:"搜索設置",643:"半徑",644:"搜索完成",645:"綠洲",646:"拍賣",647:"城中村",648:"運行丹佛3",649:"坐標",650:"更新",651:"添加在農場村葉",652:"停止攻擊與上述損失",653:"保存更改",654:"登錄",655:"密碼",656:"設置自動輸入登錄失敗",700:"[3] -出兵",701:"[3] +出兵",702:"[6] -發送經銷商",703:"[6] +發送經銷商",704:"[1] -提取的軍隊",705:"[1] +挑戰軍",706:"[4] -拆除建築",707:"[4] +拆除的建築",708:"[2] -總的所有",709:"[2] +總的所有",710:"[5] -總所有（建設）",711:"[5] +總所有（建設）",1001:"古罗马步兵",1002:"禁卫兵",1003:"帝国兵",1004:"使节骑士",1005:"帝国骑士",1006:"将军骑士",1007:"冲撞车",1008:"火焰投石器",1009:"参议员",1010:"拓荒者",1011:"英雄",1012:"棍棒兵",1013:"矛兵",1014:"斧头兵",1015:"侦察兵",1016:"圣骑士",1017:"日耳曼骑兵",1018:"冲撞车",1019:"投石器",1020:"执政官",1021:"拓荒者",1022:"英雄",1023:"方阵兵",1024:"剑士",1025:"探路者",1026:"雷法师",1027:"德鲁伊骑兵",1028:"海顿圣骑士",1029:"冲撞车",1030:"投石器",1031:"首领",1032:"拓荒者",1033:"英雄"};
var lang_com={1:"About",2:"Farm List",3:"The line pharmacy",4:"Application Settings",5:"The queue is building troops",6:"The queue study troops",7:"The line of construction of new buildings",8:"The line improvements of buildings",9:"The queue demolition",10:"The total of all orders",11:"The line improvements troops",12:"Disposal of troops",13:"Notebook",14:"Useful Links",15:"The village center",16:"Implementation of the holidays",17:"Trade Routes",18:"The sale and purchase resources",19:"The game is on auction",20:"all the villages resources",21:"Army of all the villages",22:"Movements of troops of all the villages",23:"Log",24:"Farm List",25:"The line pharmacy",26:"The queue ordering troops",27:"The queue study troops",28:"The line improvements troops",29:"The total of all orders",30:"Disposal of troops",31:"Waves",32:"Villages",33:"all the villages resources",34:"Army of all the villages",35:"Movements of troops of all the villages",36:"The line construction of new buildings",37:"The line improvements of buildings",38:"The queue demolition",39:"Analysis",40:"Analysis of attacks alliance",41:"Analysis of the statistics of attacks",42:"Hero",43:"Automatically send a hero on the quest",44:"Automatic pumping of the hero in the oases",45:"Culture",46:"Automatic holding celebrations",47:"Trade and resources",48:"auto-balancing with the help of the hero resources",49:"auto-balancing resources in the villages with the help of merchants",50:"Trade Routes",51:"Buying and selling resources",52:"Auction",53:"The game is on auction",54:"Buying the right things",55:"Map",56:"Finding 15 and 9",57:"Find the weak and defenseless",58:"Map of trade routes",59:"The map pans",60:"Map of the alliance",61:"Map of enemies",62:"Development",63:"Automatic Development",64:"quests",65:"Automatic development of new villages",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Log Application",71:"Useful Links",72:"Central Village",73:"Statistics",74:"The number of troops",75:"The level of development resources",76:"Statistics Online",77:"Control",78:"The schedule online",79:"The schedule of activity",80:"Setting sending sms",81:"Control via ICQ",82:"Send the information to the server coordinating the alliance",83:"Log on to the server coordinating the alliance",84:"Army",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy later",90:"Application Settings",91:"Language",92:"For any questions, please",93:"Name",94:"Select at a price below",95:"Purchasing at a price below",96:"* Purchasing is not implemented and will most likely not:)",97:"Ointment",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Order Later",102:"Build later",103:"To investigate later",104:"New trade route",105:"To create a route to",106:"input coordinates",107:"OK",108:"Cancel",109:"Name",110:"Link",111:"Open in current tab",112:"Open in new tab",113:"Stop",114:"Send the last in the list",115:"+ current",116:"Reset all attacks until the current time",117:"Clear Queue Pharma",118:"Carry out later",119:"Destroy later",120:"New Links",121:"Type",122:"Reinforcement",123:"The usual attack",124:"The Raid",125:"Frequency",126:"Accidental displacement",127:"The type of attack",128:"an attack",129:"2 Attack",130:"3 attacks",131:"5 attacks",132:"10 attacks",133:"15 attacks",134:"20 attacks",135:"25 attacks",136:"30 attacks",137:"40 attacks",138:"50 attacks",139:"75 attacks",140:"100 attack",141:"The Village",142:"Time",143:"The army",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Sender",150:"Receiver",151:"resources",152:"Period",153:"Send to",154:"No",155:"Order type",156:"Construction",157:"Level",158:"People",159:"The period of timer events",160:"The period of the scanner",161:"The total of all",162:"Order the army if there is a building",163:"Building on what is missing resources",164:"Building all in order of priority",165:"Radius Pharma",166:"take away for X seconds",167:"The diversion of troops",400:"Sawmill",401:"Clay Pit",402:"Iron Mine",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"Embassy",418:"Barracks",419:"Stable",420:"Workshop",421:"Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Treasury",427:"Chamber of Commerce",428:"Great Barracks",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stonemason",434:"Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Order the troops",461:"A study of troops",462:"Building",463:"Improvement",464:"Implementation of the holidays",651:"Add in the farm village of Leaf",501:"Control",502:"Options",503:"Help",504:"Raid",505:"Reinforcement",506:"The usual attack",507:"Romans",508:"ermans",509:"Galla",600:"Data saved successfully",601:"The task is made the owner",602:"All the application settings reset",603:"Installed new radius",604:"A new link",605:"Added a new route",606:"Error",607:"The data added to the queue",608:"Such a study is already in the queue",609:"This building is already standing in line for demolition",610:"Improvement and so has the highest level",611:"In a given cell is build something",612:"This building is under construction in this village",613:"The building and so will have the highest level",614:"Communication",615:"recreated all pharma",616:"To destroy is nothing",617:"Auto-scanning of all the villages",618:"Send troops",619:"The destruction of buildings",620:"The construction of buildings",621:"Sending dealers",622:"Levels of buildings",623:"External links",624:"Quick Links",625:"Automatic entry of login failure",626:"Buttons Development",627:"This village is already in the pharmaceutical list",628:"Remove completely from the farm sheet ",629:"The village is listed in the pharmaceutical list",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stop the run timer events",634:"Run run timer events",635:"Viewing variables GM",636:"Remove the variables GM",637:"View Cookie's step by step",638:"Removal of Cookie's turn-based",639:"View application variables",640:"Problems with loading the minimap, turn off the conflicting program",641:"Search",642:"Search Settings",643:"Radius",644:"Search complete",645:"Oasis",646:"Auction",647:"Villages",648:"Run Denver 3",649:"Coordinates",650:"Update",651:"Add in the farm village of Leaf",652:"Stop attacks with losses above",653:"Changes saved",654:"Login",655:"password",656:"Options AutoInput login failure",700:"[3] - Send troops",701:"[3] + Sending troops",702:"[6] - Sending dealers",703:"[6] + Sending dealers",704:"[1] - The extraction of the army",705:"[1] + Challenge Army",706:"[4] - demolish the building",707:"[4] + demolish the building",708:"[2] - The total of all",709:"[2] + Total of all",710:"[5] - The total of all (building)",711:"[5] + Total of all (building)",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"Equites Legati",1005:"Equites Imperatoris",1006:"Equites Caesaris",1007:"Battering Ram",1008:"Fire Catapult",1009:"Senator",1010:"Settler",1011:"Hero",1012:"Clubswinger",1013:"Spearman",1014:"Axeman",1015:"Scout",1016:"Paladin",1017:"Teutonic Knight",1018:"Ram",1019:"Catapult",1020:"Chief",1021:"Settler",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druidrider",1028:"Haeduan",1029:"Ram",1030:"Trebuchet",1031:"Chieftain",1032:"Settler",1033:"Hero"};
var lang_cz={1:"O",2:"Farma List",3:"linka lékárna",4:"Nastavení aplikace",5:"Fronta je stavební jednotky",6:"vojáci fronty studie",7:"linie výstavby nových budov",8:"Řada vylepšení budov",9:"fronta demolice",10:"Součet všech zakázek",11:"linka vylepšení vojáků",12:"Likvidace vojáků",13:"Notebook",14:"Užitečné odkazy",15:"centrum obce",16:"Implementace prázdnin",17:"obchodní cesty",18:"při prodeji a nákupu zdrojů",19:"Hra je v aukci",20:"Všechny vesnice zdrojů",21:"Armáda všech vesnic",22:"Pohyby vojsk ze všech vesnic",23:"Log",24:"Farma List",25:"linka lékárna",26:"fronta objednání vojáky",27:"vojáci fronty studie",28:"linka vylepšení vojáků",29:"Součet všech zakázek",30:"Likvidace vojáků",31:"Vlny",32:"Vesnice",33:"Všechny vesnice zdrojů",34:"Armáda všech vesnic",35:"Pohyby vojsk ze všech vesnic",36:"liniové stavby nových budov",37:"Řada vylepšení budov",38:"fronta demolice",39:"Analýza",40:"Analýza útoků Aliance",41:"zpráva o výsledku rozboru",42:"Hero",43:"automaticky odeslat hrdiny na cestě",44:"Automatické čerpání hrdiny v oázách",45:"Kultura",46:"Automatické pořádání oslav",47:"Obchod a zdroje",48:"auto-vyvážení pomocí hrdiny zdrojů",49:"auto-balancing ZDROJŮ v obcích s pomocí obchodníků",50:"obchodní cesty",51:"Nákup a prodej zdrojů",52:"Aukce",53:"Hra je v aukci",54:"Nákup správné věci",55:"Mapa",56:"Nalezení 15 a 9",57:"Najděte slabé a bezbranné",58:"Mapa obchodních cest",59:"map pánve",60:"Mapa aliance",61:"Mapa nepřátel",62:"Vývoj",63:"Automatické rozvoje",64:"questy",65:"Automatické vytváření nových vesnic",66:"General",67:"notebook",68:"O",69:"Nastavení aplikace",70:"Log aplikace",71:"Užitečné odkazy",72:"Central Village",73:"Statistika",74:"Počet jednotek",75:"úrovni rozvoje zdrojů",76:"Statistics on-line",77:"Control",78:"Program online",79:"Program činnosti",80:"Nastavení odesílání SMS",81:"ovládání přes ICQ",82:"zaslat informace na server koordinační Aliance",83:"Přihlášení k serveru koordinační Aliance",84:"armáda",85:"Reset",86:"Clear",87:"Uložit",88:"OK",89:"Zničte později",90:"Nastavení aplikace",91:"Jazyk",92:"V případě jakýchkoli dotazů, prosím",93:"Jméno",94:"Select za cenu nižší než",95:"Nákup za cenu nižší než",96:"* Nákup nebyl realizován a bude s největší pravděpodobností nebude:)",97:"mast",98:"scroll",99:"klec",100:"Run jQBot T4",101:"objednávku později",102:"Build později",103:"zkoumat později",104:"Nové obchodní cesta",105:"Chcete-li vytvořit cestu k",106:"Vstup souřadnic",107:"OK",108:"Zrušit",109:"Jméno",110:"Link",111:"Otevřít v aktuální záložce",112:"Otevřít v nové záložce",113:"Stop",114:"odeslat poslední v seznamu",115:"+ aktuální",116:"Obnovit všechny útoky až do aktuálního času",117:"Clear fronty Pharma",118:"Proveďte později",119:"Zničte později",120:"Nové stránky",121:"Typ",122:"posílení",123:"Obvyklý útok",124:"Raid",125:"Frekvence",126:"náhodnému posunu",127:"typ útoku",128:"útok",129:"2 Attack",130:"3 útoky",131:"5 útoky",132:"10 útoků",133:"15 útoků",134:"20 útoků",135:"25 útoků",136:"30 útoků",137:"40 útoků",138:"50 útoků",139:"75 útoků",140:"100 útok",141:"The Village",142:"Čas",143:"Armáda",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"zrno",149:"Odesílatel",150:"Přijímač",151:"Zdroje",152:"Období",153:"Odeslat",154:"Ne.",155:"typové",156:"Stavba",157:"Level",158:"People",159:"Doba časovače",160:"Doba skeneru",161:"součet všech",162:"Order armáda Pokud je stavba",163:"V návaznosti na to, co chybí zdroje",164:"Stavební vše v pořadí",165:"Radius Pharma",166:"Vezměte pryč sekund X",167:"zneužívání vojáků",400:"Pila",401:"Clay Pit",402:"Železný důl",403:"The Farm",404:"Pila",405:"Cihelna",406:"Iron Works",407:"mlýna",408:"Pekárna",409:"skladu",410:"Stodola",411:"kovář",412:"Forge Armor",413:"Arena",414:"Hlavní budova",415:"Rally Point",416:"Trh",417:"velvyslanectví",418:"Kasárna",419:"Stable",420:"Workshop",421:"Akademie",422:"Tajné",423:"Radnice",424:"bydliště",425:"Palace",426:"státní pokladny",427:"Hospodářská komora",428:"Velké kasárny",429:"Velké stáje",430:"hradby",431:"Země Wall",432:"plot",433:"Kameník",434:"pivovaru",435:"lovce",436:"hospoda",437:"Velké skladiště",438:"velká stodola",439:"Div světa",460:"Řád vojsk",461:"Studie vojáků",462:"Building",463:"zlepšení",464:"Implementace prázdnin",501:"Control",502:"Options",503:"Help",504:"Raid",505:"posílení",506:"Obvyklý útok",507:"Římané",508:"Němci",509:"Galla",600:"Data byla úspěšně uložena",601:"Úkolem je vlastníkem",602:"Veškerá nastavení aplikace reset",603:"nainstalovali nový okruh",604:"Nové spojení",605:"dodal novou cestu",606:"Chyba",607:"Data přidání do fronty",608:"Tato studie je již ve frontě",609:"Tato budova je již ve frontě k demolici",610:"zlepšení, a tak byla na nejvyšší úrovni",611:"V dané buňce je vytvořit něco",612:"Tato budova je ve výstavbě v této obci",613:"Budova, takže bude mít nejvyšší úrovni",614:"Komunikace",615:"znovu všechny Pharma",616:"zničit nic",617:"Auto-testování všech vesnic",618:"poslat vojáky",619:"Zničení budov",620:"Výstavba budov",621:"Posílám prodejci",622:"úrovněmi budov",623:"Externí odkazy",624:"Rychlé odkazy",625:"Automatická vstupu Přihlásit selhání",626:"Tlačítka pro rozvoj",627:"Tato vesnice je již ve farmaceutickém seznamu",628:"odstranit kompletně z farmy list",629:"Obec je uveden ve farmaceutickém seznamu",630:"Page jQBot T4",631:"Zavřít jQBot T4",632:"Reset aplikace",633:"Stop události běh časovače",634:"Běh událostí, timer run",635:"Informace o proměnné GM",636:"Odstranit proměnné GM",637:"Zobrazit Cookie je krok za krokem",638:"Odstranění Cookie je otočení-umístěný",639:"Zobrazit aplikační proměnné",640:"Problémy s načtením minimapě, vypněte problematický program",641:"Hledat",642:"Search Settings",643:"Radius",644:"Hledat kompletní",645:"Oasis",646:"Aukce",647:"Vesnice",648:"Run Denver 3",649:"souřadnice",650:"Update",651:"Přidat na statku vesnici Leaf",652:"Stop útokům se ztrátami nahoře",653:"Změny byly uloženy",654:"Přihlásit se",655:"heslo",656:"Nastavení automatického vstupu login selhání",700:"[3], poslat vojáky",701:"[3] + vyslání vojsk",702:"[6] Odesílání obchodníky",703:"[6] + Odeslání obchodníky",704:"[1] těžba armády",705:"[1] + Challenge armáda",706:"[4], zbourat budovy",707:"[4] + demolici budovy",708:"[2] součet všech",709:"[2] + Celkový počet všech",710:"[5] Celkem všechny (budova)",711:"[5] + součet všech (budova)",1001:"Legionář",1002:"Praetorian",1003:"Imperián",1004:"Kůň Scout",1005:"jízda císaře",1006:"kavalérie Caesar",1007:"Taran",1008:"Požární katapult",1009:"senátor",1010:"osadník",1011:"Hero",1012:"Pálkař",1013:"Oštěpař",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germánské kavalérie",1018:"beranidlo",1019:"Katapult",1020:"The Chief",1021:"osadník",1022:"Hero",1023:"Phalanx",1024:"Šermíř",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"osadník",1033:"Hero"};
var lang_de={1:"About",2:"Farm List",3:"Die Online-Apotheke",4:"Application Settings",5:"Die Warteschlange baut Truppen",6:"Die Warteschlange Studie Truppen",7:"Die Linie der Bau von neuen Gebäuden",8:"Die Linie Verbesserungen von Gebäuden",9:"Die Warteschlange Abriss",10:"Die Summe aller Aufträge",11:"Die Linie Verbesserungen Truppen",12:"Die Entsorgung von Truppen",13:"The Notebook",14:"Nützliche Links",15:"Der Ortskern",16:"Die Umsetzung der Urlaub",17:"Trade Routes",18:"Der Verkauf und Kauf RESOURCES",19:"Das Spiel ist in der Auktion",20:"alle Dörfer RESOURCES",21:"Army of all die Dörfer",22:"Truppenbewegungen aller Dörfer",23:"Log",24:"Farm List",25:"Die Online-Apotheke",26:"Die Warteschlange Bestellung Truppen",27:"Die Warteschlange Studie Truppen",28:"Die Linie Verbesserungen Truppen",29:"Die Summe aller Aufträge",30:"Die Entsorgung von Truppen",31:"Waves",32:"Villages",33:"alle Dörfer RESOURCES",34:"Army of all die Dörfer",35:"Truppenbewegungen aller Dörfer",36:"Die Linie Neubauten",37:"Die Linie Verbesserungen von Gebäuden",38:"Die Warteschlange Abriss",39:"Analysis",40:"Analyse von Angriffen Allianz",41:"Analysis Report",42:"Hero",43:"Schicken Sie automatisch ein Held auf der Suche",44:"Automatische Pumpen des Helden in den Oasen",45:"Kultur",46:"Automatic halten Feiern",47:"Der Handel und Ressourcen",48:"auto-Balancing mit Hilfe des Helden RESOURCES",49:"auto-Balancing RESOURCES in den Dörfern mit Hilfe der Kaufleute",50:"Trade Routes",51:"Kauf und Verkauf von RESOURCES",52:"Auktion",53:"Das Spiel ist in der Auktion",54:"Der Kauf des richtigen Dinge tun",55:"Karte",56:"Finding 15 und 9",57:"Findet die Schwachen und Wehrlosen",58:"Karte der Handelswege",59:"Die Karte Pfannen",60:"Karte der Allianz",61:"Karte der Feinde",62:"Entwicklung",63:"Automatic Development",64:"Quests",65:"Automatic Entwicklung neuer Dörfer",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Log Application",71:"Nützliche Links",72:"Central Village",73:"Statistik",74:"Die Zahl der Truppen",75:"Das Niveau der Ressourcen für die Entwicklung",76:"Statistik Online",77:"Control",78:"Der Zeitplan online",79:"Der Zeitplan der Aktivität",80:"Einstellung SMS-Versand",81:"Control via ICQ",82:"Senden Sie die Informationen an den Server Koordinierung der Allianz",83:"Melden Sie sich auf dem Server koordiniert die Allianz",84:"Army",85:"Reset",86:"Clear",87:"Speichern",88:"OK",89:"Später Destroy",90:"Application Settings",91:"Sprache",92:"Für Fragen, bitte",93:"Name",94:"Wählen Sie zu einem Preis unter",95:"Der Einkauf zu einem Preis unter",96:"* Der Einkauf ist nicht implementiert und wird höchstwahrscheinlich nicht:)",97:"Salbe",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Später Order",102:"später Build",103:"Um später zu untersuchen",104:"New Handelsroute",105:"Um eine Route zu erstellen",106:"die Koordinaten",107:"OK",108:"Cancel",109:"Name",110:"Link",111:"in der aktuellen Registerkarte öffnen",112:"in neuem Tab öffnen",113:"Stop",114:"Senden Sie die letzte in der Liste",115:"+ aktuelle",116:"Reset alle Angriffe bis die aktuelle Uhrzeit",117:"Clear Queue Pharma",118:"Carry out later",119:"Später Destroy",120:"New Links",121:"Type",122:"Verstärkung",123:"Die üblichen attack",124:"The Raid",125:"Frequency",126:"Accidental Verschiebung",127:"Die Art des Angriffs",128:"Angriff",129:"2 Attack",130:"3 Angriffe",131:"5 Angriffe",132:"10 Angriffe",133:"15 Attacken",134:"20 Attacken",135:"25 Attacken",136:"30 Attacken",137:"40 Attacken",138:"50 Attacken",139:"75 Attacken",140:"100 attack",141:"The Village",142:"Time",143:"Die Armee",144:"Gambler",145:"Der Baum",146:"Clay",147:"Iron",148:"Grain",149:"Absender",150:"Receiver",151:"Ressourcen",152:"Period",153:"Senden an",154:"Nein!",155:"Order-Typ",156:"Bau",157:"Level",158:"The People",159:"Die Zeit der Timer-Ereignisse",160:"Die Zeit des Scanners",161:"Die Summe aller",162:"Auftrag der Armee, wenn es ein Gebäude",163:"Aufbauend auf was fehlt RESOURCES",164:"Building alle in der Reihenfolge ihrer Priorität",165:"Radius Pharma",166:"take away für X Sekunden",167:"Die Umleitung von Truppen",400:"Sägewerk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Sägewerk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"Die Botschaft",418:"Die Kaserne",419:"Stable",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"Der Palast",426:"Treasury",427:"The Chamber of Commerce",428:"Große Kaserne",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Steinmetz",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Auftrag der Truppe",461:"Eine Studie der Truppen",462:"Building",463:"Improvement",464:"Die Umsetzung der Urlaub",501:"Control",502:"Options",503:"Help",504:"The Raid",505:"Verstärkung",506:"Die üblichen attack",507:"Die Römer",508:"Die Deutschen",509:"Galla",600:"Data erfolgreich gespeichert",601:"Die Aufgabe ist der Eigentümer gemacht",602:"All die Anwendung Einstellungen zurücksetzen",603:"Installed neue radius",604:"Ein neuer Link",605:"Es wurde eine neue Route",606:"Error",607:"Die Daten hinzugefügt, um die Warteschlange",608:"Eine solche Studie ist bereits in der Warteschlange",609:"Dieses Gebäude ist bereits in der Schlange für den Abriss",610:"Verbesserung und so hat die höchste Stufe",611:"In einer bestimmten Zelle ist etwas aufbauen",612:"Dieses Gebäude ist im Bau in diesem Dorf",613:"Das Gebäude und so wird das höchste Niveau haben",614:"Kommunikation",615:"neu alle pharma",616:"Um zu zerstören, ist nichts",617:"Auto-Scan aller Dörfer",618:"Send Truppen",619:"Die Zerstörung von Gebäuden",620:"Der Bau von Gebäuden",621:"Sending Händler",622:"Levels von Gebäuden",623:"Externe Links",624:"Quick Links",625:"Automatische Eingabe von Login-failure",626:"Buttons Development",627:"Dieses Dorf ist bereits in der Pharma-Liste",628:"vollständig aus dem Bauernhof sheet",629:"Das Dorf ist in der Pharma-Liste aufgeführt sind",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stoppt die Ausführung Timer-Ereignisse",634:"Run Run Timer-Ereignisse",635:"Anzeigen Variablen GM",636:"Nehmen Sie die Variablen GM",637:"View Cookies ist Schritt für Schritt",638:"Entfernen von Cookies ist turn-based",639:"View Anwendung Variablen",640:"Probleme mit dem Laden der Minikarte, schalten Sie das in Konflikt stehende Programm",641:"Suchen",642:"Search Settings",643:"Radius",644:"Search complete",645:"Oasis",646:"Auktion",647:"Villages",648:"Run Denver 3",649:"Koordinaten",650:"Update",651:"in der Farm Dorf Blatt hinzufügen",652:"Stop Angriffe mit Verlusten oben",653:"Änderungen gespeichert",654:"Login",655:"password",656:"Einstellen der automatischen Eingabe eines Login-failure",700:"[3]-Truppen schicken",701:"[3] + Entsendung von Truppen",702:"[6] Senden Händler",703:"[6] + Senden Händler",704:"[1] Die Extraktion der Armee",705:"[1] + Challenge Army",706:"[4] den Abriss der Gebäude",707:"[4] + Abriss des Gebäudes",708:"[2] Die Summe aller",709:"[2] + Summe aller",710:"[5] Die Summe aller (Gebäude)",711:"[5] + Summe aller (Gebäude)",1001:"Legionär",1002:"Praetorian",1003:"Imperian",1004:"Horse scout",1005:"Die Kavallerie des Kaisers",1006:"Die Kavallerie des Kaisers",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Siedler",1011:"Hero",1012:"Keulenschwinger",1013:"Spearman",1014:"Axtkämpfer",1015:"Scout",1016:"Paladin",1017:"teutonischen Reiter",1018:"Rammbock",1019:"Catapult",1020:"The Chief",1021:"Siedler",1022:"Hero",1023:"Phalanx",1024:"Schwertkämpfer",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduaner",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Siedler",1033:"Hero"};
var lang_dk={1:"Om",2:"Farm List",3:"Linjen apotek",4:"Application Settings",5:"Køen er ved at bygge tropper",6:"Køen undersøgelsen tropper ",7:"Den linje med opførelse af nye bygninger",8:"Den linje forbedringer af bygninger",9:"Køen nedrivning",10:"Summen af ​​alle ordrer",11:"Linjen forbedringer tropper",12:"Bortskaffelse af tropper",13:"The Notebook",14:"Nyttige links",15:"Den landsbyens centrum",16:"Gennemførelse af ferien",17:"Trade Routes",18:"Den køb og salg RESSOURCER",19:"Spillet er på auktion",20:"alle de landsbyer RESSOURCER",21:"Army af alle landsbyer",22:"Flytning af tropper fra alle landsbyer",23:"Log",24:"Farm List",25:"Den linje apotek",26:"Køen bestilling tropper",27:"Den kø undersøgelsen tropper ",28:"Linjen forbedringer tropper",29:"Summen af ​​alle ordrer",30:"Bortskaffelse af tropper",31:"Waves",32:"Landsbyer",33:"alle de landsbyer RESSOURCER",34:"Army af alle landsbyer",35:"Flytning af tropper fra alle landsbyer",36:"Den linje opførelse af nye bygninger",37:"Den linje forbedringer af bygninger",38:"Køen nedrivning",39:"Analyse",40:"Analyse af angreb alliance",41:"Analyse Report",42:"Hero",43:"Send automatisk en helt på stræben",44:"Automatisk oppumpning af helten i oaserne",45:"Kultur",46:"Automatisk holde festlighederne",47:"Handel og ressourcer",48:"auto-balance ved hjælp af helten RESSOURCER",49:"auto-balancering RESSOURCER i landsbyerne ved hjælp af købmænd",50:"Trade Routes",51:"Køb og salg RESSOURCER",52:"auktion",53:"Spillet er på auktion",54:"Køb de rigtige ting",55:"Kort",56:"Find 15 og 9",57:"Find de svage og forsvarsløse",58:"Kort over handelsruter",59:"Kortet pander",60:"Kort af alliancen",61:"Kort over fjender",62:"Udvikling",63:"Automatisk udvikling",64:"quests",65:"Automatisk udvikling af nye landsbyer",66:"Generelt",67:"Notebook",68:"Om",69:"Ansøgning Indstillinger",70:"Log ansøgning",71:"Nyttige links",72:"Central Village",73:"Statistik",74:"Antallet af soldater",75:"Niveauet af udviklingsressourcer",76:"Statistik Online",77:"Control",78:"Den tidsplan online",79:"Den tidsplan for aktiviteten",80:"Indstilling sende sms",81:"Styring via ICQ",82:"Send oplysningerne til serveren koordinere alliance",83:"Log på serveren koordinere alliance",84:"Army",85:"Reset",86:"Clear",87:"Gem",88:"OK",89:"Ødelæg senere",90:"Ansøgning Indstillinger",91:"Sprog",92:"For spørgsmål, er du",93:"Navn",94:"Vælg til en pris under",95:"Indkøb til en pris under",96:"* Indkøb er ikke implementeret, og vil højst sandsynligt ikke:)",97:"Salve",98:"Scroll",99:"Cage",100:"Kør jQBot T4",101:"Bestil senere",102:"Byg senere",103:"At undersøge senere",104:"New handel ruten",105:"For at oprette en rute til",106:"input koordinater",107:"OK",108:"Cancel",109:"Navn",110:"Link",111:"Åbn i nuværende faneblad",112:"Åbn i nyt faneblad",113:"Stop",114:"Send den sidste i listen",115:"+ nuværende",116:"Nulstil alle angreb, indtil den aktuelle tid",117:"Clear Queue Pharma",118:"Der bør foretages senere",119:"Ødelæg senere",120:"Nye links",121:"Type",122:"Styrkelse",123:"Den sædvanlige angreb",124:"The Raid",125:"Frekvens",126:"rykke",127:"Den type angreb",128:"et angreb",129:"2 Attack",130:"3 angreb",131:"5 angreb",132:"10 angreb",133:"15 angreb",134:"20 angreb",135:"25 angreb",136:"30 angreb",137:"40 angreb",138:"50 angreb",139:"75 angreb",140:"100 angreb",141:"The Village",142:"Time",143:"Hæren",144:"Gambler",145:"The Tree",146:"Clay",147:"Jern",148:"Korn",149:"Sender",150:"Modtager",151:"ressourcer",152:"Periode",153:"Send til",154:"Nej.",155:"Bestil type",156:"Construction",157:"Level",158:"folket",159:"Den periode på timeren begivenheder",160:"Den periode af scanneren",161:"Summen af ​​alle",162:"Bestil en hær, hvis der er en bygning",163:"Med udgangspunkt i, hvad der mangler RESSOURCER",164:"Building alle i prioriteret rækkefølge",165:"Radius Pharma",166:"take away for X sekunder",167:"Den omdirigering af tropper",400:"Savværk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Savværk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"The Barn",411:"Smed",412:"Forge Armor ",413:"Arena",414:"Hovedbygning",415:"Rally Point",416:"Market",417:"Ambassaden",418:"Den Kaserne",419:"Stabil",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"The Chamber of Commerce",428:"Great Kaserne",429:"Stor Stald",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stenhugger",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great-lager",438:"Big Barn",439:"Wonder of the World",460:"Bestil tropper",461:"En undersøgelse af tropper",462:"Bygning",463:"forbedring",464:"Gennemførelse af ferien",501:"Control",502:"Options",503:"Hjælp",504:"The Raid",505:"Styrkelse",506:"Den sædvanlige angreb",507:"Romerne",508:"Tyskerne",509:"Galla",600:"Data gemt",601:"Opgaven er lavet ejeren",602:"Alle programindstillinger reset",603:"Installed nye radius",604:"En ny link",605:"Tilføjet en ny rute",606:"Fejl",607:"De data, der er føjet til køen",608:"En sådan undersøgelse er allerede i køen",609:"Denne bygning er allerede stod i kø for nedrivning",610:"Forbedring og så har det højeste niveau",611:"I en given celle er opbygget noget",612:"Denne bygning er under opførelse i denne landsby",613:"Bygningen, og så vil have det højeste niveau",614:"Kommunikation",615:"genskabt alle pharma",616:"At ødelægge er intet",617:"Auto-scanning af alle landsbyerne",618:"Send tropper",619:"Den ødelæggelse af bygninger",620:"Den opførelse af bygninger",621:"Sender forhandlere",622:"niveauer af bygninger",623:"Eksterne links",624:"Quick Links",625:"Automatisk indtastning af login fiasko",626:"Knapper udvikling",627:"Denne landsby er allerede i den farmaceutiske liste",628:"Fjern fuldstændigt fra gården ark ",629:"Byen er opført i den farmaceutiske liste",630:"Side jQBot T4",631:"Luk jQBot T4",632:"Reset ansøgning",633:"Stop køre timeren begivenheder",634:"Kør køre timer-begivenheder",635:"Visning af variabler GM",636:"Fjern variablerne GM",637:"Vis Cookie er trin for trin",638:"Fjernelse af Cookie tur-baserede",639:"Vis anvendelse variabler",640:"Problemer med indlæsning af minimap, slukke for modstridende programmet",641:"Søg",642:"Søg Indstillinger",643:"Radius",644:"Søg komplet",645:"Oasis",646:"auktion",647:"Landsbyer",648:"Kør Denver 3",649:"Koordinater",650:"Opdater",651:"Tilføj i gården landsbyen Leaf",652:"Stop angreb med tab over",653:"Ændringer gemt",654:"Log ind",655:"password",656:"Indstilling af den automatiske indlæsning af et login fiasko",700:"[3]-sende tropper",701:"[3] + sende tropper",702:"[6] Sende forhandlere",703:"[6] + Sende forhandlere",704:"[1] Den udvinding af hæren",705:"[1] + Challenge Army",706:"[4], rive bygningen ned",707:"[4] + rive bygningen ned",708:"[2] Summen af ​​alle",709:"[2] + Total for alle",710:"[5] Summen af ​​alle (bygning)",711:"[5] + Total for alle (bygning)",1001:"legionær",1002:"prætorianer",1003:"Imperianer",1004:"Horse Scout",1005:"Den kavaleri af kejseren",1006:"Den kavaleri af Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Bosætter",1011:"Hero",1012:"Køllesvinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Germanske kavaleri",1018:"rambuk",1019:"Catapult",1020:"The Chief",1021:"Bosætter",1022:"Hero",1023:"Falanks",1024:"Swordsman",1025:"Pathfinder",1026:"Theutaterlyn",1027:"Druid Rider",1028:"Haeduaner",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Bosætter",1033:"Hero"};
var lang_ее={1:"About",2:"Farm nimekiri",3:"joon apteek",4:"Application Settings",5:"järjekord on hoone väed",6:"järjekorda uuring väed",7:"joon uute hoonete ehitamine",8:"rida parandusi hoonete",9:"järjekorda lammutamine",10:"kokku kõik tellimused",11:"rida parandusi väed",12:"kõrvaldamine väed",13:"The Notebook",14:"Kasulikud lingid",15:"küla keskus",16:"rakendamine pühade",17:"kaubateede",18:"ostu-müügi RESSURSID",19:"Mäng on oksjon",20:"Kõik külad RESSURSID",21:"Army kõik külad",22:"Liikumised vägede kõik külad",23:"Logi",24:"Farm nimekiri",25:"joon apteek",26:"järjekorda tellimine väed",27:"järjekorda uuring väed",28:"rida parandusi väed",29:"Kogu kõik tellimused",30:"Hävitamine vägede",31:"Waves",32:"Villages",33:"Kõik külad RESSURSID",34:"Army kõik külad",35:"Liikumised vägede kõik külad",36:"joon uute hoonete ehitamine",37:"rida parandusi hoonete",38:"järjekorda lammutamine",39:"analüüs",40:"analüüs rünnakuid liit",41:"Analysis Report",42:"Hero",43:"saatke automaatselt kangelane quest",44:"Automatic pumpamiseks kangelane oases",45:"Kultuur",46:"Automatic kellel pidu",47:"Kaubandus-ja ressursid",48:"auto-tasakaalustamine abiga kangelane RESSURSID",49:"auto-tasakaalustamine RESSURSID külades abiga kaupmehed",50:"kaubateede",51:"ostmine ja müümine RESSURSID",52:"Oksjoni",53:"Mäng on oksjon",54:"Buying õigeid asju",55:"Map",56:"Finding 15 ja 9",57:"Leia nõrk ja kaitsetu",58:"Map kaubateede",59:"map pannid",60:"Kaart liit",61:"Kaart vaenlased",62:"Areng",63:"Automatic Development",64:"külalistele",65:"Automatic uute küladele",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Logi Application",71:"Kasulikud lingid",72:"Kesk-Village",73:"Statistika",74:"sõdurite arv",75:"arengutaset RESSURSID",76:"Statistika Online",77:"Control",78:"ajakava online",79:"ajakava tegevus",80:"Setting saates SMS",81:"Control kaudu ICQ",82:"Saada teabe server koordineeriv liit",83:"Logi serverisse koordineeriv liit",84:"Army",85:"Lähtesta",86:"Tühjenda",87:"Salvesta",88:"OK",89:"Destroy hiljem",90:"Application Settings",91:"Keel",92:"Sest küsimusi, palun",93:"Nimi",94:"Vali madalama hinnaga",95:"Ostud madalama hinnaga",96:"* ostmine ei ole rakendatud ja tõenäoliselt ei:)",97:"Salv",98:"Leidke",99:"Cage",100:"Run jQBot T4",101:"Order hiljem",102:"Ehita hiljem",103:"Selleks, et uurida hiljem",104:"New kaubatee",105:"Et luua tee",106:"koordinaadid",107:"OK",108:"Cancel",109:"Nimi",110:"Link",111:"Open praegustes tab",112:"Ava uuel & vahelehel",113:"Stop",114:"Saada viimane list",115:"+ Praegune",116:"Reset kõik rünnakud kuni praeguse aja",117:"Clear Queue Pharma",118:"täidab hiljem",119:"Destroy hiljem",120:"Uued lingid",121:"Tüüp",122:"tugevdamine",123:"Tavaline rünnak",124:"Raid",125:"Frequency",126:"juhusliku nihkumise",127:"tüüpi rünnak",128:"rünnak",129:"2 Attack",130:"3. rünnakud",131:"5. rünnakud",132:"10. rünnakud",133:"15. rünnakud",134:"20 rünnakud",135:"25 rünnakud",136:"30. rünnakud",137:"40 rünnakud",138:"50 rünnakud",139:"75 rünnakud",140:"100 rünnak",141:"The Village",142:"Time",143:"armee",144:"Mängur",145:"The Tree",146:"Savi",147:"Iron",148:"grain",149:"Saatja",150:"Receiver",151:"Vahendite",152:"Periood",153:"Saada",154:"Ei",155:"Order type",156:"Ehitus",157:"Level",158:"Inimesed",159:"aja taimer üritused",160:"periood skanner",161:"The kokku kõik",162:"Order armee, kui on olemas hoone",163:"Lähtudes mis on puudu RESSURSID",164:"Building kõik tähtsuse järjekorras",165:"Raadius Pharma",166:"Võta ära X sekundit",167:"diversiooni vägede",400:"saeveski",401:"Clay Pit",402:"Iron Mine",403:"Farm",404:"saeveski",405:"Brickyard",406:"Iron Works",407:"jahuveskis",408:"Pagari",409:"Warehouse",410:"Barn",411:"Sepikoda",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"saatkond",418:"Kasarmu",419:"Stabiilne",420:"Workshop",421:"Akadeemia",422:"Secret",423:"Town Hall",424:"elamine",425:"The Palace",426:"Riigikassa",427:"Kaubandus",428:"Great Kasarmud",429:"Great Stabiilne",430:"City Walls",431:"Maa Wall",432:"Fence",433:"kiviraidur",434:"õlletehas",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Order väed",461:"Uuringud väed",462:"Building",463:"täiustamine",464:"rakendamine pühade",501:"Control",502:"Options",503:"Help",504:"Raid",505:"tugevdamine",506:"Tavaline rünnak",507:"Roomlased",508:"sakslased",509:"Galla",600:"Data edukalt salvestatud",601:"Ülesanne on omanik",602:"Kõik rakenduse seaded reset",603:"Paigaldatud uus raadius",604:"uus link",605:"Lisatud uus route",606:"Error",607:"Andmed lisatud järjekorda",608:"Selline uuring on juba järjekorras",609:"See hoone on juba seisab rida lammutamine",610:"Improvement ja nii on kõrgeim tase",611:"antud lahter on ehitada midagi",612:"See hoone on valmimisjärgus selles külas",613:"hoone ja nii on kõrgeim tase",614:"Communication",615:"taastati kõik Pharma",616:"Selleks, et hävitada midagi",617:"Auto-skaneerimise kõik külad",618:"Saada väed",619:"hävitamine ehitiste",620:"hoonete ehitamine",621:"Saatmine diilerid",622:"Levels of buildings",623:"Välislingid",624:"Quick Links",625:"Automatic kandmise login failure",626:"Buttons Development",627:"See küla on juba ravimite loetelu",628:"Eemaldada täielikult talust leht",629:"Küla on loetletud ravimite loetelu",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stop joosta taimer üritused",634:"Run joosta taimer üritused",635:"Vaatab muutujad GM",636:"Eemalda muutujad GM",637:"Vaata Cookie on samm-sammult",638:"eemaldamine Cookie on omakorda põhinev",639:"Vaata taotluse muutujad",640:"Probleemid laadimise minimap, lülitage vastuolus programm",641:"Otsi",642:"Otsi Settings",643:"Raadius",644:"Otsi complete",645:"Oasis",646:"Oksjoni",647:"Villages",648:"Run Denver 3",649:"koordinaadid",650:"Update",651:"Lisada talu külas Leaf",652:"Stop rünnakute kahjum üle",653:"Muutused salvestatud",654:"Login",655:"password",656:"Setting automaatsed sisend login failure",700:"[3]-Saada sõdurid",701:"[3] + Vägede",702:"[6] saatmine diilerid",703:"[6] + saatmine diilerid",704:"[1] kaevandamine armee",705:"[1] + Challenge armee",706:"[4], lammutada hoone",707:"[4] + lammutada hoone",708:"[2] kokku kõik",709:"[2] + kokku kõik",710:"[5] kokku kõik (hoone)",711:"[5] + kokku kõik (hoone)",1001:"leegionäribakter",1002:"Praetorian",1003:"Imperian",1004:"Horse skaut",1005:"ratsavägi ja keiser",1006:"ratsavägi ja Caesar",1007:"Taran",1008:"Fire Catapult",1009:"senaator",1010:"asuniku",1011:"Hero",1012:"Nuiamees",1013:"Odamees",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"teutooni ratsavägi",1018:"Muurinmurtaja",1019:"katapuldi",1020:"Chief",1021:"asuniku",1022:"Hero",1023:"Phalanx",1024:"Mõõgamees",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"asuniku",1033:"Hero"};
var lang_fi={1:"About",2:"Farm List",3:"rivi apteekki",4:"Application Settings",5:"jono on rakennus joukot",6:"jono tutkimus joukot",7:"rivi uudisrakentamiseen",8:"linja parannuksia rakennusten",9:"jonon purku",10:"kaikkiaan kaikki tilaukset",11:"linja parannuksia joukot",12:"hävittäminen joukot",13:"Notebook",14:"Linkkejä",15:"kylän keskustaan",16:"toteuttaminen lomien",17:"Trade Routes",18:"myynti ja osto VARAT",19:"peli on huutokauppa",20:"kaikki kylät VARAT",21:"Army kaikkien kylien",22:"liikkeitä joukkojen kaikkien kylien",23:"Log",24:"Farm List",25:"rivi apteekki",26:"jonossa tilaus joukot",27:"jono tutkimus joukot",28:"linja parannuksia joukot",29:"kaikkiaan kaikki tilaukset",30:"hävittäminen joukot",31:"Waves",32:"Villages",33:"kaikki kylät VARAT",34:"Army kaikkien kylien",35:"liikkeitä joukkojen kaikkien kylien",36:"rivi uudisrakentamiseen",37:"linja parannuksia rakennusten",38:"jonon purku",39:"Analysis",40:"Analyysi hyökkäykset Alliance",41:"Analysis Report",42:"Hero",43:"automaattisesti lähettää Hero Quest",44:"Automaattinen pumppauksen sankari keitaita",45:"Kulttuuri",46:"Automaattinen pitämällä juhlia",47:"Kauppa ja VARAT",48:"Auto-tasapainotus avulla sankari VARAT",49:"Auto-tasapainotus VAROJEN kylissä avulla kauppiaat",50:"Trade Routes",51:"osto ja myynti VARAT",52:"Huutokauppa",53:"peli on huutokauppa",54:"Buying oikeita asioita",55:"Kartta",56:"Finding 15 ja 9",57:"Etsi heikkoja ja puolustuskyvyttömiä",58:"Kartta kauppareittejä",59:"map pannuja",60:"Kartta Alliance",61:"Kartta vihollisia",62:"Development",63:"Automaattinen Development",64:"questit",65:"Automaattinen uusien kylien",66:"Yleistä",67:"Notebook",68:"About",69:"Application Settings",70:"Loki-sovelluksessa",71:"Linkkejä",72:"Central Village",73:"Tilastot",74:"joukkojen",75:"taso kehittämisresurssien",76:"Statistics Online",77:"Control",78:"aikataulu verkossa",79:"aikataulu toiminta",80:"Setting lähettämällä tekstiviesti",81:"Control ICQ",82:"Lähetä tiedot serveriin koordinoiva Alliance",83:"Kirjaudu palvelimelle koordinoiva Alliance",84:"Armeija",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy myöhemmin",90:"Application Settings",91:"Language",92:"Jos sinulla on kysyttävää, kiitos",93:"Nimi",94:"Valitse alemmalla hinnalla",95:"ostaminen alemmalla hinnalla",96:"* ostaminen ei ole toteutettu ja todennäköisesti ei:)",97:"Voide",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Tilaa Myöhemmin",102:"Build myöhemmin",103:"Tutkia myöhemmin",104:"Uusi kauppa reitti",105:"Jos haluat luoda reitin",106:"input koordinaatit",107:"OK",108:"Peruuta",109:"Nimi",110:"Linkki",111:"Avaa nykyisellä välilehdellä",112:"Avaa uuteen välilehteen",113:"Stop",114:"Lähetä viimeinen luettelosta",115:"+ nykyinen",116:"Nollaa kaikki hyökkäykset kunnes kellonaika",117:"Clear Queue Pharma",118:"hoitaa myöhemmin",119:"Destroy myöhemmin",120:"Uudet linkit",121:"Type",122:"vahvistaminen",123:"Tavallinen hyökkäys",124:"Raid",125:"Frequency",126:"Vahingossa siirtyminen",127:"tyyppinen hyökkäys",128:"hyökkäys",129:"2 Attack",130:"3 hyökkäyksiä",131:"5 hyökkäyksiä",132:"10 hyökkäyksiä",133:"15 hyökkäyksiä",134:"20 hyökkäyksiä",135:"25 hyökkäyksiä",136:"30 hyökkäyksiä",137:"40 hyökkäyksiä",138:"50 hyökkäyksiä",139:"75 hyökkäyksiä",140:"100 hyökkäys",141:"Village",142:"Aika",143:"armeija",144:"Gambler",145:"Tree",146:"Clay",147:"Iron",148:"Grain",149:"Lähettäjä",150:"Receiver",151:"Resurssit",152:"ajanjakso",153:"Lähetä",154:"Ei.",155:"Tilaa tyyppi",156:"Rakentaminen",157:"Taso",158:"Ihmiset",159:"aika ajastettuja",160:"ajan Scanner",161:"kokonaissumma",162:"Tilaa armeija jos on rakennus",163:"Pohjalta mitä puuttuu VARAT",164:"Building kaikki tärkeysjärjestyksessä",165:"Radius Pharma",166:"take away X sekuntia",167:"ohjautumista joukot",400:"saha",401:"Clay Pit",402:"rautakaivos",403:"Farm",404:"saha",405:"Brickyard",406:"Iron Works",407:"mylly",408:"leipomo",409:"Varasto",410:"Barn",411:"Seppä",412:"Forge Armor",413:"Arena",414:"Päärakennus",415:"Rally Point",416:"Market",417:"suurlähetystö",418:"kasarmi",419:"Vakaa",420:"Workshop",421:"Akatemia",422:"Salaisuus",423:"Kaupungintalo",424:"Residence",425:"Palace",426:"kassaan",427:"kauppakamari",428:"Suuri kasarmi",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"kivenhakkaaja",434:"Panimo",435:"Trapper",436:"Tavern",437:"Suuri varasto",438:"Big Barn",439:"Wonder of the World",460:"Tilaa joukot",461:"tutkimus joukkojen",462:"Building",463:"parantaminen",464:"toteuttaminen lomien",501:"Control",502:"Options",503:"Help",504:"Raid",505:"vahvistaminen",506:"Tavallinen hyökkäys",507:"Roomalaiset",508:"saksalaiset",509:"Galla",600:"Data tallennettu",601:"Tehtävän omistaja",602:"Kaikki sovellusasetuksia reset",603:"Installed New Radius",604:"Uusi yhteys",605:"Lisättiin uusi reitti",606:"Error",607:"data lisätään jonoon",608:"Tällainen tutkimus on jo jonossa",609:"Tämä rakennus on jo seisoo jonossa purku",610:"parantaminen ja niin on korkeimmalla tasolla",611:"Tietyssä solu rakentaa jotakin",612:"Tämä rakennus on rakenteilla tässä kylässä",613:"rakennus ja niin tulee olemaan korkeimmalla tasolla",614:"Viestintä",615:"rekonstruoida kaikki Pharma",616:"tuhoaminen ei ole mitään",617:"Auto-skannaus kaikkien kylien",618:"lähettää joukkoja",619:"tuhoaminen rakennukset",620:"rakennusten rakentaminen",621:"Lähetetään jälleenmyyjät",622:"tasojen rakentaminen",623:"Aiheesta muualla",624:"Pikalinkit",625:"Automaattinen tulon login vika",626:"Buttons Development",627:"Tämä kylä on jo lääke-list",628:"Poista kokonaan maatilan sheet",629:"Kylä on mainittu lääke luettelo",630:"Page jQBot T4",631:"Sulje jQBot T4",632:"Reset Sovellus",633:"Lopeta ajaa ajastettuja",634:"Run Run Ajastintapahtuman",635:"Katsoo muuttujat GM",636:"Poista muuttujat GM",637:"Näytä Cookie n askel askeleelta",638:"poistaminen Cookie vuoro-pohjainen",639:"Näytä sovellus muuttujat",640:"Ongelmia lastaus minimap, sammuta ristiriitaisen ohjelman",641:"Etsi",642:"Search Settings",643:"Radius",644:"Haku valmis",645:"Oasis",646:"Huutokauppa",647:"Villages",648:"Run Denver 3",649:"Koordinaatit",650:"Update",651:"Lisää tilalla kylässä Leaf",652:"Lopeta iskujen tappiot edellä",653:"Muutokset tallennettu",654:"Kirjaudu",655:"salasana",656:"Setting automaattinen syöttö login vika",700:"[3]-lähettää joukkoja",701:"[3] + lähettävät jatkuvasti lisää joukkoja",702:"[6] lähettäminen jälleenmyyjille",703:"[6] + lähettäminen jälleenmyyjille",704:"[1] louhinta armeijan",705:"[1] + Challenge-armeija",706:"[4], purkaa rakennus",707:"[4] + purkaa rakennuksen",708:"[2] yhteensä kaikkien",709:"[2] + Total kaikkien",710:"[5] kokonaissumma (rakennus)",711:"[5] + Total kaikki (rakennus)",1001:"Legioonalainen",1002:"Praetorian",1003:"Imperiaani",1004:"Horse Scout",1005:"ratsuväki keisari",1006:"ratsuväen keisarin",1007:"Taran",1008:"Tuli Catapult",1009:"Senaattori",1010:"Uudisasukas",1011:"Hero",1012:"Nuijamies",1013:"Keihäsmies",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Saksalaisen ratsuväki",1018:"muurinmurtajana",1019:"Catapult",1020:"Chief",1021:"Uudisasukas",1022:"Hero",1023:"Phalanx",1024:"Miekkasoturi",1025:"Pathfinder",1026:"Teutateksen salama",1027:"Druidi Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Uudisasukas",1033:"Hero"};
var lang_fr={1:"A propos",2:"Liste de ferme",3:"La pharmacie en ligne",4:"Application Settings",5:"La file d'attente est la construction des troupes",6:"Les troupes d'étude file d'attente",7:"La ligne de construction de nouveaux bâtiments",8:"Les améliorations de bâtiments de ligne",9:"La démolition file d'attente",10:"Le total de tous ordres",11:"Les améliorations ligne de troupes",12:"L'élimination des troupes",13:"The Notebook",14:"Liens utiles",15:"Le centre du village",16:"Mise en oeuvre des vacances",17:"Routes commerciales",18:"Les ressources de vente et d'achat",19:"Le jeu est aux enchères",20:"tous les villages RESSOURCES",21:"l'armée de tous les villages",22:"Les mouvements de troupes de tous les villages",23:"Connexion",24:"Liste de ferme",25:"La pharmacie en ligne",26:"La file d'attente de commande les troupes",27:"Les troupes d'étude file d'attente",28:"Les améliorations ligne de troupes",29:"Le total de tous ordres",30:"L'élimination des troupes",31:"Vagues",32:"Villages",33:"tous les villages RESSOURCES",34:"l'armée de tous les villages",35:"Les mouvements de troupes de tous les villages",36:"La construction de nouveaux bâtiments de ligne",37:"Les améliorations de bâtiments de ligne",38:"La démolition file d'attente",39:"Analyse",40:"Analyse de l'alliance des attaques",41:"Rapport d'analyse",42:"Hero",43:"Envoyer automatiquement un héros de la quête",44:"Automatique de pompage du héros dans les oasis",45:"Culture",46:"Automatique célébrations holding",47:"Le commerce et les ressources",48:"auto-équilibrage avec l'aide des ressources héros",49:"l'auto-équilibrage des ressources dans les villages avec l'aide des commerçants",50:"Routes commerciales",51:"Achat et vente RESSOURCES",52:"enchère",53:"Le jeu est aux enchères",54:"L'achat les bonnes choses",55:"Carte",56:"Trouver 15 et 9",57:"Trouver les faibles et sans défense",58:"Carte des routes commerciales",59:"La carte des casseroles",60:"Plan de l'alliance",61:"Carte des ennemis",62:"Développement",63:"Le développement automatique",64:"quêtes",65:"le développement automatique des nouveaux villages",66:"Général",67:"Notebook",68:"A propos",69:"Applications",70:"Application Log",71:"Liens utiles",72:"Central Village",73:"Statistiques",74:"Le nombre des troupes",75:"Le niveau des ressources de développement",76:"Statistiques en ligne",77:"Control",78:"Le planning en ligne",79:"Le calendrier de l'activité",80:"Réglage envoi de SMS",81:"Contrôle via ICQ",82:"Envoyer les informations vers le serveur de coordination de l'alliance",83:"Se connecter au serveur de coordination de l'alliance",84:"Armée",85:"Reset",86:"Effacer",87:"Enregistrer",88:"OK",89:"Détruisez plus tard",90:"Applications",91:"Langue",92:"Pour toutes questions, s'il vous plaît",93:"Nom",94:"Sélectionner à un prix inférieur",95:"L'achat à un prix inférieur",96:"L'achat * n'est pas mis en œuvre et ne sera probablement pas:)",97:"pommade",98:"Scroll",99:"Cage",100:"Exécuter jQBot T4",101:"Ordre tard",102:"Construire plus tard",103:"Afin d'étudier plus tard",104:"nouvelle route commerciale",105:"Pour créer un itinéraire de",106:"coordonnées d'entrée",107:"OK",108:"Annuler",109:"Nom",110:"Lien",111:"Ouvrir dans un onglet en cours",112:"Ouvrir dans un nouvel onglet",113:"Stop",114:"Envoyez le dernier de la liste",115:"+ courant",116:"Réinitialiser toutes les attaques jusqu'au moment actuel",117:"Queue Effacer Pharma",118:"Réaliser tard",119:"Détruisez plus tard",120:"Nouveaux liens",121:"Type",122:"Renforcement",123:"L'attaque d'habitude",124:"Le Raid",125:"Fréquence",126:"déplacement accidentel",127:"Le type d'attaque",128:"une attaque",129:"Attack 2",130:"3 attaques",131:"5 attaques",132:"10 attaques",133:"15 attaques",134:"20 attaques",135:"25 attaques",136:"30 attaques",137:"40 attaques",138:"50 attaques",139:"75 attaques",140:"100 attaque",141:"Le Village",142:"Time",143:"L'armée",144:"Gambler",145:"L'arbre",146:"Clay",147:"Iron",148:"Grain",149:"Expéditeur",150:"récepteur",151:"RESSOURCES",152:"période",153:"Envoyer vers",154:"Non",155:"Type d'ordre",156:"Construction",157:"Niveau",158:"Le Peuple",159:"La période des événements de minuterie",160:"La période du scanner",161:"Le total de tous",162:"L'ordre de l'armée, si il ya un bâtiment",163:"En s'appuyant sur ce qui manque RESSOURCES",164:"Construire ensemble un ordre de priorité",165:"Rayon Pharma",166:"à emporter pour les X secondes",167:"Le détournement des troupes",400:"Scierie",401:"Clay Pit",402:"Mine de fer",403:"La Ferme",404:"Scierie",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Boulangerie",409:"Warehouse",410:"La Grange",411:"Forgeron",412:"Armure Forge ",413:"Arena",414:"bâtiment principal",415:"Rally Point",416:"Marché",417:"L'Ambassade",418:"La caserne",419:"Stable",420:"Atelier",421:"L'Académie",422:"Secret",423:"Town Hall",424:"Résidence",425:"Le Palace",426:"Trésor",427:"La Chambre de Commerce",428:"Grande Caserne",429:"Grande écurie",430:"City Walls",431:"Mur de terre",432:"clôture",433:"Tailleur de pierre",434:"La Brasserie",435:"Trapper",436:"Taverne",437:"Grand dépôt",438:"Big Barn",439:"Merveille du Monde",460:"L'ordre des troupes",461:"Une étude des troupes",462:"Bâtiment",463:"Amélioration",464:"Application des vacances",501:"Control",502:"Options",503:"Aide",504:"Le Raid",505:"Renforcement",506:"L'attaque d'habitude",507:"Les Romains",508:"Les Allemands",509:"Gallas",600:"Les données sauvegardées avec succès",601:"La tâche est rendue au propriétaire",602:"Tous les paramètres d'application reset",603:"rayon installé de nouvelles",604:"Un nouveau lien",605:"Ajout d'une nouvelle route",606:"Erreur",607:"Les données ajoutées à la file d'attente",608:"Une telle étude est déjà dans la file d'attente",609:"Ce bâtiment est déjà la queue pour démolition",610:"Amélioration et donc a le plus haut niveau",611:"Dans une cellule donnée est de construire quelque chose",612:"Ce bâtiment est en construction dans ce village",613:"Le bâtiment et aura ainsi le plus haut niveau",614:"Communication",615:"recréé tous les pharma",616:"Pour détruire n'est rien",617:"Auto-analyse de tous les villages",618:"Envoyer des troupes",619:"La destruction des bâtiments",620:"La construction de bâtiments",621:"Envoi concessionnaires",622:"Niveaux des bâtiments",623:"liens externes",624:"Liens rapides",625:"l'entrée automatique de l'échec de connexion",626:"Développement Boutons",627:"Ce village est déjà dans la liste pharmaceutiques",628:"Supprimer entièrement de la feuille de ferme",629:"Le village est répertorié dans la liste pharmaceutiques",630:"Page jQBot T4",631:"Fermer jQBot T4",632:"Application Reset",633:"Arrêtez les événements timer run",634:"Exécuter événements timer run",635:"variables Regarde un GM",636:"Retirez le GM des variables",637:"Cookie Voir le étape par étape",638:"Retrait de Cookie tour par tour",639:"Afficher les variables d'application",640:"Problèmes avec le chargement du mini-carte, éteignez le programme en conflit",641:"Recherche",642:"Paramètres de recherche",643:"Rayon",644:"Recherche complète",645:"Oasis",646:"enchère",647:"Villages",648:"Exécuter Denver 3",649:"Coordonnées",650:"Update",651:"Ajouter dans le village de ferme de Leaf",652:"Arrêtez les attaques avec des pertes ci-dessus",653:"Changements sauvé",654:"Login",655:"password",656:"Réglage de la saisie automatique d'un échec de connexion",700:"[3]-envoyer des troupes",701:"[3] + Envoi de troupes",702:"[6] Envoi concessionnaires",703:"[6] + concessionnaires Envoi",704:"[1] L'extraction de l'armée",705:"[1] + Défi Armée",706:"[4], de démolir le bâtiment",707:"[4] + démolir le bâtiment",708:"[2] Le total de tous",709:"[2] + Total de tous",710:"[5] Le total de tous (bâtiment)",711:"[5] Total de tous les + (bâtiment)",1001:"Légionnaire",1002:"prétorienne",1003:"Impérian",1004:"éclaireur Horse",1005:"La cavalerie de l'empereur",1006:"La cavalerie de César",1007:"Taran",1008:"Catapult Fire",1009:"Le sénateur",1010:"immigrant",1011:"Hero",1012:"Combattant au gourdin",1013:"lancier",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalerie teutonique",1018:"bélier",1019:"Catapult",1020:"Le Chef",1021:"immigrant",1022:"Hero",1023:"Phalange",1024:"Swordsman",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Cavalier druide",1028:"Haeduan",1029:"Taran",1030:"Trébuchet",1031:"Leader",1032:"immigrant",1033:"Hero"};
var lang_gr={1:"Σχετικά",2:"Λίστα Farm",3:"Το φαρμακείο γραμμή",4:"Ρυθμίσεις Εφαρμογής",5:"Η ουρά είναι κτίριο στρατεύματα",6:"Τα στρατεύματα μελέτη ουρά",7:"Η γραμμή της κατασκευής νέων κτιρίων",8:"Οι βελτιώσεις γραμμή των κτιρίων",9:"Η κατεδάφιση ουρά",10:"Το σύνολο όλων των παραγγελιών",11:"Οι βελτιώσεις γραμμή στρατεύματα",12:"Διάθεση των στρατευμάτων",13:"Το Τετράδιο",14:"Χρήσιμοι Σύνδεσμοι",15:"Το κέντρο του χωριού",16:"Εφαρμογή των διακοπών",17:"εμπορικές διαδρομές",18:"Η ΠΟΡΟΙ πώληση και την αγορά",19:"Το παιχνίδι είναι σε δημοπρασία",20:"όλα τα χωριά ΠΟΡΩΝ",21:"Στρατός του όλα τα χωριά",22:"Οι μετακινήσεις στρατευμάτων από όλα τα χωριά",23:"Σύνδεση",24:"Λίστα Farm",25:"Το φαρμακείο γραμμή",26:"Η ουρά παραγγελία στρατεύματα",27:"Τα στρατεύματα μελέτη ουρά",28:"Οι βελτιώσεις γραμμή στρατεύματα",29:"Το σύνολο όλων των παραγγελιών",30:"Διάθεση των στρατευμάτων",31:"Κύματα",32:"Χωριά",33:"όλα τα χωριά ΠΟΡΩΝ",34:"Στρατός του όλα τα χωριά",35:"Οι μετακινήσεις στρατευμάτων από όλα τα χωριά",36:"Η κατασκευή γραμμή των νέων κτιρίων",37:"Οι βελτιώσεις γραμμή των κτιρίων",38:"Η κατεδάφιση ουρά",39:"Ανάλυση",40:"Ανάλυση των επιθέσεων συμμαχία",41:"δελτίο ανάλυσης",42:"Hero",43:"στείλει αυτόματα ένα ήρωα στην αναζήτηση",44:"Αυτόματη άντληση του ήρωα στην οάσεις",45:"Πολιτισμός",46:"Αυτόματη εορτασμούς εκμετάλλευση",47:"Εμπόριο και ΠΟΡΩΝ",48:"αυτόματη εξισορρόπηση με τη βοήθεια των πόρων ήρωα",49:"αυτόματη εξισορρόπηση ΠΟΡΩΝ στα χωριά με τη βοήθεια των εμπόρων",50:"εμπορικές διαδρομές",51:"Αγορά και πώληση ΠΟΡΩΝ",52:"Δημοπρασία",53:"Το παιχνίδι είναι σε δημοπρασία",54:"Αγοράζοντας τα σωστά πράγματα",55:"Χάρτης",56:"Η εύρεση 15 και 9",57:"Βρείτε τους αδύναμους και ανυπεράσπιστους",58:"Χάρτης των εμπορικών δρόμων",59:"Ο χάρτης τηγάνια",60:"Χάρτης της συμμαχίας",61:"Χάρτης των εχθρών",62:"Ανάπτυξη",63:"Αυτόματη Ανάπτυξη",64:"αναζητήσεις",65:"Αυτόματη ανάπτυξη νέων χωριών",66:"Γενικά",67:"Notebook",68:"Σχετικά",69:"Ρυθμίσεις εφαρμογής",70:"Εφαρμογή Log",71:"Χρήσιμοι Σύνδεσμοι",72:"Χωριό Central",73:"Στατιστικά",74:"Ο αριθμός των στρατευμάτων",75:"Το επίπεδο των πόρων για την ανάπτυξη",76:"Στατιστικά στοιχεία on-line",77:"Έλεγχος",78:"Το online πρόγραμμα",79:"Το πρόγραμμα των δραστηριοτήτων",80:"Ρύθμιση αποστολή sms",81:"Έλεγχος μέσω ICQ",82:"Στείλτε τις πληροφορίες στο διακομιστή, περί συντονισμού των συμμαχία",83:"Συνδεθείτε με το διακομιστή συντονισμό της συμμαχίας",84:"Στρατός",85:"Επαναφορά",86:"Clear",87:"Αποθήκευση",88:"OK",89:"Destroy αργότερα",90:"Ρυθμίσεις εφαρμογής",91:"Γλώσσα",92:"Για οποιαδήποτε ερώτηση, παρακαλώ",93:"Όνομα",94:"Επιλογή σε τιμή χαμηλότερη από",95:"Αγορά σε τιμή χαμηλότερη από",96:"* Οι αγορές δεν θα εφαρμοστεί και οι περισσότεροι δεν είναι πιθανό:)",97:"Αλοιφή",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Παραγγελία Αργότερα",102:"Build αργότερα",103:"Για να διερευνήσει αργότερα",104:"Νέα εμπορική διαδρομή",105:"Για να δημιουργήσετε μια πορεία για να",106:"συντεταγμένες εισόδου",107:"OK",108:"Ακύρωση",109:"Όνομα",110:"Σύνδεση",111:"Άνοιγμα στην τρέχουσα καρτέλα",112:"Άνοιγμα σε νέα καρτέλα",113:"Stop",114:"Στείλτε το τελευταίο στη λίστα",115:"+ ρεύμα",116:"Επαναφορά όλες τις επιθέσεις μέχρι την τρέχουσα χρονική στιγμή",117:"Clear Queue Pharma",118:"Εκπόνηση αργότερα",119:"Destroy αργότερα",120:"Νέα Σύνδεσμοι",121:"Τύπος",122:"Ενίσχυση",123:"Η συνήθης επίθεση",124:"Η επιδρομή",125:"Συχνότητα",126:"Η τυχαία μετατόπιση",127:"Ο τύπος της επίθεσης",128:"επίθεση",129:"2 Επίθεση",130:"3 επιθέσεις",131:"5 επιθέσεις",132:"10 επιθέσεις",133:"15 επιθέσεις",134:"20 επιθέσεις",135:"25 επιθέσεις",136:"30 επιθέσεις",137:"40 επιθέσεις",138:"50 επιθέσεις",139:"75 επιθέσεις",140:"100 επίθεση",141:"Το Χωριό",142:"Time",143:"Ο στρατός",144:"Gambler",145:"Το δέντρο",146:"Πηλός",147:"Iron",148:"Grain",149:"Αποστολέα",150:"Δέκτης",151:"πόρων",152:"Περίοδος",153:"Αποστολή",154:"Όχι",155:"τύπος Παραγγελία",156:"Κατασκευή",157:"Level",158:"Οι άνθρωποι",159:"Η περίοδος των εκδηλώσεων χρονόμετρο",160:"Η περίοδος του σαρωτή",161:"Το σύνολο όλων των",162:"να καταδικάσει το στρατό, αν υπάρχει ένα κτίριο",163:"Με βάση αυτό που λείπει ΠΟΡΩΝ",164:"Η οικοδόμηση του όλα τα κατά σειρά προτεραιότητας",165:"Ακτίνα Pharma",166:"πάρει για Χ δευτερόλεπτα",167:"Η εκτροπή των στρατευμάτων",400:"Πριονιστήριο",401:"Πηλός",402:"ορυχείο σιδήρου",403:"Η Φάρμα",404:"Πριονιστήριο",405:"Brickyard",406:"Iron Works",407:"αλευρόμυλου",408:"Φούρνος",409:"Αποθήκη",410:"Ο Αχυρώνας",411:"Σιδηρουργείο",412:"Armor Forge",413:"Arena",414:"Κεντρικό Κτίριο",415:"Σημείο Ράλι",416:"Αγορά",417:"Η Πρεσβεία",418:"Το Στρατόπεδο",419:"Σταθερό",420:"Εργαστήρι",421:"Η Ακαδημία",422:"Μυστικό",423:"Δημαρχείο",424:"Κατοικία",425:"Το παλάτι",426:"Ταμείο",427:"Το Εμπορικό Επιμελητήριο",428:"Μεγάλο στρατόπεδο",429:"Μεγάλος στάβλος",430:"Τείχη της Πόλης",431:"Γη Wall",432:"Fence",433:"λιθοδόμος",434:"Η Ζυθοποιία",435:"Trapper",436:"Ταβέρνα",437:"Μεγάλη αποθήκη",438:"Big Barn",439:"Παγκόσμιο Θαύμα",460:"Εντολή τα στρατεύματα",461:"Μελέτη των στρατευμάτων",462:"Η οικοδόμηση του",463:"Βελτίωση",464:"Η εφαρμογή του από τις διακοπές",501:"Έλεγχος",502:"Επιλογές",503:"Βοήθεια",504:"Η επιδρομή",505:"Ενίσχυση",506:"Η συνήθης επίθεση",507:"Οι Ρωμαίοι",508:"Οι Γερμανοί",509:"Galla",600:"Τα δεδομένα αποθηκεύτηκαν με επιτυχία",601:"Η αποστολή γίνεται ο ιδιοκτήτης",602:"Όλοι την αίτηση επαναφοράς των ρυθμίσεων",603:"Installed νέα ακτίνα",604:"Μια νέα σχέση",605:"Προστέθηκε μια νέα διαδρομή",606:"Σφάλμα",607:"Τα στοιχεία που προστίθενται στην ουρά",608:"Μια τέτοια μελέτη είναι ήδη στην ουρά",609:"Αυτό το κτίριο είναι ήδη στέκεται στη γραμμή για κατεδάφιση",610:"Βελτίωση και έτσι έχει το υψηλότερο επίπεδο",611:"Σε μια δεδομένη θέση είναι χτισμένο κάτι",612:"Αυτό το κτίριο είναι υπό κατασκευή σε αυτό το χωριό",613:"Το κτίριο και έτσι θα έχουν το υψηλότερο επίπεδο",614:"Επικοινωνία",615:"αναδημιουργηθεί όλα Pharma",616:"Να καταστρέψει δεν είναι τίποτα",617:"Auto-σάρωση όλων των χωριών",618:"Αποστολή στρατεύματα",619:"Η καταστροφή των κτιρίων",620:"Η κατασκευή των κτιρίων",621:"Αποστολή εμπόρους",622:"Τα επίπεδα των κτιρίων",623:"Εξωτερικές συνδέσεις",624:"Γρήγορες συνδέσεις",625:"Αυτόματη καταχώρηση της σύνδεσης αποτυχία",626:"Ανάπτυξη Κουμπιά",627:"Το χωριό αυτό βρίσκεται ήδη στη φαρμακευτική λίστα",628:"Καταργήστε τελείως από το φύλλο αγρόκτημα",629:"Το χωριό είναι εισηγμένη στο φαρμακευτικό λίστα",630:"Η σελίδα jQBot T4",631:"Close jQBot T4",632:"Εφαρμογή Reset",633:"Σταματήστε τα γεγονότα χρονόμετρο τρέχει",634:"Run γεγονότα χρονόμετρο τρέχει",635:"Βλέπει μεταβλητές GM",636:"Βγάλτε τις μεταβλητές της GM",637:"βήμα Προβολή Cookie είναι προς βήμα",638:"Απομάκρυνση των Cookie είναι turn-based",639:"Προβολή μεταβλητές εφαρμογή",640:"Προβλήματα με τη φόρτωση του minimap, απενεργοποιήστε τη διένεξη πρόγραμμα",641:"Αναζήτηση",642:"Ρυθμίσεις αναζήτησης",643:"Ακτίνα",644:"Αναζήτηση σε όλο το",645:"Oasis",646:"Δημοπρασία",647:"Χωριά",648:"Run Ντένβερ 3",649:"Συντεταγμένες",650:"Ενημέρωση",651:"Προσθήκη στο χωριό αγρόκτημα του Leaf",652:"Σταματήστε τις επιθέσεις με απώλειες πάνω",653:"Οι αλλαγές αποθηκεύτηκαν",654:"Σύνδεση",655:"password",656:"Ρύθμιση αυτόματης εισόδου μιας αποτυχίας σύνδεσης",700:"[3]-Αποστολή στρατευμάτων",701:"[3] + την αποστολή στρατευμάτων",702:"[6] Αποστολή εμπόρους",703:"[6] + Αποστολή εμπόρους",704:"[1] Η εξόρυξη του στρατού",705:"[1] + Πρόκληση Στρατού",706:"[4], κατεδάφιση του κτιρίου",707:"[4] + κατεδάφιση του κτιρίου",708:"[2] Το σύνολο όλων των",709:"[2] + Σύνολο όλων",710:"[5] Το σύνολο όλων των (κτίριο)",711:"[5] + Συνολικό ποσό των (κτίριο)",1001:"λεγεωνάριων",1002:"Πραιτοριανός",1003:"Ιμπεριανός",1004:"Scout Horse",1005:"Το ιππικό του αυτοκράτορα",1006:"Το ιππικό του Καίσαρα",1007:"Taran",1008:"Καταπέλτης Φωτιάς",1009:"Ο γερουσιαστής",1010:"Άποικος",1011:"Hero",1012:"Μαχητής με ρόπαλο",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Τεύτονες ιππικό",1018:"πολιορκητικός κριός",1019:"Καταπέλτης",1020:"Ο Αρχηγός",1021:"Άποικος",1022:"Hero",1023:"Φάλαγγα",1024:"Ξιφομάχος",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Rider Druid",1028:"Haeduan",1029:"Taran",1030:"Καταπέλτης",1031:"Leader",1032:"Άποικος",1033:"Hero"};
var lang_hr={1:"O",2:"Farma popis",3:"linija ljekarne",4:"Primjena Postavke",5:"red je izgradnja vojnika",6:"reda studije vojnika",7:"linija izgradnje novih objekata",8:"linija poboljšanja zgrada",9:"red rušenja",10:"ukupno svih naloga",11:"linija poboljšanja vojnika",12:"Zbrinjavanje vojnika",13:"Bilježnica",14:"Korisni linkovi",15:"selo centar",16:"Implementacija blagdana",17:"trgovački putovi",18:"kupnje i prodaje resursa",19:"Igra je na dražbi",20:"sva sela resursa",21:"Vojske sva sela",22:"Kretanje trupa svih sela",23:"Prijava",24:"Farma popis",25:"linija ljekarne",26:"čekanja narudžbe vojnika",27:"reda studije vojnika",28:"linija poboljšanja vojnika",29:"ukupno svih naloga",30:"Zbrinjavanje vojnika",31:"Valovi",32:"sela",33:"sva sela resursa",34:"Vojske sva sela",35:"Kretanje trupa svih sela",36:"linija izgradnja nove zgrade",37:"linija poboljšanja zgrada",38:"red rušenja",39:"Analiza",40:"Analiza napada savez",41:"Analiza izvješće",42:"Heroj",43:"Automatski poslati heroja u potrazi",44:"Automatsko transportiranje junak u oazama",45:"Kultura",46:"Automatsko održavanje svečanosti",47:"Trgovina i resursa",48:"Auto-balansiranje uz pomoć junaka resursa",49:"Auto-balansiranje resursima u selima uz pomoć trgovaca",50:"trgovački putovi",51:"Kupnja i prodaja resursa",52:"Kraj",53:"Igra je na dražbi",54:"Kupnja prave stvari",55:"Karta",56:"Pronalaženje 15 i 9",57:"Pronađi slab i bespomoćan",58:"Karta trgovačkih puteva",59:"Karta tave",60:"Karta savez",61:"Karta neprijatelja",62:"Razvoj",63:"Automatski razvoj",64:"zadataka",65:"Automatsko razvoju novih naselja",66:"Općenito",67:"Bilježnica",68:"O",69:"Primjena Postavke",70:"Prijava Prijava",71:"Korisni linkovi",72:"Središnje selo",73:"Statistika",74:"broj vojnika",75:"stupnju razvoja resursa",76:"Statistika Online",77:"Control",78:"raspored online",79:"raspored aktivnosti",80:"Postavljanje slanje SMS",81:"kontrola putem ICQ",82:"Pošalji podatke na server koordinaciju savez",83:"Prijavite se na poslužitelju koordinaciju savez",84:"Vojska",85:"Reset",86:"Clear",87:"Spremi",88:"OK",89:"Uništi kasnije",90:"Primjena Postavke",91:"Jezik",92:"Za bilo kakva pitanja, molim",93:"Ime",94:"Odabir po cijeni ispod",95:"Nabava po cijeni ispod",96:"* Kupnja ne provodi i da će najvjerojatnije neće:)",97:"mast",98:"Dođite",99:"kavez",100:"Run jQBot T4",101:"Red poslije",102:"Graditi kasnije",103:"Za istražiti kasnije",104:"Novi trgovački put",105:"Za stvaranje rute s",106:"ulaz koordinate",107:"U redu",108:"Odustani",109:"Ime",110:"Link",111:"Otvori u trenutnu karticu",112:"Otvori u novoj kartici",113:"Stop",114:"Pošalji zadnji na popisu",115:"+ struja",116:"Reset sve napade do trenutnog vremena",117:"Clear red Pharma",118:"Izvršiti kasnije",119:"Uništi kasnije",120:"Novi Linkovi",121:"Vrsta",122:"Jačanje",123:"uobičajenih napada",124:"Raid",125:"Frequency",126:"slučajnog pomaka",127:"vrsta napada",128:"napad",129:"2 napada",130:"3 napada",131:"5 napada",132:"10 napada",133:"15 napada",134:"20 napada",135:"25 napada",136:"30 napada",137:"40 napada",138:"50 napada",139:"75 napada",140:"100 napada",141:"selo",142:"vrijeme",143:"vojska",144:"Gambler",145:"Stablo",146:"Clay",147:"Iron",148:"Zrno",149:"Sender",150:"Receiver",151:"Resursi",152:"Razdoblje",153:"Pošalji",154:"Ne!",155:"Red tip",156:"Izgradnja",157:"Level",158:"Ljudi",159:"razdoblje od vremena događaja",160:"U razdoblju od skenera",161:"zbroj svih",162:"Red vojska ako se zgrada",163:"Nadovezujući se na ono što nedostaje resursa",164:"Izgradnja sve u red prioriteta",165:"Radijus Pharma",166:"oduzeti za X sekundi",167:"skretanja vojnika",400:"Pilana",401:"Clay Pit",402:"Rudnik željeza",403:"Farma",404:"Pilana",405:"Ciglana",406:"Iron Works",407:"mlin",408:"Pekara",409:"Warehouse",410:"Barn",411:"Kovačnica",412:"Forge oklop",413:"Arena",414:"Glavna zgrada",415:"Okupljalište",416:"tržištu",417:"veleposlanstvo",418:"vojarni",419:"Stabilno",420:"Radionica",421:"akademija",422:"Tajna",423:"Gradska vijećnica",424:"Residence",425:"Palace",426:"riznice",427:"Chamber of Commerce",428:"Velika vojarni",429:"Velika Stabilan",430:"Gradske zidine",431:"Zemlja zid",432:"Ograda",433:"Klesar",434:"Pivovara",435:"Zamka",436:"Taverna",437:"Velika galerija",438:"Big kukuvija",439:"Svjetsko čudo",460:"Red trupe",461:"Studija o snagama",462:"Izgradnja",463:"popravljanja",464:"Implementacija blagdana",501:"Control",502:"Opcije",503:"Pomoć",504:"Raid",505:"Jačanje",506:"uobičajenih napada",507:"Rimljani",508:"Nijemci",509:"Galla",600:"Podaci uspješno spremljen",601:"Zadatak je napravio vlasnika",602:"Svi reset postavki programa",603:"ugrađeni novi radius",604:"novi link",605:"dodao je novi smjer",606:"Greška",607:"Podaci dodan red",608:"Takva studija je već u redu",609:"Ova zgrada je već stoje u redu za rušenje",610:"Unapređenje i tako je na najvišoj razini",611:"U određenom stanica izgraditi nešto",612:"Ova zgrada je u izgradnji u ovom selu",613:"Zgrada i tako će imati na najvišoj razini",614:"Komunikacija",615:"ponovno sve pharma",616:"Kako uništiti ništa",617:"Auto-skeniranje svih sela",618:"Pošalji postrojbe",619:"Uništavanje zgrada",620:"Izgradnja objekata",621:"Slanje dilera",622:"Razine zgrada",623:"Vanjske poveznice",624:"Brzi linkovi",625:"Automatsko ulazak prijava kvara",626:"Gumbi za razvoj",627:"Ovo selo je već u farmaceutskoj popisu",628:"Ukloni potpuno iz farme list",629:"Selo je navedena u farmaceutskoj popisu",630:"Stranica jQBot T4",631:"Close jQBot T4",632:"Reset Aplikacija",633:"Stop timera događaja pokrenuti",634:"Start događaj trčanje vremena",635:"Pregled varijable GM",636:"Ukloni varijable GM",637:"Pogledaj Cookie je, korak po korak",638:"Uklanjanje Cookie je turn-based",639:"Prikaz primjene varijable",640:"Problemi s utovara mini, isključite sukobljenih programa",641:"Traži",642:"Postavke pretraživanja",643:"radius",644:"Traži potpune",645:"Oaza",646:"Kraj",647:"sela",648:"Run Denver 3",649:"koordinata",650:"Update",651:"Dodaj u farmi selu Leaf",652:"Stop napada s gubitkom iznad",653:"Promjene su spremljene",654:"Prijava",655:"lozinka",656:"Postavljanje automatskog ulaz za prijavu neuspjeh",700:"[3]-šalje vojnike",701:"[3] + Slanje vojnika",702:"[6] Vaša poruka dilera",703:"[6] + Slanje dilera",704:"[1] izvlačenje vojske",705:"[1] + Izazov vojske",706:"[4], rušenje zgrada",707:"[4] + rušenje zgrade",708:"[2] Ukupno sve",709:"[2] + Ukupno sve",710:"[5] Ukupno svih (zgrada)",711:"[5] + Ukupno svih (zgrada)",1001:"legionar",1002:"pretorijanac",1003:"Imperian",1004:"Horse izviđač",1005:"konjice cara",1006:"konjica Cezara",1007:"Taran",1008:"Fire Katapult",1009:"Senator",1010:"Naseljenik",1011:"Heroj",1012:"Gorštak",1013:"Kopljanik",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Teutonski konjica",1018:"ovan",1019:"Katapult",1020:"Glavni",1021:"Naseljenik",1022:"Heroj",1023:"falanga",1024:"Mačevalac",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid jahač",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"vođa",1032:"Naseljenik",1033:"Heroj"};
var lang_hu={1:"Névjegy",2:"Farm List",3:"A vonal gyógyszertár",4:"Application Settings",5:"A sort épít csapatokat",6:"A queue tanulmány csapatok",7:"A vonal új épületek építése",8:"A vonal fejlesztése épületek",9:"A queue bontási",10:"A teljes az összes megbízás",11:"A vonal fejlesztések csapatok",12:"ártalmatlanítása csapatok",13:"A notebook",14:"Hasznos linkek",15:"A falu központjában",16:"végrehajtása az ünnepek",17:"kereskedelmi útvonalak",18:"Az adásvételi FORRÁSOK",19:"A játék az aukción",20:"a falu FORRÁSOK",21:"Army of a falvak",22:"mozgalmak a csapatok minden falu",23:"Napló",24:"Farm List",25:"A vonal gyógyszertár",26:"A queue rendelési csapatok",27:"A queue tanulmány csapatok",28:"A vonal fejlesztések csapatok",29:"A teljes az összes megbízás",30:"ártalmatlanítása csapatok",31:"Hullámok",32:"falvak",33:"a falu FORRÁSOK",34:"Army of a falvak",35:"mozgalmak a csapatok minden falu",36:"A vonal új épületek építése",37:"A vonal fejlesztése épületek",38:"A queue bontási",39:"elemzés",40:"elemzése támadások szövetséget",41:"Analysis Report",42:"Hero",43:"automatikusan küld egy hős, a küldetés",44:"Automatikus pumpáló a hős a oázis",45:"Kultúra",46:"Automatikus gazdaság ünnepségek",47:"Kereskedelmi és erőforrások",48:"auto-egyensúly segítségével a hős FORRÁSOK",49:"auto-kiegyensúlyozó FORRÁSOK a falvakban segítségével a kereskedők",50:"kereskedelmi útvonalak",51:"vásárlása és eladása FORRÁSOK",52:"aukció",53:"A játék az aukción",54:"Vásárlás a helyes dolgokat",55:"Térkép",56:"keresése 15 és 9",57:"Találd meg a gyenge és védtelen",58:"A térkép a kereskedelmi útvonalak",59:"A térkép edények",60:"A térkép a szövetség",61:"Térkép ellenségek",62:"Fejlesztés",63:"Automatikus Development",64:"küldetés",65:"Automatikus az új falvak",66:"General",67:"Notebook",68:"Névjegy",69:"Application Settings",70:"Napló Alkalmazás",71:"Hasznos linkek",72:"Közép-Village",73:"Statisztika",74:"A katonák számának",75:"A szint fejlesztési források",76:"Statistics Online",77:"Control",78:"Az ütemterv online",79:"A ütemezése tevékenység",80:"Beállítás SMS",81:"Vezérlés ICQ",82:"Küldés az információkat a szerver koordináló szövetség",83:"Jelentkezzen be, hogy a szerver koordináló szövetség",84:"Army",85:"Reset",86:"Clear",87:"Mentés",88:"OK",89:"Pusztítsd később",90:"Application Settings",91:"Nyelv",92:"Bármilyen kérdése van, kérjük",93:"Név",94:"Select alacsonyabb áron",95:"beszerzési áron az alábbi",96:"* Beszerzési nem hajtják végre, és valószínűleg nem:)",97:"kenőcs",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Order Később",102:"Build később",103:"A vizsgálatot később",104:"Új kereskedelmi út",105:"létrehozása útvonalat",106:"input koordináták",107:"OK",108:"Mégse",109:"Név",110:"Link",111:"Megnyitás az aktuális lapon",112:"Megnyitás új fülön",113:"Stop",114:"Küldés az utolsó a listán",115:"+ az aktuális",116:"Mindent vissza támadást, amíg a pontos idő",117:"Tiszta sor Pharma",118:"Végezze el később",119:"Pusztítsd később",120:"Új linkek",121:"típus",122:"megerősítése",123:"A szokásos támadás",124:"A Raid",125:"Frequency",126:"véletlen elmozdulás",127:"Az a fajta támadás",128:"támadás",129:"2 Attack",130:"3 támadás",131:"5 támadások",132:"10 támadásokat",133:"15 támadásokat",134:"20 támadásokat",135:"25 támadásokat",136:"30 támadásokat",137:"40 támadásokat",138:"50 támadásokat",139:"75 támadásokat",140:"100 támadás",141:"The Village",142:"Time",143:"A hadsereg",144:"Gambler",145:"A fa",146:"Clay",147:"Iron",148:"Grain",149:"Feladó",150:"Vevő",151:"Erőforrások",152:"Időszak",153:"Küldés",154:"Nem",155:"Order típus",156:"Construction",157:"Level",158:"Az emberek",159:"Az az időszak, időzítő események",160:"Az az időszak, a szkenner",161:"Az összessége",162:"Rend a hadsereg, ha van egy épület",163:"építve mi hiányzik FORRÁSOK",164:"Building minden fontossági sorrendben",165:"Radius Pharma",166:"elveszi az X másodperc",167:"A eltérítése a csapatok",400:"Sawmill",401:"Agyagbánya",402:"Iron Mine",403:"A Farm",404:"Sawmill",405:"téglagyár",406:"Iron Works",407:"malom",408:"Pékség",409:"Warehouse",410:"The Barn",411:"Kovács",412:"Forge Armor",413:"Arena",414:"Főépület",415:"Gyülekezőtér",416:"Market",417:"A nagykövetség",418:"A Kaszárnya",419:"Stabil",420:"Műhely",421:"Az Akadémia",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"A Kereskedelmi Kamara",428:"Nagy kaszárnya",429:"Nagy istálló",430:"City Walls",431:"Föld Wall",432:"Kerítés",433:"Kőfaragó",434:"A sörfőzde",435:"Trapper",436:"Csárda",437:"Nagy raktár",438:"Big Barn",439:"Világcsoda",460:"az Elsőfokú Bíróság a csapatokat",461:"A tanulmány a csapatok",462:"Building",463:"fejlesztés",464:"végrehajtása az ünnepek",501:"Control",502:"Options",503:"Help",504:"A Raid",505:"megerősítése",506:"A szokásos támadás",507:"A rómaiak",508:"A németek",509:"Galla",600:"Az adatok sikeresen mentve",601:"A feladat legyen a tulajdonosa",602:"Minden alkalmazás beállításainak visszaállítása",603:"Installed új sugár",604:"Új kapcsolat",605:"Egy új utat",606:"Error",607:"Az adatok felvétele a sorban",608:"Egy ilyen vizsgálat már a sorban",609:"Ez az épület már állt sorban a bontási",610:"javítása és így a legmagasabb szintű",611:"Egy adott cellában épül valami",612:"Az épület építés alatt áll ebben a faluban",613:"Az épület, és így lesz a legmagasabb szinten",614:"Kommunikáció",615:"újra minden pharma",616:"A tönkre semmi",617:"Auto-vizsgálat minden falu",618:"Küldés csapatok",619:"A rombolás az épületek",620:"Az épületek építése",621:"küldő kereskedők",622:"szintek épületek",623:"Külső hivatkozások",624:"Gyors linkek",625:"Automatikus belépés bejelentkezési hiba",626:"gombok Development",627:"Ez a falu már a gyógyszeripar lista",628:"Vegye ki teljesen a gazdaság lapot",629:"A falu szerepel a gyógyszeripari list",630:"Az oldal jQBot T4",631:"Close jQBot T4",632:"Reset Alkalmazás",633:"Ne fuss az időzítő események",634:"Fuss fuss időzített események",635:"megtekintése változók GM",636:"Vegye ki a változók GM",637:"View Cookie a lépésről lépésre",638:"eltávolítása Cookie a körökre osztott",639:"View alkalmazás változók",640:"Problémák betöltése minimap, kapcsolja ki az ütköző program",641:"Keresés",642:"Keresés beállításai",643:"Radius",644:"Keresés a teljes",645:"Oasis",646:"aukció",647:"falvak",648:"Run Denver 3",649:"Koordináták",650:"Update",651:"Add a gazdaság falu Leaf",652:"Ne támadások veszteségek fölött",653:"Változások mentése",654:"Belépés",655:"password",656:"beállítása az automatikus bemeneti bejelentkezési hiba",700:"[3]-csapatokat küldeni",701:"[3] + küldés csapatokat",702:"[6] küldése kereskedők",703:"[6] + küldése kereskedők",704:"[1] A kivonás a hadsereg",705:"[1] + Challenge Army",706:"[4], az épület elbontása",707:"[4] + az épület elbontása",708:"[2] A összessége",709:"[2] + Total minden",710:"[5] A összessége (épület)",711:"[5] + összessége (épület)",1001:"Légiós",1002:"pretoriánusok",1003:"birodalmi",1004:"Ló scout",1005:"A lovasság a császár",1006:"A lovasság Caesar",1007:"Taran",1008:"Fire Katapult",1009:"Senator",1010:"telepes",1011:"Hero",1012:"Buzogányos",1013:"Lándzsás",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"teuton lovasság",1018:"faltörő kos",1019:"Katapult",1020:"A Chief",1021:"telepes",1022:"Hero",1023:"Phalanx",1024:"kardforgató",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"telepes",1033:"Hero"};
var lang_id={1:"Tentang",2:"Daftar Farm",3:"Apotek baris",4:"Aplikasi Pengaturan",5:"antrian ini sedang membangun pasukan",6:"Pasukan antrian Penelitian",7:"Garis konstruksi bangunan baru",8:"perbaikan Garis bangunan",9:"Penghancuran antrian",10:"Total dari semua perintah",11:"Perbaikan Jalur pasukan",12:"Pembuangan pasukan",13:"Notebook",14:"Links",15:"Pusat desa",16:"Pelaksanaan liburan",17:"Rute Perdagangan",18:"Para SUMBER penjualan dan pembelian",19:"Permainan ini pada lelang",20:"semua desa SUMBER DAYA",21:"Tentara semua desa",22:"Pergerakan pasukan dari semua desa",23:"Log",24:"Daftar Farm",25:"Apotek baris",26:"Antrian memerintahkan pasukan",27:"Pasukan antrian Penelitian",28:"Perbaikan Jalur pasukan",29:"Total dari semua perintah",30:"Pembuangan pasukan",31:"Gelombang",32:"Desa",33:"semua desa SUMBER DAYA",34:"Tentara semua desa",35:"Pergerakan pasukan dari semua desa",36:"Pembangunan gedung baru garis",37:"perbaikan Garis bangunan",38:"Penghancuran antrian",39:"Analisis",40:"Analisis aliansi serangan",41:"Analisis Laporan",42:"Pahlawan",43:"Secara otomatis mengirim pahlawan pada pencarian",44:"Otomatis pemompaan pahlawan di oasis",45:"Budaya",46:"perayaan memegang Otomatis",47:"Perdagangan dan SUMBER DAYA",48:"otomatis menyeimbangkan dengan bantuan SUMBER DAYA pahlawan",49:"auto-balancing SUMBER DAYA di desa-desa dengan bantuan pedagang",50:"Rute Perdagangan",51:"Membeli dan menjual SUMBER DAYA",52:"Lelang",53:"Permainan ini pada lelang",54:"Membeli hal yang benar",55:"Peta",56:"Menemukan 15 dan 9",57:"Cari yang lemah dan tak berdaya",58:"Peta rute perdagangan",59:"peta panci",60:"Peta aliansi",61:"Peta musuh",62:"Pembangunan",63:"Pembangunan Otomatis",64:"quests",65:"pengembangan otomatis desa-desa baru",66:"Umum",67:"Notebook",68:"Tentang",69:"Aplikasi Pengaturan",70:"Aplikasi Log",71:"Links",72:"Pusat Desa",73:"Statistik",74:"Jumlah tentara",75:"Tingkat perkembangan SUMBER DAYA",76:"Statistik Online",77:"Control",78:"Para secara online jadwal",79:"Jadwal kegiatan",80:"Menetapkan mengirim sms",81:"Kontrol lewat ICQ",82:"Kirim informasi ke server koordinasi aliansi",83:"Log on ke server koordinasi aliansi",84:"Angkatan Darat",85:"Reset",86:"Batal",87:"Simpan",88:"OK",89:"Hancurkan nanti",90:"Aplikasi Pengaturan",91:"Bahasa",92:"Untuk pertanyaan, silakan",93:"Nama",94:"Pilih dengan harga di bawah",95:"Pembelian pada harga di bawah",96:"* Pembelian ini tidak dilaksanakan dan kemungkinan besar akan tidak:)",97:"Salep",98:"Geser",99:"Cage",100:"Jalankan jQBot T4",101:"Orde Nanti",102:"Membangun nanti",103:"Untuk menyelidiki nanti",104:"Baru rute perdagangan",105:"Untuk membuat rute ke",106:"masukan koordinat",107:"OK",108:"Batal",109:"Nama",110:"Link",111:"Buka di tab saat ini",112:"Buka di tab baru",113:"Stop",114:"Mengirim terakhir dalam daftar",115:"+ saat ini",116:"Reset semua serangan sampai waktu saat ini",117:"Antrian Farmasi Hapus",118:"Melaksanakan nanti",119:"Hancurkan nanti",120:"Situs Baru",121:"Jenis",122:"Penguatan",123:"Serangan biasa",124:"Raid The",125:"Frekuensi",126:"pemindahan Terkadang",127:"Jenis serangan",128:"serangan",129:"2 Serangan",130:"3 serangan",131:"5 serangan",132:"10 serangan",133:"15 serangan",134:"20 serangan",135:"25 serangan",136:"30 serangan",137:"40 serangan",138:"50 serangan",139:"75 serangan",140:"100 serangan",141:"Desa",142:"Waktu",143:"Militer",144:"Penjudi",145:"The Tree",146:"Clay",147:"Besi",148:"Grain",149:"Pengirim",150:"Receiver",151:"SUMBER",152:"Periode",153:"Kirim ke",154:"Tidak",155:"tipe Order",156:"Konstruksi",157:"Level",158:"Rakyat",159:"Masa peristiwa timer",160:"Masa pemindai",161:"Jumlah keseluruhan",162:"Orde tentara jika ada sebuah bangunan",163:"Membangun apa yang hilang SUMBER DAYA",164:"Membangun semua dalam rangka prioritas",165:"Radius Pharma",166:"mengambil untuk detik X",167:"Pengalihan pasukan",400:"Sawmill",401:"Clay Pit",402:"Besi Tambang",403:"Farm",404:"Sawmill",405:"tempat pembuatan batu bata",406:"Iron Works",407:"Tepung Mill",408:"Toko roti",409:"Gudang",410:"The Barn",411:"Pandai Besi",412:"Forge Armor",413:"Arena",414:"Gedung Utama",415:"Titik Temu",416:"Pasar",417:"Kedutaan Besar",418:"Barak The",419:"Stabil",420:"Workshop",421:"Akademi",422:"Rahasia",423:"Town Hall",424:"Residence",425:"Istana",426:"Keuangan",427:"Kamar Dagang",428:"Barak Besar",429:"Stabil Besar",430:"Dinding Kota",431:"Bumi Wall",432:"Pagar",433:"tukang batu",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Gudang Besar",438:"Barn Besar",439:"Keajaiban Dunia",460:"Orde pasukan",461:"Sebuah studi pasukan",462:"Membangun",463:"Peningkatan",464:"Pelaksanaan liburan",501:"Control",502:"Pilihan",503:"Bantuan",504:"Raid The",505:"Penguatan",506:"Serangan biasa",507:"Orang-orang Romawi",508:"Jerman",509:"Galla",600:"Data berhasil disimpan",601:"Tugas ini dibuat pemilik",602:"Semua aplikasi pengaturan ulang",603:"jari-jari baru Terpasang",604:"Sebuah link baru",605:"Ditambahkan rute baru",606:"Kesalahan",607:"Data ditambahkan ke antrian",608:"Studi semacam sudah dalam antrian",609:"Bangunan ini sudah berdiri dalam antrian untuk pembongkaran",610:"Perbaikan dan sehingga memiliki tingkat tertinggi",611:"Dalam sebuah sel yang diberikan adalah membangun sesuatu yang",612:"Gedung ini dibangun di desa ini",613:"Bangunan dan sehingga akan memiliki tingkat tertinggi",614:"Komunikasi",615:"diciptakan kembali semua farmasi",616:"Untuk menghancurkan apa-apa",617:"Auto-scanning semua desa",618:"Kirim pasukan",619:"Penghancuran bangunan",620:"Pembangunan gedung",621:"Mengirim dealer",622:"Tingkat bangunan",623:"Link Eksternal",624:"Quick Links",625:"masuknya otomatis kegagalan login",626:"Tombol Pembangunan",627:"Desa ini sudah dalam daftar farmasi",628:"Hapus sepenuhnya dari lembar pertanian ",629:"Desa ini terdaftar dalam daftar farmasi",630:"Halaman jQBot T4",631:"Tutup jQBot T4",632:"Aplikasi Reset",633:"Hentikan peristiwa menjalankan timer",634:"Jalankan peristiwa menjalankan timer",635:"variabel Melihat GM",636:"Hapus GM variabel",637:"Langkah Lihat Cookie dengan langkah",638:"Penghapusan Cookie giliran berbasis",639:"Lihat variabel aplikasi",640:"Masalah dengan loading minimap, matikan program yang bertentangan",641:"Cari",642:"Pengaturan Pencarian",643:"Radius",644:"Cari lengkap",645:"Oasis",646:"Lelang",647:"Desa",648:"Jalankan Denver 3",649:"Koordinat",650:"Update",651:"Tambahkan di desa pertanian Daun",652:"Hentikan serangan dengan kerugian di atas",653:"Perubahan disimpan",654:"Login",655:"password",656:"Mengatur input otomatis dari kegagalan login",700:"[3]-Mengirim pasukan",701:"[3] + Mengirim pasukan",702:"[6] dealer Mengirim",703:"[6] + dealer Mengirim",704:"[1] Ekstraksi tentara",705:"[1] + Tantangan Angkatan Darat",706:"[4], menghancurkan bangunan",707:"[4] + menghancurkan bangunan",708:"[2] total dari semua",709:"[2] + Total semua",710:"[5] total dari semua (bangunan)",711:"[5] + Total semua (bangunan)",1001:"Legiuner",1002:"Praetoria",1003:"Imperian",1004:"pramuka Kuda",1005:"Kavaleri kaisar",1006:"Kavaleri dari Caesar",1007:"Taran",1008:"Catapult Api",1009:"Senator",1010:"Settler",1011:"Pahlawan",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"kavaleri Teutonik",1018:"pendobrak",1019:"Catapult",1020:"Ketua",1021:"Settler",1022:"Pahlawan",1023:"Phalanx",1024:"Pendekar",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Pemimpin",1032:"Settler",1033:"Pahlawan"};
var lang_in={1:"के बारे में",2:"फार्म सूची",3:"लाइन फार्मेसी",4:"अनुप्रयोग सेटिंग्स",5:"पंक्ति सैनिकों का निर्माण होता है",6:"पंक्ति अध्ययन सैनिकों ",7:"नई इमारतों के निर्माण की पंक्ति",8:"इमारतों की लाइन सुधार",9:"पंक्ति विध्वंस",10:"सभी आदेशों की कुल",11:"पंक्ति सुधार सैनिकों",12:"सैनिकों का निपटान",13:"नोटबुक",14:"उपयोगी लिंक्स",15:"गांव केन्द्र",16:"छुट्टियों का कार्यान्वयन",17:"व्यापार मार्गों",18:"बिक्री और खरीद के संसाधन ",19:"खेल नीलामी पर है",20:"सभी गांवों संसाधन",21:"सभी गांवों की सेना ",22:"सभी गांवों के जवानों का आंदोलन",23:"लॉग",24:"फार्म सूची",25:"लाइन फार्मेसी",26:"आदेश क़तार सैनिकों",27:"पंक्ति अध्ययन सैनिकों ",28:"लाइन सुधार सैनिकों",29:"सभी आदेशों की कुल",30:"सैनिकों का निपटान",31:"लहरें",32:"गांवों",33:"सभी गांवों संसाधन",34:"सभी गांवों की सेना ",35:"सभी गांवों के जवानों का आंदोलन",36:"नई इमारतों में से एक लाइन निर्माण",37:"इमारतों की लाइन सुधार",38:"पंक्ति विध्वंस",39:"विश्लेषण",40:"हमलों गठबंधन का विश्लेषण",41:"विश्लेषण रिपोर्ट",42:"हीरो",43:"स्वत: खोज पर एक नायक भेज",44:"ओअसेस् में नायक की पम्पिंग स्वचालित",45:"संस्कृति",46:"स्वचालित पकड़े समारोह",47:"व्यापार और संसाधन",48:"नायक संसाधनों की मदद से स्वत: संतुलन",49:"व्यापारियों की मदद से गांवों में संसाधन ऑटो संतुलन",50:"व्यापार मार्गों",51:"खरीद और बिक्री संसाधन",52:"नीलामी",53:"खेल नीलामी पर है",54:"सही चीजें खरीदना",55:"नक्शा",56:"15 और 9 ढूँढना",57:"कमजोर और निराश्रय ढूँढें",58:"व्यापार मार्गों के मानचित्र",59:"नक्शा धूपदान",60:"गठबंधन के मानचित्र",61:"दुश्मनों के मानचित्र",62:"विकास",63:"स्वचालित विकास",64:"quests",65:"नई गांवों का विकास स्वत:",66:"आम",67:"नोटबुक",68:"के बारे में",69:"अनुप्रयोग सेटिंग्स",70:"लॉग अनुप्रयोग",71:"उपयोगी लिंक्स",72:"सेंट्रल गांव",73:"सांख्यिकी",74:"सैनिकों की संख्या",75:"विकास के संसाधनों का स्तर",76:"सांख्यिकी ऑनलाइन",77:"नियंत्रण",78:"अनुसूची ऑनलाइन",79:"गतिविधि की अनुसूची",80:"एसएमएस भेजने की सेटिंग",81:"ICQ के माध्यम से नियंत्रण",82:"सर्वर से जानकारी भेजें गठबंधन समन्वय",83:"गठबंधन समन्वय सर्वर पर लॉग ऑन",84:"सेना",85:"रीसेट",86:"साफ़",87:"सहेजें",88:"ठीक है",89:"बाद में नष्ट करें",90:"अनुप्रयोग सेटिंग्स",91:"भाषा",92:"किसी भी प्रश्न के लिए, कृपया",93:"नाम",94:"एक से कम कीमत पर चुनें",95:"एक कीमत पर नीचे क्रय",96:"* क्रय कार्यान्वित किया और सबसे अधिक नहीं होगी संभावना नहीं है:)",97:"मरहम",98:"स्क्रॉल",99:"पिंजरे",100:"jQBot T4 भागो",101:"बाद में आदेश",102:"बाद में निर्माण",103:"बाद में जांच करने के लिए",104:"नया व्यापार मार्ग",105:"करने के लिए एक मार्ग बनाने के लिए",106:"इनपुट निर्देशांक",107:"ठीक है",108:"रद्द करें",109:"नाम",110:"लिंक",111:"वर्तमान टैब में खोलें",112:"नए टैब में खोलें",113:"बंद करो",114:"सूची में अंतिम भेजें",115:"+ वर्तमान",116:"वर्तमान समय तक सभी हमलों को रीसेट",117:"साफ कतार फार्मा",118:"बाहर बाद कैर्री",119:"बाद में नष्ट करें",120:"नई लिंक",121:"प्रकार",122:"सुदृढीकरण",123:"सामान्य हमले ",124:"छापे",125:"आवृत्ति",126:"एक्सीडेंटल विस्थापन",127:"हमले के प्रकार",128:"एक हमले",129:"2 अटैक",130:"3 हमलों",131:"5 हमलों",132:"10 के हमलों",133:"15 के हमलों",134:"20 के हमलों",135:"25 के हमलों",136:"30 के हमलों",137:"40 के हमलों",138:"50 के हमलों",139:"75 के हमलों",140:"100 हमले ",141:"गांव",142:"समय",143:"सेना",144:"जुआरी",145:"ट्री",146:"मिट्टी",147:"आयरन",148:"अन्न",149:"प्रेषक",150:"रिसीवर",151:"संसाधन",152:"अवधि",153:"को भेजें",154:"नहीं.",155:"आदेश प्रकार",156:"निर्माण",157:"स्तर",158:"लोग",159:"घड़ी की घटनाओं की अवधि",160:"स्कैनर की अवधि",161:"सब की कुल",162:"सेना ऑर्डर अगर वहाँ एक इमारत है",163:"क्या संसाधनों याद आ रही है पर बिल्डिंग",164:"प्राथमिकता के क्रम में सब बिल्डिंग",165:"त्रिज्या फार्मा",166:"एक्स सेकंड के लिए दूर ले",167:"सैनिकों की मोड़",400:"चीरघर",401:"क्ले गड्ढे",402:"आयरन माइन",403:"फार्म",404:"चीरघर",405:"Brickyard",406:"आयरन वर्क्स",407:"आटा चक्की",408:"बेकरी",409:"गोदाम",410:"खलिहान",411:"लोहार",412:"फोर्ज कवच",413:"अखाड़ा",414:"मुख्य भवन ",415:"रैली प्वाइंट",416:"बाजार",417:"दूतावास",418:"बैरकों",419:"स्थिर",420:"कार्यशाला",421:"अकादमी",422:"गुप्त",423:"टाउन हॉल",424:"निवास",425:"पैलेस",426:"खजाना",427:"वाणिज्य मंडल",428:"महान बैरकों",429:"महान स्थिर",430:"शहर की दीवारों",431:"धरती वॉल",432:"बाड़",433:"राज",434:"शराब की भठ्ठी",435:"Trapper",436:"मधुशाला",437:"महान वेयरहाउस",438:"बिग बार्न",439:"विश्व के आश्चर्य",460:"सैनिकों को आदेश",461:"सैनिकों के एक अध्ययन",462:"बिल्डिंग",463:"सुधार",464:"छुट्टियों के कार्यान्वयन",501:"नियंत्रण",502:"विकल्प",503:"सहायता",504:"छापे",505:"सुदृढीकरण",506:"सामान्य हमले ",507:"रोमियो",508:"जर्मन",509:"Galla",600:"डेटा सफलतापूर्वक सहेज",601:"काम मालिक बना दिया है",602:"सभी अनुप्रयोग सेटिंग्स रीसेट",603:"स्थापित नई त्रिज्या",604:"एक नई कड़ी",605:"एक नया मार्ग जोड़ा गया",606:"त्रुटि",607:"डेटा कतार में शामिल",608:"इस तरह के एक अध्ययन कतार में पहले से ही है",609:"यह इमारत पहले ही विध्वंस के लिए लाइन में खड़े है",610:"सुधार और इसलिए उच्चतम स्तर है",611:"एक दिया सेल में कुछ का निर्माण होता है",612:"यह इमारत इस गांव में निर्माणाधीन है",613:"इमारत और इसलिए उच्चतम स्तर होगा",614:"संचार",615:"सब फार्मा निर्मित",616:"को नष्ट करने के लिए कुछ भी नहीं है",617:"सभी गांवों का ऑटो स्कैनिंग",618:"सैनिकों भेजें",619:"इमारतों के विनाश",620:"भवनों का निर्माण",621:"डीलरों भेजा जा रहा है",622:"इमारतों के स्तर",623:"बाहरी लिंक",624:"त्वरित लिंक",625:"लॉगिन असफलता का स्वचालित प्रविष्टि",626:"बटन विकास",627:"यह गांव दवा सूची में पहले से ही है",628:"खेत चादर से पूरी तरह से निकालें ",629:"गांव दवा सूची में सूचीबद्ध है",630:"पेज jQBot T4",631:"बंद jQBot T4",632:"रीसेट अनुप्रयोग",633:"रन घड़ी घटनाओं रोकें",634:"रन घड़ी घटनाओं भागो",635:"देखना चर जीएम",636:"चर जीएम निकालें",637:"कदम से देखें कुकी कदम",638:"है कुकी बारी आधारित का हटाया",639:"आवेदन चर देखें",640:"minimap लदान के साथ कोई समस्या है, बंद परस्पर विरोधी कार्यक्रम बारी",641:"खोज",642:"खोज सेटिंग्स",643:"त्रिज्या",644:"पूरा खोज",645:"ओएसिस",646:"नीलामी",647:"गांवों",648:"भागो 3 डेनवर",649:"निर्देशांक",650:"अद्यतन",651:"पत्ता का खेत गांव में जोड़ें",652:"ऊपर नुकसान के साथ हमलों को बंद करो",653:"परिवर्तन सहेजे",654:"लॉग",655:"पासवर्ड",656:"एक लॉगिन असफलता के स्वचालित इनपुट की सेटिंग",700:"[3] सैनिकों-भेजें",701:"[3] + भेजा जा रहा सैनिकों",702:"[6] भेजना डीलरों",703:"[6] + भेजा जा रहा डीलरों",704:"[1] सेना की निकासी",705:"[1] + चैलेंज सेना",706:"[4], इमारत ध्वस्त",707:"[4] + इमारत ध्वस्त",708:"[2] सभी की कुल",709:"[2] सभी का कुल +",710:"[5] के सभी (निर्माण) कुल",711:"[5] के सभी (निर्माण) + कुल",1001:"लीजन का फ़ौज",1002:"Praetorian",1003:"Imperian",1004:"हार्स स्काउट",1005:"सम्राट का रिसाला",1006:"कैसर का रिसाला",1007:"तरन",1008:"फायर गुलेल",1009:"सीनेटर",1010:"आबादकार",1011:"हीरो",1012:"Clubswinger",1013:"भाला धारण करनेवाला सिपाही",1014:"Axefighter",1015:"स्काउट",1016:"राजपूत",1017:"ट्यूटनिक रिसाला",1018:"battering राम",1019:"गुलेल",1020:"मुख्य",1021:"आबादकार",1022:"हीरो",1023:"व्यूह",1024:"तलवारधारी",1025:"सलाई",1026:"Theutates थंडर",1027:"ड्र्यूड राइडर",1028:"Haeduan",1029:"तरन",1030:"Trebuchet",1031:"नेता",1032:"आबादकार",1033:"हीरो"};
var lang_it={1:"Chi",2:"Lista Farm",3:"La farmacia linea",4:"Impostazioni applicazione",5:"La coda ГЁ la costruzione truppe",6:"Le truppe coda di studio ",7:"La linea di costruzione di nuovi edifici",8:"I miglioramenti linea degli edifici",9:"La demolizione di coda",10:"Il totale di tutti gli ordini",11:"I miglioramenti linea truppe",12:"Smaltimento delle truppe",13:"Le pagine della nostra",14:"Link utili",15:"Il centro del paese",16:"Attuazione delle vacanze",17:"Trade Routes",18:"Le risorse di vendita e acquisto",19:"Il gioco ГЁ in asta",20:"tutti i villaggi RISORSE",21:"Esercito di tutti i villaggi",22:"Movimenti di truppe di tutti i villaggi",23:"Log",24:"Lista Farm",25:"La farmacia linea",26:"La coda per ordinare le truppe",27:"Le truppe coda di studio ",28:"I miglioramenti linea truppe",29:"Il totale di tutti gli ordini",30:"Smaltimento delle truppe",31:"Onde",32:"Villaggi",33:"tutti i villaggi RISORSE",34:"Esercito di tutti i villaggi",35:"Movimenti di truppe di tutti i villaggi",36:"La costruzione di nuovi edifici linea",37:"I miglioramenti linea degli edifici",38:"La demolizione di coda",39:"Analisi",40:"Analisi di alleanza attacchi",41:"Analysis Report",42:"Hero",43:"Invia automaticamente un eroe per la ricerca",44:"Automatic pompaggio dell'eroe nelle oasi",45:"Cultura",46:"celebrazioni automatico azienda",47:"Commercio e RISORSE",48:"auto-bilanciamento con l'aiuto del RISORSE eroe",49:"auto-bilanciamento RISORSE nei villaggi con l'aiuto dei commercianti",50:"Trade Routes",51:"Acquisto e vendita RISORSE",52:"Asta",53:"Il gioco ГЁ in asta",54:"Comprare le cose giuste",55:"Mappa",56:"Trovare 15 e 9",57:"Trova i deboli e gli indifesi",58:"Mappa delle rotte commerciali",59:"La mappa pentole",60:"Mappa della alleanza",61:"Mappa dei nemici",62:"Sviluppo",63:"Sviluppo Automatico",64:"quest",65:"Lo sviluppo automatico dei nuovi villaggi",66:"Generale",67:"Notebook",68:"Informazioni",69:"Impostazioni applicazione",70:"Applicazione Log",71:"Link utili",72:"Villaggio Centrale",73:"Statistiche",74:"Il numero di truppe",75:"Il livello delle risorse di sviluppo",76:"Statistiche online",77:"Controllo",78:"Il programma in linea",79:"Il programma di attivitГ ",80:"Impostare l'invio di sms",81:"Controllo tramite ICQ",82:"Invia i dati al server coordinare l'alleanza",83:"Accedere al server di coordinare l'alleanza",84:"Army",85:"Reset",86:"Cancella",87:"Salva",88:"OK",89:"Distruggete dopo",90:"Impostazioni applicazione",91:"Lingua",92:"Per qualsiasi domanda, per favore",93:"Nome",94:"Selezionare ad un prezzo inferiore",95:"Acquisti a un prezzo inferiore",96:"Acquisto * non ГЁ implementata e probabilmente non:)",97:"Unguento",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordine tardi",102:"Costruisci dopo",103:"Per indagare piГ№ tardi",104:"rotta commerciale Nuovo",105:"Per creare una rotta verso",106:"coordinate input",107:"OK",108:"Annulla",109:"Nome",110:"Link",111:"Apri in una scheda corrente",112:"Apri in nuova scheda",113:"Stop",114:"Invia l'ultimo nella lista",115:"+ corrente",116:"Reset tutti gli attacchi fino al momento attuale",117:"Clear Queue Pharma",118:"Effettuare piГ№ tardi",119:"Distruggete dopo",120:"Nuovi siti",121:"Tipo",122:"Rafforzamento",123:"L'attacco al solito",124:"Il Raid",125:"Frequenza",126:"spostamento accidentale",127:"Il tipo di attacco",128:"un attacco",129:"2 Attacco",130:"3 attacchi",131:"5 attacchi",132:"10 attacchi",133:"15 attacchi",134:"20 attacchi",135:"25 attacchi",136:"30 attacchi",137:"40 attacchi",138:"50 attacchi",139:"75 attacchi",140:"100 attacco",141:"The Village",142:"Tempo",143:"L'esercito",144:"Gambler",145:"L'Albero",146:"Clay",147:"Iron",148:"Grain",149:"Mittente",150:"ricevitore",151:"RISORSE",152:"Periodo",153:"Invia a",154:"No.",155:"Tipo di ordine",156:"Costruzione",157:"Livello",158:"Il Popolo",159:"Il periodo di eventi timer",160:"Il periodo dello scanner",161:"Il totale di tutti",162:"Ordine l'esercito se vi ГЁ un edificio",163:"Costruire su ciГІ che manca RISORSE",164:"Costruire tutte in ordine di prioritГ ",165:"Raggio Pharma",166:"take away per X secondi",167:"La deviazione delle truppe",400:"Segheria",401:"Clay Pit",402:"Miniera di ferro",403:"La Fattoria",404:"Segheria",405:"Brickyard",406:"Iron Works",407:"Mulino",408:"Panificio",409:"Warehouse",410:"Il Fienile",411:"Fabbro",412:"Armor Forge",413:"Arena",414:"Main Building",415:"Punto Rally",416:"Mercato",417:"L'ambasciata",418:"La Caserma",419:"Stabile",420:"Workshop",421:"L'Accademia",422:"Secret",423:"Town Hall",424:"Residence",425:"Il Palazzo",426:"Tesoro",427:"La Camera di Commercio",428:"Grande Caserma",429:"Grande scuderia",430:"City Walls",431:"Fortificazioni",432:"Fence",433:"Scalpellino",434:"La Birreria",435:"Trapper",436:"Taverna",437:"Grande Magazzino",438:"Grande Barn",439:"Meraviglia del Mondo",460:"Ordina le truppe",461:"Uno studio delle truppe",462:"Costruire",463:"Improvement",464:"Attuazione delle vacanze",501:"Controllo",502:"Opzioni",503:"Aiuto",504:"Il Raid",505:"Rafforzamento",506:"L'attacco al solito",507:"I Romani",508:"I tedeschi",509:"Galla",600:"Dati salvati correttamente",601:"Il compito ГЁ reso titolare",602:"Tutto il ripristino delle impostazioni",603:"Raggio Installato nuovo",604:"Un nuovo link",605:"Aggiunto un nuovo itinerario",606:"Errore",607:"I dati aggiunti alla coda",608:"Tale studio ГЁ giГ  in coda",609:"Questo edificio ГЁ giГ  in fila per la demolizione",610:"Miglioramento e quindi ha il piГ№ alto livello",611:"In una data cellula ГЁ costruire qualcosa",612:"Questo edificio ГЁ in costruzione in questo villaggio",613:"L'edificio e cosГ¬ avrГ  il piГ№ alto livello",614:"Comunicazione",615:"ricreato tutti Pharma",616:"Per distruggere nulla",617:"Auto-scansione di tutti i villaggi",618:"Invia truppe",619:"La distruzione degli edifici",620:"La costruzione degli edifici",621:"Invio commercianti",622:"Livelli degli edifici",623:"Collegamenti esterni",624:"Collegamenti rapidi",625:"Acquisizione automatica di errore di accesso",626:"Sviluppo Buttons",627:"Questo paese ГЁ giГ  nella lista farmaceutico",628:"Rimuovere completamente dal foglio di fattoria ",629:"Il paese ГЁ elencato nella lista farmaceutico",630:"Pagina jQBot T4",631:"Chiudi jQBot T4",632:"Applicazione Reset",633:"Stop agli eventi correre timer",634:"Esegui eventi timer run",635:"variabili Guarda il GM",636:"Rimuovere il GM variabili",637:"Mostra Cookie passo dopo passo",638:"Rimozione di Cookie a turni",639:"Visualizza variabili di applicazione",640:"Problemi con il caricamento della minimappa, disattivare il programma in conflitto",641:"Cerca",642:"Impostazioni di ricerca",643:"Raggio",644:"Ricerca completa",645:"Oasis",646:"Asta",647:"Villaggi",648:"Run Denver 3",649:"Coordinate",650:"Aggiorna",651:"Aggiungi nel villaggio di fattoria di Leaf",652:"Basta attacchi con perdite sopra",653:"Modifiche salvato",654:"Login",655:"password",656:"Impostare l'ingresso automatico di un errore di accesso",700:"[3]-Invia truppe",701:"[3] + Invio truppe",702:"[6] rivenditori Invio",703:"[6] + Invio commercianti",704:"[1] L'estrazione delle forze armate",705:"[1] + Sfida Army",706:"[4], demolire l'edificio",707:"[4] + demolire l'edificio",708:"[2] Il totale di tutti",709:"[2] + totale di tutti",710:"[5] Il totale di tutti (edilizia)",711:"[5] Totale + di tutti (edilizia)",1001:"legionario",1002:"Praetorian",1003:"imperiese",1004:"Scout Horse",1005:"La cavalleria dell'imperatore",1006:"La cavalleria di Cesare",1007:"Taran",1008:"Catapult Fuoco",1009:"il senatore",1010:"coloni",1011:"Hero",1012:"Combattente",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladino",1017:"cavalleria teutonica",1018:"ariete",1019:"Catapult",1020:"The Chief",1021:"coloni",1022:"Hero",1023:"Phalanx",1024:"Spadaccino",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"coloni",1033:"Hero"};
var lang_jp={1:"概要",2:"ファームリスト",3:"ラインの薬局",4:"アプリケーション設定",5:"キューが軍隊を構築している",6:"キューの調査部隊",7:"新しい建物の建設のライン",8:"建物のラインの改善",9:"キューの解体",10:"すべての注文の合計",11:"ラインの改善の軍隊",12:"軍の廃棄",13:"ノートブック",14:"リンク",15:"村の中心部",16:"休日の実装",17:"貿易のルート",18:"売買リソース",19:"ゲームがオークション上にある",20:"すべての村の資源",21:"すべての村の軍",22:"すべての村の軍の動向",23:"ログ",24:"ファームリスト",25:"行の薬局",26:"軍を注文キュー",27:"キューの調査部隊",28:"ラインの改善の軍隊",29:"すべての注文の合計",30:"軍の廃棄",31:"波",32:"村",33:"すべての村の資源",34:"すべての村の軍",35:"すべての村の軍の動向",36:"新しい建物の回線工事",37:"建物のラインの改善",38:"キューの解体",39:"分析",40:"攻撃の提携の分析",41:"分析レポート",42:"ヒーロー",43:"自動的にクエストで英雄を送る",44:"自動オアシスで英雄のポンプ",45:"文化",46:"自動保持お祝い",47:"貿易とリソース",48:"英雄のリソースの助けを借りて、オートバランス",49:"商人の助けを借りて村でオートバランスのリソース",50:"貿易のルート",51:"資源を売買",52:"オークション",53:"ゲームがオークション上にある",54:"右のものを購入",55:"マップ",56:"15と9の検索",57:"弱いと無防備の検索",58:"貿易ルートの地図",59:"マップのパン",60:"アライアンスのマップ",61:"敵のマップ",62:"開発",63:"自動展開",64:"クエスト",65:"新しい村の自動開発",66:"一般",67:"ノートブック",68:"について",69:"アプリケーション設定",70:"ログアプリケーション",71:"リンク",72:"中央の村",73:"統計",74:"軍の数",75:"開発リソースのレベル",76:"統計オンライン",77:"コントロール",78:"スケジュールオンライン",79:"活動のスケジュール",80:"送信するSMSの設定",81:"ICQ経由でコントロール",82:"アライアンスの調整、サーバーに情報を送る",83:"アライアンスの調整、サーバーにログオンします",84:"アーミー",85:"リセット",86:"クリア",87:"保存",88:"OK",89:"後で破壊する",90:"アプリケーション設定",91:"言語",92:"ご質問については、ください",93:"名前",94:"以下の価格で選択して",95:"以下の価格で購入",96:"：）*購入が実装されていないと意志ほとんどない",97:"軟膏",98:"スクロール",99:"ケージ",100:"jQBot T4の実行",101:"後で注文",102:"それ以降のビルド",103:"後で調べるために",104:"新しい貿易ルート",105:"へのルートを作成するには",106:"入力座標",107:"OK",108:"キャンセル",109:"名前",110:"リンク",111:"現在のタブで開く",112:"新しいタブで開く",113:"停止",114:"リスト内の最後の送信",115:"+現在",116:"現在の時間まで、すべての攻撃をリセット",117:"キューの消去ファーマ",118:"後で行う",119:"後で破壊する",120:"新規リンク",121:"タイプ",122:"強化",123:"いつもの攻撃",124:"RAID",125:"周波数",126:"偶然の変位",127:"攻撃の種類",128:"攻撃",129:"2アタック",130:"3の攻撃",131:"5攻撃",132:"10の攻撃",133:"15の攻撃",134:"20の攻撃",135:"25の攻撃",136:"30の攻撃",137:"40の攻撃",138:"50の攻撃",139:"75の攻撃",140:"100攻撃",141:"ヴィレッジ",142:"時間",143:"軍隊",144:"ギャンブラー",145:"ツリー",146:"クレイ",147:"鉄",148:"穀物",149:"送信者",150:"レシーバー",151:"リソース",152:"期間",153:"に送信",154:"いいえ。",155:"注文の種類",156:"建設",157:"レベル",158:"人々",159:"タイマーイベントの期間",160:"スキャナの期間",161:"すべての合計",162:"建物がある場合は、軍の注文",163:"不足しているどのようなリソースの構築",164:"優先度の順にすべての構築",165:"半径ファーマ",166:"X秒のために離れて取る",167:"軍の転換",400:"製材",401:"クレイピット",402:"アイアンマイン",403:"ファーム",404:"製材",405:"ブリックヤード",406:"アイアンワークス",407:"製粉",408:"ベーカリー",409:"倉庫",410:"バーン",411:"鍛冶屋",412:"フォージアーマー",413:"アリーナ",414:"本館",415:"ラリーポイント",416:"市場",417:"大使館",418:"バラック",419:"安定的",420:"ワークショップ",421:"アカデミー",422:"秘密",423:"タウンホール",424:"レジデンス",425:"宮",426:"財務省",427:"商工会議所",428:"大兵舎",429:"厩舎",430:"城壁",431:"地球の壁",432:"フェンス",433:"石工",434:"ビール",435:"トラッパー",436:"タバーン",437:"素晴らしい倉庫",438:"ビッグバーン",439:"世界の驚異",460:"軍隊を注文",461:"軍の研究",462:"ビル",463:"改善",464:"休日の実装",501:"コントロール",502:"オプション",503:"ヘルプ",504:"RAID",505:"強化",506:"いつもの攻撃",507:"ローマ人",508:"ドイツ人",509:"ガーラ",600:"データが正常に保存",601:"タスクは、所有者になります",602:"すべてのアプリケーション設定のリセット",603:"インストールされて新しい半径",604:"新しいリンク",605:"新しいルートを追加",606:"エラー",607:"データがキューに追加",608:"このような研究は、既にキューに挿入されている",609:"この建物は既に解体ラインに立っている",610:"改善とそうでは最高レベルを持っています",611:"特定のセルで何かを構築されている",612:"この建物は、この村に建設中である",613:"建物とその最高レベルを持っている",614:"コミュニケーション",615:"すべての医薬品は、再作成",616:"破壊することは何もない",617:"すべての村のオートスキャン",618:"軍隊を送る",619:"建物の破壊",620:"建築物の建設",621:"送信ディーラー",622:"建築物のレベル",623:"外部リンク",624:"クイックリンク",625:"ログイン失敗の自動入力",626:"ボタンの開発",627:"この村は、医薬品のリストに既に存在する",628:"ファームシートから完全に削除",629:"村の医薬品リストに表示されている",630:"ページjQBot T4",631:"閉じるjQBot T4",632:"アプリケーションのリセット",633:"ランのタイマーイベントを停止します",634:"ランのタイマーイベントを実行する",635:"の表示変数GM",636:"変数を削除GM",637:"ステップ別に表示クッキーのステップ",638:"クッキーのターンベースの取り外し",639:"アプリケーション変数の表示",640:"ミニマップのロードの問題、競合するプログラムをオフにする",641:"検索",642:"検索設定",643:"半径",644:"完全な検索",645:"オアシス",646:"オークション",647:"村",648:"ファイル名を指定して実行デンバー3",649:"座標",650:"アップデート",651:"葉の農村に追加",652:"上記の損失と停止攻撃",653:"保存された変更点",654:"ログイン",655:"パスワード",656:"ログイン失敗の自動入力を設定する",700:"[3] - 送信軍",701:"[3] +派兵",702:"[6]送信ディーラー",703:"[6] +送信ディーラー",704:"[1]軍の抽出",705:"[1] +チャレンジアーミー",706:"[4]、建物を取り壊す",707:"[4] +建物を解体する",708:"[2]すべての合計",709:"[2] +すべての合計",710:"[5]すべて（建物）の合計",711:"[5]すべての+合計（建物）",1001:"軍隊",1002:"プレトリアン",1003:"インペリアン",1004:"馬のスカウト",1005:"皇帝の騎兵",1006:"シーザーの騎兵",1007:"タラン",1008:"火のカタパルト",1009:"上院議員",1010:"開拓者",1011:"ヒーロー",1012:"クラブスインガー",1013:"スピアマン",1014:"Axefighter",1015:"スカウト",1016:"パラディン",1017:"チュートン騎兵",1018:"槌",1019:"カタパルト",1020:"チーフ",1021:"開拓者",1022:"ヒーロー",1023:"ファランクス",1024:"ソードマン",1025:"パスファインダー",1026:"シューテイタスサンダー",1027:"ドルイドライダー",1028:"Haeduan",1029:"タラン",1030:"トレビュシェット",1031:"リーダー",1032:"開拓者",1033:"ヒーロー"};
var lang_kr={1:"정보",2:"팜 목록",3:"라인 약국",4:"응용 프로그램 설정",5:"대기열군대를 건물입니다",6:"대기열 연구 부대 ",7:"새로운 건물의 건설의 라인",8:"건물의 라인의 개선",9:"대기열 발파",10:"모든 주문의 합계",11:"라인 개선 부대",12:"군대의 처리",13:"노트북",14:"유용한 링크",15:"마을의 중심",16:"휴일의 구현",17:"무역 경로",18:"판매 및 구매 자원",19:"게임이 경매에 ",20:"모든 마을 자원",21:"모든 마을 육군",22:"모든 마을의 군대의 운동",23:"로그인",24:"팜 목록",25:"라인 약국",26:"순서 대기열이 부대",27:"대기열 연구 부대 ",28:"라인 개선 부대",29:"모든 주문의 합계",30:"군대의 처리",31:"웨이브",32:"마을",33:"모든 마을 자원",34:"모든 마을 육군",35:"모든 마을의 군대의 운동",36:"새로운 건물의 라인 건설",37:"건물의 라인의 개선",38:"대기열 발파",39:"분석",40:"공격 동맹의 분석",41:"분석 보고서",42:"영웅",43:"자동 탐구에서 영웅을 보내",44:"즐거움의 영웅의 펌핑 자동",45:"문화",46:"자동 들고 기념 행사",47:"무역 및 자원",48:"영웅 자원의 도움으로 자동 밸런싱",49:"상인의 도움으로 마을에서 자동 밸런싱 자원",50:"무역 경로",51:"자료를 구매 및 판매",52:"옥션",53:"게임이 경매에 ",54:"올바른 것을 구매",55:"지도",56:"15 9 찾기",57:"나약하고 무방비 찾기 ",58:"무역 노선지도",59:"지도 냄비",60:"동맹의지도",61:"원수의지도",62:"개발",63:"자동 개발",64:"퀘스트",65:"새로운 마을의 자동 개발",66:"일반",67:"노트북",68:"정보",69:"응용 프로그램 설정",70:"로그 응용 프로그램",71:"유용한 링크",72:"중앙 마을",73:"통계",74:"군대의 숫자",75:"발전 자원의 수준",76:"통계 온라인",77:"제어",78:"일정 온라인",79:"활동의 일정",80:"보내기 SMS 설정",81:"ICQ를 통해 제어",82:"동맹을 조정 서버에 정보를 보내기",83:"동맹을 조정 서버에 로그온",84:"육군",85:"재설정",86:"지우기",87:"저장",88:"OK",89:"나중에 파괴",90:"응용 프로그램 설정",91:"언어",92:"어떤 질문, 제발 ",93:"이름",94:"아래의 가격으로 선택",95:"아래의 가격으로 구입",96:") * 구입가 구현되지 않고 않습니다 대부분 없다",97:"연고",98:"스크롤",99:"케이지",100:"jQBot T4 실행",101:"나중에 주문",102:"나중에 건설",103:"나중에 조사",104:"새로운 무역 루트",105:"에 대한 경로를 만들려면",106:"입력 좌표",107:"OK",108:"취소",109:"이름",110:"링크",111:"현재 탭에서 열기",112:"새 탭에서 열기",113:"그만하세요",114:"목록에서 마지막으로 보내기",115:"+ 현재",116:"현재 시간까지 모든 공격을 재설정",117:"지우기 대기열 제약",118:"나중에 수행",119:"나중에 파괴",120:"새 링크",121:"입력",122:"강화",123:"일반적인 공격",124:"레이드",125:"주파수",126:"사고 변위",127:"공격의 유형",128:"공격",129:"2 공격",130:"3 공격",131:"5 공격",132:"10 공격",133:"15 공격",134:"20 공격",135:"25 공격",136:"30 공격",137:"40 공격",138:"50 공격",139:"75 공격",140:"100 공격",141:"마을",142:"시간",143:"군대",144:"갬블러",145:"나무",146:"클레이",147:"철",148:"곡물",149:"보낸 사람",150:"수신기",151:"자원",152:"기간",153:"보내기",154:"아니요",155:"주문 형식",156:"건설",157:"수준",158:"사람들",159:"타이머 이벤트 기간",160:"스캐너의 시대",161:"모든 총",162:"건물이있다면 군대를 주문",163:"자원없내용에 빌딩",164:"우선 순위의 순서로 모든 빌딩",165:"반경 제약",166:"X의 초 데려가",167:"군대의 전환",400:"사우밀",401:"클레이 피트",402:"이런 마인 ",403:"더 팜 (The Farm)",404:"사우밀",405:"브릭",406:"철공소",407:"플라워 밀",408:"베이커리",409:"웨어 하우스",410:"반",411:"블랙",412:"포지 갑옷",413:"아레나",414:"본관",415:"랠리 포인트",416:"시장",417:"대사관",418:"배럭스",419:"안정",420:"워크샵",421:"아카데미",422:"비밀",423:"타운 홀",424:"거주",425:"궁",426:"재무",427:"상공 회의소",428:"위대한 배럭스",429:"위대한 안정",430:"도시 성벽",431:"지구 벽",432:"울타리",433:"스톤마슨",434:"주조",435:"사냥꾼",436:"선술집",437:"위대한 창고",438:"빅 반",439:"세계의 불가사의",460:"군대를 주문",461:"군대의 연구",462:"빌딩",463:"개선",464:"휴일의 구현",501:"제어",502:"옵션",503:"도움말",504:"레이드",505:"강화",506:"일반적인 공격",507:"로마",508:"독일",509:"갈라",600:"데이터가 성공적으로 저장되었습니다",601:"작업주인을 만들어",602:"모든 응용 프로그램 설정 재설정",603:"설치 새 반경",604:"새 링크",605:"새 경로를 추가",606:"오류",607:"데이터가 대기열에 추가",608:"이러한 연구대기열에 이미",609:"이 건물이미 철거를 위해 줄을 서있다",610:"개선 등가장 높수준을 가지고",611:"특정 세포에서 뭔가를 만들 수 있습니다",612:"이 건물은이 마을에서 건설 아래에있는",613:"건물 등 최고 수준의 것입니다",614:"커뮤니케이션",615:"모든 제약을 재창조",616:"파괴하려면 아무것도 아니다",617:"모든 마을의 자동 검색",618:"군대 보내기 ",619:"건물의 파괴",620:"건물의 건설",621:"딜러 보내기",622:"건물의 수준",623:"외부 링크",624:"빠른 연결",625:"로그인 실패의 자동 입력",626:"버튼 개발",627:"이 마을이미 제약 목록에있는",628:"농장 시트에서 완전히 제거 ",629:"마을이 제약 목록에 나열됩니다",630:"페이지 jQBot T4",631:"닫기 jQBot T4",632:"재설정 응용 프로그램",633:"실행 타이머 이벤트를 중지",634:"실행 타이머 이벤트를 실행",635:"보기 변수 GM",636:"변수 GM을 제거",637:"단계로보기 쿠키의 단계",638:"쿠키의 설정 기반의 제거",639:"응용 프로그램 변수를보기",640:"minimap 로딩에 문제가, 충돌을 일으키프로그램을 해제",641:"검색",642:"검색 설정",643:"반경",644:"전체 검색",645:"오아시스",646:"옥션",647:"마을",648:"실행 덴버 3",649:"좌표",650:"업데이트",651:"리프의 농촌에 추가",652:"위 손실과 함께 공격을 그만하세요",653:"변경 저장",654:"로그인",655:"비밀 번호",656:"로그인 실패의 자동 입력을 설정",700:"[3] - 군대 보내기 ",701:"[3] + 보내기 부대",702:"[6] 보내기 딜러",703:"[6] + 보내기 딜러",704:"[1] 군대의 추출",705:"[1] + 도전 육군",706:"[4] 건물을 철거",707:"[4] + 건물 철거",708:"[2] 모두의 총",709:"모든 중 [2] + 총",710:"[5] 모든 (건물)의 총",711:"[5] 모든 (건물)의 + 총",1001:"군인",1002:"근위병",1003:"Imperian",1004:"호스 스카우트",1005:"황제의 기병대",1006:"카이사르의 기병대",1007:"타란",1008:"소방 투석기",1009:"의원",1010:"세틀러",1011:"영웅",1012:"Clubswinger",1013:"스피 어맨",1014:"Axefighter",1015:"스카우트",1016:"팔라딘",1017:"독일의 기병대",1018:"군자",1019:"투석기",1020:"최고",1021:"세틀러",1022:"영웅",1023:"팔란",1024:"연도",1025:"패스 파인더",1026:"Theutates 선더",1027:"드뤼드 라이더",1028:"Haeduan",1029:"타란",1030:"투석",1031:"리더",1032:"세틀러",1033:"영웅"};
var lang_lt={1:"Apie",2:"Ūkio sąrašas",3:"linija vaistinė",4:"Application Settings",5:"eilę stato karius",6:"eilės studijų karių ",7:"iš naujų pastatų statybą linija",8:"linija gerinti pastatų",9:"eilėje griovimo",10:"visų užsakymų iš viso",11:"linija pagerinti karių",12:"Atliekų karių",13:"Notepad",14:"Naudingos nuorodos",15:"gyvenvietės centre",16:"įgyvendinimas šventės",17:"prekybos keliai",18:"pirkimo ir pardavimo IŠTEKLIAI",19:"žaidimas yra aukcionas",20:"visi kaimų IŠTEKLIAI",21:"armija visus kaimus",22:"Judesiai karių visų kaimų",23:"Prisijungti",24:"Ūkio sąrašas",25:"linija vaistinė",26:"eilėje užsakymo kariai",27:"eilės studijų karių ",28:"linija pagerinti karių",29:"visų užsakymų iš viso",30:"Atliekų karių",31:"Bangos",32:"Villages",33:"visi kaimų IŠTEKLIAI",34:"armija visus kaimus",35:"Judesiai karių visų kaimų",36:"linija naujų pastatų statybą",37:"linija gerinti pastatų",38:"eilėje griovimo",39:"analizė",40:"analizė išpuolių aljansą",41:"analizės ataskaita",42:"Hero",43:"Automatiškai siųsti herojus ant Quest",44:"Automatinė siurbimo iš herojus oazės",45:"Kultūra",46:"Automatinis holdingo Šventės",47:"Prekybos ir IŠTEKLIAI",48:"Auto-balansavimas su herojaus IŠTEKLIŲ padėti",49:"Auto-balansavimo IŠTEKLIŲ su pirkliai padėti kaimuose",50:"prekybos keliai",51:"Pirkimas ir pardavimas IŠTEKLIAI",52:"Aukcionai",53:"žaidimas yra aukcionas",54:"Perkamoji teisingus dalykus",55:"Žemėlapis",56:"rasti 15 ir 9",57:"Surasti silpnas ir beginklis",58:"žemėlapis prekybos keliai",59:"žemėlapį keptuvės",60:"žemėlapis aljansą",61:"žemėlapis priešai",62:"Kūrimas",63:"Automatinis plėtra",64:"Quest",65:"Automatinis kuriant naujus kaimus",66:"Bendrosios nuostatos",67:"notebook",68:"Apie",69:"Application Settings",70:"Prisijungti taikymas",71:"Naudingos nuorodos",72:"Centrinės kaimas",73:"Statistika",74:"karių skaičių",75:"plėtros išteklių lygį",76:"Statistika internete",77:"Kontrolė",78:"grafiką internete",79:"veiklos tvarkaraštis",80:"nustatymas SMS",81:"Valdymo per ICQ",82:"Siųsti į serverį informacijos koordinavimo aljansą",83:"Prisijungti prie serverio koordinavimo aljansą",84:"armija",85:"Reset",86:"Išvalyti",87:"Išsaugoti",88:"Gerai",89:"Destroy vėliau",90:"Application Settings",91:"Kalba",92:"Dėl kokių klausimų, prašome",93:"Vardas",94:"Pasirinkite kaina toliau",95:"Pirkimo kaina toliau",96:"* Pirkimas neįgyvendinamas ir, greičiausiai, bus ne:)",97:"Tepalas",98:"Eikite",99:"Cage",100:"Vykdyti jQBot T4",101:"Eilės Vėliau",102:"Pastatyk vėliau",103:"ištirti vėliau",104:"Naujas prekybos kelias",105:"Jei norite sukurti maršrutą",106:"įvesties koordinuoja",107:"Gerai",108:"Atšaukti",109:"Vardas",110:"Nuoroda",111:"Atidaryti dabartinį skirtuką",112:"Atidaryti naują skirtuką",113:"Stop",114:"Siųsti paskutinis į sąrašą",115:"+ srovę",116:"Atkurti viską išpuolių iki dabartinio laiko",117:"Išvalyti eilę Pharma",118:"Atlikti vėliau",119:"Destroy vėliau",120:"Naujos nuorodos",121:"Tipas",122:"stiprinimas",123:"Paprastai ataka",124:"RAID",125:"dažnis",126:"Avarijų poslinkis",127:"atakos tipo",128:"ataka",129:"2 Attack",130:"3 išpuolių",131:"5 išpuolių",132:"10 išpuolių",133:"15 išpuolių",134:"20 išpuolių",135:"25 išpuolių",136:"30 išpuolių",137:"40 išpuolių",138:"50 išpuolių",139:"75 išpuolių",140:"100 ataka",141:"kaimas",142:"Laikas",143:"kariuomenė",144:"Žaidėjas",145:"Medis",146:"Molis",147:"Geležinis",148:"grain",149:"Siuntėjas",150:"imtuvas",151:"Ištekliai",152:"Laikotarpis",153:"Siųsti",154:"Ne!",155:"Užsakymo tipas",156:"Statyba",157:"lygis",158:"Žmonės",159:"laikmačio renginių laikotarpis",160:"iš skaitytuvo laikotarpis",161:"Visų viso",162:"Eilės kariuomenė, jei yra pastatas",163:"Remiantis ko trūksta IŠTEKLIAI",164:"Statybos visos prioriteto tvarka",165:"Spindulys Pharma",166:"paimti X sekundžių",167:"karių nukreipimo",400:"Lentpjūvė",401:"Molio karjeras",402:"Geležies kasykla",403:"ūkis",404:"Lentpjūvė",405:"Plytinė",406:"Iron Works",407:"malūnas",408:"Bakery",409:"sandėlis",410:"tvartas",411:"kalvė",412:"Forge Armor",413:"Arena",414:"Gyvenamasis pastatas",415:"Susibūrimo vieta",416:"rinka",417:"ambasada",418:"Kareivinės",419:"Stabilus",420:"Seminaras",421:"Akademija",422:"Paslaptis",423:"rotušė",424:"gyvenamoji vieta",425:"Palace",426:"iždo",427:"prekybos rūmai",428:"Didžiosios kareivinės",429:"Didžioji arklidė",430:"City Walls",431:"Žemė siena",432:"Tvora",433:"mūrininkas",434:"Alaus darykla",435:"medžiotojas spąstais",436:"užeiga",437:"Didysis sandėlis",438:"Big Barn",439:"Wonder of the World",460:"Eilės kariai",461:"karių studija",462:"pastatas",463:"gerinimas",464:"įgyvendinimas šventės",501:"Kontrolė",502:"Options",503:"Pagalba",504:"RAID",505:"stiprinimas",506:"Paprastai ataka",507:"romansas",508:"vokiečiai",509:"Galla",600:"Duomenys sėkmingai išsaugoti",601:"uždavinys yra pagaminti savininkas",602:"Visos programos parametrus iš naujo",603:"Įdiegti naują spindulys",604:"naują nuorodą",605:"pridėjo naują maršrutą",606:"Klaida",607:"duomenų pridėta į eilę",608:"Toks tyrimas jau yra eilėje",609:"Šis pastatas jau stovi eilėje griovimo",610:"gerinimas ir todėl turi aukščiausio lygio",611:"Per tam tikrą ląstelių yra sukurti kažką",612:"Šis pastatas yra statomas šiame kaime",613:"pastato, todėl turės aukščiausiu lygiu",614:"Komunikacija",615:"atkūrė visas Pharma",616:"sunaikinti nieko",617:"Auto-skenavimo visų kaimų",618:"Siųsti karių",619:"pastatų sunaikinimo",620:"pastatų statybos",621:"siuntimas tarpininkai",622:"lygiai pastatai",623:"Išorinės nuorodos",624:"Greitosios nuorodos",625:"Automatinis įrašo prisijungimo nesėkmės",626:"mygtukai plėtra",627:"Šis kaimas yra jau vaistų sąrašo",628:"Pašalinti visiškai iš ūkio lapas",629:"kaimas išvardytų vaistų sąrašo",630:"Puslapio jQBot T4",631:"Uždaryti jQBot T4",632:"Atstatyti taikymas",633:"Stop paleisti laikmatį renginiai",634:"Run Run laikmatis renginiai",635:"Peržiūri kintamųjų GM",636:"Pašalinti kintamųjų GM",637:"Rodyti Cookie yra žingsnis po žingsnio",638:"pašalinimas Cookie ruožtu pagrįstos",639:"Peržiūrėti taikymo kintamųjų",640:"Problemos su pakrovimo mini, išjunkite kilo programa",641:"Ieškoti",642:"Paieška Nustatymai",643:"Spindulys",644:"Paieška baigta",645:"Oazė",646:"Aukcionai",647:"Villages",648:"Vykdyti Denver 3",649:"Koordinatės",650:"Atnaujinti",651:"Pridėti ūkių kaime Leaf",652:"Stop išpuolių nuostoliai viršaus",653:"Pakeitimai išsaugoti",654:"Prisijungti",655:"slaptažodis",656:"Nustatyti automatinio indėlis prisijungimo nesėkmės",700:"[3], siųsti karius",701:"[3] + siuntimas kariai",702:"[6] siuntimas tarpininkai",703:"[6] + siuntimas tarpininkai",704:"[1] kariuomenės gavyba",705:"[1] + Challenge,armija ",706:"[4], nugriauti pastatą",707:"[4] + nugriauti pastatą",708:"[2] visų iš viso",709:"[2] + Bendras visų",710:"[5], visų (pastatas) iš viso",711:"[5] + viso visos (pastatas)",1001:"legionierių",1002:"Pretorionas",1003:"Imperionas",1004:"Arklio Scout",1005:"imperatoriaus raitelių",1006:"Cezario kavalerija",1007:"Taranas",1008:"Ugnies Katapulta",1009:"senatorius",1010:"Settler",1011:"Hero",1012:"pėstininkas su kuoka",1013:"ietininkas",1014:"su kirviu",1015:"Scout",1016:"Paladin",1017:"Kryžiuočių kavalerija",1018:"taranas",1019:"Katapulta",1020:"Vyriausiasis",1021:"Settler",1022:"Hero",1023:"falanga",1024:"kardu",1025:"Pathfinder",1026:"Raitas perkūnas",1027:"Druid Rider",1028:"hedujas",1029:"Taranas",1030:"Trebuchet",1031:"Leader",1032:"Settler",1033:"Hero"};
var lang_lv={1:"Par",2:"Farm Saraksts",3:"līnija aptieka",4:"Application Settings",5:"rindā ir ēka karaspēka",6:"rinda pētījumu karaspēks",7:"līniju jaunu ēku būvniecība",8:"līnija uzlabojumi ēku",9:"rindā nojaukšanu",10:"kopā par visiem pasūtījumiem",11:"līnija uzlabojumi karaspēka",12:"Apglabāšana karaspēka",13:"Notebook",14:"Noderīgas saites",15:"ciemata centru",16:"īstenošana brīvdienas",17:"Tirdzniecības Routes",18:"pārdošanas un pirkšanas RESOURCES",19:"Spēle ir izsolē",20:"visu ciematu RESOURCES",21:"armija visu ciematu",22:"kustības karaspēks visu ciematu",23:"Log",24:"Farm Saraksts",25:"līnija aptieka",26:"rinda pasūtījuma karaspēka",27:"rinda pētījumu karaspēks",28:"līnija uzlabojumi karaspēka",29:"kopā par visiem pasūtījumiem",30:"Apglabāšana karaspēka",31:"Viļņi",32:"Villages",33:"visu ciematu RESOURCES",34:"armija visu ciematu",35:"kustības karaspēks visu ciematu",36:"līnija jaunu ēku būvniecība",37:"līnija uzlabojumi ēku",38:"rindā nojaukšanu",39:"Analysis",40:"Analīze par uzbrukumu alianses",41:"analīzes protokola",42:"Hero",43:"Automātiski nosūtīt varonis meklējumos",44:"Automātiska sūknēšanai varonis oāzes",45:"Kultūra",46:"Automatic saimniecība svinībās",47:"Tirdzniecības un RESOURCES",48:"auto-līdzsvarošana ar palīdzību varonis RESOURCES",49:"auto-līdzsvarošanas RESURSU, kas, izmantojot komersantu ciematu",50:"Tirdzniecības Routes",51:"pirkšana un pārdošana RESOURCES",52:"Izsoles",53:"Spēle ir izsolē",54:"Buying pareizās lietas",55:"Map",56:"Meklējot 15 un 9",57:"Atrast vājš un neaizsargāts",58:"Karte tirdzniecības ceļi",59:"karte pannas",60:"karte alianse",61:"karte ienaidniekiem",62:"Attīstības",63:"Automatic Development",64:"quests",65:"Automātiska jaunu ciematu",66:"General",67:"Notebook",68:"Par",69:"Application Settings",70:"Log Application",71:"Noderīgas saites",72:"Central Village",73:"Statistika",74:"karaspēka",75:"attīstības līmenis RESOURCES",76:"Statistika Online",77:"Control",78:"grafiks online",79:"grafiks aktivitāte",80:"Setting nosūtot sms",81:"Vadība ar ICQ",82:"Nosūtīt informāciju uz serveri koordinācijas apvienība",83:"Pieteikties uz servera koordinācijas apvienība",84:"armija",85:"Reset",86:"Dzēst",87:"Saglabāt",88:"OK",89:"Destroy vēlāk",90:"Application Settings",91:"Valoda",92:"Ja jums rodas jautājumi, lūdzu,",93:"Nosaukums",94:"Izvēlēties zemāku cenu, nekā",95:"Iepirkumu zemāku cenu, nekā",96:"* Iepirkumu nav īstenots, un, visticamāk, nav:)",97:"Ziede",98:"Ritiniet",99:"Būris",100:"Run jQBot T4",101:"Order Vēlāk",102:"Veidot vēlāk",103:"Lai izpētītu vēlāk",104:"New tirdzniecības ceļš",105:"Lai izveidotu maršrutu uz",106:"ievadi koordinātes",107:"OK",108:"Atcelt",109:"Nosaukums",110:"Saite",111:"Atvērt pašreizējo cilni",112:"Atvērt jaunā cilnē",113:"Stop",114:"Nosūtīt pēdējais sarakstā",115:"+ pašreizējo",116:"Atjaunot visus uzbrukumus, kamēr pašreizējais laiks",117:"Dzēst rindas Pharma",118:"Veikt vēlāk",119:"Destroy vēlāk",120:"New Links",121:"Veids",122:"pastiprināšana",123:"Parastā uzbrukums",124:"Raid",125:"Frequency",126:"nejaušu pārvietošanos",127:"veida uzbrukums",128:"uzbrukums",129:"2 Attack",130:"3 uzbrukumiem",131:"5 uzbrukumiem",132:"10 uzbrukumiem",133:"15 uzbrukumiem",134:"20 uzbrukumiem",135:"25 uzbrukumiem",136:"30 uzbrukumiem",137:"40 uzbrukumiem",138:"50 uzbrukumiem",139:"75 uzbrukumiem",140:"100 uzbrukuma",141:"Village",142:"Laiks",143:"armija",144:"Gambler",145:"Tree",146:"Clay",147:"Iron",148:"grain",149:"Sūtītājs",150:"Saņēmējs",151:"RESURSI",152:"Periods",153:"Nosūtīt",154:"Nē.",155:"Pasūtījuma veids",156:"Būvniecība",157:"Level",158:"Cilvēki",159:"periods taimeris pasākumi",160:"periods skeneris",161:"Kopējais visu",162:"Kārtība armijā, ja ir ēka",163:"Balstoties uz to, kas ir pazudis RESOURCES",164:"Building visi prioritārā secībā",165:"Rādiuss Pharma",166:"take away for X sekundes",167:"novirzīšanās karaspēka",400:"Sawmill",401:"Māla karjers",402:"Dzelzs Mine",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Iron Works",407:"Milti Mill",408:"Maiznīca",409:"Noliktava",410:"Barn",411:"Kalēja",412:"Forge Armor",413:"Arēna",414:"Main Building",415:"Rally Point",416:"Tirgus",417:"Vēstniecība",418:"Kazarmas",419:"Stable",420:"darbnīca",421:"Akadēmija",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Valsts kase",427:"Tirdzniecības kamera",428:"Lielās Kazarmas",429:"Great Stable",430:"City Walls",431:"Stallis",432:"Žoga",433:"akmenslauzēja",434:"Alus darītava",435:"Trapper",436:"Tavern",437:"Lielā Noliktava",438:"Big Barn",439:"Wonder of the World",460:"Kārtība karaspēka",461:"pētījums par karaspēka",462:"Building",463:"uzlabošana",464:"īstenošana brīvdienas",501:"Control",502:"Options",503:"Help",504:"Raid",505:"pastiprināšana",506:"Parastā uzbrukums",507:"Romans",508:"Vācieši",509:"Galla",600:"Datu veiksmīgi saglabāts",601:"uzdevums ir izgatavota īpašnieks",602:"Visi lietojumprogrammu iestatījumus reset",603:"Installed jaunas rādiuss",604:"jaunu saiti",605:"Pievienots jauns ceļš",606:"Error",607:"Datu pievienots rindā",608:"Šāds pētījums jau rindā",609:"Šī ēka jau stāvot rindā, lai nojaukšanas",610:"uzlabošana un tā ir visaugstākajā līmenī",611:"In konkrētā šūna ir veidot kaut ko",612:"Šī ēka tiek būvēta šajā ciemā",613:"ēkā, un tā būs visaugstākajā līmenī",614:"Komunikācija",615:"pārbūvēts visiem Pharma",616:"Lai iznīcinātu nav nekas",617:"Auto-skenēšana visu ciematu",618:"Nosūtīt karaspēks",619:"iznīcināšana ēku komplekss",620:"ēku būvniecības",621:"Sending veicēji",622:"līmeņi ēku",623:"Ārējās saites",624:"Quick Links",625:"Automātiska ieraksta login neveiksmes",626:"Pogas Development",627:"Šis ciemats ir jau farmācijas sarakstā",628:"Noņemt pilnīgi no saimniecības lapa",629:"Ciemats ir uzskaitītas farmācijas sarakstā",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Beidziet palaist taimeri notikumi",634:"Run palaist taimeris pasākumi",635:"Skatās mainīgie GM",636:"Noņemt mainīgie GM",637:"View Cookie ir soli pa solim",638:"likvidēšana Cookie kārta balstītu",639:"View pieteikums mainīgie lielumi",640:"Problēmas ar iekraušanu minimap, izslēdziet konfliktējošās programmu",641:"Meklēt",642:"Meklēt Settings",643:"Rādiuss",644:"Meklēt pilnīgu",645:"Oasis",646:"Izsoles",647:"Villages",648:"Run Denver 3",649:"koordinātes",650:"Update",651:"Pievienot saimniecības ciematā Leaf",652:"Stop uzbrukumi ar zaudējumiem virs",653:"Izmaiņas saglabātas",654:"Pieteikties",655:"parole",656:"Setting automātisku ievadi login neveiksmes",700:"[3]-Send karaspēka",701:"[3] + sūtīšana karaspēka",702:"[6] Sending veicēji",703:"[6] + sūtīšana veicēji",704:"[1] ieguves armijas",705:"[1] + Challenge armiju",706:"[4], nojaukt",707:"[4] + nojaukt",708:"[2] Kopējais visu",709:"[2] + Kopējais visu",710:"[5] Kopējais visu (ēkas)",711:"[5] + Kopējais visu (ēkas)",1001:"leģionārs",1002:"Praetorian",1003:"Imperian",1004:"Zirgs scout",1005:"jātnieki no imperators",1006:"jātnieki Cēzara",1007:"Taran",1008:"Uguns Katapulta",1009:"Senator",1010:"Kolonists",1011:"Hero",1012:"Rungas vēzētājs",1013:"Spearman",1014:"Karacirvja vēzētājs",1015:"Scout",1016:"Paladin",1017:"Ģermāņu jātnieki",1018:"battering ram",1019:"Katapulta",1020:"Galvenais",1021:"Kolonists",1022:"varonis",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Zibens Jātnieks",1027:"druīds Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Kolonists",1033:"Hero"};
var lang_my={1:"Tentang",2:"Senarai Ladang",3:"The farmasi line",4:"Tetapan Permohonan",5:"giliran adalah bangunan tentera",6:"Pasukan kajian barisan ",7:"Keturunan pembinaan bangunan baru",8:"Barisan penambahbaikan bangunan",9:"The perobohan beratur",10:"Jumlah segala perintah",11:"Peningkatan baris tentera",12:"Pelupusan tentera",13:"The Notebook",14:"Pautan",15:"Pusat kampung",16:"Pelaksanaan cuti",17:"Laluan Perdagangan",18:"Penjualan dan pembelian SUMBER",19:"Permainan ini pada lelongan",20:"semua kampung-kampung SUMBER",21:"Tentera semua kampung-kampung",22:"Pergerakan tentera semua kampung-kampung",23:"Masuk",24:"Senarai Ladang",25:"The farmasi line",26:"The beratur memerintahkan tentera",27:"Pasukan kajian barisan ",28:"Peningkatan baris tentera",29:"Jumlah segala perintah",30:"Pelupusan tentera",31:"Gelombang",32:"Kampung",33:"semua kampung-kampung SUMBER",34:"Tentera semua kampung-kampung",35:"Pergerakan tentera semua kampung-kampung",36:"Pembinaan garis bangunan baru",37:"Barisan penambahbaikan bangunan",38:"The perobohan beratur",39:"Analisis",40:"Analisis perikatan serangan",41:"Laporan Analisis",42:"Hero",43:"secara automatik menghantar seorang wira pada usaha",44:"automatik mengepam wira dalam oasis",45:"Kebudayaan",46:"automatik memegang sambutan",47:"Perdagangan dan SUMBER",48:"automatik mengimbangi dengan bantuan SUMBER wira",49:"automatik mengimbangkan SUMBER di kampung-kampung dengan bantuan pedagang",50:"Laluan Perdagangan",51:"Membeli dan menjual SUMBER",52:"Lelong",53:"Permainan ini pada lelongan",54:"Membeli perkara yang betul",55:"Peta",56:"Mencari 15 dan 9",57:"Cari yang lemah dan tidak bersenjata",58:"Map of laluan perdagangan",59:"peta tersebut kuali",60:"Map of persekutuan",61:"Peta musuh-musuh",62:"Pembangunan",63:"Pembangunan automatik",64:"pencarian",65:"pembangunan automatik kampung-kampung baru",66:"Umum",67:"Notebook",68:"Tentang",69:"Tetapan Permohonan",70:"Masuk Permohonan",71:"Pautan",72:"Tengah Kampung",73:"Statistik",74:"Bilangan askar",75:"Tahap pembangunan SUMBER",76:"Statistik Online",77:"Kawalan",78:"The talian jadual",79:"Jadual aktiviti",80:"Menetapkan menghantar sms",81:"Kawalan melalui ICQ",82:"Hantar maklumat kepada pelayan penyelaras persekutuan",83:"Masuk ke pelayan penyelaras persekutuan",84:"Tentera",85:"Reset",86:"Clear",87:"Simpan",88:"OK",89:"Musnahkan kemudian",90:"Tetapan Permohonan",91:"Bahasa",92:"Bagi sebarang pertanyaan, sila",93:"Nama",94:"Pilih pada harga yang di bawah",95:"Membeli pada harga di bawah",96:"Pembelian * tidak dilaksanakan dan akan paling tidak mungkin:)",97:"salap",98:"Tatal",99:"Sangkar",100:"Run jQBot T4",101:"Perintah Kemudian",102:"Membina kemudian",103:"Untuk siasat kemudian",104:"Baru laluan perdagangan",105:"Untuk membuat laluan ke",106:"input koordinat",107:"OK",108:"Batal",109:"Nama",110:"Link",111:"Buka di tab semasa",112:"Buka di tab baru",113:"Stop",114:"Hantar terakhir dalam senarai",115:"+ semasa",116:"Set semula semua serangan sehingga masa sekarang",117:"Clear Queue Pharma",118:"Menjalankan kemudian",119:"Musnahkan kemudian",120:"Pautan Baru",121:"Jenis",122:"Pengukuhan",123:"Serangan biasa",124:"The Raid",125:"Frequency",126:"anjakan Sengaja",127:"Jenis serangan",128:"serangan",129:"2 Attack",130:"3 serangan",131:"5 serangan",132:"10 serangan",133:"15 serangan",134:"20 serangan",135:"25 serangan",136:"30 serangan",137:"40 serangan",138:"50 serangan",139:"75 serangan",140:"100 serangan",141:"Village",142:"Masa",143:"Tentera",144:"penjudi",145:"Pohon itu",146:"Tanah Liat",147:"Besi",148:"Grain",149:"Penghantar",150:"Penerima",151:"SUMBER",152:"Tempoh",153:"Hantar ke",154:"No",155:"Perintah jenis",156:"Pembinaan",157:"Level",158:"Rakyat",159:"Tempoh peristiwa pemasa",160:"Tempoh pengimbas",161:"Jumlah semua",162:"Perintah tentera jika terdapat bangunan",163:"Bangunan pada apa yang hilang SUMBER",164:"Membina semua mengikut keutamaan",165:"Radius Pharma",166:"mengambil untuk saat X",167:"The lencongan tentera",400:"Kilang Papan",401:"Kuari Tanah Liat",402:"Besi Mine",403:"Farm",404:"Kilang Papan",405:"tempat pembuatan batu bata",406:"Iron Works",407:"Tepung Mill",408:"Roti",409:"Gudang",410:"The Barn",411:"Kedai Senjata",412:"Forge Armor",413:"Arena",414:"Bangunan Utama",415:"Titik Perhimpunan",416:"Pasaran",417:"Kedutaan",418:"Berek ini",419:"Stabil",420:"Bengkel",421:"Akademi",422:"Rahsia",423:"Town Hall",424:"Residence",425:"Palace",426:"Perbendaharaan",427:"Dewan Perniagaan",428:"Berek Besar",429:"Kandang Kuda Besar",430:"Tembok Bandar",431:"Tembok Tanah",432:"Pagar",433:"tukang batu",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Gudang Besar",438:"Big Barn",439:"Wonder of the World",460:"Perintah tentera",461:"Satu kajian tentera",462:"Bangunan",463:"Improvement",464:"Pelaksanaan cuti",501:"Kawalan",502:"Pilihan",503:"Bantuan",504:"The Raid",505:"Pengukuhan",506:"Serangan biasa",507:"Orang-orang Rom",508:"Orang-orang Jerman",509:"Galla",600:"Data berjaya disimpan",601:"Tugas ini dibuat pemilik",602:"Semua permohonan semula tetapan",603:"Dipasang jejari baru",604:"A link baru",605:"Ditambah laluan baru",606:"Ralat",607:"Data dimasukkan ke dalam barisan",608:"itu kajian sudah dalam barisan",609:"Bangunan ini sudah berdiri sejajar untuk perobohan",610:"Peningkatan dan demikian juga dengan peringkat tertinggi",611:"Di sel yang diberikan adalah sesuatu yang membina",612:"Bangunan ini sedang dalam pembinaan di kampung ini",613:"Bangunan dan sebagainya akan mempunyai tahap tertinggi",614:"Komunikasi",615:"dicipta semula semua pharma",616:"Untuk memusnahkan apa-apa",617:"Auto-mengimbas semua kampung-kampung",618:"Hantar askar",619:"Pemusnahan bangunan",620:"Pembinaan bangunan",621:"Menghantar peniaga",622:"Tahap bangunan",623:"pautan luar",624:"Pautan",625:"masuk automatik kegagalan login",626:"Butang Pembangunan",627:"kampung ini sudah ada dalam senarai farmaseutikal",628:"Buang sepenuhnya dari lembaran ladang ",629:"kampung ini tersenarai dalam senarai farmasi",630:"Laman jQBot T4",631:"Tutup jQBot T4",632:"Reset Permohonan",633:"Hentikan acara pemasa berjalan",634:"Run acara pemasa berjalan",635:"Melihat pembolehubah GM",636:"Keluarkan GM pembolehubah",637:"langkah kuki Lihat dengan langkah",638:"Pemecatan kuki giliran berasaskan",639:"Lihat pembolehubah permohonan",640:"Masalah dengan loading minimap itu, matikan program yang bercanggah",641:"Cari",642:"Tetapan Search",643:"Radius",644:"Cari lengkap",645:"Oasis",646:"Lelong",647:"Kampung",648:"Run Denver 3",649:"Coordinates",650:"Kemaskini",651:"Tambah di kampung ladang Daun",652:"Hentikan serangan dengan kerugian di atas",653:"Perubahan disimpan",654:"Masuk",655:"kata kunci",656:"Menetapkan input automatik kegagalan login",700:"[3]-Hantar tentera",701:"[3] + Menghantar tentera",702:"[6] Menghantar peniaga",703:"[6] + Menghantar peniaga",704:"[1] pengekstrakan tentera",705:"[1] + Cabaran Tentera",706:"[4], merobohkan bangunan",707:"[4] + merobohkan bangunan",708:"[2] total semua",709:"[2] + Jumlah semua",710:"[5] Jumlah semua (bangunan)",711:"[5] + Jumlah semua (bangunan)",1001:"Legion",1002:"Pengawal Pertahanan",1003:"Imperian",1004:"Kuda pengakap",1005:"The berkuda maharaja",1006:"The berkuda dari Caesar",1007:"Taran",1008:"Api Tarbil",1009:"Senator",1010:"Peneroka",1011:"Hero",1012:"Askar Belantan",1013:"Askar Lembing",1014:"Axefighter",1015:"Pengakap",1016:"Kesatria Santo",1017:"berkuda Teutonik",1018:"lantak alat pemukul",1019:"Tarbil",1020:"Ketua itu",1021:"Peneroka",1022:"Hero",1023:"Falanks",1024:"pemain Lawan",1025:"Penjelajah",1026:"Guruh Theutates",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Pemimpin",1032:"Peneroka",1033:"Hero"};
var lang_no={1:"Om",2:"Farm List",3:"Den linjen apotek",4:"Application Settings",5:"Køen bygger tropper",6:"Køen studien tropper",7:"Den linjen av bygging av nye bygninger",8:"Den linjen forbedringer av bygninger",9:"Køen riving",10:"Summen av alle bestillinger",11:"Den linjen forbedringer tropper",12:"Deponering av tropper",13:"The Notebook",14:"Nyttige lenker",15:"The sentrum",16:"Implementering av helligdager",17:"Trade Ruter",18:"The salg og kjøp RESSURSER",19:"Spillet er på auksjon",20:"alle landsbyene RESSURSER",21:"Army of alle landsbyene",22:"transport av tropper av alle landsbyene",23:"Logg",24:"Farm List",25:"Den linjen apotek",26:"Køen bestilling tropper",27:"Køen studien tropper",28:"Den linjen forbedringer tropper",29:"Summen av alle bestillinger",30:"Deponering av tropper",31:"Waves",32:"Villages",33:"alle landsbyene RESSURSER",34:"Army of alle landsbyene",35:"transport av tropper av alle landsbyene",36:"Den linjen bygging av nye bygninger",37:"Den linjen forbedringer av bygninger",38:"Køen riving",39:"Analyse",40:"Analyse av angrep allianse",41:"Analysis Report",42:"Hero",43:"Automatisk sende en helt på søken",44:"Automatisk pumping av helten i oasene",45:"Kultur",46:"Automatisk holde feiringen",47:"Handel og ressurser",48:"auto-balansering med hjelp av helten RESSURSER",49:"auto-balansere ressurser i landsbyer ved hjelp av kjøpmenn",50:"Trade Ruter",51:"Kjøp og salg av ressurser",52:"Auksjon",53:"Spillet er på auksjon",54:"Kjøpe de riktige tingene",55:"Kart",56:"Finne 15 og 9",57:"Finn de svake og forsvarsløse",58:"Kart over handelsruter",59:"The map panner",60:"Kart av alliansen",61:"Map of fiender",62:"Utvikling",63:"Automatisk Development",64:"quests",65:"Automatisk utvikling av nye landsbyer",66:"Generelt",67:"Notebook",68:"Om",69:"Application Settings",70:"Logg Application",71:"Nyttige lenker",72:"Central Village",73:"Statistikk",74:"Antall soldater",75:"Nivået på utvikling RESSURSER",76:"Statistikk Online",77:"Control",78:"Den planen online",79:"Den timeplan med aktivitet",80:"Stille sende sms",81:"Control via ICQ",82:"Send informasjonen til serveren samordne alliansen",83:"Logg på serveren samordne alliansen",84:"Army",85:"Reset",86:"Clear",87:"Lagre",88:"OK",89:"Destroy senere",90:"Application Settings",91:"Språk",92:"For eventuelle spørsmål, please",93:"Navn",94:"Velg til en pris under",95:"Innkjøp til en pris under",96:"* Innkjøp ikke er implementert og vil mest sannsynlig ikke:)",97:"salve",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Bestill Senere",102:"Build senere",103:"For å undersøke senere",104:"New handel rute",105:"For å opprette en rute til",106:"input koordinater",107:"OK",108:"Avbryt",109:"Navn",110:"Link",111:"Åpne i nåværende fane",112:"Åpne i ny fane",113:"Stop",114:"Send den siste på listen",115:"+ nåværende",116:"Nullstill alle angrep til det nåværende tidspunkt",117:"Clear Queue Pharma",118:"Gjennomføre senere",119:"Destroy senere",120:"New Links",121:"Type",122:"Armering",123:"Den vanlige angrep",124:"The Raid",125:"Frequency",126:"Accidental displacement",127:"Den type angrep",128:"et angrep",129:"2 Attack",130:"3 angrep",131:"5 angrep",132:"10 angrep",133:"15 angrep",134:"20 angrep",135:"25 angrep",136:"30 angrep",137:"40 angrep",138:"50 angrep",139:"75 angrep",140:"100 angrep",141:"The Village",142:"Time",143:"Hæren",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Korn",149:"Sender",150:"Mottaker",151:"RESSURSER",152:"Periode",153:"Send til",154:"Nei.",155:"Order type",156:"Konstruksjon",157:"Level",158:"The People",159:"Den perioden timer hendelser",160:"Den periode av skanneren",161:"Summen av alle",162:"Bestill hæren hvis det er en bygning",163:"Building på hva som mangler ressurser",164:"Building alle i prioritert rekkefølge",165:"Radius Pharma",166:"take away for X sekunder",167:"Den avledning av tropper",400:"Sagbruk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Sagbruk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakeri",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor ",413:"Arena",414:"Main Building",415:"Møteplass",416:"Market",417:"The Embassy",418:"The Barracks",419:"Stabil",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"The Chamber of Commerce",428:"Great Barracks",429:"Great Stabil",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stonemason",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Bestill troppene",461:"En studie av tropper",462:"Building",463:"Improvement",464:"Gjennomføring av helligdager",501:"Control",502:"Alternativer",503:"Hjelp",504:"The Raid",505:"Armering",506:"Den vanlige angrep",507:"Romerne",508:"Tyskerne",509:"Galla",600:"Data lagret",601:"Oppgaven er laget eieren",602:"Alle programinnstillinger reset",603:"Installerte nye radius",604:"En ny link",605:"Lagt til en ny rute",606:"Feil",607:"The data lagt til køen",608:"En slik studie er allerede i køen",609:"Denne bygningen står allerede i kø for riving",610:"Forbedring og så har det høyeste nivå",611:"I en gitt celle er bygge noe",612:"Denne bygningen er under oppføring i denne landsbyen",613:"Den bygningen og så vil ha høyeste nivå",614:"Kommunikasjon",615:"gjenskapt alle pharma",616:"Å ødelegge er ingenting",617:"Auto-skanning av alle landsbyene",618:"Send soldater",619:"Den ødeleggelse av bygninger",620:"The oppføring av bygninger",621:"Sending forhandlere",622:"Levels av bygninger",623:"Eksterne lenker",624:"Quick Links",625:"Automatisk oppføring av logg failure",626:"Knapper Development",627:"Denne landsbyen er allerede i den farmasøytiske liste",628:"Fjern fullstendig fra gården arket ",629:"Landsbyen er oppført i den farmasøytiske liste",630:"Page jQBot T4",631:"Lukk jQBot T4",632:"Reset Application",633:"Stopp kjøre timer hendelser",634:"Run kjøre timer hendelser",635:"Vise variabler GM",636:"Fjern de variablene GM",637:"Vis Cookie er trinnvis",638:"Fjerning av Cookie tur-basert",639:"Vis søknad variabler",640:"Problemer med lasting av minimap, slår de motstridende programmet",641:"Søk",642:"Søk Settings",643:"Radius",644:"Søk ferdig",645:"Oasis",646:"Auksjon",647:"Villages",648:"Run Denver 3",649:"Koordinater",650:"Update",651:"Legg i gården landsbyen Leaf",652:"Stopp angrepene med tap over",653:"Endringer frelst",654:"Logg inn",655:"password",656:"Innstilling av automatisk input av en logg feil",700:"[3]-Send soldater",701:"[3] + Sender tropper",702:"[6] Sending forhandlere",703:"[6] + Sending forhandlere",704:"[1] Utvinning av hæren",705:"[1] + Challenge Army",706:"[4], rive bygningen",707:"[4] + rive bygningen",708:"[2] Summen av alle",709:"[2] + Total av alle",710:"[5] Summen av alle (bygning)",711:"[5] + Total av alle (bygning)",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"Horse speider",1005:"The kavaleri av keiseren",1006:"The kavaleri Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Nybygger",1011:"Hero",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Teutonic kavaleri",1018:"rambukk",1019:"Catapult",1020:"The Chief",1021:"Nybygger",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Nybygger",1033:"Hero"};
var lang_pk={1:"بارے میں",2:"فارم کی فہرست",3:"لائن فارمیسی",4:"درخواست کی ترتیبات",5:"قطار فوجیوں کی عمارت ہے",6:"قطار کا مطالعہ فوجیوں",7:"نئی عمارتوں کی تعمیر کا لائن",8:"عمارتوں کی لائن میں بہتری",9:"قطار مسمار",10:"تمام احکامات کی کل",11:"لائن بہتری فوجیوں",12:"فوجیوں کی تلفی",13:"نوٹ بک",14:"کارآمد ویب سائٹس",15:"گاؤں کے مرکز",16:"تعطیلات کا عمل",17:"تجارتی راستوں",18:"فروخت اور خرید وسائل",19:"کھیل کی نیلامی پر ہے",20:"تمام گاؤں وسائل",21:"تمام گاؤں کی فوج",22:"تمام گاؤں کے فوجیوں کی تحریکیں",23:"لاگ ان",24:"فارم کی فہرست",25:"لائن فارمیسی",26:"حکم دے قطار فوجیوں",27:"قطار کا مطالعہ فوجیوں",28:"لائن بہتری فوجیوں",29:"تمام احکامات کی کل",30:"فوجیوں کی تلفی",31:"لہریں",32:"گاؤں",33:"تمام گاؤں وسائل",34:"تمام گاؤں کی فوج",35:"تمام گاؤں کے فوجیوں کی تحریکیں",36:"نیا عمارتوں کی لائن کی تعمیر",37:"عمارتوں کی لائن میں بہتری",38:"قطار مسمار",39:"تجزیہ",40:"حملوں کے اتحاد کا تجزیہ",41:"تجزیہ رپورٹ",42:"ہیرو",43:"تلاش پر خود بخود ایک ہیرو بھیج",44:"oases میں ہیرو کے پمپنگ خودکار",45:"ثقافت",46:"خودکار انعقاد جشن",47:"ٹریڈ اور وسائل",48:"ہیرو وسائل کی مدد سے آٹو توازن",49:"تاجروں کی مدد سے گاؤں میں آٹو توازن وسائل",50:"تجارتی راستوں",51:"خريد و فروخت وسائل",52:"نیلامی",53:"کھیل کی نیلامی پر ہے",54:"حق چیزیں خریدنا",55:"نقشہ",56:"15 اور 9 کی تلاش",57:"کمزور اور رکنہین تلاش کریں",58:"تجارتی راستوں کا نقشہ",59:"نقشہ دوپدان",60:"اتحاد کا نقشہ",61:"دشمن کا نقشہ",62:"ترقی",63:"خودکار ترقی",64:"quests",65:"نیا دیہات کا خود کار طریقے سے ترقی",66:"عمومی",67:"نوٹ بک",68:"بارے میں",69:"درخواست کی ترتیبات",70:"لاگ ان کی درخواست",71:"کارآمد ویب سائٹس",72:"مرکزی گاؤں",73:"شماریات",74:"فوجیوں کی تعداد",75:"ترقی کے وسائل کی سطح",76:"اعداد و شمار ڈاؤن لوڈ ، اتارنا",77:"کنٹرول",78:"شیڈول آن لائن",79:"سرگرمی کے شیڈول",80:"بھیجنے ایس ایم ایس سیٹنگ",81:"ICQ کے ذریعے کنٹرول",82:"سرور سے معلومات کے اتحاد ہم آہنگ بھیجیں",83:"اتحاد ہم آہنگ سرور پر لاگ آن",84:"آرمی",85:"ری سیٹ کر دیں",86:"صاف",87:"محفوظ کریں",88:"OK",89:"بعد میں خارج کر دیں",90:"درخواست کی ترتیبات",91:"زبان",92:"کوئی سوالات کیلئے ، براہ مہربانی",93:"نام",94:"درج ذیل کسی بھی قیمت پر منتخب کریں",95:"ایک قیمت پر ذیل میں خرید",96:"* خریدنے پر عملدرآمد نہیں کر رہا ہے اور سب سے زیادہ نہیں کریں گے امکان ہے :)",97:"مرہم",98:"کتابچہ",99:"کیج",100:"jQBot T4 چلائیں",101:"بعد میں آرڈر",102:"بعد میں جواب نہیں مل سکا.",103:"بعد میں تحقیقات کے لئے",104:"نئے تجارتی راستے",105:"کرنے کے لئے ایک راستہ بنانے کے لئے",106:"ان پٹ نقاط",107:"OK",108:"منسوخ کریں",109:"نام",110:"لنک",111:"موجودہ ٹیب میں کھولیں",112:"نئے ٹیب میں کھولیں",113:"روکیں",114:"کی فہرست میں آخری بھیجیں",115:"موجودہ +",116:"موجودہ وقت تک تمام حملوں کی دوبارہ مرتب کریں",117:"صاف قطار فارما",118:"بعد میں کیری",119:"بعد میں خارج کر دیں",120:"نیو روابط",121:"قسم",122:"سدرڑیکرن",123:"معمول پر حملہ",124:"حملہ",125:"فریکوینسی",126:"حادثاتی بے گھر",127:"حملے کی قسم",128:"حملے",129:"2 حملہ",130:"3 حملوں",131:"5 حملوں",132:"10 حملوں",133:"15 حملوں",134:"20 حملوں",135:"25 حملوں",136:"30 حملوں",137:"40 حملوں",138:"50 حملوں",139:"75 حملوں",140:"100 حملے",141:"گاؤں",142:"وقت",143:"فوج",144:"جواری",145:"درخت",146:"کلی",147:"آئرن",148:"دانوں",149:"مرسل",150:"وصول",151:"وسائل",152:"مدت",153:"بھیجیں",154:"نہیں.",155:"آرڈر ٹائپ",156:"تعمیرات",157:"لیول",158:"لوگ",159:"ٹائمر کے واقعات کی مدت",160:"اسکینر کی مدت",161:"سب سے کل",162:"فوج آرڈر اگر وہاں ایک عمارت ہے",163:"جو وسائل موجود نہیں ہے پر بلڈنگ",164:"ترجیح کی ترتیب میں سب بلڈنگ",165:"رداس فارما",166:"X سیکنڈ کے لئے لے",167:"فوجیوں کی تبدیلی",400:"Sawmill",401:"مٹی پٹ",402:"آئرن میرا",403:"فارم",404:"Sawmill",405:"Brickyard",406:"آئرن ورکس",407:"فلور مل",408:"بیکری",409:"اوپر",410:"بارن",411:"لوہار",412:"فورج کوچ",413:"واپس",414:"مرکزی عمارت",415:"ریلی پوائنٹ",416:"مارکیٹ",417:"سفارتخانے",418:"بیرکوں",419:"مستحکم",420:"ورکشاپ",421:"اکیڈمی",422:"خفیہ",423:"ٹاؤن ہال",424:"رہائش",425:"محل",426:"خزانے",427:"چیمبر آف کامرس",428:"عظیم بیرکوں",429:"عظیم مستحکم",430:"سٹی والز",431:"میں زمین کی دیوار",432:"باڑ",433:"سنگتراش",434:"Brewery",435:"Trapper",436:"ہوٹل",437:"عظیم نمائندہ",438:"بگ بارن",439:"دنیا کا پتہ نہیں",460:"فوجیوں آرڈر",461:"فوجیوں کی ایک مطالعہ",462:"بلڈنگ",463:"بہتری",464:"تعطیلات کا عمل",501:"کنٹرول",502:"اختیارات",503:"مدد",504:"حملہ",505:"سدرڑیکرن",506:"معمول پر حملہ",507:"رومیوں",508:"جرمن",509:"Galla",600:"ڈیٹا کامیابی سے محفوظ",601:"کام کا مالک بنا دیا ہے",602:"تمام درخواست کی ترتیبات ری سیٹ",603:"حاضر نئے رداس",604:"ایک نیا لنک",605:"ایک نیا راستہ شامل کر دیا گیا",606:"خرابی",607:"اعداد و شمار قطار میں شامل",608:"اس طرح کے ایک مطالعہ قطار میں پہلے سے ہی ہے",609:"یہ عمارت پہلے ہی مسمار کرنے کے لئے قطار میں کھڑا ہے",610:"کو بہتر بنانے اور اتنی زیادہ سے زیادہ درجہ ہے",611:"ایک دی سیل میں کچھ نہ کچھ تعمیر کر رہا ہے",612:"یہ عمارت اس گاؤں میں زیر تعمیر ہے",613:"عمارت اور تو سب سے زیادہ سطح پر ہو گا",614:"مواصلات",615:"تمام فارما recreated",616:"کو تباہ کرنے کی کوئی بات نہیں ہے",617:"تمام گاؤں کے آٹو سکین",618:"فوجیوں بھیجیں",619:"عمارتوں کی تباہی",620:"عمارتوں کی تعمیر",621:"ڈیلروں بھیجا جا رہا ہے",622:"عمارتوں کی سطح",623:"بیرونی روابط",624:"فوری روابط",625:"لاگ ان کی ناکامی کا خود کار طریقے سے اندراج",626:"بٹن ترقی",627:"یہ گاؤں پہلے ہی دواسازی کی فہرست میں ہے",628:"فارم شیٹ سے مکمل طور پر ختم کریں",629:"گاؤں دواسازی کی فہرست میں درج ہے",630:"صفحہ jQBot T4",631:"بند jQBot T4",632:"ری سیٹ درخواست",633:"چلانے کے ٹائمر کے واقعات بند کرو",634:"چلانے کے ٹائمر واقعات چلائیں",635:"کروائیے متغیر GM",636:"متغیر GM ہٹا دیں",637:"قدم کی طرف سے دیکھیں ہے کوکی قدم",638:"ہے کوکی باری کی بنیاد پر کی برطرفی",639:"درخواست متغیر دیکھیں",640:"minimap لوڈنگ کے ساتھ مسائل ، بند متصادم پروگرام بند کر دیں",641:"تلاش",642:"تلاش ترتیبات",643:"رداس",644:"مکمل تلاش",645:"نخلستان",646:"نیلامی",647:"گاؤں",648:"چلائیں 3 ڈینور",649:"کارڈینیٹس",650:"اپ ڈیٹ",651:"لیف کے کھیت سے گاؤں میں شامل کریں",652:"کہ مذکورہ بالا نقصانات کے ساتھ حملوں کو روکو",653:"تبدیلیاں محفوظ",654:"لاگ ان",655:"پاس ورڈ",656:"لاگ ان کی ناکامی کا خود کار طریقے سے ان پٹ کی سیٹنگ",700:"[3] فوجیوں کو بھیجیں",701:"[3] + بھیجنا فوجیوں",702:"[6] بھیجنا ڈیلروں",703:"[6] + بھیجنا ڈیلروں",704:"[1] فوج کی نکاسی",705:"[1] + چیلنج فوج",706:"[4] ، عمارت تباہ",707:"[4] + عمارت تباہ",708:"[2] تمام کی کل",709:"سب سے [2] کل +",710:"[5] تمام (عمارت) کی کل",711:"[5] تمام (عمارت) کے + کل",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"ہارس سکاؤٹ",1005:"شہنشاہ کے کیولری",1006:"سیزر کے کیولری",1007:"ترن",1008:"آگ گلیل",1009:"سینیٹر",1010:"آبادکار",1011:"ہیرو",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"سکاؤٹ",1016:"Paladin",1017:"Teutonic کیولری",1018:"battering رام",1019:"گلیل",1020:"اعلی",1021:"آبادکار",1022:"ہیرو",1023:"ویوہ",1024:"تلوارداری",1025:"Pathfinder",1026:"Theutates تھنڈر",1027:"ڈریوڈ رائڈر",1028:"Haeduan",1029:"ترن",1030:"منجنیق",1031:"رہنما",1032:"آبادکار",1033:"ہیرو"};
var lang_pl={1:"O",2:"Lista Farm",3:"Apteka line",4:"Ustawienia aplikacji",5:"W kolejce jest budowanie wojska",6:"Żołnierze badania kolejki",7:"Linia budowę nowych budynków",8:"Poprawa linii zabudowy",9:"Rozbiórka kolejki",10:"Suma wszystkich zleceń",11:"Żołnierze poprawę line",12:"Likwidacja wojska",13:"The Notebook",14:"Przydatne linki",15:"centrum wsi",16:"Realizacja wakacje",17:"Trasy Trade",18:"kupna-sprzedaży zasobów",19:"Gra jest na aukcji",20:"wszystkie wioski ZASOBY",21:"Armia wszystkich wsiach",22:"Ruchy wojsk wszystkich wsiach",23:"Log",24:"Lista Farm",25:"Apteka line",26:"W kolejce zamówienia wojska",27:"Żołnierze badania kolejki",28:"Żołnierze poprawę line",29:"Suma wszystkich zleceń",30:"Likwidacja wojska",31:"Waves",32:"Osady",33:"wszystkie wioski ZASOBY",34:"Armia wszystkich wsiach",35:"Ruchy wojsk wszystkich wsiach",36:"Budowa linii nowych budynków",37:"Poprawa linii zabudowy",38:"Rozbiórka kolejki",39:"Analiza",40:"Analiza sojuszu ataki",41:"Raport z analizy",42:"Hero",43:"Automatycznie wysyła bohatera na poszukiwanie",44:"Automatyczne pompowanie bohatera w oazach",45:"Kultura",46:"Automatic uroczystości gospodarstwo",47:"Handel i zasoby",48:"auto-balancing z wykorzystaniem środków bohatera",49:"auto-balancing zasobów wsi przy pomocy kupców",50:"Trasy Trade",51:"Kupno i sprzedaż zasobów",52:"Aukcja",53:"Gra jest na aukcji",54:"Zakup właściwe rzeczy",55:"Mapa",56:"Znalezienie 15 i 9",57:"Znajdź słabych i bezbronnych",58:"Mapa szlaków handlowych",59:"Mapa bratki",60:"Mapa sojuszu",61:"Mapa wrogów",62:"Rozwój",63:"Automatic rozwoju",64:"zadania",65:"Automatic rozwoju nowych wsi",66:"General",67:"Notebook",68:"O",69:"Ustawienia aplikacji",70:"Application Log",71:"Przydatne linki",72:"Village Central",73:"Statystyka",74:"liczby żołnierzy",75:"Poziom rozwoju zasobów",76:"Statystyki Online",77:"Control",78:"on-line harmonogram",79:"Plan działania",80:"Ustawienia wysyłania sms",81:"Sterowanie przez ICQ",82:"Wyślij informacje do serwera koordynację sojuszu",83:"Logowanie do serwera koordynację sojuszu",84:"Armia",85:"Reset",86:"Wyczyść",87:"Zapisz",88:"OK",89:"Zburzcie później",90:"Ustawienia aplikacji",91:"Język",92:"W przypadku jakichkolwiek pytań, proszę",93:"Nazwa",94:"Wybierz po cenie niższej",95:"Zakup po cenie niższej",96:"Zakup * nie jest realizowany i najprawdopodobniej nie:)",97:"Maść",98:"Scroll",99:"Klatka",100:"Run jQBot T4",101:"Zamówienie później",102:"Build później",103:"W celu zbadania później",104:"Nowy szlak handlowy",105:"Aby utworzyć trasę do",106:"współrzędne wejścia",107:"OK",108:"Anuluj",109:"Nazwa",110:"Link",111:"Otwórz w bieżącej karty",112:"Otwórz w nowej karcie",113:"Stop",114:"Wyślij ostatni na liście",115:"+ prąd",116:"Reset wszystkie ataki do chwili obecnej",117:"Clear Queue Pharma",118:"Przeprowadzenie później",119:"Zburzcie później",120:"Nowe strony",121:"Typ",122:"Wzmocnienie",123:"Zazwyczaj atak",124:"Raid",125:"Częstotliwość",126:"Postępowanie w przypadku przemieszczenia",127:"Ten typ ataku",128:"atak",129:"2 Attack",130:"3 ataki",131:"5 ataków",132:"10 ataków",133:"15 ataków",134:"20 ataków",135:"25 ataków",136:"30 ataków",137:"40 ataków",138:"50 ataków",139:"75 ataków",140:"100 attack",141:"The Village",142:"Time",143:"Armia",144:"Gambler",145:"Drzewo",146:"Clay",147:"Iron",148:"Grain",149:"Nadawca",150:"Odbiorca",151:"zasoby",152:"Okres",153:"Wyślij do",154:"Nie",155:"Typ zlecenia",156:"Budownictwo",157:"Poziom",158:"The People",159:"Okres zdarzenia timer",160:"Okres od skanera",161:"Suma wszystkich",162:"Zamówienie armii, jeśli znajduje się budynek",163:"W oparciu o to, czego brakuje zasobów",164:"Budowanie wszystkie w kolejności",165:"Promień Pharma",166:"zabrać na X sekund",167:"kierowania żołnierzy",400:"Tartak",401:"Pit Clay",402:"Kopalnia żelaza",403:"The Farm",404:"Tartak",405:"Cegielnia",406:"Iron Works",407:"młyn",408:"Piekarnia",409:"Warehouse",410:"The Barn",411:"Kowal",412:"Armor Forge",413:"Arena",414:"Gmach",415:"Rally Point",416:"Rynek",417:"Ambasada",418:"Koszary",419:"Stabilna",420:"Warsztaty",421:"The Academy",422:"Secret",423:"Ratusz",424:"Residence",425:"Pałac",426:"Skarb",427:"The Chamber of Commerce",428:"Duże koszary",429:"Duża stajnia",430:"Mury miasta",431:"Ziemia Wall",432:"Ogrodzenia",433:"Kamieniarz",434:"Browar",435:"Traper",436:"Tawerna",437:"Duży magazyn",438:"Big Spichlerz",439:"Cud Świata",460:"Zamówienie wojska",461:"Badanie żołnierzy",462:"Budynek",463:"Wzrost",464:"Implementacja na święta",501:"Control",502:"Opcje",503:"Pomoc",504:"Raid",505:"Wzmocnienie",506:"Zazwyczaj atak",507:"Romans",508:"Niemcy",509:"Galla",600:"Dane zostały zapisane",601:"Zadanie staje się właścicielem",602:"Wszystkie zresetować ustawienia aplikacji",603:"Zainstalowany nowy promień",604:"nowe połączenie",605:"Dodano nową trasę",606:"Error",607:"Dane dodane do kolejki",608:"Takie badanie jest już w kolejce",609:"Ten budynek już stoi w kolejce do rozbiórki",610:"Poprawianie i tak ma najwyższy poziom",611:"W danej komórce jest zbudować coś",612:"Ten budynek jest w budowie w tej wsi",613:"Budynek i tak będzie na najwyższym poziomie",614:"Komunikacja",615:"odtworzone wszystkie pharma",616:"Aby zniszczyć to nic",617:"Auto-skanowanie wszystkich wsiach",618:"Wyślij wojska",619:"zniszczenie budynków",620:"Budowa budynków",621:"Wysyłanie dealerów",622:"Poziomy budynków",623:"Linki zewnętrzne",624:"Quick Links",625:"automatyczne wprowadzanie login failure",626:"Rozwój Buttons",627:"Ta wieś jest już w przemyśle farmaceutycznym list",628:"Usuń całkowicie z arkusza gospodarstwa",629:"Wieś jest wymieniony w liście farmaceutycznych",630:"Strona jQBot T4",631:"Zamknij jQBot T4",632:"Zastosowanie Reset",633:"Stop zdarzenia timer run",634:"Run zdarzenia timer run",635:"Przedstawiamy zmiennych GM",636:"Zdejmij zmiennych GM",637:"Cookie Zobacz krok po kroku",638:"Usunięcie Cookie turowa",639:"Zobacz zmienne aplikacji",640:"Problemy z załadowaniem minimapie, wyłączyć program lub programy",641:"Szukaj",642:"Ustawienia wyszukiwania",643:"Promień",644:"Search kompletna",645:"Oasis",646:"Aukcja",647:"Osady",648:"Run Denver 3",649:"Współrzędne",650:"Update",651:"Dodaj na wieś Leaf",652:"Stop ataki ze stratami powyżej",653:"Zmiany zapisane",654:"Logowanie",655:"hasło",656:"Ustawianie automatyczne wprowadzanie awarii login",700:"[3] Wyślij wojska",701:"[3] + Wysyłanie wojska",702:"[6] dealerów Wysyłanie",703:"[6] + dealerów Wysyłanie",704:"[1] Wydobycie armii",705:"[1] + Wyzwanie Armia",706:"[4], zburzyć budynek",707:"[4] + zburzyć budynek",708:"[2] Suma wszystkich",709:"[2] + Suma wszystkich",710:"[5] Suma wszystkich (budynek)",711:"[5] Wszystkich + wszystkich (budynek)",1001:"Legionnaire",1002:"pretorianów",1003:"Imperian",1004:"harcerz Horse",1005:"Kawaleria cesarza",1006:"kawalerii Cezara",1007:"Taran",1008:"Catapult Fire",1009:"Senator",1010:"Osadnik",1011:"Hero",1012:"Pałkarz",1013:"Spearmana",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Krzyżaków kawalerii",1018:"taran",1019:"Katapulta",1020:"Szef",1021:"Osadnik",1022:"Hero",1023:"Phalanx",1024:"Szermierz",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Rider Druid",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Osadnik",1033:"Hero"};
var lang_pt={1:"About",2:"Lista Farm",3:"A linha de farmácia",4:"Configurações do aplicativo",5:"A fila está construindo tropas",6:"As tropas estudo fila ",7:"A linha de construção de novos edifícios",8:"As melhorias linha de edifícios",9:"A fila de demolição",10:"O total de todas as ordens",11:"As tropas melhorias line",12:"Eliminação de tropas",13:"The Notebook",14:"Links Úteis",15:"O centro da aldeia",16:"Implementação das férias",17:"Rotas de Comércio",18:"Os recursos de compra e venda",19:"O jogo está em leilão",20:"todas as aldeias RECURSOS",21:"Exército de todas as aldeias",22:"Movimentos de tropas de todas as aldeias",23:"Log",24:"Lista Farm",25:"A linha de farmácia",26:"A fila de pedidos tropas",27:"As tropas estudo fila ",28:"As tropas melhorias line",29:"O total de todas as ordens",30:"Eliminação de tropas",31:"Waves",32:"Aldeias",33:"todas as aldeias RECURSOS",34:"Exército de todas as aldeias",35:"Movimentos de tropas de todas as aldeias",36:"A linha de construção de novos edifícios",37:"As melhorias linha de edifícios",38:"A demolição da fila",39:"Análise",40:"Análise de aliança ataques",41:"Relatório de Análise",42:"Hero",43:"Automaticamente envie um herói na busca",44:"Automatic bombeamento do herói no oásis",45:"Cultura",46:"Automatic celebrações holding",47:"Comércio e RECURSOS",48:"auto-equilíbrio com a ajuda dos recursos herói",49:"auto-equilíbrio RECURSOS nas aldeias com a ajuda de comerciantes",50:"Rotas de Comércio",51:"Compra e venda RECURSOS",52:"Leilão",53:"O jogo está em leilão",54:"Comprar as coisas certas",55:"Map",56:"Finding 15 e 9",57:"Encontre os fracos e indefesos",58:"Mapa de rotas de comércio",59:"O mapa panelas",60:"Mapa da aliança",61:"Mapa de inimigos",62:"Desenvolvimento",63:"Desenvolvimento Automatic",64:"quests",65:"desenvolvimento automático de novas aldeias",66:"Geral",67:"Notebook",68:"Sobre",69:"Configurações do aplicativo",70:"Application Log",71:"Links Úteis",72:"Village Central",73:"Estatísticas",74:"O número de tropas",75:"O nível de desenvolvimento de recursos",76:"Estatísticas Online",77:"Control",78:"A agenda on-line",79:"O calendário de atividade",80:"Configurando o envio de sms",81:"Controle via ICQ",82:"Envie as informações para o servidor coordenação da aliança",83:"Faça logon no servidor de coordenação da aliança",84:"Exército",85:"Reset",86:"Clear",87:"Salvar",88:"OK",89:"Destruir depois",90:"Configurações do aplicativo",91:"Língua",92:"Para qualquer dúvida, por favor",93:"Nome",94:"Select a um preço inferior",95:"Compra a um preço inferior",96:"Compras * não é implementado e provavelmente não:)",97:"Pomada",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordem mais tarde",102:"Build mais tarde",103:"Para investigar mais tarde",104:"Nova rota de comércio",105:"Para criar uma rota para",106:"coordenadas de entrada",107:"OK",108:"Cancelar",109:"Nome",110:"Link",111:"Abrir em guia atual",112:"Abrir em nova aba",113:"Stop",114:"Enviar o último da lista",115:"+ atual",116:"Reset todos os ataques até que o tempo atual",117:"Clear Queue Pharma",118:"Realizar mais tarde",119:"Destruir depois",120:"Links Nova",121:"Type",122:"Reforço",123:"O ataque do usual",124:"O Raid",125:"Frequency",126:"deslocamento acidental",127:"O tipo de ataque",128:"um ataque",129:"2 Attack",130:"3 ataques",131:"5 ataques",132:"10 ataques",133:"15 ataques",134:"20 ataques",135:"25 ataques",136:"30 ataques",137:"40 ataques",138:"50 ataques",139:"75 ataques",140:"ataque 100",141:"A Vila",142:"Time",143:"O exército",144:"Gambler",145:"A Árvore",146:"Clay",147:"Iron",148:"Grain",149:"Remetente",150:"Receiver",151:"RECURSOS",152:"Período",153:"Enviar para",154:"Não.",155:"Tipo de Ordem",156:"Construção",157:"Nível",158:"O Povo",159:"O período de eventos timer",160:"O período do scanner",161:"O total de todos",162:"Ordem do exército se existe um edifício",163:"Com base no que está faltando RECURSOS",164:"Construir tudo em ordem de prioridade",165:"Raio Pharma",166:"tirar por alguns segundos X",167:"O desvio de tropas",400:"Serraria",401:"Pit Clay",402:"Mina de Ferro",403:"A Fazenda",404:"Serraria",405:"Brickyard",406:"Iron Works",407:"moinho de farinha",408:"Padaria",409:"Armazém",410:"O Celeiro",411:"Blacksmith",412:"Armor Forge ",413:"Arena",414:"Edifício Principal",415:"Rally Point",416:"Mercado",417:"A Embaixada",418:"O Quartel",419:"Estável",420:"Workshop",421:"A Academia",422:"O Segredo",423:"Câmara Municipal",424:"Residence",425:"O Palácio",426:"Tesouro",427:"A Câmara de Comércio",428:"Grande Quartel",429:"Estável Grande",430:"Muralhas da Cidade",431:"Earth Wall",432:"Fence",433:"Pedreiro",434:"O Brewery",435:"Trapper",436:"Tavern",437:"Grande Armazém",438:"Big Barn",439:"Maravilha do Mundo",460:"Ordem das tropas",461:"Um estudo de tropas",462:"Construir",463:"Melhoria",464:"Implementação das férias",501:"Control",502:"Opções",503:"Help",504:"O Raid",505:"Reforço",506:"O ataque usual",507:"Os romanos",508:"Os alemães",509:"Galla",600:"Dados salvos com sucesso",601:"A tarefa é feita com o proprietário",602:"Todos os aplicativos redefinir as configurações",603:"Raio Instalado novo",604:"link Um novo",605:"Foi adicionada uma nova rota",606:"Erro",607:"Os dados adicionados à fila",608:"Esse estudo já está na fila",609:"Este edifício já está na fila para a demolição",610:"Melhoria e por isso tem o mais alto nível",611:"Em uma determinada célula é construir algo",612:"Este prédio está em construção nesta vila",613:"A construção e assim terá mais alto nível",614:"Comunicação",615:"recriados todos os pharma",616:"Para destruir é nada",617:"Auto-varredura de todas as aldeias",618:"Enviar tropas",619:"A destruição de edifícios",620:"A construção de edifícios",621:"O envio de negociantes",622:"Níveis de edifícios",623:"Ligações externas",624:"Quick Links",625:"a entrada automática de falha de login",626:"Desenvolvimento Buttons",627:"Esta vila já está na lista de produtos farmacêuticos",628:"Remover completamente a partir da folha de fazenda",629:"A aldeia está listado na lista de produtos farmacêuticos",630:"Page jQBot T4",631:"Close jQBot T4",632:"Aplicação Reset",633:"Parar a eventos de timer run",634:"Run eventos timer run",635:"variáveis ​​Vendo GM",636:"Remova a GM variáveis",637:"Veja o passo a passo Cookie",638:"A remoção de cookies do turn-based",639:"Ver as variáveis ​​de aplicativo",640:"Problemas com o carregamento do minimap, desligue o programa em conflito",641:"Search",642:"Configurações de pesquisa",643:"Raio",644:"Pesquisa completa",645:"Oasis",646:"Leilão",647:"Aldeias",648:"Run Denver 3",649:"Coordinates",650:"Update",651:"Adicionar na aldeia de fazenda de Leaf",652:"Parem os ataques com perdas acima",653:"Alterações salvas",654:"Login",655:"password",656:"Definir a entrada automática de falha de login",700:"[3]-Enviar tropas",701:"[3] + Enviar tropas",702:"[6] O envio de negociantes",703:"[6] + negociantes de envio",704:"[1] A extração do exército",705:"[1] + Desafio do Exército",706:"[4], demolir o prédio",707:"[4] + demolir o prédio",708:"[2] O total de todos",709:"[2] Total + de todos",710:"[5] O total de todos (construção)",711:"[5] + Total de todos (construção)",1001:"Legionário",1002:"pretoriana",1003:"Imperiano",1004:"scout Cavalo",1005:"A cavalaria do imperador",1006:"A cavalaria de César",1007:"Taran",1008:"Catapulta de Fogo",1009:"O senador",1010:"colono",1011:"Hero",1012:"Salteador",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalaria teutônica",1018:"aríete",1019:"Catapult",1020:"O Chefe",1021:"colono",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Thunder Theutate",1027:"Rider Druid",1028:"Haeduano",1029:"Taran",1030:"Trebuchet",1031:"Líder",1032:"colono",1033:"Hero"};
var lang_ro={1:"Despre",2:"Lista agricole",3:"Linia farmacie",4:"Setări aplicaţie",5:"coada este construirea trupele",6:"Trupele coadă de studiu",7:"Linia de construirea de clădiri noi",8:"imbunatatiri linie de clădiri",9:"demolare coadă",10:"totală a tuturor ordinelor",11:"imbunatatiri Linia trupe",12:"Eliminarea de trupe",13:"The Notebook",14:"Linkuri utile",15:"centrul satului",16:"Punerea în aplicare a sărbători",17:"rute comerciale",18:"RESURSE vânzare şi cumpărare",19:"Jocul este la licitatie",20:"toate satele RESURSE",21:"Armata din toate satele",22:"Circulaţia a trupelor din toate satele",23:"Jurnal",24:"Lista agricole",25:"Linia farmacie",26:"coadă de comanda trupele",27:"Trupele coadă de studiu",28:"imbunatatiri Linia trupe",29:"totală a tuturor ordinelor",30:"Eliminarea de trupe",31:"Waves",32:"Sate",33:"toate satele RESURSE",34:"Armata din toate satele",35:"Circulaţia a trupelor din toate satele",36:"Linia de construcţie de clădiri noi",37:"imbunatatiri linie de clădiri",38:"demolare coadă",39:"Analiza",40:"Analiza de alianţă atacuri",41:"Raportul de Analiză",42:"Hero",43:"trimite automat un erou pe quest",44:"Automat de pompare de erou în oazele",45:"Cultura",46:"sărbătoare automată exploataţie",47:"Comerţ şi resurse",48:"auto-echilibrare cu ajutorul RESURSE erou",49:"auto-echilibrare RESURSE la sate, cu ajutorul de negustori",50:"rute comerciale",51:"Cumpararea si vanzarea de resurse",52:"licitatie",53:"Jocul este la licitatie",54:"de cumparare lucrurile care trebuie",55:"Harta",56:"Găsirea 15 şi 9",57:"Găsiţi cei slabi şi lipsiţi de apărare",58:"Harta de rute comerciale",59:"harta bucătărie",60:"Harta de alianţă",61:"Harta de duşmani",62:"Dezvoltare",63:"Dezvoltarea automată",64:"quest-uri",65:"dezvoltarea automată a satelor noi",66:"General",67:"Notebook",68:"Despre",69:"Setări aplicaţie",70:"Aplicaţie Jurnal",71:"Linkuri utile",72:"Central Village",73:"Statistica",74:"Numărul de trupe",75:"Nivelul de dezvoltare a resurselor",76:"Statistica Online",77:"Control",78:"program on-line",79:"Programul de activitate",80:"Stabilirea trimiterea sms",81:"Control prin ICQ",82:"Trimite la server informaţii de coordonare a alianţei",83:"Log on la serverul de coordonare a alianţei",84:"Armata",85:"Reset",86:"Clear",87:"Salvare",88:"OK",89:"Destroy mai târziu",90:"Setări aplicaţie",91:"Limba",92:"Pentru orice întrebări, vă rog",93:"Nume",94:"Selectaţi la un preţ mai mic",95:"de cumparare la un pret mai mic",96:"* de cumparare nu este pusă în aplicare şi va fi cel mai probabil nu:)",97:"unguent",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordinul mai târziu",102:"Build mai târziu",103:"Pentru a investiga mai târziu",104:"Noua rută comercială",105:"Pentru a crea un traseu de",106:"coordonate de intrare",107:"OK",108:"Anulează",109:"Nume",110:"Link",111:"Open in tab-ul curent",112:"Open in new tab",113:"Stop",114:"Trimiteţi ultimul pe listă",115:"+ curent",116:"Reset toate atacurile până la ora actuală",117:"Coadă Senin Pharma",118:"Se efectuează mai târziu",119:"Destroy mai târziu",120:"Link-uri noi",121:"Tip",122:"armare",123:"atac de obicei",124:"Raid",125:"Frecventa",126:"deplasarea accidentală",127:"tip de atac",128:"un atac",129:"2 Atac",130:"3 atacuri",131:"5 atacuri",132:"10 atacuri",133:"15 atacuri",134:"20 atacuri",135:"25 atacuri",136:"30 atacuri",137:"40 atacuri",138:"50 atacuri",139:"75 atacuri",140:"100 de atac",141:"The Village",142:"Timpul",143:"Armata",144:"Gambler",145:"Copacul",146:"Zgura",147:"Iron",148:"cereale",149:"Expeditor",150:"Receiver",151:"RESURSE",152:"Perioada",153:"Send to",154:"Nu.",155:"Ordinul de tip",156:"Construcţii",157:"Nivel",158:"Oameni",159:"Perioada de evenimente timer",160:"Perioada de scanerului",161:"totală a tuturor",162:"Ordonanţa armata în cazul în care există o clădire",163:"Bazându-se pe ceea ce lipseşte RESURSE",164:"Construirea toate în ordinea priorităţii",165:"Raza Pharma",166:"ia pentru X secunde",167:"diversiune de trupe",400:"fabrica",401:"Zgura Pit",402:"Iron Mine",403:"agricole",404:"fabrica",405:"cărămidăria",406:"Iron Works",407:"moara de faina",408:"panificatie",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Primăria",415:"Punctul de Rally",416:"Piata",417:"Ambasada",418:"Cazarma",419:"Stabil",420:"Atelier",421:"Academia",422:"Secret",423:"Primăria",424:"Residence",425:"Palatul",426:"trezorerie",427:"Camera de Comert",428:"Cazarma Mare",429:"Stabil Mare",430:"City Walls",431:"Fierărie",432:"Fence",433:"Arhitect",434:"Brewery",435:"Trapper",436:"Taverna",437:"Depozit Mare",438:"Barn Big",439:"Minunea Lumii",460:"Ordinul trupele",461:"Un studiu al trupelor",462:"Clădire",463:"Îmbunătăţirea",464:"Punerea în aplicare a sărbători",501:"Control",502:"Options",503:"Ajutor",504:"Raid",505:"armare",506:"atac de obicei",507:"romani",508:"germani",509:"Galla",600:"Datele salvate cu succes",601:"Sarcina este proprietarul",602:"Toate setările cererea resetare",603:"raza instalat noi",604:"O nouă legătură într",605:"Adăugat o nouă rută",606:"Eroare",607:"Datele de adăugat la coadă",608:"Un astfel de studiu este deja în coadă",609:"Aceasta cladire este deja în picioare, în linie pentru demolare",610:"Îmbunătăţirea şi aşa are cel mai înalt nivel",611:"Într-o celulă dat este construi ceva",612:"Aceasta cladire este în construcţie în acest sat",613:"clădire şi astfel vor avea cel mai înalt nivel",614:"Comunicare",615:"recreat toate pharma",616:"Pentru a distruge nu este nimic",617:"Auto-scanarea tuturor satelor",618:"Trimite trupe",619:"distrugerea clădirilor",620:"Construcţia de clădiri",621:"Trimiterea de dealeri",622:"Niveluri de clădiri",623:"Legături externe",624:"Quick Links",625:"intrare automată a eşecului autentificare",626:"Butoane de dezvoltare",627:"Acest sat este deja în listă farmaceutic",628:"Scoateţi complet din foaia de ferma",629:"Satul este listat în lista de farmaceutice",630:"Page jQBot T4",631:"Închide jQBot T4",632:"Aplicaţie Reset",633:"Opriţi evenimente timer alerga",634:"Run evenimente alerga timer",635:"variabilele Vizualizare GM",636:"Scoateţi GM variabilele",637:"Vezi Cookie lui pas cu pas",638:"Eliminarea lui Cookie turn-based",639:"Vezi variabilele aplicare",640:"Probleme cu încărcare Minimap, opriţi programul de conflict",641:"Cautare",642:"Setări de căutare",643:"Radius",644:"Cautare complet",645:"Oasis",646:"licitatie",647:"Sate",648:"Run Denver 3",649:"Coordonate",650:"Update",651:"Adăugaţi în satul ferma de frunze",652:"Stop atacuri cu pierderi de mai sus",653:"Schimbari salvate",654:"Login",655:"parola",656:"Stabilirea de intrare automată a unei defecţiuni de conectare",700:"[3]-trimiterea de trupe",701:"[3] + trimit trupe",702:"[6] dealeri trimit",703:"[6] + dealeri trimit",704:"[1] extracţie a armatei",705:"[1] + Challenge Armata",706:"[4], demolarea clădirii",707:"[4] + demolarea clădirii",708:"[2] total al tuturor",709:"[2] + totală a tuturor",710:"[5] totală a tuturor (constructii)",711:"[5] + total de toate (constructii)",1001:"legionar",1002:"Pretorian",1003:"Imperianul",1004:"Scout Horse",1005:"cavalerie al împăratului",1006:"cavalerie de Cezar",1007:"Taran",1008:"Catapult Foc",1009:"Senator",1010:"decantor",1011:"Hero",1012:"Măciucar",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalerie teutonic",1018:"berbec",1019:"Catapulta",1020:"şef",1021:"decantor",1022:"Hero",1023:"Phalanx",1024:"Purtător de sabie",1025:"Pathfinder",1026:"Călăreţ Fulger",1027:"druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"decantor",1033:"Hero"};
var lang_rs={1:"О",2:"Фарма листа",3:"линија апотека",4:"Пријава Подешавања",5:"ред гради трупе",6:"ред Студија трупе ",7:"линија изградња нових објеката",8:"линија побољшања зграда",9:"ред рушење",10:"збир свих налога",11:"линија побољшања трупе",12:"Одлагање трупа",13:"нотебоок",14:"Корисни линкови",15:"центру села",16:"Имплементација празника",17:"трговачких путева",18:"продаје и куповине ресурса",19:"Игра је на аукцији",20:"свим селима РЕСУРСИ",21:"Војска свих села",22:"Покрети трупа свих села",23:"Дневник",24:"Фарма листа",25:"линија апотека",26:"наручивање ред трупе",27:"ред Студија трупе ",28:"линија побољшања трупе",29:"збир свих налога",30:"Одлагање трупа",31:"Таласи",32:"села",33:"свим селима РЕСУРСИ",34:"Војска свих села",35:"Покрети трупа свих села",36:"линија изградња нових објеката",37:"линија побољшања зграда",38:"ред рушење",39:"Анализа",40:"Анализа савеза напада",41:"Анализа извештај",42:"Херој",43:"Аутоматски послати хероја у потрази",44:"Аутоматско пумпање хероја у оазе",45:"Култура",46:"Аутоматски Холдинг прославе",47:"Трговина и ресурса",48:"Ауто-балансирање уз помоћ јунака РЕСУРСИ",49:"Ауто-балансирање ресурсима у селима уз помоћ трговаца",50:"трговачких путева",51:"Куповина и продаја РЕСУРСИ",52:"Аукција",53:"Игра је на аукцији",54:"Куповина праве ствари",55:"Мапа",56:"Проналажење 15 и 9",57:"Пронађи слаби и беспомоћни",58:"Мапа трговачких путева",59:"Мапа шерпе",60:"Мапа алијансе",61:"Мапа непријатеља",62:"Развој",63:"Аутоматски развој",64:"потрага",65:"Аутоматска развој нових села",66:"Опште особине",67:"нотебоок",68:"О",69:"Пријава Подешавања",70:"Дневник Апликација",71:"Корисни линкови",72:"Централно село",73:"Статистика",74:"број трупа",75:"Ниво развоја ресурса",76:"Статистика Онлине",77:"Контрола",78:"распоред мрежи",79:"распоред активности",80:"Подешавање слање СМС",81:"Контрола преко МСН",82:"Пошаљи информације серверу координацију савез",83:"Пријавите се на серверу координацију савез",84:"Војска",85:"Ресетовање",86:"Слободан",87:"Сачувај",88:"У реду",89:"Уништите касније",90:"Пријава Подешавања",91:"Језик",92:"За сва питања, молим те",93:"Назив",94:"Изабери по цени испод",95:"Куповина по цени испод",96:"* Набавка не спроводи и да ће највероватније не:)",97:"Маст",98:"Скрол",99:"Кавез",100:"Бежите јКБот Т4.0",101:"би потом",102:"Изградња касније",103:"Да бисте касније истражити",104:"Нови трговачки пут",105:"Да бисте креирали пут до",106:"улаз координате",107:"У реду",108:"Откажи",109:"Назив",110:"линк",111:"Отвори у тренутне картице",112:"Отвори у новој картици",113:"Стоп",114:"Пошаљи на крају листе",115:"+ струја",116:"Ресетуј све нападе све до тренутног времена",117:"Слободан Куеуе Пхарма",118:"Спровести касније",119:"Уништите касније",120:"Нови Линкови",121:"Тип",122:"Јачање",123:"уобичајена напад",124:"Рација",125:"Фреквенција",126:"случајног померања",127:"тип напада",128:"напад",129:"2. Напад",130:"3 напада",131:"5 напада",132:"10 напада",133:"15 напада",134:"20 напада",135:"25 напада",136:"30 напада",137:"40 напада",138:"50 напада",139:"75 напада",140:"100 напада",141:"Село",142:"Време",143:"војска",144:"Коцкар",145:"Дрво",146:"Глина",147:"Гвоздена",148:"Зрно",149:"Сендер",150:"пријемник",151:"ИЗВОРИ",152:"период",153:"Пошаљи на",154:"Не",155:"Наредба тип",156:"Изградња",157:"Ниво",158:"Људи",159:"период тајмера догађаја",160:"период скенера",161:"збир свих",162:"Налог у војсци ако се зграда",163:"Ослањајући се на оно што недостаје РЕСУРСИ",164:"Изградња све у реду приоритет",165:"Радијус Пхарма",166:"одузети за Кс секунди",167:"диверзија војника",400:"Пилана",401:"глине",402:"рудник гвожђа",403:"Фарма",404:"Пилана",405:"Циглана",406:"Гвоздена радови",407:"Брашно Млин",408:"Пекара",409:"Складиште",410:"Деца",411:"Ковачница",412:"Ковачница оклоп",413:"Арени",414:"Главна зграда",415:"окупљања",416:"тржиште",417:"амбасада",418:"Касарна",419:"Стабилна",420:"Радионица",421:"Академија",422:"Тајна",423:"Градска кућа",424:"Ресиденце",425:"Палас",426:"Трезор",427:"Привредна комора",428:"Велика касарна",429:"Велика Стабилна",430:"Цити Валлс",431:"Земљани зид",432:"Ограда",433:"Клесар",434:"Пивара",435:"Траппер",436:"Коноба",437:"Велики Складиште",438:"Велики Амбар",439:"чудо света",460:"Наредба трупе",461:"Студија трупа",462:"Изградња",463:"Побољшање",464:"Имплементација празника",501:"Контрола",502:"Опције",503:"Помоћ",504:"Рација",505:"Јачање",506:"уобичајена напад",507:"Римљани",508:"Немци",509:"Гале",600:"Подаци успешно сачувана",601:"задатак је направио власник",602:"Све подешавања пријаве ресетовање",603:"Инсталирани нове радијус",604:"нови линк",605:"додаје се нови пут",606:"Грешка",607:"Подаци додат ред",608:"Таква студија је већ у реду",609:"Ова зграда је већ стоји у реду за рушење",610:"Унапређење и тако је највиши ниво",611:"У датом ћелија је изградити нешто",612:"Ова зграда је у изградњи у овом селу",613:"зграде и тако ће имати највиши ниво",614:"Комуникација",615:"поново све Пхарма",616:"Да уништи није ништа",617:"Ауто-скенирање свих села",618:"Пошаљи трупе",619:"уништавање зграда",620:"Изградња објеката",621:"Слање дилери",622:"Нивои зграда",623:"Спољашње везе",624:"Брзи линкови",625:"Аутоматска уласка пријавите неуспеха",626:"Дугме развој",627:"Ово село је већ у фармацеутској листи",628:"Уклони потпуности од фарме лист",629:"Село је наведена у фармацеутској листи",630:"Страна јКБот Т4.0",631:"Затвори јКБот Т4.0",632:"Ресетуј Апликација",633:"Престаните да догађаји Рун тајмера",634:"Бежите догађаји Рун тајмер",635:"Преглед променљиве ГМ",636:"Уклони варијабле ГМ",637:"Погледај кукија корак по корак",638:"Уклањање кукија по принципу",639:"Погледај променљиве апликацију",640:"Проблеми са утоваром Мини, искључите сукобљених програма",641:"Претрага",642:"Подешавања претраге",643:"Радијус",644:"Тражи комплетан",645:"Оаза",646:"Аукција",647:"села",648:"Бежите Денвер 3",649:"координате",650:"Упдате",651:"Додај у фарми селу лист",652:"Престаните да напади са губицима изнад",653:"Промене су сачуване",654:"Пријава",655:"Лозинка",656:"Подешавање аутоматског уноса пријаву квара",700:"[3]-послати трупе",701:"[3] + Слање трупа",702:"[6] Слање дилери",703:"[6] + Слање дилери",704:"[1] извлачење војске",705:"[1] + Изазов војска",706:"[4], руше зграде",707:"[4] + руше зграде",708:"[2] збир свих",709:"[2] + Укупна свих",710:"[5] Укупно од свих (зграде)",711:"[5] + Укупна свих (зграде)",1001:"Легионар",1002:"Преторијанац",1003:"Империјанац",1004:"Коњ скаут",1005:"коњица цара",1006:"коњица Цезара",1007:"Таран",1008:"Ватрени катапулт",1009:"сенатор",1010:"Насељеник",1011:"Херој",1012:"Батинар",1013:"Копљаник",1014:"Акефигхтер",1015:"Скаут",1016:"паладин",1017:"Тевтонски коњицу",1018:"овна",1019:"Катапулт",1020:"Главни",1021:"Насељеник",1022:"Херој",1023:"Фаланга",1024:"мачевалац",1025:"Патхфиндер",1026:"Тхеутатес Тхундер",1027:"Врач Ридер",1028:"Коњаник",1029:"Таран",1030:"Катапулт",1031:"Лидер",1032:"Насељеник",1033:"Херој"};
var lang_se={1:"Om",2:"Farm lista",3:"line apotek",4:"Programinställningar",5:"kö bygger trupper",6:"Den kö studien trupperna",7:"Den raden av nya byggnader",8:"Linjen förbättringar av byggnader",9:"Den kö rivning",10:"Summan av alla beställningar",11:"Linjen förbättringar trupper",12:"Avfallshantering av trupper",13:"The Notebook",14:"Länkar",15:"byns centrum",16:"Genomförande av semester",17:"handelsvägar",18:"köp och försäljning MEDEL",19:"Spelet är på auktion",20:"alla byar MEDEL",21:"Armé av alla byar",22:"Förflyttning av trupper i alla byar",23:"Log",24:"Farm lista",25:"Linjen apoteket",26:"Den kö beställning trupper",27:"Den kö studien trupperna",28:"Linjen förbättringar trupper",29:"Summan av alla beställningar",30:"Avfallshantering av trupper",31:"Vågor",32:"Villages",33:"alla byar MEDEL",34:"Armé av alla byar",35:"Förflyttning av trupper i alla byar",36:"Linjen byggandet av nya byggnader",37:"Linjen förbättringar av byggnader",38:"Den kö rivning",39:"Analys",40:"Analys av attacker allians",41:"Analys Report",42:"Hero",43:"Skicka automatiskt en hjälte på jakt",44:"automatisk pumpning av hjälten i oaser",45:"Kultur",46:"Automatisk hålla firande",47:"Handel och resurser",48:"auto-balansering med hjälp av hjälten MEDEL",49:"automatisk balansering RESURSER i byarna med hjälp av köpmän",50:"handelsvägar",51:"Att köpa och sälja MEDEL",52:"Auktion",53:"Spelet är på auktion",54:"Att köpa rätt saker",55:"Karta",56:"Hitta 15 och 9",57:"Hitta de svaga och värnlösa",58:"Karta över handelsvägar",59:"Kartan stekpannor",60:"Karta över alliansen",61:"Karta över fiender",62:"Utveckling",63:"Automatisk utveckling",64:"quests",65:"Automatisk utveckling av nya byar",66:"Allmänt",67:"Notebook",68:"Om",69:"Programinställningar",70:"Logg",71:"Länkar",72:"Central Village",73:"Statistik",74:"Antalet trupper",75:"Den grad av utveckling MEDEL",76:"Statistik Online",77:"Control",78:"Den schemat på nätet",79:"En plan över verksamheten",80:"Inställning skicka sms",81:"Styrning via ICQ",82:"Skicka informationen till servern samordna alliansen",83:"Logga in på servern samordna alliansen",84:"Army",85:"Reset",86:"Rensa",87:"Spara",88:"OK",89:"Förstör senare",90:"Programinställningar",91:"Språk",92:"För frågor, vänligen",93:"Namn",94:"Välj till ett pris under",95:"Inköp till ett pris under",96:"är * Inköp inte genomförts och kommer sannolikt inte:)",97:"Salva",98:"Scroll",99:"Cage",100:"Kör jQBot T4",101:"Order senare",102:"Bygg senare",103:"Att undersöka senare",104:"Ny handelsvägen",105:"Att skapa en rutt till",106:"input koordinater",107:"OK",108:"Avbryt",109:"Namn",110:"Link",111:"Öppna i aktuella fliken",112:"Öppna i ny flik",113:"Stop",114:"Skicka den sist i listan",115:"+ ström",116:"Återställ alla attacker tills aktuell tid",117:"Clear Queue Pharma",118:"Utför senare",119:"Förstör senare",120:"Nya länkar",121:"Typ",122:"Förstärkning",123:"Den vanliga attack",124:"The Raid",125:"Frekvens",126:"oavsiktlig förskjutning",127:"Den typ av attack",128:"en attack",129:"2 Attack",130:"3 attacker",131:"5 attacker",132:"10 attacker",133:"15 attacker",134:"20 attacker",135:"25 attacker",136:"30 attacker",137:"40 attacker",138:"50 attacker",139:"75 attacker",140:"100 attack",141:"The Village",142:"Tid",143:"Armén",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Avsändare",150:"mottagare",151:"Resurser",152:"Perioden",153:"Skicka till",154:"Nej",155:"Beställ typ",156:"Construction",157:"Level",158:"folket",159:"Perioden av timer händelser",160:"Perioden av skannern",161:"Summan av alla",162:"Order armén om det finns en byggnad",163:"Att bygga på vad som saknas MEDEL",164:"Att bygga allt i prioritetsordning",165:"Radius Pharma",166:"take away för X sekunder",167:"Den avledning av trupper",400:"sågverk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"sågverk",405:"Brickyard",406:"Iron Works",407:"kvarn",408:"Bageri",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Huvudbyggnad",415:"Rally Point",416:"Marknad",417:"Ambassaden",418:"Den Barracks",419:"Stable",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"Handelskammaren",428:"Stor barack",429:"Stort stall",430:"City Walls",431:"Earth Wall",432:"staket",433:"Stenhuggare",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Beställ trupperna",461:"En studie av trupper",462:"Byggnad",463:"förbättring",464:"Genomförandet av semestern",501:"Control",502:"Alternativ",503:"Hjälp",504:"The Raid",505:"Förstärkning",506:"Den vanliga attack",507:"Romarna",508:"Tyskarna",509:"Galla",600:"Data sparats",601:"Den uppgift som ägaren",602:"Alla programinställningar återställning",603:"installerat nya radie",604:"En ny länk",605:"Lade till en ny rutt",606:"Fel",607:"De uppgifter som lagts till i kön",608:"En sådan studie är redan i kön",609:"Den här byggnaden står redan i kö för rivning",610:"Förbättrad och så har den högsta nivå",611:"I en cell är att bygga något",612:"Denna byggnad är under uppförande i den här byn",613:"Byggnaden och så har högsta nivå",614:"Kommunikation",615:"återskapade alla pharma",616:"Att förstöra är ingenting",617:"Auto-scanning av alla byar",618:"Sänd trupper",619:"Den förstörelse av byggnader",620:"Den uppförande av byggnader",621:"Skicka återförsäljare",622:"Nivåerna av byggnader",623:"Externa länkar",624:"Snabblänkar",625:"Automatisk inmatning av inloggning misslyckande",626:"Knappar utveckling",627:"Det här byn är redan i läkemedels-listan",628:"Ta bort helt från gården blad",629:"Byn finns med i den farmaceutiska listan",630:"Sidan jQBot T4",631:"Stäng jQBot T4",632:"Återställ Ansökan",633:"Stoppa händelserna köra tidsinställda",634:"Kör händelser köra timer",635:"Visa variabler GM",636:"Ta bort de variabler GM",637:"Visa Cookie har steg för steg",638:"Borttagning av Cookie tur-baserade",639:"Visa ansökan variabler",640:"Problem med att ladda minimapen, stäng av motstridiga programmet",641:"Sök",642:"Sök Inställningar",643:"Radie",644:"Sök komplett",645:"Oasis",646:"Auktion",647:"Villages",648:"Kör Denver 3",649:"Koordinater",650:"Uppdatera",651:"Lägg till på gården byn Leaf",652:"Sluta attacker med förluster över",653:"Förändringar sparas",654:"Logga in",655:"lösenord",656:"Inställning av automatisk inmatning av en inloggning misslyckande",700:"[3]-sända trupper",701:"[3] + skicka trupper",702:"[6] Skickar återförsäljare",703:"[6] + Skickar återförsäljare",704:"[1] utvinning av armén",705:"[1] + Challenge Army",706:"[4], demolera byggnaden",707:"[4] + demolera byggnaden",708:"[2] Summan av alla",709:"[2] + Total av alla",710:"[5] Summan av alla (byggnad)",711:"[5] + Total av alla (byggnad)",1001:"Legionär",1002:"Praetorian",1003:"Imperian",1004:"Häst scout",1005:"Den kavalleri av kejsaren",1006:"Den kavalleri Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Nybyggare",1011:"Hero",1012:"Klubbman",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germanska kavalleri",1018:"murbräcka",1019:"Katapult",1020:"The Chief",1021:"Nybyggare",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates blixt",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Nybyggare",1033:"Hero"};
var lang_si={1:"O",2:"Farm List",3:"line lekarna",4:"Application Settings",5:"čakalne vrste je stavba enot",6:"čete Študija čakalne vrste",7:"linija gradnjo novih stavb",8:"line izboljšave stavb",9:"čakalni vrsti rušenje",10:"Skupna vseh naročil",11:"line izboljšave vojakov",12:"Odstranjevanje vojakov",13:"The Notebook",14:"Koristne povezave",15:"Vas center",16:"Izvajanje počitnic",17:"trgovske poti",18:"VIRI prodaji in nakupu",19:"Igra je na dražbi",20:"vse vasi virov",21:"Army vseh vasi",22:"Gibanje čet vseh vasi",23:"Log",24:"Farm List",25:"line lekarna",26:"čakalni vrsti naročanje vojakov",27:"čete Študija čakalne vrste",28:"line izboljšave vojakov",29:"Skupna vseh naročil",30:"Odstranjevanje vojakov",31:"Waves",32:"Villages",33:"vse vasi virov",34:"Army vseh vasi",35:"Gibanje čet vseh vasi",36:"line gradnjo novih stavb",37:"line izboljšave stavb",38:"čakalni vrsti rušenje",39:"Analiza",40:"Analiza zveza napadov",41:"analizni izvid",42:"Hero",43:"Samodejno pošlji junak na prizadevanjih",44:"Samodejno črpanje junak v oaze",45:"Kultura",46:"Automatic imajo praznovanja",47:"Trgovina in viri",48:"auto-uravnoteženje s pomočjo junak virov",49:"auto-uravnoteženje VIRI v vaseh s pomočjo trgovci",50:"trgovske poti",51:"Nakup in prodaja vire",52:"dražbe",53:"Igra je na dražbi",54:"Nakup prave stvari",55:"Map",56:"Iskanje 15 in 9",57:"Najdi šibke in nemočne",58:"Map of trgovskih poti",59:"map soline",60:"Map of zavezništva",61:"Map of sovražnikov",62:"razvoj",63:"Samodejno Development",64:"gostje",65:"Samodejno razvoj novih vasi",66:"Splošno",67:"Notebook",68:"O",69:"Application Settings",70:"dnevnik",71:"Koristne povezave",72:"Central Village",73:"Statistika",74:"Število enot",75:"višino sredstev za razvoj",76:"Statistika Online",77:"Control",78:"urnik online",79:"urnik dejavnosti",80:"Nastavitev pošiljanje sms",81:"Control preko ICQ",82:"Pošlji podatke na strežnik usklajevanje zveza",83:"Prijavite se na strežniku usklajevanje zveza",84:"Army",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy kasneje",90:"Application Settings",91:"Language",92:"Za kakršna koli vprašanja, prosim",93:"Ime",94:"Select po ceni, nižji",95:"Nakup po ceni, nižji",96:"je * Purchasing ne izvaja in bo po vsej verjetnosti ne:)",97:"Mazilo",98:"Izberite",99:"Cage",100:"Run jQBot T4",101:"Order Kasneje",102:"Build kasneje",103:"Da bi kasneje razišče",104:"Nova trgovska pot",105:"Če želite ustvariti pot do",106:"vnos koordinate",107:"OK",108:"Cancel",109:"Ime",110:"Link",111:"Open v trenutni zavihek",112:"Odpri v novem zavihku",113:"Stop",114:"Pošlji zadnji na seznamu",115:"+ trenutni",116:"Ponastavi vse napade do trenutnega časa",117:"Clear Queue Pharma",118:"Opravite kasneje",119:"Destroy kasneje",120:"Nove povezave",121:"Tip",122:"Okrepitev",123:"običajne napad",124:"Raid",125:"Frequency",126:"nenadnimi premiki",127:"vrsta napada",128:"napad",129:"2 Attack",130:"3 napadi",131:"5 napadov",132:"10 napadov",133:"15 napadov",134:"20 napadov",135:"25 napadov",136:"30 napadov",137:"40 napadov",138:"50 napadov",139:"75 napadov",140:"100 napad",141:"The Village",142:"Time",143:"vojska",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Sender",150:"Receiver",151:"Viri",152:"Obdobje",153:"Pošlji",154:"Ne",155:"Order tip",156:"Gradbeništvo",157:"Level",158:"People",159:"obdobje timer dogodkov",160:"obdobje skener",161:"Vsota vseh",162:"Naroči vojsko, če je stavba",163:"Gradimo na tisto, kar manjka sredstev",164:"Building vse, da bi prednostne naloge",165:"Radius Pharma",166:"odvzela za sekund X",167:"zlorabe vojakov",400:"Žaga",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Žaga",405:"Brickyard",406:"Iron Works",407:"Moka Mill",408:"Pekarna",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"ceh",415:"Rally Point",416:"Market",417:"veleposlaništvo",418:"Barake",419:"stabilen",420:"Delavnica",421:"Akademija",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Treasury",427:"Gospodarska zbornica",428:"Velike barake",429:"Velika konjušnica",430:"Mesto Walls",431:"Earth Wall",432:"Fence",433:"Klesar",434:"Pivovarna",435:"pasti",436:"Taverna",437:"Veliko skladišče",438:"Big Barn",439:"čudo sveta",460:"Naroči čete",461:"Študija vojakov",462:"Building",463:"Izboljšanje",464:"Izvajanje počitnic",501:"Control",502:"Options",503:"Help",504:"Raid",505:"Okrepitev",506:"običajne napad",507:"Rimljani",508:"Nemci",509:"Galla",600:"Podatki uspešno shranjeni",601:"Ta naloga je lastnik",602:"Vse nastavitve aplikacije reset",603:"Installed nov polmer",604:"nov link",605:"Dodano novo pot",606:"Error",607:"Podatki, dodani v čakalno vrsto",608:"Takšna študija je že v čakalni vrsti",609:"Ta stavba je že stoji v vrsti za rušenje",610:"Izboljšanje in tako je na najvišji ravni",611:"V določenem celici zgraditi nekaj",612:"Ta stavba je v gradnji v tej vasi",613:"gradnje in tako bo imel najvišjo raven",614:"sporočilo",615:"poustvarili vse pharma",616:"Da bi uničili ni nič",617:"Auto-skeniranje vseh vasi",618:"Pošlji enote",619:"uničenje stavb",620:"Gradnja stavb",621:"Pošiljanje trgovci",622:"Stopnje zgradb",623:"Zunanje povezave",624:"Quick Links",625:"Automatic login vnos neuspeha",626:"Buttons Development",627:"To vas je že v farmacevtski seznamu",628:"odstrani popolnoma iz kmetije lista",629:"Vas je navedena v farmacevtski seznamu",630:"Page jQBot T4",631:"Zapri jQBot T4",632:"Reset Application",633:"Stop dogodkov ura teče",634:"Run dogodki timer teči",635:"Prikaz spremenljivke GM",636:"Odstrani spremenljivk GM",637:"korak View Cookie je za korakom",638:"Odstranjevanje Cookie je turn-based",639:"Poglej uporabo spremenljivk",640:"Težave z nalaganjem MiniMap, izklopite nasprotujoče si program",641:"Search",642:"Search Settings",643:"Radius",644:"Search popolna",645:"Oasis",646:"dražbe",647:"Villages",648:"Run Denver 3",649:"Koordinate",650:"Update",651:"Dodaj na kmetiji vasi Leaf",652:"Stop napade z izgubami zgoraj",653:"Spremembe shranjene",654:"Prijava",655:"password",656:"Nastavitev samodejnega vnosa login neuspeha",700:"[3]-Send vojakov",701:"[3] + Pošiljanje vojakov",702:"[6] Pošiljam trgovci",703:"[6] + Pošiljanje trgovci",704:"[1] pridobivanje vojske",705:"[1] + Challenge Army",706:"[4], uničenjem stavbe",707:"[4] + uničenjem stavbe",708:"[2] skupaj z vsemi",709:"[2] + Skupaj vseh",710:"[5] skupaj z vsemi (stavbe)",711:"[5] + Skupaj vseh (stavbe)",1001:"Legionnaire",1002:"Pretorske",1003:"Imperian",1004:"Horse scout",1005:"konjenico od cesarja",1006:"konjenica Cezar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"naseljencev",1011:"Hero",1012:"Gorjačar",1013:"Spearmanov",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Tevtonski konjenica",1018:"Oven",1019:"Catapult",1020:"Glavni",1021:"naseljencev",1022:"Hero",1023:"Falanga",1024:"Mečevalec",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"naseljencev",1033:"Hero"};
var lang_sk={1:"O",2:"Farma List",3:"linka lekáreň",4:"Nastavenie aplikácie",5:"Fronta je stavebné jednotky",6:"vojaci frontu štúdie",7:"línie výstavby nových budov",8:"Rad vylepšenia budov",9:"front demolácie",10:"Súčet všetkých zákaziek",11:"linka vylepšenia vojakov",12:"Likvidácia vojakov",13:"Notebook",14:"Užitočné odkazy",15:"centrum obce",16:"Implementácia prázdnin",17:"obchodné cesty",18:"pri predaji a nákupe zdrojov",19:"Hra je v aukcii",20:"Všetky dediny zdrojov",21:"Armáda všetkých dedín",22:"Pohyby vojsk zo všetkých dedín",23:"Log",24:"Farma List",25:"linka lekáreň",26:"front objednanie vojakov",27:"vojaci frontu štúdie",28:"linka vylepšenia vojakov",29:"Súčet všetkých zákaziek",30:"Likvidácia vojakov",31:"Vlny",32:"Dedina",33:"Všetky dediny zdrojov",34:"Armáda všetkých dedín",35:"Pohyby vojsk zo všetkých dedín",36:"líniové stavby nových budov",37:"Rad vylepšenia budov",38:"front demolácie",39:"Analýza",40:"Analýza útokov Aliancie",41:"správa o analýze",42:"Hero",43:"automaticky odoslať hrdinu na ceste",44:"Automatické čerpanie hrdinu v oázach",45:"Kultúra",46:"Automatické organizovanie osláv",47:"Obchod a zdroje",48:"auto-vyváženie pomocou hrdinu zdrojov",49:"auto-balancing ZDROJOV v obciach s pomocou obchodníkov",50:"obchodné cesty",51:"Nákup a predaj zdrojov",52:"Aukcie",53:"Hra je v aukcii",54:"Nákup správne veci",55:"Mapa",56:"Nájdenie 15 a 9",57:"Nájdite slabé a bezbranné",58:"Mapa obchodných ciest",59:"máp panvy",60:"Mapa aliancie",61:"Mapa nepriateľov",62:"Vývoj",63:"Automatické rozvoja",64:"questy",65:"Automatické vytváranie nových dedín",66:"General",67:"notebook",68:"O",69:"Nastavenie aplikácie",70:"Log aplikácie",71:"Užitočné odkazy",72:"Central Village",73:"Štatistika",74:"Počet jednotiek",75:"úrovni rozvoja zdrojov",76:"Statistics on-line",77:"Control",78:"Program online",79:"Program činnosti",80:"Nastavenie odosielania SMS",81:"ovládanie cez ICQ",82:"zaslať informácie na server koordinačné Aliancia",83:"Prihlásenie k serveru koordinačnej Aliancie",84:"armáda",85:"Reset",86:"Clear",87:"Uložiť",88:"OK",89:"Zničte neskôr",90:"Nastavenie aplikácie",91:"Jazyk",92:"V prípade akýchkoľvek otázok, prosím",93:"Meno",94:"Select za cenu nižšiu ako",95:"Nákup za cenu nižšiu ako",96:"* Nákup nebol realizovaný a bude s najväčšou pravdepodobnosťou nebude:)",97:"masť",98:"scroll",99:"klietka",100:"Run jQBot T4",101:"objednávku neskôr",102:"Build neskôr",103:"skúmať neskôr",104:"Nové obchodná cesta",105:"Ak chcete vytvoriť cestu k",106:"Vstup súradníc",107:"OK",108:"Zrušiť",109:"Meno",110:"Link",111:"Otvoriť v aktuálnej záložke",112:"Otvoriť v novej záložke",113:"Stop",114:"odoslať posledný v zozname",115:"+ aktuálny",116:"Obnoviť všetky útoky až do aktuálneho času",117:"Clear frontu Pharma",118:"Vykonajte neskôr",119:"Zničte neskôr",120:"Nové stránky",121:"Typ",122:"posilnenie",123:"Obvyklý útok",124:"Raid",125:"Frekvencia",126:"náhodnému posunu",127:"typ útoku",128:"útok",129:"2 Attack",130:"3 útoky",131:"5 útoky",132:"10 útokov",133:"15 útokov",134:"20 útokov",135:"25 útokov",136:"30 útokov",137:"40 útokov",138:"50 útokov",139:"75 útokov",140:"100 útok",141:"The Village",142:"Čas",143:"Armáda",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"zrno",149:"Odosielateľ",150:"Prijímač",151:"Zdroje",152:"Obdobie",153:"Odoslať",154:"Nie.",155:"typové",156:"Stavba",157:"Level",158:"People",159:"Doba časovača",160:"Doba skenera",161:"súčet všetkých",162:"Order armáda Ak je stavba",163:"V nadväznosti na to, čo chýba zdroje",164:"Stavebné všetko v poradí",165:"Radius Pharma",166:"Vezmite preč sekúnd X",167:"zneužívanie vojakov",400:"Pila",401:"Clay Pit",402:"Železný baňa",403:"The Farm",404:"Pila",405:"Tehelňa",406:"Iron Works",407:"mlyna",408:"Pekáreň",409:"skladu",410:"Stodola",411:"kováč",412:"Forge Armor",413:"Arena",414:"Hlavná budova",415:"Rally Point",416:"Trh",417:"veľvyslanectvo",418:"Kasárne",419:"Stable",420:"Workshop",421:"Akadémia",422:"Tajné",423:"Radnica",424:"bydlisko",425:"Palace",426:"štátnej pokladnice",427:"Hospodárska komora",428:"Veľké kasárne",429:"Veľké stajne",430:"hradby",431:"Krajina Wall",432:"plot",433:"Kamenár",434:"pivovaru",435:"lovca",436:"krčma",437:"Veľké skladisko",438:"veľká stodola",439:"Div sveta",460:"Rád vojsk",461:"Štúdia vojakov",462:"Building",463:"zlepšenie",464:"Implementácia prázdnin",501:"Control",502:"Options",503:"Help",504:"Raid",505:"posilnenie",506:"Obvyklý útok",507:"Rimania",508:"Nemci",509:"Galla",600:"Dáta boli úspešne uložené",601:"Úlohou je vlastníkom",602:"Všetky nastavenia aplikácie reset",603:"nainštalovali nový okruh",604:"Nové spojenie",605:"dodal novú cestu",606:"Chyba",607:"Data pridanie do frontu",608:"Táto štúdia je už vo fronte",609:"Táto budova je už vo fronte k demolácii",610:"zlepšenie, a tak bola na najvyššej úrovni",611:"V danej bunke je vytvoriť niečo",612:"Táto budova je vo výstavbe v tejto obci",613:"Budova, takže bude mať najvyššej úrovni",614:"Komunikácia",615:"znovu všetky Pharma",616:"zničiť nič",617:"Auto-testovanie všetkých dedín",618:"poslať vojakov",619:"Zničenie budov",620:"Výstavba budov",621:"Posielam predajcovia",622:"úrovňami budov",623:"Externé odkazy",624:"Rýchle odkazy",625:"Automatická vstupu Prihlásiť zlyhanie",626:"Tlačidlá pre rozvoj",627:"Táto dedina je už vo farmaceutickom zoznamu",628:"odstrániť kompletne z farmy list",629:"Obec je uvedený vo farmaceutickom zozname",630:"Page jQBot T4",631:"Zavrieť jQBot T4",632:"Reset aplikácie",633:"Stop udalosti beh časovača",634:"Beh udalostí, timer run",635:"Informácie o premennej GM",636:"Odstrániť premennej GM",637:"Zobraziť Cookie je krok za krokom",638:"Odstránenie Cookie je otočenie-umiestnený",639:"Zobraziť aplikačné premennej",640:"Problémy s načítaním minimape, vypnite problematický program",641:"Hľadať",642:"Search Settings",643:"Radius",644:"Hľadať kompletný",645:"Oasis",646:"Aukcie",647:"Dedina",648:"Run Denver 3",649:"súradnice",650:"Update",651:"Pridať na statku dedine Leaf",652:"Stop útokom so stratami hore",653:"Zmeny boli uložené",654:"Prihlásiť sa",655:"heslo",656:"Nastavenie automatického vstupu login zlyhanie",700:"[3], poslať vojakov",701:"[3] + vyslanie vojsk",702:"[6] Odosielanie obchodníkov",703:"[6] + Odoslanie obchodníkov",704:"[1] ťažba armády",705:"[1] + Challenge armáda",706:"[4], zbúrať budovy",707:"[4] + demoláciu budovy",708:"[2] súčet všetkých",709:"[2] + Celkový počet všetkých",710:"[5] Celkom všetky (budova)",711:"[5] + súčet všetkých (budova)",1001:"Legionár",1002:"Praetorian",1003:"Imperián",1004:"Kôň Scout",1005:"jazda cisára",1006:"kavalérie Caesar",1007:"Taran",1008:"Požiarne katapult",1009:"senátor",1010:"osadník",1011:"Hero",1012:"Pálkar",1013:"Oštepár",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germánskej kavalérie",1018:"baranidlo",1019:"Katapult",1020:"The Chief",1021:"osadník",1022:"Hero",1023:"Phalanxy",1024:"Šermiar",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"osadník",1033:"Hero"};
var lang_tr={1:"Hakkında",2:"Çiftlik Listesi",3:"çizgi eczane",4:"Uygulama Ayarları",5:"kuyruk asker inşa ediyor",6:"kuyruk çalışma askerleri ",7:"Yeni bina yapımı çizgi",8:"Binaların hattı iyileştirme",9:"kuyruk yıkım",10:"Tüm siparişlerin toplam",11:"çizgi gelişmeler asker",12:"asker atılması",13:"The Notebook",14:"Faydalı Linkler",15:"köy merkezine",16:"tatil Uygulanması",17:"Ticaret Yolları",18:"satış ve satın alma KAYNAKLARI",19:"Oyun müzayede açık",20:"Tüm köy KAYNAKLARI",21:"Tüm köylerin Ordusu",22:"Tüm köy birliklerinin Hareketleri",23:"Log",24:"Çiftlik Listesi",25:"çizgi eczane",26:"sipariş kuyruğu asker",27:"kuyruk çalışma askerleri ",28:"çizgi gelişmeler asker",29:"Tüm siparişlerin toplam",30:"asker atılması",31:"Dalgalar",32:"Köyler",33:"Tüm köy KAYNAKLARI",34:"Tüm köylerin Ordusu",35:"Tüm köy birliklerinin Hareketleri",36:"Yeni bina hattı yapımı",37:"Binaların hattı iyileştirme",38:"kuyruk yıkım",39:"Analiz",40:"saldırıları ittifak Analizi",41:"Analiz Raporu",42:"Hero",43:"Otomatik olarak arayış bir kahraman gönder",44:"vahalar içinde kahraman pompalama Otomatik",45:"Kültür",46:"Otomatik tutma kutlamaları",47:"Ticaret ve KAYNAKLARI",48:"kahraman KAYNAKLARI yardımıyla otomatik dengeleme",49:"tüccar yardımıyla köylerde otomatik dengeleme KAYNAKLARI",50:"Ticaret Yolları",51:"KAYNAKLARI Alış ve satış",52:"Açık Artırma",53:"Oyun müzayede açık",54:"doğru şeyleri satın almak",55:"Map",56:"15 ve 9 bulma",57:"zayıf ve savunmasız bul",58:"ticaret yollarının Haritası",59:"haritası tava",60:"ittifak Haritası",61:"düşman Haritası",62:"Geliştirme",63:"Otomatik Geliştirme",64:"görevler",65:"Yeni köy otomatik olarak geliştirilmesi",66:"Genel",67:"Notebook",68:"Hakkında",69:"Uygulama Ayarlar",70:"Günlük Uygulama",71:"Faydalı Linkler",72:"Merkez Köy",73:"İstatistik",74:"asker sayısı",75:"kalkınma KAYNAK seviyesi",76:"İstatistik Online",77:"Kontrol",78:"programı online",79:"faaliyet planı",80:"gönderme sms ayarlama",81:"ICQ üzerinden kontrol",82:"ittifak koordine sunucuya bilgi gönder",83:"ittifak koordine sunucuya oturum açın",84:"Ordu",85:"Reset",86:"Temizle",87:"Kaydet",88:"OK",89:"daha sonra yok",90:"Uygulama Ayarlar",91:"Dil",92:"Herhangi bir sorunuz için lütfen",93:"Ad",94:"altında bir fiyata seçin",95:"altında bir fiyata satın alma",96:":) * Satınalma uygulanmadı ve büyük olasılıkla değil",97:"merhem",98:"gelin",99:"Kafes",100:"jQBot T4 Çalıştır",101:"Daha sonra Düzen",102:"Daha sonra Build",103:"Daha sonra araştırmak için",104:"Yeni ticaret yolu",105:"bir yol oluşturmak için",106:"giriş koordinatları",107:"OK",108:"İptal",109:"Ad",110:"Bağlantı",111:"Geçerli sekmede açma",112:"Yeni sekmede aç",113:"Dur",114:"listedeki son Gönder",115:"+ geçerli",116:"Geçerli saat kadar tüm saldırıları Reset",117:"Clear Queue Pharma",118:"Daha sonra yapın",119:"daha sonra yok",120:"Yeni Bağlantılar",121:"Tip",122:"Takviye",123:"Her zamanki saldırı",124:"Raid",125:"Frekans",126:"Kaza yerinden",127:"saldırı türü",128:"bir saldırı",129:"2 Attack",130:"3 saldırıları",131:"5 saldırıları",132:"10 saldırı",133:"15 saldırı",134:"20 saldırı",135:"25 saldırı",136:"30 saldırı",137:"40 saldırı",138:"50 saldırı",139:"75 saldırı",140:"100 krizi",141:"Köy",142:"Zaman",143:"ordu",144:"Kumarbaz",145:"Ağacı",146:"Kil",147:"Demir",148:"Tane",149:"Gönderen",150:"Alıcı",151:"KAYNAKLAR",152:"Dönem",153:"Alıcı",154:"Hayır.",155:"Sipariş tipi",156:"İnşaat",157:"Level",158:"People",159:"zamanlayıcı olaylar dönemi",160:"tarayıcının dönemi",161:"Tüm toplam",162:"Bir bina varsa ordu Yoldaşlığı",163:"KAYNAKLARI eksik ne Bina",164:"öncelik sırasına göre tüm Binası",165:"Radius Pharma",166:"X saniye götürmek",167:"askerlerinin saptırma",400:"Sawmill",401:"Tuğla Ocağı",402:"Demir Madeni",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Demir İşleri",407:"Değirmen",408:"Fırın",409:"Depo",410:"The Barn",411:"Demirci",412:"Forge Zırh",413:"Arena",414:"Ana Bina",415:"Rally Point",416:"Piyasa",417:"Büyükelçilik",418:"Kışla",419:"Durağan",420:"Atölye",421:"Akademi",422:"Gizli",423:"Town Hall",424:"Residence",425:"Saray",426:"Hazine",427:"Ticaret Odası",428:"Büyük Kışla",429:"Büyük Ahır",430:"Surları",431:"Askeri Üs",432:"Çit",433:"taş ustası",434:"Brewery",435:"Trapper",436:"Tavern",437:"Büyük Hammadde Deposu",438:"Büyük Barn",439:"Dünya harikası",460:"asker Emri",461:"askeri bir çalışma",462:"Bina",463:"İyileştirme",464:"tatil Uygulanması",501:"Denetim",502:"Seçenekler",503:"Yardım",504:"Raid",505:"Takviye",506:"Her zamanki saldırı",507:"Romalılar",508:"Almanlar",509:"Galla",600:"Veri başarıyla kaydedildi",601:"Görev sahibi olur",602:"Bütün uygulama ayarlarını sıfırlamak",603:"Yüklü yeni yarıçapı",604:"Yeni bir bağlantı",605:"Yeni bir rota eklendi",606:"Hata",607:"veri sıra eklenen",608:"Böyle bir çalışma sıra zaten",609:"Bu bina daha önce yıkım için sırada duruyor",610:"Geliştirme ve böylece en üst düzeyde var",611:"Belirli bir hücreye bir şey inşa ederiz",612:"Bu bina bu köyde yapım aşamasındadır",613:"bina ve böylece en üst düzeyde olacak",614:"İletişim",615:"Tüm ilaç yeniden",616:"yok etmek için başka bir şey değildir",617:"Tüm köylerde otomatik tarama",618:"Gönder asker",619:"Binaların yıkımı",620:"Binaların inşaatı",621:"bayi Gönderme",622:"Binaların Düzeyleri",623:"Dış bağlantılar",624:"Hızlı Erişim",625:"oturum açmadığını otomatik giriş",626:"Düğmeler Geliştirme",627:"Bu köy zaten ilaç listesi içindedir",628:"çiftlik levha tamamen kaldırma",629:"köy ilaç listesinde olan",630:"Sayfa jQBot T4",631:"Kapat jQBot T4",632:"Reset Uygulama",633:"çalıştırmak Zamanlayıcı olayları durdurun",634:"çalıştırmak Zamanlayıcı olayları Çalıştır",635:"Görüntüleme değişkenleri GM",636:"değişkenleri GM Kaldır",637:"adım görüntüle Cookie Kullanıcı adım",638:"Çerez sırası tabanlı çıkarılması",639:"uygulama değişkenleri View",640:"mini yükleme ile ilgili sorunlar, çelişkili programı kapatın",641:"Ara",642:"Arama Ayarları",643:"Radius",644:"tam Ara",645:"Oasis",646:"Açık Artırma",647:"Köyler",648:"Run Denver 3",649:"Koordinatları",650:"Update",651:"Leaf çiftlik köyünde Ekle",652:"Yukarıda kayıpları ile saldırıları durdurun",653:"Değişiklikler kaydedildi",654:"Giriş",655:"parola",656:"Bir giriş başarısızlık otomatik giriş ayarlama",700:"[3]-asker gönderin",701:"[3] + asker gönderme",702:"[6] gönderme yapanlar",703:"[6] + gönderme yapanlar",704:"[1] ordusunun çıkarma",705:"[1] + meydan Ordusu",706:"[4], bina yıkmak",707:"[4] + bina yıkmak",708:"[2] toplam",709:"Tüm [2] + Toplam",710:"[5] (bina) toplam",711:"[5] (bina) + Toplam",1001:"Lejyoner",1002:"Praetorian",1003:"Emperiyanlar",1004:"At izci",1005:"İmparator süvari",1006:"Sezar'ın süvari",1007:"Taran",1008:"Ateş Mancınık",1009:"Senatör",1010:"Yerleşimci",1011:"Hero",1012:"Tokmak Sallayan",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Cermen süvari",1018:"battering ram",1019:"Mancınık",1020:"Şef",1021:"Yerleşimci",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Toytatin Thunder",1027:"Büyücü Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Lider",1032:"Yerleşimci",1033:"Hero"};
var lang_tw={1:"เกี่ยวกับ",2:"รายการฟาร์ม",3:"ร้านขายยาบรรทัด",4:"การตั้งค่าโปรแกรมประยุกต์",5:"คิวเป็นอาคารทหาร",6:"กองการศึกษาคิว",7:"สายของการก่อสร้างอาคารใหม่",8:"การปรับปรุงสายของอาคาร",9:"การรื้อถอนคิว",10:"รวมของการสั่งซื้อทั้งหมด",11:"กองกำลังปรับปรุงเส้น",12:"การกำจัดของทหาร",13:"The Notebook",14:"ลิงค์",15:"ศูนย์หมู่บ้าน",16:"การดำเนินการวันหยุด",17:"เส้นทางการค้า",18:"แหล่งขายและการซื้อ",19:"เป็นเกมที่เกี่ยวกับการประมูล",20:"ทรัพยากรในหมู่บ้านทั้งหมด",21:"กองทัพของหมู่บ้านทั้งหมด",22:"การเคลื่อนไหวของกองกำลังของหมู่บ้านทั้งหมด",23:"เข้าสู่ระบบ",24:"รายชื่อฟาร์ม",25:"ร้านขายยาบรรทัด",26:"ทหารคิวการสั่งซื้อ",27:"กองการศึกษาคิว",28:"กองกำลังปรับปรุงเส้น",29:"รวมคำสั่งซื้อทั้งหมด",30:"การกำจัดของทหาร",31:"คลื่น",32:"หมู่บ้าน",33:"ทรัพยากรในหมู่บ้านทั้งหมด",34:"กองทัพของหมู่บ้านทั้งหมด",35:"การเคลื่อนไหวของกองกำลังของหมู่บ้านทั้งหมด",36:"การก่อสร้างสายของอาคารใหม่",37:"การปรับปรุงสายของอาคาร",38:"การรื้อถอนคิว",39:"การวิเคราะห์",40:"การวิเคราะห์การโจมตีของพันธมิตร",41:"รายงานการวิเคราะห์",42:"Hero",43:"โดยอัตโนมัติส่งฮีโร่ในการแสวงหา",44:"Automatic สูบน้ำของพระเอกใน oases ที่",45:"วัฒนธรรม",46:'งานเฉลิมฉลองการถือหุ้น"โดยอัตโนมัติ',47:"การค้าและแหล่งข้อมูล",48:"auto สมดุลด้วยความช่วยเหลือของทรัพยากรของพระเอก",49:"ทรัพยากรอัตโนมัติสมดุลในหมู่บ้านด้วยความช่วยเหลือของร้านค้า",50:"เส้นทางการค้า",51:"ซื้อและขายทรัพยากร",52:"ประมูล",53:"เป็นเกมที่เกี่ยวกับการประมูล",54:"ซื้อสิ่งที่ถูกต้อง",55:"แผนที่",56:"หา 15 และ 9",57:"ค้นหาที่อ่อนแอและการป้องกัน",58:"แผนที่ของเส้นทางการค้า",59:"แผนที่กระทะ",60:"แผนที่ของพันธมิตร",61:"แผนที่ของศัตรู",62:"การพัฒนา",63:"การพัฒนาโดยอัตโนมัติ ",64:"เควส",65:"การพัฒนาระบบอัตโนมัติของหมู่บ้านใหม่",66:"ทั่วไป",67:"โน๊ตบุ๊ค",68:"เกี่ยวกับ",69:"การตั้งค่าโปรแกรมประยุกต์",70:"สมัครเข้าสู่ระบบ",71:"ลิงค์",72:"วิลเลจ Central",73:"สถิติ",74:"จำนวนของทหาร",75:"ระดับของการพัฒนาทรัพยากร",76:"สถิติออนไลน์",77:"ควบคุม",78:"ออนไลน์กำหนดการ",79:"กำหนดการของกิจกรรม",80:"การตั้งค่าส่ง SMS",81:"การควบคุมทาง ICQ",82:"ส่งข้อมูลไปยังเซิร์ฟเวอร์การประสานงานพันธมิตร",83:"เข้าสู่ระบบเซิร์ฟเวอร์การประสานงานพันธมิตร",84:"ทหารบก",85:"Reset",86:"Clear",87:"บันทึก",88:"OK",89:"ทำลายภายหลัง",90:"การตั้งค่าโปรแกรมประยุกต์",91:"ภาษา",92:"สำหรับคำถามใด ๆ โปรด",93:"ชื่อ",94:"เลือกในราคาที่ด้านล่าง",95:"การจัดซื้อในราคาที่ด้านล่าง",96:"การจัดซื้อ * ไม่ได้ดำเนินการและส่วนใหญ่จะไม่ :)",97:"Ointment",98:"เลื่อน",99:"กรง",100:"Run jQBot T4",101:"คำสั่งซื้อต่อมา",102:"สร้างภายหลัง",103:"การตรวจสอบภายหลัง",104:"เส้นทางการค้าใหม่",105:"การสร้างเส้นทางไปยัง",106:"พิกัดใส่",107:"OK",108:"ยกเลิก",109:"ชื่อ",110:"ลิงค์",111:"เปิดในแท็บปัจจุบัน",112:"เปิดในแท็บใหม่",113:"หยุด",114:"ส่งครั้งสุดท้ายในรายการ",115:"+ ปัจจุบัน",116:"ตั้งค่าการโจมตีทั้งหมดจนกว่าจะถึงเวลาปัจจุบัน",117:"คิวฟาร์มาล​​้าง",118:"ดำเนินการภายหลัง",119:"ทำลายภายหลัง",120:"ลิงก์ใหม่",121:"ประเภท",122:"เสริม",123:"การโจมตีปกติ",124:"โจมตี",125:"ความถี่",126:"แทนที่อุบัติเหตุ",127:"ประเภทของการโจมตี",128:"การโจมตี",129:"2 Attack",130:"3 โจมตี",131:"5 โจมตี",132:"10 โจมตี",133:"15 โจมตี",134:"20 โจมตี",135:"25 โจมตี",136:"30 โจมตี",137:"40 โจมตี",138:"50 โจมตี",139:"75 โจมตี",140:"100 โจมตี ",141:"วิลเลจ",142:"เวลา",143:"กองทัพ",144:"นักพนัน",145:"ต้นไม้",146:"ดิน",147:"เหล็ก",148:"ข้าว",149:"ผู้ส่ง",150:"รับ",151:"ข้อมูล",152:"ระยะเวลา",153:"ส่งไป",154:"ไม่",155:"ประเภทสั่งซื้อ",156:"ก่อสร้าง",157:"ระดับ",158:"ประชาชน",159:"ระยะเวลาของเหตุการณ์จับเวลา",160:"ระยะเวลาของสแกนเนอร์",161:"รวมทั้งหมด",162:"สั่งกองทัพถ้ามีการสร้าง",163:"อาคารเกี่ยวกับสิ่งที่ขาดหาย Resources",164:"อาคารทั้งหมดในลำดับความสำคัญ",165:"รัศมีฟาร์มา",166:"จะไปวินาที X",167:"ผันของทหาร",400:"โรงเลื่อยจักร",401:"Pit Clay",402:"แร่เหล็ก",403:"ฟาร์ม",404:"โรงเลื่อยจักร",405:"อิฐ",406:"Iron Works",407:"โรงแป้ง",408:"เบเกอรี่",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"เกราะฟอร์จ",413:"Arena",414:"อาคารหลัก",415:"จุดรวมพล",416:"ตลาด",417:"สถานทูต",418:"ค่ายทหาร",419:"Stable",420:"การประชุมเชิงปฏิบัติการ",421:"สถาบัน",422:"ความลับ",423:"ศาลา",424:"Residence",425:"เดอะพาเลซ",426:"ธนารักษ์",427:"หอการค้า",428:"ค่าย Great",429:"มีเสถียรภาพ Great",430:"กำแพงเมือง",431:"Earth Wall",432:"รั้ว",433:"ช่างก่อหิน",434:"โรงเบียร์",435:"Trapper",436:"แทเวิร์น",437:"คลัง Great",438:"Barn บิ๊ก",439:"Wonder ของโลก",460:"สั่งทหาร",461:"การศึกษาของกองกำลังทหาร",462:"อาคาร",463:"Improvement",464:"การดำเนินการของวันหยุด",501:"ควบคุม",502:"ตัวเลือก",503:"ความช่วยเหลือ",504:"RAID",505:"เสริม",506:"การโจมตีปกติ",507:"โรม",508:"เยอรมัน",509:"Galla",600:"ข้อมูลบันทึกเรียบร้อยแล้ว",601:"งานที่ทำเจ้าของ",602:"ทุกโปรแกรมที่ตั้งค่า",603:"รัศมีใหม่ติดตั้ง",604:"การเชื่อมโยงใหม่",605:"เพิ่มเส้นทางใหม่",606:"ข้อผิดพลาด",607:"ข้อมูลที่เพิ่มให้กับคิว",608:"การศึกษาดังกล่าวมีอยู่แล้วในคิว",609:"อาคารนี้มีอยู่แล้วยืนอยู่ในสายสำหรับการรื้อถอน",610:"การพัฒนาและเพื่อให้มีระดับที่สูงที่สุด",611:"ในเซลล์ที่กำหนดจะสร้างสิ่งที่",612:"อาคารนี้จะอยู่ภายใต้การก่อสร้างอยู่ในหมู่บ้านนี้",613:"อาคารและดังนั้นจะมีระดับสูงสุด",614:"การสื่อสาร",615:"สร้างฟาร์มาทั้งหมด",616:"การทำลายคืออะไร",617:"ออโต้สแกนของหมู่บ้านทั้งหมด",618:"ทหารส่ง",619:"การทำลายของอาคาร",620:"การก่อสร้างอาคาร",621:"กำลังดำเนินการส่งผู้แทนจำหน่าย",622:"ระดับของอาคาร",623:"ลิงก์ภายนอก",624:"ลิ้งค์ด่วน",625:"รายการของความล้มเหลวโดยอัตโนมัติเข้าสู่ระบบ",626:"การพัฒนาปุ่ม",627:"หมู่บ้านนี้อยู่ในรายการยา",628:"ลบอย่างสมบูรณ์จากแผ่นฟาร์ม",629:"หมู่บ้านที่มีการระบุไว้ในรายชื่อยา",630:"สร้างหน้า jQBot T4",631:"ปิด jQBot T4",632:"การประยุกต์ใช้ตั้งค่าใหม่",633:"Stop เหตุการณ์จับเวลารัน",634:"Run เหตุการณ์จับเวลารัน",635:"ตัวแปรกำลังจีเอ็ม",636:"ลบตัวแปรจีเอ็ม",637:"ขั้นตอนคุกกี้ดูตามขั้นตอน",638:"การกำจัดของคุกกี้เลี้ยวตาม",639:"ดูตัวแปรโปรแกรม ",640:"มีปัญหากับการโหลด minimap ให้ปิดโปรแกรมที่ขัดแย้งกัน",641:"ค้นหา",642:"การตั้งค่าการค้นหา",643:"รัศมี",644:"การค้นหาเสร็จสมบูรณ์",645:"Oasis",646:"ประมูล",647:"หมู่บ้าน",648:"Run เดนเวอร์ 3",649:"พิกัด",650:"ปรับปรุง",651:"เพิ่มในหมู่บ้านฟาร์มของใบไม้",652:"หยุดการโจมตีกับการสูญเสียดังกล่าวข้างต้น",653:"บันทึกการเปลี่ยนแปลงแล้ว",654:"Login",655:"รหัสผ่าน",656:"การตั้งค่าการป้อนข้อมูลอัตโนมัติของความล้มเหลวของการเข้าสู่ระบบ",700:"[3] ทหารส่ง",701:"[3] + + กำลังดำเนินการส่งกองกำลังทหาร",702:"[6] ตัวแทนจำหน่ายส่ง",703:"[6] + + ตัวแทนจำหน่ายส่ง",704:"[1] สกัดจากกองทัพบก",705:"[1] + + ความท้าทายกองทัพ",706:"[4], รื้อถอนอาคาร",707:"[4] + รื้อถอนอาคาร",708:"[2] รวมของทั้งหมด",709:"[2] ทั้งหมด + จากทั้งหมด",710:"[5] รวมทั้งหมด (อาคาร)",711:"[5] รวม + ของทั้งหมด (อาคาร)",1001:"ทหารโรมัน",1002:"Praetorian",1003:"Imperian",1004:"เสือป่าม้า",1005:"กองทหารม้าของจักรพรรดิ",1006:"กองทหารม้าของซีซาร์",1007:"Taran",1008:"หนังสติ๊กไฟ",1009:"สมาชิกวุฒิสภา",1010:"Settler",1011:"HERO",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"ลูกเสือ",1016:"Paladin",1017:"กองทหารม้าเต็มตัว",1018:"ram ทุบตี",1019:"หนังสติ๊ก",1020:"หัวหน้า",1021:"Settler",1022:"HERO",1023:"พรรคการเมือง",1024:"ดาบ",1025:"เบิกทาง",1026:"Thunder Theutates",1027:"ไรเดอร์ Druid",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"ผู้นำ",1032:"Settler",1033:"HERO"};
var lang_ua={1:"Про програму",2:"Фарм лист",3:"Черга фарма",4:"Настройки програми",5:"Черга споруди військ",6:"Черга дослідження військ",7:"Черга будівництва нових будинків",8:"Черга удосконалень будівель",9:"Черга знесення будівель",10:"Загальна черга замовлень",11:"Черга удосконалень військ",12:"Відведення військ",13:"Записна книжка",14:"Корисні посилання",15:"Центр села",16:"Проведення свят",17:"Торгові маршрути",18:"Продаж та закупівля рессурсов",19:"Гра на аукціоні",20:"рессурсов всіх сіл",21:"Армії всіх сіл",22:"Пересування військ всіх сіл",23:"Лог",24:"Фарм лист",25:"Черга фарма",26:"Черга замовлення військ",27:"Черга дослідження військ",28:"Черга удосконалень військ",29:"Загальна черга замовлень",30:"Відведення військ",31:"Хвилі",32:"Села",33:"рессурсов всіх сіл",34:"Армії всіх сіл",35:"Пересування військ всіх сіл",36:"Черга будівництва нових будинків",37:"Черга удосконалень будівель",38:"Черга знесення будівель",39:"Аналіз",40:"Аналітика нападів альянсу",41:"Аналіз звітів",42:"Герой",43:"Автоматична відправка героя на квести",44:"Автоматична прокачування героя на оазисах",45:"Культура",46:"Автоматичне проведення свят",47:"Торгівля та рессурсов",48:"Автобалансування рессурсов з помощю героя",49:"Автобалансування рессурсов по селах з помощю торговців",50:"Торгові маршрути",51:"Закупівля та продаж рессурсов",52:"Аукціон",53:"Гра на аукціоні",54:"Покупка потрібних речей",55:"Карта",56:"Пошук 15 і 9",57:"Пошук слабких і беззахисних",58:"Карта торгових маршрутів",59:"Карта годівниць",60:"Карта альянсу",61:"Карта ворогів",62:"Розвиток",63:"Автоматичне розвиток",64:"Проходження квестів",65:"Автоматичне розвиток нових сіл",66:"Загальне",67:"Записна книжка",68:"Про програму",69:"Настройки програми",70:"Лог програми",71:"Корисні посилання",72:"Цент села",73:"Статистика",74:"Чисельність війська",75:"Рівень розвитку рессурсов",76:"Статистика онлайну",77:"Управління",78:"Графік онлайну",79:"Графік активності",80:"Настройки відправки смс",81:"Управління через ICQ",82:"Відправити інформацію на сервер координації альянсу",83:"Вхід на сервер координації альянсу",84:"Армія",85:"Скинути",86:"Очистити",87:"Зберегти",88:"ОК",89:"Зруйнувати пізніше",90:"Настройки програми:",91:"Мова:",92:"З усіх питань звертайтеся за:",93:"Найменування",94:"Виділяти при ціні нижче",95:"Закуповувати при ціні нижче",96:"* Закупівля не реалізована і швидше за все не буде:)",97:"Мазь",98:"Сувій",99:"Клітка",100:"Запустити jQBot T4",101:"бронювати пізніше",102:"Побудувати пізніше",103:"Дослідити пізніше",104:"Створити торговий маршрут",105:"Для створення маршруту необхідно",106:"ввести координати",107:"ОК",108:"Скасувати",109:"Назва",110:"Посилання",111:"Відкривати в поточній вкладці",112:"Відкривати в новій вкладці",113:"Зупинити",114:"Послати останні в списку",115:"+ поточна",116:"Скидання всіх атак до поточного часу",117:"Скидання черги фарма",118:"Провести пізніше",119:"Зруйнувати пізніше",120:"Нове посилання",121:"Тип",122:"Підкріплення",123:"Звичайне напад",124:"Набіг",125:"Періодичність",126:"Випадкове зсув",127:"Тип атаки",128:"1 атаку",129:"2 атаки",130:"3 атаки",131:"5 атак",132:"10 атак",133:"15 атак",134:"20 атак",135:"25 атак",136:"30 атак",137:"40 атак",138:"50 атак",139:"75 атак",140:"100 атак",141:"Село",142:"Час",143:"Військо",144:"Гравець",145:"Дерево",146:"Глина",147:"Залізо",148:"Зерно",149:"Відправник",150:"Одержувач",151:"рессурсов",152:"Період",153:"Відправка в",154:"Кількість",155:"Тип замовлення",156:"Споруда",157:"Рівень",158:"Народ",159:"Період таймера подій",160:"Період сканера",161:"Загальна черга",162:"Замовляти військо якщо йде будівництво",163:"Будувати то на що вистачає рессурсов",164:"Будувати все в порядку черговості",165:"Радіус фарма",166:"веде за X секунд",167:"Відведення військ",400:"Тартак",401:"Глиняний кар'єр",402:"Залізний рудник",403:"Ферма",404:"Лісопильний завод",405:"Цегельний завод",406:"Чавуноливарний завод",407:"Млин",408:"Пекарня",409:"Склад",410:"Комора",411:"Кузня зброї",412:"Кузня обладунків",413:"Арена",414:"Головне будівлю",415:"Пункт збору",416:"Ринок",417:"Посольство",418:"Казарма",419:"Конюшня",420:"Майстерня",421:"Академія",422:"Схованка",423:"Ратуша",424:"Резиденція",425:"Палац",426:"Скарбниця",427:"Торгова палата",428:"Велика казарма",429:"Велика стайня",430:"Міська стіна",431:"Земляний вал",432:"Огорожа",433:"Каменяр",434:"Пивоварня",435:"Капканник",436:"Таверна",437:"Великий склад",438:"Великий комору",439:"Чудо світу",460:"Замовлення військ",461:"Дослідження військ",462:"Споруда",463:"Удосконалення",464:"Проведення свят",501:"Управління",502:"Настройки",503:"Допомога",504:"Набіг",505:"Підкріплення",506:"Звичайне напад",507:"Римляни",508:"Німці",509:"Галли",600:"Дані успішно збережено",601:"Завдання виконане господар",602:"Всі параметри програми скинуті",603:"Встановлено новий радіус",604:"Додана нова посилання",605:"Додано новий маршрут",606:"Помилка",607:"Дані додані в чергу",608:"Таке дослідження вже є в черзі",609:"Ця будівля вже стоїть у черзі на знесення",610:"Удосконалення і так має максимальний рівень",611:"На цій клітці вже щось будується",612:"Таке будівля вже будується в цьому селі",613:"Будівля і так буде мати максимальний рівень",614:"Повідомлення",615:"Перегенерірована чергу фарма",616:"валити то нічого",617:"Автосканування всіх сіл",618:"Відправка війська",619:"Руйнування будівель",620:"Споруда будівель",621:"Відправка торговців",622:"Рівні будівель",623:"Зовнішні переходи",624:"Швидкі переходи",625:"Автоматичний ввід логіна при збої",626:"Кнопки розвитку",627:"Це село вже є в фарм аркуші",628:"Повністю видалити з фарм аркуша",629:"Село занесена в фарм лист",630:"Сторінка jQBot T4",631:"Закрити jQBot T4",632:"Скинути параметри програми",633:"Зупинити таймер виконання подій",634:"Запустити таймер виконання подій",635:"Перегляд змінні GM",636:"Видалити змінні GM",637:"Перегляд Cookie покрокових подій",638:"Видалення Cookie покрокових подій",639:"Подивитись змінні програми",640:"Проблеми із завантаженням міні-карти, відключіть конфліктуючі програми",641:"Пошук",642:"Параметри пошуку",643:"Радіус",644:"Пошук завершений",645:"Оазиси",646:"Аукціон",647:"Села",648:"Запустіть Denver 3",649:"Координати",650:"Обновити",651:"Додати село в фарм лист",652:"Зупиняти атаки при втратах вище",653:"Зміна збережено",654:"Логін",655:"Пароль",656:"Настройки автоматичного введення логіна при збої",700:"[3]-Відправка війська",701:"[3] + Відправка війська",702:"[6]-Відправка торговців",703:"[6] + Відправка торговців",704:"[1]-Відведення армії",705:"[1] + Відведення армії",706:"[4]-рушимо будівлі",707:"[4] + рушимо будівлі",708:"[2]-Загальна черга",709:"[2] + Загальна черга",710:"[5]-Загальна черга (будівлі)",711:"[5] + Загальна черга (будівлі)",1001:"Легіонер",1002:"Преторіанец",1003:"Імперіанець",1004:"Кінний розвідник",1005:"Кіннота імператора",1006:"Кіннота Цезаря",1007:"Таран",1008:"Вогняна катапульта",1009:"Сенатор",1010:"Поселенець",1011:"Герой",1012:"Дубинник",1013:"Списник",1014:"сокирщик",1015:"Скаут",1016:"Паладін",1017:"Тевтонський вершник",1018:"Стінобитне знаряддя",1019:"Катапульта",1020:"Вождь",1021:"Поселенець",1022:"Герой",1023:"Фаланга",1024:"Мечник",1025:"Слідопит",1026:"Тевтацький грім",1027:"Друид-вершник",1028:"Едуйська кіннота",1029:"Таран",1030:"Требушет",1031:"Ватажок",1032:"Поселенець",1033:"Герой"};
var lang_vn={1:"Giới thiệu",2:"Danh sách trang trại",3:"Các dòng dược",4:"Cài đặt ứng dụng",5:"Các hàng đợi đang xây dựng quân đội",6:"Các nghiên cứu quân đội xếp hàng ",7:"Dòng xây dựng tòa nhà mới",8:"Việc cải thiện dòng của các tòa nhà",9:"Việc phá dỡ hàng đợi",10:"Các tổng của tất cả các đơn đặt hàng",11:"Dòng cải tiến quân",12:"Xử lý quân đội",13:"The Notebook",14:"Liên kết hữu ích",15:"Các trung tâm làng",16:"Thực hiện những ngày nghỉ",17:"Tuyến đường thương mại",18:"Các NGUỒN mua bán",19:"Trò chơi được bán đấu giá",20:"tất cả các làng TÀI NGUYÊN",21:"Quân đội của tất cả các làng",22:"Biến động của quân đội của tất cả các làng",23:"Đăng nhập",24:"Danh sách trang trại",25:"Các dòng dược",26:"Các hàng đợi lệnh quân đội",27:"Nghiên cứu dòng quân ",28:"Dòng cải tiến quân",29:"Các tổng của tất cả các đơn đặt hàng",30:"Xử lý quân đội",31:"Sóng",32:"Làng",33:"tất cả các làng TÀI NGUYÊN",34:"Quân đội của tất cả các làng",35:"Biến động của quân đội của tất cả các làng",36:"Việc xây dựng đường dây của các tòa nhà mới",37:"Việc cải thiện dòng của các tòa nhà",38:"Việc phá dỡ hàng đợi",39:"Phân tích",40:"Phân tích các cuộc tấn công liên minh",41:"Báo cáo phân tích",42:"Anh hùng",43:"Tự động gửi một anh hùng trên quest",44:"tự động bơm máu của anh hùng trong các ốc đảo",45:"Văn hóa",46:"tự động tổ chức lễ kỷ niệm",47:"Thương mại và NGUỒN",48:"tự động cân bằng với sự giúp đỡ của TÀI NGUYÊN anh hùng",49:"tự động cân bằng TÀI NGUYÊN trong làng với sự giúp đỡ của các thương gia",50:"Tuyến đường thương mại",51:"Mua bán TÀI NGUYÊN",52:"đấu giá",53:"Trò chơi được bán đấu giá",54:"Mua những điều đúng",55:"Bản đồ",56:"Tìm được 15 và 9",57:"Tìm những yếu kém và khả năng tự vệ",58:"Bản đồ các tuyến đường thương mại",59:"Bản đồ chảo",60:"Bản đồ của liên minh",61:"Bản đồ của kẻ thù",62:"Phát triển",63:"Tự động phát triển",64:"nhiệm vụ",65:"Tự động phát triển làng mới",66:"General",67:"Máy tính xách tay",68:"Giới thiệu",69:"Cài đặt ứng dụng",70:"Đăng nhập ứng dụng",71:"Liên kết hữu ích",72:"Trung ương Village",73:"Thống kê",74:"Số lượng quân đội",75:"Mức độ phát triển TÀI NGUYÊN",76:"Thống kê trực tuyến",77:"Control",78:"Các lịch trình trực tuyến",79:"Lịch trình của hoạt động",80:"Thiết lập tin nhắn gửi",81:"Kiểm soát qua ICQ",82:"Gửi thông tin đến máy chủ điều phối liên minh",83:"Đăng nhập vào máy chủ điều phối liên minh",84:"Quân đội",85:"Thiết lập lại ",86:"Clear",87:"Lưu",88:"OK",89:"Phá hủy sau",90:"Cài đặt ứng dụng",91:"Ngôn ngữ",92:"Đối với bất kỳ câu hỏi nào, xin vui lòng",93:"Tên",94:"Chọn ở một mức giá thấp hơn",95:"Mua ở một mức giá thấp hơn",96:"Mua * không được thực hiện và sẽ có nhiều khả năng không:)",97:"Thuốc mỡ",98:"Di chuyển",99:"Cage",100:"Run jQBot T4",101:"Đặt hàng Sau đó",102:"Xây dựng sau",103:"Điều tra sau",104:"tuyến đường thương mại mới",105:"Để tạo một tuyến đường để",106:"đầu vào tọa độ",107:"OK",108:"Hủy bỏ",109:"Tên",110:"Liên kết",111:"Open trong tab hiện tại",112:"Open trong tab mới",113:"Stop",114:"Gửi người cuối cùng trong danh sách",115:"+ hiện tại",116:"Thiết lập lại tất cả các cuộc tấn công cho đến thời điểm hiện tại",117:"Clear Queue Pharma",118:"Thực ra sau đó",119:"Phá hủy sau",120:"New Liên kết",121:"Đánh",122:"Gia cố",123:"Các cuộc tấn công bình thường",124:"Cuộc đột kích",125:"Tần số",126:"Tình cờ dịch chuyển",127:"Các loại tấn công",128:"một cuộc tấn công",129:"2 tấn công",130:"3 cuộc tấn công",131:"5 cuộc tấn công",132:"10 cuộc tấn công",133:"15 cuộc tấn công",134:"20 cuộc tấn công",135:"25 cuộc tấn công",136:"30 cuộc tấn công",137:"40 cuộc tấn công",138:"50 cuộc tấn công",139:"75 cuộc tấn công",140:"100 tấn công",141:"The Village",142:"Thời gian",143:"Quân đội",144:"cờ bạc",145:"Cây",146:"Đất sét",147:"sắt",148:"hạt",149:"Tên người gửi",150:"Thu",151:"TÀI NGUYÊN",152:"Thời gian",153:"Send to",154:"số",155:"Lệnh gõ",156:"Xây dựng",157:"Cấp",158:"nhân dân",159:"Thời gian của các sự kiện hẹn giờ",160:"Thời gian của máy quét",161:"Tổng số tất cả",162:"Lệnh quân đội nếu có xây dựng một",163:"Xây dựng trên những gì là thiếu TÀI NGUYÊN",164:"Xây dựng tất cả theo thứ tự ưu tiên",165:"Bán kính Pharma",166:"lấy đi giây X",167:"Các dòng của quân đội",400:"Máy cưa",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Máy cưa",405:"lò gạch",406:"Iron Works",407:"Nhà máy bột mì",408:"Bánh",409:"Kho",410:"The Barn",411:"Thợ rèn",412:"Forge Armor ",413:"Arena",414:"Nhà chính",415:"Rally Point",416:"Thị trường",417:"Đại sứ quán",418:"Các trại lính",419:"ổn định",420:"Hội thảo",421:"Học viện",422:"Secret",423:"Town Hall",424:"cư trú",425:"Cung điện",426:"Kho bạc",427:"Phòng Thương mại",428:"Đại Barracks",429:"Đại ổn định",430:"Tường thành phố",431:"Trái đất Wall",432:"Hàng rào",433:"stonemason",434:"Các nhà máy bia",435:"Trapper",436:"Quán rượu",437:"Đại Kho",438:"Big Barn",439:"Wonder của thế giới",460:"Lệnh quân đội",461:"Một nghiên cứu của quân đội",462:"Xây dựng",463:"Cải tiến",464:"Việc thực hiện những ngày nghỉ",501:"Control",502:"Tùy chọn",503:"Trợ giúp",504:"The Raid",505:"Gia cố",506:"Các cuộc tấn công bình thường",507:"Người La Mã",508:"Người Đức",509:"Galla",600:"Dữ liệu lưu thành công",601:"Nhiệm vụ là làm chủ",602:"Tất cả các ứng dụng cài đặt thiết lập lại",603:"Cài đặt mới bán kính",604:"Một liên kết mới",605:"Thêm một tuyến đường mới",606:"Lỗi",607:"Các dữ liệu thêm vào hàng đợi",608:"Những nghiên cứu đã có trong hàng đợi",609:"Tòa nhà này đã được xếp hàng cho phá hủy",610:"Cải thiện và do đó có mức cao nhất",611:"Trong một tế bào được đưa ra là xây dựng cái gì đó",612:"Tòa nhà này đang được xây dựng ở làng này",613:"Việc xây dựng và như vậy sẽ có mức cao nhất",614:"Truyền thông",615:"tái tạo lại tất cả các dược",616:"Để tiêu diệt là không có gì",617:"Tự động quét tất cả các làng",618:"Gửi quân",619:"Việc tiêu hủy các tòa nhà",620:"Việc xây dựng các tòa nhà",621:"Gửi các đại lý",622:"Mức độ của các tòa nhà",623:"Liên kết ngoài",624:"Quick Links",625:"Tự động nhập cảnh của sự thất bại đăng nhập",626:"Buttons Phát triển",627:"ngôi làng này đã có trong danh sách dược phẩm",628:"Hủy bỏ hoàn toàn từ các tấm trang trại",629:"Ngôi làng được liệt kê trong danh sách dược phẩm",630:"Trang jQBot T4",631:"Đóng jQBot T4",632:"Thiết lập lại ứng dụng",633:"Stop các sự kiện hẹn giờ chạy",634:"Run sự kiện hẹn giờ chạy",635:"Xem các biến GM",636:"Hủy bỏ các GM biến",637:"Xem Cookie của từng bước",638:"Loại bỏ các Cookie của theo lượt",639:"Xem các biến ứng dụng",640:"Vấn đề với tải minimap, tắt chương trình xung đột",641:"Tìm kiếm",642:"Cài đặt Tìm kiếm",643:"Bán kính",644:"Tìm kiếm đầy đủ",645:"Oasis",646:"đấu giá",647:"Làng",648:"Run Denver 3",649:"Tọa độ",650:"Cập nhật",651:"Thêm vào trang trại của làng Lá",652:"Dừng lại các cuộc tấn công với những mất mát trên",653:"Thay đổi lưu",654:"Đăng nhập",655:"mật khẩu",656:"Thiết lập đầu vào của một sự thất bại tự động đăng nhập",700:"[3]-Gởi quân",701:"[3] + Việc gửi quân đội",702:"[6] gửi đại lý",703:"[6] + gửi các đại lý",704:"[1] Việc khai thác của quân đội",705:"[1] + Thách thức quân đội",706:"[4], phá hủy các tòa nhà",707:"[4] + phá hủy các tòa nhà",708:"[2] Tổng của tất cả các",709:"[2] + Tổng số của tất cả các",710:"[5] Tổng của tất cả (xây dựng)",711:"[5] + Tổng số của tất cả (xây dựng)",1001:"Legionnaire",1002:"thuộc về pháp quan",1003:"Imperian",1004:"Ngựa trinh sát",1005:"Các kỵ binh của hoàng đế",1006:"Các kỵ binh của Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Thượng nghị sĩ",1010:"định cư",1011:"Anh hùng",1012:"Lính Chùy",1013:"Spearman",1014:"Axefighter",1015:"Hướng đạo",1016:"Paladin",1017:"Teutonic kỵ binh",1018:"đập ram",1019:"Catapult",1020:"Chánh",1021:"định cư",1022:"Anh hùng",1023:"Phalanx",1024:"Võ Lâm Truyền Kỳ",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Lãnh đạo",1032:"định cư",1033:"Anh hùng"};