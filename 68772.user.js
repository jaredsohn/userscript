// ==UserScript==
// @name           Tupi40k Restyler
// @description    Изменяет вид Тупичка. Удаляет боковые панели и верхний баннер, добавляет элегантные границы.
// @namespace      Тупичок Гоблина
// @author          Водкотерапевт
// @include        http://oper.ru/*
// @include        http://*.oper.ru/*
// @exclude        http://oper.ru/*/print.php*
// @exclude        http://*.oper.ru/*/print.php*
// ==/UserScript==

GM_addStyle('#container {max-width: 85% !important;} #headermenuu {margin-top: 10px !important;} div#middle {border-width: 10px 1px 1px; border-color: #464646; border-style: solid; padding: 10px !important; margin-top: 10px !important;} table.comment {border-width: 4px 1px 1px; border-color: #464646; border-style: solid; padding: 0px !important; margin-top: 5px !important;} span.posted {color:#D0D0C0 !important;}');

var stuff_to_remove = [
        "//div[@class='block']",
	"//td[div[@id='left']]",
	"//td[div[@id='right']]",
        "//div[@id='topbanner']",
// Раскомментируйте следующую строку, чтобы убрать нижнее меню (предотвращает растягивание страницы при увеличении шрифта)
//      "//div[@id='headermenul']",
	"//tr[td/table/tbody/tr/td/p[@class='bottomh']]",
];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);
