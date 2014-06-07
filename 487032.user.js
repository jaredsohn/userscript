// ==UserScript==
// @name           10bis Restaurant Filter
// @description    Filter restaurants you don't want to see on 10bis
// @version        0.1
// @include        http*//www.10bis.co.il/Restaurants/Search/*
// @copyright      Aviem Zur
// ==/UserScript==

//================================ Set the restaurants you don't want to see here ================================
var filter = new Array(
    "דים סאם", "קאן קאי"
);
//======================================================================================================

function filterRestaurants() {
    var restaurants = document.evaluate('//div[@class="ResName"]//h4/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)    
    
    for (var i = 0; i < restaurants.snapshotLength; i++) {
        var restaurant = restaurants.snapshotItem(i)
        for (var k = 0; k < filter.length; k++) {
             if (restaurant.text.toLowerCase().replace(/\s/g,"").replace(/\./g,"")
                .indexOf(filter[k].toLowerCase().replace(/\s/g,"").replace(/\./g,"")) 
                != -1) {
                var li = restaurant.parentNode.parentNode.parentNode
                li.parentNode.removeChild(li)
            }
        }
    }
}

var oldOnload = window.onload
window.onload = function() { filterRestaurants(); try { oldOnLoad.apply() } catch(e) {} }