// ==UserScript==
// @name          Bankmanagergame - Einstellungen
// @namespace     http://scripte.georglink.de/
// @description	  Bietet zustäzliche Einstellungsmöglichkeiten bei Bankmanagergame.
// @author        Georg J.P. Link
// @include       http://bankmanagergame.de/*
// @include       http://www.bankmanagergame.de/*
// ==/UserScript==

var $1;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$1 = unsafeWindow.jQuery;
		scriptWeiche();
	 }
}


/***** 
/* ScriptWeiche 
/* abhängig von der geöffneten Seite werden die entsprechenden ScriptFunktionen geladen 
/*****/
function scriptWeiche(){

// Premium-Feature, sollte die Seite zum Klicken kommen, einfach neuladen!!!
	test1 = $1("a:contains('Weiter zur gew')").text();
	if (test1 && (GM_getValue('premiumFeature','true')=='true')) {
		// alert('Weiter: '+test1+ ' - '+$1("a:contains('Weiter zur gew')").attr('href'))
		//$1("a:contains('Weiter zur gew')").click();
		location.reload();
		return false;
	}


//Grundlage für die ScriptWeiche ist die aktuelle URL1
URL1 = window.location.href.toString();

// Einstellungen
regex_einst=/index\.php\?section=einstellungen/;
// alert(regex_einst.test(URL1));

	if(regex_einst.test(URL1)){
		// alert("Einstellungen");
		// seite_Einstellungen()
		window.setTimeout(seite_Einstellungen, 400);	
	}
	
// Aktien
	if(URL1.search(/index\.php\?section=aktien/) != -1){
		// alert("Aktien");
		seite_Aktien()
		// window.setTimeout(seite_Aktien, 800);	
	}
	
// Kredite
	if(URL1.search(/index\.php\?section=kredite/) != -1){
		// alert("Kredite");
		window.setTimeout(seite_Kredite, 400);	
	}
	
// Beratung
	if(URL1.search(/index\.php\?section=beratung/) != -1){
		// alert("Beratung");
		window.setTimeout(seite_Beratung, 200);
	}
	
// Konten
	if(URL1.search(/index\.php\?section=konten/) != -1){
		// alert("Konten");
		window.setTimeout(seite_Konten, 400);
	}
	
// Highscore
	if(URL1.search(/index\.php\?section=highscore/) != -1){
		// alert("Highscore");
		window.setTimeout(seite_Highscore, 400);
	}

};

/*****
/* Seiten Funktionen
/*****/

