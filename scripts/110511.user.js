// ==UserScript==
// @name simpleGamer
// @version 0.4.5.12
// @date 08/17/2011
// @description simpleGamer
// @author Setr
// @namespace http://www.gamer.ru/
// @include http://www.gamer.ru/*
// @grant none
// ==/UserScript==

/* Plugins */
/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,window,undefined){
var elems = $([]),
jq_resize = $.resize = $.extend( $.resize, {} ),
timeout_id,
str_setTimeout = 'setTimeout',
str_resize = 'resize',
str_data = str_resize + '-special-event',
str_delay = 'delay',
str_throttle = 'throttleWindow';
jq_resize[ str_delay ] = 100;
jq_resize[ str_throttle ] = true;
$.event.special[ str_resize ] = {
setup: function() {
if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
var elem = $(this);
elems = elems.add( elem );
$.data( this, str_data, { w: elem.width(), h: elem.height() } );
if ( elems.length === 1 ) { loopy(); } }, teardown: function() {
if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
var elem = $(this);
elems = elems.not( elem );
elem.removeData( str_data );
if ( !elems.length ) { clearTimeout( timeout_id ); } }, add: function( handleObj ) {
if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
var old_handler;
function new_handler( e, w, h ) {
var elem = $(this),
data = $.data( this, str_data );
data.w = w !== undefined ? w : elem.width();
data.h = h !== undefined ? h : elem.height();
old_handler.apply( this, arguments ); };
if ( $.isFunction( handleObj ) ) { old_handler = handleObj;
return new_handler;
} else { old_handler = handleObj.handler;
handleObj.handler = new_handler; } } };
function loopy() {
timeout_id = window[ str_setTimeout ](function(){
elems.each(function(){
var elem = $(this),
width = elem.width(),
height = elem.height(),
data = $.data( this, str_data );
if ( width !== data.w || height !== data.h ) { elem.trigger( str_resize, [ data.w = width, data.h = height ] ); } });
loopy(); }, jq_resize[ str_delay ] ); }; })(jQuery,this);
/* Plugins End */

var sg_style = "";
sg_style += "div.sg_clear {clear:both;}";

