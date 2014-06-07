// ==UserScript==
// @name          Farnell BoxTicker
// @namespace     chriscrossx.blogspot.com
// @description   Automatically select In Stock, Exclude Extended Stock and RoHS
// @version       1.1
// @include       http://*.farnell.com/*
// @include       https://*.farnell.com/*
// @icon          http://uk.farnell.com/images/farnell_icon.ico
// ==/UserScript==


// Force all three tick boxes to ticked on page load.
var boxes = document.evaluate("//input[@name='/pf/search/SearchFiltersFormHandler.onlyRoHSProducts' or @name='/pf/search/SearchFiltersFormHandler.onlyInStockProducts' or @name='/pf/search/SearchFiltersFormHandler.excludeExtendedProductsRange']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i = 0; i < boxes.snapshotLength; i++)
{
    boxes.snapshotItem(i).checked = true;
}

// Set up an event handler for CTRL+E to invert the selection of all three boxes
document.addEventListener('keyup', function(key){
    if(key.ctrlKey && key.keyCode == 69)
    {
        var boxes_id = new Array('static551', 'static401', 'static601');
        var boxes_fname = new Array('/pf/search/SearchFiltersFormHandler.onlyRoHSProducts', '/pf/search/SearchFiltersFormHandler.onlyInStockProducts', '/pf/search/SearchFiltersFormHandler.excludeExtendedProductsRange');

        for(var i = 0; i < boxes_id.length; i++)
        {
            if(document.getElementById(boxes_id[i]))
            {
                location.assign("javascript:parametrics_clickAction(document.getElementById('"+boxes_id[i]+"'), !document.getElementById('"+boxes_id[i]+"').checked)");
            }
        }
    }
}, false);

