// ==UserScript==
// @name           Proxi Spenden-Script-Hilfe Berlin und alle anderen Pennergame
// @namespace      http://pennerhack.foren-city.de basti1012
// @description    Mit diesen Script kannst du dir ganz einfach so viele Proxiseiten speichern wie du willst und mit einen klick dann wird dein spendenlink an der proxiseite geleitet und so mit erhelst du mit einen klick eine spende .Bei berlin muss nur noch die zahl geklickt werden der capacha wird vom script geoeffnet.
// @include	   *pennergame.de*
// ==/UserScript==


var medialink = "http://media.pennergame.de/img/"
var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://change.pennergame.de/change_please/"}

if (url.indexOf("berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de/change_please/"}

if (url.indexOf("clodogame")>=0) {
var gamelink = "http://www.clodogame.fr"}

if (url.indexOf("mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es"}

if (url.indexOf("serserionline")>=0) {
var gamelink = "http://www.serserionline.com"}

if (url.indexOf("dossergame.co.uk")>=0) {
var gamelink = "http://www.dossergame.co.uk"}

if (url.indexOf("menelgame.pl")>=0) {
var gamelink = "http://www.menelgame.pl"}


var url = document.location.href;
if (url.indexOf("/please/")>=0) {
	var knoten = document.getElementsByName("starten")[0];
	var knoten2 = knoten.childNodes[3].childNodes;
	var inputButton = knoten2[10];
	inputButton.click();
}


if (url.indexOf("/overview/")>=0) {
	spendenid = document.body.innerHTML.split('.pennergame.de/change_please/')[1].split('/')[0];
	spendenlink = ''+gamelink+spendenid+'/';
	var neu = document.getElementsByClassName("first")[1];
	var newp = document.createElement("li");


	newp.innerHTML = '<strong>Optionen<input type="button" name="option" id="option" value="Optionen"></strong><br><a name="links"</a>'
	+'<strong>Automatisch:</strong><input type="button" name="alle" id="alle" value="Alle links auf einmal o&ouml;ffnen">';




	neu.appendChild(newp);

	var fenster = new Array();
	big = '100';
	farbe = 'green';

	if(GM_getValue("menge")==null){
	GM_setValue("menge", '1')
	}

	var seku = GM_getValue("seku")/1000;
	var menge = GM_getValue("menge");

	for(i=0;i<=menge;i++){
		link = GM_getValue("spendenlink"+i);
		document.getElementsByName("links")[0].innerHTML += ''
		+'<form action="'+link+'/includes/process.php?action=update" target="_top" method="post" onsubmit="return updateLocation(this);"><a href="'+link+'"><b style=\"color:'+farbe+'; font-size:'+big+'%;\"><b>'+link+'</b></b></a><input name="u" size="3" value="'+spendenlink+'"  type="text"><input value="Go" class="url-input url-button" type="submit"></form>';
	}

	var Schliesen = function Schliesen (i) {
  		 for(i=1;i<=menge;i++){
     		 fenster[i].close();
  		 }
	}

	document.getElementById('alle').addEventListener('click', function Setting_spenden(){
		alert("Achtung es werden alle Proxis auf einmal geoeffnet.\nBei Berlin  werden auch alle Capachas mit geoeffnet.\nAlle anderen nicht Capacha Seiten werden in 5 Sekunden wieder vom alleine geschlossen.\nMfg Basti1012:");
		for(i=0;i<=menge;i++){
			linka = GM_getValue("spendenlink"+i);
			fenster[i] = window.open(linka);
			 window.setTimeout(Schliesen, seku); 
		}
	},false);


document.getElementById('option').addEventListener('click', function Setting_spenden(){
	document.getElementsByClassName("clearcontext")[2].innerHTML = '<h1>Optinen f&uuml;r das Proxi-Script</h1>'
	+'<br>Anzahl der ProxiLiniks speichern :<input name="menge" id="menge" size="3" value="'+GM_getValue("menge")+'" type="text"><input type="button" name="save1" id="save1" value="menge speichern"><br>'
	+'<br>Sekunden wann tab geschlossen werden soll :<input name="seku" id="seku" size="3" value="'+seku+'" type="text"><input type="button" name="seku1" id="seku1" value="SekundenZeit Speichern"><br>'
	+'Einfach ein Link ausw&auml;hlen ,dann reihe auswaehlen dann speichern klicken  ,oder einfach in den Feldern eure Links selber eintippen.'

+'Beim einzel speichern bitte die seite reloden und nicht unten auf speichern .Unten speichern nur wenn man selber die links rein schreiben tut .'
	+'<br><select id="auswahlhand" name="auswahlhand">'
	+'<option value="http://faceb00k.in">http://faceb00k.in</option>'
	+'<option value="http://www.primeproxy5.info">http://www.primeproxy5.info</option>'
	+'<option value="http://www.shrouded.info">http://www.shrouded.info</option>'
	+'<option value="http://www.filteryoutube.info">http://www.filteryoutube.info</option>'
	+'<option value="http://www.unblocknyc.com">http://www.unblocknyc.com</option>'
	+'<option value="http://www.bazoom.info">http://www.bazoom.info</option>'
	+'<option value="http://statesproxy.com">http://statesproxy.com</option>'
	+'<option value="http://freeproxybypass.com">http://freeproxybypass.com</option>'
	+'<option value="http://freeproxyaccess.com">http://freeproxyaccess.com</option>'
	+'<option value="http://www.myroxy.info">http://www.myroxy.info</option>'


+'<option value="http://en.wikipedia.org/wiki/Proxy_server">http://en.wikipedia.org/wiki/Proxy_server</option>'
+'<option value="http://www.anonym-proxy.com/">http://www.anonym-proxy.com/</option>'
+'<option value="http://www.justproxies.net/">http://www.justproxies.net/</option>'
+'<option value="http://www.filtered.nl/">http://www.filtered.nl/</option>'
+'<option value="http://yzeus.info/">http://yzeus.info/</option>'
+'<option value="http://www.hopin.info/">http://www.hopin.info/</option>'
+'<option value="http://urltunnel.info/">http://urltunnel.info/</option>'
+'<option value="http://ucensor.info/">http://ucensor.info/</option>'
+'<option value="http://www.surferanonymement.com/">http://www.surferanonymement.com/</option>'
+'<option value="http://www.theproxyplanet.com/">http://www.theproxyplanet.com/</option>'
+'<option value="http://www.wantfun2.info/">http://www.wantfun2.info/</option>'


+'<option value="http://Libertybell.biz">http://Libertybell.biz</option>'
+'<option value="http://sslunblock.com">http://sslunblock.com</option>'
+'<option value="http://1stunblocker.com">http://1stunblocker.com</option>'
+'<option value="http://fbuster.com/">http://fbuster.com/</option>'
+'<option value="http://hidemysurf.info/">http://hidemysurf.info/</option>'
+'<option value="http://asparagusway.info/">http://asparagusway.info/</option>'
+'<option value="http://www.siteflip.info/">http://www.siteflip.info/</option>'
+'<option value="http://facebook-proxy.com/">http://facebook-proxy.com/</option>'
+'<option value="http://subz.info/">http://subz.info/</option>'
+'<option value="http://hide-my.com/">http://hide-my.com/</option>'
+'<option value="http://hidethat.info/">http://hidethat.info/</option>'
+'<option value="http://rosc.info/">http://rosc.info/</option>'
+'<option value="http://weightes.info/">http://weightes.info/</option>'
+'<option value="http://777surfer.info/">http://777surfer.info/</option>'
+'<option value="http://www.freeproxyserver.us/">http://www.freeproxyserver.us/</option>'
+'<option value="http://sslunblock.com">http://sslunblock.com</option>'
+'<option value="http://1stunblock.com">http://1stunblock.com</option>'
+'<option value="http://libertybell.biz">http://libertybell.biz</option>'

















	+'</select><br>'
	+'<input name="einzelmenge" id="einzelmenge" size="3" value="" type="text"><input type="button" name="einzel" id="einzel" value="EinzelFeld Save"><br>'
	+'<a name="einzelinfo"</a><br>'
	+'<a name="proxilinks"</a>'
	+'<br><input type="button" name="save" id="save" value="Proxis Speichern"><br>Es m&uuml;ssen alle Felder ausgef&uuml;t werden um eine Perfekt Funktion zu Garantieren.<br>';

	document.getElementById('save1').addEventListener('click', function Setting_spenden(){
		GM_setValue("menge", document.getElementsByName("menge")[0].value-1);
		document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:yellow; font-size:100%;\">Anzahl der Proxlinks wurde gespeichert ,Lade seite neu ';
		location.reload();
		},false);

	document.getElementById('seku1').addEventListener('click', function Setting_spenden(){
		GM_setValue("seku", document.getElementsByName("seku")[0].value*1000);
		document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:blue; font-size:100%;\">Die Tabs werden jetzt nach '+document.getElementsByName("seku")[0].value+' Sekunden zeit wieder von alleine geschlossen </b>';
	},false);


	for(i=0;i<=menge;i++){
		document.getElementsByName("proxilinks")[0].innerHTML += 'Proxiadresse['+i+'] ;<input name="spendenlink" id="spendenlink" size="50" value="" type="text">';
	}

	document.getElementsByName('einzel')[0].addEventListener('click', function Setting_spenden(){
		linkwahl = document.getElementsByName("auswahlhand")[0].value;
		einzelmenge = document.getElementsByName("einzelmenge")[0].value;
		GM_setValue("spendenlink"+einzelmenge,linkwahl)
		document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:green; font-size:100%;\">Hinweis :<b style=\"color:red; font-size:100%;\">'+linkwahl+'</b><b style=\"color:green; font-size:100%;\"> in </b><b style=\"color:red; font-size:100%;\">Proxiadresse ['+einzelmenge+']</b> gespeichert</b>';
	},false);


	for(i=0;i<=menge;i++){
		document.getElementsByName("spendenlink")[i].value = GM_getValue("spendenlink"+i);
	}

	document.getElementById('save').addEventListener('click', function Setting_spenden(){
		for(i=0;i<=menge;i++){
			ZugelasseneZeichen = document.getElementsByName("spendenlink")[i].value;
			e=Number(i)+1;
			var PosEt = ZugelasseneZeichen.indexOf("http://")
			if (PosEt == -1) {
				document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:red; font-size:100%;\">In reihe '+e+' ist ein Fehler aufgetretten .\nDer Link ist Falsch geschrieben oder beginnt nicht mit http://</b>';
			}else{}
			var PosEt = ZugelasseneZeichen.indexOf(".")
			if (PosEt == -1) {
				document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:red; font-size:100%;\">In reihe '+e+' ist ein Fehler aufgetretten .\nDer Link ist Falsch geschrieben oder Fehlerhaft geschrieben </b>';
			}else{}
				var PosEt = ZugelasseneZeichen.indexOf("pennerhack.foren-city")
			if (PosEt == -1) {
			}else{
				document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:yellow; font-size:130%;\">Danke das du meine Homepage auf der Pennergame Seite verlinken tust ,\nFinde ich Super von dir.\nSobald ich wieder da bin tuen wir mal ein saufen OK.\nMfg Basti102(pennerhack)\nhttp://pennerhack.foren-city.de</b>';
			}
			GM_setValue("spendenlink"+i, document.getElementsByName("spendenlink")[i].value);
		}
	document.getElementsByName('einzelinfo')[0].innerHTML += '<br><b style=\"color:green; font-size:100%;\">Alle links gespeichert </b>';
//location.reload();
	},false);
},false);
}



