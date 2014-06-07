// ==UserScript==
// @name          All in All Angrifswarner Pennergame 4.0 By Basti1012
// @namespace      by basti121o http://pennerhack.foren-city.de. t ueberwachung im alle 9 pennergame s ob ein angriff rein kommt . mann kann jede stadt ein und ausschalten ob eine ueberwachung statt finden soll.in jeden game kann man jedes andere game die angriffe ueberwachen 
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

if(GM_getValue("sek")==null){
GM_setValue("sek", '30');
}



var url = document.location.href;
if (url.indexOf("/settings/")>=0) {
var neu = document.getElementsByTagName("table")[0];
SubmitButtonHTML = '';
var newp = document.createElement("tr");
newp.innerHTML = ''
	+'<font color=\"green\">Hamburg</font>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/><br>			Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Berlin</font>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>	<br>			Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Dossergame</font></br>	Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>	<br>			Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Menelgame</font></br>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>	<br>		Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Clodogame</font></br>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>	<br>		Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Mendigogame</font></br>	Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>		<br>		Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">serserionline</font></br>	Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>	<br>		Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Bumrise</font></br>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/>		<br>	Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br><br>'
	+'<font color=\"green\">Muenchen</font></br>		Angrifs&uuml;berwachung aktivieren:<input type="checkbox" name="lockin" id="link1"/><br> Info nur bei ANgriff einblenden :<input type="checkbox" name="info" id="info1"/><br> Ton Abspielen bei angriff :<input type="checkbox" name="ton" id="ton1"/><br>		Fight Ausgang auch anzeigen :	<input type="checkbox" name="nurde" id="nurde1"/><br>'
	+'Relod Zeit :<input type="text" name="sek" id="sek">.(Sekunden)'
	+'<select name=\"sound\">'
	+'<option value=\"http://ego-shooters.net/notify.mp3\">Notify</option>'
	+'<option value=\"http://ego-shooters.net/sirene.mp3\">Sirene</option>'
	+'<option value=\"http://ego-shooters.net/melder.mp3\">Melder</option>'
	+'<option value=\"http://ego-shooters.net/warn.mp3/\">warn</option></select>'
	+'<input type="button" name="daten" id="daten" value="Alle eingaben Speichern und schliessen" /><br>';
var newli = document.createElement("tr");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);








document.getElementsByName("sek")[0].value = GM_getValue("sek");
document.getElementsByName("sound")[0].value = GM_getValue("sound");
	for(i=0;i<=8;i++){
			document.getElementsByName("ton")[i].checked = GM_getValue("ton"+i);
			document.getElementsByName("lockin")[i].checked = GM_getValue("logincheckcheck"+i);
			document.getElementsByName("info")[i].checked = GM_getValue("info"+i);
			document.getElementsByName("nurde")[i].checked = GM_getValue("nurde"+i);
	}
	document.getElementsByName('daten')[0].addEventListener('click', function save_spenden () {
GM_setValue("sek", document.getElementsByName("sek")[0].value);
GM_setValue("sound", document.getElementsByName("sound")[0].value);
		for(i=0;i<=8;i++){
			GM_setValue("ton"+i, document.getElementsByName("ton")[i].checked);
			GM_setValue("logincheckcheck"+i, document.getElementsByName("lockin")[i].checked);
			GM_setValue("info"+i, document.getElementsByName("info")[i].checked);
			GM_setValue("nurde"+i, document.getElementsByName("nurde")[i].checked);
		}
		alert("alle daten erfolgreich gespeichert")
		window.location.reload();
	},false);
}
var spendendiv = document.createElement('div');
spendendiv.setAttribute('id', 'angriff');
spendendiv.setAttribute('align', 'middle');
spendendiv.setAttribute('titel', 'hier kommen die werte rein die gerade in der heweiligen stadt zu sehen sind');
spendendiv.setAttribute('style', 'position:absolute; top:111px; left:1px; z-index:50;');
spendendiv.innerHTML = '<b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b><b name="angriff"</b>';
document.body.appendChild(spendendiv);


GM_setValue("link0", 'http://www.berlin.pennergame.de');
GM_setValue("link1", 'http://www.pennergame.de');
GM_setValue("link2", 'http://www.dossergame.co.uk');
GM_setValue("link3", 'http://www.menelgame.pl');
GM_setValue("link4", 'http://www.clodogame.fr');
GM_setValue("link5", 'http://www.mendigogame.es');
GM_setValue("link6", 'http://www.serserionline.com');
GM_setValue("link7", 'http://www.bumrise.com');
GM_setValue("link8", 'http://muenchen.pennergame.de');




