// ==UserScript==
// @name           Penner wechsel (pennergame 4.0)
// @namespace      by basti121o http://pennerhack.foren-city.de.  einfach pennernamen und passwort speichern und man kann mit einen klick den penner wechseln innerhalb einer stadt ohne sich andauernd ein und aus loggen zu muessen
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

var url = document.location.href;
if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
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


var neu = document.getElementsByTagName("body")[0];
jo = neu.innerHTML.split('Profil anzeigen">')[1].split('</a>')[0];
document.getElementById("xtra-nav").innerHTML = '<marquee><font style=\"color:blue; font-size:130%;\"><b>'+jo+'</b></font></marquee>';

var neu = document.getElementsByTagName("body")[0];
SubmitButtonHTML = '<input type="button" name="allesswitsch" id="allesswitsch" value="einstellungen" />';
var newp = document.createElement("tr");
newp.innerHTML = '<br><b><font color="white">Optionen penner</font></b><div name="fenster"</div>';			
var newli = document.createElement("li");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);

	var jojo ='<select name=\"welchestadta\">'
	+'<option value=\"http://www.pennergame.de\">http://www.pennergame.de</option>'
	+'<option value=\"http://www.berlin.pennergame.de\">http://www.berlin.pennergame.de</option>'
	+'<option value=\"http://www.menelgame.pl\">http://www.menelgame.pl</option>'
	+'<option value=\"http://www.dossergame.co.uk\">http://www.dossergame.co.uk</option>'
	+'<option value=\"http://www.mendigogame.es\">http://www.mendigogame.es</option>'
	+'<option value=\"http://www.serserionline.com\">http://www.serserionline.com</option>'
	+'<option value=\"http://www.clodogame.fr\">http://www.clodogame.fr</option>'
	+'<option value=\"http://www.bumrise.com\">http://www.bumrise.com</option>'
	+'<option value=\"http://www.muenchen.pennergame.de\">http://www.muenchen.pennergame.de</option>'
	+'<option value=\"http://www.serserionline.com/\">http://www.serserionline.com</option></select>';


document.getElementsByName('allesswitsch')[0].addEventListener('click', function weinkaufen () {
	document.getElementsByName("fenster")[0].innerHTML = ''
	+'<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
	+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich Penner-wechsler by basti1012</th></tr>'
	+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
	+'<h2>Einlogdaten fuer Hamburg</h2>'
	+''+jojo+'Pennernamen1 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort1 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen2 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort2 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen3 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort3 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen4 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort4 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen5 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort5 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen6 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort6 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen7 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort7 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen8 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort8 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen9 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort9 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+''+jojo+'Pennernamen10 : <input type="text" name="pennernamen" id="pennernamen" value="">PennerPasswort10 : <input type="text" name="pennerpasswort" id="pennerpasswort" value=""><br>'
	+'<input type="button" name="datenspeichern" id="datenspeichern" value="Alle eingaben Speichern und schliessen" /><br>'
	+'<br><br><br>Automatisch ein und aus loggen geht nur innerhalb einer stadt . das heist wenn ihr zb 5 penner in hamburg habt koennt ihr nur in hamburg rum zappen oder halt nur in berlin . aber von hamburg nach berlin geht zur zeit noch nicht .'
	+'</td></tr></table>';

	for(i=0;i<=9;i++){
		document.getElementsByName("welchestadta")[i].value = GM_getValue("welchestadta"+i);
		document.getElementsByName("pennernamen")[i].value = GM_getValue("namen"+i);
		document.getElementsByName("pennerpasswort")[i].value = GM_getValue("passwort"+i);
	}
	document.getElementsByName('datenspeichern')[0].addEventListener('click', function save_spenden () {
		for(i=0;i<=9;i++){
			GM_setValue("welchestadta"+i, document.getElementsByName("welchestadta")[i].value);
			GM_setValue("namen"+i, document.getElementsByName("pennernamen")[i].value);
			GM_setValue("passwort"+i, document.getElementsByName("pennerpasswort")[i].value);	
		}
		alert("alle daten erfolgreich gespeichert")
		window.location.reload();
},false);
},false);



var bot1 = document.getElementById("nav-2");
var newp = document.createElement("li");
bot1.appendChild(newp);
newp.innerHTML += ''
	+'<center><select name=\"welchestadt\">'
	+'<option value=\"0\">'+GM_getValue("namen0")+'</option>'
	+'<option value=\"1\">'+GM_getValue("namen1")+'</option>'
	+'<option value=\"2\">'+GM_getValue("namen2")+'</option>'
	+'<option value=\"3\">'+GM_getValue("namen3")+'</option>'
	+'<option value=\"4\">'+GM_getValue("namen4")+'</option>'
	+'<option value=\"5\">'+GM_getValue("namen5")+'</option>'
	+'<option value=\"6\">'+GM_getValue("namen6")+'</option>'
	+'<option value=\"7\">'+GM_getValue("namen7")+'</option>'
	+'<option value=\"8\">'+GM_getValue("namen8")+'</option>'
	+'<option value=\"9\">'+GM_getValue("namen9")+'</option></select>'
	+'<input type="button" id="go"  name="go" value="Penner wechseln" ></center>' ;


	document.getElementsByName('go')[0].addEventListener('click', function weinkaufen () {
		was = document.getElementsByName('welchestadt')[0].value;
		oefnen(was)

		//window.location.href = was;
	},false);

function oefnen(was){

		var welchestadt = GM_getValue("welchestadta"+was)
		var pass = GM_getValue("passwort"+was)
		var name = GM_getValue("namen"+was)
		var rein = 'username='+name+'&password='+pass+'&city='+welchestadt+'%2Flogin%2Fcheck%2F&submitForm=Login';

	 GM_xmlhttpRequest({
  	 method: 'GET',
  	 url: ""+welchestadt+"/logout/",
     	 onload: function( response ) {
     		var content = response.responseText;
		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+welchestadt+'/login/check/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI(rein),
			onload: function(responseDetails)
     			{
				location.reload();
     	 		}
 	 	});	
}});

}

// copyright by basti1012










