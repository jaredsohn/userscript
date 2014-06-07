// ==UserScript==
// @name           Travian Hero Status
// @version        1.0
// @autor          ww_start_t
// @description    Hero Status v1.0
// @include        http://*.travian*.*/*
// ==/UserScript==
function ID(id) { return document.getElementById(id) };
function CLASS(Class) { return document.getElementsByClassName(Class) };

if (ID("distribution") && CLASS("po")[0] && CLASS("building g37")[0]) {

    var lang = window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
    var LNG = new Array();

    switch (lang) {
        case '.com.sa':
        case '.com.eg':
        case '.ae':
            LNG = ['الخبرة حاليا', 'المستوى التالي', 'تحتاج الى', 'نسبة الهجوم', 'نسبة الدفاع ضد المشاة', 'نسبة الدفاع ضد الفرسان'];
            break;
        default:
            LNG = ['Experience currently', 'Next Level', 'Need', 'Attack', 'Defense against infantry', 'Defense against cavalry'];
    };
    if (location.href.match(/sy/)) {
        LNG = ['الخبرة حاليا', 'المستوى التالي', 'تحتاج الى', 'نسبة الهجوم', 'نسبة الدفاع ضد المشاة', 'نسبة الدفاع ضد الفرسان'];
    };

    function getPoints(num) {
        var getA = ID("distribution").getElementsByClassName("po")[num].innerHTML; return getA;
    }; function PR(string) { return parseInt(string) };

    var A = ID("distribution").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[6].getElementsByClassName("val")[0].innerHTML.split("%")[0];
    var LEVEL = ID("distribution").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.split("</a>")[1];
    var B = parseInt(LEVEL.match(/[0-9]/)) + parseInt(1);

    var C = getPoints('0'); var D = getPoints('1');
    var E = getPoints('2'); var F = getPoints('3'); var G = getPoints('4');

    var begin = PR(C) + PR(D) + PR(E) + PR(F) + PR(G);
    begin = Math.round(begin / 500 * 100);
    var atk = ID("distribution").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
    atk = Math.round(atk / 14975 * 100);
    var defA = ID("distribution").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML.split("/")[0];
    defA = Math.round(defA / 14765 * 100);
    var defB = ID("distribution").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML.split("/")[1];
    defB = Math.round(defB / 11045 * 100);

    var percent = parseInt(100 - A);

    var HTML = '<td>' +
           '<span>' + LNG[0] + ': %' + A + '</span>' +
           '<br />' +
           '<span>' + LNG[1] + ': ' + B + '</span>' +
           '<br />' +
           '<span>' + LNG[2] + ': %' + percent + '</span>' +
           '</td><td colspan="3">' +
           '<span>' + LNG[3] + ': %' + atk + '</span><br />' +
           '<span>' + LNG[4] + ': %' + defA + '</span><br />' +
           '<span>' + LNG[5] + ': %' + defB + '</span>' +
           '</td><td>%' + begin + '</td>';

    ID("distribution").getElementsByTagName("tbody")[0].innerHTML += '<tr>' + HTML;
};