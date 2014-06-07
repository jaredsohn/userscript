// ==UserScript==
// @name           HighscoreSuperscript (version 2 by basti1012 ) fuer berln mit api tooltips 
// @namespace      zeigt in highscore geld promille onlinstatus und alle Tiere und vieles mehr an 
// @author         basti1012 
// @include        http://berlin.pennergame.de/highscore*
// @exclude        http://berlin.pennergame.de/highscore/gang/*
// ==/UserScript==


document.getElementsByTagName('h1')[1].innerHTML ="HighscoreSuperScrip[2] Fuer Berlin By Basti1012<br><br><br><br><br><br><br>";
document.title = 'Basti\'s Pennergame HighscoreSuperscript';
var head =document.getElementsByTagName('head')[0];
head.innerHTML += '<link rel="icon" type="image/x-icon" href="http://media.pennergame.de/de/img/att.png" />';
var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

var ueber = document.getElementsByClassName("settingpoint2")[0];
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
newth.innerHTML = "3 Uhr<br>(unterschied)";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Online";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[8]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Stadtteil(profil)";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[9]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Promille";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[10]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Status";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[11]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Reg-atum";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[12]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Geld";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[13]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ranking";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[14]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ids";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[15]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Tier";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[16]);

var laenge = tr.length;
var sig = "http://imgberlin.pennergame.de/cache/bl_DE/signaturen/";
var my_tablesa = document.getElementsByClassName("settingpoint2")[0];

for (var x = 1; x<=laenge-1; x++){
	a= x-1;
	var my_tables = my_tablesa.getElementsByClassName("zeileB")[a];
	var my_td3 = my_tables.getElementsByTagName("td")[4];
	var my_td4 = my_tables.getElementsByTagName("td")[1];
	var my_td5 = my_tables.getElementsByTagName("td")[2];

	var id1 = my_tables.getElementsByTagName("td")[1];
	var id2 = id1.innerHTML.split('<a href="/profil/id:')[1].split('/')[0];
	var dreiuhr = my_td3.innerHTML.split('bottom">')[0].split('&nbsp;')[0];

		try{
			promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id2 + '.jpg"></div>';
			}catch(e){
			promillee='-';
		}

		var promille = document.createElement('td');
		promille.innerHTML = promillee;
		tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[15]);

	online_geschlecht(id2,x);
	cashinfo(id2,x,dreiuhr,my_td4,my_td5);
	Haustier(id2,x);
	
}

function online_geschlecht(id2,x) {
         GM_xmlhttpRequest({
         method: 'GET',
                url: 'http://berlin.pennergame.de/profil/id:'+id2+'/',
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
			 if (suche != -1) {
				 onlinee = "<img src='http://media.pennergame.de/img/on.png'></img>";
			 }
			 else {
				 onlinee  = "<img src='http://media.pennergame.de/img/off.png'></img>";
			 };

				var online = document.createElement('td');      


	try {
      var geschlecht2 = content.split('<img src="http://mediaberlin.pennergame.de/img/profilseite/')[1];
      var geschlecht  = geschlecht2.split('.jpg"')[0];
      } catch(err) {
      var geschlecht ='Kein geschlecht';
	}            

		var geschlecht_image = '<div style="display:inline-block;"><img src="http://mediaberlin.pennergame.de/img/profilseite/' + geschlecht + '.jpg" height="12" width="12"></img></div>';
		var stadtteil = document.createElement('td');      

	online.innerHTML = ''+onlinee+'<br>'+geschlecht_image+'';
        stadtteil.innerHTML = stadtteila; 
      
        tr[x].insertBefore(online, tr[x].getElementsByTagName('td')[8]);
        tr[x].insertBefore(stadtteil, tr[x].getElementsByTagName('td')[9]);
		}
        });                
}




function cashinfo(id2,x,dreiuhr,my_td4,my_td5) {
 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.berlin.pennergame.de/dev/api/user.'+id2+'.xml',
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





		neu = dreiuhr-points;
	if(neu>0){
		var punkti = '<br><font style=\"color:green; font-size:100%;\"><b>'+neu+'</b></font>';
		}else
	if(neu<0){
		var punkti = '<br><font style=\"color:red; font-size:100%;\"><b>'+neu+'</b></font>';
		}else
	if(neu==0){
		var punkti = '<br><font style=\"color:yellow; font-size:100%;\"><b>'+neu+'</b></font>';
		}


	var dreiuhrr = document.createElement('td');
	dreiuhrr.innerHTML = ''+points+'<br>'+punkti+'';
	tr[x].insertBefore(dreiuhrr, tr[x].getElementsByTagName('td')[7]);


	try{
	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
	}catch(e){
	var cash = 'Signatur Deaktiviert';
	}
	try{
	var idb = dom.getElementsByTagName('id')[1].textContent;
	}catch(e){
	var idb = '--';
	}

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

var auseber = '<br>Name : '+namepp+' <br>Id : '+idp+'<br>Punkte : '+points+'<br>Platz :'+position+'<br>Stadt : '+city+'<br>Regdatum : '+reg_since+'<br><font style=\"color:'+farbe+'; font-size:100%;\"><b>Geld : '+cash+' &euro;</b></font><br>Rankingpoints : '+rankingpoints+'<br>BandeName : '+namebande+'<br>Bandenid : '+idbande+'<br>';
namep = '<a class="tooltip" href="http://www.berlin.pennergame.de/dev/api/user.'+id2+'.xml"><font style=\"color:yellow; font-size:100%;\"><b>['+namepp+']</b></font><span><b></b><br>Profil des Penners : '+auseber+'</b><br></span></a>';

my_td4.innerHTML = namep;

var statua = document.createElement('td');
var reg_sincea = document.createElement('td');
var rankingpointsa = document.createElement('td');
var casha = document.createElement('td');
var idpa = document.createElement('td');

statua.innerHTML += statu;
tr[x].insertBefore(statua, tr[x].getElementsByTagName('td')[10]);

reg_sincea.innerHTML = reg_since;
tr[x].insertBefore(reg_sincea, tr[x].getElementsByTagName('td')[11]);

casha.innerHTML = ''+cash+' &euro;';
tr[x].insertBefore(casha, tr[x].getElementsByTagName('td')[12]);

rankingpointsa.innerHTML = rankingpoints;
tr[x].insertBefore(rankingpointsa, tr[x].getElementsByTagName('td')[13]);

idpa.innerHTML = idp;
tr[x].insertBefore(idpa, tr[x].getElementsByTagName('td')[14]);

bandenapi(id2,my_td5,idbande)
	}});
}

