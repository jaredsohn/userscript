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
// @require			http://malsup.github.com/jquery.corner.js
// @require			http://sparqlpush.googlecode.com/svn-history/r2/trunk/client/jquery.timers-1.2.js
// @require                     http://happylucky.googlecode.com/svn-history/r19/trunk/common/script/jquery.cookie.js
// @require			http://jquery.bassistance.de/treeview/jquery.treeview.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/latest/external/jquery.bgiframe-2.1.2.js
// @require			http://jquery-ui-dialog-extra.googlecode.com/svn-history/r3/trunk/jquery.dialog.extra.js
// @require			https://raw.github.com/phstc/jquery-dateFormat/master/jquery.dateFormat-1.0.js
// @require			http://kadirtour.googlecode.com/svn-history/r208/NhibernateLibrary/Branch/KNA.Controls/Resources/jquery.format.1.04.js
// ==/UserScript==


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
var lang_ae={1:"???",2:"????? ???????",3:"???????? ?????",4:"??????? ???????",5:"?? ????? ???????? ???? ??????",6:"?? ?????? ??????? ????? ????????",7:"?? ?? ????? ??????? ???????",8:"?? ????????? ??? ?? ???????",9:"?? ?? ?????",10:"??????? ????? ??????",11:"?? ?? ????????? ??????",12:"?????? ?? ??????",13:"?? ????????? ???????",14:"??????",15:"?? ???? ??????",16:"????? ?????",17:"??? ???????",18:"??????? ??? ?????",19:"?? ?????? ?? ????",20:"???? ????? ???????",21:"??? ?? ???? ?????",22:"??? ?????? ?? ???? ?????",23:"???",24:"????? ???????",25:"?? ?? ???????",26:"?? ????? ???????? ???? ??????",27:"?? ?????? ??????? ????? ????????",28:"?? ?? ????????? ??????",29:"??????? ????? ??????",30:"?????? ?? ??????",31:"?????",32:"???",33:"???? ????? ???????",34:"??? ?? ???? ?????",35:"??? ?????? ?? ???? ?????",36:"?? ???? ?? ??????? ???????",37:"?? ????????? ??? ?? ???????",38:"?? ??? ????? ????????",39:"?????",40:"????? ??????? ?????",41:"????? ????????? ?? ???????",42:"?????",43:"???? ??????? ???? ??? ?????",44:"?????? ?? ????? ?? ???????",45:"???????",46:"?????? ?????????? ?????",47:"??????? ????????",48:"?????? ???????? ?? ????? ??????? ?? ?????? ?? ??????? ?????",49:"?????? ???????? ?? ????? ??????? ??? ??????? ?? ????? ??????? ??????",50:"??? ???????",51:"???? ???? ???????",52:"????",53:"?? ?????? ?? ????",54:"???? ??????? ???????",55:"???????",56:"?????? ??? 15 ? 9",57:"????? ?? ??????? ??????",58:"????? ??? ???????",59:"?? ????? ???????",60:"????? ???????",61:"????? ???????",62:"???????",63:"??????? ??????",64:"?????",65:"??????? ????????? ????? ?????",66:"???????",67:"????",68:"???",69:"??????? ???????",70:"??? ???????",71:"????? ?????",72:"??? ??????",73:"???????",74:"?? ??? ??????",75:"?? ????? ????? ???????",76:"?????????? ??? ????",77:"??????",78:"?? ?????? ?????? ??? ????????",79:"?? ?????? ?????? ?????",80:"????? ??????? ??????? ???????",81:"?????? ?? ???? ICQ",82:"????? ????????? ??? ???? ????? ???????",83:"????? ?????? ??? ???? ????? ???????",84:"?????",85:"?????",86:"????",87:"???",88:"?????",89:"????? ?? ??? ????",90:"??????? ???????",91:"?????",92:"?????? ??? ??? ????? ? ?? ????",93:"?????",94:"??? ???? ???",95:"?????? ???? ???",96:"?? ??? ????? * ?????????? ??? ??? ?????? :)",97:"????",98:"?????",99:"???",100:"????? jQBot T4",101:"??? ?? ??? ????",102:"???? ?????",103:"??????? ?? ??? ????",104:"?????? ??????? ??????",105:"?????? ?????? ???",106:"???? ????????",107:"?????",108:"?????",109:"?????",110:"??????",111:"??? ?? ????? ??????? ???????",112:"??? ?? ????? ????? ?????",113:"?????",114:"???? ?????? ?? ???????",115:"+ ???????",116:"????? ????? ???? ??????? ??? ????? ??????",117:"??? ????? ????",118:"?????? ?? ??? ????",119:"????? ?? ??? ????",120:"????? ?????",121:"???",122:"?????",123:"?????? ???????",124:"?? ??????",125:"??????",126:"?????? ??????",127:"?? ????? ?? ??????",128:"????",129:"2 ????",130:"3 ?????",131:"5 ?????",132:"????? 10",133:"15 ?????",134:"20 ?????",135:"25 ?????",136:"30 ?????",137:"40 ?????",138:"50 ?????",139:"75 ?????",140:"100 ??????",141:"??????",142:"????",143:"?? ?????",144:"???????",145:"????",146:"????",147:"???????",148:"????",149:"??????",150:"???????",151:"???????",152:"????",153:"???? ???",154:"??",155:"??? ??????",156:"??????",157:"???????",158:"?????",159:"?? ?????? ?? ??????? ??????",160:"?? ?????? ?? ??????? ???????",161:"?? ?????? ????",162:"??? ?????? ??? ??? ???? ????",163:"???? ??? ?? ?? ????? ???????",164:"???? ?? ?? ?? ????? ?????????",165:"????? ??????",166:"???? ???? X",167:"??? ??????",400:"???????",401:"???? ?????",402:"???? ??????",403:"???????",404:"???????",405:"???? ?????",406:"???? ??????",407:"????? ??????",408:"????",409:"??????",410:"???????",411:"??????",412:"???? ???",413:"?????",414:"?????? ???????",415:"???? ??????",416:"?????",417:"???????",418:"????",419:"??????",420:"???? ???",421:"??????????",422:"?????",423:"???? ???",424:"???????",425:"?????",426:"???????",427:"???? ???????",428:"???? ??????",429:"????? ??????",430:"????? ???????",431:"????? ??????",432:"??????",433:"???",434:"?????",435:"??????",436:"??????",437:"?? Google ??????",438:"?????? ??????",439:"????? ?? ??????",460:"??? ?? ??????",461:"????? ??????",462:"????",463:"?????",464:"????? ?????",501:"??????",502:"??????",503:"???????",504:"?? ??????",505:"?????",506:"?????? ???????",507:"?? ???????",508:"?? ???????",509:"????",600:"??? ???????? ?????",601:"??? ????? ???? ????",602:"?? ????? ????? ??????? ???????",603:"??? ????? ??????? ???????",604:"?????? ????",605:"????? ????? ?????",606:"???",607:"????? ???????? ??? ????? ????????",608:"??? ??????? ?? ?????? ?? ????? ????????",609:"??? ?????? ?? ?????? ??? ?? ?? ????",610:"????? ????? ????? ??? ???? ?????",611:"?? ???? ???? ?? ???? ??? ??",612:"??? ?????? ??? ??????? ?? ??? ??????",613:"?? ???? ????? ????? ??? ???? ?????",614:"???????",615:"?? ???? ?????",616:"?????? ?? ???",617:"????? ???????? ?? ??? ???? ?????",618:"????? ????",619:"?? ????? ???????",620:"?? ????? ???????",621:"????? ??????????",622:"??????? ???????",623:"????? ??????",624:"????? ?????",625:"?????? ???????? ?? ??? ????? ??????",626:"????? ???????",627:"??? ?????? ?????? ?? ????? ???????",628:"????? ????? ?? ???? ???????",629:"??? ??? ???? ?? ????? ???????",630:"???? jQBot T4",631:"????? jQBot T4",632:"??? ????? ?????",633:"????? ????? ??????? ??????",634:"????? ??????? ?????? ?????",635:"????????? ??????? ????? ??????",636:"????? ????????? ????? ??????",637:"??? ???? ?? ???? ????",638:"????? ????? ????? ??? ????",639:"??? ??????? ???????",640:"????? ?? ????? ????? ? ????? ???????? ?????????",641:"???",642:"??????? ?????",643:"??????",644:"??? ????",645:"????",646:"????",647:"???",648:"????? ???? 3",649:"????????",650:"?????",651:"????? ?? ???? ????? ???",652:"?????? ??????? ?? ????? ?????",653:"??? ?????????",654:"??????",655:"???? ????",656:"????? ??????? ???????? ????? ????? ??????",700:"[3] - ????? ????",701:"[3] + ????? ????",702:"[6] - ???? ?????",703:"[6] + ???? ?????",704:"[1] - ??????? ?????",705:"[1] + ???? ?????",706:"[4] - ???? ??????",707:"[4] + ??? ??????",708:"[2] - ????? ????",709:"[2] + ????? ????",710:"[5] - ??????? ????? ?(????)",711:"[5] + ????? ???? (????)",1001:"???? ???",1002:"???? ??????????",1003:"???? ?????",1004:"???? ????",1005:"???? ???????",1006:"????? ????",1007:"???",1008:"??????? ??????",1009:"????",1010:"??????",1011:"???",1012:"????? ??????",1013:"????? ????",1014:"????? ????",1015:"??????",1016:"????? ??????",1017:"????? ???????",1018:"????? ???????",1019:"???????",1020:"??????",1021:"??????",1022:"???",1023:"???????",1024:"?????",1025:"????????",1026:"??? ???????",1027:"????? ?????",1028:"????? ?????????",1029:"????? ??????? ???????",1030:"??????? ??????",1031:"????",1032:"??????",1033:"???"};
var lang_bg={1:"За",2:"Ферма List",3:"Линията аптека",4:"Прилагане на настройките",5:"Опашката е сграда войски",6:"Опашката войски проучване",7:"Линията на изграждане на нови сгради",8:"Линията подобрения на сгради",9:"Опашката разрушаване",10:"Общият брой на всички поръчки",11:"Линията подобрения войски",12:"Отстраняване на войски",13:"The Notebook",14:"Полезни връзки",15:"В центъра на селото",16:"Изпълнение на празниците",17:"Размени",18:"покупко-продажба РЕСУРСИ",19:"Играта на търг",20:"всички села РЕСУРСИ",21:"Армията на всички села",22:"Движенията на войските на всички села",23:"Вход",24:"Ферма List",25:"Линията аптека",26:"Опашката поръчка войски",27:"Опашката войски проучване",28:"Линията подобрения войски",29:"Общият брой на всички поръчки",30:"Отстраняване на войски",31:"вълни",32:"Села",33:"всички села РЕСУРСИ",34:"Армията на всички села",35:"Движенията на войските на всички села",36:"Линията строителство на нови сгради",37:"Линията подобрения на сгради",38:"Опашката разрушаване",39:"Анализ",40:"Анализ на атаките съюз",41:"Анализ доклад",42:"Hero",43:"Автоматично изпрати герой на търсенето",44:"Автоматично изпомпване на герой в оазиси",45:"Култура",46:"Автоматично провеждане празници",47:"Търговия и РЕСУРСИ",48:"авто-балансиране с помощта на героя РЕСУРСИ",49:"авто-балансиране РЕСУРСИ в селата с помощта на търговци",50:"Размени",51:"Купуването и продаването РЕСУРСИ",52:"търг",53:"Играта е на търг",54:"Купуването на правилните неща",55:"Карта",56:"Намирането на 15 и 9",57:"Намерете най-слабите и беззащитни",58:"Карта на търговските пътища",59:"Картата тигани",60:"Карта на алианса",61:"Карта на врагове",62:"Развитие",63:"Автоматично развитие",64:"търсения",65:"Автоматично създаване на нови селища",66:"Общи",67:"лаптоп",68:"За",69:"Прилагане на настройките",70:"Приложението Дневник",71:"Полезни връзки",72:"Централен село",73:"Статистика",74:"Броят на войски",75:"Нивото на ресурсите за развитие",76:"Статистика Онлайн",77:"Контрол",78:"Графикът онлайн",79:"Графикът на дейност",80:"Създаване на изпращане на SMS",81:"Контрол чрез ICQ",82:"Изпращане на информация към сървъра координиране на съюз",83:"Влезте в сървъра координиране на съюз",84:"армия",85:"Reset",86:"Изчисти",87:"Запазване",88:"OK",89:"Разрушете по-късно",90:"Прилагане на настройките",91:"Език",92:"За всякакви въпроси, моля",93:"Име",94:"Избор на цена, по-долу",95:"Закупуване на цена, по-долу",96:"* Закупуване не се прилага и ще най-вероятно не:)",97:"Маз",98:"преместване",99:"Клетка",100:"Run jQBot T4",101:"Ред-късно",102:"Изграждане на по-късно",103:"За да се изследва по-късно",104:"Нови търговски път",105:"За да създадете маршрут до",106:"въвеждане на координати",107:"OK",108:"Отказ",109:"Име",110:"връзка",111:"Отвори в текущия раздел",112:"Отваряне в нов раздел",113:"Стоп",114:"Изпращане на последния в списъка",115:"+ сегашната",116:"Възстановяване на всички атаки, докато текущото време",117:"Clear Queue Pharma",118:"Извършване по-късно",119:"Разрушете по-късно",120:"Нови връзки",121:"Тип",122:"Укрепване",123:"Обичайната Атака",124:"The Raid",125:"Frequency",126:"случайно разместване",127:"Видът на атака",128:"атака",129:"2 Атака",130:"3 атаки",131:"5 атаки",132:"10 атаки",133:"15 атаки",134:"20 атаки",135:"25 атаки",136:"30 атаки",137:"40 атаки",138:"50 атаки",139:"75 атаки",140:"100 Атака",141:"The Village",142:"Time",143:"Армията",144:"Комарджията",145:"The Tree",146:"Клей",147:"желязо",148:"зърно",149:"Подател",150:"приемник",151:"ресурси",152:"Период",153:"Изпрати",154:"Не",155:"Ред тип",156:"Строителство",157:"Level",158:"Хората",159:"Срокът на таймер събития",160:"Срокът на скенера",161:"Общият брой на всички",162:"Ред на армията, ако има една сграда",163:"Въз основа на това, което липсва РЕСУРСИ",164:"Изграждане на всички по ред на приоритет",165:"Радиус Pharma",166:"отнеме за секунди X",167:"отклоняването на войски",400:"Дъскорезница",401:"Клей Pit",402:"Iron Mine",403:"Фермата",404:"Дъскорезница",405:"лагера",406:"Iron Works",407:"мелница",408:"Производство на хлебни",409:"Склад",410:"The Barn",411:"Ковачница",412:"Forge Armor",413:"Арена",414:"Главна сграда",415:"Сборен пункт",416:"Пазар",417:"Посолството",418:"В казарма",419:"стабилна",420:"Работилница",421:"Академия",422:"Тайна",423:"Town Hall",424:"Residence",425:"Двореца",426:"съкровище",427:"Търговско",428:"Голяма казарма",429:"Велики стабилна",430:"градските стени",431:"Земята Wall",432:"Ограда",433:"каменоделец",434:"The пивоварна",435:"Трапер",436:"Механа",437:"Голямата галерия",438:"Big Barn",439:"Чудо на света",460:"Ред на войските",461:"Изследване на войски",462:"Билдинг",463:"Подобряване",464:"Изпълнение на празниците",501:"Контрол",502:"Options",503:"Помощ",504:"Акцията",505:"Укрепване",506:"Обичайната Атака",507:"Римляните",508:"Германците",509:"Гала",600:"данните, записани успешно",601:"Задачата е на собственика",602:"Всички настройките на приложението рестартиране",603:"Installed нови радиус",604:"Нова връзка",605:"Добавено е ново маршрут",606:"Грешка",607:"Данните добавят към опашката",608:"Такова изследване вече е в опашката",609:"Тази сграда е вече на опашката за разрушаване",610:"Подобряване и така е най-високо ниво",611:"в дадена клетка е изградена нещо",612:"Тази сграда е в процес на изграждане в това село",613:"Сградата и така ще имате най-високо ниво",614:"Комуникация",615:"пресъздава всички фарма",616:"За да унищожи нищо",617:"Auto-сканиране на всички села",618:"Изпратете войски",619:"Разрушаването на сгради",620:"Строителството на сгради",621:"Изпращане на търговци",622:"Нива на сгради",623:"Външни връзки",624:"Бързи връзки",625:"Автоматично влизане на вход провал",626:"Бутони развитие",627:"Това селище е вече във фармацевтичния списък",628:"Извадете напълно от фермата лист",629:"Селото е в списъка на фармацевтични списък",630:"Page jQBot T4",631:"Close jQBot T4",632:"Възстановяване на приложение",633:"Спиране на събития таймер Run",634:"Run събития таймер Run",635:"Преглед на променливи GM",636:"Премахване на променливите GM",637:"Виж Cookie е стъпка по стъпка",638:"Отстраняване на Cookie е походова",639:"Виж приложение променливи",640:"Проблеми с зареждането на миникартата, изключете противоречиви програма",641:"Търсене",642:"Настройки за търсене",643:"Радиус",644:"Търсенето приключи",645:"Оазис",646:"търг",647:"Села",648:"Run Денвър 3",649:"Координати",650:"Update",651:"Добави във фермата село Leaf",652:"Спрете атаки със загуби над",653:"Промени спасен",654:"Login",655:"парола",656:"Създаване на автоматичен вход на вход провал",700:"[3]-изпрати войски",701:"[3] + изпращането на войски",702:"[6] Изпращане на търговци",703:"[6] + Изпращане на търговци",704:"[1] извличане на армията",705:"[1] + Challenge армия",706:"[4], разрушаване на сграда",707:"[4] + разрушаване на сградата",708:"[2] Общият брой на всички",709:"[2] + Общо за всички",710:"[5] Общата стойност на всички (сграда)",711:"[5] + Общо за всички (сграда)",1001:"Легионерът",1002:"преторианска",1003:"Империан",1004:"Конна скаут",1005:"The кавалерия на императора",1006:"The конница на Цезар",1007:"Таран",1008:"Пожарна Катапулт",1009:"Сенатор",1010:"Settler",1011:"Hero",1012:"Боец с боздуган",1013:"Копиеносец",1014:"Axefighter",1015:"Скаут",1016:"Паладин",1017:"тевтонските кавалерия",1018:"таран",1019:"Катапулт",1020:"Главният",1021:"Settler",1022:"Hero",1023:"Фаланга",1024:"Мечоносец",1025:"Pathfinder",1026:"Theutates Thunder",1027:"друид конник",1028:"хедуан",1029:"Таран",1030:"Trebuchet",1031:"Лидер",1032:"Settler",1033:"Hero"};
var lang_cn={1:"??",2:"????",3:"???",4:"??????",5:"???????",6:"???????",7:"??????????",8:"?????????",9:"????",10:"??????",11:"?????????",12:"?????",13:"????",14:"????",15:"???",16:"?????",17:"????",18:"???????",19:"?????????",20:"???????",21:"???????",22:"?????????",23:"??",24:"????",25:"???",26:"???????",27:"???????",28:"?????????",29:"??????",30:"?????",31:"?",32:"???",33:"???????",34:"???????",35:"?????????",36:"??????????",37:"?????????",38:"????",39:"??",40:"??????",41:"??????",42:"??",43:"???????????",44:"??????????",45:"??",46:"????????",47:"?????",48:"????,???????",49:"??????????????",50:"????",51:"?????",52:"??",53:"?????????",54:"?????",55:"??",56:"?? 15?9",57:"???????",58:"???????",59:"???",60:"?????",61:"?????",62:"??",63:"????",64:"??",65:"????????",66:"???",67:"???",68:"??",69:"??????",70:"????",71:"????",72:"???",73:"??",74:"?????",75:"???????",76:"????",77:"??",78:"??????",79:"???????",80:"??????",81:"???? ICQ",82:"????????????",83:"??????????",84:"?",85:"??",86:"??",87:"??",88:"?",89:"???",90:"??????",91:"??",92:"??????,?",93:"?",94:"???????",95:"???????",96:"*?????,???????:)",97:"?",98:"??",99:"??",100:"?? jQBot T4",101:"????",102:"???",103:"?????",104:"??????",105:"???????",106:"????",107:"?",108:"??",109:"??",110:"??",111:"???????",112:"???????",113:"??",114:"???????",115:"+??",116:"???????,???????",117:"??????",118:"???",119:"???",120:"???",121:"??",122:"??",123:"????",124:"???",125:"??",126:"????",127:"?????",128:"??",129:"2??",130:"3??",131:"5???",132:"10??",133:"15??",134:"20??",135:"25??",136:"30??",137:"40??",138:"50??",139:"75??",140:"100??",141:"?",142:"??",143:"??",144:"??",145:"?",146:"?",147:"?",148:"?",149:"???",150:"???",151:"??",152:"??",153:"???",154:"???",155:"???",156:"??",157:"??",158:"??",159:"??????????",160:"????????",161:"????",162:"?????????",163:"????????",164:"????????",165:"????",166:"??X?",167:"?????",400:"??",401:"???",402:"??",403:"??",404:"??",405:"??",406:"???",407:"???",408:"??",409:"??",410:"???",411:"??",412:"????",413:"???",414:"??",415:"???",416:"??",417:"??",418:"???",419:"??",420:"????",421:"??",422:"??",423:"??",424:"??",425:"??",426:"???",427:"??",428:"???",429:"???",430:"??",431:"???",432:"??",433:"??",434:"???",435:"??",436:"???",437:"???",438:"???",439:"????",460:"????",461:"??????",462:"??",463:"??",464:"?????",501:"??",502:"??",503:"??",504:"???",505:"??",506:"????",507:"????",508:"???",509:"???",600:"??????",601:"?????????",602:"???????????",603:"???????",604:"??????",605:"???????????",606:"??",607:"?????????",608:"???????????",609:"???????????",610:"???????????",611:"????????,?????",612:"???????????",613:"???????????",614:"??",615:"???????",616:"?????",617:"?????????",618:"??",619:"??????",620:"?????",621:"?????",622:"?????",623:"????",624:"????",625:"?????????",626:"????",627:"???????????",628:"????????",629:"????????",630:"?jQBot T4",631:"?? jQBot T4",632:"????",633:"?????????",634:"?????????",635:"???? GM",636:"???? GM",637:"??Cookie?????",638:"??Cookie????",639:"????????",640:"????????,???????",641:"??",642:"????",643:"??",644:"????",645:"??",646:"??",647:"???",648:"????3",649:"??",650:"??",651:"???????",652:"?????????",653:"????",654:"??",655:"??",656:"??????????",700:"[3] -??",701:"[3] +??",702:"[6] -?????",703:"[6] +?????",704:"[1] -?????",705:"[1] +???",706:"[4] -????",707:"[4] +?????",708:"[2] -????",709:"[2] +????",710:"[5] -???(??)",711:"[5] +???(??)",1001:"?????",1002:"???",1003:"???",1004:"????",1005:"????",1006:"????",1007:"???",1008:"?????",1009:"???",1010:"???",1011:"??",1012:"???",1013:"??",1014:"???",1015:"???",1016:"???",1017:"?????",1018:"???",1019:"???",1020:"???",1021:"???",1022:"??",1023:"???",1024:"??",1025:"???",1026:"???",1027:"?????",1028:"?????",1029:"???",1030:"???",1031:"??",1032:"???",1033:"??"};
var lang_com={1:"About",2:"Farm List",3:"The line pharmacy",4:"Application Settings",5:"The queue is building troops",6:"The queue study troops",7:"The line of construction of new buildings",8:"The line improvements of buildings",9:"The queue demolition",10:"The total of all orders",11:"The line improvements troops",12:"Disposal of troops",13:"Notebook",14:"Useful Links",15:"The village center",16:"Implementation of the holidays",17:"Trade Routes",18:"The sale and purchase resources",19:"The game is on auction",20:"all the villages resources",21:"Army of all the villages",22:"Movements of troops of all the villages",23:"Log",24:"Farm List",25:"The line pharmacy",26:"The queue ordering troops",27:"The queue study troops",28:"The line improvements troops",29:"The total of all orders",30:"Disposal of troops",31:"Waves",32:"Villages",33:"all the villages resources",34:"Army of all the villages",35:"Movements of troops of all the villages",36:"The line construction of new buildings",37:"The line improvements of buildings",38:"The queue demolition",39:"Analysis",40:"Analysis of attacks alliance",41:"Analysis of the statistics of attacks",42:"Hero",43:"Automatically send a hero on the quest",44:"Automatic pumping of the hero in the oases",45:"Culture",46:"Automatic holding celebrations",47:"Trade and resources",48:"auto-balancing with the help of the hero resources",49:"auto-balancing resources in the villages with the help of merchants",50:"Trade Routes",51:"Buying and selling resources",52:"Auction",53:"The game is on auction",54:"Buying the right things",55:"Map",56:"Finding 15 and 9",57:"Find the weak and defenseless",58:"Map of trade routes",59:"The map pans",60:"Map of the alliance",61:"Map of enemies",62:"Development",63:"Automatic Development",64:"quests",65:"Automatic development of new villages",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Log Application",71:"Useful Links",72:"Central Village",73:"Statistics",74:"The number of troops",75:"The level of development resources",76:"Statistics Online",77:"Control",78:"The schedule online",79:"The schedule of activity",80:"Setting sending sms",81:"Control via ICQ",82:"Send the information to the server coordinating the alliance",83:"Log on to the server coordinating the alliance",84:"Army",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy later",90:"Application Settings",91:"Language",92:"For any questions, please",93:"Name",94:"Select at a price below",95:"Purchasing at a price below",96:"* Purchasing is not implemented and will most likely not:)",97:"Ointment",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Order Later",102:"Build later",103:"To investigate later",104:"New trade route",105:"To create a route to",106:"input coordinates",107:"OK",108:"Cancel",109:"Name",110:"Link",111:"Open in current tab",112:"Open in new tab",113:"Stop",114:"Send the last in the list",115:"+ current",116:"Reset all attacks until the current time",117:"Clear Queue Pharma",118:"Carry out later",119:"Destroy later",120:"New Links",121:"Type",122:"Reinforcement",123:"The usual attack",124:"The Raid",125:"Frequency",126:"Accidental displacement",127:"The type of attack",128:"an attack",129:"2 Attack",130:"3 attacks",131:"5 attacks",132:"10 attacks",133:"15 attacks",134:"20 attacks",135:"25 attacks",136:"30 attacks",137:"40 attacks",138:"50 attacks",139:"75 attacks",140:"100 attack",141:"The Village",142:"Time",143:"The army",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Sender",150:"Receiver",151:"resources",152:"Period",153:"Send to",154:"No",155:"Order type",156:"Construction",157:"Level",158:"People",159:"The period of timer events",160:"The period of the scanner",161:"The total of all",162:"Order the army if there is a building",163:"Building on what is missing resources",164:"Building all in order of priority",165:"Radius Pharma",166:"take away for X seconds",167:"The diversion of troops",400:"Sawmill",401:"Clay Pit",402:"Iron Mine",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"Embassy",418:"Barracks",419:"Stable",420:"Workshop",421:"Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Treasury",427:"Chamber of Commerce",428:"Great Barracks",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stonemason",434:"Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Order the troops",461:"A study of troops",462:"Building",463:"Improvement",464:"Implementation of the holidays",651:"Add in the farm village of Leaf",501:"Control",502:"Options",503:"Help",504:"Raid",505:"Reinforcement",506:"The usual attack",507:"Romans",508:"ermans",509:"Galla",600:"Data saved successfully",601:"The task is made the owner",602:"All the application settings reset",603:"Installed new radius",604:"A new link",605:"Added a new route",606:"Error",607:"The data added to the queue",608:"Such a study is already in the queue",609:"This building is already standing in line for demolition",610:"Improvement and so has the highest level",611:"In a given cell is build something",612:"This building is under construction in this village",613:"The building and so will have the highest level",614:"Communication",615:"recreated all pharma",616:"To destroy is nothing",617:"Auto-scanning of all the villages",618:"Send troops",619:"The destruction of buildings",620:"The construction of buildings",621:"Sending dealers",622:"Levels of buildings",623:"External links",624:"Quick Links",625:"Automatic entry of login failure",626:"Buttons Development",627:"This village is already in the pharmaceutical list",628:"Remove completely from the farm sheet ",629:"The village is listed in the pharmaceutical list",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stop the run timer events",634:"Run run timer events",635:"Viewing variables GM",636:"Remove the variables GM",637:"View Cookie's step by step",638:"Removal of Cookie's turn-based",639:"View application variables",640:"Problems with loading the minimap, turn off the conflicting program",641:"Search",642:"Search Settings",643:"Radius",644:"Search complete",645:"Oasis",646:"Auction",647:"Villages",648:"Run Denver 3",649:"Coordinates",650:"Update",651:"Add in the farm village of Leaf",652:"Stop attacks with losses above",653:"Changes saved",654:"Login",655:"password",656:"Options AutoInput login failure",700:"[3] - Send troops",701:"[3] + Sending troops",702:"[6] - Sending dealers",703:"[6] + Sending dealers",704:"[1] - The extraction of the army",705:"[1] + Challenge Army",706:"[4] - demolish the building",707:"[4] + demolish the building",708:"[2] - The total of all",709:"[2] + Total of all",710:"[5] - The total of all (building)",711:"[5] + Total of all (building)",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"Equites Legati",1005:"Equites Imperatoris",1006:"Equites Caesaris",1007:"Battering Ram",1008:"Fire Catapult",1009:"Senator",1010:"Settler",1011:"Hero",1012:"Clubswinger",1013:"Spearman",1014:"Axeman",1015:"Scout",1016:"Paladin",1017:"Teutonic Knight",1018:"Ram",1019:"Catapult",1020:"Chief",1021:"Settler",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druidrider",1028:"Haeduan",1029:"Ram",1030:"Trebuchet",1031:"Chieftain",1032:"Settler",1033:"Hero"};
var lang_cz={1:"O",2:"Farma List",3:"linka lekarna",4:"Nastaveni aplikace",5:"Fronta je stavebni jednotky",6:"vojaci fronty studie",7:"linie vystavby novych budov",8:"Rada vylepseni budov",9:"fronta demolice",10:"Soucet vsech zakazek",11:"linka vylepseni vojaku",12:"Likvidace vojaku",13:"Notebook",14:"Uzitecne odkazy",15:"centrum obce",16:"Implementace prazdnin",17:"obchodni cesty",18:"pri prodeji a nakupu zdroju",19:"Hra je v aukci",20:"Vsechny vesnice zdroju",21:"Armada vsech vesnic",22:"Pohyby vojsk ze vsech vesnic",23:"Log",24:"Farma List",25:"linka lekarna",26:"fronta objednani vojaky",27:"vojaci fronty studie",28:"linka vylepseni vojaku",29:"Soucet vsech zakazek",30:"Likvidace vojaku",31:"Vlny",32:"Vesnice",33:"Vsechny vesnice zdroju",34:"Armada vsech vesnic",35:"Pohyby vojsk ze vsech vesnic",36:"liniove stavby novych budov",37:"Rada vylepseni budov",38:"fronta demolice",39:"Analyza",40:"Analyza utoku Aliance",41:"zprava o vysledku rozboru",42:"Hero",43:"automaticky odeslat hrdiny na ceste",44:"Automaticke cerpani hrdiny v oazach",45:"Kultura",46:"Automaticke poradani oslav",47:"Obchod a zdroje",48:"auto-vyvazeni pomoci hrdiny zdroju",49:"auto-balancing ZDROJU v obcich s pomoci obchodniku",50:"obchodni cesty",51:"Nakup a prodej zdroju",52:"Aukce",53:"Hra je v aukci",54:"Nakup spravne veci",55:"Mapa",56:"Nalezeni 15 a 9",57:"Najdete slabe a bezbranne",58:"Mapa obchodnich cest",59:"map panve",60:"Mapa aliance",61:"Mapa nepratel",62:"Vyvoj",63:"Automaticke rozvoje",64:"questy",65:"Automaticke vytvareni novych vesnic",66:"General",67:"notebook",68:"O",69:"Nastaveni aplikace",70:"Log aplikace",71:"Uzitecne odkazy",72:"Central Village",73:"Statistika",74:"Pocet jednotek",75:"urovni rozvoje zdroju",76:"Statistics on-line",77:"Control",78:"Program online",79:"Program cinnosti",80:"Nastaveni odesilani SMS",81:"ovladani pres ICQ",82:"zaslat informace na server koordinacni Aliance",83:"Prihlaseni k serveru koordinacni Aliance",84:"armada",85:"Reset",86:"Clear",87:"Ulozit",88:"OK",89:"Znicte pozdeji",90:"Nastaveni aplikace",91:"Jazyk",92:"V pripade jakychkoli dotazu, prosim",93:"Jmeno",94:"Select za cenu nizsi nez",95:"Nakup za cenu nizsi nez",96:"* Nakup nebyl realizovan a bude s nejvetsi pravdepodobnosti nebude:)",97:"mast",98:"scroll",99:"klec",100:"Run jQBot T4",101:"objednavku pozdeji",102:"Build pozdeji",103:"zkoumat pozdeji",104:"Nove obchodni cesta",105:"Chcete-li vytvorit cestu k",106:"Vstup souradnic",107:"OK",108:"Zrusit",109:"Jmeno",110:"Link",111:"Otevrit v aktualni zalozce",112:"Otevrit v nove zalozce",113:"Stop",114:"odeslat posledni v seznamu",115:"+ aktualni",116:"Obnovit vsechny utoky az do aktualniho casu",117:"Clear fronty Pharma",118:"Provedte pozdeji",119:"Znicte pozdeji",120:"Nove stranky",121:"Typ",122:"posileni",123:"Obvykly utok",124:"Raid",125:"Frekvence",126:"nahodnemu posunu",127:"typ utoku",128:"utok",129:"2 Attack",130:"3 utoky",131:"5 utoky",132:"10 utoku",133:"15 utoku",134:"20 utoku",135:"25 utoku",136:"30 utoku",137:"40 utoku",138:"50 utoku",139:"75 utoku",140:"100 utok",141:"The Village",142:"Cas",143:"Armada",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"zrno",149:"Odesilatel",150:"Prijimac",151:"Zdroje",152:"Obdobi",153:"Odeslat",154:"Ne.",155:"typove",156:"Stavba",157:"Level",158:"People",159:"Doba casovace",160:"Doba skeneru",161:"soucet vsech",162:"Order armada Pokud je stavba",163:"V navaznosti na to, co chybi zdroje",164:"Stavebni vse v poradi",165:"Radius Pharma",166:"Vezmete pryc sekund X",167:"zneuzivani vojaku",400:"Pila",401:"Clay Pit",402:"Zelezny dul",403:"The Farm",404:"Pila",405:"Cihelna",406:"Iron Works",407:"mlyna",408:"Pekarna",409:"skladu",410:"Stodola",411:"kovar",412:"Forge Armor",413:"Arena",414:"Hlavni budova",415:"Rally Point",416:"Trh",417:"velvyslanectvi",418:"Kasarna",419:"Stable",420:"Workshop",421:"Akademie",422:"Tajne",423:"Radnice",424:"bydliste",425:"Palace",426:"statni pokladny",427:"Hospodarska komora",428:"Velke kasarny",429:"Velke staje",430:"hradby",431:"Zeme Wall",432:"plot",433:"Kamenik",434:"pivovaru",435:"lovce",436:"hospoda",437:"Velke skladiste",438:"velka stodola",439:"Div sveta",460:"Rad vojsk",461:"Studie vojaku",462:"Building",463:"zlepseni",464:"Implementace prazdnin",501:"Control",502:"Options",503:"Help",504:"Raid",505:"posileni",506:"Obvykly utok",507:"Rimane",508:"Nemci",509:"Galla",600:"Data byla uspesne ulozena",601:"Ukolem je vlastnikem",602:"Veskera nastaveni aplikace reset",603:"nainstalovali novy okruh",604:"Nove spojeni",605:"dodal novou cestu",606:"Chyba",607:"Data pridani do fronty",608:"Tato studie je jiz ve fronte",609:"Tato budova je jiz ve fronte k demolici",610:"zlepseni, a tak byla na nejvyssi urovni",611:"V dane bunce je vytvorit neco",612:"Tato budova je ve vystavbe v teto obci",613:"Budova, takze bude mit nejvyssi urovni",614:"Komunikace",615:"znovu vsechny Pharma",616:"znicit nic",617:"Auto-testovani vsech vesnic",618:"poslat vojaky",619:"Zniceni budov",620:"Vystavba budov",621:"Posilam prodejci",622:"urovnemi budov",623:"Externi odkazy",624:"Rychle odkazy",625:"Automaticka vstupu Prihlasit selhani",626:"Tlacitka pro rozvoj",627:"Tato vesnice je jiz ve farmaceutickem seznamu",628:"odstranit kompletne z farmy list",629:"Obec je uveden ve farmaceutickem seznamu",630:"Page jQBot T4",631:"Zavrit jQBot T4",632:"Reset aplikace",633:"Stop udalosti beh casovace",634:"Beh udalosti, timer run",635:"Informace o promenne GM",636:"Odstranit promenne GM",637:"Zobrazit Cookie je krok za krokem",638:"Odstraneni Cookie je otoceni-umisteny",639:"Zobrazit aplikacni promenne",640:"Problemy s nactenim minimape, vypnete problematicky program",641:"Hledat",642:"Search Settings",643:"Radius",644:"Hledat kompletni",645:"Oasis",646:"Aukce",647:"Vesnice",648:"Run Denver 3",649:"souradnice",650:"Update",651:"Pridat na statku vesnici Leaf",652:"Stop utokum se ztratami nahore",653:"Zmeny byly ulozeny",654:"Prihlasit se",655:"heslo",656:"Nastaveni automatickeho vstupu login selhani",700:"[3], poslat vojaky",701:"[3] + vyslani vojsk",702:"[6] Odesilani obchodniky",703:"[6] + Odeslani obchodniky",704:"[1] tezba armady",705:"[1] + Challenge armada",706:"[4], zbourat budovy",707:"[4] + demolici budovy",708:"[2] soucet vsech",709:"[2] + Celkovy pocet vsech",710:"[5] Celkem vsechny (budova)",711:"[5] + soucet vsech (budova)",1001:"Legionar",1002:"Praetorian",1003:"Imperian",1004:"Kun Scout",1005:"jizda cisare",1006:"kavalerie Caesar",1007:"Taran",1008:"Pozarni katapult",1009:"senator",1010:"osadnik",1011:"Hero",1012:"Palkar",1013:"Ostepar",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germanske kavalerie",1018:"beranidlo",1019:"Katapult",1020:"The Chief",1021:"osadnik",1022:"Hero",1023:"Phalanx",1024:"Sermir",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"osadnik",1033:"Hero"};
var lang_de={1:"About",2:"Farm List",3:"Die Online-Apotheke",4:"Application Settings",5:"Die Warteschlange baut Truppen",6:"Die Warteschlange Studie Truppen",7:"Die Linie der Bau von neuen Gebauden",8:"Die Linie Verbesserungen von Gebauden",9:"Die Warteschlange Abriss",10:"Die Summe aller Auftrage",11:"Die Linie Verbesserungen Truppen",12:"Die Entsorgung von Truppen",13:"The Notebook",14:"Nutzliche Links",15:"Der Ortskern",16:"Die Umsetzung der Urlaub",17:"Trade Routes",18:"Der Verkauf und Kauf RESOURCES",19:"Das Spiel ist in der Auktion",20:"alle Dorfer RESOURCES",21:"Army of all die Dorfer",22:"Truppenbewegungen aller Dorfer",23:"Log",24:"Farm List",25:"Die Online-Apotheke",26:"Die Warteschlange Bestellung Truppen",27:"Die Warteschlange Studie Truppen",28:"Die Linie Verbesserungen Truppen",29:"Die Summe aller Auftrage",30:"Die Entsorgung von Truppen",31:"Waves",32:"Villages",33:"alle Dorfer RESOURCES",34:"Army of all die Dorfer",35:"Truppenbewegungen aller Dorfer",36:"Die Linie Neubauten",37:"Die Linie Verbesserungen von Gebauden",38:"Die Warteschlange Abriss",39:"Analysis",40:"Analyse von Angriffen Allianz",41:"Analysis Report",42:"Hero",43:"Schicken Sie automatisch ein Held auf der Suche",44:"Automatische Pumpen des Helden in den Oasen",45:"Kultur",46:"Automatic halten Feiern",47:"Der Handel und Ressourcen",48:"auto-Balancing mit Hilfe des Helden RESOURCES",49:"auto-Balancing RESOURCES in den Dorfern mit Hilfe der Kaufleute",50:"Trade Routes",51:"Kauf und Verkauf von RESOURCES",52:"Auktion",53:"Das Spiel ist in der Auktion",54:"Der Kauf des richtigen Dinge tun",55:"Karte",56:"Finding 15 und 9",57:"Findet die Schwachen und Wehrlosen",58:"Karte der Handelswege",59:"Die Karte Pfannen",60:"Karte der Allianz",61:"Karte der Feinde",62:"Entwicklung",63:"Automatic Development",64:"Quests",65:"Automatic Entwicklung neuer Dorfer",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Log Application",71:"Nutzliche Links",72:"Central Village",73:"Statistik",74:"Die Zahl der Truppen",75:"Das Niveau der Ressourcen fur die Entwicklung",76:"Statistik Online",77:"Control",78:"Der Zeitplan online",79:"Der Zeitplan der Aktivitat",80:"Einstellung SMS-Versand",81:"Control via ICQ",82:"Senden Sie die Informationen an den Server Koordinierung der Allianz",83:"Melden Sie sich auf dem Server koordiniert die Allianz",84:"Army",85:"Reset",86:"Clear",87:"Speichern",88:"OK",89:"Spater Destroy",90:"Application Settings",91:"Sprache",92:"Fur Fragen, bitte",93:"Name",94:"Wahlen Sie zu einem Preis unter",95:"Der Einkauf zu einem Preis unter",96:"* Der Einkauf ist nicht implementiert und wird hochstwahrscheinlich nicht:)",97:"Salbe",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Spater Order",102:"spater Build",103:"Um spater zu untersuchen",104:"New Handelsroute",105:"Um eine Route zu erstellen",106:"die Koordinaten",107:"OK",108:"Cancel",109:"Name",110:"Link",111:"in der aktuellen Registerkarte offnen",112:"in neuem Tab offnen",113:"Stop",114:"Senden Sie die letzte in der Liste",115:"+ aktuelle",116:"Reset alle Angriffe bis die aktuelle Uhrzeit",117:"Clear Queue Pharma",118:"Carry out later",119:"Spater Destroy",120:"New Links",121:"Type",122:"Verstarkung",123:"Die ublichen attack",124:"The Raid",125:"Frequency",126:"Accidental Verschiebung",127:"Die Art des Angriffs",128:"Angriff",129:"2 Attack",130:"3 Angriffe",131:"5 Angriffe",132:"10 Angriffe",133:"15 Attacken",134:"20 Attacken",135:"25 Attacken",136:"30 Attacken",137:"40 Attacken",138:"50 Attacken",139:"75 Attacken",140:"100 attack",141:"The Village",142:"Time",143:"Die Armee",144:"Gambler",145:"Der Baum",146:"Clay",147:"Iron",148:"Grain",149:"Absender",150:"Receiver",151:"Ressourcen",152:"Period",153:"Senden an",154:"Nein!",155:"Order-Typ",156:"Bau",157:"Level",158:"The People",159:"Die Zeit der Timer-Ereignisse",160:"Die Zeit des Scanners",161:"Die Summe aller",162:"Auftrag der Armee, wenn es ein Gebaude",163:"Aufbauend auf was fehlt RESOURCES",164:"Building alle in der Reihenfolge ihrer Prioritat",165:"Radius Pharma",166:"take away fur X Sekunden",167:"Die Umleitung von Truppen",400:"Sagewerk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Sagewerk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"Die Botschaft",418:"Die Kaserne",419:"Stable",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"Der Palast",426:"Treasury",427:"The Chamber of Commerce",428:"Gro?e Kaserne",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Steinmetz",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Auftrag der Truppe",461:"Eine Studie der Truppen",462:"Building",463:"Improvement",464:"Die Umsetzung der Urlaub",501:"Control",502:"Options",503:"Help",504:"The Raid",505:"Verstarkung",506:"Die ublichen attack",507:"Die Romer",508:"Die Deutschen",509:"Galla",600:"Data erfolgreich gespeichert",601:"Die Aufgabe ist der Eigentumer gemacht",602:"All die Anwendung Einstellungen zurucksetzen",603:"Installed neue radius",604:"Ein neuer Link",605:"Es wurde eine neue Route",606:"Error",607:"Die Daten hinzugefugt, um die Warteschlange",608:"Eine solche Studie ist bereits in der Warteschlange",609:"Dieses Gebaude ist bereits in der Schlange fur den Abriss",610:"Verbesserung und so hat die hochste Stufe",611:"In einer bestimmten Zelle ist etwas aufbauen",612:"Dieses Gebaude ist im Bau in diesem Dorf",613:"Das Gebaude und so wird das hochste Niveau haben",614:"Kommunikation",615:"neu alle pharma",616:"Um zu zerstoren, ist nichts",617:"Auto-Scan aller Dorfer",618:"Send Truppen",619:"Die Zerstorung von Gebauden",620:"Der Bau von Gebauden",621:"Sending Handler",622:"Levels von Gebauden",623:"Externe Links",624:"Quick Links",625:"Automatische Eingabe von Login-failure",626:"Buttons Development",627:"Dieses Dorf ist bereits in der Pharma-Liste",628:"vollstandig aus dem Bauernhof sheet",629:"Das Dorf ist in der Pharma-Liste aufgefuhrt sind",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stoppt die Ausfuhrung Timer-Ereignisse",634:"Run Run Timer-Ereignisse",635:"Anzeigen Variablen GM",636:"Nehmen Sie die Variablen GM",637:"View Cookies ist Schritt fur Schritt",638:"Entfernen von Cookies ist turn-based",639:"View Anwendung Variablen",640:"Probleme mit dem Laden der Minikarte, schalten Sie das in Konflikt stehende Programm",641:"Suchen",642:"Search Settings",643:"Radius",644:"Search complete",645:"Oasis",646:"Auktion",647:"Villages",648:"Run Denver 3",649:"Koordinaten",650:"Update",651:"in der Farm Dorf Blatt hinzufugen",652:"Stop Angriffe mit Verlusten oben",653:"Anderungen gespeichert",654:"Login",655:"password",656:"Einstellen der automatischen Eingabe eines Login-failure",700:"[3]-Truppen schicken",701:"[3] + Entsendung von Truppen",702:"[6] Senden Handler",703:"[6] + Senden Handler",704:"[1] Die Extraktion der Armee",705:"[1] + Challenge Army",706:"[4] den Abriss der Gebaude",707:"[4] + Abriss des Gebaudes",708:"[2] Die Summe aller",709:"[2] + Summe aller",710:"[5] Die Summe aller (Gebaude)",711:"[5] + Summe aller (Gebaude)",1001:"Legionar",1002:"Praetorian",1003:"Imperian",1004:"Horse scout",1005:"Die Kavallerie des Kaisers",1006:"Die Kavallerie des Kaisers",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Siedler",1011:"Hero",1012:"Keulenschwinger",1013:"Spearman",1014:"Axtkampfer",1015:"Scout",1016:"Paladin",1017:"teutonischen Reiter",1018:"Rammbock",1019:"Catapult",1020:"The Chief",1021:"Siedler",1022:"Hero",1023:"Phalanx",1024:"Schwertkampfer",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduaner",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Siedler",1033:"Hero"};
var lang_dk={1:"Om",2:"Farm List",3:"Linjen apotek",4:"Application Settings",5:"Koen er ved at bygge tropper",6:"Koen undersogelsen tropper ",7:"Den linje med opforelse af nye bygninger",8:"Den linje forbedringer af bygninger",9:"Koen nedrivning",10:"Summen af ??alle ordrer",11:"Linjen forbedringer tropper",12:"Bortskaffelse af tropper",13:"The Notebook",14:"Nyttige links",15:"Den landsbyens centrum",16:"Gennemforelse af ferien",17:"Trade Routes",18:"Den kob og salg RESSOURCER",19:"Spillet er pa auktion",20:"alle de landsbyer RESSOURCER",21:"Army af alle landsbyer",22:"Flytning af tropper fra alle landsbyer",23:"Log",24:"Farm List",25:"Den linje apotek",26:"Koen bestilling tropper",27:"Den ko undersogelsen tropper ",28:"Linjen forbedringer tropper",29:"Summen af ??alle ordrer",30:"Bortskaffelse af tropper",31:"Waves",32:"Landsbyer",33:"alle de landsbyer RESSOURCER",34:"Army af alle landsbyer",35:"Flytning af tropper fra alle landsbyer",36:"Den linje opforelse af nye bygninger",37:"Den linje forbedringer af bygninger",38:"Koen nedrivning",39:"Analyse",40:"Analyse af angreb alliance",41:"Analyse Report",42:"Hero",43:"Send automatisk en helt pa str?ben",44:"Automatisk oppumpning af helten i oaserne",45:"Kultur",46:"Automatisk holde festlighederne",47:"Handel og ressourcer",48:"auto-balance ved hj?lp af helten RESSOURCER",49:"auto-balancering RESSOURCER i landsbyerne ved hj?lp af kobm?nd",50:"Trade Routes",51:"Kob og salg RESSOURCER",52:"auktion",53:"Spillet er pa auktion",54:"Kob de rigtige ting",55:"Kort",56:"Find 15 og 9",57:"Find de svage og forsvarslose",58:"Kort over handelsruter",59:"Kortet pander",60:"Kort af alliancen",61:"Kort over fjender",62:"Udvikling",63:"Automatisk udvikling",64:"quests",65:"Automatisk udvikling af nye landsbyer",66:"Generelt",67:"Notebook",68:"Om",69:"Ansogning Indstillinger",70:"Log ansogning",71:"Nyttige links",72:"Central Village",73:"Statistik",74:"Antallet af soldater",75:"Niveauet af udviklingsressourcer",76:"Statistik Online",77:"Control",78:"Den tidsplan online",79:"Den tidsplan for aktiviteten",80:"Indstilling sende sms",81:"Styring via ICQ",82:"Send oplysningerne til serveren koordinere alliance",83:"Log pa serveren koordinere alliance",84:"Army",85:"Reset",86:"Clear",87:"Gem",88:"OK",89:"Odel?g senere",90:"Ansogning Indstillinger",91:"Sprog",92:"For sporgsmal, er du",93:"Navn",94:"V?lg til en pris under",95:"Indkob til en pris under",96:"* Indkob er ikke implementeret, og vil hojst sandsynligt ikke:)",97:"Salve",98:"Scroll",99:"Cage",100:"Kor jQBot T4",101:"Bestil senere",102:"Byg senere",103:"At undersoge senere",104:"New handel ruten",105:"For at oprette en rute til",106:"input koordinater",107:"OK",108:"Cancel",109:"Navn",110:"Link",111:"Abn i nuv?rende faneblad",112:"Abn i nyt faneblad",113:"Stop",114:"Send den sidste i listen",115:"+ nuv?rende",116:"Nulstil alle angreb, indtil den aktuelle tid",117:"Clear Queue Pharma",118:"Der bor foretages senere",119:"Odel?g senere",120:"Nye links",121:"Type",122:"Styrkelse",123:"Den s?dvanlige angreb",124:"The Raid",125:"Frekvens",126:"rykke",127:"Den type angreb",128:"et angreb",129:"2 Attack",130:"3 angreb",131:"5 angreb",132:"10 angreb",133:"15 angreb",134:"20 angreb",135:"25 angreb",136:"30 angreb",137:"40 angreb",138:"50 angreb",139:"75 angreb",140:"100 angreb",141:"The Village",142:"Time",143:"H?ren",144:"Gambler",145:"The Tree",146:"Clay",147:"Jern",148:"Korn",149:"Sender",150:"Modtager",151:"ressourcer",152:"Periode",153:"Send til",154:"Nej.",155:"Bestil type",156:"Construction",157:"Level",158:"folket",159:"Den periode pa timeren begivenheder",160:"Den periode af scanneren",161:"Summen af ??alle",162:"Bestil en h?r, hvis der er en bygning",163:"Med udgangspunkt i, hvad der mangler RESSOURCER",164:"Building alle i prioriteret r?kkefolge",165:"Radius Pharma",166:"take away for X sekunder",167:"Den omdirigering af tropper",400:"Savv?rk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Savv?rk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakery",409:"Warehouse",410:"The Barn",411:"Smed",412:"Forge Armor ",413:"Arena",414:"Hovedbygning",415:"Rally Point",416:"Market",417:"Ambassaden",418:"Den Kaserne",419:"Stabil",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"The Chamber of Commerce",428:"Great Kaserne",429:"Stor Stald",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stenhugger",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great-lager",438:"Big Barn",439:"Wonder of the World",460:"Bestil tropper",461:"En undersogelse af tropper",462:"Bygning",463:"forbedring",464:"Gennemforelse af ferien",501:"Control",502:"Options",503:"Hj?lp",504:"The Raid",505:"Styrkelse",506:"Den s?dvanlige angreb",507:"Romerne",508:"Tyskerne",509:"Galla",600:"Data gemt",601:"Opgaven er lavet ejeren",602:"Alle programindstillinger reset",603:"Installed nye radius",604:"En ny link",605:"Tilfojet en ny rute",606:"Fejl",607:"De data, der er fojet til koen",608:"En sadan undersogelse er allerede i koen",609:"Denne bygning er allerede stod i ko for nedrivning",610:"Forbedring og sa har det hojeste niveau",611:"I en given celle er opbygget noget",612:"Denne bygning er under opforelse i denne landsby",613:"Bygningen, og sa vil have det hojeste niveau",614:"Kommunikation",615:"genskabt alle pharma",616:"At odel?gge er intet",617:"Auto-scanning af alle landsbyerne",618:"Send tropper",619:"Den odel?ggelse af bygninger",620:"Den opforelse af bygninger",621:"Sender forhandlere",622:"niveauer af bygninger",623:"Eksterne links",624:"Quick Links",625:"Automatisk indtastning af login fiasko",626:"Knapper udvikling",627:"Denne landsby er allerede i den farmaceutiske liste",628:"Fjern fuldst?ndigt fra garden ark ",629:"Byen er opfort i den farmaceutiske liste",630:"Side jQBot T4",631:"Luk jQBot T4",632:"Reset ansogning",633:"Stop kore timeren begivenheder",634:"Kor kore timer-begivenheder",635:"Visning af variabler GM",636:"Fjern variablerne GM",637:"Vis Cookie er trin for trin",638:"Fjernelse af Cookie tur-baserede",639:"Vis anvendelse variabler",640:"Problemer med indl?sning af minimap, slukke for modstridende programmet",641:"Sog",642:"Sog Indstillinger",643:"Radius",644:"Sog komplet",645:"Oasis",646:"auktion",647:"Landsbyer",648:"Kor Denver 3",649:"Koordinater",650:"Opdater",651:"Tilfoj i garden landsbyen Leaf",652:"Stop angreb med tab over",653:"?ndringer gemt",654:"Log ind",655:"password",656:"Indstilling af den automatiske indl?sning af et login fiasko",700:"[3]-sende tropper",701:"[3] + sende tropper",702:"[6] Sende forhandlere",703:"[6] + Sende forhandlere",704:"[1] Den udvinding af h?ren",705:"[1] + Challenge Army",706:"[4], rive bygningen ned",707:"[4] + rive bygningen ned",708:"[2] Summen af ??alle",709:"[2] + Total for alle",710:"[5] Summen af ??alle (bygning)",711:"[5] + Total for alle (bygning)",1001:"legion?r",1002:"pr?torianer",1003:"Imperianer",1004:"Horse Scout",1005:"Den kavaleri af kejseren",1006:"Den kavaleri af Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Bos?tter",1011:"Hero",1012:"Kollesvinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Germanske kavaleri",1018:"rambuk",1019:"Catapult",1020:"The Chief",1021:"Bos?tter",1022:"Hero",1023:"Falanks",1024:"Swordsman",1025:"Pathfinder",1026:"Theutaterlyn",1027:"Druid Rider",1028:"Haeduaner",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Bos?tter",1033:"Hero"};
var lang_ее={1:"About",2:"Farm nimekiri",3:"joon apteek",4:"Application Settings",5:"jarjekord on hoone vaed",6:"jarjekorda uuring vaed",7:"joon uute hoonete ehitamine",8:"rida parandusi hoonete",9:"jarjekorda lammutamine",10:"kokku koik tellimused",11:"rida parandusi vaed",12:"korvaldamine vaed",13:"The Notebook",14:"Kasulikud lingid",15:"kula keskus",16:"rakendamine puhade",17:"kaubateede",18:"ostu-muugi RESSURSID",19:"Mang on oksjon",20:"Koik kulad RESSURSID",21:"Army koik kulad",22:"Liikumised vagede koik kulad",23:"Logi",24:"Farm nimekiri",25:"joon apteek",26:"jarjekorda tellimine vaed",27:"jarjekorda uuring vaed",28:"rida parandusi vaed",29:"Kogu koik tellimused",30:"Havitamine vagede",31:"Waves",32:"Villages",33:"Koik kulad RESSURSID",34:"Army koik kulad",35:"Liikumised vagede koik kulad",36:"joon uute hoonete ehitamine",37:"rida parandusi hoonete",38:"jarjekorda lammutamine",39:"analuus",40:"analuus runnakuid liit",41:"Analysis Report",42:"Hero",43:"saatke automaatselt kangelane quest",44:"Automatic pumpamiseks kangelane oases",45:"Kultuur",46:"Automatic kellel pidu",47:"Kaubandus-ja ressursid",48:"auto-tasakaalustamine abiga kangelane RESSURSID",49:"auto-tasakaalustamine RESSURSID kulades abiga kaupmehed",50:"kaubateede",51:"ostmine ja muumine RESSURSID",52:"Oksjoni",53:"Mang on oksjon",54:"Buying oigeid asju",55:"Map",56:"Finding 15 ja 9",57:"Leia nork ja kaitsetu",58:"Map kaubateede",59:"map pannid",60:"Kaart liit",61:"Kaart vaenlased",62:"Areng",63:"Automatic Development",64:"kulalistele",65:"Automatic uute kuladele",66:"General",67:"Notebook",68:"About",69:"Application Settings",70:"Logi Application",71:"Kasulikud lingid",72:"Kesk-Village",73:"Statistika",74:"sodurite arv",75:"arengutaset RESSURSID",76:"Statistika Online",77:"Control",78:"ajakava online",79:"ajakava tegevus",80:"Setting saates SMS",81:"Control kaudu ICQ",82:"Saada teabe server koordineeriv liit",83:"Logi serverisse koordineeriv liit",84:"Army",85:"Lahtesta",86:"Tuhjenda",87:"Salvesta",88:"OK",89:"Destroy hiljem",90:"Application Settings",91:"Keel",92:"Sest kusimusi, palun",93:"Nimi",94:"Vali madalama hinnaga",95:"Ostud madalama hinnaga",96:"* ostmine ei ole rakendatud ja toenaoliselt ei:)",97:"Salv",98:"Leidke",99:"Cage",100:"Run jQBot T4",101:"Order hiljem",102:"Ehita hiljem",103:"Selleks, et uurida hiljem",104:"New kaubatee",105:"Et luua tee",106:"koordinaadid",107:"OK",108:"Cancel",109:"Nimi",110:"Link",111:"Open praegustes tab",112:"Ava uuel & vahelehel",113:"Stop",114:"Saada viimane list",115:"+ Praegune",116:"Reset koik runnakud kuni praeguse aja",117:"Clear Queue Pharma",118:"taidab hiljem",119:"Destroy hiljem",120:"Uued lingid",121:"Tuup",122:"tugevdamine",123:"Tavaline runnak",124:"Raid",125:"Frequency",126:"juhusliku nihkumise",127:"tuupi runnak",128:"runnak",129:"2 Attack",130:"3. runnakud",131:"5. runnakud",132:"10. runnakud",133:"15. runnakud",134:"20 runnakud",135:"25 runnakud",136:"30. runnakud",137:"40 runnakud",138:"50 runnakud",139:"75 runnakud",140:"100 runnak",141:"The Village",142:"Time",143:"armee",144:"Mangur",145:"The Tree",146:"Savi",147:"Iron",148:"grain",149:"Saatja",150:"Receiver",151:"Vahendite",152:"Periood",153:"Saada",154:"Ei",155:"Order type",156:"Ehitus",157:"Level",158:"Inimesed",159:"aja taimer uritused",160:"periood skanner",161:"The kokku koik",162:"Order armee, kui on olemas hoone",163:"Lahtudes mis on puudu RESSURSID",164:"Building koik tahtsuse jarjekorras",165:"Raadius Pharma",166:"Vota ara X sekundit",167:"diversiooni vagede",400:"saeveski",401:"Clay Pit",402:"Iron Mine",403:"Farm",404:"saeveski",405:"Brickyard",406:"Iron Works",407:"jahuveskis",408:"Pagari",409:"Warehouse",410:"Barn",411:"Sepikoda",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Market",417:"saatkond",418:"Kasarmu",419:"Stabiilne",420:"Workshop",421:"Akadeemia",422:"Secret",423:"Town Hall",424:"elamine",425:"The Palace",426:"Riigikassa",427:"Kaubandus",428:"Great Kasarmud",429:"Great Stabiilne",430:"City Walls",431:"Maa Wall",432:"Fence",433:"kiviraidur",434:"olletehas",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Order vaed",461:"Uuringud vaed",462:"Building",463:"taiustamine",464:"rakendamine puhade",501:"Control",502:"Options",503:"Help",504:"Raid",505:"tugevdamine",506:"Tavaline runnak",507:"Roomlased",508:"sakslased",509:"Galla",600:"Data edukalt salvestatud",601:"Ulesanne on omanik",602:"Koik rakenduse seaded reset",603:"Paigaldatud uus raadius",604:"uus link",605:"Lisatud uus route",606:"Error",607:"Andmed lisatud jarjekorda",608:"Selline uuring on juba jarjekorras",609:"See hoone on juba seisab rida lammutamine",610:"Improvement ja nii on korgeim tase",611:"antud lahter on ehitada midagi",612:"See hoone on valmimisjargus selles kulas",613:"hoone ja nii on korgeim tase",614:"Communication",615:"taastati koik Pharma",616:"Selleks, et havitada midagi",617:"Auto-skaneerimise koik kulad",618:"Saada vaed",619:"havitamine ehitiste",620:"hoonete ehitamine",621:"Saatmine diilerid",622:"Levels of buildings",623:"Valislingid",624:"Quick Links",625:"Automatic kandmise login failure",626:"Buttons Development",627:"See kula on juba ravimite loetelu",628:"Eemaldada taielikult talust leht",629:"Kula on loetletud ravimite loetelu",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Stop joosta taimer uritused",634:"Run joosta taimer uritused",635:"Vaatab muutujad GM",636:"Eemalda muutujad GM",637:"Vaata Cookie on samm-sammult",638:"eemaldamine Cookie on omakorda pohinev",639:"Vaata taotluse muutujad",640:"Probleemid laadimise minimap, lulitage vastuolus programm",641:"Otsi",642:"Otsi Settings",643:"Raadius",644:"Otsi complete",645:"Oasis",646:"Oksjoni",647:"Villages",648:"Run Denver 3",649:"koordinaadid",650:"Update",651:"Lisada talu kulas Leaf",652:"Stop runnakute kahjum ule",653:"Muutused salvestatud",654:"Login",655:"password",656:"Setting automaatsed sisend login failure",700:"[3]-Saada sodurid",701:"[3] + Vagede",702:"[6] saatmine diilerid",703:"[6] + saatmine diilerid",704:"[1] kaevandamine armee",705:"[1] + Challenge armee",706:"[4], lammutada hoone",707:"[4] + lammutada hoone",708:"[2] kokku koik",709:"[2] + kokku koik",710:"[5] kokku koik (hoone)",711:"[5] + kokku koik (hoone)",1001:"leegionaribakter",1002:"Praetorian",1003:"Imperian",1004:"Horse skaut",1005:"ratsavagi ja keiser",1006:"ratsavagi ja Caesar",1007:"Taran",1008:"Fire Catapult",1009:"senaator",1010:"asuniku",1011:"Hero",1012:"Nuiamees",1013:"Odamees",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"teutooni ratsavagi",1018:"Muurinmurtaja",1019:"katapuldi",1020:"Chief",1021:"asuniku",1022:"Hero",1023:"Phalanx",1024:"Moogamees",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"asuniku",1033:"Hero"};
var lang_fi={1:"About",2:"Farm List",3:"rivi apteekki",4:"Application Settings",5:"jono on rakennus joukot",6:"jono tutkimus joukot",7:"rivi uudisrakentamiseen",8:"linja parannuksia rakennusten",9:"jonon purku",10:"kaikkiaan kaikki tilaukset",11:"linja parannuksia joukot",12:"havittaminen joukot",13:"Notebook",14:"Linkkeja",15:"kylan keskustaan",16:"toteuttaminen lomien",17:"Trade Routes",18:"myynti ja osto VARAT",19:"peli on huutokauppa",20:"kaikki kylat VARAT",21:"Army kaikkien kylien",22:"liikkeita joukkojen kaikkien kylien",23:"Log",24:"Farm List",25:"rivi apteekki",26:"jonossa tilaus joukot",27:"jono tutkimus joukot",28:"linja parannuksia joukot",29:"kaikkiaan kaikki tilaukset",30:"havittaminen joukot",31:"Waves",32:"Villages",33:"kaikki kylat VARAT",34:"Army kaikkien kylien",35:"liikkeita joukkojen kaikkien kylien",36:"rivi uudisrakentamiseen",37:"linja parannuksia rakennusten",38:"jonon purku",39:"Analysis",40:"Analyysi hyokkaykset Alliance",41:"Analysis Report",42:"Hero",43:"automaattisesti lahettaa Hero Quest",44:"Automaattinen pumppauksen sankari keitaita",45:"Kulttuuri",46:"Automaattinen pitamalla juhlia",47:"Kauppa ja VARAT",48:"Auto-tasapainotus avulla sankari VARAT",49:"Auto-tasapainotus VAROJEN kylissa avulla kauppiaat",50:"Trade Routes",51:"osto ja myynti VARAT",52:"Huutokauppa",53:"peli on huutokauppa",54:"Buying oikeita asioita",55:"Kartta",56:"Finding 15 ja 9",57:"Etsi heikkoja ja puolustuskyvyttomia",58:"Kartta kauppareitteja",59:"map pannuja",60:"Kartta Alliance",61:"Kartta vihollisia",62:"Development",63:"Automaattinen Development",64:"questit",65:"Automaattinen uusien kylien",66:"Yleista",67:"Notebook",68:"About",69:"Application Settings",70:"Loki-sovelluksessa",71:"Linkkeja",72:"Central Village",73:"Tilastot",74:"joukkojen",75:"taso kehittamisresurssien",76:"Statistics Online",77:"Control",78:"aikataulu verkossa",79:"aikataulu toiminta",80:"Setting lahettamalla tekstiviesti",81:"Control ICQ",82:"Laheta tiedot serveriin koordinoiva Alliance",83:"Kirjaudu palvelimelle koordinoiva Alliance",84:"Armeija",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy myohemmin",90:"Application Settings",91:"Language",92:"Jos sinulla on kysyttavaa, kiitos",93:"Nimi",94:"Valitse alemmalla hinnalla",95:"ostaminen alemmalla hinnalla",96:"* ostaminen ei ole toteutettu ja todennakoisesti ei:)",97:"Voide",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Tilaa Myohemmin",102:"Build myohemmin",103:"Tutkia myohemmin",104:"Uusi kauppa reitti",105:"Jos haluat luoda reitin",106:"input koordinaatit",107:"OK",108:"Peruuta",109:"Nimi",110:"Linkki",111:"Avaa nykyisella valilehdella",112:"Avaa uuteen valilehteen",113:"Stop",114:"Laheta viimeinen luettelosta",115:"+ nykyinen",116:"Nollaa kaikki hyokkaykset kunnes kellonaika",117:"Clear Queue Pharma",118:"hoitaa myohemmin",119:"Destroy myohemmin",120:"Uudet linkit",121:"Type",122:"vahvistaminen",123:"Tavallinen hyokkays",124:"Raid",125:"Frequency",126:"Vahingossa siirtyminen",127:"tyyppinen hyokkays",128:"hyokkays",129:"2 Attack",130:"3 hyokkayksia",131:"5 hyokkayksia",132:"10 hyokkayksia",133:"15 hyokkayksia",134:"20 hyokkayksia",135:"25 hyokkayksia",136:"30 hyokkayksia",137:"40 hyokkayksia",138:"50 hyokkayksia",139:"75 hyokkayksia",140:"100 hyokkays",141:"Village",142:"Aika",143:"armeija",144:"Gambler",145:"Tree",146:"Clay",147:"Iron",148:"Grain",149:"Lahettaja",150:"Receiver",151:"Resurssit",152:"ajanjakso",153:"Laheta",154:"Ei.",155:"Tilaa tyyppi",156:"Rakentaminen",157:"Taso",158:"Ihmiset",159:"aika ajastettuja",160:"ajan Scanner",161:"kokonaissumma",162:"Tilaa armeija jos on rakennus",163:"Pohjalta mita puuttuu VARAT",164:"Building kaikki tarkeysjarjestyksessa",165:"Radius Pharma",166:"take away X sekuntia",167:"ohjautumista joukot",400:"saha",401:"Clay Pit",402:"rautakaivos",403:"Farm",404:"saha",405:"Brickyard",406:"Iron Works",407:"mylly",408:"leipomo",409:"Varasto",410:"Barn",411:"Seppa",412:"Forge Armor",413:"Arena",414:"Paarakennus",415:"Rally Point",416:"Market",417:"suurlahetysto",418:"kasarmi",419:"Vakaa",420:"Workshop",421:"Akatemia",422:"Salaisuus",423:"Kaupungintalo",424:"Residence",425:"Palace",426:"kassaan",427:"kauppakamari",428:"Suuri kasarmi",429:"Great Stable",430:"City Walls",431:"Earth Wall",432:"Fence",433:"kivenhakkaaja",434:"Panimo",435:"Trapper",436:"Tavern",437:"Suuri varasto",438:"Big Barn",439:"Wonder of the World",460:"Tilaa joukot",461:"tutkimus joukkojen",462:"Building",463:"parantaminen",464:"toteuttaminen lomien",501:"Control",502:"Options",503:"Help",504:"Raid",505:"vahvistaminen",506:"Tavallinen hyokkays",507:"Roomalaiset",508:"saksalaiset",509:"Galla",600:"Data tallennettu",601:"Tehtavan omistaja",602:"Kaikki sovellusasetuksia reset",603:"Installed New Radius",604:"Uusi yhteys",605:"Lisattiin uusi reitti",606:"Error",607:"data lisataan jonoon",608:"Tallainen tutkimus on jo jonossa",609:"Tama rakennus on jo seisoo jonossa purku",610:"parantaminen ja niin on korkeimmalla tasolla",611:"Tietyssa solu rakentaa jotakin",612:"Tama rakennus on rakenteilla tassa kylassa",613:"rakennus ja niin tulee olemaan korkeimmalla tasolla",614:"Viestinta",615:"rekonstruoida kaikki Pharma",616:"tuhoaminen ei ole mitaan",617:"Auto-skannaus kaikkien kylien",618:"lahettaa joukkoja",619:"tuhoaminen rakennukset",620:"rakennusten rakentaminen",621:"Lahetetaan jalleenmyyjat",622:"tasojen rakentaminen",623:"Aiheesta muualla",624:"Pikalinkit",625:"Automaattinen tulon login vika",626:"Buttons Development",627:"Tama kyla on jo laake-list",628:"Poista kokonaan maatilan sheet",629:"Kyla on mainittu laake luettelo",630:"Page jQBot T4",631:"Sulje jQBot T4",632:"Reset Sovellus",633:"Lopeta ajaa ajastettuja",634:"Run Run Ajastintapahtuman",635:"Katsoo muuttujat GM",636:"Poista muuttujat GM",637:"Nayta Cookie n askel askeleelta",638:"poistaminen Cookie vuoro-pohjainen",639:"Nayta sovellus muuttujat",640:"Ongelmia lastaus minimap, sammuta ristiriitaisen ohjelman",641:"Etsi",642:"Search Settings",643:"Radius",644:"Haku valmis",645:"Oasis",646:"Huutokauppa",647:"Villages",648:"Run Denver 3",649:"Koordinaatit",650:"Update",651:"Lisaa tilalla kylassa Leaf",652:"Lopeta iskujen tappiot edella",653:"Muutokset tallennettu",654:"Kirjaudu",655:"salasana",656:"Setting automaattinen syotto login vika",700:"[3]-lahettaa joukkoja",701:"[3] + lahettavat jatkuvasti lisaa joukkoja",702:"[6] lahettaminen jalleenmyyjille",703:"[6] + lahettaminen jalleenmyyjille",704:"[1] louhinta armeijan",705:"[1] + Challenge-armeija",706:"[4], purkaa rakennus",707:"[4] + purkaa rakennuksen",708:"[2] yhteensa kaikkien",709:"[2] + Total kaikkien",710:"[5] kokonaissumma (rakennus)",711:"[5] + Total kaikki (rakennus)",1001:"Legioonalainen",1002:"Praetorian",1003:"Imperiaani",1004:"Horse Scout",1005:"ratsuvaki keisari",1006:"ratsuvaen keisarin",1007:"Taran",1008:"Tuli Catapult",1009:"Senaattori",1010:"Uudisasukas",1011:"Hero",1012:"Nuijamies",1013:"Keihasmies",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Saksalaisen ratsuvaki",1018:"muurinmurtajana",1019:"Catapult",1020:"Chief",1021:"Uudisasukas",1022:"Hero",1023:"Phalanx",1024:"Miekkasoturi",1025:"Pathfinder",1026:"Teutateksen salama",1027:"Druidi Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Uudisasukas",1033:"Hero"};
var lang_fr={1:"A propos",2:"Liste de ferme",3:"La pharmacie en ligne",4:"Application Settings",5:"La file d'attente est la construction des troupes",6:"Les troupes d'etude file d'attente",7:"La ligne de construction de nouveaux batiments",8:"Les ameliorations de batiments de ligne",9:"La demolition file d'attente",10:"Le total de tous ordres",11:"Les ameliorations ligne de troupes",12:"L'elimination des troupes",13:"The Notebook",14:"Liens utiles",15:"Le centre du village",16:"Mise en oeuvre des vacances",17:"Routes commerciales",18:"Les ressources de vente et d'achat",19:"Le jeu est aux encheres",20:"tous les villages RESSOURCES",21:"l'armee de tous les villages",22:"Les mouvements de troupes de tous les villages",23:"Connexion",24:"Liste de ferme",25:"La pharmacie en ligne",26:"La file d'attente de commande les troupes",27:"Les troupes d'etude file d'attente",28:"Les ameliorations ligne de troupes",29:"Le total de tous ordres",30:"L'elimination des troupes",31:"Vagues",32:"Villages",33:"tous les villages RESSOURCES",34:"l'armee de tous les villages",35:"Les mouvements de troupes de tous les villages",36:"La construction de nouveaux batiments de ligne",37:"Les ameliorations de batiments de ligne",38:"La demolition file d'attente",39:"Analyse",40:"Analyse de l'alliance des attaques",41:"Rapport d'analyse",42:"Hero",43:"Envoyer automatiquement un heros de la quete",44:"Automatique de pompage du heros dans les oasis",45:"Culture",46:"Automatique celebrations holding",47:"Le commerce et les ressources",48:"auto-equilibrage avec l'aide des ressources heros",49:"l'auto-equilibrage des ressources dans les villages avec l'aide des commercants",50:"Routes commerciales",51:"Achat et vente RESSOURCES",52:"enchere",53:"Le jeu est aux encheres",54:"L'achat les bonnes choses",55:"Carte",56:"Trouver 15 et 9",57:"Trouver les faibles et sans defense",58:"Carte des routes commerciales",59:"La carte des casseroles",60:"Plan de l'alliance",61:"Carte des ennemis",62:"Developpement",63:"Le developpement automatique",64:"quetes",65:"le developpement automatique des nouveaux villages",66:"General",67:"Notebook",68:"A propos",69:"Applications",70:"Application Log",71:"Liens utiles",72:"Central Village",73:"Statistiques",74:"Le nombre des troupes",75:"Le niveau des ressources de developpement",76:"Statistiques en ligne",77:"Control",78:"Le planning en ligne",79:"Le calendrier de l'activite",80:"Reglage envoi de SMS",81:"Controle via ICQ",82:"Envoyer les informations vers le serveur de coordination de l'alliance",83:"Se connecter au serveur de coordination de l'alliance",84:"Armee",85:"Reset",86:"Effacer",87:"Enregistrer",88:"OK",89:"Detruisez plus tard",90:"Applications",91:"Langue",92:"Pour toutes questions, s'il vous plait",93:"Nom",94:"Selectionner a un prix inferieur",95:"L'achat a un prix inferieur",96:"L'achat * n'est pas mis en ?uvre et ne sera probablement pas:)",97:"pommade",98:"Scroll",99:"Cage",100:"Executer jQBot T4",101:"Ordre tard",102:"Construire plus tard",103:"Afin d'etudier plus tard",104:"nouvelle route commerciale",105:"Pour creer un itineraire de",106:"coordonnees d'entree",107:"OK",108:"Annuler",109:"Nom",110:"Lien",111:"Ouvrir dans un onglet en cours",112:"Ouvrir dans un nouvel onglet",113:"Stop",114:"Envoyez le dernier de la liste",115:"+ courant",116:"Reinitialiser toutes les attaques jusqu'au moment actuel",117:"Queue Effacer Pharma",118:"Realiser tard",119:"Detruisez plus tard",120:"Nouveaux liens",121:"Type",122:"Renforcement",123:"L'attaque d'habitude",124:"Le Raid",125:"Frequence",126:"deplacement accidentel",127:"Le type d'attaque",128:"une attaque",129:"Attack 2",130:"3 attaques",131:"5 attaques",132:"10 attaques",133:"15 attaques",134:"20 attaques",135:"25 attaques",136:"30 attaques",137:"40 attaques",138:"50 attaques",139:"75 attaques",140:"100 attaque",141:"Le Village",142:"Time",143:"L'armee",144:"Gambler",145:"L'arbre",146:"Clay",147:"Iron",148:"Grain",149:"Expediteur",150:"recepteur",151:"RESSOURCES",152:"periode",153:"Envoyer vers",154:"Non",155:"Type d'ordre",156:"Construction",157:"Niveau",158:"Le Peuple",159:"La periode des evenements de minuterie",160:"La periode du scanner",161:"Le total de tous",162:"L'ordre de l'armee, si il ya un batiment",163:"En s'appuyant sur ce qui manque RESSOURCES",164:"Construire ensemble un ordre de priorite",165:"Rayon Pharma",166:"a emporter pour les X secondes",167:"Le detournement des troupes",400:"Scierie",401:"Clay Pit",402:"Mine de fer",403:"La Ferme",404:"Scierie",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Boulangerie",409:"Warehouse",410:"La Grange",411:"Forgeron",412:"Armure Forge ",413:"Arena",414:"batiment principal",415:"Rally Point",416:"Marche",417:"L'Ambassade",418:"La caserne",419:"Stable",420:"Atelier",421:"L'Academie",422:"Secret",423:"Town Hall",424:"Residence",425:"Le Palace",426:"Tresor",427:"La Chambre de Commerce",428:"Grande Caserne",429:"Grande ecurie",430:"City Walls",431:"Mur de terre",432:"cloture",433:"Tailleur de pierre",434:"La Brasserie",435:"Trapper",436:"Taverne",437:"Grand depot",438:"Big Barn",439:"Merveille du Monde",460:"L'ordre des troupes",461:"Une etude des troupes",462:"Batiment",463:"Amelioration",464:"Application des vacances",501:"Control",502:"Options",503:"Aide",504:"Le Raid",505:"Renforcement",506:"L'attaque d'habitude",507:"Les Romains",508:"Les Allemands",509:"Gallas",600:"Les donnees sauvegardees avec succes",601:"La tache est rendue au proprietaire",602:"Tous les parametres d'application reset",603:"rayon installe de nouvelles",604:"Un nouveau lien",605:"Ajout d'une nouvelle route",606:"Erreur",607:"Les donnees ajoutees a la file d'attente",608:"Une telle etude est deja dans la file d'attente",609:"Ce batiment est deja la queue pour demolition",610:"Amelioration et donc a le plus haut niveau",611:"Dans une cellule donnee est de construire quelque chose",612:"Ce batiment est en construction dans ce village",613:"Le batiment et aura ainsi le plus haut niveau",614:"Communication",615:"recree tous les pharma",616:"Pour detruire n'est rien",617:"Auto-analyse de tous les villages",618:"Envoyer des troupes",619:"La destruction des batiments",620:"La construction de batiments",621:"Envoi concessionnaires",622:"Niveaux des batiments",623:"liens externes",624:"Liens rapides",625:"l'entree automatique de l'echec de connexion",626:"Developpement Boutons",627:"Ce village est deja dans la liste pharmaceutiques",628:"Supprimer entierement de la feuille de ferme",629:"Le village est repertorie dans la liste pharmaceutiques",630:"Page jQBot T4",631:"Fermer jQBot T4",632:"Application Reset",633:"Arretez les evenements timer run",634:"Executer evenements timer run",635:"variables Regarde un GM",636:"Retirez le GM des variables",637:"Cookie Voir le etape par etape",638:"Retrait de Cookie tour par tour",639:"Afficher les variables d'application",640:"Problemes avec le chargement du mini-carte, eteignez le programme en conflit",641:"Recherche",642:"Parametres de recherche",643:"Rayon",644:"Recherche complete",645:"Oasis",646:"enchere",647:"Villages",648:"Executer Denver 3",649:"Coordonnees",650:"Update",651:"Ajouter dans le village de ferme de Leaf",652:"Arretez les attaques avec des pertes ci-dessus",653:"Changements sauve",654:"Login",655:"password",656:"Reglage de la saisie automatique d'un echec de connexion",700:"[3]-envoyer des troupes",701:"[3] + Envoi de troupes",702:"[6] Envoi concessionnaires",703:"[6] + concessionnaires Envoi",704:"[1] L'extraction de l'armee",705:"[1] + Defi Armee",706:"[4], de demolir le batiment",707:"[4] + demolir le batiment",708:"[2] Le total de tous",709:"[2] + Total de tous",710:"[5] Le total de tous (batiment)",711:"[5] Total de tous les + (batiment)",1001:"Legionnaire",1002:"pretorienne",1003:"Imperian",1004:"eclaireur Horse",1005:"La cavalerie de l'empereur",1006:"La cavalerie de Cesar",1007:"Taran",1008:"Catapult Fire",1009:"Le senateur",1010:"immigrant",1011:"Hero",1012:"Combattant au gourdin",1013:"lancier",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalerie teutonique",1018:"belier",1019:"Catapult",1020:"Le Chef",1021:"immigrant",1022:"Hero",1023:"Phalange",1024:"Swordsman",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Cavalier druide",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"immigrant",1033:"Hero"};
var lang_gr={1:"???????",2:"????? Farm",3:"?? ????????? ??????",4:"????????? ?????????",5:"? ???? ????? ?????? ???????????",6:"?? ??????????? ?????? ????",7:"? ?????? ??? ?????????? ???? ???????",8:"?? ?????????? ?????? ??? ???????",9:"? ?????????? ????",10:"?? ?????? ???? ??? ???????????",11:"?? ?????????? ?????? ???????????",12:"??????? ??? ????????????",13:"?? ????????",14:"???????? ?????????",15:"?? ?????? ??? ??????",16:"???????? ??? ????????",17:"????????? ?????????",18:"? ????? ?????? ??? ??? ?????",19:"?? ???????? ????? ?? ??????????",20:"??? ?? ????? ?????",21:"??????? ??? ??? ?? ?????",22:"?? ???????????? ???????????? ??? ??? ?? ?????",23:"???????",24:"????? Farm",25:"?? ????????? ??????",26:"? ???? ?????????? ???????????",27:"?? ??????????? ?????? ????",28:"?? ?????????? ?????? ???????????",29:"?? ?????? ???? ??? ???????????",30:"??????? ??? ????????????",31:"??????",32:"?????",33:"??? ?? ????? ?????",34:"??????? ??? ??? ?? ?????",35:"?? ???????????? ???????????? ??? ??? ?? ?????",36:"? ????????? ?????? ??? ???? ???????",37:"?? ?????????? ?????? ??? ???????",38:"? ?????????? ????",39:"???????",40:"??????? ??? ????????? ????????",41:"?????? ????????",42:"Hero",43:"??????? ???????? ??? ???? ???? ?????????",44:"???????? ??????? ??? ???? ???? ??????",45:"??????????",46:"???????? ?????????? ????????????",47:"??????? ??? ?????",48:"???????? ???????????? ?? ?? ??????? ??? ????? ????",49:"???????? ???????????? ????? ??? ????? ?? ?? ??????? ??? ???????",50:"????????? ?????????",51:"????? ??? ?????? ?????",52:"??????????",53:"?? ???????? ????? ?? ??????????",54:"??????????? ?? ????? ????????",55:"??????",56:"? ?????? 15 ??? 9",57:"?????? ???? ????????? ??? ???????????????",58:"?????? ??? ????????? ??????",59:"? ?????? ???????",60:"?????? ??? ?????????",61:"?????? ??? ??????",62:"????????",63:"???????? ????????",64:"???????????",65:"???????? ???????? ???? ??????",66:"??????",67:"Notebook",68:"???????",69:"????????? ?????????",70:"???????? Log",71:"???????? ?????????",72:"????? Central",73:"??????????",74:"? ??????? ??? ????????????",75:"?? ??????? ??? ????? ??? ??? ????????",76:"?????????? ???????? on-line",77:"???????",78:"?? online ?????????",79:"?? ????????? ??? ??????????????",80:"??????? ???????? sms",81:"??????? ???? ICQ",82:"??????? ??? ??????????? ??? ??????????, ???? ??????????? ??? ????????",83:"?????????? ?? ?? ?????????? ?????????? ??? ?????????",84:"???????",85:"?????????",86:"Clear",87:"??????????",88:"OK",89:"Destroy ????????",90:"????????? ?????????",91:"??????",92:"??? ??????????? ???????, ????????",93:"?????",94:"??????? ?? ???? ?????????? ???",95:"????? ?? ???? ?????????? ???",96:"* ?? ?????? ??? ?? ?????????? ??? ?? ???????????? ??? ????? ??????:)",97:"??????",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"?????????? ????????",102:"Build ????????",103:"??? ?? ??????????? ????????",104:"??? ???????? ????????",105:"??? ?? ????????????? ??? ?????? ??? ??",106:"????????????? ???????",107:"OK",108:"???????",109:"?????",110:"???????",111:"??????? ???? ???????? ???????",112:"??????? ?? ??? ???????",113:"Stop",114:"??????? ?? ????????? ??? ?????",115:"+ ?????",116:"????????? ???? ??? ????????? ????? ??? ???????? ??????? ??????",117:"Clear Queue Pharma",118:"???????? ????????",119:"Destroy ????????",120:"??? ?????????",121:"?????",122:"????????",123:"? ??????? ???????",124:"? ????????",125:"?????????",126:"? ?????? ??????????",127:"? ????? ??? ????????",128:"???????",129:"2 ???????",130:"3 ?????????",131:"5 ?????????",132:"10 ?????????",133:"15 ?????????",134:"20 ?????????",135:"25 ?????????",136:"30 ?????????",137:"40 ?????????",138:"50 ?????????",139:"75 ?????????",140:"100 ???????",141:"?? ?????",142:"Time",143:"? ???????",144:"Gambler",145:"?? ??????",146:"?????",147:"Iron",148:"Grain",149:"?????????",150:"??????",151:"?????",152:"????????",153:"????????",154:"???",155:"????? ??????????",156:"?????????",157:"Level",158:"?? ????????",159:"? ???????? ??? ?????????? ??????????",160:"? ???????? ??? ??????",161:"?? ?????? ???? ???",162:"?? ??????????? ?? ??????, ?? ??????? ??? ??????",163:"?? ???? ???? ??? ?????? ?????",164:"? ?????????? ??? ??? ?? ???? ????? ??????????????",165:"?????? Pharma",166:"????? ??? ? ????????????",167:"? ??????? ??? ????????????",400:"????????????",401:"?????",402:"??????? ???????",403:"? ?????",404:"????????????",405:"Brickyard",406:"Iron Works",407:"???????????",408:"???????",409:"???????",410:"? ????????",411:"????????????",412:"Armor Forge",413:"Arena",414:"???????? ??????",415:"?????? ????",416:"?????",417:"? ????????",418:"?? ??????????",419:"???????",420:"?????????",421:"? ????????",422:"???????",423:"?????????",424:"????????",425:"?? ??????",426:"??????",427:"?? ???????? ????????????",428:"?????? ??????????",429:"??????? ???????",430:"????? ??? ?????",431:"?? Wall",432:"Fence",433:"?????????",434:"? ?????????",435:"Trapper",436:"???????",437:"?????? ???????",438:"Big Barn",439:"????????? ?????",460:"?????? ?? ???????????",461:"?????? ??? ????????????",462:"? ?????????? ???",463:"????????",464:"? ???????? ??? ??? ??? ????????",501:"???????",502:"????????",503:"???????",504:"? ????????",505:"????????",506:"? ??????? ???????",507:"?? ???????",508:"?? ????????",509:"Galla",600:"?? ???????? ????????????? ?? ????????",601:"? ???????? ??????? ? ??????????",602:"???? ??? ?????? ?????????? ??? ?????????",603:"Installed ??? ??????",604:"??? ??? ?????",605:"?????????? ??? ??? ????????",606:"??????",607:"?? ???????? ??? ???????????? ???? ????",608:"??? ?????? ?????? ????? ??? ???? ????",609:"???? ?? ?????? ????? ??? ???????? ??? ?????? ??? ??????????",610:"???????? ??? ???? ???? ?? ????????? ???????",611:"?? ??? ???????? ???? ????? ???????? ????",612:"???? ?? ?????? ????? ??? ????????? ?? ???? ?? ?????",613:"?? ?????? ??? ???? ?? ????? ?? ????????? ???????",614:"???????????",615:"??????????????? ??? Pharma",616:"?? ??????????? ??? ????? ??????",617:"Auto-?????? ???? ??? ??????",618:"???????? ???????????",619:"? ?????????? ??? ???????",620:"? ????????? ??? ???????",621:"???????? ????????",622:"?? ??????? ??? ???????",623:"?????????? ?????????",624:"???????? ?????????",625:"???????? ?????????? ??? ???????? ????????",626:"???????? ???????",627:"?? ????? ???? ????????? ??? ??? ???????????? ?????",628:"?????????? ??????? ??? ?? ????? ?????????",629:"?? ????? ????? ????????? ??? ???????????? ?????",630:"? ?????? jQBot T4",631:"Close jQBot T4",632:"???????? Reset",633:"?????????? ?? ???????? ?????????? ??????",634:"Run ???????? ?????????? ??????",635:"?????? ?????????? GM",636:"?????? ??? ?????????? ??? GM",637:"???? ??????? Cookie ????? ???? ????",638:"??????????? ??? Cookie ????? turn-based",639:"??????? ?????????? ????????",640:"?????????? ?? ?? ??????? ??? minimap, ??????????????? ?? ??????? ?????????",641:"?????????",642:"????????? ??????????",643:"??????",644:"????????? ?? ??? ??",645:"Oasis",646:"??????????",647:"?????",648:"Run ??????? 3",649:"?????????????",650:"?????????",651:"???????? ??? ????? ????????? ??? Leaf",652:"?????????? ??? ????????? ?? ???????? ????",653:"?? ??????? ?????????????",654:"???????",655:"password",656:"??????? ????????? ??????? ???? ????????? ????????",700:"[3]-???????? ????????????",701:"[3] + ??? ???????? ????????????",702:"[6] ???????? ????????",703:"[6] + ???????? ????????",704:"[1] ? ??????? ??? ???????",705:"[1] + ???????? ???????",706:"[4], ?????????? ??? ???????",707:"[4] + ?????????? ??? ???????",708:"[2] ?? ?????? ???? ???",709:"[2] + ?????? ????",710:"[5] ?? ?????? ???? ??? (??????)",711:"[5] + ???????? ???? ??? (??????)",1001:"???????????",1002:"????????????",1003:"??????????",1004:"Scout Horse",1005:"?? ?????? ??? ???????????",1006:"?? ?????? ??? ???????",1007:"Taran",1008:"?????????? ??????",1009:"? ????????????",1010:"???????",1011:"Hero",1012:"??????? ?? ??????",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"???????? ??????",1018:"????????????? ?????",1019:"??????????",1020:"? ???????",1021:"???????",1022:"Hero",1023:"???????",1024:"?????????",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Rider Druid",1028:"Haeduan",1029:"Taran",1030:"??????????",1031:"Leader",1032:"???????",1033:"Hero"};
var lang_hr={1:"O",2:"Farma popis",3:"linija ljekarne",4:"Primjena Postavke",5:"red je izgradnja vojnika",6:"reda studije vojnika",7:"linija izgradnje novih objekata",8:"linija poboljsanja zgrada",9:"red rusenja",10:"ukupno svih naloga",11:"linija poboljsanja vojnika",12:"Zbrinjavanje vojnika",13:"Biljeznica",14:"Korisni linkovi",15:"selo centar",16:"Implementacija blagdana",17:"trgovacki putovi",18:"kupnje i prodaje resursa",19:"Igra je na drazbi",20:"sva sela resursa",21:"Vojske sva sela",22:"Kretanje trupa svih sela",23:"Prijava",24:"Farma popis",25:"linija ljekarne",26:"cekanja narudzbe vojnika",27:"reda studije vojnika",28:"linija poboljsanja vojnika",29:"ukupno svih naloga",30:"Zbrinjavanje vojnika",31:"Valovi",32:"sela",33:"sva sela resursa",34:"Vojske sva sela",35:"Kretanje trupa svih sela",36:"linija izgradnja nove zgrade",37:"linija poboljsanja zgrada",38:"red rusenja",39:"Analiza",40:"Analiza napada savez",41:"Analiza izvjesce",42:"Heroj",43:"Automatski poslati heroja u potrazi",44:"Automatsko transportiranje junak u oazama",45:"Kultura",46:"Automatsko odrzavanje svecanosti",47:"Trgovina i resursa",48:"Auto-balansiranje uz pomoc junaka resursa",49:"Auto-balansiranje resursima u selima uz pomoc trgovaca",50:"trgovacki putovi",51:"Kupnja i prodaja resursa",52:"Kraj",53:"Igra je na drazbi",54:"Kupnja prave stvari",55:"Karta",56:"Pronalazenje 15 i 9",57:"Pronadi slab i bespomocan",58:"Karta trgovackih puteva",59:"Karta tave",60:"Karta savez",61:"Karta neprijatelja",62:"Razvoj",63:"Automatski razvoj",64:"zadataka",65:"Automatsko razvoju novih naselja",66:"Opcenito",67:"Biljeznica",68:"O",69:"Primjena Postavke",70:"Prijava Prijava",71:"Korisni linkovi",72:"Sredisnje selo",73:"Statistika",74:"broj vojnika",75:"stupnju razvoja resursa",76:"Statistika Online",77:"Control",78:"raspored online",79:"raspored aktivnosti",80:"Postavljanje slanje SMS",81:"kontrola putem ICQ",82:"Posalji podatke na server koordinaciju savez",83:"Prijavite se na posluzitelju koordinaciju savez",84:"Vojska",85:"Reset",86:"Clear",87:"Spremi",88:"OK",89:"Unisti kasnije",90:"Primjena Postavke",91:"Jezik",92:"Za bilo kakva pitanja, molim",93:"Ime",94:"Odabir po cijeni ispod",95:"Nabava po cijeni ispod",96:"* Kupnja ne provodi i da ce najvjerojatnije nece:)",97:"mast",98:"Dodite",99:"kavez",100:"Run jQBot T4",101:"Red poslije",102:"Graditi kasnije",103:"Za istraziti kasnije",104:"Novi trgovacki put",105:"Za stvaranje rute s",106:"ulaz koordinate",107:"U redu",108:"Odustani",109:"Ime",110:"Link",111:"Otvori u trenutnu karticu",112:"Otvori u novoj kartici",113:"Stop",114:"Posalji zadnji na popisu",115:"+ struja",116:"Reset sve napade do trenutnog vremena",117:"Clear red Pharma",118:"Izvrsiti kasnije",119:"Unisti kasnije",120:"Novi Linkovi",121:"Vrsta",122:"Jacanje",123:"uobicajenih napada",124:"Raid",125:"Frequency",126:"slucajnog pomaka",127:"vrsta napada",128:"napad",129:"2 napada",130:"3 napada",131:"5 napada",132:"10 napada",133:"15 napada",134:"20 napada",135:"25 napada",136:"30 napada",137:"40 napada",138:"50 napada",139:"75 napada",140:"100 napada",141:"selo",142:"vrijeme",143:"vojska",144:"Gambler",145:"Stablo",146:"Clay",147:"Iron",148:"Zrno",149:"Sender",150:"Receiver",151:"Resursi",152:"Razdoblje",153:"Posalji",154:"Ne!",155:"Red tip",156:"Izgradnja",157:"Level",158:"Ljudi",159:"razdoblje od vremena dogadaja",160:"U razdoblju od skenera",161:"zbroj svih",162:"Red vojska ako se zgrada",163:"Nadovezujuci se na ono sto nedostaje resursa",164:"Izgradnja sve u red prioriteta",165:"Radijus Pharma",166:"oduzeti za X sekundi",167:"skretanja vojnika",400:"Pilana",401:"Clay Pit",402:"Rudnik zeljeza",403:"Farma",404:"Pilana",405:"Ciglana",406:"Iron Works",407:"mlin",408:"Pekara",409:"Warehouse",410:"Barn",411:"Kovacnica",412:"Forge oklop",413:"Arena",414:"Glavna zgrada",415:"Okupljaliste",416:"trzistu",417:"veleposlanstvo",418:"vojarni",419:"Stabilno",420:"Radionica",421:"akademija",422:"Tajna",423:"Gradska vijecnica",424:"Residence",425:"Palace",426:"riznice",427:"Chamber of Commerce",428:"Velika vojarni",429:"Velika Stabilan",430:"Gradske zidine",431:"Zemlja zid",432:"Ograda",433:"Klesar",434:"Pivovara",435:"Zamka",436:"Taverna",437:"Velika galerija",438:"Big kukuvija",439:"Svjetsko cudo",460:"Red trupe",461:"Studija o snagama",462:"Izgradnja",463:"popravljanja",464:"Implementacija blagdana",501:"Control",502:"Opcije",503:"Pomoc",504:"Raid",505:"Jacanje",506:"uobicajenih napada",507:"Rimljani",508:"Nijemci",509:"Galla",600:"Podaci uspjesno spremljen",601:"Zadatak je napravio vlasnika",602:"Svi reset postavki programa",603:"ugradeni novi radius",604:"novi link",605:"dodao je novi smjer",606:"Greska",607:"Podaci dodan red",608:"Takva studija je vec u redu",609:"Ova zgrada je vec stoje u redu za rusenje",610:"Unapredenje i tako je na najvisoj razini",611:"U odredenom stanica izgraditi nesto",612:"Ova zgrada je u izgradnji u ovom selu",613:"Zgrada i tako ce imati na najvisoj razini",614:"Komunikacija",615:"ponovno sve pharma",616:"Kako unistiti nista",617:"Auto-skeniranje svih sela",618:"Posalji postrojbe",619:"Unistavanje zgrada",620:"Izgradnja objekata",621:"Slanje dilera",622:"Razine zgrada",623:"Vanjske poveznice",624:"Brzi linkovi",625:"Automatsko ulazak prijava kvara",626:"Gumbi za razvoj",627:"Ovo selo je vec u farmaceutskoj popisu",628:"Ukloni potpuno iz farme list",629:"Selo je navedena u farmaceutskoj popisu",630:"Stranica jQBot T4",631:"Close jQBot T4",632:"Reset Aplikacija",633:"Stop timera dogadaja pokrenuti",634:"Start dogadaj trcanje vremena",635:"Pregled varijable GM",636:"Ukloni varijable GM",637:"Pogledaj Cookie je, korak po korak",638:"Uklanjanje Cookie je turn-based",639:"Prikaz primjene varijable",640:"Problemi s utovara mini, iskljucite sukobljenih programa",641:"Trazi",642:"Postavke pretrazivanja",643:"radius",644:"Trazi potpune",645:"Oaza",646:"Kraj",647:"sela",648:"Run Denver 3",649:"koordinata",650:"Update",651:"Dodaj u farmi selu Leaf",652:"Stop napada s gubitkom iznad",653:"Promjene su spremljene",654:"Prijava",655:"lozinka",656:"Postavljanje automatskog ulaz za prijavu neuspjeh",700:"[3]-salje vojnike",701:"[3] + Slanje vojnika",702:"[6] Vasa poruka dilera",703:"[6] + Slanje dilera",704:"[1] izvlacenje vojske",705:"[1] + Izazov vojske",706:"[4], rusenje zgrada",707:"[4] + rusenje zgrade",708:"[2] Ukupno sve",709:"[2] + Ukupno sve",710:"[5] Ukupno svih (zgrada)",711:"[5] + Ukupno svih (zgrada)",1001:"legionar",1002:"pretorijanac",1003:"Imperian",1004:"Horse izvidac",1005:"konjice cara",1006:"konjica Cezara",1007:"Taran",1008:"Fire Katapult",1009:"Senator",1010:"Naseljenik",1011:"Heroj",1012:"Gorstak",1013:"Kopljanik",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Teutonski konjica",1018:"ovan",1019:"Katapult",1020:"Glavni",1021:"Naseljenik",1022:"Heroj",1023:"falanga",1024:"Macevalac",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid jahac",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"voda",1032:"Naseljenik",1033:"Heroj"};
var lang_hu={1:"Nevjegy",2:"Farm List",3:"A vonal gyogyszertar",4:"Application Settings",5:"A sort epit csapatokat",6:"A queue tanulmany csapatok",7:"A vonal uj epuletek epitese",8:"A vonal fejlesztese epuletek",9:"A queue bontasi",10:"A teljes az osszes megbizas",11:"A vonal fejlesztesek csapatok",12:"artalmatlanitasa csapatok",13:"A notebook",14:"Hasznos linkek",15:"A falu kozpontjaban",16:"vegrehajtasa az unnepek",17:"kereskedelmi utvonalak",18:"Az adasveteli FORRASOK",19:"A jatek az aukcion",20:"a falu FORRASOK",21:"Army of a falvak",22:"mozgalmak a csapatok minden falu",23:"Naplo",24:"Farm List",25:"A vonal gyogyszertar",26:"A queue rendelesi csapatok",27:"A queue tanulmany csapatok",28:"A vonal fejlesztesek csapatok",29:"A teljes az osszes megbizas",30:"artalmatlanitasa csapatok",31:"Hullamok",32:"falvak",33:"a falu FORRASOK",34:"Army of a falvak",35:"mozgalmak a csapatok minden falu",36:"A vonal uj epuletek epitese",37:"A vonal fejlesztese epuletek",38:"A queue bontasi",39:"elemzes",40:"elemzese tamadasok szovetseget",41:"Analysis Report",42:"Hero",43:"automatikusan kuld egy hos, a kuldetes",44:"Automatikus pumpalo a hos a oazis",45:"Kultura",46:"Automatikus gazdasag unnepsegek",47:"Kereskedelmi es eroforrasok",48:"auto-egyensuly segitsegevel a hos FORRASOK",49:"auto-kiegyensulyozo FORRASOK a falvakban segitsegevel a kereskedok",50:"kereskedelmi utvonalak",51:"vasarlasa es eladasa FORRASOK",52:"aukcio",53:"A jatek az aukcion",54:"Vasarlas a helyes dolgokat",55:"Terkep",56:"keresese 15 es 9",57:"Talald meg a gyenge es vedtelen",58:"A terkep a kereskedelmi utvonalak",59:"A terkep edenyek",60:"A terkep a szovetseg",61:"Terkep ellensegek",62:"Fejlesztes",63:"Automatikus Development",64:"kuldetes",65:"Automatikus az uj falvak",66:"General",67:"Notebook",68:"Nevjegy",69:"Application Settings",70:"Naplo Alkalmazas",71:"Hasznos linkek",72:"Kozep-Village",73:"Statisztika",74:"A katonak szamanak",75:"A szint fejlesztesi forrasok",76:"Statistics Online",77:"Control",78:"Az utemterv online",79:"A utemezese tevekenyseg",80:"Beallitas SMS",81:"Vezerles ICQ",82:"Kuldes az informaciokat a szerver koordinalo szovetseg",83:"Jelentkezzen be, hogy a szerver koordinalo szovetseg",84:"Army",85:"Reset",86:"Clear",87:"Mentes",88:"OK",89:"Pusztitsd kesobb",90:"Application Settings",91:"Nyelv",92:"Barmilyen kerdese van, kerjuk",93:"Nev",94:"Select alacsonyabb aron",95:"beszerzesi aron az alabbi",96:"* Beszerzesi nem hajtjak vegre, es valoszinuleg nem:)",97:"kenocs",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Order Kesobb",102:"Build kesobb",103:"A vizsgalatot kesobb",104:"Uj kereskedelmi ut",105:"letrehozasa utvonalat",106:"input koordinatak",107:"OK",108:"Megse",109:"Nev",110:"Link",111:"Megnyitas az aktualis lapon",112:"Megnyitas uj fulon",113:"Stop",114:"Kuldes az utolso a listan",115:"+ az aktualis",116:"Mindent vissza tamadast, amig a pontos ido",117:"Tiszta sor Pharma",118:"Vegezze el kesobb",119:"Pusztitsd kesobb",120:"Uj linkek",121:"tipus",122:"megerositese",123:"A szokasos tamadas",124:"A Raid",125:"Frequency",126:"veletlen elmozdulas",127:"Az a fajta tamadas",128:"tamadas",129:"2 Attack",130:"3 tamadas",131:"5 tamadasok",132:"10 tamadasokat",133:"15 tamadasokat",134:"20 tamadasokat",135:"25 tamadasokat",136:"30 tamadasokat",137:"40 tamadasokat",138:"50 tamadasokat",139:"75 tamadasokat",140:"100 tamadas",141:"The Village",142:"Time",143:"A hadsereg",144:"Gambler",145:"A fa",146:"Clay",147:"Iron",148:"Grain",149:"Felado",150:"Vevo",151:"Eroforrasok",152:"Idoszak",153:"Kuldes",154:"Nem",155:"Order tipus",156:"Construction",157:"Level",158:"Az emberek",159:"Az az idoszak, idozito esemenyek",160:"Az az idoszak, a szkenner",161:"Az osszessege",162:"Rend a hadsereg, ha van egy epulet",163:"epitve mi hianyzik FORRASOK",164:"Building minden fontossagi sorrendben",165:"Radius Pharma",166:"elveszi az X masodperc",167:"A elteritese a csapatok",400:"Sawmill",401:"Agyagbanya",402:"Iron Mine",403:"A Farm",404:"Sawmill",405:"teglagyar",406:"Iron Works",407:"malom",408:"Pekseg",409:"Warehouse",410:"The Barn",411:"Kovacs",412:"Forge Armor",413:"Arena",414:"Foepulet",415:"Gyulekezoter",416:"Market",417:"A nagykovetseg",418:"A Kaszarnya",419:"Stabil",420:"Muhely",421:"Az Akademia",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"A Kereskedelmi Kamara",428:"Nagy kaszarnya",429:"Nagy istallo",430:"City Walls",431:"Fold Wall",432:"Kerites",433:"Kofarago",434:"A sorfozde",435:"Trapper",436:"Csarda",437:"Nagy raktar",438:"Big Barn",439:"Vilagcsoda",460:"az Elsofoku Birosag a csapatokat",461:"A tanulmany a csapatok",462:"Building",463:"fejlesztes",464:"vegrehajtasa az unnepek",501:"Control",502:"Options",503:"Help",504:"A Raid",505:"megerositese",506:"A szokasos tamadas",507:"A romaiak",508:"A nemetek",509:"Galla",600:"Az adatok sikeresen mentve",601:"A feladat legyen a tulajdonosa",602:"Minden alkalmazas beallitasainak visszaallitasa",603:"Installed uj sugar",604:"Uj kapcsolat",605:"Egy uj utat",606:"Error",607:"Az adatok felvetele a sorban",608:"Egy ilyen vizsgalat mar a sorban",609:"Ez az epulet mar allt sorban a bontasi",610:"javitasa es igy a legmagasabb szintu",611:"Egy adott cellaban epul valami",612:"Az epulet epites alatt all ebben a faluban",613:"Az epulet, es igy lesz a legmagasabb szinten",614:"Kommunikacio",615:"ujra minden pharma",616:"A tonkre semmi",617:"Auto-vizsgalat minden falu",618:"Kuldes csapatok",619:"A rombolas az epuletek",620:"Az epuletek epitese",621:"kuldo kereskedok",622:"szintek epuletek",623:"Kulso hivatkozasok",624:"Gyors linkek",625:"Automatikus belepes bejelentkezesi hiba",626:"gombok Development",627:"Ez a falu mar a gyogyszeripar lista",628:"Vegye ki teljesen a gazdasag lapot",629:"A falu szerepel a gyogyszeripari list",630:"Az oldal jQBot T4",631:"Close jQBot T4",632:"Reset Alkalmazas",633:"Ne fuss az idozito esemenyek",634:"Fuss fuss idozitett esemenyek",635:"megtekintese valtozok GM",636:"Vegye ki a valtozok GM",637:"View Cookie a lepesrol lepesre",638:"eltavolitasa Cookie a korokre osztott",639:"View alkalmazas valtozok",640:"Problemak betoltese minimap, kapcsolja ki az utkozo program",641:"Kereses",642:"Kereses beallitasai",643:"Radius",644:"Kereses a teljes",645:"Oasis",646:"aukcio",647:"falvak",648:"Run Denver 3",649:"Koordinatak",650:"Update",651:"Add a gazdasag falu Leaf",652:"Ne tamadasok vesztesegek folott",653:"Valtozasok mentese",654:"Belepes",655:"password",656:"beallitasa az automatikus bemeneti bejelentkezesi hiba",700:"[3]-csapatokat kuldeni",701:"[3] + kuldes csapatokat",702:"[6] kuldese kereskedok",703:"[6] + kuldese kereskedok",704:"[1] A kivonas a hadsereg",705:"[1] + Challenge Army",706:"[4], az epulet elbontasa",707:"[4] + az epulet elbontasa",708:"[2] A osszessege",709:"[2] + Total minden",710:"[5] A osszessege (epulet)",711:"[5] + osszessege (epulet)",1001:"Legios",1002:"pretorianusok",1003:"birodalmi",1004:"Lo scout",1005:"A lovassag a csaszar",1006:"A lovassag Caesar",1007:"Taran",1008:"Fire Katapult",1009:"Senator",1010:"telepes",1011:"Hero",1012:"Buzoganyos",1013:"Landzsas",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"teuton lovassag",1018:"faltoro kos",1019:"Katapult",1020:"A Chief",1021:"telepes",1022:"Hero",1023:"Phalanx",1024:"kardforgato",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"telepes",1033:"Hero"};
var lang_id={1:"Tentang",2:"Daftar Farm",3:"Apotek baris",4:"Aplikasi Pengaturan",5:"antrian ini sedang membangun pasukan",6:"Pasukan antrian Penelitian",7:"Garis konstruksi bangunan baru",8:"perbaikan Garis bangunan",9:"Penghancuran antrian",10:"Total dari semua perintah",11:"Perbaikan Jalur pasukan",12:"Pembuangan pasukan",13:"Notebook",14:"Links",15:"Pusat desa",16:"Pelaksanaan liburan",17:"Rute Perdagangan",18:"Para SUMBER penjualan dan pembelian",19:"Permainan ini pada lelang",20:"semua desa SUMBER DAYA",21:"Tentara semua desa",22:"Pergerakan pasukan dari semua desa",23:"Log",24:"Daftar Farm",25:"Apotek baris",26:"Antrian memerintahkan pasukan",27:"Pasukan antrian Penelitian",28:"Perbaikan Jalur pasukan",29:"Total dari semua perintah",30:"Pembuangan pasukan",31:"Gelombang",32:"Desa",33:"semua desa SUMBER DAYA",34:"Tentara semua desa",35:"Pergerakan pasukan dari semua desa",36:"Pembangunan gedung baru garis",37:"perbaikan Garis bangunan",38:"Penghancuran antrian",39:"Analisis",40:"Analisis aliansi serangan",41:"Analisis Laporan",42:"Pahlawan",43:"Secara otomatis mengirim pahlawan pada pencarian",44:"Otomatis pemompaan pahlawan di oasis",45:"Budaya",46:"perayaan memegang Otomatis",47:"Perdagangan dan SUMBER DAYA",48:"otomatis menyeimbangkan dengan bantuan SUMBER DAYA pahlawan",49:"auto-balancing SUMBER DAYA di desa-desa dengan bantuan pedagang",50:"Rute Perdagangan",51:"Membeli dan menjual SUMBER DAYA",52:"Lelang",53:"Permainan ini pada lelang",54:"Membeli hal yang benar",55:"Peta",56:"Menemukan 15 dan 9",57:"Cari yang lemah dan tak berdaya",58:"Peta rute perdagangan",59:"peta panci",60:"Peta aliansi",61:"Peta musuh",62:"Pembangunan",63:"Pembangunan Otomatis",64:"quests",65:"pengembangan otomatis desa-desa baru",66:"Umum",67:"Notebook",68:"Tentang",69:"Aplikasi Pengaturan",70:"Aplikasi Log",71:"Links",72:"Pusat Desa",73:"Statistik",74:"Jumlah tentara",75:"Tingkat perkembangan SUMBER DAYA",76:"Statistik Online",77:"Control",78:"Para secara online jadwal",79:"Jadwal kegiatan",80:"Menetapkan mengirim sms",81:"Kontrol lewat ICQ",82:"Kirim informasi ke server koordinasi aliansi",83:"Log on ke server koordinasi aliansi",84:"Angkatan Darat",85:"Reset",86:"Batal",87:"Simpan",88:"OK",89:"Hancurkan nanti",90:"Aplikasi Pengaturan",91:"Bahasa",92:"Untuk pertanyaan, silakan",93:"Nama",94:"Pilih dengan harga di bawah",95:"Pembelian pada harga di bawah",96:"* Pembelian ini tidak dilaksanakan dan kemungkinan besar akan tidak:)",97:"Salep",98:"Geser",99:"Cage",100:"Jalankan jQBot T4",101:"Orde Nanti",102:"Membangun nanti",103:"Untuk menyelidiki nanti",104:"Baru rute perdagangan",105:"Untuk membuat rute ke",106:"masukan koordinat",107:"OK",108:"Batal",109:"Nama",110:"Link",111:"Buka di tab saat ini",112:"Buka di tab baru",113:"Stop",114:"Mengirim terakhir dalam daftar",115:"+ saat ini",116:"Reset semua serangan sampai waktu saat ini",117:"Antrian Farmasi Hapus",118:"Melaksanakan nanti",119:"Hancurkan nanti",120:"Situs Baru",121:"Jenis",122:"Penguatan",123:"Serangan biasa",124:"Raid The",125:"Frekuensi",126:"pemindahan Terkadang",127:"Jenis serangan",128:"serangan",129:"2 Serangan",130:"3 serangan",131:"5 serangan",132:"10 serangan",133:"15 serangan",134:"20 serangan",135:"25 serangan",136:"30 serangan",137:"40 serangan",138:"50 serangan",139:"75 serangan",140:"100 serangan",141:"Desa",142:"Waktu",143:"Militer",144:"Penjudi",145:"The Tree",146:"Clay",147:"Besi",148:"Grain",149:"Pengirim",150:"Receiver",151:"SUMBER",152:"Periode",153:"Kirim ke",154:"Tidak",155:"tipe Order",156:"Konstruksi",157:"Level",158:"Rakyat",159:"Masa peristiwa timer",160:"Masa pemindai",161:"Jumlah keseluruhan",162:"Orde tentara jika ada sebuah bangunan",163:"Membangun apa yang hilang SUMBER DAYA",164:"Membangun semua dalam rangka prioritas",165:"Radius Pharma",166:"mengambil untuk detik X",167:"Pengalihan pasukan",400:"Sawmill",401:"Clay Pit",402:"Besi Tambang",403:"Farm",404:"Sawmill",405:"tempat pembuatan batu bata",406:"Iron Works",407:"Tepung Mill",408:"Toko roti",409:"Gudang",410:"The Barn",411:"Pandai Besi",412:"Forge Armor",413:"Arena",414:"Gedung Utama",415:"Titik Temu",416:"Pasar",417:"Kedutaan Besar",418:"Barak The",419:"Stabil",420:"Workshop",421:"Akademi",422:"Rahasia",423:"Town Hall",424:"Residence",425:"Istana",426:"Keuangan",427:"Kamar Dagang",428:"Barak Besar",429:"Stabil Besar",430:"Dinding Kota",431:"Bumi Wall",432:"Pagar",433:"tukang batu",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Gudang Besar",438:"Barn Besar",439:"Keajaiban Dunia",460:"Orde pasukan",461:"Sebuah studi pasukan",462:"Membangun",463:"Peningkatan",464:"Pelaksanaan liburan",501:"Control",502:"Pilihan",503:"Bantuan",504:"Raid The",505:"Penguatan",506:"Serangan biasa",507:"Orang-orang Romawi",508:"Jerman",509:"Galla",600:"Data berhasil disimpan",601:"Tugas ini dibuat pemilik",602:"Semua aplikasi pengaturan ulang",603:"jari-jari baru Terpasang",604:"Sebuah link baru",605:"Ditambahkan rute baru",606:"Kesalahan",607:"Data ditambahkan ke antrian",608:"Studi semacam sudah dalam antrian",609:"Bangunan ini sudah berdiri dalam antrian untuk pembongkaran",610:"Perbaikan dan sehingga memiliki tingkat tertinggi",611:"Dalam sebuah sel yang diberikan adalah membangun sesuatu yang",612:"Gedung ini dibangun di desa ini",613:"Bangunan dan sehingga akan memiliki tingkat tertinggi",614:"Komunikasi",615:"diciptakan kembali semua farmasi",616:"Untuk menghancurkan apa-apa",617:"Auto-scanning semua desa",618:"Kirim pasukan",619:"Penghancuran bangunan",620:"Pembangunan gedung",621:"Mengirim dealer",622:"Tingkat bangunan",623:"Link Eksternal",624:"Quick Links",625:"masuknya otomatis kegagalan login",626:"Tombol Pembangunan",627:"Desa ini sudah dalam daftar farmasi",628:"Hapus sepenuhnya dari lembar pertanian ",629:"Desa ini terdaftar dalam daftar farmasi",630:"Halaman jQBot T4",631:"Tutup jQBot T4",632:"Aplikasi Reset",633:"Hentikan peristiwa menjalankan timer",634:"Jalankan peristiwa menjalankan timer",635:"variabel Melihat GM",636:"Hapus GM variabel",637:"Langkah Lihat Cookie dengan langkah",638:"Penghapusan Cookie giliran berbasis",639:"Lihat variabel aplikasi",640:"Masalah dengan loading minimap, matikan program yang bertentangan",641:"Cari",642:"Pengaturan Pencarian",643:"Radius",644:"Cari lengkap",645:"Oasis",646:"Lelang",647:"Desa",648:"Jalankan Denver 3",649:"Koordinat",650:"Update",651:"Tambahkan di desa pertanian Daun",652:"Hentikan serangan dengan kerugian di atas",653:"Perubahan disimpan",654:"Login",655:"password",656:"Mengatur input otomatis dari kegagalan login",700:"[3]-Mengirim pasukan",701:"[3] + Mengirim pasukan",702:"[6] dealer Mengirim",703:"[6] + dealer Mengirim",704:"[1] Ekstraksi tentara",705:"[1] + Tantangan Angkatan Darat",706:"[4], menghancurkan bangunan",707:"[4] + menghancurkan bangunan",708:"[2] total dari semua",709:"[2] + Total semua",710:"[5] total dari semua (bangunan)",711:"[5] + Total semua (bangunan)",1001:"Legiuner",1002:"Praetoria",1003:"Imperian",1004:"pramuka Kuda",1005:"Kavaleri kaisar",1006:"Kavaleri dari Caesar",1007:"Taran",1008:"Catapult Api",1009:"Senator",1010:"Settler",1011:"Pahlawan",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"kavaleri Teutonik",1018:"pendobrak",1019:"Catapult",1020:"Ketua",1021:"Settler",1022:"Pahlawan",1023:"Phalanx",1024:"Pendekar",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Pemimpin",1032:"Settler",1033:"Pahlawan"};
var lang_in={1:"?? ???? ???",2:"????? ????",3:"???? ????????",4:"????????? ????????",5:"?????? ??????? ?? ??????? ???? ??",6:"?????? ?????? ??????? ",7:"?? ??????? ?? ??????? ?? ??????",8:"??????? ?? ???? ?????",9:"?????? ???????",10:"??? ?????? ?? ???",11:"?????? ????? ???????",12:"??????? ?? ??????",13:"??????",14:"?????? ??????",15:"???? ???????",16:"????????? ?? ???????????",17:"??????? ???????",18:"?????? ?? ???? ?? ?????? ",19:"??? ?????? ?? ??",20:"??? ?????? ??????",21:"??? ?????? ?? ???? ",22:"??? ?????? ?? ?????? ?? ??????",23:"???",24:"????? ????",25:"???? ????????",26:"???? ????? ???????",27:"?????? ?????? ??????? ",28:"???? ????? ???????",29:"??? ?????? ?? ???",30:"??????? ?? ??????",31:"?????",32:"??????",33:"??? ?????? ??????",34:"??? ?????? ?? ???? ",35:"??? ?????? ?? ?????? ?? ??????",36:"?? ??????? ??? ?? ?? ???? ???????",37:"??????? ?? ???? ?????",38:"?????? ???????",39:"????????",40:"????? ?????? ?? ????????",41:"???????? ???????",42:"????",43:"????: ??? ?? ?? ???? ???",44:"?????? ??? ???? ?? ??????? ????????",45:"????????",46:"???????? ????? ??????",47:"??????? ?? ??????",48:"???? ???????? ?? ??? ?? ????: ??????",49:"??????????? ?? ??? ?? ?????? ??? ?????? ??? ??????",50:"??????? ???????",51:"???? ?? ?????? ??????",52:"??????",53:"??? ?????? ?? ??",54:"??? ????? ??????",55:"?????",56:"15 ?? 9 ??????",57:"????? ?? ???????? ??????",58:"??????? ??????? ?? ????????",59:"????? ??????",60:"?????? ?? ????????",61:"???????? ?? ????????",62:"?????",63:"???????? ?????",64:"quests",65:"?? ?????? ?? ????? ????:",66:"??",67:"??????",68:"?? ???? ???",69:"????????? ????????",70:"??? ?????????",71:"?????? ??????",72:"??????? ????",73:"?????????",74:"??????? ?? ??????",75:"????? ?? ???????? ?? ????",76:"????????? ??????",77:"????????",78:"??????? ??????",79:"??????? ?? ???????",80:"?????? ????? ?? ??????",81:"ICQ ?? ?????? ?? ????????",82:"????? ?? ??????? ????? ?????? ??????",83:"?????? ?????? ????? ?? ??? ??",84:"????",85:"?????",86:"????",87:"??????",88:"??? ??",89:"??? ??? ???? ????",90:"????????? ????????",91:"????",92:"???? ?? ?????? ?? ???, ?????",93:"???",94:"?? ?? ?? ???? ?? ?????",95:"?? ???? ?? ???? ????",96:"* ???? ??????????? ???? ?? ???? ???? ???? ???? ??????? ???? ??:)",97:"????",98:"???????",99:"??????",100:"jQBot T4 ????",101:"??? ??? ????",102:"??? ??? ???????",103:"??? ??? ???? ???? ?? ???",104:"??? ??????? ?????",105:"???? ?? ??? ?? ????? ????? ?? ???",106:"????? ??????????",107:"??? ??",108:"???? ????",109:"???",110:"????",111:"??????? ??? ??? ?????",112:"?? ??? ??? ?????",113:"??? ???",114:"???? ??? ????? ?????",115:"+ ???????",116:"??????? ??? ?? ??? ????? ?? ?????",117:"??? ???? ??????",118:"???? ??? ??????",119:"??? ??? ???? ????",120:"?? ????",121:"??????",122:"?????????",123:"??????? ???? ",124:"????",125:"???????",126:"?????????? ????????",127:"???? ?? ??????",128:"?? ????",129:"2 ????",130:"3 ?????",131:"5 ?????",132:"10 ?? ?????",133:"15 ?? ?????",134:"20 ?? ?????",135:"25 ?? ?????",136:"30 ?? ?????",137:"40 ?? ?????",138:"50 ?? ?????",139:"75 ?? ?????",140:"100 ???? ",141:"????",142:"???",143:"????",144:"?????",145:"????",146:"??????",147:"????",148:"????",149:"??????",150:"??????",151:"??????",152:"????",153:"?? ?????",154:"????.",155:"???? ??????",156:"???????",157:"????",158:"???",159:"???? ?? ?????? ?? ????",160:"?????? ?? ????",161:"?? ?? ???",162:"???? ????? ??? ???? ?? ????? ??",163:"???? ???????? ??? ? ??? ?? ?? ????????",164:"?????????? ?? ???? ??? ?? ????????",165:"???????? ??????",166:"???? ????? ?? ??? ??? ??",167:"??????? ?? ????",400:"?????",401:"???? ?????",402:"???? ????",403:"?????",404:"?????",405:"Brickyard",406:"???? ??????",407:"??? ?????",408:"?????",409:"?????",410:"??????",411:"?????",412:"????? ???",413:"??????",414:"????? ??? ",415:"???? ???????",416:"?????",417:"???????",418:"??????",419:"?????",420:"?????????",421:"??????",422:"?????",423:"???? ???",424:"?????",425:"?????",426:"?????",427:"??????? ????",428:"???? ??????",429:"???? ?????",430:"??? ?? ???????",431:"???? ???",432:"????",433:"???",434:"???? ?? ?????",435:"Trapper",436:"???????",437:"???? ????????",438:"??? ?????",439:"????? ?? ???????",460:"??????? ?? ????",461:"??????? ?? ?? ??????",462:"????????",463:"?????",464:"????????? ?? ???????????",501:"????????",502:"??????",503:"??????",504:"????",505:"?????????",506:"??????? ???? ",507:"??????",508:"?????",509:"Galla",600:"???? ??????????? ????",601:"??? ????? ??? ???? ??",602:"??? ????????? ???????? ?????",603:"??????? ?? ????????",604:"?? ?? ????",605:"?? ??? ????? ????? ???",606:"??????",607:"???? ???? ??? ?????",608:"?? ??? ?? ?? ?????? ???? ??? ???? ?? ?? ??",609:"?? ????? ???? ?? ??????? ?? ??? ???? ??? ???? ??",610:"????? ?? ????? ?????? ???? ??",611:"?? ???? ??? ??? ??? ?? ??????? ???? ??",612:"?? ????? ?? ???? ??? ??????????? ??",613:"????? ?? ????? ?????? ???? ????",614:"?????",615:"?? ?????? ???????",616:"?? ???? ???? ?? ??? ??? ?? ???? ??",617:"??? ?????? ?? ??? ????????",618:"??????? ?????",619:"??????? ?? ?????",620:"????? ?? ???????",621:"?????? ???? ?? ??? ??",622:"??????? ?? ????",623:"????? ????",624:"?????? ????",625:"????? ?????? ?? ???????? ?????????",626:"??? ?????",627:"?? ???? ??? ???? ??? ???? ?? ?? ??",628:"??? ???? ?? ???? ??? ?? ??????? ",629:"???? ??? ???? ??? ???????? ??",630:"??? jQBot T4",631:"??? jQBot T4",632:"????? ?????????",633:"?? ???? ?????? ?????",634:"?? ???? ?????? ????",635:"????? ?? ????",636:"?? ???? ???????",637:"??? ?? ????? ???? ???",638:"?? ???? ???? ?????? ?? ?????",639:"????? ?? ?????",640:"minimap ???? ?? ??? ??? ?????? ??, ??? ?????? ?????? ????????? ????",641:"???",642:"??? ????????",643:"????????",644:"???? ???",645:"?????",646:"??????",647:"??????",648:"???? 3 ?????",649:"??????????",650:"??????",651:"????? ?? ??? ???? ??? ??????",652:"??? ?????? ?? ??? ????? ?? ??? ???",653:"???????? ?????",654:"???",655:"???????",656:"?? ????? ?????? ?? ???????? ????? ?? ??????",700:"[3] ???????-?????",701:"[3] + ???? ?? ??? ???????",702:"[6] ????? ??????",703:"[6] + ???? ?? ??? ??????",704:"[1] ???? ?? ??????",705:"[1] + ?????? ????",706:"[4], ????? ??????",707:"[4] + ????? ??????",708:"[2] ??? ?? ???",709:"[2] ??? ?? ??? +",710:"[5] ?? ??? (???????) ???",711:"[5] ?? ??? (???????) + ???",1001:"???? ?? ????",1002:"Praetorian",1003:"Imperian",1004:"????? ??????",1005:"?????? ?? ??????",1006:"???? ?? ??????",1007:"???",1008:"???? ?????",1009:"??????",1010:"???????",1011:"????",1012:"Clubswinger",1013:"???? ???? ???????? ??????",1014:"Axefighter",1015:"??????",1016:"??????",1017:"???????? ??????",1018:"battering ???",1019:"?????",1020:"?????",1021:"???????",1022:"????",1023:"?????",1024:"?????????",1025:"????",1026:"Theutates ????",1027:"??????? ?????",1028:"Haeduan",1029:"???",1030:"Trebuchet",1031:"????",1032:"???????",1033:"????"};
var lang_it={1:"Chi",2:"Lista Farm",3:"La farmacia linea",4:"Impostazioni applicazione",5:"La coda ГЁ la costruzione truppe",6:"Le truppe coda di studio ",7:"La linea di costruzione di nuovi edifici",8:"I miglioramenti linea degli edifici",9:"La demolizione di coda",10:"Il totale di tutti gli ordini",11:"I miglioramenti linea truppe",12:"Smaltimento delle truppe",13:"Le pagine della nostra",14:"Link utili",15:"Il centro del paese",16:"Attuazione delle vacanze",17:"Trade Routes",18:"Le risorse di vendita e acquisto",19:"Il gioco ГЁ in asta",20:"tutti i villaggi RISORSE",21:"Esercito di tutti i villaggi",22:"Movimenti di truppe di tutti i villaggi",23:"Log",24:"Lista Farm",25:"La farmacia linea",26:"La coda per ordinare le truppe",27:"Le truppe coda di studio ",28:"I miglioramenti linea truppe",29:"Il totale di tutti gli ordini",30:"Smaltimento delle truppe",31:"Onde",32:"Villaggi",33:"tutti i villaggi RISORSE",34:"Esercito di tutti i villaggi",35:"Movimenti di truppe di tutti i villaggi",36:"La costruzione di nuovi edifici linea",37:"I miglioramenti linea degli edifici",38:"La demolizione di coda",39:"Analisi",40:"Analisi di alleanza attacchi",41:"Analysis Report",42:"Hero",43:"Invia automaticamente un eroe per la ricerca",44:"Automatic pompaggio dell'eroe nelle oasi",45:"Cultura",46:"celebrazioni automatico azienda",47:"Commercio e RISORSE",48:"auto-bilanciamento con l'aiuto del RISORSE eroe",49:"auto-bilanciamento RISORSE nei villaggi con l'aiuto dei commercianti",50:"Trade Routes",51:"Acquisto e vendita RISORSE",52:"Asta",53:"Il gioco ГЁ in asta",54:"Comprare le cose giuste",55:"Mappa",56:"Trovare 15 e 9",57:"Trova i deboli e gli indifesi",58:"Mappa delle rotte commerciali",59:"La mappa pentole",60:"Mappa della alleanza",61:"Mappa dei nemici",62:"Sviluppo",63:"Sviluppo Automatico",64:"quest",65:"Lo sviluppo automatico dei nuovi villaggi",66:"Generale",67:"Notebook",68:"Informazioni",69:"Impostazioni applicazione",70:"Applicazione Log",71:"Link utili",72:"Villaggio Centrale",73:"Statistiche",74:"Il numero di truppe",75:"Il livello delle risorse di sviluppo",76:"Statistiche online",77:"Controllo",78:"Il programma in linea",79:"Il programma di attivitГ ",80:"Impostare l'invio di sms",81:"Controllo tramite ICQ",82:"Invia i dati al server coordinare l'alleanza",83:"Accedere al server di coordinare l'alleanza",84:"Army",85:"Reset",86:"Cancella",87:"Salva",88:"OK",89:"Distruggete dopo",90:"Impostazioni applicazione",91:"Lingua",92:"Per qualsiasi domanda, per favore",93:"Nome",94:"Selezionare ad un prezzo inferiore",95:"Acquisti a un prezzo inferiore",96:"Acquisto * non ГЁ implementata e probabilmente non:)",97:"Unguento",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordine tardi",102:"Costruisci dopo",103:"Per indagare piГ№ tardi",104:"rotta commerciale Nuovo",105:"Per creare una rotta verso",106:"coordinate input",107:"OK",108:"Annulla",109:"Nome",110:"Link",111:"Apri in una scheda corrente",112:"Apri in nuova scheda",113:"Stop",114:"Invia l'ultimo nella lista",115:"+ corrente",116:"Reset tutti gli attacchi fino al momento attuale",117:"Clear Queue Pharma",118:"Effettuare piГ№ tardi",119:"Distruggete dopo",120:"Nuovi siti",121:"Tipo",122:"Rafforzamento",123:"L'attacco al solito",124:"Il Raid",125:"Frequenza",126:"spostamento accidentale",127:"Il tipo di attacco",128:"un attacco",129:"2 Attacco",130:"3 attacchi",131:"5 attacchi",132:"10 attacchi",133:"15 attacchi",134:"20 attacchi",135:"25 attacchi",136:"30 attacchi",137:"40 attacchi",138:"50 attacchi",139:"75 attacchi",140:"100 attacco",141:"The Village",142:"Tempo",143:"L'esercito",144:"Gambler",145:"L'Albero",146:"Clay",147:"Iron",148:"Grain",149:"Mittente",150:"ricevitore",151:"RISORSE",152:"Periodo",153:"Invia a",154:"No.",155:"Tipo di ordine",156:"Costruzione",157:"Livello",158:"Il Popolo",159:"Il periodo di eventi timer",160:"Il periodo dello scanner",161:"Il totale di tutti",162:"Ordine l'esercito se vi ГЁ un edificio",163:"Costruire su ciГІ che manca RISORSE",164:"Costruire tutte in ordine di prioritГ ",165:"Raggio Pharma",166:"take away per X secondi",167:"La deviazione delle truppe",400:"Segheria",401:"Clay Pit",402:"Miniera di ferro",403:"La Fattoria",404:"Segheria",405:"Brickyard",406:"Iron Works",407:"Mulino",408:"Panificio",409:"Warehouse",410:"Il Fienile",411:"Fabbro",412:"Armor Forge",413:"Arena",414:"Main Building",415:"Punto Rally",416:"Mercato",417:"L'ambasciata",418:"La Caserma",419:"Stabile",420:"Workshop",421:"L'Accademia",422:"Secret",423:"Town Hall",424:"Residence",425:"Il Palazzo",426:"Tesoro",427:"La Camera di Commercio",428:"Grande Caserma",429:"Grande scuderia",430:"City Walls",431:"Fortificazioni",432:"Fence",433:"Scalpellino",434:"La Birreria",435:"Trapper",436:"Taverna",437:"Grande Magazzino",438:"Grande Barn",439:"Meraviglia del Mondo",460:"Ordina le truppe",461:"Uno studio delle truppe",462:"Costruire",463:"Improvement",464:"Attuazione delle vacanze",501:"Controllo",502:"Opzioni",503:"Aiuto",504:"Il Raid",505:"Rafforzamento",506:"L'attacco al solito",507:"I Romani",508:"I tedeschi",509:"Galla",600:"Dati salvati correttamente",601:"Il compito ГЁ reso titolare",602:"Tutto il ripristino delle impostazioni",603:"Raggio Installato nuovo",604:"Un nuovo link",605:"Aggiunto un nuovo itinerario",606:"Errore",607:"I dati aggiunti alla coda",608:"Tale studio ГЁ giГ  in coda",609:"Questo edificio ГЁ giГ  in fila per la demolizione",610:"Miglioramento e quindi ha il piГ№ alto livello",611:"In una data cellula ГЁ costruire qualcosa",612:"Questo edificio ГЁ in costruzione in questo villaggio",613:"L'edificio e cosГ¬ avrГ  il piГ№ alto livello",614:"Comunicazione",615:"ricreato tutti Pharma",616:"Per distruggere nulla",617:"Auto-scansione di tutti i villaggi",618:"Invia truppe",619:"La distruzione degli edifici",620:"La costruzione degli edifici",621:"Invio commercianti",622:"Livelli degli edifici",623:"Collegamenti esterni",624:"Collegamenti rapidi",625:"Acquisizione automatica di errore di accesso",626:"Sviluppo Buttons",627:"Questo paese ГЁ giГ  nella lista farmaceutico",628:"Rimuovere completamente dal foglio di fattoria ",629:"Il paese ГЁ elencato nella lista farmaceutico",630:"Pagina jQBot T4",631:"Chiudi jQBot T4",632:"Applicazione Reset",633:"Stop agli eventi correre timer",634:"Esegui eventi timer run",635:"variabili Guarda il GM",636:"Rimuovere il GM variabili",637:"Mostra Cookie passo dopo passo",638:"Rimozione di Cookie a turni",639:"Visualizza variabili di applicazione",640:"Problemi con il caricamento della minimappa, disattivare il programma in conflitto",641:"Cerca",642:"Impostazioni di ricerca",643:"Raggio",644:"Ricerca completa",645:"Oasis",646:"Asta",647:"Villaggi",648:"Run Denver 3",649:"Coordinate",650:"Aggiorna",651:"Aggiungi nel villaggio di fattoria di Leaf",652:"Basta attacchi con perdite sopra",653:"Modifiche salvato",654:"Login",655:"password",656:"Impostare l'ingresso automatico di un errore di accesso",700:"[3]-Invia truppe",701:"[3] + Invio truppe",702:"[6] rivenditori Invio",703:"[6] + Invio commercianti",704:"[1] L'estrazione delle forze armate",705:"[1] + Sfida Army",706:"[4], demolire l'edificio",707:"[4] + demolire l'edificio",708:"[2] Il totale di tutti",709:"[2] + totale di tutti",710:"[5] Il totale di tutti (edilizia)",711:"[5] Totale + di tutti (edilizia)",1001:"legionario",1002:"Praetorian",1003:"imperiese",1004:"Scout Horse",1005:"La cavalleria dell'imperatore",1006:"La cavalleria di Cesare",1007:"Taran",1008:"Catapult Fuoco",1009:"il senatore",1010:"coloni",1011:"Hero",1012:"Combattente",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladino",1017:"cavalleria teutonica",1018:"ariete",1019:"Catapult",1020:"The Chief",1021:"coloni",1022:"Hero",1023:"Phalanx",1024:"Spadaccino",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"coloni",1033:"Hero"};
var lang_jp={1:"??",2:"???????",3:"??????",4:"??????????",5:"?????????????",6:"????????",7:"????????????",8:"?????????",9:"??????",10:"?????????",11:"?????????",12:"????",13:"??????",14:"???",15:"?????",16:"?????",17:"??????",18:"??????",19:"??????????????",20:"????????",21:"???????",22:"??????????",23:"??",24:"???????",25:"????",26:"???????",27:"????????",28:"?????????",29:"?????????",30:"????",31:"?",32:"?",33:"????????",34:"???????",35:"??????????",36:"??????????",37:"?????????",38:"??????",39:"??",40:"????????",41:"??????",42:"????",43:"??????????????",44:"?????????????",45:"??",46:"???????",47:"???????",48:"??????????????????????",49:"???????????????????????",50:"??????",51:"?????",52:"??????",53:"??????????????",54:"???????",55:"???",56:"15?9???",57:"?????????",58:"????????",59:"??????",60:"??????????",61:"?????",62:"??",63:"????",64:"????",65:"?????????",66:"??",67:"??????",68:"????",69:"??????????",70:"??????????",71:"???",72:"????",73:"??",74:"???",75:"??????????",76:"???????",77:"??????",78:"???????????",79:"?????????",80:"????SMS???",81:"ICQ?????????",82:"????????????????????",83:"??????????????????????",84:"????",85:"????",86:"???",87:"??",88:"OK",89:"??????",90:"??????????",91:"??",92:"?????????????",93:"??",94:"??????????",95:"????????",96:":)*????????????????????",97:"??",98:"?????",99:"???",100:"jQBot T4???",101:"????",102:"????????",103:"????????",104:"????????",105:"????????????",106:"????",107:"OK",108:"?????",109:"??",110:"???",111:"????????",112:"????????",113:"??",114:"??????????",115:"+??",116:"???????????????????",117:"??????????",118:"????",119:"??????",120:"?????",121:"???",122:"??",123:"??????",124:"RAID",125:"???",126:"?????",127:"?????",128:"??",129:"2????",130:"3???",131:"5??",132:"10???",133:"15???",134:"20???",135:"25???",136:"30???",137:"40???",138:"50???",139:"75???",140:"100??",141:"?????",142:"??",143:"??",144:"??????",145:"???",146:"???",147:"?",148:"??",149:"???",150:"?????",151:"????",152:"??",153:"???",154:"????",155:"?????",156:"??",157:"???",158:"??",159:"???????????",160:"???????",161:"??????",162:"?????????????",163:"??????????????????",164:"????????????",165:"??????",166:"X??????????",167:"????",400:"??",401:"??????",402:"???????",403:"????",404:"??",405:"???????",406:"????????",407:"??",408:"?????",409:"??",410:"???",411:"???",412:"????????",413:"????",414:"??",415:"???????",416:"??",417:"???",418:"????",419:"???",420:"???????",421:"?????",422:"??",423:"??????",424:"?????",425:"?",426:"???",427:"?????",428:"???",429:"??",430:"??",431:"????",432:"????",433:"??",434:"???",435:"?????",436:"????",437:"???????",438:"??????",439:"?????",460:"?????",461:"????",462:"??",463:"??",464:"?????",501:"??????",502:"?????",503:"???",504:"RAID",505:"??",506:"??????",507:"????",508:"????",509:"???",600:"?????????",601:"?????????????",602:"???????????????????",603:"??????????????",604:"??????",605:"?????????",606:"???",607:"??????????",608:"??????????????????????",609:"??????????????????",610:"???????????????????",611:"????????????????",612:"????????????????",613:"????????????????",614:"?????????",615:"????????????",616:"???????????",617:"?????????????",618:"?????",619:"?????",620:"??????",621:"???????",622:"???????",623:"?????",624:"???????",625:"???????????",626:"??????",627:"???????????????????",628:"??????????????",629:"????????????????",630:"???jQBot T4",631:"???jQBot T4",632:"?????????????",633:"?????????????????",634:"????????????????",635:"?????GM",636:"?????GM",637:"?????????????????",638:"????????????????",639:"?????????????",640:"????????????????????????????",641:"??",642:"????",643:"??",644:"?????",645:"????",646:"??????",647:"?",648:"????????????????3",649:"??",650:"??????",651:"???????",652:"??????????",653:"????????",654:"????",655:"?????",656:"????????????????",700:"[3] - ???",701:"[3] +??",702:"[6]???????",703:"[6] +???????",704:"[1]????",705:"[1] +?????????",706:"[4]????????",707:"[4] +???????",708:"[2]??????",709:"[2] +??????",710:"[5]???(??)???",711:"[5]????+??(??)",1001:"??",1002:"??????",1003:"??????",1004:"??????",1005:"?????",1006:"???????",1007:"???",1008:"???????",1009:"????",1010:"???",1011:"????",1012:"????????",1013:"?????",1014:"Axefighter",1015:"????",1016:"?????",1017:"???????",1018:"?",1019:"?????",1020:"???",1021:"???",1022:"????",1023:"??????",1024:"?????",1025:"????????",1026:"???????????",1027:"????????",1028:"Haeduan",1029:"???",1030:"????????",1031:"????",1032:"???",1033:"????"};
var lang_kr={1:"??",2:"? ??",3:"?? ??",4:"?? ???? ??",5:"?????? ?????",6:"??? ?? ?? ",7:"??? ??? ??? ??",8:"??? ??? ??",9:"??? ??",10:"?? ??? ??",11:"?? ?? ??",12:"??? ??",13:"???",14:"??? ??",15:"??? ??",16:"??? ??",17:"?? ??",18:"?? ? ?? ??",19:"??? ??? ",20:"?? ?? ??",21:"?? ?? ??",22:"?? ??? ??? ??",23:"???",24:"? ??",25:"?? ??",26:"?? ???? ??",27:"??? ?? ?? ",28:"?? ?? ??",29:"?? ??? ??",30:"??? ??",31:"???",32:"??",33:"?? ?? ??",34:"?? ?? ??",35:"?? ??? ??? ??",36:"??? ??? ?? ??",37:"??? ??? ??",38:"??? ??",39:"??",40:"?? ??? ??",41:"?? ???",42:"??",43:"?? ???? ??? ??",44:"???? ??? ?? ??",45:"??",46:"?? ?? ?? ??",47:"?? ? ??",48:"?? ??? ???? ?? ???",49:"??? ???? ???? ?? ??? ??",50:"?? ??",51:"??? ?? ? ??",52:"??",53:"??? ??? ",54:"??? ?? ??",55:"??",56:"15 9 ??",57:"???? ??? ?? ",58:"?? ????",59:"?? ??",60:"?????",61:"?????",62:"??",63:"?? ??",64:"???",65:"??? ??? ?? ??",66:"??",67:"???",68:"??",69:"?? ???? ??",70:"?? ?? ????",71:"??? ??",72:"?? ??",73:"??",74:"??? ??",75:"?? ??? ??",76:"?? ???",77:"??",78:"?? ???",79:"??? ??",80:"??? SMS ??",81:"ICQ? ?? ??",82:"??? ?? ??? ??? ???",83:"??? ?? ??? ???",84:"??",85:"???",86:"???",87:"??",88:"OK",89:"??? ??",90:"?? ???? ??",91:"??",92:"?? ??, ?? ",93:"??",94:"??? ???? ??",95:"??? ???? ??",96:") * ??? ???? ?? ???? ??? ??",97:"??",98:"???",99:"???",100:"jQBot T4 ??",101:"??? ??",102:"??? ??",103:"??? ??",104:"??? ?? ??",105:"? ?? ??? ????",106:"?? ??",107:"OK",108:"??",109:"??",110:"??",111:"?? ??? ??",112:"? ??? ??",113:"?????",114:"???? ????? ???",115:"+ ??",116:"?? ???? ?? ??? ???",117:"??? ??? ??",118:"??? ??",119:"??? ??",120:"? ??",121:"??",122:"??",123:"???? ??",124:"???",125:"???",126:"?? ??",127:"??? ??",128:"??",129:"2 ??",130:"3 ??",131:"5 ??",132:"10 ??",133:"15 ??",134:"20 ??",135:"25 ??",136:"30 ??",137:"40 ??",138:"50 ??",139:"75 ??",140:"100 ??",141:"??",142:"??",143:"??",144:"???",145:"??",146:"???",147:"?",148:"??",149:"?? ??",150:"???",151:"??",152:"??",153:"???",154:"???",155:"?? ??",156:"??",157:"??",158:"???",159:"??? ??? ??",160:"???? ??",161:"?? ?",162:"?????? ??? ??",163:"?????? ??",164:"?? ??? ??? ?? ??",165:"?? ??",166:"X? ? ???",167:"??? ??",400:"???",401:"??? ??",402:"?? ?? ",403:"? ? (The Farm)",404:"???",405:"??",406:"???",407:"??? ?",408:"????",409:"?? ???",410:"?",411:"??",412:"?? ??",413:"???",414:"??",415:"?? ???",416:"??",417:"???",418:"???",419:"??",420:"???",421:"????",422:"??",423:"?? ?",424:"??",425:"?",426:"??",427:"?? ???",428:"??? ???",429:"??? ??",430:"?? ??",431:"?? ?",432:"???",433:"????",434:"??",435:"???",436:"???",437:"??? ??",438:"? ?",439:"??? ????",460:"??? ??",461:"??? ??",462:"??",463:"??",464:"??? ??",501:"??",502:"??",503:"???",504:"???",505:"??",506:"???? ??",507:"??",508:"??",509:"??",600:"???? ????? ???????",601:"????? ???",602:"?? ?? ???? ?? ???",603:"?? ? ??",604:"? ??",605:"? ??? ??",606:"??",607:"???? ???? ??",608:"??? ?????? ??",609:"? ???? ??? ?? ?? ???",610:"?? ??? ???? ???",611:"?? ???? ??? ?? ? ????",612:"? ???? ???? ?? ?????",613:"?? ? ?? ??? ????",614:"??????",615:"?? ??? ???",616:"????? ???? ???",617:"?? ??? ?? ??",618:"?? ??? ",619:"??? ??",620:"??? ??",621:"?? ???",622:"??? ??",623:"?? ??",624:"?? ??",625:"??? ??? ?? ??",626:"?? ??",627:"? ???? ?? ?????",628:"?? ???? ??? ?? ",629:"??? ?? ??? ?????",630:"??? jQBot T4",631:"?? jQBot T4",632:"??? ?? ????",633:"?? ??? ???? ??",634:"?? ??? ???? ??",635:"?? ?? GM",636:"?? GM? ??",637:"????? ??? ??",638:"??? ?? ??? ??",639:"?? ???? ?????",640:"minimap ??? ???, ??? ???????? ??",641:"??",642:"?? ??",643:"??",644:"?? ??",645:"????",646:"??",647:"??",648:"?? ?? 3",649:"??",650:"????",651:"??? ??? ??",652:"? ??? ?? ??? ?????",653:"?? ??",654:"???",655:"?? ??",656:"??? ??? ?? ??? ??",700:"[3] - ?? ??? ",701:"[3] + ??? ??",702:"[6] ??? ??",703:"[6] + ??? ??",704:"[1] ??? ??",705:"[1] + ?? ??",706:"[4] ??? ??",707:"[4] + ?? ??",708:"[2] ??? ?",709:"?? ? [2] + ?",710:"[5] ?? (??)? ?",711:"[5] ?? (??)? + ?",1001:"??",1002:"???",1003:"Imperian",1004:"?? ????",1005:"??? ???",1006:"????? ???",1007:"??",1008:"?? ???",1009:"??",1010:"???",1011:"??",1012:"Clubswinger",1013:"?? ??",1014:"Axefighter",1015:"????",1016:"???",1017:"??? ???",1018:"??",1019:"???",1020:"??",1021:"???",1022:"??",1023:"??",1024:"??",1025:"?? ???",1026:"Theutates ??",1027:"??? ???",1028:"Haeduan",1029:"??",1030:"??",1031:"??",1032:"???",1033:"??"};
var lang_lt={1:"Apie",2:"Ukio sarasas",3:"linija vaistine",4:"Application Settings",5:"eile stato karius",6:"eiles studiju kariu ",7:"is nauju pastatu statyba linija",8:"linija gerinti pastatu",9:"eileje griovimo",10:"visu uzsakymu is viso",11:"linija pagerinti kariu",12:"Atlieku kariu",13:"Notepad",14:"Naudingos nuorodos",15:"gyvenvietes centre",16:"igyvendinimas sventes",17:"prekybos keliai",18:"pirkimo ir pardavimo ISTEKLIAI",19:"zaidimas yra aukcionas",20:"visi kaimu ISTEKLIAI",21:"armija visus kaimus",22:"Judesiai kariu visu kaimu",23:"Prisijungti",24:"Ukio sarasas",25:"linija vaistine",26:"eileje uzsakymo kariai",27:"eiles studiju kariu ",28:"linija pagerinti kariu",29:"visu uzsakymu is viso",30:"Atlieku kariu",31:"Bangos",32:"Villages",33:"visi kaimu ISTEKLIAI",34:"armija visus kaimus",35:"Judesiai kariu visu kaimu",36:"linija nauju pastatu statyba",37:"linija gerinti pastatu",38:"eileje griovimo",39:"analize",40:"analize ispuoliu aljansa",41:"analizes ataskaita",42:"Hero",43:"Automatiskai siusti herojus ant Quest",44:"Automatine siurbimo is herojus oazes",45:"Kultura",46:"Automatinis holdingo Sventes",47:"Prekybos ir ISTEKLIAI",48:"Auto-balansavimas su herojaus ISTEKLIU padeti",49:"Auto-balansavimo ISTEKLIU su pirkliai padeti kaimuose",50:"prekybos keliai",51:"Pirkimas ir pardavimas ISTEKLIAI",52:"Aukcionai",53:"zaidimas yra aukcionas",54:"Perkamoji teisingus dalykus",55:"Zemelapis",56:"rasti 15 ir 9",57:"Surasti silpnas ir beginklis",58:"zemelapis prekybos keliai",59:"zemelapi keptuves",60:"zemelapis aljansa",61:"zemelapis priesai",62:"Kurimas",63:"Automatinis pletra",64:"Quest",65:"Automatinis kuriant naujus kaimus",66:"Bendrosios nuostatos",67:"notebook",68:"Apie",69:"Application Settings",70:"Prisijungti taikymas",71:"Naudingos nuorodos",72:"Centrines kaimas",73:"Statistika",74:"kariu skaiciu",75:"pletros istekliu lygi",76:"Statistika internete",77:"Kontrole",78:"grafika internete",79:"veiklos tvarkarastis",80:"nustatymas SMS",81:"Valdymo per ICQ",82:"Siusti i serveri informacijos koordinavimo aljansa",83:"Prisijungti prie serverio koordinavimo aljansa",84:"armija",85:"Reset",86:"Isvalyti",87:"Issaugoti",88:"Gerai",89:"Destroy veliau",90:"Application Settings",91:"Kalba",92:"Del kokiu klausimu, prasome",93:"Vardas",94:"Pasirinkite kaina toliau",95:"Pirkimo kaina toliau",96:"* Pirkimas neigyvendinamas ir, greiciausiai, bus ne:)",97:"Tepalas",98:"Eikite",99:"Cage",100:"Vykdyti jQBot T4",101:"Eiles Veliau",102:"Pastatyk veliau",103:"istirti veliau",104:"Naujas prekybos kelias",105:"Jei norite sukurti marsruta",106:"ivesties koordinuoja",107:"Gerai",108:"Atsaukti",109:"Vardas",110:"Nuoroda",111:"Atidaryti dabartini skirtuka",112:"Atidaryti nauja skirtuka",113:"Stop",114:"Siusti paskutinis i sarasa",115:"+ srove",116:"Atkurti viska ispuoliu iki dabartinio laiko",117:"Isvalyti eile Pharma",118:"Atlikti veliau",119:"Destroy veliau",120:"Naujos nuorodos",121:"Tipas",122:"stiprinimas",123:"Paprastai ataka",124:"RAID",125:"daznis",126:"Avariju poslinkis",127:"atakos tipo",128:"ataka",129:"2 Attack",130:"3 ispuoliu",131:"5 ispuoliu",132:"10 ispuoliu",133:"15 ispuoliu",134:"20 ispuoliu",135:"25 ispuoliu",136:"30 ispuoliu",137:"40 ispuoliu",138:"50 ispuoliu",139:"75 ispuoliu",140:"100 ataka",141:"kaimas",142:"Laikas",143:"kariuomene",144:"Zaidejas",145:"Medis",146:"Molis",147:"Gelezinis",148:"grain",149:"Siuntejas",150:"imtuvas",151:"Istekliai",152:"Laikotarpis",153:"Siusti",154:"Ne!",155:"Uzsakymo tipas",156:"Statyba",157:"lygis",158:"Zmones",159:"laikmacio renginiu laikotarpis",160:"is skaitytuvo laikotarpis",161:"Visu viso",162:"Eiles kariuomene, jei yra pastatas",163:"Remiantis ko truksta ISTEKLIAI",164:"Statybos visos prioriteto tvarka",165:"Spindulys Pharma",166:"paimti X sekundziu",167:"kariu nukreipimo",400:"Lentpjuve",401:"Molio karjeras",402:"Gelezies kasykla",403:"ukis",404:"Lentpjuve",405:"Plytine",406:"Iron Works",407:"malunas",408:"Bakery",409:"sandelis",410:"tvartas",411:"kalve",412:"Forge Armor",413:"Arena",414:"Gyvenamasis pastatas",415:"Susiburimo vieta",416:"rinka",417:"ambasada",418:"Kareivines",419:"Stabilus",420:"Seminaras",421:"Akademija",422:"Paslaptis",423:"rotuse",424:"gyvenamoji vieta",425:"Palace",426:"izdo",427:"prekybos rumai",428:"Didziosios kareivines",429:"Didzioji arklide",430:"City Walls",431:"Zeme siena",432:"Tvora",433:"murininkas",434:"Alaus darykla",435:"medziotojas spastais",436:"uzeiga",437:"Didysis sandelis",438:"Big Barn",439:"Wonder of the World",460:"Eiles kariai",461:"kariu studija",462:"pastatas",463:"gerinimas",464:"igyvendinimas sventes",501:"Kontrole",502:"Options",503:"Pagalba",504:"RAID",505:"stiprinimas",506:"Paprastai ataka",507:"romansas",508:"vokieciai",509:"Galla",600:"Duomenys sekmingai issaugoti",601:"uzdavinys yra pagaminti savininkas",602:"Visos programos parametrus is naujo",603:"Idiegti nauja spindulys",604:"nauja nuoroda",605:"pridejo nauja marsruta",606:"Klaida",607:"duomenu prideta i eile",608:"Toks tyrimas jau yra eileje",609:"Sis pastatas jau stovi eileje griovimo",610:"gerinimas ir todel turi auksciausio lygio",611:"Per tam tikra lasteliu yra sukurti kazka",612:"Sis pastatas yra statomas siame kaime",613:"pastato, todel tures auksciausiu lygiu",614:"Komunikacija",615:"atkure visas Pharma",616:"sunaikinti nieko",617:"Auto-skenavimo visu kaimu",618:"Siusti kariu",619:"pastatu sunaikinimo",620:"pastatu statybos",621:"siuntimas tarpininkai",622:"lygiai pastatai",623:"Isorines nuorodos",624:"Greitosios nuorodos",625:"Automatinis iraso prisijungimo nesekmes",626:"mygtukai pletra",627:"Sis kaimas yra jau vaistu saraso",628:"Pasalinti visiskai is ukio lapas",629:"kaimas isvardytu vaistu saraso",630:"Puslapio jQBot T4",631:"Uzdaryti jQBot T4",632:"Atstatyti taikymas",633:"Stop paleisti laikmati renginiai",634:"Run Run laikmatis renginiai",635:"Perziuri kintamuju GM",636:"Pasalinti kintamuju GM",637:"Rodyti Cookie yra zingsnis po zingsnio",638:"pasalinimas Cookie ruoztu pagristos",639:"Perziureti taikymo kintamuju",640:"Problemos su pakrovimo mini, isjunkite kilo programa",641:"Ieskoti",642:"Paieska Nustatymai",643:"Spindulys",644:"Paieska baigta",645:"Oaze",646:"Aukcionai",647:"Villages",648:"Vykdyti Denver 3",649:"Koordinates",650:"Atnaujinti",651:"Prideti ukiu kaime Leaf",652:"Stop ispuoliu nuostoliai virsaus",653:"Pakeitimai issaugoti",654:"Prisijungti",655:"slaptazodis",656:"Nustatyti automatinio indelis prisijungimo nesekmes",700:"[3], siusti karius",701:"[3] + siuntimas kariai",702:"[6] siuntimas tarpininkai",703:"[6] + siuntimas tarpininkai",704:"[1] kariuomenes gavyba",705:"[1] + Challenge,armija ",706:"[4], nugriauti pastata",707:"[4] + nugriauti pastata",708:"[2] visu is viso",709:"[2] + Bendras visu",710:"[5], visu (pastatas) is viso",711:"[5] + viso visos (pastatas)",1001:"legionieriu",1002:"Pretorionas",1003:"Imperionas",1004:"Arklio Scout",1005:"imperatoriaus raiteliu",1006:"Cezario kavalerija",1007:"Taranas",1008:"Ugnies Katapulta",1009:"senatorius",1010:"Settler",1011:"Hero",1012:"pestininkas su kuoka",1013:"ietininkas",1014:"su kirviu",1015:"Scout",1016:"Paladin",1017:"Kryziuociu kavalerija",1018:"taranas",1019:"Katapulta",1020:"Vyriausiasis",1021:"Settler",1022:"Hero",1023:"falanga",1024:"kardu",1025:"Pathfinder",1026:"Raitas perkunas",1027:"Druid Rider",1028:"hedujas",1029:"Taranas",1030:"Trebuchet",1031:"Leader",1032:"Settler",1033:"Hero"};
var lang_lv={1:"Par",2:"Farm Saraksts",3:"linija aptieka",4:"Application Settings",5:"rinda ir eka karaspeka",6:"rinda petijumu karaspeks",7:"liniju jaunu eku buvnieciba",8:"linija uzlabojumi eku",9:"rinda nojauksanu",10:"kopa par visiem pasutijumiem",11:"linija uzlabojumi karaspeka",12:"Apglabasana karaspeka",13:"Notebook",14:"Noderigas saites",15:"ciemata centru",16:"istenosana brivdienas",17:"Tirdzniecibas Routes",18:"pardosanas un pirksanas RESOURCES",19:"Spele ir izsole",20:"visu ciematu RESOURCES",21:"armija visu ciematu",22:"kustibas karaspeks visu ciematu",23:"Log",24:"Farm Saraksts",25:"linija aptieka",26:"rinda pasutijuma karaspeka",27:"rinda petijumu karaspeks",28:"linija uzlabojumi karaspeka",29:"kopa par visiem pasutijumiem",30:"Apglabasana karaspeka",31:"Vilni",32:"Villages",33:"visu ciematu RESOURCES",34:"armija visu ciematu",35:"kustibas karaspeks visu ciematu",36:"linija jaunu eku buvnieciba",37:"linija uzlabojumi eku",38:"rinda nojauksanu",39:"Analysis",40:"Analize par uzbrukumu alianses",41:"analizes protokola",42:"Hero",43:"Automatiski nosutit varonis meklejumos",44:"Automatiska suknesanai varonis oazes",45:"Kultura",46:"Automatic saimnieciba svinibas",47:"Tirdzniecibas un RESOURCES",48:"auto-lidzsvarosana ar palidzibu varonis RESOURCES",49:"auto-lidzsvarosanas RESURSU, kas, izmantojot komersantu ciematu",50:"Tirdzniecibas Routes",51:"pirksana un pardosana RESOURCES",52:"Izsoles",53:"Spele ir izsole",54:"Buying pareizas lietas",55:"Map",56:"Meklejot 15 un 9",57:"Atrast vajs un neaizsargats",58:"Karte tirdzniecibas celi",59:"karte pannas",60:"karte alianse",61:"karte ienaidniekiem",62:"Attistibas",63:"Automatic Development",64:"quests",65:"Automatiska jaunu ciematu",66:"General",67:"Notebook",68:"Par",69:"Application Settings",70:"Log Application",71:"Noderigas saites",72:"Central Village",73:"Statistika",74:"karaspeka",75:"attistibas limenis RESOURCES",76:"Statistika Online",77:"Control",78:"grafiks online",79:"grafiks aktivitate",80:"Setting nosutot sms",81:"Vadiba ar ICQ",82:"Nosutit informaciju uz serveri koordinacijas apvieniba",83:"Pieteikties uz servera koordinacijas apvieniba",84:"armija",85:"Reset",86:"Dzest",87:"Saglabat",88:"OK",89:"Destroy velak",90:"Application Settings",91:"Valoda",92:"Ja jums rodas jautajumi, ludzu,",93:"Nosaukums",94:"Izveleties zemaku cenu, neka",95:"Iepirkumu zemaku cenu, neka",96:"* Iepirkumu nav istenots, un, visticamak, nav:)",97:"Ziede",98:"Ritiniet",99:"Buris",100:"Run jQBot T4",101:"Order Velak",102:"Veidot velak",103:"Lai izpetitu velak",104:"New tirdzniecibas cels",105:"Lai izveidotu marsrutu uz",106:"ievadi koordinates",107:"OK",108:"Atcelt",109:"Nosaukums",110:"Saite",111:"Atvert pasreizejo cilni",112:"Atvert jauna cilne",113:"Stop",114:"Nosutit pedejais saraksta",115:"+ pasreizejo",116:"Atjaunot visus uzbrukumus, kamer pasreizejais laiks",117:"Dzest rindas Pharma",118:"Veikt velak",119:"Destroy velak",120:"New Links",121:"Veids",122:"pastiprinasana",123:"Parasta uzbrukums",124:"Raid",125:"Frequency",126:"nejausu parvietosanos",127:"veida uzbrukums",128:"uzbrukums",129:"2 Attack",130:"3 uzbrukumiem",131:"5 uzbrukumiem",132:"10 uzbrukumiem",133:"15 uzbrukumiem",134:"20 uzbrukumiem",135:"25 uzbrukumiem",136:"30 uzbrukumiem",137:"40 uzbrukumiem",138:"50 uzbrukumiem",139:"75 uzbrukumiem",140:"100 uzbrukuma",141:"Village",142:"Laiks",143:"armija",144:"Gambler",145:"Tree",146:"Clay",147:"Iron",148:"grain",149:"Sutitajs",150:"Sanemejs",151:"RESURSI",152:"Periods",153:"Nosutit",154:"Ne.",155:"Pasutijuma veids",156:"Buvnieciba",157:"Level",158:"Cilveki",159:"periods taimeris pasakumi",160:"periods skeneris",161:"Kopejais visu",162:"Kartiba armija, ja ir eka",163:"Balstoties uz to, kas ir pazudis RESOURCES",164:"Building visi prioritara seciba",165:"Radiuss Pharma",166:"take away for X sekundes",167:"novirzisanas karaspeka",400:"Sawmill",401:"Mala karjers",402:"Dzelzs Mine",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Iron Works",407:"Milti Mill",408:"Maiznica",409:"Noliktava",410:"Barn",411:"Kaleja",412:"Forge Armor",413:"Arena",414:"Main Building",415:"Rally Point",416:"Tirgus",417:"Vestnieciba",418:"Kazarmas",419:"Stable",420:"darbnica",421:"Akademija",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Valsts kase",427:"Tirdzniecibas kamera",428:"Lielas Kazarmas",429:"Great Stable",430:"City Walls",431:"Stallis",432:"Zoga",433:"akmenslauzeja",434:"Alus daritava",435:"Trapper",436:"Tavern",437:"Liela Noliktava",438:"Big Barn",439:"Wonder of the World",460:"Kartiba karaspeka",461:"petijums par karaspeka",462:"Building",463:"uzlabosana",464:"istenosana brivdienas",501:"Control",502:"Options",503:"Help",504:"Raid",505:"pastiprinasana",506:"Parasta uzbrukums",507:"Romans",508:"Vaciesi",509:"Galla",600:"Datu veiksmigi saglabats",601:"uzdevums ir izgatavota ipasnieks",602:"Visi lietojumprogrammu iestatijumus reset",603:"Installed jaunas radiuss",604:"jaunu saiti",605:"Pievienots jauns cels",606:"Error",607:"Datu pievienots rinda",608:"Sads petijums jau rinda",609:"Si eka jau stavot rinda, lai nojauksanas",610:"uzlabosana un ta ir visaugstakaja limeni",611:"In konkreta suna ir veidot kaut ko",612:"Si eka tiek buveta saja ciema",613:"eka, un ta bus visaugstakaja limeni",614:"Komunikacija",615:"parbuvets visiem Pharma",616:"Lai iznicinatu nav nekas",617:"Auto-skenesana visu ciematu",618:"Nosutit karaspeks",619:"iznicinasana eku komplekss",620:"eku buvniecibas",621:"Sending veiceji",622:"limeni eku",623:"Arejas saites",624:"Quick Links",625:"Automatiska ieraksta login neveiksmes",626:"Pogas Development",627:"Sis ciemats ir jau farmacijas saraksta",628:"Nonemt pilnigi no saimniecibas lapa",629:"Ciemats ir uzskaititas farmacijas saraksta",630:"Page jQBot T4",631:"Close jQBot T4",632:"Reset Application",633:"Beidziet palaist taimeri notikumi",634:"Run palaist taimeris pasakumi",635:"Skatas mainigie GM",636:"Nonemt mainigie GM",637:"View Cookie ir soli pa solim",638:"likvidesana Cookie karta balstitu",639:"View pieteikums mainigie lielumi",640:"Problemas ar iekrausanu minimap, izsledziet konfliktejosas programmu",641:"Meklet",642:"Meklet Settings",643:"Radiuss",644:"Meklet pilnigu",645:"Oasis",646:"Izsoles",647:"Villages",648:"Run Denver 3",649:"koordinates",650:"Update",651:"Pievienot saimniecibas ciemata Leaf",652:"Stop uzbrukumi ar zaudejumiem virs",653:"Izmainas saglabatas",654:"Pieteikties",655:"parole",656:"Setting automatisku ievadi login neveiksmes",700:"[3]-Send karaspeka",701:"[3] + sutisana karaspeka",702:"[6] Sending veiceji",703:"[6] + sutisana veiceji",704:"[1] ieguves armijas",705:"[1] + Challenge armiju",706:"[4], nojaukt",707:"[4] + nojaukt",708:"[2] Kopejais visu",709:"[2] + Kopejais visu",710:"[5] Kopejais visu (ekas)",711:"[5] + Kopejais visu (ekas)",1001:"legionars",1002:"Praetorian",1003:"Imperian",1004:"Zirgs scout",1005:"jatnieki no imperators",1006:"jatnieki Cezara",1007:"Taran",1008:"Uguns Katapulta",1009:"Senator",1010:"Kolonists",1011:"Hero",1012:"Rungas vezetajs",1013:"Spearman",1014:"Karacirvja vezetajs",1015:"Scout",1016:"Paladin",1017:"Germanu jatnieki",1018:"battering ram",1019:"Katapulta",1020:"Galvenais",1021:"Kolonists",1022:"varonis",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Zibens Jatnieks",1027:"druids Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Kolonists",1033:"Hero"};
var lang_my={1:"Tentang",2:"Senarai Ladang",3:"The farmasi line",4:"Tetapan Permohonan",5:"giliran adalah bangunan tentera",6:"Pasukan kajian barisan ",7:"Keturunan pembinaan bangunan baru",8:"Barisan penambahbaikan bangunan",9:"The perobohan beratur",10:"Jumlah segala perintah",11:"Peningkatan baris tentera",12:"Pelupusan tentera",13:"The Notebook",14:"Pautan",15:"Pusat kampung",16:"Pelaksanaan cuti",17:"Laluan Perdagangan",18:"Penjualan dan pembelian SUMBER",19:"Permainan ini pada lelongan",20:"semua kampung-kampung SUMBER",21:"Tentera semua kampung-kampung",22:"Pergerakan tentera semua kampung-kampung",23:"Masuk",24:"Senarai Ladang",25:"The farmasi line",26:"The beratur memerintahkan tentera",27:"Pasukan kajian barisan ",28:"Peningkatan baris tentera",29:"Jumlah segala perintah",30:"Pelupusan tentera",31:"Gelombang",32:"Kampung",33:"semua kampung-kampung SUMBER",34:"Tentera semua kampung-kampung",35:"Pergerakan tentera semua kampung-kampung",36:"Pembinaan garis bangunan baru",37:"Barisan penambahbaikan bangunan",38:"The perobohan beratur",39:"Analisis",40:"Analisis perikatan serangan",41:"Laporan Analisis",42:"Hero",43:"secara automatik menghantar seorang wira pada usaha",44:"automatik mengepam wira dalam oasis",45:"Kebudayaan",46:"automatik memegang sambutan",47:"Perdagangan dan SUMBER",48:"automatik mengimbangi dengan bantuan SUMBER wira",49:"automatik mengimbangkan SUMBER di kampung-kampung dengan bantuan pedagang",50:"Laluan Perdagangan",51:"Membeli dan menjual SUMBER",52:"Lelong",53:"Permainan ini pada lelongan",54:"Membeli perkara yang betul",55:"Peta",56:"Mencari 15 dan 9",57:"Cari yang lemah dan tidak bersenjata",58:"Map of laluan perdagangan",59:"peta tersebut kuali",60:"Map of persekutuan",61:"Peta musuh-musuh",62:"Pembangunan",63:"Pembangunan automatik",64:"pencarian",65:"pembangunan automatik kampung-kampung baru",66:"Umum",67:"Notebook",68:"Tentang",69:"Tetapan Permohonan",70:"Masuk Permohonan",71:"Pautan",72:"Tengah Kampung",73:"Statistik",74:"Bilangan askar",75:"Tahap pembangunan SUMBER",76:"Statistik Online",77:"Kawalan",78:"The talian jadual",79:"Jadual aktiviti",80:"Menetapkan menghantar sms",81:"Kawalan melalui ICQ",82:"Hantar maklumat kepada pelayan penyelaras persekutuan",83:"Masuk ke pelayan penyelaras persekutuan",84:"Tentera",85:"Reset",86:"Clear",87:"Simpan",88:"OK",89:"Musnahkan kemudian",90:"Tetapan Permohonan",91:"Bahasa",92:"Bagi sebarang pertanyaan, sila",93:"Nama",94:"Pilih pada harga yang di bawah",95:"Membeli pada harga di bawah",96:"Pembelian * tidak dilaksanakan dan akan paling tidak mungkin:)",97:"salap",98:"Tatal",99:"Sangkar",100:"Run jQBot T4",101:"Perintah Kemudian",102:"Membina kemudian",103:"Untuk siasat kemudian",104:"Baru laluan perdagangan",105:"Untuk membuat laluan ke",106:"input koordinat",107:"OK",108:"Batal",109:"Nama",110:"Link",111:"Buka di tab semasa",112:"Buka di tab baru",113:"Stop",114:"Hantar terakhir dalam senarai",115:"+ semasa",116:"Set semula semua serangan sehingga masa sekarang",117:"Clear Queue Pharma",118:"Menjalankan kemudian",119:"Musnahkan kemudian",120:"Pautan Baru",121:"Jenis",122:"Pengukuhan",123:"Serangan biasa",124:"The Raid",125:"Frequency",126:"anjakan Sengaja",127:"Jenis serangan",128:"serangan",129:"2 Attack",130:"3 serangan",131:"5 serangan",132:"10 serangan",133:"15 serangan",134:"20 serangan",135:"25 serangan",136:"30 serangan",137:"40 serangan",138:"50 serangan",139:"75 serangan",140:"100 serangan",141:"Village",142:"Masa",143:"Tentera",144:"penjudi",145:"Pohon itu",146:"Tanah Liat",147:"Besi",148:"Grain",149:"Penghantar",150:"Penerima",151:"SUMBER",152:"Tempoh",153:"Hantar ke",154:"No",155:"Perintah jenis",156:"Pembinaan",157:"Level",158:"Rakyat",159:"Tempoh peristiwa pemasa",160:"Tempoh pengimbas",161:"Jumlah semua",162:"Perintah tentera jika terdapat bangunan",163:"Bangunan pada apa yang hilang SUMBER",164:"Membina semua mengikut keutamaan",165:"Radius Pharma",166:"mengambil untuk saat X",167:"The lencongan tentera",400:"Kilang Papan",401:"Kuari Tanah Liat",402:"Besi Mine",403:"Farm",404:"Kilang Papan",405:"tempat pembuatan batu bata",406:"Iron Works",407:"Tepung Mill",408:"Roti",409:"Gudang",410:"The Barn",411:"Kedai Senjata",412:"Forge Armor",413:"Arena",414:"Bangunan Utama",415:"Titik Perhimpunan",416:"Pasaran",417:"Kedutaan",418:"Berek ini",419:"Stabil",420:"Bengkel",421:"Akademi",422:"Rahsia",423:"Town Hall",424:"Residence",425:"Palace",426:"Perbendaharaan",427:"Dewan Perniagaan",428:"Berek Besar",429:"Kandang Kuda Besar",430:"Tembok Bandar",431:"Tembok Tanah",432:"Pagar",433:"tukang batu",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Gudang Besar",438:"Big Barn",439:"Wonder of the World",460:"Perintah tentera",461:"Satu kajian tentera",462:"Bangunan",463:"Improvement",464:"Pelaksanaan cuti",501:"Kawalan",502:"Pilihan",503:"Bantuan",504:"The Raid",505:"Pengukuhan",506:"Serangan biasa",507:"Orang-orang Rom",508:"Orang-orang Jerman",509:"Galla",600:"Data berjaya disimpan",601:"Tugas ini dibuat pemilik",602:"Semua permohonan semula tetapan",603:"Dipasang jejari baru",604:"A link baru",605:"Ditambah laluan baru",606:"Ralat",607:"Data dimasukkan ke dalam barisan",608:"itu kajian sudah dalam barisan",609:"Bangunan ini sudah berdiri sejajar untuk perobohan",610:"Peningkatan dan demikian juga dengan peringkat tertinggi",611:"Di sel yang diberikan adalah sesuatu yang membina",612:"Bangunan ini sedang dalam pembinaan di kampung ini",613:"Bangunan dan sebagainya akan mempunyai tahap tertinggi",614:"Komunikasi",615:"dicipta semula semua pharma",616:"Untuk memusnahkan apa-apa",617:"Auto-mengimbas semua kampung-kampung",618:"Hantar askar",619:"Pemusnahan bangunan",620:"Pembinaan bangunan",621:"Menghantar peniaga",622:"Tahap bangunan",623:"pautan luar",624:"Pautan",625:"masuk automatik kegagalan login",626:"Butang Pembangunan",627:"kampung ini sudah ada dalam senarai farmaseutikal",628:"Buang sepenuhnya dari lembaran ladang ",629:"kampung ini tersenarai dalam senarai farmasi",630:"Laman jQBot T4",631:"Tutup jQBot T4",632:"Reset Permohonan",633:"Hentikan acara pemasa berjalan",634:"Run acara pemasa berjalan",635:"Melihat pembolehubah GM",636:"Keluarkan GM pembolehubah",637:"langkah kuki Lihat dengan langkah",638:"Pemecatan kuki giliran berasaskan",639:"Lihat pembolehubah permohonan",640:"Masalah dengan loading minimap itu, matikan program yang bercanggah",641:"Cari",642:"Tetapan Search",643:"Radius",644:"Cari lengkap",645:"Oasis",646:"Lelong",647:"Kampung",648:"Run Denver 3",649:"Coordinates",650:"Kemaskini",651:"Tambah di kampung ladang Daun",652:"Hentikan serangan dengan kerugian di atas",653:"Perubahan disimpan",654:"Masuk",655:"kata kunci",656:"Menetapkan input automatik kegagalan login",700:"[3]-Hantar tentera",701:"[3] + Menghantar tentera",702:"[6] Menghantar peniaga",703:"[6] + Menghantar peniaga",704:"[1] pengekstrakan tentera",705:"[1] + Cabaran Tentera",706:"[4], merobohkan bangunan",707:"[4] + merobohkan bangunan",708:"[2] total semua",709:"[2] + Jumlah semua",710:"[5] Jumlah semua (bangunan)",711:"[5] + Jumlah semua (bangunan)",1001:"Legion",1002:"Pengawal Pertahanan",1003:"Imperian",1004:"Kuda pengakap",1005:"The berkuda maharaja",1006:"The berkuda dari Caesar",1007:"Taran",1008:"Api Tarbil",1009:"Senator",1010:"Peneroka",1011:"Hero",1012:"Askar Belantan",1013:"Askar Lembing",1014:"Axefighter",1015:"Pengakap",1016:"Kesatria Santo",1017:"berkuda Teutonik",1018:"lantak alat pemukul",1019:"Tarbil",1020:"Ketua itu",1021:"Peneroka",1022:"Hero",1023:"Falanks",1024:"pemain Lawan",1025:"Penjelajah",1026:"Guruh Theutates",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Pemimpin",1032:"Peneroka",1033:"Hero"};
var lang_no={1:"Om",2:"Farm List",3:"Den linjen apotek",4:"Application Settings",5:"Koen bygger tropper",6:"Koen studien tropper",7:"Den linjen av bygging av nye bygninger",8:"Den linjen forbedringer av bygninger",9:"Koen riving",10:"Summen av alle bestillinger",11:"Den linjen forbedringer tropper",12:"Deponering av tropper",13:"The Notebook",14:"Nyttige lenker",15:"The sentrum",16:"Implementering av helligdager",17:"Trade Ruter",18:"The salg og kjop RESSURSER",19:"Spillet er pa auksjon",20:"alle landsbyene RESSURSER",21:"Army of alle landsbyene",22:"transport av tropper av alle landsbyene",23:"Logg",24:"Farm List",25:"Den linjen apotek",26:"Koen bestilling tropper",27:"Koen studien tropper",28:"Den linjen forbedringer tropper",29:"Summen av alle bestillinger",30:"Deponering av tropper",31:"Waves",32:"Villages",33:"alle landsbyene RESSURSER",34:"Army of alle landsbyene",35:"transport av tropper av alle landsbyene",36:"Den linjen bygging av nye bygninger",37:"Den linjen forbedringer av bygninger",38:"Koen riving",39:"Analyse",40:"Analyse av angrep allianse",41:"Analysis Report",42:"Hero",43:"Automatisk sende en helt pa soken",44:"Automatisk pumping av helten i oasene",45:"Kultur",46:"Automatisk holde feiringen",47:"Handel og ressurser",48:"auto-balansering med hjelp av helten RESSURSER",49:"auto-balansere ressurser i landsbyer ved hjelp av kjopmenn",50:"Trade Ruter",51:"Kjop og salg av ressurser",52:"Auksjon",53:"Spillet er pa auksjon",54:"Kjope de riktige tingene",55:"Kart",56:"Finne 15 og 9",57:"Finn de svake og forsvarslose",58:"Kart over handelsruter",59:"The map panner",60:"Kart av alliansen",61:"Map of fiender",62:"Utvikling",63:"Automatisk Development",64:"quests",65:"Automatisk utvikling av nye landsbyer",66:"Generelt",67:"Notebook",68:"Om",69:"Application Settings",70:"Logg Application",71:"Nyttige lenker",72:"Central Village",73:"Statistikk",74:"Antall soldater",75:"Nivaet pa utvikling RESSURSER",76:"Statistikk Online",77:"Control",78:"Den planen online",79:"Den timeplan med aktivitet",80:"Stille sende sms",81:"Control via ICQ",82:"Send informasjonen til serveren samordne alliansen",83:"Logg pa serveren samordne alliansen",84:"Army",85:"Reset",86:"Clear",87:"Lagre",88:"OK",89:"Destroy senere",90:"Application Settings",91:"Sprak",92:"For eventuelle sporsmal, please",93:"Navn",94:"Velg til en pris under",95:"Innkjop til en pris under",96:"* Innkjop ikke er implementert og vil mest sannsynlig ikke:)",97:"salve",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Bestill Senere",102:"Build senere",103:"For a undersoke senere",104:"New handel rute",105:"For a opprette en rute til",106:"input koordinater",107:"OK",108:"Avbryt",109:"Navn",110:"Link",111:"Apne i nav?rende fane",112:"Apne i ny fane",113:"Stop",114:"Send den siste pa listen",115:"+ nav?rende",116:"Nullstill alle angrep til det nav?rende tidspunkt",117:"Clear Queue Pharma",118:"Gjennomfore senere",119:"Destroy senere",120:"New Links",121:"Type",122:"Armering",123:"Den vanlige angrep",124:"The Raid",125:"Frequency",126:"Accidental displacement",127:"Den type angrep",128:"et angrep",129:"2 Attack",130:"3 angrep",131:"5 angrep",132:"10 angrep",133:"15 angrep",134:"20 angrep",135:"25 angrep",136:"30 angrep",137:"40 angrep",138:"50 angrep",139:"75 angrep",140:"100 angrep",141:"The Village",142:"Time",143:"H?ren",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Korn",149:"Sender",150:"Mottaker",151:"RESSURSER",152:"Periode",153:"Send til",154:"Nei.",155:"Order type",156:"Konstruksjon",157:"Level",158:"The People",159:"Den perioden timer hendelser",160:"Den periode av skanneren",161:"Summen av alle",162:"Bestill h?ren hvis det er en bygning",163:"Building pa hva som mangler ressurser",164:"Building alle i prioritert rekkefolge",165:"Radius Pharma",166:"take away for X sekunder",167:"Den avledning av tropper",400:"Sagbruk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Sagbruk",405:"Brickyard",406:"Iron Works",407:"Flour Mill",408:"Bakeri",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor ",413:"Arena",414:"Main Building",415:"Moteplass",416:"Market",417:"The Embassy",418:"The Barracks",419:"Stabil",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"The Chamber of Commerce",428:"Great Barracks",429:"Great Stabil",430:"City Walls",431:"Earth Wall",432:"Fence",433:"Stonemason",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Bestill troppene",461:"En studie av tropper",462:"Building",463:"Improvement",464:"Gjennomforing av helligdager",501:"Control",502:"Alternativer",503:"Hjelp",504:"The Raid",505:"Armering",506:"Den vanlige angrep",507:"Romerne",508:"Tyskerne",509:"Galla",600:"Data lagret",601:"Oppgaven er laget eieren",602:"Alle programinnstillinger reset",603:"Installerte nye radius",604:"En ny link",605:"Lagt til en ny rute",606:"Feil",607:"The data lagt til koen",608:"En slik studie er allerede i koen",609:"Denne bygningen star allerede i ko for riving",610:"Forbedring og sa har det hoyeste niva",611:"I en gitt celle er bygge noe",612:"Denne bygningen er under oppforing i denne landsbyen",613:"Den bygningen og sa vil ha hoyeste niva",614:"Kommunikasjon",615:"gjenskapt alle pharma",616:"A odelegge er ingenting",617:"Auto-skanning av alle landsbyene",618:"Send soldater",619:"Den odeleggelse av bygninger",620:"The oppforing av bygninger",621:"Sending forhandlere",622:"Levels av bygninger",623:"Eksterne lenker",624:"Quick Links",625:"Automatisk oppforing av logg failure",626:"Knapper Development",627:"Denne landsbyen er allerede i den farmasoytiske liste",628:"Fjern fullstendig fra garden arket ",629:"Landsbyen er oppfort i den farmasoytiske liste",630:"Page jQBot T4",631:"Lukk jQBot T4",632:"Reset Application",633:"Stopp kjore timer hendelser",634:"Run kjore timer hendelser",635:"Vise variabler GM",636:"Fjern de variablene GM",637:"Vis Cookie er trinnvis",638:"Fjerning av Cookie tur-basert",639:"Vis soknad variabler",640:"Problemer med lasting av minimap, slar de motstridende programmet",641:"Sok",642:"Sok Settings",643:"Radius",644:"Sok ferdig",645:"Oasis",646:"Auksjon",647:"Villages",648:"Run Denver 3",649:"Koordinater",650:"Update",651:"Legg i garden landsbyen Leaf",652:"Stopp angrepene med tap over",653:"Endringer frelst",654:"Logg inn",655:"password",656:"Innstilling av automatisk input av en logg feil",700:"[3]-Send soldater",701:"[3] + Sender tropper",702:"[6] Sending forhandlere",703:"[6] + Sending forhandlere",704:"[1] Utvinning av h?ren",705:"[1] + Challenge Army",706:"[4], rive bygningen",707:"[4] + rive bygningen",708:"[2] Summen av alle",709:"[2] + Total av alle",710:"[5] Summen av alle (bygning)",711:"[5] + Total av alle (bygning)",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"Horse speider",1005:"The kavaleri av keiseren",1006:"The kavaleri Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Nybygger",1011:"Hero",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Teutonic kavaleri",1018:"rambukk",1019:"Catapult",1020:"The Chief",1021:"Nybygger",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Nybygger",1033:"Hero"};
var lang_pk={1:"???? ???",2:"???? ?? ?????",3:"???? ???????",4:"??????? ?? ???????",5:"???? ?????? ?? ????? ??",6:"???? ?? ?????? ??????",7:"??? ??????? ?? ????? ?? ????",8:"??????? ?? ???? ??? ?????",9:"???? ?????",10:"???? ??????? ?? ??",11:"???? ????? ??????",12:"?????? ?? ????",13:"??? ??",14:"?????? ??? ?????",15:"???? ?? ????",16:"??????? ?? ???",17:"?????? ??????",18:"????? ??? ???? ?????",19:"???? ?? ?????? ?? ??",20:"???? ???? ?????",21:"???? ???? ?? ???",22:"???? ???? ?? ?????? ?? ???????",23:"??? ??",24:"???? ?? ?????",25:"???? ???????",26:"??? ?? ???? ??????",27:"???? ?? ?????? ??????",28:"???? ????? ??????",29:"???? ??????? ?? ??",30:"?????? ?? ????",31:"?????",32:"????",33:"???? ???? ?????",34:"???? ???? ?? ???",35:"???? ???? ?? ?????? ?? ???????",36:"??? ??????? ?? ???? ?? ?????",37:"??????? ?? ???? ??? ?????",38:"???? ?????",39:"?????",40:"????? ?? ????? ?? ?????",41:"????? ?????",42:"????",43:"???? ?? ??? ???? ??? ???? ????",44:"oases ??? ???? ?? ????? ??????",45:"?????",46:"?????? ?????? ???",47:"???? ??? ?????",48:"???? ????? ?? ??? ?? ??? ?????",49:"?????? ?? ??? ?? ???? ??? ??? ????? ?????",50:"?????? ??????",51:"???? ? ????? ?????",52:"??????",53:"???? ?? ?????? ?? ??",54:"?? ????? ??????",55:"????",56:"15 ??? 9 ?? ????",57:"????? ??? ?????? ???? ????",58:"?????? ?????? ?? ????",59:"???? ??????",60:"????? ?? ????",61:"???? ?? ????",62:"????",63:"?????? ????",64:"quests",65:"??? ????? ?? ??? ??? ????? ?? ????",66:"?????",67:"??? ??",68:"???? ???",69:"??????? ?? ???????",70:"??? ?? ?? ???????",71:"?????? ??? ?????",72:"????? ????",73:"???????",74:"?????? ?? ?????",75:"???? ?? ????? ?? ???",76:"????? ? ???? ???? ??? ? ??????",77:"??????",78:"????? ?? ????",79:"?????? ?? ?????",80:"?????? ??? ??? ??? ?????",81:"ICQ ?? ????? ??????",82:"???? ?? ??????? ?? ????? ?? ???? ??????",83:"????? ?? ???? ???? ?? ??? ??",84:"????",85:"?? ??? ?? ???",86:"???",87:"????? ????",88:"OK",89:"??? ??? ???? ?? ???",90:"??????? ?? ???????",91:"????",92:"???? ?????? ????? ? ???? ???????",93:"???",94:"??? ??? ??? ??? ???? ?? ????? ????",95:"??? ???? ?? ??? ??? ????",96:"* ?????? ?? ???????? ???? ?? ??? ?? ??? ?? ?? ????? ???? ???? ?? ????? ?? :)",97:"????",98:"??????",99:"???",100:"jQBot T4 ??????",101:"??? ??? ????",102:"??? ??? ???? ???? ?? ???.",103:"??? ??? ??????? ?? ???",104:"??? ?????? ?????",105:"???? ?? ??? ??? ????? ????? ?? ???",106:"?? ?? ????",107:"OK",108:"????? ????",109:"???",110:"???",111:"?????? ??? ??? ??????",112:"??? ??? ??? ??????",113:"?????",114:"?? ????? ??? ???? ??????",115:"?????? +",116:"?????? ??? ?? ???? ????? ?? ?????? ???? ????",117:"??? ???? ?????",118:"??? ??? ????",119:"??? ??? ???? ?? ???",120:"??? ?????",121:"???",122:"????????",123:"????? ?? ????",124:"????",125:"?????????",126:"??????? ?? ???",127:"???? ?? ???",128:"????",129:"2 ????",130:"3 ?????",131:"5 ?????",132:"10 ?????",133:"15 ?????",134:"20 ?????",135:"25 ?????",136:"30 ?????",137:"40 ?????",138:"50 ?????",139:"75 ?????",140:"100 ????",141:"????",142:"???",143:"???",144:"?????",145:"????",146:"???",147:"????",148:"?????",149:"????",150:"????",151:"?????",152:"???",153:"??????",154:"????.",155:"???? ????",156:"???????",157:"????",158:"???",159:"????? ?? ?????? ?? ???",160:"?????? ?? ???",161:"?? ?? ??",162:"??? ???? ??? ???? ??? ????? ??",163:"?? ????? ????? ???? ?? ?? ?????",164:"????? ?? ????? ??? ?? ?????",165:"???? ?????",166:"X ????? ?? ??? ??",167:"?????? ?? ??????",400:"Sawmill",401:"??? ??",402:"???? ????",403:"????",404:"Sawmill",405:"Brickyard",406:"???? ????",407:"???? ??",408:"?????",409:"????",410:"????",411:"?????",412:"???? ???",413:"????",414:"????? ?????",415:"???? ??????",416:"??????",417:"?????????",418:"??????",419:"??????",420:"??????",421:"??????",422:"????",423:"???? ???",424:"?????",425:"???",426:"?????",427:"????? ?? ?????",428:"???? ??????",429:"???? ??????",430:"??? ????",431:"??? ???? ?? ?????",432:"???",433:"???????",434:"Brewery",435:"Trapper",436:"????",437:"???? ???????",438:"?? ????",439:"???? ?? ??? ????",460:"?????? ????",461:"?????? ?? ??? ??????",462:"?????",463:"?????",464:"??????? ?? ???",501:"??????",502:"????????",503:"???",504:"????",505:"????????",506:"????? ?? ????",507:"??????",508:"????",509:"Galla",600:"???? ??????? ?? ?????",601:"??? ?? ???? ??? ??? ??",602:"???? ??????? ?? ??????? ?? ???",603:"???? ??? ????",604:"??? ??? ???",605:"??? ??? ????? ???? ?? ??? ???",606:"?????",607:"????? ? ???? ???? ??? ????",608:"?? ??? ?? ??? ?????? ???? ??? ???? ?? ?? ??",609:"?? ????? ???? ?? ????? ???? ?? ??? ???? ??? ???? ??",610:"?? ???? ????? ??? ???? ????? ?? ????? ???? ??",611:"??? ?? ??? ??? ??? ?? ??? ????? ?? ??? ??",612:"?? ????? ?? ???? ??? ??? ????? ??",613:"????? ??? ?? ?? ?? ????? ??? ?? ?? ??",614:"???????",615:"???? ????? recreated",616:"?? ???? ???? ?? ???? ??? ???? ??",617:"???? ???? ?? ??? ????",618:"?????? ??????",619:"??????? ?? ?????",620:"??????? ?? ?????",621:"?????? ????? ?? ??? ??",622:"??????? ?? ???",623:"?????? ?????",624:"???? ?????",625:"??? ?? ?? ?????? ?? ??? ??? ????? ?? ??????",626:"??? ????",627:"?? ???? ???? ?? ??????? ?? ????? ??? ??",628:"???? ??? ?? ???? ??? ?? ??? ????",629:"???? ??????? ?? ????? ??? ??? ??",630:"???? jQBot T4",631:"??? jQBot T4",632:"?? ??? ???????",633:"????? ?? ????? ?? ?????? ??? ???",634:"????? ?? ????? ?????? ??????",635:"??????? ????? GM",636:"????? GM ??? ???",637:"??? ?? ??? ?? ?????? ?? ???? ???",638:"?? ???? ???? ?? ????? ?? ?? ??????",639:"??????? ????? ??????",640:"minimap ????? ?? ???? ????? ? ??? ?????? ??????? ??? ?? ???",641:"????",642:"???? ???????",643:"????",644:"???? ????",645:"???????",646:"??????",647:"????",648:"?????? 3 ?????",649:"?????????",650:"?? ???",651:"??? ?? ???? ?? ???? ??? ???? ????",652:"?? ?????? ???? ??????? ?? ???? ????? ?? ????",653:"???????? ?????",654:"??? ??",655:"??? ???",656:"??? ?? ?? ?????? ?? ??? ??? ????? ?? ?? ?? ?? ?????",700:"[3] ?????? ?? ??????",701:"[3] + ?????? ??????",702:"[6] ?????? ??????",703:"[6] + ?????? ??????",704:"[1] ??? ?? ?????",705:"[1] + ????? ???",706:"[4] ? ????? ????",707:"[4] + ????? ????",708:"[2] ???? ?? ??",709:"?? ?? [2] ?? +",710:"[5] ???? (?????) ?? ??",711:"[5] ???? (?????) ?? + ??",1001:"Legionnaire",1002:"Praetorian",1003:"Imperian",1004:"???? ?????",1005:"?????? ?? ??????",1006:"???? ?? ??????",1007:"???",1008:"?? ????",1009:"??????",1010:"???????",1011:"????",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"?????",1016:"Paladin",1017:"Teutonic ??????",1018:"battering ???",1019:"????",1020:"????",1021:"???????",1022:"????",1023:"????",1024:"?????????",1025:"Pathfinder",1026:"Theutates ?????",1027:"????? ?????",1028:"Haeduan",1029:"???",1030:"??????",1031:"?????",1032:"???????",1033:"????"};
var lang_pl={1:"O",2:"Lista Farm",3:"Apteka line",4:"Ustawienia aplikacji",5:"W kolejce jest budowanie wojska",6:"Zolnierze badania kolejki",7:"Linia budowe nowych budynkow",8:"Poprawa linii zabudowy",9:"Rozbiorka kolejki",10:"Suma wszystkich zlecen",11:"Zolnierze poprawe line",12:"Likwidacja wojska",13:"The Notebook",14:"Przydatne linki",15:"centrum wsi",16:"Realizacja wakacje",17:"Trasy Trade",18:"kupna-sprzedazy zasobow",19:"Gra jest na aukcji",20:"wszystkie wioski ZASOBY",21:"Armia wszystkich wsiach",22:"Ruchy wojsk wszystkich wsiach",23:"Log",24:"Lista Farm",25:"Apteka line",26:"W kolejce zamowienia wojska",27:"Zolnierze badania kolejki",28:"Zolnierze poprawe line",29:"Suma wszystkich zlecen",30:"Likwidacja wojska",31:"Waves",32:"Osady",33:"wszystkie wioski ZASOBY",34:"Armia wszystkich wsiach",35:"Ruchy wojsk wszystkich wsiach",36:"Budowa linii nowych budynkow",37:"Poprawa linii zabudowy",38:"Rozbiorka kolejki",39:"Analiza",40:"Analiza sojuszu ataki",41:"Raport z analizy",42:"Hero",43:"Automatycznie wysyla bohatera na poszukiwanie",44:"Automatyczne pompowanie bohatera w oazach",45:"Kultura",46:"Automatic uroczystosci gospodarstwo",47:"Handel i zasoby",48:"auto-balancing z wykorzystaniem srodkow bohatera",49:"auto-balancing zasobow wsi przy pomocy kupcow",50:"Trasy Trade",51:"Kupno i sprzedaz zasobow",52:"Aukcja",53:"Gra jest na aukcji",54:"Zakup wlasciwe rzeczy",55:"Mapa",56:"Znalezienie 15 i 9",57:"Znajdz slabych i bezbronnych",58:"Mapa szlakow handlowych",59:"Mapa bratki",60:"Mapa sojuszu",61:"Mapa wrogow",62:"Rozwoj",63:"Automatic rozwoju",64:"zadania",65:"Automatic rozwoju nowych wsi",66:"General",67:"Notebook",68:"O",69:"Ustawienia aplikacji",70:"Application Log",71:"Przydatne linki",72:"Village Central",73:"Statystyka",74:"liczby zolnierzy",75:"Poziom rozwoju zasobow",76:"Statystyki Online",77:"Control",78:"on-line harmonogram",79:"Plan dzialania",80:"Ustawienia wysylania sms",81:"Sterowanie przez ICQ",82:"Wyslij informacje do serwera koordynacje sojuszu",83:"Logowanie do serwera koordynacje sojuszu",84:"Armia",85:"Reset",86:"Wyczysc",87:"Zapisz",88:"OK",89:"Zburzcie pozniej",90:"Ustawienia aplikacji",91:"Jezyk",92:"W przypadku jakichkolwiek pytan, prosze",93:"Nazwa",94:"Wybierz po cenie nizszej",95:"Zakup po cenie nizszej",96:"Zakup * nie jest realizowany i najprawdopodobniej nie:)",97:"Masc",98:"Scroll",99:"Klatka",100:"Run jQBot T4",101:"Zamowienie pozniej",102:"Build pozniej",103:"W celu zbadania pozniej",104:"Nowy szlak handlowy",105:"Aby utworzyc trase do",106:"wspolrzedne wejscia",107:"OK",108:"Anuluj",109:"Nazwa",110:"Link",111:"Otworz w biezacej karty",112:"Otworz w nowej karcie",113:"Stop",114:"Wyslij ostatni na liscie",115:"+ prad",116:"Reset wszystkie ataki do chwili obecnej",117:"Clear Queue Pharma",118:"Przeprowadzenie pozniej",119:"Zburzcie pozniej",120:"Nowe strony",121:"Typ",122:"Wzmocnienie",123:"Zazwyczaj atak",124:"Raid",125:"Czestotliwosc",126:"Postepowanie w przypadku przemieszczenia",127:"Ten typ ataku",128:"atak",129:"2 Attack",130:"3 ataki",131:"5 atakow",132:"10 atakow",133:"15 atakow",134:"20 atakow",135:"25 atakow",136:"30 atakow",137:"40 atakow",138:"50 atakow",139:"75 atakow",140:"100 attack",141:"The Village",142:"Time",143:"Armia",144:"Gambler",145:"Drzewo",146:"Clay",147:"Iron",148:"Grain",149:"Nadawca",150:"Odbiorca",151:"zasoby",152:"Okres",153:"Wyslij do",154:"Nie",155:"Typ zlecenia",156:"Budownictwo",157:"Poziom",158:"The People",159:"Okres zdarzenia timer",160:"Okres od skanera",161:"Suma wszystkich",162:"Zamowienie armii, jesli znajduje sie budynek",163:"W oparciu o to, czego brakuje zasobow",164:"Budowanie wszystkie w kolejnosci",165:"Promien Pharma",166:"zabrac na X sekund",167:"kierowania zolnierzy",400:"Tartak",401:"Pit Clay",402:"Kopalnia zelaza",403:"The Farm",404:"Tartak",405:"Cegielnia",406:"Iron Works",407:"mlyn",408:"Piekarnia",409:"Warehouse",410:"The Barn",411:"Kowal",412:"Armor Forge",413:"Arena",414:"Gmach",415:"Rally Point",416:"Rynek",417:"Ambasada",418:"Koszary",419:"Stabilna",420:"Warsztaty",421:"The Academy",422:"Secret",423:"Ratusz",424:"Residence",425:"Palac",426:"Skarb",427:"The Chamber of Commerce",428:"Duze koszary",429:"Duza stajnia",430:"Mury miasta",431:"Ziemia Wall",432:"Ogrodzenia",433:"Kamieniarz",434:"Browar",435:"Traper",436:"Tawerna",437:"Duzy magazyn",438:"Big Spichlerz",439:"Cud Swiata",460:"Zamowienie wojska",461:"Badanie zolnierzy",462:"Budynek",463:"Wzrost",464:"Implementacja na swieta",501:"Control",502:"Opcje",503:"Pomoc",504:"Raid",505:"Wzmocnienie",506:"Zazwyczaj atak",507:"Romans",508:"Niemcy",509:"Galla",600:"Dane zostaly zapisane",601:"Zadanie staje sie wlascicielem",602:"Wszystkie zresetowac ustawienia aplikacji",603:"Zainstalowany nowy promien",604:"nowe polaczenie",605:"Dodano nowa trase",606:"Error",607:"Dane dodane do kolejki",608:"Takie badanie jest juz w kolejce",609:"Ten budynek juz stoi w kolejce do rozbiorki",610:"Poprawianie i tak ma najwyzszy poziom",611:"W danej komorce jest zbudowac cos",612:"Ten budynek jest w budowie w tej wsi",613:"Budynek i tak bedzie na najwyzszym poziomie",614:"Komunikacja",615:"odtworzone wszystkie pharma",616:"Aby zniszczyc to nic",617:"Auto-skanowanie wszystkich wsiach",618:"Wyslij wojska",619:"zniszczenie budynkow",620:"Budowa budynkow",621:"Wysylanie dealerow",622:"Poziomy budynkow",623:"Linki zewnetrzne",624:"Quick Links",625:"automatyczne wprowadzanie login failure",626:"Rozwoj Buttons",627:"Ta wies jest juz w przemysle farmaceutycznym list",628:"Usun calkowicie z arkusza gospodarstwa",629:"Wies jest wymieniony w liscie farmaceutycznych",630:"Strona jQBot T4",631:"Zamknij jQBot T4",632:"Zastosowanie Reset",633:"Stop zdarzenia timer run",634:"Run zdarzenia timer run",635:"Przedstawiamy zmiennych GM",636:"Zdejmij zmiennych GM",637:"Cookie Zobacz krok po kroku",638:"Usuniecie Cookie turowa",639:"Zobacz zmienne aplikacji",640:"Problemy z zaladowaniem minimapie, wylaczyc program lub programy",641:"Szukaj",642:"Ustawienia wyszukiwania",643:"Promien",644:"Search kompletna",645:"Oasis",646:"Aukcja",647:"Osady",648:"Run Denver 3",649:"Wspolrzedne",650:"Update",651:"Dodaj na wies Leaf",652:"Stop ataki ze stratami powyzej",653:"Zmiany zapisane",654:"Logowanie",655:"haslo",656:"Ustawianie automatyczne wprowadzanie awarii login",700:"[3] Wyslij wojska",701:"[3] + Wysylanie wojska",702:"[6] dealerow Wysylanie",703:"[6] + dealerow Wysylanie",704:"[1] Wydobycie armii",705:"[1] + Wyzwanie Armia",706:"[4], zburzyc budynek",707:"[4] + zburzyc budynek",708:"[2] Suma wszystkich",709:"[2] + Suma wszystkich",710:"[5] Suma wszystkich (budynek)",711:"[5] Wszystkich + wszystkich (budynek)",1001:"Legionnaire",1002:"pretorianow",1003:"Imperian",1004:"harcerz Horse",1005:"Kawaleria cesarza",1006:"kawalerii Cezara",1007:"Taran",1008:"Catapult Fire",1009:"Senator",1010:"Osadnik",1011:"Hero",1012:"Palkarz",1013:"Spearmana",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Krzyzakow kawalerii",1018:"taran",1019:"Katapulta",1020:"Szef",1021:"Osadnik",1022:"Hero",1023:"Phalanx",1024:"Szermierz",1025:"Pathfinder",1026:"Thunder Theutates",1027:"Rider Druid",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Osadnik",1033:"Hero"};
var lang_pt={1:"About",2:"Lista Farm",3:"A linha de farmacia",4:"Configuracoes do aplicativo",5:"A fila esta construindo tropas",6:"As tropas estudo fila ",7:"A linha de construcao de novos edificios",8:"As melhorias linha de edificios",9:"A fila de demolicao",10:"O total de todas as ordens",11:"As tropas melhorias line",12:"Eliminacao de tropas",13:"The Notebook",14:"Links Uteis",15:"O centro da aldeia",16:"Implementacao das ferias",17:"Rotas de Comercio",18:"Os recursos de compra e venda",19:"O jogo esta em leilao",20:"todas as aldeias RECURSOS",21:"Exercito de todas as aldeias",22:"Movimentos de tropas de todas as aldeias",23:"Log",24:"Lista Farm",25:"A linha de farmacia",26:"A fila de pedidos tropas",27:"As tropas estudo fila ",28:"As tropas melhorias line",29:"O total de todas as ordens",30:"Eliminacao de tropas",31:"Waves",32:"Aldeias",33:"todas as aldeias RECURSOS",34:"Exercito de todas as aldeias",35:"Movimentos de tropas de todas as aldeias",36:"A linha de construcao de novos edificios",37:"As melhorias linha de edificios",38:"A demolicao da fila",39:"Analise",40:"Analise de alianca ataques",41:"Relatorio de Analise",42:"Hero",43:"Automaticamente envie um heroi na busca",44:"Automatic bombeamento do heroi no oasis",45:"Cultura",46:"Automatic celebracoes holding",47:"Comercio e RECURSOS",48:"auto-equilibrio com a ajuda dos recursos heroi",49:"auto-equilibrio RECURSOS nas aldeias com a ajuda de comerciantes",50:"Rotas de Comercio",51:"Compra e venda RECURSOS",52:"Leilao",53:"O jogo esta em leilao",54:"Comprar as coisas certas",55:"Map",56:"Finding 15 e 9",57:"Encontre os fracos e indefesos",58:"Mapa de rotas de comercio",59:"O mapa panelas",60:"Mapa da alianca",61:"Mapa de inimigos",62:"Desenvolvimento",63:"Desenvolvimento Automatic",64:"quests",65:"desenvolvimento automatico de novas aldeias",66:"Geral",67:"Notebook",68:"Sobre",69:"Configuracoes do aplicativo",70:"Application Log",71:"Links Uteis",72:"Village Central",73:"Estatisticas",74:"O numero de tropas",75:"O nivel de desenvolvimento de recursos",76:"Estatisticas Online",77:"Control",78:"A agenda on-line",79:"O calendario de atividade",80:"Configurando o envio de sms",81:"Controle via ICQ",82:"Envie as informacoes para o servidor coordenacao da alianca",83:"Faca logon no servidor de coordenacao da alianca",84:"Exercito",85:"Reset",86:"Clear",87:"Salvar",88:"OK",89:"Destruir depois",90:"Configuracoes do aplicativo",91:"Lingua",92:"Para qualquer duvida, por favor",93:"Nome",94:"Select a um preco inferior",95:"Compra a um preco inferior",96:"Compras * nao e implementado e provavelmente nao:)",97:"Pomada",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordem mais tarde",102:"Build mais tarde",103:"Para investigar mais tarde",104:"Nova rota de comercio",105:"Para criar uma rota para",106:"coordenadas de entrada",107:"OK",108:"Cancelar",109:"Nome",110:"Link",111:"Abrir em guia atual",112:"Abrir em nova aba",113:"Stop",114:"Enviar o ultimo da lista",115:"+ atual",116:"Reset todos os ataques ate que o tempo atual",117:"Clear Queue Pharma",118:"Realizar mais tarde",119:"Destruir depois",120:"Links Nova",121:"Type",122:"Reforco",123:"O ataque do usual",124:"O Raid",125:"Frequency",126:"deslocamento acidental",127:"O tipo de ataque",128:"um ataque",129:"2 Attack",130:"3 ataques",131:"5 ataques",132:"10 ataques",133:"15 ataques",134:"20 ataques",135:"25 ataques",136:"30 ataques",137:"40 ataques",138:"50 ataques",139:"75 ataques",140:"ataque 100",141:"A Vila",142:"Time",143:"O exercito",144:"Gambler",145:"A Arvore",146:"Clay",147:"Iron",148:"Grain",149:"Remetente",150:"Receiver",151:"RECURSOS",152:"Periodo",153:"Enviar para",154:"Nao.",155:"Tipo de Ordem",156:"Construcao",157:"Nivel",158:"O Povo",159:"O periodo de eventos timer",160:"O periodo do scanner",161:"O total de todos",162:"Ordem do exercito se existe um edificio",163:"Com base no que esta faltando RECURSOS",164:"Construir tudo em ordem de prioridade",165:"Raio Pharma",166:"tirar por alguns segundos X",167:"O desvio de tropas",400:"Serraria",401:"Pit Clay",402:"Mina de Ferro",403:"A Fazenda",404:"Serraria",405:"Brickyard",406:"Iron Works",407:"moinho de farinha",408:"Padaria",409:"Armazem",410:"O Celeiro",411:"Blacksmith",412:"Armor Forge ",413:"Arena",414:"Edificio Principal",415:"Rally Point",416:"Mercado",417:"A Embaixada",418:"O Quartel",419:"Estavel",420:"Workshop",421:"A Academia",422:"O Segredo",423:"Camara Municipal",424:"Residence",425:"O Palacio",426:"Tesouro",427:"A Camara de Comercio",428:"Grande Quartel",429:"Estavel Grande",430:"Muralhas da Cidade",431:"Earth Wall",432:"Fence",433:"Pedreiro",434:"O Brewery",435:"Trapper",436:"Tavern",437:"Grande Armazem",438:"Big Barn",439:"Maravilha do Mundo",460:"Ordem das tropas",461:"Um estudo de tropas",462:"Construir",463:"Melhoria",464:"Implementacao das ferias",501:"Control",502:"Opcoes",503:"Help",504:"O Raid",505:"Reforco",506:"O ataque usual",507:"Os romanos",508:"Os alemaes",509:"Galla",600:"Dados salvos com sucesso",601:"A tarefa e feita com o proprietario",602:"Todos os aplicativos redefinir as configuracoes",603:"Raio Instalado novo",604:"link Um novo",605:"Foi adicionada uma nova rota",606:"Erro",607:"Os dados adicionados a fila",608:"Esse estudo ja esta na fila",609:"Este edificio ja esta na fila para a demolicao",610:"Melhoria e por isso tem o mais alto nivel",611:"Em uma determinada celula e construir algo",612:"Este predio esta em construcao nesta vila",613:"A construcao e assim tera mais alto nivel",614:"Comunicacao",615:"recriados todos os pharma",616:"Para destruir e nada",617:"Auto-varredura de todas as aldeias",618:"Enviar tropas",619:"A destruicao de edificios",620:"A construcao de edificios",621:"O envio de negociantes",622:"Niveis de edificios",623:"Ligacoes externas",624:"Quick Links",625:"a entrada automatica de falha de login",626:"Desenvolvimento Buttons",627:"Esta vila ja esta na lista de produtos farmaceuticos",628:"Remover completamente a partir da folha de fazenda",629:"A aldeia esta listado na lista de produtos farmaceuticos",630:"Page jQBot T4",631:"Close jQBot T4",632:"Aplicacao Reset",633:"Parar a eventos de timer run",634:"Run eventos timer run",635:"variaveis ??Vendo GM",636:"Remova a GM variaveis",637:"Veja o passo a passo Cookie",638:"A remocao de cookies do turn-based",639:"Ver as variaveis ??de aplicativo",640:"Problemas com o carregamento do minimap, desligue o programa em conflito",641:"Search",642:"Configuracoes de pesquisa",643:"Raio",644:"Pesquisa completa",645:"Oasis",646:"Leilao",647:"Aldeias",648:"Run Denver 3",649:"Coordinates",650:"Update",651:"Adicionar na aldeia de fazenda de Leaf",652:"Parem os ataques com perdas acima",653:"Alteracoes salvas",654:"Login",655:"password",656:"Definir a entrada automatica de falha de login",700:"[3]-Enviar tropas",701:"[3] + Enviar tropas",702:"[6] O envio de negociantes",703:"[6] + negociantes de envio",704:"[1] A extracao do exercito",705:"[1] + Desafio do Exercito",706:"[4], demolir o predio",707:"[4] + demolir o predio",708:"[2] O total de todos",709:"[2] Total + de todos",710:"[5] O total de todos (construcao)",711:"[5] + Total de todos (construcao)",1001:"Legionario",1002:"pretoriana",1003:"Imperiano",1004:"scout Cavalo",1005:"A cavalaria do imperador",1006:"A cavalaria de Cesar",1007:"Taran",1008:"Catapulta de Fogo",1009:"O senador",1010:"colono",1011:"Hero",1012:"Salteador",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalaria teutonica",1018:"ariete",1019:"Catapult",1020:"O Chefe",1021:"colono",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Thunder Theutate",1027:"Rider Druid",1028:"Haeduano",1029:"Taran",1030:"Trebuchet",1031:"Lider",1032:"colono",1033:"Hero"};
var lang_ro={1:"Despre",2:"Lista agricole",3:"Linia farmacie",4:"Setari aplicatie",5:"coada este construirea trupele",6:"Trupele coada de studiu",7:"Linia de construirea de cladiri noi",8:"imbunatatiri linie de cladiri",9:"demolare coada",10:"totala a tuturor ordinelor",11:"imbunatatiri Linia trupe",12:"Eliminarea de trupe",13:"The Notebook",14:"Linkuri utile",15:"centrul satului",16:"Punerea in aplicare a sarbatori",17:"rute comerciale",18:"RESURSE vanzare si cumparare",19:"Jocul este la licitatie",20:"toate satele RESURSE",21:"Armata din toate satele",22:"Circulatia a trupelor din toate satele",23:"Jurnal",24:"Lista agricole",25:"Linia farmacie",26:"coada de comanda trupele",27:"Trupele coada de studiu",28:"imbunatatiri Linia trupe",29:"totala a tuturor ordinelor",30:"Eliminarea de trupe",31:"Waves",32:"Sate",33:"toate satele RESURSE",34:"Armata din toate satele",35:"Circulatia a trupelor din toate satele",36:"Linia de constructie de cladiri noi",37:"imbunatatiri linie de cladiri",38:"demolare coada",39:"Analiza",40:"Analiza de alianta atacuri",41:"Raportul de Analiza",42:"Hero",43:"trimite automat un erou pe quest",44:"Automat de pompare de erou in oazele",45:"Cultura",46:"sarbatoare automata exploatatie",47:"Comert si resurse",48:"auto-echilibrare cu ajutorul RESURSE erou",49:"auto-echilibrare RESURSE la sate, cu ajutorul de negustori",50:"rute comerciale",51:"Cumpararea si vanzarea de resurse",52:"licitatie",53:"Jocul este la licitatie",54:"de cumparare lucrurile care trebuie",55:"Harta",56:"Gasirea 15 si 9",57:"Gasiti cei slabi si lipsiti de aparare",58:"Harta de rute comerciale",59:"harta bucatarie",60:"Harta de alianta",61:"Harta de dusmani",62:"Dezvoltare",63:"Dezvoltarea automata",64:"quest-uri",65:"dezvoltarea automata a satelor noi",66:"General",67:"Notebook",68:"Despre",69:"Setari aplicatie",70:"Aplicatie Jurnal",71:"Linkuri utile",72:"Central Village",73:"Statistica",74:"Numarul de trupe",75:"Nivelul de dezvoltare a resurselor",76:"Statistica Online",77:"Control",78:"program on-line",79:"Programul de activitate",80:"Stabilirea trimiterea sms",81:"Control prin ICQ",82:"Trimite la server informatii de coordonare a aliantei",83:"Log on la serverul de coordonare a aliantei",84:"Armata",85:"Reset",86:"Clear",87:"Salvare",88:"OK",89:"Destroy mai tarziu",90:"Setari aplicatie",91:"Limba",92:"Pentru orice intrebari, va rog",93:"Nume",94:"Selectati la un pret mai mic",95:"de cumparare la un pret mai mic",96:"* de cumparare nu este pusa in aplicare si va fi cel mai probabil nu:)",97:"unguent",98:"Scroll",99:"Cage",100:"Run jQBot T4",101:"Ordinul mai tarziu",102:"Build mai tarziu",103:"Pentru a investiga mai tarziu",104:"Noua ruta comerciala",105:"Pentru a crea un traseu de",106:"coordonate de intrare",107:"OK",108:"Anuleaza",109:"Nume",110:"Link",111:"Open in tab-ul curent",112:"Open in new tab",113:"Stop",114:"Trimiteti ultimul pe lista",115:"+ curent",116:"Reset toate atacurile pana la ora actuala",117:"Coada Senin Pharma",118:"Se efectueaza mai tarziu",119:"Destroy mai tarziu",120:"Link-uri noi",121:"Tip",122:"armare",123:"atac de obicei",124:"Raid",125:"Frecventa",126:"deplasarea accidentala",127:"tip de atac",128:"un atac",129:"2 Atac",130:"3 atacuri",131:"5 atacuri",132:"10 atacuri",133:"15 atacuri",134:"20 atacuri",135:"25 atacuri",136:"30 atacuri",137:"40 atacuri",138:"50 atacuri",139:"75 atacuri",140:"100 de atac",141:"The Village",142:"Timpul",143:"Armata",144:"Gambler",145:"Copacul",146:"Zgura",147:"Iron",148:"cereale",149:"Expeditor",150:"Receiver",151:"RESURSE",152:"Perioada",153:"Send to",154:"Nu.",155:"Ordinul de tip",156:"Constructii",157:"Nivel",158:"Oameni",159:"Perioada de evenimente timer",160:"Perioada de scanerului",161:"totala a tuturor",162:"Ordonanta armata in cazul in care exista o cladire",163:"Bazandu-se pe ceea ce lipseste RESURSE",164:"Construirea toate in ordinea prioritatii",165:"Raza Pharma",166:"ia pentru X secunde",167:"diversiune de trupe",400:"fabrica",401:"Zgura Pit",402:"Iron Mine",403:"agricole",404:"fabrica",405:"caramidaria",406:"Iron Works",407:"moara de faina",408:"panificatie",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Primaria",415:"Punctul de Rally",416:"Piata",417:"Ambasada",418:"Cazarma",419:"Stabil",420:"Atelier",421:"Academia",422:"Secret",423:"Primaria",424:"Residence",425:"Palatul",426:"trezorerie",427:"Camera de Comert",428:"Cazarma Mare",429:"Stabil Mare",430:"City Walls",431:"Fierarie",432:"Fence",433:"Arhitect",434:"Brewery",435:"Trapper",436:"Taverna",437:"Depozit Mare",438:"Barn Big",439:"Minunea Lumii",460:"Ordinul trupele",461:"Un studiu al trupelor",462:"Cladire",463:"Imbunatatirea",464:"Punerea in aplicare a sarbatori",501:"Control",502:"Options",503:"Ajutor",504:"Raid",505:"armare",506:"atac de obicei",507:"romani",508:"germani",509:"Galla",600:"Datele salvate cu succes",601:"Sarcina este proprietarul",602:"Toate setarile cererea resetare",603:"raza instalat noi",604:"O noua legatura intr",605:"Adaugat o noua ruta",606:"Eroare",607:"Datele de adaugat la coada",608:"Un astfel de studiu este deja in coada",609:"Aceasta cladire este deja in picioare, in linie pentru demolare",610:"Imbunatatirea si asa are cel mai inalt nivel",611:"Intr-o celula dat este construi ceva",612:"Aceasta cladire este in constructie in acest sat",613:"cladire si astfel vor avea cel mai inalt nivel",614:"Comunicare",615:"recreat toate pharma",616:"Pentru a distruge nu este nimic",617:"Auto-scanarea tuturor satelor",618:"Trimite trupe",619:"distrugerea cladirilor",620:"Constructia de cladiri",621:"Trimiterea de dealeri",622:"Niveluri de cladiri",623:"Legaturi externe",624:"Quick Links",625:"intrare automata a esecului autentificare",626:"Butoane de dezvoltare",627:"Acest sat este deja in lista farmaceutic",628:"Scoateti complet din foaia de ferma",629:"Satul este listat in lista de farmaceutice",630:"Page jQBot T4",631:"Inchide jQBot T4",632:"Aplicatie Reset",633:"Opriti evenimente timer alerga",634:"Run evenimente alerga timer",635:"variabilele Vizualizare GM",636:"Scoateti GM variabilele",637:"Vezi Cookie lui pas cu pas",638:"Eliminarea lui Cookie turn-based",639:"Vezi variabilele aplicare",640:"Probleme cu incarcare Minimap, opriti programul de conflict",641:"Cautare",642:"Setari de cautare",643:"Radius",644:"Cautare complet",645:"Oasis",646:"licitatie",647:"Sate",648:"Run Denver 3",649:"Coordonate",650:"Update",651:"Adaugati in satul ferma de frunze",652:"Stop atacuri cu pierderi de mai sus",653:"Schimbari salvate",654:"Login",655:"parola",656:"Stabilirea de intrare automata a unei defectiuni de conectare",700:"[3]-trimiterea de trupe",701:"[3] + trimit trupe",702:"[6] dealeri trimit",703:"[6] + dealeri trimit",704:"[1] extractie a armatei",705:"[1] + Challenge Armata",706:"[4], demolarea cladirii",707:"[4] + demolarea cladirii",708:"[2] total al tuturor",709:"[2] + totala a tuturor",710:"[5] totala a tuturor (constructii)",711:"[5] + total de toate (constructii)",1001:"legionar",1002:"Pretorian",1003:"Imperianul",1004:"Scout Horse",1005:"cavalerie al imparatului",1006:"cavalerie de Cezar",1007:"Taran",1008:"Catapult Foc",1009:"Senator",1010:"decantor",1011:"Hero",1012:"Maciucar",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"cavalerie teutonic",1018:"berbec",1019:"Catapulta",1020:"sef",1021:"decantor",1022:"Hero",1023:"Phalanx",1024:"Purtator de sabie",1025:"Pathfinder",1026:"Calaret Fulger",1027:"druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"decantor",1033:"Hero"};
var lang_rs={1:"О",2:"Фарма листа",3:"линија апотека",4:"Пријава Подешавања",5:"ред гради трупе",6:"ред Студија трупе ",7:"линија изградња нових објеката",8:"линија побољшања зграда",9:"ред рушење",10:"збир свих налога",11:"линија побољшања трупе",12:"Одлагање трупа",13:"нотебоок",14:"Корисни линкови",15:"центру села",16:"Имплементација празника",17:"трговачких путева",18:"продаје и куповине ресурса",19:"Игра је на аукцији",20:"свим селима РЕСУРСИ",21:"Војска свих села",22:"Покрети трупа свих села",23:"Дневник",24:"Фарма листа",25:"линија апотека",26:"наручивање ред трупе",27:"ред Студија трупе ",28:"линија побољшања трупе",29:"збир свих налога",30:"Одлагање трупа",31:"Таласи",32:"села",33:"свим селима РЕСУРСИ",34:"Војска свих села",35:"Покрети трупа свих села",36:"линија изградња нових објеката",37:"линија побољшања зграда",38:"ред рушење",39:"Анализа",40:"Анализа савеза напада",41:"Анализа извештај",42:"Херој",43:"Аутоматски послати хероја у потрази",44:"Аутоматско пумпање хероја у оазе",45:"Култура",46:"Аутоматски Холдинг прославе",47:"Трговина и ресурса",48:"Ауто-балансирање уз помоћ јунака РЕСУРСИ",49:"Ауто-балансирање ресурсима у селима уз помоћ трговаца",50:"трговачких путева",51:"Куповина и продаја РЕСУРСИ",52:"Аукција",53:"Игра је на аукцији",54:"Куповина праве ствари",55:"Мапа",56:"Проналажење 15 и 9",57:"Пронађи слаби и беспомоћни",58:"Мапа трговачких путева",59:"Мапа шерпе",60:"Мапа алијансе",61:"Мапа непријатеља",62:"Развој",63:"Аутоматски развој",64:"потрага",65:"Аутоматска развој нових села",66:"Опште особине",67:"нотебоок",68:"О",69:"Пријава Подешавања",70:"Дневник Апликација",71:"Корисни линкови",72:"Централно село",73:"Статистика",74:"број трупа",75:"Ниво развоја ресурса",76:"Статистика Онлине",77:"Контрола",78:"распоред мрежи",79:"распоред активности",80:"Подешавање слање СМС",81:"Контрола преко МСН",82:"Пошаљи информације серверу координацију савез",83:"Пријавите се на серверу координацију савез",84:"Војска",85:"Ресетовање",86:"Слободан",87:"Сачувај",88:"У реду",89:"Уништите касније",90:"Пријава Подешавања",91:"Језик",92:"За сва питања, молим те",93:"Назив",94:"Изабери по цени испод",95:"Куповина по цени испод",96:"* Набавка не спроводи и да ће највероватније не:)",97:"Маст",98:"Скрол",99:"Кавез",100:"Бежите јКБот Т4.0",101:"би потом",102:"Изградња касније",103:"Да бисте касније истражити",104:"Нови трговачки пут",105:"Да бисте креирали пут до",106:"улаз координате",107:"У реду",108:"Откажи",109:"Назив",110:"линк",111:"Отвори у тренутне картице",112:"Отвори у новој картици",113:"Стоп",114:"Пошаљи на крају листе",115:"+ струја",116:"Ресетуј све нападе све до тренутног времена",117:"Слободан Куеуе Пхарма",118:"Спровести касније",119:"Уништите касније",120:"Нови Линкови",121:"Тип",122:"Јачање",123:"уобичајена напад",124:"Рација",125:"Фреквенција",126:"случајног померања",127:"тип напада",128:"напад",129:"2. Напад",130:"3 напада",131:"5 напада",132:"10 напада",133:"15 напада",134:"20 напада",135:"25 напада",136:"30 напада",137:"40 напада",138:"50 напада",139:"75 напада",140:"100 напада",141:"Село",142:"Време",143:"војска",144:"Коцкар",145:"Дрво",146:"Глина",147:"Гвоздена",148:"Зрно",149:"Сендер",150:"пријемник",151:"ИЗВОРИ",152:"период",153:"Пошаљи на",154:"Не",155:"Наредба тип",156:"Изградња",157:"Ниво",158:"Људи",159:"период тајмера догађаја",160:"период скенера",161:"збир свих",162:"Налог у војсци ако се зграда",163:"Ослањајући се на оно што недостаје РЕСУРСИ",164:"Изградња све у реду приоритет",165:"Радијус Пхарма",166:"одузети за Кс секунди",167:"диверзија војника",400:"Пилана",401:"глине",402:"рудник гвожђа",403:"Фарма",404:"Пилана",405:"Циглана",406:"Гвоздена радови",407:"Брашно Млин",408:"Пекара",409:"Складиште",410:"Деца",411:"Ковачница",412:"Ковачница оклоп",413:"Арени",414:"Главна зграда",415:"окупљања",416:"тржиште",417:"амбасада",418:"Касарна",419:"Стабилна",420:"Радионица",421:"Академија",422:"Тајна",423:"Градска кућа",424:"Ресиденце",425:"Палас",426:"Трезор",427:"Привредна комора",428:"Велика касарна",429:"Велика Стабилна",430:"Цити Валлс",431:"Земљани зид",432:"Ограда",433:"Клесар",434:"Пивара",435:"Траппер",436:"Коноба",437:"Велики Складиште",438:"Велики Амбар",439:"чудо света",460:"Наредба трупе",461:"Студија трупа",462:"Изградња",463:"Побољшање",464:"Имплементација празника",501:"Контрола",502:"Опције",503:"Помоћ",504:"Рација",505:"Јачање",506:"уобичајена напад",507:"Римљани",508:"Немци",509:"Гале",600:"Подаци успешно сачувана",601:"задатак је направио власник",602:"Све подешавања пријаве ресетовање",603:"Инсталирани нове радијус",604:"нови линк",605:"додаје се нови пут",606:"Грешка",607:"Подаци додат ред",608:"Таква студија је већ у реду",609:"Ова зграда је већ стоји у реду за рушење",610:"Унапређење и тако је највиши ниво",611:"У датом ћелија је изградити нешто",612:"Ова зграда је у изградњи у овом селу",613:"зграде и тако ће имати највиши ниво",614:"Комуникација",615:"поново све Пхарма",616:"Да уништи није ништа",617:"Ауто-скенирање свих села",618:"Пошаљи трупе",619:"уништавање зграда",620:"Изградња објеката",621:"Слање дилери",622:"Нивои зграда",623:"Спољашње везе",624:"Брзи линкови",625:"Аутоматска уласка пријавите неуспеха",626:"Дугме развој",627:"Ово село је већ у фармацеутској листи",628:"Уклони потпуности од фарме лист",629:"Село је наведена у фармацеутској листи",630:"Страна јКБот Т4.0",631:"Затвори јКБот Т4.0",632:"Ресетуј Апликација",633:"Престаните да догађаји Рун тајмера",634:"Бежите догађаји Рун тајмер",635:"Преглед променљиве ГМ",636:"Уклони варијабле ГМ",637:"Погледај кукија корак по корак",638:"Уклањање кукија по принципу",639:"Погледај променљиве апликацију",640:"Проблеми са утоваром Мини, искључите сукобљених програма",641:"Претрага",642:"Подешавања претраге",643:"Радијус",644:"Тражи комплетан",645:"Оаза",646:"Аукција",647:"села",648:"Бежите Денвер 3",649:"координате",650:"Упдате",651:"Додај у фарми селу лист",652:"Престаните да напади са губицима изнад",653:"Промене су сачуване",654:"Пријава",655:"Лозинка",656:"Подешавање аутоматског уноса пријаву квара",700:"[3]-послати трупе",701:"[3] + Слање трупа",702:"[6] Слање дилери",703:"[6] + Слање дилери",704:"[1] извлачење војске",705:"[1] + Изазов војска",706:"[4], руше зграде",707:"[4] + руше зграде",708:"[2] збир свих",709:"[2] + Укупна свих",710:"[5] Укупно од свих (зграде)",711:"[5] + Укупна свих (зграде)",1001:"Легионар",1002:"Преторијанац",1003:"Империјанац",1004:"Коњ скаут",1005:"коњица цара",1006:"коњица Цезара",1007:"Таран",1008:"Ватрени катапулт",1009:"сенатор",1010:"Насељеник",1011:"Херој",1012:"Батинар",1013:"Копљаник",1014:"Акефигхтер",1015:"Скаут",1016:"паладин",1017:"Тевтонски коњицу",1018:"овна",1019:"Катапулт",1020:"Главни",1021:"Насељеник",1022:"Херој",1023:"Фаланга",1024:"мачевалац",1025:"Патхфиндер",1026:"Тхеутатес Тхундер",1027:"Врач Ридер",1028:"Коњаник",1029:"Таран",1030:"Катапулт",1031:"Лидер",1032:"Насељеник",1033:"Херој"};
var lang_se={1:"Om",2:"Farm lista",3:"line apotek",4:"Programinstallningar",5:"ko bygger trupper",6:"Den ko studien trupperna",7:"Den raden av nya byggnader",8:"Linjen forbattringar av byggnader",9:"Den ko rivning",10:"Summan av alla bestallningar",11:"Linjen forbattringar trupper",12:"Avfallshantering av trupper",13:"The Notebook",14:"Lankar",15:"byns centrum",16:"Genomforande av semester",17:"handelsvagar",18:"kop och forsaljning MEDEL",19:"Spelet ar pa auktion",20:"alla byar MEDEL",21:"Arme av alla byar",22:"Forflyttning av trupper i alla byar",23:"Log",24:"Farm lista",25:"Linjen apoteket",26:"Den ko bestallning trupper",27:"Den ko studien trupperna",28:"Linjen forbattringar trupper",29:"Summan av alla bestallningar",30:"Avfallshantering av trupper",31:"Vagor",32:"Villages",33:"alla byar MEDEL",34:"Arme av alla byar",35:"Forflyttning av trupper i alla byar",36:"Linjen byggandet av nya byggnader",37:"Linjen forbattringar av byggnader",38:"Den ko rivning",39:"Analys",40:"Analys av attacker allians",41:"Analys Report",42:"Hero",43:"Skicka automatiskt en hjalte pa jakt",44:"automatisk pumpning av hjalten i oaser",45:"Kultur",46:"Automatisk halla firande",47:"Handel och resurser",48:"auto-balansering med hjalp av hjalten MEDEL",49:"automatisk balansering RESURSER i byarna med hjalp av kopman",50:"handelsvagar",51:"Att kopa och salja MEDEL",52:"Auktion",53:"Spelet ar pa auktion",54:"Att kopa ratt saker",55:"Karta",56:"Hitta 15 och 9",57:"Hitta de svaga och varnlosa",58:"Karta over handelsvagar",59:"Kartan stekpannor",60:"Karta over alliansen",61:"Karta over fiender",62:"Utveckling",63:"Automatisk utveckling",64:"quests",65:"Automatisk utveckling av nya byar",66:"Allmant",67:"Notebook",68:"Om",69:"Programinstallningar",70:"Logg",71:"Lankar",72:"Central Village",73:"Statistik",74:"Antalet trupper",75:"Den grad av utveckling MEDEL",76:"Statistik Online",77:"Control",78:"Den schemat pa natet",79:"En plan over verksamheten",80:"Installning skicka sms",81:"Styrning via ICQ",82:"Skicka informationen till servern samordna alliansen",83:"Logga in pa servern samordna alliansen",84:"Army",85:"Reset",86:"Rensa",87:"Spara",88:"OK",89:"Forstor senare",90:"Programinstallningar",91:"Sprak",92:"For fragor, vanligen",93:"Namn",94:"Valj till ett pris under",95:"Inkop till ett pris under",96:"ar * Inkop inte genomforts och kommer sannolikt inte:)",97:"Salva",98:"Scroll",99:"Cage",100:"Kor jQBot T4",101:"Order senare",102:"Bygg senare",103:"Att undersoka senare",104:"Ny handelsvagen",105:"Att skapa en rutt till",106:"input koordinater",107:"OK",108:"Avbryt",109:"Namn",110:"Link",111:"Oppna i aktuella fliken",112:"Oppna i ny flik",113:"Stop",114:"Skicka den sist i listan",115:"+ strom",116:"Aterstall alla attacker tills aktuell tid",117:"Clear Queue Pharma",118:"Utfor senare",119:"Forstor senare",120:"Nya lankar",121:"Typ",122:"Forstarkning",123:"Den vanliga attack",124:"The Raid",125:"Frekvens",126:"oavsiktlig forskjutning",127:"Den typ av attack",128:"en attack",129:"2 Attack",130:"3 attacker",131:"5 attacker",132:"10 attacker",133:"15 attacker",134:"20 attacker",135:"25 attacker",136:"30 attacker",137:"40 attacker",138:"50 attacker",139:"75 attacker",140:"100 attack",141:"The Village",142:"Tid",143:"Armen",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Avsandare",150:"mottagare",151:"Resurser",152:"Perioden",153:"Skicka till",154:"Nej",155:"Bestall typ",156:"Construction",157:"Level",158:"folket",159:"Perioden av timer handelser",160:"Perioden av skannern",161:"Summan av alla",162:"Order armen om det finns en byggnad",163:"Att bygga pa vad som saknas MEDEL",164:"Att bygga allt i prioritetsordning",165:"Radius Pharma",166:"take away for X sekunder",167:"Den avledning av trupper",400:"sagverk",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"sagverk",405:"Brickyard",406:"Iron Works",407:"kvarn",408:"Bageri",409:"Warehouse",410:"The Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"Huvudbyggnad",415:"Rally Point",416:"Marknad",417:"Ambassaden",418:"Den Barracks",419:"Stable",420:"Workshop",421:"The Academy",422:"Secret",423:"Town Hall",424:"Residence",425:"The Palace",426:"Treasury",427:"Handelskammaren",428:"Stor barack",429:"Stort stall",430:"City Walls",431:"Earth Wall",432:"staket",433:"Stenhuggare",434:"The Brewery",435:"Trapper",436:"Tavern",437:"Great Warehouse",438:"Big Barn",439:"Wonder of the World",460:"Bestall trupperna",461:"En studie av trupper",462:"Byggnad",463:"forbattring",464:"Genomforandet av semestern",501:"Control",502:"Alternativ",503:"Hjalp",504:"The Raid",505:"Forstarkning",506:"Den vanliga attack",507:"Romarna",508:"Tyskarna",509:"Galla",600:"Data sparats",601:"Den uppgift som agaren",602:"Alla programinstallningar aterstallning",603:"installerat nya radie",604:"En ny lank",605:"Lade till en ny rutt",606:"Fel",607:"De uppgifter som lagts till i kon",608:"En sadan studie ar redan i kon",609:"Den har byggnaden star redan i ko for rivning",610:"Forbattrad och sa har den hogsta niva",611:"I en cell ar att bygga nagot",612:"Denna byggnad ar under uppforande i den har byn",613:"Byggnaden och sa har hogsta niva",614:"Kommunikation",615:"aterskapade alla pharma",616:"Att forstora ar ingenting",617:"Auto-scanning av alla byar",618:"Sand trupper",619:"Den forstorelse av byggnader",620:"Den uppforande av byggnader",621:"Skicka aterforsaljare",622:"Nivaerna av byggnader",623:"Externa lankar",624:"Snabblankar",625:"Automatisk inmatning av inloggning misslyckande",626:"Knappar utveckling",627:"Det har byn ar redan i lakemedels-listan",628:"Ta bort helt fran garden blad",629:"Byn finns med i den farmaceutiska listan",630:"Sidan jQBot T4",631:"Stang jQBot T4",632:"Aterstall Ansokan",633:"Stoppa handelserna kora tidsinstallda",634:"Kor handelser kora timer",635:"Visa variabler GM",636:"Ta bort de variabler GM",637:"Visa Cookie har steg for steg",638:"Borttagning av Cookie tur-baserade",639:"Visa ansokan variabler",640:"Problem med att ladda minimapen, stang av motstridiga programmet",641:"Sok",642:"Sok Installningar",643:"Radie",644:"Sok komplett",645:"Oasis",646:"Auktion",647:"Villages",648:"Kor Denver 3",649:"Koordinater",650:"Uppdatera",651:"Lagg till pa garden byn Leaf",652:"Sluta attacker med forluster over",653:"Forandringar sparas",654:"Logga in",655:"losenord",656:"Installning av automatisk inmatning av en inloggning misslyckande",700:"[3]-sanda trupper",701:"[3] + skicka trupper",702:"[6] Skickar aterforsaljare",703:"[6] + Skickar aterforsaljare",704:"[1] utvinning av armen",705:"[1] + Challenge Army",706:"[4], demolera byggnaden",707:"[4] + demolera byggnaden",708:"[2] Summan av alla",709:"[2] + Total av alla",710:"[5] Summan av alla (byggnad)",711:"[5] + Total av alla (byggnad)",1001:"Legionar",1002:"Praetorian",1003:"Imperian",1004:"Hast scout",1005:"Den kavalleri av kejsaren",1006:"Den kavalleri Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"Nybyggare",1011:"Hero",1012:"Klubbman",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germanska kavalleri",1018:"murbracka",1019:"Katapult",1020:"The Chief",1021:"Nybyggare",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Theutates blixt",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"Nybyggare",1033:"Hero"};
var lang_si={1:"O",2:"Farm List",3:"line lekarna",4:"Application Settings",5:"cakalne vrste je stavba enot",6:"cete Studija cakalne vrste",7:"linija gradnjo novih stavb",8:"line izboljsave stavb",9:"cakalni vrsti rusenje",10:"Skupna vseh narocil",11:"line izboljsave vojakov",12:"Odstranjevanje vojakov",13:"The Notebook",14:"Koristne povezave",15:"Vas center",16:"Izvajanje pocitnic",17:"trgovske poti",18:"VIRI prodaji in nakupu",19:"Igra je na drazbi",20:"vse vasi virov",21:"Army vseh vasi",22:"Gibanje cet vseh vasi",23:"Log",24:"Farm List",25:"line lekarna",26:"cakalni vrsti narocanje vojakov",27:"cete Studija cakalne vrste",28:"line izboljsave vojakov",29:"Skupna vseh narocil",30:"Odstranjevanje vojakov",31:"Waves",32:"Villages",33:"vse vasi virov",34:"Army vseh vasi",35:"Gibanje cet vseh vasi",36:"line gradnjo novih stavb",37:"line izboljsave stavb",38:"cakalni vrsti rusenje",39:"Analiza",40:"Analiza zveza napadov",41:"analizni izvid",42:"Hero",43:"Samodejno poslji junak na prizadevanjih",44:"Samodejno crpanje junak v oaze",45:"Kultura",46:"Automatic imajo praznovanja",47:"Trgovina in viri",48:"auto-uravnotezenje s pomocjo junak virov",49:"auto-uravnotezenje VIRI v vaseh s pomocjo trgovci",50:"trgovske poti",51:"Nakup in prodaja vire",52:"drazbe",53:"Igra je na drazbi",54:"Nakup prave stvari",55:"Map",56:"Iskanje 15 in 9",57:"Najdi sibke in nemocne",58:"Map of trgovskih poti",59:"map soline",60:"Map of zaveznistva",61:"Map of sovraznikov",62:"razvoj",63:"Samodejno Development",64:"gostje",65:"Samodejno razvoj novih vasi",66:"Splosno",67:"Notebook",68:"O",69:"Application Settings",70:"dnevnik",71:"Koristne povezave",72:"Central Village",73:"Statistika",74:"Stevilo enot",75:"visino sredstev za razvoj",76:"Statistika Online",77:"Control",78:"urnik online",79:"urnik dejavnosti",80:"Nastavitev posiljanje sms",81:"Control preko ICQ",82:"Poslji podatke na streznik usklajevanje zveza",83:"Prijavite se na strezniku usklajevanje zveza",84:"Army",85:"Reset",86:"Clear",87:"Save",88:"OK",89:"Destroy kasneje",90:"Application Settings",91:"Language",92:"Za kakrsna koli vprasanja, prosim",93:"Ime",94:"Select po ceni, nizji",95:"Nakup po ceni, nizji",96:"je * Purchasing ne izvaja in bo po vsej verjetnosti ne:)",97:"Mazilo",98:"Izberite",99:"Cage",100:"Run jQBot T4",101:"Order Kasneje",102:"Build kasneje",103:"Da bi kasneje razisce",104:"Nova trgovska pot",105:"Ce zelite ustvariti pot do",106:"vnos koordinate",107:"OK",108:"Cancel",109:"Ime",110:"Link",111:"Open v trenutni zavihek",112:"Odpri v novem zavihku",113:"Stop",114:"Poslji zadnji na seznamu",115:"+ trenutni",116:"Ponastavi vse napade do trenutnega casa",117:"Clear Queue Pharma",118:"Opravite kasneje",119:"Destroy kasneje",120:"Nove povezave",121:"Tip",122:"Okrepitev",123:"obicajne napad",124:"Raid",125:"Frequency",126:"nenadnimi premiki",127:"vrsta napada",128:"napad",129:"2 Attack",130:"3 napadi",131:"5 napadov",132:"10 napadov",133:"15 napadov",134:"20 napadov",135:"25 napadov",136:"30 napadov",137:"40 napadov",138:"50 napadov",139:"75 napadov",140:"100 napad",141:"The Village",142:"Time",143:"vojska",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"Grain",149:"Sender",150:"Receiver",151:"Viri",152:"Obdobje",153:"Poslji",154:"Ne",155:"Order tip",156:"Gradbenistvo",157:"Level",158:"People",159:"obdobje timer dogodkov",160:"obdobje skener",161:"Vsota vseh",162:"Naroci vojsko, ce je stavba",163:"Gradimo na tisto, kar manjka sredstev",164:"Building vse, da bi prednostne naloge",165:"Radius Pharma",166:"odvzela za sekund X",167:"zlorabe vojakov",400:"Zaga",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"Zaga",405:"Brickyard",406:"Iron Works",407:"Moka Mill",408:"Pekarna",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"Forge Armor",413:"Arena",414:"ceh",415:"Rally Point",416:"Market",417:"veleposlanistvo",418:"Barake",419:"stabilen",420:"Delavnica",421:"Akademija",422:"Secret",423:"Town Hall",424:"Residence",425:"Palace",426:"Treasury",427:"Gospodarska zbornica",428:"Velike barake",429:"Velika konjusnica",430:"Mesto Walls",431:"Earth Wall",432:"Fence",433:"Klesar",434:"Pivovarna",435:"pasti",436:"Taverna",437:"Veliko skladisce",438:"Big Barn",439:"cudo sveta",460:"Naroci cete",461:"Studija vojakov",462:"Building",463:"Izboljsanje",464:"Izvajanje pocitnic",501:"Control",502:"Options",503:"Help",504:"Raid",505:"Okrepitev",506:"obicajne napad",507:"Rimljani",508:"Nemci",509:"Galla",600:"Podatki uspesno shranjeni",601:"Ta naloga je lastnik",602:"Vse nastavitve aplikacije reset",603:"Installed nov polmer",604:"nov link",605:"Dodano novo pot",606:"Error",607:"Podatki, dodani v cakalno vrsto",608:"Taksna studija je ze v cakalni vrsti",609:"Ta stavba je ze stoji v vrsti za rusenje",610:"Izboljsanje in tako je na najvisji ravni",611:"V dolocenem celici zgraditi nekaj",612:"Ta stavba je v gradnji v tej vasi",613:"gradnje in tako bo imel najvisjo raven",614:"sporocilo",615:"poustvarili vse pharma",616:"Da bi unicili ni nic",617:"Auto-skeniranje vseh vasi",618:"Poslji enote",619:"unicenje stavb",620:"Gradnja stavb",621:"Posiljanje trgovci",622:"Stopnje zgradb",623:"Zunanje povezave",624:"Quick Links",625:"Automatic login vnos neuspeha",626:"Buttons Development",627:"To vas je ze v farmacevtski seznamu",628:"odstrani popolnoma iz kmetije lista",629:"Vas je navedena v farmacevtski seznamu",630:"Page jQBot T4",631:"Zapri jQBot T4",632:"Reset Application",633:"Stop dogodkov ura tece",634:"Run dogodki timer teci",635:"Prikaz spremenljivke GM",636:"Odstrani spremenljivk GM",637:"korak View Cookie je za korakom",638:"Odstranjevanje Cookie je turn-based",639:"Poglej uporabo spremenljivk",640:"Tezave z nalaganjem MiniMap, izklopite nasprotujoce si program",641:"Search",642:"Search Settings",643:"Radius",644:"Search popolna",645:"Oasis",646:"drazbe",647:"Villages",648:"Run Denver 3",649:"Koordinate",650:"Update",651:"Dodaj na kmetiji vasi Leaf",652:"Stop napade z izgubami zgoraj",653:"Spremembe shranjene",654:"Prijava",655:"password",656:"Nastavitev samodejnega vnosa login neuspeha",700:"[3]-Send vojakov",701:"[3] + Posiljanje vojakov",702:"[6] Posiljam trgovci",703:"[6] + Posiljanje trgovci",704:"[1] pridobivanje vojske",705:"[1] + Challenge Army",706:"[4], unicenjem stavbe",707:"[4] + unicenjem stavbe",708:"[2] skupaj z vsemi",709:"[2] + Skupaj vseh",710:"[5] skupaj z vsemi (stavbe)",711:"[5] + Skupaj vseh (stavbe)",1001:"Legionnaire",1002:"Pretorske",1003:"Imperian",1004:"Horse scout",1005:"konjenico od cesarja",1006:"konjenica Cezar",1007:"Taran",1008:"Fire Catapult",1009:"Senator",1010:"naseljencev",1011:"Hero",1012:"Gorjacar",1013:"Spearmanov",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Tevtonski konjenica",1018:"Oven",1019:"Catapult",1020:"Glavni",1021:"naseljencev",1022:"Hero",1023:"Falanga",1024:"Mecevalec",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"naseljencev",1033:"Hero"};
var lang_sk={1:"O",2:"Farma List",3:"linka lekaren",4:"Nastavenie aplikacie",5:"Fronta je stavebne jednotky",6:"vojaci frontu studie",7:"linie vystavby novych budov",8:"Rad vylepsenia budov",9:"front demolacie",10:"Sucet vsetkych zakaziek",11:"linka vylepsenia vojakov",12:"Likvidacia vojakov",13:"Notebook",14:"Uzitocne odkazy",15:"centrum obce",16:"Implementacia prazdnin",17:"obchodne cesty",18:"pri predaji a nakupe zdrojov",19:"Hra je v aukcii",20:"Vsetky dediny zdrojov",21:"Armada vsetkych dedin",22:"Pohyby vojsk zo vsetkych dedin",23:"Log",24:"Farma List",25:"linka lekaren",26:"front objednanie vojakov",27:"vojaci frontu studie",28:"linka vylepsenia vojakov",29:"Sucet vsetkych zakaziek",30:"Likvidacia vojakov",31:"Vlny",32:"Dedina",33:"Vsetky dediny zdrojov",34:"Armada vsetkych dedin",35:"Pohyby vojsk zo vsetkych dedin",36:"liniove stavby novych budov",37:"Rad vylepsenia budov",38:"front demolacie",39:"Analyza",40:"Analyza utokov Aliancie",41:"sprava o analyze",42:"Hero",43:"automaticky odoslat hrdinu na ceste",44:"Automaticke cerpanie hrdinu v oazach",45:"Kultura",46:"Automaticke organizovanie oslav",47:"Obchod a zdroje",48:"auto-vyvazenie pomocou hrdinu zdrojov",49:"auto-balancing ZDROJOV v obciach s pomocou obchodnikov",50:"obchodne cesty",51:"Nakup a predaj zdrojov",52:"Aukcie",53:"Hra je v aukcii",54:"Nakup spravne veci",55:"Mapa",56:"Najdenie 15 a 9",57:"Najdite slabe a bezbranne",58:"Mapa obchodnych ciest",59:"map panvy",60:"Mapa aliancie",61:"Mapa nepriatelov",62:"Vyvoj",63:"Automaticke rozvoja",64:"questy",65:"Automaticke vytvaranie novych dedin",66:"General",67:"notebook",68:"O",69:"Nastavenie aplikacie",70:"Log aplikacie",71:"Uzitocne odkazy",72:"Central Village",73:"Statistika",74:"Pocet jednotiek",75:"urovni rozvoja zdrojov",76:"Statistics on-line",77:"Control",78:"Program online",79:"Program cinnosti",80:"Nastavenie odosielania SMS",81:"ovladanie cez ICQ",82:"zaslat informacie na server koordinacne Aliancia",83:"Prihlasenie k serveru koordinacnej Aliancie",84:"armada",85:"Reset",86:"Clear",87:"Ulozit",88:"OK",89:"Znicte neskor",90:"Nastavenie aplikacie",91:"Jazyk",92:"V pripade akychkolvek otazok, prosim",93:"Meno",94:"Select za cenu nizsiu ako",95:"Nakup za cenu nizsiu ako",96:"* Nakup nebol realizovany a bude s najvacsou pravdepodobnostou nebude:)",97:"mast",98:"scroll",99:"klietka",100:"Run jQBot T4",101:"objednavku neskor",102:"Build neskor",103:"skumat neskor",104:"Nove obchodna cesta",105:"Ak chcete vytvorit cestu k",106:"Vstup suradnic",107:"OK",108:"Zrusit",109:"Meno",110:"Link",111:"Otvorit v aktualnej zalozke",112:"Otvorit v novej zalozke",113:"Stop",114:"odoslat posledny v zozname",115:"+ aktualny",116:"Obnovit vsetky utoky az do aktualneho casu",117:"Clear frontu Pharma",118:"Vykonajte neskor",119:"Znicte neskor",120:"Nove stranky",121:"Typ",122:"posilnenie",123:"Obvykly utok",124:"Raid",125:"Frekvencia",126:"nahodnemu posunu",127:"typ utoku",128:"utok",129:"2 Attack",130:"3 utoky",131:"5 utoky",132:"10 utokov",133:"15 utokov",134:"20 utokov",135:"25 utokov",136:"30 utokov",137:"40 utokov",138:"50 utokov",139:"75 utokov",140:"100 utok",141:"The Village",142:"Cas",143:"Armada",144:"Gambler",145:"The Tree",146:"Clay",147:"Iron",148:"zrno",149:"Odosielatel",150:"Prijimac",151:"Zdroje",152:"Obdobie",153:"Odoslat",154:"Nie.",155:"typove",156:"Stavba",157:"Level",158:"People",159:"Doba casovaca",160:"Doba skenera",161:"sucet vsetkych",162:"Order armada Ak je stavba",163:"V nadvaznosti na to, co chyba zdroje",164:"Stavebne vsetko v poradi",165:"Radius Pharma",166:"Vezmite prec sekund X",167:"zneuzivanie vojakov",400:"Pila",401:"Clay Pit",402:"Zelezny bana",403:"The Farm",404:"Pila",405:"Tehelna",406:"Iron Works",407:"mlyna",408:"Pekaren",409:"skladu",410:"Stodola",411:"kovac",412:"Forge Armor",413:"Arena",414:"Hlavna budova",415:"Rally Point",416:"Trh",417:"velvyslanectvo",418:"Kasarne",419:"Stable",420:"Workshop",421:"Akademia",422:"Tajne",423:"Radnica",424:"bydlisko",425:"Palace",426:"statnej pokladnice",427:"Hospodarska komora",428:"Velke kasarne",429:"Velke stajne",430:"hradby",431:"Krajina Wall",432:"plot",433:"Kamenar",434:"pivovaru",435:"lovca",436:"krcma",437:"Velke skladisko",438:"velka stodola",439:"Div sveta",460:"Rad vojsk",461:"Studia vojakov",462:"Building",463:"zlepsenie",464:"Implementacia prazdnin",501:"Control",502:"Options",503:"Help",504:"Raid",505:"posilnenie",506:"Obvykly utok",507:"Rimania",508:"Nemci",509:"Galla",600:"Data boli uspesne ulozene",601:"Ulohou je vlastnikom",602:"Vsetky nastavenia aplikacie reset",603:"nainstalovali novy okruh",604:"Nove spojenie",605:"dodal novu cestu",606:"Chyba",607:"Data pridanie do frontu",608:"Tato studia je uz vo fronte",609:"Tato budova je uz vo fronte k demolacii",610:"zlepsenie, a tak bola na najvyssej urovni",611:"V danej bunke je vytvorit nieco",612:"Tato budova je vo vystavbe v tejto obci",613:"Budova, takze bude mat najvyssej urovni",614:"Komunikacia",615:"znovu vsetky Pharma",616:"znicit nic",617:"Auto-testovanie vsetkych dedin",618:"poslat vojakov",619:"Znicenie budov",620:"Vystavba budov",621:"Posielam predajcovia",622:"urovnami budov",623:"Externe odkazy",624:"Rychle odkazy",625:"Automaticka vstupu Prihlasit zlyhanie",626:"Tlacidla pre rozvoj",627:"Tato dedina je uz vo farmaceutickom zoznamu",628:"odstranit kompletne z farmy list",629:"Obec je uvedeny vo farmaceutickom zozname",630:"Page jQBot T4",631:"Zavriet jQBot T4",632:"Reset aplikacie",633:"Stop udalosti beh casovaca",634:"Beh udalosti, timer run",635:"Informacie o premennej GM",636:"Odstranit premennej GM",637:"Zobrazit Cookie je krok za krokom",638:"Odstranenie Cookie je otocenie-umiestneny",639:"Zobrazit aplikacne premennej",640:"Problemy s nacitanim minimape, vypnite problematicky program",641:"Hladat",642:"Search Settings",643:"Radius",644:"Hladat kompletny",645:"Oasis",646:"Aukcie",647:"Dedina",648:"Run Denver 3",649:"suradnice",650:"Update",651:"Pridat na statku dedine Leaf",652:"Stop utokom so stratami hore",653:"Zmeny boli ulozene",654:"Prihlasit sa",655:"heslo",656:"Nastavenie automatickeho vstupu login zlyhanie",700:"[3], poslat vojakov",701:"[3] + vyslanie vojsk",702:"[6] Odosielanie obchodnikov",703:"[6] + Odoslanie obchodnikov",704:"[1] tazba armady",705:"[1] + Challenge armada",706:"[4], zburat budovy",707:"[4] + demolaciu budovy",708:"[2] sucet vsetkych",709:"[2] + Celkovy pocet vsetkych",710:"[5] Celkom vsetky (budova)",711:"[5] + sucet vsetkych (budova)",1001:"Legionar",1002:"Praetorian",1003:"Imperian",1004:"Kon Scout",1005:"jazda cisara",1006:"kavalerie Caesar",1007:"Taran",1008:"Poziarne katapult",1009:"senator",1010:"osadnik",1011:"Hero",1012:"Palkar",1013:"Ostepar",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"germanskej kavalerie",1018:"baranidlo",1019:"Katapult",1020:"The Chief",1021:"osadnik",1022:"Hero",1023:"Phalanxy",1024:"Sermiar",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Leader",1032:"osadnik",1033:"Hero"};
var lang_tr={1:"Hakk?nda",2:"Ciftlik Listesi",3:"cizgi eczane",4:"Uygulama Ayarlar?",5:"kuyruk asker insa ediyor",6:"kuyruk cal?sma askerleri ",7:"Yeni bina yap?m? cizgi",8:"Binalar?n hatt? iyilestirme",9:"kuyruk y?k?m",10:"Tum siparislerin toplam",11:"cizgi gelismeler asker",12:"asker at?lmas?",13:"The Notebook",14:"Faydal? Linkler",15:"koy merkezine",16:"tatil Uygulanmas?",17:"Ticaret Yollar?",18:"sat?s ve sat?n alma KAYNAKLARI",19:"Oyun muzayede ac?k",20:"Tum koy KAYNAKLARI",21:"Tum koylerin Ordusu",22:"Tum koy birliklerinin Hareketleri",23:"Log",24:"Ciftlik Listesi",25:"cizgi eczane",26:"siparis kuyrugu asker",27:"kuyruk cal?sma askerleri ",28:"cizgi gelismeler asker",29:"Tum siparislerin toplam",30:"asker at?lmas?",31:"Dalgalar",32:"Koyler",33:"Tum koy KAYNAKLARI",34:"Tum koylerin Ordusu",35:"Tum koy birliklerinin Hareketleri",36:"Yeni bina hatt? yap?m?",37:"Binalar?n hatt? iyilestirme",38:"kuyruk y?k?m",39:"Analiz",40:"sald?r?lar? ittifak Analizi",41:"Analiz Raporu",42:"Hero",43:"Otomatik olarak aray?s bir kahraman gonder",44:"vahalar icinde kahraman pompalama Otomatik",45:"Kultur",46:"Otomatik tutma kutlamalar?",47:"Ticaret ve KAYNAKLARI",48:"kahraman KAYNAKLARI yard?m?yla otomatik dengeleme",49:"tuccar yard?m?yla koylerde otomatik dengeleme KAYNAKLARI",50:"Ticaret Yollar?",51:"KAYNAKLARI Al?s ve sat?s",52:"Ac?k Art?rma",53:"Oyun muzayede ac?k",54:"dogru seyleri sat?n almak",55:"Map",56:"15 ve 9 bulma",57:"zay?f ve savunmas?z bul",58:"ticaret yollar?n?n Haritas?",59:"haritas? tava",60:"ittifak Haritas?",61:"dusman Haritas?",62:"Gelistirme",63:"Otomatik Gelistirme",64:"gorevler",65:"Yeni koy otomatik olarak gelistirilmesi",66:"Genel",67:"Notebook",68:"Hakk?nda",69:"Uygulama Ayarlar",70:"Gunluk Uygulama",71:"Faydal? Linkler",72:"Merkez Koy",73:"Istatistik",74:"asker say?s?",75:"kalk?nma KAYNAK seviyesi",76:"Istatistik Online",77:"Kontrol",78:"program? online",79:"faaliyet plan?",80:"gonderme sms ayarlama",81:"ICQ uzerinden kontrol",82:"ittifak koordine sunucuya bilgi gonder",83:"ittifak koordine sunucuya oturum ac?n",84:"Ordu",85:"Reset",86:"Temizle",87:"Kaydet",88:"OK",89:"daha sonra yok",90:"Uygulama Ayarlar",91:"Dil",92:"Herhangi bir sorunuz icin lutfen",93:"Ad",94:"alt?nda bir fiyata secin",95:"alt?nda bir fiyata sat?n alma",96:":) * Sat?nalma uygulanmad? ve buyuk olas?l?kla degil",97:"merhem",98:"gelin",99:"Kafes",100:"jQBot T4 Cal?st?r",101:"Daha sonra Duzen",102:"Daha sonra Build",103:"Daha sonra arast?rmak icin",104:"Yeni ticaret yolu",105:"bir yol olusturmak icin",106:"giris koordinatlar?",107:"OK",108:"Iptal",109:"Ad",110:"Baglant?",111:"Gecerli sekmede acma",112:"Yeni sekmede ac",113:"Dur",114:"listedeki son Gonder",115:"+ gecerli",116:"Gecerli saat kadar tum sald?r?lar? Reset",117:"Clear Queue Pharma",118:"Daha sonra yap?n",119:"daha sonra yok",120:"Yeni Baglant?lar",121:"Tip",122:"Takviye",123:"Her zamanki sald?r?",124:"Raid",125:"Frekans",126:"Kaza yerinden",127:"sald?r? turu",128:"bir sald?r?",129:"2 Attack",130:"3 sald?r?lar?",131:"5 sald?r?lar?",132:"10 sald?r?",133:"15 sald?r?",134:"20 sald?r?",135:"25 sald?r?",136:"30 sald?r?",137:"40 sald?r?",138:"50 sald?r?",139:"75 sald?r?",140:"100 krizi",141:"Koy",142:"Zaman",143:"ordu",144:"Kumarbaz",145:"Agac?",146:"Kil",147:"Demir",148:"Tane",149:"Gonderen",150:"Al?c?",151:"KAYNAKLAR",152:"Donem",153:"Al?c?",154:"Hay?r.",155:"Siparis tipi",156:"Insaat",157:"Level",158:"People",159:"zamanlay?c? olaylar donemi",160:"taray?c?n?n donemi",161:"Tum toplam",162:"Bir bina varsa ordu Yoldasl?g?",163:"KAYNAKLARI eksik ne Bina",164:"oncelik s?ras?na gore tum Binas?",165:"Radius Pharma",166:"X saniye goturmek",167:"askerlerinin sapt?rma",400:"Sawmill",401:"Tugla Ocag?",402:"Demir Madeni",403:"Farm",404:"Sawmill",405:"Brickyard",406:"Demir Isleri",407:"Degirmen",408:"F?r?n",409:"Depo",410:"The Barn",411:"Demirci",412:"Forge Z?rh",413:"Arena",414:"Ana Bina",415:"Rally Point",416:"Piyasa",417:"Buyukelcilik",418:"K?sla",419:"Duragan",420:"Atolye",421:"Akademi",422:"Gizli",423:"Town Hall",424:"Residence",425:"Saray",426:"Hazine",427:"Ticaret Odas?",428:"Buyuk K?sla",429:"Buyuk Ah?r",430:"Surlar?",431:"Askeri Us",432:"Cit",433:"tas ustas?",434:"Brewery",435:"Trapper",436:"Tavern",437:"Buyuk Hammadde Deposu",438:"Buyuk Barn",439:"Dunya harikas?",460:"asker Emri",461:"askeri bir cal?sma",462:"Bina",463:"Iyilestirme",464:"tatil Uygulanmas?",501:"Denetim",502:"Secenekler",503:"Yard?m",504:"Raid",505:"Takviye",506:"Her zamanki sald?r?",507:"Romal?lar",508:"Almanlar",509:"Galla",600:"Veri basar?yla kaydedildi",601:"Gorev sahibi olur",602:"Butun uygulama ayarlar?n? s?f?rlamak",603:"Yuklu yeni yar?cap?",604:"Yeni bir baglant?",605:"Yeni bir rota eklendi",606:"Hata",607:"veri s?ra eklenen",608:"Boyle bir cal?sma s?ra zaten",609:"Bu bina daha once y?k?m icin s?rada duruyor",610:"Gelistirme ve boylece en ust duzeyde var",611:"Belirli bir hucreye bir sey insa ederiz",612:"Bu bina bu koyde yap?m asamas?ndad?r",613:"bina ve boylece en ust duzeyde olacak",614:"Iletisim",615:"Tum ilac yeniden",616:"yok etmek icin baska bir sey degildir",617:"Tum koylerde otomatik tarama",618:"Gonder asker",619:"Binalar?n y?k?m?",620:"Binalar?n insaat?",621:"bayi Gonderme",622:"Binalar?n Duzeyleri",623:"D?s baglant?lar",624:"H?zl? Erisim",625:"oturum acmad?g?n? otomatik giris",626:"Dugmeler Gelistirme",627:"Bu koy zaten ilac listesi icindedir",628:"ciftlik levha tamamen kald?rma",629:"koy ilac listesinde olan",630:"Sayfa jQBot T4",631:"Kapat jQBot T4",632:"Reset Uygulama",633:"cal?st?rmak Zamanlay?c? olaylar? durdurun",634:"cal?st?rmak Zamanlay?c? olaylar? Cal?st?r",635:"Goruntuleme degiskenleri GM",636:"degiskenleri GM Kald?r",637:"ad?m goruntule Cookie Kullan?c? ad?m",638:"Cerez s?ras? tabanl? c?kar?lmas?",639:"uygulama degiskenleri View",640:"mini yukleme ile ilgili sorunlar, celiskili program? kapat?n",641:"Ara",642:"Arama Ayarlar?",643:"Radius",644:"tam Ara",645:"Oasis",646:"Ac?k Art?rma",647:"Koyler",648:"Run Denver 3",649:"Koordinatlar?",650:"Update",651:"Leaf ciftlik koyunde Ekle",652:"Yukar?da kay?plar? ile sald?r?lar? durdurun",653:"Degisiklikler kaydedildi",654:"Giris",655:"parola",656:"Bir giris basar?s?zl?k otomatik giris ayarlama",700:"[3]-asker gonderin",701:"[3] + asker gonderme",702:"[6] gonderme yapanlar",703:"[6] + gonderme yapanlar",704:"[1] ordusunun c?karma",705:"[1] + meydan Ordusu",706:"[4], bina y?kmak",707:"[4] + bina y?kmak",708:"[2] toplam",709:"Tum [2] + Toplam",710:"[5] (bina) toplam",711:"[5] (bina) + Toplam",1001:"Lejyoner",1002:"Praetorian",1003:"Emperiyanlar",1004:"At izci",1005:"Imparator suvari",1006:"Sezar'?n suvari",1007:"Taran",1008:"Ates Manc?n?k",1009:"Senator",1010:"Yerlesimci",1011:"Hero",1012:"Tokmak Sallayan",1013:"Spearman",1014:"Axefighter",1015:"Scout",1016:"Paladin",1017:"Cermen suvari",1018:"battering ram",1019:"Manc?n?k",1020:"Sef",1021:"Yerlesimci",1022:"Hero",1023:"Phalanx",1024:"Swordsman",1025:"Pathfinder",1026:"Toytatin Thunder",1027:"Buyucu Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Lider",1032:"Yerlesimci",1033:"Hero"};
var lang_tw={1:"?????????",2:"???????????",3:"???????????????",4:"?????????????????????????",5:"????????????????",6:"??????????????",7:"??????????????????????????",8:"??????????????????????",9:"?????????????",10:"????????????????????????",11:"????????????????????",12:"???????????????",13:"The Notebook",14:"?????",15:"?????????????",16:"???????????????????",17:"?????????????",18:"??????????????????",19:"????????????????????????????",20:"?????????????????????????",21:"????????????????????????",22:"??????????????????????????????????????????",23:"???????????",24:"????????????",25:"???????????????",26:"??????????????????",27:"??????????????",28:"????????????????????",29:"????????????????????",30:"???????????????",31:"?????",32:"????????",33:"?????????????????????????",34:"????????????????????????",35:"??????????????????????????????????????????",36:"??????????????????????????",37:"??????????????????????",38:"?????????????",39:"????????????",40:"???????????????????????????????",41:"??????????????????",42:"Hero",43:"???????????????????????????????",44:"Automatic ????????????????? oases ???",45:"????????",46:'??????????????????????"????????????',47:"????????????????????",48:"auto ??????????????????????????????????????????",49:"???????????????????????????????????????????????????????????",50:"?????????????",51:"??????????????????",52:"??????",53:"????????????????????????????",54:"??????????????????",55:"??????",56:"?? 15 ??? 9",57:"???????????????????????????",58:"??????????????????????",59:"???????????",60:"?????????????????",61:"??????????????",62:"????????",63:"???????????????????? ",64:"????",65:"????????????????????????????????????",66:"??????",67:"????????",68:"?????????",69:"?????????????????????????",70:"????????????????",71:"?????",72:"?????? Central",73:"?????",74:"????????????",75:"????????????????????????",76:"????????????",77:"??????",78:"???????????????",79:"??????????????????",80:"????????????? SMS",81:"???????????? ICQ",82:"?????????????????????????????????????????????",83:"??????????????????????????????????????????",84:"??????",85:"Reset",86:"Clear",87:"??????",88:"OK",89:"????????????",90:"?????????????????????????",91:"????",92:"????????????? ? ????",93:"????",94:"??????????????????????",95:"???????????????????????????",96:"?????????? * ??????????????????????????????? :)",97:"Ointment",98:"??????",99:"???",100:"Run jQBot T4",101:"???????????????",102:"????????????",103:"?????????????????",104:"?????????????????",105:"????????????????????",106:"????????",107:"OK",108:"??????",109:"????",110:"?????",111:"??????????????????",112:"??????????????",113:"????",114:"???????????????????????",115:"+ ????????",116:"?????????????????????????????????????????????",117:"???????????????",118:"????????????????",119:"????????????",120:"?????????",121:"??????",122:"?????",123:"????????????",124:"?????",125:"???????",126:"????????????????",127:"?????????????????",128:"????????",129:"2 Attack",130:"3 ?????",131:"5 ?????",132:"10 ?????",133:"15 ?????",134:"20 ?????",135:"25 ?????",136:"30 ?????",137:"40 ?????",138:"50 ?????",139:"75 ?????",140:"100 ????? ",141:"??????",142:"????",143:"??????",144:"???????",145:"??????",146:"???",147:"?????",148:"????",149:"??????",150:"???",151:"??????",152:"????????",153:"?????",154:"???",155:"??????????????",156:"????????",157:"?????",158:"???????",159:"???????????????????????????",160:"????????????????????",161:"??????????",162:"???????????????????????",163:"??????????????????????????? Resources",164:"????????????????????????????",165:"???????????",166:"?????????? X",167:"??????????",400:"?????????????",401:"Pit Clay",402:"????????",403:"?????",404:"?????????????",405:"???",406:"Iron Works",407:"???????",408:"????????",409:"Warehouse",410:"Barn",411:"Blacksmith",412:"??????????",413:"Arena",414:"?????????",415:"????????",416:"????",417:"???????",418:"????????",419:"Stable",420:"???????????????????????",421:"??????",422:"???????",423:"????",424:"Residence",425:"?????????",426:"????????",427:"????????",428:"???? Great",429:"??????????? Great",430:"??????????",431:"Earth Wall",432:"????",433:"??????????",434:"?????????",435:"Trapper",436:"????????",437:"???? Great",438:"Barn ????",439:"Wonder ??????",460:"????????",461:"???????????????????????",462:"?????",463:"Improvement",464:"??????????????????????",501:"??????",502:"????????",503:"?????????????",504:"RAID",505:"?????",506:"????????????",507:"???",508:"???????",509:"Galla",600:"?????????????????????????",601:"???????????????",602:"????????????????????",603:"????????????????",604:"????????????????",605:"????????????????",606:"??????????",607:"???????????????????????",608:"???????????????????????????????",609:"??????????????????????????????????????????????",610:"??????????????????????????????????????",611:"?????????????????????????????",612:"????????????????????????????????????????????????",613:"??????????????????????????????",614:"??????????",615:"??????????????????",616:"???????????????",617:"???????????????????????????",618:"???????",619:"????????????????",620:"????????????????",621:"??????????????????????????????",622:"?????????????",623:"???????????",624:"??????????",625:"???????????????????????????????????????????",626:"????????????",627:"?????????????????????????",628:"??????????????????????????",629:"??????????????????????????????????",630:"????????? jQBot T4",631:"??? jQBot T4",632:"?????????????????????????",633:"Stop ???????????????????",634:"Run ???????????????????",635:"?????????????????",636:"??????????????",637:"?????????????????????????",638:"??????????????????????????",639:"??????????????? ",640:"????????????????? minimap ??????????????????????????",641:"?????",642:"??????????????????",643:"?????",644:"????????????????????",645:"Oasis",646:"??????",647:"????????",648:"Run ???????? 3",649:"?????",650:"????????",651:"????????????????????????????",652:"????????????????????????????????????????",653:"????????????????????????",654:"Login",655:"????????",656:"???????????????????????????????????????????????????????????????",700:"[3] ???????",701:"[3] + + ?????????????????????????????",702:"[6] ????????????????",703:"[6] + + ????????????????",704:"[1] ???????????????",705:"[1] + + ????????????????",706:"[4], ????????????",707:"[4] + ????????????",708:"[2] ?????????????",709:"[2] ??????? + ??????????",710:"[5] ?????????? (?????)",711:"[5] ??? + ?????????? (?????)",1001:"?????????",1002:"Praetorian",1003:"Imperian",1004:"??????????",1005:"??????????????????????",1006:"???????????????????",1007:"Taran",1008:"???????????",1009:"?????????????",1010:"Settler",1011:"HERO",1012:"Clubswinger",1013:"Spearman",1014:"Axefighter",1015:"???????",1016:"Paladin",1017:"?????????????????",1018:"ram ?????",1019:"?????????",1020:"???????",1021:"Settler",1022:"HERO",1023:"????????????",1024:"???",1025:"???????",1026:"Thunder Theutates",1027:"??????? Druid",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"?????",1032:"Settler",1033:"HERO"};
var lang_ua={1:"Про програму",2:"Фарм лист",3:"Черга фарма",4:"Настройки програми",5:"Черга споруди військ",6:"Черга дослідження військ",7:"Черга будівництва нових будинків",8:"Черга удосконалень будівель",9:"Черга знесення будівель",10:"Загальна черга замовлень",11:"Черга удосконалень військ",12:"Відведення військ",13:"Записна книжка",14:"Корисні посилання",15:"Центр села",16:"Проведення свят",17:"Торгові маршрути",18:"Продаж та закупівля рессурсов",19:"Гра на аукціоні",20:"рессурсов всіх сіл",21:"Армії всіх сіл",22:"Пересування військ всіх сіл",23:"Лог",24:"Фарм лист",25:"Черга фарма",26:"Черга замовлення військ",27:"Черга дослідження військ",28:"Черга удосконалень військ",29:"Загальна черга замовлень",30:"Відведення військ",31:"Хвилі",32:"Села",33:"рессурсов всіх сіл",34:"Армії всіх сіл",35:"Пересування військ всіх сіл",36:"Черга будівництва нових будинків",37:"Черга удосконалень будівель",38:"Черга знесення будівель",39:"Аналіз",40:"Аналітика нападів альянсу",41:"Аналіз звітів",42:"Герой",43:"Автоматична відправка героя на квести",44:"Автоматична прокачування героя на оазисах",45:"Культура",46:"Автоматичне проведення свят",47:"Торгівля та рессурсов",48:"Автобалансування рессурсов з помощю героя",49:"Автобалансування рессурсов по селах з помощю торговців",50:"Торгові маршрути",51:"Закупівля та продаж рессурсов",52:"Аукціон",53:"Гра на аукціоні",54:"Покупка потрібних речей",55:"Карта",56:"Пошук 15 і 9",57:"Пошук слабких і беззахисних",58:"Карта торгових маршрутів",59:"Карта годівниць",60:"Карта альянсу",61:"Карта ворогів",62:"Розвиток",63:"Автоматичне розвиток",64:"Проходження квестів",65:"Автоматичне розвиток нових сіл",66:"Загальне",67:"Записна книжка",68:"Про програму",69:"Настройки програми",70:"Лог програми",71:"Корисні посилання",72:"Цент села",73:"Статистика",74:"Чисельність війська",75:"Рівень розвитку рессурсов",76:"Статистика онлайну",77:"Управління",78:"Графік онлайну",79:"Графік активності",80:"Настройки відправки смс",81:"Управління через ICQ",82:"Відправити інформацію на сервер координації альянсу",83:"Вхід на сервер координації альянсу",84:"Армія",85:"Скинути",86:"Очистити",87:"Зберегти",88:"ОК",89:"Зруйнувати пізніше",90:"Настройки програми:",91:"Мова:",92:"З усіх питань звертайтеся за:",93:"Найменування",94:"Виділяти при ціні нижче",95:"Закуповувати при ціні нижче",96:"* Закупівля не реалізована і швидше за все не буде:)",97:"Мазь",98:"Сувій",99:"Клітка",100:"Запустити jQBot T4",101:"бронювати пізніше",102:"Побудувати пізніше",103:"Дослідити пізніше",104:"Створити торговий маршрут",105:"Для створення маршруту необхідно",106:"ввести координати",107:"ОК",108:"Скасувати",109:"Назва",110:"Посилання",111:"Відкривати в поточній вкладці",112:"Відкривати в новій вкладці",113:"Зупинити",114:"Послати останні в списку",115:"+ поточна",116:"Скидання всіх атак до поточного часу",117:"Скидання черги фарма",118:"Провести пізніше",119:"Зруйнувати пізніше",120:"Нове посилання",121:"Тип",122:"Підкріплення",123:"Звичайне напад",124:"Набіг",125:"Періодичність",126:"Випадкове зсув",127:"Тип атаки",128:"1 атаку",129:"2 атаки",130:"3 атаки",131:"5 атак",132:"10 атак",133:"15 атак",134:"20 атак",135:"25 атак",136:"30 атак",137:"40 атак",138:"50 атак",139:"75 атак",140:"100 атак",141:"Село",142:"Час",143:"Військо",144:"Гравець",145:"Дерево",146:"Глина",147:"Залізо",148:"Зерно",149:"Відправник",150:"Одержувач",151:"рессурсов",152:"Період",153:"Відправка в",154:"Кількість",155:"Тип замовлення",156:"Споруда",157:"Рівень",158:"Народ",159:"Період таймера подій",160:"Період сканера",161:"Загальна черга",162:"Замовляти військо якщо йде будівництво",163:"Будувати то на що вистачає рессурсов",164:"Будувати все в порядку черговості",165:"Радіус фарма",166:"веде за X секунд",167:"Відведення військ",400:"Тартак",401:"Глиняний кар'єр",402:"Залізний рудник",403:"Ферма",404:"Лісопильний завод",405:"Цегельний завод",406:"Чавуноливарний завод",407:"Млин",408:"Пекарня",409:"Склад",410:"Комора",411:"Кузня зброї",412:"Кузня обладунків",413:"Арена",414:"Головне будівлю",415:"Пункт збору",416:"Ринок",417:"Посольство",418:"Казарма",419:"Конюшня",420:"Майстерня",421:"Академія",422:"Схованка",423:"Ратуша",424:"Резиденція",425:"Палац",426:"Скарбниця",427:"Торгова палата",428:"Велика казарма",429:"Велика стайня",430:"Міська стіна",431:"Земляний вал",432:"Огорожа",433:"Каменяр",434:"Пивоварня",435:"Капканник",436:"Таверна",437:"Великий склад",438:"Великий комору",439:"Чудо світу",460:"Замовлення військ",461:"Дослідження військ",462:"Споруда",463:"Удосконалення",464:"Проведення свят",501:"Управління",502:"Настройки",503:"Допомога",504:"Набіг",505:"Підкріплення",506:"Звичайне напад",507:"Римляни",508:"Німці",509:"Галли",600:"Дані успішно збережено",601:"Завдання виконане господар",602:"Всі параметри програми скинуті",603:"Встановлено новий радіус",604:"Додана нова посилання",605:"Додано новий маршрут",606:"Помилка",607:"Дані додані в чергу",608:"Таке дослідження вже є в черзі",609:"Ця будівля вже стоїть у черзі на знесення",610:"Удосконалення і так має максимальний рівень",611:"На цій клітці вже щось будується",612:"Таке будівля вже будується в цьому селі",613:"Будівля і так буде мати максимальний рівень",614:"Повідомлення",615:"Перегенерірована чергу фарма",616:"валити то нічого",617:"Автосканування всіх сіл",618:"Відправка війська",619:"Руйнування будівель",620:"Споруда будівель",621:"Відправка торговців",622:"Рівні будівель",623:"Зовнішні переходи",624:"Швидкі переходи",625:"Автоматичний ввід логіна при збої",626:"Кнопки розвитку",627:"Це село вже є в фарм аркуші",628:"Повністю видалити з фарм аркуша",629:"Село занесена в фарм лист",630:"Сторінка jQBot T4",631:"Закрити jQBot T4",632:"Скинути параметри програми",633:"Зупинити таймер виконання подій",634:"Запустити таймер виконання подій",635:"Перегляд змінні GM",636:"Видалити змінні GM",637:"Перегляд Cookie покрокових подій",638:"Видалення Cookie покрокових подій",639:"Подивитись змінні програми",640:"Проблеми із завантаженням міні-карти, відключіть конфліктуючі програми",641:"Пошук",642:"Параметри пошуку",643:"Радіус",644:"Пошук завершений",645:"Оазиси",646:"Аукціон",647:"Села",648:"Запустіть Denver 3",649:"Координати",650:"Обновити",651:"Додати село в фарм лист",652:"Зупиняти атаки при втратах вище",653:"Зміна збережено",654:"Логін",655:"Пароль",656:"Настройки автоматичного введення логіна при збої",700:"[3]-Відправка війська",701:"[3] + Відправка війська",702:"[6]-Відправка торговців",703:"[6] + Відправка торговців",704:"[1]-Відведення армії",705:"[1] + Відведення армії",706:"[4]-рушимо будівлі",707:"[4] + рушимо будівлі",708:"[2]-Загальна черга",709:"[2] + Загальна черга",710:"[5]-Загальна черга (будівлі)",711:"[5] + Загальна черга (будівлі)",1001:"Легіонер",1002:"Преторіанец",1003:"Імперіанець",1004:"Кінний розвідник",1005:"Кіннота імператора",1006:"Кіннота Цезаря",1007:"Таран",1008:"Вогняна катапульта",1009:"Сенатор",1010:"Поселенець",1011:"Герой",1012:"Дубинник",1013:"Списник",1014:"сокирщик",1015:"Скаут",1016:"Паладін",1017:"Тевтонський вершник",1018:"Стінобитне знаряддя",1019:"Катапульта",1020:"Вождь",1021:"Поселенець",1022:"Герой",1023:"Фаланга",1024:"Мечник",1025:"Слідопит",1026:"Тевтацький грім",1027:"Друид-вершник",1028:"Едуйська кіннота",1029:"Таран",1030:"Требушет",1031:"Ватажок",1032:"Поселенець",1033:"Герой"};
var lang_vn={1:"Gi?i thi?u",2:"Danh sach trang tr?i",3:"Cac dong du?c",4:"Cai d?t ?ng d?ng",5:"Cac hang d?i dang xay d?ng quan d?i",6:"Cac nghien c?u quan d?i x?p hang ",7:"Dong xay d?ng toa nha m?i",8:"Vi?c c?i thi?n dong c?a cac toa nha",9:"Vi?c pha d? hang d?i",10:"Cac t?ng c?a t?t c? cac don d?t hang",11:"Dong c?i ti?n quan",12:"X? ly quan d?i",13:"The Notebook",14:"Lien k?t h?u ich",15:"Cac trung tam lang",16:"Th?c hi?n nh?ng ngay ngh?",17:"Tuy?n du?ng thuong m?i",18:"Cac NGU?N mua ban",19:"Tro choi du?c ban d?u gia",20:"t?t c? cac lang TAI NGUYEN",21:"Quan d?i c?a t?t c? cac lang",22:"Bi?n d?ng c?a quan d?i c?a t?t c? cac lang",23:"Dang nh?p",24:"Danh sach trang tr?i",25:"Cac dong du?c",26:"Cac hang d?i l?nh quan d?i",27:"Nghien c?u dong quan ",28:"Dong c?i ti?n quan",29:"Cac t?ng c?a t?t c? cac don d?t hang",30:"X? ly quan d?i",31:"Song",32:"Lang",33:"t?t c? cac lang TAI NGUYEN",34:"Quan d?i c?a t?t c? cac lang",35:"Bi?n d?ng c?a quan d?i c?a t?t c? cac lang",36:"Vi?c xay d?ng du?ng day c?a cac toa nha m?i",37:"Vi?c c?i thi?n dong c?a cac toa nha",38:"Vi?c pha d? hang d?i",39:"Phan tich",40:"Phan tich cac cu?c t?n cong lien minh",41:"Bao cao phan tich",42:"Anh hung",43:"T? d?ng g?i m?t anh hung tren quest",44:"t? d?ng bom mau c?a anh hung trong cac ?c d?o",45:"Van hoa",46:"t? d?ng t? ch?c l? k? ni?m",47:"Thuong m?i va NGU?N",48:"t? d?ng can b?ng v?i s? giup d? c?a TAI NGUYEN anh hung",49:"t? d?ng can b?ng TAI NGUYEN trong lang v?i s? giup d? c?a cac thuong gia",50:"Tuy?n du?ng thuong m?i",51:"Mua ban TAI NGUYEN",52:"d?u gia",53:"Tro choi du?c ban d?u gia",54:"Mua nh?ng di?u dung",55:"B?n d?",56:"Tim du?c 15 va 9",57:"Tim nh?ng y?u kem va kh? nang t? v?",58:"B?n d? cac tuy?n du?ng thuong m?i",59:"B?n d? ch?o",60:"B?n d? c?a lien minh",61:"B?n d? c?a k? thu",62:"Phat tri?n",63:"T? d?ng phat tri?n",64:"nhi?m v?",65:"T? d?ng phat tri?n lang m?i",66:"General",67:"May tinh xach tay",68:"Gi?i thi?u",69:"Cai d?t ?ng d?ng",70:"Dang nh?p ?ng d?ng",71:"Lien k?t h?u ich",72:"Trung uong Village",73:"Th?ng ke",74:"S? lu?ng quan d?i",75:"M?c d? phat tri?n TAI NGUYEN",76:"Th?ng ke tr?c tuy?n",77:"Control",78:"Cac l?ch trinh tr?c tuy?n",79:"L?ch trinh c?a ho?t d?ng",80:"Thi?t l?p tin nh?n g?i",81:"Ki?m soat qua ICQ",82:"G?i thong tin d?n may ch? di?u ph?i lien minh",83:"Dang nh?p vao may ch? di?u ph?i lien minh",84:"Quan d?i",85:"Thi?t l?p l?i ",86:"Clear",87:"Luu",88:"OK",89:"Pha h?y sau",90:"Cai d?t ?ng d?ng",91:"Ngon ng?",92:"D?i v?i b?t k? cau h?i nao, xin vui long",93:"Ten",94:"Ch?n ? m?t m?c gia th?p hon",95:"Mua ? m?t m?c gia th?p hon",96:"Mua * khong du?c th?c hi?n va s? co nhi?u kh? nang khong:)",97:"Thu?c m?",98:"Di chuy?n",99:"Cage",100:"Run jQBot T4",101:"D?t hang Sau do",102:"Xay d?ng sau",103:"Di?u tra sau",104:"tuy?n du?ng thuong m?i m?i",105:"D? t?o m?t tuy?n du?ng d?",106:"d?u vao t?a d?",107:"OK",108:"H?y b?",109:"Ten",110:"Lien k?t",111:"Open trong tab hi?n t?i",112:"Open trong tab m?i",113:"Stop",114:"G?i ngu?i cu?i cung trong danh sach",115:"+ hi?n t?i",116:"Thi?t l?p l?i t?t c? cac cu?c t?n cong cho d?n th?i di?m hi?n t?i",117:"Clear Queue Pharma",118:"Th?c ra sau do",119:"Pha h?y sau",120:"New Lien k?t",121:"Danh",122:"Gia c?",123:"Cac cu?c t?n cong binh thu?ng",124:"Cu?c d?t kich",125:"T?n s?",126:"Tinh c? d?ch chuy?n",127:"Cac lo?i t?n cong",128:"m?t cu?c t?n cong",129:"2 t?n cong",130:"3 cu?c t?n cong",131:"5 cu?c t?n cong",132:"10 cu?c t?n cong",133:"15 cu?c t?n cong",134:"20 cu?c t?n cong",135:"25 cu?c t?n cong",136:"30 cu?c t?n cong",137:"40 cu?c t?n cong",138:"50 cu?c t?n cong",139:"75 cu?c t?n cong",140:"100 t?n cong",141:"The Village",142:"Th?i gian",143:"Quan d?i",144:"c? b?c",145:"Cay",146:"D?t set",147:"s?t",148:"h?t",149:"Ten ngu?i g?i",150:"Thu",151:"TAI NGUYEN",152:"Th?i gian",153:"Send to",154:"s?",155:"L?nh go",156:"Xay d?ng",157:"C?p",158:"nhan dan",159:"Th?i gian c?a cac s? ki?n h?n gi?",160:"Th?i gian c?a may quet",161:"T?ng s? t?t c?",162:"L?nh quan d?i n?u co xay d?ng m?t",163:"Xay d?ng tren nh?ng gi la thi?u TAI NGUYEN",164:"Xay d?ng t?t c? theo th? t? uu tien",165:"Ban kinh Pharma",166:"l?y di giay X",167:"Cac dong c?a quan d?i",400:"May cua",401:"Clay Pit",402:"Iron Mine",403:"The Farm",404:"May cua",405:"lo? ga?ch",406:"Iron Works",407:"Nha may b?t mi",408:"Banh",409:"Kho",410:"The Barn",411:"Th? ren",412:"Forge Armor ",413:"Arena",414:"Nha chinh",415:"Rally Point",416:"Th? tru?ng",417:"D?i s? quan",418:"Cac tr?i linh",419:"?n d?nh",420:"H?i th?o",421:"H?c vi?n",422:"Secret",423:"Town Hall",424:"cu tru",425:"Cung di?n",426:"Kho b?c",427:"Phong Thuong m?i",428:"D?i Barracks",429:"D?i ?n d?nh",430:"Tu?ng thanh ph?",431:"Trai d?t Wall",432:"Hang rao",433:"stonemason",434:"Cac nha may bia",435:"Trapper",436:"Quan ru?u",437:"D?i Kho",438:"Big Barn",439:"Wonder c?a th? gi?i",460:"L?nh quan d?i",461:"M?t nghien c?u c?a quan d?i",462:"Xay d?ng",463:"C?i ti?n",464:"Vi?c th?c hi?n nh?ng ngay ngh?",501:"Control",502:"Tuy ch?n",503:"Tr? giup",504:"The Raid",505:"Gia c?",506:"Cac cu?c t?n cong binh thu?ng",507:"Ngu?i La Ma",508:"Ngu?i D?c",509:"Galla",600:"D? li?u luu thanh cong",601:"Nhi?m v? la lam ch?",602:"T?t c? cac ?ng d?ng cai d?t thi?t l?p l?i",603:"Cai d?t m?i ban kinh",604:"M?t lien k?t m?i",605:"Them m?t tuy?n du?ng m?i",606:"L?i",607:"Cac d? li?u them vao hang d?i",608:"Nh?ng nghien c?u da co trong hang d?i",609:"Toa nha nay da du?c x?p hang cho pha h?y",610:"C?i thi?n va do do co m?c cao nh?t",611:"Trong m?t t? bao du?c dua ra la xay d?ng cai gi do",612:"Toa nha nay dang du?c xay d?ng ? lang nay",613:"Vi?c xay d?ng va nhu v?y s? co m?c cao nh?t",614:"Truy?n thong",615:"tai t?o l?i t?t c? cac du?c",616:"D? tieu di?t la khong co gi",617:"T? d?ng quet t?t c? cac lang",618:"G?i quan",619:"Vi?c tieu h?y cac toa nha",620:"Vi?c xay d?ng cac toa nha",621:"G?i cac d?i ly",622:"M?c d? c?a cac toa nha",623:"Lien k?t ngoai",624:"Quick Links",625:"T? d?ng nh?p c?nh c?a s? th?t b?i dang nh?p",626:"Buttons Phat tri?n",627:"ngoi lang nay da co trong danh sach du?c ph?m",628:"H?y b? hoan toan t? cac t?m trang tr?i",629:"Ngoi lang du?c li?t ke trong danh sach du?c ph?m",630:"Trang jQBot T4",631:"Dong jQBot T4",632:"Thi?t l?p l?i ?ng d?ng",633:"Stop cac s? ki?n h?n gi? ch?y",634:"Run s? ki?n h?n gi? ch?y",635:"Xem cac bi?n GM",636:"H?y b? cac GM bi?n",637:"Xem Cookie c?a t?ng bu?c",638:"Lo?i b? cac Cookie c?a theo lu?t",639:"Xem cac bi?n ?ng d?ng",640:"V?n d? v?i t?i minimap, t?t chuong trinh xung d?t",641:"Tim ki?m",642:"Cai d?t Tim ki?m",643:"Ban kinh",644:"Tim ki?m d?y d?",645:"Oasis",646:"d?u gia",647:"Lang",648:"Run Denver 3",649:"T?a d?",650:"C?p nh?t",651:"Them vao trang tr?i c?a lang La",652:"D?ng l?i cac cu?c t?n cong v?i nh?ng m?t mat tren",653:"Thay d?i luu",654:"Dang nh?p",655:"m?t kh?u",656:"Thi?t l?p d?u vao c?a m?t s? th?t b?i t? d?ng dang nh?p",700:"[3]-G?i quan",701:"[3] + Vi?c g?i quan d?i",702:"[6] g?i d?i ly",703:"[6] + g?i cac d?i ly",704:"[1] Vi?c khai thac c?a quan d?i",705:"[1] + Thach th?c quan d?i",706:"[4], pha h?y cac toa nha",707:"[4] + pha h?y cac toa nha",708:"[2] T?ng c?a t?t c? cac",709:"[2] + T?ng s? c?a t?t c? cac",710:"[5] T?ng c?a t?t c? (xay d?ng)",711:"[5] + T?ng s? c?a t?t c? (xay d?ng)",1001:"Legionnaire",1002:"thuo?c ve? pha?p quan",1003:"Imperian",1004:"Ng?a trinh sat",1005:"Cac k? binh c?a hoang d?",1006:"Cac k? binh c?a Caesar",1007:"Taran",1008:"Fire Catapult",1009:"Thu?ng ngh? si",1010:"d?nh cu",1011:"Anh hung",1012:"Linh Chuy",1013:"Spearman",1014:"Axefighter",1015:"Hu?ng d?o",1016:"Paladin",1017:"Teutonic k? binh",1018:"d?p ram",1019:"Catapult",1020:"Chanh",1021:"d?nh cu",1022:"Anh hung",1023:"Phalanx",1024:"Vo Lam Truy?n K?",1025:"Pathfinder",1026:"Theutates Thunder",1027:"Druid Rider",1028:"Haeduan",1029:"Taran",1030:"Trebuchet",1031:"Lanh d?o",1032:"d?nh cu",1033:"Anh hung"};