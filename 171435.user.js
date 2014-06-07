// ==UserScript==
// @id             feedlyslimfeed@labm0nkey
// @name           Feedly slimFeed
// @version        1.3
// @namespace      
// @author         labm0nkey
// @description    
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://www.feedly.com/*
// @include       https://www.feedly.com/*
// @include       http://cloud.feedly.com/*
// @include       https://cloud.feedly.com/*
// @include       http://www.cloud.feedly.com/*
// @include       https://www.cloud.feedly.com/*
// @match         http://feedly.com/*
// @match         https://feedly.com/*
// @match         http://www.feedly.com/*
// @match         https://www.feedly.com/*
// @match         http://cloud.feedly.com/*
// @match         https://cloud.feedly.com/*
// @match         http://www.cloud.feedly.com/*
// @match         https://www.cloud.feedly.com/*
// @require       http://code.jquery.com/jquery-latest.min.js
// @run-at        document-end
// ==/UserScript==

function deserialize(name, def) {
    return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
    GM_setValue(name, uneval(val));
}

var arrow_down = '<img class="arrow_down" title="Mark below as read" src="data:image/png;base64,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">';

var arrow_up = '<img class="arrow_up" title="Mark above as read" src="data:image/png;base64,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">';

var cache_refresh = '<img id="cacheRefresh" width="24" height="24" border="0" src="data:image/png;base64,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" class="pageAction" title="Refresh cache">';

var h1read = '<h1 class="readWait">Marking as read...</h1>';
var entryClass = '';

