// version 1.1.3
// 2012-09-25
// Copyright (c) 2012, Michael Malcharek
// Email: Michael.Malcharek@web.de
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Qraut - Häuptlings Activity Scanner
// @namespace   Qraut - HAS
// @description Für bannana4u :)
// @include     http*://*qraut.de/clan_members.php?id=*
// @version     1.1.3
// @author      Michael Malcharek
// @description Eine AkitivitÃ¤tsÃ¼bersicht in auf der Clanseite, welche anzeigt wie sich der User seit dem letzten Besuch verbessert/verschlechtert hat (Kampfstärke)
// ==/UserScript==
var Body = document.getElementById("clan_members_table").innerHTML;
var Spieler = Body.split('<a href="/player.php?id=');

document.getElementById("body").innerHTML = document.getElementById("body").innerHTML.replace("Name", "Name <div  style='position:relative;right:-38%;top:19%;margin-top: -19px;'>Activity</div>");
document.getElementById("body").innerHTML = document.getElementById("body").innerHTML.replace('</th><th width="25">', "</th><th width='25'></th><th width='25'>");

for (var i = 1; i < Spieler.length; i++) {

 var Details = Spieler[i].split('"');
	var name = Details[3].split('<');
	var username = name[0].slice(1,9999);
	var userID = Details[0];
	var userpoints = parseInt(Details[6],10);
	localStorage[userID+'_id']=userID;	
	localStorage[userID+'_name']=username;
	localStorage[userID+'_diff']=userpoints-localStorage[userID+'_userpoints'];
	var datumsdifferenz = Math.round((Math.round(new Date().getTime() / 1000) -localStorage[userID+'_timestamp'])/60/60);
	if(localStorage[userID+'_diff']==0||datumsdifferenz <=24){
	
	}else{
		localStorage[userID+'_timestamp']=Math.round(new Date().getTime() / 1000);
			localStorage[userID+'_userpoints']=userpoints;
	}
	if(localStorage[userID+'_diff']<0){
		var color = "#00C000";
		var vorzeichen  = "";	
		if(datumsdifferenz >=24){
			localStorage[userID+'_timestamp']=Math.round(new Date().getTime() / 1000);
			localStorage[userID+'_userpoints']=userpoints;
		}
	}else if(localStorage[userID+'_diff']>0){
		var color = "#00C000";
		var vorzeichen  = "+";
		
		if(datumsdifferenz >=24){
			localStorage[userID+'_timestamp']=Math.round(new Date().getTime() / 1000);
			localStorage[userID+'_userpoints']=userpoints;
		}
	}else{
		if(datumsdifferenz >=48){
			var color = "#FF0000";
			var vorzeichen  = "";
		}else{
			var color = "";
			var vorzeichen  = "";
		}
	}
	
	if(typeof localStorage[userID+'_msg'] == 'undefined'){
		localStorage[userID+'_msg'] = "Nichts gespeichert";
	}
	document.getElementById("body").innerHTML = document.getElementById("body").innerHTML.replace(username, username+"<div  style='position:relative;right:-85%;top:-50%;margin-top: -19px;font-weight:normal;'><font color='"+color+"' size='2px' ><p title='inerhalb der letzten "+datumsdifferenz+" Stunden'>"+vorzeichen+localStorage[userID+'_diff']+"</p></font></div>");
	document.getElementById("body").innerHTML = document.getElementById("body").innerHTML.replace('title="Brief abschicken"></b></a>', 'title="Brief abschicken"> </b> </a><div  style="position:relative;right:-100%;top:19%;margin-top: -19px;"><a onclick="localStorage[\''+userID+'\_msg\'] = prompt(\'Memo:\', \'\');"><b class="icon ico_zorro" title="'+localStorage[userID+'_msg']+'"></b></a></div>');
}
