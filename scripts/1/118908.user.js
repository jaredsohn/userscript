// ==UserScript==
// @name           360444 - Price History Image
// @namespace      http://qixinglu.com 
// @description    Insert a price history image from 360444.com to 360buy.com/newegg.com.cn/amazon.cn product page.
// @include        http://book.360buy.com/*
// @include        http://mvd.360buy.com/*
// @include        http://www.360buy.com/product/*
// @include        http://www.newegg.com.cn/product/*
// @include        http://www.newegg.com.cn/Product/*
// @include        http://www.amazon.cn/gp/product/*
// ==/UserScript==
//

/* 共用函数 */

// 获得当前地址，去除参数
function get_current_url() {
    reg = new RegExp("\\?.*");
    return window.location.href.replace(reg, '')
}

// 插入价格历史图片到产品页面
function create_history_image_node(imgage_url) {
    image_node = document.createElement('img');
    image_node.id = 'history_image';
    image_node.src = imgage_url;
    return image_node;
}

/* 京东 */

function jingdong_get_history_url() {
    current_url = get_current_url();
    
    // 一般地址
    if (current_url.indexOf('http://www.360buy.com/product/') != -1) {
        return current_url.replace('360buy', '360444');
    }

    // 其它地址 http://*.360buy.com/数字.html
    reg = new RegExp("http://.+\.360buy\.com/\(\\d+\).html");
    matches = current_url.match(reg);
    if (matches == null) {
        return null;
    }
    product_uid = matches[1];
    history_url = "http://www.360444.com/product/" + product_uid + ".html";
    return history_url;
}

function jingdong_get_history_image_url(text) {
    reg = new RegExp("/ZedGraphImages/[^\"]+");
    imgage_url = "http://www.360444.com" + text.match(reg);
    return imgage_url;
}

function jingdong_insert_history_image(image_node) {
    image_node.style.marginBottom = "20px";
    place_node = document.getElementById('carriage');
    place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
}

function jingdong_request_callback(response) {
    image_url = jingdong_get_history_image_url(response.responseText);
    imamge_node = create_history_image_node(image_url);
    jingdong_insert_history_image(image_node);
}

/* 新蛋 */

function newegg_get_history_url() {
    current_url = get_current_url();
    return current_url.replace('www.newegg.com.cn', 'www.360444.com/egg');
}

function newegg_get_history_image_url(text) {
    reg = new RegExp("/egg/ZedGraphImages/[^\"]+");
    imgage_url = "http://www.360444.com" + text.match(reg);
    return imgage_url;
}

function newegg_insert_history_image(image_node) {
    place_node = document.getElementById('proMainInfo');
    place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
}

function newegg_request_callback(response) {
    image_url = newegg_get_history_image_url(response.responseText);
    imamge_node = create_history_image_node(image_url);
    newegg_insert_history_image(image_node);
}

/* 亚马逊中国 */

function amazoncn_get_history_url() {
    current_url = get_current_url();
    return current_url.replace('www.amazon.cn/gp', 'www.360444.com/am') + '.htm';
}

function amazoncn_get_history_image_url(text) {
    reg = new RegExp("/am/ZedGraphImages/[^\"]+");
    imgage_url = "http://www.360444.com" + text.match(reg);
    return imgage_url;
}

function amazoncn_insert_history_image(image_node) {
    image_node.style.marginBottom = "10px";
    place_node = document.getElementById('handleBuy');
    place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
}

function amazoncn_request_callback(response) {
    image_url = amazoncn_get_history_image_url(response.responseText);
    imamge_node = create_history_image_node(image_url);
    amazoncn_insert_history_image(image_node);
}

/* 开始处理 */
current_url = window.location.href;

if (current_url.indexOf('360buy.com') != -1) {
    history_url = jingdong_get_history_url();
    request_callback = jingdong_request_callback;
} else if (current_url.indexOf('newegg.com') != -1) {
    history_url = newegg_get_history_url();
    request_callback = newegg_request_callback;
} else if (current_url.indexOf('amazon.cn') != -1) {
    history_url = amazoncn_get_history_url();
    request_callback = amazoncn_request_callback;
} else {
    history_url = null;
}

if (history_url != null) {
    GM_xmlhttpRequest({
        method: "GET",
        url: history_url,
        onload: request_callback
    });
}