// ==UserScript==
// @name           BandenprofilSuperScript By basti1012 berlin (2)
// @namespace      Bandeprofilscript mit umrechner auf 3 uhr und zeigt an wie der fight status ist 
// @author         basti1012 pennerhack.foren-city.de
// @description    Erweitert die Bandenprofilansicht um einige punkte ,es ist eine erleichteung eingebaut wie und em man angreifen kann und so weiter
// @include        http://*berlin.pennergame.de/profil/bande:*
// ==/UserScript==
starten();
function starten(){

GM_xmlhttpRequest({
  	method: 'GET',
	url: 'http://berlin.pennergame.de/overview/',
	onload: function(responseDetails) {
         var profil = responseDetails.responseText;

	var stadtteil2 = profil.split('<img class="nickimg" border="0" src="http://www.pennergame.de/headline/')[1];
	var userid = stadtteil2.split('/?size=34" /></a>')[0];



go2(userid);
}});

}

var table = document.getElementsByTagName("table")[2];
var tr = table.getElementsByTagName("tr");
var sigurl = "http://imgberlin.pennergame.de/cache/bl_DE/signaturen/";

function go2(userid){



for (var x = 0; x <= tr.length; x++) {
		var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:')[1];
		tr[x].getElementsByTagName("td")[1].style.width = '100px';
		tr[x].style.valign = "middle";
		var id = text1.split('/">')[0];

		var punkte = tr[x].getElementsByTagName("td")[2].innerHTML.split('<div align="right">');
		var punkte2 = punkte[1].split('</div>')[0];









	profil(id,x);
	api(x,id,punkte2,userid);
}

}









