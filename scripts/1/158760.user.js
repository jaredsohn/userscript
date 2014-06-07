// ==UserScript==
// @name		Grepolis old 2.0 Menu
// @namespace      	Quack
// @description   	Gives you the old 2.0 sidemenu back
// @include       	http://*.grepolis.*/game*
// @grant       	none
// @icon           	http://s7.directupload.net/images/120320/ullq32vn.jpg
// @version        	0.1
// ==/UserScript==

var w, uw = w = unsafeWindow || window, $ = w.jQuery;

$('#advisers').after($('\
\
<div id="links">\
	<ul>\
		<li id="link_index">\
			<a href="#townindex">Stadtübersicht</a>\
		</li>\
		<li id="link_messages">\
			<a href="#messages">Nachrichten<span id="new_messages" class="no_new_messages"></span></a>\
		</li>\
		<li id="link_report">\
			<a href="#reports">Berichte<span id="new_reports" class="no_new_messages" style="display:inline-block;background-image: url(http://cdn.grepolis.com/images/game/report/new.png);"></span></a>\
		</li>\
		<li>\
			<a href="#alliance">Allianz</a>\
		</li>\
		<li id="link_alliance_forum">\
			<a href="#allianceforum">Allianz-Forum<span id="new_post" class="no_new_post"></span></a>\
		</li>\
		<li>\
			<a href="#settings">Einstellungen</a>\
		</li>\
		<li>\
			<a id="link_profile" href="#profile">Profil</a>\
		</li>\
		<li id="link_ranking">\
			<a id="ranking" href="#">Rangliste</a>\
		</li>\
		<li>\
			<a js-data="http://wiki.de.grepolis.com" href="#help">Hilfe</a>\
		</li>\
		<li>\
			<a js-data="http://forum.de.grepolis.com" href="#forum">Forum</a>\
		</li>\
		<li id="premium_link">\
			<a href="#premium">Premium</a>\
		</li>\
		<li>\
			<a id="chat_link" href="#chat">Chat</a>\
		</li>\
		<li>\
			<a href="#invite_friends">Freunde einladen</a>\
		</li>\
		<li>\
			<a href="#logout">Logout</a>\
		</li>\
	</ul>\
<div id="BTN_mainmenu" class="checkbox_new checked" style="margin-top:4px;line-height:15px;"><div class="cbx_icon"></div><b>Menü anzeigen</b></div></div>'));


$("#links").css({
    "color":"#FFCC66",
    "background": "url('http://cdn.grepolis.com/images/game/layout/interface_sprite.jpg') no-repeat scroll -161px -131px transparent",
    "height":"286px",
    "padding":"10px 0 0",
    "position":"absolute",
    "text-align":"center",
    "top":"197px",
    "width":"161px"
});
$("#links ul li").css({
    "display":"block"
});
$("#links a").css({
    "color":"#FFCC66",
    "display":"block",
    "font-size":"13px",
    "line-height":"17px",
    "text-decoration":"none",
});
$("#quest_overview").css({
    "height":"153px",
    "left":"174px",
    "position":"absolute",
    "top":"40px",
    "width":"46px"
});
$("#server_time_wrapper").css({
    "background-position":"0 -328px",
    "height":"40px",
    "top":"493px"
});
$("#sidebar").css({
    "background":"url('http://cdn.grepolis.com/images/game/layout/alpha_sprite_2.33.1.png') repeat scroll -362px 0 transparent",
    "height":"551px",
    "left":"0",
    "position":"absolute",
    "text-align":"left",
    "top":"67px",
    "width":"173px",
    "z-index":"4"
});


$ ("#ranking").click (function () {
	window.location.href ='javascript:Layout.wnd.Create(Layout.wnd.TYPE_RANKING,"Rangliste").open()';
});
$ ("#link_report").click (function () {
	$("#new_reports").removeClass("message_icon");
	$("#new_reports").addClass("no_new_messages"); 
});
$("#links ul li").hover (function () {
$(this).css ({
		"background-image":"url('http://s7.directupload.net/images/121217/boihzuri.png')",
		"background-repeat":"no-repeat",
		"background-position":"center"
	}); },function () {	$(this).css ({"background":"none"}); });
$("#BTN_mainmenu").click(function(){
$(".options_container").toggle();
$(this).toggleClass("checked");});
$('#BTN_mainmenu').toggle(function () {
	$(".minimized_windows_area").css({"top":"100px"});
}, function () {
	$(".minimized_windows_area").css({"top":"13px"});
});