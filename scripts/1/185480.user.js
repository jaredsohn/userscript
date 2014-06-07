// ==UserScript==
// @name       购物比价客
// @namespace  http://userscripts.org/users/541262
// @version    0.11
// @downloadURL https://userscripts.org/scripts/source/185480.user.js
// @updateURL   https://userscripts.org/scripts/source/185480.meta.js
// @description  当您访问京东、亚马逊、易迅、苏宁易购、国美、一号店、新蛋、当当网等网站时，自动检索其他电商中该商品的价格，方便您选择最低价的电商网站进行购买。
// @match      http://item.jd.com/*.html*
// @match      http://www.amazon.cn/gp/product/*
// @match      http://www.amazon.cn/*/dp/*
// @match      http://www.amazon.cn/dp/*
// @match      http://item.yixun.com/*
// @match      http://product.suning.com/*.html*
// @match      http://www.suning.com/emall/prd*.html*
// @match      http://item.yhd.com/item/*
// @match      http://product.lefeng.com/product/*
// @match      http://product.dangdang.com/*.html*
// @match      http://mall.jumei.com/*/product*.html*
// @match      http://www.gome.com.cn/product/*.html*
// @match      http://www.newegg.cn/Product/*.htm*
// @match      http://item.vancl.com/*.html*
// @match      http://item.vjia.com/*.html*
// @match      http://www.wl.cn/*
// @match      http://detail.bookuu.com/*.html*
// @match      http://product.china-pub.com/*
// @copyright  2013+, zhoujc
// @grant      GM_log
// @grant      GM_xmlhttpRequest
// @require    http://code.jquery.com/jquery-latest.min.js
// @require    http://jquery-json.googlecode.com/svn/trunk/build/jquery.json.min.js
// @require    https://raw.github.com/webmademovies/dublincorevideo/master/js/libs/jquery.json/jquery.json.min.js
// ==/UserScript==

var uri = window.location.href;

var _$=['\x68\x74\x74\x70\x3a\x2f\x2f\x72\x75\x79\x69\x2e\x74\x61\x6f\x62\x61\x6f\x2e\x63\x6f\x6d\x2f\x65\x78\x74\x2f\x70\x72\x6f\x64\x75\x63\x74\x53\x65\x61\x72\x63\x68\x3f\x71\x3d','\x26\x74\x62\x5f\x6c\x6d\x5f\x69\x64\x3d\x72\x75\x79\x69\x74\x61\x6f','\x68\x74\x74\x70\x3a\x2f\x2f\x62\x69\x6a\x69\x61\x6b\x65\x2e\x73\x69\x6e\x61\x61\x70\x70\x2e\x63\x6f\x6d\x2f\x3f\x75\x3d'];

/* 网店处理规则 */
var sites = [
    'jd.com'	//京东商城
    ,'amazon.cn'	//亚马逊
    ,'suning.com'	//苏宁易购
    ,'yixun.com'	//易迅网
    ,'newegg.cn'	//新蛋
    ,'yhd.com'	//1号店
    ,'dangdang.com'	//当当网
    ,'1mall.com'	//1号商城
    ,'gome.com.cn'	//国美
    ,'coo8.com'	//库巴
    ,'lefeng.com'	//乐蜂
    ,'jumei.com'	//聚美优品
    ,'vancl.com'	//凡客
    ,'vjia.com'	//V+
    ,'wl.cn'	//蔚蓝
    ,'bookuu.com'	//博库
    ,'china-pub.com'	//互动出版网
]

var site = '';
for (var i = 0; i < sites.length; i++){
    if (uri.indexOf(sites[i]) !== -1) {
        site = sites[i];
        break;
    }
}

searchPrice();

