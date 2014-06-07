// ==UserScript==
// @author         Zari
// @name           PGU zbiorki
// @description    Wyswietla aktualne rozkazy  
// @namespace      Erep_PGU
// @version        1.3
// @include        http://www.erepublik.com/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    jQ(document).ready(function () {
        if (location.href.match('^http\\:\\/\\/www\\.erepublik\\.com\\/[a-zA-Z]{2}$')){
            var column = jQ('#content div.column').eq(1);
            var szerokosc = column.width();
            column.prepend('<iframe src="http://5.175.181.125/index.php?u='+ErpkPvp.citizenId+'" style="border: none; max-width: 100%; min-width: 180px;" width="'+szerokosc+'"></iframe>');
        }            
    });
}

// load jQuery and execute the main function
addJQuery(main);