// ==UserScript==
// @name            Farm&More
// @description     Farmhilfe und mehr
// @version        	0.7 (2010-04-10 17:21)
// @author          Simon Hilz, C1B1SE, realneode, Peety, Heinzelmaenchen, pinjam
// @namespace       http://realneode.seine-seite.com/
// @include         http://de*.die-staemme.de*
//@exclude	http://des*.die-staemme.de*
// ==/UserScript==

//Problem: Erst neuer Bericht ohne Späher, danach alter Bericht mit Späher
//Dann liest er Gebäude nicht ein.

var tmp;
var url = getHref();
var server = document.location.host.split('.')[0];
var opera = window.opera?true:false;
var world = server.match(/(\d+)/)[1];
var settings = getItem("FM_"+server+"_settings","3,1,current,1,1,1,1,0,1,1,0,1,1,1,1,0,0,1,1,1,0").split(","); //"light,spy,same,Truppen anzeigen,Farmeinheiten,Speer,Schwert,Axt,LKV,BBS,SKV,Geb�ude+Zustimmung,Hinweis bei �lteren Berichten,Berichte durchschalten,Spieler-ID"
var taste = (getItem("FM_"+server+"_taste","not available"));
if (taste == "not available") localStorage.setItem("FM_"+server+"_taste",0);
var shortcutlist = getItem("FM_"+server+"_shortcuts","A,S,9,18,16,17,226,Y,X,C,%,'").split(",");
var warn = parseInt(settings[16]);
var player_id = parseInt(settings[15]);
var letztes_dorf = parseInt(settings[17]);
var dorf_durch = parseInt(settings[20]);
var abf = parseInt(settings[18]);
var edi = parseInt(settings[19]);
var berichtZur = shortcutlist[0]; //Taste zum Bericht r�ckw�rts schalten (Standard: A)
var berichtVor = shortcutlist[1]; //Taste zum Bericht vorw�rts schalten (Standard: S) 
var farmtasteD = parseInt(shortcutlist[2]); //Taste zum deaktivieren der Farmeinheiten (Standard: Tabulator)
var farmtaste1 = parseInt(shortcutlist[3]); //Taste zum aktivieren der 1. Farmeinheit (Standard: Alt)
var farmtaste2 = parseInt(shortcutlist[4]); //Taste zum aktivieren der 2. Farmeinheit (Standard: Umschalt)
var farmtaste3 = parseInt(shortcutlist[5]); //Taste zum aktivieren der 3. Farmeinheit (Standard: Strg)
var farmtaste4 = parseInt(shortcutlist[6]); //Taste zum aktivieren der 4. Farmeinheit (Standard: <)
var instaste = shortcutlist[7];
var atttaste = shortcutlist[8];
var supptaste = shortcutlist[9];
var dorfZur = shortcutlist[10];
var dorfVor = shortcutlist[11];
var karteEvent = 0;
var extended_activated = 0;

