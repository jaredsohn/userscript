/*
 *  By: HT
 *  Update: 21 Aug 2007
 *
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 *
 */


// ==UserScript==
// @name           Hattrick Plus
// @namespace      Shinu
// @description    Añade nuevas opciones a Hattrick.
// @include        http://www*.hattrick.org/Common/*
// ==/UserScript==


// Constants
const maxteams = 10;
const maxplayers = 15;
const timeout = 8;	 	// in minutes
const sep = ";";		// Don't change this value!

const c_friends = "Amics";
const c_in = "a";
const c_group = "Grup";
const c_match = "&Uacute;ltim partit";
const c_help = "AJUDA";
const c_name = "equips";

const c_briefcase = "Cartera";
const c_of = "del";
const c_player = "jugadors";
const c_country = "Nacionalitat";
const c_position = "Demarcaci&oacute;";
const c_tsi = "TSI";
const c_wage = "Sou";
const c_limit = "L&iacute;mit";
const c_startprice = "Preu de sortida";
const c_max = "Major oferta";
const c_nosell = "El jugador no est&agrave; en venda";
const c_nooffer = "Sense ofertes"

const c_css = "css";

const c_state = "Estat";
const c_stype = new Array("Desconnectat", "Connectat");

const c_addfriend = "Afegir amic";
const c_delfriend = "Eliminar amic";

const add_fcorrect = "Equip afegit correctament.";
const add_ferror = new Array("Ja tens el màxim nombre d'equips.", "Aquest equip ja és a la llista d'amics.");
const del_fcorrect = "Equip eliminat correctament.";

const c_addplayer = "Afegir a la cartera";
const c_delplayer = "Treure de la cartera";

const add_pcorrect = "Jugador afegit correctament.";
const add_perror = new Array(	"Ja tens el màxim nombre de jugadors a la cartera.",
								"Aquest jugador ja és a la cartera.");
const del_pcorrect = "Jugador eliminat correctament.";

const a_id1 = "id1";
const a_id2 = "id2";

// CSS
const css_offlineC = "red";
const css_onlineC = "black";

const css_right = 	"#offline { color: " + css_offlineC + "; }\n" + 
					"#online { color: " + css_onlineC + "; }";

// Banners
const b_menutype = "div";
const b_menuclass = "intel";
const b_headerid = "banner";

// URIs
const url_team = "/teamDetails.asp?teamID=";
const url_team1 = "/teamDetails.asp?";
const url_team2 = "teamID=";
const url_country = "/leagueSystemDetails.asp?leagueID=";
const url_league = "/leagueDetails.asp?leagueLevelUnitID=";
//const url_matches = "/matchesArchive.asp?TeamID=";
const url_matches = "/matches.asp?TeamID=";
const url_report = "/matchDetails.asp?matchID=";
const url_player = "/playerDetails.asp";
const url_play = "/playerDetails.asp?playerID=";
const url_first = "/myHattrick.asp";
const url_firstbis = "/start.asp";
const url_css = "/Common/Css/themes/standard/main.css";


// Variables globals
// Teams:
/////////////
var team = new Array(maxteams);
var country = new Array(maxteams);
for(i=0; i<maxteams; i++)
	country[i] = new Array(2);
var league = new Array(maxteams);
for(i=0; i<maxteams; i++)
	league[i] = new Array(3);
var state = new Array(maxteams);
var match = new Array(maxteams);
for(i=0; i<maxteams; i++)
	match[i] = new Array(3);

// Players:
/////////////
var player = new Array(maxplayers);
var playerteam = new Array(maxplayers);
for(i=0; i<maxplayers; i++)
	playerteam[i] = new Array(2);
var coun = new Array(maxplayers);
for(i=0; i<maxplayers; i++)
	coun[i] = new Array(2);
var det = new Array(maxplayers);
for(i=0; i<maxplayers; i++)
	det[i] = new Array(3);
var major = new Array(maxplayers);
for(i=0; i<maxplayers; i++)
	major[i] = new Array(3);
var data = new Array(maxplayers);
for(i=0; i<maxplayers; i++)
	data[i] = new Array(2);


//////////////////////////////
////                      ////
////    START FUNCTION    ////
////                      ////
//////////////////////////////

