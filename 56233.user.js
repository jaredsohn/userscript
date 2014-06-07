// ==UserScript==
// @name            HighscoreSuperScript by basti1012 hamburg(endversion)
// @namespace       By basti1012 http://pennerhack.foren-city.de
// @description     Zeigt unter highscore viele zusatzfunkionen an die ander highscore scripte noch nicht haben(faketier und plunder update 3 )
// @include         http://*pennergame.de/highscore/*
// ==/UserScript==

/*
History:
Update 23.8.2009
Script erstelt und frei gegeben zum download .

update 23.8.2009
Faketieranzeige eingebaut + Geldanzeige gefixt .

update 24 .8.2009.
alle vorhaben fertig .
Up und downfigh anzeige angebaut .ermittelt ob der gegner in up oder downfight ist .

geld in 6 verschieden farben angezeigt .
Update version 3 mit weiter button unter lets fight 
Neue version mit speicher funktion .speichert alle pennerdaten die angezeigt werden und man kann spaeter wieder drauf zugreifen auch nach wochen.Perfekt fuer lets fight so weiss man was der penner jetzt und vor zb 3 wochen hatte .
ist in der test pfarse wer testen will kommt auf meine page .www.pennerhack.foren-city.de unter neue scripte  august zu finden .brauche tester

*/

var my_tables = document.getElementsByClassName("settingpoint2")[0];
var tr1s = my_tables.getElementsByTagName('h1')[0];
tr1s.innerHTML ='<br><br><h3>Highscoresuche by basti1012</h3><br><img src="http://media.pennergame.de/img/pet_info.jpg"><font style=\"color:white; font-size:100%;\"><b>Faketier Hinweiss</b></font><img src="http://www.fotos-hochladen.net/hoch5qvl96dm.jpg"><img src="http://www.fotos-hochladen.net/hoch5qvl96dm.jpg"><tr><font style=\"color:white; font-size:100%;\"><b>Hoch</b></font><img src="http://www.fotos-hochladen.net/runter7dux6n8p.jpg"><img src="http://www.fotos-hochladen.net/runter7dux6n8p.jpg"><font style=\"color:white; font-size:100%;\"><b>Runter</b></font><img src="http://www.fotos-hochladen.net/gleichqk0vzp5y.jpg"><img src="http://www.fotos-hochladen.net/gleichqk0vzp5y.jpg"><font style=\"color:white; font-size:100%;\"><b> +-0 </b><br><br>Angreifer Hilfe,die Symbole Zeigen an ob der Gegner in Downfight oder Upfight ist,(oder nix macht).</font>';

var my_tablesa = document.getElementsByClassName("settingpoint2")[0];
//my_tablesa.style.width = "750px";

var tr1 = my_tables.getElementsByTagName('tr');
 var th1 = my_tables.getElementsByTagName('th')[0];
  var th2 = my_tables.getElementsByTagName('th')[1];
   var th3 = my_tables.getElementsByTagName('th')[2];
    var th4 = my_tables.getElementsByTagName('th')[3];
     var th5 = my_tables.getElementsByTagName('th')[4];
    th1.innerHTML ='Platz / Signatur';
   th2.innerHTML ='Pennerinfo';
  th3.innerHTML ='Bandeninfo';
 th4.innerHTML ='Tierinfo';
th5.innerHTML ='Online / Stadtteil';


 window.scrollBy(0,350);
  var pagination = document.getElementsByClassName('pagination')[0];
   pagination.style.width = "750px";
    pagination.innerHTML += '';






















x=0;
suchenl();