function seite_Einstellungen(){
	var Einstellungen = '<table style="float:right;width:450px;" id="ScripteEinstellungen">';
	Einstellungen += '<tr><td><span class="big" style="font-weight:bold;">Einstellungen f&uuml;r Scripte</span></td></tr>';
	Einstellungen += '<tr><td><span class="big">Kredite</span><br/>';

/*** Kredite ***/	

	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'zeige Rating';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="zeigeKreditRating" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'zeige Zusammenfassung';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="zeigeKreditSummary" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Sortiere nachgefragten Kredite<br/>(obere Tabelle)';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="sortKreditOben" size="1">';
	Einstellungen += '      <option>Privat</option>';
	Einstellungen += '      <option>Höhe</option>';
	Einstellungen += '      <option>Zinzsatz</option>';
	Einstellungen += '      <option>Laufzeit</option>';
	Einstellungen += '      <option>Gewinn</option>';
	Einstellungen += '      <option>Gew. pro 24h</option>';
	Einstellungen += '      <option selected="selected">Zahlungsausfall</option>';
	Einstellungen += '      <option>Kredit vergeben</option>';
	Einstellungen += '      <option>Rating</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeKreditOben" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc">Absteigend</option>';
	Einstellungen += '      <option value="null">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Sortiere vergebenen Krediten <br/>(untere Tabelle)';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="sortKreditUnten" size="1">';
	Einstellungen += '      <option>Höhe</option>';
	Einstellungen += '      <option>Zinzsatz</option>';
	Einstellungen += '      <option selected="selected">Restlaufzeit</option>';
	Einstellungen += '      <option>Gewinn</option>';
	Einstellungen += '      <option>Gew. pro 24h</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeKreditUnten" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc">Absteigend</option>';
	Einstellungen += '      <option value="null">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '<tr><td><span class="big">Konten</span><br/>';

/*** Konten ***/	

	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'zeige Ertragswerwartung<br/>';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="zeigeKontenErtrag" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'zeige Tages Gesamtertrag<br/>';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="zeigeKontenGesamtErtrag" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Sortiere Anfragen für Konten<br/>(obere Tablle)';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="sortKontenOben" size="1">';
	Einstellungen += '      <option>Privat</option>';
	Einstellungen += '      <option>Geldfluss</option>';
	Einstellungen += '      <option>Überweis. p. Tag</option>';
	Einstellungen += '      <option>Gebühr p. Überweis.</option>';
	Einstellungen += '      <option>Dispolimit</option>';
	Einstellungen += '      <option>Dispozins</option>';
	Einstellungen += '      <option>Zahlungsausfall</option>';
	Einstellungen += '      <option>Konto eröffnen</option>';
	Einstellungen += '      <option selected="selected">Ertragserwartung</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeKontenOben" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc" selected="selected">Absteigend</option>';
	Einstellungen += '      <option value="null">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Sortiere geführte Konten <br />(untere Tablle)';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="sortKontenUnten" size="1">';
	Einstellungen += '      <option>Eröffnung</option>';
	Einstellungen += '      <option>Geldfluss</option>';
	Einstellungen += '      <option>Überweisungen</option>';
	Einstellungen += '      <option>Gebühr</option>';
	Einstellungen += '      <option>Dispolimit</option>';
	Einstellungen += '      <option>Dispozins</option>';
	Einstellungen += '      <option>Gewinne Übws.</option>';
	Einstellungen += '      <option>Gewinne Dispo</option>';
	Einstellungen += '      <option>Kündigen</option>';
	Einstellungen += '      <option selected="selected">Ertragserwartung</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeKontenUnten" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc">Absteigend</option>';
	Einstellungen += '      <option value="null">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '<tr><td><span class="big">Aktien</span><br/>';
	
/*** Aktien ***/	
	
	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'Reload Time in Sekunden';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '<input type="text" name="aktienReloadTime2" value="'+GM_getValue('aktienReloadTime',600)+'" onChange="test=parseInt(this.value);this.value=test;if(this.value==\'NaN\'){this.value = '+GM_getValue('aktienReloadTime',600)+'};test=parseInt(this.value);$(\'select[name=\\\'aktienReloadTime\\\']\').empty().append(\'<option>\'+test+\'</option>\').attr(\'value\',test);" />';
	Einstellungen += '    <select name="aktienReloadTime" size="1" style="display:none;">';
	Einstellungen += '      <option>'+GM_getValue('aktienReloadTime',600)+'</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern" />';
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Limit historische Werte auf Anzahl*<br/>* 0 = uneingeschränkt';
	Einstellungen += '</td><td>';
	Einstellungen += '<input type="text" name="aktienHwLimit2" value="'+GM_getValue('aktienHwLimit',5)+'" onChange="test=parseInt(this.value);this.value=test;if(this.value==\'NaN\'){this.value = '+GM_getValue('aktienHwLimit',5)+'};test=parseInt(this.value);if(test==0){test=\'alle\'}$(\'select[name=\\\'aktienHwLimit\\\']\').empty().append(\'<option>\'+test+\'</option>\').attr(\'value\',test);" />';
	Einstellungen += '    <select name="aktienHwLimit" size="1" style="display:none;">';
	Einstellungen += '      <option>'+GM_getValue('aktienHwLimit',5)+'</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern" />';
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Option für ältere Werte';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="aktienZeigeAeltereHw" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '<tr><td><span class="big">Highscore</span><br/>';
	
/*** Highscore ***/	
	
	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'Farbe';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="highscoreFarbe" size="1" onChange="$(\'#zeigeFarbe\').attr(\'style\',\'background-color:\'+this.value)">';
	Einstellungen += '<option value="none">(keine Markierung)</option>';
	Einstellungen += '<option>AliceBlue</option>';
	Einstellungen += '<option>AntiqueWhite</option>';
	Einstellungen += '<option>Aqua</option>';
	Einstellungen += '<option>Aquamarine</option>';
	Einstellungen += '<option>Azure</option>';
	Einstellungen += '<option>Beige</option>';
	Einstellungen += '<option>Bisque</option>';
	Einstellungen += '<option>Black</option>';
	Einstellungen += '<option>BlanchedAlmond</option>';
	Einstellungen += '<option>Blue</option>';
	Einstellungen += '<option>BlueViolet</option>';
	Einstellungen += '<option>Brown</option>';
	Einstellungen += '<option>BurlyWood</option>';
	Einstellungen += '<option>CadetBlue</option>';
	Einstellungen += '<option>Chartreuse</option>';
	Einstellungen += '<option>Chocolate</option>';
	Einstellungen += '<option>Coral</option>';
	Einstellungen += '<option>CornflowerBlue</option>';
	Einstellungen += '<option>Cornsilk</option>';
	Einstellungen += '<option>Crimson</option>';
	Einstellungen += '<option>Cyan</option>';
	Einstellungen += '<option>DarkBlue</option>';
	Einstellungen += '<option>DarkCyan</option>';
	Einstellungen += '<option>DarkGoldenRod</option>';
	Einstellungen += '<option>DarkGray</option>';
	Einstellungen += '<option>DarkGrey</option>';
	Einstellungen += '<option>DarkGreen</option>';
	Einstellungen += '<option>DarkKhaki</option>';
	Einstellungen += '<option>DarkMagenta</option>';
	Einstellungen += '<option>DarkOliveGreen</option>';
	Einstellungen += '<option>Darkorange</option>';
	Einstellungen += '<option>DarkOrchid</option>';
	Einstellungen += '<option>DarkRed</option>';
	Einstellungen += '<option>DarkSalmon</option>';
	Einstellungen += '<option>DarkSeaGreen</option>';
	Einstellungen += '<option>DarkSlateBlue</option>';
	Einstellungen += '<option>DarkSlateGray</option>';
	Einstellungen += '<option>DarkSlateGrey</option>';
	Einstellungen += '<option>DarkTurquoise</option>';
	Einstellungen += '<option>DarkViolet</option>';
	Einstellungen += '<option>DeepPink</option>';
	Einstellungen += '<option>DeepSkyBlue</option>';
	Einstellungen += '<option>DimGray</option>';
	Einstellungen += '<option>DimGrey</option>';
	Einstellungen += '<option>DodgerBlue</option>';
	Einstellungen += '<option>FireBrick</option>';
	Einstellungen += '<option>FloralWhite</option>';
	Einstellungen += '<option>ForestGreen</option>';
	Einstellungen += '<option>Fuchsia</option>';
	Einstellungen += '<option>Gainsboro</option>';
	Einstellungen += '<option>GhostWhite</option>';
	Einstellungen += '<option>Gold</option>';
	Einstellungen += '<option>GoldenRod</option>';
	Einstellungen += '<option>Gray</option>';
	Einstellungen += '<option>Grey</option>';
	Einstellungen += '<option>Green</option>';
	Einstellungen += '<option>GreenYellow</option>';
	Einstellungen += '<option>HoneyDew</option>';
	Einstellungen += '<option>HotPink</option>';
	Einstellungen += '<option>IndianRed </option>';
	Einstellungen += '<option>Indigo </option>';
	Einstellungen += '<option>Ivory</option>';
	Einstellungen += '<option>Khaki</option>';
	Einstellungen += '<option>Lavender</option>';
	Einstellungen += '<option>LavenderBlush</option>';
	Einstellungen += '<option>LawnGreen</option>';
	Einstellungen += '<option>LemonChiffon</option>';
	Einstellungen += '<option>LightBlue</option>';
	Einstellungen += '<option>LightCoral</option>';
	Einstellungen += '<option>LightCyan</option>';
	Einstellungen += '<option>LightGoldenRodYellow</option>';
	Einstellungen += '<option>LightGray</option>';
	Einstellungen += '<option>LightGrey</option>';
	Einstellungen += '<option>LightGreen</option>';
	Einstellungen += '<option>LightPink</option>';
	Einstellungen += '<option>LightSalmon</option>';
	Einstellungen += '<option>LightSeaGreen</option>';
	Einstellungen += '<option>LightSkyBlue</option>';
	Einstellungen += '<option>LightSlateGray</option>';
	Einstellungen += '<option>LightSlateGrey</option>';
	Einstellungen += '<option>LightSteelBlue</option>';
	Einstellungen += '<option>LightYellow</option>';
	Einstellungen += '<option>Lime</option>';
	Einstellungen += '<option>LimeGreen</option>';
	Einstellungen += '<option>Linen</option>';
	Einstellungen += '<option>Magenta</option>';
	Einstellungen += '<option>Maroon</option>';
	Einstellungen += '<option>MediumAquaMarine</option>';
	Einstellungen += '<option>MediumBlue</option>';
	Einstellungen += '<option>MediumOrchid</option>';
	Einstellungen += '<option>MediumPurple</option>';
	Einstellungen += '<option>MediumSeaGreen</option>';
	Einstellungen += '<option>MediumSlateBlue</option>';
	Einstellungen += '<option>MediumSpringGreen</option>';
	Einstellungen += '<option>MediumTurquoise</option>';
	Einstellungen += '<option>MediumVioletRed</option>';
	Einstellungen += '<option>MidnightBlue</option>';
	Einstellungen += '<option>MintCream</option>';
	Einstellungen += '<option>MistyRose</option>';
	Einstellungen += '<option>Moccasin</option>';
	Einstellungen += '<option>NavajoWhite</option>';
	Einstellungen += '<option>Navy</option>';
	Einstellungen += '<option>OldLace</option>';
	Einstellungen += '<option>Olive</option>';
	Einstellungen += '<option>OliveDrab</option>';
	Einstellungen += '<option>Orange</option>';
	Einstellungen += '<option>OrangeRed</option>';
	Einstellungen += '<option>Orchid</option>';
	Einstellungen += '<option>PaleGoldenRod</option>';
	Einstellungen += '<option>PaleGreen</option>';
	Einstellungen += '<option>PaleTurquoise</option>';
	Einstellungen += '<option>PaleVioletRed</option>';
	Einstellungen += '<option>PapayaWhip</option>';
	Einstellungen += '<option>PeachPuff</option>';
	Einstellungen += '<option>Peru</option>';
	Einstellungen += '<option>Pink</option>';
	Einstellungen += '<option>Plum</option>';
	Einstellungen += '<option>PowderBlue</option>';
	Einstellungen += '<option>Purple</option>';
	Einstellungen += '<option>Red</option>';
	Einstellungen += '<option>RosyBrown</option>';
	Einstellungen += '<option>RoyalBlue</option>';
	Einstellungen += '<option>SaddleBrown</option>';
	Einstellungen += '<option>Salmon</option>';
	Einstellungen += '<option>SandyBrown</option>';
	Einstellungen += '<option>SeaGreen</option>';
	Einstellungen += '<option>SeaShell</option>';
	Einstellungen += '<option>Sienna</option>';
	Einstellungen += '<option>Silver</option>';
	Einstellungen += '<option>SkyBlue</option>';
	Einstellungen += '<option>SlateBlue</option>';
	Einstellungen += '<option>SlateGray</option>';
	Einstellungen += '<option>SlateGrey</option>';
	Einstellungen += '<option>Snow</option>';
	Einstellungen += '<option>SpringGreen</option>';
	Einstellungen += '<option>SteelBlue</option>';
	Einstellungen += '<option>Tan</option>';
	Einstellungen += '<option>Teal</option>';
	Einstellungen += '<option>Thistle</option>';
	Einstellungen += '<option>Tomato</option>';
	Einstellungen += '<option>Turquoise</option>';
	Einstellungen += '<option>Violet</option>';
	Einstellungen += '<option>Wheat</option>';
	Einstellungen += '<option>White</option>';
	Einstellungen += '<option>WhiteSmoke</option>';
	Einstellungen += '<option>Yellow</option>';
	Einstellungen += '<option selected="selected">YellowGreen</option>';	
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern" id="zeigeFarbe" style="background-color:'+GM_getValue('highscoreFarbe','YellowGreen')+'">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Konsortium- oder Spielername';
	Einstellungen += '</td><td>';
	Einstellungen += '<input type="text" name="" value="'+GM_getValue('highscoreInteresse','Elite Banking')+'" onChange="$(\'select[name=\\\'highscoreInteresse\\\']\').empty().append(\'<option>\'+this.value+\'</option\').attr(\'value\',this.value)" />';
	Einstellungen += '    <select name="highscoreInteresse" size="1" style="display:none;">';
	Einstellungen += '      <option>'+GM_getValue('highscoreInteresse','Elite Banking')+'</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern" />';
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '<tr><td><span class="big">Beratung</span><br/>';
	
/*** Beratung ***/	
	
	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'Sortiere Beratungswünschen<br/>(obere Tabelle)';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="sortBeratOben" size="1">';
	Einstellungen += '      <option value="Level">Erwartetes Level</option>';
	Einstellungen += '      <option>Dauer</option>';
	Einstellungen += '      <option>Themengebiet</option>';
	Einstellungen += '      <option>Bezahlung</option>';
	Einstellungen += '      <option>Beraten</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeBeratOben" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc">Absteigend</option>';
	Einstellungen += '      <option value="null" selected="selected">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr><tr><td>';
	Einstellungen += 'Sortiere eingestllten Beratern<br/>(untere Tabelle) ';
	Einstellungen += '</td><td>';
	Einstellungen += '    <select name="sortBeratUnten" size="1">';
	Einstellungen += '      <option>Berater</option>';
	Einstellungen += '      <option>Alter</option>';
	Einstellungen += '      <option>Level</option>';
	Einstellungen += '      <option>Fähigkeiten</option>';
	Einstellungen += '      <option value="Kosten">Kosten (Stündlich)</option>';
	Einstellungen += '      <option>Aktion</option>';	
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += ' <br/>';	
	Einstellungen += '    <select name="sortFolgeBeratUnten" size="1">';
	Einstellungen += '      <option value="asc">Aufsteigend</option>';
	Einstellungen += '      <option value="desc">Absteigend</option>';
	Einstellungen += '      <option value="null" selected="selected">nicht sortieren</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '<tr><td><span class="big">Premium-Feature</span><br/>';
	
/*** Premium-Feature ***/	
	
	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'Automatisch weiterklicken';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '    <select name="premiumFeature" size="1">';
	Einstellungen += '      <option value="true">Ja</option>';
	Einstellungen += '      <option value="false">Nein</option>';
	Einstellungen += '    </select> ';	
	Einstellungen += '<input class="scriptEinstSubmit" type="submit" value="&Auml;ndern">';	
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	
/*** Reset All ***/	
	
	Einstellungen += '<tr><td>';
	Einstellungen += '<span class="big">Reset Alle Einstellungen</span>';
	Einstellungen += '<table width="100%">';
	Einstellungen += '<tr><td width="50%">';
	Einstellungen += 'Sollte Firefox rumzicken, kann es vielleicht helfen, alle gespeicherten Einstellungen zu löschen.';
	Einstellungen += '</td><td width="50%">';
	Einstellungen += '<input type="submit" id="resetAlleEinstellungen" value="alle Einstellungen zurücksetzen"/>';
	Einstellungen += '</td></tr></table>';
	Einstellungen += '</td></tr>';
	Einstellungen += '</table>';
	$1('#content div.indent-box span:contains("Bankname")').before(Einstellungen);
	
	var keys = GM_listValues(); // hole alle gespeicherten Werte
	for (var i=0, key=null; key=keys[i]; i++) {
		// GM_deleteValue(key); // Um alle gespeicherten Werte zu löschen
		$1('select[name="'+key+'"]').attr('value',GM_getValue(key));
	}
	$1('select[name="highscoreFarbe"] option').each(function(){
		$1(this).attr('style','background-color:'+this.value);
	})
	$1('#ScripteEinstellungen tr').children().not('#ScripteEinstellungen table tr td').not(':first').attr('style',"background-color:PaleGoldenRod;");
	setButtonFunktion_Einst();
}

