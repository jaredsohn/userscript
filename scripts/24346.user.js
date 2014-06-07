// ==UserScript==
// @name           HelgonReklamBorttagaren
// @namespace     Johan Lindell
// @description    Tar bort reklamen pa helgon.net
// @include        *helgon.net*
// ==/UserScript==



//Vad ska tas bort?
var letar = document.getElementsByTagName('iframe');
var letar2 = document.getElementsByTagName('img');

//Tar bort reklam
for(var index=0; index<letar.length; index++)
{

 if(letar[index].src == 'http://www.helgon.net/lankar/lankar2.aspx')
 {
 
 
  letar[index].parentNode.removeChild(letar[index]);


 }
 
}


//Tar bort den lilla "anonns" skylten
for(var index=0; index<letar.length; index++)
{

 if(letar2[index].src == 'http://www.helgon.net/picz/lankar.gif')
 {
 
 
  letar2[index].parentNode.removeChild(letar2[index]);


 }
 
}


