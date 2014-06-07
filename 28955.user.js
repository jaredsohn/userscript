/*
Faceraper Ex
Build 15
2008-6-21

Origional Fix Copyright (c) 2006, Tristan Pemble
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

Portions Copyright (c) 2005, Mark Pilgrim
Also Released under the GPL license

Origional OIFY Styles (oify.css, and _phallic.css) probably Copyright (c) 2004, Garry Newman
The missing Scripts are Copyright ©2000 - 2004, Jelsoft Enterprises Limited and/or Copyright (c) 2004, Garry Newman, god knows that they are licensed under.

Code Molested by Morphology53
Still Released under the GPL license

//All banned posts: "User was banned for this post intitle:View Single"
//All Gold Members: "gold member intitle:View Profile"

//http://facepunchstudios.com/favicon.ico
//http://unicode.coeurlumiere.com/
//Floating menu code ganked from someplace
*/

// ==UserScript==
// @name          Faceraper Ex
// @namespace     FaceraperEx
// @description   Also cocks.
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==


//Missing Scripts
var pooscr =

'var MouseX = 0;' +
'var MouseY = 0;' +

//The rate button in normal fp
'function ToggleDiv( id, bPosition ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.style.display == \'none\') {' +
'		panel.style.display = \'block\';' +
'		if ( bPosition ) {' +
'			if (panel.className == \'rate_bar\' ) {' +
'				panel.style.left = MouseX + \'px\';' +
'				panel.style.top = (MouseY - 60)+ \'px\';' +
'			}' +
'			else {' +
'				panel.style.left = MouseX + \'px\';' +
'				panel.style.top = MouseY + \'px\';' +
'			};' +
'		};' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +
'	return false;' +
'};' +

//The blue arrow button, ratings in the oify
'function Toggle_Element_On_Cursor( id, offx, offy ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +
'	if (panel.style.display != \'block\') {' +
'		panel.style.display = \'block\';' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +
'	panel.style.left = (MouseX + offx) + \'px\';' +
'	if (panel.className == \'rate_bar\' ) {' +
	'		panel.style.top = ((MouseY + offy) - 60)+ \'px\';' +
'	}' +
'	else {' +
'		panel.style.top = (MouseY + offy) + \'px\';' +
'	};' +
'	return false;' +
'};' +

//Rating crap
'function RateHover( $on, $postid, $name ) {' +
'	bar = fetch_object( \'rbt_\' + $postid );' +
'	if ($on) {' +
'		bar.innerHTML = $name;' +
'	}' +
'	else {' +
'		bar.innerHTML = \'&nbsp;\';' +
'	}' +
'};' +

'var rateAJAX = false;' +
'var RateBox = false;' +

'function RateFeedback() {' +
'	if (!rateAJAX) return;' +

'	if (rateAJAX.handler.readyState != 4 || rateAJAX.handler.status != 200) {' +
'		return;' +
'	}' +
	
'	RateBox.innerHTML = rateAJAX.handler.responseText;' +
	
'	if ( rateAJAX.handler.responseText == \'\' ) {' +
'		RateBox.style.display = \'none\';' +
'	}' +
'	delete rateAJAX;' +
'	rateAJAX = false;' +
'	RateBox = false;' +
'};' +

'function Rate_It( $id, $postid, $v ) {' +
'	if (rateAJAX) {' +
'		alert(\'One at a time BITCH\');' +
'		return false;' +
'	}' +
	
'	RateBox = fetch_object( \'rb_\' + $postid );' +
'	RateBox.innerHTML = \'<div class="rated_progress">&nbsp;</div>\';' +
	
'	rateAJAX = new vB_AJAX_Handler(true);' +
'	rateAJAX.onreadystatechange( RateFeedback );' +
'	rateAJAX.send( \'/rate_it.php\', \'do=rate&p=\' + $postid + \'&r=\' + $id + \'&v=\' + $v );' +
	
'	return false;' +
'};' +

'function CloseWindow( name ) {' +
'	win = fetch_object( name );' +
'	if (!win) return false;' +
	
'	document.body.removeChild( win );' +
'	delete win;' +
'	RateWindow = false;' +
'};' +

'var ajRB = false;' +
'var ClickX = 0;' +
'var ClickY = 0;' +
'var RateWindow = false;' +

'function ShowRateBox( $userid, $clicked, e ) {' +
'	if (ajRB) {' +
'		alert( \'One at a time you shitbag\' );' +
'		return;' +
'	}' +
'	if ( RateWindow ) {' +
'		document.body.removeChild( RateWindow );' +
'		delete RateWindow;' +
'		RateWindow = false;' +
'	}' +
'	if ( WhoVotedWindow ) {' +
'		document.body.removeChild( WhoVotedWindow );' +
'		delete WhoVotedWindow;' +
'		WhoVotedWindow = false;' +
'	}' +
	
'	ClickX = MouseX + 10;' +
'	ClickY = MouseY;' +
'	ajRB = new vB_AJAX_Handler(true);' +
'	ajRB.onreadystatechange( ShowRateBoxFeedback );' +
'	ajRB.send( \'/rate_it.php\', \'do=getbox&id=\' + $userid );' +
'	return false;' +
'};' +

'var ajRN = false;' +
'var RateNameExpander = false;' +

'function RateItExpand_CB() {' +
'	if (!ajRN) return;' +
'	RateNameExpander.innerHTML = RateNameExpander.innerHTML + \".\";' +
'	if (ajRN.handler.readyState != 4 || ajRN.handler.status != 200) return;' +
'	var output = ajRN.handler.responseText;' +
'	RateNameExpander.innerHTML = output;' +
'	ajRN = false;' +
'	RateNameExpander = false;' +
'};' +

'function RateItExpand( $postid, $md5 ) {' +
'	if (RateNameExpander) return false;' +
'	RateNameExpander = fetch_object( \'rate_it_names_\' + $postid );' +
'	if ( !RateNameExpander ) return false;' +
'	if (RateNameExpander.innerHTML != \'\') {' +
'		if (RateNameExpander.style.display == \'none\') {' +
'			RateNameExpander.style.display = \'block\';' +
'		}' +
'		else {' +
'			RateNameExpander.style.display = \'none\';' +
'		}' +
'		RateNameExpander = false;' +
'		return false;' +
'	}' +
	
'	RateNameExpander.innerHTML = \"Fetching..\";' +
'	ajRN = new vB_AJAX_Handler(true);' +
'	ajRN.onreadystatechange( RateItExpand_CB );' +
'	ajRN.send( \'/rate_it.php\', \'do=getnames&post=\' + $postid + \'&md5=\' + $md5 );' +
'	return false;' +
'};' +

'var ajWhoRated = false;' +
'var WhoVotedWindow = false;' +


'function ShowWhoVotedFeedback() {' +
'	if (!ajWhoRated) {' +
'		return;' +
'	}' +
'	if (ajWhoRated.handler.readyState == 1 && !WhoVotedWindow) {' +
'		var div = document.createElement(\'div\');' +
'		div.id = \'Rate_It_Popup_Names\';' +
'		div.style.width = \'100px\';' +
'		div.style.opacity = \'0.9\';' +
'		div.style.left = ClickX + \'px\';' +
'		div.style.top = ClickY + \'px\';' +
'		div.style.position = \"absolute\";' +
'		div.style.background = \"#ffd\";' +
'		div.style.border = \"1px solid #777\";' +
'		div.style.padding = \'10px\';' +
'		div.style.cursor = \'pointer\';' +
'		div.style.color = \'#555\';' +
'		div.style.fontSize = \'11px\';' +
'		div.innerHTML = \'<div class=\"big_js_loading\" style=\"width: 100px; height: 40px;\">&nbsp;</div>\';' +
'		div.onclick = function() {' +
'										if (WhoVotedWindow) {' +
'											document.body.removeChild( WhoVotedWindow );' +
'											delete WhoVotedWindow;' +
'											WhoVotedWindow = false;' +
'										}' +
'									};' +
'		document.body.appendChild( div );' +
'		WhoVotedWindow = div' +
'	};' +

'	if (ajWhoRated.handler.readyState != 4 || ajWhoRated.handler.status != 200) {' +
'		return;' +
'	}' +
	
'	var output = ajWhoRated.handler.responseText;' +
'	WhoVotedWindow.innerHTML = output;' +
'	delete ajWhoRated;' +
'	ajWhoRated = false;' +
'};' +

'function ShowWhoVoted( $userid, $rateid, $rated ) {' +
'	if (ajWhoRated) {' +
'		alert( \'One at a time you shitbag\' );' +
'		return false;' +
'	}' +
	
'	if ( WhoVotedWindow ) {' +
'		document.body.removeChild( WhoVotedWindow );' +
'		delete WhoVotedWindow;' +
'		WhoVotedWindow = false;' +
'	}' +
	
'	ClickX = MouseX;' +
'	ClickY = MouseY;' +
'	ajWhoRated = new vB_AJAX_Handler(true);' +
'	ajWhoRated.onreadystatechange( ShowWhoVotedFeedback );' +
'	ajWhoRated.send( \'/rate_it.php\', \'do=whovoted&id=\' + $userid + \'&rid=\' + $rateid + \'&rated=\' + $rated );' +
'	return false;' +
'};' +

//Media Tags
'function PlayMedia( id ) {' +
'	buttons 	= fetch_object( \'mediabuttons_\' + id );' +
'	movie		= fetch_object( \'mediadiv_\' + id );' +
'	buttons.style.display = \'none\';' +
'	movie.style.display = \'inline\';' +
'};' +

