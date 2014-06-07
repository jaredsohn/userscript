// ==UserScript==
// @name        FAZ Direct Download
// @namespace   l2
// @include     http://www.faz.net/e-paper/
// @version     1
// ==/UserScript==

$.getJSON('http://www.faz.net/e-paper/epaper/latest', function(dataLatest) {
    console.log(dataLatest);
    var urlOverview = "http://www.faz.net/e-paper/epaper/overview/" + dataLatest.produktTyp + "/" + dataLatest.ausgabeDatum;
    $.getJSON(urlOverview, function(dataOverview) {
        console.log(dataOverview);
        dataOverview.ausgabePdf
        var urlPdf = "http://www.faz.net/e-paper/epaper/pdf/" + dataLatest.produktTyp + "/" + dataLatest.ausgabeDatum + "/" + dataOverview.ausgabePdf;
        window.location.href = urlPdf;
    });
});