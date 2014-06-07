// JingDong - Price History Image fix
// GNU General Public License
// Forked from http://userscripts.org/scripts/show/119957
// fixed by horan <horan.cc>

// ==UserScript==
// @name           JingDong - Price History Image fix
// @namespace      http://qixinglu.com
// @description    Insert a price history image from 360444.com to jd.com product page.
// @include        http://item.jd.com/*.html
// ==/UserScript==
//

// 获得价格历史页面链接
function get_history_url() {
    current_url = window.location.href;
    // 一般地址
    //jd new add: item(book/mvd/music/e).jd.com/[product_id].html
    // http://www.360444.com/product/数字.html
    if(current_url.indexOf(".jd.com/") != -1){
        product = current_url.substr(current_url.indexOf(".jd.com/") + 8);
        history_url = "http://www.360444.com/product/" + product;
        return history_url
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

