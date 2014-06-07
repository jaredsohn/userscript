    // ==UserScript==
    // @name           Enhanced Steam
    // @version        0.7
    // @author         <jshackles@steampowered.com>
    // @description    Enhance the Steam experience
    // @include        http*://store.steampowered.com/*
    // @include        http://steamcommunity.com/id/*
    // @include        http://steamcommunity.com/profiles/*
    // @namespace      http://store.steampowered.com/
    // @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
    // ==/UserScript==
    (function () {
            function setValue(key, value) {
                    sessionStorage.setItem(key, JSON.stringify(value));
            }
     
            function getValue(key) {
                    var v = sessionStorage.getItem(key);
                    if (v === undefined) return v;
                    return JSON.parse(v);
            }
     
            var config = {
                    userid: '',
                    bgcolor: '#5C7836'
            };
     
            function modify_cookie(diff) {
                    var dt = new Date();
                    dt.setDate(dt.getDate() + diff);
                    var cookies = document.cookie.split('; ');
                    for (var i = 0; i < cookies.length; ++i) {
                            var pair = cookies[i].split('=');
                            switch (pair[0]) {
                            case 'steamLogin':
                            case 'birthtime':
                                    document.cookie = cookies[i] + '; expires=' + dt.toUTCString() + '; path=/';
                            }
                    }
            }
     
            modify_cookie(+30);
     
            function logined() {
                    return document.getElementById('account_pulldown') !== null;
            }
            console.log(logined());
            if (!logined()) return;
     
            function startWith(str, prefix) {
                    return str.lastIndexOf(prefix, 0) === 0;
            }
     
            function trim(t) {
                    return t.replace(/^\s+/, '').replace(/\s+$/, '');
            }
     
            function makelink(url, txt) {
                    var newNode = document.createElement('a');
                    newNode.href = url;
                    newNode.target = '_blank';
                    newNode.innerHTML = txt;
                    return newNode;
            }
     
            function xpath_each(xpath, callback) {
                    var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    var node;
                    for (var i = 0; i < res.snapshotLength; ++i) {
                            node = res.snapshotItem(i);
                            callback(node);
                    }
            }
     
            function getelem(node, tag, className) {
                    var ary = node.getElementsByTagName(tag);
                    for (var i = 0, length = ary.length; i < length; i++) {
                            var e = ary[i];
                            if (e.className == className) return e;
                    }
                    return null;
            }
     
            function get_http(url, callback) {
                    var http = new XMLHttpRequest();
                    http.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                    callback(this.responseText);
                            }
                    }
                    http.open('GET', url, true);
                    http.send(null);
            }
           
            function get_divContents(selector) {
                    var nodeList = document.querySelectorAll(selector);
                    for (var i = 0, length = nodeList.length; i < length; i++) {
                            return nodeList[i].innerHTML;
                    }
            }
     
            function get_appinfo(appid) {}
     
            function change() {
                    console.log('change');
                    var bgcolor = config.bgcolor;
                    var owned;
     
                    function get_appid(t) {
                            if (t && t.match(/^http:\/\/store\.steampowered\.com\/app\/(\d+)\//)) return RegExp.$1;
                            else return null;
                    }
     
                    function add_info2(node, has_app, has_lang) {
                            if (has_app) {
                                    node.style.backgroundColor = config.bgcolor;
                                    owned = true;
                            }
                    }
     
                    function add_info(node, appid) {
                            var v = getValue(appid);
                            if (v) {
                                    add_info2(node, v[0], v[1]);
                                    return;
                            }
                            console.log("get:" + appid);
                            get_http('/app/' + appid + '/', function (txt) {
                                    var has_app = txt.search(/<div class="game_area_already_owned">/) > 0;
                                    setValue(appid, [has_app]);
                                    add_info2(node, has_app);
                                    console.log(has_app);
                                    return has_app;
                            });
                    }
                   
                    function update_discount() {
                            xpath_each("//div[@class='package_totals_row']", function (node) {
                                    $('.savings').replaceWith(message);
                            });
                            console.log('updating total');
                    }
                   
                    //sale or sub
                    var not_have = 0;
                    var sub = startWith(location.pathname, '/sub/');
                    var checked = false;
                    var price = 0;
                    xpath_each("//div[contains(@class,'tab_row') or contains(@class,'sale_page_purchase_item')]", function (node) {
                            if (node.checked) return;
                            node.checked = checked = true;
                            owned = false;
                            var itemPrice;
                            if (sub) {
                                    var e = getelem(node, 'div', 'tab_price').lastChild;
                                    var m = e.nodeValue.match(/[0-9\.]+/);
                                    itemPrice = m ? parseFloat(m[0]) : 0;
                            }
     
                            var ret = node.getElementsByTagName('a');
                            var appid;
                            if (appid = get_appid(ret[0].href)) {
                                    add_info(node, appid);
                                    if (owned == false) {
                                            price = price + itemPrice;
                                    }      
                            }
     
                    });
                   
                    // calculates the savings of a pack or bundle and your savings based on games owned.
                    if (sub && checked) {
                            var bundle_price = get_divContents('.discount_final_price');
                            console.log(bundle_price);
                            if (bundle_price === undefined) { bundle_price = get_divContents('.game_purchase_price'); }
                            var bundle_price2 = Number(bundle_price.replace(/[^0-9\.]+/g,""));
                            //$('.package_totals_row .price').replaceWith('<div class="price">' + price + '</div>');
                            price = price - bundle_price2;
                            var message;
                            if (price > 0) {
                                    message = '<div class="savings">$' + price.toFixed(2) + '</div>';
                            }
                            else {
                                    message = '<div class="savings"><font color=red>$' + price.toFixed(2) + '</font></div>';
                            }
                           
                            update_discount();
                    }
                   
                    // DLC on App Page
                    xpath_each("//a[contains(@class,'game_area_dlc_row')]", function (node) {
                            var appid;
                            if (appid = get_appid(node.href)) {
                                    add_info(node, appid);
                            }
                    });            
     
                    // search result
                    xpath_each("//a[contains(@class,'search_result_row')]", function (node) {
                            var appid;
                            if (appid = get_appid(node.href)) {
                                    add_info(node, appid);
                            }
                    });
            }
            change();
     
    })();
     
    // fixes "Image not found" in wishlist
    var items = document.getElementById("wishlist_items");
    if (items) {
            imgs = items.getElementsByTagName("img");
            for (var i = 0; i < imgs.length; i++)
            if (imgs[i].src == "http://media.steampowered.com/steamcommunity/public/images/avatars/33/338200c5d6c4d9bdcf6632642a2aeb591fb8a5c2.gif") {
                    var gameurl = imgs[i].parentNode.href;
                    imgs[i].src = "http://cdn.steampowered.com/v/gfx/apps/" + gameurl.substring(gameurl.lastIndexOf("/") + 1) + "/header.jpg";
            }
    }
     
    // removes "onclick" events which Steam uses to add javascript to it's search functions
    var allElements, thisElement;
    allElements = document.evaluate("//a[contains(@onclick, 'SearchLinkClick( this ); return false;')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
            thisElement = allElements.snapshotItem(i);
            if (thisElement.nodeName.toUpperCase() == 'A') {
                    thisElement.removeAttribute('onclick');
            }
    }
     
    // adds a "total spent on Steam" to the account details page
    if ($('.transactionRowPrice').length != 0) {
            totaler = function (e, i) {
                    var regex = /(\d+\.\d\d+)/;
                    price = regex.exec($(e).html());
                    if (price != null) {
                            return parseFloat(price);
                    }
            };
            prices = jQuery.map($('.transactionRowPrice'), totaler);
            var total = 0.0;
            jQuery.map(prices, function (e, i) {
                    total += e
            });
            total = total.toFixed(2);
            $('.accountInfoBlock .block_content_inner .accountBalance').after('<div class="accountRow accountBalance accountSpent"></div>');
            $('.accountSpent').append('<div class="accountData price">$' + total + '</div>');
            $('.accountSpent').append('<div class="accountLabel" style="color: #C00; font-weight: bold; font-size: 100%">Total Spent:</div>');
    }
