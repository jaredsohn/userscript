// ==UserScript==
// @name                Estiah Item WikiLinks
// @description         Changes items, skills, events, mobs names into links to the Estiah Wiki.
// @author              Pure Pandemonium
// @license             (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include             http://www.estiah.com/character/inventory*
// @include             http://www.estiah.com/shop*
// @include             http://www.estiah.com/market*
// @include             http://www.estiah.com/character/skill*
// @include             http://www.estiah.com/character/deck*
// @include             http://www.estiah.com/arena*
// @include             http://www.estiah.com/city*
// @include             http://www.estiah.com/guild*
// @include             http://www.estiah.com/dungeon*
// @include             http://www.estiah.com/
// @exclude             http://www.estiah.com/city/race*
// @exclude             http://www.estiah.com/guild/vault*
// @exclude             http://www.estiah.com/guild/building
// @exclude             http://www.estiah.com/guild/building/
// @version             0.3
// ==/UserScript==

// Estiah Wiki address
var wiki_address = "http://www.progenitor-softworks.com/ew" // without the trailing /

/**
* Add wiki link to element (replace).
*/
function jump_to(link_text) {
    return function() {
        var link = link_text.replace(/(<([^>]+)>)/ig,"");
        link = link.replace(/&nbsp;/g," ");
        link = link.replace("[","");
        window.open(wiki_address + "/index.php?title=" + link.replace(/^\s\s*/,'').replace(/\s\s*$/,''));
    }
}

/**
* Add wiki link to element (add new).
*/
function add_wiki_link(name,where,parent) {
        var wiki_link = document.createElement('a');
        wiki_link.className = "nolink disabled";
        wiki_link.target = "_blank";
        wiki_link.innerHTML = " (wiki)";
        wiki_link.href = wiki_address + "/index.php?title=" + name;
        if(parent) {
            where.parentNode.appendChild(wiki_link, where.nextSibling);
        }
        else {
            where.appendChild(wiki_link, where.nextSibling);
        }
        return;
}

// Skills, items, etc. names to wiki link
var item_links = document.evaluate("//a[contains(@class,'BV_system_file')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
for(var i=0; i<item_links.snapshotLength; i++) {
    var this_link = item_links.snapshotItem(i);
    this_link.addEventListener("click", jump_to(this_link.innerHTML), true);
}

// City - Discovered Sites 
if(location.href.indexOf("city") >= 0) {
    var event_links = document.evaluate("//div[contains(@class,'wireframe_city_site')]//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i=0; i<event_links.snapshotLength; i++) {
        var this_link = event_links.snapshotItem(i);
        var close_div_pos = this_link.parentNode.parentNode.innerHTML.indexOf("</div>") + 6;
        var event_name = this_link.parentNode.parentNode.innerHTML.substr(close_div_pos).replace(/^\s\s*/,'').replace(/\s\s*$/,'');
        // Check if event name is in <em> element
        if(event_name.indexOf("</em>") >= 0) {
            event_name = event_name.replace(/<(?:[^>]+)>(.*)\<\/em\>/ig,"$1");
        }
        add_wiki_link(event_name,this_link,true);
    }
}

// City - Dungeons and Events
if(location.href.indexOf("city") >= 0) {
    var dungeons_tmp = document.evaluate("//div[contains(@class,'wireframe_city')]//a[contains(@class,'icon_dragon')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // Check if any dungeon found
    if(dungeons_tmp.singleNodeValue) {
        var dungeons_links = document.evaluate("div/div/a", dungeons_tmp.singleNodeValue.parentNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);    

        for(var i=0; i<dungeons_links.snapshotLength; i++) {
            add_wiki_link(dungeons_links.snapshotItem(i).innerHTML.replace(/^\s\s*/,'').replace(/\s\s*$/,''),dungeons_links.snapshotItem(i),true);
        }
    }
}

// Dungeon - Header Title
if(location.href.indexOf("dungeon") >= 0) { 
    var dungeons_tmp = document.evaluate("//div[contains(@class,'section_title')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // Check if header found
    if(dungeons_tmp.singleNodeValue) {
        add_wiki_link(dungeons_tmp.singleNodeValue.innerHTML.replace(/^\s\s*/,'').replace(/\s\s*$/,''),dungeons_tmp.singleNodeValue,false);
    }
}