function start(){
	switch(this.name){
		case "header":
			deleteHeaderBanner(b_headerid);
			break;
		case "menu":
			deleteMenuBanner(b_menutype, b_menuclass);
			
			if(getParameter("showMenu") == "isupporter"){
				noSupporter();
				getInfo();
			}
			break;
		case "main":
			GM_addStyle(css_right);
			
			if(actualUrl(url_team1) && actualUrl(url_team2)){
				addMenu();
			}
			
			if(actualUrl(url_first) || actualUrl(url_firstbis)){
				checkCss();
			}
			
			if(actualUrl(url_player)){
//				if(document.getElementsByName("bid").length > 0 || playerExist(getParameter("playerID"))){
				addPlayerOptions();
//				}
			}
			break;
	}
}



////////////////////////////////
////                        ////
////     MAIN FUNCTIONS     ////
////                        ////
////////////////////////////////

function noSupporter(){
	var supporter = document.getElementsByTagName("a");
	var new_p1, new_p2, new_a1, new_a2;
	
	for (var i = 0, j = supporter.length; i < j; i++){
		if(supporter[i].href.indexOf("aboutSupporter.asp?action=noSubscription") != -1 ){
			supporter[i].style.display = "none";
			if(supporter[i].nextSibling.tagName == "BR"){
				supporter[i].nextSibling.style.display = "none";
			}
			else{
				new_p1 = document.createElement("p");
				new_p1.innerHTML = "- ";
				new_p1.setAttribute("style", "margin-top: 0px; margin-bottom: 0px");
				supporter[i].parentNode.appendChild(new_p1);
				new_a1 = document.createElement("a");
				new_a1.innerHTML = c_friends;
				new_a1.setAttribute("href", "javascript:void(0);");
				new_a1.setAttribute("target", "main");
				new_a1.addEventListener("click", friends, true);
				new_p1.appendChild(new_a1);
				
				new_p2 = document.createElement("p");
				new_p2.innerHTML = "- ";
				new_p2.setAttribute("style", "margin-top: 0px; margin-bottom: 0px");
				supporter[i].parentNode.appendChild(new_p2);
				new_a2 = document.createElement("a");
				new_a2.innerHTML = c_briefcase;
				new_a2.setAttribute("href", "javascript:void(0);");
				new_a2.setAttribute("target", "main");
				new_a2.addEventListener("click", players, true);
				new_p2.appendChild(new_a2);
			}
		}
	}
}


function getInfo(){
	var teamid, teams = (GM_getValue(c_name) == undefined) ? GM_getValue(c_name) : GM_getValue(c_name).split(sep);
	var playerid, players = (GM_getValue(c_player) == undefined) ? GM_getValue(c_player) : GM_getValue(c_player).split(sep);
	
	if(teams != undefined){
		for(i=0; i < teams.length-1 && i < maxteams; i++){
			teamid = teams[i];
			if(teamid != "" && team[i] == undefined){
				getTeam(getUrl()+ url_team + teamid, i);
				getMatch(getUrl()+ url_matches + teamid, i);
			}
		}
	}
	
	if(players != undefined){
		for(i=0; i < players.length-1 && i < maxplayers; i++){
			playerid = players[i];
			if(playerid != "" && player[i] == undefined){
				getPlayer(getUrl()+ url_play + playerid, i);
			}
		}
	}
}


function deleteMenuBanner(type, name){
	var banner = getElementsByClassName(document, type, name);
	for (var i = 0, j = banner.length; i < j; i++)
		banner[i].style.display = "none";
}


function deleteHeaderBanner(name){
	var banner = document.getElementById(name);
	if(banner){
		banner.style.display = "none";
	}
}


function addMenu(){
	var select = document.getElementsByTagName("select");
	var option = select[0].options[1];
	var id = getParameter("TeamID");
	var op1;
	var op2;
	
	op1 = addOption("", "---", option);
	
	if(!teamExist(id)){
		op2 = addOption("", c_addfriend, option);
		op2.addEventListener("click", addFriend, true);
	}
	else{
		op2 = addOption("", c_delfriend, option);
		op2.addEventListener("click", delFriend, true);
	}
}


