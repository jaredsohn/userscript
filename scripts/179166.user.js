// ==UserScript==
// @name       1672340 - Hospitalizations2
// @namespace  http://www.torn.com/profiles.php?XID=1672340
// @version    3.0
// @description  Enable, then record a specific amount of pages, you'll then be alerted of the amount of hospitalizations each member has made. Note: This includes hospitalizations not towards enemies.
// @include     http://www.torn.com/factions.php?step=your&news=2*
// @require     ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013-2014, Fumph
// ==/UserScript==

function parsePage(html, container) {
    var cont = container;
    var names = html.match(/<font color=#006633>([\w\s-_]{1,16})<\/font><\/a> hospitalized <a href=profiles\.php\?XID=\d{1,7}><font color=#006633>[\w\s-_]{1,16}<\/font>/g);
    if (names !== null) {
        for (var match = 0; match < names.length; match++) {
            var name = names[match].match(/<font color=#006633>([\w\s-_]{1,16})<\/font><\/a> hospitalized <a href=profiles\.php\?XID=\d{1,7}><font color=#006633>[\w\s-_]{1,16}<\/font>/)[1];
            if ( name in cont) {
                cont[name]++;
            } else {
                cont[name] = 1;
            }
        }
    }
    return cont;
}


$(document).ready(function() {
    var win = 'http://www.torn.com/factions.php?step=your&news=2';
    if (window.location.href == win) {
        $('table.data tbody tr.bgAlt2').eq(1).after('<tr class="bgAlt1"><td style="text-align:center; width:100px; height:3rem;"></td><td style="text-align:center;">Which pages would you like to track? <input type="text" id="page1_track" value="1" maxlength="3" size="6"></input>-<input type="text" id="page2_track" value="10" maxlength="3" size="6"></input><input type="button" id="page_track" value="Go"></input><span id="loading_text">Counting...</span></td><td style="text-align:center; width:100px;"></td></tr>');
        $('#loading_text').hide();
        $('#page_track').click(function() {
            page1 = $('#page1_track').val().replace(/[^0-9]/, '');
            page2 = $('#page2_track').val().replace(/[^0-9]/, '');
            if (page1 > 0 && page1 < 500 && page2 > 0 && page2 < 500) {
                if (page2 > page1) {
                    attacks = {};
                    for (var page = (page1 - 1); page < page2; page++) {
                        entryNum = page * 25;
                        pgUrl = 'http://www.torn.com/factions.php?step=your&news=2&start=' + entryNum;
                        $.ajax({
                            url : pgUrl,
                            success : function(result) {
                                attacks = parsePage(result, attacks);
                                console.log("Page: " + (page + 1) + " - " + attacks);
                            },
                            async : false
                        });
                        if (page + 1 == page2) {
                            var closure = "";
                            for (var key in attacks) {
                                closure += key + " made " + attacks[key] + " hits.\n";
                            }
                            alert(closure);
                        }
                    }
                } else
                    alert('Please make sure the second page is greater than the first');
            } else
                alert('Please enter valid page numbers');
        });
    }
});