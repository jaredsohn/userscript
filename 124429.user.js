// ==UserScript==
// @name           Schaf Bam
// @namespace      bamBAM
// @include        *engine*.earthlost.de*
// ==/UserScript==

GM_registerMenuCommand("Konfiguration-2", function()
{
  var popup = window.open("http://127.0.0.1.html", "popup", "dependant=yes,width=400,height=570");
});

// - Blockers
   var configAdframe = true;	//Blockt die große Werbung
   var configVoten = true;	//Blockt die Aufforderung zu Voten
   var configHilfe = true;	//Blockt die Tutorial Zeile
   var configXtended = true;	//Blockt die Xtended Account Werbung
   var configOnline = true;	//Blockt die Anzahl der eingeloggten User
   var configCopyright = true;	//Blockt das Copyright
   var configRadio = true;	//Blockt das Radio Werbung
var configWeihnachtsnoul = true;

var trs = document.getElementsByTagName("tr");

for (i=0; i<trs.length;i++)
{
if (trs[i].className == "normaltext") 
{
if (trs[i].innerHTML.match("Spielen Sie den Earth Lost Xtended Account") && configXtended) 
{
  trs[i].innerHTML = '';
}
if (trs[i].innerHTML.match('voten') && configVoten) {
  trs[i].innerHTML = '';
}
}
}