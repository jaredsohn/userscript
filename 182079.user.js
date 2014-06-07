// ==UserScript==
// @name       betsofbitco.in Calculator
// @namespace  http://bomanxix.org/
// @version    0.1
// @description  a small script to calculate the revenue for a bet on betsofbitco.in (it also works when logged out from betsofbitco.in)
// @match      http://betsofbitco.in/item*
// @copyright  2013+, BomanXIX
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

window.calculate = function calculate() {
    // retrieve the different values for calculation from the html page
    var str = $(document.body).html();
    var regex = /Total ((?:weighted )?(?:dis)?agree) bets:<\/strong> ([0-9\.]+)/gi;
    var values = {};
    var match;
    while (match = regex.exec(str)) {
        values[match[1]] = parseFloat(match[2]);
    }
    var regex = /Current time weight is ([0-9\.]+)/gi;
    match = regex.exec(str)
    values['weight'] = parseFloat(match[1]);
    
    // calculate the revenue
    calc = 0;
    a = parseFloat($('input#calc-amount').val());
    aa = values['agree'];
    da = values['disagree'];
    wa = values['weighted agree'];
    wd = values['weighted disagree'];
    w = values['weight'];
    if ($('input:radio[name=calc-betSide]:checked').val() == 1) {
        calc += da * 0.45 * a / (aa + a);
        calc += da * 0.45 * a * w / (wa + a * w);
    } else if ($('input:radio[name=calc-betSide]:checked').val() == 0) {
        calc += aa * 0.45 * a / (da + a);
        calc += aa * 0.45 * a * w / (wd + a * w);
    }

    // display the revenue
    $('input#calc-revenue').val(calc.toFixed(5));
};

$(document).ready(function() {
    // inject the calculator form
    $('div.one-third.last').append("<div style='border: 1px solid #666; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 5px; background-color: #DDD;'>" +
                                   "<u>betsofbitco.in Calculator</u><br><br>" +
                                   "<form id='calc-form'>" +
                                   "Amount:<br><input type='text' id='calc-amount' value='0.1' style='width: 70px; padding: 10px 15px; background: #fff; border: 1px solid #ccc; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;'>" +
                                   "<ul>" +
                                   "  <li><label for='calc-agree'><input type='radio' id='calc-agree' value='1' name='calc-betSide'> Agree</label></li>" +
                                   "  <li><label for='calc-disagree'><input type='radio' id='calc-disagree' value='0' name='calc-betSide'> Disagree</label></li>" +
                                   "</ul>" +
                                   "<input type='button' value='Calculate' id='calc-calc' style='width: 100px; padding: 5px 0px; color: #606060; font-size: 14px; background: #fff; border: 1px solid #ccc; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;'><br><br>" +
                                   "Revenue <span style='color: #622;'>at this moment</span> if the bet would be positive for you:<br>" +
                                   "<input type='text' id='calc-revenue' value='0' style='width: 70px; padding: 10px 15px; background: #fff; border: 1px solid #ccc; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;'>" +
                                   "</form></div>");
    $('input#calc-calc').click(calculate);
});