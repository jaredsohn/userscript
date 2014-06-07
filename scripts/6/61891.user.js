// ==UserScript==
// @name           Pennergame Stadtwechsler-Autologin-Login und Logout checker Pennergames 4.0 (update bumrise und muenchen hinzugefuegt)
// @namespace      by basti121o http://pennerhack.foren-city.de.   diese version hat auch ne online abfrage fuer pennerhack seite
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














var neu = document.getElementsByTagName("body")[0];
SubmitButtonHTML = '<input type="button" name="geneinstellutschstadtswi" id="geneinstellutschstadtswi" value="Stadxtswitsch" />';
var newp = document.createElement("tr");
newp.innerHTML = '<br><b><font color="white">Stadtswitsch Optionen</font></b><div name="fenster"</div>';			
var newli = document.createElement("li");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);

document.getElementsByName('geneinstellutschstadtswi')[0].addEventListener('click', function weinkaufen () {
	document.getElementsByName("fenster")[0].innerHTML = ''
	+'<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
	+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich Stadtswitsch-Einlogger by basti1012</th></tr>'
	+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
	+'<h2>Einlogdaten fuer Hamburg</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Berlin</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Dossergame</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Menelgame</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Clodogame</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Mendigogame</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer serserionline</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'

	+'<h2>Einlogdaten fuer Bumrise</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<h2>Einlogdaten fuer Muenchen</h2>Automatisch einlogen Aktivieren :<input type="checkbox" name="lockin" id="link1"/>Pennernamen : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'

	+'<br><h2>Online Status Aktivieren oxder Deaktivieren f&uuml;r die Einzelnden Pennergame St&auml;dte.</h2>'
	+'<b>Online Anzeige f&uuml;r Pennergame Hamburg Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Pennergame Berlin Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Dossergame Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Menelgame Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Clodogame Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Mendigogame Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r serserionline Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Bumrise Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'
	+'<b>Online Anzeige f&uuml;r Muenchen Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'

	+'<b>Online Anzeige f&uuml;r Pennerhack(basti1012 homepage) Aktivieren</b>:<input type="checkbox" name="lockina" id="link1"/><br>'



	+'<input type="button" name="datenspeichern" id="datenspeichern" value="Alle eingaben Speichern und schliessen" /><br>'
	+'<br><br><br>Automatisch einloggen Funktionuiert immer .Wenn ihr Zb Gereade in Hamburg sein uns nach Berlin Springt und ihr seid da nicht eingelogt ,dann erkennt das Script das und logt euch Automatisch ein.'
	+'<br><br>Geplante ist das nach den einloggen die weiterbildungen gescheckt werden und wenn kein e an laufen ist das er automatisch auf die weiterbildungseite weiterleiutet und euch miot einen alert warnen tut damit immer weiter gebildet wird und keine wertvolle zeit verloren geht.'
	+'</td></tr></table>';

	for(i=0;i<=9;i++){
		if(i<=8){
			document.getElementsByName("lockin")[i].checked = GM_getValue("logincheckcheck"+i);
		}
		document.getElementsByName("lockina")[i].checked = GM_getValue("logincheckchecka"+i);
		if(i<=8){
			document.getElementsByName("pennernamen")[i].value = GM_getValue("namen"+i);
			document.getElementsByName("pennerpasswort")[i].value = GM_getValue("passwort"+i);
		}
	}




	document.getElementsByName('datenspeichern')[0].addEventListener('click', function save_spenden () {
		for(i=0;i<=9;i++){


			GM_setValue("logincheckchecka"+i, document.getElementsByName("lockina")[i].checked);
if(i<=8){
			GM_setValue("logincheckcheck"+i, document.getElementsByName("lockin")[i].checked);
}




			if(i<=8){
				GM_setValue("namen"+i, document.getElementsByName("pennernamen")[i].value);
				GM_setValue("passwort"+i, document.getElementsByName("pennerpasswort")[i].value);
			}
















		}
		alert("alle daten erfolgreich gespeichert")
		window.location.reload();
	},false);
},false);












