// ==UserScript==
// @name           AdTaily - Przelicznik cenowy
// @namespace      http://kubofonista.net/adtaily-przelicznik
// @description    Przelicza ile zl trafi dla wydawcy z wpisanej przez niego kwoty
// @include        http://*adtaily.pl/publisher/websites/*/edit
// @require	       http://userscripts.org/scripts/source/67066.user.js
// ==/UserScript==

przelicznik = '<b>Kwota jaka otrzymasz za reklame:</b> <span id="kwota_gotowa">??</span> zl';
$('.helpList').append(przelicznik);

$(document).ready(function() {
wpisanacena = $('#website_daily_price').val();
cenadla = (wpisanacena.replace(',','.')/100)*70;
cenadla = fixstr(cenadla);

document.getElementById('kwota_gotowa').innerHTML = cenadla;
});

$('#website_daily_price').bind('keyup', function() { 
wpisanacena = $('#website_daily_price').val();
cenadla = (wpisanacena.replace(',','.')/100)*70;
cenadla = fixstr(cenadla);

document.getElementById('kwota_gotowa').innerHTML = cenadla;

} );


function fixstr(num) {
var numv=num-0;
var sign=(numv>=0?1:-1);
var numabs=numv*sign;
var naint=Math.floor(numabs);
var nacent=Math.round((numabs-naint)*100);
if (nacent>=100) {nacent=0; naint++;}
var nais=''+naint;
var nacs=(nacent<10?'0':'')+nacent;
if (naint+nacent==0) sign=1;
return (sign==1?'':'-')+nais+'.'+nacs;
}