if(document.body.innerHTML.match(/input name=\"sid_refresh_password/)) {
}
else{
	if ((url.match (/screen=place/))&&(letztes_dorf)&&(document.getElementsByClassName("menu nowrap quickbar")[0])){
		var t = (url.split("&t=").length>1) ? "_"+url.split("&t=")[1].split("&")[0] : "";
		t = (url.split("?t=").length>1) ? "_"+url.split("?t=")[1].split("&")[0] : t;
		if (document.location.href.match(/try=confirm/)){
			try{
				tmp = xPath('id(\'content_value\')/form/table/tbody/tr[2]/td[2]/a').snapshotItem(0).textContent.split("(");
				tmp = tmp[tmp.length-1].split(")")[0];
				localStorage.setItem("ld_"+server+t, tmp);
			}
			catch(e){}
		}
		try{
			tmp = xPath('id(\'content_value\')/table/tbody/tr/td/form/table[2]/tbody/tr/td[3]');
			var koords = getItem("ld_"+server+t, false);
			if (koords){
				koords = koords.split("|");
				var link_lastvillage = "javascript:(function(){document.forms['units'].elements['x'].value='"+koords[0]+"';"
						+ "document.forms['units'].elements['y'].value='"+koords[1]+"';}());";
				tmp.snapshotItem(0).innerHTML+="<a id='link_lastvillage' href=\"" + link_lastvillage + "\">&raquo; Letzes Dorf</a><br>";
			}
			delete koords;
		}
		catch(e){}
		try{
			document.addEventListener('keydown', presskey, true);
		}catch(e){}
		delete t;
	}	
	
	if ((url.match (/village=/))&&(dorf_durch)&&(document.getElementsByClassName("menu nowrap quickbar")[0])){
		try{
			tmp = xPath("id('menu_row2')/td[3]/a");
			var past = tmp.snapshotItem(0).href;
			var next = tmp.snapshotItem(1).href;
			document.addEventListener('keydown', function(e){
				if (extended_activated==0){
					var key = e.keyCode;
					var thechar = String.fromCharCode(key);
					switch (thechar){
						case dorfZur:
							location.href = past;
							break;
						case dorfVor:
							location.href = next;
							break;
					}
				}
			}, true);
		}
		catch(e){}	
	}

	if (url.match (/village=/)){
		var dorf = eval({'self':['aus selbem Dorf'],'current':['aus aktuellem Dorf'],});
		var grafik = ["spear","sword","axe","light","marcher","heavy"];
		var einheit = ["Speer","Schwert","Axt","Leichte Kavallerie","Berittene Bogenschuetzen","Schwere Kavallerie"];
		
		var attDorf = document.createElement('select');
		attDorf.setAttribute('size',1);
		attDorf.setAttribute('style','vertical-align:middle; ');
		for(var attr in dorf){
			var option = document.createElement('option');
			option.setAttribute('value',attr);
			if(attr == settings[2])
				option.setAttribute('selected','selected');
			option.appendChild(document.createTextNode(dorf[attr][0]));
			attDorf.appendChild(option);
		}
	
		var spybox = document.createElement('select');
		spybox.setAttribute('size',1);
		spybox.setAttribute('style','vertical-align:middle;');
		for(var i=0;i<=5;i++) {
			var option = document.createElement('option');
			option.setAttribute('value',i);
			if(i == settings[1])
				option.setAttribute('selected','selected');
			option.appendChild(document.createTextNode(i+" Spaeher"));
			spybox.appendChild(option);
		}

		var einheitbox = document.createElement('select');
		einheitbox.setAttribute('size',1);
		einheitbox.setAttribute('style','vertical-align:middle; ');
		for(var i=0;i<grafik.length;i++){
			var option = document.createElement('option');
			option.setAttribute('value',i);
			if(i == settings[0])
				option.setAttribute('selected','selected');
			option.appendChild(document.createTextNode(einheit[i]));
			einheitbox.appendChild(option);
		}
	
		var ktruppenanzeigen = document.createElement('input');
		ktruppenanzeigen.setAttribute('type', 'checkbox');
		if (settings[3] == 1) ktruppenanzeigen.checked = true; else ktruppenanzeigen.checked = false;

		var krohstoffeanzeigen = document.createElement('input');
		krohstoffeanzeigen.setAttribute('type', 'checkbox');
		if (settings[4] == 1) krohstoffeanzeigen.checked = true; else krohstoffeanzeigen.checked = false;

		var kgebanzeigen = document.createElement('input');
		kgebanzeigen.setAttribute('type', 'checkbox');
		if (settings[12] == 1) kgebanzeigen.checked = true; else kgebanzeigen.checked = false;
	
		var kberichtedurchschalten = document.createElement('input');
		kberichtedurchschalten.setAttribute('type', 'checkbox');
		if (settings[14] == 1) kberichtedurchschalten.checked = true; else kberichtedurchschalten.checked = false;
		
		var kdorfdurchschalten = document.createElement('input');
		kdorfdurchschalten.setAttribute('type', 'checkbox');
		if (settings[20] == 1) kdorfdurchschalten.checked = true; else kdorfdurchschalten.checked = false;

		var khinweis_alt = document.createElement('input');
		khinweis_alt.setAttribute('type', 'checkbox');
		if (settings[13] == 1) khinweis_alt.checked = true; else khinweis_alt.checked = false;
		
		var kwarn = document.createElement('input');
		kwarn.setAttribute('type', 'checkbox');
		if (settings[16] == 1) kwarn.checked = true; else kwarn.checked = false;
		
		var kletztes_dorf = document.createElement('input');
		kletztes_dorf.setAttribute('type', 'checkbox');
		if (settings[17] == 1) kletztes_dorf.checked = true; else kletztes_dorf.checked = false;
		
		var shortcut_report_left = document.createElement('input');
		shortcut_report_left.setAttribute('type', 'text');
		shortcut_report_left.setAttribute('align', 'center');
		shortcut_report_left.setAttribute('maxlength', '1');
		shortcut_report_left.value = shortcutlist[0];
		shortcut_report_left.addEventListener('keydown', Taste_druecken1, false);//1

		var shortcut_report_right = document.createElement('input');
		shortcut_report_right.setAttribute('type', 'text');
		shortcut_report_right.setAttribute('align', 'center');
		shortcut_report_right.setAttribute('maxlength', '1');
		shortcut_report_right.value = shortcutlist[1];
		shortcut_report_right.addEventListener('keydown', Taste_druecken1, false);
		
		var shortcut_village_left = document.createElement('input');
		shortcut_village_left.setAttribute('type', 'text');
		shortcut_village_left.setAttribute('align', 'center');
		shortcut_village_left.setAttribute('maxlength', '1');
		shortcut_village_left.value = shortcutlist[10];
		shortcut_village_left.addEventListener('keydown', Taste_druecken1, false);//1

		var shortcut_village_right = document.createElement('input');
		shortcut_village_right.setAttribute('type', 'text');
		shortcut_village_right.setAttribute('align', 'center');
		shortcut_village_right.setAttribute('maxlength', '1');
		shortcut_village_right.value = shortcutlist[11];
		shortcut_village_right.addEventListener('keydown', Taste_druecken1, false);

		var shortcut_none = document.createElement('input');
		shortcut_none.setAttribute('type', 'text');
		shortcut_none.setAttribute('align', 'center');
		shortcut_none.setAttribute('maxlength', '1');
		shortcut_none.value = shortcutlist[2];
		shortcut_none.addEventListener('keydown', Taste_druecken, false);

		var shortcut_first = document.createElement('input');
		shortcut_first.setAttribute('type', 'text');
		shortcut_first.setAttribute('align', 'center');
		shortcut_first.setAttribute('maxlength', '1');
		shortcut_first.value = shortcutlist[3];
		shortcut_first.addEventListener('keydown', Taste_druecken, false);

		var shortcut_second = document.createElement('input');
		shortcut_second.setAttribute('type', 'text');
		shortcut_second.setAttribute('align', 'center');
		shortcut_second.setAttribute('maxlength', '1');
		shortcut_second.value = shortcutlist[4];
		shortcut_second.addEventListener('keydown', Taste_druecken, false);

		var shortcut_third = document.createElement('input');
		shortcut_third.setAttribute('type', 'text');
		shortcut_third.setAttribute('align', 'center');
		shortcut_third.setAttribute('maxlength', '1');
		shortcut_third.value = shortcutlist[5];
		shortcut_third.addEventListener('keydown', Taste_druecken, false);

		var shortcut_fourth = document.createElement('input');
		shortcut_fourth.setAttribute('type', 'text');
		shortcut_fourth.setAttribute('align', 'center');
		shortcut_fourth.setAttribute('maxlength', '1');
		shortcut_fourth.value = shortcutlist[6];
		shortcut_fourth.addEventListener('keydown', Taste_druecken, false);

		var instaste_text = document.createElement('input');
		instaste_text.setAttribute('type', 'text');
		instaste_text.setAttribute('align', 'center');
		instaste_text.setAttribute('maxlength', '1');
		instaste_text.value = shortcutlist[7];
		instaste_text.addEventListener('keydown', Taste_druecken1, false);

		var atttaste_text = document.createElement('input');
		atttaste_text.setAttribute('type', 'text');
		atttaste_text.setAttribute('align', 'center');
		atttaste_text.setAttribute('maxlength', '1');
		atttaste_text.value = shortcutlist[8];
		atttaste_text.addEventListener('keydown', Taste_druecken1, false);

		var supptaste_text = document.createElement('input');
		supptaste_text.setAttribute('type', 'text');
		supptaste_text.setAttribute('align', 'center');
		supptaste_text.setAttribute('maxlength', '1');
		supptaste_text.value = shortcutlist[9];
		supptaste_text.addEventListener('keydown', Taste_druecken1, false);

		var kfarmeinheiten = document.createElement('div');
		var grafik = ["spear","sword","axe","light","marcher","heavy"];
		for(i=0; i<6; i++) {
			var obj = grafik[i];
			var img = document.createElement("img");
			img.setAttribute("alt", "");
			img.setAttribute("src", "graphic/unit/unit_"+grafik[i]+".png");
			check = document.createElement("input");
			check.setAttribute("type", "Checkbox");
			check.setAttribute("name", "showunits_"+i);
			check.checked = parseInt(settings[i+6]);
			kfarmeinheiten.appendChild(check);
			kfarmeinheiten.appendChild(img);
		}
	
	
		var div = document.getElementById("menu_row2").appendChild(document.createElement('td'));

		var lnk = div.appendChild(document.createElement("a"));
		lnk.href = "javascript:void(0)";
		lnk.innerHTML = "F&M";
		lnk.addEventListener("click", function(){ var frm = document.getElementById("einstellungen"); frm.style.display="block"; frm.style.align="center"; frm.style.left="20%"; frm.style.top="20%"; }, false );
		var einst = document.body.appendChild(document.createElement("div"), div);
		einst.style.position = "absolute";
		einst.align = "center";
		einst.style.zIndex = 5;
		einst.style.display = "none";
		einst.style.padding = "0px";
		einst.id = "einstellungen";
    
		//******************** Popup-HTML-Code ***************************
		html = '<table class="main" style="width:650px; border:2px solid #804000;">';
		html += '<tr><th><table cellspacing="0" cellpadding="0" style="width:100%"><tr><th>Einstellungen</th><th style="text-align:right;"><a id="einst_close" href="javascript:void(0)">Schliessen</a></th></tr></table></th></tr>';
		html += '<tr style="white-space:nowrap" class="nowrap row_b"><th><table class="vis" style="border:0px solid #804000; width:100%; font-weight:normal">';
		html += '<colgroup><col width="280"><col width="370"></colgroup>';
		html += '<tr><td colspan="2" align="center" style="background:#CCFF99"><a href="javascript:void(0)"><b id="abf">Aus Berichten Farmen</b></a></td></tr>';
		html += '<tr class="abf"><td align="center" id="spys"></td><td>Anzahl der Sp&auml;her, die mitgeschickt werden sollen</td></tr>';
		html += '<tr class="abf"><td align="center" id="attDorf"></td><td>aus welchem Dorf angreifen?</td></tr>';
		html += '<tr class="abf"><td align="center" id="farmeinheit"></td><td>Grundfarmeinheit</td></tr>';
		html += '<tr><td colspan="2" align="center" style="background:#CCFF99"><a href="javascript:void(0)"><b id="edi">Erweiterte Dorfinfos</b></a></td></tr>';
		html += '<tr class="edi"><td align="center" id="ktruppenanzeigen"></td><td>Truppen anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="krohstoffeanzeigen"></td><td>Rohstoffe anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="kgebanzeigen"></td><td>Geb&auml;ude und Zustimmung anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="khinweis_alt"></td><td>Hinweis bei alten Berichten anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="kberichtedurchschalten"></td><td>Berichte durchschalten</td></tr>';
		html += '<tr class="edi"><td align="center" id="kdorfdurchschalten"></td><td>Dorf durchschalten</td></tr>';
		html += '<tr class="edi"><td align="center" id="kwarn"></td><td>Fehlermeldungen anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="kletztes_dorf"></td><td>Letztes Dorf im Versammlungsplatz anzeigen</td></tr>';
		html += '<tr class="edi"><td align="center" id="kfarmeinheiten"></td><td>angezeigte Farmeinheiten (maximal 4 ausw&auml;hlen)</td></tr>';
		html += '<tr><td colspan="2" align="center" ><a href="javascript:void(0)"><b id="extended">Weitere Einstellungen</b></a></td></tr>';
		
		//Hier die erweiterten Einstellungen:
		html += '<tr class="ext"><td colspan="2" align="center"><b>Kurztasten</b></td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_report_left"></td><td>Berichte nach links bl&auml;ttern</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_report_right"></td><td>Berichte nach rechts bl&auml;ttern</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_village_left"></td><td>Dorf nach links bl&auml;ttern</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_village_right"></td><td>Dorf nach rechts bl&auml;ttern</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_none"></td><td>Farmeinheiten deaktivieren</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_first"></td><td>1. Farmeinheit aktivieren</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_second"></td><td>2. Farmeinheit aktivieren</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_third"></td><td>3. Farmeinheit aktivieren</td></tr>';
		html += '<tr class="ext"><td align="center" id="shortcut_fourth"></td><td>4. Farmeinheit aktivieren</td></tr>';
		html += '<tr class="ext"><td align="center" id="instaste"></td><td>Alle Einheiten + letzte Dorfkoordinaten einf&uuml;gen</td></tr>';
		html += '<tr class="ext"><td align="center" id="atttaste"></td><td>Angreifen/Best&auml;tigen</td></tr>';
		html += '<tr class="ext"><td align="center" id="supptaste"></td><td>Unterst&uuml;tzen/Best&auml;tigen</td></tr>';
		
		html += '</table></th></tr>';
		html += '<tr><th><table cellspacing="0" cellpadding="0" style="width:100%"><tr><th><font size="1">&copy;2010 by pinjam & realneode</font></th>'
		html += '<th style="text-align:right;"><a id="einst_save_close" href="javascript:void(0)">Speichern + Schliessen</a></th></tr></table></th></tr></table>';
		einst.innerHTML = html;
		if (edi == 0) document.getElementById("edi").parentNode.parentNode.style.background = "#FFCC99";
		if (abf == 0) document.getElementById("abf").parentNode.parentNode.style.background = "#FFCC99";
		
		for (i=0;i<15;i++) {
			try {getElementsByClassName("ext")[i].style.display = "none";} catch(e){};
		}
		
		document.getElementById("attDorf").appendChild(attDorf);
		document.getElementById("spys").appendChild(spybox);
		document.getElementById("farmeinheit").appendChild(einheitbox);
		document.getElementById("ktruppenanzeigen").appendChild(ktruppenanzeigen);
		document.getElementById("krohstoffeanzeigen").appendChild(krohstoffeanzeigen);
		document.getElementById("kgebanzeigen").appendChild(kgebanzeigen);
		document.getElementById("khinweis_alt").appendChild(khinweis_alt);
		document.getElementById("kfarmeinheiten").appendChild(kfarmeinheiten);
		document.getElementById("kberichtedurchschalten").appendChild(kberichtedurchschalten);
		document.getElementById("kdorfdurchschalten").appendChild(kdorfdurchschalten);
		document.getElementById("kletztes_dorf").appendChild(kletztes_dorf);
		document.getElementById("kwarn").appendChild(kwarn);
		document.getElementById("shortcut_report_left").appendChild(shortcut_report_left);
		document.getElementById("shortcut_report_right").appendChild(shortcut_report_right);
		document.getElementById("shortcut_village_left").appendChild(shortcut_village_left);
		document.getElementById("shortcut_village_right").appendChild(shortcut_village_right);
		document.getElementById("shortcut_none").appendChild(shortcut_none);
		document.getElementById("shortcut_first").appendChild(shortcut_first);
		document.getElementById("shortcut_second").appendChild(shortcut_second);
		document.getElementById("shortcut_third").appendChild(shortcut_third);
		document.getElementById("shortcut_fourth").appendChild(shortcut_fourth);
		document.getElementById("instaste").appendChild(instaste_text);
		document.getElementById("atttaste").appendChild(atttaste_text);
		document.getElementById("supptaste").appendChild(supptaste_text);
	
		lnk = document.getElementById("einst_close");
		lnk.addEventListener("click", function() { document.getElementById("einstellungen").style.display="none"; }, false );
	
		var lnk2 = document.getElementById("einst_save_close");
		lnk2.addEventListener("click", function() { document.getElementById("einstellungen").style.display="none"; savesettings(); }, false );
	
		var lnk3 = document.getElementById("abf");
		lnk3.addEventListener("click", alarm2, false );
	
		var lnk4 = document.getElementById("edi");
		lnk4.addEventListener("click", alarm, false );
	
		var lnk5 = document.getElementById("extended");
		lnk5.addEventListener("click", extended, false );
	}
	
	if ((url.match (/screen=map/)) || (url.match (/screen=report&mode=all&view/)) || (url.match (/screen=report&mode=attack&view/)) || (url.match (/screen=info/))){
		var tragen1 = [25,15,10,80,50,50]; 	// Beute tragen
		var duration1 = (parseInt(world) == 52) ? [12.0,15.0,12.0,6.5,7.5,15.0] : [18.0,22.0,18.0,10.0,10.0,11.0]; 	// Standard-Dauer 
		var rohstoffe = ["Holz","Lehm","Eisen"];	
		var names = ["Holzf", "Lehmgrube", "Eisenmine", "Speicher", "Versteck", "Wall"];
		var ausdruck =[/Angreifer:/,/des Verteidigers/,/Verteidiger:/,/Beute:/,/Zustimmung/,/Spionage/,/Dorfübersicht/,/Gesendet/,/Zustimmung/];
		var bonusliste = [/Holzprod/,/Lehmprod/,/Eisenprod/,/Rohstoffprod/,/Speicherkap/,/Kaserne/,/Stall/,/Werkstatt/,/Bevölkerung/,/(\d+)% [mehr,schnell]/];
		var a_text = ["Zustimmung","keine","keine bekannt","nicht bekannt","Rohstoffe","Farmeinheiten","Geb&auml;ude","Bericht ist &uuml;ber","Tage","Wochen","alt","Truppen","ausw&auml;rts","Info"];
		var opt_text = ["Stufe","Truppen anzeigen","Rohstoffe anzeigen","Geb&auml;ude und Zustimmung","Geschwindigkeit","Hinweis bei &auml;lteren Berichten","Dorfinfo Optionen","Optionen verstecken","Sp&auml;her einf&uuml;gen"];
		var meldungen = ["Dorfinfo Meldung","eigenes Dorf","Dorfinfos","gel&ouml;scht","teilweise aktualisiert","aktualisiert","Dieser Bericht wurde bereits eingelesen","Dieser Bericht ist veraltet","eingetragen","nicht gel&ouml;scht"];
		var loeschen = ["Alle Dorfinformationen l&ouml;schen","Dorfinformationen l&ouml;schen","keine Dorfinformationen vorhanden"];
		var sicherheit = "M&ouml;chtest du wirklich alle Dorfinformationen dieser Welt l&ouml;schen ?";
		var gamespeed = [1,1.6,1.6];	// bis Welt 56
		var unitspeed = [1,0.625,0.625];
		var loy_speed = [1,1.6,1];
		var welten = [];
		welten[0] = [17,40,42,44,46,54]; //Gamespeed 1,6; Unitspeed 0,625; Loyspeed 1.6
		welten[1] = [26,30]; ////Gamespeed 1,6; Unitspeed 0,625; Loyspeed 1
		var speed = [];
		speed[0] = gamespeed[0];
		speed[1] = unitspeed[0];
		speed[2] = loy_speed[0];		//speed f�r Zustimmung

		for (var i=0; i < welten.length;i++) {
			for (var j=0; j < welten[i].length; j++) {
				if (welten[i][j]==world){
					speed[0] = gamespeed[i+1];
					speed[1] = unitspeed[i+1];
					speed[2] = loy_speed[i+1];
				}
			}
		}
	}
	
	if(((url.match (/&screen=report&mode=all&view/))||(url.match(/screen=report&mode=attack&view/))) && parseInt(settings[14])){
		try{
			var tmp = document.evaluate('id(\'ds_body\')/table/tbody/tr/td/table/tbody//td[2]/table/tbody/tr/td/table[1]/tbody/tr/td/a',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var link = ["",""];
			for (var i=tmp.snapshotLength-2;i<tmp.snapshotLength;i++){
				if (tmp.snapshotItem(i).textContent == "<<"){
					link[0] = tmp.snapshotItem(i).href;
				}
				if (tmp.snapshotItem(i).textContent == ">>"){
					link[1] = tmp.snapshotItem(i).href;
				}
			}
			document.addEventListener('keydown', durchschalten, true);
		}catch(e){show_meldungen(meldungen[0],"Berichte durchschalten nicht m&ouml;glich!",warn);}
	}
	
	if (url.match (/place/)) {
		var spyinsert = parseInt(settings[1]);
		if (url.match(/FM/)){
			var spymax = parseInt(document.getElementsByName("spy")[0].nextSibling.nextSibling.textContent.replace(/\((\d+)\)/,"$1"));
			if((document.getElementsByName("spy").length > 0) && (spyinsert > 0)) {
				if ((spymax > 0) && (document.getElementsByName("spy")[0].value<2)) {
					document.getElementsByName("spy")[0].value = Math.min(spymax,spyinsert);
				}
			}
			var parameter = url.split('FM=')[1].split("&")[0].split(",");
			var lkvmax = parseInt(document.getElementsByName(parameter[1])[0].nextSibling.nextSibling.textContent.replace(/\((\d+)\)/,"$1"))
			if((document.getElementsByName(parameter[1]).length > 0) && (parameter[0] > 0)){
				document.getElementsByName(parameter[1])[0].value = Math.min(parameter[0],lkvmax);
			}
		}
	}
	
	if(url.match (/screen=map/)) {
		var akt_map = "mapOld"; 	
		var watch_map = false; 
		var watch_map_timer;
		var taste=0;
		var caution = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/' +
			'oL2nkwAAAMFJREFUKM+VUcERwyAMExx71KO4kzSjJJskk9SjwCT0QUIMpU7jO99xICRZdjlnjCptz+bh' +
			'8Xq7Ec7DKuLSRnlTnfYeODoq/FYHEEWd/3RwqjOmGZhm1DHS5rJJUAFaHfuZAIC/SDoHdmDmCGlxGZAa' +
			'GiCIdfQ2i4LtHZB2sH+IOjw5V9s7SIvLiAeJdB87ItKOAV/tkAIfmmvpJkyNbUfgNnkAxALi9q5shKsL' +
			'P1zbVcUz7GDi1muuUAjv778YF3wAU2RReecthjIAAAAASUVORK5CYII=';
		var show_ressis = new Boolean(settings[4]);
		
		window.clearInterval(watch_map_timer);
		var koor_start = document.body.innerHTML.match(/\((\d+\|\d+)\)/);
		scan_map();
		xPath("id('map_big')/table/tbody/tr[1]/td[2]/a").snapshotItem(0).addEventListener("click",function() {check_map_move(akt_map);}, true);
		xPath("id('map_big')/table/tbody/tr[3]/td[2]/a").snapshotItem(0).addEventListener("click",function() {check_map_move(akt_map);}, true);
		xPath("id('map_big')/table/tbody/tr[2]/td[1]/a").snapshotItem(0).addEventListener("click",function() {check_map_move(akt_map);}, true);
		xPath("id('map_big')/table/tbody/tr[2]/td[3]/a").snapshotItem(0).addEventListener("click",function() {check_map_move(akt_map);}, true);
		window.clearInterval(watch_map_timer); watch_map = false;  stop				// ende
	}
	
	if(url.match (/screen=info_player&id=/)) {
		var tab = document.evaluate('id(\'ds_body\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[1]/table[1]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		
		var new_row_0 = document.createElement("tr");
		var new_row_2 = document.createElement("tr");
		var new_cell_0 = document.createElement("td");
		var new_cell_2 = document.createElement("td");
		var new_Link = document.createElement("a");
		var new_Link2 = document.createElement("a");
		new_cell_0.setAttribute("colspan","2");
		new_cell_2.setAttribute("colspan","2");
	
		/* Die Funktionen per Eventhandler an die Links koppeln */
		new_Link.innerHTML = "&raquo;  "+loeschen[1];							// Dorfinformationen l�schen
		new_Link.href = "javascript: void()";
		new_Link.addEventListener('click', function() {
			var id = [];
			id[0] = document.evaluate('id(\'ds_body\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[1]/table/tbody/tr/td[1]/a/@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			id[1] = [];
			var tmp,tmp2=0;
			for (var i=0;i<id[0].snapshotLength;i++){
				tmp= (id[0].snapshotItem(i).textContent.match(/info_village/)) ? id[0].snapshotItem(i).textContent.split("&id=") : "";
				if (tmp.length>1){
					id[1][tmp2]=tmp[1].split("&")[0];
					tmp2++;
				}
			}
			var geloescht = false;
			for (var i=0;i<id[1].length;i++){
				if(getItem("FM_"+server + "_" + id[1][i], false)) {
					del_village(id[1][i]);
					geloescht=true;
				}		
			}
			if (geloescht){
				new_Link.innerHTML = "&raquo;  "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gel�scht
			}
			else{
				new_Link.innerHTML = "&raquo;  "+loeschen[2];					// keine Dorfinformationen vorhanden
			}
		}, false); 

		new_Link2.innerHTML = "&raquo;  "+loeschen[0];						// Alle Dorfinformationen l�schen
		new_Link2.href = "javascript: void()";
		new_Link2.addEventListener('click', function () {delAllValue();} , false); 
		new_cell_0.appendChild(new_Link);
		new_cell_2.appendChild(new_Link2);
		new_row_0.appendChild(new_cell_0);
		new_row_2.appendChild(new_cell_2);
		tab.appendChild(new_row_0);
		tab.appendChild(new_row_2);
	}
	
	if(url.match (/screen=info_village&id=/)) {
		if(document.getElementsByClassName("menu nowrap quickbar")[0]){
			var tab = document.evaluate('id(\'ds_body\')/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td//table[1]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		}
		else{
			var tab = document.evaluate('id(\'ds_body\')/table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td//table[1]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		}
			
		if (url.match(/FM/)) {
			var fm = url.split("FM=")[1];
			var xpathResult = document.evaluate('id(\'ds_body\')/table/tbody/tr/td//tr/td/table/tbody/tr/td/table/tbody/tr[9]/td/a/@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			tmp = xpathResult.snapshotItem(0).textContent;
			xpathResult.snapshotItem(0).textContent = tmp + "&FM="+fm; 
		}
		
	
		if(tab.innerHTML.match(ausdruck[6])) {						// Dorf�bersicht, eigenes Dorf
			if (player_id == false) {
				if(tab.innerHTML.match(/screen=info_player&amp;id=(\d+)/)){
					player_id = tab.innerHTML.match(/screen=info_player&amp;id=(\d+)/)[1];
				}
				if(tab.innerHTML.match(/id=(\d+)&amp;screen=info_player/)){
					player_id = tab.innerHTML.match(/id=(\d+)&amp;screen=info_player/)[1];
				}
				edit_setting(15, player_id);
			}
		}
		var new_row_0 = document.createElement("tr");
		var new_row_2 = document.createElement("tr");
		var new_cell_0 = document.createElement("td");
		var new_cell_2 = document.createElement("td");
		var new_Link = document.createElement("a");
		var new_Link2 = document.createElement("a");
		new_cell_0.setAttribute("colspan","2");
		new_cell_2.setAttribute("colspan","2");

	/* Die Funktionen per Eventhandler an die Links koppeln */
		new_Link.innerHTML = "&raquo;  "+loeschen[1];							// Dorfinformationen l�schen
		new_Link.href = "javascript: void()";
		new_Link.addEventListener('click', function() {
			var id = location.href.split("id=")[1].replace(/\&.+/,"");
			if(localStorage.setItem("FM_"+server + "_" + id, false)) {
				del_village(id);
				new_Link.innerHTML = "&raquo;  "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gel�scht
			}
			else { 
				new_Link.innerHTML = "&raquo;  "+loeschen[2];					// keine Dorfinformationen vorhanden
			}
		}, false); 

		new_Link2.innerHTML = "&raquo;  "+loeschen[0];						// Alle Dorfinformationen l�schen
		new_Link2.href = "javascript: void()";
		new_Link2.addEventListener('click', function () {delAllValue();} , false); 
		new_cell_0.appendChild(new_Link);
		new_cell_2.appendChild(new_Link2);
		new_row_0.appendChild(new_cell_0);
		new_row_2.appendChild(new_cell_2);
		tab.appendChild(new_row_0);
		tab.appendChild(new_row_2);
	}
	
	if((url.match (/screen=report&mode=all&view=/))||(url.match(/screen=report&mode=attack&view=/))) {
		var report = readReport();
		if (report){
			report = report.split(";");
			var vil_id = report[0];
		
			if (report[1] == "ownvillage"){ //Eigenes Dorf
				del_village(vil_id);
				show_meldung(meldungen[0],meldungen[1]);
			}
		}
		if (report.length > 2) {
			var old = getItem("FM_"+server+"_"+vil_id, false);
			if (old){ old = old.split(",");}
			var old_rep_id = (old) ? parseInt(old[11]) : 0;
			var vil_id = report[0];
			var beute = report[2];
			var self_village = report[3];
			report = report[1].split(",");
			report[9] = (old[9]>0) ? old[9] : report[9];
			var rep_id = report[11];
			if (abf == 1) {
				if (old_rep_id > rep_id){
					show_ausBerichteFarmen(old,old,self_village,vil_id);
				}
				else{
					show_ausBerichteFarmen(old,report,self_village,vil_id);
				}
			}
			/* report: Village-Id;
			Holz, Lehm, Eisen (Ersp�ht), Holzmine , Lehmmine, Eisenmine, Speicher, Versteck, Wall, Datum, neuste Bericht-ID, (Zustimmung);
			Holz, Lehm, Eisen (Beute)*/
			var berichtstag = report[10].split(".")[0];
			if (report[0] == "-1"){
				report[0] = 0;
				report[1] = 0;
				report[2] = 0;
				report[10] = old[10];
			}
			if (old.length > 12){
				var tmp = diffhour(old[10])-diffhour(report[10]) + old[12];
				tmp = (tmp < 100) ? tmp : false;
				if (tmp){
					report[12] = tmp;
				}
			}	
			if(old && (old_rep_id > 0)) {
				if(rep_id > old_rep_id) {		// aktueller Bericht ist neuer
					var marker = false;
					for (i=3;i<9;i++) {
						if (report[i] == -1) { /* alte Geb�udestufen behalten */
							report[i] = old_report[i];
							marker = true;
						}
					}
					farmheute(berichtstag, beute);
					localStorage.setItem("FM_"+server + "_" + vil_id, ""+report);
					localStorage.setItem("FM_"+server + "_truppen_" + vil_id, getTroups());
					if (marker) show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[4]));	// Dorfinfos teilweise aktualisiert
					else  show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[5]));	// Dorfinfos aktualisiert
				}
				else {
					if (rep_id == old_rep_id) show_meldung(meldungen[0],meldungen[6]);	// Bericht bereit eingelesen
					else show_meldung(meldungen[0],meldungen[7]);					// Bericht ist veraltet
				}
			}
			if(!old){
				farmheute(berichtstag, beute);
				report[11] = rep_id;
				localStorage.setItem("FM_"+server + "_" + vil_id, ""+report);
				localStorage.setItem("FM_"+server + "_truppen_" + vil_id, getTroups());
				show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[8]));				// Dorfinfos eingetragen
			}	
		}
	}
	try{
		document.addEventListener('keydown', presskey, true);
	}catch(e){}

}

function scan_map() {
	var cont_tb = $id('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);

	switch(getElementsByClassName("map").length) {
	case 1:
		map = getElementsByClassName("map")[0];
		break;

	case 2:
		map = getElementsByClassName("map")[1];
		break;
	}
	var tds = map.getElementsByTagName("td");
	for(var j = 0; j<tds.length;j++) {
		if(tds[j].getElementsByTagName('a').length == 1) {
			tds[j].getElementsByTagName("img")[0].setAttribute("id",j);
			if (karteEvent == 0) tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {add_info_to_map(e.target.id);}, false);
		}
	}
}

function show_taste_to_map(taste,temp) {
	var text,tmp;
	switch (taste){
		case 0:
			text = "&raquo; deaktiviert";
			break;
		case 1:
			text = "&raquo; " + temp[0] + " aktiviert"
			break;
		case 2:
			text = "&raquo; " + temp[1] + " aktiviert"
			break;
		case 3:
			text = "&raquo; " + temp[2] + " aktiviert"
			break;
		case 4:
			text = "&raquo; " + temp[3] + " aktiviert"
			break;
	}
	if (xPath("id('map_topo')/a").snapshotLength>1){
		tmp = xPath("id('map_topo')/a");
		tmp.snapshotItem(1).innerHTML=text;
	}
	else{
		tmp = xPath("id('map_topo')").snapshotItem(0);
		tmp.innerHTML+="<br><a>"+text+"</a>";
	}
}

function add_info_to_map(k) {
	//taste = 2;
	var temp = [];
	var anzahl_werte = 0;
	for (var i=0; (i<6) && (anzahl_werte < 4); i++) {
		if (parseInt(settings[i+6]) == 1) {
			temp[anzahl_werte] = einheit[i];
			anzahl_werte++;
		}
	}
	show_taste_to_map(taste,temp);
	karteEvent = 1;
	document.addEventListener('keydown', function (event) {
		switch(event.which) {
			case farmtasteD:
				localStorage.setItem("FM_"+server+"_taste",0);
				taste = 0;
				show_taste_to_map(0,temp);
				break;
			case farmtaste1:
				localStorage.setItem("FM_"+server+"_taste",1);
				taste = 1;
				show_taste_to_map(1,temp);
				break;
			case farmtaste2:
				localStorage.setItem("FM_"+server+"_taste",2);
				taste = 2;
				show_taste_to_map(2,temp);
				break;
			case farmtaste3:
				localStorage.setItem("FM_"+server+"_taste",3);
				taste = 3;
				show_taste_to_map(3,temp);
				break;
			case farmtaste4:
				localStorage.setItem("FM_"+server+"_taste",4);
				taste = 4;
				show_taste_to_map(4,temp);
				break;
		}
	}, true);
	var cont_tb = $id('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);

	var trs = cont_tb.getElementsByTagName("tr");
	var hidden = 0;
	for(var j = 0; j < trs.length;j++) {
		if(trs[j].style.display == "none") hidden++;
	}
	if ($id('info_bonus_image')) {
		$id('info_bonus_image').setAttribute("rowspan",(8 - (hidden -1)));   // testen
	}
	var map = getElementsByClassName("map")[0];
	var tds = map.getElementsByTagName("td");
	var link = tds[k].getElementsByTagName("a")[0];
	var akt_id = link.href;
	akt_id = akt_id.split("&FM")[0];
	akt_id = (akt_id.match(/id=/)) ? akt_id.split("id=")[1].split("&")[0] : akt_id;
	akt_id = (akt_id.match(/target=/)) ? akt_id.split("target=")[1].split("&")[0] : akt_id;
		
	var koor_target = tds[k].innerHTML.match(/\((\d+\|\d+)\)/);
	var grau = tds[k].innerHTML.match(/, null, null, false,/);
	var report = getItem("FM_"+server+"_"+akt_id, false);
	if (report) {
/* report: Holz, Lehm, Eisen, Holzmine , Lehmmine, Eisenmine, Speicher, Versteck, Wall, Datum, neueste Bericht-ID, (Zustimmung) */
		var report = report.split(",");
		var ressis = [report[0], report[1], report[2]];
		var show_troups = Boolean(settings[3]);
		var show_ressis = Boolean(settings[4]);
		var show_wall = Boolean(settings[12]);
		var show_info = Boolean(settings[13]);
		var diff_h = diffhour(report[10]);
		
	// Bonusd�rfer ermitteln */
	var tmp;
	var bonus = 0;
	if (tds[k].innerHTML.match(/\/bonus\//)) {
		for (var i=0; i < 5; i++) {
			if (tds[k].innerHTML.match(bonusliste[i])) {
				tmp = getItem("FM_"+server+"_"+akt_id,false);
				if (tmp){
					tmp = tmp.split(",");
					tmp[9] = i+1;
					bonus = i+1;
					localStorage.setItem("FM_"+server+"_"+akt_id,tmp);
				}
				break;
			}
		}
	}

	/* Truppen */
		var truppen = ""+getItem("FM_"+server + "_truppen_" + akt_id, false);
		var truppenHeim = false;
		var truppenAus = false;
		var troops = false;
		if (truppen) {
			truppen = truppen.split(";");
			truppenHeim = truppen[0];
			if (truppen[1]) {
				truppenAus = truppen[1];
			}
			if (!show_troups) {
				if ((truppenHeim != "0,0,0,0,0,0,0,0,0,0,0,0") || ((truppenAus != "") && (truppenAus != "0,0,0,0,0,0,0,0,0,0,0,0"))){
					troops = true;
				}
			}
		}
		if (show_troups) {
			if (truppenHeim) {
				truppenHeim = truppenHeim.split(",");
				row = document.createElement("tr");
				row.setAttribute("id",'last_att_units');
				td1 = document.createElement("td");
				td1.innerHTML = a_text[11]+": ";					// Truppen
				if (truppenAus) {
					truppenAus = truppenAus.split(",");
					td1.innerHTML = "<br>"+a_text[11]+": <br><br>+ "+a_text[12]+": ";	//Truppen ausw�rts
				}
				td2 = document.createElement("td");
				td2.setAttribute("valign","top");
				td2.setAttribute("colspan","2");

				if (truppenHeim.length == 12) {
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
				}
				else if (truppenHeim.length == 11) {
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","snob"];
				}
				else if (truppenHeim.length == 9) {
					var einheiten = ["spear","sword","axe","spy","light","heavy","ram","catapult","snob"];
				}

				var	code = "<tr class=\"center\">";
				var counter = 0;
				for (var i=0; i < truppenHeim.length; i++) {
					if ((truppenHeim[i] >0) || (truppenAus && (truppenAus[i] >0))) {
						counter++;
						code += "<td width=\"35\"><img src=\"/graphic/unit/unit_" + einheiten[i] + ".png\"></td>";
					}
				}

				if (counter >0) {
					code += "</tr><tr class=\"center\">";
				}
				for (var i=0; i < truppenHeim.length; i++) {
					if (parseInt(truppenHeim[i]) == 0) {
						if (truppenAus[i] >0) {
							code += "<td width=\"35\">" + ""+truppenHeim[i] + "</td>";
						}
					}
					else {
						code += "<td width=\"35\">" + ""+truppenHeim[i] + "</td>";
					}
				}
				if (counter == 0) {		// keine Truppen
					if (grau) {
						code += a_text[1];
					}
					else {
						code += a_text[2];;
					}
				}
				code += "</tr>";
				if (truppenAus) {
					code += "<tr class=\"center\">";
					for (var i=0; i < truppenAus.length; i++)
					{
						if (parseInt(truppenAus[i]) == 0) {
							if (truppenHeim[i] >0) {
								code += "<td width=\"35\">" + ""+truppenAus[i] + "</td>";
							}
						} 
						else {
							code += "<td width=\"35\">" + ""+truppenAus[i] + "</td>";
						}
					}
					code += "</tr>";
				}
				var table = document.createElement("table");
				table.setAttribute("class","vis");
				table.innerHTML = code;
				td2.appendChild(table);
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}

	/* Rohstoffe */
		var res = calculateRes(report,bonus,0);

		var ressis1 = [1.0,1.0,1.0];  		// Res Bericht
		var graphic = ["holz","lehm","eisen"];
		var ressis2 = [1.0,1.0,1.0];			// f�r errechnete Ressis
		var graphicname = ["","","",""];
		var tragen = [0,0,0,0];
		var duration = [0.0,0.0,0.0,0.0];
		var anzahl_werte = 0;
		for (var i=0; (i<6) && (anzahl_werte < 4); i++) {
			obj = grafik[i];
			if (parseInt(settings[i+6]) == 1) {
				duration[anzahl_werte] = duration1[i] * speed[1] / speed[0];  // Dauer pro Feld = Standarddauer mal Einheitengeschw. durch gamespeed
				tragen[anzahl_werte] = tragen1[i];
				graphicname[anzahl_werte] = grafik[i];
				anzahl_werte++;
			}
		}
		var ausgabe = "";
		var unknown = (parseInt(res[0]) == -1);
		for (var i=0; i<=2; i++) {
			if (res[0]>0){
				ausgabe += "<img src=\"/graphic/"+graphic[i]+".png\">";
				if (res[3] <= res[i]){
					ausgabe += "<a style=\"color:#FF0000\">";
				}
				else if (0.8*res[3] <=res[i]) {
					ausgabe += "<a style=\"color:#EE8000\">";
				}
				else if (bonus>0) {
					if ((bonus == i+1) || (bonus == 4)) {
						ausgabe += "<a style=\"color:#005000\">";
					}
				}
				if (res[i] >0) {
					ausgabe += trennzeichen(res[i])+" ";
				}
				if ((0.8 * res[3] <= res[i]) || (bonus == i+1) || (bonus == 4)) {
					ausgabe += "</a>";
				}
			}
			else {  								// keine Res-Berechnung m�glich
				ausgabe += "<a style=\"color:#0000B0\"><img src=\"/graphic/"+graphic[i]+".png\" alt=\"\">";
				if (unknown) {
					ausgabe += "<b>?</b></a> ";
				}
				else {
					ausgabe += res[i]+"</a> ";
				}
			}
		}
		if ((show_ressis) && (res[3] != 0)) {   		// Rohstoffe anzeigen
			row = document.createElement("tr");
			row.setAttribute("id",'last_att_ressis');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[4]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}
		if(anzahl_werte > 0){						// Farmeinheiten anzeigen
			row = document.createElement("tr");
			row.setAttribute("id",'next_att_units');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[5]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");

		/* Berechnen der Ressis f�r die Laufzeit zum Zieldorf (mit Bonusd�rfern) */
			var vstart = koor_start[1].split("|");		// Koordinaten Startdorf  und Zieldorf
			var vtarget = koor_target[1].split("|");
			var fields  = laufzeitfaktor(vstart[0],vstart[1],vtarget[0],vtarget[1]);
			var bedarf  = [0,0,0,0];
			var ressis3 = [1,1,1,1]; 				//Einheiten
			ausgabe = "";
			for (var i=0; i < anzahl_werte; i++) {
				res = calculateRes(report,bonus,(fields * duration[i])/60);
				bedarf[i]= parseInt(Math.ceil(((res[0]+res[1]+res[2]) / tragen[i])*1.01)+1);
				ausgabe += " <img src=\"/graphic/unit/unit_"+graphicname[i]+".png\">";
				if (bedarf[i] >0){
					ausgabe +=trennzeichen(bedarf[i])+" ";
				}
				else {
					ausgabe += "<b>?</b> ";
				}
			}
			var xpathResult = document.evaluate('id(\'map\')//@href', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var tmp = [];
			taste = parseInt(getItem("FM_"+server+"_taste",0));
			for(var j = 0; j<xpathResult.snapshotLength; j++){
				tmp[0] = xpathResult.snapshotItem(j).textContent;
				tmp[1] = (tmp[0].match(/id/)) ? tmp[0].split("id=")[1].split("&")[0] : tmp[0].split("target=")[1].split("&")[0];
				tmp[2] = "/game.php?village=";
				tmp[2] += tmp[0].split("village=")[1].split("&")[0];
				tmp[2] += (tmp[0].split("&t=").length>1) ? "&t=" + tmp[0].split("t=")[1].split("&")[0] : "";
				tmp[2] += (tmp[0].split("?t=").length>1) ? "&t=" + tmp[0].split("t=")[1].split("&")[0] : "";
				tmp[2] += ((tmp[1] == akt_id) && (servertest())) ? "&screen=place&mode=command&target="+tmp[1] : "&screen=info_village&id="+tmp[1];
				tmp[2] += ((tmp[1] == akt_id) && (taste > 0)) ? "&FM="+bedarf[taste-1]+","+graphicname[taste-1] : "";
				xpathResult.snapshotItem(j).textContent=tmp[2];
			}
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}

	/* Geb�ude */
		if (show_wall) {
			row = document.createElement("tr");
			row.setAttribute("id",'last_att_wall');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[6]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");
			var counter = 0;
			var ausgabe = "";
			if (report[6] > 0) {
				ausgabe = "<img src=\"/graphic/res.png\">";
				ausgabe += report[6]+" ";
				if (bonus == 5) {
					ausgabe += "<a style=\"color:#005000\">";
				}
				ausgabe += " ("+trennzeichen(res[3])+") ";
				if (bonus == 5) {
					ausgabe += "</a>";
				}
				if (report[7] > 0) {
					ausgabe += " <img src=\"/graphic/buildings/hide.png\">"+ report[7];
				}
			}
			else {
				for (var x = 3; x < 8; x++) {
					counter += parseInt(report[x]);
				}
			}
			if (counter == -5){
				ausgabe += a_text[3];
			}
			if (report[8] != -1) {
				ausgabe += " <img src=\"/graphic/buildings/wall.png\"> "+report[8];
			}
			if (report.length == (13)) {
				var zustimmung = parseInt(report[12]);
				zustimmung += diff_h * speed[2];
				zustimmung = Math.min(Math.floor(zustimmung),100);
				ausgabe += " / "+a_text[0]+" " + zustimmung;
			}
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}

		if (show_info || troops) {
			var alter = parseInt(diff_h/24);
			if (troops || (alter >= 2)) {
				var ausgabe = "";
				row = document.createElement("tr");
				row.setAttribute("id",'last_date');
				td1 = document.createElement("td");
				td1.innerHTML = a_text[13]+": ";			// Info
				td2 = document.createElement("td");
				td2.setAttribute("colspan","2");
			}
			if (troops) {
				tr_img = document.createElement("img");
				tr_img.setAttribute("src", caution);
				tr_img.setAttribute("style", "vertical-align: bottom");
				td2.appendChild(tr_img);
				td2.appendChild(document.createTextNode(" "+a_text[11]+"! ")); 
			}
			if (alter >= 2) {
				ausgabe += a_text[7];									// Bericht ist �ber
				if (alter < 14) {
					ausgabe += " <b>"+alter+"</b> "+a_text[8]+" "+a_text[10];	// Tage alt
				}
				else {
					ausgabe += "<a style=\"color:#DD2200\"> <b>"+parseInt(alter/7)+" "+a_text[9]+"</b></a> "+a_text[10]+"!";	// Wochen alt
				}
			}
			if (troops || (alter >= 2)) {
				td2.innerHTML += ausgabe;
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}
	}
}

function farmheute(berichtstag, beute){
	var heute = new Date();
	heute = heute.getDate();
	var farmer = getItem("FM_"+server + "_farm","0,0,0,0").split(",");
	if ((farmer[3] == heute) || (farmer[3] == 0)){
		if (berichtstag == heute){
			var tmp = beute.split(",");
			farmer[0] = parseInt(farmer[0]) + parseInt(tmp[0]);
			farmer[1] = parseInt(farmer[1]) + parseInt(tmp[1]);
			farmer[2] = parseInt(farmer[2]) + parseInt(tmp[2]);
			farmer[3] = heute;
			localStorage.setItem("FM_"+server + "_farm",farmer+"");
		}
	}
	else{
		if (berichtstag == heute){
			var tmp = beute.split(",");
			farmer[0] = parseInt(tmp[0]);
			farmer[1] = parseInt(tmp[1]);
			farmer[2] = parseInt(tmp[2]);
			farmer[3] = heute;
			localStorage.setItem("FM_"+server + "_farm",farmer+"");
		}
	}
}

function readReport() {
	// Village-Id;
	// Holz,Lehm,Eisen (ersp�ht),Holzf�ller,Lehmgrube,Eisenmine,Speicher,Versteck,Wall,Bonus,Datum+Uhrzeit,Bericht-ID,(Zustimmung)
	// Holz,Lehm,Eisen (Beute)
	var tmp;
	var rueckgabe = [];
	/* handelt es sich um einen Bericht?  */
	try{
		tmp = xPath('id(\'ds_body\')//table[4]//th[1]').snapshotItem(0).textContent;
		var bericht = (tmp.match(ausdruck[2])) ? true : false;
		if (!bericht) return false;
	}catch(e){GM_log("Berichtserkennung fehlgeschlagen.");return false; }
	/* Beute */
	var beute = [0,0,0];
	try{
		if(isOwnReport()){
			tmp = xPath('id(\'ds_body\')//table[6]/tbody/tr[1]/td[1]').snapshotItem(0);
			for (var i=0,j=0;i<3;i++){
				if (tmp.innerHTML.match(rohstoffe[i])){
					beute[i] = tmp.textContent.split(" ")[j].replace(".","");
					j++;
				}
			}	
		}
	}
	catch(e){GM_log("Beute auslesen nicht m&ouml;glich.");}
	/* Volle Beute */
	var beuteVoll = false;
	try{
		tmp = xPath('id(\'ds_body\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[1]/td[2]').snapshotItem(1).textContent.split("/");
		tmp = parseInt(tmp[1])-parseInt(tmp[0]);
		beuteVoll = (tmp==0) ? false : true;
	}
	catch(e){GM_log("H&ouml;he der Beute auslesen nicht m&ouml;glich.");}
	/* Rohstoffe auslesen */
	var res = [0,0,0];
	try{
		tmp = xPath('id(\'ds_body\')/table//tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[5]/tbody/tr[1]/td').snapshotItem(0);
		for (var i=0,j=0;i<3;i++){
			if (tmp.innerHTML.match(rohstoffe[i])){
				res[i] = tmp.textContent.split(" ")[j].replace(".","");
				j++;
			}
		}
	}
	catch(e){GM_log("Rohstoffe auslesen nicht m&ouml;glich.");}
	/* Angreifer-ID auslesen */
	var player = [];
	try{
		tmp = xPath('id(\'ds_body\')//tr//table[3]//tr/th[2]//@href').snapshotItem(0);
		player[0] = parseZahl(tmp.textContent.split("id=")[1].split("&")[0]);
	}
	catch(e){GM_log("Angreifer-ID auslesen nicht m&ouml;glich.");player[0]= 0;}
	/* Verteidiger-ID auslesen */
	try{
		tmp = xPath('id(\'ds_body\')//tr//table[4]//tr/th[2]//@href').snapshotItem(0).textContent;
		player[1] = parseZahl(tmp.split("id=")[1].split("&")[0]);
	}
	catch(e){GM_log("Verteidiger-ID auslesen nicht m&ouml;glich.");player[1]= 0;	}
	/* eigene Dorf-ID auslesen */
	try {
		var ownvilId = xPath('id(\'ds_body\')//table[3]/tbody/tr/td[2]//@href').snapshotItem(0).textContent;
		ownvilId = ownvilId.split("id=")[1].split("&")[0];
	} catch(e) {GM_log("eigene Dorf-ID auslesen nicht m&ouml;glich.");return false;}
	/* fremde Dorf-ID auslesen */
	try {
		var vilId = xPath('id(\'ds_body\')//table[4]/tbody/tr/td[2]//@href').snapshotItem(0).textContent;
		vilId = vilId.split("id=")[1].split("&")[0];
	} catch(e) {GM_log("eigene Dorf-ID auslesen nicht m&ouml;glich.");return false;}
	/* Bericht-ID auslesen */
	try{
		var berId = url.split("view=")[1].split("&")[0];
	}
	catch(e){GM_log("Berichts-ID auslesen nicht m&ouml;glich.");return false;	}
	/* Datum + Zeit auslesen */
	try{
		var date = xPath('id(\'ds_body\')//td[2]/table/tbody/tr/td/table[2]/tbody/tr');
		for (var i=0;i<date.snapshotLength;i++){
			if (date.snapshotItem(i).textContent.match(ausdruck[7])){
				date = date.snapshotItem(i).textContent.replace(ausdruck[7],"");
			}
		}
	} catch(e) {GM_log("Berichtsdatum auslesen nicht m&ouml;glich.");return false; }
	/* Geb�ude auslesen */
	var buildings = [0,0,0,0,0,0];
	try{
		tmp = xPath('id(\'ds_body\')/table//tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[5]/tbody/tr[2]/td').snapshotItem(0).textContent;
		var marker = 0;
		for(var x = 0; x < names.length; x++) {
			if(tmp.match(names[x]))	{
				buildings[x] = tmp.split(names[x])[1];
				buildings[x] = buildings[x].split(" ("+opt_text[0]+" ")[1].split(")")[0];
				marker ++;
			}
		}
		/* Geb�ude konnten nicht ausgelesen werden */
		if (marker == 0) {
			buildings = [-1,-1,-1,-1,-1,-1];	// Geb�udestufen aus altem Bericht behalten
		}
	}
	catch(e){GM_log("Geb&auml;ude auslesen nicht m&ouml;glich.");}
	/* Zustimmung auslesen */
	try{
		var zustimmung = xPath('id(\'ds_body\')/table/tbody//td[2]/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr');
		zustimmung = zustimmung.snapshotItem(zustimmung.snapshotLength-1).textContent;
		zustimmung = (zustimmung.match(ausdruck[8])) ? parseInt(zustimmung.split("auf ")[1],10) : "";
		zustimmung = (zustimmung == "") ? zustimmung : parseInt(zustimmung);
	}
	catch(e){GM_log("Zustimmung auslesen nicht m&ouml;glich.");var zustimmung=""}
	// Pr�fen ob Spieler selbst
	if ((player[1] == player_id) && (parseInt(player[1]) != 0)){
		return vilId+";ownvillage";
	}
	// eigener Adelsbericht
	if ((zustimmung != "") && (player[0] == player_id) && (parseInt(player[0]) != 0) && (zustimmung<=0)) {
		return vilId+";ownvillage";
	}
	zustimmung = ((zustimmung != "") && (zustimmung <= 0)) ? "25" : zustimmung;
	zustimmung = (zustimmung != "") ? ","+zustimmung : zustimmung; 
	// Falls Geb�ude auslesen unm�glich, pr�fen ob Beute voll ist
	if (buildings == "-1,-1,-1,-1,-1,-1"){
		res = "-1,-1,-1";
	}
	output = vilId+";"+res+","+buildings+",0,"+date+","+berId+zustimmung+";"+beute+";"+ownvilId;
	return output;
}

function getKoords(wert){
	var farmskript = xPath('id(\'farm_script_table\')').snapshotLength;
	var fm = xPath("id('menu_row2')/td[7]");
	if (fm.snapshotLength>0){
		fm = ((fm.snapshotItem(0).textContent=="F&M")) ? 1 : 0;
	}
	//xxx|yyy,xxx|yyy
	var ausgabe="";
	try{
	var tmp = xPath('id(\'content_value\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr//table['+(4+farmskript)+']/tbody/tr/td[2]').snapshotItem(0).textContent;
	tmp = tmp.split(") K")[0].split("(");
	tmp = tmp[tmp.length-1];
	ausgabe += tmp;
	}
	catch(e){GM_log("Koordinaten vom Ziel-Dorf nicht auslesbar");return ausgabe;}
	if (wert == "self"){
		tmp = xPath('id(\'content_value\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr//table['+(3+farmskript)+']/tbody/tr/td[2]').snapshotItem(0).textContent;
		tmp = tmp.split(") K")[0].split("(");
		tmp = tmp[tmp.length-1];
		ausgabe += ","+tmp;
	}
	if (wert == "current"){
		tmp = xPath('id(\'menu_row2\')/td');
		tmp = tmp.snapshotItem(tmp.snapshotLength-(2+fm)).textContent;
		tmp = tmp.split(") K")[0].split("(");
		tmp = tmp[tmp.length-1];
		ausgabe += ","+tmp;
	}
	return ausgabe;
}

function calculateRes(report,bonus,laufzeit){
	//R�ckgabe: Holz,Lehm,Eisen,Speichergr��e
	switch (parseInt(bonus)){
		case 0:
			bonus = [1,1,1,1];
			break;
		case 1:
			bonus = [1.3,1,1,1];
			break;
		case 2:
			bonus = [1,1.3,1,1];
			break;
		case 3:
			bonus = [1,1,1.3,1];
			break;
		case 4:
			bonus = [1.3,1.3,1.3,1];
			break;
		case 5:
			bonus = [1,1,1,1.5];
			break;
	}
	//Holz,Lehm,Eisen,Holzmine,Lehmgrube,Eisenmine,Speicher,Versteck,Wall,unbelegt,Datum
	var storage = (parseInt(report[6]) != 0) ? getStorageSize(parseInt(report[6]),parseInt(report[7])) : 0;
	storage = (storage > 0) ? storage*bonus[3] : 0;
	storage = (parseInt(world) == 52) ? getStorageSize52(parseInt(report[6]),parseInt(report[7])) : storage;
	storage = (parseInt(world) == 58) ? getStorageSize52(parseInt(report[6]),parseInt(report[7])) : storage;
	var diff_h = diffhour(report[10]);
	var res = [];
	for (var i=0;i<3;i++){
		res[i] = (parseInt(world) == 52) ? Math.ceil(parseInt(getMining52(report[i+3]*speed[0])*bonus[i])*(diff_h+laufzeit)+parseInt(report[i])) : Math.ceil(parseInt(getMining(report[i+3]*speed[0])*bonus[i])*(diff_h+laufzeit)+parseInt(report[i]));
		res[i] = (parseInt(world) == 58) ? Math.ceil(parseInt(getMining58(report[i+3]*speed[0])*bonus[i])*(diff_h+laufzeit)+parseInt(report[i])) : res[i];
		res[i] = Math.min(storage,res[i]);
	}
	res[3]=storage;
	return res;
}
	
function diffhour (last_att) {
	var servertime = xPath("id('serverTime')").snapshotItem(0).textContent.split(":");
	var serverdate = xPath("id('serverDate')").snapshotItem(0).textContent.split("/");
	var serverDate = new Date(parseInt(serverdate[2]),parseInt(serverdate[1],10)-1,parseInt(serverdate[0],10),parseInt(servertime[0],10),parseInt(servertime[1],10),parseInt(servertime[2],10));
	
	var att_time = last_att.split(" ")[1].split(":");
	var att_date = last_att.split(" ")[0].split(".");
	var att = new Date(("20"+att_date[2]),(att_date[1]-1),att_date[0],att_time[0],att_time[1],0);
	var diff_h = (serverDate.getTime() - att.getTime()) /1000 /3600;
	if ((diff_h) < 0.0){
		alert("Bitte Systemzeit &uuml;berpr&uuml;fen!");
		return 0;
	}
	return diff_h;
}
	
function getStorageSize(level1,level2){
  return Math.round(1000*Math.pow(1.2294934,level1-1))-getHideSize(level2); 
}

function getHideSize(level){
  if(level==0){
	return 0;
  }
  else{
    return Math.round(150*Math.pow(1.3335,level-1));
  }
}

function getMining(level){
	return (level == 0 ? 5 : Math.round(30 * Math.pow(1.163118,(level-1))));
}

function getMining52(level){
	return (level == 0 ? 5 : Math.round(15 * Math.pow(1.185,(level-1))));
}

function getMining58(level){
	return (level == 0 ? 5 : Math.round(30 * Math.pow(1.15,(level-1))));
}

function getStorageSize52(level1,level2){
	return Math.round(1000*Math.pow(1.23,level1-1))-getHideSize(level2); 
}

function getHideSize52(level){
  if(level==0){
	return 0;
  }
  else{
    return Math.round(100*Math.pow(1.3511,level-1));
  }
}
	
function isOwnReport() {
	var urlaubsvertretung = url.split("&t=");
	if (!isNull(urlaubsvertretung[1])){
		return false;
	}
	var node = xPath('//td[.="Weitergeleitet am:"]');
	if(node.length > 0) {
		return false;
	} else {
		return true;
	}
}

function getHref(){
	var parameter = ["village","screen","mode","view","id","target","FM","t"];
	var link = document.location.href.split("?")[1].split("&");
	var link2 = eval({});
	for (var i=0; i<link.length;i++){
		link2[link[i].split("=")[0]]=link[i].split("=")[1];
	}
	link = document.location.href.split("?")[0]+"?";
	for (var i=0; i<parameter.length;i++){
		link += parseText(parameter[i] + "=" + link2[parameter[i]]+"&");
	}
	return (link.substring(0,link.length-1));
}

function parseText(text){
	if (text.match(/undefined/)){
		return "";
	}
	return text;
}

function isNull(val){
	return(val==null);
}

function xPath(text){
	return document.evaluate(text, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function parseZahl(zahl){
	if (isNaN(parseInt(zahl))) {
		return 0;
	}
	else{
		return parseInt(zahl);
	}
}

function $id(id) {
	var object = document.getElementById(id);
	return object;
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) {
		if(re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}

function laufzeitfaktor(x1,y1,x2,y2) {
	var Ergebnis = (x1-x2)*(x1-x2);
	Ergebnis += (y1-y2)*(y1-y2);
	Ergebnis = Math.sqrt(Ergebnis);
	return Ergebnis;
}

function durchschalten(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);
	switch (thechar){			
		case berichtVor:
			if (link[1] != ""){
				location.href = link[1];
			}
			break;
		case berichtZur:
			if (link[0] != ""){
				location.href = link[0];
			}
			break;
	}
}

function remove_info(cont_tb) {
	if($id('last_att_units')) cont_tb.removeChild($id('last_att_units'));
	if($id('last_att_ressis')) cont_tb.removeChild($id('last_att_ressis'));
	if($id('next_att_units')) cont_tb.removeChild($id('next_att_units'));
	if($id('last_att_zustimmung')) cont_tb.removeChild($id('last_att_zustimmung'));
	if($id('last_att_wall')) cont_tb.removeChild($id('last_att_wall'));
	if($id('last_date')) cont_tb.removeChild($id('last_date'));
}

function trennzeichen(zahl) {
	zahl=Math.floor(zahl)+"";
	var laenge = zahl.length;
	var ausgabe = zahl.substr(0,parseInt(laenge%3));
	for (var i=0;i<parseInt(laenge/3);i++){
		if (!((laenge%3 == 0) && (i==0))){
			if (laenge/3 > 1.0){
				ausgabe += ".";
			}
		}
		ausgabe +=zahl.substr(parseInt(laenge%3)+i*3,3);
	}
	return ausgabe;
}

function del_village(id) {
	localStorage.removeItem("FM_"+server + "_" + id);
	localStorage.removeItem("FM_"+server + "_truppen_" + id);
}

function getTroups() {
/* Liest die Truppen aus einem Bericht aus */
	var units = [];	// inside troups
	var stand = [];
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
	if(tab) {
		stand = tab.getElementsByTagName("tr")[1].getElementsByTagName("td");
		var loose = tab.getElementsByTagName("tr")[2].getElementsByTagName("td");

		for(var x = 1; x < stand.length; x++) {
			var diff = stand[x].innerHTML-loose[x].innerHTML;
			units.push(diff);
		}
	}
	var unitsa = [];	// outside troups
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(3); 
	if(tab) {
		var tds = tab.getElementsByTagName("td"); 
		for(var x = 0; x < tds.length; x++) {
			unitsa[x] = tds[x].innerHTML;
		}
	}
	return (units+";"+unitsa);
}

function check_map_move(akt_map_loc) {
	var groesse = $id('map').getElementsByTagName("tr").length;
	if(!watch_map) {
		watch_map_timer = window.setInterval(check_map_move,300,akt_map);
		watch_map = true;
		return false;
	}
	var obj = $id(akt_map_loc);
	if (obj) {
		var obj1 = obj.style.left; 
		var obj2 = obj.style.top;
		if(obj1 == (groesse*53)*(-1)+"px" || obj1 == (groesse*53)+"px" || obj2 == (groesse*38)*(-1)+"px" || obj2 == (groesse*38)+"px")
		{
			switch(akt_map_loc)
			{
				case "mapOld":
					akt_map = "mapNew";
					break;
				case "mapNew":
					akt_map = "mapOld";
					break;
			}
			scan_map();
			window.clearInterval(watch_map_timer);
			watch_map = false;
		}
	}
}

function show_meldungen(msg1,msg2,warner) {
	if ((warner == undefined)||(warner == true)){
		var row = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.innerHTML = msg1;
		td2.innerHTML = msg2;
		row.appendChild(td1);
		row.appendChild(td2);
		var tab = getElementsByClassName("vis")[2].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1];
		tab.parentNode.insertBefore(row, tab);
	}
}

function show_farmheute() {
	var farmheute = getItem("FM_"+server + "_farm","0,0,0,0");
	farmheute = farmheute.split(",");
	show_meldungen("heute gefarmt:","<img src=\"/graphic/holz.png\">"+trennzeichen(farmheute[0])+" <img src=\"/graphic/lehm.png\">"+trennzeichen(farmheute[1])+" <img src=\"/graphic/eisen.png\">" + trennzeichen(farmheute[2]));
}

function show_meldung(msg1,msg2) {
	show_farmheute();
	show_meldungen(msg1,msg2);
}

function getItem(name, defaultValue) {
	var value = localStorage.getItem(name);
	if (!value)
		return defaultValue;
	else
		return value;
}

function getValueLength(){
	var zahl=0;
	try{
		for(var i=0;i>-1;i++){
			localStorage.key(i);
			zahl++;
		}
	}
	catch(e){}
	return zahl;
}

function servertest() {
	if(document.getElementsByClassName("menu nowrap quickbar")[0]){
		var taste = parseInt(getItem("FM_"+server+"_taste",0));
		return (taste >0) ? true : false;
	}
	return false;
}

function delAllValue(){
	var sicher = window.confirm(sicherheit);
	if (sicher){		
		var anzahl = 0;
		var laenge = getValueLength();
		for (var i=0;i<laenge;i++){
			if (localStorage.key(i).length>4){
				if((localStorage.key(i).substring(0,7))==("FM_"+server)){
					localStorage.removeItem(localStorage.key(i));
					anzahl++;
				}
			}
		}
		new_Link2.innerHTML = "&raquo; "+anzahl+" "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gel�scht
	}
	else {
		new_Link2.innerHTML = "&raquo;  "+meldungen[2]+" "+meldungen[9];			// Dorfinformationen nicht gel�scht
	}
}

function edit_setting(wert, new_value) {
	if ((new_value != false) || (new_value != "false")){
		settings[wert] = new_value;
		localStorage.setItem("FM_"+server+"_settings", ""+settings);
	}
}

if(typeof GM_log == undefined){
	function GM_log (text){
		show_meldungen(meldungen[0],text,warn);
	}
}

function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; 
}

function getNextElement(obj,tname) {
    tname = tname.toLowerCase();
    obj = obj.nextSibling;
    while(true)
      {
      if(!obj)
        return false;
      if(!obj.tagName)
        obj = obj.nextSibling;
      else if(obj.tagName.toLowerCase() == tname)
        return obj;
      else
        obj = obj.nextSibling;
      }
    return list; 
}

function show_ausBerichteFarmen(old,report,selfvillage,target){
	if (!document.getElementsByClassName("menu nowrap quickbar")[0]){
		return false;
	}
	var d = settings[2];
	var village = (settings[2]=="self") ? selfvillage : url.split("village=")[1].split("&")[0];
	var koords = getKoords(settings[2]).split(",");
	var laufzeit = (laufzeitfaktor(koords[0].split("|")[0],koords[0].split("|")[1],koords[1].split("|")[0],koords[1].split("|")[1])*duration1[settings[0]])/60;
	var bonus = report[9];
	if ((report[3]<0) && ((old[3]<0)||(old[3]=='undefined'))){
		return false;
	}
	if (report[3]<0){
		for (var i=0;i<3;i++){
			report[i+3]=old[i+3];
		}
	}
	var spying = findByInner(document,'Spionage');
	var table = (spying.length >0) ? getNextElement(spying[0],'table') : false;
	var res = calculateRes(report,bonus,laufzeit);
	var walks = Math.ceil((res[0]+res[1]+res[2])/tragen1[parseInt(settings[0])]);
	
	//Unit-Grafiken definieren
	{
		var img = new Image();
	    with(img) {
	      src = 'graphic/unit/unit_'+grafik[parseInt(settings[0])]+'.png';
	      alt = ''; };
		  
		var imgh = new Image();
	    with(imgh) {
	      src = 'graphic/holz.png';
	      alt = ''; };
		  
		var imgl = new Image();
	    with(imgl) {
	      src = 'graphic/lehm.png'
	      alt = ''; };
		  
		var imge = new Image();
	    with(imge) {
	      src = 'graphic/eisen.png'
	      alt = ''; };
		  
		var imgg = new Image();
	    with(imgg) {
	      src = 'graphic/res.png'
	      alt = ''; };

		var imgatt1 = new Image();
	    with(imgatt1) {
	      src = 'graphic/unit_big/'+grafik[settings[0]]+'.png';
	      alt = ''; };
		var imgatt2 = new Image();
	    with(imgatt2) {
	      src = 'graphic/unit_big/'+grafik[settings[0]]+'.png';
	      alt = ''; };
		var imgatt3 = new Image();
	    with(imgatt3) {
	      src = 'graphic/unit_big/'+grafik[settings[0]]+'.png';
	      alt = ''; };
		var imgatt4 = new Image();
		with(imgatt4) {
	      src = 'graphic/unit/unit_'+grafik[settings[0]]+'.png';
	      alt = ''; };
		
		var imgspy = new Image();
	    with(imgspy) {
	      if (parseInt(settings[1]) == 0) {src = 'graphic/unit_big/spy_grey.png';} else {src = 'graphic/unit_big/spy.png';}
	      alt = ''; };
	}
	
	var span = document.createElement('span');
    with(span) {
		appendChild(document.createElement('br'));
		//appendChild(document.createTextNode('Ankunft-Res.: '));
		appendChild(imgh);
		appendChild(document.createTextNode(res[0]));
		appendChild(document.createTextNode(' '));
		appendChild(imgl);
		appendChild(document.createTextNode(res[1]));
		appendChild(document.createTextNode(' '));
		appendChild(imge);
		appendChild(document.createTextNode(res[2]));
		appendChild(document.createTextNode(' || '));
		appendChild(imgg);
		appendChild(document.createTextNode(res[3]));
		appendChild(document.createElement('br'));
		appendChild(document.createElement('br'));
		appendChild(document.createTextNode('Gesamtrohstoffe bei Ankunft:  '));
		appendChild(document.createTextNode((res[0]+res[1]+res[2])));
		appendChild(document.createElement('br'));
		appendChild(document.createElement('br'));
		appendChild(document.createTextNode('Mindestens ' + walks + ' '));
		appendChild(img);
		appendChild(document.createTextNode(' werden ben'+unescape('%F6')+'tigt.'));
		appendChild(document.createElement('br'));
    }

	//Erste Listbox
	{
	    var select = document.createElement('select');
	    select.setAttribute('size',1);

	    select.setAttribute('style','vertical-align:middle; ');
	    select.addEventListener('change',function() {
			edit_setting(0,select.options[select.selectedIndex].value);
			show_ausBerichteFarmen(old,report,selfvillage,target);
		},false);
	    
		for(var i=0;i<einheit.length;i++) {
	      var option = document.createElement('option');
	      option.setAttribute('value',i);
	      if(i == parseInt(settings[0]))
	        option.setAttribute('selected','selected');

	      option.appendChild(document.createTextNode(einheit[i]));        

	      select.appendChild(option);
	    }
	}
	//Zweite Listbox
    {
		var select2 = document.createElement('select');
	    select2.setAttribute('size',1);
	    select2.setAttribute('style','vertical-align:middle; ');
	    select2.addEventListener('change',function() {
			edit_setting(1,select2.options[select2.selectedIndex].value);
			show_ausBerichteFarmen(old,report,selfvillage,target);
		},false);

		for(var i=0;i<=5;i++){
			var option = document.createElement('option');
			option.setAttribute('value',i);
			if(i == parseInt(settings[1]))
				option.setAttribute('selected','selected');

	        option.appendChild(document.createTextNode(i+" Spaeher"));

			select2.appendChild(option);
	    }
	}

	//Dritte Listbox
	{
	    var select3 = document.createElement('select');
	    select3.setAttribute('size',1);
	    select3.setAttribute('style','vertical-align:middle; ');
	    select3.addEventListener('change',function() {
			edit_setting(2,""+select3.options[select3.selectedIndex].value);
			show_ausBerichteFarmen(old,report,selfvillage,target);
			},false);

	    for(var attr3 in dorf){
			var option = document.createElement('option');
			option.setAttribute('value',attr3);
			if(attr3 == settings[2])
				option.setAttribute('selected','selected');

	        option.appendChild(document.createTextNode(dorf[attr3][0]));

			select3.appendChild(option);
	    }
	}
	
	var tt = (url.match('&t=')) ? '&t=' + url.split("&t=")[1].split("&")[0] : '';
	
	var a = document.createElement('a');
	a.setAttribute('href','game.php?village='+village+tt+'&screen=place&mode=command&target='+target+'&FM='+walks+','+grafik[parseInt(settings[0])]);
	a.appendChild(imgatt1);
	a.appendChild(imgatt2);
	a.appendChild(imgatt3);
    a.appendChild(imgspy);
	
	var a2 = document.createElement('a');
    a2.setAttribute('href','game.php?village='+village+tt+'&screen=place&mode=command&target='+target+'&FM='+walks+','+grafik[settings[0]]);
	a2.setAttribute('id','a2');
	a2.appendChild(document.createTextNode('Es werden mindestens ' + walks + ' '));
    a2.appendChild(imgatt4);
    a2.appendChild(document.createTextNode(' zum Leerfarmen ben'+unescape('%F6')+'tigt.'));

    var close = new Image();
    with(close) {
      src = 'http://www.c1b1.de/close.png';
      alt = 'Close';
      title = 'Close';
      addEventListener('click',function() {document.getElementById('farm_script_table').parentNode.removeChild(document.getElementById('farm_script_table')); },false);
    }

    var ta = document.createElement('table');
    ta.setAttribute('id','farm_script_table');
    ta.setAttribute('style','border: 1px solid #DED3B9');
    ta.setAttribute('width','100%');

    var th = document.createElement('th');
    th.setAttribute('style','white-space:nowrap; vertical-align:middle; ');
    th.appendChild(document.createTextNode('Farmen:'));
    th.appendChild(close);

    var td = document.createElement('td');
	td.setAttribute('style', 'white-space:nowrap; text-align:center; ');
    td.setAttribute('colspan',3);
	td.appendChild(select);td.appendChild(select2);td.appendChild(select3);
	td.appendChild(document.createElement('br'));
    td.appendChild(span);
    
    td.appendChild(document.createElement('br'));
    td.appendChild(a);
    td.appendChild(document.createElement('br'));


    var tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(td);
    ta.appendChild(tr);
	
	var tshort = document.createElement('table');
    tshort.setAttribute('style','border: 1px solid #DED3B9');
	tshort.setAttribute('id','farm_script_shortcut');
    tshort.setAttribute('width','100%');
	var tsdata = document.createElement('td');
	tsdata.setAttribute('style', 'white-space:nowrap; text-align:center; ');
    tsdata.setAttribute('colspan',4);
	tsdata.appendChild(a2);
	var tsrow = document.createElement('tr');
	tsrow.appendChild(tsdata);
	tshort.appendChild(tsrow);
	
	if(table){
		if(document.getElementById('farm_script_shortcut')){
			document.getElementById('farm_script_shortcut').parentNode.replaceChild(tshort,document.getElementById('farm_script_shortcut'));
	    }
	    else{
			document.getElementsByTagName('h3')[0].parentNode.insertBefore(tshort,document.getElementsByTagName('h3')[0]);
		}
	}
	if (table){
		if(document.getElementById('farm_script_table')){
			document.getElementById('farm_script_table').parentNode.replaceChild(ta,document.getElementById('farm_script_table'));
		}
		else{
			table.parentNode.insertBefore(ta,table.nextSibling);
			table.parentNode.insertBefore(document.createElement('br'),table.nextSibling);
		}
	}
}

function savesettings() {
	settings[0] = einheitbox.options[einheitbox.selectedIndex].value;
	settings[1] = spybox.options[spybox.selectedIndex].value;
	settings[2] = attDorf.options[attDorf.selectedIndex].value;
	settings[3] = Number(ktruppenanzeigen.checked);
	settings[4] = Number(krohstoffeanzeigen.checked);
	settings[12] = Number(kgebanzeigen.checked);
	settings[13] = Number(khinweis_alt.checked);
	settings[14] = Number(kberichtedurchschalten.checked);
	settings[20] = Number(kdorfdurchschalten.checked);
	settings[16] = Number(kwarn.checked);
	settings[17] = Number(kletztes_dorf.checked);
	settings[18] = abf;
	settings[19] = edi;
	shortcutlist[0] = shortcut_report_left.value;
	shortcutlist[1] = shortcut_report_right.value;
	shortcutlist[10] = shortcut_village_left.value;
	shortcutlist[11] = shortcut_village_right.value;
	shortcutlist[2] = shortcut_none.value;
	shortcutlist[3] = shortcut_first.value;
	shortcutlist[4] = shortcut_second.value;
	shortcutlist[5] = shortcut_third.value;
	shortcutlist[6] = shortcut_fourth.value;
	shortcutlist[7] = instaste_text.value;
	shortcutlist[8] = atttaste_text.value;
	shortcutlist[9] = supptaste_text.value;
	
	for(i=0; i<6; i++) {
		settings[i+6] = Number(document.getElementsByName('showunits_'+i)[0].checked);
	}
	localStorage.setItem("FM_"+server+"_settings",""+settings);
	localStorage.setItem("FM_"+server+"_shortcuts",""+shortcutlist);
	
}

function presskey(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);
	switch (thechar){			
		case instaste:
			try{
				location.href = "javascript:selectAllUnits(true)";
				location.href = document.getElementById('link_lastvillage').href;
			}catch(e){}
			break;
		case atttaste:
			try{
				document.getElementsByName("attack")[0].click();
			}catch(e){}
			try{
				document.getElementsByName("submit")[0].click();
			}catch(e){}
			try{
				location.href = document.getElementById('a2').href;
			}catch(e){}
			break;
		case supptaste:
			try{
				document.getElementsByName("support")[0].click();
			}catch(e){}
			break;
	}
};

function alarm() {
	if (edi == 1) {
		document.getElementById("edi").parentNode.parentNode.style.background = "#FFCC99";
		edi = 0;
	}
	else {
		document.getElementById("edi").parentNode.parentNode.style.background = "#CCFF99";
		edi = 1;
	}
}

function alarm2() {
	if (abf == 1) {
		document.getElementById("abf").parentNode.parentNode.style.background = "#FFCC99";
		abf = 0;
	}
	else {
		document.getElementById("abf").parentNode.parentNode.style.background = "#CCFF99";
		abf = 1;
	}
}
		
function extended() {
	if (extended_activated == 0) {
		extended_activated = 1;
		for (i=0;i<15;i++) {
			try {getElementsByClassName("edi")[i].style.display = "none";} catch(e){};
			try {getElementsByClassName("abf")[i].style.display = "none";} catch(e){};
			try {getElementsByClassName("ext")[i].style.display = "";} catch(e){};
		}	
	}
	else {
		extended_activated = 0;
		for (i=0;i<15;i++) {
			try {getElementsByClassName("edi")[i].style.display = "";} catch(e){};
			try {getElementsByClassName("abf")[i].style.display = "";} catch(e){};
			try {getElementsByClassName("ext")[i].style.display = "none";} catch(e){};
		}	
	}
}
		
function Taste_druecken (druecken){
	if(!druecken)
		druecken = window.event;
	if(druecken.which){
		Hexadezimalcode = druecken.which;
	}
	else if(druecken.keyCode){
		Hexadezimalcode = druecken.keyCode;
	}
	this.value=Hexadezimalcode;
}

function Taste_druecken1 (druecken){
	if(!druecken)
		druecken = window.event;
	if(druecken.which){
		Hexadezimalcode = druecken.which;
	}
	else if(druecken.keyCode){
		Hexadezimalcode = druecken.keyCode;
	}
	var zwischenspeicher = document.createElement("td");
	zwischenspeicher.innerHTML = "&#"+Hexadezimalcode;
	this.value=zwischenspeicher.innerHTML;
}

//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
//F�lltext
