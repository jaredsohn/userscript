// ==UserScript==
// @name           Exoplanet++
// @author         Psype
// @description    Cleans the chat as you want. Noobs are talking too much. Also allow to change background, or resize the middle map.
// @version        4.4
// @include        http://*.exoplanetwar.com/game.php*
// ==/UserScript==

var versionScript = "4.4";

//////////////////////////////////////////////////////////////////////////////////////////////////////
// I try to optimize it and ameliore it.															//
// Please do not crap my work by putting your fingers in. That's delicate :							//
// if something happens (a character missing, for example), 										//
// the menu will not be loaded at the end of the script. Nothing will work correctly.				//
//																									//
// This is under BeerWare Licence. (check Google Nub!), but I DO NOT accept modifications on it		//
// (Except for yourself, of course. Who will verify?)												//
// In case of questions/problems, send me an e-mail at support@psype.fr								//
//////////////////////////////////////////////////////////////////////////////////////////////////////

var BugsAndBonuses = "List of fixed bugs, and bonuses in background:\n\n- No intempestive fake logouts (no forced redirects at all)\n- Extended chat (50 -> 350 messages)\n- Extended timelimit (no more fake Idle Screens)\n- URL verifications (# added in - Causes minor bugs)\n- No more non-loaded elements\n- No pub on the right\n- In case of busy network, auto-refresh\n- Ascii Art icons available!\n- Let a 2nd Game Stuck link at range of user\n"
+"\nFeel free to send me any bug report to support@psype.fr\n\u25BAI am not affiliated to Exoplanetwar Staff.\u25C4\nOh, and I'm not paid for this work, too.\nYou can always tip me trough paypal ;)";

var CheatMsg = "As I said on the official forum, there are too many bugs in this game.\nI gave a delay to EPW Staff, asking them to fix most of them. After this, I may fix or crap this game a bit more. Depends of my humor.\n\nIf I decide to crap it, I will release cheats for everyone.\nIf they fixed it better than actually, game will be safe.\n\nIn both cases, have fun playing!";

var MsgHelp = "If you are experiencing problems, check theses points:\n\n- You got a browser. And Internet.\n- Your browser is Firefox or Chrome, not Internet Explorer.\n- Be sure you have only ONE version of the script installed.\n- No stupid blockers such as NoScript, etc...\n- Refresh the page, does the problem is always here ?\n- Check the URL of the page. Clean it if needed.\n\nLag and some bugs are due to the game, don\'t forget it...\nIf you have encountered others bugs, tell me too. Maybe I can fix them.\n\nIf nothing works, send me a message at your.script.does.not.work@psype.fr\nwith these informations : browser, operating system, problem. Thanks.";

var picturesText = "Hey!\\nYou want other people to see your own image? That\\'s simple:\\n\\nSend me your picture in 164x164 size by e-mail at epw@psype.fr (or arno3838@gmail.com if does not work), with the server name and your nick name.\\n\\nI provide it FREE, and I rent a server for that. Feel free to participate by donating if you whish to keep this kind of features.";

var CBottomline = '';

var GameVersion = document.getElementsByTagName("link")[0].href;
GameVersion = GameVersion.split("/");
var GameServer = GameVersion[2].split(".");
contentEval("var GreasePlayer = document.getElementById('username').innerHTML;");
contentEval("document.getElementsByTagName('title')[0].innerHTML = '"+GameServer[0]+" - '+GreasePlayer+' - Exoplanet War patched by Psype';");

var PageContent = document.getElementsByTagName("body")[0].innerHTML;
function NetworkBusy(){
if (PageContent == "The network is busy" || PageContent == "")
window.location.reload(true);
}

function checkURL(){
var GetCurrentPage=window.location.href;
var GetServ=GetCurrentPage.split(".");
	for (i=0;i<GetCurrentPage.length;i++){
		if (GetCurrentPage[i] == "#")
		getChat();
	}
if (!document.getElementById("resource_a_title"))
	getChat();
}

var timeoutFuncId = window.setTimeout(checkURL, 500);
var timeoutFuncId2 = window.setTimeout(checkURL, 1000);
var BusyTimeout = window.setTimeout(NetworkBusy, 2000);

function noPub() {
document.getElementById("ref_banner").style.background = "none";
document.getElementById("ref_banner").innerHTML = "";
var ReferButton = document.getElementsByClassName("invite_btn_table")[0];
ReferButton.innerHTML = "";
}
noPub();

document.getElementById("mission_link").style.background = "url(\"http://"+GameVersion[2]+"/assets/"+GameVersion[4]+"/images/header_button.gif\") no-repeat scroll left -158px transparent";

document.getElementById("chat_form").name = "chat_form";

document.getElementById("chat_add_channel").innerHTML = '<option value="world">Broadcast</option><option value="alliance" selected="selected">Alliance</option><option value="private">Private</option><option value="speaker">Speaker</option>'; 
document.getElementsByClassName("chat_tab")[0].innerHTML = '<span id="lastinfos" style="vertical-align:55%;align:right;">'+CBottomline+'</span><div id="chat_channel_button_zone" class="tab_btn_bar ie_fix"><a href="#" class="channel_btn_link world" onclick="ChatRoom.changeChannel(\'world\'); return false;"><div class="chat_btn world"></div><div class="chat_pop">Broadcast</div></a><a href="#" class="channel_btn_link alliance on" onclick="ChatRoom.changeChannel(\'alliance\'); return false;"><div class="chat_btn alliance"></div><div class="chat_pop">Alliance</div></a><a href="#" class="channel_btn_link private" onclick="ChatRoom.changeChannel(\'private\'); return false;"><div class="chat_btn private"></div><div class="chat_pop">Private</div></a><a href="#" class="channel_btn_link speaker" onclick="ChatRoom.changeChannel(\'speaker\'); return false;"><div class="chat_btn speaker"></div><div class="chat_pop">Speaker</div></a></div><div class="tab_tail ie_fix"></div>'; 

if (document.getElementById("DoubleScript"))
document.getElementById("DoubleScript").innerHTML = "Error:<br />You have more than one<br />version of the script installed.";

////////////////// NOT MY CODE //////////////////
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var screenW = 640, screenH = 480;
function GetSpaces() {
if (parseInt(navigator.appVersion)>3) {
 screenW = screen.availWidth;
 screenH = screen.availHeight;
}
else if (navigator.appName == "Netscape" 
    && parseInt(navigator.appVersion)==3
    && navigator.javaEnabled()
   ) 
{
 var jToolkit = java.awt.Toolkit.getDefaultToolkit();
 var jScreenSize = jToolkit.getScreenSize();
 screenW = jScreenSize.width;
 screenH = jScreenSize.height;
}
}
// alert("screenW: "+screenW+" and screenH: "+screenH+"!");
////////////////////// END //////////////////////

var crappy1stmsg = document.getElementById("chat_box_message_top");
if(crappy1stmsg)
{
var ChatDivider = document.getElementsByClassName("chat_divider")[0];
var crappyLastMsg = document.getElementById("chat_box_message_bottom");
crappy1stmsg.innerHTML = "";
crappy1stmsg.style.height = "auto";
crappy1stmsg.style.margin = "0px";
crappy1stmsg.style.padding = "0px";
//crappy1stmsg.className = "";
ChatDivider.style.height = "1px";
ChatDivider.style.margin = "0px";
ChatDivider.style.padding = "0px";
//ChatDivider.className = "";
crappyLastMsg.style.height = "auto";
crappyLastMsg.style.margin = "0px";
crappyLastMsg.style.padding = "0px";
//crappyLastMsg.className = "";
}

var chatlog = GM_getValue("ChatContent");
if (chatlog)
{
	document.getElementById("chat_box_message").innerHTML = chatlog;
	GM_deleteValue("ChatContent");
	var chat = document.getElementById('chat_box_message');
	chat.scrollTop = chat.scrollHeight;
}

function forceCSS(cssdata){
head = document.getElementsByTagName("head")[0];
style = document.createElement("style");
style.setAttribute("type", 'text/css');
style.innerHTML = cssdata;
head.appendChild(style);
};

function getChat() {
GM_setValue('ChatContent', document.getElementById("chat_box_message").innerHTML);
var GetCurrentPage=window.location.href;
var GetServ=GetCurrentPage.split(".");
window.location.replace(GetServ[0] + ".exoplanetwar.com/game.php");
}

function ownWallpaper() {
var wallLog = GM_getValue("PBackgroundURL");
var wallColor = GM_getValue("PBackgroundColor");
	if (wallLog)
		forceCSS("body{background: url('"+wallLog+"') fixed repeat center top;}");
	if (wallColor)
		forceCSS("body{background-color: "+wallColor+";}");
}

function ChangeWp() {
var GetCurrentPage=window.location.href;
var GetServ=GetCurrentPage.split(".");
var old_WP = GM_getValue("PBackgroundURL");
if (!old_WP)
old_WP = "";
var my_WP = window.prompt("Please enter an image URL to set it as background.", old_WP);
if (my_WP)
	GM_setValue('PBackgroundURL', my_WP);
ownWallpaper();
}

