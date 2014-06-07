// ==UserScript==
// @name          ek$i sozluk lost basliklarini ayiklama aparati
// @author        shultays
// @version       1.0
// @description	  sol frame de icinde lost gecen basliklari itina ile ayiklar
// @include       *sourtimes.org/index.asp?a=td*
// ==/UserScript==


var alar, amiz;
alar = document.getElementsByTagName("a");

for (var i = 0; i < alar.length; i++) {
  amiz = alar[i];

  if(amiz.href.search("lost") >= 0){
    amiz.parentNode.parentNode.style.visibility = "hidden";

    amiz.parentNode.parentNode.style.display = "none";
    amiz.parentNode.parentNode.innerHTML = "";
  }
}