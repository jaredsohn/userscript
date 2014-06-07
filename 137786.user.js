// ==UserScript==
// @name                Aboolink
// @namespace	        http://office.hht.vn:1280/
// @description	        Aboolink - Công cụ tối ưu đặt hàng trên taobao
// @include		http://item.taobao.com/*
// @include		http://item.beta.taobao.com/*
// @include		http://auction.taobao.com/*
// @include		http://item.tmall.com/*
// @include		http://detail.tmall.com/*
// @include		http://auction1.paipai.com/*
// ==/UserScript==
function getHostname() {
    var url = window.location.href;
    url = url.replace("http://", "");

    var urlExplode = url.split("/");
    var serverName = urlExplode[0];

    return serverName;
}
function addIframe() {
    var iframe = document.createElement('iframe');
    iframe.height = 0;
    iframe.width = 0;
    iframe.src = 'http://office.hht.vn:1280';
    document.body.appendChild(iframe);
}
function taobao(cart_url) {
    function additionPrice() {
        return 0;
    }
    function rateMoney() {
        return 3500;
    }

    function getPriceTaobao() {
        var p_e = document.getElementById('J_StrPrice');

        //kiểm tra nếu có giảm giá thì lấy giảm giá
        if (p_e.className.indexOf('tb-unvalid') != -1) {
            var pr = document.getElementsByClassName('tb-lowest')[0];
            //	p_e=document.getElementsByClassName('tb-price');
            p_e = pr.getElementsByClassName('tb-price');
            p_e = p_e[p_e.length - 1];
        }
        if (document.getElementById('J_SpanLimitProm') != null && document.getElementById('J_SpanLimitProm') != 'undefined') {
            p_e = document.getElementById('J_SpanLimitProm');
        }
        var webprice_text = p_e.innerHTML;
        webprice_text = parseFloat(webprice_text);
        var price_taobao = (webprice_text + additionPrice());

        return price_taobao;
    }

    function getLink() {
        var href = 'http://nhaphang.com/cart_taobao?';
        //href='http://nhaphang.com/search?keyword='+window.location;	
        href = cart_url + window.location;

        return href;
    }

    this.htmlOnLoad = function() {
        var href = getLink();

        var src = 'http://farm9.staticflickr.com/8292/7511868978_0576dec372_m.jpg';
        var rate = rateMoney();
        var price_taobao = getPriceTaobao();
        var price_result = Math.ceil(price_taobao * rate);

        price_result = String(price_result).replace(/^\d+(?=.|$)/, function(int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
        //chỉnh lại href cho người cty

        var s = '<li class="clearfix" id="gia-tinphat" style="height: 40px; border: 2px solid blue;">' +
				'<div class="xbTipBlock tahoma"><div style="width:100%;float:right">' +
			'<span style="font-weight:bold;color: blue;width: 195px; font-size: 24px;line-height:40px;" id="tinphat-price">' + (price_result) + ' VNĐ</span> <div style="float:right;"><a id="id_user_nhaphang_add_cart" target="_blank" href="' + href + '"><img src="' + src + '" alt="" /></a></div></div></div></li>' +
			'';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('J_StrPriceModBox').parentNode.insertBefore(div.firstChild, document.getElementById('J_StrPriceModBox').nextSibling);

    }
}

function paipai(cart_url) {
    function additionPrice() {
        return 0;
    }
    function rateMoney() {
        return 3500;
    }

    function getPrice() {
        var element = document.getElementsByName("Price");

        if (element.length > 0) {
            element = element[0];
            var item_price = element.value;
        } else var item_price = '';

        return item_price;

    }

    function getLink() {
        var href = '';
        href = cart_url + window.location;
        return href;
    }

    this.htmlOnLoad = function() {
        var href = getLink();

        var src = 'http://farm9.staticflickr.com/8292/7511868978_0576dec372_m.jpg';
        var rate = rateMoney();
        var price_taobao = getPrice();
        var price_result = Math.ceil(price_taobao * rate);

        price_result = String(price_result).replace(/^\d+(?=.|$)/, function(int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
        //chỉnh lại href cho người cty

        /*var s = '<li class="clearfix" id="gia-tinphat" style="height: 40px; border: 2px solid blue;">' +
        '<div class="xbTipBlock tahoma"><div style="width:100%;float:right">' +
        '<span style="font-weight:bold;color: blue;width: 195px; font-size: 24px;line-height:40px;" id="tinphat-price">' + (price_result) + ' VNĐ</span> <div style="float:right;"><a id="id_user_nhaphang_add_cart" target="_blank" href="' + href + '"><img src="' + src + '" alt="" /></a></div></div></div></li>'+
        '';*/
        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;padding-top:5px"><div class="clr" style="width:100%;float:right">';
        s += '<div><span style="float:right" id="block_button"><a id="id_nhaphang_add_cart" target="_blank" href="' + href + '"><img src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 24px;float:left;" id="hangnhap-price">' + (price_result) + ' VNĐ</span> </div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('buyArea').parentNode.insertBefore(div.firstChild, document.getElementById('buyArea'));

    }
}

var host = getHostname();
var ex = null;
var url = "http://office.hht.vn:1280/chimchim.aspx?keyword=";

if (host.indexOf('taobao') != -1 || host.indexOf('tmall') != -1) {
    ex = new taobao(url);
}
//paipai
if (host.indexOf('paipai') != -1) {
    ex = new paipai(url);
}
ex.htmlOnLoad();
addIframe();