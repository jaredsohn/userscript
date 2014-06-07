// ==UserScript==
// @name            TW - Adr
// @namespace       http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/test/TW-full-screen.user.js
// @description     Zmiana wygląu TW. wersja 0.1.0 beta
// @author          Dariusz Szyndler (Darius II)
// @website         http://pl-the-west.googlecode.com
// @author          Dariusz Szyndler (Darius II)
// @website         http://pl-the-west.googlecode.com/
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include        	*.the-west.net/*
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/101628.meta.js
// @version         0.1.1 beta
// @history         0.1.1 beta - poprawiony esport do TW-DB
// @history         0.1.0 beta - skrypt napisany od początku
// @history         0.0.5 beta - dodano doświadczenie za pojedynki zależne od motywacji
// @history         0.0.4 beta - dodany notatnik
// @history         0.0.3 beta - poprawione statystyki z bety, które kolidowały z innymi światami
// @history         0.0.2 beta - zmienione menu, dodany poker i statystyki na becie
// @history         0.0.1 beta - start projektu
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

var version = "0.1.1 beta";

try {
	ScriptUpdater.check(101628, version);
} catch(e) { };

// ustawienia wstępne
var base_img = "http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/"; // sciezka do grafiki

// fn style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// end fn style

// ustawienie styli
addGlobalStyle('body {padding:0; width:100%; height:100%; overflow-x:hidden;}');
addGlobalStyle('#left_menu, #right_menu { height:auto;}'); // automatyczna wysokosc
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3, #wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { float:left; opacity:0.8; filter:alpha(opacity=80); background:url('+base_img+'/workbar_item_background.png) no-repeat 0px 32px; }'); // podmiana grafiki pod wykonywanymi pracami
addGlobalStyle('#left_menu .menu_list, #right_menu .menu_list { margin-top:12px; }'); // podniesienie menu
addGlobalStyle('#left_menu .menu_list { margin-left:-10px; margin-right:10px;}'); // przeuniecie lewego menu w lewo
addGlobalStyle('#right_menu .menu_list { margin-left:10px; margin-right:-10px;}'); // przeuniecie prawego menu w prawo
addGlobalStyle('#main_container_border_left { left:19px; }'); // lewa ramka w lewo
addGlobalStyle('#main_container_border_right { right:19px; }'); // prawa ramka w prawo
addGlobalStyle('#main_container { margin-left:19px; margin-right:19px; }'); // poszerzenie mapy
addGlobalStyle('#main_sizer { padding-top:70px; }');
addGlobalStyle('#shadow_top { height:40px; }');
addGlobalStyle('#workbar_left .workbar_top, #workbar_right .workbar_top, .wb_taskbar { height:auto; top:0px; z-index:1; }');
addGlobalStyle('.workbar_top { z-index:1; }');
addGlobalStyle('#workbar_left { left:30px; float:left; width:auto; margin-top:0px!important; z-index:1!important; top:0px; }');
addGlobalStyle('#workbar_right { right:80px; float:left; width:auto; margin-top:0px!important; z-index:1!important; top:0px; }');
addGlobalStyle('#left_menu { left:-110px; background-position:110px 0; clip:rect(auto, auto, auto, -15px);}');
addGlobalStyle('#right_menu { right:-110px; background-position:-953px 0; clip:rect(auto, 35px, auto, auto); }');
addGlobalStyle('#character_info { z-index:2; margin:0; }');
addGlobalStyle('#main_container_position { top:76px; }');
addGlobalStyle('#map_border_bottom_sizer { margin-top:-56px; }');
addGlobalStyle('#map_border_bottom { width:98%; }');
addGlobalStyle('#current_task_box { top:40px; }');
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3 { margin-left:0px; }');
addGlobalStyle('#wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { margin-right:0px; }');
addGlobalStyle('#head_background { margin-left:0px; margin-right:0px; }');
addGlobalStyle('#character_money { margin-right:15px; }');
addGlobalStyle('#avatar { left:15px; }');
addGlobalStyle('#avatar_picture, #avatar_picture_click { left:17px; }');
addGlobalStyle('#level_box { left:37px; }');
addGlobalStyle('#health_bar, #energy_bar, #experience_bar { left:107px; }');
addGlobalStyle('#character_name { left:91px; }');
addGlobalStyle('#footer_menu_left { padding-left:5px; padding-top:0!important; }');
addGlobalStyle('#footer_menu_right { padding-right:5px; padding-top:0!important; }');
addGlobalStyle('#current_task_box_text a { color:rgba(255, 255, 0, 0.9); }');
addGlobalStyle('#map_scroll_left { left:50%; top:15px!important; margin-left:-30px; }');
addGlobalStyle('#map_scroll_right { right:50%; top:15px!important; margin-right:-30px; }');
addGlobalStyle('#map_scroll_top {}');
addGlobalStyle('#map_scroll_bottom { top:35px!important; }');
addGlobalStyle(' {}');

/* elementy do ukrycia */
var el_do_ukr = new Array('#border_cap','#abdorment_left','#abdorment_right', '#wb_buy_pa', '#head_title', '#shadow_left_wing_bottom', '#shadow_right_wing_bottom', '#shadow_left_side', '#shadow_right_side', '#shadow_left_top', '#shadow_right_top', '#shadow_right_corner', '#shadow_left_corner');
for(var i = 0; i < el_do_ukr.length; i++){
	if (el_do_ukr[i].length) {
		addGlobalStyle(''+el_do_ukr[i]+' {display:none;}');
		}
	}
