// ==UserScript==
// @name        Dshini Memory Resolver
// @namespace   http://dshini.net
// @description Automatically plays memory on dshini.net
// @include     http://*.dshini.net/de/game/play_memodshin*
// @version     1.2
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       unsafeWindow
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;
unsafeWindow.$$$$ = jQuery.noConflict();

unsafeWindow.$$$$(document).ready(
    function()
    {
        if(unsafeWindow.$$$$('a[title="neues Spiel starten"]').length > 0)
        {
            reset();
            unsafeWindow.$$$$('a[title="neues Spiel starten"]').first().children('div').first().children('div').first().click();
            return;
        }
        unsafeWindow.$$$$('body').append('<a href="#" id="memBotReset" style="position:fixed;z-index:1000000;right:10px;top:10px;background-color:#a0a0a0">Bot resetten</a>');
        unsafeWindow.$$$$('#memBotReset').click(
            function()
            {
                reset();
                location.href = 'http://www.dshini.net/de/game/start_memodshin/start/new';
            }
        );
        setTimeout(execute, 250);
    }
);

function reset()
{
    GM_setValue('memory_0', false);
    GM_setValue('memory_1', false);
    GM_setValue('memory_2', false);
    GM_setValue('memory_3', false);
    GM_setValue('memory_4', false);
    GM_setValue('memory_5', false);
    GM_setValue('memory_6', false);
    GM_setValue('memory_7', false);
    GM_setValue('memory_8', false);
    GM_setValue('memory_9', false);
    GM_setValue('memory_10', false);
    GM_setValue('memory_11', false);
    GM_setValue('memory_12', false);
    GM_setValue('memory_13', false);
    GM_setValue('memory_14', false);
    GM_setValue('memory_15', false);
    GM_setValue('memory_16', false);
    GM_setValue('memory_17', false);
    GM_setValue('memory_18', false);
    GM_setValue('memory_19', false);
    GM_setValue('memory_20', false);
    GM_setValue('memory_21', false);
    GM_setValue('memory_22', false);
    GM_setValue('memory_23', false);
}

function execute()
{
    var elems = [GM_getValue('memory_0', false),
                 GM_getValue('memory_1', false),
                 GM_getValue('memory_2', false),
                 GM_getValue('memory_3', false),
                 GM_getValue('memory_4', false),
                 GM_getValue('memory_5', false),
                 GM_getValue('memory_6', false),
                 GM_getValue('memory_7', false),
                 GM_getValue('memory_8', false),
                 GM_getValue('memory_9', false),
                 GM_getValue('memory_10', false),
                 GM_getValue('memory_11', false),
                 GM_getValue('memory_12', false),
                 GM_getValue('memory_13', false),
                 GM_getValue('memory_14', false),
                 GM_getValue('memory_15', false),
                 GM_getValue('memory_16', false),
                 GM_getValue('memory_17', false),
                 GM_getValue('memory_18', false),
                 GM_getValue('memory_19', false),
                 GM_getValue('memory_20', false),
                 GM_getValue('memory_21', false),
                 GM_getValue('memory_22', false),
                 GM_getValue('memory_23', false)];
    
    var cards = unsafeWindow.$$$$('div.fl').has('img[src*="md_"]');
    for(var i = 0; i < cards.length; i++)
    {
        var current = cards.eq(i);
        if(elems[i] != false)
            continue;
        var imgtag = current.find('img[src*="md_img"]');
        if(imgtag.length > 0)
        {
            var image = imgtag.attr('src').substr(79, 2);
            
            //WORKAROUND: Fixes the problem of '01' == '01' not being true
            image = (image == '01' ? 'xy' : image);
            
            
            GM_setValue('memory_' + i.toString(), image);
            elems[i] = image;
        }
    }
    
    // Laufe durch alle (un)bekannten Karten
    for(var j = 0; j < elems.length; j++)
    {
        // Wenn das Element bekannt ist, aber noch nicht gefunden:
        if(elems[j] != false && elems[j] != true)
        {
            // Laufe durch alle (un)bekannten Karten
            for(var k = 0; k < elems.length; k++)
            {
                // Wenn es eine bekannte Karte gibt und es nicht die aktuelle ist, die zur aktuellen Karte passt...
                if(elems[j] == elems[k] && j != k)
                {
                    // Wenn beide Karten offen sind, dann setze sie einfach auf gefunden und mache weiter
                    if(!hasOpen() && isOpen(j) && isOpen(k))
                    {
                        GM_setValue('memory_' + k, true);
                        GM_setValue('memory_' + j, true);
                        continue;
                    }
                    // Wenn mehr als eine Karte offen ist und es ist weder diese noch die gefundene, tue nichts
                    else if(hasOpen() && !isOpen(j) && !isOpen(k))
                    {
                        continue;
                    }
                    // Wenn mindestens eine Karte geöffnet ist und es ist die aktuelle, dann setze beide Karten auf gefunden, setze die offenen Karten von der Anzahl auf 0 und klicke auf die andere Karte
                    else if(hasOpen() && isOpen(j))
                    {
                        cards.eq(k).find('img').click();
                        return;
                    }
                    // Wenn mindestens eine Karte geöffnet ist und es ist die gefundene, dann setze beide Karten auf gefunden, setze die offenen Karten von der Anzahl auf 0 und klicke auf diese Karte
                    else if(hasOpen() && isOpen(k))
                    {
                       	cards.eq(j).find('img').click();
                        return;
                    }
                    // Wenn keine Karte offen ist, dann klicke auf diese Karte und setze die Anzahl der offenen Karten auf 1
                    else if(!hasOpen())
                    {
                        cards.eq(j).find('img').click();
                        return;
                    }
                }
            }
        }
        else if(elems[j] == false)
        {
            cards.eq(j).find('img').click();
            return;
        }
    }
}

function hasOpen()
{
    return (unsafeWindow.$$$$('div.fl').has('img[src*="md_img"]').length % 2) > 0;    
}
        
function isOpen(index)
{
    return (unsafeWindow.$$$$('div.fl').has('img[src*="md_"]').eq(index).find('img[src*="md_img"]').length > 0);
}