var url = document.location.href;
if (url.indexOf("berlin.pennergame")>=0) {
	if(GM_getValue("logincheckcheck1")==true){
		var link = "http://berlin.pennergame.de"
		var pass = GM_getValue("passwort1")
		var name = GM_getValue("namen1")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" height="24" width="36"></img>';
	keinedaten(wo)
	}
}


if (url.indexOf("http://www.pennergame")>=0) {
	if(GM_getValue("logincheckcheck0")==true){
		var link = "http://www.pennergame.de"
		var pass = GM_getValue("passwort0")
		var name = GM_getValue("namen0")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" height="24" width="36"></img>';
	keinedaten(wo)
	}
}


if (url.indexOf("clodogame")>=0) {
	if(GM_getValue("logincheckcheck2")==true){
		var link = "http://www.clodogame.fr"
		var pass = GM_getValue("passwort2")
		var name = GM_getValue("namen2")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t3.gstatic.com/images?q=tbn:NEjD_Ubm9J1EzM:http://www.ontopic.de/images/1040%2520Fahne%2520shn.jpg" height="24" width="36"></img>';
	keinedaten(wo)
	}
}

if (url.indexOf("mendigogame")>=0) {
	if(GM_getValue("logincheckcheck3")==true){
		var link = "http://www.mendigogame.es"
		var pass = GM_getValue("passwort3")
		var name = GM_getValue("namen3")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t2.gstatic.com/images?q=tbn:ebSSt2ynvYY7IM:http://www.welt-blick.de/flaggen/spanien2.gif" height="24" width="36"></img>';
	keinedaten(wo)
	}
}

if (url.indexOf("serserionline")>=0) {
	if(GM_getValue("logincheckcheck4")==true){
		var link = "http://www.serserionline.com"
		var pass = GM_getValue("passwort4")
		var name = GM_getValue("namen4")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t2.gstatic.com/images?q=tbn:0byuGnlDTUlKrM:http://www.brunnvalla.ch/laenderlexikon/images/tuerkei.gif" height="24" width="36"></img>';
	keinedaten(wo)
	}
}

if (url.indexOf("dossergame.co.uk")>=0) {
	if(GM_getValue("logincheckcheck5")==true){
		var link = "http://www.dossergame.co.uk"
		var pass = GM_getValue("passwort5")
		var name = GM_getValue("namen5")
		einloggen(link,pass,name)
	}else{
var wo = '<img src="http://t1.gstatic.com/images?q=tbn:cmRlgP-FmzZyVM:http://www.preisvergleich.org/pimages/Grossbritannien-Fahne-Flagge_82__60005_20.jpg" height="24" width="36"></img>';
	keinedaten(wo)
	}
}

if (url.indexOf("menelgame.pl")>=0) {
	if(GM_getValue("logincheckcheck6")==true){
		var link = "http://www.menelgame.pl"
		var pass = GM_getValue("passwort6")
		var name = GM_getValue("namen6")
		einloggen(link,pass,name)

	}else{
var wo = '<img src="http://t2.gstatic.com/images?q=tbn:WQE-HoPRecqcBM:http://freenet-homepage.de/Honige-der-Welt/Grafik-Flaggen/flagge_polen_001.gif" height="24" width="36"></img>';
	keinedaten(wo)
	}
}





if (url.indexOf("bumrise.com")>=0) {
	if(GM_getValue("logincheckcheck7")==true){
		var link = "http://www.bumrise.com"
		var pass = GM_getValue("passwort7")
		var name = GM_getValue("namen7")
		einloggen(link,pass,name)

	}else{
var wo = '<img src="http://t2.gstatic.com/images?q=tbn:WQE-HoPRecqcBM:http://freenet-homepage.de/Honige-der-Welt/Grafik-Flaggen/flagge_polen_001.gif" height="24" width="36"></img>';
	keinedaten(wo)
	}
}




if (url.indexOf("muenchen.pennergame")>=0) {
	if(GM_getValue("logincheckcheck8")==true){
		var link = "http://www.muenchen.pennergame"
		var pass = GM_getValue("passwort8")
		var name = GM_getValue("namen8")
		einloggen(link,pass,name)

	}else{
var wo = '<img src="http://t2.gstatic.com/images?q=tbn:WQE-HoPRecqcBM:http://freenet-homepage.de/Honige-der-Welt/Grafik-Flaggen/flagge_polen_001.gif" height="24" width="36"></img>';
	keinedaten(wo)
	}
}








