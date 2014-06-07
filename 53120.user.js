// ==UserScript==
// @name           Pennergame sonder suche version 4 mit geld aus api und signatur
// @namespace      by basti1012  (http://pennerhack.foren-city.de).version 4
// @description    Sucht gegner nach geld ,Geld wird nun aus api und signatur ausgelesen um doppelte absicherung zu haben ob da auch geld ist
// @include        http://*pennergame.de/activities/*
// @include        http://*berlin.pennergame.de/activities/*
// @include        http://*menelgame.pl/activities/*
// @include        http://*dossergame.co.uk/activities/*
// ==/UserScript==

// -----------------  Ab hier ist tabu zone fuer euch ------------------------------------------------


var content = document.getElementById('content');
var mytable = document.createElement('table');
mytable.innerHTML = "<span style='font-size:medium'><b>Sonder Suche Nach Geld,Platz,Punkte,Tiere,Bande(ja,Nein) und Promille suche<br>Zur Zeit geht nur Suche nach Geld bei der N&auml;sten Version wird alles gehen</b></span>";
content.appendChild(mytable);


var mytrb = document.createElement('span');
mytrb.innerHTML = "<span style='font-size:small'><u>Id Start:</u></span><input type='text' value='"+GM_getValue("vont")+"' id ='idin' size='10'>";//<input type='button' id='idklick' value='Suchen'><br>Id Eingeben und start klicken um Anfangs Id zu &auml;ndern";
mytable.appendChild(mytrb);

var mytrc = document.createElement('span');
mytrc.innerHTML = "<span style='font-size:small'><u>Relod Time:</u></span><input type='text' value='"+GM_getValue("azztimet")+"' id='relodin' size='10'>";//<input type='button' id='relodklick' value='save'><br>Sekunden x 1000 Eingeben um Schneller zu suchen.";
mytable.appendChild(mytrc);

var mytrd = document.createElement('span');
mytrd.innerHTML = "<span style='font-size:small'><u>Was suche zb(cash1) Zur Zeit keine Funktion:</u></span><input type='text' value='"+GM_getValue("was")+"' id='Geld' size='10'><br><u>Wert zz (nur Cent f&uuml;r Geld suche)</u><input type='text' value='"+GM_getValue("wasa")+"' id='Gelda' size='10'>";
mytable.appendChild(mytrd);

var mytre = document.createElement('span');
mytre.innerHTML = "<span style='font-size:small'><u>Klicke zum Speichern:</u></span><input type='button' id='Geldklick' value='Speichern'>";
mytable.appendChild(mytre);


var mytrb = document.createElement('span');
mytrb.innerHTML = "<hr>";
mytable.appendChild(mytrb);

var mytr1 = document.createElement('span');
mytr1.innerHTML = "<span  style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Name</b></span>---------------:</span>";
mytable.appendChild(mytr1);

var mytd1 = document.createElement('span');
mytr1.appendChild(mytd1);

var mytr2 = document.createElement('span');
mytr2.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Punkte</b></span> ------------:</span>";
mytable.appendChild(mytr2);

var mytd2 = document.createElement('span');
mytr2.appendChild(mytd2);

var mytr4 = document.createElement('span');
mytr4.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Geld aus Api</b></span> -----:</span>";
mytable.appendChild(mytr4);

var mytd4 = document.createElement('span');
mytr4.appendChild(mytd4);

var mytr4a = document.createElement('span');
mytr4a.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Geld Signatur</b></span>----:</span>";
mytable.appendChild(mytr4a);

var mytd4a = document.createElement('span');
mytr4a.appendChild(mytd4a);







var mytr5 = document.createElement('span');
mytr5.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Bande</b></span>--------------:</span>";
mytable.appendChild(mytr5);

var mytd5 = document.createElement('span');
mytr5.appendChild(mytd5);

var mytr6 = document.createElement('span');
mytr6.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Scan ID</b></span>------------:</span>";
mytable.appendChild(mytr6);

var mytd6 = document.createElement('span');
mytr6.appendChild(mytd6);

var mytr7 = document.createElement('span');
mytr7.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Reg am</b></span> ------------:</span>";
mytable.appendChild(mytr7);

var mytd7 = document.createElement('span');
mytr7.appendChild(mytd7);

var mytr8 = document.createElement('span');
mytr8.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Platz</b></span> ---------------:</span>";
mytable.appendChild(mytr8);

var mytd8 = document.createElement('span');
mytr8.appendChild(mytd8);

var mytr9 = document.createElement('span');
mytr9.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Online</b></span>--------------:</span>";
mytable.appendChild(mytr9);

var mytd9 = document.createElement('span');
mytr9.appendChild(mytd9);


