// JingDong - Price History Image
// GNU General Public License
// Forked from http://userscripts.org/scripts/show/115573
// Modified by ninehills <ninehills.github.com>

// ==UserScript==
// @name           JingDong - Price History Image
// @namespace      http://qixinglu.com
// @description    Insert a price history image from 360444.com to 360buy.com product page.
// @include        http://book.360buy.com/*.html
// @include        http://mvd.360buy.com/*.html
// @include        http://www.360buy.com/product/*.html
// ==/UserScript==
//

// 获得价格历史页面链接
function get_history_url() {
    current_url = window.location.href;
    // 一般地址
    // http://www.360444.com/product/数字.html
    if (current_url.indexOf('http://www.360buy.com/product/') != -1) {
        return current_url.replace('360buy', '360444');
    }

    // 其它地址
    // http://*.360buy.com/数字.html
    reg = new RegExp("http://.+\.360buy\.com/\(\\d+\).html");
    matches = current_url.match(reg);
    if (matches == null) {
        return null;
    }
    product_uid = matches[1];
    history_url = "http://www.360444.com/product/" + product_uid + ".html";
    return history_url;
}

// 获得价格历史图片链接
function get_history_image_url(text) {
    reg = new RegExp("/ZedGraphImages/[^\"]+");
    imgage_url = "http://www.360444.com" + text.match(reg);
    return imgage_url;
}

// 插入价格历史图片到产品页面
function insert_history_image(imgage_url) {
    image_node = document.createElement('img');
    image_node.id = 'history_image';
    image_node.src = imgage_url;
    image_node.style.marginBottom = "30px";
    place_node = document.getElementById('choose');
    place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
}

// ajax请求回调
function request_callback(response) {
    image_url = get_history_image_url(response.responseText);
    insert_history_image(image_url);
}

history_url = get_history_url();
if (history_url != null) {
    GM_xmlhttpRequest({
        method: "GET",
        url: history_url,
        onload: request_callback
    });
}

