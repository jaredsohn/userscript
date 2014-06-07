// ==UserScript==
// @name           Highscoresuperscript_v40_pennergame_4.0_Hamburg_u_Berlin
// @namespace      zeigt in highscore geld promille onlinstatus und alle Tiere und vieles mehr an fuer hamburg und berlin geleichzeitig 
// @author         basti1012 pennerhack.foren-city.de
// @include        *pennergame.de/highscore/user/*
// @include        *pennergame.de/highscore/joindate/*
// @exclude        http://pennergame.de/highscore/gang/*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var apiurl = 'http://berlin.pennergame.de/dev/api/';
  var mediaurl = 'http://mediaberlin.pennergame.de/img/';
  var pgurl = 'http://berlin.pennergame.de/';
  var sigurl = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}

else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var apiurl = 'http://www.pennergame.de/dev/api/';
  var mediaurl = 'http://media.pennergame.de/img/';
  var pgurl = 'http://www.pennergame.de/';
  var sigurl = 'http://inodes.pennergame.de/de_DE/signaturen/';
};

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl+'/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('<a href="/profil/id:')[2];
			var userid = text1.split('/">')[0];
			var userp = content.split('src="http://www.pennergame.de/headline/')[2];
			var userpoints = userp.split('/?size=34"')[0];
      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);

}});


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
var ueber = document.getElementsByTagName("table")[0];
var ueber1 = ueber.getElementsByTagName("tr")[0];
var ueber2 = ueber1.getElementsByTagName("th")[1];
var ueber5 = ueber1.getElementsByTagName("th")[2];
var ueber3 = ueber2.innerHTML = 'Pennerinfos (Api)';
var ueber4 = ueber5.innerHTML = 'Bandeninfos (Api)';

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Sms";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[5]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Angriff";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "3 Uhr Punkte";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ergeniss";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[8]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Online";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[9]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Promille";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[10]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Geld";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[11]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ranking";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[12]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Tier";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[13]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Plunder";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[14]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "SpielePlunder";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[15]);

var laenge = tr.length;
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
var my_tablesa = document.getElementsByTagName("table")[0];

