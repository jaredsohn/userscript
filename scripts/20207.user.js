// ==UserScript==
// @name           Großsalat
// @namespace      http://www.morgil.de
// @include        http://forum.mods.de/bb/board.php?BID=43
// ==/UserScript==
function sue(QuellText, SuchText, ErsatzText) {
 var LaengeSuchText = SuchText.length;
 var LaengeErsatzText = ErsatzText.length;
 var Pos = QuellText.indexOf(SuchText, 0);
 while (Pos >= 0) {
  QuellText = QuellText.substring(0, Pos) + ErsatzText + QuellText.substring(Pos + LaengeSuchText);
  Pos = QuellText.indexOf(SuchText, Pos + LaengeErsatzText);
 }
 return QuellText;
}
var links = document.getElementsByTagName("a");
for(i=40;i<links.length;i++) {
 if(links[i].innerHTML == "..." ) {
  var nummer = i;
  var anzahl = links[i+1].innerHTML;
  links[i].innerHTML = "";
  for(j=anzahl;j>6;j--) {
   newElement = document.createElement('a');
   newElement.setAttribute('href', "thread.php?TID=140831&page="+j);
   newElement.innerHTML = j;
   links[i+1].parentNode.insertBefore(newElement, links[i]);
  }
  links[i].parentNode.innerHTML = sue(links[i].parentNode.innerHTML, "><", "> <");
  break;
 }
}