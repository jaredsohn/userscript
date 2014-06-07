// Advanced Free Commander
// 2006-11-15
// Copyright (c) 2006
// Official site : http://formulas.webator.net/AFC/
// Forum : http://script-afc.darkbb.com/index.forum
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Ogame FR : Standard leftmenu.php (Menu)
// @author Izcelion
// @description Ogame FR : Standard leftmenu.php (Menu)
// @language FR
// @include http://*/game/leftmenu.php*
// @exclude http://*/game/allianzdepot.php*
// @exclude http://*/game/allianzen.php*
// @exclude http://*/game/b_building.php*
// @exclude http://*/game/bericht.php*
// @exclude http://*/game/bewerbungen.php*
// @exclude http://*/game/buddy.php*
// @exclude http://*/game/buildings.php*
// @exclude http://*/game/flotten1.php*
// @exclude http://*/game/flotten2.php*
// @exclude http://*/game/flottenversand.php*
// @exclude http://*/game/galaxy.php*
// @exclude http://*/game/imperium.php*
// @exclude http://*/game/infos.php*
// @exclude http://*/game/logout.php*
// @exclude http://*/game/messages.php*
// @exclude http://*/game/notizen.php*
// @exclude http://*/game/options.php*
// @exclude http://*/game/overview.php*
// @exclude http://*/game/raketenangriff.php*
// @exclude http://*/game/redir.php*
// @exclude http://*/game/renameplanet.php*
// @exclude http://*/game/resources.php*
// @exclude http://*/game/stat.php*
// @exclude http://*/game/suche.php*
// @exclude http://*/game/techtree.php*
// @exclude http://*/game/writemessages.php*
// ==/UserScript==

//====================
// Get Player Name
//====================
function GetPlayerName (){
   var PlayerName = "Inconnu";
   var sentence1 = "U_fr"+GetUniverse()+":";
   var sentence2 = "=";
   var pos1 = (document·cookie).indexOf(sentence1,0);
   if (pos1>=0) {
      var pos2 = (document·cookie).indexOf(sentence2,pos1+sentence1.length);
      PlayerName  = (document·cookie).substring(pos1+sentence1.length,pos2);
      //alert(PlayerName);
   }
   return PlayerName;
}

//===========================
// Get value in a cookie
//===========================
function getCookieVal(offset) {
   var endstr=document·cookie.indexOf (";", offset);
   if (endstr==-1)
            endstr=document·cookie.length;
   return unescape(document·cookie.substring(offset, endstr));
}

