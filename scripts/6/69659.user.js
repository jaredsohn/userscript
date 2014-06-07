// ==UserScript==
// @name           Angriffswarner New York V2.0 von NewMan (fixed by dartchecker777)
// @namespace      http://forum.ego-shooters.net/
// @description    Warnt dich sobald du angegriffen wirst.
// @include        *bumrise.com/*
// @exclude        *pennergame.de/*
// @exclude        *bumrise.com/redirect/*
// ==/UserScript==
//Speicherstände abfragen.
//Existieren keine Speicherwerte oder sind sie leer Defaultwerte nutzen
warner_date = new Array(7);
//Abstand oben
if(!GM_getValue("warnerdaten0")||GM_getValue("warnerdaten0")=='')
	warner_date[0] = 104;
else
	warner_date[0] = GM_getValue("warnerdaten0");
//Abstand links
if(!GM_getValue("warnerdaten1")||GM_getValue("warnerdaten1")=='')
	warner_date[1] = 900;
else
	warner_date[1] = GM_getValue("warnerdaten1");
//Bildhöhe
if(!GM_getValue("warnerdaten2")||GM_getValue("warnerdaten2")=='')
	warner_date[2] = 15;
else
	warner_date[2] = GM_getValue("warnerdaten2");
//Bildbreite
if(!GM_getValue("warnerdaten3")||GM_getValue("warnerdaten3")=='')
	warner_date[3] = 15;
else
	warner_date[3] = GM_getValue("warnerdaten3");
//Bildlink
if(!GM_getValue("warnerdaten4")||GM_getValue("warnerdaten4")=='')
	warner_date[4] = 'http://media.pennergame.de/img/dots/warning.gif';
else
	warner_date[4] = GM_getValue("warnerdaten4");
//Reloadzeit
if(!GM_getValue("warnerdaten5")||GM_getValue("warnerdaten5")=='')
	warner_date[5] = 20;
else
	warner_date[5] = GM_getValue("warnerdaten5");
//Tonlink für eigenen Sound
if(!GM_getValue("warnerdaten6")||GM_getValue("warnerdaten6")=='')
	warner_date[6] = '';
else
	warner_date[6] = GM_getValue("warnerdaten6");
if(GM_getValue("sound_warner_num") == null){
	var sound_link = '';
	var sound_num = 5;
}else if(GM_getValue("sound_warner_num") != 4){
	var sound_link = GM_getValue("sound_warner_link");
	var sound_num = GM_getValue("sound_warner_num");
}else{
	var sound_link = GM_getValue("warnerdaten6");
	var sound_num = GM_getValue("sound_warner_num");
}
//Überprüfen ob one sound gesetzt wurde
if(GM_getValue("one_sound"))
	var one_sound = true;
else
	var one_sound = false;

