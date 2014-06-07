// ==UserScript==
// @name           Highscore Geld suche in Punkte bereich (alle games version 4(promille)) lets fight bereich aufgemotzt mit seiten anwahl und promille suche 
// @namespace      zeigt in highscore geld an in den punkte bereich 
// @author         Basti1012
// @include        http://*berlin.pennergame.de/fight/overview/*
// @exclude        http://*berlin.pennergame.de/highscore/gang/*
// @include        http://*pennergame.de/fight/overview/*
// @exclude        http://*pennergame.de/highscore/gang/*
// @include        http://*dossergame.co.uk/fight/overview/*
// @exclude        http://*dossergame.co.uk/highscore/gang/*
// @include        http://*menelgame.pl/fight/overview/*
// @exclude        http://*menelgame.pl/highscore/gang/*
// @include        http://*clodogame.fr/fight/overview/*
// @exclude        http://*clodogame.fr/highscore/gang/*
// @include        http://*mendigogame.es/fight/overview/*
// @exclude        http://*mendigogame.es/highscore/gang/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
var i = GM_getValue("i");
if (i == null){
i = '1';
GM_setValue("i" , i);
};

var pro1 = GM_getValue("pro1");
if (pro1 == null){
pro1 = '1';
GM_setValue("pro1" , pro1);
};

var Blinktext4 = '<font style=\"color:red; font-size:300%;\"><b>Suche beendet</b></font>';
var Blinktext3 = '<font style=\"color:green; font-size:300%;\"><b>Bitte warten suche l&auml;uft..</b></font>';
var Blinktext = '<font style=\"color:red; font-size:150%;\"><b>Suche beendet</b></font>';
var blinkTimeout = 500;
var blinkIdx = 0;

function blink () {

	if ( document.all && document.all.blink ) {
		blinkIdx = (blinkIdx+=1) % 2 ;
		var color = blinkColTbl [ blinkIdx ];
			if ( document.all.blink.length ) {
				for(i=0;i<document.all.blink.length;i++)
				document.all.blink[i].style.color=color;
			} else
			document.all.blink.style.color=color;
			setTimeout( "blink();" , blinkTimeout);
		}
	}

document.getElementsByClassName('content')[0].innerHTML =
'<ul>'+
'<li><a href="/fight/overview/" alt="Kampf" title="Kampf">Kampf</a></li>'+
'<li><a href="/fight/pet/" alt="Haustierk&auml;mpfe" title="Haustierk&auml;mpfe">Haustierk&auml;mpfe</a>'+
'<li></li>'+
'<li><a name="PennergameSpam" id="PennergameSpam" alt="Pennergame Spam" title="Pennergame Spam" style="height: 33px;font-size:14px;"><b>Geldsuche</b></a></li>'+
'</ul>';

document.getElementById('PennergameSpam').addEventListener('click', function linktklickerone() {

var anleitung = '<span style=\"color:yellow; font-size:150%;\"><b><strong>Such Beschreibung</strong></b></span><br>'
	+'<span style=\"color:yellow; font-size:110%;\"><b>Geld:</b></span> Mindest Angabe ab wie viel Geld Gegner angezeigt werden sollen.'
	+'<span style=\"color:yellow; font-size:110%;\"><b>Min-Punkte:</b></span> Minimal Punkte ab wann gesucht werden soll.'
	+'<span style=\"color:yellow; font-size:110%;\"><b>Max-Punkte:</b></span> Maximal punkte bis wo gesucht werden soll.'
	+'<span style=\"color:yellow; font-size:110%;\"><b>Promille:</b></span>Es werden Speziel nur Gegner mit oder ohne Promille Angezeigt.'




	+'<span style=\"color:yellow; font-size:110%;\"><b>Menge:</b></span> Hier gibt ihr die seiten an die durchsucht werden sollen '





	+'Pennergame hat ja immer mehrere seiten die man durchsuchen kann'
	+'Hier gibt ihr zb 5 an und es werden 5 highscoreseiten durchsucht'
	+'5 seiten sind ca 100 penner ,jenachdem wie schnell euer Pc ist '
	+'k&ouml;nnt ihr die Zahl erh&ouml;hen oder niedriger stellen ,'
	+'ich empfehle 5,kann aber jeder so machen wie er will '
	+'Nach Punkte suchen = Ihr gibt euren Punkte von bis an wo gesucht '
	+'werden soll und es werden dann auf der Highscoreliste die Penner '
	+'angezeigt die in den Punkte Bereich liegen .'
	+'Nach Geld suchen = Nach eingabe von Geld ,min und max Punkte,menge ,'
	+'auf den button klicken und er durchsucht dann 20*menge penner ,'
	+'alle penner die in den Minimum Geldbereich sind werden aufgelistet,'
	+'Die suche Stopt bei 100 prozent und dann wenn er die Seite erreicht hat,'
	+'Wo ihr den menge bereich angegebe habt '
	+'<br><strong>Mfg basti1012</strong><br><font style=\"color:white; font-size:100%;\"><b><div align="left" name="testi" id="testi"></div></b></font>';

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/fight/overview/',
			onload: function( response ) {
				var lf = response.responseText;
				var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
				var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
        			hs2 = Math.round(attmin*1.25/3);

				GM_setValue("attmax" , attmax);
				GM_setValue("attmin" , attmin);
				GM_setValue("money" , hs2);
						}
			});