(function ($) {
    var favicons = {};

    var marking_as_read = false;

    //check settings
    if (GM_getValue("ffa_cache") == undefined) {
        favicons = generateFavicons();
    } else {
        favicons = deserialize("ffa_cache");
    }

    var cssTxt;
    cssTxt = " .arrow_up, .arrow_down {cursor: pointer;} .readWait { position: absolute; top: 50%; left: 50%; background: none repeat scroll 0 0 rgba(255, 255, 255, 0.2); border-radius: 3px; color: #82BD1A;} .u4Entry { padding-left: 24px; }";
    cssTxt += ".u0Entry:nth-child(even) { background-color:#f6fceb; } .u0Entry:nth-child(odd) { background-color:#fdfef9; }";
    cssTxt += ".u4Entry:nth-child(even) { background-color:#f6fceb; } .u4Entry:nth-child(odd) { background-color:#fdfef9; }";
    cssTxt += ".u5Entry:nth-child(even) { background-color:#f6fceb; } .u5Entry:nth-child(odd) { background-color:#fdfef9; }";
    cssTxt += ".u100Entry:nth-child(even) { background-color:#f6fceb; } .u100Entry:nth-child(odd) { background-color:#fdfef9; }";
    cssTxt += ".slim-favicon { opacity: 0.9; height: 16px, width: 16px; float: left;}";
    cssTxt += ".metadata { overflow: visible !important; }";
    cssTxt += ".u0Entry .slim-favicon {margin: 8px 7px 0px 0px;}";
    cssTxt += ".u4Entry .slim-favicon {margin: 1px 7px 0px 0px;} .u4Entry .metadata { max-height: 20px !important; } .u4Entry .slim-favicon { opacity: 0.9; width: 16px; height: 16px; display: inline; } ";
    cssTxt += ".u5Entry .slim-favicon {margin: 1px 7px 0px 0px;} .u5Entry .metadata { max-height: 20px !important; } .u5Entry .slim-favicon { opacity: 0.9; width: 16px; height: 16px; display: inline; } ";
    cssTxt += ".u100Entry .slim-favicon {margin: 1px 7px 0px 0px;} .u100Entry .metadata { max-height: 20px !important; } .u100Entry .slim-favicon { opacity: 0.9; width: 16px; height: 16px; display: inline; } ";

    GM_addStyle(cssTxt);

    function viewToClass() {
        return "." + checkView() + "Entry";
    }

    /*
     $('#feedlyPart').on('DOMAttrModified', function (event) {
     var element = event.target;

     if (element.attributes["id"].nodeValue == 'loadingEntries') {

     var entry = viewToClass();
     $(entry).each(function () {
     $(this).slimStyle();
     });

     $('#section0_column0').on('DOMNodeInserted', function (event) {
     var element = event.target;
     var entry = viewToClass();
     if (element.attributes["class"].nodeValue == (entry + ' ')) {
     addFavicon($(element));
     addArrows($(this));
     }
     });
     }
     });
     */
    $.fn.slimStyle = function () {
        return this.each(function () {
            addFavicon($(this));
            addArrows($(this));
        });
    };

    var init = function () {

    };

    function checkView() {
        var timeline = $('#timeline');
        if (timeline.hasClass('u0EntryList')) {
            entryClass = 'u0Entry';
            return 'u0';
        }
        if (timeline.hasClass('u4EntryList')) {
            entryClass = 'u4Entry';
            return 'u4';
        }
        if (timeline.hasClass('u5EntryList')) {
            entryClass = 'u5Entry';
            return 'u5';
        }
        if (timeline.hasClass('u100EntryList')) {
            entryClass = 'u100Frame';
            return 'u100';
        }
        return 'error';
    }

    function addFavicon(e) {
        var fav = e.find('.slim-favicon');
        if (fav.length == 0) {
            switch (checkView()) {
                case 'u0':
                    var info = e.find('.sourceInfo');
                    var uri = info.find('a').attr('data-uri');
                    info.before(favicons[uri]);
                    break;
                case 'u4':
                    var info = e.find('.sourceTitle');
                    var uri = info.attr('data-uri');
                    info.before(favicons[uri]);
                    break;
                case 'u5':
                    var info = e.find('.sourceTitle');
                    var uri = info.attr('data-uri');
                    info.before(favicons[uri]);
                    break;
                case 'u100':
                    var info = e.find('.sourceTitle');
                    var uri = info.attr('data-uri');
                    info.before(favicons[uri]);
                    break;
            }
        }
    }

    function addArrows(e) {
        var tools = e.find('.condensedTools');

        if (tools.find('.arrow_down').length == 0) {
            var a = $(tools).prepend(arrow_up);
            $(a).find('.arrow_up').on('click', function () {
                if (!marking_as_read) {
                    marking_as_read = true;
                    $("#feedlyPart0").css("opacity", "0.1");
                    $("#feedlyPart0").parent().prepend(h1read);

                    var entry = viewToClass();
                    $(this).closest(entry).prevAll(entry).each(function () {
                        if ($(this).find('.unread').length == 1) {
                            $(this).click();
                        }
                    });
                    $(this).closest(entry).click();
                    $("#feedlyPart0").css("opacity", "1");
                    $("#feedlyPart0").parent().find(".readWait").remove();
                    marking_as_read = false;
                }
            });
            var b = tools.prepend(arrow_down);
            $(b).find('.arrow_down').on('click', function () {
                if (!marking_as_read) {
                    marking_as_read = true;
                    $("#feedlyPart0").css("opacity", "0.1");
                    $("#feedlyPart0").parent().prepend(h1read);

                    var entry = viewToClass();
                    $(this).closest(entry).nextAll(entry).each(function () {
                        if ($(this).find('.unread').length == 1) {
                            $(this).click();
                        }
                    });
                    $(this).closest(entry).click();
                    $("#feedlyPart0").css("opacity", "1");
                    $("#feedlyPart0").parent().find(".readWait").remove();
                    marking_as_read = false;
                }
            });
        }
    }

    function generateFavicons() {
        var array = {};
        $('.tab').each(function () {
            $(this).find('.icon.handle').not('.expanded').each(function () {
                $(this).click();
            });

            $(this).find('.favicon').each(function () {
                var element = $(this).clone();
                element.addClass('slim-favicon');
                element.removeClass('favicon');
                var image = $('<div/>').append(element).html();

                var index = $(this).parent().attr('data-uri');

                array[index] = image;
            });

            $(this).find('.icon.handle.expanded').each(function () {
                $(this).click();
            });
        });
        return array;
    }

    $(document).bind('DOMNodeInserted', function (event) {
        var element = event.target;
        if (element.attributes["id"].nodeValue == 'timeline') {
            $('#timeline > div').bind("DOMNodeInserted", function (event) {
                checkView();
                if ($(event.target).hasClass(entryClass)) {
                    $(event.target).slimStyle();
                }
            });

        }
        if (element.attributes["id"].nodeValue == 'feedlyTitleBar') {
            if ($('#cacheRefresh').length == 0) {
                var cache = $('.pageActionBar').prepend(cache_refresh);
                $(cache).find('#cacheRefresh').on('click', function () {
                    favicons = generateFavicons();
                    serialize("ffa_cache", favicons);
                    alert('Cache refreshed. Please refresh page.');
                });
            }
        }
    });
})(jQuery);