//Die Variable Testbild dient zur Erkennung ob das Testbild vom User aktiviert wurde.
//Es soll desweiteren verhindern, das die Funktion die Angriffe überprüft, das Bild entfernt, wenn der User es selbst aktiviert hat.
testbild = false; 
//Überprüfen ob es den Settingbereich schon gibt.
//Möglich das andere Scripte diesen schon erzeugt haben.
//Gibt es ihn nicht erzeugen des Settingbereiches.
if(!document.getElementById("newman_setting")){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'newman_setting');
	newdiv.innerHTML = '<div id="setting_buttons"></div><div id="setting_text"></div>';
	document.getElementsByTagName('body')[0].appendChild(newdiv);
}
//Erzeugen eines eigenen Spanbereichs für den Button der das Setting öffnet.
///Einfügen des Bereichs mit Button in den Settingbereich
var newspan = document.createElement('span');
newspan.setAttribute('id', 'setting_warner');
newspan.innerHTML = '<input type="button" name="warner_setting" id="warner" value="Warner Setting" />';
document.getElementById("setting_buttons").appendChild(newspan);
//Erstellung der Settingtabelle mit allen gewünschten Angaben.
var table_warner = '<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr><th colspan="4" style="border-bottom: 5px groove;">Settingbereich des Angriffswarners von NewMan</th></tr><tr><th style="border-right: 3px groove;">Position</th><th style="border-right: 3px groove;">Bildgröße</th><th style="border-right: 3px groove;">Bildlink</th><th>Reloadzeit</th></tr><tr><td style="border-right: 3px groove; border-bottom: 5px groove;" align="left">&nbsp;Abstand oben:&nbsp;<input name="warnerdaten"id="ab_top" type="text" size="5" maxlength="15" value="'+warner_date[0]+'">&nbsp;px<br />&nbsp;Abstand links:&nbsp;<input name="warnerdaten" id="ab_left" type="text" size="5" maxlength="15" value="'+warner_date[1]+'">&nbsp;px</td><td style="border-right: 3px groove; border-bottom: 5px groove;" align="left">&nbsp;Höhe:&nbsp;<input name="warnerdaten" id="bild_h" type="text" size="5" maxlength="5" value="'+warner_date[2]+'">&nbsp;px<br />&nbsp;Breite:&nbsp;<input name="warnerdaten" id="bild_b" type="text" size="5" maxlength="5" value="'+warner_date[3]+'">&nbsp;px</td><td style="border-right: 3px groove; border-bottom: 5px groove;" align="left">&nbsp;<input name="warnerdaten" id="bild_l" type="text" size="20" value="'+warner_date[4]+'"></td><td style="border-bottom: 5px groove;" align="left">&nbsp;<input name="warnerdaten" id="bild_time" type="text" size="5" value="'+warner_date[5]+'"> Sekunden</td></tr><tr><th colspan="4" style="border-bottom: 5px groove;">Soundeinstellungen des Angriffswarners</th></tr><tr><td align="left">&nbsp;<input type="radio" name="sound_warner" value="http://ego-shooters.net/melder.mp3"/>&nbsp;Sound1</td><td align="left">&nbsp;<input type="radio" name="sound_warner" value="http://ego-shooters.net/notify.mp3"/>&nbsp;Sound2</td><td align="left">&nbsp;<input type="radio" name="sound_warner" value="http://ego-shooters.net/sirene.mp3"/>&nbsp;Sound3</td><td align="left">&nbsp;<input type="radio" name="sound_warner" value="http://ego-shooters.net/warn.mp3"/>&nbsp;Sound4</td></tr><tr><td colspan="2" style="border-bottom: 5px groove;" align="left">&nbsp;<input type="radio" name="sound_warner" value=""/>Eigener Soundlink:&nbsp;<input name="warnerdaten" id="ton_l" type="text" size="20" value="'+warner_date[6]+'"></td><td colspan="2" style="border-bottom: 5px groove;" align="left">&nbsp;<input type="radio" name="sound_warner" value=""/>&nbsp;kein Sound</td></tr><tr><td colspan="3" style="border-bottom: 5px groove;" align="left">&nbsp;Ein Sound pro Kampf&nbsp;<input type="checkbox" name="one_sound" /></td><td style="border-bottom: 5px groove;"><input type="button" name="Testsound" id="test_sound_warner" value="Testsound" /></td></tr><tr><td colspan="2" style="border-bottom: 5px groove;"><input type="button" name="save_warner_setting" id="save_warner" value="Save Warner Setting" /></td><td colspan="2" style="border-bottom: 5px groove;"><input type="button" name="test_warnbild" id="test_warner" value="Testbild" /></td></tr><tr><td colspan="4" align="left">Abstand:<br />Wird defeniert von der linken oberen Ecke.<br />Testbild:<br />Fügt das Warnsymbol , was bei einem Angriff erscheint, ein. So kann jeder testen, an welcher Position sich das Bild befinden wird. Beim Klick auf den Button springt der Sichtbereich automatisch auf die Höhe des Elements, so das es leicht zu finden ist. Sollte die standart Einstellung nicht zu sehen sein, einfach mal bei "Abstand oben" und "Abstand links" 10 eintragen. So wird das Bild oben links zu finden sein und kann dann nach und nach an die gewünschte Position verschoben werden.<br />Soundeinstellungen:<br />Dienen dazu einen gewünschten Warnsound abzuspielen, wenn man angegriffen wird. Unter eigenen Soundlink, kann man selbst den link zu einer <u>MP3</u> eintragen.<br />Ein Sound pro Kampf:<br />Pro Kampf wird nur einmal ein Sound abgespielt. Wird die Funktion aus gelassen, so wird bei jedem Seitenneuladen auch der Sound abgespielt.</td></tr></table>';
//Erstellen eines Spanbereiches der als Inhalt die zufor erstelle tabelle bekommt.
//Der Spanbereich wird in den Settingbereich für den Text eingefügt.
//Der Spanbereich wird Unsichtbar gesetzt und kann vom Settingbutton sichtbar gemacht werden.
var newspan2 = document.createElement('span');
newspan2.setAttribute('id', 'text_warner');
newspan2.setAttribute('style', 'display:none;');
newspan2.innerHTML = table_warner;
document.getElementById("setting_text").appendChild(newspan2);
document.getElementsByName('sound_warner')[sound_num].checked = true;
if(GM_getValue("one_sound"))
	document.getElementsByName('one_sound')[0].checked = GM_getValue("one_sound");
