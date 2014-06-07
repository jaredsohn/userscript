// ==UserScript==
// @name        Lounaskortti subsidized value
// @namespace   13
// @include     https://kortinhaltija.lounaskortti.fi/
// @include     https://kortinhaltija.prepay.fi/
// @version     2
// @grant       none
// ==/UserScript==

jQuery('tr.data_table_row"').find('td.money').each(function(index) {
    var amt = $(this).text().replace(',','.');
    var amt2 = amt*0.75;
    if (isNaN(amt2))
        $(this).text(amt + ' (25%)');
    else
        $(this).text(amt + ' (' + Math.round(Math.abs(amt2)*100)/100 + ')');
});
