// ==UserScript==
// @id             yixun-4f5ec355-ca77-4fec-8160-f0aab4d60e1e@CzBiX
// @name           Yixun discount check
// @version        1.0
// @namespace      CzBiX
// @author         CzBiX <gliuwr@gmail.com> http://czbix.com
// @description    auto check discount price in Yixun
// @grant          GM_addStyle unsafeWindow
// @include        http://item.yixun.com/item-*.html*
// @icon           https://s3.amazonaws.com/uso_ss/icon/187797/large.png?1388731479
// @homepage       https://userscripts.org/scripts/show/187797
// @updateURL      https://userscripts.org/scripts/source/187797.meta.js
// @downloadURL    https://userscripts.org/scripts/source/187797.user.js
// @run-at         document-end
// ==/UserScript==

GM_addStyle('#btnAddCart {text-indent: 0;}'
    + '.xbtn {background: -moz-linear-gradient(center top , #FF8A00, #F48400 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}'
    + '.xbtn_c3 {background: -moz-linear-gradient(center top , #6AAC52, #599E41 100%) repeat scroll 0 0 rgba(0, 0, 0, 0);}');

var $ = unsafeWindow.jQuery;
var id = location.pathname.match(/\d+/);
var url = "item-" + id + ".html?chid=400";

var curPrice = getPriceVal($('[itemprop=lowPrice], [itemprop=price]').text());

var $buyBtn = $('#btnAddCart');
$buyBtn.addClass('xbtn');
$buyBtn.text('查询优惠价中...');

$.get(url).done(function(data) {
  $buyBtn.text('加入购物车');

  var $lowPrice = $('[itemprop=lowPrice]', data);
  if ($lowPrice.length == 0) {
    console.log("can't found discount price");
    return;
  }
  
  var lowPrice = getPriceVal($lowPrice.text());
  if (lowPrice >= curPrice) {
    console.log("discount price doesn't lower than current price: " + lowPrice);
    return;
  }
  
  $buyBtn.addClass('xbtn_c3');
  $buyBtn.attr('href', url);
  $buyBtn.text("以 ¥" + lowPrice + " 购买");
});

function getPriceVal(str) {
  return parseFloat(str.substr(1));
}