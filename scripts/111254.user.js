// ==UserScript==
// @name           calendar fix
// @namespace      tl
// @include        h__p://www.teamliquid.net/*
// ==/UserScript==
//
//

// show all and hide the toggle
var toggle = document.getElementById( "span_more_events" );
toggle.style.display = "block";
toggle = document.getElementById( "link_show_more_events" );
toggle.style.display = "none";

// 'less' events
var node;
var par;
var parentXPath;
var nodeXPath;
for( i = 1; i <= 5; i++ ) {
    nodeXPath = "/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]/table/tbody/tr[" + i + "]/td[2]/a";
    node = findXPathNode( nodeXPath );
    if( !isSCBW( node ) ){
        parentXPath = "/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]/table/tbody/tr[" + i + "]";
        par = findXPathNode( parentXPath );
        par.style.display = "none";        
    }
}
// 'more' events
for( i = 1; i <= 15; i++ ){
    nodeXPath = "/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]/div[2]/table/tbody/tr[" + i + "]/td[2]/a";
    node = findXPathNode( nodeXPath );
    if( !isSCBW( node ) ){
        parentXPath = "/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]/div[2]/table/tbody/tr[" + i + "]";
        par = findXPathNode( parentXPath );
        par.style.display = "none";
    }
}

function isSCBW( node )
{
    var tags = new Array( "[OSL] ", "[MSL] ", "[SPL] ", "[STX] ", "[GC] ","[GSL] ","[GSTL] " ); // GC = Gambit Cup
    var str = node.innerHTML;
    for (var i in tags) {
        if (str.indexOf(tags[i]) != -1) {
            return true;
        }
    }
    return false;
}

function findXPathNode(xpath, start,doc)
{
    var result = (doc == null ? document : doc).evaluate(xpath,(start == null ? document : start), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
    return (result.snapshotLength > 0 ? result.snapshotItem(0) : null);
}