// ==UserScript==
// @name           PENNNERGAME STYLEHERSTELLUNG LEICHTGEMACHT
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    MIT DIESEN SCRIPT KOENNT IHR GANZ EINFACH DEN STYLE VON PENNERGAME GANZ EINFACH AENDERN DAS KANN WIRKLICH JEDER
// @include        http://*dossergame.co.uk/*
// @include        http://*menelgame.pl/*
// @include        http://*berlin.pennergame.de/*
// @include        http://*pennergame.de/*
// @exclude        http://newboard.pennergame.de
// ==/UserScript==

var a = document.getElementsByTagName('a');

for (var i=0; i<20; i++)
{
	if (a[i].firstChild.data == 'News')
	{ 
		a[i].href = '/?style/';
		a[i].firstChild.data = 'Style';
		break;
	}
}







var spendenlink1 = GM_getValue("spendenlink1");
if (spendenlink1 == null){
spendenlink1 = 'http://djhagen.dj.funpic.de/pg1.jpg';
GM_setValue("spendenlink1" , spendenlink1);
};
var spendenlink2 = GM_getValue("spendenlink2");
if (spendenlink2 == null){
spendenlink2 = 'http://djhagen.dj.funpic.de/pg2.jpg';
GM_setValue("spendenlink2" , spendenlink2);
};
var spendenlink3 = GM_getValue("spendenlink3");
if (spendenlink3 == null){
spendenlink3 = 'http://djhagen.dj.funpic.de/pg3.jpg';
GM_setValue("spendenlink3" , spendenlink3);
};
var spendenlink4 = GM_getValue("spendenlink4");
if (spendenlink4 == null){
spendenlink4 = 'http://djhagen.dj.funpic.de/pg4.jpg';
GM_setValue("spendenlink4" , spendenlink4);
};
var spendenlink5 = GM_getValue("spendenlink5");
if (spendenlink5 == null){
spendenlink5 = 'http://djhagen.dj.funpic.de/pg5.jpg';
GM_setValue("spendenlink5" , spendenlink5);
};
var spendenlink6 = GM_getValue("spendenlink6");
if (spendenlink6 == null){
spendenlink6 = 'http://djhagen.dj.funpic.de/pg6.jpg';
GM_setValue("spendenlink6" , spendenlink6);
};
var spendenlink7 = GM_getValue("spendenlink7");
if (spendenlink7 == null){
spendenlink7 = 'blue';
GM_setValue("spendenlink7" , spendenlink7);
};
var spendenlink8 = GM_getValue("spendenlink8");
if (spendenlink8 == null){
spendenlink8 = 'blue';
GM_setValue("spendenlink8" , spendenlink8);
};
var spendenlink9 = GM_getValue("spendenlink9");
if (spendenlink9 == null){
spendenlink9 = 'blue';
GM_setValue("spendenlink9" , spendenlink9);
};
var spendenlink10 = GM_getValue("spendenlink10");
if (spendenlink10 == null){
spendenlink10 = 'blue';
GM_setValue("spendenlink10" , spendenlink10);
};
var spendenlink11 = GM_getValue("spendenlink11");
if (spendenlink11 == null){
spendenlink11 = 'blue';
GM_setValue("spendenlink11" , spendenlink11);
};
var spendenlink12 = GM_getValue("spendenlink12");
if (spendenlink12 == null){
spendenlink12 = 'blue';
GM_setValue("spendenlink12" , spendenlink12);
};
var spendenlink13 = GM_getValue("spendenlink13");
if (spendenlink13 == null){
spendenlink13 = 'hier koennt ihr speichern was ihr wollt so viel wie da rein passt <br> mfg basti';
GM_setValue("spendenlink13" , spendenlink13);
};
var spendenlink14 = GM_getValue("spendenlink14");
if (spendenlink14 == null){
spendenlink14 = 'http://www.fotos-hochladen.net/alien3ebk4faq.jpg';
GM_setValue("spendenlink14" , spendenlink14);
};




