// ==UserScript==
// @name			Grepolis old 2.0 menu RU
// @namespace      	Quack
// @namespace      	Jestex
// @description   	The old sidemenu instead of the bottom bar
// @description   	Старый вид меню игры
// @description   	Jestex (Цитадель-55, Кси. А также Эпсилон и Гиперборея)
// @include       	http://*.grepolis.*/game*
// @icon           	http://s7.directupload.net/images/120320/ullq32vn.jpg
// @version        	0.2
// ==/UserScript==

var w, uw = w = unsafeWindow || window, $ = w.jQuery;
var gos_rang = uw.menuOptionsDetails[6]["count"];

$('#advisers').after($('\
\
<div id="links">\
	<ul>\
		<li id="link_index">\
			<a href="#townindex">Обзор города</a>\
		</li>\
		<li id="link_messages">\
			<a href="#messages">Сообщения<span id="new_messages" class="no_new_messages"></span></a>\
		</li>\
		<li id="link_report">\
			<a href="#reports">Отчеты<span id="new_reports" class="no_new_messages" style="display:inline-block;background-image: url(http://cdn.grepolis.com/images/game/report/new.png);"></span></a>\
		</li>\
		<li>\
			<a href="#alliance">Союз</a>\
		</li>\
		<li id="link_alliance_forum">\
			<a href="#allianceforum">Форум союза<span id="new_post" class="no_new_post"></span></a>\
		</li>\
		<li>\
			<a href="#settings">Настройки</a>\
		</li>\
		<li>\
			<a id="link_profile" href="#profile">Профиль</a>\
		</li>\
		<li id="link_ranking">\
			<a id="ranking" href="#">Рейтинг <span>['+gos_rang+']</span></a>\
		</li>\
		<li>\
			<a js-data="http://wiki.ru.grepolis.com" href="#help">Помощь</a>\
		</li>\
		<li>\
			<a js-data="http://forum.ru.grepolis.com" href="#forum">Форум игры</a>\
		</li>\
		<li id="premium_link">\
			<a href="#premium">Премиум</a>\
		</li>\
		<li>\
			<a id="chat_link" href="#chat">Чат</a>\
		</li>\
		<li>\
			<a href="#invite_friends">Пригласить друга</a>\
		</li>\
		<li>\
			<a href="#logout">Выход</a>\
		</li>\
	</ul>\
<div id="BTN_mainmenu" class="checkbox_new checked" style="margin-top:4px;line-height:15px;"><div class="cbx_icon"></div><b>Откл. ниж. меню</b></div></div>'));


$("#links")					.css({
    "color":"#FFCC66",
    "background": "url('http://cdn.grepolis.com/images/game/layout/interface_sprite.jpg') no-repeat scroll -161px -131px transparent",
    "height":"286px",
    "padding":"10px 0 0",
    "position":"absolute",
    "text-align":"center",
    "top":"197px",
    "width":"161px"
});
$("#links ul li")			.css({
    "display":"block"
});
$("#links a")				.css({
    "color":"#FFCC66",
    "display":"block",
    "font-size":"13px",
    "line-height":"17px",
    "text-decoration":"none",
});
$("#quest_overview")		.css({
    "height":"153px",
    "left":"174px",
    "position":"absolute",
    "top":"40px",
    "width":"46px"
});
$("#server_time_wrapper")	.css({
    "background-position":"0 -328px",
    "height":"40px",
    "top":"493px"
});
$("#sidebar")				.css({
    "background":"url('http://cdn.grepolis.com/images/game/layout/alpha_sprite_2.33.1.png') repeat scroll -362px 0 transparent",
    "height":"551px",
    "left":"0",
    "position":"absolute",
    "text-align":"left",
    "top":"67px",
    "width":"173px",
    "z-index":"4"
});


$ ("#ranking").click		(function () {
	window.location.href ='javascript:Layout.wnd.Create(Layout.wnd.TYPE_RANKING,"Rangliste").open()';
});
$ ("#link_report").click	(function () {
	$("#new_reports").removeClass("message_icon");
	$("#new_reports").addClass("no_new_messages"); 
});
$ ("#link_messages").click	(function () {
	$("#new_reports").removeClass("message_icon");
	$("#new_reports").addClass("no_new_messages"); 
});
$("#links ul li").hover		(function () {
$(this).css ({
	"background-image":"url('http://s7.directupload.net/images/121217/boihzuri.png')",
	"background-repeat":"no-repeat",
	"background-position":"center"
}); 
}, function () {	
	$(this).css ({"background":"none"}); 
});
$("#BTN_mainmenu").click	(function () {
$(".options_container").toggle();
$(this).toggleClass("checked");
});
$('#BTN_mainmenu').toggle	(function () {
	$(".minimized_windows_area").css({"top":"100px"});
}, function () {
	$(".minimized_windows_area").css({"top":"13px"});
});