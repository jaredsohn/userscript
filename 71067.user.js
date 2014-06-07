// ==UserScript==
// @name           Virtonomica: форматированное отображение тестовых полей
// @namespace      virtonomica
// @description    Форматированное отображение тестовых полей
// @version        2.2
// @include        http://virtonomic*.*/*/main/unit/view/*
// @include        http://virtonomic*.*/*/window/technology_market/*
// @include        http://virtonomic*.*/*/main/auction/view/*
// @include        http://virtonomic*.*/*/window/management_action/*/investigations/technology_offer_create/*
// ==/UserScript==


var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    var exclusion = /(supplyContractData\[quality_constraint_min\]|posistionfield)/;

    $('#mainContent input[type=text], #mainContent input[type=type], .window input[type=text]').each(function() {

        var input = $(this);
        if (input.attr('readonly') || input.css('display') == 'none' || exclusion.test(input.attr('name')) || exclusion.test(input.attr('id'))) {
            return;
        }

        var cleanNumber = function(number) {
            number = number + '';
            return number.replace(',', '.').replace(/[^\d\.]+/g, '').replace(/(\.\d*)\..*$/, '$1');
        }

        var prepare = function() {
            div.val(sayNumber(cleanNumber(input.val())));
        }

        var update = function() {
            var num = cleanNumber(div.val());
            input.val(num);

            if (typeof input.get(0).onchange == 'function') {
                input.get(0).onchange();
                num = cleanNumber(input.val());
            }

            div.val(sayNumber(num));
        }

        var isEdit = false;
        var isHold = false;
        var div = $('<input>');
        div.attr('class', input.attr('class'));
        div.attr('style', input.attr('style'));
        div.attr('size', input.attr('size'));

        if (input.attr('name') == "advertData[totalCost]") {
            input.ajaxComplete(function() {
                prepare();
            });

            if (typeof AjaxCalculateObject == 'object' && typeof AjaxCalculateObject.processResult == 'function') {

                win._processResult = AjaxCalculateObject.processResult;
                AjaxCalculateObject.processResult = function() {
                    _processResult();
                    var input = $(document.forms['advertForm']['advertData[totalCost]']);
                    var div = input.prev();
                    prepare();
                }
            }
        }

        prepare();
        div.blur(update);
        input.before(div);
        input.hide();
    });
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);