// ==UserScript==
// @name           bandenkassenn ein euro bot by basti1012
// @description    zahlt den eingegebenen beitrag in eine euro stuecken in der banden kasse einzahlen
// @include        http://*pennergame.de/gang/*
// @include        http://*dossergame.co.uk/gang/*
// @include        http://*menelgame.pl/gang/*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};



function senden2(SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamText, SpamStart)
{
  if (SpamAnzahlEinzell>=SpamAnzahlEinzell2 || SpamStart == "False" )
  {
    document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Einzahlungsbot  beendet!]';
	document.title = '[Einzahlung beendet!] Pennergame';
	document.getElementsByName('SpamStart')[0].disabled = "";
	alert("Einzahlung beendet");	
  }
  else
  {
	SpamAnzahlEinzell++;
	document.getElementsByName('SpamIdInfo')[0].innerHTML = '[Einzahlung l&auml;uft.Habe '+SpamAnzahlEinzell+' Euro schon eingezahlt]';
	document.title = '[Nachricht: '+SpamAnzahlEinzell+'] Pennergame';
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/gang/cash/add/',
   headers:
   {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('f_money=1&f_comment='+SpamText+'&Submit=Einzahlen'),
      onload: function() 




      { 
		//alert("Insgesamt "+SpamAnzalEinzell+" Eingezahlt");
        senden2(SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamText, SpamStart);
      }
	 });   
  };
};

//var table = document.getElementsByTagName('form')[0];
//var td = table.getElementsByTagName('li')[6];
//td.innerHTML += '<li><a name="PennergameSpam" id="PennergameSpam" alt="Pennergame Spam" title="Pennergame Spam">Pennergame Spam</a></li>';

document.getElementsByClassName('content')[0].innerHTML =
'<ul>'+
'<li><a href="/gang/" alt="Bande" title="Bande">Bande</a></li>'+
'<li><a href="/gang/credit/" alt="Bandenkasse" title="Bandenkasse">Bandenkasse</a></li>'+

'<li><a href="/gang/upgrades/" alt="Bandeneigentum" title="Bandeneigentum">Bandeneigentum</a></li>'+
'<li><a href="/gang/memberlist/" alt="Mitglieder" title="Mitglieder">Mitglieder</a></li>'+
'<li><a href="/gang/forum/" alt="Bandenforum" title="Bandenforum">Bandenforum</a></li>'+
'<li><a href="/gang/pact/" alt="B&uuml;ndnisse" title="B&uuml;ndnisse">B&uuml;ndnisse</a></li>'+
'<li><a href="/profil/bande:429966/" alt="Profil" title="Profil">Profil</a></li>'+
'<li><a href="/gang/fight/" alt="Kampf" title="Kampf">Bandenkampf</a>'+
'<li><a name="PennergameSpam" id="PennergameSpam" alt="Pennergame Spam" title="Pennergame Spam">Bandenkassen Bot</a></li>'+
'</ul>';











// Wenn Pennergame Spam geklickt wurde ------------------------------------------------------------------------
document.getElementsByName('PennergameSpam')[0].addEventListener('click', function change_spam () 
{
var SpamText = GM_getValue("SpamText");
if (SpamText == null){SpamText = '';};


document.getElementById('content').innerHTML 
='<div id="SpamInfo" name="SpamInfo"></div><div class="listshop"><table cellpadding="0" cellspacing="1"><tr><td height="22" colspan="2" bgcolor="#272727" style="padding:4px; -moz-border-radius: 4px; -moz-border-radius-bottomleft: 0px;">&nbsp;<strong>Bastis Bandekassen bot (1 Euro )</strong></td></tr><tr></tr><tr><td height="18" bgcolor="#272727">&nbsp;Einzahl kommentar</td><td bgcolor="#303030"><label>&nbsp;'
+
'<input name="SpamText" type="text" id="SpamText" value="'+SpamText+'" size="60"/>&nbsp;'+
'<input type="button" name="SpamSpeichern" id="SpamSpeichern" value="Kassen Kommentar speichern" />'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="left">'
+
'<input type="radio" id="spameinzell" name="spameinzell"/>Beitrag in ein Euro Bezahlen:<br>'+
'Anzahl der Euros:&nbsp;'+
'<input type="text" name="SpamAnzahlEinzell" id="SpamAnzahlEinzell" value=""/>'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="center">'
+
'<input type="button" name="SpamStart" id="SpamStart" value="Einzahlung starten" />&nbsp;'+
'<input type="button" name="SpamStop" id="SpamStop" value="Einzahlung stoppen" /><br>'+
'<input type="button" name="SpamDel" id="SpamDel" value="Alles l&ouml;schen" />'
+
'</div></td></tr><tr><td colspan="2" height="22" bgcolor="#272727" style="padding: 1px"><div align="left" name="SpamIdInfo" id="SpamIdInfo"></div></td></tr></table></div></div>'+
document.getElementById('content').innerHTML;




//-------------------------------------------

// Wenn starten geklickt wird
document.getElementsByName('SpamStart')[0].addEventListener('click', function go_spam () 
{
document.getElementsByName('SpamStart')[0].disabled = "disabled";	

//------------------------------------------

// Pr?fen ob Einzellperson oder alle
if(document.getElementsByName('spameinzell')[0].checked==true) 
{
	
  var SpamText = document.getElementsByName('SpamText')[0].value;	
  var SpamAnzahlEinzell = 0;
  var SpamAnzahlEinzell2 = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamStart = "True";
  // >>>>>>>>>>>>> Senden2 <<<<<<<<<<<<<<
  senden2(SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamText, SpamStart);
}
else
{
  var SpamText = document.getElementsByName('SpamText')[0].value;
  var SpamStart = "True";
  
};

},false);

// wenn l?schen geklickt wurde
document.getElementsByName('SpamDel')[0].addEventListener('click', function del_spam () 
{
  GM_deleteValue("SpamText");

  document.getElementsByName('SpamText')[0].value = '';
  document.getElementsByName('SpamAnzhalEinzell')[0].value = '';
},false);

// Wenn stop geklickt wurde
document.getElementsByName('SpamStop')[0].addEventListener('click', function stop_spam () 
{
// Pr?fen ob Einzellperson oder alle
if(document.getElementsByName('spameinzell')[0].checked==true) 
{
  var SpamText = document.getElementsByName('SpamText')[0].value;	

  var SpamAnzahlEinzell = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamAnzahlEinzell2 = document.getElementsByName('SpamAnzahlEinzell')[0].value;
  var SpamStart = "False";
  senden2(SpamAnzahlEinzell, SpamAnzahlEinzell2, SpamText, SpamStart)
  
  document.getElementsByName('SpamStart')[0].disabled = "";
};
},false);

// Wenn speichern geklickt wurde
document.getElementsByName('SpamSpeichern')[0].addEventListener('click', function save_spam () 
{
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

// Copyright by basti1012