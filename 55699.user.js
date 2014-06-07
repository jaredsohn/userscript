// ==UserScript==
// @name           spenden button unter freunde
// Version         xxa 1.12ss basti1012 fuer alle games 
// @namespace      by basti1012 (visit http://pennerhack.forren-city.de)
// @description    fuegt hinter deinen freunde ein spendenlink ein den man dann selber noch eingeben muss
// @include        http://*pennergame.de/friendlist/*
// @include        http://*dossergame.co.uk/friendlist/*
// @include        http://*menelgame.pl/friendlist/*
// @include        http://*clodogame.fr/friendlist/*
// @include        http://*mendigogame.es/friendlist/*
// @exclude        http://newboard.pennergame.de*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var pgurl = 'http://dossergame.co.uk/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
  var pgurl = 'http://mendigogame.es/';
}






else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var pgurl = 'http://clodogame.fr/';




};

var link1 = GM_getValue("link1");
if (link1 == null){
link1 = '/change_please/5230353/';
GM_setValue("link1" , link1);
};


var link0 = GM_getValue("link0");
if (link0 == null){
link0 = 'http://pennerhack.foren-city.de';
GM_setValue("link0" , link0);
};


document.title = ' Copyright by Basti1012';
 var my_table0 = document.getElementsByClassName("tieritemA")[0];
  my_table0.innerHTML +='<h3>Bastis Spendenbuttons</h3><input type="button" id="spendi" value="Alle daten Speicheren">Pennergame Links bitte ohne Hauplink eingeben nur zb(/change_please/5230353/) Spendenlinks fuer andere Pennergames mit Hauptlink.Alle anderen Links kommplett siehe Beispiele.Mfb Basti1012';

 
for(h = 0; h <= 10; h++) {
 try{
  var my_table1 = document.getElementsByClassName("tieritemA")[1];
   var my_table = my_table1.getElementsByTagName("tr")[1+h];
    var info_id1 = my_table1.getElementsByTagName("tr")[h+1];
     info_id1.innerHTML +='<input type="text" id="link'+h+'" sitze="3" value="'+GM_getValue("link"+h)+'" ><a href="'+GM_getValue("link" + h)+'" target="_blank">'+GM_getValue("link" + h)+'</a><br>';

document.getElementById("spendi").addEventListener('click', function speichern2() {

 var spendenlink1 = document.getElementById("link1").value;
  GM_setValue("link1", spendenlink1);
   var spendenlink2 = document.getElementById("link2").value;
    GM_setValue("link2", spendenlink2);
     var spendenlink0 = document.getElementById("link0").value;
      GM_setValue("link0", spendenlink0);
       var spendenlink3 = document.getElementById("link3").value;
        GM_setValue("link3", spendenlink3);
         var spendenlink4 = document.getElementById("link5").value;
          GM_setValue("link4", spendenlink4);
           var spendenlink6 = document.getElementById("link6").value;
            GM_setValue("link6", spendenlink6);
             var spendenlink5 = document.getElementById("link5").value;
              GM_setValue("link5", spendenlink5);
               var spendenlink7 = document.getElementById("link7").value;
                GM_setValue("link7", spendenlink7);
                 var spendenlink8 = document.getElementById("link8").value;
                  GM_setValue("link8", spendenlink8);
                   var spendenlink9 = document.getElementById("link9").value;
                    GM_setValue("link9", spendenlink9);
   alert("Namen und Links gespeichert! Seite wird neu geladen...");
  location.reload();
 }, false);
 
}catch(e){
 
}
}


// CpYRIgh By basti1012