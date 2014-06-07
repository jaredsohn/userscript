// ==UserScript==
// @name           Setagaya Municipal Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 東京都世田谷区立図書館自動所蔵確認
// @include        http://www.amazon.co.jp/*
// @version        1.1
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

function getISBN() {
  var href = document.location.href;
  var index = href.indexOf('dp/');
  var asin = href.substring(index + 3, index + 13);
  if (index < 0) {
    index = href.indexOf('product');
    asin = href.substring(index + 8, index + 18);
  }
  if (index < 0) {
    index = href.indexOf('ASIN');
    asin = href.substring(index + 5, index + 15);
  }
  asin = asin.substr(0, 9);
  return asin;
}

function checkLibrary(isbn) {
  var url = "http://libweb.city.setagaya.tokyo.jp/clis/search?BOOK=on&ITEM1=AB&KEY1=&COMP1=3&ITEM2=AB&KEY2=&COMP2=3&ITEM3=CD&KEY3=&COMP3=3&ITEM4=EF&KEY4=&COMP4=1&ITEM5=++&KEY5=&COMP5=3&COND=1&SORT=1&NDC=+++&ISBN=" + isbn + "&BINUM=&YEARFROM=&YEARTO=&LIBRARY=+++&MATER=+++&TRGUSER=+++&MAXVIEW=20&DATAFMT=2&DETAILFMT=3&RTNPAGE=%2Fsearch2.html";

  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response) {
      var pattern = /<TD><A HREF=\"(.*?)\">/i;
      if (response.responseText.match(pattern)) {
        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href','http://libweb.city.setagaya.tokyo.jp' + RegExp.$1);
          spl_link.innerHTML = '</br>&#x4E16;&#x7530;&#x8C37;&#x533A;&#x7ACB;'//世田谷区立
          +'&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';//図書館にあるよ
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);
