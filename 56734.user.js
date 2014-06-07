// ==UserScript==
// @name           Highscore Geld suche in Punkte bereich (alle games version 2)
// @namespace      zeigt in highscore geld an in den punkte bereich 
// @author         Basti1012
// @include        http://*berlin.pennergame.de/highscore*
// @exclude        http://*berlin.pennergame.de/highscore/gang/*
// @include        http://*pennergame.de/highscore*
// @exclude        http://*pennergame.de/highscore/gang/*
// @include        http://*dossergame.co.uk/highscore*
// @exclude        http://*dossergame.co.uk/highscore/gang/*
// @include        http://*menelgame.pl/highscore*
// @exclude        http://*menelgame.pl/highscore/gang/*
// @include        http://*clodogame.fr/highscore*
// @exclude        http://*clodogame.fr/highscore/gang/*
// @include        http://*mendigogame.es/highscore*
// @exclude        http://*mendigogame.es/highscore/gang/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}

var safer =document.getElementsByTagName('h1')[1];
safer.innerHTML ='<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br><font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalkia" id="sbalkia"></div></b></font>';


var tra = document.getElementsByClassName('settingpoint2')[0];
var tr= tra.getElementsByTagName('table')[0];
tr.innerHTML = '<table class="list" border="1" width="534"><tbody><tr bgcolor="#272727"><th scope="col" align="left" width="60">Platz</th>'
+'<th scope="col" align="left" bgcolor="#272727" width="360">Name</th><th scope="col" align="left" bgcolor="#272727" width="180">Punkte</th><th align="left" width="120">Geld</th><th align="left" width="30"></th><th align="center" width="30">&nbsp;</th> <th align="center" width="20">&nbsp;</th> </tr>' 

var sucheneue = document.getElementsByClassName("settingpoint")[0];
sucheneue.innerHTML +='<div class="settingpoint"><table border="0" cellspacing="0" cellpadding="0">'
+'<td width="173" height="20"><tr>'
+'Geldsuche beginnen:<input type="button" id="geldsucher" name="geldsucher" value="GeldSucher" /><br>'
+'<tr><td width="173"><div align="right">Mindestens</div></td><td width="255"><input name="min_points" id="min_points" maxlength="10" size="10" type="text" /> Punkte</td>'
+'</tr><tr><td><div align="right">Maximal</div></td><td width="255"><input id="max_points" name="max_points" maxlength="10" size="10" type="text" /> '
+'Punkte</td></tr><tr><td>&nbsp;</td><td><div align="right"><input type="button" id="punkte" name="punkte" value="Suchen" /></div></td>'

+'</tr></table></td></tr>';


document.getElementById('punkte').addEventListener('click', function linktklickerone() {
var max = document.getElementById('max_points').value;
var min = document.getElementById('min_points').value;
window.location.href = 'http://berlin.pennergame.de/highscore/range/?max_points='+max+'&min_points='+min+'';
alert("Suche Penner in den Punktebereich von \nMin:'+min+'\nMax:'+max+'");
},false);

var i = GM_getValue("i");
if (i == null){
i = '1';
GM_setValue("i" , i);
};
document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
var max = document.getElementById('max_points').value;
var min = document.getElementById('min_points').value;
k=0;
x=1;
ee=1;
nochmal(x,k,ee);

function nochmal(x,k,ee){
	if(i<=5){
	if(x<=19){

		var insgesamt = 5*19;
		o=insgesamt;

		auf100 = 100/o;
		l=k+Number(1);
		prozi =auf100*l;
		balki =prozi*3;

		document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; ['+prozi+'%] Suhce bei '+k+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';

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



	tr.innerHTML += '<table class="list" border="5" width="534"><tbody><tr bgcolor="#272727"><th scope="col" align="left" width="60"></th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="250"></th><th scope="col" align="left" bgcolor="#272727" width="100"></th><th align="left" width="60"></th><th align="left" width="60"></th><th align="center" width="20"></th> <th align="center" width="20"></th> </tr>' 
	+'<tr bgcolor="red"><tr class="zeileB"><td align="left" valign="bottom"><strong>'+platz+'</strong></td>'
	+'<td align="left" valign="bottom"><a href="/profil/id:'+id+'/" style="text-decoration: none;">'+nam+'</a></td>'
	+'<td align="left" valign="bottom">'+punkte+'</td><td align="left" valign="bottom"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+'&nbsp;&euro;</b></font></td>'
	+'<td align="left" valign="bottom"><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a> </td>'
	+'<td align="left" valign="bottom"><a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a> </td></tr></tr></tbody></table>';

ee++;

//tr.innerHTML += '<div style="padding: 6px; background-color: rgb(42, 42, 42); width: 300px; margin-left: 88px; -moz-border-radius-topleft: 4px; -moz-border-radius-topright: 4px; -moz-border-radius-bottomright: 4px; -moz-border-radius-bottomleft: 4px;">'
//+'<td><a href="/profil/id:'+id+'/"">'+nam+'</a>  <strong>Cash '+cash+' &euro;</strong> <a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a><a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a></td></tr>';

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
		document.getElementsByName('sbalkia')[0].innerHTML = '<font style=\"color:green; font-size:100%;\"><b>Scanne Seite '+i+'</b></font>';

		GM_setValue("i" , i);
		nochmal(x,k,ee);
		}
		}else{
		document.getElementsByName('sbalkia')[0].innerHTML = '<font style=\"color:red; font-size:100%;\"><b>Die suche ist beendet</b></font>';



tr.innerHTML += '<table class="list" border="5" width="534"><tbody><tr bgcolor="#272727"><th scope="col" align="left" width="60"></th>'
+'<th scope="col" align="left" bgcolor="#272727" width="250"></th><th scope="col" align="left" bgcolor="#272727" width="100"></th><th align="left" width="60"></th><th align="left" width="60"></th><th align="center" width="20"></th> <th align="center" width="20"></th> </tr>' 
+'<tr bgcolor="red"><tr class="zeileB"><td align="left" valign="bottom"><strong>Ende</strong></td>'
+'<td align="left" valign="bottom"><a href="http//pennerhack.foren-city.de" style="text-decoration: none;">Mehr scripte hier</a></td>'
+'<td align="left" valign="bottom">      </td><td align="left" valign="bottom"><font style=\"color:yellow; font-size:100%;\"><b>'+ee+'</b></font> Gegner gefunden</td>'
+'<td align="left" valign="bottom"><a href="href="http//pennerhack.foren-city.de"><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0" height="10" width="17"></a> </td>'
+'<td align="left" valign="bottom"><a href="href="http//pennerhack.foren-city.de""><img src="http://thx.spacequadrat.de/Smileys/sarcasmics/tongue.gif" border="0"></a> </td></tr></tr></tbody></table>';


		GM_deleteValue("i");
		}
	}
},false);
//GM_deleteValue("i");
