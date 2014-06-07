// ==UserScript==
// @name        Mr. Mine/Auto-Chest/Auto-Sell (for V0.35)
// @author      Anonimal/toine7m
// @namespace   *
// @description Click Automatically on Chests, sell Ore's and Isotopes
// @include     http://*.mrmine.com/*
// @include     http://mrmine.com/*
// @version     2.0
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
    $("#SB8").click(); /* Coltan*/
    $("#SB9").click(); /* Painite*/
    $("#SB10").click(); /* Black opal */
    $("#SB11").click(); /* Red Diamond */
    $("#SB12").click(); /* Obsidian */
    $("#SB13").click(); /* Californium */
    $("#BTS2").click(); /* Sell Isotope */
    $("#SB2").click(); /* Uranium 238 */
    $("#SB3").click(); /* Uranium 235 */
    $("#SB4").click(); /* Uranium 234 */
    $("#SB5").click(); /* Plutonium 1 */
    $("#SB6").click(); /* Plutonium 2 */
    $("#SB7").click(); /* Plutonium 3 */
    $("#SB8").click(); /* Polonium 1 */
    $("#SB9").click(); /* Polonium 2 */
    $("#SB10").click(); /* Polonium 3 */
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