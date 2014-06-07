// ==UserScript==
// @name eRepublikUA
// @version 0.2
// @description Ukrainian Official UserScript
// @author eCitizens Maximko & DimaXY3
// @namespace eUkarine
// @include http://*.erepublik.com/*
// @require http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// Constants
var VERSION = '0.2';
var HIGHLIGHT_COLOR = "#ffff9b";
var UKRAINIAN_COMPANIES = [
    181388,
    185987,
    190577,
    197613,
    208009,
    212006,
    216093,
    221886,
    227068,
    228315,
    231445,
    233489,
    241168,
    243318,
    243524,
    243539,
    244652,
    244764,
    244852,
    244873,
    245273,
    245298,
    245504,
    245553,
    245655,
    245804,
    245811,
    246306,
    246399,
    246781,
    246939,
    247223,
    248673,
    248812,
    250090,
    251263,
    251530,
    251594,
    252322,
    252341,
    178996,
    179126,
    179323,
    179770,
    181186,
    181758,
    182561,
    184202,
    184332,
    184755,
    184856,
    184905,
    184954,
    184988,
    185191,
    185222,
    185455,
    185511,
    186557,
    186718,
    186867,
    187432,
    187626,
    187708,
    187779,
    188470,
    188649,
    188709,
    188841,
    189058,
    189069,
    189104,
    189241,
    189436,
    190817,
    191106,
    194705,
    197271,
    202184,
    202316,
    203810,
    209538,
    210944,
    214102,
    215831,
    219389,
    220981,
    223619,
    224991,
    229544,
    230600,
    231219,
    233479,
    234188,
    242973,
    243049,
    243221,
    243329,
    245253,
    246471,
    247399,
    248841,
    249405,
    249718,
    249785,
    250149,
    250404,
    250831,
    251807,
    251881,
    253007,
    180720,
    181668,
    181945,
    184397,
    184842,
    186266,
    186940,
    188050,
    189271,
    192252,
    199474,
    205290,
    211001,
    213486,
    217475,
    217739,
    221136,
    230328,
    237633,
    237979,
    243321,
    249595,
    249630,
    251798,
    205140,
    239082,
    252288
];

Array.prototype.contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}

function highlightUaCompanies() {

    $("tbody.salary_sorted tr").each(function(i) {

        if (i == 0) return;
        var link = $(this).find("td(0) a");
		var regex = /(.*)(\d{6})/;
        var num = link.get(0).href.replace(regex, "$2");
        if (UKRAINIAN_COMPANIES.contains(num)) {

            $(this).css("font-size", "12pt");
			$(this).css("font-style", "italic");
			$(this).css("font-weight", "bold");
        }else{
			$(this).css("font-size", "10pt");
		}
    });
}

function pageLoad(e) {
    highlightUaCompanies();
};

var $ = jQuery.noConflict();

$(document).ready(function () {
    pageLoad();
});
