// ==UserScript==
// @name        Display discount rate for hmv.co.jp
// @namespace   http://userscripts.org/users/472491
// @match       http://*.hmv.co.jp/*
// @description HMV ONLINEで割引価格の割引率を表示します。
// @description Display discount rate in hmv.co.jp store page.
// @version     0.0.6
// @grant none
// ==/UserScript==


(function(){
const usualPrice = '\u901a\u5e38\u4fa1\u683c';     // 通常価格
const normalPrice = '\u4e00\u822c\u4fa1\u683c';    // 一般価格
const refPrice = '\u53c2\u8003\u4fa1\u683c';       // 参考価格
const multiBuy = '\u30de\u30eb\u30c1\u30d0\u30a4'; // マルチバイ
const onlineSale = '\u30aa\u30f3\u30e9\u30a4\u30f3\u30bb\u30fc\u30eb'; // オンラインセール
const onlineMember = '\u30aa\u30f3\u30e9\u30a4\u30f3\u4f1a\u54e1';     // オンライン会員
const matomeBuy = '\u307e\u3068\u3081\u8cb7\u3044\u4fa1\u683c'; //まとめ 買い
const salePrice = '\u30bb\u30fc\u30eb\u4fa1\u683c'; // セール価格

const priceMarkers = [refPrice, normalPrice, usualPrice];
const discountMarkers = [multiBuy, onlineSale, onlineMember, matomeBuy, salePrice];

function XPathContext(element) {
  this.context = element;
}

XPathContext.prototype.findAll = function(xpath) {
  var ss = document.evaluate(xpath, this.context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var nodes = [];
  for(var i=0;i<ss.snapshotLength;i++){
    nodes.push(ss.snapshotItem(i));
  }
  return nodes;
}

XPathContext.prototype.findFirst = function(xpath) {
  return document.evaluate(xpath, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function $x(element) {
  if (element) {
    return new XPathContext(element);
  } else {
    return new XPathContext(document);
  }
}

function PriceAppender(priceXPath, discountXPath, format) {
  this.priceXPath = priceXPath;
  this.discountXPath = discountXPath;
  this.format = format;
}

PriceAppender.prototype.append = function(base) {

  var price = null;
  for (var i in priceMarkers) {
    var xpath = this.priceXPath.replace(/@marker@/,priceMarkers[i]);
    var priceElement = $x(base).findFirst(xpath);

    if (priceElement) {
      price = this.toNumber(priceElement.textContent);
      break;
    }
  }
  if (price) {
    discountMarkers.forEach(function(e){
      var xpath = this.discountXPath.replace(/@marker@/,e);
      var discountElement = $x(base).findFirst(xpath);
      this.appendDiscountRate(discountElement, price);
    }, this);
  }
}

PriceAppender.prototype.appendDiscountRate = function(discountElement, price) {
  if (discountElement) {
    var discountPrice = this.toNumber(discountElement.textContent);
    if (discountPrice) {
      var discountRate = this.toDiscountPercent(price, discountPrice);
      var discountRateF = this.format.replace(/@rate@/, discountRate);
      var span = document.createElement('span');
      span.setAttribute('style','font-size:80%;');
      span.appendChild(document.createTextNode(discountRateF));
      discountElement.appendChild(span);
    }
  }
}

PriceAppender.prototype.toNumber = function(priceString) {
  var matches = priceString.match(/\uffe5[0-9]{1,3}(,[0-9]{3})*/);
  if (matches) {
    return Number(matches[0].substring(1).replace(',',''));
  } else {
    return null;
  }
}

PriceAppender.prototype.toDiscountPercent = function(price, discount) {
  var rate = ((price-discount)/price)*100;
  return rate.toFixed(1).toString().replace(/\.0+/,'');
}


var priceInfo = document.getElementById('priceArea');
var urlPath = /^(?:https?:\/\/[^\/]+)([^?]+)/.exec(document.URL)[1];
if (priceInfo == null) {
  if (urlPath.match(/^\/artist\/detail\//)) {
    // artist detail page
    var priceAppender = new PriceAppender(
      './p[contains(text(),"@marker@")]/span',
      './p[contains(text(),"@marker@")]/span',
      ' (-@rate@%)'
    );
    var priceXPath = '//div[@class="goodsInfo"]';
    $x().findAll(priceXPath).forEach(function(e) {
      priceAppender.append(e);
    });
  } else {
    // search page, news article page and others
    var priceAppender = new PriceAppender(
      './text()[contains(.,"@marker@")]/following-sibling::strong',
      './*[(self::em or self::span) and contains(text(),"@marker@")]/strong',
      ' (-@rate@%)'
    );
    var priceXPath = '//p[@class="price"]';
    $x().findAll(priceXPath).forEach(function(e) {
      priceAppender.append(e);
    });
    priceAppender = new PriceAppender(
      './p[@class="stuffPrice" and contains(text(),"@marker@")]',
      './p[@class="stuffPrice pink bold" and contains(text(),"@marker@")]',
      ' (-@rate@%)'
    );
    priceXPath = '//td[@class="stuffDetail"]';
    $x().findAll(priceXPath).forEach(function(e) {
      priceAppender.append(e);
    });
  }
//} else {
//  // product detail page
//  var priceAppender = new PriceAppender(
//    './ul/li[contains(a/strong,"@marker@")]/text()[last()]',
//    './ul/li[contains(a/strong,"@marker@")]/span[@class="priceNum"]',
//    ' (-@rate@%)'
//  );
//  priceAppender.append(priceInfo);
}
})();

