// ==UserScript==
// @name           Super Highscore Geld und Gegnersuche pennergame hamburg und berlin  4.0 version 2
// @namespace      sucht gegner nach geld und nach punkten (schneller als je zu vor ).
// @author         Basti1012
// @include        *www.pennergame.de/highscore/*
// @include        *berlin.pennergame.de/highscore/*
// ==/UserScript==




var url = document.location.href;
if (url.indexOf("http://www")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
var siglink = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}


var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="PennergameSpam1" id="PennergameSpam1" alt="PennergameSpam1" title="Pennergame Spam" <span class="btn-right"><span class="btn-left">Bastis Gegner suche</span></span></a></li>';
document.getElementById('PennergameSpam1').addEventListener('click', function linktklickerone() {

var anleitung = '<div align="left" name="sbalki" id="sbalki"></div><br><br>';

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/fight/overview/',
			onload: function( response ) {
				var lf = response.responseText;
				var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
				var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
        			hs2 = Math.round(attmin*1.25/3);
				GM_setValue("attmax" , attmax);
				GM_setValue("attmin" , attmin);
				GM_setValue("money" , hs2);
						}
			});

var knopfe ='Min-Punkte f&uuml;r gezielte suche:<input name="min_points" id="min_points" maxlength="11" size="7" value="'+GM_getValue("attmin")+'" type="text" /><br>'
+'Max-Punkte f&uuml;r gezielte suche:<input id="max_points" name="max_points" maxlength="11" size="7" value="'+GM_getValue("attmax")+'" type="text" /><br> '
+'Geldangabe:<input id="geld" name="geld" maxlength="11" size="7" value="'+GM_getValue("geld")+'" type="text" /><br> '
+'Menge der Seiten die durchsucht werden sollen (5):<input id="menge" name="menge" maxlength="3" size="4" value="'+GM_getValue("menge")+'" type="text" /><br> '
+'<input type="button" id="geldsucher" name="geldsucher" value="gegner mit euren Einstellungen suchen " /><br>'
+'<div align="left" name="wasgeht" id="wasgeht"></div>';

var inhalt = '<div class="settingpoint"><table border="0" cellspacing="0" cellpadding="0">'
+'<td width="500" height="70"><tr>'
+'<div align="left" name="sbalki" id="sbalki"></div><br><div align="left" name="sbalkia" id="sbalkia"></div>'
+''+knopfe+'</div></td></tr>';

var tr = document.getElementsByClassName('zrelative sitdown')[0];
	tr.innerHTML = ''+anleitung+''+inhalt+'<table class="list" border="1" width="1490"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="30">Id</th>'
	+'<th align="center" width="50">promille</th>'
	+'<th align="center" width="270">Profillink</th>'
	+'<th align="center" width="50">Rankink</th>'
	+'<th align="center" width="80">Platz</th>'
	+'<th align="center" width="80">Punkte</th>'
	+'<th align="center" width="80">Reg</th>'
	+'<th align="center" width="100">Geld</th>'
	+'<th align="center" width="130">Stadt</th>'
	+'<th align="center" width="100">Status</th>'
	+'<th align="center" width="100">Joined</th>'
	+'<th align="center" width="200">Bandenlinj</th>'
	+'<th align="center" width="120">Tier</th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"></th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/img/overview/new_msg.gif"></th>'
	+'<th align="center" width="15">g</th>'
	+'<th align="center" width="15">o</th>'
	+'</tr>' ;

document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
	var menge = document.getElementById('menge').value;
	  var max = document.getElementById('max_points').value;
	  var min = document.getElementById('min_points').value;
	 var geld = document.getElementById('geld').value;
	GM_setValue("max" , max);
	GM_setValue("min" , min);
	GM_setValue("menge" , menge);
	GM_setValue("geld" , geld);
	x=1;
	i=1;
	z=1;
	seitenwahl(x,i,z);
},false);

function seitenwahl(x,i,z){
	var mengea = GM_getValue("menge");
		if(i<=Number(mengea)){
		i++;
		anfang(x,i,z);
	}else{
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:200%;\"><b>Habe fertig gescannt</b></font>';
	}
}