/* Сохранение настроек */
function sg_saveSettings(arr){
	localStorage.setItem('sg_version', '0.4.5.12');
	localStorage.setItem('sg_settings_format', '1');
	localStorage.setItem('sg_settings', arr.toString());
}
/* Загрузка настроек */
function sg_loadSettings(){
	tmp=localStorage.getItem('sg_settings');
	if (tmp!==null){
		arr = tmp.split(",");
	} else {
		tmp=$.cookie("sg_settings_nd");
		if (tmp!==null){
			arr = tmp.split(",");
			$.cookie("sg_settings", null);
			$.cookie("sg_settings_nd", null);
		} else {
			arr = [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		}
	}
	return arr;
}

$('section.miniprofile').prepend("<div id='sg_top_section_settings'><a href='#' id='sg_settings'>sG</a></div>");
sg_style += "div#sg_top_section_settings {width:30px; height:20px; padding:10px 10px 0; float:left; border-right: 1px dotted #93876D;}";
sg_style += "div#sg_top_section_settings a {display:inline-block; text-decoration:none; outline:none; background:url('/images/layouts/icon-arrow-down-1.gif') no-repeat 0 5px; padding:0 0 0 12px;}";

var sg_tab1 = "";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s0' rel='0' /> <label for='sg_settings_s0'>Остаток опыта до следующего уровня</label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s1' rel='1' /> <label for='sg_settings_s1'>Наверх</label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s2' rel='2' /> <label for='sg_settings_s2'>Выделение комментариев автора поста</label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s3' rel='3' /> <label for='sg_settings_s3'>Увеличить размер видеоплееров</label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s4' rel='4' /> <label for='sg_settings_s4'>Cсылки на комментарии</label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s5' rel='5' /> <label for='sg_settings_s5'>Отключить редирект для внешних ссылок</label></div>";
/*
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s6' rel='6' /> <label for='sg_settings_s6'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s7' rel='7' /> <label for='sg_settings_s7'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s8' rel='8' /> <label for='sg_settings_s8'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s9' rel='9' /> <label for='sg_settings_s9'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s10' rel='10' /> <label for='sg_settings_s10'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s11' rel='11' /> <label for='sg_settings_s11'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s12' rel='12' /> <label for='sg_settings_s12'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s13' rel='13' /> <label for='sg_settings_s13'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s14' rel='14' /> <label for='sg_settings_s14'></label></div>";
*/
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s15' rel='15' /> <label for='sg_settings_s15'>Применять доп. настройки отображения</label></div>";
/*
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s16' rel='16' /> <label for='sg_settings_s16'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s17' rel='17' /> <label for='sg_settings_s17'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s18' rel='18' /> <label for='sg_settings_s18'></label></div>";
sg_tab1 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s19' rel='19' /> <label for='sg_settings_s19'></label></div>";
*/

var sg_tab2 = "";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s20' rel='20' /> <label for='sg_settings_s20'>Дополнителная навигация</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s21' rel='21' /> <label for='sg_settings_s21'>Скрыть платформы в меню</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s22' rel='22' /> <label for='sg_settings_s22'>Скрыть виджеты</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s23' rel='23' /> <label for='sg_settings_s23'>Скрыть блок магазина</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s24' rel='24' /> <label for='sg_settings_s24'>Скрыть топ компаний / игроков / игр</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s25' rel='25' /> <label for='sg_settings_s25'>Скрыть баннеры</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s26' rel='26' /> <label for='sg_settings_s26'>Скрыть блок конкурсов / новостей</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s27' rel='27' /> <label for='sg_settings_s27'>Скрыть топ людей блога</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s28' rel='28' /> <label for='sg_settings_s28'>Скрыть блок игроки также играют</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s29' rel='29' /> <label for='sg_settings_s29'>Скрыть блок комментариев</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s30' rel='30' /> <label for='sg_settings_s30'>Скрыть блок тегов</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s31' rel='31' /> <label for='sg_settings_s31'>Скрыть фото в профиле</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s32' rel='32' /> <label for='sg_settings_s32'>Скрыть блоки социальных сетей</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s33' rel='33' /> <label for='sg_settings_s33'>Скрыть блок интересное</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s34' rel='34' /> <label for='sg_settings_s34'>Включить лампочку</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s35' rel='35' /> <label for='sg_settings_s35'>Дополнительные ссылки на блоги</label></div>";
sg_tab2 += "<div class='sg_settings_form_item'><input type='checkbox' id='sg_settings_s36' rel='36' /> <label for='sg_settings_s36'>Скрыть блок еще в блоге</label></div>";

var sg_tab3 = "";

var sg_tab4 = "";

var sg_tab5 = "";
sg_tab5 += "<div class='sg_settings_form_line'>Скопируйте данную строку в сообщение о баге</div><div><input type='text' id='sg_debug_field' readonly /></div>";
function sg_update_debug(){
	$('#sg_debug_field').val('version:' + localStorage.getItem('sg_version') + '; format:' + localStorage.getItem('sg_settings_format') + '; settings:' + localStorage.getItem('sg_settings') + '; ua:' + navigator.userAgent );
}
sg_style += "#sg_debug_field {width:100%; background:#e0ddce; border:1px solid #cbc2a7; color:#333; font-size:12px;}";
sg_style += "div.sg_settings_form_line {padding:0 0 5px;}";

$('body').append("<div id='sg_settings_form'><div id='sg_settings_form_tabs'><a href='#' class='sg_settings_form_tab sg_active' rel='1'>Настройки</a><a href='#' class='sg_settings_form_tab' rel='2'>Отображение</a><a href='#' class='sg_settings_form_tab' rel='5'>Прочее</a></div><div class='sg_settings_form_tab_content' rel='1'>" + sg_tab1 + "<div class='sg_clear'></div></div><div class='sg_settings_form_tab_content' rel='2'>" + sg_tab2 + "<div class='sg_clear'></div></div><div class='sg_settings_form_tab_content' rel='5'>" + sg_tab5 + "<div class='sg_clear'></div></div><div id='sg_settings_form_refresh_message'>Для применения настроек <a href='#'>обновите страницу</a></div></div>");
$('div.sg_settings_form_tab_content').hide();
$('div.sg_settings_form_tab_content[rel=1]').show();

sg_style += "div#sg_settings_form {position:fixed; width:600px; top:30px; right:0; background:#e0ddce; z-index:999; padding:10px; border-bottom:1px solid #cbc2a7; border-left:1px solid #cbc2a7; display:none; color:#333; font-size:12px;}";
sg_style += "div#sg_settings_form a {color:#333; font-size:12px;}";
sg_style += "div#sg_settings_form_tabs {padding:0 0 5px;}";
sg_style += "a.sg_settings_form_tab {display:inline-block; margin:0 3px 0 0; text-decoration:none; padding:5px; border:1px solid #cbc2a7; background:#f0eedf; outline:none;}";
sg_style += "a.sg_settings_form_tab.sg_active {background:#f1efef;}";
sg_style += "div.sg_settings_form_tab_content {background:#f0eedf; border:1px solid #cbc2a7; padding:10px;}";
sg_style += "div.sg_settings_form_item {min-width:288px; float:left;}";
sg_style += "div#sg_settings_form_refresh_message {text-align:center; margin-top:4px; background:#f0eedf; padding:5px; border:1px solid #ccc;}";

sg_update_debug();
$('#sg_debug_field').focus(function(){
    $(this).select();
});

sg_settings = sg_loadSettings();
for (i=0;i<sg_settings.length;i++){
	if (sg_settings[i]==1){
		$("div#sg_settings_form input[rel='" + i + "']").attr('checked','true');
	}
}
$('a#sg_settings').live("click",function(){
	$('div#sg_settings_form').slideToggle();
	return false;
});
$('div#sg_settings_form input[type=checkbox]').click(function(){
	id=$(this).attr('rel');
	is_checked=$(this).attr('checked');
	if (is_checked){
		sg_settings[id]=1;
	} else {
		sg_settings[id]=0;
	}
	sg_saveSettings(sg_settings);
	sg_update_debug();
});
$('div#sg_settings_form_refresh_message a').live("click", function(){
	location.reload(true);
	return false;
});
$('a.sg_settings_form_tab').live("click", function(){
	$('a.sg_settings_form_tab').removeClass('sg_active');
	$('div.sg_settings_form_tab_content').hide();
	$(this).addClass('sg_active')
	$('div.sg_settings_form_tab_content[rel=' + $(this).attr("rel") + ']').show();
	return false;
});
sg_saveSettings(sg_settings);

/* Наверх */
if (sg_settings[1]==1){
	$('body').append("<div id='sg_go_on_top' class='sg_ns'></div>");
	sg_style += "div#sg_go_on_top {position:fixed; width:60px; height:100%; left:0; top:30px; z-index:9; text-align:center; padding:5px; opacity:0.1; display:none; cursor:pointer; font-size:14px; background:#f0eedf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhhJREFUeNqslU0zw1AUhs9NUophKF2gPscYNjKGnf/iH7CxsZBVFhasdGlja8XgP1hnwYzxPaUL9dWaIqN6vZUbcxtxpeXOvJPkJHnec8+5uWGcc4oyTKstRTSzRXSy6djHqxRxaNHgHT1Eo9tEr9NE/SumlZr7NwMPPrKD0ymifRwOoLG1qCZMVSLTSgA+BDgH/AiRBqgENUPj0Mm8Y1+l6zLw4AOAlwE/RcSQ7r4Lk1HoXGkSamBanYD3CvhFAC6bNEHDUAYm1+lIBh68G/B3wDM/wGWTODQIZUNNqgxMqwvwpIBnf4H7oww1Qr1Q7pvJl4EHTwD+BngOET2YSwici3hlJjGoG3qASTZdZWBayT7A95DNBNG9tHpLIkPfgAfOmUhEF89VTLqg+wUiN+3Yt2+iBvF1LEHAeZ6oR6TG0cEc5v4iZe+D5b6146LlCTHuxTW4tCzjJAEtCQN9lqjg+q849mXetIbwEFusLgeFlK1UIMpXkrvDtSFmZnjfjOiiY1/cfH/ZcNUfum/4WaI89qdijVuFJpVGLkvwqCkxCgNd3OYhq0iO6cpFbKhnoJG6B8GZ/smAfmiyXu92rQVKpCpl3TMIrntW8y/FiLaKwnrA/9qDWKDWTJFIuR6DRxA7xV9MBY9RYfdQIzuiAWOskno8NdZ6lpgsbmC/c0M2IJ+vUfHWzRwUknjPxcb5XNM/+T/GhwADALGMupqtcFURAAAAAElFTkSuQmCC) no-repeat 50% 50%;}";
	sg_style += "div#sg_go_on_top.sg_ns {background:transparent;}";
	$(document).ready(function(){
		if ($(window).scrollTop() > 450) {
			$('div#sg_go_on_top').fadeIn();
		}
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 450) {
			$('div#sg_go_on_top').fadeIn();
		} else {
			$('div#sg_go_on_top').fadeOut();
		}
	});
	$('div#sg_go_on_top').click( function(){
		$('html,body').stop().animate({ scrollTop: 0 }, 800);
		return false;
	});
	$('div#sg_go_on_top').mouseover( function(){
		$(this).removeClass('sg_ns').stop().animate({opacity: 0.95}, 300);
	});
	$('div#sg_go_on_top').mouseout( function(){
		$(this).stop().animate({opacity: 0.1}, 300, function(){ $(this).addClass('sg_ns'); });
	});
}

