/*
The West 
*/

// ==UserScript==
// @name           The West 
// @namespace      www.the-west.ru
// @description    the-west.ru
// @include        http://ru*.the-west.*
// @include        http://*.beta.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==



var $=aWindow.$;


// ============== The West BB-codes bar ==============

String.prototype.parseQueryString=function(){
		var vars = this.split(/[&;]/), res = [];
    for(var z in vars){
    var val=vars[z];
    var v=val.split(/=/);
    res[v[0]]=v[1];
			}
		return res;
};
//var $=unsafeWindow.$;
var loc=location.pathname;
function BBCode(textarea){
this.textarea=textarea;
}
BBCode.prototype.getText=function(){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();return range.text;}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;return this.textarea.value.substring(start,end);}
return null;};
BBCode.prototype.insertText=function(startTag,text,endTag){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();range.text=startTag+text+endTag;range=document.selection.createRange();if(insText.length==0){range.move('character',-endTag.length);}else{range.moveStart('character',startTag.length+text.length+endTag.length);}
range.select();}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;this.textarea.value=this.textarea.value.substr(0,start)+startTag+text+endTag+this.textarea.value.substr(end);var pos;if(text.length==0){pos=start+startTag.length;}else{pos=start+startTag.length+text.length+endTag.length;}
this.textarea.selectionStart=pos;this.textarea.selectionEnd=pos;}};
BBCode.prototype.addCodeTag=function(tagName){this.insertText('['+tagName+']',this.getText(),'[/'+tagName+']');};
BBCode.prototype.addExtendedCodeTag=function(description,tagName){var input=prompt(description);var text=this.getText();text=(text.length==0?prompt(('ProsД‚В­m zadej popisky pro \"%1\" BB-Code.',tagName)):text);this.insertText('['+tagName+'='+input+']',text,'[/'+tagName+']');};
BBCode.prototype.addCallbackCodeTag=function(tagName,callbackFunction){var text=callbackFunction();this.insertText('['+tagName+'='+text+']',this.getText(),'[/'+tagName+']');};

var supportedbbcodes=['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'url'];
var bbcodesstyle={'b':'0px 50%', 'i':'-20px 50%', 'u':'-40px 50%', 'del': '-60px 50%', 'player':'-80px 50%', 'town':'-100px 50%', 'fort':'-120px 50%', 'url':'-160px 50%'};
var bbcclass='profile_bb_code_image';

bbcbar=function(bbs, BBCobject){
var div=document.createElement('div');
div.style.display='inline';
var that=BBCobject;
for(var i in bbs){
var img=document.createElement('img');
img.src='images/transparent.png';
img.alt=bbs[i];
img.style.backgroundPosition=bbcodesstyle[bbs[i]];
img.className=bbcclass;
if(bbs[i]!='url')
img.addEventListener('click',function(){
that.addCodeTag(this.alt);
}, false);
else
img.addEventListener('click',function(){
that.addExtendedCodeTag('Url:', this.alt);
}, false);
div.appendChild(img);
}
return div;
};

if(loc=="/game.php"){
function addBBToMessageWindow(div2){
    if (!document.getElementById('window_messages')) return;
		var div = document.getElementById('window_messages_content').wrappedJSObject;
		var table=div.getElementById('write_table');
		var tr2=table.childNodes[1].childNodes[4];
		var tr=document.createElement('tr');
		var td=document.createElement('td');
		td.colspan='2';
		var BB=new BBCode(tr2.getElementById('text'));
		var bbbar=bbcbar(supportedbbcodes, BB);
		td.appendChild(bbbar);
		tr.appendChild(td);
		
		table.childNodes[1].insertBefore(tr, tr2);
}

function addBBToMessageReplyWindow(){
    if (!document.getElementById('window_messages')) return;
		var div = document.getElementById('window_messages_content').wrappedJSObject;
		var table=div.getElementById('tab_messages').getElementById('read_table');
		var app=table.getElementById('answer_field_row');
		var bef=table.getElementById('message_id');
		var BB=new BBCode(bef.nextSibling.nextSibling);
		var bbbar=bbcbar(supportedbbcodes, BB);		
		app.insertBefore(bbbar, bef);
}

	var o_show = aWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		addBBToMessageWindow(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
aWindow.AjaxWindow.setJSHTML = f;

	var o_show2 = aWindow.Messages.show_message;
	var f2 = function(id, page) {
		var ret = o_show2(id, page);
		window.setTimeout(addBBToMessageReplyWindow, 1000);
		return(ret);
	};
	for(var o in o_show) {
		f2[o] = o_show2[o];
	}
aWindow.Messages.show_message = f2;


}
else if(loc=="/forum.php"){
(function(){
var l=location.search.parseQueryString();
aWindow.l=l;
if(l.mode!='new_thread' && l.answer!='1')
return;
GM_addStyle('.profile_bb_code_image {background-image:url(../images/bbcodes.png);height:20px;margin:6px 1px;width:20px;}');
var tx=document.getElementsByName('message')[0].wrappedJSObject;
var BB=new BBCode(tx);
var bef=tx.parentNode.parentNode;
var tr=document.createElement('tr');
var td=document.createElement('td');
var td2=document.createElement('td');

td.appendChild(bbcbar(supportedbbcodes, BB));
//tr.appendChild(td2);
tr.appendChild(td);
bef.parentNode.insertBefore(tr, bef);
})();
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
//function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_84', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_84', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=84&version=1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();


//======================================= Buildings, Menu Shortcut Icons, Fullscreen =====================================

// удаление элемента
rezhik = function(id){
	var elem = $(id);
	if (elem){
		elem.parentNode.removeChild(elem);
	}
	else{
		setTimeout(function(){var elem = $(id); if (elem) elem.parentNode.removeChild(elem)},2500);
	}
};

// прозрачный стиль
set_style = function(id,style,value){
	var elem = $(id);
	if (elem){
		elem.style[style]=value;
	}
	else{
		setTimeout(function(){var elem = $(id); if (elem) elem.style[style]=value},2500);
	}
};

// стиль
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// время сервера и панели кнопок в head_container
function hc_fml(){
	var h_c = $('head_container');
	fm = $('footer_menu_left');
	if (!h_c||!fm) {setTimeout(hc_fml,2000);return}
	fm = fm.parentNode.removeChild(fm);
	h_c.appendChild(fm);
};

function hc_fmr(){
	var h_c = $('head_container');
	fm = $('footer_menu_right');
	if (!h_c||!fm) {setTimeout(hc_fmr,2000);return}
	fm = fm.parentNode.removeChild(fm);
	h_c.appendChild(fm);
};

function hc_fmf(){
	var h_c = $('head_container');
	fm = $('main_footnotes');
	if (!h_c||!fm) {setTimeout(hc_fmf,2000);return}
	fm = fm.parentNode.removeChild(fm);
	h_c.appendChild(fm);
};

// добавление кнопок в панели
function addFooterIcon(mylink,idname, title) {
	var head, style;
	footer_menu_left = document.getElementById('footer_minimap_icon');
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (!footer_menu_left) {return false;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	return true;
};

function addPop (id,title){
	if ($(id))
		setTimeout(function() {$(id).addMousePopup(title)},2500)
}

add_link_button = function (){
	fml = document.getElementById('footer_minimap_icon');
	if (!fml) {setTimeout(add_link_button, 2000);return;}
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith','Оружейная');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor','Портной');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general','Магазин');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel','Отель');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Банк');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church','Церковь');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician','Могильщик');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall','Мэрия');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Свой салун');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market','Рынок');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff','Шериф');

	addEndDiv('\
		if (Character.home_town == null) {\
			var footer_menu_left = document.getElementById(\'footer_minimap_icon\');\
			footer_menu_left.parentNode.parentNode.setAttribute(\'class\',\'homeless\');\
		}\
	;');
};


function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

add_link_button();
hc_fml();
hc_fmr();
hc_fmf();

// создание кнопок в панелях
addGlobalStyle('#footer_menu_left #footer_building_gunsmith, #footer_menu_left #footer_building_tailor,#footer_menu_left #footer_building_general,#footer_menu_left #footer_building_hotel,#footer_menu_left #footer_building_bank,#footer_menu_left #footer_building_church,#footer_menu_left #footer_building_mortician ,#footer_menu_left #footer_building_cityhall,#footer_menu_left #footer_building_saloon,#footer_menu_left #footer_building_market,#footer_menu_left #footer_building_sheriff {background-image:url(data:image/png;base64,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%3D%3D);}');

addGlobalStyle('#abdorment_middle {display:none;}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('#footer_building_market {background-position:-333px 0;}');
addGlobalStyle('#footer_building_sheriff {background-position:-370px 0;}');

//удаление верхнего изгиба и боковых рисунков
rezhik('abdorment_left');
rezhik('abdorment_right');
rezhik('border_cap');

//удаление обрамляющих блоков
rezhik('shadow_top');
rezhik('shadow_left_top');
rezhik('shadow_right_top');
rezhik('shadow_left_wing');
rezhik('shadow_right_wing');
rezhik('shadow_left_wing_bottom');
rezhik('shadow_right_wing_bottom');
rezhik('shadow_left_side');
rezhik('shadow_right_side');
rezhik('shadow_left_corner');
rezhik('shadow_right_corner');

// удаление бордюров карты
rezhik('main_container_border_left');
rezhik('main_container_border_right');
      //rezhik('map_border_bottom');
addGlobalStyle('#map_border_bottom{width: 100% !important; left: 0px !important;}');


// прозрачный бордюр
//set_style('head_container','background','transparent');
set_style('right_menu','background','transparent');
set_style('left_menu','background','transparent');
set_style('main_container','background','transparent');
set_style('footer_menu_left','background','transparent');
set_style('footer_menu_right','background','transparent');

// прозрачный бордюр чата 
//set_style('chatwindow_handle_corner','background','transparent');
//set_style('chatwindow_handle_corner_left','background','transparent');
//set_style('chatwindow_handle','background','transparent');
addGlobalStyle('#chatwindow{width: 100% !important; left: -6px !important;}');

//rezhik('footer_infobar');
//rezhik('window_bar');



// прозрачный бордюр боковых панелей
//set_style('workbar_left','background','transparent');
//set_style('workbar_right','background','transparent');

//удаление стрелок перемещения карты и максимума окна
rezhik('map_scroll_left');
rezhik('map_scroll_right');
rezhik('map_scroll_top');
rezhik('map_scroll_bottom');
document.getElementById('map_maximize_button').style.display='none';

// поднятие окна
set_style('main_sizer','paddingTop','0px');
set_style('head_container','paddingTop','0px');

// поднятие панелей кнопок и ширина панели
//addGlobalStyle('#footer_menu_left{width: 650px !important; top: 490px !important; left: 80px !important;}');
//addGlobalStyle('#footer_menu_right{width: 160px !important; top: 490px !important; right: 80px !important;}');

set_style('footer_menu_left','width','650px');
set_style('footer_menu_left','marginTop','115px');
set_style('footer_menu_left','marginLeft','70px');

set_style('footer_menu_right','width','210px');
set_style('footer_menu_right','marginTop','115px');
set_style('footer_menu_right','marginRight','70px');


//set_style('head_background','height','94px');
//set_style('head_container','height','94px');
//set_style('main_container','height','500px');
//set_style('main_container_position','paddingTop','0px');
//set_style('main_container','paddingTop','0px');
//set_style('main_container_position','marginTop','0px');


// Время сервера
addGlobalStyle('#main_footnotes{position:absolute !important; top:53px !important; left:-50% !important; margin-left:109px !important;}');

// current_task_box окно сообщения
addGlobalStyle('#current_task_box{position:absolute !important; top:68px !important;}');

rezhik('shadow_bottom');

set_style('main_container','marginLeft','0px');
set_style('main_container','marginRight','0px');
set_style('map_place','marginLeft','0px');
set_style('map_place','marginRight','0px');
set_style('main_sizer','marginLeft','0px');
set_style('main_sizer','marginRight','0px');
set_style('head_background','marginLeft','0px');
set_style('head_background','marginRight','0px');
set_style('left_menu','marginLeft','10px');
set_style('right_menu','marginRight','10px');
set_style('character_info','marginLeft','60px');
set_style('character_money','marginRight','130px');

// левая боковая панель
set_style('workbar_left','marginTop','40px');
addGlobalStyle('#workbar_left{height: 254px !important; width: 75px !important}');
set_style('wb_task_0','marginLeft','0px');
set_style('wb_task_1','marginLeft','0px');
set_style('wb_task_2','marginLeft','0px');
set_style('wb_task_3','marginLeft','0px');

// правая боковая панель
set_style('workbar_right','marginTop','40px');
addGlobalStyle('#workbar_right{height: 254px !important; width: 75px !important}');
set_style('wb_task_4','marginright','0px');
set_style('wb_task_5','marginright','0px');
set_style('wb_task_6','marginright','0px');
set_style('wb_task_7','marginright','0px');

// окно мини карты
addGlobalStyle('#minimap_container{top:137px !important; left:28px !important;}');



//===============================================================

//aa=document.getElementById('screensizer').children;
//for (j=0;j<aa.length;++j) { if (aa[j].nodeName==='DIV') break};
//aa[j].parentNode.removeChild(aa[j]);


//addGlobalStyle('#scroll_to_fort_list{top:46px !important; left:0px !important; background-color:#FFFFFF; background-image:url(../images/main/footer.png); border:1px solid #000000; position:absolute; text-align:center; width:150px; z-index:11; bottom:-300px}');
//addGlobalStyle('#main_container{height:auto !important;}');

//======================================= MENU =====================================

var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

// Weststats
var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
if(actual_region=="en"){
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://ru.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}
else
{
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://ru.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}


// Информер - заменить
//var inv_val = document.createElement("li");
//inv_val.id="inv_val";
//inv_val.innerHTML = '<a style="background:url(http://s47.radikal.ru/i116/0906/26/a650eecf0f72.png) no-repeat" href="http://west-informer.ucoz.ru" target="_blank"></a>';

// Ссылка на сборку квестов
var upd_scr = document.createElement("li");
upd_scr.id="upd_scr";
upd_scr.innerHTML = '<a href="http://userscripts.org/scripts/show/82472" target="_blank" style=background-image:url(data:image/png;base64,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);\" title=\"Обновить сборку скриптов от: ПоросячийКот\"></a>';

// добавляем меню "Лево" под "Дуэль"
var menu_duel = document.getElementById('menu_duel');
if (menu_duel) {
	menu_duel.parentNode.insertBefore(weststats_link, menu_duel.nextSibling);
}

// добавляем меню "Право" под "Настройки"
var menu_settings = document.getElementById('menu_settings');
if (menu_settings) {
        //menu_settings.parentNode.insertBefore(inv_val, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(upd_scr, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(publish_duel, menu_settings.nextSibling);
}

//=======================================Positions =====================================

var resourceBundle = "{'center.popup':'Показать на карте'};";

function init() {
	var that = this;
	
	Tasks.generate_queue_xhtml_centerJobs = Tasks.generate_queue_xhtml;
	Tasks.generate_queue_xhtml = function(options) {
		var table = Tasks.generate_queue_xhtml_centerJobs(options);
		if(Tasks.tasks.length > 0) {
			var lastPos = Tasks.last_pos;
			var workingCoords = new Array();
			for(var i=0; i < Tasks.tasks.length; i++){
				var obj = Tasks.tasks[i];
				if(obj.type == 'way'){
					lastPos = {x:obj.data_obj.to_x, y:obj.data_obj.to_y};
				} else {
					workingCoords.push(lastPos);
				}
			}
			var tds = $ES('td', $E('tr', table));
			for(var i=0; i < workingCoords.length; i++){
				var td = tds[i];
				var div = $E('div', td);
				
				var center = new Element('img',{title:'',src:'images/icons/center.png',styles:{position:'absolute',top:'5px',left:'63px', width:'20px', cursor:'pointer'}});
				center.addMousePopup(new MousePopup(that.resourceBundle['center.popup'],100,{opacity:0.9}));
				center.addEvent('click',function(pos){
					WMap.scroll_map_to_pos(pos.x, pos.y);
				}.bind(this, [workingCoords[i]]));
				center.injectInside(div);
			}
		}
		return table;
	}	
}


var centerJob_script = document.createElement('script');
centerJob_script.type='text/javascript';
centerJob_script.text =  'if(window.CenterJob == undefined) {\n';
centerJob_script.text += '  window.CenterJob = new Object();\n';
centerJob_script.text += '  CenterJob.init = ' + init.toString() + '\n';
centerJob_script.text += '  CenterJob.resourceBundle = ' + resourceBundle + ';\n';
centerJob_script.text += '  CenterJob.init();\n';
centerJob_script.text += '}';
document.body.appendChild(centerJob_script);

//======================================= Duel ===================================== aWindow

(function(){
	var doc = document;
	var console = aWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i).textContent;
		}
		return(ar);
	}

	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	function trim(str) {
		s = str.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function whiteSpaceRemove(str) {
		s = str.replace(/\s+/g,' ');
		s = s.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function antirtrim(str,num) {
		for (istr = str.length; istr<num; istr++)
			str = str + ' ';
		return str;
	}

	function convertTitle(title, player1, player2){
		var p1 = player1.split("\n");
		var p2 = player2.split("\n");
		p1_name = trim(p1[1]);
		p2_name = trim(p2[2]); //изменил [1] - [2]
		var p1_level = parseInt(p1[2],10);
		var p2_level = parseInt(p2[5],10); //изменил [2] - [5]
		var p1_dlevel = parseInt(p1[3],10);
		var p2_dlevel = parseInt(p2[6],10); //изменил [3] - [6]
		title = title.replace(p1_name,p1_name+' ('+p1_level+'/'+p1_dlevel+')');
		title = title.replace(p2_name,p2_name+' ('+p2_level+'/'+p2_dlevel+')');
		title = title.replace(' Удалить »)','');

		return title;
	}
	function convertHits(hits1, hits2) {
		var hits = antirtrim(p1_name,30)+p2_name+'\n';
		reg = new RegExp(".*: (.*)");
		for (i=0; i<hits1.length;i++) {
			if ((hits1[i].indexOf(':') != -1) || (i == hits1.length-1)) {
				if (hits1[i].indexOf(':') != -1) {hits1[i] = whiteSpaceRemove(hits1[i]).split(reg)[1];} else {hits1[i] = whiteSpaceRemove(hits1[i]);}
				if (hits1[i].indexOf('-') != -1){hits1[i] = hits1[i].substr(0,hits1[i].lastIndexOf(' '));}
				} else {
					hits1[i] = whiteSpaceRemove(hits1[i]);
					}
			if ((hits2[i].indexOf(':') != -1) || (i == hits2.length-1)) {
				if (hits2[i].indexOf(':') != -1) {hits2[i] = whiteSpaceRemove(hits2[i]).split(reg)[1];} else {hits2[i] = whiteSpaceRemove(hits2[i]);}
				if (hits2[i].indexOf('-') != -1){hits2[i] = hits2[i].substr(0,hits2[i].lastIndexOf(' '));}
				} else {
					hits2[i] = whiteSpaceRemove(hits2[i]);
					}

			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3 || i == hits1.length-2) {hits += '\n';}
			}
	return hits+'\n';
	}
	function convertFlashHits(hits) {
		hits_pom = hits.split('|');
		var hits1_dmg = new Array();
		var hits1_int = new Array();
		var hits1 = new Array();
		var hits2 = new Array();
		var hits2_dmg = new Array();
		var hits2_int = new Array();
		for (i=0; i<8; i++) {
			hits2_dmg[i] = hits_pom[i];
		}
		for (i=8; i<16; i++) {
			hits1_dmg[i-8] = hits_pom[i];
		}
		for (i=16; i<24; i++) {
			hits1_int[i-16] = hits_pom[i];
		}
		for (i=24; i<32; i++) {
			hits2_int[i-24] = hits_pom[i];
		}
		n = 8;
		hits = '';
		hits1[8] = 0;
		hits2[8] = 0;
		for (i = 0; i<n; i++) {
			if (hits1_dmg[i] < 0 || hits2_dmg[i]<0) {n=i;}
			hits1_dmg[i] = Math.abs(hits1_dmg[i]);
			switch (hits1_int[i]) {
				case '1': {hits1[i] = 'Голова - '+hits1_dmg[i]; break;}
				case '2': {hits1[i] = 'Левое плечо - '+hits1_dmg[i]; break;}
				case '3': {hits1[i] = 'Правое плечо - '+hits1_dmg[i]; break;}
				case '4': {hits1[i] = 'Левая рука - '+hits1_dmg[i]; break;}
				case '5': {hits1[i] = 'Правая рука - '+hits1_dmg[i]; break;}
				default:  {hits1[i] = 'Мимо';}
			}
			if (hits1_dmg[i] == 0) {hits1[i] = 'Мимо';}
			hits1[8] += hits1_dmg[i];
			hits2_dmg[i] = Math.abs(hits2_dmg[i]);
			switch (hits2_int[i]) {
				case '1': {hits2[i] = 'Голова - '+hits2_dmg[i]; break;}
				case '2': {hits2[i] = 'Левое плечо - '+hits2_dmg[i]; break;}
				case '3': {hits2[i] = 'Правое плечо - '+hits2_dmg[i]; break;}
				case '4': {hits2[i] = 'Левая рука - '+hits2_dmg[i]; break;}
				case '5': {hits2[i] = 'Правая рука - '+hits2_dmg[i]; break;}
				default:  {hits2[i] = 'Мимо'; break;}
			}
			if (hits2_dmg[i] == 0) {hits2[i] = 'Мимо';}
			hits2[8] +=hits2_dmg[i];
			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3) {hits += '\n';}
		}
		if (hits1[8] != 0) {hits1[8] = 'Суммарный урон - '+hits1[8];} else {hits1[8] = 'Всё мимо';}
		if (hits2[8] != 0) {hits2[8] = 'Суммарный урон - '+hits2[8];} else {hits2[8] = 'Всё мимо';}
		hits += '\n'+antirtrim(hits1[8],30)+hits2[8]+'\n\n';
		return hits;
	}
	
	function convertDuelReport(div) {
		var x = {};
		x.title = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);

                // защитник 
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
                
                // место дуэли
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);

                // нападающий
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);

		var time = whiteSpaceRemove(trim(x.title.textContent).substring(trim(x.title.textContent).indexOf('\n')));
		var loc = whiteSpaceRemove(trim(x.loc.textContent).replace('\n',':'))+' ('+time+')\n\n';
		var title = convertTitle(loc, x.p1.textContent, x.p2.textContent); //+'\n';

		if (div.innerHTML.indexOf('<span style="font-size: 12px; font-weight: bold;">') != -1) {
			x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
			x.p1hits = xp('./tr/td[1]', x.hitsBody);
			x.p2hits = xp('./tr/td[3]', x.hitsBody);
			x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
			
			var hits = convertHits(x.p1hits,x.p2hits);
			var outcome = whiteSpaceRemove(x.outcome.textContent).replace(/\. /g,'.\n');
			} else {
				var x = document.getElementsByName('movie')[0].attributes; 
				var y = x.getNamedItem("value"); 
				var hits = y.value;
				hits = convertFlashHits(hits.substring(hits.indexOf('=')+1,hits.indexOf('&')));
				var outcome = y.value;
				outcome = whiteSpaceRemove(outcome.substring(outcome.lastIndexOf('=')+1)).replace(/\. /g,'.\n');
				}
		ttt = outcome.indexOf('не заработал');
		if (ttt===-1)
			ttt = outcome.indexOf(', и') + 2;
		out2 = outcome.substring(0,ttt);
		out3 = outcome.substring(ttt);
		outcome = out2+'\n'+out3;
		var aim=new Array();dodge=new Array();var duel = aWindow.Duel.getInstance();
		for (ii=1;ii<5;++ii){
			if (duel&&duel.dodge) {dodge[ii]=duel.dodge[ii]};
			if(duel&&duel.aim){aim[ii]=duel.aim[ii]}
		};
		out_duel='';
		if (aim[1]&&dodge[1]){
			out_duel = '\n\nПрицелы:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (aim[ii]){
				case 'rightarm':
					ta='Правая рука';
					break;
				case 'rightshoulder':
					ta='Правое плечо';
					break;
				case 'head':
					ta='Голова';
					break;
				case 'leftshoulder':
					ta='Левое плечо';
					break;
				case 'leftarm':
					ta='Левая рука';
					break;
				default:
					ta = 'Неопределено';
				}
				out_duel+=ta+'\n';
			}
			out_duel += '\nУвороты:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (dodge[ii]){
				case 'left':
					ta='Влево';
					break;
				case 'right':
					ta='Вправо';
					break;
				case 'duck':
					ta='Приседание';
					break;
				case 'aim':
					ta='Стойка';
					break;
				default:
					ta = 'Неопределено';
				}
				out_duel+=ta+'\n';
			}
		}
                // ВЫВОД
		code = '[code]'+title+hits+outcome+out_duel+'[/code]';
		div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Дуэль:/))
			return;
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: " ",
							title: "Конвертировать в текстовый формат",
							style: "background-image: url('data:image/png;base64,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'); background-position: -1px 0px 0px 0px; border: none; width: 83px; height: 25px; cursor: pointer;"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = aWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	aWindow.AjaxWindow.setJSHTML = f;
	
})();


//======================================= Motivation =====================================

// Мотивация

/*
	Eine Veraenderung, Weitergabe oder sonstige Veroeffentlichung dieses Scripts oder Teilen davon bedarf einer schriftlichen Genehmigung des Autors. 
	Das Copyright liegt beim Autor.
*/

function getMoCheckVersion() {
	return "3.3.3";
}

function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'ru3':
		case 'ru4':
		case 'ru5':
		case 'ru6':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:162062},\'162062\');';
			break;
		default:
			hrefStr = 'http://the-west.ru/';
	}
	return MoCheck.getString('author') + '&nbsp;<a href=\"' + hrefStr + '\">Simp1e</a>';
}

function isMinVersion(a, b) {
	var result = true;
	a = a.replace(/\./g, "");
	b = b.replace(/\./g, "");
	for (var i = 1; i <= Math.max(a.length, b.length); i++) {
		var z1 = parseInt(a.length >= i ? a[i-1] : "0");
		var z2 = parseInt(b.length >= i ? b[i-1] : "0");
		var res = "ok";
		if(z1 > z2) {
			break;
		}
		if(z1 < z2) {
			result = false;
			break;
		}
	}
	return result;
}

function init() {
	MoCheck.resourceBundle = {
		'dialog.closeAll.popup':'Закрыть все окна',
		'dialog.minimize.popup':'Свернуть все окна',
		'dialog.close.popup':'Закрыть окно',

		'dialog.tab.work.titel':'Работы',
		'dialog.tab.work.nothingSelected.1':'Вы не выбрали ни одну работу!',
		'dialog.tab.work.nothingSelected.2':'Для занесения в список, откройте необходимую вам работу и нажмите плюс.',
		'dialog.tab.work.tableHeader.work':'Работа',
		'dialog.tab.work.tableHeader.points':'Трудовые очки',
		'dialog.tab.work.tableHeader.points.popup':'Отображенные трудовые очки, не изменяются при<br />переодевании, для измения перезапустите окно Мотивация.',
		'dialog.tab.work.tableHeader.wages':'Заработок',
		'dialog.tab.work.tableHeader.experience':'Опыт',
		'dialog.tab.work.tableHeader.luck':'Удача',
		'dialog.tab.work.tableHeader.motivation':'Мотивация',
		
		'dialog.tab.configuration.titel':'Конфигурация',
		'dialog.tab.configuration.availableColumns':'Выберите список:',
		'dialog.tab.configuration.actual':'текущий',
		'dialog.tab.configuration.btnDelete':'Удалить',
		'dialog.tab.configuration.btnRename':'Переименовать',
		'dialog.tab.configuration.btnNew':'Новый',
		'dialog.tab.configuration.visibleColumns':'Видимые столбцы в этом списке:',
	
		'select.option.minutes':'минут',
		'select.option.hour':'час',
		'select.option.hours':'часа',
		
		'btnOk.label':'Ok',
		'btnAdd.popup':'Добавить работу в список',
		'btnCenter.popup':'Показать работу на карте',
		'btnDelete.popup':'Удалить работу из списка',
	
		'message.error.unableToDeleteCurrentList':'Текущий список не может быть удален.',
		'message.deleteList':'Вы действительно хотите удалить список %1?',
		'message.newName':'Название нового списка:',
		'message.addedWork':'Работа добавлена.',
		'message.deleteFromList':'Вы действительно хотите удалить работу %1 из списка?',
		'message.listLoaded':'Список %1 загружен.',
		'message.listDeleted':'Список %1 удален.',
		'message.listRenamed':'Список переименован.',
		'message.listCreated':'Список создан.',
		'message.error.nameAlreadyDefined': 'Название %1 уже используется.',
		
		'author':'Перевел:'
	};
	MoCheck.cookieName = 'motScript';
	MoCheck.cookieSplitter = '/*.';
	MoCheck.oldCookieName = 'moScript';
	
	MoCheck.Job = new Class({
		pos:null,
		initialize:function(x,y){
			this.pos={x:x,y:y};
		},
		getKey:function() {
			return this.pos.x + '_' + this.pos.y;
		},
		start:function() {
			var select=$E('select',this.window);
			var duration=select?parseInt(select.value):0;
			new Ajax('game.php?window=job&action=start_job&h='+h,{
				method:'post',
				data:{x:this.pos.x,y:this.pos.y,duration:duration},
				onComplete:function(data){
					data=Json.evaluate(data);
					Tasks.replace_all(data.task_queue);
					if(data.energy)Character.set_energy(data.energy);
					if(data.energy)Character.set_energy(data.energy);
					if(this.fast_job)$E('.startWork',this.window).style.display='none';
					this.button.activate();
					if(data.error){
						new HumanMessage(data.error);
					} else {
						Tasks.highlightLast();
					}
				}.bind(this)
			}).request();
			return true;
		}
	});
	
	MoCheck.user = $('avatar').innerHTML.substring($('avatar').innerHTML.toLowerCase().indexOf('</div>')+6, $('avatar').innerHTML.length);
	MoCheck.world = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 5);
	
	this.listen = new Array();
	this.arbeiten = new Object();
	this.columnVisibility = new Object();
	
	MoCheck.ColumnVisibility = new Class({
		wages:true,
		experience:true,
		luck:true,
		motivation:true,
		initialize:function(wages,experience,luck,motivation){
			this.wages = false;
			this.experience = false;
			this.luck = false;
			this.motivation = true;
		},
		show_wages:function(){return this.wages;},
		show_experience:function(){return this.experience;},
		show_luck:function(){return this.luck;},
		show_motivation:function(){return this.motivation;},
		toString2:function(){return '' + Number(this.wages) + Number(this.experience) + Number(this.luck) + Number(this.motivation);},
		count:function(){return Number(this.wages) + Number(this.experience) + Number(this.luck) + Number(this.motivation);}
	});
	
	this.getCookie();
	//this.addMotivationButton();
	this.resetSortOrder();
	
	AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
		AjaxWindow.setJSHTML_Motivation(div,content);
		if(div && div.id) {
			if(div.id.search(/window_job/) != -1) {
				var splt = div.id.split("_");
				var aktJob = MoCheck.createJob(new MoCheck.Job(splt[2], splt[3]));
				
				var isNewJob = (MoCheck.getAktArbeiten().filter(function(job, index){
				    return (job.pos.x == aktJob.pos.x) && (job.pos.y == aktJob.pos.y);
				})).length == 0;
	
				if(isNewJob) {
					var btnAdd = new Element('img',{title:'', src:'img.php?type=button&subtype=normal&value=plus', styles:{cursor:'pointer', 'margin-left':'20px'}});
					btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));
					
					btnAdd.addEvent('click',function(){
						$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
						this.remove();
						MoCheck.getJobInfoFromDiv(div.id, aktJob);
						MoCheck.addArbeit(div.id, aktJob);
					});
					
					btnAdd.injectInside($ES('h2', div)[0]);
				}
			}
		}
	}
}

function divInject(div,content) {
	div.empty();
	content.inject(div);
}

/*
 * Erstellt einen TW-Job
 */
function createJob(arbeit) {
	var job = new MoCheck.Job(arbeit.pos.x, arbeit.pos.y);
	job.getKey = function() {
		return this.pos.x + '_' + this.pos.y;
	};
	return job;
}

/*
 * Liefert die Arbeiten einer Liste
 */
function getArbeiten(listenName) {
	if(this.arbeiten[listenName] == null) {
		this.arbeiten[listenName] = new Array();
		this.listen.push(listenName);
	}
	return this.arbeiten[listenName];
}

function setArbeiten(arbeiten) {
	this.arbeiten = $defined(arbeiten) ? arbeiten : new Object();
}

/*
 * Liefert die Arbeiten der aktuellen Liste
 */
function getAktArbeiten() {
	return this.getArbeiten(this.getAktListe());
}

/*
 * Liefert die aktuellen Liste
 */
function getAktListe() {
	if(this.aktListe == undefined || this.aktListe == null || this.aktListe == '') {
		alert("DEBUG_INFO (getAktListe()): this.aktListe nicht definiert. Darf nicht vorkommen!");
	}
	return this.aktListe;
}

function setAktListe(aktListe) {
	this.aktListe = $defined(aktListe) ? aktListe : 'default';
}

/**
 * Setzt die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 * @columnVisibility als Object, z.B. {'column1':Bool, 'column2':Bool, 'column3':Bool};
 */
function setColumnVisibility(columnVisibility, listenName) {
	listenName = $defined(listenName) ? listenName : this.getAktListe();
	this.columnVisibility[listenName] = columnVisibility;
}

/*
 * Liefert die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 */
function getColumnVisibility(listenName) {
	listenName = $defined(listenName) ? listenName : this.getAktListe();
	var result = $defined(this.columnVisibility[listenName]) ? this.columnVisibility[listenName] : new MoCheck.ColumnVisibility(true, true, true, true);
	return result;
}


function isColumnVisible(column) {
	return eval('this.getColumnVisibility().show_' + column + '()');
}

function changeColumnVisibility(obj) {
	var cols2 = MoCheck.getColumnVisibility();
	eval('cols2.' + obj.name + '=' + obj.checked + ';');
	this.setColumnVisibility(cols2);
	MoCheck.setCookie();
	
	window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));
}

function initMoJobs() {
	var that = this;
	$each(this.listen, function(liste, index) {
		$each(that.arbeiten[liste], function(arbeit, index) {
			that.arbeiten[liste][index] = that.createJob(arbeit);
			
		});
	});
	if(AjaxWindow.windows['motivation'] != null) {
		MoCheck.getJobInfoFromServer(0);
	}
}

function resetSortOrder(){
	this.jobSortBy = 'motivation';
	this.jobSortType = 'desc';
}

function loadData(data) {
	data = Json.evaluate(data);
	
	this.columnVisibility = new Object();
	if($defined(data.columnVisibility)) {
		$each(data.columnVisibility, function(colStr, liste) {
			var columnVisibility = new MoCheck.ColumnVisibility(Boolean(Number(colStr[0])), Boolean(Number(colStr[1])), Boolean(Number(colStr[2])), Boolean(Number(colStr[3])));
			MoCheck.setColumnVisibility(columnVisibility, liste);
		});
	}
	
	this.setAktListe(data.aktListe);
	this.setArbeiten(data.arbeiten);
	this.reloadListen();
	this.initMoJobs();
}

/*
 * Ermittelt die verwendeten Listen
 */
function reloadListen() {
	this.listen = new Array();
	for (liste in this.arbeiten) {
		if(this.arbeiten[liste].length > 0) {
			this.listen.push(liste);
		}
	}
}

function sortArbeiten() {
	var that = this;
	this.getAktArbeiten().sort(function sortAsc(a, b){
		a = eval('a.' + that.jobSortBy);
		b = eval('b.' + that.jobSortBy);
		if(that.jobSortType == "asc") {
			return a > b ? 1 : a < b ? -1 : 0;
		} else {
			return a < b ? 1 : a > b ? -1 : 0;
		}
	});
}

function changeSortOrder(sortBy) {
	if(this.jobSortBy == sortBy) {
		this.jobSortType = this.jobSortType == 'asc' ? 'desc' : 'asc';
	} else {
		this.jobSortBy = sortBy;
		this.jobSortType = 'desc';
	}
	MoCheck.printResults();
};