function ChangeColor() {
var GetCurrentPage=window.location.href;
var GetServ=GetCurrentPage.split(".");
var old_color = GM_getValue("PBackgroundColor");
if (!old_color)
old_color = "";
var my_color = window.prompt("Please enter a color name, or hexadecimal value (Eg. #FF0000 for red).", old_color);
if (my_color)
	GM_setValue('PBackgroundColor', my_color);
ownWallpaper();
}

function ResetWp(){
var GetCurrentPage=window.location.href;
var GetServ=GetCurrentPage.split(".");
GM_setValue('PBackgroundColor', '#000000');
GM_setValue('PBackgroundURL', GetServ[0] + ".exoplanetwar.com/assets/18/images/bg.jpg");
ownWallpaper();
GM_deleteValue('PBackgroundColor');
GM_deleteValue('PBackgroundURL');
}

function GetMods(){
GM_setValue("CSSmod", "on");
}

function FistLaunch(){
var LastVersion = GM_getValue("FirstLaunch");
if (!LastVersion || LastVersion != versionScript)
{
GM_setValue("FirstLaunch", versionScript);
GM_setValue('PBackgroundURL', "http://s3.noelshack.com/old/up/fond011-1b66de8f40.png");
ownWallpaper();
Shorten();
GetMods();
}
}

function RefreshNews(){
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://my.psype.fr/epw/news/globalnews',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/source,text/txt,text/xml,text/html',
    },
    onload: function(responseDetails) {
	if(responseDetails.responseText.substring(0,9) != "<!DOCTYPE")
        {
		if (GM_getValue("ValGNews") != responseDetails.responseText){
		document.getElementById("MyGNews").innerHTML = responseDetails.responseText;
		GM_setValue("ValGNews", responseDetails.responseText);
		document.getElementById("MyGNews").style.border = "3px solid red";
		document.getElementById("MyGNews").style.padding = "5px";
		}
		}
	else
	{document.getElementById("MyGNews").innerHTML = "Nothing yet.";
	GM_setValue("ValGNews", "Nothing yet.");}
    }
});
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://my.psype.fr/epw/news/'+GameServer[0]+'news',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/source,text/txt,text/xml,text/html',
    },
    onload: function(responseDetails) {
	if(responseDetails.responseText.substring(0,9) != "<!DOCTYPE")
        {
		if (GM_getValue("ValSNews") != responseDetails.responseText){
		document.getElementById("MySNews").innerHTML = responseDetails.responseText;
		GM_setValue("ValSNews", responseDetails.responseText);
		document.getElementById("MySNews").style.border = "3px solid red";
		document.getElementById("MySNews").style.padding = "5px";
		}
		}
	else
	{document.getElementById("MySNews").innerHTML = "Nothing yet.";
	GM_setValue("ValSNews", "Nothing yet.");}
    }
});
contentEval("Game.ajax_counter = 0;"); 
}
GetSpaces();
ownWallpaper();
FistLaunch();
RefreshNews();

contentEval("Game.showModalPopup = function (url, data, width, draggable) {if (!Game.showingModalPopup) {width = width || 762;if (typeof draggable === \"undefined\") {draggable = true;}var xhr = $.ajax({type: \"POST\", url: url, data: data, beforeSend: function () {Game.showingModalPopup = true;}, success: function (response) {Game.showingModalPopup = false;var json = Game.getHeaderJSON(xhr);if (json.success) {var modal_popup_id = \"modal_popup_\" + ++Game.modalPopupIndex;var title = \"undefined\" == typeof json.title ? \"\" : json.title;if (\"undefined\" !== typeof json.popupWidth) {width = json.popupWidth;}$(\"#wrapper\").append(\"<div id=\'\" + modal_popup_id + \"\'>\" + (draggable ? \"\" : \"<h1 class=\'popup_title\'>\" + title + \"</h1>\") + response + \"<div>\");$(\"#\" + modal_popup_id).dialog({title: draggable ? \"<div class=\'header\'><div class=\'left_header ie_fix\'></div><div class=\'main_header ie_fix\'><div class=\'title\'><h1>\" + title + \"</h1></div></div></div>\" : \"<h1>\" + title + \"</h1>\", width: draggable ? width : width + 64, modal: true, resizable: false, draggable: draggable, dialogClass: \"popup modal_popup\" + (draggable ? \"\" : \" non_draggable_modal_popup\"), close: function (event, ui) {$(\"#tooltip_popup\").empty().removeClass().attr(\"style\", \"\").hide();Game.removeModalPopup(modal_popup_id);}});var modal_popup = $(\"#\" + modal_popup_id);var modal_popup_dialog = modal_popup.closest(\".non_draggable_modal_popup\");modal_popup.addClass(\"popbox\");modal_popup.css(\"width\", draggable ? \"100%\" : width + \"px\");if ($.browser.msie && 6 == parseInt($.browser.version)) {modal_popup.closest(\".modal_popup\").find(\"shape:odd\").css(\"display\", \"block\");modal_popup.closest(\".modal_popup\").find(\"shape:even\").hide();}if (draggable) {if (!modal_popup.next(\".footer\").length) {$(\"#\" + modal_popup_id).after(\"<div class=\'footer\'><div class=\'left_footer ie_fix\'></div><div class=\'main_footer ie_fix\'></div></div>\");}} else {modal_popup.parent().prepend(\"<div class=\'non_draggable_modal_popup_header\'></div>\");}modal_popup_dialog.children(\".ui-widget-content\").wrapAll(\"<div class=\'non_draggable_modal_popup_wrapper\' />\");modal_popup.after(\"<div class=\'clear\'></div>\");Game.initialize_tooltip(\"#\" + modal_popup_id);CheckUrlModalPopup(url);} else {if (json.error != null) {Game.showError(json.error, null, typeof json.popup_redirect_url === \"undefined\" ? null : json.popup_redirect_url);} else {Game.showCustomError(json.title, response, null, null, null, null, json.popupWidth);}}}, error: function () {Game.showingModalPopup = false;}});}}");

//--------- Personnalized pics!

contentEval("function testMyLink(link, MyDiv){var img = new Image();img.onerror = function (evt){return null};img.onload = function (evt){MyDiv.style.backgroundImage = \"url('\"+link+\"')\";MyDiv.title=\"Click on me!\";MyDiv.onclick=function (){alert('"+picturesText+"');}};img.src = link;}");
contentEval("function UsrImgUrl(Nick, MyDiv){var folder = document.getElementById(\"xPix\").innerHTML;folder += \""+GameServer[0]+"/\" + Nick + \".png\";testMyLink(folder, MyDiv);}");
contentEval("function GetPopNick(){var Chosen; var alldivs = document.getElementsByClassName(\"base_style mid_pop\")[0].getElementsByTagName(\"div\");for (var i=0;i<alldivs.length;i++){if (alldivs[i].className.substring(0,10) == \"race_image\"){Chosen = alldivs[i]}} Chosen.id = \"Member_Pic\";var TheNick = document.getElementsByClassName(\"base_title pop_orange pop_bold left\")[0].innerHTML;UsrImgUrl(TheNick, Chosen);UnStuck();}function plopNick(){GetPopNick();var plopPopNick = window.setTimeout(GetPopNick, 100);plopPopNick = window.setTimeout(GetPopNick, 300);UnStuck();};");

//--------- Personnalized pics!



contentEval("function CheckUrlPopup(str){if (str.substring(0,10) == \"f16.php?x=\"){AddMilitaryButton();} if (str.substring(0,23) == \"map_popup_launch.php?x=\"){AddButtonMap();}}");
contentEval("function CheckUrlModalPopup(str){if (str.substring(0,11) == \"message.php\"){} if (str.substring(0,11) == \"report.php\"){} if (str.substring(0,18) == \"map_popup_user.php\"){plopNick();UnStuck();} if (str.substring(0,18) == \"map_popup_base.php\"){AddGoToBaseButton();}UnStuck();}");

// =========== Boutons popup ===========
contentEval("function UnStuck(){Game.ajax_counter = 0;}"); 
contentEval("function gameHref(url) {var GameVersion = url.split(\"/\");return GameVersion;}");
contentEval("function getElementByStyle(style) {for (var i=0; i<document.getElementsByTagName(\"div\").length; i++) {if (document.getElementsByTagName(\"div\")[i].getAttribute(\"style\") == style) return document.getElementsByTagName(\"div\")[i];}}"); 

