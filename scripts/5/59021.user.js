// Advanced Free Commander
// 2006-11-15
// Copyright (c) 2006
// Official site : http://formulas.webator.net/AFC/
// Forum : http://script-afc.darkbb.com/index.forum
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Ogame FR : AJOUT LIENS MENU GAUCHE
// @author Izcelion, v2 par Seyguai
// @description Ogame FR : AJOUT LIENS MENU GAUCHE
// @language FR
// @include http://*/game/index.php*
// ==/UserScript==

if (!(document.body.textContent.search(/Univers \d+ \(v .+\)/) + 1)) return;

//====================
// Get Player Name
//====================
function GetPlayerName(uni) {
   var PlayerName = "Inconnu";
   var sentence1 = "U_fr"+uni+":";
   var sentence2 = "=";
   var pos1 = (document.cookie).indexOf(sentence1,0);
   if (pos1>=0) {
      var pos2 = (document.cookie).indexOf(sentence2,pos1+sentence1.length);
      PlayerName  = (document.cookie).substring(pos1+sentence1.length,pos2);
      //alert(PlayerName);
   }
   return PlayerName;
}

//===========================
// Get value in a cookie
//===========================
function getCookieVal(offset) {
   var endstr=document.cookie.indexOf (";", offset);
   if (endstr==-1)
            endstr=document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));
}

//======================================
// Get the value of variable in a cookie
//======================================
function GetCookie (name) {
   var arg=name+"=";
   var alen=arg.length;
   var clen=document.cookie.length;
   var i=0;
   while (i<clen) {
      var j=i+alen;
      if (document.cookie.substring(i, j)==arg)
                        return getCookieVal (j);
                i=document.cookie.indexOf(" ",i)+1;
                        if (i==0) break;}
   return null;
}

//===========================
// Add Menu
//===========================
function addMenu(addUrl,addUrlTarget,addUrlTitre){
 var sentence = "<tr><td><div align=\"center\"><font color=\"#ffffff\"><a href=\""+addUrl+"\" target=\""+addUrlTarget+"\">"+addUrlTitre+"</a></font></div></td></tr>";
   return sentence;
}

//===========================
// Get Session ID
//===========================
function GetSessionID(){
   var SessionID = "";
   var sentenceIni = window.location.href;
   var sentence1 = "session=";
   var pos1 = sentenceIni.indexOf(sentence1,0);
   if (pos1 >= 0 ){
      SessionID  = sentenceIni.substring(pos1+sentence1.length,pos1+sentence1.length+12);
   }
   //alert(SessionID);
   return SessionID;
}

(function(){

//=================================
// Check if it's a French Universe
//=================================
var Universe = document.URL.match(/uni(\d+)\.ogame\.fr/);
if (Universe.length - 1) {
Universe = Universe[1];


   //===========================
   // Remove <script>
   //===========================
   var scriptnode = document.getElementById('leftmenu').getElementsByTagName('script');
   var i = 0;
   while (i<scriptnode.length){
      scriptnode[i].parentNode.removeChild(scriptnode[i]);
      scriptnode = document.getElementById('leftmenu').getElementsByTagName('script');
   }


   //=========================
   // Remove empty <tr></tr>
   var trnode = document.getElementById('leftmenu').getElementsByTagName('tr');
   var i = 0;
   var status = true;
   while (i<trnode.length){
      var centernode = trnode[i].getElementsByTagName('center');
      if(centernode.length>0){
         var sentence = centernode[0].innerHTML;
         if (sentence == 0){
            trnode[i].parentNode.removeChild(trnode[i]);
            i--;
         }
      }
      i++;
   }


   var tbodynode = document.getElementById('leftmenu').getElementsByTagName('tbody');
   tbodynode[0].innerHTML += "<tr><td><div align=\"center\"><hr></div></td></tr>";

   


   //===========================
   // Forum DEAD externe
   var addUrl = "http://deadineyes.ogameforever.com/";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Forum DEAD externe";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);


   //===========================
   // Forum DEAD interne
   var addUrl = "http://deathineyesdu57.ogameteam.net/";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Forum DEAD interne";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);


   //===========================
   // Ajouter Membres Alliance
   var addUrl = "http://uni"+Universe+".ogame.fr/game/index.php?page=allianzen&session="+GetSessionID()+"&a=4&sort1=3&sort2=0";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Membres";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   
   //===========================
   // Ajouter le raccourci message a l'alliance
   var addUrl = "http://uni"+Universe+".ogame.fr/game/index.php?page=allianzen&session="+GetSessionID()+"&a=17";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Msg Alli";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);
   

   //===========================
   // Ajouter classement joueurs
   var addUrl = "http://ogame.athost.fr/index.php?aff=news";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "class Joueur";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Menu rapport espionnage
   var addUrl = "http://restyler-ogame.ovh.org/";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Rapport Espio";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter rapport combat 1
   var addUrl = "http://www.ogame-winner.com/index.php?lang=fr&page=convrc";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "RC 1";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);
   
   //===========================
   // Ajouter rapport combat 1
   var addUrl = "http://www.takanacity.com/main.php?tag=crconverter";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "RC 2";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter simulation attaque mip
   var addUrl = "http://www.ogame-winner.com/index.php?lang=fr&page=simmip";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "MIP";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);


   //===========================
   // Ajouter Le piloris
   var addUrl = "http://uni"+Universe+".ogame.fr/game/pranger.php";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Piloris";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //alert("Standard leftmenu.php (Menu)");

}

})();