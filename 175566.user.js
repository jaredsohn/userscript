// ==UserScript==
// @name        Voyages-SNCF Mon Forfait Annuel
// @namespace   http://userscripts.org/users/useridnumber
// @include     https://monforfaitannuel.voyages-sncf.com/mnf/account/*
// @version     1
// ==/UserScript==

var updateAll = function updateAll () {
    var items = {};
    var selects = $('select[id$=Station]');
    selects.children('option').each(function(_, e) {
        items[e.value] = e.innerHTML;
    });
    selects.each(function (_, e) {
        var k;
        $(e).unbind('change');
        for (k in items) {
            if ($(e).children('option[value=' + k + ']').length == 0) {
                $(e).append('<option value="' + k + '"' + (e.value === k ? 'selected="selected"':'') + '>' + items[k] + '</option>');
            }
        }
    });
}

$(window).load(updateAll);
