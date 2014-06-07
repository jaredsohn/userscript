// ==UserScript==
// @name            TW Adrian
// @namespace       http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/test/TW-full-screen.user.js
// @description     Zmiana wygląu TW. wersja 0.0.4 beta
// @author          Adrian Kopinke
// @website         http://pl-the-west.googlecode.com/
// @include        	*.the-west.net/*
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/101628.meta.js
// @version         0.0.5 beta
// @history         0.0.5 beta - dodano doświadczenie za pojedynki zależne od motywacji
// @history         0.0.4 beta - dodany notatnik
// @history         0.0.3 beta - poprawione statystyki z bety, które kolidowały z innymi światami
// @history         0.0.2 beta - zmienione menu, dodany poker i statystyki na becie
// @history         0.0.1 beta - start projektu
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

var twfs_version = "0.0.5 beta";

try {
	ScriptUpdater.check(101628, twfs_version);
} catch(e) { };

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

  if (url.indexOf("game.php") != -1) {
	var insertBeforeElement = document.getElementById('left_top');
	var newScriptElement = document.createElement('script');
	newScriptElement.setAttribute('type', 'text/javascript');
	var myScript = "var twfs_version = '"+twfs_version+"';";
	newScriptElement.innerHTML = myScript;
	insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
  }


aWindow = (unsafeWindow) ? unsafeWindow : window;
var $=aWindow.$;

(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
window.addEvent('domready', function(){
	var el_mapy = $('map_place').getSize();
	var wys_mapy = el_mapy.size.y;
	var el_czatu = $('footer').getSize();
	var wys_czatu = el_czatu.size.y;
	var el_okna = $('screensizer').getSize();
	var wys_okna = el_okna.size.y;
	var roz = 0;
	//if (wys_mapy + wys_czatu < wys_okna) {
		//var roz = wys_okna - wys_czatu;
		//var roz = wys_okna - wys_mapy;// - 103;
		var roz = wys_czatu - 33;
		
		Config.set("gui.chat.height",roz);
		//$('scroll_to_fort_list').setStyle('z-index', 20);
		//$('map_wrapper').setStyle('height', roz+20+'px');
		//$('map_border_bottom').setStyle('top', roz+5+'px');
		//$('map_border_bottom_sizer').setStyle('top', roz+137+'px');
		//$('footer_menu_left').setStyle('top', roz-35+'px');
		//$('footer_menu_right').setStyle('top', roz-35+'px');
		//addGlobalStyle('#screensizer {height:'+roz+'px;}');
		//}
	//alert('wysokość mapy:' +wys_mapy+ '\nwysokość czatu:' +wys_czatu+ '\nwysokość okna:' +wys_okna+ '\nróżnica:' +roz);
	
	
	$('right_menu').addEvents({ mouseover: function(){ $('right_menu').setStyles({ right:'0px' }); }});
	$('right_menu').addEvents({ mouseout: function(){ $('right_menu').setStyles({ right:'-100px' }); }});
	$('left_menu').addEvents({ mouseover: function(){ $('left_menu').setStyles({ left:'0px' }); }});
	$('left_menu').addEvents({ mouseout: function(){ $('left_menu').setStyles({ left:'-100px' }); }});
	
	var obj_achievement = document.getElementById('achievement');
	var obj_poker = document.getElementById('poker');
	if (obj_achievement){
	$('achievement').setStyles({ left:'', border:'1px solid #000', 'z-index':10, 'margin-left':'', right:'-100px', top:'240px', width:'110px', padding:'2px 5px', 'background-color': '#2F1D17' }).addEvents({ mouseover: function(){ $('achievement').setStyles({ right:'0px' }); }, mouseout: function(){ $('achievement').setStyles({ right:'-100px' }); }});
	}
	if (obj_poker){
	$('poker').setStyles({ left:'', border:'1px solid #000', 'z-index':10, 'margin-left':'', right:'-100px', top:'262px', width:'110px', padding:'2px 5px', 'background-color': '#2F1D17' }).addEvents({ mouseover: function(){ $('poker').setStyles({ right:'0px' }); }, mouseout: function(){ $('poker').setStyles({ right:'-100px' }); }});
	//window.pk2_getValue = function(key) {
	//window.setTimeout(function() {	aWindow.pk2_abyrvalg = GM_getValue(key);}, 1 );
	};
	});
});

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

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
	//addPop(idname,'<b>'+title+'</b>');
	return true;
};

//function addPop (id,title){
//	if ($(id))
//		setTimeout(function() {$(id).addMousePopup(title)},2500)
//}

//============================= Wygląd =================================
addGlobalStyle('body {padding:0; width:100%; height:100%; overflow-x:hidden;}');
addGlobalStyle('#border_cap, #head_title, #workbar_left, #workbar_right {background:transparent;}');
addGlobalStyle('#shadow_top, #shadow_left_top, #shadow_right_top, #shadow_left_wing, #shadow_right_wing, #shadow_left_side, #shadow_right_side, #shadow_left_corner, #shadow_right_corner, #abdorment_left, #abdorment_right, #wb_buy_pa {display:none;}');
addGlobalStyle('#main_sizer {padding-top:0;}');
addGlobalStyle('#left_menu {background-position:0px 0px;z-index:15;left:-100px}');
addGlobalStyle('#left_menu .menu_list {margin-top:5px;}');
addGlobalStyle('#right_menu {background-position:right 0px;z-index:15;right:-100px;}');
addGlobalStyle('#menus {z-index:20;}');
addGlobalStyle('#right_menu .menu_list {margin-top:5px;}');
addGlobalStyle('.bottomleftcurve, .bottomrightcurve, .workbar_top {background-image:none; }');
addGlobalStyle('.wb_taskbar {height:auto;top:85px;}');
addGlobalStyle('#main_container, #main_sizer {margin-left:0;margin-right:0;}');
addGlobalStyle('#main_container_border_left {left:0px}');
addGlobalStyle('#main_container_border_right {right:-0px;}');
addGlobalStyle('.wb_taskbar_top {left:auto;right:auto;height:70px;}');
addGlobalStyle('#workbar_left, #workbar_right {position:absolute;margin-top:0px!important;height:70px;width:auto;z-index:2;}');
addGlobalStyle('#workbar_left {left:22px;}');
addGlobalStyle('#workbar_right {right:22px;}');
addGlobalStyle('#workbar_right .workbar_top, #workbar_left .workbar_top {background:transparent;height:auto;}');
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3 {float:left;}');
addGlobalStyle('#wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 {float:right;}');
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3, #wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 {margin-left:0px;margin-right:0px;width:70px;background:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/workbar_item_background.png) no-repeat 0px 32px;}');
addGlobalStyle('#main_container_position {top:6px;}');
addGlobalStyle('#map_border_bottom_sizer {margin-top:-126px;}');
addGlobalStyle('#map_border_bottom {width:98%!important;}');
addGlobalStyle('#footer_menu_left {z-index:100;width:700px!important;padding-top:0!important;}');
addGlobalStyle('#footer_menu_right {z-index:100;padding-top:0!important;}');
addGlobalStyle('#footer_menu_left a img {background-image:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/tw-shortcuts.png);}');
addGlobalStyle('#footer_menu_right a img {background-image:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/tw-shortcuts.png);}');

addGlobalStyle('#character_info {z-index:10;opacity:0.7;filter:alpha(opacity=70);left:-100px;}');
addGlobalStyle('#character_money {right:-80px;margin-right:0px}');
addGlobalStyle('#current_task_box {z-index:10;top:10px;opacity:0.7;filter:alpha(opacity=70);}');
addGlobalStyle('#map_arrows {position:absolute;top:35px;width:10px;left:50%;}');
addGlobalStyle('#map_scroll_left {top:15px!important;left:-25px;}');
addGlobalStyle('#map_scroll_right {top:15px!important;left:15px;}');
addGlobalStyle('#map_scroll_bottom {top:35px!important;}');

addGlobalStyle('#scroll_to_fort_list {position:absolute;left:240px!important;bottom:-110px;}');
//============================= /Wygląd ================================

// mapki fortów
addGlobalStyle('#fortsmaps_link { background:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/mapy.png); }');

//============================= Zmienne ================================

var enable_fortsmaps = true; // true/false

