// ==UserScript==
// @name        Greasemonkeyboard
// @description Use keyboard shortcuts to navigate most websites
//              (like pagination, go to search box).
// @author      Matthias Pronk
// @license     GNU General Public License version 3 or later
// @namespace   nl.masida
// @include     http://*
// @include     https://*
// @version     1.2.4
// @grant       none
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

/*
 * Copyright (C) 2013  Matthias Pronk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Keyboard shortcuts that are currently defined are:
 *  <Ctrl>-<Arrow Left>    Next page on website (for example search
 *                         results page on Google). Opera users will
 *                         know this feature as Fast Forward.
 *  <Ctrl>-<Arrow Right>   Previous page on website. Opera users will
 *                         know this feature as Rewind.
 *  <Ctrl>-<Arrow Up>      Focus next article or item on the website
 *                         (similiar like the Tab key does on Google's
 *                         search result page).
 *  <Ctrl>-<Arrow Down>    Focus previous article or item on the website.
 *  <Ctrl>-<Enter>         Follow the link of the currently selected
 *                         article or item.
 *  <Ctrl>-<Slash>         Focus search box (and select any text already
 *                         in there).
 *
 */
this.$ = this.jQuery = jQuery.noConflict(true);
(function($) {

    // Here are the keycodes mapped to functions. If you want to
    // disable some keybindings you can comment them here. If you want
    // to change the hotkey (default Ctrl), you can do so in the
    // onKeyPress function.
    var keybindings = {
        13:  onFollowItemLink, // enter
        37:  onPrevious,       // arrow left
        38:  onPreviousItem,   // arrow up
        39:  onNext,           // arrow right
        40:  onNextItem,       // arrow down
        191: onSearch          // slash
    };
    var symbolsPrevious = ['←', '«', '‹', '<'];
    var symbolsNext     = ['→', '»', '›', '>'];
    var keywordsPrevious = [
        'back', 'previous', 'newer',    // en
        'terug', 'vorige',              // nl
        'retour', 'précédent'           // fr
    ];
    var keywordsNext = [
        'forward', 'next', 'older',     // en
        'vooruit', 'volgende',          // nl
        'suivant',                      // fr
        'следующ'                       // ru
    ];
    var previousLinkSelectors = [
        'a[rel*="prev"]',
        'link[rel*="prev"]'
    ];
    var nextLinkSelectors = [
        'a[rel*="next"]',
        'link[rel*="next"]'
    ];
    var itemSelectors = [
        'article',
        'div.article',
        '#rso li.g',                              // google
        '#links div.results_links_deep',          // duckduckgo
        '#searchResult tbody tr',                 // tpb
        '#siteTable div.thing',                   // reddit
        '#content table.wide tr:not(.spacer)',    // userscripts.org
        '#content div.question-summary',          // stackoverflow
        '#content div.list div:not(.jobsfooter)', // stackoverflow careers
        '#container div.release',                 // freecode homepage
        '#container div.project',                 // freecode
        '#body div.ans'                           // hoogle
    ];
    var itemLinkSelectors = [
        'h1 a',
        'h2 a',
        'h3 a',
        'a.title',   // reddit
        'a.detLink', // tpb
        'a'
    ];
    var searchBoxSelectors = [
        'input#searchquery',  // slashdot
        'input#searchInput',  // wikipedia
        'input[name="q"]',
        'input[name="s"]'     // webmonkey
    ];
    var itemIndicator = $('<span>►</span>').css({
        'position': 'absolute',
        'font-family': 'Arial, sans-serif',
        'font-size': 'medium',
        'color': '#F00',
        'z-index': 1000,
        'display': 'none'
    });;
    var itemIndex = -1;
    var itemList = $();
    var itemSelectorFound = null;
    var domObserver = new MutationObserver(onDomMutated);

    function onKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (e.ctrlKey && keyCode in keybindings) {
            e.preventDefault();
            keybindings[keyCode]();
        }
    }

    function onLoad() {
        // add the item indicator to the document
        $('body').append(itemIndicator);

        // try to find items that match the itemSelectors
        findItems();

        // focus first item
        if (itemIndex < 0 && itemList.length > 0) {
            itemIndex = 0;
            highlightItem(itemIndex);
        }

        // observe any mutations in DOM
        domObserver.observe(document, {
            childList: true,
            attributes: false,
            characterData: false,
            subtree: true
        });
    }

    function onDomMutated(mutations) {
        findItems();

        // focus first item
        if (itemIndex < 0 && itemList.length > 0) {
            itemIndex = 0;
            highlightItem(itemIndex);
        }
    }

    function onPrevious() {
        findAndActivateLink(
            previousLinkSelectors, symbolsPrevious, keywordsPrevious);
    }
    
    function onNext() {
        findAndActivateLink(
            nextLinkSelectors, symbolsNext, keywordsNext);
    }

    function onNextItem() {
        findItems();
        if (itemIndex < itemList.length - 1) {
            itemIndex++;
        }
        highlightItem(itemIndex);
    }

    function onPreviousItem() {
        findItems();
        if (itemIndex > 0) {
            itemIndex--;
        }
        highlightItem(itemIndex);
    }

    function onFollowItemLink() {
        item = $(itemList.get(itemIndex));
        opts = {
            'context': item
        }
        link = elementFinder(itemLinkSelectors, opts);
        activateLink(link);
    }

    function onSearch() {
        searchBox = elementFinder(searchBoxSelectors);
        searchBox.focus().select();
    }

    function findItems() {
        // determine if item list should be updated
        var stale = false;
        if (itemList.length == 0) {
            stale = true;
        } else {
            for (var i = 0; i < itemList.length; i++) {
                if (! jQuery.contains(document.documentElement, itemList.get(i))) {
                    stale = true;
                    break;
                }
            }
        }

        // update the item list
        var retobj = null;
        if (stale) {
            if (itemSelectorFound) {
                retobj = elementFinder([itemSelectorFound], {returnobj: true});
            } else {
                retobj = elementFinder(itemSelectors, {returnobj: true});
            }
            if (retobj.selector) {
                itemSelectorFound = retobj.selector;
                itemList = retobj.nodes;
            }
        }
    }

    function highlightItem(index) {
        var offset = $(itemList.get(index)).offset();
        itemIndicator.css({
            'left': Math.max(offset.left - 20, 0),
            'top': offset.top,
        }).show();
        $('html,body').stop(true, true);
        if (offset.top - 25 > $(window).scrollTop() + $(window).height() ||
            offset.top + 50 < $(window).scrollTop()) {
            $('html,body').animate({scrollTop: offset.top - 25}, 500);
        }
    }

    function elementFinder(queries, opts) {
        // Returns the element that matches one of the queries
        // specified. Optionally, you can specify an extra filter
        // function on the element or you can specify a context in
        // which to query.
        var $sel = null;
        if (opts === undefined) opts = {};
        for (var i = 0; i < queries.length; i++) {
            if (opts.context) {
                $sel = $(queries[i], opts.context);
            } else {
                $sel = $(queries[i]);
            }
            if ($sel.length > 0) {
                if ((opts.filter && opts.filter($sel)) || (! opts.filter)) {
                    if (opts.returnobj) {
                        return {
                            'selector': queries[i],
                            'nodes': $sel
                        };
                    } else {
                        return $sel;
                    }
                }
            }
        }
        return $();
    }

    function uglyLinkFinder(symbols, keywords) {
        /*
         * Find the most probable link based on lists of symbols and
         * keywords that are likely to be in a next/previous link.
         */

        // generate regexps for keywords in advance
        var kwregexps = $.map(keywords, function(keyword) {
            return new RegExp('\\b' + keyword + '\\b', 'i');
        });

        var links = $("a").map(function() {
            var link = $(this);
            var linkScore = 0;
            // get the text from the link (including image alt attributes)
            var linkText = $.trim(
                link.text() + ' ' +
                link.find('img').map(function() {
                    return $(this).attr('alt');
                }).get().join(' '));
            // add 2 points to score if a symbol is found in the text
            for (var i = 0; i < symbols.length; i++) {
                if (linkText.indexOf(symbols[i]) >= 0) {
                    linkScore += 2;
                }
            }
            // add 1 point to score if a keyword is found in the text
            for (var i = 0; i < kwregexps.length; i++) {
                matches = linkText.match(kwregexps[i]);
                if (matches) {
                    linkScore += 1;
                }
            }
            if (linkScore == 0) return null;
            // final score is score minus word count
            var linkWordCount = linkText.split(' ').length;
            return {
                'n': link,
                // 't': linkText,
                // 'u': link.attr('href'),
                's': linkScore - linkWordCount
            };
        }).get();

        // sort the links in descending order on the score field
        links.sort(function(a, b) { return b['s'] - a['s'] });

        if (links.length > 0) {
            return links[0]['n'];
        } else {
            return $();
        }
    }

    function findAndActivateLink(queries, symbols, keywords) {
        opts = {
            'filter': function(elem) {
                url = elem.attr('href');
                if (url) return true;
            }
        }
        node = elementFinder(queries, opts);
        if (node.length == 0) {
            // ugly
            node = uglyLinkFinder(symbols, keywords);
        }
        activateLink(node);
    }

    function activateLink(link) {
        if (link.length == 0) return;
        url = link.attr('href');
        if (!url) return;
        if (url.indexOf('javascript:') == 0) {
            node.click();
        } else {
            document.location = url;
        }
    }

    $(document).ready(onLoad);
    $(window).bind('keydown.greasemonkeyboard', onKeyPress);

})(this.jQuery);
