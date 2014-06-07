// ==UserScript==
// @name Clodogame - Affichage des entrainements
// @namespace Memphis007
// @description Affichage des entrainements (Type / Durée / File d'attente) (Clodogame Paris & Marseille & Reloaded)
// @maj Affichage plus stylisé
// @version 1.7
// @include http://*.clodogame.fr*
// @exclude http://*.clodogame.fr/redirect/*
// @exclude *board.*
// @exclude *highscore*
// @exclude *change_please*
// @exclude *login/*
// @exclude *logout*
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("www.clodogame")>=0 || url.indexOf("paris.clodogame")>=0)
{
	var gamelink = "http://www.clodogame.fr"
	var medialink = "http://mediaberlin.pennergame.de"
	var vor_penner_training_1 = 'est en cours</div>';
	var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
	var vor_penner_training_wait = 'est dans la file d\'attente</div>';
	var waiting_for_complete = "En attente de finition...";
	var WidthBarGraph = 250;
	// la taille du contenant et la position principale
	addGlobalStyle('div#div_main_train{ position:absolute; top:100px; left:45%; margin-left:-25px; width:'+(WidthBarGraph+15)+'px; }')
}
else if (url.indexOf("marseille.clodogame")>=0)
{
	var gamelink = "http://marseille.clodogame.fr"
	var medialink = "http://mediaberlin.pennergame.de"
	var vor_penner_training_1 = 'est en cours</div>';
	var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
	var vor_penner_training_wait = 'est dans la file d\'attente</div>';
	var waiting_for_complete = "En attente de finition...";
	var WidthBarGraph = 250;
	// la taille du contenant et la position principale
	addGlobalStyle('div#div_main_train{ position:absolute; top:100px; left:45%; margin-left:-25px; width:'+(WidthBarGraph+15)+'px; }')
}
else if (url.indexOf("reloaded.clodogame")>=0 || window.top == window.self)
{
	var gamelink = "http://reloaded.clodogame.fr"
	var medialink = "http://mediaberlin.pennergame.de"
	var vor_penner_training_1 = 'est en cours</div>';
	var vor_penner_training_1_prozent = '<div class="processbar" id="active_process" style="width:';
	var vor_penner_training_wait = 'est dans la file d\'attente</div>';
	var waiting_for_complete = "En attente de finition...";
	var WidthBarGraph = 300;
	// la taille du contenant et la position principale
	addGlobalStyle('div#div_main_train{ position:absolute; top:100px; left:40%; margin-left:-25px; width:'+(WidthBarGraph+15)+'px; }')
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// texte
addGlobalStyle('p.Bottom{ padding-left:10px; }')
// la taille du contenant et regarder écrite orientation
addGlobalStyle('.div_list_train{ padding:5px 0; padding-left:6px; background: url(http://static.pennergame.de/img/pv4/bg_notifyme.png);background-position:-10px -10px; border-radius:10px; font-weight:bold; color:#000000; font-size:12px; text-align:left; } ');
// status bar et background
addGlobalStyle('div.BarGraphBG{ background:url(http://static.pennergame.de/img/pv4/icons/processbar_bg.jpg) repeat-x; border:1px solid #000; height:12px; width:'+WidthBarGraph+'px }');
addGlobalStyle('div.BarGraph{ background-repeat: repeat-x; border:none; border-right:1px solid #000; padding-left:3px; background:url('+medialink+'/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif; position:relative; height:12px; z-index:1; }');
addGlobalStyle('div#active_BarGraph{ color:#fff; background:url(http://static.pennergame.de/img/pv4/icons/processbar_active.gif) repeat-x; }');

GM_xmlhttpRequest({ method: 'GET', url: ""+gamelink+"/skills/", onload: function(response) 
	{
		var content = response.responseText;
		
		// Entrainement + Liste d'attente
		try
		{
			var N1 = content.split('</span> [Niveau ')[1].split(']')[0];
			var N2 = content.split('</span> [Niveau ')[2].split(']')[0];
			
			// DEBUT - Div de file d'attente
			var w_end_wait0 = content.split(vor_penner_training_wait)[1];
			var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
			var date_wait = content.split('<span class="style_skill">')[4].split('</span></div>')[0];

			var div_wait = "<p class=\"Bottom\"><span style=\"color:#B22E44\">&#9744; "+w_end_wait+" (N"+N2+")</span> Fin: "+date_wait+"</p>";
			// FIN - Div de file d'attente

			// DEBUT - Div d'entrainement en cours
			var w_end0 = content.split(vor_penner_training_1)[1];
			var TypeTrainEnCours = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
			var start_time = content.split('var start = ')[1].split(';')[0];
			var end_time = content.split('var end = ')[1].split(';')[0];
			var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
			var end_date1 = new Date();
			end_date1.setTime(end_time * 1000);
			date_fin_heure = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
			date_fin_jour = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
			
			Temps = end_time - start_time;
			TempsOK = timestamp_w - start_time;
			perc0 = (TempsOK / Temps) * 100;
			if(perc0 > 0  && perc0 < 100)
			{	width_BarGraph0 = Math.round(perc0*10)/(1000/WidthBarGraph);  
				Percent0 = Math.round(perc0*10)/10;
			}
			if(perc0 < 0)
			{	width_BarGraph0 = 0;	
				Percent0 = "-";
			}
			if(perc0 > 100)
			{	width_BarGraph0 = WidthBarGraph; 
				Percent0 = "100% "+waiting_for_complete;
			}
			if(timestamp_w > (end_time+120))
				window.document.location.reload();
			
			if (!width_BarGraph0)
				width_BarGraph0 = 0;
			
			var Train_Ligne_1 = "Fin: <font color=\"#000000\">"+date_fin_jour+"</font> à <font color=\"#000000\">"+date_fin_heure+"</font>";
			var Train_Ligne_2 = "<div class=\"BarGraphBG\"><div class=\"BarGraph\" id=\"active_BarGraph\" style=\"text-align:center;width:"+width_BarGraph0+"px;\">"+Percent0+"&#37;</div></div>";
			// FIN - Div d'entrainement en cours
			
		}
		
		// Pas de liste d'attente
		catch(err)
		{
			try
			{
				var div_wait = "";
				
				var w_end0 = content.split(vor_penner_training_1)[1];
				var TypeTrainEnCours = w_end0.split('<span class="style_skill">')[1].split('</span>')[0];
				var start_time = content.split('var start = ')[1].split(';')[0];
				var end_time = content.split('var end = ')[1].split(';')[0];
				var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
				var end_date1 = new Date();
				end_date1.setTime(end_time * 1000);
				date_fin_heure = ((end_date1.getHours()<10)?'0'+end_date1.getHours():end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():end_date1.getMinutes());
				date_fin_jour = ((end_date1.getDate()<10)?'0'+end_date1.getDate():end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
			
				Temps = end_time - start_time;
				TempsOK = timestamp_w - start_time;
				perc = (TempsOK / Temps) * 100;
				if(perc > 0  && perc < 100)
				{	width_BarGraph = Math.round(perc*10)/(1000/WidthBarGraph);  
					Percent1 = Math.round(perc*10)/10;
				}
				if(perc < 0)
				{	width_BarGraph = 0;	
					Percent1 = "-";
				}
				if(perc > 100)
				{	width_BarGraph = WidthBarGraph; 
					Percent1 = "100% "+waiting_for_complete;
				}
				if(timestamp_w > (end_time+120))
					window.document.location.reload();
					
				if (!width_BarGraph)
					width_BarGraph = 0;
			
				var Train_Ligne_1 = "Fin: <font color=\"#000000\">"+date_fin_jour+"</font> à <font color=\"#000000\">"+date_fin_heure+"</font>";
				var Train_Ligne_2 = "<div class=\"BarGraphBG\"><div class=\"BarGraph\" id=\"active_BarGraph\" style=\"text-align:center;width:"+width_BarGraph+"px;\">"+Percent1+"&#37;</div></div>";
			}
			catch(err)
			{
				var TypeTrainEnCours = 0;
				date_fin_heure = 0;
				date_fin_jour = 0;
				var width_BarGraph = WidthBarGraph;
				var Percent1 = 0;
		
				var Train_Ligne_1 = "Tu ne fait rien &#9785; ";
				var Train_Ligne_2 = "C'est pas bien...";
			}
		}


		// Affichage
		try
		{
			var Train = document.createElement('div');
			document.getElementById('wrap').appendChild(Train);
			Train.innerHTML = "<div id=\"div_main_train\" ><div class=\"div_list_train\">"+div_wait+"<p class=\"Bottom\"><span style=\"color:#B22E44\">&#9745; "+TypeTrainEnCours+" (N"+N1+")</span> "+Train_Ligne_1+"<br />"+Train_Ligne_2+"</p></div></div>";
			
		}
		catch(err)
		{
			var error;
		}
			
}})

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Affichage des entrainements', // Script Name
 version: '1.7', // Version
 id: '102116', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour