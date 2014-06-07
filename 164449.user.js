// ==UserScript==
// @name        TradeMe Open Homes Helper
// @author      Andy Cahill
// @description Adds extra info and selectable icons to listings on TradeMe's open homes page to help track which ones you've seen/liked
// @homepage    https://github.com/acahill/trademe
// @namespace   https://github.com/acahill/trademe
// @updateURL   http://userscripts.org/scripts/source/164449.user.js
// @downloadURL http://userscripts.org/scripts/source/164449.user.js
// @version     1.3

// @include     http://www.trademe.co.nz/property/open-homes*
// @include     http://www.trademe.co.nz/Browse/CategoryAttributeSearchResults.aspx*
// @include     http://www.trademe.co.nz/browse/property/regionlistings.aspx*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

if (!String.prototype.format) {
  String.prototype.format = function() { var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(match, number) {
      return args[number] !== undefined ? args[number] : match;
    });
  };
}

var MAX_FLAIR_AGE = 56 * 1000 * 86400; // 56 days in milliseconds, since that's the current maximum listing duration
var LISTING_CACHE =  4 * 1000 * 86400; //  4 days in milliseconds, seems like a reasonable cache expiry time

var icons = { 50 : "love it!",                 // heart icon
              54 : "visited, liked it",        // thumbs up
              55 : "visited, didn't like",     // thumbs down
              56 : "not visited, looks good",  // green "?"
              57 : "not visited, looks bad" }; // red "!"

var nodeCache = []; // temp cache for listing nodes

if (document.title.match(/open homes/i)) { // just being safe because regionlistings.aspx is a bit vague, might not be just open homes
    console.log("Starting OHH...");
    pageSetup();
    console.log("Purging old GM stored values...");
    purgeOldStorage();
    console.log("Enhancing open home listings...");
    enhanceListings();
    console.log("OHH complete!");
}

function pageSetup() {
    document.styleSheets[0].insertRule('.ohhIcon { padding: 2px 2px 0 0; opacity: 0.3; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale\"); }', 0);
    document.styleSheets[0].insertRule('.ohhIcon.ohhSelected { opacity: 1.0; filter: none; }', 1);
    document.styleSheets[0].insertRule('.ohhIcon:hover { opacity: 1.0; filter: none; }', 2);
    document.styleSheets[0].insertRule('.ohhError { font-style: italic; padding: 3px; display: inline-block; vertical-align: top; color: red; }', 3);
    document.styleSheets[0].insertRule('.ohhInfo  { font-style: italic; padding: 3px; display: inline-block; vertical-align: top; min-width: 250px; }', 3);
    document.styleSheets[0].insertRule('.ohhDetail { position: fixed; height: 90%; overflow-y: auto; right: 2%; top: 5%; width: 60%; background-color: white; border: 1px solid black; padding: 5px; z-index: 999; }', 4);
    document.styleSheets[0].insertRule('.ohhPhoto { padding: 3px; display: inline-block; }', 5);
    document.styleSheets[0].insertRule('.ohhCarousel { overflow-x: scroll; overflow-y: hidden; white-space: nowrap; }', 6);

    var pDiv = document.getElementById("SiteHeader_Sitenav_SiteNavDiv");
    if (pDiv) pDiv.parentNode.removeChild(pDiv);
    pDiv = document.getElementById("OpenHomeLozenge");
    if (pDiv) pDiv.parentNode.removeChild(pDiv);
        
    rearrangeFilters();
}

function rearrangeFilters() {
    // check page type
    var pnl = document.getElementsByClassName("pricePanel");
    if (pnl.length == 0) return;
    pnl = pnl[0];
    
    // move even-number options into one column
    var rows = pnl.getElementsByTagName("tr");
    for (var i=0; i<3; i++) {
        var nr = document.createElement("tr");
        nr.appendChild(rows[i].removeChild(rows[i].childNodes[1]));
        rows[i].parentNode.appendChild(nr);
    }

    // add odd-number options as second column
    rows = pnl.getElementsByTagName("tr");
    rows[2].removeChild(rows[2].childNodes[1]); // remove random empty <td>
    var j=1, k=3;
    for (i=1, j=1, k=3; i<5; i++, j+=2, k+=2) {
        var copySrc = rows[i].getElementsByTagName("a").length>0?i:(i+1>4?3:i+1);
        var col = rows[copySrc].firstChild.cloneNode(true);
        var a = col.getElementsByTagName("a")[0];
        a.href = a.href.replace(/price-range-\d+-\d+/i, "price-range-{0}00000-{1}00000".format(j,k));
        a.textContent = "${0}00k - ${1}00k".format(j,k);
        rows[i].appendChild(col);
    }
    
    // fix odd-numbered selections
    var selection = window.location.href.match(/price-range-(\d)0+-\d0+/i);
    if (selection && selection[1] % 2 == 1) {
        var text = rows[0].firstChild.firstChild;
        var link = rows[selection[1] / 2 + 0.5].childNodes[1].firstChild;
        var lc = link.cloneNode(true);
        text.parentNode.replaceChild(lc, text);
        link.parentNode.replaceChild(text, link);
        text.textContent = link.textContent;
        lc.firstChild.textContent = "Any price";
        lc.firstChild.href = lc.firstChild.href.replace(/\/price-range-\d+-\d+/, "");
    }
    
    // shift 1M+ to first column, out of the way
    var mil = rows[5].removeChild(rows[5].firstChild);
    rows[0].appendChild(mil);
}

function enhanceListings() {
    var items = document.getElementsByClassName('titleCol');
    for (var i=0; i<items.length; i++) {
        var listing = items[i].getElementsByTagName('a')[0].href.match(/\d+/)[0];
        var allFlair = GM_getValue(listing);
        items[i].style.paddingBottom = "0";
        var li = items[i].parentNode.appendChild(document.createElement("li"));
        var flair = Object.keys(icons);
        for (var j=0; j<flair.length; j++) {
            li.appendChild(makeIcon(flair[j], listing, allFlair && allFlair.indexOf("!" + flair[j]) >= 0));
        }
        var cache = GM_getValue("info-" + listing);
        nodeCache[listing] = li;
        if (!cache) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.trademe.co.nz/v1/Listings/{0}.json".format(listing),
                onload: function(response) {
                    var info = JSON.parse(response.responseText);
                    if (response.status == 200) {
                        GM_setValue("info-" + info.ListingId, new Date().getTime() + response.responseText);
                        enhanceListing(info, nodeCache[info.ListingId]);
                    } else {
                        var lid = info.Request.match(/\d+/g)[1];
                        displayListingError(info, lid, nodeCache[lid]);
                    }
                }
            });
        } else {
            enhanceListing(JSON.parse(cache.substring(cache.indexOf('{'))), li);
        }
    }
}

function displayListingError(info, listing, elem) {
    console.log("Failed to enhance listing " + listing + ", error " + info.ErrorDescription);
    var err = elem.appendChild(document.createElement("span"));
    var d = new Date();
    err.textContent = "API quota exceeded as of {0}:{1}. Try again in {2} minutes"
                          .format(d.getHours(), d.getMinutes(), 60 - d.getMinutes());
    err.className = "ohhError";
}

function enhanceListing(info, elem) {
    var text = "";
    for (var i=0; i < info.Attributes.length; i++) {
        var a = info.Attributes[i];
        switch (a.Name) {
            case "property_type":       text += a.Value + ", ";         break;
            case "rateable_value_(rv)": text += "RV " + a.Value + ", "; break;
        }
    }
    var l = new Date(parseInt(info.StartDate.match(/(\d+)/)[0], 10));
    text += "{0}/{1}/{2}".format(l.getDate(), l.getMonth(), l.getFullYear());
    if (info.Agency) {
        text += ", " + info.Agency.Name.match(/^(.*?\s.*?)\s*/)[0];
        var agents = info.Agency.Agents.map(function(agent){ return agent.FullName; });
        text += " (" + agents.join(", ") + ")";
    }
    var img = elem.parentNode.firstElementChild.getElementsByTagName("img")[0];
    img.onmouseover = function() { hideDetail(); showDetail(info.ListingId); };
    
    var inf = elem.appendChild(document.createElement("span"));
    inf.className = "ohhInfo";
    inf.textContent = text;
}

