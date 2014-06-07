// ==UserScript==
// @name         [PG] X-tra Weiterbildungsende hh & berlin
// @namespace    kingfr3sh & das_bazie umgestylet by tooBIG 
// @description  zeigt das Ende der 1. und 2. Weiterbildung in der Übersicht an.NEU zeigt Weiterbildungsstufe an
// @version		 v3
// @include      http://*.pennergame.de/*
// @exclude		 http://newboard.pennergame.de
// @exclude		 http://change.pennergame.de/*
// @exclude		*.pennergame.de/redirect/?site=*
// ==/UserScript==


// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer hamburg
if (url.indexOf("http://www")>=0) {
var gamelink = "http://www.pennergame.de"
var medialink = "http://media.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var medialink = "http://media.pennergame.de"
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var medialink = "http://media.pennergame.de"
}

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// groesse und possition hauptcontainer
addGlobalStyle('div#main_container { position:absolute; top:100px; left:50%; margin-left:-12px; width:250px;}')
// textkopf
addGlobalStyle('p.Head {line-height:40%; font-size:13px; font-weight:bold; color:#FFFFFF; text-decoration:underline; padding:10px 0px 0px 30px;}')
// container groesse und aussehen schriftausrichtung
addGlobalStyle('.inhalt_container { padding-bottom:5px; padding-left:6px; background: url(http://s7.directupload.net/images/091121/ma95j5d9.png); font-weight:bold; color:#000000; font-size:73%; text-align:left;-moz-border-radius:10px; } ')
// statusbalken und hintergrund
addGlobalStyle('div.prozentbalken_bg_1{background:url('+medialink+'/img/processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_1{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle('div#active_prozent_1{color:#fff;background:url('+medialink+'/img/processbar.jpg) repeat-x;}')

var smilie = "<img src='http://germanengott.ge.funpic.de/script_img/smiley902.gif ' width='11' height='11'>";
var waiting_for_complete = "Warten auf Fertigstellung...";

var vor_penner_training_1 = 'bereits eine Weiterbildung</div>';
var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
var vor_penner_training_wait = 'Eine weitere Bildung ist in der Warteschlange</div>';

GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/skills/",
		onload: function(response) {
			var content = response.responseText;
				
				try{

				var stufe1 = content.split('</span> [Stufe ')[1].split(']')[0];
				}catch(e){}
				try{
				var stufe2 = content.split('</span> [Stufe ')[2].split(']')[0];
				}catch(e){} 

				try{
	
				var w_end_wait0 = content.split(vor_penner_training_wait)[1];
				var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
				var date_wait = content.split('<span class="style_skill">')[4].split('</span></div>')[0];
				
				var container_2_zeile_1 = "<p class=\"Head\"><b>N&auml;chste Weiterbildung:</b></p><br/>";
				var container_2_zeile_2 = "<b>In Warteschlange: </b><font color=\"#FFFFFF\">"+w_end_wait+" ["+stufe2+"]</font><br/>";
				var container_2_zeile_3 = "<b>Endet am:</b> <font color=\"#FFFFFF\">"+date_wait+"</font> Uhr";
				var inhalt_container_2 = "<div class=\"inhalt_container\">"+container_2_zeile_1+container_2_zeile_2+container_2_zeile_3+"</div>";
				
				
				var w_end0 = content.split(vor_penner_training_1)[1];
				var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
				var start_time = content.split('var start = ')[1].split(';')[0];
				var end_time = content.split('var end = ')[1].split(';')[0];
				var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
				var end_date1 = new Date();
				end_date1.setTime(end_time * 1000);
				w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
				w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
				gesammt = end_time - start_time;
				bisher = timestamp_w - start_time;
				perc0 = (bisher / gesammt) * 100;
				if(perc0 > 0  && perc0 < 100) {
				width_balken0 = Math.round(perc0*10)/5;  
				percger0 = Math.round(perc0*10)/10; }
				if(perc0 < 0) {
				width_balken0 = 0;	
				percger0 = "-"; }
				if(perc0 > 100) {
				width_balken0 = 200; 
				percger0 = "100% "+waiting_for_complete; }
				if(timestamp_w > (end_time+120)) {
				window.document.location.reload(); }
				if (!width_balken0) {
				width_balken0 = 0; }
				
				var weiterbildung_0_1 = "Endet am: <font color=\"#FFFFFF\">"+w_end_day+"</font> um <font color=\"#FFFFFF\">"+w_end_time+" </font>Uhr";
				var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken0+"px;>"+percger0+"&#37;</div></div>";
				
				}
				catch(err)
				
					{
					try
					{
					
					var inhalt_container_2 = "";
					
					var w_end0 = content.split(vor_penner_training_1)[1];
					var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
					var start_time = content.split('var start = ')[1].split(';')[0];
					var end_time = content.split('var end = ')[1].split(';')[0];
					var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
					var end_date1 = new Date();
					end_date1.setTime(end_time * 1000);
					w_end_time = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
					w_end_day = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
					gesammt = end_time - start_time;
					bisher = timestamp_w - start_time;
					perc = (bisher / gesammt) * 100;
					if(perc > 0  && perc < 100) {
					width_balken = Math.round(perc*10)/5;  
					percger = Math.round(perc*10)/10; }
					if(perc < 0) {
					width_balken = 0;	
					percger = "-"; }
					if(perc > 100) {
					width_balken = 200; 
					percger = "100% "+waiting_for_complete; }
					if(timestamp_w > (end_time+120)) {
					window.document.location.reload(); }
					if (!width_balken) {
					width_balken = 0; }
				
					var weiterbildung_0_1 = "Endet am: <font color=\"#FFFFFF\">"+w_end_day+"</font> um <font color=\"#FFFFFF\">"+w_end_time+" </font>Uhr";
					var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken+"px;>"+percger+"&#37;</div></div>";
					}
					catch(err)
						{
						var w_type1 = "Keine";
						w_end_time = 0;
						w_end_day = 0;
						var width_balken = 200;
						var percger = 0;
				
						var weiterbildung_0_1 = "<font color=\"#FFFFFF\"><b>Keine Weiterbildung!!! "+smilie+"</b> </font>";
						var weiterbildung_0_2 = "<font color=\"#FFFFFF\">Du kannst jetzt neue sarten!</font>";
						}
						}


GM_xmlhttpRequest({
  method: 'GET',
  url: ""+gamelink+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
		try {
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];

		// menue div erzeugen
		var Weiterbildung = document.createElement('div');
		document.body.appendChild(Weiterbildung);
		// menue bilden
		Weiterbildung.innerHTML = "<div id=\"main_container\" >"+inhalt_container_2+"<div class=\"inhalt_container\"><p class=\"Head\"><b>Aktuelle Weiterbildung:</b></p><br/><b>Weiterbildung:</b> <span style=\"color:#FFFFFF;\">"+w_type1+ " ["+stufe1+"]</span><br/>"+weiterbildung_0_1+"<br/>"+weiterbildung_0_2+"</div></div>";
			
			}
		catch(err)
			{
			var Weiterbildung = document.createElement('div');
			document.body.appendChild(Weiterbildung);
			// menue bilden
			Weiterbildung.innerHTML = "";
			}

// klammern userid
}})
// weiterbildung 1 auslesen
}})
