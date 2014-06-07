// vim: fileencoding=utf8
// ==UserScript==
// @include http://*okoun.cz/favourites.jsp*
// @require http://code.jquery.com/jquery-latest.min.js
// @name Okoun.cz -- Otevři kluby s novými příspěvky.
// @description Otevře najednou všechny kluby s novými příspěvky.
// ==/UserScript==

// qqxyz Last modified: 2010-01-07 13,49

/*
 * 1.0 ... Prvni verze.
 *
 */

function findPlaceForInsertion() {
    return $("div.yui-u.first.main");
}

var i = location.toString().lastIndexOf('/');
var prefix = location.toString().substring(0, i + 1);
var openFunction = window.open;
if (typeof(GM_openInTab) == 'function') {
    openFunction = GM_openInTab;
}

function openWindow(index, link) {
    if (index > 0) {
	openFunction(prefix + link);
    }
}

var linky;
var alreadyLoading = false;
function openNewClubs(e) {
    e.preventDefault();
    if (alreadyLoading) {
	return;
    } else {
	alreadyLoading = true;
    }
    $.each(linky, openWindow);
    window.location = linky[0];
}

function letsJQuery() {
    linky = $("div.item:has(b)")
        .map(function() {
            return $('a.name', this).attr('href');
        });
    var pocet = linky.length;
    if (pocet > 0) {
	var place = findPlaceForInsertion();
	if (place != null) {
	    place.before(
                '<a id="new-opener" style="cursor:pointer;float:left">' +
                'Otevřít nepřečtené [' + pocet + "]</a>"
            );
            $("#new-opener").click(openNewClubs);
	}
    }
}

letsJQuery();