function suchenl(){
if(x<=21){
	var my_tables = my_tablesa.getElementsByClassName("zeileB")[x];
	var my_td0 = my_tables.getElementsByTagName("td")[0];
		var my_td0 = my_tables.getElementsByTagName("td")[0];
		var my_td1 = my_tables.getElementsByTagName("td")[1];
		var my_td2 = my_tables.getElementsByTagName("td")[2];
		var my_td3 = my_tables.getElementsByTagName("td")[3];
		var my_td4 = my_tables.getElementsByTagName("td")[4];
		var my_td5 = my_tables.getElementsByTagName("td")[5];
		var name = my_td1.innerHTML.split('none;">')[1].split('<img')[0];
		var id = my_td1.innerHTML.split('profil/id:')[1].split('/')[0];

var dreiuhrpunkte = my_td3.innerHTML.split('bottom">')[0].split('&nbsp;')[0];

//alert(dreiuhrpunkte);
	suchen(id,name,my_td1,my_td2,my_td5,dreiuhrpunkte);
	signatur_promille(id, my_td0);
	restdaten(my_td3, id, my_td4, my_td5);
		}
}
// ------------------------------------------------------------------
function suchen(id,name,my_td1,my_td2,my_td5,dreiuhrpunkte){
 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.pennergame.de/dev/api/user.'+id+'.xml',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

	 	var namepp = dom.getElementsByTagName('name')[0].textContent;
	 	namep = '<a class="tooltip" href="http://pennergame.de/profil/id:'+id+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+namepp+']</b></font><span><b>'+namepp+'</b><br> Gehe zum Pennerprofil des Penners : '+namepp+'</b><br></span></a>';

	 		var idp = dom.getElementsByTagName('id')[0].textContent;
	 		var points = dom.getElementsByTagName('points')[0].textContent;
	 		var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
	 		var position = dom.getElementsByTagName('position')[0].textContent;
	 		var city = dom.getElementsByTagName('city')[0].textContent;
	 		var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
			try{
	 		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
			}catch(e){
	 		var cash = '--';
			}
		try{
		 var idb = dom.getElementsByTagName('id')[1].textContent;
		}catch(e){
		 var idb = '--';
		}

dreiuhr = points-dreiuhrpunkte;
if(dreiuhr>0){
var punkti = '<br><img src="http://www.fotos-hochladen.net/hoch5qvl96dm.jpg"><img src="http://www.fotos-hochladen.net/hoch5qvl96dm.jpg"><font style=\"color:white; font-size:100%;\"><b>'+dreiuhr+'</b></font>';
}else
if(dreiuhr<0){
var punkti = '<br><img src="http://www.fotos-hochladen.net/runter7dux6n8p.jpg"><img src="http://www.fotos-hochladen.net/runter7dux6n8p.jpg"><font style=\"color:white; font-size:100%;\"><b>'+dreiuhr+'</b></font>';
}else
if(dreiuhr==0){
var punkti = '<br><img src="http://www.fotos-hochladen.net/gleichqk0vzp5y.jpg"><img src="http://www.fotos-hochladen.net/gleichqk0vzp5y.jpg"><font style=\"color:yellow; font-size:100%;\"><b>'+dreiuhr+'</b></font>';
}


var highlightita = 5000;
var highlightit0 = 5000;
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

my_td5.innerHTML += punkti;

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
       		  var statu = '--';
        };

	var auseber = 'Name : '+namep+' <br>Id : '+idp+'<br>Punkte : '+points+'<br>Platz :'+position+'<br>Stadt : '+city+'<br>Regdatum : '+reg_since+'<br><font style=\"color:'+farbe+'; font-size:100%;\"><b>Geld : '+cash+' &euro;</b></font><br>Rankingpoints : '+rankingpoints+'';//<br>BandeName : '+name+'<br>Bandenid : '+idb+'<br>Status : sex<br>Erstelt am : '+joined+'';
	my_td1.innerHTML = auseber;

banderest(idb,my_td2,dom,statu,dreiuhrpunkte);
	}});
}
// -------------------------------------- banden api infos -----------------------------

