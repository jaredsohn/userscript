// ==UserScript==
// @name           Google Reader entry title in title bar
// @version        1.6c
// @date           2010-03-30
// @namespace      gp
// @author         George Pop
// @description    Puts current entry title in window title bar.
// @include        http://www.google.com/reader/*
// ==/UserScript==

function main()
{
    document.addEventListener('click', change_title, false);
    document.addEventListener('keyup', change_title, false);
    document.getElementById('entries').addEventListener('scroll', change_title, false);
}

function change_title()
{
    unsafeWindow.document.title = get_title();
}

function get_title()
{
    var m = unsafeWindow.document.title.match(/ \- ([^\-]+)$/);
    var base_title = m ? m[1] : unsafeWindow.document.title;
    var entry_title, feed_title, new_title;
    if (is_cards_view())
    {
        var xp = xpath('//div[@id="current-entry"]/descendant::a[@class="entry-title-link"]');
        if (xp.snapshotLength)
        {
            entry_title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*\>/g, '');
            xp = xpath('//div[@id="current-entry"]/descendant::a[@class="entry-source-title"]');
            feed_title = xp.snapshotItem(0).innerHTML;
        }
    }
    else if (is_list_view())
    {
        var xp = xpath('//div[@id="current-entry"]/descendant::div[@class="entry-secondary"]/h2');
        if (xp.snapshotLength)
        {
            entry_title = xp.snapshotItem(0).innerHTML;
            xp = xpath('//div[@id="current-entry"]/div[@class="collapsed"]/div[@class="entry-main"]/span');
            feed_title = xp.snapshotItem(0).innerHTML;
        }
    }
    new_title = '';
    if (entry_title) new_title += entry_title;
    if (feed_title) new_title += ' [' + feed_title + ']';
    if (new_title.length) new_title += ' - ';
    return new_title + base_title;
}

function is_list_view()
{
    var xp = xpath('//div[@id="entries" and @class="list"]');
    return xp.snapshotLength == 1;
}

function is_cards_view()
{
    var xp = xpath('//div[@id="entries" and @class="cards"]');
    return xp.snapshotLength == 1;
}

function xpath(xp)
{
    return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addEventListener('load', main, false);
