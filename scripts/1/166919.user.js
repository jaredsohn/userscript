// ==UserScript==
// @name			HT Skillpunkte
// @description		Funktion überarbeitet, anzeigen erweitert. Script zum schnellen verteilen der HT-Skillpunkte
// @namespace       http://userscripts.org/scripts/show/130577
// @author			- Pennereck.de - 
// @include			http://*pennergame.de/pet*
// @version         1.4
// ==/UserScript==


// ***********************************************************************************************
var version = "4"; // Updatecheck veriossangaben für prüfung
var updatestatus = "Prüfung nicht erfolgt";
var author = "http://www.pennereck.de";
// ***********************************************************************************************
// Überprüfe ob Update verfügbar
// ***********************************************************************************************
	
	var SUC_script_num = 166919; // userscript ID
var scriptende = ".user.js";
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000  <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('"'+script_name+'"Update verfügbar. \n\nFunktion überarbeitet, anzeigen erweitert.'))
								{
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+''+scriptende);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

// Function für Get Vaiablen
(function(){

    var s = window.location.search.substring(1).split('&');

    if(!s.length) return;

    window.$_GET = {};

    for(var i  = 0; i < s.length; i++) {

        var parts = s[i].split('=');

        window.$_GET[unescape(parts[0])] = unescape(parts[1]);

    }

}())


var skill = $_GET['skill'];
var menge = $_GET['menge'];
var check = $_GET['check'];
var check_happi = $_GET['check_happi'];
var leckerlie_dauer_get=$_GET['leckerlie_dauer_get'];

var leckerlie_name_get=$_GET['leckerlie_name_get'];
var ht_id = $_GET['ht_id'];




// Tempöräre Leckerlies 
//Köln--> Sylt //
if (leckerlie_name_get == 110433886) {
	  var leckerlie_name = "Zäher Kauknochen";
	  var boost = 5;
var time = 24;
}
else if (leckerlie_name_get == 110344577 || leckerlie_name_get == 15711018) {
	  var leckerlie_name = "Kleiner Kauknochen";
	  var boost = 5;
	  var time = 12;
} 
else if (leckerlie_name_get == 110799378 || leckerlie_name_get == 48020110) {

var leckerlie_name = "Mittlerer Kauknochen";
	  var boost = 10;
	  var time = 12;
}
else if (leckerlie_name_get == 118971338 || leckerlie_name_get == 45102026) {
	  var leckerlie_name = "Großer Kauknochen";
	  var boost = 20;
	  var time = 12;
}
else if (leckerlie_name_get == 121774594 || leckerlie_name_get == 53424853) {
	  var leckerlie_name = "Riesiger Kauknochen";
	  var boost = 100;
	  var time = 3;
}
else if (leckerlie_name_get == 121861025 || leckerlie_name_get == 48038504) {
	  var leckerlie_name = "Kleiner Knack-Snack";
	  var boost = 25;
	  var time = 8;
}
else if (leckerlie_name_get == 121766600 || leckerlie_name_get == 47663528) {
	  var leckerlie_name = "Knack-Snack";
	  var boost = 30;
	  var time = 8;
}
else if (leckerlie_name_get == 121772026) {
	  var leckerlie_name = "Zerkautes Frisbee";
	  var boost = 100;
	  var time = 4;
}
else if (leckerlie_name_get == 121864395) {
	  var leckerlie_name = "Gummizeitung";
	  var boost = 110;
	  var time = 4;
}
else if (leckerlie_name_get == 126726817) {
	  var leckerlie_name = "Quietscheentchen";
	  var boost = 110;
	  var time = 5;
}


// Dauerafte Leckerlies
if (leckerlie_dauer_get == 109066483|| leckerlie_dauer_get == 13070136 ) {
	  var leckerlie_name = "Futternapf Bronze";
	  var leckerlie_info = "Lebenspunkte zurück";
}

