// ==UserScript==
// @name           eUS Battle Orders (eRep)
// @namespace      http://www.erepublik.com/en/referrer/Publius
// @description    eUS Battle Orders (eRep)
// @version        0.25
// @include        http://ww*.erepublik.com/*
// @exclude        http://ww*.erepublik.com/*/*
// ==/UserScript==

//Uses GDocs as a backup if the forum is down
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://docs.google.com/View?id=dcn9r23m_7g3gv9qft',

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
    var orders = tags[0];
    var region = tags[1];
    var link = tags[2];
    var date_issued = tags[3];

    latest = document.getElementById('latestnews');

    var orders_box = document.createElement("div");
    orders_box.innerHTML = '<h3>' + orders + ' ' + region + '</h3>' +
                           '<h3>Last Updated: ' + date_issued + '</h3>' + 
                           '<a href="' + link + '">' + link + '</a>';

    //Insert elements on page
    if(order_string.length) {   //Only insert if string is uncommented
        latest.parentNode.insertBefore(orders_box, latest);
    }
}
