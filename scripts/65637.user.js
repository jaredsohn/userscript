// ==UserScript==
// @name           SeitenMenue Pennergame ( Einstellbar ) By Basti1012
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012 
// @description    Erweitert das Rechgte Seitenmenue um so viele Links wie ihr es moechtet . Name Link und Style ist ueber die Pennergame Einstellseite einstellbar 
// @include */overview/*
// @include */settings/*
// @exclude */fight/overview/*
// ==/UserScript==


if(!GM_getValue("linkanzahl")) {
  GM_setValue("linkanzahl", "1");
};

var anzahllinks = GM_getValue("linkanzahl");
var inhalt1 = '<span style="color: white;">Anzahl der Links:</span> <input type="text" id="anzahl" size="1" value="'+GM_getValue("linkanzahl")+'" /><input type="button" id="anzahlspeichern" value="Speichern" /><br>Erstes Feld Name angeben der angezeigt werden soll,<br>Zweites Feld Link eingeben .Bei Pennergame reicht auch /skills/  ohne das www.pennergame.de.';

var donationul1 = document.getElementsByClassName("tieritemA")[0];
var newp1 = document.createElement("tieritemA");
newp1.innerHTML = '<tbody><tr><td colspan="3" align="left" height="15" valign="top">'
+'<span class="tiername" id="sig_create_form"><br><br>Einstellungen f&uuml;r Bastis Extra Seitenmen&uuml;.</span>' 
+'<hr size="1"></td></tr>'+inhalt1+'<tr>'
+'<div name="mengelinks"</div><br><input type="button" id="namenundlinksspeichern" value="Namen und Links speichern" /><br>Btn : 1-4 Die Styls des weissen Untergrundes'
+'</tbody></table></form></div>';
donationul1.appendChild(newp1);

    for (var z=1; z<=anzahllinks; z++) {

      if(!GM_getValue("spendenname" + z)) {
        GM_setValue("spendenname" + z, "Name:");
      };
      if(!GM_getValue("spendenlink" + z)) {
        GM_setValue("spendenlink" + z, " Link:");
      };

      if(!GM_getValue("btn" + z)) {
        GM_setValue("btn" + z, "1");
      };

document.getElementsByName('mengelinks')[0].innerHTML += '<span style="color: white;">'
+'</span>'
+'<input type="text" id="btn'+z+'" size="1" value="'+GM_getValue("btn" + z)+'" />'
+'<input type="text" id="name'+z+'" size="10" value="'+GM_getValue("spendenname" + z)+'" />'
+'<span style="color: white;"></span>'
+'<input type="text" id="link'+z+'" size="20" value="'+GM_getValue("spendenlink" + z)+'" />'
+'<a href="'+GM_getValue("spendenlink" + z)+'" target="_blank">Check</a><br>';

tbody = document.getElementsByClassName('submenu')[0];
tbody.innerHTML += '<li><a href="'+GM_getValue("spendenlink" + z)+'" class="btn'+GM_getValue("btn" + z)+'">'+GM_getValue("spendenname" + z)+'</a></li>';

}


  document.getElementById('anzahlspeichern').addEventListener('click', function speichern1() {
    var anzahl = document.getElementById('anzahl').value;
    GM_setValue("linkanzahl", anzahl);
    alert("Anzahl der Spendenlinks gespeichert! Seite wird neu geladen...");
    location.reload();
  }, false);

  document.getElementById('namenundlinksspeichern').addEventListener('click', function speichern2() {
    for (var y=1; y<=anzahllinks; y++) {
      var spendenname = document.getElementById('name' + y).value;
      GM_setValue("spendenname" + y, spendenname);

      var btn = document.getElementById('btn' + y).value;
      GM_setValue("btn" + y, btn);


      var spendenlink = document.getElementById('link' + y).value;
      GM_setValue("spendenlink" + y, spendenlink);
    };
    alert("Namen, btn und Links gespeichert! Seite wird neu geladen...");
    location.reload();
  }, false);