function addPlayerOptions(){
	var id = getParameter("playerID");
	var links = document.getElementsByTagName("a");
	var last = links[links.length-1].nextSibling.nextSibling;
	var new_a1, new_a2, new_br;
	
	new_a1 = addA(c_addplayer, a_id1, last);
	new_a1.addEventListener("click", addPlayer, true);
	
	new_br = document.createElement("br");
	last.parentNode.insertBefore(new_br, new_a1.nextSibling);
	
	new_a2 = addA(c_delplayer, a_id2, new_br);
	new_a2.addEventListener("click", delPlayer, true);
	
	if(playerExist(id)){
		new_a1.setAttribute("style", "display: none");
	}
	else{
		new_a2.setAttribute("style", "display: none");
	}
}


function addA(text, idvalue, before){
	var new_a = document.createElement("a");
	new_a.innerHTML = text;
	new_a.setAttribute("href", "javascript:void(0);");
	new_a.setAttribute("id", idvalue);
	before.parentNode.insertBefore(new_a, before);
	return new_a;
}


function checkCss(){
	var css = document.getElementsByTagName("link")[0].href;
	
	if(GM_getValue(c_css) != css.match(/http:..www\d*.hattrick.org(.*)/)[1]){
		GM_setValue(c_css, css.match(/http:..www\d*.hattrick.org(.*)/)[1]);
	}
}



////////////////////////////////
////                        ////
////      SECOND LEVEL      ////
////                        ////
////////////////////////////////

function friends() {
	var teams = (GM_getValue(c_name) == undefined) ? GM_getValue(c_name) : GM_getValue(c_name).split(sep);
	var teamid;
	var newwindow = window.open('','main');
	var tmp = newwindow.document;
	var header = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">\n' +
	'<html>\n<head>\n<meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT" />\n' +
	'<meta http-equiv="Content-Type" content="text/html; CHARSET=UTF-8" />\n' +
	'<link rel="stylesheet" href="' + (GM_getValue(c_css) == undefined ? url_css : GM_getValue(c_css)) + '" type="text/css" />\n' +
	'<title>Hattrick</title>\n' +
	'<script src="' + getUrl() + '/js/common.js" language="javascript" type="text/javascript"></script>\n' +
	'</head><body>';
	
	var end = '</body>\n</html>\n';
	
	var top = '<div id="headerBar" class="wide">\n' +
	'<div id="title"><a href="/Common/default.asp" target="_top">Hattrick</a> &raquo; '+ c_friends + '</div>\n' +
	'</div>';
	
	var contingut1 = '<table border="0" cellpadding="0" cellspacing="0" width="600">' +
	'<tbody><tr>' +
	'	<td width="10"> </td>' +
	'	<td valign="top" width="355">' +
	'		<table border="0" cellpadding="0" cellspacing="0" width="355">' +
	'		<tbody><tr>' +
	'			<td colspan="2" valign="top">' +
	'				<br>' +
	'				<h1>' + c_friends + '</h1>\n<br>\n<ol>\n';
	
	var contingut2 = '			</ol>\n' +
	'			<br>\n' +
	'			<br>\n' +
	'			</td>\n' +
	'		</tr>\n' +
	'		</tbody></table>\n' +
	'	</td>\n' +
	'	<td width="10"></td>\n' +
	'	<td valign="top" width="229">\n' +
	'		<br>\n' +
	'		<h3>'+ c_help +'</h3>\n' +
	'		<br>\n' +
	'		<a href="javascript:void(0);">Per implementar...</a><br>\n' +
	'	</td>\n' +
	'</tr>\n' +
	'</tbody></table>\n';
	
	if(teams != undefined){
		for(i=0; i < teams.length-1 && i < maxteams; i++){
			teamid = teams[i];
			if(teamid != "0"){
				if(team[i] == undefined){
					getTeam(getUrl()+ url_team + teamid, i);
					getMatch(getUrl()+ url_matches + teamid, i);
				}
				contingut1 += '				<li><a href="' + getUrl() + url_team + teamid + '">'  + team[i] + '</a> ' +
				c_in + ' <a href="' + getUrl() + url_country + country[i][1] + '">' + country[i][0] + '</a>\n' +
				'<table border="0" cellpadding="2" cellspacing="0"><tbody><tr><td><b>' + c_group + ':</b></td>\n' +
				'<td>' + league[i][0] + '<a href="' + getUrl() + url_league + league[i][1] + '">' + league[i][2] + '</a></td></tr>\n' +
				'<tr><td><b>' + c_match + ':</b></td><td><a href="' + getUrl() + url_report + match[i][0] + '">' + match[i][1] + '</a> '+ match[i][2] +'</td></tr>\n' +
				'<tr><td><b>' + c_state + ':</b></td><td>' + c_stype[state[i]] + '</td></tr>\n' +
				'</tbody></table></li>\n<br>\n';
			}
		}
	}
	tmp.write(header + top + contingut1 + contingut2 + end);
	tmp.close();
}


