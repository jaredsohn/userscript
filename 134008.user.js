// ==UserScript==
// @name        Polizeiwache.net Simplifier by StvN
// @namespace   StvN
// @include     http://www.polizeiwache.net/*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    // karte groesser machen und seiten schoener
    beautifyMap();

    // nach dem alarmieren, auf einsatzseite leiten
    redirectAfterDispo();

    // überprüfe ob jemand transportbereit ist
    checkTransport();

    // neuen einsatz öffnen
    createActiveEinsaetze();

    // premium account info entfernen
    removePremium();

    // error handling/formatting
    formatErrors();
});

function checkTransport() {
    var einsaetze = $("#mission_content tr td img[title=Täter Vorort]").parent().next().find("a");

    $.each(einsaetze, function(key, value) {
        var link = value.href;

        $.get(link, function(data) {
            var result = data.search(/Tätertransport.+/);

            if (result != '-1') {
                $(einsaetze[key]).css('color','red');
            }
        });
    });
}

function openNewEinsaetze() {
    var einsaetze = $("#mission_content tr td img[title=Neuer Einsatz]").parent().next().find("a");

    window.location = einsaetze[0].href; // open in active window
    // window.open = einsaetze[0] // open in new tab
}

function redirectAfterDispo() {
    var einsaetzeLink = 'http://www.polizeiwache.net/polizei-einsaetze';

    $("input[value=Alarmieren]").live('click',function() {
        window.location = einsaetzeLink;
    });
}

function beautifyMap()
{
    $("#mapOuterContainer").css('height', '700px');
    $("#mapOuter").css('height', '700px');

    $(".mapTop a[href=/news]").remove();

    $("#startMissionList ul li div").parent().remove();
}

function createActiveEinsaetze()
{
    var ueberschrift = $("h1");
    if (ueberschrift !== '') {
        var ueberschriftenText = ueberschrift.html();
        if (ueberschriftenText == 'Aktuelle Einsätze') {
            ueberschrift.html('Aktuelle Einsätze :: <a id="openNewEinsatz">Einsatz disponieren</a>');
        }

        $("#openNewEinsatz").live('click', openNewEinsaetze);
    }
}

function removePremium()
{
    var formError = $(".form_error");
    var formErrorHtml = formError.html();
    formErrorResult = formErrorHtml.search(" /\bPremium*/gi");

    if (formErrorResult != '-1') {
        formError.remove();
    }

    $(".level2").attr('style','top: 87px; position: absolute; left: 333px; visibility: hidden;');
}

function removeHogsmeade()
{
    var hogsmeadeAbout = "http://www.polizeiwache.net/about";
    var hogsmeadeLogo = $("img[alt=Hogsmeade Edition]").parent();
    hogsmeadeLogo.html('<a href="'+hogsmeadeAbout+'" style="color: lightblue; margin: 5px 5px 5px 20px;">Hogsmeade-Info</a>');

    $("#count_auftraege").remove();

}

function formatErrors()
{
    $("div.form_info").css('font-size', '11px');
    $("div.form_error").css('font-size', '11px');
}