// ==UserScript==
// @name        Mr. Mine/Autoclicker
// @author      Anonimal
// @namespace   *
// @description Clica automaticamente nos baús
// @include     http://*.mrmine.com/*
// @include     http://mrmine.com/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/*
    <input name='VendaTrue' ID='VendaTrue' type='checkbox' value='true' checked='checked' style='top:20px; left:300px; z-index:1000;' />
*/

var ClicaTrue=document.getElementById("ClicaTrue");
var VendeTrue=document.getElementById("VendeTrue");

function ClicaBau()
{
    
    for(var i=1; i < 6; ++i){
    $("#L"+i+"a, #L"+i+"b, #L"+i+"c, #L"+i+"d, #L"+i+"e, #L"+i+"f, #L"+i+"g, #L"+i+"h, #L"+i+"i, #L"+i+"j").click(); 
    } 
    $("#DOWNB").click();
window.setTimeout(ClicaBau, 100);
    
}
ClicaBau();

function VendeTudo()
{
    $("#UPALLB").click();
    $("#PLACE1").click();
    $("#SB2").click(); /* Coal */
    $("#SB3").click(); /* Cooper */
    $("#SB4").click(); /* Silver */
    $("#SB5").click(); /* Gold */
    $("#SB6").click(); /* Platinum */
    $("#SB7").click(); /* Diamond */
    $("#SB8").click(); /*Coltan*/
    $("#SB9").click(); /*Painite*/
    $("#SB10").click(); /*Black opal*/
    $("#CLOSEs").click();
window.setTimeout(VendeTudo, 100000);
}
VendeTudo();


function FechaBau()
{
    $("#chestclosed").click();
    $("#chestopen").click();
    $("#CHEST").click();
    $("#CHESTD").click();
    $("#OPENIT").click();
    $("#BUY").click();
    $("#foundt").click();
window.setTimeout(FechaBau, 0);
}
FechaBau();