function players() {
	var players = (GM_getValue(c_player) == undefined) ? GM_getValue(c_player) : GM_getValue(c_player).split(sep);
	var playerid, date1 = new Date(), date2 = new Date(), limithour = new Date(), limitdate = new Date();
	var newwindow = window.open('','main');
	var tmp = newwindow.document;
	var header = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">\n' +
	'<html>\n<head>\n<meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT" />\n' +
	'<meta http-equiv="Content-Type" content="text/html; CHARSET=UTF-8" />\n' +
	'<link rel="stylesheet" href="' + (GM_getValue(c_css) == undefined ? url_css : GM_getValue(c_css)) + '" type="text/css" />\n' +
	'<title>Hattrick</title>\n' +
	'<script src="' + getUrl() + '/js/common.js" language="javascript" type="text/javascript"></script>\n' +
	'</head><body>';
	
	var end = '</body>\n</html>\n';
	
	var top = '<div id="headerBar" class="wide">\n' +
	'<div id="title"><a href="/Common/default.asp" target="_top">Hattrick</a> &raquo; '+ c_briefcase + '</div>\n' +
	'</div>';
	
	var contingut1 = '<table border="0" cellpadding="0" cellspacing="0" width="600">' +
	'<tbody><tr>' +
	'	<td width="10"> </td>' +
	'	<td valign="top" width="355">' +
	'		<table border="0" cellpadding="0" cellspacing="0" width="355">' +
	'		<tbody><tr>' +
	'			<td colspan="2" valign="top">' +
	'				<br>' +
	'				<h1>' + c_briefcase + '</h1>\n<br>\n<ol>\n';
	
	var contingut2 = '			</ol>\n' +
	'			<br>\n' +
	'			<br>\n' +
	'			</td>\n' +
	'		</tr>\n' +
	'		</tbody></table>\n' +
	'	</td>\n' +
	'	<td width="10"></td>\n' +
	'	<td valign="top" width="229">\n' +
	'		<br>\n' +
	'		<h3>'+ c_help +'</h3>\n' +
	'		<br>\n' +
	'		<a href="javascript:void(0);">Per implementar...</a><br>\n' +
	'	</td>\n' +
	'</tr>\n' +
	'</tbody></table>\n';
	
	if(players != undefined){
		for(var i=0; i < players.length-1 && i < maxplayers; i++){
			playerid = players[i];
			if(playerid != undefined){
				if(player[i] == undefined){
					getPlayer(getUrl()+ url_play + playerid, i);
				}
				
				if(det[i][1] != undefined){
					limithour = det[i][1].substring(det[i][1].lastIndexOf(" ")+1).split(":");
					limitdate = det[i][1].substr(0, det[i][1].indexOf(" ")).split("/");
					date2 = new Date(limitdate[2], limitdate[1], limitdate[0], limithour[0], limithour[1]);
					date2 = new Date(((date2-date1)/60000)-44639);
				}
				
				contingut1 += '<li><a href="' + getUrl() + url_play + playerid + '">'  + player[i] + '</a> ' +
				c_of + ' <a href="' + getUrl() + url_team + playerteam[i][0] + '">' + playerteam[i][1] + '</a>' +
				'<table border="0" cellpadding="2" cellspacing="0"><tbody>' +
				'<tr><td style="width: 95px"><b>' + c_country + ':</b></td>\n' +
				'<td>' + flag(coun[i][1], coun[i][0]) + ' <a href="' + getUrl() + url_country + coun[i][1] + '">' + coun[i][0] + '</a></td></tr>\n' +
				'<tr><td><b>' + c_position + ':</b></td>' +
				'<td>' + ((det[i][0] == undefined && data[i][0] != undefined) ? "?" : det[i][0]) + '</td></tr>\n' +
				'<tr><td><b>' + c_tsi + ':</b></td><td>' + data[i][0] + '</td></tr>\n' +
				'<tr><td><b>' + c_wage + ':</b></td><td>' + data[i][1] + '</td></tr>\n' +
				((det[i][0] == undefined && data[i][0] != undefined) ? '</table>\n' + c_nosell :
				'<tr><td><b>' + c_limit + ':</b></td><td><span style="color: ' +
				((date2 <= timeout) ? css_offlineC : css_onlineC) + '">' + det[i][1] + '</span></td></tr>\n' +
				'<tr><td><b>' + c_startprice + ':</b></td><td>' + det[i][2] + '</td></tr>\n' +
				'<tr><td><b>' + c_max + ':</b></td>\n' +
				'<td>' + ((major[i][0] == undefined) ? c_nooffer : major[i][0] + ' <a href="' + getUrl() + url_team + major[i][1] + '">' + major[i][2] + '</a></td></tr>\n') +
				'</tbody></table>' ) + '</li>\n<br>\n';
			}
		}
	}
	tmp.write(header + top + contingut1 + contingut2 + end);
	tmp.close();
}
function timeColor(time1, time2){
	
}