function einloggen(link,pass,name){
	 GM_xmlhttpRequest({
  	 method: 'GET',
  	 url: ""+link+"/overview/",
     	 onload: function( response ) {
     		var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			}catch(err){
				document.getElementById("login_username").value = name;
				document.getElementById("password").value = pass;
				document.getElementsByName("submitForm")[0].click();
			}
		}
	})
}





function keinedaten(wo){

	var neu11 = document.getElementsByTagName("form")[0].getElementsByTagName("fieldset")[0];
	neu11.getElementsByTagName("div")[0].innerHTML = ''
	+'<center><select name=\"welchestadt\"><option value=\"http://www.pennergame.de/\">Hamburg</option>'
	+'<option value=\"http://www.berlin.pennergame.de/\">Berlin</option>'
	+'<option value=\"http://www.dossergame.co.uk/\">Dossergame</option>'
	+'<option value=\"http://www.menelgame.pl/\">Menelgame</option>'
	+'<option value=\"http://www.clodogame.fr/\">Clodogame</option>'
	+'<option value=\"http://www.mendigogame.es/\">Menmdigogame</option>'

	+'<option value=\"http://www.bumrise.com/\">Bumrise(usa)</option>'
	+'<option value=\"http://www.muenchen.pennergame.de/\">M&uuml;nchen</option>'


	+'<option value=\"http://www.serserionline.com/\">Serserionline</option></select>'
	+'<input type="button" id="go"  name="go" value="wechsel" ></center>' ;
	var newpa = document.createElement("div");
	newpa.innerHTML = '<center>Autologin Deaktiviert '+wo+'</center>';
	neu11.appendChild(newpa);

	document.getElementsByName('go')[0].addEventListener('click', function weinkaufen () {
		was = document.getElementsByName('welchestadt')[0].value;
		window.location.href = was;
	},false);
}


try{
	var neu1 = document.getElementById("topmenu");
	var neu = neu1.getElementsByTagName("ul")[0];
	var newp = document.createElement("li");
	newp.innerHTML = ''
	+'<select name=\"welchestadt\"><option value=\"http://www.pennergame.de/\">Hamburg</option>'
	+'<option value=\"http://www.berlin.pennergame.de/\">Berlin</option>'
	+'<option value=\"http://www.dossergame.co.uk/\">Dossergame</option>'
	+'<option value=\"http://www.menelgame.pl/\">Menelgame</option>'
	+'<option value=\"http://www.clodogame.fr/\">Clodogame</option>'
	+'<option value=\"http://www.mendigogame.es/\">Menmdigogame</option>'

	+'<option value=\"http://www.bumrise.com/\">Bumrise(usa)</option>'
	+'<option value=\"http://www.muenchen.pennergame.de/\">M&uuml;nchen</option>'


	+'<option value=\"http://www.serserionline.com/\">Serserionline</option></select>'
	+'<br><center><input type="button" id="go"  name="go" value="wechseln" ></center>';
	neu.appendChild(newp);
	document.getElementsByName('go')[0].addEventListener('click', function weinkaufen () {
		was = document.getElementsByName('welchestadt')[0].value;
		window.location.href = was;
	},false);
}catch(e){
}


var spendendiv = document.createElement('div');
spendendiv.setAttribute('id', 'spendendiv');
spendendiv.setAttribute('align', 'middle');
spendendiv.setAttribute('titel', 'hier kommen die werte rein die gerade in der heweiligen stadt zu sehen sind');
spendendiv.setAttribute('style', 'position:absolute; top:111px; left:111px; z-index:50;');
spendendiv.innerHTML = '<b name="stadt1"</b><b name="stadt2"</b><b name="stadt3"</b><b name="stadt4"</b><b name="stadt5"</b><br><b name="stadt6"</b><b name="stadt7"</b><b name="stadt8"</b><b name="stadt9"</b><b name="stadt10"</b>';
document.body.appendChild(spendendiv);