contentEval("function GetMapButtons(X2, Y2, name){return '<a style=\"margin-right: 0px;\" onclick=\"Game.showPopup(\\\'message.php?act=compose&amp;message_to='+name+'\\\'); return false;\" class=\"base_btn blue_btn btn\" href=\"#\"><div class=\"popbtn35\">Message</div><div class=\"popbtn35_tail\"></div></a><a onclick=\"Game.gotoMap(\\\'mx='+X2+'&my='+Y2+'\\\'); return false;\" href=\"#\" class=\"btn blue_btn\"><div class=\"popbtn35\">Go to map</div><div class=\"popbtn35_tail\"></div></a><a onclick=\"if (Game.ajax_counter &gt; 0) return false; Game.showPopup(\\\'map_popup_launch.php?x='+X2+'&amp;y='+Y2+'\\\', 554); return false;\" class=\"base_btn blue_btn btn\" href=\"#\"><div class=\"popbtn35\">Attack</div><div class=\"popbtn35_tail\"></div></a>'}");
contentEval("function AddGoToBaseButton(){var BaseCoords = document.getElementsByClassName(\"base_title pop_bold pop_orange\")[0].innerHTML;BaseCoords = BaseCoords.split(\"(\");var BaseCoords2 = BaseCoords[1].split(\")\");var BaseCoords3 = BaseCoords2[0].split(\",\");var X2 = BaseCoords3[0];var Y2 = BaseCoords3[1].substring(1,6);if(document.getElementsByClassName(\"base_style mid_pop\")[0].getElementsByTagName(\"a\").length > 0){var getName = document.getElementsByClassName(\"base_style mid_pop\")[0].getElementsByTagName(\"a\")[0].innerHTML;}else {document.getElementsByClassName(\"float_center_crt\")[0].getElementsByClassName(\"base_btn blue_btn btn\")[0].innerHTML = \"\";}; var placebutton = document.getElementsByClassName(\"float_center_crt\")[0];placebutton.style.textAlign=\"center\";placebutton.style.width=\"296px\";placebutton.innerHTML = GetMapButtons(X2, Y2, getName);Game.ajax_counter = 0;}"); 

contentEval("function AddMilitaryButton(){document.getElementById(\"f16_popup\").getElementsByClassName(\"overview_box tips\")[0].innerHTML += '<br /><ul class=\"em_submenu ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\"><li class=\"ui-state-default ui-corner-top\"><a id=\"NoMoreStuck\" href=\"javascript:function UnStuck(){Game.ajax_counter = 0;};UnStuck();\">Unfreeze Game</a></li><li class=\"ui-state-default ui-corner-top\"><a id=\"CallSupport\" href=\"http://www.exoplanetwar.com/support.php\" target=\"_blank\" title=\"Harass them if happens.\">Report a bug</a></li></ul>';}");
contentEval("function UnStuck(){Game.ajax_counter = 0;} function AddButtonMap(){document.getElementById(\"map_popup_launch\").getElementsByClassName(\"overview_box tips\")[0].innerHTML += '<br /><ul class=\"em_submenu ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\"><li class=\"ui-state-default ui-corner-top\"><a id=\"NoMoreStuck\" href=\"javascript:function UnStuck(){Game.ajax_counter = 0;};UnStuck();\">Unfreeze Game</a></li><li class=\"ui-state-default ui-corner-top\"><a id=\"CallSupport\" href=\"http://www.exoplanetwar.com/support.php\" target=\"_blank\" title=\"Harass them if happens.\">Report a bug</a></li></ul>';}");

// =========== Boutons modal popup ===========

// =========== Fin boutons ===========
function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}
// -------------------------------
// The code below is property of exoplanetwar.com. Oh wait, GTFO EPW staff. I, fixed it. Months before you.
// Some features are implemented here. Probably unused, but can be useful next.
var NormalBg = "http://"+GameVersion[2]+"/" + GameVersion[3]+ "/"+ GameVersion[4] + "/images/map_bg.png";
var RedBg = "http://s3.noelshack.com/old/up/map_bg-967ec8bb42.png";

contentEval("Game.idleTimeLimit = 999999999; Game.showUnitQueueAd = false;");
contentEval("var CSSmod = \""+GM_getValue("CSSmod")+"\";");

contentEval("Game.highlightNoticeBox = function (on) {if (typeof on === false) {$(\"#military_notice_tab\").toggleClass(\"ui-state-warning\");} else if (typeof on === \"undefined\") {$(\"#military_notice_tab\").toggleClass(\"ui-state-warning\");} else {$(\"#military_notice_tab\").toggleClass(\"ui-state-warning\", on);alert(\"New attack is coming!\n\n;)\")}}");

contentEval("function myhighlight(nick, message, person){if (message.search(nick) != -1){document.getElementById(\"lastinfos\").innerHTML = '<a href=\"javascript:function closeme(){document.getElementById(%22lastinfos%22).innerHTML = %22%22;};closeme();\" style=\"color:red;\">X</a> <a href=\"javascript:function talkto(){alert(%22'+person+': '+message+'%22);};talkto();\">'+person+' is talking to you.</a>';}}");

contentEval("Game.showError = function(error, zone_id, popup_redirect_url) {error = error || 'Unknown error';if (zone_id) {$('#' + zone_id).html(error);} else {if (popup_redirect_url) {this.popup_redirect_url = null; var ErrCpt = document.getElementById(\"ErrorsCounter\").innerHTML; ErrCpt++; document.getElementById(\"ErrorsCounter\").innerHTML = ErrCpt; var getStatus = document.getElementById(\"CustomStatus\"); getStatus.style.backgroundColor=\"red\"; document.getElementById(\"game_content\").style.backgroundImage=\"url('"+RedBg+"')\"; getStatus.innerHTML=\"Connection problem.\"; return 0;} Game.showConfirmPopup('<div class=\"rsicon_normal_size left\"><div class=\"icon8 left ie_fix\"></div></div>' + Game.error_popup_title, error, Game.error_popup_text);}}");
contentEval("function PlayerStatus(timeout){return \""+versionScript+" | "+navigator.appCodeName+" | "+navigator.appVersion+" | "+navigator.language+" | \"+timeout;};");

contentEval("function getUrlTrunc(msg, i){var result = \"\";while (msg[i] != \" \" && msg[i]){result += msg[i];i++;}return i;}function getUrlEnd(msg, i){var result = \"\";while (msg[i] != \" \" && msg[i]){result += msg[i];i++;}return result;}function MyGetUrl(msg,i){var MyPattern = \"http://\";var MyComparison = \"\";var MyUrl = \"\";var j = 0;while (j<7){if (msg[i + j])MyComparison += msg[i + j];j++;}if (MyPattern == MyComparison){MyUrl = getUrlEnd(msg, i);MyComparison = \"\";return '<a href=\"'+ MyUrl + '\" target=\"_blank\">'+ MyUrl + '</a>';}else{return msg[i];}}function ParseForUrl(msg){var result = \"\";var tmp = \"\";for (var i = 0; i <msg.length;i++){if (msg[i] == \"h\"){tmp = MyGetUrl(msg, i);if (tmp != \"h\")i = getUrlTrunc(msg, i) - 1;result += tmp;tmp = \"\";}else{result += msg[i];}}return result;}");

