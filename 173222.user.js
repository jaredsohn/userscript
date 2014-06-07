// ==UserScript==
// @name	Otwieracz powiadomień
// @namespace	http://userscripts.org/scripts/show/173222
// @author	kasper93
// @description	Otwiera wszystkie nieprzeczytane powiadomienia w kartach.
// @include	http://*.wykop.pl/powiadomienia*
// @downloadURL	https://userscripts.org/scripts/source/173222.user.js
// @updateURL	https://userscripts.org/scripts/source/173222.meta.js
// @version	1.0
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
    var button = '<a class="open" href="javascript: void(0)">otwórz powiadomienia w kartach</a>';
    $('div.newtagheader p.normal').prepend(button + " | ");

    $(".open").click(function () {
        $('.bgfbfbd3 > p > a:last-child').each(function () {
            window.open($(this).attr('href'));
        });
    });
}

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}