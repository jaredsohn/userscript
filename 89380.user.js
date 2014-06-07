// ==UserScript==
// @name           waze.com - convert miles to kilometers
// @version        1.0
// @description    Convert miles to kilometers in waze scoreboard
// @namespace      Kub4jz.cz

// @include        http://world.waze.com/WAS/scoreboard?*
// @match          http://world.waze.com/WAS/scoreboard?*
// ==/UserScript==

function g(id)
{
    if(id && typeof id === 'string') {
        id = document.querySelectorAll(id);
    }
    return id||null;
}

function convert()
{
    var data, matches, match, kilometers;

    var tds = g('div.wazinessDiv div, td.gaming_img span');

    var regEx = new RegExp('([0-9]{1,4}) mile', 'gi');

    for (var i = 0; i < tds.length; i++) {

        td = tds.item(i);

        data = td.textContent;

        matches = data.match(regEx);

        if (!matches) continue;

        for (j = 0; j < matches.length; j++) {
            match = matches[j];

            kilometers = Math.round(parseInt(match) * 1.6);

            td.innerHTML = td.innerHTML.replace(match, kilometers + ' kilometer');
        }
    }

    return false;
}

convert();