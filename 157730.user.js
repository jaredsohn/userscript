// ==UserScript==
// @name        ME3 Manifest Percentages
// @namespace   frostwyrm
// @include     http://social.bioware.com/n7hq/home/inventory/?name=*&platform=*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

var percentageize = function (type) {
    var denom = 0;
    var num = 0;
    var totaldenom = 0;
    var totalnum = 0;
    
    $($('#' + type + '_content').children().get().reverse()).each(function(index, elem) { 
        if ($(elem).is("div.card")) {
            var src = $($(elem).children().get()[2]).attr('src');
            var frac = src.substring(src.lastIndexOf('/') + 1).split('.png')[0];
            num += parseInt(frac.split('-')[1]);
            denom += parseInt(frac.split('-')[0]);
        }
        else if ($(elem).is('h3')) {
            var percentage = '';
            if (num == denom) {
                percentage = '100%';
            } 
            else {
            	percentage = String((num / denom).toFixed(2)).substring(2) + '%';
            }

            $(elem).html($(elem).html() + ' (' + num + '/' + denom + ') (' + percentage + ')');
            totalnum += num;
            totaldenom += denom;
            num = 0;
            denom = 0;
        }
    
    });
    
    var percentage = '';
    if (totalnum == totaldenom) {
        percentage = '100%';
    } 
    else {
        percentage = String((totalnum / totaldenom).toFixed(2)).substring(2) + '%';
    }
    
    $('#' + type + ' a span').html($('#' + type + ' a span').html() + ' (' + totalnum + '/' + totaldenom + ') (' + percentage + ')');
    
}

$(document).ready(function () {
	percentageize('weapons');
    percentageize('weapon_mods');
    percentageize('inventory_characters');
    percentageize('gear');
    
});