'var ajEvent = false;' +
'var EventWindow = false;' +
'var EventURL = false;' +
'function ShowEventCallback(){' +
'	if (!ajEvent) {' +
'		return;' +
'	};' +
'	if ( ajEvent.handler.readyState == 1 && !EventWindow ) {' +
'		var div = document.createElement(\'div\');' +
'		div.id = \'EventWindow\';' +
'		div.style.opacity = \'0.95\';' +
'		div.style.left = ClickX + \'px\';' +
'		div.style.top = ClickY + \'px\';' +
'		div.style.position = "absolute";' +
'		div.style.background = "#ffd";' +
'		div.style.border = "1px solid #777";' +
'		div.style.padding = \'5px\';' +
'		div.style.cursor = \'pointer\';' +
'		div.style.color = \'#555\';' +
'		div.style.fontSize = \'10px\';' +
'		div.innerHTML = \'<div class="big_js_loading" style="width: 250px; height: 40px;">Fetching Events</div>\';' +
'		div.onclick = function() {' +
'			if (EventWindow) {' +
'				document.body.removeChild( EventWindow );' +
'				delete EventWindow;' +
'				EventWindow = false;' +
'			};' +
'		};' +
'		document.body.appendChild( div );' +
'		EventWindow = div;' +
'	};' +
'	if (ajEvent.handler.readyState != 4 || ajEvent.handler.status != 200) {' +
'		return;' +
'	};' +
'	var output = ajEvent.handler.responseText;' +
'	var closeme = "<a href=\'#\' onclick=\'EventWindow = false; CloseWindow( \\\"EventWindow\\\" ); return false;\'><img src=\'/images/close.png\' /></a>";' +
'	EventWindow.innerHTML = "<div style=\'text-align: right;\'><a href=\'" + EventURL + "\'> <img src=\'/images/famfam/link.png\' /></a>" + closeme + "</div>" + output;' +
'	delete ajEvent;' +
'	ajEvent = false;' +
'};' +

'function OpenEvent( $data ){' +
'	if ( ajEvent ){' +
'		alert( \'One at a time!\' );' +
'		return false;' +
'	};' +
'	if ( EventWindow ){' +
'		document.body.removeChild( EventWindow );' +
'		delete EventWindow;' +
'		EventWindow = false;' +
'	};' +
'	ClickX = MouseX;' +
'	ClickY = MouseY;' +
'	ajEvent = new vB_AJAX_Handler(true);' +
'	ajEvent.onreadystatechange( ShowEventCallback );' +
'	ajEvent.send( \'/eventlog.php\', \'aj=1&\' + $data );' +
'	EventURL = \'/eventlog.php?\' + $data ;' +
'	return false;' +
'};'

//vars pulled from GM
var thegoggles = 'THEY DO NOTHING!'
var oifybannertext = GM_getValue("css_banner", 'Internet OIFY');
var oifyreporttext = GM_getValue("css_report", 'Report to Suck My COck!!!1!1');
var THEBACKGROUND = GM_getValue("cssbackgr", 'http://www.garry.tv/img/trip/gr-bk.gif');


var thedomain = window.location.host;
var	bodyel = document.getElementsByTagName('body')[0];
if( thedomain.search(/forums.facepunchstudios.com/) == -1 ){ return; }
var shitlist = GM_getValue("slistarray", 'fake1,fake2');
shitlist = shitlist.split(',')
var myfnlocation = window.location.href
var FunkyMusicTable = [ 'music.mid', 'music8.mid', 'music7.mid', 'music6.mid', 'music5.mid', 'music4.mid', 'music3.mid', 'music2.mid', 'music10.mid' ]
var isoify = false
if ( document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 ) {
	isoify = true
};