else if (leckerlie_dauer_get == 109742499 || leckerlie_dauer_get == 13041556) {
	  var leckerlie_name = "Futternapf Silber";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 118718826 || leckerlie_dauer_get == 13099605) {
	  var leckerlie_name = "Futternapf Gold";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 109395225 || leckerlie_dauer_get == 13042316) {
	  var leckerlie_name = "Kaputte Karte";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 117948182 || leckerlie_dauer_get == 48147681) {
	  var leckerlie_name = "Große Karte";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 118738728 || leckerlie_dauer_get == 46124349) {
	  var leckerlie_name = "Blaues Halsband";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 110215540 || leckerlie_dauer_get == 29177732) {
	  var leckerlie_name = "Gelbes Halsband";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 110352532 || leckerlie_dauer_get == 45571984) {
	  var leckerlie_name = "Rotes Halsband";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 117948730 || leckerlie_dauer_get == 17980778) {
	  var leckerlie_name = "Schwarzes Halsband";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121767719 || leckerlie_dauer_get == 46302234) {
	  var leckerlie_name = "Stachelhalsband";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121952200 || leckerlie_dauer_get == 45912635) {
	  var leckerlie_name = "Poncho";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121987454 || leckerlie_dauer_get == 46581024) {
	  var leckerlie_name = "Fez";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121766208 || leckerlie_dauer_get == 48454632) {
	  var leckerlie_name = "Laufrad";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121954508 || leckerlie_dauer_get == 45573594) {
	  var leckerlie_name = "Irrgarten";
	  var leckerlie_info = "Lebenspunkte zurück";
}
else if (leckerlie_dauer_get == 121951895 || leckerlie_dauer_get == 47811230) {
	  var leckerlie_name = "Futternapf Diamant";
	  var leckerlie_info = "Lebenspunkte zurück";
}


 
  
if (menge == undefined)
{
	menge = 0;
}

if (skill == undefined)
{
	skill = 0;	
}

function embedFunction(s) {
			    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
			  }
// Platzhalter Ladebereich
				function insertLink_platzhalter() {
	            var menu = document.getElementById('provocation_area');
                var newLink_platzhalter = document.createElement('div');
				newLink_platzhalter.style.textDecoration = 'none';
				newLink_platzhalter.style.height = '91px';
 				newLink_platzhalter.style.color = 'green';
				var span1_platzhalter = document.createElement('span');
				span1_platzhalter.className = 'btn-left';
				span1_platzhalter.appendChild(document.createTextNode('Script Skillpunkte verteilen wird geladen...'));
 
 
				newLink_platzhalter.appendChild(span1_platzhalter);
 
				var item = document.createElement('b');
				item.appendChild(newLink_platzhalter);
                menu.insertBefore(item, menu.firstChild);
        	    }



// ***********************************************************************************************
// Überprüfe die Stadt
// ***********************************************************************************************
// ***********************************************************************************************
// Berlin
// ***********************************************************************************************

if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennergame.de") != -1) {
	var link = 'http://berlin.pennergame.de/pet/';
	var stadt = 'Berlin';
// ***********************************************************************************************
// Koeln
// ***********************************************************************************************
} else if (location.toString().indexOf("koeln") != -1 || location.toString().indexOf("koeln.pennergame.de") != -1) {
	var link = 'http://koeln.pennergame.de/pet/';
	var stadt = 'Koeln';

// ***********************************************************************************************
// HHR
// ***********************************************************************************************
} else if (location.toString().indexOf("reloaded") != -1 || location.toString().indexOf("reloaded.pennergame.de") != -1) {
	var link = 'http://reloaded.pennergame.de/pet/';
	var stadt = 'reloaded';

// ***********************************************************************************************
// Muenchen
// ***********************************************************************************************
} else if (location.toString().indexOf("muenchen") != -1|| location.toString().indexOf("muenchen.pennergame.de") != -1) {
	var link = 'http://muenchen.pennergame.de/pet/';
	var stadt = 'Muenchen';

// ***********************************************************************************************
// Hamburg
// ***********************************************************************************************
} else if (location.toString().indexOf("www.pennergame.de") != -1 || location.toString().indexOf("hamburg.pennergame.de") != -1) {
	var link = 'http://www.pennergame.de/pet/';
	var stadt = 'Hamburg';

}
// ***********************************************************************************************
// sylt
// ***********************************************************************************************
 else if (location.toString().indexOf("sylt") != -1 || location.toString().indexOf("sylt.pennergame.de") != -1) {
	var link = 'http://www.sylt.pennergame.de/pet/';
	var stadt = 'sylt';

}
insertLink_platzhalter(); // Platzhalter starten (anzeige wird geladen)

