// ==UserScript==
// @name           AgeAdder
// @namespace      http://www.google.com/search?q=mabakay
// @description    Dodaje wiek obok daty urodzenia oraz innych dat (lata małżeństw, wiek dzieci).
// @include        http://www.filmweb.pl/person/*
// @grant		   none
// @copyright      2010 - 2014, mabakay
// @date           30 April 2014
// @version        1.5
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var infoBox = $('.personInfo td');

if (infoBox != null) {
    var datesRegex = /(([0-9]{1,2})[-\.]([0-9]{1,2})[-\.])?([0-9]{4,4}) - (([0-9]{1,2})[-\.]([0-9]{1,2})[-\.])?([0-9]{4,4})|(([0-9]{1,2})[-\.]([0-9]{1,2})[-\.])?([0-9]{4,4})(?![-\.])|([0-9]{4,4})[-\.]([0-9]{1,2})[-\.]([0-9]{1,2})/g;

    $('.personInfo script').remove();

    infoBox.each(function () {
        var value = $(this).html();
        var dates = value.match(datesRegex);

        if (dates != null) {
            value = value.replace(/\(\d+ \w+\)/, '');
            var lastIndex = 0;

            dates.forEach(function (item) {
                var calcYear = null;
                var index = item.indexOf(' - ');

                if (index > -1) {
                    var date = tryExtractDate(item.substr(0, index));
                    var date2 = tryExtractDate(item.substr(index + 3));

                    if (date != null && date2 != null) {
                        calcYear = new Date(date2 - date);
                    }
                } else {
                    var date = tryExtractDate(item);

                    if (date != null) {
                        calcYear = new Date(new Date() - date);
                    }
                }

                if (calcYear != null) {
                    calcYear /= 1000 * 60 * 60 * 24 * 365;
                    calcYear = Math.round(calcYear);

                    var age;
                    if (calcYear == 0)
                        age = ' <span style="font-weight: bold">(<1' + ' ' + declinatedNoun(1, "age") + ')</span>';
                    else
                        age = ' <span style="font-weight: bold">(' + calcYear + ' ' + declinatedNoun(calcYear, "age") + ')</span>';

                    lastIndex += value.substr(lastIndex).indexOf(item);
                    value = value.substr(0, lastIndex) + value.substr(lastIndex).replace(item, item + ' ' + age);
                    lastIndex += item.length + age.length + 1;
                }
            });

            $(this).html(value);
        }
    });
}

function tryExtractDate(value) {
    var individualDatesRegex = /(([0-9]{1,2})[-\.]([0-9]{1,2})[-\.])?([0-9]{4,4})$|([0-9]{4,4})([-\.]([0-9]{1,2})[-\.]([0-9]{1,2}))?/;
    var match = value.match(individualDatesRegex);

    if (match == null)
        return null;

    if (match[4] == undefined) {
        if (match[6] == undefined)
            return new Date(parseInt(match[5]), 0, 1);
        else
            return new Date(parseInt(match[5]), parseInt(match[7]) - 1, parseInt(match[8]));
    } else {
        if (match[1] == undefined)
            return new Date(parseInt(match[4]), 0, 1);
        else
            return new Date(parseInt(match[4]), parseInt(match[3]) - 1, parseInt(match[2]));
    }
}