function anfang(x,i,z){

	var max = GM_getValue("max");
	var min = GM_getValue("min");
	var menge = GM_getValue("menge");
	var geld = GM_getValue("geld");

document.getElementsByName('wasgeht')[0].innerHTML = '<font style=\"color:red; font-size:200%;\"><b>Suche inerhalb Min: '+min+' Max: '+max+' Punkte .Nach minimum Geld: '+geld+' &euro; durchsuche '+menge+' Seiten.</b></font>';



	GM_xmlhttpRequest({
       		method: 'GET',
            	url: ''+link+'/highscore/user/'+i+'/?max='+max+'&min='+min+'',
            	//url: 'http://www.pennergame.de/highscore/user/'+i+'/?max=1&min=111111',
             			onload: function(responseDetails) {
            			 var content = responseDetails.responseText;
					for (var x = 1; x<=20; x++){
						if(x>=20){
						seitenwahl(x,i,z);
					}
				var table = content.split('id="stadtteil"><div>Stadtteil</div>')[1];
				var table1 = table.split('<div id="pagination">')[0];
				var feld = table1.split('class="col1')[x];
				var feld1 = feld.split('</tr>')[0];
				var id = feld1.split('<a href="/profil/id:')[1];
				var id2 = id.split('/')[0];
				z++;
				var mengea = GM_getValue("menge");
			var prozi2 = Math.round(mengea*19)
			GM_setValue("prozi2" , prozi2);
			var prozi1 = Math.round((100/prozi2)*10)/10
			var prozi = Math.round(prozi1*z)
			var balki = Math.round(prozi*3)
document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; ['+prozi+'%] Suche bei '+z+' von '+prozi2+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';
mitte(id2,x,z);
		}
	}});
}

