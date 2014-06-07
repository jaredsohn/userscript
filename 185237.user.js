// ==UserScript==
// @name        Keskiarvolaskuri
// @namespace   
// @description näyttää keskiarvon wilman opinnot sivulla
// @include     https:// /*laita wilma linkkisi tähän*/ .fi/choices
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {
function average(sel) {
    var total = 0,
        valid_labels = 0,
        average;
        
    sel.each(function() {
        var val = parseInt(this.innerHTML, 10);
        if (val !== 0) {  
            valid_labels += 1;
            total += val;
         }
    });

    return average = total / valid_labels;
}

// laske kaikkien aineiden keskiarvo

    var ka = average($('.lem').parent().parent().children(':first-child').next());
    
    var sana;
    
    if (ka >= 4 && ka < 5) 
        sana = 'Hylätty';
    else if (ka >= 5 && ka < 6)
        sana = 'Välttävä';
    else if (ka >= 6 && ka < 7)
        sana = 'Kohtalainen';
    else if (ka >= 7 && ka < 8)
        sana = 'Tyydyttävä';
    else if (ka >= 8 && ka < 9)
        sana = 'Hyvä';
    else if (ka >= 9 && ka < 10)
        sana = 'Kiitettävä';
    else if (ka == 10)
        sana = 'Erinomainen';
    
    $('#gradebook').append('<tr style="cursor:pointer;" class="level1"><td style="padding-left : 1.8em;" class="collapsed">Keskiarvo</td>' +
    '<td class="collapsed-data" align="center">' + ka + '</td><td class="collapsed-data">' + sana + '</td><td align="center" class="collapsed-data"> </td></tr>');
});