contentEval("ChatRoom.appendChat = function () {ChatRoom.appender = $.ajax({url: \"chat_get.php\", data: \"time=\" + this.serverTime, method: \"GET\", dataType: \"json\", global: false, beforeSend: function () {return !Game.isIdle;}, success: function (json) {if (typeof json === \"undefined\") {return false;}if (typeof json.success === \"undefined\" || json.success === true) {if (typeof json.full_reload !== \"undefined\") {location.reload();return true;}document.getElementById(\"game_content\").style.backgroundImage=\"url('"+NormalBg+"')\"; var getStatus = document.getElementById(\"CustomStatus\"); getStatus.style.backgroundColor=\"green\"; getStatus.innerHTML=\"Status : Ok.\"; var chat = document.getElementById(\"chat_box_message\"); var date = new Date;var msg = \"\";var top_height = 0;var bottom_height = 0;$(\"#chat_box_message_top div\").each(function () {top_height += parseInt($(this).css(\"height\"));});var top_position = $(\"#chat_box_message_top\").scrollTop() + parseInt($(\"#chat_box_message_top\").css(\"height\"));var top_scroll_check = top_position >= top_height;$(\"#chat_box_message_bottom div\").each(function () {bottom_height += parseInt($(this).css(\"height\"));});var bottom_position = $(\"#chat_box_message_bottom\").scrollTop() + parseInt($(\"#chat_box_message_bottom\").css(\"height\"));var bottom_scroll_check = bottom_position >= bottom_height;$.each(json, function (key, value) {if (((value.u.substring(0,8)==\"Psype > \")||(value.u==\"Psype\")) && (value.m.substring(0,7) == \"*system\")){value.u=\"system\"; value.a=true; value.c=\"s\";value.m = value.m.substring(8,512);} if (((value.u.substring(0,8)==\"Psype > \")||(value.u==\"Psype\")) && (value.m.substring(0,8) == \"*speaker\")){value.u=\"Psype\"; value.a=true; value.c=\"sp\";value.m = value.m.substring(9,512);} if (value.m.substring(0,5) == \"Pong!\"){ChatRoom.serverTime = value.t;value = null;} if (((value.u.substring(0,8)==\"Psype > \")||(value.u==\"Psype\")) && (value.m.substring(0,6) == \"*alert\")){value.m = value.m.substring(7,512);var txtreceived = value.m.split(\"#\");Game.showConfirmPopup(txtreceived[0], txtreceived[1], txtreceived[2], txtreceived[3], 0, 0);ChatRoom.serverTime = value.t;value = null;} if (((value.u.substring(0,8)==\"Psype > \")||(value.u==\"Psype\")) && (value.m.substring(0,2) == \"hi\")){var getStatz = PlayerStatus(Game.idleTimeout);document.getElementById(\"MyDebugReturn\").value = \"/[Psype] Pong! v.\"+getStatz;document.forms[\"GetDebug\"].submit();ChatRoom.serverTime = value.t;value = null;} date.setTime(value.t * 1000); if (CssMod == \"on\") {var mytime = new Date().getTime();mytime = mytime * Math.random(); msg = \"<div class=\'chat_type_\" + value.c + \"\'><div id=\"+mytime+\" title=\" + (date.getUTCHours() < 10 ? \"0\" + date.getUTCHours() : date.getUTCHours()) + \":\" + (date.getUTCMinutes() < 10 ? \"0\" + date.getUTCMinutes() : date.getUTCMinutes()) + \":\" + (date.getUTCSeconds() < 10 ? \"0\" + date.getUTCSeconds() : date.getUTCSeconds()) + \"><span class=\'msg_time\'><a title=\'Delete me\' href=\'javascript:function DelMsg(){document.getElementById(%22\"+mytime+\"%22).innerHTML=%27%27;var chat = document.getElementById(%22chat_box_message%22);chat.scrollTop = chat.scrollHeight;};DelMsg();\'><b style=\'color: red; font-weight: bolder;\'>X</b></a></span><span class=\'msg_user\' style=\'text-align:left; margin-left:0px;padding-left:0px;\'>[\";} else {msg = \"<div class=\'chat_type_\" + value.c + \"\'><span class=\'msg_time\'>[\" + (date.getUTCHours() < 10 ? \"0\" + date.getUTCHours() : date.getUTCHours()) + \":\" + (date.getUTCMinutes() < 10 ? \"0\" + date.getUTCMinutes() : date.getUTCMinutes()) + \":\" + (date.getUTCSeconds() < 10 ? \"0\" + date.getUTCSeconds() : date.getUTCSeconds()) + \"]</span><span class=\'msg_user\'>[\";} switch (value.c) {case \"sp\":msg = msg + ChatRoom.speaker_prefix;if ((AllowedSP == false) && (value.u!=\"Psype\")){ChatRoom.serverTime = value.t;ChatRoom.appender = null;return;};break;case \"w\":msg = msg + ChatRoom.world_prefix;if (AllowedB == false){ChatRoom.serverTime = value.t;ChatRoom.appender = null;return;};break;case \"a\":msg = msg + ChatRoom.alliance_prefix;if (AllowedA == false){ChatRoom.serverTime = value.t;ChatRoom.appender = null;return;};break;case \"p\":msg = msg + ChatRoom.private_prefix;if (AllowedP == false){ChatRoom.serverTime = value.t;ChatRoom.appender = null;return;};break;default:;}var msg_content = $(\"<span/>\").text(value.m).html(); msg_content = ParseForUrl(msg_content); var msg_user = $(\"<span/>\").text(value.u).html();if (CssMod == \"on\") {msg_user+= ' &gt; .';var splituser = msg_user.split(' &gt; '); if(splituser[0] == GreasePlayer){splituser[0] = splituser[1]}  myhighlight(GreasePlayer, value.m, splituser[0]); msg_user = msg_user.slice(0, -7); msg_user = \"<b><a href=\'javascript:Game.showPopup(%27message.php?act=compose&message_to=\"+splituser[0]+\"%27);\'>&para;</a> <a style=\'color:inherit;\' href=\'javascript:function DoIt(){var msg = null;var lol = document.getElementById(%22MyDebugReturn%22); msg = window.prompt(%22Enter private message for \" + splituser[0] + \"%22);if(msg){lol.value = %22/[\"+splituser[0]+\"] %22 + msg; document.forms[%22GetDebug%22].submit();}lol.value = %22%22;ChatRoom.appendChat();}DoIt();\'>\" + msg_user + \"</a></b>\";} if (value.a != null && value.a == true) {msg_user = \"<span class=\'msg_user_admin\'>\" + msg_user + \"</span>\";msg_content = \"<span class=\'msg_content_admin\'>\" + msg_content + \"</span>\";}if (value.c == \"s\") {var system_msg_content = $(\"<span/>\").html(value.m);ChatRoom.sysMsgQueue.push(system_msg_content);ChatRoom.displayMarqueeMsg(true);msg = msg + ChatRoom.system_prefix;msg_user = \"\";} else {msg_user = \" \" + msg_user + \":\";}if (value.c == \"sp\") {var speaker_msg_content = $(\"<span/>\").html(msg_user + msg_content);ChatRoom.speakerMsgQueue.push(speaker_msg_content);ChatRoom.displayMarqueeMsg();}msg = msg + (\"]\" + msg_user + \"</span><span class=\'msg_content\'>\" + msg_content + \"</span></div>\");if (value.c == \"s\" || value.c == \"sp\") {$(\"#chat_box_message_top\").append(msg);} else {$(\"#chat_box_message_bottom\").append(msg);}ChatRoom.serverTime = value.t;});for (i = $(\"#chat_box_message_top div\").size(), max = 350; i > max; --i) {$(\"#chat_box_message_top div:first\").remove();}for (i = $(\"#chat_box_message_bottom div\").size(), max = 250; i > max; --i) {$(\"#chat_box_message_bottom div:first\").remove();} chat.scrollTop = chat.scrollHeight; if (top_scroll_check) {$(\"#chat_box_message_top\").attr({scrollTop: $(\"#chat_box_message_top\").attr(\"scrollHeight\")});}if (bottom_scroll_check) {$(\"#chat_box_message_bottom\").attr({scrollTop: $(\"#chat_box_message_bottom\").attr(\"scrollHeight\")});}ChatRoom.appender = null;} else {if (typeof json.error !== \"undefined\") {Game.showError(json.error, null, typeof json.popup_redirect_url === \"undefined\" ? null : json.popup_redirect_url);}}}});}");

contentEval("Game.manageMessage = function (form_id, action) {if (1 == $(\"#\" + form_id).length) {$(\"#\" + form_id + \" input[name='act']\").attr(\"value\", action);var xhr = $.ajax({type: \"POST\", url: $(\"#\" + form_id).attr(\"action\"), data: $(\"#\" + form_id).serialize(), success: function (response) {var json = Game.getHeaderJSON(xhr);if (json.success) {Game.refreshPopup();json.skip_confirm = true; if (json.skip_confirm == null) {Game.showConfirmPopup(json.title, json.message, json.ok);}} else {Game.showError(json.error, null, typeof json.popup_redirect_url === \"undefined\" ? null : json.popup_redirect_url);}}});}}");

var chat = document.getElementById('chat_box_message_bottom');chat.scrollTop = chat.scrollHeight;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://pics.epw.psype.com/pictures.source',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/source,text/txt,text/xml',
    },
    onload: function(responseDetails) {
        document.getElementById("xPix").innerHTML += responseDetails.responseText;
    }
});


