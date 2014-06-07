// ==UserScript==
// @name           DPS Directives
// @namespace      Dildo Savagae
// @description    DPS Directives
// @version        0.01
// @include        http://ww*.erepublik.com/*
// @exclude        http://ww*.erepublik.com/*/*
// ==/UserScript==

//Uses GDocs as a backup if the forum is down
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://docs.google.com/View?id=ddwt684h_21gvxfj2gf',

    onload:function(response){
        output_orders(generate_order_string(response.responseText, "//div[@id='doc-contents']"));
    }       
});

function generate_order_string(responseText, path_to_target)
{
    //Take the responseText and return the orders string using XPath.
    //Returns a string and assumes the XPath is unique (returns only text from
    //first found element)
    
    var doc = document.createElement('div');
    doc.innerHTML = responseText;
    var results = document.evaluate(path_to_target, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    order_string = results.snapshotItem(0).textContent.match('.*?#')[0];
    //Trim it by a character to remove the hash and return it
    return order_string.substring(0, order_string.length - 1);
}

function output_orders(order_string)
{
    //Takes a string, splits it, and adds it to the eRep page

    var tags = order_string.split('|');
    var img = tags[0];
    var orders = tags[1];
    var region = tags[2];
    var link = tags[3];
    var update = tags[4];
    
    latest = document.getElementById('latestnews');

    var orders_box = document.createElement("div");
    orders_box.innerHTML = '<img align="left" src="' + img + '">' + '</img>' + 
                           '<h2 align="left">' + '&#8194;' + '&#8201;' + orders + '</h2>' +
                           '<h2 align="left">' + '&#8194;' + '&#8201;' + '<a href="' + link + '">' + region + '</a>' + '</h2>' + 
                           '<font align="left" color="#9F9F9F">' + '&#8194;' + '&#8201;' + update + '</font>';

    //Insert elements on page
    if(order_string.length) {   //Only insert if string is uncommented
        latest.parentNode.insertBefore(orders_box, latest);
    }
}
