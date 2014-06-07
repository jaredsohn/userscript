// ==UserScript==
// @name          Orkut Time
// @description   Shows Orkut times and dates in the local timezone and with the user's locale.
// @include       http://www.orkut.com/*
// ==/UserScript==

// These are the date/time formats corresponding to the languages supported by Orkut
// (as of 2006-05-16).
//
//     Chinese (Simplified)    ??8:30 06-5-15           YMD     :-
//     Chinese (Traditional)   ?? 8:30 2006/5/15        YMD     :/
//     Dutch                   20:30 15-5-2006          DMY     :-
//     English (UK)            20:30 15/05/2006         DMY     :/
//     English (US)            8:30 PM 5/15/2006        MDY     :/ AM/PM
//     French                  20:30 15/05/2006         DMY     :/
//     German                  13:04 16.05.06           DMY     :.
//     Italian                 20.30 15/05/2006         DMY     ./
//     Japanese                20:30 2006/05/15         YMD     :/
//     Korean                  ?? 8:30 2006. 5. 15      YMD     :.
//     Portuguese              20:30 15/05/2006         DMY     :/
//     Russian                 20:30 15.05.06           DMY     :.
//     Spanish                 20:30 15/05/2006         DMY     :/
//
// As can be seen, only 4 languages use AM/PM equivalents and these are always explicit
// by AM/PM markers near the hour. Hours are always a sequence of 2 numbers, separated by
// /[:.]/. Dates are always a sequence of 3 numbers, separated by /[-/.]\s?/.
// Unfortunatelly, date components come in many orders: YMD, DMY and MDY. Also, some years
// have 4 digits and some have 2. Analysing a little we note that besides American
// English, which uses MDY order and has AM/PM markings (ignoring Chinese and Korean that
// I don't speak), and all dates whose first number has 4 digits, that use YMD order, all
// other dates use the DMY order. We use these cues inside getTextAsDate.

const HourPattern = /(\b\S\S\s)?\d+[:.]\d+(\s[AP]M)?/;
const DatePattern = /\d+([-/.]\s?\d+){2}/;

// This is really just a shorthand for {basename: ..., path: ..., elementCount: 1}
function TimePath(basename, path, elementCount) {
    this.basename = basename;
    this.path = path;
    if (!elementCount) {
        elementCount = 1;
    }
    this.elementCount = elementCount;
}

// These cool XPath expressions were obtained with the excelent XPath Checker extension.
// All I did was adding an extra / at the beginning and taking the index ([...])
// from the table row tag (tr) at the end, so we get all lines of the table.
const TimePaths = [
    new TimePath(
        'Communities',
        '//html/body/table[2]/tbody/tr/td/table/tbody/tr/td[position() = 3 or position() = 4]',
        2
    ),
    new TimePath(
        'Community',
        '//html/body/table[2]/tbody/tr/td[1]/table[2]/tbody/tr[2]/td/table/tbody/tr/td[8]'
    ),
    new TimePath(
        'CommMsgs',
        '//html/body/table[2]/tbody/tr/td[3]/table[1]/tbody/tr[3]/td/table[1]/tbody/tr/td[4]/font'
    ),
    new TimePath(
        'CommTopics',
        'id("gridTopics")/tbody/tr/td[5]'
    ),
    new TimePath(
        'Messages',
        '//html/body/form[2]/table/tbody/tr/td/table[3]/tbody/tr/td[6]'
    ),
    new TimePath(
        'Scrapbook',
        '//html/body/table[2]/tbody/tr/td[3]/table/tbody/tr[3]/td/table/tbody/tr/td[5]'
    ),
];

const OrkutTimeZone = 7;
const DifferenceToLocalTime =
    (OrkutTimeZone * 60 - (new Date()).getTimezoneOffset()) * 60 * 1000
;

function getNumbers(pattern, text) {
    var matches = text.match(pattern);
    if (matches) {
        return matches[0].match(/\d+/g);
    } else {
        return null;
    }
}

function swapItems(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function getTextAsDate(elements) {
    // We assume that the text is in the correct format (at least one element has a
    // valid hour and at least one element has a valid date). Exceptions raised by
    // invalid strings are ignored by the calling code.
    var timeParts = null;
    var dateParts = null;
    var amPmMarkers = [];

    for (var i = 0; i < elements.length; i++) {
        var text = elements[i].innerHTML;

        var newTimeParts = getNumbers(HourPattern, text);
        if (newTimeParts) {
            timeParts = newTimeParts;
        }

        var newDateParts = getNumbers(DatePattern, text);
        if (newDateParts) {
            dateParts = newDateParts;
        }

        // We look for AM/PM markers. (that mean the language is American English).
        amPmMarkers = text.match(/AM|PM/);
    }

    // If the first date part has 4 digits, the date is in YMD order.
    if (dateParts[0].length == 4) {
        swapItems(dateParts, 0, 2);
    }

    if (amPmMarkers && amPmMarkers.length) {
        var marker = amPmMarkers[0];
        if (marker == 'PM') {
            timeParts[0] = (parseInt(timeParts[0], 10) + 12).toString();
        }
        // This is were it stops working for Chinese/Korean. We should test for the
        // specific markers of these languages, but I don't speak them so I just assume
        // the language is American English. Anyway, we swap the parts for the day and
        // the month in this case.
        swapItems(dateParts, 0, 1);
    }

    // We pass the numeric base explicitly (10) because otherwise if the string
    // starts with '0' it is assumed to be in octal (strings like '09' lead to 0).
    return new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,    // The month field of JavaScript's Date starts at 0.
        parseInt(dateParts[0], 10),
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10)
    );
}

function updateText(original, newDate) {
    // We just replace the parts we changed because we want to maintain the existing
    // text (&nbsp;, <br>, etc.).
    for (var i = 0; i < original.length; i++) {
        var correctedTime = original[i].innerHTML.replace(
            HourPattern,
            newDate.toLocaleTimeString()
            //newDate.getHours() + ':' + newDate.getMinutes()
        );
        original[i].innerHTML = correctedTime.replace(
            DatePattern,
            newDate.toLocaleDateString()
            //newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear()
        );
    }
}

function getElementsByXPath(path) {
    return document.evaluate(
        path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
}

function sliceSnapshot(snapshot, start, length) {
    var array = [];
    for (var i = start; i < Math.min(snapshot.snapshotLength, start + length); i++) {
        array.push(snapshot.snapshotItem(i));
    }
    return array;
}

var basename = document.location.href.replace(/[^/]*[/]/g, '').replace(/[.].*$/, '');
for (var i = 0; i < TimePaths.length; i++) {
    if (basename != TimePaths[i].basename) {
        continue;
    }

    var allElements = getElementsByXPath(TimePaths[i].path);
    for (var j = 0; j < allElements.snapshotLength; j += TimePaths[i].elementCount) {
        var elements = sliceSnapshot(allElements, j, TimePaths[i].elementCount);
        try {
            var date = getTextAsDate(elements);
            var correctedDate = new Date(date.getTime() + DifferenceToLocalTime);
            updateText(elements, correctedDate);
        } catch(error) {
            // Ignore errors
        }
    }
    break;
}