function showDetail(listing) {
    var node = nodeCache[listing];
    var div = document.createElement("div");
    var cache = GM_getValue("info-" + listing);
    var info = JSON.parse(cache.substring(cache.indexOf('{')));
    div.id = "ohhCallout";
    div.className = "ohhDetail";
    div.tabIndex = -1; // HACK: make div focusable in Firefox
    node.appendChild(div);
    div.focus();
    div.onblur = blurblur;

    var h1 = document.createElement("h1");
    h1.textContent = "{0} - {1}".format(listing, info.Title);
    h1.style.fontSize = "20px";
    div.appendChild(h1);
    
    var div2 = document.createElement("div");
    for (var p=0; p<info.Photos.length; p++) {
        var photo = document.createElement("img");
        photo.src = info.Photos[p].Value.Large;
        photo.className = "ohhPhoto";
        div2.appendChild(photo);
        div2.className = "ohhCarousel";
    }
    div.appendChild(div2);
    var table = document.createElement("table");
    table.style.margin = "10px";
    for (var a=0; a<info.Attributes.length; a++) {
        var row = document.createElement("tr");
        var k = document.createElement("td");
        k.textContent = info.Attributes[a].DisplayName;
        row.appendChild(k);
        var v = document.createElement("td");
        v.textContent = info.Attributes[a].Value;
        row.appendChild(v);
        table.appendChild(row);
    }
    div.appendChild(table);
    var body = document.createElement("div");
    body.textContent = info.Body;
    body.style.whiteSpace = "pre-wrap";
    body.style.margin = "10px";
    div.appendChild(body);
    
    if (info.Agency) {
        var agency = document.createElement("a");
        agency.href = info.Agency.Website;
        agency.textContent = info.Agency.Name;
        div.appendChild(agency);
        div.appendChild(document.createElement("br"));
        var icon = document.createElement("img");
        icon.src = info.Agency.Logo;
        div.appendChild(icon);
        for (var b=0; b<info.Agency.Agents.length; b++) {
            for (var c=0; c<Object.keys(info.Agency.Agents[b]).length; c++) {
                var agent = document.createElement("div");
                agent.textContent = info.Agency.Agents[b][Object.keys(info.Agency.Agents[b])[c]];
                div.appendChild(agent);
            }
        }
    }
}

function blurblur(event) {
    var callout = document.getElementById("ohhCallout");
    if (callout && !callout.contains(event.explicitOriginalTarget || document.activeElement))
        callout.parentNode.removeChild(callout);
}

function hideDetail() {
    var callout = document.getElementById("ohhCallout");
    if (callout) callout.parentNode.removeChild(callout);
}

function toggleFlair(id, listing, elem) {
    console.log("Toggling flair for listing " + listing + " type " + id);
    var allFlair = GM_getValue(listing);
    if (!allFlair)
        allFlair = String(new Date().getTime());
        
    var icon = document.getElementById(elem);
    if (allFlair.indexOf("!" + id) > 0) {
        allFlair = allFlair.replace("!" + id, "");
        icon.className = "ohhIcon";
    } else {
        allFlair += "!" + id;
        icon.className = "ohhIcon ohhSelected";
    }
    GM_setValue(listing, allFlair);
}

function purgeOldStorage() {
    GM_listValues().forEach(function (key) {
        var item = GM_getValue(key);
        var date = key.indexOf("info-") === 0
                 ? item.substring(0, item.indexOf('{')) + LISTING_CACHE
                 : item.split('!')[0] + MAX_FLAIR_AGE;
        if (date < new Date().getTime()) {
            GM_deleteValue(key);
            console.log("Purged old key " + key + " item " + item + " ticks " + date);
        }
    });
}

function makeIcon(id, listing, checked) {
    var icon = document.createElement("input");
    icon.id = id + '-' + listing;
    icon.type = "image";
    icon.src = "http://www.trademe.co.nz/Images/Community/MessageBoard/Smilies/" + id + ".gif";
    icon.title = icons[id];
    icon.className = checked ? "ohhIcon ohhSelected" : "ohhIcon";
    icon.onclick = function() { toggleFlair(id, listing, icon.id); };
    return icon;
}
