// ==UserScript==
// @name        Marketamerica Unfranchise Product Search Page Powertoy
// @namespace   http://www.21code.com/
// @description Productivity Enhance for the Product Search Page (Unfranchise Management System).Calculate and display BV/IBV as percentage of the the price. Quick add to quantity box. Easier add button etc.
// @include     https://my.unfranchise.com/index.cfm?action=shopping.uoTbShopProducts*
// @include     https://my.unfranchise.com/index.cfm?action=shopping.uoShopProducts*
// @license     Creative Commons Attribution License
// @version     6
// @released    2013-01-12
// @updated     2013-01-17
// @run-at      document-end
// @updateURL       https://userscripts.org/scripts/source/156335.meta.js
// @downloadURL     https://userscripts.org/scripts/source/156335.user.js
// ==/UserScript==


/* 
* This file is a Greasemonkey user script. To install it, you need 
* the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
* After you installed the extension, restart Firefox and revisit 
* this script. Now you will see a new menu item "Install User Script"
* in your tools menu.
* 
* To uninstall this script, go to your "Tools" menu and select 
* "Manage User Scripts", then select this script from the list
* and click uninstall :-)
*
* Creative Commons Attribution License (--> or Public Domain)
* http://creativecommons.org/licenses/by/2.5/
*/


var maPTMain = function () {
    try {
        var headerClass;
        if (getURLParameter("action").indexOf("shopping.uoShopProducts") >= 0 || getURLParameter("action").indexOf("shopping.uoTbShopProducts") >= 0) {
            headerClass = "TD.uoProdDetailHeader";
        } else if (getURLParameter("action").indexOf("shopping.uoSpecialProducts") >= 0) {
            headerClass = "TD.uoProdDetailHeaderAlternate";
        } else if (getURLParameter("action").indexOf("shopping.uoNewProducts") >= 0) {
            headerClass = "TD.uoProdDetailHeaderAlternate";
        }

        var tdPriceHeader = $(headerClass).filter(function () {
            return $(this).text() === "Price";
        });
        var tdBVHeader = $(headerClass).filter(function () {
            return $(this).text() === "BV";
        });
        var tdIBVHeader = $(headerClass).filter(function () {
            return $(this).text() === "IBV";
        });
        var tdQTYHeader = $(headerClass).filter(function () {
            return $(this).text() === "Qty";
        });
        if ($(tdBVHeader).length && $(tdIBVHeader).length && tdPriceHeader.length && tdQTYHeader.length) {

            $(tdBVHeader).css("text-align", "center");
            $(tdIBVHeader).css("text-align", "center");

            var cellBVs = $(tdBVHeader).closest("TR").nextAll().filter(function () {
                return $(this).has("INPUT[type='text']").length > 0;
            });

            $(cellBVs).each(function (idx) {
                var cellPrice = $(this).children().eq($(tdPriceHeader).index());
                var cellBV = $(this).children().eq($(tdBVHeader).index());
                var cellIBV = $(this).children().eq($(tdIBVHeader).index());
                var cellQTY = $(this).children().eq($(tdQTYHeader).index());
                var price = parseFloat($(cellPrice).text().replace("$", ""));
                var bv = parseFloat($(cellBV).text());
                var ibv = parseFloat($(cellIBV).text());

                $(cellBV).html("<u>" + $(cellBV).text() + "</u>" + ((bv != 0) ? "<font color='blue'>(" + Math.round((bv / price) * 100) + "%)</font>" : "<font color='red'>(N/A)</font>"));
                $(cellIBV).html("<u>" + $(cellIBV).text() + "</u>" + ((ibv != 0) ? "<font color='blue'>(" + Math.round((ibv / price) * 100) + "%)</font>" : "<font color='red'>(N/A)</font>"));
                $(cellBV).css("border", "1px solid grey");
                $(cellBV).css("border-style", "none solid none solid");
                $(cellIBV).css("border", "1px solid grey");
                $(cellIBV).css("border-style", "none solid none none");

                $(":first-child", cellQTY).parent().css("white-space", "nowrap");
                $(":first-child", cellQTY).parent().append("<span class='spanmaPTx1' style='color:blue;text-decoration:underline;cursor:pointer'>x1</span>");
                $(":first-child", cellQTY).parent().append("&nbsp;");
                $(":first-child", cellQTY).parent().append("<span class='spanmaPTx2' style='color:blue;text-decoration:underline;cursor:pointer'>x2</span>");

            });

            $(".spanmaPTx1").live("click", function (event) {
                $(this).siblings(":first").val("1");
            });
            $(".spanmaPTx2").live("click", function (event) {
                $(this).siblings(":first").val("2");
            });
        }
        $("INPUT.uoMediumButton[name='addPrd']").parent().css("height", "50px").css("vertical-align", "bottom");

    } catch (e) {
        alert(e);
    }
    function getURLParameter(name) {
        return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
    }
};

function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
}

// injection...

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + maPTMain + ")()"));

//if (getURLParameter("action").indexOf("shopping.uoTbShopProducts") >= 0) { // don't need jquery now
//    var jqr = document.createElement("script");
//    jqr.setAttribute("type", "text/javascript");
//    jqr.setAttribute("src", "http://code.jquery.com/jquery-1.8.3.min.js");
//    document.body.appendChild(jQuery);
//}

document.body.appendChild(inject);