var myusername = document.evaluate("//table/tbody/tr/td[3]/div[@class='smallfont']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//My style string
var phallic =
//Green Static background
'body {' +
'	background-image: url('+ THEBACKGROUND +') ! important;' +
'	background-color: #111 ! important;' +
'	background-repeat: repeat ! important;' +
'	color: #000 ! important;' +
'	font: 13px System ! important;' +
'	margin: 0px 20px ! important;' +
'}' +

'a:link {' +
'	color: #0A0 ! important;' +
'}' +

'a:hover, a:active {' +
'	color: #F00 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'a:visited {' +
'	color: #0F0 ! important;' +
'}' +

'.page {' +
'	background: transparent url('+ THEBACKGROUND +') repeat scroll 0% ! important;' +
'	border-left: 0px #888 solid ! important;' +
'	border-top: 0px #888 solid ! important;' +
'	border-right: 0px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	color: #0F0 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'td, th, p, li {' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tborder {' +
'	background-color: #070 ! important;' +
'	color: #5C5 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tcat {' +
'	background-color: #FFAAAA ! important;' +
'	color: #111 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tcat a:link {' +
'	color: #FFF ! important;' +
'}' +

'.tcat a:visited {' +
'	color: #FFF ! important;' +
'}' +

'.tcat a:hover, .tcat a:active {' +
'	color: #FFF ! important;' +
'}' +

'.thead {' +
'	background-color: #FFAA00 ! important;' +
'	border-left: 0px #888 solid ! important;' +
'	border-top: 0px #888 solid ! important;' +
'	border-right: 0px #888 solid ! important;' +
'	border-bottom: 0px #888 solid ! important;' +
'	color: #eee ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.thead a:link {' +
'	color: #eee ! important;' +
'}' +

'.thead a:visited {' +
'	color: #eee ! important;' +
'}' +

'.thead a:hover, .thead a:active {' +
'	color: #fff ! important;' +
'}' +

'.tfoot {' +
'	background-color: #333 ! important;' +
'	color: #888 ! important;' +
'}' +

'td.tfoot {' +
'	background-color: #fa0 ! important;' +
'	color: #888 ! important;' +
'}' +

'.alt1, .alt1Active {' +
'	background-color: #335533 ! important;' +
'	color: #00AA00 ! important;' +
'	border-left: 0px #888 solid ! important;' +
'	border-top: 1px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	border-right: 0px #888 solid ! important;' +
'}' +

'.alt1 A, .alt1Active A {' +
'	color: #00AA00 ! important;' +
'}' +

//Banlist Hack
'TD.alt1 DIV A:visited, TD.alt1Active DIV A:visited {' +
'	color: #00DD00 ! important;' +
'}' +

'.alt2, .alt2Active {' +
'	background-color: #040 ! important;' +
'	color: #000 ! important;' +
'}' +

'.alt2 A, .alt2Active A {' +
'	color: #00AA00 ! important;' +
'}' +

'.wysiwyg {' +
'	background-color: #F5F5F5 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.button {' +
'	background-color: #111 ! important;' +
'	color: #181 ! important;' +
'	border: 1px #888 dotted ! important;' +
'}' +

'.smallfont {' +
'	color: #ddd ! important;' +
'}' +

//Your login info
'DIV.smallfont {' +
'	color: #222222 ! important;' +
'}' +

//VB Copyrights
'FORM DIV DIV.smallfont {' +
'	color: #ddd ! important;' +
'}' +

'.time {' +
'	color: #FFF ! important;' +
'}' +

//Highlight Tags
'.highlight {' +
'	color: #FF0000 ! important;' +
'}' +

'.fjsel {' +
'	background-color: #1B4CA2 ! important;' +
'	color: #FFFFFF ! important;' +
'}' +

'.fjdpth0 {' +
'	background-color: #F7F7F7 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.panel {' +
'	color: #000000 ! important;' +
'}' +

//Houses Quick Reply
'.panelsurround {' +
'	background-image: url() ! important;' +
'	color: #000000 ! important;' +
'	background-color: #030 ! important;' +
'	border-left: 1px #888888 solid ! important;' +
'	border-top: 0px #888888 solid ! important;' +
'	border-bottom: 0px #888888 solid ! important;' +
'	border-right: 1px #888888 solid ! important;' +
'}' +

//No IDea
'legend {' +
'	color: #a00 ! important;' +
'}' +

'.vbmenu_control {' +
'	color: #ddd ! important;' +
'	background-color: #00AA22 ! important;' +
'	border-left: 1px #55BB99 solid ! important;' +
'	border-top: 1px #55BB99 solid ! important;' +
'	border-bottom: 1px #009933 solid ! important;' +
'	border-right: 1px #009933 solid ! important;' +
'}' +

'.vbmenu_control a:link {' +
'	color: #ccc ! important;' +
'}' +

'.vbmenu_control a:visited {' +
'	color: #ccc ! important;' +
'}' +

'.vbmenu_control a:hover, .vbmenu_control a:active {' +
'	color: #800 ! important;' +
'}' +

'.vbmenu_popup {' +
'	color: #060 ! important;' +
'	background-color: #040 ! important;' +
'	border-left: 1px #888 solid ! important;' +
'	border-top: 1px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	border-right: 1px #888 solid ! important;' +
'}' +

'.vbmenu_option {' +
'	background: #000 url(/images/as/pin_light.gif); ! important;' +
'	color: #060 ! important;' +
'	cursor: pointer ! important;' +
'}' +

'.vbmenu_option a:link {' +
'	color: #1B4CA2 ! important;' +
'}' +

'.vbmenu_option a:visited {' +
'	color: #1B4CA2 ! important;' +
'}' +

'.vbmenu_option a:hover, .vbmenu_option a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite {' +
'	background: #1B4CA2 url(/images/as/pin_blue.gif) ! important;' +
'	color: #FFFFFF ! important;' +
'	cursor: pointer ! important;' +
'}' +

'.vbmenu_hilite a:link {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite a:visited {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite a:hover, .vbmenu_hilite a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'.tableborder {' +
'	background-color: #f00 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.toolbar {' +
'	background: url() ! important;' +
'	background-color: #222 ! important;' +
'	color: #111 ! important;' +
'	border-top: 1px #090 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'}' +

'#toolbar {' +
'	background: url() ! important;' +
'	background: #01A3E5 ! important;' +
'	color: #ddd ! important;' +
'}' +

'#toolbar a {' +
'	color: #ddd ! important;' +
'}' +

'.quotename {' +
'	color: #171 ! important;' +
'	border: 1px #aaa dotted ! important;' +
'	border-bottom: 0px ! important;' +
'	background: #222 ! important;' +
'	font: 13px System ! important;' +
'}' +

'.quote {' +
'	color: #181 ! important;' +
'	background: #111 ! important;' +
'	font: 13px System ! important;' +
'}' +

'.sticky {' +
'	background-color: #050 ! important;' +
'}' +

'.locked {' +
'	background-color: #000 ! important;' +
'}' +

'.announce {' +
'	background-color: #040 ! important;' +
'}' +

//Fixed colors as per update 14
'DIV.mediabox {' +
'	color: #080 ! important;' +
'	background-color: #111 ! important;' +
'	border: 1px solid #888 ! important;' +
'	background-image: url() ! important;' +
'}' +

//Shows a users total ratings
'#Rate_It_Popup {' +
'	color: #080 ! important;' +
'	background-color: #444 ! important;' +
'	border: 1px solid #222 ! important;' +
'	opacity: 0.96 ! important;' +
'	filter: Alpha(opacity=96) ! important;' +
'}' +

'DIV.rateit_namebox {' +
'	background-color: #FFAA00 ! important;' +
'	border: 1px solid #FFFF0D ! important;' +
'}' +

'DIV.rate_it DIV.rate_text_line {' +
'	background-color: #335533 ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	color: #911 ! important;' +
'	background-color: #224422 ! important;' +
'}' +

//Basic rateing numbers
'DIV.rate_it_display, DIV.rate_it_display_box, DIV.rate_it_thread {' +
'	color: #ddd ! important;' +
'}' +

//Global post rating box
'#Rate_It_Popup DIV DIV.rate_it_display_box A{' +
'	color: #ddd ! important;' +
//'	white-space: nowrap;' +
'}' +

'DIV.rate_it_display_names {' +
'	color: #ddd ! important;' +
'	border: 1px solid #FFFF0D ! important;' +
'}' +

'DIV.rate_it_display_names A{' +
'	color: #333333 ! important;' +
'}' +

'DIV.rate_it_display_names A:visited{' +
'	color: #FF0000 ! important;' +
'}' +

'DIV.rate_it_display_names:hover {' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'}' +

//Killed Garry's image, and added transparency.
'DIV.rate_bar {' +
'	color: #ddd ! important;' +
'	background-image: url() ! important;' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'	opacity: 0.8 ! important;' +
'	filter: Alpha(opacity=80) ! important;' +
'	width: 135px ! important;' +
'	height: 100px ! important;' +
'}' +

//Neat Rate Hover SHit
'DIV.inner A.rate_button:hover {' +
'	opacity: 0.7 ! important;' +
'	filter: Alpha(opacity=70) ! important;' +
'}' +

'DIV.rate_bar DIV.inner{' +
'	padding: 0px' +
'}' +

'DIV.inner DIV.rate_text {' +
'	white-space: nowrap;' +
'}' +

'DIV.SpecialPages {' +
'	background-color: #111 ! important;' +
'	border: 1px solid #01A3E5 ! important;' +
'}' +

'A.disabledlink {' +
'	color: #aaa ! important;' +
'}' +

//New Thread
'.cbutton {' +
'	color: #fff ! important;' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'}' +

'.cbutton:hover {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:link {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:visited {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:hover, .vbmenu_control a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'#navbar {' +
'	background-color: #335533 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'.tpagnav, .tpagnavdisabled {' +
'	background-color: #01A3E5 ! important;' +
'	border-left: 0px #050 solid ! important;' +
'	border-top: 0px #050 solid ! important;' +
'	border-bottom: 0px #050 solid ! important;' +
'	border-right: 0px #050 solid ! important;' +
'	background-color: #0a0a0a ! important;' +
'}' +

'.tpagnavdisabled A {' +
'	color: #500 ! important;' +
'}' +

//Odd numbered threads (forumdisplay.php)
'TD.thread {' +
'	background-color: #338833 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Even numbered threads (forumdisplay.php)
'TD.threadb{' +
'	background-color: #335533 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Odd numbered thread info (forumdisplay.php)
'TD.thread_small {' +
'	background-color: #335533 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Even numbered thread info (forumdisplay.php)
'TD.thread_smallb {' +
'	background-color: #338833 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadsticky{' +
'	background-color: #f8c850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadbsticky{' +
'	background-color: #d8b850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallsticky {' +
'	background-color: #d8b850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallbsticky {' +
'	background-color: #f8c850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadold {' +
'	background-color: #101010 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadbold{' +
'	background-color: #202020 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallold {' +
'	background-color: #202020 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallbold {' +
'	background-color: #101010 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threaddeleted {' +
'	background-color: #200000 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threaddeleted_small{' +
'	background-color: #300000 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Thread Links
'TD.thread A:visited, TD.threadb A:visited, TD.thread_small A:visited, TD.thread_smallb A:visited{' +
'	color: #0d0 ! important;' +
'}' +

'TD.thread A, TD.thread_smallb A {' +
'	color: #335533 ! important;' +
'}' +

'TD.threadb A, TD.thread_small A {' +
'	color: #338833 ! important;' +
'}' +

//Older Thread Links
'TD.threadold A:visited, TD.thread_smallbold A:visited {' +
'	color: #337733 ! important;' +
'}' +

'TD.threadbold A:visited, TD.thread_smallold A:visited {' +
'	color: #33AA33 ! important;' +
'}' +

'TD.threadold A, TD.thread_smallbold A {' +
'	color: #335533 ! important;' +
'}' +

'TD.threadbold A, TD.thread_smallold A {' +
'	color: #338833 ! important;' +
'}' +

//How many new posts a thread has
'DIV.newposts {' +
'	background-image: url( \'images/smilies/emot-sax.png\' ) ! important;' +
'	background-color: #101010 ! important;' +
'	border: 0px solid #888 ! important;' +
'	padding: 4px 4px 4px 30px ! important;' +
'}' +

'DIV.newposts:hover {' +
'	background-color: #202020 ! important;' +
'	border-color: #888 ! important;' +
'}' +

'DIV.newposts A {' +
'	color: #f00 ! important;' +
'}' +

'DIV.newposts A:visited {' +
'	color: #f00 ! important;' +
'}' +

//Post SHit
'DIV.postbit {' +
'	width: 100% ! important;' +
'	background-image: url() ! important;' +
'	background-repeat: repeat-n ! important;' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'	overflow: hidden ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	margin-bottom: 12px ! important;' +
'	margin-top: 12px ! important;' +
'}' +

'DIV.postbitalt {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px solid #888 ! important;' +
'	border-right: 0px solid #888 ! important;' +
'}' +

'DIV.postbitalt {' +
'	background-color: #3e3e3e ! important;' +
'}' +


'DIV.postbit div.message {' +
'	margin-left:150px ! important;' +
'}' +


//Message Text
'DIV.postbit div.message div.messagetext {' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'}' +

//Release Tags
'DIV.postbit div.message div.messagetext div {' +
'	color: #161 ! important;' +
'}' +

//Time posted, and my post-hider button
'DIV.postbit div.header {' +
//'	background-image: url( \'http://garry.tv/img/str2.gif\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	color: #333333 ! important;' +
'	border-left: 0px #090 solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 0px #090 solid ! important;' +
'}' +

//User Info
'DIV.postbit div.userinfo {' +
'	background-color: #224422 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	padding-bottom: 32767px ! important;' +
'	margin-bottom: -32767px ! important;' +
'}' +

//Reply, edit, and reporting
'DIV.postbit div.footer {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'	padding-left: 160px ! important;' +
'}' +

'DIV.postbit div.header A {' +
'	color: #fff ! important;' +
'}' +

//New shit, subject to change
//Post SHit
'DIV.postbitnew {' +
'	width: 100% ! important;' +
'	background-image: url() ! important;' +
'	background-repeat: repeat-n ! important;' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'	overflow: hidden ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	margin-bottom: 12px ! important;' +
'	margin-top: 12px ! important;' +
'}' +

'DIV.postbitnew div.message {' +
'	margin-left:150px ! important;' +
'}' +

//Message Text
'DIV.postbitnew div.message div.messagetext {' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'}' +

//Release Tags
'DIV.postbitnew div.message div.messagetext div {' +
'	color: #161 ! important;' +
'}' +

//Time posted, and my post-hider button
'DIV.postbitnew div.header {' +
//'	background-image: url( \'http://garry.tv/img/str2.gif\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	color: #333333 ! important;' +
'	border-left: 0px #090 solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 0px #090 solid ! important;' +
'}' +

//User Info
'DIV.postbitnew div.userinfo {' +
'	background-color: #224422 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	padding-bottom: 32767px ! important;' +
'	margin-bottom: -32767px ! important;' +
'}' +

//Reply, edit, and reporting
'DIV.postbitnew div.footer {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'	padding-left: 160px ! important;' +
'}' +

'DIV.postbitnew div.header A {' +
'	color: #fff ! important;' +
'}' +

//ENd new shit

'td.vBulletin_editor {' +
'	background-color: #444 ! important;' +
'	color: #ddd ! important;' +
'}' +

//White, as per request.
'textarea {' +
'	background-color: #fff ! important;' +
'	color: #111 ! important;' +
'	border-left: 1px #777 solid ! important;' +
'	border-top: 1px #777 solid ! important;' +
'	border-bottom: 1px #777 solid ! important;' +
'	border-right: 1px #777 solid ! important;' +
'}' +

//DOn't remember
'table {' +
'	background-color: #335533 ! important;' +
'	color: #111 ! important;' +
'	border-left: 0px #777 solid ! important;' +
'	border-top: 0px #777 solid ! important;' +
'	border-bottom: 0px #777 solid ! important;' +
'	border-right: 0px #777 solid ! important;' +
'}' +

//Fixes CODE TAGS, makes it legible.
'.code {' +
'	background-color: #111 ! important;' +
'	color: #ddd ! important;' +
'}' +

//Lua Tags
'.lua {' +
'	background-color: #111 ! important;' +
'	color: #ddd ! important;' +
'}' +

//? people viewing crap
'span.threadviewers {' +
'	background-color: #111 ! important;' +
'	color: #090 ! important;' +
'	border: 1px solid #090 ! important;' +
'	float: right ! important;' +
'	margin-top: -13px ! important;' +
'	margin-right: 80px ! important;' +
'}' +

//fixes shitty fonts in Iframes, among other things.
'html {' +
'	font: 13px System ! important;' +
'	color: #eee ! important;' +
'}' +

'#posts {' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'}' +

//Experimental
'INPUT.bginput, TEXTAREA {' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'}' +

'table, div, p, body, a, tr, td, span, thead, strong, form, input, textarea, select, option, optgroup, legend {' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}'
//END

/*
//
//Handy Functions
//
*/

//Append Javascript
function ADDJSString_Page(string) {
	var theheader, modheader, addeditem, add2;
	theheader = document.getElementsByTagName('head');
	modheader = theheader[0];
	addeditem = document.createElement('script');
	addeditem.type = 'text/javascript';
	add2 = document.createTextNode( string )
	addeditem.appendChild( add2 )
	modheader.appendChild( addeditem );
};

function getCookie(c_name){
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		};
	};
	return "";
};

//Backwords compatibiity with old GMs
function stylemolestsrc(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('link');
	style.rel = 'stylesheet';
	style.src = css;
	head.appendChild(style);
}

// filched from Ain't It Readable
// http://diveintomark.org/projects/greasemonkey/
// This overrides the default style with my whatever I want.
function stylemolest(css) {
	var head, style, magicalico;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
};

/*
//
//Functions that get added to the page to provide access
//to the Greasemonkey configs for this script
//
*/

//Management of the blacklist
unsafeWindow.manageblistnames =  function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		var name = prompt("Enter a Username", "Type the name here");
		var realshitlist = GM_getValue("slistarray", 'fake1,fake2');
		realshitlist = realshitlist.split(',')
		var finished = false;
	
		for (var x=0; x<shitlist.length; x++) {
			var thisblistitem = realshitlist[x];
		
			if ( name == thisblistitem ) {
				alert('User is already in the list')
				finished = true;
			};
		};
		if ( !finished ) {
			var willyou = confirm('Add user to blacklist?')
			if (willyou){
				alert('Added ' + name);
				realshitlist[realshitlist.length] = name;
				var thefork = realshitlist.toString()
				GM_setValue("slistarray", thefork );
			}
			else{
			alert('Didn\'t add ' + name);
			};
		};
	//End Gay wrapper
	}, 0);
};
//Remove a name from the blacklist
unsafeWindow.remblistname =  function( name ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		//var name = prompt("Enter a Username", "Type the name here");
		var realshitlist = GM_getValue("slistarray", 'fake1,fake2');
		realshitlist = realshitlist.split(',')
		//var finished = false;
	
		for (var x=0; x<shitlist.length; x++) {
			var thisblistitem = realshitlist[x];
		
			if ( name == thisblistitem ) {
				var willyou = confirm('User is already in the list, remove?')
				if (willyou){
					alert('Removed ' + name);
					realshitlist.splice(x,1);
					var thefork = realshitlist.toString()
					GM_setValue("slistarray", thefork );
				}
				else{
					alert('Keeping ' + name);
				};
				finished = true;
			};
		};
	//End Gay wrapper
	}, 0);
};
//EPIC MUSIC BABY
unsafeWindow.toggepicmusic = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("epicmusic", false ) == true ){
			GM_setValue("epicmusic", false );
			alert('Epic Music Disabled');
			return;
		};
		if (GM_getValue("epicmusic", false ) == false ){
			GM_setValue("epicmusic", true );
			alert('Epic Music Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Removes that gay snow effect, currently obsolete
unsafeWindow.toggsnowkill = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("snowkill", false ) == true ){
			GM_setValue("snowkill", false );
			alert('SnowKill Disabled');
			return;
		};
		if (GM_getValue("snowkill", false ) == false ){
			GM_setValue("snowkill", true );
			alert('Snowkill Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Toggle the blacklist
unsafeWindow.blocklist = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("blocklist", false ) == true ){
			GM_setValue("blocklist", false );
			alert('Blacklist Disabled');
			return;
		};
		if (GM_getValue("blocklist", false ) == false ){
			GM_setValue("blocklist", true );
			alert('Blacklist Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Notification on blocked posts/threads
unsafeWindow.blocknotify = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("blocknotify", false ) == true ){
			GM_setValue("blocknotify", false );
			alert('Block Notify Disabled');
			return;
		};
		if (GM_getValue("blocknotify", false ) == false ){
			GM_setValue("blocknotify", true );
			alert('Block Notify Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Toggle the OIFY skinning
unsafeWindow.oifyskinning = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("oifyskin", false ) == true ){
			GM_setValue("oifyskin", false );
			alert('InternalCss Disabled');
			return;
		};
		if (GM_getValue("oifyskin", false ) == false ){
			GM_setValue("oifyskin", true );
			alert('InternalCssEnabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Loading of an external stylesheet, OIFY only
unsafeWindow.externcssOIFY =  function( name ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		var css1 = prompt("Url for CSS (OIFY)", "Type here (blank for none)");
	
		var willyou = confirm('Are you sure?')
		if (willyou){
			alert('CSS Selected');
			GM_setValue("extocss", css1 );;
		} else {
			alert('No External CSS');
		};
	//End Gay wrapper
	}, 0);
};
//Loaging of an external stylesheet for normal FP 
unsafeWindow.externcssNFP =  function( name ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		var css2 = prompt("Url for CSS (Normal FP)", "Type here (blank for none)");
	
		var willyou = confirm('Are you sure?')
		if (willyou){
			alert('CSS Selected');
			GM_setValue("extncss", css2 );
		} else {
			alert('No External CSS');
		};
	//End Gay wrapper
	}, 0);
};
//Background image, OIFY
unsafeWindow.setcssback =  function( name ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		var css2 = prompt("Url for Image (Background)", "http://www.garry.tv/img/trip/gr-bk.gif");
	
		var willyou = confirm('Are you sure?')
		if (willyou){
			alert('CSS Selected');
			GM_setValue("cssbackgr", css2 );
		} else {
			alert('No Background Change');
		};
	//End Gay wrapper
	}, 0);
};
//Pseudo sigs togge
unsafeWindow.pseudosigs = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("pseudosigs", false ) == true ){
			GM_setValue("pseudosigs", false );
			alert('PseudoSigs Disabled');
			return;
		};
		if (GM_getValue("pseudosigs", false ) == false ){
			GM_setValue("pseudosigs", true );
			alert('PseudoSigs Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Fake little html parser, toggle
unsafeWindow.pseudohtml = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("pseudohtml", false ) == true ){
			GM_setValue("pseudohtml", false );
			alert('PseudoHTML Disabled');
			return;
		};
		if (GM_getValue("pseudohtml", false ) == false ){
			GM_setValue("pseudohtml", true );
			alert('PseudoHTML Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};
//Linfeeder toggle
unsafeWindow.linefeeder = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("linefeeder", false ) == true ){
			GM_setValue("linefeeder", false );
			alert('LineFeeder Disabled');
			return;
		};
		if (GM_getValue("linefeeder", false ) == false ){
			GM_setValue("linefeeder", true );
			alert('LineFeeder Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};

/*
//
//Gay menus, and the page functions asscoiated with them
//
*/

//button for the menu itself
function Menu_button_add(parm) {
	var baseel = document.evaluate("//div/div/table/tbody/tr[2]/td/ul", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var crapmenuitem = document.createElement('li')
	crapmenuitem.ID = "tbcal"
	crapmenuitem.innerHTML = "<a onclick=\"return ToggleDiv('ListFaceRaper', true);\" href=\"#\">FaceRaper..</a>"
	baseel.appendChild(crapmenuitem)
	
	//Ban Bypass
	if ( myfnlocation.search(/showthread.php/) != -1 || myfnlocation.search(/newreply.php/) != -1) {
		
		if ( myfnlocation.search(/showthread.php/) != -1 ) {
			var baseel2 = document.getElementById("vB_Editor_QR").childNodes[1];
		} else if  ( myfnlocation.search(/newreply.php/) != -1 ) {
			var baseel2 = document.evaluate("//div/div/fieldset[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		};
	
		//Please don't delete this...
		if ( isoify ) {
			//Ban Bypass
			var crapmenuitem1 = document.createElement('div')
			crapmenuitem1.className = "cbutton"
			crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('banbypass', true);\">Banword Bypass</a>"
			baseel2.appendChild(crapmenuitem1)
	
			//Doubleposter
			crapmenuitem1 = document.createElement('div')
			crapmenuitem1.className = "cbutton"
			crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('dpostfag', true);\">Doublepost</a>"
			baseel2.appendChild(crapmenuitem1)
		};
	
		//EMote List
		crapmenuitem1 = document.createElement('div')
		crapmenuitem1.className = "cbutton"
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('demotefag', true);\">Emote List</a>"
		baseel2.appendChild(crapmenuitem1)
	};
	
};

//Extra User Crap
function Upanel_Setup(param) {
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner, crapmenuitemx;

	//SHitty Menu
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.top = 0
	crapmenushell.style.left = 0
	crapmenushell.style.width = "auto"
	crapmenushell.id = "ListFaceRaper"
		
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "inline"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.style.cssFloat = "left"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('ListFaceRaper', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
	
	//Inner
	crapmenuinner = document.createElement('div')
	crapmenuinner.id = "InnerFaceRaper"
	crapmenuinner.style.clear = "both"
	crapmenushell.appendChild(crapmenuinner)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('cookiefag', true);\">Cookies</a> - TEST"
	crapmenuinner.appendChild(crapmenuitem1)
	
	//UserCP EX
	if( myfnlocation.indexOf("member.php?u="+ getCookie('bbuserid')) == -1 ){
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('ucp_ex', true);\">UserCP EX</a> - TEST"
		crapmenuinner.appendChild(crapmenuitem1)
	};
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('fr_cfg', true);\">Script CFG</a> - TEST"
	crapmenuinner.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('faggotsinhere', true);\">Blacklist CFG</a> - TEST"
	crapmenuinner.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ToggleDiv('css_cfg', true);\">Style CFG</a> - TEST"
	crapmenuinner.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};


/*
//
//Crap Setup
//
*/

//Banword Bypass...
function BanBypass_Setup(param) {
	//Please don't delete this...
	if ( !isoify ) { return; }
	
	var mycruddyjs;
	var textelid, textelname, brotherelem, cocksdiv, cockstxt, cocksscr, cocksscrT;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3;
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		if( !document.getElementById("vB_Editor_QR") ){ return; }
		textelid = "vB_Editor_QR_textarea";
		brotherelem = document.getElementById("vB_Editor_QR").childNodes[1].childNodes[0];
		textelname = "Quick Reply"
	} else if ( myfnlocation.search(/newreply.php/) != -1 ) {
		textelid = "vB_Editor_001_textarea";
		brotherelem = findallposts=document.evaluate("//input[@name='preview']",
									document,
									null,
									XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
									null).snapshotItem(0);
		
		textelname = "Advanced Reply"
	} else {
		textelid = "COCKFIGHT"
	};
	
	if ( textelid != "COCKFIGHT" ) {
		mycruddyjs = "function RapeMYFace( rapemeth ) {" +
"	var quickreplys = document.getElementById('" + textelid + "');" +
"		if (quickreplys) {" +
"			var textcopy = quickreplys.value;" +
"			var rapedtext = '';" +
"			if ( rapemeth == 0 ) {" +
"				var cockless = ['[b]PENIS[/b]', '[i]PENIS[/i]', '[B]PENIS[/B]', '[I]PENIS[/I]'];" +
"				var pooponme = '[b]PENIS[/b]';" +
"				var methotype = ' BBcode (old)';" +
"			} else if ( rapemeth == 1 ) {" +
"				var cockless = ['[b] [/b]PENIS', '[i] [/i]PENIS', '[B] [/B]PENIS', '[I] [/I]PENIS'];" +
"				var pooponme = '[b] [/b]PENIS';" +
"				var methotype = ' BBcode (new)';" +
"			} else if ( rapemeth == 2 ) {" +
"				var cockless = ['\u008FPENIS', '\u008DPENIS', '\u009DPENIS'];" +
"				var pooponme = '\u008FPENIS';" +
"				var methotype = ' Unicode (single)';" +
"			} else if ( rapemeth == 3 ) {" +
"				var cockless = ['\u008FPENIS\u008F', '\u008DPENIS\u008D', '\u009DPENIS\u009D'];" +
"				var pooponme = '\u008FPENIS\u008F';" +
"				var methotype = ' Unicode (double)';" +
"			} else if ( rapemeth == 4 ) {" +
"				var cockless = ['[b] [/b]PENIS', '[i] [/i]PENIS', '[B] [/B]PENIS', '[I] [/I]PENIS', '\u008FPENIS', '\u008DPENIS', '\u009DPENIS'];" +
"				var pooponme = '[b] [/b]PENIS';" +
"				var methotype = ' Paranoid (lol)';" +
"			} else if ( rapemeth == 5 ) {" +
"				var cockless = ['[noparse]PENIS[/noparse]', '[noparse]PENIS[/noparse]'];" +
"				var pooponme = '[b] [/b]PENIS';" +
"				var methotype = ' Noparse (new)';" +
"			} else if ( rapemeth == 6 ) {" +
"				var cockless = ['[b][i][/b][/i]PENIS', '[i][b][/i][/b]PENIS', '[I][B][/I][/B]PENIS', '[B][I][/B][/I]PENIS'];" +
"				var pooponme = '[b] [/b]PENIS';" +
"				var methotype = ' Bad BBCode (lol)';" +
"			} else {" +
"				var cockless = ['ERROR', 'BITCH', 'AT', 'MORPHOLOGY53'];" +
"				var pooponme = 'ERROR';" +
"				var methotype = ' OSHI-';" +
"			};" +
"			for (var n=0; n< textcopy.length; n++) {" +
"				if ( textcopy.charCodeAt(n) > 122 || textcopy.charCodeAt(n) < 65) {" +
"					rapedtext = rapedtext + textcopy.charAt(n);" +
"				} else {" +
"					pooponme = cockless[ Math.floor(Math.random() * cockless.length) ];" +
"					pooponme = pooponme.replace(/PENIS/, textcopy.charAt(n) );" +
"					rapedtext = rapedtext + pooponme;" +
"				};" +
"			};" +
"			quickreplys.value = rapedtext;" +
"			alert('"+ textelname +"'+ methotype +' Done!');" +
"		} else {" +
"		alert('"+ textelname +"'+ methotype +' Failed!');" +
"	};" +
"};"

		ADDJSString_Page(mycruddyjs);
		
		//SHitty Menu
		crapmenushell = document.createElement('div')
		crapmenushell.className = "SpecialPages"
		crapmenushell.style.display = "none"
		crapmenushell.style.width = "auto"
		crapmenushell.id = "banbypass"
		//Toggle Button
		crapmenuitem2 = document.createElement('div')
		crapmenuitem2.className = "cbutton"
		crapmenuitem2.style.display = "block"
		crapmenuitem2.style.marginLeft = "0px"
		crapmenuitem2.setAttribute("onclick", "return ToggleDiv('banbypass', false);")
		crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
		crapmenushell.appendChild(crapmenuitem2)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<blink><span class='highlight' style='font-size: 13px;'>WARNING! - Deprecated!!</span></blink>"
		crapmenushell.appendChild(crapmenuitem1)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 0 ); return ToggleDiv('banbypass', true);\">BBCode Rape (old)</a> -- Uses BBCode to Bypass Smartness (h2ooooo)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 2
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 1 ); return ToggleDiv('banbypass', true);\">BBCode Rape (new)</a> -- Uses BBCode to Bypass Smartness, newer algorithm (h2ooooo)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 3
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 2 ); return ToggleDiv('banbypass', true);\">Unicode Rape (single)</a> -- Uses Invalid Unicode Characters to Bypass Smartness (Dustyjo)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 4
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 3 ); return ToggleDiv('banbypass', true);\">Unicode Rape (double)</a> -- Uses Invalid Unicode Characters to Bypass Smartness (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 5
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 4 ); return ToggleDiv('banbypass', true);\">Hail Mary (wut)</a> -- Uses Both Methods to Bypass Smartness (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 6
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 5 ); return ToggleDiv('banbypass', true);\">Noparse</a> -- Uses Noparse Tags to Bypass Smartness (TOMPCpl)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 7
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFace( 6 ); return ToggleDiv('banbypass', true);\">Bad BBcode (new)</a> -- Uses Improper BBCode to Bypass Smartness (h2ooooo)"
		crapmenushell.appendChild(crapmenuitem1)
		
		bodyel.appendChild( crapmenushell );
	};
};

//Cookie viewer
function Cookies_Setup(param) {
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner;
		
	//SHitty Menudocument
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.width = "auto"
	crapmenushell.id = "cookiefag"
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('cookiefag', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
		
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<blink><span class='highlight' style='font-size: 13px;'>WARNING! - INSECURE!!</span></blink>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Lastvisit
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span style='font-size: 13px;'>bblastvisit:"+ getCookie('bblastvisit') + "</span> -- <a href='#' onclick=\"delete_cookie( 'bblastvisit' ); return false;\">Delete</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Sessionhash
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span style='font-size: 13px;'>bbsessionhash:"+ getCookie('bbsessionhash') + "</span> -- <a href='#' onclick=\"delete_cookie( 'bbsessionhash' ); return false;\">Delete</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Userid
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span style='font-size: 13px;'>bbuserid:"+ getCookie('bbuserid') + "</span> -- <a href='#' onclick=\"delete_cookie( 'bbuserid' ); return false;\">Delete</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Password
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span style='font-size: 13px;'>bbpassword:<blink><span class='highlight' style='font-size: 13px;'>REMOVED!!</span></blink></span> -- <a href='#' onclick=\"delete_cookie( 'bbpassword' ); return false;\">Delete</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//bblastactivity
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span style='font-size: 13px;'>bblastactivity:"+ getCookie('bblastactivity') + "</span><a href='#' onclick=\"delete_cookie( 'bblastactivity' ); return false;\">Delete</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};

//Posthider and back to top buttons
function PostBitPlus_Setup(param){
	var findallposts, foundapost, creatthebutton, createtheimg;
	findallposts=document.evaluate("//div[@class='postbit']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	var mycruddyjs =
//The Post Hider Crap
'function TogglePost( id ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.childNodes[3].style.display == \'none\') {' +
'		panel.childNodes[3].style.display = \'\';' +
'		panel.childNodes[5].style.display = \'\';' +
'		panel.childNodes[7].style.display = \'\';' +
'	}' +
'	else {' +
'		panel.childNodes[3].style.display = \'none\';' +
'		panel.childNodes[5].style.display = \'none\';' +
'		panel.childNodes[7].style.display = \'none\';' +
'	}' +

'	return false;' +
'};' +

//This works better for most stuff, like tables
'function ToggleElementEX( id ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.style.display == \'none\') {' +
'		panel.style.display = \'\';' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +

'	return false;' +
'};'
ADDJSString_Page(mycruddyjs)
		
	for (var i = 0; i < findallposts.snapshotLength; i++) {
		foundapost = findallposts.snapshotItem(i);
		//safetychecks
		if ( foundapost.childNodes[1].className == 'header'){
		
			//Post Hider
			creatthebutton = document.createElement('a');
			creatthebutton.setAttribute("onclick", 'return TogglePost( \''+ foundapost.id + '\');');
			creatthebutton.href = '#';
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-eek.png';
			createtheimg.title = 'Hide/Unhide Post'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[3] );
			
			//Back to top
			creatthebutton = document.createElement('a');
			creatthebutton.href = '#poststop';
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-rolleye.png';
			createtheimg.title = 'Go to Top'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[1].firstChild );
			
			//Pseudo Sigs
			if (GM_getValue("pseudosigs", false ) == true ){
				if ( foundapost.childNodes[3].childNodes[1].className == "rate_it_icon" ) {
					var poopy = foundapost.childNodes[3].childNodes[3].childNodes[1].href.replace(/member/gi, "image")
				} else {
					var poopy = foundapost.childNodes[3].childNodes[1].childNodes[1].href.replace(/member/gi, "image")
				};
				
				createtheimg = document.createElement('img');
				createtheimg.style.cssText = "vertical-align:left; display: block;";
				createtheimg.src = poopy +'&type=profile';
				createtheimg.title = 'Profile Picture'
				foundapost.childNodes[5].childNodes[1].appendChild( document.createElement('br') );
				foundapost.childNodes[5].childNodes[1].appendChild( createtheimg );
			};
		};
	};
	
	
	//New stuff, Will optomize later
	findallposts=document.evaluate("//div[@class='postbitnew']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < findallposts.snapshotLength; i++) {
		foundapost = findallposts.snapshotItem(i);
		//safetychecks
		if ( foundapost.childNodes[1].className == 'header'){
		
			//Post Hider
			creatthebutton = document.createElement('a');
			creatthebutton.setAttribute("onclick", 'return TogglePost( \''+ foundapost.id + '\');');
			creatthebutton.href = '#';
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-eek.png';
			createtheimg.title = 'Hide/Unhide Post'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[3] );
			
			//Back to top
			creatthebutton = document.createElement('a');
			creatthebutton.href = '#poststop';
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-rolleye.png';
			createtheimg.title = 'Go to Top'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[1].firstChild );
			
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-sax.png';
			createtheimg.title = 'Freshly Pooped!'
			createtheimg.style.cssText = 'border: 1px solid black; margin-right: 5px; margin-left: -36px;'
			foundapost.childNodes[1].insertBefore( createtheimg, foundapost.childNodes[1].childNodes[3] );
			
			//Pseudo Sigs
			if (GM_getValue("pseudosigs", false ) == true ){
				if ( foundapost.childNodes[3].childNodes[1].className == "rate_it_icon" ) {
					var poopy = foundapost.childNodes[3].childNodes[3].childNodes[1].href.replace(/member/gi, "image")
				} else {
					var poopy = foundapost.childNodes[3].childNodes[1].childNodes[1].href.replace(/member/gi, "image")
				};
				
				createtheimg = document.createElement('img');
				createtheimg.style.cssText = "vertical-align:left; display: block;";
				createtheimg.src = poopy +'&type=profile';
				createtheimg.title = 'Profile Picture'
				foundapost.childNodes[5].childNodes[1].appendChild( createtheimg );
			};
		};
	};
};

