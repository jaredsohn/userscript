// ==UserScript==
// @name           kurs doge
// @namespace      whatever
// @include        http://*.wykop.pl/*
// ==/UserScript==

function addJQuery(callback) {
var script = document.createElement("script");
script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
script.addEventListener('load', function() {
var script = document.createElement("script");
script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
document.body.appendChild(script);
}, false);
document.body.appendChild(script);
}

function main() {

function getURL() {

var url = 'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132';

$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent(url) + '%22&format=json', function (data) {

var firstCurrencyValue = data['query'].results.json.return.markets.DOGE.lasttradeprice;
var secondCurrency = data['query'].results.json.return.markets.DOGE.secondarycode;
$('#cena1kdoge').html(firstCurrencyValue);
$('#cena1wsat').html(firstCurrencyValue* 100000000 + " Satoshi");
$('#cenawaluty1').html(secondCurrency+"/Ð = "+ firstCurrencyValue);
});

}

$(document).ready(function()
{
getURL();
var refreshRate = 30; // seconds
$('<div class="quickpoint miniwall scaledrop fright fbold rel" style="padding-right: 5px;"><span id="cena1kdoge" ></span><p id="cena1wsat"></p></div>').insertAfter(".main.medium.rel");
var dogek = '<div class="fleft">' +
'<a href="http://egod.pl" target="_blank" title="Kurs DOGE"' + 'class="tip fleft cfff tab fbold " style="color:#43c8ff !important" id="cenawaluty1"></a>' + '</div>';
$('nav.main.medium.rel').append(dogek);


var autorefresh=setInterval(function(){getURL();},refreshRate*1000)

});


}
// load jQuery and execute the main function
addJQuery(main);