//document.getElementsByTagName("h1")[0].innerHTML = '<b name="stadt1"</b><b name="stadt2"</b><b name="stadt3"</b><b name="stadt4"</b><b name="stadt5"</b><br><b name="stadt6"</b><b name="stadt7"</b><b name="stadt8"</b><b name="stadt9"</b><b name="stadt10"</b>';

if(GM_getValue("logincheckchecka0")==true){
	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.pennergame.de/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
		try {
			var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			var table1 = content.split('Sauberkeit: ')[1].split('%')[0];			
			var saubera = content.split('Sauberkeit: ')[1].split('settings')[0];
			var content_split1 = saubera.split('&nbsp;')[1].split('</span>')[0];
			var content_split2 = saubera.split('&euro;')[1].split('</span>')[0];
			var content_split3 = saubera.split("'>")[1].split('&permil;')[0];
			var content_split4 = saubera.split('class="att">')[1].split('</span>')[0];
			var content_split5 = saubera.split('class="def">')[1].split('</span>')[0];
			var content_split6 = content.split('Du hast heute')[1].split('Spenden')[0];

			TEXT = 'Status Hamburger Penner\nSauberkeit = '+table1+'\nPlatz = '+content_split1+'\nGeld='+content_split2+'\nPromille = '+content_split3+'\nAtt= '+content_split4+'\nDef='+content_split5+'\nSpenden = '+content_split6+'/50\n';
			GM_setValue("TEXT" ,TEXT);
			document.getElementsByName("stadt1")[0].innerHTML = '<img id="hehe" src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16" ></img>';
		}catch(err){
			TEXT = 'Dein Hamburger Penner ist ausgeloggt und kann somit keine Daten abfragen';
			GM_setValue("TEXT" ,TEXT);
			document.getElementsByName("stadt1")[0].innerHTML = '<img id="hehe" src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16" ></img>';
		}

		document.getElementById("hehe").addEventListener("mouseover", function() {
			GM_xmlhttpRequest({
  				method: 'GET',
  				url: "http://www.pennergame.de/pennerbar.xml",
     				onload: function( response ) {
     					var content = response.responseText;
					try {
						var weiter = content.split('timer value="')[1].split('"')[0];
						var fight = content.split('kampftimer value="')[1].split('"')[0];

						if(fight<=0){
							fighttext = 'Kampf zuende';
						}else{
							fighttext = 'Kampf geht noch '+fight+' Sekunden';
						}

						if(weiter<=0){
							weitertext = 'Weiterbildungen zuende';
						}else{
							weitertext = 'Weiterbildung geht noch '+weiter+' Sekunden';
						}
					}catch(e){}
					alert(""+GM_getValue("TEXT")+"\n"+fighttext+"\n"+weitertext+"");
				}
			});
		},false);
		}
	})
}





