//============================= /Zmienne ===============================

//============================= Zmienne - linki ========================

//============================= /Zmienne - linki =======================

// 1-37 2-74 3-111 4-148 5-185 6-222 7-259 8-296 9-333 10-370 11-407 12-444 13-481 14-518 15-555 16-592 17-629 18-666 19-703 20-740 21-777 22-814
addGlobalStyle('#footer_menu_left #footer_building_gunsmith, #footer_menu_left #footer_building_tailor,#footer_menu_left #footer_building_general,#footer_menu_left #footer_building_hotel,#footer_menu_left #footer_building_bank,#footer_menu_left #footer_building_church,#footer_menu_left #footer_building_mortician ,#footer_menu_left #footer_building_cityhall,#footer_menu_left #footer_building_saloon,#footer_menu_left #footer_trader_saloon, #footer_menu_left #footer_building_market, #footer_menu_left #footer_building_sheriff { z-index:100; background-image:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/tw-shortcuts.png);}');

addGlobalStyle('#footer_building_gunsmith {background-position:-407px 0;}');
addGlobalStyle('#footer_building_tailor {background-position:-444px 0;}');
addGlobalStyle('#footer_building_general {background-position:-481px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-518px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-555px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-592px 0;}');
addGlobalStyle('#footer_building_church {background-position:-629px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-666px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-703px 0;}');
addGlobalStyle('#footer_trader_saloon {background-position:-740px 0;z-index:50}');
addGlobalStyle('#footer_building_sheriff {background-position:-777px 0;z-index:50}');
addGlobalStyle('#footer_building_market {background-position:-814px 0;z-index:50}');
addGlobalStyle('#footer_crafting {background-position:-840px 0;z-index:50}');

addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor'); // krawiec
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith'); // rusznikarz
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general'); // general store
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel'); // hotel
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank'); // bank
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church'); // kościół
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');
addFooterIcon('javascript:AjaxWindow.show(\'item_trader\', {action: \'index\', h: h});','footer_trader_saloon');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market');
addFooterIcon('javascript:AjaxWindow.show(\'crafting\', {action: \'index\'});','footer_character_profession_image');
//javascript:AjaxWindow.show('fingerboard',{town_id:7},'town_7');

//


/***** Mapy fortów *****/
if ( enable_fortsmaps ) {
	var fortsmaps_link = document.createElement("div");
	fortsmaps_link.id = "fortsmaps_link";
	fortsmaps_link.innerHTML = "<img class=\"TWF_fortsmaps\" src=\"images/transparent.png\" width=\"128\" height=\"25\" usemap=\"#map_mapy\" class=\"TWF_fortsmaps\" /><map name=\"map_mapy\" class=\"TWF_fortsmaps\"><area shape=\"rect\" coords=\"32,0,65,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/duzy.png\" alt=\"duży fort\" target=\"_blank\" title=\"Duży fort\" class=\"TWF_fortsmaps\" /\"><area shape=\"rect\" coords=\"65,0,94,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/sredni.png\" alt=\"średni fort\" target=\"_blank\" title=\"Średni fort\" class=\"TWF_fortsmaps\" /><area shape=\"rect\" coords=\"94,0,120,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/maly.png\" alt=\"mały fort\" target=\"_blank\" title=\"Mały fort\" class=\"TWF_fortsmaps\" /></map>";
}

/***** New buttons *****/
var menu_settings = document.getElementById('menu_settings');
if (menu_settings) {
	if ( enable_fortsmaps ) {
		menu_settings.parentNode.insertBefore(fortsmaps_link, menu_settings.nextSibling);
	}
}

