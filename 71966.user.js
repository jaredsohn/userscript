// ==UserScript==
// @name         Weiterbildungsende Hamburg & Berlin NG Style mit Optionen by basti1012
// @namespace    by basti1012 http://pennerhack.foren-city.de
// @description  zeigt das Ende der 1. und 2. Weiterbildung und die Tierweiterbildung in der Übersicht an. Alle 3 Weiterbildungsanzeigen lassen sich in positsion farbe und co verschieben .auch deaktivieren und aktivieren der einzelnden weiterbildungen kann man ein und aus stellen
// @version		 	1.8
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @exclude			*change*
// @exclude			*redirect*
// @exclude			*board*
// @exclude			*highscore*
// @exclude			http://dontknow.me/*
// ==/UserScript==


if(GM_getValue("update")==null){
GM_setValue("update",'true');
}


if(GM_getValue("update")== 'true'){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/67823",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var weiterbildung = acontent.split('Weiterbildungsende(version')[1];			
			var weiterbildung1 = weiterbildung.split(')')[0];
			if(weiterbildung1 == '1.8'){
				}else{
				var news = acontent.split('11111111')[1].split('22')[0];
				menue='<font style=\"color:yellow; font-size:180%;\"><b>'+news+'</b></font><br><input type="button" name="keineupdates" id="keineupdates" value="Keine Updates mehr " />';
				var NewXtraMenueDiv = document.createElement('div');
				NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:222px;left:433px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;border:1px solid red; background-color:black;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+menue+'</center></span></span>';
				document.body.appendChild(NewXtraMenueDiv);
				document.getElementsByName('keineupdates')[0].addEventListener('click', function save_spenden () {
					GM_setValue("update" ,'false');
					alert("Ab sofort werden keine neue Updates mehr angezeigt .Um wieder Update Hinweise zu kriegen muss unter Einstellungen die Updates wieder Aktivieren");
				},false);
			}
		}
	});
}





var medialink = "http://media.pennergame.de/img/"

var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
weiter1 = 'bereits eine Weiterbildung';
weiter2 = 'Bildung ist in der Warteschlange';
Stufe = 'Stufe';
}