/*
 * Liest alle Informationen zur aktuellen Arbeit und speichert sie in dieser
 * => Hat 'MoCheck.getAktArbeiten()' eine weitere Arbeit?
 		Ja: Server-Anfrage, Informationen auslesen, danach rekursiv naechste Arbeit
 		Nein: Rekusionsabbruch, weiter zu 'printResults()'
 */
function getJobInfoFromServer(jobIndex) {
	if(jobIndex < MoCheck.getAktArbeiten().length) {
		var aktArbeit = MoCheck.getAktArbeiten()[jobIndex];
		
		new Ajax('game.php?window=job&x='+aktArbeit.pos.x+'&y='+aktArbeit.pos.y,{
			method:'post',
			data:{},
			onComplete:function(data) {
				data=Json.evaluate(data);
				if(data.page != undefined){
					var page = data.page;
					var js = data.js;
					
					/* Temporaeren DIV erstellen */
					//alert(data.page);
					var divId = 'myJob_' + aktArbeit.getKey();
					var window_div = new Element('div',{'id':divId});
					window_div.setHTML(data.page);
					window_div.injectInside('window_bar');
					
					//alert(js);
					
					/* Informationen auslesen */
					MoCheck.getJobInfoFromDiv(divId, aktArbeit);
					
					/* Temporaeren DIV wieder loeschen */
					var trashvar = $(divId);
					trashvar.empty();
					trashvar.remove();
					Garbage.trash([trashvar]);
					
					/*  Rekursiver Aufruf mit naechster Arbeit */
					MoCheck.getJobInfoFromServer(++jobIndex);
				}
			}
		}).request();
	} else {
		AjaxWindow.windows['motivation'].isReady = true;
		MoCheck.printResults();
	}
}

/**
 * Job-Informationen aus einem Job-Div auslesen
 */
function getJobInfoFromDiv(divId, job) {
	/*
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.wages = parseInt($ES('.bar_perc', divId)[0].innerHTML);
	job.experience = parseInt($ES('.bar_perc', divId)[1].innerHTML);
	job.luck = parseInt($ES('.bar_perc', divId)[2].innerHTML);
	job.motivation = parseInt($ES('.bar_perc', divId)[4].innerHTML);
	job.arbeitspunkte = parseInt($ES('.skill_box_value', divId)[2].innerHTML);
	
	------------------------
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.experience = parseInt($ES('.barValue')[0].innerHTML);
	job.wages = parseInt($ES('.barValue')[1].innerHTML);
	//job.luck = parseInt($ES('.percent')[0].getStyle('width'));
	job.luck = 0;
	job.motivation = parseInt($ES('.barValue')[4].innerHTML);
	job.arbeitspunkte = $E('.laborValue').innerHTML;
	
	*/
	
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.motivation = parseInt($E('.barValue', $E('.jobMotivation', divId)).innerHTML);
	job.experience = 0;
	job.wages = 0;
	job.luck = 0;
	job.arbeitspunkte = parseInt($E('.laborValue', divId).innerHTML);
}

/**
 * Motivations-Button zu Menu hinzufuegen
 */

//function addMotivationButton() {
//	var menuElem = new Element('li',{'id':'menu_motivation'});
//	var moBtn = new Element('a',{'title':'Открыть окно Мотивации', 'class':'button_wrap button', 'style':'white-space:nowrap;', href:'javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');'}); 
//	moBtn.innerHTML = ' <span style="display:inline; float:left; width:22px; height:23px; background-image: url(\'../images/job/motivation.png\');"></span>' +
//					  '	<span class=\"button_middle\" style="display:inline; width:0px; height:25px; float:left; background-image: url(\'../images/button/left_normal.png\');"></span>' +
//					  '	<span class=\"button_middle\" style="display:inline; float:left; width:79px; background-image: url(\'../images/button/middle_normal.png\');">Мотивация</span>' +
//					  '	<span class=\"button_right\" style="display:inline; width: 9px; height:25px; float:left; background-image: url(\'../images/button/right_normal.png\');"></span>';
//	moBtn.injectInside(menuElem);
//	menuElem.injectAfter($('menu_forts'));
//}

//===========
// рисунок мотивации
var moBtn = document.createElement("li");
moBtn.id="moBtn";
                     // href:'javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');'
moBtn.innerHTML = '<a href="javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');" style=background-image:url(data:image/png;base64,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%3D);\" title=\"Открыть окно Мотивации\"></a>';

//moBtn.innerHTML = '<a href="http://userscripts.org/scripts/show/82472" target="_blank" style=background-image:url(data:image/png;base64,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%3D);\" title=\"Открыть окно Мотивации\"></a>';
// добавляем меню "Право" под "Форты"
var menu_forts = document.getElementById('menu_forts');
if (menu_forts) {
	menu_settings.parentNode.insertBefore(moBtn, menu_forts.nextSibling);
}
//===========

/**
 * Oeffnet ein leeres AjaxWindow
 * @windowName
 * @group Vordefinierte Gruppe zum Minimieren, muss aus "AjaxWindow.possibleValues" sein
 */
function openMotivationWindow(windowName, group) {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
	
	if(!AjaxWindow.windows[windowName]){
		var window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
		AjaxWindow.windows[windowName]=window_div;
		var xhtml = '<div class="window_borders">';
		xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
		xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.close(\''+windowName+'\');" class="window_close"></a>';
		xhtml += '  <div id="window_' + windowName + '_content" class="window_content" style="position:absolute; top:20px">';
		xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
		xhtml += '      <span style="position:absolute; right:72px; top:10px;" id="moAktListInfo">&nbsp;</span>';
		xhtml += '      <ul class="tabs">' +
				 '        <li class="active" id="mojob.tab.arbeiten" onclick="MoCheck.showTab(\'moWorkList\');">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' + 
				 '        <li id="mojob.tab.konfiguration" onclick="MoCheck.showTab(\'moConf\');">' + MoCheck.getString("dialog.tab.configuration.titel") + '</li>' + 
				 '      </ul>';
		xhtml += '    	<table class="shadow_table">';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_top_left"></td>';
		xhtml += '    			<td class="border_shadow_top"></td>';
		xhtml += '    			<td class="edge_shadow_top_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="border_shadow_left"></td>';
		xhtml += '    			<td class="shadow_content">';
		xhtml += '    				<div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 380px; position: relative;" id="moWorkList"></div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 380px; position: relative; display:none;" id="moConf"></div>';
		xhtml += '    				</div>';
		xhtml += '    			</td>';
		xhtml += '    			<td class="border_shadow_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
		xhtml += '    			<td class="border_shadow_bottom"></td>';
		xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    	</table>';
//		xhtml += '      <span style="position:absolute; right:22px; top:19px;">' + MoCheck.getAuthor() + '</span>';
		xhtml += '    </div>';
		xhtml += '  </div>';
		xhtml += '</div>';
		xhtml += '</div>';
		window_div.setHTML(xhtml);
		window_div.injectInside('windows');
		window_div.centerLeft();
		$ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
		$ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
		$ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
		var window_title_div=$('window_' + windowName + '_title');
		window_div.makeDraggable({handle:window_title_div});
		window_title_div.addEvent('dblclick',function(){
					window_div.centerLeft();
					window_div.setStyle('top',133);
				});
		AjaxWindow.bringToTop(window_div);
		window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
		window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
		
		var throbber=get_throbber();
		throbber.addClass('window_throbber_wrapper');
		throbber.injectInside($('moWorkList'));
		
		MoCheck.getJobInfoFromServer(0);
	} else {
		AjaxWindow.maximize(windowName);
	}
}

function doConfiguration(cmd, selectId) {
	var msg = '';
	var selectedListe = $(selectId).options[$(selectId).selectedIndex].value;
	
	switch(cmd) {
		case 'loadListe':
			this.setAktListe(selectedListe);
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.arbeiten[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			this.addListe(newName);
			this.setAktListe(newName);
			msg = MoCheck.getString('message.listCreated', newName);
			break;
		case 'deleteListe':
			if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
				MoCheck.deleteListe(selectedListe);
				msg = MoCheck.getString('message.listDeleted', selectedListe);
			}
			break;
		case 'renameListe':
			var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
			if(newName != null || newName.length == 0) {
				return;
			}
			if($defined(this.arbeiten[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			this.arbeiten[newName] = this.arbeiten[selectedListe];
			this.arbeiten[selectedListe] = null;
			//ggf. aktListe neu setzen
			if(this.aktListe == selectedListe) {
				this.aktListe = newName;
			}
			msg = MoCheck.getString('message.listRenamed');
			break;
	}
	
	//Aenderungen speichern
	//TODO es muss nicht jedesmal neu geladen werden...
	this.setCookie();
	this.getCookie();
	
	/* ggf. Nachricht anzeigen */
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

/* Ermittelt die Position der letzten Arbeit */
function getLastWorkPos() {
	last_work_pos = {x:pos.x,y:pos.y};
	for(var i=Tasks.tasks.length-1; i >= 0; i--) {
		if(Tasks.tasks[i].type == 'way') {
			last_work_pos={x:Tasks.tasks[i].data_obj.to_x,y:Tasks.tasks[i].data_obj.to_y};
			break;
		}
	}
	return last_work_pos;
}

/**
 * Eine Arbeit der Liste hinzufuegen
 */
function addArbeit(divId, job) {
	//Arbeit in Array aufnehmen
	MoCheck.getAktArbeiten().splice(0, 0, job);
	
	//Arbeit ggf. in Tabelle anzeigen
	if($defined(AjaxWindow.windows['motivation']) && AjaxWindow.windows['motivation'].isReady) {
		MoCheck.printResults();
	}
	
	//Arbeit in Cookie speichern
	this.setCookie();
	
	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/**
 * Eine Arbeit aus der Liste entfernen
 */
function deleteArbeit(x, y) {
	$each(MoCheck.getAktArbeiten(), function(aktArbeit, index) {
		if(x == aktArbeit.pos.x && y == aktArbeit.pos.y) {
			
			if(confirm(unescape(MoCheck.getString('message.deleteFromList', aktArbeit.name)))) {
				//Arbeit aus Array entfernen
				MoCheck.getAktArbeiten().splice(index, 1);
				
				//Arbeit aus Cookie loeschen
				MoCheck.setCookie();
				
				//Arbeit-Liste neu laden
				MoCheck.printResults();
			}
		}
	});
}

function addListe(name, arbeiten, columnVisibility) {
	this.listen.push(name);
	this.arbeiten[name] = $defined(arbeiten) ? arbeiten : new Array();
	this.columnVisibility[name] = $defined(columnVisibility) ? columnVisibility : new MoCheck.ColumnVisibility(true, true, true, true);
}

function deleteListe(name) {
	this.listen.splice(this.listen.indexOf(name), 1);
	this.arbeiten[name] = null;
	this.columnVisibility[name] = null;
	
	if(name == this.getAktListe()) {
		if(this.listen.length > 0) {
			this.setAktListe(MoCheck.listen[0]);
		} else {
			this.setAktListe('default');
		}
	}
}

/*
 * Arbeiten werden aus Platzgruenden etwas komprimiert gespeichert:
 * version/aktListe/liste1*x.y*x.y*x.y/liste2*x.y*x.y   usw.
 */
function getCookie() {
	var cookieVersion = "0";
	var data = "{}";
	
	if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
		var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
		data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
		
		data = unescape(data);
		
		var cookieElements = data.split(MoCheck.cookieSplitter[0]);
		cookieVersion = cookieElements[0];
		var aktListe = cookieElements[1];
		
		/* Arbeiten importieren */
		var arbeiten = '';
		var columnVisibility = '';
		for(var i=2; i < cookieElements.length; i++) {
			/* Aktuelle Liste in Json-Format bringen */
			var currList = '';
			var listElements = cookieElements[i].split(MoCheck.cookieSplitter[1]);
			var listenName = listElements[0];
			
			/* Sichtbare Spalten (Ab Version 1.1.3) */
			var coordsStartIndex = 1;
			var cols = "1111";
			if(this.isMinVersion(cookieVersion, "1.1.3")) {
				cols = listElements[1];
				coordsStartIndex = 2;
			}
			columnVisibility += (columnVisibility == '' ? '' : ',') + '"' + listenName + '":' + '"' + cols + '"';
			
			/* Coords der Arbeiten */
			for(var j = coordsStartIndex; j < listElements.length; j++) {
				/* Aktuelle Arbeit in Json-Format bringen */
				var coords = listElements[j].split(MoCheck.cookieSplitter[2]);
				var aktArbeit = '{"pos":{"x":"'+coords[0]+'","y":"'+coords[1]+'"}}';
				currList += (currList == '' ? '' : ',') + aktArbeit;
			}
			currList = '"' + listenName + '": [' + currList + ']';
			arbeiten += (arbeiten == '' ? '' : ',') + currList;
		}
		data = '{"aktListe":"' + aktListe + '", "arbeiten":{' + arbeiten + '}, "columnVisibility": {' + columnVisibility + '}}';
	}
	MoCheck.loadData(data);

	//ggf. Cookie direkt in neuer Version speichern
	if(!this.isMinVersion(cookieVersion, this.getMoCheckVersion())) {
		this.setCookie();
	}
	/* ggf. Arbeiten aus aelterer Version loeschen */
	if (document.cookie.indexOf(MoCheck.oldCookieName) != -1)  {
		document.cookie = MoCheck.oldCookieName + "=; expires=0";
	}
}

function setCookie() {
	/* Arbeiten exportieren */
	var exportArbeiten = '';
	for (liste in this.arbeiten) {
		//Leere Listen werden nicht gespeichert
		if(this.arbeiten[liste] != null && this.arbeiten[liste].length > 0) {
			var aktListe = '';
			var arbeiten = this.getArbeiten(liste);
			
			$each(arbeiten, function(arbeit, index) {
				var aktArbeit = arbeit.pos.x + MoCheck.cookieSplitter[2] + arbeit.pos.y;
				aktListe += (aktListe == '' ? '' : MoCheck.cookieSplitter[1]) + aktArbeit;
			});

			exportArbeiten +=  MoCheck.cookieSplitter[0] + liste + MoCheck.cookieSplitter[1] + this.getColumnVisibility(liste).toString2() + MoCheck.cookieSplitter[1] + aktListe;
		}
	}
	var data = MoCheck.getMoCheckVersion() + MoCheck.cookieSplitter[0] + MoCheck.aktListe + exportArbeiten;
	data = escape(data);
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));//1 Jahr

	document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}

function getString(key, param) {
	var str = $defined(MoCheck.resourceBundle[key]) ? MoCheck.resourceBundle[key] : key;
	
	if($defined(param)) {
		if (!(param instanceof Array)) { param = new Array(param); }
		for(var i=0; i<param.length; i++) {
			str = str.replace('%'+(i+1), param[i]);
		}
	}
	return str;
};

function showTab(tab) {
	var showMoTab = (tab == 'moWorkList');
	$('moWorkList').setStyle('display', showMoTab ? 'block' : 'none');
	$('moConf').setStyle('display', !showMoTab ? 'block' : 'none');
	if(showMoTab) {
		$('mojob.tab.arbeiten').addClass('active');
		$('mojob.tab.konfiguration').removeClass('active');
	} else {
		$('mojob.tab.arbeiten').removeClass('active');
		$('mojob.tab.konfiguration').addClass('active');
	}
}

function setWayTimeInfo(aktJob) {
	var lastWorkPos = (aktJob == null ? MoCheck.getLastWorkPos() : {x:aktJob.pos.x, y:aktJob.pos.y});
	
	$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
		/* Entfernungs-Hinweis */
		var wayTime = WMap.calcWayTime(lastWorkPos, aktJob.pos);
		var el = $ES('a', $('window_Mojob_' + aktJob.getKey()));
		el.addMousePopup(new MousePopup(wayTime.formatDuration(), 100,{opacity:0.9}));
		el.setStyle('border', ((wayTime > 60 * 30) ? '1px solid red' : ''));
	});
}

function getFillBar(value) {
	//Verfuegbar: 300px für bis zu 4 Spalten (Lohn, Erfahrung, Glueck, Motivation)
	var cWidth = 300; // ширина бара мотивации
	var visibleCounter = MoCheck.getColumnVisibility().count();
	
	if(visibleCounter > 0) {
		cWidth = cWidth / visibleCounter;
	}
	
	return 	'<div class="bar" style="width:' + eval(cWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width:'+(value * (cWidth/100))+'px"></div>'+
				'<div class="bar_perc" style="width:'+cWidth+'px">'+value+'%</div>'+
			'</div>';
}

function getMoListenSelect(id) {
	var onChangeTxt = 'onChange="MoCheck.doConfiguration(\'loadListe\', id)"';
	
	var moListen = '<select id="' + id + '" size="1" style="width:200px" ' + onChangeTxt + '>';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';
	return moListen;
}

function getConfigurationTab() {
	var id = "moConfListen";
	return '<div style="padding:5px">' +
			'	<span><h4>' + MoCheck.getString('dialog.tab.configuration.availableColumns') + '</h4>' +
					this.getMoListenSelect(id) + 
					'<br /><br />' +
					MoCheck.getButton("dialog.tab.configuration.btnDelete", 'MoCheck.doConfiguration(\'deleteListe\', \'' + id + '\')', false) +
					MoCheck.getButton("dialog.tab.configuration.btnRename", 'MoCheck.doConfiguration(\'renameListe\', \'' + id + '\')', false) +
					MoCheck.getButton("dialog.tab.configuration.btnNew", 'MoCheck.doConfiguration(\'newListe\', \'' + id + '\')', false) +
			'	</span><br />' +
			/*
			'	<span><br /><h4>' + MoCheck.getString('dialog.tab.configuration.visibleColumns') + '</h4>' +
					MoCheck.getCheckbox('wages') + 
					MoCheck.getCheckbox('experience') + 
					MoCheck.getCheckbox('luck') + 
					MoCheck.getCheckbox('motivation') + 
			'	</span>' +
			*/
			'</div>';
}

function getButton(resString, js, deactivated) {
	var href = deactivated ? '' : 'href=\"javascript:' + js + ';\"';
	var btnClass = (deactivated ? 'button_grey' : 'button');
	var xhtml = '<a class=\"button_wrap '+btnClass+'\" '+href+' >' +
			 '  <span class=\"button_left\"></span><span class=\"button_middle\">' + MoCheck.getString(resString) + '</span><span class=\"button_right\"></span>' +
			 '  <span style=\"clear: both;\"></span>' +
			 '</a>';
	return xhtml;
}

function getCheckbox(id) {
	var resString = 'dialog.tab.work.tableHeader.' + id;
	var checked = this.isColumnVisible(id) ? 'checked="checked"' : '';
	var xhtml = '<input type="checkbox" name="' + id + '" value="' + id + '" onChange="MoCheck.changeColumnVisibility(this);" ' + checked + '>' + MoCheck.getString(resString) + '<br />';
	return xhtml;
}

/*
 * Stellt zu allen Arbeiten die ausgelesenen Informationen dar
 */ 
function printResults() {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
	
	MoCheck.sortArbeiten();
	
	if(MoCheck.getAktArbeiten().length > 0) {
		window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));
	
		/* Buttons aktivieren */
		$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
			//aktJob.window muss neu geladen werden, da zum Zeitpunkt der Variableninitialisierung noch nichts da war
			aktJob.window = $('window_Mojob_' + aktJob.getKey());
			
 			aktJob.button = new Button('ok', 'normal', 'button_start_task_Mojob_'+aktJob.getKey(), aktJob.start.bind(aktJob));
 			
			/* Nach jedem Klick neu Laden */
			aktJob.button.el.addEvent('click',function(){
				MoCheck.setWayTimeInfo(aktJob);
			});
		});
		MoCheck.setWayTimeInfo();
	} else {
		$('moWorkList').innerHTML = 
				"<div style='text-align:center;'><br />" +
				"	<h2>" + MoCheck.getString('dialog.tab.work.nothingSelected.1') + "</h2><br />" +
					MoCheck.getString('dialog.tab.work.nothingSelected.2') +
				"</div>";
	}
	
	window.addEvent('domready', AjaxWindow.setJSHTML.bind(AjaxWindow,[$('moConf'), MoCheck.getConfigurationTab()]));
	window.addEvent('domready',function(){
		$('moAktListInfo').innerHTML = MoCheck.getMoListenSelect("moWorkListen");
	});
}

function insertCell(id, html, row) {
	if(MoCheck.isColumnVisible(id)) {
		var cell = new Element('td');
		cell.innerHTML = html;
		cell.injectInside(row);
	}
}

/*
 * Eigentlicher Seiteninhalt
 */
function getTable() {
	var table=new Element('table', {'class':'table border', styles:{'width':'100%'}});
	var tbody=new Element('tbody');
	var th = new Element('tr', {styles:{'text-align':'center'}});
	th.injectInside(tbody);
	
	var thName = new Element('th', {styles:{width:'80px'}});
	thName.innerHTML = MoCheck.getString('dialog.tab.work.tableHeader.work');
	thName.injectInside(th);
	
	var thPunkte = new Element('th', {styles:{'cursor':'help'}});
	thPunkte.innerHTML = MoCheck.getString('dialog.tab.work.tableHeader.points');
	thPunkte.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.work.tableHeader.points.popup'),100,{opacity:0.9}));
	thPunkte.injectInside(th);
	
	if(MoCheck.isColumnVisible('wages')) {
		var thLohn = new Element('th');
		thLohn.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"wages\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.wages') + "</a>";
		thLohn.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('experience')) {
		var thEP = new Element('th');
		thEP.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"experience\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.experience') + "</a>";
		thEP.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('luck')) {
		var thLuck = new Element('th');
		thLuck.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"luck\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.luck') + "</a>";
		thLuck.injectInside(th);
	}
	
	if(MoCheck.isColumnVisible('motivation')) {
		var thMo = new Element('th');
		thMo.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"motivation\");'>"+MoCheck.getString('dialog.tab.work.tableHeader.motivation')+"</a>";
		thMo.injectInside(th);
	}
	
	var thc4 = new Element('th');
	thc4.innerHTML = "&nbsp;";
	thc4.injectInside(th);
	
	for(var i=0; i < MoCheck.getAktArbeiten().length;i++){
		var aktArbeit = MoCheck.getAktArbeiten()[i];
		
		var tr=new Element('tr', {'id': 'window_Mojob_' + aktArbeit.getKey(), styles:{'text-align':'center'}});
		var cName=new Element('td'); MoCheck.getJobImageTable(aktArbeit).injectInside(cName);cName.injectInside(tr);
		
		
		var cPunkte=new Element('td');	
		cPunkte.innerHTML = '<span class="calculation_visualisation img_equal">' +
							'<span class="skill_box_value'+(aktArbeit.arbeitspunkte <= 0? " red_text" : "")+'">' + aktArbeit.arbeitspunkte + '</span></span>';
		cPunkte.injectInside(tr);
		
		
		if(MoCheck.isColumnVisible('wages')) {
			var cLohn=new Element('td');
			cLohn.innerHTML = MoCheck.getFillBar(aktArbeit.wages);
			cLohn.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('experience')) {
			var cEP=new Element('td');
			cEP.innerHTML = MoCheck.getFillBar(aktArbeit.experience);
			cEP.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('luck')) {
			var cLuck=new Element('td');
			cLuck.innerHTML = MoCheck.getFillBar(aktArbeit.luck);
			cLuck.injectInside(tr);
		}
		
		if(MoCheck.isColumnVisible('motivation')) {
			var cMo=new Element('td');
			cMo.innerHTML = MoCheck.getFillBar(aktArbeit.motivation);
			cMo.injectInside(tr);
		}
		
		var aktJobId = aktArbeit.getKey();
		var selectWork = 
			'<select name=\'job_task_time\' style=\'vertical-align:top;\'>' +
			'	<option value=\'600\'>10 ' + MoCheck.getString("select.option.minutes") + '</option>' +
			'	<option value=\'1800\'>30 ' + MoCheck.getString("select.option.minutes") + '</option>' +
			'	<option value=\'3600\'>1 ' + MoCheck.getString("select.option.hour") + '</option>' +
			'	<option value=\'7200\' selected>2 ' + MoCheck.getString("select.option.hours") + '</option>' +
			'</select>' +
			'<span id=\'button_start_task_Mojob_' + aktJobId + '\'>' +
			'	<a class=\'button_wrap button\' href=\'#\' >' +
			'		<span class=\'button_left\'></span><span class=\'button_middle\'>' + MoCheck.getString("btnOk.label") + '</span><span class=\'button_right\'></span>' +
			'		<span style=\'clear: both;\'></span>' +
			'	</a>' +
			'</span>';
		var c4 = new Element('td', {styles:{'white-space':'nowrap'}});
		c4.innerHTML = selectWork;
		c4.injectInside(tr);
		
		tr.injectInside(tbody);
	}


	tbody.injectInside(table);
	return table;
}

function getJobImageTable(aktArbeit) {
                //значёк работы
		var image_div=new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px'}});
		var image=new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}}); 
		image.addMousePopup(new MousePopup(aktArbeit.name,250,{opacity:0.9}));
		image.injectInside(image_div);
		
		var center = new Element('img',{title:'',src:'images/icons/center.png',styles:{position:'absolute',top:'3px',left:'44px',cursor:'pointer'}});
		center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup'),100,{opacity:0.9}));
		center.addEvent('click',function(){
			WMap.scroll_map_to_pos(parseInt(aktArbeit.pos.x), parseInt(aktArbeit.pos.y));
		});
		center.injectInside(image_div);

		var btnDelete = new Element('img',{title:'',src:'images/icons/cancel.png',styles:{position:'absolute',top:'22px',left:'42px',cursor:'pointer', width:'20px'}});
		btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
		btnDelete.addEvent('click',function(){
			MoCheck.deleteArbeit(aktArbeit.pos.x, aktArbeit.pos.y);
		});
		btnDelete.injectInside(image_div);
	return image_div;
}

//var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow', 

var moFunctions = ['init', 'openMotivationWindow', 
					'getCookie', 'setCookie',
					'getArbeiten', 'setArbeiten',
					'getAktListe', 'setAktListe',
					'addListe', 'deleteListe',
					'getColumnVisibility', 'setColumnVisibility',
					'isColumnVisible',
					'getAktArbeiten',
					'getMoCheckVersion', 'isMinVersion',
					'getString', 'showTab', 'createJob', 'getJobInfoFromServer', 'getJobInfoFromDiv', 
					'initMoJobs', 'resetSortOrder', 'loadData', 'divInject', 'sortArbeiten', 'changeSortOrder', 'printResults', 
					'setWayTimeInfo', 'getTable', 'getFillBar', 'getConfigurationTab', 'getButton', 'getCheckbox', 'doConfiguration', 'getJobImageTable', 'getLastWorkPos', 
					'addArbeit', 'deleteArbeit', 'reloadListen', 'getMoListenSelect', 'changeColumnVisibility', 'insertCell', 'getAuthor'];

var moCheck_script = document.createElement('script');
moCheck_script.type='text/javascript';
moCheck_script.text =  'if(window.MoCheck == undefined) {\n';
moCheck_script.text += '  window.MoCheck = new Object();\n';

for (var i = 0; i< moFunctions.length; i++) {
	var moFunction = moFunctions[i];
	moCheck_script.text += '  MoCheck.' + moFunction + ' = ' + eval(moFunction.toString()) + '\n';
};
moCheck_script.text += '  MoCheck.init();\n';
moCheck_script.text += '}';
document.body.appendChild(moCheck_script);



/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today=new Date();GM_setValue('muUpdateParam_116',String(today));}function CheckForUpdate(){var lastupdatecheck=GM_getValue('muUpdateParam_116','never');var updateURL='http://www.monkeyupdater.com/scripts/updater.php?id=116&version='+getMoCheckVersion();var today=new Date();var one_day=24*60*60*1000;if(lastupdatecheck!='never'){today=today.getTime();var lastupdatecheck=new Date(lastupdatecheck).getTime();var interval=(today-lastupdatecheck)/one_day;if(interval>=1){update(updateURL);}}else{update(updateURL);}}CheckForUpdate();


// ============ The West Notepad ==========
// The West Notepad
// version 2.1.0 relaseCandidat - no compatibility with next versions guaranteed.
// Copyright (C) 2009 The West Help Group <shulik@tw-help.net>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Notepad
// @namespace      www.tw-help.net
// @description    Adds usefull function - notepad.
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==

var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
var loc=world.replace(/[0-9]*?$/, "");
var lang={};
lang.mainmenu={};
lang.valid={};
switch(loc){
case "cz":
case "sk":
lang.mainmenu.title="Poznamkovy blok";
lang.mainmenu.savednotes="Ulozene poznamky";
lang.mainmenu.nonotes="Zatim nebyla ulozena zadna poznamka.";
lang.mainmenu.nonotes2="Zatim nebyla ulozena zadna poznamka_2_.";
lang.writenew="Pridat novou poznamku";
lang.edit="Upravit poznamku";
lang.title="Titulek";
lang.text="Text";
lang.save="Ulozit";
lang.valid.text="Musite vyplnit text poznamky";
lang.valid.title="Musite vyplnit titulek poznamky";
lang.del="Smazat";
lang.edit="Upravit";
lang.restart_confirm="Opravdu chcete vymazat veskere poznamky?";
lang.name="Poznamky";
break;
default:
lang.mainmenu.title="Заметки";
lang.mainmenu.savednotes="Сохранённые заметки";
lang.mainmenu.nonotes="Вы не сохранили ни одной заметки.";
lang.mainmenu.nonotes2="Вы не сохранили ни одной заметки_2_.";
lang.writenew="Добавить новую заметку";
lang.edit="Редактировать заметку";
lang.title="Заголовок";
lang.text="Текст";
lang.save="Сохранить";
lang.valid.text="Вы должны ввести текст заметки";
lang.valid.title="Вы должны ввести названиие заметки";
lang.del="Удалить";
lang.edit="Редактировать";
lang.restart_confirm="Вы хотите удалить все заметки";
lang.name="Заметки";
break;
}
var notes=GM_getValue(world+"notes", false);
if(notes){
notes=notes.split("|");
}


function $(B) {
    if (!B) {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if ([window, document].contains(B)) {
        return B;
    }
    var A = $type(B);
    if (A == "string") {
        B = document.getElementById(B);
        A = B ? "element" : false;
    }
    if (A != "element") {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if (["object", "embed"].contains(B.tagName.toLowerCase())) {
        return B;
    }
    $extend(B, Element.prototype);
    B.htmlElement = function () {};
    return Garbage.collect(B);
}
function $ES(A, B) {
    return ($(B) || document).getElementsBySelector(A);
}
									
function NotepadShow(name, data){
var extendeName = name;
var params_str='';
if(!aWindow.AjaxWindow.windows[extendeName]){
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://s51.radikal.ru/i132/0908/2a/430ac8db0641.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:10px;right:10px;" id="tw_help_notepad_write_new"><img src="http://i062.radikal.ru/0909/81/eb2f9e47eac3.png" alt="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img" /></div></div>';xhtml+='</div>';

//оригинал Заголовка блокнота - http://tw-help.ic.cz/img/gm_notepad_title.png (выше)   (title)
//орининал кнопки создания сообщения (в виде желтого планшета) -    http://tw-help.ic.cz/img/gm_notepad.png
// (tw_help_notepad_write_new)   

var window_div=new aWindow.Element('div',{'id':'window_'+extendeName,'class':'window'});
window_div.innerHTML=xhtml;
aWindow.AjaxWindow.windows[extendeName]=window_div;
aWindow.AjaxWindow.bringToTop(window_div);
aWindow.AjaxWindow.windows[extendeName]=aWindow.document.getElementById('windows').appendChild(window_div);
aWindow.window_div=window_div;
	window_div.centerLeft();
aWindow.document.getElementById('tw_help_notepad_write_new_img').addEventListener('click', WriteNewNote, false);
				      
aWindow.document.getElementById(window_div.id);
var window_title_div=aWindow.document.getElementById('window_'+extendeName+'_title');
window_title_div.addEventListener('dblclick',function(){window_div.centerLeft();window_div.setStyle('top',133);}, false);
aWindow.document.getElementById('window_'+extendeName).makeDraggable({handle:window_title_div,onStart:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(i in el){el[i].setStyle('display','block');}}},onComplete:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(var i in el){el[i].setStyle('display','none');}}}});
window_div.addEventListener('mousedown',aWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
window_title_div.addEventListener('mousedown',aWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
}else{aWindow.AjaxWindow.maximize(extendeName);}
aWindow.AjaxWindow.windows[extendeName].isReady=true;
}


					
function openNotepadMainMenu(){
var mainmenu='<div style="float:left;"><h3>'+lang.mainmenu.savednotes+':</h3><table class="shadow_table"><tbody><tr><td class="edge_shadow_top_left"/><td class="border_shadow_top"/><td class="edge_shadow_top_right"/></tr><tr><td class="border_shadow_left"/><td class="shadow_content"><div><div style="overflow-y: auto;overflow-x: hidden;height:335px;width:auto;"><table class="table border" id="tw_help_show_notes" style="width:590px;"></table></div></div></td><td class="border_shadow_right"/></tr><tr><td class="edge_shadow_bottom_left"/><td class="border_shadow_bottom"/><td class="edge_shadow_bottom_right"/></tr></tbody></table>';
NotepadShow("tw_help_notepad", mainmenu);
showNotesTable('tw_help_show_notes');
}

function openNotepadNote(id){
var note=GM_getValue(world+"note_"+id).replace(/\n/g, "<br />");
var title=GM_getValue(world+"title_"+id);
var text="<div style='padding:10px;margin:0px auto;width:420px;border:black 2px double;'><h2 style='text-align:center;'>"+title+"</h2><br /><br />"+note+"</div>";
NotepadShow("tw_help_notepad_note", text);
}

function writeNote(){
var data='';
var title="";
var text="";
var window_title=lang.writenew;
if(arguments.length>0){
var uprid=arguments[0];
title=GM_getValue(world+'title_'+uprid);
text=GM_getValue(world+'note_'+uprid);
window_title=lang.edit;
}
data+="<h2 style='text-align:center;'>"+window_title+"</h2><br /><strong>"+lang.title+"</strong><br /><input type='text' id='tw_help_edit_note_title' value='"+title+"' maxlength='20' /><br /><strong>"+lang.text+"</strong><br /><textarea style='width:550px;height:275px;' id='tw_help_edit_note_text'>"+text+"</textarea><br /><button type='button' id='tw_help_edit_note_button'>"+lang.save+"</button>";
if(uprid){
data+="<input type='hidden' value='"+uprid+"' id='tw_help_edit_note_uprid' />";
}
NotepadShow('tw_help_edit_note', data);
aWindow.document.getElementById('tw_help_edit_note_button').addEventListener('click', saveNote, false);
}

function saveNote(){
var edited=aWindow.document.getElementById('tw_help_edit_note_uprid') ? aWindow.document.getElementById('tw_help_edit_note_uprid').value : false;
var id=edited===false ? getFirstId() : edited;
var ids=GM_getValue(world+'notes', false);
var text=aWindow.document.getElementById('tw_help_edit_note_text').value;
var title=aWindow.document.getElementById('tw_help_edit_note_title').value;
if(!text){
alert(lang.valid.text);
return;
}
if(text==="tw-help({restart_notes;});"&&confirm(lang.restart_confirm)){
GM_setValue(world+"notes", false);
aWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
return;
}
if(!title){
alert(lang.valid.title);
return;
}
if(edited===false){
if(ids===false)
ids=id+"|";
else {
ids=ids.split("|");
ids.push(id);
ids.sort(sortNumber);
ids=ids.join("|");
}
ids=ids.replace(/^\|/, "").replace(/\|$/, "");
GM_setValue(world+"notes", ids);
}
GM_setValue(world+"title_"+id, title);
GM_setValue(world+"note_"+id, text);
aWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
}

function getFirstId(){
var ids=GM_getValue(world+'notes', false);
if(ids===0 || ids==='0')
ids="nullla";
if(ids==false){
return "0";
}
ids=ids.replace(/nullla/, "0");
ids=ids.split("|");
var old;
for(var i in ids){
if(old||old===0){
if(ids[i]-1!=old)
return ids[i]-1;
}
old=ids[i];
}
return parseInt(ids[i])+1;
}

function sortNumber(a,b){
return a - b;
}

function WriteNewNote(){
writeNote();
}