var inhalt = '<div class="settingpoint"><table border="0" cellspacing="0" cellpadding="0">'
		+'<td width="500" height="70"><tr>'
		+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br><font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalkia" id="sbalkia"></div></b></font>'
		+'Ab Geld :<input id="minimum" name="minimum" maxlength="7" size="4" value="'+GM_getValue("money")+'" type="text" />'
		+'Min-Punkte<input name="min_points" id="min_points" maxlength="8" size="4" value="'+GM_getValue("attmin")+'" type="text" />'
		+'Max-Punkte<input id="max_points" name="max_points" maxlength="8" size="4" value="'+GM_getValue("attmax")+'" type="text" /> '
		+'Menge:<input id="menge" name="menge" maxlength="2" size="2" value="'+GM_getValue("menge")+'" type="text" /> '
		+'<input type="button" id="geldsucher" name="geldsucher" value="Gegner nach Geld suchen" />'
		+'<input type="button" id="punkte" name="punkte" value="Gegner nach Punkte Suchen" /><br>'

+'<font color=\"orange\">Promille JA/NEIN:</font>'
+'<select id="promille" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="1">Suche ohne Promille</option>'
+'<option value="2">Nur Penner mit Promille</option>'
+'</select>';	
+'</div></td></tr>';

		var butener1q =document.getElementById('content');
		var tr = butener1q.getElementsByTagName('table')[0];
		tr.innerHTML = ''+anleitung+''+inhalt+'<table class="list" border="1" width="740"><tbody><tr bgcolor="#272727">'
		+'<th scope="col" align="left" width="50">E--</th>'
		+'<th scope="col" align="left" bgcolor="#272727" width="50">Platz</th>'
		+'<th scope="col" align="left" bgcolor="#272727" width="70">Punkte</th>'
		+'<th align="right" width="100">Geld</th>'
		+'<th align="left" width="50">SMS</th>'
		+'<th align="center" width="50">FIGHT</th> '
		+'<th scope="col" align="left" bgcolor="#272727" width="80">Promille</th>'
		+'<th align="center" width="290">NAME</th> </tr>' ;

			document.getElementById('punkte').addEventListener('click', function linktklickerone() {
				var max = document.getElementById('max_points').value;
				var min = document.getElementById('min_points').value;
				window.location.href = 'http://berlin.pennergame.de/highscore/range/?max_points='+max+'&min_points='+min+'';
				alert("Suche Penner in den Punktebereich von \nMin:"+min+"\nMax:"+max+"");
			},false);

document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
				var max = document.getElementById('max_points').value;
				var min = document.getElementById('min_points').value;
				var minimum = document.getElementById('minimum').value;
				var menge = document.getElementById('menge').value;
