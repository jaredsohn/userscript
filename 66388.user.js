// ==UserScript==
// @name           Bandenmember-Notiz V1.0 ( fixed by basti1012 ) 
// @namespace      by Flying Dutchman (visit thx.spacequadrat.de)
// @description    Fuegt der Mitgliederliste der Bande ein Button hinzu, ueber den man Notizen fuer das jeweilige Mitglied speichern kann.
// @include        http://*pennergame.de/gang/memberlist/*
// @include        http://*menelgame.pl/gang/memberlist/*
// @include        http://*dossergame.co.uk/gang/memberlist/*
// ==/UserScript==

version = '2';

var membertable = document.getElementsByClassName('tieritemA')[0];
var tr = membertable.getElementsByTagName('tr');
var membertabletrs = tr.length;
var memberanzahl = membertabletrs-4;
var url = document.location.href;
var urlname2 = url.split('/gang/memberlist/?note=');
var urlname = urlname2[1];

if (url.indexOf('/?note=')>=0){
  document.getElementsByTagName('html')[0].innerHTML = '<head><title>Bandennotizen</title><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/base32_dev.css" /><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/v3_dev.css" /><!--[if IE 7]><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/base_ie32_dev.css" /><![endif]--></head>';
    var body = document.createElement('body');
    body.innerHTML = '<a href="/gang/memberlist/"><- zur Mitgliederliste</a><br/ ><center><h2 style="color: white;">Notizen f&uuml;r <u>'+urlname+'</u>.</h2></center><br /><center><textarea name="user_eingabe" cols="200" rows="40">'+GM_getValue("bandennote" + urlname + version)+'</textarea></center><br /><center><input type="button" value="Notizen speichern" /></center>';
    document.getElementsByTagName('html')[0].appendChild(body);

      if (body.getElementsByTagName('textarea')[0].value == "undefined") {
        GM_setValue("bandennote" + urlname + version, "Noch keine Notizen!");
        body.getElementsByTagName('textarea')[0].value = "Noch keine Notizen!";
 };

body.getElementsByTagName('input')[0].addEventListener('click', function save() {
  var inhalt = body.getElementsByTagName('textarea')[0].value;
  GM_setValue("bandennote" + urlname + version, inhalt);
  alert("Notizen gespeichert!");
  }, false);
 };

for (var z=0; z<=memberanzahl; z++) {

  var id2 = tr[z+2].getElementsByTagName('td')[0].innerHTML.split('/profil/id:');
  var id = id2[1].split('/')[0];

  var name2 = tr[z+2].getElementsByTagName('td')[4].innerHTML.split('<span><b>');
  var name = name2[1].split('</b>')[0];

  var newnotiztd = document.createElement('td');
  newnotiztd.innerHTML = '<a href="/gang/memberlist/?note='+name+'" target="_blank">[Notizen]</a>';
  tr[z+2].insertBefore(newnotiztd, tr[z+2].getElementsByTagName('td')[5]);
 };
