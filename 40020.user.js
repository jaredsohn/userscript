// ==UserScript==
// @name           AQ-Schnellzugriffsleiste
// @namespace      AQ-Schnellzugriffsleiste
// @description    AQ-Schnellzugriffsleiste
// @include        http://world*.aquahaze.de/*
// ==/UserScript==

function main() {
  
	if( GM_getValue('Welt1ClanId') == undefined ) {
		var kasten, leiste;
		kasten = document.getElementById('maingame_header');
		if (kasten) {
			leiste = document.createElement('div');
			leiste.innerHTML = '<div class="frame" style="width:372px;">Bitte erst die Schnellzugriffsleiste konfigurieren!</div>';
			kasten.parentNode.insertBefore(leiste, kasten);
		}
		return;
	}
  
	var Welt = (String(window.location.href.match(/world[0-9]+\./i))).replace(/world/, "").replace(/\./, "");
	var ClanId = GM_getValue('Welt' + Welt + 'ClanId');
	var KampfTyp = GM_getValue('Welt' + Welt + 'KampfTyp');
	var TrainingTyp = GM_getValue('Welt' + Welt + 'TrainingTyp');
	var TransportTyp = GM_getValue('Welt' + Welt + 'TransportTyp');
	var IconType = parseInt(GM_getValue('Welt' + Welt + 'IconType'));
	var IconSize = parseInt(GM_getValue('Welt' + Welt + 'IconSize'));
	var Heilgegenstaende_erlaubt = GM_getValue('Welt' + Welt + 'Heilgegenstaende_erlaubt');
	var Aktivskills_erlaubt = GM_getValue('Welt' + Welt + 'Aktivskills_erlaubt');
	var Chat_aktiviert = GM_getValue('Welt' + Welt + 'Chat_aktiviert');
	var HP_Multi = GM_getValue('Welt' + Welt + 'HP_Multi');
	var SP_Multi = GM_getValue('Welt' + Welt + 'SP_Multi');
	var ATP_Multi = GM_getValue('Welt' + Welt + 'ATP_Multi');
	
	var SizeString =  "width: " + IconSize + "px; height: " + IconSize + "px;";

	var Icons = new Array(); 

	/* Iconset 0: spieleigene und selbsterstellte Icons 		*/
	Icons[0] = new Object();
	Icons[0]["Heal"] = "<img style=\"border: 2px solid rgb(0, 153, 0);" + SizeString + "\" alt=\"Heal\" src=\"graphics/skills/heal.jpg\"/>"; 
	Icons[0]["Blessing"] = "<img style=\"border: 2px solid rgb(0, 153, 0);" + SizeString + "\" alt=\"Blessing\" src=\"graphics/skills/blessing.jpg\"/>"; 
	Icons[0]["Revival"] = "<img style=\"border: 2px solid rgb(0, 153, 0);" + SizeString + "\" alt=\"Revival\" src=\"graphics/skills/revival.jpg\"/>";
	Icons[0]["Selfheal"] = "<img style=\"border: 2px solid rgb(0, 255, 0);" + SizeString + "\" alt=\"Selfheal\" src=\"http://img513.imageshack.us/img513/7568/selfhealfk6.jpg\"/>";
	Icons[0]["Cronus"] = "<img style=\"border:none;" + SizeString + "\" src=\"\"  alt=\"Cronus\"/>";
	Icons[0]["Mathoc"] = "<img style=\"border:none;" + SizeString + "\" src=\"\"  alt=\"Mathoc\"/>";
	Icons[0]["Oceanus"] = "<img style=\"border:none;" + SizeString + "\" src=\"\"  alt=\"Oceanus\"/>";
	Icons[0]["Caelum"] = "<img style=\"border:none;" + SizeString + "\" src=\"g\"  alt=\"Caelum\"/>";
	Icons[0]["AlteArena"] = "<img style=\"border: 2px solid rgb(232, 70, 0);" + SizeString + "\" src=\"http://img91.imageshack.us/img91/2325/arenatg6.jpg\"  alt=\"Alte Arena\"/>";
	Icons[0]["NeueArena"] = "<img style=\"border: 2px solid rgb(15, 47, 120);" + SizeString + "\" src=\"http://img373.imageshack.us/img373/6370/arenatg6lm8.jpg\"  alt=\"Neue Arena\"/>";
	Icons[0]["Clan"] = "<img style=\"border: 2px solid rgb(232, 70, 0);" + SizeString + "\" src=\"http://img201.imageshack.us/img201/4568/clan1kt3.jpg\"  alt=\"Clan\"/>";
	Icons[0]["Kampf"] = "<img style=\"border: 2px solid rgb(0, 0, 153);" + SizeString + "\" src=\"graphics/skills/atp.jpg\"  alt=\"Kampf\"/>";
	Icons[0]["Training"] = "<img style=\"border: 0px solid rgb(119, 119, 119);" + SizeString + ";\" src=\"http://img390.imageshack.us/img390/2367/trainxv7.jpg\"  alt=\"Training\"/>";
	Icons[0]["Trade"] = "<img style=\"border: 0px solid rgb(119, 119, 119);" + SizeString + "\" src=\"http://img390.imageshack.us/img390/2367/trainxv7.jpg\"  alt=\"Trade\"/>";
	Icons[0]["WarpBack"] = "";
	Icons[0]["Herausforderung"] = "";

	/* Iconset 1: Demo's Icons 					*/
	Icons[1] = new Object();
	Icons[1]["Heal"] = "<img style=\"border:none;" + SizeString + "\" alt=\"Heal\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/heal.png\"/>"; 
	Icons[1]["Blessing"] = "<img style=\"border:none;" + SizeString + "\" alt=\"Blessing\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/bless.png\"/>"; 
	Icons[1]["Revival"] = "<img style=\"border:none;" + SizeString + "\" alt=\"Revival\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/revival.png\"/>";
	Icons[1]["Selfheal"] = "<img style=\"border:none;" + SizeString + "\" alt=\"Selfheal\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/self_heal.png\"/>";
	Icons[1]["Cronus"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.uploadplanet.de/bild.php/42776,transportcronusRTW72.jpg\"  alt=\"Cronus\"/>";
	Icons[1]["Mathoc"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.uploadplanet.de/bild.php/42777,transportmathoc43LB1.jpg\"  alt=\"Mathoc\"/>";
	Icons[1]["Oceanus"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.uploadplanet.de/bild.php/42778,transportoceanusIRKVN.jpg\"  alt=\"Oceanus\"/>";
	Icons[1]["Caelum"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.uploadplanet.de/bild.php/42775,transportcaelumC2TIX.jpg\"  alt=\"Caelum\"/>";
	Icons[1]["AlteArena"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/alte_arena.png\"  alt=\"Alte Arena\"/>";
	Icons[1]["NeueArena"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/neue_arena.png\"  alt=\"Neue Arena\"/>";
	Icons[1]["Clan"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/clanintern.png\"  alt=\"Clan\"/>";	/* weiß */
	Icons[1]["Kampf"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/kampf.png\"  alt=\"Kampf\"/>";
	Icons[1]["Training"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/training.png\"  alt=\"Training\"/>";	/* weiß */
	Icons[1]["Trade"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.shufggy.lima-city.de/sonstiges/aquahaze/schnellzugriffsleiste/tausch.png\"  alt=\"Trade\"/>";		/* weiß */
	Icons[1]["WarpBack"] = "<img style=\"border:none;" + SizeString + "\" alt=\"Stadt\" src=\"http://www.uploadplanet.de/bild.php/42678,arenaverlassenAUQYW.jpg\"/>";
	Icons[1]["Herausforderung"] = "<img style=\"border:none;" + SizeString + "\" src=\"http://www.uploadplanet.de/bild.php/42613,kampf1RPZS.jpg\"  alt=\"Herausforderung\"/>";

	Icons[IconType]["Warp"] = "";
	var TempVar = document.getElementsByTagName('div');
	for(i=0; i<TempVar.length; i++)
	{
	  if(TempVar[i].className == "menu")
	  {
	      Icons[IconType]["Warp"] = Icons[IconType]["NeueArena"];
	      var WarpLink = "game.php?action=transport&do=arenawarp";
	      var WarpName = "neue Arena"; 
	  }
	}
	if(Icons[IconType]["Warp"] == "")
	{
	  Icons[IconType]["Warp"] = Icons[IconType]["WarpBack"];
	  var WarpLink = "game.php?action=warpback&sure=true";
	  var WarpName = "Stadt"; 
	}

	i = 0;
	TempVar = document.getElementsByTagName('img');
	var Stadt = "";
	while( (Stadt == "") && (i < TempVar.length) )
	{
	  if( (TempVar[i].src).indexOf("cronus") != -1 )
	      Stadt = "cronus";
	  else if( (TempVar[i].src).indexOf("mathoc") != -1 )
	      Stadt = "mathoc";
	  else if( (TempVar[i].src).indexOf("oceanus") != -1 )
	      Stadt = "oceanus";
	  else if( (TempVar[i].src).indexOf("caelum") != -1 )
	      Stadt = "caelum";
	  i++;
	}

	var training = true;
	TempVar = document.getElementsByTagName('a');
	for(i=0; i<TempVar.length; i++)
	{
	  if((TempVar[i].href).indexOf("training")  != -1)
	      training = false;
	}

	var arena = true;
	TempVar = document.getElementsByTagName('a');
	for(i=0; i<TempVar.length; i++)
	{
	  if((TempVar[i].href).indexOf("transport")  != -1)
	      arena = false;
	}


	var kasten, leiste;
	kasten = document.getElementById('maingame_header');
	if (kasten) {
		leiste = document.createElement('div');
		html = '<div class="frame" style="width:372px;">' +
			'<form action="game.php?action=transport" method="post" name="transport">' +
				'<input type="hidden" value="' + TransportTyp + '" name="travel"/>' + 
				'<input type="hidden" value="Cronus" name="target"/>' + 
			'</form>' +
			'<form action="game.php?action=training" method="post" name="training">' +
				'<input type="hidden" value="' + TrainingTyp + '" name="train"/>' +
			'</form>';
		if(arena) {
		html+=	'<form name="autoconfig" method="post" action="game.php?action=openfight">';
			    if(Heilgegenstaende_erlaubt == "true") 
				html += '<input type="hidden" value="1" name="allowheal"/>'; 
			    if(Aktivskills_erlaubt == "true") 
				html += '<input type="hidden" value="1" name="allowskills"/>'; 
			    if(Chat_aktiviert == "true") 
				html += '<input type="hidden" value="1" name="allowchat"/>'; 
		html+=      '<input type="hidden" value="10" name="leveldiff"/>' +
			    '<input type="hidden" name="hp_multi" value="' + HP_Multi + '"/>' +
			    '<input type="hidden" name="sp_multi" value="' + SP_Multi + '"/>' +
			    '<input type="hidden" name="atp_multi" value="' + ATP_Multi + '"/>' +
			    '<input name="conf_hidden" value="1" type="hidden">' +
			'</form>'; }
		html+=
			'<table><tr>' +
				'<td>' +
					'<a title="Heal" href="game.php?action=skills&useskill=heal">' +
						Icons[IconType]["Heal"] +
					'</a>' +
				'</td>' +
				'<td>' +
					'<a title="Blessing" href="game.php?action=skills&useskill=blessing">' + 
						Icons[IconType]["Blessing"] +
					'</a>' +
				'</td>' +
				'<td>' +
					'<a title="Revival" href="game.php?action=skills&useskill=revival">' +
						Icons[IconType]["Revival"] +
					'</a>' +
				'</td>' +
				'<td>' +
					'<a title="Selfheal" href="game.php?action=lobby&do=selfheal">' +
						Icons[IconType]["Selfheal"] +
					'</a>' +
				'</td>';
		if(!training && Stadt != "cronus") {
		html+=		'<td>' +
					'<a title="Cronus" href="javascript:document.forms[\'transport\'].target.value=\'Cronus\'; document.forms[\'transport\'].submit()">' +
						Icons[IconType]["Cronus"] +
					'</a>' +
				'</td>'; }
		if(!training && Stadt != "mathoc") {
		html+=		'<td>' +
					'<a title="Mathoc" href="javascript:document.forms[\'transport\'].target.value=\'Mathoc\'; document.forms[\'transport\'].submit()">' +
						Icons[IconType]["Mathoc"] +
					'</a>' +
				'</td>'; }
		if(!training && Stadt != "oceanus") {
		html+=		'<td>' +
					'<a title="Oceanus" href="javascript:document.forms[\'transport\'].target.value=\'Oceanus\'; document.forms[\'transport\'].submit()">' +
						Icons[IconType]["Oceanus"] +
					'</a>' +
				'</td>'; }
		if(!training && Stadt != "caelum") {
		html+=		'<td>' +
					'<a title="Caelum" href="javascript:document.forms[\'transport\'].target.value=\'Caelum\'; document.forms[\'transport\'].submit()">' +
						Icons[IconType]["Caelum"] +
					'</a>' +
				'</td>'; }
		if(!training) {
		html+=		'<td>' +
					'<a title="alte Arena" href="game.php?action=arena&arenafight=true">' +
						Icons[IconType]["AlteArena"] +
					'</a>' +
				'</td>'; }
		html +=		'<td>' +
					'<a title="' + WarpName + '" href="' + WarpLink + '">' +
						Icons[IconType]["Warp"] +
					'</a>' +
				'</td>' +
				'<td>' +
					'<a title="Clan" href="game.php?action=clan&visit=' + ClanId + '&clanintern=1">' +
						Icons[IconType]["Clan"] +
					'</a>' +
				'</td>';
		if(!arena && !training) {
		html+=		'<td>' +
					'<a title="Training" href="javascript:document.forms[\'training\'].submit()">' +
						Icons[IconType]["Training"] +
					'</a>' +
				'</td>';}
		if(!arena) {
		html+=		'<td>' + 
					'<a title="Trade" href="#" onClick="var charname=prompt(\'Name des Spielers, mit dem du tauschen möchtest:\', \'\'); if(charname){ document.location.href=\'game.php?action=trade&partner=\' + charname + \'&start=1\';}">' +
						Icons[IconType]["Trade"] +
					'</a>' +
				'</td>'; }   
		if(arena) {
		html+=		'<td>' +
					'<a title="Herausforderung" href="javascript:document.forms[\'autoconfig\'].submit()">' +
						Icons[IconType]["Herausforderung"] +
					'</a>' +
				'</td>'; }
		if(!training) {
		html+=		'<td>' +
					'<a title="Kampf" href="game.php?action=kampf&startfight=' + KampfTyp + '">' +
						Icons[IconType]["Kampf"] +
					'</a>' +
				'</td>'; }
		html +=	'</tr></table></div>' +
			'<br/>';
		leiste.innerHTML = html;
		kasten.parentNode.insertBefore(leiste, kasten);
	}
}

function viewSettings() {
	  
	  var html = "";
	  
	  html += '<div style="width:600px">';
	  
	  html += '<h1>Konfiguration der Schnellzugriffsleiste</h1>';
	  
	  html += '<p>Hinweis: Um die Einstellungen abzuspeichern muss der Eintrag "Einstellungen speichern" im Benutzerskript-Befehle-Menü angeklickt werden. Um auf die vorherige Seite zurückzugelangen, einfach die Seite aktualisieren.</p>';
	  
	  html += '<p>Hinweis: Die hier angezeigten Einstellungen sind Default-Werte, sie entsprechen nicht den tatsächlich abgespeicherten Werten. Möchte man eine Einstellung ändern, müssen demnach auch alle anderen Einstellungen wieder angepasst werden.</p>';
	  
	  html += '<table border=1 id="ssettings">';
	  
	  html += '<tr style="text-align:center"><td>Welt</td><td>1</td><td>2</td></tr>';
	  
	  html += '<tr><td>Clan-ID:</td><td><input id="ClanId1" size=5 value=0 /></td><td><input id="ClanId2" size=5 value=0 /></td></tr>';
	  
	  html += '<tr><td>Kampftyp:</td><td><select id="KampfTyp1" size="1"><option value="uber">Ultimate</option><option value="strong">Very Hard</option><option value="true">Hard bzw HELL (in Caelum)</option><option value="weak">Normal</option></select></td><td><select id="KampfTyp2" size="1"><option value="uber">Ultimate</option><option value="strong">Very Hard</option><option value="true">Hard bzw HELL (in Caelum)</option><option value="weak">Normal</option></select></td></tr>';
	  
	  html += '<tr><td>Trainingstyp:</td><td><select id="TrainingTyp1" size="1"><option value="1">1h, wenig Exp</option><option value="2">1h, viel Exp</option><option value="3">2h, wenig Exp</option><option value="4" selected=selected>2h, viel Exp</option><option value="5">4h (nur Premium)</option></select></td><td><select id="TrainingTyp2" size="1"><option value="1">1h, wenig Exp</option><option value="2">1h, viel Exp</option><option value="3">2h, wenig Exp</option><option value="4" selected=selected>2h, viel Exp</option><option value="5">4h (nur Premium)</option></select></td></tr>';

	  html += '<tr><td>Transporttyp:</td><td><select id="TransportTyp1" size="1"><option value="0">Laufen</option><option value="1">BT-Flyer</option><option value="2" selected=selected>PT-Flyer</option><option value="10">VIP-Flyer (nur MOD, GM, GA)</option></select></td><td><select id="TransportTyp2" size="1"><option value="0">Laufen</option><option value="1">BT-Flyer</option><option value="2" selected=selected>PT-Flyer</option><option value="10">VIP-Flyer (nur MOD, GM, GA)</option></select></td></tr>';

	  html += '<tr><td>Icontyp:</td><td><select id="IconType1" size="1"><option value="0">spieleigene bzw. selbsterstellte Icons</option><option value="1" selected=selected>Demo\'s Icons</option></select></td><td><select id="IconType2" size="1"><option value="0">spieleigene bzw. selbsterstellte Icons</option><option value="1" selected=selected>Demo\'s Icons</option></select></td></tr>';
	  
	  html += '<tr><td>Icongröße:</td><td><select id="IconSize1" size="1"><option value="10">10 px</option><option value="15">15 px</option><option value="20">20 px</option><option value="21" selected=selected>21 px</option><option value="25">25 px</option><option value="30">30 px</option></select></td><td><select id="IconSize2" size="1"><option value="10">10 px</option><option value="15">15 px</option><option value="20">20 px</option><option value="21" selected=selected>21 px</option><option value="25">25 px</option><option value="30">30 px</option></select></td></tr>';
	  
	  html += '<tr><td colspan=3>Arena - Herausforderung erstellen</td></tr>';
	  
	  html += '<tr><td>Heilgegenstaende erlaubt:</td><td><select id="Heilgegenstaende_erlaubt1" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td><td><select id="Heilgegenstaende_erlaubt2" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td></tr>';
	  
	  html += '<tr><td>Aktivskills erlaubt:</td><td><select id="Aktivskills_erlaubt1" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td><td><select id="Aktivskills_erlaubt2" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td></tr>';

	  html += '<tr><td>Chat aktiviert:</td><td><select id="Chat_aktiviert1" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td><td><select id="Chat_aktiviert2" size="1"><option value="true">Ja</option><option value="false">nein</option></select></td></tr>';
	  
	  html += '<tr><td>HP-Multiplikator:</td><td><select id="HP_Multi1" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td><td><select id="HP_Multi2" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td></tr>';

	  html += '<tr><td>SP-Multiplikator:</td><td><select id="SP_Multi1" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td><td><select id="SP_Multi2" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td></tr>';

	  html += '<tr><td>ATP-Multiplikator:</td><td><select id="ATP_Multi1" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td><td><select id="ATP_Multi2" size="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>/select></td></tr>';
	  
	  html += '</table>';
	  
	  html += '</div>';
	  
	  document.getElementsByTagName('body')[0].innerHTML = html;
  
}

function saveValues() {
	if(!document.getElementById('ssettings'))
		return;
	
	for(var Welt = 1; Welt <= 2; Welt++) {
	  	GM_setValue('Welt' + Welt + 'ClanId', document.getElementById('ClanId' + Welt).value);
		GM_setValue('Welt' + Welt + 'KampfTyp', document.getElementById('KampfTyp' + Welt).options[document.getElementById('KampfTyp' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'TrainingTyp', document.getElementById('TrainingTyp' + Welt).options[document.getElementById('TrainingTyp' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'TransportTyp', document.getElementById('TransportTyp' + Welt).options[document.getElementById('TransportTyp' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'IconType', document.getElementById('IconType' + Welt).options[document.getElementById('IconType' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'IconSize', document.getElementById('IconSize' + Welt).options[document.getElementById('IconSize' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'Heilgegenstaende_erlaubt', document.getElementById('Heilgegenstaende_erlaubt' + Welt).options[document.getElementById('Heilgegenstaende_erlaubt' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'Aktivskills_erlaubt', document.getElementById('Aktivskills_erlaubt' + Welt).options[document.getElementById('Aktivskills_erlaubt' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'Chat_aktiviert', document.getElementById('Chat_aktiviert' + Welt).options[document.getElementById('Chat_aktiviert' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'HP_Multi', document.getElementById('HP_Multi' + Welt).options[document.getElementById('HP_Multi' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'SP_Multi', document.getElementById('SP_Multi' + Welt).options[document.getElementById('SP_Multi' + Welt).selectedIndex].value);
		GM_setValue('Welt' + Welt + 'ATP_Multi', document.getElementById('ATP_Multi' + Welt).options[document.getElementById('ATP_Multi' + Welt).selectedIndex].value);
	}
	
	alert("Einstellungen wurden gespeichert.");
}

function initializeValues() {
	for(var world = 1; world <= 2; world++) {
	  	GM_setValue('Welt' + Welt + 'ClanId', "1");
		GM_setValue('Welt' + Welt + 'KampfTyp', "true");
		GM_setValue('Welt' + Welt + 'TrainingTyp', "4");
		GM_setValue('Welt' + Welt + 'TransportTyp', "2");
		GM_setValue('Welt' + Welt + 'IconType', "1");
		GM_setValue('Welt' + Welt + 'IconSize', "21");
		GM_setValue('Welt' + Welt + 'Heilgegenstaende_erlaubt', "true");
		GM_setValue('Welt' + Welt + 'Aktivskills_erlaubt', "true");
		GM_setValue('Welt' + Welt + 'Chat_aktiviert', "true");
		GM_setValue('Welt' + Welt + 'HP_Multi', "2");
		GM_setValue('Welt' + Welt + 'SP_Multi', "1");
		GM_setValue('Welt' + Welt + 'ATP_Multi', "1");
	}
}

function checkUpdate() {

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/show/40020",
  
    onreadystatechange: function(response) { 
      if (response.readyState == 4) {
      // response.responseText;
	version = String(response.responseText.match(/v[0-9]+.[0-9]+.[0-9]+/i)); 
	version = version.replace(/[v.]+/g, "");
	version = parseInt(version, 10);
	if( version > 5000 ) {
	  alert("Es ist eine neure Version der Schnellzugriffsleiste verfügbar.\n\nDu findest die aktuelle Version unter:\nhttp://userscripts.org/scripts/show/40020");
	} else {
	  alert("Du hast bereits die neuste Version installiert.");
	}
      }
    }
  
  });

}
	
main();
	
GM_registerMenuCommand("Schnellzugriffsleiste konfigurieren", viewSettings);
GM_registerMenuCommand("Einstellungen speichern", saveValues);
GM_registerMenuCommand("Überprüfe auf Updates für Schnellzugriffsleiste", checkUpdate);