for (var x = 1; x<=laenge-1; x++){
	a= x-1;
	var my_tables = my_tablesa.getElementsByTagName("tr")[x];
	var my_td4 = my_tables.getElementsByTagName("td")[1];
	var my_td5 = my_tables.getElementsByTagName("td")[2];
	var my_td6 = my_tables.getElementsByTagName("td")[3];
	var my_td3 = my_tables.getElementsByTagName("td")[4];
	var my_td8 = my_tables.getElementsByTagName("td")[5];

var id2 = my_td4.innerHTML.split('<a href="/profil/id:')[1].split('/')[0];
var dreiuhr = my_td3.innerHTML.split('class="col5">')[0].split('<')[0];

try{
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id2 + '.jpg"></div>';
}catch(e){
promillee='-';
}

my_td8.innerHTML =promillee;
online_geschlecht(id2,x,my_td6);
cashinfo(id2,x,dreiuhr,my_td4,my_td5);
}
function online_geschlecht(id2,x,my_td6) {
         GM_xmlhttpRequest({
         method: 'GET',
                url: ''+pgurl+'/profil/id:'+id2+'/',
                onload: function(responseDetails) {
                var content = responseDetails.responseText;
			var profil = responseDetails.responseText;
			try{
			var stadtteil3 = profil.split('Stadtteil')[1];
			var stadtteil2 = stadtteil3.split('">')[1];
			var stadtteila = stadtteil2.split('<')[0];
			}catch(e){
				stadtteila ='error';
					}
var suche = content.search("Ist gerade Online");
		try{
			if (suche != -1) {
				var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>&nbsp;&nbsp;";
				}
			else {
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>&nbsp;&nbsp;";
			};
		}catch(e){
			var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
		}

				var online = document.createElement('td');      

	try {
      var geschlecht2 = content.split('pennergame.de/img/profilseite/')[1];
      var geschlecht  = geschlecht2.split('.jpg"')[0];
 var geschlecht_image = '<div style="display:inline-block;"><img src="http://mediaberlin.pennergame.de/img/profilseite/' + geschlecht + '.jpg" height="12" width="12"></img></div>';


     } catch(err) {
      var geschlecht_image ='<font style=\"color:green; font-size:100%;\"><b>Premium</b></font>';
	}            

	var stadtteil = document.createElement('td');      
	online.innerHTML = ''+online2a+''+geschlecht_image+'';
        stadtteil.innerHTML = stadtteila; 
        my_td6.innerHTML = stadtteila;   
        tr[x].insertBefore(online, tr[x].getElementsByTagName('td')[9]);

		}
        });                
}
function cashinfo(id2,x,dreiuhr,my_td4,my_td5){
 GM_xmlhttpRequest({
 method: 'GET',
   	 url: ''+pgurl+'/dev/api/user.'+id2+'.xml',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

	 	var namepp = dom.getElementsByTagName('name')[0].textContent;
		var idp = dom.getElementsByTagName('id')[0].textContent;
	 	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
		var position = dom.getElementsByTagName('position')[0].textContent;
	 	var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
	 	var points = dom.getElementsByTagName('points')[0].textContent;
	 	var city = dom.getElementsByTagName('city')[0].textContent;
		var idbande = dom.getElementsByTagName('id')[1].textContent;
		var namebande = dom.getElementsByTagName('name')[1].textContent;

var points=points;
var maxatt =    GM_getValue("angriffmax");
var minatt =  GM_getValue("angriffmin");
var userpoints = GM_getValue("userpoints");


if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var colorr = "red"; 
}

if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var colorr = "green"; 
}

		neu = dreiuhr-points;
	if(neu>0){
		var punkti = '<font style=\"color:green; font-size:100%;\"><b>'+neu+'</b></font>';
		}else
	if(neu<0){
		var punkti = '<font style=\"color:red; font-size:100%;\"><b>'+neu+'</b></font>';
		}else
	if(neu==0){
		var punkti = '<font style=\"color:yellow; font-size:100%;\"><b>'+neu+'</b></font>';
		}

var fight ='<a href="/fight/?to='+namepp+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
var smss ='<a href="/messages/write/?to='+id2+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';


	var sms = document.createElement('td');
	sms.innerHTML = ''+smss+'';
	tr[x].insertBefore(sms, tr[x].getElementsByTagName('td')[5]);

	var angriff = document.createElement('td');
	angriff.innerHTML = fight;
	angriff.setAttribute('style', 'background-color:'+colorr+'');
	tr[x].insertBefore(angriff, tr[x].getElementsByTagName('td')[6]);

	var dreiuhrr = document.createElement('td');
	dreiuhrr.innerHTML = points;
	tr[x].insertBefore(dreiuhrr, tr[x].getElementsByTagName('td')[7]);

	var dreiuhre = document.createElement('td');
	dreiuhre.innerHTML = punkti;
	tr[x].insertBefore(dreiuhre, tr[x].getElementsByTagName('td')[8]);

try{
	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
	}catch(e){
	var cash = '-';
}
try{
	var idb = dom.getElementsByTagName('id')[1].textContent;
	}catch(e){
	var idb = '--';
}
// geld hoehe farblich anzeigen lassen 
var highlightita = 5000;
var highlightit0 = 5001;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

if (cash <= highlightita){
	farbe = "white";
}
if (cash >= highlightit0){
	var farbe = "#F91805";
}
if (cash >= highlightit1){
	var farbe = "#EE4611";
}
if (cash >= highlightit2){
	var farbe = "#F6A008";
}
if (cash >= highlightit3){
	var farbe = "#D9EA14";
}
if (cash >= highlightit4){
	var farbe = "#0EF905";
}
if (cash >= highlightit5){
	var farbe = "#450FEF";
}
// banden status abfrage admin co oder mitglied oder no bande
var status = dom.getElementsByTagName('status')[0].textContent;
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
    // tier abfrage hamburg unen berlin                                
      GM_xmlhttpRequest({
   		 method: 'GET',
     		 url: ''+pgurl+'/profil/id:'+id2+'/',
        	 onload: function(responseDetails,id) {
          		var content = responseDetails.responseText;
	try{
    var hausi5 = content.split('margin-top:12px;">')[1];
    var hausi3 = hausi5.split('</div>')[0];
    var hausi4 = hausi3.split('<img src="')[1];
    var hausi2 = hausi4.split('"')[0];
var petname ='<a href="http://www.pennergame.de/stock/plunder/"><img src="'+hausi2+'"  title="'+hausi2+'"  width="37" height="37"</a>';

if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg'){var petnamew = 'Nashorn';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg'){var petnamew = 'Eisb&auml;r';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12536.jpg'){var petnamew = '&Auml;ffchen';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg'){var petnamew = 'Tiger';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg'){var petnamew = 'Krokodil';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg'){var petnamew  = "Giraffe";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg'){var petnamew  = "Nilpferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg'){var petnamew  = "Pferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg'){var petnamew  = "Chihuahua";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg'){var petnamew  = "Cockerspaniel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg'){var petnamew  = "Pitbull";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg'){var petnamew  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg'){var petnamew  = "Adler";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg'){var petnamew  = "Pudel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg'){var petnamew  = "Hausziege";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg'){var petnamew  = "Schlange";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg'){var petnamew  = "Falke";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg'){var petnamew  = "Katze";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg'){var petnamew  = "Frettchen";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg'){var petnamew  = "Hase";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg'){var petnamew  = "Ratte";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg'){var petnamew  = "Taube";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg'){var petnamew  = "Wellensittich";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg'){var petnamew  = "Hamster";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg'){var petnamew  = "Maus";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg'){var petnamew  = "Goldfisch";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg'){var petnamew  = "Kakerlake";}

// tiere berlin link finden 
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg'){var petnamew = "Silberfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg'){var petnamew = "Grasfrosch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg'){var petnamew = "Rotkelchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg'){var petnamew = "Clownfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg'){var petnamew = "Erdm?nnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg'){var petnamew = "M?we";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg'){var petnamew = "Opossum";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg'){var petnamew = "Streifenh?rnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg'){var petnamew = "Igel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg'){var petnamew = "Hausschwein";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg'){var petnamew = "Schneeeule";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg'){var petnamew = "Bisamratte";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg'){var petnamew = "Moorschnucke";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg'){var petnamew = "Yorkshire Terrier";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg'){var petnamew = "Habicht";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg'){var petnamew = "Collie";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg'){var petnamew = "Dogge";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg'){var petnamew = "Retriever";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg'){var petnamew = "Mops";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg'){var petnamew = "Elch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg'){var petnamew = "Zebra";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg'){var petnamew = "Kamel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg'){var petnamew = "Riesenschildkr?te";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg'){var petnamew = "Leopard";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg'){var petnamew = "Waschb?r";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg'){var petnamew = "Maus (Geld)";}
var suche = content.search("selbsterstelltes Haustier");
if (suche != -1) {

   var hausi55 = content.split('selbsterstelltes Haustier')[2];
   var hausi33 = hausi55.split('Haustier zu erstellen')[0];
   var hausi555 = hausi33.split('<b>')[1];
   var hausi33 = hausi555.split('</b>')[0];
var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
}}catch(e){
var petname = '--';}


// Plunder abfrage 

try{
    var plunder = content.split('<strong>&nbsp;Punkte</strong>')[1];
    var plunder1 = plunder.split('Auszeichnungen')[0];
    var plunder2 = plunder1.split('item">&nbsp;<strong>')[1];
    var plunder3 = plunder2.split('</strong></span>')[0];
var plunder4 = plunder3;//<a href="http://www.pennergame.de/stock/plunder/"><img src="http://media.pennergame.de/img/plunder/icons/Tutankhamun.gif.gif"  title="angelegter plunder"  width="37" height="37"</a>';

}catch(e){
var plunder4 = '--';
}
// spiele plunder abrage 	
	var suche = content.search("Angelegter Spieler Plunder");
	if (suche != -1) {
		var angelegt = 'Ja';
		}else{
		var angelegt = 'Nein';
		}


var auseber = '<br>Name : '+namepp+' <br>Id : '+idp+'<br>Punkte : '+points+'<br>Platz :'+position+'<br>Stadt : '+city+'<br>Regdatum : '+reg_since+'<br><font style=\"color:'+farbe+'; font-size:100%;\"><b>Geld : '+cash+' &euro;</b></font><br>Rankingpoints : '+rankingpoints+'<br>BandeName : '+namebande+'<br>Bandenid : '+idbande+'<br>Bande Status : '+statu+'<br>Dieser Spieler hat '+petnamew+' Als Haustier<br>';
namep = '<a class="tooltip" href="'+pgurl+'/profil/id:'+id2+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+namepp+']</b></font><span><b></b><br>Profil des Penners : '+auseber+'</b><br></span></a>';
my_td4.innerHTML = namep;
var rankingpointsa = document.createElement('td');
var casha = document.createElement('td');
var idpa = document.createElement('td');
casha.innerHTML = '<font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+' &euro;</b></font>';
tr[x].insertBefore(casha, tr[x].getElementsByTagName('td')[12]);
rankingpointsa.innerHTML = rankingpoints;
tr[x].insertBefore(rankingpointsa, tr[x].getElementsByTagName('td')[13]);


var tier = document.createElement('td');
tier.innerHTML = petname;
tr[x].insertBefore(tier, tr[x].getElementsByTagName('td')[13]);

var plunder = document.createElement('td');
plunder.innerHTML = plunder4;
tr[x].insertBefore(plunder, tr[x].getElementsByTagName('td')[14]);

var spieleplunder = document.createElement('td');
spieleplunder.innerHTML = angelegt;
tr[x].insertBefore(spieleplunder, tr[x].getElementsByTagName('td')[15]);


bandenapi(id2,my_td5,idbande)
    }});               

	}});
}
function bandenapi(id2,my_td5,idbande){


 GM_xmlhttpRequest({
 method: 'GET',
   	 url: ''+pgurl+'/dev/api/gang.'+idbande+'.xml',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var doma = parser.parseFromString(responseDetails.responseText, "application/xml");
try{
		var name = doma.getElementsByTagName('name')[0].textContent;
		var idapi = doma.getElementsByTagName('id')[0].textContent;
		var points = doma.getElementsByTagName('points')[0].textContent;
		var position = doma.getElementsByTagName('position')[0].textContent;
		var member_count = doma.getElementsByTagName('member_count')[0].textContent;
		var founder = doma.getElementsByTagName('founder')[0].textContent;

mitgliederliste = '<a class="tooltip" href="'+pgurl+'/dev/api/gang.'+idbande+'.xml"><font style=\"color:yellow; font-size:100%;\"><b>[info]</b></font><span><b>Bandenmitglieder:</b><br><b>ffffffffff</span></a>';
ergebniss2 = '<a class="tooltip" href="'+pgurl+'/profil/bande:'+idapi+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+name+']</b></font><span><b>'+name+'</b><br>Bandenid : '+idapi+'<br>Punkte : '+points+'<br>Platz : '+position+' <br>Mitglieder:'+member_count+'<br> Bandenhersteler:<b>['+founder+']</b></span></a>';

}catch(e){
var ergebniss2 = 'Keine bande';
}
my_td5.innerHTML = ergebniss2;

	}});
}


//coüpyright by basti1012 oder auch pennerhack genannt