//Ucpex
function Ucp_Setup(param) {
	if( myfnlocation.indexOf("member.php?u="+ getCookie('bbuserid')) != -1 ){ return; }
	if( !myusername ){ return; }
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner;
	var rapeiframe;
	var mynameel = myusername.childNodes[1].childNodes[1].firstChild.nodeValue.replace(/Hello, /gi, "")		
	
	//SHitty Menudocument
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.width = "auto"
	crapmenushell.id = "ucp_ex"
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('ucp_ex', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
		
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span class='highlight' style='font-size: 13px;'>"+ mynameel + "</span>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Image
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<img style='' src='http://forums.facepunchstudios.com/image.php?u="+ getCookie('bbuserid') + "'></img>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return ShowRateBox( "+ getCookie('bbuserid') + ", this );\">Your Ratings</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"return OpenEvent( 'user="+ getCookie('bbuserid') + "' );\">Your Events</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://forums.facepunchstudios.com/images.php?uid="+ getCookie('bbuserid') + "'>Your Images</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://forums.facepunchstudios.com/search.php?do=finduser&u="+ getCookie('bbuserid') + "'>Your Posts</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://forums.facepunchstudios.com/search.php?do=process&showposts=0&starteronly=1&exactname=1&searchuser="+ mynameel + "'>Your Threads</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://archive.facepunchstudios.com/user/?userid="+ getCookie('bbuserid') + "'>Archived Posts</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};

//cfg
function CFG_Setup(param) {
	if( myfnlocation.indexOf("member.php?u="+ getCookie('bbuserid')) != -1 ){ return; }
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner;
	var rapeiframe;
		
	//SHitty Menudocument
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.width = "auto"
	crapmenushell.id = "fr_cfg"
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('fr_cfg', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
		
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span class='highlight' style='font-size: 13px;'>Settings</span>"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"toggepicmusic();\">Epic Music: <span class='highlight'>"+ GM_getValue("epicmusic", false ) +"</span></a> - Oify Music"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"toggsnowkill();\">Snow Killer: <span class='highlight'>"+ GM_getValue("snowkill", false ) +"</span></a> - Kill the snow script"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"blocklist();\">Blacklist: <span class='highlight'>"+ GM_getValue("blocklist", false ) +"</span></a> - Clientside Ignore list"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"blocknotify();\">Notify Blocked: <span class='highlight'>"+ GM_getValue("blocknotify", false ) +"</span></a> - Popup on blocked users"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"pseudosigs();\">PseudoSigs (BETA): <span class='highlight'>"+ GM_getValue("pseudosigs", false ) +"</span></a> - Append the user Profile Pic to every post"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"pseudohtml();\">PseudoHTML (BETA): <span class='highlight'>"+ GM_getValue("pseudohtml", false ) +"</span></a> - Enables HTML"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"linefeeder();\">Linefeeder (BETA): <span class='highlight'>"+ GM_getValue("linefeeder", false ) +"</span></a> - Removes massive ammounts of Linefeeds"
	crapmenushell.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};

//cfg
function CSSSHIT_Setup(param) {
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner;
	var rapeiframe;
		
	//SHitty Menudocument
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.width = "auto"
	crapmenushell.id = "css_cfg"
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('css_cfg', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
		
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span class='highlight' style='font-size: 13px;'>CSS Settings</span>"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"oifyskinning();\">Internal CSS (OIFY): <span class='highlight'>"+ GM_getValue("oifyskin", false ) +"</span></a> - Ovverides External CSS"

	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"setcssback();\">Internal CSS Background: <span class='highlight'>"+ GM_getValue("cssbackgr", "http://www.garry.tv/img/trip/gr-bk.gif" ) +"</span></a> - Internal CSS ONLY"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"externcssOIFY();\">Extra CSS (OIFY): <span class='highlight'>"+ GM_getValue("extocss", "" ) +"</span></a> - Url for custom css"
	crapmenushell.appendChild(crapmenuitem1)
	
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='#' onclick=\"externcssNFP();\">Extra CSS (Normal FP): <span class='highlight'>"+ GM_getValue("extncss", "" ) +"</span></a> - Url for custom css"
	crapmenushell.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};

//Automerge Bypass...
function DPostFag_Setup(param) {
	//Please don't delete this...
	if ( !isoify ) { return; }

	var mycruddyjs;
	var textelid, textelname, brotherelem, cocksdiv, cockstxt, cocksscr, cocksscrT;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3;
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		if( !document.getElementById("vB_Editor_QR") ){ return; }
		textelid = "vB_Editor_QR_textarea";
		brotherelem = document.getElementById("vB_Editor_QR").childNodes[1].childNodes[0];
		textelname = "Quick Reply"
	} else if ( myfnlocation.search(/newreply.php/) != -1 ) {
		textelid = "vB_Editor_001_textarea";
		brotherelem = findallposts=document.evaluate("//input[@name='preview']",
									document,
									null,
									XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
									null).snapshotItem(0);
		
		textelname = "Advanced Reply"
	} else {
		textelid = "COCKFIGHT"
	};
	
	if ( textelid != "COCKFIGHT" ) {
		mycruddyjs = "function RapeMYFriend( rapemeth ) {" +
"	var quickreplys = document.getElementById('" + textelid + "');" +
"		if (quickreplys) {" +
"			var textcopy = quickreplys.value;" +
"			var rapedtext = '';" +
"			if ( rapemeth == 0 ) {" +
"				var cockless = ['[img]http://www.garry.tv/img/str1.gif[/img]', '[img]http://www.garry.tv/img/str2.gif[/img]'];" +
"				var pooponme = '[img]http://www.garry.tv/img/str1.gif[/img]';" +
"				var methotype = ' Flashing Pattern';" +
"				var thepower = 30;" +
"			} else if ( rapemeth == 1 ) {" +
"				var cockless = [':sax:', ':scax:'];" +
"				var pooponme = ':sax:';" +
"				var methotype = ' Emotes (saxy)';" +
"				var thepower = 12;" +
"			} else if ( rapemeth == 2 ) {" +
"				var cockless = ['[img]http://j-walk.com/other/annoying/27.gif[/img]', '[img]http://j-walk.com/other/annoying/18.gif[/img]', '[img]http://j-walk.com/other/annoying/19.gif[/img]'];" +
"				var pooponme = ':sax:';" +
"				var methotype = ' Annoying Gifs';" +
"				var thepower = 21;" +
"			} else if ( rapemeth == 3 ) {" +
"				var cockless = ['[img]http://users.nac.net/falken/annoying/images/backgrounds/a026.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a011.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a006.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a008.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a090.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a129.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a096.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a029.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a133.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a138.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a151.jpg[/img]', '[img]http://users.nac.net/falken/annoying/images/backgrounds/a153.jpg[/img]'];" +
"				var pooponme = ':sax:';" +
"				var methotype = ' Trippy Gifs';" +
"				var thepower = 21;" +
"			} else if ( rapemeth == 4 ) {" +
"				var cockless = [" +
//CraptasketV2
"'[img]http://forums.facepunchstudios.com/image.php?u=102395[/img]'," +
//Nc321
"'[img]http://forums.facepunchstudios.com/image.php?u=104613[/img]'," +
//Bizurkur
"'[img]http://forums.facepunchstudios.com/image.php?u=84950[/img]'," +
//Tastelikchkn
"'[img]http://forums.facepunchstudios.com/image.php?u=67671[/img]'," +
//noclip321
"'[img]http://forums.facepunchstudios.com/image.php?u=80652[/img]'," +
//ANNHILATORv2
"'[img]http://forums.facepunchstudios.com/image.php?u=62488[/img]'," +
//SnarkY
"'[img]http://forums.facepunchstudios.com/image.php?u=32156[/img]'," +
//h2ooooooo
"'[img]http://forums.facepunchstudios.com/image.php?u=102923[/img]'," +
//Butthurter
"'[img]http://forums.facepunchstudios.com/image.php?u=113486[/img]'," +
//Greeman
"'[img]http://forums.facepunchstudios.com/image.php?u=66253[/img]'," +
//Loompa Lord
"'[img]http://forums.facepunchstudios.com/image.php?u=80474[/img]'," +
//BlackBirdNL
"'[img]http://forums.facepunchstudios.com/image.php?u=48845[/img]'," +
//SpaceMadness
"'[img]http://forums.facepunchstudios.com/image.php?u=102418[/img]'," +
//Sonic_l0lz
"'[img]http://forums.facepunchstudios.com/image.php?u=89817[/img]'," +
//Dr. Naomi
"'[img]http://forums.facepunchstudios.com/image.php?u=69454[/img]'," +
//ANNHILATOR
"'[img]http://forums.facepunchstudios.com/image.php?u=45441[/img]'," +
//ANNHILATORv3
"'[img]http://forums.facepunchstudios.com/image.php?u=101744[/img]'," +
//hybrid_theory
"'[img]http://forums.facepunchstudios.com/image.php?u=1541[/img]'," +
//Craptasket
"'[img]http://forums.facepunchstudios.com/image.php?u=50699[/img]'," +
//Kevlar
"'[img]http://forums.facepunchstudios.com/image.php?u=61775[/img]'," +
//Erwin Yin
"'[img]http://forums.facepunchstudios.com/image.php?u=78319[/img]'," +
//Elijah
"'[img]http://forums.facepunchstudios.com/image.php?u=45227[/img]'," +
//dustyjo
"'[img]http://forums.facepunchstudios.com/image.php?u=5323[/img]'," +
//Membrane
"'[img]http://forums.facepunchstudios.com/image.php?u=27139[/img]'," +
//Darth Fungus
"'[img]http://forums.facepunchstudios.com/image.php?u=4847[/img]'];" +
"				var pooponme = '[img]http://forums.facepunchstudios.com/image.php?u=104613[/img]';" +
"				var methotype = ' Avatars';" +
"				var thepower = 30;" +

"			} else {" +
"				var cockless = ['ERROR', 'BITCH', 'AT', 'MORPHOLOGY53'];" +
"				var pooponme = 'ERROR';" +
"				var methotype = ' OSHI-';" +
"				var thepower = 9;" +
"			};" +
"			for (var n=0; n< thepower; n++) {" +
"				pooponme = cockless[ Math.floor(Math.random() * cockless.length) ];" +
"				rapedtext = rapedtext + pooponme;" +
"			};" +
"			quickreplys.value = rapedtext + '[url=www.NoSmartnessLoss.com][/url]\\n' + textcopy;" +
"			alert('"+ textelname +"'+ methotype +' Done!');" +
"		} else {" +
"		alert('"+ textelname +"'+ methotype +' Failed!');" +
"	};" +
"};"
		ADDJSString_Page(mycruddyjs);
		
		//SHitty Menu
		crapmenushell = document.createElement('div')
		crapmenushell.className = "SpecialPages"
		crapmenushell.style.display = "none"
		crapmenushell.style.width = "auto"
		crapmenushell.id = "dpostfag"
		//Toggle Button
		crapmenuitem2 = document.createElement('div')
		crapmenuitem2.className = "cbutton"
		crapmenuitem2.style.display = "block"
		crapmenuitem2.style.marginLeft = "0px"
		crapmenuitem2.setAttribute("onclick", "return ToggleDiv('dpostfag', false);")
		crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
		crapmenushell.appendChild(crapmenuitem2)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<blink><span class='highlight' style='font-size: 13px;'>WARNING! - BETA!!</span></blink>"
		crapmenushell.appendChild(crapmenuitem1)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFriend( 0 ); return ToggleDiv('dpostfag', true);\">Flashing Pattern (BETA)</a> -- Uses Images to allow Double Posting (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 2
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFriend( 1 ); return ToggleDiv('dpostfag', true);\">Emotes (saxy)</a> -- Uses Emotes to allow Double Posting (Elitetech)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 2
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFriend( 2 ); return ToggleDiv('dpostfag', true);\">Annoying Gifs</a> -- Uses Annoying Gifs to allow Double Posting (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 2
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFriend( 3 ); return ToggleDiv('dpostfag', true);\">Trippy Gifs</a> -- Uses Trippy Gifs to allow Double Posting (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 2
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYFriend( 4 ); return ToggleDiv('dpostfag', true);\">Avatars</a> -- Uses User Avatars to allow Double Posting (Morphology53)"
		crapmenushell.appendChild(crapmenuitem1)
		
		bodyel.appendChild( crapmenushell );
	};
};

//EMotefag...
function DEMoteFag_Setup(param) {
	var mycruddyjs;
	var textelid, textelname, brotherelem, cocksdiv, cockstxt, cocksscr, cocksscrT;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3;
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		if( !document.getElementById("vB_Editor_QR") ){ return; }
		textelid = "vB_Editor_QR_textarea";
		brotherelem = document.getElementById("vB_Editor_QR").childNodes[1].childNodes[0];
		textelname = "Quick Reply"
	} else if ( myfnlocation.search(/newreply.php/) != -1 ) {
		textelid = "vB_Editor_001_textarea";
		brotherelem = findallposts=document.evaluate("//input[@name='preview']",
									document,
									null,
									XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
									null).snapshotItem(0);
		
		textelname = "Advanced Reply"
	} else {
		textelid = "COCKFIGHT"
	};
	
	if ( textelid != "COCKFIGHT" ) {
		mycruddyjs = "function RapeMYEMote( rapemeth ) {" +
"	var quickreplys = document.getElementById('" + textelid + "');" +
"		if (quickreplys) {" +
"			var textcopy = quickreplys.value;" +
"			var slicedtxtsrt = textcopy.slice(0,quickreplys.selectionStart);" +
"			var slicedtxtend = textcopy.slice(quickreplys.selectionStart,quickreplys.value.length);" +
//Copys
"			var dbacksrt = quickreplys.selectionStart;" +
"			var dbackend = quickreplys.selectionEnd;" +

"			quickreplys.value = slicedtxtsrt + rapemeth + slicedtxtend;" +
"			quickreplys.selectionStart = eval(dbacksrt + ' + ' + rapemeth.length);" +
"			quickreplys.selectionEnd = eval(dbackend + ' + ' + rapemeth.length);" +
//"			alert('"+ textelname +" DOne!');" +
"		} else {" +
"		alert('"+ textelname +" Failed!');" +
"	};" +
"};"
		ADDJSString_Page(mycruddyjs);
		
		//SHitty Menu
		crapmenushell = document.createElement('div')
		crapmenushell.className = "SpecialPages"
		crapmenushell.style.display = "none"
		crapmenushell.style.width = "140px"
		crapmenushell.id = "demotefag"
		//Toggle Button
		crapmenuitem2 = document.createElement('div')
		crapmenuitem2.className = "cbutton"
		crapmenuitem2.style.display = "block"
		crapmenuitem2.style.marginLeft = "0px"
		crapmenuitem2.setAttribute("onclick", "return ToggleDiv('demotefag', false);")
		crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
		crapmenushell.appendChild(crapmenuitem2)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<blink><span class='highlight' style='font-size: 13px;'>WARNING! - BETA!!</span></blink>"
		crapmenushell.appendChild(crapmenuitem1)
		
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':sax:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-sax.png' title='SAX'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':ninja:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-ninja.gif' title='Ninja'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':q:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-q.png' title='Q'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':crying:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-crying.gif' title='Q'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':monocle:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-monocle.gif' title='monocle'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':quagmire:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-quagmire.gif' title='quagmire'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':raise:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-raise.gif' title='Raise'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':silent:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-silent.png' title='Silent'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':question:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-question.gif' title='Question'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':sigh:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-sigh.gif' title='Sigh'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':v:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-v.png title='V'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':fap:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-fap.gif' title='Fap'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':megamonoc' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-megamonocle.gif' title='Megamonocle'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':emo:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-emo.gif' title='Emo'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':goatse:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-goatse.gif' title='goatse'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':keke:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-keke.png' title='keke'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':confused:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/confused.png' title='Confused'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':cop:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-cop.gif' title='Cop'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':words:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-words.gif' title='Words'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':eek:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-eek.png' title='eek'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':ghost:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-ghost.gif' title='Ghost'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':rolleye:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-rolleye.png' title='Rolleye'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':downs:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-downs.png' title='Downs'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':zoid:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-zoid.gif' title='Zoid'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':siren:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-siren.gif' title='SIren'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':cthulhu:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-cthulhu.gif' title='SAX'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':3:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/3.gif' title='Ninja'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':4chan:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/4chan.gif' title='Q'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':argh:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-argh.gif' title='argh'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':scax:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-scax.png' title='monocle'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':o' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/redface.png' title='quagmire'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		//SHitty Menu Item 1
		crapmenuitem1 = document.createElement('span')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"RapeMYEMote( ':cow:' ); return false;\"><img src='http://forums.facepunchstudios.com/images/smilies/emot-cow.gif' title='COw'/></a>"
		crapmenushell.appendChild(crapmenuitem1)
		
		bodyel.appendChild( crapmenushell );
	};
};

//Blocklist cfg
function IGNORE_Setup(param) {

	//SHitty Menudocument
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.width = "auto"
	crapmenushell.id = "faggotsinhere"
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('faggotsinhere', false);")
	crapmenuitem2.innerHTML = "<span class=''>Toggle</span>"
	crapmenushell.appendChild(crapmenuitem2)
		
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<span class='highlight' style='font-size: 13px;'>Ignored Users</span> <a href='#' onclick=\"manageblistnames(); return false;\">Add</a>"
	crapmenushell.appendChild(crapmenuitem1)
	
	var realshitlist = GM_getValue("slistarray", 'fake1,fake2');
	realshitlist = realshitlist.split(',')
	
	for (var x=0; x<shitlist.length; x++) {
		var thisblistitem = realshitlist[x];
		
		crapmenuitem1 = document.createElement('p')
		crapmenuitem1.innerHTML = "<a href='#' onclick=\"remblistname('"+ thisblistitem +"')\">"+ x +". <span class='highlight'>"+ thisblistitem +"</span></a> - Blarg"
		crapmenushell.appendChild(crapmenuitem1)
	};

	
	bodyel.appendChild( crapmenushell );
};

/*
//
//Functions that simply do work, depending on the client's settings.
//
*/

function EMusic_Setup(param) {
	if (GM_getValue("epicmusic", false ) == false || !isoify ) { return; }
	var newembed, newobj, newparam, findbody, themusic;
	themusic = FunkyMusicTable[ eval( "Math.floor( FunkyMusicTable.length * Math.random())" )]
	findbody = document.getElementsByTagName('body')[0];
	
	newobj = document.createElement('table');
	newobj.innerHTML = '<tr><td>'+
'		<OBJECT id=\'mediaPlayer\' width="320" height="70"'+
'		classid=\'CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95\''+
'		codebase=\'http:\/\/activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,02,902\''+
'		standby=\'Loading Microsoft Windows Media Player components...\' type=\'application/x-oleobject\'>'+
'		<param name=\'fileName\' value=\'http://www.garry.tv/img/'+ themusic +'\'>'+
'		<param name=\'animationatStart\' value=\'true\'>'+
'		<param name=\'transparentatStart\' value=\'true\'>'+
'		<param name=\'autoStart\' value="true">'+
'		<param name=\'showControls\' value="false">'+
'		<param name=\'playCount\' value="666">'+
'		<param name=\'Volume\' value="100">'+
'		<param name=\'uiMode\' value="invisible">'+
'		<EMBED type=\'application/x-mplayer2\''+
'		pluginspage=\'http:\/\/microsoft.com/windows/mediaplayer/en/download/\''+
'		id=\'mediaPlayer\' name=\'mediaPlayer\' displaysize=\'4\' autosize=\'-1\''+
'		bgcolor=\'darkblue\' showcontrols="false" showtracker=\'-1\' playcount=\'666\' Volume="100"'+
'		showdisplay=\'0\' showstatusbar=\'-1\' videoborder3d=\'-1\' width="320" height="70"'+
'		src=\'http://www.garry.tv/img/'+ themusic +'\' autostart="true" designtimesp=\'5311\'>'+
'		</EMBED>'+
'		</OBJECT>'+
'		</td></tr>';

	findbody.appendChild( newobj );
};

function snowkill() {
	//Fuck the snow
	if (GM_getValue("snowkill", false ) == false ) { return; }
	ADDJSString_Page('function snowIE_NS6( id ) { }');
	ADDJSString_Page('function SnowStorm() { }');
	
	var findsnow, foundsnow;
	findsnow=document.evaluate("//div[starts-with(normalize-space(@id),'dot') and string-length(normalize-space(@id)) = 4]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < findsnow.snapshotLength; i++) {
		foundsnow = findsnow.snapshotItem(i);
		foundsnow.parentNode.removeChild(foundsnow);
	}	
};

//My evil ignore list
function ignorethreads (param) {
	if (GM_getValue("blocklist", false ) == false) { return; }
	if (myfnlocation.search(/forumdisplay/) == -1) { return; }

	var allthreads, thisthread, thisblistitem, poop, thrtital, pageelem, foundpageelem, dupeheader;
	var ntr, ntxt1, na1, ntd, ndiv, ntb, ntable, ntbdy;
	allthreads=document.evaluate("//tr/td[2]/div/a[contains(@href,'member.php')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		//html/body/blink/div/div/div[6]/form/table[3]/tbody/tr[5]/td[2]/div[2]/a

	//Create the table to stuff these fuckers in
	ntable = document.createElement('table')
	ntable.id = 'cockbiterlist'
	ntable.className = 'tborder'
	ntable.width = "100%"
	ntable.cellSpacing = "0"
	ntable.cellPadding = "5"
	ntable.border = "0"
	ntable.align = "center"
	ntable.style.borderStyle = 'solid'
	ntable.style.borderColor = 'rgb(136, 136, 136)'
	ntable.style.borderWidth = '1px 1px 1px 1px'
	ntable.style.display = 'none'
		
	ntbdy = document.createElement('tbody')
	
	ndiv = document.createElement('div')
	ndiv.className = "tcat"
	ndiv.setAttribute("onclick", 'return ToggleElementEX( \'cockbiterlist\');')
	
	ntxt1 = document.createTextNode( 'Click here to see Ignored Threads' )
	ndiv.appendChild( ntxt1 )
	
	dupeheader = document.evaluate("//form/table[3]/tbody/tr",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null).snapshotItem(0)
	if ( dupeheader != undefined ){
		dupeheader = dupeheader.cloneNode(true);
		ntbdy.appendChild( dupeheader );
	};

	for (var i = 0; i < allthreads.snapshotLength; i++) {
	
		thisthread = allthreads.snapshotItem(i);
		poop = thisthread.firstChild
		
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			
			if ( poop.nodeValue == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED USER==' + poop.nodeValue);
				};
				
				thrtital = thisthread.parentNode.parentNode.parentNode.cloneNode(true);
				//thisthread.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( thrtital );
				ntbdy.appendChild( thrtital );
				thisthread.parentNode.parentNode.parentNode.parentNode.removeChild( thisthread.parentNode.parentNode.parentNode );
			};
		};
	};
	pageelem=document.evaluate("//div[@class='page']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	foundpageelem = pageelem.snapshotItem(0);
	ntable.appendChild( ntbdy );
	foundpageelem.appendChild( ndiv );
	foundpageelem.appendChild( ntable );
};

function ignoreposts(param) {
	if (GM_getValue("blocklist", false ) == false) { return; }
	if (myfnlocation.search(/showthread/) == -1) { return; }

	var allthreads, thisthread, thisblistitem, poop, thrtital;
	allthreads=document.evaluate("//a[@class='bigusername']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allthreads.snapshotLength; i++) {
		thisthread = allthreads.snapshotItem(i);
		poop = thisthread.firstChild
		
		if ( poop.nodeName != "#text" ) {
			poop = poop.firstChild
			if ( poop.nodeName != "#text" ) {
				poop = poop.firstChild
			};
		};
		
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			
			if ( poop.nodeValue == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED USER==' + poop.nodeValue);
				};
					
				thisthread.parentNode.parentNode.parentNode.childNodes[3].style.display = 'none';
				thisthread.parentNode.parentNode.parentNode.childNodes[5].style.display = 'none';
				thisthread.parentNode.parentNode.parentNode.childNodes[7].style.display = 'none';
			};
		};
	};
};

