/* TEM LA FIRME - Affiche en temps reel le temps avant le retour au bunker

Creation (MM/JJ/AAAA): 03/22/2007
Gillou
http://lggillou.free.fr/script/temrealtime.user.js

Teste sous GreaseMonkey 0,8.20091209.4

Script sous license Creative Commons (http://creativecommons.org/licenses/by-nc-nd/2.0/fr/)

*/




// ==UserScript==
// @name           TEM La Firme - Real Time
// @version        V0.1 Build 008
// @namespace      TEM La Firme - Real Time
// @description    Affiche en temps reel le temps avant le retour au bunker
// @include        http://www.tem-la-firme.com/bunker*
// @include        http://*.ovh.net/tem-la-firme/bunker*
// ==/UserScript==





/* RELEASE
   -------------------------------------------------- */

var ScriptName = 'TEM La Firme - Real Time';                          // Nom du script
var ScriptVersion = '0.1';                                            // Version du script pour les mises a jour majeures
var ScriptBuild = '008';                                              // Sous-version du script pour les mises a jour mineures
var ScriptDate = '12/22/2009';                                        // Date de la publication (MM/JJ/AAAA)


/* SCRIPT
   -------------------------------------------------- */

function RSet(string, length, character) { // Ajoute X caractere a gauche pour avoir la longueur voulu
  string = new String(string); // Pour etre que c'est bien un string
  if (string.length >= length) {
    return string;
  }
  else if (character.length == 1) {
    for (var i = 0; i < (length-string.length+1); i++) {
      string = character+string;
    }
    return string;
  }
}

function formatageDate(chaine) { // Fonction TEM
	var resultat
	if (chaine<=9) {
		resultat="0"+chaine
	}
	else {
		resultat = chaine
	}
	return resultat;
}

function CalcTime(datedeb,datefin) { // Fonction TEM
  
  // Calcul de la difference
	var T1=datedeb.split('-');
	var T2=datefin.split('-');

	var NewDateDeb = new Date('20' + T1[0] + '/' + T1[1] + '/' + T1[2] + ' ' + T1[3] + ':' + T1[4] + ':' + T1[5])
	var NewDateFin = new Date('20' + T2[0] + '/' + T2[1] + '/' + T2[2] + ' ' + T2[3] + ':' + T2[4] + ':' + T2[5])

	var reste = Math.floor((NewDateFin - NewDateDeb)/1000)
  
  //On transforme les secondes en date j/hh/mm/sec
	var j
	var h
	var m
	var s
	var tps = Math.abs(reste) - 1;

	if (tps>3600) { 
		h=Math.floor(tps/3600);
		tps=tps % 3600;
	}
	else {
		h=0;
	}

	if (tps>60) { 
		m=Math.floor(tps/60);
		tps=tps % 60;
	}
	else {
		m=0;
	}

	s=Math.floor(tps);

	//On construit la chaine
	var texte = "";
	if (j>0) {
	 texte = j + "j " + formatageDate(h) +":" + formatageDate(m) +":" + formatageDate(s)
	}
	else {
	 texte = ((h>0)?formatageDate(h)+"h ":"") + ((m>0)?formatageDate(m)+"m ":"") + formatageDate(s)+"s";
	}
	
  //On affiche maintenant
  var currentTitle = document.title;
  if (document.title.match(/([^\@]+)\[([0-9]+)\s\:\s([0-9]+)\s\:\s([0-9]+)\]([^\@]+)/) && T1.length == 6) {
    currentTitle = document.title.match(/([^\@]+)\[([0-9]+)\s\:\s([0-9]+)\s\:\s([0-9]+)\]([^\@]+)/);
    currentTitle = currentTitle[1]+'['+T1[3] + ' : ' + T1[4] + ' : ' + T1[5]+']'+currentTitle[5];
  }
  if (document.getElementById('RealTime')) {
    if (reste > 0) {
      document.getElementById('RealTime').innerHTML = 'Retour \340 la base :<br>'+texte;
      if (currentTitle.match(/([^\@]+)base\s\-\s([^\@]+)/)) {
        document.title = texte+' - Retour \340 la base - '+currentTitle.match(/([^\@]+)base\s\-\s([^\@]+)/)[2];
      }
      else {
        document.title = texte+' - Retour \340 la base - '+currentTitle;
      }
    }
    else {
      document.getElementById('RealTime').innerHTML = 'Vous \352tes \340 votre base :<br>'+texte;
      document.title = currentTitle;
    }
  }
  else if (document.getElementById('RealTimeRover')) {
    if (reste > 0) {
      document.getElementById('RealTimeRover').innerHTML = '<br>'+texte;
    }
    else {
      document.getElementById('RealTimeRover').innerHTML = '<br>Ejection';
    }
    document.title = currentTitle;
  }
  return reste;
}

function RefreshTime() {
  var Time = new Date();
  var NewTime = Time.getTime()-DiffTime;
  Time.setTime(NewTime);
  var Year = String(Time.getYear());
  var CurrentTime = RSet(Year.substr(1,2),2,'0')+'-'+RSet((Time.getMonth()+1),2,'0')+'-'+RSet(Time.getDate(),2,'0')+'-'+RSet(Time.getHours(),2,'0')+'-'+RSet(Time.getMinutes(),2,'0')+'-'+RSet(Time.getSeconds(),2,'0');
  CalcTime(CurrentTime,EndTime);
}
unsafeWindow.RefreshTime = RefreshTime;