/* Размеры видео */
if (sg_settings[3]==1){
	if ( (sg_settings[15]==1)&&(sg_settings[23]==1)&&(sg_settings[24]==1)&&(sg_settings[25]==1)&&(sg_settings[30]==1) ){
		sg_vid=$('div.video');
		sg_vid.children('object').attr({'width':'720','height':'405'});
		sg_vid.children('object').children('embed').attr({'width':'720','height':'405'});
	} else {
		sg_vid=$('div.video');
		sg_vid.children('object').attr({'width':'550','height':'310'});
		sg_vid.children('object').children('embed').attr({'width':'550','height':'310'});
	}
}

/* Остаток опыта (статика) */
if (sg_settings[0]==1){
	sg_display_xp();
}
function sg_display_xp(){
	var sg_n = $('section.miniprofile div.account span.level');
	if (sg_n.children('span').length==0){
		var sg_xp = sg_n.prop("title").split(" ")[4];
		if (typeof(sg_xp) !== 'undefined'){
			sg_n.append("&nbsp;<span style='top:0;cursor:pointer;' id='sg_expirience'>+" + sg_xp + " XP</span>");
		}
	}
}
sg_profile_link = $('section.miniprofile div.account a.author_name').attr('href');
$('#sg_expirience').live('click', function(){
	if (typeof(sg_profile_link) !== 'undefined'){
		location.href = sg_profile_link + '/experience';
	}
});