function seite_Aktien() {
	// alert('Aktien');
	var aktiv = window.setInterval(timerAktienReload, 1000);

	var button = document.getElementById("aktienreloadlink");
	button.addEventListener('click',function(){
		reloadaktien = GM_getValue('reloadaktien',true);
			if(reloadaktien) {
				GM_setValue('reloadaktien',false);
				$1('#aktienreloadx').html('(start)');
			} else {
				GM_setValue('reloadaktien',true);
				$1('#aktienreloadx').html('(stopp)');
			}
	},true);
  
reloadaktien = GM_getValue('reloadaktien',true);
	if(reloadaktien) {
		$1('#aktienreloadx').html('(stopp)');
	} else {
		$1('#aktienreloadx').html('(start)');
	}
	
	warteAktien();
}

function seite_Kredite() {
// alert('Kredite-geladen')

	// sortiert angebotene Kredite standardmäßig nach Zahlungsausfall
	if (GM_getValue('sortFolgeKreditOben','asc')=='asc'){
		$1("#listOfCredits th:contains('"+GM_getValue('sortKreditOben','Zahlungsausfall')+"')").click();
	} else if (GM_getValue('sortFolgeKreditOben','asc')=='desc') {
		$1("#listOfCredits th:contains('"+GM_getValue('sortKreditOben','Zahlungsausfall')+"')").click().click(); 
	}
	
	// sortiert ausgegebene Kredite standardmäßig nach Restlaufzeit 
	if (GM_getValue('sortFolgeKreditUnten','asc')=='asc'){
		$1("#tablesorter th:contains('"+GM_getValue('sortKreditUnten','Restlaufzeit')+"')").click(); 
	} else if(GM_getValue('sortFolgeKreditUnten','asc')=='desc') {
		$1("#tablesorter th:contains('"+GM_getValue('sortKreditUnten','Restlaufzeit')+"')").click().click(); 
	}
	
	if(GM_getValue('zeigeKreditSummary', 'true') == 'false') {
		$1("#gesamtertrag").attr('style','display:none');
	}
	
	if(GM_getValue('zeigeKreditRating', 'true') == 'false') {
		$1('.scriptRating').attr('style','display:none');
	}
	
}

