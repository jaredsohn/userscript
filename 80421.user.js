// ==UserScript==
// @name           Lockerz Script Stocker
// @description    Ayuda a retirar los objetos Out of Stock
// @include         *ptzplace.lockerz.com*
// @include      *forolockerz.com/herramientas/simulador-redeem*
// @include      *ptzplace.lockerz.com*
// @version        1.0
// ==/UserScript==

//fill long-term storage values
if(GM_getValue("sold") == undefined || GM_getValue("redeem") == undefined )
{
   GM_setValue("sold", false);
   GM_setValue("redeem", true);
};


//populate Commands menu & do stuff.
//these first two are for toggling sold-out stuff
if (GM_getValue("sold") == false) {
GM_registerMenuCommand('LA > Show Sold-out Items',
               function ()
               {
                   GM_setValue("sold", true);
                window.location.reload();
               });
};

if (GM_getValue("sold") == true) {
GM_registerMenuCommand('LA > Hide Sold-out Items',
               function ()
               {
                   GM_setValue("sold", false);
                window.location.reload();
               });
};
//and these two are for toggling auto-redeeming
if (GM_getValue("redeem") == false) {
GM_registerMenuCommand('LA > Autoclick \'Redeem\'',
               function ()
               {
                   GM_setValue("redeem", true);
                window.location.reload();
               });
};

if (GM_getValue("redeem") == true) {
GM_registerMenuCommand('LA > Don\'t Autoclick \'Redeem\'',
               function ()
               {
                   GM_setValue("redeem", false);
                window.location.reload();
               });
};

if (GM_getValue("sold") == false) {
//this hides sold out items
GM_addStyle("div.soldOut { display: none; }");
GM_addStyle("div.productFrame { display: none; }");
};

if (GM_getValue("redeem") == true) {
//this autoclicks 'redeem'. comment out with // before each line if you're afraid of cheating
(function() {
   
   redeembuttons = document.evaluate("//input[@id='btnRedeem']", document, null,7, null);
   redeembutton = redeembuttons.snapshotItem(0);

   // click button
   redeembutton.click();

})(); };