$(document).ajaxStop(function(){

	/* Выделение комментариев автора */
	if (sg_settings[2]==1){
		if ($('article section.head-post div.info-author a.author_name').length > 0){
			sg_author = $('section.head-post div.info-author a.author_name').text();
			$('a.author_name').each(function(index){
				if (index!=0){
					if ($(this).html()==sg_author){
						$(this).closest('li').css({'background':'#fff','border-left':'5px solid #bbf'});
					}
				}
			});
		}
	}

	/* Остаток опыта */
	if (sg_settings[0]==1){
		sg_display_xp();
	}

	/* Ссылки на комментарий */
	if (sg_settings[4]==1){
		$('li.comment').each(function(index){
			$(this).append('<div class="sg_comment_link"><a href="#' + $(this).attr('id') + '">#</a></div>');
		});
	}

	/* Внешние ссылки */
	if (sg_settings[5]==1){
		$('div#main a[href^="http://www.gamer.ru/runaway"]').each(function(index){
			$(this).attr('href', decodeURIComponent( $(this).attr('href').replace("http://www.gamer.ru/runaway?href=","") ) ).addClass('sg_away_link');
		});
	}
	
	$('ul.comments-in-post>li:odd').addClass('odd');
	$('li.comment').removeClass('highlight_new_year highlight_ac3 highlight_comment_level_two');
	$('ul.comments-in-post>li:odd').addClass('odd');
	
	if (sg_settings[20]==1){
		var sg_stripe_counter = $('div.profile-sub-menu ul li:first sup.counter');
		if (sg_stripe_counter.length!=0){
			$('section#sg_top_section_menu a').eq(1).html('Лента <span>' + sg_stripe_counter.text().replace('+','') + '</span>')
		}
	}

	$(document).unbind('ajaxStop');
});

sg_style += "a.sg_post_list_spam_button {display:inline-block; float:left; background:#BAB39E; height:17px; line-height:17px; margin:7px 15px 0 0; padding:0 5px; font-size:10px; color:#fff !important; text-decoration:none;}";
sg_style += "a.sg_spam_button {display:inline-block; background:#BAB39E; height:17px; line-height:17px; margin:0; padding:0 5px; font-size:10px; color:#fff !important; text-decoration:none; position:absolute; right:5px; bottom:5px;}";
sg_style += "div.sg_comment_link {top:70px; display:inline-block; position:absolute; left:23px;}";