function editNote(ev){
var id=this.className;
writeNote(id);
}

function deleteNote(){
var id=this.className;
var ids=GM_getValue(world+"notes");
ids=ids.split("|");
var i=0;
while(ids[i]!=id){
i++;
}
ids.splice(i, 1);
GM_setValue(world+"notes", ids.join("|").replace(/\|$/, ""));
showNotesTable('tw_help_show_notes');
}

function showNotesTable(update, controls){
if(!controls){
controls=true;
}
var tbody=document.createElement('tbody');
var notes=GM_getValue(world+"notes", false);
var z=0;
if(notes||notes===0){
notes=notes.split("|");
}
else{
notes[0]=false;
}
for(z=0;notes[z]||notes[z]===0;z++){
var s=notes[z];
var gmv=GM_getValue(world+'note_'+s).replace(/\n/g, "");
if(gmv.length>50){               // было 27
gmv=gmv.substr(0,50)+"...";     // было 27
}
var a=document.createElement('a');
a.href="#";
a.innerHTML=GM_getValue(world+'title_'+s);
a.addEventListener('click', function(){openNotepadNote(s);return false;}, false);
var tr=document.createElement('tr');
tr.id='tw_help_notepad_note_'+s;
var td1=document.createElement('td');
td1.style.width="180px";  
td1.appendChild(a);
var td2=document.createElement('td');
td2.innerHTML=gmv;
td2.style.width="305px";
tr.appendChild(td1);
tr.appendChild(td2);
if(controls){
var td3=document.createElement('td');
td3.style.width="75px";
var del=document.createElement('img');
del.src="http://tw-help.ic.cz/img/cross.png";
del.alt=lang.del;
del.style.cursor="pointer";
del.style.width="25px";
del.style.height="25px";
del.className=s;
del.addEventListener('click', deleteNote, false);
var edit=document.createElement('img');
edit.src="http://tw-help.ic.cz/img/gm_notepad_edit.png";
edit.alt=lang.edit;
edit.style.cursor="pointer";
edit.style.width="25px";
edit.style.height="25px";
edit.className=s;
edit.addEventListener('click', editNote, false);
td3.appendChild(del);
td3.appendChild(edit);
tr.appendChild(td3);
tr.appendChild(td3);
}
tbody.appendChild(tr);
}
if(z===0){
var tr=document.createElement('tr');
tr.innerHTML="<td>"+lang.mainmenu.nonotes+" </td>";
tbody.appendChild(tr);
}
aWindow.document.getElementById(update).innerHTML='';
aWindow.document.getElementById(update).appendChild(tbody);
}


var notes_img=aWindow.document.createElement('img');
notes_img.src='http://s05.radikal.ru/i178/0908/d4/faf6b97b3e29.png';  // 10 шрифт
//http://i079.radikal.ru/0908/58/c4a40b3260ef.png - 12 шрифт
//notes_img.src='http://tw-help.ic.cz/img.php?type=pmenu&value='+lang.name;  - оригинал
notes_img.alt=lang.name;
notes_img.style.cursor="pointer";
notes_img.addEventListener("click", openNotepadMainMenu, false);

var m_d=aWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);

//====================================== BEST ITEMS ====================================

// скорость лошадей = ОКРУГЛ(100/(100+%);4)

// создание кнопки сундучка в панеле
addFooterIcon('javascript:pk2_show_panel();','footer_building_BEST_ITEMS','Переодевалка');
addGlobalStyle('#footer_menu_left #footer_building_BEST_ITEMS {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAABKCAYAAAA8PJ2MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAWyElEQVR42qyae4wd133fPzPnzOvO3PfukrskxcfSFCmJsqQocqzEQqE6jYs2SWOpieVIsZ0aCQI0LWq0VdQ6TYMkUI0EAfrIH0WFJLZkJXEkwy3c2JEt2xJdKXpbL1ISKZLL5b73vufOe+b0j7m8FK1HZVUD7F6Ce/fM9/5+53wfv1ntG3/5r/lRriASqu8L/EgjClP8QRfTEABUKuXrXBNmZioa7/GS7/aNq9umGiQt1tc22e5ts7G+xqi7SRL7AJiWR7U1R82KqVZncKpKzXgFVyy6VDxde19BXQCzdOZ1Hvn+39LZWgGgXq2ye36GuYYLgB/pdNZOc7I7xLRtWs0Wcwu7ObOl2D+rqSMHLNyqqf3IoP7hJ/5o+u8H//xOdX5bsrKR8tC3/4JzZ05y1RVHuOWOn+fw5fvYs1ADIM2C8jUJybKY7taIE6fWeeK5ZU69fpaac57l/dewvLbNtUcs9Rt3/tkU2Nttnbes1IP3fE4tdWc5duy7PPLIMS7b/wH+8Pf/OT9+/VEMs8JotE4RZ5f8zsnXe4yDiH7f59lnXmXXjhl+5u8d4HuPr7F0/GmKdouuX+P37vp1deSAxS2f/c/aN//q37w7UA/e8zn10vkaDz/017x0/ASfvu1jfPpTvzAFEwy7BEEHw3RYOtdlc6vPxlaP9Y0ujx97rFwkz3jtxKtce92v8Wt37ODxJ0/x6JMb9IC/ezEhSxy451+qt2vnJaD+1xd/Sz13xubhh77BS8dP8Duf/03+wc03EI4HRHFZnSDocH5lzMuvHqfTGfHE/3mMOAypuRY7aiaG1Fgf6ixvjjl1epkk2clNP3WUdqvK1x/dJIoivv98hGkqFi+bV/Xmm4FdAurMluAHzz31JkBJOALgsSde4pt/8x3Onl7CdUxqrsXepiSvewhdQ9MgVxpCxZiGZDAMJoWLufLwPIVW528eOVmu9WJExekA7TcBm4J67bylTi91eeSRY3z6to9NAT315HOcXlrjuaee4+zSCq6pc3ChhioKenIH1WIDKTQMoZMD5AUAlgShT5bXDPIi5ejlFaKgwXee6jPqbvLk8zE33WAiZfWSVk5BDTvbPPzt73BocQ+3f/If843//U3+5L99kTzPWWhVaHsGl++sAGAIDRDIfBNd6khdQ6EjKcjQkULHMQV5UR4GIXTy3CBXcPSq/SytnefcOZ8zZ1dY3GNjmSZu1ZxWSgdYWxup5bURq2sb3HbbP0EaBl/52jEWmjZ7ZlzqjkAXGoVevmq6hhAatiWpWALT0LGkQtdAAFleIISO0CWmKafAAGzL4Cc+WKXZrALwymvrDEY+g16iLgG15dd54cXnObS4hw9dvUAUD9k5N0OSFRhSQwodUwoqhobUNXRdB01HCshySNKCJFPkuSLJCuIcpNSxbIltWdMKlBUrmNtR59C+BqblcX5jTKc7IohiwiBWAHrgF2p1c8TKRoePfPgoplOliDN2zlUx5eTT2QaGIZCCsk0CpK7IsoKiKFCFIk5ywiRnfZDQGaUIvdTBQhVvyUU751zaszP4QcL6apfByKfIy22lD0Zjxt1TABw+fIAkHJFmAYcO7sYydaqOxJA6pq6hlI4pdbKsIE4KoiSnM0pY6cUsdyLWBwlxofOzH7mMkR+QZwV59tagPM+k7SU4QtH3E/qDlGEYl6B6vmCrm1MxTfbvtqeyIYRA1zQypaPyjKRQ5EVBXhRESUGY5GwOUwZBRl4oahWDJC1ozHkUFYuj1+zm+AsvEkYxa+v5m0AZusWunU2EZeFHgjyPiMOENM2UDIKc3mBMu13DMB3SJATArdgkablYoOmkWUya5vQmIBxTkGQFR6+/jFOvbXPz318s3xumvHKqQ7PhACHfP/YU111/NWla58D+JhCT5zlycu5NyyOICsIoI4oTkqgoNzqAZ+RTQACGlPT8lO4o4fT6mLVeBKbB7EKDP/kvP89P/6MrOHjFPFvrI6Iox7YE33r4dT56016yKCMMUm68fhdCjrj/vgdY3xqQZTF5XpDl5UFr1I3p/eI4JQgT0jxDXqiGUuUbs6zsq6YrBkGCaRq4ps7P/cJR9uyq8eDXjgNwxeUz08p45wa4FZOfvPEylld9bvjx3Tz74jpuxcSpGCwemqXiWJxZCtg1fxFIodXf1NYszy9WKtbqU0AlKMFVVx1GqILP/OoNnFke8OjfLfPb//YmAB5/coU9u2rsWajxMzcf4PTZPr6fsLU9pt10uP3Wqzjx2jY7ZirYpuSP/vhPefGFE7z8So8818kyCIIcSw0AiJLJjZVANw1Bs+4SDjsMe6OpVkmtxJsXBTvmXI4cbHH91TsZ+RFP/2CN18/1+NjN+xkHJZCrrpjF80y6/YgTr20z8hOOHJrh7LkBH/mJPexpO7z01JOMxxG9fk6al2w/SgRJ7GObkCQlJYhf/Nmr/+Pp1YSN7S6L+1rMzTZQRc441JjbOcvffu85VpeHfPTmA7xyskN/ENOo27iOwdLykBdObLF8fki9avKTN+wiTRUVR/LtR8+yerpDuD3kxRfXiJKCnfsOkilBrVbBlAWdfs6xJ57nAwf2U/d0GnWbes1FzrWbCGOItGu8fmaTK6/YVxKiUji2heF4nDnX4fTZHh+9aS/9YcLxV7dpNx0uP9jk+mvmefoHa3zr0TNsbAZsndsm8SNIClb8FPEGe26Y5lQPR6HBxvaIsR9QqUhAUXFMDCGRFU/XWp6l2u0Wp5Z8/OEQp2LRaiSMA4VtGvQHPgf2Nbny8Cz/6vMPAzDTclheHXL9NfPsmHPpnOvSSBJCewfd4WnygimgvFDkhQJhInSJEALMOufOPYPrVXBFgGWV9lrKifbtma9Sc03WewmvnFpHyFKvXNflV37ppwG48/Pf5Jfv+GteP9Xl1p87zGW7a/h+wtfvf5av3fcUjiVZ3h4zWj2DlDqG1MgLxTBIGYxTxkmBbZu4noOUOisbKS+/dob9l+0Fw8GxJbZlYtp6aV2uWHR5/qRNzZE88VyHwweHeJ6FEDr79u7EcDxGoc/J1SHXLrb4+v3PEiUpgzCfVGSi7rpGWijCKCcvFGlWsHj4cgzTxHY9Zpo1WjMNsqzg5GsvM/YD5hoK2wTHsfBcB8OYHLGKp2tX7i1PYW8w5rvff5W8gLpXSs6nPlFWK87AEhobg4iOn06siKRQiiTNKQpFONHEQpocvvoohuNhux6e59Bs1Wg1Kiwtb/LII8f4sSMLNDwTyzKoOCYV277U5B09vJOV9R7gcvycov30MjfesIf5OQXsYWZ2hu2tbc5tjalVJNqEMvwwo8hLLRS6xr7DV4AwsW0Tz3NoN2q4rk27VadQGSM/4aHvPcdMs878jia26+C5HvWqNw2tU1Bu1dR+7Ord6qHHNiFNeOqVgELr86Fra+zeqfObv/5xjh17hhdfeAkzKYASSLXZYnZ2BsPxMAyJ5zrMzTRwXZtG3cM0Dap2xNAfMQ4N/uc3nmF1bYObbzyMaQosy6BRN6h51qXO88L1G3f+mfZT1+/FM3KiKOKZExs8fOw8nW6AW3G44UPXEMcZYZIzClN27dvP/GX7qNQazM21mGlX2b17jna7TrNZpWIHKDWg6+v0fMGDXy9DyQ3XXUnDM7Fdh1bTpV71eEuPfuHav0swvGKG7z6+RBoMeZU5+mnGlXt95to1PvPPPsHJ18+T5wWe69Bu1TANm0bDQQiduheTJilxMiakTpi7nF7q8th3v8Xr5ze58YOXsXNGYLsO7VaTVsOlXnXfOYx+/Ff/q/bgPZ9Tpql48gcdllZWy2DRN9k1r7jm0CxVr0Ke5wghqLoVDDmYAEno9Ethj4s5kv6AZ4+f5JFHjjHTrHPzjYenFWq3muycc5ltVd80AHnL2H7LZ/9Ye+B//AtVcUyefF5y4vQqWTSk19/HylqNWqPNrkYBpHQ7m5imoqAFmGz7OuFowLlzx3jy2ZcBOLS4h0N7aphmWaH5nQ1ajRLQW6Vk7Z3mU+NRora6I9Y3x7x84iyn1nKC/mY5dXEtUqOOrUeYlkcS+/hBwmBUSofrVTi8p8H8jiamKcBw2Dnr4DgW83Mt6tW3HxG94yjIrZqapjWV5zo06gZXDlI63RadocbK2gAxAULQLY1ixWT3/H48O6fhlTnOdh0sy8BzPRp1g5lWnXq1hmFl2nueT1U8Xat4FRxLqno1plE3mA8TFvfYhFGbOE4veqHJZZtgWQaOLXEci4pjUq961LwLM6rs/ZnkuVVTc6sm9aqrgijCH4dEcUIQJiSJRp5Hk8BhY5ql4tuWiec6uBWBU7G09328+MOVq1drKk0TgnhM+kNhxRDgmBamrWMY8keefWoXvPm7vR788n9SaZqS5zl5lpOkCbqmo1BIKdHQsGyLX/rU59/zIPZdg/rLP/89VeQFQRAQxRFhGJLEZToB0IWOZVkIITANE2lITMOkXq9xy+13ae8rqL/64u+rPMsZjYasra8TheXeMU2TSqWCkGKSgrKSQOMIXQgsy6JSqWBZFo7jUKvWuPWOdwfubUF99ctfUGEUEgYh51fOMxqNaDabLMwvUG/UcV0XpdQ0muV5jioUURwxGAzobHeI4wgpJRXXRUpJs9nk9s/+rvaeQD1w790qSRLW1lZZXVujWq1y5MgRZmZm0HWdNE0p8gI0ylegP+iTpRlJkrC1vYXjODSbTTY2NgiCANuysSyTeqNBtVrln97x77R3DeqBe+9Wvu9zfuU8/V6fxYOLHDp06CKYoiDLMnRdxx/5RFFEGIWEYcj6+vo02GpoXHX0KlzXZWtri83NTaQs/Xmj0aDZaL5tOy8B9dX7v6CGwyEr58/T7fW47tpr2bVrN2mWopQqAaUZ42BMv98njmI2NtbJ8hxDGggp0DSNJE4Iw4APHDpUMnmjQa/fY211DSYw5mbn8Koev/gr//6dB7FhGNLZ3qbX63PdddexsLBAmpXHHwWbm5ssn19mNBwhpMCQBrZtowBNe8PaGmiTypaVK2g0GmhorK6uggadbgchBV/50h+oHwY2NXlfvud31Gg0YnVtjcWDiywsLJBlGVubWywtLfHMM09z/MRxgiDA9Vwsy0LTNdA0NE1Dn7xqk1IIXb/04ytFo9Fgbm5uMtCI6XY6JEnCA/ferd6yUnGSsLKyQq1W4+DBgyyfW+bl4y+jCoVt2xhmKaoKVY4XgaIoSiCTKpXfFbqmowsBk62haTpKFSgUzVaTIAjwfZ/haITrem/6ADrAX/zp76rxeEwQBBw8eBBd1zlz9gy2beM4NtKQaJqGQl0EoGkIIcovXaDrevkzTXsDWH36ATRNB6UQQtButzAtEw2NwXBAkqZ85Ut/cOkgNk0zet0etVqNdrtNnuVUHKdcfHIzXdcRuri0MpoGSpEXJUepopyBFqoEJaSYkuvFiikcp0K1WkUXOmEQEkcxeZbx4H1lG/UH7r1bBWFAEAbs3LEDIQRFUWA7TrlPACkmldAvgtE0bUKeTIHleUEcxSRJgj4BfgnlTLazQuE4Do5tk2YpQRiQpCnF5L16miYkcQIK6o0GeZ5TFAX1Wr2sjiwznj7Jebquo4qSHvI8J05iojgmCkPiJEahJqc2mw5K3sRDmoZhGBiGOeW/JEnIsuwCqIw4iRFS4LrulKE1XZsGToWiUOUNVHGhKvl0IaUU0jAo8hx7Isrtdptet0ee5YRhMK3SlFw1rdROXUzXyPOcr97/BSXTrERpWRZCF+RFaY6kEOUMfOKVVFFQKEWalkSq6zpFUTDTbjMYDllYWJgM3DIGwyGWaaKUYm19jdmZWYqioFqtlfsNbWp3yoF/fsmXfgG5mNykbH25sdMkIUkTgnFAFMfomobjOHz4wx9mz549NBoNwjAizzKEEKyurLJzfp4iL8jynNnZWXRd5+Spk4RRNGlnMaUH0zSn7Szy/GLVL5QSpVCU7VGaAk0jTTN0oSOEYN/evVRcl6WzS2iaNmHocnBqjCRSSnbs3EEQBMzOztDpdpFSIoWgXq8jhcT3fSpu5c1ip1SpCpSHR1dKTf9TKTXtvYZGs9Usc9uhQ/i+z+bmJh/84NWgFFubm1Rcl0qlwsKuXfijEWmSEkURpmVxYP8BBv0Btm0jhOCFF1+g0+3Q7/UpJpYnz3PQNBQX3QZKoQtdYJomaZoSx/FFptYvHmnHcajV67RaLZI0ZbvTYeT77FrYRZZlRFFEo9nEMA2SJGEwGJBmKfVGHX88Zm5uDse26Wx3uLCH1eRk5llOkRfoQi/3s6ahm5Y5PeZBEFysaKHKm6Ypr776KlWvSjAe0520pd1qsXRuieFwSLfbJYoi5ufnqVQquK7L8vIya2trRFHEmTNnUIBTcQiDkDRJp3QRhAG2Y0/pBqWQtm2j6Tq60KfuElXSgJACXQh832fkj9g5P0+apgz6fUzLol6vM9Nus93plADCkPE4KK1OoUiSpKz4hKuELig3SrkXozAiSzOMyTMReYETb739Ls00TGzLxh/5pEmCpjE9GUIIsjSl6lVpNposLS3RHwwYDgasra0xDgIcxyEYB4z88q85kiQhTct13rhfNb10EdrkmaHv+yUQvTxMF6oly79RqRDHEb7vMxgMmZmZQVMFUkoWFxd55ZVXePqZp6k4FfI84+jVVzMajRiPx5w+fbqkFCmIwghNu9iG8jlMNvXyQggMQ6JrGmEQMhj08aoeuqZPxV0XE1C1Wo3BoI80DDqdber12lQCql61rFaW4Y996vU6Z06fLm+YZShVTB3AhFnIs5TyUBfU63WEEEghsSwL27YplGIwHJCmGZZllXImBIZh8PFP3lnqyK133KV51SqmYRAnCevr6yhVYEgDhWJxcbEU4KJA13XiuGxPmfcESpVsr6CUoMnpbbZaE66SGEYJyjRNfN9ndXWVZrMxtdFSyunT1KnJazaahEH5aG008tna2mZubo6K46ChYds2YVgGhDIJM817pbzkaLpGvV5HA4SUGIaBZVoIKbBtG5QiSVNWV1exLQvHqSCNknhNw5gGianlu/WOu7RWuzU1Zb1+j62tTZQqj/KRI0dYmF8o/VJelDYlidF1Hdd1abaatFotbMumXm/QqJeJxfM8PM+bnrjl5WWCIKDRbE7VwjRNpGG8fcT60n//bbWxsU6eFwgpqHpVWu0WRVGQxAkvH38ZKSVKKaqTlutCYJkWaJTW2TBKDyZEKVuqIE0zzi2fo9frMTMzg2M7SENScSo4FYfbPvMf3n4Q63oujaQMkdnk8VeeZ1SrNWzb5vDllzMYDkvhlPLi/MA0S58kZem1JuJeKIU/CSS+75eAHGf6u6ZlYkjj/52QH7zvbtUfDOh2OoyDANd1EULgVirU640pOWq6hiENNL1U+bwoUG8Ak2UZ/V6P1bU1bMsqpcgwkFJiWza2Y2Nb9ptC6dvOEh649241DsZ0Oh1GwyF5XlBxK1imiWmaWJY9NYAXmFpDI0kTsjTD9322t7dRKOq1Op7nlRwky5aZlollWW8Z399x6vLAfXerKCxjeb/fJwgC4jgufbthTLJeKVHFhLfSNCFNM6SUeFWPilNBn8iYbdlIKXEcG8M0ufX2dxHb365ieZ4RxeXQPoojkiQhCIIpkAt6ZkgD0zSn6RlAGuX8QEo5qXDJVR//5J3a//fQ7IF771ZpmpCkKXmWk+XZdJp3wUKXZpEJQ+uTgYZESIFpGEjDeMdpy3seLz5w390qzzKyLCN7A6gL6+iTACpkqWWGlEjD4JZf/i3tfR8vvtVQrYxZ2QVnMm2jrutTPXunNr3d9X8HAH3S2fhDRLU1AAAAAElFTkSuQmCC);}');
addGlobalStyle('#footer_building_BEST_ITEMS {background-position:0px 0;}');


// меню "Переодевалка"
var pk2_menu_inv = document.getElementById('menu_inventory');
if (pk2_menu_inv) {
	var pk2_link2 = document.createElement("li");
        pk2_link2.id="pk2_link2";

        // PK
	//pk2_link2.innerHTML = '<a href=\"javascript:pk2_show_panel();void(0);\"><img id=\"' + 'pk2_footer_link2' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,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);\" title=\"Открыть окно настроек для запуска поиска нужных вещей\"></a>';
        // сундук
	pk2_link2.innerHTML = '<a href=\"javascript:pk2_show_panel();void(0);\"><img id=\"' + 'pk2_footer_link2' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAZCAIAAAB2NbEXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAADHNJREFUaEPtWllXVUcWBrTXcvVKoyDjBeGCRkRkHkRFQ1ACooKILYOAM4OAglwUiIkax1ZRZBCHGDsMMWlX/4x+7Jf+MemXFvqr+ursW9zDvZDV/RhXrWudc/bZtfe3x6pDeFFaclhY2OLSEn7Xr4tYXFoMWwr/9d+/RkRErF//B/yqB2Fh68LD3WR4C0+XFhc1SVi4/ofJZ59t4J3FxU/h4RHrIsI/LS7hES4jItYFPFrkAsGJscgSpFL8I8BEr6nWwm9EeNhimJ5AiqUwN+XaycDqP5+MtKuKZCT+v/x3YNdW37mvfh+/CQGA1n58L0dPS8WVtkoOzLubyjEwkcH7HJxfPFnGd8EnbH9WOtY+vHvn6ZqSM7V7McFlw5f5+d6kwrSk/FRPXkoiBi4x5yV+ETcYBWmGJndLvLrp9RR4PdnJcTlbEkBflK5GydYtMnDpfhSC2P26zQ1zSEhJjHhaZrVuWnIhBPaa1VclAwFHgVazdHuqLAQoiA/AAUTEhwboOLV/6Hzl7d5jtwaa8Ivx3ZX6sZvtk3c7pu51vHzQPf2ga/p+55PhlvfPR0Z6Tgx2N5Ds686ajsbypppiZQAsBo7gjrUxxxpYEssXQActU2gNlVW02rYCNBIGeAoWQASX7kchiCEDmIMARt3liYGpwAEDrDQ35Q2wvXDgJYjpBLhcIxnZUmD8Ums11yYEIIAF4EAeACUGGLpQPTbUMDB64+NE38/jl+ee9SzMDM+9HJ5/NTr/amR+ZmT25fDb8cEX9y/PTl2ffdIx+/jSvettMBIGLGcioDxbpSDwhcSMAOVNDliraqgotay2AuTgH9oYZrgfBScWzjQePZT4cizjmeqBCn57aCOtkUx5jyUGnY++RSgYAbgjBoALw5ff3GkD+kgsE/e6FPQzI/jFeDPW7+usLy9Mz/du3JEU+fDmpfcTvr9N9IGYA+8iU6kIoAGwAOwMI6tQYJ5xco7IgYlbQ7phgALMWsoqcGEHenouH9l2DUFMGYzLM7ekG0RocjqpSZLac4kj1jVJcs1k9ouCO5ljFcACcACRpCCA/uDaSTjy3avHX4/1w+UXXo2+etrfd7bmywJv6faoQ7s21+TFfJUT443/U++FOoTCwvT1Hx9fWhjrmvqmBe+iGCgDSBGmhRnOxh0YkiE1FD1tBeB3DGEmhOUpIkEwJVJ4cUViv3drw9OXmYj8vukALWIErGigXJVMVzUJYlVUUlUxw1B6OYWQ7s8UBAM88jUCzYWXN6Yf9V5qqtiblXggM/pIXmxVblxNkaeuMO5EScKRgriM5I19F+q/hwFejfw82c8IQBYyESBFmDVNd3KB/6heKJiWK8BEYZuT2ZxYu/nQQmJ7EnOoVGAyvnlXkGIvgF/J+ysw0fG3OplTnFjJ6HPsLNBoUAwlebrKRTQA4Hs4UDf7rAeJfmda3BeZ0YdzY48WxgP0P5cmNO71NO3znCpNqCuKy0mLunLxBAwwPzM8jzQ11oVigBSEGu4vwgeyUlSGTUsm9rQ/hOBlKA2tPMDyZbKnVpvK5HvV/VBI6ZgjMTsrf0YOkveYl4AIkTJtmLOiMFkjGYMSbzHiIYByRwd39QgEKarA4BENgFYSIKK6IuPvzd92KDumoTQRoJ8sTWze54ENGnYnHCuI3Z8ZneWNvtZ98v3EEMvDT5MDqNiwgTEAa0CAAcQZxQDBNJRSYSsgLmNET00MjZRppZz2hqVCgeKUQWNaJ78zV2j3TGa/SOBYMAUsf3/lkK2IKcjYqqkXGTG6keUA4mzDOGAkMcCdK8fh0YiAYwfza4vjWw9saS5LPlnqqS+Kr8mL3ZcRVeCNPJCfWLR9c3/HifeTQygSqNLz09eZhZYVYRhA9/UmAqCSHQHiDnZuMv2G12QtKCDRwwDCr01fnK7AIgRuPswSAblPHDmAnt4QQAzOezK2Eiz7Ea0C/u7USkx5H9VlZ0I05wpoRx3ekYIP2/hTkO8UMW2u219ToJLP0YJ45KKSbZt2b48qzYq92Jjt6yzpas0rzIx/ePPCX3W4zE7fQOVABKCKqBRUttNrIkCXRK5HOART+gIf2RrSDUUxUYA6iz1W5QO/Y4jIK0ZtHfVyU8SzrUh/J82ejHTwwaTQ64G9RWYGh6gGPzBzvU+U+5ywUBF0xrcQ4D6EpAHQwzwZOQ0DLLwe7T5zrDB9Y743sqrEM9xVMnSx6Pyp7MaajPb6nR9f17XUZg5eKi4vToUN3o37fngx+P7heTavwWuARlC8gz24CE0laSf/fR3mApbIzV7IABqEj2r1rNeFp+2htlFth7BpshI305HxK25Bp/E7gS5IK8pPjRj9qvYuDzLcBH8QiAEeDTXOTl9HCnrzbCAnNfJya17n6dxfXtXdurq392zB9P3K24Nlz28fnLpf6esoaanLzNsW+/ROB8oG0McmzqQgtqFIQYDJdjE7J9gK24qJs1B08Tj6jk1pO5EYQ6KE+yx53T9JT4Iju/mwJwm4L1lb/EBAZyl21lWNjX/uXZbKYDn20IK+WIstFvhICkIvPzfpm5sZRm7ZlR5zZ7Ds2/59o317rneV/P1tfUdL7sR3B79/Ut3dljfSVXJ0d1JZRtTFluqZx31IQXB/U4TZhsIA7MolDLmJl0v/XLcKuOTwg67bQdLbXol5boo6QlB5w+KpXzdAqIKxPEs4BvNHHltDaWRx7iSGtA0mQNOR/UA7aYqV1uil2i3h46QafZwlzO1QhgzYhfgjwNf4YXpwQe9+P/cmFmdEP/3my5cPKh+NfPFu7PDk3cretvzztTuOlyRgf6BqctrG881Vrx92oQtawQBKMscAyKocRg57boWw7hf9HiRGstOFslYQPnbSl7ly5JXAZafo9lzdEZniwU5GnECMgdRhF1jBlE4tPMUqdmhKKJtNhhMB3AkvTA7MaQNUlRfGRm6oK0/rbs27cq6wrizldEVqbVF8eW5yxa7N8P381Mhsb9Tlc7W/vOhlAXBSUPY2dwqCuMynlInzgO6CDbjtZaKA2awuz6HCM4CPHRbubMM4s+8b53B3QdobQLz789QAPnY+4dmJAd0yAN+ViHenOHYcUgOAIHazON6Zn7mBRuj12EBCTOTW+D/Wl6WcKkuqzo+rzImt2BUD3y/eumlPlqe+qvhcc/XdG2fmn3aiBUINNynogDYANnjcCctuCNJw90QI9EGYczSto1gfkvgLGhWQvMQyYPYTIfhYoSZhx2accKh1U83ZKh1ZvEFko2+qGuZVIsnQkOn9hL5JBGXITXMYpZUyylo7+WA7YR5FzD3p+PgSO6wbKMW3h9riNm7YvyP6UA5OI2L379hcuj26et/O0ycqus8du+Vrn/5L3/jXrTw6BfrYyoU8C3JQCC26P0VaCijDWDYLBgHNI6Em4Oal8LxIGcAEvhbGVBG9kIobdXpjPlHQGzicXaQ5m7PJ3IJRzgBb8syRPV6Is6AfJ0a5pfowdQ39KErxicOlRVs37d4WVZad1FBdcrap6lrXyce3Ot4+v4ZMtTBxFcRwf/z6I0DOggJOQ0UlQhBMdAnbZQ6lz8vM1hE+7vidhiYRl/JIaZ6qDlMVvjrIbEz1UwMow1/Oy5Qj64wvW3E6MkMh4NR2VTIeZshRNkHX8oQ6DUUK4pZKj47ZF/048LnQfKi1oaLnfN23g+3j93t+mPBh5zU3PTw35UP7T/Txi2PUZW2o+3uAimg5DHC+hbk1JLgBCohD8fxSDjLh4+5HwYhz1ecX4Gs+7NgJzZzQafdkXwRHttMLg0D98mPRamSUkBtsmpbLkQPM4P4eABeGAZBM8HkLA5cwxocXve+e9r54cBk7g9np4Z+mBucmBmafdOIRDo5weDd1q/31vQs4jsY+YNlZkDqLXv5FTGu1uuh5OloDFKAXM2gC8q/7UQhif3bm4Y/GmuhQNtzkly8DlhNqypedL2JrIbOOknQIWt9CQn8RYwoCmv/65z9udh3BHJkdlzCJYD0+2oIBlwcBGicM0KCErPJNWL6lhNZQZydziKidRSmAtIaBQw78os7w0p67H61IHPCuXNrENo2s4l40NBmfumlwM9g3YXzRFawBN97FAPS4z8/FxBpRAtxBgAjAhN0nK7D5Jswa8Pv4TQgAa8AnWAumTOsc8kcSwBqDfy1B6GEhvq66IO7g6cUIN57EsuJxYsqdbgkYqjJhqmWlYhZiKgj42wX7ryKCPXLft/8kgh8j3XdWfMumdP9lBl8JYBjAeVW2gvL/PvkvhoCByM5QvQAAAAAASUVORK5CYII%3D);\" title=\"Открыть окно настроек для запуска поиска нужных вещей\"></a>';

        // добавляем меню "Лево" под "Багаж"
	pk2_menu_inv.parentNode.insertBefore(pk2_link2, pk2_menu_inv.nextSibling);
}

//ширина окон.
aWindow.pk2_w0=350;
aWindow.pk2_w1=845; //920
//
aWindow.pk2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w0)/2 : (1024-aWindow.pk2_w0) /2 ;
aWindow.pk2_t0=0;
//aWindow.pk2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w1)/2 : (1024-aWindow.pk2_w1) /2 ;
aWindow.pk2_l1 =0;
aWindow.pk2_t1=0;
//высота окон
aWindow.pk2_title_h_min=25;
aWindow.pk2_title_h_mid=118;     //высота нормального окна настроек переодевалки
aWindow.pk2_title_h_max=438;     //высота развёрнугото окна настроек переодевалки 275
aWindow.pk2_window_h_min=25;
aWindow.pk2_window_h_max=645;    //высота окна данных переодевалки
aWindow.pk2_tlink=' style=\"color:white; display:block; width:20px; height:20px; float:left;\" ';
aWindow.pk2_vblock=' style=\"border:1px solid black; padding:10x; marging:1px;\" ';
aWindow.pk2_title_flag=0;
aWindow.pk2_title_flag2=1;
aWindow.pk2_window_flag2=1;
aWindow.pk2_odevalo4ka = true;

pk2_code='';
pk2_code += "\
pk2_zaschitato=1;\
pk2_import=false;\
pk2_khlam=false;\
ezda=false;\
zaschita=null;\
pk2_millioner=false;\
pk2_process=false;\
pk2_zdorov=0;\
pk2_count_inv=0;\
pk2_odev_count=0;\
pk2_odev_id=0;\
pk2_odev_type=0;\
pk2_odev_time=500;\
pk2_odev_rep=20;\
pk2_odev_var='n';\
pk2_odev_rab=0;\
pk2_odev_item=0;\
pk2_odev_list={};\
pk2_odev_stat=true;\
\
einfo='';\
winfo='';\
\
pk2_types=['right_arm', 'left_arm', 'head', 'body', 'belt', 'pants', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set'];\
\
pk2_predmetov = {};\
pk2_uchet=[];\
pk2_aktiv=[];\
pk2_nenuzhnoe=[];\
irabota=0;\
pk2_inv_imported=false;\
pk2_slots={};\
pk2_equipment={};\
for (ii=0;ii<pk2_types.length;++ii) {pk2_equipment[pk2_types[ii]]=0};\
";

