// ==UserScript==
// @name downfight.de gegner suche endversion hoch und runterfighten zockfighten (aale pennergames) v3a
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Zeigt aale gegner von downfight an die in deinen punkte bereich liegen 
// @include http://*pennergame.de/fight/overview/*
// @include http://*berlin.pennergame.de/fight/overview/*
// @include http://*pennergame.de/fight/overview/*
// @include http://*berlin.pennergame.de/fight/overview/*
// @include http://*menelgame.pl/fight/overview/*
// @include http://*dossergame.co.uk/fight/overview/*
// @include http://*mendigogame.es/fight/overview/*
// @include http://*clodogame.fr/fight/overview/*
// ==/UserScript==


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var version = 'berlin';
  var zock ='http://downfight.de/?seite=listebzock';
  var up ='http://downfight.de/?seite=hochfightberlin';
  var down ='http://downfight.de/?seite=downfightberlin';
  var pg = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var version = 'dossergame';
  var up ='http://pennermafia.de/PL/?seite=listehhup';
  var down ='http://pennermafia.de/PL/?seite=listehhdown';
  var zock ='http://pennermafia.de/UK/?seite=listehhzock';
  var pg = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var version = 'hamburg';
  var zock ='http://downfight.de/?seite=listehhzock';
  var up ='http://downfight.de/?seite=hochfighthamburg';
  var down ='http://downfight.de/?seite=downfighthamburg';
  var pg = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var version = 'menelgame';
  var zock ='http://pennermafia.de/UK/?seite=listehhzock';
  var down ='http://pennermafia.de/UK/?seite=listehhdown';
  var zock ='http://pennermafia.de/UK/?seite=listehhzock';
  var pg = 'http://www.menelgame.pl/';
  }
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var version = 'clodogame';
  var zock ='http://pennermafia.de/FR/?seite=listehhzock';
  var down ='http://pennermafia.de/FR/?seite=listehhdown';
  var zock ='http://pennermafia.de/FR/?seite=listehhzock';
  var pg = 'http://www.clodogame.fr/';
 }
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
  var version = 'mendigogame';
  var zock ='http://pennermafia.de/ES/?seite=listehhzock';
  var down ='http://pennermafia.de/ES/?seite=listehhdown';
  var zock ='http://pennermafia.de/ES/?seite=listehhzock';
  var pg = 'http://www.mendigogame.es/';
 };



var tr = document.getElementsByClassName('tiername')[3];
tr.innerHTML = '<table class="list" border="1" width="700"><tbody>'

	+'<tr><th align="center" width="230">Komentar(Link)</th>'
	+'<th scope="col" align="center" bgcolor="#272727" width="150">Name(Profillink)</th>'
	+'<th scope="col" align="center" width="100">Api (link)</th>'
	+'<th scope="col" align="center"  width="100">Punkte(Link)</th>'
	+'<th align="center" width="80">Zeit</th>'
	+'<th align="center" width="20">Angrif</th>'
	+'<th align="center" width="20">Sms</th></tr> ' 