if (url.indexOf("berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de"
weiter1 = 'bereits eine Weiterbildung';
weiter2 = 'Bildung ist in der Warteschlange';
Stufe = 'Stufe';
}
if (url.indexOf("muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de"
weiter1 = 'bereits eine Weiterbildung';
weiter2 = 'Bildung ist in der Warteschlange';
Stufe = 'Stufe';
}
if (url.indexOf("clodogame")>=0) {
var gamelink = "http://www.clodogame.fr"
}
if (url.indexOf("mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es"
weiter1 = 'un cursillo de perfeccionamiento';
weiter2 = 'perfeccionamiento en la cola de espera';
Stufe = 'Nivel';
}
if (url.indexOf("serserionline")>=0) {
var gamelink = "http://www.serserionline.com"
weiter1 = 'itim devam etmekte';
weiter2 = 'itim bekleme listesinde';
Stufe = 'ama';
}

if (url.indexOf("dossergame.co.uk")>=0) {
var gamelink = "http://www.dossergame.co.uk"
}

if (url.indexOf("menelgame.pl")>=0) {
var gamelink = "http://www.menelgame.pl"
}
if (url.indexOf("bumrise")>=0) {
var gamelink = "http://www.bumrise.com"
weiter1 = 'There is already a skill training in progress';
weiter2 = 'A character development exercise is in the waiting line';
Stufe = 'Level';
}


if (url.indexOf("/settings/")>=0) {
var blauerfort = '<img src="http://static.pennergame.de/img/pv4/icons/processbar.jpg"  width="6" height="8">'
var gruenerfort = '<img src="http://static.pennergame.de/img/pv4/icons/processbar_active.gif" height="8">'
var OBalken1 = '';
var OBalken2 = '<center><font style=\"color:#FFFFFF; font-weight:bold; font-size:10px;\">Blau = '+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+blauerfort+'Gr&uuml;n = '+gruenerfort+gruenerfort+gruenerfort+' </font></center>';
var neu = document.getElementsByTagName("table")[0];
SubmitButtonHTML = '<input type="button" name="geneinstellutschstadtswi" id="geneinstellutschstadtswi" value="Einstellungs-Men&uuml;" />';
var newp = document.createElement("table");
newp.innerHTML = '<br><b><font color="white"><h2>Tier -Penner-WeiterbildungsScript Optionen By Basti1012</h2></font></b><div name="fenster"</div>';			
var newli = document.createElement("tr");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);

document.getElementsByName('geneinstellutschstadtswi')[0].addEventListener('click', function weinkaufen () {
	document.getElementsByName("fenster")[0].innerHTML = ''
	+'<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
	+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich Tier und Penner weiterbildungsscript by basti1012</th></tr>'
	+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
+'Updates wieder aktivieren <input type="button" name="keineupdates1" id="keineupdates1" value="Updates Aktievieren" />'
+'<h2><u>Penner Weiterbildung</u></h2>Penner weiterbildung  Aktivieren :'
+'<input type="checkbox" name="weiter" id="link1"/>'
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Fortschrittbalken:</u></font><a><select name=\"balken\"><option value=\'processbar_active.gif\'>1. Gr&uuml;n</option><option value=\'processbar.jpg\'>2. Blau</option></select></center>'
+''+OBalken1+OBalken2+''
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarbe:</u></font><select name=\"sfarbe\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center>'
+'Wenn beendet ist Status anzeigen : <input type="checkbox" name="kweiter" id="link1"/>'
+'Weiterbildungs-Button  anzeigen : <input type="checkbox" name="buttontier" id="link1"/>'
+'<center><span style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarben bei beendeten text:</u></span><select name=\"swfarbe\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center>'
+'<center>Text wenn keine Bildung :<input name="text" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span><input name="oben" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Links (%)</b></span><input name="links" type="text" size="10" value="" ></center>'
+'<br><h2><u>Weiterbildung in Warteschlange </u></h2>Warteschlangen weiterbildung Aktivieren :'
+'<input type="checkbox" name="weiter" id="link1"/>'
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Fortschrittbalken:</u></font><a><select name=\"balken\"><option value=\'processbar_active.gif\'>1. Gr&uuml;n</option><option value=\'processbar.jpg\'>2. Blau</option></select></center>'
+''+OBalken1+OBalken2+''
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarbe :</u></font><select name=\"sfarbe\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center>'
+'Wenn beendet ist Status anzeigen : <input type="checkbox" name="kweiter" id="link1"/>'
+'Weiterbildungs-Button  anzeigen : <input type="checkbox" name="buttontier" id="link1"/>'
+'<center><span style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarben bei beendeten text:</u></span><select name=\"swfarbe\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center>'
+'<center>Text wenn keine Bildung :<input name="text" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span><input name="oben" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Links (%)</b></span><input name="links" type="text" size="10" value="" ></center>'
+'<br><h2><u>Tier Weiterbildungs </u></h2>Tier weiterbildung Aktivieren : :'
+'<input type="checkbox" name="weiter" id="link1"/>'
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Fortschrittbalken:</u></font><a><select name=\"balken\"><option value=\'processbar_active.gif\'>1. Gr&uuml;n</option><option value=\'processbar.jpg\'>2. Blau</option></select></center>'
+''+OBalken1+OBalken2+''
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarbe :</u></font><select name=\"sfarbe\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center>'
+'Wenn beendet ist Status anzeigen : <input type="checkbox" name="kweiter" id="link1"/>'
+'Weiterbildungs-Button  anzeigen : <input type="checkbox" name="buttontier" id="link1"/>'
+'<center><span style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarben bei beendeten text:</u></span><select name=\"swfarbe\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center>'
+'<center>Text wenn keine Bildung :<input name="text" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span><input name="oben" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Links (%)</b></span><input name="links" type="text" size="10" value="" ></center>'


+'<h2><u>Sammeln verbrechen</u></h2>sammeln verbrechen   Aktivieren :'
+'<input type="checkbox" name="weiter" id="link1"/>'


+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Fortschrittbalken:</u></font><a><select name=\"balken\"><option value=\'processbar_active.gif\'>1. Gr&uuml;n</option><option value=\'processbar.jpg\'>2. Blau</option></select></center>'
+''+OBalken1+OBalken2+''
+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarbe :</u></font><select name=\"sfarbe\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center>'
+'Wenn beendet ist Status anzeigen : <input type="checkbox" name="kweiter" id="link1"/>'

+'<center><span style=\"font-weight:bold; font-size:14px;\"><u>Schriftfarben bei beendeten text:</u></span><select name=\"swfarbe\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center>'
+'Balken reloden aktivieren : <input type="checkbox" name="buttontier" id="link1"/>'
+'<center>Balken relod Zeit :<input name="relod" size="10" type="text" value=""></center>'


+'<center>Text wenn keine Bildung :<input name="text" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span><input name="oben" size="10" type="text" value=""></center>'
+'<center><span align=\"center\" style=\"color:white;\"><b>Von Links (%)</b></span><input name="links" type="text" size="10" value="" ></center>'























+'<input type="button" name="datenspeichern" id="datenspeichern" value="Alle eingaben Speichern und schliessen" /><br>'
+'</td></tr></table>';
document.getElementsByName("relod")[0].value = GM_getValue("relod");
	for(i=0;i<=3;i++){
		document.getElementsByName("buttontier")[i].checked = GM_getValue("buttontier"+i);
		document.getElementsByName("weiter")[i].checked = GM_getValue("bildung"+i);
		document.getElementsByName("kweiter")[i].checked = GM_getValue("kbildung"+i);
		document.getElementsByName("swfarbe")[i].value = GM_getValue("swfarbe"+i);
		document.getElementsByName("sfarbe")[i].value = GM_getValue("sfarbe"+i);
		document.getElementsByName("oben")[i].value = GM_getValue("oben"+i);
		document.getElementsByName("links")[i].value = GM_getValue("links"+i);
		document.getElementsByName("balken")[i].value = GM_getValue("balken"+i);
		document.getElementsByName("text")[i].value = GM_getValue("text"+i);
	}
	document.getElementsByName('datenspeichern')[0].addEventListener('click', function save_spenden () {
GM_setValue("relod", document.getElementsByName("relod")[0].value);
		for(i=0;i<=3;i++){
			GM_setValue("buttontier"+i, document.getElementsByName("buttontier")[i].checked);
			GM_setValue("bildung"+i, document.getElementsByName("weiter")[i].checked);
			GM_setValue("kbildung"+i, document.getElementsByName("kweiter")[i].checked);
			GM_setValue("balken"+i, document.getElementsByName("balken")[i].value);	
			GM_setValue("swfarbe"+i, document.getElementsByName("swfarbe")[i].value);
			GM_setValue("sfarbe"+i, document.getElementsByName("sfarbe")[i].value);
			GM_setValue("oben"+i, document.getElementsByName("oben")[i].value);
			GM_setValue("links"+i, document.getElementsByName("links")[i].value);
			GM_setValue("text"+i, document.getElementsByName("text")[i].value);
		}
		alert("alle deaten erfolgreich gespeichert")
		window.location.reload();
	},false);


document.getElementsByName('keineupdates1')[0].addEventListener('click', function save_spenden () {
GM_setValue("update" ,'true');
alert("Ab sofort kriegst du wieder benachrichtigungen bei neuen Upfdates,wahrscheinlich must du erst wieder neue version runterladen um auf den neusten stand zu sein aber merst du ja wenn ein neuer Hinweis kommt was los ist .");
},false);






},false);
}

keinebildungfarbe0 = GM_getValue("swfarbe0");
keinebildungfarbe1 = GM_getValue("swfarbe1");
keinebildungfarbe2 = GM_getValue("swfarbe2");
keinebildungfarbe3 = GM_getValue("swfarbe3");
keinebildungtext0 = GM_getValue("text0");
keinebildungtext1 = GM_getValue("text1");
keinebildungtext2 = GM_getValue("text2");
keinebildungtext3 = GM_getValue("text3");			
MenueFontColor0 = GM_getValue("sfarbe0");
MenueFontColor1 = GM_getValue("sfarbe1");
MenueFontColor2 = GM_getValue("sfarbe2");
MenueFontColor3 = GM_getValue("sfarbe3");

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#main_container { position:absolute; top:'+GM_getValue("oben0")+'px; left:'+GM_getValue("links0")+'%; width:326px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container { padding-top:15px; padding-bottom:12px; padding-left:4%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:black; font-size:73%; text-align:left; } ')

addGlobalStyle('div#main_container2 { position:absolute; top:'+GM_getValue("oben1")+'px; left:'+GM_getValue("links1")+'%; width:326px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container2 { padding-top:15px; padding-bottom:12px; padding-left:4%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:black; font-size:73%; text-align:left; } ')

addGlobalStyle('div#main_container1 { position:absolute; top:'+GM_getValue("oben2")+'px; left:'+GM_getValue("links2")+'%; width:326px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container1 { padding-top:15px; padding-bottom:12px; padding-left:4%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:black; font-size:73%; text-align:left; } ')

addGlobalStyle('div.prozentbalken_bg_1{ margin-top:2px; margin-left:64px; background:url('+medialink+'processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_1{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle("div#active_prozent_0{color:white;background:url(http://static.pennergame.de/img/pv4/icons/"+GM_getValue("balken0")+") repeat-x;}")
addGlobalStyle("div#active_prozent_1{color:white;background:url(http://static.pennergame.de/img/pv4/icons/"+GM_getValue("balken1")+") repeat-x;}")
addGlobalStyle("div#active_prozent_2{color:white;background:url(http://static.pennergame.de/img/pv4/icons/"+GM_getValue("balken2")+") repeat-x;}")

GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/skills/",
		onload: function(response) {
			var contenta = response.responseText;
			var suche = contenta.search(weiter1);
			if (suche != -1) {
				var aktuelleweiterbildungcontent = contenta.split(weiter1)[1].split('</table>')[0];
				var stufe1 = aktuelleweiterbildungcontent.split(Stufe)[1].split(']')[0];
				var w_end_wait = aktuelleweiterbildungcontent.split('<span class="style_skill">')[1].split('</span>')[0];
				w_type1=w_end_wait;

				for(a=1;a<=9;a++){
					var suchfelder = contenta.split('class="cbox mbottom')[a].split('</table>')[0];
					if(suchfelder.match(w_end_wait)) {
						var skillpic1 = suchfelder.split('<img src="')[1].split('"')[0];
					}
				}

				var date_wait = aktuelleweiterbildungcontent.split('<span class="style_skill">')[2].split('</span></div>')[0];
				var container_2_zeile_1 = "<img src='"+skillpic+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\"><b>N&auml;chste Weiterbildung:</b></p><br/>";
				var container_2_zeile_2 = "<b>Warteschlange: </b><font color=\""+MenueFontColor0+"\">"+w_end_wait+" </font> ["+stufe2+"]<br/>";
				var start_time = contenta.split('var start = ')[1].split(';')[0];
				var end_time = contenta.split('var end = ')[1].split(';')[0];
				var timestamp_w = aktuelleweiterbildungcontent.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
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
				var weiterbildung_0_1 = "Endet am: <font color=\""+MenueFontColor0+"\">"+w_end_day+"</font> um <font color=\""+MenueFontColor0+"\">"+w_end_time+" </font> Uhr";
				var weiterbildung_0_2 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_0\" style=\"width:"+width_balken0+"px;>"+percger0+"&#37;</div></div>";
	
				if(GM_getValue("bildung0")==true){	
					var Weiterbildung = document.createElement('div');
					document.body.appendChild(Weiterbildung);
					Weiterbildung.innerHTML = ""
					+"<div id=\"main_container\" style=\"padding-bottom:21px \"><div class=\"inhalt_container\">"
					+"<img src='"+skillpic1+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\">"
					+"<b>Aktuelle Penner Weiterbildung:</b></p>&nbsp;<br/><b>Weiterbildung:</b> "
					+"<span style=\"color:"+MenueFontColor0+";\">"+w_type1+" </span>["+stufe1+"]<br/>"+weiterbildung_0_1+"<br/>"+weiterbildung_0_2+"</div></div>";
					document.body.appendChild(Weiterbildung);
				}
				}else{
					if(GM_getValue("kbildung0")==true){
						var Weiterbildung2 = document.createElement('div');
						document.body.appendChild(Weiterbildung2);
						Weiterbildung2.innerHTML = '<div id=\"main_container\" style=\"padding-bottom:21px \"><div class=\"inhalt_container\"> <a id="attdefdex0" name="attdefdex0"</a><a class="tooltip" href="#"><b style=\"color:black;\">[Weiterbildungs-Fortschritt Info]</b><span><b>Aktueller Fortschritt eures Penners:</b><br><div id="test1" name="test1"</div></span></a><font color=\"'+keinebildungfarbe0+'\">'+keinebildungtext0+'</font></div></div>';
						document.body.appendChild(Weiterbildung2);
						for(i=1;i<=9;i++){
							welche1 = contenta.split('class="cbox mbottom')[i].split('</table>')[0];
							welche = welche1.split('<strong>')[1].split('<')[0];
							try{
								anaus = welche1.split('disabled')[1].split('disabled')[0];
								farbe = 'red';
							}catch(e){
								farbe = 'green';
							}
							menge = contenta.split('<td width="108">')[i].split('<')[0];
							document.getElementsByName('test1')[0].innerHTML +='<b style=\"color:'+farbe+';\">'+welche+' '+menge+'</b><br>';
						}

						if(GM_getValue("buttontier1")==true){
							document.getElementsByName('attdefdex0')[0].innerHTML =''
							+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Weiterbildung Penner</u></font><br><select name=\"weiterbildungsatart\">'
							+'<option value=\"att\">Angriff</option>'
							+'<option value=\"def\">Verteidigung</option>'
							+'<option value=\"agi\">Geschicklichkeit</option>'
							+'<option value=\"sprechen\">sprechen</option>'
							+'<option value=\"bildungsstufe\">bildungsstufe</option>'
							+'<option value=\"musik\">musik</option>'
							+'<option value=\"sozkontakte\">sozialkontakte</option>'
							+'<option value=\"konzentration\">konzentration</option>'
							+'<option value=\"pickpocket\">Taschendiebstahl</option>'
							+'</select>'
							+'<input type="button" name="dex1" id="dex1" value="Weiterbildung starten"></center>'   

							document.getElementsByName('dex1')[0].addEventListener('click', function fclick(ev) {
								weiterbildungsatart = document.getElementsByName('weiterbildungsatart')[0].value;
								GM_setValue("weiterbildungsatart",weiterbildungsatart)
								GM_setValue("dexsave1","true")
								top.location.href= '/skills/';
							},false);

							var fnow31 = GM_getValue("dexsave1");
							if (fnow31  == "true"){
								GM_setValue("dexsave1", "false");
								weiterbildungsatart = GM_getValue("weiterbildungsatart");
								document.getElementById(weiterbildungsatart).click();
							}
						}
					}
				}

				var suchea = contenta.search(weiter2);
				if (suchea != -1) {
					var warteschlangenanzeigecontent = contenta.split(weiter2)[1].split('</table>')[0];
					var stufe2 = warteschlangenanzeigecontent.split(Stufe)[1].split(']')[0];
					var w_type = warteschlangenanzeigecontent.split('<span class="style_skill">')[1].split('</span>')[0];
					for(a=1;a<=9;a++){
						var suchfelder = contenta.split('class="cbox mbottom')[a].split('</table>')[0];
						if(suchfelder.match(w_type)) {
							var skillpic = suchfelder.split('<img src="')[1].split('"')[0];
						}
					}



					var timeende = warteschlangenanzeigecontent.split('<span class="style_skill"')[2].split('/span>')[0];
					var timeende1 = timeende.split('>')[1].split(',')[0];
					var timeende2 = timeende.split(',')[1].split('<')[0];



					if(timeende1 == 'skill_today'){
						var jetzt = new Date();
						var Stunde = jetzt.getHours();
						var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
						var Minuten = jetzt.getMinutes();
						var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
						var Sek = jetzt.getSeconds();
						var SekA = ((Sek < 10) ? "0" + Sek : Sek);
						var Jahr = jetzt.getFullYear();
						var Tag = jetzt.getDate();
						var TagA = ((Tag < 10) ? "0" + Tag : Tag);
						var Jahresmonat = jetzt.getMonth();
						var Monat = (Number (Jahresmonat) + Number (1))
						var MonatA = ((Monat < 10) ? "0" + Monat : Monat);
						timeende11 = ''+TagA+'.'+MonatA+'.'+Jahr+'';
					}else{
						timeende11 = timeende1;
					}


					var weiterbildung_0_13 = "Endet am: <font color=\""+MenueFontColor1+"\">"+timeende11+"</font> um  <font color=\""+MenueFontColor1+"\">"+timeende2+"</font>Uhr";
					var weiterbildung_0_23 = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_1\" style=\"width:200px;>Warte bis "+w_end_wait+" fertig ist ...;</div></div>";

					if(GM_getValue("bildung1")==true){
						var Weiterbildung2 = document.createElement('div');
						Weiterbildung2.innerHTML = ""
						+"<div id=\"main_container2\" style=\"padding-bottom:21px \"><div class=\"inhalt_container2\">"
						+"<img src='"+skillpic+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\">"
						+"<b>Weiterbildung in Warteschlange:</b></p>&nbsp;<br/><b>Weiterbildung:</b> "
						+"<span style=\"color:"+MenueFontColor1+";\">"+w_type+" </span>["+stufe2+"]<br/>"+weiterbildung_0_13+"<br/>"+weiterbildung_0_23+"</div></div>";
						document.body.appendChild(Weiterbildung2);
					}
				}else{
				if(GM_getValue("kbildung1")==true){
					var Weiterbildung1 = document.createElement('div');
					document.body.appendChild(Weiterbildung1);
					Weiterbildung1.innerHTML = '<div id=\"main_container2\" style=\"padding-bottom:21px \"><div class=\"inhalt_container2\"> <a id="attdefdex1" name="attdefdex1"</a><a class="tooltip" href="#"><b style=\"color:black;\">[Weiterbildungs-Fortschritt Info]</b><span><b>Aktueller Fortschritt eures Penners:</b><br><div id="test" name="test"</div></span></a><font color=\"'+keinebildungfarbe1+'\">'+keinebildungtext1+'</font></div></div>';
					for(i=1;i<=9;i++){
						welche1 = contenta.split('class="cbox mbottom')[i].split('</table>')[0];
						welche = welche1.split('<strong>')[1].split('<')[0];
						try{
							anaus = welche1.split('disabled')[1].split('disabled')[0];
							farbe = 'red';
						}catch(e){
							farbe = 'green';
						}
						menge = contenta.split('<td width="108">')[i].split('<')[0];
						document.getElementsByName('test')[0].innerHTML +='<b style=\"color:'+farbe+';\">'+welche+' '+menge+'</b><br>';
					}

					if(GM_getValue("buttontier1")==true){
						document.getElementsByName('attdefdex1')[0].innerHTML =''
						+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Weiterbildungswarteschlange</u></font><br><select name=\"weiterbildungsatart\">'
						+'<option value=\"att\">Angriff</option>'
						+'<option value=\"def\">Verteidigung</option>'
						+'<option value=\"agi\">Geschicklichkeit</option>'
						+'<option value=\"sprechen\">sprechen</option>'
						+'<option value=\"bildungsstufe\">bildungsstufe</option>'
						+'<option value=\"musik\">musik</option>'
						+'<option value=\"sozkontakte\">sozialkontakte</option>'
						+'<option value=\"konzentration\">konzentration</option>'
						+'<option value=\"pickpocket\">Taschendiebstahl</option>'
						+'</select>'
						+'<input type="button" name="dex1" id="dex1" value="Weiterbildung starten"></center>'   

						document.getElementsByName('dex1')[0].addEventListener('click', function fclick(ev) {
							weiterbildungsatart = document.getElementsByName('weiterbildungsatart')[0].value;
							GM_setValue("weiterbildungsatart",weiterbildungsatart)
							GM_setValue("dexsave1","true")
							top.location.href= '/skills/';
						},false);
						var fnow31 = GM_getValue("dexsave1");
						if (fnow31  == "true"){
							GM_setValue("dexsave1", "false");
							weiterbildungsatart = GM_getValue("weiterbildungsatart");
							document.getElementById(weiterbildungsatart).click();
						}
					}
				}
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: ""+gamelink+"/skills/pet/",
					onload: function(response) {
						var content = response.responseText;
						try{	
							var w_end_wait0 = content.split(weiter1)[1];
							var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
							var tierstufe = content.split('<span class="style_skill">')[1].split('<table')[0].split(Stufe)[1].split(']')[0];
							var w_end0 = content.split(weiter1)[1];
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
								var weiterbildung_0_1a = "Endet am: <font color=\""+MenueFontColor2+"\">"+w_end_day+"</font> um <font color=\""+MenueFontColor2+"\">"+w_end_time+" </font>Uhr";
								var weiterbildung_0_2a = "<div class=\"prozentbalken_bg_1\"><div class=\"prozentbalken_1\" id=\"active_prozent_2\" style=\"width:"+width_balken0+"px;>"+percger0+"&#37;</div></div>";

							for(a=1;a<=3;a++){
								var suchfelder = contenta.split('class="cbox mbottom')[a].split('</table>')[0];
								if(suchfelder.match(w_type1)) {
									var tierpic = suchfelder.split('<img src="')[1].split('"')[0];
								}
							}



								if(GM_getValue("bildung2")==true){
									var Weiterbildung1 = document.createElement('div');
									document.body.appendChild(Weiterbildung1);
									Weiterbildung1.innerHTML = ""
									+"<div id=\"main_container1\" style=\"padding-bottom:21px \"><div class=\"inhalt_container1\">"
									+"<img src='"+tierpic+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\">"
									+"<b>Aktuelle Tier Weiterbildung:</b></p>&nbsp;<br/><b>Weiterbildung:</b> "
									+"<span style=\"color:"+MenueFontColor2+";\">"+w_type1+" </span>["+tierstufe+"]<br/>"+weiterbildung_0_1a+"<br/>"+weiterbildung_0_2a+"</div></div>";
								}
						}catch(e){
						if(GM_getValue("kbildung2")==true){
							var Weiterbildung1 = document.createElement('div');
							document.body.appendChild(Weiterbildung1);
							Weiterbildung1.innerHTML = '<div id=\"main_container1\" style=\"padding-bottom:21px \"><div class=\"inhalt_container1\"><a id="attdefdex2" name="attdefdex2"</a><a class="tooltip" href="#"><b style=\"color:black;\">[Weiterbildungs-Fortschritt Info]</b><span><b>Aktueller Fortschritt eures Haustieres:</b><br><div id="test2" name="test2"</div></span></a><font color=\"'+keinebildungfarbe2+'\">'+keinebildungtext2+'</font></div></div>';
							for(i=1;i<=3;i++){
								welche1 = content.split('height="19"><stron')[i].split('</table>')[0];
								welche = welche1.split('g>')[1].split('<')[0];
								try{
									anaus = welche1.split('disabled')[1].split('disabled')[0];
									farbe = 'red';
								}catch(e){
									farbe = 'green';
								}
								menge = content.split('<td width="108">')[i].split('<')[0];
								document.getElementsByName('test2')[0].innerHTML +='<b style=\"color:'+farbe+';\">'+welche+' '+menge+'</b><br>';
							}

							if(GM_getValue("buttontier2")==true){
								document.getElementsByName('attdefdex2')[0].innerHTML =''
								+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Weiterbildung Tier</u></font><br><select name="satarttier">'
								+'<option value=\"0\">Angriff</option>'
								+'<option value=\"1\">Verteidigung</option>'
								+'<option value=\"2\">Geschicklichkeit</option>'
								+'</select>'
								+'<input type="button" name="dex4" id="dex4" value="Weiterbildung starten"></center>'   
								document.getElementsByName('dex4')[0].addEventListener('click', function fclick(ev) {
									weiterbildungsatarttier = document.getElementsByName('satarttier')[0].value;
									GM_setValue("weiterbildungsatarttier",weiterbildungsatarttier)
									GM_setValue("dexsave4","true")
									top.location.href= '/skills/pet/';
								},false);
								var fnow31 = GM_getValue("dexsave4");
								if (fnow31  == "true"){
									GM_setValue("dexsave4", "false");
									weiterbildungsatarttier = GM_getValue("weiterbildungsatarttier");
									document.getElementsByName('Submit')[weiterbildungsatarttier].click();
								}
							}
						}
					}
				}
			});
		}
});


