// ==UserScript==
// @name           Pocket Query Date Modifier
// @namespace      chrysalides
// @description    Change date to before 1994
// @include        http://www.geocaching.com/pocket/gcquery.aspx*
// ==/UserScript==

var dateBegin = document.getElementById("ctl00_ContentBody_DateTimeBegin_Year"),
    dateEnd   = document.getElementById("ctl00_ContentBody_DateTimeEnd_Year"),
    i, selectedFound = false;

for (i = dateBegin.options.length - 1; i >= 0; i--) {
    if (dateBegin.options[i].defaultSelected) {
        selectedFound = true;
        break;
    } else if (parseInt(dateBegin.options[i].value) < 2000) {
        dateBegin.options[i] = null;
    }
}

for (i = dateEnd.options.length - 1; i >= 0; i--) {
    if (dateEnd.options[i].defaultSelected) {
        break;
    }
    if (parseInt(dateEnd.options[i].value) < 2000) {
        dateEnd.options[i] = null;
    }
}

dateBegin.options[dateBegin.options.length] = new Option("1900", "1900", !(selectedFound), !(selectedFound));
