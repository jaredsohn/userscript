// ==UserScript==
// @name           Quanlala Price History Image
// @namespace      http://qixinglu.com
// @description    在京东/新蛋/亚马逊中国的产品页面，自动插入一张从 quanlala.com 里的价格历史波动图片。
// @include        http://mvd.360buy.com/*
// @include        http://book.360buy.com/*
// @include        http://www.360buy.com/product/*
// @include        http://www.newegg.com.cn/product/*
// @include        http://www.newegg.com.cn/Product/*
// @include        http://www.amazon.cn/gp/product/*
// @include        http://www.amazon.cn/*/dp/*
// @include        http://www.amazon.cn/mn/detailApp*
// ==/UserScript==

// 使用域名
USE_DOMAIN = 'www.quanlala.com';
//USE_DOMAIN = 'www.360444.com';
//USE_DOMAIN = 'www.360buybuy.com';

// 获得价格历史图片
function create_history_image_node(prefix, response) {
    var reg, image_url, image_full_url, image_node;
    if (prefix === '') {
        reg = new RegExp("/ZedGraphImages/[^\"]+");
    } else {
        reg = new RegExp("/" + prefix + "/ZedGraphImages/[^\"]+");
    }
    image_url = response.responseText.match(reg);
    if (image_url === null) {
        image_node = document.createElement('p');
        image_node.innerHTML = '这个产品貌似没有历史价格数据，<a href="' + response.finalUrl + '">查看链接</a>。';
    } else {
        image_full_url = "http://" + USE_DOMAIN + image_url;
        img_node = document.createElement('img');
        img_node.style.marginTop = "10px";
        img_node.style.marginBottom = "10px";
        img_node.src = image_full_url;
        // 加上链接
        image_node = document.createElement('a');
        image_node.href = response.finalUrl;
        image_node.appendChild(img_node);
    }
    return image_node;
}

function create_product_history_url(prefix, product_uid) {
    if (prefix === '') {
        return "http://" + USE_DOMAIN + "/product/" + product_uid + ".html";
    } else {
        return "http://" + USE_DOMAIN + "/" + prefix + "/product/" + product_uid + ".html";
    }
}

url = window.location.href;

/* 网店处理规则 */
sites = [{
    domain : '360buy.com',
    get_history_url: function() {
        var reg, product_uid, history_url;
        if (url.indexOf('http://www.360buy.com/product/') != -1) {
            reg = new RegExp("http://www.360buy.com/product/\(\\d+\).html");
        } else {
            reg = new RegExp("http://.+\.360buy\.com/\(\\d+\).html");
        }
        product_uid = url.match(reg)[1];
        history_url = create_product_history_url('', product_uid);
        return history_url;
    },
    request_callback: function(response) {
        var image_node, place_node;
        image_node = create_history_image_node('', response);
        place_node = document.getElementById('choose');
        place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
    }
}, {
    domain : 'newegg.com',
    get_history_url: function() {
        var reg, product_uid, history_url;
        reg = new RegExp("http://www.newegg.com.cn/[Pp]roduct/\([^.]+\).htm");
        product_uid = url.match(reg)[1];
        history_url = create_product_history_url('egg', product_uid);
        return history_url;
    },
    request_callback: function(response) {
        var image_node, place_node;
        image_node = create_history_image_node('egg', response);
        place_node = document.getElementsByClassName('mainInfoArea')[0];
        place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
    }
}, {
    domain : 'amazon.cn',
    get_history_url: function() {
        var reg, product_uid, history_url;
        if (url.indexOf('/gp/product/') != -1) {
            reg = new RegExp("http://www.amazon.cn/gp/product/\([^/]+\)/\?");
        } else if (url.indexOf('/dp/') != -1) {
            reg = new RegExp("http://www.amazon.cn/[^/]+/dp/\([^/]+\)/\?");
        } else {
            reg = new RegExp("http://www.amazon.cn/mn/detailApp.*asin=\(\\w+\)");
        }
        product_uid = url.match(reg)[1];
        history_url = create_product_history_url('am', product_uid);
        return history_url;
    },
    request_callback: function(response) {
        var image_node, place_node;
        image_node = create_history_image_node('am', response);
        place_node = document.getElementById('handleBuy');
        place_node.parentNode.insertBefore(image_node, place_node.nextElementSibling);
    }
}];

/* 开始处理 */
var i, site;
for (i = 0; i < sites.length; i += 1) {
    if (url.indexOf(sites[i].domain) != -1) {
        site = sites[i];
        break;
    }
}

GM_xmlhttpRequest({
    method: "GET",
    url: site.get_history_url(),
    onload: site.request_callback
});
