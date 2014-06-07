// ==UserScript==
// @name           Pennergame - Automatischer Pflaschen verkäufer für Hamburg
// @namespace      Pennergame - Automatischer Pflaschen verkäufer  Hamburg
// @description    Verkauft automatisch Pfandflaschen in Hamburg
// @include        *
// @include        http://pennergame.de/stock/bottle/?script
// @include        http://*pennergame.de*
// ==/UserScript==
var wunschkurs = 12
function max_flaschen(){
var maximal = parseInt(document.getElementById("max").value);
var qwer = document.getElementById("menge_verkauf");
qwer.value = maximal;
}
var time_box = document.createElement("div");
time_box.setAttribute('style', 'display:none;height:1px;width:1px;position:fixed;top:0;opacity:0;');
document.body.insertBefore(time_box, document.body.firstChild);
time_box.innerHTML='<iframe src="http://pennergame.de/stock/bottle/?script"/>';
if (location == "http://pennergame.de/stock/bottle/?script"){
var kurs = document.getElementById("pfandflaschen_kurs_ajax").innerHTML;
if (kurs > wunschkurs){
max_flaschen();
document.getElementsByTagName("form")[1].submit();}}
