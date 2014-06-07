// ==UserScript==
// @name        Virtonomica_Lobby
// @author      Alexander Murmanskiy
// @description Показывает процент влияния в городе
// @include     http://virtonomic*.*/*/main/politics/lobby/*
// @include     http:/igra.aup.*/*/main/politics/lobby/*
// @version     1.14.01.05
// @grant       none
// ==/UserScript==

var mainfunction = function () {
    if (!/(lobby\/me)/.test(document.URL)) {
        mainclass = $("table.grid tr[class*='odd'], table.grid tr[class*='even']");
        for (i = 0; i < mainclass.length; i++) {
            $("td:eq(3)", mainclass.eq(i)).html("<font color='green'><b>"
                + (100 * Number($("td:eq(3)", mainclass.eq(i)).html().split(/[$]/)[0].replace(/\s/g, "")) / Number($("table.grid tr:eq(0) th:eq(3) span").html().split(/[$]/)[0].replace(/\s/g, ""))).toFixed(4)
                + "</b></font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + $("td:eq(3)", mainclass.eq(i)).html());
        }
    }
    else {
        mainclass = $("table.grid tr[class*='odd'], table.grid tr[class*='even']");
        for (i = 0; i < mainclass.length; i++) {
            $("td:eq(1)", mainclass.eq(i)).html("<font color='green'><b>"
                + ((100 * Number($("td:eq(1)", mainclass.eq(i)).html().split(/[$]/)[0].replace(/\s/g, ""))) / Number($("td:eq(2)", mainclass.eq(i)).html().split(/[$]/)[0].replace(/\s/g, ""))).toFixed(4)
                + "</b></font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + $("td:eq(1)", mainclass.eq(i)).html());
        }
    }
}
if (window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + mainfunction.toString() + ')();';
    document.documentElement.appendChild(script);
}