function getTeam(page, i) {
	GM_xmlhttpRequest({
		method:"POST",
		url:page,
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			var t = details.responseText.match(/<TD[^>]*><H1>(.*) <BDO[^>]*>/);
			var c = details.responseText.match(/leagueID=(\d+)\">(.*?)</);
			var l = details.responseText.match(/<\/TD><TD>(.*?)<.*?leagueLevelUnitID=(\d+)\">(.*?)</);
			
			if(details.responseText.match(/267[fF]30/)){
				state[i] = 1;
			}
			else{
				state[i] = 0;
			}
			
			if(t){
				team[i] = t[1];
			}
			
			if(c){
				country[i][0] = c[2];
				country[i][1] = c[1];
			}
			
			if(l){
				league[i][0] = l[1];
				league[i][1] = l[2];
				league[i][2] = l[3];
			}
		},
		data: ''
	});
}


function getMatch(page, i){
	GM_xmlhttpRequest({
		method:"POST",
		url:page,
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			var m = details.responseText.match(/matchID=(.*).>(.*)<\/A><\/TD>\s+.*\"ltr\">(.*?)<\/BDO><\/TD>\s+<\/TR>\s+<TR>\s+<TD ALIGN=\"left\" VALIGN=\"top\" COLSPAN=\"2\">/);
			if(m){
				match[i][0] = m[1];
				match[i][1] = m[2];
				match[i][2] = m[3];
			}
		},
		data: ''
	});
}


function getPlayer(page, i) {
	GM_xmlhttpRequest({
		method:"POST",
		url:page,
		headers:{
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/xml",
			"Content-type" : 'application/x-www-form-urlencoded'
		},
		onload:function(details) {
			var pt = details.responseText.match(/view.TeamID=(\d+).>.*?>(.*?)</);
			var p = details.responseText.match(/<h1 style=\"z-index:10\">\s+(.*) \(\d+\)/);
			var c = details.responseText.match(/leagueSystemID=(\d+). TARGET=\"menu\">(.*)</);
			var d = details.responseText.match(/NOWRAP.*\s+<TD>(.*?)<.*\s+.*\s+.*\s+.*\s+.*\s+(.*)/);
			var info = details.responseText.match(/<.H3>\s+<BR>\s+<B>.*:<\/B> (.*?)<.*\s+.*:<\/B> (.*)\s+.*\s+.*?:<\/B> (.*)/);
			var o = details.responseText.match(/\s+<BR><BR><B>.*<\/B><BR>\s+(.*?) <.*teamID=(\d+).>(.*?)</)
			
			if(pt){
				playerteam[i][0] = pt[1];
				playerteam[i][1] = pt[2];
			}
			
			if(p){
				player[i] = p[1];
			}
			
			if(c){
				coun[i][0] = c[2];
				coun[i][1] = c[1];
			}
			
			if(d){
				data[i][0] = d[1];
				data[i][1] = d[2];
			}
			
			if(info){
				det[i][0] = info[1];
				det[i][1] = info[2];
				det[i][2] = info[3];
			}
			
			if(o){
				major[i][0] = o[1];
				major[i][1] = o[2];
				major[i][2] = o[3];
			}
		},
		data: ''
	});
}


function addOption(value, text, position){
	var new_option = document.createElement("option");
	new_option.value = value;
	new_option.innerHTML = text;
	position.parentNode.appendChild(new_option);
	return new_option;
}


function addFriend(){
	var actual = (GM_getValue(c_name) == undefined) ? GM_getValue(c_name) : GM_getValue(c_name).split(sep);
	var id = getParameter("teamID");
	
	if(actual == undefined && maxteams > 0){
		setTeam("", id)
	}
	else{
		if(actual.length < maxteams+1){
			if(teamExist(id)){
				alert(add_ferror[1]);
			}
			else{
				setTeam(GM_getValue(c_name), id);
			}
		}
		else{
			alert(add_ferror[0]);
		}
	}
}


function delFriend(){
	var id = getParameter("teamID");
	var actual = GM_getValue(c_name);
	
	GM_setValue(c_name, actual.replace(id + sep, ""))
	alert(del_fcorrect);
	window.location.reload();
}


function addPlayer(){
	var actual = (GM_getValue(c_player) == undefined) ? GM_getValue(c_player) : GM_getValue(c_player).split(sep);
	var id = getParameter("playerID");
	
	if(actual == undefined && maxplayers > 0){
		setPlayer("", id)
		document.getElementById(a_id1).style.display = "none";
		document.getElementById(a_id2).style.display = "";
	}
	else{
		if(actual.length < maxplayers+1){
			if(playerExist(id)){
				alert(add_perror[1]);
			}
			else{
				setPlayer(GM_getValue(c_player), id);
				document.getElementById(a_id1).style.display = "none";
				document.getElementById(a_id2).style.display = "";
			}
		}
		else{
			alert(add_perror[0]);
		}
	}
}


function delPlayer(){
	var id = getParameter("playerID");
	var actual = GM_getValue(c_player);
	
	GM_setValue(c_player, actual.replace(id + sep, ""))
	alert(del_pcorrect);
	document.getElementById(a_id1).style.display = "";
	document.getElementById(a_id2).style.display = "none";
}



///////////////////////////////
////                       ////
////      THIRD LEVEL      ////
////                       ////
///////////////////////////////

function flag(id, country){
/*	Flags types:
	http://www.flagcreator.org/images/flags/rounded/[id]flag.png
	http://www.flagcreator.org/images/flags/fadeflags/[id]flag.png
	http://www.flagcreator.org/images/flags/waved/[id]flag.png
	./images/[id]flag.gif
*/
	return "<img src=\"http://www.flagcreator.org/images/flags/waved/" + id +
			"flag.png\" alt=\"flag\" title=" + country + " align=\"top\">";
}


function setTeam(str, id){
	GM_setValue(c_name, str + id + sep);
	alert(add_fcorrect);
	window.location.reload();
}


function setPlayer(str, id){
	GM_setValue(c_player, str + id + sep);
	alert(add_pcorrect);
}


function teamExist(id){
	return (GM_getValue(c_name, "").indexOf(id) != -1);
}


function playerExist(id){
	return (GM_getValue(c_player, "").indexOf(id) != -1);
}



///////////////////////////////////
////                           ////
////    AUXILIAR FUNCTINONS    ////
////                           ////
///////////////////////////////////

function getUrl(){
	return location.href.substring(0, location.href.lastIndexOf('\/'));
}


function actualUrl(url){
	return (window.location.href.toLowerCase().indexOf(url.toLowerCase()) != -1);
}


function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
		}
	}
	else{
		arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements.push(oElement);
		}
	}
	return arrReturnElements;
}


function getParameter(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name.toLowerCase()+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href.toLowerCase() );

	if( results == null )
		return "";
	else
		return results[1];
}



///////////////////////////////
////                       ////
////      BEGIN HERE       ////
////                       ////
///////////////////////////////

start();
