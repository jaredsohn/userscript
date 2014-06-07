// ==UserScript==
// @name        Virtonomica_SalaryQ
// @author      Alexander Murmanskiy
// @description Зарплата за единицу образованности
// @include     http://virtonomic*.*/*/main/geo/citylist/*
// @include     http://igra.aup.*/*/main/geo/citylist/*
// @include     http://virtonomic*.*/main/unit/create/*/step4
// @include     http://igra.aup.*/*/main/unit/create/*/step4
// @version     1.14.01.04
// @grant       none
// ==/UserScript==

var mainfunction = function () {
    if (!/(create)/.test(document.URL)) {
        mainclass = $("table.grid tr[class*='odd'], table.grid tr[class*='even']");        
        for (i = 0; i < mainclass.length; i++) {
            $("td:eq(2)", mainclass.eq(i)).html("<font color='green'><b>"
                + (Number($("td:eq(2)", mainclass.eq(i)).html().split(/[$]/)[0].replace(/\s/g, "")) / Number($("td:eq(4)", mainclass.eq(i)).html().split(/[<]/)[0].replace(/\s/g, ""))).toFixed(2)
                + "</b></font>&nbsp;" + $("td:eq(2)", mainclass.eq(i)).html());
        }         
    }
    else {
        mainclass = $("table.list tr[class*='zebra']");
        for (i = 0; i < mainclass.length; i++) {
            $("td:eq(4)", mainclass.eq(i)).html("<font color='green'><b>"
                + (Number($("td:eq(4)", mainclass.eq(i)).html().split(/[$]/)[0].replace(/\s/g, "")) / Number($("td:eq(3)", mainclass.eq(i)).html().split(/[<]/)[0].replace(/\s/g, ""))).toFixed(2)
                + "</b></font>&nbsp;" + $("td:eq(4)", mainclass.eq(i)).html());
        }
    }
}
if (window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + mainfunction.toString() + ')();';
    document.documentElement.appendChild(script);
}