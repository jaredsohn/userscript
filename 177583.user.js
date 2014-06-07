// ==UserScript==
// @name         [nCore] Nem kell a Német film
// @namespace    http://us.malakai.hu/
// @version      0.1
// @description  Elrejti a Német filmeket.
// @include      https://ncore.cc/torrents.php?*tipus=xvid*
// @include      https://ncore.cc/torrents.php?*tipus=dvd*
// @include      https://ncore.cc/torrents.php?*tipus=dvd9*
// @include      https://ncore.cc/torrents.php?*tipus=hd*
// @require      http://code.jquery.com/jquery-2.0.3.js
// @copyright    2012+, TLGreg
// ==/UserScript==

var titles = $('nobr');
var remove = [];
titles.each(function() {
    var title = $(this),
        subtitle = title.closest('.torrent_txt').find('.siterank > span');
    if (/german/i.test(title.text())
        && (subtitle.length === 0
            || !( /german|német|dutch|deutsch/i.test(subtitle.text()) )
           )) {
        var box = title.closest('.box_torrent'),
            pre_clear = box.prev(),
            aft_clear = box.next(),
            box_drop = aft_clear.next('.torrent_lenyilo,.torrent_lenyilo2');
        remove = remove.concat([box[0], pre_clear[0], aft_clear[0], box_drop[0]]);
    }
});
$(remove).hide();