var mytr10 = document.createElement('span');
mytr10.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Promille</b></span> -----------:</span>";
mytable.appendChild(mytr10);

var mytd10 = document.createElement('span');
mytr10.appendChild(mytd10);

var mytr12 = document.createElement('span');
mytr12.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>My  Punkte</b></span> ------ - :</span>";
mytable.appendChild(mytr12);

var mytd12 = document.createElement('span');
mytr12.appendChild(mytd12);

var mytr11 = document.createElement('span');
mytr11.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Min Punkte</b></span> ------ -:</span>";
mytable.appendChild(mytr11);

var mytd11 = document.createElement('span');
mytr11.appendChild(mytd11);

var mytr13 = document.createElement('span');
mytr13.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Max Punkte</b></span> ------ :</span>";
mytable.appendChild(mytr13);

var mytd13 = document.createElement('span');
mytr13.appendChild(mytd13);


var mytr14 = document.createElement('span');
mytr14.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>Besuchte Profile</b></span>--:</span>";
mytable.appendChild(mytr14);

var mytd14 = document.createElement('span');
mytr14.appendChild(mytd14);

var mytre = document.createElement('div');
mytre.innerHTML = ""

+"<span style=\"color:red; font-size:130%;\"><b>----- Neu Direkter Geld vergleich aus api und Signatur ( Doppelt absicherung zum Fighten ) -</b></span><br>"
+"<span style=\"color:blue; font-size:100%;\"><b>Wichtig Bitte lesen damit auch alles klappt!</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>Hier kannst du nach Geld,Platz,Punkte oder registrierungsdatum suchen.</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>Unter WAS SUCHE musst du eingeben was du suchen willst ,dazu gibst du .</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>folgene codes ein (alles klein geschrieben.)</b></span><br>"
//+"<span style=\"color:red; font-size:100%;\"><b>cash1  </b></span>  <span style=\"color:green; font-size:100%;\"><b>= Um nach Geld zu suchen.</b></span><br>"
//+"<span style=\"color:red; font-size:100%;\"><b>reg1   </b></span>  <span style=\"color:green; font-size:100%;\"><b>= Um nach regestrierungsdatum zu suchen.</b></span><br>"
//+"<span style=\"color:red; font-size:100%;\"><b>points1 </b></span> <span style=\"color:green; font-size:100%;\"><b> = Um nach Punkte zu suchen.</b></span><br>"
//+"<span style=\"color:red; font-size:100%;\"><b>platz1  </b></span> <span style=\"color:green; font-size:100%;\"><b>= Um nach Plazierung zu suchen.</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>Dann muss unter Wert die Minimum Werte eingegebenn werden nach dem ihr suchen wolllt.</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>Beispiele ( wichtig muss genau so wie beschrieben eingegeben werden)</b></span><br>"
+"<span style=\"color:red; font-size:120%;\"><b>cash1 = </b></span> <span style=\"color:red; font-size:100%;\"><b>10,20,100,5000.100000 und so weiter alle Angaben in Cent (10 euro = 1000)</b></span><br>"
//+"<span style=\"color:green; font-size:100%;\"><b>reg1 =  </b></span> <span style=\"color:red; font-size:100%;\"><b>10.12.2009 oder 03.01.2008</b></span><br>"
//+"<span style=\"color:green; font-size:100%;\"><b>points1 =</b></span><span style=\"color:red; font-size:100%;\"><b> 1,33,654,23456,999999,Normale Zahlen</b></span><br>"
//+"<span style=\"color:green; font-size:100%;\"><b>platz1 = </b></span><span style=\"color:red; font-size:100%;\"><b>1,33,234,6534,675634,Auch normal zahlen.</b></span><br>"
+"<span style=\"color:green; font-size:100%;\"><b>Eure angaben muessen die mimdestens Beitrage sein er sucht alles nach dem was mehr ist.</b></span><br>"
+"<span style=\"color:blue; font-size:100%;\"><b>Viel spass beim suchen</b></span><br>"
+"<span style=\"color:yellow; font-size:100%;\"><b>mfg basti1012</b></span><br>"
+"<span style=\"color:red; font-size:120%;\"><b>Zur Zeit geht nur die suche nach Geld,<br>Suche nach Platz,Reg Datum,Plunder ,Tiere Bande(ja,Nein)und<br> suche nach Promille ist in Bau und wird es bei der Neuen Version mit geben<br> Bis dahin viel Spass beim suchen nach Geld</b></span><br>";

mytable.appendChild(mytre);



