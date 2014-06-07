// ==UserScript==
// @name           Bastis Mega Angrifswarner version 3.1 zweite beta
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Zeigt ueberall an sobald man einen angriff gestartet hat oder man angegriffen wird.Status anzeige bei keinen kampfen so weis man das der angrifswarner auch funktioniert update 2
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==


//------------------------- Einstellungen bei keinen Kampf ------------------------------------------
var VonOben = 0; //px
var VonRechts = 220; //px
var borderfarbe = 'green';
var hintergrundfarbe = 'black';
var schrieftfarbe = 'yellow';
var schrieftgroese = '160';
var borderbreite = '5';
// ------------------------ Einstellungen bei ankommenden kampf ------------------------------------
var VonOben1 = 0; //px
var VonRechts1 = 220; //px
var borderfarbe1 = 'red';
var hintergrundfarbe1 = 'orange';
var schrieftfarbe1 = 'blue';
var schrieftgroese1 = '200';
var borderbreite1 = '10';
// ---------------------------Einstellungen bei ausgehenden kampf ---------------------------------
var VonOben2 = 0; //px
var VonRechts2 = 220; //px
var borderfarbe2 = 'blue';
var hintergrundfarbe2 = 'green';
var schrieftfarbe2 = 'red';
var schrieftgroese2 = '200';
var borderbreite2 = '10';
// Dran denken das ausgehender und ankommernder bkampf gleichzeitig laufen kann wer sowas vor 
// hat sollte die beiden menues etwas auseinander schieben damit die nicht an der gleichen stelle sind 
// wer keine ausgehende kampfe macht oder selten ist auch egal .Ist nur ein Tipp .
// AB HOIER FAENGT COPYRIGHT BY BASTI1012 AN ---------------------------------------------------

// -------------------------------- min und max punkte fuer suche  berlin -----------------------
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var ausweich = 'Ausweichen';
var link = 'http://berlin.pennergame.de/';
var siglink = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
var externe = 'berlin';
GM_xmlhttpRequest({
	method:"GET",
	url: ''+link+'/fight/overview/',
   	onload:function(responseDetails) {
     	content = responseDetails.responseText;
      	minimal1 = content.split('Dein Ziel muss ')[1];
       	minimala1 = minimal1.split('bis ')[0];
        maximal1 = content.split('bis ')[1];
        maximala1 = maximal1.split('Punkte haben.')[0];
GM_setValue("maximala1" , maximala1);
GM_setValue("minimala1" , minimala1);
}});
var minimala = GM_getValue("minimala1");
var maximala = GM_getValue("maximala1");
}


// -------------------------------- min und max punkte fuer suche  dossergame -----------------------

else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var ausweich = 'Avoid';
var link = 'http://www.dossergame.co.uk/';
var siglink = 'http://img.dossergame.co.uk/cache/en_EN/signaturen/';
var externe = 'dossergame';
GM_xmlhttpRequest({
   method: 'GET',
   url: ""+link+"/fight/overview/",
       onload: function( response ) {
         var lf = response.responseText;
         var minimala3 = lf.match(/have between ([0-9]+) and ([0-9]+) points/)[ 1 ];
         var maximala3 = lf.match(/have between ([0-9]+) and ([0-9]+) points/)[ 2 ];
GM_setValue("maximala3" , maximala3);
GM_setValue("minimala3" , minimala3);
}});
var minimala = GM_getValue("minimala3");
var maximala = GM_getValue("maximala3");
}


// -------------------------------- min und max punkte fuer suche  Hamburg -----------------------

else if(document.location.href.indexOf('pennergame.de/')>=0) {
var ausweich = 'Ausweichen';
var link = 'http://www.pennergame.de/';
var siglink = 'http://img.pennergame.de/cache/de_DE/signaturen/';
var externe = 'hamburg';
GM_xmlhttpRequest({
	method:"GET",
	url: ''+link+'/fight/overview/',
   	onload:function(responseDetails) {
     	content = responseDetails.responseText;
      	minimal2 = content.split('Dein Ziel muss ')[1];
       	minimala2 = minimal2.split('bis ')[0];
        maximal2 = content.split('bis ')[1];
        maximala2 = maximal2.split('Punkte haben.')[0];
GM_setValue("maximala2" , maximala2);
GM_setValue("minimala2" , minimala2);
}});
var minimala = GM_getValue("minimala2");
var maximala = GM_getValue("maximala2");
}


// -------------------------------- min und max punkte fuer suche  Menelgame -----------------------

else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var ausweich = 'Ausweichen';
var link = 'http://www.menelgame.pl/';
var siglink = 'http://img.menelgame.pl/cache/pl_PL/signaturen/';
var externe = 'menelgame';
GM_xmlhttpRequest({
	method:"GET",
	url: ''+link+'/fight/overview/',
   	onload:function(responseDetails) {
     	content = responseDetails.responseText;
      	minimal4 = content.split('od ')[3];
       	minimala4 = minimal4.split(' do')[0];
        maximal4 = content.split('do ')[2];
        maximala4 = maximal4.split('punkt')[0];
GM_setValue("maximala4" , maximala4);
GM_setValue("minimala4" , minimala4);
}});
var minimala = GM_getValue("minimala4");
var maximala = GM_getValue("maximala4");
};



GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'fight/overview/',
onload: function(responseDetails) {
var content = responseDetails.responseText;
try{
//var bastiswarnere = content.split("bereits auf")[1].split("</a></span>")[0];//bl hh  Name ermitteln
var profilid = content.split("bereits auf")[1].split("</a></span>")[0];//bl hh  Name ermitteln
}catch(e){}
try{
var bastiswarnere = content.split("warning")[1].split("</a></span>")[1];
}catch(e){}
try{
var bastiswarnere = content.split('<a href="/profil/id:')[1].split('/" style="')[0];
}catch(e){}
try{
var berlinendeausgehenede = content.split("Ende ca. ")[1].split("<br />")[0];// polen naameen ermitteeln
}catch(e){}


try{
 if(content.match(/Pennername/) || content.match(/Nazwa menela/) || content.match(/Tramp's name/)){


var newspana2 = document.createElement("tr");
newspana2.setAttribute('id', 'news_blaaw');
newspana2.setAttribute('name', 'news__blaaw');
newspana2.setAttribute('style', 'position:absolute;top:'+VonOben+'px;left:'+VonRechts+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite+'px solid '+borderfarbe+'; background-color:'+hintergrundfarbe+'');
var navigation = document.getElementById("header");
navigation.appendChild(newspana2);

document.getElementById("news_blaaw").innerHTML ='<center><img src=\"https://www.raumberg-gumpenstein.at/cms/administrator/components/com_acajoom/images/button_ok.png\" border=\"0\"><a href="'+link+'/highscore/range/?max_points='+maximala+'&amp;min_points='+minimala+'"><span style=\"color:'+schrieftfarbe+'; font-size:'+schrieftgroese+'%;\"><b>Angreifbare Spieler anzeigen</b></span></a><img src=\"https://www.raumberg-gumpenstein.at/cms/administrator/components/com_acajoom/images/button_ok.png\" border=\"0\"><a target=\"_blank\" href="http://pennergame.ath.cx/highscore-suche/?points_min='+minimala+'&points_max='+maximala+'&bande=egal&sortby=cash&sorttype=desc&action=Suchen"><span style=\"color:'+schrieftfarbe+'; font-size:'+schrieftgroese+'%;\"><b>Externe Gegner suche</b></span></a>'+
'<img src=\"https://www.raumberg-gumpenstein.at/cms/administrator/components/com_acajoom/images/button_ok.png\" border=\"0\"><a target=\"_blank\" href="http://mindf.org/content/pennergame-highscore-tool-'+externe+'"><span style=\"color:'+schrieftfarbe+'; font-size:'+schrieftgroese+'%;\"><b>Noch mal externe suche</b></span></a><img src=\"https://www.raumberg-gumpenstein.at/cms/administrator/components/com_acajoom/images/button_ok.png\" border=\"0\"></center>';

}
}catch(e){}

GM_setValue("bastiswarnere" , bastiswarnere);

// selber kampf gestartet ---------------------------------------------------------------------------------------------------

if(content.match(/bereits auf/) || content.match(/already/) || content.match(/atak na/)){




GM_xmlhttpRequest
  ({             
  method: 'GET',
      url: ''+link+'/profil/id:'+bastiswarnere+'/',
        onload: function(responseDetails)
         {
     var content = responseDetails.responseText;
   if (content.indexOf('Online') >=0) {
 var online = "<img src='http://media.pennergame.de/img/on.gif' width='30' height='30'><img src='http://media.pennergame.de/img/on.gif' width='30' height='30'><img src='http://media.pennergame.de/img/on.gif' width='30' height='30'>";
 }else{
var online = "<img src='http://media.pennergame.de/img/off.gif' width='30' height='30'><img src='http://media.pennergame.de/img/off.gif' width='30' height='30'><img src='http://media.pennergame.de/img/off.gif' width='30' height='30'>";
}




//alert(""+bastiswarnere+"");
var bastiswarnere = GM_getValue("bastiswarnere");
GM_xmlhttpRequest({
  method: 'GET',
          url: ''+link+'/dev/api/user.'+bastiswarnere+'.xml',
          onload: function(responseDetails) {
	  var parser = new DOMParser();
          var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	try{
                var name1 = dom.getElementsByTagName('name')[0].textContent;
                var id = dom.getElementsByTagName('id')[0].textContent;
		var band1 = dom.getElementsByTagName('name')[1].textContent;
                var reg1 = dom.getElementsByTagName('reg_since')[0].textContent;
      }catch(e){}
try{ 
		var cash1 = dom.getElementsByTagName('cash')[0].textContent/100;
		//var geldsignatur = "<div style='overflow: hidden; width: 400px; height: 16px;'><img style='position: relative; top: -22px; left: -95px;' src='"+siglink+"" + id + ".jpg'></div>";
		//var promille = "<div style='overflow: hidden; width: 100px; height: 19px;'><img style='position: relative; top: -40px; left: -90px;' src='"+siglink+"" + id + ".jpg'></div>";


var newspan1 = document.createElement("tr");
newspan1.setAttribute('id', 'news_bla1');
newspan1.setAttribute('name', 'news__bla1');
newspan1.setAttribute('style', 'position:absolute;top:'+VonOben2+'px;left:'+VonRechts2+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite2+'px solid '+borderfarbe2+'; background-color:'+hintergrundfarbe2+'');   var navigation = document.getElementById("header");
navigation.appendChild(newspan1);
document.getElementById("news_bla1").innerHTML = '<a href="'+link+'profil/id:'+id+'/"><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>Name: '+name1+' </b></span></a><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b> Geld :'+cash1+'</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>Bande:'+band1+'</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>'+online+'</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>'+berlinendeausgehenede+'</b></span></div></a>';


}catch(e){
var newspan1 = document.createElement("tr");
newspan1.setAttribute('id', 'news_bla1');
newspan1.setAttribute('name', 'news__bla1');
newspan1.setAttribute('style', 'position:absolute;top:'+VonOben2+'px;left:'+VonRechts2+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite2+'px solid '+borderfarbe2+'; background-color:'+hintergrundfarbe2+'');  var navigation = document.getElementById("header");
navigation.appendChild(newspan1);
document.getElementById("news_bla1").innerHTML = '<a href="'+link+'profil/id:'+id+'/"><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>Name: '+name1+' </b></span></a><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b> Geld :DEAKTIVIERT</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>Bande:'+band1+'</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>---</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>'+online+'</b></span><span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese2+'%;\"><b>'+berlinendeausgehenede+'</b></span></div></a>';


}
}});
}})
}





// ---------------------  kampf kommt rein ----------------------------------------------------------------------------------
GM_xmlhttpRequest({
   method: 'GET',
    url: ''+link+'/fight/overview/',
      onload: function(responseDetails) {
	var content = responseDetails.responseText;
      var part = content.split("warning")[1];
   var ende1 = part.split("<td>")[1];

if(content.match(/warning/)) {

GM_xmlhttpRequest({		  
   method: 'GET',
    url: ''+link+'/fight/overview/',
       onload: function(responseDetails) 
       {
    var content = responseDetails.responseText;					
try{
   var incoming1 = content.split(''+ausweich+'</strong></td>')[1];
      }catch(e){}				
	var allincoming = incoming1.split('</table>')[0];
      var anzahl = allincoming.split('<tr').length-1;	
	var id1 = allincoming.split('<a href="/profil/id:')[1]							
  var id2 = id1.split('/')[0];

GM_xmlhttpRequest({
  method: 'GET',
   url: ''+link+'/dev/api/user.' + id2 + '.xml',
    onload: function(responseDetails,id2) {
      var parser = new DOMParser();
	 var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	     var name = dom.getElementsByTagName('name')[0].textContent;
		var id2 = dom.getElementsByTagName('id')[0].textContent;
		try {
	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
     }catch (e) {
  var cash = 'Deaktiviert';
}
GM_xmlhttpRequest
  ({             
  method: 'GET',
      url: ''+link+'/profil/id:'+id2+'/',
        onload: function(responseDetails)
         {
     var content = responseDetails.responseText;
   if (content.indexOf('Online') >=0) {
 var online = "<img src='http://media.pennergame.de/img/on.gif' width='30' height='30'><img src='http://media.pennergame.de/img/on.gif' width='30' height='30'><img src='http://media.pennergame.de/img/on.gif' width='30' height='30'>";
 }else{
var online = "<img src='http://media.pennergame.de/img/off.gif' width='30' height='30'><img src='http://media.pennergame.de/img/off.gif' width='30' height='30'><img src='http://media.pennergame.de/img/off.gif' width='30' height='30'>";
}
 var newspana = document.createElement("tr");
  newspana.setAttribute('id', 'news_blaa');
   newspana.setAttribute('name', 'news__blaa');
    newspana.setAttribute('style', 'position:absolute;top:'+VonOben1+'px;left:'+VonRechts1+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite1+'px solid '+borderfarbe1+'; background-color:'+hintergrundfarbe1+'');
     var navigation = document.getElementById("header");
      navigation.appendChild(newspana);
       document.getElementById("news_blaa").innerHTML = '<br><a href="'+link+'profil/id:'+id2+'/"><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\"><b>Fights:'+anzahl+' </span><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">--</span><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\"> Name: '+name+' </span><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\"> hat </span><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\"> Geld :'+cash+' Euro</span><span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\"> ist </span> '+online+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Ende :'+ende1+'</span></b></font></a></div><br>';
      }});
     }});
    }});
   }
  }});
}})
// copyright by basti1012 