//======================================
// Get the value of variable in a cookie
//======================================
function GetCookie (name) {
   var arg=name+"=";
   var alen=arg.length;
   var clen=document·cookie.length;
   var i=0;
   while (i<clen) {
      var j=i+alen;
      if (document·cookie.substring(i, j)==arg)
                        return getCookieVal (j);
                i=document·cookie.indexOf(" ",i)+1;
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
// Get Server Name
//===========================
function GetServerName(){
   var ServerName = "";
   var sentenceIni = window.location.href;
   var sentence1 = "http://";
   var sentence2 = "/game/";
   var pos1 = sentenceIni.indexOf(sentence1,0);
   if (pos1 >= 0 ){
      var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
      ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
   }
   //alert(ServerName);
   return ServerName;
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

//===========================
// Get Universe
//===========================
function GetUniverseMenu(){
   var Universe = "";
   var sentenceIni = document.body.innerHTML;
   var sentence1 = "<p>Univers ";
   var sentence2 = " (<a href=";
   var pos1 = sentenceIni.indexOf(sentence1,0);
   if (pos1 >= 0 ){
      var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
      Universe = sentenceIni.substring(pos1+sentence1.length,pos2);
   }
   //alert(ServerName);
   return Universe;
}

//===========================
// Get Universe
//===========================
function GetUniverse(){
   var Universe="Error";
   var ServerName = GetServerName();
   switch(ServerName) {
      case "ogame312.de":
         Universe=1;
         break;
      case "ogame290.de":
         Universe=2;
         break;
      case "ogame199.de":
         Universe=3;
         break;
      case "ogame235.de":
         Universe=4;
         break;
      case "ogame333.de":
         Universe=5;
         break;
      case "ogame200.de":
         Universe=6;
         break;
      case "ogame316.de":
         Universe=7;
         break;
      case "ogame259.de":
         Universe=8;
      case "ogame124.de":
         Universe=9;
         break;
      case "ogame250.de":
         Universe=10;
         break;
      case "ogame251.de":
         Universe=11;
         break;
      case "ogame190.de":
         Universe=12;
         break;
      case "81.169.184.163":
         Universe=13;
         break;
      case "ogame317.de":
         Universe=14;
         break;
      case "ogame215.de":
         Universe=15;
         break;
      case "ogame170.de":
         Universe=16;
         break;
      case "ogame181.de":
         Universe=17;
         break;
      case "ogame186.de":
         Universe=18;
         break;
      case "ogame193.de":
         Universe=19;
         break;
      case "ogame221.de":
         Universe=20;
         break;
      case "ogame208.de":
         Universe=21;
         break;
      case "ogame140.de":
         Universe=22;
         break;
      case "ogame123.de":
         Universe=23;
         break;
      case "ogame286.de":
         Universe=24;
         break;
      case "ogame525.de":
         Universe=25;
         break;
      case "ogame240.de":
         Universe=26;
         break;
      case "ogame213.de":
         Universe=27;
         break;
      case "ogame447.de":
         Universe=28;
         break;
      case "ogame135.de":
         Universe=29;
         break;
      case "ogame338.de":
         Universe=30;
         break;
      case "ogame311.de":
         Universe=31;
         break;
      case "ogame216.de":
         Universe=32;
         break;
      case "ogame388.de":
         Universe=33;
         break;
      case "81.169.184.253":
         Universe=34;
         break;
      case "ogame380.de":
         Universe=35;
         break;
      case "s058.gfsrv.net":
         Universe=36;
         break;
      case "81.169.131.155":
         Universe=37;
         break;
      case "ogame391.de":
         Universe=38;
         break;
      case "ogame449.de":
         Universe=39;
         break;
      case "ogame444.de":
         Universe=40;
         break;
      case "ogame464.de":
         Universe=41;
         break;
      case "ogame474.de":
         Universe=42;
         break;
      case "ogame496.de":
         Universe=43;
         break;
      case "ogame501.de":
         Universe=44;
         break;
      case "ogame544.de":
         Universe=45;
         break;
      case "ogame396.de":
         Universe=46;
         break;
      default:
         Universe="Error";
         break;
   };
   //alert(Universe);
   return Universe;
}


(function(){

//=================================
// Check if it's a French Universe
//=================================
if (isFinite(GetUniverse())){

   var eaigu = String.fromCharCode(233);

   //===========================
   // Remove <script>
   //===========================
   var scriptnode = document.getElementsByTagName('script');
   var i = 0;
   while (i<scriptnode.length){
      scriptnode[i].parentNode.removeChild(scriptnode[i]);
      scriptnode = document.getElementsByTagName('script');
   }

   //==================================
   // Remove protection <meta-refresh>
   //==================================
   var headnote = document.getElementsByTagName('head');
   var i = 0;
   while (i<headnote.length){
      var sentenceIni = headnote[i].innerHTML;
      var sentence1 = "<meta http-equiv=\"refresh\""
      var pos1 = sentenceIni.indexOf(sentence1,0);
      if (pos1 >= 0 ){
         var sentence2 = "\">\n";
         var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
         var sentence3 = sentenceIni.substring(pos1,pos2+sentence2.length);
         headnote[i].innerHTML = sentenceIni.replace(sentence3,"");
         headnote = document.getElementsByTagName('head');
      } else i++;
   }

   //===========================
   // Rebuilding menu
   //===========================
   var tdnode = document.getElementsByTagName('td');
   var i = 0;
   var status = true;
   while (i<tdnode.length){

      // Remove 1st image
      if (tdnode[i].innerHTML.indexOf("<img src",0) >= 0 && i == 0){
         tdnode[i].parentNode.removeChild(tdnode[i]);
         status = false;

      // Replace images by <HR>
      } else if (tdnode[i].innerHTML.indexOf("<img src",0) >= 0 && i > 0){
         tdnode[i].innerHTML = "<HR>";
         status = false;

      // Remove Commander pub
      } else if (tdnode[i].innerHTML.indexOf("Infos Commandant",0) >= 0){
         tdnode[i].parentNode.removeChild(tdnode[i]);
         status = false;

      // Remove Commander pub
      } else if (tdnode[i].innerHTML.indexOf("google",0) >= 0){
         tdnode[i].parentNode.removeChild(tdnode[i]);
         status = false;

      // Remove menu help
      } else if (tdnode[i].innerHTML.indexOf("Aide",0) >= 0){
         tdnode[i].parentNode.removeChild(tdnode[i]);
         status = false;
      }

      if (status) i++;
      else {
         tdnode = document.getElementsByTagName('td');
         status = true;
      }
   }

   //=========================
   // Remove empty <tr></tr>
   var trnode = document.getElementsByTagName('tr');
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

   var tbodynode = document.getElementsByTagName('tbody')
   tbodynode[0].innerHTML += "<tr><td><div align=\"center\"><hr></div></td></tr>";

   //===========================
   // Ajouter Membres Alliance
   var addUrl = "http://"+GetServerName()+"/game/allianzen.php?session="+GetSessionID()+"&a=4&sort1=3&sort2=0";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Membres";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Le forum LCIG
   var addUrl = "http://lcig.labolinux.net";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Forum LCIG";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Menu Raksim
   var addUrl = "http://lebossdevar.free.fr/ogame/speedsim/simurocket/simuRocket3.htm";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "RakSim";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Menu Dýcolonisation
   var addUrl = "http://sims99.free.fr/tools/decolonisation/index.php?=calculateur";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "D"+eaigu+"colonisation";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Menu mondsim 2000
   var addUrl = "http://sims99.free.fr/tools/sat/index.php?=mondsim";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Mondsim 2000";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Calculateur de la production/consomation des mines et des Centrales
   var addUrl = "http://sims99.free.fr/tools/production/index.php?=mines";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Prod./Consommation";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Menu Calculateur de champs de dýbris
   var addUrl = "http://sims99.free.fr/tools/calculator2/index.php?=debris";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Champs de d"+eaigu+"bris";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter Le piloris
   var addUrl = "http://"+GetServerName()+"/game/pranger.php";
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Piloris";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Ajouter l'ývolution du classement
   var addUrl = "http://infranova.free.fr/detail.php?pseudo="+GetPlayerName()+"&uni="+GetUniverseMenu();
   var addUrlTarget = "Hauptframe";
   var addUrlTitre = "Evolution joueur";
   tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);

   //===========================
   // Add the new version
   var AFC_version = "1.05e";
   GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://formulas.webator.net/AFC/version',
       headers: {'User-agent': 'Mozilla/4.0 (compatible)',
             'Accept': '*/*',
       },
       onload: function(responseDetails) {
            if (responseDetails.responseText!=AFC_version){
            var addUrl = "http://formulas.webator.net/AFC/";
            var addUrlTarget = "Hauptframe";
            var addUrlTitre = "Nouvelle version Advanced Free Commander v"+responseDetails.responseText;
            tbodynode[0].innerHTML += addMenu(addUrl,addUrlTarget,addUrlTitre);
         };
      
       }
   });

   //alert("Standard leftmenu.php (Menu)");

}

})();
