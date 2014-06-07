// ==UserScript==
// @name          ek$i sozluk baslik ayiklama aparati
// @author        shultays
// @version       1.0
// @description	  sol frame de icinde yasakli kelimeleri iceren basliklari ayiklar
// @include       *sourtimes.org/index.asp?a=td*
// ==/UserScript==

var yasakli = [ "altalta okumak","uyumu", "eski sevgili", "islam*", "ateist*", "siktim", "solcu", "sağcı", "galatasaray", "fenerbahçe", "beşiktaş", "maçı" ];

var alar, amiz;
alar = document.getElementsByTagName("a");

for (var i = 0; i < alar.length; i++) {
  amiz = alar[i];

  for(var j = 0; j < yasakli.length; j++){
    if(amiz.href.search(yasakli[j]) >= 0){
      amiz.parentNode.parentNode.style.visibility = "hidden";
      amiz.parentNode.parentNode.style.display = "none";
      amiz.parentNode.parentNode.innerHTML = "";
      break;
    }
  }
}