function jsonFormator(sUrl, sTitle) {
    var thing = {
        url: sUrl,
        title: sTitle
    };
    str = $.toJSON(thing);
    return encodeURIComponent(str);
}
var cssroot = randomString(8);
var csschild = randomString(8);
var cssclear = randomString(8);
var css = '<style type="text/css">\n\
.' + cssroot + ' {\n\
line-height: 25px;\n\
clear: both;\n\
}\n\n\
.' + csschild + ' {\n\
float: left;\n\
margin-right: 10px;\n\
}\n\n\
.' + csschild + ' img {\n\
display: inherit;\n\
vertical-align: middle;\n\
}\n\n\
.' + cssclear + ' {\n\
clear: both;\n\
}\n\
</style>';

function searchPrice() {
    GM_xmlhttpRequest({
        method: "GET",
        url: _$[0] + jsonFormator(window.location.href, $(document).attr('title')),
        onload: function(xhr) {
            var response = JSON.parse(xhr.responseText);
            if (0 !== response.TotalPages && undefined !== response.TotalPages){
                var htmlstr = '';
                if (undefined !== response.Items){
                    for (var i = 0; i < response.Items.length; i++) {
                        var sTitle = response.Items[i].Title;
                        var sShopName = response.Items[i].ShopName;
                        var sDetailPageURL = response.Items[i].DetailPageURL.replace(_$[1], "");
                        var sPrice = response.Items[i].Price;
                        var sSiteLogo = response.Items[i].SiteLogo;
                        if (1 === response.Items[i].BSeller)
                            htmlstr += '<div class="' + csschild + '"><a href="' + _$[2] + encodeURIComponent(sDetailPageURL) + '" title="' + sTitle + '" target="_blank">' + 
                                ((sSiteLogo !== undefined)?'<img src="' + sSiteLogo + '">':'') + ' ' +
                                sShopName + '  ' + sPrice + '</a></div>';
                    }
                    htmlstr = css + '<div class="' + cssroot + '">' + htmlstr + '<div class="' + cssclear + '"></div></div>';
                    if (site === 'jd.com')
                        $('li#summary-price').after('<li>' + htmlstr + '</li>');
                    else if (site === 'amazon.cn')
                        $('div#priceBlock').after(htmlstr);
                        else if (site === 'yixun.com')
                            $('div.xbase_row2').after(htmlstr);
                        else if (site === 'suning.com')
                            $('li#netPriceBox').after('<li>' + htmlstr + '</li>');
                            else if (site === 'yhd.com')
                                $('dl#currentPriceArea').after('<div class="sku_unit mod_salesvolume">' + htmlstr + '</div>');
                            else if (site === 'dangdang.com')
                            {
                                if ($('div.sale_box:first').html() !== undefined)
                                    $('div.sale_box:first').after('<div>' + htmlstr + '</div>');
                                else if ($('div.sale p:first').html() !== undefined)
                                    $('div.sale p:first').after('<div>' + htmlstr + '</div>');
                                    }
                                else if (site === 'lefeng.com')
                                    $('p.specials').after('<p>' + htmlstr + '</p>');
                                else if (site === 'jumei.com')
                                    $('div.info p.price').after('<div style="border-top:solid 1px #efefef;padding-top:15px;margin-top:15px;"><p style="line-height:27px">' + htmlstr + '</p></div>');
                                    else if (site === 'gome.com.cn')
                                        $('li.prdprice').after('<li class="prdprice">' + htmlstr + '</li>');
                                    else if (site === 'newegg.cn')
                                        $('dd.neweggPrice').after('<dd><p>' + htmlstr + '</p></dd>');
                                        else if (site === 'vancl.com')
                                            $('div.cuxiaoPrice').after('<span class="blank10"></span><div>' + htmlstr + '</div>');
                                        else if (site === 'vjia.com')
                                            $('li.sp-SpecialPrice').after('<li>' + htmlstr + '</li>');
                                            else if (site === 'wl.cn')
                                                $('div.buyinfo').before(htmlstr);
                                            else if (site === 'bookuu.com')
                                                $('li.one-line:first').after('<li class="one-line">' + htmlstr + '</li>');
                                                else if (site === 'china-pub.com')
                                                    $('li.pro_buy_star').before('<li>' + htmlstr + '</li>');
                                                }
            }
        }
    });
}

function randomString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = chars[Math.floor(Math.random() * 26)];
    for (var i = 1; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}