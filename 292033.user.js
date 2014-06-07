// ==UserScript==
// @name  			Kurs DOGEcoin na belce Wykop.pl !
// @namespace     	http://www.wykop.pl/
// @description  	Kurs DOGEcoin na wykopowej belce - na podstawie cryptocoincharts
// @include   		http://www.wykop.pl/*
// @author        	Recydywa (pomysłodawca), HAJ_fajv
// @version			0.5
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
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = eval('(' + xmlhttp.responseText + ')');
                document.getElementById("cena1doge").innerHTML = 'Ð = ' + (parseFloat(json.price) * 100000000).toFixed(0) + " Sat";
            }
        }
        xmlhttp.open("GET", "http://www.cryptocoincharts.info/v2/api/tradingPair/doge_btc&t=" + Math.random(), true);
        xmlhttp.send();
    }

    $(document).ready(function()
    {
        var doge = '<div class="fleft">' + '<a href="http://egod.pl" target="_blank" title="Kurs DOGE"' + 'class="tip fleft cfff tab fbold  " id="cena1doge" style="color:#43c8ff !important"></a>' + '</div>';
        $('nav.main.medium.rel').append(doge);

        getURL(); // przy zaladowaniu 
        var timeout; // co minute
        timeout = setInterval(function() {
            getURL();
        }, 30000);

    });
}
// load jQuery and execute the main function
addJQuery(main);
