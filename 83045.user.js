// ==UserScript==
// @name         Affichage des formations
// @namespace    kingfr3sh & das_bazie
// @description  Affichage des formations clodo + animal FRENCH ALL VERSIONS
// @version      2.0.0
// @include      *pennergame.de/*
// @include      *pennergame.de/change_please/statistics/
// @include      *mendigogame.es/*
// @include      *mendigogame.es/change_please/statistics/
// @include      *bumrise.com/*
// @include      *bumrise.com/change_please/statistics/
// @include      *dossergame.co.uk/*
// @include      *dossergame.co.uk/change_please/statistics/
// @include      *clodogame.fr/*
// @include      *clodogame.fr/change_please/statistics/
// @include      http://marseille.clodogame.fr/change_please/statistics/
// @include      http://marseille.clodogame.fr/*
// @include      *menelgame.pl/*
// @include      *menelgame.pl/change_please/statistics/
// @include      *serserionline.com/*
// @include      *serserionline.com/change_please/statistics/
// @include      *faveladogame.com.br/*
// @include      *faveladogame.com.br/change_please/statistics/
// @exclude      *change_please*
// @exclude      *board*
// @exclude		 *chat*
// @exclude      *forum*
// @exclude      *redirect*
// @exclude      *highscore*
// ==/UserScript==


var medialink = "http://static.pennergame.de"
var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
var smilie = "<img src=\"http://bazie.spacequadrat.de/pennergame/background_weiterbildung_ende.png\"/>";

// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {var gamelink = "http://www.pennergame.de"}
// Linkadressen fuer Berlin
if (url.indexOf("berlin.pennergame")>=0) {var gamelink = "http://berlin.pennergame.de"}
// Linkadressen fuer muenchen
if (url.indexOf("muenchen.pennergame")>=0) {var gamelink = "http://muenchen.pennergame.de"}

// variablen fuer deutsche pennergames
if (url.indexOf("pennergame")>=0) {
var waiting_for_complete = "Warten auf Fertigstellung...";
var vor_penner_training_1 = 'bereits eine Weiterbildung</div>';
var vor_penner_training_wait = 'Eine weitere Bildung ist in der Warteschlange</div>';
var stufe = 'Stufe';
}