start()
function start(){
	for(a=0;a<=8;a++){
		li = GM_getValue("link"+a);
			if(GM_getValue("logincheckcheck"+a)==true){
				link1 = '<font color=\"blue\">'+li+'</font>';
				weiter(li,a)

			}
			if(GM_getValue("nurde"+a)==true){
				link1 = '<font color=\"blue\">'+li+'</font>';
				ausgang(li,a)
			}

	}
}



var abcde = GM_getValue("sek");
var abcd =abcde*1000;
window.setInterval(start, abcd);










function weiter(li,a){
GM_xmlhttpRequest({
	method: 'GET',
	url: ''+li+'/fight/overview/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		try{
			var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
			if(content.match(/warning.gif/)){
				var zeit = content.split('warning.gif')[1].split('</a>')[0];
				var zeita = zeit.split('<td>')[1].split('</td>')[0];	 
				var ida = content.split('<td><a href="/profil/id:')[1].split('/')[0];
					GM_xmlhttpRequest({
  						method: 'GET',
   						url: ''+li+'/dev/api/user.'+ida+'.xml',
   							 onload: function(responseDetails,id2) {
      								var parser = new DOMParser();
      								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      								var name1 = dom.getElementsByTagName('name')[0].textContent;
      								var id1 = dom.getElementsByTagName('id')[0].textContent;
      									try {
      										var cash1 = dom.getElementsByTagName('cash')[0].textContent;
      									}catch (e) {
      										var cash1 = '-';
      									}
							var sms1 ='<a title="Nachricht schreiben" href="'+li+'/messages/write/?to='+id1+'"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" style=\"margin-bottom:2px;\"</a>';
							document.getElementsByName('angriff')[a].innerHTML = '<font color=\"green\">Du wirst in <font color=\"yellow\">'+li+'</font> angegtriffen .Angreifer : <a href="'+li+'/profil/id:'+id1+'/"><font color=\"yellow\">'+name1+'</font></a> Bis: <font color=\"yellow\">'+zeita+' </font>. Der Gegner hat <font color=\"yellow\">'+cash1+' &euro;:</font></font>'+sms1+'<br>';
							if(GM_getValue("ton"+a)==true){
								sound = GM_getValue("sound"+a);
								if(GM_getValue("neuerton"+a)==true){
									warnton(sound,a)
								}
							}
					}});
			}else{
				GM_setValue("neuerton"+a,'true')
					if(GM_getValue("info"+a)==true){
						document.getElementsByName('angriff')[a].innerHTML = '<font color=\"green\">Dein Penner wird in  '+link1+' &uuml;berwacht</font><br>';
					}
			}
		}catch(e){
			if(GM_getValue("info"+a)==true){
				document.getElementsByName('angriff')[a].innerHTML = '<font color=\"red\">Dein Penner in '+link1+' ist ausgelogt</font><br>';
			}
		}
	}});
}







































function ausgang(li,a){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+li+'/fight/overview/',
		onload: function(responseDetails) {
			var contentd = responseDetails.responseText;
			try{
				var feldd = contentd.split('bereits auf')[1].split('br>')[0];
				var idausgang = feldd.split('/profil/')[1].split('/a>')[0];
				var id = idausgang.split('id:')[1].split('/')[0];
				var name = idausgang.split('>')[1].split('<')[0];
				var zeitausgang = feldd.split('Ende')[1].split('<')[0];
				document.getElementsByName('angriff')[a].innerHTML = '<font color=\"green\">Fight ausgang auf <a href="/profil/id:'+id+'/">'+name+'</a></font>in '+li+'<br>';
			}catch(e){}
	}});

}




































function warnton(sound,a){
GM_setValue("neuerton"+a ,'false')
   	var playerSrc = "http://ego-shooters.net/egoplayer.swf";
	var player = document.createElement('embed');
	player.src = playerSrc;
	player.setAttribute('width', 0);
	player.setAttribute('height', 0);
	player.setAttribute('style', 'visibility:hidden;');
	player.setAttribute('id', 'ego_sound_player');
	player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(sound));
	if(document.getElementById("sound_warner")){
		document.getElementById("sound_warner").removeChild(document.getElementById("ego_sound_player"))
		document.getElementById("sound_warner").appendChild(player);
	}else{
		var newspansound = document.createElement('span');
		newspansound.setAttribute('id', 'sound_warner');
		newspansound.appendChild(player);
		document.body.appendChild(newspansound);
	}
}