function seite_Beratung() {
// alert('Beratung')

	// sortiert nachgefragte Beratungen standardmäßig nicht
	if (GM_getValue('sortFolgeBeratOben','null')=='asc'){
		$1(".tablesorter:first thead tr").children("th:contains('"+GM_getValue('sortBeratOben','Bezahlung')+"')").click();
	} else if (GM_getValue('sortFolgeBeratOben','null')=='desc') {
		$1(".tablesorter:first thead tr").children("th:contains('"+GM_getValue('sortBeratOben','Bezahlung')+"')").click().click(); 
	}
	
	// sortiere Berater standardmäßig nicht 
	if (GM_getValue('sortFolgeBeratUnten','null')=='asc'){
		$1(".tablesorter:last thead tr").children("th:contains('"+GM_getValue('sortBeratUnten','Level')+"')").click(); 
	} else if(GM_getValue('sortFolgeBeratUnten','null')=='desc') {
		$1(".tablesorter:last thead tr").children("th:contains('"+GM_getValue('sortBeratUnten','Level')+"')").click().click(); 
	}
	$1("#content").attr("highlighting", GM_getValue('highscoreFarbe','YellowGreen'));
}

function seite_Konten() {
// alert('Konten')

	// sortiert Kontenangebote standardmäßig nach Ertragserwartung
	if (GM_getValue('sortFolgeKontenOben','desc')=='asc'){
		$1("#listOfAccounts th:contains('"+GM_getValue('sortKontenOben','Ertragserwartung')+"')").click();
	} else if (GM_getValue('sortFolgeKontenOben','desc')=='desc') {
		$1("#listOfAccounts th:contains('"+GM_getValue('sortKontenOben','Ertragserwartung')+"')").click().click(); 
	}
	
	// sortiert betehende Konten standardmäßig nach Ertragserwartung
	if (GM_getValue('sortFolgeKontenUnten','asc')=='asc'){
		$1("#tablesorter th:contains('"+GM_getValue('sortKontenUnten','Ertragserwartung')+"')").click(); 
	} else if(GM_getValue('sortFolgeKontenUnten','asc')=='desc') {
		$1("#tablesorter th:contains('"+GM_getValue('sortKontenUnten','Ertragserwartung')+"')").click().click(); 
	}

	if (GM_getValue('zeigeKontenErtrag','true')=='false'){
		$1('.scriptErtrag').attr('style','display:none;');
	}
	
	if (GM_getValue('zeigeKontenGesamtErtrag','true')=='false'){
		$1('#gesamtertrag').attr('style','display:none;');
	}

}

