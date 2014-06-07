// ==UserScript==
// @name          Gwardia
// @description   Twitter Gwardii
// @include       http://www.erepublik.com/*
// @version       1.2.0
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js');
    script.addEventListener('load', function () {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(function () {
    jQ(document).ready(function () {
        var column = jQ('#content div.column').eq(1);
        var baseUrl = 'http://gwardia.org';
        column.prepend(
            '<div style="width:409px;height:200px;">' +
            '<iframe scrolling="no" style="border:0;width:100%;height:100%;" src="' + baseUrl + '/feed"></iframe>' +
            '</div>'
        );
        var img = new Image(); 
        img.src = baseUrl + '/log?' + jQ.param({
            citizenId: ErpkPvp.citizenId,
            remainingFood: food_remaining,
            currentEnergy: globalNS.userInfo.wellness
        });
    });
});
