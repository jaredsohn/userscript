// ==UserScript==
// @name Gegner mit viel geld suchen
// @namespace basti1012     http://pennerhack.foren-city.de
// @description jagt die Highscore durch und sucht gegner mit viel geld
// @include *pennergame.de/highscore/gang/*
// @include *menelgame.pl/highscore/gang/*
// @include *dossergame.co.uk/highscore/gang/*

// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};
/*
sachen nnoch einbauen
var hight ='http://berlin.pennergame.de/highscore/';
var hight ='http://pennergame.de/highscore/';
var hight ='http://menelgame.pl/highscore/';
var hight ='http://dossergame.co.uk/highscore/';

var suhight ='http://highscore.berlin.pennergame.de/highscore/';
var suhight ='http://highscore.pennergame.de/highscore/';
var suhight ='http://highscore.menelgame.pl/highscore/';
var suhight ='http://highscore.dossergame.co.uk/highscore/';







*/




//var interwall = '2000';

var von = 1;
var bis = 1677311;
var save;
function senden(){
save = 0;
von++;
try{


GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+pgurl+'/dev/api/user.'+von+'.xml',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
	cash = content.split("<cash>")[1];
	cash1 = cash.split("</cash>")[0];
	name = content.split("<name>")[1];
	name1 = name.split("</name>")[0];
	points = content.split("<points>")[1];
	points1 = points.split("</points>")[0];
	band = content.split("<name>")[2];
	band1 = band.split("</name>")[0];
	var idf = content.split('<id>')[1];
	var idf1 = idf.split('</id>')[0];


cash3 = Math.round((cash1/100)*100)/100

if(cash1>=1000000){

//window.location.href = target=\"_blank\" href=\"http://'+window.location.hostname+'/profil/id:'+von+'/';

var box=window.confirm(" test "+von+" id "+idf1+"  Der Penner heist  "+name1+"  \n und hat   "+cash3+"   Euros,\n er hat   "+points1+"   Punkte  \n Er ist in der Bande   "+band1+"    \n Um auf sein Profil zu kommen klicke Ok \n Um weiter su Suchen klicke Abrechen");
if(box==true){
//window.open(''+pgurl+'/profil/id:'+idf1+'/', 'Zweitfenster');

//onClick=\"window.open('http://seite1.de/','blank')\">";
window.location.href = ''+pgurl+'profil/id:'+idf1+'/'; //gleiches fenster
}

}

{}}
},false);
}catch(err){}
};
;
window.setInterval(senden, 1000);	


// copyright by basti1012 






/*
"<li><a target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" 
var jetzt = new Date();
var Std = jetzt.getHours();

if (Std >= 5 && Std < 12) {
  alert("Guten Morgen!");

} else if (Std >= 12 && Std < 18) {
  alert("Guten Tag!");

} else if (Std >= 18 && Std <= 23) {
  alert("Guten Abend!");

} else if (Std >= 0 && Std < 5) {
  alert("Zeit, ins Bett zu gehen!");
}
if(kurs > 17){alert(""+Fenster+"")
window.setInterval(senden, 10000);
*/