if (document.getElementById('console')) {
  var Div = document.getElementById('console');
  if (Div.getElementsByTagName('script')) {
    var Script = Div.getElementsByTagName('script');
    var ScriptTime = '';
    for (var k = 0; k < Script.length; k++) {
      if (Script[k].innerHTML.match(/disp_clock\(/)) {
        ScriptTime = Script[k].innerHTML.match(/disp_clock\(\'([0-9]+)\'\,\'([0-9\-]+)\'\,\'([0-9\-]+)/);//'
      }
    }
    var Span = Div.getElementsByTagName('span');
    for (var k = 0; k < Span.length; k++) {
      if (Span[k].innerHTML.match(/Retour \340 la base/)) {
        var Time = Span[k].innerHTML.match(/Retour \340 la base \:\<br\>([^\<]+)/);
        Span[k].innerHTML = Span[k].innerHTML.replace(/Retour \340 la base \:\<br\>([^\<]+)/g, '<span id="RealTime">Retour \340 la base :<br>'+Time[1]+'</span>');
        break;
      }
    }
    if (ScriptTime.length > 0) {
      var StartTime = ScriptTime[2].split('-');
      var EndTime = ScriptTime[3];
      var Time = new Date();
      var StartDate = new Date('20' + StartTime[0] + '/' + StartTime[1] + '/' + StartTime[2] + ' ' + StartTime[3] + ':' + StartTime[4] + ':' + StartTime[5])
      var DiffTime = Time.getTime()-StartDate.getTime(); // Calcul de la difference de temps entre le serveur et le pc utilisateur
      var title = document.title;
      window.setInterval('RefreshTime();',333);
    }
  }
}

// Retour du rover en sortie
function RefreshRoverTime(End, TotalTime, Max) {
  var Time = new Date();
  var Text = '';
  if (Math.round((End-Time.getTime())/60000) > 59) {
    Text = Math.floor((End-Time.getTime())/3600000)+' heure(s) et '+(Math.round((End-Time.getTime())/60000)-Math.floor((End-Time.getTime())/3600000)*60)+' Minute(s)';
  }
  else if (Math.round((End-Time.getTime())/60000) > 1) {
    Text = Math.round((End-Time.getTime())/60000)+' minute(s)';
  }
  else if ((End-Time.getTime())/60000 > 0){
    Text = 'moins d\'une minte...';
  }
  else {
    Text = 'Ejection possible';
  }
  document.getElementById('RoverTime').textContent = Text;
  document.getElementById('RoverBar').width = Math.round(Math.round((End-Time.getTime())/60000)*Max/TotalTime);
}
unsafeWindow.RefreshRoverTime = RefreshRoverTime;

if (document.getElementsByName('carte')) {
  var Block =  document.getElementsByName('carte');
  for (var k = 0; k < Block.length; k++) {
    if (Block[k].textContent.match('minute')) {
      var Heu = 0;
      if (Block[k].textContent.match('heure')) {
        var match = Block[k].textContent.match(/([0-9]{1,2}) heure/);
        if (match) {
          Heu = match[1]*60;
        }
      }
      var Min = Block[k].getElementsByTagName('div')[0];
      if (Min) { Min.setAttribute('id', 'RoverTime'); }
      var Img = Block[k].getElementsByTagName('img')[0];
      if (Img) { Img.setAttribute('id', 'RoverBar'); }
      var Tim = Block[k].textContent.match(/([0-9]{1,2}) minute/);
      var Max = Block[k].innerHTML.match(/width\: ([0-9]+)px/);
      var Cur = Block[k].innerHTML.match(/width\=\"([0-9]+)\"/);
      if (!Tim) { Tim = 0; } else { Tim = Tim[1]; }
      if (Max && Cur && Tim && Min && Img) {
        Tim = parseInt(Tim)+Heu;
        var Total = Math.round(Tim*Max[1]/Cur[1]);
        var RoverTime = new Date();
        var EndRover = RoverTime.getTime()+(Tim*60000);
        window.setInterval('RefreshRoverTime('+EndRover+','+Total+','+Max[1]+');',10000);
      }
    }
  }
}

// Retour du rover dans le bunker
if (document.getElementById('retour')) {
  if (document.getElementById('retour').textContent.match('Rover')) {
    var Div = document.getElementById('retour');
    var Span = Div.getElementsByTagName('span')[1];
    Span.setAttribute('id','RealTimeRover');
    Span.setAttribute('style','color:#FFFFFF');
    var Script = Div.getElementsByTagName('script')[0];
    var ScriptTime = Script.innerHTML.match(/disp_clock\(\'([0-9]+)\'\,\'([0-9\-]+)\'\,\'([0-9\-]+)/);//'
    if (ScriptTime.length > 0) {
      var StartTime = ScriptTime[2].split('-');
      var EndTime = ScriptTime[3];
      var Time = new Date();
      var StartDate = new Date('20' + StartTime[0] + '/' + StartTime[1] + '/' + StartTime[2] + ' ' + StartTime[3] + ':' + StartTime[4] + ':' + StartTime[5])
      var DiffTime = Time.getTime()-StartDate.getTime(); // Calcul de la difference de temps entre le serveur et le pc utilisateur
      window.setInterval('RefreshTime();',333);
    }
  }
}