GM_xmlhttpRequest({
  method: 'GET',
  url: ''+pg+'/overview/',
      onload: function( response ) {
      	var content = response.responseText;
      	var skill = content.split('<span class="att">')[1].split('</span>')[0];
     	var skill1 = content.split('<span class="def">')[1].split('</span>')[0];
	var feld = content.split('<div class="display_punkte">')[1];
	var feld1 = feld.split('</div>')[0];

			try{
				var min2 = feld1.split('min_points=')[1];
				var min1 = min2.split('&')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);

				}catch(e){
				var min2 = feld1.split('/headline/')[1];
				var min1 = min2.split('/?size=34"')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);

			}
		var tra = document.getElementById('form1');
		tra.innerHTML = '<strong>Att:'+skill+'&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Def:'+skill1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Meine Punkte :'+min1+'&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Min Punkte '+min+'&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Max: '+max+'</strong><br>Suche bei Downfight in der Stadt <b>'+pg+'</b>.<br>Hochfigter:<input type="button"  name="hoch" id="hoch" value="Hochfighten">Runterfighter:<input type="button"  name="runter" id="runter" value="Runterighten">Zockfighter:<input type="button"  name="zocken" id="zocken" value="Zockfighten">';



document.getElementsByName("hoch")[0].addEventListener('click', function postsuchesr() {
var hocher = up;
fighen(hocher);

},false);


document.getElementsByName("runter")[0].addEventListener('click', function postsuchesr() {
var hocher = down;
fighen(hocher);

},false);


document.getElementsByName("zocken")[0].addEventListener('click', function postsuchesr() {
var hocher = zock;
fighen(hocher);

},false);







function fighen (hocher){

GM_xmlhttpRequest({
	method: 'POST',
	url: ''+hocher+'',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('unten='+min+'&oben='+max+'&myatt='+skill+'&mydef='+skill1+'&angemeldet=nein&auto='),
		onload: function(responseDetails){
		var content = responseDetails.responseText;
 
			var bbbb1 = content.split('bgcolor="#313131">')[2].split('Besucher')[0];

//alert(bbbb1);

try{
var Feld1 = bbbb1.split('<tr style')[1].split('</tr>')[0];
var menge = Feld1.length;
}catch(e){

						
tr.innerHTML += '<table class="list" border="1" width="700"><tbody><tr bgcolor="#272727">'
+'<th align="left" width="700"></th>'
+'<tr bgcolor="red"><tr class="zeileB">'
+'<td align="left" valign="bottom"><font style=\"color:red; font-size:130%;\"> <b>Keine Gegner gefunden Sorry versuche es sp&auml;ter nocheinmal</font></td>'
+'</tr></tr></tbody></table>';

}




				for(d = 1; d <= menge; d++){

						try{
						var Feld1 = bbbb1.split('<tr style')[d].split('</tr>')[0];
						var nURName = Feld1.split('/profil/')[1].split('/')[0];
						var Komentar = Feld1.split('align="left">')[4].split('<a')[0];
						var Komentarlink = Feld1.split('href="kommentare')[1].split('</td>')[0];
						var Verlauflink = Feld1.split('href="punkte')[1].split('</td>')[0];
						var ApiId = Feld1.split('align="left">')[2].split('</td>')[0];
						var Nurid = ApiId.split('user.')[1].split('.xml')[0];
						var Punkte = Feld1.split('align="right">')[1].split('P')[0];
						var Zeit = Feld1.split('align="right">')[2].split('</td>')[0];


						tr.innerHTML += '<table class="list" border="1" width="700"><tbody><tr bgcolor="#272727">'
						+'<th align="left" width="230"></th>'
						+'<th align="center" width="150"></th> '
						+'<th scope="col" align="left" width="100"></th>'
						+'<th scope="col" align="left" bgcolor="#272727" width="100"></th>'
						+'<th scope="col" align="left" bgcolor="#272727" width="90"></th>'
						+'<th scope="col" align="left" bgcolor="#272727" width="20"></th>'
						+'<th scope="col" align="left" bgcolor="#272727" width="20"></th>'
						+'<tr bgcolor="red"><tr class="zeileB">'
						+'<td align="left" valign="bottom">'+Komentar+'<a href="http://downfight.de/kommentare'+Komentarlink+'</a></td>'
						+'<td align="left" valign="bottom"><a href="http://pennergame.de/profil/id:'+Nurid+'/">'+nURName+'</a></td>'
						+'<td align="left" valign="bottom">'+ApiId+'</td>'
						+'<td align="left" valign="bottom">'+Punkte+'<a href="http://downfight.de/punkte'+Verlauflink+'</td>'
						+'<td align="left" valign="bottom">'+Zeit+'</td>'
						+'<td align="left" valign="bottom"><a href="/fight/?to='+nURName+'"><img src="http://media.pennergame.de/img/att.gif" border="0"></a></td>'
						+'<td align="left" valign="bottom"><a href="/messages/write/?to='+Nurid+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></td>'
						+'</tr></tr></tbody></table>';

							}catch(e){}
							}

						}
				});
			}
	}
});



// copyright by basti1012