/* end elementy do ukrycia */

/* elementy do ukrycia tla */
var tla_do_ukr = new Array('#workbar_left', '#workbar_right', '.workbar_top', '#workbar_right .workbar_top', '.bottomleftcurve', '.bottomrightcurve', '#shadow_left_wing', '#shadow_right_wing', '#shadow_top, #shadow_bottom', '#workbar_right.wb_premium .workbar_top');
for(var i = 0; i < tla_do_ukr.length; i++){
	if (tla_do_ukr[i].length) {
		addGlobalStyle(''+tla_do_ukr[i]+' {background:transparent;}');
		}
	}
/* end elementy do ukrycia tla */
// end ustawienie styli


(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

window.addEvent('domready', function(){

	$('right_menu').addEvents({mouseover:function(){$('right_menu').setStyles({right:'-8px',clip:'rect(auto, 138px, auto, auto)', 'background-position':'-852px 0'});}});
	$('right_menu').addEvents({mouseout:function(){$('right_menu').setStyles({right:'-110px',clip:'rect(auto, 35px, auto, auto)', 'background-position':'-953px 0'});}});
	$('left_menu').addEvents({mouseover:function(){$('left_menu').setStyles({left:'-10px',clip:'rect(auto, auto, auto, -15px)', 'background-position':'10px 0'});}});
	$('left_menu').addEvents({mouseout:function(){$('left_menu').setStyles({left:'-110px',clip:'rect(auto, auto, auto, 35px)', 'background-position':'110px 0'});}});
	
	var base_img = "http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/"; // sciezka do grafiki
	var rusz_img = "/images/items/right_arm/mini/deringer_accurate.png"; // rusznikarz
	var kraw_img = "/images/items/body/mini/tuetue.png"; // krawiec
	var gene_img = "/images/items/neck/mini/kerchief_blue.png"; // general store
	var hote_img = "/images/items/right_arm/mini/pillow.png"; // hotel
	var bank_img = "/images/items/yield/bag.png"; // bank
	var kosc_img = "/images/items/neck/mini/cross_bronze.png"; // kosciol
	var grab_img = "/images/items/yield/testament.png"; // grabarz
	var ratu_img = "/images/bank/city.png"; // ratusz
	var salo_img = "/images/items/yield/beer.png"; // saloon
	var sher_img = "/images/items/yield/sheriffstar.png"; // szeryf
	var mark_img = "/images/items/yield/stolen_goods.png"; // market
	var trad_img = "/images/itemtrader/haendler_btn.jpg"; // handlarz
	var go_img = "/images/items/yield/flag.png"; // idz do miasta
	var prof_img = "/images/items/yield/photo.png"; // profil
	var craf_img = "/images/items/recipe/recipe_smith.png"; // rzemiosło
	var invi_img = "/images/items/yield/letter.png"; // zaproszenia
	
	var sma_fort_img = base_img + "Forty/maly.png"; // maly fort
	var med_fort_img = base_img + "Forty/sredni.png"; // sredni fort
	var big_fort_img = base_img + "Forty/duzy.png"; // duzy fort
	var ico_fort_img = base_img + "Forty/ico_fort.png"; // ikonka fortow
	var ico_inw_twdb = base_img + "ico_export.png"; // ikonka eksportu
	var big_fort_img_ico = base_img + "Forty/ico_duzy.gif"; // duzy fort ikonka
	var small_border_img = base_img + "borders_window.png"; // ramka dla małych okienek
	
	var exp_inw_twdb = "wman.open('twdbi nominimize noreload').addTab('Proszę czekać...');jQuery.getScript('http://tw-db.info/cache/js/sDoImport_eng.js');";
	var exp_forts_stat = "javascript:(function(){if($('wfScript'))$('wfScript').remove();new Element('script',{'id':'wfScript','type':'text/javascript','src':'http://www.westforts.com/js/import.js'}).inject(document.body)})();void(0);"; // eksport do TW-DB funkcja z TW-DB
	
	var ramka_tw_db = "<iframe src='http://tw-db.info/index.php?strana=quests&qclass=all&lang=pl' width='100%' height='300'><p>Your browser does not support iframes.</p></iframe>";
	
	var link_quest = "wman.open('twdbi nominimize noreload').addTab('Proszę czekać...');"; // link do wszystkich zadani na TW-DB
		
	var mapka = document.createElement('img');
		mapka.id = 'mapka_fortu';
		mapka.setAttribute('src',sma_fort_img);
		mapka.setAttribute('style','width:100%');
	console.log(mapka);
	
	switch_forts = function(mapka, stat){
		if (stat == null) {
			stat = $('windows_ext_menu').getStyle('display');
		}
		src_img_map = $('img_map').getProperty('src');
		if ((src_img_map != mapka) || (src_img_map == 'images/transparent.png')) {
			$('img_map').setProperty('src',mapka);
		}
		if (stat == 'none') {
			$('windows_ext_menu').setStyle('display','block');
		}
		$('windows_ext_menu').inject($('windows'));
		$('window_fortmaps_title').addEvent(mousedown);
		
	}
	
	mapy_fortowe = function(){
		mhtml =  '<div class="tab_container" style="margin-left:7px; width:340px!important; height:26px!important">';
		mhtml += '<ul class="tabs" style="width:340px;">';
		mhtml += '<li class="active" id="id_map.1" onclick="showTab(this);">duży</li>';
		mhtml += '<li id="id_map.2" onclick="showTab(this);">średni</li>';
		mhtml += '<li id="id_map.3" onclick="showTab(this);">mały</li>';
		mhtml += '</ul>';
		
		showTab = function showTab(obj) {
			var showTab1 = obj.id == "id_map.1";
			var showTab2 = obj.id == "id_map.2";
			var showTab3 = obj.id == "id_map.3";
			$('id_map.1.div').setStyle('display', showTab1 ? 'block' : 'none');
			$('id_map.2.div').setStyle('display', showTab2 ? 'block' : 'none');
			$('id_map.3.div').setStyle('display', showTab3 ? 'block' : 'none');
		if (showTab1) {
			$('id_map.1').addClass('active');
			$('id_map.2').removeClass('active');
			$('id_map.3').removeClass('active');
		} else if (showTab2) {
			$('id_map.1').removeClass('active');
			$('id_map.2').addClass('active');
			$('id_map.3').removeClass('active');
		} else {
			$('id_map.1').removeClass('active');
			$('id_map.2').removeClass('active');
			$('id_map.3').addClass('active');
		}};
		
		mhtml += '<div id="mapka" class="window_content" style="width:340px; height:240px;">';
		mhtml += '<div id="id_map.1.div">';
		mhtml += '<img src="'+big_fort_img+'" style="width:340px; height:240px;" />';
		mhtml += '</div>';
		mhtml += '<div id="id_map.2.div" style="display:none;">';
		mhtml += '<img src="'+med_fort_img+'" style="width:340px; height:240px;" />';
		mhtml += '</div>';
		mhtml += '<div id="id_map.3.div" style="display:none;">';
		mhtml += '<img src="'+sma_fort_img+'" style="width:340px; height:240px;" />';
		mhtml += '</div>';
		//mhtml += '<img id="img_map" src="images/transparent.png" style="width:700px; height:402px;" />';
		mhtml += '</div>';
		mhtml += '</div>';
		AjaxWindow.show("maps_fort", undefined, "Mapy", mhtml, {title:'Mapy fortowe'}, true);
		$E("#window_maps_fort_Mapy .window_refresh").href = "javascript:void(0);";
		document.getElementById("window_maps_fort_Mapy").style.width = "380px";
		document.getElementById("window_maps_fort_Mapy").style.height = "320px";
		document.getElementById("window_maps_fort_Mapy").getElementsByTagName("div")[0].style.width = "380px";
		document.getElementById("window_maps_fort_Mapy").getElementsByTagName("div")[0].style.background = "url('"+small_border_img+"')";
		document.getElementById("window_maps_fort_Mapy").getElementsByTagName("h2")[0].style.cssText = "text-align:center";
		document.getElementById("window_maps_fort_Mapy").getElementsByTagName("h2")[0].style.width = "380px";
		document.getElementById("window_maps_fort_Mapy_content").style.width = "340px";
		document.getElementById("window_maps_fort_Mapy_content").style.height = "260px";
	}
	
	/* menu */
	var new_l_menu = '<ul id="ext_left_menu">';
	if(Character.home_town != null) {
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+rusz_img+'" style="width:40px; height:40px;" title="<b>Rusznikarz</b>" alt="rusznikarz" /></a>'; // rusznikarz
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+kraw_img+'" style="width:40px; height:40px;" title="<b>Krawiec</b>" alt="krawiec" /></a>'; // krawiec
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+gene_img+'" style="width:40px; height:40px;" title="<b>general store</b>" alt="general store" /></a>'; // general store
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) tw2gui_window.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+hote_img+'" style="width:40px; height:40px;" title="" alt="hotel" class=""></a>'; // hotel
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+bank_img+'" style="width:40px; height:40px;" title="<b>bank</b>" alt="bank" /></a>'; // bank
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+kosc_img+'" style="width:40px; height:40px;" title="<b>kościół</b>" alt="kościół" /></a>'; // kosciol
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+grab_img+'" style="width:40px; height:40px;" title="<b>grabarz</b>" alt="grabarz" /></a>'; // grabarz
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+ratu_img+'" style="width:40px; height:40px;" title="<b>ratusz</b>" alt="ratusz" /></a>'; // ratusz
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+salo_img+'" style="width:40px; height:40px;" title="<b>saloon</b>" alt="saloon" /></a>'; // saloon
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+sher_img+'" style="width:40px; height:40px;" title="<b>szeryf</b>" alt="szeryf" /></a>'; // szeryf
		new_l_menu += '<li><a href="javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+mark_img+'" style="width:40px; height:40px;" title="<b>targ</b>" alt="targ" /></a>'; // targ
		};
		new_l_menu += '<li><a href="javascript:AjaxWindow.show(\'item_trader\', {action: \'index\', h: h});"><img src="'+trad_img+'" style="width:40px; height:40px;" title="<b>handlarz</b>" alt="handlarz" /></a>'; // handlarz
	if(Character.home_town != null) {
		new_l_menu += '<li><a href="javascript: if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);"><img src="'+go_img+'" style="width:40px; height:40px;" title="<b>idź do miasta</b>" alt="idź do miasta" /></a>'; // idz do miasta
		};
		new_l_menu += '<li><a href="javascript:AjaxWindow.show(\'profile\',{char_id:Character.playerId},Character.playerId);"><img src="'+prof_img+'" style="width:40px; height:40px;" title="<b>profil</b>" alt="profil" /></a>'; // profil
		if(Character.level >= 20) {
		new_l_menu += '<li><a href="javascript:CharacterWindow.open(); CharacterWindow.showTab(\'crafting\');"><img src="'+craf_img+'" style="width:40px; height:40px;" title="<b>rzemiosło</b>" alt="rzemiosło" /></a>'; // rzemioslo
		};
	if(Character.home_town == null) {
		new_l_menu += '<li><a href="javascript: AjaxWindow.show(\'invitations\');"><img src="'+invi_img+'" style="width:40px; height:40px;" title="<b>Zaproszenia</b>" alt="Zaproszenia" /></a>'; // zaproszenia
		};
		new_l_menu += '</ul>';
		
		new_p_menu = '<ul id="ext_right_menu">';
		new_p_menu += '<li><a href="javascript:mapy_fortowe();"><img src="'+ico_fort_img+'" title="<b>Mapki fortów</b>" alt="Mapki fortów" /></a>';
		new_p_menu += '<li><a><img id="TWDBI_import_button" src="'+ico_inw_twdb+'" title="<b>Eksport umiejek, eq itp.</b>" alt="Eksport umiejek, eq itp." onclick="'+exp_inw_twdb+'" /></a>';
		new_p_menu += '<li><a href="'+exp_forts_stat+'">fortstats</a>';
		new_p_menu += '<li><a><img id="TWDBI_import_button_q" src="'+ico_inw_twdb+'" title="<b>Eksport umiejek, eq itp.</b>" alt="Eksport umiejek, eq itp." onclick="'+link_quest+'" /></a>';
		new_p_menu += '</ul>';
	/* end menu */
	
	// nowe obiekty
	var ext_menu = document.createElement('div');
		ext_menu.id = 'ext_menu';
		ext_menu.setAttribute('style','position:absolute; width:100%;');
		//ext_menu.innerHTML = '<div id="head_ext_menu" style="color:white; width:100px; margin-left:20px;">lewe menu<br /><div style="position:absolute; color:white; z-index:1; width:100%">'+new_l_menu+'</div></div>';
		ext_menu.innerHTML = '<div id="head_l_ext_menu" style="position:absolute; color:white; width:auto; margin-left:20px; float:left; text-align:center; display:block; top:-40px; z-index:1;"><div style="color:white; z-index:1;">'+new_l_menu+'</div>menu budynków</div><div id="head_p_ext_menu" style="position:absolute; color:white; display:block; float:right; margin-right:20px; text-align:center; width:auto; right:0px; top:-40px; z-index:1;"><div style="color:white; z-index:1; width:100%">'+new_p_menu+'</div>dodatkowe menu</div>';
	
	//$('mapka').addEvents({mouseover:function(){$$('mapka_fortu').setStyles({'width':'200%'})}});
	//$(mapka).injectInside(r_mapki);
	//$(r_mapki).injectInside(tlo);
	
	
	var shadow_top = document.getElementById('shadow_top');
		shadow_top.parentNode.insertBefore(ext_menu, shadow_top.nextSibling);
		// end nowe obiekty
	
	$$('#ext_menu ul').setStyles({'display':'block','list-style':'none','margin':'0','padding':'0'});
	$$('#ext_menu ul li').setStyles({'display':'block','list-style':'none','margin':'0','padding':'0'});
	$$('#ext_menu ul#ext_left_menu').setStyles({'width':'auto','padding':'0px'});
	$$('#ext_menu ul li').setStyles({'float':'left','width':'40px','height':'40px','background':'url(\''+base_img+'bag.png\')'});
	$$('#ext_menu ul#ext_right_menu').setStyles({'width':'auto','padding-right':'20px'});
	$$('#buffbar').setStyles({'margin-right':'0px','top':'-52px','width':'auto','z-index':'1'});

	//wys_lewego_bara = $('workbar_right').getPosition();
	//alert(wys_lewego_bara.y);
	//$('workbar_right').setPosition({y:'0px'});
	$('workbar_right').setStyle('top', '0px');
	
	$('head_l_ext_menu').addEvents({mouseover:function(){$('head_l_ext_menu').setStyles({top:'0px'});$('workbar_left').setStyles({top:'70px'});}});
	$('head_l_ext_menu').addEvents({mouseout:function(){$('head_l_ext_menu').setStyles({top:'-40px'});$('workbar_left').setStyles({top:'0px'});}});
	$('head_p_ext_menu').addEvents({mouseover:function(){$('head_p_ext_menu').setStyles({top:'0px'});$('workbar_right').setStyles({top:'70px'});$('buffbar').setStyles({top:'-140px'});}});
	$('head_p_ext_menu').addEvents({mouseout:function(){$('head_p_ext_menu').setStyles({top:'-40px'});$('workbar_right').setStyles({top:'0px'});$('buffbar').setStyles({top:'-52px'});}});
	$('scroll_to_fort_list').setStyles({left:'60px'});
	
	//$('menu_inventory').addEvents({click:function(){setTimeout($$('#pk2_wear_spam').setStyle('display',''),5000);$$('#pk2_wear_spam2').setStyle('display','');}});
	
//	$('windows_ext_menu').addEvents({mouseover:function(){$('windows_ext_menu').setStyles({top:'0px','z-index':'1000'});$('workbar_left').setStyles({top:'60px'});}});
//	$('windows_ext_menu').addEvents({mouseout:function(){$('windows_ext_menu').setStyles({top:'-390px','z-index':'1'});$('workbar_left').setStyles({top:'0px'});}});
	

	/*tlo = $('fortbattle_placement_map_4_poster');
var r_mapki = new Element('div',{
'class':'mapka', 
'id':'mapka', 
'styles': { 'position': 'absolute' }
});
var mapka = new Element('img', {
'id':'mapka_fortu',
'src':'http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/Forty/maly.png',
'styles':{ 'width':'100%' }
});
$('mapka_fortu').addEvents({mouseover:function(){$$('mapka_fortu').setStyles({'width':'200%'});};});
$(mapka).injectInside(r_mapki);
$(r_mapki).injectInside(tlo);*/
	
	
	//var head_workbar_left = document.createElement('div');
	//	head_workbar_left.id = 'head_workbar_left';
	//	head_workbar_left.innerHTML = '<h2>menu</h>';
	//var el_workbar_left = document.getElementById('workbar_left');
	//	el_workbar_left.parentNode.insertBefore(head_workbar_left, el_workbar_left.previousSibling);

	});
});