document.getElementById('footer').innerHTML += "<link rel=\"shortcut icon\" href=\""+GM_getValue("spendenlink14")+"\" type=\"image/x-icon\">";



document.getElementsByTagName('body')[0].style.backgroundImage= "url( "+GM_getValue("spendenlink1")+")";

document.getElementById('header').style.backgroundImage = "url( "+GM_getValue("spendenlink2")+")";

document.getElementById('navigation').style.backgroundImage = "url( "+GM_getValue("spendenlink3")+")";

document.getElementById('content').style.backgroundImage = "url( "+GM_getValue("spendenlink4")+")";

document.getElementById('footer').style.backgroundImage = "url( "+GM_getValue("spendenlink5")+")";

document.getElementById('copy').style.backgroundImage = "url( "+GM_getValue("spendenlink6")+")";


document.getElementsByTagName('body')[0].style.backgroundColor= ""+GM_getValue("spendenlink7")+"";
document.getElementById('header').style.backgroundColor= ""+GM_getValue("spendenlink8")+"";
document.getElementById('navigation').style.backgroundColor= ""+GM_getValue("spendenlink9")+"";
document.getElementById('content').style.backgroundColor= ""+GM_getValue("spendenlink10")+"";
document.getElementById('footer').style.backgroundColor= ""+GM_getValue("spendenlink11")+"";
document.getElementById('copy').style.backgroundColor= ""+GM_getValue("spendenlink12")+"";





var url = document.location.href;
if(url.indexOf('/change_please/statistics/')>=0) {
  document.getElementById('content').getElementsByTagName('h1')[0].innerHTML = 'Spenden-Statistik/<a href="/?style" target="_blank">styleseite</a>';
};