function Haustier(id2,x) {

        GM_xmlhttpRequest({
          method: 'GET',
           url: 'http://berlin.pennergame.de/profil/id:'+id2+'/',
        onload: function(responseDetails) {
                var content = responseDetails.responseText;
     var hausi = content.split('Punkte')[1];
     var hausi0 = hausi.split('</table>')[0];                                    



   try {

var hausi1 = hausi0.split('<img src="')[1];
var hausi2 = hausi1.split('"></div>')[0];
    // alert(hausi2);                                                                                   
                                
//Braunbaer
if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/16342.jpg'){                                        
var petname = 'Braunb&auml;r';}
//T-REx
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73526.jpg'){                                        
var petname = 'Dino';}
//Elch
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg'){                                        
var petname = 'Elch';}
//Waschbaer
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg'){                                        
var petname = 'Waschb&auml;r';}
//Leopard
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg'){                                        
var petname = 'Leopard';}
//Riesenschildschiggi
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg'){                                        
var petname = 'Riesenschildkr&ouml;te';}
//Kamel
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg'){                                        
var petname  = "Kamel";}
//Tapir
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/88643.jpg'){                                        
var petname  = "Tapir";}
//Zebra
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg'){                                        
var petname  = "Zebra";}
//Mops
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg'){                                        
var petname  = "Mops";}
//Australian Shpard
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg'){                                        
var petname  = "Border Collie";}
//Deutsche Dogge
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg'){                                        
var petname  = "Dogge";}
//Golden Retriver
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg'){                                        
var petname  = "Golden Retriver";}
//Maeusebussard
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg'){                                        
var petname  = "Habicht";}
//Yorkshire Terrier
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg'){                                        
var petname  = "Yorkshire Terrier";}
//Moorschnucke
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg'){                                        
var petname  = "Moorschnucke";}
//Bisamratte
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg'){                                        
var petname  = "Bisamratte";}
//Schneeeule
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg'){                                             
var petname  = "Schneeeule";}
//Hausschwein
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg'){                                        
var petname  = "Hausschwein";}
//Igel
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg'){                                        
var petname  = "Igel";}
//Streifenhoernchen
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg'){                                        
var petname  = "Streifenh&ouml;rnchen";}
//Opossum
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg'){                                        
var petname  = "Opossum";}
//moewe
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg'){                                        
var petname  = "M&ouml;we";}
//Erdmaennchen
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg'){                                        
var petname  = "Erdm&auml;nnchen";}
//Clownfisch
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg'){                                        
var petname  = "Clownfisch";}      
//Rotkelchen
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg'){                                        
var petname  = "Rotkehlchen";}  
//Grasfrosch
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg'){                                        
var petname  = "Grasfrosch";}      
//Silberfisch
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg'){                                        
var petname  = "Silberfisch";} 

        
        
else {                                
                                        
try {
                                                
var petname = content.split('Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <b>')[1].split('</b>')[0];
} catch (err) {
                                                
var petname = '--';
   }
}                        
                              
} catch (err) {
                                
var petname = '<em>Deaktiviert</em>';
} 
                                        
//tr[x].getElementsByTagName('td')[8].innerHTML = '<div align="center">'+petname+'</div>';                //Replace MSG-TD [petname]td[7]
                                  





var pet = document.createElement('td');
pet.innerHTML = petname;
tr[x].insertBefore(pet, tr[x].getElementsByTagName('td')[16]);
     }});               
}



























function bandenapi(id2,my_td5,idbande){


 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.berlin.pennergame.de/dev/api/gang.'+idbande+'.xml',
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


mitgliederliste = '<a class="tooltip" href="http://www.berlin.pennergame.de/dev/api/gang.'+idbande+'.xml"><font style=\"color:yellow; font-size:100%;\"><b>[info]</b></font><span><b>Bandenmitglieder:</b><br><b>ffffffffff</span></a>';
ergebniss2 = '<a class="tooltip" href="http://pennergame.de/profil/bande:'+idapi+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+name+']</b></font><span><b>'+name+'</b><br>Bandenid : '+idapi+'<br>Punkte : '+points+'<br>Platz : '+position+' <br>Mitglieder:'+member_count+'<br> Bandenhersteler:<b>['+founder+']</b></span></a>';

}catch(e){
var ergebniss2 = 'Keine bande';
}
my_td5.innerHTML = ergebniss2;

	}});
}