/* Дизайн */

/* Верхнее меню */
sg_style += "div#frame header {background:#b7ad93;}";
sg_style += "div#frame header div.wrapper {width:100%}";
$('nav.themes-of-day').detach();
$('nav.alternative-header').detach();
sg_style += "#frame > header .invite {float:right; padding-right:10px}";
$('section.miniprofile').attr("style", "float:right; padding-right:5px;");
$('section.miniprofile div.account').attr("style", "width:auto !important;");
sg_style += "header .main-search {float:left !important;}";
$('section.miniprofile div.up-to').detach();
$('section.miniprofile').append('<div style="float:left; padding:0 5px; width:75px;"><a href="/logout" class="button" id="sg_exit">Выход</a></div>');
var sg_token = $('meta[name="csrf-token"]').attr('content');
$('#sg_exit').live('click', function(){
	$.post('/logout', { _method: "delete", authenticity_token: sg_token }).done(function() {
		location.reload(true);
	});
	return false;
});
$('#q').keyup(function(){
	$('div.main-search-result').css({'margin-left':'0px'});
});
$(document).ajaxComplete(function() {
	$('div.main-search-result').css({'margin-left':'0px'});
});
/* Главное меню */
sg_style += "ul#main-menu {padding:0 5px 25px 15px;}";
sg_style += "ul#main-menu li span.main-menu-item>div ul {padding:0 0 0 3px;}";
sg_style += "ul#main-menu li a:hover {color:#fff !important; text-decoration:underline !important;}";
sg_style += "ul#main-menu li i {background:none;}";
sg_style += "ul#main-menu a {-moz-transition:none !important;}";
sg_style += "div.sub-menu {background:#958b71 !important;}";
/* Меню выбора типа материалов */
$('header.head-with-list').css({"background":"#f0eedf"});
/* Промоблок и уши */
$('.branding-link.runaway').detach();
$('div#gbs-promoblock, div#gbs-promoblock-navi, script[src="http://gbs.gamingmedia.ru/js/promoblock.js"]').detach();
$('div.back-top, div.back-bottom, div.back-center').detach();
/* Лого */
$('div#logo').detach();
$('div.logo-wrapper').detach();
$('div.wrapper>a').detach();
/* Фон страницы */
sg_style += "body, div#frame {background:#000;}";
sg_style += "#farcry {display:none;}";
$('div.under-back, div.under-under, div.under-under-under, div.right-scale, div.left-scale, div.center-top, div.center-bottom, div.comet, div.planet-middle, div.fog-left, div.fog-right, div.clouds, div.old-top, div.old-center, div.old-bottom').detach();
/* Содержимое */
sg_style += "div#main {background:#f0eedf; padding:0;}";
sg_style += "div.block.index {margin:0 !important;}";
sg_style += "#second_part>section>ul>li:first-child>div.tooltip {top:-4px;}";
sg_style += "#frame.index {min-height:0;}";
$('section.gallery-profile').detach();
$('#frame > header .search').css({"margin-left":"10px"});
$('section#posts').css({"width":"auto","padding":"0"});
$('span.inner.closed-tooltip').css({"min-height":"18px"});
$('article.item.in-post').css({"background":"#f0eedf"});
$('article.item.in-post div.top-line').css({"background":"#f0eedf", "margin":"0", "padding":"0"});
$('ul.badges li').css({"float":"right"});
$('div.head-with-list.user-profile.to-posts').css({"width":"auto"});
$('div.info-add-comment').css({"min-height":"16px"});
$('section#comments').css({"background":"#f0eedf","padding":"10px 0"});
sg_style += "#main .block .comm-in-post ul.comments-in-post > li {background:#e0ddce; margin:0; border-bottom:none;}";
sg_style += "#main .block .comm-in-post ul.comments-in-post > li.odd {background:#f0eedf;}";
$('#main .head-post ul.action-post li:first-child').css({"width":"75%"});
$('#main .block .item.comm-in-post ul.action-post').css({"width":"90%"});
sg_style += "#main .block .item.new {padding:0;}";
if ( (sg_settings[15]==1)&&(sg_settings[23]==1)&&(sg_settings[24]==1)&&(sg_settings[25]==1)&&(sg_settings[30]==1)&&($('div#main div.about-content.content').length==0) ){
	sg_style += ".outer-block, .comm-in-post, .interesting, .more-in-blog {width:100% !important;}";
	sg_style += ".in-post {width:100% !important;}";
	sg_style += ".in-post:not(.brilliant):not(.silver):not(.gold) {width:880px !important;}";
}
var sg_tmp_more = $('section.in-detail.game-details');
sg_tmp_more.children('h3').removeClass('active');
sg_tmp_more.children('h3').children('a.plus').html('Показать');
sg_tmp_more.children('ul.details').hide();
/* ЛС */
$('div.search-line.message').css({"margin":"20px 55px 17px 8px"});
/* Подвал */
$('div#under').hide();
$('footer, div#sub').detach();
$('div#first_part').attr("style", "margin:0;");
/* Зебра для постов */
$('li.post-preview:odd').css({"background":"#f0eedf","border":"5px solid #f0eedf"});
$('li.post-preview:even').css({"background":"#e0ddce","border":"5px solid #e0ddce"});