function seite_Highscore() {
/*****
/* Markiert alle Zeilen farbig die den eingestellten Wert enthalten
/* Ursprünglich gedacht, um alle Konsortiumsmitglieder hervorzuheben
/* Konsortiumname (highscoreInteresse) ist das Kriterium für die Zeile und kann auch ein Spielername sein
/* Die Farbe ist über die Einstellungen wählbar
/*****/
// alert('Highscore')
$1("tr:contains('"+GM_getValue('highscoreInteresse','Elite Banking')+"')").children().attr('style','background-color:'+GM_getValue('highscoreFarbe','YellowGreen')+';');
}

/*
function seite_XY() {
// alert('XY')

}
 */
 
/*****
/* Hilfsfunktionen
/*****/

function setButtonFunktion_Einst(){
/*****
/* Versieht alle OK-Buttons der Einstellungen mit ihren Funktionen
/* und entsprechende Speicherrückmeldung
/*****/
	$1('input.scriptEinstSubmit').each(function(){ // geht alle OK-Buttons durch
		 $1(this).after('<span class="greeng" style="display:none;" id="ok'+$1(this).prev('select').attr('name')+'">OK</span>'); // grüner Text als Bestätigung, dass gespeichert wurde.
		 $1(this).prev('select').attr('style','width:120px;'+$1(this).prev('select').attr('style'))
		this.addEventListener('click',function(){
			GM_setValue($1(this).prev('select').attr('name'),$1(this).prev('select').attr('value'))   // fügt die Speicherfunktion dem Button hinzu
			$1('#ok'+$1(this).prev('select').attr('name')).fadeIn('slow').fadeOut(3000); // bestätige Speicherung
		},true);
	});
	$1('#resetAlleEinstellungen').each(function(){
		this.addEventListener('click',function(){
			var keys = GM_listValues(); // hole alle gespeicherten Werte dieses Scripts
			for (var i=0, key=null; key=keys[i]; i++) {
				GM_deleteValue(key); // Um alle gespeicherten Werte zu löschen
			}
			location.reload();
		},true)
	})
};

