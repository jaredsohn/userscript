// ==UserScript==
// @name        Dota 2 Lounge Item Totals
// @namespace   WakiMiko
// @description Shows how many items you won/lost in total
// @include     http://dota2lounge.com/myprofile
// @include     http://*.dota2lounge.com/myprofile
// @grant       none
// @version     1.3
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

$.get('/ajax/betHistory.php', function (data) {
    var items = {
        Rare: 0,
        Uncommon: 0,
        Common: 0
    };

    var wonRows = $(data).find('.won').parents('tr').next().next(); 
    $.each(items, function (rarity) {
        items[rarity] += wonRows.find('.' + rarity).length;
    });

    var lostRows = $(data).find('.lost').parents('tr').next();; 
    $.each(items, function (rarity) {
        items[rarity] -= lostRows.find('.' + rarity).length;
    });

    var spans = $.map(items, function (count, rarity) {
        return '<span title="' + rarity + 's" style="float:none;font-size:100%" class="potwin ' + rarity + '">' + count + '</span>';
    });

    var stats = 'Item totals: ' + spans.join(' / ') + '<br>';
    $('#profile div:first div:first br:eq(4)').after(stats);
});
