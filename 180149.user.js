// ==UserScript==
// @name        Add mp3 amz links
// @description Adds .amz download links to item pages, "order details" pages, and the "Your Orders" page
// @namespace   http://unpy.net/userscripts/
// @include     https://www.amazon.com/gp/css/order-history/*
// @include     https://www.amazon.com/gp/digital/your-account/order-summary.html?*
// @include     https://www.amazon.com/gp/digital/your-account/order-summary.html/*
// @include     https://www.amazon.com/gp/product/*
// @include     http://www.amazon.com/gp/product/*
// @version     2
// ==/UserScript==

// true when s is an absolute xpath expression
var isabs = function(s) { return s && s[0] == "/"; };

// for one set of xpaths and massage-functions, create amz links
var do_link = function (target_xpath, asin_xpath, asin_fun, order_xpath, order_fun, link_xpath, append, extra) {
    var downloads = document.evaluate(target_xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i=0; i<downloads.snapshotLength; i++)
    {
    try {
        var download = downloads.snapshotItem(i);

        // Item is the direct parent of the download node
        var item = download.parentNode;
        // and inside it is a link to the item
        var asin_el = document.evaluate(asin_xpath, isabs(asin_xpath) ? document : download, null, XPathResult.STRING_TYPE, null).stringValue;
        if (!asin_el) { console.log("!asin_xpath"); continue }
        var asin = asin_fun(asin_el);

        // and the order number is found via this xpath
        var order_el = document.evaluate(order_xpath, isabs(asin_xpath) ? document : download, null, XPathResult.STRING_TYPE, null).stringValue;
        if (!order_el) { console.log("!order_xpath"); continue }
        var order = order_fun(order_el);

        // now that we have the order, we can construct the amz download link
        var amz_url = "http://www.amazon.com/gp/dmusic/media/cirrus_amz_retriever.html/ref=dm_typ_ffcd_amz_nojs?orderId=" + order + "&asins=" + asin;

        document.download = download;
        document.amz_url = amz_url;

        // and inject it
        link = document.createElement('a');
        link.href = amz_url;
        link.className = 'gm-amz'; // maybe you want to key off this for something else
        if(link_xpath) container = document.evaluate(link_xpath, isabs(link_xpath) ? document : download, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        else container = download;
        if(!append) {
            link.textContent = container.textContent;
            container.innerHTML = '';
        } else {
            link.textContent = append;
            if(extra) container.innerHTML += extra;
        }
        container.appendChild(link);
    } catch(e) { console.log("error adding amz link"); console.log(e); }
    }
}


var asin_re = new RegExp("product/(B[^/]*)/");
var order_re = new RegExp("orderID=([^&]*)");
var is_digital_order_page = function() { return (/order-history/).exec(document.location) }
var is_order_summary_page = function() { return (/order-summary/).exec(document.location) }
var is_mp3_product_page = function() {
    var el = document.evaluate("//span[@class='byLinePipe']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!el) return false;
    return el.nextSibling.textContent == "MP3 Music";
}

// The Your Digital Orders page
if(is_digital_order_page())
    do_link("//div[normalize-space(text())='MP3 Download']", "..//a/@href",
        function(url) { return (asin_re.exec(url)[1]); },
        "../../../../../..//span[@class='info-data']/a/text()",
        function(s) { return s; },
        "..", "Download .amz")

// The product page
if(is_mp3_product_page())
    do_link("//span[@class='iou_cust']", "'x'",
        function(_) { return (asin_re.exec(document.location)[1]); },
        "../a/@href", function(s) { return order_re.exec(s)[1]; },
        "//span[@class='byLinePipe']/..", "Download .amz", " ")


// The order summary page
if(is_order_summary_page())
    do_link(
        "//a[starts-with(@href, 'http://www.amazon.com/gp/product/') and substring-after(@href, '/ref=') = 'docs-os-doi_0']",
        "./@href", function(s) { return asin_re.exec(s)[1]; },
        "'x'", function(_) { return (order_re.exec(document.location)[1]); },
        "../..", "Download .amz")
