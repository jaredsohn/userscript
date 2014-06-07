// ==UserScript==
// @name          App Store Price History
// @namespace     mybeky
// @author        mybeky
// @include       http://itunes.apple.com/*
// @description   Add price history table in App Store page
// @icon          http://cl.ly/FqTY/appshopper.png
// @version       0.1.1
// ==/UserScript==


(function () {
    var title = document.title;
    var app_name = document.getElementsByTagName('h1')[0].innerHTML;
    app_name = app_name.replace(' — ', ' - ').split(' - ')[0];
    app_name = app_name.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    app_name = app_name.replace(/&quot;/g, "\"").replace(/&#039;/g, "'").replace(/&nbsp;/g, " ");

    var platform = 'ios';
    if (title.indexOf('Mac App Store') == 0) {
        platform = 'mac';
    }
    var keywords = "intitle:\"" + app_name + "\" ";
    keywords += "site:appshopper.com ";
    keywords += "-site:appshopper.com/blog";
    var search_url = "https://www.google.com/search?filter=0&q=" + encodeURIComponent(keywords);
    var app_id = location.href.match(/id(\d+)/)[1];
    var app_url;

    var appshopper_urls;
    GM_xmlhttpRequest({
        method: "GET",
        url: search_url,
        onload: function(response) {
            appshopper_urls = response.responseText.match(/http:\/\/appshopper.com\/[^"]*/g);
            unsafeWindow.urls = appshopper_urls;
            get_app_info();
        }
    });

    function get_app_info() {
        if (appshopper_urls.length == 0) {
            return;
        }
        app_url = appshopper_urls.shift();
        if (platform == "mac" && app_url.indexOf('/mac/') == -1) {
            get_app_info();
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: app_url,
                onload: function(response) {
                    var responseHtml = response.responseText;
                    unsafeWindow.h = responseHtml;
                    var _app_id = responseHtml.match(/top200chart\.php\?id=(\d+)/)[1];
                    if (_app_id != app_id) {
                        get_app_info();
                    } else {
                        var price_table_html;
                        price_table_html = responseHtml.match(/<div class="sidebox statstop">[\s\S]*?(<table>[\s\S]*?<\/table>)/)[1];
                        price_table_html = price_table_html.replace(/ (\d+) '\d+<\/th>/g, '.$1</th>');
                        price_table_html = price_table_html.replace('New App: ', '');
                        price_table_html = price_table_html.replace(/Version /g, 'v')
                        price_table_html = price_table_html.replace(/<td>.*? -> /g, '<td>')
                        insert_table(price_table_html);
                    }
                }
            });
        }
    }

    function insert_table(price_table_html) {
        GM_addStyle('div#left-stack {width: 240px;}' +
                    'div#price-history {font-size: 90%; margin-bottom: 20px;}' + 
                    'div#price-history table {width: 180px;}' + 
                    'div#price-history table th {font-family: monospace; font-size: 90%; width: 40px;}' + 
                    'div#price-history table tr {font-weight: bold;}' + 
                    'div#price-history table tr.update td {background: url("http://appshopper.com/images/style/type-update.png") no-repeat scroll right center transparent}' + 
        'div#price-history table tr.priceincrease td {background: url("http://appshopper.com/images/style/type-priceincrease.png") no-repeat scroll right center transparent}' + 
        'div#price-history table tr.pricedrop td {background: url("http://appshopper.com/images/style/type-pricedrop.png") no-repeat scroll right center transparent}' + 
        'div#price-history table tr.new td {background: url("http://appshopper.com/images/style/type-new.png") no-repeat scroll right center transparent}')

        var left_stack = document.getElementById('left-stack');
        var desc_list = left_stack.getElementsByTagName('ul')[0];

        var price_div = document.createElement('div');
        price_div.id = "price-history";
        price_div.innerHTML = price_table_html + '<a style="float:right; margin-right: 10px;" target="_blank" href="' + app_url + '">via AppShopper</a>';
        desc_list.parentNode.insertBefore(price_div, desc_list);
    }
})();
