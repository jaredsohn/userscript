// ==UserScript==
// @name          Rozkazy MON
// @description   Rozkazy Ministerstwa Obrony Narodowej
// @include       http://www.erepublik.com/*
// @version       2.0.1
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
    jQ(document).ready(function() {
        if (document.getElementById('homepage_feed') == null) {
            return;
        }

        var citizenId = ErpkPvp.citizenId;
        jQ.getJSON('http://orders.erpk.org/api' + '?citizenId=' + citizenId + '&callback=?', null, function(battles) {
            jQ('#battle_listing').prepend('<div id="mon_orders" style="text-align: center" />');

            for (var i in battles) {
                var battle = battles[i];
                var url = battle['url'];
                var image = battle['image'];
                jQ('#mon_orders').append('<a target="_blank" href="' + url + '" style="width:300px;margin:auto;display:block"><img src="' + image + '" style="width: 300px;margin-top:0;"/></a><br/>');
            }
        });
    });
}

addJQuery(main);