function profil(id,x) {

//alert(id);
 GM_xmlhttpRequest({
  	method: 'GET',
	url: 'http://berlin.pennergame.de/profil/id:'+id+'/',
	onload: function(responseDetails) {
         var profil = responseDetails.responseText;
try{
			      var stadtteil3 = profil.split('Stadtteil')[1];
			      var stadtteil2 = stadtteil3.split('">')[1];
		              var stadtteil = stadtteil2.split('<')[0];
}catch(e){}
  			    var suche = profil.search("Ist gerade Online");
try{
	  		    if (suche != -1) {
var online = "<img src='http://media.pennergame.de/img/on.gif'></img>";
			      }
			      else {
var online = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			      };

}catch(e){}

newtd1 =document.createElement('td');
newtd2 = document.createElement('td');
newtd3 = document.createElement('td');
newtd4 = document.createElement('td');



try {

var stadtteil3 = profil.split('<strong>&nbsp;Punkte</strong></td>')[1];
var a = stadtteil3.split('<td height="24" colspan="4" bgcolor')[0];
		  //            var b = a.split('src="http://www.pennergame.de/headline/')[1];
		//	      var g = b.split('/?')[0];

		              var b = a.split('<img src="')[1];
			      var hausi2 = b.split('"></div>')[0];


if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg')
{
var petname = "Silberfisch";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg')
{
var petname = "Grasfrosch";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg')
{
var petname = "Rotkelchen";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg')
{
var petname = "Clownfisch";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg')
{
var petname = "Erdm?nnchen";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg')
{
var petname = "M?we";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg')
{
var petname = "Opossum";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg')
{
var petname = "Streifenh?rnchen";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg')
{
var petname = "Igel";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg')
{
var petname = "Hausschwein";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg')
{
var petname = "Schneeeule";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg')
{
var petname = "Bisamratte";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg')
{
var petname = "Moorschnucke";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg')
{
var petname = "Yorkshire Terrier";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg')
{
var petname = "Habicht";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg')
{
var petname = "Collie";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg')
{
var petname = "Dogge";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg')
{
var petname = "Retriever";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg')
{
var petname = "Mops";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg')
{
var petname = "Elch";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg')
{
var petname = "Zebra";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg')
{
var petname = "Kamel";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg')
{
var petname = "Riesenschildkr?te";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg')
{
var petname = "Leopard";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg')
{
var petname = "Waschb?r";
};
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg')
{
var petname = "Maus (Geld)";
};

}catch (err){
newtd4.style.color = "#DF3918";
var petname = '<em>Deaktiviert</em>';
}

		try {
     		 	var geschlecht2 = profil.split('<img src="http://mediaberlin.pennergame.de/img/profilseite/')[1];
      			var geschlecht  = geschlecht2.split('.jpg"')[0];
      			} catch(err) {
      			var geschlecht ='Kein geschlecht';
}   
		var geschlecht_image = '<div style="display:inline-block;"><img src="http://mediaberlin.pennergame.de/img/profilseite/' + geschlecht + '.jpg" height="12" width="12"></img></div>';






newtd1.innerHTML = geschlecht_image;

newtd2.innerHTML = online;
newtd3.innerHTML = stadtteil;
newtd4.innerHTML = petname;

tr[x].insertBefore(newtd2, tr[x].getElementsByTagName('td')[7]);
tr[x].insertBefore(newtd3, tr[x].getElementsByTagName('td')[8]);
tr[x].insertBefore(newtd4, tr[x].getElementsByTagName('td')[9]);



tr[x].insertBefore(newtd1, tr[x].getElementsByTagName('td')[5]);


			}
		}); 
}
























function api(x,id,punkte2,userid){

var newtd11 = document.createElement('td');
var newtd12 = document.createElement('td');
var newtd13 = document.createElement('td');
var newtd14 = document.createElement('td');

var newtd15 = document.createElement('td');

var newtd16 = document.createElement('td');
var newtd10 = document.createElement('td');


 GM_xmlhttpRequest({
 	method: 'GET',
   	url: 'http://www.berlin.pennergame.de/dev/api/user.'+id+'.xml',
	onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
 	var userpoints = dom.getElementsByTagName('points')[0].textContent;
	var max = Math.floor(userpoints*1.5);
	var min = Math.floor(userpoints*0.8);
 	var name = dom.getElementsByTagName('name')[0].textContent;

 GM_xmlhttpRequest({
  	method: 'GET',
	url: 'http://berlin.pennergame.de/highscore/search/?name='+name+'',
	onload: function(responseDetails) {
         var profil = responseDetails.responseText;
try{
			    var uhrdrei1 = profil.split('<tr class="zeileB">')[1];
			    var uhrdrei2 = uhrdrei1.split('</td></tr>')[0];
			    var uhrdrei3 = uhrdrei2.split('valign="bottom" >')[4];
		            var uhrdrei4 = uhrdrei3.split('&nbsp;</td>')[0];

}catch(e){}


if ((min <= userpoints) && (userpoints <= max) && (parseInt(userpoints - userpoints * 0.2) > userid)) {
var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/gelbq62f85lu.jpg" height="12" width="12"></img></div>';
}
if ((min <= userpoints) && (userpoints <= max) && (userid > userpoints)) {
var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/grueenjg0wkviy.jpg" height="12" width="12"></img></div>';
}
if ((min <= userpoints) && (userpoints <= max) && (userid < userpoints)) {
var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/rot23djkrpo.jpg" height="12" width="12"></img></div>';
}

if (userpoints == userid){
var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/blauzqgbamuo.jpg" height="12" width="12"></img></div>';
}
if ((parseInt(userpoints - userpoints * 0.2) <= userid) && (userid <= parseInt(userpoints + userpoints * 0.5))){
var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/schwarz13smftjw.jpg" height="12" width="12"></img></div>';
}//else{
//var kampfa = '<div style="display:inline-block;"><img src="http://www.fotos-hochladen.net/schwarz13smftjw.jpg" height="12" width="12"></img></div>';
//}



newtd17 = document.createElement('td');
neu = userpoints-uhrdrei4;
if(neu>0){
var neua = '<font style=\"color:green; font-size:100%;\"><b>'+neu+'</b></font>';
	var punkti = '<img src="http://www.fotos-hochladen.net/grueenjg0wkviy.jpg" height="12" width="12"></img>';

}else
if(neu<0){
var neua = '<font style=\"color:red; font-size:100%;\"><b>'+neu+'</b></font>';
	var punkti = '<img src="http://www.fotos-hochladen.net/rot23djkrpo.jpg" height="12" width="12"></img>';
}else
var neua = '<font style=\"color:yellow; font-size:100%;\"><b>'+neu+'</b></font>';
if(neu==0){
	var punkti = '<img src="http://www.fotos-hochladen.net/gelbq62f85lu.jpg" height="12" width="12"></img>';
}



try {
var cash = dom.getElementsByTagName('cash')[0].textContent/100;

var highlightita = 5000;
var highlightit0 = 5001;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

if (cash <= highlightita){
newtd16.style.color = "white";
}
if (cash >= highlightit0){
newtd16.style.color = "#F91805";
}
if (cash >= highlightit1){
newtd16.style.color = "#EE4611";
}
if (cash >= highlightit2){
newtd16.style.color = "#F6A008";
}
if (cash >= highlightit3){
newtd16.style.color = "#D9EA14";
}
if (cash >= highlightit4){
newtd16.style.color = "#0EF905";
}
if (cash >= highlightit5){
newtd16.style.color = "#450FEF";
}


} catch(err) {
var cash = '--';

//var promillesig = '--';
//var geldsig = '--';


}



try{ 
//var geldsig = "<div style='overflow: hidden; width: 80px; height: 16px;'><img style='position: relative; top: -22px; left: -95px;' src='http://img.pennergame.de/cache/bl_DE/signaturen/" + id + ".jpg'></div>";
var promillesig = "<div style='overflow: hidden; width: 40px; height: 13px;'><img style='position: relative; top: -42px; left: -120px;' src='http://img.pennergame.de/cache/bl_DE/signaturen/" + id + ".jpg'></div>";





		//var geldsig = "<div style='overflow: hidden; width: 100px; height: 16px;'><img style='position: relative; top: -22px; left: -95px;' src='http://img.pennergame.de/cache/bl_DE/signaturen/" + id + ".jpg'></div>";
		//var promillesig = "<div style='overflow: hidden; width: 100px; height: 19px;'><img style='position: relative; top: -40px; left: -90px;' src='http://img.pennergame.de/cache/bl_DE/signaturen/" + id + ".jpg'></div>";
}catch(e){
		var promillesig = 'Deaktiviert';
		//var geldsig = 'Deaktiviert';
}











var reg = dom.getElementsByTagName('reg_since')[0].textContent;
var position = dom.getElementsByTagName('position')[0].textContent;


message = '<a href="/messages/write/?to='+id+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
fight = '<a href="/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';















var newtd5 = document.createElement('td');





newtd5.innerHTML = promillesig;

newtd11.innerHTML=uhrdrei4;
newtd12.innerHTML=kampfa;
newtd14.innerHTML=reg;

newtd13.innerHTML=punkti;
newtd17.innerHTML = neua;





newtd10.innerHTML=fight;
newtd16.innerHTML=''+cash+'&euro;';
newtd15.innerHTML=message;
tr[x].insertBefore(newtd5, tr[x].getElementsByTagName('td')[6]);

tr[x].insertBefore(newtd11, tr[x].getElementsByTagName('td')[11]);
tr[x].insertBefore(newtd12, tr[x].getElementsByTagName('td')[12]);
tr[x].insertBefore(newtd14, tr[x].getElementsByTagName('td')[14]);
tr[x].insertBefore(newtd13, tr[x].getElementsByTagName('td')[13]);
tr[x].insertBefore(newtd17, tr[x].getElementsByTagName('td')[15]);




tr[x].insertBefore(newtd10, tr[x].getElementsByTagName('td')[10]);
tr[x].insertBefore(newtd16, tr[x].getElementsByTagName('td')[16]);
tr[x].insertBefore(newtd15, tr[x].getElementsByTagName('td')[15]);

}});
}});

}


//var newtd1 = document.createElement('table');

//var table = document.getElementsByTagName("table")[2];
//table[2].innerHTML ='sdsssssssssssssssss';

//tr[1].insertBefore(newtd1, tr[1].getElementsByTagName('tr')[1]);




var newdiv = document.createElement('div');
newdiv.setAttribute('style', 'padding-bottom:10px;padding-left:30px;margin-top:-20px;color:#fff;background:url(http://media.pennergame.de/img/content_31.jpg);position:relative;');
newdiv.innerHTML = '<br><strong>Hilfe zu den Symbolen Userpunkte und Angreifen</strong>'
+'<br><img src="http://www.fotos-hochladen.net/gelbq62f85lu.jpg"      height="12" width="12"></img></div>Diesen Spieler kannst du angreifen. Er hat mehr Punkte, kann dich aber nicht angreifen'
+'<br><img src="http://www.fotos-hochladen.net/grueenjg0wkviy.jpg"    height="12" width="12"></img></div>Diesen Spieler kannst du angreifen. Hat weniger Punkte als Du.'
+'<br><img src="http://www.fotos-hochladen.net/rot23djkrpo.jpg"       height="12" width="12"></img></div>Diesen Spieler kannst du angreifen. Hat mehr Punkte als Du.'
+'<br><img src="http://www.fotos-hochladen.net/blauzqgbamuo.jpg" height="12" width="12"></img></div>Du kannst ihn nicht angreifen, weil du zu viel Punkte hast. Aber er kann Dich angreifen, weil Du in seinem Punktebereich bist.'
+'<br><img src="http://www.fotos-hochladen.net/schwarz13smftjw.jpg"   height="12" width="12"></img></div>Kann nicht angegriffen werden, da der Gegner nicht in deinem Punktebereich liegt.'

+'<br><strong>Hilfe zu den Symbolen Punkte unterschied von jetzt und heute Nacht um 3</strong><br>'


+'<br><img src="http://www.fotos-hochladen.net/gelbq62f85lu.jpg" height="12" width="12"></img></div>Dieser Spieler hat bis jetzt keine Punkte gewonnen oder verloren'
+'<br><img src="http://www.fotos-hochladen.net/grueenjg0wkviy.jpg" height="12" width="12"></img></div>Dieser Spieler hat bis jetzt Punkte dazugewonnen(Hochfighter)'
+'<br><img src="http://www.fotos-hochladen.net/rot23djkrpo.jpg" height="12" width="12"></img></div>Dieser Spieler hat bis jetzt Punkte veloren und ist wahrscheinlich beim Runter fighten(Runterfighter)';

document.getElementById("fix").insertBefore(newdiv, document.getElementById("footer"));

























