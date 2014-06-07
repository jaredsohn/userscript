// ==UserScript==
// @name           PENNNERGAME Styls erste oeffenliche version von 12.7.2009
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    MIT DIESEN SCRIPT KOENNT IHR GANZ EINFACH DEN STYLE VON PENNERGAME GANZ EINFACH AENDERN DAS KANN WIRKLICH JEDER .Einfach ueber die Navigationsleiste (news ist jetzt styls )anklicken,dann kommt ne extra seite wo ihr deb Style von pg aendern koennt
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
var spendenlink15 = GM_getValue("spendenlink15");
if (spendenlink15 == null){
spendenlink15 = 'http://www.fotos-hochladen.net/alien3ebk4faq.jpg';
GM_setValue("spendenlink15" , spendenlink15);
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
var inhalt1 = '<br><span style=\"color:red; font-size:120%;\">Dieses ist Version 2 und wird andauerd auf den neusten<br> stand gehalten,jedes mal wenn ich neue Bilder kriege werde ich dieses Script aktualliesiern<br> Damit ihr immer die neuesten Styld habt.br>Auf dieser Seite k&ouml;nnt ihr ganz  einfach die Hintergrundsbilder &Auml;ndern,<br>einfach neus Bild aussuchen ,<br>Speichern klicken und Pennnergame hat euren inviduelen Style<br></span><br><br> ';

  document.getElementsByTagName('html')[0].innerHTML = '<head><title>Spendenliste</title><link rel="stylesheet" type="text/css" href="http://pennerhack.foren-city.de/templates/Aliens/Aliens.css" />';
  var body = document.createElement('body');
  body.innerHTML = '<a href="/overview/"><- Zur Pennergame &Uuml;bersichtsseite Zur&uuml;rck<br>und neuen Style betrachten</a><br><center><span style=\"color:blue; font-size:160%;\"><b><u>Pennergame Styls Seite .die Seite f&uuml;r Lustige Bilder einzuf&uuml;gen</u></b></span></center><br><br>'+inhalt1+'<br><br><input type="button" name="speichern" value="Euere links und notizen Speichern" /><br><span style=\"color:blue; font-size:120%;\"><b><br>';
  document.getElementsByTagName('html')[0].appendChild(body);
  var links = document.createElement('div');
  body.appendChild(links);
// Faviconjs #####################################################################
links.innerHTML += ''
+'<span style="color: red;">Favicon:(urlbild)</span>'
//<input type="text" id="link14" size="60" value="'+GM_getValue("spendenlink14")+'" /> <a href="'+GM_getValue("spendenlink14")+'" target="_blank">'+GM_getValue("spendenlink14")+'</a><img src="http://www.fotos-hochladen.net/faviconbildjs4bvea2.jpg"><br>'
+'<select name="link14" id="link14" size="1"'
+'onchange="'+GM_getValue("spendenlink14")+'"'
+'<option value="">Kein Bild </option>'
+'<option value="http://www.fotos-hochladen.net/alien3ebk4faq.jpg">alien by Basti1012</option>'
+'<option value="http://www.econsultant.com/favicons/hdj.gif">Pennerstyle by lefty1981</option>'
+'<option value="http://www.econsultant.com/favicons/hdj.gif">Pulp Fiction</option>'
+'<option value="http://www.econsultant.com/favicons/hdj.gif">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink14")+'" target="_blank">"'+GM_getValue("spendenlink14")+'"</a><br>'
//#### body ##########################################################################
+'<span style="color: red;">Body(Hintergrund:</span>'
//<input type="text" id="link1" size="60" value="'+GM_getValue("spendenlink1")+'" /><a href=""+GM_getValue("spendenlink1")+"" target="_blank">'+GM_getValue("spendenlink1")+'</a><br>'
+'<select name="link1" id="link1" size="1"'
+'onchange="'+GM_getValue("spendenlink1")+'"'
+'<option value="">Kein Bild (Es wird Farbe geladen)</option>'
+'<option value="http://newboard.pennergame.de/styles/Pennergame/theme/images/background.jpg">Pg-Forum Hintergrund By basti1012 Versuch</option>'
+'<option value="http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i42.tinypic.com/3fwci.png">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg1.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i27.tinypic.com/2d0avc7.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph1.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i25.tinypic.com/qr0jk7.png">Pulp Fiction</option>'
+'<option value="http://i26.tinypic.com/11brhuq.png">Water By Pennerstirb</option>'
+'<option value="http://s1b.directupload.net/images/user/090712/bqgh2yia.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i26.tinypic.com/md2qrm.png">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink1")+'" target="_blank">"'+GM_getValue("spendenlink1")+'"</a><br>'

// header #####################################################################
+'<span style="color: red;">Header:Kopfteil :</span>'
//<input type="text" id="link2" size="60" value="'+GM_getValue("spendenlink2")+'" /> <a href="'+GM_getValue("spendenlink2")+'" target="_blank">'+GM_getValue("spendenlink2")+'</a><br>'
+'<select name="link2" id="link2" size="1"'
+'onchange="'+GM_getValue("spendenlink2")+'"'
+'<option value="">Kein Bild (Es wird farbe geladen)</option>'
+'<option value="http://i28.tinypic.com/15wi9t5.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i44.tinypic.com/2py6dnc.jpg">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg2.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i31.tinypic.com/333daol.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph2.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i30.tinypic.com/o53yaq.jpg">Pulp Fiction</option>'
+'<option value="http://i28.tinypic.com/2114etd.png">Water By Pennerstirb</option>'
+'<option value="http://s6.directupload.net/images/user/090712/3ybjo8at.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i31.tinypic.com/120gf15.jpg">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink2")+'" target="_blank">"'+GM_getValue("spendenlink2")+'"</a><br>'
// navigation ######################################################
+'<span style="color: red;">Navigation :</span>'
//<input type="text" id="link3" size="60" value="'+GM_getValue("spendenlink3")+'" /> <a href="'+GM_getValue("spendenlink3")+'" target="_blank">'+GM_getValue("spendenlink3")+'</a><br>'
+'<select name="link3" id="link3" size="1"'
+'onchange="'+GM_getValue("spendenlink3")+'"'
+'<option value="">Kein Bild (Es wird Farbe geladen)</option>'
+'<option value="http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i44.tinypic.com/k00hap.png">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg3.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i30.tinypic.com/11uul4p.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph3.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i32.tinypic.com/125qq1d.jpg">Water By Pennerstirb</option>'
+'<option value="http://s5b.directupload.net/images/user/090711/z2pgymo6.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i28.tinypic.com/295a2w3.jpg">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink3")+'" target="_blank">"'+GM_getValue("spendenlink3")+'"</a><br>'

// content #########################################################
+'<span style="color: red;">Content(der Bauch):</span>'
//<input type="text" id="link4" size="60" value="'+GM_getValue("spendenlink4")+'" /> <a href="'+GM_getValue("spendenlink4")+'" target="_blank">'+GM_getValue("spendenlink4")+'</a><br>'
+'<select name="link4" id="link4" size="1"'
+'onchange="'+GM_getValue("spendenlink4")+'"'
+'<option value="">Kein Bild (Es wird farbe geladen)</option>'
+'<option value="http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i42.tinypic.com/3fwci.png">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg4.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i30.tinypic.com/1z5i3xf.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph4.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i25.tinypic.com/qr0jk7.png">Pulp Fiction</option>'
+'<option value="http://i27.tinypic.com/2hdck7r.png">Water By Pennerstirb</option>'
+'<option value="http://s7.directupload.net/images/user/090712/9ch3syzv.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i31.tinypic.com/14wzi54.jpg">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink4")+'" target="_blank">"'+GM_getValue("spendenlink4")+'"</a><br>'

// footer ##########################################################
+'<span style="color: red;">Footer( Fussende):</span>'
//<input type="text" id="link5" size="60" value="'+GM_getValue("spendenlink5")+'" /> <a href="'+GM_getValue("spendenlink5")+'" target="_blank">'+GM_getValue("spendenlink5")+'</a><br>'
+'<select name="link5" id="link5" size="1"'
+'onchange="'+GM_getValue("spendenlink5")+'"'
+'<option value="">Kein Bild (Es wird farbe geladen)</option>'
+'<option value="http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i40.tinypic.com/1twhg4.png">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg5.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i32.tinypic.com/2i0vhoh.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph5.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i25.tinypic.com/qr0jk7.png">Pulp Fiction</option>'
+'<option value="http://i29.tinypic.com/1z9gqx.png">Water By Pennerstirb</option>'
+'<option value="http://s4b.directupload.net/images/user/090712/mpvp5oqc.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i31.tinypic.com/j7fatc.jpg">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink5")+'" target="_blank">"'+GM_getValue("spendenlink5")+'"</a><br>'

// Copy ############################################################
+'<span style="color: red;">Copy(unter fuss):     </span>'
//<input type="text" id="link6" size="60" value="'+GM_getValue("spendenlink6")+'" /> <a href="'+GM_getValue("spendenlink6")+'" target="_blank">'+GM_getValue("spendenlink6")+'</a><br>'
+'<select name="link6" id="link6" size="1"'
+'onchange="'+GM_getValue("spendenlink6")+'"'
+'<option value="">Kein Bild (Es wird Farbe geladen)</option>'
+'<option value="http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg">Der Pate2 By lefty1981</option>'
+'<option value="http://i44.tinypic.com/15mojly.png">Der Pate1 By lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/pg6.jpg">Pinky by Wladi_aka_Hagen</option>'
+'<option value="http://i31.tinypic.com/1rx1ja.png">Pennerstyle by lefty1981</option>'
+'<option value="http://djhagen.dj.funpic.de/ph6.jpg">Pennerhack By Wladimir1991</option>'
+'<option value="http://i25.tinypic.com/qr0jk7.png">Pulp Fiction</option>'
+'<option value="http://i27.tinypic.com/2gud538.png">Water By Pennerstirb</option>'
+'<option value="http://i44.tinypic.com/15mojly.png">King by Kreuzbein_Maik</option>'
+'<option value="http://i28.tinypic.com/2edsj2h.jpg">Hamburger Sv by lefty1981</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'<option value="">Leer</option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lter Link zum Bild:</b></span><a href="'+GM_getValue("spendenlink6")+'" target="_blank">"'+GM_getValue("spendenlink6")+'"</a><br>'
/*






















Navigation: http://img.webme.com/pic/i/inters/pgnavileiste.png
Content: http://img.webme.com/pic/i/inters/pgvontent.png
Footer: http://img.webme.com/pic/i/inters/pgfooter.png
Background color: http://img.webme.com/pic/i/inters/pgbackground.png

document.getElementsByTagName('body')[0].style.background= "url( http://i39.tinypic.com/1zz28ao.png)";
//document.getElementsByTagName('body')[0].style.backgroundImage= "url( http://i39.tinypic.com/1zz28ao.png)";
document.getElementById("header").style.backgroundImage = "url( )";
document.getElementById("navigation").style.backgroundImage = "url( http://i40.tinypic.com/16iw9k3.png)";
document.getElementById("content").style.backgroundImage = "url( http://i40.tinypic.com/24qif05.png)";
document.getElementById("footer").style.backgroundImage = "url( http://i40.tinypic.com/1564mps.png)";

http://i40.tinypic.com/jkd4d3.jpg" target="_blank" class="postlink">Left Side</a>
http://i42.tinypic.com/2eeylo3.jpg" target="_blank" class="postlink">Right Side</a>
http://i44.tinypic.com/205avck.jpg" target="_blank" class="postlink">Middel</a>
http://i43.tinypic.com/hvz8e9.jpg" target="_blank" class="postlink">Foot</a>
http://s4b.directupload.net/images/user/090704/45soloxj.png" target="_blank" class="postlink">NAVILEISTE</a>
http://s8b.directupload.net/images/user/090704/jm7bf29c.png" target="_blank" class="postlink">LEISTE</a>
http://s8b.directupload.net/images/user/090704/me9uojgi.png" target="_blank" class="postlink">BODY</a>
http://s2.directupload.net/images/user/090704/d75xfkwo.png" target="_blank" class="postlink">FEADER</a>


http://s8b.directupload.net/images/user/090705/n8n6mqwl.png
http://s2.directupload.net/images/user/090705/7zs8b74u.png
http://s1b.directupload.net/images/user/090705/kscyhlqy.png
http://s2b.directupload.net/images/user/090705/2py5mehn.png
http://s6.directupload.net/images/user/090705/ofxof62s.png
http://s5b.directupload.net/images/user/090705/qwekzww3.png
http://s5.directupload.net/images/user/090705/62ddaxzs.png
http://s8b.directupload.net/images/user/090705/58uxo5aj.png

http://s8b.directupload.net/images/user/090706/6ux62b66.png
http://s4b.directupload.net/images/user/090706/6ux62b66.png

 parte 2 by lefty1981


Body(Hintergrund: http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Header:Kopfteil : http://i28.tinypic.com/15wi9t5.jpg
Navigation : http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Content(der Bauch): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Footer( Fussende): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Copy(unter fuss): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg


nenne es bitte "Der Pate2"  alte version by lefty1981

Body(Hintergrund: http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Header:Kopfteil : http://www.thegodfathertrilogy.com/wallpaper/gf1_1024_theboys.jpg
Navigation : http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Content(der Bauch): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Footer( Fussende): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg
Copy(unter fuss): http://www.ariostea.biz/images/materiali/2/black_ardesia_02_big.jpg

*/







// farbe body
+'<span style="color: red;">Body Farbe :          </span>'
//<input type="text" id="link7" size="60" value="'+GM_getValue("spendenlink7")+'" /> <a href="'+GM_getValue("spendenlink7")+'" target="_blank">'+GM_getValue("spendenlink7")+'</a><br>'
+'<select name="link7" id="link7" size="1"'
+'onchange="'+GM_getValue("spendenlink7")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T?rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink7")+'" target="_blank">"'+GM_getValue("spendenlink7")+'"</a><br>'
// farbe headerr
+'<span style="color: red;">Header Farbe:         </span>'
//<input type="text" id="link8" size="60" value="'+GM_getValue("spendenlink8")+'" /> <a href="'+GM_getValue("spendenlink8")+'" target="_blank">'+GM_getValue("spendenlink8")+'</a><br>'
+'<select name="link8" id="link8" size="1"'
+'onchange="'+GM_getValue("spendenlink8")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T?rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink8")+'" target="_blank">"'+GM_getValue("spendenlink8")+'"</a><br>'

// farbe navigation
+'<span style="color: red;">Navigation Farbe:     </span>'
//<input type="text" id="link9" size="60" value="'+GM_getValue("spendenlink9")+'" /> <a href="'+GM_getValue("spendenlink9")+'" target="_blank">'+GM_getValue("spendenlink9")+'</a><br>'
+'<select name="link9" id="link9" size="1"'
+'onchange="'+GM_getValue("spendenlink9")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T?rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink9")+'" target="_blank">"'+GM_getValue("spendenlink9")+'"</a><br>'

// farbe content 
+'<span style="color: red;">Content Farbe:        </span>'
//<input type="text" id="link10" size="60" value="'+GM_getValue("spendenlink10")+'" /> <a href="'+GM_getValue("spendenlink10")+'" target="_blank">'+GM_getValue("spendenlink10")+'</a><br>'
+'<select name="link10" id="link10" size="1"'
+'onchange="'+GM_getValue("spendenlink10")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T?rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink10")+'" target="_blank">"'+GM_getValue("spendenlink10")+'"</a><br>'

// frabe footer
+'<span style="color: red;">Footer Farbe :        </span>'
//<input type="text" id="link11" size="60" value="'+GM_getValue("spendenlink11")+'" /> <a href="'+GM_getValue("spendenlink11")+'" target="_blank">'+GM_getValue("spendenlink11")+'</a><br>'
+'<select name="link11" id="link11" size="1"'
+'onchange="'+GM_getValue("spendenlink11")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T?rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink11")+'" target="_blank">"'+GM_getValue("spendenlink11")+'"</a><br>'

// farbe copy
+'<span style="color: red;">Copy Farbe :          </span>'
//<input type="text" id="link12" size="60" value="'+GM_getValue("spendenlink12")+'" /> <a href="'+GM_getValue("spendenlink12")+'" target="_blank">'+GM_getValue("spendenlink12")+'</a><br>'
+'<select name="link12" id="link12" size="1"'
+'onchange="'+GM_getValue("spendenlink12")+'"'
+'<option value="">Keine Farbe</option>'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste TUrkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><span style=\"color:blue; font-size:100%;\"><b>Aktuelle gew&auml;lte Farbe:</b></span><a href="'+GM_getValue("spendenlink12")+'" target="_blank">"'+GM_getValue("spendenlink12")+'"</a><br>'


// ende des drop down menueses
+'<a href="http://pennergame.de/overview/" target="_blank"><span style=\"color:green; font-size:150%;\"><b><br>Klicke hier um jetzt dein style zu betrachten</a></b></span><br>'
+'<a href="http://pennerhack.foren-city.de/topic,561,120,-pennergame-design.html#2131" target="_blank"><span style=\"color:orange; font-size:150%;\"><b><br>Ist der Style gut geworden ?<br>Wollt ihr den Hersteller ein Lob geben<br>Dann schreibe und/ihn hier:<br>Bitte klicke <span style=\"color:blue; font-size:200%;\"><b>HIER</b></span></a></b></span><br>'

//+'<br><br><span style=\"color:red; font-size:120%;\"><b>In diesen riesen Feld k&ouml;nnt ihr Speichern was ihr wollt zb die ganzen links der bilder</b></span><br>'
//+'<td><br><textarea id="link13" cols="100" rows="40">'+GM_getValue("spendenlink13")+'</textarea><br><br>'

+'<span style=\"color:yellow; font-size:100%;\"><b>Script Copyright by Basti1012</b></span><br>'
+'<span style=\"color:green; font-size:100%;\"><b>Alien = Copyright by Basti1012</b></span><br>'
+'<span style=\"color:orange; font-size:100%;\"><b>Der Pate = Copyright by lefty1981</b></span><br>'
+'<span style=\"color:green; font-size:100%;\"><b>Pinky = Copyright by Wladi_aka_Hagen</b></span><br>'
+'<span style=\"color:orange; font-size:100%;\"><b>Water = Copyright by Pennerstirb</b></span><br>'
+'<span style=\"color:green; font-size:100%;\"><b>Pennerhack style = Copyright by Wladimir1991</b></span><br>'
+'<span style=\"color:orange; font-size:100%;\"><b>King = by Kreuzbein_Maik</b></span><br>'
+'<span style=\"color:green; font-size:100%;\"><b>Pulp Fiction = by lefty1981</b></span><br>'
+'<span style=\"color:orange; font-size:100%;\"><b>Pennerstyle by lefty1981</b></span><br>'
+'<span style=\"color:green; font-size:100%;\"><b>Hamburger SV = by lefty1981</b></span><br>'

+'<span style=\"color:red; font-size:120%;\"><b>Habt ihr auch ein Style entworfen und wollt namentlich genannt werden dann schick mir die links der Bilder mit den Style Namen und euren Namen der im Script stehen soll zu .Jede bidee wird genommen hauptsache es bsind keine Fehler beim Anzeigen da dert Style selber ist egal es soll jja f&uuml;r jeden was dabei sein auch wenn es ein Barbie Style ist es gibt auch 12 j&auml;hrige M&Auml;dchen die das Spiel Spielen und sich &Uuml;ber ein Barbie Style freuen w&uuml;rden.Also egal was Hauptsachen der Style sieht Optisch gut aus und es sind keine Fehler dabei <br>Mfg Basti1012</b></span><br>'

//+'<br><br><span style=\"color:red; font-size:120%;\"><b> Ich hoffe der Platz reicht euch sonst muss ich das ding noch groesser bauen mfg hack</b></span><br>'
+'<span style=\"color:white; font-size:100%;\"><b>Habt ihr noch ideen?<br>K&ouml;nnt ihr auch solche Bilder machen?<br>Wollt ihr auch ein Style bauen und sollim n&auml;sten update hier sein?<br>Dann schreib uns deine Fragen und Probleme oder ideen hier.</b></span><br>'
+'<td><span style=\"color:yellow; font-size:100%;\"><b>Betreff : Pennergame Style Script Frage</b></span><br><textarea id="link15" cols="100" rows="4">'+GM_getValue("spendenlink15")+'</textarea><br><br><input type="button" name="senden" value="Nachricht an Basti1012 Senden" /><br><span style=\"color:blue; font-size:120%;\"><b>'
+'<span style=\"color:blue; font-size:120%;\"><b>Copyright by Basti1012 & Und die Style Hersteller</b></span></td><br>';









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

   //   var spendenlink13 = document.getElementById('link13').value;
   //   GM_setValue("spendenlink13" , spendenlink13);

      var spendenlink14 = document.getElementById('link14').value;
      GM_setValue("spendenlink14" , spendenlink14);

      var spendenlink15 = document.getElementById('link15').value;
      GM_setValue("spendenlink15" , spendenlink15);

alert("DIE LINKS WURDEN GESPEICHERT VIEL GLUECK MIT DEN NEUEN STYLE \n MFG BASTI");
location.reload();
},false);














document.getElementsByName('senden')[0].addEventListener('click', function change_plunder () {

var spendenlink15 = document.getElementById('link15').value;
GM_setValue("spendenlink15" , spendenlink15);

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://www.pennergame.de/messages/write/send/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('f_toname=id:2475010&f_subject=PennergameStylingScriptfrage&f_text='+GM_getValue("spendenlink15")+'&f_did=&submit=Nachricht+verschicken'),
      onload: function(responseDetails) 


	  { 
window.location.reload();alert("Es wurde eine Nachricht mit den inhalt von \n\nBetreff:\n"+GM_getValue("spendenlink15")+"");
      }
  });

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
var spende15 = GM_getValue("spendenlink15");
// Copyright By Basti1012 dieses Script ist ein update von version 1 auf 2


