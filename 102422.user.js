scr_meta=<><![CDATA[
// ==UserScript==
// @name O2 AutoFiller
// @namespace Zort
// @description Füllt die Daten für O2 Freikarten automatisch mit Fakedaten aus
// @version	1.0.3
// @include http://*o2-freikarte.de*
// ==/UserScript==
]]></>.toString();

/*
---------------------------------------------------------
------------------/UPDATE\-------------------------------
---------------------------------------------------------
*/

var AnotherAutoUpdater = {
 id: '102422', // Script id on Userscripts.org
 days: 0, // Days to wait between update checks
 
 
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
 
 
/*
---------------------------------------------------------
-------------------/Funktionen\--------------------------
---------------------------------------------------------
*/


// [Funktion] überflüssige Leerzeichen aus String entfernen
String.prototype.trim = function () {
    return this.replace(/^\s+/g, '').replace(/\s+$/g, '');
}

// [Funktion] Zeichen zählen
String.prototype.char_count = function(a) {
	return this.split(a).length-1;
};

// [Funktion] Zahl generieren
function randomString(chars, length) {
	var chars = chars;
	var string_length = length;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}


// [Funktion] Geschlecht bestimmen
function genus(name, start) {
var url_name = 'http://www.rund-ums-baby.de/vornamensuche/' + name + '.htm#start';

GM_xmlhttpRequest({
  method: 'GET',
  url: url_name,
  onload: function(response) {
 var content = response.responseText;
 var kennzeichen = content.split('<td width="420" valign="top">')[1].split('<')[0];

 // Zeit stoppen und Differenz zum Start ausrechnen
 var ende = new Date();
 var diff = '<label class="s_agbText "> geladen in ' + ((ende.getTime() - start.getTime()) / 1000).toString() + 's</label>';
 
 if(kennzeichen == 'm&auml;nnlich') {
 // m
     document.getElementById('sSalutationMr').checked = true;
	 document.getElementById('sSalutationMrs').checked = false;
 } else if(kennzeichen == 'weiblich') {
 // f
     document.getElementById('sSalutationMrs').checked = true;
	 document.getElementById('sSalutationMr').checked = false;
 }
 document.getElementById('diff').innerHTML = diff;
 }})
}

// [Funktion] Daten holen und ins Formular eintragen
function autofiller() {

var start = new Date();	// Zeit mitstoppen

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fake-it.biz/?data=de',
  onload: function(response) {
 var content = response.responseText;
 
 
// [Funktion] Daten aus 'fake-it.biz' lesen
 function daten_lesen() {
 var fake_person = new Object();

 var table = content.split('<table')[2];
 var table_2 = content.split('<table')[3];
 
 var name = table.split('<td>')[1].split('</td>')[0].trim();
 fake_person['vorname'] = name.split(' ')[0];
 fake_person['nachname'] = name.split(' ')[1];
 fake_person['strasse'] = table.split('<td>')[3].split('</td>')[0].trim();
 var adresse_2 = table.split('<td>')[5].split('</td>')[0].trim();
 fake_person['plz'] = adresse_2.split(' ')[0];
 fake_person['stadt'] = adresse_2.substr(fake_person['plz'].length+1).split('(')[0];
 fake_person['stadt'] = fake_person['stadt'].substr(0,fake_person['stadt'].length-1);
 var telefon = table.split('<td>')[7].split('</td>')[0].trim();
 fake_person['vorwahl'] = telefon.split('/')[0];
 fake_person['telenummer'] = telefon.split('/')[1];
 var bday = table_2.split('<td>')[1].split('</td>')[0].trim();
 fake_person['tag'] = bday.split('/')[0];
 fake_person['monat'] = bday.split('/')[1];
 fake_person['jahr'] = bday.split('/')[2];
 fake_person['email'] = table_2.split('<td>')[3].split('</td>')[0].trim().split('@')[0] + '@mailinator.com';
 
  return fake_person
  }
 
 
 
 //---Formular ausfüllen---

 // E-Mail
 function tab(email) {
 if(document.getElementById("auto").checked == true) {
  window.open(email);
 }}
 if(document.getElementsByTagName('li')[11].innerHTML.split('>')[1].split(' ')[0] == 'E-Mail') {
  var li = 11;
 } else {
  var li = 9;
 }
 var email = 'http://' + daten_lesen()['email'].split('@')[0] + '.mailinator.com';
 var li_li = '<label for="sEmail">E-Mail Adresse <span>*</span></label><input tabindex="14" type="text" name="sEmail" id="sEmail"  class="c_field c_norm" maxlength="64" value="' + daten_lesen()['email'] + '" /><br><label for="sEmail">E-Mail Direktlink </label><input tabindex="14" type="text" name="sEmaild" id="sEmaild" class="c_field c_norm" maxlength="64" value="' + email + '" />';
 document.getElementsByTagName('li')[li].innerHTML = li_li;
 tab(email);
 
 genus(daten_lesen()['vorname'], start);
 document.getElementById('sSimCardAmount').selectedIndex = Math.floor(Math.random() * 3);
 document.getElementById('sFirstname').value = daten_lesen()['vorname'];
 document.getElementById('sLastname').value = daten_lesen()['nachname'];
 document.getElementById('sStreet').value = daten_lesen()['strasse'].substr(0,(daten_lesen()['strasse'].length) - (daten_lesen()['strasse'].split(' ')[(daten_lesen()['strasse'].char_count(' '))].length));
 document.getElementById('sHouseNr').value = Math.floor(Math.random() * 20) + 1;
 document.getElementById('sZip').value = daten_lesen()['plz'];
 document.getElementById('sCity').value = daten_lesen()['stadt']; 
 document.getElementById('sPrefix').value = daten_lesen()['vorwahl'];
 document.getElementById('sNumber').value = daten_lesen()['telenummer'];
 document.getElementById('sDay').value = daten_lesen()['tag'];
 document.getElementById('sMonth').value = daten_lesen()['monat'];
 document.getElementById('sYear').value = daten_lesen()['jahr'];
 document.getElementById('sPkk').value = randomString('123456789', 4)
 document.getElementById('bConfirmAgb').checked = true;		// AGB's akzeptieren
 document.getElementById('sCaptchaCode').focus();		// Cursor ins Captcha-Input

  }
});
}


