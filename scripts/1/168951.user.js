// ==UserScript==
// @name          Comic Rocket: Sort by Unread
// @namespace     http://keturn.net/userscripts
// @description   Put comics with most unread entries first.
// @version 0.5.4
// @match       *://www.comic-rocket.com/
// ==/UserScript==

function injectedCRR() {

var comicRocketUtil = (function ($) {
    return {
        getComicsItems: function () {
            return $(".comics-item");
        },
        unread: function (comicsItem) {
            var counts, label;
            label = $(comicsItem).find(".progress-label").text();
            counts = $.map(label.split('/'), Number);
            return counts[1] - counts[0];
        }
    };
}(jQuery));

var comicRocketResort = function ($) {
    var byUnread, $comicsItems, $container;

    $comicsItems = comicRocketUtil.getComicsItems();
    byUnread = $comicsItems.map(function (i, comicsItem) {
        // nested array because jQuery map helpfully unwraps one.
        return [[comicRocketUtil.unread(comicsItem), comicsItem]];
    })
    byUnread.sort(function (a, b) { return b[0] - a[0]; });
    
    $container = $comicsItems.first().parent();

    $comicsItems.detach();
    // The "No New Pages Yet" subheader won't be in the right place
    // anymore, so throw it out.
    $container.find('h2').remove();
    $comicsItems = $.map(byUnread, function (countedItem) { 
        return countedItem[1];
    });
    $container.append($comicsItems);
};

comicRocketResort(jQuery);
};

// userscript can't see jQuery :-(
// thx http://stackoverflow.com/a/8890387/9585
var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = injectedCRR.toString() + '; injectedCRR();'
document.body.appendChild(script);