addGlobalStyle('div#main_container4 { position:absolute; top:'+GM_getValue("oben3")+'px; left:'+GM_getValue("links3")+'%; width:326px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container4 { padding-top:15px; padding-bottom:12px; padding-left:4%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:black; font-size:73%; text-align:left; } ')

addGlobalStyle('div.prozentbalken_bg_4{ margin-top:2px; margin-left:64px; background:url('+medialink+'processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_4{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle("div#active_prozent_4{color:white;background:url(http://static.pennergame.de/img/pv4/icons/"+GM_getValue("balken3")+") repeat-x;}")


if (url.indexOf("/activities/crime/?id=")>=0) {
	var class = document.getElementById('ntext').innerHTML;
	var pclass = class.split('<p>')[1].split('wurde gestartet')[0];
GM_setValue("pclass" ,pclass);
}
if (url.indexOf("/activities/bottle/")>=0) {
	var classa = document.getElementById('ntext').innerHTML;
	var pclassa = classa.split('r')[1].split('a')[0];
	pclassa = pclassa.replace(/Minuten/g,"Minuten Flaschen sammeln");
	GM_setValue("pclass" ,pclassa);
}





function fortschritt(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ""+gamelink+"/activities/",
		onload: function(response) {
			var content = response.responseText;




			try{
				var suche = content.search('Du bist auf Pfandflaschensuche:');
				if (suche != -1) {

					var contenty = content.split("Du bist auf Pfandflaschensuche:")[1].split('Beendete Verbrechen betrachten')[0];
					var was = 'Pflaschen sammeln:';
					var bild = 'http://static.pennergame.de/img/pv4/shop/de_DE/aktionen/flaschensammeln.jpg';
				}
				var suche1 = content.search('Du bist noch unterwegs:');
				if (suche1 != -1) {
					var contenty = content.split("Du bist noch unterwegs:")[1].split('Beendete Verbrechen betrachten')[0];
					var was = 'Aktuelle Verbrechen:';
					var bild = 'http://static.pennergame.de/img/pv4/shop/de_DE/aktionen/crime.jpg';
				}


				var mengebalken = contenty.split('width:')[2].split('px')[0];
				wieweit3 = Math.round((mengebalken/3)*1000)/1000;
				wieweit13 = wieweit3*2;
				var uhr = contenty.split('counter(')[1].split(')')[0];
				var info1 = "Endet in: <font color=\""+MenueFontColor3+"\">"+uhr+"</font>Sekunden ";
				var info2 = "<div class=\"prozentbalken_bg_4\"><div class=\"prozentbalken_4\" id=\"active_prozent_4\" style=\"width:"+wieweit13+"px;>"+wieweit3+"&#37;</div></div>";

				var Weiterbildung4 = document.createElement('div');
				document.body.appendChild(Weiterbildung4);
				Weiterbildung4.innerHTML = ''
				+'<div id=\"main_container4\" style=\"padding-bottom:21px \"><div class=\"inhalt_container4\">'
				+"<img src='"+bild+"' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\">"
				+"<b>"+was+"</b></p>&nbsp;<br/><b>"+GM_getValue("pclass")+"</b> "
				+"<span style=\"color:black;\"></span><br/>"+info1+"<br/>"+info2+"</div></div>";
			}catch(e){

			if(GM_getValue("buttontier2")==true){
				var Weiterbildung4 = document.createElement('div');
				document.body.appendChild(Weiterbildung4);
				Weiterbildung4.innerHTML = ''
				+'<div id=\"main_container4\" style=\"padding-bottom:21px \"><div class=\"inhalt_container4\"><a name="sammel"</a><font color=\"'+keinebildungfarbe3+'\">'+keinebildungtext3+'</font></div></div>';

				document.getElementsByName('sammel')[0].innerHTML =''
				+'<center><font style=\"font-weight:bold; font-size:14px;\"><u>Verbrechen ,Sammeln</u></font><br>'

				+'<select name="samverbrechen">'
				+'<option value=\"0\">10 Minuten sammeln</option>'
				//+'<option value=\"0\">Kaugummiautomat aufbrechen</option>'
				+'<option value=\"1\">Geld vom Klohäuschen klauen</option>'
				+'<option value=\"2\">Waschsalon ausrauben</option>'
				+'<option value=\"3\">Currybude überfallen</option>'
				+'<option value=\"4\">Bäckerei überfallen</option>'
				+'<option value=\"5\">Im Kiosk klauen</option>'
				+'<option value=\"6\">Tankstelle überfallen</option>'
				+'<option value=\"7\">McBurger überfallen</option>'
				+'<option value=\"8\">Im Supermarkt klauen</option>'
				+'<option value=\"9\">Elektrohandel überfallen</option>'
				+'<option value=\"10\">Landesbank überfallen</option>'
				+'</select>'
				+'<input type="button" name="sammeln" id="sammeln" value="10 Minuten Sammeln starten"></center>'   ;

				document.getElementsByName('sammeln')[0].addEventListener('click', function fclick(ev) {
				sammelverbrechen = document.getElementsByName('samverbrechen')[0].value;

				if (sammelverbrechen ==0) {
				GM_setValue("sammelverbrechen",sammelverbrechen)
				GM_setValue("sammeln","true")
				top.location.href= '/activities/';


				}else{
				GM_setValue("sammelverbrechen",sammelverbrechen)
				GM_setValue("sammeln","true")
				top.location.href= '/activities/crime/';

				}
			},false);

			var fnow31 = GM_getValue("sammeln");
			if (fnow31  == "true"){
			GM_setValue("sammeln","false")
			sammelverbrechen = GM_getValue("sammelverbrechen");
			document.getElementsByClassName('button_skill')[sammelverbrechen].click();
			}


			}
			}
		}
	});
}

