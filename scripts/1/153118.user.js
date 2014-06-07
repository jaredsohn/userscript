// ==UserScript==
// @name        ao3 saved filters
// @description Adds fields for persistent global & fandom filters to works index pages on Ao3
// @namespace   ao3
// @include     http*://archiveofourown.org/*works*
// @grant       unsafeWindow
// @version     1.1
// @downloadURL http://userscripts.org/scripts/source/153118.user.js
// ==/UserScript==

(function($) {

    // config
    var TAG_OWNERSHIP_PERCENT = 70; // the top fandom which owns works in the current tag must own at least this percent in order to be considered the search's active fandom

    var works = $('#main.works-index'), form = $('form#work_filters');
    if (!works[0] || !form[0]) return;

    var fandomName = (function() {
            var fandom = $('#tag_category_fandom label').first().text(),
                fandomCount = parseInt(
                        fandom.substring(fandom.lastIndexOf('(')+1, fandom.lastIndexOf(')'))
                    ),
                tagCount = works.find('.heading').first().text();

            tagCount = tagCount.substring(0, tagCount.indexOf(' Works'));
            tagCount = parseInt(tagCount.substring(tagCount.lastIndexOf(' ')+1));

            fandom = fandom.substring(0, fandom.lastIndexOf('('));

            if (!fandom || !fandomCount || !tagCount) { return; }

            return (fandomCount/tagCount*100 > TAG_OWNERSHIP_PERCENT) ? fandom : null;
        })(),
        tempKey ='temp-filter', tempFilter = localStorage[tempKey],
        tempGlobalKey = 'temp-global-filter', tempGlobalFilter = localStorage[tempGlobalKey],
        tempFandomKey = 'temp-fandom-filter', tempFandomFilter = localStorage[tempFandomKey],
        globalKey = 'global-filter', fandomKey = fandomName ? 'filter-'+fandomName : '',
        globalBox = $('<textarea>').val(localStorage[globalKey] ?
            localStorage[globalKey] : ''),
        fandomBox = fandomKey ?
            globalBox.clone().val(localStorage[fandomKey] ? localStorage[fandomKey] : '') : $(),
        search = $('#work_search_query'),
        dt = search.parents('dd').first().prev(dt),
        realSearch = $('<textarea>')
            .attr('name', search.attr('name'))
            .css('display', 'none')
            .insertAfter(search.removeAttr('name')),
        collapser = $('<dt>').addClass('saved-filters-collapser'),
        rightArrow = $('<img>').attr('src', '/images/arrow-right.gif?1352358192'),
        downArrow = $('<img>').attr('src', '/images/arrow-down.gif?1352358192'),
        container = $('<div>').addClass('saved-filters'),
        prevSearch = (function() {
            var ps, key = realSearch.attr('name')+'=';
            if (decodeURIComponent(window.location).indexOf(key) > 0) {
                ps = decodeURIComponent(window.location);
                ps = ps.substring(ps.indexOf(key)+key.length);
                ps = ps.indexOf('&') != -1 ? ps.substring(0, ps.indexOf('&')) : ps;
            }
            return ps;
        })();

    $('<style>').text(
        '.saved-filters-collapser { cursor: pointer; } .saved-filters, saved-filters > div { margin-bottom: 0.6em; } .saved-filters { border-style: solid; border-width: 1px; padding: 0.6em; } .saved-filters textarea { min-height: 8em; } .saved-filters div label { padding-left: 3px; } .prev-search span { color: #000; } .prev-search .temp { background: #ACEA72; } .prev-search .global { background: #93D2ED; } .prev-search .fandom { background: #B9AAED; }'
    ).appendTo($('head'));

    globalBox.addClass('global-filter')
        .add(fandomBox.addClass('fandom-filter'))
        .each(function() {
            var ta = $(this),
                cls = ta.attr('class'),
                title = cls.charAt(0).toUpperCase() +cls.substring(1, cls.indexOf('-')) +':';

            $('<div>').addClass(cls)
                .prepend(title)
                .append(ta.removeClass(),
                    $('<input>').attr({'type': 'checkbox', 'id': 'toggle-'+cls}),
                    $('<label>').attr('for', 'toggle-'+cls).text('Enabled'),
                    $('<a>').addClass('action').text('Save')
                ).appendTo(container);
        });

    container.find('input[type="checkbox"]').each(function() {
        var c = $(this), a = c.siblings('a.action'),
            key = a.parents('.global-filter')[0] ? globalKey : fandomKey,
            checked = localStorage[key+'-on'] !== 'false';

        c.attr('checked', checked);
        a.click(function() {
            localStorage[key] = a.siblings('textarea').val();
            localStorage[key+'-on'] = c.is(':checked')+'';
        });
    });

    if (tempFilter && search.val().indexOf(tempFilter) != -1) {
        search.val(tempFilter);
    } else {
        localStorage[tempFilter] = '';
        search.val('');
    }

    container = $('<dd>').append(container);

    collapser.prepend(rightArrow,
            ' Saved filters'
        ).click(function() {
            container.toggle();
            collapser.children('img').replaceWith(
                container.is(':visible') ? downArrow : rightArrow);
        }).add(container.hide()).insertBefore(dt);

    form.submit(function() {
        var val = search.val() || '', ta, key;
        container.find('textarea').each(function() {
            ta = $(this),
            key = ta.parents('.global-filter')[0] ? tempGlobalKey : tempFandomKey;

            if (ta.val() && ta.next('input').is(':checked')) {
                localStorage[key] = ta.val();
                if ((' '+val+' ').indexOf(' '+ta.val()+' ') < 0) {
                    val += ' '+ta.val();
                }
            } else if (localStorage[key]) { localStorage[key] = ''; }
        });

        localStorage[tempKey] = search.val();
        realSearch.val(val);
    });

    if (prevSearch) {
        prevSearch = 'Your filter was: ' +decodeURIComponent(prevSearch).split('+').join(' ') +'.';
        if (tempFilter) {
            prevSearch = prevSearch.replace(tempFilter, '<span class="temp">'+tempFilter+'</span>');
        }
        if (tempGlobalFilter) {
            prevSearch = prevSearch.replace(tempGlobalFilter, '<span class="global">'+tempGlobalFilter+'</span>');
        }
        if (tempFandomFilter) {
            prevSearch = prevSearch.replace(tempFandomFilter, '<span class="fandom">'+tempFandomFilter+'</span>');
        }

        works.find('.heading').first().after(
            $('<div>').addClass('prev-search').append(prevSearch));
    } else if ((localStorage[globalKey] && localStorage[globalKey+'-on'] !== 'false') || 
            (localStorage[fandomKey] && localStorage[fandomKey+'-on'] !== 'false')) {
        form.submit();
    }

})(unsafeWindow.jQuery);

