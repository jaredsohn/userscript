// ==UserScript==
// @name        WolQueries
// @namespace   wol
// @include     http://www.worldoflogs.com/reports/*/dashboard/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @installURL http://userscripts.org/scripts/source/140512.user.js
// @downloadURL http://userscripts.org/scripts/source/140512.user.js
// @updateURL https://userscripts.org/scripts/source/140512.meta.js
// @version 0.3
// ==/UserScript==



function CreateTr() {
    var $tr = $("<tr/>");
    $tr.append($("<td colspan='2'><h3>Analytics</h3><div id='analytic' style='padding-top: 10px' class='fake-panel ui-corner-bl ui-corner-br'></div></td>"));
    return $tr;
}

var bosses = [];
InitQueries();

var boss = GetBossId();//
var timerange = GetTimeRange();

$("a#openall").live('click', function () {
    $("#analytic li a").each(function () {
        window.open($(this).attr("href"), $(this).text());
    });
    return false;
});

function GetTimeRange() {
    return "?s=" + qs("s") + "&e=" + qs("e");
}

function GetBossId() {
    var bossId = "-1";
    $("h3:contains('Damage done by target')").next().find("a").each(function () {
        var boss = $(this).text();
        if (bosses[boss]) {
            bossId = boss;
        }
    });
    return bossId;
}

function InitQueries() {
    //stone guard
    AddQuery("Jasper Guardian", "Amethyst Pool damagetaken", "spell/130774/{timerange}");
    AddQuery("Jasper Guardian", "Jasper Chains debuff count", "spell/130395/{timerange}");
    AddQuery("Jasper Guardian", "Jasper Chains damage", "spell/130404/{timerange}");
    AddQuery("Jasper Guardian", "Cobalt Mine damagetaken", "spell/116281/{timerange}");

    //feng
    AddQuery("Feng the Accursed", "Arcane Resonance damagedone", "spell/116434/{timerange}");
    AddQuery("Feng the Accursed", "Arcane Resonance debuff count", "xe/{timerange}&x=spell=\"Arcane Resonance\"");
    AddQuery("Feng the Accursed", "Wildfire damage taken", "spell/116793/{timerange}");
    AddQuery("Feng the Accursed", "Lightning Charge damagetaken", "spell/116374/{timerange}");
    AddQuery("Feng the Accursed", "Epicenter damage taken", "spell/116040/{timerange}");
    AddQuery("Feng the Accursed", "Wildfire Spark debuff", "spell/116784/{timerange}");


    //Gara'jal the Spiritbinder
    AddQuery("Gara'jal the Spiritbinder", "Crossed Over count", "spell/116161/{timerange}");
    AddQuery("Gara'jal the Spiritbinder", "Crossed Over expression", "xe/{timerange}&x=spell=\"Crossed Over\" or (spell=\"Summon Spirit Totem\" and type=TYPE_CAST)");
    AddQuery("Gara'jal the Spiritbinder", "Spiritual Innervation healer count", "spell/117543/{timerange}");
    AddQuery("Gara'jal the Spiritbinder", "Spiritual Innervation dps count", "spell/117549/{timerange}");

}

function AddQuery(boss, title, href) {
    var link = new Object();
    link.title = title;
    link.href = href;
    if (!bosses[boss]) {
        bosses.push(boss);
        bosses[boss] = [];
    }

    bosses[boss].push(link);
}


function ShowCustomPanel(tr) {
    $("#report-overview tr:eq(0)").after(tr);
}

function AppendQueries() {
    for (var i = 0; i < bosses[boss].length; i++) {
        var root = window.location.pathname.replace("dashboard/", "");
        var href = root + bosses[boss][i].href.replace("{timerange}", timerange);
        var title = bosses[boss][i].title;
        $("#analytic").append("<li><a target='_blank' class='' href='" + href + "'>" + title + "</a></li>");
    }
    $("#analytic").append("<br/><a id='openall' href='#'>Open all</a>");
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