if(GM_getValue("logincheckchecka1")==true){
	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://berlin.pennergame.de/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt2")[0].innerHTML = '<img src="http://t3.gstatic.com/images?q=tbn:TGUzk3-YnOKdjM:http://www.nationalflaggen.de/media/flags/flagge-berlin.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt2")[0].innerHTML = '<img src="http://t3.gstatic.com/images?q=tbn:TGUzk3-YnOKdjM:http://www.nationalflaggen.de/media/flags/flagge-berlin.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})

}
if(GM_getValue("logincheckchecka2")==true){
	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.dossergame.co.uk/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt3")[0].innerHTML = '<img src="http://t1.gstatic.com/images?q=tbn:cmRlgP-FmzZyVM:http://www.preisvergleich.org/pimages/Grossbritannien-Fahne-Flagge_82__60005_20.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt3")[0].innerHTML = '<img src="http://t1.gstatic.com/images?q=tbn:cmRlgP-FmzZyVM:http://www.preisvergleich.org/pimages/Grossbritannien-Fahne-Flagge_82__60005_20.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})

}
if(GM_getValue("logincheckchecka3")==true){
	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.menelgame.pl/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt4")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:WQE-HoPRecqcBM:http://freenet-homepage.de/Honige-der-Welt/Grafik-Flaggen/flagge_polen_001.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt4")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:WQE-HoPRecqcBM:http://freenet-homepage.de/Honige-der-Welt/Grafik-Flaggen/flagge_polen_001.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})

}
if(GM_getValue("logincheckchecka4")==true){

	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.clodogame.fr/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt5")[0].innerHTML = '<img src="http://t3.gstatic.com/images?q=tbn:NEjD_Ubm9J1EzM:http://www.ontopic.de/images/1040%2520Fahne%2520shn.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt5")[0].innerHTML = '<img src="http://t3.gstatic.com/images?q=tbn:NEjD_Ubm9J1EzM:http://www.ontopic.de/images/1040%2520Fahne%2520shn.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})

}
if(GM_getValue("logincheckchecka5")==true){
	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.mendigogame.es/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt6")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:ebSSt2ynvYY7IM:http://www.welt-blick.de/flaggen/spanien2.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt6")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:ebSSt2ynvYY7IM:http://www.welt-blick.de/flaggen/spanien2.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})
}
if(GM_getValue("logincheckchecka6")==true){

	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.serserionline.com/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt7")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:0byuGnlDTUlKrM:http://www.brunnvalla.ch/laenderlexikon/images/tuerkei.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt7")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:0byuGnlDTUlKrM:http://www.brunnvalla.ch/laenderlexikon/images/tuerkei.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})
}
















if(GM_getValue("logincheckchecka7")==true){

	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.bumrise.com/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt8")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:fz8SKBdFEiBpcM:http://www.nationalflaggen.de/media/flags/flagge-vereinigte-staaten-von-amerika-usa.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt8")[0].innerHTML = '<img src="http://t2.gstatic.com/images?q=tbn:fz8SKBdFEiBpcM:http://www.nationalflaggen.de/media/flags/flagge-vereinigte-staaten-von-amerika-usa.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})
}




if(GM_getValue("logincheckchecka8")==true){

	GM_xmlhttpRequest({
  	method: 'GET',
  	url: "http://www.muenchen.pennergame.de/overview/",
     	 onload: function( response ) {
     	 var content = response.responseText;
			try {
				var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			document.getElementsByName("stadt9")[0].innerHTML = '<img src="http://t0.gstatic.com/images?q=tbn:Ggu8WAz7bzXEnM:http://www.iruv.de/deutschland/bilder/reisefuehrer/klein/bayern-fahne.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
			}catch(err){
			document.getElementsByName("stadt9")[0].innerHTML = '<img src="http://t0.gstatic.com/images?q=tbn:Ggu8WAz7bzXEnM:http://www.iruv.de/deutschland/bilder/reisefuehrer/klein/bayern-fahne.gif" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
			}
		}
	})
}




if(GM_getValue("logincheckchecka9")==true){
GM_xmlhttpRequest({
	method: 'GET',
        url: "http://pennerhack.foren-city.de/profile.php?mode=editprofile",
        onload: function( response ) {
     	var content = response.responseText;
		try {
			var loginout = content.split('maxlength="25" value="')[1].split('"')[0];
			document.getElementsByName("stadt10")[0].innerHTML = '<img id="hehe1" src="http://i35.tinypic.com/11qqpnp.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/on.gif" height="16" width="16"></img>';
texthack = 'Du bist bei http://pennerhack.foren-city.de\nmit den namen '+loginout+' eingeloggt.';
a=111;
			}catch(err){
			document.getElementsByName("stadt10")[0].innerHTML = '<img id="hehe1" src="http://i35.tinypic.com/11qqpnp.jpg" height="16" width="16"></img><img src="http://media.pennergame.de/img/off.gif" height="16" width="16"></img>';
texthack = ' Du bist auf http://pennerhack.foren-city.de ausgelogt.';
a=222;
			}


document.getElementById("hehe1").addEventListener("mouseover", function() {
if(a<=111){
alert(texthack)
} else if(a>=222){
	var box = window.confirm(texthack);
		if(box == true){
			window.location.href = "http://pennerhack.foren-city.de";
		}

}
},false);

}});
}









// copyright by basti1012