/***** Notes *****/
// name           The West Bloc-notes [SOM]
// namespace      http://userscripts.org/scripts/review/96360
// description    Ajout d'un Bloc Notes a TW [SOM - Scripts-O-Maniacs] [Multilingual]
// author         Dun [SOM - Scripts-O-Maniacs] - Originaly by misterNO
// include        http://*.the-west.*/game.php*
// include        http://userscripts.org/scripts/source/99336.meta.js
// version        1.0.7
// history        1.0.7 Correction btn url et ajout btn img
// history        1.0.6 Correction bug + resumé sans bbcode
// history        1.0.5 Ajout RAZ
// history        1.0.4 Correction caracteres accentués
// history        1.0.3 Correction pour la previualisation des bbcode du jeu
// history        1.0.2 Ajout BBCode
// history        1.0.1 Centrage de la fenetre et du message
// history        1.0 modification SOM
var notes_version = "1.0.7";

    var insertBeforeElement = document.getElementById('left_top');

    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    var myScript = "var notes_version = '"+notes_version+"';";
    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

    (function(f) {
        var d=document,s=d.createElement('script');
        s.setAttribute('type','application/javascript');
        s.textContent = '('+f.toString()+')()';
        (d.body||d.head||d.documentElement).appendChild(s);
        s.parentNode.removeChild(s)
    })( function() {
        var debugMode=false;
        var mybbregexp={};
        mybbregexp.code=[/\[code\](.*?)\[\/code\]/g, "<div style='white-space:pre;'>$2</div>"];
        if(debugMode) {
            var debugDiv=document.createElement("div");
            debugDiv.setAttribute('style','position: absolute; z-index: -200; background-color: #00ff00; display: block; overflow: auto; width: 500px; height:100px;');
            debugDiv.innerHTML='<table><tr><th>Console active</th></tr><tr><td><span id="debugW">Console ACTIVE</span></td></tr></table>';
            $('windows').appendChild(debugDiv);
        }
        function debug(text) {
            if(debugMode) {
                $('debugW').innerHTML+='<br/>'+text;
            } else {
            }
        }

        var supportedbbcodes=['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'url', 'img', 'report'];
        var imgImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF0SURBVDhPnZTNSgMxFIXnbVyKG0FwoyBYhFJ/qkK7UATtohSUQaV2MehCwYrQhe/Qt1B8GfsM3fglJ+ZnppVqOYSb5p7cc0+SyWpry/9GBvN0fx3kZ9s35zuMlydbBP1OXSAWlMCq8iEacre1SdLj1e7wuskIXvut0aD9dn8BCEZ3R37podcQ35HZEkK28K/o1qnnyIh5uT2GO/0aO0zGU6Cp4h+QRnIgUxmdjhynWnJRFNJEwBYEJKM8yP6FbGkGZndLfsoPE9mBHEu1cZWMQYlszJzXc1U2PSeyE8NKbVcM4/CwKfTMPFS2jcXTktvInmOYaxKxxiL1LKsEY0F8zmjwsnUkYmp8//gEnk+QGMYlkWGeKb7fJeaToxvqeuZiixzX9MVL9UVOznmY78VlZ27k6ydHhYbn/ECyF/klN4z3RdvwzesbtPX6sDR+zEwpyCojyeFJ6nHTBrYDAg+/hDp9DFjiz2Zt1Rmmz9DGytKfAOUbGoHMpkGXoxIAAAAASUVORK5CYII%3D';
        var  noImg="data:image/png;base64,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";
        var titleImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAAAZCAMAAAAc2dwqAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfbAhUULQvQ/Nk6AAAAB3RJTUUH2wIVFDslxbOCUgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAwBQTFRFAAAAKRAIKRAQKRgQMRAIMRAQMRgQMRgYORgYOSEYOSEhOSkhOSkpQikhQikpQjEpQjExSikpSjEpSjExSjkxUjEpUjExUjkxUjk5UkJCWjk5WkI5WkJCWkpKY0I5Y0pCY0pKY1JKa1JKa1JSc2Nac2Nje2Nae2tje2trhGtjhHNrhHNzjGtSjHNajHNrjHtzjHt7lHtzlIR7lIyEnIyEnJSUpZSMpZycrZyUraWUraWcraWlxr29zsbG1s7O3tbW5+fn7+/v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NXIPRAAAAAF0Uk5TAEDm2GYAAAIHSURBVHjazVdhi+MgEB3ywWAWDWhgBOXsGkjZ445ypZTd///HbhJTmzS2y35o0hcwOg4zL2+iiSBlTWjq+nqTQkwGhJp8xFuE6Cff0oAmCFKMAaYTcTCz/TQwaFG8KCrJwRu2NY08WKUkeFe9Jr1KKgVoGlm+ID8m/E7Bn18GX1G9CrvuLwAcsBacscTw0mUT21NVmmUdugXjNpxgwNlZuZCPJarP57jIzbgKnzDi06Ligw+bumxQ78iBlqtN5AZ6UTw2Tl/lXqu+RUpfFFziF0xwsnpW2y10S6gUnmGGY6THLvKuX9mUmht3ghvsPfJY00kt16tszNNfJbb/YIHOC5YeYFXhogBjaq78B2TwTuIVaUGsiMvmNXSEDzlycPaaj3Uc1++a+o0aMmHPWXawd/LiNNuMn0+SpQ8TN3u4A+/Utl9cVhl/jxwcghfrv3YTBTm2h7vs4NgFHv1u2+ewuWnLJhzhAbqwYW1Z5dtH5ODY+nTOWIvm9c9Jht8P2UHrbOZfipUly2EwF3nz0m8WtFxuBo+WRMRH967RoPXONGiMtagN1n3XoG4QjbO9EbXSRtOZTqla5Mw5P60UktH2dhfa1rvdzuKQozHWYNu137A7BKsoJlpnrYvskNBQqwSdQDX1GsqCfbyG3Ag5c84PdS2RAhJTTfEdpbBGa3roplbGkiS3hf0PowtKTbzgJjMAAAAASUVORK5CYII%3D";
        var btnImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAyCAIAAAAbXkTiAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfbAgQSMyU0Q6diAAAAB3RJTUUH2wIXFwAzpZqu6QAAAAlwSFlzAAAK8AAACvABQqw0mAAAEFNJREFUeNrtWtuPXedV//a3r+c2ZzxXOx47ju04KXFCikrpAyBEJCh5KKhVUZ8ISMAb7/AP8A8ghKoiob4CiaBIfYwq1KoRBJw0hCRNGF/GF2bsuZ3bvu+P31pr732OZ85crDov5WzZR2f2t87e61vX31rfsr703JpSqjAGn46tC1MoY43CkdbacVx80oJStmUdJsOf+NsUBZMoiy98abcDuVMUuWVpW1t5YbCEP7W2DywV8oKjiQ1dBT9f4z6/U8mLtKUKxV/AhZlCeXoy0GT5aVk60/W3tv631WklWdzuzjmunxKFE8V5oY1xok7QNgO7YftpGtlNKwuyh/v7jWA+HYaNPLfTSOskU/buoHCaLf/Lv3xFza4nud758fuXLl1qtpujaKhdJ7e0srTnt7QT+A0vKUZJGOWe1fZbJk/iYuTOO+cvXrCUm8eJl+XJYBCHg0EUxSZ0xKA+/O+7C4ttx3G2Nvde+oW1m7cerq9vatgCGTlbnIb10BexFxt/wkDgBWQmRkzDJkNTaZaR1eAiElifrvkGYZLmB5aiJD2K+PCdyT9x5UVhsWnnhgybTVqR0RtLjNzl555Ipq3ygbxufN8t8tKtL1xceu7SMuSzsjqfZdnO9gDySZJkbm5uv78fp5GrfMv1PM/3vCDNTZrmq+cumCw3UZGMQteZS7JhpqMiS/K87yjLc/zcdZy85WbYduzgB3gNnv7BB3c8175ydRXS37jziCSuDHRgKV2yTnqA6NmtxZFZH7gJzRH3/N+xWanG5DkHCqt0eM0E9LzHlw7fqYlxKxf1Fjk+te04HMBEXIaCH5FLJFEcDDO+xz8l3vPTkRm2pzpkpWkGViTAQhS4A+v85ON7SZK9/Mqz9OfCwt7e3srZlb3ebpylruteu3btF1/90trF55bPPXP3/r1uZ85EyY13/73bbs/N+Y+2N25vfJJkPTw0iew9bXueY9nDveE+fMYplV8UL7x4ER6wublveJM5B/fjWZcPM+EcpbuUMqqMjtxFTV06jpgfBwKbUxFrCh6W1h4AZcMk2JiZUUMeaWubdUnOkjDxiWRKTAob4bca/ltsC8F9/ebW2dXuCy+ev3FjXd7r+/6ZM2fCMESO7Ha7q+fXrl9/5cqV57XjR2G29syVZrOZxQPICrppeO58q6HPLmzv9sM47e+N9vuhay94QbvdCErpQ+6XL69CyXgNKQCi16XQj2ed7CsvKIJMboA1B+bq77U0RamOXaZi3C3I/DN8lo/lm0Kvq++iXUQAIdN6HIhqFAB6Fw5iSHnlbxGCHPc0ZLKv+qU5G5TF2yHPsyxECAjn+avnIKjlxfZg0JtfeCGMR2nhO67bbnWWl5dXz52ztGu7TWMFiFFes91dXFo5u2zC3a6vX/ri9UG49KjXe+/DBzu9e0Wm8rRIk8iRjI+49nAbWSF5/72bEuJrGzyedegBuODABuIi912PJJultWQlZOW8BDVQXCkxFcxTO5q8zDCZXQldRFOrhzyhtNAxA3TZtpAh8IIMr8CneVyXNpMdfqap3gWlckJAurBsDn1pnuG+57igFLG0Ow3kA9yM02R3dzdo+iCP43iAaxgipwI2Wo4dJ9loFHXdFsJqo+nHEaVdIKJBGrraOC6Ft8yizI2Hj5Pww4f7MEwjQI1yaxX0T2L98AZgd2DxsGTFJLFkM5jTFMBsDi/lSy1+8/HqkRilWUZTyRhTnpa4ZowxKAVUSXiSnDRtk6Rg8/2PPtzYWurAWJE9m80AHkDJXTsFxyukbZMbFyjUcZutjus6uzv72fnFTtMZDpL+9uagt5tbPlQEJakMSTlDAtaShIeDgRHTVqR/yCPLM2KCxYGwC6nhH0d5jQ1AahZHGAH/+MQGiJ7jFr4IDYUm2iRJVleRBEue6wA04ItsmIIt/pMNZ3khyY+kNvUhIl9VetQUsiciLhkjzkkhJARDoAgcCnta4BKbXpwkW1v7pCEAmn5/NBohDRjeQn80xLs6nTmoIUpC2Dhs6Xd+66tp1C/S4aULK7Y2o36CUkBrVFcqTPppNoI4x0l4fDG79PrHWZ9qrYUAoTLiM4yTBF1mDZYspW7SnOiMyqJiXEwxSiGcU+ZVzYGONinF06GHSAgyGjKaSkbB6dTEWWlSNsOvsgCzGH9PZc9UkZbjgp0yXNDIA46vAP9IDDoInLQA4I7brWD+6rNO8iDavdXr9bRuJolGXYD3NZpOkZjInpA+CbuElxbYDeOYwq5lH8+6RW+s8aOpn5ZkGVQoLgLNCUoVUEVLFAh5kbybfu8w2MXjGHYep54xIijUEWTFkxATWRiFXOgW2IzrenGSIlQWE/BBkrkZVwxGbqZpTHnC81zfY2gAgWmgFAeyiCLfzoJukD8s4C4oACCx0SDvD0J4U+Ajb1mkO4SOGmZIfhN2xQPMSayLQAsOoPUGFDPHIrYY9kicMVz6jJf4rXiaJTUGRWrqcEgkPFI9JTgmYjOVrMxJpyMWskbQYCe2xNQAExBvwadIo3ogrSJGijQsbTzfjfKUMryNCsWxlM02qaMsAry00iiNd6ze5ubdW8NetHr20v29B71hNhhFBScNZk85WVaZbV3ecBbCcwGiYarHsw5yX3vKVZMbKKp+jZLKQPA7gwoq0wRcmTJcVYRl6UvPKSHrdPWoqiKxK6B8gKzg/HlKYiFjQG2J5yHOwvuB381jFb6J0xR2JqoqkZXN6VIJ32XXwKLSIfeKzCn2VPIoGm4no6Hjzy+sXEo/2Q2zEXWN8iJJ0iTMwzRzkAvliUiANnTOl7BLwjqR9RLtmckN4AV1MOIgRP8k7KgSkufVshbXkJJL+gRVmT1dPXJbV7XrNDLrSYglaGFf5Nm4YMIClBlnkHCkf0fS0Pa4FQjcISLnAgXAH3GAVAkXd9003lPpnmcNfDdbOHMmV91UtXpRNkTdnOSgHfWiOMzjOC1hKHFpl5rQ47q8rBOPYV16LKSLiQ2M8woclSmlkQBdZuwHOfWLBDASpirrzrJPmY/rgKnqKYGjqUu8g2TC1ymJS5VT8UuRhMydYL5DtqgqOVi10NMqYivqWKSodW2goziOSP4MurTt+824/9CxRpbqjQY7iCPaa+3sxjv9sB+NojQBrMxT7JYj11hYZZeKjHnMLmDPsaxL5mUGxxvIq/qVK3xbVwItGCNbVA04qgpEErCsssNED4mi6Bj1SEM4TmIRzWEykecpiUuV27oq1YkHTrks98nyXmJDVRJhUzHyQQ44ogoEpwQlZwanmWu1sLqlXSdoh8O9O/f70GZ3ERKPB1EYpxFXGIBNQLpekoCVymC5gNTCa83u5PeprEvAPbCBPMulXUrHCURUlP0iBK48l0QiT6jTexnJOJIGQXCMesQwPc+vSt1DZNLKOSUxk5W2UgUDtjF9uEdicZGML82gkUYF4EaYZZ4duLaXIKCkqefTrgfhznxnqfcoWn+wuZctt1rtoe0VJukudKPNge8H4WA0Pz9vCr2z3Ss9oNVuj8Ic7Pi+XxipPeQIwhzPumNNIJxqA57jSB6eLC85PgIrl0vc47MEwtYHO5zZdK3gqeopQUiFiaeRPRFxSaYnfyxRiAtm1wE/JfqE6SwudehRWRF4HtIpPABgB7tv4+o0wXuc7rcbCzs7Gxv393cGjnKXXerWrS4vdm/85D+QKoAVbZtACzcNjCMwi3tB8++/d7PkmIRSpoHjWa8IzOQGkCEEaBquaKizZyldIZ8DS1X1+hgxF6VjZQuc1eOYzlULLRXCm9YlZ2IlcsKldNki5EL2ODLSwcRO+eDBkqpTEIGciF1/+cLyYhtkOzs7jcb1IgwbDd9vNJrNoNvt4hM0nttN073dnUdIDCsrK912yw+cdrvhNpuNRqM8fdOaquhRgups3AtqNv0g8F548fwHP7mdl+1Mq+bpKNZrMU1uQJrMGbeCqe5mdbLTWIaz9GNLgFZHEFfRrgTjllX6inwR8KWqsMN3qjLGcCug6qKfSGZqTME/ARtF5YQFK/6VV5/75ON7g34oB1Z4IkEgSwAL9Zy73blup6XdLu3CtRcXF7vdMwvdOU0g06gsUoZy9Wg4TMII2Rt5LuWzqZLFldX59fVNSB8v4HTLPAmrZTJQhF+pp2UY8BQZQZ5CwFHB+CfndpBVRRbJtCjTUupTAqgBK4SHl44nPqrdVJ1qEUqj9nRJJS+3pXFSSfRksoI77bWLS++XN0vGgS1BLBDOp589gKCwuLC01B/sQ+7SB4C72pzekvhRmmwr1UGIPzPXIYEkCakdcJaAolW/ok6uTn0ahzdByVeursIVNu48Kiy3cvZSH0UVIOGd0pWT7qdRJfe6CrdWhe6QDCQt0Lqtpi7J6lTigjGfRB7xKptrWsVHZorNuQxNJWP14QGflpYg+mSysuhlbKcqBxEy19YXLi4FDRfCqSFQmqEsS2HRUCLCxnA4fPfdf7u9sWG7LiISrLvTagHqhKMRDLUZ+DCkNBlFo9AiM3Dq6gGUjtRM0PAXvvBMfSaMOzdvbokCjmedDymJr8kNtFqBmjhKG6OL8dnZwaWpxGoSmUz8OUk8+ZOjfngi2VE0FBtWunImDA+AyORABoLDUq+353i+6webmw9u3d4wAOGu02w2B4NBu9nGF07XOTfOgPwRhTL6iVYxV9qFTzZs/dpLl3/ly1fV7HqS66OPPp2bm0PyDeOk1UGgp7EUbbuoxuAZgNEZTya42i5I+Ak8IPDtUdgHQvc8wP8EyDUMo/X1W9bUuaCcOxCqOkGsJn7KglhXbWcBjtKGkw6dnLRIA/XwdXis4ZhrknjcJnr8zuGnHaA8Pdnkk0+kDxoRFxkWwzsbuALxOS/UhENTk4hzD8dB6lKgws9d12kE1DdNk5ymUjIzXVLIgAcGs5gjS0AkHVjKYBavSttWqhXx66DhlXz/3A5mdcaDWZ3mKQez3GApHYZOktvpyNaJb9u7IQ9m/fkfvvwzO+X/r+sv//bHT3kw6+0frK9dmPN9938+2/7N37j8nzfuv/nDu7PBLFxf+8q5X/riM5DPlauLcZze3ehBPk9/MAtP/84/f+q59rdeuwDpf++dB7PBLCn6IArcgXV+9/vrSZL9ye9dU5/fYNYbrz8PD3j7v7Zng1mTg1lv/ujea9cX33j98t+8+ZG89+kPZkHu3/jVNSgZryEFzAazHh/MQoSAcH7/1y9CUM+udZ/+YBbi2u27+1GUfPutj2eDWYcHs0Qsi8st5AP1eQxm/dU//HQ2mHXiYNbf/ctni0udP/vmtdlg1mwwazaYNRvMmg1mzQazZoNZs8Gs2WDWbDBrNpg1G8yaDWbNBrNmg1k/22AWyuvbd/e//dbHajaYdfRg1h//7tVn12jy5+kPZr39g/X5Llzfe+P1y9/5p5/OBrMODGb96ddf/O7317cfDuXA6ukPZl25uvjmD+9C+niBmg1mqYODWRALhPP3/3oHglKf32AWlPyt1y58vRt8750Hs8GsejDra185157zIJzPcTALGv6Dr16qz4Rx560f3ZsNZuH67VeX5EwYHoC6SQ5knvJg1l/80Stqdj3J9df/+P5sMOvnZDDr/wBBZUjN08kYYwAAAABJRU5ErkJggg%3D%3D";
        var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
        var loc=world.replace(/[0-9]*?$/, "");
        var lang={};
        lang.mainmenu={};
        lang.valid={};
        switch(loc) {
            case "pl":
				
                lang.mainmenu.title="Notatnik";
                lang.mainmenu.savednotes="Notatka zapisana";
                lang.mainmenu.nonotes="Brak notatek";
                lang.mainmenu.nonotes2="Brak notatek";
                lang.mainmenu.object="Tytuł";
                lang.mainmenu.content="Treść";
                lang.writenew="Dodaj nową notatkę";
                lang.edit="Edycja";
                lang.prev="Podgląd";
                lang.new="Nowa notatka";
                lang.title="Tytuł";
                lang.text="Treść";
                lang.save="Zapisz";
                lang.valid.text="Wprowadź treść notatki!!!";
                lang.del="Usuń";
                lang.deltext="Usuń notatkę";
                lang.name="Notatka";
                lang.delconfirm="Usunąć notatkę ?";
                lang.restart_confirm="Usunąć wszystkie notatki ?";
                break;
            default:
                lang.mainmenu.title="Notes";
                lang.mainmenu.savednotes="Save note";
                lang.mainmenu.nonotes="No Note.";
                lang.mainmenu.nonotes2="No Note";
                lang.mainmenu.object="Object";
                lang.mainmenu.content="Content";
                lang.writenew="Add new note";
                lang.new="New note";
                lang.edit="Edit note";
                lang.prev="Preview";
                lang.title="Title";
                lang.text=" Text";
                lang.save="Save";
                lang.valid.text="Enter note !!!";
                lang.del="Delete";
                lang.deltext="Delete this note";
                lang.edit="Edit";
                lang.name="Note";
                lang.delconfirm="Delete Note ?";
                lang.restart_confirm="Delete all notes ?"
                break;
        }

        function NotesObj(ident, titre, texte, previewed) {
            this.id=ident;
            this.text=texte;
            this.preview=previewed;
            this.title=titre;
            this.mustrefresh=true;


             this.getInStorage= function(key, defaultValue) {

                var value = localStorage.getItem(escape(["NotesObj."+world+"."+ this.getId(), key].join(".")));
                if(value)
                    return eval(value);
                else
                    return defaultValue;
            };

            this.getId= function() {
                return this.id
            };
            this.setId= function(ident) {
                this.id=ident
            };
            this.getText= function() {
                return this.text
            };
            this.setText= function(texte) {
                this.text=texte
            };
            this.setPreview= function(previewed) {
                this.preview=previewed
            };
            
            this.getPreview= function() {
                debug("[Obj.getPreview] "  + this.id +" mustrefresh : " + this.mustrefresh);
                if(this.mustrefresh) {
                    this.setPreview(this.getInStorage("preview",this.preview));
                    //this.mustrefresh=false;
                    debug('Obj.getPreview refresh : ' + this.preview);
                }
                return this.preview
            };
            
            this.getTitle= function() {
                return this.title
            };
            this.setTitle= function(titre) {
                this.title=titre
            };
            this.getStaticText=function(){
                  var strDel=this.text;
                  for(var bInd=0; bInd<supportedbbcodes.length;bInd++){
                      var bb=supportedbbcodes[bInd];
                     
                      strDel = strDel.replace('['+bb+']','').replace('[/'+bb+']','');
                  }
                  
                  return strDel;    
            };
            
            this.previsualisation= function() {
                if(this.getText().indexOf("[fort]") > -1 || this.getText().indexOf("[player]")> -1
                || this.getText().indexOf("[report]")> -1
                || this.getText().indexOf("[town]")> -1 ) { //necessaire de faire le parsing sur tw

                    //this.mustrefresh=true;
                    var obj=this;
                    new Ajax('game.php?window=settings&action=get_parsed_text&h='+h,   {
                        method:'post',
                        data:"text="+this.getText(),
                        async:'false',
                        onComplete: function(data) {
                            var d= JSON.parse(data);

                            obj.setPreview(d.parsed_text.replace(mybbregexp.code[0], mybbregexp.code[1]));
                            localStorage.setItem(escape(["NotesObj."+world+"."+obj.getId(), "preview"].join(".")), JSON.stringify(obj.getPreview()));
                            //      this.setPreview(obj.getPreview());
                            debug('[Obj.previsualisation] onComplete : ' + obj.preview);

                            // return obj.preview;
                        },
                        onFailure: function() {
                           debug('[Obj.previsualisation] onFailure : ');
                            new HumanMessage("Erreur serveur : impossible de parser le texte");
                            obj.preview="Erreur parsing";
                        },
                        onSuccess: function() {

                        }
                    }).request();

                } else {
                    
                    var ret = this.getText().replace(/\[url/g,'<a href').replace(/\/url=/g,'</a'); 
                    ret=ret.replace(/\[img]/g,'<img src=').replace(/\[\/img/g,''); 
                    this.preview= ret.replace(/\[/g,'<').replace(/\]/g,'>').replace(/del/g,'s').replace(/\n/g,'<br/>');
                  
                    //return this.preview;
                }
                this.mustrefresh=false;
            }
            this.save= function() {
                //  localStorage.setItem("NotesObj."+getId()+".text",$('prev').innerHTML);
               
                this.previsualisation(); //previsualisation avant sauvegarde
                localStorage.setItem(escape(["NotesObj."+world+"."+this.getId(), "text"].join(".")), JSON.stringify(this.getText()));
                localStorage.setItem(escape(["NotesObj."+world+"."+this.getId(), "preview"].join(".")), JSON.stringify(this.getPreview()));
                localStorage.setItem(escape(["NotesObj."+world+"."+this.getId(), "title"].join(".")), JSON.stringify(this.getTitle()));
                debug('[Obj.save] ' + this.preview);
                this.show();
            };
            this.delete=function() {
                //  localStorage.setItem("NotesObj."+getId()+".text",$('prev').innerHTML);
                //this.previsualisation();
                 debug('[Obj.delete] ' + this.id);
                this.show();
                localStorage.removeItem(escape(["NotesObj."+world+"."+this.getId(), "text"].join(".")));
                localStorage.removeItem(escape(["NotesObj."+world+"."+this.getId(), "preview"].join(".")));
                localStorage.removeItem(escape(["NotesObj."+world+"."+this.getId(), "title"].join(".")));
                this.setText(null);
                this.setTitle(null);
                this.setPreview(null);
                this.setId(null);
                
                //   this.show();
            };

           /* this.load= function() {
                this.mustrefresh=true;
                this.setText(this.getInStorage("text",this.getText()));
                this.setPreview(this.getInStorage("preview",""));
                this.setTitle(this.getInStorage("title",this.getTitle()));
            } ;
            */
            
         
            
            this.load= function() {
                debug("[Obj.load] Obj loading " +this.id);
                this.mustrefresh=true;
                this.setText(this.getInStorage("text",this.getText()));
                this.setPreview(this.getInStorage("preview",this.getPreview()));
                this.setTitle(this.getInStorage("title",this.getTitle()));
                this.show();
            } ;
            this.show= function() {
                debug(this.getId() + "<br/>" + this.getTitle()+ "<br/>" + this.getText()+ "<br/>" + this.getPreview() + "<br/>MustRefresh : " + this.mustrefresh);
            };
        };

        var notes= localStorage.getItem(world+"notes");//, false);
        if(notes) {
            notes=notes.split("|");
        }

        function NotepadShow(name, data) {

            var extendeName = name;
            var params_str='';
            //nObj.show();
            if(!AjaxWindow.windows[extendeName]) {

                var xhtml='<div class="window_borders">';
                xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url('+titleImg+');">';
                xhtml+='<span style="color: rgb(255, 255, 255); display: block; font-size: 13px; position: relative; top: 3px; text-align: center;">'+lang.mainmenu.title+'</span>';
                xhtml+='</h2>';
                xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.toggleSize(\'' + extendeName + '\');" class="window_minimize"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';
                xhtml+='<div style="padding-left: 85px;" id="window_'+extendeName+'_content" class="window_content">'+data;
                xhtml+='</div>';
                xhtml+='</div>';

                var window_div=new Element('div',{'id':'window_'+extendeName,'class':'window'});
                window_div.innerHTML=xhtml;

                AjaxWindow.windows[extendeName]=window_div;
                AjaxWindow.bringToTop(window_div);
                AjaxWindow.windows[extendeName]=$('windows').appendChild(window_div);

                var window_title_div=$('window_'+extendeName+'_title');
                window_title_div.addEventListener('dblclick', function() {
                    window_div.centerLeft();
                    window_div.setStyle('top',133);
                }, false);
                $('window_'+extendeName).makeDraggable({handle:window_title_div,onStart: function() {
                        if($ES('.iframe_fixture',window_div).length>0) {
                            var el=$ES('.iframe_fixture',window_div);
                            for(i in el) {
                                el[i].setStyle('display','block');
                            }
                        }
                    },onComplete: function() {
                        if($ES('.iframe_fixture',window_div).length>0) {
                            var el=$ES('.iframe_fixture',window_div);
                            for(var i in el) {
                                el[i].setStyle('display','none');
                            }
                        }
                    }});
            } else {
                AjaxWindow.maximize(extendeName);
            }
            AjaxWindow.windows[extendeName].centerLeft();
            AjaxWindow.windows[extendeName].isReady=true;
        }

        function openNotepadMainMenu() {

            var mainmenu='<table style="width: 600px; position: absolute; left: 70px;" class="shadow_table">';
            mainmenu+='<tbody><tr>';
            mainmenu+='<td class="edge_shadow_top_left"></td>';
            mainmenu+='<td class="border_shadow_top"></td>';
            mainmenu+='<td class="edge_shadow_top_right"></td>';
            mainmenu+='</tr>';
            mainmenu+='<tr>';
            mainmenu+='<td class="border_shadow_left"></td>';
            mainmenu+='<td class="shadow_content"><div>';
            mainmenu+='<div style="height: 317px; overflow: auto;">';
            mainmenu+='<table class="table border" style="width: 100%;">';
            mainmenu+='<tbody id="tw_help_show_notes"></tbody></table></div>';
            mainmenu+='</div>';
            mainmenu+='<span><a id="tw_help_notepad_write_new"href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+lang.new
            +'</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';
            //  mainmenu+='<span><a type="application/download" href="http://fr5.the-west.fr/images/transparent.png" id="tw_help_notepad_saveas"href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Enregistrer sous'
            // +'</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';

            mainmenu+='</div></td>';
            mainmenu+='<td class="border_shadow_right"></td>';
            mainmenu+='</tr>';
            mainmenu+='<tr>';
            mainmenu+='<td class="edge_shadow_bottom_left"></td>';
            mainmenu+='<td class="border_shadow_bottom"></td>';
            mainmenu+='<td class="edge_shadow_bottom_right"></td>';
            mainmenu+='</tr>';
            mainmenu+='</tbody></table>';

            NotepadShow("tw_help_notepad", mainmenu);
            $('tw_help_notepad_write_new').addEventListener('click', function() {
                writeNote();
            }, false);
            /*             $('tw_help_notepad_saveas').addEventListener('click', function() {
             //  document.execCommand('SaveAs',false,'.txt')
             }, false);*/

            showNotesTable('tw_help_show_notes');
        }

        function openNotepadNote(id) {
            var note= localStorage.getItem(world+"note_"+id).replace(/\n/g, "<br />");
            var title= localStorage.getItem(world+"title_"+id);
            var text="<div style='padding:10px;margin:0px auto;width:420px;border:black 2px double;'><h2 style='text-align:center;'>"+title+"</h2><br /><br />"+note+"</div>";

            NotepadShow("tw_help_notepad_note", text);
        }

        function writeNote() {

            var data='';
            var title="";
            var text="";
            var prev="";
            var isNew=true;
            var window_title=lang.writenew;

            if(arguments.length>0) {

                var uprid=arguments[0];
                var nObj=notesArray[uprid];
                title= nObj.getTitle();//localStorage.getItem(world+'title_'+uprid);
                text= nObj.getText();//;//localStorage.getItem(world+'note_'+uprid);
                prev=nObj.getPreview();
                isNew=false;
                window_title=lang.edit;
            }

            data+='<div class="settings_profile_background"><div style="padding: 15px;">';
            data+='<form text_form action="?" method="post"><h2 id="windowtitle">'+window_title+'</h2>';

            //Titre
            data+='<span id="spantitle" style="overflow: auto;  display: block; margin-top: 7px; margin-left: 88px;">';
            data+='<input style="background: url(\'../images/profile/settings_profile_input_bg.png\');border: 0 none; font-family: Arial,Verdana,sans-serif; font-size: 13px;"  id="tw_help_edit_note_title" value="'+title+'"" maxlength="50" size="28" type="text">&nbsp;&nbsp;';
            data+='</span>';

            //Note
            data+='<span style="display: block; padding-left: 89px; padding-top: 10px;" >';
            data+='<div style="display:' + (!isNew?'block;':'none;')+'overflow: auto; padding: 1px 0; background: url(\'../images/profile/settings_profile_input_bg.png\') no-repeat scroll 0 0 transparent; border: 0 none;    font-family: Arial,Verdana,sans-serif;    font-size: 13px;    height: 200px;    text-align: left;    width: 355px;" id="prev">'+prev+'</div>';
            data+='<textarea style=\'display: ' + (isNew?'block;':'none;')+ 'background: url("../images/profile/settings_profile_input_bg.png") no-repeat scroll 0 0 transparent;    border: 0 none;    font-family: Arial,Verdana,sans-serif;    font-size: 13px;    height: 200px;    text-align: left;    width: 355px;\' id="tw_help_edit_note_text" name="text" >'+text+'</textarea>';
            data+='</span>';

            // Buttons

            data+='<span style="display: block; text-align: right; margin-top: 15px;">'
            data+='<span id="submit_text"><a href="#" class="button_wrap button">';
            data+='<span class="button_left"></span><span class="button_middle" id="tw_help_edit_note_button">'+ (isNew?lang.prev:lang.edit)+'</span>';
            data+='<span class="button_right"></span><span style="clear: both;"></span></a></span>';

            data+='<span id="submit_text"><a href="#" class="button_wrap button">';
            data+='<span class="button_left"></span><span class="button_middle" id="tw_help_save_note_button">'+lang.save+'</span>';
            data+='<span class="button_right"></span><span style="clear: both;"></span></a></span>';

            data+='<span ><a id="tw_help_del_note_button" class="button_wrap button" href="#"><span class="button_left"></span><span class="button_middle">'+lang.del+'</span><span class="button_right"></span><span style="clear: both;"></span></a></span>';

            data+='</span></form></div></div></div>';

            if(uprid) {
                data+="<input type='hidden' value='"+uprid+"' id='tw_help_edit_note_uprid' />";
            }
            NotepadShow('tw_help_edit_note', data);

            var BB=new BBCode($('tw_help_edit_note_text'));
            var bbbar=BB.bbcbar(supportedbbcodes);
            $('spantitle').appendChild(bbbar);
            
            $('tw_help_edit_note_button').addEventListener('click', prevNote, false);
            $('tw_help_save_note_button').addEventListener('click', saveNote, false);
            $('tw_help_del_note_button').addEventListener('click', deleteNote, false);
        }

        function removeAllNotes() {

            for(var j=0; j<15; j++) {
                localStorage.removeItem(world+"title_"+j);
                localStorage.removeItem(world+"note_"+j);
                localStorage.removeItem(world+"prev"+j);
            }
            localStorage.removeItem(world+"title_NaN");
            localStorage.removeItem(world+"note_NaN");

        }

        removeAllNotes();
        var globalparse=null;
        var iPa=0;

       

        function saveNote() {

            var text=$('tw_help_edit_note_text').value;

            if(text==="RAZMoi" && confirm(lang.restart_confirm)) {
                localStorage.removeItem(world+"notes");
                AjaxWindow.close('tw_help_edit_note');
                showNotesTable('tw_help_show_notes');
                return;
            }
            if(text==="KillAllOfNotes" && confirm(lang.restart_confirm)) {
                localStorage.setItem(world+"notes", false);
                for(var vObj in notesArray) {
                    nObj.delete();
                }

                AjaxWindow.close('tw_help_edit_note');
                showNotesTable('tw_help_show_notes');
                return;
            }
            //     globalparse=null;
            var ids= localStorage.getItem(world+'notes');
            if(ids==null) {
                ids=false;
            }
            //var text=$('tw_help_edit_note_text').value;
            var title=$('tw_help_edit_note_title').value;
            if(!text) {

                return;
            }

            var edited=$('tw_help_edit_note_uprid') ? $('tw_help_edit_note_uprid').value : false;
            var id=edited===false ? getFirstId() : edited;
           
            var oNotes=  notesArray[id];
            if(!oNotes) {
                oNotes = new NotesObj(id);
            }
            oNotes.setText(text);
            oNotes.setTitle(title);
           

            if(!title) {
                //alert(lang.valid.title);
                return;
            }

            if(edited===false) {
                if(ids===false)
                    ids=id+"|";
                else {
                    ids=ids.split("|");
                    ids.push(id);
                    ids.sort(sortNumber);
                    ids=ids.join("|");
                }
                ids=ids.replace(/^\|/, "").replace(/\|$/, "");

                //alert("SetIDS " + ids)
                localStorage.setItem(world+"notes", ids);
            }
            /*
             localStorage.setItem(world+"title_"+id, title);
             localStorage.setItem(world+"note_"+id, text);

             alert($('prev').innerHTML);
             localStorage.setItem(world+"prev_"+id,$('prev').innerHTML);
             globalparse=null;
             //previsualisation($("tw_help_edit_note_text").value)
             */
            oNotes.save();
            AjaxWindow.close('tw_help_edit_note');
            showNotesTable('tw_help_show_notes');
        }

        function prevNote() {

            var text=$('tw_help_edit_note_text').value;
            
            if(!text) {

                return;
            }
            var title=$('tw_help_edit_note_title').value;
            var edited=$('tw_help_edit_note_uprid') ? $('tw_help_edit_note_uprid').value : false;
            var id=edited===false ? getFirstId() : edited;
            

         if($('tw_help_edit_note_button').innerHTML== lang.prev) {
         
            
                
                if(text.indexOf("[fort]") > -1 || text.indexOf("[player]")> -1
                || text.indexOf("[report]")> -1
                || text.indexOf("[town]")> -1 ) { //necessaire de faire le parsing sur tw
              
                    previsualisation(text);
                    //  alert(globalparse);
                    $('prev').innerHTML=globalparse;
                } else {
                    prevOfline(text);
                     //alert(globalparse);
                    $('prev').innerHTML=globalparse;
                } 
                $('prev').style.display='block';
                $('tw_help_edit_note_text').style.display='none';
                $('tw_help_edit_note_button').innerHTML=lang.edit;
                $("windowtitle").innerHTML=lang.prev;
               // $("div-bbcode").style.display='none';
            } else {
                $('prev').style.display='none';
                $('tw_help_edit_note_text').style.display='block';
                $('tw_help_edit_note_button').innerHTML= lang.prev;
                $("windowtitle").innerHTML=lang.edit;
                //$("div-bbcode").style.display='block';
            }
            //      AjaxWindow.close('tw_help_edit_note');
            //    showNotesTable('tw_help_show_notes');
        }

        function getFirstId() {
            var ids=localStorage.getItem(world+'notes');

            if(ids===0 || ids==='0')
                ids="nullla";
            if(ids==null || ids=="") {
                return "0";
            }
            //alert("IDEs : " +ids);
            ids=ids.replace(/nullla/, "0");
            ids=ids.split("|");
            var old;
            var i=0;
            //alert("Lenght " + ids.length)
            for(i; i<ids.length; i++) {
                //alert(i +" = "+ ids[i])
                if(old||old===0) {
                    if(ids[i]-1!=old)
                        return ids[i]-1;
                }
                old=ids[i];
            }
            return parseInt(old)+1;
        }

        function sortNumber(a,b) {
            return a - b;
        }

        function editNote(ev) {
            var id=this.className;
            writeNote(id);
        }

        function deleteNote() {
            if(!confirm(lang.delconfirm)) {
                return;
            }
            var id=this.className;
            if(isNaN(id)) {
                id = $('tw_help_edit_note_uprid').value;
            }

            var ids=localStorage.getItem(world+"notes");
            ids=ids.split("|");
            var i=0;
            while(ids[i]!=id) {
                i++;
            }
            ids.splice(i, 1);
            localStorage.setItem(world+"notes", ids.join("|").replace(/\|$/, ""));
            var nObj=notesArray[id];
            nObj.delete();
            /*
             localStorage.removeItem(world+"title_"+id);
             localStorage.removeItem(world+"note_"+id);
             localStorage.removeItem(world+"prev_"+id);
             */
            AjaxWindow.close('tw_help_edit_note');
            showNotesTable('tw_help_show_notes');
        }

        function sizeText(splitcmt) {

            var comment="";
            if(splitcmt.length<70  || splitcmt.indexOf("href")>0) {
                return document.createTextNode(splitcmt);

            } else {
                var domEl = document.createElement("p");
                var last; //=splitcmt[t].lestIndexOf(' ');
                var tmpStr=splitcmt;
                var tmpTT;

                while(tmpStr!="") {

                    if(tmpStr.length<70) {

                        domEl.appendChild( document.createTextNode(tmpStr));

                        tmpStr="";
                        break;
                    }

                    tmpTT = tmpStr.substring(0, 70);
                    last=tmpTT.lastIndexOf(" ");

                    if(last<1)
                        last=70;

                    if(last >= tmpStr.length) {
                        domEl.appendChild( document.createTextNode(tmpStr))

                        tmpStr="";
                    } else {
                        domEl.appendChild( document.createTextNode(tmpTT.substring(0, last)));
                        domEl.appendChild(document.createElement("br"));

                        tmpStr=tmpStr.substring(last, tmpStr.length);
                    }

                }

                return domEl;

            }
        }

        var notesArray=new Array();

        function popupPreview() {
 
            var id= this.id;
            var nObj=notesArray[id];
            if(nObj == null){
              nObj= new NotesObj(id);
              debug("[popupPreview] Obj "+ id +" null -> loading ")
              nObj.load();
            }else{
              debug("[popupPreview] Obj "+ id +" Must Refresh " + nObj.mustrefresh)
            
            }
            
            if(nObj.mustrefresh){
            
            
             debug("[popupPreview] Refreshing popup");
             nObj.show();
            
            
            var element=document.createElement("div");

            var defcmt= nObj.getPreview().replace(/<br>/g, "<br/>");//localStorage.getItem(world+'prev_'+s).replace(/<br>/g, "<br/>");
            debug('[popupPreview] <xhr>'+defcmt+'</xhr>');
           
            element.innerHTML=defcmt;

            var comment='';

            var tmpElem=document.createElement("div");
            //
            for ( var indR = 0; indR < element.childNodes.length; indR++ ) {

                if ( element.childNodes[indR].nodeType == 3 ) {

                    var tmpE =sizeText(element.childNodes[indR].nodeValue);

                    tmpElem.appendChild(tmpE);

                } else {

                    tmpElem.appendChild(   element.childNodes[indR].cloneNode(true));
                }
            }

            comment = tmpElem.innerHTML;
            //alert(comment);
            var mousepopup =  new MousePopup(comment);
            mousepopup.bindTo(this);
            mousepopup.showDiv();//create();
            nObj.mustrefresh=false;
            }
            // this.addMousePopup(mousepopup);
            //  }
        }
        
      
       
        function showNotesTable(update, controls) {

            if(!controls) {
                controls=true;
            }

            var notes=localStorage.getItem(world+"notes");
            //var z=0;
            if(notes||notes===0) {
                notes=notes.split("|");
            } else {
                notes=new Array();
                notes[0]=false;
            }
            debug("[Show Table] : " + notes);
          
            var tbody=$(update);
            var mainmenu='<tr><th id="object" style="width: 260px;">'+lang.mainmenu.object+'</th>' ;
            mainmenu+='<th id="content" style="width: 170px;">'+lang.mainmenu.content+'</th>' ;
            mainmenu+='<th style="width: 25px;"><img height="19px" width="20px" src="images/icons/little-box.png" title="&lt;b&gt;'+ lang.del+'&lt;/b&gt;"></th>' ;
            mainmenu+='</tr>' ;

            tbody.innerHTML=mainmenu;


            for(var z=0;notes[z]||notes[z]===0;z++) {

                var s=notes[z];
                var nObj=new NotesObj(s);//, "Dun", "[player]Dun[/player]", "not parsed");

                nObj.load();
          
                notesArray[s]=nObj;

                var gmv=nObj.getStaticText();//getText();//localStorage.getItem(world+'note_'+s);
                gmv=gmv.replace(/\n/g, "");

                //comment=comment.replace(/\n/g, "<br>");
                if(gmv.length>50) {
                    gmv=gmv.substr(0,50)+"...";
                }
                var a=document.createElement('a');
                a.href="#";
                a.innerHTML=nObj.getTitle();//localStorage.getItem(world+'title_'+s);
                /*  a.addEventListener('click', function() {
                 openNotepadNote(s);
                 return false;
                 }, false);*/
                a.addEventListener('click', editNote, false);
              /*  $('content').addEventListener('click', function(){
                alert('content')}, false);*/
                a.className=s;
                a.addMousePopup(new MousePopup("<b>" + lang.edit+ "</b>"));//"<B>Editer cette note</B>"));
                var tr=document.createElement('tr');
                tr.id='tw_help_notepad_note_'+s;
                var td1=document.createElement('td');
                td1.style.width="180px";
                td1.appendChild(a);
                var td2=document.createElement('td');
                td2.innerHTML=gmv;
                td2.setAttribute('id', s);
                td2.addEventListener('mouseover', popupPreview, false);
                td2.style.width="305px";
                tr.appendChild(td1);
                tr.appendChild(td2);
                if(controls) {
                    var td3=document.createElement('td');
                    td3.style.width="25px";
                    td3.style.align="center";
                    var del=document.createElement('img');
                    del.src=noImg;
                    del.alt=lang.del;
                    del.style.cursor="pointer";
                    del.style.width="25px";
                    del.style.height="25px";

                    del.className=s;
                    del.addEventListener('click', deleteNote, false);

                    td3.appendChild(del);
                    //td3.appendChild(edit);
                    tr.appendChild(td3);
                    //tr.appendChild(td3);

                    del.addMousePopup(new MousePopup("<B>"+lang.deltext+"</B>"));

                }
                tbody.appendChild(tr);
            }
            if(z===0) {
                var tr=document.createElement('tr');
                tr.innerHTML="<td>"+lang.mainmenu.nonotes+" </td>";
                tbody.appendChild(tr);
            }
            //$(update).innerHTML='';
            //$(update).appendChild(tbody);
        }

        var mybbregexp={};
        mybbregexp.code=[/\[code\](.*?)\[\/code\]/g, "<div style='white-space:pre;'>$2</div>"];

        function prevOfline(ret) {

            ret = ret.replace(/\[url/g,'<a href').replace(/\/url=/g,'</a'); 
            ret=ret.replace(/\[img]/g,'<img src=').replace(/\[\/img/g,''); 
            globalparse = ret.replace(/\[/g,'<').replace(/\]/g,'>').replace(/del/g,'s').replace(/\n/g,'<br/>');
            if($('prev')) {
                        $('prev').innerHTML=globalparse;
                       
            }

        };
 
        function previsualisation(ret) {
            
            new Ajax('game.php?window=settings&action=get_parsed_text&h='+h,   {
                method:'post',
                data:"text="+ret,
                async:'false',
                onComplete: function(data) {
                    var d= JSON.parse(data);
                    globalparse=d.parsed_text.replace(mybbregexp.code[0], mybbregexp.code[1]);

                    if($('prev')) {
                        $('prev').innerHTML=globalparse;
                       
                    }  

                },
                onFailure: function() {
                    alert("Erreur serveur : impossible de parser le texte");
                    globalparse="Erreur parsing";
                },
                onSuccess: function() {
                    //  alert("parsed" +  globalparse);
                    // globalparse=true;
                    //  alert("parsed" +  globalparse);
                }
            }).request();

        }; 

        function BBCode(textarea) {
            this.textarea=textarea;
        }

        BBCode.prototype.bbcodes={'b':'0px 50%', 'i':'-20px 50%', 'u':'-40px 50%', 'del': '-60px 50%', 'player':'-80px 50%', 'town':'-100px 50%', 'fort':'-120px 50%', 'url':'-160px 50%', 'img':'-160px 50%'};
        BBCode.prototype.bbcclass='profile_bb_code_image';
        BBCode.prototype.getText= function() {
            this.textarea.focus();
            if(typeof document.selection!='undefined') {
                var range=document.selection.createRange();
                return range.text;
            } else if(typeof this.textarea.selectionStart!='undefined') {
                var start=this.textarea.selectionStart;
                var end=this.textarea.selectionEnd;
                return this.textarea.value.substring(start,end);
            }
            return null;
        };
        BBCode.prototype.insertText= function(startTag,text,endTag) {
            this.textarea.focus();
            if(typeof document.selection!='undefined') {
                var range=document.selection.createRange();
                range.text=startTag+text+endTag;
                range=document.selection.createRange();
                if(insText.length==0) {
                    range.move('character',-endTag.length);
                } else {
                    range.moveStart('character',startTag.length+text.length+endTag.length);
                }
                range.select();
            } else if(typeof this.textarea.selectionStart!='undefined') {
                var start=this.textarea.selectionStart;
                var end=this.textarea.selectionEnd;
                this.textarea.value=this.textarea.value.substr(0,start)+startTag+text+endTag+this.textarea.value.substr(end);
                var pos;
                if(text.length==0) {
                    pos=start+startTag.length;
                } else {
                    pos=start+startTag.length+text.length+endTag.length;
                }
                this.textarea.selectionStart=pos;
                this.textarea.selectionEnd=pos;
            }
        };
        BBCode.prototype.addCodeTag= function(tagName) {
            this.insertText('['+tagName+']',this.getText(),'[/'+tagName+']');
        };
        BBCode.prototype.addExtendedCodeTag= function(description,tagName) {
            var input=prompt(description);
            var text=this.getText();
            text=(text.length==0?prompt(('ProsA      m zadej popisky pro \"%1\" BB-Code.',tagName)):text);
            this.insertText('['+tagName+'='+input+']',text,'[/'+tagName+']');
        };
        BBCode.prototype.addCallbackCodeTag= function(tagName,callbackFunction) {
            var text=callbackFunction();
            this.insertText('['+tagName+'='+text+']',this.getText(),'[/'+tagName+']');
        };
        BBCode.prototype.bbcbar= function(bbs) {

            var div=document.createElement('div');

            div.setAttribute("style",'display:inline;');
            div.setAttribute("id", 'div-bbcode');
            //div.style.display='none';
            var that=this;
            for(var i=0; i<bbs.length;i++) {

                var img=document.createElement('img');
                img.className=this.bbcclass;
                if(bbs[i]=='img'){
                   
                    img.src=imgImg;
                }else{
                img.className=this.bbcclass;
                      img.src='images/transparent.png';
                     
                }
                
                img.alt=bbs[i];
                img.style.backgroundPosition=this.bbcodes[bbs[i]];
                img.id='bb-'+bbs[i];
                
                if(bbs[i]!='url') {

                    img.addEventListener('click', function() {
                        that.addCodeTag(this.alt);
                    }, false);
                } else
                    img.addEventListener('click', function() {
                        that.addExtendedCodeTag('Url:', this.alt);
                    }, false);
                div.appendChild(img);
            }
            return div;
        };
        
        
        
        // ajout dans le menu gauche
        var leftmenu = $('left_menu').getFirst();

        var newLI = document.createElement('div');
        newLI.setAttribute('id', 'armorset_li');
        var dunButt = document.createElement('a');
        dunButt.setAttribute('href',"#");
        newLI.setAttribute('style',"background-image:url("+btnImg+"); background-repeat:no-repeat; background-position:left top; width:128px; height:25px;");
        newLI.setAttribute('onMouseMove',"this.style.backgroundPosition = 'left bottom'");
        newLI.setAttribute('onMouseOut',"this.style.backgroundPosition = 'left top'");
        dunButt.innerHTML= "<span style=\"width: 102px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: 3px; text-align: center; left: 3px\">"+lang.mainmenu.title+"</span>";
        $('workbar_left').style.zIndex = '5';

        newLI.appendChild(dunButt);
        //newLI.injectAfter($('menu_forts'));
        leftmenu.appendChild(newLI);
        dunButt.addEventListener("click", openNotepadMainMenu, false);

        var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
        $('workbar_left').setStyle('margin-top', marginTop + 'px');
        debug('[Global] Affichage terminé');
        //removeAllNotes();
         
        //MAJ AUTO SOM

    })

/***** /Notes *****/

/***** Motywacja do pojedynków *****/
// name           The-west Motivation Exp
// namespace      http://dikamilo.jogger.pl/
// description    This small easy script shows how many exp you got including motivation.
// include        http://*.the-west.*
// include        http://zz1w1.tw.innogames.net/game.php*
// exclude        http://www.the-west.*
// exclude        http://forum.the-west.*

document.getElementById( "windows" ).addEventListener( "DOMNodeInserted", nodeInserted, false );

function nodeInserted( event ){
	if ( document.querySelector( 'div.saloon_duel_layer' ) ) {
        var motivation = document.querySelector( "div.bar_perc" ).innerHTML;
		motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
		var duel_elements = document.querySelector( "table.saloon_duel_table" ).getElementsByTagName( "tr" );
		for( i = 1; i < duel_elements.length; i++ ){
			var exp = duel_elements[ i ].childNodes[5].innerHTML;
            if( exp.length <= 5 ){
                var xp = (0 + exp) * motivation;
                duel_elements[ i ].childNodes[5].innerHTML += " ( " + xp.toFixed(0)  + " )";
            }
        }
    }
}
/***** /Motywacja do pojedynków *****/

}