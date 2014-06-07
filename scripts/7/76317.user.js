// ==UserScript==
// @name           Custom Bnet Skin V3
// @namespace      www.bungie.net
// @description    Lets you customise the bungie.net theme to your likings.
// @include        http://*bungie.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://github.com/malsup/corner/raw/master/jquery.corner.js
// @version        3.2
// ==/UserScript==
//robby118<3
function setCookie(value) {
	var date = new Date();
	date.setTime(date.getTime()+(1000*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = "CBS"+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]).replace(/&nbsp;/g, " "));
	else
		setCookie("000000,000000,71caef,Off");
}

var CBS_arr = getCookie('CBS').split(',');
var Head = document.getElementsByTagName("head").item(0);
var Styles = [document.createElement("style")];
var CBS_Settings_Box_HTML = "#CBS_settings_header{color:#FCC79E;} #CBS_settings_link{color:#bbfcee;}"+
		"#CBS_settings_box{position:fixed;top:120px;width:100%; height:500px;z-index:9000;display:none;}"+
		"#CBS_outer_box{background:#39907D;width:610px; height:420px; margin-left:auto; margin-right:auto;padding:5px 5px 5px 5px;}"+
		"#CBS_inner_box{background:#bbfcee;width:600px; height:410px; margin:5px 5px 5px 5px;}"+
		"#CBS_box_content{padding:10px; color:#000000;}"+
		".input{margin-top:10px;} .CBS_input{background:#FCC79E; color:#CB6312; border: thin solid #39907D;}"+
		"#CBS_close{ background:#9D0101; color:#FFC8C8; font-style:bold; border: thin solid #FF8484; position:absolute; margin-left:300px;}"+
		"#colorpicker{position:absolute;left:600px;top:60px;}";
function CBS(BG,NAV,LINK,STATUS){
	if(STATUS == 'On'){
		Styles[0].innerHTML = "body {background: url(http://apx.comlu.com/uploads/bg.png) #"+BG+" repeat-x fixed;} a {color: #"+LINK+";} a:link {color: #"+LINK+";} a:visited {color: #"+LINK+"; } a:hover {color: #fff;} a:active {color: #"+LINK+";} div.sContent-head {background:url(http://apx.comlu.com/uploads/navtop.png) #"+NAV+" repeat-x;} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: #"+NAV+";}"+CBS_Settings_Box_HTML;
	}
	else{
		Styles[0].innerHTML = CBS_Settings_Box_HTML;
	}
}

CBS(CBS_arr[0],CBS_arr[1],CBS_arr[2],CBS_arr[3]);
Head.appendChild(Styles[0]);
var footer_link = document.getElementById('ctl00_footer_fMenuControl_rptMenu_ctl02_rptSubMenu_ctl02_hypMenu');
var CBS_settings_header = document.createElement('li');
CBS_settings_header.setAttribute("id", "CBS_settings_header");
CBS_settings_header.innerHTML = 'Custom Bnet Skin';
footer_link.parentNode.insertBefore(CBS_settings_header, footer_link.nextSibling);
var CBS_settings_link = document.createElement('li');
CBS_settings_link.setAttribute("id", "CBS_settings_link");
CBS_settings_link.innerHTML = '<a id="CBS_settings_link" href="javascript: void(0);">CBS settings</a>';
CBS_settings_header.parentNode.insertBefore(CBS_settings_link, CBS_settings_header.nextSibling);
var CBS_settings_box = document.createElement('div');
CBS_settings_box.setAttribute("id", "CBS_settings_box");
CBS_settings_box.innerHTML = '<div id="CBS_outer_box"><div id="CBS_inner_box"><div id="CBS_box_content"><span style="font-size:20px; font-style:bold; text-decoration:underline;">Custom Bnet Skins <span style="font-size:10px;">v.3 by apocalypex</span></span><input type="button" id="CBS_close" value="X"><br><div class="input">Navbar Color:<BR><input type="textfield" maxlength="7" class="CBS_input" value=""></div><div class="input">Background Color:<BR><input type="textfield" maxlength="7" class="CBS_input" value=""></div><div class="input">Link Color(Default #71caef):<BR><input type="textfield" maxlength="7" class="CBS_input" value=""></div><div class="input"><input type="button" id="CBS_save" value="Save" style="background:#FCC79E; color:#CB6312; border: thin solid #39907D; margin-left:93px;"></div><div id="colorpicker" align="right"></div><div class="toggler"><form><input type="checkbox" id="toggle" name="Toggle" value="" /> <span id="STATUS"></span></form></div></div></div></div>';
var colorpicker = '<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="350" height="350"><param name="movie" value="http://www.2createawebsite.com/build/color.swf"><param name="quality" value="High"><embed src="http://www.2createawebsite.com/build/color.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="obj1" width="350" height="350" quality="High"></object>';
document.getElementById('CBS_settings_link').addEventListener('click', Open, true);