function ignorequotes(param) {
	if (GM_getValue("blocklist", false ) == false) { return; }
	if (myfnlocation.search(/showthread/) == -1) { return; }

	var allthreads, thisthread, thisblistitem, poop, thrtital;
	var newlink;
	allthreads=document.evaluate("//div[@class='quotename']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < allthreads.snapshotLength; i++) {
		thisthread = allthreads.snapshotItem(i);
		poop = thisthread.childNodes[1].firstChild
		
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			
			if ( poop.nodeValue == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED QUOTE FROM USER==' + poop.nodeValue);
				};
				
				newlink = document.createElement('a')
				newlink.href = "#";
				newlink.innerHTML = "SHOW ";
				newlink.setAttribute("onclick", "this.parentNode.parentNode.childNodes[3].style.display = ''; return false;")
				thisthread.insertBefore( newlink, thisthread.firstChild );
				
				thisthread.parentNode.childNodes[3].style.display = 'none';
			};
		};
	};
};

//Stylistic Shit
function ExternCss_Setup(param) {

	if ( isoify ) {
		if (GM_getValue("oifyskin", false ) == true ){
			document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = 'http://forums.facepunchstudios.com/styles.css';
			stylemolest( phallic );
		} else {
			if ( GM_getValue("extocss", '' ) != '' ) {
				document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = GM_getValue("extocss", '' );
			};
		};
	} else {
		if ( GM_getValue("extncss", '' ) != '' ) {
			document.evaluate("//link[@href='/styles.css?2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = GM_getValue("extncss", '' );
		};
	};
	
	//This fucked shit up
	getfiles=document.evaluate("//link[@href='/file_styles.css?6']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if(getfiles.snapshotLength > 0 ){
		foundfile = getfiles.snapshotItem(0);
		foundfile.parentNode.removeChild(foundfile)
	};
};

//Page rape
//Reporting...
function Pagerape_reports(param) {
	//Please don't delete this...
	if ( !isoify ) { return; }
	
	var reporting,thisreport,newreport;
	reporting=document.evaluate("//a[ starts-with(@href,'/report.php?' ) ]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < reporting.snapshotLength; i++) {
		thisreport = reporting.snapshotItem(i);
	
		newreport = document.createTextNode( oifyreporttext );

		thisreport.removeChild(thisreport.firstChild)
		thisreport.appendChild(newreport)
	};
};

//HTML...
function D_HTMLFagSetup(param) {
	if (GM_getValue("pseudohtml", false ) == false ){ return; }
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		//ENum all posts
		var themessages = document.evaluate("//div[@class='messagetext']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for (var i = 0; i < themessages.snapshotLength; i++) {
			var thisthread = themessages.snapshotItem(i);
			var poo = thisthread.innerHTML
			poo = poo.replace(/&gt;/g,">");
			poo = poo.replace(/&lt;/g,"<");
			thisthread.innerHTML = poo;
		};
	} else {
		//Do nothing
	};
}

