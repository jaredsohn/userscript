// ==UserScript==
// @id             detail.tmall.com-e573d060-b4e5-094b-9b2e-d10d405bd8f4@TbGrease
// @name           malldetail2tmallbuy
// @version        1.0
// @namespace      TbGrease
// @author         fwonce
// @description    在malldetail拼接一个链接，到tmallbuy立即购买
// @include        http://detail.tmall.com/item.htm*
// @include        http://detail.daily.tmall.net/item.htm*
// @run-at         document-end
// ==/UserScript==

var host = location.hostname
var area = document.getElementsByClassName('tb-sku')[0]
var div = document.createElement('div')
var anchor = document.createElement('a')
anchor.href = '#'
anchor.onclick=function() {
    var href = 'http://buy' + host.substring(host.indexOf('.'))
            + '/order/confirm_order.htm?buy_param='
            + unsafeWindow.g_config['itemId'] + '_'
            + document.getElementById('J_IptAmount').value + '_'
            + unsafeWindow.TShop.mods.SKU.selectSkuId
    window.location.href = href
}
anchor.innerHTML = '去tmallbuy立即购买'
div.appendChild(anchor)
area.appendChild(div)