pk2_code += "\
items=[];\
items[0] = {item_id:0, nshort:'nothing', name:'заглушка', type:'pants', level:0, price:0, image:'images/items/unknown.png?1', image_mini:'images/items/unknown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
items[1] = {item_id:1, nshort:'clayjug', name:'Разбитый глиняный кувшин', type:'right_arm', level:1, price:16, image:'images/items/right_arm/clayjug.png?1', image_mini:'images/items/right_arm/mini/clayjug.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[2] = {item_id:2, nshort:'winebottle', name:'Разбитая винная бутылка', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png?1', image_mini:'images/items/right_arm/mini/winebottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Разбитая бутылка виски', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png?1', image_mini:'images/items/right_arm/mini/whiskeybottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[4] = {item_id:4, nshort:'rotty_club', name:'Гнилая дубинка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png?1', image_mini:'images/items/right_arm/mini/rotty_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[5] = {item_id:5, nshort:'club', name:'Дубинка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png?1', image_mini:'images/items/right_arm/mini/club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[6] = {item_id:6, nshort:'nail_club', name:'Дубинка с шипом', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png?1', image_mini:'images/items/right_arm/mini/nail_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Ржавая бритва', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png?1', image_mini:'images/items/right_arm/mini/rusty_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[8] = {item_id:8, nshort:'razor', name:'Бритва', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png?1', image_mini:'images/items/right_arm/mini/razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Острая бритва', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png?1', image_mini:'images/items/right_arm/mini/sharp_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Бритва Фигаро', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png?1', image_mini:'images/items/right_arm/mini/figaros_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Ржавый кинжал', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png?1', image_mini:'images/items/right_arm/mini/rusty_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12] = {item_id:12, nshort:'skewer', name:'Кинжал', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png?1', image_mini:'images/items/right_arm/mini/skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Острый кинжал', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png?1', image_mini:'images/items/right_arm/mini/sharp_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Кинжал Коди', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png?1', image_mini:'images/items/right_arm/mini/codys_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Ржавый нож', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png?1', image_mini:'images/items/right_arm/mini/rusty_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[16] = {item_id:16, nshort:'bowie', name:'Нож', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png?1', image_mini:'images/items/right_arm/mini/bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Острый нож', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png?1', image_mini:'images/items/right_arm/mini/sharp_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Нож Бови', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png?1', image_mini:'images/items/right_arm/mini/bowies_knife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Ржавая рапира', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png?1', image_mini:'images/items/right_arm/mini/rusty_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20] = {item_id:20, nshort:'foil', name:'Рапира', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png?1', image_mini:'images/items/right_arm/mini/foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Острая рапира', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png?1', image_mini:'images/items/right_arm/mini/sharp_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[22] = {item_id:22, nshort:'athos_foil', name:'Рапира Атоса', type:'right_arm', level:45, price:5775, image:'images/items/right_arm/athos_foil.png?1', image_mini:'images/items/right_arm/mini/athos_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Ржавый мачете', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png?1', image_mini:'images/items/right_arm/mini/rusty_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[24] = {item_id:24, nshort:'machete', name:'Мачете', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png?1', image_mini:'images/items/right_arm/mini/machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Острый мачете', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png?1', image_mini:'images/items/right_arm/mini/sharp_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[26] = {item_id:26, nshort:'nats_machete', name:'Мачете Ната', type:'right_arm', level:50, price:6750, image:'images/items/right_arm/nats_machete.png?1', image_mini:'images/items/right_arm/mini/nats_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Ржавый меч конкистадора', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png?1', image_mini:'images/items/right_arm/mini/rusty_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[28] = {item_id:28, nshort:'conquistador', name:'Меч конкистадора', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png?1', image_mini:'images/items/right_arm/mini/conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Острый меч конкистадора', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png?1', image_mini:'images/items/right_arm/mini/sharp_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Меч Эрнандо', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png?1', image_mini:'images/items/right_arm/mini/henandos_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Ржавый Томагавк', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png?1', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[32] = {item_id:32, nshort:'tomahawk', name:'Томагавк', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png?1', image_mini:'images/items/right_arm/mini/tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Острый томагавк', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png?1', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Томагавк Ташунки', type:'right_arm', level:70, price:10100, image:'images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'images/items/right_arm/mini/taschunkas_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:7, hide:3, dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Ржавый топор лесоруба', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png?1', image_mini:'images/items/right_arm/mini/rusty_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[36] = {item_id:36, nshort:'axe', name:'Топор лесоруба', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png?1', image_mini:'images/items/right_arm/mini/axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Острый топор лесоруба', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png?1', image_mini:'images/items/right_arm/mini/sharp_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[38] = {item_id:38, nshort:'boones_axe', name:'Топор Буна', type:'right_arm', level:75, price:10200, image:'images/items/right_arm/boones_axe.png?1', image_mini:'images/items/right_arm/mini/boones_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Ржавая кавалерийская сабля', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png?1', image_mini:'images/items/right_arm/mini/rusty_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[40] = {item_id:40, nshort:'sabre', name:'Кавалерийская сабля', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png?1', image_mini:'images/items/right_arm/mini/sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Острая кавалерийская сабля', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png?1', image_mini:'images/items/right_arm/mini/sharp_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[42] = {item_id:42, nshort:'grants_sabre', name:'Сабля генерала Гранта', type:'right_arm', level:80, price:10800, image:'images/items/right_arm/grants_sabre.png?1', image_mini:'images/items/right_arm/mini/grants_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[43] = {item_id:43, nshort:'screwdriver', name:'Отвёртка', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png?1', image_mini:'images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[44] = {item_id:44, nshort:'spanner', name:'Гаечный ключ', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png?1', image_mini:'images/items/right_arm/mini/spanner.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[45] = {item_id:45, nshort:'crowbar', name:'Фомка', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png?1', image_mini:'images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[46] = {item_id:46, nshort:'whips', name:'Кнут', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png?1', image_mini:'images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[47] = {item_id:47, nshort:'pillow', name:'Подушка', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png?1', image_mini:'images/items/right_arm/mini/pillow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
\
items[50] = {item_id:50, nshort:'goldensable', name:'Золотая сабля', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/goldensable.png?1', image_mini:'images/items/right_arm/mini/goldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, punch:8}, attributes:{}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
\
items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Топор следопыта', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_axe.png?1', image_mini:'images/items/right_arm/mini/greenhorn_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
items[53] = {item_id:53, nshort:'xmas_rod', name:'Розга', type:'right_arm', level:null, price:250, image:'images/items/right_arm/xmas_rod.png?1', image_mini:'images/items/right_arm/mini/xmas_rod.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:-2, aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Трухлявый лук', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png?1', image_mini:'images/items/left_arm/mini/bow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Лук', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png?1', image_mini:'images/items/left_arm/mini/bow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'Точный лук', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png?1', image_mini:'images/items/left_arm/mini/bow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Трухлявый арбалет', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png?1', image_mini:'images/items/left_arm/mini/crossbow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Арбалет', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png?1', image_mini:'images/items/left_arm/mini/crossbow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[106] = {item_id:106, nshort:'crossbow_best', name:'Точный арбалет', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png?1', image_mini:'images/items/left_arm/mini/crossbow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Ржавая пищаль', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png?1', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Пищаль', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png?1', image_mini:'images/items/left_arm/mini/arkebuse_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Точная пищаль', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png?1', image_mini:'images/items/left_arm/mini/arkebuse_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Ржавое охотничье ружьё', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Охотничье ружьё', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Точное охотничье ружьё', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Ржавый мушкет', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png?1', image_mini:'images/items/left_arm/mini/musket_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[114] = {item_id:114, nshort:'musket_normal', name:'Мушкет', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png?1', image_mini:'images/items/left_arm/mini/musket_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'Точный мушкет', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png?1', image_mini:'images/items/left_arm/mini/musket_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Ржавый дробовик', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png?1', image_mini:'images/items/left_arm/mini/flint_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[117] = {item_id:117, nshort:'flint_normal', name:'Дробовик', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png?1', image_mini:'images/items/left_arm/mini/flint_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'Точный дробовик', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png?1', image_mini:'images/items/left_arm/mini/flint_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Ржавая винтовка', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png?1', image_mini:'images/items/left_arm/mini/shotgun_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Винтовка', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png?1', image_mini:'images/items/left_arm/mini/shotgun_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Точная винтовка', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png?1', image_mini:'images/items/left_arm/mini/shotgun_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Ржавый карабин', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png?1', image_mini:'images/items/left_arm/mini/percussion_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Карабин', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png?1', image_mini:'images/items/left_arm/mini/percussion_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'Точный карабин', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png?1', image_mini:'images/items/left_arm/mini/percussion_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Ржавая казнозарядка', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png?1', image_mini:'images/items/left_arm/mini/breechloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Казнозарядка', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png?1', image_mini:'images/items/left_arm/mini/breechloader_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Точная казнозарядка', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png?1', image_mini:'images/items/left_arm/mini/breechloader_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Ржавый винчестер', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png?1', image_mini:'images/items/left_arm/mini/winchester_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Винчестер', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png?1', image_mini:'images/items/left_arm/mini/winchester_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[130] = {item_id:130, nshort:'winchester_best', name:'Точный винчестер', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png?1', image_mini:'images/items/left_arm/mini/winchester_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[132] = {item_id:132, nshort:'bear', name:'Медвежонок', type:'left_arm', level:45, price:2600, image:'images/items/left_arm/bear.png?1', image_mini:'images/items/left_arm/mini/bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Дульнозарядное ружьё Бови', type:'left_arm', level:30, price:1480, image:'images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'images/items/left_arm/mini/muzzleloader_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[136] = {item_id:136, nshort:'golden_rifle', name:'Золотое ружьё', type:'left_arm', level:75, price:65480, image:'images/items/left_arm/golden_rifle.png?1', image_mini:'images/items/left_arm/mini/golden_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
items[137] = {item_id:137, nshort:'deathsythe', name:'Коса Смерти', type:'left_arm', level:50, price:17400, image:'images/items/left_arm/deathsythe.png?1', image_mini:'images/items/left_arm/mini/deathsythe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'drop'};\
\
items[200] = {item_id:200, nshort:'band_red', name:'Красная бандана', type:'head', level:1, price:4, image:'images/items/head/band_red.png?1', image_mini:'images/items/head/mini/band_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[201] = {item_id:201, nshort:'band_green', name:'Зелёная бандана', type:'head', level:2, price:4, image:'images/items/head/band_green.png?1', image_mini:'images/items/head/mini/band_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[202] = {item_id:202, nshort:'band_blue', name:'Синяя бандана', type:'head', level:2, price:4, image:'images/items/head/band_blue.png?1', image_mini:'images/items/head/mini/band_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[203] = {item_id:203, nshort:'band_yellow', name:'Жёлтая бандана', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png?1', image_mini:'images/items/head/mini/band_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[204] = {item_id:204, nshort:'band_brown', name:'Коричневая бандана', type:'head', level:3, price:18, image:'images/items/head/band_brown.png?1', image_mini:'images/items/head/mini/band_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[205] = {item_id:205, nshort:'band_black', name:'Чёрная бандана', type:'head', level:3, price:18, image:'images/items/head/band_black.png?1', image_mini:'images/items/head/mini/band_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Серая кепка', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png?1', image_mini:'images/items/head/mini/slouch_cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Коричневая кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png?1', image_mini:'images/items/head/mini/slouch_cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Чёрная кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png?1', image_mini:'images/items/head/mini/slouch_cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Знатная кепка', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png?1', image_mini:'images/items/head/mini/slouch_cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[210] = {item_id:210, nshort:'cap_grey', name:'Серая шапка', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png?1', image_mini:'images/items/head/mini/cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[211] = {item_id:211, nshort:'cap_red', name:'Красная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_red.png?1', image_mini:'images/items/head/mini/cap_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[212] = {item_id:212, nshort:'cap_green', name:'Зелёная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_green.png?1', image_mini:'images/items/head/mini/cap_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[213] = {item_id:213, nshort:'cap_blue', name:'Синяя шапка', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png?1', image_mini:'images/items/head/mini/cap_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Жёлтая шапка', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png?1', image_mini:'images/items/head/mini/cap_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[215] = {item_id:215, nshort:'cap_brown', name:'Коричневая шапка', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png?1', image_mini:'images/items/head/mini/cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[216] = {item_id:216, nshort:'cap_black', name:'Чёрная шапка', type:'head', level:6, price:300, image:'images/items/head/cap_black.png?1', image_mini:'images/items/head/mini/cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[217] = {item_id:217, nshort:'cap_fine', name:'Знатная шапка', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png?1', image_mini:'images/items/head/mini/cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Серая панама', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png?1', image_mini:'images/items/head/mini/slouch_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Коричневая панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png?1', image_mini:'images/items/head/mini/slouch_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Чёрная панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png?1', image_mini:'images/items/head/mini/slouch_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Знатная панама', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png?1', image_mini:'images/items/head/mini/slouch_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Серый котелок', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png?1', image_mini:'images/items/head/mini/bowler_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Коричневый котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png?1', image_mini:'images/items/head/mini/bowler_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[224] = {item_id:224, nshort:'bowler_black', name:'Чёрный котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png?1', image_mini:'images/items/head/mini/bowler_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Знатный котелок', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png?1', image_mini:'images/items/head/mini/bowler_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Шляпа из серого фетра', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png?1', image_mini:'images/items/head/mini/cloth_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Шляпа из коричневого фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png?1', image_mini:'images/items/head/mini/cloth_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Шляпа из чёрного фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png?1', image_mini:'images/items/head/mini/cloth_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Знатная фетровая шляпа', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png?1', image_mini:'images/items/head/mini/cloth_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Серый цилиндр', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png?1', image_mini:'images/items/head/mini/cylinder_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Красный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png?1', image_mini:'images/items/head/mini/cylinder_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Зелёный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png?1', image_mini:'images/items/head/mini/cylinder_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Синий цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png?1', image_mini:'images/items/head/mini/cylinder_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Жёлтый цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png?1', image_mini:'images/items/head/mini/cylinder_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Коричневый цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png?1', image_mini:'images/items/head/mini/cylinder_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Чёрный цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png?1', image_mini:'images/items/head/mini/cylinder_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Цилиндр Линкольна', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png?1', image_mini:'images/items/head/mini/cylinder_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Серая шляпа', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png?1', image_mini:'images/items/head/mini/leather_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Коричневая шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png?1', image_mini:'images/items/head/mini/leather_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Чёрная шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png?1', image_mini:'images/items/head/mini/leather_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Знатная шляпа', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png?1', image_mini:'images/items/head/mini/leather_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Серый стетсон', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png?1', image_mini:'images/items/head/mini/stetson_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Коричневый стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png?1', image_mini:'images/items/head/mini/stetson_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[244] = {item_id:244, nshort:'stetson_black', name:'Чёрный стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png?1', image_mini:'images/items/head/mini/stetson_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Знатный стетсон', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png?1', image_mini:'images/items/head/mini/stetson_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Рождественский колпак', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png?1', image_mini:'images/items/head/mini/xmas_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[247] = {item_id:247, nshort:'southcap', name:'Фуражка', type:'head', level:20, price:800, image:'images/items/head/southcap.png?1', image_mini:'images/items/head/mini/southcap.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Шляпа авантюриста', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png?1', image_mini:'images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\
items[249] = {item_id:249, nshort:'fedora_black', name:'Чёрная фетровая шляпа', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png?1', image_mini:'images/items/head/mini/fedora_black.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Коричневая шляпа с пером', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png?1', image_mini:'images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[253] = {item_id:253, nshort:'indian_hat', name:'Индейское оперение', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png?1', image_mini:'images/items/head/mini/indian_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Сомбреро', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png?1', image_mini:'images/items/head/mini/mexican_sombrero.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Монашеский чепец', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png?1', image_mini:'images/items/head/mini/pilger_cap.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[257] = {item_id:257, nshort:'pilger_hat', name:'Шляпа пастора', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png?1', image_mini:'images/items/head/mini/pilger_hat.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Шляпа снеговика', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png?1', image_mini:'images/items/head/mini/cylinder_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Перо', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png?1', image_mini:'images/items/head/mini/dancer_hat.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Ночной колпак', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png?1', image_mini:'images/items/head/mini/sleep_cap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'shop'};\
items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Подобранная шляпа', type:'head', level:4, price:515, image:'images/items/head/greenhorn_hat.png?1', image_mini:'images/items/head/mini/greenhorn_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[299] = {item_id:299, nshort:'band_grey', name:'Серая бандана', type:'head', level:1, price:2, image:'images/items/head/band_grey.png?1', image_mini:'images/items/head/mini/band_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Серые лохмотья', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png?1', image_mini:'images/items/body/mini/tatter_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[301] = {item_id:301, nshort:'tatter_red', name:'Красные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png?1', image_mini:'images/items/body/mini/tatter_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[302] = {item_id:302, nshort:'tatter_green', name:'Зелёные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png?1', image_mini:'images/items/body/mini/tatter_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Синие лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png?1', image_mini:'images/items/body/mini/tatter_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Жёлтые лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png?1', image_mini:'images/items/body/mini/tatter_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Коричневые лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png?1', image_mini:'images/items/body/mini/tatter_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[306] = {item_id:306, nshort:'tatter_black', name:'Чёрные лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png?1', image_mini:'images/items/body/mini/tatter_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Серое пончо', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png?1', image_mini:'images/items/body/mini/poncho_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[308] = {item_id:308, nshort:'poncho_red', name:'Красное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png?1', image_mini:'images/items/body/mini/poncho_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[309] = {item_id:309, nshort:'poncho_green', name:'Зелёное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png?1', image_mini:'images/items/body/mini/poncho_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Синее пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png?1', image_mini:'images/items/body/mini/poncho_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Жёлтое пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png?1', image_mini:'images/items/body/mini/poncho_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Коричневое пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png?1', image_mini:'images/items/body/mini/poncho_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[313] = {item_id:313, nshort:'poncho_black', name:'Чёрное пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png?1', image_mini:'images/items/body/mini/poncho_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, shot:3, dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Пончо Клинта', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png?1', image_mini:'images/items/body/mini/poncho_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[315] = {item_id:315, nshort:'clothes_grey', name:'Серый костюм', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png?1', image_mini:'images/items/body/mini/clothes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[316] = {item_id:316, nshort:'clothes_red', name:'Красный костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png?1', image_mini:'images/items/body/mini/clothes_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Зелёный костюм', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png?1', image_mini:'images/items/body/mini/clothes_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Синий костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png?1', image_mini:'images/items/body/mini/clothes_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Жёлтый костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png?1', image_mini:'images/items/body/mini/clothes_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Коричневый костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png?1', image_mini:'images/items/body/mini/clothes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[321] = {item_id:321, nshort:'clothes_black', name:'Чёрный костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png?1', image_mini:'images/items/body/mini/clothes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Воскресный костюм', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png?1', image_mini:'images/items/body/mini/clothes_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Серая рубашка', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png?1', image_mini:'images/items/body/mini/shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[324] = {item_id:324, nshort:'shirt_red', name:'Красная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png?1', image_mini:'images/items/body/mini/shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[325] = {item_id:325, nshort:'shirt_green', name:'Зелёная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png?1', image_mini:'images/items/body/mini/shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Синяя рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png?1', image_mini:'images/items/body/mini/shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Жёлтая рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png?1', image_mini:'images/items/body/mini/shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Коричневая рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png?1', image_mini:'images/items/body/mini/shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[329] = {item_id:329, nshort:'shirt_black', name:'Чёрная рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png?1', image_mini:'images/items/body/mini/shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Знатная рубашка', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png?1', image_mini:'images/items/body/mini/shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Серая клетчатая рубашка', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png?1', image_mini:'images/items/body/mini/plaid_shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Красная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png?1', image_mini:'images/items/body/mini/plaid_shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Зелёная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Синяя клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png?1', image_mini:'images/items/body/mini/plaid_shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Жёлтая клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png?1', image_mini:'images/items/body/mini/plaid_shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Коричневая клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png?1', image_mini:'images/items/body/mini/plaid_shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Чёрная клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png?1', image_mini:'images/items/body/mini/plaid_shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Рубаха лесоруба', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png?1', image_mini:'images/items/body/mini/plaid_shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[339] = {item_id:339, nshort:'vest_grey', name:'Серая жилетка', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png?1', image_mini:'images/items/body/mini/vest_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[340] = {item_id:340, nshort:'vest_brown', name:'Коричневая жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png?1', image_mini:'images/items/body/mini/vest_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[341] = {item_id:341, nshort:'vest_black', name:'Чёрная жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png?1', image_mini:'images/items/body/mini/vest_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[342] = {item_id:342, nshort:'vest_fine', name:'Знатная жилетка', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png?1', image_mini:'images/items/body/mini/vest_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[343] = {item_id:343, nshort:'coat_grey', name:'Серая куртка', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png?1', image_mini:'images/items/body/mini/coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[344] = {item_id:344, nshort:'coat_red', name:'Красная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png?1', image_mini:'images/items/body/mini/coat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[345] = {item_id:345, nshort:'coat_green', name:'Зелёная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png?1', image_mini:'images/items/body/mini/coat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[346] = {item_id:346, nshort:'coat_blue', name:'Синяя куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png?1', image_mini:'images/items/body/mini/coat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Жёлтая куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png?1', image_mini:'images/items/body/mini/coat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[348] = {item_id:348, nshort:'coat_brown', name:'Коричневая куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png?1', image_mini:'images/items/body/mini/coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[349] = {item_id:349, nshort:'coat_black', name:'Чёрная куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png?1', image_mini:'images/items/body/mini/coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[350] = {item_id:350, nshort:'coat_fine', name:'Знатная куртка', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png?1', image_mini:'images/items/body/mini/coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Серый пиджак', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png?1', image_mini:'images/items/body/mini/jacket_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Коричневый пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png?1', image_mini:'images/items/body/mini/jacket_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[353] = {item_id:353, nshort:'jacket_black', name:'Чёрный пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png?1', image_mini:'images/items/body/mini/jacket_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Знатный пиджак', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png?1', image_mini:'images/items/body/mini/jacket_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Серая кожанка', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png?1', image_mini:'images/items/body/mini/leather_coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Коричневая кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png?1', image_mini:'images/items/body/mini/leather_coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Чёрная кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png?1', image_mini:'images/items/body/mini/leather_coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, repair:12, hide:11, tough:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Знатная кожанка', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png?1', image_mini:'images/items/body/mini/leather_coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Серое пальто', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png?1', image_mini:'images/items/body/mini/greatcoat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Коричневое пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png?1', image_mini:'images/items/body/mini/greatcoat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Знатное пальто', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png?1', image_mini:'images/items/body/mini/greatcoat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[362] = {item_id:362, nshort:'uniform', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform.png?1', image_mini:'images/items/body/mini/uniform.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Палёная форма', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png?1', image_mini:'images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'drop'};\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Чёрное пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png?1', image_mini:'images/items/body/mini/greatcoat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Жакет авантюриста', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png?1', image_mini:'images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Коричневая кожаная жилетка', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png?1', image_mini:'images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Холщовая рубаха', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png?1', image_mini:'images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Платье танцовщицы', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png?1', image_mini:'images/items/body/mini/dancer_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Индейское платье', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png?1', image_mini:'images/items/body/mini/indian_jacket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Платье монашки', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png?1', image_mini:'images/items/body/mini/pilger_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Рубаха пастора', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png?1', image_mini:'images/items/body/mini/pilger_jacket.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
\
items[375] = {item_id:375, nshort:'night_shirt', name:'Ночная рубашка', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png?1', image_mini:'images/items/body/mini/night_shirt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Серые стоптанные башмаки', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png?1', image_mini:'images/items/foot/mini/ripped_shoes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Коричневые стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png?1', image_mini:'images/items/foot/mini/ripped_shoes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Чёрные стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png?1', image_mini:'images/items/foot/mini/ripped_shoes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[403] = {item_id:403, nshort:'light_grey', name:'Серые матерчатые ботинки', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png?1', image_mini:'images/items/foot/mini/light_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'Коричневые матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png?1', image_mini:'images/items/foot/mini/light_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Чёрные матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png?1', image_mini:'images/items/foot/mini/light_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Знатные матерчатые ботинки', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png?1', image_mini:'images/items/foot/mini/light_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'Серые рабочие ботинки', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png?1', image_mini:'images/items/foot/mini/working_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[408] = {item_id:408, nshort:'working_brown', name:'Коричневые рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png?1', image_mini:'images/items/foot/mini/working_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[409] = {item_id:409, nshort:'working_black', name:'Чёрные рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png?1', image_mini:'images/items/foot/mini/working_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Знатные рабочие ботинки', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png?1', image_mini:'images/items/foot/mini/working_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[411] = {item_id:411, nshort:'spur_grey', name:'Серые ботинки со шпорами', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png?1', image_mini:'images/items/foot/mini/spur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'Коричневые ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png?1', image_mini:'images/items/foot/mini/spur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Чёрные ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png?1', image_mini:'images/items/foot/mini/spur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Знатные ботинки со шпорами', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png?1', image_mini:'images/items/foot/mini/spur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'Серые сапоги', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png?1', image_mini:'images/items/foot/mini/boots_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[416] = {item_id:416, nshort:'boots_brown', name:'Коричневые сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png?1', image_mini:'images/items/foot/mini/boots_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[417] = {item_id:417, nshort:'boots_black', name:'Чёрные сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png?1', image_mini:'images/items/foot/mini/boots_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[418] = {item_id:418, nshort:'boots_fine', name:'Знатные сапоги', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png?1', image_mini:'images/items/foot/mini/boots_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[419] = {item_id:419, nshort:'rider_grey', name:'Серые ковбойские сапоги', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png?1', image_mini:'images/items/foot/mini/rider_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[420] = {item_id:420, nshort:'rider_brown', name:'Коричневые ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png?1', image_mini:'images/items/foot/mini/rider_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[421] = {item_id:421, nshort:'rider_black', name:'Чёрные ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png?1', image_mini:'images/items/foot/mini/rider_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[422] = {item_id:422, nshort:'rider_fine', name:'Знатные ковбойские сапоги', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png?1', image_mini:'images/items/foot/mini/rider_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Солдатские сапоги', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png?1', image_mini:'images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Коричневые ботинки со шнурками', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png?1', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Коричневые ботинки проповедника', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Знатные башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png?1', image_mini:'images/items/foot/mini/gentleman_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Сандалии', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png?1', image_mini:'images/items/foot/mini/mexican_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[429] = {item_id:429, nshort:'mokassins', name:'Мокасины', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png?1', image_mini:'images/items/foot/mini/mokassins.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Монашеские туфли', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png?1', image_mini:'images/items/foot/mini/pilger_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Туфли монаха', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png?1', image_mini:'images/items/foot/mini/pilger_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[433] = {item_id:433, nshort:'dancer_boots', name:'Сапожки на каблуках', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png?1', image_mini:'images/items/foot/mini/dancer_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Знахарские башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png?1', image_mini:'images/items/foot/mini/quackery_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[436] = {item_id:436, nshort:'slippers', name:'Тапочки', type:'foot', level:45, price:2000, image:'images/items/foot/slippers.png?1', image_mini:'images/items/foot/mini/slippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Сапоги со Дня благодарения', type:'foot', level:30, price:4600, image:'images/items/foot/thanksgiving_boots.png?1', image_mini:'images/items/foot/mini/thanksgiving_boots.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Башмаки на новенького', type:'foot', level:6, price:460, image:'images/items/foot/greenhorn_shoes.png?1', image_mini:'images/items/foot/mini/greenhorn_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Серый шарф', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[501] = {item_id:501, nshort:'neckband_red', name:'Красный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[502] = {item_id:502, nshort:'neckband_green', name:'Зелёный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Синий шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Жёлтый шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Коричневый шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[506] = {item_id:506, nshort:'neckband_black', name:'Чёрный шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Серое индейское ожерелье', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Красное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Зелёное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Синее индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Жёлтое индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Золотое индейское ожерелье', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[513] = {item_id:513, nshort:'loop_grey', name:'Серая повязка', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[514] = {item_id:514, nshort:'loop_red', name:'Красная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[515] = {item_id:515, nshort:'loop_green', name:'Зелёная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[516] = {item_id:516, nshort:'loop_blue', name:'Синяя повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Жёлтая повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[518] = {item_id:518, nshort:'loop_brown', name:'Коричневая повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[519] = {item_id:519, nshort:'loop_black', name:'Чёрная повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[520] = {item_id:520, nshort:'fly_grey', name:'Серая бабочка', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[521] = {item_id:521, nshort:'fly_red', name:'Красная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[522] = {item_id:522, nshort:'fly_green', name:'Зелёная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[523] = {item_id:523, nshort:'fly_blue', name:'Синяя бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Жёлтая бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[525] = {item_id:525, nshort:'fly_brown', name:'Коричневая бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[526] = {item_id:526, nshort:'fly_black', name:'Чёрная бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[527] = {item_id:527, nshort:'fly_fine', name:'Знатная бабочка', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Железный крест', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[529] = {item_id:529, nshort:'cross_silver', name:'Серебряный крест', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[530] = {item_id:530, nshort:'cross_gold', name:'Золотой крест', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Серый галстук', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[532] = {item_id:532, nshort:'cravat_red', name:'Красный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[533] = {item_id:533, nshort:'cravat_green', name:'Зелёный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Синий галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Жёлтый галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Коричневый галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[537] = {item_id:537, nshort:'cravat_black', name:'Чёрный галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Знатный галстук', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Свинцовая пуля', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Серебряная пуля', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Золотая пуля', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Серый платок', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Красный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Зелёный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Синий платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Жёлтый платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Коричневый платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Чёрный платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Железный бизон', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Серебряный бизон', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Золотой бизон', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[552] = {item_id:552, nshort:'talisman', name:'Талисман', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\
items[553] = {item_id:553, nshort:'stonechain', name:'Каменный медальон', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[554] = {item_id:554, nshort:'southcross', name:'Медаль за мужество', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[555] = {item_id:555, nshort:'aztecchains', name:'Ожерелье ацтеков', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[556] = {item_id:556, nshort:'arrowhead', name:'Наконечник стрелы', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Костяное ожерелье', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Мексиканский шарф', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
\
\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Жемчужное ожерелье', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'drop'};\
items[567] = {item_id:567, nshort:'amulett', name:'Сердечный амулет', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[568] = {item_id:568, nshort:'teethchain', name:'Талисман от вурдалака', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Платок от пыли', type:'neck', level:1, price:350, image:'images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, endurance:2}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
items[570] = {item_id:570, nshort:'xmas_schal', name:'Тёплый шарф', type:'neck', level:1, price:2010, image:'images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'drop'};\
\
\
items[600] = {item_id:600, nshort:'donkey', name:'Осёл', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png?1', image_mini:'images/items/animal/mini/donkey.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[601] = {item_id:601, nshort:'pony', name:'Пони', type:'animal', level:1, price:500, image:'images/items/animal/pony.png?1', image_mini:'images/items/animal/mini/pony.png?1', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[602] = {item_id:602, nshort:'mustang', name:'Мустанг', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png?1', image_mini:'images/items/animal/mini/mustang.png?1', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[603] = {item_id:603, nshort:'berber', name:'Рысак', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png?1', image_mini:'images/items/animal/mini/berber.png?1', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'Арабский скакун', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png?1', image_mini:'images/items/animal/mini/araber.png?1', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[605] = {item_id:605, nshort:'quarter', name:'Кватерхорс', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png?1', image_mini:'images/items/animal/mini/quarter.png?1', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[606] = {item_id:606, nshort:'charriot', name:'Тележка', type:'animal', level:1, price:1500, image:'images/items/animal/charriot.png?1', image_mini:'images/items/animal/mini/charriot.png?1', characterClass:null, characterSex:null, speed:0.909, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[607] = {item_id:607, nshort:'young_stallion', name:'Жеребёнок', type:'animal', level:1, price:250, image:'images/items/animal/young_stallion.png?1', image_mini:'images/items/animal/mini/young_stallion.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
items[609] = {item_id:609, nshort:'xmas_slide', name:'Рождественские сани', type:'animal', level:1, price:550, image:'images/items/animal/xmas_slide.png?1', image_mini:'images/items/animal/mini/xmas_slide.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
\
\
items[700] = {item_id:700, nshort:'ham', name:'Свинина', type:'yield', level:null, price:10, image:'images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[701] = {item_id:701, nshort:'cereals', name:'Зерно', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[702] = {item_id:702, nshort:'tabacco', name:'Табак', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[703] = {item_id:703, nshort:'sugar', name:'Сахар', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[704] = {item_id:704, nshort:'cotton', name:'Хлопок', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[705] = {item_id:705, nshort:'trout', name:'Форель', type:'yield', level:null, price:4, image:'images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[706] = {item_id:706, nshort:'berrys', name:'Ягоды', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[707] = {item_id:707, nshort:'shearings', name:'Шерсть', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Пирит', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[709] = {item_id:709, nshort:'turkey', name:'Индейка', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[710] = {item_id:710, nshort:'beef', name:'Говяжий бифштекс', type:'yield', level:null, price:24, image:'images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[711] = {item_id:711, nshort:'planks', name:'Дерево', type:'yield', level:null, price:16, image:'images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[712] = {item_id:712, nshort:'leather', name:'Кожа', type:'yield', level:null, price:16, image:'images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[714] = {item_id:714, nshort:'beaver', name:'Бобровый мех', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[715] = {item_id:715, nshort:'fabric', name:'Рулон сукна', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[716] = {item_id:716, nshort:'stone', name:'Камни', type:'yield', level:null, price:10, image:'images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[717] = {item_id:717, nshort:'grund', name:'Лосось', type:'yield', level:null, price:14, image:'images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Зуб койота', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[719] = {item_id:719, nshort:'cigar', name:'Сигары', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[720] = {item_id:720, nshort:'gems', name:'Полудрагоценные камни', type:'yield', level:null, price:70, image:'images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[721] = {item_id:721, nshort:'coal', name:'Уголь', type:'yield', level:null, price:20, image:'images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[722] = {item_id:722, nshort:'meal', name:'Горячая закуска', type:'yield', level:null, price:14, image:'images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[723] = {item_id:723, nshort:'ring', name:'Кольцо', type:'yield', level:null, price:160, image:'images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'drop'};\
items[724] = {item_id:724, nshort:'buffalo', name:'Шкура бизона', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[725] = {item_id:725, nshort:'silver', name:'Серебро', type:'yield', level:null, price:200, image:'images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[726] = {item_id:726, nshort:'indiangold', name:'Золото ацтеков', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[727] = {item_id:727, nshort:'medal', name:'Медаль за отвагу', type:'yield', level:null, price:500, image:'images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[728] = {item_id:728, nshort:'watch', name:'Карманные часы', type:'yield', level:null, price:210, image:'images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Контрабандный товар', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[730] = {item_id:730, nshort:'necklet', name:'Украшения', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'Трофей', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[733] = {item_id:733, nshort:'packet', name:'Пакет', type:'yield', level:null, price:32, image:'images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[734] = {item_id:734, nshort:'slicer', name:'Рубанок', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[736] = {item_id:736, nshort:'spade', name:'Лопата', type:'yield', level:null, price:40, image:'images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[737] = {item_id:737, nshort:'dynamite', name:'Динамит', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[739] = {item_id:739, nshort:'fence', name:'Колючая проволока', type:'yield', level:null, price:36, image:'images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[740] = {item_id:740, nshort:'horn', name:'Коровий рог', type:'yield', level:null, price:78, image:'images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'Кувшин', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[742] = {item_id:742, nshort:'saw', name:'Пила', type:'yield', level:null, price:40, image:'images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[743] = {item_id:743, nshort:'poster', name:'Плакат', type:'yield', level:null, price:4, image:'images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[744] = {item_id:744, nshort:'newspaper', name:'Газета', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[745] = {item_id:745, nshort:'flour', name:'Мука', type:'yield', level:null, price:5, image:'images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[746] = {item_id:746, nshort:'beans', name:'Фасоль', type:'yield', level:null, price:6, image:'images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[747] = {item_id:747, nshort:'hammer', name:'Молоток', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[748] = {item_id:748, nshort:'corn', name:'Кукуруза', type:'yield', level:null, price:4, image:'images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[749] = {item_id:749, nshort:'rope', name:'Лассо', type:'yield', level:null, price:32, image:'images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[750] = {item_id:750, nshort:'nippers', name:'Наручники', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[751] = {item_id:751, nshort:'pipe', name:'Трубка мира', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[752] = {item_id:752, nshort:'oil', name:'Нефть', type:'yield', level:null, price:76, image:'images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[753] = {item_id:753, nshort:'pick', name:'Кирка', type:'yield', level:null, price:44, image:'images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[754] = {item_id:754, nshort:'horseshoe', name:'Подкова', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[755] = {item_id:755, nshort:'flag', name:'Флажок', type:'yield', level:null, price:32, image:'images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[756] = {item_id:756, nshort:'toolbox', name:'Ящик с инструментами', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[757] = {item_id:757, nshort:'feather', name:'Перо ворона', type:'yield', level:null, price:8, image:'images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[758] = {item_id:758, nshort:'flag_north', name:'Союзный флаг', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[759] = {item_id:759, nshort:'ticket', name:'Железнодорожный билет', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[760] = {item_id:760, nshort:'map', name:'Карта', type:'yield', level:null, price:32, image:'images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Кувалда', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[762] = {item_id:762, nshort:'flag_south', name:'Флаг конфедерации', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[763] = {item_id:763, nshort:'wolf', name:'Браслет из зубов', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[764] = {item_id:764, nshort:'shackle', name:'Кандалы', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[765] = {item_id:765, nshort:'sickle', name:'Серп', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[766] = {item_id:766, nshort:'water', name:'Стакан воды', type:'yield', level:null, price:6, image:'images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[767] = {item_id:767, nshort:'string', name:'Катушка проволоки', type:'yield', level:null, price:34, image:'images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[768] = {item_id:768, nshort:'hymnal', name:'Псалтырь', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'drop'};\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Пустая бутылка', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[770] = {item_id:770, nshort:'beer', name:'Пиво', type:'yield', level:null, price:0, image:'images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[771] = {item_id:771, nshort:'trap', name:'Капкан на бобра', type:'yield', level:null, price:50, image:'images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[772] = {item_id:772, nshort:'falcon', name:'Золотой сокол', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[773] = {item_id:773, nshort:'paper1', name:'Обрывок (I часть)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[774] = {item_id:774, nshort:'paper2', name:'Обрывок (II часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[775] = {item_id:775, nshort:'paper3', name:'Обрывок (III часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[776] = {item_id:776, nshort:'kates_ring', name:'Кольцо Кейт', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Кастрюля', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[779] = {item_id:779, nshort:'post_horn', name:'Почтовый рожок', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[780] = {item_id:780, nshort:'rounds', name:'Патроны', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[781] = {item_id:781, nshort:'documents', name:'Документы', type:'yield', level:null, price:120, image:'images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[782] = {item_id:782, nshort:'angle', name:'Удочка', type:'yield', level:null, price:42, image:'images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Золотая статуэтка', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[784] = {item_id:784, nshort:'nails', name:'Гвозди', type:'yield', level:null, price:8, image:'images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[786] = {item_id:786, nshort:'picture', name:'Картина', type:'yield', level:null, price:340, image:'images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[787] = {item_id:787, nshort:'saddle', name:'Седло', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[788] = {item_id:788, nshort:'bell', name:'Корабельный колокол', type:'yield', level:null, price:130, image:'images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[789] = {item_id:789, nshort:'coin', name:'Монета', type:'yield', level:null, price:2, image:'images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[790] = {item_id:790, nshort:'iron', name:'Железо', type:'yield', level:null, price:36, image:'images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[791] = {item_id:791, nshort:'orange', name:'Апельсины', type:'yield', level:null, price:8, image:'images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[792] = {item_id:792, nshort:'tequila', name:'Текила', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'drop'};\
items[793] = {item_id:793, nshort:'tomato', name:'Помидор', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[794] = {item_id:794, nshort:'potion', name:'Эликсир', type:'yield', level:null, price:360, image:'images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'drop'};\
items[795] = {item_id:795, nshort:'peg', name:'Колышек', type:'yield', level:null, price:15, image:'images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[796] = {item_id:796, nshort:'brush_shoe', name:'Обувная щётка', type:'yield', level:null, price:14, image:'images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[797] = {item_id:797, nshort:'pitchfork', name:'Вилы', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'drop'};\
\
\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Галька', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png?1', image_mini:'images/items/right_arm/mini/stone_pebble.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[801] = {item_id:801, nshort:'stone_flint', name:'Кремень', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png?1', image_mini:'images/items/right_arm/mini/stone_flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[802] = {item_id:802, nshort:'stone_granite', name:'Гранит', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png?1', image_mini:'images/items/right_arm/mini/stone_granite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Потрёпанная рогатка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png?1', image_mini:'images/items/right_arm/mini/crutch_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[804] = {item_id:804, nshort:'crutch', name:'Рогатка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png?1', image_mini:'images/items/right_arm/mini/crutch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Точная рогатка', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png?1', image_mini:'images/items/right_arm/mini/crutch_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Рогатка Гека Финна', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png?1', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Ржавый кремнёвый пистолет', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png?1', image_mini:'images/items/right_arm/mini/leadshot_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'Кремнёвый пистолет', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png?1', image_mini:'images/items/right_arm/mini/leadshot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Точный кремнёвый пистолет', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png?1', image_mini:'images/items/right_arm/mini/leadshot_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Пистолет Гранмонта', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png?1', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, drop:'drop'};\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Ржавое дульнозарядное ружьё', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Дульнозарядное ружьё', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png?1', image_mini:'images/items/right_arm/mini/muzzleloader.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Точное дульнозарядное ружьё', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Дульнозарядное ружьё Дрейка', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Ржавый дерринджер', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png?1', image_mini:'images/items/right_arm/mini/deringer_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[816] = {item_id:816, nshort:'deringer', name:'Дерринджер', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png?1', image_mini:'images/items/right_arm/mini/deringer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Точный дерринджер', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png?1', image_mini:'images/items/right_arm/mini/deringer_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Дерринджер Белль Старр', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Ржавый многоствольный револьвер', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png?1', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[820] = {item_id:820, nshort:'pepperbox', name:'Многоствольный револьвер', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png?1', image_mini:'images/items/right_arm/mini/pepperbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Точный многоствольный револьвер', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png?1', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Многоствольный револьвер Аллена', type:'right_arm', level:50, price:6850, image:'images/items/right_arm/pepperbox_allen.png?1', image_mini:'images/items/right_arm/mini/pepperbox_allen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, aim:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Ржавый Смит-Вессон №1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png?1', image_mini:'images/items/right_arm/mini/smith_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[824] = {item_id:824, nshort:'smith', name:'Смит-Вессон №1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png?1', image_mini:'images/items/right_arm/mini/smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Точный Смит-Вессон №1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png?1', image_mini:'images/items/right_arm/mini/smith_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Ржавый армейский револьвер', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png?1', image_mini:'images/items/right_arm/mini/remington_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[828] = {item_id:828, nshort:'remington', name:'Армейский револьвер', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png?1', image_mini:'images/items/right_arm/mini/remington.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Точный армейский револьвер', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png?1', image_mini:'images/items/right_arm/mini/remington_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[830] = {item_id:830, nshort:'remington_ike', name:'Армейский револьвер Айка', type:'right_arm', level:65, price:9400, image:'images/items/right_arm/remington_ike.png?1', image_mini:'images/items/right_arm/mini/remington_ike.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:7, tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Ржавый кольт Миротворец', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png?1', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[832] = {item_id:832, nshort:'peacemaker', name:'Кольт Миротворец', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png?1', image_mini:'images/items/right_arm/mini/peacemaker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Точный кольт Миротворец', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png?1', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Кольт Миротворец Билли', type:'right_arm', level:75, price:10300, image:'images/items/right_arm/peacemaker_billy.png?1', image_mini:'images/items/right_arm/mini/peacemaker_billy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Ржавый Скофилд', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png?1', image_mini:'images/items/right_arm/mini/schofield_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[836] = {item_id:836, nshort:'schofield', name:'Скофилд', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png?1', image_mini:'images/items/right_arm/mini/schofield.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Точный Скофилд', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png?1', image_mini:'images/items/right_arm/mini/schofield_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Скофилд Джесси Джеймса', type:'right_arm', level:80, price:10600, image:'images/items/right_arm/schofield_jessejames.png?1', image_mini:'images/items/right_arm/mini/schofield_jessejames.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:8, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Ржавый Бантлайн', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png?1', image_mini:'images/items/right_arm/mini/buntline_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[840] = {item_id:840, nshort:'buntline', name:'Бантлайн', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png?1', image_mini:'images/items/right_arm/mini/buntline.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Точный Бантлайн', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png?1', image_mini:'images/items/right_arm/mini/buntline_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Бантлайн Уайатта Эрпа', type:'right_arm', level:85, price:11200, image:'images/items/right_arm/buntline_wyattearp.png?1', image_mini:'images/items/right_arm/mini/buntline_wyattearp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[843] = {item_id:843, nshort:'boomerang', name:'Бумеранг', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png?1', image_mini:'images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Метательные ножи', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png?1', image_mini:'images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[845] = {item_id:845, nshort:'sawed_off', name:'Обрез', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png?1', image_mini:'images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[846] = {item_id:846, nshort:'trompet', name:'Труба', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png?1', image_mini:'images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\
\
items[854] = {item_id:854, nshort:'elixier', name:'Кислота', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png?1', image_mini:'images/items/right_arm/mini/elixier.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Тухлые яйца', type:'right_arm', level:45, price:2500, image:'images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'images/items/right_arm/mini/smells_like_eggspirit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
\
items[858] = {item_id:858, nshort:'golden_gun', name:'Золотой кольт', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/golden_gun.png?1', image_mini:'images/items/right_arm/mini/golden_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:4}, attributes:{}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Детская праща', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_gun.png?1', image_mini:'images/items/right_arm/mini/greenhorn_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png?1', image_mini:'images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[1701] = {item_id:1701, nshort:'arrow', name:'Стрелы', type:'yield', level:null, price:5, image:'images/items/yield/arrow.png?1', image_mini:'images/items/yield/arrow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1702] = {item_id:1702, nshort:'compass', name:'Компас', type:'yield', level:null, price:380, image:'images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1703] = {item_id:1703, nshort:'lamp', name:'Лампа', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1706] = {item_id:1706, nshort:'letter', name:'Письмо', type:'yield', level:null, price:1, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Виски', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1709] = {item_id:1709, nshort:'gold', name:'Сокровища индейцев', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1710] = {item_id:1710, nshort:'key1', name:'Первый ключ', type:'yield', level:null, price:42, image:'images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1711] = {item_id:1711, nshort:'key2', name:'Второй ключ', type:'yield', level:null, price:46, image:'images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1712] = {item_id:1712, nshort:'key3', name:'Третий ключ', type:'yield', level:null, price:7500, image:'images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1715] = {item_id:1715, nshort:'cane', name:'Трость', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'quest'};\
items[1716] = {item_id:1716, nshort:'letter', name:'Личное письмо', type:'yield', level:null, price:2, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Ночной горшок', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Посылка Генри', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1750] = {item_id:1750, nshort:'ponytail', name:'Коса',  type:'yield', level:null, price:66,  image:'images/items/yield/ponytail.png?1',  image_mini:'images/items/yield/ponytail.png?1', characterClass:null,  characterSex:null, speed:null, bonus:{skills:{}, attributes:{}},  set:{key:null, name:null}, shop:'quest'};\
items[1751] = {item_id:1751, nshort:'ruby', name:'Рубин', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1752] = {item_id:1752, nshort:'egg1', name:'Первое яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1753] = {item_id:1753, nshort:'egg2', name:'Второе яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1754] = {item_id:1754, nshort:'egg3', name:'Третье яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1755] = {item_id:1755, nshort:'bag', name:'Мешок с добычей', type:'yield', level:null, price:2000, image:'images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1756] = {item_id:1756, nshort:'mask', name:'Маска', type:'yield', level:null, price:200, image:'images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Прототип', type:'yield', level:null, price:1, image:'images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Брак', type:'yield', level:null, price:1, image:'images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Фейерверк', type:'yield', level:null, price:2700, image:'images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'drop'};\
items[1760] = {item_id:1760, nshort:'bucket', name:'Пустое ведро', type:'yield', level:null, price:20, image:'images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1761] = {item_id:1761, nshort:'bucket_full', name:'Полное ведро', type:'yield', level:null, price:21, image:'images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Ведро', type:'yield', level:null, price:25, image:'images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'fireworker_set', name:'Набор пожарного'}, shop:'quest'};\
\
items[1766] = {item_id:1766, nshort:'mudball', name:'Ком грязи', type:'yield', level:null, price:1, image:'images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1767] = {item_id:1767, nshort:'muditem', name:'Нечто грязное', type:'yield', level:null, price:10, image:'images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1768] = {item_id:1768, nshort:'dustgun', name:'Пыльный револьвер', type:'yield', level:null, price:100, image:'images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1769] = {item_id:1769, nshort:'goldgun', name:'Золотой револьвер', type:'yield', level:null, price:100, image:'images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Окровавленный лоскут', type:'yield', level:null, price:1, image:'images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1771] = {item_id:1771, nshort:'photo', name:'Старая фотография', type:'yield', level:null, price:1, image:'images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1772] = {item_id:1772, nshort:'umbrella', name:'Зонтик', type:'yield', level:42, price:2800, image:'images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'quest'};\
items[1773] = {item_id:1773, nshort:'testament', name:'Завещание', type:'yield', level:null, price:1, image:'images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1774] = {item_id:1774, nshort:'engagementring', name:'Кольцо', type:'yield', level:null, price:1, image:'images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Свидетельство о рождении', type:'yield', level:null, price:1, image:'images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1776] = {item_id:1776, nshort:'darkplans', name:'Коварные планы', type:'yield', level:null, price:1, image:'images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1777] = {item_id:1777, nshort:'docreport', name:'Врачебное свидетельство', type:'yield', level:null, price:1, image:'images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1778] = {item_id:1778, nshort:'brandingiron', name:'Гнутое тавро', type:'yield', level:null, price:1, image:'images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'Первая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1780] = {item_id:1780, nshort:'cardpiece2', name:'Вторая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1781] = {item_id:1781, nshort:'cardpiece3', name:'Третья часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1782] = {item_id:1782, nshort:'cardpiece4', name:'Четвёртая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1783] = {item_id:1783, nshort:'cardcomplete', name:'Полная карта', type:'yield', level:null, price:1, image:'images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1784] = {item_id:1784, nshort:'itemlist', name:'Список вещей', type:'yield', level:null, price:1, image:'images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1785] = {item_id:1785, nshort:'torch', name:'Факел', type:'yield', level:null, price:1, image:'images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1786] = {item_id:1786, nshort:'bagpack', name:'Рюкзак', type:'yield', level:null, price:1, image:'images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1787] = {item_id:1787, nshort:'ashes', name:'Пепел', type:'yield', level:null, price:1, image:'images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1788] = {item_id:1788, nshort:'gravel', name:'Гравий', type:'yield', level:null, price:10, image:'images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Сломанная лопата', type:'yield', level:null, price:50, image:'images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1790] = {item_id:1790, nshort:'treeboat', name:'Выдолбленный ствол дерева', type:'yield', level:null, price:50, image:'images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1791] = {item_id:1791, nshort:'golddust', name:'Золотая пыль', type:'yield', level:null, price:100, image:'images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1792] = {item_id:1792, nshort:'goldnugget', name:'Золото', type:'yield', level:null, price:5000, image:'images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1793] = {item_id:1793, nshort:'bendmetall', name:'Гнутая, замызганная железяка', type:'yield', level:null, price:1, image:'images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Грязная железяка', type:'yield', level:null, price:10, image:'images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1795] = {item_id:1795, nshort:'goldblade', name:'Отмытый золотой клинок', type:'yield', level:null, price:100, image:'images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Острый клинок', type:'yield', level:null, price:100, image:'images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Рапорт шерифа', type:'yield', level:null, price:10, image:'images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1799] = {item_id:1799, nshort:'crystallball', name:'Хрустальный шар', type:'yield', level:null, price:10000, image:'images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1800] = {item_id:1800, nshort:'toadblood', name:'Кровь жабы', type:'yield', level:null, price:10, image:'images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Сердце койота', type:'yield', level:null, price:10, image:'images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Портрет', type:'yield', level:null, price:10, image:'images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1803] = {item_id:1803, nshort:'candyorange', name:'Апельсин в сахаре', type:'yield', level:null, price:10, image:'images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1804] = {item_id:1804, nshort:'smellingfish', name:'Тухлая рыба', type:'yield', level:null, price:10, image:'images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Иголка с ниткой', type:'yield', level:null, price:5, image:'images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1806] = {item_id:1806, nshort:'cottonbale', name:'Тюк хлопка', type:'yield', level:null, price:15, image:'images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1807] = {item_id:1807, nshort:'sock', name:'Носок', type:'yield', level:null, price:0, image:'images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1808] = {item_id:1808, nshort:'potatoe', name:'Картошка', type:'yield', level:null, price:5, image:'images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1809] = {item_id:1809, nshort:'hay', name:'Сено', type:'yield', level:null, price:5, image:'images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1810] = {item_id:1810, nshort:'pumpkin', name:'Тыква', type:'yield', level:null, price:25, image:'images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1811] = {item_id:1811, nshort:'blueberries', name:'Черника', type:'yield', level:null, price:15, image:'images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1812] = {item_id:1812, nshort:'pit', name:'Косточка', type:'yield', level:null, price:1, image:'images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Перо орла', type:'yield', level:null, price:35, image:'images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1814] = {item_id:1814, nshort:'lotus', name:'Цветок лотоса', type:'yield', level:null, price:45, image:'images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1815] = {item_id:1815, nshort:'crabmeat', name:'Мясо краба', type:'yield', level:null, price:12, image:'images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1816] = {item_id:1816, nshort:'chalk', name:'Мел', type:'yield', level:null, price:2, image:'images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Шерифская звезда', type:'yield', level:null, price:50, image:'images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Серная порода', type:'yield', level:null, price:25, image:'images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1819] = {item_id:1819, nshort:'pokergame', name:'Колода для покера', type:'yield', level:null, price:150, image:'images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1820] = {item_id:1820, nshort:'snakehide', name:'Змеиная кожа', type:'yield', level:null, price:27, image:'images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Селитра', type:'yield', level:null, price:13, image:'images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1822] = {item_id:1822, nshort:'cigaretts', name:'Сигареты', type:'yield', level:null, price:3, image:'images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Шкура пумы', type:'yield', level:null, price:55, image:'images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1826] = {item_id:1826, nshort:'rum', name:'Ром', type:'yield', level:null, price:7, image:'images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1827] = {item_id:1827, nshort:'lead', name:'Свинец', type:'yield', level:null, price:27, image:'images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Рубин', type:'yield', level:null, price:75, image:'images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Изумруд', type:'yield', level:null, price:55, image:'images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1831] = {item_id:1831, nshort:'woodcross', name:'Деревянный крест', type:'yield', level:null, price:3, image:'images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1832] = {item_id:1832, nshort:'metall_chip', name:'Железная фишка', type:'yield', level:null, price:50, image:'images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1833] = {item_id:1833, nshort:'death_warrant', name:'Смертный приговор', type:'yield', level:null, price:5, image:'images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1834] = {item_id:1834, nshort:'peaceflower', name:'Цветок мира', type:'yield', level:null, price:1, image:'images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1835] = {item_id:1835, nshort:'rose', name:'Роза', type:'yield', level:null, price:10, image:'images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Свидетельство о браке', type:'yield', level:null, price:2, image:'images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
\
items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Серые рваные штаны', type:'pants', level:1, price:10, image:'images/items/pants/shredded_grey.png?1', image_mini:'images/items/pants/mini/shredded_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Жёлтые рваные штаны', type:'pants', level:1, price:35, image:'images/items/pants/shredded_yellow.png?1', image_mini:'images/items/pants/mini/shredded_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:1, leadership:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Синие рваные штаны', type:'pants', level:2, price:55, image:'images/items/pants/shredded_blue.png?1', image_mini:'images/items/pants/mini/shredded_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:2, ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10003] = {item_id:10003, nshort:'shredded_green', name:'Зелёные рваные штаны', type:'pants', level:2, price:65, image:'images/items/pants/shredded_green.png?1', image_mini:'images/items/pants/mini/shredded_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:1, punch:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Коричневые рваные штаны', type:'pants', level:3, price:95, image:'images/items/pants/shredded_brown.png?1', image_mini:'images/items/pants/mini/shredded_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10005] = {item_id:10005, nshort:'shredded_black', name:'Чёрные рваные штаны', type:'pants', level:3, price:95, image:'images/items/pants/shredded_black.png?1', image_mini:'images/items/pants/mini/shredded_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Знатные рваные штаны', type:'pants', level:4, price:290, image:'images/items/pants/shredded_p1.png?1', image_mini:'images/items/pants/mini/shredded_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Рваные штаны Джима', type:'pants', level:6, price:420, image:'images/items/pants/shredded_fine.png?1', image_mini:'images/items/pants/mini/shredded_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Серые шорты', type:'pants', level:7, price:232, image:'images/items/pants/shorts_grey.png?1', image_mini:'images/items/pants/mini/shorts_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3, swim:3, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Жёлтые шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_yellow.png?1', image_mini:'images/items/pants/mini/shorts_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:5, hide:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Синие шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_blue.png?1', image_mini:'images/items/pants/mini/shorts_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, trade:2, ride:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10013] = {item_id:10013, nshort:'shorts_green', name:'Зелёные шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_green.png?1', image_mini:'images/items/pants/mini/shorts_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:5, punch:4, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Коричневые шорты', type:'pants', level:9, price:470, image:'images/items/pants/shorts_brown.png?1', image_mini:'images/items/pants/mini/shorts_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10015] = {item_id:10015, nshort:'shorts_black', name:'Чёрные шорты', type:'pants', level:9, price:480, image:'images/items/pants/shorts_black.png?1', image_mini:'images/items/pants/mini/shorts_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Знатные шорты', type:'pants', level:10, price:1280, image:'images/items/pants/shorts_p1.png?1', image_mini:'images/items/pants/mini/shorts_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Шорты Фрэнка Батлера', type:'pants', level:12, price:1460, image:'images/items/pants/shorts_fine.png?1', image_mini:'images/items/pants/mini/shorts_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:7, dodge:7, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Серые прямые штаны', type:'pants', level:12, price:360, image:'images/items/pants/puritan_grey.png?1', image_mini:'images/items/pants/mini/puritan_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Жёлтые прямые штаны', type:'pants', level:13, price:600, image:'images/items/pants/puritan_yellow.png?1', image_mini:'images/items/pants/mini/puritan_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Синие прямые штаны', type:'pants', level:13, price:640, image:'images/items/pants/puritan_blue.png?1', image_mini:'images/items/pants/mini/puritan_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10023] = {item_id:10023, nshort:'puritan_green', name:'Зелёные прямые штаны', type:'pants', level:13, price:630, image:'images/items/pants/puritan_green.png?1', image_mini:'images/items/pants/mini/puritan_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, endurance:5, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Коричневые прямые штаны', type:'pants', level:14, price:650, image:'images/items/pants/puritan_brown.png?1', image_mini:'images/items/pants/mini/puritan_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10025] = {item_id:10025, nshort:'puritan_black', name:'Чёрные прямые штаны', type:'pants', level:14, price:670, image:'images/items/pants/puritan_black.png?1', image_mini:'images/items/pants/mini/puritan_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:9, trade:5, shot:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Знатные прямые штаны', type:'pants', level:15, price:1680, image:'images/items/pants/puritan_p1.png?1', image_mini:'images/items/pants/mini/puritan_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Прямые штаны Гека Финна', type:'pants', level:16, price:1800, image:'images/items/pants/puritan_fine.png?1', image_mini:'images/items/pants/mini/puritan_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Серые бриджи', type:'pants', level:16, price:610, image:'images/items/pants/shortscheck_grey.png?1', image_mini:'images/items/pants/mini/shortscheck_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:10, punch:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Жёлтые бриджи', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_yellow.png?1', image_mini:'images/items/pants/mini/shortscheck_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Синие бриджи', type:'pants', level:17, price:1560, image:'images/items/pants/shortscheck_blue.png?1', image_mini:'images/items/pants/mini/shortscheck_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Зелёные бриджи', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_green.png?1', image_mini:'images/items/pants/mini/shortscheck_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Коричневые бриджи', type:'pants', level:18, price:1620, image:'images/items/pants/shortscheck_brown.png?1', image_mini:'images/items/pants/mini/shortscheck_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:10, aim:7, dodge:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Чёрные бриджи', type:'pants', level:18, price:1660, image:'images/items/pants/shortscheck_black.png?1', image_mini:'images/items/pants/mini/shortscheck_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:10, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Знатные бриджи', type:'pants', level:19, price:2880, image:'images/items/pants/shortscheck_p1.png?1', image_mini:'images/items/pants/mini/shortscheck_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Бриджи Вашингтона Ирвинга', type:'pants', level:20, price:3120, image:'images/items/pants/shortscheck_fine.png?1', image_mini:'images/items/pants/mini/shortscheck_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10040] = {item_id:10040, nshort:'check_grey', name:'Серые клетчатые штаны', type:'pants', level:20, price:690, image:'images/items/pants/check_grey.png?1', image_mini:'images/items/pants/mini/check_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10041] = {item_id:10041, nshort:'check_yellow', name:'Жёлтые клетчатые штаны', type:'pants', level:21, price:1720, image:'images/items/pants/check_yellow.png?1', image_mini:'images/items/pants/mini/check_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10042] = {item_id:10042, nshort:'check_blue', name:'Синие клетчатые штаны', type:'pants', level:21, price:1760, image:'images/items/pants/check_blue.png?1', image_mini:'images/items/pants/mini/check_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10043] = {item_id:10043, nshort:'check_green', name:'Зелёные клетчатые штаны', type:'pants', level:21, price:1780, image:'images/items/pants/check_green.png?1', image_mini:'images/items/pants/mini/check_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10044] = {item_id:10044, nshort:'check_brown', name:'Коричневые клетчатые штаны', type:'pants', level:22, price:1840, image:'images/items/pants/check_brown.png?1', image_mini:'images/items/pants/mini/check_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10045] = {item_id:10045, nshort:'check_black', name:'Чёрные клетчатые штаны', type:'pants', level:22, price:1880, image:'images/items/pants/check_black.png?1', image_mini:'images/items/pants/mini/check_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10046] = {item_id:10046, nshort:'check_p1', name:'Знатные клетчатые штаны', type:'pants', level:24, price:3540, image:'images/items/pants/check_p1.png?1', image_mini:'images/items/pants/mini/check_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10047] = {item_id:10047, nshort:'check_fine', name:'Клетчатые штаны Анни Окли', type:'pants', level:25, price:3630, image:'images/items/pants/check_fine.png?1', image_mini:'images/items/pants/mini/check_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12, aim:14, dodge:10, health:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10050] = {item_id:10050, nshort:'fur_grey', name:'Серые меховые штаны', type:'pants', level:25, price:1230, image:'images/items/pants/fur_grey.png?1', image_mini:'images/items/pants/mini/fur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Жёлтые меховые штаны', type:'pants', level:26, price:3000, image:'images/items/pants/fur_yellow.png?1', image_mini:'images/items/pants/mini/fur_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10052] = {item_id:10052, nshort:'fur_blue', name:'Синие меховые штаны', type:'pants', level:26, price:3060, image:'images/items/pants/fur_blue.png?1', image_mini:'images/items/pants/mini/fur_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, pitfall:14, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10053] = {item_id:10053, nshort:'fur_green', name:'Зелёные меховые штаны', type:'pants', level:26, price:3000, image:'images/items/pants/fur_green.png?1', image_mini:'images/items/pants/mini/fur_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10054] = {item_id:10054, nshort:'fur_brown', name:'Коричневые меховые штаны', type:'pants', level:27, price:3090, image:'images/items/pants/fur_brown.png?1', image_mini:'images/items/pants/mini/fur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10055] = {item_id:10055, nshort:'fur_black', name:'Чёрные меховые штаны', type:'pants', level:27, price:3120, image:'images/items/pants/fur_black.png?1', image_mini:'images/items/pants/mini/fur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:17, endurance:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10056] = {item_id:10056, nshort:'fur_p1', name:'Знатные меховые штаны', type:'pants', level:30, price:4725, image:'images/items/pants/fur_p1.png?1', image_mini:'images/items/pants/mini/fur_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:15, ride:15, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10057] = {item_id:10057, nshort:'fur_fine', name:'Шайеннские меховые штаны', type:'pants', level:32, price:5075, image:'images/items/pants/fur_fine.png?1', image_mini:'images/items/pants/mini/fur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Серый комбинезон', type:'pants', level:31, price:1395, image:'images/items/pants/dungarees_grey.png?1', image_mini:'images/items/pants/mini/dungarees_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Жёлтый комбинезон', type:'pants', level:32, price:3360, image:'images/items/pants/dungarees_yellow.png?1', image_mini:'images/items/pants/mini/dungarees_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Синий комбинезон', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_blue.png?1', image_mini:'images/items/pants/mini/dungarees_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:9, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Зелёный комбинезон', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_green.png?1', image_mini:'images/items/pants/mini/dungarees_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:14, endurance:12, tough:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Коричневый комбинезон', type:'pants', level:33, price:3510, image:'images/items/pants/dungarees_brown.png?1', image_mini:'images/items/pants/mini/dungarees_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Чёрный комбинезон', type:'pants', level:33, price:3540, image:'images/items/pants/dungarees_black.png?1', image_mini:'images/items/pants/mini/dungarees_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:14, tactic:10, leadership:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Знатный комбинезон', type:'pants', level:35, price:5250, image:'images/items/pants/dungarees_p1.png?1', image_mini:'images/items/pants/mini/dungarees_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Комбинезон Боба-строителя', type:'pants', level:38, price:5775, image:'images/items/pants/dungarees_fine.png?1', image_mini:'images/items/pants/mini/dungarees_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10070] = {item_id:10070, nshort:'fine_grey', name:'Серые холщовые штаны', type:'pants', level:37, price:1470, image:'images/items/pants/fine_grey.png?1', image_mini:'images/items/pants/mini/fine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Жёлтые холщовые штаны', type:'pants', level:38, price:3600, image:'images/items/pants/fine_yellow.png?1', image_mini:'images/items/pants/mini/fine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, pitfall:7, ride:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10072] = {item_id:10072, nshort:'fine_blue', name:'Синие холщовые штаны', type:'pants', level:38, price:3570, image:'images/items/pants/fine_blue.png?1', image_mini:'images/items/pants/mini/fine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, swim:15, hide:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10073] = {item_id:10073, nshort:'fine_green', name:'Зелёные холщовые штаны', type:'pants', level:38, price:3570, image:'images/items/pants/fine_green.png?1', image_mini:'images/items/pants/mini/fine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, tactic:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10074] = {item_id:10074, nshort:'fine_brown', name:'Коричневые холщовые штаны', type:'pants', level:40, price:3630, image:'images/items/pants/fine_brown.png?1', image_mini:'images/items/pants/mini/fine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10075] = {item_id:10075, nshort:'fine_black', name:'Чёрные холщовые штаны', type:'pants', level:40, price:3450, image:'images/items/pants/fine_black.png?1', image_mini:'images/items/pants/mini/fine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10076] = {item_id:10076, nshort:'fine_p1', name:'Знатные холщовые штаны', type:'pants', level:45, price:5775, image:'images/items/pants/fine_p1.png?1', image_mini:'images/items/pants/mini/fine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10077] = {item_id:10077, nshort:'fine_fine', name:'Холщовые штаны Бэта Мастерсона', type:'pants', level:48, price:6300, image:'images/items/pants/fine_fine.png?1', image_mini:'images/items/pants/mini/fine_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:18, hide:18}, attributes:{dexterity:3, flexibility:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Серые брюки', type:'pants', level:41, price:2020, image:'images/items/pants/breeches_grey.png?1', image_mini:'images/items/pants/mini/breeches_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Жёлтые брюки', type:'pants', level:42, price:5000, image:'images/items/pants/breeches_yellow.png?1', image_mini:'images/items/pants/mini/breeches_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Синие брюки', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_blue.png?1', image_mini:'images/items/pants/mini/breeches_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10083] = {item_id:10083, nshort:'breeches_green', name:'Зелёные брюки', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_green.png?1', image_mini:'images/items/pants/mini/breeches_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Коричневые брюки', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_brown.png?1', image_mini:'images/items/pants/mini/breeches_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10085] = {item_id:10085, nshort:'breeches_black', name:'Чёрные брюки', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_black.png?1', image_mini:'images/items/pants/mini/breeches_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Знатные брюки', type:'pants', level:50, price:7965, image:'images/items/pants/breeches_p1.png?1', image_mini:'images/items/pants/mini/breeches_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10090] = {item_id:10090, nshort:'indian_grey', name:'Серые индейские штаны', type:'pants', level:51, price:3330, image:'images/items/pants/indian_grey.png?1', image_mini:'images/items/pants/mini/indian_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5, build:15}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Жёлтые индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_yellow.png?1', image_mini:'images/items/pants/mini/indian_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10092] = {item_id:10092, nshort:'indian_blue', name:'Синие индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_blue.png?1', image_mini:'images/items/pants/mini/indian_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10093] = {item_id:10093, nshort:'indian_green', name:'Зелёные индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_green.png?1', image_mini:'images/items/pants/mini/indian_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:20, hide:12, reflex:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10094] = {item_id:10094, nshort:'indian_brown', name:'Коричневые индейские штаны', type:'pants', level:55, price:7150, image:'images/items/pants/indian_brown.png?1', image_mini:'images/items/pants/mini/indian_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10095] = {item_id:10095, nshort:'indian_black', name:'Чёрные индейские штаны', type:'pants', level:55, price:7300, image:'images/items/pants/indian_black.png?1', image_mini:'images/items/pants/mini/indian_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10096] = {item_id:10096, nshort:'indian_p1', name:'Знатные индейские штаны', type:'pants', level:60, price:11100, image:'images/items/pants/indian_p1.png?1', image_mini:'images/items/pants/mini/indian_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Серые чаппарахас', type:'pants', level:54, price:4095, image:'images/items/pants/chapsrough_grey.png?1', image_mini:'images/items/pants/mini/chapsrough_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Жёлтые чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_yellow.png?1', image_mini:'images/items/pants/mini/chapsrough_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15, health:18, punch:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Синие чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_blue.png?1', image_mini:'images/items/pants/mini/chapsrough_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:17, endurance:14, build:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Зелёные чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_green.png?1', image_mini:'images/items/pants/mini/chapsrough_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Коричневые чаппарахас', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_brown.png?1', image_mini:'images/items/pants/mini/chapsrough_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Чёрные чаппарахас', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_black.png?1', image_mini:'images/items/pants/mini/chapsrough_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Знатные чаппарахас', type:'pants', level:65, price:12610, image:'images/items/pants/chapsrough_p1.png?1', image_mini:'images/items/pants/mini/chapsrough_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Серые солдатские штаны', type:'pants', level:61, price:5160, image:'images/items/pants/cavalry_grey.png?1', image_mini:'images/items/pants/mini/cavalry_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, swim:12, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Жёлтые солдатские штаны', type:'pants', level:63, price:9660, image:'images/items/pants/cavalry_yellow.png?1', image_mini:'images/items/pants/mini/cavalry_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Синие солдатские штаны', type:'pants', level:63, price:9600, image:'images/items/pants/cavalry_blue.png?1', image_mini:'images/items/pants/mini/cavalry_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:18, endurance:18}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Зелёные солдатские штаны', type:'pants', level:63, price:9540, image:'images/items/pants/cavalry_green.png?1', image_mini:'images/items/pants/mini/cavalry_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Коричневые солдатские штаны', type:'pants', level:65, price:9720, image:'images/items/pants/cavalry_brown.png?1', image_mini:'images/items/pants/mini/cavalry_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Чёрные солдатские штаны', type:'pants', level:65, price:10020, image:'images/items/pants/cavalry_black.png?1', image_mini:'images/items/pants/mini/cavalry_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Знатные солдатские штаны', type:'pants', level:75, price:15120, image:'images/items/pants/cavalry_p1.png?1', image_mini:'images/items/pants/mini/cavalry_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Серые джинсы', type:'pants', level:71, price:7590, image:'images/items/pants/jeans_grey.png?1', image_mini:'images/items/pants/mini/jeans_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Жёлтые джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_yellow.png?1', image_mini:'images/items/pants/mini/jeans_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Синие джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_blue.png?1', image_mini:'images/items/pants/mini/jeans_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10123] = {item_id:10123, nshort:'jeans_green', name:'Зелёные джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_green.png?1', image_mini:'images/items/pants/mini/jeans_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Коричневые джинсы', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_brown.png?1', image_mini:'images/items/pants/mini/jeans_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10125] = {item_id:10125, nshort:'jeans_black', name:'Чёрные джинсы', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_black.png?1', image_mini:'images/items/pants/mini/jeans_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Знатные джинсы', type:'pants', level:90, price:18900, image:'images/items/pants/jeans_p1.png?1', image_mini:'images/items/pants/mini/jeans_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10130] = {item_id:10130, nshort:'leather_grey', name:'Серые кожаные штаны', type:'pants', level:76, price:8880, image:'images/items/pants/leather_grey.png?1', image_mini:'images/items/pants/mini/leather_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:28}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Жёлтые кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_yellow.png?1', image_mini:'images/items/pants/mini/leather_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:18, tough:20}, attributes:{strength:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10132] = {item_id:10132, nshort:'leather_blue', name:'Синие кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_blue.png?1', image_mini:'images/items/pants/mini/leather_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10133] = {item_id:10133, nshort:'leather_green', name:'Зелёные кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_green.png?1', image_mini:'images/items/pants/mini/leather_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10134] = {item_id:10134, nshort:'leather_brown', name:'Коричневые кожаные штаны', type:'pants', level:85, price:14625, image:'images/items/pants/leather_brown.png?1', image_mini:'images/items/pants/mini/leather_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10135] = {item_id:10135, nshort:'leather_black', name:'Чёрные кожаные штаны', type:'pants', level:85, price:14625, image:'images/items/pants/leather_black.png?1', image_mini:'images/items/pants/mini/leather_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10136] = {item_id:10136, nshort:'leather_p1', name:'Знатные кожаные штаны', type:'pants', level:95, price:20400, image:'images/items/pants/leather_p1.png?1', image_mini:'images/items/pants/mini/leather_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Серые мягкие чаппарахас', type:'pants', level:84, price:11625, image:'images/items/pants/chapsfine_grey.png?1', image_mini:'images/items/pants/mini/chapsfine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Жёлтые мягкие чаппарахас', type:'pants', level:88, price:16660, image:'images/items/pants/chapsfine_yellow.png?1', image_mini:'images/items/pants/mini/chapsfine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:20, swim:24, tough:20}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Синие мягкие чаппарахас', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_blue.png?1', image_mini:'images/items/pants/mini/chapsfine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Зелёные мягкие чаппарахас', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_green.png?1', image_mini:'images/items/pants/mini/chapsfine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Коричневые мягкие чаппарахас', type:'pants', level:94, price:18105, image:'images/items/pants/chapsfine_brown.png?1', image_mini:'images/items/pants/mini/chapsfine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Чёрные мягкие чаппарахас', type:'pants', level:94, price:18360, image:'images/items/pants/chapsfine_black.png?1', image_mini:'images/items/pants/mini/chapsfine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Знатные мягкие чаппарахас', type:'pants', level:99, price:23130, image:'images/items/pants/chapsfine_p1.png?1', image_mini:'images/items/pants/mini/chapsfine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:25, dodge:30, health:19}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Рейтузы', type:'pants', level:1, price:259, image:'images/items/pants/greenhorn_pants.png?1', image_mini:'images/items/pants/mini/greenhorn_pants.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Серый шерстяной пояс', type:'belt', level:1, price:10, image:'images/items/belt/cotton_grey.png?1', image_mini:'images/items/belt/mini/cotton_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Жёлтый шерстяной пояс', type:'belt', level:2, price:35, image:'images/items/belt/cotton_yellow.png?1', image_mini:'images/items/belt/mini/cotton_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Синий шерстяной пояс', type:'belt', level:3, price:45, image:'images/items/belt/cotton_blue.png?1', image_mini:'images/items/belt/mini/cotton_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:1, ride:1, punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11003] = {item_id:11003, nshort:'cotton_green', name:'Зелёный шерстяной пояс', type:'belt', level:3, price:45, image:'images/items/belt/cotton_green.png?1', image_mini:'images/items/belt/mini/cotton_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1, tough:1, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Коричневый шерстяной пояс', type:'belt', level:4, price:60, image:'images/items/belt/cotton_brown.png?1', image_mini:'images/items/belt/mini/cotton_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11005] = {item_id:11005, nshort:'cotton_black', name:'Чёрный шерстяной пояс', type:'belt', level:4, price:60, image:'images/items/belt/cotton_black.png?1', image_mini:'images/items/belt/mini/cotton_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Знатный шерстяной пояс', type:'belt', level:5, price:250, image:'images/items/belt/cotton_p1.png?1', image_mini:'images/items/belt/mini/cotton_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11007] = {item_id:11007, nshort:'cotton_fine', name:'Шерстяной пояс Джона Баттерфилда', type:'belt', level:8, price:390, image:'images/items/belt/cotton_fine.png?1', image_mini:'images/items/belt/mini/cotton_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Серый в клеточку пояс', type:'belt', level:7, price:142, image:'images/items/belt/check_grey_belt.png?1', image_mini:'images/items/belt/mini/check_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Жёлтый в клеточку пояс', type:'belt', level:8, price:290, image:'images/items/belt/check_yellow_belt.png?1', image_mini:'images/items/belt/mini/check_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Синий в клеточку пояс', type:'belt', level:9, price:310, image:'images/items/belt/check_blue_belt.png?1', image_mini:'images/items/belt/mini/check_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Зелёный в клеточку пояс', type:'belt', level:10, price:370, image:'images/items/belt/check_green_belt.png?1', image_mini:'images/items/belt/mini/check_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Коричневый в клеточку пояс', type:'belt', level:11, price:390, image:'images/items/belt/check_brown_belt.png?1', image_mini:'images/items/belt/mini/check_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Чёрный в клеточку пояс', type:'belt', level:11, price:390, image:'images/items/belt/check_black_belt.png?1', image_mini:'images/items/belt/mini/check_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:6, hide:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Знатный пояс в клетку', type:'belt', level:12, price:1160, image:'images/items/belt/check_p1_belt.png?1', image_mini:'images/items/belt/mini/check_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Серый ремень', type:'belt', level:12, price:210, image:'images/items/belt/fine_grey_belt.png?1', image_mini:'images/items/belt/mini/fine_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Жёлтый ремень', type:'belt', level:14, price:450, image:'images/items/belt/fine_yellow_belt.png?1', image_mini:'images/items/belt/mini/fine_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Синий ремень', type:'belt', level:14, price:440, image:'images/items/belt/fine_blue_belt.png?1', image_mini:'images/items/belt/mini/fine_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Зелёный ремень', type:'belt', level:15, price:480, image:'images/items/belt/fine_green_belt.png?1', image_mini:'images/items/belt/mini/fine_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Коричневый ремень', type:'belt', level:15, price:480, image:'images/items/belt/fine_brown_belt.png?1', image_mini:'images/items/belt/mini/fine_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Чёрный ремень', type:'belt', level:17, price:540, image:'images/items/belt/fine_black_belt.png?1', image_mini:'images/items/belt/mini/fine_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, tactic:6, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Знатный ремень', type:'belt', level:17, price:1300, image:'images/items/belt/fine_p1_belt.png?1', image_mini:'images/items/belt/mini/fine_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, leadership:7, punch:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Ремень Томаса Бентона', type:'belt', level:20, price:1620, image:'images/items/belt/fine_fine_belt.png?1', image_mini:'images/items/belt/mini/fine_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Серый пояс с пряжкой', type:'belt', level:18, price:420, image:'images/items/belt/buckle_grey.png?1', image_mini:'images/items/belt/mini/buckle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Жёлтый пояс с пряжкой', type:'belt', level:20, price:1160, image:'images/items/belt/buckle_yellow.png?1', image_mini:'images/items/belt/mini/buckle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Синий пояс с пряжкой', type:'belt', level:20, price:1140, image:'images/items/belt/buckle_blue.png?1', image_mini:'images/items/belt/mini/buckle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11033] = {item_id:11033, nshort:'buckle_green', name:'Зелёный пояс с пряжкой', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_green.png?1', image_mini:'images/items/belt/mini/buckle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9, dodge:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Коричневый пояс с пряжкой', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_brown.png?1', image_mini:'images/items/belt/mini/buckle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:9, punch:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11035] = {item_id:11035, nshort:'buckle_black', name:'Чёрный пояс с пряжкой', type:'belt', level:24, price:1520, image:'images/items/belt/buckle_black.png?1', image_mini:'images/items/belt/mini/buckle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Знатный пояс с пряжкой', type:'belt', level:25, price:2700, image:'images/items/belt/buckle_p1.png?1', image_mini:'images/items/belt/mini/buckle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, tactic:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Пояс с пряжкой Чарльза Гуднайта', type:'belt', level:27, price:3000, image:'images/items/belt/buckle_fine.png?1', image_mini:'images/items/belt/mini/buckle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11040] = {item_id:11040, nshort:'bull_grey', name:'Серый пояс с бизоном', type:'belt', level:23, price:490, image:'images/items/belt/bull_grey.png?1', image_mini:'images/items/belt/mini/bull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Жёлтый пояс с бизоном', type:'belt', level:24, price:1360, image:'images/items/belt/bull_yellow.png?1', image_mini:'images/items/belt/mini/bull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:14}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11042] = {item_id:11042, nshort:'bull_blue', name:'Синий пояс с бизоном', type:'belt', level:24, price:1320, image:'images/items/belt/bull_blue.png?1', image_mini:'images/items/belt/mini/bull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:2, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11043] = {item_id:11043, nshort:'bull_green', name:'Зелёный пояс с бизоном', type:'belt', level:26, price:1400, image:'images/items/belt/bull_green.png?1', image_mini:'images/items/belt/mini/bull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, animal:8, repair:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11044] = {item_id:11044, nshort:'bull_brown', name:'Коричневый пояс с бизоном', type:'belt', level:27, price:1500, image:'images/items/belt/bull_brown.png?1', image_mini:'images/items/belt/mini/bull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:7, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11045] = {item_id:11045, nshort:'bull_black', name:'Чёрный пояс с бизоном', type:'belt', level:27, price:1540, image:'images/items/belt/bull_black.png?1', image_mini:'images/items/belt/mini/bull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11046] = {item_id:11046, nshort:'bull_p1', name:'Знатный пояс с бизоном', type:'belt', level:28, price:2940, image:'images/items/belt/bull_p1.png?1', image_mini:'images/items/belt/mini/bull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11047] = {item_id:11047, nshort:'bull_fine', name:'Пояс с бизоном Билла Хикока', type:'belt', level:30, price:3210, image:'images/items/belt/bull_fine.png?1', image_mini:'images/items/belt/mini/bull_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11050] = {item_id:11050, nshort:'studs_grey', name:'Серый клёпаный ремень', type:'belt', level:27, price:780, image:'images/items/belt/studs_grey.png?1', image_mini:'images/items/belt/mini/studs_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Жёлтый клёпаный ремень', type:'belt', level:28, price:2220, image:'images/items/belt/studs_yellow.png?1', image_mini:'images/items/belt/mini/studs_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:11, swim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11052] = {item_id:11052, nshort:'studs_blue', name:'Синий клёпаный ремень', type:'belt', level:28, price:2100, image:'images/items/belt/studs_blue.png?1', image_mini:'images/items/belt/mini/studs_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11053] = {item_id:11053, nshort:'studs_green', name:'Зелёный клёпаный ремень', type:'belt', level:30, price:2280, image:'images/items/belt/studs_green.png?1', image_mini:'images/items/belt/mini/studs_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:19}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11054] = {item_id:11054, nshort:'studs_brown', name:'Коричневый клёпаный ремень', type:'belt', level:30, price:2340, image:'images/items/belt/studs_brown.png?1', image_mini:'images/items/belt/mini/studs_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, punch:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11055] = {item_id:11055, nshort:'studs_black', name:'Чёрный клёпаный ремень', type:'belt', level:31, price:2430, image:'images/items/belt/studs_black.png?1', image_mini:'images/items/belt/mini/studs_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, ride:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11056] = {item_id:11056, nshort:'studs_p1', name:'Знатный клёпаный ремень', type:'belt', level:32, price:3640, image:'images/items/belt/studs_p1.png?1', image_mini:'images/items/belt/mini/studs_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:12, pitfall:12, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11057] = {item_id:11057, nshort:'studs_fine', name:'Клёпаный ремень Сэма Хьюстона', type:'belt', level:35, price:3990, image:'images/items/belt/studs_fine.png?1', image_mini:'images/items/belt/mini/studs_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, aim:11, ride:12, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11060] = {item_id:11060, nshort:'horse_grey', name:'Серый пояс с лошадью', type:'belt', level:31, price:840, image:'images/items/belt/horse_grey.png?1', image_mini:'images/items/belt/mini/horse_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Жёлтый пояс с лошадью', type:'belt', level:33, price:2430, image:'images/items/belt/horse_yellow.png?1', image_mini:'images/items/belt/mini/horse_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11062] = {item_id:11062, nshort:'horse_blue', name:'Синий пояс с лошадью', type:'belt', level:33, price:2370, image:'images/items/belt/horse_blue.png?1', image_mini:'images/items/belt/mini/horse_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11063] = {item_id:11063, nshort:'horse_green', name:'Зелёный пояс с лошадью', type:'belt', level:35, price:2520, image:'images/items/belt/horse_green.png?1', image_mini:'images/items/belt/mini/horse_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11064] = {item_id:11064, nshort:'horse_brown', name:'Коричневый пояс с лошадью', type:'belt', level:35, price:2520, image:'images/items/belt/horse_brown.png?1', image_mini:'images/items/belt/mini/horse_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11065] = {item_id:11065, nshort:'horse_black', name:'Чёрный пояс с лошадью', type:'belt', level:36, price:2640, image:'images/items/belt/horse_black.png?1', image_mini:'images/items/belt/mini/horse_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11066] = {item_id:11066, nshort:'horse_p1', name:'Знатный пояс с лошадью', type:'belt', level:37, price:3395, image:'images/items/belt/horse_p1.png?1', image_mini:'images/items/belt/mini/horse_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11067] = {item_id:11067, nshort:'horse_fine', name:'Пояс Сета Буллока с лошадью', type:'belt', level:40, price:4130, image:'images/items/belt/horse_fine.png?1', image_mini:'images/items/belt/mini/horse_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Серый пояс с орлом', type:'belt', level:37, price:885, image:'images/items/belt/eagle_grey.png?1', image_mini:'images/items/belt/mini/eagle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, pitfall:7, build:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Жёлтый пояс с орлом', type:'belt', level:38, price:2310, image:'images/items/belt/eagle_yellow.png?1', image_mini:'images/items/belt/mini/eagle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:11, endurance:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Синий пояс с орлом', type:'belt', level:38, price:2460, image:'images/items/belt/eagle_blue.png?1', image_mini:'images/items/belt/mini/eagle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11073] = {item_id:11073, nshort:'eagle_green', name:'Зелёный пояс с орлом', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_green.png?1', image_mini:'images/items/belt/mini/eagle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Коричневый пояс с орлом', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_brown.png?1', image_mini:'images/items/belt/mini/eagle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11075] = {item_id:11075, nshort:'eagle_black', name:'Чёрный пояс с орлом', type:'belt', level:45, price:2940, image:'images/items/belt/eagle_black.png?1', image_mini:'images/items/belt/mini/eagle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13, trade:12, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Знатный пояс с орлом', type:'belt', level:45, price:4200, image:'images/items/belt/eagle_p1.png?1', image_mini:'images/items/belt/mini/eagle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Пояс Аля Сверенгена с орлом', type:'belt', level:48, price:4235, image:'images/items/belt/eagle_fine.png?1', image_mini:'images/items/belt/mini/eagle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, shot:8, ride:15}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Серый патронташ', type:'belt', level:44, price:1300, image:'images/items/belt/ammo_grey.png?1', image_mini:'images/items/belt/mini/ammo_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Жёлтый патронташ', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_yellow.png?1', image_mini:'images/items/belt/mini/ammo_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Синий патронташ', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_blue.png?1', image_mini:'images/items/belt/mini/ammo_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11083] = {item_id:11083, nshort:'ammo_green', name:'Зелёный патронташ', type:'belt', level:48, price:3600, image:'images/items/belt/ammo_green.png?1', image_mini:'images/items/belt/mini/ammo_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, trade:10, tactic:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Коричневый патронташ', type:'belt', level:49, price:4000, image:'images/items/belt/ammo_brown.png?1', image_mini:'images/items/belt/mini/ammo_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11085] = {item_id:11085, nshort:'ammo_black', name:'Чёрный патронташ', type:'belt', level:49, price:4120, image:'images/items/belt/ammo_black.png?1', image_mini:'images/items/belt/mini/ammo_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Знатный патронташ', type:'belt', level:52, price:5805, image:'images/items/belt/ammo_p1.png?1', image_mini:'images/items/belt/mini/ammo_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Патронташ Джейн-катастрофы', type:'belt', level:57, price:6750, image:'images/items/belt/ammo_fine.png?1', image_mini:'images/items/belt/mini/ammo_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11102] = {item_id:11102, nshort:'skull_grey', name:'Серый пояс с черепом', type:'belt', level:57, price:4875, image:'images/items/belt/skull_grey.png?1', image_mini:'images/items/belt/mini/skull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Жёлтый пояс с черепом', type:'belt', level:60, price:6825, image:'images/items/belt/skull_yellow.png?1', image_mini:'images/items/belt/mini/skull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, tough:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11104] = {item_id:11104, nshort:'skull_blue', name:'Синий пояс с черепом', type:'belt', level:60, price:4200, image:'images/items/belt/skull_blue.png?1', image_mini:'images/items/belt/mini/skull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, endurance:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11105] = {item_id:11105, nshort:'skull_green', name:'Зелёный пояс с черепом', type:'belt', level:65, price:7020, image:'images/items/belt/skull_green.png?1', image_mini:'images/items/belt/mini/skull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11106] = {item_id:11106, nshort:'skull_brown', name:'Коричневый пояс с черепом', type:'belt', level:65, price:7020, image:'images/items/belt/skull_brown.png?1', image_mini:'images/items/belt/mini/skull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11107] = {item_id:11107, nshort:'skull_black', name:'Чёрный пояс с черепом', type:'belt', level:70, price:7560, image:'images/items/belt/skull_black.png?1', image_mini:'images/items/belt/mini/skull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11108] = {item_id:11108, nshort:'skull_p1', name:'Знатный пояс с черепом', type:'belt', level:70, price:9900, image:'images/items/belt/skull_p1.png?1', image_mini:'images/items/belt/mini/skull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Серый пояс с пистолетами', type:'belt', level:75, price:7350, image:'images/items/belt/pistols_grey.png?1', image_mini:'images/items/belt/mini/pistols_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:15, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Жёлтый пояс с пистолетами', type:'belt', level:85, price:9870, image:'images/items/belt/pistols_yellow.png?1', image_mini:'images/items/belt/mini/pistols_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Синий пояс с пистолетами', type:'belt', level:90, price:7975, image:'images/items/belt/pistols_blue.png?1', image_mini:'images/items/belt/mini/pistols_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:15, dodge:25}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11113] = {item_id:11113, nshort:'pistols_green', name:'Зелёный пояс с пистолетами', type:'belt', level:95, price:11115, image:'images/items/belt/pistols_green.png?1', image_mini:'images/items/belt/mini/pistols_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Коричневый пояс с пистолетами', type:'belt', level:100, price:10725, image:'images/items/belt/pistols_brown.png?1', image_mini:'images/items/belt/mini/pistols_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11115] = {item_id:11115, nshort:'pistols_black', name:'Чёрный пояс с пистолетами', type:'belt', level:105, price:11700, image:'images/items/belt/pistols_black.png?1', image_mini:'images/items/belt/mini/pistols_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Знатный пояс с пистолетами', type:'belt', level:110, price:15600, image:'images/items/belt/pistols_p1.png?1', image_mini:'images/items/belt/mini/pistols_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Кожаный ремень', type:'belt', level:4, price:375, image:'images/items/belt/greenhorn_belt.png?1', image_mini:'images/items/belt/mini/greenhorn_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:2, shot:3, build:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[12700] = {item_id:12700, nshort:'adventcal', name:'Рождественский календарь', type:'yield', level:null, price:10, image:'images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Лакрица', type:'yield', level:null, price:15, image:'images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Овёс', type:'yield', level:null, price:32, image:'images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Хлопушка', type:'yield', level:null, price:27, image:'images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Пряник', type:'yield', level:null, price:31, image:'images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Шоколадное печенье', type:'yield', level:null, price:29, image:'images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Марципановая картошка', type:'yield', level:null, price:39, image:'images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12707] = {item_id:12707, nshort:'xmas_coal', name:'Уголёк', type:'yield', level:null, price:2, image:'images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Стеклянный шарик', type:'yield', level:null, price:35, image:'images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12709] = {item_id:12709, nshort:'xmas_present', name:'Подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present.png?1', image_mini:'images/items/yield/xmas_present.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12710] = {item_id:12710, nshort:'xmas_present_mid', name:'Красивый подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Особый подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Мешочек с шариками', type:'yield', level:null, price:330, image:'images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Аптечка', type:'yield', level:null, price:590, image:'images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Шерстяное пончо', type:'body', level:1, price:125, image:'images/items/body/greenhorn_poncho.png?1', image_mini:'images/items/body/mini/greenhorn_poncho.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, tough:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
";

pk2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Выпас свиней', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\
raboty[2] = {rus_name:'Присмотр за полем', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\
raboty[3] = {rus_name:'Расклейка плакатов', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\
raboty[4] = {rus_name:'Сбор табака', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\
raboty[5] = {rus_name:'Сбор хлопка', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\
raboty[6] = {rus_name:'Сбор сахарного тростника', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\
raboty[7] = {rus_name:'Рыбалка', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\
raboty[8] = {rus_name:'Жатва', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\
raboty[9] = {rus_name:'Сбор ягод', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\
raboty[10] = {rus_name:'Выпас овец', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\
raboty[11] = {rus_name:'Продажа прессы', name:'newspaper', malus:8, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\
raboty[12] = {rus_name:'Сенокос', name:'cut', malus:21, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\
raboty[13] = {rus_name:'Помол зерна', name:'grinding', malus:24, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\
raboty[14] = {rus_name:'Сбор кукурузы', name:'corn', malus:22, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\
raboty[15] = {rus_name:'Сбор фасоли', name:'beans', malus:22, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\
raboty[16] = {rus_name:'Охрана форта', name:'fort_guard', malus:24, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\
raboty[17] = {rus_name:'Дубление кожи', name:'tanning', malus:39, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\
raboty[18] = {rus_name:'Поиск золота', name:'digging', malus:30, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17, 1791:1}}};\
raboty[19] = {rus_name:'Захоронение', name:'grave', malus:75, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\
raboty[20] = {rus_name:'Охота на индейку', name:'turkey', malus:42, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\
raboty[21] = {rus_name:'Строительство железной дороги', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\
raboty[22] = {rus_name:'Выпас коров', name:'cow', malus:38, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\
raboty[23] = {rus_name:'Ремонт забора', name:'fence', malus:35, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\
raboty[24] = {rus_name:'Лесопилка', name:'saw', malus:63, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\
raboty[25] = {rus_name:'Выработка камня', name:'stone', malus:52, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\
raboty[26] = {rus_name:'Спрямление русла', name:'straighten', malus:84, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\
raboty[27] = {rus_name:'Лесоповал', name:'wood', malus:47, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\
raboty[28] = {rus_name:'Орошение', name:'irrigation', malus:44, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\
raboty[29] = {rus_name:'Клеймение скота', name:'brand', malus:49, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\
raboty[30] = {rus_name:'Ограждение пастбища', name:'wire', malus:57, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\
raboty[31] = {rus_name:'Прорыв плотины', name:'dam', malus:53, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\
raboty[32] = {rus_name:'Добыча самоцветов', name:'gems', malus:74, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\
raboty[33] = {rus_name:'Разметка приисков', name:'claim', malus:56, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\
raboty[34] = {rus_name:'Ремонт повозок', name:'chuck_wagon', malus:133, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\
raboty[35] = {rus_name:'Объезд лошадей', name:'break_in', malus:71, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\
raboty[36] = {rus_name:'Торговля', name:'trade', malus:84, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\
raboty[37] = {rus_name:'Прокладка телеграфной линии', name:'mast', malus:74, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\
raboty[38] = {rus_name:'Рытьё колодца', name:'spring', malus:102, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\
raboty[39] = {rus_name:'Охота на бобра', name:'beaver', malus:119, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\
raboty[40] = {rus_name:'Добыча угля', name:'coal', malus:85, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\
raboty[41] = {rus_name:'Типография', name:'print', malus:82, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\
raboty[42] = {rus_name:'Рыбная ловля', name:'fishing', malus:90, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\
raboty[43] = {rus_name:'Строительство вокзала', name:'trainstation', malus:112, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\
raboty[44] = {rus_name:'Строительство ветряной мельницы', name:'windmeel', malus:163, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\
raboty[45] = {rus_name:'Рекогносцировка', name:'explore', malus:111, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\
raboty[46] = {rus_name:'Сплав леса', name:'float', malus:137, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\
raboty[47] = {rus_name:'Строительство моста', name:'bridge', malus:107, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\
raboty[48] = {rus_name:'Отлов лошадей', name:'springe', malus:134, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\
raboty[49] = {rus_name:'Изготовление гробов', name:'coffin', malus:118, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\
raboty[50] = {rus_name:'Доставка амуниции', name:'dynamite', malus:144, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\
raboty[51] = {rus_name:'Охота на койотов', name:'coyote', malus:140, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\
raboty[52] = {rus_name:'Охота на бизона', name:'buffalo', malus:178, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\
raboty[53] = {rus_name:'Строительство особняка', name:'fort', malus:224, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\
raboty[54] = {rus_name:'Торговля с индейцами', name:'indians', malus:223, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\
raboty[55] = {rus_name:'Вырубка леса', name:'clearing', malus:178, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\
raboty[56] = {rus_name:'Добыча серебра', name:'silver', malus:193, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\
raboty[57] = {rus_name:'Охрана дилижанса', name:'diligence_guard', malus:403, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\
raboty[58] = {rus_name:'Охота на волков', name:'wolf', malus:207, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\
raboty[59] = {rus_name:'Охрана каравана', name:'track', malus:212, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\
raboty[60] = {rus_name:'Конокрадство', name:'ox', malus:237, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\
raboty[61] = {rus_name:'Охрана тюрьмы', name:'guard', malus:221, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\
raboty[62] = {rus_name:'Миссионерство', name:'bible', malus:235, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};\
raboty[63] = {rus_name:'Пони-экспресс', name:'ponyexpress', malus:225, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\
raboty[64] = {rus_name:'Торговля оружием с индейцами', name:'weapons', malus:257, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\
raboty[65] = {rus_name:'Мародёрство', name:'dead', malus:265, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\
raboty[66] = {rus_name:'Охота на гризли', name:'grizzly', malus:280, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\
raboty[67] = {rus_name:'Добыча нефти', name:'oil', malus:294, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\
raboty[68] = {rus_name:'Поиски клада', name:'treasure_hunting', malus:293, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\
raboty[69] = {rus_name:'Служба в армии', name:'army', malus:298, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\
raboty[70] = {rus_name:'Мелкое воровство', name:'steal', malus:371, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\
raboty[71] = {rus_name:'Служба наёмником', name:'mercenary', malus:331, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\
raboty[72] = {rus_name:'Преследование бандитов', name:'bandits', malus:384, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\
raboty[73] = {rus_name:'Налёт', name:'aggression', malus:421, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\
raboty[74] = {rus_name:'Нападение на дилижанс', name:'diligence_aggression', malus:475, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\
raboty[75] = {rus_name:'Охота за преступниками', name:'bounty', malus:425, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};\
raboty[76] = {rus_name:'Перевозка заключённых', name:'captured', malus:437, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\
raboty[77] = {rus_name:'Нападение на поезд', name:'train', malus:505, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};\
raboty[78] = {rus_name:'Кража со взломом', name:'burglary', malus:517, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\
raboty[79] = {rus_name:'Знахарство', name:'quackery', malus:315, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\
raboty[80] = {rus_name:'Парламентёрство', name:'peace', malus:366, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\
raboty[82] = {rus_name:'Речные перевозки', name:'ship', malus:347, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\
raboty[83] = {rus_name:'Контрабанда', name:'smuggle', malus:410, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\
raboty[84] = {rus_name:'Строительство ранчо', name:'ranch', malus:220, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\
raboty[85] = {rus_name:'Добыча железа', name:'iron', malus:176, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\
raboty[86] = {rus_name:'Сбор агавы', name:'agave', malus:152, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\
raboty[87] = {rus_name:'Сбор помидоров', name:'tomato', malus:42, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\
raboty[88] = {rus_name:'Набивка подков', name:'horseshoe', malus:92, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\
raboty[90] = {rus_name:'Тушение пожара', name:'fire', malus:228, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\
raboty[91] = {rus_name:'Сбор апельсинов', name:'orange', malus:66, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\
raboty[92] = {rus_name:'Чистка хлева', name:'muck_out', malus:7, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\
raboty[93] = {rus_name:'Чистка обуви', name:'shoes', malus:0, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\
\
raboty[94] = {rus_name:'Штопка носков', name:'socks_darn', malus:0, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:75}}};\
raboty[95] = {rus_name:'Уборка картошки', name:'potatoe', malus:112, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};\
raboty[96] = {rus_name:'Кормление скота', name:'feed_animal', malus:146, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};\
raboty[97] = {rus_name:'Сбор тыквы', name:'pumpkin', malus:174, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};\
raboty[98] = {rus_name:'Сбор черники', name:'blueberries', malus:199, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};\
raboty[99] = {rus_name:'Озеленение', name:'plant_trees', malus:225, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};\
raboty[100] = {rus_name:'Сбор орлиных перьев', name:'gather_feathers', malus:275, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};\
raboty[101] = {rus_name:'Сбор лотоса', name:'lotus_gathering', malus:350, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};\
raboty[102] = {rus_name:'Ловля крабов', name:'crab_hunting', malus:375, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};\
raboty[103] = {rus_name:'Преподавание', name:'teaching', malus:400, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};\
raboty[104] = {rus_name:'Служба шерифом', name:'sheriff_work', malus:410, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};\
raboty[105] = {rus_name:'Добыча серы', name:'sulfur_gathering', malus:420, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};\
raboty[106] = {rus_name:'Сплав по бурному потоку', name:'wildwater', malus:425, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{0:25}}};\
raboty[107] = {rus_name:'Шулерство', name:'gambler', malus:430, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};\
raboty[108] = {rus_name:'Отлов гремучих змей', name:'rattlesnake', malus:440, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};\
raboty[109] = {rus_name:'Добыча селитры', name:'salpeter_gathering', malus:450, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};\
raboty[110] = {rus_name:'Перегонка лошадей', name:'horse_transport', malus:450, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};\
raboty[111] = {rus_name:'Организация родео', name:'rodeo', malus:499, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{}}};\
raboty[112] = {rus_name:'Коммивояжёрство', name:'travelling_salesman', malus:500, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{}}};\
raboty[113] = {rus_name:'Брачный аферист', name:'con_artist', malus:520, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};\
raboty[114] = {rus_name:'Охота на пуму', name:'cougar', malus:540, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};\
raboty[115] = {rus_name:'Доставка спиртного', name:'alcohol', malus:600, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};\
raboty[116] = {rus_name:'Добыча свинца', name:'lead_gathering', malus:620, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};\
raboty[117] = {rus_name:'Поиск редких самоцветов', name:'gem_gathering', malus:640, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{0:20}}};\
raboty[118] = {rus_name:'Сооружение миссии', name:'mission', malus:570, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};\
raboty[119] = {rus_name:'Строительство казино', name:'casino', malus:650, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};\
raboty[120] = {rus_name:'Служба шерифом округа', name:'marshall', malus:700, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};\
raboty[121] = {rus_name:'Борьба с бандитизмом', name:'shatter_gang', malus:725, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{0:10}}};\
raboty[122] = {rus_name:'Ограбление банка', name:'bankrobbery', malus:740, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{}}};\
raboty[123] = {rus_name:'Освобождение рабов', name:'free_slaves', malus:750, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};\
raboty[124] = {rus_name:'Выступление в шоу Баффало Билла', name:'buffelo_bill', malus:800, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};\
\
raboty[125] = {rus_name:'!СОН-жизнь', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[131] = {rus_name:'!Строительство в городе/форте', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[133] = {rus_name:'_Форт. Атака', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[134] = {rus_name:'_Форт. Атака (меткость)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[135] = {rus_name:'_Форт. Атака (уворот)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[136] = {rus_name:'_Форт. Защита', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[137] = {rus_name:'_Форт. Защита (меткость)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[138] = {rus_name:'_Форт. Защита (уворот)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
\
raboty[140] = {rus_name:'!СОН-энергия', name:'energy', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
raboty[141] = {rus_name:'!Передвижение', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[151] = {rus_name:'vs Стрелок-стрелок атака', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[152] = {rus_name:'vs Ударник-стрелок атака', name:'me_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[153] = {rus_name:'vs Стрелок-стрелок защита', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[154] = {rus_name:'vs Ударник-стрелок защита', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[155] = {rus_name:'vs Стрелок-ударник атака', name:'sh_vs_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[156] = {rus_name:'vs Ударник-ударник атака', name:'me_vs_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[157] = {rus_name:'vs Стрелок-ударник защита', name:'sh_vs_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[158] = {rus_name:'vs Ударник-ударник защита', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[159] = {rus_name:'vs Стрелок-все защита', name:'sh_vs_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[160] = {rus_name:'vs Ударник-все защита', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[161] = {rus_name:'vs2 Стрелок-стрелок атака', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[162] = {rus_name:'vs2 Ударник-стрелок атака', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[163] = {rus_name:'vs2 Стрелок-стрелок защита', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[164] = {rus_name:'vs2 Ударник-стрелок защита', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[165] = {rus_name:'vs2 Стрелок-ударник атака', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[166] = {rus_name:'vs2 Ударник-ударник атака', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[167] = {rus_name:'vs2 Стрелок-ударник защита', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[168] = {rus_name:'vs2 Ударник-ударник защита', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[169] = {rus_name:'vs2 Стрелок-все защита', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[170] = {rus_name:'vs2 Ударник-все защита', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
";

pk2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
komplekty.set_mexican[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
komplekty.set_quackery[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[131]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[131]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[131]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[131]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[131]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[131]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[131]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[131]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[131]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[131]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[131]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[131]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[2].raboty[i]=5};komplekty.set_dancer[2].raboty[131]=5;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[3].raboty[i]=15};komplekty.set_dancer[3].raboty[131]=15;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[4].raboty[i]=30};komplekty.set_dancer[4].raboty[131]=30;\
komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[5].raboty[i]=50};komplekty.set_dancer[5].raboty[131]=50;\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.fireworker_set=[];\
komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[1].raboty[90]=15;\
komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.gold_set=[];\
komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:8}}, speed:0.8333, raboty:[]};\
for (i=1;i<125;++i) {komplekty.gold_set[2].raboty[i]=25};komplekty.gold_set[2].raboty[131]=25;\
komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.greenhorn_set=[];\
komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2].raboty[6]=10;\
komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[3].raboty[6]=10;komplekty.greenhorn_set[3].raboty[27]=20;\
komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[4].raboty[6]=10;komplekty.greenhorn_set[4].raboty[27]=20;komplekty.greenhorn_set[4].raboty[17]=20;\
komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[5].raboty[6]=10;komplekty.greenhorn_set[5].raboty[27]=20;komplekty.greenhorn_set[5].raboty[17]=20;komplekty.greenhorn_set[5].raboty[20]=20;\
komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[6].raboty[6]=10;komplekty.greenhorn_set[6].raboty[27]=20;komplekty.greenhorn_set[6].raboty[17]=20;komplekty.greenhorn_set[6].raboty[20]=20;komplekty.greenhorn_set[6].raboty[22]=20;\
komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[7].raboty[6]=10;komplekty.greenhorn_set[7].raboty[27]=20;komplekty.greenhorn_set[7].raboty[17]=20;komplekty.greenhorn_set[7].raboty[20]=20;komplekty.greenhorn_set[7].raboty[22]=20;\
for (i=1;i<125;++i) {komplekty.greenhorn_set[7].raboty[i]=5};komplekty.greenhorn_set[7].raboty[130]=5;\
komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:0.8333, raboty:[]};\
komplekty.greenhorn_set[8].raboty[6]=10;komplekty.greenhorn_set[8].raboty[27]=20;komplekty.greenhorn_set[8].raboty[17]=20;komplekty.greenhorn_set[8].raboty[20]=20;komplekty.greenhorn_set[8].raboty[22]=20;\
for (i=1;i<125;++i) {komplekty.greenhorn_set[8].raboty[i]=15};komplekty.greenhorn_set[8].raboty[130]=15;\
";

// навыки характеристики
pk2_code += "\
pk2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
pk2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\
";

// ================== НАЧАЛО ФУКЦИЙ ==================

aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.pk2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.pk2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        aWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    aWindow.items[tid].set.key = obj.set.key;
	    aWindow.items[tid].set.name = obj.set.name;
	}
}

aWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (aWindow.items[tid].item_id!=item.item_id) return;
	if (aWindow.items[tid].nshort!=item.short){hard=false;aWindow.items[tid].nshort=item.short};
	if (aWindow.items[tid].name!=item.name){soft=false;aWindow.items[tid].name=item.name};
	if (aWindow.items[tid].type!=item.type){hard=false;aWindow.items[tid].type=item.type}
	if (aWindow.items[tid].level!=item.level){hard=false;aWindow.items[tid].level=item.level}
	if (aWindow.items[tid].price!=item.price){hard=false;aWindow.items[tid].price=item.price}
	if (aWindow.items[tid].image!=item.image){hard=false;aWindow.items[tid].image=item.image}
	if (aWindow.items[tid].image_mini!=item.image_mini){hard=false;aWindow.items[tid].image_mini=item.image_mini}
	if (aWindow.items[tid].characterClass!=item.characterClass){hard=false;aWindow.items[tid].characterClass=item.characterClass}
	if (aWindow.items[tid].characterSex!=item.characterSex){hard=false;aWindow.items[tid].characterSex=item.characterSex}
	if (aWindow.items[tid].speed!=item.speed){hard=false;aWindow.items[tid].speed=item.speed}
    
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&aWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=aWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||aWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&aWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=aWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||aWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (aWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=aWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=aWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

aWindow.print_citem = function (tid){
	result='';
	result += 'items[' + aWindow.items[tid].item_id + '] = {item_id:' + aWindow.items[tid].item_id + ', nshort:\'' + aWindow.items[tid].nshort;
	result += '\', name:\'' + aWindow.items[tid].name + '\', type:\'' + aWindow.items[tid].type + '\', level:' + aWindow.items[tid].level;
	result += ', price:' + aWindow.items[tid].price + ', image:\'' + aWindow.items[tid].image + '\', image_mini:\'' + aWindow.items[tid].image_mini + '\', characterClass:';
	cc = aWindow.items[tid].characterClass ? '\'' + aWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = aWindow.items[tid].characterSex ? '\'' + aWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + aWindow.items[tid].speed;
	if (aWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = aWindow.pk2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = aWindow.pk2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (aWindow.items[tid].set.key) {
		result += 'set:{key:\'' + aWindow.items[tid].set.key + '\', name:\'' + aWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+aWindow.items[tid].shop+'\'};';
	return result;
}

pk2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
prosto_veschi=[];\
prosto_veschi_max=8;\
for (ii = pk2_types.length; ii >= 0; --ii) {\
	vyborka[pk2_types[ii]] = {};\
	vyborka[pk2_types[ii]].simple = {};\
	vyborka[pk2_types[ii]].simple.spisok = [];\
	vyborka_z[pk2_types[ii]] = {};\
	vyborka_z[pk2_types[ii]].simple = {};\
	vyborka_z[pk2_types[ii]].simple.spisok = [];\
	vyborka_r[pk2_types[ii]] = {};\
	vyborka_r[pk2_types[ii]].simple = {};\
	vyborka_r[pk2_types[ii]].simple.spisok = [];\
	prosto_veschi[pk2_types[ii]]={};\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
pk2_htmlrab=[];\
pk2_sortrab=[];\
pk2_hiderab=[];\
pk2_bezto=0;\
\
pk2_predmetov = {};\
pk2_khochuka = [];\
pk2_uchet=[];\
pk2_aktiv=[];\
porabotaj=[];\
pk2_slots={};\
for (i=0;i<pk2_types.length;++i){\
	pk2_slots[pk2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
pk2_to=0;\
pk2_zas=0;\
pk2_ride=0; \
pers={};\
pk2_speed=1.0;\
ezda=false;\
pk2_onesk_rabot = false;\
chislo_rabot = 0;\
chislo_rabot_to = 0;\
khoroshi = [];\
khoroshi_to = [];\
";



aWindow.pk2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
	aWindow.pk2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
	for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.pk2_equipment[vv]=tid;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных у предмента неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
}

aWindow.pk2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('pk2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_khochuka[tid]){
		    if (!aWindow.pk2_uchet[tid]){
		        aWindow.pk2_khochuka[tid]=true;
		    }
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				/*
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				
				else*/ if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
}


aWindow.pk2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	aWindow.pk2_aktiv=null;
	aWindow.pk2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.pk2_uchet[vesch.item_id]&&!aWindow.pk2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}

	 if ((vesch.level != null)&&(vesch.level>(pers.level+plus_level))) check=false; // дополнение, возможно ошибка

		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.pk2_slots && aWindow.pk2_slots[vesch.type]&&!(aWindow.pk2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.pk2_aktiv.push(vesch.item_id);
	}
}

aWindow.pk2_ocenka_khlama = function(){
    aWindow.pk2_nenuzhnoe=[];
    if (!aWindow.pk2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
//    
    for (tid in aWindow.pk2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// дополнение, надо проверять, что это
// =====
    for (tid in aWindow.pk2_uchet){
        if ((tid < 12700)&&(tid >=10000)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// =====
}

aWindow.pk2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.pk2_sortrab = [];
    for (irab in aWindow.pk2_htmlrab){
        if (aWindow.pk2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.pk2_sortrab[ind_arr] = {};
        aWindow.pk2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0':
            aWindow.pk2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name':
            aWindow.pk2_sortrab[ind_arr].ves= (irab > 130) ? 'я ' : '';
            aWindow.pk2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'do':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dv':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.pk2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.pk2_sortrab,0,ind_arr);
    aWindow.pk2_reporter2();
}

//aWindow.pk2_setbezto = function(checked){
    //aWindow.pk2_bezto = !checked;
//}

aWindow.pk2_vesch_polezna = function(value){
    for (kh in aWindow.pk2_khochuka)
        aWindow.pk2_khochuka[kh] = false;
    if (value > 0)
        aWindow.pk2_khochuka[value] = true;
    aWindow.pk2_hideraboty(value);
}

aWindow.pk2_vreporter = function () {
    aWindow.pk2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 150)&&(count_rab <= 170)){
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 132)&&(count_rab <= 150)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=131){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=141){
            vrvr += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    vrvr += '<span class="skill_box_value" style="text-align:center; color:';
    		vrvr += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	vrvr += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        vrvr += '</td><td>';

        brbr = 0;
        vrvr += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {vrvr+='</tr><tr>'; brbr=1};
                vrvr += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
            ctype = aWindow.pk2_types[ee];
            vrvr += '<tr><td>';
            for (vv = aWindow.prosto_veschi[count_rab][ctype].length-1; vv >= 0;  --vv){
                sid = aWindow.prosto_veschi[count_rab][ctype][vv].tid;
                vrvr+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                vrvr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.prosto_veschi[count_rab][ctype][vv].bon;
                if (vesch.set.key){
                    vrvr += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    vrvr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                }
                vrvr += '</span>'
                vrvr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                vrvr+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.prosto_veschi[count_rab][ctype][vv].bon+'</p></div></div>'
                vrvr+='</a>'
                if (aWindow.prosto_veschi[count_rab][ctype][vv].price > 0){
                    vrvr+='<br />';
                    vrvr +='<span style=\"text-align:center;\">'+aWindow.prosto_veschi[count_rab][ctype][vv].price+'&nbsp;$</span>';
                }
                vrvr +='</div>';
            }
            vrvr += '</td></tr>'
        }
        vrvr += '</table></td></tr>';
        
    }
    vrvr += '</table>';
    document.getElementById('pk2_window_content').innerHTML=vrvr;
}

aWindow.pk2_reporter = function () {
//    new aWindow.HumanMessage('Начинаем вывод полученных данных', {type: 'success'});
    grgr='';
    aWindow.pk2_ocenka_khlama();
    count_rab=0;
    aWindow.pk2_show_window();
    aWindow.pk2_res2html();
    
    if (aWindow.pk2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.pk2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.pk2_khochuka[kh]=false;
        }
        aWindow.pk2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            if (aWindow.resultaty[rr].to > 0) aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_z[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_z[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_r[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.pk2_process=false;
    aWindow.pk2_sortir('name', aWindow.pk2_bezto);
}


pk2_code += "\
pk2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

pk2_code += "\
pk2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

pk2_code += "\
pk2_s2f_bonus2 = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

pk2_code += "\
pk2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1+(value-1)/2;\
    if (value < 10) return 2+(value-3)/7;\
    if (value < 23) return 3+(value-10)/13;\
    if (value < 43) return 4+(value-23)/20;\
    if (value < 71) return 5+(value-43)/28;\
    if (value < 108) return 6+(value-71)/37;\
    if (value < 155) return 7+(value-108)/47;\
    if (value < 211) return 8+(value-155)/56;\
    return 9;\
};\
";


aWindow.pk2_hideraboty = function(tid){
    aWindow.pk2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.pk2_types[kk]; ++kk) {};
    for (irab in aWindow.porabotaj){
        nea = true;
        if (aWindow.resultaty[irab]&&(aWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_z[irab]&&(aWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_r[irab]&&(aWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            aWindow.pk2_hiderab[irab]=true;
        }
    }
    aWindow.pk2_reporter2();
}


aWindow.pk2_s_print = function(nav, val){
    /*
    kha = aWindow.pk2_s2a[nav];
    result = '<div style=\"background-color:'
    if (kha == 'strength') {result += '#c33; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
    result+='\" >'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    */
    result='<div>'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
aWindow.pk2_a_print = function(kha, val){
/*
    result = '<div style=\"font-weight:bold; background-color:'
    if (kha == 'strength') {result += '#f44; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
*/
    result = '<div style=\"font-weight:bold;\" >'+aWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

pk2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";


pk2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[pk2_s2a[num_index]]){\
			och+=bonus.attributes[pk2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[pk2_s2a[ind_navyk]]){\
		och+=bonus.attributes[pk2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";


pk2_code += "\
pk2_vybvesch = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		prosto_veschi[irabota]={};\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			prosto_veschi[irabota][pk2_types[ii]]=[];\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
    		if (ochki > 0){\
				mv = -1;\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon === ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\
    			        mv = kk;\
    			    }\
    			    else{\
    			        break;\
    			    }\
    			}\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\
    			}\
    			else{\
    			    for (kk = 0; kk < mv; ++kk){\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\
    			}\
			}\
		}\
		resultaty[irabota] = {};\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\
		resultaty[irabota].ton = 0;\
		raboty[irabota].resultaty.to = resultaty[irabota].to;\
        rabnavyki[irabota]={};\
        for (num_index in raboty[irabota].navyki){\
            temp_n = {};\
            temp_n[num_index]=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            rabnavyki[irabota][num_index]={};\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
            rabnavyki[irabota][num_index].znach = val;\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\
        }\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
	pk2_vreporter();\
};\
";




pk2_code += "\
pk2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 132)||(irabota > 140))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[pk2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (pk2_uchet[cid]|| pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].health = vyborka[pk2_types[ii]][nabory[jj]].health;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[pk2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[pk2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_tonavyki = {};\
		for (oo in rabota.navyki){\
			pk2_tonavyki[oo] = pers.skills[oo];\
		}\
		pk2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
		rekurs_time-=500;\
		ii_rekur=0;\
		window.setTimeout(pk2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    pk2_reporter();\
};\
";



pk2_code += "\
pk2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = pk2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    pk2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            pk2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton.health += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			pk2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += pk2_s2f_bonus(pk2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
			if (pk2_tohealth >= pk2_zdorov)\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<pk2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = pk2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			\
    			pk2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
		if (samoe_ono.price >= 0) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		}else{vvv = 0};\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
		resultaty[irabota].to=0;\
		resultaty[irabota].ton=0;\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
		vvv = pk2_s2f_bonus(val);\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\
            }\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = pk2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
    pk2_vybzap_f();\
};\
";


pk2_code += "\
pk2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].bon = vyborka[pk2_types[ii]][nabory[jj]].bon;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\
		if (isNaN(psk)) psk=0;\
		pk2_to= psk - rabota.malus;\
		samoe_ono.to= pk2_to;\
		samoe_ono.ton=0;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_z();\
};\
";


pk2_code += "\
pk2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[pk2_types[ii]].simple.n = 1;\
			vyborka_z[pk2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[pk2_types[ii]].simple.n;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].bon = vyborka_z[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].price = vyborka_z[pk2_types[ii]][nabory[jj]].price;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].tid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].zas = vyborka_z[pk2_types[ii]][nabory[jj]].zas;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		pk2_zas=0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=pk2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_r();\
};\
";

pk2_code += "\
pk2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>132)||(!ezda))&&(irabota!=141))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=141)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[pk2_types[ii]].simple.n = 1;\
			vyborka_r[pk2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==141)||(resultaty[irabota].to > 0)){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[pk2_types[ii]].simple.n;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].bon = vyborka_r[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].price = vyborka_r[pk2_types[ii]][nabory[jj]].price;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].tid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].ride = vyborka_r[pk2_types[ii]][nabory[jj]].ride;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].speed = vyborka_r[pk2_types[ii]][nabory[jj]].speed;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		pk2_ride=0;\
		pk2_speed=1.0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=pk2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_f();\
};\
";



pk2_code += "\
pk2_rekurs = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]]\
				    }\
    			pk2_to += ton;\
	    		if (samoe_ono.to < pk2_to) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
	if (samoe_ono.price >= 0) {\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
	}\
	else{\
		for (i = 0; i < pk2_types.length; ++i) {\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = 0;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = 0;\
		}\
	}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
    pk2_vybzap();\
};\
";


pk2_code += "\
pk2_rekurs_z = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
				    }\
    			pk2_to += ton;\
    			pk2_zas += zan;\
	    		if ((samoe_ono.zas < pk2_zas)&&(pk2_to >= 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = pk2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka_z[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    pk2_vybzap_z();\
};\
";

pk2_code += "\
pk2_rekurs_r = function (){\
    nn = pk2_types.length;\
    rr = 8;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].speed;\
				    }\
    			pk2_to += ton;\
    			pk2_ride += rin;\
    			pk2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    pk2_speed = 100.0 / ic_objr[rr].speed + pk2_ride;\
    			}\
    			pk2_speed /= speen;\
    			pk2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < pk2_speed)&&(pk2_to > 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = pk2_ride;\
                    samoe_ono.speed = pk2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==141){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < pk2_types.length; ++i) {\
	    		vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < pk2_types.length; ++i) {\
			    vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    pk2_vybzap_r();\
};\
";
	
pk2_code +="\
pk2_auto_odev = function(va, rab){\
	pk2_odev_type=0;\
	pk2_odev_var=va;\
	pk2_odev_count=0;\
	pk2_odev_rab=rab;\
	pk2_odev_stat=true;\
	zz = document.getElementById('current_task_box_text');\
	zz.innerHTML='Ты одеваешься';\
	pk2_odev_window();\
};\
\
pk2_odev_add = function(va, irab){\
	if (va==='n')\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(передвижение)'}\
	if (!rrab||!rrab.items) return false;\
	for (ee = 0; ee < pk2_types.length; ++ee){\
		if (rrab.items[ee]&&rrab.items[ee].tid){\
			if (!pk2_odev_list[index]) pk2_odev_list[index]={};\
			pk2_odev_list[index][pk2_types[ee]] = rrab.items[ee].tid;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_remove = function(va, irab){\
	if (va==='n')\
		{index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{index=raboty[irab].rus_name+'_(передвижение)'}\
	if (pk2_odev_list[index]){\
		delete pk2_odev_list[index];\
		alert(index+' удалено!')\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_save_list = function(){\
	tempo = 'pk2_odev_list={';\
	for (ii in pk2_odev_list){\
		tempo+='\"'+ii+'\":';\
		tids = pk2_odev_list[ii];\
		tmp = '{';\
		for (ee = 0; ee < pk2_types.length; ++ee){\
			if (tids[pk2_types[ee]]){\
				tmp+=pk2_types[ee]+':'+tids[pk2_types[ee]]+', ';\
			}\
		}\
		tmp += '}';\
		tmp = tmp.replace(', }','}');\
		tempo+=tmp+', ';\
	};\
	tempo+='}';\
	tempo = tempo.replace(', }','}');\
	pk2_setValue(pk2_pre+'odev_list',tempo);\
};\
\
pk2_odev_spam_option = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	if (!equip_select) return;\
	equip_select.innerHTML='<option value=\"0\">Сохранённые наборы</option>';\
	arra={};\
	jj=0;\
	for (ii in pk2_odev_list) {arra[jj++]={ves:ii};}\
	qsort(arra,0,jj);\
	for (i=0;i<jj;++i){\
		ii=arra[i].ves;\
		t_op = document.createElement('option');\
		t_op.textContent = ii;\
		t_op.setAttribute('value',ii);\
		equip_select.appendChild(t_op);\
	}\
};\
\
pk2_odev_spam_go = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	irab=777;\
	resultaty[irab]={};\
	resultaty[irab].items={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		resultaty[irab].items[ee] = {};\
		if (pk2_odev_list[name][pk2_types[ee]]){\
			resultaty[irab].items[ee].tid = pk2_odev_list[name][pk2_types[ee]];\
		}\
	}\
	pk2_auto_odev('n',irab);\
};\
\
pk2_odev_spam_rewrite = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	spam_value = document.getElementById('pk2_spam_new');\
	name2 = spam_value.value;\
	if (pk2_odev_list[name]){\
		pk2_odev_list[name2]=pk2_odev_list[name];\
		delete pk2_odev_list[name];\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_del = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	if (pk2_odev_list[name]){\
		delete pk2_odev_list[name];\
		alert(name+' удалено!');\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_save = function(){\
	spam_value = document.getElementById('pk2_spam_new');\
	name = spam_value.value;\
	if (pk2_odev_list[name]){\
		gu_gu = confirm('Перезаписать набор '+name+' ?');\
		if (!gu_gu) return;\
	}\
	if (!Wear||!Wear.wear) return;\
	pk2_odev_list[name]={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		if (Wear.wear[pk2_types[ee]]){\
			pk2_odev_list[name][pk2_types[ee]] = Wear.wear[pk2_types[ee]].obj.item_id;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_spam = function(){\
	if (!pk2_odevalo4ka) return;\
	wear_div = document.getElementById('window_inventory_content');\
	if (!wear_div) {setTimeout(pk2_odev_spam,2000);return}\
 ww=wear_div.getElementById('char_head');\
 if (!ww) {setTimeout(pk2_odev_spam,2000);return}\
 if (document.getElementById('pk2_wear_spam')) {setTimeout(pk2_odev_spam,5000);return};\
        qwe=document.getElementById('window_inventory_title');\
	qwe.innerHTML=qwe.innerHTML.replace('Багаж','');\
 var wear_spam = document.createElement('div');\
 wear_spam.setAttribute('id', 'pk2_wear_spam');\
 wear_spam.setAttribute('style', 'position: absolute; top: 1px; left: 5px; padding: 3px; margin: 0px;font-size:75%;');\
 var wear_spam2 = document.createElement('div');\
 wear_spam2.setAttribute('id', 'pk2_wear_spam2');\
 wear_spam2.setAttribute('style', 'position: absolute; top: 1px; left: 140px; padding: 3px; margin: 0px;font-size:75%;');\
 wear_div.parentNode.insertBefore(wear_spam,wear_div);\
 wear_div.parentNode.insertBefore(wear_spam2,wear_div);\
	var store_set_link = document.createElement('a');\
	store_set_link.setAttribute('href', '#');\
	store_set_link.setAttribute('title', 'Сохранить текущую экипировку как набор');\
	store_set_link.setAttribute('onclick', 'pk2_odev_spam_save(); return false;');\
 store_set_link.setAttribute('style', 'color: white');\
	store_set_link.textContent = 'Сохр.';\
	wear_spam.appendChild(store_set_link);\
	var store_set_value = document.createElement('input');\
	store_set_value.setAttribute('id','pk2_spam_new');\
	store_set_value.setAttribute('type','text');\
	store_set_value.setAttribute('size','20');\
	store_set_value.setAttribute('value','Название нового набора...');\
	store_set_value.setAttribute('class','pk2_sel');\
	store_set_value.setAttribute('style','-moz-user-select: text; margin: 0px 3px;font-size:100%;');\
	wear_spam.appendChild(store_set_value);\
	var br_br = document.createElement('br');\
	var store_rewrite_link = document.createElement('a');\
	store_rewrite_link.setAttribute('href', '#');\
	store_rewrite_link.setAttribute('title', 'Заменить название выбраного набора');\
	store_rewrite_link.setAttribute('onclick', 'pk2_odev_spam_rewrite(); return false;');\
 store_rewrite_link.setAttribute('style', 'color: white; margin: 0px 3px');\
	store_rewrite_link.textContent = 'Переим.';\
	wear_spam2.appendChild(store_rewrite_link);\
	var delete_link = document.createElement('a');\
	delete_link.setAttribute('href', '#');\
	delete_link.setAttribute('title', 'Удалить выбранный набор');\
	delete_link.setAttribute('style', 'margin-right: 7px');\
	delete_link.setAttribute('onclick', 'confirm (\"Удалить набор?\")?pk2_odev_spam_del():void(0); return false;');\
 delete_link.setAttribute('style', 'color: white');\
	delete_link.textContent = 'Удал.';\
	wear_spam2.appendChild(delete_link);\
	var equip_select = document.createElement('select');\
	equip_select.setAttribute('id', 'pk2_spam_select');\
	equip_select.setAttribute('class','pk2_sel');\
	equip_select.setAttribute('style', 'width: 130px; max-width: 135px; margin: 0px 3px;font-size:100%;');\
	wear_spam2.appendChild(equip_select);\
	pk2_odev_spam_option();\
	var equip_link = document.createElement('a');\
	equip_link.setAttribute('href', '#');\
	equip_link.setAttribute('id', 'equip_link');\
	equip_link.setAttribute('onclick', 'pk2_odev_spam_go(); return false;');\
	equip_link.setAttribute('title', 'Запустить процесс переодевания');\
 equip_link.setAttribute('style', 'color: white');\
	equip_link.textContent = 'Надеть';\
	wear_spam2.appendChild(equip_link);\
	setTimeout(pk2_odev_spam,5000);\
};\
\
\
pk2_odev_window = function(){\
	if (!AjaxWindow.windows['inventory']){\
		if (pk2_odev_count++===0){\
			AjaxWindow.show('inventory');\
			setTimeout(pk2_odev_window, pk2_odev_time);\
			return;\
		}\
		else{\
			if(pk2_odev_count<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	else{\
		if (!AjaxWindow.windows['inventory'].isReady){\
			if(pk2_odev_count++<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	pk2_odev_count=0;\
	pk2_odevalka();\
};\
\
pk2_odev_zapusk = function(){\
	pk2_odev_type++;pk2_odev_count=0;\
	pk2_odevalka();\
\
};\
\
pk2_odev_control = function(typ, id){\
	zz = Wear.wear[pk2_types[pk2_odev_type]];\
	if (zz&&(zz.obj.item_id!=pk2_odev_item)){\
		if(pk2_odev_count++ <= pk2_odev_rep){\
			setTimeout(pk2_odev_control,pk2_odev_time);\
			return;\
		}\
		else{\
			pk2_odev_stat=false;\
		}\
	}\
	pk2_odev_zapusk();\
};\
\
pk2_odevalka = function(){\
	ee = pk2_odev_type;\
	irab=pk2_odev_rab;\
	if (ee >= pk2_types.length){\
		if (pk2_odev_stat) {document.getElementById('current_task_box_text').innerHTML='Ты оделся!'}\
		else {document.getElementById('current_task_box_text').innerHTML='Чёрт! Опять полураздет'}\
		return;\
	}\
	if (pk2_odev_var==='n')\
		sid = resultaty[irab].items[ee].tid;\
	else if (pk2_odev_var==='z')\
		sid = resultaty_z[irab].items[ee].tid;\
	else if (pk2_odev_var==='r')\
		sid = resultaty_r[irab].items[ee].tid;\
	if (sid){\
		if (Wear.wear[pk2_types[ee]]&&(Wear.wear[pk2_types[ee]].obj.item_id===sid)){\
			pk2_odev_zapusk();\
			return;\
		}\
		var inv = Bag.getInstance().items;\
		for (vv in inv){\
			if (inv[vv].obj.item_id===sid){\
				Bag.getInstance().carry(vv);\
				pk2_odev_item=sid;\
				pk2_odev_control();\
				return;\
			}\
		}\
		pk2_odev_zapusk();return;\
	}\
	else{\
		pk2_odev_zapusk();\
		return;\
	}\
\
};\
";


aWindow.pk2_setValue = function(key,value) {
//	window.setTimeout(GM_setValue, 1, key, value);
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
aWindow.pk2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.pk2_abyrvalg = GM_getValue(key);}, 1 );
};


pk2_code +="\
pk2_worker = function(schet){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(schet);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		if (schet) {setTimeout(pk2_worker4,1000)}else{setTimeout(pk2_worker3,1000)}} \
	else {pk2_count_inv=0;pk2_worker2(schet)}\
}\
;";

pk2_code +="\
pk2_worker3 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(false);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker3,1000)} \
	else {pk2_count_inv=0;pk2_worker2(false)}\
}\
;";

pk2_code +="\
pk2_worker4 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(true);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker4,1000)} \
	else {pk2_count_inv=0;pk2_worker2(true)}\
}\
;";

aWindow.pk2_worker2 = function(schet){
    aWindow.pk2_process=true;
    aWindow.resultaty=[];
    aWindow.resultaty_z=[];
    aWindow.resultaty_r=[];
    aWindow.zaschita=null;
    aWindow.ezda = false;
    aWindow.rabnavyki=[];
    aWindow.rabnavyki_z=[];
    aWindow.pk2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('pk2_skol_rabot_v').checked;
	vse_rab = document.getElementById('pk2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('pk2_skol_rabot_n').checked;
	skil_rab = document.getElementById('pk2_skol_rabot_s').checked;
	item_rab = document.getElementById('pk2_skol_rabot_i').checked;
	aWindow.pk2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('pk2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=141))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130))
				aWindow.porabotaj[r]=true;
		}
	     }
             else if (skil_rab){
		    ns = document.getElementById('pk2_rabota20');
                    var ss='';
                    for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
                    }
		    ss = aWindow.pk2_vse_navyki[ss];
                    for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
                    }
                  }
                  else if (item_rab){
                         is = document.getElementById('pk2_rabota99');
                         var ii=0;
                         for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].resultaty.produkty)
					if (ii==jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					aWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	min_hp=parseInt(document.getElementById('pk2_fort_hp').value,10);
	aWindow.pk2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('pk2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('pk2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('pk2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                aWindow.pk2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	aWindow.pk2_khlam = document.getElementById('pk2_khlam').checked;
	iz_magazinov = document.getElementById('pk2_pokupka').checked;
	vse_veschi= document.getElementById('pk2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('pk2_bablo').value,10);
	aWindow.pk2_millioner = document.getElementById('pk2_milion').checked;
	if (aWindow.pk2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('pk2_uroven').value,10);
	aWindow.ezda = document.getElementById('pk2_skorost').checked
	s_zaschitoj=document.getElementById('pk2_zaschita').checked;
	e_nov_rabota=document.getElementById('pk2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('pk2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('pk2_build').value);
		nvn_punch=parseFloat(document.getElementById('pk2_punch').value);
		nvn_tough=parseFloat(document.getElementById('pk2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('pk2_endurance').value);
		nvn_health=parseFloat(document.getElementById('pk2_health').value);
		nvn_ride=parseFloat(document.getElementById('pk2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('pk2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('pk2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('pk2_hide').value);
		nvn_swim=parseFloat(document.getElementById('pk2_swim').value);
		nvn_aim=parseFloat(document.getElementById('pk2_aim').value);
		nvn_shot=parseFloat(document.getElementById('pk2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('pk2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('pk2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('pk2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('pk2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('pk2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('pk2_trade').value);
		nvn_animal=parseFloat(document.getElementById('pk2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('pk2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Конструктор', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('pk2_zaschitato').value,10);
		if (document.getElementById('pk2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vk').checked){
			aWindow.zaschita.navyki=aWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			aWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		aWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_vse || vse_rab || nesk_rab) {
			aWindow.porabotaj[nov_index] = true;
		}
		else{
			aWindow.porabotaj=[];
			aWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('pk2_sloty').checked;
	if (sslot){
		aWindow.pk2_slots={};
		aWindow.pk2_slots.flag=true;
		aWindow.pk2_slots.head =document.getElementById('pk2_head').checked;
		aWindow.pk2_slots.body =document.getElementById('pk2_body').checked;
		aWindow.pk2_slots.belt =document.getElementById('pk2_belt').checked;
		aWindow.pk2_slots.pants =document.getElementById('pk2_pants').checked;
		aWindow.pk2_slots.foot =document.getElementById('pk2_foot').checked;
		aWindow.pk2_slots.neck =document.getElementById('pk2_neck').checked;
		aWindow.pk2_slots.right_arm =document.getElementById('pk2_right_arm').checked;
		aWindow.pk2_slots.left_arm =document.getElementById('pk2_left_arm').checked;
		aWindow.pk2_slots.yield =document.getElementById('pk2_yield').checked;
		aWindow.pk2_slots.animal =document.getElementById('pk2_animal').checked;
	}
	else{
		aWindow.pk2_slots=null;
	}
	//if (!aWindow.pk2_inv_imported){
	    aWindow.pk2_iimport();
	    if (!aWindow.pk2_inv_imported){
	        new aWindow.HumanMessage('Предварительно необходимо импортировать багаж. Откройте, и дождитесь загрузки.<br />После полной загрузки багажа, его можно свернуть или закрыть.');
	        aWindow.pk2_process=false;
	        return;
	    }
	//}
	if (test_vesch&&test_svoi_magaziny){
	    aWindow.pk2_mimport();
	}
	
	if (aWindow.pk2_inv_imported)
	{
        aWindow.pk2_podschet(vse_veschi, iz_magazinov, plus_level, aWindow.pers);
    }
       
    if (aWindow.einfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.pk2_vybzap();
    }
    else{
        aWindow.pk2_vybvesch();
    }
}

pk2_code+="\
my_name_is = function (){\
	if (Character&&Character.name){\
		pk2_pre = location.host.substr(0,4)+Character.name;\
		pk2_getValue(pk2_pre+'odev_list');\
		setTimeout(function() {if (pk2_abyrvalg.indexOf('aWindow.')==0) {pk2_abyrvalg=pk2_abyrvalg.slice(8)};eval(pk2_abyrvalg)},500);\
	}\
	else{\
		setTimeout(my_name_is,500);\
	}\
};\
";

/*
<option value=\"133\">	_Атака форта	</option>\
<option value=\"134\">	_Атака форта (меткость)	</option>\
<option value=\"135\">	_Атака форта (уворот)	</option>\
<option value=\"136\">	_Защита форта	</option>\
<option value=\"137\">	_Защита форта (меткость)	</option>\
<option value=\"138\">	_Защита форта (уворот)	</option>\
*/

aWindow.pk2_simselect='<select class=\"pk2_sel\" id=\"pk2_rabota\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_o\').checked=true;\">';
aWindow.pk2_mulselect='<select title=\"Выбор нескольких работ &mdash; с нажатой клавишей Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_rabota\" size=\"6\" onchange=\"javascript:$(\'pk2_skol_rabot_n\').checked=true;\">';
aWindow.pk2_conselect='\
<option value=\"0\">	Выберите работу:	</option>\
<option value=\"131\">	!Строительство в городе/форте	</option>\
<option value=\"141\">	!Передвижение	</option>\
<option value=\"125\">	!СОН-жизнь	</option>\
<option value=\"121\">	Борьба с бандитизмом	</option>\
<option value=\"113\">	Брачный аферист	</option>\
<option value=\"22\">	Выпас коров	</option>\
<option value=\"10\">	Выпас овец	</option>\
<option value=\"1\">	Выпас свиней	</option>\
<option value=\"25\">	Выработка камня	</option>\
<option value=\"55\">	Вырубка леса	</option>\
<option value=\"124\">	Выступление в шоу Баффало Билла	</option>\
<option value=\"85\">	Добыча железа	</option>\
<option value=\"67\">	Добыча нефти	</option>\
<option value=\"32\">	Добыча самоцветов	</option>\
<option value=\"116\">	Добыча свинца	</option>\
<option value=\"109\">	Добыча селитры	</option>\
<option value=\"56\">	Добыча серебра	</option>\
<option value=\"105\">	Добыча серы	</option>\
<option value=\"40\">	Добыча угля	</option>\
<option value=\"50\">	Доставка амуниции	</option>\
<option value=\"115\">	Доставка спиртного	</option>\
<option value=\"17\">	Дубление кожи	</option>\
<option value=\"8\">	Жатва	</option>\
<option value=\"19\">	Захоронение	</option>\
<option value=\"79\">	Знахарство	</option>\
<option value=\"49\">	Изготовление гробов	</option>\
<option value=\"29\">	Клеймение скота	</option>\
<option value=\"112\">	Коммивояжёрство	</option>\
<option value=\"60\">	Конокрадство	</option>\
<option value=\"83\">	Контрабанда	</option>\
<option value=\"96\">	Кормление скота	</option>\
<option value=\"78\">	Кража со взломом	</option>\
<option value=\"24\">	Лесопилка	</option>\
<option value=\"27\">	Лесоповал	</option>\
<option value=\"102\">	Ловля крабов	</option>\
<option value=\"65\">	Мародёрство	</option>\
<option value=\"70\">	Мелкое воровство	</option>\
<option value=\"62\">	Миссионерство	</option>\
<option value=\"88\">	Набивка подков	</option>\
<option value=\"73\">	Налёт	</option>\
<option value=\"74\">	Нападение на дилижанс	</option>\
<option value=\"77\">	Нападение на поезд	</option>\
<option value=\"35\">	Объезд лошадей	</option>\
<option value=\"122\">	Ограбление банка	</option>\
<option value=\"30\">	Ограждение пастбища	</option>\
<option value=\"99\">	Озеленение	</option>\
<option value=\"111\">	Организация родео	</option>\
<option value=\"28\">	Орошение	</option>\
<option value=\"123\">	Освобождение рабов	</option>\
<option value=\"108\">	Отлов гремучих змей	</option>\
<option value=\"48\">	Отлов лошадей	</option>\
<option value=\"75\">	Охота за преступниками	</option>\
<option value=\"52\">	Охота на бизона	</option>\
<option value=\"39\">	Охота на бобра	</option>\
<option value=\"58\">	Охота на волков	</option>\
<option value=\"66\">	Охота на гризли	</option>\
<option value=\"20\">	Охота на индейку	</option>\
<option value=\"51\">	Охота на койотов	</option>\
<option value=\"114\">	Охота на пуму	</option>\
<option value=\"57\">	Охрана дилижанса	</option>\
<option value=\"59\">	Охрана каравана	</option>\
<option value=\"61\">	Охрана тюрьмы	</option>\
<option value=\"16\">	Охрана форта	</option>\
<option value=\"80\">	Парламентёрство	</option>\
<option value=\"76\">	Перевозка заключённых	</option>\
<option value=\"110\">	Перегонка лошадей	</option>\
<option value=\"18\">	Поиск золота	</option>\
<option value=\"117\">	Поиск редких самоцветов	</option>\
<option value=\"68\">	Поиски клада	</option>\
<option value=\"13\">	Помол зерна	</option>\
<option value=\"63\">	Пони-экспресс	</option>\
<option value=\"103\">	Преподавание	</option>\
<option value=\"72\">	Преследование бандитов	</option>\
<option value=\"2\">	Присмотр за полем	</option>\
<option value=\"11\">	Продажа прессы	</option>\
<option value=\"37\">	Прокладка телеграфной линии	</option>\
<option value=\"31\">	Прорыв плотины	</option>\
<option value=\"33\">	Разметка приисков	</option>\
<option value=\"3\">	Расклейка плакатов	</option>\
<option value=\"45\">	Рекогносцировка	</option>\
<option value=\"23\">	Ремонт забора	</option>\
<option value=\"34\">	Ремонт повозок	</option>\
<option value=\"82\">	Речные перевозки	</option>\
<option value=\"7\">	Рыбалка	</option>\
<option value=\"42\">	Рыбная ловля	</option>\
<option value=\"38\">	Рытьё колодца	</option>\
<option value=\"86\">	Сбор агавы	</option>\
<option value=\"91\">	Сбор апельсинов	</option>\
<option value=\"14\">	Сбор кукурузы	</option>\
<option value=\"101\">	Сбор лотоса	</option>\
<option value=\"100\">	Сбор орлиных перьев	</option>\
<option value=\"87\">	Сбор помидоров	</option>\
<option value=\"6\">	Сбор сахарного тростника	</option>\
<option value=\"4\">	Сбор табака	</option>\
<option value=\"97\">	Сбор тыквы	</option>\
<option value=\"15\">	Сбор фасоли	</option>\
<option value=\"5\">	Сбор хлопка	</option>\
<option value=\"98\">	Сбор черники	</option>\
<option value=\"9\">	Сбор ягод	</option>\
<option value=\"12\">	Сенокос	</option>\
<option value=\"69\">	Служба в армии	</option>\
<option value=\"71\">	Служба наёмником	</option>\
<option value=\"104\">	Служба шерифом	</option>\
<option value=\"120\">	Служба шерифом округа	</option>\
<option value=\"118\">	Сооружение миссии	</option>\
<option value=\"46\">	Сплав леса	</option>\
<option value=\"106\">	Сплав по бурному потоку	</option>\
<option value=\"26\">	Спрямление русла	</option>\
<option value=\"44\">	Строительство ветряной мельницы	</option>\
<option value=\"43\">	Строительство вокзала	</option>\
<option value=\"21\">	Строительство железной дороги	</option>\
<option value=\"119\">	Строительство казино	</option>\
<option value=\"47\">	Строительство моста	</option>\
<option value=\"53\">	Строительство особняка	</option>\
<option value=\"84\">	Строительство ранчо	</option>\
<option value=\"41\">	Типография	</option>\
<option value=\"36\">	Торговля	</option>\
<option value=\"64\">	Торговля оружием с индейцами	</option>\
<option value=\"54\">	Торговля с индейцами	</option>\
<option value=\"90\">	Тушение пожара	</option>\
<option value=\"95\">	Уборка картошки	</option>\
<option value=\"93\">	Чистка обуви	</option>\
<option value=\"92\">	Чистка хлева	</option>\
<option value=\"94\">	Штопка носков	</option>\
<option value=\"107\">	Шулерство	</option>\
<option value=\"151\">	vs Стрелок-стрелок атака	</option>\
<option value=\"155\">	vs Стрелок-ударник атака	</option>\
<option value=\"153\">	vs Стрелок-стрелок защита	</option>\
<option value=\"157\">	vs Стрелок-ударник защита	</option>\
<option value=\"159\">	vs Стрелок-все защита	</option>\
<option value=\"161\">	vs2 Стрелок-стрелок атака	</option>\
<option value=\"165\">	vs2 Стрелок-ударник атака	</option>\
<option value=\"163\">	vs2 Стрелок-стрелок защита	</option>\
<option value=\"167\">	vs2 Стрелок-ударник защита	</option>\
<option value=\"169\">	vs2 Стрелок-все защита	</option>\
<option value=\"152\">	vs Ударник-стрелок атака	</option>\
<option value=\"156\">	vs Ударник-ударник атака	</option>\
<option value=\"154\">	vs Ударник-стрелок защита	</option>\
<option value=\"158\">	vs Ударник-ударник защита	</option>\
<option value=\"160\">	vs Ударник-все защита	</option>\
<option value=\"162\">	vs2 Ударник-стрелок атака	</option>\
<option value=\"166\">	vs2 Ударник-ударник атака	</option>\
<option value=\"164\">	vs2 Ударник-стрелок защита	</option>\
<option value=\"168\">	vs2 Ударник-ударник защита	</option>\
<option value=\"170\">	vs2 Ударник-все защита	</option>\
</select>\
';

aWindow.pk2_slot_selector = function(v_slot){
	document.getElementById('pk2_head').checked = (v_slot=='head');
	document.getElementById('pk2_body').checked = (v_slot=='body');
	document.getElementById('pk2_belt').checked = (v_slot=='belt');
	document.getElementById('pk2_pants').checked = (v_slot=='pants');
	document.getElementById('pk2_foot').checked = (v_slot=='foot');
	document.getElementById('pk2_neck').checked = (v_slot=='neck');
	document.getElementById('pk2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('pk2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('pk2_yield').checked = (v_slot=='yield');
	document.getElementById('pk2_animal').checked = (v_slot=='animal');
};

aWindow.pk2_ovselect = function(){
    vyb_vesch_options = document.getElementById('pk2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.pk2_show_shmot = function(irab){
    vv = null;
    if (aWindow.resultaty_r[irab]){
        vv = aWindow.resultaty_r[irab];
    }
    else if (aWindow.resultaty_z[irab]){
        vv = aWindow.resultaty_z[irab];
    }
    else if (aWindow.resultaty[irab]){
        vv = aWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table>';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    pk2_shmot_old = document.getElementById('pk2_shmot');
    pk2_shmot = null;
    html2='';
    
    if (!pk2_shmot){
		html2 += '<div id=\"pk2_shmo2\" style=\"width:' + 90 + 'px;\">\n';
        html2 += '<div style=\"background-color:#302010; text-align:center; font-weight:bold; color:red;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:pk2_close_shmot();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"pk2_shmot_cap\">Вещи</span>';
		html2 += '</div>'
		html2 += '<div id=\"pk2_shmot_content\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		pk2_shmot = document.createElement('div');
		pk2_shmot.id = 'pk2_shmot';
		pk2_shmot.innerHTML = html2;
		pk2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (pk2_shmot_old)
	    document.body.replaceChild(pk2_shmot, pk2_shmot_old);
	else
	    document.body.appendChild(pk2_shmot);
	pk2_shmot.style.display = 'block';

}

aWindow.pk2_show_panel = function(){
	pk2_title = document.getElementById('pk2_title');
	html0 = '';
	
	if (!pk2_title) {
		html0 += '<div id=\"pk2_form0\" style=\"width:' + aWindow.pk2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:pk2_minimize_title();\"' + aWindow.pk2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_stretch_title();\"' + aWindow.pk2_tlink + ' title=\"Развернуть\">&nbsp;^&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_close_title();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"pk2_title_cap\" style=\"font-size:11px;\">Поиск&nbsp;&laquo;лучших&raquo;&nbsp;вещей</span>';
		html0 += '<input type=\"button\" value=\"Поехали\" style=\"float:right; font-weight:bold\" onclick=\"javascript:pk2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"pk2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"pk2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"pk2_title_content\" style=\"overflow: auto; height: ' + aWindow.pk2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"pk2_form\">\
	<div id=\"pk2_vselect\">';
		html0 += aWindow.pk2_simselect;
		html0 += aWindow.pk2_conselect;
		
		html0 += '</div>\
	<div' + aWindow.pk2_vblock + '>\
	<div style=\"float:right;\" >Жизнь&nbsp;(форт)&nbsp;&nbsp;<input id=\"pk2_fort_hp\" name=\"pk2_fort_hp\ type=\"text\" value=\"0\" size=\"4\">&nbsp;</div>\
	<input type= \"button\" title=\"Просто показывает не больше семи предметов каждого типа (из всех, с выбранными параметрами отсечки) с наибольшими ТО, без учёта комплектов.\" value=\"Вещи с ТО\" style=\"float:right; clear:right;\" onclick=\"javascript:pk2_worker(false)\"/>\
	<input id=\"pk2_skol_rabot_v\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"v\" style=\"margin:auto 5px;\" />Всё\
	<input id=\"pk2_skol_rabot_r\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" />Все&nbsp;работы<br />\
	<input id=\"pk2_skol_rabot_o\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(false);void(0)\" />Одна&nbsp;работа<br />\
	<input id=\"pk2_skol_rabot_n\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(true);void(0)\" />Нескольно&nbsp;работ<br />\
	<input id=\"pk2_skol_rabot_s\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" />Навык&nbsp;&nbsp;';

		html0 +='<select class=\"pk2_sel\" id=\"pk2_rabota20\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_s\').checked=true;\">\
	<option value=\"0\">-</option>';
	for (ii=0;ii<aWindow.pk2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.pk2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\
	</select><br />\
	<input id=\"pk2_skol_rabot_i\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"i\" style\"margin:auto 5px;\" />Дроп&nbsp;&nbsp;';

	
		html0 +='\
	<select class=\"pk2_sel\" id=\"pk2_rabota99\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_i\').checked=true;\">\
	<option value=\"0\">-</option>';
	var tmp=[];
	for (ii=700;ii<1850;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;

if (tmp[ii].ves!='-')
if (aWindow.items[ii].type !='yield')
tmp[ii].ves = '-';
else if (aWindow.items[ii].shop != 'drop')
tmp[ii].ves = '-';
;
;
	}
	aWindow.qsort(tmp,700,1849);
	for (ii=700;ii<1850;++ii)
	{
		if (tmp[ii].ves !== '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\
	</select><br />\
	\
	</div>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\">Все&nbsp;работы</div>-->\
		<span title=\"После перебора всех работ, скрипт может обнаружить вещи, которые не использовались; и подсчитать продажную стоимость этих вещей (в данной версии ещё слабо реализовано). При нехватке наличности от них эти вещи можно безбоязненно сбыть.\"><input id=\"pk2_khlam\" type=\"checkbox\" style=\"margin:auto 24px auto 27px;\" />\
		Поиск неиспользуемых вещей<br /></span>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\"><span id=\"pk2_sk_rabot\">Одна&nbsp;работа&nbsp;&nbsp;&nbsp;&nbsp;</span>\
	</div>-->\
		<span title=\"Дополнительно ищется набор предметов с максимальной скоростью движения и доступностю выбранной работы. Полезно для отправки к удалённым работам, с последующим сразу после этого переодеванием в нормальные рабочие вещи.\">\
		<input id=\"pk2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Быстрейшее&nbsp;передвижение к&nbsp;работе?<br /></span>\
	<div' + aWindow.pk2_vblock + '>\
		<span id=\"sp_tst_st3456\" title=\"Хочеться поработать но не хватает немного ТО? Не беда, за деньги можно найти вещи, которые сделают доступными нужную работу.\">\
		<input id=\"pk2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_bablo\').style.display=\'block\'}else{$(\'pk2_ukr_bablo\').style.display=\'none\'};void(0)\" />&nbsp;Докупаем вещи получше?<br /></span>\
		<div id=\"pk2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"Средства, которые вы готовы заплатить за доступ к работам. Для самых богатых буратин есть пункт пониже.\">\
		<input id=\"pk2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		&nbsp;Имеется&nbsp;денег&nbsp;на&nbsp;закупки<br /></span>\
		<span title=\"Вы готовы тратить, и тратить любые суммы, на экипирование себя любимого. Скрипт вам поможет, причём этот флажок значительно ускорит поиск необходимой &laquo;лучшей&raquo; вещи.\">\
		<input id=\"pk2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Денег&nbsp;без&nbsp;счёта <strong>:)</strong><br /></span>\
		</div>\
		<span title=\"Трость, гаечный ключ и ботинки со шнурками. Этих, или подобных вещей нету в вашем гардеробе, но представить как изменилась бы ваша жизнь если б они появились так хочется? &mdash; не беда, скрипт поможет. Вот правда вещи для другого класса и пола приодеть всё равно не получиться, но всё что подходит будет принято во внимание при расчётах.\">\
		<input id=\"pk2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Мечтаем&nbsp;о&nbsp;квестовых&nbsp;и&nbsp;дропе?<br /></span>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"Здесь можно выбрать определённую вещь (вещи), и посмотреть, на скольких, и каких работах она будет использоваться.\">\
		<input id=\"pk2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_khochuka\').style.display=\'block\'}else{$(\'pk2_ukr_khochuka\').style.display=\'none\';pk2_ovselect();};void(0)\" />Полезность отсутствующих вещей</span>\
		<div id=\"pk2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"При выборе этого пункта, в расчёт будут приняты все видимые вещи из ранее открывавшихся магазинов\">\
		<input id=\"pk2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" >Импортировать вещи из магазина(-ов).</span>\
		<select title=\"Выбор нескольких вещей &mdash; с нажатой клавишей Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_dobavim_veschi\" size=\"5\">;';
		
    for (vv = 1; vv < 11200; ++vv){
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if ((vv >= 900)&&(vv < 10000)) continue;
        if ((vv >= 10200)&&(vv < 11000)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Холодное оружие\" label=\"Холодное оружие\">'}
        if (vv == 200) {html0+='<optgroup title=\"Головные уборы\" label=\"Головные уборы\">'}
        if (vv == 300) {html0+='<optgroup title=\"Одежда\" label=\"Одежда\">'}
        if (vv == 400) {html0+='<optgroup title=\"Обувь\" label=\"Обувь\">'}
        if (vv == 500) {html0+='<optgroup title=\"Шейные повязки\" label=\"Шейные повязки\">'}
        if (vv == 600) {html0+='<optgroup title=\"Животные\" label=\"Животные\">'}
        if (vv == 800) {html0+='<optgroup title=\"Стрелковое оружие\" label=\"Стрелковое оружие\">'}
        if (vv == 10000) {html0+='<optgroup title=\"Штаны\" label=\"Штаны\">'}
        if (vv == 11000) {html0+='<optgroup title=\"Пояс\" label=\"Пояс\">'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\">	'+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Остатки комплектов\" label=\"Остатки комплектов\">';
    // добавим сетовых ручками
    html0 += '<option value=\"792\">	'+aWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\">	'+aWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\">	'+aWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\">	'+aWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\">	'+aWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\">	'+aWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\">	'+aWindow.items[854].name+'	</option>';		
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<span title=\"Не живёте сегодняшним днём, и задумываетесь о будущем? Тогда можно посмотреть, какие вещи будут необходимы и полезны уровней через 5. Увеличивает отсечку по уровню, на заданное число. Навыки и характеристики применяются текущими.\"><input id=\"pk2_uroven\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" />\
		&nbsp;&laquo;прибавка&raquo;&nbsp;уровня<br /></span>\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"При выборе этого флажка скрипт ищет вещи не с наибольшим ТО, а с ТО не меньшими заданного, но с максимальными боевыми навыками\"><input id=\"pk2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 23px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_zaschita\').style.display=\'block\'}else{$(\'pk2_ukr_zaschita\').style.display=\'none\'};void(0)\" />&nbsp;Сопротивляемся&nbsp;нападающим?<br /></span>\
	<div id=\"pk2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Боевые навыки: удар, меткость, увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vm\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;Ударник&nbsp;</span>\
		<span title=\"Боевые навыки: стрельба, меткость, увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vr\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;Стрелок&nbsp;</span>\
		<span title=\"Боевые навыки: увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vd\" name=\"pk2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Выжить&nbsp;бы&raquo;<br /></span>\
		<span title=\"Боевые навыки: беруться из конструктора (ниже) все навыки с заявленными весами\"><input id=\"pk2_zaschita_vk\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;Используем&nbsp;навыки&nbsp;из&nbsp;конструктора<br /></span>\
		<span title=\"Для заданной работы(работ) ТО будет не меньше указанного. Все &laquo;излишки&raquo; скрипт попытается использовать на боевые навыки\"><input id=\"pk2_zaschitato\" type=\"text\" value=\"' +
		aWindow.pk2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp;Минимум&nbsp;ТО&nbsp;(рабочих)&nbsp;<br /></span>\
		</div></div>\
		\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Здесь можно выбрать слоты (части тела) которые будут браться из экипировки, то есть скрипт не будет подбирать другие (неодетые) предметы, для отмеченных частей\"><input id=\"pk2_sloty\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_sloty_content\').style.display=\'block\'}else{$(\'pk2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 23px auto 23px;\" />Слоты из экипировки:<br /></span>\
		<div id=\"pk2_sloty_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'head\');void(0);\"/>\
		<input id=\"pk2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Головной убор<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'neck\');void(0);\"/>\
		<input id=\"pk2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Шейная повязка<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'body\');void(0);\"/>\
		<input id=\"pk2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Одежда<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'belt\');void(0);\"/>\
		<input id=\"pk2_belt\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Пояс<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'pants\');void(0);\"/>\
		<input id=\"pk2_pants\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Штаны<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'right_arm\');void(0);\"/>\
		<input id=\"pk2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Дуэльное оружие<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'left_arm\');void(0);\"/>\
		<input id=\"pk2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Фортовое оружие<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'foot\');void(0);\"/>\
		<input id=\"pk2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Обувь<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'animal\');void(0);\"/>\
		<input id=\"pk2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Верховое животное<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'yield\');void(0);\"/>\
		<input id=\"pk2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Продукт<br />\
		</div></div></div>\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Здесь можно составить произвольную &laquo;работу&raquo; задав сложность работы, и любые необходимые навыки с &laquo;силой&raquo; от 0 до 5 (можно применять дробные числа вида 1.375).\n Используя ограничение по слотам и выбранный навык с весом 1 можно подбирать вещи для квестов вида {меткость = 27 с бонусом, приходи в чёрных лохмотьях и серых ботинках}.\n Либо если задействована защита и соответствующий выбор конструктора - данные навыки рассматриваются как боевые и заменяют предустановки"><input id=\"pk2_navyki\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_navyki_content\').style.display=\'block\'}else{$(\'pk2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 23px;\" />\
		Конструкция&nbsp;произвольных&nbsp;навыков<br /></span>\
		<div id=\"pk2_navyki_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input id=\"pk2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;Сложность работы&raquo;<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"pk2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Строительство<br />\
		<input id=\"pk2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Удар<br />\
		<input id=\"pk2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стойкость<br />\
		<input id=\"pk2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Выносливость<br />\
		<input id=\"pk2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Здоровье<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"pk2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Верховая езда<br />\
		<input id=\"pk2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Реакция<br />\
		<input id=\"pk2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Увёртливость<br />\
		<input id=\"pk2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Маскировка<br />\
		<input id=\"pk2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Плаванье<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"pk2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Меткость<br />\
		<input id=\"pk2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стрельба<br />\
		<input id=\"pk2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Установка ловушек<br />\
		<input id=\"pk2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Проворство<br />\
		<input id=\"pk2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Ремонт<br />\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"pk2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Руководство<br />\
		<input id=\"pk2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Тактика<br />\
		<input id=\"pk2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Торговля<br />\
		<input id=\"pk2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Обращение&nbsp;с&nbsp;животными<br />\
		<input id=\"pk2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Блеф<br />\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		pk2_title = document.createElement('div');
		pk2_title.id = 'pk2_title';
		pk2_title.innerHTML = html0;
		
		pk2_title.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l0 + 'px; top: ' + aWindow.pk2_t0 + 'px; z-index:202');
		document.body.appendChild(pk2_title);
		}
	pk2_title.style.display = 'block';
		
}



var pk2_body, pk2_script, pk2_style, pk2_head; 
pk2_body = document.getElementsByTagName('body')[0];

pk2_script = document.createElement('script');
pk2_script.type = 'text/javascript';
pk2_script.innerHTML = pk2_code;
pk2_body.appendChild(pk2_script);

pk2_stext=''
pk2_stext+='.tt:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:10px;\n';
pk2_stext+='left:15px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:20;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-70px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='font-weight:normal;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-100px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';

pk2_stext +='\
.pk2_sel {\
    background-color: rgb(232, 218, 179);\
    font-size: 13px;\
}\
.pk2_sel optgroup {\
    background-color:#443;\
    color:white;\
}\
.pk2_sel optgroup option {\
    background-color: rgb(232, 218, 179);\
    color:black;\
}\n';

pk2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
pk2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
pk2_stext+='\
.jy_pk2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';

pk2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
pk2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
pk2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
pk2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';



pk2_head = document.getElementsByTagName('head')[0];
pk2_style = document.createElement('style');
pk2_style.type = 'text/css';
if (pk2_style.styleSheet) {
     pk2_style.styleSheet.cssText = pk2_stext;
} else {
    if (pk2_style.innerText == '') {
	pk2_style.innerText = pk2_stext;
    } else {
	pk2_style.innerHTML = pk2_stext;
    }
}
pk2_head.appendChild(pk2_style);


//aWindow.pk2_getValue(aWindow.pk2_pre+'odev_list');
//aWindow.setTimeout(function() {eval(aWindow.pk2_abyrvalg)},500);
aWindow.my_name_is();



aWindow.pk2_odev_spam();


//prosto_veschi_max=7;\
/*    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
*/

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == НАЧАЛО ==================
// создание заголовка таблицы с сортировкой
aWindow.pk2_reporter2 = function(){
    grgr = '';
    aWindow.pk2_process=false;
    //new aWindow.HumanMessage('Начинаем вывод данных', {type: 'success'});
// начало заголовок и сортировка
    grsort = '<table><tbody>'; // (красный) bgcolor="#f15959"
      grsort += '<tr>';
        grsort += '<td><strong>Способ сортировки: </strong></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'name\', pk2_bezto);\">Название</a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'malus\', pk2_bezto);\"><img src=\"images/task_points/minus.png\" width="20" height="20" title=\"Сложность работы\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'to\', pk2_bezto);\"><img src=\"images/task_points/equal.png\" width="20" height="20" title=\"Количество ТО\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'d0\', pk2_bezto);\"><img src=\"images/job/dollar.png\" width="20" height="20" title=\"Заработок\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'o0\', pk2_bezto);\"><img src=\"images/job/experience.png\" width="20" height="20" title=\"Опыт\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'v0\', pk2_bezto);\"><img src=\"images/job/luck.png\" width="20" height="20" title=\"Удача\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'boom\', pk2_bezto);\"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Опасность\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><span title=\"Действут при следующем выборе сортировки! Здесь указывается то недостающее (либо избыточное) количество ТО, при котором работы всё ещё будут показываться (так значение 15 включит в список отображаемых, все работы с ТО больше чем -15; значение -10 уберёт из списка все работы с ТО от 10 и ниже.)\"><input type=\"text\" size=\"4\" value=\"'+aWindow.pk2_bezto+'\" ';
        grsort += 'onchange=\"javascript:pk2_bezto=parseInt(value, 10);\">&laquo;Нехватка&raquo; ТО</span></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
      grsort += '</tr>';
    grsort += '</tbody></table>'; // (красный)
    grgr += grsort;
    // Конец заголовок и сортировка
    grgr +='<table><tbody>'; // XXXX записи под каждую работу (розовый) bgcolor="#e587df"
      // определённая вещь начало
      if (aWindow.pk2_khochuka.length > 0){
        grgr += '<tr><td colspan="2">';
        grgr += '<a href=\"javascript:pk2_hideraboty(0);\">Вернуть все работы</a><br />';
        if (aWindow.pk2_khochuka.length > 1){
            grgr += '<select title=\"Выберите вещь чтобы посмотреть в скольких (и каких) работах она используется\" class=\"pk2_sel" onchange=\"javascript:pk2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Выберете необходимую вещь</option>'
            for (kh in aWindow.pk2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.pk2_khochuka){
        if (aWindow.pk2_khochuka[kh]){
            grgr += '<table><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:pk2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; применяется ' : '&raquo; применяются ';
            grgr +='Всего доступных  работ:' + aWindow.chislo_rabot_to + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' раз.<br />';
            grgr +='Всего работ:' + aWindow.chislo_rabot + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi[kh] +' раз.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
      }
      // определённая вещь конец
      for (ii = 0; ii < aWindow.pk2_sortrab.length; ++ii){                 // вывод нескольких работ начало
          if (!aWindow.pk2_hiderab[aWindow.pk2_sortrab[ii].index]){
              grgr += aWindow.pk2_htmlrab[aWindow.pk2_sortrab[ii].index];
        grgr += '<tr><td colspan="2"><hr></td></tr>';
          }
      }                                                                    // вывод нескольких работ конец
    grgr += '</tbody></table>'; // (розовый)
    // лишние вещи начало
    if (aWindow.pk2_khlam){
      grgr+='<hr>';
        grgr+='<table bgcolor="#87bee5"><tbody><tr><th colspan="8" style=\"text-align:center;\">Предположим, что эти вещи можно смело продать в магазинах</th></tr>';
        grgr+='<tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.pk2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:0px; margin-left:0px; margin-top:0px; margin-bottom:0px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='Минимум денег с продажи: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    // лишние вещи конец
    document.getElementById('pk2_window_content').innerHTML=grgr;
    aWindow.pk2_process=false;
}

// вывод списка работ
aWindow.pk2_res2html = function (){
    count_rab=0;
    aWindow.pk2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        // вторая строка после заголовка начало
        ihtm = '';
          rabota = aWindow.raboty[count_rab];
          ihtm+='<tr>';
          ihtm += '<tr><td colspan="3"><strong>'+rabota.rus_name+'</strong></td></tr>'; // название работы
          ihtm+='</tr><tr>';
          ihtm+='<td>'; // начало работы!!!!
            // работы описание начало
            ihtm += '<table width="172"><tbody>'; // картинка название работы и продукты начало (морской) bgcolor="#43a990"
              // картинка названия работы   
              ihtm += '<tr><td width="65">';
              if ((count_rab > 150)&&(count_rab <= 170)){
                  // "vs"
                  ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                  ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
              }
              // всё кроме "vs"
              else if (count_rab == 141){
                       // "Передвижение"
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"images/fingerboard/fingerboard.png\" width="63" height="63"';
                       ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   }
                   // "все работы" "Строительство" "СОН-жизнь" "форты"
                   else{
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"';
                       if (count_rab<=131){
                           // "все работы" "Строительство" "СОН-жизнь"
                           ihtm += 'images/jobs/';
                       }
                       // "форты"
                       else if (count_rab<141){
                           ihtm += 'images/fort/battle/button_';
                       }
                       ihtm +=rabota.name+'.png\" width="63" height="63" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   };
              ihtm += '</td>';
              // продукты
              ihtm += '<td>';
              rres = rabota.resultaty;
              for (ri in rres.produkty){
                ihtm+='<div style=\"display:inline; float:left; margin: 1px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
                ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
                ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
                ihtm+='</div>';
              }
              ihtm += '</td></tr>';
            ihtm += '</tbody></table>'; // название работы и продукты конец (морской)
            // работы описание конец
          ihtm += '<td>'; // характеристики и вещи начало
            ihtm += '<table><tbody>'; // характеристики и вещи начало (оранжевый) bgcolor="#e59d2b"
              ihtm += '<tr>'; // характеристики начало
                ihtm += '<td width="220">'; // ТО начало
                  // все работы, сон, строительство, война (кроме форта и передвижения)
                  if ((count_rab<=131)||(count_rab>141)){
                    ihtm += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">';
                    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
                    ihtm += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                    ihtm += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
                    ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
                    ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
                    ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                  }
                  // форт
                  else if (count_rab!=141){
                         ihtm += '<span title=\"Бонус попадания\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
                         var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
                         vvv = Math.round(vvv*10)/10;
                         ihtm += vvv+'</span></span>';
                         ihtm += '<span title=\"Бонус уворота\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Сумма бонусов\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
                         ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                       }
                       // передвижения
                       else{
                         //ihtm += '<span title=\"Скорость от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         //ihtm += '<span class="skill_box_value green_text" style="text-align:center;">х'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Скорость\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
                       }
                ihtm += '</td>'; // ТО конец
                ihtm += '<td>'; // НАВЫКИ начало
                  brbr = 0;
                  for (jj in aWindow.rabnavyki[count_rab]){
                    for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                      //if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                      ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                      ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: 0px; margin-top: 0px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                      ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                      ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                      ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                      ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                      ihtm += '</a>';
                    }
                  }
                ihtm += '</td>'; // НАВЫКИ конец
              ihtm += '</tr>'; // характеристики конец
            ihtm += '</tbody></table>'; // характеристики и вещи конец  (оранжевый)
          ihtm += '</td>'; // характеристики и вещи конец
//===================
              ihtm += '<tr>'; // характеристики работы начало
              ihtm += '<td colspan="2">';
                ihtm += '<table><tbody>'; //(голубой) bgcolor="#D3EDF6"
                  barWidth = 75; // ширина бара
                ihtm += '<tr>';
                      ihtm += '<td>'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>'; // (жёлтый) bgcolor="#d3d45c"
                        ihtm += '<td><a href="javascript:pk2_auto_odev(\'n\','+count_rab+');void(0);" title="Одеть" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_add(\'n\','+count_rab+');void(0);" title="Сохранить" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_remove(\'n\','+count_rab+');void(0);" title="Удалить" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
                        ihtm += '</a></td>';
                        ihtm += '</table></div>';
                      ihtm += '</td>'; // кнопки конец
                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.dengi*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.dengi+'%</div></div>';
                    ihtm += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Заработок
                  var pk2_Do = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Do = (180*rres.dengi/100+10)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    pk2_Do = Math.round(pk2_Do);
                  }
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_Do + ' $</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.opyt*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.opyt+'%</div></div>';
                    ihtm += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Опыт
                  var pk2_XP = rres.opyt*120/60;
                  pk2_XP = Math.round(pk2_XP);
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_XP + ' XP</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.vezenie+'%</div></div>';
                    ihtm += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Удача
                  var pk2_Ud = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Ud = (1350*rres.vezenie/100+75)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    //pk2_Ud = Math.floor(pk2_Ud);
                  }
                  ihtm += '<td width="100">';
                    ihtm += '<b>'+Math.floor(pk2_Ud/3) + '-' + Math.floor(pk2_Ud) + ' ($)</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_brown" style="width: '+Math.round(rres.boom*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.boom+'%</div></div>';
                    ihtm += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  //Опасность
                  ihtm += '<td width="45">';
                    ihtm += '  ';
                  ihtm += '</td>';

                ihtm += '</tr>';
                ihtm += '</tbody></table>'; //(голубой)
              ihtm += '</td>';
              ihtm += '</tr>'; // характеристики работы конец
//===================
              ihtm += '<tr>'; // вещи начало
                ihtm += '<td colspan="2">';
                  ihtm += '<table><tbody>'; // кнопки и вещи начало (салатовый) bgcolor="#6ad45c"
                    ihtm += '<tr>';
                      ihtm += '<td>'; // вещи начало
                        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                          sid = aWindow.resultaty[count_rab].items[ee].tid;
                          if (sid){
                            // подсказка вещи
                            ihtm+='<div style=\"display:inline; float:left;\">';
                            vesch = aWindow.items[sid];
                            ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                            if (vesch.set.key){
                              ihtm += '<br /><em>'+vesch.set.name+'</em>';
                            }
                            for (ind in vesch.bonus.attributes){
                              ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                            }
                            for (ind in vesch.bonus.skills){
                              ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                            }
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm += aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$';
                            }
                            ihtm += '</span>'
                            // вещь
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center; color:red;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            else {
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            // цена вещи подписать под вещью
                            //if (aWindow.resultaty[count_rab].items[ee].price > 0){
                            //    ihtm+='<br />';
                            //    ihtm +='<span style=\"text-align:center; color:red\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                            //}
                            ihtm +='</div>';
                          }
                        }
                      ihtm += '</td>'; // вещи конец
                    ihtm += '</tr>';
                  ihtm += '</tbody></table>'; // кнопки и вещи конец (салатовый)
                ihtm += '</td>';
              ihtm += '</tr>'; // вещи конец
//===================
          ihtm+='</td></tr>'; // конец работы!!!!

// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) НАЧАЛО
/*

        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_z[count_rab]){
                for (aa = aWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'z\','+count_rab+');void(0);" title="Одеваемся" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -52px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'z\','+count_rab+');void(0);" title="Сохранить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -127px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'z\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -130px -102px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (aWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_r[count_rab]){
                for (aa = aWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr>';

     // кнопки тут были уже перенесли!!!!
                      ihtm += '<td width="25">'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>';
                        ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'r\','+count_rab+');void(0);" title="Одеваемся" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -50px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'r\','+count_rab+');void(0);" title="Сохранить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -125px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'r\','+count_rab+');void(0);" title="Удалить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -128px -100px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '</table></div>'; // (жёлтый)
                      ihtm += '</td>'; // кнопки конец
     // кнопки тут были уже перенесли!!!!

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
*/        
// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) КОНЕЦ

        aWindow.pk2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

//=====
// свернуть "Окно настроек"
aWindow.pk2_minimize_title = function(){
	if (aWindow.pk2_title_flag2 == 1) {
    	aWindow.pk2_title_flag2 = 0;
		document.getElementById('pk2_title_content_row').style.display = 'none';
		document.getElementById('pk2_title_cap').style.display = 'none';
		document.getElementById('pk2_form0').style.width = '200px';
	}
	else {
		aWindow.pk2_title_flag2 = 1;
		document.getElementById('pk2_title_content_row').style.display = 'table-row';
		document.getElementById('pk2_title_cap').style.display = 'inline';
		document.getElementById('pk2_form0').style.width = aWindow.pk2_w0+'px';
	}
}

// Закрыть "Окно настроек"
aWindow.pk2_close_title = function(){
	document.getElementById('pk2_title').style.display='none';
}

//===
aWindow.pk2_stretch_title = function(){
    var nv;
    if (aWindow.pk2_title_flag == 1) {
        aWindow.pk2_title_flag = 0;
        nv = aWindow.pk2_title_h_mid + 'px';
    }
    else {
        aWindow.pk2_title_flag = 1
        nv = aWindow.pk2_title_h_max + 'px';
    }
    document.getElementById('pk2_title_content').style.height = nv;
}

//===
aWindow.pk2_close_shmot = function(){
    rm = document.getElementById('pk2_shmot');
    document.body.removeChild(rm);
}

//===
aWindow.pk2_vselect = function (chk){
	if (chk) {
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_mulselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Несколько работ';*/
	}
	else{
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_simselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Одна работа&nbsp;&nbsp;&nbsp;&nbsp;';*/
	}
}

// свернуть "Окно данных"
aWindow.pk2_minimize_window = function(){
	if (aWindow.pk2_window_flag2 == 1) {
		aWindow.pk2_window_flag2 = 0;
		document.getElementById('pk2_window_content_row').style.display = 'none';
		document.getElementById('pk2_window_cap').style.display = 'none'
		document.getElementById('pk2_win1').style.width = '100px';
	}
	else {
		aWindow.pk2_window_flag2 = 1;
		document.getElementById('pk2_win1').style.width = aWindow.pk2_w1+'px';
		document.getElementById('pk2_window_content_row').style.display = 'table-row';
		document.getElementById('pk2_window_cap').style.display = 'inline';
	}
}

// Закрыть "Окно данных"
aWindow.pk2_close_window = function(){
	document.getElementById('pk2_window').style.display='none';
}

// Окно "нехватки предмета в базе данных"
aWindow.pk2_error_window = function(err){
	document.getElementById('pk2_window_content').style.height = parseInt((aWindow.pk2_window_h_max*3)/5, 10) + 'px';
	pk2_err = document.getElementById('pk2_window_error');
	pk2_err.style.height = parseInt((aWindow.pk2_window_h_max*2)/7, 10) + 'px';
	pk2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Эти данные нужно отправить автору скрипта, для заполнения базы вещей<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"90\" rows=\"7\">';
	htm += err;
	htm += '</textarea></div>';
	pk2_err.innerHTML = htm;
}

// функция создания "Окно данных"
aWindow.pk2_show_window = function(){
    pk2_window = document.getElementById('pk2_window');
    html1='';
    if (!pk2_window){
	html1 += '<div id=\"pk2_win1\" style=\"width:' + aWindow.pk2_w1 + 'px; text-align:left;\">\n';
	html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
	html1 += '<tr>';
	html1 += '<td class=\"gran_vl\" />\n';
	html1 += '<td class=\"gran_v\" />\n';
	html1 += '<td class=\"gran_vp\" />\n';
	html1 += '</tr><tr>\n';
	html1 += '<td class=\"gran_l\" />\n';
	html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
	html1 += '<span>';
	html1 += '<a href=\"javascript:pk2_minimize_window();\"' + aWindow.pk2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
	html1 += '<a href=\"javascript:pk2_stretch_window();\"' + aWindow.pk2_tlink + ' title=\"-\">&nbsp;^&nbsp;</a>&nbsp;';
	html1 += '<a href=\"javascript:pk2_close_window();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
	html1 += '</span>';
		html1 += '<span id=\"pk2_window_cap\">Результаты</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"pk2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"pk2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"pk2_window_content\" style=\"overflow: auto; height: ' + aWindow.pk2_window_h_max + 'px;\">';
		html1 += '</div><div id=\"pk2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		pk2_window = document.createElement('div');
		pk2_window.id = 'pk2_window';
		pk2_window.innerHTML = html1;
		pk2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l1 + 'px; top: ' + aWindow.pk2_t1 + 'px; z-index:250');
		document.body.appendChild(pk2_window);
	}
	pk2_window.style.display = 'block';
	if (aWindow.pk2_window_flag2 == 0){
	    aWindow.pk2_minimize_window();
	}
}

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == КОНЕЦ ==================





/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_77', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_77', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=77&version=2.1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();

