// ==UserScript==
// @name           Pennergame Spam
// @description    Sendet eine Nachricht von bis zur angegebenen Id.copy by basti1012 by napoleon und by unbekannt
// @include        http://*pennergame.de/messages/
// @include        http://*dossergame.co.uk/messages/
// @include        http://*menelgame.pl/messages/
// ==/UserScript==

function senden(SpamIdVon, SpamIdBis, SpamHeadline, SpamText, SpamStart)
{
  //alert('SpamIdVon '+SpamIdVon+ 'SpamIdBis '+SpamIdBis+ 'SpamHeadline '+ SpamHeadline+ 'SpamText '+SpamText);
  if (SpamIdVon>=SpamIdBis || SpamStart == "False" )
  {
    document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Senden beendet!]';
	document.title = '[Senden beendet!] Pennergame';
	document.getElementsByName('SpamStart')[0].disabled = "";
	alert('Senden beendet!');	
  }
  else
  {
	SpamIdVon++;
	document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Sende an: '+SpamIdVon+']';
	document.title = '[Sende an: '+SpamIdVon+'] Pennergame';
    GM_xmlhttpRequest(
     {
     method: 'POST',
     url: 'http://'+window.location.hostname+'/messages/write/send/',
     headers: 
     {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('f_toname=id:'+SpamIdVon+'&f_subject='+SpamHeadline+'&f_text='+SpamText+'&f_did=&submit=Send+message'),
      onload: function()
      { 
		//alert('gesendet an '+SpamIdVon);
        senden(SpamIdVon, SpamIdBis, SpamHeadline, SpamText, SpamStart);
      }
	 }); 
  };
};

function senden2(SpamIdEinzell, SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamHeadline, SpamText, SpamStart)
{
  if (SpamAnzahlEinzell>=SpamAnzahlEinzell2 || SpamStart == "False" )
  {
    document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Senden beendet!]';
	document.title = '[Senden beendet!] Pennergame';
	document.getElementsByName('SpamStart')[0].disabled = "";
	alert('Senden beendet!');	
  }
  else
  {
	SpamAnzahlEinzell++;
	document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Nachricht: '+SpamAnzahlEinzell+']';
	document.title = '[Nachricht: '+SpamAnzahlEinzell+'] Pennergame';
    GM_xmlhttpRequest(
     {
     method: 'POST',
     url: 'http://'+window.location.hostname+'/messages/write/send/',
     headers: 
     {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('f_toname=id:'+SpamIdEinzell+'&f_subject='+SpamHeadline+'&f_text='+SpamText+'&f_did=&submit=Send+message'),
      onload: function()
      { 
		//alert('gesendet an '+SpamIdVon);
        senden2(SpamIdEinzell, SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamHeadline, SpamText, SpamStart);
      }
	 });   
  };
};

document.getElementsByClassName('content')[0].innerHTML =
'<ul>'+
'<li><a href="/messages/" alt="Nachrichtenliste" title="Nachrichtenliste">Nachrichten Eingang</a></li>'+
'<li><a href="/messages/out/" alt="Nachrichtenliste" title="Nachrichtenliste">Nachrichten Ausgang</a></li>'+
'<li><a href="/messages/write/" alt="Nachricht verfassen" title="Nachricht verfassen">Verfassen</a></li>'+
'<li></li>'+
'<li><a name="PennergameSpam" id="PennergameSpam" alt="Pennergame Spam" title="Pennergame Spam">Pennergame Spam</a></li>'+
'</ul>';

