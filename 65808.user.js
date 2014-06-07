// ==UserScript==
// @name          pennergame waschbot alle games pennergame 4.0
// @namespace      by basti121o http://pennerhack.foren-city.de. t ueberwachung im alle 9 pennergame s ob ein angriff rein kommt . mann kann jede stadt ein und ausschalten ob eine ueberwachung stadt fginden soll
// @include        *pennergame.de*
// @include        *clodogame.fr*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// @include        *mendigogame.es*
// @include        *serserionline.com*
// @include        *bumrise.com*
// @include        *muenchen.pennergame.de*
// ==/UserScript==








GM_setValue("link0", 'http://berlin.pennergame.de');
GM_setValue("link1", 'http://www.pennergame.de');
GM_setValue("link2", 'http://www.dossergame.co.uk');
GM_setValue("link3", 'http://www.menelgame.pl');
GM_setValue("link4", 'http://www.clodogame.fr');
GM_setValue("link5", 'http://www.mendigogame.es');
GM_setValue("link6", 'http://www.serserionline.com');
GM_setValue("link7", 'http://www.bumrise.com');
GM_setValue("link8", 'http://muenchen.pennergame.de');











var url = document.location.href;

if (url.indexOf("/settings/")>=0) {
var neu = document.getElementById("content");
SubmitButtonHTML = '';
var newp = document.createElement("table");
newp.innerHTML += '<table class="tieritemA" width="450"><u><strong>Einstellbereich Waschbot</strong></u><br>'

	+'<b>Hamburg Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Berlin Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Dossergame Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Menelgame Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Clodogame Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Mendigogame Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Serserionline Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Bumrise Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'
	+'<b>Muenchen Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockine" id="link1"/>Ab % Waschen : <input type="text" size="2" name="ab" id="ab"></b><br>'

//	+'Automatisch reloden um zu checken ob der Sauberkeitswert gefallen ist <input type="text" id="relod" name="relod"><br>'
	+'<input type="button" name="daten" id="daten" value="Alle eingaben Speichern und schliessen" /><br></table>';
var newli = document.createElement("tr");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);


	//document.getElementsByName("relod")[0].value = GM_getValue("relod");

	for(i=0;i<=8;i++){
	document.getElementsByName("lockine")[i].checked = GM_getValue("logincheckchecke"+i);
	document.getElementsByName("ab")[i].value = GM_getValue("ab"+i);
	}

	document.getElementsByName('daten')[0].addEventListener('click', function save_spenden () {

		//GM_setValue("relod", document.getElementsByName("relod")[0].value);

		for(i=0;i<=8;i++){
		GM_setValue("logincheckchecke"+i, document.getElementsByName("lockine")[i].checked);
		GM_setValue("ab"+i, document.getElementsByName("ab")[i].value);
		}

		alert("alle daten erfolgreich gespeichert")
		window.location.reload();
	},false);
}


var spendendiv = document.createElement('div');
spendendiv.setAttribute('id', 'angriff');
spendendiv.setAttribute('align', 'middle');
spendendiv.setAttribute('titel', 'hier kommen die werte rein die gerade in der heweiligen stadt zu sehen sind');
spendendiv.setAttribute('style', 'background-color: black; position:absolute; top:111px; left:111px; z-index:50;');
spendendiv.innerHTML = '<font color=\"orange\">Sauberkeitsbot</font><br><b id="sauber"></b><a href="/settings/">Einstellungen &auml;ndern</a><br>';
document.body.appendChild(spendendiv);











start()



function start(){

i=0;
nochmal(i)

}






function nochmal(i){

	if(i<=8){
		if(GM_getValue("logincheckchecke"+i)==true){
		link = GM_getValue("link"+i);

			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+link+'/overview/',
				onload: function(responseDetails) {
					var content = responseDetails.responseText;

					try{
						var saubera = content.split("processbar_clean")[1];
						var sauberb = saubera.split("status")[0];
						var sauber10 = sauberb.split(": ")[2];
						var sauber20 = sauber10.split("%")[0];
						document.getElementById('sauber').innerHTML += '<b id="antwort"</b><font color=\"green\">'+link+' '+sauber20+' %</font><br>';
						weiter(sauber20,i,link);
					}catch(e){
						document.getElementById('sauber').innerHTML += '<font color=\"red\">'+link+' ist ausgelogt</font><br>';
					}
					i++;
					nochmal(i);
			}});
		}else{
			i++;
			nochmal(i);
		}
	}
}




function weiter(sauber20,i,link){
u = GM_getValue("ab"+i)
if(sauber20 <= u){
	GM_xmlhttpRequest({
		method: 'POST',
		url: link+'/city/washhouse/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=2'),
		onload: function(responseDetails){
                	var content = responseDetails.responseText;
			try{
				var wasgeschen1 = content.split('Du hast nicht genug ')[1].split('Geld')[0];
				var wasgeschen ='dein geld reicht nicht';
				ergebnis(wasgeschen,link);
			}catch(e){
						}
		}
 	 });
}
}


function ergebnis(wasgeschen,link){

document.getElementById('sauber').innerHTML += '<font color=\"red\">'+wasgeschen+'</font><br>';

}


	var abcd = '180000';
	window.setInterval(start, abcd);