function banderest(idb,my_td2,dom,statu,dreiuhrpunkte){
try{

 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.pennergame.de/dev/api/gang.'+idb+'.xml',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var doma = parser.parseFromString(responseDetails.responseText, "application/xml");

		try{
		 	var points = doma.getElementsByTagName('points')[0].textContent;
			 var position = doma.getElementsByTagName('position')[0].textContent;
			 var member_count = doma.getElementsByTagName('member_count')[0].textContent;
			 var founder = doma.getElementsByTagName('founder')[0].textContent;
			 var foundera = '<a class="tooltip" href="http://www.pennergame.de/profil/id:'+founder+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+founder+']</b></font><span><b>['+founder+']</b><br>Dieses ist laut PG der Bander ersteller,der die Bande auf gemacht hat .Dieser Penner muss aber nicht mehr in der Bande sein. Gehe zum Pennerprofil des Penners : ['+founder+']</b><br></span></a>'
			}catch(e){
	 			points = '--';
	 			var position = '--';
	 			var member_count = '--';
	 			var foundera = '--';
				}

				try{
	 				var nam = dom.getElementsByTagName('name')[1].textContent;
					 var idb = dom.getElementsByTagName('id')[1].textContent;
	 
					 var joined = dom.getElementsByTagName('joined')[0].textContent;

					name = '<a class="tooltip" href="http://pennergame.de/profil/bande:'+idb+'/"><font style=\"color:yellow; font-size:100%;\"><b>['+nam+']</b></font><span><b>'+nam+'</b><br> Gehe zum Bandenprofil der Bande : '+nam+'</b><br></span></a>';
				}catch(e){
				var name = '--';
				}

			ergebniss2 = ''+name+'<br>Bandenid : '+idb+'<br>Status : '+statu+'<br>Erstelt am : '+joined+'<br>';
			ergebniss = 'Punkte : '+points+'<br>Platz : '+position+' <br>Mitglieder:'+member_count+' Bandenhersteler:'+foundera+'';
			my_td2.innerHTML = ergebniss2+ergebniss;
			x++;
			suchenl();

			}
		});
	}catch(e){
	my_td2.innerHTML = '--';
			x++;
			suchenl();
	}

}
function restdaten(my_td3, id, my_td4,my_td5){

GM_xmlhttpRequest({
  	method: 'GET',
	url: 'http://www.pennergame.de/profil/id:'+id+'/',
	onload: function(responseDetails) {
			var profil = responseDetails.responseText;
			var stadtteil3 = profil.split('Stadtteil')[1];
			var stadtteil2 = stadtteil3.split('">')[1];
			var stadtteil = stadtteil2.split('<')[0];
			var suche = profil.search("Ist gerade Online");
			 if (suche != -1) {
				 online = "<img src='http://www.fotos-hochladen.net/onlie9ketg65l.jpg'></img>";
			 }
			 else {
				 online  = "<img src='http://www.fotos-hochladen.net/offline4vp6qneg.jpg'></img>";
			 };
			 my_td4.innerHTML +='Stadtteil: '+stadtteil+'<br>'+online+'';
 			try {
				var tier1 = profil.split('margin: 5px; padding: 5px;')[1];
				var tier2 = tier1.split('</table>')[0];
				var tier3 = tier2.split('<img style="margin-top:3px" src="http://www.pennergame.de/headline/')[1];
				var tier4 = tier3.split('/?size=28" />')[0];
				var tier5 = '<img style="margin-top:3px;" src="http://www.pennergame.de/headline/'+tier4+'/?size=28" width="35" height="20" />';

				var tier6 = tier1.split('<img src="http://media.pennergame.de/img/tiere/')[1];
				var tier7 = tier6.split('.jpg')[0];
				var tier8 ='<img src="http://media.pennergame.de/img/tiere/'+tier7+'.jpg" width="45" height="45"></img>';
			} catch (e){
				var tier5 = "--";
				var tier8 = "--";
			}

			try {
				var tier15 = profil.split('tooltip_pl')[1];
				var tierfakee = tier15.split('</td>')[0];
				var tier15 = tierfakee.split('<b>')[2];
				var tierr = tier15.split('</b>')[0];

				var tierfake = '<a class="tooltip" href="/premium/"><img src="http://media.pennergame.de/img/pet_info.jpg" border="0"><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:yellow; font-size:100%;\"><b>'+tierr+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</b></span></a>';

			} catch (e){
			var tierfake = "--";
			}		
		try {
		var plunder = profil.split('<div id80="item_icon">')[1];
		var plunder2 = plunder.split('<td width="4%">')[0];
		var plunder3 = plunder2.split('</td>')[0];
		var plunder_bild = plunder3;
		var plunder4 = plunder3.split('ity item">')[1];
		var plunder5 = plunder4.split('</span>')[1];
		var plunder_name = plunder5;
		alert(plunder_name+plunder_bild);
		} catch (e){
		var plunder_bild ='--';
		var plunder_name ='--';
		}
		//my_td5.innerHTML +=plunder_name+plunder_bild;
		my_td3.innerHTML = ''+tier5+'<br>'+tier8+'<br>'+tierfake+'';
	   	 }
	});
}

function signatur_promille(id, my_td0){

 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.pennergame.de/dev/api/user.'+id+'.xml',
	 onload: function(responseDetails) {
        	 var parser = new DOMParser();
        	 var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try{
			 var cash = dom.getElementsByTagName('cash')[0].textContent;
			my_td0.innerHTML += '<img src="http://img.pennergame.de/cache/de_DE/signaturen/' + id + '.jpg"></img>';
		}catch(e){	
			my_td0.innerHTML += '<img src="http://www.fotos-hochladen.net/neuesignaturnein8ljown0s.jpg"></img>';//<img "src="http://img.pennergame.de/cache/de_DE/signaturen/'+id+'/">';
			}
		}
	});
}

// Copyright by basti1012 
// Highscoresuperscript by basti1012 