// Wenn Pennergame Spam geklickt wurde ------------------------------------------------------------------------
document.getElementsByName('PennergameSpam')[0].addEventListener('click', function change_spam () 
{
var SpamHeadline = GM_getValue("SpamHeadline");
if (SpamHeadline == null){SpamHeadline = '';};
var SpamText = GM_getValue("SpamText");
if (SpamText == null){SpamText = '';};

document.getElementById('content').innerHTML = 
'<div id="SpamInfo" name="SpamInfo"></div><div class="listshop"><table cellpadding="0" cellspacing="1"><tr><td height="22" colspan="2" bgcolor="#272727" style="padding:4px; -moz-border-radius: 4px; -moz-border-radius-bottomleft: 0px;">&nbsp;<strong>Spam Nachricht verfassen</strong></td></tr><tr></tr><tr><td height="18" bgcolor="#272727">&nbsp;Betreff</td><td bgcolor="#303030"><label>&nbsp;'
+
'<input name="SpamHeadline" type="text" id="SpamHeadline" value="'+SpamHeadline+'" />'
+
'</label></td></tr><tr><td height="5" colspan="2"></td></tr><td colspan="2" bgcolor="#272727" style="vertical-align:middle; padding:4px; -moz-border-radius: 4px; -moz-border-radius-bottomright: 0px; -moz-border-radius-bottomleft: 0px;">&nbsp;<strong>Inhalt</strong></td></tr><tr><td height="22" colspan="2" bgcolor="#303030" style="padding:5px 5px 5px 5px; border: 1px solid #272727;"<div align="left">'
+
'<input name="SpamText" type="text" id="SpamText" value="'+SpamText+'" size="60"/>&nbsp;'+
'<input type="button" name="SpamSpeichern" id="SpamSpeichern" value="speichern" />'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="left">'
+
'<input type="radio" name="spamalle" id="spamalle" checked="checked"/>Senden an alle Id&acute;s:<br>'+
'Von Id:&nbsp;<input type="text" name="SpamIdVon" id="SpamIdVon" value="" /><br>'+
'Bis Id:&nbsp;<input type="text" name="SpamIdBis" id="SpamIdBis" value="" /><br><br>'
+
'<input type="radio" id="spameinzell" name="spameinzell"/>Senden an Einzell-Id:<br>'+
'Id der Person:&nbsp;'+
'<input type="text" name="SpamIdEinzell" id="SpamIdEinzell" value=""/><br>'+
'Anzahl der Nachrichten :&nbsp;'+
'<input type="text" name="SpamAnzahlEinzell" id="SpamAnzahlEinzell" value=""/>'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="center">'
+
'<input type="button" name="SpamStart" id="SpamStart" value="Spam starten" />&nbsp;'+
'<input type="button" name="SpamStop" id="SpamStop" value="Spam stoppen" /><br>'+
'<input type="button" name="SpamDel" id="SpamDel" value="Alles l&ouml;schen" />'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="left" name="SpamIdInfo" id="SpamIdInfo"></div></td></tr></table></div><div class="menubarright"><div class="submenu_shop"><div class="submenu_shop"><div class="top"></div><div class="content">'
+
'<ul>'+
'<li><a href="/messages/" alt="Nachrichtenliste" title="Nachrichtenliste">Nachrichten Eingang</a></li>'+
'<li><a href="/messages/out/" alt="Nachrichtenliste" title="Nachrichtenliste">Nachrichten Ausgang</a></li>'+
'<li><a href="/messages/write/" alt="Nachricht verfassen" title="Nachricht verfassen">Verfassen</a></li>'+
'<li></li>'+
'<li><a name="PennergameSpam" id="PennergameSpam" alt="Pennergame Spam" title="Pennergame Spam">Pennergame Spam</a></li>'+
'</ul>'
+
'</div><div class="buttom"></div></div></div></div></div>';

// Wenn starten geklickt wird
document.getElementsByName('SpamStart')[0].addEventListener('click', function go_spam () 
{
document.getElementsByName('SpamStart')[0].disabled = "disabled";	

// Prüfen ob Einzellperson oder alle
if(document.getElementsByName('spameinzell')[0].checked==true) 
{
  var SpamHeadline = document.getElementsByName('SpamHeadline')[0].value;	
  var SpamText = document.getElementsByName('SpamText')[0].value;	
  var SpamIdEinzell = document.getElementsByName('SpamIdEinzell')[0].value;
  var SpamAnzahlEinzell = 0;
  var SpamAnzahlEinzell2 = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamStart = "True";
  // >>>>>>>>>>>>> Senden2 <<<<<<<<<<<<<<
  senden2(SpamIdEinzell, SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamHeadline, SpamText, SpamStart);
}
else
{
  var SpamHeadline = document.getElementsByName('SpamHeadline')[0].value;	
  var SpamText = document.getElementsByName('SpamText')[0].value;
  var SpamIdVon = document.getElementsByName('SpamIdVon')[0].value;
  var SpamIdBis = document.getElementsByName('SpamIdBis')[0].value;
  var SpamStart = "True";
  
  if (SpamIdVon >=  SpamIdBis)
  {
    alert('Die IdVon ist größer oder gleich dem IdBis Wert!');
    document.getElementsByName('SpamStart')[0].disabled = "";
  }
  else
  {
  // >>>>>>>>>>>>> Senden <<<<<<<<<<<<<<
  senden(SpamIdVon, SpamIdBis, SpamHeadline, SpamText, SpamStart);
  };
};

},false);

// wenn löschen geklickt wurde
document.getElementsByName('SpamDel')[0].addEventListener('click', function del_spam () 
{
  GM_deleteValue("SpamHeadline");
  GM_deleteValue("SpamText");
  document.getElementsByName('SpamHeadline')[0].value = '';
  document.getElementsByName('SpamText')[0].value = '';
  document.getElementsByName('IdVon')[0].value = '';
  document.getElementsByName('IdBis')[0].value = '';
  document.getElementsByName('SpamIdEinzell')[0].value = '';
  document.getElementsByName('SpamAnzhalEinzell')[0].value = '';
},false);

// Wenn stop geklickt wurde
document.getElementsByName('SpamStop')[0].addEventListener('click', function stop_spam () 
{
// Prüfen ob Einzellperson oder alle
if(document.getElementsByName('spameinzell')[0].checked==true) 
{
  var SpamHeadline = document.getElementsByName('SpamHeadline')[0].value;	
  var SpamText = document.getElementsByName('SpamText')[0].value;	
  var SpamIdEinzelln = document.getElementsByName('SpamIdEinzell')[0].value;
  var SpamAnzahlEinzell = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamAnzahlEinzell2 = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamStart = "False";
  senden2(SpamIdEinzelln, SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamHeadline, SpamText, SpamStart)
  
  document.getElementsByName('SpamStart')[0].disabled = "";
}
else
{
  var SpamHeadline = document.getElementsByName('SpamHeadline')[0].value;	
  var SpamText = document.getElementsByName('SpamText')[0].value;
  var SpamIdVon = document.getElementsByName('SpamIdVon')[0].value;
  var SpamIdBis = document.getElementsByName('SpamIdBis')[0].value;
  var SpamStart = "False";
  senden(SpamIdVon, SpamIdBis, SpamHeadline, SpamText, SpamStart);
  
  document.getElementsByName('SpamStart')[0].disabled = "";
};
},false);

// Wenn speichern geklickt wurde
document.getElementsByName('SpamSpeichern')[0].addEventListener('click', function save_spam () 
{
GM_setValue("SpamHeadline",document.getElementsByName('SpamHeadline')[0].value);
GM_setValue("SpamText",document.getElementsByName('SpamText')[0].value);
document.getElementById('SpamInfo').innerHTML = '<div class="goodmsg">Speichern erfolgreich!</div>';
},false);

// Wenn RadioButton alle geklickt wurde
document.getElementsByName('spamalle')[0].addEventListener('click', function radio_all () 
{
  document.getElementsByName('spameinzell')[0].checked=false;  
},false);

// Wenn RadioButton einzelln geklickt wurde
document.getElementsByName('spameinzell')[0].addEventListener('click', function radio_all () 
{
  document.getElementsByName('spamalle')[0].checked=false;
},false);

},false);