// [Funktion] Mailinator automatisch öffnen
function change() {
if (document.getElementById("auto").checked == true)
{
 alert('Mailinator automatisch öffnen aktiviert');
 GM_setValue('auto', '1');
} else {
 alert('Mailinator automatisch öffnen deaktiviert');
 GM_setValue('auto', '0');
}
}


/*
---------------------------------------------------------
------------------/Funktionen Ende\----------------------
---------------------------------------------------------
*/


var auto = GM_getValue('auto');
var auto_mailinator_1 = '<center style="color: #9299A1;font-size: 11px;margin: 3px 0 0;"><input type="checkbox" onClick="change()" id="auto" value="1"';
var auto_mailinator_2 = '> Mailinator automatisch öffnen <span style="cursor: pointer;"><img src="http://www.visuellesynonyme.com/images/save_icon.gif" id="speichern"></span></center>';
if(auto == '1') {
 document.getElementsByTagName('li')[15].innerHTML = auto_mailinator_1 + ' checked' + auto_mailinator_2;
} else {
 document.getElementsByTagName('li')[15].innerHTML = auto_mailinator_1 + auto_mailinator_2;
}

var li_3 = '<label for="sSalutationMr" class="s_salutationText">Anrede <span>*</span></label><div class="sSalutationBoxInput"><label for="sSalutationMr" class="s_salutationTextInput s_mr"><input type="radio" name="sSalutation" id="sSalutationMr" value="Herr" checked="checked" class="s_salutationInput" />Herr</label></div><div class="sSalutationBoxInput"><label for="sSalutationMrs" class="s_salutationTextInput s_mrs"><input type="radio" name="sSalutation" id="sSalutationMrs" value="Frau" class="s_salutationInput" />Frau</label></div><span id="diff"></span><div class="e_clearer"><!-- --></div>';
var c_orderBottom = '<div class="c_buttonWhite_back"><span style="cursor: pointer;"><img src="http://img6.imagebanana.com/img/tibp8yvc/ausf1.png" onMouseOver="this.src=\'http://img7.imagebanana.com/img/ik3buhz2/ausf2.png\'" onMouseOut="this.src=\'http://img6.imagebanana.com/img/tibp8yvc/ausf1.png\'" id="fakeSend"></span></div><div class="c_orderButton c_buttonBottom"><input tabindex="23" type="submit" name="bSend" value="" /></div>';
document.getElementsByTagName('li')[3].innerHTML = li_3;
document.getElementById('c_orderBottom').innerHTML = c_orderBottom;
document.getElementById('fakeSend').addEventListener("click", autofiller, false);
document.getElementById('speichern').addEventListener("click", change, false);

