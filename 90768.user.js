// ==UserScript==
// @name          Kapiworld
// @description   Marktberechnung für Kapiworld
// @author        koyote44
// @include       http://s1.kapiworld.de/k.php?page=market*
// ==/UserScript==

var products = new Array();

products[X] X = Produkt Id
// VK: empf. Verkaufspreis
// T: Verkaufszeit in Sekunden

products['95'] = { 'VK':50.62, 'T':143};            // Milch
products['91'] = { 'VK':109.84, 'T':316};           // Kartoffeln
products['80'] = { 'VK':85.46, 'T':243};            // Eier
products['72'] = { 'VK':77.04, 'T':222};            // Äpfel
products['76'] = { 'VK':77.04, 'T':222};            // Birnen
products['74'] = { 'VK':77.04, 'T':222};            // Bananen
products['85'] = { 'VK':185.01, 'T':519};           // Hühner
products['78'] = { 'VK':403.87, 'T':1125};          // Brote
products['108'] = { 'VK':357.88, 'T':1007};        // Zucker
products['96'] = { 'VK':77.04, 'T':222};            // Orangen
products['107'] = { 'VK':77.04, 'T':222};            // Zitronen
products['81'] = { 'VK':77.04, 'T':222};            // Erdbeeren
products['105'] = { 'VK':77.04, 'T':222};            // Weintrauben
products['84'] = { 'VK':241.66, 'T':656};            // Hackfleisch
products['93'] = { 'VK':255.80, 'T':696};            // Lammfleisch
products['99'] = { 'VK':285.34, 'T':778};            // Rindfleisch
products['103'] = { 'VK':274.16, 'T':752};            // Schweinefleisch
products['101'] = { 'VK':336.20, 'T':935};            // Schokoriegel
products['87'] = { 'VK':260.57, 'T':707};            // Kaffeepulver
products['79'] = { 'VK':219.87, 'T':613};            // Kaffeepulver


function round(x, n)
{
  var a = Math.pow(10, n);
  return (Math.round(x * a) / a);
}

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
    //alert($().jquery); // check jQuery version
    //$('#chatbar').hide();
    //$('#chatbar2').hide();
    try {
        $("tr.marketrow1,.marketrow2").each(function() {
            $(this).children().each(function(index) {

                if(index == 2) {
                    var a = $(this).children();
                    var href = a.attr('href');
                    var m = /filterid=(\d+)/;
                    m.exec(href);
                    filterid = RegExp.$1;
                    filterid=filterid.trim();
                    if(products[filterid]) a.css('color', 'red');
                }
                if(index == 4) {
                    x = $(this).text();
                    x = x.replace( /,/,"." );
                    var price = parseFloat(x);

                    if(products[filterid]) {
                        var diff = round(products[filterid].VK - price, 2);
                        var diff_t = round(diff / (products[filterid].T / 60), 1);
                        $(this).append(" (" + diff + "¢ / " + diff_t + ")");
                    }

                }
            });
                //if(text) alert(text);
        });
    } catch(e) {
    alert(e);
    }    
}