if (sg_settings[15]==1){
	if (sg_settings[20]==1){
		$('nav.top-menu').after("<section id='sg_top_section_menu'><a href='/'><img src='/images/layouts/icon-main.png' /></a> <a href='"+sg_profile_link+"/stripe#posts'>Лента</a> <a href='/users/profile'>Профиль</a> <a href='/users'>Люди</a> <a href='/games'>Игры</a> <a href='/help'>Помощь</a> <a href='#' id='sg_show_large_menu'>Еще</a></section>");
		$('#sg_show_large_menu').on('click', function(){
			$('#large_menu').slideToggle();
			return false;
		});
		$('nav.top-menu').detach();
		sg_style += "section#sg_top_section_menu {float:left; padding-top:9px;}";
		sg_style += "section#sg_top_section_menu a {color:#fff; text-decoration:none; display:inline-block; margin:0 0 0 10px;}";
		sg_style += "section#sg_top_section_menu a span {background:#19AF60; border-color:#19AF60; border-radius:8px; border-style:solid; border-width:1px 5px;}";
	}
	
	if (sg_settings[21]==1){
		$('#large_menu ul:first').detach()
	}
	
	if (sg_settings[22]==1){
		$('div#first_part').detach();
		$('#home_posts section.widgets').detach();
		$('script[src^="http://gbs.gamingmedia.ru/widgets/"]').detach();
	}
	
	if (sg_settings[23]==1){
		$('section.inner.gamazavr').detach();
		$('section.inner.yuplay').detach();
	}
	
	if (sg_settings[24]==1){
		$('section.inner.top-list').detach();
		$('div#top-tabs').parent().detach();
	}
	
	if (sg_settings[25]==1){
		$('a.game-box').parent().detach();
		$('div.main-banner-double').detach();
		$('script[src="http://gbs.gamingmedia.ru/js/gbs.js"]').detach();
	}
	
	if (sg_settings[26]==1){
		$('section.wide.home-center').detach();
	}
	
	if ( (sg_settings[23]==1)&&(sg_settings[24]==1)&&(sg_settings[25]==1) ){
		sg_style += "section.item.without-down {width:100% !important; padding:0 !important;}";
		sg_style += "div#main ul.posts {width:100%; margin:0;}";
	}
	
	if (sg_settings[27]==1){
		$('section.inner.members').detach();
	}
	
	if (sg_settings[28]==1){
		$('section.inner.alternative-games').detach();
	}
	
	if (sg_settings[29]==1){
		$('section.inner.with-top').detach();
	}
	
	if (sg_settings[30]==1){
		$('section.inner.tags').detach();
	}
	
	if ( (sg_settings[23]==1)&&(sg_settings[24]==1)&&(sg_settings[25]==1)&&(sg_settings[30]==1) ){
		$('table.top-list').css({"width":"920px", "margin":"0"});
		$('div.preview-bar').css({"width":"100%"});
	}
	
	if (sg_settings[31]==1){
		$('img.sidebar-croppable-image').detach();
	}
	
	if (sg_settings[32]==1){
		$('section.inner.vk').detach();
		$('div#vk_groups').parent('section').detach();
		$('div.fb-like-box').parent('section').detach();
		$('div#twtr-widget-1').parent('section').detach();
		$('table.list-nets-post').detach();
	}
	
	if (sg_settings[33]==1){
		$('section.interesting').detach();
	}
	
	if (sg_settings[34]==1){
		if (sg_settings[21]==0){
			$('ul#main-menu>li').eq(3).detach();
		}
		$('#frame>header').after('<div class="old-top"></div><div class="old-center"></div><div class="old-bottom"></div>');
		$('div#frame').css({"background":"#192420"});
		sg_style += 'body{color:#5e5531}';
		sg_style += '#frame .old-top{position:absolute; width:100%; top:30px; background:#192420 url(/images/skins/old_gamer/top.jpg) no-repeat 50% 100%; height:1081px;}';
		sg_style += '#frame .old-center{top:1111px; bottom:1304px; position:absolute; width:100%; background:#192420 url(/images/skins/old_gamer/center.jpg) repeat-y 50% 100%;}';
		sg_style += '#frame .old-bottom{position:absolute; width:100%; height:905px; background:#192420 url(/images/skins/old_gamer/bottom.jpg) no-repeat 50% 100%;}';
		$('div#frame>div.wrapper').resize(function(){
			$('#frame>div.wrapper').css({'margin-top':'0'});
			if ( $('#frame').height()<=2017 ){
				$('#frame .old-bottom').hide();
				$('#frame .old-center').height( $('div#frame>div.wrapper').height()-1000 );
				$('#frame>div.wrapper').css({'padding':'120px 0 0'});
			} else {
				$('#frame .old-bottom').show();
				$('#frame .old-bottom').css({'top':($('div#frame>div.wrapper').height()-500) + 'px'});
				$('#frame .old-center').height( $('div#frame>div.wrapper').height()-1000 );
				$('#frame>div.wrapper').css({'padding':'120px 0 340px'});
			}
		});
		
		sg_style += '#main{margin:60px 0 0;}';
		sg_style += '#frame>div.wrapper{width:936px; padding:0 0 340px;}';
		sg_style += '#main-menu{background:none; padding: 15px 5px 10px 15px !important;}';
		sg_style += '#main-menu>li>span>a{font-family:"pfsquaresanspro",Arial,Arial,Helvetica,sans-serif; font-size:24px;}';
		sg_style += '#main-menu>li>span>a:hover{text-decoration:none !important; text-shadow:0px 0px 5px #ffffff;}';
		sg_style += '#main-menu li span.area{font-family:"pfsquaresanspro",Arial,Arial,Helvetica,sans-serif; font-size:24px; text-shadow:0px 0px 5px #fff;}';
		sg_style += '#main-menu li{border:none !important;}';
		sg_style += '#main-menu li>a{border:none !important;}';
		sg_style += '#main-menu>li:first-child{margin-top:-20px;}';
		sg_style += 'div.sub-menu{background:none !important; top:85px !important;}';
		sg_style += 'div.sub-menu a{font-size:11px !important; font-family:"pfsquaresanspro",Arial,Arial,Helvetica,sans-serif;}';
		sg_style += 'div.sub-menu a:hover{text-shadow:0px 0px 5px #fff;}';
		sg_style += 'div.sub-menu span{font-size:11px !important; font-family:"pfsquaresanspro",Arial,Arial,Helvetica,sans-serif; text-shadow:0px 0px 5px #fff;}';
		sg_style += 'span.main-menu-item.home>.go-main{margin:0 !important; width:100px !important; height:50px !important; left:40px !important; background:url(data:;base64,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) no-repeat !important; background-size:contain !important;}';
		$('#frame .wrapper .fake-logo').click(function(){
			window.location.href="/";
		});
	} else {
		setTimeout(function(){ $('div#frame').css({"background":"#000"}); },1000);
	}
	
	if (sg_settings[35]==1){
		$('.main-menu-item.home ul li').each(function(index){
			if ((index==0)||(index==7)||(index==8)){
				$(this).detach();
			}
		});
		$('.main-menu-item.home ul').append('<li><a href="/administration">Блог администрации</a></li><li><a href="/questions">Вопросы и пожелания</a></li>');
	}
	
	if (sg_settings[36]==1){
		$('section.more-in-blog').detach();
	}
} else {
	setTimeout(function(){ $('div#frame').css({"background":"#000"}); },1000);
	$('div#frame>div.wrapper').resize(function(){
		$('#frame>div.wrapper').css({'margin-top':'0'});
	});
}

$('style').detach();
$('head').append("<style>" + sg_style + "</style>");