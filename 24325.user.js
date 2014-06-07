// ==UserScript==
// @name           HpGrupp kollare
// @namespace     Johan Lindell
// @description    En Liten detalj läggs till på hamsterpaj.net's grupper.
// @include        *hamsterpaj.*/traffa/groups.php*
// ==/UserScript==

var letar = document.getElementsByTagName('div');
var antal=0;
var antal2=0;
for(var index=0; index<letar.length; index++)
{

 if(letar[index].className == 'rounded_corners_red_alert_deluxe_full')
 {
 antal++;

   
 }
 
  if(letar[index].className == 'rounded_corners_orange_full')
 {
 antal2++;

 }
 
}


var laggtill = document.getElementById('content');

laggtill.innerHTML = 'Du har '+antal+'st inlagg riktade till dig<br>Och det finns ' + antal2 + ' nya inlagg i denhar gruppen som inte ar riktade till dig' + laggtill.innerHTML;