// ######################  location afrage welche stadt gesucht wird ############################

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var siglink = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var siglink = 'http://img.pennergame.de/cache/de_DE/signaturen/';
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var siglink = 'http://img.menelgame/cache/pl_PL/signaturen/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var siglink = 'http://img.dossergame.co.uk/cache/en_EN/signaturen/';
var pgurl = 'http://dossergame.co.uk/';
};

// ################# speichern ##################################

var gesendet = GM_getValue("gesendet");
if (gesendet == null){
gesendet = 1;
GM_setValue("gesendet" , gesendet);
};

var azztimet = GM_getValue("azztimet");
if (azztimet == null){
azztimet = "6000";
GM_setValue("azztimet" , azztimet);
};

var vont = GM_getValue("vont");
if (vont == null){
vont ="1";};
//GM_setValue("vont" , vont);
//};

var was = GM_getValue("was");
if (was == null){
was = 'SucheGeld';
GM_setValue("was" , was);
};

var wasa = GM_getValue("wasa");
if (wasa == null){
wasa = 1200000;
GM_setValue("wasa" , wasa);
};

// ###################### min max eigener punktestand abfragen#################################


 GM_xmlhttpRequest({
	method:"GET",
	 url: ''+pgurl+'/fight/overview/',
   	  onload:function(responseDetails) {
     	   content = responseDetails.responseText;
      	    ziea = content.split('Dein Ziel muss ')[1];
       	     mins = ziea.split('bis ')[0];
              ziec = content.split('bis ')[1];
               maxs = ziec.split('Punkte haben.')[0];
                mypoints = Math.round(mins*1.25)// original punkte von mir
      mytd11.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>" + mins + "</b></span></span>";
      mytd13.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:orange; font-size:100%;\"><b>" + maxs + "</b></span></span>";
      mytd12.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>" + mypoints + "</b></span></span>";
		start();
	}
});
//############################################################################################

var save;
  function suchen(){
   save = 0;
    vont++;

	mytd6.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>" + vont + "</b></span></span>";
          GM_xmlhttpRequest({
           method: 'GET',
	    url: ''+pgurl+'/dev/api/user.'+vont+'.xml',
             onload: function(responseDetails) {
	    var parser = new DOMParser();
          var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	ausgabe(dom);
      }
   });
}
function ausgabe(dom){
	try{

		var name1 = dom.getElementsByTagName('name')[0].textContent;
		var id = dom.getElementsByTagName('id')[0].textContent;
		mytd1.innerHTML = "<a style='font-size:small' href='http://www.pennergame.de/profil/id:" + id + "/'><span style=\"color:green; font-size:100%;\"><b>" + name1 + "</b></span></a><a href='http://www.pennergame.de/fight/?to=" + name1 + "</b></span>'><img src='http://media.pennergame.de/img/att.gif' border='0'></img></a><a href='http://www.pennergame.de/messages/write/?to=" + id + "'><img src='http://media.pennergame.de/img/overview/new_msg.gif' border='0'></img></a>";

		var points1 = dom.getElementsByTagName('points')[0].textContent;
		mytd2.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>"+points1+"</b></span></span>";

		var band1 = dom.getElementsByTagName('name')[1].textContent;
		mytd5.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>"+band1+"</b></span></span>";

                var reg1 = dom.getElementsByTagName('reg_since')[0].textContent;
                mytd7.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>"+reg1+"</b></span></span>";

                var platz1 = dom.getElementsByTagName('position')[0].textContent;
                mytd8.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>"+platz1+"</b></span></span>";

      }catch(e){
		mytd1.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>no name,id Spieler geloescht</b></span></span>";
		mytd2.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>no pooints Spieler geloescht</b></span></span>";
		mytd5.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>no bande   Spieler geloescht</b></span></span>";
		mytd7.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>no regdate Spieler geloescht</b></span></span>";
		mytd8.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>no pl?aqtz Spieler geloescht</b></span></span>";
		}
	    try{ 
		var cash1 = dom.getElementsByTagName('cash')[0].textContent;// 100;

		var geldsignatur = "<div style='overflow: hidden; width: 400px; height: 16px;'><img style='position: relative; top: -22px; left: -95px;' src='http://img.pennergame.de/cache/de_DE/signaturen/" + id + ".jpg'></div>";
		mytd4a.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:150%;\"><b>" +  geldsignatur + "</b></span></span>"; 
		//var geldsignatur = "<div style='overflow: hidden; width: 50px; height: 19px;'><img style='position: relative; top: -40px; left: -120px;' src='http://img.pennergame.de/cache/de_DE/signaturen/" + id + ".jpg'></div>";


		mytd4.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>" + cash1 + "&euro</b></span></span>";
		var promille = "<div style='overflow: hidden; width: 100px; height: 19px;'><img style='position: relative; top: -40px; left: -90px;' src='http://img.pennergame.de/cache/de_DE/signaturen/" + id + ".jpg'></div>";
		mytd10.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:150%;\"><b>" +  promille + "</b></span></span>"; 

      }catch(e){
		mytd4.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b> no cash </b></span></span>";
		mytd10.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b> no promille </b></span></span>";
		}


//############## Online abfrage ob der spieler online ist oder nicht  ######################
try{
         	 GM_xmlhttpRequest({
		          method: 'GET',
		          url: 'http://www.pennergame.de/profil/id:'+vont+'/',
		          onload: function(responseDetails) {
			  var profil = responseDetails.responseText;
			  var suche = profil.search("Ist gerade Online");
			  if(suche != -1){
			     mytd9.innerHTML = "<img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img><img src='http://media.pennergame.de/img/on.gif'></img>";
			     }
			 else{
			     mytd9.innerHTML = "<img src='http://media.pennergame.de/img/off.gif'></img><img src='http://media.pennergame.de/img/off.gif'></img><img src='http://media.pennergame.de/img/off.gif'></img><img src='http://media.pennergame.de/img/off.gif'></img><img src='http://media.pennergame.de/img/off.gif'></img>";
			     }

		     }
	   });

}catch(e){
mytd9.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>Error not found</b></span></span>";
}


// #############################################################################################

      GM_setValue("vont",vont);

var was = GM_getValue("was");
var wasa = GM_getValue("wasa");

//alert(""+wasa+" und "+was+"")

//if(was > wasa) {                                                // alert kommt immer  egal was da steht
//if(Number(was) > Number(wasa)) {                                // nix
if(cash1<=Number(100000000) && cash1>=Number(wasa)) {           // so  geht zumindes die geld abfragge
//if(Geld > Gelda) {                                              // namen der buttons geht auch nix
//if(Number(was)<=Number(100000000) && Number(was)>=Number(wasa)) { // geht auch nix
	var box=window.confirm("Name : "+name1+" \nGeld : "+cash1+" Euros\nPunkte : "+points1+" \nBande : "+band1+" \nUm eine Kampf aufforderung zu schicken\n klicke auf OK oder klicke Abrechen f&uuml;r Weitersuchen\n mfg Basti");
	  if(box==true){
		senden(pgurl, vont);
		}
	}
}

