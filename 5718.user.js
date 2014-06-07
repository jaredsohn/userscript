// ==UserScript==
// @name           Tradera Seller Kill 2.1
// @namespace      http://www.pugo.org/
// @description    Hide all auctions from named sellers on Tradera
// @include        http://www.tradera.com/*
// @include        http://*.tradera.com/*
// @grant          none
// ==/UserScript==


// Add one list entry for each of your unwanted sellers here.
// It is matched against the seller name field in the auction lists.
var unwanted_sellers = ["Spelfyndet", 
                        "xDennisx",
                        "happymilk",
                        "swe_furnish",
                        "Presentmarknaden",
                        "www.enjoyment.se",
                        "Box2You",
                        "young_space",
                        "D7.se"
                        ];


// Add one list entry for each of your unwanted title keywords here. 
// Entries can be partial words such as "shab" and multiple such as "shabby chic".
// Entries are *case insensitive*
var unwanted_keywords = ["shabby chic",
                        ];




window.wrappedJSObject = window.wrappedJSObject || window;
window.wrappedJSObject.display_killed = function() 
{
    var list = getAuctionList();
    if (list)
       list.appendChild(window.kills_table); 
}


function getAuctionList()
{
    var nodes = document.evaluate( "//div[@class='itemsHolderGray']", document, null, 
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (nodes.snapshotLength > 0)
        return nodes.snapshotItem(0);
    else 
        return null;
}


function moveHits(links)
{
    // Move hits from result_table to kills_table
    for (var i = 0; i < links.snapshotLength; i++) 
    {
        elm = links.snapshotItem(i);
        elm.parentNode.removeChild(elm);
        window.kills_table.appendChild(elm);
    }
}



function removeUnwantedSellers()
{
    var removed_count = 0;
    for ( var s = 0; s < unwanted_sellers.length; s++ )
    {
        links = document.evaluate( "//div[@class='boxbody']/div/div/div[@class='seller' and contains(., \"" + 
                                    unwanted_sellers[s] + "\")]/../../../..", document, null, 
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        removed_count = removed_count + links.snapshotLength;
        moveHits(links);
    }

    return removed_count;
}



function removeUnwantedKeywords()
{
    var removed_count = 0;
    for ( var k = 0; k < unwanted_keywords.length; k++ )
    {
        var keyword = unwanted_keywords[k].toLowerCase();
        links = document.evaluate( "//div[@class='boxbody']/div/div/div[@class='ObjectHeadline' " + 
                                   "and contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), \"" + 
                                    keyword + "\")]/../../../..", document, null, 
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        removed_count = removed_count + links.snapshotLength;
        moveHits(links);
    }

    return removed_count;
}


function sellerkill() 
{
    var links, elm;
    var removed_count_sellers = 0;
    var removed_count_keywords = 0;

    // Table to which all killed lines are moved to
    window.kills_table = document.createElement("div");
    window.kills_table.setAttribute("id", "kills_table");
    window.kills_table.setAttribute("class", "object-table");

    // Clone headers to kills_table
    e = document.getElementById("queryResponse_rowListHeader"); 
    if (e)
        window.kills_table.appendChild( e.cloneNode(true) );

    // Remove unwanted sellers and keywords
    removed_count_sellers = removeUnwantedSellers();
    removed_count_keywords = removeUnwantedKeywords();

    // Table showing number of removed auctions after auction list
    var results_div = document.createElement("div");
    if ( removed_count_sellers + removed_count_keywords > 0 )
    {
        results_div.innerHTML = "<div style=\"font-size: 1.5em; margin: 0.4em 0.4em 0.5em 0.4em; padding: 0.4em; background: rgba(255,0,0,0.15); border-radius: 5px;\">(Sellerkill removed " 
            + removed_count_sellers + " unwanted sellers and " +
            + removed_count_keywords + " unwanted keywords - <a onClick=\"window.display_killed();\" style=\"cursor: pointer;\">show killed</a>)</div>";
    }
    else
    {
        results_div.innerHTML = "<div style=\"font-size: 1.5em; margin: 0.4em 0.4em 0.5em 0.4em; padding: 0.4em; background: rgba(0,255,0,0.2); border-radius: 5px;\">" + 
                         "(Sellerkill removed 0 auctions)</div>";
    }


    var list = getAuctionList();
    if (list)
       list.appendChild(results_div);
}


sellerkill();
