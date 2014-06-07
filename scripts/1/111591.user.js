// Newegg - Price History Image
// GNU General Public License

// ==UserScript==
// @name           Newegg - Price History Image
// @namespace      http://qixinglu.com
// @description    Insert a price history image from 360444.com to newegg.com.cn product page, based on JingDong - Price History Image.
// @include        http://www.newegg.com.cn/Product/*
// ==/UserScript==
//

// 获得价格历史页面链接
function get_history_url() {
    current_url = window.location.href;
    if (current_url.indexOf('http://www.newegg.com.cn/Product/') != -1) {
        current_url = current_url.replace('newegg.com.cn', '360444.com/egg');
        return current_url.replace('htm', 'html');
    }
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
    place_node = document.getElementById('proMainInfo');
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