//Eventlister auf den Settingbutton setzen.
//Beim klick des Buttons wird der Spanbereich mit der Tabelle sichtbar bzw unsichtbar geschaltet und der Buttontext geändert.
document.getElementById('warner').addEventListener('click', function Setting_warner(){
	if(document.getElementById('text_warner').style.display == ""){
		document.getElementById('text_warner').style.display = 'none';
		document.getElementById('warner').value = 'Warner Setting';
	}else if(document.getElementById('text_warner').style.display == "none"){
		document.getElementById('text_warner').style.display = '';
		document.getElementById('warner').value = 'Close Warner Setting';
	}
},false);
//Eventlister auf den Speicherbutton setzen.
//Beim klick werden alle Daten in den Eingabefeldern gespeichert und die Seite neu geladen.
document.getElementById('save_warner').addEventListener('click', function save_warner () {
	for(var i=0;i<=6;i++){
		GM_setValue("warnerdaten"+i, document.getElementsByName("warnerdaten")[i].value);
		if(i<6 && document.getElementsByName('sound_warner')[i].checked){
			GM_setValue("sound_warner_link", document.getElementsByName('sound_warner')[i].value);
			GM_setValue("sound_warner_num", i);
		}
	}
	GM_setValue("one_sound", document.getElementsByName('one_sound')[0].checked);
	location.reload();
},false);
//Eventlister auf den Bilttestbutton setzen.
//Beim klick wird das Warnbild auf der Seite eingeblendet damit der Nutzer die Position überprüfen kann.
//Existiert das Bild schon wird es beim klick entfernt.
//Listener mit ausgelagerter Funktion um die Funktion bespielsweise auch über Timeout oder Interval aufzurufen.
document.getElementById('test_warner').addEventListener('click',test_warner,false);
function test_warner(){
	if(document.getElementById('warnbild')){
		testbild = false;
		document.body.removeChild(document.getElementById('warnbild'));
		document.getElementById('test_warner').value = 'Testbild';
	}else{
		testbild = true;
		warner_bild();
		document.getElementById('test_warner').value = 'Testbild schliesen';
		document.getElementById('warnbild').scrollIntoView(true);
	}
}
document.getElementById('test_sound_warner').addEventListener('click', function test_sound(){
	for(var i=0;i<=5;i++){
		if(document.getElementsByName('sound_warner')[i].checked){
			if(i!=4)
				warnton(document.getElementsByName('sound_warner')[i].value);
			else
				warnton(document.getElementById('ton_l').value);
		}
	}																					   
},false);
//Funktion zum überprüfen ob ein Angriff eintrifft.
//Wird ein Angriff erkannt wird das Warnbild in die Seite eingesetzt
//Diese Funktion wird zeitlich immer wieder neu aufgerufen.
//Damit ist es möglich ohne das Neuladen der Seite einen Angriff mitzubekommen.
//ist das Bild schon vorhanden, Beispielsweise durch einen vorrigen Durchlauf der Funktion wird die Bildfunktion nicht aufgerufen.
//Ist der Angriff vorbei und das Bild wird angezeigt wird es gelöscht, es sei den das Bidl wurde vom user angeschaltet.
function warner(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.bumrise.com/fight/overview/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			//http://berlin.pennergame.de/profil/id:2286149/
			if(content.match(/warning/)){
				if(one_sound){
					var content_split = content.split('Zaman')[1].split('Gerçekleşen Kavgalar')[0];
					var angreiffer1_id = content_split.split('profil/id:')[1].split('/')[0];
				}else{
					var angreiffer1_id = 0;
					GM_deleteValue("angreiffer_warn");
				}
				if(!document.getElementById('warnbild')){
					warner_bild();
					if(GM_getValue("angreiffer_warn") != angreiffer1_id){
						GM_setValue("angreiffer_warn", angreiffer1_id)
						warnton(sound_link);
					}
				}
			}else{
				if(document.getElementById('warnbild') && !testbild)
					document.body.removeChild(document.getElementById('warnbild'));
					GM_deleteValue("angreiffer_warn");
			}
		}
	});
}
//Zeitintervall welcher die Funktion zum Überprüfen der Angriffe aufruft.
window.setInterval(warner, warner_date[5]*1000);
//Beim ersten Laden des Scriptes wird sovort überprüft ob ein Angriff kommt.
warner();
//Funktion für das erstellen des Warnbildes und einfügen ins body Element.
function warner_bild(){
	warnbild = document.createElement('div');
	warnbild.setAttribute('id', 'warnbild');
	warnbild.setAttribute('style', 'position:absolute; top:'+warner_date[0]+'px; left:'+warner_date[1]+'px; z-index:99;')
	newa = warnbild.appendChild(document.createElement('a'));
		newa.setAttribute('class', 'new_msg_infoscreen');
		newa.setAttribute('href', '/fight/overview/#form1');
		newa.setAttribute('title', 'Eingehender Angriff');
		newa.setAttribute('style', 'margin-right:35px');
	newimg = newa.appendChild(document.createElement('img'));
		newimg.setAttribute('height', warner_date[2]);
		newimg.setAttribute('width', warner_date[3]);
		newimg.setAttribute('src', warner_date[4]);
		newimg.setAttribute('border', '0');
	document.body.appendChild(warnbild);
}
function warnton(sound){
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
		//newspansound.setAttribute('style', 'display:none;');
		newspansound.appendChild(player);
		document.body.appendChild(newspansound);
	}
}