//linefeeder...
function D_LINEFagSetup(param) {

	if (GM_getValue("linefeeder", false ) == false ){ return; }
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		//ENum all posts
		var themessages = document.evaluate("//div[@class='messagetext']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for (var i = 0; i < themessages.snapshotLength; i++) {
			var thisthread = themessages.snapshotItem(i);
			var poo = thisthread.innerHTML
			
			poo = poo.replace(/<br>\n<br>\n<br>\n/g,"");
			thisthread.innerHTML = poo;
		};
	
	} else {
		//Do nothing
	};
}

/*
//
//Now that everyting is defined, call them
//
*/

//Call the Scripts
ADDJSString_Page(pooscr);
Menu_button_add('p');
D_HTMLFagSetup('p');
D_LINEFagSetup('p');
//ADDJSInc_Page()
Upanel_Setup('p');
BanBypass_Setup('p');
Cookies_Setup('p');
PostBitPlus_Setup('p');
Ucp_Setup('p');
CFG_Setup('p');
EMusic_Setup('p');
snowkill();
IGNORE_Setup();
ExternCss_Setup();
ignorethreads();
ignoreposts();
ignorequotes();
CSSSHIT_Setup();
Pagerape_reports();
DPostFag_Setup();
DEMoteFag_Setup();
//Pagerape_setup();