function resetAll() {
/*****
/* Löscht alle gespeicherten Werte
/* Ist gut, damit Firefox nicht unnötig zugemüllt wird
/*****/
	var keys = GM_listValues(); // hole alle gespeicherten Werte dieses Scripts
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key); // Um alle gespeicherten Werte zu löschen
	}
}


var reloadAktienTime = GM_getValue('aktienReloadTime',600);
var dokumentTitle = document.title;
function timerAktienReload(){
 // alert('1');
	var reloadaktien = GM_getValue('reloadaktien',true);
	var uebersichtSichtbar = $1('#aktienuebersicht:visible').length;
	if(reloadaktien && uebersichtSichtbar){
		$1('#aktienreloadtimer').html(''+reloadAktienTime+'s');
		document.title = reloadAktienTime + 's - '+ dokumentTitle;
		reloadAktienTime--;
		if(reloadAktienTime < 0){
			pfad = window.location.href;
			position = pfad.indexOf("/index.php");
			if( (pfad.substr(position) == '/index.php?section=aktien') || (pfad.substr(position,26) == '/index.php?section=aktien#')){
				location.reload();
			}else{
				window.location.pathname = "/index.php?section=aktien";
			}
		}
	} else {
	document.title = dokumentTitle;
	}
} 

function warteAktien() {

	if($1('#aktienkurs12 table').length<1) {
// alert('warten');
			window.setTimeout(warteAktien, 100);
	} else {
// alert('warten-Ende');

		aktienHwLimit = GM_getValue('aktienHwLimit',5);
		aktienZeigeAeltereHw = GM_getValue('aktienZeigeAeltereHw','true');
		if(aktienHwLimit != 'alle') {
			aktienHwLimit = parseInt(aktienHwLimit);
			for(var i=1; i<=12; i++) {
				zeilen = $1('#aktienkurs'+i+' table tr');
				countZeilen = zeilen.length;
				// alert(i+': '+countZeilen);
				if(aktienHwLimit<countZeilen){
					var j = 1;
					zeilen.each(function(){
						if(j > aktienHwLimit) {
							$1(this).attr('class','hwkurse'+i).attr('style','display:none')
							if( (j == countZeilen) && (aktienZeigeAeltereHw=='true')){ //Option für mehr Werte
								// $1(this).after("<tr id='hwas"+i+"'><td colspan='2'><a id='hwasa"+i+"' onClick='$(this).attr(\"style\",\"display:none;\");$(\".hwkurse"+i+"\").slideDown(\"slow\");return false;' href='#aktie"+i+"'>(&Auml;ltere Werte anzeigen)</a></td></tr>");
								$1(this).after("<tr id='hwas"+i+"'><td colspan='2'><a id='hwasa"+i+"' onClick='$(this).attr(\"style\",\"display:none;\");$(\".hwkurse"+i+"\").attr(\"style\",\"display:normal;\");return false;' href='#aktie"+i+"'>(&Auml;ltere Werte anzeigen)</a></td></tr>");
								// alert(j+' = '+countZeilen);
							}
						}
						j++
					})
				}
			}
		}
	}
}