function mitte(id2,x,z){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+id2+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var nam = dom.getElementsByTagName('name')[0].textContent;
			var id = dom.getElementsByTagName('id')[0].textContent;
			var platz = dom.getElementsByTagName('position')[0].textContent;
			var punkte = dom.getElementsByTagName('points')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;

				try{
					var cash = dom.getElementsByTagName('cash')[0].textContent/100;
				}catch(e){
					cash='- - -';
				}

				try{
					var bande = dom.getElementsByTagName('name')[1].textContent;
					var bandeid = dom.getElementsByTagName('id')[1].textContent;
					var status = dom.getElementsByTagName('status')[0].textContent;
					var joined = dom.getElementsByTagName('joined')[0].textContent;
					var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
				}catch(e){
				var bandeergebniss = '- - -';
				}
        if (status==3) {
       	var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
        }
        else if (status==2) {
        var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
        }
        else if (status==1) {
        var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
        }
        else if (status==0) {
        var statu = 'No Bande';
};
	try{
		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
	}catch(e){
		var promille = '- - -';
	}



var fight ='<a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';

if (cash <= 111111){
farbe1 = "black";}
if (cash <= 99999){
var farbe1 = "gray";}
if (cash <= 77777){
farbe1 = "blue";}
if (cash <= 66666){
var farbe1 = "cyan";}
if (cash <= 55555){
farbe1 = "red";}
if (cash <= 44444){
var farbe1 = "green";}
if (cash <= 33333){
farbe1 = "magenta";}
if (cash <= 22222){
farbe1 = "orange";}
if (cash <= 11111){
var farbe1 = "yellow";}
if (cash <= 1111){
var farbe1 = "white";}







GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/profil/id:' + id + '/',
onload: function(responseDetails) {
			var content = responseDetails.responseText;

			var suche = content.search("Ist gerade Online");
			try{
			if (suche != -1) {
			var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
			}
			else {
			var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			};
			}catch(e){
			var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
			}


      try{
      var location1 = content.split('Stadtteil</strong>')[1];
      var location2 = location1.split('bgcolor="#232323">')[1];
      var stadt = location2.split('</td>')[0];
      }catch(e){
      var stadt ='<font style=\"color:green; font-size:100%;\">Premium</font>';   
}   











try{
    var hausi5 = content.split('margin-top:12px;">')[1];
    var hausi3 = hausi5.split('</div>')[0];
    var hausi4 = hausi3.split('<img src="')[1];
    var hausi2 = hausi4.split('"')[0];

if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg'){var petname = 'Nashorn';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg'){var petname = 'Tiger';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg'){var petname = 'Krokodil';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg'){var petname  = "Giraffe";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg'){var petname  = "Nilpferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg'){var petname  = "Pferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg'){var petname  = "Chihuahua";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg'){var petname  = "Pitbull";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg'){var petname  = "Adler";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg'){var petname  = "Pudel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg'){var petname  = "Hausziege";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg'){var petname  = "Schlange";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg'){var petname  = "Falke";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg'){var petname  = "Katze";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg'){var petname  = "Frettchen";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg'){var petname  = "Hase";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg'){var petname  = "Ratte";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg'){var petname  = "Taube";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg'){var petname  = "Wellensittich";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg'){var petname  = "Hamster";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg'){var petname  = "Maus";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg'){var petname  = "Goldfisch";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg'){var petname  = "Kakerlake";}



else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg'){var petname = "Silberfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg'){var petname = "Grasfrosch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg'){var petname = "Rotkelchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg'){var petname = "Clownfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg'){var petname = "Erdm?nnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg'){var petname = "M?we";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg'){var petname = "Opossum";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg'){var petname = "Streifenh?rnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg'){var petname = "Igel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg'){var petname = "Hausschwein";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg'){var petname = "Schneeeule";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg'){var petname = "Bisamratte";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg'){var petname = "Moorschnucke";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg'){var petname = "Yorkshire Terrier";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg'){var petname = "Habicht";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg'){var petname = "Collie";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg'){var petname = "Dogge";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg'){var petname = "Retriever";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg'){var petname = "Mops";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg'){var petname = "Elch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg'){var petname = "Zebra";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg'){var petname = "Kamel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg'){var petname = "Riesenschildkr?te";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg'){var petname = "Leopard";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg'){var petname = "Waschb?r";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg'){var petname = "Maus (Geld)";}








var suche = content.search("selbsterstelltes Haustier");
if (suche != -1) {
   var hausi55 = content.split('selbsterstelltes Haustier')[2];
   var hausi33 = hausi55.split('Haustier zu erstellen')[0];
   var hausi555 = hausi33.split('<b>')[1];
   var hausi33 = hausi555.split('</b>')[0];
var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
}
}catch(e){
var petname = '--';}


try {
var geschlecht2 = content.split('<img src="http://media.pennergame.de/img/profilseite/')[1];
var geschlecht  = geschlecht2.split('.jpg"')[0];
var geschlecht_image = '<div style="display:inline-block;"><img src="http://media.pennergame.de/img/profilseite/' + geschlecht + '.jpg" height="12" width="12"></img></div>&nbsp;&nbsp;';
} catch(err) {
var geschlecht_image = '<font style=\"color:green; font-size:100%;\">[X]</font>';
}   









var geld = GM_getValue("geld" , geld);
if (cash >= Number(geld)){
			tr.innerHTML += '<table class="list" border="1" width="1490"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="30">'+z+'</th>'
			+'<th align="center" width="50">'+promille+'</th>'
			+'<th align="center" width="270"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" width="50">'+rankingpoints+'</th>'
			+'<th align="center" width="80">'+platz+'</th>'
			+'<th align="center" width="80">'+punkte+'</th> '
			+'<th align="center" width="80">'+reg+'</th>'
			+'<th align="center" width="100"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" width="130">'+stadt+'</th>'
			+'<th align="center" width="100">'+statu+'</th>'
			+'<th align="center" width="100">'+joined+'</th>'
			+'<th align="center" width="200">'+bandeergebniss+'</th>'
			+'<th align="center" width="120">'+petname+'</th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="15">'+geschlecht_image+'</th>'
			+'<th align="center" width="15">'+online2a+'</th>'

			+'</tr></tbody></table>';
}

var prozi2 = GM_getValue("prozi2" , prozi2);
if(z >= prozi2){
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:300%;\"><b>Habe fertig gescannt</b></font>';
}
}});
}});
}
},false);