// ***********************************************************************************************
// HT ID ermitteln
// ***********************************************************************************************
	if (leckerlie_name_get > 1)
{

  	function leckerlie_einloesen(){
var request = new XMLHttpRequest();
request.open('get', '/pet/plunder/'+leckerlie_name_get+'/use/'+ht_id+'/', true);
request.send(null);

  }
    leckerlie_einloesen()

}


if (leckerlie_dauer_get > 1)
{
   function leckerlie_einloesen(){

var request = new XMLHttpRequest();
request.open('get', '/pet/plunder/'+leckerlie_dauer_get+'/equip/'+ht_id+'/', true);
request.send(null);

   }
  leckerlie_einloesen()

}


  if (check_happi == 1)
{
function ende(){
	// hier werden die eingelösten Marken für die Statistik gezählt
	// Es wird nur die Anzahl gewertet, andere Daten werden nicht übertragen
	// Dient nur als übersicht für den Autor ob das Script genutzt wird da derzeit leider über Userscripts.org keine Stats ermittelt werden.
	// Der Requestbereich kann auch auskommentiert werden !!
var request = new XMLHttpRequest();
request.open('get', ''+author+'/count_ht_skills.php?count=1', true);	
request.send(null);


alert ('Leckerlie '+leckerlie_name+' wird für Haustier '+ht_id+' gesetzt.');

}
ende();
window.location.href = link;
}

  
  


	GM_xmlhttpRequest({
	method: 'GET',
	url: link,
	onload: function(ht_id) {
	var content = ht_id.responseText; //  ID wird ermittelt
	var ht_id_on = content.split('upgrade(\'/')[1];// ID wird ermittelt
	var ht_id_off = (ht_id_on != undefined) ? ht_id_on.split('/')[0].trim() : '';// ID wird ermittelt
	var ht_name_on = content.split('<div class="petname rarepet">')[1];// ID wird ermittelt
	var ht_name_off = (ht_name_on != undefined) ? ht_name_on.split('<div')[0].trim() : '';// ID wird ermittelt
	
	
function ht_skillpunkte()
{
var ht_skillpunktediv = document.createElement("div");
var inhalt = document.createTextNode('Skillpunkte setzen aktiv!');
  	ht_skillpunktediv.style.color = "#FFF";
	ht_skillpunktediv.style.backgroundColor = "red";
	ht_skillpunktediv.style.paddingTop = "90px";
	ht_skillpunktediv.style.marginLeft = "50px";

	ht_skillpunktediv.style.width = "140px";
	ht_skillpunktediv.style.height = "12px";


	ht_skillpunktediv .appendChild(inhalt );
var position = document.getElementById('pet'+ht_id_off+'');
	position .appendChild(ht_skillpunktediv);

}



// ***********************************************************************************************
// update ermitteln
// ***********************************************************************************************
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennereck.de/update.php',
	onload: function(update) {
	var content = update.responseText;
	var updateon = content.split('<div id="script_skillpunkte">')[1];
	var updateoff = (updateon != undefined) ? updateon.split('<')[0].trim() : '';

if (updateoff > version)
{
	var updatestatus = "<small style=\"color:red;\">Sciptupdate Skillpunkte verfügbar! <a href=\"http://userscripts.org/scripts/source/166919.user.js\" target=\"_new\" title=\"Scipt installieren\"> Update installieren</a></small>";
}
else
{
	var updatestatus = "<small style=\"color:green;\">Version aktuell!</small>";
}
// Funktion für den Streunlog Link
function streunlog()
{
var streunlogdiv = document.createElement("a");
var inhalt = document.createTextNode('Streunlog anzeigen');
	streunlogdiv.href = "javascript:ajax_stuff.loadajaxpage(\'/pet/tab/roamlog/1/\')";  
  	streunlogdiv.style.color = "#FFF";
	streunlogdiv.style.paddingTop = "5px";
	streunlogdiv .appendChild(inhalt );
var position = document.getElementById("pet_kader");
	position .appendChild(streunlogdiv);

}


// Die 3 aktiven Haustiere werden ermittelt
	GM_xmlhttpRequest({
	method: 'GET',
	url: link,
	onload: function(ht_id_all) {
	var content = ht_id.responseText; //  ID wird ermittelt
	var ht_id_all_on1 = content.split('id="pet')[2];// ID wird ermittelt HT 1
	var ht_id_all_off1 = !!ht_id_all_on1 ? ht_id_all_on1.split('"')[0].trim() : '';// ID wird ermittelt HT 1
	var ht_id_all_on2 = content.split('id="pet')[4];// ID wird ermittelt HT 2
	var ht_id_all_off2 = !!ht_id_all_on2 ? ht_id_all_on2.split('"')[0].trim() : '';// ID wird ermittelt HT 2
	var ht_id_all_on3 = content.split('id="pet')[6];// ID wird ermittelt HT 3
	var ht_id_all_off3 = !!ht_id_all_on3 ? ht_id_all_on3.split('"')[0].trim() : '';// ID wird ermittelt HT 3
	
// Die 3 aktiven Haustiere werden ermittelt
	GM_xmlhttpRequest({
	method: 'GET',
	url: link,
	onload: function(ht_name_all) {
	var content = ht_id.responseText; //  Name wird ermittelt
	var ht_name_all_on1 = content.split(/class="petname ">|rarepet1">|rarepet2">/)[1];
	var ht_name_all_off1 = !!ht_name_all_on1 ? ht_name_all_on1.split('<')[0].trim() : '';
	var ht_name_all_on2 = content.split(/class="petname ">|rarepet1">|rarepet2">/)[2];// Name wird ermittelt HT 2
	var ht_name_all_off2 = !!ht_name_all_on2 ? ht_name_all_on2.split('<')[0].trim() : '';// Name wird ermittelt HT 2
	var ht_name_all_on3 = content.split(/class="petname ">|rarepet1">|rarepet2">/)[3];// Name wird ermittelt HT 3
	var ht_name_all_off3 = !!ht_name_all_on3 ? ht_name_all_on3.split('<')[0].trim() : '';// Name wird ermittelt HT 3
	
	var skills_setzen = '0';
	var schleifenzaehler = '0';
	var count = '200';
	var Laufbalken ='100';
	var color = '10';
	var width_laden = '170';
		if (menge == 0) {count = 5000000 }

		window.setInterval (function login(){
							  
	if (skills_setzen < menge)
		 {	  			  
skills_setzen++
			 
			 }// ende zählschleife 

	if (menge > 0 ){	
			  var request = new XMLHttpRequest();
			  request.open('get', 'upgrade/'+ht_id_off+'/'+skill+'/', true);
			  request.send(null);
			  schleifenzaehler++
			  color++
			  width_laden++



			  var code2 = '<hr width="500">Die Haustier Skillpunkte werden vergeben. <br>Bitte warte bis alle Punkte gesetzt wurden, <br>die Seite läd dann neu.<br><br><div style="width:'+width_laden+'px " align="right"><b style="background-color:#F'+color+';">Bereits '+skills_setzen+' Punkte gesetzt.</b></div><br>Es werden '+menge+' Skillpunkte auf '+skill+' gesetzt. Tier ID: '+ht_id_off+'<br><hr width="200">';
			  document.getElementById("provocation_area").innerHTML = code2;
		  }
			  if (menge == skills_setzen){
				  window.location.href = link;
				  return confirm('Alle Punkte gesetzt');
				  }		 

		}	, count);





// ***********************************************************************************************
// Eigentliche Ausgabe
// ***********************************************************************************************
if (stadt == "Koeln" && menge == 0){
var code2 = '<form action="#" ><hr width="500">Leckerlie vergeben<hr width="500"><select name="leckerlie_name_get" ><option selected value="0">Temporäre Leckerlie´s</option><option value="110433886">Zäher Kauknochen (24h,5%)</option><option value="110344577">Kleiner Kauknochen (12h,5%)</option><option value="110799378">Mittlerer Kauknochen (12h,10%)</option><option value="118971338">Großer Kauknochen (12h,20%)</option><option value="121774594">Riesiger Kauknochen (3h,100%)</option><option value="121861025">Kleiner Knack-Snack (8h,25%)</option><option value="121766600">Knack-Snack (8h,30%)</option><option value="121772026">Zerkautes Frisbee (4h,100%)</option><option value="121864395">Gummizeitung (4h,110%)</option><option value="126726817">Quietscheentchen (5h,110%)</option></select><select name="leckerlie_dauer_get" ><option selected value="0">Dauerhafte Leckerlie´s</option><option value="109066483">Futternapf Bronze</option><option value="109742499">Futternapf Silber</option><option value="118718826">Futternapf Gold</option><option value="109395225">Kaputte Karte</option><option value="117948182">Große Karte</option><option value="118738728">Blaues Halsband</option><option value="110215540">Gelbes Halsband</option><option value="110352532">Rotes Halsband</option><option value="117948730">Schwarzes Halsband</option><option value="121767719">Stachelhalsband</option><option value="121952200">Poncho</option><option value="121987454">Fez</option><option value="121766208">Laufrad</option><option value="121954508">Irrgarten</option><option value="121951895">Futternapf Diamant</option></select><a class="tooltip" href="#">[?]<span><b>Leckerlie auswählen</b><br>Es wird nicht überprüft, ob die Leckerlies auch verfügbar sind. Ist das gewählte Leckerlie nicht verfügbar, passiert auch nix;) <br><br>Sollten noch Leckerlie in der Liste fehlen, kannst Du diese gern im Forum melden.</span></a> <select name="ht_id" ><option selected>Haustier auswählen</option><option value="'+ht_id_all_off1+'">'+ht_name_all_off1+'</option><option value="'+ht_id_all_off2+'">'+ht_name_all_off2+'</option><option value="'+ht_id_all_off3+'">'+ht_name_all_off3+'</option></select><a class="tooltip" href="#">[?]<span><b>Haustier auswählen</b><br>Wähle ein Haustier aus, welches das Leckerlie bekommen soll. Es werden nur die 3 aktiven Haustiere angezeigt.</span> </a><input id="ht_leckerlie_verteilen" type="submit" value="Happi Happi" title="xxx" /><input id="check_happi" type="hidden" size="2" name="check_happi" value="1" title="" /> Count: '+skills_setzen+'</form>';
}

else if (stadt == "sylt" && menge == 0){
var code2 = '<form action="#" ><hr width="500">Leckerlie vergeben<hr width="500"><select name="leckerlie_name_get" ><option selected value="0">Temporäre Leckerlie´s</option><option value="xxx">Zäher Kauknochen (24h,5%)</option><option value="15711018">Kleiner Kauknochen (12h,5%)</option><option value="48020110">Mittlerer Kauknochen (12h,10%)</option><option value="45102026">Großer Kauknochen (12h,20%)</option><option value="53424853">Riesiger Kauknochen (3h,100%)</option><option value="48038504">Kleiner Knack-Snack (8h,25%)</option><option value="47663528">Knack-Snack (8h,30%)</option><option value="xxx">Zerkautes Frisbee (4h,100%)</option><option value="xxx" onclick="alert(document.Testform.derButton.name)">Gummizeitung (4h,110%)</option></select><select name="leckerlie_dauer_get" ><option selected value="0">Dauerhafte Leckerlie´s</option><option value="13070136">Futternapf Bronze</option><option value="13041556">Futternapf Silber</option><option value="13099605">Futternapf Gold</option><option value="13042316">Kaputte Karte</option><option value="48147681">Große Karte</option><option value="46124349">Blaues Halsband</option><option value="29177732">Gelbes Halsband</option><option value="45571984">Rotes Halsband</option><option value="17980778">Schwarzes Halsband</option><option value="46302234">Stachelhalsband</option><option value="45912635">Poncho</option><option value="46581024">Fez</option><option value="48454632">Laufrad</option><option value="45573594">Irrgarten</option><option value="47811230">Futternapf Diamant</option></select><a class="tooltip" href="#">[?]<span><b>Leckerlie auswählen</b><br>Es wird nicht überprüft, ob die Leckerlies auch verfügbar sind. Ist das gewählte Leckerlie nicht verfügbar, passiert auch nix;) <br><br>Sollten noch Leckerlie in der Liste fehlen, kannst Du diese gern im Forum melden.</span></a> <select name="ht_id" ><option selected>Haustier auswählen</option><option value="'+ht_id_all_off1+'">'+ht_name_all_off1+'</option><option value="'+ht_id_all_off2+'">'+ht_name_all_off2+'</option><option value="'+ht_id_all_off3+'">'+ht_name_all_off3+'</option></select><a class="tooltip" href="#">[?]<span><b>Haustier auswählen</b><br>Wähle ein Haustier aus, welches das Leckerlie bekommen soll. Es werden nur die 3 aktiven Haustiere angezeigt.</span> </a><input id="ht_leckerlie_verteilen" type="submit" value="Happi Happi" title="xxx" /><input id="check_happi" type="hidden" size="2" name="check_happi" value="1" title="" /></form>';
}


else {
	var code2 = '<hr width="500">Happi Happi ist in dieser Stadt nicht verfügbar <a class="tooltip" href="#"> [?]<span><b>Leckerlie vergeben</b><br>Mir fehlen leider für die meisten Städte noch die ID´s der Leckerlie´s. Ihr könnt mir gern helfen und diese im Pennereck Forum posten.</span></a><hr width="500">';
}


function ausgabe(){
if (menge == 0) {
var code = '<form action="#" ><hr width="500">Skillpunkte vergeben<hr width="500"><br><table width="500"><tr><th scope="col">Gewählte HT-ID <a class="tooltip" href="#">[?]<span><b>Haustier-ID</b><br>Das Script sucht nach dem ersten verfügbaren Haustier bei dem Skillpunkte vergeben werden können. Auf dieses Haustier wird dann auch die Funktion angewendet. <br><br><b>Das ausgewählte Haustier ist rot Markiert.</b></span></a></th><th scope="col">Skillpunkt-Art <a class="tooltip" href="#">[?]<span><b>Skillpunkte auswählen</b><br>Wähle aus wo Du die Skillpunkte setzen möchtest. Du kannst immer nur eins wählen.</span></a></th><th scope="col">Menge <a class="tooltip" href="#">[?]<span><b>Menge angeben</b><br>Gib an wie viele Skillpunkte Du verteilen möchtest.</span></a></th><th scope="col">Skillpunkte verteilen <a class="tooltip" href="#">[?]<span><b>Skillpunkte verteilen</b><br>Prüfe ob Du alle Felder ausgefüllt hast. Wenn Du den Button klickst werden die Einstellungen so durchgeführt.<br><br><b>Wenn mehr als 10 Punkte gesetzt werden, solltest Du nach dem Bestäigen ein paar Sekunden warten. Versuch macht Kluch ;)</span></a></th></tr><tr><td><br>HT-ID: '+ht_id_off+'</td><td ><p><input type=\"radio\" name=\"skill\" value=\"stamina\"> Ausdauer<br><input type=\"radio\" name=\"skill\" value=\"attack\"> Att<br><input type=\"radio\" name=\"skill\" value=\"tracing\"> Spürnase<br><input type=\"radio\" name=\"skill\" value=\"vigilance\"> Wachsamkeit<br></p></td><td><input id="menge" type="text" size="2" name="menge" value="0" title="xxx" /> <input id="check" type="hidden" size="2" name="check" value="1" title="" /></td><td><input id="ht_skills_verteilen" type="submit" value="Skillpunkte setzen" title="xxx" /><br></td></tr><tr><td>&nbsp;</td><td >&nbsp;</td><td>&nbsp;</td><td align="right"></td></tr></table></form>'+code2+'<br>'+updatestatus+'';
document.getElementById("provocation_area").innerHTML = code;
}
};
streunlog();
// Prüfen ob ein Haustier Punkte vergeben kann. Wenn nicht wird die Ausgabe beendet
if (ht_id_off < 1)
{
	var code = '<hr width="500">Es ist kein Haustier, mit setzbaren Skillpunkten vorhanden.<hr width="500">'+code2+'<br>'+updatestatus+'';
	document.getElementById("provocation_area").innerHTML = code;
exit;
}

ht_skillpunkte();
ausgabe();


	}});
	}});
	}});
	}});
