// ==UserScript==
// @name AntyTroll-DPv2
// @author SpiritRKS1910
// Want you more? Visit my page: www.crimsteam.site90.net
// @include http://www.dobreprogramy.pl/*,Aktualnosc,*
// @encoding UTF-8
// @version 2.01 
// ==/UserScript==



/* =============== KONFIGURACJA =============== */ /* =============== KONFIGURACJA =============== */



// Do edycji skryptu polecam dowolny edytor tekstu obsługujący kodowanie UTF8, 
// np. darmowy Notepad++ (w opcjach ustawić kodowanie UTF8 bez BOM)

// Deklaracja trolla: wystarczy poszerzyć tablicę troll o dowolny nick, ilość nieograniczona,
// np. troll[5] = "sknera"; troll[6] = "dziadyga"; itd.
// Indeks tablicy zawsze zaczynać od zera i zwiększać o 1
// Ewentualnie wykasować poniższą listę i stosować następujący zapis var troll = new Array("trol1", "trol2", "troll");



var troll = new Array();
troll[0] = "czullo";
troll[1] = "SSEE";
troll[2] = "GalusAnonimus";
troll[3] = "opera zonk";
troll[4] = "sWeeT-Dżola ;)";  


var hideAnonim = 1; // 0 - ukrywa wszystkie anonimowe wpisy, każda inna liczba wyłącza tą opcję


/* =============== KONFIGURACJA =============== */ /* =============== KONFIGURACJA =============== */



/* ----------------- Nie ruszaj niczego w poniższej części kodu ----------------- */



(function(){function h(){var a=document.createElement("span");a.innerHTML="Poka\u017c komentarz trolla("+c+")";a.style.cursor="pointer";var b="";a.addEventListener("click",function(){this.parentNode.getElementsByClassName("commentContent")[0].style.display=="none"?(b=this.textContent.split("(")[1].split(")")[0],this.parentNode.getElementsByClassName("commentContent")[0].style.display="block",this.innerHTML="Ukryj komentarz trolla"):(this.parentNode.getElementsByClassName("commentContent")[0].style.display= "none",this.innerHTML="Poka\u017c komentarz trolla("+b+")")},!1);return a}var a=document.getElementsByTagName("h2")[0],e=document.createElement("p");e.textContent="Lista trolli: "+troll.toString();a.parentNode.insertBefore(e,a.nextSibling);for(var a=document.getElementsByClassName("item"),e=troll.length,f="",b=0;b<a.length;b++){for(var d=a[b].getElementsByClassName("nick")[0],c=d.getElementsByTagName("a").length!=0?d.getElementsByTagName("a")[0].innerHTML:String(d.innerHTML.split("(")[0]),g=0;g<e;g++)if(c== troll[g]||c==troll[g]+" ")d.innerHTML="Uwaga Troll! ("+c+");",f=a[b].getElementsByClassName("commentContent")[0],f.style.display="none",a[b].appendChild(h());if(hideAnonim==0&&c=="Anonim ")d.innerHTML="Uwaga Troll! ("+c+");",f=a[b].getElementsByClassName("commentContent")[0],f.style.display="none",a[b].appendChild(h())}})();