var pro1 = document.getElementById('promille').value;
GM_setValue("pro1" , pro1);

				GM_setValue("menge" , menge);
				k=0;
				x=1;
				ee=1;
				nochmal(x,k,ee);

					function nochmal(x,k,ee){
						var menge = GM_getValue("menge");
							if(i<=Number(menge)){
								if(x<=19){

								var insgesamt = menge*19;
								o=insgesamt;

								auf100 = 100/o;
								l=k+Number(1);
							
								
			var prozi = Math.round((auf100*l)*10)/10
			var balki = Math.round((prozi*3)*10)/10
			document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; ['+prozi+'%] Suche bei '+k+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';

			i = GM_getValue("i");

			GM_xmlhttpRequest({
       				method: 'GET',
            			 url: ''+link+'/highscore/range/'+i+'/?max_points='+max+'&min_points='+min+'',
             			 onload: function(responseDetails) {
            			 	var content = responseDetails.responseText;

					var table = content.split('class="settingpoint2')[1];
					var table1 = table.split('</table>')[0];

					var feld = table1.split('class="zeileB">')[x];
					var feld1 = feld.split('</tr>')[0];

					var id = feld1.split('<a href="/profil/id:')[1];
					var id2 = id.split('/')[0];
					k++;

			GM_xmlhttpRequest({
 				method: 'GET',
   	 				url: ''+link+'/dev/api/user.'+id2+'.xml',
	 				onload: function(responseDetails) {
         				var parser = new DOMParser();
        				 var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	
			var nam = dom.getElementsByTagName('name')[0].textContent;
	 		var id = dom.getElementsByTagName('id')[0].textContent;
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;

						try{
					var cash = dom.getElementsByTagName('cash')[0].textContent/100;
					var highlightita = 5000;
					var highlightit0 = 5001;
					var highlightit1 = 10000;
					var highlightit2 = 20000;
					var highlightit3 = 50000;
					var highlightit4 = 75000;
					var highlightit5 = 125000;

					if (cash <= highlightita){
						farbe = "white";
					}
					if (cash >= highlightit0){
						var farbe = "#F91805";
					}
					if (cash >= highlightit1){
						var farbe = "#EE4611";
					}
					if (cash >= highlightit2){
						var farbe = "#F6A008";
					}
					if (cash >= highlightit3){
						var farbe = "#D9EA14";
					}
					if (cash >= highlightit4){
						var farbe = "#0EF905";
					}
					if (cash >= highlightit5){
						var farbe = "#450FEF";
					}

var promi =GM_getValue("pro1");
	if(cash>Number(minimum)){
if(promi==1){
		tr.innerHTML += '<table class="list" border="1" width="740"><tbody><tr bgcolor="#272727">'
			+'<th scope="col" align="left" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
			+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
			+'<th align="left" width="100"></th>'
			+'<th align="left" width="50"></th>'
			+'<th align="center" width="50"></th> '
			+'<th align="center" width="80"></th>'
  			+'<th align="center" width="290"></th></tr>' 
			+'<tr bgcolor="red"><tr class="zeileB">'
			+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
			+'<td align="left" valign="bottom">'+platz+'</td>'
			+'<td align="left" valign="bottom">'+punkte+'</td>'
			+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
			+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
			+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'

			+'<td align="left" valign="bottom">Ausgeschaltet</td>'

			+'<td align="center" ><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
			+'</tr></tr></tbody></table>';
			ee++;

}
if(promi==2){
try{
tr.innerHTML += '<table class="list" border="1" width="740"><tbody><tr bgcolor="#272727">'
	+'<th scope="col" align="left" width="50"></th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="50"></th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="70"></th>'
	+'<th align="left" width="100"></th>'
	+'<th align="left" width="50"></th>'
	+'<th align="center" width="50"></th> '
	+'<th align="center" width="80"></th>'
  	+'<th align="center" width="290"></th></tr>' 
	+'<tr bgcolor="red"><tr class="zeileB">'
	+'<td align="left" valign="bottom"><strong>'+k+'</strong></td>'
	+'<td align="left" valign="bottom">'+platz+'</td>'
	+'<td align="left" valign="bottom">'+punkte+'</td>'
	+'<td align="right" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+'&euro;</b></font></td>'
	+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
	+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td>'
	+'<td align="left" valign="bottom"><div style="overflow: hidden; width: 40px; height: 13px;"><img style="position: relative; top: -42px; left: -120px;" src="http://img.pennergame.de/cache/bl_DE/signaturen/' + id + '.jpg"></div></td>'
	+'<td align="center" ><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
+'</tr></tr></tbody></table>';
ee++;
}catch(e){}

}
}			
}catch(e){}
						x++;
						nochmal(x,k,ee);

						}
					});
				}
			});

}else{
		x=1;
		i++;

		document.getElementsByName('testi')[0].innerHTML = '<blink><span id="blink">'+Blinktext3+'</span></blink>';
		document.getElementsByName('sbalkia')[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b><blink><span id="blink">Suche l&auml;ft Scanne Seite '+i+'</span></blink></b></font>'
		GM_setValue("i" , i);
		nochmal(x,k,ee);
}
}else{

		document.getElementsByName('testi')[0].innerHTML = '<blink><span id="blink">'+Blinktext4+'</span></blink>';
		document.getElementsByName('sbalkia')[0].innerHTML = '<blink><span id="blink">'+Blinktext+'</span></blink>';
		ff=ee-1;

		tr.innerHTML += '<table class="list" border="1" width="740"><tbody><tr bgcolor="#272727"><th scope="col" align="left" width="90"></th>'
		+'<th scope="col" align="left" bgcolor="#272727" width="50"></th><th scope="col" align="left" bgcolor="#272727" width="120"></th><th align="left" width="100"></th><th align="left" width="50"></th><th align="center" width="50"></th> <th align="center" width="80"></th><th align="center" width="200"></th> </tr>' 
		+'<tr bgcolor="red"><tr class="zeileB"><td align="left" valign="bottom"><strong>Ende</strong></td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de">Mehr scripte hier</a></td>'
		+'<td align="left" valign="bottom"></td><td align="left" valign="bottom"><font style=\"color:yellow; font-size:100%;\"><b>'+ff+'</b></font> Gegner gefunden</td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de"><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0" height="33" width="33"></a> </td>'
		+'<td align="left" valign="bottom"><a href="http//www.penerhack.foren-city.de""><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0" height="33" width="33"></a> </td></tr></tr></tbody></table>';

		GM_deleteValue("i");
}
}
},false);
},false);