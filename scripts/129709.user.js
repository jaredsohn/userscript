// ==UserScript==
// @name           FanFiction.net Rating: All auto-select
// @namespace      rimmington
// @description    Removes FictionRating.com link from the rating filter menu and auto-selects Rating: All
// @include        http://*.fanfiction.net/*
// @exclude        http://*.fanfiction.net/s/*
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

var $ = unsafeWindow.$;
ratingDropdown = $('select[name="censorid"]');
ratingDropdown.attr('onchange', '').children('[value="-1"]').remove();
if (ratingDropdown.val() == 3)
{
    ratingDropdown.val(10);
    click(ratingDropdown.closest('form').find('input[type="button"]')[0]);
}