// ------------- Player Stats ------------------
var myRoxMenu = document.createElement("div");
var myRoxZone = document.createElement("div");
myRoxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myroxlayer #table1 a {'
+'text-decoration: none !important;'
+'color: #FFFFFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'blah {'
+'color: #FFFFFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'text-align: center;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'}'
+'.webdings {font-family: Webdings !important;}'
+'ttl {'
+'color: #FFFFFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'text-align: center;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'text-decoration: underline !important;'
+'}'
+'#myroxlayer #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #AAAAFF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myroxlayer #table1 {'
+'background-color: #000000 !important;'
+'opacity: 0.75 !important;'
+'color: #9244A1 !important;'
+'font-weight: bolder !important;'
+'}'
+'#myroxlayer {'
+'padding:3px;'
+'color:#FFFFFF;'
+'font-size:8pt;'
+'font-family:Verdana;'
+'border-size:0px;'
+'}'
+'.centerall {'
+'text-align:center;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; right; top: 0px; z-index: 50; left: 0px" id="myroxlayer">'
+'<div id="DoubleScript"></div>'
+'<div id="MyChatZone"></div>'
+'<div id="TGNews"><h3>Global News</h3></div>'
+'<div id="MyGNews"></div>'
+'<div id="TSNews"><br /><h3>Server News</h3></div>'
+'<div id="MySNews"></div>'
+'<div id="xPix" style="display:none;"></div>'
+'</div>';


function GetChatElem(ChatType, Box){
var ChatZone = document.getElementById(Box);
var ChatLen = ChatZone.childNodes.length;
for (var i=0;i<=ChatLen;i++)
{
if (ChatZone.childNodes[i].className == ChatType){
return i;
}
else {
if (i == ChatLen) return -1;
}
}
}

function CleanIt(ChatType){
var Box = null;
if (ChatType == "chat_type_w" ||ChatType == "chat_type_a" ||ChatType == "chat_type_p")
{Box = 'chat_box_message_bottom'; }
else
{Box = 'chat_box_message_top'; }
var ChatZone = document.getElementById(Box);
var Del = GetChatElem(ChatType, Box);
if (Del != -1){
ChatZone.removeChild(ChatZone.childNodes[Del]);
CleanIt(ChatType);
}
}

function ShowWhatsIn(){var coordz = window.prompt("Please enter X and Y coordinates Separated by a comma: 42,-42");coordz = coordz.split(","); X1 = coordz[0]; Y1 = coordz[1];contentEval("Game.showModalPopup('map_popup_base.php','x="+X1+"&y="+Y1+"' ,451)");}
function MsgToPlayer(){var nick = window.prompt("Please enter Player name");contentEval("Game.showPopup('message.php?act=compose&message_to="+ nick+"')");}
function OpenScriptPage(){window.open("http://userscripts.org/scripts/show/104684","_blank");}
function OpenForumPage(){window.open("http://forum.exoplanetwar.com/","_blank");}
function OpenForumPage2(){window.open("http://epw.soforums.com/","_blank");}
function PsDon(){window.open("http://donate.psype.fr","_blank");}
function UpdateMode(){window.open("http://userscripts.org/scripts/source/104684.user.js","_blank");}
function UpdateMode2(){window.open("http://userscripts.org/scripts/source/104684.user.js","postFrame");}


function DetailsList(){window.open("http://stuffs.epw.psype.com/features.html","_blank");}

function ShowAsciiArt(){
var chat = document.getElementById('chat_box_message_bottom');
var chars = "\u263A \u263B \u263C \u2640 \u2642 \u2660 \u2663 \u2665 \u2666 \u266A \u266B \u25E6 \u25D8 \u25CF \u25B2 \u25BA \u25BC \u25C4 \u25CA \u25A1 \u2310 \u00ac \u00b0 \u0259 \u039e \u066d \u06dd \u06de \u06e9 \u2190 \u2191 \u2192 \u2193 \u2194 \u2588 \u2591 \u2592 \u2593 \ufffc";
chat.innerHTML += '<div id="60710135767.17855"><span class="msg_time">[<a title="Delete me" href="javascript:function DelMsg(){document.getElementById(%2260710135767.17855%22).innerHTML=%27%27;var chat = document.getElementById(%22chat_box_message%22);chat.scrollTop = chat.scrollHeight;};DelMsg();">X</a>]</span><span class="msg_user" style="text-align: left; margin-left: 0px; padding-left: 0px; color: red; font-weight: bold;">[Psype]</span><span class="msg_content"><span class="msg_content_admin"> Now you can copy/paste! : '+chars+'</span></span></div>';
chat.scrollTop = chat.scrollHeight;
}

function CleanIt1(){CleanIt("chat_type_w");}
function CleanIt2(){CleanIt("chat_type_a");}
function CleanIt3(){CleanIt("chat_type_p");}
function CleanIt4(){CleanIt("chat_type_s");}
function CleanIt5(){CleanIt("chat_type_sp");}
function CleanItAll(){document.getElementById("chat_box_message_bottom").innerHTML = "";document.getElementById("chat_box_message_top").innerHTML = "";}
//function AboutCheats(){alert(CheatMsg);}
function GetSomeHelp(){alert(MsgHelp);}

function FixSp1()
{
GM_setValue("DefaultChan", "DefSp1&");
document.getElementById("chat_add_channel").innerHTML = '<option value="world" selected="">Broadcast</option><option value="alliance">Alliance</option><option value="private">Private</option><option value="speaker">Speaker</option>'; 
document.getElementsByClassName("chat_tab")[0].innerHTML = '<span id="lastinfos" style="vertical-align:55%;align:right;">'+CBottomline+'</span><div id="chat_channel_button_zone" class="tab_btn_bar ie_fix"><a href="#" class="channel_btn_link world on" onclick="ChatRoom.changeChannel(\'world\'); return false;"><div class="chat_btn world"></div><div class="chat_pop">Broadcast</div></a><a href="#" class="channel_btn_link alliance" onclick="ChatRoom.changeChannel(\'alliance\'); return false;"><div class="chat_btn alliance"></div><div class="chat_pop">Alliance</div></a><a href="#" class="channel_btn_link private" onclick="ChatRoom.changeChannel(\'private\'); return false;"><div class="chat_btn private"></div><div class="chat_pop">Private</div></a><a href="#" class="channel_btn_link speaker" onclick="ChatRoom.changeChannel(\'speaker\'); return false;"><div class="chat_btn speaker"></div><div class="chat_pop">Speaker</div></a></div><div class="tab_tail ie_fix"></div>'; 
}
function FixSp2()
{
GM_setValue("DefaultChan", "DefSp2&");
document.getElementById("chat_add_channel").innerHTML = '<option value="world">Broadcast</option><option value="alliance" selected="">Alliance</option><option value="private">Private</option><option value="speaker">Speaker</option>'; 
document.getElementsByClassName("chat_tab")[0].innerHTML = '<span id="lastinfos" style="vertical-align:55%;align:right;">'+CBottomline+'</span><div id="chat_channel_button_zone" class="tab_btn_bar ie_fix"><a href="#" class="channel_btn_link world" onclick="ChatRoom.changeChannel(\'world\'); return false;"><div class="chat_btn world"></div><div class="chat_pop">Broadcast</div></a><a href="#" class="channel_btn_link alliance on" onclick="ChatRoom.changeChannel(\'alliance\'); return false;"><div class="chat_btn alliance"></div><div class="chat_pop">Alliance</div></a><a href="#" class="channel_btn_link private" onclick="ChatRoom.changeChannel(\'private\'); return false;"><div class="chat_btn private"></div><div class="chat_pop">Private</div></a><a href="#" class="channel_btn_link speaker" onclick="ChatRoom.changeChannel(\'speaker\'); return false;"><div class="chat_btn speaker"></div><div class="chat_pop">Speaker</div></a></div><div class="tab_tail ie_fix"></div>'; 
}
function FixSp3()
{
GM_setValue("DefaultChan", "DefSp3&");
document.getElementById("chat_add_channel").innerHTML = '<option value="world">Broadcast</option><option value="alliance">Alliance</option><option value="private" selected="">Private</option><option value="speaker">Speaker</option>'; 
document.getElementsByClassName("chat_tab")[0].innerHTML = '<span id="lastinfos" style="vertical-align:55%;align:right;">'+CBottomline+'</span><div id="chat_channel_button_zone" class="tab_btn_bar ie_fix"><a href="#" class="channel_btn_link world" onclick="ChatRoom.changeChannel(\'world\'); return false;"><div class="chat_btn world"></div><div class="chat_pop">Broadcast</div></a><a href="#" class="channel_btn_link alliance" onclick="ChatRoom.changeChannel(\'alliance\'); return false;"><div class="chat_btn alliance"></div><div class="chat_pop">Alliance</div></a><a href="#" class="channel_btn_link private on" onclick="ChatRoom.changeChannel(\'private\'); return false;"><div class="chat_btn private"></div><div class="chat_pop">Private</div></a><a href="#" class="channel_btn_link speaker" onclick="ChatRoom.changeChannel(\'speaker\'); return false;"><div class="chat_btn speaker"></div><div class="chat_pop">Speaker</div></a></div><div class="tab_tail ie_fix"></div>'; 
}

function offAll()
{
var DefStat1 = document.getElementById("DefSp1");
var DefStat2 = document.getElementById("DefSp2");
var DefStat3 = document.getElementById("DefSp3");
DefStat1.title = "off";
DefStat1.style.color = "white";
DefStat2.title = "off";
DefStat2.style.color = "white";
DefStat3.title = "off";
DefStat3.style.color = "white";
GM_deleteValue("DefaultChan");
}

function DefSp1()
{
	var DefStat = document.getElementById("DefSp1");
	if (DefStat.title == "off")
	{
	offAll();
		DefStat.title = "on";
		DefStat.style.color = "red";
		FixSp1();
	}
	else
	{
	GM_deleteValue("DefaultChan");
	DefStat.title = "off";
	DefStat.style.color = "white";
	}
}
function DefSp2()
{
	var DefStat = document.getElementById("DefSp2");
	if (DefStat.title == "off")
	{
	offAll();
		DefStat.title = "on";
		DefStat.style.color = "red";
		FixSp2();
	}
	else
	{
	GM_deleteValue("DefaultChan");
	DefStat.title = "off";
	DefStat.style.color = "white";
	}
}
function DefSp3()
{
	var DefStat = document.getElementById("DefSp3");
	if (DefStat.title == "off")
	{
	offAll();
		DefStat.title = "on";
		DefStat.style.color = "red";
		FixSp3();
	}
	else
	{
	GM_deleteValue("DefaultChan");
	DefStat.title = "off";
	DefStat.style.color = "white";
	}
}
var MyDefaultChan = GM_getValue("DefaultChan");
if (MyDefaultChan == "DefSp1&")
	MyDefaultChan = window.setTimeout(DefSp1, 500);
if (MyDefaultChan == "DefSp2&")
	MyDefaultChan = window.setTimeout(DefSp2, 500);
if (MyDefaultChan == "DefSp3&")
	MyDefaultChan = window.setTimeout(DefSp3, 500);
	
function SetupArmy(){

//ContentEval("Game.showModalPopup('army_formation.php', 'x=19&amp;y=-132&amp;mode=new', 966);");
}


// ------------------------- Test Banner -------------------------
forceCSS("#BannContent {border-radius: 12px;background: none repeat scroll 0 0 #0F0F0F;border: 1px solid #292929;float: center;vertical-align: top;text-align:center;opacity: 0.90;font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 11px;font-weight: bold;font-style: normal;line-height : 15px;display:none;}");
forceCSS("#NewGen {z-index:999999;}");

var FirstRow = ' | <a href="#" id="menuplus" value="close">\u25BC</a>';
var BannContent = '<div id="BannContent" class="BannContent">';
BannContent+= '<center><div id="CustomStatus" style="border-radius: 20px;font-size: 8px; background-color: white; color: black;" title="If red, you MAY BE disconnected. Depends. Wait to see if he comes back to green.">Initializing...</div></center>'
+'<blbl title="This is the title of the script. The ++ is a reference about the incrementation of a variable in most languages blah blah blah...">ExoPlanet++ By Psype</blbl><br />'
//--- tool bar ---
+'<font size="3px">| <a id="ErrorsCounter" title="Number of times you have escaped to a logout, thanks to MEH!">0</a> | '
+'<a title="Safe Refresh, keeping your chat content" id="savechat"><img style="width:15px; height:13px;vertical-align:-15%;" src="http://s3.noelshack.com/old/up/logoreload-4bf317d671.png"></a> | '
+'<a title="Game Unstuck, when your game freezes and you can\'t click on anything" id="GameUnstuck"><img style="width:15px; height:13px;vertical-align:-15%;" src="http://s3.noelshack.com/old/up/logounlock-1cbe15b026.png"></a> | '
+'<a title="Click here for help" id="getHelp" href="">?</a> |</font>'

//--- end tool bar ---
+'<table style="border: none; padding: 5px; vertical-align: top;"><tr><td><div id="part1">'
// ----------------------- CLEANER ZONE -----------------------
+'<blbl title="To clean the chat. Thank you Mr.Obvious.">Chat cleaner</blbl><br />'
+'<a href="" id="Chat1" title="Removes all Broadcast messages in the chat">Broadcast</a> - '
+'<a href="" id="Chat2" title="Removes all Alliance messages in the chat">Alliance</a> - '
+'<a href="" id="Chat3" title="Removes all Private messages in the chat">Private</a><br />'
+'<a href="" id="Chat4" title="Removes all System messages in the chat">System</a> - '
+'<a href="" id="Chat6" title="Removes all System messages in the chat">Speaker</a> - '
+'<a href="" id="Chat5" title="Removes all chat messages">All</a><br />'

+'<br /><blbl title="To block messages">Chat blocker</blbl><br />'
+'<a href="" id="Chat1b" title="off">Broadcast</a> - '
+'<a href="" id="Chat2b" title="off">Alliance</a> - '
+'<a href="" id="Chat3b" title="off">Private</a><br />'
+'<a href="" id="Chat4b" title="off">System</a> - '
+'<a href="" id="Chat5b" title="off">Speaker</a><br />'

+'<br /><blbl title="To block messages">Default speak</blbl><br />'
+'<a href="" id="DefSp1" title="off">Broadcast</a> - '
+'<a href="" id="DefSp2" title="off">Alliance</a> - '
+'<a href="" id="DefSp3" title="off">Private</a><br />'

+'<br /><blbl title="Lists changes.">Full changelog</blbl><br />'
	+'<a id="DetailedList" href="">Click here</a><br />'
	+'<iframe src="" width=0 height=0 scrolling=no frameborder=0 name="postFrame" scrolling="no" resize="no"> </iframe>'
	+'<form onsubmit="ChatRoom.addMessage(this); return false;" id="GetDebug" name="GetDebug" method="POST" action="chat_add.php" target="postFrame"><input type="hidden" name="channel" value="private" ><input id="MyDebugReturn" type="hidden" value="" name="msg"></form>'
//	+'<a id="GameUnstuck" title="Fixes the game stuck when editing an army and an event happens." href="">Game Stuck</a><br />'
//	+'<a title="Refreshes the page, keeping the chat log." href="" id="savechat">Safe refresh</a><br />' 
	
	
+'<br /><blbl title="Background changes!">Change background</blbl><br />'
	+'<center><a title="Change image background. (PONIES?)" id="ChangeWp">Image</a> - '
	+'<a title="Change color background" id="ChangeColor">Color</a><br />'
	+'<a title="Reset do default" id="ResetWp">Reset</a></center>'

+'</div></td><td style="vertical-align: top"><div id="part2">'

 ///////////////////////// BONUSES ZONE /////////////////////////
+'<blbl title="Because forever MOAR.">Bonus!</blbl><br />'
	+'<a id="ColChecker" href="">Colony checker</a><br />'
	+'<a id="MsgPlayer" href="">Message to player</a><br />'
	+'<a id="OpenFPage" href="" target="_blank">Official forum (baad!)</a><br />'	
	+'<a id="OpenFPage2" href="" target="_blank">Unofficial forum (good!)</a><br />'	
	+'<a id="AsciiArt" href="" target="_blank">Ascii Art</a><br />'	
	+'<ttl title="For the moment, only military popup mod (on midmap)">CSS Mod</ttl><br />'
	+'<center><a title="Activate it" id="modCSSon">On</a> - '
	+'<a title="Deactivate it" id="modCSSoff">Off</a><br /></center>'
	+'<ttl title="Shorten channel names">Shorten channels</ttl><br />'
	+'<center><a title="Activate it" id="ShorChan1">On</a> - '
	+'<a title="Deactivate it" id="ShorChan0">Off</a><br /></center>'
//	+'<a title="Click on it for more informations" href="" id="getCheats">Cheats (off)</a><br />'
	
	+'<br /><a title="I\'m not paid for my work." href="http://donate.psype.fr" target="_blank" id="PsypeDonate"><img src="http://s3.noelshack.com/old/up/donate-30ab537832.png"><br />55469 characters<br />755 lines of code<br />9&euro; So far</a><br />'

	+'</div></td></tr></table>'
+'<center><div id ="CheckUpdate"></div></center>'
+'</font></td></tr></table></div></div>'

var BannLine = "<div id='NewGen'><blah>Exoplanet War v."+GameVersion[4]+" & <a id='OpenSPage' href='http://userscripts.org/scripts/source/104684.user.js' target='_blank'>Patch v."+versionScript+"</a>"+FirstRow+"</blah></div>"+BannContent;

function EditBanner(){
var MidContent = document.getElementsByClassName("activate_icon ie_fix")[0];
var ScrContainer = document.getElementsByClassName("icon f_activated")[0];
var ActivatedMsg = ScrContainer.getElementsByTagName("span")[0];

if (ActivatedMsg.innerHTML == "Activated!")
	{
	document.getElementsByClassName("active_icon_bg_r ie_fix")[0].innerHTML = '<a class="icon f_activated" onclick="return false;" href="#" style="background: url(\'http://s3.noelshack.com/old/up/activation_ed_l-93126dd34.png\') no-repeat scroll left top transparent;"><span></span>';
	var ActBanner = document.getElementsByClassName("icon f_activated")[0].getElementsByTagName("span")[0];
//	document.getElementsByClassName("icon f_activated")[0].style.background = "url('http://s3.noelshack.com/old/up/activation_ed_l-93126dd34.png') no-repeat scroll left top transparent";
	ActBanner.style.textAlign = "center";
	ActBanner.innerHTML = BannLine;
	}
}
EditBanner();

function UnStuck() {contentEval("Game.ajax_counter = 0;");}

function CleanGNews(){
document.getElementById("MyGNews").style.border = "";
document.getElementById("MyGNews").style.padding = "";
}
function CleanSNews(){
document.getElementById("MySNews").style.border = "";
document.getElementById("MySNews").style.padding = "";
}

//////// -------------- CHATZONE -------------- \\\\\\\\

//////// -------------- LISTENERS -------------- \\\\\\\\

var MidMenu = document.getElementById("menuplus");
MidMenu.addEventListener('click', GetMidMenu, false);

var forHelp = document.getElementById("getHelp");
forHelp.addEventListener('click', GetSomeHelp, false);

var DefSp1s = document.getElementById("DefSp1");
DefSp1s.addEventListener('click', DefSp1, false);
var DefSp2s = document.getElementById("DefSp2");
DefSp2s.addEventListener('click', DefSp2, false);
var DefSp3s = document.getElementById("DefSp3");
DefSp3s.addEventListener('click', DefSp3, false);

var Chatw = document.getElementById("Chat1");
Chatw.addEventListener('click', CleanIt1, false);
var Chata = document.getElementById("Chat2");
Chata.addEventListener('click', CleanIt2, false);
var Chatp = document.getElementById("Chat3");
Chatp.addEventListener('click', CleanIt3, false);
var Chats = document.getElementById("Chat4");
Chats.addEventListener('click', CleanIt4, false);
var Chatsp = document.getElementById("Chat6");
Chatsp.addEventListener('click', CleanIt5, false);
var Chatall = document.getElementById("Chat5");
Chatall.addEventListener('click', CleanItAll, false);

var GameStuck = document.getElementById("GameUnstuck");
GameStuck.addEventListener('click', UnStuck, false);

var saveit = document.getElementById("savechat");
saveit.addEventListener('click', getChat, false);

var wpsave = document.getElementById("ChangeWp");
wpsave.addEventListener('click', ChangeWp, false);
var colorsave = document.getElementById("ChangeColor");
colorsave.addEventListener('click', ChangeColor, false);
var RWp = document.getElementById("ResetWp");
RWp.addEventListener('click', ResetWp, false);

var CSSed = document.getElementById("modCSSon");
CSSed.addEventListener('click', EditCSS, false);
var CSSed2 = document.getElementById("modCSSoff");
CSSed2.addEventListener('click', RemoveEditCSS, false);

var ColChecker = document.getElementById("ColChecker");
ColChecker.addEventListener('click', ShowWhatsIn, false);
var MsgPlayer = document.getElementById("MsgPlayer");
MsgPlayer.addEventListener('click', MsgToPlayer, false);

var MsgPlayer = document.getElementById("DetailedList");
MsgPlayer.addEventListener('click', DetailsList, false);

var Pdons = document.getElementById("PsypeDonate");
Pdons.addEventListener('click', PsDon, false);

var OSPage = document.getElementById("OpenSPage");
OSPage.addEventListener('click', OpenScriptPage, false);

var OFPage = document.getElementById("OpenFPage");
OFPage.addEventListener('click', OpenForumPage, false);
var OFPage2 = document.getElementById("OpenFPage2");
OFPage2.addEventListener('click', OpenForumPage2, false);

var AsciiA = document.getElementById("AsciiArt");
AsciiA.addEventListener('click', ShowAsciiArt, false);

//var csefwefw = document.getElementById("getCheats");
//csefwefw.addEventListener('click', AboutCheats, false);

var ggrtgth = document.getElementById("ShorChan1");
ggrtgth.addEventListener('click', Shorten, false);
var edefsecd = document.getElementById("ShorChan0");
edefsecd.addEventListener('click', UnShorten, false);

var edfewfefd2 = document.getElementById("main_zone");
edfewfefd2.addEventListener('click', RefreshNews, false);


//////// -------------- LISTENERS -------------- \\\\\\\\

function GetMidMenu(){
var MyLink = document.getElementById('menuplus');
	if (MyLink.innerHTML == "\u25BC")
	{
	document.getElementById('BannContent').style.display = "block";
	MyLink.innerHTML = "\u25B2";
	}
	else if (MyLink.innerHTML == "\u25B2")
	{
	document.getElementById('BannContent').style.display = "none";
	MyLink.innerHTML = "\u25BC";
	}
}

document.body.insertBefore(myRoxZone, document.getElementById('myroxlayer'));
document.body.insertBefore(myRoxMenu, document.body.firstChild);

var edfewfefwdwdd2 = document.getElementById("MyGNews");
edfewfefwdwdd2.addEventListener('click', CleanGNews, false);
var edfewfepfd2 = document.getElementById("MySNews");
edfewfepfd2.addEventListener('click', CleanSNews, false);

contentEval("function forceCSS(cssdata){head = document.getElementsByTagName(\"head\")[0];style = document.createElement(\"style\");style.setAttribute(\"type\", 'text/css');style.innerHTML = cssdata;head.appendChild(style);};");


		document.getElementById("MyGNews").innerHTML = GM_getValue("ValGNews");
		document.getElementById("MySNews").innerHTML = GM_getValue("ValSNews");


// ----------------------- FORCING CSS ----------------------
var CssMod = "off";
function EditCSS(){
GM_setValue("CSSmod", "on");
CssMod = "on";
contentEval("var CssMod = \"on\"");
forceCSS(".popbox .middle_box_bg_command_centre {background: none repeat scroll 0 0 #0F0F0F;border: 1px solid #292929;float: left;line-height: 20px;margin-top: 5px;padding: 5px;vertical-align: middle;width: 865px;}");
document.getElementById("chat_box_content").style.margin = "-32px 0 -18px";
document.getElementById("notice_box_content").style.margin = "-32px 0 -16px";

contentEval("function CheckPopup(title){if (title.substring(0,17) == \"Military Action (\") {LoopMilitaryLaunch();forceCSS(\".popbox .middle_box_bg_command_centre {background: none repeat scroll 0 0 #0F0F0F;border: 1px solid #292929;float: left;line-height: 20px;margin-top: 5px;padding: 5px;vertical-align: middle;width: 865px;}\");} else forceCSS(\".popbox .middle_box_bg_command_centre {background: none repeat scroll 0 0 #0F0F0F;border: 1px solid #292929;float: left;line-height: 20px;margin-top: 5px;padding: 10px;vertical-align: middle;width: 509px;}\"); }");

var OChatHeight = (screenH/100)*65;
var MilPopPos = (screenW - 900)/2;

contentEval("function HBoxChat(){document.getElementById(\"chat_box_content\").style.height = \""+OChatHeight+"px\";document.getElementById(\"chat_box_message\").style.height = \""+OChatHeight+"px\";}")
contentEval("function MidBoxChat(){document.getElementById(\"chat_box_content\").style.height = \"110px\";document.getElementById(\"chat_box_message\").style.height = \"110px\";var chat = document.getElementById('chat_box_message');chat.scrollTop = chat.scrollHeight;}")
contentEval("function HBoxNotice(){document.getElementById(\"notice_box_content\").style.height = \""+(OChatHeight + 40)+"px\";document.getElementById(\"construction_notice\").style.height = \""+(OChatHeight + 15)+"px\";document.getElementById(\"units_notice\").style.height = \""+(OChatHeight + 15)+"px\";document.getElementById(\"military_notice\").style.height = \""+(OChatHeight + 15)+"px\";document.getElementById(\"shop_notice\").style.height = \""+(OChatHeight + 15)+"px\";}")
contentEval("function MidBoxNotice(){document.getElementById(\"notice_box_content\").style.height = \"93px\";document.getElementById(\"construction_notice\").style.height = \"93px\";document.getElementById(\"units_notice\").style.height = \"93px\";document.getElementById(\"military_notice\").style.height = \"93px\";document.getElementById(\"shop_notice\").style.height = \"93px\";}")

contentEval("Game.maximizeChatBox = function () {if (this.chatBoxSize == \"min_size\") {$(\"#chat_box\").removeClass(this.chatBoxSize).addClass(\"normal_size\");if (7 == parseInt($.browser.version)) {$(\"#chat_box.normal_size #chat_box_header\").height(51);$(\"#chat_box.normal_size #chat_box_content\").height(63);$(\"#chat_box.normal_size #chat_box_message\").height(63);}this.chatBoxSize = \"normal_size\";$(\"#chat_box_message\").attr({scrollTop: $(\"#chat_box_message\").attr(\"scrollHeight\")});} else if (this.chatBoxSize == \"normal_size\") {var position = $(\"#chat_box_message\").scrollTop() + parseInt($(\"#chat_box_message\").css(\"height\"));$(\"#chat_box\").removeClass(this.chatBoxSize).addClass(\"max_size\");if (7 == parseInt($.browser.version)) {$(\"#chat_box.max_size #chat_box_content\").height("+OChatHeight+");}if (7 == parseInt($.browser.version)) {$(\"#chat_box.max_size #chat_box_message\").height("+OChatHeight+");}this.chatBoxSize = \"max_size\";$(\"#chat_box_message\").attr({scrollTop: position - parseInt($(\"#chat_box_message\").css(\"height\"))});HBoxChat();} else if (this.chatBoxSize == \"max_size\") {var position = $(\"#chat_box_message\").scrollTop() + parseInt($(\"#chat_box_message\").css(\"height\"));$(\"#chat_box\").removeClass(this.chatBoxSize).addClass(\"normal_size\");if (7 == parseInt($.browser.version)) {$(\"#chat_box.normal_size #chat_box_content\").height(63);}if (7 == parseInt($.browser.version)) {$(\"#chat_box.normal_size #chat_box_message\").height(63);}this.chatBoxSize = \"normal_size\";$(\"#chat_box_message\").attr({scrollTop: position - parseInt($(\"#chat_box_message\").css(\"height\"))});MidBoxChat();}}");
contentEval("Game.maximizeNoticeBox = function () {if (this.noticeBoxSize == \"min_size\") {$(\"#notice_box\").removeClass(this.noticeBoxSize).addClass(\"normal_size\");if (7 == parseInt($.browser.version)) {$(\"#notice_box.normal_size #notice_box_header\").height(51);$(\"#notice_box.normal_size #notice_box_content\").height(93);}this.noticeBoxSize = \"normal_size\";} else if (this.noticeBoxSize == \"normal_size\") {$(\"#notice_box\").removeClass(this.noticeBoxSize).addClass(\"max_size\");if (7 == parseInt($.browser.version)) {$(\"#notice_box.max_size #notice_box_content\").height("+OChatHeight+");}this.noticeBoxSize = \"max_size\";HBoxNotice();} else if (this.noticeBoxSize == \"max_size\") {$(\"#notice_box\").removeClass(this.noticeBoxSize).addClass(\"normal_size\");if (7 == parseInt($.browser.version)) {$(\"#notice_box.normal_size #notice_box_content\").height(93);}this.noticeBoxSize = \"normal_size\";MidBoxNotice();}}");

contentEval("function LoopMilitaryLaunch(){var Editpop = window.setTimeout(EditMilitaryLaunch, 100);Editpop = window.setTimeout(EditMilitaryLaunch, 150);Editpop = window.setTimeout(EditMilitaryLaunch, 200);Editpop = window.setTimeout(EditMilitaryLaunch, 250);Editpop = window.setTimeout(EditMilitaryLaunch, 300);}");
contentEval("function EditMilitaryLaunch(){var myPopup = document.getElementsByClassName(\"ui-dialog ui-widget ui-widget-content ui-corner-all popup ui-draggable\");myPopup[myPopup.length - 1].style.top = \"123px\";myPopup[myPopup.length - 1].style.left = \""+MilPopPos+"px\";myPopup[myPopup.length - 1].style.width = \"900px\";var ArmiesLists = myPopup[myPopup.length - 1].getElementsByClassName(\"middle_box_subrow\");for (i=0;i<ArmiesLists.length;i++){ArmiesLists[i].style.width = \"20%\";}};");

contentEval("Game.showPopup = function (url, width, tab_index, sub_tab_index, accordion_index) {if (url) {width = width || 762;if (this.popupURL) {this.removePopupEvent();}var xhr = $.ajax({url: url, success: function (response) {var json = Game.getHeaderJSON(xhr);if (typeof json.success === \'undefined\') {json.success = true;}if (json.success) {Game.popupURL = url;Game.popupWidth = json.popupWidth ? json.popupWidth : width;$(\'#popup_zone\').html(response);if (url == \'tutorial.php\' && $(window).scrollTop() != 0) {$(window).scrollTop(0);}$(\'#popup_zone\').dialog({title: \'<div class=\\'header\\'><div class=\\'left_header ie_fix\\'></div><div class=\\'main_header ie_fix\\'><div class=\\'title\\'><h1>\' + json.title + \'</h1></div></div></div>\', width: Game.popupWidth, resizable: false, dialogClass: \'popup\', close: function (event, ui) {Game.removePopup();}});$(\'#popup_zone\').css(\'width\', \'100%\');if (!$(\'#popup_zone\').next(\'.footer\').length) {$(\'#popup_zone\').after(\'<div class=\\'footer\\'><div class=\\'left_footer ie_fix\\'></div><div class=\\'main_footer ie_fix\\'></div></div>\');}if ($.browser.msie && 6 == parseInt($.browser.version)) {$(\'#popup_zone shape:odd\').css(\'display\', \'block\');$(\'#popup_zone shape:even\').hide();}if (typeof tab_index !== \'undefined\') {$(\'#popup_zone .ui-tabs\').tabs(\'select\', tab_index);}if (typeof sub_tab_index !== \'undefined\') {$(\'#popup_zone .ui-sub-tabs\').tabs(\'select\', sub_tab_index);}if (typeof accordion_index !== \'undefined\') {var container = \'#popup_zone\';if ($(\'#popup_zone .ui-sub-tabs\').length) {container = \'#\' + $(\'#popup_zone .ui-sub-tabs\').tabs(\'select\').find(\'.ui-tabs-panel:not(.ui-tabs-hide):last\').attr(\'id\');} else if ($(\'#popup_zone .ui-sub-tabs\').length) {container = \'#\' + $(\'#popup_zone .ui-tabs\').tabs(\'select\').find(\'.ui-tabs-panel:not(.ui-tabs-hide):last\').attr(\'id\');}Game.initialize_accordion(container, accordion_index);}Game.initialize_tooltip(\'#popup_zone\');Game.initTutorPointer(json);var ParsedUrl = gameHref(url);CheckPopup(json.title);CheckUrlPopup(ParsedUrl[0]);} else {Game.showError(json.error, null, typeof json.popup_redirect_url === \'undefined\' ? null : json.popup_redirect_url);Game.removePopup();}}});}}");
}
contentEval("var AllowedB = true; var AllowedA = true; var AllowedP = true; var AllowedS = true; var AllowedSP = true;");

function CleanIt1b(){var MyContent = document.getElementById("Chat1b");if (MyContent.title == "off"){MyContent.style.color = "red";MyContent.title = "on";contentEval("AllowedB = false;");}else if (MyContent.title == "on"){MyContent.style.color = "white";MyContent.title = "off";contentEval("AllowedB = true;");}}
function CleanIt2b(){var MyContent = document.getElementById("Chat2b");if (MyContent.title == "off"){MyContent.style.color = "red";MyContent.title = "on";contentEval("AllowedA = false;");}else if (MyContent.title == "on"){MyContent.style.color = "white";MyContent.title = "off";contentEval("AllowedA = true;");}}
function CleanIt3b(){var MyContent = document.getElementById("Chat3b");if (MyContent.title == "off"){MyContent.style.color = "red";MyContent.title = "on";contentEval("AllowedP = false;");}else if (MyContent.title == "on"){MyContent.style.color = "white";MyContent.title = "off";contentEval("AllowedP = true;");}}
function CleanIt4b(){var MyContent = document.getElementById("Chat4b");if (MyContent.title == "off"){MyContent.style.color = "red";MyContent.title = "on";contentEval("AllowedS = false;");}else if (MyContent.title == "on"){MyContent.style.color = "white";MyContent.title = "off";contentEval("AllowedS = true;");}}
function CleanIt5b(){var MyContent = document.getElementById("Chat5b");if (MyContent.title == "off"){MyContent.style.color = "red";MyContent.title = "on";contentEval("AllowedSP = false;");}else if (MyContent.title == "on"){MyContent.style.color = "white";MyContent.title = "off";contentEval("AllowedSP = true;");}}

var Chatwb = document.getElementById("Chat1b");
Chatwb.addEventListener('click', CleanIt1b, false);
var Chatab = document.getElementById("Chat2b");
Chatab.addEventListener('click', CleanIt2b, false);
var Chatpb = document.getElementById("Chat3b");
Chatpb.addEventListener('click', CleanIt3b, false);
var Chatsb = document.getElementById("Chat4b");
Chatsb.addEventListener('click', CleanIt4b, false);
var Chatspb = document.getElementById("Chat5b");
Chatspb.addEventListener('click', CleanIt5b, false);


function RemoveEditCSS(){
//alert("Warning : In this version, deactivating CSS Mod will broke the chat! A fix will be provided soon... Sorry.\n\nPeople using it waited to prevent me, so the fix comes late.");
GM_deleteValue("CSSmod");
contentEval("var CssMod = \"off\"");
getChat();
}

function Shorten() {
GM_setValue("Shorten","on");
contentEval('ChatRoom.world_prefix = "B"; ChatRoom.alliance_prefix = "A"; ChatRoom.private_prefix = "P";ChatRoom.speaker_prefix = "SP";');
}
function UnShorten() {
GM_deleteValue("Shorten");
contentEval('ChatRoom.world_prefix = "Broadcast"; ChatRoom.alliance_prefix = "Alliance"; ChatRoom.private_prefix = "Private";ChatRoom.speaker_prefix = "Speaker";');
}

if (GM_getValue("Shorten"))
Shorten();

var CSSmod = GM_getValue("CSSmod");
if (CSSmod)
	var Csstime = window.setTimeout(EditCSS, 500);
else
contentEval("var CssMod = \"off\"");

// ----------------------- END FORCING ----------------------
// ----------------------- AUTO UPDATE ! ----------------------

/////////////////////////////////
// Modded Updater ///////////////
/////////////////////////////////

var thisId=104684;
var thisReleaseDate="20110706";
var GMSUCfreq=1;

function GM_scriptVersionControl() {
	if(self.location==top.location) {
		var GMSUCreleaseDate=new Date();
		GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
		var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
		if (GMSUCdif%GMSUCfreq==0) {
			GMSUC_Control();
			}}}

function GMSUC_Control() {
	var scriptId=thisId;
	var version=versionScript;
	var scriptUrl="http://userscripts.org/scripts/source/"+scriptId+".meta.js";
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var textResp=responseDetails.responseText;
			var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp)[1];
			var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
			if(offRel!=version) {
			var UpdateDiv = document.getElementById("CheckUpdate");
			UpdateDiv.style.backgroundColor = "#FF0000";
			UpdateDiv.style.color = "#000000";
			UpdateDiv.innerHTML = 'New version!<br />'+offRel+'<br /><a id="UpdLink" href="http://userscripts.org/scripts/source/104684.user.js">Click here to update<br />(Middle click if needed)</a>';
			var UpdateDiv2 = document.getElementById("NewGen");
			UpdateDiv2.style.backgroundColor = "#C40000";
			UpdateMode2();
				}
			},
			onerror: function() { 
			var UpdateDiv = document.getElementById("CheckUpdate");
			UpdateDiv.style.backgroundColor = "#000000";
			UpdateDiv.style.color = "#FF0000";
			UpdateDiv.innerHTML = 'Problem!<br /><a id="UpdNotSupp" href="http://userscripts.org/scripts/source/104684.user.js">Your browser does not<br />support automatic updates.<br />Please check them manually.</a>';
			}
		});
	}
GM_scriptVersionControl();

function listenUpdate() {
var UpdaterVar = document.getElementById("UpdLink");
if (UpdaterVar)
UpdaterVar.addEventListener('click', UpdateMode, false);

var NotSupp = document.getElementById("UpdNotSupp");
if (NotSupp)
NotSupp.addEventListener('click', UpdateMode, false);
}

var timeoutUpdIdLolTrolol = window.setTimeout(listenUpdate, 2000);