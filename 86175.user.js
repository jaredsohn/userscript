// ==UserScript==
// @name           Elite Redemption Alerter
// @namespace      http://lockerzelites.cz.cc
// @description    The Elite Redemption Alerter (ERA) allows you to automatically redeem any prize on Lockerz during a redemption.
// @include        ptzplace.lockerz.com*
// ==/UserScript==
   
var values = ["EMAIL", "PASSWORD", "PASSWORD"];
$("input").each(function(i){ $(this).val(values[i]); }); document.getElementById("recaptcha_response_field" ).focus(); 

var Boutique = 'ELECTRONICS';
if (document.getElementById('boutiques'))
	window.location = $('.boutiqueTitle:contains("'+Boutique+'")').parent('a').attr('href');

var values = [
"FIRST NAME",
"LAST NAME",
"ADDRESS 1",
"ADDRESS 2",
"CITY",
"STATE / PROVINCE",
"POSTAL CODE",
"",
"",
"",
"PHONE NUMBER" 
];

selectCountry("USA", $("a[onclick*='USA']").get(0));
hideCountries();

$("input").each(function(i){
$(this).val(values[i]);
});

document.getElementById("recaptcha_response_field" ).focus(); 

selectState("FL", $("a[onclick*='FL']").get(0));