//########### buttons eigene function  #############################

function start(){



//document.getElementById('relodklick').addEventListener('click', function idklicker() {
//	location.reload();
//},false);

// ########## Text Felder zur Auswahl von Geld Punkte und Co Suche ##########################
	
document.getElementById('Geldklick').addEventListener('click', function starten() {
	var was = document.getElementById('Geld').value;	
	GM_setValue("was" , was);
	var wasa = document.getElementById('Gelda').value;	
	GM_setValue("wasa" , wasa);
	//alert("Du suchst nach ("+was+") mit einen wert von "+wasa+"");

	var vont = document.getElementById('idin').value;
		
	GM_setValue("vont" , vont);
	//alert("Deine neue Angabe ("+vont+")ist als neue Start ID Festgesetzt worden.\nUm wieder von vorne Anfangen zu k&ouml;nnen gebe einfach neue Start ID an.\nMfg Basti1012\n\nhttp://pennerhack.foren-city.de");
	
	var azztimet = document.getElementById('relodin').value;
	GM_setValue("azztimet", azztimet);
	blbl = Math.round(3600000/azztimet)
	//alert("du hast "+azztimet+" ausgeesucht das sind ca "+blbl+" penner in der stunde die durch gescannt werden");


alert("Du suchst nach ("+was+") mit einen wert von "+wasa+"\nDeine neue Angabe ("+vont+")ist als neue Start ID Festgesetzt worden.\ndu hast "+azztimet+" ausgeesucht das sind \nca "+blbl+" penner in der stunde die durch gescannt werden");

	location.reload();
}, false);
	
// #######################  Id direkt Wahl Button ##########################################
	
//document.getElementById('idklick').addEventListener('click', function startw() {
//location.reload();
//}, false);


	
}	
// ########### Interwall hier oder mit in den Id Button listener mit rein  ############################

var abcd = GM_getValue("azztimet");
window.setInterval(suchen, abcd);


//############################ Profil Weiterleitung von Comfirm box ###############################################

function senden(pgurl, vont){

	window.location.href = (''+pgurl+'profil/id:'+vont+'/');
		gesendet++;
	GM_setValue("gesendet",gesendet);
}		
mytd14.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>" + gesendet + "</b></span></span>";

// ###############  Copyright undc wichtige fakten #############################################

// Copyright by basti1012 dieses ist die erste version zum testen fuer alle 
// reg tie3r plunder suche wird noch eingebaut in der nesten version