if(GM_getValue("bildung3")==true){
	fortschritt()
	if(GM_getValue("buttontier3")==true){
		var abcd = GM_getValue("relod");
		window.setInterval(fortschritt, abcd);
	}
}













/*








































































GM_setValue("oben4" ,'650');
GM_setValue("links4" ,'1');
GM_setValue("balken4" ,'processbar_active.gif');
keinebildungfarbe4 = 'green';


keinebildungtext4 = 'keine fight';
MenueFontColor4 = 'red';


addGlobalStyle('div#main_container5 { position:absolute; top:'+GM_getValue("oben4")+'px; left:'+GM_getValue("links4")+'%; width:326px;}')
addGlobalStyle('p.Head {line-height:25%; font-size:98%; font-weight:bold; color:black; text-decoration:underline; margin-bottom:-5px}')
addGlobalStyle('.inhalt_container5 { padding-top:15px; padding-bottom:12px; padding-left:4%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:black; font-size:73%; text-align:left; } ')

addGlobalStyle('div.prozentbalken_bg_5{ margin-top:2px; margin-left:64px; background:url('+medialink+'processbar_bg.jpg) repeat-x;border:1px solid #000;height:12px;width:200px}')
addGlobalStyle('div.prozentbalken_5{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url('+medialink+'processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle("div#active_prozent_5{color:white;background:url(http://static.pennergame.de/img/pv4/icons/"+GM_getValue("balken4")+") repeat-x;}")


if(GM_getValue("buttontier4")==true){}
if(GM_getValue("kbildung4")==true){}
if(GM_getValue("bildung4")==true){}



GM_xmlhttpRequest({
	method: 'GET',
		url: ""+gamelink+"/fight/overview/",
		onload: function(response) {
		var content = response.responseText;

		var min = content.split("Dein Ziel muss ")[1].split(' bis ')[0];
		var max = content.split("bis ")[1].split(' Punkte')[0];

		var suche = content.search('uft bereits auf');
		if (suche != -1) {
			var gegner1 = content.split("ft bereits auf <a")[1].split('</a>')[0];
			var id = gegner1.split("/profil/id:")[1].split('/')[0];
			var name = gegner1.split(">")[1].split('<')[0];
			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+gamelink+'/dev/api/user.'+id+'.xml',
				onload: function(responseDetails) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
					var name = dom.getElementsByTagName('name')[0].textContent;
					var id = dom.getElementsByTagName('id')[0].textContent;
					var platz = dom.getElementsByTagName('position')[0].textContent;
					var pts = dom.getElementsByTagName('points')[0].textContent;
					var reg = dom.getElementsByTagName('reg_since')[0].textContent;
					var city = dom.getElementsByTagName('city')[0].textContent;

					try{
						var cash = dom.getElementsByTagName('cash')[0].textContent/100;
					}catch(e){
						cash='- - -';
					}

					try{
						var bande = dom.getElementsByTagName('name')[1].textContent;
						var status = dom.getElementsByTagName('status')[0].textContent;
					}catch(e){
						var bande = 'No';
						var bandeid = 'e';
					}

if (status==3) {
var statu = '<font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
}else if (status==2) {
var statu = '<font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
}else if (status==1) {
var statu = '<font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
}else if (status==0) {-';//<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
var statu = '-';

}
try{
var cash = dom.getElementsByTagName('cash')[0].textContent/100;
var pro = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' + siglink + id + '.jpg"></div></div>';
}catch(e){
var pro = '- - -';
}

var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
if (cash <= 100001){
farbe1 = "black";}
if (cash <= 90001){
var farbe1 = "gray";}
if (cash <= 80001){
farbe1 = "blue";}
if (cash <= 70001){
var farbe1 = "cyan";}
if (cash <= 60001){
farbe1 = "red";}
if (cash <= 50001){
var farbe1 = "green";}
if (cash <= 40001){
farbe1 = "magenta";}
if (cash <= 30001){
farbe1 = "orange";}
if (cash <= 20001){
var farbe1 = "yellow";}
if (cash <= 10001){
var farbe1 = "white";}




fight1 = 'Ausgehender Kampf';

gegner ='<a href="/profil/id;'+id+'/"><font color=\"'+MenueFontColor4+'\">'+name+'</font></a>';
infoo ='<a class="tooltip" href="/help/ATT/"><font color=\"'+MenueFontColor4+'\">?</font><span><b>pENNER INFOS:</b><br>'
+'Name = '+name+'<br>'
+'Platz = '+platz+'<br>'
+'Punkte = '+pts+'<br>'
+'Reg '+reg+'<br>'
+'Bande = '+bande+'<br>'
+'Status = '+status+'<br>'
+'Stadt = '+city+'<br>'
+'Geld = <font style=\"color:'+farbe1+'; font-size:100%;\">'+cash+'</font><br>'
+'Promille = '+pro+'<br>'
+'</span></a></td>';

var zeit = content.split("Ende")[1].split('br')[0];
var tag = zeit.split("ca. ")[1].split('.')[0];
var mon = zeit.split(".")[2].split('.')[0];
var jah = zeit.split(".")[3].split(' ')[0];
var stu = zeit.split(""+jah+" ")[1].split(':')[0];
var min = zeit.split(":")[1].split(':')[0];
var sek = zeit.split(":")[2].split(' ')[0];
tag1 =((tag*24)*60)*60;
min1 = (min*60);
stu1 = (stu*60)*60;
sek1 = sek;
fightzeit = Number(tag1)+Number(stu1)+Number(min1);//+Number(sek);
GM_setValue("fightzeit" ,fightzeit);



function fightrelod (){

	var jetzt = new Date();
	var Stunde = jetzt.getHours();
	var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);
	var Minuten = jetzt.getMinutes();
	var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);
	var Tag = jetzt.getDate();
	var TagA = ((Tag < 10) ? "0" + Tag : Tag);
	var Sek = jetzt.getSeconds();
	var SekA = ((Sek < 10) ? "0" + Sek : Sek);

	tag2 =((TagA*24)*60)*60;
	min2 = MinutenA*60;
	stu2 = (StundeA*60)*60;
	sek2 = SekA;
	fightzeit2 =Number(tag2)+Number(stu2)+Number(min2)+Number(sek2);
	ende = fightzeit-fightzeit2;

	wieweit1 = ende/36;

	wieweit =wieweit1/2;

	var info11 = "Endet in: <font color=\""+MenueFontColor4+"\">"+ende+"</font> Minuten";
	var info22 = "<div class=\"prozentbalken_bg_5\"><div class=\"prozentbalken_5\" id=\"active_prozent_4\" style=\"width:"+wieweit1+"px;>"+wieweit+"%</div></div>";










	var Weiterbildung5 = document.createElement('div');
	document.body.appendChild(Weiterbildung5);
	Weiterbildung5.innerHTML = ''
	+'<div id=\"main_container5\" style=\"padding-bottom:21px \"><div class=\"inhalt_container5\">'
	+"<img src='http://t2.gstatic.com/images?q=tbn:AEha0tI5pIAtIM:http://www.euse.de/art/faust.gif' alt='' style='margin:4px; float:left; ' width='55' height='50'/><p class=\"Head\">"
	+"<b>"+fight1+"</b></p>&nbsp;<br/><b></b> "
	+"<span style=\"color:black;\">Gegen "+gegner+"</span>: Info: ["+infoo+"]<br/>"+info11+"<br/>"+info22+"</div></div>";
	}

	var abcd = '1000';
	window.setInterval(fightrelod, abcd);


}});
}else{
var Weiterbildung5 = document.createElement('div');
document.body.appendChild(Weiterbildung5);
Weiterbildung5.innerHTML = ''
+'<div id=\"main_container5\" style=\"padding-bottom:21px \"><div class=\"inhalt_container5\"><a href="'+gamelink+'/highscore/user/?min='+min+'&max=5'+max+'"><font color=\"'+keinebildungfarbe4+'\">Gegner suchen in dein Bereich</font></a><br><font color=\"'+keinebildungfarbe4+'\">'+keinebildungtext4+'</font></div></div>';

}



}});












*/