if (url.indexOf('/?style')>=0){
var inhalt1 = '<br><span style=\"color:red; font-size:120%;\">Auf dieser Seite k&ouml;nnt ihr ganz  einfach die Hintergrundsbilder &Auml;ndern,<br>einfach neue links der Bilder Eingeben ,<br>Speichern klicken und Pennnergame hat euren inviduelen Style<br>Hier eure Links zu den Bildern Eingeben (Auf korekte Schreibweise achten)<br>Habe Copy paste erlaubt benutzt das auch ,<br>damit keine Schreibfehler hier rein kommen )<br>Weil bei Schreibfehler werden die Bilder nicht Angezeigt <br>und das Script k&ouml;nnte streiken<br></span><br><br> ';

  document.getElementsByTagName('html')[0].innerHTML = '<head><title>Spendenliste</title><link rel="stylesheet" type="text/css" href="http://pennerhack.foren-city.de/templates/Aliens/Aliens.css" /></head>';
  var body = document.createElement('body');
  body.innerHTML = '<a href="/overview/"><- Zur Pennergame &Uuml;bersichtsseite Zur&uuml;rck<br>und neuen Style betrachten</a><br><center><span style=\"color:blue; font-size:160%;\"><b><u>Pennergame Styls Seite .die Seite f&uulm;r Lustige Bilder einzuf&uulm;gen</u></b></span></center><br><br>'+inhalt1+'<br><br><input type="button" name="speichern" value="Euere links und notizen Speichern" /><br><span style=\"color:blue; font-size:120%;\"><b><br>';
  document.getElementsByTagName('html')[0].appendChild(body);
  var links = document.createElement('div');
  body.appendChild(links);

links.innerHTML += ''
+'<span style="color: red;">Favicon:(urlbild)     </span><input type="text" id="link14" size="60" value="'+GM_getValue("spendenlink14")+'" /> <a href="'+GM_getValue("spendenlink14")+'" target="_blank">'+GM_getValue("spendenlink14")+'</a><img src="http://www.fotos-hochladen.net/faviconbildjs4bvea2.jpg"><br>'
+'<span style="color: red;">Body(Hintergrund:     </span><input type="text" id="link1" size="60" value="'+GM_getValue("spendenlink1")+'" /> <a href="'+GM_getValue("spendenlink1")+'" target="_blank">'+GM_getValue("spendenlink1")+'</a><br>'
+'<span style="color: red;">Header:Kopfteil :     </span><input type="text" id="link2" size="60" value="'+GM_getValue("spendenlink2")+'" /> <a href="'+GM_getValue("spendenlink2")+'" target="_blank">'+GM_getValue("spendenlink2")+'</a><br>'
+'<span style="color: red;">Navigation :          </span><input type="text" id="link3" size="60" value="'+GM_getValue("spendenlink3")+'" /> <a href="'+GM_getValue("spendenlink3")+'" target="_blank">'+GM_getValue("spendenlink3")+'</a><br>'
+'<span style="color: red;">Content(der Bauch):   </span><input type="text" id="link4" size="60" value="'+GM_getValue("spendenlink4")+'" /> <a href="'+GM_getValue("spendenlink4")+'" target="_blank">'+GM_getValue("spendenlink4")+'</a><br>'
+'<span style="color: red;">Footer( Fussende):    </span><input type="text" id="link5" size="60" value="'+GM_getValue("spendenlink5")+'" /> <a href="'+GM_getValue("spendenlink5")+'" target="_blank">'+GM_getValue("spendenlink5")+'</a><br>'
+'<span style="color: red;">Copy(unter fuss):     </span><input type="text" id="link6" size="60" value="'+GM_getValue("spendenlink6")+'" /> <a href="'+GM_getValue("spendenlink6")+'" target="_blank">'+GM_getValue("spendenlink6")+'</a><br>'
+'<span style="color: red;">Body Farbe :          </span><input type="text" id="link7" size="60" value="'+GM_getValue("spendenlink7")+'" /> <a href="'+GM_getValue("spendenlink7")+'" target="_blank">'+GM_getValue("spendenlink7")+'</a><br>'
+'<span style="color: red;">Header Farbe:         </span><input type="text" id="link8" size="60" value="'+GM_getValue("spendenlink8")+'" /> <a href="'+GM_getValue("spendenlink8")+'" target="_blank">'+GM_getValue("spendenlink8")+'</a><br>'
+'<span style="color: red;">Navigation Farbe:     </span><input type="text" id="link9" size="60" value="'+GM_getValue("spendenlink9")+'" /> <a href="'+GM_getValue("spendenlink9")+'" target="_blank">'+GM_getValue("spendenlink9")+'</a><br>'
+'<span style="color: red;">Content Farbe:        </span><input type="text" id="link10" size="60" value="'+GM_getValue("spendenlink10")+'" /> <a href="'+GM_getValue("spendenlink10")+'" target="_blank">'+GM_getValue("spendenlink10")+'</a><br>'
+'<span style="color: red;">Footer Farbe :        </span><input type="text" id="link11" size="60" value="'+GM_getValue("spendenlink11")+'" /> <a href="'+GM_getValue("spendenlink11")+'" target="_blank">'+GM_getValue("spendenlink11")+'</a><br>'
+'<span style="color: red;">Copy Farbe :          </span><input type="text" id="link12" size="60" value="'+GM_getValue("spendenlink12")+'" /> <a href="'+GM_getValue("spendenlink12")+'" target="_blank">'+GM_getValue("spendenlink12")+'</a><br>'
+'<a href="http://pennergame.de/overview/" target="_blank"><span style=\"color:green; font-size:150%;\"><b><br>Klicke hier um jetzt dein style zu betrachten</a></b></span><br>'
+'<a href="http://pennerhack.foren-city.de/topic,561,120,-pennergame-design.html#2131" target="_blank"><span style=\"color:green; font-size:150%;\"><b><br>Ist der Style gut geworden ?<br> Dann gehe sofort in Forum <br>Zu den  Beitrag und teile uns dein Ergebniss mit:<br>Bitte klicke <span style=\"color:blue; font-size:200%;\"><b>HIER</b></span></a></b></span><br>'

+'<br><br><span style=\"color:red; font-size:120%;\"><b>In diesen riesen Feld k&ouml;nnt ihr Speichern was ihr wollt zb die ganzen links der bilder</b></span><br>'
+'<td><br><textarea id="link13" cols="100" rows="40">'+GM_getValue("spendenlink13")+'</textarea><br><br>'

+'<span style=\"color:blue; font-size:120%;\"><b>Copyright by Basti1012</b></span></td>'
+'<br><br><span style=\"color:red; font-size:120%;\"><b> Ich hoffe der Platz reicht euch sonst muss ich das ding noch groesser bauen mfg hack</b></span><br>'
+'<span style=\"color:white; font-size:100%;\"><b>Ich habe mal ein bischen mit der css Datei rumgespielt und wie ihr sieht ist das kein Pennefrgame Style mehr selbst die Buttons haben neuen Style ,dass m&uuml;ten wir noch f&uuml;r Pennergame hinkriegen damit Pennergame auch einen komplett neuen Style kriegt aber ,ich weiss noch nicht wie das geht ,auf Extra Seiten die ich kommplett baue kann ich dass aber noch nicht PG kommkt aber noch ich lerne doch noch dazu</b></span><br>';


document.getElementsByName('speichern')[0].addEventListener('click', function change_plunder () {

      var spendenlink1 = document.getElementById('link1').value;
      GM_setValue("spendenlink1" , spendenlink1);

      var spendenlink2 = document.getElementById('link2').value;
      GM_setValue("spendenlink2" , spendenlink2);

      var spendenlink3 = document.getElementById('link3').value;
      GM_setValue("spendenlink3" , spendenlink3);

      var spendenlink4 = document.getElementById('link4').value;
      GM_setValue("spendenlink4" , spendenlink4);

      var spendenlink5 = document.getElementById('link5').value;
      GM_setValue("spendenlink5" , spendenlink5);

      var spendenlink6 = document.getElementById('link6').value;
      GM_setValue("spendenlink6" , spendenlink6);

      var spendenlink7 = document.getElementById('link7').value;
      GM_setValue("spendenlink7" , spendenlink7);

      var spendenlink8 = document.getElementById('link8').value;
      GM_setValue("spendenlink8" , spendenlink8);

      var spendenlink9 = document.getElementById('link9').value;
      GM_setValue("spendenlink9" , spendenlink9);

      var spendenlink10 = document.getElementById('link10').value;
      GM_setValue("spendenlink10" , spendenlink10);

      var spendenlink11 = document.getElementById('link11').value;
      GM_setValue("spendenlink11" , spendenlink11);

      var spendenlink12 = document.getElementById('link12').value;
      GM_setValue("spendenlink12" , spendenlink12);

      var spendenlink13 = document.getElementById('link13').value;
      GM_setValue("spendenlink13" , spendenlink13);


      var spendenlink14 = document.getElementById('link14').value;
      GM_setValue("spendenlink14" , spendenlink14);

alert("DIE LINKS WURDEN GESPEICHERT VIEL GLUECK MIT DEN NEUEN STYLE \n MFG BASTI");
location.reload();
},false);

};
var spende1 = GM_getValue("spendenlink1");
var spende2 = GM_getValue("spendenlink2");
var spende3 = GM_getValue("spendenlink3");
var spende4 = GM_getValue("spendenlink4");
var spende5 = GM_getValue("spendenlink5");
var spende6 = GM_getValue("spendenlink6");
var spende7 = GM_getValue("spendenlink7");
var spende8 = GM_getValue("spendenlink8");
var spende9 = GM_getValue("spendenlink9");
var spende10 = GM_getValue("spendenlink10");
var spende11 = GM_getValue("spendenlink11");
var spende12 = GM_getValue("spendenlink12");
var spende13 = GM_getValue("spendenlink13");
var spende14 = GM_getValue("spendenlink14");

// Copyright By Basti1012 dieses Script wurde entwickelt fuer die entwickler der style Scripte damit
// die nicht andauernd die scripte umschreiben muessen weil so geht deas schneller und einfacher
// so macht das style scripte bauen viel mehr spass 
// alöso jungs gibt gas ich unterstuetze euch