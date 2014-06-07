// ==UserScript==
// @name           ShowPhatLoot
// @namespace      kol.interface.unfinished
// @description    Indicates which items are potentially stealable by others in your inventory for KoL PvP.
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://*kingdomofloathing.com/fillcloset.php*
// @include        http://*kingdomofloathing.com/closet.php*
// @include        http://127.0.0.1:*/inventory.php*
// @include        http://127.0.0.1:*/fillcloset.php*
// @include        http://127.0.0.1:*/closet.php*
// @version        1.1
// ==/UserScript==

// Version 1.1
// - added a reset button, and checked for quest items too (some it seems are not marked untradeable)

var done = false;

function doPage() {
    markPage();
    done = !done;
    GM_setValue('showloot',(done) ? 'true' : 'false');
}

function markPage() {
    var iList = JSON.parse(GM_getValue('pvp','{"vuln":{},"safe":{}}'));
    // find table root of area interested in
    var items = document.evaluate('//b[@class="ircm"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<items.snapshotLength;i++) {
        var itm = items.snapshotItem(i);
        var name = itm.innerHTML;
        var id = itm.parentNode.getAttribute('id');
        if (id)
            id = id.replace(/[^0-9]+/g,'');
        var url = itm.parentNode.previousSibling.firstChild;
        if (url)
            url = url.getAttribute('onclick').replace(/,.*$/,'').replace(/[^0-9]+/g,'');
        //GM_log('item: '+name+' ('+id+','+url+')');
        if (iList.vuln[id])
            markStealable(itm,done);
        else if (!iList.safe[id])
            checkItem(url,itm,id,done);
    }
}

function markStealable(place,d) {
    if (!d)
        place.style.textDecoration = 'underline';
    else
        place.style.textDecoration = '';
}

// utility function, stolen from other scripts
function GM_get(dest, callback)
{   GM_xmlhttpRequest({
      method: 'GET',
      url: dest,
        //onerror:function(error) { GM_log("GM_get Error: " + error); },
        onload:function(details) {
            if( typeof(callback)=='function' ){
                callback(details.responseText);
}   }   }); }

function checkItem(desc,place,id,d) {
    GM_get('http://'+window.location.host+'/desc_item.php?whichitem='+desc,function(response){
         if(response!='') {
             //<br>Cannot be traded<br>Cannot be discarded<Br>Cannot be traded or discarded
             var keep = response.match(/(<br>Cannot be (traded|discarded))|(<b>Gift Item)|(<b>Quest Item)/gi);
             var iList = JSON.parse(GM_getValue('pvp','{"vuln":{},"safe":{}}'));
             if (!keep) {
                 iList.vuln[id] = 'y';
                 markStealable(place,d);
             } else {
                 iList.safe[id] = 'y';
             }
             GM_setValue('pvp',JSON.stringify(iList));
         }
    });
}

function reset() {
    GM_setValue('pvp','{"vuln":{},"safe":{}}');
    if (GM_getValue('showloot','false')=='true') {
        markPage();
        done = !done;
        markPage();
    }
}

function findHeader() {
    var h = document.evaluate('//b[text()="Inventory:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (h.singleNodeValue)
        h = h.singleNodeValue.parentNode;
    else {
        h = document.evaluate('//b[text()="Filling Your Colossal Closet:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        if (h.singleNodeValue)
            h = h.singleNodeValue.parentNode;
        else {
            h = document.evaluate('//b[text()="Your Colossal Closet:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
            if (h.singleNodeValue)
                h = h.singleNodeValue.parentNode;
        }
    } 
    if (h) {
        var x = document.createElement('input');
        x.setAttribute('type','button');
        x.setAttribute('value','Reset');
        x.setAttribute('title','Click to reset learned PvP info');
        x.setAttribute('style','font-size:8px;float:right;');
        h.appendChild(x);
        x.addEventListener('click',reset);

        var x = document.createElement('input');
        x.setAttribute('type','button');
        x.setAttribute('value','Show PvP lootable');
        x.setAttribute('title','Click to toggle underlining of inventory items that can be stolen as phat loot during PvP');
        x.setAttribute('style','font-size:8px;float:right;');
        h.appendChild(x);
        x.addEventListener('click',doPage);

        if (GM_getValue('showloot','false')=='true') {
            doPage();
        }
    }
}

findHeader();
