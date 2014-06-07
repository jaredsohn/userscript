// ==UserScript==
// @name           Trade Add Bot
// @version        1.2
// @include        http://steamcommunity.com/trade/*
// @require        http://cdn.steamcommunity.com/public/javascript/prototype-1.7.js
// ==/UserScript==

setTimeout(function() {
    $$(".filter_ctn")[0].children[0].replace("<div class='selectableNone'>Looking for a specific item?" +
        "<div style='margin-top:-10px;float:right;height:25px'>" +
        "<input style='margin-top:-2px;width:70px' class='filter_search_box' type='text' id='filteramount' value='' placeholder='Amount' autocomplete='off'>" +
        "<div id='addxfiltered' style='margin-left:2px' class='pagebtn'>Add X</div>" +
        "<div id='addallfiltered' style='margin-left:2px' class='pagebtn'>Add All</div></div></div>")
    $('addxfiltered').observe('click', function(event) {
        var amount = parseInt($('filteramount').getValue());
        if(!isNaN(amount)) {
            var items = $('inventory_440_2').select('.itemHolder');
            for(a = i = 0; i < items.length && a < amount; i++) {
                if(items[i].visible()) {
                    if(items[i].firstChild) {
                        if(items[i].firstChild.id) {
                            a++;
                            var itemid = items[i].firstChild.id.slice(10);
                            setTimeout('FindSlotAndSetItem(g_ActiveInventory.rgInventory["' + itemid + '"]);', a * 250);
                        }
                    }
                }
            }
        }
    });
    $('addallfiltered').observe('click', function(event) {
            var items = $('inventory_440_2').select('.itemHolder');
            for(a = i = 0; i < items.length; i++) {
                if(items[i].visible()) {
                    if(items[i].firstChild) {
                        if(items[i].firstChild.id) {
                            a++;
                            var itemid = items[i].firstChild.id.slice(10);
                            setTimeout('FindSlotAndSetItem(g_ActiveInventory.rgInventory["' + itemid + '"]);', a * 250);
                        }
                    }
                }
            }
    });
}, 10);