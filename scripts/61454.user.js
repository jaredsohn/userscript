// ==UserScript==
// @name           Tradera Seller Helper
// @version        0.1
// @namespace      http://davidg.nu
// @description    Sets Tradera.com sell-page default values for your needs
// @include        http://www.tradera.com/regauction/page1.aspx
// @contributor    hacker_112
// @license (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

// The following comments are in swedish since tradera is a swedish site
// Beskrivning: Detta script låter dig sätta egna default-värden för många av valen på traderas säljsida.
// Scriptet är testat med GreaseKit 1.7 med Safari 4

function $(id) {
	return document.getElementById(id)
}
function set_to_default() {
	return $('tbStartBid').value == ""
}

if (set_to_default()) {

// ===========
// Ändra nedanstående för att önskade iställningar
// ===========

// == 1. Rubrik == 
$('tbShortDesc').value = '';


// == 2. Kategori == // Inte använd
// $('lbCategory1').value = "";
// $('lbCategory2').value = "";
// $('lbCategory3').value = "";
// $('lbCategory4').value = "";


// == 3. Beskrivning ==
$('ItemAttributeDropDown').selectedIndex = '2'; // Objektets Skick: (2=Begagnat|1=Nytt)
toggleEditor('tbLongDesc',true); // Sätt till beskrivning i HTML-läge
$('tbLongDesc').value = ''; // Beskrivning


// == 4. Bilder == // Inte använd


// == 5. Pris och annonslängd == 
// = Pris =
$('tbStartBid').value = '1'; //Utropspris
$('tbBuyNowPrice').value = ''; //"Köp nu"-pris
$('tbReservePrice').value = ''; //Reservationspris
// $('cbRestart').checked = false; //Starta om automatiskt
// = Annonslängd =
$('rbAuctionLengthFixed').checked = true; //Fast längd
var ddlDuration = 14 //Längd (3-14)
$('ddlDuration').selectedIndex = ddlDuration-3;
// $('rbAuctionLengthCustom').checked = true; // Fixt datum
// $('ddlCustomEndDate').value = "ÅÅÅÅ-MM-DD"; // Datum
// $('ddlCustomEndTime').value = "00:00:00"; // Tid


// == 6. Lyft fram ditt object ==
// $('cbHighlight').checked = true; // Highlight
// $('cbFeature').checked = true; // Utvalt objekt


// == 7. Frakt och betalsätt
// = Säljområde =
$('rbAcceptedBuyersSweden').checked = true; //Sverige
// $('rbAcceptedBuyersNordic').checked = true; //Norden
// $('rbAcceptedBuyersInternational').checked = true; //Internationellt
// = Hur vill du få betalt = 
$('cbPaymentAccount').checked = true; // Bankkonto
// $('cbPaymentPlusGiro').checked = true; // Plusgiro / Bankgiro
// $('cbPaymentPostforskott').checked = true; // Postförskott
$('cbCash').checked = true; // Kontant vid avhämtning
// $('cbPaypal').checked = true; // Paypal
// $('cbPaysonGuarantee').checked = true; // Payson garanti
// $('cbPayson').checked = true; // Payson
// = Fraktsätt =
$('ShippingOption1_ddlShippingType').value = '2'; // (1=Posten|2=DHL|7=Schenker|3=Bussgods|6=Annat fraktsätt|11=Endast avhämtning)
$('ShippingOption1_ddlShippingType').onchange(); // Uppdatera inmatningsfältet
$('ShippingOption1_tbShippingCost').value = ''; // Kostnad
// $('ShippingOption2_ddlShippingType').value = '1';
// $('ShippingOption2_ddlShippingType').onchange(); // Uppdatera inmatningsfältet
// $('ShippingOption2_tbShippingCost').value = '10';
$('AcceptPickup').checked = true; // Accepterar avhämtning


//Referens
$('tbReference').value = ''; 

};