// linkadressen und variablen fuer andere pennergame
// madrid
if (url.indexOf("mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es"
var waiting_for_complete = "Esperando que se termine...";
var vor_penner_training_1 = 'cursillo de perfeccionamiento</div>';
var vor_penner_training_wait = 'en la cola de espera</div>';
var stufe = 'Nivel';
}

// new york
if (url.indexOf("bumrise")>=0) {
var gamelink = "http://www.bumrise.com"
var waiting_for_complete = "Waiting for complete...";
var vor_penner_training_1 = 'training in progress</div>';
var vor_penner_training_wait = 'in the waiting line</div>';
var stufe = 'Level';
}

// london
if (url.indexOf("dossergame")>=0) {
var gamelink = "http://www.dossergame.co.uk"
var waiting_for_complete = "Waiting for completion...";
var vor_penner_training_1 = 'further education course.</div>';
var vor_penner_training_wait = 'Queue</div>';
var stufe = 'Level';
}

// frankreich
if (url.indexOf("clodogame")>=0) {
var waiting_for_complete = "En attente de finition ...";
var vor_penner_training_1 = 'est en cours</div>';
var vor_penner_training_wait = 'dans la file d\'attente</div>';
var stufe = 'Niveau';
}
// paris
if (url.indexOf("clodogame")>=0) {var gamelink = "http://www.clodogame.fr"}
// marseille
if (url.indexOf("marseille.clodogame")>=0) {var gamelink = "http://marseille.clodogame.fr"}

// polen
if (url.indexOf("menelgame")>=0) {
var waiting_for_complete = "czekaj na zakonczenie...";
var vor_penner_training_1 = 'przeprowadzane</div>';
var vor_penner_training_wait = 'szkolenie jest w kolejce</div>';
var stufe = 'Stopien';
}
// warschau
if (url.indexOf("warzawa.menelgame")>=0) {var gamelink = "http://warzawa.menelgame.pl"}
// krakau
if (url.indexOf("krakow.menelgame")>=0) {var gamelink = "http://krakow.menelgame.pl"}

// tuerkei
if (url.indexOf("serserionline")>=0) {
var gamelink = "http://www.serserionline.com"
var waiting_for_complete = "Tamamlanmasi bekleniyor...";
var vor_penner_training_1 = 'devam etmekte</div>';
var vor_penner_training_wait = 'bekleme listesinde</div>';
var stufe = 'Asama';
}

// brasilien
if (url.indexOf("faveladogame")>=0) {
var gamelink = "http://www.faveladogame.com.br"
var waiting_for_complete = "Aguardando...";
var vor_penner_training_1 = 'curso de reciclagem</div>';
var vor_penner_training_wait = 'curso na fila de espera</div>';
var stufe = 'Grau';
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
addGlobalStyle('div#main_container { position:absolute; top:98px; left:50%; margin-left:-27px; width:270px;}')
// textkopf
addGlobalStyle('span.Head {line-height:180%; font-size:13px; font-weight:bold; color:#FFFFFF; text-decoration:underline; padding:8px 0px 0px 30px;}')
// container groesse und aussehen schriftausrichtung
addGlobalStyle('.inhalt_container { padding-bottom:5px; padding-left:6px; background: url(http://bazie.spacequadrat.de/pennergame/background_weiterbildung_ende.png);background-position:-10px -5px; -moz-border-radius:10px; font-weight:bold; color:#000000; font-size:12px; text-align:left; } ')
// statusbalken und hintergrund
addGlobalStyle('div.prozentbalken_bg_1 { background:url('+medialink+'/img/pv4/icons/processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_1 { background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle('div#active_prozent_1 { color:#fff;background:url('+medialink+'/img/pv4/icons/processbar_active.gif) repeat-x;}')
// groesse und position container haustierweiterbildung

addGlobalStyle('div#container_pet_training { position:absolute; top:230px; left:50%; margin-left:-27px; width:270px; }')

GM_xmlhttpRequest({
	method: 'GET',
	url: gamelink+"/skills/",
		onload: function(response) {
			var content = response.responseText;
				try
				{
					
				var w_end_wait0 = content.split(vor_penner_training_wait)[1];
				var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
				var w_end_wait_stufe = w_end_wait0.split('</span> ['+stufe+' ')[1].split(']')[0];
				var date_wait = content.split('<span class="style_skill">')[4].split('</span></div>')[0];
				
				var container_2_zeile_1 = "<span class=\"Head\">Entrainement en attente:</span><br/>";
				var container_2_zeile_2 = "En attente: <font color=\"#FFFFFF\">"+w_end_wait+" ["+w_end_wait_stufe+"]</font><br/>";
				var container_2_zeile_3 = "Fin le : <font color=\"#FFFFFF\">"+date_wait+" heures</font>";
				var inhalt_container_2 = "<div class=\"inhalt_container\">"+container_2_zeile_1+container_2_zeile_2+container_2_zeile_3+"</div>";
				
				
				var w_end0 = content.split(vor_penner_training_1)[1];
				var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
				var w_type1_stufe = w_end0.split('</span> ['+stufe+' ')[1].split(']')[0];
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
				
				var weiterbildung_0_1 = "Fin le: <font color=\"#FFFFFF\">"+w_end_day+", </font><font color=\"#FFFFFF\">"+w_end_time+" heures</font>";
				var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken0+"px;>"+percger0+"&#37;</div></div>";
				
				}
				catch(err)
				
					{
					try
					{
					
					var inhalt_container_2 = "";
					
					var w_end0 = content.split(vor_penner_training_1)[1];
					var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
					var w_type1_stufe = w_end0.split('</span> ['+stufe+' ')[1].split(']')[0];
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
				
					var weiterbildung_0_1 = "Fin le: <font color=\"#FFFFFF\">"+w_end_day+"</font><font color=\"#FFFFFF\">"+w_end_time+" heures</font>";
					var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken+"px;>"+percger+"&#37;</div></div>";
					}
					catch(err)
						{
						var w_type1 = "Keine";
						var w_type1_stufe = "X";
						w_end_time = 0;
						w_end_day = 0;
						var width_balken = 200;
						var percger = 0;
				
						var weiterbildung_0_1 = "<span style=\"color:#FFFFFF;\">Bild dich mal weiter.....</span>";
						var weiterbildung_0_2 = "<span style=\"color:#FFFFFF;\">Du Penner... "+smilie+"</span>";
						}
						}


GM_xmlhttpRequest({
  method: 'GET',
  url: gamelink+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
		try {
		var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];

		// menue div erzeugen
		var Weiterbildung = document.createElement('div');
		document.body.appendChild(Weiterbildung);
		// menue bilden
		Weiterbildung.innerHTML = "<div id=\"main_container\" >"+inhalt_container_2+"<div class=\"inhalt_container\"><span class=\"Head\">Entrainement en cours :</span><br/>En cours: <span style=\"color:#FFFFFF;\">"+w_type1+" ["+w_type1_stufe+"]</span><br/>"+weiterbildung_0_1+"<br/>"+weiterbildung_0_2+"</div></div>";
			
			}
		catch(err)
			{
			var Weiterbildung = document.createElement('div');
			document.body.appendChild(Weiterbildung);
			// menue bilden
			Weiterbildung.innerHTML = "";
			}

// Kendo userid
}})
// weiterbildung auslesen
}})

// haustier weiterbildung

GM_xmlhttpRequest({
	method: 'GET',
	url: gamelink+"/skills/pet/",
		onload: function(response) {
			var content = response.responseText;
			
			try {
			
				var w_end0 = content.split(vor_penner_training_1)[1];
				var w_type1 = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
				var w_type1_stufe = w_end0.split('</span> ['+stufe+' ')[1].split(']')[0];
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
			
				var weiterbildung_0_1 = "Fin le: <font color=\"#FFFFFF\">"+w_end_day+", </font><font color=\"#FFFFFF\">"+w_end_time+" heures</font>";
				var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:"+width_balken+"px;>"+percger+"&#37;</div></div>";
			
				var pettraining = document.createElement('div');
				document.body.appendChild(pettraining);
				// menue bilden
				pettraining.innerHTML = "<div id=\"container_pet_training\"><div class=\"inhalt_container\"><span class=\"Head\">Entrainement de l'animal:</span><br/>En cours: <span style=\"color:#FFFFFF;\">"+w_type1+" ["+w_type1_stufe+"]</span><br/>"+weiterbildung_0_1+"<br/>"+weiterbildung_0_2+"</div></div>";
				
				} catch(err) {
				
				var pettraining = document.createElement('div');
				document.body.appendChild(pettraining);
				// menue bilden
				pettraining.innerHTML = "";
				
				}
				
}})