function Open(){
	document.body.appendChild(CBS_settings_box);
	$("#CBS_outer_box").corner("10px");
	$(document).ready(function(){
	$("#CBS_settings_box").fadeIn("slow",function(){document.getElementById('colorpicker').innerHTML = colorpicker;});});
	var CBS_bg_color = document.getElementsByClassName("CBS_input").item(0);
	var CBS_nav_color = document.getElementsByClassName("CBS_input").item(1);
	var CBS_link_color = document.getElementsByClassName("CBS_input").item(2);
	CBS_nav_color.value="#"+CBS_arr[0];
	CBS_bg_color.value="#"+CBS_arr[1];
	CBS_link_color.value="#"+CBS_arr[2];

	if(CBS_arr[3] == "On")
		document.getElementById('STATUS').innerHTML = '<BR>Tick = Turn off<BR> No-Tick = Turn on<BR><BR><span style="font-size:20px;color:#007B04;font-style:bold;">STATUS: ONLINE :)<span>';
	else{
		document.getElementById('STATUS').innerHTML = '<BR>Tick = Turn off<BR> No-Tick = Turn on<BR><BR><span style="font-size:20px;color:#FF0000;font-style:bold;">STATUS: OFFLINE :(<span>';
		document.getElementById("toggle").setAttribute('checked','checked');
	}
	document.getElementById('CBS_close').addEventListener('click', Close, true);
	document.getElementById('CBS_save').addEventListener('click', Savesettings, true);
}

function Close(){
	document.getElementById('colorpicker').innerHTML = '';
	$("#CBS_settings_box").fadeOut("slow",function(){CBS_settings_box.parentNode.removeChild(CBS_settings_box);});	
}
function Status(){
	var CBS_toggler = document.getElementById("toggle");
	if(CBS_toggler.checked)
		return "Off";
	else
		return "On";
}
function Savesettings(){
	var CBS_nav_color = document.getElementsByClassName("CBS_input").item(0);
	var CBS_bg_color = document.getElementsByClassName("CBS_input").item(1);
	var CBS_link_color = document.getElementsByClassName("CBS_input").item(2);
	var CBS_bg = CBS_bg_color.value.replace('#','');
	var CBS_nav = CBS_nav_color.value.replace('#','');
	var CBS_link = CBS_link_color.value.replace('#','');
	setCookie(CBS_bg+","+CBS_nav+","+CBS_link+","+Status())
	if(Status() == "On"){
		document.getElementById('STATUS').innerHTML = '<BR>Tick = Turn off<BR> No-Tick = Turn on<BR><BR><span style="font-size:20px;color:#007B04;font-style:bold;">STATUS: ONLINE :)<span>';
		Styles[0].innerHTML = "body {background: url(http://apx.comlu.com/uploads/bg.png) #"+CBS_bg+" repeat-x fixed;} a {color: #"+CBS_link+";} a:link {color: #"+CBS_link+";} a:visited {color: #"+CBS_link+"; } a:hover {color: #fff;} a:active {color: #"+CBS_link+";} div.sContent-head {background:url(http://apx.comlu.com/uploads/navtop.png) #"+CBS_nav+" repeat-x;} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: #"+CBS_nav+";}"+CBS_Settings_Box_HTML;}
	else{
		document.getElementById('STATUS').innerHTML = '<BR>Tick = Turn off<BR> No-Tick = Turn on<BR><BR><span style="font-size:20px;color:#FF0000;font-style:bold;">STATUS: OFFLINE :(<span>';
		Styles[0].innerHTML = CBS_Settings_Box_HTML;
}
	alert("Saved! - "+getCookie('CBS'));
}