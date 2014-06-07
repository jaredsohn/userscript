// ==UserScript==
// @name          Finanial Selector
// @namespace	  http://userscripts.org/scripts/show/9119
// @include	  *

// @description   Version 1.0 -- Selects default formats for financial managers (e.g. Microsoft Money, Quicken, etc.)

// ==/UserScript==

/* 

---- NOTES ---

The `format` variable must be set on one of the following options:
    QFX - Quicken 2004 or higher
    OFX - Money 2001 or higher
    QIF - Quicken/Money all versions
    CVS - Comma Seperated Values

Your financial institution may not support all of these options.  If you
choose an option your financial institution does not support, this script
will return false and not set the option at all.

*/


var format = "QFX";

var select_elements = document.getElementsByTagName('option');

for (var i = 0; i < select_elements.length; i++) {
    var select_value = select_elements[i].getAttribute("value");

    if ((select_value != undefined) && (select_value.indexOf(format) >= 0)) {
	select_elements[i].selected = 1;
    }
}

