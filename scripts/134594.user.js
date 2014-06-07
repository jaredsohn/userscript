// ==UserScript==
// @name			jappy notes
// @namespace		Autor: goron
// @namespace		http://userscripts.org
// @description		Profilnotitzzettel fuer jappyprofile
// @version			1.34
// @include			*jappy.*/user/*
// @exclude         */gb/*
// @exclude			*/gallery/*
// ==/UserScript==

// userid auslesen
GM_xmlhttpRequest({
	method: 'GET',
	url: document.location.href,
		onload: function(response) {
			var content = response.responseText;
			try
			{
			var UserId = content.split('Emotions.load(')[1].split(',')[0]; // auslesen auf userseiten
			}
			catch(err)
			{
			var UserId = content.split('User.id = "')[1].split('"')[0];
			}

			//alert(UserId)
			
// angaben fuer Updatefunktion
var CurrentScriptVersion = '1.34';
var xmlurl = 'http://userscripts.org/scripts/show/68381';
var downloadurl = 'http://userscripts.org/scripts/source/68381.user.js';

// Updaterequest
GM_xmlhttpRequest({
   method: 'GET',
   url: xmlurl,
   onload: function(responseDetails) {
      var content = responseDetails.responseText;
		try{
		var neueversion = content.split('<h3>Version: ')[1].split('</h3>')[0];
		var info = content.split('<h2>info</h2>')[1].split('<h2>/info</h2>')[0];
		}
		catch(err){
		var neueversion = ""+CurrentScriptVersion+""
		var info = "";
		}

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// css erstellen
// Notes link
addGlobalStyle('#NotesOpen { cursor:help }')
// maindiv groesse und position
addGlobalStyle('#NotePad { position:fixed; height:397px; width:496px; top:50%; left:50%; margin:-200px 0 0 -250px; border:2px solid #3980be; zindex:10000; }')
// buttons
addGlobalStyle('#NotePadHead { width:492px; height:18px; background:#3980be; text-align:right; padding:6px 4px 7px 0px; }')
// notekopf
addGlobalStyle('#NotePadHead a#NoteKopf { text-align:left; color:#ffffff; }')
// content
addGlobalStyle('#NotePadContent1 { width:491px; height:361px; background:#ffffff; overflow:auto; text-align:left; padding-left:5px; padding-top:5px; }')
addGlobalStyle('#NotePadContent2 { width:100%; height:366px; background:#ffffff; text-align:center; }')
// url_bbcode_div
addGlobalStyle('#url_bbcode_div { position:fixed; width:400px; height:70px; top:50%; left:50%; margin:-35px 0 0 -200px; background:#000000; color:#ffffff; zindex:15000; }')
// update div
addGlobalStyle('#note_update_div { position:fixed; height:328px; width:400px; top:32%; left:50%; margin:0 0 0 -200px; background:#3980be; -moz-border-radius:15px; border:2px solid #000000; zindex:15000;  }')
addGlobalStyle('#update_div_top { height:40px; width:100%; }')
addGlobalStyle('#update_div_content { overflow:auto; width:100%; height:286px;; background:#ffffff; color:#000000; border-top:2px solid #000000; -moz-border-radius-bottomleft:15px; -moz-border-radius-bottomright:15px; }')
addGlobalStyle('#update_div_content .note_update_info { text-align:left; margin-left:15px; margin-bottom:15px; }')
addGlobalStyle('#update_div_content ul { display:block; border: 1px dotted #000000; text-align:left;  }')

var JN_Content = GM_getValue('JN_ContentIn' + UserId, 'Keine eintr&auml;ge vorhanden');
if (JN_Content == "") { var JN_Content = "Keine eintr&auml;ge vorhanden"; }

// note button und updateanzeige
if (CurrentScriptVersion != neueversion){
document.getElementById("prNavi").innerHTML += "<a id=\"NotesOpen\" class=\"inactive\" title=\"Zu den Profilnotitzen\" style=\"color:red;\">Notes</a>";
}else{
document.getElementById("prNavi").innerHTML += "<a id=\"NotesOpen\" class=\"inactive\" title=\"Zu den Profilnotitzen\">Notes</a>";
}

// bei klick auf Notes
document.getElementById('NotesOpen').addEventListener('click', function oeffnen () {

// ersetzen von bb-codes in html
// zeilenvorschub
JN_Content = JN_Content.replace(/\n/g,"<br>");
// bb-code B und /B
JN_Content = JN_Content.replace(/\[b\]/gi,"<b>");
JN_Content = JN_Content.replace(/\[\/b\]/gi,"</b>");
// bb-code U und /U
JN_Content = JN_Content.replace(/\[u\]/gi,"<u>");
JN_Content = JN_Content.replace(/\[\/u\]/gi,"</u>");
// bb-code I und /I
JN_Content = JN_Content.replace(/\[i\]/gi,"<i>");
JN_Content = JN_Content.replace(/\[\/i\]/gi,"</i>");

// div erzeugen
var jappyprofilnotes = document.createElement('div');
document.body.appendChild(jappyprofilnotes);

if (CurrentScriptVersion != neueversion){
// div fuellen
jappyprofilnotes.innerHTML = "<div id=\"NotePad\"><div id=\"NotePadHead\"><a class=\"inCo rb5\">ANZEIGE-MODUS</a> <a id=\"note_update\" style=\"color:red;\" title=\"UPDATE VERF&Uuml;GBAR\" class=\"inCo rb5\">Jappy Note "+CurrentScriptVersion+" (V: "+neueversion+" verf&uuml;gbar)</a> <a id=\"NoteEdit\" title=\"Eintr&auml;ge bearbeiten\" class=\"inCo rb5\">Editieren</a> <a id=\"NoteClose1\" class=\"inCo rb5\" title=\"Schliessen\">X</a></div><div id=\"NotePadContent1\">"+JN_Content+"</div></div>";
} else {
jappyprofilnotes.innerHTML = "<div id=\"NotePad\"><div id=\"NotePadHead\"><a class=\"inCo rb5\">ANZEIGE-MODUS</a> <a id=\"note_update\" title=\"Scriptinfos\" class=\"inCo rb5\">Jappy Note "+CurrentScriptVersion+"</a> <a id=\"NoteEdit\" title=\"Eintr&auml;ge bearbeiten\" class=\"inCo rb5\">Editieren</a> <a id=\"NoteClose1\" class=\"inCo rb5\" title=\"Schliessen\">X</a></div><div id=\"NotePadContent1\">"+JN_Content+"</div></div>";
}

document.getElementById("note_update") .addEventListener('click', function update () {
// div erzeugen
var notes_update_div = document.createElement('div');
document.body.appendChild(notes_update_div);

if (CurrentScriptVersion != neueversion){
notes_update_div.innerHTML = "<div id=\"note_update_div\"><div id=\"update_div_top\"><br/><a href=\""+downloadurl+"\" title=\"Update Installieren\" class=\"inCo rb5\">Installieren</a> <a href=\""+xmlurl+"\" target=\"_blank\" title=\"Zur Scripthomepage gehen\" class=\"inCo rb5\">Scripthomepage</a> <a id=\"NoteClose3\" class=\"inCo rb5\" title=\"Schliessen\">X</a></div><div id=\"update_div_content\"><br/><br/><p class=\"note_update_info\"><b><u>Infos / Changelog:</u></b><br/><br/>"+info+"<p></div>";
} else {
notes_update_div.innerHTML = "<div id=\"note_update_div\"><div id=\"update_div_top\"><br/><a href=\""+xmlurl+"\" target=\"_blank\" title=\"Zur Scripthomepage gehen\" class=\"inCo rb5\">Scripthomepage</a> <a id=\"NoteClose3\" class=\"inCo rb5\" title=\"Schliessen\">X</a></div><div id=\"update_div_content\"><br/><br/><p class=\"note_update_info\"><b><u>Infos / Changelog:</u></b><br/><br/>"+info+"<p></div>";
}

// klick auf x
document.getElementById("NoteClose3") .addEventListener('click', function NoteClose3 () {
notes_update_div.innerHTML = "";
},false);

},false);

// bei klick auf editieren
document.getElementById("NoteEdit") .addEventListener('click', function editieren () {

// ersetzen von html in bb-codes
// zeilenvorschub
JN_Content = JN_Content.replace(/<br>/g,"\n");
// bb-code B und /B
JN_Content = JN_Content.replace(/<b>/g,"[b]");
JN_Content = JN_Content.replace(/<\/b>/g,"[/b]");
// bb-code U und /U
JN_Content = JN_Content.replace(/<u>/g,"[u]");
JN_Content = JN_Content.replace(/<\/u>/g,"[/u]");
// bb-code I und /I
JN_Content = JN_Content.replace(/<i>/g,"[i]");
JN_Content = JN_Content.replace(/<\/i>/g,"[/i]");

var editor_b = "<a id=\"bbcode_bold\" class=\"inCo rb5\" style=\"cursor:pointer;\"><b>B</b></a>";
var editor_u = "<a id=\"bbcode_underline\" class=\"inCo rb5\" style=\"cursor:pointer;\"><u>U</u></a>";
var editor_i = "<a id=\"bbcode_italic\" class=\"inCo rb5\" style=\"cursor:pointer;\"><i>I</i></a>";
var editor_url = "<a id=\"bbcode_url\" class=\"inCo rb5\" style=\"cursor:pointer;\">URL</a>";

var BB_Code_Editor = ""+editor_b+" "+editor_u+" "+editor_i+" "+editor_url+"";

// editiercontainer oeffnen
document.getElementById("NotePad").innerHTML += "<div id=\"NotePad\"><form name=\"editor_form\"><div id=\"NotePadHead\"> <a class=\"inCo rb5\">EDITIER-MODUS</a> <a id=\"NoteSave\" class=\"inCo rb5\">Speichern</a> <a id=\"NoteClose2\" class=\"inCo rb5\" title=\"Schliessen\">X</a></div><div id=\"NotePadContent2\">Notizen hinzuf&uuml;gen:<br/><textarea id=\"text\" type=\"text\" name=\"JN_ContentIn\" cols=\"70\" rows=\"24\">"+JN_Content+"</textarea><br/>"+BB_Code_Editor+"</div></form></div>";

// bbcode (b)
document.getElementById("bbcode_bold") .addEventListener('click', function bbcode_bold () {
bbcode_b = prompt("Text eingeben der FETT geschrieben werden soll:", "Fetter Text")
document.getElementById('text').value += ('[b]'+bbcode_b+'[/b]')
},false);

// bbcode (u)
document.getElementById("bbcode_underline") .addEventListener('click', function bbcode_underline () {
bbcode_u = prompt("Text eingeben der UNTERSTRICHEN geschrieben werden soll:", "Unterstrichener Text")
document.getElementById('text').value += ('[u]'+bbcode_u+'[/u]')
},false);

// bbcode (i)
document.getElementById("bbcode_italic") .addEventListener('click', function bbcode_italic () {
bbcode_i = prompt("Text eingeben der KURSIV geschrieben werden soll:", "Kursiver Text")
document.getElementById('text').value += ('[i]'+bbcode_i+'[/i]')
},false);

// bbcode (url)
document.getElementById("bbcode_url") .addEventListener('click', function bbcode_url () {

// div erzeugen
var url_bbcode = document.createElement('div');
document.body.appendChild(url_bbcode);
// div fuellen
var url_eintragen = "<a title=\"Eintragen\" id=\"send_bbcode_url\" class=\"inCo rb5\" style=\"cursor:pointer;\">OK</a>";
var url_close = "<a title=\"Schliessen\" id=\"close_bbcode_url\" class=\"inCo rb5\" style=\"cursor:pointer;\">X</a>";
url_bbcode.innerHTML = "<div id=\"url_bbcode_div\"><p>Angaben f&uuml;r den Link:</p>Adresse: <input type=\"text\" value=\"http://\" size=\"43\" name=\"jn_bbcode_url_hrefIn\"><br/>Linkname: <input type=\"text\" size=\"15\" name=\"jn_bbcode_url_nameIn\"> Ziel: <select name=\"jn_bbcode_url_targetIn\"><option value=\"_blank\">Neue Seite</option><option value=\"_self\">Gleiche Seite</option></select> "+url_eintragen+" "+url_close+"</div>";

// klick auf ok ....
document.getElementById("send_bbcode_url") .addEventListener('click', function send_bbcode_url () {
// .... daten aus anzeige übernehmen ....
GM_setValue("jn_bbcode_url_hrefIn", document.getElementsByName('jn_bbcode_url_hrefIn')[0].value);
GM_setValue("jn_bbcode_url_targetIn", document.getElementsByName('jn_bbcode_url_targetIn')[0].value);
GM_setValue("jn_bbcode_url_nameIn", document.getElementsByName('jn_bbcode_url_nameIn')[0].value);
// .... in variable speichern .....
var jn_bbcode_url_href = GM_getValue('jn_bbcode_url_hrefIn');
var jn_bbcode_url_target = GM_getValue('jn_bbcode_url_targetIn');
var jn_bbcode_url_name = GM_getValue('jn_bbcode_url_nameIn');
// .... und umgewandelt an textarea schicken.....
document.getElementById('text').value += ('<a href=\"'+jn_bbcode_url_href+'\" target=\"'+jn_bbcode_url_target+'\">'+jn_bbcode_url_name+'</a>');
// ..... danach die anzeige schliessen.
url_bbcode.innerHTML = "";
},true);

// klick auf x
document.getElementById("close_bbcode_url") .addEventListener('click', function close_bbcode_url () {
url_bbcode.innerHTML = "";
},false);

},false);

// bei klick auf speichern (editier div)
document.getElementById("NoteSave") .addEventListener('click', function speichern () {

// noteeintrag speichern
GM_setValue("JN_ContentIn" + UserId, document.getElementsByName('JN_ContentIn')[0].value);

// seite neu laden
window.location.reload();
},false);

// bei klick auf X (editier div)
document.getElementById("NoteClose2") .addEventListener('click', function Schliessen () {
// seite neu laden
window.location.reload();
},false);

},false);

// bei klick auf X (note div)
document.getElementById("NoteClose1") .addEventListener('click', function Schliessen () {
// seite neu laden
window.location.reload();
},false);

},false);

// klammern fuer update
}})

// klammern fuer userid
}})