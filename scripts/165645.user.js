// ==UserScript==
// @name        XCHAT user check
// @namespace   PaulReage70
// @include     http://xchat.centrum.cz/*whoiswho/search.php?Button_Search_Top=Hledej&search_nick=*
// @version     1
// ==/UserScript==

(function()
{
//   alert("RELOAD: "+document.URL);
   setTimeout("document.location.reload();", 60000);
})();

var WAV="http://www.soundjay.com/button/button-9.wav";

function chk_user(U) {
  var DET; 
  var DAL;
  var UZIV;
  DET=U.getElementsByClassName("info-icons");
  DAL=U.getElementsByTagName("h4");
  if (DAL) { UZIV=DAL[0].innerHTML.replace(/.*>(.*?)<\/a>(.*)/,"$1"); }
  if (DET[0].innerHTML.search("Je online")>0) { 
   new Audio(WAV).play();
   document.title=document.title+" Online";
//    alert(UZIV+" Online");  
  }

}

var URL=document.URL.replace(/(.*)search_nick=(.*?)/,"$2");
document.title="X: "+ URL;
//alert(URL);
var ZX=document.getElementsByClassName("detail-box z-x"); for (var x=0; x<ZX.length; x++) { chk_user(ZX[x]); }
var MX=document.getElementsByClassName("detail-box m-x"); for (var x=0; x<MX.length; x++) { chk_user(MX[x]); }
var ZXO=document.getElementsByClassName("detail-box z-x odd"); for (var x=0; x<ZXO.length; x++) { chk_user(ZXO[x]); }
var MXO=document.getElementsByClassName("detail-box m-x odd"); for (var x=0; x<MXO.length; x++) { chk_user(MXO[x]); }
